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

/* tslint:disable: no-unnecessary-class */
export class GradeLevel {
  public static gradeCaseToString(grade: GradeLevels): string | undefined {
    // tslint:disable-next-line:switch-default
    switch (grade) {
      case GradeLevels.NA:
        return "NA";
      case GradeLevels.Grade3:
        return "Grade 3";
      case GradeLevels.Grade4:
        return "Grade 4";
      case GradeLevels.Grade5:
        return "Grade 5";
      case GradeLevels.Grade6:
        return "Grade 6";
      case GradeLevels.Grade7:
        return "Grade 7";
      case GradeLevels.Grade8:
        return "Grade 8";
      case GradeLevels.Grade9:
        return "Grade 9";
      case GradeLevels.Grade10:
        return "Grade 10";
      case GradeLevels.Grade11:
        return "Grade 11";
      case GradeLevels.Grade12:
        return "Grade 12";
      case GradeLevels.Elementary:
        return "Elementary";
      case GradeLevels.Middle:
        return "Middle";
      case GradeLevels.High:
        return "High School";
      default:
        return "";
    }
  }

  public static gradeCaseToShortString(grade: GradeLevels): string | undefined {
    switch (grade) {
      case GradeLevels.NA:
        return "NA";
      case GradeLevels.Grade3:
        return "G3";
      case GradeLevels.Grade4:
        return "G4";
      case GradeLevels.Grade5:
        return "G5";
      case GradeLevels.Grade6:
        return "G6";
      case GradeLevels.Grade7:
        return "G7";
      case GradeLevels.Grade8:
        return "G8";
      case GradeLevels.Grade9:
        return "G9";
      case GradeLevels.Grade10:
        return "G10";
      case GradeLevels.Grade11:
        return "G11";
      case GradeLevels.Grade12:
        return "G12";
      case GradeLevels.Elementary:
        return "E";
      case GradeLevels.Middle:
        return "M";
      case GradeLevels.High:
        return "HS";
      default:
        return undefined;
    }
  }

  public static gradeLevelToString(grades: GradeLevels): string | undefined {
    return this.gradeCaseToString(grades);
  }

  public static gradeLevelContains(
    haystack: GradeLevels,
    needle: GradeLevels
  ): boolean {
    return (haystack & needle) === needle;
  }

  public static stringToGradeLevel(gradeString: string): GradeLevels {
    return parseInt(gradeString, 10) || GradeLevels.NA;
  }

  public static gradeLevelAdd(grade: GradeLevels, gradeString: string) {
    // tslint:disable-next-line:no-bitwise
    return grade | this.stringToGradeLevel(gradeString);
  }
}
