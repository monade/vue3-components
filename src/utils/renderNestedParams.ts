import { NestedDictionary } from '../models/NestedDictionary';

export function renderNestedParams(dataKeys: string[] | undefined, data: any) {
  let payload: NestedDictionary | null = {};
  if (dataKeys && dataKeys.length) {
    for (let i = 0; i < dataKeys.length; i++) {
      const key = dataKeys[i];
      const isLast = i === dataKeys.length - 1;

      if (i === 0) {
        payload[key] = isLast ? data : {};
      } else {
        let temp: NestedDictionary | string | null = null;
        for (let y = 0; y < i; y++) {
          temp = temp && typeof temp === 'object' ? temp[dataKeys[y]] : payload[dataKeys[y]];
        }
        if (temp && typeof temp === 'object') {
          temp[key] = isLast ? data : {};
        } else {
          console.error('dataKeys parameters is invalid for the current type', dataKeys);
        }
      }
    }
  } else if (typeof data === 'object') {
    payload = { ...data };
  }

  return payload;
}
