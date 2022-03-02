import { load } from "./common/settings/settings";
import { rigContextMenu } from "./options/context";
import { rigGeneral } from "./options/general";
import { rigHoverButton } from "./options/hover";
import { rigNiche } from "./options/niche";
import { rigRenaming } from "./options/renaming";
import { rigRestrictions } from "./options/restrictions";

load()
    .then((settings) => {
        rigGeneral(settings);
        rigContextMenu(settings);
        rigRestrictions(settings);
        rigHoverButton(settings);
        rigRenaming(settings);
        rigNiche(settings);
    })
    .catch(console.error);
