import * as React from 'react'
import * as ApiModels from './ApiModels'
import * as ItemSearchDropdown from './ItemSearchDropDown'
import * as ItemCardViewModel from './ItemCardViewModel'
import * as ItemModels from './ItemModels'
import * as ItemCardFields from './ItemCardFields'
import * as ItemTable from './ItemTable'
import { get } from "./ApiModels"


export interface Props {
    scoringGuideViewModel?: ItemsSearchViewModel;
    onSearch: (params: ItemModels.ScoreSearchParams) => void;//this iwll be the event to fire. send it to scoringuidepage then the taable thingy
}

export interface State {
    searchParams: ItemModels.ScoreSearchParams;
}

export interface ItemsSearchViewModel {
    interactionTypes: ItemSearchDropdown.InteractionType[];
    subjects: ItemSearchDropdown.Subject[];
}


export class ItemPageSearch extends React.Component<Props, State> {

    beginSearch(){
        //we could add a timeout function so we limit the amount of requests
        const searchParams = this.state.searchParams;
        this.props.onSearch(searchParams);
    }

    // beginSearch(params: ItemSearchDropdown.SearchAPIParams) {
    //     const searchResults = this.state.itemSearchResult;
    //     if (searchResults.kind === "success") {
    //         this.setState({
    //             itemSearchResult: {
    //                 kind: "reloading",
    //                 content: searchResults.content
    //             }
    //         });
    //     } else if (searchResults.kind === "failure") {
    //         this.setState({
    //             itemSearchResult: { kind: "loading" }
    //         });
    //     }

    //     SearchClient(params)
    //         .then(data => this.onSearchSuccess(data))
    //         .catch(err => this.onSearchError(err));
    // }

    // onSearchSuccess(result: ItemCardViewModel.ItemCardViewModel[]) {
    //     const searchParams = this.props.searchParams;
    //     const items = result;
    //     this.setState({
    //         itemSearchResult: { kind: "success", content: items },
    //     });
    // }

    // onSearchError(err: any) {
    //     console.log(err);
    // }

    // selectSingleResult() {
    //     const searchResults = this.state.itemSearchResult;
    //     if (searchResults.kind === "success" && searchResults.content!.length === 1) {
    //         const searchResult = searchResults.content![0];
    //         ItemCardFields.itemPageLink(searchResult.bankKey, searchResult.itemKey);
    //     }
    // }
    render() {
        const scoringVM = this.props.scoringGuideViewModel;
        if ( scoringVM != undefined) {
            return (
                <div className="search-controls">
                    <a>Print Items</a>
                    <ItemSearchDropdown.ItemSearchDropdown
                        interactionTypes={scoringVM.interactionTypes}
                        subjects={scoringVM.subjects}
                        onChange={() => this.beginSearch()}
                        isLoading={false} />
                </div>
            );
        } else {
            return (<div></div>);
        }

    }
}