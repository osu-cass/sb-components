import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  AboutItem,
  AboutItemModel,
  ItemViewerFrame,
  LoadingOverlay,
  Select
} from "../index";
import { Resource, getRequest, getResourceContent } from "../ApiModel";
import {
  AboutTestItemsModel,
  InteractionTypeModel,
  AboutTestItemsParams
} from "./AboutTestItemsModels";
import { SelectOptionProps } from "../select/SelectOption";

export interface AboutTestItemContainerState {
  selectedCode?: string;
  itemUrl?: string;
  aboutThisItemViewModel: Resource<AboutItemModel>;
  aboutItemsViewModel: Resource<AboutTestItemsModel>;
  hasError: boolean;
  loading: boolean;
}

export interface AboutTestItemContainerProps {
  params: AboutTestItemsParams;
  aboutClient: (
    params?: { interactionTypeCode: string }
  ) => Promise<AboutTestItemsModel>;
  showRubrics: boolean;
}

export class AboutTestItemsContainer extends React.Component<
  AboutTestItemContainerProps,
  AboutTestItemContainerState
> {
  constructor(props: AboutTestItemContainerProps) {
    super(props);
    this.state = {
      aboutThisItemViewModel: { kind: "loading" },
      aboutItemsViewModel: { kind: "loading" },
      selectedCode: this.props.params.itemType || "N/A",
      hasError: false,
      loading: true
    };
  }

  componentDidMount() {
    this.fetchUpdatedViewModel(this.state.selectedCode);
  }

  handleChange = (newCode: string) => {
    if (newCode !== this.state.selectedCode) {
      this.setState({
        selectedCode: newCode
      });
      if (newCode !== "N/A") {
        this.fetchUpdatedViewModel(newCode);
      }
    }
  };

  fetchUpdatedViewModel(newCode?: string) {
    const params = {
      interactionTypeCode: newCode || ""
    };

    this.props
      .aboutClient(params)
      .then(data => this.onFetchedUpdatedViewModel(data))
      .catch(err => this.onError(err));
  }

  onError(err: Error) {
    this.setState({
      aboutThisItemViewModel: { kind: "failure" },
      aboutItemsViewModel: { kind: "failure" },
      loading: false,
      hasError: true
    });
  }

  onFetchedUpdatedViewModel = (viewModel: AboutTestItemsModel) => {
    const { interactionTypes, aboutThisItemViewModel } = viewModel;
    let selectedCode = this.state.selectedCode;

    if (interactionTypes.length > 0) {
      if (!selectedCode) {
        selectedCode = "N/A";
      } else {
        const validType = interactionTypes.find(it => it.code === selectedCode);
        selectedCode = validType ? selectedCode : "N/A";
      }
    }

    this.setState({
      selectedCode,
      itemUrl: viewModel.itemUrl,
      aboutThisItemViewModel: {
        kind: "success",
        content: aboutThisItemViewModel
      },
      aboutItemsViewModel: { kind: "success", content: viewModel },
      hasError: false,
      loading: false
    });
  };

  renderDescription(interactionTypes: InteractionTypeModel[]) {
    let desc = "";
    for (const it of interactionTypes) {
      if (it.code === this.state.selectedCode && it.description) {
        desc = it.description;
      }
    }

    return (
      // tslint:disable-next-line:react-no-dangerous-html
      <div
        aria-live="polite"
        aria-relevant="text"
        dangerouslySetInnerHTML={{ __html: desc }}
        className="section about-items-desc"
      />
    );
  }

  renderInteractionTypesSelect(
    interactionTypes: InteractionTypeModel[]
  ): JSX.Element {
    const { selectedCode } = this.state;

    const selectOptions: SelectOptionProps[] = [];
    selectOptions.push({
      label: "Select an Item Type",
      value: "N/A",
      disabled: false,
      selected: selectedCode === "N/A"
    });

    interactionTypes.forEach(it => {
      selectOptions.push({
        label: it.label,
        value: it.code,
        disabled: false,
        selected: selectedCode === it.code
      });
    });

    return (
      <Select
        label="Item Types"
        labelClass="hidden"
        selected={selectedCode || ""}
        options={selectOptions}
        onChange={this.handleChange}
      />
    );
  }

  renderNoItem() {
    const { selectedCode } = this.state;

    let content: string = "";
    if (selectedCode && selectedCode !== "N/A") {
      content = "No Item Found With Selected Type";
    } else {
      content = "Please Select an Item Type";
    }

    return (
      <div className="section section-light no-item">
        <p>{content}</p>
      </div>
    );
  }

  renderItemFrame(): JSX.Element {
    const aboutThisItem = getResourceContent(this.state.aboutThisItemViewModel);
    let content: JSX.Element;

    if (aboutThisItem && this.state.selectedCode !== "N/A") {
      content = (
        <div
          className="about-item-iframe"
          aria-live="polite"
          aria-relevant="additions removals"
        >
          <div
            className="item-nav"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div
              className="item-nav-left-group"
              role="group"
              aria-label="First group"
            >
              <AboutItem
                showRubrics={this.props.showRubrics}
                {...aboutThisItem}
              />
            </div>
          </div>
          <ItemViewerFrame url={this.state.itemUrl || ""} />
        </div>
      );
    } else {
      content = this.renderNoItem();
    }

    return content;
  }

  private renderItemTypesGroup() {
    const aboutItems = getResourceContent(this.state.aboutItemsViewModel);
    let content: JSX.Element | undefined;

    if (aboutItems) {
      const { interactionTypes } = aboutItems;
      content = (
        <div>
          <div className="about-items-dropdown form-group">
            {this.renderInteractionTypesSelect(interactionTypes)}
          </div>
          {this.renderDescription(interactionTypes)}
        </div>
      );
    }

    return content;
  }

  private renderError(): JSX.Element | undefined {
    let content: JSX.Element | undefined;
    if (this.state.hasError) {
      content = (
        <div className="page-error">
          <p aria-label="Network error occurred">
            Network failure, please try again
          </p>
        </div>
      );
    }

    return content;
  }

  public render() {
    const itemFrame = this.state.itemUrl
      ? this.renderItemFrame()
      : this.renderNoItem();

    return (
      <LoadingOverlay loading={this.state.loading}>
        <div className="container about-items">
          <div className="about-items-info">
            <h2 className="page-title">About Test Items</h2>
            <div className="section section-light">
              {this.renderError()}
              <p className="about-items-text">
                Smarter Balanced assessments use a variety of item types to
                accurately measure what students know and can do. To learn more
                and see an example item, select an item type below.
              </p>
              {this.renderItemTypesGroup()}
            </div>
          </div>
          <div className="section about-items-iframe">{itemFrame}</div>
        </div>
      </LoadingOverlay>
    );
  }
}
