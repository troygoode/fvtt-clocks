import { ClockSheet } from "./sheet.js";
import Tiles from "./tiles.js";
import { log } from "./util.js";

Hooks.once("init", () => {
  log(`Init ${game.data.system.id}`);
  ClockSheet.register();
});

Hooks.on("getSceneControlButtons", (controls) => {
  Tiles.getSceneControlButtons(controls);
});

Hooks.on("renderTileHUD", async (hud, html, tile) => {
  await Tiles.renderTileHUD(hud, html, tile);
});
