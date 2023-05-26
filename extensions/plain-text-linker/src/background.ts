import { validateSettingsOnInstall, waitForMessage } from "./_background";

validateSettingsOnInstall();
waitForMessage();
