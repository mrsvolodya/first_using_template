'use strict';

class Calculator {
  constructor(previous, current) {
    this.previousOperand = previous;
    this.currentOperand = current;
    this.currentOper = '';
    this.previousOper = '';
    this.operation = '';
  }

  clear() {
    this.currentOper = '';
    this.previousOper = '';
    this.currentOperand.innerText = '';
    this.operation = '';
  }

  backspace() {
    this.currentOper = this.currentOper.slice(0, this.currentOper.length - 1);
  }

  appendNumber(number) {
    if ((number === '.' && this.currentOper.includes('.'))
    || (number === '.' && this.currentOper === '')
    || (number === '0' && this.currentOper === '0')
    || this.currentOper.length > 11) {
      return;
    }

    this.currentOper = this.currentOper.toString() + number.toString();
  }

  chooseOperation(op) {
    if (this.currentOper === '') {
      return;
    }

    if (this.currentOper !== '') {
      this.compute();
    }

    if (this.currentOperand.innerText !== '') {
      this.currentOper = this.currentOperand.innerText;
    }

    this.previousOper = this.currentOper;
    this.operation = op;
    this.currentOper = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOper);
    const current = parseFloat(this.currentOper);

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '÷':
        computation = prev / current;
        break;
      case '×':
        computation = prev * current;
        break;
      default:
        return;
    }

    computation = Math.round(computation * 100) / 100;

    const lengthOut = computation.toString().length;

    if (lengthOut < 14) {
      this.currentOperand.innerText = computation;
    } else {
      this.currentOperand.innerText = 'TooLong';
    }
  }

  updateDisplay() {
    this.previousOperand.innerText = this.currentOper;

    if (this.operation) {
      this.previousOperand.innerText
      = `${this.previousOper}
      ${this.operation} ${this.currentOper}`;
    }
  }
}

const calc = document.querySelector('.calculator');
const keyboard = document.querySelector('.keyboard');
const calcButtonNumbers = document.querySelector('.calculator_buttons-numbers');
const numberButton = document.querySelectorAll('.button--number');
const minMax = document.querySelector('.min-max');
const operationsButton = document.querySelectorAll('.button--operands');
const equalButton = document.querySelector('.button--equal');
const allClearButton = document.querySelector('.button--del');
const previousOperand = document.querySelector('.previous-operand');
const currentOperand = document.querySelector('.current-operand');
const closeButton = document.getElementById('close');
const maximizeButton = document.getElementById('maximize');
const minimizeButton = document.getElementById('minimize');
const buttonShow = document.querySelector('.button-calc');
const button = document.querySelector('.open_calculator');

const calculator = new Calculator(previousOperand, currentOperand);

numberButton.forEach(but => {
  but.addEventListener('click', () => {
    calculator.appendNumber(but.innerText);
    calculator.updateDisplay();
  });
});

operationsButton.forEach(but => {
  but.addEventListener('click', () => {
    calculator.chooseOperation(but.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

closeButton.addEventListener('click', () => {
  calc.classList.add('button-calc--hidden');
}
);

minimizeButton.addEventListener('click', () => {
  if (!calc.classList.contains('button-calc--hidden')) {
    calc.classList.add('button-calc--hidden');
    buttonShow.classList.remove('button-calc--hidden');
  }
});

button.addEventListener('click', () => {
  calc.classList.remove('button-calc--hidden');
  buttonShow.classList.add('button-calc--hidden');
});

maximizeButton.addEventListener('click', () => {
  if (minMax.classList.contains('.min-max')) {
    calc.style.width = '350px';
    calc.style.height = '450px';
    keyboard.style.gridTemplateColumns = '265px 61px 25px';
    calcButtonNumbers.style.height = '280px';
    minMax.classList.remove('.min-max');
  } else {
    calc.style.width = '250px';
    calc.style.height = '350px';
    keyboard.style.gridTemplateColumns = '165px 61px 25px';
    calcButtonNumbers.style.height = '180px';
    minMax.classList.add('.min-max');
  }
}
);

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '0':
      calculator.appendNumber(event.key);
      break;
    case '1':
      calculator.appendNumber(event.key);
      break;
    case '2':
      calculator.appendNumber(event.key);
      break;
    case '3':
      calculator.appendNumber(event.key);
      break;
    case '4':
      calculator.appendNumber(event.key);
      break;
    case '5':
      calculator.appendNumber(event.key);
      break;
    case '6':
      calculator.appendNumber(event.key);
      break;
    case '7':
      calculator.appendNumber(event.key);
      break;
    case '8':
      calculator.appendNumber(event.key);
      break;
    case '9':
      calculator.appendNumber(event.key);
      break;
    case '.':
      calculator.appendNumber(event.key);
      break;
    case '+':
      calculator.chooseOperation(event.key);
      break;
    case '-':
      calculator.chooseOperation(event.key);
      break;
    case '*':
      calculator.chooseOperation('×');
      break;
    case '/':
      calculator.chooseOperation('÷');
      break;
    case 'Enter':
      calculator.compute();
      break;
    case 'Delete':
      calculator.clear();
      break;
    case 'Backspace':
      calculator.backspace();
      break;
    default:
      break;
  }
  calculator.updateDisplay();
});
