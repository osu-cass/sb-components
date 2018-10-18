import * as React from "react";
import { RubricModel, RubricTableRowModel } from "./RubricModels";
import { ItemRevisionModel } from "@src/index";

export interface RubricTableProps {
  rubrics: RubricModel[];
  itemModel?: ItemRevisionModel;
}

export class RubricTable extends React.Component<RubricTableProps, {}> {
  renderRubric(rubric: RubricModel, index: number) {
    let rows: RubricTableRowModel[] = [];
    if (rubric.rubricEntries && rubric.rubricEntries.length > 0) {
      rows = rubric.rubricEntries.map(entry => {
        const sample = rubric.samples.find(
          s =>
            s.sampleResponses &&
            s.sampleResponses[0] &&
            s.sampleResponses[0].scorePoint === entry.scorepoint
        );
        const sampleHtml = sample
          ? sample.sampleResponses.map(sr => sr.sampleContent).join("<br/>")
          : "";

        return {
          score: entry.scorepoint,
          rationale: this.populatePath(entry.value),
          sample: sampleHtml
        };
      });
    }

    const showSample = rubric.samples.length !== 0;

    const leftAlign: React.CSSProperties = {
      textAlign: "left"
    };

    // tslint:disable:react-no-dangerous-html
    const rowsJsx = rows.map((row, i) => (
      <tr key={i}>
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
        ) : (
          undefined
        )}
      </tr>
    ));
    // tslint:enable:react-no-dangerous-html

    return (
      <table className="item-data-table" key={index}>
        <thead>
          <tr>
            <th>Score</th>
            <th>Rationale</th>
            {showSample ? <th>Exemplar</th> : undefined}
          </tr>
        </thead>
        <tbody>{rowsJsx}</tbody>
      </table>
    );
  }

  populatePath(html: string) {
    const { itemModel } = this.props;
    const rubricElement = document.createElement("div");
    // tslint:disable-next-line
    rubricElement.innerHTML = html;
    const imgTags = rubricElement.getElementsByTagName("img");
    Array.from(imgTags).forEach(img => {
      const pos = img.src.indexOf("item_");
      if (pos && itemModel) {
        const text = img.src;
        const path = "rubricImage/";
        let params = `?itemId=${itemModel.bankKey}-${itemModel.itemKey}`;
        params += itemModel.revision ? `&version=${itemModel.revision}` : "";
        img.src = [text.slice(0, pos), path, text.slice(pos), params].join("");
      }
    });

    return rubricElement.innerHTML;
  }

  render() {
    return (
      <div>{this.props.rubrics.map((r, i) => this.renderRubric(r, i))}</div>
    );
  }
}
