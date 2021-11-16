import {Settings, write} from "../common/settings/io";

export function provideIncludeCommandTarget(settings: Settings): void {
    const includeCommandTarget = document.getElementById("includeCommandTarget") as HTMLInputElement;
    includeCommandTarget.checked = settings.includeCommandTarget;

    includeCommandTarget.addEventListener("change", () => {
        write({
            includeCommandTarget: includeCommandTarget.checked
        }).catch(console.error);
    });
}

export function provideDeduplicateHrefs(settings: Settings): void {
    const deduplicateHrefs = document.getElementById("deduplicateHrefs") as HTMLInputElement;
    deduplicateHrefs.checked = settings.deduplicateHrefs;

    deduplicateHrefs.addEventListener("change", () => {
        write({
            deduplicateHrefs: deduplicateHrefs.checked
        }).catch(console.error);
    });
}
