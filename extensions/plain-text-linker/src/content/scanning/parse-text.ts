const TEXT_BEFORE_FIRST_WHITESPACE = /^(?<text>\S*)(?<ws>\s?)/u;
const TEXT_AFTER_LAST_WHITESPACE = /(?<ws>\s?)(?<text>\S*)$/u;

interface IBoundedText {
    hadWhitespace: boolean;
    text: string;
}

export function textReader(
    direction: "up" | "down"
): (text: string) => IBoundedText {
    const regex =
        direction === "up"
            ? TEXT_AFTER_LAST_WHITESPACE
            : TEXT_BEFORE_FIRST_WHITESPACE;

    return (nodeText) => {
        const match = regex.exec(nodeText);
        const { ws, text } = match?.groups ?? {};

        if (ws == null || text == null) {
            throw new Error("missing regex group");
        }

        return {
            hadWhitespace: ws.length > 0,
            text,
        };
    };
}
