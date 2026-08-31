import React from 'react';
import { 
  Leaf, 
  ArrowRight, 
  HeartHandshake, 
  Compass, 
  Apple, 
  ShieldAlert, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

interface WelcomeScreenProps {
  onStart: () => void;
}

const LEARNING_OBJECTIVES = [
  {
    number: '1',
    icon: HeartHandshake,
    title: 'สร้างสัมพันธภาพและซักประวัติได้อย่างเป็นระบบ',
    description: 'ฝึกการเปิดบทสนทนา รับฟังอย่างใส่ใจ และสืบค้นอาการ ปัจจัยกระตุ้น ประวัติสุขภาพอย่างต่อเนื่อง'
  },
  {
    number: '2',
    icon: Compass,
    title: 'วิเคราะห์ธาตุเจ้าเรือนและภาวะธาตุโดยมีข้อมูลสนับสนุน',
    description: 'ประเมินธาตุกำเนิด ธาตุเด่น และภาวะธาตุปัจจุบัน (กำเริบ หย่อน หรือพิการ) โดยอิงหลักฐานจากการซักประวัติ'
  },
  {
    number: '3',
    icon: Leaf,
    title: 'เชื่อมโยงธาตุ ช่วงวัย ฤดูกาล ถิ่นที่อยู่ พฤติกรรม และปัญหาสุขภาพ',
    description: 'สังเคราะห์ความสัมพันธ์ของปัจจัยแวดล้อม พฤติกรรมการใช้ชีวิต และกลไกการเกิดอาการตามทฤษฎีการแพทย์แผนไทย'
  },
  {
    number: '4',
    icon: Apple,
    title: 'ให้คำแนะนำด้านอาหารและการดูแลสุขภาพเบื้องต้นอย่างเหมาะสมและปลอดภัย',
    description: 'เลือกแนะแนวรสอาหาร เมนูอาหาร เครื่องดื่ม กิจวัตร การพักผ่อน และท่าฤๅษีดัดตนที่ปฏิบัติได้จริงและปลอดภัย'
  },
  {
    number: '5',
    icon: ShieldAlert,
    title: 'ระบุข้อควรระวัง อาการอันตราย และความจำเป็นในการส่งต่อ',
    description: 'ตรวจสอบประวัติแพ้ โรคประจำตัว ยาที่ใช้ ข้อห้ามใช้ และประเมินสัญญาณเตือนอันตราย (Red Flags) เพื่อส่งต่ออย่างถูกต้อง'
  }
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      {/* Title & Introduction Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center shadow-md shrink-0">
            <Leaf className="w-8 h-8 text-[#40916C]" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EE] border border-[#40916C]/30 text-[#1B4332] text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5 text-[#2D6A4F]" />
              ระบบจำลองสถานการณ์เพื่อการศึกษาการแพทย์แผนไทย
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1B4332] tracking-tight">
              AI ผู้รับบริการเสมือนเพื่อฝึกวิเคราะห์ธาตุเจ้าเรือน
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
              พื้นที่จำลองสถานการณ์สำหรับฝึกทักษะการซักประวัติอย่างใส่ใจ วิเคราะห์สมดุลธาตุเจ้าเรือนและปัจจัยสมุฏฐาน ให้คำแนะนำด้านอาหารและการส่งเสริมสุขภาพ พร้อมทั้งประเมินความปลอดภัยและสะท้อนคิดการเรียนรู้ตามเกณฑ์สมรรถนะ OSCE
            </p>
          </div>
        </div>

        {/* Primary CTA Area */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#40916C] shrink-0" />
            <span>มีกรณีศึกษาครอบคลุมธาตุดิน น้ำ ลม และไฟ สำหรับการฝึกทักษะ</span>
          </div>
          <button
            id="welcome-start-button"
            onClick={onStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-base font-bold rounded-xl shadow-lg shadow-[#1B4332]/20 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2 transition-all cursor-pointer"
          >
            <span>เริ่มฝึก</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Learning Objectives Section */}
      <section 
        aria-labelledby="learning-objectives-heading"
        className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 id="learning-objectives-heading" className="text-lg font-bold text-[#1B4332]">
              วัตถุประสงค์การเรียนรู้ (Learning Objectives)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              ทักษะและสมรรถนะสำคัญ 5 ด้านที่ผู้เรียนจะได้รับการฝึกฝนผ่านกรณีศึกษาจำลอง
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LEARNING_OBJECTIVES.map((obj, idx) => {
            const isFullWidth = idx === LEARNING_OBJECTIVES.length - 1;

            return (
              <div
                key={obj.number}
                className={`p-4 rounded-xl border border-slate-100 bg-[#F8F9FA] hover:bg-[#EBF2EE] hover:border-[#40916C]/40 transition-colors flex items-start gap-3.5 ${
                  isFullWidth ? 'md:col-span-2' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#EBF2EE] text-[#1B4332] font-bold flex items-center justify-center shrink-0 text-sm mt-0.5 border border-[#40916C]/20">
                  {obj.number}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>{obj.title}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Educational Disclaimer Banner */}
      <DisclaimerBanner />
    </main>
  );
};

