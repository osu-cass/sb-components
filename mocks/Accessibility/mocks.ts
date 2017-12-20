import {
  AccResourceGroupModel,
  AccessibilityResourceModel,
  DropDownSelectionModel,
  DropdownProps,
  ItemAccessibilityModalProps
} from "src";
import { action } from "@storybook/addon-actions";

export const accessibilityNotepad: AccessibilityResourceModel = {
  resourceCode: "DigitalNotepad",
  currentSelectionCode: "TDS_SCNotepad",
  order: 1,
  defaultSelection: "TDS_SCNotepad",
  disabled: false,
  description: "Digital Notepad",
  label: "Digital Notepad",
  selections: [
    {
      selectionCode: "TDS_SCNotepad",
      label: "Notepad on",
      order: 1,
      disabled: false,
      hidden: false
    },
    {
      selectionCode: "TDS_SC0",
      label: "Notepad off",
      order: 2,
      disabled: false,
      hidden: false
    },
    {
      selectionCode: "TDS_SC9",
      label: "Notepad disabled",
      order: 3,
      disabled: true,
      hidden: false
    }
  ]
};

export const accessibilityEnglishGlossary: AccessibilityResourceModel = {
  resourceCode: "EnglishGlossary",
  currentSelectionCode: "TDS_WL_0",
  order: 1,
  defaultSelection: "TDS_WL_Glossary",
  disabled: false,
  description: "English Glossary",
  label: "English Glossary",
  selections: [
    {
      selectionCode: "TDS_WL_Glossary",
      label: "English Glossary on",
      order: 1,
      disabled: false,
      hidden: false
    },
    {
      selectionCode: "TDS_WL_0",
      label: "English Glossary off",
      order: 2,
      disabled: false,
      hidden: false
    }
  ]
};

export const mockAccGroup: AccResourceGroupModel = {
  label: "Universal Tools",
  order: 1,
  accessibilityResources: [accessibilityNotepad, accessibilityEnglishGlossary]
};

export const mockAccResourceGroups: AccResourceGroupModel[] = [mockAccGroup];

export const accessibilityModalProp: ItemAccessibilityModalProps = {
  accResourceGroups: [],
  onSave: action("Saved Selections"),
  onReset: action("Reset clicked")
};

export const dropDefaultProp: DropdownProps = {
  disabled: false,
  label: "Notepad",
  selections: accessibilityNotepad.selections,
  defaultSelection: accessibilityNotepad.defaultSelection,
  updateSelection: action("Updated Selection"),
  selectionCode: accessibilityNotepad.currentSelectionCode,
  resourceCode: "Default"
};

export const dropDisabledAllSelectionsProp: DropdownProps = {
  ...dropDefaultProp,
  updateSelection: action("Updated Selection"),
  selections: dropDefaultProp.selections.map(s => {
    return { ...s, disabled: true };
  })
};

export const dropDisabledProp: DropdownProps = {
  ...dropDefaultProp,
  disabled: true,
  updateSelection: action("Updated Selection"),
  selections: dropDefaultProp.selections.map(s => {
    return { ...s, disabled: true };
  })
};
