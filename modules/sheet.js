import { Clock } from "./clock.js";
import { systemMappings } from "./systems.js";

export class ClockSheet extends ActorSheet {
  static get defaultOptions() {
	  return mergeObject(super.defaultOptions, {
      classes: ["clocks", "sheet", "actor", "npc"],
  	  template: "/modules/clocks/templates/sheet.html",
      width: 350,
      height: 475,
    });
  }

  async _updateObject(event, form) {
    const supportedSystem = systemMappings[game.data.system.id];
    if (!supportedSystem) return;

    const sheet = this.object;
    const oldClock = supportedSystem.loadClock(sheet);

    let newClock = oldClock;
    const progress = !event.submitter ? undefined : event.submitter.name === 'minus' ? -1 : event.submitter.name === 'plus' ? 1 : undefined;
    if (progress === 1) {
      newClock = newClock.increment();
    } else if (progress === -1) {
      newClock = newClock.decrement();
    }
    newClock = new Clock({
      progress: newClock.progress,
      size: form.size,
      theme: form.theme
    });

    // update associated tokens
    const tokens = this.actor.getActiveTokens();
    for (const t of tokens) {
      await t.update({
        img: newClock.image.img
      });
    }

    // update the Actor
    await supportedSystem.saveActor(sheet, newClock);
  }
}
