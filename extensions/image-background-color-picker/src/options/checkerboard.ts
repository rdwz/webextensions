import { Settings, write } from "../common/";
import { checkerboardCheckbox, colorPicker, colorTextbox } from "./elements";

function setColorInputsDisabled(disabled: boolean): void {
    colorPicker.disabled = disabled;
    colorTextbox.disabled = disabled;
}

export function provideCheckerboard(settings: Settings): void {
    checkerboardCheckbox.checked = settings.checkerBoard;

    setColorInputsDisabled(checkerboardCheckbox.checked);

    checkerboardCheckbox.addEventListener("change", () => {
        setColorInputsDisabled(checkerboardCheckbox.checked);

        write({ checkerBoard: checkerboardCheckbox.checked }).catch(
            console.error
        );
    });
}
