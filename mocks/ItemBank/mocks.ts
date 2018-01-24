import * as ItemBank from "src/ItemBank/ItemBank"

export const RevisionMockModelOne: ItemBank.RevisionModel = {
    author: "Troy Barnes",
    date: new Date(),
    commitMessage: "Added functionality to the website",
    commitHash: "ab65jg"
}

export const RevisionMockModelTwo: ItemBank.RevisionModel = {
    author: "Pierce Hawthorne",
    date: new Date(),
    commitMessage: "Fixed component",
    commitHash: "h4lso6"
}

export const RevisionMockModelThree: ItemBank.RevisionModel = {
    author: "Annie Edison",
    date: new Date(),
    commitMessage: "Changed one of the pages",
    commitHash: "k5ls58"
}

export const ItemBankPropsMockModel: ItemBank.ItemBankProps = {
    revisions: [
        RevisionMockModelOne,
        RevisionMockModelTwo,
        RevisionMockModelThree
    ]
}