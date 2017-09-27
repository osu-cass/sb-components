import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemViewComponent } from '../ItemView';
import * as Models from "../../Models";
import { shallow } from 'enzyme';

const itemView: Models.ItemView = {
    id: "12334",
    html: null,
    picturePath: null,
    captured: true,
    type: Models.ViewType.html
}

describe("EvidenceStatement", () => {
    it("matches snapshot", () => {
        expect(shallow(<ItemViewComponent view={itemView}/>)).toMatchSnapshot()
    })
})