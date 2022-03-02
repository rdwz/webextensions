import { toggleDarkness } from "./darkness";
import browser from "webextension-polyfill";

export function reactToToolbarButton(): void {
    browser.browserAction.onClicked.addListener(
        (tab) => void toggleDarkness(tab).catch(console.error)
    );
}
