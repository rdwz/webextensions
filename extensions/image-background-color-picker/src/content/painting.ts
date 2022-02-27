import type { Settings } from "../common/io";
import { load, monitor } from "../common/settings";
import { isImagePage } from "./detection";

const applicable = "image-background-color-picker-applicable";
const checkerboardClass = "image-background-color-picker-checkerboard";
const page = document.documentElement;

function enable(): (settings: Settings) => void {
    page.classList.add(applicable);

    return (settings: Settings) => {
        if (settings.checkerBoard) {
            page.classList.add(checkerboardClass);
            page.style.backgroundColor = "";
        } else {
            page.style.backgroundColor = settings.color;
            page.classList.remove(checkerboardClass);
        }
    };
}

export async function paintIfAppropriate(): Promise<void> {
    const isImage = await isImagePage();

    if (isImage) {
        const paint = enable();

        monitor((settings) => paint(settings));

        paint(await load());
    }
}
