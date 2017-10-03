import * as React from 'react'
import * as ItemSearchDropdown from '../DropDown/ItemSearchDropDown'
import * as ItemCardViewModel from '../Models/ItemCardViewModel'
import * as ItemModels from '../Models/ItemModels'
import * as ItemPageTable from '../ItemTable/ItemPageTable'
import * as Api from "../Models/ApiModels"
import { FilterHelper } from "../Models/FilterHelper";
import { AdvancedFilterContainer} from "../Filter/AdvancedFilterContainer";
import { FilterOptions,AdvancedFilterCategory } from "../Filter/AdvancedFilterModel";

const SearchClient = () => Api.get<ItemCardViewModel.ItemCardViewModel[]>("api/search");

export interface Props {
    onRowSelection: (item: {itemKey: number; bankKey: number}) => void;
    filterOptions: FilterOptions;
}

export interface State {
    itemSearchResult: Api.Resource<ItemCardViewModel.ItemCardViewModel[]>;
    visibleItems?: ItemCardViewModel.ItemCardViewModel[];
    itemFilter: ItemModels.ItemFilter;
}

export interface ItemsSearchViewModel {
    subjects: ItemModels.Subject[];
}

export class ItemSearchContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props); 
        this.state = {
            itemSearchResult: { kind: "none" },
            itemFilter: FilterHelper.readUrl(props.filterOptions)
        };

        this.callSearch();
    }
 
    callSearch(){
        SearchClient()
         .then((data) => this.onSearchSuccess(data))
         .catch((err) => this.onSearchFailure(err));
    }

    onSearchSuccess(data: ItemCardViewModel.ItemCardViewModel[]): void{
        this.setState({
            itemSearchResult: { kind: "success", content: data },
            visibleItems: data
        });
    }

    onSearchFailure(err: any){
        console.error(err);
        this.setState({
            itemSearchResult: { kind: "failure" } 
        });
    }

    onFilterApplied = (filter: AdvancedFilterCategory[]) => {
        if(this.state.itemSearchResult.kind == "success" || this.state.itemSearchResult.kind == "reloading") {
            const filtered = FilterHelper.filter(this.state.itemSearchResult.content || [], filter);
            this.setState({
                visibleItems: filtered
            });
            FilterHelper.updateUrl(filter);
        }
    }

    renderfilterComponent(){
        // TODO: refactor for more elegant solution. 
        const propfil = this.props.filterOptions
        const filterOpt = [propfil.grades,propfil.subjects,propfil.techTypes]; 

        return (
            <AdvancedFilterContainer
                filterOptions={[...filterOpt]}
                onClick={this.onFilterApplied} />
        );
    }

    renderTableComponent(){
        if(this.state.visibleItems){
            return (
                <ItemPageTable.ItemPageTable 
                    onRowSelection={this.props.onRowSelection} 
                    itemCards={this.state.visibleItems}/>
            ); 
        }
        else if(this.state.itemSearchResult.kind == "failure"){
            return <div className="placeholder-text" role="alert">An error occurred. Please try again later.</div>
        }
        else{
            return <div>Loading...</div>
        }
    }
 
    render() {
        return (
            <div className="search-controls">
                <a>Print Items</a>
                {this.renderfilterComponent()}
                {this.renderTableComponent()}
            </div>
        );
    }

}
