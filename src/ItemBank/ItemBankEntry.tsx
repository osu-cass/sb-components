import * as React from "react";
import {
  Accordion,
  ToolTip,
  ItemRevisionModel,
  SectionModel,
  ItemEntryTable
} from "../index";
import { CsvEntry } from "../CsvEntry/CsvEntry";

export interface ItemBankEntryProps {
  updateItems: (items: ItemRevisionModel[]) => void;
  sections: SectionModel[];
  items: ItemRevisionModel[];
}

export interface ItemBankEntryState {
  csvIsOpen: boolean;
  itemsEntryIsOpen: boolean;
}

export class ItemBankEntry extends React.Component<
  ItemBankEntryProps,
  ItemBankEntryState
> {
  constructor(props: ItemBankEntryProps) {
    super(props);
    this.state = {
      csvIsOpen: false,
      itemsEntryIsOpen: false
    };
  }

  onCsvClick = () => {
    this.setState({
      csvIsOpen: true
    });
  };

  onCsvBlur = () => {
    this.setState({
      csvIsOpen: false,
      itemsEntryIsOpen: true
    });
  };

  renderCsvEntry() {
    return (
      <Accordion accordionTitle="CSV Entry" isOpen={this.state.csvIsOpen}>
        <div className="csv-entry-container section">
          <div className="csv-entry-wrapper">
            <CsvEntry
              onItemsUpdate={this.props.updateItems}
              onBlur={this.onCsvBlur}
              onClick={this.onCsvClick}
            />
          </div>
        </div>
      </Accordion>
    );
  }

  renderTableEntry() {
    const { items, updateItems, sections } = this.props;

    return (
      <Accordion
        accordionTitle="Items Entry"
        isOpen={this.state.itemsEntryIsOpen}
      >
        <ItemEntryTable
          itemRows={items}
          onItemsUpdate={updateItems}
          sections={sections}
        />
      </Accordion>
    );
  }

  render() {
    return (
      <div>
        {this.renderCsvEntry()}
        {this.renderTableEntry()}
      </div>
    );
  }
}
