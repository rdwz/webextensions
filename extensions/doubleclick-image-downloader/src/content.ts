import { load, monitorStorage } from "./common/";
import {
    armHoverButton,
    listenForMessages,
    monitorClicks,
    monitorDrags,
    trackCursor,
    trackHovers,
} from "./content/";

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
