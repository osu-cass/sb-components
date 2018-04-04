import * as React from "react";
import {
  ToolTip,
  ItemRevisionModel,
  CsvRowModel,
  parseCsv,
  Accordion
} from "@src/index";

export interface CsvEntryProps {
  onItemsUpdate: (items: ItemRevisionModel[]) => void;
}

export interface CsvEntryState {
  csvInputValue?: string;
  csvData: CsvRowModel[];
}

export class CsvEntry extends React.Component<CsvEntryProps, CsvEntryState> {
  constructor(props: CsvEntryProps) {
    super(props);

    this.state = { csvData: [] };
  }

  renderHelpButton() {
    return (
      <div className="help-button">
        <ToolTip
          helpText={<p>Drag and drop items to add them to the table</p>}
          position="bottom"
        >
          <button
            className="item-nav-btn btn btn-default btn-sm about-item-btn"
            role="button"
            aria-label="Open help text"
          >
            <span className="fa fa-info-circle" aria-hidden="true" />
            Help
          </button>
        </ToolTip>
      </div>
    );
  }

  handleCsvChange(event: React.FormEvent<HTMLTextAreaElement>) {
    const rawCsv: string = event.currentTarget.value;

    this.setState({
      csvInputValue: rawCsv
    });
  }

  handleCsvBlur = () => {
    const { csvInputValue } = this.state;
    const csvData = parseCsv(csvInputValue);

    this.setState({
      csvData
    });

    this.props.onItemsUpdate(csvData);
  };

  render() {
    return (
      <div className="csv-entry-wrapper">
        {this.renderHelpButton()}
        <textarea
          className="csv-text-entry"
          onChange={e => this.handleCsvChange(e)}
          value={this.state.csvInputValue}
          onBlur={this.handleCsvBlur}
        />
      </div>
    );
  }
}
