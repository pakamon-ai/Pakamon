import { AnalysisFormData } from '../types';

export interface StepValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate Step 1: Element Analysis (วิเคราะห์ธาตุ)
 */
export function validateStep1(data: AnalysisFormData): StepValidationResult {
  const errors: Record<string, string> = {};

  if (!data.birthElement || data.birthElement.trim() === '') {
    errors.birthElement = 'กรุณาเลือกธาตุเจ้าเรือนกำเนิด';
  }

  if (!data.dominantElement || data.dominantElement.trim() === '') {
    errors.dominantElement = 'กรุณาเลือกธาตุเด่นตามลักษณะโครงสร้าง';
  }

  if (!data.currentElement || data.currentElement.trim() === '') {
    errors.currentElement = 'กรุณาระบุธาตุปัจจุบันที่มีปัญหา';
  }

  if (!data.elementCondition || data.elementCondition.length === 0) {
    errors.elementCondition = 'กรุณาเลือกภาวะธาตุผิดปกติอย่างน้อย 1 ภาวะ (กำเริบ/หย่อน/พิการ)';
  }

  if (!data.supportingReasons || data.supportingReasons.trim().length < 5) {
    errors.supportingReasons = 'กรุณาระบุข้อมูลสนับสนุนและเหตุผลทางทฤษฎีการแพทย์แผนไทย (อย่างน้อย 5 ตัวอักษร)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate Step 2: Food Recommendation (คำแนะนำด้านอาหาร)
 */
export function validateStep2(data: AnalysisFormData): StepValidationResult {
  const errors: Record<string, string> = {};

  const hasFoodItem = Boolean(
    (data.recommendedTastes && data.recommendedTastes.length > 0) ||
    (data.encouragedFoods && data.encouragedFoods.trim().length > 0) ||
    (data.reducedFoods && data.reducedFoods.trim().length > 0) ||
    (data.sampleMeals && data.sampleMeals.trim().length > 0) ||
    (data.sampleDrinks && data.sampleDrinks.trim().length > 0)
  );

  if (!hasFoodItem) {
    errors.generalFood = 'กรุณาระบุคำแนะนำด้านอาหารอย่างน้อย 1 รายการ (รสอาหาร, อาหารที่ควรส่งเสริม/หลีกเลี่ยง หรือตัวอย่างเมนู)';
  }

  if (!data.foodRationale || data.foodRationale.trim().length < 5) {
    errors.foodRationale = 'กรุณาระบุเหตุผลประกอบคำแนะนำด้านอาหาร (อย่างน้อย 5 ตัวอักษร)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate Step 3: Self-Care Recommendation (การดูแลสุขภาพ)
 */
export function validateStep3(data: AnalysisFormData): StepValidationResult {
  const errors: Record<string, string> = {};

  const hasSelfCareItem = Boolean(
    (data.restPlan && data.restPlan.trim().length > 0) ||
    (data.sleepPlan && data.sleepPlan.trim().length > 0) ||
    (data.movementPlan && data.movementPlan.trim().length > 0) ||
    (data.ruesiDatTonPlan && data.ruesiDatTonPlan.trim().length > 0) ||
    (data.stressManagement && data.stressManagement.trim().length > 0) ||
    (data.otherActivities && data.otherActivities.trim().length > 0)
  );

  if (!hasSelfCareItem) {
    errors.generalSelfCare = 'กรุณาระบุคำแนะนำการดูแลสุขภาพอย่างน้อย 1 ด้าน (การพักผ่อน, การนอน, การเคลื่อนไหว, ฤๅษีดัดตน หรือการจัดการความเครียด)';
  }

  if (!data.selfCareRationale || data.selfCareRationale.trim().length < 5) {
    errors.selfCareRationale = 'กรุณาระบุเหตุผลประกอบคำแนะนำการดูแลสุขภาพ (อย่างน้อย 5 ตัวอักษร)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate Step 4: Safety Review & Gate (ความปลอดภัย)
 * Stricter validation ensuring all critical safety topics have been actively reviewed.
 */
export function validateStep4(data: AnalysisFormData): StepValidationResult {
  const errors: Record<string, string> = {};

  if (!data.foodAllergyReviewed) {
    errors.foodAllergy = 'กรุณายืนยันการตรวจสอบประวัติแพ้อาหาร';
  }

  if (!data.drugAllergyReviewed) {
    errors.drugAllergy = 'กรุณายืนยันการตรวจสอบประวัติแพ้ยา';
  }

  if (!data.herbalAllergyReviewed) {
    errors.herbalAllergy = 'กรุณายืนยันการตรวจสอบประวัติแพ้สมุนไพร';
  }

  if (!data.underlyingDiseaseReviewed) {
    errors.underlyingDisease = 'กรุณายืนยันการตรวจสอบโรคประจำตัว';
  }

  if (!data.medicationsReviewed) {
    errors.medications = 'กรุณายืนยันการตรวจสอบการใช้ยาและอาหารเสริม';
  }

  if (!data.contraindicationsReviewed) {
    errors.contraindications = 'กรุณายืนยันการตรวจสอบข้อห้ามและข้อควรระวัง';
  }

  if (!data.redFlagsReviewed) {
    errors.redFlags = 'กรุณายืนยันการตรวจสอบสัญญาณเตือนอันตราย (Red Flags)';
  }

  if (!data.shouldRefer || data.shouldRefer === 'undecided') {
    errors.shouldRefer = 'กรุณาเลือกว่าควรส่งต่อพบแพทย์หรือไม่';
  }

  if (!data.referralReason || data.referralReason.trim().length < 5) {
    errors.referralReason = 'กรุณาระบุเหตุผลในการตัดสินใจส่งต่อหรือไม่ส่งต่อ (อย่างน้อย 5 ตัวอักษร)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate Step 5: Closing Summary & Follow-up (สรุปและติดตามผล)
 */
export function validateStep5(data: AnalysisFormData): StepValidationResult {
  const errors: Record<string, string> = {};

  if (!data.summaryForPatient || data.summaryForPatient.trim().length < 5) {
    errors.summaryForPatient = 'กรุณาระบุสรุปคำแนะนำที่เข้าใจง่ายสำหรับผู้รับบริการ (อย่างน้อย 5 ตัวอักษร)';
  }

  if (!data.understandingCheckMethod || data.understandingCheckMethod.trim().length < 5) {
    errors.understandingCheckMethod = 'กรุณาระบุวิธีตรวจสอบความเข้าใจของผู้รับบริการ (อย่างน้อย 5 ตัวอักษร)';
  }

  if (!data.followUpPlan || data.followUpPlan.trim().length < 5) {
    errors.followUpPlan = 'กรุณาระบุแผนการติดตามผลและการนัดหมาย (อย่างน้อย 5 ตัวอักษร)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Full Analysis Completion & Safety Gate Validation
 */
export function validateAllSteps(data: AnalysisFormData): {
  isAllValid: boolean;
  isSafetyValid: boolean;
  stepResults: Record<number, StepValidationResult>;
  incompleteStepNumbers: number[];
} {
  const stepResults: Record<number, StepValidationResult> = {
    1: validateStep1(data),
    2: validateStep2(data),
    3: validateStep3(data),
    4: validateStep4(data),
    5: validateStep5(data)
  };

  const incompleteStepNumbers = [1, 2, 3, 4, 5].filter(
    (stepNum) => !stepResults[stepNum].isValid
  );

  return {
    isAllValid: incompleteStepNumbers.length === 0,
    isSafetyValid: stepResults[4].isValid,
    stepResults,
    incompleteStepNumbers
  };
}
