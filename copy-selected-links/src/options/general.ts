import {applyPattern, PATTERN_VARIABLES} from "../common/pattern";
import {Settings, write} from "../common/settings/io";

export function provideFinalNewline(settings: Settings): void {
    const finalNewlineCheckbox = document.getElementById("finalNewline") as HTMLInputElement;
    finalNewlineCheckbox.checked = settings.finalNewline;

    finalNewlineCheckbox.addEventListener("change", () => {
        write({
            finalNewline: finalNewlineCheckbox.checked
        }).catch(console.error);
    });
}

const copyPatternTextbox = document.getElementById("copyPattern") as HTMLInputElement;
const copyPatternPreviewNode = document.getElementById("copyPatternPreview")!;

function renderPatternPreview(): void {
    copyPatternPreviewNode.innerText = applyPattern({text: "go to example.net", url: "https://example.net/"}, copyPatternTextbox.value);
}

export function provideCopyPattern(settings: Settings): void {
    copyPatternTextbox.value = settings.copyPattern;
    renderPatternPreview();

    copyPatternTextbox.addEventListener("input", () => {
        if (copyPatternTextbox.value.trim() === "") {
            copyPatternTextbox.value = PATTERN_VARIABLES.url;
        }

        write({
            copyPattern: copyPatternTextbox.value
        }).catch(console.error);
        renderPatternPreview();
    });
}
