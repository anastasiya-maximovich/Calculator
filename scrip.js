const numbers = document.querySelectorAll('.number'),
      operations = document.querySelectorAll('.operation'),
      decimal = document.querySelector('#decimal'),
      clearAllBtn = document.querySelector('#clear'),
      clearCurrentBtn = document.querySelector('#clear-current'),
      deleteBtn = document.querySelector('#delete'),
      minus = document.querySelector('#add-min');
    
let previousOperandTE = document.querySelector('#previous-operand'),
    currentOperandTE = document.querySelector('#current-operand'),
    memoryOldNumber = 0,
    memoryCurrentNumber = 0,
    memoryNewNumber = true,
    minusClicked = false,
    memoryPendingOperation = '',
    memoryCurrentOperation = '';

const pressNumber = (number) => {
  if (memoryPendingOperation === '=') {
    previousOperandTE.innerText = '';
    memoryPendingOperation = '';
    currentOperandTE.innerText = number;
    memoryNewNumber = false;
  } else if (memoryNewNumber) {
    currentOperandTE.innerText = number;
    memoryNewNumber = false;
  } else {
    if (currentOperandTE.innerText === '0') {
      currentOperandTE.innerText = number;
    } else {
      currentOperandTE.innerText += number;
    }
  }
  console.log(memoryPendingOperation);
};

