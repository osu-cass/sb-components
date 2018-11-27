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
  revision?: string;
  isaap?: string;
  valid?: boolean;
  error?: string;
}

export interface ItemExistsRequestModel {
  namespace: string;
  bankKey?: string;
  itemKey: string;
}

export interface ItemExistsResponseModel extends ItemExistsRequestModel {
  exists: boolean;
  error?: string;
}

export function itemsAreEqual(
  left: ItemRevisionModel | undefined,
  right: ItemRevisionModel | undefined
) {
  return (
    left &&
    right &&
    left.itemKey === right.itemKey &&
    left.bankKey === right.bankKey &&
    left.namespace === right.namespace
  );
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

export function toExistenceRequestModel(
  items: ItemRevisionModel[]
): ItemExistsRequestModel[] {
  const requestModel: ItemExistsRequestModel[] = [];
  items.forEach(item => {
    if (item.itemKey && item.namespace) {
      requestModel.push({
        namespace: item.namespace,
        itemKey: item.itemKey.toString(),
        bankKey: item.bankKey ? item.bankKey.toString() : undefined
      });
    }
  });

  return requestModel;
}

export function existenceResponseModelToRevisionModel(
  currentItems: ItemRevisionModel[],
  responseModel: ItemExistsResponseModel[]
): ItemRevisionModel[] {
  const itemList: ItemRevisionModel[] = [];
  currentItems.map((item, index) => {
    const match: ItemExistsResponseModel | undefined = responseModel.find(res =>
      responseIsEqual(res, item)
    );
    if (match) {
      item.valid = match.exists;
      item.error = match.error;
    }

    return item;
  });

  return currentItems;
}

function responseIsEqual(
  res: ItemExistsResponseModel,
  item: ItemRevisionModel
): boolean {
  let areEqual: boolean =
    res.namespace === item.namespace &&
    item.itemKey !== undefined &&
    res.itemKey === item.itemKey.toString();
  if (
    (item.bankKey && res.bankKey === item.bankKey.toString()) ||
    (!item.bankKey && !res.bankKey)
  ) {
    areEqual = areEqual && true;
  } else {
    areEqual = false;
  }

  return areEqual;
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
  return `${itemRevisionModel.bankKey}-${itemRevisionModel.itemKey}`;
}

export function validItemRevisionModel(itemRevisionModel?: ItemRevisionModel) {
  let value = false;
  if (
    itemRevisionModel &&
    itemRevisionModel.namespace &&
    itemRevisionModel.itemKey
  ) {
    value = true;

    if (itemRevisionModel.hasBankKey && !itemRevisionModel.bankKey) {
      value = false;
    }
  }

  return value;
}

export function isEmptyRevision(item: ItemRevisionModel): boolean {
  return !item.bankKey && !item.itemKey && !item.namespace;
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
  namespace?: string;
  itemKey?: string;
  bankKey?: string;
  brailleType?: string;
}

export function findNamespace(namespace: string, namespaces: NamespaceModel[]) {
  return namespaces.find(s => s.name.toLowerCase() === namespace.toLowerCase());
}
