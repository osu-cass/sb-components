import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ItemViewerFrame from '../AboutItem/ItemViewerFrame';
import * as ItemModels from '../Models/ItemModels';
import * as ApiModels from '../Models/ApiModels';
import * as GradeLevels from '../Models/GradeLevels';
import * as ItemCardViewer from '../AboutItem/ItemCardViewer';
import * as AboutItemVM from '../Models/AboutItemVM';
import * as ItemTable from '../ItemTable/ItemTable';
import * as ItemSearchDropdown from '../DropDown/ItemSearchDropDown';
import * as PageTabs from '../PageTabs/PageTabs';
import * as ItemCardViewModel from '../Models/ItemCardViewModel';
import * as ItemTableHeader from '../ItemTable/ItemTableHeader';
import * as ItemSearchContainer from './ItemSearchContainer';
import * as ItemPageTable from '../ItemTable/ItemPageTable';
import { get } from "../Models/ApiModels";
import { parseQueryString } from "../Models/ApiModels";


const ScoreGuideViewModelClient = () => get<ItemsSearchViewModel>("http://is-score.cass.oregonstate.edu/ScoringGuide/ScoringGuideViewModel");

export interface State {
    item: ApiModels.Resource<AboutItemVM.AboutThisItem>;
    scoringGuideViewModel: ApiModels.Resource<ItemsSearchViewModel>;
    searchParams: ItemModels.ScoreSearchParams;
}

export interface ItemsSearchViewModel {
    interactionTypes: ItemSearchDropdown.InteractionType[];
    subjects: ItemSearchDropdown.Subject[];
}

export class ScoringGuidePage extends React.Component<{}, State> {
    constructor() {
        super();

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
            scoringGuideViewModel: { kind: "loading" },
            searchParams: paramsDefault,
            item: {kind:"none"}
        }

        this.loadScoringGuideViewModel();

    }

    getAboutItem(item: { itemKey: number; bankKey: number }) {
        AboutItemVM.ScoreSearchClient(item)
            .then((data) => this.onSearchSuccess(data))
            .catch((err) => this.onSearchError(err));
    }

    onSearchSuccess(data: AboutItemVM.AboutThisItem) {
        this.setState({
            item: { kind: "success", content: data }
        });
    }

    onSearchError(err: any) {
        console.error(err);
        this.setState({
            item: { kind: "failure" }
        })
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

    onSearchParamsChange(params: ItemModels.ScoreSearchParams) {
        this.setState({
            searchParams: params
        });
    }

    onRowSelection(item: { bankKey: number, itemKey: number }) {
        this.getAboutItem(item);
    }

    renderTabsContainer() {
        if (this.state.item.kind == "success" || this.state.item.kind == "reloading") {
            const newItem = this.state.item.content;
            return (
                <div>
                    <ItemCardViewer.ItemCardViewer
                        item={newItem}
                    />
                </div>
            );

        } else {
            return <div></div>
        }

    }

    render() {
        const scoringVMState = this.state.scoringGuideViewModel;

        if ((scoringVMState.kind == "success" || scoringVMState.kind == "reloading") && scoringVMState.content != undefined) {
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
        else {
            return <div></div>;
        }

    }
}


export function initScoreGuidePage() {
    ReactDOM.render(<ScoringGuidePage />, document.getElementById("react-container"));
}

