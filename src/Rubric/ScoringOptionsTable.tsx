import * as React from "react";
import { SmarterAppOptionModel } from "./RubricModels";

export interface ScoringOptionsProps {
  options: SmarterAppOptionModel[];
}

// tslint:disable-next-line:variable-name
export const ScoringOptions: React.SFC<ScoringOptionsProps> = props => {
  // tslint:disable:react-no-dangerous-html
  const rowsJSX = props.options.map(o => (
    <tr>
      <td>{o.name}</td>
      <td dangerouslySetInnerHTML={{ __html: o.feedback }} />
    </tr>
  ));
  // tslint:enable:react-no-dangerous-html

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
