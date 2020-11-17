# Foundry VTT: Clocks

Create [Blades in the Dark](https://bladesinthedark.com/)-esque [progress clocks](https://bladesinthedark.com/progress-clocks) within [Foundry VTT](https://foundryvtt.com/). Supports both ad hoc Tile Clocks for use in a single scene and long-lasting Actor Clocks.

## Installation

Install directly from within [Foundry VTT's package browser](https://foundryvtt.com/packages/clocks/):

https://foundryvtt.com/packages/clocks/

Or, install manually with [this Manifest URL](https://raw.githubusercontent.com/troygoode/fvtt-clocks/main/module.json):

```
https://raw.githubusercontent.com/troygoode/fvtt-clocks/main/module.json
```

## Demos

![Screenshot](demo.png)

### Clock Actors

Clock Actors live in your Actors tab (and can be dragged onto a scene as a token). To get started, create a new actor and select the "{system}.ClockSheet" sheet. You'll still see the default actor artwork; change a clock setting (such as theme or size) or hit the Reset button (between the plus/minus buttons) to generate the correct clock artwork.

> Note that for some systems, only one type of actor supports the ClockSheet. (For DND5E that is the "NPC" actor.)

![Actors](demo.actor.gif)

### Clock Tiles

Clock Tiles are useful for quick, disposable clocks you'd like to drop onto the scene but don't plan to keep around for long. Click the new Clock button in the Tiles toolbar and a new clock will be dropped into the middle of your scene (you may need to scroll to see it). When you select and right-click the clock you'll see a new set of controls on the left that let you switch the clock's theme, cycle through clock sizes, and increment/decrement progress on the clock.

![Tiles](demo.tile.gif)

## Attributions

Clock artwork by [Tim Denee (@dog_blink)](https://twitter.com/dog_blink/status/987137570512420869).

## License

This module is available as open source under the terms of the MIT License.

[MIT License](http://www.opensource.org/licenses/mit-license.php)
