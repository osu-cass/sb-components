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

export class ItemBankEntry extends React.Component<ItemBankEntryProps, {}> {
  constructor(props: ItemBankEntryProps) {
    super(props);
  }

  renderCsvEntry() {
    const csvEntry: JSX.Element = (
      <div className="csv-entry-container section">
        <div className="csv-entry-wrapper">
          <CsvEntry onItemsUpdate={this.props.updateItems} />
        </div>
      </div>
    );

    return <Accordion accordionTitle="CSV Entry" contentItem={csvEntry} />;
  }

  renderTableEntry() {
    const { items, updateItems, sections } = this.props;
    const itemsTable = (
      <ItemEntryTable
        itemRows={items}
        onItemsUpdate={updateItems}
        sections={sections}
      />
    );

    return <Accordion accordionTitle="Items Entry" contentItem={itemsTable} />;
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
