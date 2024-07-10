const pojemnikNaWyniki = document.querySelector(".wyniki");
let wartosciInputs = document.querySelectorAll('input[type="number"]');
const przyciskDodaj = document.querySelector(".add");
const przyciskUsun = document.querySelector(".remove");

let iloscInputow = 3;
przyciskDodaj.addEventListener("click", () => {
  iloscInputow++;
  const newInput = document.createElement("input");
  newInput.type = "number";
  newInput.id = "val" + iloscInputow;
  newInput.placeholder = "wartość " + iloscInputow;

  const inputsContainer = document.querySelector(".inputs");
  inputsContainer.appendChild(newInput);
  obliczWyniki();
});

przyciskUsun.addEventListener("click", () => {
  if (iloscInputow > 1) {
    const lastInput = document.querySelector("#val" + iloscInputow);
    iloscInputow--;
    const inputsContainer = document.querySelector(".inputs");
    inputsContainer.removeChild(lastInput);
    obliczWyniki();
  }
});

function obliczWyniki() {
  wartosciInputs = document.querySelectorAll('input[type="number"]');

  let sum = 0;
  let min = Infinity;
  let max = -Infinity;

  wartosciInputs.forEach((input) => {
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
    <p>Max: ${max}</p>`;

  wartosciInputs.forEach((input) => {
    input.addEventListener("input", obliczWyniki);
  });
}

wartosciInputs.forEach((input) => {
  input.addEventListener("input", obliczWyniki);
});
