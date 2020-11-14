import { Clock } from "./clock.js";

const defaultLoadClock = (actor) => {
  return new Clock({
    progress: actor.getFlag("clocks", "progress"),
    size: actor.getFlag("clocks", "size"),
    theme: actor.getFlag("clocks", "theme")
  });
};

const defaultSaveActor = async (actor, clock) => {
  await actor.update({
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
