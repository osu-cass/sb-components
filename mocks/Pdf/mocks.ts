import {
  ItemViewContainerProps,
  ItemGroupModel,
  PdfViewType
} from "@src/index";
import {
  aboutItemMockModel,
  aboutItemMockNoRubric
} from "@mocks/AboutItem/mocks";

export const singleQuestion: ItemGroupModel = {
  questions: [
    {
      id: "187-1234",
      view: {
        id: "187-1234",
        html: "<b>Solve for x</b><p><i>x</i> + 5 = 10</p>",
        captured: true,
        type: PdfViewType.html
      },
      data: aboutItemMockModel,
      questionNumber: 1
    }
  ]
};

export const passageAndQuestion: ItemGroupModel = {
  passage: {
    id: "187-1234",
    html: "Together, Bob and Joe have 10 cookies.",
    captured: true,
    type: PdfViewType.html
  },
  questions: [
    {
      id: "187-1234",
      view: {
        id: "187-1234",
        html: "If Bob has 5 cookies, how many does Joe have?",
        captured: true,
        type: PdfViewType.html
      },
      data: aboutItemMockNoRubric,
      questionNumber: 1
    }
  ]
};

export const multipleQuestions: ItemGroupModel = {
  passage: {
    id: "187-1234",
    html: "Together, Bob and Joe have 10 cookies.",
    captured: true,
    type: PdfViewType.html
  },
  questions: [
    {
      id: "187-1234",
      view: {
        id: "187-1234",
        html: "If Bob has 5 cookies, how many does Joe have?",
        captured: true,
        type: PdfViewType.html
      },
      data: aboutItemMockNoRubric,
      questionNumber: 1
    },
    {
      id: "187-1235",
      view: {
        id: "187-1235",
        html:
          "Sally has 3 cookies. If she pools her cookies with Bob and Joe, how many do they have together?",
        captured: true,
        type: PdfViewType.html
      },
      data: aboutItemMockNoRubric,
      questionNumber: 2
    }
  ]
};
