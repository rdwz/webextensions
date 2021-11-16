const topics = {
    clickedText: "clickedText"
} as const;

export type ClickedMessage = {subject: typeof topics.clickedText; text: string; ctrlKey: boolean};
export function clickedText(text: string, ctrlKey: boolean): ClickedMessage {
    return {
        ctrlKey,
        subject: topics.clickedText,
        text
    };
}

//

const subjects = Object.values(topics) as string[];

export type Message = ClickedMessage;

function hasSubject(value: {subject?: unknown}): value is {subject: string} {
    return typeof value.subject == "string";
}

function isMessage(value: unknown): value is Message {
    return typeof value == "object" && value != null && hasSubject(value) && subjects.includes(value.subject);
}

export function asMessage(value: unknown): Message {
    if (isMessage(value)) {
        return value;
    } else {
        throw new Error(`${JSON.stringify(value)} is not a message`);
    }
}
