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
  deleteItem: (item: number) => void;
  clearItems: () => void;
  submitItems: (items: ItemRevisionModel[]) => void;
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
    const { csvText, namespaces, submitItems } = this.props;

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
              onApply={this.onCsvApply}
              onItemsUpdate={submitItems}
            />
          </div>
        </div>
      </Accordion>
    );
  }

  renderTableEntry() {
    const {
      items,
      clearItems,
      namespaces,
      sections,
      deleteItem,
      submitItems
    } = this.props;

    return (
      <Accordion
        accordionTitle="Items Entry"
        isOpen={this.state.itemsEntryIsOpen}
        toggleExpand={() => this.onAccordionToggle("table")}
      >
        <ItemEntryTable
          itemRows={items}
          namespaces={namespaces}
          sections={sections}
          onDeleteItem={deleteItem}
          onClearItems={clearItems}
          onSubmit={submitItems}
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