const operate = (oper) => {
  if (memoryNewNumber && memoryPendingOperation !== '=') {
    if (oper === '√') {
      currentOperandTE.innerText = Math.sqrt(+currentOperandTE.innerText).toFixed(10);
      previousOperandTE.innerText = '';
      memoryCurrentNumber = +currentOperandTE.innerText;
    } else if (memoryPendingOperation === 'X²') {
      currentOperandTE.innerText = ((+currentOperandTE.innerText) ** (+currentOperandTE.innerText));
      memoryCurrentNumber = +currentOperandTE.innerText;
      previousOperandTE.innerText = currentOperandTE.innerText + ' ' + oper;
      memoryPendingOperation = oper;
    } else if (memoryPendingOperation === '+') {
      currentOperandTE.innerText = (+currentOperandTE.innerText) + (+currentOperandTE.innerText);
      memoryCurrentNumber = +currentOperandTE.innerText;
      previousOperandTE.innerText = currentOperandTE.innerText + ' ' + oper;
      memoryPendingOperation = oper;
    } else if (memoryPendingOperation === '-') {
      currentOperandTE.innerText = (+currentOperandTE.innerText) - (+currentOperandTE.innerText);
      memoryCurrentNumber = +currentOperandTE.innerText;
      previousOperandTE.innerText = currentOperandTE.innerText + ' ' + oper;
      memoryPendingOperation = oper;
    } else if (memoryPendingOperation === '*') {
      currentOperandTE.innerText = (+currentOperandTE.innerText) * (+currentOperandTE.innerText);
      memoryCurrentNumber = +currentOperandTE.innerText;
      previousOperandTE.innerText = currentOperandTE.innerText + ' ' + oper;
      memoryPendingOperation = oper;
    } else if (memoryPendingOperation === '/') {
      currentOperandTE.innerText = (+currentOperandTE.innerText) / (+currentOperandTE.innerText);
      memoryCurrentNumber = +currentOperandTE.innerText;
      previousOperandTE.innerText = currentOperandTE.innerText + ' ' + oper;
      memoryPendingOperation = oper;
    } else {
      currentOperandTE.innerText = memoryCurrentNumber;
      memoryPendingOperation = oper;
      previousOperandTE.innerText = currentOperandTE.innerText + ' ' + oper;
    }
    if (memoryCurrentNumber.toString().indexOf('.') !== -1) {
      memoryCurrentNumber = +memoryCurrentNumber.toFixed(10);
      currentOperandTE.innerText = memoryCurrentNumber;
    }
  } else {
    memoryNewNumber = true;
    if (previousOperandTE.innerText === '') {
      if (oper === '√') {
        currentOperandTE.innerText = Math.sqrt(+currentOperandTE.innerText).toFixed(10);
        previousOperandTE.innerText = '';
        memoryCurrentNumber = +currentOperandTE.innerText;
      } else if (memoryPendingOperation === '=') {
        currentOperandTE.innerText = currentOperandTE.innerText;
        previousOperandTE.innerText = currentOperandTE.innerText + ' ' + oper;
      } else {
        previousOperandTE.innerText = currentOperandTE.innerText + ' ' + oper;
        memoryCurrentNumber = +currentOperandTE.innerText;
      }
    } else if (previousOperandTE.innerText === '0' + ' ' + oper && currentOperandTE.innerText === '0') {
      previousOperandTE.innerText = previousOperandTE.innerText;
      currentOperandTE.innerText = currentOperandTE.innerText;
    } else if (previousOperandTE.innerText !== '' || memoryCurrentNumber !== '') {
      if (oper === '√') {
        if (memoryPendingOperation === '+') {
          memoryCurrentNumber = memoryCurrentNumber + (+currentOperandTE.innerText);
        } else if (memoryPendingOperation === '-') {
          memoryCurrentNumber = memoryCurrentNumber - (+currentOperandTE.innerText);
        } else if (memoryPendingOperation === '*') {
          memoryCurrentNumber = memoryCurrentNumber * (+currentOperandTE.innerText);
        } else if (memoryPendingOperation === '/') {
          memoryCurrentNumber = memoryCurrentNumber / (+currentOperandTE.innerText);
        }
        currentOperandTE.innerText = Math.sqrt(memoryCurrentNumber).toFixed(10);
        memoryCurrentNumber = +currentOperandTE.innerText;
      } else {
        if (memoryPendingOperation === '+') {
          currentOperandTE.innerText = memoryCurrentNumber + (+currentOperandTE.innerText);
          memoryCurrentNumber = +currentOperandTE.innerText;
        } else if (memoryPendingOperation === '-') {
          currentOperandTE.innerText = memoryCurrentNumber - (+currentOperandTE.innerText);
          memoryCurrentNumber = +currentOperandTE.innerText;
        } else if (memoryPendingOperation === '*') {
          currentOperandTE.innerText = memoryCurrentNumber * (+currentOperandTE.innerText);
          memoryCurrentNumber = +currentOperandTE.innerText;
        } else if (memoryPendingOperation === '/') {
          currentOperandTE.innerText = memoryCurrentNumber / (+currentOperandTE.innerText);
          memoryCurrentNumber = +currentOperandTE.innerText;
        } else if (memoryPendingOperation === 'X²') {
          currentOperandTE.innerText = (memoryCurrentNumber ** (+currentOperandTE.innerText));
          memoryCurrentNumber = +currentOperandTE.innerText;
        } else {
          memoryCurrentNumber = +currentOperandTE.innerText;
        }
      }
    }
    currentOperandTE.innerText = memoryCurrentNumber;
    memoryPendingOperation = oper;
    if (memoryCurrentNumber.toString().indexOf('.') !== -1) {
      memoryCurrentNumber = +memoryCurrentNumber.toFixed(10);
      currentOperandTE.innerText = memoryCurrentNumber;
    }
    if (memoryPendingOperation === '=' || oper === '√') {
      previousOperandTE.innerText = '';
      currentOperandTE.innerText = memoryCurrentNumber;
    } else {
      previousOperandTE.innerText = memoryCurrentNumber + ' ' + oper;
    }
  }
};

const addDecimal = () => {
  let localDecimalMemory = currentOperandTE.innerText;
  if (memoryNewNumber) {
    localDecimalMemory = '0.';
    memoryNewNumber = false;
  } else {
      if (localDecimalMemory.indexOf('.') === -1) {
        localDecimalMemory += '.';
      }
  }
  currentOperandTE.innerText = localDecimalMemory;
};

for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', function (e) {
    pressNumber(e.target.innerText);
  });
}

for (let i = 0; i < operations.length; i++) {
  let operation = operations[i];
  operation.addEventListener('click', function (e) {
    operate(e.target.innerText);
  });
}

clearAllBtn.addEventListener('click', function() {
  previousOperandTE.innerText = '';
  currentOperandTE.innerText = '0';
  memoryCurrentNumber = 0;
  memoryPendingOperation = '';
  memoryNewNumber = false;
});

clearCurrentBtn.addEventListener('click', function() {
  currentOperandTE.innerText = '0';
});

deleteBtn.addEventListener('click', function() {
  if (currentOperandTE.innerText.length > 1) {
    currentOperandTE.innerText = currentOperandTE.innerText.slice(0, -1);
  } else {
    currentOperandTE.innerText = '0';
  }
});

decimal.addEventListener('click', function (e) {
  addDecimal(e.target.innerText);
});