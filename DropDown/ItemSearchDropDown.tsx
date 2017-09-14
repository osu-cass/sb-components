import * as React from 'react';
import * as GradeLevels from "../Models/GradeLevels";
import * as ItemModels from '../Models/ItemModels';
import { parseQueryString } from "../Models/ApiModels";

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
}

export interface State extends ItemModels.ItemFilter { }

export class ItemSearchDropdown extends React.Component<Props, State>{
    timeoutToken?: number;

    constructor(props: Props) {
        super(props);

        this.state = { };

        this.onChange();
    }

    encodeQuery(): string {
        let pairs: string[] = [];
        if (this.state.grade && this.state.grade !== GradeLevels.GradeLevels.All) {
            pairs.push("gradeLevels=" + this.state.grade);
        }
        if (this.state.subject) {
            pairs.push("itemID=" + this.state.subject.code);
        }
        if (this.state.techType && this.state.techType.code == "PT") {
            pairs.push("performanceOnly=true");
        }

        if (pairs.length === 0) {
            return "/";
        }

        const query = "?" + pairs.join("&");
        return query;
    }

    beginChangeTimeout() {
        if (this.timeoutToken !== undefined) {
            clearTimeout(this.timeoutToken);
        }

        this.timeoutToken = setTimeout(() => this.onChange(), 200);
    }
    
    onChange() {
        this.props.onChange(this.state);
    }

    resetFilters() {
        this.setState({ }, () => this.beginChangeTimeout());
    }

    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.resetFilters();
        }
    }

    changeGrade = (event: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            grade: Number(event.currentTarget.value)
        }, () => this.beginChangeTimeout());
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
        const selectedSubject = this.props.filterOptions.subjects.find(s => s.code == selectedCode);

        this.setState({
            subject: selectedSubject
        }, () => this.beginChangeTimeout());
        
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
        const selectedType = this.props.filterOptions.techTypes.find(t => t.code == selectedCode);

        this.setState({
            techType: selectedType
        }, () => this.beginChangeTimeout());
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
        history.replaceState(null, "", this.encodeQuery());

        return (
            <div className="search-params">
                <div className="search-header">
                    <h1 className="search-title" tabIndex={0}>Browse Items</h1>
                    <div className="search-status">
                        {this.props.isLoading ? <img src="images/spin.gif" className="spin" /> : undefined}
                        <div><a onClick={() => this.resetFilters()} onKeyPress={e => this.keyPressResetFilters(e)} tabIndex={0}>Reset filters</a></div>
                    </div>
                </div>
                <div className="search-categories" aria-live="polite" aria-relevant="additions removals">
                    {this.renderGrades()}
                    {this.renderSubjects()}
                    {this.renderTechTypes()}
                </div>
            </div>
        );
    }
}
