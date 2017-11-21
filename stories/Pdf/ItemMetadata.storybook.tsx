import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PdfDecorator } from "../PdfDecorator";
import { EvidenceStatement } from "../../src/Pdf/EvidenceStatement";
import { ItemCardTable } from "../../src/ItemCard/ItemCardTable";
import { completeItemCard } from "../ItemCard/mocks";

storiesOf("PDF Item Metadata", module)
  .addDecorator(PdfDecorator)
  .add("Evidence Statement", () => (
    <EvidenceStatement statement="This is the evidence statement" />
  ))
  .add("Item Card Table", () => <ItemCardTable card={completeItemCard} />);
