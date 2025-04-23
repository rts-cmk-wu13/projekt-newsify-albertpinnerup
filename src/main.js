import './styles/style.scss'
import splashScreen from './components/splashscreen/splashscreen.js'
import { readFromLocalStorage, saveTolocalStorage } from './util/localstorage.js';
import onboarding from './components/onboarding/onboarding.js'

// let splash = splashScreen()
// document.querySelector("#app").append(splash)

// setTimeout(() => {

//   splash.remove()

//   let NotFirstTime = readFromLocalStorage("hasOnboarded")

//   if (!NotFirstTime) {
//     document.querySelector("#app").append(onboarding())
//   }

// }, 3000);

document.querySelector("#app").append(onboarding())


