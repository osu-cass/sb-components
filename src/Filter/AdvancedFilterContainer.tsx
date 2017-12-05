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

  resetFilters() {
    const { filterCategories } = this.props;
    filterCategories.forEach(cat =>
      cat.filterOptions.forEach(fo => (fo.isSelected = false))
    );
    this.props.onUpdateFilter(filterCategories);
  }

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

  renderFilterIndicators() {
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

    return tags;
  }

  renderSelected() {
    return <div className="filter-status">{this.renderFilterIndicators()}</div>;
  }

  renderFilterBody() {
    const filterTags = this.props.filterCategories.map((category, i) => {
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
        {filterTags}
      </div>
    );
  }

  renderExpandButton() {
    const className = this.state.expanded
      ? "fa fa-chevron-down"
      : "fa fa-chevron-right";
    const buttonText = this.state.expanded ? "Collapse " : "Expand ";
    return (
      <div>
        {this.hasActiveFilterIndicators() ? (
          <button
            onClick={() => this.resetFilters()}
            className="filter-reset-btn"
          >
            Reset Filters
          </button>
        ) : null}
        <button
          onClick={() => this.handleClick()}
          className="filter-expand-btn"
        >
          {buttonText}
          <span className={className} />
        </button>
      </div>
    );
  }

  renderPageTitle() {
    if (this.props.pageTitle) {
      return (
        <h1>
          <span className="filter-page-title">{this.props.pageTitle}</span>
        </h1>
      );
    } else {
      return null;
    }
  }
  renderCollapsedFilterContainer = () => {
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
        {this.renderSelected()}
      </div>
    );
  };

  renderExpanded() {
    let content = null;
    if (this.state.expanded) {
      content = (
        <div className="advanced-filter-container-expanded">
          {this.renderFilterBody()}
        </div>
      );
    }
    return content;
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
