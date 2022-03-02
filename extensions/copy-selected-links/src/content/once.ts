import { asMessage } from "../common/";
import { onMessageReceived } from "./messaging";
import browser from "webextension-polyfill";

const flag = Symbol.for("copy-selected-links-script-injection");
const register = window as {
    [flag]?: true;
};

export function setUp(): void {
    if (register[flag] == null) {
        browser.runtime.onMessage.addListener(async (data: unknown) =>
            onMessageReceived(asMessage(data))
        );

        register[flag] = true;
    }
}
