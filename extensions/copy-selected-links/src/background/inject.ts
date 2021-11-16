import browser from "webextension-polyfill";

export async function injectContentScript(tabId: number): Promise<void> {
    try {
        // this throws an error if the content script doesnt return a jsonable result
        // we cant guarantee the result of the content script because of bundling
        await browser.tabs.executeScript(tabId, {
            allFrames: true,
            file: "content.js",
            runAt: "document_end"
        });
    } catch (notJsonable) {
        // ignore
    }
}
