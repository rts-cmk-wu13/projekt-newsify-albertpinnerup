import './_header.scss'

export default function header(searchResults, page) {

    let headerElm = document.createElement("header")
    headerElm.className = "header"

    headerElm.innerHTML = `
        <div class="header__title-container">
            <div class="header__logo">
                <img src="/img/newsify_logo_1.svg" alt="">
            </div>
            <p class="header__title">Newsify</p>
        </div>
        <div class="header__search-wrapper">
            <input type="search" id="search" placeholder="Search ${page}">
        </div>
    `

    const searchInput = headerElm.querySelector("#search");

    console.log(searchResults);
    

    searchInput.addEventListener("input", e => {

        const value = e.target.value.toLowerCase().trim();

        
        
        searchResults.forEach(article => {

          console.log(article.element.dataset.article);
          

          const data = JSON.parse(article.element.dataset.article);
          
          const title = (data.title || "").toLowerCase().trim();
          const abstract = (data.abstract || "").toLowerCase().trim();
          const section = (data.section || "").toLowerCase().trim();

          // console.log(article.element.parentElement.parentElement);
          
          const isVisible =
            title.includes(value) ||
            abstract.includes(value) ||
            section.includes(value);

            // console.log({
            //   card: article.element,
            //   parent1: article.element.parentElement,
            //   parent2: article.element.parentElement?.parentElement
            // });
    
          article.element.classList.toggle("hide", !isVisible);

          const sectionParent = article.element.parentElement.parentElement;

          sectionParent.classList.toggle("hide", !isVisible && !sectionParent.querySelector(".article__card:not(.hide)"));
        });
      });

    return headerElm
}