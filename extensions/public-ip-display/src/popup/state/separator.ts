import {useCallback, useState} from "react";
import {requestSeparator} from "../util/messaging";

async function messageForSeparator(): Promise<string> {
    const response = await requestSeparator();
    if (response.subject !== "reportingSeparator") {
        throw new Error(`unexpected response message: ${JSON.stringify(response)}`);
    }
    return response.separator;
}

export function useSeparator(): [string | null, () => void] {
    const [separator, setSeparator] = useState<string | null>(null);

    const getSeparator = useCallback(() => void messageForSeparator().then(setSeparator).catch(console.error), []);

    return [separator, getSeparator];
}
