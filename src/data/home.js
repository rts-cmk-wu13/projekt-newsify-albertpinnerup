

import sectionWrapper from "../components/articles/sectionWrapper.js";
import articleCard from "../components/articles/articles.js";
import { readFromLocalStorage } from "../util/localstorage.js";

export default async function newStories(sections) {
    const APIKEY = import.meta.env.VITE_NYT_API_KEY;

    const res = await fetch(`https://api.nytimes.com/svc/news/v3/content/nyt/all.json?limit=40&api-key=${APIKEY}`);
    const data = await res.json();

    const container = document.createElement("div");
    container.className = "articles";

    const excludedSections = readFromLocalStorage('uncheckedSection') || [];
    const searchableArticles = [];

    console.log(data);
    

    // Group stories by section
    const sectionGroups = {};

    data.results
        .filter(story => story.multimedia?.length && !excludedSections.includes(story.section))
        .forEach(story => {
            const section = story.section;

            if (!sectionGroups[section]) {
                sectionGroups[section] = [];
            }

            sectionGroups[section].push(story);
        });
        

    // Render grouped sections
    Object.entries(sectionGroups).forEach(([section, stories]) => {
        const { wrapper, openContainer } = sectionWrapper(section);
    
        stories.forEach(story => {
            const card = articleCard(
                story.title,
                story.abstract,
                story.multimedia[0].url
            );
            openContainer.appendChild(card);

            searchableArticles.push({
                element: card,
                title: story.title,
                abstract: story.abstract,
                section: story.section
            })
        });
    
        container.appendChild(wrapper);
    });

    return { container, searchableArticles };
}
