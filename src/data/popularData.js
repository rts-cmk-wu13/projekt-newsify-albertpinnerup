import sectionWrapper from "../components/articles/sectionWrapper.js";
import articleCard from "../components/articles/articles.js";
import { readFromLocalStorage } from "../util/localstorage.js";

export default async function popular() {

    const APIKEY = import.meta.env.VITE_NYT_API_KEY;

    const response = await fetch( `https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=${APIKEY}`);
    const data = await response.json();

    const popularContainer = document.createElement("div");
    popularContainer.className = "articles";

    console.log(data);
    

    const excludedSections = readFromLocalStorage('uncheckedSection') || [];
    const searchableArticles = [];

    const sectionGroups = {};

    data.results
        .filter(story => story.media?.length && !excludedSections.includes(story.section))
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
                const card = articleCard(
                    story.title,
                    story.abstract,
                    story.media[0]["media-metadata"][0].url
                );
                openContainer.appendChild(card);

                searchableArticles.push({
                    element: card,
                    title: story.title,
                    abstract: story.abstract,
                    section: story.section
                });
            });
        
            popularContainer.appendChild(wrapper);
        });
    
    return { popularContainer, searchableArticles }
}