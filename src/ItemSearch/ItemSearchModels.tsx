import { GradeLevels } from "../GradeLevels/GradeLevels";
import { InteractionTypeModel } from "../AboutTestItems/AboutTestItemsModels";

export interface SubjectClaimsModel {
    [subject: string]: { text: string; value: string }[];
}

export interface SubjectModel {
    code: string;
    label: string;
    claims?: ClaimModel[];
    interactionTypeCodes?: string[];
}

export interface ClaimModel {
    code: string;
    label: string;
    targets: TargetModel[];
}


export interface TargetModel {
    name: string;
    nameHash: number;
}

export interface SearchAPIParamsModel {
    itemId: string;
    gradeLevels: GradeLevels;
    subjects: string[];
    claims: string[];
    interactionTypes: string[];
    performanceOnly: boolean;
    targets: number[];
}

export interface ItemsSearchModel {
    interactionTypes: InteractionTypeModel[];
    subjects: SubjectModel[];
}
