import React from 'react';
import { ElementReview } from '../../types';
import { Check, X, Compass, BookOpen } from 'lucide-react';

interface ElementReviewTabProps {
  elementReview: ElementReview;
}

export const ElementReviewTab: React.FC<ElementReviewTabProps> = ({ elementReview }) => {
  const { studentAnswer, referenceAnswer, matchedEvidence, missedEvidence, academicNote } = elementReview;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
        <strong>คำแนะนำทางวิชาการ:</strong> {academicNote}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Submission Column */}
        <div className="p-5 rounded-2xl bg-[#F8FAF9] border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332] border-b border-slate-200 pb-2">
            <Compass className="w-4 h-4 text-[#2D6A4F]" />
            <span>คำตอบที่ส่ง (Student Submission)</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-500 block">ธาตุกำเนิด:</span>
              <strong className="text-slate-900">{studentAnswer.birthElement}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">ธาตุเด่น / ธาตุปัจจุบัน:</span>
              <strong className="text-slate-900">
                {studentAnswer.dominantElement} / {studentAnswer.currentElement}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">ภาวะธาตุ:</span>
              <strong className="text-slate-900">
                {studentAnswer.elementCondition.length > 0 ? studentAnswer.elementCondition.join(', ') : '-'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">ข้อมูลสนับสนุน/เหตุผล:</span>
              <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{studentAnswer.supportingReasons}</p>
            </div>
            <div>
              <span className="text-slate-500 block">ปัจจัยสมุฏฐาน:</span>
              <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{studentAnswer.relatedFactors}</p>
            </div>
          </div>
        </div>

        {/* Reference Answer Column */}
        <div className="p-5 rounded-2xl bg-[#EBF2EE]/50 border border-[#40916C]/40 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332] border-b border-[#40916C]/20 pb-2">
            <BookOpen className="w-4 h-4 text-[#2D6A4F]" />
            <span>เกณฑ์เฉลยอ้างอิง (Reference Key)</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-500 block">ธาตุกำเนิดที่ถูกต้อง:</span>
              <strong className="text-[#1B4332]">{referenceAnswer.birthElement}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">ธาตุเด่น / ภาวะธาตุตามพยาธิสภาพ:</span>
              <strong className="text-[#1B4332]">
                {referenceAnswer.dominantElement} / {referenceAnswer.currentElementState}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">หลักฐานสนับสนุนที่ควรระบุ:</span>
              <ul className="space-y-1 pl-4 list-disc text-slate-800">
                {referenceAnswer.supportingEvidence.map((ev, idx) => (
                  <li key={`ev-ref-${idx}`}>{ev}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-slate-500 block">แนวทางการอธิบายทางทฤษฎี:</span>
              <ul className="space-y-1 pl-4 list-disc text-slate-800">
                {referenceAnswer.acceptableReasoning.map((reas, idx) => (
                  <li key={`reas-${idx}`}>{reas}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Matched vs Missed Evidence Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
          <span className="font-bold text-emerald-950 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            หลักฐานที่สอดคล้องกับเกณฑ์ ({matchedEvidence.length})
          </span>
          {matchedEvidence.length > 0 ? (
            <ul className="space-y-1 pl-4 list-disc text-emerald-900">
              {matchedEvidence.map((me, i) => (
                <li key={`me-${i}`}>{me}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 italic">ไม่มีหลักฐานที่ระบุตรงกับเกณฑ์เฉลย</p>
          )}
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <X className="w-4 h-4 text-slate-500" />
            หลักฐานอื่นที่ควรสังเกตเพิ่มเติม ({missedEvidence.length})
          </span>
          <ul className="space-y-1 pl-4 list-disc text-slate-600">
            {missedEvidence.map((mve, i) => (
              <li key={`mve-${i}`}>{mve}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
