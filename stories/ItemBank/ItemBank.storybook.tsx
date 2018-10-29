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
  mockBankNamespacesClient,
  mockBankSectionsClient,
  itemRevisionMocks,
  mockBankAboutItemClientFail,
  itemRevisionMocksError,
  mockBankRevisionsClientFail,
  mockBankItemExistsClient,
  namespaceMocks
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
          itemExistsClient={mockBankItemExistsClient}
          itemViewUrl="https://ivs.smarterbalanced.org/items?ids=187-3000"
          namespaces={namespaceMocks}
          items={itemRevisionMocks}
          setUrl={item => ""}
          resetUrl={() => {
            const url = "";
          }}
        />
      }
      siteName="Item Bank"
    />
  ))
  .add("default error client", () => (
    <Layout
      children={
        <ItemBankContainer
          accessibilityClient={mockBankAccessibilityClient}
          aboutItemRevisionClient={mockBankAboutItemClientFail}
          revisionsClient={mockBankRevisionsClientFail}
          itemExistsClient={mockBankItemExistsClient}
          itemViewUrl=""
          namespaces={namespaceMocks}
          items={itemRevisionMocksError}
          setUrl={item => ""}
          resetUrl={() => {
            const url = "";
          }}
        />
      }
      siteName="Item Bank"
    />
  ));
