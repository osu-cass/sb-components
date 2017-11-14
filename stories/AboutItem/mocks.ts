import { AboutItemModel } from "../../src/index";
import {GradeLevels} from "../../src/GradeLevels/GradeLevels";

export const AboutItemMockProps: AboutItemModel = {
    rubrics: [{
        language: "english",
        rubricEntries: [{
            scorepoint: "scorepoint",
            name: "Item",
            value: "value"
        }],
        samples: [{
            maxValue: "100",
            minValue: "0",
            sampleResponses: [{
                purpose: "testing",
                scorePoint: "scorepoint",
                name: "Rubric",
                sampleContent: "some sample content"
            }]
        }]
    }],
    itemCardViewModel: {
        bankKey: 1,
        itemKey: 4,
        title: "Rubric Test",
        grade: GradeLevels.All,
        gradeLabel: "All",
        subjectCode: "math",
        subjectLabel: "math",
        claimCode: "12345",
        claimLabel: "12345-label",
        targetHash: "nd754k27c",
        targetShortName: "mth",
        interactionTypeCode: "typeCode",
        interactionTypeLabel: "typeLabel"
    },
    depthOfKnowledge: "very deep",
    targetDescription: "mathematics",
    commonCoreStandardsDescription: "common math"
};
