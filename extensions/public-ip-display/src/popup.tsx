import { DataSection } from "./popup/data-section";
import { LogSection } from "./popup/log-section";
import { RefreshHeader } from "./popup/refresh-header";
import { useLastResult } from "./popup/state/last-result";
import React, { ReactElement } from "react";
import ReactDOM from "react-dom";

function Popup(): ReactElement {
    const lastResult = useLastResult();

    return (
        <>
            <RefreshHeader lastResult={lastResult} />

            {lastResult == null ? null : <DataSection data={lastResult} />}

            <LogSection />
        </>
    );
}

ReactDOM.render(<Popup />, document.body);
