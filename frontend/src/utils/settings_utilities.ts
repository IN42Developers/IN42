

/**
 * Enforces Value to be in a given range. If Value is out of bounds min/max will be used
 *
 * @param value - The value to be checked
 * @param min - The min value.
 * @param max - The max value.
* @returns Either default value or min/max if out of range.
 */
export const validateRange = (value: number, min: number, max: number): number => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  };