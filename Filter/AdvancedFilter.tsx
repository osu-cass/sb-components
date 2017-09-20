import * as React from "react";
import * as ItemModels from '../Models/ItemModels';
import { Selection, LabelValue } from './AdvancedFilterModel';

interface Props {
    isMultiSelect: boolean;
    onClick: (val: string|number) => void;
    
    fieldName: string;
    infoDescription:string;
    defaultValue?: string|number;
    options: LabelValue[];
 };

interface State { };

export class AdvancedFilter extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
    }

    render() {
        const tags:JSX.Element[] = [];
        
        this.props.options.forEach((t, i) =>{ 
            let classname = "";

            if(this.props.defaultValue === t.value || t.selected){
                classname = "selected";
            }

            tags.push(
                <button className={classname} key={i} value={t.value} onClick={() => this.props.onClick(t.value)}>{t.label}</button>
            );
    });

        return (
                <div id={(this.props.fieldName + "-filter").toLocaleLowerCase()} className="filter-selection">
                    <label>
                        <span info-label>{this.props.fieldName}</span>

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