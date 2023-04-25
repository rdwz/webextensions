import {
    asIpService,
    asNullableSignificantString,
    asSignificantString,
} from "../checks";
import type { IpService } from "../settings";
import type { JsonValue } from "type-fest";

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

export function validateLog(data: JsonValue): Persisted {
    if (typeof data != "object" || data instanceof Array || data == null) {
        throw new Error(`expected a log entry, got ${JSON.stringify(data)}`);
    }

    return {
        country: asNullableSignificantString(data.country),
        countryService: asNullableSignificantString(data.countryService),
        ip: asSignificantString(data.ip),
        service: asSignificantString(data.service),
        // TODO eventually remove this workaround for the firefox version's release bug
        timestamp:
            asNullableSignificantString(data.timestamp) ??
            new Date().toISOString(),
    };
}

export function toDomain(data: Persisted): IpLogEntry {
    return {
        ...data,
        service: asIpService(data.service),
        timestamp: new Date(data.timestamp),
    };
}

export function toStorage(data: IpLogEntry): Persisted {
    return {
        ...data,
        timestamp: data.timestamp.toISOString(),
    };
}
