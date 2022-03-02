import { Settings, write } from "../common/";
import { colorPicker, colorTextbox } from "./elements";

export function provideColorInputs(settings: Settings): void {
    colorPicker.value = settings.color;

    colorPicker.addEventListener("change", () => {
        colorTextbox.value = colorPicker.value.substring("#".length);
        write({ color: colorPicker.value }).catch(console.error);
    });

    colorTextbox.value = settings.color.substring("#".length);

    colorTextbox.addEventListener("input", () => {
        if (colorTextbox.checkValidity()) {
            const colorCode = `#${colorTextbox.value}`;
            colorPicker.value = colorCode;
            write({ color: colorCode }).catch(console.error);
        }
    });
}
