import "../Styles/advanced-filter.less";
import * as React from "react";
import {
  AdvancedFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel
} from "./AdvancedFilterModel";

export interface AdvancedFilterProps extends AdvancedFilterCategoryModel {
  selectedHandler: (data?: FilterOptionModel) => void;
}

export class AdvancedFilter extends React.Component<AdvancedFilterProps, {}> {
  constructor(props: AdvancedFilterProps) {
    super(props);
  }

  renderAllbtnContainer() {
    let allBtnContainer: JSX.Element | undefined;
    let classname = "";
    const anySelected = this.props.filterOptions.some(fo => fo.isSelected);

    if (this.props.displayAllButton) {
      classname = anySelected ? "" : " selected-button";

      allBtnContainer = (
        <div className="filter-all-btn-container">
          <button
            className={"filter-all-btn " + classname + " filter-button"}
            key="all"
            onClick={() => this.props.selectedHandler()}
          >
            All
          </button>
        </div>
      );
    }
    return allBtnContainer;
  }

  renderTags() {
    const tags: JSX.Element[] = [];

    let classname = "";
    if (this.props.filterOptions.length > 0) {
      this.props.filterOptions.forEach((t, i) => {
        classname = t.isSelected ? "selected-button" : "";

        tags.push(
          <button
            className={classname + " filter-button"}
            key={t.key}
            onClick={() => this.props.selectedHandler(t)}
            disabled={this.props.disabled}
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
    const className = this.props.disabled ? " filter-disabled" : "";
    return (
      <div
        id={(this.props.label + "-filter").toLocaleLowerCase()}
        className={"filter-selection" + className}
      >
        <label>
          <span data-tooltip={this.props.helpText} data-tooltip-position="top">
            <span info-label="true">{this.props.label}</span>
            <span className="fa fa-info-circle fa-sm" />
          </span>
        </label>
        <div className="child-filter-container">
          {this.renderAllbtnContainer()}
          <div className="filter-button-container">{this.renderTags()}</div>
        </div>
      </div>
    );
  }
}
