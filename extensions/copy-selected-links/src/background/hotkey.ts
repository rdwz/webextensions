import browser from "webextension-polyfill";
import {arrangeCopy} from "./copy";

async function copyLinks(): Promise<void> {
    const [tab] = await browser.tabs.query({active: true, currentWindow: true});
    if (tab == null) {
        throw new Error("there's no active tab?");
    }
    arrangeCopy(tab).catch(console.error);
}

export function monitorHotkey(): void {
    browser.commands.onCommand.addListener(command => {
        switch (command) {
            case "copy-selected-links":
                copyLinks().catch(console.error);
                break;
            default:
                throw new Error(`unknown hotkey command: ${command}`);
        }
    });
}
