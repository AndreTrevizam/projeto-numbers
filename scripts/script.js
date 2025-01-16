const form = document.querySelector("form")
const firstInput = document.getElementById("how-many-numbers")
const secondInput = document.getElementById("start")
const thirdInput = document.getElementById("end")

// Captura os inputs e só aceita números
firstInput.oninput = () => {
  let value = firstInput.value.replace(/\D/g, "")
  firstInput.value = value
}

secondInput.oninput = () => {
  let value = secondInput.value.replace(/\D/g, "")
  secondInput.value = value
}

thirdInput.oninput = () => {
  let value = thirdInput.value.replace(/\D/g, "")
  thirdInput.value = value
}

