import { IpLogEntry } from "../../common/iplog/entry";
import { useCallback, useEffect, useState } from "react";
import { clearLog, hasLogProperty, loadLog } from "../../common/iplog/log";
import browser, { Storage } from "webextension-polyfill";

export function useLogs(): [IpLogEntry[] | null, () => void, () => void] {
    const [logs, setLog] = useState<IpLogEntry[] | null>(null);

    const getLogs = useCallback(
        () => void loadLog().then(setLog).catch(console.error),
        []
    );

    useEffect(() => {
        function listener(
            changes: Record<string, Storage.StorageChange>,
            area: string
        ): void {
            if (logs != null && area === "local" && hasLogProperty(changes)) {
                getLogs();
            }
        }

        browser.storage.onChanged.addListener(listener);
        return () => browser.storage.onChanged.removeListener(listener);
    }, [logs, getLogs]);

    const clearLogs = useCallback(() => {
        clearLog()
            .then(() => setLog(null))
            .catch(console.error);
    }, []);

    return [logs, getLogs, clearLogs];
}
