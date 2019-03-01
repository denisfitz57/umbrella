import { Predicate2, SEMAPHORE } from "@thi.ng/api";
import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { $iter } from "../iterator";
import { ensureReduced } from "../reduced";

/**
 * Transducer which for each input `x` (apart from the very first one)
 * applies given predicate `pred` to previous input and `x`. Only passes
 * values downstream as long as the predicate returns a falsy result.
 * Once the result is truthy, `x` is considered converged and the
 * transformation is terminated (by emitting a `reduced()` value).
 *
 * This can be used to limit processing of inputs only as long as
 * there're noticeable changes (according to the predicate) and then
 * stop the transducer pipeline once results have converged.
 *
 * ```
 * // process as long as difference to prev value is >= 0.01
 * [...converge(
 *       // predicate
 *       (a, b) => Math.abs(a - b) < 0.01,
 *       // input sequence
 *       iterate((x, i) => x + Math.pow(2, -i), 0)
 * )]
 * // [ 0, 0.5, 0.75, 0.875, 0.9375, 0.96875, 0.984375, 0.9921875 ]
 * ```
 *
 * @see takeWhile
 *
 * @param pred
 * @param src
 */
export function converge<T>(pred?: Predicate2<T>): Transducer<T, T>;
export function converge<T>(
    pred: Predicate2<T>,
    src: Iterable<T>
): IterableIterator<T>;
export function converge<T>(...args: any[]): any {
    return (
        $iter(converge, args) ||
        ((rfn: Reducer<any, T>) => {
            const r = rfn[2];
            const pred = args[0];
            let prev: any = SEMAPHORE;
            let done = false;
            return compR(rfn, (acc, x: T) => {
                if (done || (prev !== SEMAPHORE && pred(prev, x))) {
                    done = true;
                    return ensureReduced(r(acc, x));
                }
                prev = x;
                return r(acc, x);
            });
        })
    );
}
