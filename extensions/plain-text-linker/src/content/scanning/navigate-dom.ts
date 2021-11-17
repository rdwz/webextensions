function siblingFinder(
    direction: "up" | "down"
): (origin: Node) => [Node] | null {
    const getSibling =
        direction === "up"
            ? (node: Node) => node.previousSibling
            : (node: Node) => node.nextSibling;

    return (origin) => {
        const node = getSibling(origin);
        return node == null ? null : [node];
    };
}

function childFinder(
    direction: "up" | "down"
): (origin: Node) => [Node] | null {
    const getChild =
        direction === "up"
            ? (node: Node) => node.lastChild
            : (node: Node) => node.firstChild;

    return (origin) => {
        const node = getChild(origin);
        return node == null ? null : [node];
    };
}

function parentsWithFirstSiblingFinder(
    direction: "up" | "down"
): (origin: Node) => Node[] | null {
    const findSibling = siblingFinder(direction);

    return (origin) => {
        const path: Node[] = [];
        let node: Node | null = origin;

        while ((node = node.parentNode) != null) {
            path.push(node);

            const sibling = findSibling(node);
            if (sibling != null) {
                path.push(...sibling);
                break;
            }
        }

        return path;
    };
}

export function nodeWalker(
    direction: "up" | "down"
): (origin: Node) => Iterable<Node> {
    const findChild = childFinder(direction);
    const findSibling = siblingFinder(direction);
    const findUpperSibling = parentsWithFirstSiblingFinder(direction);

    function* walkNodes(origin: Node): Iterable<Node> {
        let node = origin;
        let path: Node[] | null = null;

        while (
            (path =
                findChild(node) ??
                findSibling(node) ??
                findUpperSibling(node)) != null
        ) {
            for (const next of path) {
                yield next;
            }
            node = path[path.length - 1]!;
        }
    }

    return walkNodes;
}
