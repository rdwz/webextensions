import { nodeWalker } from "./navigate-dom";

const MARKUP_NODE_NAMES = [
    "SPAN",
    "B",
    "STRONG",
    "I",
    "EM",
    "MARK",
    "SMALL",
    "DEL",
    "INS",
    "WBR",
];

export function textNodeWalker(
    direction: "up" | "down"
): (origin: Node) => Iterable<Node> {
    const walkNodes = nodeWalker(direction);

    function* walkTextNodes(origin: Node): Iterable<Node> {
        for (const node of walkNodes(origin)) {
            if (Node.TEXT_NODE === node.nodeType) {
                yield node;
            } else if (MARKUP_NODE_NAMES.includes(node.nodeName)) {
                // continue walking: these are text-containing nodes
            } else {
                break;
            }
        }
    }

    return walkTextNodes;
}
