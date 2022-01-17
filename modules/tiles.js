import { Clock } from "./clock.js";
import { log, error } from "./util.js";

const onClick = async () => {
  log('Tool Clicked');
  const clock = new Clock();
  const dim = {
    x: ((canvas.dimensions.sceneRect.width - clock.image.width) / 2) + canvas.dimensions.paddingX,
    y: ((canvas.dimensions.sceneRect.height - clock.image.height) / 2) + canvas.dimensions.paddingY
  };

  const tile = new TileDocument({
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
  canvas.scene.createEmbeddedDocuments('Tile', [tile.data]);
};

export default {
  getSceneControlButtons: (controls) => {
    const tiles = controls.find((c) => c.name === "tiles");
    tiles.tools.push({
      name: "clocks",
      title: "Clocks",
      icon: "fas fa-clock",
      onClick,
      button: true
    });
  },

  renderTileHUD: async (_hud, html, tile) => {
    log("Render")
    let t = canvas.foreground.get(tile._id);
    if (!t.data.flags.clocks) {
      return;
    }

    const buttonHTML = await renderTemplate('/modules/clocks/templates/buttons.html');
    html.find("div.left").append(buttonHTML).click(async (event) => {
      log("HUD Clicked")
      // re-get in case there has been an update
      t = canvas.foreground.get(tile._id);

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
        return error("ERROR: Unknown TileHUD Button");
      }

      await t.document.update({
        img: newClock.image.img,
        flags: newClock.flags
      });
    });
  }
};