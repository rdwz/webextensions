import { CountryService, IpService } from "./enums";
import { sanitize } from "./validation";
import { bool, gte, num, roundedTo, stringEnum } from "@webextensions/common";
import type { JsonValue } from "type-fest";
import browser from "webextension-polyfill";

const spec = {
    countryCodeService: stringEnum(CountryService, CountryService.ifConfig),
    displayFlag: bool(true),
    ipEchoService: stringEnum(IpService, IpService.curl),
    lookUpCountry: bool(false),
    notify: bool(true),
    refreshRate: num(10, gte(1), roundedTo(0)),
} as const;

export type SyncSettings = {
    readonly [P in keyof typeof spec]: ReturnType<typeof spec[P]>;
};

const keys = Object.keys(spec);

export function isSyncSettingsProperty(key: string): key is keyof SyncSettings {
    return keys.includes(key);
}

export async function read(): Promise<Record<keyof SyncSettings, JsonValue>> {
    const json = await browser.storage.sync.get(keys);
    return json as Record<keyof SyncSettings, JsonValue>;
}

export async function write(dto: Partial<SyncSettings>): Promise<void> {
    return browser.storage.sync.set(dto);
}

export function correct(
    raw: Record<keyof SyncSettings, JsonValue>
): SyncSettings {
    return sanitize<SyncSettings>(raw, spec);
}
