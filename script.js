/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/script.ts":
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonRequest_1 = __webpack_require__(/*! ./utilities/jsonRequest */ "./src/utilities/jsonRequest.ts");
function findClosingBracketIndex(str, pos) {
    if (str[pos] !== "{") {
        throw new Error("The position must contain an opening bracket");
    }
    var level = 1;
    for (var index = pos + 1; index < str.length; index++) {
        if (str[index] === "{") {
            level++;
        } else if (str[index] === "}") {
            level--;
        }
        if (level === 0) {
            return index;
        }
    }
    return -1;
}
loadPagesByTemplate("Service item");
loadPagesByTemplate("Software");
function parseTemplate(content) {
    var obj = {};
    var props = content.split(/\|(?![^{]*})(?![^\[]*\])/g);
    props.shift();
    for (var p in props) {
        var pair = props[p].trim();
        var start = pair.indexOf("=");
        var name_1 = pair.substring(0, start).trim();
        var value = pair.substring(start + 1).trim();
        if (value) obj[name_1] = value;
    }
    console.info(obj);
}
function parsePage(content, template) {
    var start = content.indexOf("{{" + template);
    if (start === -1) return;
    var templateContent = content.substring(start);
    var closing = findClosingBracketIndex(templateContent, 0);
    var rest = templateContent.substring(closing + 1);
    templateContent = templateContent.substring(0, closing + 1);
    templateContent = templateContent.substring(templateContent.indexOf("|"), templateContent.length - 2).trim();
    //console.info(templateContent);
    parseTemplate(templateContent);
    parsePage(rest, template);
}
function loadPages(ids, template) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response, pages, p, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        prop: "revisions",
                        rvprop: "content",
                        pageids: ids.join("|"),
                        rvslots: "*"
                    };
                    return [4 /*yield*/, osmMediaApiQuery(params)];
                case 1:
                    response = _a.sent();
                    pages = response.query.pages;
                    for (p in pages) {
                        content = pages[p].revisions[0].slots.main.content;
                        parsePage(content, template);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function osmMediaApiQuery(params) {
    return __awaiter(this, void 0, void 0, function () {
        var base;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    base = "https://wiki.openstreetmap.org/w/api.php";
                    params["origin"] = "*";
                    params["action"] = "query";
                    params["formatversion"] = "2";
                    params["format"] = "json";
                    return [4 /*yield*/, jsonRequest_1.getJson(base, params)];
                case 1:
                    return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function loadPagesByTemplate(template) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        list: "embeddedin",
                        eititle: "Template:" + template,
                        eilimit: "500"
                    };
                    return [4 /*yield*/, osmMediaApiQuery(params)];
                case 1:
                    response = _a.sent();
                    processPagesByTemplateResult(response, template);
                    return [2 /*return*/];
            }
        });
    });
}
function processPagesByTemplateResult(response, template) {
    if (response.continue && response.continue.eicontinue) loadPagesByTemplatePage(response.continue.eicontinue, template);
    var pages = response.query.embeddedin;
    var ids = [];
    for (var p in pages) {
        if (!/^\w{2}:/g.test(pages[p].title)) ids.push(pages[p].pageid);
        if (ids.length >= 50) {
            loadPages(ids, template);
            ids = [];
        }
    }
    if (ids.length > 0) {
        loadPages(ids, template);
    }
}
function loadPagesByTemplatePage(con, template) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        list: "embeddedin",
                        eititle: "Template:" + template,
                        eicontinue: con,
                        eilimit: "500"
                    };
                    return [4 /*yield*/, osmMediaApiQuery(params)];
                case 1:
                    response = _a.sent();
                    processPagesByTemplateResult(response, template);
                    return [2 /*return*/];
            }
        });
    });
}

/***/ }),

/***/ "./src/utilities/jsonRequest.ts":
/*!**************************************!*\
  !*** ./src/utilities/jsonRequest.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = __webpack_require__(/*! ./url */ "./src/utilities/url.ts");
function getJson(url, params) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, fetch(url + "?" + url_1.utilQsString(params), {
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json"
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getJson = getJson;

/***/ }),

