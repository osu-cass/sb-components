export declare enum GradeLevels {
    NA = 0,
    Grade3 = 1,
    Grade4 = 2,
    Grade5 = 4,
    Grade6 = 8,
    Grade7 = 16,
    Grade8 = 32,
    Grade9 = 64,
    Grade10 = 128,
    Grade11 = 256,
    Grade12 = 512,
    Elementary = 7,
    Middle = 56,
    High = 960,
    All = 1023,
}
export declare class GradeLevel {
    static gradeCaseToString(grade: GradeLevels): string | undefined;
    static gradeCaseToShortString(grade: GradeLevels): string | undefined;
    static gradeLevelToString(grades: GradeLevels): string | undefined;
    static gradeLevelContains(haystack: GradeLevels, needle: GradeLevels): boolean;
    static stringToGradeLevel(gradeString: string): GradeLevels;
    static gradeLevelAdd(grade: GradeLevels, gradeString: string): number;
}
