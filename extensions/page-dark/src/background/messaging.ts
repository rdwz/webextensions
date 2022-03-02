import { Message, asMessage, signal } from "../common/";
import browser, { Runtime } from "webextension-polyfill";

function getIcon(dark: boolean): Record<19 | 38, string> {
    const variant = dark ? "on" : "off";

    return {
        19: browser.runtime.getURL(`images/icon-${variant}-19.png`),
        38: browser.runtime.getURL(`images/icon-${variant}-38.png`),
    };
}

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
                path: getIcon(data.dark),
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
    browser.runtime.onMessage.addListener(
        (data: unknown, sender) =>
            void interpretMessage(asMessage(data), sender).catch(console.error)
    );
}
