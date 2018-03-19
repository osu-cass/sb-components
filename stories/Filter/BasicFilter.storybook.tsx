import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { BasicFilter, GradeLevel } from "@src/index";
import {
  propsRadioBtn,
  propsDropDown,
  selectedHandler,
  basicFilterOption,
  advancedFilterOptionsArray,
  basicFilterCategoryDropDown,
  basicFilterCategoryRadioBtn
} from "@mocks/Filter/mocks";
import { centerDecorator } from "../CenterDecorator";

storiesOf("Basic Filter", module)
  .addDecorator(centerDecorator)
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
