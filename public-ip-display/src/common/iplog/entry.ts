import type {JsonValue} from "type-fest";
import {asIpService, asNullableSignificantString, asSignificantString} from "../checks";
import {IpService} from "../settings/enums";

interface Persisted {
    ip: string;
    service: string;
    timestamp: string;
    country: string | null;
    countryService: string | null;
}

export interface IpLogEntry {
    ip: string;
    service: IpService;
    timestamp: Date;
    country: string | null;
    countryService: string | null;
}

export function validate(data: JsonValue): Persisted {
    if (typeof data != "object" || Array.isArray(data) || data == null) {
        throw new Error(`expected a log entry, got ${JSON.stringify(data)}`);
    }

    return {
        country: asNullableSignificantString(data.country),
        countryService: asNullableSignificantString(data.countryService),
        ip: asSignificantString(data.ip),
        service: asSignificantString(data.service),
        // TODO eventually remove this workaround for the firefox version's release bug
        timestamp: asNullableSignificantString(data.timestamp) ?? new Date().toISOString()
    };
}

export function toDomain(data: Persisted): IpLogEntry {
    return {
        ...data,
        service: asIpService(data.service),
        timestamp: new Date(data.timestamp)
    };
}

export function toStorage(data: IpLogEntry): Persisted {
    return {
        ...data,
        timestamp: data.timestamp.toISOString()
    };
}