import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ItemViewerFrame from './ItemViewerFrame';
import * as ItemModels from './ItemModels';
import * as ApiModels from './ApiModels';
import * as GradeLevels from './GradeLevels';
import * as ItemCardViewer from './ItemCardViewer';
import * as AboutItem from './AboutItem/AboutItem';
import * as ItemTable from './ItemTable/ItemTable';
import * as ItemSearchDropdown from './DropDown/ItemSearchDropdown';
import * as PageTabs from './PageTabs/PageTabs';
import * as ItemCardViewModel from './ItemCardViewModel';
import * as ItemTableHeader from './ItemTable/ItemTableHeader';
import * as ItemSearchContainer from './ItemSearchContainer';
import * as ItemPageTable from './ItemTable/ItemPageTable';
import { get } from "./ApiModels";
import { parseQueryString } from "./ApiModels";


const ScoreGuideViewModelClient = () => get<ItemsSearchViewModel>("http://is-score.cass.oregonstate.edu/ScoringGuide/ScoringGuideViewModel");
export interface Props {}

export interface State {
    selectedItem?: {itemKey: number; bankKey: number}; // we will need this to extract key and bank
    scoringGuideViewModel: ApiModels.Resource<ItemsSearchViewModel>; //leave. I think this is the drop-downs. this could be a new file
    searchParams: ItemModels.ScoreSearchParams; //this is the start of the page. url and defaults 
}

export interface ItemsSearchViewModel {
    interactionTypes: ItemSearchDropdown.InteractionType[];
    subjects: ItemSearchDropdown.Subject[];
}

export class ScoringGuidePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const queryObject = parseQueryString(location.search);
        const gradeString = (queryObject["gradeLevels"] || [])[0];
        const gradeLevels: GradeLevels.GradeLevels = parseInt(gradeString, 10) || GradeLevels.GradeLevels.NA;
        const subjects = queryObject["subjects"] || [];
        const techType = queryObject["techType"] || [];

        const paramsDefault = {
            gradeLevels: gradeLevels,
            subjects: subjects,
            techType: techType
        };

        this.state = {
            scoringGuideViewModel: {kind: "loading"},
            searchParams: paramsDefault
        }

        this.loadScoringGuideViewModel(); 

    }

    loadScoringGuideViewModel() {
        ScoreGuideViewModelClient()
            .then(result => this.onSuccessLoadScoringGuideViewModel(result))
            .catch(err => this.onErrorLoadScoringGuideViewModel(err));

    }

    onSuccessLoadScoringGuideViewModel(result: ItemsSearchViewModel) {
        this.setState({
            scoringGuideViewModel: { kind: "success", content: result }
        })
    }

    onErrorLoadScoringGuideViewModel(err: any) {
        console.error(err);
    }

    onSearchParamsChange(params: ItemModels.ScoreSearchParams){
       this.setState({
            searchParams: params
       });
    }

    onRowSelection(item: {itemKey: number; bankKey: number}){
        this.setState({
            selectedItem: item
        })
    }
    
    renderTabsContainer() {
        if(this.state.selectedItem != undefined){
            return (
                <div>
                    <ItemCardViewer.ItemCardViewer
                        item={this.state.selectedItem}
                     />
                </div>
            );
        }else{
            return <div></div>
        }
     
    }

    render() {
        const scoringVMState = this.state.scoringGuideViewModel;

        if((scoringVMState.kind == "success" || scoringVMState.kind == "reloading") && scoringVMState.content != undefined){
            return (
                <div className="search-page">
                    <div className="search-container">
                        <ItemSearchContainer.ItemSearchContainer
                            scoringGuideViewModel={scoringVMState.content}
                            onRowSelection={(item) => this.onRowSelection(item)}
                            searchParams={this.state.searchParams} 
                        />
                    </div>
                    {this.renderTabsContainer()} 
                </div>
            );
        }
        else{
            return <div></div>;
        }
     
    }
}


export function initScoreGuidePage(pageVM: Props) {
    ReactDOM.render(<ScoringGuidePage {...pageVM} />, document.getElementById("react-container"));
}

