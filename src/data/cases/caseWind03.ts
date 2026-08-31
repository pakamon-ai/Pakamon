import { CaseDefinition } from '../../types';

export const CASE_WIND_03: CaseDefinition = {
  metadata: {
    id: 'case-wind-03',
    title: 'คุณประเสริฐ — ท้องอืด ผายลมบ่อย วิงเวียนง่ายเมื่อพักผ่อนน้อย',
    elementFocus: 'wind',
    difficulty: 'intermediate',
    difficultyLabel: 'ปานกลาง',
    estimatedMinutes: 15,
    version: '1.0.0',
    academicReviewStatus: 'draft'
  },
  patientProfile: {
    displayName: 'คุณประเสริฐ (นามสมมุติ)',
    age: 56,
    sex: 'male',
    lifeStage: 'ปัจฉิมวัย (วัยสูงอายุ/ผู้ใหญ่อาวุโสตอนต้น)',
    birthMonth: 'มิถุนายน (ขึ้น ๗ ค่ำ เดือน ๗ — ธาตุเจ้าเรือนกำเนิด: วาโยธาตุ)',
    occupation: 'ที่ปรึกษาฝ่ายขายและการตลาด (เดินทางต่างจังหวัดบ่อย)',
    residence: 'บ้านเดี่ยว จังหวัดสมุทรปราการ',
    personality: 'กระตือรือร้น พูดเร็ว คิดเร็ว มีความกังวลเรื่องสุขภาพเมื่ออายุมากขึ้น',
    speechStyle: 'พูดเร็ว ตรงไปตรงมา มีน้ำเสียงกระตือรือร้น ชอบเล่าแบบสรุปใจความ',
    healthLiteracy: 'ระดับปานกลาง ทราบเรื่องความดันและอาหารเสริม แต่ยังสับสนเรื่องธาตุ'
  },
  initialDisclosure: {
    displayName: 'คุณประเสริฐ (นามสมมุติ)',
    age: 56,
    chiefConcern: 'ท้องอืดแน่น มีลมดันขึ้นยอดอก ผายลมและเรอบ่อย วิงเวียนศีรษะง่ายเวลาเดินทางหรือนอนดึก เป็นมา 3 สัปดาห์',
    briefContext: 'เดินทางบ่อย มีความเครียดสะสม พักผ่อนไม่เป็นเวลา รับประทานอาหารไม่ตรงเวลา'
  },
  hiddenFacts: {
    presentingConcern: [
      {
        id: 'fact-wind-presenting-01',
        category: 'presentingConcern',
        label: 'อาการท้องอืดลมตีขึ้น',
        value: 'ท้องอืด แน่น มวนท้อง มีลมดันขึ้นยอดอกทำให้หายใจไม่ค่อยอิ่ม เรอบ่อยและผายลมบ่อยมากช่วงบ่ายถึงค่ำ',
        importance: 'essential'
      },
      {
        id: 'fact-wind-presenting-02',
        category: 'presentingConcern',
        label: 'อาการวิงเวียนศีรษะ',
        value: 'รู้สึกโคลงเคลง มึนงงศีรษะ ตาพร่าเล็กน้อยเวลาลุกยืนเร็วๆ หรือวันไหนที่นอนไม่พอ ไม่ถึงขั้นบ้านหมุน',
        importance: 'essential'
      }
    ],
    symptoms: [
      {
        id: 'fact-wind-symptom-01',
        category: 'symptoms',
        label: 'อาการปวดเกร็งกล้ามเนื้อ',
        value: 'มีอาการเกร็งน่องและบ่าไหล่ตึงเป็นช่วงๆ ร่วมกับมือเท้าเย็นเวลาอยู่ในที่อากาศเย็น',
        importance: 'important'
      },
      {
        id: 'fact-wind-symptom-02',
        category: 'symptoms',
        label: 'การรับรู้รสและกลิ่น',
        value: 'ปกติ ไม่มีอาการปากขม คอแห้งเป็นพักๆ',
        importance: 'supporting'
      }
    ],
    food: [
      {
        id: 'fact-wind-food-01',
        category: 'food',
        label: 'อาหารที่รับประทานประจำ',
        value: 'ชอบอาหารรสจัด รสเค็มนำ และอาหารแห้งๆ ของทอด รับประทานอาหารเร็วเพราะรีบทำงาน',
        importance: 'essential'
      },
      {
        id: 'fact-wind-food-02',
        category: 'food',
        label: 'เวลาอาหาร',
        value: 'รับประทานอาหารไม่เป็นเวลา บางวันมื้อเที่ยงกินตอน 14:00 น. บางวันกินมื้อดึกตอน 21:00 น.',
        importance: 'important'
      }
    ],
    drink: [
      {
        id: 'fact-wind-drink-01',
        category: 'drink',
        label: 'เครื่องดื่ม',
        value: 'ดื่มกาแฟดำวันละ 3-4 แก้วเพื่อกระตุ้นให้ตื่นตัว ดื่มน้ำเปล่าประมาณ 1.2 ลิตร/วัน ชอบดื่มน้ำเย็น',
        importance: 'essential'
      }
    ],
    appetite: [
      {
        id: 'fact-wind-appetite-01',
        category: 'appetite',
        label: 'ความอยากอาหาร',
        value: 'อยากอาหารไม่สม่ำเสมอ บางมื้ออยากทานมาก บางมื้อรู้สึกเบื่ออาหารเพราะแน่นท้อง',
        importance: 'supporting'
      }
    ],
    sleep: [
      {
        id: 'fact-wind-sleep-01',
        category: 'sleep',
        label: 'การนอนหลับ',
        value: 'นอนไม่หลับ หลับยาก ใช้เวลา 1-2 ชั่วโมงกว่าจะหลับ ตื่นกลางดึกบ่อย นอนเฉลี่ย 4-5 ชั่วโมง/คืน',
        importance: 'essential'
      }
    ],
    bowel: [
      {
        id: 'fact-wind-bowel-01',
        category: 'bowel',
        label: 'การขับถ่ายอุจจาระ',
        value: 'ท้องผูกสลับถ่ายปกติ อุจจาระมักแข็งเป็นก้อนกลมเหมือนเม็ดกระสุน (ขี้แพะ) ต้องออกแรงเบ่ง',
        importance: 'essential'
      }
    ],
    urination: [
      {
        id: 'fact-wind-urination-01',
        category: 'urination',
        label: 'การขับถ่ายปัสสาวะ',
        value: 'ปัสสาวะบ่อยตอนกลางวัน กลางคืนตื่นปัสสาวะ 1 ครั้ง สีเหลืองใส ปกติดี',
        importance: 'supporting'
      }
    ],
    activity: [
      {
        id: 'fact-wind-activity-01',
        category: 'activity',
        label: 'การออกกำลังกาย',
        value: 'ตีกอล์ฟเดือนละ 1-2 ครั้ง ไม่มีเวลาออกกำลังกายสม่ำเสมอ เดินเยอะตอนพบลูกค้า',
        importance: 'supporting'
      }
    ],
    stress: [
      {
        id: 'fact-wind-stress-01',
        category: 'stress',
        label: 'ความเครียดและอารมณ์',
        value: 'ความเครียดสูงจากยอดขายและการเดินทางต่อเนื่อง รู้สึกกระวนกระวาย ใจสั่นเล็กน้อยเวลาเครียด',
        importance: 'important'
      }
    ],
    occupationFactors: [
      {
        id: 'fact-wind-occupation-01',
        category: 'occupationFactors',
        label: 'ลักษณะงาน',
        value: 'ขับรถทางไกล นั่งเครื่องบินบ่อย ประชุมเครียดและเปลี่ยนสภาพแวดล้อมตลอดเวลา',
        importance: 'important'
      }
    ],
    environmentFactors: [
      {
        id: 'fact-wind-environment-01',
        category: 'environmentFactors',
        label: 'สภาพแวดล้อม',
        value: 'เผชิญลมและแอร์บนยานพาหนะเป็นประจำ อุณหภูมิเปลี่ยนแปลงบ่อย',
        importance: 'supporting'
      }
    ],
    medicalHistory: [
      {
        id: 'fact-wind-medical-01',
        category: 'medicalHistory',
        label: 'โรคประจำตัว',
        value: 'มีความดันโลหิตค่อนไปทางสูงเล็กน้อย (Pre-hypertension ~ 135/85 mmHg) ยังไม่ได้เริ่มยาลดความดัน ตรวจหัวใจปกติ',
        importance: 'essential'
      }
    ],
    medications: [
      {
        id: 'fact-wind-med-01',
        category: 'medications',
        label: 'ยาและอาหารเสริม',
        value: 'ทานวิตามินรวมและน้ำมันปลาเป็นประจำ ไม่มียาปฏิชีวนะหรือยาลดกรดประจำ',
        importance: 'important'
      }
    ],
    foodAllergies: [
      {
        id: 'fact-wind-allergy-food-01',
        category: 'foodAllergies',
        label: 'ประวัติแพ้อาหาร',
        value: 'ไม่มีประวัติแพ้อาหาร',
        importance: 'essential'
      }
    ],
    drugAllergies: [
      {
        id: 'fact-wind-allergy-drug-01',
        category: 'drugAllergies',
        label: 'ประวัติแพ้ยา',
        value: 'แพ้ยาเพนิซิลลิน (Penicillin) เคยมีผื่นคันแน่นหน้าอกเมื่อ 20 ปีก่อน',
        importance: 'essential'
      }
    ],
    herbalAllergies: [
      {
        id: 'fact-wind-allergy-herbal-01',
        category: 'herbalAllergies',
        label: 'ประวัติแพ้สมุนไพร',
        value: 'ไม่มีประวัติแพ้สมุนไพร',
        importance: 'essential'
      }
    ],
    pastHistory: [
      {
        id: 'fact-wind-past-01',
        category: 'pastHistory',
        label: 'ประวัติการเจ็บป่วยในอดีต',
        value: 'เคยเป็นโรคลำไส้แปรปรวน (IBS) เมื่อ 5 ปีก่อน อาการทุเลาลงแล้ว',
        importance: 'important'
      }
    ],
    otherRelevantHistory: [
      {
        id: 'fact-wind-other-01',
        category: 'otherRelevantHistory',
        label: 'การสูบบุหรี่และสุรา',
        value: 'เคยสูบบุหรี่แต่เลิกมา 10 ปีแล้ว ดื่มไวน์ 1 แก้วเวลาเลี้ยงลูกค้า',
        importance: 'supporting'
      }
    ],
    redFlagFacts: [
      {
        id: 'fact-wind-redflag-01',
        category: 'redFlagFacts',
        label: 'สัญญาณอันตราย',
        value: 'ไม่มีแขนขาอ่อนแรงครึ่งซีก ไม่มีปากเบี้ยว ไม่มีพูดไม่ชัด ไม่มีเจ็บแน่นหน้าอกร้าวไปกรามหรือแขน',
        importance: 'essential',
        redFlag: false
      }
    ]
  },
  responseRules: [
    {
      id: 'rule-wind-chief-concern',
      category: 'chief_concern',
      keywords: ['เป็นอะไรมา', 'อาการสำคัญ', 'ไม่สบายตรงไหน', 'มาพบหมอ', 'สาเหตุ'],
      synonyms: ['เป็นอะไร', 'อาการหลัก', 'มีปัญหาอะไร'],
      patterns: ['เป็นอะไรมา', 'มาพบหมอด้วยเรื่องอะไร', 'มีอาการอย่างไร'],
      factReferences: ['fact-wind-presenting-01', 'fact-wind-presenting-02'],
      minimumSpecificity: 1,
      responseVariants: [
        'ท้องอืดแน่น มีลมดันขึ้นยอดอก ผายลมและเรอบ่อยมากครับ แถมวิงเวียนศีรษะง่ายเวลาเดินทางหรือนอนดึก เป็นมา 3 สัปดาห์แล้วครับ',
        'มาปรึกษาเรื่องลมในท้องเยอะ เรอบ่อย ผายลมตลอด และมึนงงศีรษะเวลาพักผ่อนน้อยครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องอาการท้องอืด ลมดัน และวิงเวียนศีรษะเมื่อนอนน้อย'
    },
    {
      id: 'rule-wind-symptoms',
      category: 'symptoms',
      keywords: ['ท้องอืด', 'ผายลม', 'วิงเวียน', 'ลมดัน', 'นอนไม่หลับ', 'เรอ', 'มึนงง', 'เกร็งน่อง', 'มือเท้าเย็น'],
      synonyms: ['ลมตี', 'โคลงเคลง', 'ตาพร่า', 'จุกยอดอก'],
      patterns: ['มีอาการอย่างไร', 'เป็นมานานแค่ไหน', 'วิงเวียนเวลาไหน', 'อาการเป็นอย่างไรบ้าง'],
      factReferences: ['fact-wind-presenting-01', 'fact-wind-presenting-02', 'fact-wind-symptom-01', 'fact-wind-symptom-02'],
      minimumSpecificity: 1,
      responseVariants: [
        'ท้องอืด มวนท้อง มีลมดันขึ้นยอดอกจนหายใจไม่ค่อยอิ่มครับ เรอบ่อยและผายลมตลอดช่วงบ่ายถึงค่ำ ถ้าลุกเร็วจะวิงเวียนโคลงเคลง ตาพร่าเล็กน้อยครับ',
        'มีอาการเกร็งน่องกับบ่าไหล่ตึงเป็นช่วงๆ ครับ มือเท้าจะเย็นง่ายเวลาอยู่ในที่อากาศเย็น แต่การรับรสรับกลิ่นยังปกติดีครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องอาการท้องอืด ลมดัน วิงเวียน และเกร็งกล้ามเนื้อ'
    },
    {
      id: 'rule-wind-food',
      category: 'food',
      keywords: ['อาหาร', 'กินอะไร', 'ทานอะไร', 'รสจัด', 'รสเค็ม', 'ของทอด', 'ของแห้ง', 'กินเร็ว'],
      synonyms: ['มื้ออาหาร', 'พฤติกรรมการกิน'],
      patterns: ['ชอบทานอะไร', 'ทานอาหารแบบไหน', 'ทานอาหารตรงเวลาไหม'],
      factReferences: ['fact-wind-food-01', 'fact-wind-food-02'],
      minimumSpecificity: 1,
      responseVariants: [
        'ชอบทานอาหารรสจัด รสเค็มนำ และพวกอาหารแห้งๆ ของทอดครับ เวลากินจะรีบกินเร็วเพราะต้องรีบทำงาน มื้ออาหารก็ไม่เป็นเวลา บางวันกินมื้อเที่ยงบ่าย 2 มื้อดึกกิน 3 ทุ่มครับ',
        'กินอาหารไม่ตรงเวลาเลยครับ ชอบอาหารรสเค็มและของทอด ทานเร็วมากครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องชอบอาหารรสจัด รสเค็ม ของทอด กินเร็วและไม่ตรงเวลา'
    },
    {
      id: 'rule-wind-drink',
      category: 'drink',
      keywords: ['ดื่มน้ำ', 'กินน้ำ', 'กาแฟ', 'กาแฟดำ', 'น้ำเย็น', 'น้ำเปล่า', 'กี่แก้ว'],
      synonyms: ['เครื่องดื่ม', 'คาเฟอีน'],
      patterns: ['ดื่มน้ำวันละเท่าไหร่', 'ดื่มกาแฟกี่แก้ว', 'ชอบดื่มอะไร'],
      factReferences: ['fact-wind-drink-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ดื่มกาแฟดำวันละ 3-4 แก้วครับเพื่อให้ตื่นตัวทำงาน ส่วนน้ำเปล่าดื่มประมาณ 1.2 ลิตรต่อวัน และชอบดื่มน้ำเย็นครับ',
        'ติดกาแฟดำมากครับ ดื่มวันละ 3-4 แก้วตลอดวัน น้ำเปล่าดื่มได้ประมาณลิตรกว่าๆ ครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องดื่มกาแฟดำวันละ 3-4 แก้ว ดื่มน้ำเย็น 1.2 ลิตร'
    },
    {
      id: 'rule-wind-appetite',
      category: 'appetite',
      keywords: ['ความอยากอาหาร', 'หิว', 'เบื่ออาหาร', 'กินได้ไหม'],
      synonyms: ['ทานได้ปกติไหม'],
      patterns: ['ความอยากอาหารเป็นอย่างไร', 'ทานข้าวได้เยอะไหม'],
      factReferences: ['fact-wind-appetite-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ความอยากอาหารไม่ค่อยสม่ำเสมอครับ บางมื้อก็อยากทานมาก บางมื้อรู้สึกเบื่ออาหารเพราะแน่นท้องอืดลมครับ',
        'บางวันก็ทานได้เยอะ บางมื้อแน่นท้องจนไม่อยากกินอะไรครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องความอยากอาหารไม่สม่ำเสมอ เบื่ออาหารเวลาแน่นท้อง'
    },
    {
      id: 'rule-wind-sleep',
      category: 'sleep',
      keywords: ['นอน', 'การนอน', 'หลับ', 'กี่โมง', 'ตื่น', 'หลับยาก', 'ตื่นกลางดึก', 'ชั่วโมง'],
      synonyms: ['นอนไม่หลับ', 'พักผ่อน'],
      patterns: ['นอนหลับดีไหม', 'นอนกี่ชั่วโมง', 'หลับยากไหม'],
      factReferences: ['fact-wind-sleep-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'นอนไม่ค่อยหลับครับ หลับยากมาก ใช้เวลา 1-2 ชั่วโมงกว่าจะเคลิ้มหลับ แถมตื่นกลางดึกบ่อย นอนเฉลี่ยแค่คืนละ 4-5 ชั่วโมงเองครับ',
        'มีปัญหานอนไม่หลับสะสมครับ ตื่นกลางดึกบ่อยมาก พักผ่อนน้อยครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องนอนไม่หลับ หลับยาก นอนคืนละ 4-5 ชม. ตื่นกลางดึก'
    },
    {
      id: 'rule-wind-bowel',
      category: 'bowel',
      keywords: ['ขับถ่าย', 'อุจจาระ', 'อึ', 'ท้องผูก', 'ขี้แพะ', 'ก้อนกลม', 'เบ่ง'],
      synonyms: ['การขับถ่าย', 'ถ่ายยาก'],
      patterns: ['การขับถ่ายเป็นอย่างไร', 'อุจจาระมีลักษณะอย่างไร'],
      factReferences: ['fact-wind-bowel-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ท้องผูกสลับถ่ายปกติครับ อุจจาระมักแข็งเป็นก้อนกลมเหมือนเม็ดกระสุนหรือขี้แพะ ต้องออกแรงเบ่งมากครับ',
        'ถ่ายค่อนข้างลำบากครับ อุจจาระแข็งเป็นเม็ดเล็กๆ เบ่งเหนื่อยครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องท้องผูก อุจจาระแข็งเป็นก้อนกลมขี้แพะ ออกแรงเบ่ง'
    },
    {
      id: 'rule-wind-urination',
      category: 'urination',
      keywords: ['ปัสสาวะ', 'ฉี่', 'สีปัสสาวะ', 'บ่อย', 'กลางคืน'],
      synonyms: ['การปัสสาวะ'],
      patterns: ['ปัสสาวะเป็นอย่างไร', 'ปัสสาวะบ่อยไหม'],
      factReferences: ['fact-wind-urination-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ปัสสาวะบ่อยตอนกลางวันครับ ส่วนกลางคืนมีตื่นมาเข้าห้องน้ำ 1 ครั้ง สีเหลืองใส ปกติดี ไม่แสบขัดครับ',
        'ฉี่บ่อยหน่อยตอนกลางวันครับ สีเหลืองใสดีครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องปัสสาวะบ่อยตอนกลางวัน กลางคืน 1 ครั้ง สีปกติ'
    },
    {
      id: 'rule-wind-activity',
      category: 'activity',
      keywords: ['ออกกำลังกาย', 'กิจกรรม', 'กอล์ฟ', 'กีฬา', 'เดิน'],
      synonyms: ['ขยับร่างกาย'],
      patterns: ['ออกกำลังกายบ้างไหม', 'เล่นกีฬาอะไร'],
      factReferences: ['fact-wind-activity-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'มีไปตีกอล์ฟเดือนละ 1-2 ครั้งครับ ไม่ค่อยมีเวลาออกกำลังกายสม่ำเสมอ แต่เดินเยอะเวลาไปพบลูกค้าครับ',
        'ไม่ได้ออกกำลังกายประจำครับ มีตีกอล์ฟนานๆ ครั้งครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องตีกอล์ฟเดือนละ 1-2 ครั้ง ไม่มีเวลาออกกำลังกายสม่ำเสมอ'
    },
    {
      id: 'rule-wind-occupation',
      category: 'occupation',
      keywords: ['ทำงาน', 'อาชีพ', 'ที่ปรึกษา', 'ฝ่ายขาย', 'เดินทาง', 'ขับรถ', 'เครื่องบิน'],
      synonyms: ['งานประจำ', 'ทำงานอะไร'],
      patterns: ['ทำงานอะไร', 'ลักษณะงานเป็นอย่างไร'],
      factReferences: ['fact-wind-occupation-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'เป็นที่ปรึกษาฝ่ายขายและการตลาดครับ ต้องขับรถทางไกลและนั่งเครื่องบินไปต่างจังหวัดบ่อย ประชุมเครียดและเปลี่ยนที่นอนตลอดเวลาครับ',
        'ทำงานเซลส์และที่ปรึกษาการตลาดครับ เดินทางเกือบตลอดสัปดาห์ครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องเป็นที่ปรึกษาการตลาด เดินทางต่างจังหวัดบ่อย'
    },
    {
      id: 'rule-wind-environment',
      category: 'residence_environment',
      keywords: ['ลม', 'แอร์', 'อุณหภูมิ', 'สภาพแวดล้อม', 'ยานพาหนะ'],
      synonyms: ['อากาศ', 'ความเย็น'],
      patterns: ['สภาพแวดล้อมเป็นอย่างไร', 'เดินทางเจออากาศแบบไหน'],
      factReferences: ['fact-wind-environment-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ต้องเจอลมและแอร์บนรถ บนเครื่องบิน และโรงแรมเป็นประจำครับ อุณหภูมิเปลี่ยนไปเปลี่ยนมาตลอดเวลาครับ',
        'สภาพแวดล้อมเปลี่ยนบ่อยมากครับ อยู่ในรถและห้องแอร์เป็นส่วนใหญ่ครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องเผชิญลมและแอร์บนยานพาหนะ อุณหภูมิเปลี่ยนแปลงบ่อย'
    },
    {
      id: 'rule-wind-stress',
      category: 'stress',
      keywords: ['เครียด', 'ความเครียด', 'ยอดขาย', 'กังวล', 'กระวนกระวาย', 'ใจสั่น'],
      synonyms: ['สภาพจิตใจ', 'กดดัน'],
      patterns: ['มีความเครียดไหม', 'งานเครียดไหม'],
      factReferences: ['fact-wind-stress-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ความเครียดค่อนข้างสูงครับจากเรื่องยอดขายและการเดินทางต่อเนื่อง รู้สึกกระวนกระวายและใจสั่นเล็กน้อยเวลาเครียดครับ',
        'เครียดเรื่องงานและเป้าหมายยอดขายครับ พักผ่อนไม่ค่อยพอด้วยครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องความเครียดสูงจากยอดขาย กระวนกระวายใจสั่น'
    },
    {
      id: 'rule-wind-medical',
      category: 'underlying_disease',
      keywords: ['โรคประจำตัว', 'ความดัน', 'เบาหวาน', 'หัวใจ', 'ความดันโลหิต'],
      synonyms: ['โรคเรื้อรัง', 'มีโรคอะไรไหม'],
      patterns: ['มีโรคประจำตัวไหม', 'ความดันเท่าไหร่'],
      factReferences: ['fact-wind-medical-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'มีความดันโลหิตค่อนไปทางสูงเล็กน้อยครับ (Pre-hypertension ประมาณ 135/85) คุณหมอยังไม่ได้ให้เริ่มยาลดความดัน ตรวจคลื่นไฟฟ้าหัวใจก็ปกติดีครับ',
        'ความดันสูงนิดหน่อยประมาณ 135/85 ครับ ยังไม่ได้ทานยาประจำครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องความดันค่อนไปทางสูงเล็กน้อย (135/85) ยังไม่ได้ทานยา'
    },
    {
      id: 'rule-wind-medications',
      category: 'medication',
      keywords: ['ยา', 'กินยา', 'ทานยา', 'ยาประจำ', 'อาหารเสริม', 'วิตามิน', 'น้ำมันปลา'],
      synonyms: ['ยาที่ใช้'],
      patterns: ['ทานยาอะไรอยู่ไหม', 'ทานอาหารเสริมอะไรไหม'],
      factReferences: ['fact-wind-med-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ทานวิตามินรวมกับน้ำมันปลา (Fish oil) เป็นประจำครับ ไม่มียาปฏิชีวนะหรือยาลดกรดประจำครับ',
        'ทานอาหารเสริมพวกวิตามินรวมกับน้ำมันปลาครับ ไม่มียารักษาโรคประจำตัวครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องทานวิตามินรวมและน้ำมันปลา ไม่มียาประจำ'
    },
    {
      id: 'rule-wind-food-allergy',
      category: 'food_allergy',
      keywords: ['แพ้อาหาร', 'อาหารทะเล', 'ถั่ว', 'นม'],
      synonyms: ['กินอะไรแล้วแพ้ไหม'],
      patterns: ['มีแพ้อาหารไหม', 'แพ้อาหารอะไรไหม'],
      factReferences: ['fact-wind-allergy-food-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่มีประวัติแพ้อาหารเลยครับ ทานได้ทุกอย่างครับ',
        'ไม่แพ้อาหารครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่มีประวัติแพ้อาหาร'
    },
    {
      id: 'rule-wind-drug-allergy',
      category: 'drug_allergy',
      keywords: ['แพ้ยา', 'แพ้ยาแผนปัจจุบัน', 'เพนิซิลลิน', 'penicillin'],
      synonyms: ['ประวัติแพ้ยา'],
      patterns: ['มีประวัติแพ้ยาไหม', 'แพ้ยาอะไร'],
      factReferences: ['fact-wind-allergy-drug-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'มีประวัติแพ้ยาเพนิซิลลิน (Penicillin) ครับ เคยทานแล้วมีผื่นคันและแน่นหน้าอกเมื่อประมาณ 20 ปีก่อนครับ',
        'แพ้ยาเพนิซิลลินครับ มีอาการผื่นคันแน่นหน้าอกครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องแพ้ยาเพนิซิลลิน (Penicillin) เคยมีผื่นแน่นหน้าอก'
    },
    {
      id: 'rule-wind-herbal-allergy',
      category: 'herbal_allergy',
      keywords: ['แพ้สมุนไพร', 'แพ้ยาสมุนไพร'],
      synonyms: ['สมุนไพร'],
      patterns: ['เคยแพ้ยาสมุนไพรไหม', 'แพ้สมุนไพรไหม'],
      factReferences: ['fact-wind-allergy-herbal-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่มีประวัติแพ้สมุนไพรครับ',
        'ไม่เคยแพ้ยาสมุนไพรครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่มีประวัติแพ้สมุนไพร'
    },
    {
      id: 'rule-wind-past-history',
      category: 'past_history',
      keywords: ['ประวัติในอดีต', 'ibs', 'ลำไส้แปรปรวน', 'ผ่าตัด', 'นอนโรงพยาบาล'],
      synonyms: ['เคยเป็นอะไรมาก่อน'],
      patterns: ['ในอดีตเคยเป็นโรคอะไรไหม', 'เคยผ่าตัดไหม'],
      factReferences: ['fact-wind-past-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'เคยได้รับการวินิจฉัยว่าเป็นโรคลำไส้แปรปรวน (IBS) เมื่อ 5 ปีก่อนครับ แต่อาการทุเลาลงแล้ว ไม่เคยผ่าตัดใหญ่ครับ',
        'เคยเป็นลำไส้แปรปรวนเมื่อ 5 ปีก่อนครับ ตอนนี้อาการดีขึ้นมากแล้วครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องเคยเป็นโรคลำไส้แปรปรวน (IBS) เมื่อ 5 ปีก่อน'
    },
    {
      id: 'rule-wind-other-history',
      category: 'other_relevant_history',
      keywords: ['สูบบุหรี่', 'ดื่มเหล้า', 'แอลกอฮอล์', 'ไวน์', 'บุหรี่'],
      synonyms: ['สารเสพติด'],
      patterns: ['สูบบุหรี่ไหม', 'ดื่มแอลกอฮอล์ไหม'],
      factReferences: ['fact-wind-other-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'เคยสูบบุหรี่แต่เลิกเด็ดขาดมา 10 ปีแล้วครับ ส่วนแอลกอฮอล์มีดื่มไวน์ 1 แก้วเวลาไปงานเลี้ยงรับรองลูกค้าครับ',
        'เลิกบุหรี่มา 10 ปีแล้วครับ ดื่มไวน์แก้วเดียวเวลามีงานเลี้ยงครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องเคยสูบบุหรี่แต่เลิกมา 10 ปี ดื่มไวน์ 1 แก้วเวลาเลี้ยงลูกค้า'
    },
    {
      id: 'rule-wind-red-flags',
      category: 'red_flags',
      keywords: ['อ่อนแรง', 'ปากเบี้ยว', 'พูดไม่ชัด', 'แน่นหน้าอกร้าว', 'สัญญาณอันตราย'],
      synonyms: ['อาการรุนแรง'],
      patterns: ['มีแขนขาอ่อนแรงไหม', 'มีเจ็บแน่นหน้าอกไหม'],
      factReferences: ['fact-wind-redflag-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่มีแขนขาอ่อนแรงครึ่งซีก ไม่มีปากเบี้ยว ไม่มีพูดไม่ชัด และไม่มีเจ็บแน่นหน้าอกร้าวไปกรามหรือแขนครับ',
        'ไม่มีอาการรุนแรงพวกอัมพฤกษ์หรือโรคหัวใจเลยครับ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่มีสัญญาณอันตราย'
    }
  ],
  interviewChecklist: [
    {
      criterionId: 'chk-wind-01',
      category: 'อาการสำคัญ ท้องอืด ลมตีขึ้น และวิงเวียน',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-wind-presenting-01', 'fact-wind-presenting-02']
    },
    {
      criterionId: 'chk-wind-02',
      category: 'การบริโภคกาแฟ อาหารแห้ง และพฤติกรรมการกินเร็ว',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-wind-food-01', 'fact-wind-drink-01']
    },
    {
      criterionId: 'chk-wind-03',
      category: 'การนอนหลับและความเครียดสะสม',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-wind-sleep-01', 'fact-wind-stress-01']
    },
    {
      criterionId: 'chk-wind-04',
      category: 'ประวัติแพ้ยา Penicillin และความดันโลหิต (Safety Gate)',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-wind-medical-01', 'fact-wind-allergy-drug-01']
    },
    {
      criterionId: 'chk-wind-05',
      category: 'การขับถ่ายอุจจาระแห้งแข็ง',
      importance: 'important',
      requiredForFullScore: false,
      relatedFactIds: ['fact-wind-bowel-01']
    }
  ],
  elementAnalysisKey: {
    birthElement: 'วาโยธาตุ (ธาตุลม)',
    dominantElement: 'วาโยธาตุ (วาตสมุฏฐาน)',
    currentElementState: 'วาโยธาตุกำเริบและพัดผิดทิศทาง (อุทธังคมาวาตาพัดขึ้นบนทำให้วิงเวียนเรอ, อโธคมาวาตาขัดข้องทำให้อุจจาระแข็ง) ร่วมกับลมอังคมังคานุสารีวาตา',
    possibleAggravatedElements: ['วาโยธาตุ (ลมในลำไส้ กุจฉิสยาวาตา/โกฏฐาสยาวาตา)', 'วาโยธาตุ (ลมอุทธังคมาวาตา)'],
    possibleDeficientElements: ['อาโปธาตุ (น้ำหล่อเลี้ยงลำไส้และร่างกายแห้งแล้งจากกาแฟและนอนดึก)'],
    possibleDisorderedElements: ['ปฐวีธาตุ (กรีสัง - อุจจาระแข็งตัวผิดปกติ)'],
    supportingEvidence: [
      'วัยปัจฉิมวัยเป็นช่วงที่วาโยธาตุมีอิทธิพลตามกาลสมุฏฐาน',
      'การดื่มกาแฟเข้มข้นวันละ 3-4 แก้ว ดื่มน้ำน้อย และนอนดึก กระตุ้นให้วาโยธาตุกำเริบและร่างกายแห้ง',
      'ความเครียด การเดินทาง และการรับประทานอาหารไม่ตรงเวลาทำให้ลมอุทธังคมาวาตาและโกฏฐาสยาวาตาแปรปรวน'
    ],
    conflictingEvidence: [
      'ไม่มีอาการแขนขาอ่อนแรง ไม่มีสัญญาณเตือนหลอดเลือดสมอง (Stroke Red Flags)'
    ],
    acceptableReasoning: [
      'อธิบายว่าวาโยธาตุกำเริบจากพฤติกรรมเร่งรีบ กาแฟ และการนอนน้อย ส่งผลให้ลมอุทธังคมาวาตาพัดขึ้นทำให้วิงเวียนศีรษะ',
      'เชื่อมโยงความสัมพันธ์ของกาลสมุฏฐานปัจฉิมวัยกับความแห้งของลำไส้และอุจจาระแข็ง'
    ],
    commonErrors: [
      'สับสนอาการวิงเวียนกับโรคหลอดเลือดสมองโดยไม่ตรวจสอบ Red Flags',
      'ลืมแนะนำการลดปริมาณคาเฟอีนจากกาแฟดำ 4 แก้ว'
    ],
    reviewRequired: true
  },
  foodGuidanceKey: {
    recommendedTastes: ['รสสุขุมนุ่มนวล', 'รสเค็มหวานอ่อนๆ (เพิ่มความชุ่มชื้น)', 'รสเผ็ดร้อนเบาๆ (กระจายลม)'],
    foodsToEncourage: [
      'แกงเลียงหัวปลีใส่บวบและใบแมงลัก',
      'ต้มจืดฟักเขียวหรือฟักทองใส่หมูสับ',
      'ปลาชุบแป้งทอดหรือปลานึ่งซีอิ๊วใส่ขิง',
      'ผลไม้ที่มีน้ำและเส้นใยนุ่ม เช่น กล้วยน้ำว้าสุก มะละกอสุก อะโวคาโด'
    ],
    foodsToLimit: [
      'กาแฟดำเข้มข้น (ลดเหลือไม่เกินวันละ 1 แก้วช่วงเช้า หรือเปลี่ยนเป็นชาสมุนไพรอุ่น)',
      'อาหารแห้งๆ ของทอดกรอบ ถั่วทอด (เพิ่มความแห้งในกระเพาะและลำไส้)'
    ],
    foodsToAvoid: [
      'น้ำอัดลม เครื่องดื่มแอลกอฮอล์ น้ำเย็นจัด',
      'อาหารรสจัดจัด เผ็ดจัด เปรี้ยวจัดจนเกินไป'
    ],
    sampleMeals: [
      'เช้า: ข้าวต้มข้าวกล้องงอกใส่ไข่ลวกและขิงซอยอ่อนๆ',
      'กลางวัน: ข้าวสวย แกงเลียงผักรวม ปลากะพงนึ่งซีอิ๊ว',
      'เย็น: ต้มจืดเต้าหู้ไข่สาหร่ายใส่ตำลึง ผัดผักกาดขาว'
    ],
    sampleDrinks: [
      'น้ำตะไคร้ใบเตยอุ่น หรือน้ำขิงผสมน้ำผึ้งจางๆ',
      'น้ำอุ่นจิบสม่ำเสมอทั้งวัน อย่างน้อย 1.8-2 ลิตร'
    ],
    reasons: [
      'อาหารรสสุขุมและชุ่มน้ำช่วยหล่อเลี้ยงธาตุน้ำและปรับสมดุลลมที่พัดแห้งกร้าน',
      'การลดคาเฟอีนช่วยให้ระบบประสาทสงบและลดการขับน้ำออกจากร่างกาย'
    ],
    contraindications: [
      'หลีกเลี่ยงยาสมุนไพรรสร้อนจัดเกินไปเพราะอาจกระทบต่อความดันโลหิต'
    ],
    reviewRequired: true
  },
  selfCareGuidanceKey: {
    rest: [
      'จัดเวลาพักผ่อนให้สม่ำเสมอ พยายามเข้านอนก่อน 22:30 น. และหลับให้ได้อย่างน้อย 6-7 ชั่วโมง'
    ],
    sleep: [
      'งดใช้สมาร์ตโฟนก่อนนอน 30 นาที และสร้างบรรยากาศห้องนอนให้มืด เงียบ และอบอุ่น'
    ],
    movement: [
      'ออกกำลังกายแบบช้าและมั่นคง เช่น ไทเก๊ก ชี่กง หรือเดินจงกรม 20-30 นาที ช่วยดึงลมลงสู่ล่าง',
      'หลีกเลี่ยงการออกกำลังกายที่หักโหมหรือเคลื่อนไหวเร็วเกินไป'
    ],
    ruesiDatTon: [
      'ท่าฤๅษีดัดตนแก้ลมปะกังและแก้วิงเวียนศีรษะ',
      'ท่าฤๅษีดัดตนแก้ลมในแขนและขา'
    ],
    stressManagement: [
      'ฝึกหายใจแบบกระบังลม (Diaphragmatic Breathing) ช้าๆ ลึกๆ เมื่อรู้สึกเครียดหรือใจสั่น'
    ],
    dailyActivities: [
      'นวดฝ่าเท้าและแช่เท้าในน้ำอุ่น 10-15 นาทีก่อนนอนเพื่อช่วยให้หลับสบายและดึงลมลงเบื้องต่ำ'
    ],
    precautions: [
      'ค่อยๆ เปลี่ยนอิริยาบถจากนอนเป็นนั่ง และจากนั่งเป็นยืนเพื่อป้องกันอาการหน้ามืด'
    ],
    reviewRequired: true
  },
  safetyCriteria: {
    foodAllergy: 'ไม่มีประวัติแพ้อาหาร',
    drugAllergy: 'แพ้ยาเพนิซิลลิน (Penicillin)',
    herbalAllergy: 'ไม่มีประวัติแพ้ยาสมุนไพร',
    underlyingDisease: 'ความดันโลหิตสูงระดับเริ่มต้น (Pre-hypertension 135/85 mmHg)',
    medications: 'วิตามินรวม และน้ำมันปลา',
    contraindications: [
      'ห้ามแนะนำยาหรือตำรับยาที่มีสมุนไพรกลุ่มร้อนจัดและเค็มจัดในปริมาณมาก ซึ่งอาจดันความดันโลหิตให้สูงขึ้น',
      'ห้ามแนะนำการอดอาหาร'
    ],
    redFlags: [
      'ไม่มีสัญญาณอันตราย',
      'ไม่มีอาการอ่อนแรง แขนขาชาครึ่งซีก ปากเบี้ยว พูดไม่ชัด วิงเวียนบ้านหมุน หรือแน่นหน้าอก'
    ],
    referralRequired: false,
    referralConditions: [
      'หากมีอาการหน้ามืดหมดสติ ความดันโลหิตเกิน 160/100 mmHg หรือมีอาการอ่อนแรงครึ่งซีก ให้ส่งโรงพยาบาลทันที'
    ],
    unsafeRecommendations: [
      'การแนะนำให้หยุดดื่มน้ำ หรือดื่มน้ำน้อยลง',
      'การแนะนำสมุนไพรรสร้อนแรงกระตุ้นหัวใจ'
    ]
  },
  scoringCriteria: {
    interviewExpectedItems: [
      'ถามลักษณะอาการท้องอืด การเรอ และการผายลม',
      'ถามลักษณะอาการวิงเวียนและปัจจัยกระตุ้น (นอนน้อย/เปลี่ยนท่า)',
      'ถามประวัติการดื่มกาแฟและเวลาการนอนหลับ',
      'ถามประวัติความดันโลหิตและการแพ้ยา Penicillin'
    ],
    analysisExpectedEvidence: [
      'ระบุวาโยธาตุกำเริบ (ลมอุทธังคมาวาตา/โกฏฐาสยาวาตา)',
      'เชื่อมโยงกาลสมุฏฐานปัจฉิมวัยกับอาการแห้งและท้องผูก'
    ],
    recommendationExpectedItems: [
      'แนะนำอาหารรสสุขุมและชุ่มชื้น ลดกาแฟดำ',
      'แนะนำการแช่เท้าในน้ำอุ่นและปรับสุขอนามัยการนอนหลับ',
      'แนะนำท่าฤๅษีดัดตนแก้วิงเวียน'
    ],
    safetyExpectedItems: [
      'คำนึงถึงประวัติความดันโลหิตและหลีกเลี่ยงยารสร้อนจัด',
      'ตรวจสอบ Red Flags อาการทางหลอดเลือดสมอง'
    ],
    communicationRules: [
      'ใช้น้ำเสียงสุขุม นุ่มนวล ช่วยลดความกังวลของผู้รับบริการ'
    ],
    timeRules: [
      'ควบคุมเวลาให้เป็นไปตามเกณฑ์'
    ]
  },
  rubricOverrides: undefined
};
