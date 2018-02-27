import * as React from "react";
import {
  Accordion,
  ToolTip,
  ItemRevisionModel,
  SectionModel,
  ItemEntryTable
} from "../index";

export interface ItemBankEntryProps {
  updateItems: (items: ItemRevisionModel[]) => void;
  sections: SectionModel[];
  items: ItemRevisionModel[];
}

export class ItemBankEntry extends React.Component<ItemBankEntryProps, {}> {
  constructor(props: ItemBankEntryProps) {
    super(props);
  }

  handleCsvEntry = (values: string) => {
    // parse me here
    console.error("Not Implemented, handleCsvEntry");
  };

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

  renderCsvEntry() {
    const csvEntry: JSX.Element = (
      <div className="csv-entry-container">
        {this.renderHelpButton()}
        <textarea
          className="csv-add"
          cols={50}
          defaultValue="Drag Items Here"
          onBlur={event => this.handleCsvEntry(event.currentTarget.value)}
        />
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
