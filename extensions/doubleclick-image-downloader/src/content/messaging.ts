import browser from "webextension-polyfill";
import {asMessage, Message, TriggeredMessage} from "../common/messages";
import {startDownload, completeDownload} from "./downloads";
import {downloadHoveredImage} from "./hotkey";
import {getImagesInSelection} from "./selection";

async function reactToMessage(msg: Message): Promise<undefined | TriggeredMessage> {
    switch (msg.subject) {
        case "downloadStarted":
            throw new Error("download start message should have been handled inline");

        case "getImagesInSelection":
            await Promise.all(getImagesInSelection().map(startDownload));
            return;

        case "downloadFinished":
            completeDownload(msg);
            return;

        case "downloadRequested":
            throw new Error("content script should not receive download request");

        case "hotkeyTriggered":
            return downloadHoveredImage();

        default:
            throw new Error(`unrecognized message: ${JSON.stringify(msg)}`);
    }
}

export function listenForMessages(): void {
    browser.runtime.onMessage.addListener(async (data: unknown) => reactToMessage(asMessage(data)).catch(console.error));
}
