import {step, walk} from "./scanning/parse-text-dom";

export function extractText(selection: Selection): string | null {
    if (selection.anchorNode == null) {
        throw new Error("how can selection not be anchored?");
    }
    const pivot = selection.anchorNode;
    const index = selection.anchorOffset;
    const result: string[] = [];

    if (step("up", result)(pivot, index)) {
        walk("up", result)(pivot);
    }

    if (step("down", result)(pivot, index)) {
        walk("down", result)(pivot);
    }

    return result.length > 0 ? result.join("") : null;
}
