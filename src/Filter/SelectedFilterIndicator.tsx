import * as React from "react";
import { AdvancedFilterCategoryModel, FilterOptionModel } from "./FilterModels";

export interface SelectedFilterIndicatorProps {
  category: AdvancedFilterCategoryModel;
  option: FilterOptionModel;
  onClick: () => void;
}
export const SelectedFilterIndicator: React.SFC<
  SelectedFilterIndicatorProps
> = props => {
  return (
    <button
      role="button"
      onClick={props.onClick}
      className="btn tag tag-sm aqua reverse"
    >
      <strong>{props.option.label}&nbsp;</strong>
      {props.category.label}&nbsp;
      <span className="fa fa-times-circle fa-small" />
    </button>
  );
};
