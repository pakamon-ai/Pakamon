import React from 'react';
import { CheckCircle2, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { AssessmentResult } from '../../types';

interface FeedbackSummaryCardProps {
  assessmentResult: AssessmentResult;
}

export const FeedbackSummaryCard: React.FC<FeedbackSummaryCardProps> = ({ assessmentResult }) => {
  const { strengths, reviewAreas, safetyIssues } = assessmentResult;

  return (
    <section 
      aria-label="ข้อเสนอแนะและจุดเด่น"
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
    >
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1B4332]">
            บทวิเคราะห์และข้อเสนอแนะเชิงพัฒนาการ (Actionable Feedback)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ประมวลผลจากหลักฐานการซักประวัติและคำตอบที่ส่งตามเกณฑ์ OSCE
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="p-5 rounded-2xl bg-[#F8FAF9] border border-[#40916C]/30 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332]">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>จุดเด่นและสิ่งที่ทำได้ดี (Strengths)</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
            {strengths.map((st, idx) => (
              <li key={`str-${idx}`} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{st}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Review Areas */}
        <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-950">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>ประเด็นที่ควรทบทวนและพัฒนา (Areas for Review)</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
            {reviewAreas.map((ra, idx) => (
              <li key={`rev-${idx}`} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{ra}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Safety Issues Callout if present */}
      {safetyIssues.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-rose-950">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <span>ประเด็นความปลอดภัยที่ต้องระมัดระวัง (Safety Callouts)</span>
          </div>
          <ul className="space-y-2 text-xs text-rose-900 leading-relaxed">
            {safetyIssues.map((si, idx) => (
              <li key={`safe-${idx}`} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <strong>{si}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
