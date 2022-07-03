import { toggleDarknessInPage } from "./darkness";
import browser from "webextension-polyfill";

export function reactToToolbarButton(): void {
    browser.browserAction.onClicked.addListener((tab) => {
        toggleDarknessInPage(tab).catch(console.error);
    });
}
