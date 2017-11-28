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
    


export const rubricsEsn: RubricModel[] = [
    {
      language: 'Spanish',
      rubricEntries: [
        {
          scorepoint: '2',
          name: '\n        Rubric 2',
          value: '<p style="">Una respuesta:</p><p style="">• Proporciona evidencia suficiente de la capacidad para determinar / resumir el tema / idea central / mensaje, o para resumir lo que sucede después o durante un evento clave</p><p style="">• Incluye ejemplos / detalles específicos que hacen referencia clara al texto</p><p style="">• Explica adecuadamente el tema / idea central / mensaje o resumen con información claramente relevante basada en el texto</p>'
        },
        {
          scorepoint: '1',
          name: '\n        Rubric 1',
          value: '<p style="">Una respuesta:</p><p style="">• Proporciona evidencia limitada de la capacidad de determinar / resumir el tema / idea central / mensaje, o resumir lo que sucede después o durante un evento clave</p><p style="">• Incluye ejemplos / detalles vagos / limitados que hacen referencia al texto</p><p style="">• Explica el tema / idea central / mensaje o resumen con información vaga / limitada basada en el texto</p>'
        },
        {
          scorepoint: '0',
          name: '\n        Rubric 0',
          value: '<p style="">Una respuesta:</p><p style="">• No proporciona evidencia de la capacidad para determinar / resumir el tema / idea central / mensaje, o para resumir lo que sucede después o durante un evento clave</p><p style="">OR</p><p style="">• Da el tema / idea central / mensaje o resumen, pero no incluye ejemplos ni ejemplos / detalles que hagan referencia al texto</p><p style="">OR</p><p style="">• Da el tema / idea central / mensaje o resumen, pero no incluye ninguna explicación o información relevante del texto</p>'
        }
      ],
      samples: []
    }
  ]

export const allRubrics: RubricModel[] = rubrics.concat(rubricsEsn)