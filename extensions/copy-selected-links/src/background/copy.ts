import {
    Link,
    applyPattern,
    asMessage,
    linksRequested,
    load,
} from "../common/";
import { injectContentScript } from "./inject";
import browser, { Tabs } from "webextension-polyfill";

async function notify(title: string, message: string): Promise<void> {
    await browser.notifications.create({
        iconUrl: "/images/icon-128.png",
        message,
        title,
        type: "basic",
    });
}

const isWindows = browser.runtime
    .getPlatformInfo()
    .then((platformInfo) => platformInfo.os === "win");

export async function arrangeCopy(
    tab: Tabs.Tab,
    frameId?: number,
    externalContextLink?: Link
): Promise<void> {
    if (tab.id == null) {
        throw new Error(`received a tab without an id?`);
    }

    await injectContentScript(tab.id);

    const message = linksRequested(externalContextLink ?? null);
    const response = await browser.tabs
        .sendMessage(tab.id, message, { frameId })
        .then(asMessage);

    if (response.subject !== "linksPicked") {
        throw new Error(`unknown response ${JSON.stringify(response)}`);
    }

    const settings = await load();

    if (response.links.length > 0) {
        const newline = (await isWindows) ? "\r\n" : "\n";
        const joined = response.links
            .map((link) => applyPattern(link, settings.copyPattern))
            .join(newline);

        await navigator.clipboard.writeText(
            settings.finalNewline ? joined + newline : joined
        );

        if (settings.popupSuccess) {
            await notify(
                "",
                `Copied ${response.links.length} links to clipboard.`
            );
        }
    } else {
        if (settings.popupFail) {
            await notify("", "No links found.");
        }
    }
}
