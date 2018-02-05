import * as React from "react";
import {
  BasicFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel
} from "./FilterModels";
import { SelectOptionProps } from "../Select/SelectOption";
import { Select } from "../Select/Select";

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

  findFilterOption(key: string) {
    return this.props.filterOptions.find(fil => fil.key === key);
  }

  /**
   * Renders JSX element of radio input category
   * @returns {JSX.Element} radio input category with selections
   */
  renderRadio(): JSX.Element {
    const { selectedHandler, label, filterOptions } = this.props;

    const radioOptions = filterOptions.map(fo => {
      return (
        <div className="radio" key={fo.key}>
          <label>
            <input
              checked={fo.isSelected}
              aria-checked={fo.isSelected}
              type="radio"
              name={label}
              value={fo.key}
              onChange={() => this.props.selectedHandler(fo)}
            />
            {fo.label}
          </label>
        </div>
      );
    });

    return (
      <label>
        {label}
        {radioOptions}
      </label>
    );
  }

  /**
   * Renders Select list for the category with default option
   * @returns {JSX.Element} Select React component
   */
  renderDropDown(): JSX.Element {
    const {
      selectedHandler,
      type,
      filterOptions,
      disabled,
      label,
      code
    } = this.props;
    const defaultValue = "default";

    const selected = filterOptions.find(fil => fil.isSelected === true);
    const selectedValue = selected ? selected.key : defaultValue;

    let selectOptions: SelectOptionProps[] = [];
    selectOptions.push({
      disabled,
      selected: selectedValue === defaultValue,
      label: "Select " + label,
      value: defaultValue
    });

    const filterSelectOptions = filterOptions.map(fo => {
      return {
        disabled,
        selected: selectedValue === fo.key,
        label: fo.label,
        value: fo.key
      };
    });

    selectOptions = selectOptions.concat(filterSelectOptions);

    return (
      <Select
        disabled={disabled}
        label={label}
        selected={selectedValue}
        options={selectOptions}
        onChange={val => selectedHandler(this.findFilterOption(val))}
        key={code}
        className={"input-sm med-text"}
      />
    );
  }

  /**
   * Renders the render Category based on the category type
   * @returns {(JSX.Element | undefined)} JSX element of category
   */
  renderCategory(): JSX.Element | undefined {
    const { type } = this.props;
    let content: JSX.Element | undefined;

    switch (type) {
      case OptionTypeModel.DropDown:
        content = this.renderDropDown();
        break;
      case OptionTypeModel.radioBtn:
        content = this.renderRadio();
        break;
      default:
        console.error("Invalid option", type);
        break;
    }

    return content;
  }

  /**
   * Renders an individual category
   * @returns default render method JSX Element
   */
  render() {
    const { label } = this.props;

    return (
      <div id={`${label}-bf`.toLocaleLowerCase()} className="bf-selection">
        {this.renderCategory()}
      </div>
    );
  }
}
