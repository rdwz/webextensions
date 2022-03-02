import { Local, Sync } from "./common/";
import {
    rigCountryCodeService,
    rigDisplayFlag,
    rigIpService,
    rigLogLifetime,
    rigLookUpCountry,
    rigNotify,
    rigRefreshRate,
} from "./options/";

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
