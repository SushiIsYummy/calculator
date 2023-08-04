let displayValue = 0;
let displayValueDecimal = "";
let upperDisplayValue = "";

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

const displayContent = document.querySelector('#display-content');
const upperDisplayContent = document.querySelector('#upper-display-content');
changeDisplayContent(displayValue);

function numberClick(input) {
    if (displayValue === "ERROR") {
        clearDisplay();
        displayContent.style.color = "black";
    }

    if (displayValueDecimal.includes(".") && (!number1Exists || number2Exists)) {
        displayValueDecimal = displayValueDecimal + input;
        displayValue = parseFloat(displayValueDecimal);
        changeDisplayContent(displayValue);
        return;
    }

    if (lastValidButtonPress === BUTTON_EQUAL) {
        changeUpperDisplayContent("");
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
        removeActiveOperator();
        if (!number2Exists) {
            if (displayValueDecimal != "") {
                displayValue = parseInt(input);
            } else {
                displayValue = parseFloat(input);
            }
            displayContent.style.color = "black";
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
    if (displayValue === "ERROR") {
        return;
    }

    // repeated operator clicks replaces the operator
    if ((lastValidButtonPress === BUTTON_OPERATOR || lastValidButtonPress === BUTTON_EQUAL)
        && !number2Exists) {
        lastValidButtonPress = BUTTON_OPERATOR;
        operator = input;
        displayValueDecimal = "";
        displayContent.style.color = "#C0C0C0";
        changeUpperDisplayContent(number1 + " " + operator);
        return;
    }

    if (operator === "") {
        lastValidButtonPress = BUTTON_OPERATOR;
        displayValueDecimal = "";
        number1 = displayValue;
        number1Exists = true;
        operator = input;
        changeUpperDisplayContent(number1 + " " + operator);
        displayContent.style.color = "#C0C0C0";
        return;
    } 

    if (operator !== "" && number2Exists) {
        number2 = displayValue;
        number1 = operate(operator, number1, number2);
        operator = input;
        displayValue = number1;
        if (number1 === "ERROR") {
            changeDisplayContent("ERROR");
            changeUpperDisplayContent("");
            removeActiveOperator();
            return;   
        }
        changeDisplayContent(displayValue);
        number2Exists = false;
        number2 = 0;
        displayValueDecimal = "";
        lastValidButtonPress = BUTTON_OPERATOR;
        displayContent.style.color = "#C0C0C0";
        changeUpperDisplayContent(number1 + " " + operator);
        return;
    }
}

function equalClick() {
    if (number1Exists && number2Exists) {
        removeActiveOperator();
        lastValidButtonPress = BUTTON_EQUAL;
        number2 = displayValue;
        changeUpperDisplayContent(number1 + " " + operator + " " + number2 + " =");
        number1 = operate(operator, number1, number2);
        number2Exists = false;
        number2 = 0;
        displayValue = number1;
        changeDisplayContent(displayValue);
    }
}

function deleteDigit() {
    if (displayValue === "ERROR") {
        return;
    }
    if (lastValidButtonPress === "equal") {
        clearDisplay();
        return;
    }
    if (displayValueDecimal.includes(".")) {
        displayValueDecimal = displayValueDecimal.slice(0, displayValueDecimal.length-1);
        displayValue = parseFloat(displayValueDecimal);
        if (Number.isInteger(displayValue)) {
            changeDisplayContent(displayValueDecimal);
        } else {
            changeDisplayContent(displayValue);
        }
        return;
    }
    if (displayValue >= 10) {
        displayValue = Math.floor(displayValue/10);
        changeDisplayContent(displayValue);
        return;
    } else {
        displayValue = 0;
        changeDisplayContent(displayValue);
        return;
    }

    // if (number1Exists) {
    //     number1 = displayValue;
    // } else if (number2Exists) {
    //     number2 = displayValue;
    // }
    // changeDisplayContent(displayValue);
}

function clearDisplay() {
    displayValue = 0;
    upperDisplayValue = "";
    number1 = 0;
    operator = "";
    number2 = 0;
    lastValidButtonPress = "";
    number1Exists = false;
    number2Exists = false;
    displayValueDecimal = "";
    displayContent.style.color = "black";
    removeActiveOperator();
    changeDisplayContent(displayValue);
    changeUpperDisplayContent("");
}

function decimalClick() {
    if (displayValue === "ERROR") {
        return;
    }
    if (lastValidButtonPress === "operator") {
        return;
    }
    if (displayValueDecimal.includes(".")) {
        return;
    }
    displayValueDecimal = displayValue + ".";
    changeDisplayContent(displayValueDecimal);
}

function changeSign() {
    if (displayValue === "ERROR") {
        return;
    }
    if (lastValidButtonPress === "operator") {
        return;
    }
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
    let numberOfDecimalsA = a.countDecimals();
    let numberOfDecimalsB = b.countDecimals();
    return parseFloat((a*b).toFixed(numberOfDecimalsA + numberOfDecimalsB));
}

function divide(a, b) {
    // check for division by zero
    if (b === 0) {
        return "ERROR";
    }
    return a / b;
}

function modulus(a, b) {
    return a % b;
}

function changeDisplayContent(content) {
    displayContent.textContent = content;
}

function changeUpperDisplayContent(content) {
    upperDisplayContent.textContent = content;
}

// code used from 
// https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
// count number of decimals in a number
Number.prototype.countDecimals = function () {

    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;

    var str = this.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}

let operatorButtons = document.querySelectorAll('.operator');

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', setActiveOperator);
}

function setActiveOperator(e) {
    if (displayValue != "ERROR") {
        for (let i = 0; i < operatorButtons.length; i++) {
            operatorButtons[i].classList.remove('active');    
        }
        e.target.classList.add('active');
    }
}

function removeActiveOperator() {
    for (let i = 0; i < operatorButtons.length; i++) {
        operatorButtons[i].classList.remove('active');    
    }
}