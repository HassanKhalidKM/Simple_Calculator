const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleInput(value);
  });
});

function handleInput(value) {
  if (value === 'clear') {
    currentInput = '';
  } else if (value === 'backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (value === '=') {
    currentInput = calculate(currentInput);
  } else {
    currentInput += value;
  }

  display.value = currentInput;
}

function calculate(expression) {
  try {
    // Only allow numbers, operators, and decimal points — basic safety check
    if (!/^[0-9+\-*/.]+$/.test(expression)) {
      return 'Error';
    }
    const result = Function('"use strict"; return (' + expression + ')')();
    return String(result);
  } catch (error) {
    return 'Error';
  }
}