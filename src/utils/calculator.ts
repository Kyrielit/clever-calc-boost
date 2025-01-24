export const calculateResult = (input: string): string => {
  try {
    // Replace mathematical constants
    input = input.replace(/π/g, Math.PI.toString())
                .replace(/e/g, Math.E.toString());

    // Handle special functions
    input = input.replace(/sin\((.*?)\)/g, (_, p1) => Math.sin(parseFloat(p1)).toString())
                .replace(/cos\((.*?)\)/g, (_, p1) => Math.cos(parseFloat(p1)).toString())
                .replace(/tan\((.*?)\)/g, (_, p1) => Math.tan(parseFloat(p1)).toString())
                .replace(/asin\((.*?)\)/g, (_, p1) => Math.asin(parseFloat(p1)).toString())
                .replace(/acos\((.*?)\)/g, (_, p1) => Math.acos(parseFloat(p1)).toString())
                .replace(/atan\((.*?)\)/g, (_, p1) => Math.atan(parseFloat(p1)).toString())
                .replace(/log\((.*?)\)/g, (_, p1) => Math.log10(parseFloat(p1)).toString())
                .replace(/ln\((.*?)\)/g, (_, p1) => Math.log(parseFloat(p1)).toString())
                .replace(/sqrt\((.*?)\)/g, (_, p1) => Math.sqrt(parseFloat(p1)).toString())
                .replace(/cbrt\((.*?)\)/g, (_, p1) => Math.cbrt(parseFloat(p1)).toString())
                .replace(/abs\((.*?)\)/g, (_, p1) => Math.abs(parseFloat(p1)).toString())
                .replace(/fact\((.*?)\)/g, (_, p1) => factorial(parseInt(p1)).toString());

    // Evaluate the expression
    return Function(`'use strict'; return (${input})`)();
  } catch (error) {
    throw new Error('Invalid calculation');
  }
};

const factorial = (n: number): number => {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};