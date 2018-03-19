import { RevisionModel } from "src/Revisions/Revision";
import * as moment from "moment";

const testDate = moment("2018-02-08 24:30:00.000").format();

export const mockRevisions: RevisionModel[] = [
  {
    author: "Troy Barnes",
    date: testDate,
    commitMessage: "Added functionality to the website",
    commitHash: "ab65jg"
  },
  {
    author: "Pierce Hawthorne",
    date: testDate,
    commitMessage:
      "I want to see what happens when there is a much longer commit message than all of the rest",
    commitHash: "h4lso6"
  },
  {
    author: "Annie Edison",
    date: testDate,
    commitMessage: "Changed one of the pages",
    commitHash: "k5ls58"
  }
];
