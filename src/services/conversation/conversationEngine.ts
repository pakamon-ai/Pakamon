/**
 * Main Virtual Patient Conversation Engine.
 * Fully deterministic, rule-based Thai history taking simulation engine.
 * No external API, no login, no generative hallucinations.
 */

import { Attempt, CaseDefinition, ChatMessage } from '../../types';
import { matchCategory, InterviewCategory, CategoryMatchResult } from './categoryMatcher';
import { validateStudentInput } from './normalizeInput';
import { matchResponseRules, RuleMatchOutcome } from './responseRuleMatcher';
import { evaluateDisclosure, GuardEvaluation } from './disclosureGuard';
import { buildPersonaResponse } from './personaResponseBuilder';

export interface ProcessTurnResult {
  success: boolean;
  errorMessage?: string;
  updatedAttempt: Attempt;
  studentMessage?: ChatMessage;
  patientMessage?: ChatMessage;
  matchResult?: CategoryMatchResult;
  disclosedFactIds: string[];
}

/**
 * Extract last matched category from previous patient/student turns for clarification context
 */
function extractLastCategory(transcript: ChatMessage[]): InterviewCategory | undefined {
  if (!transcript || transcript.length === 0) return undefined;

  for (let i = transcript.length - 1; i >= 0; i--) {
    const msg = transcript[i];
    if (msg.matchedCategory && msg.matchedCategory !== 'unknown' && msg.matchedCategory !== 'clarification') {
      return msg.matchedCategory as InterviewCategory;
    }
  }

  return undefined;
}

/**
 * Process a student question turn against the case definition and update the attempt.
 */
export function processStudentTurn(
  caseDef: CaseDefinition,
  currentAttempt: Attempt,
  rawStudentInput: string
): ProcessTurnResult {
  // 1. Validate student input
  const validation = validateStudentInput(rawStudentInput);
  if (!validation.isValid) {
    return {
      success: false,
      errorMessage: validation.error || 'ข้อความไม่ถูกต้อง',
      updatedAttempt: currentAttempt,
      disclosedFactIds: []
    };
  }

  const normalizedInput = validation.normalizedText;
  const lastCategory = extractLastCategory(currentAttempt.transcript);

  // 2. Match Category
  const matchResult = matchCategory(normalizedInput, lastCategory);

  // 3. Match Response Rules & Facts
  const ruleOutcome: RuleMatchOutcome = matchResponseRules(caseDef, normalizedInput, matchResult);

  // 4. Evaluate Disclosure Guard
  const guardEval: GuardEvaluation = evaluateDisclosure(caseDef, matchResult, ruleOutcome.candidateFacts);

  // 5. Build Persona Response
  const patientReplyText = buildPersonaResponse({
    caseDef,
    matchResult,
    matchedRule: ruleOutcome.primaryRule,
    allowedFacts: guardEval.allowedFacts
  });

  // 6. Create Message Objects
  const now = new Date();
  const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

  const studentMsg: ChatMessage = {
    id: `msg-student-${Date.now()}`,
    sender: 'student',
    text: validation.cleanDisplay,
    timestamp: timeStr,
    matchedCategory: matchResult.primaryCategory,
    matchedCategories: matchResult.matchedCategories,
    matchedFactIds: guardEval.allowedFactIds,
    disclosedFactIds: guardEval.allowedFactIds
  };

  const patientMsg: ChatMessage = {
    id: `msg-patient-${Date.now() + 1}`,
    sender: 'patient',
    text: patientReplyText,
    timestamp: timeStr,
    matchedCategory: matchResult.primaryCategory,
    matchedCategories: matchResult.matchedCategories,
    matchedFactIds: guardEval.allowedFactIds,
    disclosedFactIds: guardEval.allowedFactIds
  };

  // 7. Update Attempt Discovered Facts & Categories
  const existingFactsSet = new Set(currentAttempt.discoveredFacts || []);
  guardEval.allowedFactIds.forEach(id => existingFactsSet.add(id));

  const existingCategoriesSet = new Set(currentAttempt.discoveredCategories || []);
  if (matchResult.primaryCategory !== 'unknown' && matchResult.primaryCategory !== 'clarification') {
    matchResult.matchedCategories.forEach(cat => existingCategoriesSet.add(cat));
  }

  const updatedAttempt: Attempt = {
    ...currentAttempt,
    transcript: [...currentAttempt.transcript, studentMsg, patientMsg],
    discoveredFacts: Array.from(existingFactsSet),
    discoveredCategories: Array.from(existingCategoriesSet)
  };

  return {
    success: true,
    updatedAttempt,
    studentMessage: studentMsg,
    patientMessage: patientMsg,
    matchResult,
    disclosedFactIds: guardEval.allowedFactIds
  };
}
