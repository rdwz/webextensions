import { SettingsOf, bool, sanitize } from "@webextensions/common";
import type { JsonValue } from "type-fest";
import browser from "webextension-polyfill";

const spec = {
    enableDarkeningFromContextMenu: bool(true),
};

export type Settings = SettingsOf<typeof spec>;

export function isSetting(key: string): key is keyof Settings {
    return key in spec;
}

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
