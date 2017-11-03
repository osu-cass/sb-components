import { OptionType, BasicFilterCategory } from '@osu-cass/react-advanced-filter'

export const mockBasicFilterCategories: BasicFilterCategory[] = [
    {
        "disabled": false,
        "label": "Grades",
        "filterOptions": [
            {
                "label": "All",
                "key": "1023",
                "isSelected": false
            },
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
        "disabled": false,
        "label": "Subjects",
        "filterOptions": [
            //{
            //    "label": "All",
            //    "key": "",
            //    "isSelected": false
            //},
            {
                "label": "Math",
                "key": "MATH",
                "isSelected": false
            },
            {
                "label": "English",
                "key": "ELA",
                "isSelected": false
            }
        ],
        "type": OptionType.radioBtn
    },
    {
        "disabled": false,
        "label": "TechType",
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
        "type": OptionType.radioBtn
    }
];
