const slides = document.querySelector('.slides')
const dotsForSlideNr = document.querySelector('.dotsForSlideNr')
const photoArray = document.querySelectorAll('.slides img')

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

function start(time = 5000){
    pause()
    intervalId = setInterval(nextSlide, time)  
}

buttonArray.forEach((button, index) => {
	button.addEventListener('click', () => {
        showSlide(index)
        pause()
        slideIndex = index
	});
});
