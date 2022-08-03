import browser from "webextension-polyfill";

export async function showNotification(
    title: string,
    message: string
): Promise<void> {
    await browser.notifications.create({
        iconUrl: browser.runtime.getURL(
            new URL("../images/icon-128.png", import.meta.url).pathname
        ),
        message,
        title,
        type: "basic",
    });
}

export async function showError(title: string, message: string): Promise<void> {
    await browser.notifications.create({
        iconUrl: browser.runtime.getURL(
            new URL("../images/error-128.png", import.meta.url).pathname
        ),
        message,
        title,
        type: "basic",
    });
}
