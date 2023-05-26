import { Settings, monitor } from "../common";
import { findImageDepthFirst, isImage } from "./dom";
import { startDownload } from "./downloads";
import { drop } from "./hoverbutton";

let dragged: Element | null = null;

function setDragged(event: DragEvent): void {
    // can't drag much else
    dragged = event.target as Element;
}

function clearDragged(): void {
    dragged = null;
}

function send(): void {
    if (dragged == null) {
        throw new Error("how did you drop without dragging?");
    }

    const relevantImage = isImage(dragged)
        ? dragged
        : findImageDepthFirst(dragged);

    if (relevantImage != null) {
        startDownload(relevantImage).catch(console.error);
    }
}

const setUpOrTearDown: (settings: Settings) => void = (() => {
    let registration: symbol | null = null;

    return (settings: Settings) => {
        if (settings.supportDragDrop) {
            document.body.addEventListener("dragstart", setDragged);
            document.body.addEventListener("dragend", clearDragged);
            registration = drop.subscribe(
                () => send(),
                "download dropped image"
            );
        } else {
            if (registration != null) {
                drop.unsubscribe(registration);
                registration = null;
            }
            document.body.removeEventListener("dragend", clearDragged);
            document.body.removeEventListener("dragstart", setDragged);
        }
    };
})();

export function monitorDrags(settings: Settings): void {
    setUpOrTearDown(settings);
    monitor("supportDragDrop", (st) => setUpOrTearDown(st));
}
