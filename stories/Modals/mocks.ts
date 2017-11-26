import { Column, Props } from "../../src/Modals/MoreLikeThisModal";


export interface Column {
    label: string;
    itemCards: ItemCardModel[];
}

export interface Props {
    gradeBelowItems: Column | null;
    sameGradeItems: Column;
    gradeAboveItems: Column | null;
}

export const column1: Column = [{
    label: "Hello",
    itemCards: [
        {
            bankKey: 187,
            itemKey: 2938,
            title: 'ELA/literacy Grade 5 Claim 2',
            grade: 4,
            gradeLabel: 'Grade 5',
            subjectCode: 'ELA',
            subjectLabel: 'ELA/literacy',
            claimCode: 'ELA2',
            claimLabel: 'Writing',
            targetHash: 2287,
            targetId: '8',
            targetShortName: 'Language & Vocabulary Use',
            interactionTypeCode: 'MS',
            interactionTypeLabel: 'Multi Select',
            isPerformanceItem: false,
            brailleOnlyItem: false,
            domain: null,
            depthOfKnowledge: '1',
            commonCoreStandardId: '5.W.3d'
        }
    ]
}]

export const column2: Column = [{
    label: "Hello",
    itemCards: [ {
        bankKey: 187,
        itemKey: 2960,
        title: 'ELA/literacy Grade 5 Claim 2',
        grade: 4,
        gradeLabel: 'Grade 5',
        subjectCode: 'ELA',
        subjectLabel: 'ELA/literacy',
        claimCode: 'ELA2',
        claimLabel: 'Writing',
        targetHash: 2312,
        targetId: '6',
        targetShortName: 'Write/revise Brief Texts',
        interactionTypeCode: 'MC',
        interactionTypeLabel: 'Multiple Choice',
        isPerformanceItem: false,
        brailleOnlyItem: false,
        domain: null,
        depthOfKnowledge: '2',
        commonCoreStandardId: ''
    }]
}]

export const column3: Column = [{
    label: "Hello",
    itemCards: [ {
        bankKey: 187,
        itemKey: 2958,
        title: 'ELA/literacy Grade 5 Claim 2',
        grade: 4,
        gradeLabel: 'Grade 5',
        subjectCode: 'ELA',
        subjectLabel: 'ELA/literacy',
        claimCode: 'ELA2',
        claimLabel: 'Writing',
        targetHash: 2312,
        targetId: '3',
        targetShortName: 'Write/revise Brief Texts',
        interactionTypeCode: 'HTQ',
        interactionTypeLabel: 'Hot Text',
        isPerformanceItem: false,
        brailleOnlyItem: false,
        domain: null,
        depthOfKnowledge: '2',
        commonCoreStandardId: ''
    }]
}]

export const MoreLikeThisMockProps: Props = {
    gradeBelowItems: column1,
    sameGradeItems: column2,
    gradeAboveItems: column3

} 