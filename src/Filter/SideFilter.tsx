import * as React from "react";
import {
  AdvancedFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel,
  FilterType,
  BtnGroupOption,
  ToolTip,
  generateTooltip
} from "../index";

export interface SideFilterProps {}

export class SideFilter extends React.Component<SideFilterProps, {}> {
  constructor(props: SideFilterProps) {
    super(props);
  }

  renderBtnContainer() {}

  renderTags() {}

  render() {
    return <div id={} className={} />;
  }
}
