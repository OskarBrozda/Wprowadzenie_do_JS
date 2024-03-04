//pobierz div-a
const pojemnikNaWyniki = document.querySelector('.wyniki')


//reagowanie na klikniecie
const przeliczBtn = document.querySelector('#przelicz')
przeliczBtn.addEventListener('click', ()=>
{
    const v1 = parseInt(document.querySelector('#val1').value)
    const v2 = parseInt(document.querySelector('#val2').value)
    const v3 = parseInt(document.querySelector('#val3').value)
    const v4 = parseInt(document.querySelector('#val4').value)

    const sum = v1 + v2 + v3 + v4
    const avg = sum/4
    const min = Math.min(v1, v2, v3, v4)
    const max = Math.max(v1, v2, v3, v4)
    pojemnikNaWyniki.innerHTML='Suma = ' + sum + '<br>Średnia = ' + avg + '<br>Min = ' + min + '<br>Max = ' + max
})