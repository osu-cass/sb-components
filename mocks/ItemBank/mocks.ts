import * as ItemBank from "src/ItemBank/ItemBank";

const testDate = new Date("11/11/2015");

export const RevisionMockModelOne: ItemBank.RevisionModel = {
  author: "Troy Barnes",
  date: testDate,
  commitMessage: "Added functionality to the website",
  commitHash: "ab65jg"
};

export const RevisionMockModelTwo: ItemBank.RevisionModel = {
  author: "Pierce Hawthorne",
  date: testDate,
  commitMessage:
    "I want to see what happens when there is a much longer commit message than all of the rest",
  commitHash: "h4lso6"
};

export const RevisionMockModelThree: ItemBank.RevisionModel = {
  author: "Annie Edison",
  date: testDate,
  commitMessage: "Changed one of the pages",
  commitHash: "k5ls58"
};

export const ItemBankPropsMockModel: ItemBank.ItemBankProps = {
  revisions: [
    RevisionMockModelOne,
    RevisionMockModelTwo,
    RevisionMockModelThree
  ]
};
