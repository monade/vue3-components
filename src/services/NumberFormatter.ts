export default class NumberFormatter {
  static beautify(value: number|string|undefined, valueForZero = '0', valueForUndefined = '-'): string {
    if (value === undefined) {
      return valueForUndefined;
    }

    if (typeof value === 'string') {
      value = Number(value);
    }

    if (value === 0) {
      return valueForZero;
    }

    let number = value;

    if (value >= 10000) {
      let divider = 1000;

      if (value >= 1000000) {
        divider = 1000000;
      }

      number = Math.floor(value / divider);
    }

    const beautyfied = [];

    beautyfied.push(NumberFormatter.format(Math.floor(number)));

    if (value >= 10000) {
      if (value >= 1000000) {
        beautyfied.push('M');
      } else {
        beautyfied.push('k');
      }
    }

    return beautyfied.join('');
  }

  static format(value: number, decimals = 0, digits = 1, locale = 'it') {
    const minimumFractionDigits = decimals > 0 ? decimals : 0;
    const maximumFractionDigits = decimals > 0 ? decimals : 0;

    return new Intl.NumberFormat(locale, {
      minimumIntegerDigits: digits,
      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: maximumFractionDigits
    }).format(value);
  }

  static random(min: number, max: number): number {
    return Math.floor(Math.random() * (+max - +min)) + +min;
  }
}
