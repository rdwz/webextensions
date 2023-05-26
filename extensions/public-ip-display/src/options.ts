import {
    rigCountryCodeService,
    rigDisplayFlag,
    rigIpService,
    rigLogLifetime,
    rigLookUpCountry,
    rigNotify,
    rigRefreshRate,
} from "./_options";
import { Local, Sync } from "./common";

Sync.load()
    .then((settings) => {
        rigNotify(settings);
        rigRefreshRate(settings);
        rigIpService(settings);

        rigLookUpCountry(settings);
        rigDisplayFlag(settings);
        rigCountryCodeService(settings);
    })
    .catch(console.error);

Local.load().then(rigLogLifetime).catch(console.error);
