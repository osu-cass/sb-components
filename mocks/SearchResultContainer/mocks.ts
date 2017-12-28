import {
  SearchResultContainerProps,
  SearchResultType
} from "src/SearchResultContainer/SearchResultContainer";

export const SearchResultCardProps: SearchResultContainerProps = {
  onRowSelection: () => {},
  onItemSelection: () => {},
  itemCards: [
    {
      selected: false,
      bankKey: 187,
      itemKey: 3206,
      title: "Math Grade 6 Claim 1",
      grade: 8,
      gradeLabel: "Grade 6",
      subjectCode: "MATH",
      subjectLabel: "Math",
      claimCode: "MATH1",
      claimLabel: "Concepts and Procedures",
      targetHash: 100,
      targetId: "A",
      targetShortName: "",
      interactionTypeCode: "EQ",
      interactionTypeLabel: "Equation",
      isPerformanceItem: true,
      brailleOnlyItem: false
    },
    {
      selected: false,
      bankKey: 187,
      itemKey: 3163,
      title: "ELA/ literacy Grade 3 Claim 1",
      grade: 1,
      gradeLabel: "Grade 3",
      subjectCode: "ELA",
      subjectLabel: "ELA/literacy",
      claimCode: "ELA1",
      claimLabel: "Reading",
      targetHash: 1039,
      targetId: "B",
      targetShortName: "Key Details",
      interactionTypeCode: "MC",
      interactionTypeLabel: "Multiple Choice",
      isPerformanceItem: true,
      brailleOnlyItem: false
    },
    {
      selected: false,
      bankKey: 187,
      itemKey: 3615,
      title: "Math Grade 6 Claim 4",
      grade: 8,
      gradeLabel: "Grade 6",
      subjectCode: "MATH",
      subjectLabel: "Math",
      claimCode: "MATH4",
      claimLabel: "Modeling/Data Analysis",
      targetHash: 0,
      targetId: "C",
      targetShortName: "",
      interactionTypeCode: "MS",
      interactionTypeLabel: "Multi Select",
      isPerformanceItem: false,
      brailleOnlyItem: false
    },
    {
      selected: false,
      bankKey: 187,
      itemKey: 2928,
      title: "ELA/ literacy Grade 4 Claim 4",
      grade: 2,
      gradeLabel: "Grade 4",
      subjectCode: "ELA",
      subjectLabel: "ELA/literacy",
      claimCode: "ELA4",
      claimLabel: "Research/Inquiry",
      targetHash: 2832,
      targetId: "D",
      targetShortName: "Evaluate Information/ sources",
      interactionTypeCode: "MS",
      interactionTypeLabel: "Multi Select",
      isPerformanceItem: false,
      brailleOnlyItem: false
    }
  ],
  item: {
    kind: "none"
  },
  defaultRenderType: SearchResultType.ItemCard
};

export const SearchResultTableProps: SearchResultContainerProps = {
  ...SearchResultCardProps,
  defaultRenderType: SearchResultType.Table
};

export const SearchResultEmptyProps: SearchResultContainerProps = {
  onRowSelection: () => {},
  onItemSelection: () => {},
  item: {
    kind: "none"
  },
  defaultRenderType: SearchResultType.ItemCard
};