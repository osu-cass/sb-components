import { Resource, AboutItemModel, AboutTestItemsModel, InteractionTypeModel } from '../../src';
import { completeItemCard } from '../ItemCard/mocks';
import { action } from '@storybook/addon-actions';

const interactionTypes: InteractionTypeModel[] = [
    {
        code: "EBSR",
        label: "Evidence-Based Selected Response",
        description: "<p>This item presents students with a two-part question, parts A and B. \n              Students select a correct response from four options in Part A and then identify textual support for that response in Part B.</p>",
        order: 1
    },
    {
        code: "EQ",
        label: "Equation",
        description: "<p>The Equation item type has one or more text boxes for a response area and a key pad containing mathematical characters. \n              The student enters an equation or numerical answer into the text box using the key pad or keyboard.</p>",
        order: 2
    },
]

const aboutItemModel: AboutItemModel = {
    depthOfKnowledge: "",
    targetDescription: "",
    commonCoreStandardsDescription: "",
    rubrics: [],
    itemCardViewModel: completeItemCard,
    educationalDifficulty: "",
    evidenceStatement: ""
}

export const defaultAboutTestItemsModel: AboutTestItemsModel = {
    itemUrl: "  ",
    interactionTypes: interactionTypes,
    aboutThisItemViewModel: aboutItemModel,
    selectedInteractionTypeCode: "EQ"
}

async function mockPromise(params?: { interactionTypeCode: string }) {
    return new Promise<AboutTestItemsModel>((resolve, reject) => {
        const aboutItems = { ...defaultAboutTestItemsModel };
        if (params) {
            aboutItems.selectedInteractionTypeCode = params.interactionTypeCode;
        }
        console.log('API about test items', params);
        resolve(aboutItems);
    });
}

async function mockPromiseReject(params?: { interactionTypeCode: string }) {
    return new Promise<AboutTestItemsModel>((resolve, reject) => {
        reject('Rejected');
    });
}


async function mockPromiseLoading(params?: { interactionTypeCode: string }) {
    return new Promise<AboutTestItemsModel>((resolve, reject) => {
    });
}

export const mockAboutTestClient = (params?: { interactionTypeCode: string }) =>
    mockPromise(params);


export const mockAboutTestClientReject = (params?: { interactionTypeCode: string }) =>
    mockPromiseReject(params);


export const mockAboutTestClientLoading = (params?: { interactionTypeCode: string }) =>
    mockPromiseLoading(params);
