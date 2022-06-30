import { $,} from "./in";
import { loopLines } from "./out";

export function enter(text) {
    

    let command = $("typer");
    let textarea = $("texter");

    console.log(text);

    loopLines([
        "<span class=\"color1\">user@riverwolves:~$</span> "+text,
        "<span class=\"color2\">Server: </span> Fetching..",
        ],"",200)

    command.innerHTML = "";
    textarea.value = "";
}