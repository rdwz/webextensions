import {noop} from "ts-essentials";
import browser, {Menus, Tabs} from "webextension-polyfill";
import {Settings} from "../common/settings/io";
import {monitor} from "../common/settings/monitoring";
import {load} from "../common/settings/settings";
import {arrangeCopy} from "./copy";
import {arrangeOpen} from "./open";

const CONTEXT_MENU_IDS = {
    copyLinks: "copySelectedLinks_CopySelectedLinks",
    openLinks: "copySelectedLinks_OpenSelectedLinks"
} as const;

async function createContextMenu(options: Menus.CreateCreatePropertiesType): Promise<void> {
    return new Promise((resolve, reject) => {
        browser.contextMenus.create(options, (): void => {
            if (browser.runtime.lastError == null) {
                resolve();
            } else {
                reject(new Error(browser.runtime.lastError.message));
            }
        });
    });
}

async function reactToContextMenu(contextMenuInfo: Menus.OnClickData, tab?: Tabs.Tab): Promise<void> {
    if (tab == null) {
        throw new Error("invoked context menu without a tab?");
    }

    const {linkText: text, linkUrl: url} = contextMenuInfo;

    switch (contextMenuInfo.menuItemId) {
        case CONTEXT_MENU_IDS.copyLinks:
            await arrangeCopy(tab, contextMenuInfo.frameId, url == null || text == null ? undefined : {text, url});
            break;
        case CONTEXT_MENU_IDS.openLinks:
            await arrangeOpen(tab, contextMenuInfo.frameId, url);
            break;
        default:
            throw new Error(`received unknown context menu command: ${contextMenuInfo.menuItemId}`);
    }
}

async function manageMenus(settings: Settings): Promise<void> {
    await browser.contextMenus.remove(CONTEXT_MENU_IDS.copyLinks).catch(noop);
    await browser.contextMenus.remove(CONTEXT_MENU_IDS.openLinks).catch(noop);

    if (settings.showCopyMenuAction) {
        await createContextMenu({
            contexts: ["selection", "link"],
            documentUrlPatterns: ["*://*/*", "file:///*"],
            id: CONTEXT_MENU_IDS.copyLinks,
            title: "Copy selected links",
            type: "normal"
        });
    }

    if (settings.showOpenMenuAction) {
        await createContextMenu({
            contexts: ["selection", "link"],
            documentUrlPatterns: ["*://*/*", "file:///*"],
            id: CONTEXT_MENU_IDS.openLinks,
            title: "Open selected links",
            type: "normal"
        });
    }
}

export function registerMenu(): void {
    browser.contextMenus.onClicked.addListener((data, tab) => void reactToContextMenu(data, tab).catch(console.error));

    load().then(manageMenus).catch(console.error);

    monitor("showCopyMenuAction", settings => void manageMenus(settings).catch(console.error));
    monitor("showOpenMenuAction", settings => void manageMenus(settings).catch(console.error));
}
