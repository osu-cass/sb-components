import { RubricModel } from "../../Rubric/RubricModels";
import { ItemCardModel } from "../../ItemCard/ItemCardModels";
import { AboutItemModel } from "../../AboutItem/AboutItemModels";
import { GradeLevels } from "../../GradeLevels/GradeLevels";
import {
  ItemPdfModel,
  PdfViewType,
  ItemGroupModel,
  QuestionModel
} from "../PdfModels";
import { PdfContainerProps } from "../PdfContainer";
import { PassageViewProps } from "../PassageView";

const rubric: RubricModel = {
  language: "english",
  rubricEntries: [
    {
      scorepoint: "",
      name: "",
      value: ""
    }
  ],
  samples: [
    {
      maxValue: "",
      minValue: "",
      sampleResponses: [
        {
          purpose: "",
          scorePoint: "",
          name: "",
          sampleContent: ""
        }
      ]
    }
  ]
};

export const itemVM: ItemCardModel = {
  bankKey: 1,
  itemKey: 1,
  gradeLabel: "grade 3",
  subjectLabel: "math",
  claimCode: "234536",
  targetId: "23463467",
  domain: "MATH",
  depthOfKnowledge: "",
  commonCoreStandardId: "",
  title: "",
  grade: GradeLevels.Grade6,
  subjectCode: "MATH",
  claimLabel: "Math Claim",
  targetShortName: "1-3",
  interactionTypeCode: "",
  interactionTypeLabel: "",
  isPerformanceItem: false,
  targetHash: 212
};

export const aboutItemVM: AboutItemModel = {
  itemCardViewModel: itemVM,
  rubrics: [rubric],
  targetDescription: "string",
  depthOfKnowledge: "string",
  commonCoreStandardsDescription: "string",
  educationalDifficulty: "string",
  evidenceStatement: "string",
  associatedItems: "string"
};

export const itemView: ItemPdfModel = {
  id: "12334",
  html: null,
  picturePath: null,
  captured: true,
  type: PdfViewType.html
};

export const question: QuestionModel = {
  id: "12334",
  view: itemView,
  data: aboutItemVM,
  questionNumber: 1
};

export const questionDataNull: QuestionModel = { ...question, data: null };

export const itemGroup: ItemGroupModel = {
  passage: null,
  questions: [question]
};

export const pdfContainerProps: PdfContainerProps = {
  items: [itemGroup],
  grade: "3",
  subject: "math",
  ivsBaseUrl: "http://example.com",
  cssUrl: "http://example.com/style.css",
  displayTitlePage: true
};

export const passageViewProps: PassageViewProps = {
  view: itemView,
  associatedItems: ["187-1234", "187-1235"]
};
