import React, { useMemo } from 'react';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { CasePreview, AnalysisFormData, PracticeMode, Attempt, AssessmentResult } from '../../types';
import { getCaseById } from '../../services/caseRegistry';
import { evaluateAttempt } from '../../services/scoring/scoringEngine';
import { ScoreSummaryCard } from '../results/ScoreSummaryCard';
import { FeedbackSummaryCard } from '../results/FeedbackSummaryCard';
import { RubricBreakdownCard } from '../results/RubricBreakdownCard';
import { CaseStudyReviewTabs } from '../results/CaseStudyReviewTabs';

interface ResultsScreenProps {
  selectedCase: CasePreview;
  mode: PracticeMode;
  analysisData: AnalysisFormData | null;
  attempt?: Attempt | null;
  onRepeatCase: () => void;
  onSelectNewCase: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  selectedCase,
  mode,
  analysisData,
  attempt,
  onRepeatCase,
  onSelectNewCase
}) => {
  // Retrieve full case definition for evaluation
  const fullCaseDef = useMemo(() => {
    return getCaseById(selectedCase.id);
  }, [selectedCase.id]);

  // Retrieve existing immutable assessment result or compute deterministically
  const assessmentResult: AssessmentResult | null = useMemo(() => {
    if (!fullCaseDef) return null;

    if (attempt?.assessmentResult) {
      return attempt.assessmentResult;
    }

    if (attempt) {
      try {
        return evaluateAttempt(attempt, fullCaseDef);
      } catch (err) {
        console.error('[ResultsScreen] Error evaluating attempt:', err);
        return null;
      }
    }

    return null;
  }, [attempt, fullCaseDef]);

  // Clean transcript messages (patient + student)
  const cleanTranscript = (attempt?.transcript || []).filter(
    (m) => m.sender === 'patient' || m.sender === 'student'
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 animate-in fade-in duration-300 font-['Sarabun',sans-serif]">
      {/* 1. Score Summary Header & Gauge */}
      {assessmentResult && (
        <ScoreSummaryCard
          assessmentResult={assessmentResult}
          selectedCase={selectedCase}
          mode={mode}
          elapsedSeconds={attempt?.timer?.elapsedSeconds || 0}
          submittedAt={attempt?.submittedAt}
        />
      )}

      {/* 2. Actionable Feedback: Strengths, Areas for Review & Safety */}
      {assessmentResult && (
        <FeedbackSummaryCard assessmentResult={assessmentResult} />
      )}

      {/* 3. Detailed Rubric Breakdown (9 Categories / 100 Points) */}
      {assessmentResult && (
        <RubricBreakdownCard assessmentResult={assessmentResult} />
      )}

      {/* 4. Deep Case Study Review & Educational Comparison Tabs */}
      {assessmentResult && (
        <CaseStudyReviewTabs
          assessmentResult={assessmentResult}
          selectedCase={selectedCase}
          cleanTranscript={cleanTranscript}
        />
      )}

      {/* Bottom Action Controls */}
      <section 
        aria-label="ตัวเลือกการดำเนินการถัดไป"
        className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <button
          id="repeat-case-button"
          type="button"
          onClick={onRepeatCase}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
          <span>ทำกรณีเดิมอีกครั้ง (Repeat Same Case)</span>
        </button>

        <button
          id="select-new-case-button"
          type="button"
          onClick={onSelectNewCase}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#1B4332]/20 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] transition-all cursor-pointer"
        >
          <span>เลือกกรณีใหม่ (Select New Case)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </main>
  );
};
