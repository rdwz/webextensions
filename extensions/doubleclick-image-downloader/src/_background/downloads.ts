import {
    SuggestionCallback,
    fileNamingSupport,
    finished,
    load,
    renameFunctionally,
} from "../common";
import { notifyCompletion, notifyFailure } from "./notifications";
import { TabAndFrameId, downloads, tickCounter } from "./state";
import browser, { Downloads, Tabs } from "webextension-polyfill";

function indicateFinished(
    source: TabAndFrameId,
    delta: Downloads.OnChangedDownloadDeltaType
): void {
    const [tabId, frameId] = source;
    downloads.delete(delta.id);
    browser.tabs
        .sendMessage(tabId, finished(delta.id), {
            frameId: frameId ?? undefined,
        })
        .catch(console.error);
}

async function handleEndOfDownload(
    delta: Downloads.OnChangedDownloadDeltaType
): Promise<void> {
    const source = downloads.get(delta.id);
    if (source == null) {
        // not a download from this addon!
        return;
    }

    const state = delta.state?.current as Downloads.State | null;

    switch (state) {
        case "complete": {
            indicateFinished(source, delta);

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
                indicateFinished(source, delta);
            } else {
                await notifyFailure(download);
            }

            break;
        }
        default:
        // ignore
    }
}

function determiningFilename(
    downloadItem: Downloads.DownloadItem,
    suggest: SuggestionCallback
): true | undefined {
    const downloadData = downloads.get(downloadItem.id);
    if (downloadData == null) {
        // not a download from this addon!
        return;
    }

    load()
        .then(async (settings) => {
            if (settings.enableRename) {
                const tab = await browser.tabs.get(downloadData[0]);
                const filename = renameFunctionally(
                    downloadItem.filename,
                    tickCounter,
                    {
                        imageUrl: new URL(downloadItem.url),
                        settings,
                        tab,
                    }
                );

                suggest({
                    conflictAction: settings.onFilenameConflict,
                    filename,
                });
            } else {
                suggest();
            }
        })
        .catch((error: Error) => {
            console.error(error);
            suggest();
        });

    return true;
}

export async function startDownload(
    img: URL,
    tab: Tabs.Tab,
    frameId: number | null
): Promise<number> {
    const settings = await load();
    const downloadId = await browser.downloads.download({
        conflictAction: settings.onFilenameConflict,
        url: img.href,
    });

    if (tab.id == null) {
        throw new Error("tab without id?");
    }
    downloads.set(downloadId, [tab.id, frameId]);

    return downloadId;
}

export function monitorDownloads(): void {
    fileNamingSupport()?.addListener(determiningFilename);
    browser.downloads.onChanged.addListener((delta) => {
        handleEndOfDownload(delta).catch(console.error);
    });
}
