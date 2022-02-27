import type { Settings } from "../common/settings/io";

export type TabAndFrameId = [number, number | null];

// download -> [tab, frame]
export const downloads = new Map<number, TabAndFrameId>();
// notification -> download
export const notifications = new Map<string, number>();

// requires persistent script
// TODO move to local storage?
let counter = NaN;
export function tickCounter(settings: Settings): number {
    if (isNaN(counter)) {
        counter = settings.counterStart;
    } else {
        counter += settings.counterStep;
    }
    return counter;
}
