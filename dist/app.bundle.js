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

/***/ "./src/q.js":
/*!******************!*\
  !*** ./src/q.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Queue: () => (/* binding */ Queue)
/* harmony export */ });
class Queue {
    constructor() {
        this.head = 0;
        this.tail = 0
        this.elements = []
    }

    push(element){
        this.elements[this.head] = element
        this.head++
    }

    pop(){
        this.elements.shift()
        this.head--
    }

    empty(){
        return (this.head === 0) ? true:false
    }

    front(){
        return this.elements[this.tail]
    }
}



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
/* harmony import */ var _q_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./q.js */ "./src/q.js");




class Tree {
    constructor() {
        this.root = null
    }


    buildTree(arr, start, end) {
        if (start > end) return null;

        // remove Duplicates
        arr = arr.filter((item, index) => arr.indexOf(item) == index)

        // sort array 
        arr.sort((a, b) => { return a - b })

        if (end > arr.length-1) end = arr.length-1
        let mid = Math.floor((start + end) / 2)

        let node = new _Node_class__WEBPACK_IMPORTED_MODULE_0__.Node(arr[mid])

        node.right = this.buildTree(arr, mid + 1, end)
        node.left = this.buildTree(arr, start, mid - 1)

        this.root = node

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
      
        let q = new _q_js__WEBPACK_IMPORTED_MODULE_1__.Queue()

        q.push(node)

        while(!q.empty()){
            let current  = q.front()

            cb(current)

            if(current.left) q.push(current.left)
            if(current.right) q.push(current.right)

            q.pop()
        }
    }

    inOrder(node,cb){
        if (node === null) return;

        this.inOrder(node.left,cb)
        cb(node)
        this.inOrder(node.right,cb)
    }

    preOrder(node,cb){
        if (node === null) return;

        cb(node)
        this.inOrder(node.left,cb)
        this.inOrder(node.right,cb)
    }

    postOrder(node,cb){

        if (node === null) return;

        this.inOrder(node.left,cb)
        this.inOrder(node.right,cb)
        cb(node)
    }

    height(node){
        if (node == null) return 0;

        let lh
        let rh

        lh = this.height(node.left)
        rh = this.height(node.right)

        return (lh > rh ) ? (lh+1):(rh+1)


    }

