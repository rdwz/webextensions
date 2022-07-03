import { toggleDarkness } from "../common/";
import browser, { Tabs } from "webextension-polyfill";

export async function toggleDarknessInPage(tab: Tabs.Tab): Promise<void> {
    if (tab.id == null) {
        throw new Error("expected a tab with an id");
    }

    try {
        // this throws an error if the content script doesnt return a jsonable result
        // we cant guarantee the result of the content script because of bundling
        await browser.tabs.executeScript(tab.id, {
            allFrames: true,
            file: "content.js",
            runAt: "document_end",
        });
    } catch (notJsonable) {
        // ignore
    }

    await toggleDarkness.sendToTab(tab.id, {
        // we want to send it to all frames in the tab
        frameId: undefined,
    })();
}
