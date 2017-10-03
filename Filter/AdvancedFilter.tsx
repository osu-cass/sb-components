import * as React from "react";
import * as ItemModels from '../Models/ItemModels';
import { AdvancedFilterCategory, AdvancedFilterOption, OptionType } from './AdvancedFilterModel';

interface Props extends AdvancedFilterCategory { 
    selectedHandler: (data?: AdvancedFilterOption) => void;
}

export class AdvancedFilter extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const tags:JSX.Element[] = [];

        if (this.props.displayAllButton) {
            tags.push(
                <button className="all-button" key="all" onClick={() => this.props.selectedHandler()}>All</button>
            );
        }

        if(this.props.filterOptions){
            this.props.filterOptions.forEach((t, i) => { 
                let classname = "";
                
                if (t.isSelected){
                    classname = "selected";
                }

                tags.push(
                    <button className={classname} key={t.key} onClick={() => this.props.selectedHandler(t)}>{t.label}</button>
                );
            });
        }

        return (
            <div id={(this.props.label + "-filter").toLocaleLowerCase()} className="filter-selection">
                <label>
                    <span info-label>{this.props.label}</span>
                    <span data-tooltip={this.props.helpText} data-tooltip-position="top">ℹ</span>
                </label>
                <div className="child-filter-options">
                    
                    {tags}
                </div>
            </div>
        );
    }
}