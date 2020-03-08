function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
  //   expr = expr.replace(/\s/g, "");
  //   const exprArr = expr.split("");
  const exprArr = [];
  let curDigit = "";
  for (let index = 0; index < expr.length; index++) {
    element = expr[index];
    if (element === " ") {
      continue;
    }
    if (
      element === "+" ||
      element === "-" ||
      element === "*" ||
      element === "/"
    ) {
      exprArr.push(curDigit);
      exprArr.push(element);
      curDigit = "";
    } else {
      curDigit += element;
    }
  }
  exprArr.push(curDigit);

  const expressions = [];
  let ret = 0;
  while (true) {
    let openBracketIndex = exprArr.lastIndexOf(element => element === "(");
    let closeBracketIndex = exprArr.indexOf(element => element === ")");
    if (openBracketIndex === -1 || closeBracketIndex === -1) {
      break;
    }
    expressions.push(
      exprArr.splice(openBracketIndex, closeBracketIndex - openBracketIndex + 1)
    );
  }

  console.log("exprArr", exprArr);
  expressions.push(exprArr);
  console.log("expressions:", expressions);

  expressions.forEach(element => {
    evalOper(element, "*");
    evalOper(element, "/");
    evalOper(element, "+");
    evalOper(element, "-");
  });

  expressions.forEach(element => {
    ret += +element;
  });

  return ret;
}

function evalOper(exprArr, oper) {
  while (true) {
    let operIndex = exprArr.findIndex(element => element === oper);
    if (operIndex === -1) {
      return;
    }

    let leftOperand = exprArr[operIndex - 1];
    let rightOperand = exprArr[operIndex + 1];
    if (oper === "/" && rightOperand === "0") {
      throw new TypeError("TypeError: Division by zero.");
    }

    switch (oper) {
      case "*":
        exprArr.splice(operIndex - 1, 3, +leftOperand * +rightOperand);
        break;
      case "/":
        exprArr.splice(operIndex - 1, 3, +leftOperand / +rightOperand);
        break;
      case "+":
        exprArr.splice(operIndex - 1, 3, +leftOperand + +rightOperand);
        break;
      case "-":
        exprArr.splice(operIndex - 1, 3, +leftOperand - +rightOperand);
        break;
    }
  }
}

module.exports = {
  expressionCalculator
};
