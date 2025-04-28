
import './switch.scss'

export default function switchEl(checked) {

    let divElm = document.createElement("div")
    divElm.className = "switch__container"

    divElm.innerHTML = `
        <label class="switch" data-ischecked=${checked}>
            <input type="checkbox">
            <span class="slider round"></span>
        </label>
    `

    let checkbox = divElm.querySelector('input[type="checkbox"]');

    checkbox.checked = checked



    return divElm
}