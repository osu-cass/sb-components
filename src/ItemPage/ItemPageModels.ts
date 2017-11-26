import { AboutItemModel } from "../AboutItem/AboutItemModels";
import {
  AccessibilityResourceModel,
  AccResourceGroupModel,
  ResourceSelectionsModel
} from "../Accessibility/AccessibilityModels";
import { get } from "../ApiModel";
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
  defaultIsaap: string
): string {
  let isaapCodes = defaultIsaap;
  for (const group of accResourceGroups) {
    for (const res of group.accessibilityResources) {
      if (res.currentSelectionCode && !res.disabled) {
        isaapCodes += res.currentSelectionCode + ";";
      }
    }
  }

  return encodeURIComponent(isaapCodes);
}

export function resetResource(
  model: AccessibilityResourceModel
): AccessibilityResourceModel {
  const newModel = Object.assign({}, model);
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
  const cookie = btoa(json);
  return cookie;
}

export function addDisabledPlaceholder(
  resource: AccessibilityResourceModel
): AccessibilityResourceModel {
  if (resource.disabled) {
    const newSelection = { ...resource };
    const disabledOption: DropDownSelectionModel = {
      label: "Disabled for item",
      selectionCode: "",
      disabled: true,
      order: 0,
      hidden: false
    };
    newSelection.selections.push(disabledOption);
    newSelection.currentSelectionCode = "";
    return newSelection;
  }
  return resource;
  function readCookie(name: string): string | undefined {
    const cookie = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookie ? cookie.pop() : "";
  }
}

export const aboutThisItemViewModelClient = (params: ItemModel) =>
  get<AboutItemModel>("/Item/AboutThisItemViewModel", params);

export const itemPageClient = (params: ItemModel) =>
  get<ItemPageModel>("/Item/GetItem", params);

export const itemAccessibilityClient = (params: ItemIsaapModel) =>
  get<AccResourceGroupModel[]>("/Item/ItemAccessibility", params);
