import type {JsonValue} from "type-fest";

export function bool(def: boolean) {
    return (input: unknown): boolean => (typeof input === "boolean" ? input : def);
}

export function num(def: number, ...validators: ((i: number) => boolean)[]) {
    return (input: unknown): number => (typeof input === "number" && validators.every(val => val(input)) ? input : def);
}

export function stringEnum<T extends string>(enumType: Record<string, T>, def: T) {
    return (input: unknown): T => {
        const isValid =
            typeof input === "string" &&
            Object.values(enumType)
                .map(entry => entry as string)
                .includes(input);
        return isValid ? (input as T) : def;
    };
}

export function roundedTo(decimals: number) {
    return (input: number): boolean => {
        const multiplied = input * 10 ** decimals;
        return multiplied === Math.round(multiplied);
    };
}

export function gte(min: number) {
    return (input: number): boolean => input >= min;
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
