import * as React from "react";
import {
  generateTooltip,
  ItemRevisionModel,
  CsvRowModel,
  NamespaceModel,
  parseCsv,
  Accordion,
  validItemRevisionModel,
  toCsvText,
  toCsvModel
} from "@src/index";

export interface CsvEntryProps {
  namespaces: NamespaceModel[];
  onItemsUpdate: (items: ItemRevisionModel[]) => void;
  onApply: () => void;
  itemRows: ItemRevisionModel[];
}

export interface CsvEntryState {
  csvInputValue?: string;
  csvData: CsvRowModel[];
}

export class CsvEntry extends React.Component<CsvEntryProps, CsvEntryState> {
  constructor(props: CsvEntryProps) {
    super(props);
    const csvData: CsvRowModel[] = [];
    let csvInputValue: string = "";
    if (props.itemRows.length > 1) {
      props.itemRows.forEach((item, index) => {
        csvData.push({ ...item, index });
      });
      csvInputValue = toCsvText(csvData);
    }
    this.state = {
      csvInputValue,
      csvData
    };
  }

  componentWillReceiveProps(props: CsvEntryProps, state: CsvEntryState) {
    if (
      props.itemRows !== this.props.itemRows ||
      this.props.itemRows.length !== props.itemRows.length
    ) {
      const csvData = toCsvModel(props.itemRows);
      const csvInputValue = toCsvText(csvData);
      this.setState({ csvData, csvInputValue });
    }
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
