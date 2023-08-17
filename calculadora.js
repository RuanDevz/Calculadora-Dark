// Cria os elementos HTML da calculadora
var body = document.body;
var container = document.createElement("div");
container.className = "container";
var display = document.createElement("input");
display.className = "display";
display.type = "text";
display.readOnly = true;
var buttons = document.createElement("div");
buttons.className = "buttons";

// Cria os botões da calculadora
var buttonValues = [
  ["7", "8", "9", "+"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "*"],
  [".", "0", "=", "/"],
  ["C"]
];

// Adiciona os botões ao elemento buttons
for (var i = 0; i < buttonValues.length; i++) {
  var row = document.createElement("div");
  row.className = "row";
  for (var j = 0; j < buttonValues[i].length; j++) {
    var button = document.createElement("button");
    button.className = "button";
    button.innerHTML = buttonValues[i][j];
    row.appendChild(button);
  }
  buttons.appendChild(row);
}

// Adiciona os elementos ao container
container.appendChild(display);
container.appendChild(buttons);

// Adiciona o container ao body
body.appendChild(container);

// Define as variáveis para armazenar os valores da calculadora
var currentValue = "";
var previousValue = "";
var currentOperation = "";

// Define a função que atualiza o display da calculadora
function updateDisplay() {
  display.value = currentValue;
}

// Define a função que limpa a calculadora
function clearCalculator() {
  currentValue = "";
  previousValue = "";
  currentOperation = "";
  updateDisplay();
}

// Define a função que executa uma operação matemática
function performOperation() {
  // Converte os valores para números
  var num1 = parseFloat(previousValue);
  var num2 = parseFloat(currentValue);

  // Verifica qual operação foi selecionada e realiza o cálculo
  switch (currentOperation) {
    case "+":
      currentValue = num1 + num2;
      break;
    case "-":
      currentValue = num1 - num2;
      break;
    case "*":
      currentValue = num1 * num2;
      break;
    case "/":
      // Verifica se o divisor é zero e mostra uma mensagem de erro
      if (num2 === 0) {
        alert("Não é possível dividir por zero!");
        clearCalculator();
        return;
      }
      currentValue = num1 / num2;
      break;
    default:
      return;
  }

  // Converte o resultado para uma string e atualiza o display
  currentValue = currentValue.toString();
  updateDisplay();

  // Limpa os valores anteriores e a operação atual
  previousValue = "";
  currentOperation = "";
}

// Define a função que lida com o clique dos botões
function handleButtonClick(event)
  // Obtém o valor do botão clicado
  var buttonValue = event.target.innerHTML;

  // Verifica se o botão é um número ou um ponto
  if (!isNaN(buttonValue) || buttonValue === ".") {
    // Concatena o valor ao valor atual e atualiza o display
    currentValue += buttonValue;
    updateDisplay();
  }

  // Verifica se o botão é um operador matemático
  else if (buttonValue === "+" || buttonValue === "-" || buttonValue === "*" || buttonValue === "/") {
    // Verifica se já existe uma operação em andamento e executa ela antes de iniciar uma nova
    if (currentOperation !== "") {
      performOperation();
    }

    // Armazena o valor atual como valor anterior e define a operação atual
    previousValue = currentValue;
    currentOperation = buttonValue;

    // Limpa o valor atual e atualiza o display
    currentValue = "";
    updateDisplay();
  }

  // Verifica se o botão é o de igualdade
  else if (buttonValue === "=") {
    // Executa a operação atual se houver uma
    if (currentOperation !== "") {
      performOperation();
    }
  }

  // Verifica se o botão é o de limpar