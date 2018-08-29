import {
  ItemModel,
  AboutItemRevisionModel,
  GradeLevel,
  RevisionModel
} from "@src/index";

export interface ItemRevisionModel {
  itemKey?: number;
  bankKey?: number;
  hasBankKey?: boolean;
  namespace?: string;
  section?: string;
  revision?: string;
  isaap?: string;
  valid?: boolean;
}

export function getItemBankName(
  itemRevisionModel: ItemRevisionModel
): string | undefined {
  let value: string | undefined;
  if (itemRevisionModel.hasBankKey) {
    value = `${itemRevisionModel.bankKey}-${itemRevisionModel.itemKey}`;
  } else {
    value = `${itemRevisionModel.itemKey}`;
  }

  return value;
}

export function concatNamespaceWith(
  source: string | undefined,
  itemRevisionModel: ItemRevisionModel
): string | undefined {
  let value: string | undefined;
  if (itemRevisionModel.namespace) {
    value = `${itemRevisionModel.namespace}:${source}`;
  }

  return value;
}

export function itemRevisionKey(itemRevisionModel: ItemRevisionModel) {
  return `${itemRevisionModel.bankKey}-${itemRevisionModel.itemKey}-${
    itemRevisionModel.section
  }`;
}

export function validItemRevisionModel(itemRevisionModel?: ItemRevisionModel) {
  let value = false;
  if (
    itemRevisionModel &&
    itemRevisionModel.namespace &&
    itemRevisionModel.itemKey &&
    itemRevisionModel.section
  ) {
    value = true;

    if (itemRevisionModel.hasBankKey && !itemRevisionModel.bankKey) {
      value = false;
    }
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

export interface NamespaceModel {
  id: string;
  name: string;
  hasBankKey: boolean;
  bankKey: number;
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
  itemKey?: string;
  bankKey?: string;
  brailleType?: string;
}
