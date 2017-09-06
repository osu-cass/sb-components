import * as React from 'react'
import * as ItemTableHeader from './ItemTableHeader'
import * as ItemTable from './ItemTable'
import * as ApiModels from './ApiModels'
import * as ItemCardViewModel from './ItemCardViewModel'
import * as AboutItem from './AboutItem'
import * as GradeLevels from "./GradeLevels";
import { get } from "./ApiModels";
import { ItemsSearchViewModel } from "./ItemPageSearch";
import * as ItemModels from './ItemModels';
import * as ItemSearchDropdown from './ItemSearchDropdown';



const SearchClient = (params: ItemSearchDropdown.SearchAPIParams) => get<ItemCardViewModel.ItemCardViewModel[]>("http://is-score.cass.oregonstate.edu/ScoringGuide/Search", params);

export interface Props {
    onRowSelection: (item: {itemKey: number; bankKey: number}) => void;
    scoringGuideViewModel?: ItemsSearchViewModel; //what do we need this for in this file?
}

export interface State {
    searchParams: ItemModels.ScoreSearchParams; //nah dawg 
    sorts: ItemTableHeader.HeaderSort[]; //should this be state?
    itemSearchResult: ApiModels.Resource<ItemCardViewModel.ItemCardViewModel[]>; //I've been asking myself that.  I think there are a few things messed up about the design
    selectedRow?: ItemCardViewModel.ItemCardViewModel; //I did not like this implementation but whatever
    
}
export class ItemPageTable extends React.Component<Props, State>{
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
            itemSearchResult: { kind: "none" },
            sorts: [],
        }

        //court, add the search method to get items. 

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

    onSelectItem = (item: ItemCardViewModel.ItemCardViewModel) => {
        this.setState({
            selectedRow: item
        });
        const card = {itemKey: item.itemKey, bankKey: item.bankKey}

        this.props.onRowSelection(card);
     
    };

  

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

    getTableData(data: ItemCardViewModel.ItemCardViewModel[]): ItemCardViewModel.ItemCardViewModel[] {
        const sortedData = this.state.sorts && this.state.sorts.length !== 0
            ? data.sort((lhs, rhs) => this.invokeMultiSort(lhs, rhs))
            : data;

        return sortedData;
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
        const result = this.state.itemSearchResult;
        let resultElement: JSX.Element[] | JSX.Element | undefined;
        if (result.kind == "success" || result.kind == "reloading") {
            if (result.content == null || result.content.length === 0) {
                resultElement = <span className="placeholder-text" role="alert">No results found for the given search terms.</span>
            } else {
                return (
                    <ItemTable.DataTable
                        mapRows={this.getTableData(result.content)}
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

    render() {
        return (
            <div>
                {this.renderTableHeader()};
                {this.renderTable()};
            </div>
        );
    }
}
