import './_articles.scss'

export default function sectionWrapper(sectionTitle) {
    const wrapper = document.createElement("div");
    wrapper.className = "article";

    const closed = document.createElement("div");
    closed.className = "closed";
    closed.innerHTML = `
        <div class="article__logo">
            <img src="src/img/newsify_logo_1.svg" alt="">
        </div>
        <h3 class="article__category">${sectionTitle.toUpperCase()}</h3>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
        class="article__chevron">
<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `;

    const open = document.createElement("div");
    open.className = "open";

    wrapper.appendChild(closed);
    wrapper.appendChild(open);

    closed.addEventListener("click", () => {
        wrapper.classList.toggle("expanded");
    });

    return { wrapper, openContainer: open };
}
