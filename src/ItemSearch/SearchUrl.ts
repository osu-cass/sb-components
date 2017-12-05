import { GradeLevel, GradeLevels } from "../GradeLevels/GradeLevels";
import { FilterType } from "../Filter/AdvancedFilterModel";
import { parseQueryString } from "../ApiModel";
import { SearchAPIParamsModel } from "./ItemSearchModels";

export class SearchUrl {
  public static encodeQuery(search: SearchAPIParamsModel) {
    let pairs: string[] = [];
    if (search.claims && search.claims.length > 0) {
      pairs.push(this.encodeFilter(FilterType.Claim, search.claims));
    }
    if (search.interactionTypes && search.interactionTypes.length > 0) {
      pairs.push(
        this.encodeFilter(FilterType.InteractionType, search.interactionTypes)
      );
    }
    if (search.subjects && search.subjects.length > 0) {
      pairs.push(this.encodeFilter(FilterType.Subject, search.subjects));
    }
    if (search.gradeLevels) {
      pairs.push(FilterType.Grade + "=" + search.gradeLevels);
    }
    if (search.targets && search.targets.length > 0) {
      pairs.push(this.encodeFilter(FilterType.Target, search.targets));
    }
    if (search.performanceOnly) {
      pairs.push(FilterType.Performance + "=true");
    }
    if (search.catOnly) {
      pairs.push(FilterType.CAT + "=true");
    }

    return pairs.length > 0 ? "?" + pairs.join("&") : "";
  }

  public static encodeFilter(
    type: FilterType,
    options: string[] | number[]
  ): string {
    return type.toString() + "=" + options.join(",");
  }

  public static decodeSearch(location: string): SearchAPIParamsModel {
    const queryObject = parseQueryString(location);

    const gradeOptions = queryObject[FilterType.Grade];
    const grade = gradeOptions
      ? parseInt(gradeOptions[0], 10) || GradeLevels.NA
      : undefined;

    const subjects = queryObject[FilterType.Subject];
    const claims = queryObject[FilterType.Claim];
    const interactionTypes = queryObject[FilterType.InteractionType];
    const performanceOnly = this.optionFlag(
      queryObject[FilterType.InteractionType]
    );
    const catOnly = this.optionFlag(queryObject[FilterType.CAT]);
    const targetOptions = queryObject[FilterType.Target];
    const targets = targetOptions ? targetOptions.map(t => +t) : undefined;

    const searchModel: SearchAPIParamsModel = {
      gradeLevels: grade,
      subjects: subjects,
      claims: claims,
      interactionTypes: interactionTypes,
      performanceOnly: performanceOnly,
      catOnly: catOnly,
      targets: targets
    };

    return searchModel;
  }

  public static optionFlag(options?: string[]): boolean | undefined {
    return options ? options[0] === "true" : undefined;
  }
}