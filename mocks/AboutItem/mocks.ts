import {
  AboutItemModel,
  AboutItemRevisionModel,
  RubricModel,
  GradeLevels
} from "@src/index";
import { completeItemCard } from "@mocks/ItemCard/mocks";

export const rubricsWithSamples: RubricModel[] = [
  {
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
            sampleContent: "x = _"
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
            sampleContent: "x = 10 + 5 = 15"
          },
          {
            purpose: "idk",
            scorePoint: "1",
            name: "1pt",
            sampleContent: "x = 10 - 5 = a million"
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
            sampleContent: "x = 10 - 5 = 5"
          }
        ]
      }
    ]
  }
];

export const aboutItemMockModel: AboutItemModel = {
  depthOfKnowledge: "3",
  targetDescription: "Solve equations",
  commonCoreStandardsDescription: "A-123-BC",
  itemCardViewModel: completeItemCard,
  educationalDifficulty: "5",
  evidenceStatement: "This is a sample evidence statement",
  sampleItemScoring: {
    answerKey: "x = 5",
    hasMachineRubric: false,
    scoringOptions: [],
    rubrics: rubricsWithSamples
  }
};

export const aboutItemMockNoRubric: AboutItemModel = {
  depthOfKnowledge: "3",
  targetDescription: "Solve equations",
  commonCoreStandardsDescription: "A-123-BC",
  itemCardViewModel: completeItemCard,
  educationalDifficulty: "5",
  evidenceStatement: "This is a sample evidence statement",
  sampleItemScoring: {
    answerKey: "x = 5",
    hasMachineRubric: false,
    scoringOptions: [],
    rubrics: []
  }
};

export const mockRubrics: RubricModel[] = [
  {
    language: "English",
    rubricEntries: [
      {
        scorepoint: "2",
        name: "\n        Rubric 2",
        value:
          '<p style="">A response:</p><p style="">• Gives sufficient evidence of the ability to determine/summarize the theme/central idea/message, or to summarize what happens after or during a key event</p><p style="">• Includes specific examples/details that make clear reference to the text</p><p style="">• Adequately explains the theme/central idea/message or summary with clearly relevant information based on the text</p>'
      },
      {
        scorepoint: "1",
        name: "\n        Rubric 1",
        value:
          '<p style="">A response:</p><p style="">• Gives limited evidence of the ability to determine/summarize the theme/central idea/message, or to summarize what happens after or during a key event</p><p style="">• Includes vague/limited examples/details that make reference to the text</p><p style="">• Explains the theme/central idea/message or summary with vague/limited information based on the text</p>'
      },
      {
        scorepoint: "0",
        name: "\n        Rubric 0",
        value:
          '<p style="">A response:</p><p style="">• Gives no evidence of the ability to determine/summarize the theme/central idea/message, or to summarize what happens after or during a key event</p><p style="">OR</p><p style="">• Gives the theme/central idea/message or summary, but includes no examples or no examples/details that make reference to the text</p><p style="">OR</p><p style="">• Gives the theme/central idea/message or summary, but includes no explanation or no relevant information from the text</p>'
      }
    ],
    samples: []
  }
];

export const rubricsEsn: RubricModel[] = [
  {
    language: "Spanish",
    rubricEntries: [
      {
        scorepoint: "2",
        name: "\n        Rubric 2",
        value:
          '<p style="">Una respuesta:</p><p style="">• Proporciona evidencia suficiente de la capacidad para determinar / resumir el tema / idea central / mensaje, o para resumir lo que sucede después o durante un evento clave</p><p style="">• Incluye ejemplos / detalles específicos que hacen referencia clara al texto</p><p style="">• Explica adecuadamente el tema / idea central / mensaje o resumen con información claramente relevante basada en el texto</p>'
      },
      {
        scorepoint: "1",
        name: "\n        Rubric 1",
        value:
          '<p style="">Una respuesta:</p><p style="">• Proporciona evidencia limitada de la capacidad de determinar / resumir el tema / idea central / mensaje, o resumir lo que sucede después o durante un evento clave</p><p style="">• Incluye ejemplos / detalles vagos / limitados que hacen referencia al texto</p><p style="">• Explica el tema / idea central / mensaje o resumen con información vaga / limitada basada en el texto</p>'
      },
      {
        scorepoint: "0",
        name: "\n        Rubric 0",
        value:
          '<p style="">Una respuesta:</p><p style="">• No proporciona evidencia de la capacidad para determinar / resumir el tema / idea central / mensaje, o para resumir lo que sucede después o durante un evento clave</p><p style="">OR</p><p style="">• Da el tema / idea central / mensaje o resumen, pero no incluye ejemplos ni ejemplos / detalles que hagan referencia al texto</p><p style="">OR</p><p style="">• Da el tema / idea central / mensaje o resumen, pero no incluye ninguna explicación o información relevante del texto</p>'
      }
    ],
    samples: []
  }
];

export const allRubrics: RubricModel[] = mockRubrics.concat(rubricsEsn);

export const aboutItemRevisionMockModel: AboutItemRevisionModel = {
  namespace: "Namespace",
  itemKey: "100",
  bankKey: "100",
  revision: "2",
  section: "section",
  AboutItemMetadata: {
    identifier: "100",
    itemAuthorIdentifier: "Hannah_Hacker",
    itemSpecFormat: "SmarterApp",
    lastModifiedBy: "Hannah_Hacker",
    securityStatus: "Non-secure",
    smarterAppItemDescriptor: "Describes item 100-100",
    status: "Released",
    stimulusFormat: "Standard",
    subject: "subject type",
    version: "2",
    intendedGrade: "NA",
    minimumGrade: "NA",
    maximumGrade: "NA",
    depthOfKnowledge: "",
    interactionType: "section",
    maximumNumberOfPoints: "100",
    allowCalculator: "false",
    copyrightAndOtherRestrictions: "NA",
    brailleType: "NA",
    enemyItem: "NA",
    associatedTutorial: "NA",
    associatedWordlist: "NA",
    language: "english",
    standardPublication: {
      publication: "SBAC-SH-v1",
      primaryStandard: "SBAC-SH-v1:SH-Undesignated"
    }
  },
  sampleItemScoring: {
    answerKey: "x = 5",
    hasMachineRubric: false,
    scoringOptions: [],
    rubrics: rubricsWithSamples
  }
};
