import React, {ReactElement, useMemo} from "react";
import browser from "webextension-polyfill";

interface Props {
    country: string;
}

export function FlagImage({country}: Props): ReactElement {
    const flag = useMemo(() => browser.runtime.getURL(`/images/flags/${country}.svg`), [country]);

    return <img alt={`flag of ${country}`} src={flag} style={{height: `1em`, verticalAlign: "sub"}} />;
}
