import { CategoryScore, FeedbackSummary } from '../../types';

export function buildFeedbackSummary(
  categoryScores: CategoryScore[],
  safetyIssues: string[],
  foodSafetyConflict: string | null
): FeedbackSummary {
  const strengths: string[] = [];
  const reviewAreas: string[] = [];
  const safetyPriorities: string[] = [...safetyIssues];

  if (foodSafetyConflict) {
    safetyPriorities.unshift(foodSafetyConflict);
  }

  categoryScores.forEach((cat) => {
    const scorePct = cat.maxScore > 0 ? (cat.score / cat.maxScore) * 100 : 0;

    // Collect top strengths
    if (scorePct >= 70 && cat.evidence.length > 0) {
      cat.evidence.forEach((ev) => {
        if (strengths.length < 6 && !strengths.includes(ev)) {
          strengths.push(`[${cat.label}] ${ev}`);
        }
      });
    }

    // Collect review areas
    if (cat.missingCriteria.length > 0) {
      cat.missingCriteria.forEach((mc) => {
        if (reviewAreas.length < 6 && !reviewAreas.includes(mc)) {
          reviewAreas.push(`[${cat.label}] ${mc}`);
        }
      });
    }
  });

  // Fallbacks if lists are empty
  if (strengths.length === 0) {
    strengths.push('สามารถเข้าร่วมการซักประวัติและส่งแบบวิเคราะห์ธาตุได้ครบตามขั้นตอน');
  }

  if (reviewAreas.length === 0) {
    reviewAreas.push('ทบทวนความลึกซึ้งของการเชื่อมโยงทฤษฎีการแพทย์แผนไทยเพิ่มเติมในการฝึกฝนครั้งต่อไป');
  }

  return {
    strengths,
    reviewAreas,
    safetyPriorities
  };
}
