import {reportState} from "../common/messages";
import {detectClick, stopDetectingClick} from "./clicks";
import browser from "webextension-polyfill";

let isDark = false;

async function setDarkness(beDark: boolean): Promise<void> {
    if (isDark === beDark) {
        return;
    }

    if (beDark) {
        document.documentElement.dataset.darken = "darken";
        detectClick();
    } else {
        delete document.documentElement.dataset.darken;
        stopDetectingClick();
    }

    isDark = beDark;

    await browser.runtime.sendMessage(reportState(isDark));
}

export async function toggle(dark?: boolean): Promise<void> {
    return setDarkness(dark ?? !isDark);
}
