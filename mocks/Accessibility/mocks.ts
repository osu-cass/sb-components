import {
  AccResourceGroupModel,
  AccessibilityResourceModel,
  DropDownSelectionModel,
  DropdownProps,
  ItemAccessibilityModalProps
} from "@src/index";
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

export const allAccessibilityResourceGroups: AccResourceGroupModel[] = [
  {
    label: "Universal Tools",
    order: 0,
    accessibilityResources: [
      {
        resourceCode: "DigitalNotepad",
        currentSelectionCode: "TDS_SCNotepad",
        order: 1,
        defaultSelection: "TDS_SCNotepad",
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
          }
        ],
        label: "Digital Notepad",
        description:
          "This tool is used for making notes about an item. The digital notepad is item specific and is available through the end of the test segment. Notes are not saved when the student moves on to the next segment or after a break of more than 20 minutes. (EMBEDDED)",
        disabled: false
      },
      {
        resourceCode: "EnglishGlossary",
        currentSelectionCode: "TDS_WL_Glossary",
        order: 2,
        defaultSelection: "TDS_WL_Glossary",
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
        ],
        label: "English Glossary",
        description:
          "Grade and context-appropriate definitions of specific construct-irrelevant terms are shown in English on the screen via a pop-up window. The student can access the embedded glossary by clicking on any of the pre-selected terms. The use of this accommodation may result in the student needing additional overall time to complete the assessment. (EMBEDDED)",
        disabled: false
      },
      {
        resourceCode: "Highlighter",
        currentSelectionCode: "TDS_Highlight1",
        order: 3,
        defaultSelection: "TDS_Highlight1",
        selections: [
          {
            selectionCode: "TDS_Highlight1",
            label: "Highlight on",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_Highlight0",
            label: "Highlight off",
            order: 2,
            disabled: false,
            hidden: false
          }
        ],
        label: "Highlighter",
        description:
          "A digital tool for marking desired text, item questions, item answers, or parts of these with a color. Highlighted text remains available throughout each test segment. (EMBEDDED)",
        disabled: false
      },
      {
        resourceCode: "Calculator",
        currentSelectionCode: "TDS_Calc0",
        order: 14,
        defaultSelection: "TDS_Calc0",
        selections: [
          {
            selectionCode: "TDS_CalcBasic",
            label: "Basic Calculator",
            order: 1,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_Calc0",
            label: "Off",
            order: 2,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_CalcSciInv&TDS_CalcGraphingInv&TDS_CalcRegress",
            label: "Scientific, Graphing & Regression Calculator",
            order: 3,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_CalcSciInv",
            label: "Scientific Calculator",
            order: 4,
            disabled: true,
            hidden: false
          }
        ],
        label: "Calculator",
        description:
          "An on-screen digital calculator can be accessed for calculator-allowed items when students click on the calculator button. This tool is available only with the specific items for which the Smarter Balanced Item Specificationsindicated that it would be  appropriate. When the embedded calculator, as presented for all students, is not appropriate for a student (for example, for a student who is blind), the student may use the calculator offered with assistive technology devices (such as a talking calculator or a braille calculator). (EMBEDDED)",
        disabled: true
      },
      {
        resourceCode: "EnglishDictionary",
        currentSelectionCode: "TDS_Dict_SD2",
        order: 16,
        defaultSelection: "TDS_Dict_SD2",
        selections: [
          {
            selectionCode: "TDS_Dict_SD2",
            label: "On",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_Dict_SD3",
            label: "Merriam Webster Intermediate Dictionary on",
            order: 1,
            disabled: true,
            hidden: true
          },
          {
            selectionCode: "TDS_Dict_SD4",
            label: "Merriam Websters School Dictionary on",
            order: 1,
            disabled: true,
            hidden: true
          },
          {
            selectionCode: "TDS_Dict0",
            label: "Off",
            order: 2,
            disabled: false,
            hidden: false
          }
        ],
        label: "English Dictionary",
        description:
          "An English dictionary may be available for the full write portion of an ELA performance task, pending contractual discussions. A full write is the second part of a performance task. The use of this universal tool may result in the student needing additional overall time to complete the assessment.",
        disabled: false
      },
      {
        resourceCode: "ExpandablePassages",
        currentSelectionCode: "TDS_ExpandablePassages1",
        order: 18,
        defaultSelection: "TDS_ExpandablePassages1",
        selections: [
          {
            selectionCode: "TDS_ExpandablePassages1",
            label: "Expandable Passages on",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_ExpandablePassages0",
            label: "Expandable Passages off",
            order: 2,
            disabled: false,
            hidden: false
          }
        ],
        label: "Expandable Passages",
        description:
          "Each passage or stimulus can be expanded so that it takes up a larger portion of the screen. (EMBEDDED)",
        disabled: false
      },
      {
        resourceCode: "GlobalNotes",
        currentSelectionCode: "TDS_GN1",
        order: 19,
        defaultSelection: "TDS_GN1",
        selections: [
          {
            selectionCode: "TDS_GN1",
            label: "Global Notes on",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_GN0",
            label: "Global Notes off",
            order: 2,
            disabled: false,
            hidden: false
          }
        ],
        label: "Global Notes",
        description:
          "Global notes is a notepad that is available for ELA performance tasks in which students complete a full write. A full write is the second part of a performance task. The student clicks on the notepad icon for the notepad to appear. During the ELA performance tasks, the notes are retained from segment to segment so that the student may go back to the notes even though the student is not able to go back to specific items in the previous segment. (EMBEDDED)",
        disabled: false
      },
      {
        resourceCode: "Strikethrough",
        currentSelectionCode: "TDS_ST1",
        order: 25,
        defaultSelection: "TDS_ST1",
        selections: [
          {
            selectionCode: "TDS_ST1",
            label: "Strikethrough on",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_ST0",
            label: "Strikethrough off",
            order: 2,
            disabled: false,
            hidden: false
          }
        ],
        label: "Strikethrough",
        description:
          "Allows users to cross out answer options. If an answer option is an image, a strikethrough line will not appear, but the image will be grayed out. (EMBEDDED)",
        disabled: false
      },
      {
        resourceCode: "Thesaurus",
        currentSelectionCode: "TDS_TH_TA",
        order: 29,
        defaultSelection: "TDS_TH_TA",
        selections: [
          {
            selectionCode: "TDS_TH_TA",
            label: "On",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_TH0",
            label: "Off",
            order: 2,
            disabled: false,
            hidden: false
          }
        ],
        label: "Thesaurus",
        description:
          "A thesaurus contains synonyms of terms while a student interacts with text included in the assessment. A full write is the second part of a performance task. The use of this universal tool may result in the student needing additional overall time to complete the assessment.",
        disabled: false
      },
      {
        resourceCode: "PrintSize",
        currentSelectionCode: "TDS_PS_L0",
        order: 99,
        defaultSelection: "TDS_PS_L0",
        selections: [
          {
            selectionCode: "TDS_PS_L0",
            label: "No Default Zoom Applied",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_PS_L1",
            label: "Level 1",
            order: 2,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_PS_L2",
            label: "Level 2",
            order: 3,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_PS_L3",
            label: "Level 3",
            order: 4,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_PS_L4",
            label: "Level 4",
            order: 5,
            disabled: false,
            hidden: false
          }
        ],
        label: "Zoom",
        description: "",
        disabled: false
      }
    ]
  },
  {
    label: "Designated Supports",
    order: 1,
    accessibilityResources: [
      {
        resourceCode: "ColorContrast",
        currentSelectionCode: "TDS_CCMagenta",
        order: 5,
        defaultSelection: "TDS_CC0",
        selections: [
          {
            selectionCode: "TDS_CC0",
            label: "Black on White",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_CCInvert",
            label: "Reverse Contrast",
            order: 2,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_CCMagenta",
            label: "Black on Rose",
            order: 3,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_CCMedGrayLtGray",
            label: "Medium Gray on Light Gray",
            order: 4,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_CCYellowB",
            label: "Yellow on Blue",
            order: 5,
            disabled: false,
            hidden: false
          }
        ],
        label: "Color Choices",
        description:
          "Students with attention difficulties may need this support for viewing the test when digitally- provided color contrasts do not meet their needs. Some students with visual impairments or other print disabilities (including learning disabilities) also may need this support. Choice of colors should be informed by evidence of those colors that meet the student’s needs. Enable students to adjust screen background or font color, based on student needs or preferences. This may include reversing the colors for the entire interface or choosing the color of font and background. (EMBEDDED)",
        disabled: false
      },
      {
        resourceCode: "Masking",
        currentSelectionCode: "TDS_Masking1",
        order: 6,
        defaultSelection: "TDS_Masking0",
        selections: [
          {
            selectionCode: "TDS_Masking0",
            label: "Masking Not Available",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_Masking1",
            label: "Masking Available",
            order: 2,
            disabled: false,
            hidden: false
          }
        ],
        label: "Masking",
        description:
          "Students with attention difficulties may need to mask content not of immediate need or that may be distracting during the assessment. This support also may be needed by students with print disabilities (including learning disabilities) or visual impairments. Masking allows students to hide and reveal individual answer options, as well as all navigational buttons and menus. (EMBEDDED)",
        disabled: false
      },
      {
        resourceCode: "Translation",
        currentSelectionCode: "TDS_WL_0",
        order: 7,
        defaultSelection: "TDS_WL_0",
        selections: [
          {
            selectionCode: "TDS_WL_0",
            label: "None",
            order: 1,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_WL_ArabicGloss",
            label: "Arabic",
            order: 2,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_WL_CantoneseGloss",
            label: "Cantonese",
            order: 3,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_WL_ESNGlossary",
            label: "Spanish",
            order: 4,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_WL_KoreanGloss",
            label: "Korean",
            order: 5,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_WL_MandarinGloss",
            label: "Mandarin",
            order: 6,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_WL_PunjabiGloss",
            label: "Punjabi",
            order: 7,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_WL_RussianGloss",
            label: "Russian",
            order: 8,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_WL_TagalGloss",
            label: "Filipino (Ilokano and Tagalog)",
            order: 9,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_WL_UkrainianGloss",
            label: "Ukrainian",
            order: 10,
            disabled: true,
            hidden: false
          },
          {
            selectionCode: "TDS_WL_VietnameseGloss",
            label: "Vietnamese",
            order: 11,
            disabled: true,
            hidden: false
          }
        ],
        label: "Translations (Glossaries)",
        description:
          "Students who have limited English language skills (whether or not designated as ELLs or ELLs with disabilities) can use the translation glossary for specific items. The use of this support may result in the student needing additional overall time to complete the assessment. Use of this support will likely also require separate setting or extra time. (EMBEDDED)",
        disabled: true
      },
      {
        resourceCode: "Language",
        currentSelectionCode: "ENU",
        order: 8,
        defaultSelection: "ENU",
        selections: [
          {
            selectionCode: "ENU",
            label: "English",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "ESN",
            label: "Spanish & English",
            order: 2,
            disabled: true,
            hidden: false
          }
        ],
        label: "Translations (Stacked)",
        description: "",
        disabled: false
      }
    ]
  },
  {
    label: "Accommodations",
    order: 3,
    accessibilityResources: [
      {
        resourceCode: "AmericanSignLanguage",
        currentSelectionCode: "TDS_ASL0",
        order: 9,
        defaultSelection: "TDS_ASL0",
        selections: [
          {
            selectionCode: "TDS_ASL0",
            label: "ASL Videos off",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_ASL1",
            label: "ASL Videos on",
            order: 2,
            disabled: false,
            hidden: false
          }
        ],
        label: "American Sign Language",
        description:
          "Some students who are deaf or hard of hearing and who typically use ASL may need this accommodation when accessing text-based content in the assessment. The use of this accommodation may result in the student needing additional overall time to complete the assessment. For many students who are deaf or hard of hearing, viewing signs is the only way to access information presented orally. It is important to note, however, that some students who are hard of hearing will be able to listen to information presented orally if provided with appropriate amplification and a setting in which extraneous sounds do not interfere with clear presentation of the audio presentation in a listening test. (EMBEDDED)",
        disabled: false
      },
      {
        resourceCode: "BrailleType",
        currentSelectionCode: "TDS_BT0",
        order: 10,
        defaultSelection: "TDS_BT0",
        selections: [
          {
            selectionCode: "TDS_BT0",
            label: "No Braille",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_BT_ECL",
            label: "EBAE Contracted",
            order: 2,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_BT_EXL",
            label: "EBAE Uncontracted",
            order: 3,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_BT_ECN",
            label: "EBAE Contracted with Nemeth",
            order: 4,
            disabled: true,
            hidden: false
          }
        ],
        label: "Braille Type",
        description:
          "Students with visual impairments may read text via braille. Tactile overlays and graphics also may be used to assist the student in accessing content through touch. Refreshable braille is available only for ELA because Nemeth Code is not available via refreshable braille. For math, braille will be presented via embosser; embosser-created braille can be used for ELA also. The type of braille presented to the student (contracted or non-contracted) is set in TIDE, or state’s comparable platform. The use of this accommodation may result in the student needing additional overall time to complete the assessment. (EMBEDDED)",
        disabled: false
      },
      {
        resourceCode: "ClosedCaptioning",
        currentSelectionCode: "TDS_ClosedCap0",
        order: 11,
        defaultSelection: "TDS_ClosedCap0",
        selections: [
          {
            selectionCode: "TDS_ClosedCap0",
            label: "Closed Captioning off",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_ClosedCap1",
            label: "Closed Captioning on",
            order: 2,
            disabled: false,
            hidden: false
          }
        ],
        label: "Closed Captioning",
        description:
          '\n          Students who are deaf or hard of hearing and who typically access information presented via audio by reading words that appear in synchrony with the audio presentation may need this support to access audio content. For many students who are deaf or hard of hearing, viewing words (sometimes in combination with reading lips and ASL) is how they access information presented orally. It is important to note, however, that some students who are hard of hearing will be able to listen to information presented orally if provided with appropriate amplification and a setting in which extraneous sounds do not interfere with clear presentation of the audio presentation in a listening test. (EMBEDDED)",\n          "options: [\n        ',
        disabled: false
      },
      {
        resourceCode: "StreamlinedInterface",
        currentSelectionCode: "TDS_SLM0",
        order: 12,
        defaultSelection: "TDS_SLM0",
        selections: [
          {
            selectionCode: "TDS_SLM0",
            label: "Standard",
            order: 1,
            disabled: false,
            hidden: false
          },
          {
            selectionCode: "TDS_SLM1",
            label: "Streamlined",
            order: 2,
            disabled: false,
            hidden: false
          }
        ],
        label: "Streamlined Interface",
        description:
          "Layout with stimulus displayed above and items displayed below. All tool and navigation buttons are on the bottom of the screen. Important: The streamlined interface is not intended to be tablet compatible.",
        disabled: false
      }
    ]
  }
];

const accessibilityManyOptions: AccResourceGroupModel[] = [];
allAccessibilityResourceGroups.forEach(s => {
  accessibilityManyOptions.push(s);
  if (s.label === "Accommodations") {
    s.accessibilityResources.push(s.accessibilityResources[0]);
    s.accessibilityResources.push(s.accessibilityResources[0]);
  }
});

export const accessibilityManyOptionsMock: AccResourceGroupModel[] = accessibilityManyOptions;

export const accessibilityManyOptionsInfoMock: AccResourceGroupModel[] = accessibilityManyOptions;
accessibilityManyOptionsInfoMock[0].accessibilityResources[0].infoTag =
  "This is a test";
