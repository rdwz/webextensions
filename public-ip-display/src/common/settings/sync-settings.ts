import {deepEqual} from "fast-equals";
import {SyncSettings, read, write, correct} from "./sync-io";

export async function load(): Promise<SyncSettings> {
    const raw = await read();
    return correct(raw);
}

export async function validate(): Promise<boolean> {
    const raw = await read();
    const validated = correct(raw);

    if (deepEqual(validated, raw)) {
        return true;
    } else {
        await write(validated);
        return false;
    }
}
