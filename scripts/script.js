const form = document.querySelector("form")
const numberQuantity = document.getElementById("how-many-numbers")
const secondInput = document.getElementById("start")
const thirdInput = document.getElementById("end")
const switcher = document.getElementById("checkbox")
const drawerOptions = document.querySelector(".drawer-options")

const randomNumbersSet = new Set()
const randomNumbers = []

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
      

      while (randomNumbersSet.size < quantity) {
        const num = generateRandomNumbers(min, max)
        randomNumbersSet.add(num)
      }
      console.log(randomNumbersSet)

    } else {

      for (let i = 0; i < quantity; i++) {
        randomNumbers.push(generateRandomNumbers(min, max));
      }
      
      console.log(randomNumbers)
    }
    
    // Assim que os numeros são gerados, esconde a div drawer-options
    removeDrawerOptions()

  } catch (error) {
    console.log(error)
    alert("Houve um erro. Tente novamente mais tarde.")
  }
}

function removeDrawerOptions() {
  drawerOptions.style.display = 'none'
}

function showResult() {
  // Seleciono a div que o resultado irá aparecer
  const drawerContainer = document.getElementById("drawer-container")

  try {
    // crio a div draw-result
    const resultsDiv = document.createElement("div")
    resultsDiv.classList.add("draw-result")

    // crio a div title
    const divTitle = document.createElement("div")
    divTitle.classList.add("title")

    // crio o elemento h3 para coloca-lo dentro da div title
    const heading = document.createElement("h3")
    heading.textContent = "Resultado do sorteio"

    // crio o elemento span
    const resultSpan = document.createElement("span")
    resultSpan.textContent = `1º resultado`

    // crio a div numbers
    const numbersDiv = document.createElement("div")
    numbersDiv.classList.add("numbers")

    if (switcher.checked) {
      // Caso use o conjunto de números
      randomNumbersSet.forEach((num) => {
        const numDiv = document.createElement("div"); // Cria uma nova div para cada número
        numDiv.classList.add("number"); // Adiciona a classe 'number'
        numDiv.textContent = num; // Define o número como conteúdo da div
        numbersDiv.appendChild(numDiv); // Adiciona a div ao container
      });
    } else {
      // Caso use o vetor de números
      randomNumbers.forEach((num) => {
        const numDiv = document.createElement("div"); // Cria uma nova div para cada número
        numDiv.classList.add("number"); // Adiciona a classe 'number'
        numDiv.textContent = num; // Define o número como conteúdo da div
        numbersDiv.appendChild(numDiv); // Adiciona a div ao container
      });
    }
    

    // coloca os elementos na divTitle
    divTitle.append(heading, resultSpan)

    // coloco a div dentro da div principal
    resultsDiv.append(divTitle, numbersDiv)

    // mostro o elemento na tela
    document.body.appendChild(resultsDiv)

    // Insere o "drawerContainer" no local específico (após o comentário)
    const drawerOptions = document.querySelector('.drawer-options');
    drawerContainer.insertBefore(resultsDiv, drawerOptions.nextSibling);

  } catch (error) {
    console.log(error)
    alert("Houve um erro. Tente novamente mais tarde.")
  }
}

// Captura o clique do botão submit
form.onsubmit = (event) => {
  event.preventDefault()

  getNumbers(numberQuantity, secondInput, thirdInput)
  showResult()
}
