import { DownloadChangedMessage, Message, asMessage, started } from "../common";
import { startDownload } from "./downloads";
import browser, { Runtime } from "webextension-polyfill";

async function reactToMessage(
    msg: Message,
    sender: Runtime.MessageSender
): Promise<DownloadChangedMessage> {
    switch (msg.subject) {
        case "downloadRequested": {
            if (sender.tab == null) {
                throw new Error("starting a download headlessly?");
            }
            const downloadId = await startDownload(
                new URL(msg.imageUrl),
                sender.tab,
                sender.frameId ?? null
            );
            return started(downloadId);
        }
        default:
            throw new Error(`unknown message: ${JSON.stringify(msg)}`);
    }
}

export function listenForMessages(): void {
    browser.runtime.onMessage.addListener(async (data: unknown, sender) =>
        reactToMessage(asMessage(data), sender)
    );
}
