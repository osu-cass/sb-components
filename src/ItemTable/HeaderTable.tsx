import * as React from "react";
import {
  SortColumnModel,
  HeaderSortModel,
  SortDirection,
  ColumnGroup
} from "../index";

/**
 * Properties for HeaderTable component
 * @interface HeaderTableProps
 */
export interface HeaderTableProps {
  columns: ColumnGroup[];
  onHeaderClick: (header: ColumnGroup) => void;
  sorts: HeaderSortModel[];
  isLinkTable: boolean;
}

const invokeResetSortLimit = 2;

const style = {
  color: "gray"
};

const descendingArrow = (
  <span style={style} className="fa fa-sort-desc" aria-hidden="true" />
);

const ascendingArrow = (
  <span style={style} className="fa fa-sort-asc" aria-hidden="true" />
);

const noSort = <span style={style} className="fa fa-sort" aria-hidden="true" />;

/**
 * HeaderTable creates a table header based on the passed in columns
 * The HeaderTable, when clicked, will add the clicked column header
 * the parent, ItemTableContainer, state, sorting the table
 */
export class HeaderTable extends React.Component<HeaderTableProps, {}> {
  constructor(props: HeaderTableProps) {
    super(props);
  }
  /**
   * Send the clicked sort column to the parent to be added to the sorts list
   * using onHeaderClick prop.
   * @param {ColumnGroup} sCol
   * @param {(HeaderSortModel | undefined)} hCol
   */
  headerClickHandler = (sCol: ColumnGroup, hCol?: HeaderSortModel) => {
    this.props.onHeaderClick(sCol);
  };

  /**
   * Send the clicked sort column to the parent to be added to the sorts list
   * using onHeaderClick prop.
   * @param {React.KeyboardEvent<any>} e
   * @param {HeaderColumnModel} sCol
   * @param {(HeaderSortModel | undefined)} hCol
   */
  headerKeyUpHandler = (
    e: React.KeyboardEvent<HTMLTableHeaderCellElement>,
    sCol: ColumnGroup,
    hCol?: HeaderSortModel
  ) => {
    if (e.keyCode === 13) {
      this.props.onHeaderClick(sCol);
    }
  };

  /**
   * Assigns an ascending or descending arrow character to the visible column
   * header when clicked, denoting how it is sorted
   * @param {(HeaderSortModel | undefined)} headerSort
   * @returns {JSX.Element}
   */
  setDirElem(headerSort: HeaderSortModel | undefined): JSX.Element {
    let dirElem = noSort;
    if (!headerSort) {
      return dirElem;
    } else if (headerSort.direction === SortDirection.Ascending) {
      dirElem = ascendingArrow;
    } else if (headerSort.direction === SortDirection.Descending) {
      dirElem = descendingArrow;
    }

    return dirElem;
  }

  /**
   * Renders a single table header element and the corresponding ascending, descending,
   * or 'not-sorted' symbol
   * @param {ColumnGroup} col
   * @returns {JSX.Element}
   */
  renderHeader(col: ColumnGroup): JSX.Element {
    const headerSort = this.props.sorts.find(
      hs => hs.col.header === col.header
    );
    if (headerSort) {
      this.setDirElem(headerSort);
    }

    return (
      <th
        key={col.header}
        className={col.headerClassName}
        onClick={() => this.headerClickHandler(col, headerSort)}
        onKeyUp={e => this.headerKeyUpHandler(e, col, headerSort)}
        tabIndex={0}
        scope="col"
      >
        <div className={col.headerClassName}>
          <span>{col.header}</span>
          {this.setDirElem(headerSort)}
        </div>
      </th>
    );
  }

  render() {
    return (
      <thead>
        <tr className="primary">
          {this.props.isLinkTable ? undefined : <td colSpan={2} />}
          {this.props.columns.map(col => this.renderHeader(col))}
        </tr>
      </thead>
    );
  }
}
