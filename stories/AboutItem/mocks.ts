import { AboutItemModel, RubricModel } from "../../src";
import { completeItemCard } from "../ItemCard/mocks";
import { GradeLevels } from "../../src/GradeLevels/GradeLevels";

export const AboutItemMockModel: AboutItemModel = {
    depthOfKnowledge: "",
    targetDescription: "",
    commonCoreStandardsDescription: "",
    rubrics: [],
    itemCardViewModel: completeItemCard,
    educationalDifficulty: "",
    evidenceStatement: ""
}

//TODO: Add me
export const rubrics: RubricModel[] = [
    {
      language: 'English',
      rubricEntries: [
        {
          scorepoint: '2',
          name: '\n        Rubric 2',
          value: '<p style="">A response:</p><p style="">• Gives sufficient evidence of the ability to determine/summarize the theme/central idea/message, or to summarize what happens after or during a key event</p><p style="">• Includes specific examples/details that make clear reference to the text</p><p style="">• Adequately explains the theme/central idea/message or summary with clearly relevant information based on the text</p>'
        },
        {
          scorepoint: '1',
          name: '\n        Rubric 1',
          value: '<p style="">A response:</p><p style="">• Gives limited evidence of the ability to determine/summarize the theme/central idea/message, or to summarize what happens after or during a key event</p><p style="">• Includes vague/limited examples/details that make reference to the text</p><p style="">• Explains the theme/central idea/message or summary with vague/limited information based on the text</p>'
        },
        {
          scorepoint: '0',
          name: '\n        Rubric 0',
          value: '<p style="">A response:</p><p style="">• Gives no evidence of the ability to determine/summarize the theme/central idea/message, or to summarize what happens after or during a key event</p><p style="">OR</p><p style="">• Gives the theme/central idea/message or summary, but includes no examples or no examples/details that make reference to the text</p><p style="">OR</p><p style="">• Gives the theme/central idea/message or summary, but includes no explanation or no relevant information from the text</p>'
        }
      ],
      samples: []
    }
  ]
    

//TODO: Add me
export const rubricsEsn: RubricModel[] = [
    {
      language: 'Spanish',
      rubricEntries: [
        {
          scorepoint: '2',
          name: '\n        Rubric 2',
          value: '<p style="">A response:</p><p style="">• Gives sufficient evidence of the ability to determine/summarize the theme/central idea/message, or to summarize what happens after or during a key event</p><p style="">• Includes specific examples/details that make clear reference to the text</p><p style="">• Adequately explains the theme/central idea/message or summary with clearly relevant information based on the text</p>'
        },
        {
          scorepoint: '1',
          name: '\n        Rubric 1',
          value: '<p style="">A response:</p><p style="">• Gives limited evidence of the ability to determine/summarize the theme/central idea/message, or to summarize what happens after or during a key event</p><p style="">• Includes vague/limited examples/details that make reference to the text</p><p style="">• Explains the theme/central idea/message or summary with vague/limited information based on the text</p>'
        },
        {
          scorepoint: '0',
          name: '\n        Rubric 0',
          value: '<p style="">A response:</p><p style="">• Gives no evidence of the ability to determine/summarize the theme/central idea/message, or to summarize what happens after or during a key event</p><p style="">OR</p><p style="">• Gives the theme/central idea/message or summary, but includes no examples or no examples/details that make reference to the text</p><p style="">OR</p><p style="">• Gives the theme/central idea/message or summary, but includes no explanation or no relevant information from the text</p>'
        }
      ],
      samples: []
    }
  ]

//TODO: Add me
export const allRubrics: RubricModel[] = rubrics.concat(rubricsEsn)