import * as React from "react";
import * as ItemModels from '../Models/ItemModels';
import { AdvancedFilterCategory, AdvancedFilterOption, AdvancedFilterInfo } from './AdvancedFilterModel';

interface Props extends AdvancedFilterCategory { };

interface State { };

export class AdvancedFilter extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
    }

    render() {
        const tags:JSX.Element[] = [];
        const sortedOptions = this.props.filterOptions.sort((a,b)=> a.order.localeCompare(b.order));
        
        sortedOptions.forEach((t, i) =>{ 
            let classname = "";
            
            if(t.isSelected){
                classname="selected";
            }

            const data:AdvancedFilterInfo = {
                key: t.key,
                isMultiSelect: this.props.isMultiSelect
            }

            tags.push(
                <button className={classname} key={t.key} onClick={() => t.selectedHandler(data)}>{t.label}</button>
            );
        });

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