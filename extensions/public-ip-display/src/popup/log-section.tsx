import React, { ReactElement, useCallback, useMemo } from "react";
import type { IpLogEntry } from "../common/iplog/entry";
import { LogTable } from "./log-table";
import { useConfirmation } from "./state/confirmation";
import { useLogs } from "./state/logs";
import { useSeparator } from "./state/separator";
import { copyToClipboard } from "./util/copy";

function toCsvRow(...values: string[]): string {
    return values.map((value) => `"${value}"`).join(",");
}

function toCsv(logs: IpLogEntry[], separator: string): string {
    const header = toCsvRow(
        "IP",
        "IP Service",
        "Country",
        "Country Service",
        "Timestamp"
    );
    const dataLines = logs.map((log) =>
        toCsvRow(
            log.ip,
            log.service,
            log.country ?? "",
            log.countryService ?? "",
            log.timestamp.toLocaleString()
        )
    );
    return header + separator + dataLines.join(separator) + separator;
}

export function LogSection(): ReactElement {
    const [logs, loadLogs, clearLogs] = useLogs();
    const [separator, loadSeparator] = useSeparator();

    const copyCsv = useMemo(() => {
        if (logs == null || logs.length === 0 || separator == null) {
            return undefined;
        }

        return () =>
            void copyToClipboard(toCsv(logs, separator), document).catch(
                console.error
            );
    }, [logs, separator]);

    const [confirmClear, denyClear] = useConfirmation(clearLogs);

    const load = useCallback((): void => {
        loadLogs();
        loadSeparator();
    }, [loadLogs, loadSeparator]);

    return (
        <>
            <div
                style={{
                    alignItems: "center",
                    display: "grid",
                    gridTemplateAreas: '"left center right"',
                    gridTemplateColumns: "1fr min-content 1fr",
                }}
            >
                <div style={{ gridArea: "left" }}>
                    <button
                        className="nowrap"
                        disabled={logs != null}
                        onClick={load}
                        type="button"
                    >
                        🔎 Load
                    </button>
                </div>

                <div style={{ gridArea: "center" }}>
                    <button
                        className="nowrap"
                        disabled={copyCsv == null}
                        onClick={copyCsv}
                        type="button"
                    >
                        📋 Copy CSV
                    </button>
                </div>

                <div style={{ gridArea: "right", justifySelf: "end" }}>
                    <button
                        className="nowrap"
                        disabled={logs == null || logs.length === 0}
                        onBlur={denyClear}
                        onClick={confirmClear}
                        onMouseOut={denyClear}
                        style={{
                            backgroundColor:
                                denyClear == null ? undefined : "tomato",
                        }}
                        type="button"
                    >
                        {denyClear == null ? "🗑️ Delete" : "🗑️ Really delete?"}
                    </button>
                </div>
            </div>

            <LogTable entries={logs} />
        </>
    );
}
