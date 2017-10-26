import * as React from "react";
import "@osu-cass/smarter-balanced-styles/styles/advanced-filter.less";
import {BasicFilterCategory, BasicFilterOption} from "./AdvancedFilterModel";
import { BasicFilter } from "./BasicFilter";

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

        this.state = {
            filters:props.filterOptions
        }
    }

    //multiSelect not an option right now.
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

    renderFilters(){
        const filterTags = this.state.filters.map((fil,i) => {
            return (
                <BasicFilter {...fil} selectedHandler={(opt) => this.onSelect(fil,opt)} />
            );
        });

        return filterTags;
    }

    render() {

        return (
            <div>
                {this.renderFilters()}
            </div>
        );
    }
}