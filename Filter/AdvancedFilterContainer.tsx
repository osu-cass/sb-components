import * as React from "react";
import * as ItemModels from '../Models/ItemModels';
import * as GradeLevels from '../Models/GradeLevels';
import { AdvancedFilterOption, OptionType, AdvancedFilterInfo, FilterOptions } from './AdvancedFilterModel';
import { AdvancedFilter} from './AdvancedFilter';

interface Props {
    filterOptions: ItemModels.ItemFilter;
    onClick: (params: FilterOptions) => void;
    isLoading: boolean;
    itemFilter: ItemModels.ItemFilter
}

interface State extends ItemModels.ItemFilter { };

export class AdvancedFilterContainer extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);

        this.state = props.itemFilter;
        this.onClickHandler();
    }

    onClickHandler() {
        this.props.onClick(this.state);
    }

    resetFilters() {
        this.setState({ 
            grades: [],
            subjects: [],
            techTypes: []
        }, () => this.onClickHandler());
    }

    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.resetFilters();
        }
    }

    changeGrade = (data:AdvancedFilterInfo) => {
        let selectedGrades = (data.isMultiSelect ? [Number(data.key) ^ Number(this.state.grades)] : [Number(data.key)]);

        if(selectedGrades[0] === 0){
            selectedGrades = [];
        }

        this.setState({
            grades: selectedGrades
        }, () => this.onClickHandler());
    }

    renderGradeFilter() {
        const gradeOptions:AdvancedFilterOption[] = this.props.filterOptions.grades.map((g,i) => {
            const gradeSelected = GradeLevels.contains(this.state.grades[0],g);

            return {label:GradeLevels.caseToString(g),
                    key: g.toString(),
                    order: i.toString(),
                    selectedHandler: this.changeGrade,
                    type: OptionType.button,
                    isSelected: gradeSelected};
        });

        const selectedGrades = this.state.grades.map(g => {
            return g.toString();
        });

        return (
            <AdvancedFilter 
            disabled={false}
            isMultiSelect={true}
            label={"Grade"}
            helpText={"Grade description here."}
            filterOptions={gradeOptions}
            selectedFilterOptions={selectedGrades}/>
        );
    }

    renderFilterComponents() {
        return (
            <div className="filter-body" aria-live="polite" aria-relevant="additions removals">
                {this.renderGradeFilter()}
            </div>
        );
    }

    render() {
        return (
            <div className="advanced-filter">
                <div className="filter-header">
                    <div className="filter-status">
                        {this.props.isLoading ? <img src="images/spin.gif" className="spin" /> : undefined}
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