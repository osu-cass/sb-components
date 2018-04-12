import * as React from "react";
import { shallow } from "enzyme";
import { ItemBankEntry } from "../ItemBankEntry";
import { SectionModel, ItemRevisionModel } from "../ItemBankModels";

const section: SectionModel = {
  key: "187-3000",
  value: "math"
};

const item: ItemRevisionModel = {
  itemKey: 187,
  bankKey: 3000,
  section: "math",
  revision: "asdge",
  isaap: ""
};

const items: ItemRevisionModel[] = [item];

const sections: SectionModel[] = [section];

describe("ItemBankEntry", () => {
  const wrapper = shallow(
    <ItemBankEntry
      updateItems={items => jest.fn()}
      sections={sections}
      items={items}
    />
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
