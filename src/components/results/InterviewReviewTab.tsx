import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';
import { InterviewReview } from '../../types';

interface InterviewReviewTabProps {
  interviewReview: InterviewReview;
}

export const InterviewReviewTab: React.FC<InterviewReviewTabProps> = ({ interviewReview }) => {
  const { adequatelyCovered, partiallyCovered, missed } = interviewReview;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
        เปรียบเทียบรายการตรวจสอบการซักประวัติ (Checklist) กับข้อเท็จจริงที่นักศึกษาค้นพบจริงในระหว่างบทสนทนา
      </div>

      {/* Adequately Covered */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>หัวข้อที่ซักประวัติได้ครบถ้วน ({adequatelyCovered.length})</span>
        </div>
        {adequatelyCovered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {adequatelyCovered.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs flex items-start justify-between gap-2"
              >
                <div>
                  <strong className="text-emerald-950 block">{item.label}</strong>
                  <span className="text-emerald-700 text-[11px]">{item.evidence}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                  ครบถ้วน
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">ไม่พบหัวข้อที่ครบถ้วนสมบูรณ์</p>
        )}
      </div>

      {/* Partially Covered */}
      {partiallyCovered.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>หัวข้อที่ซักประวัติได้บางส่วน ({partiallyCovered.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {partiallyCovered.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs flex items-start justify-between gap-2"
              >
                <div>
                  <strong className="text-amber-950 block">{item.label}</strong>
                  <span className="text-amber-700 text-[11px]">{item.evidence}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold shrink-0">
                  ได้บางส่วน
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missed Items */}
      {missed.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm font-bold text-rose-800">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>หัวข้อที่ยังไม่ได้ซักประวัติ ({missed.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {missed.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-rose-50/60 border border-rose-200 text-xs flex items-start justify-between gap-2"
              >
                <div>
                  <strong className="text-rose-950 block">{item.label}</strong>
                  <span className="text-rose-700 text-[11px]">{item.whyMissed}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold shrink-0">
                  {item.importance === 'essential' ? 'จำเป็นยิ่ง' : 'สำคัญ'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
