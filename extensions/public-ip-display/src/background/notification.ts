import browser from "webextension-polyfill";

export async function showNotification(title: string, message: string): Promise<void> {
    await browser.notifications.create({
        iconUrl: "/images/icon-128.png",
        message,
        title,
        type: "basic"
    });
}

export async function showError(title: string, message: string): Promise<void> {
    await browser.notifications.create({
        iconUrl: "/images/error-128.png",
        message,
        title,
        type: "basic"
    });
}
