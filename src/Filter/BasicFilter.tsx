import "../Assets/Styles/basic-filter.less";
import * as React from "react";
import {
  BasicFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel
} from "./FilterModels";

export interface BasicFilterProps extends BasicFilterCategoryModel {
  selectedHandler: (data?: FilterOptionModel) => void;
}
/**
 * Renders a radio button or drop down list from
 * the FilterOptionModel passed in as props
 * @class BasicFilter
 * @extends {React.Component<BasicFilterProps, {}>}
 */
export class BasicFilter extends React.Component<BasicFilterProps, {}> {
  constructor(props: BasicFilterProps) {
    super(props);
  }

  renderTags() {
    const { filterOptions, type } = this.props;
    const tags: JSX.Element[] = [];
    if (filterOptions) {
      filterOptions.forEach((t, i) => {
        if (type === OptionTypeModel.DropDown) {
          tags.push(
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          );
        } else if (type === OptionTypeModel.radioBtn) {
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
    return this.props.filterOptions.find(fil => fil.key === key);
  }

  renderFilterBody() {
    const { selectedHandler, type, filterOptions } = this.props;
    let tag: JSX.Element;
    const selected = filterOptions.filter(fil => fil.isSelected === true);
    if (type === OptionTypeModel.DropDown) {
      tag = (
        <select
          onChange={e => selectedHandler(this.findFilterOption(e.target.value))}
          value={selected.length > 0 ? `${selected[0].key}` : `default`}
        >
          <option value="default">Select Filter...</option>
          {this.renderTags()}
        </select>
      );
    } else {
      tag = <form>{this.renderTags()}</form>;
    }

    return <div className="basic-filter-body">{tag}</div>;
  }

  render() {
    const { label } = this.props;
    return (
      <div
        id={(label + "-basic-filter").toLocaleLowerCase()}
        className="basic-filter-selection"
      >
        <label>{label}</label>
        {this.renderFilterBody()}
      </div>
    );
  }
}
