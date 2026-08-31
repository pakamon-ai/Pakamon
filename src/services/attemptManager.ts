import { Attempt, CaseDefinition, PracticeMode, TimerOption, AnalysisFormData } from '../types';

export const CURRENT_SCHEMA_VERSION = 1;

/**
 * Generate a cryptographically secure attempt ID with safe fallback
 */
export function generateAttemptId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `attempt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create default empty/clean AnalysisFormData
 */
export function createDefaultAnalysisFormData(): AnalysisFormData {
  return {
    birthElement: '',
    dominantElement: '',
    currentElement: '',
    elementCondition: [],
    relatedFactors: '',
    supportingReasons: '',

    recommendedTastes: [],
    encouragedFoods: '',
    reducedFoods: '',
    sampleMeals: '',
    sampleDrinks: '',
    foodRationale: '',

    restPlan: '',
    sleepPlan: '',
    movementPlan: '',
    ruesiDatTonPlan: '',
    stressManagement: '',
    otherActivities: '',
    selfCareRationale: '',

    foodAllergyReviewed: false,
    hasFoodAllergy: '',
    foodAllergyDetail: '',
    drugAllergyReviewed: false,
    hasDrugAllergy: '',
    drugAllergyDetail: '',
    herbalAllergyReviewed: false,
    hasHerbalAllergy: '',
    herbalAllergyDetail: '',
    underlyingDiseaseReviewed: false,
    hasUnderlyingDisease: '',
    underlyingDiseaseDetail: '',
    medicationsReviewed: false,
    currentMedications: '',
    contraindicationsReviewed: false,
    contraindications: '',
    redFlagsReviewed: false,
    redFlags: '',
    shouldRefer: 'undecided',
    referralReason: '',
    safetyNotes: '',

    summaryForPatient: '',
    understandingCheckMethod: '',
    followUpPlan: ''
  };
}

/**
 * Build initial opening message from case initial disclosure and patient persona
 */
export function createInitialPatientGreeting(caseDef: CaseDefinition): string {
  const isMale = caseDef.patientProfile.sex === 'male';
  const greeting = isMale ? 'สวัสดีครับคุณหมอ' : 'สวัสดีค่ะคุณหมอ';
  const selfPronoun = isMale ? 'ผม' : 'ดิฉัน';
  const name = caseDef.initialDisclosure.displayName;
  const concern = caseDef.initialDisclosure.chiefConcern;
  return `${greeting} ${selfPronoun}ชื่อ ${name} มารับการปรึกษาเพราะช่วงนี้ ${concern}`;
}

/**
 * Instantiate a brand new Attempt session from a selected case and user settings
 */
export function createNewAttempt(
  caseDef: CaseDefinition,
  mode: PracticeMode,
  timerOption: TimerOption
): Attempt {
  const initMsg = createInitialPatientGreeting(caseDef);
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    attemptId: generateAttemptId(),
    caseId: caseDef.metadata.id,
    caseVersion: caseDef.metadata.version,
    mode,
    difficulty: caseDef.metadata.difficulty,
    timerOption,
    status: 'INTERVIEW',
    analysisStep: 1,
    startedAt: new Date().toISOString(),
    interviewEndedAt: null,
    submittedAt: null,
    timer: {
      elapsedSeconds: 0,
      remainingSeconds: timerOption === 'none' ? undefined : parseInt(timerOption, 10) * 60,
      isRunning: true
    },
    transcript: [
      {
        id: `msg-patient-init-${Date.now()}`,
        sender: 'patient',
        text: initMsg,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        matchedCategory: 'chief_concern',
        disclosedFactIds: []
      }
    ],
    discoveredFacts: [],
    discoveredCategories: ['chief_concern'],
    studentAnalysis: createDefaultAnalysisFormData(),
    foodRecommendation: null,
    selfCareRecommendation: null,
    safetyResponse: null,
    closingSummary: null,
    score: null,
    feedback: null
  };
}

/**
 * Create a repeat attempt for the same case with fresh ID, clean transcript, and reset answers
 */
export function createRepeatAttempt(
  previousAttempt: Attempt,
  caseDef: CaseDefinition
): Attempt {
  const initMsg = createInitialPatientGreeting(caseDef);
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    attemptId: generateAttemptId(),
    caseId: caseDef.metadata.id,
    caseVersion: caseDef.metadata.version,
    mode: previousAttempt.mode,
    difficulty: caseDef.metadata.difficulty,
    timerOption: previousAttempt.timerOption,
    status: 'INTERVIEW',
    analysisStep: 1,
    startedAt: new Date().toISOString(),
    interviewEndedAt: null,
    submittedAt: null,
    timer: {
      elapsedSeconds: 0,
      remainingSeconds: previousAttempt.timerOption === 'none' ? undefined : parseInt(previousAttempt.timerOption, 10) * 60,
      isRunning: true
    },
    transcript: [
      {
        id: `msg-patient-init-${Date.now()}`,
        sender: 'patient',
        text: initMsg,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        matchedCategory: 'chief_concern',
        disclosedFactIds: []
      }
    ],
    discoveredFacts: [],
    discoveredCategories: ['chief_concern'],
    studentAnalysis: createDefaultAnalysisFormData(),
    foodRecommendation: null,
    selfCareRecommendation: null,
    safetyResponse: null,
    closingSummary: null,
    score: null,
    feedback: null
  };
}
