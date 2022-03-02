import { monitorStorage } from "./common/settings/monitoring";
import { load } from "./common/settings/settings";
import { trackCursor } from "./content/cursor-tracking";
import { monitorClicks } from "./content/doubleclick";
import { monitorDrags } from "./content/drag";
import { trackHovers } from "./content/hover-tracking";
import { armHoverButton } from "./content/hoverbutton/hoverbutton";
import { listenForMessages } from "./content/messaging";

load()
    .then((settings) => {
        monitorClicks(settings);
        armHoverButton(settings);
        monitorDrags(settings);
        trackCursor(settings);

        trackHovers();
        listenForMessages();
        monitorStorage();
    })
    .catch(console.error);
