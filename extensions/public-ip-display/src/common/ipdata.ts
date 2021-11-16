import type {JsonValue} from "type-fest";
import browser from "webextension-polyfill";
import {asCountryService, asIpService, asNullableSignificantString, asSignificantString} from "./checks";
import {CountryService, IpService} from "./settings/enums";

export interface IpData {
    fetchedAt: Date;
    ip: string;
    ipService: IpService;
}

export interface CountryData {
    country: string;
    countryService: CountryService;
}

type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};
export interface IpCountryData extends IpData, Nullable<CountryData> {}

interface Persisted {
    date: string;
    ip: string;
    ipEchoService: string;
    countryCode: string | null;
    countryCodeService: string | null;
}

function toPersisted(data: IpCountryData): Persisted {
    return {
        countryCode: data.country,
        countryCodeService: data.countryService,
        date: data.fetchedAt.toISOString(),
        ip: data.ip,
        ipEchoService: data.ipService
    };
}

function toDomain(data: Persisted): IpCountryData {
    return {
        country: data.countryCode,
        countryService: data.countryCodeService == null ? null : asCountryService(data.countryCodeService),
        fetchedAt: new Date(data.date),
        ip: data.ip,
        ipService: asIpService(data.ipEchoService)
    };
}

export async function saveAsLast(data: IpCountryData): Promise<void> {
    await browser.storage.local.set(toPersisted(data));
}

function validate(data: Record<keyof Persisted, JsonValue>): Persisted | null {
    if (data.date == null || data.ip == null || data.ipEchoService == null) {
        return null;
    }

    return {
        countryCode: asNullableSignificantString(data.countryCode),
        countryCodeService: asNullableSignificantString(data.countryCodeService),
        date: asSignificantString(data.date),
        ip: asSignificantString(data.ip),
        ipEchoService: asSignificantString(data.ipEchoService)
    };
}

const keys: (keyof Persisted)[] = ["date", "ip", "ipEchoService", "countryCode", "countryCodeService"];

export function isPersistedIpCountryDataProperty(key: string): key is keyof Persisted {
    return (keys as string[]).includes(key);
}

export async function loadLast(): Promise<IpCountryData | null> {
    const json = await browser.storage.local.get(keys);
    const persisted = validate(json as Record<keyof Persisted, JsonValue>);
    return persisted == null ? null : toDomain(persisted);
}
