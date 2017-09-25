import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RubricEntryComponent, SampleResponseComponent } from '../Rubric';
import { shallow, mount } from 'enzyme';

describe("RubricEntryComponent", () => {
    const props = {
        scorepoint: "123",
        name:  "Steve Harvey",
        value: "val"
    }

    it("matches snapshot", () => {
        expect(shallow(<RubricEntryComponent {...props}/>)).toMatchSnapshot();;
    })
})


describe("SampleResponseComponent", () => {
    const props = {
        purpose: "purpose",
        scorePoint: "scorePoint",
        name: "name",
        sampleContent: "sampleContent"
    }

    it("matches snapshot", () => {
        expect(shallow(<SampleResponseComponent {...props}/>)).toMatchSnapshot();;
    })
})