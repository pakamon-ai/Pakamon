export type ScreenType = 
  | 'WELCOME'
  | 'CASE_SELECTION'
  | 'SIMULATION'
  | 'ANALYSIS'
  | 'RESULTS';

export type AttemptStatus = 
  | 'WELCOME'
  | 'CASE_SETUP'
  | 'INTERVIEW'
  | 'ANALYSIS'
  | 'SAFETY_REVIEW'
  | 'READY_TO_SUBMIT'
  | 'SUBMITTED'
  | 'RESULTS';

export type PracticeMode = 'training' | 'assessment';
export type TimerOption = 'none' | '10' | '15';
export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced';
export type ElementCategory = 'earth' | 'water' | 'wind' | 'fire';
export type AcademicReviewStatus = 'draft' | 'academic_review' | 'approved';
export type FactImportance = 'essential' | 'important' | 'supporting';

// ==========================================
// 1. CASE DEFINITION DATA MODEL
// ==========================================

export interface CaseMetadata {
  id: string;
  title: string;
  elementFocus: ElementCategory;
  difficulty: DifficultyLevel;
  difficultyLabel: string;
  estimatedMinutes: number;
  version: string;
  academicReviewStatus: AcademicReviewStatus;
}

export interface PatientProfile {
  displayName: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  lifeStage: string;
  birthMonth: string;
  occupation: string;
  residence: string;
  personality: string;
  speechStyle: string;
  healthLiteracy: string;
}

export interface InitialDisclosure {
  displayName: string;
  age: number;
  chiefConcern: string;
  briefContext: string;
}

export interface HiddenFactItem {
  id: string;
  category: string;
  label: string;
  value: string;
  importance?: FactImportance;
  redFlag?: boolean;
}

export interface HiddenFacts {
  presentingConcern: HiddenFactItem[];
  symptoms: HiddenFactItem[];
  food: HiddenFactItem[];
  drink: HiddenFactItem[];
  appetite: HiddenFactItem[];
  sleep: HiddenFactItem[];
  bowel: HiddenFactItem[];
  urination: HiddenFactItem[];
  activity: HiddenFactItem[];
  stress: HiddenFactItem[];
  occupationFactors: HiddenFactItem[];
  environmentFactors: HiddenFactItem[];
  medicalHistory: HiddenFactItem[];
  medications: HiddenFactItem[];
  foodAllergies: HiddenFactItem[];
  drugAllergies: HiddenFactItem[];
  herbalAllergies: HiddenFactItem[];
  pastHistory: HiddenFactItem[];
  otherRelevantHistory: HiddenFactItem[];
  redFlagFacts: HiddenFactItem[];
}

export interface ResponseRule {
  id: string;
  category: string;
  keywords: string[];
  synonyms: string[];
  patterns: string[];
  factReferences: string[];
  minimumSpecificity: number;
  responseVariants: string[];
  fallbackBehavior: string;
}

export interface InterviewChecklistItem {
  criterionId: string;
  category: string;
  importance: FactImportance;
  requiredForFullScore: boolean;
  relatedFactIds: string[];
}

export interface ElementAnalysisKey {
  birthElement: string;
  dominantElement: string;
  currentElementState: string;
  possibleAggravatedElements: string[];
  possibleDeficientElements: string[];
  possibleDisorderedElements: string[];
  supportingEvidence: string[];
  conflictingEvidence: string[];
  acceptableReasoning: string[];
  commonErrors: string[];
  reviewRequired?: boolean;
}

export interface FoodGuidanceKey {
  recommendedTastes: string[];
  foodsToEncourage: string[];
  foodsToLimit: string[];
  foodsToAvoid: string[];
  sampleMeals: string[];
  sampleDrinks: string[];
  reasons: string[];
  contraindications: string[];
  reviewRequired?: boolean;
}

export interface SelfCareGuidanceKey {
  rest: string[];
  sleep: string[];
  movement: string[];
  ruesiDatTon: string[];
  stressManagement: string[];
  dailyActivities: string[];
  precautions: string[];
  reviewRequired?: boolean;
}

export interface SafetyCriteria {
  foodAllergy: string;
  drugAllergy: string;
  herbalAllergy: string;
  underlyingDisease: string;
  medications: string;
  contraindications: string[];
  redFlags: string[];
  referralRequired: boolean;
  referralConditions: string[];
  unsafeRecommendations: string[];
}

