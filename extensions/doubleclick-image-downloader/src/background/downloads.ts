import {
    SuggestionCallback,
    fileNamingSupport,
    finished,
    load,
    renameFunctionally,
} from "../common/";
import { notifyCompletion, notifyFailure } from "./notifications";
import { TabAndFrameId, downloads, tickCounter } from "./state";
import browser, { Downloads, Tabs } from "webextension-polyfill";

async function indicateFinished(
    source: TabAndFrameId,
    delta: Downloads.OnChangedDownloadDeltaType
): Promise<void> {
    const [tabId, frameId] = source;
    await downloads.delete(delta.id);
    await browser.tabs.sendMessage(tabId, finished(delta.id), {
        frameId: frameId ?? undefined,
    });
}

async function handleEndOfDownload(
    delta: Downloads.OnChangedDownloadDeltaType
): Promise<void> {
    const source = await downloads.get(delta.id);
    if (source == null) {
        // not a download from this addon!
        return;
    }

    const state = delta.state?.current as Downloads.State | null;

    switch (state) {
        case "complete": {
            console.info("end dl");

            indicateFinished(source, delta).catch(console.error);

            const settings = await load();

            if (settings.notify) {
                const [downloadItem] = await browser.downloads.search({
                    id: delta.id,
                });

                return downloadItem == null
                    ? undefined
                    : notifyCompletion(downloadItem);
            }

            break;
        }
        case "interrupted": {
            const [download] = await browser.downloads.search({
                id: delta.id,
            });
            if (download == null || download.error === "USER_CANCELED") {
                indicateFinished(source, delta).catch(console.error);
            } else {
                await notifyFailure(download);
            }

            break;
        }
        default:
        // ignore
    }
}

async function determineFilename(
    downloadItem: Downloads.DownloadItem,
    suggest: SuggestionCallback
): Promise<void> {
    console.info("rename started", downloadItem);

    const downloadData = await downloads.get(downloadItem.id);
    if (downloadData == null) {
        // not a download from this addon!
        return;
    }

    const settings = await load();
    if (settings.enableRename) {
        const tab = await browser.tabs.get(downloadData[0]);
        const filename = await renameFunctionally(
            downloadItem.filename,
            tickCounter,
            {
                imageUrl: new URL(downloadItem.url),
                settings,
                tab,
            }
        );

        console.info(filename);

        suggest({
            conflictAction: settings.onFilenameConflict,
            filename,
        });
    } else {
        suggest();
    }
}

export async function startDownload(
    img: URL,
    tab: Tabs.Tab,
    frameId: number | null
): Promise<number> {
    console.info("starting dl");
    const settings = await load();
    const downloadId = await browser.downloads.download({
        conflictAction: settings.onFilenameConflict,
        url: img.href,
    });

    if (tab.id == null) {
        throw new Error("tab without id?");
    }
    await downloads.set(downloadId, [tab.id, frameId]);

    return downloadId;
}

export function monitorDownloads(): void {
    fileNamingSupport()?.addListener((item, suggest) => {
        determineFilename(item, suggest).catch((error) => {
            console.error(error);
            suggest();
        });
        return true;
    });
    browser.downloads.onChanged.addListener((delta) => {
        handleEndOfDownload(delta).catch(console.error);
    });
}
