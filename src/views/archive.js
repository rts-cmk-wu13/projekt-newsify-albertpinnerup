import '../styles/style.scss'
import { readFromLocalStorage, saveTolocalStorage, readFromSessionStorage, saveToSessionStorage } from '../util/localstorage.js';
import footer from '../components/footer/footer.js';
import header from '../components/header/header.js';
import settingsData from '../data/settings.js';
import darkMode from '../util/darkmode.js';
import popular from '../data/popularData.js';
import { swiperDelete} from '../util/swiper.js';
import archive from '../data/archiveData.js';
import setVh from '../util/dynamicViewport.js';
document.addEventListener('DOMContentLoaded', () => {
    setVh();
});


const app = document.querySelector("#app");

(async function init() {
    const { settingsContainer } = await settingsData()
    const {archiveContainer, searchableArticles } = archive()
       
    app.append(header(searchableArticles, "archive"), archiveContainer, settingsContainer, footer())
            
    
    darkMode()
    swiperDelete()
})();





