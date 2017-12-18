import * as React from "react";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { Resource } from "../ApiModel";
import { ItemTableContainer } from "../ItemTable/ItemTableContainer";
import { ItemCard } from "../ItemCard/ItemCard";

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

  renderTag() {
    let tag: JSX.Element | JSX.Element[] | undefined;
    if (this.state.renderType === SearchResultType.Table) {
      tag = <ItemTableContainer {...this.props} />;
    } else {
      tag = this.renderItemCards();
    }
    return tag;
  }

  render() {
    return (
      <div className="search-result-container">
        <div className="search-result-header">toggleable controls here</div>
        {this.renderTag()}
      </div>
    );
  }
}
