import '../Styles/item.less';
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
export const ItemPageClient = (params: ItemPageModels.ItemIsaap) =>
    get<ItemPageModels.ItemPageViewModel>("/Item/GetItem", params);


interface Props extends RouteComponentProps<{}> {
    aboutThisClient: (params: ItemPageModels.Item) =>
        Promise<AboutThisItem.Props>;
    itemPageClient: (params: ItemPageModels.ItemIsaap) =>
        Promise<ItemPageModels.ItemPageViewModel>;
}

interface State {
    aboutThisItem: Resource<AboutThisItem.Props>
    itemPageVM: Resource<ItemPageModels.ItemPageViewModel>;
    currentItem?: ItemPageModels.ItemIdentifier;
    item: ItemPageModels.Item;

}

export class ItemPageContainer extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        //TODO: parse url params and change item

        const queryObject = parseQueryString(location.search);
        const itemKey = +(queryObject["itemKey"] || [])[0] || 0;
        const bankKey = +(queryObject["bankKey"] || [])[0] || 0;
        const isaap = (queryObject["isaap"] || [])[0] || "";
        
        const item: ItemPageModels.ItemIsaap = { itemKey: itemKey, bankKey: bankKey, isaap: isaap }

        this.state = {
            aboutThisItem: { kind: "loading" },
            itemPageVM: { kind: "loading" },
            item: item
        }

        this.props.itemPageClient(this.state.item)
            .then((data) => this.onGetItemPage(data))
            .then(() => this.setCurrentItem())
            .then(() => this.fetchUpdatedAboutThisItem())
            .catch(err => this.onError(err));

    }

    private setCurrentItem() {
        const itemPage = this.getItemPage();
        let currentItem: ItemPageModels.ItemIdentifier | undefined = undefined;
        if (itemPage) {
            currentItem = Accessibility.isBrailleEnabled(itemPage.accResourceGroups) ?
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



    onSave = (selections: Accessibility.ResourceSelections) => {
        const itemPage = this.getItemPage();
        if (itemPage) {

            const newGroups: Accessibility.AccResourceGroup[] = [];
            for (let group of itemPage.accResourceGroups) {
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

            const newItemPage = { ...itemPage };
            newItemPage.accResourceGroups = newGroups;

            this.onGetItemPage(newItemPage);
            this.setCurrentItem()
            this.updateCookie(newItemPage.accessibilityCookieName, newItemPage.accResourceGroups);

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

        if (itemPage) {
            const newItemPage = { ...itemPage };

            this.updateCookie(newItemPage.accessibilityCookieName);

            const newAccResourceGroups = newItemPage.accResourceGroups.map(g => {
                const newGroup = { ...g };
                newGroup.accessibilityResources = newGroup.accessibilityResources.map(ItemPageModels.resetResource);
                return newGroup;
            });

            newItemPage.accResourceGroups = newAccResourceGroups;
            this.onGetItemPage(newItemPage);
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
            const params = {
                bankKey: item.bankKey,
                itemKey: item.itemKey
            };
            AboutThisItemViewModelClient(params).then((data) => this.onFetchedUpdatedViewModel(data)).catch();
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

        if (aboutThisItem && itemPage && itemDetails) {
            return <div className="item-page">
                <ItemPage.Page
                    {...itemPage}
                    aboutThisItemVM={aboutThisItem}
                    onSave={this.onSave}
                    onReset={this.onReset}
                    currentItem={itemDetails}
                />
            </div>
        }
        else {
            return <div></div>
        }
    }
}

