/**
 * Fallback Response Generator for Virtual Patient.
 * Generates natural, in-character first-person responses when student questions
 * are unknown, out-of-scope, or generic.
 */

import { CaseDefinition } from '../../types';

export type FallbackType =
  | 'unknown'
  | 'rapport'
  | 'not_sure'
  | 'no_issues'
  | 'no_allergies'
  | 'no_medications'
  | 'no_disease'
  | 'empty_input';

/**
 * Builds an appropriate polite fallback response matching the patient's sex and speech style.
 */
export function buildFallbackResponse(caseDef: CaseDefinition, type: FallbackType): string {
  const isMale = caseDef.patientProfile.sex === 'male';
  const particle = isMale ? 'ครับ' : 'ค่ะ';
  const politeParticle = isMale ? 'ครับผม' : 'ค่ะ';
  const selfPronoun = isMale ? 'ผม' : 'ดิฉัน';

  switch (type) {
    case 'rapport':
      return `สวัสดี${particle}คุณหมอ ${selfPronoun}พร้อมให้ข้อมูลอาการแล้ว${particle} คุณหมอสอบถามได้เลย${particle}`;

    case 'unknown':
      return `ขอโทษด้วย${particle} พอดี${selfPronoun}ไม่ค่อยแน่ใจว่าคุณหมอหมายถึงอาการตรงส่วนไหน ช่วยถามเจาะจงอีกนิดได้ไหม${particle}`;

    case 'not_sure':
      return `เรื่องนี้${selfPronoun}ไม่ค่อยแน่ใจเลย${particle} ไม่ได้สังเกตตัวเองชัดเจนเท่าไหร่`;

    case 'no_issues':
      return `เรื่องนี้สังเกตแล้วปกติดี${particle} ไม่ได้มีอาการผิดปกติอะไร`;

    case 'no_allergies':
      return `ไม่มีประวัติแพ้อะไรเลย${particle} ทานอาหารและใช้ยาได้ตามปกติ`;

    case 'no_medications':
      return `ช่วงนี้ไม่ได้ทานยาอะไรเป็นประจำเลย${particle} นานๆ ทีถ้ามีอาการถึงจะกินยาสามัญประจำบ้าน`;

    case 'no_disease':
      return `ไม่มีโรคประจำตัวร้ายแรง${particle} ตรวจสุขภาพทั่วไปก็ยังปกติดี`;

    case 'empty_input':
      return `คุณหมอมีอะไรอยากสอบถาม${selfPronoun}เพิ่มเติมไหม${particle}`;

    default:
      return `เรื่องนี้${selfPronoun}ไม่มีข้อมูลอะไรผิดปกติ${particle}`;
  }
}
