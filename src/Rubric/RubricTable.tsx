import "../Styles/pdf.less";
import * as React from "react";
import { RubricModel, RubricTableRowModel } from "./RubricModels";

export interface RubricTableProps {
  rubrics: RubricModel[];
}

export class RubricTable extends React.Component<RubricTableProps, {}> {
  renderRubric(rubric: RubricModel, index: number) {
    const rows = rubric.rubricEntries.map(entry => {
      const sample = rubric.samples.find(
        s =>
          s.sampleResponses[0] &&
          s.sampleResponses[0].scorePoint == entry.scorepoint
      );
      const sampleHtml = sample
        ? sample.sampleResponses.map(sr => sr.sampleContent).join("<br/>")
        : "";
      return {
        score: entry.scorepoint,
        rationale: entry.value,
        sample: sampleHtml
      } as RubricTableRowModel;
    });

    const showSample = rubric.samples.length !== 0;

    const leftAlign = {
      textAlign: "left"
    };

    const rowsJsx = rows.map(row => (
      <tr key={row.score}>
        <td>{row.score}</td>
        <td
          dangerouslySetInnerHTML={{ __html: row.rationale }}
          style={leftAlign}
        />
        {showSample ? (
          <td
            dangerouslySetInnerHTML={{ __html: row.sample }}
            style={leftAlign}
          />
        ) : null}
      </tr>
    ));

    return (
      <table className="item-data-table" key={index}>
        <thead>
          <tr>
            <th>Score</th>
            <th>Rationale</th>
            {showSample ? <th>Exemplar</th> : null}
          </tr>
        </thead>
        <tbody>{rowsJsx}</tbody>
      </table>
    );
  }

  render() {
    return (
      <div>{this.props.rubrics.map((r, i) => this.renderRubric(r, i))}</div>
    );
  }
}