    depth(value , root = this.root){
       
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



const random = () => {
    return Math.floor(Math.random() * 100)
}


let arr = [31, 46, 96, 51, 56, 71, 82, 75, 29, 34, 95, 72, 55, 42, 38, 46, 75]

let t = new _tree__WEBPACK_IMPORTED_MODULE_0__.Tree(arr)
let n = t.buildTree(arr,0,arr.length-1)

;(0,_pretty__WEBPACK_IMPORTED_MODULE_1__.prettyPrint)(n)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLE9BQU8sRUFBRSx5QkFBeUI7QUFDckU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxrQ0FBa0MsT0FBTyxFQUFFLHlCQUF5QjtBQUNwRTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Qm9DO0FBQ1A7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsY0FBYzs7QUFFM0M7QUFDQTs7QUFFQSx1QkFBdUIsNkNBQUk7O0FBRTNCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLDZDQUFJO0FBQzNCOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdDQUFLOztBQUV6Qjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7VUMxS0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONkI7QUFDUzs7QUFFdEM7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxZQUFZLHVDQUFJO0FBQ2hCOztBQUVBLHFEQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvTm9kZS1jbGFzcy5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9wcmV0dHkuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvcS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy90cmVlLmpzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTm9kZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5yaWdodCA9IG51bGw7XG4gICAgICAgIHRoaXMubGVmdCA9IG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQge05vZGV9IiwiY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmIChub2RlLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLCBmYWxzZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XG4gICAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgICAgICBwcmV0dHlQcmludChub2RlLmxlZnQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcbiAgICB9XG59O1xuXG5cbmV4cG9ydCB7cHJldHR5UHJpbnR9IiwiY2xhc3MgUXVldWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmhlYWQgPSAwO1xuICAgICAgICB0aGlzLnRhaWwgPSAwXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBbXVxuICAgIH1cblxuICAgIHB1c2goZWxlbWVudCl7XG4gICAgICAgIHRoaXMuZWxlbWVudHNbdGhpcy5oZWFkXSA9IGVsZW1lbnRcbiAgICAgICAgdGhpcy5oZWFkKytcbiAgICB9XG5cbiAgICBwb3AoKXtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5zaGlmdCgpXG4gICAgICAgIHRoaXMuaGVhZC0tXG4gICAgfVxuXG4gICAgZW1wdHkoKXtcbiAgICAgICAgcmV0dXJuICh0aGlzLmhlYWQgPT09IDApID8gdHJ1ZTpmYWxzZVxuICAgIH1cblxuICAgIGZyb250KCl7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW3RoaXMudGFpbF1cbiAgICB9XG59XG5cbmV4cG9ydCB7UXVldWV9IiwiXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSBcIi4vTm9kZS1jbGFzc1wiO1xuaW1wb3J0IHtRdWV1ZX0gZnJvbSBcIi4vcS5qc1wiO1xuXG5jbGFzcyBUcmVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yb290ID0gbnVsbFxuICAgIH1cblxuXG4gICAgYnVpbGRUcmVlKGFyciwgc3RhcnQsIGVuZCkge1xuICAgICAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xuXG4gICAgICAgIC8vIHJlbW92ZSBEdXBsaWNhdGVzXG4gICAgICAgIGFyciA9IGFyci5maWx0ZXIoKGl0ZW0sIGluZGV4KSA9PiBhcnIuaW5kZXhPZihpdGVtKSA9PSBpbmRleClcblxuICAgICAgICAvLyBzb3J0IGFycmF5IFxuICAgICAgICBhcnIuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYSAtIGIgfSlcblxuICAgICAgICBpZiAoZW5kID4gYXJyLmxlbmd0aC0xKSBlbmQgPSBhcnIubGVuZ3RoLTFcbiAgICAgICAgbGV0IG1pZCA9IE1hdGguZmxvb3IoKHN0YXJ0ICsgZW5kKSAvIDIpXG5cbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgTm9kZShhcnJbbWlkXSlcblxuICAgICAgICBub2RlLnJpZ2h0ID0gdGhpcy5idWlsZFRyZWUoYXJyLCBtaWQgKyAxLCBlbmQpXG4gICAgICAgIG5vZGUubGVmdCA9IHRoaXMuYnVpbGRUcmVlKGFyciwgc3RhcnQsIG1pZCAtIDEpXG5cbiAgICAgICAgdGhpcy5yb290ID0gbm9kZVxuXG4gICAgICAgIHJldHVybiBub2RlXG5cbiAgICB9XG5cbiAgICBpbnNlcnQobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgbm9kZSA9IHRoaXMuI2luc2VydFJlYyhub2RlLCB2YWx1ZSlcbiAgICB9XG5cbiAgICAjaW5zZXJ0UmVjKG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOb2RlKHZhbHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIDwgbm9kZS5kYXRhKSB7XG4gICAgICAgICAgICBub2RlLmxlZnQgPSB0aGlzLiNpbnNlcnRSZWMobm9kZS5sZWZ0LCB2YWx1ZSlcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgbm9kZS5yaWdodCA9IHRoaXMuI2luc2VydFJlYyhub2RlLnJpZ2h0LCB2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgIH1cblxuICAgIGRlbGV0ZShub2RlLCB2YWx1ZSkge1xuICAgICAgICBub2RlID0gdGhpcy4jZGVsZXRlUmVjKG5vZGUsIHZhbHVlKVxuICAgIH1cblxuICAgICNkZWxldGVSZWMobm9kZSwgdmFsdWUpIHtcblxuXG4gICAgICAgIGlmIChub2RlLmRhdGEgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5sZWZ0ICl7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBub2RlLmxlZnQ7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUucmlnaHQpe1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbm9kZS5yaWdodDtcbiAgICAgICAgICAgICAgICBub2RlID0gdGVtcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG51bGxcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIDwgbm9kZS5kYXRhKSB7XG4gICAgICAgICAgICBub2RlLmxlZnQgPSB0aGlzLiNkZWxldGVSZWMobm9kZS5sZWZ0LCB2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSA+IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgbm9kZS5yaWdodCA9IHRoaXMuI2RlbGV0ZVJlYyhub2RlLnJpZ2h0LCB2YWx1ZSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG5cbiAgICBmaW5kKG5vZGUsdmFsdWUpe1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiNmaW5kUmVjKG5vZGUsdmFsdWUpKVxuICAgIH1cblxuICAgICNmaW5kUmVjKG5vZGUgLHZhbHVlKXtcbiAgICAgICAgaWYgKCFub2RlICl7XG4gICAgICAgICAgICByZXR1cm4gXCJOb3QgZm91bmRcIlxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobm9kZS5kYXRhID09IHZhbHVlKXtcbiAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPCBub2RlLmRhdGEpe1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUubGVmdCA9IHRoaXMuI2ZpbmRSZWMobm9kZS5sZWZ0LHZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodmFsdWUgPiBub2RlLmRhdGEpe1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUucmlnaHQgPSB0aGlzLiNmaW5kUmVjKG5vZGUucmlnaHQsdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXZlbE9yZGVyKG5vZGUgLCBjYil7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm47XG4gICAgICBcbiAgICAgICAgbGV0IHEgPSBuZXcgUXVldWUoKVxuXG4gICAgICAgIHEucHVzaChub2RlKVxuXG4gICAgICAgIHdoaWxlKCFxLmVtcHR5KCkpe1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgID0gcS5mcm9udCgpXG5cbiAgICAgICAgICAgIGNiKGN1cnJlbnQpXG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnQubGVmdCkgcS5wdXNoKGN1cnJlbnQubGVmdClcbiAgICAgICAgICAgIGlmKGN1cnJlbnQucmlnaHQpIHEucHVzaChjdXJyZW50LnJpZ2h0KVxuXG4gICAgICAgICAgICBxLnBvcCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbk9yZGVyKG5vZGUsY2Ipe1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLmxlZnQsY2IpXG4gICAgICAgIGNiKG5vZGUpXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLnJpZ2h0LGNiKVxuICAgIH1cblxuICAgIHByZU9yZGVyKG5vZGUsY2Ipe1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIGNiKG5vZGUpXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLmxlZnQsY2IpXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLnJpZ2h0LGNiKVxuICAgIH1cblxuICAgIHBvc3RPcmRlcihub2RlLGNiKXtcblxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLmxlZnQsY2IpXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLnJpZ2h0LGNiKVxuICAgICAgICBjYihub2RlKVxuICAgIH1cblxuICAgIGhlaWdodChub2RlKXtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkgcmV0dXJuIDA7XG5cbiAgICAgICAgbGV0IGxoXG4gICAgICAgIGxldCByaFxuXG4gICAgICAgIGxoID0gdGhpcy5oZWlnaHQobm9kZS5sZWZ0KVxuICAgICAgICByaCA9IHRoaXMuaGVpZ2h0KG5vZGUucmlnaHQpXG5cbiAgICAgICAgcmV0dXJuIChsaCA+IHJoICkgPyAobGgrMSk6KHJoKzEpXG5cblxuICAgIH1cblxuICAgIGRlcHRoKHZhbHVlICwgcm9vdCA9IHRoaXMucm9vdCl7XG4gICAgICAgXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IHtUcmVlfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVHJlZSB9IGZyb20gXCIuL3RyZWVcIlxuaW1wb3J0IHsgcHJldHR5UHJpbnQgfSBmcm9tIFwiLi9wcmV0dHlcIlxuXG5jb25zdCByYW5kb20gPSAoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMClcbn1cblxuXG5sZXQgYXJyID0gWzMxLCA0NiwgOTYsIDUxLCA1NiwgNzEsIDgyLCA3NSwgMjksIDM0LCA5NSwgNzIsIDU1LCA0MiwgMzgsIDQ2LCA3NV1cblxubGV0IHQgPSBuZXcgVHJlZShhcnIpXG5sZXQgbiA9IHQuYnVpbGRUcmVlKGFyciwwLGFyci5sZW5ndGgtMSlcblxucHJldHR5UHJpbnQobilcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==