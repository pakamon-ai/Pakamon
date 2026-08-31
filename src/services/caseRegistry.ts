import { CaseDefinition, CasePreview, DifficultyLevel } from '../types';
import { CASE_EARTH_01 } from '../data/cases/caseEarth01';
import { CASE_WATER_02 } from '../data/cases/caseWater02';
import { CASE_WIND_03 } from '../data/cases/caseWind03';
import { CASE_FIRE_04 } from '../data/cases/caseFire04';

// Raw list of all registered development cases
const RAW_REGISTERED_CASES: CaseDefinition[] = [
  CASE_EARTH_01,
  CASE_WATER_02,
  CASE_WIND_03,
  CASE_FIRE_04
];

/**
 * Lightweight runtime validator to ensure case integrity according to PROJECT_BLUEPRINT.md
 */
export function validateCaseDefinition(candidate: unknown): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!candidate || typeof candidate !== 'object') {
    return { isValid: false, errors: ['Case data is not a valid object'] };
  }

  const c = candidate as Record<string, unknown>;

  // Validate metadata
  if (!c.metadata || typeof c.metadata !== 'object') {
    errors.push('Missing metadata object');
  } else {
    const m = c.metadata as Record<string, unknown>;
    if (!m.id || typeof m.id !== 'string') errors.push('Missing or invalid metadata.id');
    if (!m.title || typeof m.title !== 'string') errors.push('Missing or invalid metadata.title');
    if (!['earth', 'water', 'wind', 'fire'].includes(m.elementFocus as string)) {
      errors.push(`Invalid elementFocus: ${m.elementFocus}`);
    }
    if (!['basic', 'intermediate', 'advanced'].includes(m.difficulty as string)) {
      errors.push(`Invalid difficulty: ${m.difficulty}`);
    }
    if (typeof m.estimatedMinutes !== 'number' || m.estimatedMinutes <= 0) {
      errors.push('Invalid estimatedMinutes');
    }
    if (!m.version || typeof m.version !== 'string') errors.push('Missing metadata.version');
    if (!['draft', 'academic_review', 'approved'].includes(m.academicReviewStatus as string)) {
      errors.push(`Invalid academicReviewStatus: ${m.academicReviewStatus}`);
    }
  }

  // Validate patientProfile
  if (!c.patientProfile || typeof c.patientProfile !== 'object') {
    errors.push('Missing patientProfile object');
  } else {
    const p = c.patientProfile as Record<string, unknown>;
    if (!p.displayName) errors.push('Missing patientProfile.displayName');
    if (typeof p.age !== 'number' || p.age <= 0) errors.push('Invalid patientProfile.age');
  }

  // Validate initialDisclosure
  if (!c.initialDisclosure || typeof c.initialDisclosure !== 'object') {
    errors.push('Missing initialDisclosure object');
  } else {
    const init = c.initialDisclosure as Record<string, unknown>;
    if (!init.displayName) errors.push('Missing initialDisclosure.displayName');
    if (!init.chiefConcern) errors.push('Missing initialDisclosure.chiefConcern');
  }

  // Validate hiddenFacts structure
  if (!c.hiddenFacts || typeof c.hiddenFacts !== 'object') {
    errors.push('Missing hiddenFacts object');
  } else {
    const h = c.hiddenFacts as Record<string, unknown>;
    const requiredFactCategories = [
      'presentingConcern', 'symptoms', 'food', 'drink', 'appetite', 'sleep',
      'bowel', 'urination', 'activity', 'stress', 'occupationFactors',
      'environmentFactors', 'medicalHistory', 'medications', 'foodAllergies',
      'drugAllergies', 'herbalAllergies', 'pastHistory', 'otherRelevantHistory', 'redFlagFacts'
    ];
    for (const cat of requiredFactCategories) {
      if (!Array.isArray(h[cat])) {
        errors.push(`Missing hiddenFacts category array: ${cat}`);
      }
    }
  }

  // Validate safetyCriteria (EVERY field must exist explicitly)
  if (!c.safetyCriteria || typeof c.safetyCriteria !== 'object') {
    errors.push('Missing safetyCriteria object');
  } else {
    const s = c.safetyCriteria as Record<string, unknown>;
    const requiredSafetyFields = [
      'foodAllergy', 'drugAllergy', 'herbalAllergy', 'underlyingDisease',
      'medications', 'contraindications', 'redFlags', 'referralRequired',
      'referralConditions', 'unsafeRecommendations'
    ];
    for (const field of requiredSafetyFields) {
      if (s[field] === undefined) {
        errors.push(`Missing safetyCriteria field: ${field}`);
      }
    }
  }

  // Validate scoringCriteria
  if (!c.scoringCriteria || typeof c.scoringCriteria !== 'object') {
    errors.push('Missing scoringCriteria object');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Filter and register cases safely
 */
function buildValidatedRegistry(): CaseDefinition[] {
  const validCases: CaseDefinition[] = [];
  const seenIds = new Set<string>();

  for (const item of RAW_REGISTERED_CASES) {
    const validation = validateCaseDefinition(item);
    if (!validation.isValid) {
      console.warn(`[CaseRegistry] Case validation failed for '${item.metadata?.id || 'unknown'}':`, validation.errors);
      continue;
    }

    if (seenIds.has(item.metadata.id)) {
      console.warn(`[CaseRegistry] Duplicate case ID '${item.metadata.id}' detected. Skipping duplicate.`);
      continue;
    }

    seenIds.add(item.metadata.id);
    validCases.push(item);
  }

  return validCases;
}

// Memory-cached validated registry
const VALIDATED_REGISTRY: CaseDefinition[] = buildValidatedRegistry();

/**
 * Retrieve all registered, validated cases
 */
export function getAllCases(): CaseDefinition[] {
  return [...VALIDATED_REGISTRY];
}

/**
 * Retrieve a case by stable ID safely without crashing
 */
export function getCaseById(caseId: string | null | undefined): CaseDefinition | null {
  if (!caseId) return null;
  const found = VALIDATED_REGISTRY.find((c) => c.metadata.id === caseId);
  return found || null;
}

/**
 * Filter cases by difficulty level
 */
export function getCasesByDifficulty(difficulty: DifficultyLevel): CaseDefinition[] {
  return VALIDATED_REGISTRY.filter((c) => c.metadata.difficulty === difficulty);
}

/**
 * Helper to get previews for the Case Selection UI
 * Only reveals safe metadata and initial disclosure (no hidden facts / answer keys)
 */
export function getCasePreviews(): CasePreview[] {
  return VALIDATED_REGISTRY.map((c) => ({
    id: c.metadata.id,
    displayName: c.initialDisclosure.displayName,
    age: c.initialDisclosure.age,
    shortConcern: c.initialDisclosure.chiefConcern,
    elementLabel: getElementLabel(c.metadata.elementFocus),
    elementCategory: c.metadata.elementFocus,
    difficulty: c.metadata.difficulty,
    difficultyLabel: c.metadata.difficultyLabel,
    estimatedMinutes: c.metadata.estimatedMinutes,
    briefContext: c.initialDisclosure.briefContext,
    academicReviewStatus: c.metadata.academicReviewStatus
  }));
}

function getElementLabel(element: CaseDefinition['metadata']['elementFocus']): string {
  switch (element) {
    case 'earth':
      return 'กรณีศึกษาด้านธาตุดิน (ปฐวีธาตุ)';
    case 'water':
      return 'กรณีศึกษาด้านธาตุน้ำ (อาโปธาตุ)';
    case 'wind':
      return 'กรณีศึกษาด้านธาตุลม (วาโยธาตุ)';
    case 'fire':
      return 'กรณีศึกษาด้านธาตุไฟ (เตโชธาตุ)';
  }
}
