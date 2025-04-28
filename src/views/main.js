import '../styles/style.scss'
import splashScreen from '../components/splashscreen/splashscreen.js'
import { readFromLocalStorage, saveTolocalStorage, readFromSessionStorage, saveToSessionStorage } from '../util/localstorage.js';
import onboarding from '../components/onboarding/onboarding.js'
import newStories from '../data/home.js';
import footer from '../components/footer/footer.js';
import header from '../components/header/header.js';
import settingsData from '../data/settings.js';
import darkMode from '../util/darkmode.js';

let app = document.querySelector("#app")
const {container, searchableArticles} = await newStories()
const { settingsContainer } = await settingsData()



let splash = splashScreen()

if (!readFromSessionStorage('splash')) {
    
    app.append(splash)
    saveToSessionStorage('splash', true)

    setTimeout(() => {

        splash.remove()
    
        let NotFirstTime = readFromLocalStorage("hasOnboarded")
    
        if (!NotFirstTime) {
            app.append(onboarding())
        } else {
            app.append(header(searchableArticles), container, settingsContainer, footer())
        }
    
    }, 3000);
} else {
    app.append(header(searchableArticles), container, settingsContainer, footer())
}

darkMode()


// setTimeout(() => {

//     splash.remove()

//     let NotFirstTime = readFromLocalStorage("hasOnboarded")

//     if (!NotFirstTime) {
//         app.append(onboarding())
//     } else {
//         app.append(header(searchableArticles), container, settingsContainer, footer())
//     }

// }, 3000);

// document.querySelector("#app").append(onboarding())

// const {container, searchableArticles} = await newStories()
// app.append(header(searchableArticles), container, footer())

// app.append(settingsContainer, footer())

