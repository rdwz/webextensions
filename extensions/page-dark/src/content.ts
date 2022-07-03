import { freshInjection } from "./common/";
import { reactToMessages } from "./content/";

const flag = Symbol.for("page-dark-script-injection");
const register = window as {
    [flag]?: true;
};

if (register[flag] == null) {
    reactToMessages();
    freshInjection.sendToRuntime().catch(console.error);
    register[flag] = true;
}
