import browser from "webextension-polyfill";
import {asMessage, Message} from "../common/messages";
import {toggle} from "./darkness";

async function interpretMessage(data: Message): Promise<void> {
    switch (data.subject) {
        case "toggleDarkness":
            return toggle();
        case "turnDarknessOff":
            return toggle(false);
        default:
            throw new Error(`unknown message: ${JSON.stringify(data)}`);
    }
}

export function reactToMessages(): void {
    browser.runtime.onMessage.addListener((message: unknown) => void interpretMessage(asMessage(message)).catch(console.error));
}