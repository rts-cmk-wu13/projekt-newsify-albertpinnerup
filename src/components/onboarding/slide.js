export default function slide(title, content, imgURL, classname) {

    let sectionElm = document.createElement("section")
    sectionElm.classList.add("carousel__card", classname)

    sectionElm.innerHTML = `

        <div class="img">
            <img src="${imgURL}" alt="">
        </div>
        <div class="content">
            <h2>${title}</h2>
            <p>${content}</p>
        </div>
        
    `

    return sectionElm
}