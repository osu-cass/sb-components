import '../css/search.css'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ItemCard from '../ItemCard/ItemCard';
import * as ItemCardModels from '../ItemCard/ItemCardModels';
import * as ItemsSearchParams from './ItemsSearchParams';
import * as GradeLevels from '../GradeLevels/GradeLevels';
import * as Models from './ItemsSearchModels';
import { Resource, get } from '../ApiModel';
import * as ItemSearchModels from './ItemsSearchModels';
import { RouteComponentProps } from 'react-router';


export const ItemsSearchClient = (params: ItemSearchModels.SearchAPIParams) =>
    get<ItemCardModels.ItemCardViewModel[]>("/BrowseItems/search", params);

export const ItemsViewModelClient = () =>
    get<ItemSearchModels.ItemsSearchViewModel>("/BrowseItems/ItemsSearchViewModel");


export interface Props extends RouteComponentProps<{}> {
    itemsSearchClient: (params: Models.SearchAPIParams) => Promise<ItemCardModels.ItemCardViewModel[]>;
    itemsViewModelClient: () => Promise<ItemSearchModels.ItemsSearchViewModel>;
}

export interface State {
    searchResults: Resource<ItemCardModels.ItemCardViewModel[]>;
    itemSearch: Resource<ItemSearchModels.ItemsSearchViewModel>;
}

export class ItemsSearchComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchResults: { kind: "loading" },
            itemSearch: {kind: "loading"}
        };

        this.props.itemsViewModelClient()
            .then(data => this.onFetchedItemSearch(data))
            .catch(err => this.onError(err));
        
    }

    beginSearch(params: Models.SearchAPIParams) {
        const searchResults = this.state.searchResults;
        if (searchResults.kind === "success") {
            this.setState({
                searchResults: {
                    kind: "reloading",
                    content: searchResults.content
                }
            });
        } else if (searchResults.kind === "failure") {
            this.setState({
                searchResults: { kind: "loading" }
            });
        }

        this.props.itemsSearchClient(params)
            .then((data) => this.onSearch(data))
            .catch((err) => this.onError(err));
    }

    onSearch(results: ItemCardModels.ItemCardViewModel[]) {
        this.setState({ searchResults: { kind: "success", content: results } });
    }

    onError(err: any) {
        this.setState({ searchResults: { kind: "failure" } });
    }

    onFetchedItemSearch(itemsSearch: ItemSearchModels.ItemsSearchViewModel) {
        this.setState({ itemSearch: { kind: "success", content: itemsSearch } });

    }

    selectSingleResult() {
        const searchResults = this.state.searchResults;
        if (searchResults.kind === "success" && searchResults.content && searchResults.content.length === 1) {
            const searchResult = searchResults.content[0];
            ItemCardModels.itemPageLink(searchResult.bankKey, searchResult.itemKey);
        }
    }

    isLoading() {
        return this.state.searchResults.kind === "loading" || this.state.searchResults.kind === "reloading";
    }

    renderResultElement(): JSX.Element | JSX.Element[] | undefined {
        const searchResults = this.state.searchResults;

        let resultsElement: JSX.Element[] | JSX.Element | undefined;
        if ((searchResults.kind === "success" || searchResults.kind === "reloading") && searchResults.content) {
            resultsElement = searchResults.content && searchResults.content.length === 0
                ? <span className="placeholder-text" role="alert">No results found for the given search terms.</span>
                : searchResults.content.map(digest =>
                    <ItemCard.ItemCard {...digest} key={digest.bankKey.toString() + "-" + digest.itemKey.toString()} />);
        } else if (searchResults.kind === "failure") {
            resultsElement = <div className="placeholder-text" role="alert">An error occurred. Please try again later.</div>;
        } else {
            resultsElement = undefined;
        }
        return resultsElement;
    }

    renderISPComponent(): JSX.Element {
        const isLoading = this.isLoading();
        const searchVm = this.state.itemSearch;

        if (searchVm.kind == "success" || searchVm.kind == "reloading") {
            if (searchVm.content) {
                return (
                    <ItemsSearchParams.ISPComponent
                        interactionTypes={searchVm.content.interactionTypes}
                        subjects={searchVm.content.subjects}
                        onChange={(params) => this.beginSearch(params)}
                        selectSingleResult={() => this.selectSingleResult()}
                        isLoading={isLoading} />
                );
            }
            else {
               return <p><em>Loading...</em></p>
            }
        }
        else {
            return <p><em>Loading...</em></p>
        }

       
    }

    render() {
        return (
            <div className="search-container">
                {this.renderISPComponent()}
                <div className="search-results" >
                    {this.renderResultElement()}
                </div>
            </div>
        );
    }
}
