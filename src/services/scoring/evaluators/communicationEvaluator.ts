import { CaseDefinition, CategoryScore } from '../../../types';
import { ExtractedEvidence } from '../evidenceExtractor';

/**
 * Category 1: Communication & Rapport (10 points)
 */
export function evaluateCommunication(
  evidence: ExtractedEvidence,
  _caseDef: CaseDefinition,
  maxScore = 10
): CategoryScore {
  const evidenceList: string[] = [];
  const missingList: string[] = [];
  const notes: string[] = [];

  let earned = 0;

  // 1. Greeting / Introduction (2 pts)
  if (evidence.hasGreetingOrIntro) {
    earned += 2;
    evidenceList.push('มีการทักทายและ/หรือแนะนำตัวอย่างเหมาะสม');
  } else {
    missingList.push('ไม่ได้กล่าวทักทายหรือแนะนำตัวในการเปิดการสนทนา');
  }

  // 2. Polite Language (2 pts)
  if (evidence.hasPoliteLanguage) {
    earned += 2;
    evidenceList.push(`ใช้คำสุภาพสม่ำเสมอ (พบคำลงท้ายสุภาพ ${evidence.politeWordCount} ครั้ง)`);
  } else if (evidence.politeWordCount >= 1) {
    earned += 1;
    evidenceList.push('มีการใช้คำสุภาพบ้างแต่ยังไม่สม่ำเสมอ');
    missingList.push('ควรเพิ่มการใช้คำลงท้ายสุภาพอย่างสม่ำเสมอตลอดการซักประวัติ');
  } else {
    missingList.push('ขาดการใช้คำลงท้ายสุภาพ (ครับ/ค่ะ)');
  }

  // 3. Permission / Rapport Building (2 pts)
  if (evidence.hasAskedPermissionOrRapport) {
    earned += 2;
    evidenceList.push('มีการขออนุญาตซักประวัติหรือสร้างสัมพันธภาพเบื้องต้น');
  } else {
    earned += 1; // partial credit if general conversation flowed smoothly
    missingList.push('ควรกล่าวขออนุญาตซักประวัติเพื่อสร้างความไว้วางใจให้แก่ผู้รับบริการ');
  }

  // 4. Appropriate Question Style / Interaction Flow (2 pts)
  if (evidence.studentMessages.length >= 3) {
    earned += 2;
    evidenceList.push('ตั้งคำถามอย่างต่อเนื่องและมีลำดับการสนทนาที่เหมาะสม');
  } else if (evidence.studentMessages.length >= 1) {
    earned += 1;
    missingList.push('จำนวนการซักถามน้อยเกินไปในการประเมินปฏิสัมพันธ์อย่างสมบูรณ์');
  } else {
    missingList.push('ไม่มีการซักถามข้อมูลจากผู้รับบริการ');
  }

  // 5. Closing Communication Behavior (2 pts)
  if (evidence.hasPoliteClosing) {
    earned += 2;
    evidenceList.push('มีคำพูดสรุป ให้กำลังใจ หรือกล่าวปิดการสนทนาอย่างสุภาพ');
  } else {
    missingList.push('ควรกล่าวปิดการสนทนา ให้กำลังใจ หรือแสดงความขอบคุณผู้รับบริการ');
  }

  const score = Math.min(Math.max(earned, 0), maxScore);

  return {
    id: 'communication_rapport',
    number: 1,
    label: 'การสื่อสารและการสร้างสัมพันธภาพ',
    score,
    maxScore,
    evidence: evidenceList,
    missingCriteria: missingList,
    notes
  };
}
