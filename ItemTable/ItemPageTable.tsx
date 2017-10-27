import * as React from 'react'
import * as ItemTableHeader from './ItemTableHeader'
import * as ItemTable from './ItemTable'
import * as ItemCardViewModel from '../Models/ItemCardViewModel'
import * as GradeLevels from "../Models/GradeLevels";
import { ItemsSearchViewModel } from "../ScoreGuide/ItemSearchContainer";
import * as ItemModels from '../Models/ItemModels';
import * as AboutItemVM from '../Models/AboutItemVM';
import * as ApiModels from '../Models/ApiModels';

export interface Props {
    onRowSelection: (item: { itemKey: number; bankKey: number }, reset: boolean) => void;
    itemCards?: ItemCardViewModel.ItemCardViewModel[];
    item: ApiModels.Resource<AboutItemVM.AboutThisItem>;
}

export interface State {
    sorts: ItemTableHeader.HeaderSort[];
    selectedRow?: ItemCardViewModel.ItemCardViewModel | null;
}

export class ItemPageTable extends React.Component<Props, State>{
    private headerColumns = ItemTableHeader.headerColumns;
    private dataTableRef: HTMLTableElement;

    constructor(props: Props) {
        super(props);
        this.state = {
            sorts: [],
            selectedRow: null
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
        const card = { itemKey: item.itemKey, bankKey: item.bankKey }
        if(item === this.state.selectedRow){
            this.props.onRowSelection(card, true)
            this.setState({selectedRow: null})
        }else{
            this.props.onRowSelection(card, false)
            this.setState({selectedRow: item})
        }
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
        if (data != undefined) {
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
        let content = (<span className="placeholder-text" role="alert">No results found for the given search terms.</span>);
        if (itemCards != undefined) {
            //if no items are returned we want to return a friendly message
            if (itemCards.length !== 0) {
                content = (
                    <ItemTable.DataTable
                        mapRows={itemCards}
                        rowOnClick={this.onSelectItem}
                        sort={this.state.sorts}
                        tableRef={ref => this.dataTableRef = ref}
                        columns={this.headerColumns}
                        selectedRow={this.state.selectedRow}
                        item={this.props.item}
                    />
                );
            }
        }
        return content;
    }

    render() {
        return (
            <div>
                <table className="item-table mapcomponent-table">
                    {this.renderTableHeader()}
                    {this.renderTable()}
                </table>
            </div>
        );
    }
}
