import {copied, CopiedMessage, CopyRequestedMessage, linksPicked, LinksPickedMessage, LinksRequestedMessage} from "../common/messages";
import {load} from "../common/settings/settings";
import {copyToClipboard} from "./clipboard";
import {applyPattern} from "../common/pattern";
import {getLinks} from "./selection";

export async function onCopyRequested(msg: CopyRequestedMessage): Promise<CopiedMessage> {
    const settings = await load();

    const links = getLinks(msg, settings);

    if (links.length > 0) {
        const newline = msg.isWindows ? "\r\n" : "\n";
        const joined = links.map(link => applyPattern(link, settings.copyPattern)).join(newline);

        await copyToClipboard(settings.finalNewline ? joined + newline : joined);
    }

    return copied(links.length);
}

export async function onLinksRequested(msg: LinksRequestedMessage): Promise<LinksPickedMessage> {
    const settings = await load();
    const hrefs = getLinks(msg, settings).map(link => link.url);
    return linksPicked(hrefs);
}
