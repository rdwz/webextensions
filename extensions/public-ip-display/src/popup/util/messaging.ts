import { Message, asMessage, copied, signal } from "../../common";
import browser from "webextension-polyfill";

export function sendCopyHappened(text: string): void {
    browser.runtime.sendMessage(copied(text)).catch(console.error);
}

export function sendRefreshWanted(): void {
    browser.runtime.sendMessage(signal("wantRefresh")).catch(console.error);
}

export async function requestSeparator(): Promise<Message> {
    return browser.runtime.sendMessage(signal("needSeparator")).then(asMessage);
}
