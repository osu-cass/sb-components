import * as React from "react";
import {
  HeaderSortModel,
  SortColumnModel,
  SortDirection,
  headerColumns,
  ColumnGroup,
  ItemModel,
  HeaderTable,
  ItemTable,
  Resource,
  ItemCardModel,
  AboutItemModel
} from "@src/index";

/**
 * Properties for ItemTableContainer
 * @interface ItemTableContainerProps
 */

export interface ItemTableContainerProps {
  onRowSelection: (item: ItemModel, reset: boolean) => void;
  onItemSelection: (item: ItemCardModel) => void;
  itemCards?: ItemCardModel[];
  item?: Resource<AboutItemModel>;
  isLinkTable: boolean;
}

/**
 * State object interface for ItemTableContainer
 * @interface ItemTableContainerState
 */
export interface ItemTableContainerState {
  sorts: HeaderSortModel[];
  expandedRow?: ItemCardModel;
}
/**
 * Container for a table of Items that can be sorted by clicking on a table header.
 * When an item is clicked, it displays an iframe of that question.
 */
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

  /**
   * On header click, the column that was clicked will be added to the
   * sorts array in state or its sort status will be removed.
   * @memberOf {ItemTableContainer}
   * @function {onClickHeader}
   * @param {ColumnGroup} col
   */
  onClickHeader = (col: ColumnGroup) => {
    const sortCheck = (this.state.sorts || []).slice();
    const unmatchFound = sortCheck.findIndex(
      hs => hs.col.header !== col.header
    );
    const newSortModel: HeaderSortModel = {
      col,
      direction: SortDirection.NoSort,
      resetSortCount: 0
    };
    if (unmatchFound > -1) {
      this.state = {
        sorts: [newSortModel]
      };
    }
    const newSorts = (this.state.sorts || []).slice();
    const headIdx = newSorts.findIndex(hs => hs.col.header === col.header);

    if (headIdx !== -1) {
      const newSort = { ...newSorts[headIdx] };
      if (newSort.direction === SortDirection.Ascending) {
        newSort.direction = SortDirection.Descending;
      } else if (newSort.direction === SortDirection.Descending) {
        newSort.direction = SortDirection.NoSort;
      } else {
        newSort.direction = SortDirection.Ascending;
      }
      newSorts[headIdx] = newSort;
    } else {
      const newSort: HeaderSortModel = {
        col,
        direction: SortDirection.Ascending,
        resetSortCount: 0
      };
      newSorts.push(newSort);
    }
    this.setState({ sorts: newSorts });
  };

  /**
   * Sets the state with the currently selected item or removes
   * the selection from the item and removes it from state.
   * @function {handleExpandItem}
   * @param {ItemCardModel} item
   */
  handleExpandItem = (item: ItemCardModel) => {
    const card = { itemKey: item.itemKey, bankKey: item.bankKey };
    if (item === this.state.expandedRow) {
      this.props.onRowSelection(card, true);
      this.setState({ expandedRow: undefined });
    } else {
      this.props.onRowSelection(card, false);
      this.setState({ expandedRow: item });
    }
  };

  handleSelectItem = (item: ItemCardModel) => {
    this.props.onItemSelection(item);
  };
  /**
   * Sorts two ItemCardModels on the property specified by the sort parameter
   * @param {HeaderSortModel} sort
   * @param {ItemCardModel} lhs
   * @param {ItemCardModel} rhs
   */
  invokeMultiSort(
    sort: HeaderSortModel,
    lhs: ItemCardModel,
    rhs: ItemCardModel
  ): number {
    return sort.col.compare(lhs, rhs) * sort.direction;
  }
  /**
   * Sorts the data that is shown in the table on each of the 'sorts' that are
   * stored in state.
   * @function {getTableData}
   */
  getTableData = (): ItemCardModel[] | undefined => {
    const sorts = this.state.sorts || [];
    let itemCards = (this.props.itemCards || []).slice();
    sorts.forEach(sort => {
      itemCards = itemCards.sort((lhs, rhs) =>
        this.invokeMultiSort(sort, lhs, rhs)
      );
    });

    return itemCards;
  };

  /**
   * Renders the HeaderTable component, the header to the ItemTable
   * @function {renderTableHeader}
   */
  renderTableHeader() {
    return (
      <HeaderTable
        sorts={this.state.sorts}
        onHeaderClick={this.onClickHeader}
        columns={this.pageHeaderColumns}
        isLinkTable={this.props.isLinkTable}
      />
    );
  }

  /**
   * Renders the ItemTable component
   * @function {renderTable}
   */
  renderTable() {
    const itemCards = this.getTableData(); // this returns undefined but in the method it has data. that's w
    let content = (
      <span className="placeholder-text" role="alert">
        No results found for the given search terms.
      </span>
    );
    if (itemCards !== undefined) {
      // if no items are returned we want to return a friendly message
      if (itemCards.length !== 0) {
        content = (
          <ItemTable
            cardRows={itemCards}
            onRowExpand={this.handleExpandItem}
            onRowSelect={this.handleSelectItem}
            sort={this.state.sorts}
            columns={this.pageHeaderColumns}
            expandedRow={this.state.expandedRow}
            item={this.props.item}
            isLinkTable={this.props.isLinkTable}
          />
        );
      }
    }

    return content;
  }

  render() {
    return (
      <div className="section item-table-container">
        <table className={this.props.isLinkTable ? "link-table" : "item-table"}>
          {this.renderTableHeader()}
          {this.renderTable()}
        </table>
      </div>
    );
  }
}
