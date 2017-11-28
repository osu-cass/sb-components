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
      expanded: true
    };
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  onSelect(category: AdvancedFilterCategoryModel, option?: FilterOptionModel) {
    const allPressed = option === undefined && category.displayAllButton;

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
    const newFilters = this.props.filterOptions;
    newFilters.forEach(cat => {
      cat.filterOptions.map(opt => (opt.isSelected = false));
    });
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
              <div className="filter-indicator" key={opt.key}>
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

  renderFilterHeader() {
    return (
      <div className="filter-header">
        <div className="filter-status">{this.renderFilterIndicators()}</div>
      </div>
    );
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

  renderCollapsedFilterContainer = () => {
    const { filterOptions } = this.props;
    const className = this.state.expanded
      ? "fa fa-chevron-down"
      : "fa fa-chevron-right";
    const buttonText = this.state.expanded ? "Collapse " : "Expand ";
    return (
      <div className="filter-sub-header-container">
        <div className="filter-advanced-filter-header">
          <div className="filter-advanced-filter-title">
            <h2 style={{ color: "#63666A" }}>
              <span className="fa fa-tasks fa-lg" />&nbsp;Advanced Filters
            </h2>
            <span>
              &nbsp;Click on an item to remove it from the list
            </span>
          </div>
          <div style={{ display: "flex", marginRight: "10px" }}>
            {this.hasActiveFilterIndicators() ? (
              <button
                onClick={() => this.resetFilters()}
                className="filter-button"
              >
                Reset Filters
              </button>
            ) : null}
            <button
              onClick={() => this.handleClick()}
              className="filter-button"
            >
              {buttonText}
              <span className={className} />
            </button>
          </div>
        </div>
        {filterOptions && filterOptions.length > 0
          ? this.renderFilterHeader()
          : null}
      </div>
    );
  };

  render() {
    let content = null;
    if (this.state.expanded) {
      content = (
        <div className="advanced-filter-container-expanded">
          {this.renderFilterBody()}
        </div>
      );
    }

    return (
      <div className="advanced-filter-container">
        {this.renderCollapsedFilterContainer()}
        {content}
      </div>
    );
  }
}
