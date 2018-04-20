import * as React from "react";
import { AdvancedFilterCategoryModel, FilterOptionModel } from "./FilterModels";
export interface SelectedFilterIndicatorProps {
    category: AdvancedFilterCategoryModel;
    option: FilterOptionModel;
    onClick: () => void;
}
export declare const SelectedFilterIndicator: React.SFC<SelectedFilterIndicatorProps>;
