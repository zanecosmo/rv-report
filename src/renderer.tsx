import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
// import { FormCategory, FormRow } from "./types";
// import m from "mithril";
// import { CustomerViewComponent } from "./views/customer-view";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
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
