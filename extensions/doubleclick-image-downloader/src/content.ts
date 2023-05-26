import {
    armHoverButton,
    listenForMessages,
    monitorClicks,
    monitorDrags,
    trackCursor,
    trackHovers,
} from "./_content";
import { load, monitorStorage } from "./common";

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
