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
    switch (event.submitter ? event.submitter.name : undefined) {
      case 'minus':
        newClock = newClock.decrement();
        break;
      case 'plus':
        newClock = newClock.increment();
        break;
      case 'reset':
        newClock = new Clock({
          progress: 0,
          size: newClock.size,
          theme: newClock.theme
        });
        break;
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
        img: newClock.image.img,
        scale: t.data.scale || 1
      });
    }

    // update the Actor
    await supportedSystem.saveActor(sheet, newClock);
  }
}
