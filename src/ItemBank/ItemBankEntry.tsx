import * as React from "react";
import {
  Accordion,
  ItemRevisionModel,
  NamespaceModel,
  SectionModel,
  ItemEntryTable,
  CsvEntry
} from "@src/index";

export interface ItemBankEntryProps {
  updateCsvText: (csvText: string) => void;
  updateItems: (items: ItemRevisionModel[]) => void;
  deleteItem: (item: number) => void;
  clearItems: () => void;
  namespaces: NamespaceModel[];
  sections: SectionModel[];
  csvText: string;
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

  onAccordionToggle = (accordionType: "csv" | "table") => {
    const { csvIsOpen, itemsEntryIsOpen } = this.state;
    if (accordionType === "csv") {
      this.setState({ csvIsOpen: !csvIsOpen });
    } else {
      this.setState({ itemsEntryIsOpen: !itemsEntryIsOpen });
    }
  };

  onCsvApply = () => {
    this.setState({
      csvIsOpen: false,
      itemsEntryIsOpen: true
    });
  };

  renderCsvEntry() {
    const { csvText, namespaces } = this.props;

    return (
      <Accordion
        accordionTitle="CSV Entry"
        isOpen={this.state.csvIsOpen}
        toggleExpand={() => this.onAccordionToggle("csv")}
      >
        <div className="csv-entry-container section">
          <div className="csv-entry-wrapper">
            <CsvEntry
              csvText={csvText}
              namespaces={namespaces}
              onCsvTextUpdate={this.props.updateCsvText}
              onItemsUpdate={this.props.updateItems}
              onApply={this.onCsvApply}
            />
          </div>
        </div>
      </Accordion>
    );
  }

  renderTableEntry() {
    const {
      items,
      updateItems,
      clearItems,
      namespaces,
      sections,
      deleteItem
    } = this.props;

    return (
      <Accordion
        accordionTitle="Items Entry"
        isOpen={this.state.itemsEntryIsOpen}
        toggleExpand={() => this.onAccordionToggle("table")}
      >
        <ItemEntryTable
          itemRows={items}
          onItemsUpdate={updateItems}
          namespaces={namespaces}
          sections={sections}
          onDeleteItem={deleteItem}
          onClearItems={clearItems}
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
