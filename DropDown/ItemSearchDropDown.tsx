import * as React from 'react';
import * as GradeLevels from "../Models/GradeLevels";
import * as ItemModels from '../Models/ItemModels';

export interface SearchAPIParams {
    itemId: string;
    gradeLevels: GradeLevels.GradeLevels;
    subjects: string[];
    claims: string[];
    interactionTypes: string[];
    performanceOnly: boolean;
}

export interface Props {
    filterOptions: ItemModels.FilterOptions;
    onChange: (params: ItemModels.ItemFilter) => void;
    isLoading: boolean;
    itemFilter: ItemModels.ItemFilter
}

export interface State extends ItemModels.ItemFilter { }

export class ItemSearchDropdown extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);

        this.state = props.itemFilter;

        this.onChange();
    }
    
    onChange() {
        this.props.onChange(this.state);
    }

    resetFilters() {
        this.setState({ 
            grade: undefined,
            subject: undefined,
            techType: undefined
        }, () => this.onChange());
    }

    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.resetFilters();
        }
    }

    changeGrade = (event: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            grade: Number(event.currentTarget.value)
        }, () => this.onChange());
    }

    renderGrades() {
        let tags = [
            <option key={1} value="All">All</option>
        ];
        this.props.filterOptions.grades.forEach((g, i) => tags.push(
            <option key={i + 2} value={g}>{GradeLevels.caseToString(g)}</option>
        ));

        return (<select value={this.state.grade || "All"} onChange={this.changeGrade}>{tags}</select>);
    }

    changeSubject = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedCode = event.currentTarget.value;
        let selectedSubject = this.props.filterOptions.subjects.find(s => s.code == selectedCode);

        if (selectedSubject) {
            selectedSubject = {...selectedSubject}
        }
        
        this.setState({
            subject: selectedSubject
        }, () => this.onChange());
        
        const subjectCodes = this.state.subject || [];
    }

    renderSubjects() {
        let tags = [
            <option key={1} value="All">All</option>
        ];
        this.props.filterOptions.subjects.forEach((s, i) => tags.push(
            <option key={i + 2} value={s.code}>{s.label}</option>
        ));

        const val = this.state.subject ? this.state.subject.code : "All";
        return (<select value={val} onChange={this.changeSubject}>{tags}</select>);
    }

    changeTechType = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedCode = event.currentTarget.value;
        let selectedType = this.props.filterOptions.techTypes.find(t => t.code == selectedCode);

        if (selectedType) {
            selectedType = {...selectedType}
        }

        this.setState({
            techType: selectedType
        }, () => this.onChange());
    }

    renderTechTypes() {
        let tags = [
            <option key={1} value="All">All</option>
        ];
        this.props.filterOptions.techTypes.forEach((t, i) => tags.push(
            <option key={i + 2} value={t.code}>{t.label}</option>
        ));

        const val = this.state.techType ? this.state.techType.code : "All";
        return (<select value={val} onChange={this.changeTechType}>{tags}</select>);
    }

    render() {
        return (
            <div className="search-params">
                <div className="search-header">
                    <div className="search-status">
                        {this.props.isLoading ? <img src="images/spin.gif" className="spin" /> : undefined}
                    </div>

                </div>
                <div className="search-categories" aria-live="polite" aria-relevant="additions removals">
                    {this.renderGrades()}
                    {this.renderSubjects()}
                    {this.renderTechTypes()}
                    <div>
                        <button onClick={() => this.resetFilters()} 
                            onKeyPress={e => this.keyPressResetFilters(e)} 
                            tabIndex={0}>Reset filters</button>
                    </div>
                </div>
            </div>
        );
    }
}
