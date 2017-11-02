import * as React from "react";
import { BasicFilterCategory, BasicFilterOption } from "./AdvancedFilterModel";
import { BasicFilter } from "./BasicFilter";

export interface Props {
    filterOptions: BasicFilterCategory[];
    onClick: (selected: BasicFilterCategory[]) => void;
    containsAdvancedFilter: boolean;
    handleAdvancedFilterExpand?: () => void;
}

export interface State {
    filters: BasicFilterCategory[];
    expanded?: boolean;
}

export class BasicFilterContainer extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            filters: props.filterOptions,
            expanded: props.containsAdvancedFilter
        }
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
        if(this.props.handleAdvancedFilterExpand 
            && typeof(this.props.handleAdvancedFilterExpand) === "function"){
                this.setState({expanded: !this.state.expanded});
                this.props.handleAdvancedFilterExpand();
        }
    }

    render() {
        const { filterOptions, containsAdvancedFilter } = this.props;
        const { expanded } = this.state;
        let advancedFilterButton = null;

        // if the component is being used in conjunction
        // with the AdvancedFilterContainer we handle expanding it here
        if (containsAdvancedFilter) {
            advancedFilterButton =
                (<div>
                    <div>Advanced Filters</div>
                    <button className="filter-button" onClick={this.handleClick}>
                        {expanded ? "Show" : "Hide"}&nbsp; 
                        <span className={`fa fa-chevron-${expanded ? "right" : "down"}`} />
                    </button>
                </div>)
        }

        return (
            <div className="basic-filter-container" >
                <div className="basic-filter">
                    {this.renderFilters()}
                </div>
                {advancedFilterButton}
            </div>
        );
    }
}