import * as React from "react";
import * as Path from "path";
import { ItemPdfModel, PdfViewType } from "./PdfModels";

export interface ItemViewProps {
  view: ItemPdfModel;
}

export class ItemView extends React.Component<ItemViewProps, {}> {
  render() {
    let item: JSX.Element | undefined;

    if (this.props.view.type === PdfViewType.html) {
      item = (
        <div dangerouslySetInnerHTML={{ __html: this.props.view.html || "" }} />
      );
    } else if (this.props.view.picturePath) {
      const fileName = Path.basename(this.props.view.picturePath);
      item = (
        <img
          alt=""
          role="presentation"
          src={`images/screenshots/${fileName}`}
        />
      );
    }

    return item;
  }
}
