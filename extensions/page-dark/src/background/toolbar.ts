import browser from "webextension-polyfill";
import { toggleDarkness } from "./darkness";

export function reactToToolbarButton(): void {
    browser.browserAction.onClicked.addListener(
        (tab) => void toggleDarkness(tab).catch(console.error)
    );
}
