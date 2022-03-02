import { load } from "./common/";
import {
    provideCopyPattern,
    provideDeduplicateHrefs,
    provideFailurePopup,
    provideFinalNewline,
    provideIncludeCommandTarget,
    provideShowCopyMenuAction,
    provideShowOpenMenuAction,
    provideSuccessPopup,
} from "./options/";

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
