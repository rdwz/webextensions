import React, {ReactElement} from "react";
import ReactDOM from "react-dom";
import {DataSection} from "./popup/data-section";
import {useLastResult} from "./popup/state/last-result";
import {LogSection} from "./popup/log-section";
import {RefreshHeader} from "./popup/refresh-header";

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
