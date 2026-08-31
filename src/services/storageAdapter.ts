import { Attempt } from '../types';
import { getCaseById } from './caseRegistry';
import { CURRENT_SCHEMA_VERSION } from './attemptManager';

export const STORAGE_KEY = 'thai-element-sim.current-attempt.v1';

// In-memory fallback if browser localStorage is disabled or restricted
let memoryStore: Record<string, string> = {};

/**
 * Check if window.localStorage is accessible
 */
export function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Save current attempt locally with error boundary and memory fallback
 */
export function saveCurrentAttempt(attempt: Attempt): boolean {
  try {
    const payload = JSON.stringify(attempt);
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(STORAGE_KEY, payload);
    } else {
      memoryStore[STORAGE_KEY] = payload;
    }
    return true;
  } catch (error) {
    console.warn('[StorageAdapter] Failed to save attempt to localStorage, using in-memory store:', error);
    try {
      memoryStore[STORAGE_KEY] = JSON.stringify(attempt);
      return true;
    } catch {
      return false;
    }
  }
}

export interface LoadAttemptResult {
  success: boolean;
  attempt: Attempt | null;
  reason?: string;
  isCorrupt?: boolean;
  isStorageAvailable: boolean;
}

/**
 * Load and validate current attempt from local storage
 */
export function loadCurrentAttempt(): LoadAttemptResult {
  const storageAvailable = isLocalStorageAvailable();
  let rawData: string | null = null;

  try {
    if (storageAvailable) {
      rawData = window.localStorage.getItem(STORAGE_KEY);
    } else {
      rawData = memoryStore[STORAGE_KEY] || null;
    }
  } catch (error) {
    console.warn('[StorageAdapter] Error reading from storage:', error);
    return {
      success: false,
      attempt: null,
      reason: 'ไม่สามารถเข้าถึงพื้นที่จัดเก็บข้อมูลของเบราว์เซอร์ได้',
      isStorageAvailable: false
    };
  }

  if (!rawData) {
    return {
      success: true,
      attempt: null,
      isStorageAvailable: storageAvailable
    };
  }

  // Parse JSON safely
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawData);
  } catch (error) {
    console.warn('[StorageAdapter] Corrupt JSON in stored attempt:', error);
    clearCurrentAttempt();
    return {
      success: false,
      attempt: null,
      reason: 'ข้อมูลเซสชันเดิมเสียหาย ไม่สามารถอ่านค่าได้',
      isCorrupt: true,
      isStorageAvailable: storageAvailable
    };
  }

  // Validate structure & schema version
  if (!parsed || typeof parsed !== 'object') {
    clearCurrentAttempt();
    return {
      success: false,
      attempt: null,
      reason: 'รูปแบบข้อมูลเซสชันไม่ถูกต้อง',
      isCorrupt: true,
      isStorageAvailable: storageAvailable
    };
  }

  const candidate = parsed as Partial<Attempt>;

  // Check schema version
  if (candidate.schemaVersion !== CURRENT_SCHEMA_VERSION) {
    console.warn(`[StorageAdapter] Schema version mismatch: stored ${candidate.schemaVersion} vs current ${CURRENT_SCHEMA_VERSION}`);
    clearCurrentAttempt();
    return {
      success: false,
      attempt: null,
      reason: 'เวอร์ชันโครงสร้างข้อมูลเซสชันไม่ตรงกับเวอร์ชันปัจจุบัน',
      isCorrupt: true,
      isStorageAvailable: storageAvailable
    };
  }

  // Check required core fields
  if (!candidate.attemptId || typeof candidate.attemptId !== 'string') {
    clearCurrentAttempt();
    return {
      success: false,
      attempt: null,
      reason: 'ไม่พบรหัสประจำสถานการณ์ (attemptId)',
      isCorrupt: true,
      isStorageAvailable: storageAvailable
    };
  }

  if (!candidate.caseId || typeof candidate.caseId !== 'string') {
    clearCurrentAttempt();
    return {
      success: false,
      attempt: null,
      reason: 'ไม่พบรหัสกรณีศึกษา (caseId)',
      isCorrupt: true,
      isStorageAvailable: storageAvailable
    };
  }

  // Verify referenced case exists in registry
  const caseDef = getCaseById(candidate.caseId);
  if (!caseDef) {
    console.warn(`[StorageAdapter] Referenced caseId '${candidate.caseId}' not found in registry`);
    clearCurrentAttempt();
    return {
      success: false,
      attempt: null,
      reason: `ไม่พบกรณีศึกษา '${candidate.caseId}' ในระบบ`,
      isCorrupt: true,
      isStorageAvailable: storageAvailable
    };
  }

  // Check valid status
  const validStatuses = [
    'WELCOME',
    'CASE_SETUP',
    'INTERVIEW',
    'ANALYSIS',
    'SAFETY_REVIEW',
    'READY_TO_SUBMIT',
    'SUBMITTED',
    'RESULTS'
  ];
  if (!candidate.status || !validStatuses.includes(candidate.status)) {
    clearCurrentAttempt();
    return {
      success: false,
      attempt: null,
      reason: 'สถานะขั้นตอนของเซสชันไม่ถูกต้อง',
      isCorrupt: true,
      isStorageAvailable: storageAvailable
    };
  }

  // Attempt is valid
  return {
    success: true,
    attempt: candidate as Attempt,
    isStorageAvailable: storageAvailable
  };
}

/**
 * Remove active attempt from local storage
 */
export function clearCurrentAttempt(): void {
  try {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('[StorageAdapter] Failed to clear localStorage item:', error);
  }
  delete memoryStore[STORAGE_KEY];
}

/**
 * Check if a recoverable attempt is currently present
 */
export function hasRecoverableAttempt(): boolean {
  const result = loadCurrentAttempt();
  return Boolean(result.success && result.attempt);
}
