import * as GradeLevels from './GradeLevels'

export interface ItemCardViewModel {
    bankKey: number;
    itemKey: number;
    title: string;
    grade: GradeLevels.GradeLevels;
    gradeLabel: string;
    subjectCode: string;
    subjectLabel: string;
    claimCode: string;
    claimLabel: string;
    target: string;
    interactionTypeCode: string;
    interactionTypeLabel: string;
}