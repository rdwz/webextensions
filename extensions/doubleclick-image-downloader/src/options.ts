import {
    rigContextMenu,
    rigGeneral,
    rigHoverButton,
    rigNiche,
    rigRenaming,
    rigRestrictions,
} from "./_options";
import { load } from "./common";

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
