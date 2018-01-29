import * as React from "react";
import {
  AdvancedFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel
} from "./FilterModels";
import { BtnGroupOption } from "../Button/BtnGroupOption";
import { ToolTip } from "../ToolTip/ToolTip";

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
      displayAllButton,
      disabled
    } = this.props;
    let allBtnContainer: JSX.Element | undefined;
    const anySelected = filterOptions.some(fo => fo.isSelected);
    if (displayAllButton) {
      allBtnContainer = (
        <BtnGroupOption
          onClick={() => onFilterOptionSelect()}
          disabled={disabled}
          selected={!anySelected}
          label="All"
        />
      );
    }

    return allBtnContainer;
  }

  renderTags() {
    const { filterOptions, onFilterOptionSelect, disabled } = this.props;
    const tags: JSX.Element[] = [];

    if (filterOptions.length > 0) {
      filterOptions.forEach((t, i) => {
        tags.push(
          <BtnGroupOption
            onClick={() => onFilterOptionSelect(t)}
            disabled={disabled}
            selected={t.isSelected}
            label={t.label}
            key={t.key}
          />
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
            <ToolTip helpText={helpText} displayIcon={true}>
              <span className="tooltip-label" info-label="true">
                {label}
              </span>
            </ToolTip>
          </label>
        </div>
        <div
          className={`nested-btn-group btn-group-sm toggle-group vertical ${className}`}
          data-toggle="buttons"
        >
          {this.renderAllBtnContainer()}
          <div className="btn-group filter-btn-group">{this.renderTags()}</div>
        </div>
      </div>
    );
  }
}
