export const black = 0x000000;
export const charcoal = 0x373f51;
export const cornflowerBlue = 0x6f9ceb;
export const greenBlue = 0x306bac;
export const gunmetal = 0x022b3a;
export const jordyBlue = 0x98b9f2;
export const lightGreen = 0x8cd790;
export const spaceCadet = 0x141b41;
export const tropicalIndigo = 0x918ef4;
export const white = 0xffffff;

export function toHex(color: number) {
  return `#${color.toString(16)}`;
}
