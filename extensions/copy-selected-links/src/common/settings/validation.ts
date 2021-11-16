import type {JsonValue} from "type-fest";

export function bool(def: boolean) {
    return (stored: unknown): boolean => (typeof stored === "boolean" ? stored : def);
}

export function str(def: string, ...validators: ((i: string) => boolean)[]) {
    return (input: unknown): string => (typeof input === "string" && validators.every(val => val(input)) ? input : def);
}

export function notBlank(value: string): boolean {
    return value.trim().length > 0;
}

export function sanitize<T, K extends keyof T = keyof T>(source: Record<K, JsonValue>, spec: Record<K, (x: unknown) => T[K]>): T {
    const destination: Partial<T> = {};

    for (const field of Object.getOwnPropertyNames(spec) as K[]) {
        if (Object.prototype.hasOwnProperty.call(spec, field)) {
            const validator = spec[field];
            const sourceValue = source[field];

            destination[field] = validator(sourceValue);
        }
    }

    return destination as T;
}
