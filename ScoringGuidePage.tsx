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
import { get } from "./ApiModels";


const SearchClient = (params: ItemSearchDropdown.SearchAPIParams) => get<ItemCardViewModel.ItemCardViewModel[]>("http://is-score.cass.oregonstate.edu/ScoringGuide/Search", params);
const ScoreGuideViewModelClient = () => get<ItemsSearchViewModel>("http://is-score.cass.oregonstate.edu/ScoringGuide/ScoringGuideViewModel");

export interface State {
    searchParams: ItemModels.ScoreSearchParams;
    itemSearchResult: ApiModels.Resource<ItemCardViewModel.ItemCardViewModel[]>;
    selectedItem: ApiModels.Resource<AboutItem.AboutThisItem>;
    selectedRow?: ItemCardViewModel.ItemCardViewModel; 
    sorts: ItemTableHeader.HeaderSort[];
    scoringGuideViewModel: ApiModels.Resource<ItemsSearchViewModel>;
}

export interface ItemsSearchViewModel {
    interactionTypes: ItemSearchDropdown.InteractionType[];
    subjects: ItemSearchDropdown.Subject[];
}
 
export class ScoringGuidePage extends React.Component<{}, State> {
    private headerColumns = ItemTableHeader.headerColumns;
    private dataTableRef: HTMLTableElement;

    constructor() {
        super();
        this.state = {
            searchParams: {
                gradeLevels: GradeLevels.GradeLevels.NA,
                subjects: [],
                techType: []
            },
            itemSearchResult: { kind: "loading" },
            selectedItem: { kind: "loading" },
            sorts: [],
            scoringGuideViewModel: {kind: "loading"}
        }

        this.loadScoringGuideViewModel();
    }

    loadScoringGuideViewModel(){
        ScoreGuideViewModelClient()
        .then(result => this.onSuccessLoadScoringGuideViewModel(result))
        .catch(err => this.onErrorLoadScoringGuideViewModel(err));

    }

    onSuccessLoadScoringGuideViewModel(result: ItemsSearchViewModel){
        this.setState({
            scoringGuideViewModel: {kind:"success", content: result}
        })
    }

    onErrorLoadScoringGuideViewModel(err: any){
        console.error(err);
    }

    //row is selected passed from item table
    onSelectItem = (item: ItemCardViewModel.ItemCardViewModel) => {
        this.setState({
            selectedRow: item
        });

        AboutItem.ScoreSearchClient({ bankKey: item.bankKey, itemKey: item.itemKey })
            .then((data) => this.onAboutItemSuccess(data))
            .catch((err) => this.onAboutItemError(err));
    };

    //on load success, after row is selected
    onAboutItemSuccess(item: AboutItem.AboutThisItem) {
        this.setState({
            selectedItem: { kind: "success", content: item }
        });
    }

    onAboutItemError(err: any) {
        console.error(err);
    }

    onSearchSuccess(result: ItemCardViewModel.ItemCardViewModel[]) {
        const searchParams = this.state.searchParams;
        const items = result;
        this.setState({
            itemSearchResult: { kind: "success", content: items },
        });
    }

    onSearchError(err: any) {
        console.log(err);
    }

    async callSearch() {
        const searchParams = this.state.searchParams;
        return ItemModels.ScoreSearchClient(searchParams)
            .then((data) => this.onSearchSuccess(data))
            .catch((err) => this.onSearchError(err));
    }

    isLoading() {
        return this.state.itemSearchResult.kind === "loading" || this.state.itemSearchResult.kind === "reloading";
    }

    renderAboutItemDetails() {
        const selectedResult = this.state.selectedItem;
        if (selectedResult.kind == "success" && selectedResult.content) {
            const itemCard = selectedResult.content.itemCardViewModel;
            return (
                <div>
                    <ItemCardViewer.ItemCardViewer aboutItem= {selectedResult.content} />
                </div>
            );
        } else {
            return (<div></div>);
        }

    }

