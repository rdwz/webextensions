import browser, { Runtime } from "webextension-polyfill";
import { validate } from "../common/settings/settings";

async function showOptions(
    details: Runtime.OnInstalledDetailsType
): Promise<void> {
    if (details.reason === "install" || details.reason === "update") {
        const valid = await validate();
        return valid ? undefined : browser.runtime.openOptionsPage();
    }
}

export function fixSettingsOnUpdate(): void {
    browser.runtime.onInstalled.addListener(
        (details) => void showOptions(details).catch(console.error)
    );
}
