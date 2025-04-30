import './_articles.scss'

export default function articleCard(head, sub, img, url) {
    const divElm = document.createElement("a");
    divElm.className = "article__card";
    divElm.href = `${url}`
    divElm.target = "_blank"

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
