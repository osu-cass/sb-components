import * as React from "react";
import {
  BasicFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel,
  SelectOptionProps,
  FilterType,
  ToolTip,
  Select
} from "@src/index";

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

  searchHandler = (searchText: string) => {
    const newOption: FilterOptionModel = {
      label: this.props.label,
      key: searchText,
      isSelected: true,
      filterType: this.props.code
    };

    this.props.selectedHandler(newOption);
  };

  renderSearch(): JSX.Element {
    const {
      selectedHandler,
      optionType,
      label,
      helpText,
      placeholderText,
      filterOptions
    } = this.props;
    const helpTextElement = helpText ? <p>{this.props.helpText}</p> : <p />;
    const value =
      filterOptions && filterOptions.length > 0 ? filterOptions[0].key : "";

    return (
      <div className="input-box">
        <label>
          <ToolTip helpText={helpTextElement} displayIcon={true}>
            <span className="tooltip-label" info-label="true">
              {label}
            </span>
          </ToolTip>
        </label>
        <input
          className="form-control"
          type="text"
          onChange={t => this.searchHandler(t.currentTarget.value)}
          placeholder={placeholderText}
          value={value}
        />
      </div>
    );
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
      optionType,
      filterOptions,
      disabled,
      label,
      code
    } = this.props;
    const defaultValue = "default";

    const selected = filterOptions.find(fil => fil.isSelected === true);
    const selectedValue = selected ? selected.key : defaultValue;

    const selectOptions = filterOptions.map(fo => {
      return {
        disabled,
        selected: selectedValue === fo.key,
        label: fo.label,
        value: fo.key
      };
    });

    if (!this.props.hideSelectMessage) {
      selectOptions.splice(0, 0, {
        disabled,
        selected: selectedValue === defaultValue,
        label: `Select ${label}`,
        value: defaultValue
      });
    }

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
    const { optionType } = this.props;
    let content: JSX.Element | undefined;

    switch (optionType) {
      case OptionTypeModel.DropDown:
        content = this.renderDropDown();
        break;
      case OptionTypeModel.radioBtn:
        content = this.renderRadio();
        break;
      case OptionTypeModel.inputBox:
        content = this.renderSearch();
        break;
      default:
        console.error("Invalid option", optionType);
    }

    return content;
  }

  /**
   * Renders an individual category
   * @returns default render method JSX Element
   */
  render() {
    let { label } = this.props;
    label = label.replace(/\ /g, "-");

    return (
      <div id={`${label}-bf`.toLocaleLowerCase()} className="bf-selection">
        {this.renderCategory()}
      </div>
    );
  }
}
