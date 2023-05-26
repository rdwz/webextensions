import type { IpLogEntry } from "../common/";
import { FlagImage } from "./flag-image";
import React, { ReactElement } from "react";

interface Props {
    entry: IpLogEntry;
}

export function LogRow({ entry }: Props): ReactElement {
    return (
        <tr>
            <td className="border-0 border-b border-solid">
                {entry.ip}

                <br />

                <small className="block italic">{entry.service}</small>
            </td>

            <td className="border-0 border-b border-solid">
                {entry.country == null ||
                entry.countryService == null ? null : (
                    <>
                        <div>
                            <FlagImage country={entry.country} />

                            <span className="ml-1">{entry.country}</span>
                        </div>

                        <small className="block italic">
                            {entry.countryService}
                        </small>
                    </>
                )}
            </td>

            <td className="align-baseline border-0 border-b border-solid">
                {entry.timestamp.toLocaleString()}
            </td>
        </tr>
    );
}
