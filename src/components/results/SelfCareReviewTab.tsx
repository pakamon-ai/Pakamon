import React from 'react';
import { SelfCareReview } from '../../types';
import { HeartPulse, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SelfCareReviewTabProps {
  selfCareReview: SelfCareReview;
}

export const SelfCareReviewTab: React.FC<SelfCareReviewTabProps> = ({ selfCareReview }) => {
  const { studentPlan, referenceKey, feedbackItems, academicNote } = selfCareReview;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
        <strong>คำแนะนำทางวิชาการ:</strong> {academicNote}
      </div>

      {feedbackItems.length > 0 && (
        <div className="space-y-2">
          {feedbackItems.map((fb, idx) => (
            <div
              key={`sc-fb-${idx}`}
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                fb.type === 'suitable'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              {fb.type === 'suitable' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <span>{fb.message}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Column */}
        <div className="p-5 rounded-2xl bg-[#F8FAF9] border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332] border-b border-slate-200 pb-2">
            <HeartPulse className="w-4 h-4 text-[#2D6A4F]" />
            <span>แผนการดูแลสุขภาพของนักศึกษา</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-500 block">การพักผ่อนและการนอนหลับ:</span>
              <p className="text-slate-800 whitespace-pre-wrap">{studentPlan.rest} / {studentPlan.sleep}</p>
            </div>
            <div>
              <span className="text-slate-500 block">การเคลื่อนไหวและออกกำลังกาย:</span>
              <p className="text-slate-800 whitespace-pre-wrap">{studentPlan.movement}</p>
            </div>
            <div>
              <span className="text-slate-500 block">ท่าฤๅษีดัดตน:</span>
              <p className="text-slate-800 whitespace-pre-wrap">{studentPlan.ruesiDatTon}</p>
            </div>
            <div>
              <span className="text-slate-500 block">การจัดการความเครียด:</span>
              <p className="text-slate-800 whitespace-pre-wrap">{studentPlan.stressManagement}</p>
            </div>
          </div>
        </div>

        {/* Reference Column */}
        <div className="p-5 rounded-2xl bg-[#EBF2EE]/50 border border-[#40916C]/40 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332] border-b border-[#40916C]/20 pb-2">
            <HeartPulse className="w-4 h-4 text-[#2D6A4F]" />
            <span>แนวทางการดูแลตนเองอ้างอิง</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-500 block">ท่าฤๅษีดัดตนที่แนะนำ:</span>
              <ul className="space-y-1 pl-4 list-disc text-slate-800">
                {referenceKey.ruesiDatTon.map((item, i) => (
                  <li key={`rdt-${i}`}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-slate-500 block">การเคลื่อนไหวและการออกกำลังกาย:</span>
              <ul className="space-y-1 pl-4 list-disc text-slate-800">
                {referenceKey.movement.map((item, i) => (
                  <li key={`mov-${i}`}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-slate-500 block">ข้อควรระวังในการปฏิบัติ:</span>
              <ul className="space-y-1 pl-4 list-disc text-slate-800">
                {referenceKey.precautions.map((item, i) => (
                  <li key={`prec-${i}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
