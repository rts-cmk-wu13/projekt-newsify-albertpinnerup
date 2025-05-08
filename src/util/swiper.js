import { readFromLocalStorage, saveTolocalStorage, removeFromLocalStorage } from "./localstorage.js";

export function swiperAdd() {

    const container = document.querySelectorAll(".open")

    container.forEach(article => {

        const threshold = 100;
        const base_right = -62;

        let initialX, initialY
        let currentX, currentY
        let movedX, movedY

        function createBookmarkIcon() {
            const span = document.createElement("span");
            span.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086
                        5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304
                        3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19
                        4.46957 19 5V21Z"
                        stroke="#FFF" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            span.style.position = "absolute";
            span.style.top = "50%";
            span.style.right = "50px";
            span.style.transform = "translateY(-50%)";
            span.className = "article__bookmark";
            return span;
        }

        article.addEventListener("pointerdown", down)
        article.addEventListener("pointermove", move)
        article.addEventListener("pointerup", up)

        function down(e) {

            initialX = e.clientX;
            initialY = e.clientY

            const card = e.target.closest(".article__card");
            const content = e.target.closest(".article__content");
            const iconElement = card.querySelector(".article__bookmark, .article__delete");

            content.style.transition = "unset";
            content.style.transform = "unset";

            if (iconElement) {
                iconElement.style.transition = "unset";
            }

            content.classList.remove("animate");

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

                iconElement = createBookmarkIcon();
                card.append(iconElement);
                iconElement.classList.add("save")

            }

            if (iconElement) {

                const svg = iconElement.querySelector("svg")

                if (movedX < -threshold) {
                    svg.style.fill = "currentColor"
                } else {

                    const articleData = card.dataset.article
                    const parsed = JSON.parse(articleData)
                    const saved = readFromLocalStorage("savedArticles") || [];
                    const alreadySaved = saved.some(article =>
                        (article.uri === parsed.uri));

                    svg.style.fill = alreadySaved ? "currentColor" : "none";
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

            
            if (Math.abs(movedX) <= threshold) {
                content.classList.add("animate");
                content.style.left = "0px";
            };

            if (iconElement) {
                iconElement.style.transition = "right .7s ease-in-out";
                iconElement.style.right = base_right + "px";
            };

            if (movedX < -threshold) {

                content.style.transition = "left .3s ease-out"
                content.style.left = -threshold + "px"

                if (iconElement) {
                    iconElement.style.transition = "right .3s ease-out";
                    iconElement.style.right = (base_right + threshold) + "px";

                }

                setTimeout(() => {

                    const articleData = card.dataset.article
                    const parsed = JSON.parse(articleData)
                    const saved = readFromLocalStorage("savedArticles") || [];

                    const alreadySaved = saved.some(article =>
                        (article.uri === parsed.uri));

                    if (!alreadySaved) {
                        saved.push(parsed)
                        saveTolocalStorage("savedArticles", saved)
                    }

                    content.style.transition = "left 0.4s ease-in-out";
                    content.style.left = "0px";

                    if (iconElement) {
                        iconElement.style.transition = "right 0.4s ease-in-out";
                        iconElement.style.right = base_right + "px";
                    }

                }, 700);
            }

            setTimeout(() => {
                if (card.contains(iconElement)) {
                    iconElement.remove()
                    iconElement.style.transition = "unset"
                }
            }, 1100);


            initialX = undefined;
            movedX = 0

        }

    });
}

export function swiperDelete() {

    const container = document.querySelectorAll(".open")

    container.forEach(article => {

        console.log(article);


        const threshold = 100;
        const base_right = -62;

        let initialX, initialY
        let currentX, currentY
        let movedX, movedY


        function createDeleteIcon() {
            const span = document.createElement("span");
            span.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
            `;
            span.style.position = "absolute";
            span.style.top = "50%";
            span.style.right = "50px";
            span.style.transform = "translateY(-50%)";
            span.className = "article__delete";
            return span;
        }

        article.addEventListener("pointerdown", down)
        article.addEventListener("pointermove", move)
        article.addEventListener("pointerup", up)

        document.querySelectorAll(".article__card").forEach(card => {
            card.classList.add("delete");
        })

        function down(e) {

            initialX = e.clientX;
            initialY = e.clientY
            e.target.closest(".article__content").classList.remove("animate")
        }



        // function move(e) {
        //     currentX = e.clientX;
        //     currentY = e.clientY;
        //     movedX = currentX - initialX;
        //     movedY = currentY - initialY;

        //     const card = e.target.closest(".article__card");
        //     const content = e.target.closest(".article__content");
        //     const parentArticle = card.closest(".articles"); // Parent element for vertical scrolling
        //     let iconElement = card.querySelector(".article__delete");

        //     // Determine if the swipe is primarily horizontal
        //     const isHorizontalSwipe = Math.abs(movedX) > Math.abs(movedY);

        //     // Allow vertical scrolling on the parent element
        //     if (!isHorizontalSwipe) {
        //         // Apply damping to the vertical scroll
        //         const dampingFactor = 0.08; // Adjust this value to control the smoothness (lower = smoother)
        //         parentArticle.scrollTop -= movedY * dampingFactor; // Delegate vertical scrolling to the parent
        //         return; // Exit early to allow vertical scrolling
        //     }

        //     // Prevent default behavior for horizontal swipes
        //     e.preventDefault();

        //     if (movedX < 0) {
        //         content.style.left = movedX + "px";
        //     }

        //     if (movedX < 0 && !iconElement) {
        //         iconElement = createDeleteIcon();
        //         card.append(iconElement);
        //         iconElement.classList.add("delete");
        //     }

        //     if (iconElement) {
        //         const svg = iconElement.querySelector("svg");

        //         if (movedX < -threshold) {
        //             svg.style.fill = "currentColor";
        //         } else {
        //             svg.style.fill = "none";
        //         }

        //         const pullIn = Math.min(-movedX, threshold);
        //         const locked = pullIn >= threshold;
        //         const offset = locked ? threshold : pullIn;

        //         iconElement.style.right = base_right + offset + "px";
        //     }

        //     if (movedX >= 0 && iconElement) {
        //         iconElement.remove();
        //     }
        // }

        function move(e) {
            currentX = e.clientX;
            currentY = e.clientY;
            movedX = currentX - initialX;
            movedY = currentY - initialY;
            

            const card = e.target.closest(".article__card");
            const content = e.target.closest(".article__content");
            let iconElement = card.querySelector(".article__delete");

            // Prevent default behavior for all swipes
            e.preventDefault();

            if (movedX < 0) {
                content.style.left = movedX + "px";
            }

            if (movedX < 0 && !iconElement) {
                iconElement = createDeleteIcon();
                card.append(iconElement);
                iconElement.classList.add("delete");
            }

            if (iconElement) {
                const svg = iconElement.querySelector("svg");

                if (movedX < -threshold) {
                    svg.style.fill = "currentColor";
                } else {
                    svg.style.fill = "none";
                }

                const pullIn = Math.min(-movedX, threshold);
                const locked = pullIn >= threshold;
                const offset = locked ? threshold : pullIn;

                iconElement.style.right = base_right + offset + "px";
            }

            if (movedX >= 0 && iconElement) {
                iconElement.remove();
            }
        }

        function up(e) {

            const card = e.target.closest(".article__card");
            const content = e.target.closest(".article__content");
            const iconElement = card.querySelector(".article__delete");

           

                if (Math.abs(movedX) <= threshold) {
                    content.classList.add("animate");
                    content.style.left = "0px";
                };

                if (iconElement) {
                    iconElement.style.transition = "right .7s ease-in-out";
                    iconElement.style.right = base_right + "px";
                };
            

            if (movedX < -threshold) {

                if (card.contains(iconElement)) {
                    iconElement.remove();
                    iconElement.style.transition = "unset";
                };

                content.style.transition = "transform .6s ease-in-out";
                content.style.transform = "translateX(-100%)";

                content.addEventListener("transitionend", () => {

                    const startHeight = card.offsetHeight + "px";
                    card.style.height = startHeight;
                    card.style.overflow = "hidden";

                    // 2) Force reflow so the start height is applied immediately
                    void card.offsetHeight;

                    // 3) Next frame: add the transition and collapse
                    requestAnimationFrame(() => {

                        card.addEventListener('transitionend', (e) => {

                            if (e.target === card && e.propertyName === "height") {
                                console.log("transitionend on card:", e.propertyName);
                                card.remove();
                            }

                            // … inside your card.transitionend handler, after card.remove():
                            const wrapper = article.parentElement;
                            const remaining = wrapper.querySelectorAll(".article__card").length;
                            if (remaining === 0) {
                                // 1) lock current height & overflow
                                const h = wrapper.offsetHeight + "px";
                                wrapper.style.height = h;
                                wrapper.style.overflow = "hidden";
                                void wrapper.offsetHeight; // force reflow

                                // 2) set up the swipe transition *before* you trigger it
                                wrapper.style.transition = "transform .3s ease-in-out";
                                // now actually swipe
                                requestAnimationFrame(() => {
                                    wrapper.style.transform = "translateX(-100%)";
                                });

                                // 3) when that transform ends, collapse height
                                wrapper.addEventListener("transitionend", function onSwipe(e) {
                                    if (e.propertyName !== "transform") return;
                                    wrapper.removeEventListener("transitionend", onSwipe);

                                    // now collapse height
                                    wrapper.style.transition = "height .3s ease-in-out";
                                    wrapper.style.height = "0px";

                                    wrapper.addEventListener("transitionend", () => {
                                        wrapper.remove();
                                    }, { once: true });
                                }, { once: false });
                            }



                        }, { once: true })

                        card.style.transition = "height 0.3s ease-in-out";
                        card.style.height = "0";
                        console.log("––> triggered collapse:", card.style.transition, card.style.height);
                    });

                    const articleData = card.dataset.article;
                    const parsed = JSON.parse(articleData);
                    const saved = readFromLocalStorage("savedArticles") || [];

                    const updated = saved.filter(article => article.uri !== parsed.uri);
                    saveTolocalStorage("savedArticles", updated);


                }, { once: true });
            };

            setTimeout(() => {
                if (card.contains(iconElement)) {
                    iconElement.remove();
                    iconElement.style.transition = "unset";
                };
            }, 700);

            initialX = null;
            initialY = null;
            movedX = null;
            movedY = null;

        };

    });
};
