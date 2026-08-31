import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  UserCheck, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  ChevronRight
} from 'lucide-react';
import { CaseDefinition, CasePreview, PracticeMode, TimerOption, ChatMessage, Attempt } from '../../types';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { getCaseById } from '../../services/caseRegistry';
import { processStudentTurn } from '../../services/conversation/conversationEngine';

interface SimulationScreenProps {
  selectedCase: CaseDefinition | CasePreview;
  mode: PracticeMode;
  timerOption: TimerOption;
  attempt?: Attempt | null;
  onUpdateTranscript?: (messages: ChatMessage[]) => void;
  onUpdateAttempt?: (updatedAttempt: Attempt) => void;
  onEndInterview: () => void;
}

export const SimulationScreen: React.FC<SimulationScreenProps> = ({
  selectedCase,
  mode,
  timerOption,
  attempt,
  onUpdateTranscript,
  onUpdateAttempt,
  onEndInterview,
}) => {
  // Resolve full CaseDefinition
  const caseId = 'metadata' in selectedCase ? selectedCase.metadata.id : selectedCase.id;
  const fullCaseDef: CaseDefinition | null = 'hiddenFacts' in selectedCase 
    ? (selectedCase as CaseDefinition) 
    : getCaseById(caseId);

  // Determine initial disclosure details
  const displayName = fullCaseDef 
    ? fullCaseDef.initialDisclosure.displayName 
    : ('initialDisclosure' in selectedCase ? selectedCase.initialDisclosure.displayName : selectedCase.displayName);

  const age = fullCaseDef 
    ? fullCaseDef.initialDisclosure.age 
    : ('initialDisclosure' in selectedCase ? selectedCase.initialDisclosure.age : selectedCase.age);

  const shortConcern = fullCaseDef 
    ? fullCaseDef.initialDisclosure.chiefConcern 
    : ('initialDisclosure' in selectedCase ? selectedCase.initialDisclosure.chiefConcern : selectedCase.shortConcern);

  const difficultyLabel = fullCaseDef
    ? fullCaseDef.metadata.difficultyLabel
    : ('metadata' in selectedCase ? selectedCase.metadata.difficultyLabel : selectedCase.difficultyLabel);

  // Initialize messages from existing attempt or initial disclosure greeting
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (attempt && attempt.transcript && attempt.transcript.length > 0) {
      return attempt.transcript;
    }
    const isMale = fullCaseDef?.patientProfile.sex === 'male';
    const particle = isMale ? 'ครับ' : 'ค่ะ';
    const selfPronoun = isMale ? 'ผม' : 'ดิฉัน';
    return [
      {
        id: 'msg-initial-1',
        sender: 'patient',
        text: `สวัสดี${particle}หมอ ${selfPronoun}ชื่อ ${displayName} มารับการปรึกษาเพราะช่วงนี้ ${shortConcern}`,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        matchedCategory: 'chief_concern'
      }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [showEndModal, setShowEndModal] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep local messages in sync with attempt if refreshed or updated externally
  useEffect(() => {
    if (attempt && attempt.transcript && attempt.transcript.length > 0) {
      setMessages(attempt.transcript);
    }
  }, [attempt]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const rawText = textToSend !== undefined ? textToSend : inputText;
    const trimmed = rawText.trim();

    if (!trimmed) {
      setInputError('กรุณาพิมพ์ข้อความคำถามก่อนกดส่ง');
      return;
    }

    if (!fullCaseDef) {
      setInputError('ไม่พบข้อมูลกรณีศึกษาที่สมบูรณ์');
      return;
    }

    setInputError(null);

    // Current state representation
    const currentAttemptObj: Attempt = attempt || {
      id: `attempt-local-${Date.now()}`,
      caseId: fullCaseDef.metadata.id,
      mode,
      timerOption,
      status: 'SIMULATION',
      startedAt: new Date().toISOString(),
      transcript: messages,
      discoveredFacts: [],
      discoveredCategories: [],
      studentAnalysis: null,
      scoreResult: null
    };

    // Run deterministic Conversation Engine pipeline
    const turnResult = processStudentTurn(fullCaseDef, currentAttemptObj, trimmed);

    if (!turnResult.success) {
      setInputError(turnResult.errorMessage || 'ข้อความไม่ถูกต้อง กรุณาระบุคำถามให้ชัดเจน');
      return;
    }

    if (turnResult.studentMessage && turnResult.patientMessage) {
      const newMessages = [...messages, turnResult.studentMessage, turnResult.patientMessage];
      setMessages(newMessages);

      if (onUpdateTranscript) {
        onUpdateTranscript(newMessages);
      }

      if (onUpdateAttempt) {
        onUpdateAttempt(turnResult.updatedAttempt);
      }
    }

    setInputText('');
    inputRef.current?.focus();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <main className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 animate-in fade-in duration-300">
      {/* Scenario Status Bar & Patient Brief */}
      <section 
        aria-label="ข้อมูลสรุปผู้รับบริการและสถานะสถานการณ์"
        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Patient Brief Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4A373] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              {displayName.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-[#1B4332]">
                  {displayName}
                </h1>
                <span className="text-xs text-slate-500 font-normal">
                  อายุ {age} ปี
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#EBF2EE] text-[#1B4332] font-semibold border border-[#40916C]/30">
                  {difficultyLabel}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                อาการสำคัญแรกรับ: <span className="font-semibold text-slate-800">{shortConcern}</span>
              </p>
            </div>
          </div>

          {/* Scenario Status Badges & Controls */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F9FA] text-slate-700 border border-slate-200 font-medium">
              <UserCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>{mode === 'training' ? 'โหมดฝึกฝน' : 'โหมดประเมิน OSCE'}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F9FA] text-slate-700 border border-slate-200 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {timerOption === 'none' ? 'ไม่จำกัดเวลา' : `เวลาจำลอง: ${timerOption} นาที`}
              </span>
            </div>

            <button
              id="end-interview-button"
              onClick={() => setShowEndModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold rounded-xl shadow-md shadow-[#1B4332]/20 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] transition-all cursor-pointer"
            >
              <span>สิ้นสุดการซักประวัติ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Conversation Panel */}
      <section 
        aria-label="พื้นที่การสนทนากับผู้รับบริการเสมือน"
        className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[560px] overflow-hidden"
      >
        {/* Chat Header */}
        <div className="p-3.5 px-5 bg-[#F8F9FA] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#2D6A4F]" />
            <h2 className="text-sm font-bold text-[#1B4332]">
              ห้องซักประวัติและให้คำปรึกษา
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            จำนวนข้อความ: {messages.length} รายการ
          </span>
        </div>

        {/* Chat Messages Log */}
        <div 
          tabIndex={0}
          role="log"
          aria-live="polite"
          className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#F1F3F5] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
        >
          {messages.map((msg) => {
            const isPatient = msg.sender === 'patient';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                  isPatient ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    isPatient
                      ? 'bg-[#D4A373] text-white'
                      : 'bg-[#1B4332] text-white'
                  }`}
                  aria-label={isPatient ? 'ผู้รับบริการ' : 'นักศึกษา'}
                >
                  {isPatient ? 'PT' : 'ST'}
                </div>

                <div className="space-y-1">
                  <div
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                      isPatient
                        ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                        : 'bg-[#2D6A4F] text-white rounded-tr-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span
                    className={`block text-[10px] text-slate-400 px-1 ${
                      isPatient ? 'text-left' : 'text-right'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-center text-xs text-slate-500 italic">
              <div className="w-8 h-8 rounded-full bg-[#D4A373] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                PT
              </div>
              <div className="p-3 bg-white text-slate-500 rounded-2xl rounded-tl-none border border-slate-200 shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#D4A373] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#D4A373] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#D4A373] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input Form */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleFormSubmit} className="space-y-2">
            <div className="flex gap-2">
              <label htmlFor="student-chat-input" className="sr-only">
                พิมพ์คำถามซักประวัติผู้รับบริการ
              </label>
              <input
                ref={inputRef}
                id="student-chat-input"
                type="text"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (inputError) setInputError(null);
                }}
                placeholder="พิมพ์คำถามเพื่อซักประวัติผู้รับบริการ เช่น อาการเป็นมานานเท่าใด, พฤติกรรมการรับประทานอาหาร..."
                className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
                autoComplete="off"
              />
              <button
                type="submit"
                id="chat-send-button"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-bold rounded-xl shadow-md shadow-[#2D6A4F]/20 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] transition-colors shrink-0 cursor-pointer"
              >
                <span>ส่ง</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

            {inputError && (
              <p className="text-xs text-rose-600 flex items-center gap-1 pl-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{inputError}</span>
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Confirmation Modal to End Interview */}
      <ConfirmationModal
        isOpen={showEndModal}
        title="ยืนยันการสิ้นสุดการซักประวัติ"
        message="เมื่อสิ้นสุดการซักประวัติแล้ว ระบบจะนำท่านเข้าสู่ขั้นตอน 'การวิเคราะห์ธาตุและให้คำแนะนำ' (Analysis) โดยในระบบจริงจะไม่สามารถกลับมาถามประวัติเพิ่มเติมในรอบเดียวกันได้ ท่านพร้อมดำเนินการต่อหรือไม่?"
        confirmLabel="ยืนยันและไปขั้นตอนวิเคราะห์"
        cancelLabel="กลับไปซักประวัติต่อ"
        variant="warning"
        onConfirm={() => {
          setShowEndModal(false);
          onEndInterview();
        }}
        onCancel={() => setShowEndModal(false)}
      />
    </main>
  );
};
