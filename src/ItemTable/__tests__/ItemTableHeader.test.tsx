import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";
import {
  headerColumns,
  HeaderSortModel,
  SortColumnModel,
  SortDirection,
  HeaderTable,
  HeaderTableProps
} from "@src/index";
import { tabClassNames } from "@mocks/ItemTable/mocks";
import { itemHandler } from "./mocks";

describe("ItemTableHeader", () => {
  const sorts: HeaderSortModel[] = [
    {
      col: headerColumns[0],
      direction: SortDirection.Ascending,
      resetSortCount: 1
    }
  ];

  const props: HeaderTableProps = {
    sorts,
    columns: headerColumns,
    onHeaderClick: itemHandler,
    isLinkTable: false
  };

  const wrapper = shallow(<HeaderTable {...props} />);
  const wrapperLinkTable = shallow(
    <HeaderTable {...props} isLinkTable={true} />
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("calls onHeaderClick", () => {
    tabClassNames.forEach(tab => {
      wrapper.find(`th.${tab}`).simulate("click");
      expect(props.onHeaderClick).toHaveBeenCalled();
    });
  });

  it("sorts list on header click", () => {
    tabClassNames.forEach(tab => {
      wrapper.find(`th.${tab}`).simulate("click");
      expect(JSON.stringify(wrapper.html())).toMatchSnapshot();
      wrapper.find(`th.${tab}`).simulate("click");
      expect(JSON.stringify(wrapper.html())).toMatchSnapshot();
      wrapper.find(`th.${tab}`).simulate("click");
      expect(JSON.stringify(wrapper.html())).toMatchSnapshot();
    });
  });

  it("matches link table snapshot", () => {
    expect(wrapperLinkTable).toMatchSnapshot();
  });

  it("calls onHeaderClick link table", () => {
    tabClassNames.forEach(tab => {
      wrapperLinkTable.find(`th.${tab}`).simulate("click");
      expect(props.onHeaderClick).toHaveBeenCalled();
    });
  });

  it("sorts list on header link table", () => {
    tabClassNames.forEach(tab => {
      wrapperLinkTable.find(`th.${tab}`).simulate("click");
      expect(JSON.stringify(wrapper.html())).toMatchSnapshot();
      wrapperLinkTable.find(`th.${tab}`).simulate("click");
      expect(JSON.stringify(wrapper.html())).toMatchSnapshot();
      wrapperLinkTable.find(`th.${tab}`).simulate("click");
      expect(JSON.stringify(wrapper.html())).toMatchSnapshot();
    });
  });
});
