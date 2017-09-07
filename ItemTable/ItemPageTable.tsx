import * as React from 'react'
import * as ItemTableHeader from './ItemTableHeader'
import * as ItemTable from './ItemTable'
import * as ItemCardViewModel from '../Models/ItemCardViewModel'
import * as GradeLevels from "../Models/GradeLevels";
import { ItemsSearchViewModel } from "../ScoreGuide/ItemSearchContainer";
import * as ItemModels from '../Models/ItemModels';
import * as ItemSearchDropdown from '../DropDown/ItemSearchDropdown';


export interface Props {
    onRowSelection: (item: {itemKey: number; bankKey: number}) => void;
    itemCards?: ItemCardViewModel.ItemCardViewModel[]; 
}

export interface State {
    sorts: ItemTableHeader.HeaderSort[]; 
    selectedRow?: ItemCardViewModel.ItemCardViewModel; 
    
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
    getTableData = (): ItemCardViewModel.ItemCardViewModel[] | undefined => {
        let data = this.props.itemCards; 
        if(data != undefined){
            data = this.state.sorts && this.state.sorts.length !== 0
                ? data.sort((lhs, rhs) => this.invokeMultiSort(lhs, rhs))
                : data;
        }
        return data; 
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
        const itemCards = this.getTableData(); //this returns undefined but in the method it has data. that's w
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
