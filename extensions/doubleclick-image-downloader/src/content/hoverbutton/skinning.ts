import { HoverButtonSkin, buttonSkins } from "../../common/";

export const HTML_BUTTON_ID = "singleclick-image-downloader";
export const SKIN_CLASSES: Record<HoverButtonSkin, string> = {
    [HoverButtonSkin.original]: `skin-${HoverButtonSkin.original}`,
    [HoverButtonSkin.alt1]: `skin-${HoverButtonSkin.alt1}`,
};

export function insertCss(): void {
    const style = document.createElement("style");
    // `sheet` is not available before insert
    document.head.appendChild(style);
    // https://github.com/Microsoft/TypeScript/issues/28098
    Object.values(HoverButtonSkin).forEach((skinName) => {
        const skinclass = SKIN_CLASSES[skinName];
        style.sheet!.insertRule(
            `#${HTML_BUTTON_ID}.${skinclass} {background-image: url('${buttonSkins.off[skinName]}');}`,
            0
        );
        style.sheet!.insertRule(
            `#${HTML_BUTTON_ID}.${skinclass}:hover {background-image: url('${buttonSkins.on[skinName]}');}`,
            1
        );
    });
}
