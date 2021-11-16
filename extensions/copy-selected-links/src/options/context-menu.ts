import {Settings, write} from "../common/settings/io";

export function provideShowCopyMenuAction(settings: Settings): void {
    const showCopyMenuActionCheckbox = document.getElementById("showCopyMenuAction") as HTMLInputElement;
    showCopyMenuActionCheckbox.checked = settings.showCopyMenuAction;

    showCopyMenuActionCheckbox.addEventListener("change", () => {
        write({
            showCopyMenuAction: showCopyMenuActionCheckbox.checked
        }).catch(console.error);
    });
}

export function provideShowOpenMenuAction(settings: Settings): void {
    const showOpenMenuActionCheckbox = document.getElementById("showOpenMenuAction") as HTMLInputElement;
    showOpenMenuActionCheckbox.checked = settings.showOpenMenuAction;

    showOpenMenuActionCheckbox.addEventListener("change", () => {
        write({
            showOpenMenuAction: showOpenMenuActionCheckbox.checked
        }).catch(console.error);
    });
}
