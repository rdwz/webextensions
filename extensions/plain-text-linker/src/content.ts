import { getTextFromSelection } from "./content/";

document.body.addEventListener(
    "dblclick",
    (event) => void getTextFromSelection(event).catch(console.error)
);
