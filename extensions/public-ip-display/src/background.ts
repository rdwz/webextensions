import {
    armTimer,
    listenForMessages,
    refreshDataOnTriggers,
    watchSettingsChanges,
} from "./_background";
import { trimLogOnBoot } from "./common";

refreshDataOnTriggers();

watchSettingsChanges();
listenForMessages();
armTimer();

trimLogOnBoot();
