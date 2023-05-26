import {
    fixSettingsOnUpdate,
    monitorHotkey,
    provideContextMenu,
    reactToMessages,
    reactToToolbarButton,
} from "./_background";

fixSettingsOnUpdate();
monitorHotkey();
reactToMessages();
reactToToolbarButton();
provideContextMenu();
