import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PdfDecorator } from "../PdfDecorator";
import { ItemViewContainer } from "../../src/Pdf/ItemViewContainer";
import { singleQuestion } from "./Mocks";

storiesOf("PDF ItemViewContainer", module)
    .addDecorator(PdfDecorator)
    .add("question only", () => (
    <ItemViewContainer itemData={singleQuestion} />
    ));
