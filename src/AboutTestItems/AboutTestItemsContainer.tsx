import * as React from "react";
import * as ReactDOM from "react-dom";
import { Redirect } from "react-router";
import {
  AboutItem,
  AboutItemModel,
  ItemViewerFrame,
  LoadingOverlay,
  Select,
  PromiseCancelable,
  Resource,
  getRequest,
  getResourceContent,
  AboutTestItemsModel,
  InteractionTypeModel,
  AboutTestItemsParams,
  Subscription,
  SelectOptionProps,
  AboutTestSearchParams
} from "@src/index";

export interface AboutTestItemContainerState {
  selectedCode?: string;
  itemUrl?: string;
  aboutThisItemViewModel: Resource<AboutItemModel>;
  aboutItemsViewModel: Resource<AboutTestItemsModel>;
  hasError: boolean;
}

export interface AboutTestItemContainerProps {
  params: AboutTestItemsParams;
  aboutClient: (params?: AboutTestSearchParams) => Promise<AboutTestItemsModel>;
  showRubrics: boolean;
  errorRedirectPath: string;
}

export class AboutTestItemsContainer extends React.Component<
  AboutTestItemContainerProps,
  AboutTestItemContainerState
> {
  private subscription = new Subscription();

  constructor(props: AboutTestItemContainerProps) {
    super(props);
    this.state = {
      aboutThisItemViewModel: { kind: "loading" },
      aboutItemsViewModel: { kind: "loading" },
      selectedCode: this.props.params.itemType || "N/A",
      hasError: false
    };
  }

  componentDidMount() {
    this.fetchUpdatedViewModel(this.state.selectedCode).catch(e =>
      this.onError(e)
    );
  }

  componentWillUnmount() {
    this.subscription.cancelAll();
  }

  handleChange = (newCode: string) => {
    if (newCode !== this.state.selectedCode) {
      this.setState({
        selectedCode: newCode
      });
      if (newCode !== "N/A") {
        this.fetchUpdatedViewModel(newCode).catch(e => this.onError(e));
      }
    }
  };

  async fetchUpdatedViewModel(newCode?: string) {
    const params = {
      interactionTypeCode: newCode || ""
    };
    const prom = this.props.aboutClient(params);
    const promiseWrapper = this.subscription.add("aboutClient", prom);

    try {
      const result = await promiseWrapper.promise;
      this.onFetchedUpdatedViewModel(result);

      return result;
    } catch (e) {
      this.onError(e);
    }
  }

  onError(err: string) {
    if (err !== "Canceled") {
      this.setState({
        aboutThisItemViewModel: { kind: "failure" },
        aboutItemsViewModel: { kind: "failure" },
        hasError: true
      });
    }
  }

  onFetchedUpdatedViewModel(viewModel: AboutTestItemsModel) {
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
      hasError: false
    });
  }

  renderDescription(
    interactionTypes: InteractionTypeModel[]
  ): JSX.Element | undefined {
    let content: JSX.Element | undefined;

    const selectedIT = interactionTypes.find(
      i => this.state.selectedCode === i.code
    );

    if (selectedIT && selectedIT.description) {
      content = (
        // tslint:disable-next-line:react-no-dangerous-html
        <div
          aria-live="polite"
          aria-relevant="text"
          dangerouslySetInnerHTML={{ __html: selectedIT.description }}
          className="section section-dark about-items-desc"
        />
      );
    }

    return content;
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
      <div className="section section-light no-item itemViewerFrame">
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
          aria-relevant="additions"
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
      content = <Redirect push to={this.props.errorRedirectPath} />;
    }

    return content;
  }

  isLoading(): boolean {
    const { aboutItemsViewModel, hasError } = this.state;
    const content = getResourceContent(aboutItemsViewModel);

    return !hasError && !content;
  }

  public render() {
    const itemFrame = this.state.itemUrl
      ? this.renderItemFrame()
      : this.renderNoItem();

    return (
      <LoadingOverlay loading={this.isLoading()}>
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
