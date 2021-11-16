import type {JsonObject} from "type-fest";
import browser from "webextension-polyfill";
import {IpCountryData} from "../ipdata";
import {load} from "../settings/local-settings";
import {toDomain, IpLogEntry, validate, toStorage} from "./entry";

const FIELD_NAME = "ipLog";

interface Persisted {
    [FIELD_NAME]: unknown;
}

export function hasLogProperty(struct: Record<string, unknown>): struct is {[FIELD_NAME]: unknown} {
    return FIELD_NAME in struct;
}

export async function loadLog(): Promise<IpLogEntry[]> {
    const empty: Persisted = {ipLog: []};
    const json = (await browser.storage.local.get(empty)) as JsonObject;

    if (Array.isArray(json.ipLog)) {
        return json.ipLog.map(validate).map(toDomain);
    } else {
        throw new Error("stored ip log data is not an array");
    }
}

async function persist(entries: IpLogEntry[]): Promise<void> {
    const dto: Persisted = {ipLog: entries.map(toStorage)};
    await browser.storage.local.set(dto);
}

async function trim(): Promise<void> {
    const [settings, log] = await Promise.all([load(), loadLog()]);

    const maxAgeMillis = 1000 * 60 * 60 * 24 * settings.logLifetime;
    const expirationMoment = Date.now() - maxAgeMillis;

    await persist(log.filter(entry => entry.timestamp.getTime() > expirationMoment));
}

export function trimLogOnBoot(): void {
    browser.runtime.onStartup.addListener(() => void trim().catch(console.error));
}

export async function clearLog(): Promise<void> {
    const empty: Persisted = {ipLog: []};
    await browser.storage.local.set(empty);
}

export async function record(log: IpLogEntry[], data: IpCountryData): Promise<void> {
    const entry: IpLogEntry = {country: data.country, countryService: data.countryService, ip: data.ip, service: data.ipService, timestamp: data.fetchedAt};
    log.push(entry);
    await persist(log);
}
