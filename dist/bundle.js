/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/renderer.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0Esb0NBQW9DLDJCQUEyQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsMkJBQTJCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7O1VFN0VEO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydi1yZXBvcnQtbmV3Ly4vc3JjL3JlbmRlcmVyLnRzIiwid2VicGFjazovL3J2LXJlcG9ydC1uZXcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ydi1yZXBvcnQtbmV3L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9ydi1yZXBvcnQtbmV3L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRib2R5XCIpO1xyXG5jb25zdCBjcmVhdGVDYXRlZ29yeSA9IChjYXRlZ29yeSkgPT4ge1xyXG4gICAgY29uc3Qgc3BhY2VyID0gYFxyXG4gICAgPHRyPlxyXG4gICAgICA8dGQgY2xhc3M9XCJzcGFjZXJcIiBjb2xzcGFuPVwiNFwiPiA8L3RkPlxyXG4gICAgPC90cj5cclxuICBgO1xyXG4gICAgY29uc3QgY2F0ZWdvcnlOYW1lID0gYFxyXG4gICAgPHRyPlxyXG4gICAgICA8dGggY29sc3Bhbj1cIjRcIj4ke2NhdGVnb3J5LmNhdGVnb3J5TmFtZX08L3RkPlxyXG4gICAgPC90cj5cclxuICBgO1xyXG4gICAgY29uc3QgY2F0ZWdvcnlOb3RlcyA9IGBcclxuICAgIDx0cj5cclxuICAgICAgPHRkIGNvbHNwYW49XCI0XCIgY2xhc3M9XCJjYXRlZ29yeS1ub3Rlc1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYS1kaXZcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+XHJcbiAgICAgICAgICBOb3RlczogJHtjYXRlZ29yeS5ub3Rlc31cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC90ZD5cclxuICAgIDwvdHI+XHJcbiAgYDtcclxuICAgIGxldCByb3dzID0gXCJcIjtcclxuICAgIGNhdGVnb3J5LmZvcm1Sb3dzLmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICAgIHJvd3MgPSByb3dzLmNvbmNhdChgXHJcbiAgICA8dHI+XHJcbiAgICAgIDx0ZD4ke3Jvdy5saW5lSXRlbX08L3RkPlxyXG4gICAgICA8dGQgY2xhc3M9XCJwYXNzLWZhaWxcIj5cclxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJjaGVja2JveFwiPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiICAke3Jvdy5wYXNzID8gXCJjaGVja2VkXCIgOiBcIlwifSAvPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJvdmVybGF5XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgPC90ZD5cclxuICAgICAgPHRkIGNsYXNzPVwicGFzcy1mYWlsXCI+XHJcbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiY2hlY2tib3hcIj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAgJHtyb3cuZmFpbCA/IFwiY2hlY2tlZFwiIDogXCJcIn0gLz5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwib3ZlcmxheVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDwvdGQ+XHJcbiAgICAgIDx0ZCBjbGFzcz1cImxpbmUtaXRlbS1ub3Rlc1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYS1kaXZcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+XHJcbiAgICAgICAgICAke3Jvdy5ub3Rlc31cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC90ZD5cclxuICAgIDwvdHI+XHJcbiAgICBgKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KHNwYWNlciwgY2F0ZWdvcnlOYW1lLCByb3dzLCBjYXRlZ29yeU5vdGVzKTtcclxufTtcclxuKCgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJIRVJFXCIpO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHdpbmRvdy5lbGVjdHJvbkFQSS5nZXRUYWJsZVJvdyhcInRvd2FibGVcIik7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIGxldCByZXBvcnRGb3JtID0gXCJcIjtcclxuICAgIGRhdGEuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcclxuICAgICAgICByZXBvcnRGb3JtID0gcmVwb3J0Rm9ybS5jb25jYXQoY3JlYXRlQ2F0ZWdvcnkoY2F0ZWdvcnkpKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHRib2R5KVxyXG4gICAgICAgIHRib2R5LmlubmVySFRNTCA9IHJlcG9ydEZvcm07XHJcbn0pKSgpO1xyXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL3JlbmRlcmVyLnRzXCJdKDAsIF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9