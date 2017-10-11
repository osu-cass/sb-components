import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ItemModels from '../Models/ItemModels';
import * as ApiModels from '../Models/ApiModels';
import * as GradeLevels from '../Models/GradeLevels';
import * as ItemCardViewer from '../AboutItem/ItemCardViewer';
import * as AboutItemVM from '../Models/AboutItemVM';
import * as ItemSearchContainer from './ItemSearchContainer';
import * as ItemCardViewModel from '../Models/ItemCardViewModel'
import { get } from "../Models/ApiModels";
import { FilterHelper } from "../Models/FilterHelper";
import * as AdvancedFilterModel from "../Filter/AdvancedFilterModel";

const SearchClient = () => get<ItemCardViewModel.ItemCardViewModel[]>("api/search");

export interface Props {
    scoreGuideViewModelClient: () => Promise<ItemsSearchViewModel>;
}

export interface State {
    item: ApiModels.Resource<AboutItemVM.AboutThisItem>;
    scoringGuideViewModel: ApiModels.Resource<ItemsSearchViewModel>;
    filterOptions: AdvancedFilterModel.AdvancedFilters;
}

export interface ItemsSearchViewModel {
    subjects: ItemModels.Subject[];
}

export class ScoringGuidePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            scoringGuideViewModel: { kind: "loading" },
            filterOptions: FilterHelper.getFilterOptions(),
            item: { kind: "none" }
        }
        this.loadScoringGuideViewModel();
    }


    getAboutItem = (item: { itemKey: number, bankKey: number }) => {
        AboutItemVM.ScoreSearchClient(item)
            .then((data) => {
                this.onAboutItemSuccess(data)
            })
            .catch((err) => {
                this.onAboutItemError(err)
            });
    }

    onAboutItemSuccess = (data: AboutItemVM.AboutThisItem) => {
        const item: ApiModels.Resource<AboutItemVM.AboutThisItem> = { kind: "success", content: data };
        this.setState({item});
    }

    onAboutItemError = (err: any) => {
        console.error(err);
        this.setState({
            item: { kind: "failure" }
        })
    }

    loadScoringGuideViewModel = () => {
        this.props.scoreGuideViewModelClient()
            .then(result => this.onSuccessLoadScoringGuideViewModel(result))
            .catch(err => this.onErrorLoadScoringGuideViewModel(err));

    }

    onSuccessLoadScoringGuideViewModel = (result: ItemsSearchViewModel) => {
        this.setState({
            scoringGuideViewModel: { kind: "success", content: result }
        });
    }

    onErrorLoadScoringGuideViewModel = (err: any) => {
        console.error(err);
        this.setState({
            scoringGuideViewModel: { kind: "failure" }
        });
    }

    onRowSelection = (item: { bankKey: number, itemKey: number }, reset: boolean) => {
        if (reset === false) {
            this.getAboutItem(item);
        } else {
            let item: ApiModels.Resource<AboutItemVM.AboutThisItem> = { kind: "none" };
            this.setState({ item });
        }
    }

    render() {
        const scoringVMState = this.state.scoringGuideViewModel;

        if ((scoringVMState.kind == "success" || scoringVMState.kind == "reloading") && scoringVMState.content != undefined) {
            return (
                <div className="search-page">
                    <div className="search-container">
                        <ItemSearchContainer.ItemSearchContainer
                            onRowSelection={this.onRowSelection}
                            filterOptions={this.state.filterOptions}
                            searchClient={SearchClient}
                            item={this.state.item}
                        />
                    </div>
                </div>
            );
        }
        else {
            return <div></div>;
        }

    }
}


