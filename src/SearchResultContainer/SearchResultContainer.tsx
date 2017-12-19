import * as React from "react";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { Resource } from "../ApiModel";
import { ItemTableContainer } from "../ItemTable/ItemTableContainer";
import { ItemCard } from "../ItemCard/ItemCard";
import "../Assets/Styles/search-result-container.less";

export enum SearchResultType {
  Table,
  ItemCard
}

export interface SearchResultContainerProps {
  onRowSelection: (
    item: { itemKey: number; bankKey: number },
    reset: boolean
  ) => void;
  itemCards?: ItemCardModel[];
  item: Resource<AboutItemModel>;
  defaultRenderType: SearchResultType;
}

export interface SearchResultContainerState {
  renderType: SearchResultType;
}

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

  renderBody() {
    let tag: JSX.Element | JSX.Element[] | undefined;

    if (this.state.renderType === SearchResultType.Table) {
      tag = <ItemTableContainer {...this.props} />;
    } else {
      tag = this.renderItemCards();
    }

    return <div className="search-result-body">{tag}</div>;
  }

  renderTypeHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const btnValue = Number(e.currentTarget.value);

    this.setState({ renderType: btnValue });
  }

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
