import { textNodeWalker } from "./navigate-dom-text";
import { textReader } from "./parse-text";

function adder<T>(direction: "up" | "down", array: T[]): (value: T) => void {
    return direction === "up"
        ? (text) => array.unshift(text)
        : (text) => array.push(text);
}

export function step(
    direction: "up" | "down",
    result: string[]
): (node: Node, index: number) => boolean {
    const substring: (text: string, index: number) => string =
        direction === "up"
            ? (text, index) => text.substring(0, index)
            : (text, index) => text.substring(index, Infinity);
    const add = adder(direction, result);
    const read = textReader(direction);

    return (node, index) => {
        const textFromPivot = substring(node.textContent ?? "", index);
        const match = read(textFromPivot);
        add(match.text);
        return !match.hadWhitespace;
    };
}

const ONLY_WHITESPACE = /^\s*$/u;

export function walk(
    direction: "up" | "down",
    result: string[]
): (pivot: Node) => void {
    const walkTextNodes = textNodeWalker(direction);
    const read = textReader(direction);
    const add = adder(direction, result);

    return (pivot) => {
        for (const node of walkTextNodes(pivot)) {
            if (
                node.textContent == null ||
                ONLY_WHITESPACE.test(node.textContent)
            ) {
                // probably just source whitespace between tags => skip
            } else {
                const match = read(node.textContent);
                add(match.text);

                if (match.hadWhitespace) {
                    break;
                }
            }
        }
    };
}
