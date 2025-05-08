import './_onboarding.scss';
import slide from './slide.js';
import onboarding1 from '/img/onboarding_1_dark.png';
import onboarding2 from '/img/onboarding_2_dark.png';
import onboarding3 from '/img/onboarding_3_dark.png';

export default function onboarding(onComplete) {


    let divElm = document.createElement("div")
    divElm.className = "onboarding"

    let carousel = document.createElement("div");
    carousel.className = "onboarding__carousel"

    let track = document.createElement("div");
    track.className = "carousel__track"


    track.append(
        slide(
            "Stay Connected, Everywhere, Anytime", 
            "Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.", 
            onboarding1,
            "carousel__card--1"
        ),
        slide(
            "Become a Savvy Global Citizen", 
            "Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!", 
            onboarding2,
            "carousel__card--2"
        ),
        slide(
            "Enhance your News Journey Now!", 
            "Be part of our dynamic community and contribute your insights and participate in enriching conversations.", 
            onboarding3,
            "carousel__card--3"
        )
    )

    carousel.appendChild(track)
    divElm.appendChild(carousel)


    let dots = document.createElement("div")
    dots.className = "dots"
    dots.innerHTML = ` 
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    `
    divElm.appendChild(dots)


    let buttons = document.createElement('div');
    buttons.className = 'buttons';
    buttons.innerHTML = `
      <a href="index.html" class="button button--skip">Skip</a>
      <button class="button button--cont">Continue</button>
    `;
    divElm.appendChild(buttons);
    

    const button = buttons.querySelector("button")
    let index = 0; 

    const updateDots = () => {
        const allDots = dots.querySelectorAll('.dot');
        allDots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    updateDots()

    dots.addEventListener('click', (e) => {
        const clickedDot = e.target;

        if (clickedDot.classList.contains('dot')) {
            index = Array.from(dots.children).indexOf(clickedDot);
            track.style.transform = `translateX(-${index * 100}%)`;
            updateDots();  // Update the dots
        }
    });


    button.addEventListener('click', () => {
        
        index++;

        if ( index >= 3 ) {

            onComplete()

        } else {
            
            track.style.transform = `translateX(-${index * 100}%)`;
            updateDots()

            const content = track.querySelector('.content');
            void content.offsetHeight; // Trigger reflow
        }
    });
    

    

    return divElm
}