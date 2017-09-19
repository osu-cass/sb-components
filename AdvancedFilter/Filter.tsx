import * as React from "react";
import * as Api from '../Models/ApiModels';
import * as ItemCardViewModel from '../Models/ItemCardViewModel';
import { FilterHelper } from "../Models/FilterHelper";

interface Props {}

interface State {
    itemSearchResult: Api.Resource<ItemCardViewModel.ItemCardViewModel[]>;
    visibleItems?: ItemCardViewModel.ItemCardViewModel[];
}

export class Filter extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);

        // this.setState = {};
    }


    renderChildfilter() {
        return (
            <div className="child-filter">
                <p>Test</p>

                <div className="block-child">
                    <label>
                        <span info-label>Off-Grade Assessments</span>
                        <button>Info Button</button>
                    </label>
                    <div className="child-filter-options">
                        <button>All</button>
                        <button>Option 1</button>
                        <button>Option 2</button>
                    </div>
                </div>

                {/* Can add another block-child item */}
            </div>

        );
    }

    render() {

        
    }
}