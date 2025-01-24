type TimeValue = {
  hours: number;
  minutes: number;
};

export function calculateResult(input: string): string {
  input = input.trim().toLowerCase();

  // Handle square root
  if (input.includes('sqrt')) {
    const number = parseFloat(input.replace('sqrt', ''));
    if (isNaN(number)) {
      throw new Error('Invalid square root format');
    }
    return Math.sqrt(number).toString();
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