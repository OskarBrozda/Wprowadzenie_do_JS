const slides = document.querySelector('.slides')
const dotsForSlideNr = document.querySelector('.dotsForSlideNr')
const photoArray = document.querySelectorAll('.slides img')
const stopBtn = document.querySelector('.stopBtn')

// dodanie okrągłych buttonów
for (let i = 0; i < photoArray.length; i++) {
    const newBtn = document.createElement('button')
    newBtn.id = 'btn' + (i+1)
    newBtn.className = 'btns'
    dotsForSlideNr.appendChild(newBtn)
}

//pobranie referencji do nowo utworzonych elementów
const buttonArray = document.querySelectorAll('.btns')

let slideIndex = 0
let intervalId = null

//inicjalizacja slidera
document.addEventListener("DOMContentLoaded", initializeSlider)

buttonArray.forEach((button, index) => {
	button.addEventListener('click', () => {
        pause()
        showSlide(index)
        slideIndex = index
	})
})


stopBtn.addEventListener('click', pause)

function initializeSlider(){
    photoArray[slideIndex].classList.add("active")
    buttonArray[slideIndex].classList.add("changeColorOfButton")
    start()
}

function showSlide(index){
    if(index>=photoArray.length){
        slideIndex=0
    }
    else if(index<0){
        slideIndex = photoArray.length-1
    }

    photoArray.forEach(slide => {
        slide.classList.remove("active")
    })
    buttonArray.forEach(slide => {
        slide.classList.remove("changeColorOfButton")
    })

    photoArray[slideIndex].classList.add("active")
    buttonArray[slideIndex].classList.add("changeColorOfButton")
}

function previousSlide(){
    start(20000)
    slideIndex--
    showSlide(slideIndex)
}

function nextSlide(){
    start()
    slideIndex++
    showSlide(slideIndex)
}

function pause(){
    clearInterval(intervalId)
}

function start(time = 2000){
    pause()
    intervalId = setInterval(nextSlide, time)  
}

const lightbox = document.querySelector('.lightbox')
photoArray.forEach(photo => {
    photo.addEventListener('click', () => {
        pause()
        openLightbox(photo.src)
    })
})

function openLightbox(imageSrc) {
    lightbox.style.display = 'block'
    lightbox.style.backgroundImage = `url(${imageSrc})`
    lightbox.style.backgroundSize = 'cover'
    lightbox.style.backgroundPosition = 'center'
    
    document.addEventListener('keydown', closeOnEscape)
}

function closeOnEscape(event) {
    if (event.key === 'Escape') {
        closeLightbox()
        start()
    }
}

function closeLightbox() {
    lightbox.style.display = 'none'
    document.removeEventListener('keydown', closeOnEscape)
}
