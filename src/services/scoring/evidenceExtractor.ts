import { Attempt, CaseDefinition, ChatMessage, AnalysisFormData } from '../../types';

export interface ExtractedEvidence {
  attemptId: string;
  caseId: string;
  mode: 'training' | 'assessment';
  studentMessages: ChatMessage[];
  patientMessages: ChatMessage[];
  allMessages: ChatMessage[];
  discoveredFactIds: Set<string>;
  discoveredCategorySet: Set<string>;
  
  // Communication indicators
  hasGreetingOrIntro: boolean;
  hasPoliteLanguage: boolean;
  politeWordCount: number;
  hasAskedPermissionOrRapport: boolean;
  hasPoliteClosing: boolean;
  inappropriateLanguageDetected: boolean;

  // Interview coverage
  checklistMatchResults: {
    criterionId: string;
    category: string;
    importance: 'essential' | 'important' | 'supporting';
    requiredForFullScore: boolean;
    relatedFactIds: string[];
    discoveredCount: number;
    totalRelated: number;
    isFullyCovered: boolean;
    isPartiallyCovered: boolean;
  }[];

  // Specific safety interview checks (from actual interview, not form)
  interviewAllergyFoodAsked: boolean;
  interviewAllergyDrugAsked: boolean;
  interviewAllergyHerbalAsked: boolean;
  interviewUnderlyingDiseaseAsked: boolean;
  interviewMedicationsAsked: boolean;

  // Form submission
  studentAnalysis: AnalysisFormData;

  // Timing metrics
  elapsedSeconds: number;
  timerExpired: boolean;
  completedWithinTime: boolean;
}

const GREETING_TERMS = ['สวัสดี', 'ยินดีต้อนรับ', 'หมอชื่อ', 'ผมชื่อ', 'ดิฉันชื่อ', 'นักศึกษาแพทย์', 'นศพ', 'หมอนะครับ', 'หมอนะคะ', 'กระผม'];
const PERMISSION_TERMS = ['ขออนุญาต', 'ขอสอบถาม', 'ขอซักประวัติ', 'ขอทราบ', 'ยินดีที่ได้ดูแล', 'เป็นอย่างไรบ้าง', 'สบายดีไหม', 'มีอะไรให้หมอช่วย'];
const POLITE_PARTICLES = ['ครับ', 'ค่ะ', 'นะคะ', 'นะครับ', 'ขอรับ', 'ขอบคุณ', 'ยินดีครับ', 'ยินดีค่ะ', 'ขออภัย'];
const CLOSING_TERMS = ['ขอบคุณ', 'ขอให้หายไวๆ', 'ดูแลสุขภาพ', 'หากมีอาการ', 'มีข้อสงสัยไหม', 'เข้าใจไหม', 'มีคำถามเพิ่มไหม'];