    onClickHeader = (col: ItemTableHeader.SortColumn) => {
        const newSorts = (this.state.sorts || []).slice();
        const headIdx = newSorts.findIndex(hs => hs.col.header === col.header);
        if (headIdx !== -1) {
            const newSort = Object.assign({}, newSorts[headIdx]);
            if (newSort.direction == ItemTableHeader.SortDirection.Ascending) {
                newSort.direction = ItemTableHeader.SortDirection.Descending;
            }
            else if (newSort.direction == ItemTableHeader.SortDirection.Descending) {
                newSort.direction = ItemTableHeader.SortDirection.NoSort;
            }
            else {
                newSort.direction = ItemTableHeader.SortDirection.Ascending;
            }

            newSorts[headIdx] = newSort;
        } else {
            const newSort: ItemTableHeader.HeaderSort = {
                col: col,
                direction: ItemTableHeader.SortDirection.Ascending,
                resetSortCount:0
            };
            newSorts.push(newSort);
        }
        this.setState({ sorts: newSorts });
    }

    invokeMultiSort(lhs: ItemCardViewModel.ItemCardViewModel, rhs: ItemCardViewModel.ItemCardViewModel): number {
        const sorts = this.state.sorts || [];
        for (const sort of sorts) {
            const diff = sort.col.compare(lhs, rhs) * sort.direction;
            if (diff !== 0) {
                return diff;
            }
        }
        return 0;
    }

    //Post sorted table data.
    getTableData(data: ItemCardViewModel.ItemCardViewModel[]): ItemCardViewModel.ItemCardViewModel[] {
        const sortedData = this.state.sorts && this.state.sorts.length !== 0
            ? data.sort((lhs, rhs) => this.invokeMultiSort(lhs, rhs))
            : data;

        return sortedData;
    }

    onSearch(results: ItemCardViewModel.ItemCardViewModel[]) {
        this.setState({ itemSearchResult: { kind: "success", content: results } });
    }

    onError(err: any) {
        this.setState({ itemSearchResult: { kind: "failure" } });
        console.error(err);
    }

    selectSingleResult() {
        const searchResults = this.state.itemSearchResult;
        if (searchResults.kind === "success" && searchResults.content!.length === 1) {
            const searchResult = searchResults.content![0];
            ItemCardFields.itemPageLink(searchResult.bankKey, searchResult.itemKey);
        }
    }

    beginSearch(params: ItemSearchDropdown.SearchAPIParams) {
        const searchResults = this.state.itemSearchResult;
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

    renderSearchControls(isLoading: boolean) {
        const vmState = this.state.scoringGuideViewModel;
        if((vmState.kind == "success" || vmState.kind == "reloading") && vmState.content != undefined){
            return (
                <div className="search-controls">
                    <a>Print Items</a>
                    <ItemSearchDropdown.ItemSearchDropdown
                        interactionTypes={vmState.content.interactionTypes}
                        subjects={vmState.content.subjects}
                        onChange={(params) => this.beginSearch(params)}
                        selectSingleResult={() => this.selectSingleResult()}
                        isLoading={isLoading} />
                </div>
            );
        }else{
            return null;
        }
    
    }

    renderSearch() {
        const searchResults = this.state.itemSearchResult;

        let resultElement: JSX.Element[] | JSX.Element | undefined;
        if (searchResults.kind === "success" || searchResults.kind === "reloading") {
            if (searchResults.content == null || searchResults.content.length === 0) {
                resultElement = <span className="placeholder-text" role="alert">No results found for the given search terms.</span>
            }
            else {
                resultElement =
                    <div className="search-results">

                        <ItemTableHeader.HeaderTable
                            sorts={this.state.sorts}
                            onHeaderClick={this.onClickHeader}
                            columns={this.headerColumns} />
                        <ItemTable.DataTable
                            mapRows={this.getTableData(searchResults.content)}
                            rowOnClick={this.onSelectItem}
                            sort={this.state.sorts}
                            tableRef={ref => this.dataTableRef = ref}
                            columns={this.headerColumns}
                            selectedRow={this.state.selectedRow} />
                    </div>
            }
        } else if (searchResults.kind === "failure") {
            resultElement = <div className="placeholder-text" role="alert">An error occurred. Please try again later.</div>;
        }

        return resultElement;
    }

    render() {

        const isLoading = this.isLoading();
        return (
            <div className="search-page">
                <div className="search-container">
                    {this.renderSearchControls(isLoading)}
                    {this.renderSearch()}
                </div>
                {this.renderAboutItemDetails()}
            </div>
        );
    }
}

export function initScoreGuidePage(){
    ReactDOM.render(<ScoringGuidePage />, document.getElementById("react-container"));
}

