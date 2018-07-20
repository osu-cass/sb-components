import * as React from "react";
import { shallow } from "enzyme";
import { ItemBankEntry } from "../ItemBankEntry";
import {
  NamespaceModel,
  SectionModel,
  ItemRevisionModel
} from "../ItemBankModels";

const namespace: NamespaceModel = {
  hasBankKey: true,
  bankKey: 0,
  id: "12",
  name: "itemreviewviewer"
};

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

const namespaces: NamespaceModel[] = [namespace];

describe("ItemBankEntry", () => {
  const wrapper = shallow(
    <ItemBankEntry
      updateItems={items => jest.fn()}
      namespaces={namespaces}
      sections={sections}
      items={items}
    />
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
