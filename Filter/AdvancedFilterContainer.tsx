import * as React from "react";
import * as ItemModels from '../Models/ItemModels';
import * as GradeLevels from '../Models/GradeLevels';
import {AdvancedFilterOption, OptionType } from './AdvancedFilterModel';
import { AdvancedFilter} from './AdvancedFilter';

interface Props {
    filterOptions: ItemModels.FilterOptions;
    onClick: (params: ItemModels.ItemFilter) => void;
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
            grade: undefined,
            subject: undefined,
            techType: undefined
        }, () => this.onClickHandler());
    }

    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.resetFilters();
        }
    }

    // changeGrade = (code: number) => {
    //     this.setState({
    //         grade: code
    //     }, () => this.onClickHandler());
    // }

    changeGrade = () => {
        this.setState({
        }, () => this.onClickHandler());
    }

    renderGradeFilter() {
        let gradeOptions:AdvancedFilterOption[] = this.props.filterOptions.grades.map((g,i) => {
            return {
                    label:GradeLevels.caseToString(g),
                    key: g.toString(),
                    order: i.toString(),
                    selected: this.changeGrade,
                    type: OptionType.button
                   };
        });

        return (
            <AdvancedFilter 
            disabled={false}
            isMultiSelect={false}
            label={"Grade"}
            helpText={"description here."}
            filterOptions={gradeOptions}/>
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