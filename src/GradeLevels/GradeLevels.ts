/* tslint:disable:no-bitwise */

export enum GradeLevels {
    NA = 0,
    Grade3 = 1 << 0,
    Grade4 = 1 << 1,
    Grade5 = 1 << 2,
    Grade6 = 1 << 3,
    Grade7 = 1 << 4,
    Grade8 = 1 << 5,
    Grade9 = 1 << 6,
    Grade10 = 1 << 7,
    Grade11 = 1 << 8,
    Grade12 = 1 << 9,
    Elementary = Grade3 | Grade4 | Grade5,
    Middle = Grade6 | Grade7 | Grade8,
    High = Grade9 | Grade10 | Grade11 | Grade12,
    All = Elementary | Middle | High
}

export function caseToString(grade: GradeLevels): string {
    switch (grade) {
        case GradeLevels.NA: return "NA";
        case GradeLevels.Grade3: return "Grade 3";
        case GradeLevels.Grade4: return "Grade 4";
        case GradeLevels.Grade5: return "Grade 5";
        case GradeLevels.Grade6: return "Grade 6";
        case GradeLevels.Grade7: return "Grade 7";
        case GradeLevels.Grade8: return "Grade 8";
        case GradeLevels.Grade9: return "Grade 9";
        case GradeLevels.Grade10: return "Grade 10";
        case GradeLevels.Grade11: return "Grade 11";
        case GradeLevels.Grade12: return "Grade 12";
        case GradeLevels.Elementary: return "Elementary";
        case GradeLevels.Middle: return "Middle";
        case GradeLevels.High: return "High";
        default: return "";
    }
}

export function toString(grades: GradeLevels): string {
    const caseString = caseToString(grades);
    if (caseString !== "") {
        return caseString;
    }

    let gradeStrings: string[] = [];
    for (let i = 0; i < 10; i++) {
        if ((grades & 1 << i) === 1 << i) {
            gradeStrings.push(caseToString(1 << i));
        }
    }
    return gradeStrings.join(", ");
}

export function contains(haystack: GradeLevels, needle: GradeLevels): boolean {
    return (haystack & needle) === needle;
}
