import * as React from "react";
import { Collapsible } from "./Collapsible";
import { RubricEntryModel } from "./RubricModels";

export class RubricEntry extends React.Component<RubricEntryModel, {}> {
  render() {
    const pointLabel = this.props.scorepoint === "1" ? "point" : "points";
    const label = `${this.props.name} (${this.props.scorepoint} ${pointLabel})`;

    // tslint:disable:react-no-dangerous-html
    return (
      <Collapsible label={label}>
        <div dangerouslySetInnerHTML={{ __html: this.props.value }} />
      </Collapsible>
    );
    // tslint:enable:react-no-dangerous-html
  }
}
