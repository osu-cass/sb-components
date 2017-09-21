import * as React from "react";
import * as ItemModels from '../Models/ItemModels';
import { AdvancedFilterCategory, AdvancedFilterOption } from './AdvancedFilterModel';

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

            //check if option is selected in the filter.

            tags.push(
                <button className={classname} key={t.key} onClick={() => t.selected()}>{t.label}</button>
            );
        });

        return (
                <div id={(this.props.label + "-filter").toLocaleLowerCase()} className="filter-selection">
                    <label>
                        <span info-label>{this.props.label}</span>

                        {/*
                        w3schools basic tooltip
                        <div className="tooltip">info
                            <span className="tooltiptext">{this.props.infoDescription}</span>
                        </div>
                        */}

                    </label>
                    <div className="child-filter-options">
                        {tags}
                    </div>
                </div>
        );
    }
}