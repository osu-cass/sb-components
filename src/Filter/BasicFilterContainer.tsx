import * as React from "react";
import {
  BasicFilterCategoryModel,
  FilterOptionModel,
  FilterType
} from "./FilterModels";
import { BasicFilter } from "./BasicFilter";

/**
 * Properties interface for the BasicFilterContainer component.
 * @interface BasicFilterContainerProps
 * @member {BasicFilterCategoryModel[]} filterCategories
 * @member {(selected: BasicFilterCategoryModel[]) => void} onUpdateFilter
 * @member {boolean} containsAdvancedFilter
 * @member {() => void} handleAdvancedFilterExpand
 * @member {string?} filterId
 * @member {(() => void)?} resetHandler
 */
export interface BasicFilterContainerProps {
  filterCategories: BasicFilterCategoryModel[];
  onUpdateFilter: (
    selected: BasicFilterCategoryModel[],
    changed: FilterType
  ) => void;
  containsAdvancedFilter: boolean;
  handleAdvancedFilterExpand: () => void;
  filterId?: string;
  resetHandler?: () => void;
}
/**
 * State interface for the BasicFilterContainer component.
 * @interface BasicFilterContainerState
 * @member {boolean} expanded
 */
export interface BasicFilterContainerState {
  expanded?: boolean;
}
/**
 * The BasicFilterContainer is a menu of drop down lists and radio buttons
 * that filter Items based on BasicFilterCategoryModels and their corresponding
 * filter options. Can expand the Advanced filter as well if they are coupled together.
 * @class BasicFilterContainer
 * @extends {React.Component<BasicFilterContainerProps, BasicFilterContainerState>}
 */
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
  /**
   * Sets the isSelected property of the filter that the user selected
   * and sets the state of the parent component with the new filter categories.
   * @method onFilterSelect
   * @param {BasicFilterCategoryModel} category
   * @param {FilterOptionModel} [option]
   */
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
        this.props.onUpdateFilter(filterCategories, category.code);
      }
    }
  }
  /**
   * Returns an array Basic Filter component for each of the filter categories
   * @method renderFilters
   */
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

  /**
   * If the BasicFilter and AdvancedFilter Containers are used in conjunction with each other,
   * this method sets expands and collapses the AdvancedFilterContainer
   * @method handleClick
   */
  handleClick() {
    this.setState({ expanded: !this.state.expanded });
    this.props.handleAdvancedFilterExpand();
  }

  render() {
    const { filterCategories, containsAdvancedFilter, filterId } = this.props;
    const { expanded } = this.state;
    const id = filterId ? filterId : "";
    let advancedFilterButton = null;

    // if the component is being used in conjunction
    // with the AdvancedFilterContainer we handle expanding it here
    if (containsAdvancedFilter) {
      advancedFilterButton = (
        <div className="bf-button-container">
          <span>
            <button
              className="btn btn-default filter-button"
              onClick={this.props.resetHandler}
            >
              Reset
            </button>
          </span>
          <span>
            <button
              className="btn btn-default filter-button af-expand"
              onClick={this.handleClick}
            >
              {"Advanced Filters"}&nbsp;
              <span
                aria-hidden="true"
                className={`fa fa-chevron-${expanded ? "down" : "right"}`}
              />
            </button>
          </span>
        </div>
      );
    }
    let className = "bf-container section-light";
    if (expanded) {
      className = `${className} bf-expanded`;
    }

    return (
      <div id={id} className={className}>
        <div className="basic-filter">{this.renderFilters()}</div>
        {advancedFilterButton}
      </div>
    );
  }
}
