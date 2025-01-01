export const calculateCombination = (value) => {
  if (!value) {
    return format(round(0));
  }
  return format(round(value));
};

export const format = (value) => value.toFixed(1);

export const round = (value) => Math.round(value * 10) / 10;
