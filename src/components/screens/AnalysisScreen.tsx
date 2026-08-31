import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  AlertTriangle, 
  Compass, 
  Utensils, 
  HeartPulse, 
  ShieldAlert, 
  FileCheck2, 
  Sparkles,
  MessageSquare,
  Edit3,
  CheckCircle2,
  AlertCircle,
  X,
  User,
  Clock,
  ShieldCheck,
  Send
} from 'lucide-react';
import { CasePreview, AnalysisFormData, Attempt, ChatMessage } from '../../types';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { 
  validateStep1, 
  validateStep2, 
  validateStep3, 
  validateStep4, 
  validateStep5, 
  validateAllSteps,
  StepValidationResult 
} from '../../utils/analysisValidation';

interface AnalysisScreenProps {
  selectedCase: CasePreview;
  attempt?: Attempt | null;
  initialFormData?: AnalysisFormData | null;
  initialStep?: number;
  onChangeFormData?: (data: AnalysisFormData, activeStep?: number) => void;
  onSubmitAnalysis: (data: AnalysisFormData) => void;
  onBackToSimulation?: () => void;
}

const STEP_TABS = [
  { step: 1, title: '1. วิเคราะห์ธาตุ', shortTitle: 'วิเคราะห์ธาตุ', icon: Compass },
  { step: 2, title: '2. คำแนะนำอาหาร', shortTitle: 'อาหารและรสยา', icon: Utensils },
  { step: 3, title: '3. การดูแลสุขภาพ', shortTitle: 'การดูแลสุขภาพ', icon: HeartPulse },
  { step: 4, title: '4. ความปลอดภัย', shortTitle: 'ความปลอดภัย', icon: ShieldAlert },
  { step: 5, title: '5. สรุปและติดตาม', shortTitle: 'สรุปและติดตาม', icon: FileCheck2 },
  { step: 6, title: '6. ตรวจสอบก่อนส่ง', shortTitle: 'ตรวจสอบและส่ง', icon: CheckCircle2 },
];

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({
  selectedCase,
  attempt,
  initialFormData,
  initialStep = 1,
  onChangeFormData,
  onSubmitAnalysis,
}) => {
  // Current active step (1 to 6, where 6 is Review & Submit)
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (attempt?.analysisStep && attempt.analysisStep >= 1 && attempt.analysisStep <= 6) {
      return attempt.analysisStep;
    }
    return initialStep >= 1 && initialStep <= 6 ? initialStep : 1;
  });

  // Form State
  const [formData, setFormData] = useState<AnalysisFormData>(() => {
    if (initialFormData) {
      return initialFormData;
    }
    if (attempt?.studentAnalysis) {
      return attempt.studentAnalysis;
    }
    return {
      birthElement: '',
      dominantElement: '',
      currentElement: '',
      elementCondition: [],
      relatedFactors: '',
      supportingReasons: '',

      recommendedTastes: [],
      encouragedFoods: '',
      reducedFoods: '',
      sampleMeals: '',
      sampleDrinks: '',
      foodRationale: '',

      restPlan: '',
      sleepPlan: '',
      movementPlan: '',
      ruesiDatTonPlan: '',
      stressManagement: '',
      otherActivities: '',
      selfCareRationale: '',

      foodAllergyReviewed: false,
      hasFoodAllergy: '',
      foodAllergyDetail: '',
      drugAllergyReviewed: false,
      hasDrugAllergy: '',
      drugAllergyDetail: '',
      herbalAllergyReviewed: false,
      hasHerbalAllergy: '',
      herbalAllergyDetail: '',
      underlyingDiseaseReviewed: false,
      hasUnderlyingDisease: '',
      underlyingDiseaseDetail: '',
      medicationsReviewed: false,
      currentMedications: '',
      contraindicationsReviewed: false,
      contraindications: '',
      redFlagsReviewed: false,
      redFlags: '',
      shouldRefer: 'undecided',
      referralReason: '',
      safetyNotes: '',

      summaryForPatient: '',
      understandingCheckMethod: '',
      followUpPlan: ''
    };
  });

  // Step Validation States & Error Notices
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [showSafetyGateWarning, setShowSafetyGateWarning] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Transcript Side Drawer
  const [showTranscriptDrawer, setShowTranscriptDrawer] = useState<boolean>(false);

  // Autosave debouncer
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Notify parent on form change with debouncing
  const triggerSave = (updatedData: AnalysisFormData, targetStep: number = currentStep) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      if (onChangeFormData) {
        onChangeFormData(updatedData, targetStep);
      }
    }, 300);
  };

  const handleInputChange = <K extends keyof AnalysisFormData>(field: K, value: AnalysisFormData[K]) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      triggerSave(next, currentStep);
      return next;
    });

    // Clear specific field error on edit
    if (stepErrors[field as string]) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    }
  };

  const handleToggleCondition = (item: string) => {
    setFormData((prev) => {
      const exists = prev.elementCondition.includes(item);
      const nextConditions = exists
        ? prev.elementCondition.filter((c) => c !== item)
        : [...prev.elementCondition, item];
      const next = { ...prev, elementCondition: nextConditions };
      triggerSave(next, currentStep);
      return next;
    });
    if (stepErrors.elementCondition) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next.elementCondition;
        return next;
      });
    }
  };

  const handleToggleTaste = (item: string) => {
    setFormData((prev) => {
      const exists = prev.recommendedTastes.includes(item);
      const nextTastes = exists
        ? prev.recommendedTastes.filter((t) => t !== item)
        : [...prev.recommendedTastes, item];
      const next = { ...prev, recommendedTastes: nextTastes };
      triggerSave(next, currentStep);
      return next;
    });
    if (stepErrors.generalFood) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next.generalFood;
        return next;
      });
    }
  };

  // Step Validation Dispatcher
  const validateCurrentStepOnly = (stepNum: number): StepValidationResult => {
    switch (stepNum) {
      case 1:
        return validateStep1(formData);
      case 2:
        return validateStep2(formData);
      case 3:
        return validateStep3(formData);
      case 4:
        return validateStep4(formData);
      case 5:
        return validateStep5(formData);
      default:
        return { isValid: true, errors: {} };
    }
  };

  // Navigation handlers
  const handleGoNext = () => {
    if (currentStep <= 5) {
      const result = validateCurrentStepOnly(currentStep);
      if (!result.isValid) {
        setStepErrors(result.errors);
        window.scrollTo({ top: 120, behavior: 'smooth' });
        return;
      }
      setStepErrors({});
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      triggerSave(formData, nextStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoPrev = () => {
    if (currentStep > 1) {
      setStepErrors({});
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      triggerSave(formData, prevStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (targetStep: number) => {
    // If jumping forward, validate the current step first
    if (targetStep > currentStep) {
      const result = validateCurrentStepOnly(currentStep);
      if (!result.isValid) {
        setStepErrors(result.errors);
        return;
      }
    }
    setStepErrors({});
    setCurrentStep(targetStep);
    triggerSave(formData, targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safety Gate Pre-submission Check
  const handleProceedToSubmit = () => {
    const fullValidation = validateAllSteps(formData);
    if (!fullValidation.isAllValid) {
      if (!fullValidation.isSafetyValid) {
        setShowSafetyGateWarning(true);
      }
      // Jump to first incomplete step
      const firstIncomplete = fullValidation.incompleteStepNumbers[0] || 1;
      setCurrentStep(firstIncomplete);
      setStepErrors(fullValidation.stepResults[firstIncomplete]?.errors || {});
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setShowSafetyGateWarning(false);
    setShowSubmitModal(true);
  };

  // Final submit handler with double-submission protection
  const handleConfirmFinalSubmit = () => {
    if (isSubmitting) return;

    // Double-check validation and safety gate
    const fullValidation = validateAllSteps(formData);
    if (!fullValidation.isAllValid) {
      setShowSubmitModal(false);
      const firstIncomplete = fullValidation.incompleteStepNumbers[0] || 1;
      setCurrentStep(firstIncomplete);
      setStepErrors(fullValidation.stepResults[firstIncomplete]?.errors || {});
      return;
    }

    setIsSubmitting(true);
    setShowSubmitModal(false);
    onSubmitAnalysis(formData);
  };

  // Compute validation status for each step indicator
  const step1Valid = validateStep1(formData).isValid;
  const step2Valid = validateStep2(formData).isValid;
  const step3Valid = validateStep3(formData).isValid;
  const step4Valid = validateStep4(formData).isValid;
  const step5Valid = validateStep5(formData).isValid;

  const isStepFilled = (stepNum: number): boolean => {
    switch (stepNum) {
      case 1: return step1Valid;
      case 2: return step2Valid;
      case 3: return step3Valid;
      case 4: return step4Valid;
      case 5: return step5Valid;
      case 6: return step1Valid && step2Valid && step3Valid && step4Valid && step5Valid;
      default: return false;
    }
  };

  // Clean transcript messages (ensuring no internal metadata is shown)
  const cleanTranscript: ChatMessage[] = (attempt?.transcript || []).filter(
    (m) => m.sender === 'patient' || m.sender === 'student'
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 animate-in fade-in duration-300">
      {/* Header Context Bar */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#1B4332] bg-[#EBF2EE] px-3 py-1 rounded-full border border-[#40916C]/30">
              ขั้นตอนที่ 4: การวิเคราะห์และวางแผนการดูแล
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              (บันทึกผลการประเมินเพื่อเตรียมส่งคำตอบ)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1B4332]">
            บันทึกการวิเคราะห์ธาตุเจ้าเรือนและคำแนะนำ
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            กรณีศึกษา: <span className="font-semibold text-slate-900">{selectedCase.displayName}</span> ({selectedCase.elementLabel})
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Transcript Drawer Toggle Button */}
          <button
            type="button"
            id="toggle-transcript-btn"
            onClick={() => setShowTranscriptDrawer(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1B4332] bg-[#EBF2EE] hover:bg-[#d8e8de] border border-[#40916C]/30 transition-colors cursor-pointer"
            title="เปิดดูบทสนทนาจากการซักประวัติ"
          >
            <MessageSquare className="w-4 h-4 text-[#2D6A4F]" />
            <span>ดูบทสนทนาย้อนหลัง</span>
            <span className="bg-[#2D6A4F] text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {cleanTranscript.length}
            </span>
          </button>
        </div>
      </section>

      {/* Stepper Navigation Bar */}
      <nav aria-label="แถบขั้นตอนการบันทึกข้อมูล" className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-max">
          {STEP_TABS.map((tab) => {
            const Icon = tab.icon;
            const isCurrent = currentStep === tab.step;
            const isComplete = isStepFilled(tab.step);
            const isSafety = tab.step === 4;
            const isReview = tab.step === 6;

            let tabClasses = 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50';
            let circleClasses = 'bg-slate-100 text-slate-500';

            if (isCurrent) {
              if (isSafety) {
                tabClasses = 'bg-amber-700 text-white border-amber-800 shadow-sm';
                circleClasses = 'bg-white text-amber-900 font-bold';
              } else if (isReview) {
                tabClasses = 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm';
                circleClasses = 'bg-white text-[#1B4332] font-bold';
              } else {
                tabClasses = 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-sm';
                circleClasses = 'bg-white text-[#2D6A4F] font-bold';
              }
            } else if (isComplete) {
              tabClasses = 'bg-[#F8FAF9] border-[#40916C]/30 text-[#1B4332] hover:bg-[#EBF2EE]';
              circleClasses = 'bg-[#EBF2EE] text-[#1B4332] font-bold border border-[#40916C]/30';
            }

            return (
              <button
                key={tab.step}
                type="button"
                id={`analysis-step-tab-${tab.step}`}
                onClick={() => handleJumpToStep(tab.step)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${tabClasses}`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${circleClasses}`}>
                  {isComplete && !isCurrent ? <Check className="w-3 h-3 text-[#2D6A4F]" /> : tab.step}
                </div>
                <span>{tab.title}</span>
                {isComplete && !isCurrent && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                    กรอกครบ
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Safety Gate Warning Banner (Shown if user tries to submit without completing safety) */}
      {showSafetyGateWarning && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3 animate-in fade-in">
          <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-950 space-y-1">
            <strong className="font-bold block">
              กรุณาตรวจสอบหัวข้อความปลอดภัยให้ครบก่อนส่งคำตอบ
            </strong>
            <p>
              หมวดความปลอดภัยเป็นเกณฑ์บังคับในการประเมิน กรุณาตรวจสอบประวัติการแพ้, โรคประจำตัว, ยาที่ใช้, ข้อห้าม, สัญญาณอันตราย และระบุการตัดสินใจส่งต่อให้ครบถ้วนในขั้นตอนที่ 4
            </p>
          </div>
        </div>
      )}

      {/* Step Error Summary Alert */}
      {Object.keys(stepErrors).length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-rose-950 space-y-1">
            <strong className="font-bold block">กรุณากรอกข้อมูลในช่องที่จำเป็นให้ครบถ้วน</strong>
            <ul className="list-disc list-inside space-y-0.5 text-xs text-rose-900">
              {Object.values(stepErrors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Main Form Content Container */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* ========================================================= */}
        {/* STEP 1: วิเคราะห์ธาตุ */}
        {/* ========================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#2D6A4F]" />
                <span>ขั้นตอนที่ 1: วิเคราะห์ธาตุเจ้าเรือนและภาวะธาตุ</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                ระบุธาตุกำเนิด ธาตุเด่น และภาวะธาตุปัจจุบัน พร้อมทั้งหลักฐานที่ค้นพบจากการซักประวัติ
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Birth Element */}
              <div className="space-y-1.5">
                <label htmlFor="input-birth-element" className="block text-sm font-semibold text-slate-800">
                  ธาตุเจ้าเรือนกำเนิด <span className="text-rose-600">*</span>
                </label>
                <select
                  id="input-birth-element"
                  value={formData.birthElement}
                  onChange={(e) => handleInputChange('birthElement', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                    stepErrors.birthElement ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                  }`}
                >
                  <option value="">-- เลือกธาตุเจ้าเรือนกำเนิด --</option>
                  <option value="ปฐวีธาตุ (ธาตุดิน)">ปฐวีธาตุ (ธาตุดิน)</option>
                  <option value="อาโปธาตุ (ธาตุน้ำ)">อาโปธาตุ (ธาตุน้ำ)</option>
                  <option value="วาโยธาตุ (ธาตุลม)">วาโยธาตุ (ธาตุลม)</option>
                  <option value="เตโชธาตุ (ธาตุไฟ)">เตโชธาตุ (ธาตุไฟ)</option>
                </select>
                {stepErrors.birthElement && (
                  <p className="text-xs text-rose-600">{stepErrors.birthElement}</p>
                )}
              </div>

              {/* Dominant Element */}
              <div className="space-y-1.5">
                <label htmlFor="input-dominant-element" className="block text-sm font-semibold text-slate-800">
                  ธาตุเด่นตามลักษณะโครงสร้าง / ภูมิคุ้มกัน <span className="text-rose-600">*</span>
                </label>
                <select
                  id="input-dominant-element"
                  value={formData.dominantElement}
                  onChange={(e) => handleInputChange('dominantElement', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                    stepErrors.dominantElement ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                  }`}
                >
                  <option value="">-- เลือกธาตุเด่น --</option>
                  <option value="ปฐวีธาตุ (ธาตุดิน)">ปฐวีธาตุ (ธาตุดิน)</option>
                  <option value="อาโปธาตุ (ธาตุน้ำ)">อาโปธาตุ (ธาตุน้ำ)</option>
                  <option value="วาโยธาตุ (ธาตุลม)">วาโยธาตุ (ธาตุลม)</option>
                  <option value="เตโชธาตุ (ธาตุไฟ)">เตโชธาตุ (ธาตุไฟ)</option>
                </select>
                {stepErrors.dominantElement && (
                  <p className="text-xs text-rose-600">{stepErrors.dominantElement}</p>
                )}
              </div>

              {/* Current Element */}
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="input-current-element" className="block text-sm font-semibold text-slate-800">
                  ธาตุปัจจุบันที่มีปัญหา / เสียสมดุล <span className="text-rose-600">*</span>
                </label>
                <input
                  id="input-current-element"
                  type="text"
                  value={formData.currentElement}
                  onChange={(e) => handleInputChange('currentElement', e.target.value)}
                  placeholder="ระบุธาตุปัจจุบัน เช่น ปฐวีธาตุ และ วาโยธาตุ หรือ วาโยธาตุเป็นหลัก"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                    stepErrors.currentElement ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                  }`}
                />
                {stepErrors.currentElement && (
                  <p className="text-xs text-rose-600">{stepErrors.currentElement}</p>
                )}
              </div>

              {/* Element Condition */}
              <div className="space-y-1.5 sm:col-span-2">
                <span className="block text-sm font-semibold text-slate-800">
                  ภาวะธาตุผิดปกติ (เลือกได้มากกว่า 1 ภาวะ) <span className="text-rose-600">*</span>
                </span>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {['กำเริบ', 'หย่อน', 'พิการ', 'ปกติ / ไม่ระบุภาวะ'].map((cond) => {
                    const isChecked = formData.elementCondition.includes(cond);
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => handleToggleCondition(cond)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {isChecked ? `✓ ${cond}` : cond}
                      </button>
                    );
                  })}
                </div>
                {stepErrors.elementCondition && (
                  <p className="text-xs text-rose-600">{stepErrors.elementCondition}</p>
                )}
              </div>
            </div>

            {/* Related Factors (Optional) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="input-related-factors" className="block text-sm font-semibold text-slate-800">
                  ปัจจัยสมุฏฐานที่เกี่ยวข้อง
                </label>
                <span className="text-xs text-slate-400">ระบุหรือไม่ระบุก็ได้ (Optional)</span>
              </div>
              <p className="text-xs text-slate-500">
                เช่น อายุ/วัยสมุฏฐาน, กาล/ฤดูสมุฏฐาน, ประเทศ/ถิ่นที่อยู่, มูลเหตุเกิดโรคและพฤติกรรม
              </p>
              <textarea
                id="input-related-factors"
                rows={2}
                value={formData.relatedFactors}
                onChange={(e) => handleInputChange('relatedFactors', e.target.value)}
                placeholder="ระบุความเชื่อมโยงกับปัจจัยภายนอกและพฤติกรรมของผู้รับบริการ..."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>

            {/* Supporting Reasons & Evidence */}
            <div className="space-y-1.5">
              <label htmlFor="input-supporting-reasons" className="block text-sm font-semibold text-slate-800">
                ข้อมูลสนับสนุน / เหตุผลทางทฤษฎีการแพทย์แผนไทย <span className="text-rose-600">*</span>
              </label>
              <p className="text-xs text-slate-500">
                อธิบายหลักฐานและอาการสำคัญที่ค้นพบจากการซักประวัติที่สนับสนุนการวิเคราะห์ธาตุข้างต้น
              </p>
              <textarea
                id="input-supporting-reasons"
                rows={3}
                value={formData.supportingReasons}
                onChange={(e) => handleInputChange('supportingReasons', e.target.value)}
                placeholder="อธิบายหลักฐานจากการซักประวัติและเหตุผลทางทฤษฎี..."
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                  stepErrors.supportingReasons ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                }`}
              />
              {stepErrors.supportingReasons && (
                <p className="text-xs text-rose-600">{stepErrors.supportingReasons}</p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: คำแนะนำด้านอาหาร */}
        {/* ========================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#2D6A4F]" />
                <span>ขั้นตอนที่ 2: คำแนะนำด้านอาหารและรสยา (Food Guidance)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                กำหนดรสอาหาร เมนูอาหาร และเครื่องดื่มที่เหมาะสมเพื่อปรับสมดุลธาตุ
              </p>
            </div>

            {/* Recommended Tastes */}
            <div className="space-y-2">
              <span className="block text-sm font-semibold text-slate-800">
                รสอาหารที่ควรส่งเสริม (เลือกตามหลักรสยา 9 รส)
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'รสสุขุม',
                  'รสเผ็ดร้อน',
                  'รสเผ็ดร้อนอ่อนๆ',
                  'รสหวาน',
                  'รสเค็ม',
                  'รสเปรี้ยว',
                  'รสขม',
                  'รสฝาด',
                  'รสมัน',
                  'รสเมาเบื่อ',
                  'รสจืด'
                ].map((taste) => {
                  const isChecked = formData.recommendedTastes.includes(taste);
                  return (
                    <button
                      key={taste}
                      type="button"
                      onClick={() => handleToggleTaste(taste)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {isChecked ? `✓ ${taste}` : taste}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Encouraged Foods */}
              <div className="space-y-1.5">
                <label htmlFor="input-encouraged-foods" className="block text-sm font-semibold text-slate-800">
                  อาหารและสมุนไพรที่ควรส่งเสริม
                </label>
                <textarea
                  id="input-encouraged-foods"
                  rows={2}
                  value={formData.encouragedFoods}
                  onChange={(e) => handleInputChange('encouragedFoods', e.target.value)}
                  placeholder="เช่น ผักพื้นบ้าน เครื่องเทศปรุงรส อาหารปรุงสุกใหม่..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Reduced/Avoided Foods */}
              <div className="space-y-1.5">
                <label htmlFor="input-reduced-foods" className="block text-sm font-semibold text-slate-800">
                  อาหารที่ควรลดหรือหลีกเลี่ยง
                </label>
                <textarea
                  id="input-reduced-foods"
                  rows={2}
                  value={formData.reducedFoods}
                  onChange={(e) => handleInputChange('reducedFoods', e.target.value)}
                  placeholder="เช่น อาหารรสจัด ของทอด ของมัน ของหมักดอง น้ำเย็นจัด..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Sample Meals */}
              <div className="space-y-1.5">
                <label htmlFor="input-sample-meals" className="block text-sm font-semibold text-slate-800">
                  ตัวอย่างเมนูอาหารแนะนำ (2-3 เมนู)
                </label>
                <input
                  id="input-sample-meals"
                  type="text"
                  value={formData.sampleMeals}
                  onChange={(e) => handleInputChange('sampleMeals', e.target.value)}
                  placeholder="เช่น ต้มส้มปลา, แกงเลียงผักรวม, ผัดผักกาดขาว"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Sample Drinks */}
              <div className="space-y-1.5">
                <label htmlFor="input-sample-drinks" className="block text-sm font-semibold text-slate-800">
                  ตัวอย่างเครื่องดื่มสมุนไพร
                </label>
                <input
                  id="input-sample-drinks"
                  type="text"
                  value={formData.sampleDrinks}
                  onChange={(e) => handleInputChange('sampleDrinks', e.target.value)}
                  placeholder="เช่น น้ำขิงอุ่น, น้ำตะไคร้ใบเตย"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            {/* Food Rationale */}
            <div className="space-y-1.5">
              <label htmlFor="input-food-rationale" className="block text-sm font-semibold text-slate-800">
                เหตุผลประกอบคำแนะนำด้านอาหาร <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="input-food-rationale"
                rows={2}
                value={formData.foodRationale}
                onChange={(e) => handleInputChange('foodRationale', e.target.value)}
                placeholder="อธิบายว่าอาหารและรสยาที่แนะนำจะช่วยปรับสมดุลธาตุของผู้รับบริการอย่างไร..."
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                  stepErrors.foodRationale ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                }`}
              />
              {stepErrors.foodRationale && (
                <p className="text-xs text-rose-600">{stepErrors.foodRationale}</p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: การดูแลสุขภาพ */}
        {/* ========================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#2D6A4F]" />
                <span>ขั้นตอนที่ 3: คำแนะนำการดูแลสุขภาพและกายบริหาร (Self-Care)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                การพักผ่อน สุขอนามัยการนอนหลับ การเคลื่อนไหว ฤๅษีดัดตน และการจัดการอารมณ์ความเครียด
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Rest Plan */}
              <div className="space-y-1.5">
                <label htmlFor="input-rest-plan" className="block text-sm font-semibold text-slate-800">
                  การพักผ่อนระหว่างวัน / ปรับอิริยาบถ
                </label>
                <textarea
                  id="input-rest-plan"
                  rows={2}
                  value={formData.restPlan}
                  onChange={(e) => handleInputChange('restPlan', e.target.value)}
                  placeholder="เช่น การจัดเวลาพักสายตา ยืดเหยียดระหว่างทำงาน..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Sleep Plan */}
              <div className="space-y-1.5">
                <label htmlFor="input-sleep-plan" className="block text-sm font-semibold text-slate-800">
                  สุขอนามัยการนอนหลับ (Sleep Hygiene)
                </label>
                <textarea
                  id="input-sleep-plan"
                  rows={2}
                  value={formData.sleepPlan}
                  onChange={(e) => handleInputChange('sleepPlan', e.target.value)}
                  placeholder="เช่น เวลาเข้านอน ชั่วโมงการนอนหลับ การเตรียมตัวก่อนนอน..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Movement Plan */}
              <div className="space-y-1.5">
                <label htmlFor="input-movement-plan" className="block text-sm font-semibold text-slate-800">
                  การเคลื่อนไหวและการออกกำลังกาย
                </label>
                <textarea
                  id="input-movement-plan"
                  rows={2}
                  value={formData.movementPlan}
                  onChange={(e) => handleInputChange('movementPlan', e.target.value)}
                  placeholder="เช่น การเดินเบาๆ แกว่งแขน การยืดเหยียดกล้ามเนื้อ..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Ruesi Dat Ton */}
              <div className="space-y-1.5">
                <label htmlFor="input-ruesi-plan" className="block text-sm font-semibold text-slate-800">
                  ท่ากายบริหารฤๅษีดัดตนแนะนำ
                </label>
                <textarea
                  id="input-ruesi-plan"
                  rows={2}
                  value={formData.ruesiDatTonPlan}
                  onChange={(e) => handleInputChange('ruesiDatTonPlan', e.target.value)}
                  placeholder="ระบุท่าฤๅษีดัดตนที่เหมาะสมกับอาการ..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Stress Management */}
              <div className="space-y-1.5">
                <label htmlFor="input-stress-mgmt" className="block text-sm font-semibold text-slate-800">
                  การจัดการอารมณ์และความเครียด
                </label>
                <textarea
                  id="input-stress-mgmt"
                  rows={2}
                  value={formData.stressManagement}
                  onChange={(e) => handleInputChange('stressManagement', e.target.value)}
                  placeholder="เช่น การฝึกกำหนดลมหายใจ การผ่อนคลายจิตใจ..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Other Activities */}
              <div className="space-y-1.5">
                <label htmlFor="input-other-act" className="block text-sm font-semibold text-slate-800">
                  กิจกรรมส่งเสริมสุขภาพอื่นๆ
                </label>
                <textarea
                  id="input-other-act"
                  rows={2}
                  value={formData.otherActivities}
                  onChange={(e) => handleInputChange('otherActivities', e.target.value)}
                  placeholder="เช่น การปรับสภาพแวดล้อมที่อยู่อาศัยและการทำงาน..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            {/* Self-Care Rationale */}
            <div className="space-y-1.5">
              <label htmlFor="input-selfcare-rationale" className="block text-sm font-semibold text-slate-800">
                เหตุผลประกอบคำแนะนำด้านการดูแลสุขภาพ <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="input-selfcare-rationale"
                rows={2}
                value={formData.selfCareRationale}
                onChange={(e) => handleInputChange('selfCareRationale', e.target.value)}
                placeholder="อธิบายเหตุผลและความสอดคล้องกับพฤติกรรมของผู้รับบริการ..."
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                  stepErrors.selfCareRationale ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                }`}
              />
              {stepErrors.selfCareRationale && (
                <p className="text-xs text-rose-600">{stepErrors.selfCareRationale}</p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 4: ความปลอดภัย (Safety Review & Gate) */}
        {/* ========================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            {/* Safety Banner */}
            <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-bold text-amber-950">
                  ขั้นตอนที่ 4: ความปลอดภัย ข้อห้าม และการส่งต่อ (Safety Review & Gate)
                </h2>
                <p className="text-xs text-amber-900 mt-0.5">
                  เกณฑ์ความปลอดภัยบังคับ: กรุณายืนยันการตรวจสอบประวัติแพ้, โรคประจำตัว, ยาที่ใช้, ข้อห้าม, สัญญาณอันตราย และตัดสินใจส่งต่อให้ครบทุกข้อ
                </p>
              </div>
            </div>

            {/* Section 1: History & Allergies Review */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                1. การตรวจสอบประวัติสำคัญ (Allergies & Medical History)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Food Allergy */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  formData.foodAllergyReviewed ? 'bg-emerald-50/40 border-emerald-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>ประวัติแพ้อาหาร</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-[#1B4332] font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.foodAllergyReviewed}
                        onChange={(e) => handleInputChange('foodAllergyReviewed', e.target.checked)}
                        className="rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
                      />
                      <span>ยืนยันตรวจแล้ว</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.hasFoodAllergy}
                    onChange={(e) => handleInputChange('hasFoodAllergy', e.target.value)}
                    placeholder="ระบุสิ่งที่พบ เช่น ไม่มี หรือ แพ้อาหารทะเล"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                  {stepErrors.foodAllergy && (
                    <p className="text-[11px] text-rose-600 mt-1">{stepErrors.foodAllergy}</p>
                  )}
                </div>

                {/* Drug Allergy */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  formData.drugAllergyReviewed ? 'bg-emerald-50/40 border-emerald-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>ประวัติแพ้ยาแผนปัจจุบัน</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-[#1B4332] font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.drugAllergyReviewed}
                        onChange={(e) => handleInputChange('drugAllergyReviewed', e.target.checked)}
                        className="rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
                      />
                      <span>ยืนยันตรวจแล้ว</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.hasDrugAllergy}
                    onChange={(e) => handleInputChange('hasDrugAllergy', e.target.value)}
                    placeholder="ระบุสิ่งที่พบ เช่น ไม่มี หรือ แพ้ Penicillin"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                  {stepErrors.drugAllergy && (
                    <p className="text-[11px] text-rose-600 mt-1">{stepErrors.drugAllergy}</p>
                  )}
                </div>

                {/* Herbal Allergy */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  formData.herbalAllergyReviewed ? 'bg-emerald-50/40 border-emerald-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>ประวัติแพ้ยาสมุนไพร</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-[#1B4332] font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.herbalAllergyReviewed}
                        onChange={(e) => handleInputChange('herbalAllergyReviewed', e.target.checked)}
                        className="rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
                      />
                      <span>ยืนยันตรวจแล้ว</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.hasHerbalAllergy}
                    onChange={(e) => handleInputChange('hasHerbalAllergy', e.target.value)}
                    placeholder="ระบุสิ่งที่พบ เช่น ไม่มี หรือ เคยแพ้ฟ้าทะลายโจร"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                  {stepErrors.herbalAllergy && (
                    <p className="text-[11px] text-rose-600 mt-1">{stepErrors.herbalAllergy}</p>
                  )}
                </div>

                {/* Underlying Disease */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  formData.underlyingDiseaseReviewed ? 'bg-emerald-50/40 border-emerald-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>โรคประจำตัว</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-[#1B4332] font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.underlyingDiseaseReviewed}
                        onChange={(e) => handleInputChange('underlyingDiseaseReviewed', e.target.checked)}
                        className="rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
                      />
                      <span>ยืนยันตรวจแล้ว</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.hasUnderlyingDisease}
                    onChange={(e) => handleInputChange('hasUnderlyingDisease', e.target.value)}
                    placeholder="ระบุโรคประจำตัว เช่น ไขมันในเลือดสูง หรือ ไม่มี"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                  {stepErrors.underlyingDisease && (
                    <p className="text-[11px] text-rose-600 mt-1">{stepErrors.underlyingDisease}</p>
                  )}
                </div>

                {/* Current Medications */}
                <div className={`p-3.5 rounded-xl border sm:col-span-2 transition-all ${
                  formData.medicationsReviewed ? 'bg-emerald-50/40 border-emerald-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>ยาแผนปัจจุบันหรืออาหารเสริมที่กำลังใช้อยู่</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-[#1B4332] font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.medicationsReviewed}
                        onChange={(e) => handleInputChange('medicationsReviewed', e.target.checked)}
                        className="rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
                      />
                      <span>ยืนยันตรวจแล้ว</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.currentMedications}
                    onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                    placeholder="ระบุยาที่ใช้ประจำ เช่น ยาลดไขมัน วิตามิน หรือ ไม่มี"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                  {stepErrors.medications && (
                    <p className="text-[11px] text-rose-600 mt-1">{stepErrors.medications}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Contraindications & Red Flags */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                2. การประเมินข้อห้ามและสัญญาณอันตราย (Contraindications & Red Flags)
              </h3>

              <div className="space-y-4">
                {/* Contraindications */}
                <div className={`p-4 rounded-xl border transition-all ${
                  formData.contraindicationsReviewed ? 'bg-emerald-50/30 border-emerald-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label htmlFor="input-contraindications" className="block text-xs font-bold text-slate-800">
                      ข้อห้ามและข้อควรระวังสำคัญสำหรับกรณีนี้
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-[#1B4332] font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.contraindicationsReviewed}
                        onChange={(e) => handleInputChange('contraindicationsReviewed', e.target.checked)}
                        className="rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
                      />
                      <span>ยืนยันตรวจข้อห้ามแล้ว</span>
                    </label>
                  </div>
                  <textarea
                    id="input-contraindications"
                    rows={2}
                    value={formData.contraindications}
                    onChange={(e) => handleInputChange('contraindications', e.target.value)}
                    placeholder="ระบุข้อห้ามหรือข้อควรระวังในการปฏิบัติตัวและการใช้สมุนไพร..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                  {stepErrors.contraindications && (
                    <p className="text-xs text-rose-600 mt-1">{stepErrors.contraindications}</p>
                  )}
                </div>

                {/* Red Flags */}
                <div className={`p-4 rounded-xl border transition-all ${
                  formData.redFlagsReviewed ? 'bg-rose-50/60 border-rose-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label htmlFor="input-red-flags" className="block text-xs font-bold text-rose-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>สัญญาณเตือนอันตราย (Red Flags) ที่ต้องส่งพบแพทย์ทันที</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-rose-900 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.redFlagsReviewed}
                        onChange={(e) => handleInputChange('redFlagsReviewed', e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500"
                      />
                      <span>ยืนยันตรวจ Red Flags แล้ว</span>
                    </label>
                  </div>
                  <textarea
                    id="input-red-flags"
                    rows={2}
                    value={formData.redFlags}
                    onChange={(e) => handleInputChange('redFlags', e.target.value)}
                    placeholder="ระบุสัญญาณอันตรายที่ผู้รับบริการต้องสังเกตและรีบพบแพทย์..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  {stepErrors.redFlags && (
                    <p className="text-xs text-rose-600 mt-1">{stepErrors.redFlags}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Referral Decision */}
            <fieldset className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
              <legend className="text-sm font-bold text-slate-900">
                3. การตัดสินใจส่งต่อพบแพทย์แผนปัจจุบัน / ผู้เชี่ยวชาญ <span className="text-rose-600">*</span>
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.shouldRefer === 'no'
                    ? 'bg-emerald-50 border-emerald-500 text-[#1B4332]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="should-refer"
                    value="no"
                    checked={formData.shouldRefer === 'no'}
                    onChange={() => handleInputChange('shouldRefer', 'no')}
                    className="text-[#2D6A4F] focus:ring-[#2D6A4F] mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-bold block">ยังไม่จำเป็นต้องส่งต่อ</span>
                    <span className="text-xs text-slate-500">สามารถดูแลด้วยตนเองและปรับพฤติกรรมตามคำแนะนำได้</span>
                  </div>
                </label>

                <label className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.shouldRefer === 'yes'
                    ? 'bg-rose-50 border-rose-500 text-rose-950'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="should-refer"
                    value="yes"
                    checked={formData.shouldRefer === 'yes'}
                    onChange={() => handleInputChange('shouldRefer', 'yes')}
                    className="text-rose-600 focus:ring-rose-500 mt-0.5"
                  />
                  <div>
                    <span className="text-sm font-bold block text-rose-900">จำเป็นต้องส่งต่อพบแพทย์ทันที</span>
                    <span className="text-xs text-rose-700">พบอาการเสี่ยง สัญญาณอันตราย หรือต้องตรวจทางห้องปฏิบัติการ</span>
                  </div>
                </label>
              </div>

              {stepErrors.shouldRefer && (
                <p className="text-xs text-rose-600">{stepErrors.shouldRefer}</p>
              )}

              {/* Referral Reason */}
              <div className="space-y-1.5 pt-1">
                <label htmlFor="input-referral-reason" className="block text-xs font-bold text-slate-800">
                  เหตุผลในการตัดสินใจส่งต่อหรือไม่ส่งต่อ <span className="text-rose-600">*</span>
                </label>
                <input
                  id="input-referral-reason"
                  type="text"
                  value={formData.referralReason}
                  onChange={(e) => handleInputChange('referralReason', e.target.value)}
                  placeholder="อธิบายเหตุผลทางคลินิกที่สนับสนุนการตัดสินใจส่งต่อหรือไม่ส่งต่อ..."
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                    stepErrors.referralReason ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                  }`}
                />
                {stepErrors.referralReason && (
                  <p className="text-xs text-rose-600">{stepErrors.referralReason}</p>
                )}
              </div>
            </fieldset>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 5: สรุปและติดตามผล */}
        {/* ========================================================= */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#2D6A4F]" />
                <span>ขั้นตอนที่ 5: สรุปคำแนะนำ ตรวจสอบความเข้าใจ และวางแผนติดตามผล</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                การสื่อสารสรุปประเด็นให้ผู้รับบริการเข้าใจง่าย การเปิดโอกาสให้ซักถาม และกำหนดเวลานัดติดตาม
              </p>
            </div>

            {/* Patient Summary */}
            <div className="space-y-1.5">
              <label htmlFor="input-patient-summary" className="block text-sm font-semibold text-slate-800">
                สรุปคำแนะนำให้ผู้รับบริการเข้าใจง่าย (Patient-Friendly Summary) <span className="text-rose-600">*</span>
              </label>
              <p className="text-xs text-slate-500">
                เขียนสรุปคำแนะนำด้วยภาษาที่ผู้รับบริการเข้าใจง่าย หลีกเลี่ยงศัพท์เฉพาะที่ซับซ้อนเกินไป
              </p>
              <textarea
                id="input-patient-summary"
                rows={3}
                value={formData.summaryForPatient}
                onChange={(e) => handleInputChange('summaryForPatient', e.target.value)}
                placeholder="เขียนสรุปคำแนะนำสั้นๆ ที่เข้าใจง่ายสำหรับผู้รับบริการ..."
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                  stepErrors.summaryForPatient ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                }`}
              />
              {stepErrors.summaryForPatient && (
                <p className="text-xs text-rose-600">{stepErrors.summaryForPatient}</p>
              )}
            </div>

            {/* Understanding Check */}
            <div className="space-y-1.5">
              <label htmlFor="input-understanding-check" className="block text-sm font-semibold text-slate-800">
                วิธีตรวจสอบความเข้าใจของผู้รับบริการ (Teach-Back Method) <span className="text-rose-600">*</span>
              </label>
              <p className="text-xs text-slate-500">
                ระบุคำถามหรือวิธีที่ใช้ตรวจสอบว่าผู้รับบริการเข้าใจและสามารถนำคำแนะนำไปปฏิบัติได้จริง
              </p>
              <textarea
                id="input-understanding-check"
                rows={2}
                value={formData.understandingCheckMethod}
                onChange={(e) => handleInputChange('understandingCheckMethod', e.target.value)}
                placeholder="เช่น ให้ผู้รับบริการทบทวน 2-3 สิ่งที่จะเริ่มปรับ หรือถามความพร้อมในการปฏิบัติตน..."
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                  stepErrors.understandingCheckMethod ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                }`}
              />
              {stepErrors.understandingCheckMethod && (
                <p className="text-xs text-rose-600">{stepErrors.understandingCheckMethod}</p>
              )}
            </div>

            {/* Follow-up Plan */}
            <div className="space-y-1.5">
              <label htmlFor="input-followup-plan" className="block text-sm font-semibold text-slate-800">
                แผนการติดตามผลและการนัดหมาย (Follow-Up Plan) <span className="text-rose-600">*</span>
              </label>
              <p className="text-xs text-slate-500">
                ระบุกรอบเวลาในการติดตามผล และข้อสังเกตความก้าวหน้าของอาการ
              </p>
              <textarea
                id="input-followup-plan"
                rows={2}
                value={formData.followUpPlan}
                onChange={(e) => handleInputChange('followUpPlan', e.target.value)}
                placeholder="เช่น นัดติดตามอาการในอีก 2 สัปดาห์ หรือแนะนำให้กลับมาก่อนนัดหากอาการไม่ดีขึ้น..."
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] ${
                  stepErrors.followUpPlan ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                }`}
              />
              {stepErrors.followUpPlan && (
                <p className="text-xs text-rose-600">{stepErrors.followUpPlan}</p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 6: ตรวจสอบคำตอบก่อนส่ง (Review Before Submit) */}
        {/* ========================================================= */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#1B4332] flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#2D6A4F]" />
                    <span>ตรวจสอบคำตอบทั้งหมดก่อนส่ง (Review Before Submit)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ตรวจสอบคำตอบที่ท่านบันทึกไว้ในแต่ละขั้นตอน หากต้องการแก้ไขสามารถคลิกปุ่ม &quot;แก้ไข&quot; ในแต่ละหมวดได้
                  </p>
                </div>
                <span className="text-xs font-bold text-[#1B4332] bg-[#EBF2EE] px-3 py-1 rounded-full border border-[#40916C]/30">
                  พร้อมส่งคำตอบ
                </span>
              </div>
            </div>

            {/* Review Cards for 5 Sections */}
            <div className="space-y-4">
              {/* Card 1: Element Analysis */}
              <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAF9] space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332]">
                    <Compass className="w-4 h-4 text-[#2D6A4F]" />
                    <span>1. การวิเคราะห์ธาตุเจ้าเรือนและภาวะธาตุ</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJumpToStep(1)}
                    className="inline-flex items-center gap-1 text-xs text-[#2D6A4F] hover:text-[#1B4332] font-semibold underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>แก้ไข</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div><span className="text-slate-500">ธาตุกำเนิด:</span> <strong className="text-slate-800">{formData.birthElement || '-'}</strong></div>
                  <div><span className="text-slate-500">ธาตุเด่น:</span> <strong className="text-slate-800">{formData.dominantElement || '-'}</strong></div>
                  <div><span className="text-slate-500">ธาตุปัจจุบัน:</span> <strong className="text-slate-800">{formData.currentElement || '-'}</strong></div>
                  <div><span className="text-slate-500">ภาวะธาตุ:</span> <strong className="text-slate-800">{formData.elementCondition.join(', ') || '-'}</strong></div>
                </div>
                {formData.supportingReasons && (
                  <div className="text-xs pt-1 border-t border-slate-200/40">
                    <span className="text-slate-500 block">ข้อมูลสนับสนุน/เหตุผล:</span>
                    <p className="text-slate-800 mt-0.5 leading-relaxed">{formData.supportingReasons}</p>
                  </div>
                )}
              </div>

              {/* Card 2: Food Guidance */}
              <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAF9] space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332]">
                    <Utensils className="w-4 h-4 text-[#2D6A4F]" />
                    <span>2. คำแนะนำด้านอาหารและรสยา</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJumpToStep(2)}
                    className="inline-flex items-center gap-1 text-xs text-[#2D6A4F] hover:text-[#1B4332] font-semibold underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>แก้ไข</span>
                  </button>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-slate-500">รสยาแนะนำ:</span>{' '}
                    <strong className="text-slate-800">
                      {formData.recommendedTastes.length > 0 ? formData.recommendedTastes.join(', ') : '-'}
                    </strong>
                  </div>
                  {formData.encouragedFoods && (
                    <div><span className="text-slate-500">อาหารที่ควรส่งเสริม:</span> <span className="text-slate-800">{formData.encouragedFoods}</span></div>
                  )}
                  {formData.reducedFoods && (
                    <div><span className="text-slate-500">อาหารที่ควรลด/หลีกเลี่ยง:</span> <span className="text-slate-800">{formData.reducedFoods}</span></div>
                  )}
                  {formData.sampleMeals && (
                    <div><span className="text-slate-500">ตัวอย่างเมนู:</span> <span className="text-slate-800">{formData.sampleMeals}</span></div>
                  )}
                  {formData.foodRationale && (
                    <div className="pt-1 border-t border-slate-200/40">
                      <span className="text-slate-500 block">เหตุผลประกอบ:</span>
                      <p className="text-slate-800 mt-0.5 leading-relaxed">{formData.foodRationale}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Card 3: Self-Care Guidance */}
              <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAF9] space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332]">
                    <HeartPulse className="w-4 h-4 text-[#2D6A4F]" />
                    <span>3. คำแนะนำการดูแลสุขภาพและกายบริหาร</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJumpToStep(3)}
                    className="inline-flex items-center gap-1 text-xs text-[#2D6A4F] hover:text-[#1B4332] font-semibold underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>แก้ไข</span>
                  </button>
                </div>
                <div className="space-y-1.5 text-xs">
                  {formData.movementPlan && <div><span className="text-slate-500">การออกกำลังกาย/เคลื่อนไหว:</span> <span className="text-slate-800">{formData.movementPlan}</span></div>}
                  {formData.ruesiDatTonPlan && <div><span className="text-slate-500">ฤๅษีดัดตน:</span> <span className="text-slate-800">{formData.ruesiDatTonPlan}</span></div>}
                  {formData.sleepPlan && <div><span className="text-slate-500">การนอนหลับ:</span> <span className="text-slate-800">{formData.sleepPlan}</span></div>}
                  {formData.selfCareRationale && (
                    <div className="pt-1 border-t border-slate-200/40">
                      <span className="text-slate-500 block">เหตุผลประกอบ:</span>
                      <p className="text-slate-800 mt-0.5 leading-relaxed">{formData.selfCareRationale}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Card 4: Safety & Referral */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-950">
                    <ShieldAlert className="w-4 h-4 text-amber-800" />
                    <span>4. ความปลอดภัยและการส่งต่อ (Safety Review)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJumpToStep(4)}
                    className="inline-flex items-center gap-1 text-xs text-amber-900 hover:text-amber-950 font-semibold underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>แก้ไข</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div><span className="text-slate-500">การแพ้อาหาร:</span> <strong className="text-slate-800">{formData.hasFoodAllergy || 'ตรวจแล้ว'}</strong></div>
                  <div><span className="text-slate-500">การแพ้ยา:</span> <strong className="text-slate-800">{formData.hasDrugAllergy || 'ตรวจแล้ว'}</strong></div>
                  <div><span className="text-slate-500">โรคประจำตัว:</span> <strong className="text-slate-800">{formData.hasUnderlyingDisease || 'ตรวจแล้ว'}</strong></div>
                  <div><span className="text-slate-500">ยาที่ใช้:</span> <strong className="text-slate-800">{formData.currentMedications || 'ตรวจแล้ว'}</strong></div>
                </div>
                <div className="text-xs pt-1 border-t border-amber-200/60 space-y-1">
                  <div>
                    <span className="text-slate-500">การตัดสินใจส่งต่อ:</span>{' '}
                    <strong className={formData.shouldRefer === 'yes' ? 'text-rose-700' : 'text-emerald-700'}>
                      {formData.shouldRefer === 'yes' ? 'จำเป็นต้องส่งต่อพบแพทย์ทันที' : 'ยังไม่จำเป็นต้องส่งต่อ (ดูแลตนเองได้)'}
                    </strong>
                  </div>
                  <div><span className="text-slate-500">เหตุผล:</span> <span className="text-slate-800">{formData.referralReason || '-'}</span></div>
                </div>
              </div>

              {/* Card 5: Closing & Follow-up */}
              <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAF9] space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332]">
                    <FileCheck2 className="w-4 h-4 text-[#2D6A4F]" />
                    <span>5. สรุปและติดตามผล</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJumpToStep(5)}
                    className="inline-flex items-center gap-1 text-xs text-[#2D6A4F] hover:text-[#1B4332] font-semibold underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>แก้ไข</span>
                  </button>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div><span className="text-slate-500 block">สรุปสำหรับผู้รับบริการ:</span> <p className="text-slate-800 mt-0.5">{formData.summaryForPatient}</p></div>
                  <div><span className="text-slate-500 block">วิธีตรวจสอบความเข้าใจ:</span> <p className="text-slate-800 mt-0.5">{formData.understandingCheckMethod}</p></div>
                  <div><span className="text-slate-500 block">แผนการติดตามผล:</span> <p className="text-slate-800 mt-0.5">{formData.followUpPlan}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* Navigation & Action Footer */}
        {/* ========================================================= */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                id="analysis-prev-step-btn"
                onClick={handleGoPrev}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>ขั้นตอนก่อนหน้า</span>
              </button>
            ) : (
              <span className="text-xs text-slate-400 font-medium">ขั้นตอนที่ 1 จาก 6</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {currentStep < 5 ? (
              <button
                type="button"
                id="analysis-next-step-btn"
                onClick={handleGoNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-bold rounded-xl shadow-md shadow-[#2D6A4F]/20 transition-all cursor-pointer"
              >
                <span>ถัดไป: {STEP_TABS[currentStep]?.shortTitle}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : currentStep === 5 ? (
              <button
                type="button"
                id="analysis-review-btn"
                onClick={handleGoNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold rounded-xl shadow-md shadow-[#1B4332]/20 transition-all cursor-pointer"
              >
                <span>ตรวจสอบคำตอบทั้งหมดก่อนส่ง</span>
                <FileCheck2 className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                id="analysis-final-submit-btn"
                onClick={handleProceedToSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-[#1B4332]/20 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] transition-all cursor-pointer"
              >
                <span>ส่งคำตอบ</span>
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Transcript Side Drawer Modal */}
      {/* ========================================================= */}
      {showTranscriptDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setShowTranscriptDrawer(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <aside aria-label="ประวัติบทสนทนาย้อนหลัง" className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-200 bg-[#F8FAF9] flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1B4332]">
                  <MessageSquare className="w-4 h-4 text-[#2D6A4F]" />
                  <span>บทสนทนาย้อนหลัง ({cleanTranscript.length} ข้อความ)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTranscriptDrawer(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                  aria-label="ปิดแถบประวัติบทสนทนา"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FDFBF7]">
                {cleanTranscript.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">ไม่มีประวัติการสนทนา</p>
                ) : (
                  cleanTranscript.map((msg) => {
                    const isPatient = msg.sender === 'patient';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2 text-xs ${isPatient ? 'justify-start' : 'justify-end'}`}
                      >
                        {isPatient && (
                          <div className="w-6 h-6 rounded-full bg-[#EBF2EE] text-[#1B4332] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-[#40916C]/30">
                            ผ
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                            isPatient
                              ? 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                              : 'bg-[#1B4332] text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1 opacity-70 text-[10px]">
                            <span>{isPatient ? selectedCase.displayName : 'นักศึกษา'}</span>
                            <span>{msg.timestamp}</span>
                          </div>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-3 border-t border-slate-200 bg-white text-center">
                <button
                  type="button"
                  onClick={() => setShowTranscriptDrawer(false)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* Final Submission Confirmation Modal */}
      {/* ========================================================= */}
      <ConfirmationModal
        isOpen={showSubmitModal}
        title="ยืนยันส่งคำตอบ?"
        message="หลังส่งแล้ว จะไม่สามารถแก้ไขคำตอบของสถานการณ์นี้ได้"
        confirmLabel="ยืนยันส่ง"
        cancelLabel="กลับไปตรวจสอบ"
        variant="primary"
        onConfirm={handleConfirmFinalSubmit}
        onCancel={() => setShowSubmitModal(false)}
      />
    </main>
  );
};
