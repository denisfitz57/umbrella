import { EPS } from "./api";

const abs = Math.abs;
const max = Math.max;

/**
 * Checks if `|a - b| <= ε` and adapts given epsilon value to the given
 * arguments:
 *
 * ε is factored with the largest absolute value of `a` or `b` (but
 * never lesser than the given `eps` value):
 *
 * `ε = ε * max(1, |a|, |b|)`
 *
 * @param a left value
 * @param b right value
 * @param eps epsilon / tolerance, default `1e-6`
 */
export const eqDelta = (a: number, b: number, eps = EPS) =>
    abs(a - b) <= eps * max(1, abs(a), abs(b));

/**
 * Similar to `eqDelta()`, but used given `eps` as is.
 *
 * @param a left value
 * @param b right value
 * @param eps epsilon / tolerance, default `1e-6`
 */
export const eqDeltaFixed = (a: number, b: number, eps = EPS) =>
    abs(a - b) <= eps;