export interface ScoringCriteria {
  interviewExpectedItems: string[];
  analysisExpectedEvidence: string[];
  recommendationExpectedItems: string[];
  safetyExpectedItems: string[];
  communicationRules: string[];
  timeRules: string[];
}

export interface RubricOverrides {
  caseSpecificMaxScore?: number;
  categoryWeightOverrides?: Record<string, number>;
  notes?: string;
}

export interface CaseDefinition {
  metadata: CaseMetadata;
  patientProfile: PatientProfile;
  initialDisclosure: InitialDisclosure;
  hiddenFacts: HiddenFacts;
  responseRules: ResponseRule[];
  interviewChecklist: InterviewChecklistItem[];
  elementAnalysisKey: ElementAnalysisKey;
  foodGuidanceKey: FoodGuidanceKey;
  selfCareGuidanceKey: SelfCareGuidanceKey;
  safetyCriteria: SafetyCriteria;
  scoringCriteria: ScoringCriteria;
  rubricOverrides?: RubricOverrides;
}

// Backward compatibility helper for preview cards
export interface CasePreview {
  id: string;
  displayName: string;
  age: number;
  shortConcern: string;
  elementLabel: string;
  elementCategory: ElementCategory;
  difficulty: DifficultyLevel;
  difficultyLabel: string;
  estimatedMinutes: number;
  briefContext: string;
  academicReviewStatus: AcademicReviewStatus;
}

// ==========================================
// 2. CHAT & ANALYSIS FORM
// ==========================================

export interface ChatMessage {
  id: string;
  sender: 'patient' | 'student' | 'system';
  text: string;
  timestamp: string;
  matchedCategory?: string;
  matchedCategories?: string[];
  matchedFactIds?: string[];
  disclosedFactIds?: string[];
}

export interface AnalysisFormData {
  // Step 1: วิเคราะห์ธาตุ
  birthElement: string;
  dominantElement: string;
  currentElement: string;
  elementCondition: string[]; // กำเริบ / หย่อน / พิการ
  relatedFactors: string;
  supportingReasons: string;

  // Step 2: คำแนะนำด้านอาหาร
  recommendedTastes: string[];
  encouragedFoods: string;
  reducedFoods: string;
  sampleMeals: string;
  sampleDrinks: string;
  foodRationale: string;

  // Step 3: การดูแลสุขภาพ
  restPlan: string;
  sleepPlan: string;
  movementPlan: string;
  ruesiDatTonPlan: string;
  stressManagement: string;
  otherActivities: string;
  selfCareRationale: string;

  // Step 4: ความปลอดภัย (Safety Gate)
  foodAllergyReviewed: boolean;
  hasFoodAllergy: string;
  foodAllergyDetail: string;
  drugAllergyReviewed: boolean;
  hasDrugAllergy: string;
  drugAllergyDetail: string;
  herbalAllergyReviewed: boolean;
  hasHerbalAllergy: string;
  herbalAllergyDetail: string;
  underlyingDiseaseReviewed: boolean;
  hasUnderlyingDisease: string;
  underlyingDiseaseDetail: string;
  medicationsReviewed: boolean;
  currentMedications: string;
  contraindicationsReviewed: boolean;
  contraindications: string;
  redFlagsReviewed: boolean;
  redFlags: string;
  shouldRefer: 'yes' | 'no' | 'undecided';
  referralReason: string;
  safetyNotes?: string;

  // Step 5: สรุปและติดตามผล
  summaryForPatient: string;
  understandingCheckMethod: string;
  followUpPlan: string;
}

export interface CategoryScore {
  id: string;
  number: number;
  label: string;
  score: number;
  maxScore: number;
  evidence: string[];
  missingCriteria: string[];
  notes: string[];
}

export interface InterviewReviewItem {
  id: string;
  label: string;
  importance: FactImportance;
  status: 'covered' | 'partial' | 'missed' | 'unclear';
  evidence?: string;
  whyMissed?: string;
}

export interface InterviewReview {
  adequatelyCovered: InterviewReviewItem[];
  partiallyCovered: InterviewReviewItem[];
  missed: InterviewReviewItem[];
  unclear: InterviewReviewItem[];
}

