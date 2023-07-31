let displayValue = 0;
let total = 0;

let number1 = 0;
let operator = "";
let number2 = 0;

let lastValidButtonPress = "";
let number1Exists = false;
let number2Exists = false;
let calculatedOnePair = false;
let mostRecentNonNumber = "";

const displayContent = document.querySelector('#display-content');
changeDisplayContent(displayValue);

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

function numberClick(input) {
    if (lastValidButtonPress === "equal") {
        lastValidButtonPress = "number";
        displayValue = displayValue*10 + parseInt(input);
        changeDisplayContent(displayValue);
        number1 = displayValue;
        return;
    }

    if (lastValidButtonPress === "operator") {
        lastValidButtonPress = "number";
        displayValue = parseInt(input);
        changeDisplayContent(displayValue);
        number2 = displayValue;
        number2Exists = true;
        return;
    }

    if (displayValue === 0) {
        lastValidButtonPress = "number";
        displayValue = parseInt(input);
    } else {
        lastValidButtonPress = "number";
        displayValue = displayValue*10 + parseInt(input);
    }
    changeDisplayContent(displayValue);
}

function operatorClick(input) {
    if (lastValidButtonPress === "number" && input != "=") {
        if (number2Exists) {
            displayValue = operate(operator, number1, number2);
            changeDisplayContent(displayValue);
            number1 = displayValue;
            number2Exists = false;
            number2 = 0;
            calculatedOnePair = true;
            lastValidButtonPress = "operator";
            mostRecentNonNumber = input;
            operator = input;
            return;
        }
    }

    // sequential operator button clicks replace the operator
    if (operator !== "" && lastValidButtonPress === "operator") {
        operator = input;
        lastValidButtonPress = "operator";
        mostRecentNonNumber = input;
        return;
    }

    if (operator === "") {
        if (mostRecentNonNumber === "=") {
            operator = input;
            lastValidButtonPress = "operator";
            mostRecentNonNumber = input;

            return;
        }
        if (calculatedOnePair) {
            lastValidButtonPress = "operator";
            mostRecentNonNumber = input;
            number2 = parseInt(displayContent.textContent);
            return;
        } else {
            lastValidButtonPress = "operator";
            mostRecentNonNumber = input;
            number1 = displayValue;
            operator = input;
            return;
        }
    }

    if (input === "=") {
        if (number2Exists) {
            number2 = parseInt(displayContent.textContent);
            total = operate(operator, number1, number2);
            // console.log('total: ' + total);
            displayValue = total;
            changeDisplayContent(total);
            number1 = total;
            number2Exists = false;
            number2 = 0;
            operator = "";
            calculatedOnePair = true;
            lastValidButtonPress = "equal";
            mostRecentNonNumber = input;
            return;
        } else if (operator === "" && !number2Exists) {
            return;
        }
    }

    if (lastValidButtonPress === "operator" && input !== "=") {
        operator = input;
        return;
    }


    if (operator !== "" && number2Exists) {
        displayValue = total;
        number2Exists = false;
        number1 = total;
        number2 = 0;
        return;
    }
    
}

function deleteDigit() {
    if (displayValue >= 10) {
        displayValue = Math.floor(displayValue/10);
    } else {
        displayValue = 0;
    }
    number1 = displayValue;
    changeDisplayContent(displayValue);
}

function clearDisplay() {
    displayValue = 0;
    total = 0;
    number1 = 0;
    operator = "";
    number2 = 0;
    lastValidButtonPress = "";
    number1Exists = false;
    number2Exists = false;
    calculatedOnePair = false;
    mostRecentNonNumber = "";
    changeDisplayContent(displayValue);
}

function decimalClick() {
    displayValue = parseFloat(displayValue.toFixed(1));
    changeDisplayContent(displayValue);
}

function changeSign() {
    displayValue *= -1;
    number1 = displayValue;
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

function changeDisplayContent(content) {
    displayContent.textContent = content;
}