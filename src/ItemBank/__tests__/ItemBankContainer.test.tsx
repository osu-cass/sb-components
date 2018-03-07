import * as React from "react";
import { shallow } from "enzyme";
import { ItemBankContainer } from "../ItemBankContainer";
import {
  mockBankAccessibilityClient,
  mockBankRevisionsClient,
  mockBankSectionsClient,
  mockBankAboutItemClient
} from "mocks/ItemBank/mocks";

describe("ItemBankViewer", () => {
  const wrapper = shallow(
    <ItemBankContainer
      accessibilityClient={mockBankAccessibilityClient}
      aboutItemRevisionClient={mockBankAboutItemClient}
      revisionsClient={mockBankRevisionsClient}
      sectionsClient={mockBankSectionsClient}
      itemViewUrl=""
      items={undefined}
      getUrl={() => {
        return "";
      }}
    />
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
