import { signal } from "../common/";
import browser from "webextension-polyfill";

const MEDIA_NODE_NAMES = ["VIDEO", "EMBED", "OBJECT"];

async function requestDarknessOff(event: MouseEvent): Promise<void> {
    if (event.target == null || !(event.target instanceof Node)) {
        throw new Error("click without target?");
    }

    if (!MEDIA_NODE_NAMES.includes(event.target.nodeName)) {
        await browser.runtime.sendMessage(signal("turnDarknessOff"));
    }
}

const listener = (event: MouseEvent): void =>
    void requestDarknessOff(event).catch(console.error);

export function detectClick(): void {
    document.documentElement.addEventListener("click", listener);
}

export function stopDetectingClick(): void {
    document.documentElement.removeEventListener("click", listener);
}
