import '../styles/style.scss'
import splashScreen from '../components/splashscreen/splashscreen.js'
import { readFromLocalStorage, saveTolocalStorage } from '../util/localstorage.js';
import onboarding from '../components/onboarding/onboarding.js'
import footer from '../components/footer/footer.js';

let app = document.querySelector("#app")

// let splash = splashScreen()
// app.append(splash)


// setTimeout(() => {

//   splash.remove()

//   let NotFirstTime = readFromLocalStorage("hasOnboarded")

//   if (!NotFirstTime) {
//     app.append(onboarding())
//   } else {
//     app.append(footer())
//   }

// }, 3000);

// document.querySelector("#app").append(onboarding())
app.append(footer())

