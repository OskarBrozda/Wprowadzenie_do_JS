// option strzałka -       przesuwanie góra dół
// option shift strzałka - klonowanie linijki / linijek
// cmd d -                 znajdowanie najblizszego wystapienia zaznaczonego tekstu
// cmd shift l -           znajdowanie wszystkich wystapień zaznaczonego tekstu

const sounds = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4'),
    'g': document.querySelector('#s5'),
    'h': document.querySelector('#s6'),
    'j': document.querySelector('#s7'),
    'k': document.querySelector('#s8'),
    'l': document.querySelector('#s9'),
    ';': document.querySelector('#s10')
}
addEventListener('keypress',(ev)=>{
    const key = ev.key
    const sound = sounds[key]
    sound.currentTime = 0
    sound.play()
})