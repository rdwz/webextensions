import type { JsonValue } from "type-fest";
import browser from "webextension-polyfill";

export interface TypedStore<V> {
    get: () => Promise<V | null>;
    set: (value: V | null) => Promise<void>;
}

export function makeTypedStore<V extends JsonValue>(
    uniqueName: string
): TypedStore<V> {
    return {
        async get(): Promise<V | null> {
            const stored = (await browser.storage.local.get(
                uniqueName
            )) as Partial<Record<typeof uniqueName, V>>;
            return stored[uniqueName] == null
                ? null
                : (stored[uniqueName] as V);
        },
        async set(value: V | null): Promise<void> {
            await browser.storage.local.set({
                uniqueName: value,
            });
        },
    };
}
