import { DropDownSelectionModel } from "../DropDown/DropDownModels";

export interface AccessibilityResourceModel {
  resourceCode: string; // ID for this resource
  defaultSelection: string;
  description: string;
  disabled: boolean;
  label: string;
  currentSelectionCode: string; // ID of the current selection
  order: number;
  selections: DropDownSelectionModel[];
}

export interface AccResourceGroupModel {
  label: string;
  order: number;
  accessibilityResources: AccessibilityResourceModel[];
}

export interface ResourceSelectionsModel {
  [resourceName: string]: string;
}

export function getResource(
  resourceCode: string,
  resourceGroups: AccResourceGroupModel[]
): AccessibilityResourceModel | undefined {
  let resource;
  for (const accGroup of resourceGroups) {
    resource = accGroup.accessibilityResources.find(
      rg => rg.resourceCode === resourceCode
    );
    if (resource) {
      break;
    }
  }

  return resource ? resource : undefined;
}

export function getBrailleAccommodation(
  accResourceGroups: AccResourceGroupModel[]
): string {
  const brailleResource = getResource("BrailleType", accResourceGroups);
  if (brailleResource) {
    return brailleResource.currentSelectionCode;
  }

  return "";
}

export function isBrailleEnabled(
  accResourceGroups: AccResourceGroupModel[]
): boolean {
  return isResourceEnabled(accResourceGroups, "BrailleType");
}

export function isCalculatorEnabled(
  accResourceGroups: AccResourceGroupModel[]
): boolean {
  return isResourceEnabled(accResourceGroups, "Calculator");
}

export function isResourceEnabled(
  accResourceGroups: AccResourceGroupModel[],
  resourceCode: string
): boolean {
  const selectedCode = getResouceSelectedCode(resourceCode, accResourceGroups);
  if (selectedCode && !selectedCode.endsWith("0")) {
    return true;
  }

  return false;
}

export function getResouceSelectedCode(
  resourceCode: string,
  accResourceGroups: AccResourceGroupModel[]
): string | undefined {
  const resource = getResource(resourceCode, accResourceGroups);

  return resource ? resource.currentSelectionCode : undefined;
}

export function isStreamlinedEnabled(
  accResourceGroups: AccResourceGroupModel[]
): boolean {
  return isResourceEnabled(accResourceGroups, "StreamlinedInterface");
}

// Returns list of resource group labels, sorted ascending by AccResourceGroup.order
export function getResourceTypes(
  resourceGroups: AccResourceGroupModel[]
): string[] {
  return resourceGroups.map(t => t.label);
}

export function updateAccessibilityGroups(
  selections: ResourceSelectionsModel,
  accGroups: AccResourceGroupModel[]
): AccResourceGroupModel[] {
  const newGroups: AccResourceGroupModel[] = [];
  for (const group of accGroups) {
    const newGroup = { ...group };
    const newResources: AccessibilityResourceModel[] = [];
    for (const res of newGroup.accessibilityResources) {
      const newRes = { ...res };
      newRes.currentSelectionCode =
        selections[newRes.resourceCode] || newRes.currentSelectionCode;
      newResources.push(newRes);
    }
    newGroup.accessibilityResources = newResources;
    newGroups.push(newGroup);
  }

  return newGroups;
}
