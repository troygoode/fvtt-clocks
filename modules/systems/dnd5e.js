export default {
  registerSheetOptions: { types: ["npc"] },

  loadClockFromActor: ({ actor }) => {
    return {
      progress: actor.getFlag("clocks", "progress"),
      size: actor.getFlag("clocks", "size"),
      theme: actor.getFlag("clocks", "theme")
    };
  },

  persistClockToActor: ({ clock }) => {
    return {
      data: {
        attributes: {
          hp: {
            value: clock.progress,
            max: clock.size
          }
        }
      },
      flags: {
        clocks: {
          progress: clock.progress,
          size: clock.size,
          theme: clock.theme,
        }
      }
    };
  }
};
