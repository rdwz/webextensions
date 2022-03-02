import { Settings, load, write } from "./common/";

const enableContextMenuCheckbox = document.getElementById(
    "enableContextMenu"
) as HTMLInputElement;

function rigEnableContextMenu(settings: Settings): void {
    enableContextMenuCheckbox.checked = settings.enableDarkeningFromContextMenu;

    enableContextMenuCheckbox.addEventListener("change", () => {
        write({
            enableDarkeningFromContextMenu: enableContextMenuCheckbox.checked,
        }).catch(console.error);
    });
}

load().then(rigEnableContextMenu).catch(console.error);
