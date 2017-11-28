import * as React from "react";
import "../Styles/basic-filter.less";
import {
  BasicFilterCategoryModel,
  FilterOptionModel
} from "./AdvancedFilterModel";
import { BasicFilter } from "./BasicFilter";

export interface BasicFilterContainerProps {
  filterOptions: BasicFilterCategoryModel[];
  onClick: (selected: BasicFilterCategoryModel[]) => void;
  containsAdvancedFilter: boolean;
  handleAdvancedFilterExpand: () => void;
}

export interface BasicFilterContainerState {
  expanded?: boolean;
}

export class BasicFilterContainer extends React.Component<
  BasicFilterContainerProps,
  BasicFilterContainerState
> {
  constructor(props: BasicFilterContainerProps) {
    super(props);

    this.state = {
      expanded: this.props.containsAdvancedFilter ? false : true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  //multiSelect not an option right now.
  onSelect(category: BasicFilterCategoryModel, option?: FilterOptionModel) {
    const index = this.props.filterOptions.indexOf(category);
    const newFilters = [...this.props.filterOptions];
    let newOptions: FilterOptionModel[] = [];

    if (option) {
      const optionIdx = newFilters[index].filterOptions.indexOf(option);
      newOptions = newFilters[index].filterOptions.map(opt => ({
        ...opt,
        isSelected: false
      }));

      newOptions[optionIdx].isSelected = !option.isSelected;

      newFilters[index] = {
        ...newFilters[index],
        filterOptions: newOptions
      };
    }
    this.props.onClick(newFilters);
  }

  resetFilters() {
    const newFilters = this.props.filterOptions;
    newFilters.forEach(cate => {
      cate.filterOptions.map(opt => (opt.isSelected = false));
    });
    this.props.onClick(newFilters);
  }

  keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
    if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
      this.resetFilters();
    }
  }

  renderFilters() {
    const filterTags = this.props.filterOptions.map((fil, i) => {
      return (
        <BasicFilter
          key={i}
          {...fil}
          selectedHandler={opt => this.onSelect(fil, opt)}
        />
      );
    });

    return filterTags;
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
    this.props.handleAdvancedFilterExpand();
  }

  render() {
    const { filterOptions, containsAdvancedFilter } = this.props;
    const { expanded } = this.state;
    let advancedFilterButton = null;

    // if the component is being used in conjunction
    // with the AdvancedFilterContainer we handle expanding it here
    if (containsAdvancedFilter) {
      advancedFilterButton = (
        <div className="basic-filter-button-container">
          <div>Advanced Filters</div>
          <button className="filter-button" onClick={this.handleClick}>
            {expanded ? "Hide" : "Show"}&nbsp;
            <span className={`fa fa-chevron-${expanded ? "down" : "right"}`} />
          </button>
        </div>
      );
    }
    let className = "basic-filter-container";
    if (expanded) {
      className = "basic-filter-container-expanded";
    }

    return (
      <div className={className}>
        <div className="basic-filter">{this.renderFilters()}</div>
        {advancedFilterButton}
      </div>
    );
  }
}
