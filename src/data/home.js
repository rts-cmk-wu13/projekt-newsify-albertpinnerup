// import article from "../components/articles/articles.js";

// export default async function newStories (sections) {

//     const apiKey = "TKAYMtJxdsONVA2BOpUBWecrx5goAmNl";

//     let getNewStories = await fetch(`https://api.nytimes.com/svc/news/v3/content/nyt/all.json?limit=80&api-key=${apiKey}`);
//     let data = await getNewStories.json();

//     console.log(data);

//     let container = document.createElement("div");
//     container.className = "articles";

//     const excludedSections = ["En español", "corrections"];

//     const searchableArticles = [];


//     data.results
//         .filter(story => story.multimedia?.length && !excludedSections.includes(story.section))
//         .slice(0, 20)
//         .forEach(story => {

            
//             let artcl = article(story.section, story.title, story.abstract, story.multimedia[0].url);
//             container.appendChild(artcl);

//             searchableArticles.push({
//                 element: artcl,
//                 title: story.title,
//                 abstract: story.abstract,
//                 section: story.section
//               });
//         });

    
//     return {container, searchableArticles, excludedSections};
// };

import sectionWrapper from "../components/articles/sectionWrapper.js";
import articleCard from "../components/articles/articles.js";

export default async function newStories(sections) {
    const apiKey = import.meta.env.VITE_NYT_API_KEY;

    const res = await fetch(`https://api.nytimes.com/svc/news/v3/content/nyt/all.json?limit=40&api-key=${apiKey}`);
    const data = await res.json();

    const container = document.createElement("div");
    container.className = "articles";

    const excludedSections = ["En español", "corrections"];
    const searchableArticles = [];

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

        console.log(sectionGroups);
        

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

    return { container, searchableArticles, excludedSections };
}
