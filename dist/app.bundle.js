/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Node-class.js":
/*!***************************!*\
  !*** ./src/Node-class.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Node: () => (/* binding */ Node)
/* harmony export */ });
class Node {
    constructor(value) {
        this.data = value;

        this.right = null;
        this.left = null;
    }
}



/***/ }),

/***/ "./src/pretty.js":
/*!***********************!*\
  !*** ./src/pretty.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prettyPrint: () => (/* binding */ prettyPrint)
/* harmony export */ });
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return 0;
    }

    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};




/***/ }),

/***/ "./src/tree.js":
/*!*********************!*\
  !*** ./src/tree.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tree: () => (/* binding */ Tree)
/* harmony export */ });
/* harmony import */ var _Node_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node-class */ "./src/Node-class.js");



class Tree {
    constructor() {
    }


    buildTree(arr, start, end) {
        if (start > end) return null;

        // remove Duplicates
        arr = arr.filter((item, index) => arr.indexOf(item) == index)

        // sort array 
        arr.sort((a, b) => { return a - b })


        let mid = Math.floor((start + end) / 2)

        let node = new _Node_class__WEBPACK_IMPORTED_MODULE_0__.Node(arr[mid])

        node.right = this.buildTree(arr, mid + 1, end)
        node.left = this.buildTree(arr, start, mid - 1)

        return node

    }

    insert(node, value) {
        node = this.#insertRec(node, value)
    }

    #insertRec(node, value) {
        if (node == null) {

            return new _Node_class__WEBPACK_IMPORTED_MODULE_0__.Node(value)
        }

        if (value < node.data) {
            node.left = this.#insertRec(node.left, value)
        } else if (value > node.data) {
            node.right = this.#insertRec(node.right, value)
        }
        return node
    }

    delete(node, value) {
        node = this.#deleteRec(node, value)
    }

    #deleteRec(node, value) {


        if (node.data === value) {
            if (node.left ){
                let temp = node.left;
                node = temp;
                return node
            }
            else if (node.right){
                let temp = node.right;
                node = temp;
                return node
            }
            else {
                node = null
                return node
            }
        }

        if (value < node.data) {
            node.left = this.#deleteRec(node.left, value)
        }
        else if (value > node.data) {
            node.right = this.#deleteRec(node.right, value)
        }


        return node
    }

    find(node,value){
        console.log(this.#findRec(node,value))
    }

    #findRec(node ,value){
        if (!node ){
            return "Not found"
        }
        
        if (node.data == value){
            return node
        }

        if (value < node.data){
            return node.left = this.#findRec(node.left,value)
        }
        else if(value > node.data){
            return node.right = this.#findRec(node.right,value)
        }
    }

    levelOrder(node , cb){
        if (node === null) return;
      

    }

}



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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree */ "./src/tree.js");
/* harmony import */ var _pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pretty */ "./src/pretty.js");






let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let t = new _tree__WEBPACK_IMPORTED_MODULE_0__.Tree()
let n = t.buildTree(arr, 0, arr.length - 1)


