import browser, {Tabs} from "webextension-polyfill";
import {asMessage, linksRequested} from "../common/messages";
import {injectContentScript} from "./inject";

export async function arrangeOpen(tab: Tabs.Tab, frameId?: number, contextualUrl?: string): Promise<void> {
    if (tab.id == null) {
        throw new Error(`received a tab without an id?`);
    }

    await injectContentScript(tab.id);

    const message = linksRequested(contextualUrl ?? null);
    const response = await browser.tabs.sendMessage(tab.id, message, {frameId}).then(asMessage);
    if (response.subject !== "linksPicked") {
        throw new Error(`unexpected response ${JSON.stringify(response)}`);
    }

    await Promise.all(response.hrefs.map(async href => browser.tabs.create({active: false, url: href})));
}
