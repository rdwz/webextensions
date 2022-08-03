import { makeTypedStore } from "./typed-store";
import type { JsonValue } from "type-fest";

export interface StoredMap<K, V> {
    clear: () => Promise<void>;

    delete: (key: K) => Promise<void>;

    get: (key: K) => Promise<V | null>;

    set: (key: K, value: V) => Promise<void>;
}

export function makeStoredMap<K extends string | number, V extends JsonValue>(
    uniqueName: string
): StoredMap<K, V> {
    const store = makeTypedStore<Record<K, V>>(uniqueName);

    return {
        async clear(): Promise<void> {
            await store.set(null);
        },
        async delete(key: K): Promise<void> {
            const map = await store.get();
            if (map != null) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete map[key];
                await store.set(map);
            }
        },
        async get(key: K): Promise<V | null> {
            const map = await store.get();
            return map == null ? null : map[key];
        },
        async set(key: K, value: V): Promise<void> {
            const map = (await store.get()) ?? ({} as Record<K, V>);
            map[key] = value;
            await store.set(map);
        },
    };
}
