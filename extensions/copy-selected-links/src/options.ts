import { load } from "./common/settings/settings";
import {
    provideShowCopyMenuAction,
    provideShowOpenMenuAction,
} from "./options/context-menu";
import {
    provideDeduplicateHrefs,
    provideIncludeCommandTarget,
} from "./options/gathering";
import { provideCopyPattern, provideFinalNewline } from "./options/general";
import {
    provideFailurePopup,
    provideSuccessPopup,
} from "./options/notifications";

load()
    .then((settings) => {
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
