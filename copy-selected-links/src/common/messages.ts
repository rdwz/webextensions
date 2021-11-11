import {Link} from "./types";

const topics = {
    copyRequested: "copyRequested",
    linksCopied: "linksCopied",
    linksPicked: "linksPicked",
    linksRequested: "linksRequested"
} as const;

export type CopyRequestedMessage = {
    subject: typeof topics.copyRequested;
    isWindows: boolean;
    externalContextLink: Link | undefined;
};
export function copyRequested(isWindows: boolean, externalContextLink: Link | undefined): CopyRequestedMessage {
    return {
        externalContextLink,
        isWindows,
        subject: topics.copyRequested
    };
}

export type LinksRequestedMessage = {
    subject: typeof topics.linksRequested;
    externalContextUrl: string | null;
};
export function linksRequested(externalContextUrl: string | null): LinksRequestedMessage {
    return {
        externalContextUrl,
        subject: topics.linksRequested
    };
}

export type CopiedMessage = {subject: typeof topics.linksCopied; linksCopied: number};
export function copied(linksCopied: number): CopiedMessage {
    return {
        linksCopied,
        subject: topics.linksCopied
    };
}

export type LinksPickedMessage = {subject: typeof topics.linksPicked; hrefs: string[]};
export function linksPicked(hrefs: string[]): LinksPickedMessage {
    return {
        hrefs,
        subject: topics.linksPicked
    };
}

//

const subjects = Object.values(topics) as string[];

export type Message = CopyRequestedMessage | CopiedMessage | LinksPickedMessage | LinksRequestedMessage;

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
