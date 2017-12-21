import * as React from "react";
import { ItemView } from "./ItemView";
import { ItemPdfModel } from "./PdfModels";

export interface PassageViewProps {
  view: ItemPdfModel;
  associatedItems: string[];
}

export class PassageView extends React.Component<PassageViewProps, {}> {
  render() {
    return (
      <div className="item">
        <p className="question-title">
          Passage for{" "}
          {this.props.associatedItems.length === 1 ? "item" : "items"}{" "}
          {this.props.associatedItems.join(", ")}
        </p>
        <ItemView view={this.props.view} />
      </div>
    );
  }
}