;(0,_pretty__WEBPACK_IMPORTED_MODULE_1__.prettyPrint)(n)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLE9BQU8sRUFBRSx5QkFBeUI7QUFDckU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxrQ0FBa0MsT0FBTyxFQUFFLHlCQUF5QjtBQUNwRTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWG9DOztBQUVwQztBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixjQUFjOzs7QUFHM0M7O0FBRUEsdUJBQXVCLDZDQUFJOztBQUUzQjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1Qiw2Q0FBSTtBQUMzQjs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7VUM3R0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONkI7QUFDUzs7Ozs7QUFLdEM7O0FBRUEsWUFBWSx1Q0FBSTtBQUNoQjs7O0FBR0EscURBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9Ob2RlLWNsYXNzLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3ByZXR0eS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy90cmVlLmpzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTm9kZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5yaWdodCA9IG51bGw7XG4gICAgICAgIHRoaXMubGVmdCA9IG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQge05vZGV9IiwiY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmIChub2RlLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLCBmYWxzZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XG4gICAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgICAgICBwcmV0dHlQcmludChub2RlLmxlZnQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcbiAgICB9XG59O1xuXG5cbmV4cG9ydCB7cHJldHR5UHJpbnR9IiwiXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSBcIi4vTm9kZS1jbGFzc1wiO1xuXG5jbGFzcyBUcmVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cblxuICAgIGJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAvLyByZW1vdmUgRHVwbGljYXRlc1xuICAgICAgICBhcnIgPSBhcnIuZmlsdGVyKChpdGVtLCBpbmRleCkgPT4gYXJyLmluZGV4T2YoaXRlbSkgPT0gaW5kZXgpXG5cbiAgICAgICAgLy8gc29ydCBhcnJheSBcbiAgICAgICAgYXJyLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGEgLSBiIH0pXG5cblxuICAgICAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMilcblxuICAgICAgICBsZXQgbm9kZSA9IG5ldyBOb2RlKGFyclttaWRdKVxuXG4gICAgICAgIG5vZGUucmlnaHQgPSB0aGlzLmJ1aWxkVHJlZShhcnIsIG1pZCArIDEsIGVuZClcbiAgICAgICAgbm9kZS5sZWZ0ID0gdGhpcy5idWlsZFRyZWUoYXJyLCBzdGFydCwgbWlkIC0gMSlcblxuICAgICAgICByZXR1cm4gbm9kZVxuXG4gICAgfVxuXG4gICAgaW5zZXJ0KG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIG5vZGUgPSB0aGlzLiNpbnNlcnRSZWMobm9kZSwgdmFsdWUpXG4gICAgfVxuXG4gICAgI2luc2VydFJlYyhub2RlLCB2YWx1ZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTm9kZSh2YWx1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA8IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgbm9kZS5sZWZ0ID0gdGhpcy4jaW5zZXJ0UmVjKG5vZGUubGVmdCwgdmFsdWUpXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiBub2RlLmRhdGEpIHtcbiAgICAgICAgICAgIG5vZGUucmlnaHQgPSB0aGlzLiNpbnNlcnRSZWMobm9kZS5yaWdodCwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG5cbiAgICBkZWxldGUobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgbm9kZSA9IHRoaXMuI2RlbGV0ZVJlYyhub2RlLCB2YWx1ZSlcbiAgICB9XG5cbiAgICAjZGVsZXRlUmVjKG5vZGUsIHZhbHVlKSB7XG5cblxuICAgICAgICBpZiAobm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUubGVmdCApe1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbm9kZS5sZWZ0O1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0ZW1wO1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub2RlLnJpZ2h0KXtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IG5vZGUucmlnaHQ7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBudWxsXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA8IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgbm9kZS5sZWZ0ID0gdGhpcy4jZGVsZXRlUmVjKG5vZGUubGVmdCwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPiBub2RlLmRhdGEpIHtcbiAgICAgICAgICAgIG5vZGUucmlnaHQgPSB0aGlzLiNkZWxldGVSZWMobm9kZS5yaWdodCwgdmFsdWUpXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBub2RlXG4gICAgfVxuXG4gICAgZmluZChub2RlLHZhbHVlKXtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4jZmluZFJlYyhub2RlLHZhbHVlKSlcbiAgICB9XG5cbiAgICAjZmluZFJlYyhub2RlICx2YWx1ZSl7XG4gICAgICAgIGlmICghbm9kZSApe1xuICAgICAgICAgICAgcmV0dXJuIFwiTm90IGZvdW5kXCJcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG5vZGUuZGF0YSA9PSB2YWx1ZSl7XG4gICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIDwgbm9kZS5kYXRhKXtcbiAgICAgICAgICAgIHJldHVybiBub2RlLmxlZnQgPSB0aGlzLiNmaW5kUmVjKG5vZGUubGVmdCx2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHZhbHVlID4gbm9kZS5kYXRhKXtcbiAgICAgICAgICAgIHJldHVybiBub2RlLnJpZ2h0ID0gdGhpcy4jZmluZFJlYyhub2RlLnJpZ2h0LHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV2ZWxPcmRlcihub2RlICwgY2Ipe1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgXG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IHtUcmVlfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVHJlZSB9IGZyb20gXCIuL3RyZWVcIlxuaW1wb3J0IHsgcHJldHR5UHJpbnQgfSBmcm9tIFwiLi9wcmV0dHlcIlxuXG5cblxuXG5sZXQgYXJyID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXVxuXG5sZXQgdCA9IG5ldyBUcmVlKClcbmxldCBuID0gdC5idWlsZFRyZWUoYXJyLCAwLCBhcnIubGVuZ3RoIC0gMSlcblxuXG5wcmV0dHlQcmludChuKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9