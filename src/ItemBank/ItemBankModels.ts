import { ItemModel, AboutItemRevisionModel, GradeLevel } from "../index";
import { RevisionModel } from "../Revisions/Revision";

export interface ItemRevisionModel {
  itemKey?: number;
  bankKey?: number;
  section?: string;
  revision?: string;
}

export function getItemBankName(itemRevisionModel: ItemRevisionModel) {
  let value = "";
  if (itemRevisionModel.bankKey && itemRevisionModel.itemKey) {
    value = `${itemRevisionModel.bankKey}-${itemRevisionModel.itemKey}`;
  }

  return value;
}

export function itemRevisionKey(itemRevisionModel: ItemRevisionModel) {
  return `${itemRevisionModel.bankKey}-${itemRevisionModel.itemKey}-${
    itemRevisionModel.section
  }`;
}

export function validItemRevisionModel(itemRevisionModel: ItemRevisionModel) {
  let value = false;
  if (
    itemRevisionModel.itemKey &&
    itemRevisionModel.bankKey &&
    itemRevisionModel.section
  ) {
    value = true;
  }

  return value;
}

export interface SectionModel {
  key: string;
  value: string;
}

export interface AccessibilityRevisionModel {
  gradeLevel: GradeLevel;
  subject: string;
  interactionType: string;
  allowCalculator?: boolean;
  isPerformance?: boolean;
}
