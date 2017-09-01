import * as React from 'react'
import * as ApiModels from './ApiModels'
import * as ItemSearchDropdown from './ItemSearchDropDown'
import * as ItemCardViewModel from './ItemCardViewModel'
import * as ItemModels from './ItemModels'
import * as ItemCardFields from './ItemCardFields'
import { get } from "./ApiModels"


export interface Props {
    scoringGuideViewModel: ApiModels.Resource<ItemsSearchViewModel>;
    itemSearchResult: ApiModels.Resource<ItemCardViewModel.ItemCardViewModel[]>;
    searchParams: ItemModels.ScoreSearchParams;
}

export interface State {
    scoringGuideViewModel: ApiModels.Resource<ItemsSearchViewModel>;
    itemSearchResult: ApiModels.Resource<ItemCardViewModel.ItemCardViewModel[]>;
    searchParams: ItemModels.ScoreSearchParams;
}

export interface ItemsSearchViewModel {
    interactionTypes: ItemSearchDropdown.InteractionType[];
    subjects: ItemSearchDropdown.Subject[];
}

const SearchClient = (params: ItemSearchDropdown.SearchAPIParams) => get<ItemCardViewModel.ItemCardViewModel[]>("http://is-score.cass.oregonstate.edu/ScoringGuide/Search", params);

export class ItemPageSearch extends React.Component<Props, State> {

    beginSearch(params: ItemSearchDropdown.SearchAPIParams) {
        const searchResults = this.props.itemSearchResult;
        if (searchResults.kind === "success") {
            this.setState({
                itemSearchResult: {
                    kind: "reloading",
                    content: searchResults.content
                }
            });
        } else if (searchResults.kind === "failure") {
            this.setState({
                itemSearchResult: { kind: "loading" }
            });
        }

        SearchClient(params)
            .then(data => this.onSearchSuccess(data))
            .catch(err => this.onSearchError(err));
    }

    onSearchSuccess(result: ItemCardViewModel.ItemCardViewModel[]) {
        const searchParams = this.props.searchParams;
        const items = result;
        this.setState({
            itemSearchResult: { kind: "success", content: items },
        });
    }

    onSearchError(err: any) {
        console.log(err);
    }

    selectSingleResult() {
        const searchResults = this.props.itemSearchResult;
        if (searchResults.kind === "success" && searchResults.content!.length === 1) {
            const searchResult = searchResults.content![0];
            ItemCardFields.itemPageLink(searchResult.bankKey, searchResult.itemKey);
        }
    }

    render() {
        const vmState = this.props.scoringGuideViewModel;
        if ((vmState.kind == "success" || vmState.kind == "reloading") && vmState.content != undefined) {
            return (
                <div className="search-controls">
                    <a>Print Items</a>
                    <ItemSearchDropdown.ItemSearchDropdown
                        interactionTypes={vmState.content.interactionTypes}
                        subjects={vmState.content.subjects}
                        onChange={(params) => this.beginSearch(params)}
                        selectSingleResult={() => this.selectSingleResult()}
                        isLoading={false} />
                </div>
            );
        } else {
            return (<div></div>);
        }

    }
}