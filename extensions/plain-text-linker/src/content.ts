import { getTextFromSelection } from "./content/";

document.body.addEventListener("dblclick", (event) => {
    getTextFromSelection(event).catch(console.error);
});
