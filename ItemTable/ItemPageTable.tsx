import * as React from 'react'
import * as ItemTableHeader from './ItemTableHeader'
import * as ItemTable from './ItemTable'
import * as ItemCardViewModel from './ItemCardViewModel'
import * as AboutItem from './AboutItem'
import * as GradeLevels from "./GradeLevels";
import { ItemsSearchViewModel } from "./ItemSearchContainer";
import * as ItemModels from './ItemModels';
import * as ItemSearchDropdown from './ItemSearchDropdown';


export interface Props {
    onRowSelection: (item: {itemKey: number; bankKey: number}) => void;
    itemCards?: ItemCardViewModel.ItemCardViewModel[]; //I've been asking myself that.  I think there are a few things messed up about the design
}

export interface State {
    sorts: ItemTableHeader.HeaderSort[]; //should this be state?
    selectedRow?: ItemCardViewModel.ItemCardViewModel; //I did not like this implementation but whatever
    
}

export class ItemPageTable extends React.Component<Props, State>{
    private headerColumns = ItemTableHeader.headerColumns;
    private dataTableRef: HTMLTableElement;

    constructor(props: Props) {
        super(props); 
        this.state = {
            sorts: []
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

    getTableData(): ItemCardViewModel.ItemCardViewModel[] | undefined {
        const data = this.props.itemCards; //we had a bad case here lol
        if(data != undefined){
            const sortedData = this.state.sorts && this.state.sorts.length !== 0
                ? data.sort((lhs, rhs) => this.invokeMultiSort(lhs, rhs))
                : data;
        }
        else{
            return undefined;
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
        const itemCards = this.getTableData();
        if (itemCards != undefined) {
            //if no items are returned we want to return a friendly message
            if (itemCards.length === 0) {
                return <span className="placeholder-text" role="alert">No results found for the given search terms.</span>
            } else {
                return (
                    <ItemTable.DataTable
                        mapRows={itemCards}
                        rowOnClick={this.onSelectItem}
                        sort={this.state.sorts}
                        tableRef={ref => this.dataTableRef = ref}
                        columns={this.headerColumns}
                        selectedRow={this.state.selectedRow} />
                );
            }
        }
        return <span className="placeholder-text" role="alert">No results found for the given search terms.</span>
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