export interface ElementReview {
  studentAnswer: {
    birthElement: string;
    dominantElement: string;
    currentElement: string;
    elementCondition: string[];
    supportingReasons: string;
    relatedFactors: string;
  };
  referenceAnswer: {
    birthElement: string;
    dominantElement: string;
    currentElementState: string;
    supportingEvidence: string[];
    acceptableReasoning: string[];
  };
  matchedEvidence: string[];
  missedEvidence: string[];
  reasoningFeedback: string[];
  academicNote: string;
}

export interface FoodReview {
  studentTastes: string[];
  referenceTastes: string[];
  encouragedFoods: string;
  reducedFoods: string;
  sampleMeals: string;
  sampleDrinks: string;
  feedbackItems: { type: 'suitable' | 'incomplete' | 'conflict' | 'risk'; message: string }[];
  academicNote: string;
}

export interface SelfCareReview {
  studentPlan: {
    rest: string;
    sleep: string;
    movement: string;
    ruesiDatTon: string;
    stressManagement: string;
  };
  referenceKey: {
    rest: string[];
    sleep: string[];
    movement: string[];
    ruesiDatTon: string[];
    stressManagement: string[];
    precautions: string[];
  };
  feedbackItems: { type: 'suitable' | 'missing' | 'conflict' | 'personalized'; message: string }[];
  academicNote: string;
}

export interface SafetyReview {
  allergyChecked: boolean;
  diseaseChecked: boolean;
  medicationChecked: boolean;
  contraindicationsRecognized: boolean;
  redFlagsRecognized: boolean;
  referralDecision: {
    student: 'yes' | 'no' | 'undecided';
    expected: boolean;
    isCorrect: boolean;
    studentReason: string;
    expectedConditions: string[];
  };
  safetyIssues: string[];
  academicNote: string;
}

export interface ClosingReview {
  patientSummaryQuality: string;
  teachBackQuality: string;
  followUpQuality: string;
  timeManagement: string;
}

export interface CaseStudyReview {
  studentSubmission: AnalysisFormData;
  cleanTranscript: ChatMessage[];
  referenceCriteria: {
    expectedElementAnalysis: ElementAnalysisKey;
    expectedFoodGuidance: FoodGuidanceKey;
    expectedSelfCareGuidance: SelfCareGuidanceKey;
    expectedSafetyCriteria: SafetyCriteria;
  };
  isDraft: boolean;
}

export interface AssessmentResult {
  version: string;
  scoringVersion: string;
  attemptId: string;
  caseId: string;
  caseVersion: string;
  evaluatedAt: string;
  totalScore: number;
  maxScore: number;
  hasCriticalSafetyIssue: boolean;
  categories: CategoryScore[];
  strengths: string[];
  reviewAreas: string[];
  safetyIssues: string[];
  interviewReview: InterviewReview;
  elementReview: ElementReview;
  foodReview: FoodReview;
  selfCareReview: SelfCareReview;
  safetyReview: SafetyReview;
  closingReview: ClosingReview;
  caseStudyReview: CaseStudyReview;
}

export interface RubricCategory {
  id: string;
  number: number;
  title: string;
  maxScore: number;
  previewScore?: number;
  description: string;
}

export interface FeedbackSummary {
  strengths: string[];
  reviewAreas: string[];
  safetyPriorities: string[];
}

// ==========================================
// 3. ATTEMPT / SESSION DATA MODEL
// ==========================================

export interface AttemptTimer {
  elapsedSeconds: number;
  remainingSeconds?: number;
  isRunning: boolean;
}

export interface Attempt {
  schemaVersion: number;
  attemptId: string;
  caseId: string;
  caseVersion: string;
  mode: PracticeMode;
  difficulty: DifficultyLevel;
  timerOption: TimerOption;
  status: AttemptStatus;
  analysisStep?: number;
  startedAt: string;
  interviewEndedAt: string | null;
  submittedAt: string | null;
  timer: AttemptTimer;
  transcript: ChatMessage[];
  discoveredFacts: string[];
  discoveredCategories: string[];
  studentAnalysis: AnalysisFormData;
  submittedSnapshot?: AnalysisFormData | null;
  foodRecommendation?: Record<string, unknown> | null;
  selfCareRecommendation?: Record<string, unknown> | null;
  safetyResponse?: Record<string, unknown> | null;
  closingSummary?: Record<string, unknown> | null;
  score?: number | null;
  feedback?: FeedbackSummary | null;
  assessmentResult?: AssessmentResult | null;
  scoringVersion?: string;
}
