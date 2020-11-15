import { Clock } from "../clock.js";
import DND5E from "./dnd5e.js";
import BitD from "./blades-in-the-dark.js";

const SUPPORTED_SYSTEMS = {
  "blades-in-the-dark": BitD,
  "dnd5e": DND5E
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

export const getSystemMapping = (id) => {
  if (!SUPPORTED_SYSTEMS[id]) return undefined;

  const defaultSystemConfig = {
    loadClockFromActor: defaultLoadClockFromActor,
    persistClockToActor: defaultPersistClockToActor
  };

  return {
    id,
    ...defaultSystemConfig,
    ...SUPPORTED_SYSTEMS[id]
  };
};
