import { readFromLocalStorage, saveTolocalStorage, removeFromLocalStorage } from "./localstorage.js";

export function swiperAdd() {

    const container = document.querySelectorAll(".open")

    container.forEach(article => {

        const threshold = 100;
        const base_right = -62;

        let initialX;
        let currentX;
        let movedX;

        let icon = document.createElement("span")
        icon.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        `

        icon.style.position = "absolute"
        icon.style.top = "50%"
        icon.style.right = "50px"
        icon.style.transform = "translateY(-50%"
        icon.className = "article__bookmark"


        article.addEventListener("pointerdown", down)
        article.addEventListener("pointermove", move)
        article.addEventListener("pointerup", up)

        function down(e) {

            initialX = e.clientX;
            e.target.closest(".article__content").classList.remove("animate");

        }

        function move(e) {
            currentX = e.clientX;
            movedX = currentX - initialX;

            const card = e.target.closest(".article__card");
            const content = e.target.closest(".article__content");
            let iconElement = card.querySelector(".article__bookmark");

            if (movedX < 0) {
                content.style.left = movedX + "px";
            }

            if (movedX < 0 && !iconElement) {

                card.append(icon);
                iconElement = icon;
                iconElement.classList.add("save")

            }

            if (iconElement) {

                const svg = iconElement.querySelector("svg")

                if (movedX < -threshold) {
                    svg.style.fill = "currentColor"
                } else {
                    svg.style.fill = "none"
                }

                const pullIn = Math.min(-movedX, threshold);
                const locked = pullIn >= threshold;
                const offset = locked ? threshold : pullIn;


                iconElement.style.right = (base_right + offset) + "px"
            }

            if (movedX >= 0 && iconElement) {
                iconElement.remove();
            }

        }

        function up(e) {


            const card = e.target.closest(".article__card");
            const content = e.target.closest(".article__content");
            const iconElement = card.querySelector(".article__bookmark");

            content.classList.add("animate");
            content.style.left = "0px"

            if (movedX < 0) {
                content.classList.add("animate");
                content.style.left = "0px";

                if (iconElement) {
                    iconElement.style.transition = "right .7s ease-in-out";
                    iconElement.style.right = base_right + "px"
                }
            }

            if (movedX < -threshold) {

                const articleData = card.dataset.article
                const parsed = JSON.parse(articleData)
                const saved = readFromLocalStorage("savedArticles") || [];

                const alreadySaved = saved.some(article =>
                    (article.uri === parsed.uri));

                if (!alreadySaved) {
                    saved.push(parsed)
                    saveTolocalStorage("savedArticles", saved)
                }
            }

            setTimeout(() => {
                if (card.contains(iconElement)) {
                    iconElement.remove()
                    iconElement.style.transition = "unset"
                }
            }, 700);


            initialX = undefined;
            movedX = 0

        }

    });
}





export function swiperDelete() {

    const container = document.querySelectorAll(".open")

    container.forEach(article => {

        const threshold = 100;
        const base_right = -62;

        let initialX;
        let currentX;
        let movedX;

        let icon = document.createElement("span")
        icon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `

        icon.style.position = "absolute"
        icon.style.top = "50%"
        icon.style.right = "50px"
        icon.style.transform = "translateY(-50%"
        icon.className = "article__delete"


        article.addEventListener("pointerdown", down)
        article.addEventListener("pointermove", move)
        article.addEventListener("pointerup", up)

        document.querySelectorAll(".article__card").forEach(card => {
            card.classList.add("delete");
        })

        function down(e) {

            initialX = e.clientX;
            e.target.closest(".article__content").classList.remove("animate")
        }

        function move(e) {
            currentX = e.clientX;
            movedX = currentX - initialX;

            const card = e.target.closest(".article__card");
            const content = e.target.closest(".article__content");
            let iconElement = card.querySelector(".article__delete");

            if (movedX < 0) {

                content.style.left = movedX + "px"
            }

            if (movedX < 0 && !iconElement) {

                card.append(icon);
                iconElement = icon;
                iconElement.classList.add("delete");
            }

            if (iconElement) {
                const svg = iconElement.querySelector("svg")

                if (movedX < -threshold) {
                    svg.style.fill = "currentColor"
                } else {
                    svg.style.fill = "none"
                }


                const pullIn = Math.min(-movedX, threshold);
                const locked = pullIn >= threshold;
                const offset = locked ? threshold : pullIn;


                iconElement.style.right = (base_right + offset) + "px"
            }

            if (movedX >= 0 && iconElement) {
                iconElement.remove()
            }

        }

        function up(e) {

            const card = e.target.closest(".article__card");
            const content = e.target.closest(".article__content");
            const iconElement = card.querySelector(".article__delete");

            if (movedX < 0) {

                if (movedX > -threshold) {
                    content.classList.add("animate");
                    content.style.left = "0px";
                }

                if (iconElement) {
                    iconElement.style.transition = "right .7s ease-in-out";
                    iconElement.style.right = base_right + "px"
                }
            }

            if (movedX < -threshold) {

                if (card.contains(iconElement)) {
                    iconElement.remove()
                    iconElement.style.transition = "unset"
                }

                content.style.transition = "transform .6s ease-in-out";
                content.style.transform = "translateX(-100%)";

                content.addEventListener("transitionend", () => {
                    const articleData = card.dataset.article;
                    const parsed = JSON.parse(articleData);
                    const saved = readFromLocalStorage("savedArticles") || [];

                    const updated = saved.filter(article => article.slug_name !== parsed.slug_name);
                    saveTolocalStorage("savedArticles", updated);

                    const wrapper = article.parentElement;
                    const remaining = article.querySelectorAll(".article__card").length;

                    if (remaining <= 1) {
                        wrapper.remove();
                    } else {
                        card.remove();
                    }
                }, { once: true });
            }

            setTimeout(() => {
                if (card.contains(iconElement)) {
                    iconElement.remove()
                    iconElement.style.transition = "unset"
                }
            }, 700);

            initialX = undefined;
            movedX = 0;
        }

    });
}
