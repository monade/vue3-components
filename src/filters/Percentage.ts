import NumberFormatter from '@/services/NumberFormatter';

export default function percentage(value: number|undefined, valueForZero = '0', valueForUndefined = '-') {
  if (value === undefined) {
    return valueForUndefined;
  }

  if (value === 0) {
    return valueForZero;
  }

  let formatted = NumberFormatter.beautify(value, valueForZero, valueForUndefined);

  if (value && value >= 0) {
    formatted = `+${formatted}`;
  }

  return `${formatted}%`;
}
