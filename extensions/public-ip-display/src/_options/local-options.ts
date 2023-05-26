import { LocalIO } from "../common";

const html = {
    logLifetime: document.getElementById("logLifetime") as HTMLInputElement,
};

export function rigLogLifetime(settings: LocalIO.LocalSettings): void {
    html.logLifetime.value = String(settings.logLifetime);

    html.logLifetime.addEventListener("input", () => {
        LocalIO.write({
            logLifetime: parseInt(html.logLifetime.value, 10),
        }).catch(console.error);
    });
}
