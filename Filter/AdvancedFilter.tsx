import * as React from "react";
import * as ItemModels from '../Models/ItemModels';
import { Selection, LabelValue } from './AdvancedFilterModel';




interface Props {
    onClick: () => void;

    fieldName: string;
    infoDescription:string;
    defaultValue?: string|number;
    options: LabelValue[];
 };

interface State extends Selection { };

export class AdvancedFilter extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        // if(props.defaultValue){
        //     this.state.selectedValue = props.defaultValue;
        // }
        
    }

    //generic filter
    render() {
        const item = this.state;
        const tags:JSX.Element[] = [];
        
        item.options.forEach((t, i) => tags.push(
            <button key={i} value={t.value} onClick={this.props.onClick}>{t.label}</button>
        ));

        return (
                <div id={(item.fieldName + "-filter").toLocaleLowerCase()} className="block-child">
                    <label>
                        <span info-label>{item.fieldName}}</span>

                        {/* seperate tooltip into its own react componenet */}
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
}