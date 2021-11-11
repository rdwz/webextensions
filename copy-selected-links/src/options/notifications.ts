import {Settings, write} from "../common/settings/io";

export function provideSuccessPopup(settings: Settings): void {
    const popupSuccessCheckbox = document.getElementById("popupSuccess") as HTMLInputElement;
    popupSuccessCheckbox.checked = settings.popupSuccess;

    popupSuccessCheckbox.addEventListener("change", () => {
        write({
            popupSuccess: popupSuccessCheckbox.checked
        }).catch(console.error);
    });
}

export function provideFailurePopup(settings: Settings): void {
    const popupFailCheckbox = document.getElementById("popupFail") as HTMLInputElement;
    popupFailCheckbox.checked = settings.popupFail;

    popupFailCheckbox.addEventListener("change", () => {
        write({
            popupFail: popupFailCheckbox.checked
        }).catch(console.error);
    });
}
