import { Settings } from "../common/settings/io";
import { monitor } from "../common/settings/monitoring";

type Coordinates = [x: number, y: number];

let lastPosition: Coordinates | null = null;

function updatePosition(event: MouseEvent): void {
    lastPosition = [event.clientX, event.clientY];
}

export function trackCursor(settings: Settings): void {
    if (settings.aggressiveCursorTracking) {
        document.addEventListener("mousemove", updatePosition);
    } else {
        document.removeEventListener("mousemove", updatePosition);
    }
}

monitor("aggressiveCursorTracking", trackCursor);

export function getLastPosition(): Coordinates | null {
    return lastPosition;
}
