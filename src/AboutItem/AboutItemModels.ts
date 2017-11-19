import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { RubricModel, SampleItemScoringModel } from "../Rubric/RubricModels";

export interface AboutItemModel {
  rubrics: RubricModel[];
  itemCardViewModel: ItemCardModel;
  depthOfKnowledge: string;
  targetDescription: string;
  commonCoreStandardsDescription: string;
  educationalDifficulty: string;
  evidenceStatement: string;
  sampleItemScoring?: SampleItemScoringModel
  associatedItems?: string;
}
