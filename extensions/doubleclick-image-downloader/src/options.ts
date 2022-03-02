import { load } from "./common/";
import {
    rigContextMenu,
    rigGeneral,
    rigHoverButton,
    rigNiche,
    rigRenaming,
    rigRestrictions,
} from "./options/";

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
