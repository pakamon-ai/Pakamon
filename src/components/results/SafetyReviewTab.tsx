import React from 'react';
import { SafetyReview } from '../../types';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

interface SafetyReviewTabProps {
  safetyReview: SafetyReview;
}

export const SafetyReviewTab: React.FC<SafetyReviewTabProps> = ({ safetyReview }) => {
  const { allergyChecked, diseaseChecked, medicationChecked, referralDecision, safetyIssues, academicNote } = safetyReview;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
        <strong>คำแนะนำทางวิชาการ:</strong> {academicNote}
      </div>

      {/* Critical Safety Issues Banner if any */}
      {safetyIssues.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-rose-950">
            <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
            <span>ประเด็นความปลอดภัยที่ต้องระมัดระวังเป็นพิเศษ ({safetyIssues.length})</span>
          </div>
          <ul className="space-y-1 pl-5 list-disc text-xs text-rose-900 leading-relaxed">
            {safetyIssues.map((issue, idx) => (
              <li key={`safe-issue-${idx}`}>
                <strong>{issue}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* History Checklist Review */}
      <div className="p-5 rounded-2xl bg-[#F8FAF9] border border-slate-200 space-y-4">
        <h4 className="text-sm font-bold text-slate-800">
          การซักถามประวัติความปลอดภัยในบทสนทนา (Interview Safety Checks)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${allergyChecked ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'}`}>
            {allergyChecked ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <div>
              <span className="font-bold block">ประวัติการแพ้</span>
              <span className="text-[11px] opacity-80">{allergyChecked ? 'ถามครบถ้วน' : 'ขาดการซักถามบางส่วน'}</span>
            </div>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${diseaseChecked ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'}`}>
            {diseaseChecked ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <div>
              <span className="font-bold block">โรคประจำตัว</span>
              <span className="text-[11px] opacity-80">{diseaseChecked ? 'ถามในบทสนทนา' : 'ไม่ได้ซักถาม'}</span>
            </div>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${medicationChecked ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'}`}>
            {medicationChecked ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <div>
              <span className="font-bold block">ยาและอาหารเสริม</span>
              <span className="text-[11px] opacity-80">{medicationChecked ? 'ถามในบทสนทนา' : 'ไม่ได้ซักถาม'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Decision Review */}
      <div className="p-5 rounded-2xl bg-[#EBF2EE]/50 border border-[#40916C]/40 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[#1B4332]">
            การประเมินการส่งต่อแพทย์ (Referral Assessment)
          </h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${referralDecision.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
            {referralDecision.isCorrect ? 'ตัดสินใจถูกต้อง' : 'การตัดสินใจไม่ตรงตามเกณฑ์'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
            <span className="text-slate-500 font-medium block">การตัดสินใจของนักศึกษา:</span>
            <p className="font-bold text-slate-900">
              {referralDecision.student === 'yes'
                ? 'ส่งต่อแพทย์แผนปัจจุบันทันที'
                : referralDecision.student === 'no'
                ? 'ยังไม่ต้องส่งต่อ (ดูแลตนเองเบื้องต้นได้)'
                : 'ยังไม่ได้ตัดสินใจ'}
            </p>
            <p className="text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
              เหตุผล: {referralDecision.studentReason}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#40916C]/30 space-y-2">
            <span className="text-slate-500 font-medium block">เกณฑ์อ้างอิงของกรณีศึกษา:</span>
            <p className="font-bold text-[#1B4332]">
              {referralDecision.expected ? 'จำเป็นต้องส่งต่อพบแพทย์' : 'ยังไม่จำเป็นต้องส่งต่อ (ไม่มี Red Flags)'}
            </p>
            <div className="pt-1 border-t border-slate-100 text-slate-700">
              <span className="text-slate-500 block mb-1">เงื่อนไขการส่งต่อที่ควรเฝ้าระวัง:</span>
              <ul className="space-y-1 pl-4 list-disc">
                {referralDecision.expectedConditions.map((cond, i) => (
                  <li key={`cond-${i}`}>{cond}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
