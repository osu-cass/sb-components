import "jsdom-global/register";
import * as React from "react";
import { shallow, mount } from "enzyme";
import { CsvEntry, CsvEntryProps, CsvEntryState } from "../CsvEntry";
import { ItemRevisionModel } from "../../index";
import { CsvRowModel } from "../CsvEntryModels";

const onItemsUpdateMock = jest.fn();

const item: ItemRevisionModel = {
  itemKey: 187,
  bankKey: 3000,
  section: "math",
  revision: "asfe",
  isaap: ""
};

const item2 = { ...item, bankKey: 2332, revision: "asdf" };

const items: ItemRevisionModel[] = [item, item2];

const csvEntryProps: CsvEntryProps = {
  onItemsUpdate: onItemsUpdateMock
};

const csvData1: CsvRowModel = {
  index: 0
};

const csvData2: CsvRowModel = {
  index: 1
};

const csvEntryState: CsvEntryState = {
  csvInputValue: "hello",
  csvData: [csvData1, csvData2]
};

describe("CsvEntry", () => {
  const wrapper = shallow(<CsvEntry {...csvEntryProps} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("calls handle csv blur", () => {
    const wrapperInstance = wrapper.instance() as CsvEntry;
    wrapper.find(".csv-text-entry").simulate("focus");
    wrapper.find(".csv-text-entry").simulate("blur");
    expect(wrapper).toMatchSnapshot();
  });

  it("calls handle csv change", () => {
    wrapper
      .find(".csv-text-entry")
      .simulate("change", { currentTarget: { value: "hello" } });
    expect(wrapper).toMatchSnapshot();
  });
});
