/* eslint-disable no-nested-ternary */
const clamp = (value: number, min: number, max: number): number => {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value);
};

export default clamp;
