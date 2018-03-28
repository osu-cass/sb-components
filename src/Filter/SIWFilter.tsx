import * as React from "react";
import {
  AdvancedFilterContainer,
  BasicFilterContainer,
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel,
  FilterOptionModel,
  FilterType
} from "@src/index";

export interface SIWFilterProps {
  basicFilterCategories: BasicFilterCategoryModel[];
  onUpdateBasicFilter: (
    selected: BasicFilterCategoryModel[],
    changed: FilterType
  ) => void;
  filterId?: string;
}

export class SIWFilter extends React.Component<SIWFilterProps, {}> {
  render() {
    const { basicFilterCategories, onUpdateBasicFilter, filterId } = this.props;
    const id = filterId || "";

    return (
      <div className="filter-component-wrapper">
        <BasicFilterContainer
          filterId={filterId}
          filterCategories={basicFilterCategories}
          onUpdateFilter={onUpdateBasicFilter}
          containsAdvancedFilter={false}
          handleAdvancedFilterExpand={() => {
            return;
          }}
        />
      </div>
    );
  }
}
