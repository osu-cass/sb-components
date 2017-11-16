import * as React from "react";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { Resource } from "../ApiModel";
import {
  HeaderSort,
  SortColumn,
  SortDirection,
  headerColumns
} from "./ItemTableModels";
import { HeaderTable } from "./ItemTableHeader";
import { ItemTable } from "./ItemTable";

export interface ItemTableContainerProps {
  onRowSelection: (
    item: { itemKey: number; bankKey: number },
    reset: boolean
  ) => void;
  itemCards?: ItemCardModel[];
  item: Resource<AboutItemModel>;
}

export interface ItemTableContainerState {
  sorts: HeaderSort[];
  selectedRow?: ItemCardModel;
}

export class ItemTableContainer extends React.Component<
  ItemTableContainerProps,
  ItemTableContainerState
> {
  private pageHeaderColumns = headerColumns;

  constructor(props: ItemTableContainerProps) {
    super(props);
    this.state = {
      sorts: []
    };
  }

  onClickHeader = (col: SortColumn) => {
    const newSorts = (this.state.sorts || []).slice();
    const headIdx = newSorts.findIndex(hs => hs.col.header === col.header);
    if (headIdx !== -1) {
      const newSort = Object.assign({}, newSorts[headIdx]);
      if (newSort.direction == SortDirection.Ascending) {
        newSort.direction = SortDirection.Descending;
      } else if (newSort.direction == SortDirection.Descending) {
        newSort.direction = SortDirection.NoSort;
      } else {
        newSort.direction = SortDirection.Ascending;
      }
      newSorts[headIdx] = newSort;
    } else {
      const newSort: HeaderSort = {
        col: col,
        direction: SortDirection.Ascending,
        resetSortCount: 0
      };
      newSorts.push(newSort);
    }
    this.setState({ sorts: newSorts });
  };

  onSelectItem = (item: ItemCardModel) => {
    const card = { itemKey: item.itemKey, bankKey: item.bankKey };
    if (item === this.state.selectedRow) {
      this.props.onRowSelection(card, true);
      this.setState({ selectedRow: undefined });
    } else {
      this.props.onRowSelection(card, false);
      this.setState({ selectedRow: item });
    }
  };

  invokeMultiSort(lhs: ItemCardModel, rhs: ItemCardModel): number {
    const sorts = this.state.sorts || [];
    for (const sort of sorts) {
      const diff = sort.col.compare(lhs, rhs) * sort.direction;
      if (diff !== 0) {
        return diff;
      }
    }
    return 0;
  }

  getTableData = (): ItemCardModel[] | undefined => {
    let data = this.props.itemCards;
    if (data != undefined) {
      data =
        this.state.sorts && this.state.sorts.length !== 0
          ? data.sort((lhs, rhs) => this.invokeMultiSort(lhs, rhs))
          : data;
    }
    return data;
  };

  renderTableHeader() {
    return (
      <HeaderTable
        sorts={this.state.sorts}
        onHeaderClick={this.onClickHeader}
        columns={this.pageHeaderColumns}
      />
    );
  }

  renderTable() {
    const itemCards = this.getTableData(); //this returns undefined but in the method it has data. that's w
    let content = (
      <span className="placeholder-text" role="alert">
        No results found for the given search terms.
      </span>
    );
    if (itemCards != undefined) {
      //if no items are returned we want to return a friendly message
      if (itemCards.length !== 0) {
        content = (
          <ItemTable
            mapRows={itemCards}
            rowOnClick={this.onSelectItem}
            sort={this.state.sorts}
            columns={this.pageHeaderColumns}
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
