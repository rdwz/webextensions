import { HoverButtonSkin } from "./settings";
import browser from "webextension-polyfill";

export const buttonSkins: Record<
    "off" | "on",
    Record<HoverButtonSkin, string>
> = {
    off: {
        [HoverButtonSkin.alt1]: browser.runtime.getURL(
            new URL("../images/download_off_alt1.png", import.meta.url).pathname
        ),
        [HoverButtonSkin.original]: browser.runtime.getURL(
            new URL("../images/download_off_original.png", import.meta.url)
                .pathname
        ),
    },
    on: {
        [HoverButtonSkin.alt1]: browser.runtime.getURL(
            new URL("../images/download_on_alt1.png", import.meta.url).pathname
        ),
        [HoverButtonSkin.original]: browser.runtime.getURL(
            new URL("../images/download_on_original.png", import.meta.url)
                .pathname
        ),
    },
};

export const icon128 = browser.runtime.getURL(
    new URL("../images/icon-128.png", import.meta.url).pathname
);

export const error128 = browser.runtime.getURL(
    new URL("../images/error-128.png", import.meta.url).pathname
);
