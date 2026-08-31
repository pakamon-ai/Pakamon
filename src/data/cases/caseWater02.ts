import { CaseDefinition } from '../../types';

export const CASE_WATER_02: CaseDefinition = {
  metadata: {
    id: 'case-water-02',
    title: 'คุณวิภา — เสมหะยามเช้า ผิวแห้งและบวมน้ำก่อนประจำเดือน',
    elementFocus: 'water',
    difficulty: 'intermediate',
    difficultyLabel: 'ปานกลาง',
    estimatedMinutes: 15,
    version: '1.0.0',
    academicReviewStatus: 'draft'
  },
  patientProfile: {
    displayName: 'คุณวิภา (นามสมมุติ)',
    age: 34,
    sex: 'female',
    lifeStage: 'ปฐมวัย/มัชฌิมวัยตอนต้น',
    birthMonth: 'กุมภาพันธ์ (ขึ้น ๑๐ ค่ำ เดือน ๓ — ธาตุเจ้าเรือนกำเนิด: อาโปธาตุ)',
    occupation: 'นักออกแบบกราฟิกอิสระ (Freelance Graphic Designer)',
    residence: 'บ้านเดี่ยวชานเมือง นนทบุรี',
    personality: 'ช่างสังเกต อ่อนไหว พูดจานุ่มนวล ชอบสอบถามรายละเอียดเชิงลึก',
    speechStyle: 'พูดจาเป็นกันเอง เล่าอาการละเอียด มีการเตรียมข้อมูลมาพูดคุย',
    healthLiteracy: 'ระดับดี ชอบอ่านบทความสุขภาพในอินเทอร์เน็ต'
  },
  initialDisclosure: {
    displayName: 'คุณวิภา (นามสมมุติ)',
    age: 34,
    chiefConcern: 'มีเสมหะใสติดคอบ่อยช่วงเช้า ผิวพรรณแห้งคันง่าย และรู้สึกบวมน้ำตามมือเท้าช่วงก่อนมีประจำเดือน',
    briefContext: 'ทำงานในห้องปรับอากาศตลอดวัน ดื่มน้ำน้อย ชอบรับประทานของเย็นและชานมไข่มุก'
  },
  hiddenFacts: {
    presentingConcern: [
      {
        id: 'fact-water-presenting-01',
        category: 'presentingConcern',
        label: 'เสมหะช่วงเช้า',
        value: 'มีเสมหะสีขาวใสหรือขาวขุ่นเล็กน้อยติดเหนียวในลำคอ ต้องกระแอมบ่อยๆ หลังตื่นนอน เป็นมา 1 เดือน',
        importance: 'essential'
      },
      {
        id: 'fact-water-presenting-02',
        category: 'presentingConcern',
        label: 'อาการบวมน้ำก่อนมีประจำเดือน',
        value: 'รู้สึกแหวนคับ รองเท้าแน่น น้ำหนักขึ้น 1-1.5 กก. ช่วง 5-7 วันก่อนประจำเดือนมา',
        importance: 'essential'
      }
    ],
    symptoms: [
      {
        id: 'fact-water-symptom-01',
        category: 'symptoms',
        label: 'ผิวแห้งคัน',
        value: 'ผิวตัวและแขนขาแห้ง ลอกเป็นขุยเล็กน้อย คันยิบๆ หลังอาบน้ำอุ่นและอยู่ในห้องแอร์',
        importance: 'important'
      },
      {
        id: 'fact-water-symptom-02',
        category: 'symptoms',
        label: 'ประจำเดือน',
        value: 'รอบเดือนมาสม่ำเสมอทุก 28-30 วัน ปริมาณปานกลาง มีอาการปวดหน่วงท้องน้อยวันแรก',
        importance: 'important'
      }
    ],
    food: [
      {
        id: 'fact-water-food-01',
        category: 'food',
        label: 'อาหารที่ชอบ',
        value: 'ชอบกินสลัดผักผลไม้เย็นๆ โยเกิร์ต ขนมเค้ก อาหารรสหวานและรสมัน เบเกอรี่',
        importance: 'essential'
      },
      {
        id: 'fact-water-food-02',
        category: 'food',
        label: 'มื้ออาหาร',
        value: 'มักไม่ค่อยรับประทานอาหารปรุงสุกร้อน มื้อกลางวันชอบทานอาหารจานด่วนเย็นๆ',
        importance: 'important'
      }
    ],
    drink: [
      {
        id: 'fact-water-drink-01',
        category: 'drink',
        label: 'พฤติกรรมการดื่มน้ำ',
        value: 'ดื่มชานมไข่มุกหวานน้อยวันละ 1 แก้ว ดื่มน้ำเย็นจัดเป็นประจำ ดื่มน้ำเปล่ารวมไม่เกิน 1 ลิตร/วัน',
        importance: 'essential'
      }
    ],
    appetite: [
      {
        id: 'fact-water-appetite-01',
        category: 'appetite',
        label: 'ความอยากอาหาร',
        value: 'ชอบทานจุบจิบระหว่างทำงาน โดยเฉพาะของหวาน แต่ไม่ค่อยหิวมื้อหลัก',
        importance: 'supporting'
      }
    ],
    sleep: [
      {
        id: 'fact-water-sleep-01',
        category: 'sleep',
        label: 'การนอนหลับ',
        value: 'นอนดึกประมาณ 01:00 น. ตื่น 08:30 น. ตื่นมาแล้วรู้สึกคอแห้งและมีเสมหะเหนียว',
        importance: 'important'
      }
    ],
    bowel: [
      {
        id: 'fact-water-bowel-01',
        category: 'bowel',
        label: 'การขับถ่าย',
        value: 'ถ่ายทุกวันหรือวันเว้นวัน อุจจาระนิ่ม บางครั้งถ่ายไม่ค่อยเป็นก้อน ไม่ท้องผูกรุนแรง',
        importance: 'important'
      }
    ],
    urination: [
      {
        id: 'fact-water-urination-01',
        category: 'urination',
        label: 'ปัสสาวะ',
        value: 'ปัสสาวะสีใส วันละ 4-5 ครั้ง ก่อนมีประจำเดือนรู้สึกปัสสาวะออกน้อยลงกว่าปกติ',
        importance: 'important'
      }
    ],
    activity: [
      {
        id: 'fact-water-activity-01',
        category: 'activity',
        label: 'กิจกรรมทางกาย',
        value: 'เล่นโยคะสัปดาห์ละ 1 ครั้ง ไม่ค่อยมีกิจกรรมที่มีเหงื่อออก อยู่แต่ในห้องแอร์',
        importance: 'supporting'
      }
    ],
    stress: [
      {
        id: 'fact-water-stress-01',
        category: 'stress',
        label: 'ความเครียด',
        value: 'มีความเครียดจากงานออกแบบที่ต้องแก้ไขบ่อย ทำให้ทานของหวานเพื่อคลายเครียด',
        importance: 'supporting'
      }
    ],
    occupationFactors: [
      {
        id: 'fact-water-occupation-01',
        category: 'occupationFactors',
        label: 'สภาพการทำงาน',
        value: 'นั่งโต๊ะทำงานหน้าจอคอมพิวเตอร์ในห้องแอร์เฉลี่ย 8-10 ชั่วโมง/วัน',
        importance: 'important'
      }
    ],
    environmentFactors: [
      {
        id: 'fact-water-environment-01',
        category: 'environmentFactors',
        label: 'สภาพแวดล้อม',
        value: 'ห้องนอนและห้องทำงานเปิดแอร์อุณหภูมิ 20-21 องศาเซลเซียสตลอดเวลา อากาศค่อนข้างแห้ง',
        importance: 'important'
      }
    ],
    medicalHistory: [
      {
        id: 'fact-water-medical-01',
        category: 'medicalHistory',
        label: 'ประวัติสุขภาพ',
        value: 'ไม่มีโรคประจำตัวร้ายแรง ไม่มีความดันโลหิตสูง ไม่มีเบาหวาน',
        importance: 'essential'
      }
    ],
    medications: [
      {
        id: 'fact-water-med-01',
        category: 'medications',
        label: 'ยาที่ใช้',
        value: 'รับประทานยาพาราเซตามอลเฉพาะเวลาปวดประจำเดือน ไม่มียาประจำกลุ่มสเตียรอยด์หรือฮอร์โมน',
        importance: 'important'
      }
    ],
    foodAllergies: [
      {
        id: 'fact-water-allergy-food-01',
        category: 'foodAllergies',
        label: 'ประวัติแพ้อาหาร',
        value: 'แพ้กุ้งและปู (มีผื่นลมพิษและคันตา) ทานปลาและสัตว์บกได้ปกติ',
        importance: 'essential'
      }
    ],
    drugAllergies: [
      {
        id: 'fact-water-allergy-drug-01',
        category: 'drugAllergies',
        label: 'ประวัติแพ้ยา',
        value: 'แพ้ยาในกลุ่ม Sulfa (เคยมีผื่นแพ้)',
        importance: 'essential'
      }
    ],
    herbalAllergies: [
      {
        id: 'fact-water-allergy-herbal-01',
        category: 'herbalAllergies',
        label: 'ประวัติแพ้สมุนไพร',
        value: 'ไม่มีประวัติแพ้ยาสมุนไพร',
        importance: 'essential'
      }
    ],
    pastHistory: [
      {
        id: 'fact-water-past-01',
        category: 'pastHistory',
        label: 'ประวัติอดีต',
        value: 'เคยเป็นภูมิแพ้อากาศตอนเด็ก ปัจจุบันอาการคงที่',
        importance: 'supporting'
      }
    ],
    otherRelevantHistory: [
      {
        id: 'fact-water-other-01',
        category: 'otherRelevantHistory',
        label: 'การใช้สารเสพติด',
        value: 'ไม่สูบบุหรี่ ไม่ดื่มแอลกอฮอล์',
        importance: 'supporting'
      }
    ],
    redFlagFacts: [
      {
        id: 'fact-water-redflag-01',
        category: 'redFlagFacts',
        label: 'สัญญาณอันตราย',
        value: 'ไม่มีไอเป็นเลือด ไม่มีไข้เรื้อรัง ไม่มีบวมกดบุ๋มรุนแรงที่ขาทั้งสองข้าง ไม่มีหายใจหอบเหนื่อย',
        importance: 'essential',
        redFlag: false
      }
    ]
  },
  responseRules: [
    {
      id: 'rule-water-chief-concern',
      category: 'chief_concern',
      keywords: ['เป็นอะไรมา', 'อาการสำคัญ', 'ไม่สบายตรงไหน', 'มาพบหมอ', 'สาเหตุ'],
      synonyms: ['เป็นอะไร', 'อาการหลัก', 'มีปัญหาอะไร'],
      patterns: ['เป็นอะไรมา', 'มาพบหมอด้วยเรื่องอะไร', 'มีอาการอย่างไร'],
      factReferences: ['fact-water-presenting-01', 'fact-water-presenting-02'],
      minimumSpecificity: 1,
      responseVariants: [
        'ช่วงนี้ตื่นเช้ามามีเสมหะเหนียวใสติดคอตลอดเลยค่ะ แล้วก็ผิวแห้งคัน ยิ่งช่วงก่อนประจำเดือนจะรู้สึกตัวบวมน้ำ แหวนกับรองเท้าแน่นไปหมด เป็นมาประมาณ 1 เดือนแล้วค่ะ',
        'มาปรึกษาเรื่องเสมหะติดคอยามเช้า กับอาการตัวบวมน้ำช่วงก่อนมีรอบเดือนค่ะ รู้สึกอึดอัดตัวมาก'
      ],
      fallbackBehavior: 'ตอบเรื่องเสมหะยามเช้าและอาการบวมน้ำก่อนประจำเดือน'
    },
    {
      id: 'rule-water-symptoms',
      category: 'symptoms',
      keywords: ['เสมหะ', 'บวม', 'ผิวแห้ง', 'คอแห้ง', 'เช้า', 'ประจำเดือน', 'กระแอม'],
      synonyms: ['เสลด', 'ตัวบวม', 'แห้งคัน', 'ขุย'],
      patterns: ['อาการเป็นอย่างไร', 'เสมหะเป็นสีอะไร', 'บวมช่วงไหน', 'ผิวเป็นอย่างไร'],
      factReferences: ['fact-water-presenting-01', 'fact-water-presenting-02', 'fact-water-symptom-01', 'fact-water-symptom-02'],
      minimumSpecificity: 1,
      responseVariants: [
        'ตอนเช้าตื่นมาจะมีเสมหะสีขาวใสหรือขุ่นเล็กน้อยติดเหนียวในคอค่ะ ต้องกระแอมหลายครั้ง ผิวตัวก็แห้งลอกเป็นขุยคันยิบๆ หลังอาบน้ำอุ่นค่ะ',
        'ช่วง 5-7 วันก่อนประจำเดือนจะบวมน้ำ น้ำหนักขึ้น 1-1.5 กิโลเลยค่ะ แหวนที่ใส่ประจำคับมาก แต่ประจำเดือนมาตรงรอบปกติดีค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องเสมหะยามเช้า ผิวแห้งคัน และบวมน้ำ'
    },
    {
      id: 'rule-water-food',
      category: 'food',
      keywords: ['อาหาร', 'กินอะไร', 'ทานอะไร', 'ของหวาน', 'เค้ก', 'สลัด', 'โยเกิร์ต', 'ของมัน'],
      synonyms: ['มื้ออาหาร', 'พฤติกรรมการกิน', 'ของชอบ'],
      patterns: ['ชอบทานอะไร', 'ทานอาหารประเภทไหน', 'มื้ออาหารเป็นอย่างไร'],
      factReferences: ['fact-water-food-01', 'fact-water-food-02'],
      minimumSpecificity: 1,
      responseVariants: [
        'ชอบทานสลัดผักผลไม้เย็นๆ โยเกิร์ต ขนมเค้ก เบเกอรี่ และของหวานมันค่ะ ไม่ค่อยได้ทานอาหารปรุงสุกร้อนๆ เท่าไหร่ค่ะ',
        'มื้อกลางวันชอบกินอาหารจานด่วนเย็นๆ หรือสลัดค่ะ แล้วก็ชอบทานขนมหวานระหว่างทำงานค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องชอบทานสลัดเย็น โยเกิร์ต เบเกอรี่ ของหวานมัน'
    },
    {
      id: 'rule-water-drink',
      category: 'drink',
      keywords: ['ดื่มน้ำ', 'กินน้ำ', 'ชานม', 'น้ำเย็น', 'น้ำเปล่า', 'กี่แก้ว'],
      synonyms: ['เครื่องดื่ม', 'ชานมไข่มุก', 'น้ำเย็นจัด'],
      patterns: ['ดื่มน้ำวันละเท่าไหร่', 'ชอบดื่มน้ำอะไร'],
      factReferences: ['fact-water-drink-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ชอบดื่มชานมไข่มุกหวานน้อยวันละ 1 แก้วค่ะ และดื่มน้ำเย็นจัดเป็นประจำ ส่วนน้ำเปล่าดื่มรวมๆ ไม่เกิน 1 ลิตรต่อวันค่ะ',
        'ติดดื่มน้ำเย็นจัดมากค่ะ ดื่มแล้วชื่นใจ แต่ดื่มน้ำเปล่าต่อวันค่อนข้างน้อยค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องดื่มชานมไข่มุก น้ำเย็นจัด ดื่มน้ำเปล่าน้อย'
    },
    {
      id: 'rule-water-appetite',
      category: 'appetite',
      keywords: ['ความอยากอาหาร', 'หิว', 'เบื่ออาหาร', 'กินจุบจิบ', 'ของหวาน'],
      synonyms: ['ทานได้ไหม', 'หิวบ่อยไหม'],
      patterns: ['ความอยากอาหารเป็นอย่างไร', 'ทานได้เยอะไหม'],
      factReferences: ['fact-water-appetite-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่ค่อยหิวมื้อหลักเท่าไหร่ค่ะ แต่ชอบทานจุบจิบระหว่างทำงาน โดยเฉพาะพวกขนมหวานค่ะ',
        'ทานมื้อหลักได้ไม่เยอะค่ะ มักจะอยากทานของหวานหรือขนมเล่นๆ มากกว่าค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องชอบทานจุบจิบของหวาน ไม่ค่อยหิวมื้อหลัก'
    },
    {
      id: 'rule-water-sleep',
      category: 'sleep',
      keywords: ['นอน', 'การนอน', 'หลับ', 'กี่โมง', 'ตื่น', 'นอนดึก', 'คอแห้ง'],
      synonyms: ['พักผ่อน', 'ตื่นนอน'],
      patterns: ['นอนกี่โมง', 'ตื่นกี่โมง', 'หลับสบายไหม'],
      factReferences: ['fact-water-sleep-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'นอนดึกประมาณตี 1 ตื่นประมาณ 8 โมงครึ่งค่ะ ตื่นมาแล้วคอแห้งและมีเสมหะเหนียวติดคอตลอดเลยค่ะ',
        'นอนประมาณ 7 ชั่วโมงกว่าค่ะ แต่ตื่นเช้ามาจะรู้สึกคอแห้งผากและมีเสลดเหนียวค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องนอนตี 1 ตื่น 8 โมงครึ่ง ตื่นมาคอแห้งมีเสมหะ'
    },
    {
      id: 'rule-water-bowel',
      category: 'bowel',
      keywords: ['ขับถ่าย', 'อุจจาระ', 'อึ', 'ท้องผูก', 'ถ่ายเหลว', 'ถ่าย'],
      synonyms: ['การขับถ่าย', 'ถ่ายทุกวันไหม'],
      patterns: ['การขับถ่ายเป็นอย่างไร', 'อุจจาระมีลักษณะอย่างไร'],
      factReferences: ['fact-water-bowel-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ถ่ายทุกวันหรือวันเว้นวันค่ะ อุจจาระค่อนข้างนิ่ม บางครั้งไม่ค่อยเป็นก้อน แต่ไม่มีท้องผูกรุนแรงค่ะ',
        'ระบบขับถ่ายปกติระดับหนึ่งค่ะ ถ่ายนิ่มๆ ไม่ได้ผูกแข็งค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องถ่ายวันเว้นวัน อุจจาระนิ่ม ไม่ท้องผูกรุนแรง'
    },
    {
      id: 'rule-water-urination',
      category: 'urination',
      keywords: ['ปัสสาวะ', 'ฉี่', 'สีปัสสาวะ', 'บ่อย', 'ก่อนประจำเดือน'],
      synonyms: ['การปัสสาวะ', 'ฉี่ออกน้อย'],
      patterns: ['ปัสสาวะเป็นอย่างไร', 'ปัสสาวะบ่อยไหม'],
      factReferences: ['fact-water-urination-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ปัสสาวะสีใส วันละ 4-5 ครั้งค่ะ แต่ช่วงก่อนมีประจำเดือนจะรู้สึกปัสสาวะออกน้อยลงกว่าปกติค่ะ',
        'ฉี่สีใสปกติค่ะ แต่สังเกตว่าช่วงที่ตัวบวมก่อนประจำเดือนจะฉี่ออกน้อยลงค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องปัสสาวะสีใส วันละ 4-5 ครั้ง ก่อนประจำเดือนออกน้อยลง'
    },
    {
      id: 'rule-water-activity',
      category: 'activity',
      keywords: ['ออกกำลังกาย', 'กิจกรรม', 'โยคะ', 'เหงื่อ', 'ขยับตัว'],
      synonyms: ['กีฬา', 'ได้เหงื่อไหม'],
      patterns: ['ออกกำลังกายบ้างไหม', 'มีกิจกรรมอะไรบ้าง'],
      factReferences: ['fact-water-activity-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'เล่นโยคะสัปดาห์ละ 1 ครั้งค่ะ ไม่ค่อยมีกิจกรรมที่มีเหงื่อออก อยู่แต่ในห้องแอร์ตลอดค่ะ',
        'แทบไม่มีเหงื่อออกเลยค่ะ เล่นโยคะเบาๆ แค่อาทิตย์ละวันค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องเล่นโยคะสัปดาห์ละครั้ง ไม่ค่อยมีเหงื่อ'
    },
    {
      id: 'rule-water-occupation',
      category: 'occupation',
      keywords: ['ทำงาน', 'อาชีพ', 'กราฟิก', 'ฟรีแลนซ์', 'หน้าจอ', 'คอมพิวเตอร์'],
      synonyms: ['งานประจำ', 'ทำงานอะไร'],
      patterns: ['ทำงานอะไร', 'นั่งทำงานกี่ชั่วโมง'],
      factReferences: ['fact-water-occupation-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'เป็นนักออกแบบกราฟิกอิสระ (Freelance Graphic Designer) ค่ะ นั่งทำงานหน้าจอคอมพิวเตอร์ในห้องแอร์วันละ 8-10 ชั่วโมงค่ะ',
        'ทำงานออกแบบหน้าคอมทั้งวันในห้องแอร์ค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องเป็นฟรีแลนซ์กราฟิกดีไซน์ นั่งหน้าคอมห้องแอร์ 8-10 ชม.'
    },
    {
      id: 'rule-water-environment',
      category: 'residence_environment',
      keywords: ['แอร์', 'ห้องแอร์', 'อุณหภูมิ', 'สภาพแวดล้อม', 'อากาศแห้ง', 'บ้าน'],
      synonyms: ['ความเย็น', 'ห้องนอน'],
      patterns: ['สภาพแวดล้อมเป็นอย่างไร', 'เปิดแอร์กี่องศา'],
      factReferences: ['fact-water-environment-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ทั้งห้องทำงานและห้องนอนเปิดแอร์อุณหภูมิ 20-21 องศาตลอดเวลาค่ะ อากาศในห้องค่อนข้างแห้งและเย็นจัดค่ะ',
        'ชอบอยู่ห้องแอร์เย็นๆ 20 องศาค่ะ อยู่แทบจะ 24 ชั่วโมงเลยค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องเปิดแอร์ 20-21 องศาตลอดเวลา อากาศแห้ง'
    },
    {
      id: 'rule-water-stress',
      category: 'stress',
      keywords: ['เครียด', 'ความเครียด', 'แก้งาน', 'กดดัน', 'อารมณ์'],
      synonyms: ['สภาพจิตใจ', 'ความกังวล'],
      patterns: ['มีความเครียดไหม', 'งานเครียดไหม'],
      factReferences: ['fact-water-stress-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'มีความเครียดจากงานออกแบบที่ลูกค้าให้แก้งานบ่อยค่ะ พอเครียดก็เลยชอบทานของหวานเพื่อคลายเครียดค่ะ',
        'เครียดเรื่องเดดไลน์งานออกแบบค่ะ ทำให้ชอบกินขนมเค้กแก้อารมณ์เสียค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องเครียดจากการแก้งาน ทานของหวานคลายเครียด'
    },
    {
      id: 'rule-water-medical',
      category: 'underlying_disease',
      keywords: ['โรคประจำตัว', 'ความดัน', 'เบาหวาน', 'สุขภาพ'],
      synonyms: ['โรคเรื้อรัง', 'มีโรคอะไรไหม'],
      patterns: ['มีโรคประจำตัวไหม', 'มีประวัติโรคอะไรไหม'],
      factReferences: ['fact-water-medical-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่มีโรคประจำตัวร้ายแรงค่ะ ไม่มีความดันโลหิตสูง ไม่มีเบาหวานค่ะ',
        'ไม่มีโรคประจำตัวอะไรค่ะ สุขภาพทั่วไปปกติ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่มีโรคประจำตัวร้ายแรง'
    },
    {
      id: 'rule-water-medications',
      category: 'medication',
      keywords: ['ยา', 'กินยา', 'ทานยา', 'ยาประจำ', 'พารา', 'ฮอร์โมน'],
      synonyms: ['ยาที่ใช้', 'อาหารเสริม'],
      patterns: ['ทานยาอะไรอยู่ไหม', 'มียาประจำไหม'],
      factReferences: ['fact-water-med-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่ได้ทานยาประจำค่ะ มีแค่ทานยาพาราเซตามอลเฉพาะเวลาปวดประจำเดือนวันแรกเท่านั้นค่ะ ไม่มียาฮอร์โมนหรือสเตียรอยด์ค่ะ',
        'ไม่มียาประจำค่ะ ทานพาราแค่ช่วงปวดประจำเดือนค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องทานพาราเฉพาะเวลาปวดประจำเดือน ไม่มียาประจำ'
    },
    {
      id: 'rule-water-food-allergy',
      category: 'food_allergy',
      keywords: ['แพ้อาหาร', 'อาหารทะเล', 'กุ้ง', 'ปู', 'ผื่น'],
      synonyms: ['กินอะไรแล้วแพ้ไหม'],
      patterns: ['มีแพ้อาหารไหม', 'แพ้อาหารอะไร'],
      factReferences: ['fact-water-allergy-food-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'แพ้กุ้งและปูค่ะ ทานแล้วจะมีผื่นลมพิษขึ้นและคันตา แต่ทานปลาและเนื้อสัตว์อื่นๆ ได้ตามปกติค่ะ',
        'มีประวัติแพ้อาหารทะเลพวกกุ้งกับปูค่ะ จะมีผื่นคันขึ้นทันทีค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องแพ้กุ้งและปู มีผื่นลมพิษ'
    },
    {
      id: 'rule-water-drug-allergy',
      category: 'drug_allergy',
      keywords: ['แพ้ยา', 'แพ้ยาแผนปัจจุบัน', 'ซัลฟา', 'sulfa'],
      synonyms: ['ประวัติแพ้ยา'],
      patterns: ['มีประวัติแพ้ยาไหม', 'แพ้ยาอะไรไหม'],
      factReferences: ['fact-water-allergy-drug-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'มีประวัติแพ้ยาในกลุ่ม Sulfa (ซัลฟา) ค่ะ เคยทานแล้วมีผื่นแพ้ขึ้นตามตัวค่ะ',
        'แพ้ยากลุ่มซัลฟาค่ะ เคยมีผื่นขึ้นตอนเด็กๆ'
      ],
      fallbackBehavior: 'ตอบเรื่องแพ้ยากลุ่ม Sulfa เคยมีผื่นแพ้'
    },
    {
      id: 'rule-water-herbal-allergy',
      category: 'herbal_allergy',
      keywords: ['แพ้สมุนไพร', 'แพ้ยาสมุนไพร'],
      synonyms: ['สมุนไพร'],
      patterns: ['เคยแพ้ยาสมุนไพรไหม', 'แพ้สมุนไพรไหม'],
      factReferences: ['fact-water-allergy-herbal-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่มีประวัติแพ้ยาสมุนไพรค่ะ ทานสมุนไพรทั่วไปได้ปกติค่ะ',
        'ไม่เคยแพ้สมุนไพรค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่มีประวัติแพ้ยาสมุนไพร'
    },
    {
      id: 'rule-water-past-history',
      category: 'past_history',
      keywords: ['ประวัติในอดีต', 'ภูมิแพ้', 'ผ่าตัด', 'นอนโรงพยาบาล'],
      synonyms: ['เคยเป็นอะไรมาก่อน'],
      patterns: ['ในอดีตเคยเจ็บป่วยอะไรไหม', 'เคยผ่าตัดไหม'],
      factReferences: ['fact-water-past-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ตอนเด็กๆ เคยเป็นโรคภูมิแพ้อากาศค่ะ แต่โตขึ้นมาอาการก็คงที่ ไม่ค่อยกำเริบแล้วค่ะ ไม่เคยผ่าตัดค่ะ',
        'เคยเป็นภูมิแพ้อากาศตอนเด็กค่ะ ปัจจุบันไม่มีประวัติเจ็บป่วยร้ายแรงค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องเคยเป็นภูมิแพ้อากาศตอนเด็ก ไม่เคยผ่าตัด'
    },
    {
      id: 'rule-water-other-history',
      category: 'other_relevant_history',
      keywords: ['สูบบุหรี่', 'ดื่มเหล้า', 'แอลกอฮอล์', 'เบียร์'],
      synonyms: ['สารเสพติด'],
      patterns: ['สูบบุหรี่ไหม', 'ดื่มแอลกอฮอล์ไหม'],
      factReferences: ['fact-water-other-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่สูบบุหรี่ และไม่ดื่มแอลกอฮอล์เลยค่ะ',
        'ไม่เคยสูบบุหรี่หรือดื่มสุราเลยค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่สูบบุหรี่ ไม่ดื่มแอลกอฮอล์'
    },
    {
      id: 'rule-water-red-flags',
      category: 'red_flags',
      keywords: ['ไอเป็นเลือด', 'ไข้เรื้อรัง', 'บวมกดบุ๋ม', 'หอบเหนื่อย', 'สัญญาณอันตราย'],
      synonyms: ['อาการรุนแรง'],
      patterns: ['มีไอเป็นเลือดไหม', 'มีอาการหอบเหนื่อยไหม'],
      factReferences: ['fact-water-redflag-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่มีไอเป็นเลือด ไม่มีไข้เรื้อรัง ไม่มีบวมกดบุ๋มรุนแรงที่ขา และไม่มีหายใจหอบเหนื่อยค่ะ',
        'ไม่มีอาการรุนแรงอันตรายอะไรเลยค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่มีสัญญาณอันตราย'
    }
  ],
  interviewChecklist: [
    {
      criterionId: 'chk-water-01',
      category: 'อาการสำคัญและลักษณะเสมหะ/การบวม',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-water-presenting-01', 'fact-water-presenting-02']
    },
    {
      criterionId: 'chk-water-02',
      category: 'พฤติกรรมการบริโภคอาหารหวานเย็นและน้ำดื่ม',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-water-food-01', 'fact-water-drink-01']
    },
    {
      criterionId: 'chk-water-03',
      category: 'ประวัติการแพ้อาหารทะเลและยา (Safety Gate)',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-water-allergy-food-01', 'fact-water-allergy-drug-01']
    },
    {
      criterionId: 'chk-water-04',
      category: 'สภาพแวดล้อมการทำงานในห้องแอร์',
      importance: 'important',
      requiredForFullScore: false,
      relatedFactIds: ['fact-water-environment-01', 'fact-water-occupation-01']
    }
  ],
  elementAnalysisKey: {
    birthElement: 'อาโปธาตุ (ธาตุน้ำ)',
    dominantElement: 'อาโปธาตุ (เสมหะสมุฏฐาน)',
    currentElementState: 'อาโปธาตุกำเริบขัดข้อง (ศอเสมหะ/อุระเสมหะเพิ่มขึ้น) ร่วมกับลมอัสสาสะปัสสาสะและไฟย่อยหย่อนจากความเย็น',
    possibleAggravatedElements: ['อาโปธาตุ (เสมหะ, มูตรคั่งค้างก่อนรอบเดือน)'],
    possibleDeficientElements: ['เตโชธาตุ (สันตัปปัคคี/ปริณามัคคี อ่อนกำลังจากความเย็นสะสม)'],
    possibleDisorderedElements: ['วาโยธาตุ (การระบายของเหลวและการไหลเวียนโลหิตขัดข้องช่วงก่อนมีประจำเดือน)'],
    supportingEvidence: [
      'อาหารหวาน มัน เย็น และการดื่มน้ำเย็นกระตุ้นให้เสมหะเหนียวข้น',
      'การอยู่ในห้องปรับอากาศเย็นและแห้งต่อเนื่องกระทบต่อสมุฏฐานอาโปและปฐวี (ผิวหนัง)',
      'การทำงานของฮอร์โมนและของเหลวก่อนรอบเดือนสัมพันธ์กับอาโปธาตุกำเริบ'
    ],
    conflictingEvidence: [
      'ไม่มีไข้ ไม่มีอาการอักเสบติดเชื้อในทางเดินหายใจ'
    ],
    acceptableReasoning: [
      'อธิบายความสัมพันธ์ระหว่างความเย็น/ความหวาน กับการกำเริบของเสมหะและภาวะบวมน้ำ',
      'ชี้ให้เห็นว่าผิวแห้งเกิดจากร่างกายขาดน้ำอุ่นและการอยู่ในห้องแอร์ แม้ของเหลวในร่างกายจะคั่งค้าง (บวม)'
    ],
    commonErrors: [
      'แนะนำเมนูที่มีกุ้งหรือปูโดยไม่ตรวจประวัติแพ้อาหารทะเล (Safety Violation)',
      'วินิจฉัยว่าเป็นโรคไตวายโดยไม่มีหลักฐานทางคลินิกรองรับ'
    ],
    reviewRequired: true
  },
  foodGuidanceKey: {
    recommendedTastes: ['รสเผ็ดร้อนอ่อนๆ (ขับเสมหะ)', 'รสเปรี้ยวสุขุม', 'รสขมฝาดเล็กน้อย'],
    foodsToEncourage: [
      'แกงส้มผักรวม (ไม่ใส่กุ้ง/ปู ใช้เนื้อปลาแทน)',
      'ต้มยำปลาช่อนน้ำใสใส่เห็ดและมะนาว',
      'ผัดผักใส่ขิง หรือต้มจืดตำลึงเต้าหู้หมูสับใส่พริกไทย',
      'ผลไม้รสเปรี้ยวอมหวาน เช่น ส้มโอ สับปะรด มะขามป้อม'
    ],
    foodsToLimit: [
      'ชานมไข่มุก ขนมเค้ก ขนมหวาน เบเกอรี่',
      'น้ำเย็น น้ำแข็ง ไอศกรีม อาหารมันทอด'
    ],
    foodsToAvoid: [
      'อาหารทะเลกลุ่มกุ้งและปู (ผู้ป่วยแพ้รุนแรง)',
      'อาหารหมักดอง อาหารรสเค็มจัด (กระตุ้นอาการบวมน้ำ)'
    ],
    sampleMeals: [
      'เช้า: ข้าวต้มหมูสับใส่ขิงซอย โรยพริกไทยป่น',
      'กลางวัน: ข้าวสวย แกงส้มปลาผักรวม ไข่ต้ม',
      'เย็น: ต้มยำปลาน้ำใส ผัดผักกาดขาวเต้าหู้'
    ],
    sampleDrinks: [
      'น้ำมะนาวอุ่นผสมน้ำผึ้งเล็กน้อยจิบคอตอนเช้า',
      'น้ำขิงอ่อนอุ่นๆ หรือน้ำอุ่นธรรมดาตลอดวัน 1.5-2 ลิตร'
    ],
    reasons: [
      'รสเปรี้ยวและเผ็ดร้อนอ่อนๆ ช่วยละลายเสมหะและกระตุ้นการไหลเวียนโลหิต',
      'การลดความเค็มและของหวานช่วยลดอาการบวมคั่งของน้ำก่อนมีรอบเดือน'
    ],
    contraindications: [
      'ห้ามแนะนำเมนูที่มีส่วนผสมของกุ้ง ปู กะปิเข้มข้น หรือน้ำปลาแท้ที่อาจปนเปื้อนสัตว์น้ำเปลือกแข็ง'
    ],
    reviewRequired: true
  },
  selfCareGuidanceKey: {
    rest: [
      'พักผ่อนให้เพียงพอ เข้านอนก่อน 23:00 น. เพื่อช่วยปรับสมดุลธาตุน้ำและฮอร์โมน'
    ],
    sleep: [
      'หลีกเลี่ยงการเปิดเครื่องปรับอากาศต่ำกว่า 25 องศาเซลเซียส และใช้เครื่องทำความชื้นในห้องนอนหากอากาศแห้งเกินไป'
    ],
    movement: [
      'ออกกำลังกายที่ทำให้เหงื่อออก เช่น โยคะร้อน หรือเดินเร็ว 30 นาที สัปดาห์ละ 3 ครั้ง เพื่อขับน้ำส่วนเกินและกระตุ้นไฟธาตุ'
    ],
    ruesiDatTon: [
      'ท่าฤๅษีดัดตนแก้ลมในอกและแก้เสมหะ',
      'ท่าฤๅษีดัดตนดัดตนแก้ขัดแขนและไหล่'
    ],
    stressManagement: [
      'ฝึกสมาธิ ผ่อนคลายกล้ามเนื้อ หลีกเลี่ยงการใช้ขนมหวานเป็นทางออกระบายความเครียด'
    ],
    dailyActivities: [
      'ทาโลชั่นบำรุงผิวที่ไม่มีน้ำหอมหลังอาบน้ำทันที และดื่มน้ำอุ่นอย่างสม่ำเสมอ'
    ],
    precautions: [
      'หลีกเลี่ยงการอาบน้ำอุ่นจัดนานเกินไปเพราะจะทำให้ผิวแห้งคันยิ่งขึ้น'
    ],
    reviewRequired: true
  },
  safetyCriteria: {
    foodAllergy: 'แพ้กุ้งและปู (Crustaceans)',
    drugAllergy: 'แพ้ยากลุ่ม Sulfa',
    herbalAllergy: 'ไม่มีประวัติแพ้ยาสมุนไพร',
    underlyingDisease: 'ไม่มีโรคประจำตัว',
    medications: 'พาราเซตามอลเฉพาะเวลาปวดประจำเดือน',
    contraindications: [
      'ห้ามแนะนำอาหาร เครื่องดื่ม หรือยาสมุนไพรที่มีสารสกัดหรือส่วนประกอบจากกุ้ง/ปูเด็ดขาด'
    ],
    redFlags: [
      'ไม่มีสัญญาณอันตราย',
      'ไม่มีบวมกดบุ๋มรุนแรงที่ขา (Pitting Edema), ไม่มีหายใจเหนื่อยหอบ, ไม่มีไอเป็นเลือด'
    ],
    referralRequired: false,
    referralConditions: [
      'หากมีอาการบวมทั้งตัวอย่างรวดเร็ว ปัสสาวะไม่ออก หรือมีอาการหอบเหนื่อย ให้ส่งต่อแพทย์แผนปัจจุบันทันที'
    ],
    unsafeRecommendations: [
      'แนะนำเมนูต้มยำกุ้งหรือส้มตำใส่ปูดอง',
      'แนะนำให้งดดื่มน้ำโดยสิ้นเชิงเพื่อลดอาการบวม'
    ]
  },
  scoringCriteria: {
    interviewExpectedItems: [
      'ถามลักษณะและสีของเสมหะ',
      'ถามประวัติอาการบวมน้ำและความสัมพันธ์กับรอบเดือน',
      'ถามพฤติกรรมการดื่มน้ำและอาหารหวานเย็น',
      'ถามประวัติการแพ้อาหารทะเลและยาอย่างรอบคอบ'
    ],
    analysisExpectedEvidence: [
      'ระบุอาโปธาตุกำเริบ (เสมหะสมุฏฐาน)',
      'เชื่อมโยงความเย็นและอาหารหวานกับไฟย่อยหย่อนและเสมหะเหนียว'
    ],
    recommendationExpectedItems: [
      'แนะนำอาหารรสเปรี้ยว/เผ็ดร้อนอ่อนๆ ละลายเสมหะ',
      'ระมัดระวังการแพ้อาหารทะเลอย่างเข้มงวด',
      'แนะนำการปรับอุณหภูมิห้องและการดื่มน้ำอุ่น'
    ],
    safetyExpectedItems: [
      'ระบุประวัติแพ้กุ้ง/ปูในแผนความปลอดภัย',
      'ไม่มีการแนะนำอาหารที่มีสารก่อภูมิแพ้ของผู้รับบริการ'
    ],
    communicationRules: [
      'สื่อสารด้วยความเห็นอกเห็นใจ ให้ข้อมูลที่สร้างความมั่นใจและนำไปปฏิบัติได้จริง'
    ],
    timeRules: [
      'จัดสรรเวลาอย่างเหมาะสมตลอดการให้คำปรึกษา'
    ]
  },
  rubricOverrides: undefined
};
