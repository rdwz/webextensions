import {Link} from "./types";

export const PATTERN_VARIABLES = {
    text: "%text%",
    url: "%url%"
} as const;

const textRegex = new RegExp(PATTERN_VARIABLES.text, "gu");
const urlRegex = new RegExp(PATTERN_VARIABLES.url, "gu");

export function applyPattern(link: Link, pattern: string): string {
    return pattern.replace(textRegex, link.text).replace(urlRegex, link.url);
}
