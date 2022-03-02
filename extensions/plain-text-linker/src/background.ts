import { validateSettingsOnInstall, waitForMessage } from "./background/";

validateSettingsOnInstall();
waitForMessage();
