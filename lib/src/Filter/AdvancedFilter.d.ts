import * as React from "react";
import { AdvancedFilterCategoryModel, FilterOptionModel } from "./FilterModels";
export interface AdvancedFilterProps extends AdvancedFilterCategoryModel {
    onFilterOptionSelect: (data?: FilterOptionModel) => void;
}
export declare class AdvancedFilter extends React.Component<AdvancedFilterProps, {}> {
    constructor(props: AdvancedFilterProps);
    renderAllBtnContainer(): JSX.Element | undefined;
    renderTags(): JSX.Element[];
    render(): JSX.Element | null;
}
