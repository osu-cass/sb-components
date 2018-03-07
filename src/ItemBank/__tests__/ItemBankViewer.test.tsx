import * as React from "react";
import { shallow } from "enzyme";
import { ItemBankViewer } from "../ItemBankViewer";
import {
  AboutItemRevisionModel,
  AccResourceGroupModel,
  RevisionModel
} from "../../index";
import { ItemRevisionModel } from "../ItemBankModels";

const date = new Date("2015-11-16T00:00:00");

const revision: RevisionModel = {
  author: "Troy",
  date: date,
  commitMessage: "test",
  commitHash: "asdh49"
};

const aboutItemRevisionModel: AboutItemRevisionModel = {
  itemKey: "187",
  bankKey: "3000",
  revision: "hello",
  section: "math",
  AboutItemMetadata: undefined,
  sampleItemScoring: undefined
};

const accResourceGroup: AccResourceGroupModel = {
  label: "none",
  order: 1,
  accessibilityResources: []
};

const accResourceGroups: AccResourceGroupModel[] = [accResourceGroup];

const revisions: RevisionModel[] = [revision];

const nextItem: ItemRevisionModel = {
  itemKey: 187,
  bankKey: 3000,
  section: "math",
  revision: "ajweio",
  isaap: undefined
};

const prevItem: ItemRevisionModel = {
  itemKey: 187,
  bankKey: 3000,
  section: "math",
  revision: "ajweio",
  isaap: undefined
};

describe("ItemBankViewer", () => {
  const wrapper = shallow(
    <ItemBankViewer
      onAccessibilityReset={() => {}}
      onAccessibilityUpdate={() => {}}
      onItemSelect={() => {}}
      onRevisionSelect={() => {}}
    />
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ItemBankViewer with revision model", () => {
  const wrapper = shallow(
    <ItemBankViewer
      onAccessibilityReset={() => {}}
      onAccessibilityUpdate={() => {}}
      onItemSelect={() => {}}
      onRevisionSelect={() => {}}
      aboutItemRevisionModel={aboutItemRevisionModel}
    />
  );
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ItemBankViewer with revision model and accResourceGroup", () => {
  const wrapper = shallow(
    <ItemBankViewer
      onAccessibilityReset={() => {}}
      onAccessibilityUpdate={() => {}}
      onItemSelect={() => {}}
      onRevisionSelect={() => {}}
      aboutItemRevisionModel={aboutItemRevisionModel}
      accResourceGroups={accResourceGroups}
    />
  );
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ItemBankViewer with all props defined", () => {
  const wrapper = shallow(
    <ItemBankViewer
      onAccessibilityReset={() => {}}
      onAccessibilityUpdate={() => {}}
      onItemSelect={() => {}}
      onRevisionSelect={() => {}}
      aboutItemRevisionModel={aboutItemRevisionModel}
      accResourceGroups={accResourceGroups}
      revisions={revisions}
      nextItem={nextItem}
      prevItem={prevItem}
    />
  );
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
