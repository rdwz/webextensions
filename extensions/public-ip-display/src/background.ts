import {refreshDataOnTriggers} from "./background/flow";
import {listenForMessages} from "./background/messaging";
import {watchSettingsChanges} from "./background/settings-validation";
import {armTimer} from "./background/timing";
import {trimLogOnBoot} from "./common/iplog/log";

refreshDataOnTriggers();

watchSettingsChanges();
listenForMessages();
armTimer();

trimLogOnBoot();
