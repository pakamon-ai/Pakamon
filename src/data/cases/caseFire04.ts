import { CaseDefinition } from '../../types';

export const CASE_FIRE_04: CaseDefinition = {
  metadata: {
    id: 'case-fire-04',
    title: 'คุณกานดา — ร้อนในง่าย หงุดหงิด ผื่นแดงเมื่อออกแดด และนอนหลับไม่สนิท',
    elementFocus: 'fire',
    difficulty: 'advanced',
    difficultyLabel: 'ซับซ้อน',
    estimatedMinutes: 20,
    version: '1.0.0',
    academicReviewStatus: 'draft'
  },
  patientProfile: {
    displayName: 'คุณกานดา (นามสมมุติ)',
    age: 42,
    sex: 'female',
    lifeStage: 'มัชฌิมวัย (วัยผู้ใหญ่/วัยกลางคน)',
    birthMonth: 'เมษายน (ขึ้น ๑๕ ค่ำ เดือน ๕ — ธาตุเจ้าเรือนกำเนิด: เตโชธาตุ)',
    occupation: 'ผู้จัดงานกิจกรรมและประสานงานภาคสนาม (Event Organizer & Production Lead)',
    residence: 'ทาวน์โฮม เขตลาดพร้าว กรุงเทพมหานคร',
    personality: 'คล่องแคล่ว อารมณ์ร้อนเล็กน้อย เจ้าระเบียบ มุ่งมั่นสูง แต่เหนื่อยล้าสะสม',
    speechStyle: 'พูดเร็ว ชัดถ้อยชัดคำ แสดงอารมณ์ชัดเจน มักบ่นเรื่องความร้อนและความหงุดหงิด',
    healthLiteracy: 'ระดับดี สนใจแพทย์ทางเลือกแต่ยังใช้วิธีผิดถูกสลับกัน'
  },
  initialDisclosure: {
    displayName: 'คุณกานดา (นามสมมุติ)',
    age: 42,
    chiefConcern: 'ร้อนในปากบ่อย มีแผลในปาก หงุดหงิดง่าย มีผื่นแดงคันเมื่อออกแดด และนอนหลับไม่สนิท ตื่นกลางดึก เป็นมาเกือบ 1 เดือน',
    briefContext: 'ทำงานกลางแจ้งสลับห้องปรับอากาศ ชอบรับประทานอาหารรสเผ็ดจัด พักผ่อนน้อย'
  },
  hiddenFacts: {
    presentingConcern: [
      {
        id: 'fact-fire-presenting-01',
        category: 'presentingConcern',
        label: 'อาการร้อนในและแผลในปาก',
        value: 'มีแผลร้อนในที่กระพุ้งแก้มและลิ้น 2-3 แผล เจ็บแสบ ปากแห้ง คอแห้ง กระหายน้ำบ่อย',
        importance: 'essential'
      },
      {
        id: 'fact-fire-presenting-02',
        category: 'presentingConcern',
        label: 'ผื่นแดงและแสบร้อนผิว',
        value: 'เวลาออกกองถ่ายกลางแดด จะมีผื่นปื้นแดงคันยุบยิบตามแขน คอ และใบหน้า แสบร้อนผิว ต้องหลบเข้าห้องแอร์',
        importance: 'essential'
      }
    ],
    symptoms: [
      {
        id: 'fact-fire-symptom-01',
        category: 'symptoms',
        label: 'อารมณ์และจิตใจ',
        value: 'รู้สึกหงุดหงิดง่าย ใจร้อน โมโหเร็วกับเรื่องเล็กน้อย รู้สึกตัวรุมๆ ร้อนผ่าวช่วงบ่าย',
        importance: 'important'
      },
      {
        id: 'fact-fire-symptom-02',
        category: 'symptoms',
        label: 'ตาและสายตา',
        value: 'ตาแดงง่าย ตาแห้งและแสบตาเวลาจ้องจอนานๆ หรือโดนแดดแรง',
        importance: 'important'
      }
    ],
    food: [
      {
        id: 'fact-fire-food-01',
        category: 'food',
        label: 'อาหารที่โปรดปราน',
        value: 'ชอบกินส้มตำพริก 10 เม็ด ต้มยำน้ำข้นเผ็ดจัด ยำรสจัด ปิ้งย่าง หม่าล่าสัปดาห์ละ 2-3 ครั้ง',
        importance: 'essential'
      },
      {
        id: 'fact-fire-food-02',
        category: 'food',
        label: 'พฤติกรรมการกิน',
        value: 'ทานอาหารรสจัดทุกมื้อเพื่อคลายเครียด ทานผลไม้รสหวานจัด เช่น ทุเรียน มะม่วงสุกบ่อยช่วงนี้',
        importance: 'important'
      }
    ],
    drink: [
      {
        id: 'fact-fire-drink-01',
        category: 'drink',
        label: 'เครื่องดื่ม',
        value: 'ดื่มกาแฟเย็นวันละ 2 แก้ว และดื่มน้ำอัดลมใส่น้ำแข็งบ่อย ดื่มน้ำเปล่าไม่สม่ำเสมอ',
        importance: 'essential'
      }
    ],
    appetite: [
      {
        id: 'fact-fire-appetite-01',
        category: 'appetite',
        label: 'ความอยากอาหาร',
        value: 'หิวบ่อย ย่อยเร็วมาก รับประทานอาหารมื้อใหญ่แต่ไม่ค่อยอิ่มทน หิวตอนดึกบ่อย',
        importance: 'supporting'
      }
    ],
    sleep: [
      {
        id: 'fact-fire-sleep-01',
        category: 'sleep',
        label: 'การนอนหลับ',
        value: 'นอนประมาณ 00:30 น. สะดุ้งตื่นตอนตี 2 หรือตี 3 พร้อมอาการตัวร้อน เหงื่อออกซึม แล้วหลับต่อยาก',
        importance: 'essential'
      }
    ],
    bowel: [
      {
        id: 'fact-fire-bowel-01',
        category: 'bowel',
        label: 'การขับถ่ายอุจจาระ',
        value: 'ถ่ายวันละ 1-2 ครั้ง อุจจาระค่อนข้างเหลว มีอาการแสบร้อนทวารหนักเวลาขับถ่ายหลังทานของเผ็ด',
        importance: 'important'
      }
    ],
    urination: [
      {
        id: 'fact-fire-urination-01',
        category: 'urination',
        label: 'การขับถ่ายปัสสาวะ',
        value: 'ปัสสาวะสีเหลืองเข้ม มีความรู้สึกอุ่นร้อนขณะปัสสาวะ ไม่แสบขัดรุนแรง',
        importance: 'important'
      }
    ],
    activity: [
      {
        id: 'fact-fire-activity-01',
        category: 'activity',
        label: 'กิจกรรมและกีฬา',
        value: 'เดินตรวจงานกลางแจ้ง วิ่งออกกำลังกายตอนเย็นสัปดาห์ละ 1 ครั้ง เหงื่อออกง่ายและกลิ่นตัวแรงขึ้นช่วงนี้',
        importance: 'supporting'
      }
    ],
    stress: [
      {
        id: 'fact-fire-stress-01',
        category: 'stress',
        label: 'ความเครียด',
        value: 'ความเครียดสูงจากการคุมทีมงานและลูกค้าที่เร่งรัดงาน รู้สึกพร้อมระเบิดอารมณ์ตลอดเวลา',
        importance: 'important'
      }
    ],
    occupationFactors: [
      {
        id: 'fact-fire-occupation-01',
        category: 'occupationFactors',
        label: 'ปัจจัยจากอาชีพ',
        value: 'ตากแดดจัดช่วง 10:00 - 15:00 น. แล้ววิ่งเข้าห้องแอร์เย็นจัด สลับไปมาวันละหลายรอบ',
        importance: 'essential'
      }
    ],
    environmentFactors: [
      {
        id: 'fact-fire-environment-01',
        category: 'environmentFactors',
        label: 'สภาพแวดล้อม',
        value: 'อุณหภูมิภายนอกร้อนอบอ้าว 36-38 องศาเซลเซียส สลับกับห้องตัดต่อที่เย็น 19 องศาเซลเซียส',
        importance: 'important'
      }
    ],
    medicalHistory: [
      {
        id: 'fact-fire-medical-01',
        category: 'medicalHistory',
        label: 'โรคประจำตัว',
        value: 'มีประวัติกระเพาะอาหารอักเสบ (Gastritis) เคยมีแสบร้อนยอดอกเวลาทานเผ็ดจัด ตรวจไทรอยด์ปกติ',
        importance: 'essential'
      }
    ],
    medications: [
      {
        id: 'fact-fire-med-01',
        category: 'medications',
        label: 'ยาที่ใช้',
        value: 'ทานยาลดกรดกลุ่ม PPI (Omeprazole) เป็นครั้งคราวเมื่อแสบท้อง',
        importance: 'important'
      }
    ],
    foodAllergies: [
      {
        id: 'fact-fire-allergy-food-01',
        category: 'foodAllergies',
        label: 'ประวัติแพ้อาหาร',
        value: 'ไม่มีประวัติแพ้อาหารชัดเจน แต่ทานของหมักดองแล้วมักคันคอและตัวร้อน',
        importance: 'essential'
      }
    ],
    drugAllergies: [
      {
        id: 'fact-fire-allergy-drug-01',
        category: 'drugAllergies',
        label: 'ประวัติแพ้ยา',
        value: 'แพ้ยากลุ่ม NSAIDs (Aspirin, Ibuprofen) มีอาการตาบวมและแน่นหน้าอก',
        importance: 'essential'
      }
    ],
    herbalAllergies: [
      {
        id: 'fact-fire-allergy-herbal-01',
        category: 'herbalAllergies',
        label: 'ประวัติแพ้สมุนไพร',
        value: 'ไม่มีประวัติแพ้ยาสมุนไพร',
        importance: 'essential'
      }
    ],
    pastHistory: [
      {
        id: 'fact-fire-past-01',
        category: 'pastHistory',
        label: 'ประวัติการเจ็บป่วย',
        value: 'เคยเป็นโรคลมแดด (Heat Exhaustion) เมื่อ 2 ปีก่อน',
        importance: 'important'
      }
    ],
    otherRelevantHistory: [
      {
        id: 'fact-fire-other-01',
        category: 'otherRelevantHistory',
        label: 'พฤติกรรมเสี่ยงอื่นๆ',
        value: 'ดื่มเบียร์เย็นจัด 1-2 กระป๋องสัปดาห์ละ 2 ครั้งเพื่อคลายร้อน ไม่สูบบุหรี่',
        importance: 'supporting'
      }
    ],
    redFlagFacts: [
      {
        id: 'fact-fire-redflag-01',
        category: 'redFlagFacts',
        label: 'สัญญาณอันตราย',
        value: 'ไม่มีไข้สูงลอยเกิน 38.5 องศา ไม่มีผื่นพุพองลอกหลุด ไม่มีอาเจียนเป็นเลือด ไม่มีปวดแสบท้องเฉียบพลันรุนแรง',
        importance: 'essential',
        redFlag: false
      }
    ]
  },
  responseRules: [
    {
      id: 'rule-fire-chief-concern',
      category: 'chief_concern',
      keywords: ['เป็นอะไรมา', 'อาการสำคัญ', 'ไม่สบายตรงไหน', 'มาพบหมอ', 'สาเหตุ'],
      synonyms: ['เป็นอะไร', 'อาการหลัก', 'มีปัญหาอะไร'],
      patterns: ['เป็นอะไรมา', 'มาพบหมอด้วยเรื่องอะไร', 'มีอาการอย่างไร'],
      factReferences: ['fact-fire-presenting-01', 'fact-fire-presenting-02'],
      minimumSpecificity: 1,
      responseVariants: [
        'มีอาการร้อนในบ่อยมาก มีแผลร้อนในที่กระพุ้งแก้มและลิ้น ตาแห้งแสบคอ กระหายน้ำตลอดเวลา แล้วก็มีผื่นแดงคันขึ้นง่ายเวลาออกแดด เป็นมาเกือบเดือนแล้วค่ะ',
        'มาปรึกษาเรื่องแผลร้อนในเรื้อรัง เจ็บปากแสบคอ และเวลาโดนแดดจัดๆ จะมีผื่นแดงเห่อคันค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องอาการร้อนใน แผลในปาก ผื่นแพ้แดด และความหงุดหงิดสะสม'
    },
    {
      id: 'rule-fire-symptoms',
      category: 'symptoms',
      keywords: ['ร้อนใน', 'แผลในปาก', 'หงุดหงิด', 'ผื่นแดง', 'ออกแดด', 'นอนไม่หลับ', 'กระพุ้งแก้ม', 'ลิ้น', 'ตัวร้อนรุม', 'เหงื่อออกมือเท้า'],
      synonyms: ['แสบคอ', 'ตัวร้อน', 'ใจร้อน', 'ตื่นกลางดึก', 'ตาแห้ง'],
      patterns: ['มีอาการอย่างไร', 'เป็นมานานแค่ไหน', 'เป็นแผลตรงไหน', 'อาการเป็นอย่างไรบ้าง'],
      factReferences: ['fact-fire-presenting-01', 'fact-fire-presenting-02', 'fact-fire-symptom-01', 'fact-fire-symptom-02'],
      minimumSpecificity: 1,
      responseVariants: [
        'มีแผลร้อนในสีขาวขอบแดงขนาด 2-3 มม. ที่กระพุ้งแก้มด้านในและขอบลิ้น เจ็บแสบเวลาเคี้ยวอาหาร คอแห้งผาก ต้องจิบน้ำตลอดเวลาค่ะ',
        'ตัวจะร้อนรุมๆ ฝ่ามือฝ่าเท้าร้อนและเหงื่อซึมง่าย ออกแดดแล้วผื่นแดงคันจะเห่อขึ้นที่แขนและคอค่ะ ช่วงนี้รู้สึกหงุดหงิดใจร้อนง่ายกว่าปกติด้วยค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องแผลร้อนใน ตัวร้อนรุม ผื่นแพ้แดด และความหงุดหงิด'
    },
    {
      id: 'rule-fire-food',
      category: 'food',
      keywords: ['อาหาร', 'กินอะไร', 'ทานอะไร', 'รสเผ็ด', 'ส้มตำ', 'พริก', 'ของทอด', 'ปิ้งย่าง', 'หมูกระทะ'],
      synonyms: ['มื้ออาหาร', 'พฤติกรรมการกิน', 'ของชอบ'],
      patterns: ['ชอบทานอาหารแบบไหน', 'ทานเผ็ดไหม', 'ชอบกินอะไร'],
      factReferences: ['fact-fire-food-01', 'fact-fire-food-02'],
      minimumSpecificity: 1,
      responseVariants: [
        'ชอบทานอาหารรสเผ็ดจัดมากค่ะ เช่น ส้มตำพริก 10 เม็ด ต้มยำน้ำข้น และทานพวกปิ้งย่าง หมูกระทะ ของทอดสัปดาห์ละ 2-3 ครั้งค่ะ',
        'ติดรสเผ็ดมากค่ะ ต้องใส่พริกเยอะๆ และชอบกินเนื้อสัตว์ปิ้งย่างกับเพื่อนๆ ตอนเย็นค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องชอบอาหารรสเผ็ดจัด ส้มตำพริก 10 เม็ด ปิ้งย่างหมูกระทะ'
    },
    {
      id: 'rule-fire-drink',
      category: 'drink',
      keywords: ['ดื่มน้ำ', 'กินน้ำ', 'กาแฟ', 'เอสเพรสโซ', 'น้ำเย็น', 'กี่แก้ว', 'น้ำเปล่า'],
      synonyms: ['เครื่องดื่ม', 'คาเฟอีน'],
      patterns: ['ดื่มน้ำวันละเท่าไหร่', 'ดื่มกาแฟไหม', 'ชอบดื่มอะไร'],
      factReferences: ['fact-fire-drink-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ดื่มกาแฟเอสเพรสโซ่เข้มๆ วันละ 2 ช็อตตอนเช้าและบ่ายค่ะ ส่วนน้ำเปล่าดื่มวันละ 1.5-2 ลิตร แต่ชอบดื่มน้ำใส่น้ำแข็งเย็นจัดค่ะ',
        'ชอบดื่มกาแฟเข้มๆ ค่ะ และดื่มน้ำเย็นจัดเพื่อดับกระหายค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องดื่มเอสเพรสโซเข้มวันละ 2 ช็อต ดื่มน้ำเปล่า 1.5-2 ลิตรใส่น้ำแข็ง'
    },
    {
      id: 'rule-fire-appetite',
      category: 'appetite',
      keywords: ['ความอยากอาหาร', 'หิว', 'เบื่ออาหาร', 'เจ็บแผล', 'เคี้ยว'],
      synonyms: ['ทานได้ไหม', 'เจ็บปาก'],
      patterns: ['ความอยากอาหารเป็นอย่างไร', 'ทานอาหารได้ไหม'],
      factReferences: ['fact-fire-appetite-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'อยากทานอาหารปกติค่ะ แต่ทานได้ช้าและไม่อร่อยเพราะเจ็บแสบแผลร้อนในเวลาเคี้ยวและโดนอาหารรสจัดค่ะ',
        'หิวปกติค่ะแต่ทานลำบากเพราะแสบแผลในปากค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องอยากทานอาหารปกติแต่เจ็บแสบแผลในปากเวลาเคี้ยว'
    },
    {
      id: 'rule-fire-sleep',
      category: 'sleep',
      keywords: ['นอน', 'การนอน', 'หลับ', 'กี่โมง', 'ตื่น', 'ร้อนรุ่ม', 'เหงื่อออก', 'สะดุ้งตื่น'],
      synonyms: ['พักผ่อน', 'ตื่นกลางดึก'],
      patterns: ['นอนหลับดีไหม', 'นอนกี่ชั่วโมง', 'ตื่นกลางดึกไหม'],
      factReferences: ['fact-fire-sleep-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'เข้านอนเที่ยงคืน ตื่น 6 โมงครึ่งค่ะ มักจะสะดุ้งตื่นตอนตี 2 ถึงตี 3 เพราะรู้สึกตัวร้อนรุมๆ เหงื่อซึมตามตัวและกระหายน้ำ ต้องลุกมาดื่มน้ำค่ะ',
        'นอนประมาณ 6 ชั่วโมงค่ะ แต่มักตื่นกลางดึกช่วงตี 2-3 เพราะร้อนตัวและหิวน้ำค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องนอนเที่ยงคืน ตื่นตี 2-3 ตัวร้อนรุมเหงื่อซึมกระหายน้ำ'
    },
    {
      id: 'rule-fire-bowel',
      category: 'bowel',
      keywords: ['ขับถ่าย', 'อุจจาระ', 'อึ', 'แสบทวาร', 'ท้องผูก', 'ถ่าย'],
      synonyms: ['การขับถ่าย', 'แสบก้น'],
      patterns: ['การขับถ่ายเป็นอย่างไร', 'อุจจาระมีลักษณะอย่างไร'],
      factReferences: ['fact-fire-bowel-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ถ่ายทุกวันค่ะ แต่อุจจาระมักจะค่อนข้างแห้งและแข็งเล็กน้อย และมีอาการรู้สึกแสบร้อนบริเวณทวารหนักเวลาทานอาหารเผ็ดจัดค่ะ',
        'ขับถ่ายทุกวันค่ะ มีแสบทวารเวลาทานเผ็ดค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องถ่ายทุกวัน อุจจาระแห้งเล็กน้อย แสบทวารเวลาทานเผ็ด'
    },
    {
      id: 'rule-fire-urination',
      category: 'urination',
      keywords: ['ปัสสาวะ', 'ฉี่', 'สีปัสสาวะ', 'เหลืองเข้ม', 'อุ่น', 'แสบขัด'],
      synonyms: ['การปัสสาวะ'],
      patterns: ['ปัสสาวะเป็นอย่างไร', 'ปัสสาวะสีอะไร'],
      factReferences: ['fact-fire-urination-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ปัสสาวะสีเหลืองเข้มและรู้สึกอุ่นร้อนกว่าปกติ วันละ 4-5 ครั้ง ไม่มีอาการแสบขัดปลายท่อปัสสาวะค่ะ',
        'ฉี่สีเหลืองเข้มและรู้สึกอุ่นๆ ค่ะ ไม่แสบไม่ขัดค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องปัสสาวะสีเหลืองเข้ม รู้สึกอุ่นร้อน วันละ 4-5 ครั้ง ไม่แสบขัด'
    },
    {
      id: 'rule-fire-activity',
      category: 'activity',
      keywords: ['ออกกำลังกาย', 'กิจกรรม', 'วิ่ง', 'ฟิตเนส', 'เหงื่อ', 'หน้าแดง'],
      synonyms: ['กีฬา'],
      patterns: ['ออกกำลังกายบ้างไหม', 'เล่นกีฬาอะไร'],
      factReferences: ['fact-fire-activity-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'วิ่งออกกำลังกายกลางแจ้งหรือเข้าฟิตเนสสัปดาห์ละ 3 ครั้งค่ะ แต่ช่วงนี้ออกกำลังกายแล้วเหนื่อยเร็ว หน้าแดงก่ำและตัวร้อนนานกว่าปกติค่ะ',
        'วิ่งอาทิตย์ละ 3 วันค่ะ แต่ช่วงนี้รู้สึกตัวร้อนระอุและหน้าแดงง่ายมากค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องวิ่งสัปดาห์ละ 3 ครั้ง เหนื่อยเร็วหน้าแดงตัวร้อนนาน'
    },
    {
      id: 'rule-fire-occupation',
      category: 'occupation',
      keywords: ['ทำงาน', 'อาชีพ', 'ผู้จัดการ', 'อีเวนต์', 'แดด', 'กลางแจ้ง', 'หน้างาน'],
      synonyms: ['งานประจำ', 'ทำงานอะไร'],
      patterns: ['ทำงานอะไร', 'ลักษณะงานเป็นอย่างไร'],
      factReferences: ['fact-fire-occupation-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'เป็นผู้จัดการฝ่ายจัดกิจกรรมและอีเวนต์ (Event Manager) ค่ะ ต้องตรวจหน้างานกลางแจ้ง ตากแดดตากลม คุมทีมงานและแก้ปัญหาเฉพาะหน้าตลอดวันค่ะ',
        'ทำงานคุมอีเวนต์ค่ะ ตากแดดจัดบ่อยและต้องประสานงานหลายฝ่ายค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องเป็น Event Manager ตรวจงานกลางแจ้งตากแดด คุมทีมงาน'
    },
    {
      id: 'rule-fire-environment',
      category: 'residence_environment',
      keywords: ['แดด', 'ความร้อน', 'อุณหภูมิ', 'สภาพแวดล้อม', 'คอนโด', 'ห้องทิศตะวันตก'],
      synonyms: ['อากาศร้อน', 'ที่พัก'],
      patterns: ['สภาพแวดล้อมเป็นอย่างไร', 'ที่พักอาศัยเป็นอย่างไร'],
      factReferences: ['fact-fire-environment-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ต้องทำงานกลางแจ้งเจอแดดจัดบ่อย และคอนโดที่พักเป็นห้องทิศตะวันตกรับแดดบ่ายเต็มๆ ห้องจะอมความร้อนจนถึงช่วงดึกค่ะ',
        'เจอแดดบ่อยมากค่ะ ทั้งที่ทำงานและห้องนอนที่คอนโดอมความร้อนค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องทำงานเจอแดดจัด คอนโดทิศตะวันตกอมความร้อน'
    },
    {
      id: 'rule-fire-stress',
      category: 'stress',
      keywords: ['เครียด', 'ความเครียด', 'กดดัน', 'หงุดหงิด', 'ใจร้อน', 'อารมณ์'],
      synonyms: ['สภาพจิตใจ', 'โมโห'],
      patterns: ['มีความเครียดไหม', 'อารมณ์เป็นอย่างไร'],
      factReferences: ['fact-fire-stress-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ความเครียดสูงมากค่ะเพราะงานอีเวนต์มีปัญหาหน้างานให้แก้ตลอด รู้สึกหงุดหงิดง่าย ใจร้อน และโกรธง่ายขึ้นกว่าแต่ก่อนค่ะ',
        'เครียดเรื่องงานมากค่ะ ช่วงนี้ใจร้อนและหงุดหงิดคนรอบข้างง่ายค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องความเครียดสูงจากงานอีเวนต์ หงุดหงิดใจร้อนง่าย'
    },
    {
      id: 'rule-fire-medical',
      category: 'underlying_disease',
      keywords: ['โรคประจำตัว', 'ความดัน', 'เบาหวาน', 'ไทรอยด์', 'สุขภาพ'],
      synonyms: ['โรคเรื้อรัง', 'มีโรคอะไรไหม'],
      patterns: ['มีโรคประจำตัวไหม', 'เคยตรวจไทรอยด์ไหม'],
      factReferences: ['fact-fire-medical-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่มีโรคประจำตัวร้ายแรงค่ะ เคยตรวจการทำงานของต่อมไทรอยด์เมื่อปีก่อน ผลตรวจระดับฮอร์โมนไทรอยด์ปกติดีค่ะ',
        'ไม่มีโรคประจำตัวค่ะ ฮอร์โมนไทรอยด์ตรวจแล้วก็ปกติดีค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่มีโรคประจำตัวร้ายแรง ตรวจไทรอยด์ปกติ'
    },
    {
      id: 'rule-fire-medications',
      category: 'medication',
      keywords: ['ยา', 'กินยา', 'ทานยา', 'ยาประจำ', 'ยาป้ายปาก', 'ไตรแอมซิโนโลน', 'ฟ้าทะลายโจร'],
      synonyms: ['ยาที่ใช้', 'อาหารเสริม'],
      patterns: ['ทานยาอะไรอยู่ไหม', 'ใช้ยาอะไรทาแผลไหม'],
      factReferences: ['fact-fire-med-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'มีใช้ยาป้ายปาก Triamcinolone acetonide ป้ายแผลเวลากลางคืนค่ะ และเคยทานยาฟ้าทะลายโจรแคปซูล 2 วันช่วงที่รู้สึกเจ็บคอมาก แต่หยุดทานแล้วค่ะ ไม่มียาประจำตัวอื่นค่ะ',
        'ใช้ยาป้ายแผลในปากตอนก่อนนอนค่ะ ไม่มียาประจำตัวอื่นๆ ค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องใช้ยาป้ายปาก Triamcinolone ไม่มียาประจำตัว'
    },
    {
      id: 'rule-fire-food-allergy',
      category: 'food_allergy',
      keywords: ['แพ้อาหาร', 'อาหารทะเล', 'ถั่ว', 'นม'],
      synonyms: ['กินอะไรแล้วแพ้ไหม'],
      patterns: ['มีแพ้อาหารไหม', 'แพ้อาหารอะไรไหม'],
      factReferences: ['fact-fire-allergy-food-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่มีประวัติแพ้อาหารค่ะ ทานได้หมดทุกอย่างค่ะ',
        'ไม่แพ้อาหารค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่มีประวัติแพ้อาหาร'
    },
    {
      id: 'rule-fire-drug-allergy',
      category: 'drug_allergy',
      keywords: ['แพ้ยา', 'แพ้ยาแผนปัจจุบัน', 'nsaids', 'ไอบูโพรเฟน', 'ibuprofen', 'บวม'],
      synonyms: ['ประวัติแพ้ยา', 'ยาแก้ปวด'],
      patterns: ['มีประวัติแพ้ยาไหม', 'แพ้ยาอะไร'],
      factReferences: ['fact-fire-allergy-drug-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'มีประวัติแพ้ยากลุ่ม NSAIDs โดยเฉพาะยาไอบูโพรเฟน (Ibuprofen) ค่ะ เคยทานแล้วมีอาการตาบวม ปากบวม และผื่นคันรอบดวงตาค่ะ',
        'แพ้ยาแก้ปวดไอบูโพรเฟน (Ibuprofen) ค่ะ ตาบวมปากบวมค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องแพ้ยา NSAIDs (Ibuprofen) ตาบวมปากบวม'
    },
    {
      id: 'rule-fire-herbal-allergy',
      category: 'herbal_allergy',
      keywords: ['แพ้สมุนไพร', 'แพ้ยาสมุนไพร'],
      synonyms: ['สมุนไพร'],
      patterns: ['เคยแพ้ยาสมุนไพรไหม', 'แพ้สมุนไพรไหม'],
      factReferences: ['fact-fire-allergy-herbal-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่มีประวัติแพ้ยาสมุนไพรค่ะ',
        'ไม่เคยแพ้สมุนไพรค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่มีประวัติแพ้สมุนไพร'
    },
    {
      id: 'rule-fire-past-history',
      category: 'past_history',
      keywords: ['ประวัติในอดีต', 'กระเพาะอาหาร', 'โรคกระเพาะ', 'ผ่าตัด', 'นอนโรงพยาบาล'],
      synonyms: ['เคยเป็นอะไรมาก่อน'],
      patterns: ['ในอดีตเคยเจ็บป่วยอะไรไหม', 'เคยเป็นโรคกระเพาะไหม'],
      factReferences: ['fact-fire-past-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'เคยเป็นโรคกระเพาะอาหารอักเสบเมื่อ 2 ปีก่อนช่วงที่ทานเผ็ดจัดและงานหนักค่ะ รักษาหายแล้ว ไม่เคยผ่าตัดค่ะ',
        'เคยเป็นกระเพาะอักเสบเมื่อ 2 ปีก่อนค่ะ หายดีแล้วค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องเคยเป็นโรคกระเพาะอาหารอักเสบเมื่อ 2 ปีก่อน ไม่เคยผ่าตัด'
    },
    {
      id: 'rule-fire-other-history',
      category: 'other_relevant_history',
      keywords: ['สูบบุหรี่', 'ดื่มเหล้า', 'แอลกอฮอล์', 'เบียร์', 'ค็อกเทล'],
      synonyms: ['สารเสพติด'],
      patterns: ['สูบบุหรี่ไหม', 'ดื่มแอลกอฮอล์ไหม'],
      factReferences: ['fact-fire-other-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่สูบบุหรี่ค่ะ ส่วนแอลกอฮอล์มีดื่มค็อกเทลหรือเบียร์สัปดาห์ละ 1 ครั้งเวลาสังสรรค์ปิดจบงานอีเวนต์ค่ะ',
        'ไม่สูบบุหรี่ค่ะ ดื่มเบียร์หรือค็อกเทลสัปดาห์ละครั้งเวลาเลี้ยงฉลองจบงานค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่สูบบุหรี่ ดื่มเบียร์/ค็อกเทลสัปดาห์ละครั้ง'
    },
    {
      id: 'rule-fire-red-flags',
      category: 'red_flags',
      keywords: ['ไข้สูง', 'ผื่นพุพอง', 'อาเจียนเป็นเลือด', 'ปวดแสบท้องเฉียบพลัน', 'สัญญาณอันตราย'],
      synonyms: ['อาการรุนแรง'],
      patterns: ['มีไข้สูงไหม', 'มีผื่นพุพองไหม'],
      factReferences: ['fact-fire-redflag-01'],
      minimumSpecificity: 1,
      responseVariants: [
        'ไม่มีไข้สูงลอยเกิน 38.5 องศา ไม่มีผื่นพุพองลอกหลุด ไม่มีอาเจียนเป็นเลือด และไม่มีปวดแสบท้องเฉียบพลันรุนแรงค่ะ',
        'ไม่มีอาการไข้สูงหรือผื่นพุพองรุนแรงอะไรเลยค่ะ'
      ],
      fallbackBehavior: 'ตอบเรื่องไม่มีสัญญาณอันตราย'
    }
  ],
  interviewChecklist: [
    {
      criterionId: 'chk-fire-01',
      category: 'อาการสำคัญ ร้อนใน แผลในปาก ผื่นแพ้แดด',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-fire-presenting-01', 'fact-fire-presenting-02']
    },
    {
      criterionId: 'chk-fire-02',
      category: 'พฤติกรรมการรับประทานอาหารเผ็ดจัด หม่าล่า และทุเรียน',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-fire-food-01', 'fact-fire-food-02']
    },
    {
      criterionId: 'chk-fire-03',
      category: 'สภาพแวดล้อมการทำงานตากแดดสลับห้องแอร์',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-fire-occupation-01', 'fact-fire-environment-01']
    },
    {
      criterionId: 'chk-fire-04',
      category: 'ประวัติแพ้ยา NSAIDs และประวัติกระเพาะอาหาร (Safety Gate)',
      importance: 'essential',
      requiredForFullScore: true,
      relatedFactIds: ['fact-fire-medical-01', 'fact-fire-allergy-drug-01']
    },
    {
      criterionId: 'chk-fire-05',
      category: 'รูปแบบการนอนและการตื่นกลางดึกเหงื่อซึม',
      importance: 'important',
      requiredForFullScore: false,
      relatedFactIds: ['fact-fire-sleep-01', 'fact-fire-symptom-01']
    }
  ],
  elementAnalysisKey: {
    birthElement: 'เตโชธาตุ (ธาตุไฟ)',
    dominantElement: 'เตโชธาตุ (ปิตตสมุฏฐาน)',
    currentElementState: 'เตโชธาตุกำเริบรุนแรง (สันตัปปัคคีและปริทัยหัคคีกำเริบ ส่งผลต่อพัทธปิตตะและอพัทธปิตตะ) ร่วมกับวาโยธาตุพัดกระพือความร้อน',
    possibleAggravatedElements: ['เตโชธาตุ (ไฟสันตัปปัคคี, ไฟปริทัยหัคคี)', 'ปิตตะ (พัทธปิตตะ/อพัทธปิตตะ ซึมซ่านผิวหนังและช่องปาก)'],
    possibleDeficientElements: ['อาโปธาตุ (น้ำหล่อเลี้ยงเซลล์และโลหิตแห้งระเหยจากความร้อนสะสม)'],
    possibleDisorderedElements: ['ปฐวีธาตุ (มังสังและตโช - ผิวหนังอักเสบแดง แผลในเยื่อบุช่องปาก)'],
    supportingEvidence: [
      'อาหารรสเผ็ดจัด พริก หม่าล่า ทุเรียน และแอลกอฮอล์ มีรสร้อน เพิ่มไฟธาตุโดยตรง',
      'การทำงานตากแดดจัดเวลา 10:00 - 15:00 น. ตรงกับกาลสมุฏฐานปิตตะ',
      'อาการร้อนใน แผลในปาก ผื่นแดง แสบทวารหนัก และเหงื่อออกตอนกลางคืน เป็นลักษณะเด่นของเตโชธาตุกำเริบ'
    ],
    conflictingEvidence: [
      'ไม่มีไข้สูงลอย ไม่มีสัญญาณติดเชื้อรุนแรงหรือโรคแพ้ภูมิตัวเองเฉียบพลัน'
    ],
    acceptableReasoning: [
      'อธิบายว่าเตโชธาตุกำเริบจากอาหารรสเผ็ดจัด อากาศร้อน และความเครียด ส่งผลให้ปิตตะกำเริบซึมซ่านออกทางผิวหนังและเยื่อบุช่องปาก',
      'เชื่อมโยงเวลาตากแดดกับกาลสมุฏฐานช่วงกลางวันและมัชฌิมวัย'
    ],
    commonErrors: [
      'แนะนำสมุนไพรรสร้อน เช่น ขิงแก่ พริกไทย เพิ่มเติมซึ่งจะยิ่งซ้ำเติมไฟธาตุ',
      'ลืมถามประวัติการแพ้ยา NSAIDs และโรคกระเพาะอาหาร'
    ],
    reviewRequired: true
  },
  foodGuidanceKey: {
    recommendedTastes: ['รสเย็นจืด', 'รสขม', 'รสหวานธรรมชาติอ่อนๆ (ดับพิษร้อน)', 'รสฝาดเล็กน้อย'],
    foodsToEncourage: [
      'แกงจืดมะระยัดไส้หมูสับ แกงส้มตำลึงปลาช่อน (รสเปรี้ยวสุขุม ไม่เผ็ดจัด)',
      'ต้มจับฉ่ายผักรวม ฟักเขียวตุ๋นเห็ดหอม',
      'ผักรสเย็น เช่น แตงกวา ตำลึง ใบบัวบก ผักบุ้ง ฟักเขียว หัวไชเท้า',
      'ผลไม้รสเย็น เช่น แตงโม แตงไทย แก้วมังกร ชมพู่ กล้วยหักมุกเผา'
    ],
    foodsToLimit: [
      'ส้มตำเผ็ดจัด หม่าล่า ปิ้งย่าง อาหารใส่พริกเยอะ',
      'ผลไม้รสร้อนจัด เช่น ทุเรียน ลำไย ขนุน มะม่วงสุกหวานจัด',
      'กาแฟร้อน/เย็น น้ำอัดลม แอลกอฮอล์'
    ],
    foodsToAvoid: [
      'อาหารทอดน้ำมันท่วม อาหารรสจัดเค็มจัดเผ็ดจัด อาหารหมักดองเผ็ดร้อน'
    ],
    sampleMeals: [
      'เช้า: ข้าวต้มใบเตยใส่ฟักทองและเต้าหู้ขาว',
      'กลางวัน: ข้าวสวย แกงจืดมะระใส่เต้าหู้หมูสับ ผัดบวบใส่ไข่',
      'เย็น: ต้มจืดฟักเขียวน้ำใส ปลานึ่งผักลวกจิ้มน้ำพริกมะเขือยาว'
    ],
    sampleDrinks: [
      'น้ำใบบัวบกคั้นสด (ไม่ใส่น้ำตาลหรือหวานน้อยมาก) ดับพิษร้อน',
      'น้ำเก๊กฮวย น้ำรากบัว หรือน้ำต้มใบเตยอุณหภูมิห้อง',
      'น้ำเปล่าอุณหภูมิห้อง ดื่มบ่อยๆ 2-2.5 ลิตร/วัน'
    ],
    reasons: [
      'รสเย็นและรสขมช่วยดับพิษร้อนในร่างกาย ถอนพิษไข้ และระบายความร้อนออกจากตับและทางเดินอาหาร',
      'การดื่มน้ำอุณหภูมิห้องสม่ำเสมอช่วยชดเชยการสูญเสียน้ำและปรับสมดุลปิตตะ'
    ],
    contraindications: [
      'หลีกเลี่ยงการดื่มน้ำเย็นจัดหรือน้ำแข็งทันทีขณะตัวร้อนจัดเพราะจะทำให้เส้นเลือดหดเกร็งกะทันหัน'
    ],
    reviewRequired: true
  },
  selfCareGuidanceKey: {
    rest: [
      'พักผ่อนในที่ร่ม อากาศถ่ายเทสะดวก หลีกเลี่ยงกิจกรรมกลางแจ้งช่วงแดดแรง 11:00 - 15:00 น.'
    ],
    sleep: [
      'เข้านอนก่อน 22:30 น. ปรับอุณหภูมิห้องนอนให้เย็นสบาย 24-25 องศาเซลเซียส ไม่หนาวหรือร้อนเกินไป'
    ],
    movement: [
      'ออกกำลังกายเบาๆ ในที่ร่ม เช่น โยคะยืดเหยียด หรือว่ายน้ำช่วงเช้าตรู่หรือช่วงค่ำ',
      'หลีกเลี่ยงการออกกำลังกายกลางแดดหรือที่ที่มีความร้อนสะสม'
    ],
    ruesiDatTon: [
      'ท่าฤๅษีดัดตนแก้ลมในอกและแก้ร้อนใน',
      'ท่าฤๅษีดัดตนกล่อมใจระงับความหงุดหงิด'
    ],
    stressManagement: [
      'ฝึกอานาปานสติ กำหนดลมหายใจเข้าออกช้าๆ ลึกๆ เพื่อลดไฟโทสะและความกระวนกระวายใจ',
      'หลีกเลี่ยงการทำงานต่อเนื่องหน้าจอโดยไม่พักสายตา'
    ],
    dailyActivities: [
      'สวมเสื้อผ้าผ้าฝ้ายโปร่งสบาย ระบายเหงื่อได้ดี กางร่มหรือใส่หมวกปีกกว้างเมื่อต้องออกแดด'
    ],
    precautions: [
      'สังเกตอาการแพ้แดด หากมีผื่นพุพองลอกหรือไข้สูง ให้พบแพทย์ทันที'
    ],
    reviewRequired: true
  },
  safetyCriteria: {
    foodAllergy: 'ไม่มีประวัติแพ้อาหารชัดเจน',
    drugAllergy: 'แพ้ยากลุ่ม NSAIDs (Aspirin, Ibuprofen) มีอาการตาบวม แน่นหน้าอก',
    herbalAllergy: 'ไม่มีประวัติแพ้ยาสมุนไพร',
    underlyingDisease: 'กระเพาะอาหารอักเสบ (Gastritis)',
    medications: 'Omeprazole เป็นครั้งคราว',
    contraindications: [
      'ห้ามแนะนำยาหรือตำรับยาสมุนไพรรสเผ็ดร้อนจัดที่จะระคายเคืองกระเพาะอาหารและเพิ่มไฟธาตุ',
      'ห้ามแนะนำยาแก้ปวดกลุ่ม NSAIDs โดยเด็ดขาด'
    ],
    redFlags: [
      'ไม่มีสัญญาณอันตราย',
      'ไม่มีไข้สูงลอยเกิน 38.5 องศาเซลเซียส ไม่มีผื่นพุพองลอกหลุด (Stevens-Johnson syndrome) ไม่มีอาเจียนเป็นเลือด'
    ],
    referralRequired: false,
    referralConditions: [
      'หากมีไข้สูง ผื่นลุกลามเป็นตุ่มน้ำพอง ปวดท้องรุนแรง หรืออาเจียนเป็นเลือด ให้ส่งโรงพยาบาลทันที'
    ],
    unsafeRecommendations: [
      'การแนะนำอาหารเสริมสมุนไพรรสร้อนจัด (เช่น ขิงแก่เข้มข้น พริกไทยดำ)',
      'การแนะนำให้อาบแดดหรืออบซาวน่า'
    ]
  },
  scoringCriteria: {
    interviewExpectedItems: [
      'ถามลักษณะแผลในปากและอาการร้อนใน',
      'ถามปัจจัยกระตุ้นจากการออกแดดและอาหารรสเผ็ดร้อน',
      'ถามพฤติกรรมการนอนและการสะดุ้งตื่นตัวร้อน',
      'ถามประวัติโรคกระเพาะและการแพ้ยา NSAIDs อย่างรัดกุม'
    ],
    analysisExpectedEvidence: [
      'ระบุเตโชธาตุกำเริบ (ปิตตสมุฏฐาน)',
      'เชื่อมโยงอาหารเผ็ดจัด แดด และความเครียดกับอาการร้อนในและผื่นผิวหนัง'
    ],
    recommendationExpectedItems: [
      'แนะนำอาหารรสเย็นจืด ขม ช่วยดับพิษร้อน',
      'แนะนำน้ำสมุนไพรฤทธิ์เย็น เช่น ใบบัวบก เก๊กฮวย',
      'แนะนำการหลีกเลี่ยงแดดจัดและปรับการพักผ่อน'
    ],
    safetyExpectedItems: [
      'ตระหนักถึงประวัติโรคกระเพาะและแพ้ยา NSAIDs',
      'หลีกเลี่ยงสมุนไพรรสร้อนจัดทุกชนิด'
    ],
    communicationRules: [
      'ใช้วิธีสื่อสารที่ช่วยให้ผู้รับบริการรู้สึกเย็นใจ ผ่อนคลาย และไม่ตื่นตระหนก'
    ],
    timeRules: [
      'บริหารเวลาตามเกณฑ์ที่กำหนด'
    ]
  },
  rubricOverrides: undefined
};
