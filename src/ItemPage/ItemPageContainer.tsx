import '../Styles/item.less';
import '@osu-cass/smarter-balanced-styles/styles/advanced-filter.less'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Accessibility from '../Accessibility/Accessibility';
import * as AboutThisItem from '../AboutItem/AboutThisItem';
import * as ItemPage from './ItemPage';
import * as ItemPageModels from './ItemPageModels';
import { Resource, get, getResourceContent, parseQueryString } from '../ApiModel';
import { RouteComponentProps } from 'react-router';

export const AboutThisItemViewModelClient = (params: ItemPageModels.Item) =>
    get<AboutThisItem.Props>("/Item/AboutThisItemViewModel", params);
export const ItemPageClient = (params: ItemPageModels.Item) =>
    get<ItemPageModels.ItemPageViewModel>("/Item/GetItem", params);

export const ItemAccessibilityClient = (params: ItemPageModels.ItemIsaap) =>
    get<Accessibility.AccResourceGroup[]>("/Item/ItemAccessibility", params);


interface Props extends RouteComponentProps<{}> {
    aboutThisClient: (params: ItemPageModels.Item) =>
        Promise<AboutThisItem.Props>;
    itemPageClient: (params: ItemPageModels.Item) =>
        Promise<ItemPageModels.ItemPageViewModel>;
    itemAccessibilityClient: (params: ItemPageModels.ItemIsaap) =>
        Promise<Accessibility.AccResourceGroup[]>;
}

interface State {
    aboutThisItem: Resource<AboutThisItem.Props>
    itemPageVM: Resource<ItemPageModels.ItemPageViewModel>;
    itemAccessibility: Resource<Accessibility.AccResourceGroup[]>;
    currentItem?: ItemPageModels.ItemIdentifier;
    item: ItemPageModels.Item;

}

export class ItemPageContainer extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        const queryObject = parseQueryString(location.search);
        const itemKey = +(queryObject["itemKey"] || [])[0] || 0;
        const bankKey = +(queryObject["bankKey"] || [])[0] || 0;
        const isaap = (queryObject["isaap"] || [])[0] || "";
        
        const item: ItemPageModels.ItemIsaap = { itemKey: itemKey, bankKey: bankKey, isaap: isaap }

        this.state = {
            aboutThisItem: { kind: "loading" },
            itemPageVM: { kind: "loading" },
            itemAccessibility: {kind: "loading"},
            item: item
        }

        this.props.itemPageClient(this.state.item)
            .then((data) => this.onGetItemPage(data))
            .then(() => this.props.itemAccessibilityClient(this.state.item)
                .then((data) => this.onGetItemAccessibility(data))
                .catch(err => this.onError(err)))
            .then(() => this.setCurrentItem())
            .then(() => this.fetchUpdatedAboutThisItem())
            .catch(err => this.onError(err));

    }

    private setCurrentItem() {
        const itemPage = this.getItemPage();
        const itemAcc = this.getItemAccessibility();

        let currentItem: ItemPageModels.ItemIdentifier | undefined = undefined;
        if (itemPage && itemAcc) {
            currentItem = Accessibility.isBrailleEnabled(itemAcc) ?
                itemPage.brailleItem : itemPage.nonBrailleItem;
        }

        this.setState({
            currentItem: currentItem
        });

    }

    onGetItemPage(data: ItemPageModels.ItemPageViewModel) {
        this.setState({
            itemPageVM: { kind: "success", content: data }
        });

    }

    onGetItemAccessibility(data: Accessibility.AccResourceGroup[]) {
        this.setState({
            itemAccessibility: { kind: "success", content: data }
        });
    }

    onError(err: any) {
        console.error(err);
    }

    private getItemPage(): ItemPageModels.ItemPageViewModel | undefined {
        const itemPage = this.state.itemPageVM;
        return getResourceContent(itemPage);
    }

    private getAboutItem(): AboutThisItem.Props | undefined {
        const aboutItem = this.state.aboutThisItem;
        return getResourceContent(aboutItem);
    }

    private getItemAccessibility(): Accessibility.AccResourceGroup[] | undefined {
        const itemAcc = this.state.itemAccessibility;
        return getResourceContent(itemAcc);
    }



    onSave = (selections: Accessibility.ResourceSelections) => {
        const itemAcc = this.getItemAccessibility();
        const itemPage = this.getItemPage();
        if (itemPage && itemAcc) {

            const newGroups: Accessibility.AccResourceGroup[] = [];
            for (let group of itemAcc) {
                const newGroup = { ...group };
                const newResources: Accessibility.AccessibilityResource[] = [];
                for (let res of newGroup.accessibilityResources) {
                    const newRes = { ...res };
                    newRes.currentSelectionCode = selections[newRes.resourceCode] || newRes.currentSelectionCode;
                    newResources.push(newRes);
                }
                newGroup.accessibilityResources = newResources;
                newGroups.push(newGroup);
            }

            this.onGetItemAccessibility(newGroups);
            this.setCurrentItem()
            this.updateCookie(itemPage.accessibilityCookieName, newGroups);

        }
        else {
            console.error('Error no item to update resources');
        }

    }

    private updateCookie(cookieName: string, accGroups?: Accessibility.AccResourceGroup[]): void {
        let cookieValue = (accGroups) ? ItemPageModels.toCookie(accGroups) : "";
        document.cookie = cookieName.concat("=", cookieValue, "; path=/");
    }

    onReset = () => {
        const itemPage = this.getItemPage();
        const itemAcc = this.getItemAccessibility();
        if (itemPage && itemAcc) {
            const newItemPage = { ...itemPage };

            this.updateCookie(newItemPage.accessibilityCookieName);

            const newAccResourceGroups = itemAcc.map(g => {
                const newGroup = { ...g };
                newGroup.accessibilityResources = newGroup.accessibilityResources.map(ItemPageModels.resetResource);
                return newGroup;
            });

            this.onGetItemAccessibility(newAccResourceGroups);
            this.setCurrentItem();
            this.fetchUpdatedAboutThisItem();

        }
        else {
            console.error('Error no item to reset');
        }

    }

    fetchUpdatedAboutThisItem() {
        const item = this.state.currentItem;
        if (item) {
            AboutThisItemViewModelClient(item)
                .then((data) => this.onFetchedUpdatedViewModel(data))
                .catch(err => this.onError(err));
        }

    }

    onFetchedUpdatedViewModel(viewModel: AboutThisItem.Props) {
        this.setState({
            aboutThisItem: { kind: "success", content: viewModel }
        });
    }

    onFetchUpdatedAboutError(err: any) {
        console.error(err);
        this.setState({
            aboutThisItem: { kind: "failure" }
        });
    }

    render() {
        const aboutThisItem = this.getAboutItem();
        const itemDetails = this.state.currentItem;
        const itemPage = this.getItemPage();
        const itemAccessibility = this.getItemAccessibility();

        if (aboutThisItem && itemPage && itemDetails && itemAccessibility) {
            return <div className="item-page">
                <ItemPage.Page
                    {...itemPage}
                    aboutThisItemVM={aboutThisItem}
                    onSave={this.onSave}
                    onReset={this.onReset}
                    currentItem={itemDetails}
                    accResourceGroups={itemAccessibility}
                />
            </div>
        }
        else {
            return <div></div>
        }
    }
}

