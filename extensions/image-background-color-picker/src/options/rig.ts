import { load } from "../common/settings";
import { provideCheckerboard } from "./checkerboard";
import { provideColorInputs } from "./colour";

export async function rig(): Promise<void> {
    const settings = await load();

    provideCheckerboard(settings);
    provideColorInputs(settings);
}
