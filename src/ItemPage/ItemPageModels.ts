import { AboutItemModel } from "../AboutItem/AboutItemModels";
import {
  AccessibilityResourceModel,
  AccResourceGroupModel,
  ResourceSelectionsModel
} from "../Accessibility/AccessibilityModels";
import { getRequest } from "../ApiModel";
import { DropDownSelectionModel } from "../DropDown/DropDownModels";
import { MoreLikeThisModel } from "../Modals/MoreLikeThisModels";

export interface ItemIdentifierModel extends ItemModel {
  itemName: string;
}

export interface ItemModel {
  bankKey: number;
  itemKey: number;
}

export interface ItemIsaapModel extends ItemModel {
  isaap?: string;
}

export interface ItemPageModel {
  itemViewerServiceUrl: string;
  itemNames: string;
  brailleItemNames: string;
  brailleItem: ItemIdentifierModel;
  nonBrailleItem: ItemIdentifierModel;
  accessibilityCookieName: string;
  isPerformanceItem: boolean;
  performanceItemDescription: string;
  subject: string;
  moreLikeThisVM: MoreLikeThisModel;
  brailleItemCodes: string[];
  braillePassageCodes: string[];
  defaultIsaapCodes: string;
}

export function toiSAAP(
  accResourceGroups: AccResourceGroupModel[],
  defaultIsaap: string = ""
): string {
  let isaapCodes = defaultIsaap;
  for (const group of accResourceGroups) {
    for (const res of group.accessibilityResources) {
      if (res.currentSelectionCode && !res.disabled) {
        isaapCodes += `${findSelection(res)};`;
      }
    }
  }

  return encodeURIComponent(isaapCodes);
}

function findSelection(resource: AccessibilityResourceModel) {
  let selectionCode: String;
  const currentSelection = resource.selections.filter(
    s => s.selectionCode === resource.currentSelectionCode
  );
  if (currentSelection[0] && currentSelection[0].disabled) {
    selectionCode = resource.defaultSelection;
  } else {
    selectionCode = resource.currentSelectionCode;
  }

  return selectionCode;
}

export function resetResource(
  model: AccessibilityResourceModel
): AccessibilityResourceModel {
  const newModel = { ...model };
  newModel.currentSelectionCode = model.defaultSelection;

  return newModel;
}

export function trimAccResource(
  resource: AccessibilityResourceModel
): { label: string; selectedCode: string } {
  return {
    label: resource.label,
    selectedCode: resource.currentSelectionCode
  };
}

export function toCookie(accGroups: AccResourceGroupModel[]): string {
  const prefs: ResourceSelectionsModel = {};
  for (const group of accGroups) {
    for (const resource of group.accessibilityResources) {
      prefs[resource.resourceCode] = resource.currentSelectionCode;
    }
  }

  const json = JSON.stringify(prefs);

  return btoa(json);
}

export const aboutThisItemViewModelClient = (params: ItemModel) =>
  getRequest<AboutItemModel>("/Item/AboutThisItemViewModel", params);

export const itemPageClient = (params: ItemModel) =>
  getRequest<ItemPageModel>("/Item/GetItem", params);

export const itemAccessibilityClient = (params: ItemIsaapModel) =>
  getRequest<AccResourceGroupModel[]>("/Item/ItemAccessibility", params);
