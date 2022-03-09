import { SettingsOf, bool, sanitize, stringEnum } from "@webextensions/common";
import type { JsonValue } from "type-fest";
import browser from "webextension-polyfill";

export enum Position {
    default = "default",
    right = "right",
    farRight = "farRight",
}

const spec = {
    foregroundByDefault: bool(true),
    newTabPosition: stringEnum(Position, Position.default),
    notifyInvalidUrl: bool(true),
    requireShiftKey: bool(true),
    tryHttp: bool(false),
};

export type Settings = SettingsOf<typeof spec>;

export async function read(): Promise<Record<keyof Settings, JsonValue>> {
    const json = await browser.storage.sync.get(Object.keys(spec));
    return json as Record<keyof Settings, JsonValue>;
}

export async function write(dto: Partial<Settings>): Promise<void> {
    return browser.storage.sync.set(dto);
}

export function correct(raw: Record<keyof Settings, JsonValue>): Settings {
    return sanitize<Settings>(raw, spec);
}
