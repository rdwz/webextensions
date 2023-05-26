import type { IpCountryData } from "../common";
import { useRateLimiting } from "./state";
import { sendRefreshWanted } from "./util";
import React, { ReactElement } from "react";

interface Props {
    lastResult: IpCountryData | null;
}

export function RefreshHeader({ lastResult }: Props): ReactElement {
    const heading =
        lastResult == null ? (
            <strong>N/A</strong>
        ) : (
            <span>{lastResult.fetchedAt.toLocaleString()}</span>
        );

    const [countdown, action] = useRateLimiting(sendRefreshWanted, 5);

    return (
        <header
            className="items-baseline grid"
            style={{
                gridTemplateAreas: '"left center right"',
                gridTemplateColumns: "1fr min-content 1fr",
            }}
        >
            <div style={{ gridArea: "left" }}>Status at:</div>

            <div
                className="justify-self-center px-1 whitespace-nowrap"
                style={{ gridArea: "center" }}
            >
                {heading}
            </div>

            <div className="justify-self-end" style={{ gridArea: "right" }}>
                <button
                    disabled={action == null}
                    onClick={action}
                    type="button"
                >
                    {countdown == null
                        ? "↻ Refresh"
                        : `↻ Refresh (${countdown})`}
                </button>
            </div>
        </header>
    );
}
