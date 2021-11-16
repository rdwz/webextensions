import {load} from "./common/settings/settings";
import {provideShowCopyMenuAction, provideShowOpenMenuAction} from "./options/context-menu";
import {provideFailurePopup, provideSuccessPopup} from "./options/notifications";
import {provideCopyPattern, provideFinalNewline} from "./options/general";
import {provideDeduplicateHrefs, provideIncludeCommandTarget} from "./options/gathering";

load()
    .then(settings => {
        provideFinalNewline(settings);
        provideCopyPattern(settings);

        provideIncludeCommandTarget(settings);
        provideDeduplicateHrefs(settings);

        provideSuccessPopup(settings);
        provideFailurePopup(settings);

        provideShowCopyMenuAction(settings);
        provideShowOpenMenuAction(settings);
    })
    .catch(console.error);
