import {
    DownloadChangedMessage,
    asMessage,
    load,
    requestDownload,
} from "../common";
import browser from "webextension-polyfill";

const activeClass = "doubleclick-image-downloader-active";
const downloadingImages = new Map<number, HTMLImageElement>();

function markAsDownloading(
    image: HTMLImageElement,
    message: DownloadChangedMessage
): void {
    image.classList.add(activeClass);
    downloadingImages.set(message.downloadId, image);
}

export async function startDownload(image: HTMLImageElement): Promise<void> {
    const sendMessage = browser.runtime
        .sendMessage(requestDownload(image))
        .then(asMessage);

    const [response, settings] = await Promise.all([sendMessage, load()]);

    if (response.subject === "downloadStarted") {
        if (settings.greyOut) {
            markAsDownloading(image, response);
        }
    } else {
        throw new Error(`unexpected response ${JSON.stringify(response)}`);
    }
}

export function completeDownload(message: DownloadChangedMessage): void {
    const image = downloadingImages.get(message.downloadId);
    if (image == null) {
        throw new Error(`unmatched image for download ${message.downloadId}`);
    }

    image.classList.remove(activeClass);
    downloadingImages.delete(message.downloadId);
}
