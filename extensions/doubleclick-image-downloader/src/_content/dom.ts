export function isImage(element: Element): element is HTMLImageElement {
    return element.nodeName === "IMG";
}

// depth first is interesting because of e.g. <a>/<img> nesting
export function findImageDepthFirst(element: Node): HTMLImageElement | null {
    for (const child of element.childNodes) {
        if (child.nodeName === "IMG") {
            return child as HTMLImageElement;
        }

        const image = findImageDepthFirst(child);
        if (image != null) {
            return image;
        }
    }

    return null;
}

export function isLeftClick(event: MouseEvent): boolean {
    return event.button === 0;
}

export function isRightClick(event: MouseEvent): boolean {
    return event.button === 2;
}
