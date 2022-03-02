import { Message, isMessage } from "./messages";
import {
    CountryService,
    IpService,
    isCountryService,
    isIpService,
} from "./settings/enums";
import type { JsonValue } from "type-fest";

export function asError(thrown: unknown): Error {
    if (thrown instanceof Error) {
        return thrown;
    } else {
        throw new Error(`${JSON.stringify(thrown)} is not an Error`);
    }
}

export function asSignificantString(json: JsonValue | undefined): string {
    if (typeof json == "string" && json.length > 0) {
        return json;
    } else if (json instanceof Date) {
        // firefox actually stores and returns Dates, and the previous version of the code accidentally made use of that
        // TODO remove this workaround after some time
        return json.toISOString();
    } else {
        throw new Error(`${JSON.stringify(json)} is not a valid string`);
    }
}

export function asNullableSignificantString(
    json: JsonValue | undefined
): string | null {
    return json == null ? null : asSignificantString(json);
}

export function asIpService(id: string): IpService {
    if (isIpService(id)) {
        return id;
    } else {
        throw new Error(`${id} is not an ip service`);
    }
}

export function asCountryService(id: string): CountryService {
    if (isCountryService(id)) {
        return id;
    } else {
        throw new Error(`${id} is not a country service`);
    }
}

export function asMessage(value: unknown): Message {
    if (isMessage(value)) {
        return value;
    } else {
        throw new Error(`${JSON.stringify(value)} is not a message`);
    }
}

export function asIp(text: string): string {
    if (/^(?:[a-z0-9:]+|(?:(?:\d{1,3}\.){3}\d{1,3}))$/iu.test(text)) {
        return text;
    } else {
        throw new Error(`"${text}" does not look like an IP`);
    }
}

export function asCountryCode(text: string): string {
    if (/^[a-z]{2}$/iu.test(text)) {
        return text;
    } else {
        throw new Error(`"${text}" does not look like a country code`);
    }
}
