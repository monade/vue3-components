export type Typography = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'base';

export function fontSize(fontType: Typography) {
  const fonts = {
    h1: "2.5rem",
    h2: "2rem",
    h3: "1.75rem",
    h4: "1.5rem",
    h5: "1.25rem",
    h6: "1rem",
    base: '1rem'
  }
  return fonts[fontType];
}

export function numericalPart(value: string) {
  return parseFloat(value.replace(/^\D|,+/g, ''))
}
