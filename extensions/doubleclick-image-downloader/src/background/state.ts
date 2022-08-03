import type { Settings } from "../common/";
import { StoredMap, makeStoredMap } from "./stored-map";
import { TypedStore, makeTypedStore } from "./typed-store";
import browser from "webextension-polyfill";

export type TabAndFrameId = [number, number | null];

// download -> [tab, frame]
export const downloads: StoredMap<number, TabAndFrameId> =
    makeStoredMap("downloads");
// notification -> download
export const notifications: StoredMap<string, number> =
    makeStoredMap("notifications");

const counter: TypedStore<number> = makeTypedStore("counter");

export async function tickCounter(settings: Settings): Promise<number> {
    const current = await counter.get();
    const next =
        current == null
            ? settings.counterStart
            : current + settings.counterStep;
    await counter.set(next);
    return next;
}

export async function resetCounter(settings: Settings): Promise<void> {
    await counter.set(settings.counterStart);
}

async function clearState(): Promise<void> {
    await downloads.clear();
    await notifications.clear();
    await counter.set(null);
}

// TODO test
export function clearStateOnStartup(): void {
    browser.runtime.onStartup.addListener(() => {
        clearState().catch(console.error);
    });
}
