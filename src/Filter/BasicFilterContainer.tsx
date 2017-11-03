import * as React from "react";
import { BasicFilterCategory, BasicFilterOption } from "./AdvancedFilterModel";
import { BasicFilter } from "./BasicFilter";

export interface BasicProps {
    filterOptions: BasicFilterCategory[];
    onClick: (selected: BasicFilterCategory[]) => void;
    containsAdvancedFilter: boolean;
    handleAdvancedFilterExpand: () => void;
}

export interface BasicState {
    filters: BasicFilterCategory[];
    expanded?: boolean;
}

export class BasicFilterContainer extends React.Component<BasicProps, BasicState>{
    constructor(props: BasicProps) {
        super(props);

        this.state = {
            filters: props.filterOptions,
            expanded: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    //multiSelect not an option right now.
    onSelect(category: BasicFilterCategory, option?: BasicFilterOption) {
        const index = this.state.filters.indexOf(category);
        const newFilters = [...this.state.filters];
        let newOptions: BasicFilterOption[] = [];

        if (option) {
            const optionIdx = newFilters[index].filterOptions.indexOf(option);
            newOptions = newFilters[index].filterOptions
                .map(opt => { return { ...opt, isSelected: false } });

            newOptions[optionIdx].isSelected = !option.isSelected;

            newFilters[index] = {
                ...newFilters[index],
                filterOptions: newOptions
            };
        }

        this.setState({
            filters: newFilters
        });

        this.props.onClick(newFilters);
    }

    resetFilters() {
        let newFilters = this.state.filters;
        newFilters.forEach(cate => {
            cate.filterOptions.map(opt => opt.isSelected = false);
        });

        this.setState({
            filters: [...newFilters]
        });
        this.props.onClick(newFilters);
    }

    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.resetFilters();
        }
    }

    renderFilters() {
        const filterTags = this.state.filters.map((fil, i) => {
            return (
                <BasicFilter key={i} {...fil} selectedHandler={(opt) => this.onSelect(fil, opt)} />
            );
        });

        return filterTags;
    }

    handleClick() {
        this.setState({expanded: !this.state.expanded});
        this.props.handleAdvancedFilterExpand();
    }

    render() {
        const { filterOptions, containsAdvancedFilter } = this.props;
        const { expanded } = this.state;
        let advancedFilterButton = null;

        // if the component is being used in conjunction
        // with the AdvancedFilterContainer we handle expanding it here
        if (containsAdvancedFilter) {
            advancedFilterButton =
                (<div className="basic-filter-button-container">
                    <div>Advanced Filters</div>
                    <button className="filter-button" onClick={this.handleClick}>
                        {expanded ?"Hide" : "Show" }&nbsp; 
                        <span className={`fa fa-chevron-${expanded ? "down" : "right"}`} />
                    </button>
                </div>)
        }
        let className = "basic-filter-container";
        if(expanded){
            className = "basic-filter-container-expanded";
        }

        return (
            <div className={className} >
                <div className="basic-filter">
                    {this.renderFilters()}
                </div>
                {advancedFilterButton}
            </div>
        );
    }
}