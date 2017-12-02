import * as React from "react";
import "../Styles/advanced-filter.less";
import { AdvancedFilter } from "./AdvancedFilter";
import {
  AdvancedFilterCategoryModel,
  AdvancedFiltersModel,
  FilterOptionModel,
  OptionTypeModel
} from "./AdvancedFilterModel";

export interface AdvancedFilterContainerProps {
  filterOptions: AdvancedFilterCategoryModel[];
  onClick: (selected: AdvancedFilterCategoryModel[]) => void;
  isNested?: boolean;
  pageTitle?: string;
}

export interface AdvancedFilterContainerState {
  expanded: boolean;
}

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

  onSelect(category: AdvancedFilterCategoryModel, option?: FilterOptionModel) {
    const allPressed = option === undefined && category.displayAllButton;
    if (category.disabled) {
      return;
    }

    let newFilters = this.props.filterOptions.slice();
    const categoryIndex = newFilters.indexOf(category);
    let options = newFilters[categoryIndex].filterOptions.slice();

    if (allPressed || !category.isMultiSelect) {
      options.forEach(o => (o.isSelected = false));
    }

    if (option) {
      const optionIdx = options.indexOf(option);
      options[optionIdx].isSelected = !option.isSelected;
    }

    newFilters[categoryIndex].filterOptions = options;
    this.props.onClick(newFilters);
  }

  resetFilters() {
    const newFilters = this.props.filterOptions.slice();
    newFilters.forEach(cat =>
      cat.filterOptions.forEach(fo => (fo.isSelected = false))
    );
    this.props.onClick(newFilters);
  }

  hasActiveFilterIndicators() {
    let active = false;
    this.props.filterOptions.forEach(fil => {
      if (!fil.disabled) {
        fil.filterOptions.forEach(opt => {
          if (opt.isSelected) {
            active = true;
          }
        });
      }
    });
    return active;
  }

  renderFilterIndicators() {
    const tags: JSX.Element[] = [];

    this.props.filterOptions.forEach(fil => {
      if (!fil.disabled) {
        fil.filterOptions.forEach(opt => {
          if (opt.isSelected) {
            tags.push(
              <div className="filter-indicator" key={fil.label + opt.key}>
                {opt.label}&nbsp;<span
                  onClick={() => this.onSelect(fil, opt)}
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
    const filterTags = this.props.filterOptions.map((fil, i) => {
      return (
        <AdvancedFilter
          key={i}
          {...fil}
          selectedHandler={opt => this.onSelect(fil, opt)}
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
    const { filterOptions } = this.props;

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
