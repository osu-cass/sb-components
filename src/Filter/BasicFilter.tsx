import * as React from "react";
import { BasicFilterCategory, BasicFilterOption, OptionType } from './AdvancedFilterModel';
import "@osu-cass/smarter-balanced-styles/styles/advanced-filter.less";

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
                        <label><input checked={t.isSelected} type='radio' value={t.key} key={t.key} onChange={() => this.props.selectedHandler(t)}/>{t.label}</label>
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
                <form>
                    {this.renderTags()}
                </form>
            );
        }


        return(
            <div className="basic-filter">
                {filterBody}
            </div>
        );
    }

}