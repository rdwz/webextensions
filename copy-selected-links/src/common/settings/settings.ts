import {deepEqual} from "fast-equals";
import {correct, read, Settings, write} from "./io";

export async function load(): Promise<Settings> {
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
