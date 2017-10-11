import * as GradeLevels from '../GradeLevels';

describe("Grade Levels", () => {
    it("caseTostring () returns strings correctly", () => {
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.NA)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Grade3)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Grade4)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Grade5)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Grade6)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Grade7)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Grade8)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Grade9)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Grade10)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Grade11)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Grade12)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Elementary)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.Middle)).toMatchSnapshot();
        expect(GradeLevels.caseToString(GradeLevels.GradeLevels.High)).toMatchSnapshot();
    })

    it("toString() returns a comma delineated string", () => {
        expect(GradeLevels.toString(GradeLevels.GradeLevels.All)).toMatchSnapshot();
    })

    it("boolean check for GradeLevels contents", () => {
        expect(GradeLevels.contains(GradeLevels.GradeLevels.All, GradeLevels.GradeLevels.Grade3)).toBe(true);
    })
})