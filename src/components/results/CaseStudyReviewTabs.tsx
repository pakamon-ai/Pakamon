import React, { useState } from 'react';
import { 
  MessageSquare, 
  Compass, 
  Utensils, 
  HeartPulse, 
  ShieldAlert, 
  FileText,
  ListChecks
} from 'lucide-react';
import { AssessmentResult, CasePreview, ChatMessage } from '../../types';
import { InterviewReviewTab } from './InterviewReviewTab';
import { ElementReviewTab } from './ElementReviewTab';
import { FoodReviewTab } from './FoodReviewTab';
import { SelfCareReviewTab } from './SelfCareReviewTab';
import { SafetyReviewTab } from './SafetyReviewTab';

interface CaseStudyReviewTabsProps {
  assessmentResult: AssessmentResult;
  selectedCase: CasePreview;
  cleanTranscript: ChatMessage[];
}

export type ReviewTabKey = 'interview' | 'element' | 'food' | 'selfcare' | 'safety' | 'transcript';

export const CaseStudyReviewTabs: React.FC<CaseStudyReviewTabsProps> = ({
  assessmentResult,
  selectedCase,
  cleanTranscript
}) => {
  const [activeTab, setActiveTab] = useState<ReviewTabKey>('interview');

  const {
    interviewReview,
    elementReview,
    foodReview,
    selfCareReview,
    safetyReview
  } = assessmentResult;

  const tabs: { id: ReviewTabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'interview', label: 'การซักประวัติ (Interview)', icon: ListChecks },
    { id: 'element', label: 'การวิเคราะห์ธาตุ (Element)', icon: Compass },
    { id: 'food', label: 'คำแนะนำอาหาร (Food)', icon: Utensils },
    { id: 'selfcare', label: 'การดูแลสุขภาพ (Self-Care)', icon: HeartPulse },
    { id: 'safety', label: 'ความปลอดภัย (Safety)', icon: ShieldAlert },
    { id: 'transcript', label: `บทสนทนา (${cleanTranscript.length})`, icon: MessageSquare }
  ];

  return (
    <section 
      aria-label="การทบทวนกรณีศึกษาและเฉลยละเอียด"
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
    >
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-[#1B4332]">
          การทบทวนกรณีศึกษาเชิงลึก (Case Study Review & Educational Keys)
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          เปรียบเทียบคำตอบที่ส่งกับแนวทางการวิเคราะห์ทางทฤษฎีการแพทย์แผนไทย
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="pt-2">
        {activeTab === 'interview' && (
          <InterviewReviewTab interviewReview={interviewReview} />
        )}
        {activeTab === 'element' && (
          <ElementReviewTab elementReview={elementReview} />
        )}
        {activeTab === 'food' && (
          <FoodReviewTab foodReview={foodReview} />
        )}
        {activeTab === 'selfcare' && (
          <SelfCareReviewTab selfCareReview={selfCareReview} />
        )}
        {activeTab === 'safety' && (
          <SafetyReviewTab safetyReview={safetyReview} />
        )}
        {activeTab === 'transcript' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              บันทึกบทสนทนาทั้งหมดระหว่างนักศึกษากับผู้รับบริการ ({cleanTranscript.length} ข้อความ)
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FDFBF7] border border-slate-200 max-h-96 overflow-y-auto space-y-3">
              {cleanTranscript.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">ไม่มีประวัติการสนทนา</p>
              ) : (
                cleanTranscript.map((msg) => {
                  const isPatient = msg.sender === 'patient';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 text-xs ${isPatient ? 'justify-start' : 'justify-end'}`}
                    >
                      {isPatient && (
                        <div className="w-7 h-7 rounded-full bg-[#EBF2EE] text-[#1B4332] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-[#40916C]/30">
                          ผ
                        </div>
                      )}
                      <div
                        className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                          isPatient
                            ? 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                            : 'bg-[#1B4332] text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-1 opacity-70 text-[10px]">
                          <span className="font-semibold">{isPatient ? selectedCase.displayName : 'นักศึกษา'}</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
