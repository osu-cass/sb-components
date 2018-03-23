import {
  ItemModel,
  AboutItemRevisionModel,
  GradeLevel,
  RevisionModel
} from "@src/index";

export interface ItemRevisionModel {
  itemKey?: number;
  bankKey?: number;
  section?: string;
  revision?: string;
  isaap?: string;
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

export function getItemBankIndex(
  currentItem: ItemRevisionModel,
  items: ItemRevisionModel[]
) {
  const key = itemRevisionKey(currentItem);

  return items.findIndex(it => itemRevisionKey(it) === key);
}

export function getNextItemBank(
  currentItem: ItemRevisionModel,
  items: ItemRevisionModel[]
): ItemRevisionModel | undefined {
  const currentIdx = getItemBankIndex(currentItem, items);
  let nextItem: ItemRevisionModel | undefined;

  const nextIdx = currentIdx + 1;
  if (
    nextIdx >= 0 &&
    nextIdx < items.length &&
    validItemRevisionModel(items[nextIdx])
  ) {
    nextItem = items[nextIdx];
  }

  return nextItem;
}

export function getPreviousItemBank(
  currentItem: ItemRevisionModel,
  items: ItemRevisionModel[]
): ItemRevisionModel | undefined {
  let previousItem: ItemRevisionModel | undefined;
  const currentIdx = getItemBankIndex(currentItem, items);

  const prevIdx = currentIdx - 1;
  if (prevIdx >= 0 && validItemRevisionModel(items[prevIdx])) {
    previousItem = items[prevIdx];
  }

  return previousItem;
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
