import {LocalSettings, write} from "../common/settings/local-io";

const html = {
    logLifetime: document.getElementById("logLifetime") as HTMLInputElement
};

export function rigLogLifetime(settings: LocalSettings): void {
    html.logLifetime.value = String(settings.logLifetime);

    html.logLifetime.addEventListener("input", () => {
        write({
            logLifetime: parseInt(html.logLifetime.value, 10)
        }).catch(console.error);
    });
}
