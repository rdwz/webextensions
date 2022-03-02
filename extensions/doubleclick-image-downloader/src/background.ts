import {
    fixSettingsOnUpdate,
    listenForMessages,
    monitorDownloads,
    monitorHotkey,
    monitorNotifications,
    registerContextMenu,
} from "./background/";
import { monitorStorage } from "./common/";

monitorStorage();
fixSettingsOnUpdate();
monitorNotifications();
monitorDownloads();
monitorHotkey();
listenForMessages();
registerContextMenu();
