export const calculateResult = (expression: string): string => {
  // Handle empty input
  if (!expression) return '';

  try {
    // Replace mathematical symbols with JavaScript operators
    const processedExpression = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    // Use the existing calculateMathExpression function for basic operations
    return calculateMathExpression(processedExpression).toString();
  } catch (error) {
    console.error('Calculation error:', error);
    return 'Error';
  }
};

export const calculateMathExpression = (expression: string): number => {
  // Split the expression into parts
  const parts = expression.split(' ').filter(part => part !== '');
  
  if (parts.length === 0) return 0;
  if (parts.length === 1) return parseFloat(parts[0]);

  // Basic operator evaluation
  let result = parseFloat(parts[0]);
  
  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const nextNumber = parseFloat(parts[i + 1]);

    if (isNaN(nextNumber)) {
      throw new Error('Invalid number in expression');
    }

    switch (operator) {
      case '+':
        result += nextNumber;
        break;
      case '-':
        result -= nextNumber;
        break;
      case '*':
        result *= nextNumber;
        break;
      case '/':
        if (nextNumber === 0) throw new Error('Division by zero');
        result /= nextNumber;
        break;
      default:
        throw new Error('Invalid operator');
    }
  }

  return result;
};