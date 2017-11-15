import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Rubric from '../Rubric';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });



const entry: Rubric.RubricEntry = {
    scorepoint: "123",
    name:  "Steve Harvey",
    value: "val"
}

const sampleResponse: Rubric.SampleResponse = {
    purpose: "purpose",
    scorePoint: "scorePoint",
    name: "name",
    sampleContent: "sampleContent"
}

const samples: Rubric.RubricSample[] =  [];

const rubric: Rubric.Rubric = {
    language: "english",
    rubricEntries: [entry],
    samples
}

describe("RubricEntryComponent", () => {
    it("matches snapshot", () => {
        expect(shallow(<Rubric.RubricEntryComponent {...entry}/>)).toMatchSnapshot();;
    })
})


describe("SampleResponseComponent", () => {
    it("matches snapshot", () => {
        expect(shallow(<Rubric.SampleResponseComponent {...sampleResponse}/>)).toMatchSnapshot();;
    })
})

describe("rubric component", () => {
    it("matches snapshot", () => {
        expect(shallow(<Rubric.RubricComponent {...rubric}/>)).toMatchSnapshot();;
    })
})