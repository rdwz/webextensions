import { toggleDarkness, turnDarknessOff } from "../common/";
import { toggle } from "./darkness";

export function reactToMessages(): void {
    toggleDarkness.onReceive(async () => toggle());
    turnDarknessOff.onReceive(async () => toggle(false));
}
