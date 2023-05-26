import { TriggeredMessage, hotkeyTriggered } from "../common";
import { getLastPosition } from "./cursor-tracking";
import { findImageDepthFirst, isImage } from "./dom";
import { startDownload } from "./downloads";
import { getLastHoveredElement } from "./hoverbutton";

function downloadHoverTracked(): boolean {
    const lastHoveredElement = getLastHoveredElement();

    if (lastHoveredElement != null && isImage(lastHoveredElement)) {
        startDownload(lastHoveredElement).catch(console.error);
        return true;
    } else {
        return false;
    }
}

// this can find images where e.g. `pointer-events: none;` prevents hover tracking from working
function downloadCursorTracked(): boolean {
    const lastPosition = getLastPosition();

    if (lastPosition == null) {
        return false;
    }

    const pointingAt = document.elementsFromPoint(...lastPosition);

    for (const pointed of pointingAt) {
        const nestedImage = findImageDepthFirst(pointed);
        if (nestedImage != null) {
            startDownload(nestedImage).catch(console.error);
            return true;
        }
    }

    return false;
}

export function downloadHoveredImage(): TriggeredMessage {
    return hotkeyTriggered(downloadHoverTracked() || downloadCursorTracked());
}
