import * as React from "react";
import * as Path from "path";
import * as os from "os";
import { ItemPdfModel, PdfViewType } from "./PdfModels";

export interface ItemViewProps {
  view: ItemPdfModel;
}

export class ItemView extends React.Component<ItemViewProps, {}> {
  render() {
    let item: JSX.Element | undefined;
    const { view } = this.props;
    if (view.type === PdfViewType.html) {
      // tslint:disable-next-line:react-no-dangerous-html
      item = <div dangerouslySetInnerHTML={{ __html: view.html || "" }} />;
    } else if (view.screenshotUrl) {
      item = <img alt="" role="presentation" src={view.screenshotUrl} />;
    }

    return item;
  }
}
