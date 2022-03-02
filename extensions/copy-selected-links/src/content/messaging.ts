import type { CopiedMessage, LinksPickedMessage, Message } from "../common/";
import { onCopyRequested, onLinksRequested } from "./actions";

export async function onMessageReceived(
    msg: Message
): Promise<CopiedMessage | LinksPickedMessage> {
    switch (msg.subject) {
        case "copyRequested": {
            return onCopyRequested(msg);
        }
        case "linksRequested": {
            return onLinksRequested(msg);
        }
        default: {
            throw new Error(`unknown message ${JSON.stringify(msg)}`);
        }
    }
}
