const signals = ["needSeparator", "wantRefresh"] as const;

export function signal<T extends typeof signals[number]>(
    subject: T
): { subject: T } {
    return { subject };
}

//

const topics = {
    copyPerformed: "copyPerformed",
    reportingSeparator: "reportingSeparator",
} as const;

type CopiedMessage = { subject: typeof topics.copyPerformed; text: string };
export function copied(text: string): CopiedMessage {
    return {
        subject: topics.copyPerformed,
        text,
    };
}

type SeparatorMessage = {
    subject: typeof topics.reportingSeparator;
    separator: string;
};
export function reportSeparator(separator: string): SeparatorMessage {
    return {
        separator,
        subject: topics.reportingSeparator,
    };
}

//

const subjects = [...signals, ...Object.values(topics)] as string[];

export type Message =
    | ReturnType<typeof signal>
    | CopiedMessage
    | SeparatorMessage;

function hasSubject(value: {
    subject?: unknown;
}): value is { subject: string } {
    return typeof value.subject == "string";
}

export function isMessage(value: unknown): value is Message {
    return (
        typeof value == "object" &&
        value != null &&
        hasSubject(value) &&
        subjects.includes(value.subject)
    );
}
