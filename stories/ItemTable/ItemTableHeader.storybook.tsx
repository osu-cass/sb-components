// import * as React from "react";
// import { storiesOf } from "@storybook/react";
// import { CenterDecorator } from "../CenterDecorator";
// import { itemTableProps } from "mocks/ItemTable/mocks";
// import {
//   headerColumns,
//   HeaderSortModel,
//   HeaderTable,
//   SortColumnModel,
//   SortDirection,
//   HeaderTableProps,
//   ColumnGroup
// } from "src/index";

// const sorts: Array<HeaderSortModel> = [
//   {
//     col: headerColumns[0],
//     direction: SortDirection.Ascending,
//     resetSortCount: 1
//   }
// ];

// const props: HeaderTableProps = {
//   columns: headerColumns,
//   onHeaderClick: (header: ColumnGroup) =>
//     console.log(JSON.stringify(header)),
//   sorts,
//   isLinkTable: false
// };

// storiesOf("Item Table Header", module)
//   .addDecorator(CenterDecorator)
//   .add("AP_ScoreGuide tabs", () => (
//     <div>
//       <table className="item-table">
//         <HeaderTable {...props} />
//       </table>
//     </div>
//   ));
