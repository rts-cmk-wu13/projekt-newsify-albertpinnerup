let carousel = document.querySelector(".carousel")
let testimonials = carousel.querySelectorAll(".testimonial")
let slidePosition = 0

// **buttons***
let previus = carousel.querySelector(".carousel__previous")
let next = carousel.querySelector(".carousel__next")
// **dots**
let dots = carousel.querySelector(".carousel__dots")

// changer 

let cahnger

/**>>>>>>>>>> Changer VI <<<<<<<<**/
function changeAutomatic(){
    cahnger = setInterval(function(){
        NextSlide ()
    }, 4500);
}

carousel.addEventListener("mouseenter", function (){
    clearInterval(cahnger);
})

carousel.addEventListener("mouseleave", function(){
    changeAutomatic()
})
/**>>>>>>>>>>Click button V <<<<<<<<**/
function changeByDot(event){
    
    if(event.target != dots){ // because we dont want click in the div.dots we want to click in the single dot,  and dot != dots
        slidePosition = event.target.dataset.index
        showSilde (slidePosition)
    }
}

dots.addEventListener("click", function(event){
    changeByDot(event)
})
/**>>>>>>>>>>Give each slide a dot IV <<<<<<<<**/
testimonials.forEach(function(_, i){  
    dots.innerHTML += '<div class="carousel__dot" data-index="'+ i +'"></div>' // for each slide, give a data atribute whith the index of the slide
})

/**>>>>>>>>>>Previus button III <<<<<<<<**/
    function previusSlide (){
        slidePosition--
        if(slidePosition == -1){
            slidePosition = testimonials.length -1
        }
        showSilde (slidePosition)
    }
    previus.addEventListener("click", previusSlide)

/**>>>>>>>>>Next button II <<<<<<<<<<<<**/

    function NextSlide (){
        slidePosition++
        if(slidePosition == testimonials.length){
            slidePosition = 0
        }
        showSilde (slidePosition)
    }
    next.addEventListener("click", NextSlide)
        
/** >>>>>>>>>>>Show a single slide I <<<<<< **/
    function showSilde (index){

        let selectorDots = carousel.querySelectorAll(".carousel__dot")
        testimonials.forEach(function(testimonial, i){ // here we make to paralale node list that responde to each other // first is the element == slide ,  i == the place to take
            // testimonial.style.display = "none"
            testimonial.classList.remove("testimonial--active")
            selectorDots[i].classList.remove("carousel__dot--active") // this is my other node list
        })
        // testimonials[index].style.display = "flex"  
        testimonials[index].classList.add("testimonial--active")
        selectorDots[index].classList.add("carousel__dot--active")
    }

showSilde (slidePosition)
changeAutomatic()