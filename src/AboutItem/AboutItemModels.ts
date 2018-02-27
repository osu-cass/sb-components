import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { RubricModel, SampleItemScoringModel } from "../Rubric/RubricModels";
import { aboutItemRevisionMockModel } from "./mocks";

export interface AboutItemModel {
  itemCardViewModel: ItemCardModel;
  depthOfKnowledge?: string;
  targetDescription?: string;
  commonCoreStandardsDescription?: string;
  educationalDifficulty?: string;
  evidenceStatement?: string;
  sampleItemScoring?: SampleItemScoringModel;
  associatedItems?: string;
}

export interface StandardPublication {
  publication: string;
  primaryStandard: string;
}

export interface AboutItemRevision {
  identifier: string;
  itemAuthorIdentifier: string;
  itemSpecFormat: string;
  lastModifiedBy: string;
  securityStatus: string;
  smarterAppItemDescriptor: string;
  status: string;
  stimulusFormat: string;
  subject: string;
  version: string;
  intendedGrade: string;
  minimumGrade: string;
  maximumGrade: string;
  depthOfKnowledge: string;
  interactionType: string;
  maximumNumberOfPoints: string;
  allowCalculator: string;
  copyrightAndOtherRestrictions: string;
  brailleType: string;
  enemyItem: string;
  standardPublication: StandardPublication;
  associatedTutorial: string;
  associatedWordlist: string;
  language: string;
}

export interface AboutItemRevisionModel {
  itemKey: string;
  bankKey: string;
  revision: string;
  section: string;
  AboutItemMetadata: AboutItemRevision;
}
