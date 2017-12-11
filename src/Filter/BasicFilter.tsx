import "../Assets/Styles/basic-filter.less";
import * as React from "react";
import {
  BasicFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel
} from "./AdvancedFilterModel";

export interface BasicFilterProps extends BasicFilterCategoryModel {
  selectedHandler: (data?: FilterOptionModel) => void;
}

export class BasicFilter extends React.Component<BasicFilterProps, {}> {
  constructor(props: BasicFilterProps) {
    super(props);
  }

  renderTags() {
    const tags: JSX.Element[] = [];
    const classname = "";
    if (this.props.filterOptions) {
      this.props.filterOptions.forEach((t, i) => {
        if (this.props.type == OptionTypeModel.DropDown) {
          tags.push(
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          );
        } else if (this.props.type == OptionTypeModel.radioBtn) {
          tags.push(
            <label key={t.key}>
              <input
                checked={t.isSelected}
                type="radio"
                key={t.key}
                value={t.key}
                onChange={() => this.props.selectedHandler(t)}
              />
              {t.label}
            </label>
          );
        }
      });
    }
    return tags;
  }

  findFilterOption(key: string) {
    return this.props.filterOptions.find(fil => fil.key == key);
  }

  renderFilterBody() {
    let tag: JSX.Element;

    if (this.props.type == OptionTypeModel.DropDown) {
      tag = (
        <select
          onChange={e =>
            this.props.selectedHandler(this.findFilterOption(e.target.value))
          }
        >
          {this.renderTags()}
        </select>
      );
    } else {
      tag = <form>{this.renderTags()}</form>;
    }

    return <div className="basic-filter-body">{tag}</div>;
  }

  render() {
    return (
      <div
        id={(this.props.label + "-basic-filter").toLocaleLowerCase()}
        className="basic-filter-selection"
      >
        <label>{this.props.label}</label>
        {this.renderFilterBody()}
      </div>
    );
  }
}
