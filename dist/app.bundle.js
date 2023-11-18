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
       if (value === root.data) return 0;

        let tmp = root
        let depth = 0
       while(tmp && tmp.data != value){
        if(value < tmp.data){
            tmp = tmp.left
        }else if (value > tmp.data) tmp=tmp.right
        depth++
       }

       if(!tmp){
            return "Not found"
       }else return depth
    }

    isBalanced(node){
        if (node === null) return;

        return this.isBalanced()
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

t.insert(n,101)

t.insert(n,105)
t.insert(n,107)
t.insert(n,172)

console.log(t.isBalanced(n))

;(0,_pretty__WEBPACK_IMPORTED_MODULE_1__.prettyPrint)(n)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLE9BQU8sRUFBRSx5QkFBeUI7QUFDckU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxrQ0FBa0MsT0FBTyxFQUFFLHlCQUF5QjtBQUNwRTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Qm9DO0FBQ1A7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsY0FBYzs7QUFFM0M7QUFDQTs7QUFFQSx1QkFBdUIsNkNBQUk7O0FBRTNCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLDZDQUFJO0FBQzNCOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdDQUFLOztBQUV6Qjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOzs7Ozs7OztVQzdMQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ042QjtBQUNTOztBQUV0QztBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFlBQVksdUNBQUk7QUFDaEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFEQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvTm9kZS1jbGFzcy5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9wcmV0dHkuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvcS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy90cmVlLmpzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTm9kZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5yaWdodCA9IG51bGw7XG4gICAgICAgIHRoaXMubGVmdCA9IG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQge05vZGV9IiwiY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmIChub2RlLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLCBmYWxzZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XG4gICAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgICAgICBwcmV0dHlQcmludChub2RlLmxlZnQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcbiAgICB9XG59O1xuXG5cbmV4cG9ydCB7cHJldHR5UHJpbnR9IiwiY2xhc3MgUXVldWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmhlYWQgPSAwO1xuICAgICAgICB0aGlzLnRhaWwgPSAwXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBbXVxuICAgIH1cblxuICAgIHB1c2goZWxlbWVudCl7XG4gICAgICAgIHRoaXMuZWxlbWVudHNbdGhpcy5oZWFkXSA9IGVsZW1lbnRcbiAgICAgICAgdGhpcy5oZWFkKytcbiAgICB9XG5cbiAgICBwb3AoKXtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5zaGlmdCgpXG4gICAgICAgIHRoaXMuaGVhZC0tXG4gICAgfVxuXG4gICAgZW1wdHkoKXtcbiAgICAgICAgcmV0dXJuICh0aGlzLmhlYWQgPT09IDApID8gdHJ1ZTpmYWxzZVxuICAgIH1cblxuICAgIGZyb250KCl7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW3RoaXMudGFpbF1cbiAgICB9XG59XG5cbmV4cG9ydCB7UXVldWV9IiwiXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSBcIi4vTm9kZS1jbGFzc1wiO1xuaW1wb3J0IHtRdWV1ZX0gZnJvbSBcIi4vcS5qc1wiO1xuXG5jbGFzcyBUcmVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yb290ID0gbnVsbFxuICAgIH1cblxuXG4gICAgYnVpbGRUcmVlKGFyciwgc3RhcnQsIGVuZCkge1xuICAgICAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xuXG4gICAgICAgIC8vIHJlbW92ZSBEdXBsaWNhdGVzXG4gICAgICAgIGFyciA9IGFyci5maWx0ZXIoKGl0ZW0sIGluZGV4KSA9PiBhcnIuaW5kZXhPZihpdGVtKSA9PSBpbmRleClcblxuICAgICAgICAvLyBzb3J0IGFycmF5IFxuICAgICAgICBhcnIuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYSAtIGIgfSlcblxuICAgICAgICBpZiAoZW5kID4gYXJyLmxlbmd0aC0xKSBlbmQgPSBhcnIubGVuZ3RoLTFcbiAgICAgICAgbGV0IG1pZCA9IE1hdGguZmxvb3IoKHN0YXJ0ICsgZW5kKSAvIDIpXG5cbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgTm9kZShhcnJbbWlkXSlcblxuICAgICAgICBub2RlLnJpZ2h0ID0gdGhpcy5idWlsZFRyZWUoYXJyLCBtaWQgKyAxLCBlbmQpXG4gICAgICAgIG5vZGUubGVmdCA9IHRoaXMuYnVpbGRUcmVlKGFyciwgc3RhcnQsIG1pZCAtIDEpXG5cbiAgICAgICAgdGhpcy5yb290ID0gbm9kZVxuXG4gICAgICAgIHJldHVybiBub2RlXG5cbiAgICB9XG5cbiAgICBpbnNlcnQobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgbm9kZSA9IHRoaXMuI2luc2VydFJlYyhub2RlLCB2YWx1ZSlcbiAgICB9XG5cbiAgICAjaW5zZXJ0UmVjKG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOb2RlKHZhbHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIDwgbm9kZS5kYXRhKSB7XG4gICAgICAgICAgICBub2RlLmxlZnQgPSB0aGlzLiNpbnNlcnRSZWMobm9kZS5sZWZ0LCB2YWx1ZSlcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgbm9kZS5yaWdodCA9IHRoaXMuI2luc2VydFJlYyhub2RlLnJpZ2h0LCB2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgIH1cblxuICAgIGRlbGV0ZShub2RlLCB2YWx1ZSkge1xuICAgICAgICBub2RlID0gdGhpcy4jZGVsZXRlUmVjKG5vZGUsIHZhbHVlKVxuICAgIH1cblxuICAgICNkZWxldGVSZWMobm9kZSwgdmFsdWUpIHtcblxuXG4gICAgICAgIGlmIChub2RlLmRhdGEgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5sZWZ0ICl7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBub2RlLmxlZnQ7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUucmlnaHQpe1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbm9kZS5yaWdodDtcbiAgICAgICAgICAgICAgICBub2RlID0gdGVtcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG51bGxcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIDwgbm9kZS5kYXRhKSB7XG4gICAgICAgICAgICBub2RlLmxlZnQgPSB0aGlzLiNkZWxldGVSZWMobm9kZS5sZWZ0LCB2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSA+IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgbm9kZS5yaWdodCA9IHRoaXMuI2RlbGV0ZVJlYyhub2RlLnJpZ2h0LCB2YWx1ZSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG5cbiAgICBmaW5kKG5vZGUsdmFsdWUpe1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiNmaW5kUmVjKG5vZGUsdmFsdWUpKVxuICAgIH1cblxuICAgICNmaW5kUmVjKG5vZGUgLHZhbHVlKXtcbiAgICAgICAgaWYgKCFub2RlICl7XG4gICAgICAgICAgICByZXR1cm4gXCJOb3QgZm91bmRcIlxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobm9kZS5kYXRhID09IHZhbHVlKXtcbiAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPCBub2RlLmRhdGEpe1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUubGVmdCA9IHRoaXMuI2ZpbmRSZWMobm9kZS5sZWZ0LHZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodmFsdWUgPiBub2RlLmRhdGEpe1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUucmlnaHQgPSB0aGlzLiNmaW5kUmVjKG5vZGUucmlnaHQsdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXZlbE9yZGVyKG5vZGUgLCBjYil7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm47XG4gICAgICBcbiAgICAgICAgbGV0IHEgPSBuZXcgUXVldWUoKVxuXG4gICAgICAgIHEucHVzaChub2RlKVxuXG4gICAgICAgIHdoaWxlKCFxLmVtcHR5KCkpe1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgID0gcS5mcm9udCgpXG5cbiAgICAgICAgICAgIGNiKGN1cnJlbnQpXG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnQubGVmdCkgcS5wdXNoKGN1cnJlbnQubGVmdClcbiAgICAgICAgICAgIGlmKGN1cnJlbnQucmlnaHQpIHEucHVzaChjdXJyZW50LnJpZ2h0KVxuXG4gICAgICAgICAgICBxLnBvcCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbk9yZGVyKG5vZGUsY2Ipe1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLmxlZnQsY2IpXG4gICAgICAgIGNiKG5vZGUpXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLnJpZ2h0LGNiKVxuICAgIH1cblxuICAgIHByZU9yZGVyKG5vZGUsY2Ipe1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIGNiKG5vZGUpXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLmxlZnQsY2IpXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLnJpZ2h0LGNiKVxuICAgIH1cblxuICAgIHBvc3RPcmRlcihub2RlLGNiKXtcblxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLmxlZnQsY2IpXG4gICAgICAgIHRoaXMuaW5PcmRlcihub2RlLnJpZ2h0LGNiKVxuICAgICAgICBjYihub2RlKVxuICAgIH1cblxuICAgIGhlaWdodChub2RlKXtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkgcmV0dXJuIDA7XG5cbiAgICAgICAgbGV0IGxoXG4gICAgICAgIGxldCByaFxuXG4gICAgICAgIGxoID0gdGhpcy5oZWlnaHQobm9kZS5sZWZ0KVxuICAgICAgICByaCA9IHRoaXMuaGVpZ2h0KG5vZGUucmlnaHQpXG5cbiAgICAgICAgcmV0dXJuIChsaCA+IHJoICkgPyAobGgrMSk6KHJoKzEpXG5cblxuICAgIH1cblxuICAgIGRlcHRoKHZhbHVlICwgcm9vdCA9IHRoaXMucm9vdCl7XG4gICAgICAgaWYgKHZhbHVlID09PSByb290LmRhdGEpIHJldHVybiAwO1xuXG4gICAgICAgIGxldCB0bXAgPSByb290XG4gICAgICAgIGxldCBkZXB0aCA9IDBcbiAgICAgICB3aGlsZSh0bXAgJiYgdG1wLmRhdGEgIT0gdmFsdWUpe1xuICAgICAgICBpZih2YWx1ZSA8IHRtcC5kYXRhKXtcbiAgICAgICAgICAgIHRtcCA9IHRtcC5sZWZ0XG4gICAgICAgIH1lbHNlIGlmICh2YWx1ZSA+IHRtcC5kYXRhKSB0bXA9dG1wLnJpZ2h0XG4gICAgICAgIGRlcHRoKytcbiAgICAgICB9XG5cbiAgICAgICBpZighdG1wKXtcbiAgICAgICAgICAgIHJldHVybiBcIk5vdCBmb3VuZFwiXG4gICAgICAgfWVsc2UgcmV0dXJuIGRlcHRoXG4gICAgfVxuXG4gICAgaXNCYWxhbmNlZChub2RlKXtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICByZXR1cm4gdGhpcy5pc0JhbGFuY2VkKClcbiAgICB9XG5cblxufVxuXG5leHBvcnQge1RyZWV9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUcmVlIH0gZnJvbSBcIi4vdHJlZVwiXG5pbXBvcnQgeyBwcmV0dHlQcmludCB9IGZyb20gXCIuL3ByZXR0eVwiXG5cbmNvbnN0IHJhbmRvbSA9ICgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKVxufVxuXG5cbmxldCBhcnIgPSBbMzEsIDQ2LCA5NiwgNTEsIDU2LCA3MSwgODIsIDc1LCAyOSwgMzQsIDk1LCA3MiwgNTUsIDQyLCAzOCwgNDYsIDc1XVxuXG5sZXQgdCA9IG5ldyBUcmVlKGFycilcbmxldCBuID0gdC5idWlsZFRyZWUoYXJyLDAsYXJyLmxlbmd0aC0xKVxuXG50Lmluc2VydChuLDEwMSlcblxudC5pbnNlcnQobiwxMDUpXG50Lmluc2VydChuLDEwNylcbnQuaW5zZXJ0KG4sMTcyKVxuXG5jb25zb2xlLmxvZyh0LmlzQmFsYW5jZWQobikpXG5cbnByZXR0eVByaW50KG4pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=