import { toggleDarkness } from "./darkness";
import browser from "webextension-polyfill";

async function toggleCurrenTabDarkness(): Promise<void> {
    const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
    });
    if (tab?.id == null) {
        throw new Error("missing tab id");
    }

    await toggleDarkness(tab);
}

export function monitorHotkey(): void {
    browser.commands.onCommand.addListener((command) => {
        switch (command) {
            case "darken-page":
                toggleCurrenTabDarkness().catch(console.error);
                break;
            default:
                throw new Error(`unknown hotkey command: ${command}`);
        }
    });
}
