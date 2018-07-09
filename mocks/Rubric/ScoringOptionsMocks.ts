import { SmarterAppOptionModel } from "./RubricModels";

export const scoringOptionsMock: SmarterAppOptionModel[] = [
  {
    name: "A",
    value: "14",
    feedback: "CORRECT: Because its the right answer",
    language: "EN-US",
    answer: true
  },
  {
    name: "B",
    value: "a million",
    feedback: "INCORRECT: Because its the wrong answer",
    language: "EN-US",
    answer: false
  }
];
