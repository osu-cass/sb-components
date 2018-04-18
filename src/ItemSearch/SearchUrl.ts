import {
  GradeLevel,
  GradeLevels,
  FilterType,
  parseQueryString,
  SearchAPIParamsModel
} from "@src/index";

export interface ExpressQuery {
  [param: string]: string;
}

// tslint:disable-next-line:no-stateless-class no-unnecessary-class
export class SearchUrl {
  /**
   * Encode the search params object into a query string to be set in the url
   *
   * @static
   * @param {SearchAPIParamsModel} search the search params object to be encoded
   * @returns {string}
   */
  public static encodeQuery(search: SearchAPIParamsModel) {
    const pairs: string[] = [];
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
      pairs.push(`${FilterType.Grade}=${search.gradeLevels}`);
    }
    if (search.targets && search.targets.length > 0) {
      pairs.push(this.encodeFilter(FilterType.Target, search.targets));
    }
    if (search.performanceOnly) {
      pairs.push(`${FilterType.Performance}=true`);
    }
    if (search.catOnly) {
      pairs.push(`${FilterType.CAT}=true`);
    }
    if (search.calculator !== undefined) {
      pairs.push(`${FilterType.Calculator}=${search.calculator}`);
    }

    return pairs.length > 0 ? `?${pairs.join("&")}` : "";
  }

  public static encodeFilter(
    filterType: FilterType,
    options: string[] | number[]
  ): string {
    return `${filterType.toString()}=${options.join(",")}`;
  }

  public static decodeSearch(location: string): SearchAPIParamsModel {
    const queryObject = parseQueryString(location);

    const gradeOptions = queryObject[FilterType.Grade];
    const gradeLevels = gradeOptions
      ? parseInt(gradeOptions[0], 10) || GradeLevels.NA
      : undefined;

    const subjects = queryObject[FilterType.Subject];
    const claims = queryObject[FilterType.Claim];
    const interactionTypes = queryObject[FilterType.InteractionType];
    const performanceOnly = this.optionFlag(
      queryObject[FilterType.Performance]
    );
    const catOnly = this.optionFlag(queryObject[FilterType.CAT]);
    const targetOptions = queryObject[FilterType.Target];
    const targets = targetOptions ? targetOptions.map(t => t) : undefined;
    const calculator = this.optionFlag(queryObject[FilterType.Calculator]);

    return {
      calculator,
      subjects,
      claims,
      interactionTypes,
      performanceOnly,
      catOnly,
      targets,
      gradeLevels
    };
  }

  private static getQueryParam(
    query: ExpressQuery,
    param: FilterType
  ): string[] | undefined {
    return query[param] ? query[param].split(",") : undefined;
  }

  private static getBoolQueryParam(
    query: ExpressQuery,
    param: FilterType
  ): boolean | undefined {
    return query[param] ? query[param].toLowerCase() === "true" : undefined;
  }

  public static decodeExpressQuery(query: ExpressQuery): SearchAPIParamsModel {
    const grades = this.getQueryParam(query, FilterType.Grade);
    let gradesEnum: GradeLevels | undefined;
    if (grades) {
      grades.forEach(g => {
        gradesEnum = GradeLevels.NA;
        gradesEnum = GradeLevel.gradeLevelAdd(gradesEnum, g);
      });
    }
    const subjects = this.getQueryParam(query, FilterType.Subject);
    const claims = this.getQueryParam(query, FilterType.Claim);
    const interactionTypes = this.getQueryParam(
      query,
      FilterType.InteractionType
    );
    const targetsStrings = this.getQueryParam(query, FilterType.Target);
    const targets = targetsStrings ? targetsStrings.map(t => t) : undefined;
    const performanceOnly = this.getBoolQueryParam(
      query,
      FilterType.Performance
    );
    const catOnly = this.getBoolQueryParam(query, FilterType.CAT);
    const calculator = this.getBoolQueryParam(query, FilterType.Calculator);

    return {
      subjects,
      claims,
      calculator,
      interactionTypes,
      performanceOnly,
      catOnly,
      targets,
      gradeLevels: gradesEnum
    };
  }

  public static optionFlag(options?: string[]): boolean | undefined {
    return options && options.length > 0 ? options[0] === "true" : undefined;
  }
}
