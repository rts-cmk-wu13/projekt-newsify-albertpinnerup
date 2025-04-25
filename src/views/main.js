import '../styles/style.scss'
import splashScreen from '../components/splashscreen/splashscreen.js'
import { readFromLocalStorage, saveTolocalStorage } from '../util/localstorage.js';
import onboarding from '../components/onboarding/onboarding.js'
import newStories from '../data/home.js';
import footer from '../components/footer/footer.js';
import header from '../components/header/header.js';
import settings from '../components/settings/settings.js';

let app = document.querySelector("#app")
const {container, searchableArticles} = await newStories()

// app.append(settings("peter"))

// let splash = splashScreen()
// app.append(splash)


// setTimeout(() => {

//     splash.remove()

//     let NotFirstTime = readFromLocalStorage("hasOnboarded")

//     if (!NotFirstTime) {
//         app.append(onboarding())
//     } else {
//         app.append(header(searchableArticles), container, footer())
//     }

// }, 3000);

// document.querySelector("#app").append(onboarding())

// const {container, searchableArticles} = await newStories()
app.append(header(searchableArticles), container, footer())

