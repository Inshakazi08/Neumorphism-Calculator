const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons span');
const historyList = document.getElementById('historyList');
const historyPanel = document.getElementById('historyPanel');

let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      expression = '';
      display.textContent = '0';

    } else if (value === '=') {
      try {
        const result = eval(expression).toString();
        addToHistory(expression + ' = ' + result);
        expression = result;
        display.textContent = expression;
      } catch {
        display.textContent = 'Error';
        expression = '';
      }

    } else if (value === 'π') {
      expression += Math.PI.toFixed(8);
      display.textContent = expression;

    } else if (value === '√') {
      try {
        expression = Math.sqrt(eval(expression)).toString();
        display.textContent = expression;
      } catch {
        display.textContent = 'Error';
        expression = '';
      }

    } else if (value === 'x²') {
      try {
        expression = Math.pow(eval(expression), 2).toString();
        display.textContent = expression;
      } catch {
        display.textContent = 'Error';
        expression = '';
      }

    } else if (value === '%') {
      try {
        expression = (eval(expression) / 100).toString();
        display.textContent = expression;
      } catch {
        display.textContent = 'Error';
        expression = '';
      }

    } else if (value === '( )') {
      const openBrackets = (expression.match(/\(/g) || []).length;
      const closeBrackets = (expression.match(/\)/g) || []).length;

      if (openBrackets > closeBrackets) {
        expression += ')';
      } else {
        expression += '(';
      }
      display.textContent = expression;

    } else {
      expression += value;
      display.textContent = expression;
    }
  });
});

function deleteLast() {
  if (expression.length > 0) {
    expression = expression.slice(0, -1);
    display.textContent = expression || '0';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const toggleBtn = document.querySelector('.toggleBtn');
  toggleBtn.classList.add('animate');
  setTimeout(() => {
    toggleBtn.classList.remove('animate');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
  }, 300);
}

function toggleHistory() {
  historyPanel.style.display = historyPanel.style.display === 'block' ? 'none' : 'block';
}

function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li);
}