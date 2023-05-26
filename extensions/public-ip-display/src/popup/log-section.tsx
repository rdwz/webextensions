import type { IpLogEntry } from "../common";
import { LogTable } from "./log-table";
import { useConfirmation, useLogs, useSeparator } from "./state";
import classNames from "classnames";
import React, { ReactElement, useCallback, useMemo } from "react";

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

        return () => {
            navigator.clipboard
                .writeText(toCsv(logs, separator))
                .catch((error) =>
                    console.error("Failed to copy to clipboard.", error)
                );
        };
    }, [logs, separator]);

    const [confirmClear, denyClear] = useConfirmation(clearLogs);

    const load = useCallback((): void => {
        loadLogs();
        loadSeparator();
    }, [loadLogs, loadSeparator]);

    return (
        <>
            <div
                className="items-center grid"
                style={{
                    gridTemplateAreas: '"left center right"',
                    gridTemplateColumns: "1fr min-content 1fr",
                }}
            >
                <div style={{ gridArea: "left" }}>
                    <button
                        className="whitespace-nowrap"
                        disabled={logs != null}
                        onClick={load}
                        type="button"
                    >
                        🔎 Load
                    </button>
                </div>

                <div style={{ gridArea: "center" }}>
                    <button
                        className="whitespace-nowrap"
                        disabled={copyCsv == null}
                        onClick={copyCsv}
                        type="button"
                    >
                        📋 Copy CSV
                    </button>
                </div>

                <div className="justify-self-end" style={{ gridArea: "right" }}>
                    <button
                        className={classNames("whitespace-nowrap", {
                            "bg-red-400": denyClear != null,
                        })}
                        disabled={logs == null || logs.length === 0}
                        onBlur={denyClear}
                        onClick={confirmClear}
                        onMouseOut={denyClear}
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
