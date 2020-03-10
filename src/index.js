function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
  const exprArr = [];
  let curDigit = "";
  const priority = Object.freeze({
    "-": 0,
    "+": 0,
    "/": 1,
    "*": 1,
    "(": -1,
    ")": -1
  });

  for (let index = 0; index < expr.length; index++) {
    element = expr[index];
    if (element === " ") {
      continue;
    }
    if (priority.hasOwnProperty(element)) {
      if (curDigit !== "") {
        exprArr.push(parseInt(curDigit, 10));
      }
      exprArr.push(element);
      curDigit = "";
    } else {
      curDigit += element;
    }
  }
  if (curDigit !== "") {
    exprArr.push(parseInt(curDigit, 10));
  }

  let RPNexpr = [];
  const stack = [];
  for (const element of exprArr) {
    if (typeof element === "number") {
      RPNexpr.push(element);
      continue;
    }
    if (element === "(") {
      stack.push(element);
      continue;
    }
    if (element === ")") {
      while (stack[stack.length - 1] !== "(") {
        if (stack.length === 0) {
          throw new Error("ExpressionError: Brackets must be paired");
        }
        RPNexpr.push(stack.pop());
      }
      stack.pop();
      continue;
    }
    if (priority.hasOwnProperty(element)) {
      while (priority.hasOwnProperty(stack[stack.length - 1])) {
        if (priority[stack[stack.length - 1]] >= priority[element]) {
          RPNexpr.push(stack.pop());
        } else {
          break;
        }
      }
      stack.push(element);
    }
  }

  while (stack.length > 0) {
    RPNexpr.push(stack.pop());
  }

  stack.length = 0;
  for (const element of RPNexpr) {
    if (element === "(") {
      throw new Error("ExpressionError: Brackets must be paired");
    }
    if (typeof element === "number") {
      stack.push(element);
    }

    if (priority.hasOwnProperty(element)) {
      const rightOperand = stack.pop();
      const leftOperand = stack.pop();
      switch (element) {
        case "+":
          stack.push(leftOperand + rightOperand);
          break;
        case "-":
          stack.push(leftOperand - rightOperand);
          break;
        case "*":
          stack.push(leftOperand * rightOperand);
          break;
        case "/":
          if (rightOperand === 0) {
            throw new Error("TypeError: Division by zero.");
          }
          stack.push(leftOperand / rightOperand);
          break;
      }
    }
  }
  return stack.pop();
}

module.exports = {
  expressionCalculator
};
