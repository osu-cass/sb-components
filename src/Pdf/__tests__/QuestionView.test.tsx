import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QuestionView } from '../QuestionView';
import * as Models from "../../Models";
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const itemView: Models.ItemView = {
    id: "12334",
    html: null,
    picturePath: null,
    captured: true,
    type: Models.ViewType.html
}

const question: Models.Question = {
    id: "something",
    view: itemView,
    data: null,
    questionNumber: null
}

const props  = {question}

describe("QuestionDataTable", () => {
    it("matches snapshot", () => {
        expect(shallow(<QuestionView {...props} />)).toMatchSnapshot();
    })
})