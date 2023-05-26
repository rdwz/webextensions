import type { LinksPickedMessage, Message } from "../common";
import { onLinksRequested } from "./actions";

export async function onMessageReceived(
    msg: Message
): Promise<LinksPickedMessage> {
    switch (msg.subject) {
        case "linksRequested": {
            return onLinksRequested(msg);
        }
        default: {
            throw new Error(`unknown message ${JSON.stringify(msg)}`);
        }
    }
}
