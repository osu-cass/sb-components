import "../Styles/advanced-filter.less";
import * as React from "react";
import {
  AdvancedFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel
} from "./AdvancedFilterModel";

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
      let className = anySelected ? "" : " selected-button";
      allBtnContainer = (
        <div className="filter-all-btn-container">
          <button
            className={"filter-all-btn " + className + " filter-button"}
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

    let className = "";
    if (filterOptions.length > 0) {
      filterOptions.forEach((t, i) => {
        className = t.isSelected ? "selected-button" : "";

        tags.push(
          <button
            className={className + " filter-button"}
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
        <label>
          <span data-tooltip={helpText} data-tooltip-position="top">
            <span info-label="true">{label}</span>
            <span className="fa fa-info-circle fa-sm" />
          </span>
        </label>
        <div className="child-filter-container">
          {this.renderAllBtnContainer()}
          <div className="filter-button-container">{this.renderTags()}</div>
        </div>
      </div>
    );
  }
}
