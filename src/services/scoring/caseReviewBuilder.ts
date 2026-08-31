import {
  CaseDefinition,
  InterviewReview,
  InterviewReviewItem,
  ElementReview,
  FoodReview,
  SelfCareReview,
  SafetyReview,
  ClosingReview,
  CaseStudyReview
} from '../../types';
import { ExtractedEvidence } from './evidenceExtractor';

export function buildCaseStudyReviews(
  evidence: ExtractedEvidence,
  caseDef: CaseDefinition,
  safetyIssues: string[],
  foodSafetyConflict: string | null
): {
  interviewReview: InterviewReview;
  elementReview: ElementReview;
  foodReview: FoodReview;
  selfCareReview: SelfCareReview;
  safetyReview: SafetyReview;
  closingReview: ClosingReview;
  caseStudyReview: CaseStudyReview;
} {
  const student = evidence.studentAnalysis;
  const isDraft = caseDef.metadata.academicReviewStatus === 'draft';
  const academicWarning = isDraft
    ? 'กรณีศึกษานี้อยู่ระหว่างการทบทวนเนื้อหาวิชาการ ข้อมูลเฉลยเป็นแนวทางอ้างอิงเพื่อการศึกษา'
    : 'เกณฑ์เฉลยอ้างอิงตามคัมภีร์สมุฏฐานวินิจฉัยและเวชกรรมไทย';

  // 1. Interview Review
  const adequatelyCovered: InterviewReviewItem[] = [];
  const partiallyCovered: InterviewReviewItem[] = [];
  const missed: InterviewReviewItem[] = [];
  const unclear: InterviewReviewItem[] = [];

  (caseDef.interviewChecklist || []).forEach((item) => {
    const match = evidence.checklistMatchResults.find((m) => m.criterionId === item.criterionId);
    if (!match) return;

    const reviewItem: InterviewReviewItem = {
      id: item.criterionId,
      label: item.category,
      importance: item.importance,
      status: match.isFullyCovered
        ? 'covered'
        : match.isPartiallyCovered
        ? 'partial'
        : 'missed',
      evidence: match.isFullyCovered
        ? `ถามค้นพบข้อมูลครบ (${match.discoveredCount}/${match.totalRelated})`
        : match.isPartiallyCovered
        ? `ถามค้นพบข้อมูลบางส่วน (${match.discoveredCount}/${match.totalRelated})`
        : undefined,
      whyMissed: !match.isFullyCovered && !match.isPartiallyCovered
        ? `ไม่ได้ซักถามหัวข้อนี้ในบทสนทนา (${item.importance === 'essential' ? 'หัวข้อจำเป็นยิ่ง' : 'หัวข้อสำคัญ'})`
        : undefined
    };

    if (match.isFullyCovered) {
      adequatelyCovered.push(reviewItem);
    } else if (match.isPartiallyCovered) {
      partiallyCovered.push(reviewItem);
    } else {
      missed.push(reviewItem);
    }
  });

  const interviewReview: InterviewReview = {
    adequatelyCovered,
    partiallyCovered,
    missed,
    unclear
  };

  // 2. Element Review
  const matchedEvidence: string[] = [];
  const missedEvidence: string[] = [];
  const reasoningFeedback: string[] = [];

  const key = caseDef.elementAnalysisKey;
  (key.supportingEvidence || []).forEach((ev) => {
    const studentText = `${student.supportingReasons} ${student.relatedFactors}`.toLowerCase();
    const words = ev.split(/[\s,]+/);
    const hasWord = words.some((w) => w.length > 3 && studentText.includes(w.toLowerCase()));
    if (hasWord) {
      matchedEvidence.push(ev);
    } else {
      missedEvidence.push(ev);
    }
  });

  if (student.birthElement === key.birthElement) {
    reasoningFeedback.push(`ธาตุกำเนิดตรงตามเกณฑ์: ${key.birthElement}`);
  } else {
    reasoningFeedback.push(`ธาตุกำเนิดที่ถูกต้องตามเกณฑ์คือ ${key.birthElement}`);
  }

  if (student.currentElement && key.currentElementState.includes(student.currentElement)) {
    reasoningFeedback.push(`ระบุธาตุปัจจุบันสอดคล้องกับพยาธิสภาพ: ${student.currentElement}`);
  } else {
    reasoningFeedback.push(`ธาตุปัจจุบันตามเกณฑ์อ้างอิง: ${key.currentElementState}`);
  }

  const elementReview: ElementReview = {
    studentAnswer: {
      birthElement: student.birthElement || 'ไม่ได้ระบุ',
      dominantElement: student.dominantElement || 'ไม่ได้ระบุ',
      currentElement: student.currentElement || 'ไม่ได้ระบุ',
      elementCondition: student.elementCondition || [],
      supportingReasons: student.supportingReasons || 'ไม่ได้ระบุ',
      relatedFactors: student.relatedFactors || 'ไม่ได้ระบุ'
    },
    referenceAnswer: {
      birthElement: key.birthElement,
      dominantElement: key.dominantElement,
      currentElementState: key.currentElementState,
      supportingEvidence: key.supportingEvidence || [],
      acceptableReasoning: key.acceptableReasoning || []
    },
    matchedEvidence,
    missedEvidence,
    reasoningFeedback,
    academicNote: academicWarning
  };

  // 3. Food Review
  const foodKey = caseDef.foodGuidanceKey;
  const foodFeedbackItems: { type: 'suitable' | 'incomplete' | 'conflict' | 'risk'; message: string }[] = [];

  if (foodSafetyConflict) {
    foodFeedbackItems.push({ type: 'risk', message: foodSafetyConflict });
  }

  const studentTastes = student.recommendedTastes || [];
  const expectedTastes = foodKey.recommendedTastes || [];
  const tasteMatch = studentTastes.some((st) =>
    expectedTastes.some((et) => et.toLowerCase().includes(st.toLowerCase()) || st.toLowerCase().includes(et.toLowerCase()))
  );

  if (tasteMatch) {
    foodFeedbackItems.push({
      type: 'suitable',
      message: `รสยาที่แนะนำ (${studentTastes.join(', ')}) สอดคล้องกับหลักการปรับสมดุลธาตุ`
    });
  } else if (studentTastes.length > 0) {
    foodFeedbackItems.push({
      type: 'incomplete',
      message: `รสยาที่แนะนำ (${studentTastes.join(', ')}) ควรปรับให้ตรงกับรสยาหลักตามเกณฑ์: ${expectedTastes.join(', ')}`
    });
  }

  if (student.encouragedFoods) {
    foodFeedbackItems.push({
      type: 'suitable',
      message: `อาหารที่แนะนำ: ${student.encouragedFoods.slice(0, 80)}...`
    });
  }

  const foodReview: FoodReview = {
    studentTastes: student.recommendedTastes || [],
    referenceTastes: foodKey.recommendedTastes || [],
    encouragedFoods: student.encouragedFoods || 'ไม่ได้ระบุ',
    reducedFoods: student.reducedFoods || 'ไม่ได้ระบุ',
    sampleMeals: student.sampleMeals || 'ไม่ได้ระบุ',
    sampleDrinks: student.sampleDrinks || 'ไม่ได้ระบุ',
    feedbackItems: foodFeedbackItems,
    academicNote: academicWarning
  };

  // 4. Self-Care Review
  const selfCareKey = caseDef.selfCareGuidanceKey;
  const selfCareFeedbackItems: { type: 'suitable' | 'missing' | 'conflict' | 'personalized'; message: string }[] = [];

  if (student.restPlan && student.sleepPlan) {
    selfCareFeedbackItems.push({
      type: 'suitable',
      message: 'มีคำแนะนำการพักผ่อนและการนอนหลับที่ปฏิบัติได้จริง'
    });
  }

  if (student.ruesiDatTonPlan) {
    selfCareFeedbackItems.push({
      type: 'suitable',
      message: `ระบุท่าฤๅษีดัดตน: ${student.ruesiDatTonPlan}`
    });
  } else {
    selfCareFeedbackItems.push({
      type: 'missing',
      message: 'ควรระบุท่าฤๅษีดัดตนที่ช่วยบรรเทาอาการเฉพาะเจาะจง'
    });
  }

  const selfCareReview: SelfCareReview = {
    studentPlan: {
      rest: student.restPlan || 'ไม่ได้ระบุ',
      sleep: student.sleepPlan || 'ไม่ได้ระบุ',
      movement: student.movementPlan || 'ไม่ได้ระบุ',
      ruesiDatTon: student.ruesiDatTonPlan || 'ไม่ได้ระบุ',
      stressManagement: student.stressManagement || 'ไม่ได้ระบุ'
    },
    referenceKey: {
      rest: selfCareKey.rest || [],
      sleep: selfCareKey.sleep || [],
      movement: selfCareKey.movement || [],
      ruesiDatTon: selfCareKey.ruesiDatTon || [],
      stressManagement: selfCareKey.stressManagement || [],
      precautions: selfCareKey.precautions || []
    },
    feedbackItems: selfCareFeedbackItems,
    academicNote: academicWarning
  };

  // 5. Safety Review
  const safetyCriteria = caseDef.safetyCriteria;
  const isReferralCorrect = student.shouldRefer === (safetyCriteria.referralRequired ? 'yes' : 'no');

  const safetyReview: SafetyReview = {
    allergyChecked: evidence.interviewAllergyFoodAsked && evidence.interviewAllergyDrugAsked,
    diseaseChecked: evidence.interviewUnderlyingDiseaseAsked,
    medicationChecked: evidence.interviewMedicationsAsked,
    contraindicationsRecognized: (student.contraindications || '').length > 0,
    redFlagsRecognized: (student.redFlags || '').length > 0,
    referralDecision: {
      student: student.shouldRefer || 'undecided',
      expected: safetyCriteria.referralRequired,
      isCorrect: isReferralCorrect,
      studentReason: student.referralReason || 'ไม่ได้ระบุ',
      expectedConditions: safetyCriteria.referralConditions || []
    },
    safetyIssues,
    academicNote: academicWarning
  };

  // 6. Closing Review
  const closingReview: ClosingReview = {
    patientSummaryQuality: student.summaryForPatient ? 'ระบุข้อความสรุปเรียบร้อย' : 'ยังไม่ได้ระบุ',
    teachBackQuality: student.understandingCheckMethod ? 'ระบุวิธีตรวจสอบความเข้าใจ (Teach-Back)' : 'ยังไม่ได้ระบุ',
    followUpQuality: student.followUpPlan ? 'ระบุแผนการติดตามผล' : 'ยังไม่ได้ระบุ',
    timeManagement: evidence.completedWithinTime ? 'บริหารเวลาได้ตามเกณฑ์' : 'ใช้เวลาเกินกรอบเวลา'
  };

  // 7. Complete Case Study Review
  const caseStudyReview: CaseStudyReview = {
    studentSubmission: student,
    cleanTranscript: evidence.allMessages,
    referenceCriteria: {
      expectedElementAnalysis: caseDef.elementAnalysisKey,
      expectedFoodGuidance: caseDef.foodGuidanceKey,
      expectedSelfCareGuidance: caseDef.selfCareGuidanceKey,
      expectedSafetyCriteria: caseDef.safetyCriteria
    },
    isDraft
  };

  return {
    interviewReview,
    elementReview,
    foodReview,
    selfCareReview,
    safetyReview,
    closingReview,
    caseStudyReview
  };
}
