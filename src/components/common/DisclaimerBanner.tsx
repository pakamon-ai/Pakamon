import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <aside
        aria-label="ข้อความชี้แจงเพื่อการศึกษา"
        className="p-4 bg-[#FFF9F2] rounded-xl border border-[#F2E8CF] text-xs leading-relaxed text-[#8B5E34]"
      >
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#8B5E34] shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-[#8B5E34]">คำเตือนทางหลักสูตร: </strong>
            ข้อมูลนี้เป็นกรณีศึกษาจำลองเพื่อการศึกษาเท่านั้น ไม่ใช่การวินิจฉัยหรือการรักษาทางการแพทย์จริง
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="ข้อความชี้แจงเพื่อการศึกษาและการเรียนรู้"
      className="p-5 sm:p-6 bg-[#FFF9F2] rounded-2xl border border-[#F2E8CF] text-[#8B5E34] space-y-3"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#F2E8CF]/60 text-[#8B5E34] shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
          <h3 className="font-bold text-[#8B5E34] text-sm sm:text-base">
            ข้อชี้แจงและการใช้งานเพื่อการศึกษา (Educational Disclaimer)
          </h3>
          <p className="text-[#8B5E34]/90">
            แอปพลิเคชันนี้ได้รับการพัฒนาขึ้นเพื่อเป็น <strong>เครื่องมือช่วยฝึกการเรียนรู้และจำลองสถานการณ์ (Simulation)</strong> สำหรับนักศึกษาแพทย์แผนไทยและผู้เรียนที่เกี่ยวข้อง
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm space-y-1 pt-1 text-[#8B5E34]/85">
            <li>เนื้อหาและกรณีศึกษาทั้งหมดเป็น <strong>ข้อมูลสมมุติ</strong> เพื่อการเรียนการสอนเท่านั้น</li>
            <li>ระบบนี้ <strong>ไม่ใช่เครื่องมือวินิจฉัยทางการแพทย์</strong> หรือระบบให้คำแนะนำการรักษาจริง</li>
            <li>ไม่สามารถใช้ทดแทนการประเมิน ตรวจวินิจฉัย และการรักษาโดยบุคลากรทางการแพทย์ผู้ประกอบวิชาชีพได้</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

