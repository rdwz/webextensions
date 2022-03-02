import {
    armTimer,
    listenForMessages,
    refreshDataOnTriggers,
    watchSettingsChanges,
} from "./background/";
import { trimLogOnBoot } from "./common/";

refreshDataOnTriggers();

watchSettingsChanges();
listenForMessages();
armTimer();

trimLogOnBoot();
