/**
 * Input normalization & validation for Thai student interview questions.
 */

export interface InputValidationResult {
  isValid: boolean;
  error?: string;
  normalizedText: string;
  cleanDisplay: string;
}

export const MAX_INPUT_LENGTH = 800;

/**
 * Normalizes input text for keyword and pattern matching.
 * Preserves Thai character sequences and tone marks, normalizes spaces and lowercases Latin text.
 */
export function normalizeInput(rawInput: string): string {
  if (!rawInput) return '';

  return rawInput
    .trim()
    .toLowerCase()
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    // Remove common question mark variations / symbols but retain Thai characters and basic punctuation
    .replace(/[?!！？~～…]+/g, ' ')
    .trim();
}

/**
 * Validates student input before processing into conversation engine.
 */
export function validateStudentInput(rawInput: string): InputValidationResult {
  if (!rawInput || typeof rawInput !== 'string') {
    return {
      isValid: false,
      error: 'กรุณาระบุข้อความคำถามก่อนกดส่ง',
      normalizedText: '',
      cleanDisplay: ''
    };
  }

  const cleanDisplay = rawInput.trim();

  if (cleanDisplay.length === 0) {
    return {
      isValid: false,
      error: 'กรุณาระบุข้อความคำถามก่อนกดส่ง',
      normalizedText: '',
      cleanDisplay: ''
    };
  }

  if (cleanDisplay.length > MAX_INPUT_LENGTH) {
    return {
      isValid: false,
      error: `คำถามมีความยาวเกินกำหนด (${cleanDisplay.length}/${MAX_INPUT_LENGTH} ตัวอักษร) กรุณากระชับคำถาม`,
      normalizedText: '',
      cleanDisplay
    };
  }

  const normalizedText = normalizeInput(cleanDisplay);

  return {
    isValid: true,
    normalizedText,
    cleanDisplay
  };
}
