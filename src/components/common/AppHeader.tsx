import React from 'react';
import { RotateCcw, Clock, ShieldCheck, Check } from 'lucide-react';
import { ScreenType, CasePreview, PracticeMode } from '../../types';

interface AppHeaderProps {
  currentScreen: ScreenType;
  selectedCase: CasePreview | null;
  mode: PracticeMode;
  onNavigateHome: () => void;
  onResetCase: () => void;
}

const STEPS: { screen: ScreenType; label: string; number: number }[] = [
  { screen: 'WELCOME', label: 'หน้าแรก', number: 1 },
  { screen: 'CASE_SELECTION', label: 'เลือกกรณีศึกษา', number: 2 },
  { screen: 'SIMULATION', label: 'จำลองสถานการณ์', number: 3 },
  { screen: 'ANALYSIS', label: 'การวิเคราะห์', number: 4 },
  { screen: 'RESULTS', label: 'สรุปผล', number: 5 },
];

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentScreen,
  selectedCase,
  mode,
  onNavigateHome,
  onResetCase,
}) => {
  const currentStepIndex = STEPS.findIndex((s) => s.screen === currentScreen);

  return (
    <div className="sticky top-0 z-30 shadow-xs">
      {/* Top Brand & Status Bar (Deep Forest Green #1B4332) */}
      <header className="bg-[#1B4332] text-white px-4 sm:px-8 py-3.5 flex flex-wrap justify-between items-center gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <button
            id="brand-home-button"
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#40916C] rounded-lg p-1 -m-1 transition-opacity hover:opacity-95 cursor-pointer"
            title="กลับสู่หน้าแรก"
          >
            <div className="w-8 h-8 bg-[#40916C] rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-xs shrink-0">
              AI
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-semibold tracking-tight leading-tight text-white">
                AI ผู้รับบริการเสมือนเพื่อฝึกวิเคราะห์ธาตุเจ้าเรือน
              </h1>
              <span className="hidden sm:block text-[11px] text-white/70 font-normal">
                ระบบจำลองสถานการณ์การแพทย์แผนไทย (Milestone 1 UI Foundation)
              </span>
            </div>
          </button>
        </div>

        {/* Right Status Controls */}
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <span className="bg-[#2D6A4F] text-white px-3 py-1 rounded-full border border-[#40916C] text-xs font-medium inline-flex items-center gap-1.5 shadow-xs">
            {mode === 'training' ? 'โหมดฝึก (Training Mode)' : 'โหมดประเมิน (Assessment)'}
          </span>

          {selectedCase && currentScreen !== 'WELCOME' && (
            <div className="hidden lg:flex items-center gap-2 bg-[#2D6A4F]/60 text-white/90 px-3 py-1 rounded-full text-xs border border-white/10">
              <span className="font-semibold text-white">{selectedCase.displayName}</span>
              <span className="text-white/40">•</span>
              <span>{selectedCase.elementLabel}</span>
            </div>
          )}

          {currentScreen !== 'WELCOME' && (
            <button
              id="header-restart-btn"
              onClick={onResetCase}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 text-xs transition-colors cursor-pointer"
              title="เริ่มเลือกกรณีศึกษาใหม่"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">เลือกกรณีใหม่</span>
            </button>
          )}
        </div>
      </header>

      {/* Stepper Navigation Bar */}
      <nav aria-label="ขั้นตอนการจำลองสถานการณ์" className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center relative">
          {/* Subtle Connecting Line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 -z-0" />

          {STEPS.map((step, idx) => {
            const isCurrent = step.screen === currentScreen;
            const isPassed = currentStepIndex > idx;

            return (
              <div
                key={step.screen}
                className="flex flex-col items-center gap-1 bg-white px-2 relative z-10 select-none"
              >
                <div
                  className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-[#2D6A4F] text-white ring-4 ring-[#D8E2DC] shadow-xs'
                      : isPassed
                      ? 'bg-[#40916C] text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isPassed ? <Check className="w-3.5 h-3.5" /> : step.number}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] whitespace-nowrap transition-colors ${
                    isCurrent
                      ? 'font-bold text-[#1B4332]'
                      : isPassed
                      ? 'font-medium text-[#40916C]'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

