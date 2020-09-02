import NumberFormatter from '@/services/NumberFormatter';

export default function number(value: number, decimals = 0, digits = 1, locale = 'it') {
  return NumberFormatter.format(value, decimals, digits, locale);
}
