import { freshInjection, reportingState, turnDarknessOff } from "../common/";
import browser from "webextension-polyfill";

function getIcon(dark: boolean): Record<19 | 38, string> {
    const variant = dark ? "on" : "off";

    return {
        19: browser.runtime.getURL(`images/icon-${variant}-19.png`),
        38: browser.runtime.getURL(`images/icon-${variant}-38.png`),
    };
}

export function reactToMessages(): void {
    reportingState.onReceive(async (data, sender) => {
        if (sender.tab?.id == null) {
            throw new Error("received message from null-tab");
        }
        await browser.browserAction.setIcon({
            path: getIcon(data.dark),
            tabId: sender.tab.id,
        });
    });

    turnDarknessOff.onReceive(async (data, sender) => {
        if (sender.tab?.id == null) {
            throw new Error("received message from null-tab");
        }
        await turnDarknessOff.sendToTab(sender.tab.id, {
            frameId: undefined,
        })();
    });

    freshInjection.onReceive(async (data, sender) => {
        if (sender.tab?.id == null) {
            throw new Error("received message from null-tab");
        }
        await browser.tabs.insertCSS(sender.tab.id, {
            file: "content.css",
            frameId: sender.frameId,
        });
    });
}
