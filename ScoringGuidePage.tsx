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
import * as PageTabs from './PageTabs'

export interface State {
    searchParams: ItemModels.ScoreSearchParams;
    itemSearchResult: ApiModels.Resource<ItemCard.ItemCardViewModel[]>;
    selectedItem: ApiModels.Resource<AboutItem.AboutThisItem>;
    selectedRow?: ItemCard.ItemCardViewModel; // Show only MCRs with this row number. This doesn't refer to a single MCR.
    sorts: ItemTable.HeaderSort[];

    interactionTypes: ItemSearchDropdown.InteractionType[];
    subjects: ItemSearchDropdown.Subject[];
}

export interface Props {
    interactionTypes: ItemSearchDropdown.InteractionType[];
    subjects: ItemSearchDropdown.Subject[];
    apiClient: ItemsSearchClient;
}

interface ItemsSearchViewModel {
    interactionTypes: ItemSearchDropdown.InteractionType[];
    subjects: ItemSearchDropdown.Subject[];
}

export interface ItemsSearchClient {
    itemsSearch(params: ItemSearchDropdown.SearchAPIParams,
        onSuccess: (data: ItemCard.ItemCardViewModel[]) => void,
        onError?: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => any): any;
}

const client: ItemsSearchClient = {
    itemsSearch: (params, onSuccess, onError) => {
        $.ajax({
            dataType: "json",
            url: "/ScoringGuide/search",
            traditional: true, // causes arrays to be serialized in a way supported by MVC
            data: params,
            success: onSuccess,
            error: onError
        });
    }
};

export class ScoringGuidePage extends React.Component<Props, State> {
    private headerColumns = ItemTable.headerColumns;
    private dataTableRef: HTMLTableElement;

    constructor(props: Props) {
        super(props);
        this.state = {
            searchParams: {
                gradeLevels: GradeLevels.GradeLevels.NA,
                subjects: [],
                techType: []
            },
            itemSearchResult: { kind: "loading" },
            selectedItem: { kind: "loading" },
            sorts: [],

            subjects: props.subjects,
            interactionTypes: props.interactionTypes,
        }
    }

    //row is selected passed from item table
    onSelectItem = (item: ItemCard.ItemCardViewModel) => {
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

    onSearchSuccess(result: ItemCard.ItemCardViewModel[]) {
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

    onClickHeader = (col: ItemTable.SortColumn) => {
        const newSorts = (this.state.sorts || []).slice();
        const headIdx = newSorts.findIndex(hs => hs.col.header === col.header);
        if (headIdx !== -1) {
            const newSort = Object.assign({}, newSorts[headIdx]);
            if (newSort.direction == ItemTable.SortDirection.Ascending) {
                newSort.direction = ItemTable.SortDirection.Descending;
            }
            else if (newSort.direction == ItemTable.SortDirection.Descending) {
                newSort.direction = ItemTable.SortDirection.NoSort;
            }
            else {
                newSort.direction = ItemTable.SortDirection.Ascending;
            }

            newSorts[headIdx] = newSort;
        } else {
            const newSort: ItemTable.HeaderSort = {
                col: col,
                direction: ItemTable.SortDirection.Ascending,
                resetSortCount:0
            };
            newSorts.push(newSort);
        }
        this.setState({ sorts: newSorts });
    }

    invokeMultiSort(lhs: ItemCard.ItemCardViewModel, rhs: ItemCard.ItemCardViewModel): number {
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
    getTableData(data: ItemCard.ItemCardViewModel[]): ItemCard.ItemCardViewModel[] {
        const sortedData = this.state.sorts && this.state.sorts.length !== 0
            ? data.sort((lhs, rhs) => this.invokeMultiSort(lhs, rhs))
            : data;

        return sortedData;
    }

    onSearch(results: ItemCard.ItemCardViewModel[]) {
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
            ItemCard.itemPageLink(searchResult.bankKey, searchResult.itemKey);
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

        this.props.apiClient.itemsSearch(params, this.onSearch.bind(this), this.onError.bind(this));
    }
    renderSearchControls(isLoading: boolean) {
        return (
            <div className="search-controls">
                <a>Print Items</a>
                <ItemSearchDropdown.ItemSearchDropdown
                    interactionTypes={this.state.interactionTypes}
                    subjects={this.state.subjects}
                    onChange={(params) => this.beginSearch(params)}
                    selectSingleResult={() => this.selectSingleResult()}
                    isLoading={isLoading} />
            </div>
        );
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

                        <ItemTable.HeaderTable
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

export function initializePage(viewModel: ItemsSearchViewModel) {
    const container = document.getElementById("react-container");
    ReactDOM.render(<ScoringGuidePage apiClient={client} {...viewModel}  />, container);
}