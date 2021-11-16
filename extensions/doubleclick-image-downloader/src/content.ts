import {trackCursor} from "./content/cursor-tracking";
import {monitorClicks} from "./content/doubleclick";
import {monitorDrags} from "./content/drag";
import {armHoverButton} from "./content/hoverbutton/hoverbutton";
import {listenForMessages} from "./content/messaging";
import {load} from "./common/settings/settings";
import {monitorStorage} from "./common/settings/monitoring";
import {trackHovers} from "./content/hover-tracking";

load()
    .then(settings => {
        monitorClicks(settings);
        armHoverButton(settings);
        monitorDrags(settings);
        trackCursor(settings);

        trackHovers();
        listenForMessages();
        monitorStorage();
    })
    .catch(console.error);
