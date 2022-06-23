import type { Link } from "./types";

const topics = {
    linksPicked: "linksPicked",
    linksRequested: "linksRequested",
} as const;

export type LinksRequestedMessage = {
    subject: typeof topics.linksRequested;
    externalContextLink: Link | null;
};

export function linksRequested(
    externalContextLink: Link | null
): LinksRequestedMessage {
    return {
        externalContextLink,
        subject: topics.linksRequested,
    };
}

export type LinksPickedMessage = {
    subject: typeof topics.linksPicked;
    links: Link[];
};

export function linksPicked(links: Link[]): LinksPickedMessage {
    return {
        links,
        subject: topics.linksPicked,
    };
}

//

const subjects = Object.values(topics) as string[];

export type Message = LinksPickedMessage | LinksRequestedMessage;

function hasSubject(value: {
    subject?: unknown;
}): value is { subject: string } {
    return typeof value.subject == "string";
}

function isMessage(value: unknown): value is Message {
    return (
        typeof value == "object" &&
        value != null &&
        hasSubject(value) &&
        subjects.includes(value.subject)
    );
}

export function asMessage(value: unknown): Message {
    if (isMessage(value)) {
        return value;
    } else {
        throw new Error(`${JSON.stringify(value)} is not a message`);
    }
}
