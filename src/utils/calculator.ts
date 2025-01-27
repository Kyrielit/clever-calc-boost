export const calculateMathExpression = (expression: string): number => {
  // Replace × with * and ÷ with / for calculation
  const sanitizedExpression = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/');
  
  // Split the expression into parts
  const parts = sanitizedExpression.split(' ');
  if (parts.length !== 3) {
    throw new Error('Invalid expression format');
  }

  const num1 = parseFloat(parts[0]);
  const operator = parts[1];
  const num2 = parseFloat(parts[2]);

  if (isNaN(num1) || isNaN(num2)) {
    throw new Error('Invalid numbers in expression');
  }

  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) throw new Error('Division by zero');
      return num1 / num2;
    default:
      throw new Error('Invalid operator');
  }
};
