const sliderArray = []
const slider = document.querySelector('.slider')
const images = document.querySelector('.images')
const buttonsNr = document.querySelector('.buttonsNr')
const buttonPrevious = document.querySelector('.previous')
const buttonNext = document.querySelector('.next')


for (let i = 0; i < 5; i++) {
    sliderArray.push('images/photo' + (i+1) + '.jpg')
    
    const newImg = document.createElement('img')
    newImg.src = sliderArray[i]
    images.appendChild(newImg)

    const newBtn = document.createElement('button')
    newBtn.id = 'btn' + (i+1)
    newBtn.innerText = '.'
    buttonsNr.appendChild(newBtn)
}


