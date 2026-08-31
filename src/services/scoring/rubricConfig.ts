import { CaseDefinition, RubricCategory } from '../../types';

export const GLOBAL_RUBRIC_CONFIG: RubricCategory[] = [
  {
    id: 'communication_rapport',
    number: 1,
    title: 'การสื่อสารและการสร้างสัมพันธภาพ',
    maxScore: 10,
    description: 'การทักทาย การแนะนำตัว การใช้ภาษาที่สุภาพเหมาะสม การขออนุญาต และการรับฟังอย่างใส่ใจ'
  },
  {
    id: 'interview_completeness_sequence',
    number: 2,
    title: 'ความครบถ้วนและลำดับของการซักประวัติ',
    maxScore: 15,
    description: 'การซักประวัติอาการสำคัญ อาการร่วม พฤติกรรม และสภาพแวดล้อมอย่างเป็นระบบและครอบคลุม'
  },
  {
    id: 'allergy_disease_medication_history',
    number: 3,
    title: 'การสอบถามประวัติแพ้ โรคประจำตัว และยาที่ใช้',
    maxScore: 10,
    description: 'การตรวจสอบประวัติแพ้อาหาร แพ้ยา แพ้สมุนไพร โรคประจำตัว และยา/อาหารเสริมที่ใช้อย่างชัดเจน'
  },
  {
    id: 'element_analysis',
    number: 4,
    title: 'ความถูกต้องและเหตุผลของการวิเคราะห์ธาตุเจ้าเรือน',
    maxScore: 15,
    description: 'ความถูกต้องของธาตุกำเนิด ธาตุเด่น และภาวะธาตุปัจจุบัน พร้อมข้อมูลสนับสนุนและเหตุผลทางทฤษฎี'
  },
  {
    id: 'element_behavior_health_integration',
    number: 5,
    title: 'การเชื่อมโยงธาตุ พฤติกรรม และปัญหาสุขภาพ',
    maxScore: 10,
    description: 'การอธิบายความสัมพันธ์ระหว่างช่วงวัย ฤดูกาล ถิ่นที่อยู่ พฤติกรรมการใช้ชีวิต และอาการที่ผิดปกติ'
  },
  {
    id: 'food_guidance',
    number: 6,
    title: 'ความเหมาะสมและความเป็นไปได้ของคำแนะนำด้านอาหาร',
    maxScore: 15,
    description: 'การแนะนำรสยา อาหารที่ควรส่งเสริม/ควรลด ตัวอย่างเมนู และเครื่องดื่มที่ปลอดภัยและปรับสมดุลธาตุได้จริง'
  },
  {
    id: 'self_care_guidance',
    number: 7,
    title: 'ความเหมาะสมของคำแนะนำด้านการดูแลสุขภาพ',
    maxScore: 10,
    description: 'คำแนะนำการพักผ่อน สุขอนามัยการนอน การเคลื่อนไหว ท่าฤๅษีดัดตน และการจัดการความเครียดที่ปฏิบัติได้จริง'
  },
  {
    id: 'safety_red_flags_referral',
    number: 8,
    title: 'ข้อควรระวัง อาการอันตราย และการส่งต่อ',
    maxScore: 10,
    description: 'การตระหนักรู้ข้อห้าม สัญญาณเตือนอันตราย (Red Flags) และการตัดสินใจพร้อมเหตุผลในการส่งต่อแพทย์'
  },
  {
    id: 'closing_understanding_time',
    number: 9,
    title: 'การสรุป ตรวจสอบความเข้าใจ และบริหารเวลา',
    maxScore: 5,
    description: 'การสรุปใจความสำคัญสำหรับผู้รับบริการ การตรวจสอบความเข้าใจ (Teach-Back) แผนติดตามผล และการบริหารเวลา'
  }
];

export const TOTAL_RUBRIC_MAX_SCORE = 100;

/**
 * Validate and retrieve the active rubric categories for a given case,
 * applying safe rubric overrides if defined in the case.
 */
export function getRubricCategoriesForCase(caseDef: CaseDefinition): RubricCategory[] {
  const overrides = caseDef.rubricOverrides;
  if (!overrides || !overrides.categoryWeightOverrides) {
    return GLOBAL_RUBRIC_CONFIG;
  }

  try {
    const updatedCategories = GLOBAL_RUBRIC_CONFIG.map((cat) => {
      if (overrides.categoryWeightOverrides && overrides.categoryWeightOverrides[cat.id] !== undefined) {
        const customWeight = overrides.categoryWeightOverrides[cat.id];
        if (typeof customWeight === 'number' && customWeight >= 0) {
          return {
            ...cat,
            maxScore: customWeight
          };
        }
      }
      return cat;
    });

    const totalCalculated = updatedCategories.reduce((sum, c) => sum + c.maxScore, 0);
    const expectedTotal = overrides.caseSpecificMaxScore || TOTAL_RUBRIC_MAX_SCORE;

    if (totalCalculated !== expectedTotal) {
      console.warn(
        `[RubricConfig] Case ${caseDef.metadata.id} rubric override total (${totalCalculated}) does not match expected total (${expectedTotal}). Falling back to global rubric.`
      );
      return GLOBAL_RUBRIC_CONFIG;
    }

    return updatedCategories;
  } catch (error) {
    console.warn(`[RubricConfig] Error processing rubric overrides for case ${caseDef.metadata.id}:`, error);
    return GLOBAL_RUBRIC_CONFIG;
  }
}
