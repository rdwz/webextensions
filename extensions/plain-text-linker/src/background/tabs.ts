import { ClickedMessage, load, toTabIndex } from "../common/";
import browser, { Runtime } from "webextension-polyfill";

function toUrl(text: string): URL | null {
    try {
        // will notably fail if protocol is absent
        return new URL(text);
    } catch (invalidUrl) {
        return null;
    }
}

async function tryWithProtocol(
    text: string,
    protocol: "http" | "https"
): Promise<URL | null> {
    const url = toUrl(`${protocol}://${text}`);
    if (url == null) {
        return null;
    }
    try {
        await fetch(url.href, { method: "HEAD" });
        return url;
    } catch (notReachable) {
        return null;
    }
}

export async function open(
    msg: ClickedMessage,
    sender: Runtime.MessageSender
): Promise<void> {
    const settings = await load();

    const url =
        toUrl(msg.text) ??
        (await tryWithProtocol(msg.text, "https")) ??
        (settings.tryHttp ? await tryWithProtocol(msg.text, "http") : null);

    if (url === null) {
        if (settings.notifyInvalidUrl) {
            await browser.notifications.create({
                iconUrl: "/images/icon-128.png",
                message: `Could not read this as a URL:\n${msg.text}`,
                title: "Invalid URL",
                type: "basic",
            });
        }
    } else {
        await browser.tabs.create({
            active: settings.foregroundByDefault !== msg.ctrlKey,
            index: toTabIndex(settings, sender.tab),
            url: url.href,
        });
    }
}
