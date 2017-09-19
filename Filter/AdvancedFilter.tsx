import * as React from "react";
import * as ItemModels from '../Models/ItemModels';

export interface selection {
    fieldName: string;
    infoDescription: string;
    selectedValue?: string;
    options: [{label: string, code: string|number}];
}

interface Props {
    filterOptions: ItemModels.FilterOptions;
    onClick: (params: ItemModels.ItemFilter) => void;
    isLoading: boolean;
    itemFilter: ItemModels.ItemFilter
}

interface State extends ItemModels.ItemFilter { }

export class Filter extends React.Component<Props, State>{
    constructor(props: Props) {
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

    //generic filter
    renderChildfilter(item: selection) {
        const tags:JSX.Element[] = [];
        
        item.options.forEach((t, i) => tags.push(
            <button key={i} value={t.code} onClick={this.onClick}>{t.label}</button>
        ));

        return (
                <div id={(item.fieldName+"-filter").toLocaleLowerCase()} className="block-child">
                    <label>
                        <span info-label>{item.fieldName}}</span>
                        <div className="tooltip">info
                            {/*w3schools basic tooltip*/}
                            <span className="tooltiptext">{item.infoDescription}</span>
                        </div>
                    </label>
                    <div className="child-filter-options">
                        {tags}
                    </div>
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
                <div className="filter-categories" aria-live="polite" aria-relevant="additions removals">
                    {/* {this.renderGrades()}
                    {this.renderSubjects()}
                    {this.renderTechTypes()} */}
                </div>
            </div>
        );
    }
}