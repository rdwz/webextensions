import { UnreachableCaseError } from "ts-essentials";
import { ClickType } from "../common/settings/enums";
import { Settings } from "../common/settings/io";
import { isImage, isLeftClick, isRightClick } from "./dom";
import { startDownload } from "./downloads";
import {
    passesShiftKeySetting,
    passesSizeRestrictions,
} from "../common/settings/settings";
import { filteringAllows } from "./filtering";

type MouseEventListener = (event: MouseEvent) => void;
type ClickEventType = "click" | "dblclick" | "mouseup";

async function downloadClickedImage(
    settings: Settings,
    event: MouseEvent
): Promise<void> {
    // cant really click anything else
    const eventTarget = event.target as Element;

    if (
        passesShiftKeySetting(event, settings) &&
        (await filteringAllows(location))
    ) {
        // TODO fix for findImageDepthFirst: #65
        const nearestImage = isImage(eventTarget) ? eventTarget : null;

        if (
            nearestImage != null &&
            passesSizeRestrictions(nearestImage, settings) &&
            (await filteringAllows(nearestImage))
        ) {
            event.stopPropagation();
            await startDownload(nearestImage);
        }
    }
}

async function detectLeftClick(
    settings: Settings,
    event: MouseEvent
): Promise<void> {
    if (isLeftClick(event)) {
        await downloadClickedImage(settings, event);
    }
}

const detectRightClick: (
    settings: Settings,
    event: MouseEvent
) => Promise<void> = (() => {
    let lastRightClickTime = 0;

    return async (settings: Settings, event: MouseEvent) => {
        if (isRightClick(event)) {
            const now = Date.now();
            const previousRightClick = lastRightClickTime;
            lastRightClickTime = now;

            if (
                settings.triggerByClickType === ClickType.singleRight ||
                now - previousRightClick < settings.doubleRightClickMillis
            ) {
                await downloadClickedImage(settings, event);
            }
        }
    };
})();

function createListener(
    settings: Settings
): [ClickEventType, MouseEventListener] {
    switch (settings.triggerByClickType) {
        case ClickType.none:
            throw new Error("can't make dummy listener");

        case ClickType.singleLeft:
        case ClickType.doubleLeft: {
            const listener = (event: MouseEvent): void =>
                void detectLeftClick(settings, event).catch(console.error);
            const clickType =
                settings.triggerByClickType === ClickType.singleLeft
                    ? "click"
                    : "dblclick";
            return [clickType, listener];
        }

        case ClickType.singleRight:
        case ClickType.doubleRight: {
            const listener = (event: MouseEvent): void =>
                void detectRightClick(settings, event).catch(console.error);
            const clickType = "mouseup";
            return [clickType, listener];
        }

        default:
            throw new UnreachableCaseError(settings.triggerByClickType);
    }
}

export function monitorClicks(settings: Settings): void {
    if (settings.triggerByClickType === ClickType.none) {
        return;
    }

    const [clickType, listener] = createListener(settings);
    document.addEventListener(clickType, listener);
}
