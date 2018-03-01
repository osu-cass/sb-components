import * as React from "react";
import { AdvancedFilter } from "./AdvancedFilter";
import { SelectedFilterIndicator } from "./SelectedFilterIndicator";
import {
  onFilterSelect,
  AdvancedFilterCategoryModel,
  AdvancedFiltersModel,
  FilterOptionModel,
  OptionTypeModel,
  FilterType,
  FilterCategoryModel
} from "./FilterModels";

/**
 * AdvancedFilterContainer props
 * @interface AdvancedFilterContainerProps
 * @member {AdvancedFilterCategoryModel[]} filterOptions
 * @method {(selected: AdvancedFilterCategoryModel[]) => void} onUpdateFilterOptions
 * @member {boolean} isNested
 * @member {string?} pageTitle
 * @member {string?} filterId
 */
export interface AdvancedFilterContainerProps {
  filterCategories: AdvancedFilterCategoryModel[];
  onUpdateFilter: (
    selected?: AdvancedFilterCategoryModel[],
    changed?: FilterType
  ) => void;
  isNested?: boolean;
  pageTitle?: string;
  filterId?: string;
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

  handleFilterSelect(
    category: AdvancedFilterCategoryModel,
    option?: FilterOptionModel
  ) {
    const { onUpdateFilter, filterCategories } = this.props;
    const newFilters = onFilterSelect(filterCategories, category, option);
    onUpdateFilter(newFilters, category.code);
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
          if (opt.isSelected) {
            active = true;
          }
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
    const tags: JSX.Element[] = [];
    this.props.filterCategories.forEach(cat => {
      if (!cat.disabled) {
        cat.filterOptions.forEach(opt => {
          if (opt.isSelected) {
            tags.push(
              <SelectedFilterIndicator
                key={cat.label + opt.key}
                category={cat}
                option={opt}
                onClick={() => this.handleFilterSelect(cat, opt)}
              />
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
    const { filterCategories } = this.props;
    const filterCats = filterCategories.map((category, i) => {
      return (
        <AdvancedFilter
          key={i}
          {...category}
          onFilterOptionSelect={opt => this.handleFilterSelect(category, opt)}
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
   * Renders the reset button
   */
  renderResetButton(): JSX.Element | undefined {
    let content: JSX.Element | undefined;
    if (this.hasActiveFilterIndicators() && !this.props.isNested) {
      content = (
        <button
          onClick={() => this.resetFilters()}
          className="btn btn-default filter-reset-btn"
        >
          Reset Filters
        </button>
      );
    }

    return content;
  }

  /**
   * Renders the button that, when clicked, expands or collapses the advanced filter.
   */
  renderExpandButton() {
    const { expanded } = this.state;
    const className = expanded ? "fa fa-chevron-down" : "fa fa-chevron-right";
    const buttonText = expanded ? "Collapse " : "Expand ";

    return (
      <button
        onClick={this.handleClick}
        className="btn btn-default filter-expand-btn"
      >
        {buttonText}
        <span className={className} />
      </button>
    );
  }

  /**
   * Renders the page title.
   */
  renderPageTitle(): JSX.Element | undefined {
    let content: JSX.Element | undefined;
    if (this.props.pageTitle) {
      content = (
        <h1>
          <span className="filter-page-title">{this.props.pageTitle}</span>
        </h1>
      );
    }

    return content;
  }
  /**
   * Renders the portion of the Advanced filter container that will always be visible
   * and dictates expansion of the filter menu, essentially the 'header' of the component.
   */
  renderCollapsedFilterContainer(): JSX.Element {
    return (
      <div className="adv-filter-group">
        {this.renderPageTitle()}
        <div className="adv-filter-header">
          <div className="adv-filter-title">
            <h3>
              <span className="fa fa-tasks" />&nbsp;Advanced Filters
            </h3>
          </div>
          <div className="adv-control-btns">
            {this.renderResetButton()}
            {this.renderExpandButton()}
          </div>
        </div>
        {this.renderSelectedFilterIndicators()}
      </div>
    );
  }

  /**
   * Render the expanded filter container
   */
  renderExpanded(): JSX.Element | undefined {
    let content: JSX.Element | undefined;
    if (this.state.expanded) {
      content = (
        <div className="adv-filter-container-expanded">
          {this.renderFilterCategories()}
        </div>
      );
    }

    return content;
  }

  render() {
    const id = this.props.filterId ? this.props.filterId : "";

    return (
      <div id={id} className="section section-light adv-filter-container">
        {this.renderCollapsedFilterContainer()}
        {this.renderExpanded()}
      </div>
    );
  }
}
