const form = document.querySelector("form")
const numberQuantity = document.getElementById("how-many-numbers")
const secondInput = document.getElementById("start")
const thirdInput = document.getElementById("end")
const switcher = document.getElementById("checkbox")
const drawerOptions = document.querySelector(".drawer-options")

const randomNumbersSet = new Set()
const randomNumbers = []

// Contador para quantos sorteios acontecerem
let drawCount = 0

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
    throw new Error("Por favor, insira valores válidos!")
  }

  if (min > max) {
    throw new Error("O valor mínimo não pode ser maior que o valor máximo!")
  }

  randomNumbersSet.clear();
  randomNumbers.length = 0;

  try {
    if (switcher.checked) {
      while (randomNumbersSet.size < quantity) {
        const num = generateRandomNumbers(min, max)
        randomNumbersSet.add(num)
      }
    } else {
      for (let i = 0; i < quantity; i++) {
        randomNumbers.push(generateRandomNumbers(min, max));
      }
    }
    
    // Assim que os numeros são gerados, esconde a div drawer-options
    removeDrawerOptions()

  } catch (error) {
    throw new Error("Houve um erro. Tente novamente mais tarde.")
  }
}

function removeDrawerOptions() {
  drawerOptions.style.display = 'none'
}

function showDrawerOptions() {
  drawerOptions.style.display = 'block'
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
    drawCount++
    resultSpan.textContent = `${drawCount}º resultado`

    // crio a div numbers
    const numbersDiv = document.createElement("div")
    numbersDiv.classList.add("numbers")

    // se o switch esta ativo, itera sobre o set senão itera sobre a array
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

    // Criando a div do botão de replay
    const buttonDiv = document.createElement("div")
    buttonDiv.classList.add("btn")
    
    // Criando o botão
    const button = document.createElement("button")
    button.textContent = "Sortear novamente"
    button.id = "button"

    // Cria a imagem de replay
    const replayIcon = document.createElement("img")
    replayIcon.src = "../assets/icons/replay.svg"

    // Adiciona a imagem ao lado do texto do botão
    button.append(replayIcon)

    // Adiciona o botão na div
    buttonDiv.append(button)

    // coloca os elementos na divTitle
    divTitle.append(heading, resultSpan)

    // coloco a div dentro da div principal
    resultsDiv.append(divTitle, numbersDiv, buttonDiv)

    // mostro o elemento na tela
    document.body.appendChild(resultsDiv)

    // Insere o "drawerContainer" no local específico (após o comentário)
    const drawerOptions = document.querySelector('.drawer-options');
    drawerContainer.insertBefore(resultsDiv, drawerOptions.nextSibling);

    // Remover a div ao clicar em sortear novamente
    button.addEventListener("click", () => {
      document.querySelector(".draw-result").remove()
      showDrawerOptions()
    })

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
