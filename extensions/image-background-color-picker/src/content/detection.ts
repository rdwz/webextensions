import { UnreachableCaseError } from "ts-essentials";

// documents tend to contain #text nodes with only a linebreak, i.e. the source code formatting
function isNotWhitespace(node: ChildNode): boolean {
    return (
        node.nodeName !== "#text" ||
        (node.textContent != null && node.textContent.trim() !== "")
    );
}

async function getLoadedPage(): Promise<HTMLElement> {
    return new Promise((resolve) => {
        switch (document.readyState) {
            case "complete":
            case "interactive":
                resolve(document.body);
                break;
            case "loading":
                document.addEventListener("DOMContentLoaded", () =>
                    resolve(document.body)
                );
                break;
            default:
                throw new UnreachableCaseError(document.readyState);
        }
    });
}

export async function isImagePage(): Promise<boolean> {
    const bodyTag = await getLoadedPage();

    const [firstChild] = [...bodyTag.childNodes].filter(isNotWhitespace);

    // don't check sibling childNodes as other extensions might inject stuff like image info panels or buttons
    // (*cough* doubleclickimagedownloader *cough*)
    // a legit website having an <img> as the first element in <body> seems unlikely

    return (
        firstChild != null &&
        ["img", "svg"].includes(firstChild.nodeName.toLowerCase())
    );
}
