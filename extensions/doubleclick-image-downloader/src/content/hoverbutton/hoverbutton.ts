import {Settings} from "../../common/settings/io";
import {passesShiftKeySetting, passesSizeRestrictions} from "../../common/settings/settings";
import {filteringAllows} from "../filtering";
import * as layout from "./layout";
import {isImage} from "../dom";
import {hover} from "../hover-tracking";
import {monitor} from "../../common/settings/monitoring";

async function adaptToHoveredElement(settings: Settings, event: MouseEvent): Promise<void> {
    // can't mouse over anything else
    const eventTarget = event.target as Element;

    if (isImage(eventTarget)) {
        const allowedByAllSettings =
            passesShiftKeySetting(event, settings) &&
            passesSizeRestrictions(eventTarget, settings) &&
            (await filteringAllows(location)) &&
            (await filteringAllows(eventTarget));

        if (allowedByAllSettings) {
            layout.attachTo(eventTarget);
        } else {
            layout.remove();
        }
    } else {
        if (!settings.persist) {
            layout.remove();
        }
    }
}

let listenerToken: symbol | null = null;

function actualizeState(settings: Settings): void {
    if (settings.singleClickEnabled) {
        if (listenerToken == null) {
            listenerToken = hover.subscribe(event => void adaptToHoveredElement(settings, event).catch(console.error), "move button onto hovered image");
        }
    } else {
        if (listenerToken != null) {
            hover.unsubscribe(listenerToken);
            listenerToken = null;
        }

        // the setting might have changed while the button was displayed
        layout.remove();
    }
}

export function armHoverButton(settings: Settings): void {
    layout.init(settings);
    actualizeState(settings);

    layout.updateVisualsOnChanges();
    monitor("singleClickEnabled", st => actualizeState(st));
}
