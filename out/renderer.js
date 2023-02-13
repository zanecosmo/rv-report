"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const client_1 = require("react-dom/client");
const app_1 = require("./app");
// import { FormCategory, FormRow } from "./types";
// import m from "mithril";
// import { CustomerViewComponent } from "./views/customer-view";
const root = (0, client_1.createRoot)(document.getElementById("root"));
root.render(react_1.default.createElement(react_1.StrictMode, null,
    react_1.default.createElement(app_1.App, null)));
// export const AppRenderer: FC = (): JSX.Element => {
//   return (
//     <div>
//     </div>
//   )
// };
// const mithrilElement: Element | null = document.querySelector(".mithril-test");
// if (mithrilElement) m.mount(mithrilElement, CustomerViewComponent);
// const tbody = document.querySelector("tbody");
// const createCategory = (category: FormCategory): string => {
//   const spacer = `
//     <tr>
//       <td class="spacer" colspan="4"> </td>
//     </tr>
//   `;
//   const categoryName = `
//     <tr>
//       <th colspan="4">${category.categoryName}</td>
//     </tr>
//   `;
//   const categoryNotes = `
//     <tr>
//       <td colspan="4" class="category-notes">
//         <div class="textarea-div" contenteditable="true">
//           Notes: ${category.notes}
//         </div>
//       </td>
//     </tr>
//   `;
//   let rows = "";
//   category.formRows.forEach((row: FormRow) => {
//     rows = rows.concat(`
//     <tr>
//       <td>${row.lineItem}</td>
//       <td class="pass-fail">
//         <label class="checkbox">
//           <input type="checkbox"  ${row.pass ? "checked" : ""} />
//           <span class="overlay">
//             <div class="icon-container">
//               <div class="icon"></div>
//             </div>
//           <span>
//         </label>
//       </td>
//       <td class="pass-fail">
//         <label class="checkbox">
//           <input type="checkbox"  ${row.fail ? "checked" : ""} />
//           <span class="overlay">
//             <div class="icon-container">
//               <div class="icon"></div>
//             </div>
//           <span>
//         </label>
//       </td>
//       <td class="line-item-notes">
//         <div class="textarea-div" contenteditable="true">
//           ${row.notes}
//         </div>
//       </td>
//     </tr>
//     `)
//   });
//   return "".concat(spacer, categoryName, rows, categoryNotes);
// };
// const buildForm = async () => {
//   console.log("HERE");
//   const data = await window.electronAPI.getTableRow("towable");
//   console.log(data);
//   let reportForm = "";
//   data.forEach((category: FormCategory) => {
//     reportForm = reportForm.concat(createCategory(category));
//   });
//   if (tbody) tbody.innerHTML = reportForm;
// };
// buildForm();
