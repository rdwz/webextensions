import { createChannel } from "@webextensions/common";

export const freshInjection = createChannel("freshInjection");
export const toggleDarkness = createChannel("toggleDarkness");
export const turnDarknessOff = createChannel("turnDarknessOff");
export const reportingState = createChannel<{ dark: boolean }>(
    "reportingState"
);
