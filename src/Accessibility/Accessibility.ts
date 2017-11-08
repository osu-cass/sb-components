import * as Dropdown from '../DropDown/DropDown';

export interface AccessibilityResource {
    resourceCode: string; // ID for this resource
    defaultSelection: string;
    description: string;
    disabled: boolean;
    label: string;
    currentSelectionCode: string; // ID of the current selection
    order: number;
    selections: Dropdown.Selection[];
}

export interface AccResourceGroup {
    label: string;
    order: number;
    accessibilityResources: AccessibilityResource[];
}

export function getResource(resourceCode: string, resourceGroups: AccResourceGroup[]): AccessibilityResource | null {
    for (let accGroup of resourceGroups) {
        const resource = accGroup.accessibilityResources.find(rg => rg.resourceCode == resourceCode);
        if (resource) {
            return resource;
        }
    }

    return null;
}

export function getBrailleAccommodation(accResourceGroups: AccResourceGroup[]): string {
    const brailleResource = getResource("BrailleType", accResourceGroups);
    if (brailleResource) {
        return brailleResource.currentSelectionCode;
    }

    return "";
}

export function isBrailleEnabled(accResourceGroups: AccResourceGroup[]): boolean {
    const brailleResource = getResource("BrailleType", accResourceGroups);
    if (brailleResource && !brailleResource.currentSelectionCode.endsWith("0")) {
        return true;
    }

    return false;
}

export function isStreamlinedEnabled(accResourceGroups: AccResourceGroup[]): boolean {
    const resource = getResource("StreamlinedInterface", accResourceGroups);
    if (resource && !resource.currentSelectionCode.endsWith("0")) {
        return true;
    }

    return false;
}

// Returns list of resource group labels, sorted ascending by AccResourceGroup.order
export function getResourceTypes(resourceGroups: AccResourceGroup[]): string[] {
    let resourceTypes = resourceGroups.map(t => t.label);
    return resourceTypes;
}

export interface ResourceSelections {
    [resourceName: string]: string;
}
