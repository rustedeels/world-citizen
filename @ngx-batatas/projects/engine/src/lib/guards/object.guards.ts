/**
 * Check if is not null or undefined
 *
 * @param e value to check
 * @returns true if not null or undefined
 */
export function isValue<T>(e: unknown): e is T {
  return typeof e !== 'undefined' && e !== null;
}

/**
 * Check value is typeof object
 * @param e value to check
 */
export function isObject(e: unknown): e is object {
  return typeof e === 'object' && isValue<object>(e);
}

/**
 * Check if is not null or undefined and is typeof object
 * @param e value to check
 * @returns e is T
 */
export function isObjectValue<T>(e: unknown): e is T {
  return isObject(e);
}
