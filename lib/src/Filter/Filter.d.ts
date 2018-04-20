import { SearchFilterStringTypes, ItemCardModel, ClaimModel, ItemsSearchModel, SearchAPIParamsModel, SubjectModel, TargetModel, GradeLevels, FilterCategoryModel, FilterType, InteractionTypeModel } from "@src/index";
export declare class Filter {
    /**
     * Returns a list of selected codes for the given FilterType and Categories
     * @param  {FilterType} key
     * @param  {FilterCategoryModel[]} filterModels
     */
    static getSelectedCodes(key: FilterType, filterModels: FilterCategoryModel[]): string[] | undefined;
    /**
     * Reduces Filter Models for grade selections
     * Exclusive OR to flip the bits for selected grades
     * @param  {FilterCategoryModel[]} filterModels
     */
    static getSelectedGrade(filterModels: FilterCategoryModel[]): GradeLevels | undefined;
    /**
     * Gets selected target hash values
     * @param  {FilterCategoryModel[]} filterModels
     */
    static getSelectedTargets(filterModels: FilterCategoryModel[]): string[] | undefined;
    static filterStringTypes<T extends SearchFilterStringTypes>(filterOptions: T[], codes?: string[]): T[];
    /**
     * Filters targets with the given codes
     * @param  {TargetModel[]} targets
     * @param  {number[]} targetCodes
     */
    static filterTargets(targets: TargetModel[], targetCodes: string[]): TargetModel[];
    /** Returns the list of related claims
     * @param  {SubjectModel[]} subjects
     */
    static getSubjectClaimCodes(subjects: SubjectModel[]): string[];
    /**
     * Returns the list of related interaction types
     * @param  {SubjectModel[]} subjects
     */
    static getSubjectInteractionTypes(subjects: SubjectModel[]): string[];
    /**
     * Returns the list of related target codes
     * @param  {ClaimModel[]} claims
     */
    static getClaimTargetCodes(claims: ClaimModel[]): string[];
    /**
     * Gets the list of current claims from dependent subjects
     * @param {ClaimModel[]} claims
     * @param {SubjectModel[]} filteredSubjects
     */
    static getCurrentClaimsFilter(claims: ClaimModel[], filteredSubjects: SubjectModel[]): ClaimModel[] | undefined;
    /**
     * Gets the list of current interaction types from dependent subjects
     * @param  {InteractionTypeModel[]} interactionTypes
     * @param  {SubjectModel[]} filteredSubjects
     */
    static getCurrentInteractionTypes(interactionTypes: InteractionTypeModel[], filteredSubjects: SubjectModel[]): InteractionTypeModel[] | undefined;
    /**
     * Gets the list of current targets from dependent subjects and claims
     * @param  {ItemsSearchModel} model
     * @param  {SearchAPIParamsModel} searchApiModel
     */
    static getCurrentTargets(targets: TargetModel[], searchApiModel: SearchAPIParamsModel, filteredClaims: ClaimModel[]): TargetModel[] | undefined;
    /**
     * Returns Filter Categories with the updated dependent lists with selected values
     * Dependent list Target, Claim, and Interaction Types
     * @param  {ItemsSearchModel} model
     * @param  {FilterCategoryModel[]} filters
     * @param  {SearchAPIParamsModel} searchAPI
     */
    static getUpdatedSearchFilters<T extends FilterCategoryModel>(model: ItemsSearchModel, filters: T[], searchAPI: SearchAPIParamsModel): T[];
    /**
     * Updates the options in the `filter` based on the options in `basedOn`. This happens in place.
     *
     * @param {T extends FilterCategoryModel} filter
     * @param {FilterCategoryModel} basedOn
     */
    static updateSingleFilter<T extends FilterCategoryModel>(filter: T, basedOn: FilterCategoryModel): T;
    static hideFiltersBasedOnSearchParams(filterList: FilterCategoryModel[], searchParams: SearchAPIParamsModel): FilterCategoryModel[];
    static hideTargetOptions<T extends FilterCategoryModel>(filterCategories: T[], itemCards: ItemCardModel[]): T[];
}
