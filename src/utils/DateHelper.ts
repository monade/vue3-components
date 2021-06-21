/* eslint-disable no-tabs */
/* eslint-disable comma-spacing */
/* eslint-disable space-before-blocks */
import moment from 'moment';

export const UK_DATE_FORMAT_DASHED = 'YYYY-MM-DD';
export const EU_DATE_FORMAT_DASHED = 'DD-MM-YYYY';
export const EU_DATE_FORMAT_SLASHED = 'DD/MM/YYYY';
export const UK_DATE_FORMAT_SLASHED = 'YYYY/MM/DD';
export const US_DATE_FORMAT_SLASHED = 'MM/DD/YYYY';
export const US_DATE_FORMAT_DASHED = 'MM-DD-YYYY';

export function fromUkToEuDashed(date: string|undefined) {
  return moment(date, UK_DATE_FORMAT_DASHED).format(EU_DATE_FORMAT_DASHED);
}

export function fromEuToUkDashed(date: string|undefined) {
  return moment(date, EU_DATE_FORMAT_DASHED).format(UK_DATE_FORMAT_DASHED)
}

export function fromEuToUkSlashed(date: string|undefined) {
  return moment(date, EU_DATE_FORMAT_SLASHED).format(UK_DATE_FORMAT_SLASHED)
}

export function fromEuToUkDashedSlashed(date: string|undefined) {
  return moment(date, EU_DATE_FORMAT_SLASHED).format(UK_DATE_FORMAT_SLASHED)
}

export function switchFormat(date: string|undefined|Date, start: string|undefined, end: string|undefined) {
  return moment(date, start).format(end)
}

export function hasFormat(date: string|Date|undefined,format: string){
  return moment(date, format).format(format) === date;
}
