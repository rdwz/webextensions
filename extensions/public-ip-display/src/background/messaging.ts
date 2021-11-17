import type { JsonObject } from "type-fest";
import browser from "webextension-polyfill";
import { asMessage } from "../common/checks";
import { Message, reportSeparator } from "../common/messages";
import { triggerable } from "../common/triggerable";
import { showNotification } from "./notification";

const { hide: refreshEvent, expose: refreshOrdered } = triggerable();
export { refreshOrdered };

async function onMessage(msg: Message): Promise<undefined | Message> {
    switch (msg.subject) {
        case "copyPerformed":
            await showNotification("", `Copied ${msg.text} to clipboard.`);
            break;

        case "wantRefresh":
            refreshEvent.trigger(undefined);
            break;

        case "needSeparator": {
            const { os } = await browser.runtime.getPlatformInfo();
            return reportSeparator(os === "win" ? "\r\n" : "\n");
        }

        default:
            throw new Error(`unknown message: ${JSON.stringify(msg)}`);
    }
}

export function listenForMessages(): void {
    browser.runtime.onMessage.addListener(async (data: JsonObject) =>
        onMessage(asMessage(data)).catch(console.error)
    );
}
