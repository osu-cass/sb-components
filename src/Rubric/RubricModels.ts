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
