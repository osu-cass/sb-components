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

export interface State extends ItemModels.ItemFilter {
    
}

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

    toggleGrades = (event: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            grade: Number(event.currentTarget.value)
        }, () => this.beginChangeTimeout());
    }

    renderGrades() {
        
        let tags = [
            <option key={1} value={GradeLevels.GradeLevels.All}>All</option>
        ];
        this.props.filterOptions.grades.forEach((g, i) => tags.push(
            <option key={i + 2} value={g}>{GradeLevels.caseToString(g)}</option>
        ));

        return (<select value={this.state.grade || GradeLevels.GradeLevels.All} onChange={this.toggleGrades}>{tags}</select>);
    }

    toggleSubject = (event: React.FormEvent<HTMLSelectElement>) => {
        const subject = event.currentTarget.value;

        const subjectCodes = this.state.subjects || [];

        let newSubjectCodes: string[] = [];
        if (subject !== "NA") {
            newSubjectCodes = [subject];
        }

        const newSubjects = this.props.subjects.filter(s => subject.indexOf(s.code) !== -1);

        // Remove all claims not contained by the newly selected subjects
        const subjectClaimCodes = newSubjects.reduce((prev: string[], cur: Subject) => prev.concat(cur.claims.map(c => c.code)), []);
        const newClaimCodes = this.state.claims.filter(c => subjectClaimCodes.indexOf(c) !== -1);

        const subjectInteractionCodes = newSubjects.reduce((prev: string[], cur: Subject) => prev.concat(cur.interactionTypeCodes), []);
        const newInteractionCodes = this.state.interactionTypes.filter(i => subjectInteractionCodes.indexOf(i) !== -1);

        this.setState({ 
            subjects: newSubjectCodes,
            claims: newClaimCodes,
            interactionTypes: newInteractionCodes
        }, () => this.beginChangeTimeout());
    }

    renderSingleSubject(subject: Subject) {
        const subjects = this.state.subjects;
        const containsSubject = subjects.indexOf(subject.code) !== -1;
        const className = (containsSubject ? "selected" : "") + " tag";

        return (<option key={subject.code} value={subject.code} >{subject.label}</option>);
    }

    renderSubjects() {
        const tags = [<option key={0}>NA</option>, this.props.subjects.map(s => this.renderSingleSubject(s))];

        return (<select value={this.state.subjects} onChange={this.toggleSubject}>{tags}</select>);
    }

    toggleClaim = (event: React.FormEvent<HTMLSelectElement>) => {
        const claim = event.currentTarget.value;
        const allClaims = this.state.claims;

        let newClaims:string[] = [];
        if (claim !== "NA") {
            newClaims = [claim];
        }

        this.setState({
            claims: newClaims
        }, () => this.beginChangeTimeout());
    }

    renderSingleClaim(claim: Claim) {
        const selectedClaims = this.state.claims;
        let containsClaim = selectedClaims.indexOf(claim.code) !== -1;

        return (<option key={claim.code} value={claim.code}>{claim.label}</option>);
    }
    
    renderClaims() {
        // If no subjects are selected, use the entire list of subjects
        const selectedSubjectCodes = this.state.subjects;
        const subjects = selectedSubjectCodes.length !== 0
            ? this.props.subjects.filter(s => selectedSubjectCodes.indexOf(s.code) !== -1)
            : [];

        const tags = [<option key={0}>NA</option>,
            subjects
            .reduce((cs: Claim[], s: Subject) => cs.concat(s.claims), [])
            .map(c => this.renderSingleClaim(c))]

        return (<select value={this.state.claims} onChange={this.toggleClaim}>{tags}</select>);
    }

    renderSingleInteractionType(it: InteractionType) {
        const selectedInteractionTypes = this.state.interactionTypes;
        let containsInteractionType = selectedInteractionTypes.indexOf(it.code) !== -1;

        return (<option key={it.code} value={it.code} >{it.label}</option>);
    }

    renderInteractionTypes() {
        const selectedSubjectCodes = this.state.subjects;
        const selectedSubjects = selectedSubjectCodes.length !== 0
            ? this.props.subjects.filter(subj => selectedSubjectCodes.indexOf(subj.code) !== -1)
            : [];

        const visibleInteractionTypes = selectedSubjects.length !== 0
            ? this.props.interactionTypes.filter(it => selectedSubjects.some(subj => subj.interactionTypeCodes.indexOf(it.code) !== -1))
            : [];

        const tags = [<option key={0}>NA</option>, visibleInteractionTypes.map(vit => this.renderSingleInteractionType(vit))];

        return (<select value={this.state.interactionTypes} onChange={this.toggleInteractionType}>{tags}</select>);
    }

    toggleInteractionType = (event: React.FormEvent<HTMLSelectElement>) => {
        const code = event.currentTarget.value;
        const allInteractionTypes = this.state.interactionTypes;
        let newInteractionType: string[] = [];

        if (code !== "NA") {
            newInteractionType = [code];
        }

        this.setState({
            interactionTypes: newInteractionType
        }, () => this.beginChangeTimeout());
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
                    {this.renderClaims()}
                    {this.renderInteractionTypes()}
                </div>
            </div>
        );
    }
}
