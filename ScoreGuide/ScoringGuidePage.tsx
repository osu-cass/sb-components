import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ItemModels from '../Models/ItemModels';
import * as ApiModels from '../Models/ApiModels';
import * as GradeLevels from '../Models/GradeLevels';
import * as ItemCardViewer from '../AboutItem/ItemCardViewer';
import * as AboutItemVM from '../Models/AboutItemVM';
import * as ItemSearchContainer from './ItemSearchContainer';
import { get } from "../Models/ApiModels";

const ScoreGuideViewModelClient = () => get<ItemsSearchViewModel>("http://is-score.cass.oregonstate.edu/ScoringGuide/ScoringGuideViewModel");

export interface State {
    item: ApiModels.Resource<AboutItemVM.AboutThisItem>;
    scoringGuideViewModel: ApiModels.Resource<ItemsSearchViewModel>;
    filterOptions: ItemModels.FilterOptions;
}

export interface ItemsSearchViewModel {
    subjects: ItemModels.Subject[];
}

export class ScoringGuidePage extends React.Component<{}, State> {
    constructor() {
        super();

        this.state = {
            scoringGuideViewModel: { kind: "loading" },
            filterOptions: {
                subjects: [],
                grades: [
                    GradeLevels.GradeLevels.Elementary,
                    GradeLevels.GradeLevels.Middle,
                    GradeLevels.GradeLevels.High    
                ],
                techTypes: [
                    {
                        code: "CAT",
                        label: "CAT"
                    },
                    {
                        code: "PT",
                        label: "Performance Items"
                    }
                ]
            },
            item: {kind:"none"}
        }

        this.loadScoringGuideViewModel();

    }

    getAboutItem(item: { itemKey: number; bankKey: number }) {
        AboutItemVM.ScoreSearchClient(item)
            .then((data) => this.onAboutItemSuccess(data))
            .catch((err) => this.onAboutItemError(err));
    }

    onAboutItemSuccess(data: AboutItemVM.AboutThisItem) {
        this.setState({
            item: { kind: "success", content: data }
        });
    }

    onAboutItemError(err: any) {
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
            scoringGuideViewModel: { kind: "success", content: result },
            filterOptions: {
                ...this.state.filterOptions,
                subjects: result.subjects
            }
        });
    }

    onErrorLoadScoringGuideViewModel(err: any) {
        console.error(err);
        this.setState({
            scoringGuideViewModel: { kind: "failure" }
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
                            onRowSelection={(item) => this.onRowSelection(item)}
                            filterOptions={this.state.filterOptions}
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

