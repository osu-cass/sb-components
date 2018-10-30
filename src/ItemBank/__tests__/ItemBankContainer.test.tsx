import "jsdom-global/register";
import * as React from "react";
import { shallow, mount } from "enzyme";
import {
  ItemBankContainer,
  ItemBankContainerProps,
  ItemBankViewer,
  ItemBankViewerProps,
  ItemBankEntry,
  ItemRevisionModel
} from "@src/index";
import * as BankMocks from "./mocks";
import { ItemBankContainerState } from "../ItemBankContainer";
import { namespaceMocks } from "@mocks/ItemBank/mocks";
const item: ItemRevisionModel = {
  itemKey: 187,
  bankKey: 3000,
  hasBankKey: true,
  namespace: "itemreviewviewer",
  revision: "asfe",
  isaap: ""
};
const item2 = { ...item, bankKey: 2332, revision: "asdf" };

describe("ItemBankContainer", () => {
  const props: ItemBankContainerProps = {
    aboutItemRevisionClient: BankMocks.mockBankAboutItemClient,
    accessibilityClient: BankMocks.mockBankAccessibilityClient,
    revisionsClient: BankMocks.mockBankRevisionsClient,
    namespaces: namespaceMocks,
    sectionsClient: BankMocks.mockBankSectionsClient,
    itemViewUrl: "hello",
    items: [item, item2],
    setUrl: BankMocks.mockOnItemHandler,
    resetUrl: () => {
      const url = "";
    }
  };

  const wrapper = mount(<ItemBankContainer {...props} />);
  it("default wrapper", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("has item bank viewer", () => {
    const itemBankViewer = wrapper.findWhere(
      node => node.type() === ItemBankViewer
    );
    expect(itemBankViewer).toBeDefined();
    expect(itemBankViewer).toMatchSnapshot();
  });

  it("item bank entry", () => {
    const wrapperInstance = wrapper.instance() as ItemBankContainer;
    const itemBankEntry = wrapper.findWhere(
      node => node.type() === ItemBankEntry
    );
    expect(itemBankEntry).toBeDefined();
    expect(itemBankEntry).toMatchSnapshot();
  });

  it("updates item url", () => {
    const wrapperInstance = wrapper.instance() as ItemBankContainer;
    wrapperInstance.handleUpdateIsaap(BankMocks.mockAccessibility);
    expect(BankMocks.mockOnItemHandler).toHaveBeenCalled();
  });

  it("has current item", () => {
    const wrapperInstance = wrapper.instance() as ItemBankContainer;
    expect(wrapperInstance.state.currentItem).toBeDefined();
    expect(wrapperInstance.state.currentItem).toEqual(item);
  });

  it("updates next item", () => {
    const wrapperInstance = wrapper.instance() as ItemBankContainer;
    wrapperInstance.handleNextItem();
    expect(wrapperInstance.state.currentItem).toBeDefined();
    expect(wrapperInstance.state.currentItem).toEqual(item2);
  });

  it("item viewer calls item select next", () => {
    const wrapperInstance = wrapper.instance() as ItemBankContainer;
    const itemBankViewer = wrapper.findWhere(
      node => node.type() === ItemBankViewer
    );
    const itemBankViewerInstance = itemBankViewer.instance() as ItemBankViewer;
    itemBankViewerInstance.props.onDirectionSelect("next");
    expect(wrapperInstance.state.currentItem).toEqual(item2);
  });

  it("item viewer calls item select previous", () => {
    const wrapperInstance = wrapper.instance() as ItemBankContainer;
    wrapperInstance.handleNextItem();
    const itemBankViewer = wrapper.findWhere(
      node => node.type() === ItemBankViewer
    );
    const itemBankViewerInstance = itemBankViewer.instance() as ItemBankViewer;
    itemBankViewerInstance.props.onDirectionSelect("previous");
    expect(wrapperInstance.state.currentItem).toEqual(item);
  });

  it("item viewer calls item select revision", () => {
    const wrapperInstance = wrapper.instance() as ItemBankContainer;
    wrapperInstance.handleChangeRevision();
    const itemBankViewer = wrapper.findWhere(
      node => node.type() === ItemBankViewer
    );
    const itemBankViewerInstance = itemBankViewer.instance() as ItemBankViewer;
    itemBankViewerInstance.props.onRevisionSelect("asdf");
    item.revision = "asdf";
    expect(wrapperInstance.state.currentItem).toEqual(item);
  });

  it("item viewer calls item select previous null item", () => {
    const wrapperInstance = wrapper.instance() as ItemBankContainer;
    wrapperInstance.setState({ currentItem: undefined });
    const itemBankViewer = wrapper.findWhere(
      node => node.type() === ItemBankViewer
    );
    const itemBankViewerInstance = itemBankViewer.instance() as ItemBankViewer;
    itemBankViewerInstance.props.onDirectionSelect("previous");
    expect(wrapperInstance.state.currentItem).toEqual(item);
  });

  it("item viewer calls item select next null item", () => {
    const wrapperInstance = wrapper.instance() as ItemBankContainer;
    wrapperInstance.setState({ currentItem: undefined });
    const itemBankViewer = wrapper.findWhere(
      node => node.type() === ItemBankViewer
    );
    const itemBankViewerInstance = itemBankViewer.instance() as ItemBankViewer;
    itemBankViewerInstance.props.onDirectionSelect("next");
    expect(wrapperInstance.state.currentItem).toEqual(item);
  });
});
