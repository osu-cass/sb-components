import * as React from "react";
import { Accordion } from "../Accordion/Accordion";

export interface CsvEntryProps {}

export interface CsvEntryState {}

export class CsvEntry extends React.Component<CsvEntryProps, CsvEntryState> {
  constructor(props: CsvEntryProps) {
    super(props);

    this.state = {};
  }

  getCsvContent(): JSX.Element {
    return (
      <div>
        <textarea className="csv-text-entry" />
        <button>Parse</button>
      </div>
    );
  }

  getItemContent(): JSX.Element {
    return (
      <div className="table">
        <div className="tr th">
          <div className="td">Bank</div>
          <div className="td">Item</div>
          <div className="td">Section</div>
          <div className="td" />
        </div>
        <div className="tr">
          <div className="td">
            <input type="text" value="187" />
          </div>
          <div className="td">
            <input type="text" value="3000" />
          </div>
          <div className="td">
            <input type="text" value="A" />
          </div>
          <div className="td">
            <button>Save</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <Accordion
          accordionTitle="CSV Entry"
          contentItem={this.getCsvContent()}
        />
        <Accordion accordionTitle="Items" contentItem={this.getItemContent()} />
      </div>
    );
  }
}
