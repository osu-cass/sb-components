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
        let newOptions: AdvancedFilterOption[] = [];

        if (!option) { // all pressed
            newOptions = newFilters[index].filterOptions
                .map(opt => {return {...opt, isSelected: false}});
        } else {
            const optionIdx = newFilters[index].filterOptions.indexOf(option);
            if(category.isMultiSelect){
                const optionSelect = newOptions[optionIdx].isSelected;
                //XOR for boolean.
                newOptions[optionIdx].isSelected = newOptions[optionIdx].isSelected ? !optionSelect : optionSelect;
            }
            else {
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
        // this.setState({ 
        //     grades: [],
        //     subjects: [],
        //     techTypes: []
        // }, () => this.onClickHandler());
    }

    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.resetFilters();
        }
    }

    // changeGrade = (data:AdvancedFilterInfo[],isMultiSelect:boolean) => {
    //     let selectedGrades = (isMultiSelect ? [Number(data.key) ^ Number(this.state.grades)] : [Number(data.key)]);

    //     if(selectedGrades[0] === 0){
    //         selectedGrades = [];
    //     }

    //     this.setState({
    //         grades: selectedGrades
    //     }, () => this.onClickHandler());
    // }

    // renderGradeFilter() {
    //     const gradeOptions:AdvancedFilterOption[] = this.props.filterOptions.grades.map((g,i) => {
    //         const gradeSelected = GradeLevels.contains(this.state.grades[0],g);

    //         return {
    //             label:GradeLevels.caseToString(g),
    //             key: g.toString(),
    //             order: i.toString(),
    //             selectedHandler: this.changeGrade,
    //             type: OptionType.button,
    //             isSelected: gradeSelected
    //         };
    //     });

    //     const selectedGrades = this.state.grades.map(g => {
    //         return g.toString();
    //     });

    //     return (
    //         <AdvancedFilter 
    //             disabled={false}
    //             isMultiSelect={true}
    //             label={"Grade"}
    //             helpText={"Grade description here."}
    //             filterOptions={gradeOptions}
    //             selectedFilterOptions={selectedGrades}/>
    //     );
    // }

    renderFilterComponents() {
        const filterTags = this.state.filters.map((fil, i) => {
            return(
                <AdvancedFilter {...fil} />
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