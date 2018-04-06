import { SearchResultContainerProps, SearchResultType } from "@src/index";
import { itemCardList } from "@mocks/index";

export const mockSearchResultCardProps: SearchResultContainerProps = {
  isLinkTable: true,
  onRowSelection: () => {
    return;
  },
  onItemSelection: () => {
    return;
  },
  itemCards: itemCardList,
  item: {
    kind: "none"
  },
  defaultRenderType: SearchResultType.ItemCard
};

export const mockSearchResultTableProps: SearchResultContainerProps = {
  ...mockSearchResultCardProps,
  defaultRenderType: SearchResultType.Table
};

export const mockSearchResultEmptyProps: SearchResultContainerProps = {
  ...mockSearchResultCardProps,
  itemCards: undefined,
  item: {
    kind: "none"
  },
  defaultRenderType: SearchResultType.ItemCard
};
