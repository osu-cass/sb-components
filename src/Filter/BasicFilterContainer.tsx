import * as React from "react";
import "../styles/AdvancedFilter.css";
import {BasicFilterCategory, BasicFilterOption} from "./AdvancedFilterModel";

export interface Props {
    filterOptions: BasicFilterCategory[];
    onClick: (selected: BasicFilterCategory[]) => void;
}

export interface State {
    filters: BasicFilterCategory[];
}

export class BasicFilterContainer extends React.Component<Props, State>{
    constructor(props:Props){
        super(props);

    }

    onSelect(category: BasicFilterCategory, option: BasicFilterOption) {
        const index = this.state.filters.indexOf(category);
        const newFilters = [...this.state.filters];
        let newOptions: BasicFilterOption[] = [];

        const optionIdx = newFilters[index].filterOptions.indexOf(option);
        newOptions = newFilters[index].filterOptions
            .map(opt => { return { ...opt, isSelected: false } });
        
        newOptions[optionIdx].isSelected = !option.isSelected;

        newFilters[index] = {
            ...newFilters[index],
            filterOptions: newOptions
        };

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

    render() {

        return (
            <div>
                filter goes here
            </div>
        );
    }
}