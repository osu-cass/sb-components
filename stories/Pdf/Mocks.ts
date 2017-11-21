import { RubricModel } from "../../src/Rubric/RubricModels";

export const rubric: RubricModel = {
    language: "en-us",
    rubricEntries: [
        {
            scorepoint: "0",
            name: "No points",
            value: "Student did not do the problem"
        },
        {
            scorepoint: "1",
            name: "Half points",
            value: "Student tried to do the problem, but got it wrong"
        },
        {
            scorepoint: "2",
            name: "No points",
            value: "Student did the problem correctly"
        }
    ],
    samples: [
        {
            maxValue: "0",
            minValue: "0",
            sampleResponses: [
                {
                    purpose: "idk",
                    scorePoint: "0",
                    name: "0pts",
                    sampleContent: "5 + 6 = _"
                }
            ]
        },
        {
            maxValue: "1",
            minValue: "1",
            sampleResponses: [
                {
                    purpose: "idk",
                    scorePoint: "1",
                    name: "1pt",
                    sampleContent: "5 + 6 = 56"
                }
            ]
        },
        {
            maxValue: "2",
            minValue: "2",
            sampleResponses: [
                {
                    purpose: "idk",
                    scorePoint: "2",
                    name: "2pts",
                    sampleContent: "5 + 6 = 11"
                }
            ]
        }
    ]
}

export const rubricNoSamples: RubricModel = {
    language: "en-us",
    rubricEntries: [
        {
            scorepoint: "0",
            name: "No points",
            value: "Student did not do the problem"
        },
        {
            scorepoint: "1",
            name: "Half points",
            value: "Student tried to do the problem, but got it wrong"
        },
        {
            scorepoint: "2",
            name: "No points",
            value: "Student did the problem correctly"
        }
    ],
    samples: []
}
