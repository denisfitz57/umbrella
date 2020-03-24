import { toPath } from "./path";
import type {
    DeepPath,
    Fn2,
    Path,
    Path0,
    Path1,
    Path2,
    Path3,
    Path4,
    Path5,
    Path6,
    Path7,
    Path8,
    PathVal1,
    PathVal2,
    PathVal3,
    PathVal4,
    PathVal5,
    PathVal6,
    PathVal7,
    PathVal8,
} from "@thi.ng/api";

/**
 * Higher-order function, similar to {@link defSetterUnsafe}. Returns
 * function, which when called, mutates given object/array at given path
 * location.
 *
 * @remarks
 * The returned function bails if any intermediate path values are
 * non-indexable (only the very last path element can be missing in the
 * actual object structure). If successful, returns original (mutated)
 * object, else `undefined`. This function provides optimized versions
 * for path lengths <= 4.
 *
 * @param path -
 */
export const defMutatorUnsafe = (path: Path): Fn2<any, any, any> =>
    defMutator(<any>path);

/**
 * Type checked version of {@link mutator}. Only the first 8 path levels
 * are type checked.
 *
 * @param path -
 */
export function defMutator<T>(path: Path0): Fn2<T, T, T>;
export function defMutator<T, A>(path: Path1<T, A>): Fn2<T, PathVal1<T, A>, T>;
export function defMutator<T, A, B>(
    path: Path2<T, A, B>
): Fn2<T, PathVal2<T, A, B>, T>;
export function defMutator<T, A, B, C>(
    path: Path3<T, A, B, C>
): Fn2<T, PathVal3<T, A, B, C>, T>;
export function defMutator<T, A, B, C, D>(
    path: Path4<T, A, B, C, D>
): Fn2<T, PathVal4<T, A, B, C, D>, T>;
export function defMutator<T, A, B, C, D, E>(
    path: Path5<T, A, B, C, D, E>
): Fn2<T, PathVal5<T, A, B, C, D, E>, T>;
export function defMutator<T, A, B, C, D, E, F>(
    path: Path6<T, A, B, C, D, E, F>
): Fn2<T, PathVal6<T, A, B, C, D, E, F>, T>;
export function defMutator<T, A, B, C, D, E, F, G>(
    path: Path7<T, A, B, C, D, E, F, G>
): Fn2<T, PathVal7<T, A, B, C, D, E, F, G>, T>;
export function defMutator<T, A, B, C, D, E, F, G, H>(
    path: Path8<T, A, B, C, D, E, F, G, H>
): Fn2<T, PathVal8<T, A, B, C, D, E, F, G, H>, T>;
export function defMutator<T, A, B, C, D, E, F, G, H>(
    path: DeepPath<T, A, B, C, D, E, F, G, H>
): Fn2<T, any, any>;
export function defMutator(path: Path): any {
    const ks = toPath(path);
    let [a, b, c, d] = ks;
    switch (ks.length) {
        case 0:
            return (_: any, x: any) => x;
        case 1:
            return (s: any, x: any) => (s ? ((s[a] = x), s) : undefined);
        case 2:
            return (s: any, x: any) => {
                let t;
                return s
                    ? (t = s[a])
                        ? ((t[b] = x), s)
                        : undefined
                    : undefined;
            };
        case 3:
            return (s: any, x: any) => {
                let t;
                return s
                    ? (t = s[a])
                        ? (t = t[b])
                            ? ((t[c] = x), s)
                            : undefined
                        : undefined
                    : undefined;
            };
        case 4:
            return (s: any, x: any) => {
                let t;
                return s
                    ? (t = s[a])
                        ? (t = t[b])
                            ? (t = t[c])
                                ? ((t[d] = x), s)
                                : undefined
                            : undefined
                        : undefined
                    : undefined;
            };
        default:
            return (s: any, x: any) => {
                let t = s;
                const n = ks.length - 1;
                for (let k = 0; k < n; k++) {
                    if (!(t = t[ks[k]])) return;
                }
                t[ks[n]] = x;
                return s;
            };
    }
}
