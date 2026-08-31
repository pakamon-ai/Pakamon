import { CaseDefinition, CategoryScore } from '../../../types';
import { ExtractedEvidence } from '../evidenceExtractor';

/**
 * Category 2: Interview Completeness & Sequence (15 points)
 */
export function evaluateInterviewCompleteness(
  evidence: ExtractedEvidence,
  caseDef: CaseDefinition,
  maxScore = 15
): CategoryScore {
  const evidenceList: string[] = [];
  const missingList: string[] = [];
  const notes: string[] = [];

  const checklist = evidence.checklistMatchResults || [];

  if (checklist.length === 0) {
    return {
      id: 'interview_completeness_sequence',
      number: 2,
      label: 'ความครบถ้วนและลำดับของการซักประวัติ',
      score: 0,
      maxScore,
      evidence: [],
      missingCriteria: ['ไม่พบเกณฑ์รายการตรวจสอบการซักประวัติในกรณีศึกษา'],
      notes: ['Missing checklist configuration']
    };
  }

  // Weight calculations: essential = 3, important = 2, supporting = 1
  let totalMaxWeight = 0;
  let earnedWeight = 0;

  checklist.forEach((item) => {
    let weight = 1;
    if (item.importance === 'essential') weight = 3;
    else if (item.importance === 'important') weight = 2;

    totalMaxWeight += weight;

    if (item.isFullyCovered) {
      earnedWeight += weight;
      evidenceList.push(`ซักประวัติครอบคลุมหัวข้อ: ${item.category}`);
    } else if (item.isPartiallyCovered) {
      earnedWeight += weight * 0.5;
      evidenceList.push(`ซักประวัติได้บางส่วนในหัวข้อ: ${item.category}`);
      missingList.push(`ยังซักประวัติไม่ครบทุกประเด็นย่อยใน: ${item.category}`);
    } else {
      missingList.push(`ขาดการซักประวัติในหัวข้อ: ${item.category} (${item.importance === 'essential' ? 'จำเป็นยิ่ง' : 'สำคัญ'})`);
    }
  });

  // Calculate base score out of 13
  const coverageProportion = totalMaxWeight > 0 ? earnedWeight / totalMaxWeight : 0;
  let coverageScore = coverageProportion * 13;

  // Sequence check (2 points)
  let sequenceScore = 0;
  if (evidence.studentMessages.length >= 2) {
    sequenceScore += 1;
    evidenceList.push('มีลำดับขั้นตอนการเริ่มซักประวัติจากอาการสำคัญก่อน');
  }
  if (evidence.discoveredFactIds.size > 0) {
    sequenceScore += 1;
    evidenceList.push('สามารถสืบค้นข้อเท็จจริงสำคัญก่อนทำการสรุปผล');
  } else {
    missingList.push('ควรสอบถามข้อมูลสำคัญให้ครบถ้วนก่อนการวิเคราะห์');
  }

  let totalScore = Math.round((coverageScore + sequenceScore) * 2) / 2; // round to nearest 0.5
  totalScore = Math.min(Math.max(totalScore, 0), maxScore);

  return {
    id: 'interview_completeness_sequence',
    number: 2,
    label: 'ความครบถ้วนและลำดับของการซักประวัติ',
    score: totalScore,
    maxScore,
    evidence: evidenceList,
    missingCriteria: missingList,
    notes
  };
}
