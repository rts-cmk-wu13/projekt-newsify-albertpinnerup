import './_footer.scss'

export default function footer() {

    let footerElm = document.createElement("footer")
    footerElm.className = "footer"

    footerElm.innerHTML = `
        <div class="footer__container">
            <nav class="footer__nav">
                <ul class="footer__menu">
                    <li>
                        <a href="">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                                <path d="M2 7.99998L11.732 3.13398C11.8152 3.09243 11.907 3.0708 12 3.0708C12.093 3.0708 12.1848 3.09243 12.268 3.13398L22 7.99998M20 11V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                                <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        Archive
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="" alt="">
                            Popular
                        </a>
                    </li>
                    <li><a href=""><img src="" alt="">Settings</a></li>
                </ul>
            </nav>
        </div>
    `

    return footerElm
}