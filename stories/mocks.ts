import { Props } from '../src/Filter/AdvancedFilter';
import { AdvancedFilterOption, OptionType, AdvancedFilterCategory } from '../src/Filter/AdvancedFilterModel';
import { action } from '@storybook/addon-actions';

export const mockAdvancedFilterCategories = [
    {
      "disabled": false,
      "isMultiSelect": false,
      "label": "Grade",
      "helpText": "Grade HelpText here.",
      "filterOptions": [
        {
          "label": "Elementary",
          "key": "7",
          "isSelected": false
        },
        {
          "label": "Grade 3",
          "key": "1",
          "isSelected": false
        },
        {
          "label": "Grade 4",
          "key": "2",
          "isSelected": false
        },
        {
          "label": "Grade 5",
          "key": "4",
          "isSelected": false
        },
        {
          "label": "Grade 6",
          "key": "8",
          "isSelected": false
        },
        {
          "label": "Grade 7",
          "key": "16",
          "isSelected": false
        },
        {
          "label": "Grade 8",
          "key": "32",
          "isSelected": false
        },
        {
          "label": "High",
          "key": "960",
          "isSelected": false
        }
      ],
      "displayAllButton": true
    },
    {
      "disabled": false,
      "isMultiSelect": false,
      "label": "Subjects",
      "helpText": "Subjects HelpText here.",
      "filterOptions": [
        {
          "label": "Mathematics",
          "key": "MATH",
          "isSelected": false,
          "type": 1
        },
        {
          "label": "English",
          "key": "ELA",
          "isSelected": false,
          "type": 1
        }
      ],
      "displayAllButton": true
    },
    {
      "disabled": false,
      "isMultiSelect": false,
      "label": "TechType",
      "helpText": "TechType HelpText here.",
      "filterOptions": [
        {
          "label": "CAT",
          "key": "CAT",
          "isSelected": false,
          "type": 1
        },
        {
          "label": "Performance Items",
          "key": "PT",
          "isSelected": false,
          "type": 1
        }
      ],
      "displayAllButton": false
    }
  ]

  export const mockBasicFilterCategories = [
    {
      "disabled":false,
      "label":"Grades",
      "filterOptions":[
        {
          "label": "Elementary",
          "key": "7",
          "isSelected": false
        },
        {
          "label": "Grade 3",
          "key": "1",
          "isSelected": false
        },
        {
          "label": "Grade 4",
          "key": "2",
          "isSelected": false
        },
        {
          "label": "Grade 5",
          "key": "4",
          "isSelected": false
        },
        {
          "label": "Grade 6",
          "key": "8",
          "isSelected": false
        },
        {
          "label": "Grade 7",
          "key": "16",
          "isSelected": false
        },
        {
          "label": "Grade 8",
          "key": "32",
          "isSelected": false
        },
        {
          "label": "High",
          "key": "960",
          "isSelected": false
        }
      ],
      "type": OptionType.DropDown
    },
    {
      "disabled":false,
      "label":"TechType",
      "filterOptions":[
        {
          "label": "CAT",
          "key": "CAT",
          "isSelected": false,
          "type": 1
        },
        {
          "label": "Performance Items",
          "key": "PT",
          "isSelected": false,
          "type": 1
        }
      ],
      "type": OptionType.radioBtn
    }
  ];

  
const advancedFilterOption: AdvancedFilterOption = {
    label: "Grade 3",
    key: "12345",
    isSelected: false
}

const advancedFilterCategory: AdvancedFilterCategory  = {
    disabled: false,
    isMultiSelect: false,
    label: "Grade 3",
    helpText: "Grade 3",
    filterOptions: [advancedFilterOption],
    displayAllButton: true
}

const selectedHandler = action("clicked filter");

export const advancedFilterOptionsArray: AdvancedFilterOption[] = [
  {...advancedFilterOption, label: "Grade 1", key: "12346"},
  {...advancedFilterOption, label: "Grade 2", key: "12347"},
  {...advancedFilterOption},
  {...advancedFilterOption, label: "Grade 4", key: "12348"}
]

export const advancedFilterProps: Props = {
    ...advancedFilterCategory,
    selectedHandler
}
