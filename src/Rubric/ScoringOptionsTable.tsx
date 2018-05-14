import * as React from "react";
import { SmarterAppOptionModel } from "./RubricModels";

export interface ScoringOptionsProps {
  options: SmarterAppOptionModel[];
}

// tslint:disable-next-line:variable-name
export const ScoringOptions: React.SFC<ScoringOptionsProps> = props => {
  const rowsJSX = props.options.map(o => (
    <tr>
      <td>{o.name}</td>
      <td>{o.feedback}</td>
    </tr>
  ));

  return (
    <table className="item-data-table">
      <thead>
        <tr>
          <th>Option</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>{rowsJSX}</tbody>
    </table>
  );
};
