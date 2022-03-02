import {
    DataSection,
    LogSection,
    RefreshHeader,
    useLastResult,
} from "./popup/";
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
