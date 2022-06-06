import type {
    CopyRequestedMessage,
    Link,
    LinksRequestedMessage,
    Settings,
} from "../common/";
import { deduplicateBy } from "./deduplicate";

export function getLinks(
    msg: CopyRequestedMessage | LinksRequestedMessage,
    settings: Settings
): Link[] {
    const selection = getSelection();

    if (selection == null) {
        throw new Error("selection disappeared?");
    }

    const links = [...document.links]
        .filter((anchor) => selection.containsNode(anchor, true))
        .map<Link>((link) => ({ text: link.innerText, url: link.href }));

    if (
        settings.includeCommandTarget &&
        "externalContextLink" in msg &&
        msg.externalContextLink != null
    ) {
        // people probably drag from start to end
        // so the clicked node is probably at the end
        links.push(msg.externalContextLink);
    }

    const significant = links.filter(
        (link) => link.text.trim() !== "" && link.url.trim() !== ""
    );

    return settings.deduplicateHrefs
        ? deduplicateBy(significant, (link) => link.url)
        : significant;
}
