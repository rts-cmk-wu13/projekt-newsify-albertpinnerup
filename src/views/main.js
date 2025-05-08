import '../styles/style.scss'
import splashScreen from '../components/splashscreen/splashscreen.js'
import { readFromLocalStorage, saveTolocalStorage, readFromSessionStorage, saveToSessionStorage } from '../util/localstorage.js';
import onboarding from '../components/onboarding/onboarding.js'
import newStories from '../data/home.js';
import footer from '../components/footer/footer.js';
import header from '../components/header/header.js';
import settingsData from '../data/settings.js';
import darkMode from '../util/darkmode.js';
import { swiperAdd } from '../util/swiper.js';
import setVh from '../util/dynamicViewport.js';
document.addEventListener('DOMContentLoaded', () => {
    setVh();
});

const app = document.querySelector("#app");


(async function init() {
const { container, searchableArticles } = await newStories()
const { settingsContainer } = await settingsData()

let splash = splashScreen()

if (!readFromSessionStorage('splash')) {

    app.append(splash)
    saveToSessionStorage('splash', true)
    setVh()

    setTimeout(() => {

        splash.remove()

        let NotFirstTime = readFromLocalStorage("hasOnboarded")

        if (!NotFirstTime) {
            app.append(onboarding(() => {

                saveTolocalStorage("hasOnboarded", true)

                const ob = document.querySelector(".onboarding");
                if (ob) ob.remove()

                app.append(header(searchableArticles, "news"), container, settingsContainer, footer())
                darkMode()
                swiperAdd()
                setVh()
                
            }))
        } else {
            app.append(header(searchableArticles, "news"), container, settingsContainer, footer())
            darkMode()
            swiperAdd()
            
        }

    }, 3000);

} else {

    app.append(header(searchableArticles, "news"), container, settingsContainer, footer())
    darkMode()
    swiperAdd()
    setVh()

}

})();


// app.append(onboarding(() => {

//                 saveTolocalStorage("hasOnboarded", true)

//                 const ob = document.querySelector(".onboarding");
//                 if (ob) ob.remove()

//                 app.append(header(searchableArticles, "news"), container, settingsContainer, footer())
//                 darkMode()
//                 swiperAdd()
//                 setVh()
                
//             }));