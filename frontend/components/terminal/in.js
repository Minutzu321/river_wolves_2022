import { loopLines, addLine } from "./out";
import { banner } from "./banner";
import { enter } from "./asculta";

export var cursor;
export var pw = false;

export var before;
export var liner;
export var command; 
export var textarea; 
export var terminal;

export function $(elid) {
    return document.getElementById(elid);
}

export function init() {
    console.log(
        "%c NU AI CE SA VEZI AICI",
        "color: #FF0000; font-weight: bold; font-size: 24px;"
    );
    
    before = $("before");
    liner = $("liner");
    command = $("typer");
    textarea = $("texter");
    terminal = $("terminal");
    cursor = $("cursor");
    cursor.style.left = "0px";

    textarea.value = "";

    setTimeout(function() {
        loopLines(banner, "", 80);
        textarea.focus();
    }, 100);
}

export function nl2br(txt) {
  return txt.replace(/\n/g, '').replace("  "," ");
}

export function typeIt(e, pw) {
    if (typeof window !== "undefined") {
        e = e || window.event;

        let w = $("typer");
        let tw = $("texter").value;
        if(e.type === "keyup" && e.keyCode === 13){
            enter(tw);
            return;
        }
        if (!pw){
            w.innerHTML = nl2br(tw);
            $("texter").value = nl2br(tw);
        }
    }
}

export function moveIt(e) {
    if (typeof window !== "undefined") {
        e = e || window.event;
        let count = $("texter").value.length;
        let keycode = e.keyCode || e.which;
        if (keycode == 37 && parseInt(cursor.style.left) >= (0 - ((count - 1) * 10))) {
            cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
        } else if (keycode == 39 && (parseInt(cursor.style.left) + 10) <= 0) {
            cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
        }
    }
}

export function focus() {
    $("texter").focus();
}