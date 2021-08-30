function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let config = {
        '+': 1,
        '-': 1,
        '/': 2,
        '*': 2,
    }
    let outStack = []
    let arithmeticStack = []
    let actions = ['+', '-', '*', '/']
    let validExpression = ''


    function tokenizeAndValidate(expr) {
        let openBrackets = 0
        let closeBrackets = 0

        for (let i = 0; i < expr.length; i++) {
            let el = expr[i]
            if (el === ' ') continue
            else if (el === '(') {
                validExpression += el + ' '
                openBrackets++
            } else if (el === ')') {
                validExpression += ' ' + el
                closeBrackets++
            } else if (actions.includes(el)) {
                validExpression += ` ${el} `
            } else {
                validExpression += el
            }
        }

        if (openBrackets !== closeBrackets)  throw new SyntaxError('ExpressionError: Brackets must be paired')
        
    }

    function RPN(validExpression) {
        let expressionArray = validExpression.split(' ')

        for (let counter = 0; counter < expressionArray.length; counter++) {
            let curEl = expressionArray[counter];

            if (!actions.includes(curEl) && curEl !== ')' && curEl !== '(') {
                outStack.push(curEl)
            } else if (curEl === '(') {
                arithmeticStack.push(curEl)
            } else if (curEl === ')') {
                let i = arithmeticStack.length - 1
                while (arithmeticStack[arithmeticStack.length - 1] !== '(' && arithmeticStack.length) {
                    outStack.push(arithmeticStack.pop())
                }
                if (arithmeticStack[arithmeticStack.length - 1] === '(') {
                    arithmeticStack.pop()
                }
            } else if ((!arithmeticStack.length) || (config[curEl] > config[arithmeticStack[arithmeticStack.length - 1]]) || arithmeticStack[arithmeticStack.length - 1] === '(') {
                arithmeticStack.push(curEl)
            } else if (config[curEl] <= config[arithmeticStack[arithmeticStack.length - 1]]) {
                while (config[arithmeticStack[arithmeticStack.length - 1]] >= config[curEl] && arithmeticStack[arithmeticStack.length - 1] !== '(' && arithmeticStack.length) {
                    outStack.push(arithmeticStack.pop())

                }
                arithmeticStack.push(curEl)

            }
        }
        while (arithmeticStack.length >= 1) {
            outStack.push(arithmeticStack.pop())
        }
    }

    tokenizeAndValidate(expr)
    RPN(validExpression)
    return calc(outStack)

}

function calc(arr) {

    if (arr.length === 1) { return +arr[0] }
    for (let i = 0; i < arr.length; i++) {
        let firstNum
        let act
        let secondNum
        if (!isFinite(arr[i])) {
            [firstNum, secondNum, act] = [arr[i - 2], arr[i - 1], arr[i]]
            let insert = a(firstNum, secondNum, act)
            arr.splice(i - 2, 3, insert);
            return calc(arr)
        }

    }

    function a(firstNumber, secondNumber, action) {
        if (action === '+') {
            return String(+firstNumber + +secondNumber) 
        } else if (action === '-') {
            return String(+firstNumber - +secondNumber) 
        } else if (action === '*') {
            return String(+firstNumber * +secondNumber) 
        } else if (action === '/') {
            if (secondNumber === '0') throw new SyntaxError('TypeError: Division by zero.') 

            return String(+firstNumber / +secondNumber) 
            
        }

    }

}

module.exports = {
    expressionCalculator
}