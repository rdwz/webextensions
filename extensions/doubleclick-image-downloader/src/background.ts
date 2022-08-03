import {
    fixSettingsOnUpdate,
    listenForMessages,
    monitorDownloads,
    monitorHotkey,
    monitorNotifications,
    reactToToolbarButton,
    registerContextMenu,
} from "./background/";
import { clearStateOnStartup } from "./background/state";
import { monitorStorage } from "./common/";

monitorStorage();
fixSettingsOnUpdate();
clearStateOnStartup();
monitorNotifications();
monitorDownloads();
monitorHotkey();
listenForMessages();
reactToToolbarButton();
registerContextMenu();
