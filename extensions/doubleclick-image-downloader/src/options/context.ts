import { Settings, write } from "../common/settings/io";

const imageContextMenuButton = document.getElementById(
    "enableImageContextMenu"
) as HTMLInputElement;
const selectionContextMenuButton = document.getElementById(
    "enableSelectionContextMenu"
) as HTMLInputElement;

function rigEnableImageContextMenu(settings: Settings): void {
    imageContextMenuButton.checked = settings.enableImageContextMenu;

    imageContextMenuButton.addEventListener("change", () => {
        write({
            enableImageContextMenu: imageContextMenuButton.checked,
        }).catch(console.error);
    });
}

function rigEnableSelectionContextMenu(settings: Settings): void {
    selectionContextMenuButton.checked = settings.enableSelectionContextMenu;

    selectionContextMenuButton.addEventListener("change", () => {
        write({
            enableSelectionContextMenu: selectionContextMenuButton.checked,
        }).catch(console.error);
    });
}

export function rigContextMenu(settings: Settings): void {
    rigEnableImageContextMenu(settings);
    rigEnableSelectionContextMenu(settings);
}
