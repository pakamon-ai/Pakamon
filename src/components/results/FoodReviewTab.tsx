import React from 'react';
import { FoodReview } from '../../types';
import { Utensils, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface FoodReviewTabProps {
  foodReview: FoodReview;
}

export const FoodReviewTab: React.FC<FoodReviewTabProps> = ({ foodReview }) => {
  const { studentTastes, referenceTastes, encouragedFoods, reducedFoods, sampleMeals, sampleDrinks, feedbackItems, academicNote } = foodReview;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
        <strong>คำแนะนำทางวิชาการ:</strong> {academicNote}
      </div>

      {/* Feedback Alerts */}
      {feedbackItems.length > 0 && (
        <div className="space-y-2">
          {feedbackItems.map((fb, idx) => (
            <div
              key={`fb-${idx}`}
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                fb.type === 'risk'
                  ? 'bg-rose-50 border-rose-300 text-rose-900'
                  : fb.type === 'suitable'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              {fb.type === 'risk' ? (
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              ) : fb.type === 'suitable' ? (
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
            <Utensils className="w-4 h-4 text-[#2D6A4F]" />
            <span>คำแนะนำอาหารของนักศึกษา</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-500 block">รสยาที่เลือก:</span>
              <strong className="text-slate-900">
                {studentTastes.length > 0 ? studentTastes.join(', ') : 'ไม่ได้ระบุ'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">อาหารที่ควรส่งเสริม:</span>
              <p className="text-slate-800 whitespace-pre-wrap">{encouragedFoods}</p>
            </div>
            <div>
              <span className="text-slate-500 block">อาหารที่ควรลด/งด:</span>
              <p className="text-slate-800 whitespace-pre-wrap">{reducedFoods}</p>
            </div>
            <div>
              <span className="text-slate-500 block">ตัวอย่างเมนูอาหาร:</span>
              <p className="text-slate-800 whitespace-pre-wrap">{sampleMeals}</p>
            </div>
            <div>
              <span className="text-slate-500 block">เครื่องดื่มสมุนไพร:</span>
              <p className="text-slate-800 whitespace-pre-wrap">{sampleDrinks}</p>
            </div>
          </div>
        </div>

        {/* Reference Column */}
        <div className="p-5 rounded-2xl bg-[#EBF2EE]/50 border border-[#40916C]/40 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332] border-b border-[#40916C]/20 pb-2">
            <Utensils className="w-4 h-4 text-[#2D6A4F]" />
            <span>เกณฑ์รสยาและการปรับสมดุลอ้างอิง</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-500 block">รสยาหลักที่แนะนำตามเกณฑ์:</span>
              <strong className="text-[#1B4332]">{referenceTastes.join(', ')}</strong>
            </div>
            <div className="pt-2 text-slate-700 leading-relaxed">
              <span className="text-slate-500 block mb-1 font-semibold">หลักการปรับสมดุลอาหาร:</span>
              <p>
                ควรเน้นรสยาที่ตรงกับสมุฏฐานธาตุที่ผิดปกติ พร้อมทั้งคำนึงถึงกาลสมุฏฐานและประวัติการแพ้อาหารหรือโรคประจำตัวของผู้รับบริการเสมอ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
