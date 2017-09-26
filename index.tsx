import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScoringGuidePage, ItemsSearchViewModel } from './ScoreGuide/ScoringGuidePage'
import { get } from "./Models/ApiModels";

export class App extends React.Component<{},{}>{
    render() {
        const client = () => get<ItemsSearchViewModel>("http://is-score.cass.oregonstate.edu/ScoringGuide/ScoringGuideViewModel");
        return (<ScoringGuidePage scoreGuideViewModelClient={client}/>);
    }
}

export function initScoreGuidePage() {
    ReactDOM.render(<App/>, document.getElementById("react-container"));
}