import browser, { Menus, Tabs } from "webextension-polyfill";
import { Settings } from "../common/settings/io";
import { load, monitorSettingsStorage } from "../common/settings/settings";
import { toggleDarkness } from "./darkness";

const TOGGLE_DARKNESS_ID = "pageDark_toggleDarkness";

async function createContextMenu(
    options: Menus.CreateCreatePropertiesType
): Promise<void> {
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

async function toggleDarknessInSourceTab(
    contextMenuInfo: Menus.OnClickData,
    tab?: Tabs.Tab
): Promise<void> {
    if (tab == null) {
        throw new Error("clicked outside a tab?");
    }
    if (contextMenuInfo.menuItemId !== TOGGLE_DARKNESS_ID) {
        throw new Error(
            `received context menu ${contextMenuInfo.menuItemId} and tab ${tab.id}?`
        );
    }

    await toggleDarkness(tab);
}

async function addOrRemoveContextMenu(settings: Settings): Promise<void> {
    try {
        await browser.contextMenus.remove(TOGGLE_DARKNESS_ID);
    } catch (probablyNotFound) {
        // ignore: menu was probably not registered
    }

    if (settings.enableDarkeningFromContextMenu) {
        // TODO "tab" is not supported by chrome
        const universalContexts: Menus.ContextType[] = [
            "page",
            "frame",
            "video",
        ];

        try {
            await createContextMenu({
                contexts: [...universalContexts, "tab"],
                documentUrlPatterns: ["*://*/*"],
                id: TOGGLE_DARKNESS_ID,
                title: "Toggle darkness",
                type: "normal",
            });
        } catch (probablyTabNotSupported) {
            await createContextMenu({
                contexts: universalContexts,
                documentUrlPatterns: ["*://*/*"],
                id: TOGGLE_DARKNESS_ID,
                title: "Toggle darkness",
                type: "normal",
            });
        }
    }
}

export function provideContextMenu(): void {
    browser.contextMenus.onClicked.addListener(
        (clicked, tab) =>
            void toggleDarknessInSourceTab(clicked, tab).catch(console.error)
    );

    load().then(addOrRemoveContextMenu).catch(console.error);

    monitorSettingsStorage(
        (settings) => void addOrRemoveContextMenu(settings).catch(console.error)
    );
}
