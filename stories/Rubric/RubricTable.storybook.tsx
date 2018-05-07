import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RubricTable, RubricTableProps } from "../../src/Rubric/RubricTable";
import { RubricEntryModel } from "../../src/Rubric/RubricModels";

const rubricTableMockProps: RubricTableProps = {
  rubrics: [
    {
      language: "English",
      rubricEntries: [
        {
          scorepoint:
            '<p style=""><span style="font-weight:bold; ">Exemplar</span>: <img id="item_3200_Object3" style="vertical-align:middle;" src="item_3200_v0_Object3_png16malpha.png" width="23" height="36" /> or &#xA0;3<img id="item_3200_Object4" style="vertical-align:middle;" src="item_3200_v0_Object4_png16malpha.png" width="12" height="35" /></p><p style="">&#xA0;</p><p style="">For this item, a full-credit response includes:</p><p style="">&#xA0;</p><p style=""><span style="font-weight:bold; ">1 point</span>: correct response of 32/9 or 3 5/9.</p>',
          name: "\n        Rubric 2",
          value: "0"
        },
        {
          scorepoint:
            '<p style="">The student completes the task and reaches a conclusion. The student\'s explanation attempts to relate distance to time, but contains errors in fundamental mathematical procedures. </p><p style="">&#xA0;</p>',
          name: "\n        Rubric 1",
          value: "1"
        },
        {
          scorepoint:
            '<p style="">The student demonstrates a lack of comprehension in regard to the mathematical content and practices essential to the task. </p>',
          name: "\n        Rubric 0",
          value: "2"
        }
      ],
      samples: [
        {
          maxValue: "2",
          minValue: "2",
          sampleResponses: [
            {
              purpose: "OtherExemplar",
              scorePoint: "2",
              name: "2-Point Other Official Sample Answers\n      ",
              sampleContent:
                '<p style=""><span style="text-decoration:underline; font-weight:bold; ">Sample 1: </span>&#xA0;</p><p style="">Emily can travel 3/4 mile in under 5 minutes, so she can travel 3 miles (4x as far) in under 20 minutes (4x as long.) This means that Emily will have traveled 3 miles before 8:45 (20 minutes after she left.) Then there is only .42 miles left to go, and since .42 miles is less than 3/4 mile, we know she can cover that distance in less than 5 minutes. That means she will get to school before 8:50, so she will be on time. </p><p style="">&#xA0;</p><p style=""><span style="text-decoration:underline; font-weight:bold; ">Sample 2:</span> &#xA0;</p><p style="">Emily travels 3/4 mile in 4.5 minutes, so to find her rate of travel we would divide time by distance and get (4.5) / (.75) = 6 minutes per mile. Multiply 6 minutes per mile times the distance she has to travel (3.42 miles) to find the time it would take for her to get to school (20.52.) Since 20.52 is less than 21 minutes, we know it will take her less than 21 minutes to get to school. 8:25 + 21 minutes is 8:46, which is before 8:50, so she will make it to school on time. </p>'
            }
          ]
        }
      ]
    }
  ]
};

storiesOf("Rubric Table", module).add("with a rubric table", () => (
  <RubricTable {...rubricTableMockProps} />
));
