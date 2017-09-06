import * as React from 'react';
import * as Rubric from "./Rubric";
import * as ItemCardViewModel from './ItemCardViewModel';
import * as API from './ApiModels';

export interface Props {

}

export interface State {

}

export interface AboutThisItem {
    rubrics: Rubric.Rubric[];
    itemCardViewModel: ItemCardViewModel.ItemCardViewModel;
    depthOfKnowledge: string;
    targetDescription: string;
    commonCoreStandardsDescription: string;
    educationalDifficulty: string;
    evidenceStatement: string;
}

export const ScoreSearchClient = (params: { bankKey: number, itemKey: number }) => API.get<AboutThisItem>("http://is-score.cass.oregonstate.edu/ScoringGuide/AboutThisItem", params)

export class ScoringGuidePage extends React.Component<Props, State> {


    //TODO: render the item information
    render() {
        return (
            <div>
            </div>
        );
    }

}