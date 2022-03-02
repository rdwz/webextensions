import type { IpCountryData } from "../common/ipdata";
import { useRateLimiting } from "./state/rate-limit";
import { sendRefreshWanted } from "./util/messaging";
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
            style={{
                alignItems: "baseline",
                display: "grid",
                gridTemplateAreas: '"left center right"',
                gridTemplateColumns: "1fr min-content 1fr",
            }}
        >
            <div style={{ gridArea: "left" }}>Status at:</div>

            <div
                className="pl1 pr1 nowrap"
                style={{ gridArea: "center", justifySelf: "center" }}
            >
                {heading}
            </div>

            <div style={{ gridArea: "right", justifySelf: "end" }}>
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
