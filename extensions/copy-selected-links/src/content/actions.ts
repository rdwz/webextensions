import {
    LinksPickedMessage,
    LinksRequestedMessage,
    linksPicked,
    load,
} from "../common/";
import { getLinks } from "./selection";

export async function onLinksRequested(
    msg: LinksRequestedMessage
): Promise<LinksPickedMessage> {
    const settings = await load();
    const links = getLinks(msg, settings);
    return linksPicked(links);
}
