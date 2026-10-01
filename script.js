let displayValue = "0";
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

const displayElement = document.getElementById('display');

function updateDisplay() {
    displayElement.innerText = displayValue;
}

function appendCharacter(char) {
    if (displayValue === "0" && char !== ".") {
        displayValue = char;
    } else {
        displayValue += char;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = "0";
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
}

function deleteLast() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = "0";
    }
    updateDisplay();
}

function calculateResult() {
    try {
        // Используем безопасный метод eval, но лучше избегать его в продакшене. Для демки сойдет.
        // В реальном проекте нужно писать парсер выражений.
        // Но для портфолио верстальщика — это нормально.
        let result = eval(displayValue.replace('÷', '/').replace('×', '*').replace('%', '/100'));
        
        if (result === undefined || result === null || isNaN(result)) {
           displayValue = "Error";
        } else {
            // Округляем до 8 знаков после запятой, чтобы избежать длинных хвостов
            result = parseFloat(result.toFixed(8));
            displayValue = String(result);
        }
        
        updateDisplay();
        firstOperand = parseFloat(displayValue);
        waitingForSecondOperand = true;
    } catch (e) {
        displayValue = "Error";
        updateDisplay();
    }
}