import browser, {Runtime, Storage} from "webextension-polyfill";
import {ipGetter} from "../common/fetch-ip";
import {validate as validateLocal} from "../common/settings/local-settings";
import {isSyncSettingsProperty, SyncSettings} from "../common/settings/sync-io";
import {load as loadSync, validate as validateSync} from "../common/settings/sync-settings";
import {triggerable} from "../common/triggerable";
import {setTimer} from "./timing";
import {setToolbarIcon} from "./toolbar";

async function monitorUpdates(details: Runtime.OnInstalledDetailsType): Promise<void> {
    if (details.reason === "install" || details.reason === "update") {
        const [syncValid, localValid] = await Promise.all([validateSync(), validateLocal()]);
        if (!syncValid || !localValid) {
            await browser.runtime.openOptionsPage();
        }
    }
}

const {hide: essentialConfigChangedEvent, expose: essentialConfigChanged} = triggerable();
export {essentialConfigChanged};

async function onSettingChange(key: keyof SyncSettings, change: Storage.StorageChange): Promise<void> {
    switch (key) {
        case "ipEchoService":
        case "countryCodeService":
            essentialConfigChangedEvent.trigger(undefined);
            break;

        case "lookUpCountry":
        case "displayFlag":
            if (change.newValue === false) {
                await setToolbarIcon(null);
            }
            break;

        case "refreshRate": {
            const settings = await loadSync();
            const [, timeout] = ipGetter(settings.ipEchoService);
            setTimer(Math.max(change.newValue as number, timeout));
            break;
        }

        default:
        // ignore
    }
}

async function monitorChanges(changes: Record<string, Storage.StorageChange | undefined>, areaName: string): Promise<void> {
    if (areaName === "sync") {
        const promises = Object.keys(changes)
            .filter(isSyncSettingsProperty)
            .map(async key => {
                const change = changes[key];
                if (change == null) {
                    throw new Error("property disappeared?");
                }
                return onSettingChange(key, change);
            });

        await Promise.all(promises);
    }
}

export function watchSettingsChanges(): void {
    browser.runtime.onInstalled.addListener(details => void monitorUpdates(details).catch(console.error));
    browser.storage.onChanged.addListener((changes, area) => void monitorChanges(changes, area).catch(console.error));
}
