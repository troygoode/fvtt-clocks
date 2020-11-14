import { Clock } from "./clock.js";

export const themes = {
  list: ['dog_blink_blue', 'dog_blink_yellow']
};

const defaultLoadClock = (actor) => {
  return new Clock({
    progress: actor.getFlag("clocks", "progress"),
    size: actor.getFlag("clocks", "size"),
    theme: actor.getFlag("clocks", "theme")
  });
};

const defaultSaveActor = async (actor, name, clock) => {
  await actor.update({
    name: name,
    img: clock.image.img,
    token: {
      img: clock.image.img
    }
  });
  await actor.setFlag("clocks", "progress", clock.progress);
  await actor.setFlag("clocks", "size", clock.size);
  await actor.setFlag("clocks", "theme", clock.theme);
}

export const systemMappings = {
  "dnd5e": {
    id: "dnd5e",
    sheetConfig: { types: ["npc"] },
    loadClock: defaultLoadClock,
    saveActor: defaultSaveActor
  }
};
