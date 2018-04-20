import { FilterType, SearchAPIParamsModel } from "@src/index";
export interface ExpressQuery {
    [param: string]: string;
}
export declare class SearchUrl {
    /**
     * Encode the search params object into a query string to be set in the url
     *
     * @static
     * @param {SearchAPIParamsModel} search the search params object to be encoded
     * @returns {string}
     */
    static encodeQuery(search: SearchAPIParamsModel): string;
    static encodeFilter(filterType: FilterType, options: string[] | number[]): string;
    static decodeSearch(location: string): SearchAPIParamsModel;
    private static getQueryParam(query, param);
    private static getBoolQueryParam(query, param);
    static decodeExpressQuery(query: ExpressQuery): SearchAPIParamsModel;
    static optionFlag(options?: string[]): boolean | undefined;
}
