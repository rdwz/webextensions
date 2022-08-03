import { Message, asMessage, signal } from "../common/";
import browser, { Runtime } from "webextension-polyfill";

const offIcons = {
    19: browser.runtime.getURL(
        new URL("../images/icon-off-19.png", import.meta.url).pathname
    ),
    38: browser.runtime.getURL(
        new URL("../images/icon-off-38.png", import.meta.url).pathname
    ),
};

const onIcons = {
    19: browser.runtime.getURL(
        new URL("../images/icon-on-19.png", import.meta.url).pathname
    ),
    38: browser.runtime.getURL(
        new URL("../images/icon-on-38.png", import.meta.url).pathname
    ),
};

async function interpretMessage(
    data: Message,
    sender: Runtime.MessageSender
): Promise<void> {
    if (sender.tab?.id == null) {
        throw new Error("received message from null-tab");
    }

    switch (data.subject) {
        case "reportingState":
            return browser.browserAction.setIcon({
                path: data.dark ? onIcons : offIcons,
                tabId: sender.tab.id,
            });

        case "turnDarknessOff":
            await browser.tabs.sendMessage(
                sender.tab.id,
                signal("turnDarknessOff"),
                {
                    frameId: undefined,
                }
            );
            break;

        case "freshInjection":
            return browser.tabs.insertCSS(sender.tab.id, {
                file: "content.css",
                frameId: sender.frameId,
            });

        default:
            throw new Error(`unknown message: ${JSON.stringify(data)}`);
    }
}

export function reactToMessages(): void {
    browser.runtime.onMessage.addListener((data: unknown, sender) => {
        interpretMessage(asMessage(data), sender).catch(console.error);
    });
}
