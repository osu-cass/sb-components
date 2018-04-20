import * as React from "react";
import { RubricModel } from "./RubricModels";
export interface RubricTableProps {
    rubrics: RubricModel[];
}
export declare class RubricTable extends React.Component<RubricTableProps, {}> {
    renderRubric(rubric: RubricModel, index: number): JSX.Element;
    render(): JSX.Element;
}
