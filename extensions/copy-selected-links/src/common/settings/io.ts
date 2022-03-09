import { PATTERN_VARIABLES } from "../pattern";
import {
    SettingsOf,
    bool,
    notBlank,
    sanitize,
    str,
} from "@webextensions/common";
import type { JsonValue } from "type-fest";
import browser from "webextension-polyfill";

const spec = {
    copyPattern: str(PATTERN_VARIABLES.url, notBlank),
    deduplicateHrefs: bool(false),
    finalNewline: bool(true),
    includeCommandTarget: bool(false),
    popupFail: bool(true),
    popupSuccess: bool(false),
    showCopyMenuAction: bool(true),
    showOpenMenuAction: bool(false),
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
