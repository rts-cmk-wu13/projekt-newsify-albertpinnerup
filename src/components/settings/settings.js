import './settings.scss'
import switchEl from '../switch/switch.js'

export default function settings(catg) {

    let divElm = document.createElement("div")
    divElm.className = "settings"

    divElm.innerHTML = `
        <div class="settings__container">
            <div class="settings__logo">
                <img src="src/img/newsify_logo_1.svg" alt="">
            </div>
            <h3 class="settings__category">${catg.toUpperCase()}</h3>
        </div>
    `

    divElm.querySelector(".settings__container").appendChild(switchEl())
    return divElm
}