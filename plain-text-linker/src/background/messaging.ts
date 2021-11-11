import {UnreachableCaseError} from "ts-essentials";
import browser, {Runtime} from "webextension-polyfill";
import {asMessage, Message} from "../common/messages";
import {open} from "./tabs";

async function interpretMessage(message: Message, sender: Runtime.MessageSender): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (message.subject === "clickedText") {
        await open(message, sender);
    } else {
        throw new UnreachableCaseError(message.subject);
    }
}

export function waitForMessage(): void {
    browser.runtime.onMessage.addListener((data: unknown, sender) => void interpretMessage(asMessage(data), sender).catch(console.error));
}
