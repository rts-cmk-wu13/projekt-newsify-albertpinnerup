import settings from "../components/settings/settings.js";
import { saveTolocalStorage, readFromLocalStorage } from "../util/localstorage.js";


export default async function settingsData() {

    let sections = readFromLocalStorage('sections')

    if (!sections) {
        const apiKey = import.meta.env.VITE_NYT_API_KEY;

        let response = await fetch(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${apiKey}`)
        let data = await response.json()

        sections = data.results

        saveTolocalStorage('sections', sections)
    }

    


    const settingsContainer = document.createElement("div");
    settingsContainer.className = "settings";

    const settingsContent = document.createElement("div");
    settingsContent.className = "settings__content"

    const settingsHeader = document.createElement("div");
    settingsHeader.className = "settings__header"

    settingsHeader.innerHTML = `
        <h1>Settings</h1>
        <h2>Categories</h2>
    `

    

    const uncheckedSectionsArray = readFromLocalStorage('uncheckedSection') || [];

    console.log(uncheckedSectionsArray);
    

    sections.forEach(sectionObj => {

        if (sectionObj.section === "admin") {
            return
        } else {
            const card = settings(sectionObj.display_name)

            const input = card.querySelector('input[type="checkbox"]');
            if (input) {
                input.checked = !uncheckedSectionsArray.includes(sectionObj.display_name); // Set checkbox to checked
                input.setAttribute("data-section", sectionObj.display_name);
            }

            settingsContent.append(card);
        }
        
    })

    let switches = settingsContent.querySelectorAll('input[type="checkbox"]');

    switches.forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            const sectionName = e.target.dataset.section;

            if (!e.target.checked) {
                // Add section to array if it's unchecked
                if (!uncheckedSectionsArray.includes(sectionName)) {
                    uncheckedSectionsArray.push(sectionName);
                    saveTolocalStorage('uncheckedSection', uncheckedSectionsArray)
                }
            } else {
                // Remove section from array if it's checked again
                const index = uncheckedSectionsArray.indexOf(sectionName);
                if (index !== -1) {
                    uncheckedSectionsArray.splice(index, 1);

                    saveTolocalStorage('uncheckedSection', uncheckedSectionsArray)
                }
            }
 
        });
    });


    settingsContainer.append(settingsHeader, settingsContent);

    return {settingsContainer, uncheckedSectionsArray};
}

