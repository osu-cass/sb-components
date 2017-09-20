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

interface State extends Selection { };

export class AdvancedFilter extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
    }

    //generic filter
    render() {
        const tags:JSX.Element[] = [];
        
        this.state.options.forEach((t, i) => tags.push(
            <button key={i} value={t.value} onClick={() => this.props.onClick(t.value)}>{t.label}</button>
        ));

        return (
                <div id={(this.state.fieldName + "-filter").toLocaleLowerCase()} className="block-child">
                    <label>
                        <span info-label>{this.state.fieldName}}</span>

                        {/* seperate tooltip into its own react componenet */}
                        <div className="tooltip">info
                            {/*w3schools basic tooltip*/}
                            <span className="tooltiptext">{this.state.infoDescription}</span>
                        </div>

                    </label>
                    <div className="child-filter-options">
                        {tags}
                    </div>
                </div>
        );
    }
}