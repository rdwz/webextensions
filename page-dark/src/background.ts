import {provideContextMenu} from "./background/context-menu";
import {monitorHotkey} from "./background/hotkey";
import {reactToMessages} from "./background/messaging";
import {fixSettingsOnUpdate} from "./background/settings-validation";
import {reactToToolbarButton} from "./background/toolbar";

fixSettingsOnUpdate();
monitorHotkey();
reactToMessages();
reactToToolbarButton();
provideContextMenu();
