import { CaseDefinition, CategoryScore } from '../../../types';
import { ExtractedEvidence } from '../evidenceExtractor';

/**
 * Category 8: Safety, Red Flags & Referral (10 points)
 */
export function evaluateSafetyAndReferral(
  evidence: ExtractedEvidence,
  caseDef: CaseDefinition,
  maxScore = 10
): { categoryScore: CategoryScore; safetyIssues: string[]; hasCriticalSafetyIssue: boolean } {
  const evidenceList: string[] = [];
  const missingList: string[] = [];
  const notes: string[] = [];
  const safetyIssues: string[] = [];
  let hasCriticalSafetyIssue = false;

  const student = evidence.studentAnalysis;
  const safety = caseDef.safetyCriteria;

  let earned = 0;

  // 1. Safety Review & Contraindications (3 pts)
  const contraindications = (student.contraindications || '').trim();
  const allAllergiesReviewed = student.foodAllergyReviewed && student.drugAllergyReviewed && student.herbalAllergyReviewed;

  if (allAllergiesReviewed && contraindications.length >= 10) {
    earned += 3;
    evidenceList.push('ทบทวนประวัติการแพ้ครบทุกหมวด และระบุข้อห้าม/ข้อควรระวังชัดเจน');
  } else if (allAllergiesReviewed || contraindications.length > 0) {
    earned += 1.5;
    evidenceList.push('มีการทบทวนประวัติการแพ้และข้อห้ามบางส่วน');
    missingList.push('ควรระบุข้อห้ามหรือข้อควรระวังทางคลินิกให้ชัดเจนยิ่งขึ้น');
  } else {
    missingList.push('ยังไม่ได้ทบทวนข้อห้ามและข้อควรระวังอย่างครบถ้วน');
  }

  // 2. Red Flags Recognition (3 pts)
  const redFlags = (student.redFlags || '').trim();
  if (student.redFlagsReviewed && redFlags.length >= 10) {
    earned += 3;
    evidenceList.push('ระบุสัญญาณเตือนอันตราย (Red Flags) และอาการที่ต้องเฝ้าระวังได้อย่างถูกต้อง');
  } else if (student.redFlagsReviewed || redFlags.length > 0) {
    earned += 1.5;
    evidenceList.push('มีการประเมินสัญญาณเตือนอันตราย');
    missingList.push('ควรอธิบายรายละเอียดอาการ Red Flags ที่ต้องรีบพบแพทย์');
  } else {
    missingList.push('ขาดการประเมินสัญญาณเตือนอันตราย (Red Flags)');
  }

  // 3. Referral Decision (2 pts)
  const studentReferral = student.shouldRefer;
  const expectedReferralRequired = safety.referralRequired;
  const expectedReferralAnswer = expectedReferralRequired ? 'yes' : 'no';

  let referralDecisionCorrect = false;
  if (studentReferral === expectedReferralAnswer) {
    earned += 2;
    referralDecisionCorrect = true;
    evidenceList.push(
      expectedReferralRequired
        ? 'ตัดสินใจส่งต่อพบแพทย์แผนปัจจุบันอย่างถูกต้องเนื่องจากมีข้อบ่งชี้'
        : 'ตัดสินใจดูแลตนเองเบื้องต้นได้ถูกต้องเนื่องจากไม่มีสัญญาณอันตราย'
    );
  } else if (studentReferral === 'undecided') {
    missingList.push('ยังไม่ได้ตัดสินใจว่าจะส่งต่อผู้รับบริการหรือไม่');
  } else {
    // Incorrect decision
    if (expectedReferralRequired && studentReferral === 'no') {
      hasCriticalSafetyIssue = true;
      safetyIssues.push('กรณีศึกษานี้จำเป็นต้องส่งต่อแพทย์แผนปัจจุบันทันที แต่นักศึกษาตัดสินใจไม่ส่งต่อ');
      missingList.unshift('ตัดสินใจไม่ส่งต่อ ทั้งที่มีข้อบ่งชี้หรือสัญญาณอันตรายจำเป็นต้องส่งต่อ');
    } else {
      missingList.push('การตัดสินใจส่งต่อยังไม่ตรงกับข้อบ่งชี้ของกรณีศึกษา (สามารถดูแลและปรับสมดุลธาตุเบื้องต้นได้)');
    }
  }

  // 4. Referral Reasoning (2 pts)
  const referralReason = (student.referralReason || '').trim();
  if (referralDecisionCorrect && referralReason.length >= 15) {
    earned += 2;
    evidenceList.push('มีเหตุผลประกอบการตัดสินใจส่งต่อ/ไม่ส่งต่อที่สมเหตุสมผลตามเกณฑ์');
  } else if (referralReason.length > 0) {
    earned += 1;
    missingList.push('ควรอธิบายเกณฑ์และเหตุผลในการส่งต่อให้รัดกุมยิ่งขึ้น');
  } else {
    missingList.push('ขาดเหตุผลประกอบการตัดสินใจส่งต่อ');
  }

  // Check critical safety omissions in interview
  if (!evidence.interviewAllergyDrugAsked && safety.drugAllergy && !safety.drugAllergy.includes('ไม่มี')) {
    hasCriticalSafetyIssue = true;
    safetyIssues.push(`ผู้รับบริการมีประวัติแพ้ยา (${safety.drugAllergy}) แต่นักศึกษาไม่ได้สอบถามในระหว่างการซักประวัติ`);
  }

  if (!evidence.interviewAllergyFoodAsked && safety.foodAllergy && !safety.foodAllergy.includes('ไม่มี')) {
    hasCriticalSafetyIssue = true;
    safetyIssues.push(`ผู้รับบริการมีประวัติแพ้อาหาร (${safety.foodAllergy}) แต่นักศึกษาไม่ได้สอบถามในระหว่างการซักประวัติ`);
  }

  const score = Math.min(Math.max(earned, 0), maxScore);

  return {
    categoryScore: {
      id: 'safety_red_flags_referral',
      number: 8,
      label: 'ข้อควรระวัง อาการอันตราย และการส่งต่อ',
      score: Math.round(score * 2) / 2,
      maxScore,
      evidence: evidenceList,
      missingCriteria: missingList,
      notes
    },
    safetyIssues,
    hasCriticalSafetyIssue
  };
}
