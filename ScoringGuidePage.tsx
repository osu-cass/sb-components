import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ItemViewerFrame from './ItemViewerFrame';
import * as ItemModels from './ItemModels';
import * as ApiModels from './ApiModels';
import * as ItemCard from './ItemCard';
import * as GradeLevels from './GradeLevels';
import * as ItemCardViewer from './ItemCardViewer';
import * as AboutItem from './AboutItem';
import * as ItemTable from './ItemTable';
import * as ItemSearchDropdown from './ItemSearchDropdown';
import * as PageTabs from './PageTabs';
import * as ItemCardViewModel from './ItemCardViewModel';
import * as ItemCardFields from './ItemCardFields';
import * as ItemTableHeader from './ItemTableHeader';
import * as ItemPageSearch from './ItemPageSearch';
import * as ItemPageTable from './ItemPageTable';
import { get } from "./ApiModels";


const SearchClient = (params: ItemSearchDropdown.SearchAPIParams) => get<ItemCardViewModel.ItemCardViewModel[]>("http://is-score.cass.oregonstate.edu/ScoringGuide/Search", params);
const ScoreGuideViewModelClient = () => get<ItemsSearchViewModel>("http://is-score.cass.oregonstate.edu/ScoringGuide/ScoringGuideViewModel");
export interface Props {
}

export interface State {
    selectedItem?: {itemKey: number; bankKey: number}; // we will need this to extract key and bank
    scoringGuideViewModel: ApiModels.Resource<ItemsSearchViewModel>; //leave. I think this is the drop-downs. this could be a new file
    
}

//TODO: diagram with components, events, and props to pass
export interface ItemsSearchViewModel {
    interactionTypes: ItemSearchDropdown.InteractionType[];
    subjects: ItemSearchDropdown.Subject[];
}

export class ScoringGuidePage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            scoringGuideViewModel: {kind: "loading"}
        }

        this.loadScoringGuideViewModel(); //this should be back in search page

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
        //TODO
    }
    onRowSelection(item: {itemKey: number; bankKey: number}){
        //so the table was clicked and now we want to handle the event.
        //we want to pass this to the thing rendering the about item. which should be a new component
        //TODO

    }
        //TODO: render the page tabs and pass the new state of selected row attributes
    renderAboutItemDetails() {
        return (
            <div>
                <ItemCardViewer.ItemCardViewer />
            </div>
        );
    }

    render() {
        const scoringVMState = this.state.scoringGuideViewModel;

        if((scoringVMState.kind == "success" || scoringVMState.kind == "reloading") && scoringVMState.content != undefined){
            return (
                <div className="search-page">
                    <div className="search-container">
                        <ItemPageSearch.ItemPageSearch
                            scoringGuideViewModel={scoringVMState.content}
                            onSearch={(params) => this.onSearchParamsChange(params)} 
                        />
                        <ItemPageTable.ItemPageTable
                        onRowSelection={(item) => this.onRowSelection(item) }
                        />
                    </div>
                    {this.renderAboutItemDetails()} 
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

