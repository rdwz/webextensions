const signals = ["freshInjection", "toggleDarkness", "turnDarknessOff"] as const;

export function signal<T extends typeof signals[number]>(subject: T): {subject: T} {
    return {subject};
}

//

const topics = {
    reportingState: "reportingState"
} as const;

type StateReport = {subject: typeof topics.reportingState; dark: boolean};
export function reportState(dark: boolean): StateReport {
    return {
        dark,
        subject: topics.reportingState
    };
}

//

const subjects = [...signals, ...Object.values(topics)] as string[];

export type Message = ReturnType<typeof signal> | StateReport;

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
