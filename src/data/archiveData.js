import sectionWrapper from "../components/articles/sectionWrapper.js";
import articleCard from "../components/articles/articles.js";
import { readFromLocalStorage } from "../util/localstorage.js";

export default function archive() {

    
    const data = readFromLocalStorage("savedArticles") || [];

    console.log(data);
    

    const archiveContainer = document.createElement("div");
    archiveContainer.className = "articles";

    

    const excludedSections = readFromLocalStorage('uncheckedSection') || [];
    const searchableArticles = [];

    const sectionGroups = {};

    data
        .filter(story => 
        (!excludedSections.includes(story.section)) &&
        ((story.media?.length) || (story.multimedia?.length))
        )
        .forEach(story => {
            const section = story.section;

            if (!sectionGroups[section]) {
                sectionGroups[section] = [];
            }

            sectionGroups[section].push(story);
        });

        Object.entries(sectionGroups).forEach(([section, stories]) => {
            const { wrapper, openContainer } = sectionWrapper(section);

            console.log(section, stories)
        
            stories.forEach(story => {
                let imageUrl = "";
                if (story.multimedia?.length) {
                    imageUrl = story.multimedia[0].url;
                } else if (story.media?.length && story.media[0]["media-metadata"]?.length) {
                    imageUrl = story.media[0]["media-metadata"][0].url;
                }

                const card = articleCard(
                    story.title,
                    story.abstract,
                    imageUrl,
                    story.url
                );

                card.dataset.article = JSON.stringify(story);
                openContainer.appendChild(card);

                searchableArticles.push({
                    element: card,
                    title: story.title,
                    abstract: story.abstract,
                    section: story.section
                });
            });
        
            archiveContainer.appendChild(wrapper);
        });
    
    return { archiveContainer, searchableArticles }
}