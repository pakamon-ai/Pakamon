/**
 * Fact Resolver: Resolves structured HiddenFactItems from a CaseDefinition.
 * Strictly operates ONLY on hiddenFacts and initialDisclosure.
 * NEVER accesses answer keys, food/self-care guidance keys, or rubric scoring criteria.
 */

import { CaseDefinition, HiddenFactItem, HiddenFacts } from '../../types';
import { InterviewCategory } from './categoryMatcher';

/**
 * Mapping between categoryMatcher InterviewCategory and CaseDefinition.hiddenFacts keys
 */
const CATEGORY_TO_HIDDEN_FACTS_KEYS: Record<InterviewCategory, (keyof HiddenFacts)[]> = {
  rapport: [],
  general_information: [],
  chief_concern: ['presentingConcern'],
  symptom_onset: ['presentingConcern', 'symptoms'],
  symptom_duration: ['presentingConcern', 'symptoms'],
  symptom_character: ['presentingConcern', 'symptoms'],
  aggravating_factors: ['presentingConcern', 'symptoms', 'occupationFactors', 'environmentFactors'],
  relieving_factors: ['presentingConcern', 'symptoms', 'medications'],
  symptoms: ['presentingConcern', 'symptoms'],
  food: ['food'],
  drink: ['drink'],
  appetite: ['appetite'],
  sleep: ['sleep'],
  bowel: ['bowel'],
  urination: ['urination'],
  activity: ['activity'],
  occupation: ['occupationFactors'],
  lifestyle: ['activity', 'otherRelevantHistory'],
  residence_environment: ['environmentFactors'],
  stress: ['stress'],
  emotional_state: ['stress', 'symptoms'],
  underlying_disease: ['medicalHistory'],
  medication: ['medications'],
  food_allergy: ['foodAllergies'],
  drug_allergy: ['drugAllergies'],
  herbal_allergy: ['herbalAllergies'],
  allergies_general: ['foodAllergies', 'drugAllergies', 'herbalAllergies'],
  past_history: ['pastHistory'],
  other_relevant_history: ['otherRelevantHistory'],
  red_flags: ['redFlagFacts'],
  clarification: [],
  unknown: []
};

/**
 * Get all HiddenFactItems flattened into a single list
 */
export function getAllHiddenFacts(caseDef: CaseDefinition): HiddenFactItem[] {
  if (!caseDef || !caseDef.hiddenFacts) return [];

  const allFacts: HiddenFactItem[] = [];
  const hiddenFactsObj = caseDef.hiddenFacts;

  for (const key of Object.keys(hiddenFactsObj) as (keyof HiddenFacts)[]) {
    const list = hiddenFactsObj[key];
    if (Array.isArray(list)) {
      allFacts.push(...list);
    }
  }

  return allFacts;
}

/**
 * Resolve a single fact by its ID safely
 */
export function resolveFactById(caseDef: CaseDefinition, factId: string): HiddenFactItem | undefined {
  if (!caseDef || !caseDef.hiddenFacts || !factId) return undefined;

  const allFacts = getAllHiddenFacts(caseDef);
  return allFacts.find(f => f.id === factId);
}

/**
 * Resolve multiple facts by their IDs safely
 */
export function resolveFactsByIds(caseDef: CaseDefinition, factIds: string[]): HiddenFactItem[] {
  if (!caseDef || !caseDef.hiddenFacts || !factIds || factIds.length === 0) return [];

  const allFacts = getAllHiddenFacts(caseDef);
  const factIdSet = new Set(factIds);
  return allFacts.filter(f => factIdSet.has(f.id));
}

/**
 * Resolve all facts belonging to an InterviewCategory
 */
export function resolveFactsByCategory(caseDef: CaseDefinition, category: InterviewCategory): HiddenFactItem[] {
  if (!caseDef || !caseDef.hiddenFacts) return [];

  const targetKeys = CATEGORY_TO_HIDDEN_FACTS_KEYS[category] || [];
  const results: HiddenFactItem[] = [];

  for (const key of targetKeys) {
    const list = caseDef.hiddenFacts[key];
    if (Array.isArray(list)) {
      results.push(...list);
    }
  }

  return results;
}
