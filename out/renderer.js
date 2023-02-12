"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tbody = document.querySelector("tbody");
const createCategory = (category) => {
    const spacer = `
    <tr>
      <td class="spacer" colspan="4"> </td>
    </tr>
  `;
    const categoryName = `
    <tr>
      <th colspan="4">${category.categoryName}</td>
    </tr>
  `;
    const categoryNotes = `
    <tr>
      <td colspan="4" class="category-notes">
        <div class="textarea-div" contenteditable="true">
          Notes: ${category.notes}
        </div>
      </td>
    </tr>
  `;
    let rows = "";
    category.formRows.forEach((row) => {
        rows = rows.concat(`
    <tr>
      <td>${row.lineItem}</td>
      <td class="pass-fail">
        <label class="checkbox">
          <input type="checkbox"  ${row.pass ? "checked" : ""} />
          <span class="overlay">
            <div class="icon-container">
              <div class="icon"></div>
            </div>
          <span>
        </label>
      </td>
      <td class="pass-fail">
        <label class="checkbox">
          <input type="checkbox"  ${row.fail ? "checked" : ""} />
          <span class="overlay">
            <div class="icon-container">
              <div class="icon"></div>
            </div>
          <span>
        </label>
      </td>
      <td class="line-item-notes">
        <div class="textarea-div" contenteditable="true">
          ${row.notes}
        </div>
      </td>
    </tr>
    `);
    });
    return "".concat(spacer, categoryName, rows, categoryNotes);
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("HERE");
    const data = yield window.electronAPI.getTableRow("towable");
    console.log(data);
    let reportForm = "";
    data.forEach((category) => {
        reportForm = reportForm.concat(createCategory(category));
    });
    if (tbody)
        tbody.innerHTML = reportForm;
}))();
