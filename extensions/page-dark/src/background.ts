import {
    fixSettingsOnUpdate,
    monitorHotkey,
    provideContextMenu,
    reactToMessages,
    reactToToolbarButton,
} from "./background/";

fixSettingsOnUpdate();
monitorHotkey();
reactToMessages();
reactToToolbarButton();
provideContextMenu();
