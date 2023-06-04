import { Triggerable } from "../triggerable";
import { Storage } from "webextension-polyfill";

export interface WebextStorageRepo<Json> {
    read: () => Promise<unknown>;
    monitor: (callback: (data: unknown) => void) => void;
    write: (data: Partial<Json>) => Promise<void>;
}

export type StorageChanges = Record<string, Storage.StorageChange>;

export interface WebextStorageService<Json, Parsed> {
    load: () => Promise<Parsed>;
    changes: Triggerable<Parsed>["expose"];
    save: (data: Partial<Json>) => Promise<void>;
    validate: () => Promise<boolean>;
}

export type StorageArea = "local" | "sync";
