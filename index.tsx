import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScoringGuidePage, ItemsSearchViewModel } from './ScoreGuide/ScoringGuidePage';
import { get } from "./Models/ApiModels";
import "font-awesome/css/font-awesome.min.css";
import './styles/site.less'

export class App extends React.Component<{},{}>{
    client = () => get<ItemsSearchViewModel>("http://is-score.cass.oregonstate.edu/ScoringGuide/ScoringGuideViewModel");

    render() {
        return (<ScoringGuidePage scoreGuideViewModelClient={this.client}/>);
    }

}

ReactDOM.render(<App/>, document.getElementById("react-container"));
