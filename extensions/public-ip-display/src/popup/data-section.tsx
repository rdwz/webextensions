import type { IpCountryData } from "../common";
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
        <div className="flex items-baseline justify-around">
            <div className="bg-white border border-solid m-4 p-2">
                <div className="whitespace-nowrap">
                    <code className="mr-1">{data.ip}</code>

                    <button onClick={copy} title="Copy IP" type="button">
                        📋
                    </button>
                </div>

                <small className="italic">{data.ipService}</small>
            </div>

            {data.country == null || data.countryService == null ? null : (
                <div className="bg-white border border-solid m-4 p-2">
                    <div className="whitespace-nowrap">
                        <FlagImage country={data.country} />

                        <code className="ml-1">{data.country}</code>
                    </div>

                    <small className="italic">{data.countryService}</small>
                </div>
            )}
        </div>
    );
}
