import { Local, Sync, SyncIO, ipGetter } from "../common";
import { setTimer } from "./timing";
import { setToolbarIcon } from "./toolbar";
import { makeTriggerable } from "@webextensions/common";
import browser, { Runtime, Storage } from "webextension-polyfill";

async function monitorUpdates(
    details: Runtime.OnInstalledDetailsType
): Promise<void> {
    if (details.reason === "install" || details.reason === "update") {
        const [syncValid, localValid] = await Promise.all([
            Sync.validate(),
            Local.validate(),
        ]);
        if (!syncValid || !localValid) {
            await browser.runtime.openOptionsPage();
        }
    }
}

const { hide: essentialConfigChangedEvent, expose: essentialConfigChanged } =
    makeTriggerable();
export { essentialConfigChanged };

async function onSettingChange(
    key: keyof SyncIO.SyncSettings,
    change: Storage.StorageChange
): Promise<void> {
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
            const settings = await Sync.load();
            const [, timeout] = ipGetter(settings.ipEchoService);
            setTimer(Math.max(change.newValue as number, timeout));
            break;
        }

        default:
        // ignore
    }
}

async function monitorChanges(
    changes: Record<string, Storage.StorageChange | undefined>,
    areaName: string
): Promise<void> {
    if (areaName === "sync") {
        const promises = Object.keys(changes)
            .filter(SyncIO.isSyncSettingsProperty)
            .map(async (key) => {
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
    browser.runtime.onInstalled.addListener((details) => {
        monitorUpdates(details).catch(console.error);
    });
    browser.storage.onChanged.addListener((changes, area) => {
        monitorChanges(changes, area).catch(console.error);
    });
}
