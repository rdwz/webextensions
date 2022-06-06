import { UnreachableCaseError } from "ts-essentials";

function isSignificant(node: ChildNode): boolean {
    return (
        node.nodeName !== "#text" ||
        (node.textContent != null && node.textContent.trim() !== "")
    );
}

function getSignificantChildNodes(node: HTMLElement): ChildNode[] {
    return [...node.childNodes].filter(isSignificant);
}

async function getLoadedPage(): Promise<Document> {
    return new Promise((resolve) => {
        switch (document.readyState) {
            case "complete":
            case "interactive":
                resolve(document);
                break;
            case "loading":
                document.addEventListener("DOMContentLoaded", () =>
                    resolve(document)
                );
                break;
            default:
                throw new UnreachableCaseError(document.readyState);
        }
    });
}

export async function isImagePage(): Promise<boolean> {
    const doc = await getLoadedPage();

    const [firstChild] = getSignificantChildNodes(doc.body);

    return (
        firstChild != null &&
        ["IMG", "SVG"].includes(firstChild.nodeName.toUpperCase())
    );
}
