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

        if (end > arr.length - 1) end = arr.length - 1
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
            if (node.left) {
                let temp = node.left;
                node = temp;
                return node
            }
            else if (node.right) {
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

    find(node, value) {
        console.log(this.#findRec(node, value))
    }

    #findRec(node, value) {
        if (!node) {
            return "Not found"
        }

        if (node.data == value) {
            return node
        }

        if (value < node.data) {
            return node.left = this.#findRec(node.left, value)
        }
        else if (value > node.data) {
            return node.right = this.#findRec(node.right, value)
        }
    }

    levelOrder(node, cb) {
        if (node === null) return;

        let q = new _q_js__WEBPACK_IMPORTED_MODULE_1__.Queue()

        q.push(node)

        while (!q.empty()) {
            let current = q.front()

            cb(current)

            if (current.left) q.push(current.left)
            if (current.right) q.push(current.right)

            q.pop()
        }
    }

    inOrder(node, cb) {
        if (node === null) return [];

        if (!cb) {
            return [...this.inOrder(node.left), node.data, ...this.inOrder(node.right)]
        }
        else if (cb) {
            this.inOrder(node.left, cb)
            cb(node)
            this.inOrder(node.right, cb)
        }
    }

    preOrder(node, cb) {
        if (node === null) return [];

        if (!cb) {
            return [node.data, ...this.inOrder(node.left), ...this.inOrder(node.right)]
        }
        else {
            cb(node)
            this.inOrder(node.left, cb)
            this.inOrder(node.right, cb)
        }
    }

    postOrder(node, cb) {

        if (node === null) return[];

        if (!cb) {
            return [...this.inOrder(node.left), ...this.inOrder(node.right), node.data]
        }
        else {
            this.inOrder(node.left, cb)
            this.inOrder(node.right, cb)

            cb(node)
        }
    }

    height(node) {
        if (node == null) return 0;

        let lh
        let rh

        lh = this.height(node.left)
        rh = this.height(node.right)

        return (lh > rh) ? (lh + 1) : (rh + 1)


    }

    depth(value, root = this.root) {
        if (value === root.data) return 0;

        let tmp = root
        let depth = 0
        while (tmp && tmp.data != value) {
            if (value < tmp.data) {
                tmp = tmp.left
            } else if (value > tmp.data) tmp = tmp.right
            depth++
        }

        if (!tmp) {
            return "Not found"
        } else return depth
    }

    isBalanced(node) {
        if (node === null) return true;

        let h = Math.abs(this.height(node.left) - this.height(node.right))

        if (h <= 1) {
            if (this.isBalanced(node.left) && this.isBalanced(node.right)) {
                return true
            }
        } else return false

    }


    reBalance(node) {

        if (this.isBalanced(node)) {
            return node
        }

        const arr = this.inOrder(node)

        let root = this.buildTree(arr, 0, arr.length - 1)

        return root

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


let arr = [1,2,3,4,5,6,7,8,9,10]

let t = new _tree__WEBPACK_IMPORTED_MODULE_0__.Tree(arr)
let n = t.buildTree(arr,0,arr.length-1)

console.log(t.inOrder(n))
// prettyPrint(n)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLE9BQU8sRUFBRSx5QkFBeUI7QUFDckU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxrQ0FBa0MsT0FBTyxFQUFFLHlCQUF5QjtBQUNwRTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Qm9DO0FBQ0w7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsY0FBYzs7QUFFM0M7QUFDQTs7QUFFQSx1QkFBdUIsNkNBQUk7O0FBRTNCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLDZDQUFJO0FBQzNCOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQix3Q0FBSzs7QUFFekI7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBOzs7Ozs7OztVQ25PQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ042QjtBQUNTOztBQUV0QztBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFlBQVksdUNBQUk7QUFDaEI7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL05vZGUtY2xhc3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvcHJldHR5LmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3EuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvdHJlZS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMucmlnaHQgPSBudWxsO1xuICAgICAgICB0aGlzLmxlZnQgPSBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IHtOb2RlfSIsImNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgICAgICBwcmV0dHlQcmludChub2RlLnJpZ2h0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUlOKUgOKUgCBcIiA6IFwi4pSM4pSA4pSAIFwifSR7bm9kZS5kYXRhfWApO1xuICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIiAgICBcIiA6IFwi4pSCICAgXCJ9YCwgdHJ1ZSk7XG4gICAgfVxufTtcblxuXG5leHBvcnQge3ByZXR0eVByaW50fSIsImNsYXNzIFF1ZXVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5oZWFkID0gMDtcbiAgICAgICAgdGhpcy50YWlsID0gMFxuICAgICAgICB0aGlzLmVsZW1lbnRzID0gW11cbiAgICB9XG5cbiAgICBwdXNoKGVsZW1lbnQpe1xuICAgICAgICB0aGlzLmVsZW1lbnRzW3RoaXMuaGVhZF0gPSBlbGVtZW50XG4gICAgICAgIHRoaXMuaGVhZCsrXG4gICAgfVxuXG4gICAgcG9wKCl7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuc2hpZnQoKVxuICAgICAgICB0aGlzLmhlYWQtLVxuICAgIH1cblxuICAgIGVtcHR5KCl7XG4gICAgICAgIHJldHVybiAodGhpcy5oZWFkID09PSAwKSA/IHRydWU6ZmFsc2VcbiAgICB9XG5cbiAgICBmcm9udCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1t0aGlzLnRhaWxdXG4gICAgfVxufVxuXG5leHBvcnQge1F1ZXVlfSIsIlxuaW1wb3J0IHsgTm9kZSB9IGZyb20gXCIuL05vZGUtY2xhc3NcIjtcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSBcIi4vcS5qc1wiO1xuXG5jbGFzcyBUcmVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yb290ID0gbnVsbFxuICAgIH1cblxuXG4gICAgYnVpbGRUcmVlKGFyciwgc3RhcnQsIGVuZCkge1xuICAgICAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xuXG4gICAgICAgIC8vIHJlbW92ZSBEdXBsaWNhdGVzXG4gICAgICAgIGFyciA9IGFyci5maWx0ZXIoKGl0ZW0sIGluZGV4KSA9PiBhcnIuaW5kZXhPZihpdGVtKSA9PSBpbmRleClcblxuICAgICAgICAvLyBzb3J0IGFycmF5IFxuICAgICAgICBhcnIuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYSAtIGIgfSlcblxuICAgICAgICBpZiAoZW5kID4gYXJyLmxlbmd0aCAtIDEpIGVuZCA9IGFyci5sZW5ndGggLSAxXG4gICAgICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKVxuXG4gICAgICAgIGxldCBub2RlID0gbmV3IE5vZGUoYXJyW21pZF0pXG5cbiAgICAgICAgbm9kZS5yaWdodCA9IHRoaXMuYnVpbGRUcmVlKGFyciwgbWlkICsgMSwgZW5kKVxuICAgICAgICBub2RlLmxlZnQgPSB0aGlzLmJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBtaWQgLSAxKVxuXG4gICAgICAgIHRoaXMucm9vdCA9IG5vZGVcblxuICAgICAgICByZXR1cm4gbm9kZVxuXG4gICAgfVxuXG4gICAgaW5zZXJ0KG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIG5vZGUgPSB0aGlzLiNpbnNlcnRSZWMobm9kZSwgdmFsdWUpXG4gICAgfVxuXG4gICAgI2luc2VydFJlYyhub2RlLCB2YWx1ZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTm9kZSh2YWx1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA8IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgbm9kZS5sZWZ0ID0gdGhpcy4jaW5zZXJ0UmVjKG5vZGUubGVmdCwgdmFsdWUpXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiBub2RlLmRhdGEpIHtcbiAgICAgICAgICAgIG5vZGUucmlnaHQgPSB0aGlzLiNpbnNlcnRSZWMobm9kZS5yaWdodCwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG5cbiAgICBkZWxldGUobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgbm9kZSA9IHRoaXMuI2RlbGV0ZVJlYyhub2RlLCB2YWx1ZSlcbiAgICB9XG5cbiAgICAjZGVsZXRlUmVjKG5vZGUsIHZhbHVlKSB7XG5cblxuICAgICAgICBpZiAobm9kZS5kYXRhID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUubGVmdCkge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbm9kZS5sZWZ0O1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0ZW1wO1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub2RlLnJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBub2RlLnJpZ2h0O1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0ZW1wO1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbnVsbFxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPCBub2RlLmRhdGEpIHtcbiAgICAgICAgICAgIG5vZGUubGVmdCA9IHRoaXMuI2RlbGV0ZVJlYyhub2RlLmxlZnQsIHZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlID4gbm9kZS5kYXRhKSB7XG4gICAgICAgICAgICBub2RlLnJpZ2h0ID0gdGhpcy4jZGVsZXRlUmVjKG5vZGUucmlnaHQsIHZhbHVlKVxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gbm9kZVxuICAgIH1cblxuICAgIGZpbmQobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4jZmluZFJlYyhub2RlLCB2YWx1ZSkpXG4gICAgfVxuXG4gICAgI2ZpbmRSZWMobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJOb3QgZm91bmRcIlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuZGF0YSA9PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA8IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUubGVmdCA9IHRoaXMuI2ZpbmRSZWMobm9kZS5sZWZ0LCB2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSA+IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUucmlnaHQgPSB0aGlzLiNmaW5kUmVjKG5vZGUucmlnaHQsIHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV2ZWxPcmRlcihub2RlLCBjYikge1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBxID0gbmV3IFF1ZXVlKClcblxuICAgICAgICBxLnB1c2gobm9kZSlcblxuICAgICAgICB3aGlsZSAoIXEuZW1wdHkoKSkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBxLmZyb250KClcblxuICAgICAgICAgICAgY2IoY3VycmVudClcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnQubGVmdCkgcS5wdXNoKGN1cnJlbnQubGVmdClcbiAgICAgICAgICAgIGlmIChjdXJyZW50LnJpZ2h0KSBxLnB1c2goY3VycmVudC5yaWdodClcblxuICAgICAgICAgICAgcS5wb3AoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5PcmRlcihub2RlLCBjYikge1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4udGhpcy5pbk9yZGVyKG5vZGUubGVmdCksIG5vZGUuZGF0YSwgLi4udGhpcy5pbk9yZGVyKG5vZGUucmlnaHQpXVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNiKSB7XG4gICAgICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5sZWZ0LCBjYilcbiAgICAgICAgICAgIGNiKG5vZGUpXG4gICAgICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5yaWdodCwgY2IpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVPcmRlcihub2RlLCBjYikge1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgIHJldHVybiBbbm9kZS5kYXRhLCAuLi50aGlzLmluT3JkZXIobm9kZS5sZWZ0KSwgLi4udGhpcy5pbk9yZGVyKG5vZGUucmlnaHQpXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2Iobm9kZSlcbiAgICAgICAgICAgIHRoaXMuaW5PcmRlcihub2RlLmxlZnQsIGNiKVxuICAgICAgICAgICAgdGhpcy5pbk9yZGVyKG5vZGUucmlnaHQsIGNiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9zdE9yZGVyKG5vZGUsIGNiKSB7XG5cbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybltdO1xuXG4gICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4udGhpcy5pbk9yZGVyKG5vZGUubGVmdCksIC4uLnRoaXMuaW5PcmRlcihub2RlLnJpZ2h0KSwgbm9kZS5kYXRhXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbk9yZGVyKG5vZGUubGVmdCwgY2IpXG4gICAgICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5yaWdodCwgY2IpXG5cbiAgICAgICAgICAgIGNiKG5vZGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoZWlnaHQobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSByZXR1cm4gMDtcblxuICAgICAgICBsZXQgbGhcbiAgICAgICAgbGV0IHJoXG5cbiAgICAgICAgbGggPSB0aGlzLmhlaWdodChub2RlLmxlZnQpXG4gICAgICAgIHJoID0gdGhpcy5oZWlnaHQobm9kZS5yaWdodClcblxuICAgICAgICByZXR1cm4gKGxoID4gcmgpID8gKGxoICsgMSkgOiAocmggKyAxKVxuXG5cbiAgICB9XG5cbiAgICBkZXB0aCh2YWx1ZSwgcm9vdCA9IHRoaXMucm9vdCkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHJvb3QuZGF0YSkgcmV0dXJuIDA7XG5cbiAgICAgICAgbGV0IHRtcCA9IHJvb3RcbiAgICAgICAgbGV0IGRlcHRoID0gMFxuICAgICAgICB3aGlsZSAodG1wICYmIHRtcC5kYXRhICE9IHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPCB0bXAuZGF0YSkge1xuICAgICAgICAgICAgICAgIHRtcCA9IHRtcC5sZWZ0XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gdG1wLmRhdGEpIHRtcCA9IHRtcC5yaWdodFxuICAgICAgICAgICAgZGVwdGgrK1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0bXApIHtcbiAgICAgICAgICAgIHJldHVybiBcIk5vdCBmb3VuZFwiXG4gICAgICAgIH0gZWxzZSByZXR1cm4gZGVwdGhcbiAgICB9XG5cbiAgICBpc0JhbGFuY2VkKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGxldCBoID0gTWF0aC5hYnModGhpcy5oZWlnaHQobm9kZS5sZWZ0KSAtIHRoaXMuaGVpZ2h0KG5vZGUucmlnaHQpKVxuXG4gICAgICAgIGlmIChoIDw9IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQmFsYW5jZWQobm9kZS5sZWZ0KSAmJiB0aGlzLmlzQmFsYW5jZWQobm9kZS5yaWdodCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXG5cbiAgICB9XG5cblxuICAgIHJlQmFsYW5jZShub2RlKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNCYWxhbmNlZChub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFyciA9IHRoaXMuaW5PcmRlcihub2RlKVxuXG4gICAgICAgIGxldCByb290ID0gdGhpcy5idWlsZFRyZWUoYXJyLCAwLCBhcnIubGVuZ3RoIC0gMSlcblxuICAgICAgICByZXR1cm4gcm9vdFxuXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IHsgVHJlZSB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUcmVlIH0gZnJvbSBcIi4vdHJlZVwiXG5pbXBvcnQgeyBwcmV0dHlQcmludCB9IGZyb20gXCIuL3ByZXR0eVwiXG5cbmNvbnN0IHJhbmRvbSA9ICgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKVxufVxuXG5cbmxldCBhcnIgPSBbMSwyLDMsNCw1LDYsNyw4LDksMTBdXG5cbmxldCB0ID0gbmV3IFRyZWUoYXJyKVxubGV0IG4gPSB0LmJ1aWxkVHJlZShhcnIsMCxhcnIubGVuZ3RoLTEpXG5cbmNvbnNvbGUubG9nKHQuaW5PcmRlcihuKSlcbi8vIHByZXR0eVByaW50KG4pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=