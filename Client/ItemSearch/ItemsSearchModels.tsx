import * as GradeLevels from "../GradeLevels/GradeLevels";
import * as ItemCardModels from '../ItemCard/ItemCardModels';

export interface SubjectClaims {
    [subject: string]: { text: string; value: string }[];
}

export interface InteractionType {
    code: string;
    label: string;
}

export interface Subject {
    code: string;
    label: string;
    claims: Claim[];
    interactionTypeCodes: string[];
}

export interface Claim {
    code: string;
    label: string;
    targets: Target[];
}


export interface Target {
    name: string;
    nameHash: number;
}


export interface SearchAPIParams {
    itemId: string;
    gradeLevels: GradeLevels.GradeLevels;
    subjects: string[];
    claims: string[];
    interactionTypes: string[];
    performanceOnly: boolean;
    targets: number[];
}

export interface ItemsSearchViewModel {
    interactionTypes: InteractionType[];
    subjects: Subject[];
}


