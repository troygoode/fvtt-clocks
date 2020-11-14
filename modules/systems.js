import { Clock } from "./clock.js";

export const systemMappings = {
  "dnd5e": {
    id: "dnd5e",
    sheetConfig: { types: ["npc"] },
    loadClock: (actor) => {
      const flags = {
        progress: actor.getFlag("clocks", "progress"),
        size: actor.getFlag("clocks", "size"),
        theme: actor.getFlag("clocks", "theme")
      }
      return new Clock(flags);
    },
    saveActor: async (actor, clock) => {
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
  }
};