/***/ "./src/utilities/url.ts":
/*!******************************!*\
  !*** ./src/utilities/url.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRegex = /^https?:\/\//i;
function toUrl(url) {
    if (!url) return undefined;
    if (!exports.httpRegex.test(url)) return "http://" + url;
    return url;
}
exports.toUrl = toUrl;
function toWikipediaUrl(wikipedia) {
    if (!wikipedia) return undefined;
    if (exports.httpRegex.test(wikipedia)) return wikipedia;
    return "https://wikipedia.org/wiki/" + wikipedia;
}
exports.toWikipediaUrl = toWikipediaUrl;
function utilQsString(obj, noencode) {
    // encode everything except special characters used in certain hash parameters:
    // "/" in map states, ":", ",", {" and "}" in background
    function softEncode(s) {
        return encodeURIComponent(s).replace(/(%2F|%3A|%2C|%7B|%7D)/g, decodeURIComponent);
    }
    return Object.keys(obj).sort().map(function (key) {
        return encodeURIComponent(key) + "=" + (noencode ? softEncode(obj[key]) : encodeURIComponent(obj[key]));
    }).join("&");
}
exports.utilQsString = utilQsString;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2pzb25SZXF1ZXN0LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvdXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBRUEsU0FBUyx1QkFBVCxDQUFpQyxHQUFqQyxFQUE4QyxHQUE5QyxFQUF5RDtBQUN2RCxRQUFJLElBQUksR0FBSixNQUFhLEdBQWpCLEVBQXNCO0FBQ3BCLGNBQU0sSUFBSSxLQUFKLENBQVUsOENBQVYsQ0FBTjtBQUNEO0FBQ0Qs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SyxDQUFQO0FBSUQ7QUFDRCxXQUFPLE9BQU8sSUFBUCxDQUFZLEdBQVosRUFDSixJQURJLEdBRUosR0FGSSxDQUdILGVBQUc7QUFDRCxlQUFHLG1CQUFtQixHQUFuQixJQUF1QixHQUF2QixJQUNELFdBQVcsV0FBVyxJQUFJLEdBQUosQ0FBWCxDQUFYLEdBQWtDLG1CQUFtQixJQUFJLEdBQUosQ0FBbkIsQ0FEakMsQ0FBSDtBQUVFLEtBTkQsRUFRSixJQVJJLENBUUMsR0FSRCxDQUFQO0FBU0Q7QUFsQkQsb0MiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2NyaXB0LnRzXCIpO1xuIiwiaW1wb3J0IHsgZ2V0SnNvbiB9IGZyb20gXCIuL3V0aWxpdGllcy9qc29uUmVxdWVzdFwiO1xyXG5cclxuZnVuY3Rpb24gZmluZENsb3NpbmdCcmFja2V0SW5kZXgoc3RyOiBzdHJpbmcsIHBvczogbnVtYmVyKSB7XHJcbiAgaWYgKHN0cltwb3NdICE9PSBcIntcIikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHBvc2l0aW9uIG11c3QgY29udGFpbiBhbiBvcGVuaW5nIGJyYWNrZXRcIik7XHJcbiAgfVxyXG4gIGxldCBsZXZlbCA9IDE7XHJcbiAgZm9yIChsZXQgaW5kZXggPSBwb3MgKyAxOyBpbmRleCA8IHN0ci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgIGlmIChzdHJbaW5kZXhdID09PSBcIntcIikge1xyXG4gICAgICBsZXZlbCsrO1xyXG4gICAgfSBlbHNlIGlmIChzdHJbaW5kZXhdID09PSBcIn1cIikge1xyXG4gICAgICBsZXZlbC0tO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZXZlbCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAtMTtcclxufVxyXG5cclxubG9hZFBhZ2VzQnlUZW1wbGF0ZShcIlNlcnZpY2UgaXRlbVwiKTtcclxubG9hZFBhZ2VzQnlUZW1wbGF0ZShcIlNvZnR3YXJlXCIpO1xyXG5cclxuZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZShjb250ZW50OiBzdHJpbmcpIHtcclxuICBjb25zdCBvYmo6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9ID0ge307XHJcbiAgY29uc3QgcHJvcHMgPSBjb250ZW50LnNwbGl0KC9cXHwoPyFbXntdKn0pKD8hW15cXFtdKlxcXSkvZyk7XHJcbiAgcHJvcHMuc2hpZnQoKTtcclxuXHJcbiAgZm9yIChjb25zdCBwIGluIHByb3BzKSB7XHJcbiAgICBjb25zdCBwYWlyID0gcHJvcHNbcF0udHJpbSgpO1xyXG4gICAgY29uc3Qgc3RhcnQgPSBwYWlyLmluZGV4T2YoXCI9XCIpO1xyXG4gICAgY29uc3QgbmFtZSA9IHBhaXIuc3Vic3RyaW5nKDAsIHN0YXJ0KS50cmltKCk7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHBhaXIuc3Vic3RyaW5nKHN0YXJ0ICsgMSkudHJpbSgpO1xyXG5cclxuICAgIGlmICh2YWx1ZSkgb2JqW25hbWVdID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmluZm8ob2JqKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VQYWdlKGNvbnRlbnQ6IHN0cmluZywgdGVtcGxhdGU6IHN0cmluZykge1xyXG4gIGNvbnN0IHN0YXJ0ID0gY29udGVudC5pbmRleE9mKFwie3tcIiArIHRlbXBsYXRlKTtcclxuXHJcbiAgaWYgKHN0YXJ0ID09PSAtMSkgcmV0dXJuO1xyXG5cclxuICBsZXQgdGVtcGxhdGVDb250ZW50ID0gY29udGVudC5zdWJzdHJpbmcoc3RhcnQpO1xyXG5cclxuICBjb25zdCBjbG9zaW5nID0gZmluZENsb3NpbmdCcmFja2V0SW5kZXgodGVtcGxhdGVDb250ZW50LCAwKTtcclxuXHJcbiAgY29uc3QgcmVzdCA9IHRlbXBsYXRlQ29udGVudC5zdWJzdHJpbmcoY2xvc2luZyArIDEpO1xyXG4gIHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlQ29udGVudC5zdWJzdHJpbmcoMCwgY2xvc2luZyArIDEpO1xyXG5cclxuICB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZUNvbnRlbnRcclxuICAgIC5zdWJzdHJpbmcodGVtcGxhdGVDb250ZW50LmluZGV4T2YoXCJ8XCIpLCB0ZW1wbGF0ZUNvbnRlbnQubGVuZ3RoIC0gMilcclxuICAgIC50cmltKCk7XHJcblxyXG4gIC8vY29uc29sZS5pbmZvKHRlbXBsYXRlQ29udGVudCk7XHJcbiAgcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZUNvbnRlbnQpO1xyXG5cclxuICBwYXJzZVBhZ2UocmVzdCwgdGVtcGxhdGUpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkUGFnZXMoaWRzOiBzdHJpbmdbXSwgdGVtcGxhdGU6IHN0cmluZykge1xyXG4gIGNvbnN0IHBhcmFtczogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XHJcbiAgICBwcm9wOiBcInJldmlzaW9uc1wiLFxyXG4gICAgcnZwcm9wOiBcImNvbnRlbnRcIixcclxuICAgIHBhZ2VpZHM6IGlkcy5qb2luKFwifFwiKSxcclxuICAgIHJ2c2xvdHM6IFwiKlwiXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvc21NZWRpYUFwaVF1ZXJ5KHBhcmFtcyk7XHJcblxyXG4gIGNvbnN0IHBhZ2VzID0gcmVzcG9uc2UucXVlcnkucGFnZXM7XHJcbiAgZm9yIChjb25zdCBwIGluIHBhZ2VzKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gcGFnZXNbcF0ucmV2aXNpb25zWzBdLnNsb3RzLm1haW4uY29udGVudDtcclxuXHJcbiAgICBwYXJzZVBhZ2UoY29udGVudCwgdGVtcGxhdGUpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gb3NtTWVkaWFBcGlRdWVyeShwYXJhbXM6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9KSB7XHJcbiAgY29uc3QgYmFzZSA9IFwiaHR0cHM6Ly93aWtpLm9wZW5zdHJlZXRtYXAub3JnL3cvYXBpLnBocFwiO1xyXG5cclxuICBwYXJhbXNbXCJvcmlnaW5cIl0gPSBcIipcIjtcclxuICBwYXJhbXNbXCJhY3Rpb25cIl0gPSBcInF1ZXJ5XCI7XHJcbiAgcGFyYW1zW1wiZm9ybWF0dmVyc2lvblwiXSA9IFwiMlwiO1xyXG4gIHBhcmFtc1tcImZvcm1hdFwiXSA9IFwianNvblwiO1xyXG5cclxuICByZXR1cm4gYXdhaXQgZ2V0SnNvbihiYXNlLCBwYXJhbXMpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkUGFnZXNCeVRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcpIHtcclxuICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICBsaXN0OiBcImVtYmVkZGVkaW5cIixcclxuICAgIGVpdGl0bGU6IFwiVGVtcGxhdGU6XCIgKyB0ZW1wbGF0ZSxcclxuICAgIGVpbGltaXQ6IFwiNTAwXCJcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9zbU1lZGlhQXBpUXVlcnkocGFyYW1zKTtcclxuXHJcbiAgcHJvY2Vzc1BhZ2VzQnlUZW1wbGF0ZVJlc3VsdChyZXNwb25zZSwgdGVtcGxhdGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzUGFnZXNCeVRlbXBsYXRlUmVzdWx0KFxyXG4gIHJlc3BvbnNlOiB7IGNvbnRpbnVlOiB7IGVpY29udGludWU6IGFueSB9OyBxdWVyeTogeyBlbWJlZGRlZGluOiBhbnkgfSB9LFxyXG4gIHRlbXBsYXRlOiBzdHJpbmdcclxuKSB7XHJcbiAgaWYgKHJlc3BvbnNlLmNvbnRpbnVlICYmIHJlc3BvbnNlLmNvbnRpbnVlLmVpY29udGludWUpXHJcbiAgICBsb2FkUGFnZXNCeVRlbXBsYXRlUGFnZShyZXNwb25zZS5jb250aW51ZS5laWNvbnRpbnVlLCB0ZW1wbGF0ZSk7XHJcbiAgY29uc3QgcGFnZXMgPSByZXNwb25zZS5xdWVyeS5lbWJlZGRlZGluO1xyXG4gIGxldCBpZHMgPSBbXTtcclxuICBmb3IgKGNvbnN0IHAgaW4gcGFnZXMpIHtcclxuICAgIGlmICghL15cXHd7Mn06L2cudGVzdChwYWdlc1twXS50aXRsZSkpIGlkcy5wdXNoKHBhZ2VzW3BdLnBhZ2VpZCk7XHJcblxyXG4gICAgaWYgKGlkcy5sZW5ndGggPj0gNTApIHtcclxuICAgICAgbG9hZFBhZ2VzKGlkcywgdGVtcGxhdGUpO1xyXG4gICAgICBpZHMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChpZHMubGVuZ3RoID4gMCkge1xyXG4gICAgbG9hZFBhZ2VzKGlkcywgdGVtcGxhdGUpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2VzQnlUZW1wbGF0ZVBhZ2UoY29uOiBzdHJpbmcsIHRlbXBsYXRlOiBzdHJpbmcpIHtcclxuICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICBsaXN0OiBcImVtYmVkZGVkaW5cIixcclxuICAgIGVpdGl0bGU6IFwiVGVtcGxhdGU6XCIgKyB0ZW1wbGF0ZSxcclxuICAgIGVpY29udGludWU6IGNvbixcclxuICAgIGVpbGltaXQ6IFwiNTAwXCJcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9zbU1lZGlhQXBpUXVlcnkocGFyYW1zKTtcclxuXHJcbiAgcHJvY2Vzc1BhZ2VzQnlUZW1wbGF0ZVJlc3VsdChyZXNwb25zZSwgdGVtcGxhdGUpO1xyXG59XHJcbiIsImltcG9ydCB7IHV0aWxRc1N0cmluZyB9IGZyb20gXCIuL3VybFwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEpzb24odXJsOiBzdHJpbmcsIHBhcmFtczogYW55KSB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9PyR7dXRpbFFzU3RyaW5nKHBhcmFtcyl9YCwge1xyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qXCIsXHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGh0dHBSZWdleCA9IC9eaHR0cHM/OlxcL1xcLy9pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvVXJsKHVybDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgaWYgKCF1cmwpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gIGlmICghaHR0cFJlZ2V4LnRlc3QodXJsKSkgcmV0dXJuIGBodHRwOi8vJHt1cmx9YDtcclxuXHJcbiAgcmV0dXJuIHVybDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvV2lraXBlZGlhVXJsKHdpa2lwZWRpYTogc3RyaW5nKSB7XHJcbiAgaWYgKCF3aWtpcGVkaWEpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gIGlmIChodHRwUmVnZXgudGVzdCh3aWtpcGVkaWEpKSByZXR1cm4gd2lraXBlZGlhO1xyXG5cclxuICByZXR1cm4gYGh0dHBzOi8vd2lraXBlZGlhLm9yZy93aWtpLyR7d2lraXBlZGlhfWA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1dGlsUXNTdHJpbmcob2JqOiBhbnksIG5vZW5jb2RlPzogYm9vbGVhbikge1xyXG4gIC8vIGVuY29kZSBldmVyeXRoaW5nIGV4Y2VwdCBzcGVjaWFsIGNoYXJhY3RlcnMgdXNlZCBpbiBjZXJ0YWluIGhhc2ggcGFyYW1ldGVyczpcclxuICAvLyBcIi9cIiBpbiBtYXAgc3RhdGVzLCBcIjpcIiwgXCIsXCIsIHtcIiBhbmQgXCJ9XCIgaW4gYmFja2dyb3VuZFxyXG4gIGZ1bmN0aW9uIHNvZnRFbmNvZGUoczogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzKS5yZXBsYWNlKFxyXG4gICAgICAvKCUyRnwlM0F8JTJDfCU3QnwlN0QpL2csXHJcbiAgICAgIGRlY29kZVVSSUNvbXBvbmVudFxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcclxuICAgIC5zb3J0KClcclxuICAgIC5tYXAoXHJcbiAgICAgIGtleSA9PlxyXG4gICAgICAgIGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke1xyXG4gICAgICAgICAgbm9lbmNvZGUgPyBzb2Z0RW5jb2RlKG9ialtrZXldKSA6IGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSlcclxuICAgICAgICB9YFxyXG4gICAgKVxyXG4gICAgLmpvaW4oXCImXCIpO1xyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9