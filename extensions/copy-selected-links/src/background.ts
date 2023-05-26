import {
    monitorHotkey,
    registerMenu,
    validateSettingsOnInstall,
} from "./_background";
import { monitorStorage } from "./common";

monitorStorage();
validateSettingsOnInstall();
registerMenu();
monitorHotkey();
