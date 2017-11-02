import { ItemCardViewModel } from '../ItemCard/ItemCardModels';

export interface SampleResponse {
    purpose: string;
    scorePoint: string;
    name: string;
    sampleContent: string;
}

export interface RubricSample {
    maxValue: string;
    minValue: string;
    sampleResponses: SampleResponse[];
}

export interface RubricEntry {
    scorepoint: string;
    name: string;
    value: string;
}

export interface Rubric {
    language: string;
    rubricEntries: RubricEntry[];
    samples: RubricSample[];
}

export interface InteractionType {
    code: string;
    label: string;
    description: string;
    order?: number;
}

export interface AboutThisItemViewModel {
    rubrics: Rubric[];
    itemCardViewModel: ItemCardViewModel;
    depthOfKnowledge: string;
    targetDescription: string;
    commonCoreStandardsDescription: string;
}

export interface AboutItemsViewModel {
    interactionTypes: InteractionType[];
    itemUrl: string;
    selectedInteractionTypeCode: string;
    aboutThisItemViewModel: AboutThisItemViewModel;
}