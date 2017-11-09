import { ItemCardViewModel } from '../ItemCard/ItemCardModels';

export interface SampleResponseProps {
    purpose: string;
    scorePoint: string;
    name: string;
    sampleContent: string;
}

export interface RubricSample {
    maxValue: string;
    minValue: string;
    sampleResponses: SampleResponseProps[];
}

export interface RubricEntryProps {
    scorepoint: string;
    name: string;
    value: string;
}

export interface RubricProps {
    language: string;
    rubricEntries: RubricEntryProps[];
    samples: RubricSample[];
}

export interface InteractionType {
    code: string;
    label: string;
    description?: string;
    order?: number;
}

export interface AboutThisItemViewModel {
    rubrics: RubricProps[];
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