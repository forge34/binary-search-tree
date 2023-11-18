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

console.log(t.depth(29,n))

;(0,_pretty__WEBPACK_IMPORTED_MODULE_1__.prettyPrint)(n)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLE9BQU8sRUFBRSx5QkFBeUI7QUFDckU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxrQ0FBa0MsT0FBTyxFQUFFLHlCQUF5QjtBQUNwRTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Qm9DO0FBQ1A7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsY0FBYzs7QUFFM0M7QUFDQTs7QUFFQSx1QkFBdUIsNkNBQUk7O0FBRTNCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLDZDQUFJO0FBQzNCOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdDQUFLOztBQUV6Qjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTs7O0FBR0E7Ozs7Ozs7O1VDekxBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjZCO0FBQ1M7O0FBRXRDO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsWUFBWSx1Q0FBSTtBQUNoQjs7QUFFQTs7QUFFQSxxREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL05vZGUtY2xhc3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvcHJldHR5LmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3EuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvdHJlZS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucmlnaHQgPSBudWxsO1xuICAgICAgICB0aGlzLmxlZnQgPSBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IHtOb2RlfSIsImNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgICAgICBwcmV0dHlQcmludChub2RlLnJpZ2h0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUlOKUgOKUgCBcIiA6IFwi4pSM4pSA4pSAIFwifSR7bm9kZS5kYXRhfWApO1xuICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIiAgICBcIiA6IFwi4pSCICAgXCJ9YCwgdHJ1ZSk7XG4gICAgfVxufTtcblxuXG5leHBvcnQge3ByZXR0eVByaW50fSIsImNsYXNzIFF1ZXVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5oZWFkID0gMDtcbiAgICAgICAgdGhpcy50YWlsID0gMFxuICAgICAgICB0aGlzLmVsZW1lbnRzID0gW11cbiAgICB9XG5cbiAgICBwdXNoKGVsZW1lbnQpe1xuICAgICAgICB0aGlzLmVsZW1lbnRzW3RoaXMuaGVhZF0gPSBlbGVtZW50XG4gICAgICAgIHRoaXMuaGVhZCsrXG4gICAgfVxuXG4gICAgcG9wKCl7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuc2hpZnQoKVxuICAgICAgICB0aGlzLmhlYWQtLVxuICAgIH1cblxuICAgIGVtcHR5KCl7XG4gICAgICAgIHJldHVybiAodGhpcy5oZWFkID09PSAwKSA/IHRydWU6ZmFsc2VcbiAgICB9XG5cbiAgICBmcm9udCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1t0aGlzLnRhaWxdXG4gICAgfVxufVxuXG5leHBvcnQge1F1ZXVlfSIsIlxuaW1wb3J0IHsgTm9kZSB9IGZyb20gXCIuL05vZGUtY2xhc3NcIjtcbmltcG9ydCB7UXVldWV9IGZyb20gXCIuL3EuanNcIjtcblxuY2xhc3MgVHJlZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IG51bGxcbiAgICB9XG5cblxuICAgIGJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAvLyByZW1vdmUgRHVwbGljYXRlc1xuICAgICAgICBhcnIgPSBhcnIuZmlsdGVyKChpdGVtLCBpbmRleCkgPT4gYXJyLmluZGV4T2YoaXRlbSkgPT0gaW5kZXgpXG5cbiAgICAgICAgLy8gc29ydCBhcnJheSBcbiAgICAgICAgYXJyLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGEgLSBiIH0pXG5cbiAgICAgICAgaWYgKGVuZCA+IGFyci5sZW5ndGgtMSkgZW5kID0gYXJyLmxlbmd0aC0xXG4gICAgICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKVxuXG4gICAgICAgIGxldCBub2RlID0gbmV3IE5vZGUoYXJyW21pZF0pXG5cbiAgICAgICAgbm9kZS5yaWdodCA9IHRoaXMuYnVpbGRUcmVlKGFyciwgbWlkICsgMSwgZW5kKVxuICAgICAgICBub2RlLmxlZnQgPSB0aGlzLmJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBtaWQgLSAxKVxuXG4gICAgICAgIHRoaXMucm9vdCA9IG5vZGVcblxuICAgICAgICByZXR1cm4gbm9kZVxuXG4gICAgfVxuXG4gICAgaW5zZXJ0KG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIG5vZGUgPSB0aGlzLiNpbnNlcnRSZWMobm9kZSwgdmFsdWUpXG4gICAgfVxuXG4gICAgI2luc2VydFJlYyhub2RlLCB2YWx1ZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTm9kZSh2YWx1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA8IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgbm9kZS5sZWZ0ID0gdGhpcy4jaW5zZXJ0UmVjKG5vZGUubGVmdCwgdmFsdWUpXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiBub2RlLmRhdGEpIHtcbiAgICAgICAgICAgIG5vZGUucmlnaHQgPSB0aGlzLiNpbnNlcnRSZWMobm9kZS5yaWdodCwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG5cbiAgICBkZWxldGUobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgbm9kZSA9IHRoaXMuI2RlbGV0ZVJlYyhub2RlLCB2YWx1ZSlcbiAgICB9XG5cbiAgICAjZGVsZXRlUmVjKG5vZGUsIHZhbHVlKSB7XG5cblxuICAgICAgICBpZiAobm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUubGVmdCApe1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbm9kZS5sZWZ0O1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0ZW1wO1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub2RlLnJpZ2h0KXtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IG5vZGUucmlnaHQ7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBudWxsXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA8IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgbm9kZS5sZWZ0ID0gdGhpcy4jZGVsZXRlUmVjKG5vZGUubGVmdCwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPiBub2RlLmRhdGEpIHtcbiAgICAgICAgICAgIG5vZGUucmlnaHQgPSB0aGlzLiNkZWxldGVSZWMobm9kZS5yaWdodCwgdmFsdWUpXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBub2RlXG4gICAgfVxuXG4gICAgZmluZChub2RlLHZhbHVlKXtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4jZmluZFJlYyhub2RlLHZhbHVlKSlcbiAgICB9XG5cbiAgICAjZmluZFJlYyhub2RlICx2YWx1ZSl7XG4gICAgICAgIGlmICghbm9kZSApe1xuICAgICAgICAgICAgcmV0dXJuIFwiTm90IGZvdW5kXCJcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG5vZGUuZGF0YSA9PSB2YWx1ZSl7XG4gICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIDwgbm9kZS5kYXRhKXtcbiAgICAgICAgICAgIHJldHVybiBub2RlLmxlZnQgPSB0aGlzLiNmaW5kUmVjKG5vZGUubGVmdCx2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHZhbHVlID4gbm9kZS5kYXRhKXtcbiAgICAgICAgICAgIHJldHVybiBub2RlLnJpZ2h0ID0gdGhpcy4jZmluZFJlYyhub2RlLnJpZ2h0LHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV2ZWxPcmRlcihub2RlICwgY2Ipe1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgXG4gICAgICAgIGxldCBxID0gbmV3IFF1ZXVlKClcblxuICAgICAgICBxLnB1c2gobm9kZSlcblxuICAgICAgICB3aGlsZSghcS5lbXB0eSgpKXtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ICA9IHEuZnJvbnQoKVxuXG4gICAgICAgICAgICBjYihjdXJyZW50KVxuXG4gICAgICAgICAgICBpZihjdXJyZW50LmxlZnQpIHEucHVzaChjdXJyZW50LmxlZnQpXG4gICAgICAgICAgICBpZihjdXJyZW50LnJpZ2h0KSBxLnB1c2goY3VycmVudC5yaWdodClcblxuICAgICAgICAgICAgcS5wb3AoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5PcmRlcihub2RlLGNiKXtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5sZWZ0LGNiKVxuICAgICAgICBjYihub2RlKVxuICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5yaWdodCxjYilcbiAgICB9XG5cbiAgICBwcmVPcmRlcihub2RlLGNiKXtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICBjYihub2RlKVxuICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5sZWZ0LGNiKVxuICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5yaWdodCxjYilcbiAgICB9XG5cbiAgICBwb3N0T3JkZXIobm9kZSxjYil7XG5cbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5sZWZ0LGNiKVxuICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5yaWdodCxjYilcbiAgICAgICAgY2Iobm9kZSlcbiAgICB9XG5cbiAgICBoZWlnaHQobm9kZSl7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHJldHVybiAwO1xuXG4gICAgICAgIGxldCBsaFxuICAgICAgICBsZXQgcmhcblxuICAgICAgICBsaCA9IHRoaXMuaGVpZ2h0KG5vZGUubGVmdClcbiAgICAgICAgcmggPSB0aGlzLmhlaWdodChub2RlLnJpZ2h0KVxuXG4gICAgICAgIHJldHVybiAobGggPiByaCApID8gKGxoKzEpOihyaCsxKVxuXG5cbiAgICB9XG5cbiAgICBkZXB0aCh2YWx1ZSAsIHJvb3QgPSB0aGlzLnJvb3Qpe1xuICAgICAgIGlmICh2YWx1ZSA9PT0gcm9vdC5kYXRhKSByZXR1cm4gMDtcblxuICAgICAgICBsZXQgdG1wID0gcm9vdFxuICAgICAgICBsZXQgZGVwdGggPSAwXG4gICAgICAgd2hpbGUodG1wICYmIHRtcC5kYXRhICE9IHZhbHVlKXtcbiAgICAgICAgaWYodmFsdWUgPCB0bXAuZGF0YSl7XG4gICAgICAgICAgICB0bXAgPSB0bXAubGVmdFxuICAgICAgICB9ZWxzZSBpZiAodmFsdWUgPiB0bXAuZGF0YSkgdG1wPXRtcC5yaWdodFxuICAgICAgICBkZXB0aCsrXG4gICAgICAgfVxuXG4gICAgICAgaWYoIXRtcCl7XG4gICAgICAgICAgICByZXR1cm4gXCJOb3QgZm91bmRcIlxuICAgICAgIH1lbHNlIHJldHVybiBkZXB0aFxuICAgIH1cblxuICAgIFxuXG5cbn1cblxuZXhwb3J0IHtUcmVlfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVHJlZSB9IGZyb20gXCIuL3RyZWVcIlxuaW1wb3J0IHsgcHJldHR5UHJpbnQgfSBmcm9tIFwiLi9wcmV0dHlcIlxuXG5jb25zdCByYW5kb20gPSAoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMClcbn1cblxuXG5sZXQgYXJyID0gWzMxLCA0NiwgOTYsIDUxLCA1NiwgNzEsIDgyLCA3NSwgMjksIDM0LCA5NSwgNzIsIDU1LCA0MiwgMzgsIDQ2LCA3NV1cblxubGV0IHQgPSBuZXcgVHJlZShhcnIpXG5sZXQgbiA9IHQuYnVpbGRUcmVlKGFyciwwLGFyci5sZW5ndGgtMSlcblxuY29uc29sZS5sb2codC5kZXB0aCgyOSxuKSlcblxucHJldHR5UHJpbnQobilcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==