import { CaseDefinition, CategoryScore } from '../../../types';
import { ExtractedEvidence } from '../evidenceExtractor';

/**
 * Category 3: Allergy, Disease & Medication History (10 points)
 * Evaluates actual interview discovery (not just the student's safety form checkboxes)
 */
export function evaluateSafetyHistory(
  evidence: ExtractedEvidence,
  _caseDef: CaseDefinition,
  maxScore = 10
): CategoryScore {
  const evidenceList: string[] = [];
  const missingList: string[] = [];
  const notes: string[] = [];

  let earned = 0;

  // 1. Food Allergy (2 pts)
  if (evidence.interviewAllergyFoodAsked) {
    earned += 2;
    evidenceList.push('ได้สอบถามประวัติการแพ้อาหารในระหว่างการซักประวัติ');
  } else {
    missingList.push('ไม่ได้สอบถามประวัติการแพ้อาหารในบทสนทนา');
  }

  // 2. Drug Allergy (2 pts)
  if (evidence.interviewAllergyDrugAsked) {
    earned += 2;
    evidenceList.push('ได้สอบถามประวัติการแพ้ยาแผนปัจจุบันในระหว่างการซักประวัติ');
  } else {
    missingList.push('ไม่ได้สอบถามประวัติการแพ้ยาในบทสนทนา');
  }

  // 3. Herbal Allergy (2 pts)
  if (evidence.interviewAllergyHerbalAsked) {
    earned += 2;
    evidenceList.push('ได้สอบถามประวัติการแพ้ยาสมุนไพร/ยาแผนไทย');
  } else {
    missingList.push('ไม่ได้สอบถามประวัติการแพ้ยาสมุนไพรในบทสนทนา');
  }

  // 4. Underlying Disease (2 pts)
  if (evidence.interviewUnderlyingDiseaseAsked) {
    earned += 2;
    evidenceList.push('ได้สอบถามประวัติโรคประจำตัวในระหว่างการซักประวัติ');
  } else {
    missingList.push('ไม่ได้สอบถามโรคประจำตัวในบทสนทนา');
  }

  // 5. Current Medications / Supplements (2 pts)
  if (evidence.interviewMedicationsAsked) {
    earned += 2;
    evidenceList.push('ได้สอบถามประวัติการใช้ยาประจำ วิตามิน หรืออาหารเสริม');
  } else {
    missingList.push('ไม่ได้สอบถามประวัติการใช้ยา/อาหารเสริมในบทสนทนา');
  }

  const score = Math.min(Math.max(earned, 0), maxScore);

  return {
    id: 'allergy_disease_medication_history',
    number: 3,
    label: 'การสอบถามประวัติแพ้ โรคประจำตัว และยาที่ใช้',
    score,
    maxScore,
    evidence: evidenceList,
    missingCriteria: missingList,
    notes
  };
}
