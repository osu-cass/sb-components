import { ItemViewContainerProps } from "../../src/Pdf/ItemViewContainer";
import { ItemGroupModel, PdfViewType } from "../../src/Pdf/PdfModels";
import { AboutItemMockModel } from "../AboutItem/mocks";

export const singleQuestion: ItemGroupModel = {
    questions: [
        {
            id: "187-1234",
            view: {
                id: "187-1234",
                html: "<b>Solve for x</b><p><i>x</i> + 5 = 10</p>",
                captured: true,
                type: PdfViewType.html
            },
            data: AboutItemMockModel,
            questionNumber: 1
        }
    ]
}