import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { RubricModel } from "../Rubric/RubricModels";

export interface AboutItemModel {
  rubrics: RubricModel[];
  itemCardViewModel: ItemCardModel;
  depthOfKnowledge: string;
  targetDescription: string;
  commonCoreStandardsDescription: string;
  educationalDifficulty: string;
  evidenceStatement: string;
  associatedItems?: string;
}
