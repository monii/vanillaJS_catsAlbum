/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Breadcrumb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _Nodes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _ImageView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _Loading_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _Api_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







function App($app) {
  var _this = this;

  this.state = {
    isRoot: true,
    isLoading: true,
    nodes: [],
    depth: [],
    imagePath: ""
  };
  var breadcrumb = new _Breadcrumb_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    $app: $app,
    initialState: {
      depth: this.state.depth
    },
    onClick: function () {
      var _onClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(index) {
        var rootNodes, nextDepth, nextNodes;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(index === null)) {
                  _context.next = 8;
                  break;
                }

                _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                  isLoading: true,
                  imagePath: ""
                }));

                _context.next = 4;
                return (0,_Api_api_js__WEBPACK_IMPORTED_MODULE_4__.getDirectoryData)();

              case 4:
                rootNodes = _context.sent;

                _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                  isLoading: false,
                  isRoot: true,
                  nodes: rootNodes,
                  depth: []
                }));

                _context.next = 16;
                break;

              case 8:
                if (!(index === _this.state.depth.length - 1)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return");

              case 10:
                _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                  isLoading: true,
                  imagePath: ""
                }));

                nextDepth = _this.state.depth.slice(0, index + 1);
                _context.next = 14;
                return (0,_Api_api_js__WEBPACK_IMPORTED_MODULE_4__.getDirectoryData)(nextDepth[nextDepth.length - 1].id);

              case 14:
                nextNodes = _context.sent;

                _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                  isLoading: false,
                  nodes: nextNodes,
                  depth: nextDepth
                }));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onClick(_x) {
        return _onClick.apply(this, arguments);
      }

      return onClick;
    }()
  });
  var nodes = new _Nodes_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    $app: $app,
    initialState: {
      nodes: this.state.nodes
    },
    onClick: function () {
      var _onClick2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(node) {
        var nextNodes;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                  isLoading: true
                }));

                if (!(node.type === "FILE")) {
                  _context2.next = 5;
                  break;
                }

                _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                  isRoot: false,
                  isLoading: false,
                  imagePath: node.filePath
                }));

                _context2.next = 9;
                break;

              case 5:
                _context2.next = 7;
                return (0,_Api_api_js__WEBPACK_IMPORTED_MODULE_4__.getDirectoryData)(node.id);

              case 7:
                nextNodes = _context2.sent;

                _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                  isRoot: false,
                  isLoading: false,
                  nodes: nextNodes,
                  depth: [].concat(_toConsumableArray(_this.state.depth), [node])
                }));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onClick(_x2) {
        return _onClick2.apply(this, arguments);
      }

      return onClick;
    }(),
    prevClick: function () {
      var _prevClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var prevDirectory, prevId, prevNodes, rootNodes;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                  isLoading: true,
                  imagePath: ""
                }));

                prevDirectory = _toConsumableArray(_this.state.depth);
                prevDirectory.pop();
                prevId = prevDirectory.length === 0 ? null : prevDirectory[prevDirectory.length - 1].id;

                if (!prevId) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 7;
                return (0,_Api_api_js__WEBPACK_IMPORTED_MODULE_4__.getDirectoryData)(prevId);

              case 7:
                prevNodes = _context3.sent;

                _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                  isLoading: false,
                  nodes: prevNodes,
                  depth: prevDirectory
                }));

                _context3.next = 15;
                break;

              case 11:
                _context3.next = 13;
                return (0,_Api_api_js__WEBPACK_IMPORTED_MODULE_4__.getDirectoryData)();

              case 13:
                rootNodes = _context3.sent;

                _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                  isRoot: true,
                  isLoading: false,
                  nodes: rootNodes,
                  depth: prevDirectory
                }));

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function prevClick() {
        return _prevClick.apply(this, arguments);
      }

      return prevClick;
    }()
  });
  var imageView = new _ImageView_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    $app: $app,
    initialState: {
      imagePath: this.state.imagePath
    },
    onClickClose: function onClickClose(isClose) {
      isClose ? _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
        imagePath: ''
      })) : '';
    }
  });
  var loading = new _Loading_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
    $app: $app,
    initialState: {
      isLoading: this.state.isLoading
    }
  });

  this.setState = function (nextState) {
    _this.state = nextState, breadcrumb.setState({
      depth: _this.state.depth
    });
    nodes.setState({
      isRoot: _this.state.isRoot,
      nodes: _this.state.nodes
    });
    imageView.setState({
      imagePath: _this.state.imagePath
    });
    loading.setState({
      isLoading: _this.state.isLoading
    });
  };

  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var rootNodes;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0,_Api_api_js__WEBPACK_IMPORTED_MODULE_4__.getDirectoryData)();

            case 2:
              rootNodes = _context4.sent;

              _this.setState(_objectSpread(_objectSpread({}, _this.state), {}, {
                isLoading: false,
                nodes: rootNodes
              }));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Breadcrumb(_ref) {
  var _this = this;

  var $app = _ref.$app,
      initialState = _ref.initialState,
      onClick = _ref.onClick;
  this.state = initialState;
  this.onClick = onClick;
  var $breadcrumbArticle = document.createElement("article");
  var $breadcrumb = document.createElement("nav");
  $breadcrumb.className = "Breadcrumb";
  $breadcrumbArticle.appendChild($breadcrumb);
  $app.appendChild($breadcrumbArticle);

  this.render = function () {
    var _this$state$depth = _this.state.depth,
        depth = _this$state$depth === void 0 ? [] : _this$state$depth;
    $breadcrumb.innerHTML = "<div class='navItem'>root</div>".concat(depth.map(function (dep, i) {
      return "<div class='navItem' data-index=".concat(i, ">").concat(dep.name, "</div>");
    }).join(""));
  };

  this.setState = function (nextState) {
    _this.state = nextState;

    _this.render();
  };

  $breadcrumb.addEventListener("click", function (e) {
    var clicked = e.target.closest(".navItem");
    var index = clicked.dataset.index;

    _this.onClick(index ? parseInt(index) : null);
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Breadcrumb);

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Nodes(_ref) {
  var _this = this;

  var $app = _ref.$app,
      initialState = _ref.initialState,
      onClick = _ref.onClick,
      prevClick = _ref.prevClick;
  this.state = initialState;
  this.onClick = onClick;
  this.prevClick = prevClick;
  var $nodeArticle = document.createElement("article");
  var $nodesContainer = document.createElement("div");
  $nodesContainer.className = "Nodes";
  $nodeArticle.appendChild($nodesContainer);
  $app.appendChild($nodeArticle);
  var prevBtn = "<div class='node'><img src='./assets/prev.png' /></div>";

  this.render = function () {
    var _this$state = _this.state,
        _this$state$nodes = _this$state.nodes,
        nodes = _this$state$nodes === void 0 ? [] : _this$state$nodes,
        isRoot = _this$state.isRoot;
    var nodesTemplate = nodes.map(function (node) {
      var iconPath = node.type === "FILE" ? "./assets/file.png" : "./assets/directory.png";
      return "<div class='Node' data-index=".concat(node.id, ">\n                        <img src=").concat(iconPath, " alt=").concat(node.type, " />\n                        <div>").concat(node.name, "</div>\n                    </div>");
    }).join("");
    $nodesContainer.innerHTML = isRoot ? nodesTemplate : "".concat(prevBtn).concat(nodesTemplate);
  };

  this.setState = function (nextState) {
    _this.state = nextState;

    _this.render();
  };

  $nodesContainer.addEventListener('click', function (e) {
    var clicckedNode = e.target.closest('.Node');
    var index = clicckedNode.dataset.index;

    if (index) {
      var findNode = _this.state.nodes.find(function (node) {
        return node.id === index;
      });

      _this.onClick(findNode);
    } else {
      _this.prevClick();
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Nodes);

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var IMAGE_PREFIX = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

function ImageView(_ref) {
  var _this = this;

  var $app = _ref.$app,
      initialState = _ref.initialState,
      onClickClose = _ref.onClickClose;
  this.state = initialState;
  this.onClickClose = onClickClose;
  var $imageArticle = document.createElement('article');
  var $imageContainer = document.createElement('div');
  $imageContainer.className = 'Modal ImageViewer';
  $imageArticle.appendChild($imageContainer);
  $app.appendChild($imageArticle);
  $imageContainer.style.display = 'none';

  this.render = function () {
    var imagePath = _this.state.imagePath;
    $imageContainer.innerHTML = imagePath ? "<div class='content'>\n        <img src=".concat(IMAGE_PREFIX).concat(imagePath, " />\n    </div>") : '';
    $imageContainer.style.display = imagePath ? 'block' : 'none';
  };

  this.setState = function (nextState) {
    _this.state = nextState;

    _this.render();
  };

  $imageContainer.addEventListener('click', function (e) {
    var target = e.target.closest('.content');
    $imageContainer.style.display = target !== null ? 'block' : 'none';
    target !== null ? _this.onClickClose(false) : _this.onClickClose(true);
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageView);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Loading(_ref) {
  var _this = this;

  var $app = _ref.$app,
      initialState = _ref.initialState;
  this.state = initialState;
  var $loadingArticle = document.createElement('article');
  var $loadingDiv = document.createElement('div');
  $loadingDiv.className = 'Modal Loading';
  $loadingArticle.appendChild($loadingDiv);
  $app.appendChild($loadingArticle);

  this.render = function () {
    var isLoading = _this.state.isLoading;
    $loadingDiv.innerHTML = "<div class='content'><img src='./assets/nyan-cat.gif' /></div>";
    $loadingDiv.style.display = isLoading ? 'block' : 'none';
  };

  this.setState = function (nextState) {
    _this.state = nextState;

    _this.render();
  };

  this.render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDirectoryData": () => (/* binding */ getDirectoryData)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';
var getDirectoryData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(nodeId) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch("".concat(API_END_POINT, "/").concat(nodeId ? nodeId : ''));

          case 3:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", response.json());

          case 6:
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.warn(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getDirectoryData(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })
/******/ 	]);
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
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_components_App_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

new _src_components_App_js__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector('.App'));
})();

/******/ })()
;