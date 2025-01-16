const form = document.querySelector("form")
const numberQuantity = document.getElementById("how-many-numbers")
const secondInput = document.getElementById("start")
const thirdInput = document.getElementById("end")
const switcher = document.getElementById("checkbox")


// Captura os inputs e só aceita números
numberQuantity.oninput = () => {
  let value = numberQuantity.value.replace(/\D/g, "")
  numberQuantity.value = value
}

secondInput.oninput = () => {
  let value = secondInput.value.replace(/\D/g, "")
  secondInput.value = value
}

thirdInput.oninput = () => {
  let value = thirdInput.value.replace(/\D/g, "")
  thirdInput.value = value
}

// Captura se o botão de switch está marcado
switcher.addEventListener('click', () => {})

// Função para gerar os numeros aleatorios
function generateRandomNumbers(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNumbers(numberQuantity, secondInput, thirdInput) {
  const minInput = secondInput.value
  const maxInput = thirdInput.value
  const numberQuantityInput = numberQuantity.value
  
  // Passa os inputs de string para int
  const min = parseInt(minInput, 10)
  const max = parseInt(maxInput, 10)
  const quantity = parseInt(numberQuantityInput, 10)

  if (isNaN(min) || isNaN(max) || isNaN(quantity) || quantity <= 0) {
    alert("Por favor, insira valores válidos!")
    return
  }

  if (min > max) {
    alert("O valor mínimo não pode ser maior que o valor máximo!");
    return; // Encerra a execução da função se min for maior que max
  }

  try {
    if (switcher.checked) {
      const randomNumbersSet = new Set()

      while (randomNumbersSet.size < quantity) {
        const num = generateRandomNumbers(min, max)
        randomNumbersSet.add(num)
      }
      console.log(randomNumbersSet)
    } else {
      const randomNumbers = []
      for (let i = 0; i < quantity; i++) {
        randomNumbers.push(generateRandomNumbers(min, max));
      }
      console.log(randomNumbers)
    }
    

  } catch (error) {
    console.log(error)
    alert("Houve um erro. Tente novamente mais tarde.")
  }
}

// Captura o clique do botão submit
form.onsubmit = (event) => {
  event.preventDefault()

  getNumbers(numberQuantity, secondInput, thirdInput)
}
