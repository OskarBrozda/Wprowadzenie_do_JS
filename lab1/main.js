const pojemnikNaWyniki = document.querySelector('.wyniki')
const wartosciInputs = document.querySelectorAll('input[type="number"]');

function obliczWyniki() {
  let sum = 0;
  let min = Infinity;
  let max = -Infinity;

  wartosciInputs.forEach(input => {
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
      sum += value;
      if (value < min) min = value;
      if (value > max) max = value;
    }
  });

  const avg = sum / wartosciInputs.length;

  pojemnikNaWyniki.innerHTML = `
    <p>Suma: ${sum}</p>
    <p>Średnia: ${avg}</p>
    <p>Min: ${min}</p>
    <p>Max: ${max}</p>`
}

wartosciInputs.forEach(input => {
  input.addEventListener('input', obliczWyniki);
});