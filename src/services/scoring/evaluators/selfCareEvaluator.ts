import { CaseDefinition, CategoryScore } from '../../../types';
import { ExtractedEvidence } from '../evidenceExtractor';

/**
 * Category 7: Self-Care Guidance (10 points)
 */
export function evaluateSelfCare(
  evidence: ExtractedEvidence,
  _caseDef: CaseDefinition,
  maxScore = 10
): CategoryScore {
  const evidenceList: string[] = [];
  const missingList: string[] = [];
  const notes: string[] = [];

  const student = evidence.studentAnalysis;
  let earned = 0;

  // 1. Rest & Sleep Hygiene (3 pts)
  const rest = (student.restPlan || '').trim();
  const sleep = (student.sleepPlan || '').trim();
  if (rest.length >= 10 && sleep.length >= 10) {
    earned += 3;
    evidenceList.push('ให้คำแนะนำด้านการพักผ่อนและสุขอนามัยการนอนหลับอย่างเป็นรูปธรรม');
  } else if (rest.length > 0 || sleep.length > 0) {
    earned += 1.5;
    evidenceList.push('มีคำแนะนำการพักผ่อนหรือการนอนหลับ');
    missingList.push('ควรระบุทั้งแผนการพักผ่อนระหว่างวันและสุขอนามัยการนอนหลับให้ครบถ้วน');
  } else {
    missingList.push('ยังไม่ได้ระบุคำแนะนำด้านการพักผ่อนและการนอนหลับ');
  }

  // 2. Movement & Ruesi Dat Ton (3 pts)
  const movement = (student.movementPlan || '').trim();
  const datTon = (student.ruesiDatTonPlan || '').trim();
  if (movement.length >= 10 && datTon.length >= 8) {
    earned += 3;
    evidenceList.push('ระบุคำแนะนำการเคลื่อนไหว/ออกกำลังกาย และท่ากายบริหารฤๅษีดัดตนที่เหมาะสม');
  } else if (movement.length > 0 || datTon.length > 0) {
    earned += 1.5;
    evidenceList.push('มีคำแนะนำการออกกำลังกายหรือท่าฤๅษีดัดตน');
    missingList.push('ควรระบุท่ากายบริหารฤๅษีดัดตนที่สอดคล้องกับอาการและตำแหน่งของโรค');
  } else {
    missingList.push('ยังไม่ได้ระบุคำแนะนำการเคลื่อนไหวหรือท่าฤๅษีดัดตน');
  }

  // 3. Stress Management & Daily Living (2 pts)
  const stress = (student.stressManagement || '').trim();
  if (stress.length >= 10) {
    earned += 2;
    evidenceList.push('มีแนวทางการจัดการความเครียดและการปรับเปลี่ยนพฤติกรรมในชีวิตประจำวัน');
  } else if (stress.length > 0) {
    earned += 1;
    missingList.push('ควรเพิ่มรายละเอียดการจัดการความเครียด');
  } else {
    missingList.push('ยังไม่ได้ระบุคำแนะนำการจัดการความเครียด');
  }

  // 4. Clinical Rationale & Practical Feasibility (2 pts)
  const rationale = (student.selfCareRationale || '').trim();
  if (rationale.length >= 20) {
    earned += 2;
    evidenceList.push('มีเหตุผลอธิบายประโยชน์และความเป็นไปได้ในการปฏิบัติตนตามหลักการแพทย์แผนไทย');
  } else if (rationale.length > 0) {
    earned += 1;
    missingList.push('ควรอธิบายเหตุผลทางทฤษฎีของการดูแลตนเองให้ชัดเจนยิ่งขึ้น');
  } else {
    missingList.push('ขาดเหตุผลประกอบคำแนะนำการดูแลตนเอง');
  }

  const score = Math.min(Math.max(earned, 0), maxScore);

  return {
    id: 'self_care_guidance',
    number: 7,
    label: 'ความเหมาะสมของคำแนะนำด้านการดูแลสุขภาพ',
    score: Math.round(score * 2) / 2,
    maxScore,
    evidence: evidenceList,
    missingCriteria: missingList,
    notes
  };
}
