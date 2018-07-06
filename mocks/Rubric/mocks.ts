import { RubricModalProps } from "@src/Rubric/RubricModal";

export const rubricModalMockProps: RubricModalProps = {
  showModal: true,
  rubrics: [
    {
      language: "English",
      rubricEntries: [
        {
          scorepoint: "2",
          name: "\n        Rubric 2",
          value:
            '<p style="text-decoration:underline; font-weight:bold; ">3 point text </p><p style="">&#xA0;</p><p style="">The student determines that Emily can make it to school on time at her current rate of speed and includes a valid explanation containing a full chain of reasoning that supports this conclusion. The student may make minor computation errors that do not affect the reasonableness of the explanation. </p><p style="">&#xA0;</p><p style="">&#xA0;</p><p style="text-decoration:underline; font-weight:bold; ">2 point text </p><p style="text-decoration:underline; font-weight:bold; ">&#xA0;</p><p style="">The student determines that Emily can make it to school on time at her current rate of speed and includes a valid explanation containing an incomplete chain of reasoning that supports this conclusion. (An incomplete chain of reasoning can be defined by missing process steps or unsupported calculations in an otherwise complete chain of reasoning.) </p><p style="">OR </p><p style="">The student determines that Emily can make it to school on time at her current rate of speed and includes a valid explanation containing a full chain of reasoning that supports this conclusion, but makes computation errors that affect the reasonableness of the explanation. </p>'
        },
        {
          scorepoint: "1",
          name: "\n        Rubric 1",
          value:
            '<p style="">The student completes the task and reaches a conclusion. The student\'s explanation attempts to relate distance to time, but contains errors in fundamental mathematical procedures. </p><p style="">&#xA0;</p>'
        },
        {
          scorepoint: "0",
          name: "\n        Rubric 0",
          value:
            '<p style="">The student demonstrates a lack of comprehension in regard to the mathematical content and practices essential to the task. </p>'
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
