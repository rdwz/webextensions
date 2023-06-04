import { StorageArea, StorageChanges, WebextStorageRepo } from "./types";
import browser from "webextension-polyfill";

export function makeRepo<T>(
    keys: (keyof T)[],
    area: StorageArea
): WebextStorageRepo<T> {
    function isKey(key: number | string | symbol): key is keyof T {
        return keys.includes(key as keyof T);
    }

    async function read(): Promise<unknown> {
        return await browser.storage[area].get(keys);
    }

    async function write(data: Partial<T>): Promise<void> {
        await browser.storage[area].set(data);
    }

    function monitor(callback: (data: unknown) => void): void {
        function triggerCallbacks(
            changes: StorageChanges,
            changeArea: string
        ): void {
            if (changeArea === area && Object.keys(changes).some(isKey)) {
                read().then(callback).catch(console.error);
            }
        }

        browser.storage.onChanged.addListener(triggerCallbacks);
    }

    return { monitor, read, write };
}
