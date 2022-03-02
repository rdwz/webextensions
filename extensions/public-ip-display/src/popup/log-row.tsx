import type { IpLogEntry } from "../common/iplog/entry";
import { FlagImage } from "./flag-image";
import React, { ReactElement } from "react";

interface Props {
    entry: IpLogEntry;
}

export function LogRow({ entry }: Props): ReactElement {
    return (
        <tr>
            <td className="bb">
                <div className="tc">{entry.ip}</div>

                <small className="tr db i">{entry.service}</small>
            </td>

            <td className="bb">
                {entry.country == null ||
                entry.countryService == null ? null : (
                    <>
                        <div className="tc">
                            <FlagImage country={entry.country} />

                            <span className="ml1">{entry.country}</span>
                        </div>

                        <small className="tr db i">
                            {entry.countryService}
                        </small>
                    </>
                )}
            </td>

            <td className="v-base bb tc">{entry.timestamp.toLocaleString()}</td>
        </tr>
    );
}
