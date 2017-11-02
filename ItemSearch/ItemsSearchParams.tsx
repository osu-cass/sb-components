import * as React from 'react';
import * as ItemsSearch from './ItemsSearch';
import * as GradeLevels from '../GradeLevels/GradeLevels';
import * as Models from './ItemsSearchModels';

const hideArrow = (
    <span aria-label="Hide">▼</span>
);

const showArrow = (
    <span aria-label="Show">▶</span>
);

function parseQueryString(url: string): { [key: string]: string[] | undefined } {
    let queryObject: { [key: string]: string[] | undefined } = {};
    const pairs = url.slice(url.indexOf("?") + 1).split("&");
    for (const pair of pairs) {
        const pairParts = pair.split("=");
        if (pairParts[0] && pairParts[1]) {
            queryObject[pairParts[0]] = pairParts[1].split(",");
        }
    }
    return queryObject;
}

export interface Props {
    interactionTypes: Models.InteractionType[];
    subjects: Models.Subject[];
    onChange: (params: Models.SearchAPIParams) => void;
    selectSingleResult: () => void;
    isLoading: boolean;
}

export interface State {
    itemId: string;
    gradeLevels: GradeLevels.GradeLevels;
    subjects: string[];
    claims: string[];
    interactionTypes: string[];
    targets: number[];
    performanceOnly: boolean;

    expandMore: boolean;
    expandGradeLevels: boolean;
    expandSubjects: boolean;
    expandClaims: boolean;
    expandInteractionTypes: boolean;
    expandTargets: boolean;
}

export class ISPComponent extends React.Component<Props, State> {

    // TODO: since the callback property exists on setState, should this be in the state interface instead of the component class?
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
        const targets = queryObject["targets"] || [];

