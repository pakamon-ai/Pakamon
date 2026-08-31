/**
 * Persona Response Builder: Assembles natural, conversational first-person responses
 * conforming to the patient's age, sex, speech style, and personality.
 */

import { CaseDefinition, HiddenFactItem, ResponseRule } from '../../types';
import { CategoryMatchResult } from './categoryMatcher';
import { sanitizePatientUtterance } from './disclosureGuard';
import { buildFallbackResponse } from './fallbackResponse';

export interface ResponseBuilderParams {
  caseDef: CaseDefinition;
  matchResult: CategoryMatchResult;
  matchedRule?: ResponseRule;
  allowedFacts: HiddenFactItem[];
}

/**
 * Builds the final patient spoken reply.
 */
export function buildPersonaResponse(params: ResponseBuilderParams): string {
  const { caseDef, matchResult, matchedRule, allowedFacts } = params;
  const isMale = caseDef.patientProfile.sex === 'male';
  const particle = isMale ? 'ครับ' : 'ค่ะ';
  const selfPronoun = isMale ? 'ผม' : 'ดิฉัน';

  // 1. Rapport handling
  if (matchResult.primaryCategory === 'rapport') {
    return buildFallbackResponse(caseDef, 'rapport');
  }

  // 2. Unknown handling
  if (matchResult.primaryCategory === 'unknown' || (allowedFacts.length === 0 && !matchedRule)) {
    return buildFallbackResponse(caseDef, 'unknown');
  }

  // 3. If explicit matchedRule has responseVariants, pick a relevant variant
  if (matchedRule && matchedRule.responseVariants && matchedRule.responseVariants.length > 0) {
    // Choose variant deterministically or based on keyword match
    const variant = matchedRule.responseVariants[0];
    return sanitizePatientUtterance(variant);
  }

  // 4. Stitched facts response
  if (allowedFacts.length > 0) {
    if (allowedFacts.length === 1) {
      const fact = allowedFacts[0];
      // Format single fact naturally
      let text = fact.value;
      if (!text.endsWith('ครับ') && !text.endsWith('ค่ะ')) {
        text = `${text} ${particle}`;
      }
      return sanitizePatientUtterance(text);
    }

    // Multiple facts (compound or detailed category)
    const combinedTexts = allowedFacts.map(f => f.value.trim());
    let combined = combinedTexts.join(' และ ');
    if (!combined.endsWith('ครับ') && !combined.endsWith('ค่ะ')) {
      combined = `${combined} ${particle}`;
    }
    return sanitizePatientUtterance(combined);
  }

  return buildFallbackResponse(caseDef, 'unknown');
}
