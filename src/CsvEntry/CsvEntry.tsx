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
  csvText: string;
  namespaces: NamespaceModel[];
  onCsvTextUpdate: (csvText: string) => void;
  onItemsUpdate: (items: ItemRevisionModel[]) => void;
  onApply: () => void;
}

export interface CsvEntryState {
  csvInputValue?: string;
  csvData: CsvRowModel[];
}

export class CsvEntry extends React.Component<CsvEntryProps, CsvEntryState> {
  constructor(props: CsvEntryProps) {
    super(props);

    this.state = {
      csvInputValue: props.csvText,
      csvData: []
    };
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

  renderHelpButton() {
    const helpText: JSX.Element = this.renderHelpText();
    const displayText: JSX.Element = (
      <button
        className="item-nav-btn btn btn-default btn-sm"
        role="button"
        aria-label="Open help text"
      >
        <span className="fa fa-info-circle" aria-hidden="true" />
        Help
      </button>
    );

    return (
      <span className="csv-button-left">
        {generateTooltip({
          helpText,
          displayText,
          displayIcon: undefined
        })}
      </span>
    );
  }

  renderApplyButton() {
    return (
      <span className="csv-button-right">
        <button
          className="item-nav-btn btn btn-primary btn-sm csv-apply-button"
          role="button"
          aria-label="Apply text"
          onClick={this.handleCsvApply}
        >
          <span className="fa fa-check-circle" aria-hidden="true" />
          Apply
        </button>
      </span>
    );
  }

  handleCsvChange(event: React.FormEvent<HTMLTextAreaElement>) {
    const rawCsv: string = event.currentTarget.value;

    this.setState({
      csvInputValue: rawCsv
    });

    this.props.onCsvTextUpdate(rawCsv);
  }

  handleCsvApply = () => {
    const { csvInputValue } = this.state;
    const { namespaces } = this.props;
    const csvData = parseCsv(csvInputValue, namespaces);

    this.setState({
      csvData
    });
    this.props.onItemsUpdate(csvData);
    this.props.onApply();
  };

  render() {
    return (
      <div className="csv-entry-wrapper">
        <div className="csv-button-row">
          {this.renderHelpButton()}
          {this.renderApplyButton()}
        </div>
        <textarea
          className="csv-text-entry"
          onChange={e => this.handleCsvChange(e)}
          value={this.state.csvInputValue}
        />
      </div>
    );
  }
}