        this.state = {
            itemId: itemId,
            gradeLevels: gradeLevels,
            subjects: subjects,
            claims: claims,
            interactionTypes: interactionTypes,
            targets: targets.map(t => Number(t)),
            performanceOnly: performanceOnly,

            expandMore: itemId.length !== 0 || performanceOnly,
            expandGradeLevels: gradeLevels !== GradeLevels.GradeLevels.NA,
            expandSubjects: subjects.length !== 0,
            expandClaims: claims.length !== 0,
            expandInteractionTypes: interactionTypes.length !== 0,
            expandTargets: targets.length !== 0
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
        if (this.state.targets && this.state.targets.length !== 0) {
            pairs.push("targets=" + this.state.targets.join(","));
        }

        if (pairs.length === 0) {
            return "/BrowseItems";
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
        const params: Models.SearchAPIParams = {
            itemId: this.state.itemId || "",
            gradeLevels: this.state.gradeLevels || GradeLevels.GradeLevels.All,
            subjects: this.state.subjects || [],
            claims: this.state.claims || [],
            interactionTypes: this.state.interactionTypes || [],
            performanceOnly: this.state.performanceOnly || false,
            targets: this.state.targets || []
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

    toggleGrades(grades: GradeLevels.GradeLevels) {
        this.setState({
            // Exclusive OR to flip just the bits for the input grades
            gradeLevels: this.state.gradeLevels ^ grades // tslint:disable-line:no-bitwise
        }, () => this.beginChangeTimeout());

    }

    togglePerformanceOnly() {
        this.setState({
            performanceOnly: !this.state.performanceOnly
        }, () => this.beginChangeTimeout());
    }

    toggleSubject(subject: string) {
        const subjectCodes = this.state.subjects || [];
        const containsSubject = subjectCodes.indexOf(subject) !== -1;
        const newSubjectCodes = containsSubject ? subjectCodes.filter(s => s !== subject) : subjectCodes.concat([subject]);

        if (newSubjectCodes.length === 0) {
            this.setState({
                subjects: newSubjectCodes,
                claims: [],
                interactionTypes: [],
                targets: []
            }, () => this.beginChangeTimeout());
            return;
        }

        const newSubjects = this.props.subjects.filter(s => newSubjectCodes.indexOf(s.code) !== -1);

        // Remove all claims not contained by the newly selected subjects
        const subjectClaimCodes = newSubjects.reduce((prev: string[], cur: Models.Subject) => prev.concat(cur.claims.map(c => c.code)), []);
        const newClaimCodes = this.state.claims.filter(c => subjectClaimCodes.indexOf(c) !== -1);

        const subjectInteractionCodes = newSubjects.reduce((prev: string[], cur: Models.Subject) => prev.concat(cur.interactionTypeCodes), []);
        const newInteractionCodes = this.state.interactionTypes.filter(i => subjectInteractionCodes.indexOf(i) !== -1);

        const subjectTargets = newSubjects.map(s => s.claims)
            .reduce((a, b) => a.concat(b), [])
            .map(c => c.targets)
            .reduce((a, b) => a.concat(b), [])
            .map(t => t.nameHash);
        const newTargets = this.state.targets.filter(t => subjectTargets.indexOf(t) !== -1);

        this.setState({
            subjects: newSubjectCodes,
            claims: newClaimCodes,
            interactionTypes: newInteractionCodes,
            targets: newTargets
        }, () => this.beginChangeTimeout());
    }

    toggleClaim(claim: string) {
        const claims = this.state.claims;
        const containsClaim = claims.indexOf(claim) !== -1;
        const newClaimCodes = containsClaim ? claims.filter(c => c !== claim) : claims.concat([claim]);
        const newVisibleTargets = this.props.subjects.map(s => s.claims)
            .reduce((a, b) => a.concat(b), [])
            .filter(c => newClaimCodes.indexOf(c.code) !== -1)
            .map(c => c.targets)
            .reduce((a, b) => a.concat(b), [])
            .map(t => t.nameHash);
        const newTargets = this.state.targets.filter(t => newVisibleTargets.indexOf(t) !== -1);

        this.setState({
            claims: newClaimCodes,
            targets: newTargets
        }, () => this.beginChangeTimeout());
    }

    toggleTarget(target: number) {
        const targets = this.state.targets;
        const containsTarget = targets.indexOf(target) !== -1;
        this.setState({
            targets: containsTarget ? targets.filter(t => t !== target) : targets.concat([target])
        }, () => this.beginChangeTimeout());
    }

    toggleInteractionType(code: string) {
        const interactionTypes = this.state.interactionTypes;
        const containsSubject = interactionTypes.indexOf(code) !== -1;
        this.setState({
            interactionTypes: containsSubject ? interactionTypes.filter(s => s !== code) : interactionTypes.concat([code])
        }, () => this.beginChangeTimeout());
    }

    /**
        * Returns a value indicating whether all search categories are expanded.
        */
    getExpandAll() {
        const { expandMore, expandGradeLevels, expandSubjects, expandClaims, expandInteractionTypes } = this.state;
        const expandAll = expandMore && expandGradeLevels && expandSubjects && expandClaims && expandInteractionTypes;
        return expandAll;
    }

    toggleExpandItemIDInput() {
        this.setState({
            expandMore: !this.state.expandMore
        });
    }

    toggleExpandGradeLevels() {
        this.setState({
            expandGradeLevels: !this.state.expandGradeLevels
        });
    }

    toggleExpandSubjects() {
        this.setState({
            expandSubjects: !this.state.expandSubjects
        });
    }

    toggleExpandClaims() {
        this.setState({
            expandClaims: !this.state.expandClaims
        });
    }

    toggleExpandTargets() {
        this.setState({
            expandTargets: !this.state.expandTargets
        });
    }

    toggleExpandInteractionTypes() {
        this.setState({
            expandInteractionTypes: !this.state.expandInteractionTypes
        });
    }

    toggleExpandAll() {
        // If everything is already expanded, then collapse everything. Otherwise, expand everything.
        const expandAll = !this.getExpandAll();
        this.setState({
            expandMore: expandAll,
            expandGradeLevels: expandAll,
            expandSubjects: expandAll,
            expandClaims: expandAll,
            expandInteractionTypes: expandAll,
            expandTargets: expandAll,
        });
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

    keyPressToggleExpandTargets(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.toggleExpandTargets();
        }
    }

    keyPressToggleExpandItemId(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.toggleExpandItemIDInput();
        }
    }

    keyPressToggleExpandAll(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.toggleExpandAll();
        }
    }

    keyPressToggleExpandGrades(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.toggleExpandGradeLevels();
        }
    }

