import * as React from "react";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { Resource } from "../ApiModel";
import { ItemTableContainer } from "../ItemTable/ItemTableContainer";

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
    let tag: JSX.Element | JSX.Element[] | undefined;
    if (this.props.itemCards && this.props.itemCards.length === 0) {
    }
  }

  renderTag() {
    let tag: JSX.Element | JSX.Element[] | undefined;
    if (this.state.renderType === SearchResultType.Table) {
      tag = <ItemTableContainer {...this.props} />;
    } else {
    }
    return tag;
  }

  render() {
    return <div className="search-result-container">{this.renderTag()}</div>;
  }
}
