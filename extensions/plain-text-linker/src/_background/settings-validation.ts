import { validate } from "../common";
import browser, { Runtime } from "webextension-polyfill";

import OnInstalledDetailsType = Runtime.OnInstalledDetailsType;

async function onInstall(details: OnInstalledDetailsType): Promise<void> {
    if (details.reason === "install" || details.reason === "update") {
        const valid = await validate();
        if (!valid) {
            await browser.runtime.openOptionsPage();
        }
    }
}

export function validateSettingsOnInstall(): void {
    browser.runtime.onInstalled.addListener((details) => {
        onInstall(details).catch(console.error);
    });
}
