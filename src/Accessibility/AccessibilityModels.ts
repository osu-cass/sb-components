import { DropDownSelectionModel } from "src/DropDown/DropDownModels";

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

export function getResource(
  resourceCode: string,
  resourceGroups: AccResourceGroupModel[]
): AccessibilityResourceModel | null {
  for (const accGroup of resourceGroups) {
    const resource = accGroup.accessibilityResources.find(
      rg => rg.resourceCode == resourceCode
    );
    if (resource) {
      return resource;
    }
  }

  return null;
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
  const brailleResource = getResource("BrailleType", accResourceGroups);
  if (brailleResource && !brailleResource.currentSelectionCode.endsWith("0")) {
    return true;
  }

  return false;
}

export function isStreamlinedEnabled(
  accResourceGroups: AccResourceGroupModel[]
): boolean {
  const resource = getResource("StreamlinedInterface", accResourceGroups);
  if (resource && !resource.currentSelectionCode.endsWith("0")) {
    return true;
  }

  return false;
}

// Returns list of resource group labels, sorted ascending by AccResourceGroup.order
export function getResourceTypes(
  resourceGroups: AccResourceGroupModel[]
): string[] {
  const resourceTypes = resourceGroups.map(t => t.label);
  return resourceTypes;
}

export interface ResourceSelectionsModel {
  [resourceName: string]: string;
}
