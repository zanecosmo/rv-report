/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/models/customers.ts":
/*!*********************************!*\
  !*** ./src/models/customers.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Customers = void 0;
;
exports.Customers = {
    list: [],
    getCustomerList: function (vnode) {
        exports.Customers.list = window.electronAPI.getCustomerList();
    }
};


/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mithril_1 = __importDefault(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'mithril'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
const customer_view_1 = __webpack_require__(/*! ./views/customer-view */ "./src/views/customer-view.ts");
const mithrilElement = document.querySelector(".mithril-test");
if (mithrilElement)
    mithril_1.default.mount(mithrilElement, customer_view_1.CustomersView);
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
const buildForm = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("HERE");
    const data = yield window.electronAPI.getTableRow("towable");
    console.log(data);
    let reportForm = "";
    data.forEach((category) => {
        reportForm = reportForm.concat(createCategory(category));
    });
    if (tbody)
        tbody.innerHTML = reportForm;
});
// buildForm();


/***/ }),

/***/ "./src/views/customer-view.ts":
/*!************************************!*\
  !*** ./src/views/customer-view.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomersView = void 0;
const mithril_1 = __importDefault(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'mithril'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
const customers_1 = __webpack_require__(/*! ../models/customers */ "./src/models/customers.ts");
const CustomersView = {
    oninit: customers_1.Customers.getCustomerList,
    view: () => (0, mithril_1.default)(".customer-list", customers_1.Customers.list.map(customer => {
        return (0, mithril_1.default)(".customer", `${customer.firstName} ${customer.lastName}`);
    }))
};
exports.CustomersView = CustomersView;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/renderer.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFFBQVEsc0JBQXNCO0FBQzlCO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0NBQWtDLG1CQUFPLENBQUMsc0lBQVM7QUFDbkQsd0JBQXdCLG1CQUFPLENBQUMsMkRBQXVCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBLG9DQUFvQywyQkFBMkI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDJCQUEyQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7O0FDdEZhO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCLGtDQUFrQyxtQkFBTyxDQUFDLHNJQUFTO0FBQ25ELG9CQUFvQixtQkFBTyxDQUFDLHNEQUFxQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxzREFBc0Qsb0JBQW9CLEVBQUUsa0JBQWtCO0FBQzlGLEtBQUs7QUFDTDtBQUNBLHFCQUFxQjs7Ozs7OztVQ2RyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnYtcmVwb3J0LW5ldy8uL3NyYy9tb2RlbHMvY3VzdG9tZXJzLnRzIiwid2VicGFjazovL3J2LXJlcG9ydC1uZXcvLi9zcmMvcmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vcnYtcmVwb3J0LW5ldy8uL3NyYy92aWV3cy9jdXN0b21lci12aWV3LnRzIiwid2VicGFjazovL3J2LXJlcG9ydC1uZXcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcnYtcmVwb3J0LW5ldy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3J2LXJlcG9ydC1uZXcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3J2LXJlcG9ydC1uZXcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ3VzdG9tZXJzID0gdm9pZCAwO1xyXG47XHJcbmV4cG9ydHMuQ3VzdG9tZXJzID0ge1xyXG4gICAgbGlzdDogW10sXHJcbiAgICBnZXRDdXN0b21lckxpc3Q6IGZ1bmN0aW9uICh2bm9kZSkge1xyXG4gICAgICAgIGV4cG9ydHMuQ3VzdG9tZXJzLmxpc3QgPSB3aW5kb3cuZWxlY3Ryb25BUEkuZ2V0Q3VzdG9tZXJMaXN0KCk7XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgbWl0aHJpbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJtaXRocmlsXCIpKTtcclxuY29uc3QgY3VzdG9tZXJfdmlld18xID0gcmVxdWlyZShcIi4vdmlld3MvY3VzdG9tZXItdmlld1wiKTtcclxuY29uc3QgbWl0aHJpbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1pdGhyaWwtdGVzdFwiKTtcclxuaWYgKG1pdGhyaWxFbGVtZW50KVxyXG4gICAgbWl0aHJpbF8xLmRlZmF1bHQubW91bnQobWl0aHJpbEVsZW1lbnQsIGN1c3RvbWVyX3ZpZXdfMS5DdXN0b21lcnNWaWV3KTtcclxuY29uc3QgdGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGJvZHlcIik7XHJcbmNvbnN0IGNyZWF0ZUNhdGVnb3J5ID0gKGNhdGVnb3J5KSA9PiB7XHJcbiAgICBjb25zdCBzcGFjZXIgPSBgXHJcbiAgICA8dHI+XHJcbiAgICAgIDx0ZCBjbGFzcz1cInNwYWNlclwiIGNvbHNwYW49XCI0XCI+IDwvdGQ+XHJcbiAgICA8L3RyPlxyXG4gIGA7XHJcbiAgICBjb25zdCBjYXRlZ29yeU5hbWUgPSBgXHJcbiAgICA8dHI+XHJcbiAgICAgIDx0aCBjb2xzcGFuPVwiNFwiPiR7Y2F0ZWdvcnkuY2F0ZWdvcnlOYW1lfTwvdGQ+XHJcbiAgICA8L3RyPlxyXG4gIGA7XHJcbiAgICBjb25zdCBjYXRlZ29yeU5vdGVzID0gYFxyXG4gICAgPHRyPlxyXG4gICAgICA8dGQgY29sc3Bhbj1cIjRcIiBjbGFzcz1cImNhdGVnb3J5LW5vdGVzXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhLWRpdlwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIj5cclxuICAgICAgICAgIE5vdGVzOiAke2NhdGVnb3J5Lm5vdGVzfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3RkPlxyXG4gICAgPC90cj5cclxuICBgO1xyXG4gICAgbGV0IHJvd3MgPSBcIlwiO1xyXG4gICAgY2F0ZWdvcnkuZm9ybVJvd3MuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgcm93cyA9IHJvd3MuY29uY2F0KGBcclxuICAgIDx0cj5cclxuICAgICAgPHRkPiR7cm93LmxpbmVJdGVtfTwvdGQ+XHJcbiAgICAgIDx0ZCBjbGFzcz1cInBhc3MtZmFpbFwiPlxyXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImNoZWNrYm94XCI+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgICR7cm93LnBhc3MgPyBcImNoZWNrZWRcIiA6IFwiXCJ9IC8+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm92ZXJsYXlcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICA8L3RkPlxyXG4gICAgICA8dGQgY2xhc3M9XCJwYXNzLWZhaWxcIj5cclxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJjaGVja2JveFwiPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiICAke3Jvdy5mYWlsID8gXCJjaGVja2VkXCIgOiBcIlwifSAvPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJvdmVybGF5XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgPC90ZD5cclxuICAgICAgPHRkIGNsYXNzPVwibGluZS1pdGVtLW5vdGVzXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhLWRpdlwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIj5cclxuICAgICAgICAgICR7cm93Lm5vdGVzfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3RkPlxyXG4gICAgPC90cj5cclxuICAgIGApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gXCJcIi5jb25jYXQoc3BhY2VyLCBjYXRlZ29yeU5hbWUsIHJvd3MsIGNhdGVnb3J5Tm90ZXMpO1xyXG59O1xyXG5jb25zdCBidWlsZEZvcm0gPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiSEVSRVwiKTtcclxuICAgIGNvbnN0IGRhdGEgPSB5aWVsZCB3aW5kb3cuZWxlY3Ryb25BUEkuZ2V0VGFibGVSb3coXCJ0b3dhYmxlXCIpO1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICBsZXQgcmVwb3J0Rm9ybSA9IFwiXCI7XHJcbiAgICBkYXRhLmZvckVhY2goKGNhdGVnb3J5KSA9PiB7XHJcbiAgICAgICAgcmVwb3J0Rm9ybSA9IHJlcG9ydEZvcm0uY29uY2F0KGNyZWF0ZUNhdGVnb3J5KGNhdGVnb3J5KSk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0Ym9keSlcclxuICAgICAgICB0Ym9keS5pbm5lckhUTUwgPSByZXBvcnRGb3JtO1xyXG59KTtcclxuLy8gYnVpbGRGb3JtKCk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ3VzdG9tZXJzVmlldyA9IHZvaWQgMDtcclxuY29uc3QgbWl0aHJpbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJtaXRocmlsXCIpKTtcclxuY29uc3QgY3VzdG9tZXJzXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL2N1c3RvbWVyc1wiKTtcclxuY29uc3QgQ3VzdG9tZXJzVmlldyA9IHtcclxuICAgIG9uaW5pdDogY3VzdG9tZXJzXzEuQ3VzdG9tZXJzLmdldEN1c3RvbWVyTGlzdCxcclxuICAgIHZpZXc6ICgpID0+ICgwLCBtaXRocmlsXzEuZGVmYXVsdCkoXCIuY3VzdG9tZXItbGlzdFwiLCBjdXN0b21lcnNfMS5DdXN0b21lcnMubGlzdC5tYXAoY3VzdG9tZXIgPT4ge1xyXG4gICAgICAgIHJldHVybiAoMCwgbWl0aHJpbF8xLmRlZmF1bHQpKFwiLmN1c3RvbWVyXCIsIGAke2N1c3RvbWVyLmZpcnN0TmFtZX0gJHtjdXN0b21lci5sYXN0TmFtZX1gKTtcclxuICAgIH0pKVxyXG59O1xyXG5leHBvcnRzLkN1c3RvbWVyc1ZpZXcgPSBDdXN0b21lcnNWaWV3O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcmVuZGVyZXIudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=