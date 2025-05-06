import './_splashscreen.scss'

export default function splashScreen() {

    let divElm = document.createElement("div")
    divElm.className = "splashscreen"

    divElm.innerHTML = `
        <div class="splash__img">
            <img src="img/newsify_logo_1.svg" alt="">
            <h1 class="splash__title">Newsify</h1>
        </div>
    `

    let title = divElm.querySelector(".splash__title");
    let img = divElm.querySelector("img");
    
    setTimeout(() => {
        title.style.backgroundPosition = "0 0"
        img.style.transform = "scale(1)"
        img.style.opacity = "1"
    }, 500);
    
    

    return divElm
}