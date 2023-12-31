import {
    SettingsOf,
    gte,
    num,
    roundedTo,
    sanitize,
} from "@webextensions/common";
import type { JsonValue } from "type-fest";
import browser from "webextension-polyfill";

const spec = {
    logLifetime: num(7, gte(0), roundedTo(0)),
} as const;

export type LocalSettings = SettingsOf<typeof spec>;

export async function read(): Promise<Record<keyof LocalSettings, JsonValue>> {
    const json = await browser.storage.local.get(Object.keys(spec));
    return json as Record<keyof LocalSettings, JsonValue>;
}

export async function write(dto: Partial<LocalSettings>): Promise<void> {
    return browser.storage.local.set(dto);
}

export function correct(
    raw: Record<keyof LocalSettings, JsonValue>
): LocalSettings {
    return sanitize<LocalSettings>(raw, spec);
}
