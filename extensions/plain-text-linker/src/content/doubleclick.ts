import { clickedText } from "../common/messages";
import { load } from "../common/settings/settings";
import { extractText } from "./scanning";
import browser from "webextension-polyfill";

const IGNORED_NODE_NAMES = ["TEXTAREA", "INPUT"];

export async function getTextFromSelection(
    doubleClick: MouseEvent
): Promise<void> {
    if (
        doubleClick.target == null ||
        IGNORED_NODE_NAMES.includes(
            (doubleClick.target as HTMLElement).nodeName
        )
    ) {
        return;
    }

    const selection = getSelection();
    if (selection == null) {
        throw new Error("selection disappeared?");
    }

    if (selection.toString().length === 0) {
        return;
    }

    const settings = await load();
    if (settings.requireShiftKey && !doubleClick.shiftKey) {
        return;
    }

    const text = extractText(selection);
    if (text != null) {
        await browser.runtime.sendMessage(
            clickedText(text, doubleClick.ctrlKey)
        );
    }
}
