import NumberFormatter from '../services/NumberFormatter';

export default function beautify(value: number|string|undefined, valueForZero = '-', valueForUndefined = '-') {
  return NumberFormatter.beautify(value, valueForZero, valueForUndefined);
}
