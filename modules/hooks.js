import { Clock } from "./clock.js";
import { ClockSheet } from "./sheet.js";
import { systemMappings } from "./systems.js";

const log = (message) => console.log(`Foundry VTT | Clocks | ${message}`);

const onClick = async () => {
  log('Tool Clicked');
  const clock = new Clock();
  const dim = {
    x: ((canvas.dimensions.sceneRect.width - clock.image.width) / 2) + canvas.dimensions.paddingX,
    y: ((canvas.dimensions.sceneRect.height - clock.image.height) / 2) + canvas.dimensions.paddingY
  };

  const tile = new Tile({
    img: clock.image.img,
    width: clock.image.width,
    height: clock.image.height,
    x: dim.x,
    y: dim.y,
    z: 900,
    rotation: 0,
    hidden: false,
    locked: false,
    flags: clock.flags
  });
  canvas.scene.createEmbeddedEntity('Tile', tile.data);
}

Hooks.once("init", () => {
  log(`Init ${game.data.system.id}`);
  const supportedSystem = systemMappings[game.data.system.id];
  if (supportedSystem) {
    log("Sheet Registered");
    Actors.registerSheet(supportedSystem.id, ClockSheet, supportedSystem.sheetConfig);
  }
});

Hooks.on("getSceneControlButtons", (controls) => {
  const tiles = controls.find((c) => c.name === "tiles");
  tiles.tools.push({
    name: "clocks",
    title: "Clocks",
    icon: "fas fa-clock",
    onClick,
    button: true
  });
});

Hooks.on("renderTileHUD", async (_hud, html, tile) => {
  log("Render")
  let t = canvas.tiles.get(tile._id);
  if (!t.data.flags.clocks) {
    return;
  }

  const buttonHTML = await renderTemplate('/modules/clocks/templates/buttons.html');
  html.find("div.left").append(buttonHTML).click(async (event) => {
    log("HUD Clicked")
    // re-get in case there has been an update
    t = canvas.tiles.get(tile._id);

    const oldClock = new Clock(t.data.flags.clocks);
    let newClock;

    const target = event.target.classList.contains("control-icon")
      ? event.target
      : event.target.parentElement;
    if (target.classList.contains("cycle-size")) {
      newClock = oldClock.cycleSize();
    } else if (target.classList.contains("cycle-theme")) {
      newClock = oldClock.cycleTheme();
    } else if (target.classList.contains("progress-up")) {
      newClock = oldClock.increment();
    } else if (target.classList.contains("progress-down")) {
      newClock = oldClock.decrement();
    } else {
      throw new Error('Foundry VTT | Clocks | ERROR: Unknown TileHUD Button')
    }

    await t.update({
      img: newClock.image.img,
      flags: newClock.flags
    });
  });
});
