import * as React from "react";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { Resource } from "../ApiModel";
import { ItemTableContainer } from "../ItemTable/ItemTableContainer";
import { ItemCard } from "../ItemCard/ItemCard";
import "../Assets/Styles/search-result-container.less";

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
  onRowSelection: (
    item: { itemKey: number; bankKey: number },
    reset: boolean
  ) => void;
  itemCards?: ItemCardModel[];
  item: Resource<AboutItemModel>;
  defaultRenderType: SearchResultType;
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
 * The SearchResultContainer is a togglable display/menu that changes search
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
    };
  }

  /**
   * Renders all results to ItemCard view.
   */
  renderItemCards() {
    let tags: JSX.Element[] | undefined;

    if (this.props.itemCards) {
      tags = this.props.itemCards.map(digest => (
        <ItemCard
          {...digest}
          key={digest.bankKey.toString() + "-" + digest.itemKey.toString()}
        />
      ));
    }

    return tags;
  }

  /**
   * Depending on what renderType is selected, ItemCards or a table
   * will be rendered.
   */
  renderBody() {
    let tag: JSX.Element | JSX.Element[] | undefined;

    if (this.state.renderType === SearchResultType.Table) {
      tag = <ItemTableContainer {...this.props} />;
    } else {
      tag = this.renderItemCards();
    }

    return <div className="search-result-body">{tag}</div>;
  }

  /**
   * Handles the chage from one view to another.
   * @param {React.MouseEvent<HTMLButtonElement>} e
   */
  renderTypeHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const btnValue = Number(e.currentTarget.value);

    this.setState({ renderType: btnValue });
  }

  /**
   * Renders togglable buttons for view state.
   */
  renderHeader() {
    return (
      <div className="search-result-header">
        <button
          className={
            "btn " +
            (this.state.renderType === SearchResultType.Table
              ? "btn-primary"
              : "btn-white")
          }
          value={SearchResultType.Table}
          onClick={this.renderTypeHandler.bind(this)}
        >
          <i aria-hidden="true" className="fa fa-table" />
        </button>
        <button
          className={
            "btn " +
            (this.state.renderType === SearchResultType.ItemCard
              ? "btn-primary"
              : "btn-white")
          }
          value={SearchResultType.ItemCard}
          onClick={this.renderTypeHandler.bind(this)}
        >
          <i aria-hidden="true" className="fa fa-book" />
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="search-result-container">
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}
