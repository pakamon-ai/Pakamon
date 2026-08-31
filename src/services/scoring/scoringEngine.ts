import { Attempt, CaseDefinition, AssessmentResult } from '../../types';
import { getRubricCategoriesForCase, TOTAL_RUBRIC_MAX_SCORE } from './rubricConfig';
import { extractEvidence } from './evidenceExtractor';
import { evaluateCommunication } from './evaluators/communicationEvaluator';
import { evaluateInterviewCompleteness } from './evaluators/interviewEvaluator';
import { evaluateSafetyHistory } from './evaluators/safetyHistoryEvaluator';
import { evaluateElementAnalysis } from './evaluators/elementAnalysisEvaluator';
import { evaluateIntegration } from './evaluators/integrationEvaluator';
import { evaluateFoodGuidance } from './evaluators/foodEvaluator';
import { evaluateSelfCare } from './evaluators/selfCareEvaluator';
import { evaluateSafetyAndReferral } from './evaluators/safetyReferralEvaluator';
import { evaluateClosing } from './evaluators/closingEvaluator';
import { buildFeedbackSummary } from './feedbackBuilder';
import { buildCaseStudyReviews } from './caseReviewBuilder';

export const SCORING_ENGINE_VERSION = '1.0';

/**
 * Deterministic OSCE Scoring Engine for Thai Element Case Simulation
 */
export function evaluateAttempt(attempt: Attempt, caseDef: CaseDefinition): AssessmentResult {
  if (!attempt) {
    throw new Error('[ScoringEngine] Attempt object is required for evaluation');
  }
  if (!caseDef) {
    throw new Error('[ScoringEngine] CaseDefinition object is required for evaluation');
  }

  const rubricCategories = getRubricCategoriesForCase(caseDef);
  const getCatMax = (id: string, defaultMax: number) => {
    const found = rubricCategories.find((c) => c.id === id);
    return found ? found.maxScore : defaultMax;
  };

  // 1. Extract structured evidence from transcript, discovered facts, and submitted form
  const evidence = extractEvidence(attempt, caseDef);

  // 2. Run all 9 Category Evaluators
  const cat1 = evaluateCommunication(evidence, caseDef, getCatMax('communication_rapport', 10));
  const cat2 = evaluateInterviewCompleteness(evidence, caseDef, getCatMax('interview_completeness_sequence', 15));
  const cat3 = evaluateSafetyHistory(evidence, caseDef, getCatMax('allergy_disease_medication_history', 10));
  const cat4 = evaluateElementAnalysis(evidence, caseDef, getCatMax('element_analysis', 15));
  const cat5 = evaluateIntegration(evidence, caseDef, getCatMax('element_behavior_health_integration', 10));
  const cat6Result = evaluateFoodGuidance(evidence, caseDef, getCatMax('food_guidance', 15));
  const cat6 = cat6Result.categoryScore;
  const cat7 = evaluateSelfCare(evidence, caseDef, getCatMax('self_care_guidance', 10));
  const cat8Result = evaluateSafetyAndReferral(evidence, caseDef, getCatMax('safety_red_flags_referral', 10));
  const cat8 = cat8Result.categoryScore;
  const cat9 = evaluateClosing(evidence, caseDef, getCatMax('closing_understanding_time', 5));

  const allCategoryScores = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9];

  // 3. Aggregate Safety Issues
  const safetyIssues: string[] = [...cat8Result.safetyIssues];
  let hasCriticalSafetyIssue = cat8Result.hasCriticalSafetyIssue;
  if (cat6Result.foodSafetyConflict) {
    safetyIssues.push(cat6Result.foodSafetyConflict);
    hasCriticalSafetyIssue = true;
  }

  // 4. Calculate total score safely clamped
  const rawTotal = allCategoryScores.reduce((sum, cat) => sum + cat.score, 0);
  const maxPossible = rubricCategories.reduce((sum, cat) => sum + cat.maxScore, 0) || TOTAL_RUBRIC_MAX_SCORE;
  const totalScore = Math.min(Math.max(Math.round(rawTotal * 2) / 2, 0), maxPossible);

  // 5. Build Feedback & Case Reviews
  const feedback = buildFeedbackSummary(allCategoryScores, safetyIssues, cat6Result.foodSafetyConflict);
  const reviews = buildCaseStudyReviews(evidence, caseDef, safetyIssues, cat6Result.foodSafetyConflict);

  const assessmentResult: AssessmentResult = {
    version: '1.0',
    scoringVersion: SCORING_ENGINE_VERSION,
    attemptId: attempt.attemptId,
    caseId: attempt.caseId,
    caseVersion: caseDef.metadata.version || '1.0',
    evaluatedAt: new Date().toISOString(),
    totalScore,
    maxScore: maxPossible,
    hasCriticalSafetyIssue,
    categories: allCategoryScores,
    strengths: feedback.strengths,
    reviewAreas: feedback.reviewAreas,
    safetyIssues,
    interviewReview: reviews.interviewReview,
    elementReview: reviews.elementReview,
    foodReview: reviews.foodReview,
    selfCareReview: reviews.selfCareReview,
    safetyReview: reviews.safetyReview,
    closingReview: reviews.closingReview,
    caseStudyReview: reviews.caseStudyReview
  };

  return assessmentResult;
}
