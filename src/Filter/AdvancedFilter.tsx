import "src/Assets/Styles/advanced-filter.less";
import * as React from "react";
import {
  AdvancedFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel
} from "./FilterModels";

export interface AdvancedFilterProps extends AdvancedFilterCategoryModel {
  onFilterOptionSelect: (data?: FilterOptionModel) => void;
}

export class AdvancedFilter extends React.Component<AdvancedFilterProps, {}> {
  constructor(props: AdvancedFilterProps) {
    super(props);
  }

  renderAllBtnContainer() {
    const {
      filterOptions,
      onFilterOptionSelect,
      displayAllButton
    } = this.props;
    let allBtnContainer: JSX.Element | undefined;
    const anySelected = filterOptions.some(fo => fo.isSelected);
    if (displayAllButton) {
      const className = anySelected ? "btn-white" : " btn-blue";
      allBtnContainer = (
        <div className="filter-all-btn-container">
          <button
            className={`btn btn-sm filter-btn filter-btn-all ${className}`}
            key="all"
            onClick={() => onFilterOptionSelect()}
          >
            All
          </button>
        </div>
      );
    }

    return allBtnContainer;
  }

  renderTags() {
    const { filterOptions, onFilterOptionSelect, disabled } = this.props;
    const tags: JSX.Element[] = [];

    if (filterOptions.length > 0) {
      filterOptions.forEach((t, i) => {
        const className = t.isSelected ? "btn-blue selected" : "btn-white";
        tags.push(
          <button
            className={`btn btn-sm filter-btn ${className}`}
            key={t.key}
            onClick={() => onFilterOptionSelect(t)}
            disabled={disabled}
          >
            {t.label}
          </button>
        );
      });
    } else {
      tags.push(<div key={0}>No options.</div>);
    }
    return tags;
  }

  render() {
    const { disabled, label, helpText } = this.props;
    const className = disabled ? " filter-disabled" : "";
    return (
      <div
        id={(label + "-filter").toLocaleLowerCase()}
        className={"filter-selection" + className}
      >
        <div className="filter-container-header">
          <label>
            <span
              className="tooltip-help"
              data-tooltip={helpText}
              data-tooltip-position="top"
            >
              <span className="tooltip-label" info-label="true">
                {label}
              </span>
              <span className="fa fa-info-circle fa-sm" />
            </span>
          </label>
        </div>
        <div className="child-filter-container">
          {this.renderAllBtnContainer()}
          <div className="filter-button-container">{this.renderTags()}</div>
        </div>
      </div>
    );
  }
}
