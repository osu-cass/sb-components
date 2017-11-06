import { OptionType, AdvancedFilterCategory } from '@osu-cass/react-advanced-filter'

export const mockAdvancedFilterCategories: AdvancedFilterCategory[] = [
    {
        "disabled": false,
        "isMultiSelect": false,
        "helpText": "Grade HelpText here.",
        "label": "Grades",
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
        "displayAllButton":true
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
                "isSelected": false
            },
            {
                "label": "English",
                "key": "ELA",
                "isSelected": false
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
                "isSelected": false
            },
            {
                "label": "Performance Items",
                "key": "PT",
                "isSelected": false
            }
        ],
        "displayAllButton": true
    }
];
