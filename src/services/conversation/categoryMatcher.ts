/**
 * Rule-based Thai natural language Category Matcher.
 * Matches student interview questions against defined Thai Traditional Medicine history-taking categories.
 */

export type InterviewCategory =
  | 'rapport'
  | 'general_information'
  | 'chief_concern'
  | 'symptom_onset'
  | 'symptom_duration'
  | 'symptom_character'
  | 'aggravating_factors'
  | 'relieving_factors'
  | 'symptoms'
  | 'food'
  | 'drink'
  | 'appetite'
  | 'sleep'
  | 'bowel'
  | 'urination'
  | 'activity'
  | 'occupation'
  | 'lifestyle'
  | 'residence_environment'
  | 'stress'
  | 'emotional_state'
  | 'underlying_disease'
  | 'medication'
  | 'food_allergy'
  | 'drug_allergy'
  | 'herbal_allergy'
  | 'allergies_general'
  | 'past_history'
  | 'other_relevant_history'
  | 'red_flags'
  | 'clarification'
  | 'unknown';

export interface CategoryMatchResult {
  primaryCategory: InterviewCategory;
  matchedCategories: InterviewCategory[];
  specificity: 'broad' | 'category' | 'specific';
  confidence: number; // 0 to 1
  matchedKeywords: string[];
  isCompound: boolean;
}

interface CategoryDefinition {
  category: InterviewCategory;
  weight: number;
  keywords: string[];
  patterns: RegExp[];
  specificKeywords?: string[];
}

