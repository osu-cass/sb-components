import * as React from "react";
import {
  generateTooltip,
  ItemRevisionModel,
  CsvRowModel,
  NamespaceModel,
  parseCsv,
  Accordion
} from "@src/index";

export interface CsvEntryProps {
  namespaces: NamespaceModel[];
  onItemsUpdate: (items: ItemRevisionModel[]) => void;
  onBlur: () => void;
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
    const helpText: JSX.Element = this.renderHelpText();
    const displayText: JSX.Element = (
      <button
        className="item-nav-btn btn btn-default btn-sm about-item-btn"
        role="button"
        aria-label="Open help text"
      >
        <span className="fa fa-info-circle" aria-hidden="true" />
        Help
      </button>
    );

    return (
      <div className="help-button">
        {generateTooltip({
          helpText,
          displayText,
          displayIcon: undefined
        })}
      </div>
    );
  }

  renderHelpText(): JSX.Element {
    return (
      <p>
        Enter namespace, bank key, item id, and section for the namespace which
        has a bank key. Or,<br />
        Enter namespace , item id, and section for the namespace which doesn't
        have a bank key.
      </p>
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
    const { namespaces } = this.props;
    const csvData = parseCsv(csvInputValue, namespaces);

    this.setState({
      csvData
    });
    this.props.onItemsUpdate(csvData);
    this.props.onBlur();
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
