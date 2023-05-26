import { toggleDarkness } from "./darkness";
import browser from "webextension-polyfill";

export function reactToToolbarButton(): void {
    browser.browserAction.onClicked.addListener((tab) => {
        toggleDarkness(tab).catch(console.error);
    });
}
