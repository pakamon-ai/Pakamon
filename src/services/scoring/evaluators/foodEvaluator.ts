import { CaseDefinition, CategoryScore } from '../../../types';
import { ExtractedEvidence } from '../evidenceExtractor';

/**
 * Category 6: Food Guidance (15 points)
 */
export function evaluateFoodGuidance(
  evidence: ExtractedEvidence,
  caseDef: CaseDefinition,
  maxScore = 15
): { categoryScore: CategoryScore; foodSafetyConflict: string | null } {
  const evidenceList: string[] = [];
  const missingList: string[] = [];
  const notes: string[] = [];
  let foodSafetyConflict: string | null = null;

  const student = evidence.studentAnalysis;
  const key = caseDef.foodGuidanceKey;
  const safety = caseDef.safetyCriteria;

  let earned = 0;

  // 1. Recommended Tastes (4 pts)
  const studentTastes = student.recommendedTastes || [];
  const expectedTastes = (key.recommendedTastes || []).map((t) => t.toLowerCase());

  let matchedTasteCount = 0;
  studentTastes.forEach((st) => {
    const isMatched = expectedTastes.some((et) => et.includes(st.toLowerCase()) || st.toLowerCase().includes(et));
    if (isMatched) matchedTasteCount++;
  });

  if (matchedTasteCount >= 2 || (studentTastes.length > 0 && matchedTasteCount >= 1)) {
    earned += 4;
    evidenceList.push(`แนะนำรสยาที่ถูกต้องสอดคล้องกับหลักการปรับสมดุลธาตุ (${studentTastes.join(', ')})`);
  } else if (studentTastes.length > 0) {
    earned += 2;
    evidenceList.push(`มีการระบุรสยา (${studentTastes.join(', ')})`);
    missingList.push('รสยาที่แนะนำยังไม่ตรงกับหลักการปรับสมดุลธาตุของกรณีศึกษานี้');
  } else {
    missingList.push('ยังไม่ได้เลือกรสยาที่แนะนำ');
  }

  // 2. Foods to Encourage (3 pts)
  const encouraged = (student.encouragedFoods || '').toLowerCase();
  if (encouraged.length >= 15) {
    earned += 3;
    evidenceList.push('ระบุรายการอาหารที่ควรส่งเสริมได้อย่างเหมาะสมและหลากหลาย');
  } else if (encouraged.length > 0) {
    earned += 1.5;
    evidenceList.push('ระบุอาหารที่ควรส่งเสริมเบื้องต้น');
    missingList.push('ควรเพิ่มตัวอย่างอาหารที่ควรส่งเสริมให้หลากหลายและจำเพาะขึ้น');
  } else {
    missingList.push('ยังไม่ได้ระบุอาหารที่ควรส่งเสริม');
  }

  // 3. Foods to Limit / Avoid (3 pts)
  const reduced = (student.reducedFoods || '').toLowerCase();
  if (reduced.length >= 15) {
    earned += 3;
    evidenceList.push('ระบุอาหารที่ควรลดหรืองดเว้นได้อย่างเหมาะสมกับพยาธิสภาพ');
  } else if (reduced.length > 0) {
    earned += 1.5;
    evidenceList.push('ระบุอาหารที่ควรลดบางส่วน');
    missingList.push('ควรระบุอาหารที่ควรหลีกเลี่ยงให้ครอบคลุมปัจจัยเสี่ยง');
  } else {
    missingList.push('ยังไม่ได้ระบุอาหารที่ควรลดหรืองดเว้น');
  }

  // 4. Practical Sample Meals & Drinks (3 pts)
  const sampleMeals = (student.sampleMeals || '').trim();
  const sampleDrinks = (student.sampleDrinks || '').trim();
  if (sampleMeals.length >= 15 && sampleDrinks.length >= 8) {
    earned += 3;
    evidenceList.push('ให้ตัวอย่างเมนูอาหารและเครื่องดื่มสมุนไพรที่เข้าใจง่ายและนำไปปฏิบัติได้จริง');
  } else if (sampleMeals.length > 0 || sampleDrinks.length > 0) {
    earned += 1.5;
    evidenceList.push('มีตัวอย่างเมนูอาหารหรือเครื่องดื่ม');
    missingList.push('ควรระบุทั้งตัวอย่างมื้ออาหารและเครื่องดื่มสมุนไพรให้ครบถ้วน');
  } else {
    missingList.push('ยังไม่ได้ระบุตัวอย่างเมนูอาหารหรือเครื่องดื่มสมุนไพร');
  }

  // 5. Therapeutic Rationale (2 pts)
  const rationale = (student.foodRationale || '').trim();
  if (rationale.length >= 20) {
    earned += 2;
    evidenceList.push('อธิบายเหตุผลประกอบคำแนะนำอาหารตามหลักการแพทย์แผนไทยได้อย่างชัดเจน');
  } else if (rationale.length > 0) {
    earned += 1;
    missingList.push('ควรอธิบายเหตุผลทางทฤษฎีประกอบคำแนะนำด้านอาหารให้ลึกซึ้งยิ่งขึ้น');
  } else {
    missingList.push('ขาดเหตุผลประกอบคำแนะนำด้านอาหาร');
  }

  // Check safety conflict (e.g. food allergy or contraindicated foods recommended)
  const allFoodAdvice = `${encouraged} ${sampleMeals} ${sampleDrinks}`.toLowerCase();
  
  if (safety.foodAllergy && safety.foodAllergy.includes('กุ้ง') && (allFoodAdvice.includes('กุ้ง') || allFoodAdvice.includes('ปู') || allFoodAdvice.includes('อาหารทะเล'))) {
    foodSafetyConflict = 'คำแนะนำอาหารมีส่วนประกอบของ กุ้ง/ปู/อาหารทะเล ซึ่งขัดต่อประวัติการแพ้อาหารทะเลรุนแรงของผู้รับบริการ';
    earned = Math.max(0, earned - 4);
    missingList.unshift('พบข้อขัดแย้งด้านความปลอดภัย: แนะนำอาหารที่มีสารก่อภูมิแพ้ของผู้ป่วย');
  }

  const score = Math.min(Math.max(earned, 0), maxScore);

  return {
    categoryScore: {
      id: 'food_guidance',
      number: 6,
      label: 'ความเหมาะสมและความเป็นไปได้ของคำแนะนำด้านอาหาร',
      score: Math.round(score * 2) / 2,
      maxScore,
      evidence: evidenceList,
      missingCriteria: missingList,
      notes
    },
    foodSafetyConflict
  };
}
