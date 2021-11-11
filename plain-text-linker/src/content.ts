import {getTextFromSelection} from "./content/doubleclick";

document.body.addEventListener("dblclick", event => void getTextFromSelection(event).catch(console.error));
