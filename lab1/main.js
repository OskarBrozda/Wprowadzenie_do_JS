const input1 = document.querySelector('#val1')
console.dir(input1)
console.log(input1.value)


//pobierz div-a
const v1 = document.querySelector('#val1').value
const v2 = document.querySelector('#val2').value
const v3 = document.querySelector('#val3').value
const v4 = document.querySelector('#val4').value
const pojemnikNaWyniki = document.querySelector('.wyniki')


//reagowanie na klikniecie
const przeliczBtn = document.querySelector('#przelicz')
przeliczBtn.addEventListener('click', ()=>
{
    const min = Math.min(v1, v2, v3, v4)
    const max = Math.max(v1, v2, v3, v4)
    const avg = Math.min(v1, v2, v3, v4)/4
    const sum = Number(v1) + Number(v2) + Number(v3) + Number(v4)
    pojemnikNaWyniki.textContent='Suma = ' + sum + ', Średnia = ' + avg + ', Min = ' + min + ', Max = ' + max
})