import * as React from "react";
import "../Assets/Styles/basic-filter.less";
import { BasicFilterCategoryModel, FilterOptionModel } from "./FilterModels";
import { BasicFilter } from "./BasicFilter";

export interface BasicFilterContainerProps {
  filterCategories: BasicFilterCategoryModel[];
  onUpdateFilter: (selected: BasicFilterCategoryModel[]) => void;
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

  onFilterSelect(
    category: BasicFilterCategoryModel,
    option?: FilterOptionModel
  ) {
    const index = this.props.filterCategories.indexOf(category);
    let { filterCategories } = this.props;
    if (!category.disabled) {
      if (option !== undefined) {
        let newOptions = filterCategories[index].filterOptions.slice();
        const optionIdx = filterCategories[index].filterOptions.indexOf(option);
        newOptions = filterCategories[index].filterOptions.map(opt => ({
          ...opt,
          isSelected: false
        }));

        newOptions[optionIdx].isSelected = !option.isSelected;
        filterCategories[index].filterOptions = newOptions;
        this.props.onUpdateFilter(filterCategories);
      }
    }
  }

  resetFilters() {
    const { filterCategories, onUpdateFilter } = this.props;
    filterCategories.forEach(category => {
      category.filterOptions.map(opt => (opt.isSelected = false));
    });
    onUpdateFilter(filterCategories);
  }

  keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
    if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
      this.resetFilters();
    }
  }

  renderFilters() {
    const { filterCategories } = this.props;
    return filterCategories.map((fil, i) => {
      return (
        <BasicFilter
          key={i}
          {...fil}
          selectedHandler={opt => this.onFilterSelect(fil, opt)}
        />
      );
    });
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
    this.props.handleAdvancedFilterExpand();
  }

  render() {
    const { filterCategories, containsAdvancedFilter } = this.props;
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
