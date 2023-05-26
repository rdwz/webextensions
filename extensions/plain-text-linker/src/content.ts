import { getTextFromSelection } from "./_content";

document.body.addEventListener("dblclick", (event) => {
    getTextFromSelection(event).catch(console.error);
});
