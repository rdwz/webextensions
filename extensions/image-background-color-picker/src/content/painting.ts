import { Settings, load, monitor } from "../common/";
import { isImagePage } from "./detection";

const applicable = "image-background-color-picker-applicable";
const checkerboardClass = "image-background-color-picker-checkerboard";
const htmlTag = document.documentElement;

function enable(): (settings: Settings) => void {
    htmlTag.classList.add(applicable);

    // these manual resets are needed because chrome sets element styles that overrule our scss
    // and we'd rather not add a viral !important to the scss
    const bodyTag = document.body;
    bodyTag.style.background = "unset";
    const imgTag = bodyTag.getElementsByTagName("img").item(0)!;
    imgTag.style.background = "unset";

    return (settings: Settings) => {
        if (settings.checkerBoard) {
            htmlTag.classList.add(checkerboardClass);
            htmlTag.style.backgroundColor = "";
        } else {
            htmlTag.style.backgroundColor = settings.color;
            htmlTag.classList.remove(checkerboardClass);
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
