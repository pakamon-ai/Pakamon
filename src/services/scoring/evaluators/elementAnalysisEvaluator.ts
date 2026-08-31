import { CaseDefinition, CategoryScore } from '../../../types';
import { ExtractedEvidence } from '../evidenceExtractor';

function normalizeElement(str: string): string {
  if (!str) return '';
  const s = str.toLowerCase();
  if (s.includes('ปฐวี') || s.includes('ดิน') || s.includes('earth')) return 'earth';
  if (s.includes('อาโป') || s.includes('น้ำ') || s.includes('water')) return 'water';
  if (s.includes('วาโย') || s.includes('ลม') || s.includes('wind')) return 'wind';
  if (s.includes('เตโช') || s.includes('ไฟ') || s.includes('fire')) return 'fire';
  return s.trim();
}

/**
 * Category 4: Element Analysis (15 points)
 */
export function evaluateElementAnalysis(
  evidence: ExtractedEvidence,
  caseDef: CaseDefinition,
  maxScore = 15
): CategoryScore {
  const evidenceList: string[] = [];
  const missingList: string[] = [];
  const notes: string[] = [];

  const student = evidence.studentAnalysis;
  const key = caseDef.elementAnalysisKey;

  let earned = 0;

  // 1. Birth Element (3 pts)
  const studentBirth = normalizeElement(student.birthElement);
  const expectedBirth = normalizeElement(key.birthElement);

  if (studentBirth && studentBirth === expectedBirth) {
    earned += 3;
    evidenceList.push(`ระบุธาตุกำเนิดถูกต้อง (${student.birthElement})`);
  } else if (student.birthElement?.trim().length > 0) {
    earned += 1; // partial credit for entering an element
    missingList.push(`ธาตุกำเนิดที่ระบุ (${student.birthElement}) ยังไม่สอดคล้องกับเดือนเกิดของผู้รับบริการ`);
  } else {
    missingList.push('ยังไม่ได้ระบุธาตุกำเนิด');
  }

  // 2. Dominant / Current Element (3 pts)
  const studentDominant = normalizeElement(student.dominantElement);
  const studentCurrent = normalizeElement(student.currentElement);
  const expectedDominant = normalizeElement(key.dominantElement);
  const expectedState = normalizeElement(key.currentElementState);

  const matchedDominant = studentDominant && (studentDominant === expectedDominant || expectedDominant.includes(studentDominant));
  const matchedCurrent = studentCurrent && (studentCurrent === expectedState || expectedState.includes(studentCurrent));

  if (matchedDominant && matchedCurrent) {
    earned += 3;
    evidenceList.push(`ระบุธาตุเด่นและธาตุปัจจุบันได้ถูกต้อง (${student.dominantElement} / ${student.currentElement})`);
  } else if (matchedDominant || matchedCurrent) {
    earned += 2;
    evidenceList.push(`ระบุธาตุที่เกี่ยวข้องได้ถูกต้องบางส่วน (${student.dominantElement || student.currentElement})`);
    missingList.push('ควรระบุทั้งธาตุเด่นและธาตุที่มีความผิดปกติในปัจจุบันให้ครบถ้วน');
  } else if (student.dominantElement || student.currentElement) {
    earned += 1;
    missingList.push('ธาตุเด่นหรือธาตุปัจจุบันยังไม่ตรงกับอาการสำคัญของผู้รับบริการ');
  } else {
    missingList.push('ยังไม่ได้ระบุธาตุเด่นหรือธาตุปัจจุบัน');
  }

  // 3. Element Condition (กำเริบ / หย่อน / พิการ) (3 pts)
  const studentConditions = student.elementCondition || [];
  const expectedStateText = (key.currentElementState || '').toLowerCase();
  
  let conditionPoints = 0;
  if (studentConditions.length > 0) {
    const hasAggravated = studentConditions.includes('กำเริบ') && (expectedStateText.includes('กำเริบ') || (key.possibleAggravatedElements && key.possibleAggravatedElements.length > 0));
    const hasDeficient = studentConditions.includes('หย่อน') && (expectedStateText.includes('หย่อน') || (key.possibleDeficientElements && key.possibleDeficientElements.length > 0));
    const hasDisordered = studentConditions.includes('พิการ') && (expectedStateText.includes('พิการ') || (key.possibleDisorderedElements && key.possibleDisorderedElements.length > 0));

    if (hasAggravated || hasDeficient || hasDisordered) {
      conditionPoints = 3;
      evidenceList.push(`ระบุภาวะธาตุได้ถูกต้อง (${studentConditions.join(', ')})`);
    } else {
      conditionPoints = 1.5;
      evidenceList.push(`มีการระบุภาวะธาตุ (${studentConditions.join(', ')})`);
      missingList.push('ภาวะธาตุที่เลือกยังไม่สอดคล้องกับพยาธิสภาพของโรคอย่างสมบูรณ์');
    }
  } else {
    missingList.push('ยังไม่ได้เลือกภาวะธาตุ (กำเริบ / หย่อน / พิการ)');
  }
  earned += conditionPoints;

  // 4. Supporting Evidence Cited (3 pts)
  const supportingReasons = (student.supportingReasons || '').toLowerCase();
  let citedCount = 0;
  const expectedSupporting = key.supportingEvidence || [];
  
  expectedSupporting.forEach((ev) => {
    const words = ev.split(/[\s,]+/);
    const hasMatch = words.some((w) => w.length > 3 && supportingReasons.includes(w.toLowerCase()));
    if (hasMatch) citedCount++;
  });

  if (supportingReasons.length >= 40 || citedCount >= 2) {
    earned += 3;
    evidenceList.push('มีข้อมูลหลักฐานและอาการสนับสนุนการวิเคราะห์ธาตุอย่างหนักแน่น');
  } else if (supportingReasons.length >= 15 || citedCount >= 1) {
    earned += 1.5;
    evidenceList.push('มีข้อมูลสนับสนุนบางส่วน');
    missingList.push('ควรเพิ่มรายละเอียดหลักฐานจากประวัติและอาการสนับสนุนการวิเคราะห์ธาตุ');
  } else {
    missingList.push('ขาดข้อมูลหรือหลักฐานสนับสนุนเหตุผลการวิเคราะห์ธาตุ');
  }

  // 5. Theoretical Reasoning Consistency (3 pts)
  if (supportingReasons.length >= 30 && (student.relatedFactors || '').length >= 10) {
    earned += 3;
    evidenceList.push('เหตุผลทางทฤษฎีการแพทย์แผนไทยมีความสอดคล้องและเป็นเหตุเป็นผล');
  } else if (supportingReasons.length >= 15) {
    earned += 1.5;
    missingList.push('ควรเขียนอธิบายเหตุผลทางทฤษฎีเชื่อมโยงให้ชัดเจนยิ่งขึ้น');
  } else {
    missingList.push('ขาดการอธิบายเหตุผลทางทฤษฎีการแพทย์แผนไทย');
  }

  const score = Math.min(Math.max(earned, 0), maxScore);

  return {
    id: 'element_analysis',
    number: 4,
    label: 'ความถูกต้องและเหตุผลของการวิเคราะห์ธาตุเจ้าเรือน',
    score: Math.round(score * 2) / 2,
    maxScore,
    evidence: evidenceList,
    missingCriteria: missingList,
    notes
  };
}
