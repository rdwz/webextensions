import browser from "webextension-polyfill";
import { renderSvg } from "./svg";

export async function setToolbarIcon(
    countryCode: string | null
): Promise<void> {
    if (countryCode == null) {
        await browser.browserAction.setIcon({
            path: {
                19: "/images/icon-19.png",
                38: "/images/icon-38.png",
            },
        });
    } else {
        // TODO wait for chrome to support svg directly
        const imageData = await renderSvg(
            "canvas",
            "img",
            `/images/flags/${countryCode}.svg`
        );

        await browser.browserAction.setIcon({
            imageData,
        });
    }
}

export async function setToolbarTooltip(tooltip: string): Promise<void> {
    await browser.browserAction.setTitle({
        title: tooltip,
    });
}
