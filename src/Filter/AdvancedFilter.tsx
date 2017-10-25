import * as React from "react";
import { AdvancedFilterCategory, AdvancedFilterOption, OptionType } from './AdvancedFilterModel';
import "../styles/AdvancedFilter.css";

export interface Props extends AdvancedFilterCategory { 
    selectedHandler: (data?: AdvancedFilterOption) => void;
}

export class AdvancedFilter extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    renderAllbtnContainer (){
        let allBtnContainer:JSX.Element|undefined;
        let classname = "";
        let anySelected = this.props.filterOptions.some(fo => fo.isSelected)

        if (this.props.displayAllButton) {
            classname = anySelected ? "" : " selected-button";
            
            allBtnContainer = (
                <div className="filter-all-btn-container">
                    <button className={"filter-all-btn " + classname + " filter-button"} key="all" onClick={() => this.props.selectedHandler()}>All</button>
                </div>
            );
        }
        return allBtnContainer;
    }

    renderTags() {
        const tags:JSX.Element[] = [];
        let classname = "";
        if(this.props.filterOptions){
            this.props.filterOptions.forEach((t, i) => {                 
                classname = t.isSelected ? "selected-button" : "";

                tags.push(
                    <button className={classname + " filter-button"} key={t.key} onClick={() => this.props.selectedHandler(t)}>{t.label}</button>
                );
            });
        }
        return tags;
    }

    render() {
        return (
            <div id={(this.props.label + "-filter").toLocaleLowerCase()} className="filter-selection">
                <label>
                    <span info-label>{this.props.label}</span>
                    <span data-tooltip={this.props.helpText} data-tooltip-position="top"><span className="fa fa-info-circle fa-sm"/></span>
                </label>
                <div className="child-filter-container">
                    {this.renderAllbtnContainer()}
                    <div className="filter-button-container">
                        {this.renderTags()}
                    </div>
                </div>
            </div>
        );
    }
}