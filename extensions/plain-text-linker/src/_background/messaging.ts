import { Message, asMessage } from "../common";
import { open } from "./tabs";
import { UnreachableCaseError } from "ts-essentials";
import browser, { Runtime } from "webextension-polyfill";

async function interpretMessage(
    message: Message,
    sender: Runtime.MessageSender
): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (message.subject === "clickedText") {
        await open(message, sender);
    } else {
        throw new UnreachableCaseError(message.subject);
    }
}

export function waitForMessage(): void {
    browser.runtime.onMessage.addListener((data: unknown, sender) => {
        interpretMessage(asMessage(data), sender).catch(console.error);
    });
}
