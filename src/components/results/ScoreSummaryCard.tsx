import React from 'react';
import { Award, AlertTriangle, ShieldCheck, Clock, Calendar, AlertOctagon, HelpCircle } from 'lucide-react';
import { AssessmentResult, CasePreview, PracticeMode } from '../../types';

interface ScoreSummaryCardProps {
  assessmentResult: AssessmentResult;
  selectedCase: CasePreview;
  mode: PracticeMode;
  elapsedSeconds?: number;
  submittedAt?: string | null;
}

export const ScoreSummaryCard: React.FC<ScoreSummaryCardProps> = ({
  assessmentResult,
  selectedCase,
  mode,
  elapsedSeconds = 0,
  submittedAt
}) => {
  const { totalScore, maxScore, hasCriticalSafetyIssue } = assessmentResult;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const formatTimestamp = (isoString?: string | null) => {
    if (!isoString) return '-';
    try {
      const d = new Date(isoString);
      return d.toLocaleString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const formatElapsed = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} นาที ${secs} วินาที`;
  };

  let scoreColorClass = 'text-[#1B4332] bg-[#EBF2EE] border-[#40916C]/40';
  let badgeLabel = 'ระดับดีมาก (Excellent)';
  if (percentage < 60) {
    scoreColorClass = 'text-rose-900 bg-rose-50 border-rose-200';
    badgeLabel = 'ควรปรับปรุงและฝึกฝนเพิ่มเติม (Needs Improvement)';
  } else if (percentage < 80) {
    scoreColorClass = 'text-amber-900 bg-amber-50 border-amber-200';
    badgeLabel = 'ระดับปานกลาง (Satisfactory)';
  }

  return (
    <section 
      aria-label="ผลการประเมินคะแนนรวม"
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
    >
      {/* Draft Academic Case Advisory */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
        <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">คำชี้แจงสถานะกรณีศึกษา (Draft Case Notice)</span>
          <span>
            กรณีศึกษานี้อยู่ระหว่างการทบทวนเนื้อหาวิชาการ เกณฑ์เฉลยและผลคะแนนใช้เป็นแนวทางอ้างอิงเพื่อการเรียนรู้และการฝึกฝนทักษะการซักประวัติเท่านั้น
          </span>
        </div>
      </div>

      {/* Critical Safety Warning Banner if needed */}
      {hasCriticalSafetyIssue && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 flex items-start gap-3.5 text-xs leading-relaxed animate-in fade-in">
          <AlertOctagon className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-sm font-bold text-rose-950 block">
              ข้อควรระวังสำคัญด้านความปลอดภัยของผู้รับบริการ (Critical Safety Issue)
            </strong>
            <p className="text-rose-800">
              พบประเด็นความปลอดภัยที่ต้องระมัดระวัง เช่น ประวัติการแพ้ ข้อห้าม หรือการตัดสินใจส่งต่อ โปรดตรวจสอบรายละเอียดในส่วนประเด็นความปลอดภัยด้านล่าง
            </p>
          </div>
        </div>
      )}

      {/* Score Header & Metric Gauge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#2D6A4F] bg-[#EBF2EE] px-3 py-1 rounded-full border border-[#40916C]/30">
              {mode === 'training' ? 'โหมดฝึกฝน (Training)' : 'โหมดประเมิน (Assessment)'}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              เวอร์ชันเกณฑ์: 1.0 (OSCE Rubric)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332]">
            ผลการประเมินสถานการณ์จำลอง (OSCE Score)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {selectedCase.displayName} • {selectedCase.elementLabel}
          </p>
        </div>

        {/* Big Score Box */}
        <div className={`w-full sm:w-auto p-5 rounded-2xl border ${scoreColorClass} flex items-center justify-center sm:justify-end gap-4 shadow-xs`}>
          <div className="text-center sm:text-right">
            <span className="text-xs font-semibold uppercase tracking-wider block opacity-80">
              คะแนนที่ได้รับ
            </span>
            <div className="flex items-baseline justify-center sm:justify-end gap-1">
              <span className="text-4xl sm:text-5xl font-black">{totalScore}</span>
              <span className="text-base font-semibold opacity-70">/ {maxScore}</span>
            </div>
            <span className="text-xs font-bold mt-0.5 inline-block">
              {percentage}% • {badgeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Session Metadata Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-1">
        <div className="space-y-1">
          <span className="text-slate-500 font-medium">กรณีศึกษา</span>
          <p className="text-sm font-bold text-slate-900">{selectedCase.displayName}</p>
          <span className="text-slate-500">{selectedCase.elementLabel}</span>
        </div>

        <div className="space-y-1">
          <span className="text-slate-500 font-medium">ระดับความยาก</span>
          <p className="text-sm font-bold text-slate-900">
            {selectedCase.difficulty === 'beginner' ? 'ระดับพื้นฐาน (Beginner)' : 'ระดับปานกลาง (Intermediate)'}
          </p>
          <span className="text-slate-500">แบบจำลอง 4 ธาตุ</span>
        </div>

        <div className="space-y-1">
          <span className="text-slate-500 font-medium">เวลาที่ใช้</span>
          <p className="text-sm font-bold text-slate-900">{formatElapsed(elapsedSeconds)}</p>
          <span className="text-slate-500">การสนทนาและวิเคราะห์</span>
        </div>

        <div className="space-y-1">
          <span className="text-slate-500 font-medium">เวลาที่ส่งประเมิน</span>
          <p className="text-xs font-bold text-slate-900">{formatTimestamp(submittedAt)}</p>
          <span className="text-emerald-700 font-semibold">สถานะ: ประเมินแล้ว</span>
        </div>
      </div>
    </section>
  );
};
