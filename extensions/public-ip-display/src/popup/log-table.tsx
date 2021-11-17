import React, { ReactElement, useMemo } from "react";
import { IpLogEntry } from "../common/iplog/entry";
import { LogRow } from "./log-row";

function stub(label: string): ReactElement {
    return (
        <tr>
            <td className="pt1 pb1" colSpan={3}>
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
        <div className="db overflow-y-scroll" style={{ maxHeight: "10em" }}>
            <table className="w-100 bg-white collapse">
                <thead>
                    <tr>
                        <th className="bg-black pl1 pr1 white">IP</th>

                        <th className="bg-black pl1 pr1 white b--white bl br bw1">
                            Country
                        </th>

                        <th className="bg-black pl1 pr1 white">Time</th>
                    </tr>
                </thead>

                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}
