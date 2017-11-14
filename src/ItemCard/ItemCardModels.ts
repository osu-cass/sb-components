import * as GradeLevels from '../GradeLevels/GradeLevels';
import { Link } from 'react-router-dom';

export function itemPageLink(bankKey: number, itemKey: number) {
    window.location.href = "/Item?bankKey=" + bankKey + "&itemKey=" + itemKey;
}

export interface ItemCardModel {
    bankKey: number;
    itemKey: number;
    title: string;
    grade: GradeLevels.GradeLevels;
    gradeLabel: string;
    subjectCode: string;
    subjectLabel: string;
    claimCode: string;
    claimLabel: string;
    targetHash: number;
    targetShortName: string;
    interactionTypeCode: string;
    interactionTypeLabel: string;
    isPerformanceItem: boolean;
}
