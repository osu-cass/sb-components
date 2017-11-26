import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
  BasicFilter,
  BasicFilterProps,
  FilterOptionModel,
  OptionTypeModel,
  BasicFilterCategoryModel,
  FilterType
} from "../../src/";
import { CenterDecorator } from "../CenterDecorator";
import { GradeLevel } from "../../src/GradeLevels/GradeLevels";

const basicFilterOption: FilterOptionModel = {
  label: "Grade",
  key: "12345",
  isSelected: false
};

const advancedFilterOptionsArray: FilterOptionModel[] = [
  { ...basicFilterOption, label: "Grade 1", key: "12346" },
  { ...basicFilterOption, label: "Grade 2", key: "12347" },
  { ...basicFilterOption },
  { ...basicFilterOption, label: "Grade 4", key: "12348" }
];

const basicFilterCategoryDropDown: BasicFilterCategoryModel = {
  disabled: false,
  label: "Grade",
  filterOptions: [basicFilterOption],
  type: OptionTypeModel.DropDown,
  code: FilterType.Grade
};

const basicFilterCategoryRadioBtn: BasicFilterCategoryModel = {
 ...basicFilterCategoryDropDown, type: OptionTypeModel.radioBtn
};

const selectedHandler = action("clicked filter");

const propsDropDown: BasicFilterProps = {
  ...basicFilterCategoryDropDown,
  selectedHandler
};

const propsRadioBtn: BasicFilterProps = {
  ...basicFilterCategoryRadioBtn,
  selectedHandler
};

storiesOf("Basic Filter", module)
  .addDecorator(CenterDecorator)
  .add("DropDown: one filter item", () => <BasicFilter {...propsDropDown} />)
  .add("DropDown: multiple filter items", () => (
    <BasicFilter
      {...propsDropDown}
      filterOptions={advancedFilterOptionsArray}
    />
  ))
  .add("RadioBtn: one filter item", () => <BasicFilter {...propsRadioBtn} />)
  .add("RadioBtn: multiple filter items", () => (
    <BasicFilter
      {...propsRadioBtn}
      filterOptions={advancedFilterOptionsArray}
    />
  ));
