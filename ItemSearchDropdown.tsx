import * as React from 'react';
import * as GradeLevels from "./GradeLevels";
import { parseQueryString } from "./ApiModels";

export interface InteractionType {
    code: string;
    label: string;
}

export interface Claim {
    code: string;
    label: string;
}

export interface Subject {
    code: string;
    label: string;
    claims: Claim[];
    interactionTypeCodes: string[];
}

export interface SearchAPIParams {
    itemId: string;
    gradeLevels: GradeLevels.GradeLevels;
    subjects: string[];
    claims: string[];
    interactionTypes: string[];
    performanceOnly: boolean;
}

//passed in props, all options
export interface Props {
    interactionTypes: InteractionType[];
    subjects: Subject[];
    onChange: (params: SearchAPIParams) => void;
    selectSingleResult: () => void;
    isLoading: boolean;
}
//selected items
export interface State {
    itemId: string;
    gradeLevels: GradeLevels.GradeLevels;
    subjects: string[];
    claims: string[];
    interactionTypes: string[];
    performanceOnly: boolean;
}


export class ItemSearchDropdown extends React.Component<Props, State>{
    timeoutToken?: number;

    constructor(props: Props) {
        super(props);

        const queryObject = parseQueryString(location.search);
        const itemId = (queryObject["itemID"] || [])[0] || "";

        const gradeString = (queryObject["gradeLevels"] || [])[0];
        const gradeLevels: GradeLevels.GradeLevels = parseInt(gradeString, 10) || GradeLevels.GradeLevels.NA;

        const subjects = queryObject["subjects"] || [];
        const claims = queryObject["claims"] || [];
        const interactionTypes = queryObject["interactionTypes"] || [];
        const performanceOnly = (queryObject["performanceOnly"] || [])[0] === "true";

        this.state = {
            itemId: itemId,
            gradeLevels: gradeLevels,
            subjects: subjects,
            claims: claims,
            interactionTypes: interactionTypes,
            performanceOnly: performanceOnly
        };

        this.onChange();
    }

    encodeQuery(): string {
        let pairs: string[] = [];
        if (this.state.claims && this.state.claims.length !== 0) {
            pairs.push("claims=" + this.state.claims.join(","));
        }
        if (this.state.gradeLevels !== GradeLevels.GradeLevels.NA) {
            pairs.push("gradeLevels=" + this.state.gradeLevels);
        }
        if (this.state.interactionTypes && this.state.interactionTypes.length !== 0) {
            pairs.push("interactionTypes=" + this.state.interactionTypes.join(","));
        }
        if (this.state.itemId) {
            pairs.push("itemID=" + this.state.itemId);
        }
        if (this.state.subjects && this.state.subjects.length !== 0) {
            pairs.push("subjects=" + this.state.subjects.join(","));
        }
        if (this.state.performanceOnly) {
            pairs.push("performanceOnly=true");
        }

        if (pairs.length === 0) {
            return "/ScoringGuide";
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
        const params: SearchAPIParams = {
            itemId: this.state.itemId || "",
            gradeLevels: this.state.gradeLevels || GradeLevels.GradeLevels.All,
            subjects: this.state.subjects || [],
            claims: this.state.claims || [],
            interactionTypes: this.state.interactionTypes || [],
            performanceOnly: this.state.performanceOnly || false
        };
        this.props.onChange(params);
    }

    onItemIDInput(e: React.FormEvent<HTMLInputElement>) {
        const newValue = e.currentTarget.value;
        const isInputOK = /^\d{0,4}$/.test(newValue);
        if (isInputOK) {
            this.setState({
                itemId: newValue
            }, () => this.beginChangeTimeout());
        }
    }

    onItemIDKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            this.props.selectSingleResult();
        }
    }

    togglePerformanceOnly() {
        this.setState({
            performanceOnly: !this.state.performanceOnly
        }, () => this.beginChangeTimeout());
    }



    resetFilters() {
        this.setState({
            itemId: "",
            gradeLevels: GradeLevels.GradeLevels.NA,
            subjects: [],
            claims: [],
            interactionTypes: []
        }, () => this.beginChangeTimeout());
    }

    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.resetFilters();
        }
    }

    toggleGrades = (event: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            // Exclusive OR to flip just the bits for the input grades
            gradeLevels: Number(event.currentTarget.value) // tslint:disable-line:no-bitwise
        }, () => this.beginChangeTimeout());
    }

    renderGrades() {
        
        const tags = [
            <option key={1} value={GradeLevels.GradeLevels.NA}>NA</option>,
            <option key={2} value={GradeLevels.GradeLevels.Elementary}>Elementary</option>,
            <option key={3} value={GradeLevels.GradeLevels.Middle}>Middle</option>,
            <option key={4} value={GradeLevels.GradeLevels.High}>High</option>,
        ];

        return (<select value={this.state.gradeLevels} onChange={this.toggleGrades}>{tags}</select>);
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