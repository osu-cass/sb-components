import * as React from "react";
import * as GradeLevels from "../Models/GradeLevels";
import * as ItemModels from '../Models/ItemModels';

interface selection {
    fieldName: string;
    infoDescription: string;
    selectedValue?: string;
    options: [{label: string, code: string}];
}

interface Props {
    filterOptions: ItemModels.FilterOptions;
    onChange: (params: ItemModels.ItemFilter) => void;
    isLoading: boolean;
    itemFilter: ItemModels.ItemFilter
}

interface State extends ItemModels.ItemFilter { }

export class Filter extends React.Component<Props,State>{
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

    //generic filter
    renderChildfilter(item: selection) {
        const tags:JSX.Element[] = [];
        
        item.options.forEach((t, i) => tags.push(
            <button key={i} value={t.code}>{t.label}</button>
        ));

        return (
                <div className="block-child">
                    <label>
                        <span info-label>{item.fieldName}}</span>
                        <button>Info Button</button>
                    </label>
                    <div className="child-filter-options">
                        <button key={0} value={0}>All</button>
                        <button key={1} value={1}>Option 1</button>
                        <button key={2} value={2}>Option 2</button>
                    </div>
                </div>
        );
    }

    render() {
        return (
            <div className="search-params">
                <div className="search-header">
                    <div className="search-status">
                        {this.props.isLoading ? <img src="images/spin.gif" className="spin" /> : undefined}
                    </div>
                    <div>
                        <a onClick={() => this.resetFilters()} 
                            onKeyPress={e => this.keyPressResetFilters(e)} 
                            tabIndex={0}>Reset filters</a>
                    </div>
                </div>
                <div className="search-categories" aria-live="polite" aria-relevant="additions removals">
                    {/* {this.renderGrades()}
                    {this.renderSubjects()}
                    {this.renderTechTypes()} */}
                </div>
            </div>
        );
    }
}