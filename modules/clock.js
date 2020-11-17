export class Clock {
  constructor ({ theme, size, progress } = {}) {
    const p = progress < 0 ? 0 : progress < size ? progress : size;
    this._theme = theme || 'dog_blink_blue';
    this._size = parseInt(size || 4);
    this._progress = p || 0;
  }

  get theme () {
    return this._theme;
  }

  get size () {
    return this._size;
  }

  get progress () {
    return this._progress;
  }

  get image () {
    return { 
      img: `/modules/clocks/themes/${this.theme}/${this.size}clock_${this.progress}.png`,
      width: 350,
      height: 350
    };
  }

  get flags () {
    return {
      clocks: {
        theme: this._theme,
        size: this._size,
        progress: this._progress
      }
    };
  }

  cycleSize () {
    const old = this;
    let newSize;

    // 4 • 6 • 8 • 12
    switch(old.size) {
      case 4:
        newSize = 6;
        break;
      case 6:
        newSize = 8;
        break;
      case 8:
        newSize = 12;
        break;
      default:
        newSize = 4;
        break;
    }

    return new Clock({
      theme: old.theme,
      size: newSize,
      progress: old.progress
    });
  }

  cycleTheme () {
    const old = this;
    let newTheme;

    switch(old.theme) {
      case 'dog_blink_blue':
        newTheme = 'dog_blink_yellow';
        break;
      default:
        newTheme = 'dog_blink_blue';
        break;
    }

    return new Clock({
      theme: newTheme,
      size: old.size,
      progress: old.progress
    });
  }

  increment () {
    const old = this;
    return new Clock({
      theme: old.theme,
      size: old.size,
      progress: old.progress + 1
    });
  }

  decrement () {
    const old = this;
    return new Clock({
      theme: old.theme,
      size: old.size,
      progress: old.progress - 1
    });
  }

  toString () {
    return `${this._progress}/${this._size} • ${this._theme}`;
  }
}