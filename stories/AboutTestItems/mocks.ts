import { AboutTestItemContainerProps } from "../../src/AboutTestItems/AboutTestItemsContainer";
import { AboutTestItemsModel } from "../../src/AboutTestItems/AboutTestItemsModels";
import * as H from 'history';

export const AboutTestItemsMockProps: AboutTestItemContainerProps = {
    aboutClient: (params: {interactionTypeCode: "12345"}) => {return {} as Promise<AboutTestItemsModel>},
    match: {
        params: {},
        isExact: false,
        path: "/path/to/destination",
        url: "/url/to/resource"      
    },
    location: {
        pathname: "Pathname",
        search: "Search",
        state: "LocationState",
        hash: "Hash",
        key: "LocationKey"
    },
    history: {} as H.History,
    staticContext: null
}