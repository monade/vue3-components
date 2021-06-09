export interface ColorsInterface {
  [key: number]: string;
}

let COLORS: ColorsInterface = {
  1: '#33C8FF',
  2: '#FFE36F',
  3: '#5EE96B',
  4: '#F75151',
  5: '#B03EE2',
  6: '#4B5EEF',
  7: '#FF9D00',
  8: '#11D9D2',
  9: '#FD7AD5',
  10: '#8A4DFF',
  11: '#A1CFF7',
  12: '#E2EA2A',
  13: '#C4F0C8',
  14: '#C41854',
  15: '#E2BFF0',
  16: '#468793',
  17: '#EACB8B',
  18: '#06C482',
  19: '#FCBEBE',
  20: '#A0559D'
};

export default class ColorHelper {
  static current = 0;
  static colorMap: Map<string, string> = new Map();

  static get colors(): ColorsInterface {
    return COLORS as ColorsInterface;
  }

  static set colors(list: ColorsInterface) {
    COLORS = list;
  }

  static get totalColors(): number {
    return Object.keys(COLORS).length;
  }

  static colorAtIndex(index: number) {
    return ColorHelper.colors[index] || ColorHelper.colors[1];
  }

  static random(): string {
    const index = Math.floor(Math.random() * (ColorHelper.totalColors - 1 + 1)) + 1;
    return ColorHelper.colorAtIndex(index);
  }

  static pick(): string {
    let index = ColorHelper.current;

    if ((index + 1) <= ColorHelper.totalColors) {
      index++;
    } else {
      index = 1;
    }

    ColorHelper.current = index;

    return ColorHelper.colorAtIndex(index);
  }

  static pickForKey(key: string): string {
    let color;

    if (this.colorMap.has(key)) {
      color = this.colorMap.get(key);
    }

    if (color) {
      return color;
    } else {
      color = ColorHelper.pick();
      this.colorMap.set(key, color);
    }

    return color;
  }

  static reset(): void {
    ColorHelper.current = 0;
  }

  static adjust(color: string, amount: number) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }
}
