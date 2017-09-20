import * as React from "react";
import * as ItemModels from '../Models/ItemModels';
import * as GradeLevels from '../Models/GradeLevels';
import { Selection,LabelValue } from './AdvancedFilterModel';
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
        this.onClick();
    }

    onClick() {
        this.props.onClick(this.state);
    }

    resetFilters() {
        this.setState({ 
            grade: undefined,
            subject: undefined,
            techType: undefined
        }, () => this.onClick());
    }

    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.resetFilters();
        }
    }

    changeGrade = (code: number) => {
        this.setState({
            grade: code
        }, () => this.onClick());
    }

    renderGradeFilter() {
        let gradeOptions:LabelValue[] = this.props.filterOptions.grades.map((g,i) => {
            return {label:GradeLevels.caseToString(g),value: Number(g)}
        });

        return (
            <AdvancedFilter 
            isMultiSelect={true}
            onClick={this.changeGrade}
            fieldName={"Grade"}
            infoDescription={"description asdasdasd"}
            options={gradeOptions}/>
        );
    }

    renderFilterComponents() {
        return (
            <div className="filter-categories" aria-live="polite" aria-relevant="additions removals">
                {this.renderGradeFilter()}
            </div>
        );

    }

    render() {
        return (
            <div className="filter-params">
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