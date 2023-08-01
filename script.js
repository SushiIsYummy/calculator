let displayValue = 0;
// let total = 0;

let number1 = 0;
let operator = "";
let number2 = 0;

const FIRST_NUMBER = "firstNumber";
const SECOND_NUMBER = "secondNumber";
const BUTTON_NUMBER = "number";
const BUTTON_OPERATOR = "operator";
const BUTTON_EQUAL = "equal";

let lastValidButtonPress = "";
let number1Exists = false;
let number2Exists = false;
// let calculatedOnePair = false;
// let mostRecentNonNumber = "";

const displayContent = document.querySelector('#display-content');
changeDisplayContent(displayValue);

function numberClick(input) {
    if (lastValidButtonPress === BUTTON_EQUAL) {
        lastValidButtonPress = BUTTON_NUMBER;
        clearDisplay();
        number1 = parseInt(input);
        displayValue = number1;
        changeDisplayContent(displayValue);
        return;
    }

    if (!number1Exists) {
        lastValidButtonPress = BUTTON_NUMBER;
        if (displayValue === 0) {
            displayValue = parseInt(input);
            changeDisplayContent(displayValue);
        } else {
            displayValue = displayValue*10 + parseInt(input);
            changeDisplayContent(displayValue);
        }
        return;
    } else if (number1Exists) {
        lastValidButtonPress = BUTTON_NUMBER;
        if (!number2Exists) {
            displayValue = parseInt(input);
            changeDisplayContent(displayValue);
            number2Exists = true;
        } else if (displayValue === 0) {
            displayValue = parseInt(input);
            changeDisplayContent(displayValue);
        } else if (displayValue < 0 || displayValue > 0) {
            displayValue = displayValue*10 + parseInt(input);
            changeDisplayContent(displayValue);
        }
        number2 = displayValue;
        return;
    } 
}

function operatorClick(input) {
    // repeated operator clicks replaces the operator
    if ((lastValidButtonPress === BUTTON_OPERATOR || lastValidButtonPress === BUTTON_EQUAL)
        && !number2Exists) {
        lastValidButtonPress = BUTTON_OPERATOR;
        operator = input;
        return;
    }

    if (operator === "") {
        lastValidButtonPress = BUTTON_OPERATOR;
        number1 = displayValue;
        number1Exists = true;
        operator = input;
        return;
    } 

    if (operator !== "" && number2Exists) {
        number1 = operate(operator, number1, number2);
        operator = input;
        displayValue = number1;
        changeDisplayContent(displayValue);
        number2Exists = false;
        number2 = 0;
        lastValidButtonPress = BUTTON_OPERATOR;
        return;
    }
}

function equalClick() {
    if (number1Exists && number2Exists) {
        lastValidButtonPress = BUTTON_EQUAL;
        number1 = operate(operator, number1, number2);
        number2Exists = false;
        number2 = 0;
        displayValue = number1;
        changeDisplayContent(displayValue);
    }
}

function deleteDigit() {
    if (displayValue >= 10) {
        displayValue = Math.floor(displayValue/10);
    } else {
        displayValue = 0;
    }
    if (number1Exists) {
        number1 = displayValue;
    } else if (number2Exists) {
        number2 = displayValue;
    }
    changeDisplayContent(displayValue);
}

function clearDisplay() {
    displayValue = 0;
    // total = 0;
    number1 = 0;
    operator = "";
    number2 = 0;
    lastValidButtonPress = "";
    number1Exists = false;
    number2Exists = false;
    // calculatedOnePair = false;
    // mostRecentNonNumber = "";
    changeDisplayContent(displayValue);
}

function decimalClick() {
    // displayValue = parseFloat(displayValue.toFixed(1));
    // changeDisplayContent(displayValue);
}

function changeSign() {
    displayValue *= -1;
    if (number2Exists) {
        number2 = displayValue;
    } else {
        number1 = displayValue;
    }
    changeDisplayContent(displayValue);
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "%":
            return modulus(a, b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    // check for division by zero
    if (b === 0) {
        return "ERROR";
    }
    return a/b;
}

function modulus(a, b) {
    return a % b;
}

function changeDisplayContent(content) {
    displayContent.textContent = content;
}