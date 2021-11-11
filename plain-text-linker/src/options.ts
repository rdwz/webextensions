import {Position, Settings, write} from "./common/settings/io";
import {load} from "./common/settings/settings";

function provideRequireShift(settings: Settings): void {
    const requireShiftKeyCheckbox = document.getElementById("requireShiftKey") as HTMLInputElement;
    requireShiftKeyCheckbox.checked = settings.requireShiftKey;

    requireShiftKeyCheckbox.addEventListener("change", () => {
        write({
            requireShiftKey: requireShiftKeyCheckbox.checked
        }).catch(console.error);
    });
}

function provideNotifyInvalidUrl(settings: Settings): void {
    const notifyInvalidUrlCheckbox = document.getElementById("notifyInvalidUrl") as HTMLInputElement;
    notifyInvalidUrlCheckbox.checked = settings.notifyInvalidUrl;

    notifyInvalidUrlCheckbox.addEventListener("change", () => {
        write({
            notifyInvalidUrl: notifyInvalidUrlCheckbox.checked
        }).catch(console.error);
    });
}

function provideTryHttp(settings: Settings): void {
    const tryHttpCheckbox = document.getElementById("tryHttp") as HTMLInputElement;
    tryHttpCheckbox.checked = settings.tryHttp;

    tryHttpCheckbox.addEventListener("change", () => {
        write({
            tryHttp: tryHttpCheckbox.checked
        }).catch(console.error);
    });
}

function provideForegroundByDefault(settings: Settings): void {
    const foregroundByDefault = document.getElementById("foregroundByDefault") as HTMLInputElement;
    foregroundByDefault.checked = settings.foregroundByDefault;

    foregroundByDefault.addEventListener("change", () => {
        write({
            foregroundByDefault: foregroundByDefault.checked
        }).catch(console.error);
    });
}

function provideNewTabPosition(settings: Settings): void {
    const newTabPositionPickerContainer = document.getElementById("newTabPositionPicker") as HTMLFieldSetElement;
    const [initialPosition] = Object.values(Position).filter(key => key === settings.newTabPosition);
    document.querySelector<HTMLInputElement>(`#newTabPositionPicker input[value='${initialPosition}']`)!.checked = true;

    newTabPositionPickerContainer.addEventListener("change", event => {
        const newTabPosition = (event.target as HTMLInputElement).value as Position;
        if (Object.values(Position).includes(newTabPosition)) {
            write({
                newTabPosition
            }).catch(console.error);
        } else {
            throw new Error(`invalid tab position: ${newTabPosition}`);
        }
    });
}

load()
    .then(settings => {
        provideRequireShift(settings);
        provideNotifyInvalidUrl(settings);
        provideTryHttp(settings);
        provideForegroundByDefault(settings);
        provideNewTabPosition(settings);
    })
    .catch(console.error);
