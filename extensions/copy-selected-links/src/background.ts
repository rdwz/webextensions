import {
    monitorHotkey,
    registerMenu,
    validateSettingsOnInstall,
} from "./background/";
import { monitorStorage } from "./common/";

monitorStorage();
validateSettingsOnInstall();
registerMenu();
monitorHotkey();
