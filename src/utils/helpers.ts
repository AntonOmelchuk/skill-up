/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/prefer-default-export
export const clamp = (value: number, min: number, max: number): number => {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value);
};
