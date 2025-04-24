import './_articles.scss'

export default function article(catg, head, sub, img) {

    let divElm = document.createElement("div")
    divElm.className = "article"

    divElm.innerHTML = `
        <div class="closed">
            <div class="article__logo">
                <img src="src/img/newsify_logo_1.svg" alt="">
            </div>
            <h3 class="article__category">${catg.toUpperCase()}</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="article__chevron">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="open">
            <div class="article__img">
                <img src="${img}" alt="">
            </div>
            <div class="article__text">
                <h4>${head}</h4>
                <p>${sub}</p>
            </div>
            
        </div>
    `

    divElm.querySelector(".closed").addEventListener("click", () => {
        divElm.classList.toggle("expanded")
    })

    return divElm
}