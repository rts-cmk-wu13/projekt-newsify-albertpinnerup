
import './switch.scss'

export default function switchEl() {

    let divElm = document.createElement("div")
    divElm.className = "switch__container"

    divElm.innerHTML = `
        <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
        </label>
    `

    return divElm
}