import * as React from "react";
import {
    BasicFilterCategory,
    AdvancedFilterCategory,
    BasicFilterOption,
    AdvancedFilterOption
} from "./AdvancedFilterModel";
import { BasicFilterContainer } from "./BasicFilterContainer";
import { AdvancedFilterContainer } from "./AdvancedFilterContainer";

export interface FilterProps {
    basicFilterOptions: BasicFilterCategory[];
    onBasicFilterClick: (selected: BasicFilterCategory[]) => void;
    advancedFilterOptions: AdvancedFilterCategory[];
    onAdvancedFilterClick: (selected: AdvancedFilterCategory[]) => void;
}

export interface FilterState {
    basicFilters: BasicFilterCategory[];
    advancedFilters: AdvancedFilterCategory[];
    expanded: boolean;
}

export class FilterContainer extends React.Component<FilterProps, FilterState>{
    constructor(props: FilterProps) {
        super(props);
        this.state = {
            basicFilters: props.basicFilterOptions,
            advancedFilters: props.advancedFilterOptions,
            expanded: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        const {
            basicFilterOptions,
            onBasicFilterClick,
            advancedFilterOptions,
            onAdvancedFilterClick } = this.props;
        let advancedFilter = null;
        if(this.state.expanded){
            advancedFilter = (<AdvancedFilterContainer 
                filterOptions={advancedFilterOptions}
                onClick={onAdvancedFilterClick}
            />)
        }
        return (
            <div style={{width: "100%"}}>
                <BasicFilterContainer
                    filterOptions={basicFilterOptions}
                    onClick={onBasicFilterClick}
                    containsAdvancedFilter={true}
                    handleAdvancedFilterExpand={this.handleClick}
                />
                {advancedFilter}
            </div>
        )
    }

}