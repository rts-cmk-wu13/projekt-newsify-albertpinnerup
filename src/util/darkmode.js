import { saveTolocalStorage, readFromLocalStorage } from "./localstorage";

export default function darkMode() {
    console.log("script Loaded");


    let rootElm = document.documentElement;
    let buttonElm = document.querySelector(".darkmode__button");
    let isDarkMode = readFromLocalStorage("isDarkMode")
    let userPref = window.matchMedia("(prefers-color-scheme: dark)").matches
    let darkBoo;

    let darkState = null

    if (isDarkMode == null || isDarkMode == undefined) {
        darkState = userPref;
    } else {
        darkState = isDarkMode;
    }

    if (darkState) {
        darkBoo = true
        rootElm.setAttribute("data-dark", darkBoo)
    } else {
        darkBoo = false
        rootElm.setAttribute("data-dark", darkBoo)
    }


    buttonElm.addEventListener("click", () => {

        darkBoo = !darkBoo

        rootElm.setAttribute("data-dark", darkBoo)
        saveTolocalStorage("isDarkMode", darkBoo)

        console.log(darkBoo);

    })
}