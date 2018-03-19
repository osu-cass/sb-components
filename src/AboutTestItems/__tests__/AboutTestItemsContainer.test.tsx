import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import * as TestUtils from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import {
  aboutTestMatch,
  aboutTestPath,
  aboutTestBadItem,
  defaultAboutTestItemsModel
} from "@mocks/AboutTestItems/mocks";
import {
  AboutItem,
  ItemViewerFrame,
  Select,
  AboutTestItemsContainer
} from "@src/index";
import * as Mocks from "./mocks";

describe("AboutTestItemsContainer", () => {
  const wrapper = shallow(
    <AboutTestItemsContainer
      showRubrics={true}
      aboutClient={Mocks.mockedAboutClient}
      params={{}}
      errorRedirectPath=""
    />
  );

  it("default render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("about item modal", () => {
    const aboutItem = wrapper.findWhere(node => node.type() === AboutItem);
    expect(aboutItem).toBeDefined();
    expect(aboutItem).toMatchSnapshot();
  });
  it("item frame", () => {
    const itemFrame = wrapper.findWhere(
      node => node.type() === ItemViewerFrame
    );
    expect(itemFrame).toBeDefined();
    expect(itemFrame).toMatchSnapshot();
  });

  it("sets about item", () => {
    const wrapperInstance = wrapper.instance() as AboutTestItemsContainer;
    wrapperInstance.onFetchedUpdatedViewModel(defaultAboutTestItemsModel);
    const {
      aboutItemsViewModel,
      aboutThisItemViewModel
    } = wrapperInstance.state;
    expect(aboutItemsViewModel.kind).toEqual("success");
    expect(aboutThisItemViewModel.kind).toEqual("success");
  });

  it("changes selected code", () => {
    const wrapperInstance = wrapper.instance() as AboutTestItemsContainer;
    wrapperInstance.handleChange("WER");
    expect(wrapperInstance.state.selectedCode).toEqual("WER");
  });

  it("calls about client", () => {
    const wrapperInstance = wrapper.instance() as AboutTestItemsContainer;
    wrapperInstance.fetchUpdatedViewModel("WER");
    expect(Mocks.mockedAboutClient).toHaveBeenCalled();
  });
  it("sets selected code", () => {
    const wrapperInstance = wrapper.instance() as AboutTestItemsContainer;
    wrapperInstance.fetchUpdatedViewModel("WER");
    expect(wrapperInstance.state.selectedCode).toEqual("WER");
  });
});
