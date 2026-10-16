/**
 * Clamps the given number between the minimum and the maximum offered
 * @param {Number} x Value to clamp
 * @param {Number} min Minimum value
 * @param {Number} max Maximum value
 * @returns The given number clamped between the minimum and maximum values offered
 * @author Álvaro Fernández Barrero
 */
export const clamp = (x, min, max) => Math.max(min, Math.min(x, max));

/**
 * Interpolates from a to b according to t
 * @param {Number} a Starting number
 * @param {Number} b Goal number
 * @param {Number} t Progress
 * @returns A interpolated value between the two giving boundaries a and b
 * @author Álvaro Fernández Barrero
 */
export const lerp = (a, b, t) => a + (b - a) * t;