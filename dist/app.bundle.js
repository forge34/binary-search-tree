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
        if (node === null) return;

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

        if (node === null) return;

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

// prettyPrint(n)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLE9BQU8sRUFBRSx5QkFBeUI7QUFDckU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxrQ0FBa0MsT0FBTyxFQUFFLHlCQUF5QjtBQUNwRTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Qm9DO0FBQ0w7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsY0FBYzs7QUFFM0M7QUFDQTs7QUFFQSx1QkFBdUIsNkNBQUk7O0FBRTNCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLDZDQUFJO0FBQzNCOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQix3Q0FBSzs7QUFFekI7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBOzs7Ozs7OztVQ25PQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ042QjtBQUNTOztBQUV0QztBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFlBQVksdUNBQUk7QUFDaEI7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9Ob2RlLWNsYXNzLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3ByZXR0eS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9xLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3RyZWUuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGEgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnJpZ2h0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCB7Tm9kZX0iLCJjb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgcHJldHR5UHJpbnQobm9kZS5yaWdodCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsIGZhbHNlKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcbiAgICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgIHByZXR0eVByaW50KG5vZGUubGVmdCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xuICAgIH1cbn07XG5cblxuZXhwb3J0IHtwcmV0dHlQcmludH0iLCJjbGFzcyBRdWV1ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaGVhZCA9IDA7XG4gICAgICAgIHRoaXMudGFpbCA9IDBcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdXG4gICAgfVxuXG4gICAgcHVzaChlbGVtZW50KXtcbiAgICAgICAgdGhpcy5lbGVtZW50c1t0aGlzLmhlYWRdID0gZWxlbWVudFxuICAgICAgICB0aGlzLmhlYWQrK1xuICAgIH1cblxuICAgIHBvcCgpe1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnNoaWZ0KClcbiAgICAgICAgdGhpcy5oZWFkLS1cbiAgICB9XG5cbiAgICBlbXB0eSgpe1xuICAgICAgICByZXR1cm4gKHRoaXMuaGVhZCA9PT0gMCkgPyB0cnVlOmZhbHNlXG4gICAgfVxuXG4gICAgZnJvbnQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbdGhpcy50YWlsXVxuICAgIH1cbn1cblxuZXhwb3J0IHtRdWV1ZX0iLCJcbmltcG9ydCB7IE5vZGUgfSBmcm9tIFwiLi9Ob2RlLWNsYXNzXCI7XG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCIuL3EuanNcIjtcblxuY2xhc3MgVHJlZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IG51bGxcbiAgICB9XG5cblxuICAgIGJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAvLyByZW1vdmUgRHVwbGljYXRlc1xuICAgICAgICBhcnIgPSBhcnIuZmlsdGVyKChpdGVtLCBpbmRleCkgPT4gYXJyLmluZGV4T2YoaXRlbSkgPT0gaW5kZXgpXG5cbiAgICAgICAgLy8gc29ydCBhcnJheSBcbiAgICAgICAgYXJyLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGEgLSBiIH0pXG5cbiAgICAgICAgaWYgKGVuZCA+IGFyci5sZW5ndGggLSAxKSBlbmQgPSBhcnIubGVuZ3RoIC0gMVxuICAgICAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMilcblxuICAgICAgICBsZXQgbm9kZSA9IG5ldyBOb2RlKGFyclttaWRdKVxuXG4gICAgICAgIG5vZGUucmlnaHQgPSB0aGlzLmJ1aWxkVHJlZShhcnIsIG1pZCArIDEsIGVuZClcbiAgICAgICAgbm9kZS5sZWZ0ID0gdGhpcy5idWlsZFRyZWUoYXJyLCBzdGFydCwgbWlkIC0gMSlcblxuICAgICAgICB0aGlzLnJvb3QgPSBub2RlXG5cbiAgICAgICAgcmV0dXJuIG5vZGVcblxuICAgIH1cblxuICAgIGluc2VydChub2RlLCB2YWx1ZSkge1xuICAgICAgICBub2RlID0gdGhpcy4jaW5zZXJ0UmVjKG5vZGUsIHZhbHVlKVxuICAgIH1cblxuICAgICNpbnNlcnRSZWMobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IE5vZGUodmFsdWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPCBub2RlLmRhdGEpIHtcbiAgICAgICAgICAgIG5vZGUubGVmdCA9IHRoaXMuI2luc2VydFJlYyhub2RlLmxlZnQsIHZhbHVlKVxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gbm9kZS5kYXRhKSB7XG4gICAgICAgICAgICBub2RlLnJpZ2h0ID0gdGhpcy4jaW5zZXJ0UmVjKG5vZGUucmlnaHQsIHZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgfVxuXG4gICAgZGVsZXRlKG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIG5vZGUgPSB0aGlzLiNkZWxldGVSZWMobm9kZSwgdmFsdWUpXG4gICAgfVxuXG4gICAgI2RlbGV0ZVJlYyhub2RlLCB2YWx1ZSkge1xuXG5cbiAgICAgICAgaWYgKG5vZGUuZGF0YSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmxlZnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IG5vZGUubGVmdDtcbiAgICAgICAgICAgICAgICBub2RlID0gdGVtcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobm9kZS5yaWdodCkge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbm9kZS5yaWdodDtcbiAgICAgICAgICAgICAgICBub2RlID0gdGVtcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG51bGxcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIDwgbm9kZS5kYXRhKSB7XG4gICAgICAgICAgICBub2RlLmxlZnQgPSB0aGlzLiNkZWxldGVSZWMobm9kZS5sZWZ0LCB2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSA+IG5vZGUuZGF0YSkge1xuICAgICAgICAgICAgbm9kZS5yaWdodCA9IHRoaXMuI2RlbGV0ZVJlYyhub2RlLnJpZ2h0LCB2YWx1ZSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG5cbiAgICBmaW5kKG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuI2ZpbmRSZWMobm9kZSwgdmFsdWUpKVxuICAgIH1cblxuICAgICNmaW5kUmVjKG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiTm90IGZvdW5kXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLmRhdGEgPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPCBub2RlLmRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlLmxlZnQgPSB0aGlzLiNmaW5kUmVjKG5vZGUubGVmdCwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPiBub2RlLmRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlLnJpZ2h0ID0gdGhpcy4jZmluZFJlYyhub2RlLnJpZ2h0LCB2YWx1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldmVsT3JkZXIobm9kZSwgY2IpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICBsZXQgcSA9IG5ldyBRdWV1ZSgpXG5cbiAgICAgICAgcS5wdXNoKG5vZGUpXG5cbiAgICAgICAgd2hpbGUgKCFxLmVtcHR5KCkpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gcS5mcm9udCgpXG5cbiAgICAgICAgICAgIGNiKGN1cnJlbnQpXG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50LmxlZnQpIHEucHVzaChjdXJyZW50LmxlZnQpXG4gICAgICAgICAgICBpZiAoY3VycmVudC5yaWdodCkgcS5wdXNoKGN1cnJlbnQucmlnaHQpXG5cbiAgICAgICAgICAgIHEucG9wKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluT3JkZXIobm9kZSwgY2IpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybiBbXTtcblxuICAgICAgICBpZiAoIWNiKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLnRoaXMuaW5PcmRlcihub2RlLmxlZnQpLCBub2RlLmRhdGEsIC4uLnRoaXMuaW5PcmRlcihub2RlLnJpZ2h0KV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjYikge1xuICAgICAgICAgICAgdGhpcy5pbk9yZGVyKG5vZGUubGVmdCwgY2IpXG4gICAgICAgICAgICBjYihub2RlKVxuICAgICAgICAgICAgdGhpcy5pbk9yZGVyKG5vZGUucmlnaHQsIGNiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJlT3JkZXIobm9kZSwgY2IpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICBpZiAoIWNiKSB7XG4gICAgICAgICAgICByZXR1cm4gW25vZGUuZGF0YSwgLi4udGhpcy5pbk9yZGVyKG5vZGUubGVmdCksIC4uLnRoaXMuaW5PcmRlcihub2RlLnJpZ2h0KV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNiKG5vZGUpXG4gICAgICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5sZWZ0LCBjYilcbiAgICAgICAgICAgIHRoaXMuaW5PcmRlcihub2RlLnJpZ2h0LCBjYilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvc3RPcmRlcihub2RlLCBjYikge1xuXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFjYikge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi50aGlzLmluT3JkZXIobm9kZS5sZWZ0KSwgLi4udGhpcy5pbk9yZGVyKG5vZGUucmlnaHQpLCBub2RlLmRhdGFdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluT3JkZXIobm9kZS5sZWZ0LCBjYilcbiAgICAgICAgICAgIHRoaXMuaW5PcmRlcihub2RlLnJpZ2h0LCBjYilcblxuICAgICAgICAgICAgY2Iobm9kZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhlaWdodChub2RlKSB7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHJldHVybiAwO1xuXG4gICAgICAgIGxldCBsaFxuICAgICAgICBsZXQgcmhcblxuICAgICAgICBsaCA9IHRoaXMuaGVpZ2h0KG5vZGUubGVmdClcbiAgICAgICAgcmggPSB0aGlzLmhlaWdodChub2RlLnJpZ2h0KVxuXG4gICAgICAgIHJldHVybiAobGggPiByaCkgPyAobGggKyAxKSA6IChyaCArIDEpXG5cblxuICAgIH1cblxuICAgIGRlcHRoKHZhbHVlLCByb290ID0gdGhpcy5yb290KSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gcm9vdC5kYXRhKSByZXR1cm4gMDtcblxuICAgICAgICBsZXQgdG1wID0gcm9vdFxuICAgICAgICBsZXQgZGVwdGggPSAwXG4gICAgICAgIHdoaWxlICh0bXAgJiYgdG1wLmRhdGEgIT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IHRtcC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gdG1wLmxlZnRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiB0bXAuZGF0YSkgdG1wID0gdG1wLnJpZ2h0XG4gICAgICAgICAgICBkZXB0aCsrXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRtcCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiTm90IGZvdW5kXCJcbiAgICAgICAgfSBlbHNlIHJldHVybiBkZXB0aFxuICAgIH1cblxuICAgIGlzQmFsYW5jZWQobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgbGV0IGggPSBNYXRoLmFicyh0aGlzLmhlaWdodChub2RlLmxlZnQpIC0gdGhpcy5oZWlnaHQobm9kZS5yaWdodCkpXG5cbiAgICAgICAgaWYgKGggPD0gMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNCYWxhbmNlZChub2RlLmxlZnQpICYmIHRoaXMuaXNCYWxhbmNlZChub2RlLnJpZ2h0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcblxuICAgIH1cblxuXG4gICAgcmVCYWxhbmNlKG5vZGUpIHtcblxuICAgICAgICBpZiAodGhpcy5pc0JhbGFuY2VkKG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXJyID0gdGhpcy5pbk9yZGVyKG5vZGUpXG5cbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLmJ1aWxkVHJlZShhcnIsIDAsIGFyci5sZW5ndGggLSAxKVxuXG4gICAgICAgIHJldHVybiByb290XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgeyBUcmVlIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRyZWUgfSBmcm9tIFwiLi90cmVlXCJcbmltcG9ydCB7IHByZXR0eVByaW50IH0gZnJvbSBcIi4vcHJldHR5XCJcblxuY29uc3QgcmFuZG9tID0gKCkgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApXG59XG5cblxubGV0IGFyciA9IFsxLDIsMyw0LDUsNiw3LDgsOSwxMF1cblxubGV0IHQgPSBuZXcgVHJlZShhcnIpXG5sZXQgbiA9IHQuYnVpbGRUcmVlKGFyciwwLGFyci5sZW5ndGgtMSlcblxuLy8gcHJldHR5UHJpbnQobilcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==