import { Clock } from "./clock.js";

export const themes = {
  list: ['dog_blink_blue', 'dog_blink_yellow']
};

const defaultLoadClockFromActor = (actor) => {
  return new Clock({
    progress: actor.getFlag("clocks", "progress"),
    size: actor.getFlag("clocks", "size"),
    theme: actor.getFlag("clocks", "theme")
  });
};

const defaultPersistClockToActor = async (actor, name, clock) => {
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

export const getSystemMapping = (system) => {
  switch (system) {
    case 'dnd5e':
      return {
        id: "dnd5e",
        sheetConfig: { types: ["npc"] },
        loadClockFromActor: defaultLoadClockFromActor,
        persistClockToActor: defaultPersistClockToActor
      };
    default:
      return undefined;
  }
}
