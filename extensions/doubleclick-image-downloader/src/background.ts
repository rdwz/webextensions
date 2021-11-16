import {registerContextMenu} from "./background/context-menu";
import {monitorDownloads} from "./background/downloads";
import {listenForMessages} from "./background/messaging";
import {monitorNotifications} from "./background/notifications";
import {fixSettingsOnUpdate} from "./background/settings-validation";
import {monitorHotkey} from "./background/hotkey";
import {monitorStorage} from "./common/settings/monitoring";

monitorStorage();
fixSettingsOnUpdate();
monitorNotifications();
monitorDownloads();
monitorHotkey();
listenForMessages();
registerContextMenu();
