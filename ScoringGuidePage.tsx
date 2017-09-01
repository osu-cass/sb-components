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
            scoringGuideViewModel: { kind: "loading" }
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

    isLoading() {
        return this.state.itemSearchResult.kind === "loading" || this.state.itemSearchResult.kind === "reloading";
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
                resetSortCount: 0
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

    renderAboutItemDetails() {
        const selectedResult = this.state.selectedItem;
        if (selectedResult.kind == "success" && selectedResult.content) {
            const itemCard = selectedResult.content.itemCardViewModel;
            return (
                <div>
                    <ItemCardViewer.ItemCardViewer aboutItem={selectedResult.content} />
                </div>
            );
        } else {
            return (<div></div>);
        }

    }

    renderTableHeader() {
        return (
            <ItemTableHeader.HeaderTable
                sorts={this.state.sorts}
                onHeaderClick={this.onClickHeader}
                columns={this.headerColumns} />
        );
    }

    renderTable() {
        let resultElement: JSX.Element[] | JSX.Element | undefined;
        if (this.state.itemSearchResult.kind == "success" || this.state.itemSearchResult.kind == "reloading") {
            if (this.state.itemSearchResult.content == null || this.state.itemSearchResult.content.length === 0) {
                resultElement = <span className="placeholder-text" role="alert">No results found for the given search terms.</span>
            } else {
                return (
                    <ItemTable.DataTable
                        mapRows={this.getTableData(this.state.itemSearchResult.content)}
                        rowOnClick={this.onSelectItem}
                        sort={this.state.sorts}
                        tableRef={ref => this.dataTableRef = ref}
                        columns={this.headerColumns}
                        selectedRow={this.state.selectedRow} />
                );
            }
        } else {
            resultElement = <div className="placeholder-text" role="alert">An error occurred. Please try again later.</div>;
        }
        return resultElement;
    }

    renderSearch() {
        return (
            <div className="search-results">
                {this.renderTableHeader()};
                {this.renderTable()};
            </div>
        );
    }


    render() {
        const isLoading = this.isLoading();
        return (
            <div className="search-page">
                <div className="search-container">
                    <ItemPageSearch.ItemPageSearch 
                        scoringGuideViewModel={this.state.scoringGuideViewModel}
                        itemSearchResult={this.state.itemSearchResult}
                        searchParams={this.state.searchParams}
                    />
                    {this.renderSearch()}
                </div>
                {this.renderAboutItemDetails()}
            </div>
        );
    }
}

export function initScoreGuidePage() {
    ReactDOM.render(<ScoringGuidePage />, document.getElementById("react-container"));
}

