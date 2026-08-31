import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X, Award, BarChart3 } from 'lucide-react';
import { AssessmentResult, CategoryScore } from '../../types';

interface RubricBreakdownCardProps {
  assessmentResult: AssessmentResult;
}

export const RubricBreakdownCard: React.FC<RubricBreakdownCardProps> = ({ assessmentResult }) => {
  const { categories } = assessmentResult;
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    // Expand first 2 by default
    communication_rapport: true,
    interview_completeness_sequence: true
  });

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    categories.forEach((c) => {
      allExpanded[c.id] = true;
    });
    setExpandedCategories(allExpanded);
  };

  const collapseAll = () => {
    setExpandedCategories({});
  };

  return (
    <section 
      aria-label="รายละเอียดคะแนนรายหมวดตามเกณฑ์รูบริก"
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#1B4332]">
            รายละเอียดคะแนนรายหมวด (Rubric Breakdown — 9 หมวด 100 คะแนน)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            คลิกที่แต่ละหมวดเพื่อดูหลักฐานที่ได้คะแนนและเกณฑ์ที่ต้องพัฒนา
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer"
          >
            ขยายทั้งหมด
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer"
          >
            ย่อทั้งหมด
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((cat: CategoryScore) => {
          const isExpanded = Boolean(expandedCategories[cat.id]);
          const percentage = cat.maxScore > 0 ? Math.round((cat.score / cat.maxScore) * 100) : 0;

          let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
          if (percentage < 60) {
            badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
          } else if (percentage < 80) {
            badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
          }

          return (
            <div
              key={cat.id}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-[#EBF2EE] text-[#1B4332] flex items-center justify-center font-bold text-xs shrink-0">
                    {cat.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-800 truncate">
                      {cat.label}
                    </h3>
                    <div className="w-32 sm:w-48 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div
                        className={`h-full ${
                          percentage >= 80 ? 'bg-emerald-500' : percentage >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${badgeColor}`}>
                    {cat.score} / {cat.maxScore} คะแนน ({percentage}%)
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-[#FDFBF7]/60 space-y-4 animate-in fade-in duration-200">
                  {/* Evidence List */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      หลักฐานและสิ่งที่ได้รับคะแนน ({cat.evidence.length})
                    </span>
                    {cat.evidence.length > 0 ? (
                      <ul className="space-y-1 pl-5 list-disc text-xs text-slate-700 leading-relaxed">
                        {cat.evidence.map((ev, i) => (
                          <li key={`ev-${i}`}>{ev}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic pl-5">ไม่พบหลักฐานที่ตรงตามเกณฑ์ในหมวดนี้</p>
                    )}
                  </div>

                  {/* Missing Criteria List */}
                  {cat.missingCriteria.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-200/50">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5 text-amber-600" />
                        เกณฑ์ที่ยังขาดหรือไม่สมบูรณ์ ({cat.missingCriteria.length})
                      </span>
                      <ul className="space-y-1 pl-5 list-disc text-xs text-slate-700 leading-relaxed">
                        {cat.missingCriteria.map((mc, i) => (
                          <li key={`mc-${i}`}>{mc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
