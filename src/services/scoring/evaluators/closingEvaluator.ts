import { CaseDefinition, CategoryScore } from '../../../types';
import { ExtractedEvidence } from '../evidenceExtractor';

/**
 * Category 9: Closing, Understanding & Time Management (5 points)
 */
export function evaluateClosing(
  evidence: ExtractedEvidence,
  _caseDef: CaseDefinition,
  maxScore = 5
): CategoryScore {
  const evidenceList: string[] = [];
  const missingList: string[] = [];
  const notes: string[] = [];

  const student = evidence.studentAnalysis;
  let earned = 0;

  // 1. Patient-Friendly Summary (1.5 pts)
  const summary = (student.summaryForPatient || '').trim();
  if (summary.length >= 25) {
    earned += 1.5;
    evidenceList.push('สรุปสาระสำคัญสำหรับผู้รับบริการด้วยภาษาที่เข้าใจง่ายและกระชับ');
  } else if (summary.length > 0) {
    earned += 0.5;
    missingList.push('ควรสรุปสาระสำคัญให้ครอบคลุมทั้งอาหาร การพักผ่อน และข้อควรระวัง');
  } else {
    missingList.push('ยังไม่ได้ระบุข้อความสรุปสำหรับผู้รับบริการ');
  }

  // 2. Understanding Check / Teach-Back (1.5 pts)
  const teachBack = (student.understandingCheckMethod || '').trim();
  if (teachBack.length >= 15) {
    earned += 1.5;
    evidenceList.push('มีวิธีการตรวจสอบความเข้าใจ (Teach-Back Method) อย่างชัดเจนและเหมาะสม');
  } else if (teachBack.length > 0) {
    earned += 0.5;
    missingList.push('ควรระบุคำถามหรือวิธีตรวจสอบความเข้าใจของผู้รับบริการให้เป็นรูปธรรม');
  } else {
    missingList.push('ขาดการระบุวิธีตรวจสอบความเข้าใจของผู้รับบริการ');
  }

  // 3. Follow-up Plan (1 pt)
  const followUp = (student.followUpPlan || '').trim();
  if (followUp.length >= 15) {
    earned += 1;
    evidenceList.push('วางแผนการติดตามผล กำหนดระยะเวลา และตัวชี้วัดการเปลี่ยนแปลงที่ชัดเจน');
  } else if (followUp.length > 0) {
    earned += 0.5;
    missingList.push('ควรระบุระยะเวลานัดหมายติดตามผลให้แน่ชัด (เช่น 2-4 สัปดาห์)');
  } else {
    missingList.push('ยังไม่ได้ระบุแผนการติดตามผล');
  }

  // 4. Time Management (1 pt)
  if (evidence.mode === 'training') {
    earned += 1;
    evidenceList.push('โหมดฝึกฝน (Training): บริหารเวลาและทำกิจกรรมครบถ้วน');
  } else {
    // Assessment mode
    if (evidence.completedWithinTime) {
      earned += 1;
      evidenceList.push('โหมดประเมิน (Assessment): ซักประวัติและส่งคำตอบเสร็จสิ้นภายในเวลาที่กำหนด');
    } else {
      missingList.push('โหมดประเมิน (Assessment): ใช้เวลาเกินกรอบเวลาที่กำหนดไว้');
    }
  }

  const score = Math.min(Math.max(earned, 0), maxScore);

  return {
    id: 'closing_understanding_time',
    number: 9,
    label: 'การสรุป ตรวจสอบความเข้าใจ และบริหารเวลา',
    score: Math.round(score * 2) / 2,
    maxScore,
    evidence: evidenceList,
    missingCriteria: missingList,
    notes
  };
}
