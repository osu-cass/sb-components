import * as React from "react";
import { AdvancedFilterCategoryModel, FilterOptionModel } from "./FilterModels";

export interface SelectedFilterIndicatorProps {
  category: AdvancedFilterCategoryModel;
  option: FilterOptionModel;
  onClick: () => void;
}
export const SelectedFilterIndicator: React.SFC<
  SelectedFilterIndicatorProps
> = ({ category, option, onClick }) => {
  return (
    <div className="btn btn-blue filter-btn filter-selection">
      <strong>{category.label}&nbsp;</strong>
      {option.label}&nbsp;
      <span onClick={onClick} className="fa fa-times-circle fa-small" />
    </div>
  );
};
