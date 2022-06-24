import type { IpLogEntry } from "../common/";
import { LogRow } from "./log-row";
import React, { ReactElement, useMemo } from "react";

function stub(label: string): ReactElement {
    return (
        <tr>
            <td className="py-1" colSpan={3}>
                {label}
            </td>
        </tr>
    );
}

interface Props {
    entries: IpLogEntry[] | null;
}

export function LogTable({ entries }: Props): ReactElement {
    const rows = useMemo(() => {
        if (entries == null) {
            return stub("Log is not loaded");
        } else if (entries.length === 0) {
            return stub("Log is empty");
        } else {
            return [...entries]
                .reverse()
                .map((log) => (
                    <LogRow entry={log} key={log.timestamp.getTime()} />
                ));
        }
    }, [entries]);

    return (
        <div className="block max-h-[10em] overflow-y-scroll">
            <table className="bg-white border-collapse border-spacing-0 w-full">
                <thead>
                    <tr>
                        <th className="bg-black px-1 text-white">IP</th>

                        <th className="bg-black border-solid border-white border-x-2 border-y-0 px-1 text-white">
                            Country
                        </th>

                        <th className="bg-black px-1 text-white">Time</th>
                    </tr>
                </thead>

                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}
