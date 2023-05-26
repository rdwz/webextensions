import {
    provideCopyPattern,
    provideDeduplicateHrefs,
    provideFailurePopup,
    provideFinalNewline,
    provideIncludeCommandTarget,
    provideShowCopyMenuAction,
    provideShowOpenMenuAction,
    provideSuccessPopup,
} from "./_options";
import { load } from "./common";

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