const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  // 1. ALLERGIES (High Priority to avoid false matches)
  {
    category: 'herbal_allergy',
    weight: 12,
    keywords: ['แพ้สมุนไพร', 'แพ้ยาสมุนไพร', 'สมุนไพรที่แพ้', 'กินสมุนไพรแล้วแพ้', 'ขิง ข่า ตะไคร้ กะเพรา'],
    patterns: [/แพ้.*สมุนไพร/, /สมุนไพร.*แพ้/],
    specificKeywords: ['แพ้ยาสมุนไพร', 'สมุนไพรที่แพ้']
  },
  {
    category: 'drug_allergy',
    weight: 11,
    keywords: ['แพ้ยา', 'แพ้ยาแผนปัจจุบัน', 'ประวัติแพ้ยา', 'เพนิซิลลิน', 'penicillin', 'sulfa', 'ซัลฟา', 'nsaid', 'ยาที่แพ้', 'กินยาแล้วมีผื่น', 'แพ้ยาอะไร'],
    patterns: [/แพ้.*ยา(แผนปัจจุบัน)?/, /ประวัติ.*แพ้ยา/],
    specificKeywords: ['เพนิซิลลิน', 'ซัลฟา', 'nsaid', 'แพ้ยาอะไร']
  },
  {
    category: 'food_allergy',
    weight: 11,
    keywords: ['แพ้อาหาร', 'แพ้อาหารทะเล', 'แพ้กุ้ง', 'แพ้ปู', 'แพ้ถั่ว', 'แพ้นม', 'กินอะไรแล้วแพ้', 'อาหารที่แพ้'],
    patterns: [/แพ้.*อาหาร/, /กิน.*แล้ว(แพ้|ผื่นขึ้น|คัน)/],
    specificKeywords: ['แพ้กุ้ง', 'แพ้ปู', 'แพ้ถั่ว', 'แพ้อาหารทะเล']
  },
  {
    category: 'allergies_general',
    weight: 10,
    keywords: ['ประวัติการแพ้', 'มีแพ้อะไรไหม', 'แพ้ยาหรืออาหาร', 'แพ้ยาแพ้อาหาร', 'มีแพ้ยาแพ้อาหารไหม'],
    patterns: [/แพ้.*(ยา|อาหาร|อะไร)/]
  },

  // 2. SAFETY & RED FLAGS
  {
    category: 'red_flags',
    weight: 10,
    keywords: ['น้ำหนักลด', 'ถ่ายดำ', 'อาเจียนเป็นเลือด', 'ไอเป็นเลือด', 'ไข้สูง', 'แขนขาอ่อนแรง', 'ปากเบี้ยว', 'พูดไม่ชัด', 'แน่นหน้าอกร้าว', 'สัญญาณอันตราย', 'อาการรุนแรงเฉียบพลัน', 'หน้ามืดหมดสติ'],
    patterns: [/(น้ำหนักลด|ถ่ายดำ|อาเจียนเป็นเลือด|ไอเป็นเลือด|ไข้สูง)/, /(แขนขาอ่อนแรง|ปากเบี้ยว|พูดไม่ชัด)/]
  },

  // 3. MEDICAL & MEDICATIONS
  {
    category: 'underlying_disease',
    weight: 9,
    keywords: ['โรคประจำตัว', 'โรคเรื้อรัง', 'ความดัน', 'เบาหวาน', 'โรคหัวใจ', 'ไทรอยด์', 'กระเพาะอาหาร', 'ibs', 'ตรวจสุขภาพ', 'มีโรคประจำตัวไหม', 'ประวัติการเจ็บป่วย'],
    patterns: [/โรคประจำตัว/, /มีโรค.*อะไร/, /ความดัน(โลหิต)?/, /เบาหวาน/]
  },
  {
    category: 'medication',
    weight: 9,
    keywords: ['กินยา', 'ทานยา', 'ยาประจำ', 'ยาที่กินอยู่', 'ยาที่ทานอยู่', 'อาหารเสริม', 'วิตามิน', 'ยาลดกรด', 'ยาแก้ปวด', 'พารา', 'omeprazole', 'น้ำมันปลา', 'ยาธาตุน้ำขาว', 'ยาลดความดัน', 'ยาปฏิชีวนะ', 'ยาอะไรอยู่'],
    patterns: [/(กิน|ทาน|ใช้).*ยา/, /ยา.*(ประจำ|ที่ใช้|ที่กิน)/, /อาหารเสริม|วิตามิน/]
  },
  {
    category: 'past_history',
    weight: 8,
    keywords: ['ผ่าตัด', 'เคยผ่าตัด', 'นอนโรงพยาบาล', 'แอดมิท', 'อุบัติเหตุ', 'ประวัติในอดีต', 'เคยเป็นอะไรมาก่อน', 'กระดูกหัก', 'ลมแดด', 'heat exhaustion'],
    patterns: [/เคย(ผ่าตัด|นอนรพ|นอนโรงพยาบาล)/, /ประวัติ.*(อดีต|ผ่าตัด)/]
  },
  {
    category: 'other_relevant_history',
    weight: 8,
    keywords: ['สูบบุหรี่', 'บุหรี่', 'ดื่มเหล้า', 'ดื่มสุรา', 'แอลกอฮอล์', 'เบียร์', 'ไวน์', 'สังสรรค์', 'สารเสพติด', 'ประวัติครอบครัว'],
    patterns: [/(สูบ|เคยสูบ).*บุหรี่/, /(ดื่ม|ทาน).*แอลกอฮอล์/, /(ดื่ม|กิน).*เหล้า|เบียร์/]
  },

  // 4. EXCRETION & PHYSIOLOGY
  {
    category: 'bowel',
    weight: 8,
    keywords: ['ขับถ่าย', 'อุจจาระ', 'อึ', 'ท้องผูก', 'ท้องเสีย', 'ถ่ายเหลว', 'ถ่ายแข็ง', 'ขี้แพะ', 'กี่วันถ่าย', 'ถ่ายทุกวันไหม', 'ถ่ายบ่อยไหม', 'แสบทวาร', 'แสบก้น', 'ถ่ายสุดไหม'],
    patterns: [/(ขับถ่าย|อุจจาระ|ท้องผูก|ท้องเสีย)/, /ถ่าย.*(แข็ง|เหลว|กี่วัน|สุดไหม)/]
  },
  {
    category: 'urination',
    weight: 8,
    keywords: ['ปัสสาวะ', 'ฉี่', 'สีปัสสาวะ', 'ปัสสาวะบ่อย', 'แสบขัด', 'ตื่นมาปัสสาวะ', 'ปัสสาวะกลางคืน', 'ฉี่บ่อย', 'ฉี่แสบ', 'สีฉี่'],
    patterns: [/(ปัสสาวะ|ฉี่)/, /ปัสสาวะ.*(สี|บ่อย|ขัด|กลางคืน)/]
  },
  {
    category: 'sleep',
    weight: 8,
    keywords: ['นอนหลับ', 'การนอน', 'นอนกี่โมง', 'ตื่นกี่โมง', 'หลับยาก', 'ตื่นกลางดึก', 'หลับสนิท', 'นอนกี่ชั่วโมง', 'ฝัน', 'สะดุ้งตื่น', 'นอนดึก', 'พักผ่อน'],
    patterns: [/นอน.*(หลับ|กี่โมง|ตื่น|ยาก|สนิท|ดึก)/, /ตื่น.*(กลางดึก|กี่โมง)/]
  },
  {
    category: 'appetite',
    weight: 8,
    keywords: ['ความอยากอาหาร', 'หิว', 'เบื่ออาหาร', 'ทานข้าวได้ไหม', 'กินข้าวได้ไหม', 'กินได้เยอะไหม', 'อิ่มเร็ว', 'ย่อยช้า', 'ย่อยเร็ว', 'หิวดึก', 'หิวบ่อย'],
    patterns: [/(อยากอาหาร|เบื่ออาหาร|หิวบ่อย|อิ่มเร็ว|ย่อยช้า)/]
  },

  // 5. DIET & HYDRATION
  {
    category: 'drink',
    weight: 8,
    keywords: ['ดื่มน้ำ', 'ทานน้ำ', 'กินน้ำ', 'น้ำเปล่า', 'น้ำเย็น', 'น้ำอุ่น', 'กาแฟ', 'ชาเขียว', 'ชานม', 'น้ำอัดลม', 'วันละกี่แก้ว', 'กี่ลิตร', 'เครื่องดื่ม'],
    patterns: [/(ดื่ม|ทาน|กิน).*น้ำ/, /น้ำ.*(เย็น|อุ่น|เปล่า|กี่แก้ว)/, /กาแฟ|ชาเขียว|ชานม|น้ำอัดลม/]
  },
  {
    category: 'food',
    weight: 8,
    keywords: ['อาหาร', 'กินอะไร', 'ทานอะไร', 'ของทอด', 'ของมัน', 'ของหวาน', 'รสเผ็ด', 'รสจัด', 'รสเค็ม', 'รสหวาน', 'ผัก', 'ผลไม้', 'ส้มตำ', 'หม่าล่า', 'ข้าวมันไก่', 'ข้าวขาหมู', 'ตรงเวลาไหม', 'มื้ออาหาร', 'อาหารที่ชอบ'],
    patterns: [/(อาหาร|ของทอด|ของมัน|รสจัด|รสเผ็ด|รสหวาน)/, /(กิน|ทาน).*อาหาร/]
  },

  // 6. SYMPTOMS & PRESENTING CONCERN
  {
    category: 'symptom_onset',
    weight: 7,
    keywords: ['เป็นมานานแค่ไหน', 'เป็นมากี่วัน', 'เป็นมากี่สัปดาห์', 'เป็นมากี่เดือน', 'เริ่มเป็นเมื่อไหร่', 'ตั้งแต่เมื่อไหร่', 'เป็นมานานหรือยัง', 'เริ่มมีอาการ'],
    patterns: [/เป็นมา.*(นาน|กี่|เมื่อไหร่)/, /เริ่ม.*(เมื่อไหร่|ตอนไหน)/]
  },
  {
    category: 'symptom_duration',
    weight: 7,
    keywords: ['เป็นครั้งละนานไหม', 'เป็นตลอดเวลาหรือเป็นพักๆ', 'เป็นกี่นาที', 'เป็นกี่ชั่วโมง', 'ความถี่'],
    patterns: [/เป็น.*(ตลอด|พักๆ|นานไหม|กี่นาที)/]
  },
  {
    category: 'symptom_character',
    weight: 7,
    keywords: ['ลักษณะอาการ', 'ปวดแบบไหน', 'แน่นตรงไหน', 'ตึงตรงไหน', 'ตำแหน่ง', 'ปวดแสบ', 'ปวดตื้อ', 'เสมหะสีอะไร', 'แผลในปาก', 'ผื่นแดง', 'บวมตรงไหน', 'ลมดัน', 'วิงเวียน'],
    patterns: [/(ลักษณะ|ตำแหน่ง|ปวดแบบ|แน่นตรง|เสมหะ|ผื่น|แผล|บวม|วิงเวียน)/]
  },
  {
    category: 'aggravating_factors',
    weight: 7,
    keywords: ['อะไรกระตุ้น', 'เป็นมากขึ้นเมื่อไหร่', 'แย่ลงตอนไหน', 'โดนแดดแล้วเป็นไง', 'กินแล้วแน่นขึ้น', 'อากาศเย็นแล้วเป็นไง', 'ทำอะไรแล้วเป็นหนักขึ้น'],
    patterns: [/(กระตุ้น|มากขึ้น|แย่ลง|หนักขึ้น).*(เมื่อ|ตอน|เวลา)/, /โดนแดด|อากาศเย็น|หลังกิน/]
  },
  {
    category: 'relieving_factors',
    weight: 7,
    keywords: ['ทำอะไรแล้วดีขึ้น', 'พักแล้วดีขึ้นไหม', 'อะไรทำให้ทุเลา', 'ทุเลาลง', 'กินยาอะไรแล้วหาย', 'มีอะไรช่วยให้ดีขึ้นไหม'],
    patterns: [/(ดีขึ้น|ทุเลา|บรรเทา|หาย).*(เมื่อ|ตอน|อย่างไร|ไหม)/]
  },
  {
    category: 'chief_concern',
    weight: 6,
    keywords: ['เป็นอะไรมา', 'มาพบหมอด้วยเรื่องอะไร', 'อาการสำคัญ', 'มีปัญหาอะไร', 'ไม่สบายตรงไหน', 'เป็นอะไรถึงมาหาหมอ', 'สาเหตุที่มา', 'อาการหลัก'],
    patterns: [/เป็นอะไร(มา|ครับ|ค่ะ)?/, /มาพบ.*เรื่องอะไร/, /อาการ.*สำคัญ|อาการหลัก/]
  },
  {
    category: 'symptoms',
    weight: 6,
    keywords: ['แน่นท้อง', 'เมื่อยตึง', 'อ่อนเพลีย', 'เสมหะ', 'บวมน้ำ', 'ผิวแห้ง', 'ท้องอืด', 'ผายลม', 'วิงเวียน', 'ร้อนใน', 'แผลในปาก', 'หงุดหงิด', 'ผื่นคัน', 'อาการเป็นอย่างไร', 'มีอาการอะไรบ้าง'],
    patterns: [/(แน่นท้อง|เมื่อยตึง|อ่อนเพลีย|เสมหะ|บวมน้ำ|ผิวแห้ง|ท้องอืด|ผายลม|วิงเวียน|ร้อนใน|แผลในปาก|หงุดหงิด|ผื่น)/]
  },

  // 7. OCCUPATION & ENVIRONMENT & STRESS & ACTIVITY
  {
    category: 'occupation',
    weight: 7,
    keywords: ['ทำงานอะไร', 'อาชีพ', 'ลักษณะงาน', 'งานประจำ', 'นั่งโต๊ะ', 'หน้าจอ', 'คอมพิวเตอร์', 'ขับรถ', 'เดินทาง', 'ออกกอง', 'จัดอีเวนต์', 'นั่งทำงานกี่ชั่วโมง'],
    patterns: [/(ทำงาน|อาชีพ|ลักษณะงาน)/, /นั่ง.*(โต๊ะ|คอม|หน้าจอ)/]
  },
  {
    category: 'residence_environment',
    weight: 7,
    keywords: ['ที่พัก', 'สภาพแวดล้อม', 'ห้องแอร์', 'แอร์เป่า', 'อุณหภูมิ', 'ร้อนอบอ้าว', 'อากาศ', 'บ้าน', 'คอนโด', 'ฝุ่น', 'ห้องนอน'],
    patterns: [/(ห้องแอร์|แอร์เป่า|อุณหภูมิ|สภาพแวดล้อม|ที่พัก|คอนโด|บ้าน)/]
  },
  {
    category: 'stress',
    weight: 7,
    keywords: ['เครียด', 'ความเครียด', 'กังวล', 'กดดัน', 'เหนื่อยล้า', 'งานเครียดไหม', 'มีความเครียดไหม'],
    patterns: [/(เครียด|ความเครียด|กังวล|กดดัน)/]
  },
  {
    category: 'emotional_state',
    weight: 7,
    keywords: ['อารมณ์', 'หงุดหงิด', 'ใจร้อน', 'โมโหง่าย', 'กระวนกระวาย', 'ใจสั่น', 'หงุดหงิดง่าย'],
    patterns: [/(อารมณ์|หงุดหงิด|ใจร้อน|โมโห|กระวนกระวาย)/]
  },
  {
    category: 'activity',
    weight: 7,
    keywords: ['ออกกำลังกาย', 'กิจกรรม', 'กีฬา', 'เดิน', 'โยคะ', 'วิ่ง', 'กอล์ฟ', 'ขยับร่างกาย', 'เหงื่อออก', 'วันหยุดทำอะไร'],
    patterns: [/(ออกกำลังกาย|กิจกรรม|กีฬา|โยคะ|วิ่ง|กอล์ฟ)/]
  },

  // 8. GENERAL & RAPPORT
  {
    category: 'rapport',
    weight: 5,
    keywords: ['สวัสดี', 'ชื่ออะไร', 'อายุเท่าไหร่', 'ขออนุญาต', 'หมอขอ', 'แนะนำตัว', 'ยินดีที่ได้พบ', 'พร้อมไหมครับ', 'พร้อมไหมค่ะ'],
    patterns: [/^สวัสดี/, /ชื่ออะไร/, /อายุเท่าไหร่/, /ขออนุญาตซักประวัติ/]
  },
  {
    category: 'clarification',
    weight: 4,
    keywords: ['กี่ชั่วโมง', 'กี่วัน', 'กี่ครั้ง', 'เท่าไหร่', 'สีอะไร', 'ตรงไหน', 'อย่างไร', 'ทำไม', 'แล้วยังไง', 'จริงไหม', 'ใช่ไหม'],
    patterns: [/^(กี่ชั่วโมง|กี่วัน|กี่ครั้ง|เท่าไหร่|สีอะไร|ตรงไหน|อย่างไร)/]
  }
];