export function extractEvidence(attempt: Attempt, caseDef: CaseDefinition): ExtractedEvidence {
  const studentMessages = (attempt.transcript || []).filter((m) => m.sender === 'student');
  const patientMessages = (attempt.transcript || []).filter((m) => m.sender === 'patient');
  const allMessages = attempt.transcript || [];
  
  const discoveredFactIds = new Set<string>(attempt.discoveredFacts || []);
  const discoveredCategorySet = new Set<string>(attempt.discoveredCategories || []);

  const studentCombinedText = studentMessages.map((m) => m.text).join(' ');

  // 1. Communication indicators
  let politeWordCount = 0;
  POLITE_PARTICLES.forEach((term) => {
    const regex = new RegExp(term, 'g');
    const matches = studentCombinedText.match(regex);
    if (matches) politeWordCount += matches.length;
  });

  const hasGreetingOrIntro = GREETING_TERMS.some((term) => studentCombinedText.includes(term)) ||
    (studentMessages.length > 0 && GREETING_TERMS.some((term) => studentMessages[0].text.includes(term)));

  const hasAskedPermissionOrRapport = PERMISSION_TERMS.some((term) => studentCombinedText.includes(term));

  const hasPoliteLanguage = politeWordCount >= 2;

  const lastFewMessages = studentMessages.slice(-3).map((m) => m.text).join(' ');
  const hasPoliteClosing = CLOSING_TERMS.some((term) => lastFewMessages.includes(term)) ||
    (attempt.studentAnalysis?.summaryForPatient?.length > 10);

  // 2. Checklist matching
  const checklistMatchResults = (caseDef.interviewChecklist || []).map((item) => {
    const relatedIds = item.relatedFactIds || [];
    let discoveredCount = 0;
    relatedIds.forEach((fId) => {
      if (discoveredFactIds.has(fId)) {
        discoveredCount++;
      }
    });

    const isFullyCovered = relatedIds.length > 0 ? discoveredCount === relatedIds.length : false;
    const isPartiallyCovered = relatedIds.length > 0 ? discoveredCount > 0 && discoveredCount < relatedIds.length : false;

    return {
      criterionId: item.criterionId,
      category: item.category,
      importance: item.importance,
      requiredForFullScore: item.requiredForFullScore,
      relatedFactIds: relatedIds,
      discoveredCount,
      totalRelated: relatedIds.length,
      isFullyCovered,
      isPartiallyCovered
    };
  });

  // 3. Interview Safety checks
  const checkFactOrTextMatch = (factPrefixes: string[], textKeywords: string[]) => {
    const factFound = Array.from(discoveredFactIds).some((id) =>
      factPrefixes.some((p) => id.toLowerCase().includes(p.toLowerCase()))
    );
    const textFound = textKeywords.some((kw) => studentCombinedText.includes(kw));
    return factFound || textFound;
  };

  const interviewAllergyFoodAsked = checkFactOrTextMatch(
    ['foodallergy', 'allergy-food', 'allergy_food'],
    ['แพ้อาหาร', 'อาหารทะเล', 'แพ้อะไร', 'กินอะไรแล้วแพ้', 'กุ้ง', 'ปู']
  ) || discoveredCategorySet.has('foodAllergies') || discoveredCategorySet.has('allergy_food');

  const interviewAllergyDrugAsked = checkFactOrTextMatch(
    ['drugallergy', 'allergy-drug', 'allergy_drug'],
    ['แพ้ยา', 'แพ้ยาอะไร', 'มีประวัติแพ้ยา', 'เพนิซิลลิน', 'nsaid', 'ยาแก้ปวด']
  ) || discoveredCategorySet.has('drugAllergies') || discoveredCategorySet.has('allergy_drug');

  const interviewAllergyHerbalAsked = checkFactOrTextMatch(
    ['herbalallergy', 'allergy-herbal', 'allergy_herbal'],
    ['แพ้สมุนไพร', 'ยาสมุนไพร', 'แพ้ยาแผนโบราณ', 'ยาต้ม']
  ) || discoveredCategorySet.has('herbalAllergies') || discoveredCategorySet.has('allergy_herbal');

  const interviewUnderlyingDiseaseAsked = checkFactOrTextMatch(
    ['medicalhistory', 'medical-history', 'underlying'],
    ['โรคประจำตัว', 'ความดัน', 'เบาหวาน', 'โรคหัวใจ', 'โรคตับ', 'โรคไต', 'กระเพาะ']
  ) || discoveredCategorySet.has('medicalHistory') || discoveredCategorySet.has('underlying_disease');

  const interviewMedicationsAsked = checkFactOrTextMatch(
    ['medication', 'med-'],
    ['ยาประจำ', 'ยาที่ทานอยู่', 'ยาที่ใช้อยู่', 'อาหารเสริม', 'วิตามิน', 'ยาลดกรด']
  ) || discoveredCategorySet.has('medications');

  // 4. Student Analysis data
  const studentAnalysis: AnalysisFormData = attempt.submittedSnapshot || attempt.studentAnalysis;

  // 5. Timing
  const elapsedSeconds = attempt.timer?.elapsedSeconds || 0;
  const timerOptionMinutes = attempt.timerOption !== 'none' ? parseInt(attempt.timerOption, 10) : 0;
  const isAssessmentMode = attempt.mode === 'assessment';
  
  let timerExpired = false;
  let completedWithinTime = true;
  if (isAssessmentMode && timerOptionMinutes > 0) {
    if (elapsedSeconds > timerOptionMinutes * 60) {
      timerExpired = true;
      completedWithinTime = false;
    }
  }

  return {
    attemptId: attempt.attemptId,
    caseId: attempt.caseId,
    mode: attempt.mode,
    studentMessages,
    patientMessages,
    allMessages,
    discoveredFactIds,
    discoveredCategorySet,
    hasGreetingOrIntro,
    hasPoliteLanguage,
    politeWordCount,
    hasAskedPermissionOrRapport,
    hasPoliteClosing,
    inappropriateLanguageDetected: false,
    checklistMatchResults,
    interviewAllergyFoodAsked,
    interviewAllergyDrugAsked,
    interviewAllergyHerbalAsked,
    interviewUnderlyingDiseaseAsked,
    interviewMedicationsAsked,
    studentAnalysis,
    elapsedSeconds,
    timerExpired,
    completedWithinTime
  };
}
