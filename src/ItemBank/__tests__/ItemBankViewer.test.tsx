import * as React from "react";
import { shallow } from "enzyme";
import {
  ItemBankViewer,
  AboutItemRevisionModel,
  AccResourceGroupModel,
  RevisionModel,
  ItemBankViewerProps,
  ItemRevisionModel
} from "@src/index";
import {
  aboutItemRevisionMockModel,
  mockAccResourceGroups,
  mockRevisions,
  itemRevisionMocks
} from "@mocks/index";

const onAccessibilityReset = jest.fn();
const onAccessibilityUpdate = jest.fn();
const onDirectionSelect = jest.fn();
const onItemSelect = jest.fn();
const onRevisionSelect = jest.fn();

const defaultProps: ItemBankViewerProps = {
  onAccessibilityReset,
  onAccessibilityUpdate,
  onDirectionSelect,
  onItemSelect,
  onRevisionSelect
};

describe("ItemBankViewer", () => {
  const wrapper = shallow(<ItemBankViewer {...defaultProps} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ItemBankViewer with revision model", () => {
  const wrapper = shallow(
    <ItemBankViewer
      {...defaultProps}
      aboutItemRevisionModel={aboutItemRevisionMockModel}
    />
  );
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ItemBankViewer with revision model and accResourceGroup", () => {
  const wrapper = shallow(
    <ItemBankViewer
      {...defaultProps}
      aboutItemRevisionModel={aboutItemRevisionMockModel}
      accResourceGroups={mockAccResourceGroups}
      revisions={mockRevisions}
    />
  );
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ItemBankViewer with all props defined", () => {
  const wrapper = shallow(
    <ItemBankViewer
      {...defaultProps}
      aboutItemRevisionModel={aboutItemRevisionMockModel}
      accResourceGroups={mockAccResourceGroups}
      revisions={mockRevisions}
      nextItem={itemRevisionMocks[0]}
      prevItem={itemRevisionMocks[1]}
    />
  );
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
