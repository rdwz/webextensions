import { requestSeparator } from "../util";
import { useCallback, useState } from "react";

async function messageForSeparator(): Promise<string> {
    const response = await requestSeparator();
    if (response.subject !== "reportingSeparator") {
        throw new Error(
            `unexpected response message: ${JSON.stringify(response)}`
        );
    }
    return response.separator;
}

export function useSeparator(): [string | null, () => void] {
    const [separator, setSeparator] = useState<string | null>(null);

    const getSeparator = useCallback(() => {
        messageForSeparator().then(setSeparator).catch(console.error);
    }, []);

    return [separator, getSeparator];
}
