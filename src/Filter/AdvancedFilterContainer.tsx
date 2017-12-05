import * as React from "react";
import "../Styles/advanced-filter.less";
import { AdvancedFilter } from "./AdvancedFilter";
import {
  AdvancedFilterCategoryModel,
  AdvancedFiltersModel,
  FilterOptionModel,
  OptionTypeModel
} from "./AdvancedFilterModel";
/**
 * AdvancedFilterContainer props
 * @interface AdvancedFilterContainerProps
 * @member {AdvancedFilterCategoryModel[]} filterOptions
 * @member {(selected: AdvancedFilterCategoryModel[]) => void} onUpdateFilterOptions
 * @member {boolean} isNested
 * @member {string?} pageTitle
 */
export interface AdvancedFilterContainerProps {
  filterCategories: AdvancedFilterCategoryModel[];
  onUpdateFilter: (selected: AdvancedFilterCategoryModel[]) => void;
  isNested?: boolean;
  pageTitle?: string;
}
/**
 * AdvancedFilterContainer state
 * @interface AdvancedFilterContainerState
 * @member {boolean} expanded
 */
export interface AdvancedFilterContainerState {
  expanded: boolean;
}

/**
 * The AdvancedFilterContainer is a collapsible menu that displays AdvancedFilters
 * that, when clicked, calls `this.props.onClick()`
 * @class AdvancedFilterContainer
 * @extends {React.Component<AdvancedFilterContainerProps, AdvancedFilterContainerState>}
 */
export class AdvancedFilterContainer extends React.Component<
  AdvancedFilterContainerProps,
  AdvancedFilterContainerState
> {
  constructor(props: AdvancedFilterContainerProps) {
    super(props);
    this.state = {
      expanded: this.props.isNested ? true : false
    };
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  /**
   * Updates a category with the filter option that was selected
   * @param {AdvancedFilterCategoryModel} category
   * @param {FilterOptionModel} [option]
   */
  onFilterSelect(
    category: AdvancedFilterCategoryModel,
    option?: FilterOptionModel
  ) {
    const { filterCategories, onUpdateFilter } = this.props;
    const allPressed = option === undefined && category.displayAllButton;
    if (category.disabled) {
      return;
    }

    const categoryIndex = filterCategories.indexOf(category);
    let options = filterCategories[categoryIndex].filterOptions.slice();

    if (allPressed || !category.isMultiSelect) {
      options.forEach(o => (o.isSelected = false));
    }

    if (option) {
      const optionIdx = options.indexOf(option);
      options[optionIdx].isSelected = !option.isSelected;
    }

    filterCategories[categoryIndex].filterOptions = options;
    this.props.onUpdateFilter(filterCategories);
  }
  /**
   * Resets each of the filter options for each category.
   */
  resetFilters() {
    const { filterCategories } = this.props;
    filterCategories.forEach(cat =>
      cat.filterOptions.forEach(fo => (fo.isSelected = false))
    );
    this.props.onUpdateFilter(filterCategories);
  }
  /**
   * Returns true if one or more filter options are selected in any filter category.
   * False if otherwise
   */
  hasActiveFilterIndicators() {
    const { filterCategories } = this.props;
    let active = false;
    filterCategories.forEach(cat => {
      if (!cat.disabled) {
        cat.filterOptions.forEach(opt => {
          active = opt.isSelected ? true : false;
        });
      }
    });
    return active;
  }

  /**
   * Builds and returns a list of JSX.Elements that shows which filter
   * options are currently selected
   */
  renderSelectedFilterIndicators() {
    const { filterCategories } = this.props;
    const tags: JSX.Element[] = [];

    filterCategories.forEach(cat => {
      if (!cat.disabled) {
        cat.filterOptions.forEach(opt => {
          if (opt.isSelected) {
            tags.push(
              <div className="filter-indicator" key={cat.label + opt.key}>
                {opt.label}&nbsp;<span
                  onClick={() => this.onFilterSelect(cat, opt)}
                  className="fa fa-times-circle fa-small"
                />
              </div>
            );
          }
        });
      }
    });

    return <div className="filter-status">{tags}</div>;
  }

  /**
   * Renders the array of filter categories and their respective filter options.
   */
  renderFilterCategories() {
    const filterCats = this.props.filterCategories.map((category, i) => {
      return (
        <AdvancedFilter
          key={i}
          {...category}
          selectedHandler={opt => this.onFilterSelect(category, opt)}
        />
      );
    });

    return (
      <div
        className="filter-body"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {filterCats}
      </div>
    );
  }

  /**
   * Renders the button that, when clicked, expands or collapses the advanced filter.
   */
  renderExpandButton() {
    const { expanded } = this.state;
    let content: JSX.Element | undefined = undefined;
    const className = expanded ? "fa fa-chevron-down" : "fa fa-chevron-right";
    const buttonText = expanded ? "Collapse " : "Expand ";
    if (this.hasActiveFilterIndicators()) {
      content = (
        <button
          onClick={() => this.resetFilters()}
          className="filter-reset-btn "
        >
          Reset Filters
        </button>
      );
    } else {
      content = (
        <button
          onClick={() => this.handleClick()}
          className="filter-expand-btn"
        >
          {buttonText}
          <span className={className} />
        </button>
      );
    }
    return content;
  }

  /**
   * Renders the page title.
   */
  renderPageTitle(): JSX.Element | undefined {
    if (this.props.pageTitle) {
      return (
        <h1>
          <span className="filter-page-title">{this.props.pageTitle}</span>
        </h1>
      );
    } else {
      return undefined;
    }
  }
  /**
   * Renders the portion of the Advanced filter container that will always be visible
   * and dictates expansion of the filter menu, essentially the 'header' of the component.
   */
  renderCollapsedFilterContainer(): JSX.Element {
    return (
      <div className="filter-sub-header-container">
        {this.renderPageTitle()}
        <div className="filter-advanced-filter-header">
          <div className="filter-advanced-filter-title">
            <h3>
              <span className="fa fa-tasks" />&nbsp;Advanced Filters
            </h3>
          </div>
          {this.renderExpandButton()}
        </div>
        {this.renderSelectedFilterIndicators()}
      </div>
    );
  }

  /**
   * Render the expanded filter container
   */
  renderExpanded(): JSX.Element | undefined {
    if (this.state.expanded) {
      return (
        <div className="advanced-filter-container-expanded">
          {this.renderFilterCategories()}
        </div>
      );
    }
    return undefined;
  }

  render() {
    return (
      <div className="advanced-filter-container">
        {this.renderCollapsedFilterContainer()}
        {this.renderExpanded()}
      </div>
    );
  }
}
