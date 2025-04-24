import './_header.scss'

export default function header(searchResults) {

    let headerElm = document.createElement("header")
    headerElm.className = "header"

    headerElm.innerHTML = `
        <div class="header__title-container">
            <div class="header__logo">
                <img src="src/img/newsify_logo_1.svg" alt="">
            </div>
            <p class="header__title">Newsify</p>
        </div>
        <div class="header__search-wrapper">
            <input type="search" id="search" placeholder="Search news">
        </div>
    `

    const searchInput = headerElm.querySelector("#search");


    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase();
    
        searchResults.forEach(article => {
          const isVisible =
            article.title.toLowerCase().includes(value) ||
            article.abstract.toLowerCase().includes(value) ||
            article.section.toLowerCase().includes(value);
    
          article.element.classList.toggle("hide", !isVisible);
        });
      });

    return headerElm
}