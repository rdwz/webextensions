import { waitForMessage } from "./background/messaging";
import { validateSettingsOnInstall } from "./background/settings-validation";

validateSettingsOnInstall();
waitForMessage();
