/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ScreenType, 
  PracticeMode, 
  TimerOption, 
  AnalysisFormData, 
  Attempt, 
  ChatMessage 
} from './types';
import { getCaseById, getCasePreviews } from './services/caseRegistry';
import { 
  loadCurrentAttempt, 
  saveCurrentAttempt, 
  clearCurrentAttempt 
} from './services/storageAdapter';
import { 
  createNewAttempt, 
  createRepeatAttempt,
  createDefaultAnalysisFormData 
} from './services/attemptManager';
import { evaluateAttempt } from './services/scoring/scoringEngine';
import { AppHeader } from './components/common/AppHeader';
import { ConfirmationModal } from './components/common/ConfirmationModal';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { CaseSelectionScreen } from './components/screens/CaseSelectionScreen';
import { SimulationScreen } from './components/screens/SimulationScreen';
import { AnalysisScreen } from './components/screens/AnalysisScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('WELCOME');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('case-earth-01');
  const [selectedMode, setSelectedMode] = useState<PracticeMode>('training');
  const [selectedTimer, setSelectedTimer] = useState<TimerOption>('none');
  const [analysisData, setAnalysisData] = useState<AnalysisFormData | null>(null);
  const [currentAttempt, setCurrentAttempt] = useState<Attempt | null>(null);

  // Unobtrusive session notification toast
  const [sessionToast, setSessionToast] = useState<{ message: string; type: 'info' | 'warning' } | null>(null);

  // Confirmation dialog for resetting/leaving active scenario
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [pendingResetDestination, setPendingResetDestination] = useState<ScreenType>('CASE_SELECTION');

  // Load and recover attempt session on initial mount
  useEffect(() => {
    const result = loadCurrentAttempt();

    if (result.success && result.attempt) {
      const recovered = result.attempt;
      const caseDef = getCaseById(recovered.caseId);

      if (caseDef) {
        setCurrentAttempt(recovered);
        setSelectedCaseId(recovered.caseId);
        setSelectedMode(recovered.mode);
        setSelectedTimer(recovered.timerOption);
        setAnalysisData(recovered.studentAnalysis || null);

        // Synchronize UI screen to recovered attempt status
        let targetScreen: ScreenType = 'WELCOME';
        switch (recovered.status) {
          case 'INTERVIEW':
            targetScreen = 'SIMULATION';
            break;
          case 'ANALYSIS':
          case 'SAFETY_REVIEW':
          case 'READY_TO_SUBMIT':
            targetScreen = 'ANALYSIS';
            break;
          case 'SUBMITTED':
          case 'RESULTS':
            targetScreen = 'RESULTS';
            break;
          case 'CASE_SETUP':
            targetScreen = 'CASE_SELECTION';
            break;
          default:
            targetScreen = 'WELCOME';
        }

        setCurrentScreen(targetScreen);
        setSessionToast({
          message: 'กู้คืนสถานการณ์ล่าสุดแล้ว',
          type: 'info'
        });
      }
    } else if (result.isCorrupt) {
      setSessionToast({
        message: 'ไม่สามารถกู้คืนสถานการณ์เดิมได้ จึงเริ่มเซสชันใหม่เพื่อความถูกต้องของข้อมูล',
        type: 'warning'
      });
    }
  }, []);

  // Automatically dismiss session toast after 4 seconds
  useEffect(() => {
    if (sessionToast) {
      const timer = setTimeout(() => {
        setSessionToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [sessionToast]);

  const allPreviews = getCasePreviews();
  const selectedCase = allPreviews.find((c) => c.id === selectedCaseId) || allPreviews[0] || null;

  // Navigation / Reset Handlers
  const handleRequestHome = () => {
    if (currentScreen === 'SIMULATION' || currentScreen === 'ANALYSIS') {
      setPendingResetDestination('WELCOME');
      setShowResetConfirm(true);
    } else {
      setCurrentScreen('WELCOME');
    }
  };

  const handleRequestResetCase = () => {
    if (currentScreen === 'SIMULATION' || currentScreen === 'ANALYSIS') {
      setPendingResetDestination('CASE_SELECTION');
      setShowResetConfirm(true);
    } else {
      setCurrentScreen('CASE_SELECTION');
    }
  };

  const handleConfirmReset = () => {
    setShowResetConfirm(false);
    clearCurrentAttempt();
    setCurrentAttempt(null);
    setAnalysisData(null);
    setCurrentScreen(pendingResetDestination);
  };

  // Screen Transitions & Session State Mutations
  const handleStartFromWelcome = () => {
    setCurrentScreen('CASE_SELECTION');
  };

  const handleStartScenario = () => {
    if (!selectedCaseId) return;
    const caseDef = getCaseById(selectedCaseId);
    if (!caseDef) return;

    const newAttempt = createNewAttempt(caseDef, selectedMode, selectedTimer);
    saveCurrentAttempt(newAttempt);
    setCurrentAttempt(newAttempt);
    setAnalysisData(newAttempt.studentAnalysis);
    setCurrentScreen('SIMULATION');
  };

  const handleUpdateTranscript = (messages: ChatMessage[]) => {
    if (!currentAttempt) return;
    const updatedAttempt: Attempt = {
      ...currentAttempt,
      transcript: messages
    };
    setCurrentAttempt(updatedAttempt);
    saveCurrentAttempt(updatedAttempt);
  };

  const handleUpdateAttempt = (updatedAttempt: Attempt) => {
    setCurrentAttempt(updatedAttempt);
    saveCurrentAttempt(updatedAttempt);
  };

  const handleEndInterview = () => {
    if (!currentAttempt) {
      setCurrentScreen('ANALYSIS');
      return;
    }

    const updatedAttempt: Attempt = {
      ...currentAttempt,
      status: 'ANALYSIS',
      interviewEndedAt: new Date().toISOString()
    };
    setCurrentAttempt(updatedAttempt);
    saveCurrentAttempt(updatedAttempt);
    setCurrentScreen('ANALYSIS');
  };

  const handleAnalysisFormChange = (data: AnalysisFormData, activeStep?: number) => {
    setAnalysisData(data);
    if (!currentAttempt) return;

    let targetStatus: Attempt['status'] = currentAttempt.status;
    if (activeStep === 6) {
      targetStatus = 'READY_TO_SUBMIT';
    } else if (activeStep === 4) {
      targetStatus = 'SAFETY_REVIEW';
    } else if (activeStep !== undefined && activeStep >= 1 && activeStep <= 5) {
      targetStatus = 'ANALYSIS';
    }

    const updatedAttempt: Attempt = {
      ...currentAttempt,
      studentAnalysis: data,
      analysisStep: activeStep !== undefined ? activeStep : (currentAttempt.analysisStep || 1),
      status: targetStatus
    };
    setCurrentAttempt(updatedAttempt);
    saveCurrentAttempt(updatedAttempt);
  };

  const handleSubmitAnalysis = (data: AnalysisFormData) => {
    setAnalysisData(data);

    if (currentAttempt) {
      const caseDef = getCaseById(currentAttempt.caseId);
      const baseAttempt: Attempt = {
        ...currentAttempt,
        status: 'SUBMITTED',
        submittedAt: new Date().toISOString(),
        studentAnalysis: data,
        submittedSnapshot: data
      };

      let assessment = null;
      if (caseDef) {
        try {
          assessment = evaluateAttempt(baseAttempt, caseDef);
        } catch (e) {
          console.error('[App] Scoring error:', e);
        }
      }

      const updatedAttempt: Attempt = {
        ...baseAttempt,
        assessmentResult: assessment,
        score: assessment ? assessment.totalScore : null,
        scoringVersion: assessment ? assessment.scoringVersion : undefined
      };

      setCurrentAttempt(updatedAttempt);
      saveCurrentAttempt(updatedAttempt);
    }

    setCurrentScreen('RESULTS');
  };

  const handleRepeatCase = () => {
    if (!selectedCaseId) return;
    const caseDef = getCaseById(selectedCaseId);
    if (!caseDef) return;

    if (currentAttempt) {
      const repeatAttempt = createRepeatAttempt(currentAttempt, caseDef);
      saveCurrentAttempt(repeatAttempt);
      setCurrentAttempt(repeatAttempt);
      setAnalysisData(repeatAttempt.studentAnalysis);
    } else {
      const newAttempt = createNewAttempt(caseDef, selectedMode, selectedTimer);
      saveCurrentAttempt(newAttempt);
      setCurrentAttempt(newAttempt);
      setAnalysisData(newAttempt.studentAnalysis);
    }

    setCurrentScreen('SIMULATION');
  };

  const handleSelectNewCase = () => {
    clearCurrentAttempt();
    setCurrentAttempt(null);
    setAnalysisData(null);
    setCurrentScreen('CASE_SELECTION');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col font-['Sarabun',sans-serif]">
      {/* Global Application Header */}
      <AppHeader
        currentScreen={currentScreen}
        selectedCase={selectedCase}
        mode={selectedMode}
        onNavigateHome={handleRequestHome}
        onResetCase={handleRequestResetCase}
      />

      {/* Unobtrusive Session Recovery Toast */}
      {sessionToast && (
        <div className="fixed bottom-14 right-4 z-50 animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${
              sessionToast.type === 'info'
                ? 'bg-[#1B4332] text-white border-[#2D6A4F]'
                : 'bg-amber-800 text-white border-amber-900'
            }`}
          >
            {sessionToast.type === 'info' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
            )}
            <span className="text-xs font-medium">{sessionToast.message}</span>
            <button
              onClick={() => setSessionToast(null)}
              className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="ปิดการแจ้งเตือน"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <div className="flex-1">
        {currentScreen === 'WELCOME' && (
          <WelcomeScreen onStart={handleStartFromWelcome} />
        )}

        {currentScreen === 'CASE_SELECTION' && (
          <CaseSelectionScreen
            selectedCaseId={selectedCaseId}
            selectedMode={selectedMode}
            selectedTimer={selectedTimer}
            onSelectCase={setSelectedCaseId}
            onSelectMode={setSelectedMode}
            onSelectTimer={setSelectedTimer}
            onStartScenario={handleStartScenario}
          />
        )}

        {currentScreen === 'SIMULATION' && (
          selectedCase ? (
            <SimulationScreen
              selectedCase={selectedCase}
              mode={selectedMode}
              timerOption={selectedTimer}
              attempt={currentAttempt}
              onUpdateTranscript={handleUpdateTranscript}
              onUpdateAttempt={handleUpdateAttempt}
              onEndInterview={handleEndInterview}
            />
          ) : (
            // Safe fallback if state was cleared
            <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
              <p className="text-sm text-slate-600">
                ไม่พบกรณีศึกษาที่เลือก กรุณากลับไปเลือกกรณีศึกษาใหม่อีกครั้ง
              </p>
              <button
                onClick={() => setCurrentScreen('CASE_SELECTION')}
                className="px-5 py-2.5 bg-[#1B4332] text-white text-sm font-bold rounded-xl hover:bg-[#2D6A4F] transition-colors"
              >
                เลือกกรณีศึกษา
              </button>
            </div>
          )
        )}

        {currentScreen === 'ANALYSIS' && (
          selectedCase ? (
            <AnalysisScreen
              selectedCase={selectedCase}
              attempt={currentAttempt}
              initialFormData={currentAttempt?.studentAnalysis || analysisData}
              initialStep={currentAttempt?.analysisStep || 1}
              onChangeFormData={handleAnalysisFormChange}
              onSubmitAnalysis={handleSubmitAnalysis}
            />
          ) : (
            <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
              <p className="text-sm text-slate-600">
                ไม่พบข้อมูลกรณีศึกษา กรุณากลับไปเลือกกรณีศึกษา
              </p>
              <button
                onClick={() => setCurrentScreen('CASE_SELECTION')}
                className="px-5 py-2.5 bg-[#1B4332] text-white text-sm font-bold rounded-xl hover:bg-[#2D6A4F] transition-colors"
              >
                เลือกกรณีศึกษา
              </button>
            </div>
          )
        )}

        {currentScreen === 'RESULTS' && (
          selectedCase ? (
            <ResultsScreen
              selectedCase={selectedCase}
              mode={selectedMode}
              analysisData={analysisData || currentAttempt?.studentAnalysis || null}
              attempt={currentAttempt}
              onRepeatCase={handleRepeatCase}
              onSelectNewCase={handleSelectNewCase}
            />
          ) : (
            <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
              <p className="text-sm text-slate-600">
                ไม่พบผลการประเมิน กรุณากลับสู่หน้าหลัก
              </p>
              <button
                onClick={() => setCurrentScreen('CASE_SELECTION')}
                className="px-5 py-2.5 bg-[#1B4332] text-white text-sm font-bold rounded-xl hover:bg-[#2D6A4F] transition-colors"
              >
                เลือกกรณีศึกษา
              </button>
            </div>
          )
        )}
      </div>

      {/* Global Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-medium text-slate-600">
            AI ผู้รับบริการเสมือนเพื่อฝึกวิเคราะห์ธาตุเจ้าเรือน (Milestone 2 — Case Data & Local Session)
          </span>
          <span className="text-slate-400">
            ระบบจำลองเพื่อการศึกษาการแพทย์แผนไทย • ข้อมูลผู้รับบริการจำลองเพื่อการพัฒนา (Draft)
          </span>
        </div>
      </footer>

      {/* Global Reset / Restart Confirmation Modal */}
      <ConfirmationModal
        isOpen={showResetConfirm}
        title="เริ่มสถานการณ์ใหม่?"
        message="คำตอบและความคืบหน้าของสถานการณ์ปัจจุบันจะถูกล้าง และไม่สามารถกู้คืนได้ ท่านต้องการดำเนินการต่อหรือไม่?"
        confirmLabel="ยืนยันการเริ่มใหม่"
        cancelLabel="กลับไปสถานการณ์เดิม"
        variant="warning"
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
}