    keyPressToggleExpandSubjects(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.toggleExpandSubjects();
        }
    }

    keyPressToggleExpandClaims(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.toggleExpandClaims();
        }
    }

    toggleExpandItemTypes(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.toggleExpandInteractionTypes();
        }
    }

    renderSearchHeader(): JSX.Element {
        return (
            <div className="search-header">
                <h1 className="search-title" tabIndex={0}>Browse Items</h1>
                <div className="search-status">
                    {this.props.isLoading ? <img src="images/spin.gif" className="spin" /> : undefined}
                    <div><a onClick={() => this.resetFilters()} onKeyPress={e => this.keyPressResetFilters(e)} tabIndex={0}>Reset filters</a></div>
                    <div onClick={() => this.toggleExpandAll()} onKeyPress={e => this.keyPressToggleExpandAll(e)} tabIndex={0}
                        aria-label={(this.getExpandAll() ? " Hide" : " Show") + " all"}>
                        {this.getExpandAll() ? hideArrow : showArrow}
                        {this.getExpandAll() ? " Hide" : " Show"} all
                    </div>
                </div>
            </div>
        );
    }

    render() {
        history.replaceState(null, "", this.encodeQuery());
        return (
            <div className="search-params">
                {this.renderSearchHeader()}
                <div className="search-categories" aria-live="polite" aria-relevant="additions removals">
                    {this.renderGrades()}
                    {this.renderSubjects()}
                    {this.renderClaims()}
                    {this.renderInteractionTypes()}
                    {this.renderSearchById()}
                    {this.renderTargets()}
                </div>
            </div>
        );
    }

    renderSearchById() {
        const input = (
            <input type="tel" className="form-control"
                placeholder="Item ID"
                onChange={e => this.onItemIDInput(e)}
                onKeyUp={e => this.onItemIDKeyUp(e)}
                value={this.state.itemId}>
            </input>
        );
        return (
            <div className="search-category" style={{ "maxWidth":"250px" }}>
                <label aria-expanded={this.state.expandMore} onClick={() => this.toggleExpandItemIDInput()}
                    onKeyUp={e => this.keyPressToggleExpandItemId(e)} tabIndex={0}>
                    {this.state.expandMore ? hideArrow : showArrow} Browse By Id
                </label>
                { this.state.expandMore ? input : undefined }
            </div>
        );
    }

    renderGrades() {
        const gradeLevels = this.state.gradeLevels;
        const elementarySelected = GradeLevels.contains(gradeLevels, GradeLevels.GradeLevels.Elementary);
        const middleSelected = GradeLevels.contains(gradeLevels, GradeLevels.GradeLevels.Middle);
        const highSelected = GradeLevels.contains(gradeLevels, GradeLevels.GradeLevels.High);

        const tags = [
            <button role="button" key={GradeLevels.GradeLevels.Elementary} className={(elementarySelected ? "selected" : "") + " tag"}
                onClick={() => this.toggleGrades(GradeLevels.GradeLevels.Elementary)}
                tabIndex={0}
                aria-pressed={elementarySelected}
                aria-label="Grades 3 to 5">

                Grades 3-5
            </button>,

            <button role="button" key={GradeLevels.GradeLevels.Middle} className={(middleSelected ? "selected" : "") + " tag"}
                onClick={() => this.toggleGrades(GradeLevels.GradeLevels.Middle)}
                tabIndex={0}
                aria-pressed={middleSelected}
                aria-label="Grades 6 to 8">

                Grades 6-8
            </button>,

            <button role="button" key={GradeLevels.GradeLevels.High} className={(highSelected ? "selected" : "") + " tag"}
                onClick={() => this.toggleGrades(GradeLevels.GradeLevels.High)}
                tabIndex={0}
                aria-pressed={highSelected}>

                High School
            </button>
        ];

        return (
            <div className="search-category" style={{ flexGrow: 3 }}>
                <label aria-expanded={this.state.expandGradeLevels}
                    onClick={() => this.toggleExpandGradeLevels()}
                    onKeyPress={e => this.keyPressToggleExpandGrades(e)}
                    tabIndex={0}>

                    {this.state.expandGradeLevels ? hideArrow : showArrow} Grade Levels
                </label>
                <div className="search-tags form-group">
                    {this.state.expandGradeLevels ? tags : undefined}
                </div>
            </div>
        );
    }

    renderSubject(subject: Models.Subject) {
        const subjects = this.state.subjects;
        const containsSubject = subjects.indexOf(subject.code) !== -1;
        const className = (containsSubject ? "selected" : "") + " tag";
        return (
            <button role="button" key={subject.code} className={className}
                onClick={() => this.toggleSubject(subject.code)}
                tabIndex={0}
                aria-pressed={containsSubject}>

                {subject.label}
            </button>
        );
    }

    renderSubjects() {
        const tags = this.state.expandSubjects
            ? this.props.subjects.map(s => this.renderSubject(s))
            : undefined;

        return (
            <div className="search-category" style={{ flexGrow: 2 }}>
                <label aria-expanded={this.state.expandSubjects}
                    onClick={() => this.toggleExpandSubjects()}
                    onKeyPress={e => this.keyPressToggleExpandSubjects(e)}
                    tabIndex={0}>

                    {this.state.expandSubjects ? hideArrow : showArrow} Subjects
                </label>
                <div className="search-tags form-group">
                    {tags}
                </div>
            </div>
        );
    }

    renderTarget(target: Models.Target): JSX.Element {
        const targets = this.state.targets;
        const containsTarget = targets.indexOf(target.nameHash) !== -1;
        return (
            <button role="button" key={target.nameHash}
                className={(containsTarget ? "selected" : "") + " tag"}
                onClick={() => this.toggleTarget(target.nameHash)}
                tabIndex={0}
                aria-pressed={containsTarget}>

                {target.name}
            </button>
        );
    }

    renderTargets(): JSX.Element {
        const selectedSubjects = this.props.subjects.filter(s => this.state.subjects.indexOf(s.code) !== -1);
        const allClaims = selectedSubjects.length !== 0
            ? selectedSubjects.map(s => s.claims).reduce((a, b) => a.concat(b))
            : [];
        const selectedClaims = allClaims.filter(c => this.state.claims.indexOf(c.code) !== -1);
        const visibleTargets = selectedClaims.length !== 0
            ? selectedClaims.map(c => c.targets).reduce((a, b) => a.concat(b))
            : [];
        let uniqueTargets: Models.Target[] = [];
        visibleTargets.forEach(t => {
            if (uniqueTargets.find(ut => ut.nameHash == t.nameHash) === undefined) {
                uniqueTargets.push(t);
            }
        });

        let tags: JSX.Element | JSX.Element[];
        if (uniqueTargets.length === 0) {
            tags = this.state.claims.length === 0 
                ? <p tabIndex={0}>Please select a claim first.</p>
                : <p tabIndex={0}>No targets found for the specified claim(s).</p>
        } else {
            tags = uniqueTargets.map(t => this.renderTarget(t));
        }

        return (
            <div className="search-category" style={{ flexGrow: visibleTargets.length }}>
                <label aria-expanded={this.state.expandTargets}
                    onClick={() => this.toggleExpandTargets()}
                    onKeyPress={e => this.keyPressToggleExpandTargets(e)}
                    tabIndex={0}>

                    {this.state.expandTargets ? hideArrow : showArrow} Targets
                </label>
                <div className="search-tags form-group">
                    {this.state.expandTargets ? tags : undefined}
                </div>
            </div>
        );
    }

    renderClaims() {
        const selectedClaims = this.state.claims;

        const renderClaim = (claim: Models.Claim) => {
            let containsClaim = selectedClaims.indexOf(claim.code) !== -1;
            return (
                <button role="button" key={claim.code} className={(containsClaim ? "selected" : "") + " tag"}
                    onClick={() => this.toggleClaim(claim.code)}
                    tabIndex={0}
                    aria-pressed={containsClaim}>

                    {claim.label}
                </button>
            );
        };

        // If no subjects are selected, use the entire list of subjects
        const selectedSubjectCodes = this.state.subjects;
        const subjects = selectedSubjectCodes.length !== 0
            ? this.props.subjects.filter(s => selectedSubjectCodes.indexOf(s.code) !== -1)
            : [];

        const tags = subjects.length === 0
            ? <p tabIndex={0}>Please first select a subject.</p>
            : subjects
                .reduce((cs: Models.Claim[], s: Models.Subject) => cs.concat(s.claims), [])
                .map(renderClaim);

        return (
            <div className="search-category" style={{ flexGrow: this.props.subjects.length }}>
                <label aria-expanded={this.state.expandClaims}
                    onClick={() => this.toggleExpandClaims()}
                    onKeyPress={e => this.keyPressToggleExpandClaims(e)}
                    tabIndex={0}>

                    {this.state.expandClaims ? hideArrow : showArrow} Claims
                </label>
                <div className="search-tags form-group">
                    {this.state.expandClaims ? tags : undefined}
                </div>
            </div>
        );
    }

    renderInteractionTypes() {
        const selectedInteractionTypes = this.state.interactionTypes;
        const performanceOnlySelected = this.state.performanceOnly;

        const renderInteractionType = (it: Models.InteractionType) => {
            let containsInteractionType = selectedInteractionTypes.indexOf(it.code) !== -1;
            return (
                <button key={it.code} className={(containsInteractionType ? "selected" : "") + " tag"}
                    onClick={() => this.toggleInteractionType(it.code)}
                    tabIndex={0}
                    aria-pressed={containsInteractionType}>

                    {it.label}
                </button>
            );
        };

        const selectedSubjectCodes = this.state.subjects;
        const selectedSubjects = selectedSubjectCodes.length !== 0
            ? this.props.subjects.filter(subj => selectedSubjectCodes.indexOf(subj.code) !== -1)
            : [];

        const visibleInteractionTypes = selectedSubjects.length !== 0
            ? this.props.interactionTypes.filter(it => selectedSubjects.some(subj => subj.interactionTypeCodes.indexOf(it.code) !== -1))
            : [];

        const visibleTags = (
            <div>
                {visibleInteractionTypes.map(renderInteractionType)}
                <br /><br />
                <div>
                    <label>Performance Tasks</label>
                    <button role="button"
                        className={(performanceOnlySelected ? "selected " : "") + "tag"}
                        onClick={() => this.togglePerformanceOnly()}
                        tabIndex={0}
                        aria-pressed={performanceOnlySelected}>
                        Only show Performance Task items
                    </button>
                </div>
            </div>
        );

        const itemTypesContents = visibleInteractionTypes.length === 0
            ? <p tabIndex={0}>Please first select a subject.</p>
            : visibleTags;

        return (
            <div className="search-category" style={{ flexGrow: this.props.interactionTypes.length }}>
                <label aria-expanded={this.state.expandInteractionTypes}
                    onClick={() => this.toggleExpandInteractionTypes()}
                    onKeyUp={e => this.toggleExpandItemTypes(e)}
                    tabIndex={0}>
                    {this.state.expandInteractionTypes ? hideArrow : showArrow} Item Types
                </label>
                {this.state.expandInteractionTypes ? itemTypesContents : undefined}
            </div>
        );
    }
}
