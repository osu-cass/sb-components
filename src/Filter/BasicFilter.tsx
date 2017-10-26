import * as React from "react";
import { BasicFilterCategory, BasicFilterOption, OptionType } from './AdvancedFilterModel';
import "../styles/AdvancedFilter.css";

export interface Props extends BasicFilterCategory { 
    selectedHandler: (data: BasicFilterOption) => void;
}

export class BasicFilter extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    renderTags() {
        const tags:JSX.Element[] = [];
        let classname = "";
        if(this.props.filterOptions){
            this.props.filterOptions.forEach((t, i) => {                 

                if(this.props.type == OptionType.DropDown){
                    tags.push(
                        <option  key={t.key} onClick={() => this.props.selectedHandler(t)}>{t.label}</option>
                    );
                }
                else if(this.props.type == OptionType.radioBtn){
                    //selected flag
                    tags.push(
                        <input type='radio' key={t.key} onClick={() => this.props.selectedHandler(t)}>{t.label}</input>
                    );
                }
            });
        }
        return tags;
    }

    render() {
        let filterBody:JSX.Element; 

        if(this.props.type == OptionType.DropDown){
            filterBody = (
                <select>
                    {this.renderTags()}
                </select>
            );
        }
        else {
            filterBody = (
                <div>
                    {this.renderTags()}
                </div>
            );
        }


        return(
            <div className="basic-filter">
                {filterBody}
            </div>
        );
    }

}