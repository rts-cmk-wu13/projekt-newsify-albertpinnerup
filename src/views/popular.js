import '../styles/style.scss'
import { readFromLocalStorage, saveTolocalStorage, readFromSessionStorage, saveToSessionStorage } from '../util/localstorage.js';
import footer from '../components/footer/footer.js';
import header from '../components/header/header.js';
import settingsData from '../data/settings.js';
import darkMode from '../util/darkmode.js';
import popular from '../data/popularData.js';
import { swiperAdd } from '../util/swiper.js';

let app = document.querySelector("#app")
const { settingsContainer } = await settingsData()
const { popularContainer, searchableArticles } = await popular()



    
app.append(header(searchableArticles, "popular"), popularContainer, settingsContainer, footer())
        
darkMode()
swiperAdd()