/**
 * Matches normalized student input to one or more interview categories.
 */
export function matchCategory(
  normalizedText: string,
  lastMatchedCategory?: InterviewCategory
): CategoryMatchResult {
  if (!normalizedText || normalizedText.trim().length === 0) {
    return {
      primaryCategory: 'unknown',
      matchedCategories: ['unknown'],
      specificity: 'broad',
      confidence: 0,
      matchedKeywords: [],
      isCompound: false
    };
  }

  const scores: Map<InterviewCategory, { score: number; keywords: string[]; specific: boolean }> = new Map();

  for (const def of CATEGORY_DEFINITIONS) {
    let categoryScore = 0;
    const matchedKw: string[] = [];
    let isSpecific = false;

    // Check keywords
    for (const kw of def.keywords) {
      if (normalizedText.includes(kw.toLowerCase())) {
        categoryScore += def.weight;
        matchedKw.push(kw);
      }
    }

    // Check specific keywords
    if (def.specificKeywords) {
      for (const skw of def.specificKeywords) {
        if (normalizedText.includes(skw.toLowerCase())) {
          categoryScore += def.weight * 1.5;
          matchedKw.push(skw);
          isSpecific = true;
        }
      }
    }

    // Check regex patterns
    for (const pat of def.patterns) {
      if (pat.test(normalizedText)) {
        categoryScore += def.weight * 1.2;
      }
    }

    if (categoryScore > 0) {
      scores.set(def.category, {
        score: categoryScore,
        keywords: matchedKw,
        specific: isSpecific
      });
    }
  }

  // Handle general allergy group expansion
  if (scores.has('allergies_general')) {
    if (!scores.has('drug_allergy')) {
      scores.set('drug_allergy', { score: 10, keywords: ['แพ้ยา'], specific: false });
    }
    if (!scores.has('food_allergy')) {
      scores.set('food_allergy', { score: 10, keywords: ['แพ้อาหาร'], specific: false });
    }
    if (!scores.has('herbal_allergy')) {
      scores.set('herbal_allergy', { score: 10, keywords: ['แพ้สมุนไพร'], specific: false });
    }
    scores.delete('allergies_general');
  }

  // Handle clarification context: If short query or clarification matched, and there's a previous category
  if (scores.has('clarification') && scores.size === 1 && lastMatchedCategory && lastMatchedCategory !== 'unknown') {
    return {
      primaryCategory: lastMatchedCategory,
      matchedCategories: [lastMatchedCategory],
      specificity: 'specific',
      confidence: 0.85,
      matchedKeywords: scores.get('clarification')?.keywords || [],
      isCompound: false
    };
  }

  if (scores.size === 0) {
    // Check if input is a very short question or generic greeting
    if (normalizedText.includes('สวัสดี') || normalizedText.includes('หมอ')) {
      return {
        primaryCategory: 'rapport',
        matchedCategories: ['rapport'],
        specificity: 'broad',
        confidence: 0.7,
        matchedKeywords: ['สวัสดี'],
        isCompound: false
      };
    }

    return {
      primaryCategory: 'unknown',
      matchedCategories: ['unknown'],
      specificity: 'broad',
      confidence: 0,
      matchedKeywords: [],
      isCompound: false
    };
  }

  // Sort matched categories by score descending
  const sortedEntries = Array.from(scores.entries()).sort((a, b) => b[1].score - a[1].score);

  const primary = sortedEntries[0][0];
  const primaryDetails = sortedEntries[0][1];

  // Detect compound questions (multiple strong categories, score within 60% of top score)
  const compoundCategories: InterviewCategory[] = [];
  const allKeywords: string[] = [];

  for (const [cat, details] of sortedEntries) {
    if (details.score >= primaryDetails.score * 0.55) {
      compoundCategories.push(cat);
      allKeywords.push(...details.keywords);
    }
  }

  const isSpecific = primaryDetails.specific || allKeywords.some(kw => kw.length > 5);
  const specificity: 'broad' | 'category' | 'specific' = isSpecific
    ? 'specific'
    : compoundCategories.length > 2
    ? 'broad'
    : 'category';

  const confidence = Math.min(1.0, primaryDetails.score / 20);

  return {
    primaryCategory: primary,
    matchedCategories: compoundCategories.length > 0 ? compoundCategories : [primary],
    specificity,
    confidence,
    matchedKeywords: Array.from(new Set(allKeywords)),
    isCompound: compoundCategories.length > 1
  };
}
