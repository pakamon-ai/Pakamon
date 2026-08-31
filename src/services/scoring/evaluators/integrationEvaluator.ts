import { CaseDefinition, CategoryScore } from '../../../types';
import { ExtractedEvidence } from '../evidenceExtractor';

/**
 * Category 5: Element, Behavior & Health Integration (10 points)
 */
export function evaluateIntegration(
  evidence: ExtractedEvidence,
  _caseDef: CaseDefinition,
  maxScore = 10
): CategoryScore {
  const evidenceList: string[] = [];
  const missingList: string[] = [];
  const notes: string[] = [];

  const student = evidence.studentAnalysis;
  const factorsText = (student.relatedFactors || '').toLowerCase();
  const reasonsText = (student.supportingReasons || '').toLowerCase();
  const combinedText = `${factorsText} ${reasonsText}`;

  let earned = 0;

  // 1. Relevant Factors Identification (4 pts)
  // Factors: age/วัย, season/ฤดู/กาล, place/ประเทศ/ถิ่น, behavior/พฤติกรรม (อาหาร, นอน, งาน, เครียด)
  let identifiedFactorsCount = 0;
  if (combinedText.includes('วัย') || combinedText.includes('อายุ') || combinedText.includes('ปฐมวัย') || combinedText.includes('มัชฌิมวัย') || combinedText.includes('ปัจฉิมวัย')) {
    identifiedFactorsCount++;
  }
  if (combinedText.includes('ฤดู') || combinedText.includes('กาล') || combinedText.includes('คิมหันต์') || combinedText.includes('วสันต์') || combinedText.includes('เหมันต์') || combinedText.includes('อากาศ')) {
    identifiedFactorsCount++;
  }
  if (combinedText.includes('ถิ่น') || combinedText.includes('ประเทศ') || combinedText.includes('แอร์') || combinedText.includes('ที่ทำงาน') || combinedText.includes('สภาพแวดล้อม')) {
    identifiedFactorsCount++;
  }
  if (combinedText.includes('อาหาร') || combinedText.includes('น้ำ') || combinedText.includes('นอน') || combinedText.includes('นั่ง') || combinedText.includes('เครียด') || combinedText.includes('งาน')) {
    identifiedFactorsCount++;
  }

  if (identifiedFactorsCount >= 3) {
    earned += 4;
    evidenceList.push('ระบุปัจจัยสมุฏฐานที่เกี่ยวข้อง (ช่วงวัย กาลฤดู ถิ่นที่อยู่ พฤติกรรม) ได้ครอบคลุม');
  } else if (identifiedFactorsCount >= 2) {
    earned += 2.5;
    evidenceList.push('ระบุปัจจัยสมุฏฐานได้หลายมิติ');
    missingList.push('สามารถระบุปัจจัยสมุฏฐานเพิ่มเติม เช่น กาลสมุฏฐาน หรือประเทศสมุฏฐาน');
  } else if (identifiedFactorsCount >= 1 || factorsText.length > 10) {
    earned += 1.5;
    missingList.push('ควรระบุและจำแนกปัจจัยสมุฏฐานที่เกี่ยวข้องให้ครบถ้วนยิ่งขึ้น');
  } else {
    missingList.push('ยังไม่ได้ระบุปัจจัยสมุฏฐานที่สัมพันธ์กับอาการผิดปกติ');
  }

  // 2. Connection to Element & Health Issue (4 pts)
  if (combinedText.length >= 50 && identifiedFactorsCount >= 2) {
    earned += 4;
    evidenceList.push('อธิบายการเชื่อมโยงระหว่างพฤติกรรม/สิ่งแวดล้อมกับภาวะความไม่สมดุลของธาตุได้อย่างชัดเจน');
  } else if (combinedText.length >= 25) {
    earned += 2;
    evidenceList.push('มีการเชื่อมโยงพฤติกรรมกับอาการเบื้องต้น');
    missingList.push('ควรเชื่อมโยงให้เห็นกลไกที่พฤติกรรมกระทบต่อธาตุจนเกิดอาการผิดปกติ');
  } else {
    missingList.push('ขาดการเชื่อมโยงความสัมพันธ์ระหว่างพฤติกรรมกับพยาธิสภาพของธาตุ');
  }

  // 3. Reasoning Coherence (2 pts)
  if (factorsText.length >= 20 || combinedText.length >= 40) {
    earned += 2;
    evidenceList.push('การเรียบเรียงเหตุผลมีความสอดคล้องต่อเนื่อง');
  } else if (factorsText.length > 0) {
    earned += 1;
  } else {
    missingList.push('ควรเขียนอธิบายเหตุผลให้สมบูรณ์และเป็นรูปธรรม');
  }

  const score = Math.min(Math.max(earned, 0), maxScore);

  return {
    id: 'element_behavior_health_integration',
    number: 5,
    label: 'การเชื่อมโยงธาตุ พฤติกรรม และปัญหาสุขภาพ',
    score: Math.round(score * 2) / 2,
    maxScore,
    evidence: evidenceList,
    missingCriteria: missingList,
    notes
  };
}
