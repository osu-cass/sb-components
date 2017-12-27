import * as React from "react";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { Resource } from "../ApiModel";
import { ItemTableContainer } from "../ItemTable/ItemTableContainer";
import { ItemModel } from "../ItemPage/ItemPageModels";
import { ItemCard } from "../ItemCard/ItemCard";

/**
 * SearchResultType enum
 * @enum {number}
 */
export enum SearchResultType {
  Table,
  ItemCard
}

/**
 * SearchResultContainerProps props
 * @interface SearchResultContainerProps
 * @method {(item: { itemKey: number; bankKey: number },reset: boolean) => void} onRowSelection
 * @member {ItemCardModel[]?} itemCards
 * @member {Resource<AboutItemModel>} item
 * @member {SearchResultType} defaultRenderType
 */
export interface SearchResultContainerProps {
  onRowSelection: (item: ItemModel, reset: boolean) => void;
  onItemSelection: (item: ItemCardModel) => void;
  itemCards?: ItemCardModel[];
  item: Resource<AboutItemModel>;
  defaultRenderType?: SearchResultType;
}

/**
 * SearchResultContainerState state
 * @interface SearchResultContainerState
 * @member {SearchResultType} renderType
 */
export interface SearchResultContainerState {
  renderType: SearchResultType;
}

/**
 * The SearchResultContainer is a toggleable display/menu that changes search
 * results from a table layout to ItemCard and vice versa.
 * @class SearchResultContainer
 * @extends {React.Component<SearchResultContainerProps, SearchResultContainerState>}
 */
export class SearchResultContainer extends React.Component<
  SearchResultContainerProps,
  SearchResultContainerState
> {
  constructor(props: SearchResultContainerProps) {
    super(props);
    this.state = {
      renderType: props.defaultRenderType
        ? props.defaultRenderType
        : SearchResultType.Table
    };
  }

  /**
   * Renders all results to ItemCard view.
   */
  renderItemCards(): JSX.Element[] | undefined {
    let tags: JSX.Element[] | undefined;

    if (this.props.itemCards) {
      tags = this.props.itemCards.map(digest => (
        <ItemCard {...digest} key={`${digest.bankKey} - ${digest.itemKey}`} />
      ));
    }

    return tags;
  }

  /**
   * Depending on what renderType is selected, ItemCards or a table
   * will be rendered.
   */
  renderBody(): JSX.Element {
    let tag: JSX.Element | JSX.Element[] | undefined;

    if (this.state.renderType === SearchResultType.Table) {
      tag = <ItemTableContainer {...this.props} />;
    } else {
      tag = this.renderItemCards();
    }

    return <div className="search-result-body">{tag}</div>;
  }

  handleTypeChange = (searchType: SearchResultType): void => {
    this.setState({ renderType: searchType });
  };

  /**
   * Renders button toggle for changing the layout to cards or table
   * @param {SearchResultType} viewType
   * @returns {JSX.Element} button toggle
   */
  renderToggle(viewType: SearchResultType): JSX.Element {
    const { renderType } = this.state;
    const className = renderType === viewType ? "btn-primary" : "btn-white";
    let label = "";
    let iconClass = "";

    if (viewType === SearchResultType.Table) {
      label = "table view toggle";
      iconClass = "fa fa-table";
    } else if (viewType === SearchResultType.ItemCard) {
      label = "item card view toggle";
      iconClass = "fa fa-book";
    }

    return (
      <button
        aria-label={label}
        className={`btn ${className}`}
        value={viewType}
        onClick={() => this.handleTypeChange(viewType)}
      >
        <i aria-hidden="true" className={iconClass} />
      </button>
    );
  }

  /**
   * Renders toggle buttons for changing the layout to table and item card
   */
  renderHeader(): JSX.Element {
    return (
      <div className="search-result-header">
        {this.renderToggle(SearchResultType.Table)}
        {this.renderToggle(SearchResultType.ItemCard)}
      </div>
    );
  }

  /**
   * Returns a wrapper of items displayed as a table or card view
   * @returns default render method
   */
  render() {
    return (
      <div className="search-result-container">
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}
