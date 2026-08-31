/**
 * Disclosure Guard: Enforces simulation boundaries and prevents accidental answer key leaks.
 * - Prevents over-disclosure on broad questions.
 * - Controls fact granularity (broad vs specific).
 * - Sanitizes patient responses to ensure no diagnostic clinical terms or TTM element analysis keys leak.
 */

import { CaseDefinition, HiddenFactItem } from '../../types';
import { CategoryMatchResult, InterviewCategory } from './categoryMatcher';
import { resolveFactsByCategory } from './factResolver';

export interface GuardEvaluation {
  allowedFactIds: string[];
  allowedFacts: HiddenFactItem[];
  disclosureMode: 'broad_overview' | 'focused' | 'compound' | 'rapport' | 'unknown_guarded';
  sanitizedPatientText?: string;
}

/**
 * Filter facts to be disclosed based on student query matching specificity.
 */
export function evaluateDisclosure(
  caseDef: CaseDefinition,
  matchResult: CategoryMatchResult,
  candidateFacts: HiddenFactItem[]
): GuardEvaluation {
  // 1. Rapport / greeting questions
  if (matchResult.primaryCategory === 'rapport') {
    return {
      allowedFactIds: [],
      allowedFacts: [],
      disclosureMode: 'rapport'
    };
  }

  // 2. Unknown / unmatchable queries
  if (matchResult.primaryCategory === 'unknown') {
    return {
      allowedFactIds: [],
      allowedFacts: [],
      disclosureMode: 'unknown_guarded'
    };
  }

  // 3. Broad overview question (e.g. "สุขภาพเป็นยังไงบ้าง", "เป็นอะไร")
  if (matchResult.specificity === 'broad' && !matchResult.isCompound) {
    // Only disclose chief concern facts or 1 presenting fact
    const presenting = resolveFactsByCategory(caseDef, 'chief_concern');
    const essentialOnly = (presenting.length > 0 ? presenting : candidateFacts).filter(
      f => f.importance === 'essential' || f.category === 'presentingConcern'
    );

    const chosen = essentialOnly.slice(0, 1);
    return {
      allowedFactIds: chosen.map(f => f.id),
      allowedFacts: chosen,
      disclosureMode: 'broad_overview'
    };
  }

  // 4. Compound questions (e.g. "มีโรคประจำตัวหรือทานยาอะไรไหม")
  if (matchResult.isCompound) {
    const allowed: HiddenFactItem[] = [];
    for (const cat of matchResult.matchedCategories) {
      const catFacts = resolveFactsByCategory(caseDef, cat);
      if (catFacts.length > 0) {
        allowed.push(catFacts[0]); // Take top 1 representative fact per category in compound question
      }
    }

    return {
      allowedFactIds: allowed.map(f => f.id),
      allowedFacts: allowed,
      disclosureMode: 'compound'
    };
  }

  // 5. Focused category or specific question
  // Disclose all matching candidate facts for this category (max 2)
  const allowed = candidateFacts.slice(0, 2);

  return {
    allowedFactIds: allowed.map(f => f.id),
    allowedFacts: allowed,
    disclosureMode: 'focused'
  };
}

/**
 * Sanitizes any patient speech to strictly prevent clinical leaks:
 * - Strips any mentions of "ธาตุกำเนิด", "ธาตุเจ้าเรือน", "กำเริบ", "หย่อน", "พิการ" from patient's mouth.
 */
export function sanitizePatientUtterance(rawText: string): string {
  if (!rawText) return '';

  return rawText
    .replace(/ธาตุ(เจ้าเรือน)?(กำเนิด|ปัจจุบัน)?\s*(กำเริบ|หย่อน|พิการ|ปกติ)/g, 'อาการไม่ค่อยสบาย')
    .replace(/ตามหลักการแพทย์แผนไทย/g, 'ตามที่สังเกตตัวเอง')
    .replace(/รูบริก|คะแนน|ข้อสอบ|OSCE|rubric/gi, '');
}
