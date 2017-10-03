import * as React from "react";
import * as ItemModels from '../Models/ItemModels';
import * as GradeLevels from '../Models/GradeLevels';
import { AdvancedFilterOption, OptionType, AdvancedFilterCategory, FilterOptions } from './AdvancedFilterModel';
import { AdvancedFilter } from './AdvancedFilter';

interface Props {
    filterOptions: AdvancedFilterCategory[];
    onClick: (selected: AdvancedFilterCategory[]) => void;
}

interface State {
    filters: AdvancedFilterCategory[];
}

export class AdvancedFilterContainer extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);

        this.state = {
            filters: props.filterOptions
        }
    }

    onSelect(category: AdvancedFilterCategory, option?: AdvancedFilterOption) {
        const index = this.state.filters.indexOf(category);
        const newFilters = [...this.state.filters];
        let newOptions = newFilters[index].filterOptions
            .map(opt => {return {...opt, isSelected: false}});

        if (!option) { // all pressed
            
        } else {
            const optionIdx = newFilters[index].filterOptions.indexOf(option);
            if(category.isMultiSelect){
                newOptions = newFilters[index].filterOptions
                    .map(opt => {return {...opt}});

                console.log(newOptions[optionIdx].isSelected);
                newOptions[optionIdx].isSelected = !newOptions[optionIdx].isSelected;

                console.log(newOptions[optionIdx].isSelected);
            }
            else {
                newOptions = newFilters[index].filterOptions
                    .map(opt => {return {...opt, isSelected: false}});
                newOptions[optionIdx].isSelected = !option.isSelected;
            }

            newFilters[index] = {
                ...newFilters[index],
                filterOptions: newOptions
            };

            this.setState({
                filters: newFilters
            });
        }
    }

    resetFilters() {
        let newFilters = [...this.state.filters];
        newFilters.forEach(cate => {
            cate.filterOptions.map(opt => {return {...opt, isSelected: false}});
        });

        this.setState({
            filters: newFilters
        });
    }

    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.resetFilters();
        }
    }

    renderFilterComponents() {
        const filterTags = this.state.filters.map((fil, i) => {
            return(
                <AdvancedFilter {...fil} selectedHandler={(opt) => this.onSelect(fil, opt)} />
            );
        });

        return (
            <div className="filter-body" aria-live="polite" aria-relevant="additions removals">
                {filterTags}
            </div>
        );
    }

    render() {
        return (
            <div className="advanced-filter">
                <div className="filter-header">
                    <div className="filter-status">
                    </div>
                    <div>
                        <a onClick={() => this.resetFilters()} 
                            onKeyPress={e => this.keyPressResetFilters(e)} 
                            tabIndex={0}>Reset filters</a>
                    </div>
                </div>
                {this.renderFilterComponents()}
            </div>
        );
    }
}