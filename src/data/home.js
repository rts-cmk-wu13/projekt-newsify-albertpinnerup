import article from "../components/articles/articles.js";

export default async function newStories () {

    const apiKey = "TKAYMtJxdsONVA2BOpUBWecrx5goAmNl"

    let getNewStories = await fetch(`https://api.nytimes.com/svc/news/v3/content/nyt/all.json?limit=40&api-key=${apiKey}`);
    let data = await getNewStories.json()

    console.log(data);

    let container = document.createElement("div")
    container.className = "articles"

    const excludedSections = ["En español", "corrections"]

    const searchableArticles = []

    data.results
        .filter(story => story.multimedia?.length && !excludedSections.includes(story.section))
        .slice(0, 20)
        .map(story => {
            let artcl = article(story.section, story.title, story.abstract, story.multimedia[0].url);
            container.appendChild(artcl)

            searchableArticles.push({
                element: artcl,
                title: story.title,
                abstract: story.abstract,
                section: story.section
              });
        });

    // data.results.map(story => {
    //     // console.log(story);

       
        
        
    // }).join("")
    
    return {container, searchableArticles}
}