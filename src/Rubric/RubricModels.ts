export interface SampleResponseModel {
  purpose: string;
  scorePoint: string;
  name: string;
  sampleContent: string;
}

export interface RubricSampleModel {
  maxValue: string;
  minValue: string;
  sampleResponses: SampleResponseModel[];
}

export interface RubricEntryModel {
  scorepoint: string;
  name: string;
  value: string;
}

export interface RubricModel {
  language: string;
  rubricEntries: RubricEntryModel[];
  samples: RubricSampleModel[];
}

export interface SampleItemScoringModel {
  answerKey?: string;
  hasMachineRubric?: boolean;
  scoringOptions?: SmarterAppOptionModel[];
  rubrics?: RubricModel[];
}

export interface SmarterAppOptionModel {
  name: string;
  value: string;
  feedback: string;
  language: string;
  answer: string;
}

export interface RubricTableRowModel {
  score: string;
  rationale: string;
  sample: string;
}
