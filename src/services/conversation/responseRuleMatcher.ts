/**
 * Response Rule Matcher: Matches user queries to explicit ResponseRules defined in CaseDefinition.
 * Falls back dynamically to facts from factResolver if explicit rule is not defined.
 */

import { CaseDefinition, HiddenFactItem, ResponseRule } from '../../types';
import { CategoryMatchResult, InterviewCategory } from './categoryMatcher';
import { resolveFactsByCategory, resolveFactsByIds } from './factResolver';

export interface RuleMatchOutcome {
  matchedRules: ResponseRule[];
  candidateFacts: HiddenFactItem[];
  primaryRule?: ResponseRule;
  matchScore: number;
}

/**
 * Matches normalized query and CategoryMatchResult against caseDefinition.responseRules
 */
export function matchResponseRules(
  caseDef: CaseDefinition,
  normalizedText: string,
  matchResult: CategoryMatchResult
): RuleMatchOutcome {
  const rules = caseDef.responseRules || [];
  const matchedRules: { rule: ResponseRule; score: number }[] = [];

  for (const rule of rules) {
    let score = 0;

    // Check category match
    if (
      rule.category === matchResult.primaryCategory ||
      matchResult.matchedCategories.includes(rule.category as InterviewCategory)
    ) {
      score += 10;
    }

    // Check keyword matches
    if (Array.isArray(rule.keywords)) {
      for (const kw of rule.keywords) {
        if (normalizedText.includes(kw.toLowerCase())) {
          score += 5;
        }
      }
    }

    // Check synonyms
    if (Array.isArray(rule.synonyms)) {
      for (const syn of rule.synonyms) {
        if (normalizedText.includes(syn.toLowerCase())) {
          score += 3;
        }
      }
    }

    // Check patterns
    if (Array.isArray(rule.patterns)) {
      for (const pat of rule.patterns) {
        if (normalizedText.includes(pat.toLowerCase())) {
          score += 4;
        }
      }
    }

    if (score >= 10) {
      matchedRules.push({ rule, score });
    }
  }

  // Sort matched rules by score
  matchedRules.sort((a, b) => b.score - a.score);

  if (matchedRules.length > 0) {
    const topRule = matchedRules[0].rule;
    const factRefs = topRule.factReferences || [];
    let candidateFacts = resolveFactsByIds(caseDef, factRefs);

    // If no factRefs found or factRefs is empty, fetch by category
    if (candidateFacts.length === 0) {
      candidateFacts = resolveFactsByCategory(caseDef, matchResult.primaryCategory);
    }

    return {
      matchedRules: matchedRules.map(m => m.rule),
      candidateFacts,
      primaryRule: topRule,
      matchScore: matchedRules[0].score
    };
  }

  // Dynamic fallback: No explicit rule matched, retrieve facts by category
  const dynamicFacts: HiddenFactItem[] = [];
  for (const cat of matchResult.matchedCategories) {
    const facts = resolveFactsByCategory(caseDef, cat);
    dynamicFacts.push(...facts);
  }

  return {
    matchedRules: [],
    candidateFacts: dynamicFacts,
    primaryRule: undefined,
    matchScore: dynamicFacts.length > 0 ? 5 : 0
  };
}
