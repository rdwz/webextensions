import type { IpCountryData } from "../common/";
import { FlagImage } from "./flag-image";
import { sendCopyHappened } from "./util";
import React, { ReactElement, useCallback } from "react";

interface Props {
    data: IpCountryData;
}

export function DataSection({ data }: Props): ReactElement {
    const copy = useCallback(() => {
        navigator.clipboard
            .writeText(data.ip)
            .then(() => sendCopyHappened(data.ip))
            .catch((error) =>
                console.error("Failed to copy to clipboard.", error)
            );
    }, [data]);

    return (
        <div className="flex justify-around items-baseline">
            <div className="pa2 ba ma3 bg-white">
                <div className="nowrap">
                    <code className="mr1">{data.ip}</code>

                    <button onClick={copy} title="Copy IP" type="button">
                        📋
                    </button>
                </div>

                <small className="i">{data.ipService}</small>
            </div>

            {data.country == null || data.countryService == null ? null : (
                <div className="pa2 ba ma3 bg-white">
                    <div className="nowrap">
                        <FlagImage country={data.country} />

                        <code className="ml1">{data.country}</code>
                    </div>

                    <small className="i">{data.countryService}</small>
                </div>
            )}
        </div>
    );
}
