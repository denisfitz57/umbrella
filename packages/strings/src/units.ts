import { memoizeJ } from "@thi.ng/memoize";
import { Stringer } from "./api";

export const units: (
    exp: [number, string, number?][],
    base: string,
    prec?: number
) => Stringer<number> = memoizeJ((exp, base: string, prec = 2) => {
    const groups = exp
        .map((x) => [x[0], x[2] != null ? x[2] : prec, x[1]])
        .sort((a, b) => a[0] - b[0]);
    return (x: number) => {
        if (x === 0) {
            return `0${base}`;
        }
        const absX = Math.abs(x);
        for (let i = groups.length; --i >= 0; ) {
            const g = groups[i];
            if (absX >= g[0] || i === 0) {
                return (x / g[0]).toFixed(g[1]) + g[2];
            }
        }
    };
});

const KB = 1024;
const MB = 1024 * 1024;

export const bits = units(
    [[1, " bits", 0], [KB, " Kb"], [MB, " Mb"], [KB * MB, " Gb"]],
    " bits",
    2
);

export const bytes = units(
    [
        [1, " bytes", 0],
        [KB, " KB"],
        [MB, " MB"],
        [KB * MB, " GB"],
        [MB * MB, " TB"],
        [KB * MB * MB, " PB"]
    ],
    " bytes",
    2
);

export const seconds = units(
    [
        [1e-12, " ps"],
        [1e-9, " ns"],
        [1e-6, " µs"],
        [1e-3, " ms"],
        [1, " secs"],
        [60, " mins"],
        [60 * 60, " hours"],
        [24 * 60 * 60, " days"]
    ],
    " secs",
    3
);

export const meters = units(
    [
        [1e-12, " pm"],
        [1e-9, " nm"],
        [1e-6, " µm"],
        [1e-3, " mm"],
        [1e-2, " cm"],
        [1, " m"],
        [1e3, " km"]
    ],
    " m",
    2
);

export const grams = units(
    [
        [1e-12, " pg"],
        [1e-9, " ng"],
        [1e-6, " µg"],
        [1e-3, " mg"],
        [1, " g"],
        [1e3, " kg"],
        [1e6, " t"],
        [1e9, " kt"],
        [1e12, " Mt"]
    ],
    " g",
    2
);
