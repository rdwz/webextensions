import { load as loadSync } from "./common/settings/sync-settings";
import { load as loadLocal } from "./common/settings/local-settings";
import { rigLogLifetime } from "./options/local-options";
import {
    rigCountryCodeService,
    rigDisplayFlag,
    rigIpService,
    rigLookUpCountry,
    rigNotify,
    rigRefreshRate,
} from "./options/sync-options";

loadSync()
    .then((settings) => {
        rigNotify(settings);
        rigRefreshRate(settings);
        rigIpService(settings);

        rigLookUpCountry(settings);
        rigDisplayFlag(settings);
        rigCountryCodeService(settings);
    })
    .catch(console.error);

loadLocal().then(rigLogLifetime).catch(console.error);
