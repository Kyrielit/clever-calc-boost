type TimeValue = {
  hours: number;
  minutes: number;
};

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

export function calculateResult(input: string): string {
  input = input.trim().toLowerCase();

  // Handle mathematical constants
  input = input.replace(/π/g, Math.PI.toString());
  input = input.replace(/pi/g, Math.PI.toString());
  input = input.replace(/e(?![^(]*\))/g, Math.E.toString()); // Replace 'e' but not in function calls

  // Handle scientific functions
  if (input.includes('sin(')) {
    const number = parseFloat(input.replace('sin(', '').replace(')', ''));
    return Math.sin(number * DEG_TO_RAD).toString();
  }
  if (input.includes('cos(')) {
    const number = parseFloat(input.replace('cos(', '').replace(')', ''));
    return Math.cos(number * DEG_TO_RAD).toString();
  }
  if (input.includes('tan(')) {
    const number = parseFloat(input.replace('tan(', '').replace(')', ''));
    return Math.tan(number * DEG_TO_RAD).toString();
  }
  if (input.includes('asin(')) {
    const number = parseFloat(input.replace('asin(', '').replace(')', ''));
    return (Math.asin(number) * RAD_TO_DEG).toString();
  }
  if (input.includes('acos(')) {
    const number = parseFloat(input.replace('acos(', '').replace(')', ''));
    return (Math.acos(number) * RAD_TO_DEG).toString();
  }
  if (input.includes('atan(')) {
    const number = parseFloat(input.replace('atan(', '').replace(')', ''));
    return (Math.atan(number) * RAD_TO_DEG).toString();
  }
  if (input.includes('log(')) {
    const number = parseFloat(input.replace('log(', '').replace(')', ''));
    return Math.log10(number).toString();
  }
  if (input.includes('ln(')) {
    const number = parseFloat(input.replace('ln(', '').replace(')', ''));
    return Math.log(number).toString();
  }
  if (input.includes('sqrt(')) {
    const number = parseFloat(input.replace('sqrt(', '').replace(')', ''));
    if (isNaN(number)) {
      throw new Error('Invalid square root format');
    }
    return Math.sqrt(number).toString();
  }
  if (input.includes('cbrt(')) {
    const number = parseFloat(input.replace('cbrt(', '').replace(')', ''));
    return Math.cbrt(number).toString();
  }
  if (input.includes('abs(')) {
    const number = parseFloat(input.replace('abs(', '').replace(')', ''));
    return Math.abs(number).toString();
  }
  if (input.includes('fact(')) {
    const number = parseInt(input.replace('fact(', '').replace(')', ''));
    if (number < 0) throw new Error('Cannot calculate factorial of negative number');
    let result = 1;
    for (let i = 2; i <= number; i++) result *= i;
    return result.toString();
  }

  // Handle power/exponent
  if (input.includes('^')) {
    const [base, exponent] = input.split('^').map(s => parseFloat(s.trim()));
    if (isNaN(base) || isNaN(exponent)) {
      throw new Error('Invalid power calculation format');
    }
    return Math.pow(base, exponent).toString();
  }

  // Check for percentage calculations
  if (input.includes('%')) {
    if (input.includes('of')) {
      const [percentStr, rest] = input.split('of').map(s => s.trim());
      const percent = parseFloat(percentStr);
      const number = parseFloat(rest);
      if (isNaN(percent) || isNaN(number)) {
        throw new Error('Invalid percentage calculation format');
      }
      return ((percent / 100) * number).toString();
    } else if (input.includes('is what percent of')) {
      const [numStr, totalStr] = input.split('is what percent of').map(s => s.trim());
      const num = parseFloat(numStr);
      const total = parseFloat(totalStr);
      if (isNaN(num) || isNaN(total)) {
        throw new Error('Invalid percentage comparison format');
      }
      return ((num / total) * 100).toFixed(2) + '%';
    }
  }

  // Check for time calculations
  if (input.includes(':')) {
    return calculateTimeOperation(input);
  }

  // Basic arithmetic with parentheses support
  return calculateBasicMath(input);
}

function parseTime(timeStr: string): TimeValue {
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
    throw new Error('Invalid time format. Use HH:MM');
  }
  return { hours, minutes };
}

function formatTime(time: TimeValue): string {
  const totalMinutes = time.hours * 60 + time.minutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function calculateTimeOperation(input: string): string {
  const parts = input.split(/([+-])/);
  if (parts.length !== 3) {
    throw new Error('Invalid time calculation format');
  }

  const time1 = parseTime(parts[0].trim());
  const operator = parts[1];
  const time2 = parseTime(parts[2].trim());

  let totalMinutes1 = time1.hours * 60 + time1.minutes;
  let totalMinutes2 = time2.hours * 60 + time2.minutes;

  let resultMinutes;
  if (operator === '+') {
    resultMinutes = totalMinutes1 + totalMinutes2;
  } else if (operator === '-') {
    resultMinutes = totalMinutes1 - totalMinutes2;
    if (resultMinutes < 0) {
      throw new Error('Negative time result');
    }
  } else {
    throw new Error('Invalid time operation');
  }

  return formatTime({
    hours: Math.floor(resultMinutes / 60),
    minutes: resultMinutes % 60
  });
}

function calculateBasicMath(input: string): string {
  // Replace × with * and handle parentheses
  input = input.replace(/×/g, '*');
  
  // Validate input
  if (!/^[\d\s+\-*/.()^√]+$/.test(input)) {
    throw new Error('Invalid characters in expression');
  }

  try {
    // Using Function constructor instead of eval for better security
    const result = new Function(`return ${input}`)();
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Invalid calculation result');
    }
    return result.toString();
  } catch (error) {
    throw new Error('Invalid mathematical expression');
  }
}

// Common mathematical formulas
export const mathFormulas = {
  // Area formulas
  circleArea: (radius: number) => Math.PI * radius * radius,
  rectangleArea: (length: number, width: number) => length * width,
  triangleArea: (base: number, height: number) => (base * height) / 2,
  
  // Volume formulas
  sphereVolume: (radius: number) => (4/3) * Math.PI * Math.pow(radius, 3),
  cylinderVolume: (radius: number, height: number) => Math.PI * radius * radius * height,
  cubeVolume: (side: number) => Math.pow(side, 3),
  
  // Physics formulas
  velocityFormula: (distance: number, time: number) => distance / time,
  forceFormula: (mass: number, acceleration: number) => mass * acceleration,
  
  // Other useful formulas
  quadraticFormula: (a: number, b: number, c: number) => {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return "No real solutions";
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return `x₁ = ${x1}, x₂ = ${x2}`;
  }
};
