import * as React from "react";
import { storiesOf } from "@storybook/react";
import { routerDecorator } from "../RouterDecorator";
import { AboutItem } from "@src/index";
import {
  aboutItemMockModel,
  mockRubrics,
  rubricsEsn,
  allRubrics
} from "@mocks/AboutItem/mocks";
import { centerDecorator } from "../CenterDecorator";

storiesOf("About Item Modal", module)
  .addDecorator(centerDecorator)
  .addDecorator(routerDecorator)
  .add("default", () => (
    <AboutItem {...aboutItemMockModel} showRubrics={true} />
  ))
  .add("showing no rubrics", () => (
    <AboutItem {...aboutItemMockModel} showRubrics={true} showModal={true} />
  ))
  .add("showing rubrics", () => (
    <AboutItem
      {...aboutItemMockModel}
      showRubrics={true}
      showModal={true}
      sampleItemScoring={{ rubrics: mockRubrics }}
    />
  ))
  .add("showing rubrics ESN", () => (
    <AboutItem
      {...aboutItemMockModel}
      showRubrics={true}
      showModal={true}
      sampleItemScoring={{ rubrics: rubricsEsn }}
    />
  ))
  .add("showing rubrics ENU ESN", () => (
    <AboutItem
      {...aboutItemMockModel}
      showRubrics={true}
      showModal={true}
      sampleItemScoring={{ rubrics: allRubrics }}
    />
  ))
  .add("showing disabled rubrics", () => (
    <AboutItem
      {...aboutItemMockModel}
      showModal={true}
      sampleItemScoring={{ rubrics: allRubrics }}
    />
  ));
