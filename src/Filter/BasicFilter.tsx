import * as React from "react";
import { BasicFilterCategory, BasicFilterOption, OptionType } from './AdvancedFilterModel';
import "@osu-cass/smarter-balanced-styles/styles/advanced-filter.less";

export interface Props extends BasicFilterCategory { 
    selectedHandler: (data?: BasicFilterOption) => void;
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
                        <option key={t.key} value={t.key}>{t.label}</option>
                    );
                }
                else if(this.props.type == OptionType.radioBtn){
                    tags.push(
                        <label key={t.key}><input checked={t.isSelected} type='radio' key={t.key} value={t.key}  onChange={() => this.props.selectedHandler(t)}/>{t.label}</label>
                    );
                }
            });
        }
        return tags;
    }


    findFilterOption(key:string) {
        return this.props.filterOptions.find(fil => fil.key == key);
    }

    renderFilterBody() {
        let tag:JSX.Element; 
        
        if(this.props.type == OptionType.DropDown){
            tag = (
                <select onChange={(e) => this.props.selectedHandler(this.findFilterOption(e.target.value))}>
                    {this.renderTags()}
                </select>);
        }
        else {
            tag = (<form>{this.renderTags()}</form>);
        }

        return(
            <div className="basic-filter-body">{tag}</div>
        );
    }

    render() {
        return(
            <div id={(this.props.label + "-basic-filter").toLocaleLowerCase()} className="basic-filter-selection">
                <label>
                    {this.props.label}
                </label>
                {this.renderFilterBody()}
            </div>
        );
    }

}