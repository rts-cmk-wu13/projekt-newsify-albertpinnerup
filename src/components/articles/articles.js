import './_articles.scss'

export default function articleCard(head, sub, img) {
    const divElm = document.createElement("div");
    divElm.className = "article__card";

    divElm.innerHTML = `
    <div class="article__content">

    
        <div class="article__img">
            <img src="${img}" alt="">
        </div>
        <div class="article__text">
            <h4>${head}</h4>
            <p>${sub}</p>
        </div>
    </div>
    `;

    return divElm;
}
