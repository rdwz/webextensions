import { deepEqual } from "fast-equals";
import browser from "webextension-polyfill";
import { correct, isSetting, read, Settings, write } from "./io";

export async function load(): Promise<Settings> {
    const raw = await read();
    return correct(raw);
}

export async function validate(): Promise<boolean> {
    const raw = await read();
    const validated = correct(raw);

    if (deepEqual(validated, raw)) {
        return true;
    } else {
        await write(validated);
        return false;
    }
}

export function monitorSettingsStorage(
    callback: (settings: Settings) => void
): void {
    browser.storage.onChanged.addListener((changes, area) => {
        if (area === "sync" && Object.keys(changes).some(isSetting)) {
            load().then(callback).catch(console.error);
        }
    });
}
