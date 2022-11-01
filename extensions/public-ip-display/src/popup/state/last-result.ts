import {
    IpCountryData,
    isPersistedIpCountryDataProperty,
    loadLast,
} from "../../common/";
import { useCallback, useEffect, useState } from "react";
import browser, { Storage } from "webextension-polyfill";

const placeholder = Symbol("not yet loaded");

export function useLastResult(): IpCountryData | null {
    const [data, setData] = useState<IpCountryData | typeof placeholder | null>(
        placeholder
    );

    const load = useCallback(() => {
        loadLast().then(setData).catch(console.error);
    }, []);

    useEffect(load, [load]);

    useEffect(() => {
        function listener(
            changes: Record<string, Storage.StorageChange>,
            area: string
        ): void {
            if (
                data !== placeholder &&
                area === "local" &&
                Object.keys(changes).some(isPersistedIpCountryDataProperty)
            ) {
                load();
            }
        }

        browser.storage.onChanged.addListener(listener);
        return () => browser.storage.onChanged.removeListener(listener);
    }, [data, load]);

    return data === placeholder ? null : data;
}
