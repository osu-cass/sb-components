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
    <div className="btn btn-blue filter-btn filter-selection">
      <strong>{props.option.label}&nbsp;</strong>
      {props.category.label}&nbsp;
      <span onClick={props.onClick} className="fa fa-times-circle fa-small" />
    </div>
  );
};
