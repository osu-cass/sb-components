import { Layout } from "../../src/index";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ItemBankContainer } from "src/ItemBank/ItemBankContainer";
import { AboutItem } from "src/AboutItem/AboutItem";
import { AboutItemMockModel } from "mocks/AboutItem/mocks";
import { centerDecorator } from "../CenterDecorator";
import { ItemAccessibilityModal } from "src/";
import { routerDecorator } from "../RouterDecorator";
import {
  mockBankAboutItemClient,
  mockBankAccessibilityClient,
  mockBankRevisionsClient,
  mockBankSectionsClient,
  itemsMocks
} from "mocks/ItemBank/mocks";

storiesOf("Item Bank", module)
  .addDecorator(routerDecorator)
  .add("default", () => (
    <Layout
      children={
        <ItemBankContainer
          accessibilityClient={mockBankAccessibilityClient}
          aboutItemRevisionClient={mockBankAboutItemClient}
          revisionsClient={mockBankRevisionsClient}
          itemViewUrl=""
          sectionsClient={mockBankSectionsClient}
          items={itemsMocks}
        />
      }
      siteName="Item Bank"
    />
  ));
