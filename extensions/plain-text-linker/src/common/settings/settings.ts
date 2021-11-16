import {deepEqual} from "fast-equals";
import {UnreachableCaseError} from "ts-essentials";
import {Tabs} from "webextension-polyfill";
import {correct, Position, read, Settings, write} from "./io";

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

export function toTabIndex(settings: Settings, tab?: Tabs.Tab): number | undefined {
    switch (settings.newTabPosition) {
        case Position.right:
            if (tab == null) {
                throw new Error("no tab?");
            }
            return tab.index + 1;
        case Position.farRight:
            // TODO experiment with Number.MAX_SAFE_INTEGER
            return 9999;
        case Position.default:
            return undefined;
        default:
            throw new UnreachableCaseError(settings.newTabPosition);
    }
}
