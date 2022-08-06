import { load } from "../common";
import { resetCounter } from "./state";
import browser from "webextension-polyfill";

async function reset(): Promise<void> {
    const settings = await load();
    resetCounter(settings);
}

export function reactToToolbarButton(): void {
    browser.browserAction.onClicked.addListener(() => {
        reset().catch(console.error);
    });
}
