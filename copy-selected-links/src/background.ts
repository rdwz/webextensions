import {registerMenu} from "./background/context-menu";
import {monitorHotkey} from "./background/hotkey";
import {validateSettingsOnInstall} from "./background/settings-validation";
import {monitorStorage} from "./common/settings/monitoring";

monitorStorage();
validateSettingsOnInstall();
registerMenu();
monitorHotkey();
