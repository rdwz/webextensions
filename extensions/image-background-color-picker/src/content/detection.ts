import { UnreachableCaseError } from "ts-essentials";

function isSignificant(node: ChildNode): boolean {
    return (
        node.nodeName !== "#text" ||
        (node.textContent != null && node.textContent.trim() !== "")
    );
}

function getSignificantChildNodes(node: HTMLElement): ChildNode[] {
    return Array.from(node.childNodes).filter(isSignificant);
}

export async function isImagePage(): Promise<boolean> {
    const doc = await new Promise<Document>((resolve) => {
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

    const [firstChild] = getSignificantChildNodes(doc.body);

    return (
        firstChild != null &&
        ["IMG", "SVG"].includes(firstChild.nodeName.toUpperCase())
    );
}
