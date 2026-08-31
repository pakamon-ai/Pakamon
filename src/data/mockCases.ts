import { CasePreview } from '../types';
import { getCasePreviews } from '../services/caseRegistry';

/**
 * DEVELOPMENT_CASES derived from the validated Case Registry
 * Only safe metadata and initial disclosures are exposed
 */
export const DEVELOPMENT_CASES: CasePreview[] = getCasePreviews();
