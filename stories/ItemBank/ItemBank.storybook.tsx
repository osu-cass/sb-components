import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  Layout,
  AboutItem,
  ItemAccessibilityModal,
  ItemBankContainer
} from "@src/index";
import { aboutItemMockModel } from "@mocks/AboutItem/mocks";
import { centerDecorator } from "../CenterDecorator";
import { routerDecorator } from "../RouterDecorator";
import {
  mockBankAboutItemClient,
  mockBankAccessibilityClient,
  mockBankRevisionsClient,
  mockBankSectionsClient,
  itemRevisionMocks
} from "@mocks/ItemBank/mocks";

storiesOf("Item Bank", module)
  .addDecorator(routerDecorator)
  .add("default", () => (
    <Layout
      children={
        <ItemBankContainer
          accessibilityClient={mockBankAccessibilityClient}
          aboutItemRevisionClient={mockBankAboutItemClient}
          revisionsClient={mockBankRevisionsClient}
          itemViewUrl="http://ivs.smarterbalanced.org/items?ids=187-3000"
          sectionsClient={mockBankSectionsClient}
          items={itemRevisionMocks}
          getUrl={item => ""}
        />
      }
      siteName="Item Bank"
    />
  ));
