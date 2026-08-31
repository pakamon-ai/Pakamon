import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  Award,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { CasePreview, PracticeMode, TimerOption, DifficultyLevel } from '../../types';
import { getCasePreviews } from '../../services/caseRegistry';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

interface CaseSelectionScreenProps {
  selectedCaseId: string | null;
  selectedMode: PracticeMode;
  selectedTimer: TimerOption;
  onSelectCase: (caseId: string) => void;
  onSelectMode: (mode: PracticeMode) => void;
  onSelectTimer: (timer: TimerOption) => void;
  onStartScenario: () => void;
}

export const CaseSelectionScreen: React.FC<CaseSelectionScreenProps> = ({
  selectedCaseId,
  selectedMode,
  selectedTimer,
  onSelectCase,
  onSelectMode,
  onSelectTimer,
  onStartScenario,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const cases: CasePreview[] = getCasePreviews();

  const getElementIcon = (category: CasePreview['elementCategory']) => {
    switch (category) {
      case 'earth':
        return <Mountain className="w-4 h-4 text-amber-800" />;
      case 'water':
        return <Droplets className="w-4 h-4 text-sky-700" />;
      case 'wind':
        return <Wind className="w-4 h-4 text-[#2D6A4F]" />;
      case 'fire':
        return <Flame className="w-4 h-4 text-orange-700" />;
    }
  };

  const getDifficultyBadge = (difficulty: DifficultyLevel, label: string) => {
    switch (difficulty) {
      case 'basic':
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-[#1B4332] bg-[#EBF2EE] border border-[#40916C]/30 px-2 py-0.5 rounded-md">
            ระดับ: {label}
          </span>
        );
      case 'intermediate':
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            ระดับ: {label}
          </span>
        );
      case 'advanced':
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
            ระดับ: {label}
          </span>
        );
    }
  };

  const handleStart = () => {
    if (!selectedCaseId) {
      setValidationError('กรุณาเลือกกรณีศึกษาอย่างน้อย 1 กรณีเพื่อเริ่มสถานการณ์');
      return;
    }
    setValidationError(null);
    onStartScenario();
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Screen Header */}
      <section className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B4332] tracking-tight">
            เลือกกรณีศึกษา
          </h1>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>สถานะข้อมูล: ฉบับร่างเพื่อการพัฒนา (Draft)</span>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          เลือกกรณีศึกษาที่ต้องการฝึกซ้อม ข้อมูลที่แสดงในการเลือกเป็นการเปิดเผยข้อมูลแรกรับเบื้องต้น (Initial Disclosure) เท่านั้น ประวัติสุขภาพเชิงลึก พฤติกรรม และข้อมูลความปลอดภัยจะค้นพบได้จากการตั้งคำถามในบทสนทนา
        </p>
      </section>

      {/* Case Grid (4 Development Cases) */}
      <section aria-labelledby="cases-grid-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="cases-grid-heading" className="text-base font-bold text-[#1B4332] flex items-center gap-2">
            <span>กรณีศึกษาจำลอง (4 กรณีพัฒนา)</span>
            <span className="text-xs font-normal text-slate-500">(ดิน / น้ำ / ลม / ไฟ)</span>
          </h2>
          <span className="text-xs text-slate-500">คลิกที่การ์ดเพื่อเลือก</span>
        </div>

        {cases.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-600 space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-semibold text-slate-800">ไม่พบกรณีศึกษาที่พร้อมสำหรับการทดสอบ</p>
            <p className="text-xs text-slate-500">กรุณาตรวจสอบการลงทะเบียนกรณีศึกษาใน Case Registry</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.map((item) => {
              const isSelected = selectedCaseId === item.id;

              return (
                <div
                  key={item.id}
                  id={`case-card-${item.id}`}
                  onClick={() => {
                    onSelectCase(item.id);
                    setValidationError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCase(item.id);
                      setValidationError(null);
                    }
                  }}
                  tabIndex={0}
                  role="radio"
                  aria-checked={isSelected}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                    isSelected
                      ? 'bg-[#EBF2EE]/60 border-[#2D6A4F] ring-2 ring-[#D8E2DC] shadow-sm'
                      : 'bg-white border-slate-200 hover:border-[#40916C] hover:bg-[#F8F9FA]'
                  }`}
                >
                  {/* Selection Indicator Badge & Element Focus */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200">
                        {getElementIcon(item.elementCategory)}
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        {item.elementLabel}
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-[#2D6A4F] border-[#2D6A4F] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  {/* Patient Info & Disclosure */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-base font-bold text-[#1B4332]">
                        {item.displayName}
                      </h3>
                      <span className="text-xs text-slate-500 font-normal">
                        อายุ {item.age} ปี
                      </span>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-xl p-3 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-900 block mb-0.5">
                        อาการสำคัญแรกรับ (Chief Concern):
                      </span>
                      {item.shortConcern}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      บริบทแรกรับ: {item.briefContext}
                    </p>

                    {/* Metadata Footer */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                      {getDifficultyBadge(item.difficulty, item.difficultyLabel)}
                      <div className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>ประมาณ {item.estimatedMinutes} นาที</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Configuration Section: Mode & Timer */}
      <section 
        aria-labelledby="simulation-config-heading"
        className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6"
      >
        <h2 id="simulation-config-heading" className="text-base font-bold text-[#1B4332] border-b border-slate-100 pb-3">
          ตั้งค่ารูปแบบการจำลองสถานการณ์
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Mode Selection */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
              <span>โหมดการใช้งาน</span>
              <span className="text-xs font-normal text-slate-500">(เลือก 1 โหมด)</span>
            </legend>

            <div className="space-y-2">
              <label 
                htmlFor="mode-training"
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedMode === 'training'
                    ? 'border-[#2D6A4F] bg-[#EBF2EE]/70 text-slate-900 ring-1 ring-[#2D6A4F]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  id="mode-training"
                  type="radio"
                  name="practice-mode"
                  value="training"
                  checked={selectedMode === 'training'}
                  onChange={() => onSelectMode('training')}
                  className="mt-0.5 text-[#2D6A4F] focus:ring-[#2D6A4F]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#2D6A4F]" />
                    <span className="text-sm font-bold text-[#1B4332]">โหมดฝึกฝน (Training Mode)</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    เหมาะสำหรับการเรียนรู้ ไม่จำกัดเวลาตายตัว และสามารถทบทวนข้อความได้ตามความสะดวก
                  </p>
                </div>
              </label>

              <label 
                htmlFor="mode-assessment"
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedMode === 'assessment'
                    ? 'border-[#2D6A4F] bg-[#EBF2EE]/70 text-slate-900 ring-1 ring-[#2D6A4F]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  id="mode-assessment"
                  type="radio"
                  name="practice-mode"
                  value="assessment"
                  checked={selectedMode === 'assessment'}
                  onChange={() => onSelectMode('assessment')}
                  className="mt-0.5 text-[#2D6A4F] focus:ring-[#2D6A4F]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#2D6A4F]" />
                    <span className="text-sm font-bold text-[#1B4332]">โหมดประเมิน (Assessment Mode)</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    จำลองสถานการณ์เสมือนสอบ OSCE ประเมินการซักประวัติและให้คำแนะนำอย่างมีโครงสร้าง
                  </p>
                </div>
              </label>
            </div>
          </fieldset>

          {/* Timer Option */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
              <span>ตัวเลือกเวลาซักประวัติ</span>
              <span className="text-xs font-normal text-slate-500">(โครงสร้าง UI ตัวจับเวลา)</span>
            </legend>

            <div className="space-y-2">
              {[
                { id: 'timer-none', value: 'none', label: 'ไม่จำกัดเวลา', desc: 'ฝึกฝนได้ตามจังหวะของตนเอง' },
                { id: 'timer-10', value: '10', label: '10 นาที', desc: 'เหมาะสำหรับแบบจำลองสถานการณ์ OSCE ปกติ' },
                { id: 'timer-15', value: '15', label: '15 นาที', desc: 'เหมาะสำหรับการซักประวัติแบบละเอียด' },
              ].map((t) => (
                <label
                  key={t.id}
                  htmlFor={t.id}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedTimer === t.value
                      ? 'border-[#2D6A4F] bg-[#EBF2EE]/70 text-slate-900 ring-1 ring-[#2D6A4F]'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      id={t.id}
                      type="radio"
                      name="timer-option"
                      value={t.value}
                      checked={selectedTimer === t.value}
                      onChange={() => onSelectTimer(t.value as TimerOption)}
                      className="text-[#2D6A4F] focus:ring-[#2D6A4F]"
                    />
                    <div>
                      <span className="text-sm font-bold text-[#1B4332] block">{t.label}</span>
                      <span className="text-xs text-slate-500">{t.desc}</span>
                    </div>
                  </div>
                  <Clock className="w-4 h-4 text-slate-400" />
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Validation Warning if not selected */}
        {validationError && (
          <div 
            role="alert"
            className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            {selectedCaseId ? (
              <span className="text-[#1B4332] font-semibold">
                พร้อมเริ่มสถานการณ์: {cases.find((c) => c.id === selectedCaseId)?.displayName}
              </span>
            ) : (
              <span>กรุณาคลิกเลือก 1 กรณีศึกษาด้านบนเพื่อเริ่ม</span>
            )}
          </div>

          <button
            id="start-scenario-button"
            onClick={handleStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold rounded-xl shadow-lg shadow-[#1B4332]/20 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2 transition-all cursor-pointer"
          >
            <span>เริ่มสถานการณ์</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <DisclaimerBanner compact />
    </main>
  );
};
