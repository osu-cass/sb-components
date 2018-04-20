import { AboutTestItemsModel, AboutTestItemsParams, AboutTestSearchParams } from "@src/index";
import { match } from "react-router";
export declare const defaultAboutTestItemsModel: AboutTestItemsModel;
export declare const mockAboutClientSuccess: (params?: AboutTestSearchParams | undefined) => Promise<AboutTestItemsModel>;
export declare const mockAboutRejectClient: (params?: AboutTestSearchParams | undefined) => Promise<AboutTestItemsModel>;
export declare const mockAboutLoading: (params?: AboutTestSearchParams | undefined) => Promise<AboutTestItemsModel>;
export declare const aboutTestPath = "/:itemType?";
export declare const aboutTestMatch: match<AboutTestItemsParams>;
export declare const aboutTestBadItem: match<AboutTestItemsParams>;
