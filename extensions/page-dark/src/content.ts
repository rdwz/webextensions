import { signal } from "./common/messages";
import { reactToMessages } from "./content/messaging";
import browser from "webextension-polyfill";

const flag = Symbol.for("page-dark-script-injection");
const register = window as {
    [flag]?: true;
};

if (register[flag] == null) {
    reactToMessages();
    browser.runtime.sendMessage(signal("freshInjection")).catch(console.error);
    register[flag] = true;
}
