import { reportingState } from "../common";
import { detectClick, stopDetectingClick } from "./clicks";

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

    await reportingState.sendToRuntime({ dark: isDark });
}

export async function toggle(dark?: boolean): Promise<void> {
    return setDarkness(dark ?? !isDark);
}
