import type { JsonObject, Promisable } from "type-fest";
import browser from "webextension-polyfill";

type Sender<I, O> = (...payload: I extends undefined ? [] : [I]) => Promise<O>;

type TabSender<I, O> = (
    tabId: number,
    tabOptions?: browser.Tabs.SendMessageOptionsType
) => Sender<I, O>;

type Receiver<I, O> = (
    payload: I,
    sender: browser.Runtime.MessageSender
) => Promisable<O>;

type OnReceive<I, O> = (receiver: Receiver<I, O>) => void;

interface Message {
    payload: JsonObject;
    subject: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value == "object" && value != null;
}

function isMessage(value: unknown): value is Message {
    if (!isRecord(value)) {
        return false;
    }
    const { subject, payload } = value as Record<keyof Message, unknown>;
    return typeof subject == "string" && (payload == null || isRecord(payload));
}

export function createChannel<
    I extends JsonObject | undefined = undefined,
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    O extends JsonObject | void = void
>(
    subject: string
): {
    onReceive: OnReceive<I, O>;
    sendToRuntime: Sender<I, O>;
    sendToTab: TabSender<I, O>;
} {
    function onReceive(receiver: Receiver<I, O>): void {
        browser.runtime.onMessage.addListener((message: unknown, sender) => {
            if (isMessage(message) && message.subject === subject) {
                return new Promise<O>((resolve, reject) => {
                    try {
                        const result = receiver(message.payload as I, sender);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        });
    }

    async function sendToRuntime(
        payload: I | undefined = undefined
    ): Promise<O> {
        const message = { payload, subject };
        const response: unknown = await browser.runtime.sendMessage(message);
        return response as O;
    }

    function sendToTab(
        tabId: number,
        tabOptions?: browser.Tabs.SendMessageOptionsType
    ): Sender<I, O> {
        return async (payload: I | undefined = undefined) => {
            const message = { payload, subject };

            const response: unknown = await browser.tabs.sendMessage(
                tabId,
                message,
                tabOptions
            );
            return response as O;
        };
    }

    return { onReceive, sendToRuntime, sendToTab };
}
