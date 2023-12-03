/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./data/addApp.ts":
/*!************************!*\
  !*** ./data/addApp.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addApp: () => (/* binding */ addApp)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _ui_utilities_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/utilities/array */ "./ui/utilities/array.ts");
/* harmony import */ var _ui_utilities_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/utilities/string */ "./ui/utilities/string.ts");
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../script */ "./script.ts");




function addApp(obj) {
  var duplicates = _script__WEBPACK_IMPORTED_MODULE_3__.apps.filter(function (app) {
    return (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_2__.equalsIgnoreCase)(app.name, obj.name) || app.website && obj.website && (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_2__.equalsIgnoreCase)(app.website, obj.website);
  });
  if (duplicates.length === 0) {
    _script__WEBPACK_IMPORTED_MODULE_3__.apps.push(obj);
    (0,_script__WEBPACK_IMPORTED_MODULE_3__.extendFilter)(obj);
  } else {
    var _app$images, _app$languages, _app$coverage, _app$topics, _app$platform;
    var app = duplicates[0];
    if (app.lastRelease && obj.lastRelease && app.lastRelease < obj.lastRelease) app.lastRelease = obj.lastRelease;else app.lastRelease = app.lastRelease || obj.lastRelease;
    app.description = app.description || obj.description;
    (_app$images = app.images).push.apply(_app$images, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(obj.images));
    app.images = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_1__.removeDuplicates)(app.images);
    app.imageWiki = app.imageWiki || obj.imageWiki;
    (_app$languages = app.languages).push.apply(_app$languages, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(obj.languages));
    app.languages = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_1__.removeDuplicates)(app.languages);
    (_app$coverage = app.coverage).push.apply(_app$coverage, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(obj.coverage));
    app.coverage = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_1__.removeDuplicates)(app.coverage);
    (_app$topics = app.topics).push.apply(_app$topics, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(obj.topics));
    app.topics = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_1__.removeDuplicates)(app.topics);
    (_app$platform = app.platform).push.apply(_app$platform, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(obj.platform));
    app.platform = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_1__.removeDuplicates)(app.platform);
    app.website = app.website || obj.website;
    if (!app.documentation) {
      app.documentation = obj.documentation;
    } else if (/List.of.OSM.based.services/gi.test(app.documentation)) {
      app.documentation = obj.documentation || app.documentation;
    }

    // make the first source the newest
    if (app.source[0].lastChange.toUpperCase() > obj.source[0].lastChange.toUpperCase()) {
      app.source = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(app.source), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(obj.source));
    } else {
      app.source = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(obj.source), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(app.source));
    }
    app.author = app.author || obj.author;
    app.sourceCode = app.sourceCode || obj.sourceCode;
    app.install.asin = app.install.asin || obj.install.asin;
    app.install.fDroidID = app.install.fDroidID || obj.install.fDroidID;
    app.install.googlePlayID = app.install.googlePlayID || obj.install.googlePlayID;
    app.install.huaweiAppGalleryID = app.install.huaweiAppGalleryID || obj.install.huaweiAppGalleryID;
    app.install.appleStoreID = app.install.appleStoreID || obj.install.appleStoreID;
    app.install.macAppStoreID = app.install.macAppStoreID || obj.install.macAppStoreID;
    app.install.microsoftAppID = app.install.microsoftAppID || obj.install.microsoftAppID;
    (0,_script__WEBPACK_IMPORTED_MODULE_3__.extendFilter)(app);
  }
}

/***/ }),

/***/ "./data/loadApps.ts":
/*!**************************!*\
  !*** ./data/loadApps.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadApps: () => (/* binding */ loadApps)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _template_crawler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template/crawler */ "./data/template/crawler.ts");
/* harmony import */ var _template_software__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template/software */ "./data/template/software.ts");
/* harmony import */ var _template_serviceItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template/serviceItem */ "./data/template/serviceItem.ts");
/* harmony import */ var _template_layer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template/layer */ "./data/template/layer.ts");
/* harmony import */ var _ui_utilities_array__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ui/utilities/array */ "./ui/utilities/array.ts");
/* harmony import */ var _ui_utilities_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ui/utilities/string */ "./ui/utilities/string.ts");
/* harmony import */ var _template_utilities__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./template/utilities */ "./data/template/utilities.ts");
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../script */ "./script.ts");
/* harmony import */ var _addApp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./addApp */ "./data/addApp.ts");


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }









function loadApps(_x) {
  return _loadApps.apply(this, arguments);
}
function _loadApps() {
  _loadApps = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(doUpdate) {
    var language,
      serviceItemObjectsRequest,
      layerObjectsRequest,
      softwareObjectsRequest,
      serviceItemObjects,
      _iterator,
      _step,
      _source,
      obj,
      layerObjects,
      _iterator2,
      _step2,
      _source2,
      _obj,
      softwareObjects,
      _iterator3,
      _step3,
      _source3,
      _obj2,
      projectObjects,
      source,
      _iterator4,
      _step4,
      _obj3,
      app,
      _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          language = _args.length > 1 && _args[1] !== undefined ? _args[1] : "en";
          serviceItemObjectsRequest = (0,_template_crawler__WEBPACK_IMPORTED_MODULE_2__.requestTemplates)("Service item", language);
          layerObjectsRequest = (0,_template_crawler__WEBPACK_IMPORTED_MODULE_2__.requestTemplates)("Layer", language);
          softwareObjectsRequest = (0,_template_crawler__WEBPACK_IMPORTED_MODULE_2__.requestTemplates)("Software", language);
          _context.next = 6;
          return serviceItemObjectsRequest;
        case 6:
          serviceItemObjects = _context.sent;
          _iterator = _createForOfIteratorHelper(serviceItemObjects.filter(function (s) {
            return !(0,_template_utilities__WEBPACK_IMPORTED_MODULE_8__.containsOfflineLink)(s["name"]);
          }));
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _source = _step.value;
              obj = (0,_template_serviceItem__WEBPACK_IMPORTED_MODULE_4__.transform)(_source);
              (0,_addApp__WEBPACK_IMPORTED_MODULE_10__.addApp)(obj);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_6__.shuffle)(_script__WEBPACK_IMPORTED_MODULE_9__.apps);
          doUpdate(_script__WEBPACK_IMPORTED_MODULE_9__.apps);
          _context.next = 13;
          return layerObjectsRequest;
        case 13:
          layerObjects = _context.sent;
          _iterator2 = _createForOfIteratorHelper(layerObjects.filter(function (s) {
            return !(0,_template_utilities__WEBPACK_IMPORTED_MODULE_8__.containsOfflineLink)(s["name"]) && !(0,_template_utilities__WEBPACK_IMPORTED_MODULE_8__.containsOfflineLink)(s["slippy_web"]) && !(0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_7__.equalsYes)(s["discontinued"]);
          }));
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              _source2 = _step2.value;
              _obj = (0,_template_layer__WEBPACK_IMPORTED_MODULE_5__.transform)(_source2);
              (0,_addApp__WEBPACK_IMPORTED_MODULE_10__.addApp)(_obj);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          doUpdate(_script__WEBPACK_IMPORTED_MODULE_9__.apps);
          _context.next = 19;
          return softwareObjectsRequest;
        case 19:
          softwareObjects = _context.sent;
          _iterator3 = _createForOfIteratorHelper(softwareObjects.filter(function (s) {
            return !(0,_template_utilities__WEBPACK_IMPORTED_MODULE_8__.containsOfflineLink)(s["name"]) && !(0,_template_utilities__WEBPACK_IMPORTED_MODULE_8__.containsOfflineLink)(s["web"]) && !(0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_7__.equalsIgnoreCase)(s["status"], "unfinished") && !(0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_7__.equalsIgnoreCase)(s["status"], "unmaintained") && !(0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_7__.equalsIgnoreCase)(s["status"], "broken");
          }));
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              _source3 = _step3.value;
              _obj2 = (0,_template_software__WEBPACK_IMPORTED_MODULE_3__.transform)(_source3);
              (0,_addApp__WEBPACK_IMPORTED_MODULE_10__.addApp)(_obj2);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          doUpdate(_script__WEBPACK_IMPORTED_MODULE_9__.apps);
          projectObjects = window.tagInfoProjectsResponse;
          source = "https://taginfo.openstreetmap.org/projects";
          _iterator4 = _createForOfIteratorHelper(projectObjects.data);
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              _obj3 = _step4.value;
              app = {
                name: _obj3.name,
                website: _obj3.project_url,
                images: _obj3.icon_url ? [_obj3.icon_url] : [],
                documentation: _obj3.doc_url,
                source: [{
                  name: "taginfo",
                  displayName: "taginfo",
                  url: source,
                  lastChange: projectObjects.data_until
                }],
                description: _obj3.description,
                topics: [],
                languages: [],
                platform: [],
                coverage: [],
                install: {}
              };
              (0,_addApp__WEBPACK_IMPORTED_MODULE_10__.addApp)(app);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          doUpdate(_script__WEBPACK_IMPORTED_MODULE_9__.apps);
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _loadApps.apply(this, arguments);
}

/***/ }),

/***/ "./data/template/crawler.ts":
/*!**********************************!*\
  !*** ./data/template/crawler.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   requestTemplates: () => (/* binding */ requestTemplates)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ui_utilities_jsonRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui/utilities/jsonRequest */ "./ui/utilities/jsonRequest.ts");
/* harmony import */ var _ui_utilities_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui/utilities/string */ "./ui/utilities/string.ts");


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.



function requestTemplates(_x, _x2) {
  return _requestTemplates.apply(this, arguments);
}
function _requestTemplates() {
  _requestTemplates = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(template, language) {
    var objects, con, _response$continue, params, response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          objects = [];
        case 1:
          params = {
            list: "embeddedin",
            eititle: "Template:" + template,
            eilimit: "500"
          };
          if (con) params.eicontinue = con;
          _context.next = 5;
          return osmMediaApiQuery(params);
        case 5:
          response = _context.sent;
          _context.t0 = objects.push;
          _context.t1 = objects;
          _context.t2 = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"];
          _context.next = 11;
          return processPagesByTemplateResult(response, template, language);
        case 11:
          _context.t3 = _context.sent;
          _context.t4 = (0, _context.t2)(_context.t3);
          _context.t0.apply.call(_context.t0, _context.t1, _context.t4);
          con = (_response$continue = response["continue"]) === null || _response$continue === void 0 ? void 0 : _response$continue.eicontinue;
        case 15:
          if (con) {
            _context.next = 1;
            break;
          }
        case 16:
          return _context.abrupt("return", objects);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _requestTemplates.apply(this, arguments);
}
function osmMediaApiQuery(_x3) {
  return _osmMediaApiQuery.apply(this, arguments);
}
function _osmMediaApiQuery() {
  _osmMediaApiQuery = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2(params) {
    var base;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          base = "https://wiki.openstreetmap.org/w/api.php";
          params["origin"] = "*";
          params["action"] = "query";
          params["formatversion"] = "2";
          params["format"] = "json";
          _context2.next = 7;
          return (0,_ui_utilities_jsonRequest__WEBPACK_IMPORTED_MODULE_3__.getJson)(base, params);
        case 7:
          return _context2.abrupt("return", _context2.sent);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _osmMediaApiQuery.apply(this, arguments);
}
function processPagesByTemplateResult(_x4, _x5, _x6) {
  return _processPagesByTemplateResult.apply(this, arguments);
}
function _processPagesByTemplateResult() {
  _processPagesByTemplateResult = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3(response, template, language) {
    var pages, objects, ids, p;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          pages = response.query.embeddedin;
          objects = [];
          ids = [];
          _context3.t0 = _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().keys(pages);
        case 4:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 19;
            break;
          }
          p = _context3.t1.value;
          if (language === "en") {
            if (!/^(af|ast|az|id|ms|bs|br|ca|cs|da|de|et|en|es|eo|eu|fr|fy|gl|hr|ia|is|it|ht|gcf|ku|lv|lb|lt|hu|nl|no|nn|oc|pl|pt|ro|sq|sk|sl|sr-latn|fi|sv|tl|vi|tr|diq|el|be|bg|mk|mn|ru|sr|uk|hy|he|ar|fa|ps|ne|bn|ta|ml|si|th|my|ka|ko|tzm|zh-hans|zh-hant|ja|yue):/gi.test(pages[p].title)) ids.push(pages[p].pageid);
          } else if (new RegExp("^".concat(language, ":"), "ig").test(pages[p].title)) ids.push(pages[p].pageid);
          if (!(ids.length >= 50)) {
            _context3.next = 17;
            break;
          }
          _context3.t2 = objects.push;
          _context3.t3 = objects;
          _context3.t4 = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"];
          _context3.next = 13;
          return loadPages(ids, template);
        case 13:
          _context3.t5 = _context3.sent;
          _context3.t6 = (0, _context3.t4)(_context3.t5);
          _context3.t2.apply.call(_context3.t2, _context3.t3, _context3.t6);
          ids = [];
        case 17:
          _context3.next = 4;
          break;
        case 19:
          if (!(ids.length > 0)) {
            _context3.next = 28;
            break;
          }
          _context3.t7 = objects.push;
          _context3.t8 = objects;
          _context3.t9 = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"];
          _context3.next = 25;
          return loadPages(ids, template);
        case 25:
          _context3.t10 = _context3.sent;
          _context3.t11 = (0, _context3.t9)(_context3.t10);
          _context3.t7.apply.call(_context3.t7, _context3.t8, _context3.t11);
        case 28:
          return _context3.abrupt("return", objects);
        case 29:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _processPagesByTemplateResult.apply(this, arguments);
}
function loadPages(_x7, _x8) {
  return _loadPages.apply(this, arguments);
}
function _loadPages() {
  _loadPages = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee4(ids, template) {
    var params, response, pages, objects, p, content, pageObjects, _iterator, _step, o;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = {
            prop: "revisions",
            rvprop: "content|timestamp",
            pageids: ids.join("|"),
            rvslots: "*"
          };
          _context4.next = 3;
          return osmMediaApiQuery(params);
        case 3:
          response = _context4.sent;
          pages = response.query.pages;
          objects = [];
          for (p in pages) {
            content = pages[p].revisions[0].slots.main.content;
            pageObjects = parsePage(content, template);
            _iterator = _createForOfIteratorHelper(pageObjects);
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                o = _step.value;
                o.sourceWiki = pages[p].title;
                o.timestamp = pages[p].revisions[0].timestamp;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            objects.push.apply(objects, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(pageObjects));
          }
          return _context4.abrupt("return", objects);
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _loadPages.apply(this, arguments);
}
function parsePage(content, template) {
  var objects = [];
  content = content.replace(/(<!--.*?-->)|(<!--[\w\W\n\s]+?-->)/g, "");
  var regexTemplate = new RegExp("{{" + template.replace(" ", "[_ ]"), "gi");
  var start = content.search(regexTemplate);
  while (start !== -1) {
    var templateContent = content.substring(start);
    var closing = (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_4__.findClosingBracketIndex)(templateContent, 0);
    content = templateContent.substring(closing + 1);
    templateContent = templateContent.substring(0, closing + 1);
    templateContent = templateContent.substring(templateContent.indexOf("|"), templateContent.length - 2).trim();
    objects.push(parseTemplateToObject(templateContent));
    start = content.search(regexTemplate);
  }
  return objects;
}
function parseTemplateToObject(content) {
  var obj = {};
  var props = content.split(/\|(?![^{]*})(?![^\[]*\])/g);
  props.shift();
  for (var p in props) {
    var pair = props[p].trim();
    var start = pair.indexOf("=");
    var _name = pair.substring(0, start).trim();
    var value = pair.substring(start + 1).trim();
    if (value) obj[_name] = value;
  }
  return obj;
}

/***/ }),

/***/ "./data/template/layer.ts":
/*!********************************!*\
  !*** ./data/template/layer.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transform: () => (/* binding */ transform)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _ui_utilities_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui/utilities/image */ "./ui/utilities/image.ts");
/* harmony import */ var _ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ui/utilities/url */ "./ui/utilities/url.ts");
/* harmony import */ var _ui_language__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui/language */ "./ui/language.ts");
/* harmony import */ var _ui_utilities_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui/utilities/array */ "./ui/utilities/array.ts");
/* harmony import */ var _ui_utilities_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ui/utilities/string */ "./ui/utilities/string.ts");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utilities */ "./data/template/utilities.ts");

// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.







function transform(source) {
  var obj = {
    name: (0,_utilities__WEBPACK_IMPORTED_MODULE_6__.extractNameWebsiteWiki)(source["name"], source.sourceWiki).name,
    lastRelease: (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_5__.toDate)(source["date"]) || "",
    description: (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_5__.appendFullStop)((0,_utilities__WEBPACK_IMPORTED_MODULE_6__.processWikiText)(source["description"] || "")),
    images: [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_ui_utilities_image__WEBPACK_IMPORTED_MODULE_1__.toWikimediaUrl)(source["screenshot"], 250)), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_ui_utilities_image__WEBPACK_IMPORTED_MODULE_1__.toWikimediaUrl)(source["logo"], 250))),
    imageWiki: source["screenshot"] || source["logo"],
    website: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__.toUrl)((0,_utilities__WEBPACK_IMPORTED_MODULE_6__.extractWebsite)(source["slippy_web"])),
    documentation: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__.toWikiUrl)(source.sourceWiki) || "",
    source: [{
      name: "Layer",
      wiki: source.sourceWiki,
      displayName: "Wiki (Layer) <i class=\"fas fa-pen\"></i>",
      url: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__.toWikiUrl)(source.sourceWiki) || "",
      lastChange: source["timestamp"] || ""
    }],
    sourceCode: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__.toUrl)((0,_utilities__WEBPACK_IMPORTED_MODULE_6__.extractRepo)(source["repo"])),
    author: (0,_utilities__WEBPACK_IMPORTED_MODULE_6__.processWikiText)(source["author"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_6__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_5__.trim).filter(function (v) {
      return v;
    }).join(", "),
    languages: (source["tiles_languages"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_6__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_5__.trim).filter(function (v) {
      return v;
    }).map(function (v) {
      return (0,_ui_language__WEBPACK_IMPORTED_MODULE_3__.languageValueToDisplay)(v);
    }),
    languagesUrl: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__.toUrl)(source["tiles_languagesurl"]),
    topics: [],
    platform: ["Web"],
    coverage: [],
    install: {},
    license: (0,_utilities__WEBPACK_IMPORTED_MODULE_6__.processWikiText)(source["tiles_license"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_6__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_5__.trim).filter(function (v) {
      return v;
    }).join(", ")
  };
  obj.languages = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_4__.removeDuplicates)(obj.languages).sort();
  return obj;
}

/***/ }),

/***/ "./data/template/serviceItem.ts":
/*!**************************************!*\
  !*** ./data/template/serviceItem.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transform: () => (/* binding */ transform)
/* harmony export */ });
/* harmony import */ var _ui_utilities_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui/utilities/image */ "./ui/utilities/image.ts");
/* harmony import */ var _ui_utilities_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui/utilities/url */ "./ui/utilities/url.ts");
/* harmony import */ var _ui_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ui/language */ "./ui/language.ts");
/* harmony import */ var _ui_utilities_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui/utilities/array */ "./ui/utilities/array.ts");
/* harmony import */ var _ui_utilities_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui/utilities/string */ "./ui/utilities/string.ts");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities */ "./data/template/utilities.ts");
// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.







function transform(source) {
  var obj = {
    name: (0,_utilities__WEBPACK_IMPORTED_MODULE_5__.extractNameWebsiteWiki)(source["name"], source.sourceWiki).name,
    description: (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_4__.appendFullStop)((0,_utilities__WEBPACK_IMPORTED_MODULE_5__.processWikiText)(source["descr"] || "")),
    images: (0,_ui_utilities_image__WEBPACK_IMPORTED_MODULE_0__.toWikimediaUrl)(source["image"], 250),
    imageWiki: source["image"],
    source: [{
      name: "ServiceItem",
      wiki: source.sourceWiki,
      displayName: "Wiki (ServiceItem) <i class=\"fas fa-pen\"></i>",
      url: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_1__.toWikiUrl)(source.sourceWiki) || "",
      lastChange: source["timestamp"] || ""
    }],
    sourceCode: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_1__.toUrl)((0,_utilities__WEBPACK_IMPORTED_MODULE_5__.extractWebsite)(source["material"])),
    libre: (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_4__.startsWithIgnoreCase)(source["material"], "{{yes"),
    languages: (source["lang"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_5__.splitByCommaButNotInsideBraceRegex).map(_utilities__WEBPACK_IMPORTED_MODULE_5__.extractLanguageCodeFromTemplate).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_4__.trim).filter(function (v) {
      return v;
    }).map(function (v) {
      return (0,_ui_language__WEBPACK_IMPORTED_MODULE_2__.languageValueToDisplay)(v);
    }),
    languagesUrl: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_1__.toUrl)((0,_utilities__WEBPACK_IMPORTED_MODULE_5__.extractWebsite)(source["lang"])),
    topics: (source["genre"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_5__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_4__.trim).filter(function (v) {
      return v;
    }).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_4__.firstLetterToUpperCase).sort(),
    platform: [],
    coverage: [],
    install: {}
  };
  if (source["region"]) {
    obj.coverage.push(source["region"].split(_utilities__WEBPACK_IMPORTED_MODULE_5__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_4__.trim).filter(function (v) {
      return v;
    }).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_4__.firstLetterToUpperCase).join(", "));
  }
  obj.languages = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_3__.removeDuplicates)(obj.languages).sort();
  obj.coverage = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_3__.removeDuplicates)(obj.coverage).sort();
  obj.topics = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_3__.removeDuplicates)(obj.topics).sort();
  var name = (0,_utilities__WEBPACK_IMPORTED_MODULE_5__.extractNameWebsiteWiki)(source["name"], source.sourceWiki);
  obj.name = name.name || obj.name;
  obj.website = name.website;
  obj.documentation = name.wiki || obj.documentation;
  return obj;
}

/***/ }),

/***/ "./data/template/software.ts":
/*!***********************************!*\
  !*** ./data/template/software.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transform: () => (/* binding */ transform)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _ui_utilities_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui/utilities/image */ "./ui/utilities/image.ts");
/* harmony import */ var _ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ui/utilities/url */ "./ui/utilities/url.ts");
/* harmony import */ var _ui_platform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui/platform */ "./ui/platform.ts");
/* harmony import */ var _ui_language__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui/language */ "./ui/language.ts");
/* harmony import */ var _ui_utilities_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ui/utilities/array */ "./ui/utilities/array.ts");
/* harmony import */ var _ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ui/utilities/string */ "./ui/utilities/string.ts");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utilities */ "./data/template/utilities.ts");

// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.








function transform(source) {
  var _source$license, _obj$topics, _obj$topics2, _obj$topics3;
  var obj = {
    name: (0,_utilities__WEBPACK_IMPORTED_MODULE_7__.extractNameWebsiteWiki)(source["name"], source.sourceWiki).name,
    lastRelease: (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.toDate)(source["date"]) || "",
    description: (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.appendFullStop)((0,_utilities__WEBPACK_IMPORTED_MODULE_7__.processWikiText)(source["description"] || "")),
    images: [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_ui_utilities_image__WEBPACK_IMPORTED_MODULE_1__.toWikimediaUrl)(source["screenshot"], 250)), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_ui_utilities_image__WEBPACK_IMPORTED_MODULE_1__.toWikimediaUrl)(source["logo"], 250))),
    imageWiki: source["screenshot"] || source["logo"],
    website: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__.toUrl)(source["web"]),
    documentation: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__.toWikiUrl)(source["wiki"] || source.sourceWiki) || "",
    source: [{
      name: "Software",
      wiki: source.sourceWiki,
      displayName: "Wiki (Software) <i class=\"fas fa-pen\"></i>",
      url: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__.toWikiUrl)(source.sourceWiki) || "",
      lastChange: source["timestamp"] || ""
    }],
    author: (0,_utilities__WEBPACK_IMPORTED_MODULE_7__.processWikiText)(source["author"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
      return v;
    }).join(", "),
    sourceCode: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__.toUrl)((0,_utilities__WEBPACK_IMPORTED_MODULE_7__.extractRepo)(source["repo"] || source["git"] || source["svn"])),
    gratis: (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_5__.some)([source["price"]], ["gratis", "free", "0"]),
    libre: !!((_source$license = source["license"]) !== null && _source$license !== void 0 && _source$license.match("(?:.*GPL.*|Apache.*|.*BSD.*|PD|WTFPL|Ms-PL.*)")),
    price: source["price"],
    license: (0,_utilities__WEBPACK_IMPORTED_MODULE_7__.processWikiText)(source["license"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
      return v;
    }).join(", "),
    languages: (source["languages"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
      return v;
    }).map(function (v) {
      return (0,_ui_language__WEBPACK_IMPORTED_MODULE_4__.languageValueToDisplay)(v);
    }),
    languagesUrl: (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_2__.toUrl)(source["languagesurl"]),
    topics: toValues(source["genre"]),
    platform: (source["platform"] || "").replace(/\[\[/g, "").replace(/\]\]/g, "").split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
      return v;
    }).map(function (v) {
      return (0,_ui_platform__WEBPACK_IMPORTED_MODULE_3__.platformValueToDisplay)(v);
    }),
    coverage: [],
    install: {
      asin: source["asin"],
      fDroidID: source["fDroidID"],
      googlePlayID: source["googlePlayID"],
      huaweiAppGalleryID: source["huaweiAppGalleryID"],
      appleStoreID: source["appleStoreID"],
      macAppStoreID: source["macAppStoreID"],
      microsoftAppID: source["microsoftAppID"]
    },
    map: {
      map: toValues(source["map"]),
      mapData: toValues(source["mapData"]),
      datasource: toValues(source["datasource"]),
      rotateMap: toValues(source["rotateMap"]),
      "3D": toValues(source["3D"]),
      showWebsite: toValues(source["showWebsite"]),
      showPhoneNumber: toValues(source["showPhoneNumber"]),
      showOpeningHours: toValues(source["showOpeningHours"])
    },
    routing: {
      routing: toValues(source["routing"]),
      createRouteManually: toValues(source["createRouteManually"]),
      calculateRoute: toValues(source["calculateRoute"]),
      createRouteViaWaypoints: toValues(source["createRouteViaWaypoints"]),
      profiles: toValues(source["profiles"]),
      turnRestrictions: toValues(source["turnRestrictions"]),
      calculateRouteOffline: toValues(source["calculateRouteOffline"]),
      routingProviders: toValues(source["routingProviders"]),
      avoidTraffic: toValues(source["avoidTraffic"]),
      trafficProvider: toValues(source["trafficProvider"])
    },
    navigating: {
      navigating: toValues(source["navigating"]),
      findLocation: toValues(source["findLocation"]),
      findNearbyPOI: toValues(source["findNearbyPOI"]),
      navToPoint: toValues(source["navToPoint"]),
      voice: toValues(source["voice"]),
      keepOnRoad: toValues(source["keepOnRoad"]),
      turnLanes: toValues(source["turnLanes"]),
      withoutGPS: toValues(source["withoutGPS"]),
      predefinedRoute: toValues(source["predefinedRoute"])
    },
    tracking: {
      tracking: toValues(source["tracking"]),
      customInterval: toValues(source["customInterval"]),
      trackFormats: toValues(source["trackFormats"]),
      geotagging: toValues(source["geotagging"]),
      fastWayPointAdding: toValues(source["fastWayPointAdding"]),
      uploadGPX: toValues(source["uploadGPX"])
    },
    monitoring: {
      monitoring: toValues(source["monitoring"]),
      showTrack: toValues(source["showTrack"]),
      showExistingTrack: toValues(source["showExistingTrack"]),
      showAltitudeDiagram: toValues(source["showAltitudeDiagram"]),
      showDOP: toValues(source["showDOP"]),
      showSatellites: toValues(source["showSatellites"]),
      showNMEAlive: toValues(source["showNMEAlive"]),
      showSpeed: toValues(source["showSpeed"]),
      sendPosition: toValues(source["sendPosition"])
    },
    editing: {
      addPOI: toValues(source["addPOI"]),
      editPOI: toValues(source["editPOI"]),
      addWay: toValues(source["addWay"]),
      editGeom: toValues(source["editGeom"]),
      editTags: toValues(source["editTags"]),
      editRelations: toValues(source["editRelations"]),
      viewNotes: toValues(source["viewNotes"]),
      createNotes: toValues(source["createNotes"]),
      editNotes: toValues(source["editNotes"]),
      editSource: toValues(source["editSource"]),
      offsetDBsupport: toValues(source["offsetDBsupport"]),
      uploadOSMData: toValues(source["uploadOSMData"])
    },
    rendering: {
      rendererOutputFormats: toValues(source["rendererOutputFormats"])
    },
    accessibility: {
      accessibility: toValues(source["accessibility"]),
      textOnlyUI: toValues(source["textOnlyUI"]),
      brailleUI: toValues(source["brailleUI"]),
      explorerMode: toValues(source["explorerMode"]),
      publicTransportMode: toValues(source["publicTransportMode"]),
      dangerWarnings: toValues(source["dangerWarnings"]),
      screenReader: toValues(source["screenReader"]),
      screenReaderLang: (source["screenReaderLang"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
        return v;
      }).map(function (v) {
        return (0,_ui_language__WEBPACK_IMPORTED_MODULE_4__.languageValueToDisplay)(v);
      })
    }
  };
  if (source["coverage"]) {
    var coverage = source["coverage"].split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
      return v;
    }).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.firstLetterToUpperCase);
    var entry = [];
    for (var index = 0; index < coverage.length; index++) {
      entry.push(coverage[index]);
      obj.coverage.push(entry.join(", "));
    }
  }
  obj.platform = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_5__.removeDuplicates)(obj.platform).sort();
  obj.languages = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_5__.removeDuplicates)(obj.languages).sort();
  obj.coverage = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_5__.removeDuplicates)(obj.coverage).sort();
  if (hasValue(source["datasource"])) (_obj$topics = obj.topics).push.apply(_obj$topics, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((source["datasource"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
    return v;
  }).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.firstLetterToUpperCase)));
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["3D"])) obj.topics.push("3D");
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["showWebsite"], source["showPhoneNumber"], source["showOpeningHours"], source["findNearbyPOI"])) obj.topics.push("POI");
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["routing"], source["createRouteManually"], source["calculateRoute"], source["calculateRouteOffline"])) obj.topics.push("Routing");
  if (hasValue(source["profiles"])) (_obj$topics2 = obj.topics).push.apply(_obj$topics2, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((source["profiles"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
    return v;
  }).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.firstLetterToUpperCase)));
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["navigating"], source["navToPoint"])) obj.topics.push("Navi");
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["findLocation"])) obj.topics.push("Search");
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["tracking"])) obj.topics.push("Track logging");
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["monitoring"])) obj.topics.push("Track monitoring");
  if (source["rendererOutputFormats"]) obj.topics.push("Rendering");
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["addPOI"], source["editPOI"], source["addWay"], source["editGeom"], source["editTags"], source["editRelations"])) obj.topics.push("Editor");
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["viewNotes"], source["createNotes"], source["editNotes"])) obj.topics.push("Notes");
  if (hasValue(source["editSource"])) (_obj$topics3 = obj.topics).push.apply(_obj$topics3, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((source["editSource"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
    return v;
  }).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.firstLetterToUpperCase)));
  if (hasValue(source["accessibility"])) {
    var _obj$topics4;
    (_obj$topics4 = obj.topics).push.apply(_obj$topics4, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((source["accessibility"] || "").split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
      return v;
    }).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.firstLetterToUpperCase)));
    obj.topics.push("Accessibility");
  }
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["accessibility"])) obj.topics.push("Accessibility");
  if ((0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.equalsYes)(source["textOnlyUI"], source["brailleUI"], source["explorerMode"], source["screenReader"])) obj.topics.push("Blind");
  obj.topics = (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_5__.removeDuplicates)(obj.topics).sort();
  {
    var _name = (0,_utilities__WEBPACK_IMPORTED_MODULE_7__.extractNameWebsiteWiki)(source["name"], source.sourceWiki);
    obj.name = _name.name || obj.name;
    obj.website = obj.website || _name.website;
    obj.documentation = obj.documentation || _name.wiki || "";
  }
  {
    var _name2 = (0,_utilities__WEBPACK_IMPORTED_MODULE_7__.extractNameWebsiteWiki)(source["web"], source.sourceWiki);
    obj.name = obj.name || _name2.name;
    obj.website = _name2.website || obj.website;
    obj.documentation = obj.documentation || _name2.wiki || "";
  }
  {
    var _name3 = (0,_utilities__WEBPACK_IMPORTED_MODULE_7__.extractNameWebsiteWiki)(source["wiki"], source.sourceWiki);
    obj.name = obj.name || _name3.name;
    obj.website = obj.website || _name3.website;
    obj.documentation = _name3.wiki || obj.documentation;
  }
  return obj;
}
function hasValue() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  value = value.toUpperCase();
  return value && value !== "YES" && value !== "NO" && value !== "?";
}
function toValues() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return value.split(_utilities__WEBPACK_IMPORTED_MODULE_7__.splitByCommaButNotInsideBraceRegex).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.trim).filter(function (v) {
    return v;
  }).map(_ui_utilities_string__WEBPACK_IMPORTED_MODULE_6__.firstLetterToUpperCase);
}

/***/ }),

/***/ "./data/template/utilities.ts":
/*!************************************!*\
  !*** ./data/template/utilities.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containsOfflineLink: () => (/* binding */ containsOfflineLink),
/* harmony export */   extractLanguageCodeFromTemplate: () => (/* binding */ extractLanguageCodeFromTemplate),
/* harmony export */   extractNameWebsiteWiki: () => (/* binding */ extractNameWebsiteWiki),
/* harmony export */   extractRepo: () => (/* binding */ extractRepo),
/* harmony export */   extractWebsite: () => (/* binding */ extractWebsite),
/* harmony export */   processWikiText: () => (/* binding */ processWikiText),
/* harmony export */   splitByCommaButNotInsideBraceRegex: () => (/* binding */ splitByCommaButNotInsideBraceRegex)
/* harmony export */ });
/* harmony import */ var _ui_utilities_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui/utilities/url */ "./ui/utilities/url.ts");
// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.


var splitByCommaButNotInsideBraceRegex = /[,;]+(?![^\(]*\))/;
function containsOfflineLink() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return /<((s(trike)?)|(del))>/gi.test(value);
}
function extractLanguageCodeFromTemplate(value) {
  var match = /{{#language:([\w-]+)/.exec(value);
  if (match) return match[1];
  return value;
}
function extractNameWebsiteWiki(value, pageName) {
  value = (value || "").replace(/{{PAGENAME}}/gi, pageName || "");
  var obj = {
    name: value
  };
  {
    var regex = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\])/gi;
    var match = regex.exec(value);
    if (match) {
      obj.website = match[2];
      value = value.replace(regex, "").trim();
      if (value) obj.name = value;
    }
  }
  {
    var _regex = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)) ([^\]]*)\])/gi;
    var _match = _regex.exec(value);
    if (_match) {
      obj.name = _match[5];
      obj.website = _match[2];
      value = value.replace(_regex, "");
    }
  }
  {
    var _regex2 = /\[\[([^\]]*(?![^\|]))(\|([^\]]*))?\]\]/g;
    var _match2 = _regex2.exec(value);
    if (_match2) {
      if (_match2[3]) obj.name = _match2[3];else obj.name = _match2[1];
      obj.wiki = (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_0__.toWikiUrl)(_match2[1]);
      value = value.replace(_regex2, "");
    }
  }
  {
    var _regex3 = /\[\[([^\]]*)\]\]/g;
    var _match3 = _regex3.exec(value);
    if (_match3) {
      obj.name = _match3[1];
      obj.wiki = (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_0__.toWikiUrl)(_match3[1]);
      value = value.replace(_regex3, "");
    }
  }
  return obj;
}
function extractWebsite() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  {
    var regex = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\])/gi;
    var match = regex.exec(value);
    if (match) {
      return match[2];
    }
  }
  {
    var _regex4 = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)) ([^\]]*)\])/gi;
    var _match4 = _regex4.exec(value);
    if (_match4) {
      return _match4[2];
    }
  }
  {
    var _regex5 = /\[\[([^\]]*(?![^\|]))(\|([^\]]*))?\]\]/g;
    var _match5 = _regex5.exec(value);
    if (_match5) {
      return (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_0__.toWikiUrl)(_match5[1]);
    }
  }
  {
    var _regex6 = /{{URL\|(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))}}/gi;
    var _match6 = _regex6.exec(value);
    if (_match6) {
      return _match6[1];
    }
  }
  {
    var _regex7 = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;
    var _match7 = _regex7.exec(value);
    if (_match7) {
      return _match7[1];
    }
  }
  return undefined;
}
function extractRepo() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var regex = /{{GitHub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(\|([^(}})]+))?}}/g;
  return value.replace(regex, "https://github.com/$1");
}
function processWikiText() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  // clean up <ref>
  {
    var regex = /<ref>([^<]*)<\/ref>/g;
    text = text.replace(regex, "");
  }

  // Wikipedia
  {
    var _regex8 = /\[\[:wikipedia:([^\]]*(?![^\|]))(\|([^\]]*))?\]\]/g;
    text = text.replace(_regex8, "<a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/$1\">$3</a>");
  }
  {
    var _regex9 = /\[\[:wikipedia:([^\]]*)\]\]/g;
    text = text.replace(_regex9, "<a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/$1\">$1</a>");
  }
  // Url
  {
    var _regex10 = /\[\[([^\]]*(?![^\|]))(\|([^\]]*))?\]\]/;
    var match = _regex10.exec(text);
    while (match) {
      text = text.replace(_regex10, "<a target=\"_blank\" href=\"".concat((0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_0__.toWikiUrl)(match[1]), "\">").concat(match[3], "</a>"));
      match = _regex10.exec(text);
    }
  }
  {
    var _regex11 = /\[\[([^\]]*)\]\]/;
    var _match8 = _regex11.exec(text);
    while (_match8) {
      text = text.replace(_regex11, "<a target=\"_blank\" href=\"".concat((0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_0__.toWikiUrl)(_match8[1]), "\">").concat(_match8[1], "</a>"));
      _match8 = _regex11.exec(text);
    }
  }
  {
    var _regex12 = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\])/gi;
    text = text.replace(_regex12, "<a target=\"_blank\" href=\"$2\">$2</a>");
  }
  {
    var _regex13 = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)) ([^\]]*)\])/gi;
    text = text.replace(_regex13, "<a target=\"_blank\" href=\"$2\">$5</a>");
  }
  {
    var _regex14 = /{{(Key|Tag|TagKey)\|([^}|]*)(\|([^}|]*))?}}/gi;
    var _match9 = _regex14.exec(text);
    while (_match9) {
      if (!_match9[4]) {
        text = text.replace(_regex14, "<a target=\"_blank\" href=\"https://wiki.openstreetmap.org/wiki/Key:$2\">$2</a>=*");
      } else {
        text = text.replace(_regex14, "<a target=\"_blank\" href=\"https://wiki.openstreetmap.org/wiki/Key:$2\">$2</a>=<a target=\"_blank\" href=\"https://wiki.openstreetmap.org/wiki/Tag:$2=$4\">$4</a>");
      }
      _match9 = _regex14.exec(text);
    }
  }

  // Format
  {
    var _regex15 = /'''([^(''')]*)'''/g;
    text = text.replace(_regex15, "<strong>$1</strong>");
  }

  // GitHub
  {
    var _regex16 = /{{GitHub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)}}/g;
    text = text.replace(_regex16, "<a target=\"_blank\" href=\"https://github.com/$1\">$1</a>");
  }
  {
    var _regex17 = /{{GitHub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(\|([^(}})]+))?}}/g;
    text = text.replace(_regex17, "<a target=\"_blank\" href=\"https://github.com/$1\">$5</a>");
  }
  return text;
}

/***/ }),

/***/ "./script.ts":
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apps: () => (/* binding */ apps),
/* harmony export */   extendFilter: () => (/* binding */ extendFilter)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ui_utilities_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/utilities/html */ "./ui/utilities/html.ts");
/* harmony import */ var slim_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! slim-select */ "../node_modules/slim-select/dist/slimselect.min.mjs");
/* harmony import */ var _ui_lazyLoadImages__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/lazyLoadImages */ "./ui/lazyLoadImages.ts");
/* harmony import */ var _ui_utilities_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui/utilities/storage */ "./ui/utilities/storage.ts");
/* harmony import */ var _ui_views_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui/views/list */ "./ui/views/list.ts");
/* harmony import */ var _ui_utilities_array__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ui/utilities/array */ "./ui/utilities/array.ts");
/* harmony import */ var _ui_utilities_string__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ui/utilities/string */ "./ui/utilities/string.ts");
/* harmony import */ var _ui_utilities_url__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ui/utilities/url */ "./ui/utilities/url.ts");
/* harmony import */ var _ui_utilities_coloriz_Solver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ui/utilities/coloriz/Solver */ "./ui/utilities/coloriz/Solver.ts");
/* harmony import */ var _ui_utilities_coloriz_Color__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ui/utilities/coloriz/Color */ "./ui/utilities/coloriz/Color.ts");
/* harmony import */ var _ui_utilities_filter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ui/utilities/filter */ "./ui/utilities/filter.ts");
/* harmony import */ var _ui_views_compare__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ui/views/compare */ "./ui/views/compare.ts");
/* harmony import */ var _data_loadApps__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./data/loadApps */ "./data/loadApps.ts");
/* harmony import */ var _ui_lazyInitMore__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ui/lazyInitMore */ "./ui/lazyInitMore.ts");




function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.















var onUpdate = false;
var apps = [];
var topicSelect = new slim_select__WEBPACK_IMPORTED_MODULE_5__["default"]({
  select: "#topic",
  placeholder: "Topic",
  onChange: function onChange() {
    doUpdate(apps);
  }
});
var platformSelect = new slim_select__WEBPACK_IMPORTED_MODULE_5__["default"]({
  select: "#platform",
  placeholder: "Platform",
  onChange: function onChange() {
    doUpdate(apps);
  }
});
var languageSelect = new slim_select__WEBPACK_IMPORTED_MODULE_5__["default"]({
  select: "#language",
  placeholder: "Language",
  onChange: function onChange() {
    doUpdate(apps);
  }
});
var coverageSelect = new slim_select__WEBPACK_IMPORTED_MODULE_5__["default"]({
  select: "#coverage",
  placeholder: "Coverage",
  onChange: function onChange() {
    doUpdate(apps);
  }
});
document.getElementById("free").addEventListener("change", function () {
  doUpdate(apps);
});
document.getElementById("search").addEventListener("input", function () {
  doUpdate(apps);
});
document.getElementById("listView").addEventListener("input", function () {
  doUpdate(apps);
});
document.getElementById("compareView").addEventListener("input", function () {
  doUpdate(apps);
});
var category = (0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_11__.findGetParameterFromHash)("category");
var categorySelect = new slim_select__WEBPACK_IMPORTED_MODULE_5__["default"]({
  select: "#category",
  showSearch: false,
  placeholder: "Category",
  data: [{
    value: "all",
    innerHTML: "<i class='fas fa-layer-group' style='position: absolute;right: 28px;'></i> All",
    text: "All"
  }, {
    value: "focus",
    innerHTML: "<i class='far fa-eye' style='position: absolute;right: 27px;'></i> Focus",
    text: "Focus"
  }, {
    value: "latest",
    innerHTML: "<i class='far fa-clock' style='position: absolute;right: 28px;'></i> Latest",
    text: "Latest"
  }, {
    value: "mobile",
    innerHTML: "<i class='fas fa-mobile-alt' style='position: absolute;right: 31px;'></i> To go",
    text: "To go"
  }, {
    value: "navigation",
    innerHTML: "<i class='far fa-compass' style='position: absolute;right: 28px;'></i> Find your way",
    text: "Find your way"
  }, {
    value: "edit",
    innerHTML: "<i class='fas fa-edit' style='position: absolute;right: 26px;'></i> Contribute",
    text: "Contribute"
  }].map(function (c) {
    return _objectSpread(_objectSpread({}, c), {}, {
      selected: c.value === category
    });
  }),
  onChange: function onChange() {
    doUpdate(apps, true);
  }
});
function doUpdate(newApps, state, reset) {
  apps = newApps;
  if (!onUpdate) {
    onUpdate = true;
    if (reset) {
      document.getElementById("search").value = "";
      document.getElementById("free").checked = false;
      topicSelect.set([]);
      platformSelect.set([]);
      languageSelect.set([]);
      coverageSelect.set([]);
    }
    update(document.getElementById("free").checked, document.getElementById("search").value, topicSelect.selected(), platformSelect.selected(), languageSelect.selected(), coverageSelect.selected(), categorySelect.selected());
    onUpdate = false;
  }
}
function update() {
  var freeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var search = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var topic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var platform = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var language = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var coverage = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  var category = arguments.length > 6 ? arguments[6] : undefined;
  // if (category === "all") {
  //   document.location.hash = "";
  // } else {
  //   document.location.hash = category;
  // }

  var description = "";
  if (category === "all") {
    description = "Shows all apps found on the OpenStreetMap wiki and taginfo in random order.";
  } else if (category === "focus") {
    description = "Shows ten apps from the most recently updated pages.";
  } else if (category === "latest") {
    description = "Shows all apps ordered by last release date.";
  } else if (category === "mobile") {
    description = "Shows apps developed for mobile devices or that support offline use.";
  } else if (category === "navigation") {
    description = "Shows apps that support routing or navigation.";
  } else if (category === "edit") {
    description = "Shows apps that support adding, editing or analysing OpenStreetMap data or recording geotracks.";
  }
  (0,_ui_utilities_html__WEBPACK_IMPORTED_MODULE_4__.getHtmlElement)(".description").innerHTML = description;
  (0,_ui_utilities_html__WEBPACK_IMPORTED_MODULE_4__.getHtmlElement)("#list").innerHTML = "";
  (0,_ui_utilities_html__WEBPACK_IMPORTED_MODULE_4__.getHtmlElement)("#compare").innerHTML = "";
  var filteredApps = apps.slice();
  if (freeOnly) {
    filteredApps = filteredApps.filter(function (a) {
      return a.gratis || a.libre;
    });
  }
  if (category === "latest") {
    filteredApps = filteredApps.sort(function (a, b) {
      var nameA = a.source[0].lastChange.toUpperCase() || "";
      var nameB = b.source[0].lastChange.toUpperCase() || "";
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
    filteredApps = filteredApps.sort(function (a, b) {
      var _a$lastRelease, _b$lastRelease;
      var nameA = ((_a$lastRelease = a.lastRelease) === null || _a$lastRelease === void 0 ? void 0 : _a$lastRelease.toUpperCase()) || "";
      var nameB = ((_b$lastRelease = b.lastRelease) === null || _b$lastRelease === void 0 ? void 0 : _b$lastRelease.toUpperCase()) || "";
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
  } else if (category === "focus") {
    var latestApps = filteredApps.sort(function (a, b) {
      var nameA = a.source[0].lastChange.toUpperCase() || "";
      var nameB = b.source[0].lastChange.toUpperCase() || "";
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
    filteredApps = [];
    var _iterator = _createForOfIteratorHelper(latestApps),
      _step;
    try {
      var _loop = function _loop() {
        var app = _step.value;
        if (filteredApps.length < 10) {
          if (!filteredApps.some(function (a) {
            return (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_10__.equalsIgnoreCase)(a.source[0].url, app.source[0].url);
          })) {
            filteredApps.push(app);
          }
        } else {
          return 1; // break
        }
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        if (_loop()) break;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  search = search.toUpperCase();
  var topicUp = topic.map(function (t) {
    return t.toUpperCase();
  });
  var platformUp = platform.map(function (t) {
    return t.toUpperCase();
  });
  var languageUp = language.map(function (t) {
    return t.toUpperCase();
  });
  var coverageUp = [];
  coverage.forEach(function (t) {
    var regions = t.toUpperCase().split(", ");
    var entry = [];
    for (var index = 0; index < regions.length; index++) {
      entry.push(regions[index]);
      coverageUp.push(entry.join(", "));
    }
  });
  if (search) filteredApps = filteredApps.filter(function (a) {
    return a.name.toUpperCase().search(search) !== -1 || a.description.toUpperCase().search(search) !== -1 || a.topics.filter(function (t) {
      return t.toUpperCase().search(search) !== -1;
    }).length > 0 || a.platform.filter(function (t) {
      return t.toUpperCase().search(search) !== -1;
    }).length > 0 || a.coverage.filter(function (t) {
      return t.toUpperCase().search(search) !== -1;
    }).length > 0;
  });
  if (topicUp.length > 0) filteredApps = filteredApps.filter(function (a) {
    return (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_9__.includes)(a.topics.map(function (t) {
      return t.toUpperCase();
    }), topicUp);
  });
  if (platformUp.length > 0) filteredApps = filteredApps.filter(function (a) {
    return (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_9__.includes)(a.platform.map(function (t) {
      return t.toUpperCase();
    }), platformUp);
  });
  if (languageUp.length > 0) filteredApps = filteredApps.filter(function (a) {
    return (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_9__.some)(a.languages.map(function (t) {
      return t.toUpperCase();
    }), languageUp);
  });
  if (coverageUp.length > 0) {
    filteredApps = filteredApps.filter(function (a) {
      return (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_9__.some)(a.coverage.map(function (t) {
        return t.toUpperCase();
      }), coverageUp);
    });
  }
  var categoriedApps = [];
  if (category === "mobile") {
    categoriedApps.push.apply(categoriedApps, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(filteredApps.filter(_ui_utilities_filter__WEBPACK_IMPORTED_MODULE_14__.mobile)));
    filteredApps = categoriedApps;
  } else if (category === "navigation") {
    categoriedApps.push.apply(categoriedApps, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(filteredApps.filter(_ui_utilities_filter__WEBPACK_IMPORTED_MODULE_14__.navigation)));
    filteredApps = categoriedApps;
  } else if (category === "edit") {
    categoriedApps.push.apply(categoriedApps, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(filteredApps.filter(_ui_utilities_filter__WEBPACK_IMPORTED_MODULE_14__.edit)));
    filteredApps = categoriedApps;
  }
  var topicData = [];
  var platformData = [];
  var languageData = [];
  var coverageData = [];
  var _iterator2 = _createForOfIteratorHelper(filteredApps),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _a2 = _step2.value;
      topicData.push.apply(topicData, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_a2.topics.map(function (t) {
        return t;
      })));
      platformData.push.apply(platformData, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_a2.platform.map(function (t) {
        return t;
      })));
      coverageData.push.apply(coverageData, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_a2.coverage.map(function (t) {
        return t;
      })));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var _iterator3 = _createForOfIteratorHelper(apps),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _a3 = _step3.value;
      languageData.push.apply(languageData, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_a3.languages.map(function (l) {
        return l;
      })));
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  topicSelect.setData(prepareArrayForSelect(topicData, topic));
  topicSelect.set(topic);
  platformSelect.setData(prepareArrayForSelect(platformData, platform));
  platformSelect.set(platform);
  languageSelect.setData(prepareArrayForSelect(languageData, language));
  languageSelect.set(language);
  coverageSelect.setData(prepareArrayForSelect(coverageData, coverage));
  coverageSelect.set(coverage);
  if (document.getElementById("compareView").checked) {
    (0,_ui_views_compare__WEBPACK_IMPORTED_MODULE_15__.render)(filteredApps, lang);
    setTimeout(function () {
      (0,_ui_lazyInitMore__WEBPACK_IMPORTED_MODULE_17__.lazyInitMore)(true);
    }, 0);
  }
  if (document.getElementById("listView").checked) {
    var _iterator4 = _createForOfIteratorHelper(filteredApps),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _a = _step4.value;
        (0,_ui_views_list__WEBPACK_IMPORTED_MODULE_8__.render)(_a);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    if (topicUp.length > 0) {
      var similarApps = apps.filter(function (a) {
        return !filteredApps.includes(a);
      });
      similarApps = similarApps.filter(function (a) {
        return topicUp.every(function (t) {
          return a.name.toUpperCase().search(t) !== -1 || a.description.toUpperCase().search(t) !== -1;
        });
      });
      if (search) similarApps = similarApps.filter(function (a) {
        return a.name.toUpperCase().search(search) !== -1 || a.description.toUpperCase().search(search) !== -1 || a.topics.filter(function (t) {
          return t.toUpperCase().search(search) !== -1;
        }).length > 0 || a.platform.filter(function (t) {
          return t.toUpperCase().search(search) !== -1;
        }).length > 0 || a.coverage.filter(function (t) {
          return t.toUpperCase().search(search) !== -1;
        }).length > 0;
      });
      if (platformUp.length > 0) similarApps = similarApps.filter(function (a) {
        return (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_9__.includes)(a.platform.map(function (t) {
          return t.toUpperCase();
        }), platformUp);
      });
      if (languageUp.length > 0) similarApps = similarApps.filter(function (a) {
        return (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_9__.some)(a.languages.map(function (t) {
          return t.toUpperCase();
        }), languageUp);
      });
      if (coverageUp.length > 0) similarApps = similarApps.filter(function (a) {
        return (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_9__.includes)(a.coverage.map(function (t) {
          return t.toUpperCase();
        }), coverageUp);
      });
      if (similarApps.length > 0) {
        var similarTag = (0,_ui_utilities_html__WEBPACK_IMPORTED_MODULE_4__.createElement)("h2", "Related apps");
        (0,_ui_utilities_html__WEBPACK_IMPORTED_MODULE_4__.getHtmlElement)("#list").appendChild(similarTag);
        var _iterator5 = _createForOfIteratorHelper(similarApps),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var a = _step5.value;
            (0,_ui_views_list__WEBPACK_IMPORTED_MODULE_8__.render)(a);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }
  }
  setTimeout(function () {
    (0,_ui_lazyLoadImages__WEBPACK_IMPORTED_MODULE_6__.lazyLoadImages)(true);
  }, 0);
}
var lang = ((0,_ui_utilities_url__WEBPACK_IMPORTED_MODULE_11__.findGetParameter)("lang") || "en").toLowerCase();
function saveAppCatalog() {
  (0,_ui_utilities_storage__WEBPACK_IMPORTED_MODULE_7__.set)("".concat(lang, "-apps"), apps);
  (0,_ui_utilities_storage__WEBPACK_IMPORTED_MODULE_7__.set)("".concat(lang, "-apps-date"), new Date());
  console.info("add catalog to cache");
  //printJsonLd();
}

function printJsonLd() {
  console.info(JSON.stringify(apps.sort(function (a, b) {
    var nameA = a.name.toUpperCase() || "";
    var nameB = b.name.toUpperCase() || "";
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  }).map(function (app) {
    var _app$install$appleSto, _app$install$macAppSt;
    return {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      name: app.name,
      description: app.description,
      image: app.images[0],
      url: app.website,
      downloadUrl: app.install.fDroidID ? "https://f-droid.org/repository/browse/?fdid=" + app.install.fDroidID :  false || app.install.googlePlayID ? "https://play.google.com/store/apps/details?id=" + app.install.googlePlayID :  false || app.install.asin ? "https://www.amazon.com/dp/" + app.install.asin :  false || app.install.appleStoreID ? "https://itunes.apple.com/app/" + ((_app$install$appleSto = app.install.appleStoreID) === null || _app$install$appleSto === void 0 ? void 0 : _app$install$appleSto.toUpperCase().startsWith("ID")) ? app.install.appleStoreID : 0 :  false || app.install.macAppStoreID ? "https://itunes.apple.com/app/" + ((_app$install$macAppSt = app.install.macAppStoreID) === null || _app$install$macAppSt === void 0 ? void 0 : _app$install$macAppSt.toUpperCase().startsWith("ID")) ? app.install.macAppStoreID : 0 :  false || app.install.microsoftAppID ? "http://www.windowsphone.com/s?appid=" + app.install.microsoftAppID :  false || app.install.huaweiAppGalleryID ? "https://appgallery.huawei.com/#/app/" + app.install.huaweiAppGalleryID : undefined,
      author: {
        "@type": "Person",
        name: app.author
      },
      datePublished: app.lastRelease,
      license: app.license,
      applicationCategory: ["Map"].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(app.topics)).join(", "),
      operatingSystem: app.platform.join(", ")
    };
  })));
}
function getAppCatalog() {
  return _getAppCatalog.apply(this, arguments);
}
function _getAppCatalog() {
  _getAppCatalog = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
    var date, day;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          date = (0,_ui_utilities_storage__WEBPACK_IMPORTED_MODULE_7__.get)("".concat(lang, "-apps-date"));
          day = 24 * 60 * 60 * 1000;
          if (date && new Date(date).valueOf() > Date.now() - day) {
            console.info("get catalog from cache");
            apps = (0,_ui_utilities_storage__WEBPACK_IMPORTED_MODULE_7__.get)("".concat(lang, "-apps")) || [];
            doUpdate(apps);
          }
          if (!(apps.length === 0)) {
            _context.next = 12;
            break;
          }
          console.info("load catalog from wiki");
          if (!(lang !== "en")) {
            _context.next = 8;
            break;
          }
          _context.next = 8;
          return (0,_data_loadApps__WEBPACK_IMPORTED_MODULE_16__.loadApps)(doUpdate, lang);
        case 8:
          _context.next = 10;
          return (0,_data_loadApps__WEBPACK_IMPORTED_MODULE_16__.loadApps)(doUpdate);
        case 10:
          (0,_ui_utilities_array__WEBPACK_IMPORTED_MODULE_9__.shuffle)(apps);
          saveAppCatalog();
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getAppCatalog.apply(this, arguments);
}
function extendFilter(app) {
  if (app.images.length === 0 && !app.filter) {
    var defaultColor = (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_10__.textToColor)(app.name);
    app.filter = new _ui_utilities_coloriz_Solver__WEBPACK_IMPORTED_MODULE_12__.Solver(new _ui_utilities_coloriz_Color__WEBPACK_IMPORTED_MODULE_13__.Color(defaultColor.r, defaultColor.g, defaultColor.b)).solve().filter.replace(/filter:/gi, "filter: brightness(0%)");
  }
}
getAppCatalog();
function prepareArrayForSelect(names, selected) {
  names.sort(function (a, b) {
    if (a.toUpperCase() < b.toUpperCase()) return -1;
    if (a.toUpperCase() > b.toUpperCase()) return 1;
    return 0;
  });
  var nameCounts = [];
  var _iterator6 = _createForOfIteratorHelper(names),
    _step6;
  try {
    var _loop2 = function _loop2() {
      var name = _step6.value;
      var nameCountFiltered = nameCounts.filter(function (nc) {
        return (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_10__.equalsIgnoreCase)(nc.name, name);
      });
      if (nameCountFiltered.length > 0) {
        nameCountFiltered[0].count++;
      } else {
        nameCounts.push({
          name: name,
          count: 1
        });
      }
    };
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      _loop2();
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  return nameCounts.map(function (t) {
    if (selected.filter(function (s) {
      return (0,_ui_utilities_string__WEBPACK_IMPORTED_MODULE_10__.equalsIgnoreCase)(t.name, s);
    }).length > 0) return {
      value: t.name,
      text: t.name
    };else return {
      value: t.name,
      text: "".concat(t.name, " (").concat(t.count, ")")
    };
  });
}

/***/ }),

/***/ "./ui/getLocalizedValue.ts":
/*!*********************************!*\
  !*** ./ui/getLocalizedValue.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLocalizedValue: () => (/* binding */ getLocalizedValue)
/* harmony export */ });
function getLocalizedValue(setting, locale) {
  if (!setting) {
    return undefined;
  }
  if (typeof setting === "string") {
    return setting;
  }
  if (setting[locale]) {
    // excact match found
    return setting[locale];
  }
  var parts = locale.split("-");
  if (parts.length > 1) {
    if (setting[parts[0]]) {
      // found eg. "de" for "de-CH"
      return setting[locale];
    }
  }

  // fallback take first
  return setting[Object.keys(setting)[0]];
}

/***/ }),

/***/ "./ui/language.ts":
/*!************************!*\
  !*** ./ui/language.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   languageValueToDisplay: () => (/* binding */ languageValueToDisplay)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

var languages = [{
  code: "aa",
  display: "Afar"
}, {
  code: "ab",
  display: "Аҧсуа"
}, {
  code: "af",
  display: "Afrikaans"
}, {
  code: "ak",
  display: "Akana"
}, {
  code: "als",
  display: "Alemannisch"
}, {
  code: "am",
  display: "አማርኛ"
}, {
  code: "an",
  display: "Aragonés"
}, {
  code: "ang",
  display: "Angal Heneng"
}, {
  code: "ang",
  display: "Englisc"
}, {
  code: "ar",
  display: "العربية"
}, {
  code: "arc",
  display: "ܣܘܪܬ"
}, {
  code: "as",
  display: "অসমীয়া"
}, {
  code: "ast",
  display: "Asturianu"
}, {
  code: "av",
  display: "Авар"
}, {
  code: "awa",
  display: "Awadhi"
}, {
  code: "ay",
  display: "Aymar"
}, {
  code: "az",
  display: "Azərbaycanca / آذربايجان"
}, {
  code: "ba",
  display: "Башҡорт"
}, {
  code: "bar",
  display: "Boarisch"
}, {
  code: "bat-smg",
  display: "Žemaitėška"
}, {
  code: "bcl",
  display: "Bikol Central"
}, {
  code: "be",
  display: "Беларуская"
}, {
  code: "be-x-old",
  display: "Беларуская (тарашкевіца)"
}, {
  code: "bg",
  display: "Български"
}, {
  code: "bh",
  display: "भोजपुरी"
}, {
  code: "bi",
  display: "Bislama"
}, {
  code: "bm",
  display: "Bamanankan"
}, {
  code: "bn",
  display: "বাংলা"
}, {
  code: "bo",
  display: "བོད་ཡིག / Bod skad"
}, {
  code: "bpy",
  display: "ইমার ঠার/বিষ্ণুপ্রিয়া মণিপুরী"
}, {
  code: "br",
  display: "Brezhoneg"
}, {
  code: "bs",
  display: "Bosanski"
}, {
  code: "bug",
  display: "ᨅᨔ ᨕᨘᨁᨗ / Basa Ugi"
}, {
  code: "bxr",
  display: "Буряад хэлэн"
}, {
  code: "ca",
  display: "Català"
}, {
  code: "cdo",
  display: "Mìng-dĕ̤ng-ngṳ̄ / 閩東語"
}, {
  code: "ce",
  display: "Нохчийн"
}, {
  code: "ceb",
  display: "Sinugboanong Binisaya"
}, {
  code: "ch",
  display: "Chamoru"
}, {
  code: "cho",
  display: "Choctaw"
}, {
  code: "chr",
  display: "ᏣᎳᎩ"
}, {
  code: "chy",
  display: "Tsetsêhestâhese"
}, {
  code: "closed-zh-tw",
  display: "‪中文(台灣)‬"
}, {
  code: "co",
  display: "Corsu"
}, {
  code: "cr",
  display: "Nehiyaw"
}, {
  code: "cs",
  display: "Česky"
}, {
  code: "csb",
  display: "Kaszëbsczi"
}, {
  code: "cu",
  display: "словѣньскъ / slověnĭskŭ"
}, {
  code: "cv",
  display: "Чăваш"
}, {
  code: "cy",
  display: "Cymraeg"
}, {
  code: "da",
  display: "Dansk"
}, {
  code: "de",
  display: "Deutsch"
}, {
  code: "diq",
  display: "Zazaki"
}, {
  code: "dsb",
  display: "Dolnoserbski"
}, {
  code: "dv",
  display: "ދިވެހިބަސް"
}, {
  code: "dz",
  display: "ཇོང་ཁ"
}, {
  code: "ee",
  display: "Ɛʋɛ"
}, {
  code: "el",
  display: "Ελληνικά"
}, {
  code: "en",
  display: "English"
}, {
  code: "eo",
  display: "Esperanto"
}, {
  code: "es",
  display: "Español"
}, {
  code: "et",
  display: "Eesti"
}, {
  code: "eu",
  display: "Euskara"
}, {
  code: "ext",
  display: "Estremeñu"
}, {
  code: "fa",
  display: "فارسی"
}, {
  code: "ff",
  display: "Fulfulde"
}, {
  code: "fi",
  display: "Suomi"
}, {
  code: "fiu-vro",
  display: "Võro"
}, {
  code: "fj",
  display: "Na Vosa Vakaviti"
}, {
  code: "fo",
  display: "Føroyskt"
}, {
  code: "fr",
  display: "Français"
}, {
  code: "frp",
  display: "Arpitan / francoprovençal"
}, {
  code: "fur",
  display: "Furlan"
}, {
  code: "fy",
  display: "Frysk"
}, {
  code: "ga",
  display: "Gaeilge"
}, {
  code: "gan",
  display: "贛語"
}, {
  code: "gbm",
  display: "गढ़वळी"
}, {
  code: "gcf",
  display: "Kréyòl gwadloupéyen"
}, {
  code: "gd",
  display: "Gàidhlig"
}, {
  code: "gil",
  display: "Taetae ni kiribati"
}, {
  code: "gl",
  display: "Galego"
}, {
  code: "gn",
  display: "Avañe'ẽ"
}, {
  code: "got",
  display: "gutisk"
}, {
  code: "gu",
  display: "ગુજરાતી"
}, {
  code: "gv",
  display: "Gaelg"
}, {
  code: "ha",
  display: "هَوُسَ"
}, {
  code: "hak",
  display: "客家語/Hak-kâ-ngî"
}, {
  code: "haw",
  display: "Hawai`i"
}, {
  code: "he",
  display: "עברית"
}, {
  code: "hi",
  display: "हिन्दी"
}, {
  code: "ho",
  display: "Hiri Motu"
}, {
  code: "hr",
  display: "Hrvatski"
}, {
  code: "ht",
  display: "Krèyol ayisyen"
}, {
  code: "hu",
  display: "Magyar"
}, {
  code: "hy",
  display: "Հայերեն"
}, {
  code: "hz",
  display: "Otsiherero"
}, {
  code: "ia",
  display: "Interlingua"
}, {
  code: "id",
  display: "Bahasa Indonesia"
}, {
  code: "ie",
  display: "Interlingue"
}, {
  code: "ig",
  display: "Igbo"
}, {
  code: "ii",
  display: "ꆇꉙ / 四川彝语"
}, {
  code: "ik",
  display: "Iñupiak"
}, {
  code: "ilo",
  display: "Ilokano"
}, {
  code: "inh",
  display: "ГӀалгӀай"
}, {
  code: "io",
  display: "Ido"
}, {
  code: "is",
  display: "Íslenska"
}, {
  code: "it",
  display: "Italiano"
}, {
  code: "iu",
  display: "ᐃᓄᒃᑎᑐᑦ"
}, {
  code: "ja",
  display: "日本語"
}, {
  code: "jbo",
  display: "Lojban"
}, {
  code: "jv",
  display: "Basa Jawa"
}, {
  code: "ka",
  display: "ქართული"
}, {
  code: "kg",
  display: "KiKongo"
}, {
  code: "khw",
  display: "کھوار"
}, {
  code: "ki",
  display: "Gĩkũyũ"
}, {
  code: "kj",
  display: "Kuanyama"
}, {
  code: "kk",
  display: "Қазақша"
}, {
  code: "kl",
  display: "Kalaallisut"
}, {
  code: "km",
  display: "ភាសាខ្មែរ"
}, {
  code: "kn",
  display: "ಕನ್ನಡ"
}, {
  code: "ko",
  display: "한국어"
}, {
  code: "kr",
  display: "Kanuri"
}, {
  code: "ks",
  display: "कश्मीरी / كشميري"
}, {
  code: "ksh",
  display: "Ripoarisch"
}, {
  code: "ku",
  display: "Kurdî / كوردی"
}, {
  code: "kv",
  display: "Коми"
}, {
  code: "kw",
  display: "Kernewek"
}, {
  code: "ky",
  display: "Kırgızca / Кыргызча"
}, {
  code: "la",
  display: "Latina"
}, {
  code: "lad",
  display: "Dzhudezmo / Djudeo-Espanyol"
}, {
  code: "lan",
  display: "Leb Lango / Luo"
}, {
  code: "lb",
  display: "Lëtzebuergesch"
}, {
  code: "lg",
  display: "Luganda"
}, {
  code: "li",
  display: "Limburgs"
}, {
  code: "lij",
  display: "Líguru"
}, {
  code: "lmo",
  display: "Lumbaart"
}, {
  code: "ln",
  display: "Lingála"
}, {
  code: "lo",
  display: "ລາວ / Pha xa lao"
}, {
  code: "lt",
  display: "Lietuvių"
}, {
  code: "lv",
  display: "Latviešu"
}, {
  code: "lzz",
  display: "Lazuri / ლაზური"
}, {
  code: "man",
  display: "官話/官话"
}, {
  code: "map-bms",
  display: "Basa Banyumasan"
}, {
  code: "mg",
  display: "Malagasy"
}, {
  code: "mh",
  display: "Kajin Majel / Ebon"
}, {
  code: "mi",
  display: "Māori"
}, {
  code: "min",
  display: "Minangkabau"
}, {
  code: "mk",
  display: "Македонски"
}, {
  code: "ml",
  display: "മലയാളം"
}, {
  code: "mn",
  display: "Монгол"
}, {
  code: "mo",
  display: "Moldovenească"
}, {
  code: "mr",
  display: "मराठी"
}, {
  code: "mrh",
  display: "Mara"
}, {
  code: "ms",
  display: "Bahasa Melayu"
}, {
  code: "mt",
  display: "bil-Malti"
}, {
  code: "mul",
  display: "Multilingual"
}, {
  code: "mus",
  display: "Mvskoke"
}, {
  code: "mwl",
  display: "Mirandés"
}, {
  code: "my",
  display: "Myanmasa / မြန်မာဘာသာ"
}, {
  code: "na",
  display: "Dorerin Naoero"
}, {
  code: "nah",
  display: "Nahuatl"
}, {
  code: "nap",
  display: "Nnapulitano"
}, {
  code: "nb",
  display: "Norsk (bokmål)"
}, {
  code: "nd",
  display: "Sindebele"
}, {
  code: "nds",
  display: "Plattdüütsch"
}, {
  code: "nds-nl",
  display: "Nedersaksisch"
}, {
  code: "ne",
  display: "नेपाली"
}, {
  code: "new",
  display: "नेपालभाषा / Newah Bhaye"
}, {
  code: "ng",
  display: "Oshiwambo"
}, {
  code: "nl",
  display: "Nederlands"
}, {
  code: "nn",
  display: "Norsk (nynorsk)"
}, {
  code: "no",
  display: "Norsk (bokmål / riksmål)"
}, {
  code: "nr",
  display: "isiNdebele"
}, {
  code: "nrm",
  display: "Nouormand / Normaund"
}, {
  code: "nso",
  display: "Sesotho sa Leboa / Sepedi"
}, {
  code: "nv",
  display: "Diné bizaad"
}, {
  code: "ny",
  display: "Chi-Chewa"
}, {
  code: "oc",
  display: "Occitan"
}, {
  code: "oj",
  display: "ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin"
}, {
  code: "om",
  display: "Oromoo"
}, {
  code: "or",
  display: "ଓଡ଼ିଆ"
}, {
  code: "os",
  display: "Иронау"
}, {
  code: "pa",
  display: "ਪੰਜਾਬੀ / पंजाबी / پنجابي"
}, {
  code: "pag",
  display: "Pangasinan"
}, {
  code: "pam",
  display: "Kapampangan"
}, {
  code: "pap",
  display: "Papiamentu"
}, {
  code: "pdc",
  display: "Deitsch"
}, {
  code: "pi",
  display: "Pāli / पाऴि"
}, {
  code: "pih",
  display: "Norfuk"
}, {
  code: "pl",
  display: "Polski"
}, {
  code: "pms",
  display: "Piemontèis"
}, {
  code: "ps",
  display: "پښتو"
}, {
  code: "pt",
  display: "Português"
}, {
  code: "qu",
  display: "Runa Simi"
}, {
  code: "rm",
  display: "Rumantsch"
}, {
  code: "rmy",
  display: "Romani / रोमानी"
}, {
  code: "rn",
  display: "Kirundi"
}, {
  code: "ro",
  display: "Română"
}, {
  code: "roa-rup",
  display: "Armâneashti"
}, {
  code: "ru",
  display: "Русский"
}, {
  code: "rw",
  display: "Kinyarwandi"
}, {
  code: "sa",
  display: "संस्कृतम्"
}, {
  code: "sc",
  display: "Sardu"
}, {
  code: "scn",
  display: "Sicilianu"
}, {
  code: "sco",
  display: "Scots"
}, {
  code: "sd",
  display: "सिनधि"
}, {
  code: "se",
  display: "Davvisámegiella"
}, {
  code: "sg",
  display: "Sängö"
}, {
  code: "sh",
  display: "Srpskohrvatski / Српскохрватски"
}, {
  code: "si",
  display: "සිංහල"
}, {
  code: "simple",
  display: "Simple English"
}, {
  code: "sk",
  display: "Slovenčina"
}, {
  code: "sl",
  display: "Slovenščina"
}, {
  code: "sm",
  display: "Gagana Samoa"
}, {
  code: "sn",
  display: "chiShona"
}, {
  code: "so",
  display: "Soomaaliga"
}, {
  code: "sq",
  display: "Shqip"
}, {
  code: "sr-latn",
  display: "srpski (latinica)"
}, {
  code: "sr",
  display: "Српски / Srpski"
}, {
  code: "ss",
  display: "SiSwati"
}, {
  code: "st",
  display: "Sesotho"
}, {
  code: "su",
  display: "Basa Sunda"
}, {
  code: "sv",
  display: "Svenska"
}, {
  code: "sw",
  display: "Kiswahili"
}, {
  code: "ta",
  display: "தமிழ்"
}, {
  code: "te",
  display: "తెలుగు"
}, {
  code: "tet",
  display: "Tetun"
}, {
  code: "tg",
  display: "Тоҷикӣ"
}, {
  code: "th",
  display: "ไทย / Phasa Thai"
}, {
  code: "ti",
  display: "ትግርኛ"
}, {
  code: "tk",
  display: "Туркмен / تركمن"
}, {
  code: "tl",
  display: "Tagalog"
}, {
  code: "tlh",
  display: "tlhIngan-Hol"
}, {
  code: "tn",
  display: "Setswana"
}, {
  code: "to",
  display: "Lea Faka-Tonga"
}, {
  code: "tokipona",
  display: "tokipona"
}, {
  code: "tpi",
  display: "Tok Pisin"
}, {
  code: "tr",
  display: "Türkçe"
}, {
  code: "ts",
  display: "Xitsonga"
}, {
  code: "tt",
  display: "Tatarça"
}, {
  code: "tum",
  display: "chiTumbuka"
}, {
  code: "tw",
  display: "Twi"
}, {
  code: "ty",
  display: "Reo Mā`ohi"
}, {
  code: "tzm",
  display: "ⵜⴰⵎⴰⵣⵉⵖⵜ"
}, {
  code: "udm",
  display: "Удмурт кыл"
}, {
  code: "ug",
  display: "Uyƣurqə / ئۇيغۇرچە"
}, {
  code: "uk",
  display: "Українська"
}, {
  code: "ur",
  display: "اردو"
}, {
  code: "uz",
  display: "Ўзбек"
}, {
  code: "ve",
  display: "Tshivenḓa"
}, {
  code: "vec",
  display: "Vèneto"
}, {
  code: "vi",
  display: "Việtnam"
}, {
  code: "vls",
  display: "West-Vlaoms"
}, {
  code: "vo",
  display: "Volapük"
}, {
  code: "wa",
  display: "Walon"
}, {
  code: "war",
  display: "Winaray / Binisaya Lineyte-Samarnon"
}, {
  code: "wo",
  display: "Wollof"
}, {
  code: "xal",
  display: "Хальмг"
}, {
  code: "xh",
  display: "isiXhosa"
}, {
  code: "xmf",
  display: "მარგალური"
}, {
  code: "yi",
  display: "ייִדיש"
}, {
  code: "yo",
  display: "Yorùbá"
}, {
  code: "yue",
  display: "粵語"
}, {
  code: "za",
  display: "Cuengh / Tôô / 壮语"
}, {
  code: "zh",
  display: "中文"
}, {
  code: "zh-classical",
  display: "文言"
}, {
  code: "zh-hans",
  display: "中文 (简体)"
}, {
  code: "zh-hant",
  display: "中文 (繁體)"
}, {
  code: "zh-min-nan",
  display: "Bân-lâm-gú"
}, {
  code: "zh-tw",
  display: "‪中文(台灣)‬"
}, {
  code: "zh-yue",
  display: "粵語 / 粤语"
}, {
  code: "zu",
  display: "isiZulu"
}];
function languageValueToDisplay(value) {
  if (!Number.isNaN(Number.parseInt(value, 10))) {
    value = "mul";
  } else {
    value = value.replaceAll("_", "-").toLowerCase();
  }
  var _iterator = _createForOfIteratorHelper(languages),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var language = _step.value;
      if (language.code === value) return language.display;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  value = extractLanguageCodeFromLocal(value);
  var _iterator2 = _createForOfIteratorHelper(languages),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _language = _step2.value;
      if (_language.code === value) return _language.display;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return value;
}
function extractLanguageCodeFromLocal(value) {
  var match = /(\w+)/g.exec(value);
  if (match) return match[1];
  return value;
}

/***/ }),

/***/ "./ui/lazyInitMore.ts":
/*!****************************!*\
  !*** ./ui/lazyInitMore.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lazyInitMore: () => (/* binding */ lazyInitMore)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);

var _document$getElementB, _document$getElementB2, _document$getElementB3;

// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
var scrollLeft = 0;
function lazyInitMore(_x) {
  return _lazyInitMore.apply(this, arguments);
}
function _lazyInitMore() {
  _lazyInitMore = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(reset) {
    var contentElement, elements, i, boundingClientRect, div;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (reset) {
            scrollLeft = 0;
          }
          contentElement = document.getElementById("content");
          if (contentElement) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return");
        case 4:
          if (!(scrollLeft && contentElement.scrollLeft < scrollLeft + contentElement.clientWidth)) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return");
        case 6:
          scrollLeft = contentElement.scrollLeft + contentElement.clientWidth;
          elements = document.querySelectorAll("#compare .dynamic-more");
          for (i = 0; i < elements.length; i++) {
            boundingClientRect = elements[i].getBoundingClientRect();
            if (boundingClientRect.left < contentElement.clientWidth * 3) {
              if (isOverflown(elements[i])) {
                elements[i].classList.add("more");
                div = document.createElement("div");
                div.classList.add("fade-out");
                div.innerHTML = '<div class="button"><span class="text">&mdash; More &mdash;</span></div>';
                elements[i].appendChild(div);
                div.addEventListener("click", function () {
                  this.style.display = "none";
                  var h = this.parentElement;
                  h.style.height = h.scrollHeight + "px";
                  setTimeout(function () {
                    h.style.height = "auto";
                  }, 1200);
                });
              }
              elements[i].classList.remove("dynamic-more");
            }
          }
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _lazyInitMore.apply(this, arguments);
}
(_document$getElementB = document.getElementById("content")) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("scroll", function () {
  lazyInitMore();
});
(_document$getElementB2 = document.getElementById("content")) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener("load", function () {
  lazyInitMore();
});
(_document$getElementB3 = document.getElementById("content")) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.addEventListener("resize", function () {
  lazyInitMore();
});

/***/ }),

/***/ "./ui/lazyLoadImages.ts":
/*!******************************!*\
  !*** ./ui/lazyLoadImages.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lazyLoadImages: () => (/* binding */ lazyLoadImages)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);

var _document$getElementB, _document$getElementB2, _document$getElementB3;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

var scrollTop = 0;
var scrollLeft = 0;
function lazyLoadImages(_x) {
  return _lazyLoadImages.apply(this, arguments);
}
function _lazyLoadImages() {
  _lazyLoadImages = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(reset) {
    var contentElement, elements, i, boundingClientRect, sources, _iterator, _step, src, _elements, _i, _boundingClientRect, _sources, _iterator2, _step2, _src;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (reset) {
            scrollTop = 0;
            scrollLeft = 0;
          }
          contentElement = document.getElementById("content");
          if (contentElement) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return");
        case 4:
          if (!(!scrollTop || contentElement.scrollTop > scrollTop + contentElement.clientHeight)) {
            _context.next = 39;
            break;
          }
          scrollTop = contentElement.scrollTop + contentElement.clientHeight;
          elements = document.querySelectorAll("#list *[dynamic-src]");
          i = 0;
        case 8:
          if (!(i < elements.length)) {
            _context.next = 39;
            break;
          }
          boundingClientRect = elements[i].getBoundingClientRect();
          if (!(elements[i].hasAttribute("dynamic-src") && boundingClientRect.top < (contentElement === null || contentElement === void 0 ? void 0 : contentElement.clientHeight) * 3)) {
            _context.next = 36;
            break;
          }
          sources = (elements[i].getAttribute("dynamic-src") || "").split(" ");
          _iterator = _createForOfIteratorHelper(sources);
          _context.prev = 13;
          _iterator.s();
        case 15:
          if ((_step = _iterator.n()).done) {
            _context.next = 27;
            break;
          }
          src = _step.value;
          _context.t0 = document.body.contains(elements[i]);
          if (!_context.t0) {
            _context.next = 22;
            break;
          }
          _context.next = 21;
          return isImage(src);
        case 21:
          _context.t0 = _context.sent;
        case 22:
          if (!_context.t0) {
            _context.next = 25;
            break;
          }
          elements[i].setAttribute("src", src);
          return _context.abrupt("break", 27);
        case 25:
          _context.next = 15;
          break;
        case 27:
          _context.next = 32;
          break;
        case 29:
          _context.prev = 29;
          _context.t1 = _context["catch"](13);
          _iterator.e(_context.t1);
        case 32:
          _context.prev = 32;
          _iterator.f();
          return _context.finish(32);
        case 35:
          elements[i].removeAttribute("dynamic-src");
        case 36:
          i++;
          _context.next = 8;
          break;
        case 39:
          if (!(!scrollLeft || contentElement.scrollLeft > scrollLeft + contentElement.clientWidth)) {
            _context.next = 74;
            break;
          }
          scrollLeft = contentElement.scrollLeft + contentElement.clientWidth;
          _elements = document.querySelectorAll("#compare *[dynamic-src]");
          _i = 0;
        case 43:
          if (!(_i < _elements.length)) {
            _context.next = 74;
            break;
          }
          _boundingClientRect = _elements[_i].getBoundingClientRect();
          if (!(_elements[_i].hasAttribute("dynamic-src") && _boundingClientRect.left < (contentElement === null || contentElement === void 0 ? void 0 : contentElement.clientWidth) * 2)) {
            _context.next = 71;
            break;
          }
          _sources = (_elements[_i].getAttribute("dynamic-src") || "").split(" ");
          _iterator2 = _createForOfIteratorHelper(_sources);
          _context.prev = 48;
          _iterator2.s();
        case 50:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 62;
            break;
          }
          _src = _step2.value;
          _context.t2 = document.body.contains(_elements[_i]);
          if (!_context.t2) {
            _context.next = 57;
            break;
          }
          _context.next = 56;
          return isImage(_src);
        case 56:
          _context.t2 = _context.sent;
        case 57:
          if (!_context.t2) {
            _context.next = 60;
            break;
          }
          _elements[_i].setAttribute("src", _src);
          return _context.abrupt("break", 62);
        case 60:
          _context.next = 50;
          break;
        case 62:
          _context.next = 67;
          break;
        case 64:
          _context.prev = 64;
          _context.t3 = _context["catch"](48);
          _iterator2.e(_context.t3);
        case 67:
          _context.prev = 67;
          _iterator2.f();
          return _context.finish(67);
        case 70:
          _elements[_i].removeAttribute("dynamic-src");
        case 71:
          _i++;
          _context.next = 43;
          break;
        case 74:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[13, 29, 32, 35], [48, 64, 67, 70]]);
  }));
  return _lazyLoadImages.apply(this, arguments);
}
(_document$getElementB = document.getElementById("content")) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("scroll", function () {
  lazyLoadImages();
});
(_document$getElementB2 = document.getElementById("content")) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener("load", function () {
  lazyLoadImages();
});
(_document$getElementB3 = document.getElementById("content")) === null || _document$getElementB3 === void 0 || _document$getElementB3.addEventListener("resize", function () {
  lazyLoadImages();
});
function isImage(_x2) {
  return _isImage.apply(this, arguments);
}
function _isImage() {
  _isImage = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2(src) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve) {
            var img = new Image();
            img.addEventListener("load", function () {
              resolve(true);
            });
            img.addEventListener("error", function () {
              resolve(false);
            });
            img.src = src;
            if (img.complete) resolve(true);
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _isImage.apply(this, arguments);
}

/***/ }),

/***/ "./ui/platform.ts":
/*!************************!*\
  !*** ./ui/platform.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   platformValueToDisplay: () => (/* binding */ platformValueToDisplay)
/* harmony export */ });
/* harmony import */ var _utilities_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities/string */ "./ui/utilities/string.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.


var platforms = [{
  name: "Linux",
  synonym: ["linux"],
  version: [{
    name: "Openmoko Linux",
    synonym: ["openmoko", "openmoko linux"]
  }]
}, {
  name: "Android",
  synonym: ["android"],
  version: []
}, {
  name: "Firefox OS",
  synonym: ["firefox os", "firefoxos"],
  version: []
}, {
  name: "Maemo",
  synonym: ["maemo"],
  version: []
}, {
  name: "MeeGo",
  synonym: ["meego"],
  version: []
}, {
  name: "Tizen",
  synonym: ["tizen"],
  version: []
}, {
  name: "WebOS",
  synonym: ["webos"],
  version: []
}, {
  name: "iOS",
  synonym: ["ios"],
  version: [{
    name: "iPhone",
    synonym: ["iphone"]
  }, {
    name: "iPad",
    synonym: ["ipad"]
  }, {
    name: "iPod touch",
    synonym: ["ipod touch", "ipod"]
  }]
}, {
  name: "MacOS",
  synonym: ["macos", "mac", "mac os", "os x", "osx", "mac os x", "macosx"],
  version: []
}, {
  name: "Unix",
  synonym: ["unix"],
  version: []
}, {
  name: "Bada OS",
  synonym: ["bada"],
  version: []
}, {
  name: "BSD",
  synonym: ["bsd"],
  version: []
}, {
  name: "FreeBSD",
  synonym: ["freebsd"],
  version: []
}, {
  name: "Amiga OS",
  synonym: ["amigaos", "amiga os", "amiga"],
  version: [{
    name: "MorphOS",
    synonym: ["morphos"]
  }, {
    name: "ArOS",
    synonym: ["aros"]
  }]
}, {
  name: "Windows CE",
  synonym: ["windows ce", "wince"],
  version: []
}, {
  name: "Windows Mobile",
  synonym: ["windows mobile", "wm"],
  version: [{
    name: "Windows Mobile 5",
    synonym: ["windows mobile 5", "wm5"]
  }, {
    name: "Windows Mobile 6",
    synonym: ["windows mobile 6", "wm6"]
  }, {
    name: "Windows Mobile 2000",
    synonym: ["windows mobile 2000", "wm2000"]
  }, {
    name: "Windows Mobile 2003",
    synonym: ["windows mobile 2003", "wm2003"]
  }, {
    name: "Pocket PC",
    synonym: ["pocket pc", "pocketpc"]
  }]
}, {
  name: "Windows Phone",
  synonym: ["windows phone", "windows phone 10"],
  version: []
}, {
  name: "Windows",
  synonym: ["windows", "win"],
  version: [{
    name: "Windows XP",
    synonym: ["windows xp", "winxp"]
  }, {
    name: "Windows 2000",
    synonym: ["windows 2000", "win2k"]
  }, {
    name: "Windows Vista",
    synonym: ["windows vista", "vista"]
  }, {
    name: "Windows 7",
    synonym: ["windows 7", "win7"]
  }, {
    name: "Windows 8",
    synonym: ["windows 8", "win8"]
  }, {
    name: "Windows 8.1",
    synonym: ["windows 8.1", "win8.1"]
  }, {
    name: "Windows 10",
    synonym: ["windows 10", "win10"]
  }]
}, {
  name: "BlackBerry OS",
  synonym: ["blackberry os", "blackberry", "bbos"],
  version: []
}, {
  name: "Brew",
  synonym: ["brew"],
  version: []
}, {
  name: "Palm OS",
  synonym: ["palm", "palm os", "palmos"],
  version: []
}, {
  name: "Symbian",
  synonym: ["symbian", "s60"],
  version: []
}, {
  name: "Cross-platform",
  synonym: ["cross-platform", "cross platform"],
  version: []
}, {
  name: "Java ME",
  synonym: ["j2me", "java me"],
  version: []
}, {
  name: "Java SE",
  synonym: ["j2se", "java se"],
  version: []
}, {
  name: "Java",
  synonym: ["java"],
  version: []
}, {
  name: "Node.js",
  synonym: ["node", "node.js"],
  version: []
}, {
  name: "Qt",
  synonym: ["qt"],
  version: []
}, {
  name: "React Native",
  synonym: ["react native"],
  version: []
}, {
  name: "Unity",
  synonym: ["unity"],
  version: []
}, {
  name: "Web",
  synonym: ["web", "web-based", "webapp", "web-app", "browser"],
  version: []
}, {
  name: "Software for miscellaneous platforms",
  synonym: ["other"],
  version: []
}];
function platformValueToDisplay(value) {
  var _iterator = _createForOfIteratorHelper(platforms),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var platform = _step.value;
      var _iterator2 = _createForOfIteratorHelper(platform.version),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var version = _step2.value;
          if (version.synonym.filter(function (s) {
            return (0,_utilities_string__WEBPACK_IMPORTED_MODULE_0__.equalsIgnoreCase)(s, value);
          }).length > 0) return platform.name;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (platform.synonym.filter(function (s) {
        return (0,_utilities_string__WEBPACK_IMPORTED_MODULE_0__.equalsIgnoreCase)(s, value);
      }).length > 0) return platform.name;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return value;
}

/***/ }),

/***/ "./ui/templateData.ts":
/*!****************************!*\
  !*** ./ui/templateData.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   templateData: () => (/* binding */ templateData)
/* harmony export */ });
var templateData = {
  params: {
    lang: {
      label: {
        de: "Sprache der Vorlage",
        en: "Template language",
        "zh-hans": "模板语言"
      },
      type: "string",
      description: {
        de: "Sprache, in der die Texte der Vorlage angezeigt werden"
      },
      example: {
        de: "de",
        en: "en"
      }
    },
    name: {
      label: {
        en: "Name",
        de: "Name",
        "zh-hans": "名称"
      },
      description: {
        en: "Official name, otherwise most common one",
        de: "Offizieller Name, ansonsten der verbreitetste"
      },
      type: "string",
      required: true,
      autovalue: "{{subst:PAGENAME}}"
    },
    status: {
      description: "Current status of the project.",
      label: "Status",
      suggestedvalues: ["active", "unmaintained", "broken", "unfinished"],
      type: "string",
      "default": "active",
      suggested: true
    },
    license: {
      description: "What free license or proprietary?",
      example: "GPL",
      label: {
        en: "License",
        de: "Lizenz"
      },
      suggestedvalues: ["GPL", "BSD", "MIT", "free", "proprietary", "AGPL"]
    },
    price: {
      description: "Costs if proprietary. If price is empty, application is for free.",
      example: "free;20$;35€;in-app purchases",
      label: {
        en: "Price",
        de: "Preis"
      },
      type: "string",
      suggestedvalues: ["free", "in-app purchases"]
    },
    web: {
      label: "Web address",
      example: "https://www.example.org",
      suggested: true,
      type: "url"
    },
    repo: {
      label: {
        de: "Quellcode",
        en: "Source code",
        "zh-hans": "源代码"
      },
      aliases: ["git", "svn"],
      description: "URL to view or download the source code (for example, a Git, Subversion, or CVS repository)",
      example: "https://git.example.org",
      type: "url"
    },
    logo: {
      label: "Logo",
      example: "xyz.png",
      type: "wiki-file-name"
    },
    screenshot: {
      label: {
        de: "Bildschirmfoto",
        en: "Screenshot",
        "zh-hans": "截图"
      },
      suggested: true,
      type: "wiki-file-name",
      example: "xyz.jpg"
    },
    description: {
      label: {
        de: "Beschreibung",
        en: "Description",
        "zh-hans": "描述"
      },
      type: "string",
      suggested: true,
      description: "Brief description. What distinguishes this from other tools? (Write your own description, don't just copy it from the website)",
      example: "Easy to use, nice UI"
    },
    author: {
      label: {
        de: "Autor",
        en: "Author",
        "zh-hans": "作者"
      },
      description: {
        de: "Name des Autors/der Autorin oder ein Link zu dessen/deren OSM-Wiki-Benutzerseite",
        en: "Name of the author or a link to their OSM-wiki user page"
      },
      type: "string",
      suggested: true
    },
    platform: {
      description: "List of platforms it runs on.",
      suggested: true,
      type: "string",
      suggestedvalues: ["Linux", "Android", "Firefox OS", "Maemo", "MeeGo", "Openmoko Linux", "Tizen", "WebOS", "iOS", "iPhone", "iPad", "iPod touch", "macOS", "Unix", "Bada OS", "BSD", "FreeBSD", "Amiga OS", "MorphOS", "ArOS", "Windows", "Windows XP", "Windows 2000", "Windows Vista", "Windows 7", "Windows 8", "Windows 8.1", "Windows 10", "Windows CE", "Windows Mobile", "Windows Mobile 5", "Windows Mobile 6", "Windows Mobile 2000", "Windows Mobile 2003", "Pocket PC", "Windows Phone", "BlackBerry OS", "Brew", "Palm OS", "Symbian", "Cross-platform", "Java", "Java ME", "Java SE", "Node.js", "Qt", "React Native", "Unity", "Web"],
      example: "Android;iOS",
      label: {
        en: "Supported platforms",
        de: "Plattform"
      }
    },
    genre: {
      description: "Main category for this tool.",
      suggested: true,
      label: "Genre",
      suggestedvalues: ["display", "navi", "logger", "router", "editor", "renderer", "converter", "analyser"]
    },
    languages: {
      description: "Supported languages (list of valid language codes separated by semicolons) or number of languages supported",
      example: "DE;EN;MUL",
      type: "string",
      suggestedvalues: ["aa", "ab", "af", "ak", "als", "am", "an", "ang", "ar", "arc", "as", "ast", "av", "awa", "ay", "az", "ba", "bar", "bat-smg", "bcl", "be", "be-x-old", "bg", "bh", "bi", "bm", "bn", "bo", "bpy", "br", "bs", "bug", "bxr", "ca", "cdo", "ce", "ceb", "ch", "cho", "chr", "chy", "closed-zh-tw", "co", "cr", "cs", "csb", "cu", "cv", "cy", "da", "de", "diq", "dsb", "dv", "dz", "ee", "el", "en", "eo", "es", "et", "eu", "ext", "fa", "ff", "fi", "fiu-vro", "fj", "fo", "fr", "frp", "fur", "fy", "ga", "gan", "gbm", "gcf", "gd", "gil", "gl", "gn", "got", "gu", "gv", "ha", "hak", "haw", "he", "hi", "ho", "hr", "ht", "hu", "hy", "hz", "ia", "id", "ie", "ig", "ii", "ik", "ilo", "inh", "io", "is", "it", "iu", "ja", "jbo", "jv", "ka", "kg", "khw", "ki", "kj", "kk", "kl", "km", "kn", "ko", "kr", "ks", "ksh", "ku", "kv", "kw", "ky", "la", "lad", "lan", "lb", "lg", "li", "lij", "lmo", "ln", "lo", "lt", "lv", "lzz", "man", "map-bms", "mg", "mh", "mi", "min", "mk", "ml", "mn", "mo", "mr", "mrh", "ms", "mt", "mul", "mus", "mwl", "my", "na", "nah", "nap", "nb", "nd", "nds", "nds-nl", "ne", "new", "ng", "nl", "nn", "no", "nr", "nrm", "nso", "nv", "ny", "oc", "oj", "om", "or", "os", "pa", "pag", "pam", "pap", "pdc", "pi", "pih", "pl", "pms", "ps", "pt", "qu", "rm", "rmy", "rn", "ro", "roa-rup", "ru", "rw", "sa", "sc", "scn", "sco", "sd", "se", "sg", "sh", "si", "simple", "sk", "sl", "sm", "sn", "so", "sq", "sr-latn", "sr", "ss", "st", "su", "sv", "sw", "ta", "te", "tet", "tg", "th", "ti", "tk", "tl", "tlh", "tn", "to", "tokipona", "tpi", "tr", "ts", "tt", "tum", "tw", "ty", "tzm", "udm", "ug", "uk", "ur", "uz", "ve", "vec", "vi", "vls", "vo", "wa", "war", "wo", "xal", "xh", "xmf", "yi", "yo", "yue", "za", "zh", "zh-classical", "zh-hans", "zh-hant", "zh-min-nan", "zh-tw", "zh-yue", "zu"],
      label: {
        en: "Languages",
        de: "Sprachen"
      }
    },
    coverage: {
      description: 'Coverage or target region of the app. Formatting: "Continent, Country, Region, ...". Use "Worldwide" or leave it empty for global use.',
      example: "Europe, Switzerland, Zurich, Gossau",
      label: "Coverage",
      "default": "Worldwide",
      type: "string"
    },
    languagesurl: {
      description: "Link to the actual full list of languages supported, described on another page (e.g. a portal page for the software, or a repository).",
      label: "Languages URL",
      type: "url"
    },
    code: {
      description: "List of programming languages used.",
      type: "string",
      suggestedvalues: ["C", "Objective-C", "Objective-C++", "C++", "C#", "Visual Basic .NET", "Pascal", "Java", "JavaScript", "ActionScript", "HTML", "CSS", "Perl", "PHP", "Python", "Ruby", "Lua", "SQL", "Swift", "TypeScript", ".NET", "Node.js"],
      label: {
        en: "Code",
        de: "Code"
      }
    },
    framework: {
      description: "List of frameworks used.",
      example: "GTK+;mono;J2ME;OpenGL",
      suggestedvalues: ["GTK+", "mono", "J2ME", "OpenGL"],
      label: {
        en: "Framework",
        de: "Framework"
      }
    },
    version: {
      label: {
        en: "Version",
        "zh-hans": "版本",
        de: "Version"
      },
      description: "Latest version",
      example: "1.0",
      type: "string"
    },
    date: {
      label: {
        en: "Release date",
        "zh-hans": "日期"
      },
      description: "Latest release date",
      example: "2010-12-24",
      type: "date"
    },
    asin: {
      description: "Amazon Standard Identification Number for the Amazon Appstore for Android",
      example: "XXXXXXXXXX",
      label: "Amazon Identification",
      type: "string"
    },
    bbWorldID: {
      description: "BlackBerry World application ID",
      label: "BlackBerry ID",
      deprecated: true,
      example: "XXX",
      type: "string"
    },
    fDroidID: {
      description: "F-Droid application ID",
      label: "F-Droid ID",
      example: "org.example",
      type: "string"
    },
    firefoxMarketplaceID: {
      description: "Mozilla Firefox Marketplace application ID",
      label: "Firefox Marketplace ID",
      deprecated: true,
      type: "string"
    },
    googlePlayID: {
      description: "Google Play Store application ID",
      label: "Google Play ID",
      example: "org.example",
      type: "string"
    },
    huaweiAppGalleryID: {
      description: "Huawei AppGallery application ID",
      example: "CXXXXXXXXX",
      type: "string"
    },
    appleStoreID: {
      description: "iTunes App Store application ID",
      label: "AppStore ID",
      example: "id12344556",
      type: "string"
    },
    macAppStoreID: {
      description: "Mac App Store application ID",
      label: "Mac AppStore ID",
      example: "id12344556",
      type: "string"
    },
    microsoftAppID: {
      description: "Microsoft Store Windows application UUID",
      label: "Microsoft ID",
      example: "XXXXXXXXXXXX",
      type: "string"
    },
    map: {
      description: "[Map display] Can it show a map?",
      label: {
        en: "Display map",
        de: "Karte anzeigen"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    mapData: {
      description: '[Map display] Maps drawn using pre-calculated/rasterized images (raster) or "on the fly" (vector)?',
      label: "Map data",
      type: "string",
      suggestedvalues: ["raster", "vector"]
    },
    datasource: {
      description: "[Map display] Can you store all map data offline? Download a separate file?",
      label: "Source",
      example: "online;cache",
      type: "string",
      suggestedvalues: ["online", "cache", "offline"]
    },
    rotateMap: {
      description: "[Map display] Does it turn the map in driving/walking direction?",
      label: {
        en: "Rotate map",
        de: "Karte drehen"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    "3D": {
      description: "[Map display] Is there some 3D or 2.5D view?",
      type: "string",
      suggestedvalues: ["yes", "no"],
      label: {
        en: "3D view",
        de: "3D-Ansicht"
      }
    },
    showWebsite: {
      description: "[POI Information] Shows link to the website from POI",
      label: "Shows website",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    showPhoneNumber: {
      description: "[POI Information] Shows phone number from POI",
      label: "Shows phone number",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    showOpeningHours: {
      description: "[POI Information] Shows hours of operation from POI",
      label: "Shows operation hours",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    routing: {
      description: {
        en: "[Routing] Can you calculate or otherwise plan a route?",
        de: "Funktionen: Können Sie eine Route berechnen oder sonst wie planen?"
      },
      label: "Routing",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    createRouteManually: {
      description: "[Routing]",
      label: {
        en: "Create route manually",
        de: "Route von Hand eingeben"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    calculateRoute: {
      description: "[Routing] Can it calculate a route using routing?",
      label: {
        en: "Calculate route",
        de: "Route berechnen"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    createRouteViaWaypoints: {
      description: "[Routing] Able to calculate route via Waypoints",
      label: {
        en: "Create route via Waypoints"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    profiles: {
      description: "[Routing] What profiles supported if it makes routing?",
      label: "Routing profiles",
      example: "car;bike;foot;wheelchair",
      type: "string",
      suggestedvalues: ["car", "bike", "foot", "wheelchair"]
    },
    turnRestrictions: {
      description: "[Routing] Can it deal with turn restrictions?",
      label: {
        en: "Turn restrictions",
        de: "Abbiegebeschränkungen"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    calculateRouteOffline: {
      description: "[Routing] Does it need internet to calculate a route?",
      label: {
        en: "Calculate route without Internet (Offline routing)",
        de: "Route berechnen ohne Internet"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    routingProviders: {
      description: "[Routing] What routing service(s) does it use?",
      label: "Routing providers",
      example: "OpenRouteService;Yours",
      type: "string",
      suggestedvalues: ["OpenRouteService", "Yours", "CloudMade", "MapQuest", "Graphhopper", "OSRM", "Valhalla"]
    },
    avoidTraffic: {
      description: "[Routing] Does app optimize route to avoid traffic jams?",
      label: "Avoid traffic",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    trafficProvider: {
      description: "[Routing] Traffic data source provider.",
      label: "Traffic Provider"
    },
    navigating: {
      description: "[Navigation] Can you navigate in a compass like way?",
      label: {
        en: "Navigate",
        de: "Navigieren"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    findLocation: {
      description: "[Navigation] Can it search for a street/place?",
      label: {
        en: "Find location",
        de: "Finde eine Position"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    findNearbyPOI: {
      description: "[Navigation] Can it discover/display Points of interests?",
      label: {
        en: "Find nearby POIs",
        de: "Finde POI in der Nähe"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    navToPoint: {
      description: "[Navigation] Can it guide you to a point somewhere?",
      label: {
        en: "Navigate to point",
        de: "Navigiere zu einem Punkt"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    voice: {
      description: "[Navigation] Can it give you commands with a computer voice?",
      label: {
        en: "Navigation with voice / Voice guidance",
        de: "Navigation mit Sprachansage"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    keepOnRoad: {
      description: "[Navigation] Can it assist you to keep your vehicle on the calculated route?",
      label: "Keep on road",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    turnLanes: {
      description: "[Navigation] Does it support lane guidance?",
      label: "Lane guidance",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    withoutGPS: {
      description: "[Navigation] Does it work even without a GPS?",
      label: {
        en: "Works without GPS",
        de: "Funktioniert ohne GPS"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    predefinedRoute: {
      description: "[Navigation] Can it follow other GPS tracks?",
      label: {
        en: "Navigate along predefined route",
        de: "Folge einer vordefinierten Route"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    tracking: {
      description: "[Track logging] Can it record a GPS track?",
      type: "string",
      suggestedvalues: ["yes", "no"],
      label: {
        en: "Make track",
        de: "Track aufzeichnen"
      }
    },
    customInterval: {
      description: "[Track logging] Can you tune the interval manually?",
      label: {
        en: "Customizable log interval",
        de: "Einstellbares Aufzeichnungsintervall"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    trackFormats: {
      description: "[Track logging] What formats for storage can you save your GPS track?",
      example: "gpx;csv",
      aliases: ["formats"],
      label: {
        en: "Track formats"
      },
      type: "string",
      suggestedvalues: ["gpx", "kml", "nmea", "csv", "trk"]
    },
    geotagging: {
      description: "[Track logging] Are further mapping techniques supported",
      label: "Geotagging",
      example: "note;photo",
      type: "string",
      suggestedvalues: ["note", "photo", "audio"]
    },
    fastWayPointAdding: {
      description: "[Track logging] Easy to add a new Waypoint?",
      label: {
        en: "Fast POI buttons",
        de: "Knöpfe zum schnellen Setzen von Wegpunkten"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    uploadGPX: {
      description: "[Track logging] Can it send tracks directly to OSM?",
      type: "string",
      suggestedvalues: ["yes", "no"],
      label: "Upload GPX to OSM"
    },
    monitoring: {
      description: "[Track monitoring] Can you monitor GPS datas?",
      label: {
        en: "Monitoring",
        de: "Monitoring"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    showTrack: {
      description: "[Track monitoring] Show your current track?",
      label: {
        en: "Show current track",
        de: "Zeige aktuellen Track"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    showExistingTrack: {
      description: "[Track monitoring] Can it load existing tracks so you can follow them?",
      label: {
        en: "Open existing track",
        de: "Öffne existierenden Track"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    showAltitudeDiagram: {
      description: "[Track monitoring]",
      label: {
        en: "Altitude diagram",
        de: "Höhendiagramm"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    showDOP: {
      description: "[Track monitoring] Shows signal quality?",
      label: {
        en: "Show POD value",
        de: "Zeige DOP-Wert"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    showSatellites: {
      description: "[Track monitoring] Displays satellites?",
      label: {
        en: "Satellite view",
        de: "Zeige Satelliten"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    showNMEAlive: {
      description: "[Track monitoring] Can you see the raw GPS stream?",
      label: {
        en: "Show live NMEA data",
        de: "Zeige NMEA-Livedaten"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    showSpeed: {
      description: "[Track monitoring]",
      label: "Show speed",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    sendPosition: {
      description: "[Track monitoring] Can it send position to others?",
      example: "yes;mail;www",
      label: {
        en: "Send current position",
        de: "Sende aktuelle Position"
      },
      type: "string",
      suggestedvalues: ["yes", "no", "sms", "mail", "www"]
    },
    addPOI: {
      description: "[Editor] Can you add a node?",
      label: {
        en: "Add POIs",
        de: "POI hinzufügen"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    editPOI: {
      description: "[Editor] Can you edit a node?",
      label: {
        en: "Edit / Delete POIs",
        de: "POI bearbeiten/löschen"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    addWay: {
      description: "[Editor] Can you add a way?",
      label: "Add way",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    editGeom: {
      description: "[Editor] Can you edit nodes/ways?",
      label: {
        en: "Edit geometries",
        de: "Geometrie bearbeiten"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    editTags: {
      description: "[Editor] Can you edit existing tags?",
      label: {
        en: "Edit arbitrary tags of existing OSM objects",
        de: "Beliebige Tags an vorhandenen OSM-Objekten bearbeiten"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    editRelations: {
      description: "[Editor] Can you edit relations?",
      label: "Edit relations",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    viewNotes: {
      description: "[Editor] Can you view OSM Notes?",
      label: "View notes",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    createNotes: {
      description: "[Editor] Can you add OSM Notes?",
      label: "Create notes",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    editNotes: {
      description: "[Editor] Can you comment/close OSM Notes?",
      label: "Edit notes",
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    editSource: {
      description: "[Editor] Can you work offline?",
      label: "Work offline",
      example: "online;cache",
      type: "string",
      suggestedvalues: ["online", "cache", "offline"]
    },
    offsetDBsupport: {
      description: "[Editor] Does it support the imagery offset DB?",
      label: {
        en: "Support imagery offset DB",
        de: "Unterstützt Luftbildversatz DB"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    uploadOSMData: {
      description: "[Editor] Can you send changes to OSM directly?",
      label: {
        en: "Upload to OSM",
        de: "Zu OSM hochladen"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    rendererOutputFormats: {
      description: "[Renderer] Supported output formats.",
      example: "svg;pdf;png",
      label: "Renderer output formats"
    },
    accessibility: {
      description: "[Accessibility] Does it help disabled people in some kind?",
      example: "blind;wheelchair",
      label: "Accessibility support",
      type: "string",
      suggestedvalues: ["blind", "wheelchair"]
    },
    textOnlyUI: {
      description: "[Accessibility] Text to braille compatible interface?",
      label: {
        en: "Complete non graphics text output",
        de: "Komplett ohne Grafik bedienbar"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    brailleUI: {
      description: "[Accessibility] A special braille interface?",
      label: {
        en: "Braille interface",
        de: "Braille-Oberfläche"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    explorerMode: {
      description: "[Accessibility] Has a exploration modus (tell all objects approaching)?",
      label: {
        en: "Exploration modus",
        de: "Erkundungsmodus"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    publicTransportMode: {
      description: "[Accessibility] Supports routing with public transport?",
      label: {
        en: "Public Transport mode",
        de: "ÖPNV-Modus"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    dangerWarnings: {
      description: "[Accessibility]",
      label: {
        en: "Danger Warnings",
        de: "Gefahrenwarnungen"
      },
      type: "string",
      suggestedvalues: ["yes", "no"]
    },
    screenReader: {
      description: "[Accessibility] List of supported screenreaders",
      example: "NVDA",
      label: {
        en: "Screenreader",
        de: "Screenreader"
      }
    },
    screenReaderLang: {
      description: "[Accessibility] List of supported screenreaders languages",
      example: "EN;DE",
      label: {
        en: "Screenreader languages",
        de: "Screenreader-Sprachen"
      }
    }
  },
  paramOrder: ["lang", "name", "status", "license", "price", "web", "repo", "logo", "screenshot", "description", "author", "platform", "genre", "languages", "languagesurl", "code", "framework", "version", "date",
  // Install options
  "asin", "bbWorldID", "fDroidID", "firefoxMarketplaceID", "googlePlayID", "huaweiAppGalleryID", "appleStoreID", "macAppStoreID", "microsoftAppID",
  // Map
  "map", "mapData", "datasource", "rotateMap", "3D", "showWebsite", "showPhoneNumber", "showOpeningHours",
  // Routing
  "routing", "createRouteManually", "calculateRoute", "createRouteViaWaypoints", "profiles", "turnRestrictions", "calculateRouteOffline", "routingProviders", "avoidTraffic", "trafficProvider",
  // Navigating
  "navigating", "findLocation", "findNearbyPOI", "navToPoint", "voice", "keepOnRoad", "turnLanes", "withoutGPS", "predefinedRoute",
  // Tracking
  "tracking", "customInterval", "trackFormats", "geotagging", "fastWayPointAdding", "uploadGPX",
  // Monitoring
  "monitoring", "showTrack", "showExistingTrack", "showAltitudeDiagram", "showDOP", "showSatellites", "showNMEAlive", "showSpeed", "sendPosition",
  // Editing
  "addPOI", "editPOI", "addWay", "editGeom", "editTags", "editRelations", "viewNotes", "createNotes", "editNotes", "editSource", "offsetDBsupport", "uploadOSMData",
  // Rendering
  "rendererOutputFormats",
  // Accessibility
  "accessibility", "textOnlyUI", "brailleUI", "explorerMode", "publicTransportMode", "dangerWarnings", "screenReader", "screenReaderLang"],
  format: "block",
  description: "This template collects all notes of a software together. Some common information is displayed as an infobox."
};

/***/ }),

/***/ "./ui/utilities/array.ts":
/*!*******************************!*\
  !*** ./ui/utilities/array.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   includes: () => (/* binding */ includes),
/* harmony export */   removeDuplicates: () => (/* binding */ removeDuplicates),
/* harmony export */   shuffle: () => (/* binding */ shuffle),
/* harmony export */   some: () => (/* binding */ some)
/* harmony export */ });
// Copyright (C) 2020 Markus Peloso
// 
// This file is part of OSM Apps Catalog.
// 
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

function includes(arr, target) {
  return target.every(function (v) {
    return arr.includes(v);
  });
}
function some(arr, target) {
  return target.some(function (v) {
    return arr.includes(v);
  });
}
function removeDuplicates(arr) {
  return arr.filter(function (c, index) {
    return arr.indexOf(c) === index;
  });
}
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }
}

/***/ }),

/***/ "./ui/utilities/coloriz/Color.ts":
/*!***************************************!*\
  !*** ./ui/utilities/coloriz/Color.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Color: () => (/* binding */ Color),
/* harmony export */   hexToRgb: () => (/* binding */ hexToRgb)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/esm/createClass.js");


// Copyright (C) 2020 Markus Peloso
//
// This file is part of osm-app-component.
//
// osm-app-component is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// osm-app-component is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with osm-app-component.  If not, see <http://www.gnu.org/licenses/>.

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw "hex has a unexpected format.";
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}
var Color = /*#__PURE__*/function () {
  function Color(r, g, b) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Color);
    this.r = r;
    this.g = g;
    this.b = b;
    this.set(r, g, b);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Color, [{
    key: "toString",
    value: function toString() {
      return "rgb(".concat(Math.round(this.r), ", ").concat(Math.round(this.g), ", ").concat(Math.round(this.b), ")");
    }
  }, {
    key: "set",
    value: function set(r, g, b) {
      this.r = this.clamp(r);
      this.g = this.clamp(g);
      this.b = this.clamp(b);
    }
  }, {
    key: "hueRotate",
    value: function hueRotate() {
      var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      angle = angle / 180 * Math.PI;
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      this.multiply([0.213 + cos * 0.787 - sin * 0.213, 0.715 - cos * 0.715 - sin * 0.715, 0.072 - cos * 0.072 + sin * 0.928, 0.213 - cos * 0.213 + sin * 0.143, 0.715 + cos * 0.285 + sin * 0.14, 0.072 - cos * 0.072 - sin * 0.283, 0.213 - cos * 0.213 - sin * 0.787, 0.715 - cos * 0.715 + sin * 0.715, 0.072 + cos * 0.928 + sin * 0.072]);
    }
  }, {
    key: "grayscale",
    value: function grayscale() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.multiply([0.2126 + 0.7874 * (1 - value), 0.7152 - 0.7152 * (1 - value), 0.0722 - 0.0722 * (1 - value), 0.2126 - 0.2126 * (1 - value), 0.7152 + 0.2848 * (1 - value), 0.0722 - 0.0722 * (1 - value), 0.2126 - 0.2126 * (1 - value), 0.7152 - 0.7152 * (1 - value), 0.0722 + 0.9278 * (1 - value)]);
    }
  }, {
    key: "sepia",
    value: function sepia() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.multiply([0.393 + 0.607 * (1 - value), 0.769 - 0.769 * (1 - value), 0.189 - 0.189 * (1 - value), 0.349 - 0.349 * (1 - value), 0.686 + 0.314 * (1 - value), 0.168 - 0.168 * (1 - value), 0.272 - 0.272 * (1 - value), 0.534 - 0.534 * (1 - value), 0.131 + 0.869 * (1 - value)]);
    }
  }, {
    key: "saturate",
    value: function saturate() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.multiply([0.213 + 0.787 * value, 0.715 - 0.715 * value, 0.072 - 0.072 * value, 0.213 - 0.213 * value, 0.715 + 0.285 * value, 0.072 - 0.072 * value, 0.213 - 0.213 * value, 0.715 - 0.715 * value, 0.072 + 0.928 * value]);
    }
  }, {
    key: "multiply",
    value: function multiply(matrix) {
      var newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
      var newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
      var newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
      this.r = newR;
      this.g = newG;
      this.b = newB;
    }
  }, {
    key: "brightness",
    value: function brightness() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.linear(value);
    }
  }, {
    key: "contrast",
    value: function contrast() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.linear(value, -(0.5 * value) + 0.5);
    }
  }, {
    key: "linear",
    value: function linear() {
      var slope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var intercept = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.r = this.clamp(this.r * slope + intercept * 255);
      this.g = this.clamp(this.g * slope + intercept * 255);
      this.b = this.clamp(this.b * slope + intercept * 255);
    }
  }, {
    key: "invert",
    value: function invert() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
      this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
      this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
    }
  }, {
    key: "hsl",
    value: function hsl() {
      // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
      var r = this.r / 255;
      var g = this.g / 255;
      var b = this.b / 255;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h = 0;
      var s = 0;
      var l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return {
        h: h * 100,
        s: s * 100,
        l: l * 100
      };
    }
  }, {
    key: "clamp",
    value: function clamp(value) {
      if (value > 255) {
        value = 255;
      } else if (value < 0) {
        value = 0;
      }
      return value;
    }
  }]);
  return Color;
}();

/***/ }),

/***/ "./ui/utilities/coloriz/Solver.ts":
/*!****************************************!*\
  !*** ./ui/utilities/coloriz/Solver.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Solver: () => (/* binding */ Solver)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Color */ "./ui/utilities/coloriz/Color.ts");



// Copyright (C) 2020 Markus Peloso
//
// This file is part of osm-app-component.
//
// osm-app-component is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// osm-app-component is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with osm-app-component.  If not, see <http://www.gnu.org/licenses/>.


var Solver = /*#__PURE__*/function () {
  function Solver(target) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Solver);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "target", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "targetHSL", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "reusedColor", void 0);
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new _Color__WEBPACK_IMPORTED_MODULE_3__.Color(0, 0, 0);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Solver, [{
    key: "solve",
    value: function solve() {
      var result = this.solveNarrow(this.solveWide());
      return {
        values: result.values,
        loss: result.loss,
        filter: this.css(result.values)
      };
    }
  }, {
    key: "solveWide",
    value: function solveWide() {
      var A = 5;
      var c = 15;
      var a = [60, 180, 18000, 600, 1.2, 1.2];
      var best = {
        loss: Infinity,
        values: []
      };
      for (var i = 0; best.loss > 25 && i < 3; i++) {
        var initial = [50, 20, 3750, 50, 100, 100];
        var result = this.spsa(A, a, c, initial, 1000);
        if (result.loss < best.loss) {
          best = result;
        }
      }
      return best;
    }
  }, {
    key: "solveNarrow",
    value: function solveNarrow(wide) {
      var A = wide.loss;
      var c = 2;
      var A1 = A + 1;
      var a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
      return this.spsa(A, a, c, wide.values, 500);
    }
  }, {
    key: "spsa",
    value: function spsa(A, a, c, values, iters) {
      var alpha = 1;
      var gamma = 0.16666666666666666;
      var best = [];
      var bestLoss = Infinity;
      var deltas = new Array(6);
      var highArgs = new Array(6);
      var lowArgs = new Array(6);
      for (var k = 0; k < iters; k++) {
        var ck = c / Math.pow(k + 1, gamma);
        for (var i = 0; i < 6; i++) {
          deltas[i] = Math.random() > 0.5 ? 1 : -1;
          highArgs[i] = values[i] + ck * deltas[i];
          lowArgs[i] = values[i] - ck * deltas[i];
        }
        var lossDiff = this.loss(highArgs) - this.loss(lowArgs);
        for (var _i = 0; _i < 6; _i++) {
          var g = lossDiff / (2 * ck) * deltas[_i];
          var ak = a[_i] / Math.pow(A + k + 1, alpha);
          values[_i] = fix(values[_i] - ak * g, _i);
        }
        var loss = this.loss(values);
        if (loss < bestLoss) {
          best = values.slice(0);
          bestLoss = loss;
        }
      }
      return {
        values: best,
        loss: bestLoss
      };
      function fix(value, idx) {
        var max = 100;
        if (idx === 2 /* saturate */) {
          max = 7500;
        } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
          max = 200;
        }
        if (idx === 3 /* hue-rotate */) {
          if (value > max) {
            value %= max;
          } else if (value < 0) {
            value = max + value % max;
          }
        } else if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }
        return value;
      }
    }
  }, {
    key: "loss",
    value: function loss(filters) {
      // Argument is array of percentages.
      var color = this.reusedColor;
      color.set(0, 0, 0);
      color.invert(filters[0] / 100);
      color.sepia(filters[1] / 100);
      color.saturate(filters[2] / 100);
      color.hueRotate(filters[3] * 3.6);
      color.brightness(filters[4] / 100);
      color.contrast(filters[5] / 100);
      var colorHSL = color.hsl();
      return Math.abs(color.r - this.target.r) + Math.abs(color.g - this.target.g) + Math.abs(color.b - this.target.b) + Math.abs(colorHSL.h - this.targetHSL.h) + Math.abs(colorHSL.s - this.targetHSL.s) + Math.abs(colorHSL.l - this.targetHSL.l);
    }
  }, {
    key: "css",
    value: function css(filters) {
      function fmt(idx) {
        var multiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        return Math.round(filters[idx] * multiplier);
      }
      return "filter: invert(".concat(fmt(0), "%) sepia(").concat(fmt(1), "%) saturate(").concat(fmt(2), "%) hue-rotate(").concat(fmt(3, 3.6), "deg) brightness(").concat(fmt(4), "%) contrast(").concat(fmt(5), "%);");
    }
  }]);
  return Solver;
}();

/***/ }),

/***/ "./ui/utilities/filter.ts":
/*!********************************!*\
  !*** ./ui/utilities/filter.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   edit: () => (/* binding */ edit),
/* harmony export */   mobile: () => (/* binding */ mobile),
/* harmony export */   navigation: () => (/* binding */ navigation)
/* harmony export */ });
// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

var mobilePlatforms = ["ANDROID", "GARMIN", "KINDLE", "MAEMO", "MEEGO", "PALM OS", "SYMBIAN", "UBUNTU PHONE", "UBUNTU TOUCH", "WEBOS", "WINDOWS MOBILE", "WINDOWS PHONE", "IOS", "ZAURUS"];
function mobile(a) {
  return a.topics.map(function (t) {
    return t.toUpperCase();
  }).some(function (t) {
    return ["OFFLINE", "CACHE"].includes(t);
  }) || a.platform.map(function (t) {
    return t.toUpperCase();
  }).some(function (t) {
    return mobilePlatforms.includes(t);
  }) || a.install.asin || a.install.fDroidID || a.install.googlePlayID || a.install.huaweiAppGalleryID || a.install.appleStoreID;
}
function navigation(a) {
  return a.topics.map(function (t) {
    return t.toUpperCase();
  }).some(function (t) {
    return ["NAVI", "ROUTING", "ROUTER"].includes(t);
  });
}
function edit(a) {
  return a.topics.map(function (t) {
    return t.toUpperCase();
  }).some(function (t) {
    return ["ADD POIS", "EDIT", "EDITING", "EDITOR", "ANALYSE", "ANALYSER", "ANALYSIS", "TRACK RECORDING", "TRACKER", "TRACKING", "VALIDATOR", "OSM TOOL", "QA", "QUALITY CONTROL", "NOTES"].includes(t);
  });
}

/***/ }),

/***/ "./ui/utilities/html.ts":
/*!******************************!*\
  !*** ./ui/utilities/html.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   getHtmlElement: () => (/* binding */ getHtmlElement),
/* harmony export */   getHtmlElements: () => (/* binding */ getHtmlElements)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");

// Copyright (C) 2020 Markus Peloso
// 
// This file is part of OSM Apps Catalog.
// 
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

function getHtmlElement(selectors) {
  var contentElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var element = contentElement.querySelector(selectors);
  if (!element) throw "Element ".concat(selectors, " not found.");
  return element;
}
function getHtmlElements(selectors) {
  var contentElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var elements = [];
  contentElement.querySelectorAll(selectors).forEach(function (v) {
    elements.push(v);
  });
  return elements;
}
function createElement(tag) {
  var _element$classList;
  var innerHTML = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var classNames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var element = document.createElement(tag);
  element.innerHTML = innerHTML;
  (_element$classList = element.classList).add.apply(_element$classList, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(classNames.filter(function (c) {
    return c;
  })));
  return element;
}

/***/ }),

/***/ "./ui/utilities/image.ts":
/*!*******************************!*\
  !*** ./ui/utilities/image.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toWikimediaUrl: () => (/* binding */ toWikimediaUrl)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! md5 */ "../node_modules/md5/md5.js");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url */ "./ui/utilities/url.ts");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./string */ "./ui/utilities/string.ts");

// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.




function toWikimediaUrl(source, size) {
  if (!source) return [];
  if (_url__WEBPACK_IMPORTED_MODULE_2__.httpRegex.test(source)) {
    return [source];
  } else if ((0,_string__WEBPACK_IMPORTED_MODULE_3__.startsWithIgnoreCase)(source, "File:")) {
    var fileName = source.substring(5, source.length);
    return [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(generateOsmWikimediaUrls(fileName, size)), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(generateCommonsWikimediaUrls(fileName, size)));
  } else if ((0,_string__WEBPACK_IMPORTED_MODULE_3__.startsWithIgnoreCase)(source, "https://wiki.openstreetmap.org/wiki/File:")) return generateOsmWikimediaUrls(source.substring(41, source.length), size);else if ((0,_string__WEBPACK_IMPORTED_MODULE_3__.startsWithIgnoreCase)(source, "http://wiki.openstreetmap.org/wiki/File:")) return generateOsmWikimediaUrls(source.substring(40, source.length), size);else if ((0,_string__WEBPACK_IMPORTED_MODULE_3__.startsWithIgnoreCase)(source, "https://commons.wikimedia.org/wiki/File:")) return generateCommonsWikimediaUrls(source.substring(40, source.length), size);else if ((0,_string__WEBPACK_IMPORTED_MODULE_3__.startsWithIgnoreCase)(source, "http://commons.wikimedia.org/wiki/File:")) return generateCommonsWikimediaUrls(source.substring(39, source.length), size);else return [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(generateOsmWikimediaUrls(source, size)), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(generateCommonsWikimediaUrls(source, size)));
}
function generateOsmWikimediaUrls(fileName, size) {
  return generateWikimediaUrls("https://wiki.openstreetmap.org/w/images", fileName, size);
}
function generateCommonsWikimediaUrls(fileName, size) {
  return generateWikimediaUrls("https://upload.wikimedia.org/wikipedia/commons", fileName, size);
}
function generateWikimediaUrls(base, fileName, size) {
  fileName = decodeURI(fileName).replace(/ /g, "_");
  var hash = md5__WEBPACK_IMPORTED_MODULE_1__(fileName);
  return ["".concat(base, "/thumb/").concat(hash.substring(0, 1), "/").concat(hash.substring(0, 2), "/").concat(fileName, "/").concat(size, "px-").concat(fileName).concat(fileName.toUpperCase().endsWith(".SVG") ? ".png" : ""), "".concat(base, "/").concat(hash.substring(0, 1), "/").concat(hash.substring(0, 2), "/").concat(fileName)];
}

/***/ }),

/***/ "./ui/utilities/jsonRequest.ts":
/*!*************************************!*\
  !*** ./ui/utilities/jsonRequest.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getJson: () => (/* binding */ getJson)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url */ "./ui/utilities/url.ts");


// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.


function getJson(_x, _x2) {
  return _getJson.apply(this, arguments);
}
function _getJson() {
  _getJson = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(url, params) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch("".concat(url, "?").concat((0,_url__WEBPACK_IMPORTED_MODULE_2__.utilQsString)(params)), {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
          });
        case 2:
          response = _context.sent;
          _context.next = 5;
          return response.json();
        case 5:
          return _context.abrupt("return", _context.sent);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getJson.apply(this, arguments);
}

/***/ }),

/***/ "./ui/utilities/renderImage.ts":
/*!*************************************!*\
  !*** ./ui/utilities/renderImage.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderImage: () => (/* binding */ renderImage)
/* harmony export */ });
function renderImage(obj) {
  var defaultImage = "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";
  if (obj.images.length > 0) {
    return "<img class=\"img\" src=\"".concat(defaultImage, "\" dynamic-src=\"").concat(obj.images.join(" "), " ").concat(defaultImage, "\"/>");
  } else {
    return "<img class=\"img\" style=\"".concat(obj.filter, "\" src=\"").concat(defaultImage, "\"/>");
  }
}

/***/ }),

/***/ "./ui/utilities/storage.ts":
/*!*********************************!*\
  !*** ./ui/utilities/storage.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   set: () => (/* binding */ set)
/* harmony export */ });
// Copyright (C) 2020 Markus Peloso
// 
// This file is part of OSM Apps Catalog.
// 
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function get(key) {
  try {
    var v = localStorage.getItem(key);
    if (!v) return undefined;
    return JSON.parse(v);
  } catch (_unused) {
    return undefined;
  }
}

/***/ }),

/***/ "./ui/utilities/string.ts":
/*!********************************!*\
  !*** ./ui/utilities/string.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendFullStop: () => (/* binding */ appendFullStop),
/* harmony export */   equalsIgnoreCase: () => (/* binding */ equalsIgnoreCase),
/* harmony export */   equalsYes: () => (/* binding */ equalsYes),
/* harmony export */   findClosingBracketIndex: () => (/* binding */ findClosingBracketIndex),
/* harmony export */   firstLetterToUpperCase: () => (/* binding */ firstLetterToUpperCase),
/* harmony export */   startsWithIgnoreCase: () => (/* binding */ startsWithIgnoreCase),
/* harmony export */   textToColor: () => (/* binding */ textToColor),
/* harmony export */   toDate: () => (/* binding */ toDate),
/* harmony export */   trim: () => (/* binding */ trim)
/* harmony export */ });
// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

function equalsIgnoreCase(a, b) {
  return typeof a === "string" && typeof b === "string" ? a.toUpperCase() === b.toUpperCase() : a === b;
}
function equalsYes() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  for (var _i = 0, _values = values; _i < _values.length; _i++) {
    var value = _values[_i];
    if ((value === null || value === void 0 ? void 0 : value.toUpperCase()) === "YES") return true;
  }
  return false;
}
function startsWithIgnoreCase(s, searchString, position) {
  return s.toUpperCase().startsWith(searchString.toUpperCase(), position);
}
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
function firstLetterToUpperCase(value) {
  return "".concat(value[0].toUpperCase()).concat(value.slice(1));
}
function appendFullStop(value) {
  if (value && value[value.length - 1] !== ".") return "".concat(value, ".");
  return value;
}
function trim(value) {
  return (value || "").replace(/^[\.\s]+|[\.\s]+$/gm, "");
}
function toDate(value) {
  value = trim(value);
  if (/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}$/gi.test(value)) return value;else return "";
}
function textToColor(s) {
  var r = 0;
  var g = 0;
  var b = 0;

  // fixed colors
  switch (s.toUpperCase()) {
    case "FREE":
    case "YES":
      return {
        r: 153,
        g: 255,
        b: 153
      };
    case "NO":
      return {
        r: 255,
        g: 153,
        b: 153
      };
  }
  for (var i = 0; i < s.length; i++) {
    if (i % 3 === 0) r = (r + s.charCodeAt(i)) % 256;else if (i % 3 === 1) g = (g + s.charCodeAt(i)) % 256;else b = (b + s.charCodeAt(i)) % 256;
  }
  return {
    r: r,
    g: g,
    b: b
  };
}

/***/ }),

/***/ "./ui/utilities/url.ts":
/*!*****************************!*\
  !*** ./ui/utilities/url.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findGetParameter: () => (/* binding */ findGetParameter),
/* harmony export */   findGetParameterFromHash: () => (/* binding */ findGetParameterFromHash),
/* harmony export */   httpRegex: () => (/* binding */ httpRegex),
/* harmony export */   toUrl: () => (/* binding */ toUrl),
/* harmony export */   toWikiUrl: () => (/* binding */ toWikiUrl),
/* harmony export */   utilQsString: () => (/* binding */ utilQsString)
/* harmony export */ });
// Copyright (C) 2020 Markus Peloso
// 
// This file is part of OSM Apps Catalog.
// 
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

var httpRegex = /^https?:\/\//i;
function toUrl(url) {
  if (!url) return undefined;
  if (!httpRegex.test(url)) return "http://".concat(url);
  return url;
}
function toWikiUrl(wiki) {
  if (!wiki) return undefined;
  if (httpRegex.test(wiki)) return wiki;
  return "https://wiki.openstreetmap.org/wiki/".concat(wiki);
}
function utilQsString(obj, noencode) {
  // encode everything except special characters used in certain hash parameters:
  // "/" in map states, ":", ",", {" and "}" in background
  function softEncode(s) {
    return encodeURIComponent(s).replace(/(%2F|%3A|%2C|%7B|%7D)/g, decodeURIComponent);
  }
  return Object.keys(obj).sort().map(function (key) {
    return "".concat(encodeURIComponent(key), "=").concat(noencode ? softEncode(obj[key]) : encodeURIComponent(obj[key]));
  }).join("&");
}
function findGetParameter(parameterName) {
  var result;
  var tmp = [];
  location.search.substring(1).split("&").forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  });
  return result;
}
function findGetParameterFromHash(parameterName) {
  var result;
  var tmp = [];
  location.hash.substring(1).split("&").forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  });
  return result;
}

/***/ }),

/***/ "./ui/views/compare.ts":
/*!*****************************!*\
  !*** ./ui/views/compare.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _utilities_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/html */ "./ui/utilities/html.ts");
/* harmony import */ var _utilities_renderImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/renderImage */ "./ui/utilities/renderImage.ts");
/* harmony import */ var _renderBadges__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderBadges */ "./ui/views/renderBadges.ts");
/* harmony import */ var _templateData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../templateData */ "./ui/templateData.ts");
/* harmony import */ var _getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../getLocalizedValue */ "./ui/getLocalizedValue.ts");
/* harmony import */ var _toWikiTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./toWikiTable */ "./ui/views/toWikiTable.ts");
/* harmony import */ var _utilities_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/string */ "./ui/utilities/string.ts");
/* harmony import */ var _language__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../language */ "./ui/language.ts");









function render(apps, lang) {
  {
    var element = (0,_utilities_html__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", ["<div class=\"cell header param-title\"></div>"].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(apps.map(function (app) {
      return "<div class=\"cell header text-center\"><div class=\"corner-badge\">".concat(app.libre ? '<span title="Libre"><i class="fas fa-fw fa-book-open"></i></span>' : app.gratis ? '<span title="Proprietary"><i class="fas fa-wine-bottle"></i></span>' : "").concat(app.gratis || app.libre ? '<span title="Free"><i class="fas fa-fw fa-gift"></i></span>' : "", "</div><strong>").concat(app.website ? "<a href=\"".concat(app.website, "\" target=\"_blank\">").concat(app.name, "</a>") : app.name, "</strong></div>");
    }))).join(""), ["row", "fixed"]);
    (0,_utilities_html__WEBPACK_IMPORTED_MODULE_1__.getHtmlElement)("#compare").appendChild(element);
  }

  // General
  renderGroup("general", "General", [{
    label: "",
    description: "",
    hasValue: function hasValue(app) {
      return app.images.length > 0;
    },
    renderToHtml: function renderToHtml(app) {
      return app.website ? "<a href=\"".concat(app.website, "\" target=\"_blank\">").concat((0,_utilities_renderImage__WEBPACK_IMPORTED_MODULE_2__.renderImage)(app), "</a>") : (0,_utilities_renderImage__WEBPACK_IMPORTED_MODULE_2__.renderImage)(app);
    },
    renderToWiki: function renderToWiki(app) {
      return app.imageWiki ? "[[File:".concat(app.imageWiki, "|160px]]") : "";
    },
    centered: true
  }, {
    label: "",
    description: "",
    hasValue: function hasValue(app) {
      return !!(app.website || app.install.asin || app.install.fDroidID || app.install.googlePlayID || app.install.huaweiAppGalleryID || app.install.appleStoreID || app.install.macAppStoreID || app.install.microsoftAppID);
    },
    renderToHtml: function renderToHtml(app) {
      return "".concat(app.website ? "<a class=\"download\" href=\"".concat(app.website, "\" target=\"_blank\" title=\"Website\"><i class=\"far fa-map\"></i></a>") : "", "\n").concat(app.install.asin ? "<a class=\"download\" href=\"https://www.amazon.com/dp/".concat(app.install.asin, "\" target=\"_blank\" title=\"Amazon Appstore\" ><i class=\"fab fa-amazon\"></i></a>") : "", "\n").concat(app.install.fDroidID ? "<a class=\"download\" href=\"https://f-droid.org/repository/browse/?fdid=".concat(app.install.fDroidID, "\" target=\"_blank\" title=\"F-Droid\" ><i class=\"fab fa-android\"></i></a>") : "", "\n").concat(app.install.googlePlayID ? "<a class=\"download\" href=\"https://play.google.com/store/apps/details?id=".concat(app.install.googlePlayID, "\" target=\"_blank\" title=\"Google Play\" ><i class=\"fab fa-google-play\"></i></a>") : "", "\n").concat(app.install.huaweiAppGalleryID ? "<a class=\"download\" href=\"https://appgallery.huawei.com/#/app/".concat(app.install.huaweiAppGalleryID, "\" target=\"_blank\" title=\"Huawei App Gallery\" ><i class=\"fas fa-shopping-bag\"></i></a>") : "", "\n").concat(app.install.appleStoreID ? "<a class=\"download\" href=\"https://itunes.apple.com/app/".concat(app.install.appleStoreID.toUpperCase().startsWith("ID") ? app.install.appleStoreID : "id".concat(app.install.appleStoreID), "\" target=\"_blank\" title=\"iTunes App Store\"><i class=\"fab fa-app-store-ios\"></i></a>") : "", "\n").concat(app.install.macAppStoreID ? "<a class=\"download\" href=\"https://itunes.apple.com/app/".concat(app.install.macAppStoreID.toUpperCase().startsWith("ID") ? app.install.macAppStoreID : "id".concat(app.install.macAppStoreID), "\" target=\"_blank\" title=\"Mac App Store\"><i class=\"fab fa-app-store\"></i></a>") : "", "\n").concat(app.install.microsoftAppID ? "<a class=\"download\" href=\"https://www.microsoft.com/store/apps/".concat(app.install.microsoftAppID, "\" target=\"_blank\" title=\"Microsoft Store\"><i class=\"fab fa-microsoft\"></i></a>") : "");
    },
    renderToWiki: function renderToWiki(app) {
      return [app.website ? "[".concat(app.website, " Website]") : "", app.install.asin ? "[https://www.amazon.com/dp/".concat(app.install.asin, " Amazon Appstore]") : "", app.install.fDroidID ? "[https://f-droid.org/repository/browse/?fdid=".concat(app.install.fDroidID, " F-Droid]") : "", app.install.googlePlayID ? "[https://play.google.com/store/apps/details?id=".concat(app.install.googlePlayID, " Google Play]") : "", app.install.huaweiAppGalleryID ? "[https://appgallery.huawei.com/#/app/".concat(app.install.huaweiAppGalleryID, " Huawei App Gallery]") : "", app.install.appleStoreID ? "[https://itunes.apple.com/app/".concat(app.install.appleStoreID.toUpperCase().startsWith("ID") ? app.install.appleStoreID : "id".concat(app.install.appleStoreID), " iTunes App Store]") : "", app.install.macAppStoreID ? "[https://itunes.apple.com/app/".concat(app.install.macAppStoreID.toUpperCase().startsWith("ID") ? app.install.macAppStoreID : "id".concat(app.install.macAppStoreID), " Mac App Store]") : "", app.install.microsoftAppID ? "[https://www.microsoft.com/store/apps/".concat(app.install.microsoftAppID, " Microsoft Store]") : ""].filter(function (o) {
        return o;
      }).join(", ");
    }
  }, {
    label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["description"].label, lang),
    description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["description"].description, lang),
    hasValue: function hasValue(app) {
      return !!app.description;
    },
    renderToHtml: function renderToHtml(app) {
      return app.description;
    },
    renderToWiki: function renderToWiki(app) {
      return app.description;
    },
    more: true
  }, {
    label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["platform"].label, lang),
    description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["platform"].description, lang),
    hasValue: function hasValue(app) {
      return app.platform.length > 0;
    },
    renderToHtml: function renderToHtml(app) {
      return (0,_renderBadges__WEBPACK_IMPORTED_MODULE_3__.renderBadges)(app.platform);
    },
    renderToWiki: function renderToWiki(app) {
      return app.platform.join(", ");
    }
  }, {
    label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["date"].label, lang),
    description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["date"].description, lang),
    hasValue: function hasValue(app) {
      return !!app.lastRelease;
    },
    renderToHtml: function renderToHtml(app) {
      return app.lastRelease;
    },
    renderToWiki: function renderToWiki(app) {
      return app.lastRelease;
    }
  }, {
    label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["languages"].label, lang),
    description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["languages"].description, lang),
    hasValue: function hasValue(app) {
      return !!app.languagesUrl || !!(app.languages.length > 0);
    },
    renderToHtml: function renderToHtml(app) {
      return app.languagesUrl ? "<a class=\"language-url\" href=\"".concat(app.languagesUrl, "\" target=\"_blank\"\">\n      ").concat(app.languages.length > 0 ? (0,_renderBadges__WEBPACK_IMPORTED_MODULE_3__.renderBadges)(app.languages) : "<i class=\"fas fa-language\"></i>", "\n      <i class=\"fas fa-external-link-alt\"></i>\n    </a>") : (0,_renderBadges__WEBPACK_IMPORTED_MODULE_3__.renderBadges)(app.languages);
    },
    renderToWiki: function renderToWiki(app) {
      return app.languagesUrl ? "[".concat(app.languagesUrl, " \n        ").concat(app.languages.length > 0 ? app.languages.join(", ") : (0,_language__WEBPACK_IMPORTED_MODULE_8__.languageValueToDisplay)("mul"), "\n      ]") : app.languages.join(", ");
    },
    more: true
  }, {
    label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["coverage"].label, lang),
    description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["coverage"].description, lang),
    hasValue: function hasValue(app) {
      return !!(app.coverage && app.coverage.length);
    },
    renderToHtml: function renderToHtml(app) {
      return app.coverage[app.coverage.length - 1];
    },
    renderToWiki: function renderToWiki(app) {
      return app.coverage[app.coverage.length - 1];
    }
  }, {
    label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["author"].label, lang),
    description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["author"].description, lang),
    hasValue: function hasValue(app) {
      return !!app.author;
    },
    renderToHtml: function renderToHtml(app) {
      return app.author;
    },
    renderToWiki: function renderToWiki(app) {
      return app.author;
    }
  }, {
    label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["price"].label, lang),
    description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["price"].description, lang),
    hasValue: function hasValue(app) {
      return !!app.price;
    },
    renderToHtml: function renderToHtml(app) {
      return app.price;
    },
    renderToWiki: function renderToWiki(app) {
      return app.price;
    }
  }, {
    label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["license"].label, lang),
    description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["license"].description, lang),
    hasValue: function hasValue(app) {
      return !!app.license;
    },
    renderToHtml: function renderToHtml(app) {
      return (0,_renderBadges__WEBPACK_IMPORTED_MODULE_3__.renderBadges)(app.license);
    },
    renderToWiki: function renderToWiki(app) {
      return app.license;
    }
  }, {
    label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["repo"].label, lang),
    description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params["repo"].description, lang),
    hasValue: function hasValue(app) {
      return !!app.sourceCode;
    },
    renderToHtml: function renderToHtml(app) {
      return app.sourceCode ? "<a href=\"".concat(app.sourceCode, "\" target=\"_blank\"><i class=\"fas fa-code\"></i></a>") : "";
    },
    renderToWiki: function renderToWiki(app) {
      return app.sourceCode ? "[".concat(app.sourceCode, " </>]") : "";
    }
  }, {
    label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)("Source", lang),
    description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)("Source where this data comes from.", lang),
    hasValue: function hasValue() {
      return true;
    },
    renderToHtml: function renderToHtml(app) {
      return app.source.map(function (s) {
        return "<a href=\"".concat(s.url, "\" target=\"_blank\">").concat(s.displayName, "</a>");
      }).join(", ");
    }
  }], apps, lang);

  // Map
  renderGroup("map", "Display map", ["map", "mapData", "datasource", "rotateMap", "3D", "showWebsite", "showPhoneNumber", "showOpeningHours"], apps, lang);

  // Routing
  renderGroup("routing", "Routing", ["routing", "createRouteManually", "calculateRoute", "createRouteViaWaypoints", "profiles", "turnRestrictions", "calculateRouteOffline", "routingProviders", "avoidTraffic", "trafficProvider"], apps, lang);

  // Navigating
  renderGroup("navigating", "Navigating", ["navigating", "findLocation", "findNearbyPOI", "navToPoint", "voice", "keepOnRoad", "turnLanes", "withoutGPS", "predefinedRoute"], apps, lang);

  // Tracking
  renderGroup("tracking", "Tracking", ["tracking", "customInterval", "trackFormats", "geotagging", "fastWayPointAdding", "uploadGPX"], apps, lang);

  // Monitoring
  renderGroup("monitoring", "Monitoring", ["monitoring", "showTrack", "showExistingTrack", "showAltitudeDiagram", "showDOP", "showSatellites", "showNMEAlive", "showSpeed", "sendPosition"], apps, lang);

  // Editing
  renderGroup("editing", "Editing", ["addPOI", "editPOI", "addWay", "editGeom", "editTags", "editRelations", "viewNotes", "createNotes", "editNotes", "editSource", "offsetDBsupport", "uploadOSMData"], apps, lang);

  // Rendering
  renderGroup("rendering", "Rendering", ["rendererOutputFormats"], apps, lang);

  // Accessibility
  renderGroup("accessibility", "Accessibility", ["accessibility", "textOnlyUI", "brailleUI", "explorerMode", "publicTransportMode", "dangerWarnings", "screenReader", "screenReaderLang"], apps, lang);
}
function renderGroup(id, display, params, apps, lang) {
  var extendedParams = params.map(function (p) {
    if (typeof p !== "string") {
      return p;
    }
    return {
      label: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params[p].label, lang),
      description: (0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_5__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_4__.templateData.params[p].description, lang),
      hasValue: function hasValue(app) {
        var _id;
        var value = (_id = app[id]) === null || _id === void 0 ? void 0 : _id[p];
        if (Array.isArray(value)) {
          return value.some(function (v) {
            return !!v;
          });
        }
        return !!value;
      },
      notNo: function notNo(app) {
        var _id2;
        var value = (_id2 = app[id]) === null || _id2 === void 0 ? void 0 : _id2[p];
        if (Array.isArray(value)) {
          return value.some(function (v) {
            return v && !(0,_utilities_string__WEBPACK_IMPORTED_MODULE_7__.equalsIgnoreCase)(v, "no");
          });
        }
        return !(0,_utilities_string__WEBPACK_IMPORTED_MODULE_7__.equalsIgnoreCase)(value, "no");
      },
      renderToHtml: function renderToHtml(app) {
        var _id3;
        return (0,_renderBadges__WEBPACK_IMPORTED_MODULE_3__.renderBadges)((_id3 = app[id]) === null || _id3 === void 0 ? void 0 : _id3[p]);
      },
      renderToWiki: function renderToWiki(app) {
        var _id4;
        return (0,_toWikiTable__WEBPACK_IMPORTED_MODULE_6__.toWikiValue)((_id4 = app[id]) === null || _id4 === void 0 ? void 0 : _id4[p]);
      }
    };
  });
  var elements = extendedParams.map(function (p) {
    if (!apps.some(function (app) {
      return p.hasValue(app) && (!p.notNo || p.notNo(app));
    })) {
      return undefined;
    }
    return createParamElement(apps, p.label, p.description, function (app) {
      return p.renderToHtml(app);
    }, id + "-detail", p.more, p.centered);
  }).filter(function (e) {
    return e;
  });
  if (elements.length) {
    var element = (0,_utilities_html__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", "<div class=\"cell header params-title params-group-title\">\n        <a class=\"group\" data-target=\".".concat(id, "-detail\" href=\"#\"><i class=\"fas fa-fw fa-caret-down ").concat(id, "-detail\"></i><i class=\"fas fa-fw fa-caret-right ").concat(id, "-detail hidden\"></i> ").concat(display, "</a>\n     <!--<a class=\"export\" href=\"#\"><i class=\"far fa-copy\"></i></a>--> </div>"), ["row"]);

    // getHtmlElement(".export", element).addEventListener("click", (e) => {
    //   e.preventDefault();
    //   const wikiTable = toWikiTable(
    //     apps,
    //     extendedParams.filter((p) => !!p.renderToWiki) as any,
    //     lang
    //   );

    //   navigator.clipboard.writeText(wikiTable);
    //   alert("Copied to the clipboard.");
    // });

    (0,_utilities_html__WEBPACK_IMPORTED_MODULE_1__.getHtmlElement)(".group", element).addEventListener("click", function (e) {
      document.querySelectorAll(e.currentTarget.dataset["target"] || "").forEach(function (e) {
        return e.classList.toggle("hidden");
      });
    });
    (0,_utilities_html__WEBPACK_IMPORTED_MODULE_1__.getHtmlElement)("#compare").appendChild(element);
    elements.forEach(function (element) {
      (0,_utilities_html__WEBPACK_IMPORTED_MODULE_1__.getHtmlElement)("#compare").appendChild(element);
    });
  }
}
function createParamElement(apps, label, description, value) {
  var group = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var more = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var centered = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var values = apps.map(function (app) {
    return value(app);
  });
  if (values.filter(function (v) {
    return v;
  }).length === 0) {
    return undefined;
  }
  var element = (0,_utilities_html__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", ["<div class=\"cell header param-title\" title=\"".concat(description, "\">").concat(label, "</div>")].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(values.map(function (v) {
    return more ? "<div class=\"cell param-text".concat(centered ? " align-middle text-center" : "", "\"><div class=\"dynamic-more\">").concat(v || unknown(), "</div></div>") : "<div class=\"cell param-text".concat(centered ? " align-middle text-center" : "", "\">").concat(v || unknown(), "</div>");
  }))).join(""), ["row", group]);
  return element;
}
function unknown() {
  return "<span class=\"unknown\">unknown</span>";
}

/***/ }),

/***/ "./ui/views/list.ts":
/*!**************************!*\
  !*** ./ui/views/list.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _utilities_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/html */ "./ui/utilities/html.ts");
/* harmony import */ var _utilities_renderImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/renderImage */ "./ui/utilities/renderImage.ts");
/* harmony import */ var _renderBadges__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderBadges */ "./ui/views/renderBadges.ts");
// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.




function render(app) {
  var element = (0,_utilities_html__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", "<div class=\"header\">\n        <div><div class=\"corner-badge\">".concat(app.libre ? '<span title="Libre"><i class="fas fa-fw fa-book-open"></i></span>' : app.gratis ? '<span title="Proprietary"><i class="fas fa-wine-bottle"></i></span>' : "").concat(app.gratis || app.libre ? '<span title="Free"><i class="fas fa-fw fa-gift"></i></span>' : "", "</div><strong>").concat(app.website ? "<a href=\"".concat(app.website, "\" target=\"_blank\">").concat(app.name, "</a>") : app.name, "</strong></div>\n        ").concat(app.website ? "<a href=\"".concat(app.website, "\" target=\"_blank\">").concat((0,_utilities_renderImage__WEBPACK_IMPORTED_MODULE_1__.renderImage)(app), "</a>") : (0,_utilities_renderImage__WEBPACK_IMPORTED_MODULE_1__.renderImage)(app), "\n      </div>\n      <div><small>").concat(app.description).concat(app.documentation ? " <a href=\"".concat(app.documentation, "\" target=\"_blank\">Documentation</a>") : "", "</small></div>\n      ").concat(app.website ? "<a class=\"download\" href=\"".concat(app.website, "\" target=\"_blank\" title=\"Website\"><i class=\"far fa-map\"></i></a>") : "", "\n\n      ").concat(app.install.asin ? "<a class=\"download\" href=\"https://www.amazon.com/dp/".concat(app.install.asin, "\" target=\"_blank\" title=\"Amazon Appstore\"><i class=\"fab fa-amazon\"></i></a>") : "", "\n      ").concat(app.install.fDroidID ? "<a class=\"download\" href=\"https://f-droid.org/repository/browse/?fdid=".concat(app.install.fDroidID, "\" target=\"_blank\" title=\"F-Droid\"><i class=\"fab fa-android\"></i></a>") : "", "\n      ").concat(app.install.googlePlayID ? "<a class=\"download\" href=\"https://play.google.com/store/apps/details?id=".concat(app.install.googlePlayID, "\" target=\"_blank\" title=\"Google Play\"><i class=\"fab fa-google-play\"></i></a>") : "", "\n      ").concat(app.install.huaweiAppGalleryID ? "<a class=\"download\" href=\"https://appgallery.huawei.com/#/app/".concat(app.install.huaweiAppGalleryID, "\" target=\"_blank\" title=\"Huawei App Gallery\"><i class=\"fas fa-shopping-bag\"></i></a>") : "", "\n      ").concat(app.install.appleStoreID ? "<a class=\"download\" href=\"https://itunes.apple.com/app/".concat(app.install.appleStoreID.toUpperCase().startsWith("ID") ? app.install.appleStoreID : "id".concat(app.install.appleStoreID), "\" target=\"_blank\" title=\"iTunes App Store\"><i class=\"fab fa-app-store-ios\"></i></a>") : "", "\n      ").concat(app.install.macAppStoreID ? "<a class=\"download\" href=\"https://itunes.apple.com/app/".concat(app.install.macAppStoreID.toUpperCase().startsWith("ID") ? app.install.macAppStoreID : "id".concat(app.install.macAppStoreID), "\" target=\"_blank\" title=\"Mac App Store\"><i class=\"fab fa-app-store\"></i></a>") : "", "\n      ").concat(app.install.microsoftAppID ? "<a class=\"download\" href=\"https://www.microsoft.com/store/apps/".concat(app.install.microsoftAppID, "\" target=\"_blank\" title=\"Microsoft Store\"><i class=\"fab fa-microsoft\"></i></a>") : "", "\n      <div class=\"badges\">").concat((0,_renderBadges__WEBPACK_IMPORTED_MODULE_2__.renderBadges)(app.topics), "</div>\n\n            <a class=\"more-infos-button\" href=\"#\">More <i class=\"fas fa-angle-down\"></i></a>\n            <div class=\"more-infos\" style=\"display:none;\">\n        <div class=\"more-infos-title\">Informations</div>\n        ").concat(app.platform.length > 0 ? "<div class=\"more-info\">\n          <span class=\"more-info-title\">Platforms</span> <span class=\"more-info-text\">".concat(app.platform.join(", "), "</span>\n        </div>") : "", "\n        ").concat(app.lastRelease ? "<div class=\"more-info\">\n          <span class=\"more-info-title\">Last release</span> <span class=\"more-info-text\">".concat(app.lastRelease, "</span>\n        </div>") : "", "\n        ").concat(app.languagesUrl ? "<a class=\"more-info\" href=\"".concat(app.languagesUrl, "\" target=\"_blank\">\n                <span class=\"more-info-title\">Languages</span> <span class=\"more-info-text\">").concat(app.languages.length > 0 ? app.languages.join(", ") : "<i class=\"fas fa-language\"></i>", "</span>\n              </a>") : app.languages.length > 0 ? "<div class=\"more-info\">\n          <span class=\"more-info-title\">Languages</span> <span class=\"more-info-text\">".concat(app.languages.join(", "), "</span>\n        </div>") : "", "\n        ").concat(app.coverage && app.coverage.length ? "<div class=\"more-info\">\n          <span class=\"more-info-title\">Coverage</span> <span class=\"more-info-text\">".concat(app.coverage[app.coverage.length - 1], "</span>\n        </div>") : "", "\n        ").concat(app.author ? "<div class=\"more-info\">\n          <span class=\"more-info-title\">Author</span> <span class=\"more-info-text\">".concat(app.author, "</span>\n        </div>") : "", "\n        ").concat(app.price ? "<div class=\"more-info\">\n          <span class=\"more-info-title\">Price</span> <span class=\"more-info-text\">".concat(app.price, "</span>\n        </div>") : "", "\n        ").concat(app.license ? "<div class=\"more-info\">\n          <span class=\"more-info-title\">License</span> <span class=\"more-info-text\">".concat(app.license, "</span>\n        </div>") : "", "\n        ").concat(app.sourceCode ? "<a class=\"more-info\" href=\"".concat(app.sourceCode, "\" target=\"_blank\">\n          <span class=\"more-info-title\">Source code</span> <span class=\"more-info-text\"><i class=\"fas fa-code\"></i></span>\n        </a>") : "", "\n        <div class=\"more-info\">\n        <span class=\"more-info-title\">Source</span> <span class=\"more-info-text\">").concat(app.source.map(function (s) {
    return "<a href=\"".concat(s.url, "\" target=\"_blank\">").concat(s.displayName, "</a>");
  }).join(", "), "</span>\n        </div>\n        "), ["app"]);
  var moreButton = element.querySelector(".more-infos-button");
  var moreInfos = element.querySelector(".more-infos");
  moreButton === null || moreButton === void 0 || moreButton.addEventListener("click", function (ev) {
    moreButton === null || moreButton === void 0 || moreButton.setAttribute("style", "display: none;");
    moreInfos === null || moreInfos === void 0 || moreInfos.setAttribute("style", "");
    ev.preventDefault();
  });
  (0,_utilities_html__WEBPACK_IMPORTED_MODULE_0__.getHtmlElement)("#list").appendChild(element);
}

/***/ }),

/***/ "./ui/views/renderBadges.ts":
/*!**********************************!*\
  !*** ./ui/views/renderBadges.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderBadges: () => (/* binding */ renderBadges)
/* harmony export */ });
/* harmony import */ var _utilities_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/string */ "./ui/utilities/string.ts");

function renderBadge(t) {
  var background = (0,_utilities_string__WEBPACK_IMPORTED_MODULE_0__.textToColor)(t);
  var yiq = (background.r * 299 + background.g * 587 + background.b * 114) / 1000;
  return "<span class=\"badge\" style=\"background: rgb(".concat(background.r, ",").concat(background.g, ",").concat(background.b, "); color:").concat(yiq >= 128 ? "black" : "white", ";\">").concat(t, "</span>");
}
function renderBadges(values) {
  if (!values) {
    return undefined;
  }
  if (typeof values === "string") {
    return renderBadge(values);
  }
  return values.map(renderBadge).join("");
}

/***/ }),

/***/ "./ui/views/toWikiTable.ts":
/*!*********************************!*\
  !*** ./ui/views/toWikiTable.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toWikiTable: () => (/* binding */ toWikiTable),
/* harmony export */   toWikiValue: () => (/* binding */ toWikiValue)
/* harmony export */ });
/* harmony import */ var _templateData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templateData */ "./ui/templateData.ts");
/* harmony import */ var _getLocalizedValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../getLocalizedValue */ "./ui/getLocalizedValue.ts");
/* harmony import */ var _utilities_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/string */ "./ui/utilities/string.ts");



function isUnknown(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return !value;
}
function toWikiTable(apps, params, lang) {
  var more = params.some(function (p) {
    return p.more;
  });
  var appWithFields = apps.filter(function (app) {
    return params.some(function (p) {
      return p.hasValue(app);
    });
  }).sort(function (a, b) {
    var nameA = a.name.toUpperCase() || "";
    var nameB = b.name.toUpperCase() || "";
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  var rows = params.map(function (p) {
    if (!appWithFields.some(function (app) {
      return p.hasValue(app) && (!p.notNo || p.notNo(app));
    })) {
      return undefined;
    }
    return "! title=\"".concat(p.description, "\" |").concat(p.label, "\n").concat(appWithFields.map(function (app) {
      return "|".concat(p.renderToWiki(app) || "", "\n");
    }).join(""));
  }).filter(function (e) {
    return e;
  });
  var wikiTable = "<div style=\"overflow-x:auto;max-width:100%\">\n{| class=\"wikitable sticky\" style=\"font-size: 85%; text-align: center;\"\n|+\n! title=\"".concat((0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_1__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_0__.templateData.params["name"].description, lang), "\" |").concat((0,_getLocalizedValue__WEBPACK_IMPORTED_MODULE_1__.getLocalizedValue)(_templateData__WEBPACK_IMPORTED_MODULE_0__.templateData.params["name"].label, lang), "\n").concat(appWithFields.map(function (app) {
    var _app$source$find, _app$source$find2, _app$source$find3;
    var wiki = ((_app$source$find = app.source.find(function (s) {
      return s.name === "Software";
    })) === null || _app$source$find === void 0 ? void 0 : _app$source$find.wiki) || ((_app$source$find2 = app.source.find(function (s) {
      return s.name === "Layer";
    })) === null || _app$source$find2 === void 0 ? void 0 : _app$source$find2.wiki) || ((_app$source$find3 = app.source.find(function (s) {
      return s.name === "ServiceItem";
    })) === null || _app$source$find3 === void 0 ? void 0 : _app$source$find3.wiki);
    return "! style=\"min-width: ".concat(more ? 160 : 120, "px\" |[[").concat(wiki || app.name, "|").concat(app.name || "{{?}}", "]]\n");
  }).join(""), "|-\n").concat(rows.join("|-\n"), "|}\n</div><span style=\"font-size:80%\">{{#switch: {{{1|{{{lang}}}}}}\n| de = Diese Tabelle wurde vom [https://osm-apps.zottelig.ch OSM App Catalog] am ").concat(new Date().toISOString().substring(0, 10), " erstellt.\n| #default = This table was created by [https://osm-apps.zottelig.ch OSM App Catalog] at ").concat(new Date().toISOString().substring(0, 10), ".\n}}</span>");
  return wikiTable;
}
function toWikiValue(value) {
  if (isUnknown(value)) {
    return "{{?}}";
  }
  if (typeof value === "string") {
    if ((0,_utilities_string__WEBPACK_IMPORTED_MODULE_2__.equalsYes)(value)) {
      return "{{yes}}";
    } else if ((0,_utilities_string__WEBPACK_IMPORTED_MODULE_2__.equalsIgnoreCase)(value, "no")) {
      return "{{no}}";
    }
    return value;
  }
  return value.map(function (v) {
    return toWikiValue(v);
  }).join(", ");
}

/***/ }),

/***/ "../node_modules/charenc/charenc.js":
/*!******************************************!*\
  !*** ../node_modules/charenc/charenc.js ***!
  \******************************************/
/***/ ((module) => {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ "../node_modules/crypt/crypt.js":
/*!**************************************!*\
  !*** ../node_modules/crypt/crypt.js ***!
  \**************************************/
/***/ ((module) => {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ "../node_modules/is-buffer/index.js":
/*!******************************************!*\
  !*** ../node_modules/is-buffer/index.js ***!
  \******************************************/
/***/ ((module) => {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "../node_modules/md5/md5.js":
/*!**********************************!*\
  !*** ../node_modules/md5/md5.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function(){
  var crypt = __webpack_require__(/*! crypt */ "../node_modules/crypt/crypt.js"),
      utf8 = (__webpack_require__(/*! charenc */ "../node_modules/charenc/charenc.js").utf8),
      isBuffer = __webpack_require__(/*! is-buffer */ "../node_modules/is-buffer/index.js"),
      bin = (__webpack_require__(/*! charenc */ "../node_modules/charenc/charenc.js").bin),

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "../node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/typeof.js":
/*!********************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/typeof.js ***!
  \********************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/regenerator/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/@babel/runtime/regenerator/index.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "../node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "../node_modules/slim-select/dist/slimselect.min.mjs":
/*!***********************************************************!*\
  !*** ../node_modules/slim-select/dist/slimselect.min.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var exports = {};!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SlimSelect=t():e.SlimSelect=t()}(window,function(){return n={},s.m=i=[function(e,t,i){"use strict";function n(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var i=document.createEvent("CustomEvent");return i.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),i}t.__esModule=!0,t.kebabCase=t.highlight=t.isValueInArrayOfObjects=t.debounce=t.putContent=t.ensureElementInView=t.hasClassInTree=void 0,t.hasClassInTree=function(e,t){function n(e,t){return t&&e&&e.classList&&e.classList.contains(t)?e:null}return n(e,t)||function e(t,i){return t&&t!==document?n(t,i)?t:e(t.parentNode,i):null}(e,t)},t.ensureElementInView=function(e,t){var i=e.scrollTop+e.offsetTop,n=i+e.clientHeight,s=t.offsetTop,t=s+t.clientHeight;s<i?e.scrollTop-=i-s:n<t&&(e.scrollTop+=t-n)},t.putContent=function(e,t,i){var n=e.offsetHeight,s=e.getBoundingClientRect(),e=i?s.top:s.top-n,n=i?s.bottom:s.bottom+n;return e<=0?"below":n>=window.innerHeight?"above":i?t:"below"},t.debounce=function(s,a,o){var l;return void 0===a&&(a=100),void 0===o&&(o=!1),function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var i=self,n=o&&!l;clearTimeout(l),l=setTimeout(function(){l=null,o||s.apply(i,e)},a),n&&s.apply(i,e)}},t.isValueInArrayOfObjects=function(e,t,i){if(!Array.isArray(e))return e[t]===i;for(var n=0,s=e;n<s.length;n++){var a=s[n];if(a&&a[t]&&a[t]===i)return!0}return!1},t.highlight=function(e,t,i){var n=e,s=new RegExp("("+t.trim()+")(?![^<]*>[^<>]*</)","i");if(!e.match(s))return e;var a=e.match(s).index,t=a+e.match(s)[0].toString().length,t=e.substring(a,t);return n=n.replace(s,'<mark class="'.concat(i,'">').concat(t,"</mark>"))},t.kebabCase=function(e){var t=e.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,function(e){return"-"+e.toLowerCase()});return e[0]===e[0].toUpperCase()?t.substring(1):t},"function"!=typeof(t=window).CustomEvent&&(n.prototype=t.Event.prototype,t.CustomEvent=n)},function(e,t,i){"use strict";t.__esModule=!0,t.validateOption=t.validateData=t.Data=void 0;var n=(s.prototype.newOption=function(e){return{id:e.id||String(Math.floor(1e8*Math.random())),value:e.value||"",text:e.text||"",innerHTML:e.innerHTML||"",selected:e.selected||!1,display:void 0===e.display||e.display,disabled:e.disabled||!1,placeholder:e.placeholder||!1,class:e.class||void 0,data:e.data||{},mandatory:e.mandatory||!1}},s.prototype.add=function(e){this.data.push({id:String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:"",selected:!1,display:!0,disabled:!1,placeholder:!1,class:void 0,mandatory:e.mandatory,data:{}})},s.prototype.parseSelectData=function(){this.data=[];for(var e=0,t=this.main.select.element.childNodes;e<t.length;e++){var i=t[e];if("OPTGROUP"===i.nodeName){for(var n={label:i.label,options:[]},s=0,a=i.childNodes;s<a.length;s++){var o,l=a[s];"OPTION"===l.nodeName&&(o=this.pullOptionData(l),n.options.push(o),o.placeholder&&""!==o.text.trim()&&(this.main.config.placeholderText=o.text))}this.data.push(n)}else"OPTION"===i.nodeName&&(o=this.pullOptionData(i),this.data.push(o),o.placeholder&&""!==o.text.trim()&&(this.main.config.placeholderText=o.text))}},s.prototype.pullOptionData=function(e){return{id:!!e.dataset&&e.dataset.id||String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:e.innerHTML,selected:e.selected,disabled:e.disabled,placeholder:"true"===e.dataset.placeholder,class:e.className,style:e.style.cssText,data:e.dataset,mandatory:!!e.dataset&&"true"===e.dataset.mandatory}},s.prototype.setSelectedFromSelect=function(){if(this.main.config.isMultiple){for(var e=[],t=0,i=this.main.select.element.options;t<i.length;t++){var n=i[t];!n.selected||(n=this.getObjectFromData(n.value,"value"))&&n.id&&e.push(n.id)}this.setSelected(e,"id")}else{var s=this.main.select.element;-1!==s.selectedIndex&&(s=s.options[s.selectedIndex].value,this.setSelected(s,"value"))}},s.prototype.setSelected=function(e,t){void 0===t&&(t="id");for(var i=0,n=this.data;i<n.length;i++){var s=n[i];if(s.hasOwnProperty("label")){if(s.hasOwnProperty("options")){var a=s.options;if(a)for(var o=0,l=a;o<l.length;o++){var r=l[o];r.placeholder||(r.selected=this.shouldBeSelected(r,e,t))}}}else s.selected=this.shouldBeSelected(s,e,t)}},s.prototype.shouldBeSelected=function(e,t,i){if(void 0===i&&(i="id"),Array.isArray(t))for(var n=0,s=t;n<s.length;n++){var a=s[n];if(i in e&&String(e[i])===String(a))return!0}else if(i in e&&String(e[i])===String(t))return!0;return!1},s.prototype.getSelected=function(){for(var e={text:"",placeholder:this.main.config.placeholderText},t=[],i=0,n=this.data;i<n.length;i++){var s=n[i];if(s.hasOwnProperty("label")){if(s.hasOwnProperty("options")){var a=s.options;if(a)for(var o=0,l=a;o<l.length;o++){var r=l[o];r.selected&&(this.main.config.isMultiple?t.push(r):e=r)}}}else s.selected&&(this.main.config.isMultiple?t.push(s):e=s)}return this.main.config.isMultiple?t:e},s.prototype.addToSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){var i=[],n=this.getSelected();if(Array.isArray(n))for(var s=0,a=n;s<a.length;s++){var o=a[s];i.push(o[t])}i.push(e),this.setSelected(i,t)}},s.prototype.removeFromSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){for(var i=[],n=0,s=this.getSelected();n<s.length;n++){var a=s[n];String(a[t])!==String(e)&&i.push(a[t])}this.setSelected(i,t)}},s.prototype.onDataChange=function(){this.main.onChange&&this.isOnChangeEnabled&&this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())))},s.prototype.getObjectFromData=function(e,t){void 0===t&&(t="id");for(var i=0,n=this.data;i<n.length;i++){var s=n[i];if(t in s&&String(s[t])===String(e))return s;if(s.hasOwnProperty("options"))if(s.options)for(var a=0,o=s.options;a<o.length;a++){var l=o[a];if(String(l[t])===String(e))return l}}return null},s.prototype.search=function(n){var s,e;""!==(this.searchValue=n).trim()?(s=this.main.config.searchFilter,e=this.data.slice(0),n=n.trim(),e=e.map(function(e){if(e.hasOwnProperty("options")){var t=e,i=[];if(0!==(i=t.options?t.options.filter(function(e){return s(e,n)}):i).length){t=Object.assign({},t);return t.options=i,t}}if(e.hasOwnProperty("text")&&s(e,n))return e;return null}),this.filtered=e.filter(function(e){return e})):this.filtered=null},s);function s(e){this.contentOpen=!1,this.contentPosition="below",this.isOnChangeEnabled=!0,this.main=e.main,this.searchValue="",this.data=[],this.filtered=null,this.parseSelectData(),this.setSelectedFromSelect()}function r(e){return void 0!==e.text||(console.error("Data object option must have at least have a text value. Check object: "+JSON.stringify(e)),!1)}t.Data=n,t.validateData=function(e){if(!e)return console.error("Data must be an array of objects"),!1;for(var t=0,i=0,n=e;i<n.length;i++){var s=n[i];if(s.hasOwnProperty("label")){if(s.hasOwnProperty("options")){var a=s.options;if(a)for(var o=0,l=a;o<l.length;o++)r(l[o])||t++}}else r(s)||t++}return 0===t},t.validateOption=r},function(e,t,i){"use strict";t.__esModule=!0;var n=i(3),s=i(4),a=i(5),r=i(1),o=i(0),i=(l.prototype.validate=function(e){e="string"==typeof e.select?document.querySelector(e.select):e.select;if(!e)throw new Error("Could not find select element");if("SELECT"!==e.tagName)throw new Error("Element isnt of type select");return e},l.prototype.selected=function(){if(this.config.isMultiple){for(var e=[],t=0,i=s=this.data.getSelected();t<i.length;t++){var n=i[t];e.push(n.value)}return e}var s;return(s=this.data.getSelected())?s.value:""},l.prototype.set=function(e,t,i,n){void 0===t&&(t="value"),void 0===i&&(i=!0),void 0===n&&(n=!0),this.config.isMultiple&&!Array.isArray(e)?this.data.addToSelected(e,t):this.data.setSelected(e,t),this.select.setValue(),this.data.onDataChange(),this.render(),(i=this.config.hideSelectedOption&&this.config.isMultiple&&this.data.getSelected().length===this.data.data.length?!0:i)&&this.close()},l.prototype.setSelected=function(e,t,i,n){this.set(e,t=void 0===t?"value":t,i=void 0===i?!0:i,n=void 0===n?!0:n)},l.prototype.setData=function(e){if((0,r.validateData)(e)){for(var t=JSON.parse(JSON.stringify(e)),i=this.data.getSelected(),n=0;n<t.length;n++)t[n].value||t[n].placeholder||(t[n].value=t[n].text);if(this.config.isAjax&&i)if(this.config.isMultiple)for(var s=0,a=i.reverse();s<a.length;s++){var o=a[s];t.unshift(o)}else{t.unshift(i);for(n=0;n<t.length;n++)t[n].placeholder||t[n].value!==i.value||t[n].text!==i.text||t.splice(n,1);for(var l=!1,n=0;n<t.length;n++)t[n].placeholder&&(l=!0);l||t.unshift({text:"",placeholder:!0})}this.select.create(t),this.data.parseSelectData(),this.data.setSelectedFromSelect()}else console.error("Validation problem on: #"+this.select.element.id)},l.prototype.addData=function(e){(0,r.validateData)([e])?(this.data.add(this.data.newOption(e)),this.select.create(this.data.data),this.data.parseSelectData(),this.data.setSelectedFromSelect(),this.render()):console.error("Validation problem on: #"+this.select.element.id)},l.prototype.open=function(){var e,t=this;this.config.isEnabled&&(this.data.contentOpen||this.config.hideSelectedOption&&this.config.isMultiple&&this.data.getSelected().length===this.data.data.length||(this.beforeOpen&&this.beforeOpen(),this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.plus.classList.add("ss-cross"):this.slim.singleSelected&&(this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-up")),this.slim[this.config.isMultiple?"multiSelected":"singleSelected"].container.classList.add("above"===this.data.contentPosition?this.config.openAbove:this.config.openBelow),this.config.addToBody&&(e=this.slim.container.getBoundingClientRect(),this.slim.content.style.top=e.top+e.height+window.scrollY+"px",this.slim.content.style.left=e.left+window.scrollX+"px",this.slim.content.style.width=e.width+"px"),this.slim.content.classList.add(this.config.open),"up"===this.config.showContent.toLowerCase()||"down"!==this.config.showContent.toLowerCase()&&"above"===(0,o.putContent)(this.slim.content,this.data.contentPosition,this.data.contentOpen)?this.moveContentAbove():this.moveContentBelow(),this.config.isMultiple||(e=this.data.getSelected())&&(e=e.id,(e=this.slim.list.querySelector('[data-id="'+e+'"]'))&&(0,o.ensureElementInView)(this.slim.list,e)),setTimeout(function(){t.data.contentOpen=!0,t.config.searchFocus&&t.slim.search.input.focus(),t.afterOpen&&t.afterOpen()},this.config.timeoutDelay)))},l.prototype.close=function(){var e=this;this.data.contentOpen&&(this.beforeClose&&this.beforeClose(),this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.plus.classList.remove("ss-cross")):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-up")),this.slim.content.classList.remove(this.config.open),this.data.contentOpen=!1,this.search(""),setTimeout(function(){e.slim.content.removeAttribute("style"),e.data.contentPosition="below",e.config.isMultiple&&e.slim.multiSelected?(e.slim.multiSelected.container.classList.remove(e.config.openAbove),e.slim.multiSelected.container.classList.remove(e.config.openBelow)):e.slim.singleSelected&&(e.slim.singleSelected.container.classList.remove(e.config.openAbove),e.slim.singleSelected.container.classList.remove(e.config.openBelow)),e.slim.search.input.blur(),e.afterClose&&e.afterClose()},this.config.timeoutDelay))},l.prototype.moveContentAbove=function(){var e=0;this.config.isMultiple&&this.slim.multiSelected?e=this.slim.multiSelected.container.offsetHeight:this.slim.singleSelected&&(e=this.slim.singleSelected.container.offsetHeight);var t=e+this.slim.content.offsetHeight-1;this.slim.content.style.margin="-"+t+"px 0 0 0",this.slim.content.style.height=t-e+1+"px",this.slim.content.style.transformOrigin="center bottom",this.data.contentPosition="above",this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.container.classList.add(this.config.openAbove)):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.container.classList.add(this.config.openAbove))},l.prototype.moveContentBelow=function(){this.data.contentPosition="below",this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.add(this.config.openBelow)):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.add(this.config.openBelow))},l.prototype.enable=function(){this.config.isEnabled=!0,this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.container.classList.remove(this.config.disabled):this.slim.singleSelected&&this.slim.singleSelected.container.classList.remove(this.config.disabled),this.select.triggerMutationObserver=!1,this.select.element.disabled=!1,this.slim.search.input.disabled=!1,this.select.triggerMutationObserver=!0},l.prototype.disable=function(){this.config.isEnabled=!1,this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.container.classList.add(this.config.disabled):this.slim.singleSelected&&this.slim.singleSelected.container.classList.add(this.config.disabled),this.select.triggerMutationObserver=!1,this.select.element.disabled=!0,this.slim.search.input.disabled=!0,this.select.triggerMutationObserver=!0},l.prototype.search=function(t){var i;this.data.searchValue!==t&&(this.slim.search.input.value=t,this.config.isAjax?((i=this).config.isSearching=!0,this.render(),this.ajax&&this.ajax(t,function(e){i.config.isSearching=!1,Array.isArray(e)?(e.unshift({text:"",placeholder:!0}),i.setData(e),i.data.search(t),i.render()):"string"==typeof e?i.slim.options(e):i.render()})):(this.data.search(t),this.render()))},l.prototype.setSearchText=function(e){this.config.searchText=e},l.prototype.render=function(){this.config.isMultiple?this.slim.values():(this.slim.placeholder(),this.slim.deselect()),this.slim.options()},l.prototype.destroy=function(e){var t=(e=void 0===e?null:e)?document.querySelector("."+e+".ss-main"):this.slim.container,i=e?document.querySelector("[data-ssid=".concat(e,"]")):this.select.element;t&&i&&(document.removeEventListener("click",this.documentClick),"auto"===this.config.showContent&&window.removeEventListener("scroll",this.windowScroll,!1),i.style.display="",delete i.dataset.ssid,i.slim=null,t.parentElement&&t.parentElement.removeChild(t),!this.config.addToBody||(e=e?document.querySelector("."+e+".ss-content"):this.slim.content)&&document.body.removeChild(e))},l);function l(e){var t=this;this.ajax=null,this.addable=null,this.beforeOnChange=null,this.onChange=null,this.beforeOpen=null,this.afterOpen=null,this.beforeClose=null,this.afterClose=null,this.windowScroll=(0,o.debounce)(function(e){t.data.contentOpen&&("above"===(0,o.putContent)(t.slim.content,t.data.contentPosition,t.data.contentOpen)?t.moveContentAbove():t.moveContentBelow())}),this.documentClick=function(e){e.target&&!(0,o.hasClassInTree)(e.target,t.config.id)&&t.close()};var i=this.validate(e);i.dataset.ssid&&this.destroy(i.dataset.ssid),e.ajax&&(this.ajax=e.ajax),e.addable&&(this.addable=e.addable),this.config=new n.Config({select:i,isAjax:!!e.ajax,showSearch:e.showSearch,searchPlaceholder:e.searchPlaceholder,searchText:e.searchText,searchingText:e.searchingText,searchFocus:e.searchFocus,searchHighlight:e.searchHighlight,searchFilter:e.searchFilter,closeOnSelect:e.closeOnSelect,showContent:e.showContent,placeholderText:e.placeholder,allowDeselect:e.allowDeselect,allowDeselectOption:e.allowDeselectOption,hideSelectedOption:e.hideSelectedOption,deselectLabel:e.deselectLabel,isEnabled:e.isEnabled,valuesUseText:e.valuesUseText,showOptionTooltips:e.showOptionTooltips,selectByGroup:e.selectByGroup,limit:e.limit,timeoutDelay:e.timeoutDelay,addToBody:e.addToBody}),this.select=new s.Select({select:i,main:this}),this.data=new r.Data({main:this}),this.slim=new a.Slim({main:this}),this.select.element.parentNode&&this.select.element.parentNode.insertBefore(this.slim.container,this.select.element.nextSibling),e.data?this.setData(e.data):this.render(),document.addEventListener("click",this.documentClick),"auto"===this.config.showContent&&window.addEventListener("scroll",this.windowScroll,!1),e.beforeOnChange&&(this.beforeOnChange=e.beforeOnChange),e.onChange&&(this.onChange=e.onChange),e.beforeOpen&&(this.beforeOpen=e.beforeOpen),e.afterOpen&&(this.afterOpen=e.afterOpen),e.beforeClose&&(this.beforeClose=e.beforeClose),e.afterClose&&(this.afterClose=e.afterClose),this.config.isEnabled||this.disable()}t.default=i},function(e,t,i){"use strict";t.__esModule=!0,t.Config=void 0;var n=(s.prototype.searchFilter=function(e,t){return-1!==e.text.toLowerCase().indexOf(t.toLowerCase())},s);function s(e){this.id="",this.isMultiple=!1,this.isAjax=!1,this.isSearching=!1,this.showSearch=!0,this.searchFocus=!0,this.searchHighlight=!1,this.closeOnSelect=!0,this.showContent="auto",this.searchPlaceholder="Search",this.searchText="No Results",this.searchingText="Searching...",this.placeholderText="Select Value",this.allowDeselect=!1,this.allowDeselectOption=!1,this.hideSelectedOption=!1,this.deselectLabel="x",this.isEnabled=!0,this.valuesUseText=!1,this.showOptionTooltips=!1,this.selectByGroup=!1,this.limit=0,this.timeoutDelay=200,this.addToBody=!1,this.main="ss-main",this.singleSelected="ss-single-selected",this.arrow="ss-arrow",this.multiSelected="ss-multi-selected",this.add="ss-add",this.plus="ss-plus",this.values="ss-values",this.value="ss-value",this.valueText="ss-value-text",this.valueDelete="ss-value-delete",this.content="ss-content",this.open="ss-open",this.openAbove="ss-open-above",this.openBelow="ss-open-below",this.search="ss-search",this.searchHighlighter="ss-search-highlight",this.addable="ss-addable",this.list="ss-list",this.optgroup="ss-optgroup",this.optgroupLabel="ss-optgroup-label",this.optgroupLabelSelectable="ss-optgroup-label-selectable",this.option="ss-option",this.optionSelected="ss-option-selected",this.highlighted="ss-highlighted",this.disabled="ss-disabled",this.hide="ss-hide",this.id="ss-"+Math.floor(1e5*Math.random()),this.style=e.select.style.cssText,this.class=e.select.className.split(" "),this.isMultiple=e.select.multiple,this.isAjax=e.isAjax,this.showSearch=!1!==e.showSearch,this.searchFocus=!1!==e.searchFocus,this.searchHighlight=!0===e.searchHighlight,this.closeOnSelect=!1!==e.closeOnSelect,e.showContent&&(this.showContent=e.showContent),this.isEnabled=!1!==e.isEnabled,e.searchPlaceholder&&(this.searchPlaceholder=e.searchPlaceholder),e.searchText&&(this.searchText=e.searchText),e.searchingText&&(this.searchingText=e.searchingText),e.placeholderText&&(this.placeholderText=e.placeholderText),this.allowDeselect=!0===e.allowDeselect,this.allowDeselectOption=!0===e.allowDeselectOption,this.hideSelectedOption=!0===e.hideSelectedOption,e.deselectLabel&&(this.deselectLabel=e.deselectLabel),e.valuesUseText&&(this.valuesUseText=e.valuesUseText),e.showOptionTooltips&&(this.showOptionTooltips=e.showOptionTooltips),e.selectByGroup&&(this.selectByGroup=e.selectByGroup),e.limit&&(this.limit=e.limit),e.searchFilter&&(this.searchFilter=e.searchFilter),null!=e.timeoutDelay&&(this.timeoutDelay=e.timeoutDelay),this.addToBody=!0===e.addToBody}t.Config=n},function(e,t,i){"use strict";t.__esModule=!0,t.Select=void 0;var n=i(0),i=(s.prototype.setValue=function(){if(this.main.data.getSelected()){if(this.main.config.isMultiple)for(var e=this.main.data.getSelected(),t=0,i=this.element.options;t<i.length;t++){var n=i[t];n.selected=!1;for(var s=0,a=e;s<a.length;s++)a[s].value===n.value&&(n.selected=!0)}else{e=this.main.data.getSelected();this.element.value=e?e.value:""}this.main.data.isOnChangeEnabled=!1,this.element.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this.main.data.isOnChangeEnabled=!0}},s.prototype.addAttributes=function(){this.element.tabIndex=-1,this.element.style.display="none",this.element.dataset.ssid=this.main.config.id,this.element.setAttribute("aria-hidden","true")},s.prototype.addEventListeners=function(){var t=this;this.element.addEventListener("change",function(e){t.main.data.setSelectedFromSelect(),t.main.render()})},s.prototype.addMutationObserver=function(){var t=this;this.main.config.isAjax||(this.mutationObserver=new MutationObserver(function(e){t.triggerMutationObserver&&(t.main.data.parseSelectData(),t.main.data.setSelectedFromSelect(),t.main.render(),e.forEach(function(e){"class"===e.attributeName&&t.main.slim.updateContainerDivClass(t.main.slim.container)}))}),this.observeMutationObserver())},s.prototype.observeMutationObserver=function(){this.mutationObserver&&this.mutationObserver.observe(this.element,{attributes:!0,childList:!0,characterData:!0})},s.prototype.disconnectMutationObserver=function(){this.mutationObserver&&this.mutationObserver.disconnect()},s.prototype.create=function(e){this.element.innerHTML="";for(var t=0,i=e;t<i.length;t++){var n=i[t];if(n.hasOwnProperty("options")){var s=n,a=document.createElement("optgroup");if(a.label=s.label,s.options)for(var o=0,l=s.options;o<l.length;o++){var r=l[o];a.appendChild(this.createOption(r))}this.element.appendChild(a)}else this.element.appendChild(this.createOption(n))}},s.prototype.createOption=function(t){var i=document.createElement("option");return i.value=""!==t.value?t.value:t.text,i.innerHTML=t.innerHTML||t.text,t.selected&&(i.selected=t.selected),!1===t.display&&(i.style.display="none"),t.disabled&&(i.disabled=!0),t.placeholder&&i.setAttribute("data-placeholder","true"),t.mandatory&&i.setAttribute("data-mandatory","true"),t.class&&t.class.split(" ").forEach(function(e){i.classList.add(e)}),t.data&&"object"==typeof t.data&&Object.keys(t.data).forEach(function(e){i.setAttribute("data-"+(0,n.kebabCase)(e),t.data[e])}),i},s);function s(e){this.triggerMutationObserver=!0,this.element=e.select,this.main=e.main,this.element.disabled&&(this.main.config.isEnabled=!1),this.addAttributes(),this.addEventListeners(),this.mutationObserver=null,this.addMutationObserver(),this.element.slim=e.main}t.Select=i},function(e,t,i){"use strict";t.__esModule=!0,t.Slim=void 0;var n=i(0),o=i(1),i=(s.prototype.containerDiv=function(){var e=document.createElement("div");return e.style.cssText=this.main.config.style,this.updateContainerDivClass(e),e},s.prototype.updateContainerDivClass=function(e){this.main.config.class=this.main.select.element.className.split(" "),e.className="",e.classList.add(this.main.config.id),e.classList.add(this.main.config.main);for(var t=0,i=this.main.config.class;t<i.length;t++){var n=i[t];""!==n.trim()&&e.classList.add(n)}},s.prototype.singleSelectedDiv=function(){var t=this,e=document.createElement("div");e.classList.add(this.main.config.singleSelected);var i=document.createElement("span");i.classList.add("placeholder"),e.appendChild(i);var n=document.createElement("span");n.innerHTML=this.main.config.deselectLabel,n.classList.add("ss-deselect"),n.onclick=function(e){e.stopPropagation(),t.main.config.isEnabled&&t.main.set("")},e.appendChild(n);var s=document.createElement("span");s.classList.add(this.main.config.arrow);var a=document.createElement("span");return a.classList.add("arrow-down"),s.appendChild(a),e.appendChild(s),e.onclick=function(){t.main.config.isEnabled&&(t.main.data.contentOpen?t.main.close():t.main.open())},{container:e,placeholder:i,deselect:n,arrowIcon:{container:s,arrow:a}}},s.prototype.placeholder=function(){var e,t=this.main.data.getSelected();null===t||t&&t.placeholder?((e=document.createElement("span")).classList.add(this.main.config.disabled),e.innerHTML=this.main.config.placeholderText,this.singleSelected&&(this.singleSelected.placeholder.innerHTML=e.outerHTML)):(e="",t&&(e=t.innerHTML&&!0!==this.main.config.valuesUseText?t.innerHTML:t.text),this.singleSelected&&(this.singleSelected.placeholder.innerHTML=t?e:""))},s.prototype.deselect=function(){this.singleSelected&&(!this.main.config.allowDeselect||""===this.main.selected()?this.singleSelected.deselect.classList.add("ss-hide"):this.singleSelected.deselect.classList.remove("ss-hide"))},s.prototype.multiSelectedDiv=function(){var t=this,e=document.createElement("div");e.classList.add(this.main.config.multiSelected);var i=document.createElement("div");i.classList.add(this.main.config.values),e.appendChild(i);var n=document.createElement("div");n.classList.add(this.main.config.add);var s=document.createElement("span");return s.classList.add(this.main.config.plus),s.onclick=function(e){t.main.data.contentOpen&&(t.main.close(),e.stopPropagation())},n.appendChild(s),e.appendChild(n),e.onclick=function(e){t.main.config.isEnabled&&(e.target.classList.contains(t.main.config.valueDelete)||(t.main.data.contentOpen?t.main.close():t.main.open()))},{container:e,values:i,add:n,plus:s}},s.prototype.values=function(){if(this.multiSelected){for(var e=this.multiSelected.values.childNodes,t=this.main.data.getSelected(),i=[],n=0,s=e;n<s.length;n++){for(var a=s[n],o=!0,l=0,r=t;l<r.length;l++){var c=r[l];String(c.id)===String(a.dataset.id)&&(o=!1)}o&&i.push(a)}for(var d=0,h=i;d<h.length;d++){var u=h[d];u.classList.add("ss-out"),this.multiSelected.values.removeChild(u)}for(var p,e=this.multiSelected.values.childNodes,c=0;c<t.length;c++){o=!1;for(var m=0,f=e;m<f.length;m++){a=f[m];String(t[c].id)===String(a.dataset.id)&&(o=!0)}o||(0!==e.length&&HTMLElement.prototype.insertAdjacentElement?0===c?this.multiSelected.values.insertBefore(this.valueDiv(t[c]),e[c]):e[c-1].insertAdjacentElement("afterend",this.valueDiv(t[c])):this.multiSelected.values.appendChild(this.valueDiv(t[c])))}0===t.length&&((p=document.createElement("span")).classList.add(this.main.config.disabled),p.innerHTML=this.main.config.placeholderText,this.multiSelected.values.innerHTML=p.outerHTML)}},s.prototype.valueDiv=function(s){var a=this,e=document.createElement("div");e.classList.add(this.main.config.value),e.dataset.id=s.id;var t=document.createElement("span");return t.classList.add(this.main.config.valueText),t.innerHTML=s.innerHTML&&!0!==this.main.config.valuesUseText?s.innerHTML:s.text,e.appendChild(t),s.mandatory||((t=document.createElement("span")).classList.add(this.main.config.valueDelete),t.innerHTML=this.main.config.deselectLabel,t.onclick=function(e){e.preventDefault(),e.stopPropagation();var t=!1;if(a.main.beforeOnChange||(t=!0),a.main.beforeOnChange){for(var e=a.main.data.getSelected(),i=JSON.parse(JSON.stringify(e)),n=0;n<i.length;n++)i[n].id===s.id&&i.splice(n,1);!1!==a.main.beforeOnChange(i)&&(t=!0)}t&&(a.main.data.removeFromSelected(s.id,"id"),a.main.render(),a.main.select.setValue(),a.main.data.onDataChange())},e.appendChild(t)),e},s.prototype.contentDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.content),e},s.prototype.searchDiv=function(){var n=this,e=document.createElement("div"),s=document.createElement("input"),a=document.createElement("div");e.classList.add(this.main.config.search);var t={container:e,input:s};return this.main.config.showSearch||(e.classList.add(this.main.config.hide),s.readOnly=!0),s.type="search",s.placeholder=this.main.config.searchPlaceholder,s.tabIndex=0,s.setAttribute("aria-label",this.main.config.searchPlaceholder),s.setAttribute("autocapitalize","off"),s.setAttribute("autocomplete","off"),s.setAttribute("autocorrect","off"),s.onclick=function(e){setTimeout(function(){""===e.target.value&&n.main.search("")},10)},s.onkeydown=function(e){"ArrowUp"===e.key?(n.main.open(),n.highlightUp(),e.preventDefault()):"ArrowDown"===e.key?(n.main.open(),n.highlightDown(),e.preventDefault()):"Tab"===e.key?n.main.data.contentOpen?n.main.close():setTimeout(function(){n.main.close()},n.main.config.timeoutDelay):"Enter"===e.key&&e.preventDefault()},s.onkeyup=function(e){var t=e.target;if("Enter"===e.key){if(n.main.addable&&e.ctrlKey)return a.click(),e.preventDefault(),void e.stopPropagation();var i=n.list.querySelector("."+n.main.config.highlighted);i&&i.click()}else"ArrowUp"===e.key||"ArrowDown"===e.key||("Escape"===e.key?n.main.close():n.main.config.showSearch&&n.main.data.contentOpen?n.main.search(t.value):s.value="");e.preventDefault(),e.stopPropagation()},s.onfocus=function(){n.main.open()},e.appendChild(s),this.main.addable&&(a.classList.add(this.main.config.addable),a.innerHTML="+",a.onclick=function(e){var t;n.main.addable&&(e.preventDefault(),e.stopPropagation(),""!==(e=n.search.input.value).trim()?(e=n.main.addable(e),t="",e&&("object"==typeof e?(0,o.validateOption)(e)&&(n.main.addData(e),t=e.value||e.text):(n.main.addData(n.main.data.newOption({text:e,value:e})),t=e),n.main.search(""),setTimeout(function(){n.main.set(t,"value",!1,!1)},100),n.main.config.closeOnSelect&&setTimeout(function(){n.main.close()},100))):n.search.input.focus())},e.appendChild(a),t.addable=a),t},s.prototype.highlightUp=function(){var e=this.list.querySelector("."+this.main.config.highlighted),t=null;if(e)for(t=e.previousSibling;null!==t&&t.classList.contains(this.main.config.disabled);)t=t.previousSibling;else var i=this.list.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")"),t=i[i.length-1];null!==(t=t&&t.classList.contains(this.main.config.optgroupLabel)?null:t)||(i=e.parentNode).classList.contains(this.main.config.optgroup)&&(!i.previousSibling||(i=i.previousSibling.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")")).length&&(t=i[i.length-1])),t&&(e&&e.classList.remove(this.main.config.highlighted),t.classList.add(this.main.config.highlighted),(0,n.ensureElementInView)(this.list,t))},s.prototype.highlightDown=function(){var e,t=this.list.querySelector("."+this.main.config.highlighted),i=null;if(t)for(i=t.nextSibling;null!==i&&i.classList.contains(this.main.config.disabled);)i=i.nextSibling;else i=this.list.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")");null!==i||null===t||(e=t.parentNode).classList.contains(this.main.config.optgroup)&&e.nextSibling&&(i=e.nextSibling.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")")),i&&(t&&t.classList.remove(this.main.config.highlighted),i.classList.add(this.main.config.highlighted),(0,n.ensureElementInView)(this.list,i))},s.prototype.listDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.list),e.setAttribute("role","listbox"),e},s.prototype.options=function(e){void 0===e&&(e="");var t=this.main.data.filtered||this.main.data.data;if((this.list.innerHTML="")!==e)return(i=document.createElement("div")).classList.add(this.main.config.option),i.classList.add(this.main.config.disabled),i.innerHTML=e,void this.list.appendChild(i);if(this.main.config.isAjax&&this.main.config.isSearching)return(i=document.createElement("div")).classList.add(this.main.config.option),i.classList.add(this.main.config.disabled),i.innerHTML=this.main.config.searchingText,void this.list.appendChild(i);if(0===t.length){var i=document.createElement("div");return i.classList.add(this.main.config.option),i.classList.add(this.main.config.disabled),i.innerHTML=this.main.config.searchText,void this.list.appendChild(i)}for(var r=this,n=0,s=t;n<s.length;n++)!function(e){if(e.hasOwnProperty("label")){var t=e,s=document.createElement("div");s.classList.add(r.main.config.optgroup);var i=document.createElement("div");i.classList.add(r.main.config.optgroupLabel),r.main.config.selectByGroup&&r.main.config.isMultiple&&i.classList.add(r.main.config.optgroupLabelSelectable),i.innerHTML=t.label,s.appendChild(i);t=t.options;if(t){for(var a,n=0,o=t;n<o.length;n++){var l=o[n];s.appendChild(r.option(l))}r.main.config.selectByGroup&&r.main.config.isMultiple&&(a=r,i.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation();for(var t=0,i=s.children;t<i.length;t++){var n=i[t];-1!==n.className.indexOf(a.main.config.option)&&n.click()}}))}r.list.appendChild(s)}else r.list.appendChild(r.option(e))}(s[n])},s.prototype.option=function(o){if(o.placeholder){var e=document.createElement("div");return e.classList.add(this.main.config.option),e.classList.add(this.main.config.hide),e}var t=document.createElement("div");t.classList.add(this.main.config.option),t.setAttribute("role","option"),o.class&&o.class.split(" ").forEach(function(e){t.classList.add(e)}),o.style&&(t.style.cssText=o.style);var l=this.main.data.getSelected();t.dataset.id=o.id,this.main.config.searchHighlight&&this.main.slim&&o.innerHTML&&""!==this.main.slim.search.input.value.trim()?t.innerHTML=(0,n.highlight)(o.innerHTML,this.main.slim.search.input.value,this.main.config.searchHighlighter):o.innerHTML&&(t.innerHTML=o.innerHTML),this.main.config.showOptionTooltips&&t.textContent&&t.setAttribute("title",t.textContent);var r=this;t.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation();var t=this.dataset.id;if(!0===o.selected&&r.main.config.allowDeselectOption){var i=!1;if(r.main.beforeOnChange&&r.main.config.isMultiple||(i=!0),r.main.beforeOnChange&&r.main.config.isMultiple){for(var n=r.main.data.getSelected(),s=JSON.parse(JSON.stringify(n)),a=0;a<s.length;a++)s[a].id===t&&s.splice(a,1);!1!==r.main.beforeOnChange(s)&&(i=!0)}i&&(r.main.config.isMultiple?(r.main.data.removeFromSelected(t,"id"),r.main.render(),r.main.select.setValue(),r.main.data.onDataChange()):r.main.set(""))}else o.disabled||o.selected||r.main.config.limit&&Array.isArray(l)&&r.main.config.limit<=l.length||(r.main.beforeOnChange?(n=void 0,(i=JSON.parse(JSON.stringify(r.main.data.getObjectFromData(t)))).selected=!0,r.main.config.isMultiple?(n=JSON.parse(JSON.stringify(l))).push(i):n=JSON.parse(JSON.stringify(i)),!1!==r.main.beforeOnChange(n)&&r.main.set(t,"id",r.main.config.closeOnSelect)):r.main.set(t,"id",r.main.config.closeOnSelect))});e=l&&(0,n.isValueInArrayOfObjects)(l,"id",o.id);return(o.disabled||e)&&(t.onclick=null,r.main.config.allowDeselectOption||t.classList.add(this.main.config.disabled),r.main.config.hideSelectedOption&&t.classList.add(this.main.config.hide)),e?t.classList.add(this.main.config.optionSelected):t.classList.remove(this.main.config.optionSelected),t},s);function s(e){this.main=e.main,this.container=this.containerDiv(),this.content=this.contentDiv(),this.search=this.searchDiv(),this.list=this.listDiv(),this.options(),this.singleSelected=null,this.multiSelected=null,this.main.config.isMultiple?(this.multiSelected=this.multiSelectedDiv(),this.multiSelected&&this.container.appendChild(this.multiSelected.container)):(this.singleSelected=this.singleSelectedDiv(),this.container.appendChild(this.singleSelected.container)),this.main.config.addToBody?(this.content.classList.add(this.main.config.id),document.body.appendChild(this.content)):this.container.appendChild(this.content),this.content.appendChild(this.search.container),this.content.appendChild(this.list)}t.Slim=i}],s.c=n,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=2).default;function s(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}var i,n});/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (exports.SlimSelect);

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(obj, key, value) {
  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "../node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "../node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "../node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "../node_modules/@babel/runtime/helpers/esm/typeof.js");

function _toPrimitive(input, hint) {
  if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "../node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "../node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function _toPropertyKey(arg) {
  var key = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arg, "string");
  return (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key) === "symbol" ? key : String(key);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!********************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./script.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxPQUFPLEVBQUU7QUFBVSxDQUFDLEVBQ2xDO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLE9BQU8sRUFBRTtBQUFRLENBQUMsRUFDaEM7RUFBRUQsSUFBSSxFQUFFLElBQUk7RUFBRUMsT0FBTyxFQUFFO0FBQVUsQ0FBQyxFQUNsQztFQUFFRCxJQUFJLEVBQUUsS0FBSztFQUFFQyxPQUFPLEVBQUU7QUFBUyxDQUFDLEVBQ2xDO0VBQUVELElBQUksRUFBRSxLQUFLO0VBQUVDLE9BQU8sRUFBRTtBQUFlLENBQUMsRUFDeEM7RUFBRUQsSUFBSSxFQUFFLElBQUk7RUFBRUMsT0FBTyxFQUFFO0FBQWEsQ0FBQyxFQUNyQztFQUFFRCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxPQUFPLEVBQUU7QUFBUSxDQUFDLEVBQ2hDO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLE9BQU8sRUFBRTtBQUFNLENBQUMsRUFDOUI7RUFBRUQsSUFBSSxFQUFFLElBQUk7RUFBRUMsT0FBTyxFQUFFO0FBQVcsQ0FBQyxFQUNuQztFQUFFRCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxPQUFPLEVBQUU7QUFBVSxDQUFDLEVBQ2xDO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLE9BQU8sRUFBRTtBQUFZLENBQUMsRUFDcEM7RUFBRUQsSUFBSSxFQUFFLElBQUk7RUFBRUMsT0FBTyxFQUFFO0FBQVUsQ0FBQyxFQUNsQztFQUFFRCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxPQUFPLEVBQUU7QUFBUSxDQUFDLEVBQ2hDO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLE9BQU8sRUFBRTtBQUFVLENBQUMsRUFDbEM7RUFBRUQsSUFBSSxFQUFFLEtBQUs7RUFBRUMsT0FBTyxFQUFFO0FBQVksQ0FBQyxFQUNyQztFQUFFRCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxPQUFPLEVBQUU7QUFBUSxDQUFDLEVBQ2hDO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLE9BQU8sRUFBRTtBQUFXLENBQUMsRUFDbkM7RUFB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RUFDL0I7RUFBRUQsSUFBSSxFQUFFLElBQUk7RUFBRUMsT0FBTyxFQUFFO0FBQVksQ0FBQyxFQUNwQztFQUFFRCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxPQUFPLEVBQUU7QUFBVSxDQUFDLEVBQ2xDO0VBQUVELElBQUksRUFBRSxLQUFLO0VBQUVDLE9BQU8sRUFBRTtBQUFVLENBQUMsRUFDbkM7RUFBRUQsSUFBSSxFQUFFLEtBQUs7RUFBRUMsT0FBTyxFQUFFO0FBQVcsQ0FBQyxFQUNwQztFQUFFRCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxPQUFPLEVBQUU7QUFBTSxDQUFDLEVBQzlCO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLE9BQU8sRUFBRTtBQUFXLENBQUMsRUFDbkM7RUFBRUQsSUFBSSxFQUFFLElBQUk7RUFBRUMsT0FBTyxFQUFFO0FBQVcsQ0FBQyxFQUNuQztFQUFFRCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxPQUFPLEVBQUU7QUFBUyxDQUFDLEVBQ2pDO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLE9BQU8sRUFBRTtBQUFNLENBQUMsRUFDOUI7RUFBRUQsSUFBSSxFQUFFLEtBQUs7RUFBRUMsT0FBTyxFQUFFO0FBQVMsQ0FBQyxFQUNsQztFQUFFRCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxPQUFPLEVBQUU7QUFBWSxDQUFDLEVBQ3BDO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLE9BQU8sRUFBRTtBQUFVLENBQUMsRUFDbEM7RUFBRUQsSUFBSSxFQUFFLElBQUk7RUFBRUMsT0FBTyxFQUFFO0FBQVUsQ0FBQyxFQUNsQztFQUFFRCxJQUFJLEVBQUUsS0FBSztFQUFFQyxPQUFPLEVBQUU7QUFBUSxDQUFDLEVBQ2pDO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLE9BQU8sRUFBRTtBQUFTLENBQUMsRUFDakM7RUFBRUQsSUFBSSxFQUFFLElBQUk7RUFBRUMsT0FBTyxFQUFFO0FBQVcsQ0FBQyxFQUNuQztFQUFFRCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxPQUFPLEVBQUU7QUFBVSxDQUFD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RUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osS0FBSyxFQUNMLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsY0FBYyxFQUNkLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFDTCxLQUFLLEVBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLFNBQVMsRUFDVCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFDTCxLQUFLLEVBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsUUFBUSxFQUNSLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osU0FBUyxFQUNULElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osUUFBUSxFQUNSLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLFNBQVMsRUFDVCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLFVBQVUsRUFDVixLQUFLLEVBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLGNBQWMsRUFDZCxTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixPQUFPLEVBQ1AsUUFBUSxFQUNSLElBQUksQ0FDTDtNQUNEUixLQUFLLEVBQUU7UUFDTEUsRUFBRSxFQUFFLFdBQVc7UUFDZkQsRUFBRSxFQUFFO01B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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kYXRhL2FkZEFwcC50cyIsIndlYnBhY2s6Ly8vLi9kYXRhL2xvYWRBcHBzLnRzIiwid2VicGFjazovLy8uL2RhdGEvdGVtcGxhdGUvY3Jhd2xlci50cyIsIndlYnBhY2s6Ly8vLi9kYXRhL3RlbXBsYXRlL2xheWVyLnRzIiwid2VicGFjazovLy8uL2RhdGEvdGVtcGxhdGUvc2VydmljZUl0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vZGF0YS90ZW1wbGF0ZS9zb2Z0d2FyZS50cyIsIndlYnBhY2s6Ly8vLi9kYXRhL3RlbXBsYXRlL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly8vLi9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvZ2V0TG9jYWxpemVkVmFsdWUudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvbGFuZ3VhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvbGF6eUluaXRNb3JlLnRzIiwid2VicGFjazovLy8uL3VpL2xhenlMb2FkSW1hZ2VzLnRzIiwid2VicGFjazovLy8uL3VpL3BsYXRmb3JtLnRzIiwid2VicGFjazovLy8uL3VpL3RlbXBsYXRlRGF0YS50cyIsIndlYnBhY2s6Ly8vLi91aS91dGlsaXRpZXMvYXJyYXkudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvdXRpbGl0aWVzL2NvbG9yaXovQ29sb3IudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvdXRpbGl0aWVzL2NvbG9yaXovU29sdmVyLnRzIiwid2VicGFjazovLy8uL3VpL3V0aWxpdGllcy9maWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvdXRpbGl0aWVzL2h0bWwudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvdXRpbGl0aWVzL2ltYWdlLnRzIiwid2VicGFjazovLy8uL3VpL3V0aWxpdGllcy9qc29uUmVxdWVzdC50cyIsIndlYnBhY2s6Ly8vLi91aS91dGlsaXRpZXMvcmVuZGVySW1hZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvdXRpbGl0aWVzL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvdXRpbGl0aWVzL3N0cmluZy50cyIsIndlYnBhY2s6Ly8vLi91aS91dGlsaXRpZXMvdXJsLnRzIiwid2VicGFjazovLy8uL3VpL3ZpZXdzL2NvbXBhcmUudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvdmlld3MvbGlzdC50cyIsIndlYnBhY2s6Ly8vLi91aS92aWV3cy9yZW5kZXJCYWRnZXMudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvdmlld3MvdG9XaWtpVGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jaGFyZW5jL2NoYXJlbmMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jcnlwdC9jcnlwdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL21kNS9tZDUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3JlZ2VuZXJhdG9yUnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zbGltLXNlbGVjdC9kaXN0L3NsaW1zZWxlY3QubWluLm1qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5TGlrZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9QcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW1vdmVEdXBsaWNhdGVzIH0gZnJvbSBcIi4uL3VpL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHsgZXF1YWxzSWdub3JlQ2FzZSB9IGZyb20gXCIuLi91aS91dGlsaXRpZXMvc3RyaW5nXCI7XG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi90ZW1wbGF0ZS91dGlsaXRpZXNcIjtcbmltcG9ydCB7IGFwcHMsIGV4dGVuZEZpbHRlciB9IGZyb20gXCIuLi9zY3JpcHRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFwcChvYmo6IEFwcCkge1xuICBjb25zdCBkdXBsaWNhdGVzID0gYXBwcy5maWx0ZXIoXG4gICAgKGFwcCkgPT5cbiAgICAgIGVxdWFsc0lnbm9yZUNhc2UoYXBwLm5hbWUsIG9iai5uYW1lKSB8fFxuICAgICAgKGFwcC53ZWJzaXRlICYmIG9iai53ZWJzaXRlICYmIGVxdWFsc0lnbm9yZUNhc2UoYXBwLndlYnNpdGUsIG9iai53ZWJzaXRlKSlcbiAgKTtcblxuICBpZiAoZHVwbGljYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICBhcHBzLnB1c2gob2JqKTtcbiAgICBleHRlbmRGaWx0ZXIob2JqKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBhcHAgPSBkdXBsaWNhdGVzWzBdO1xuXG4gICAgaWYgKGFwcC5sYXN0UmVsZWFzZSAmJiBvYmoubGFzdFJlbGVhc2UgJiYgYXBwLmxhc3RSZWxlYXNlIDwgb2JqLmxhc3RSZWxlYXNlKVxuICAgICAgYXBwLmxhc3RSZWxlYXNlID0gb2JqLmxhc3RSZWxlYXNlO1xuICAgIGVsc2UgYXBwLmxhc3RSZWxlYXNlID0gYXBwLmxhc3RSZWxlYXNlIHx8IG9iai5sYXN0UmVsZWFzZTtcblxuICAgIGFwcC5kZXNjcmlwdGlvbiA9IGFwcC5kZXNjcmlwdGlvbiB8fCBvYmouZGVzY3JpcHRpb247XG4gICAgYXBwLmltYWdlcy5wdXNoKC4uLm9iai5pbWFnZXMpO1xuICAgIGFwcC5pbWFnZXMgPSByZW1vdmVEdXBsaWNhdGVzKGFwcC5pbWFnZXMpO1xuICAgIGFwcC5pbWFnZVdpa2kgPSBhcHAuaW1hZ2VXaWtpIHx8IG9iai5pbWFnZVdpa2k7XG4gICAgYXBwLmxhbmd1YWdlcy5wdXNoKC4uLm9iai5sYW5ndWFnZXMpO1xuICAgIGFwcC5sYW5ndWFnZXMgPSByZW1vdmVEdXBsaWNhdGVzKGFwcC5sYW5ndWFnZXMpO1xuXG4gICAgYXBwLmNvdmVyYWdlLnB1c2goLi4ub2JqLmNvdmVyYWdlKTtcbiAgICBhcHAuY292ZXJhZ2UgPSByZW1vdmVEdXBsaWNhdGVzKGFwcC5jb3ZlcmFnZSk7XG5cbiAgICBhcHAudG9waWNzLnB1c2goLi4ub2JqLnRvcGljcyk7XG4gICAgYXBwLnRvcGljcyA9IHJlbW92ZUR1cGxpY2F0ZXMoYXBwLnRvcGljcyk7XG5cbiAgICBhcHAucGxhdGZvcm0ucHVzaCguLi5vYmoucGxhdGZvcm0pO1xuICAgIGFwcC5wbGF0Zm9ybSA9IHJlbW92ZUR1cGxpY2F0ZXMoYXBwLnBsYXRmb3JtKTtcblxuICAgIGFwcC53ZWJzaXRlID0gYXBwLndlYnNpdGUgfHwgb2JqLndlYnNpdGU7XG5cbiAgICBpZiAoIWFwcC5kb2N1bWVudGF0aW9uKSB7XG4gICAgICBhcHAuZG9jdW1lbnRhdGlvbiA9IG9iai5kb2N1bWVudGF0aW9uO1xuICAgIH0gZWxzZSBpZiAoL0xpc3Qub2YuT1NNLmJhc2VkLnNlcnZpY2VzL2dpLnRlc3QoYXBwLmRvY3VtZW50YXRpb24pKSB7XG4gICAgICBhcHAuZG9jdW1lbnRhdGlvbiA9IG9iai5kb2N1bWVudGF0aW9uIHx8IGFwcC5kb2N1bWVudGF0aW9uO1xuICAgIH1cblxuICAgIC8vIG1ha2UgdGhlIGZpcnN0IHNvdXJjZSB0aGUgbmV3ZXN0XG4gICAgaWYgKFxuICAgICAgYXBwLnNvdXJjZVswXS5sYXN0Q2hhbmdlLnRvVXBwZXJDYXNlKCkgPlxuICAgICAgb2JqLnNvdXJjZVswXS5sYXN0Q2hhbmdlLnRvVXBwZXJDYXNlKClcbiAgICApIHtcbiAgICAgIGFwcC5zb3VyY2UgPSBbLi4uYXBwLnNvdXJjZSwgLi4ub2JqLnNvdXJjZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcC5zb3VyY2UgPSBbLi4ub2JqLnNvdXJjZSwgLi4uYXBwLnNvdXJjZV07XG4gICAgfVxuXG4gICAgYXBwLmF1dGhvciA9IGFwcC5hdXRob3IgfHwgb2JqLmF1dGhvcjtcbiAgICBhcHAuc291cmNlQ29kZSA9IGFwcC5zb3VyY2VDb2RlIHx8IG9iai5zb3VyY2VDb2RlO1xuXG4gICAgYXBwLmluc3RhbGwuYXNpbiA9IGFwcC5pbnN0YWxsLmFzaW4gfHwgb2JqLmluc3RhbGwuYXNpbjtcbiAgICBhcHAuaW5zdGFsbC5mRHJvaWRJRCA9IGFwcC5pbnN0YWxsLmZEcm9pZElEIHx8IG9iai5pbnN0YWxsLmZEcm9pZElEO1xuICAgIGFwcC5pbnN0YWxsLmdvb2dsZVBsYXlJRCA9XG4gICAgICBhcHAuaW5zdGFsbC5nb29nbGVQbGF5SUQgfHwgb2JqLmluc3RhbGwuZ29vZ2xlUGxheUlEO1xuICAgIGFwcC5pbnN0YWxsLmh1YXdlaUFwcEdhbGxlcnlJRCA9XG4gICAgICBhcHAuaW5zdGFsbC5odWF3ZWlBcHBHYWxsZXJ5SUQgfHwgb2JqLmluc3RhbGwuaHVhd2VpQXBwR2FsbGVyeUlEO1xuICAgIGFwcC5pbnN0YWxsLmFwcGxlU3RvcmVJRCA9XG4gICAgICBhcHAuaW5zdGFsbC5hcHBsZVN0b3JlSUQgfHwgb2JqLmluc3RhbGwuYXBwbGVTdG9yZUlEO1xuICAgIGFwcC5pbnN0YWxsLm1hY0FwcFN0b3JlSUQgPVxuICAgICAgYXBwLmluc3RhbGwubWFjQXBwU3RvcmVJRCB8fCBvYmouaW5zdGFsbC5tYWNBcHBTdG9yZUlEO1xuICAgIGFwcC5pbnN0YWxsLm1pY3Jvc29mdEFwcElEID1cbiAgICAgIGFwcC5pbnN0YWxsLm1pY3Jvc29mdEFwcElEIHx8IG9iai5pbnN0YWxsLm1pY3Jvc29mdEFwcElEO1xuXG4gICAgZXh0ZW5kRmlsdGVyKGFwcCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHJlcXVlc3RUZW1wbGF0ZXMgfSBmcm9tIFwiLi90ZW1wbGF0ZS9jcmF3bGVyXCI7XG5pbXBvcnQgeyB0cmFuc2Zvcm0gYXMgdHJhbnNmb3JtU29mdHdhcmUgfSBmcm9tIFwiLi90ZW1wbGF0ZS9zb2Z0d2FyZVwiO1xuaW1wb3J0IHsgdHJhbnNmb3JtIGFzIHRyYW5zZm9ybVNlcnZpY2VJdGVtIH0gZnJvbSBcIi4vdGVtcGxhdGUvc2VydmljZUl0ZW1cIjtcbmltcG9ydCB7IHRyYW5zZm9ybSBhcyB0cmFuc2Zvcm1MYXllciB9IGZyb20gXCIuL3RlbXBsYXRlL2xheWVyXCI7XG5pbXBvcnQgeyBzaHVmZmxlIH0gZnJvbSBcIi4uL3VpL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHsgZXF1YWxzSWdub3JlQ2FzZSwgZXF1YWxzWWVzIH0gZnJvbSBcIi4uL3VpL3V0aWxpdGllcy9zdHJpbmdcIjtcbmltcG9ydCB7IEFwcCwgY29udGFpbnNPZmZsaW5lTGluayB9IGZyb20gXCIuL3RlbXBsYXRlL3V0aWxpdGllc1wiO1xuaW1wb3J0IHsgYXBwcyB9IGZyb20gXCIuLi9zY3JpcHRcIjtcbmltcG9ydCB7IGFkZEFwcCB9IGZyb20gXCIuL2FkZEFwcFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEFwcHMoXG4gIGRvVXBkYXRlOiAoYXBwczogQXBwW10pID0+IHZvaWQsXG4gIGxhbmd1YWdlID0gXCJlblwiXG4pIHtcbiAgY29uc3Qgc2VydmljZUl0ZW1PYmplY3RzUmVxdWVzdCA9IHJlcXVlc3RUZW1wbGF0ZXMoXCJTZXJ2aWNlIGl0ZW1cIiwgbGFuZ3VhZ2UpO1xuICBjb25zdCBsYXllck9iamVjdHNSZXF1ZXN0ID0gcmVxdWVzdFRlbXBsYXRlcyhcIkxheWVyXCIsIGxhbmd1YWdlKTtcbiAgY29uc3Qgc29mdHdhcmVPYmplY3RzUmVxdWVzdCA9IHJlcXVlc3RUZW1wbGF0ZXMoXCJTb2Z0d2FyZVwiLCBsYW5ndWFnZSk7XG5cbiAgY29uc3Qgc2VydmljZUl0ZW1PYmplY3RzID0gYXdhaXQgc2VydmljZUl0ZW1PYmplY3RzUmVxdWVzdDtcbiAgZm9yIChjb25zdCBzb3VyY2Ugb2Ygc2VydmljZUl0ZW1PYmplY3RzLmZpbHRlcihcbiAgICAocykgPT4gIWNvbnRhaW5zT2ZmbGluZUxpbmsoc1tcIm5hbWVcIl0pXG4gICkpIHtcbiAgICBjb25zdCBvYmo6IEFwcCA9IHRyYW5zZm9ybVNlcnZpY2VJdGVtKHNvdXJjZSk7XG5cbiAgICBhZGRBcHAob2JqKTtcbiAgfVxuXG4gIHNodWZmbGUoYXBwcyk7XG4gIGRvVXBkYXRlKGFwcHMpO1xuXG4gIGNvbnN0IGxheWVyT2JqZWN0cyA9IGF3YWl0IGxheWVyT2JqZWN0c1JlcXVlc3Q7XG4gIGZvciAoY29uc3Qgc291cmNlIG9mIGxheWVyT2JqZWN0cy5maWx0ZXIoXG4gICAgKHMpID0+XG4gICAgICAhY29udGFpbnNPZmZsaW5lTGluayhzW1wibmFtZVwiXSkgJiZcbiAgICAgICFjb250YWluc09mZmxpbmVMaW5rKHNbXCJzbGlwcHlfd2ViXCJdKSAmJlxuICAgICAgIWVxdWFsc1llcyhzW1wiZGlzY29udGludWVkXCJdKVxuICApKSB7XG4gICAgY29uc3Qgb2JqOiBBcHAgPSB0cmFuc2Zvcm1MYXllcihzb3VyY2UpO1xuXG4gICAgYWRkQXBwKG9iaik7XG4gIH1cbiAgZG9VcGRhdGUoYXBwcyk7XG5cbiAgY29uc3Qgc29mdHdhcmVPYmplY3RzID0gYXdhaXQgc29mdHdhcmVPYmplY3RzUmVxdWVzdDtcbiAgZm9yIChjb25zdCBzb3VyY2Ugb2Ygc29mdHdhcmVPYmplY3RzLmZpbHRlcihcbiAgICAocykgPT5cbiAgICAgICFjb250YWluc09mZmxpbmVMaW5rKHNbXCJuYW1lXCJdKSAmJlxuICAgICAgIWNvbnRhaW5zT2ZmbGluZUxpbmsoc1tcIndlYlwiXSkgJiZcbiAgICAgICFlcXVhbHNJZ25vcmVDYXNlKHNbXCJzdGF0dXNcIl0sIFwidW5maW5pc2hlZFwiKSAmJlxuICAgICAgIWVxdWFsc0lnbm9yZUNhc2Uoc1tcInN0YXR1c1wiXSwgXCJ1bm1haW50YWluZWRcIikgJiZcbiAgICAgICFlcXVhbHNJZ25vcmVDYXNlKHNbXCJzdGF0dXNcIl0sIFwiYnJva2VuXCIpXG4gICkpIHtcbiAgICBjb25zdCBvYmo6IEFwcCA9IHRyYW5zZm9ybVNvZnR3YXJlKHNvdXJjZSk7XG5cbiAgICBhZGRBcHAob2JqKTtcbiAgfVxuICBkb1VwZGF0ZShhcHBzKTtcblxuICBjb25zdCBwcm9qZWN0T2JqZWN0cyA9IHdpbmRvdy50YWdJbmZvUHJvamVjdHNSZXNwb25zZSBhcyB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgZGF0YV91bnRpbDogc3RyaW5nO1xuICAgIGRhdGE6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICBwcm9qZWN0X3VybDogc3RyaW5nO1xuICAgICAgaWNvbl91cmw6IHN0cmluZztcbiAgICAgIGRvY191cmw6IHN0cmluZztcbiAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgICBrZXlfZW50cmllczogbnVtYmVyO1xuICAgICAgdGFnX2VudHJpZXM6IG51bWJlcjtcbiAgICAgIHVuaXF1ZV9rZXlzOiBudW1iZXI7XG4gICAgICB1bmlxdWVfdGFnczogbnVtYmVyO1xuICAgIH1bXTtcbiAgfTtcbiAgY29uc3Qgc291cmNlID0gXCJodHRwczovL3RhZ2luZm8ub3BlbnN0cmVldG1hcC5vcmcvcHJvamVjdHNcIjtcbiAgZm9yIChjb25zdCBvYmogb2YgcHJvamVjdE9iamVjdHMuZGF0YSkge1xuICAgIGNvbnN0IGFwcDogQXBwID0ge1xuICAgICAgbmFtZTogb2JqLm5hbWUsXG4gICAgICB3ZWJzaXRlOiBvYmoucHJvamVjdF91cmwsXG4gICAgICBpbWFnZXM6IG9iai5pY29uX3VybCA/IFtvYmouaWNvbl91cmxdIDogW10sXG4gICAgICBkb2N1bWVudGF0aW9uOiBvYmouZG9jX3VybCxcbiAgICAgIHNvdXJjZTogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJ0YWdpbmZvXCIsXG4gICAgICAgICAgZGlzcGxheU5hbWU6IFwidGFnaW5mb1wiLFxuICAgICAgICAgIHVybDogc291cmNlLFxuICAgICAgICAgIGxhc3RDaGFuZ2U6IHByb2plY3RPYmplY3RzLmRhdGFfdW50aWwsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgZGVzY3JpcHRpb246IG9iai5kZXNjcmlwdGlvbixcbiAgICAgIHRvcGljczogW10sXG4gICAgICBsYW5ndWFnZXM6IFtdLFxuICAgICAgcGxhdGZvcm06IFtdLFxuICAgICAgY292ZXJhZ2U6IFtdLFxuICAgICAgaW5zdGFsbDoge30sXG4gICAgfTtcblxuICAgIGFkZEFwcChhcHApO1xuICB9XG4gIGRvVXBkYXRlKGFwcHMpO1xufVxuIiwiLy8gQ29weXJpZ2h0IChDKSAyMDIwIE1hcmt1cyBQZWxvc29cbi8vXG4vLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBPU00gQXBwcyBDYXRhbG9nLlxuLy9cbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbi8vIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuLy8gTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vL1xuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIE9TTSBBcHBzIENhdGFsb2cuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCB7IGdldEpzb24gfSBmcm9tIFwiLi4vLi4vdWkvdXRpbGl0aWVzL2pzb25SZXF1ZXN0XCI7XG5pbXBvcnQgeyBmaW5kQ2xvc2luZ0JyYWNrZXRJbmRleCB9IGZyb20gXCIuLi8uLi91aS91dGlsaXRpZXMvc3RyaW5nXCI7XG5cbnR5cGUgVGVtcGxhdGUgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFRlbXBsYXRlcyh0ZW1wbGF0ZTogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nKSB7XG4gIGNvbnN0IG9iamVjdHM6IFRlbXBsYXRlW10gPSBbXTtcbiAgbGV0IGNvbjtcblxuICBkbyB7XG4gICAgY29uc3QgcGFyYW1zOiB7XG4gICAgICBbbmFtZTogc3RyaW5nXTogc3RyaW5nO1xuICAgIH0gPSB7XG4gICAgICBsaXN0OiBcImVtYmVkZGVkaW5cIixcbiAgICAgIGVpdGl0bGU6IFwiVGVtcGxhdGU6XCIgKyB0ZW1wbGF0ZSxcbiAgICAgIGVpbGltaXQ6IFwiNTAwXCIsXG4gICAgfTtcbiAgICBpZiAoY29uKSBwYXJhbXMuZWljb250aW51ZSA9IGNvbjtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb3NtTWVkaWFBcGlRdWVyeShwYXJhbXMpO1xuXG4gICAgb2JqZWN0cy5wdXNoKFxuICAgICAgLi4uKGF3YWl0IHByb2Nlc3NQYWdlc0J5VGVtcGxhdGVSZXN1bHQocmVzcG9uc2UsIHRlbXBsYXRlLCBsYW5ndWFnZSkpXG4gICAgKTtcblxuICAgIGNvbiA9IHJlc3BvbnNlLmNvbnRpbnVlPy5laWNvbnRpbnVlO1xuICB9IHdoaWxlIChjb24pO1xuXG4gIHJldHVybiBvYmplY3RzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvc21NZWRpYUFwaVF1ZXJ5KHBhcmFtczogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0pIHtcbiAgY29uc3QgYmFzZSA9IFwiaHR0cHM6Ly93aWtpLm9wZW5zdHJlZXRtYXAub3JnL3cvYXBpLnBocFwiO1xuXG4gIHBhcmFtc1tcIm9yaWdpblwiXSA9IFwiKlwiO1xuICBwYXJhbXNbXCJhY3Rpb25cIl0gPSBcInF1ZXJ5XCI7XG4gIHBhcmFtc1tcImZvcm1hdHZlcnNpb25cIl0gPSBcIjJcIjtcbiAgcGFyYW1zW1wiZm9ybWF0XCJdID0gXCJqc29uXCI7XG5cbiAgcmV0dXJuIGF3YWl0IGdldEpzb24oYmFzZSwgcGFyYW1zKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1BhZ2VzQnlUZW1wbGF0ZVJlc3VsdChcbiAgcmVzcG9uc2U6IHsgY29udGludWU6IHsgZWljb250aW51ZTogYW55IH07IHF1ZXJ5OiB7IGVtYmVkZGVkaW46IGFueSB9IH0sXG4gIHRlbXBsYXRlOiBzdHJpbmcsXG4gIGxhbmd1YWdlOiBzdHJpbmdcbikge1xuICBjb25zdCBwYWdlcyA9IHJlc3BvbnNlLnF1ZXJ5LmVtYmVkZGVkaW47XG5cbiAgY29uc3Qgb2JqZWN0czogVGVtcGxhdGVbXSA9IFtdO1xuICBsZXQgaWRzID0gW107XG4gIGZvciAoY29uc3QgcCBpbiBwYWdlcykge1xuICAgIGlmIChsYW5ndWFnZSA9PT0gXCJlblwiKSB7XG4gICAgICBpZiAoXG4gICAgICAgICEvXihhZnxhc3R8YXp8aWR8bXN8YnN8YnJ8Y2F8Y3N8ZGF8ZGV8ZXR8ZW58ZXN8ZW98ZXV8ZnJ8Znl8Z2x8aHJ8aWF8aXN8aXR8aHR8Z2NmfGt1fGx2fGxifGx0fGh1fG5sfG5vfG5ufG9jfHBsfHB0fHJvfHNxfHNrfHNsfHNyLWxhdG58Zml8c3Z8dGx8dml8dHJ8ZGlxfGVsfGJlfGJnfG1rfG1ufHJ1fHNyfHVrfGh5fGhlfGFyfGZhfHBzfG5lfGJufHRhfG1sfHNpfHRofG15fGthfGtvfHR6bXx6aC1oYW5zfHpoLWhhbnR8amF8eXVlKTovZ2kudGVzdChcbiAgICAgICAgICBwYWdlc1twXS50aXRsZVxuICAgICAgICApXG4gICAgICApXG4gICAgICAgIGlkcy5wdXNoKHBhZ2VzW3BdLnBhZ2VpZCk7XG4gICAgfSBlbHNlIGlmIChuZXcgUmVnRXhwKGBeJHtsYW5ndWFnZX06YCwgXCJpZ1wiKS50ZXN0KHBhZ2VzW3BdLnRpdGxlKSlcbiAgICAgIGlkcy5wdXNoKHBhZ2VzW3BdLnBhZ2VpZCk7XG5cbiAgICBpZiAoaWRzLmxlbmd0aCA+PSA1MCkge1xuICAgICAgb2JqZWN0cy5wdXNoKC4uLihhd2FpdCBsb2FkUGFnZXMoaWRzLCB0ZW1wbGF0ZSkpKTtcbiAgICAgIGlkcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpZHMubGVuZ3RoID4gMCkge1xuICAgIG9iamVjdHMucHVzaCguLi4oYXdhaXQgbG9hZFBhZ2VzKGlkcywgdGVtcGxhdGUpKSk7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0cztcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2VzKGlkczogc3RyaW5nW10sIHRlbXBsYXRlOiBzdHJpbmcpIHtcbiAgY29uc3QgcGFyYW1zOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgICBwcm9wOiBcInJldmlzaW9uc1wiLFxuICAgIHJ2cHJvcDogXCJjb250ZW50fHRpbWVzdGFtcFwiLFxuICAgIHBhZ2VpZHM6IGlkcy5qb2luKFwifFwiKSxcbiAgICBydnNsb3RzOiBcIipcIixcbiAgfTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9zbU1lZGlhQXBpUXVlcnkocGFyYW1zKTtcblxuICBjb25zdCBwYWdlcyA9IHJlc3BvbnNlLnF1ZXJ5LnBhZ2VzO1xuXG4gIGNvbnN0IG9iamVjdHM6IFRlbXBsYXRlW10gPSBbXTtcbiAgZm9yIChjb25zdCBwIGluIHBhZ2VzKSB7XG4gICAgY29uc3QgY29udGVudCA9IHBhZ2VzW3BdLnJldmlzaW9uc1swXS5zbG90cy5tYWluLmNvbnRlbnQ7XG4gICAgY29uc3QgcGFnZU9iamVjdHMgPSBwYXJzZVBhZ2UoY29udGVudCwgdGVtcGxhdGUpO1xuICAgIGZvciAoY29uc3QgbyBvZiBwYWdlT2JqZWN0cykge1xuICAgICAgby5zb3VyY2VXaWtpID0gcGFnZXNbcF0udGl0bGU7XG4gICAgICBvLnRpbWVzdGFtcCA9IHBhZ2VzW3BdLnJldmlzaW9uc1swXS50aW1lc3RhbXA7XG4gICAgfVxuICAgIG9iamVjdHMucHVzaCguLi5wYWdlT2JqZWN0cyk7XG4gIH1cbiAgcmV0dXJuIG9iamVjdHM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGFnZShjb250ZW50OiBzdHJpbmcsIHRlbXBsYXRlOiBzdHJpbmcpIHtcbiAgY29uc3Qgb2JqZWN0czogVGVtcGxhdGVbXSA9IFtdO1xuXG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLyg8IS0tLio/LS0+KXwoPCEtLVtcXHdcXFdcXG5cXHNdKz8tLT4pL2csIFwiXCIpO1xuXG4gIGNvbnN0IHJlZ2V4VGVtcGxhdGUgPSBuZXcgUmVnRXhwKFwie3tcIiArIHRlbXBsYXRlLnJlcGxhY2UoXCIgXCIsIFwiW18gXVwiKSwgXCJnaVwiKTtcbiAgbGV0IHN0YXJ0ID0gY29udGVudC5zZWFyY2gocmVnZXhUZW1wbGF0ZSk7XG5cbiAgd2hpbGUgKHN0YXJ0ICE9PSAtMSkge1xuICAgIGxldCB0ZW1wbGF0ZUNvbnRlbnQgPSBjb250ZW50LnN1YnN0cmluZyhzdGFydCk7XG5cbiAgICBjb25zdCBjbG9zaW5nID0gZmluZENsb3NpbmdCcmFja2V0SW5kZXgodGVtcGxhdGVDb250ZW50LCAwKTtcblxuICAgIGNvbnRlbnQgPSB0ZW1wbGF0ZUNvbnRlbnQuc3Vic3RyaW5nKGNsb3NpbmcgKyAxKTtcbiAgICB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZUNvbnRlbnQuc3Vic3RyaW5nKDAsIGNsb3NpbmcgKyAxKTtcblxuICAgIHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlQ29udGVudFxuICAgICAgLnN1YnN0cmluZyh0ZW1wbGF0ZUNvbnRlbnQuaW5kZXhPZihcInxcIiksIHRlbXBsYXRlQ29udGVudC5sZW5ndGggLSAyKVxuICAgICAgLnRyaW0oKTtcblxuICAgIG9iamVjdHMucHVzaChwYXJzZVRlbXBsYXRlVG9PYmplY3QodGVtcGxhdGVDb250ZW50KSk7XG5cbiAgICBzdGFydCA9IGNvbnRlbnQuc2VhcmNoKHJlZ2V4VGVtcGxhdGUpO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdHM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGVtcGxhdGVUb09iamVjdChjb250ZW50OiBzdHJpbmcpIHtcbiAgY29uc3Qgb2JqOiBUZW1wbGF0ZSA9IHt9O1xuICBjb25zdCBwcm9wcyA9IGNvbnRlbnQuc3BsaXQoL1xcfCg/IVtee10qfSkoPyFbXlxcW10qXFxdKS9nKTtcbiAgcHJvcHMuc2hpZnQoKTtcblxuICBmb3IgKGNvbnN0IHAgaW4gcHJvcHMpIHtcbiAgICBjb25zdCBwYWlyID0gcHJvcHNbcF0udHJpbSgpO1xuICAgIGNvbnN0IHN0YXJ0ID0gcGFpci5pbmRleE9mKFwiPVwiKTtcbiAgICBjb25zdCBuYW1lID0gcGFpci5zdWJzdHJpbmcoMCwgc3RhcnQpLnRyaW0oKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhaXIuc3Vic3RyaW5nKHN0YXJ0ICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKHZhbHVlKSBvYmpbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG4iLCIvLyBDb3B5cmlnaHQgKEMpIDIwMjAgTWFya3VzIFBlbG9zb1xuLy9cbi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE9TTSBBcHBzIENhdGFsb2cuXG4vL1xuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuLy8gcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlXG4vLyBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuLy9cbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbi8vXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggT1NNIEFwcHMgQ2F0YWxvZy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuaW1wb3J0IHsgdG9XaWtpbWVkaWFVcmwgfSBmcm9tIFwiLi4vLi4vdWkvdXRpbGl0aWVzL2ltYWdlXCI7XG5pbXBvcnQgeyB0b1dpa2lVcmwsIHRvVXJsIH0gZnJvbSBcIi4uLy4uL3VpL3V0aWxpdGllcy91cmxcIjtcbmltcG9ydCB7IGxhbmd1YWdlVmFsdWVUb0Rpc3BsYXkgfSBmcm9tIFwiLi4vLi4vdWkvbGFuZ3VhZ2VcIjtcbmltcG9ydCB7IHJlbW92ZUR1cGxpY2F0ZXMgfSBmcm9tIFwiLi4vLi4vdWkvdXRpbGl0aWVzL2FycmF5XCI7XG5pbXBvcnQgeyBhcHBlbmRGdWxsU3RvcCwgdG9EYXRlLCB0cmltIH0gZnJvbSBcIi4uLy4uL3VpL3V0aWxpdGllcy9zdHJpbmdcIjtcbmltcG9ydCB7XG4gIEFwcCxcbiAgcHJvY2Vzc1dpa2lUZXh0LFxuICBleHRyYWN0UmVwbyxcbiAgc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleCxcbiAgZXh0cmFjdFdlYnNpdGUsXG4gIGV4dHJhY3ROYW1lV2Vic2l0ZVdpa2ksXG59IGZyb20gXCIuL3V0aWxpdGllc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtKHNvdXJjZTogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0pIHtcbiAgY29uc3Qgb2JqOiBBcHAgPSB7XG4gICAgbmFtZTogZXh0cmFjdE5hbWVXZWJzaXRlV2lraShzb3VyY2VbXCJuYW1lXCJdLCBzb3VyY2Uuc291cmNlV2lraSkubmFtZSxcbiAgICBsYXN0UmVsZWFzZTogdG9EYXRlKHNvdXJjZVtcImRhdGVcIl0pIHx8IFwiXCIsXG4gICAgZGVzY3JpcHRpb246IGFwcGVuZEZ1bGxTdG9wKHByb2Nlc3NXaWtpVGV4dChzb3VyY2VbXCJkZXNjcmlwdGlvblwiXSB8fCBcIlwiKSksXG4gICAgaW1hZ2VzOiBbXG4gICAgICAuLi50b1dpa2ltZWRpYVVybChzb3VyY2VbXCJzY3JlZW5zaG90XCJdLCAyNTApLFxuICAgICAgLi4udG9XaWtpbWVkaWFVcmwoc291cmNlW1wibG9nb1wiXSwgMjUwKSxcbiAgICBdLFxuICAgIGltYWdlV2lraTogc291cmNlW1wic2NyZWVuc2hvdFwiXSB8fCBzb3VyY2VbXCJsb2dvXCJdLFxuICAgIHdlYnNpdGU6IHRvVXJsKGV4dHJhY3RXZWJzaXRlKHNvdXJjZVtcInNsaXBweV93ZWJcIl0pKSxcbiAgICBkb2N1bWVudGF0aW9uOiB0b1dpa2lVcmwoc291cmNlLnNvdXJjZVdpa2kpIHx8IFwiXCIsXG4gICAgc291cmNlOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiTGF5ZXJcIixcbiAgICAgICAgd2lraTogc291cmNlLnNvdXJjZVdpa2ksXG4gICAgICAgIGRpc3BsYXlOYW1lOiBgV2lraSAoTGF5ZXIpIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiPjwvaT5gLFxuICAgICAgICB1cmw6IHRvV2lraVVybChzb3VyY2Uuc291cmNlV2lraSkgfHwgXCJcIixcbiAgICAgICAgbGFzdENoYW5nZTogc291cmNlW1widGltZXN0YW1wXCJdIHx8IFwiXCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgc291cmNlQ29kZTogdG9VcmwoZXh0cmFjdFJlcG8oc291cmNlW1wicmVwb1wiXSkpLFxuICAgIGF1dGhvcjogcHJvY2Vzc1dpa2lUZXh0KHNvdXJjZVtcImF1dGhvclwiXSB8fCBcIlwiKVxuICAgICAgLnNwbGl0KHNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgpXG4gICAgICAubWFwKHRyaW0pXG4gICAgICAuZmlsdGVyKCh2KSA9PiB2KVxuICAgICAgLmpvaW4oXCIsIFwiKSxcbiAgICBsYW5ndWFnZXM6IChzb3VyY2VbXCJ0aWxlc19sYW5ndWFnZXNcIl0gfHwgXCJcIilcbiAgICAgIC5zcGxpdChzcGxpdEJ5Q29tbWFCdXROb3RJbnNpZGVCcmFjZVJlZ2V4KVxuICAgICAgLm1hcCh0cmltKVxuICAgICAgLmZpbHRlcigodikgPT4gdilcbiAgICAgIC5tYXAoKHYpID0+IGxhbmd1YWdlVmFsdWVUb0Rpc3BsYXkodikpLFxuICAgIGxhbmd1YWdlc1VybDogdG9Vcmwoc291cmNlW1widGlsZXNfbGFuZ3VhZ2VzdXJsXCJdKSxcbiAgICB0b3BpY3M6IFtdLFxuICAgIHBsYXRmb3JtOiBbXCJXZWJcIl0sXG4gICAgY292ZXJhZ2U6IFtdLFxuICAgIGluc3RhbGw6IHt9LFxuICAgIGxpY2Vuc2U6IHByb2Nlc3NXaWtpVGV4dChzb3VyY2VbXCJ0aWxlc19saWNlbnNlXCJdIHx8IFwiXCIpXG4gICAgICAuc3BsaXQoc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleClcbiAgICAgIC5tYXAodHJpbSlcbiAgICAgIC5maWx0ZXIoKHYpID0+IHYpXG4gICAgICAuam9pbihcIiwgXCIpLFxuICB9O1xuXG4gIG9iai5sYW5ndWFnZXMgPSByZW1vdmVEdXBsaWNhdGVzKG9iai5sYW5ndWFnZXMpLnNvcnQoKTtcbiAgcmV0dXJuIG9iajtcbn1cbiIsIi8vIENvcHlyaWdodCAoQykgMjAyMCBNYXJrdXMgUGVsb3NvXG4vL1xuLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgT1NNIEFwcHMgQ2F0YWxvZy5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4vLyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbi8vIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vL1xuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy9cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCBPU00gQXBwcyBDYXRhbG9nLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgeyB0b1dpa2ltZWRpYVVybCB9IGZyb20gXCIuLi8uLi91aS91dGlsaXRpZXMvaW1hZ2VcIjtcbmltcG9ydCB7IHRvV2lraVVybCwgdG9VcmwgfSBmcm9tIFwiLi4vLi4vdWkvdXRpbGl0aWVzL3VybFwiO1xuaW1wb3J0IHsgbGFuZ3VhZ2VWYWx1ZVRvRGlzcGxheSB9IGZyb20gXCIuLi8uLi91aS9sYW5ndWFnZVwiO1xuaW1wb3J0IHsgcmVtb3ZlRHVwbGljYXRlcyB9IGZyb20gXCIuLi8uLi91aS91dGlsaXRpZXMvYXJyYXlcIjtcbmltcG9ydCB7XG4gIGFwcGVuZEZ1bGxTdG9wLFxuICB0cmltLFxuICBmaXJzdExldHRlclRvVXBwZXJDYXNlLFxuICBzdGFydHNXaXRoSWdub3JlQ2FzZSxcbn0gZnJvbSBcIi4uLy4uL3VpL3V0aWxpdGllcy9zdHJpbmdcIjtcbmltcG9ydCB7XG4gIEFwcCxcbiAgcHJvY2Vzc1dpa2lUZXh0LFxuICBzcGxpdEJ5Q29tbWFCdXROb3RJbnNpZGVCcmFjZVJlZ2V4LFxuICBleHRyYWN0TmFtZVdlYnNpdGVXaWtpLFxuICBleHRyYWN0V2Vic2l0ZSxcbiAgZXh0cmFjdExhbmd1YWdlQ29kZUZyb21UZW1wbGF0ZSxcbn0gZnJvbSBcIi4vdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm0oc291cmNlOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICBjb25zdCBvYmo6IEFwcCA9IHtcbiAgICBuYW1lOiBleHRyYWN0TmFtZVdlYnNpdGVXaWtpKHNvdXJjZVtcIm5hbWVcIl0sIHNvdXJjZS5zb3VyY2VXaWtpKS5uYW1lLFxuXG4gICAgZGVzY3JpcHRpb246IGFwcGVuZEZ1bGxTdG9wKHByb2Nlc3NXaWtpVGV4dChzb3VyY2VbXCJkZXNjclwiXSB8fCBcIlwiKSksXG4gICAgaW1hZ2VzOiB0b1dpa2ltZWRpYVVybChzb3VyY2VbXCJpbWFnZVwiXSwgMjUwKSxcbiAgICBpbWFnZVdpa2k6IHNvdXJjZVtcImltYWdlXCJdLFxuICAgIHNvdXJjZTogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIlNlcnZpY2VJdGVtXCIsXG4gICAgICAgIHdpa2k6IHNvdXJjZS5zb3VyY2VXaWtpLFxuICAgICAgICBkaXNwbGF5TmFtZTogYFdpa2kgKFNlcnZpY2VJdGVtKSA8aSBjbGFzcz1cImZhcyBmYS1wZW5cIj48L2k+YCxcbiAgICAgICAgdXJsOiB0b1dpa2lVcmwoc291cmNlLnNvdXJjZVdpa2kpIHx8IFwiXCIsXG4gICAgICAgIGxhc3RDaGFuZ2U6IHNvdXJjZVtcInRpbWVzdGFtcFwiXSB8fCBcIlwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIHNvdXJjZUNvZGU6IHRvVXJsKGV4dHJhY3RXZWJzaXRlKHNvdXJjZVtcIm1hdGVyaWFsXCJdKSksXG4gICAgbGlicmU6IHN0YXJ0c1dpdGhJZ25vcmVDYXNlKHNvdXJjZVtcIm1hdGVyaWFsXCJdLCBcInt7eWVzXCIpLFxuICAgIGxhbmd1YWdlczogKHNvdXJjZVtcImxhbmdcIl0gfHwgXCJcIilcbiAgICAgIC5zcGxpdChzcGxpdEJ5Q29tbWFCdXROb3RJbnNpZGVCcmFjZVJlZ2V4KVxuICAgICAgLm1hcChleHRyYWN0TGFuZ3VhZ2VDb2RlRnJvbVRlbXBsYXRlKVxuICAgICAgLm1hcCh0cmltKVxuICAgICAgLmZpbHRlcigodikgPT4gdilcbiAgICAgIC5tYXAoKHYpID0+IGxhbmd1YWdlVmFsdWVUb0Rpc3BsYXkodikpLFxuICAgIGxhbmd1YWdlc1VybDogdG9VcmwoZXh0cmFjdFdlYnNpdGUoc291cmNlW1wibGFuZ1wiXSkpLFxuICAgIHRvcGljczogKHNvdXJjZVtcImdlbnJlXCJdIHx8IFwiXCIpXG4gICAgICAuc3BsaXQoc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleClcbiAgICAgIC5tYXAodHJpbSlcbiAgICAgIC5maWx0ZXIoKHYpID0+IHYpXG4gICAgICAubWFwKGZpcnN0TGV0dGVyVG9VcHBlckNhc2UpXG4gICAgICAuc29ydCgpLFxuICAgIHBsYXRmb3JtOiBbXSxcbiAgICBjb3ZlcmFnZTogW10sXG4gICAgaW5zdGFsbDoge30sXG4gIH07XG5cbiAgaWYgKHNvdXJjZVtcInJlZ2lvblwiXSkge1xuICAgIG9iai5jb3ZlcmFnZS5wdXNoKFxuICAgICAgc291cmNlW1wicmVnaW9uXCJdXG4gICAgICAgIC5zcGxpdChzcGxpdEJ5Q29tbWFCdXROb3RJbnNpZGVCcmFjZVJlZ2V4KVxuICAgICAgICAubWFwKHRyaW0pXG4gICAgICAgIC5maWx0ZXIoKHYpID0+IHYpXG4gICAgICAgIC5tYXAoZmlyc3RMZXR0ZXJUb1VwcGVyQ2FzZSlcbiAgICAgICAgLmpvaW4oXCIsIFwiKVxuICAgICk7XG4gIH1cblxuICBvYmoubGFuZ3VhZ2VzID0gcmVtb3ZlRHVwbGljYXRlcyhvYmoubGFuZ3VhZ2VzKS5zb3J0KCk7XG4gIG9iai5jb3ZlcmFnZSA9IHJlbW92ZUR1cGxpY2F0ZXMob2JqLmNvdmVyYWdlKS5zb3J0KCk7XG4gIG9iai50b3BpY3MgPSByZW1vdmVEdXBsaWNhdGVzKG9iai50b3BpY3MpLnNvcnQoKTtcblxuICBsZXQgbmFtZSA9IGV4dHJhY3ROYW1lV2Vic2l0ZVdpa2koc291cmNlW1wibmFtZVwiXSwgc291cmNlLnNvdXJjZVdpa2kpO1xuICBvYmoubmFtZSA9IG5hbWUubmFtZSB8fCBvYmoubmFtZTtcbiAgb2JqLndlYnNpdGUgPSBuYW1lLndlYnNpdGU7XG4gIG9iai5kb2N1bWVudGF0aW9uID0gbmFtZS53aWtpIHx8IG9iai5kb2N1bWVudGF0aW9uO1xuICByZXR1cm4gb2JqO1xufVxuIiwiLy8gQ29weXJpZ2h0IChDKSAyMDIwIE1hcmt1cyBQZWxvc29cbi8vXG4vLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBPU00gQXBwcyBDYXRhbG9nLlxuLy9cbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbi8vIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuLy8gTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vL1xuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIE9TTSBBcHBzIENhdGFsb2cuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCB7IHRvV2lraW1lZGlhVXJsIH0gZnJvbSBcIi4uLy4uL3VpL3V0aWxpdGllcy9pbWFnZVwiO1xuaW1wb3J0IHsgdG9XaWtpVXJsLCB0b1VybCB9IGZyb20gXCIuLi8uLi91aS91dGlsaXRpZXMvdXJsXCI7XG5pbXBvcnQgeyBwbGF0Zm9ybVZhbHVlVG9EaXNwbGF5IH0gZnJvbSBcIi4uLy4uL3VpL3BsYXRmb3JtXCI7XG5pbXBvcnQgeyBsYW5ndWFnZVZhbHVlVG9EaXNwbGF5IH0gZnJvbSBcIi4uLy4uL3VpL2xhbmd1YWdlXCI7XG5pbXBvcnQgeyByZW1vdmVEdXBsaWNhdGVzLCBzb21lIH0gZnJvbSBcIi4uLy4uL3VpL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHtcbiAgYXBwZW5kRnVsbFN0b3AsXG4gIHRyaW0sXG4gIGZpcnN0TGV0dGVyVG9VcHBlckNhc2UsXG4gIHRvRGF0ZSxcbiAgZXF1YWxzWWVzLFxufSBmcm9tIFwiLi4vLi4vdWkvdXRpbGl0aWVzL3N0cmluZ1wiO1xuaW1wb3J0IHtcbiAgQXBwLFxuICBwcm9jZXNzV2lraVRleHQsXG4gIGV4dHJhY3RSZXBvLFxuICBzcGxpdEJ5Q29tbWFCdXROb3RJbnNpZGVCcmFjZVJlZ2V4LFxuICBleHRyYWN0TmFtZVdlYnNpdGVXaWtpLFxufSBmcm9tIFwiLi91dGlsaXRpZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybShzb3VyY2U6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9KSB7XG4gIGNvbnN0IG9iajogQXBwID0ge1xuICAgIG5hbWU6IGV4dHJhY3ROYW1lV2Vic2l0ZVdpa2koc291cmNlW1wibmFtZVwiXSwgc291cmNlLnNvdXJjZVdpa2kpLm5hbWUsXG4gICAgbGFzdFJlbGVhc2U6IHRvRGF0ZShzb3VyY2VbXCJkYXRlXCJdKSB8fCBcIlwiLFxuICAgIGRlc2NyaXB0aW9uOiBhcHBlbmRGdWxsU3RvcChwcm9jZXNzV2lraVRleHQoc291cmNlW1wiZGVzY3JpcHRpb25cIl0gfHwgXCJcIikpLFxuICAgIGltYWdlczogW1xuICAgICAgLi4udG9XaWtpbWVkaWFVcmwoc291cmNlW1wic2NyZWVuc2hvdFwiXSwgMjUwKSxcbiAgICAgIC4uLnRvV2lraW1lZGlhVXJsKHNvdXJjZVtcImxvZ29cIl0sIDI1MCksXG4gICAgXSxcbiAgICBpbWFnZVdpa2k6IHNvdXJjZVtcInNjcmVlbnNob3RcIl0gfHwgc291cmNlW1wibG9nb1wiXSxcbiAgICB3ZWJzaXRlOiB0b1VybChzb3VyY2VbXCJ3ZWJcIl0pLFxuICAgIGRvY3VtZW50YXRpb246IHRvV2lraVVybChzb3VyY2VbXCJ3aWtpXCJdIHx8IHNvdXJjZS5zb3VyY2VXaWtpKSB8fCBcIlwiLFxuICAgIHNvdXJjZTogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIlNvZnR3YXJlXCIsXG4gICAgICAgIHdpa2k6IHNvdXJjZS5zb3VyY2VXaWtpLFxuICAgICAgICBkaXNwbGF5TmFtZTogYFdpa2kgKFNvZnR3YXJlKSA8aSBjbGFzcz1cImZhcyBmYS1wZW5cIj48L2k+YCxcbiAgICAgICAgdXJsOiB0b1dpa2lVcmwoc291cmNlLnNvdXJjZVdpa2kpIHx8IFwiXCIsXG4gICAgICAgIGxhc3RDaGFuZ2U6IHNvdXJjZVtcInRpbWVzdGFtcFwiXSB8fCBcIlwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGF1dGhvcjogcHJvY2Vzc1dpa2lUZXh0KHNvdXJjZVtcImF1dGhvclwiXSB8fCBcIlwiKVxuICAgICAgLnNwbGl0KHNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgpXG4gICAgICAubWFwKHRyaW0pXG4gICAgICAuZmlsdGVyKCh2KSA9PiB2KVxuICAgICAgLmpvaW4oXCIsIFwiKSxcbiAgICBzb3VyY2VDb2RlOiB0b1VybChcbiAgICAgIGV4dHJhY3RSZXBvKHNvdXJjZVtcInJlcG9cIl0gfHwgc291cmNlW1wiZ2l0XCJdIHx8IHNvdXJjZVtcInN2blwiXSlcbiAgICApLFxuICAgIGdyYXRpczogc29tZShbc291cmNlW1wicHJpY2VcIl1dLCBbXCJncmF0aXNcIiwgXCJmcmVlXCIsIFwiMFwiXSksXG4gICAgbGlicmU6ICEhc291cmNlW1wibGljZW5zZVwiXT8ubWF0Y2goXG4gICAgICBcIig/Oi4qR1BMLip8QXBhY2hlLip8LipCU0QuKnxQRHxXVEZQTHxNcy1QTC4qKVwiXG4gICAgKSxcbiAgICBwcmljZTogc291cmNlW1wicHJpY2VcIl0sXG4gICAgbGljZW5zZTogcHJvY2Vzc1dpa2lUZXh0KHNvdXJjZVtcImxpY2Vuc2VcIl0gfHwgXCJcIilcbiAgICAgIC5zcGxpdChzcGxpdEJ5Q29tbWFCdXROb3RJbnNpZGVCcmFjZVJlZ2V4KVxuICAgICAgLm1hcCh0cmltKVxuICAgICAgLmZpbHRlcigodikgPT4gdilcbiAgICAgIC5qb2luKFwiLCBcIiksXG4gICAgbGFuZ3VhZ2VzOiAoc291cmNlW1wibGFuZ3VhZ2VzXCJdIHx8IFwiXCIpXG4gICAgICAuc3BsaXQoc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleClcbiAgICAgIC5tYXAodHJpbSlcbiAgICAgIC5maWx0ZXIoKHYpID0+IHYpXG4gICAgICAubWFwKCh2KSA9PiBsYW5ndWFnZVZhbHVlVG9EaXNwbGF5KHYpKSxcbiAgICBsYW5ndWFnZXNVcmw6IHRvVXJsKHNvdXJjZVtcImxhbmd1YWdlc3VybFwiXSksXG4gICAgdG9waWNzOiB0b1ZhbHVlcyhzb3VyY2VbXCJnZW5yZVwiXSksXG4gICAgcGxhdGZvcm06IChzb3VyY2VbXCJwbGF0Zm9ybVwiXSB8fCBcIlwiKVxuICAgICAgLnJlcGxhY2UoL1xcW1xcWy9nLCBcIlwiKVxuICAgICAgLnJlcGxhY2UoL1xcXVxcXS9nLCBcIlwiKVxuICAgICAgLnNwbGl0KHNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgpXG4gICAgICAubWFwKHRyaW0pXG4gICAgICAuZmlsdGVyKCh2KSA9PiB2KVxuICAgICAgLm1hcCgodikgPT4gcGxhdGZvcm1WYWx1ZVRvRGlzcGxheSh2KSksXG4gICAgY292ZXJhZ2U6IFtdLFxuICAgIGluc3RhbGw6IHtcbiAgICAgIGFzaW46IHNvdXJjZVtcImFzaW5cIl0sXG4gICAgICBmRHJvaWRJRDogc291cmNlW1wiZkRyb2lkSURcIl0sXG4gICAgICBnb29nbGVQbGF5SUQ6IHNvdXJjZVtcImdvb2dsZVBsYXlJRFwiXSxcbiAgICAgIGh1YXdlaUFwcEdhbGxlcnlJRDogc291cmNlW1wiaHVhd2VpQXBwR2FsbGVyeUlEXCJdLFxuICAgICAgYXBwbGVTdG9yZUlEOiBzb3VyY2VbXCJhcHBsZVN0b3JlSURcIl0sXG4gICAgICBtYWNBcHBTdG9yZUlEOiBzb3VyY2VbXCJtYWNBcHBTdG9yZUlEXCJdLFxuICAgICAgbWljcm9zb2Z0QXBwSUQ6IHNvdXJjZVtcIm1pY3Jvc29mdEFwcElEXCJdLFxuICAgIH0sXG4gICAgbWFwOiB7XG4gICAgICBtYXA6IHRvVmFsdWVzKHNvdXJjZVtcIm1hcFwiXSksXG4gICAgICBtYXBEYXRhOiB0b1ZhbHVlcyhzb3VyY2VbXCJtYXBEYXRhXCJdKSxcbiAgICAgIGRhdGFzb3VyY2U6IHRvVmFsdWVzKHNvdXJjZVtcImRhdGFzb3VyY2VcIl0pLFxuICAgICAgcm90YXRlTWFwOiB0b1ZhbHVlcyhzb3VyY2VbXCJyb3RhdGVNYXBcIl0pLFxuICAgICAgXCIzRFwiOiB0b1ZhbHVlcyhzb3VyY2VbXCIzRFwiXSksXG4gICAgICBzaG93V2Vic2l0ZTogdG9WYWx1ZXMoc291cmNlW1wic2hvd1dlYnNpdGVcIl0pLFxuICAgICAgc2hvd1Bob25lTnVtYmVyOiB0b1ZhbHVlcyhzb3VyY2VbXCJzaG93UGhvbmVOdW1iZXJcIl0pLFxuICAgICAgc2hvd09wZW5pbmdIb3VyczogdG9WYWx1ZXMoc291cmNlW1wic2hvd09wZW5pbmdIb3Vyc1wiXSksXG4gICAgfSxcbiAgICByb3V0aW5nOiB7XG4gICAgICByb3V0aW5nOiB0b1ZhbHVlcyhzb3VyY2VbXCJyb3V0aW5nXCJdKSxcbiAgICAgIGNyZWF0ZVJvdXRlTWFudWFsbHk6IHRvVmFsdWVzKHNvdXJjZVtcImNyZWF0ZVJvdXRlTWFudWFsbHlcIl0pLFxuICAgICAgY2FsY3VsYXRlUm91dGU6IHRvVmFsdWVzKHNvdXJjZVtcImNhbGN1bGF0ZVJvdXRlXCJdKSxcbiAgICAgIGNyZWF0ZVJvdXRlVmlhV2F5cG9pbnRzOiB0b1ZhbHVlcyhzb3VyY2VbXCJjcmVhdGVSb3V0ZVZpYVdheXBvaW50c1wiXSksXG4gICAgICBwcm9maWxlczogdG9WYWx1ZXMoc291cmNlW1wicHJvZmlsZXNcIl0pLFxuICAgICAgdHVyblJlc3RyaWN0aW9uczogdG9WYWx1ZXMoc291cmNlW1widHVyblJlc3RyaWN0aW9uc1wiXSksXG4gICAgICBjYWxjdWxhdGVSb3V0ZU9mZmxpbmU6IHRvVmFsdWVzKHNvdXJjZVtcImNhbGN1bGF0ZVJvdXRlT2ZmbGluZVwiXSksXG4gICAgICByb3V0aW5nUHJvdmlkZXJzOiB0b1ZhbHVlcyhzb3VyY2VbXCJyb3V0aW5nUHJvdmlkZXJzXCJdKSxcbiAgICAgIGF2b2lkVHJhZmZpYzogdG9WYWx1ZXMoc291cmNlW1wiYXZvaWRUcmFmZmljXCJdKSxcbiAgICAgIHRyYWZmaWNQcm92aWRlcjogdG9WYWx1ZXMoc291cmNlW1widHJhZmZpY1Byb3ZpZGVyXCJdKSxcbiAgICB9LFxuICAgIG5hdmlnYXRpbmc6IHtcbiAgICAgIG5hdmlnYXRpbmc6IHRvVmFsdWVzKHNvdXJjZVtcIm5hdmlnYXRpbmdcIl0pLFxuICAgICAgZmluZExvY2F0aW9uOiB0b1ZhbHVlcyhzb3VyY2VbXCJmaW5kTG9jYXRpb25cIl0pLFxuICAgICAgZmluZE5lYXJieVBPSTogdG9WYWx1ZXMoc291cmNlW1wiZmluZE5lYXJieVBPSVwiXSksXG4gICAgICBuYXZUb1BvaW50OiB0b1ZhbHVlcyhzb3VyY2VbXCJuYXZUb1BvaW50XCJdKSxcbiAgICAgIHZvaWNlOiB0b1ZhbHVlcyhzb3VyY2VbXCJ2b2ljZVwiXSksXG4gICAgICBrZWVwT25Sb2FkOiB0b1ZhbHVlcyhzb3VyY2VbXCJrZWVwT25Sb2FkXCJdKSxcbiAgICAgIHR1cm5MYW5lczogdG9WYWx1ZXMoc291cmNlW1widHVybkxhbmVzXCJdKSxcbiAgICAgIHdpdGhvdXRHUFM6IHRvVmFsdWVzKHNvdXJjZVtcIndpdGhvdXRHUFNcIl0pLFxuICAgICAgcHJlZGVmaW5lZFJvdXRlOiB0b1ZhbHVlcyhzb3VyY2VbXCJwcmVkZWZpbmVkUm91dGVcIl0pLFxuICAgIH0sXG4gICAgdHJhY2tpbmc6IHtcbiAgICAgIHRyYWNraW5nOiB0b1ZhbHVlcyhzb3VyY2VbXCJ0cmFja2luZ1wiXSksXG4gICAgICBjdXN0b21JbnRlcnZhbDogdG9WYWx1ZXMoc291cmNlW1wiY3VzdG9tSW50ZXJ2YWxcIl0pLFxuICAgICAgdHJhY2tGb3JtYXRzOiB0b1ZhbHVlcyhzb3VyY2VbXCJ0cmFja0Zvcm1hdHNcIl0pLFxuICAgICAgZ2VvdGFnZ2luZzogdG9WYWx1ZXMoc291cmNlW1wiZ2VvdGFnZ2luZ1wiXSksXG4gICAgICBmYXN0V2F5UG9pbnRBZGRpbmc6IHRvVmFsdWVzKHNvdXJjZVtcImZhc3RXYXlQb2ludEFkZGluZ1wiXSksXG4gICAgICB1cGxvYWRHUFg6IHRvVmFsdWVzKHNvdXJjZVtcInVwbG9hZEdQWFwiXSksXG4gICAgfSxcbiAgICBtb25pdG9yaW5nOiB7XG4gICAgICBtb25pdG9yaW5nOiB0b1ZhbHVlcyhzb3VyY2VbXCJtb25pdG9yaW5nXCJdKSxcbiAgICAgIHNob3dUcmFjazogdG9WYWx1ZXMoc291cmNlW1wic2hvd1RyYWNrXCJdKSxcbiAgICAgIHNob3dFeGlzdGluZ1RyYWNrOiB0b1ZhbHVlcyhzb3VyY2VbXCJzaG93RXhpc3RpbmdUcmFja1wiXSksXG4gICAgICBzaG93QWx0aXR1ZGVEaWFncmFtOiB0b1ZhbHVlcyhzb3VyY2VbXCJzaG93QWx0aXR1ZGVEaWFncmFtXCJdKSxcbiAgICAgIHNob3dET1A6IHRvVmFsdWVzKHNvdXJjZVtcInNob3dET1BcIl0pLFxuICAgICAgc2hvd1NhdGVsbGl0ZXM6IHRvVmFsdWVzKHNvdXJjZVtcInNob3dTYXRlbGxpdGVzXCJdKSxcbiAgICAgIHNob3dOTUVBbGl2ZTogdG9WYWx1ZXMoc291cmNlW1wic2hvd05NRUFsaXZlXCJdKSxcbiAgICAgIHNob3dTcGVlZDogdG9WYWx1ZXMoc291cmNlW1wic2hvd1NwZWVkXCJdKSxcbiAgICAgIHNlbmRQb3NpdGlvbjogdG9WYWx1ZXMoc291cmNlW1wic2VuZFBvc2l0aW9uXCJdKSxcbiAgICB9LFxuICAgIGVkaXRpbmc6IHtcbiAgICAgIGFkZFBPSTogdG9WYWx1ZXMoc291cmNlW1wiYWRkUE9JXCJdKSxcbiAgICAgIGVkaXRQT0k6IHRvVmFsdWVzKHNvdXJjZVtcImVkaXRQT0lcIl0pLFxuICAgICAgYWRkV2F5OiB0b1ZhbHVlcyhzb3VyY2VbXCJhZGRXYXlcIl0pLFxuICAgICAgZWRpdEdlb206IHRvVmFsdWVzKHNvdXJjZVtcImVkaXRHZW9tXCJdKSxcbiAgICAgIGVkaXRUYWdzOiB0b1ZhbHVlcyhzb3VyY2VbXCJlZGl0VGFnc1wiXSksXG4gICAgICBlZGl0UmVsYXRpb25zOiB0b1ZhbHVlcyhzb3VyY2VbXCJlZGl0UmVsYXRpb25zXCJdKSxcbiAgICAgIHZpZXdOb3RlczogdG9WYWx1ZXMoc291cmNlW1widmlld05vdGVzXCJdKSxcbiAgICAgIGNyZWF0ZU5vdGVzOiB0b1ZhbHVlcyhzb3VyY2VbXCJjcmVhdGVOb3Rlc1wiXSksXG4gICAgICBlZGl0Tm90ZXM6IHRvVmFsdWVzKHNvdXJjZVtcImVkaXROb3Rlc1wiXSksXG4gICAgICBlZGl0U291cmNlOiB0b1ZhbHVlcyhzb3VyY2VbXCJlZGl0U291cmNlXCJdKSxcbiAgICAgIG9mZnNldERCc3VwcG9ydDogdG9WYWx1ZXMoc291cmNlW1wib2Zmc2V0REJzdXBwb3J0XCJdKSxcbiAgICAgIHVwbG9hZE9TTURhdGE6IHRvVmFsdWVzKHNvdXJjZVtcInVwbG9hZE9TTURhdGFcIl0pLFxuICAgIH0sXG4gICAgcmVuZGVyaW5nOiB7XG4gICAgICByZW5kZXJlck91dHB1dEZvcm1hdHM6IHRvVmFsdWVzKHNvdXJjZVtcInJlbmRlcmVyT3V0cHV0Rm9ybWF0c1wiXSksXG4gICAgfSxcbiAgICBhY2Nlc3NpYmlsaXR5OiB7XG4gICAgICBhY2Nlc3NpYmlsaXR5OiB0b1ZhbHVlcyhzb3VyY2VbXCJhY2Nlc3NpYmlsaXR5XCJdKSxcbiAgICAgIHRleHRPbmx5VUk6IHRvVmFsdWVzKHNvdXJjZVtcInRleHRPbmx5VUlcIl0pLFxuICAgICAgYnJhaWxsZVVJOiB0b1ZhbHVlcyhzb3VyY2VbXCJicmFpbGxlVUlcIl0pLFxuICAgICAgZXhwbG9yZXJNb2RlOiB0b1ZhbHVlcyhzb3VyY2VbXCJleHBsb3Jlck1vZGVcIl0pLFxuICAgICAgcHVibGljVHJhbnNwb3J0TW9kZTogdG9WYWx1ZXMoc291cmNlW1wicHVibGljVHJhbnNwb3J0TW9kZVwiXSksXG4gICAgICBkYW5nZXJXYXJuaW5nczogdG9WYWx1ZXMoc291cmNlW1wiZGFuZ2VyV2FybmluZ3NcIl0pLFxuICAgICAgc2NyZWVuUmVhZGVyOiB0b1ZhbHVlcyhzb3VyY2VbXCJzY3JlZW5SZWFkZXJcIl0pLFxuICAgICAgc2NyZWVuUmVhZGVyTGFuZzogKHNvdXJjZVtcInNjcmVlblJlYWRlckxhbmdcIl0gfHwgXCJcIilcbiAgICAgICAgLnNwbGl0KHNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgpXG4gICAgICAgIC5tYXAodHJpbSlcbiAgICAgICAgLmZpbHRlcigodikgPT4gdilcbiAgICAgICAgLm1hcCgodikgPT4gbGFuZ3VhZ2VWYWx1ZVRvRGlzcGxheSh2KSksXG4gICAgfSxcbiAgfTtcblxuICBpZiAoc291cmNlW1wiY292ZXJhZ2VcIl0pIHtcbiAgICBjb25zdCBjb3ZlcmFnZSA9IHNvdXJjZVtcImNvdmVyYWdlXCJdXG4gICAgICAuc3BsaXQoc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleClcbiAgICAgIC5tYXAodHJpbSlcbiAgICAgIC5maWx0ZXIoKHYpID0+IHYpXG4gICAgICAubWFwKGZpcnN0TGV0dGVyVG9VcHBlckNhc2UpO1xuXG4gICAgbGV0IGVudHJ5ID0gW107XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvdmVyYWdlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgZW50cnkucHVzaChjb3ZlcmFnZVtpbmRleF0pO1xuICAgICAgb2JqLmNvdmVyYWdlLnB1c2goZW50cnkuam9pbihcIiwgXCIpKTtcbiAgICB9XG4gIH1cblxuICBvYmoucGxhdGZvcm0gPSByZW1vdmVEdXBsaWNhdGVzKG9iai5wbGF0Zm9ybSkuc29ydCgpO1xuICBvYmoubGFuZ3VhZ2VzID0gcmVtb3ZlRHVwbGljYXRlcyhvYmoubGFuZ3VhZ2VzKS5zb3J0KCk7XG4gIG9iai5jb3ZlcmFnZSA9IHJlbW92ZUR1cGxpY2F0ZXMob2JqLmNvdmVyYWdlKS5zb3J0KCk7XG5cbiAgaWYgKGhhc1ZhbHVlKHNvdXJjZVtcImRhdGFzb3VyY2VcIl0pKVxuICAgIG9iai50b3BpY3MucHVzaChcbiAgICAgIC4uLihzb3VyY2VbXCJkYXRhc291cmNlXCJdIHx8IFwiXCIpXG4gICAgICAgIC5zcGxpdChzcGxpdEJ5Q29tbWFCdXROb3RJbnNpZGVCcmFjZVJlZ2V4KVxuICAgICAgICAubWFwKHRyaW0pXG4gICAgICAgIC5maWx0ZXIoKHYpID0+IHYpXG4gICAgICAgIC5tYXAoZmlyc3RMZXR0ZXJUb1VwcGVyQ2FzZSlcbiAgICApO1xuXG4gIGlmIChlcXVhbHNZZXMoc291cmNlW1wiM0RcIl0pKSBvYmoudG9waWNzLnB1c2goXCIzRFwiKTtcblxuICBpZiAoXG4gICAgZXF1YWxzWWVzKFxuICAgICAgc291cmNlW1wic2hvd1dlYnNpdGVcIl0sXG4gICAgICBzb3VyY2VbXCJzaG93UGhvbmVOdW1iZXJcIl0sXG4gICAgICBzb3VyY2VbXCJzaG93T3BlbmluZ0hvdXJzXCJdLFxuICAgICAgc291cmNlW1wiZmluZE5lYXJieVBPSVwiXVxuICAgIClcbiAgKVxuICAgIG9iai50b3BpY3MucHVzaChcIlBPSVwiKTtcblxuICBpZiAoXG4gICAgZXF1YWxzWWVzKFxuICAgICAgc291cmNlW1wicm91dGluZ1wiXSxcbiAgICAgIHNvdXJjZVtcImNyZWF0ZVJvdXRlTWFudWFsbHlcIl0sXG4gICAgICBzb3VyY2VbXCJjYWxjdWxhdGVSb3V0ZVwiXSxcbiAgICAgIHNvdXJjZVtcImNhbGN1bGF0ZVJvdXRlT2ZmbGluZVwiXVxuICAgIClcbiAgKVxuICAgIG9iai50b3BpY3MucHVzaChcIlJvdXRpbmdcIik7XG5cbiAgaWYgKGhhc1ZhbHVlKHNvdXJjZVtcInByb2ZpbGVzXCJdKSlcbiAgICBvYmoudG9waWNzLnB1c2goXG4gICAgICAuLi4oc291cmNlW1wicHJvZmlsZXNcIl0gfHwgXCJcIilcbiAgICAgICAgLnNwbGl0KHNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgpXG4gICAgICAgIC5tYXAodHJpbSlcbiAgICAgICAgLmZpbHRlcigodikgPT4gdilcbiAgICAgICAgLm1hcChmaXJzdExldHRlclRvVXBwZXJDYXNlKVxuICAgICk7XG5cbiAgaWYgKGVxdWFsc1llcyhzb3VyY2VbXCJuYXZpZ2F0aW5nXCJdLCBzb3VyY2VbXCJuYXZUb1BvaW50XCJdKSlcbiAgICBvYmoudG9waWNzLnB1c2goXCJOYXZpXCIpO1xuXG4gIGlmIChlcXVhbHNZZXMoc291cmNlW1wiZmluZExvY2F0aW9uXCJdKSkgb2JqLnRvcGljcy5wdXNoKFwiU2VhcmNoXCIpO1xuXG4gIGlmIChlcXVhbHNZZXMoc291cmNlW1widHJhY2tpbmdcIl0pKSBvYmoudG9waWNzLnB1c2goXCJUcmFjayBsb2dnaW5nXCIpO1xuXG4gIGlmIChlcXVhbHNZZXMoc291cmNlW1wibW9uaXRvcmluZ1wiXSkpIG9iai50b3BpY3MucHVzaChcIlRyYWNrIG1vbml0b3JpbmdcIik7XG5cbiAgaWYgKHNvdXJjZVtcInJlbmRlcmVyT3V0cHV0Rm9ybWF0c1wiXSkgb2JqLnRvcGljcy5wdXNoKFwiUmVuZGVyaW5nXCIpO1xuXG4gIGlmIChcbiAgICBlcXVhbHNZZXMoXG4gICAgICBzb3VyY2VbXCJhZGRQT0lcIl0sXG4gICAgICBzb3VyY2VbXCJlZGl0UE9JXCJdLFxuICAgICAgc291cmNlW1wiYWRkV2F5XCJdLFxuICAgICAgc291cmNlW1wiZWRpdEdlb21cIl0sXG4gICAgICBzb3VyY2VbXCJlZGl0VGFnc1wiXSxcbiAgICAgIHNvdXJjZVtcImVkaXRSZWxhdGlvbnNcIl1cbiAgICApXG4gIClcbiAgICBvYmoudG9waWNzLnB1c2goXCJFZGl0b3JcIik7XG5cbiAgaWYgKFxuICAgIGVxdWFsc1llcyhzb3VyY2VbXCJ2aWV3Tm90ZXNcIl0sIHNvdXJjZVtcImNyZWF0ZU5vdGVzXCJdLCBzb3VyY2VbXCJlZGl0Tm90ZXNcIl0pXG4gIClcbiAgICBvYmoudG9waWNzLnB1c2goXCJOb3Rlc1wiKTtcblxuICBpZiAoaGFzVmFsdWUoc291cmNlW1wiZWRpdFNvdXJjZVwiXSkpXG4gICAgb2JqLnRvcGljcy5wdXNoKFxuICAgICAgLi4uKHNvdXJjZVtcImVkaXRTb3VyY2VcIl0gfHwgXCJcIilcbiAgICAgICAgLnNwbGl0KHNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgpXG4gICAgICAgIC5tYXAodHJpbSlcbiAgICAgICAgLmZpbHRlcigodikgPT4gdilcbiAgICAgICAgLm1hcChmaXJzdExldHRlclRvVXBwZXJDYXNlKVxuICAgICk7XG5cbiAgaWYgKGhhc1ZhbHVlKHNvdXJjZVtcImFjY2Vzc2liaWxpdHlcIl0pKSB7XG4gICAgb2JqLnRvcGljcy5wdXNoKFxuICAgICAgLi4uKHNvdXJjZVtcImFjY2Vzc2liaWxpdHlcIl0gfHwgXCJcIilcbiAgICAgICAgLnNwbGl0KHNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgpXG4gICAgICAgIC5tYXAodHJpbSlcbiAgICAgICAgLmZpbHRlcigodikgPT4gdilcbiAgICAgICAgLm1hcChmaXJzdExldHRlclRvVXBwZXJDYXNlKVxuICAgICk7XG4gICAgb2JqLnRvcGljcy5wdXNoKFwiQWNjZXNzaWJpbGl0eVwiKTtcbiAgfVxuICBpZiAoZXF1YWxzWWVzKHNvdXJjZVtcImFjY2Vzc2liaWxpdHlcIl0pKSBvYmoudG9waWNzLnB1c2goXCJBY2Nlc3NpYmlsaXR5XCIpO1xuICBpZiAoXG4gICAgZXF1YWxzWWVzKFxuICAgICAgc291cmNlW1widGV4dE9ubHlVSVwiXSxcbiAgICAgIHNvdXJjZVtcImJyYWlsbGVVSVwiXSxcbiAgICAgIHNvdXJjZVtcImV4cGxvcmVyTW9kZVwiXSxcbiAgICAgIHNvdXJjZVtcInNjcmVlblJlYWRlclwiXVxuICAgIClcbiAgKVxuICAgIG9iai50b3BpY3MucHVzaChcIkJsaW5kXCIpO1xuXG4gIG9iai50b3BpY3MgPSByZW1vdmVEdXBsaWNhdGVzKG9iai50b3BpY3MpLnNvcnQoKTtcblxuICB7XG4gICAgY29uc3QgbmFtZSA9IGV4dHJhY3ROYW1lV2Vic2l0ZVdpa2koc291cmNlW1wibmFtZVwiXSwgc291cmNlLnNvdXJjZVdpa2kpO1xuICAgIG9iai5uYW1lID0gbmFtZS5uYW1lIHx8IG9iai5uYW1lO1xuICAgIG9iai53ZWJzaXRlID0gb2JqLndlYnNpdGUgfHwgbmFtZS53ZWJzaXRlO1xuICAgIG9iai5kb2N1bWVudGF0aW9uID0gb2JqLmRvY3VtZW50YXRpb24gfHwgbmFtZS53aWtpIHx8IFwiXCI7XG4gIH1cbiAge1xuICAgIGNvbnN0IG5hbWUgPSBleHRyYWN0TmFtZVdlYnNpdGVXaWtpKHNvdXJjZVtcIndlYlwiXSwgc291cmNlLnNvdXJjZVdpa2kpO1xuICAgIG9iai5uYW1lID0gb2JqLm5hbWUgfHwgbmFtZS5uYW1lO1xuICAgIG9iai53ZWJzaXRlID0gbmFtZS53ZWJzaXRlIHx8IG9iai53ZWJzaXRlO1xuICAgIG9iai5kb2N1bWVudGF0aW9uID0gb2JqLmRvY3VtZW50YXRpb24gfHwgbmFtZS53aWtpIHx8IFwiXCI7XG4gIH1cbiAge1xuICAgIGNvbnN0IG5hbWUgPSBleHRyYWN0TmFtZVdlYnNpdGVXaWtpKHNvdXJjZVtcIndpa2lcIl0sIHNvdXJjZS5zb3VyY2VXaWtpKTtcbiAgICBvYmoubmFtZSA9IG9iai5uYW1lIHx8IG5hbWUubmFtZTtcbiAgICBvYmoud2Vic2l0ZSA9IG9iai53ZWJzaXRlIHx8IG5hbWUud2Vic2l0ZTtcbiAgICBvYmouZG9jdW1lbnRhdGlvbiA9IG5hbWUud2lraSB8fCBvYmouZG9jdW1lbnRhdGlvbjtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBoYXNWYWx1ZSh2YWx1ZTogc3RyaW5nID0gXCJcIikge1xuICB2YWx1ZSA9IHZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiB2YWx1ZSAmJiB2YWx1ZSAhPT0gXCJZRVNcIiAmJiB2YWx1ZSAhPT0gXCJOT1wiICYmIHZhbHVlICE9PSBcIj9cIjtcbn1cblxuZnVuY3Rpb24gdG9WYWx1ZXModmFsdWU6IHN0cmluZyA9IFwiXCIpIHtcbiAgcmV0dXJuIHZhbHVlXG4gICAgLnNwbGl0KHNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgpXG4gICAgLm1hcCh0cmltKVxuICAgIC5maWx0ZXIoKHYpID0+IHYpXG4gICAgLm1hcChmaXJzdExldHRlclRvVXBwZXJDYXNlKTtcbn1cbiIsIi8vIENvcHlyaWdodCAoQykgMjAyMCBNYXJrdXMgUGVsb3NvXG4vL1xuLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgT1NNIEFwcHMgQ2F0YWxvZy5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4vLyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbi8vIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vL1xuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy9cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCBPU00gQXBwcyBDYXRhbG9nLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgeyB0b1dpa2lVcmwgfSBmcm9tIFwiLi4vLi4vdWkvdXRpbGl0aWVzL3VybFwiO1xuXG5leHBvcnQgdHlwZSBBcHAgPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgbGFzdFJlbGVhc2U/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGltYWdlczogc3RyaW5nW107XG4gIGltYWdlV2lraT86IHN0cmluZztcbiAgd2Vic2l0ZT86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgZG9jdW1lbnRhdGlvbj86IHN0cmluZztcbiAgc291cmNlOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHdpa2k/OiBzdHJpbmc7XG4gICAgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICBsYXN0Q2hhbmdlOiBzdHJpbmc7XG4gIH1bXTtcbiAgYXV0aG9yPzogc3RyaW5nO1xuICAvLyBmcmVlIG9mIGNoYXJnZSBzb2Z0d2FyZVxuICBncmF0aXM/OiBib29sZWFuO1xuICAvLyBGTE9TUyBsaWNlbnNlXG4gIGxpYnJlPzogYm9vbGVhbjtcbiAgcHJpY2U/OiBzdHJpbmc7XG4gIGxpY2Vuc2U/OiBzdHJpbmc7XG4gIHNvdXJjZUNvZGU/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGxhbmd1YWdlczogc3RyaW5nW107XG4gIGxhbmd1YWdlc1VybD86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgdG9waWNzOiBzdHJpbmdbXTtcbiAgcGxhdGZvcm06IHN0cmluZ1tdO1xuICBjb3ZlcmFnZTogc3RyaW5nW107XG4gIGluc3RhbGw6IHtcbiAgICBhc2luPzogc3RyaW5nO1xuICAgIGZEcm9pZElEPzogc3RyaW5nO1xuICAgIGdvb2dsZVBsYXlJRD86IHN0cmluZztcbiAgICBodWF3ZWlBcHBHYWxsZXJ5SUQ/OiBzdHJpbmc7XG4gICAgYXBwbGVTdG9yZUlEPzogc3RyaW5nO1xuICAgIG1hY0FwcFN0b3JlSUQ/OiBzdHJpbmc7XG4gICAgbWljcm9zb2Z0QXBwSUQ/OiBzdHJpbmc7XG4gIH07XG4gIG1hcD86IHtcbiAgICBtYXA6IHN0cmluZ1tdO1xuICAgIG1hcERhdGE6IHN0cmluZ1tdO1xuICAgIGRhdGFzb3VyY2U6IHN0cmluZ1tdO1xuICAgIHJvdGF0ZU1hcDogc3RyaW5nW107XG4gICAgXCIzRFwiOiBzdHJpbmdbXTtcbiAgICBzaG93V2Vic2l0ZTogc3RyaW5nW107XG4gICAgc2hvd1Bob25lTnVtYmVyOiBzdHJpbmdbXTtcbiAgICBzaG93T3BlbmluZ0hvdXJzOiBzdHJpbmdbXTtcbiAgfTtcbiAgcm91dGluZz86IHtcbiAgICByb3V0aW5nOiBzdHJpbmdbXTtcbiAgICBjcmVhdGVSb3V0ZU1hbnVhbGx5OiBzdHJpbmdbXTtcbiAgICBjYWxjdWxhdGVSb3V0ZTogc3RyaW5nW107XG4gICAgY3JlYXRlUm91dGVWaWFXYXlwb2ludHM6IHN0cmluZ1tdO1xuICAgIHByb2ZpbGVzOiBzdHJpbmdbXTtcbiAgICB0dXJuUmVzdHJpY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBjYWxjdWxhdGVSb3V0ZU9mZmxpbmU6IHN0cmluZ1tdO1xuICAgIHJvdXRpbmdQcm92aWRlcnM6IHN0cmluZ1tdO1xuICAgIGF2b2lkVHJhZmZpYzogc3RyaW5nW107XG4gICAgdHJhZmZpY1Byb3ZpZGVyOiBzdHJpbmdbXTtcbiAgfTtcbiAgbmF2aWdhdGluZz86IHtcbiAgICBuYXZpZ2F0aW5nOiBzdHJpbmdbXTtcbiAgICBmaW5kTG9jYXRpb246IHN0cmluZ1tdO1xuICAgIGZpbmROZWFyYnlQT0k6IHN0cmluZ1tdO1xuICAgIG5hdlRvUG9pbnQ6IHN0cmluZ1tdO1xuICAgIHZvaWNlOiBzdHJpbmdbXTtcbiAgICBrZWVwT25Sb2FkOiBzdHJpbmdbXTtcbiAgICB0dXJuTGFuZXM6IHN0cmluZ1tdO1xuICAgIHdpdGhvdXRHUFM6IHN0cmluZ1tdO1xuICAgIHByZWRlZmluZWRSb3V0ZTogc3RyaW5nW107XG4gIH07XG4gIHRyYWNraW5nPzoge1xuICAgIHRyYWNraW5nOiBzdHJpbmdbXTtcbiAgICBjdXN0b21JbnRlcnZhbDogc3RyaW5nW107XG4gICAgdHJhY2tGb3JtYXRzOiBzdHJpbmdbXTtcbiAgICBnZW90YWdnaW5nOiBzdHJpbmdbXTtcbiAgICBmYXN0V2F5UG9pbnRBZGRpbmc6IHN0cmluZ1tdO1xuICAgIHVwbG9hZEdQWDogc3RyaW5nW107XG4gIH07XG4gIG1vbml0b3Jpbmc/OiB7XG4gICAgbW9uaXRvcmluZzogc3RyaW5nW107XG4gICAgc2hvd1RyYWNrOiBzdHJpbmdbXTtcbiAgICBzaG93RXhpc3RpbmdUcmFjazogc3RyaW5nW107XG4gICAgc2hvd0FsdGl0dWRlRGlhZ3JhbTogc3RyaW5nW107XG4gICAgc2hvd0RPUDogc3RyaW5nW107XG4gICAgc2hvd1NhdGVsbGl0ZXM6IHN0cmluZ1tdO1xuICAgIHNob3dOTUVBbGl2ZTogc3RyaW5nW107XG4gICAgc2hvd1NwZWVkOiBzdHJpbmdbXTtcbiAgICBzZW5kUG9zaXRpb246IHN0cmluZ1tdO1xuICB9O1xuICBlZGl0aW5nPzoge1xuICAgIGFkZFBPSTogc3RyaW5nW107XG4gICAgZWRpdFBPSTogc3RyaW5nW107XG4gICAgYWRkV2F5OiBzdHJpbmdbXTtcbiAgICBlZGl0R2VvbTogc3RyaW5nW107XG4gICAgZWRpdFRhZ3M6IHN0cmluZ1tdO1xuICAgIGVkaXRSZWxhdGlvbnM6IHN0cmluZ1tdO1xuICAgIHZpZXdOb3Rlczogc3RyaW5nW107XG4gICAgY3JlYXRlTm90ZXM6IHN0cmluZ1tdO1xuICAgIGVkaXROb3Rlczogc3RyaW5nW107XG4gICAgZWRpdFNvdXJjZTogc3RyaW5nW107XG4gICAgb2Zmc2V0REJzdXBwb3J0OiBzdHJpbmdbXTtcbiAgICB1cGxvYWRPU01EYXRhOiBzdHJpbmdbXTtcbiAgfTtcbiAgcmVuZGVyaW5nPzogeyByZW5kZXJlck91dHB1dEZvcm1hdHM6IHN0cmluZ1tdIH07XG4gIGFjY2Vzc2liaWxpdHk/OiB7XG4gICAgYWNjZXNzaWJpbGl0eTogc3RyaW5nW107XG4gICAgdGV4dE9ubHlVSTogc3RyaW5nW107XG4gICAgYnJhaWxsZVVJOiBzdHJpbmdbXTtcbiAgICBleHBsb3Jlck1vZGU6IHN0cmluZ1tdO1xuICAgIHB1YmxpY1RyYW5zcG9ydE1vZGU6IHN0cmluZ1tdO1xuICAgIGRhbmdlcldhcm5pbmdzOiBzdHJpbmdbXTtcbiAgICBzY3JlZW5SZWFkZXI6IHN0cmluZ1tdO1xuICAgIHNjcmVlblJlYWRlckxhbmc6IHN0cmluZ1tdO1xuICB9O1xuICBmaWx0ZXI/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3Qgc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleCA9IC9bLDtdKyg/IVteXFwoXSpcXCkpLztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zT2ZmbGluZUxpbmsodmFsdWU6IHN0cmluZyA9IFwiXCIpIHtcbiAgcmV0dXJuIC88KChzKHRyaWtlKT8pfChkZWwpKT4vZ2kudGVzdCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0TGFuZ3VhZ2VDb2RlRnJvbVRlbXBsYXRlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBtYXRjaCA9IC97eyNsYW5ndWFnZTooW1xcdy1dKykvLmV4ZWModmFsdWUpO1xuXG4gIGlmIChtYXRjaCkgcmV0dXJuIG1hdGNoWzFdO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0TmFtZVdlYnNpdGVXaWtpKFxuICB2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBwYWdlTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4pIHtcbiAgdmFsdWUgPSAodmFsdWUgfHwgXCJcIikucmVwbGFjZSgve3tQQUdFTkFNRX19L2dpLCBwYWdlTmFtZSB8fCBcIlwiKTtcblxuICBjb25zdCBvYmo6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgd2Vic2l0ZT86IHN0cmluZztcbiAgICB3aWtpPzogc3RyaW5nO1xuICB9ID0geyBuYW1lOiB2YWx1ZSB9O1xuXG4gIHtcbiAgICBjb25zdCByZWdleCA9XG4gICAgICAvKFxcWyhodHRwcz86XFwvXFwvKHd3d1xcLik/Wy1hLXpBLVowLTlAOiUuX1xcK34jPV17MSwyNTZ9XFwuW2EtekEtWjAtOSgpXStcXGIoWy1hLXpBLVowLTkoKUA6JV9cXCsufiM/Ji8vPV0qKSlcXF0pL2dpO1xuXG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKHZhbHVlKTtcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgb2JqLndlYnNpdGUgPSBtYXRjaFsyXTtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZWdleCwgXCJcIikudHJpbSgpO1xuICAgICAgaWYgKHZhbHVlKSBvYmoubmFtZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICB7XG4gICAgY29uc3QgcmVnZXggPVxuICAgICAgLyhcXFsoaHR0cHM/OlxcL1xcLyh3d3dcXC4pP1stYS16QS1aMC05QDolLl9cXCt+Iz1dezEsMjU2fVxcLlthLXpBLVowLTkoKV0rXFxiKFstYS16QS1aMC05KClAOiVfXFwrLn4jPyYvLz1dKikpIChbXlxcXV0qKVxcXSkvZ2k7XG5cbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWModmFsdWUpO1xuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBvYmoubmFtZSA9IG1hdGNoWzVdO1xuICAgICAgb2JqLndlYnNpdGUgPSBtYXRjaFsyXTtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZWdleCwgXCJcIik7XG4gICAgfVxuICB9XG4gIHtcbiAgICBjb25zdCByZWdleCA9IC9cXFtcXFsoW15cXF1dKig/IVteXFx8XSkpKFxcfChbXlxcXV0qKSk/XFxdXFxdL2c7XG5cbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWModmFsdWUpO1xuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBpZiAobWF0Y2hbM10pIG9iai5uYW1lID0gbWF0Y2hbM107XG4gICAgICBlbHNlIG9iai5uYW1lID0gbWF0Y2hbMV07XG4gICAgICBvYmoud2lraSA9IHRvV2lraVVybChtYXRjaFsxXSk7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVnZXgsIFwiXCIpO1xuICAgIH1cbiAgfVxuXG4gIHtcbiAgICBjb25zdCByZWdleCA9IC9cXFtcXFsoW15cXF1dKilcXF1cXF0vZztcblxuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyh2YWx1ZSk7XG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIG9iai5uYW1lID0gbWF0Y2hbMV07XG4gICAgICBvYmoud2lraSA9IHRvV2lraVVybChtYXRjaFsxXSk7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVnZXgsIFwiXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0V2Vic2l0ZSh2YWx1ZTogc3RyaW5nID0gXCJcIikge1xuICB7XG4gICAgY29uc3QgcmVnZXggPVxuICAgICAgLyhcXFsoaHR0cHM/OlxcL1xcLyh3d3dcXC4pP1stYS16QS1aMC05QDolLl9cXCt+Iz1dezEsMjU2fVxcLlthLXpBLVowLTkoKV0rXFxiKFstYS16QS1aMC05KClAOiVfXFwrLn4jPyYvLz1dKikpXFxdKS9naTtcblxuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyh2YWx1ZSk7XG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXRjaFsyXTtcbiAgICB9XG4gIH1cbiAge1xuICAgIGNvbnN0IHJlZ2V4ID1cbiAgICAgIC8oXFxbKGh0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsxLDI1Nn1cXC5bYS16QS1aMC05KCldK1xcYihbLWEtekEtWjAtOSgpQDolX1xcKy5+Iz8mLy89XSopKSAoW15cXF1dKilcXF0pL2dpO1xuXG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKHZhbHVlKTtcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgcmV0dXJuIG1hdGNoWzJdO1xuICAgIH1cbiAgfVxuICB7XG4gICAgY29uc3QgcmVnZXggPSAvXFxbXFxbKFteXFxdXSooPyFbXlxcfF0pKShcXHwoW15cXF1dKikpP1xcXVxcXS9nO1xuXG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKHZhbHVlKTtcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgcmV0dXJuIHRvV2lraVVybChtYXRjaFsxXSk7XG4gICAgfVxuICB9XG4gIHtcbiAgICBjb25zdCByZWdleCA9XG4gICAgICAve3tVUkxcXHwoaHR0cHM/OlxcL1xcLyh3d3dcXC4pP1stYS16QS1aMC05QDolLl9cXCt+Iz1dezEsMjU2fVxcLlthLXpBLVowLTkoKV0rXFxiKFstYS16QS1aMC05KClAOiVfXFwrLn4jPyYvLz1dKikpfX0vZ2k7XG5cbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWModmFsdWUpO1xuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hbMV07XG4gICAgfVxuICB9XG4gIHtcbiAgICBjb25zdCByZWdleCA9XG4gICAgICAvKGh0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsxLDI1Nn1cXC5bYS16QS1aMC05KCldK1xcYihbLWEtekEtWjAtOSgpQDolX1xcKy5+Iz8mLy89XSopKS9naTtcblxuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyh2YWx1ZSk7XG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXRjaFsxXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFJlcG8odmFsdWU6IHN0cmluZyA9IFwiXCIpIHtcbiAgY29uc3QgcmVnZXggPVxuICAgIC97e0dpdEh1YltfIF1saW5rXFx8KCgoPzpbXFwtOzomPVxcK1xcJCxcXHddK0ApP1tBLVphLXowLTlcXC5cXC1dK3woPzp3d3dcXC58W1xcLTs6Jj1cXCtcXCQsXFx3XStAKVtBLVphLXowLTlcXC5cXC1dKykoKD86XFwvW1xcK34lXFwvXFwuXFx3XFwtX10qKT9cXD8/KD86W1xcLVxcKz0mOyVAXFwuXFx3X10qKSM/KD86W1xcLlxcIVxcL1xcXFxcXHddKikpPykoXFx8KFteKH19KV0rKSk/fX0vZztcblxuICByZXR1cm4gdmFsdWUucmVwbGFjZShyZWdleCwgYGh0dHBzOi8vZ2l0aHViLmNvbS8kMWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc1dpa2lUZXh0KHRleHQ6IHN0cmluZyA9IFwiXCIpIHtcbiAgLy8gY2xlYW4gdXAgPHJlZj5cbiAge1xuICAgIGNvbnN0IHJlZ2V4ID0gLzxyZWY+KFtePF0qKTxcXC9yZWY+L2c7XG5cbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlZ2V4LCBgYCk7XG4gIH1cblxuICAvLyBXaWtpcGVkaWFcbiAge1xuICAgIGNvbnN0IHJlZ2V4ID0gL1xcW1xcWzp3aWtpcGVkaWE6KFteXFxdXSooPyFbXlxcfF0pKShcXHwoW15cXF1dKikpP1xcXVxcXS9nO1xuXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShcbiAgICAgIHJlZ2V4LFxuICAgICAgYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS8kMVwiPiQzPC9hPmBcbiAgICApO1xuICB9XG4gIHtcbiAgICBjb25zdCByZWdleCA9IC9cXFtcXFs6d2lraXBlZGlhOihbXlxcXV0qKVxcXVxcXS9nO1xuXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShcbiAgICAgIHJlZ2V4LFxuICAgICAgYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS8kMVwiPiQxPC9hPmBcbiAgICApO1xuICB9XG4gIC8vIFVybFxuICB7XG4gICAgY29uc3QgcmVnZXggPSAvXFxbXFxbKFteXFxdXSooPyFbXlxcfF0pKShcXHwoW15cXF1dKikpP1xcXVxcXS87XG5cbiAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKHRleHQpO1xuICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShcbiAgICAgICAgcmVnZXgsXG4gICAgICAgIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHt0b1dpa2lVcmwobWF0Y2hbMV0pfVwiPiR7bWF0Y2hbM119PC9hPmBcbiAgICAgICk7XG5cbiAgICAgIG1hdGNoID0gcmVnZXguZXhlYyh0ZXh0KTtcbiAgICB9XG4gIH1cbiAge1xuICAgIGNvbnN0IHJlZ2V4ID0gL1xcW1xcWyhbXlxcXV0qKVxcXVxcXS87XG5cbiAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKHRleHQpO1xuICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShcbiAgICAgICAgcmVnZXgsXG4gICAgICAgIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHt0b1dpa2lVcmwobWF0Y2hbMV0pfVwiPiR7bWF0Y2hbMV19PC9hPmBcbiAgICAgICk7XG5cbiAgICAgIG1hdGNoID0gcmVnZXguZXhlYyh0ZXh0KTtcbiAgICB9XG4gIH1cblxuICB7XG4gICAgY29uc3QgcmVnZXggPVxuICAgICAgLyhcXFsoaHR0cHM/OlxcL1xcLyh3d3dcXC4pP1stYS16QS1aMC05QDolLl9cXCt+Iz1dezEsMjU2fVxcLlthLXpBLVowLTkoKV0rXFxiKFstYS16QS1aMC05KClAOiVfXFwrLn4jPyYvLz1dKikpXFxdKS9naTtcblxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVnZXgsIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJDJcIj4kMjwvYT5gKTtcbiAgfVxuICB7XG4gICAgY29uc3QgcmVnZXggPVxuICAgICAgLyhcXFsoaHR0cHM/OlxcL1xcLyh3d3dcXC4pP1stYS16QS1aMC05QDolLl9cXCt+Iz1dezEsMjU2fVxcLlthLXpBLVowLTkoKV0rXFxiKFstYS16QS1aMC05KClAOiVfXFwrLn4jPyYvLz1dKikpIChbXlxcXV0qKVxcXSkvZ2k7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShyZWdleCwgYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIkMlwiPiQ1PC9hPmApO1xuICB9XG5cbiAge1xuICAgIGNvbnN0IHJlZ2V4ID0gL3t7KEtleXxUYWd8VGFnS2V5KVxcfChbXn18XSopKFxcfChbXn18XSopKT99fS9naTtcblxuICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWModGV4dCk7XG4gICAgd2hpbGUgKG1hdGNoKSB7XG4gICAgICBpZiAoIW1hdGNoWzRdKSB7XG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoXG4gICAgICAgICAgcmVnZXgsXG4gICAgICAgICAgYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvd2lraS9LZXk6JDJcIj4kMjwvYT49KmBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoXG4gICAgICAgICAgcmVnZXgsXG4gICAgICAgICAgYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvd2lraS9LZXk6JDJcIj4kMjwvYT49PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd2lraS5vcGVuc3RyZWV0bWFwLm9yZy93aWtpL1RhZzokMj0kNFwiPiQ0PC9hPmBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSByZWdleC5leGVjKHRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZvcm1hdFxuICB7XG4gICAgY29uc3QgcmVnZXggPSAvJycnKFteKCcnJyldKiknJycvZztcblxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVnZXgsIGA8c3Ryb25nPiQxPC9zdHJvbmc+YCk7XG4gIH1cblxuICAvLyBHaXRIdWJcbiAge1xuICAgIGNvbnN0IHJlZ2V4ID1cbiAgICAgIC97e0dpdEh1YltfIF1saW5rXFx8KCgoPzpbXFwtOzomPVxcK1xcJCxcXHddK0ApP1tBLVphLXowLTlcXC5cXC1dK3woPzp3d3dcXC58W1xcLTs6Jj1cXCtcXCQsXFx3XStAKVtBLVphLXowLTlcXC5cXC1dKykoKD86XFwvW1xcK34lXFwvXFwuXFx3XFwtX10qKT9cXD8/KD86W1xcLVxcKz0mOyVAXFwuXFx3X10qKSM/KD86W1xcLlxcIVxcL1xcXFxcXHddKikpPyl9fS9nO1xuXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShcbiAgICAgIHJlZ2V4LFxuICAgICAgYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vJDFcIj4kMTwvYT5gXG4gICAgKTtcbiAgfVxuICB7XG4gICAgY29uc3QgcmVnZXggPVxuICAgICAgL3t7R2l0SHViW18gXWxpbmtcXHwoKCg/OltcXC07OiY9XFwrXFwkLFxcd10rQCk/W0EtWmEtejAtOVxcLlxcLV0rfCg/Ond3d1xcLnxbXFwtOzomPVxcK1xcJCxcXHddK0ApW0EtWmEtejAtOVxcLlxcLV0rKSgoPzpcXC9bXFwrfiVcXC9cXC5cXHdcXC1fXSopP1xcPz8oPzpbXFwtXFwrPSY7JUBcXC5cXHdfXSopIz8oPzpbXFwuXFwhXFwvXFxcXFxcd10qKSk/KShcXHwoW14ofX0pXSspKT99fS9nO1xuXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShcbiAgICAgIHJlZ2V4LFxuICAgICAgYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vJDFcIj4kNTwvYT5gXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB0ZXh0O1xufVxuIiwiLy8gQ29weXJpZ2h0IChDKSAyMDIwIE1hcmt1cyBQZWxvc29cbi8vXG4vLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBPU00gQXBwcyBDYXRhbG9nLlxuLy9cbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbi8vIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuLy8gTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vL1xuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIE9TTSBBcHBzIENhdGFsb2cuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGdldEh0bWxFbGVtZW50IH0gZnJvbSBcIi4vdWkvdXRpbGl0aWVzL2h0bWxcIjtcbmltcG9ydCBTbGltU2VsZWN0IGZyb20gXCJzbGltLXNlbGVjdFwiO1xuaW1wb3J0IHsgbGF6eUxvYWRJbWFnZXMgfSBmcm9tIFwiLi91aS9sYXp5TG9hZEltYWdlc1wiO1xuaW1wb3J0IHsgc2V0LCBnZXQgfSBmcm9tIFwiLi91aS91dGlsaXRpZXMvc3RvcmFnZVwiO1xuaW1wb3J0IHsgcmVuZGVyIGFzIHJlbmRlckxpc3RWaWV3IH0gZnJvbSBcIi4vdWkvdmlld3MvbGlzdFwiO1xuaW1wb3J0IHsgc2h1ZmZsZSwgaW5jbHVkZXMsIHNvbWUgfSBmcm9tIFwiLi91aS91dGlsaXRpZXMvYXJyYXlcIjtcbmltcG9ydCB7IGVxdWFsc0lnbm9yZUNhc2UsIHRleHRUb0NvbG9yIH0gZnJvbSBcIi4vdWkvdXRpbGl0aWVzL3N0cmluZ1wiO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vZGF0YS90ZW1wbGF0ZS91dGlsaXRpZXNcIjtcbmltcG9ydCB7XG4gIGZpbmRHZXRQYXJhbWV0ZXJGcm9tSGFzaCxcbiAgZmluZEdldFBhcmFtZXRlciBhcyBnZXRQYXJhbWV0ZXJGcm9tVXJsLFxufSBmcm9tIFwiLi91aS91dGlsaXRpZXMvdXJsXCI7XG5pbXBvcnQgeyBTb2x2ZXIgfSBmcm9tIFwiLi91aS91dGlsaXRpZXMvY29sb3Jpei9Tb2x2ZXJcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vdWkvdXRpbGl0aWVzL2NvbG9yaXovQ29sb3JcIjtcbmltcG9ydCB7IGVkaXQsIG1vYmlsZSwgbmF2aWdhdGlvbiB9IGZyb20gXCIuL3VpL3V0aWxpdGllcy9maWx0ZXJcIjtcbmltcG9ydCB7IHJlbmRlciBhcyByZW5kZXJDb21wYXJlVmlldyB9IGZyb20gXCIuL3VpL3ZpZXdzL2NvbXBhcmVcIjtcbmltcG9ydCB7IGxvYWRBcHBzIH0gZnJvbSBcIi4vZGF0YS9sb2FkQXBwc1wiO1xuaW1wb3J0IHsgbGF6eUluaXRNb3JlIH0gZnJvbSBcIi4vdWkvbGF6eUluaXRNb3JlXCI7XG5cbmxldCBvblVwZGF0ZSA9IGZhbHNlO1xuZXhwb3J0IGxldCBhcHBzOiBBcHBbXSA9IFtdO1xuXG5jb25zdCB0b3BpY1NlbGVjdCA9IG5ldyBTbGltU2VsZWN0KHtcbiAgc2VsZWN0OiBcIiN0b3BpY1wiLFxuICBwbGFjZWhvbGRlcjogXCJUb3BpY1wiLFxuXG4gIG9uQ2hhbmdlOiAoKSA9PiB7XG4gICAgZG9VcGRhdGUoYXBwcyk7XG4gIH0sXG59KTtcbmNvbnN0IHBsYXRmb3JtU2VsZWN0ID0gbmV3IFNsaW1TZWxlY3Qoe1xuICBzZWxlY3Q6IFwiI3BsYXRmb3JtXCIsXG4gIHBsYWNlaG9sZGVyOiBcIlBsYXRmb3JtXCIsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7XG4gICAgZG9VcGRhdGUoYXBwcyk7XG4gIH0sXG59KTtcbmNvbnN0IGxhbmd1YWdlU2VsZWN0ID0gbmV3IFNsaW1TZWxlY3Qoe1xuICBzZWxlY3Q6IFwiI2xhbmd1YWdlXCIsXG4gIHBsYWNlaG9sZGVyOiBcIkxhbmd1YWdlXCIsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7XG4gICAgZG9VcGRhdGUoYXBwcyk7XG4gIH0sXG59KTtcbmNvbnN0IGNvdmVyYWdlU2VsZWN0ID0gbmV3IFNsaW1TZWxlY3Qoe1xuICBzZWxlY3Q6IFwiI2NvdmVyYWdlXCIsXG4gIHBsYWNlaG9sZGVyOiBcIkNvdmVyYWdlXCIsXG5cbiAgb25DaGFuZ2U6ICgpID0+IHtcbiAgICBkb1VwZGF0ZShhcHBzKTtcbiAgfSxcbn0pO1xuKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJlZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKFxuICBcImNoYW5nZVwiLFxuICAoKSA9PiB7XG4gICAgZG9VcGRhdGUoYXBwcyk7XG4gIH1cbik7XG5cbihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKFxuICBcImlucHV0XCIsXG4gICgpID0+IHtcbiAgICBkb1VwZGF0ZShhcHBzKTtcbiAgfVxuKTtcblxuKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFZpZXdcIikgYXMgSFRNTElucHV0RWxlbWVudCkuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJpbnB1dFwiLFxuICAoKSA9PiB7XG4gICAgZG9VcGRhdGUoYXBwcyk7XG4gIH1cbik7XG4oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wYXJlVmlld1wiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKFxuICBcImlucHV0XCIsXG4gICgpID0+IHtcbiAgICBkb1VwZGF0ZShhcHBzKTtcbiAgfVxuKTtcblxuY29uc3QgY2F0ZWdvcnkgPSBmaW5kR2V0UGFyYW1ldGVyRnJvbUhhc2goXCJjYXRlZ29yeVwiKTtcblxuY29uc3QgY2F0ZWdvcnlTZWxlY3QgPSBuZXcgU2xpbVNlbGVjdCh7XG4gIHNlbGVjdDogXCIjY2F0ZWdvcnlcIixcbiAgc2hvd1NlYXJjaDogZmFsc2UsXG4gIHBsYWNlaG9sZGVyOiBcIkNhdGVnb3J5XCIsXG4gIGRhdGE6IFtcbiAgICB7XG4gICAgICB2YWx1ZTogXCJhbGxcIixcbiAgICAgIGlubmVySFRNTDpcbiAgICAgICAgXCI8aSBjbGFzcz0nZmFzIGZhLWxheWVyLWdyb3VwJyBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlO3JpZ2h0OiAyOHB4Oyc+PC9pPiBBbGxcIixcbiAgICAgIHRleHQ6IFwiQWxsXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB2YWx1ZTogXCJmb2N1c1wiLFxuICAgICAgaW5uZXJIVE1MOlxuICAgICAgICBcIjxpIGNsYXNzPSdmYXIgZmEtZXllJyBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlO3JpZ2h0OiAyN3B4Oyc+PC9pPiBGb2N1c1wiLFxuICAgICAgdGV4dDogXCJGb2N1c1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgdmFsdWU6IFwibGF0ZXN0XCIsXG4gICAgICBpbm5lckhUTUw6XG4gICAgICAgIFwiPGkgY2xhc3M9J2ZhciBmYS1jbG9jaycgc3R5bGU9J3Bvc2l0aW9uOiBhYnNvbHV0ZTtyaWdodDogMjhweDsnPjwvaT4gTGF0ZXN0XCIsXG4gICAgICB0ZXh0OiBcIkxhdGVzdFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdmFsdWU6IFwibW9iaWxlXCIsXG4gICAgICBpbm5lckhUTUw6XG4gICAgICAgIFwiPGkgY2xhc3M9J2ZhcyBmYS1tb2JpbGUtYWx0JyBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlO3JpZ2h0OiAzMXB4Oyc+PC9pPiBUbyBnb1wiLFxuICAgICAgdGV4dDogXCJUbyBnb1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgdmFsdWU6IFwibmF2aWdhdGlvblwiLFxuICAgICAgaW5uZXJIVE1MOlxuICAgICAgICBcIjxpIGNsYXNzPSdmYXIgZmEtY29tcGFzcycgc3R5bGU9J3Bvc2l0aW9uOiBhYnNvbHV0ZTtyaWdodDogMjhweDsnPjwvaT4gRmluZCB5b3VyIHdheVwiLFxuICAgICAgdGV4dDogXCJGaW5kIHlvdXIgd2F5XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB2YWx1ZTogXCJlZGl0XCIsXG4gICAgICBpbm5lckhUTUw6XG4gICAgICAgIFwiPGkgY2xhc3M9J2ZhcyBmYS1lZGl0JyBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlO3JpZ2h0OiAyNnB4Oyc+PC9pPiBDb250cmlidXRlXCIsXG4gICAgICB0ZXh0OiBcIkNvbnRyaWJ1dGVcIixcbiAgICB9LFxuICBdLm1hcCgoYykgPT4ge1xuICAgIHJldHVybiB7IC4uLmMsIHNlbGVjdGVkOiBjLnZhbHVlID09PSBjYXRlZ29yeSB9O1xuICB9KSxcbiAgb25DaGFuZ2U6ICgpID0+IHtcbiAgICBkb1VwZGF0ZShhcHBzLCB0cnVlKTtcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBkb1VwZGF0ZShcbiAgbmV3QXBwczogQXBwW10sXG4gIHN0YXRlPzoge1xuICAgIGNhdGVnb3J5OiBzdHJpbmdbXTtcbiAgICBmcmVlOiBib29sZWFuO1xuICAgIHNlYXJjaDogc3RyaW5nO1xuICAgIHRvcGljczogc3RyaW5nW107XG4gICAgcGxhdGZvcm1zOiBzdHJpbmdbXTtcbiAgICBsYW5ndWFnZXM6IHN0cmluZ1tdO1xuICAgIGNvdmVyYWdlOiBzdHJpbmdbXTtcbiAgICB2aWV3OiBcImxpc3RcIiB8IFwiY29tcGFyZVwiO1xuICB9LFxuICByZXNldD86IGJvb2xlYW5cbikge1xuICBhcHBzID0gbmV3QXBwcztcbiAgaWYgKCFvblVwZGF0ZSkge1xuICAgIG9uVXBkYXRlID0gdHJ1ZTtcbiAgICBpZiAocmVzZXQpIHtcbiAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XG4gICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmVlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIHRvcGljU2VsZWN0LnNldChbXSk7XG4gICAgICBwbGF0Zm9ybVNlbGVjdC5zZXQoW10pO1xuICAgICAgbGFuZ3VhZ2VTZWxlY3Quc2V0KFtdKTtcbiAgICAgIGNvdmVyYWdlU2VsZWN0LnNldChbXSk7XG4gICAgfVxuICAgIHVwZGF0ZShcbiAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyZWVcIikgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCxcbiAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSxcbiAgICAgIHRvcGljU2VsZWN0LnNlbGVjdGVkKCksXG4gICAgICBwbGF0Zm9ybVNlbGVjdC5zZWxlY3RlZCgpLFxuICAgICAgbGFuZ3VhZ2VTZWxlY3Quc2VsZWN0ZWQoKSxcbiAgICAgIGNvdmVyYWdlU2VsZWN0LnNlbGVjdGVkKCksXG4gICAgICBjYXRlZ29yeVNlbGVjdC5zZWxlY3RlZCgpXG4gICAgKTtcbiAgICBvblVwZGF0ZSA9IGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZShcbiAgZnJlZU9ubHk6IGJvb2xlYW4gPSBmYWxzZSxcbiAgc2VhcmNoOiBzdHJpbmcgPSBcIlwiLFxuICB0b3BpYzogc3RyaW5nW10gPSBbXSxcbiAgcGxhdGZvcm06IHN0cmluZ1tdID0gW10sXG4gIGxhbmd1YWdlOiBzdHJpbmdbXSA9IFtdLFxuICBjb3ZlcmFnZTogc3RyaW5nW10gPSBbXSxcbiAgY2F0ZWdvcnk6IFwiYWxsXCIgfCBcImZvY3VzXCIgfCBcImxhdGVzdFwiIHwgXCJtb2JpbGVcIiB8IFwibmF2aWdhdGlvblwiIHwgXCJlZGl0XCJcbikge1xuICAvLyBpZiAoY2F0ZWdvcnkgPT09IFwiYWxsXCIpIHtcbiAgLy8gICBkb2N1bWVudC5sb2NhdGlvbi5oYXNoID0gXCJcIjtcbiAgLy8gfSBlbHNlIHtcbiAgLy8gICBkb2N1bWVudC5sb2NhdGlvbi5oYXNoID0gY2F0ZWdvcnk7XG4gIC8vIH1cblxuICBsZXQgZGVzY3JpcHRpb24gPSBcIlwiO1xuICBpZiAoY2F0ZWdvcnkgPT09IFwiYWxsXCIpIHtcbiAgICBkZXNjcmlwdGlvbiA9XG4gICAgICBcIlNob3dzIGFsbCBhcHBzIGZvdW5kIG9uIHRoZSBPcGVuU3RyZWV0TWFwIHdpa2kgYW5kIHRhZ2luZm8gaW4gcmFuZG9tIG9yZGVyLlwiO1xuICB9IGVsc2UgaWYgKGNhdGVnb3J5ID09PSBcImZvY3VzXCIpIHtcbiAgICBkZXNjcmlwdGlvbiA9IFwiU2hvd3MgdGVuIGFwcHMgZnJvbSB0aGUgbW9zdCByZWNlbnRseSB1cGRhdGVkIHBhZ2VzLlwiO1xuICB9IGVsc2UgaWYgKGNhdGVnb3J5ID09PSBcImxhdGVzdFwiKSB7XG4gICAgZGVzY3JpcHRpb24gPSBcIlNob3dzIGFsbCBhcHBzIG9yZGVyZWQgYnkgbGFzdCByZWxlYXNlIGRhdGUuXCI7XG4gIH0gZWxzZSBpZiAoY2F0ZWdvcnkgPT09IFwibW9iaWxlXCIpIHtcbiAgICBkZXNjcmlwdGlvbiA9XG4gICAgICBcIlNob3dzIGFwcHMgZGV2ZWxvcGVkIGZvciBtb2JpbGUgZGV2aWNlcyBvciB0aGF0IHN1cHBvcnQgb2ZmbGluZSB1c2UuXCI7XG4gIH0gZWxzZSBpZiAoY2F0ZWdvcnkgPT09IFwibmF2aWdhdGlvblwiKSB7XG4gICAgZGVzY3JpcHRpb24gPSBcIlNob3dzIGFwcHMgdGhhdCBzdXBwb3J0IHJvdXRpbmcgb3IgbmF2aWdhdGlvbi5cIjtcbiAgfSBlbHNlIGlmIChjYXRlZ29yeSA9PT0gXCJlZGl0XCIpIHtcbiAgICBkZXNjcmlwdGlvbiA9XG4gICAgICBcIlNob3dzIGFwcHMgdGhhdCBzdXBwb3J0IGFkZGluZywgZWRpdGluZyBvciBhbmFseXNpbmcgT3BlblN0cmVldE1hcCBkYXRhIG9yIHJlY29yZGluZyBnZW90cmFja3MuXCI7XG4gIH1cbiAgZ2V0SHRtbEVsZW1lbnQoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gZGVzY3JpcHRpb247XG5cbiAgZ2V0SHRtbEVsZW1lbnQoXCIjbGlzdFwiKS5pbm5lckhUTUwgPSBcIlwiO1xuICBnZXRIdG1sRWxlbWVudChcIiNjb21wYXJlXCIpLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgbGV0IGZpbHRlcmVkQXBwczogQXBwW10gPSBhcHBzLnNsaWNlKCk7XG5cbiAgaWYgKGZyZWVPbmx5KSB7XG4gICAgZmlsdGVyZWRBcHBzID0gZmlsdGVyZWRBcHBzLmZpbHRlcigoYSkgPT4gYS5ncmF0aXMgfHwgYS5saWJyZSk7XG4gIH1cblxuICBpZiAoY2F0ZWdvcnkgPT09IFwibGF0ZXN0XCIpIHtcbiAgICBmaWx0ZXJlZEFwcHMgPSBmaWx0ZXJlZEFwcHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgY29uc3QgbmFtZUEgPSBhLnNvdXJjZVswXS5sYXN0Q2hhbmdlLnRvVXBwZXJDYXNlKCkgfHwgXCJcIjtcbiAgICAgIGNvbnN0IG5hbWVCID0gYi5zb3VyY2VbMF0ubGFzdENoYW5nZS50b1VwcGVyQ2FzZSgpIHx8IFwiXCI7XG4gICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGlmIChuYW1lQSA+IG5hbWVCKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG5cbiAgICBmaWx0ZXJlZEFwcHMgPSBmaWx0ZXJlZEFwcHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgY29uc3QgbmFtZUEgPSBhLmxhc3RSZWxlYXNlPy50b1VwcGVyQ2FzZSgpIHx8IFwiXCI7XG4gICAgICBjb25zdCBuYW1lQiA9IGIubGFzdFJlbGVhc2U/LnRvVXBwZXJDYXNlKCkgfHwgXCJcIjtcbiAgICAgIGlmIChuYW1lQSA8IG5hbWVCKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgaWYgKG5hbWVBID4gbmFtZUIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChjYXRlZ29yeSA9PT0gXCJmb2N1c1wiKSB7XG4gICAgbGV0IGxhdGVzdEFwcHMgPSBmaWx0ZXJlZEFwcHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgY29uc3QgbmFtZUEgPSBhLnNvdXJjZVswXS5sYXN0Q2hhbmdlLnRvVXBwZXJDYXNlKCkgfHwgXCJcIjtcbiAgICAgIGNvbnN0IG5hbWVCID0gYi5zb3VyY2VbMF0ubGFzdENoYW5nZS50b1VwcGVyQ2FzZSgpIHx8IFwiXCI7XG4gICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGlmIChuYW1lQSA+IG5hbWVCKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG5cbiAgICBmaWx0ZXJlZEFwcHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGFwcCBvZiBsYXRlc3RBcHBzKSB7XG4gICAgICBpZiAoZmlsdGVyZWRBcHBzLmxlbmd0aCA8IDEwKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhZmlsdGVyZWRBcHBzLnNvbWUoKGEpID0+XG4gICAgICAgICAgICBlcXVhbHNJZ25vcmVDYXNlKGEuc291cmNlWzBdLnVybCwgYXBwLnNvdXJjZVswXS51cmwpXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBmaWx0ZXJlZEFwcHMucHVzaChhcHApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZWFyY2ggPSBzZWFyY2gudG9VcHBlckNhc2UoKTtcbiAgY29uc3QgdG9waWNVcCA9IHRvcGljLm1hcCgodCkgPT4gdC50b1VwcGVyQ2FzZSgpKTtcbiAgY29uc3QgcGxhdGZvcm1VcCA9IHBsYXRmb3JtLm1hcCgodCkgPT4gdC50b1VwcGVyQ2FzZSgpKTtcbiAgY29uc3QgbGFuZ3VhZ2VVcCA9IGxhbmd1YWdlLm1hcCgodCkgPT4gdC50b1VwcGVyQ2FzZSgpKTtcbiAgY29uc3QgY292ZXJhZ2VVcDogc3RyaW5nW10gPSBbXTtcbiAgY292ZXJhZ2UuZm9yRWFjaCgodCkgPT4ge1xuICAgIGNvbnN0IHJlZ2lvbnMgPSB0LnRvVXBwZXJDYXNlKCkuc3BsaXQoXCIsIFwiKTtcbiAgICBsZXQgZW50cnkgPSBbXTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmVnaW9ucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGVudHJ5LnB1c2gocmVnaW9uc1tpbmRleF0pO1xuICAgICAgY292ZXJhZ2VVcC5wdXNoKGVudHJ5LmpvaW4oXCIsIFwiKSk7XG4gICAgfVxuICB9KTtcblxuICBpZiAoc2VhcmNoKVxuICAgIGZpbHRlcmVkQXBwcyA9IGZpbHRlcmVkQXBwcy5maWx0ZXIoXG4gICAgICAoYSkgPT5cbiAgICAgICAgYS5uYW1lLnRvVXBwZXJDYXNlKCkuc2VhcmNoKHNlYXJjaCkgIT09IC0xIHx8XG4gICAgICAgIGEuZGVzY3JpcHRpb24udG9VcHBlckNhc2UoKS5zZWFyY2goc2VhcmNoKSAhPT0gLTEgfHxcbiAgICAgICAgYS50b3BpY3MuZmlsdGVyKCh0KSA9PiB0LnRvVXBwZXJDYXNlKCkuc2VhcmNoKHNlYXJjaCkgIT09IC0xKS5sZW5ndGggPlxuICAgICAgICAgIDAgfHxcbiAgICAgICAgYS5wbGF0Zm9ybS5maWx0ZXIoKHQpID0+IHQudG9VcHBlckNhc2UoKS5zZWFyY2goc2VhcmNoKSAhPT0gLTEpLmxlbmd0aCA+XG4gICAgICAgICAgMCB8fFxuICAgICAgICBhLmNvdmVyYWdlLmZpbHRlcigodCkgPT4gdC50b1VwcGVyQ2FzZSgpLnNlYXJjaChzZWFyY2gpICE9PSAtMSkubGVuZ3RoID5cbiAgICAgICAgICAwXG4gICAgKTtcblxuICBpZiAodG9waWNVcC5sZW5ndGggPiAwKVxuICAgIGZpbHRlcmVkQXBwcyA9IGZpbHRlcmVkQXBwcy5maWx0ZXIoKGEpID0+XG4gICAgICBpbmNsdWRlcyhcbiAgICAgICAgYS50b3BpY3MubWFwKCh0KSA9PiB0LnRvVXBwZXJDYXNlKCkpLFxuICAgICAgICB0b3BpY1VwXG4gICAgICApXG4gICAgKTtcblxuICBpZiAocGxhdGZvcm1VcC5sZW5ndGggPiAwKVxuICAgIGZpbHRlcmVkQXBwcyA9IGZpbHRlcmVkQXBwcy5maWx0ZXIoKGEpID0+XG4gICAgICBpbmNsdWRlcyhcbiAgICAgICAgYS5wbGF0Zm9ybS5tYXAoKHQpID0+IHQudG9VcHBlckNhc2UoKSksXG4gICAgICAgIHBsYXRmb3JtVXBcbiAgICAgIClcbiAgICApO1xuXG4gIGlmIChsYW5ndWFnZVVwLmxlbmd0aCA+IDApXG4gICAgZmlsdGVyZWRBcHBzID0gZmlsdGVyZWRBcHBzLmZpbHRlcigoYSkgPT5cbiAgICAgIHNvbWUoXG4gICAgICAgIGEubGFuZ3VhZ2VzLm1hcCgodCkgPT4gdC50b1VwcGVyQ2FzZSgpKSxcbiAgICAgICAgbGFuZ3VhZ2VVcFxuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKGNvdmVyYWdlVXAubGVuZ3RoID4gMCkge1xuICAgIGZpbHRlcmVkQXBwcyA9IGZpbHRlcmVkQXBwcy5maWx0ZXIoKGEpID0+XG4gICAgICBzb21lKFxuICAgICAgICBhLmNvdmVyYWdlLm1hcCgodCkgPT4gdC50b1VwcGVyQ2FzZSgpKSxcbiAgICAgICAgY292ZXJhZ2VVcFxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBjb25zdCBjYXRlZ29yaWVkQXBwcyA9IFtdO1xuXG4gIGlmIChjYXRlZ29yeSA9PT0gXCJtb2JpbGVcIikge1xuICAgIGNhdGVnb3JpZWRBcHBzLnB1c2goLi4uZmlsdGVyZWRBcHBzLmZpbHRlcihtb2JpbGUpKTtcblxuICAgIGZpbHRlcmVkQXBwcyA9IGNhdGVnb3JpZWRBcHBzO1xuICB9IGVsc2UgaWYgKGNhdGVnb3J5ID09PSBcIm5hdmlnYXRpb25cIikge1xuICAgIGNhdGVnb3JpZWRBcHBzLnB1c2goLi4uZmlsdGVyZWRBcHBzLmZpbHRlcihuYXZpZ2F0aW9uKSk7XG5cbiAgICBmaWx0ZXJlZEFwcHMgPSBjYXRlZ29yaWVkQXBwcztcbiAgfSBlbHNlIGlmIChjYXRlZ29yeSA9PT0gXCJlZGl0XCIpIHtcbiAgICBjYXRlZ29yaWVkQXBwcy5wdXNoKC4uLmZpbHRlcmVkQXBwcy5maWx0ZXIoZWRpdCkpO1xuXG4gICAgZmlsdGVyZWRBcHBzID0gY2F0ZWdvcmllZEFwcHM7XG4gIH1cblxuICBjb25zdCB0b3BpY0RhdGE6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHBsYXRmb3JtRGF0YTogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgbGFuZ3VhZ2VEYXRhOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBjb3ZlcmFnZURhdGE6IHN0cmluZ1tdID0gW107XG5cbiAgZm9yIChjb25zdCBhIG9mIGZpbHRlcmVkQXBwcykge1xuICAgIHRvcGljRGF0YS5wdXNoKC4uLmEudG9waWNzLm1hcCgodCkgPT4gdCkpO1xuICAgIHBsYXRmb3JtRGF0YS5wdXNoKC4uLmEucGxhdGZvcm0ubWFwKCh0KSA9PiB0KSk7XG4gICAgY292ZXJhZ2VEYXRhLnB1c2goLi4uYS5jb3ZlcmFnZS5tYXAoKHQpID0+IHQpKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgYSBvZiBhcHBzKSB7XG4gICAgbGFuZ3VhZ2VEYXRhLnB1c2goLi4uYS5sYW5ndWFnZXMubWFwKChsKSA9PiBsKSk7XG4gIH1cblxuICB0b3BpY1NlbGVjdC5zZXREYXRhKHByZXBhcmVBcnJheUZvclNlbGVjdCh0b3BpY0RhdGEsIHRvcGljKSk7XG4gIHRvcGljU2VsZWN0LnNldCh0b3BpYyk7XG5cbiAgcGxhdGZvcm1TZWxlY3Quc2V0RGF0YShwcmVwYXJlQXJyYXlGb3JTZWxlY3QocGxhdGZvcm1EYXRhLCBwbGF0Zm9ybSkpO1xuICBwbGF0Zm9ybVNlbGVjdC5zZXQocGxhdGZvcm0pO1xuXG4gIGxhbmd1YWdlU2VsZWN0LnNldERhdGEocHJlcGFyZUFycmF5Rm9yU2VsZWN0KGxhbmd1YWdlRGF0YSwgbGFuZ3VhZ2UpKTtcbiAgbGFuZ3VhZ2VTZWxlY3Quc2V0KGxhbmd1YWdlKTtcblxuICBjb3ZlcmFnZVNlbGVjdC5zZXREYXRhKHByZXBhcmVBcnJheUZvclNlbGVjdChjb3ZlcmFnZURhdGEsIGNvdmVyYWdlKSk7XG4gIGNvdmVyYWdlU2VsZWN0LnNldChjb3ZlcmFnZSk7XG5cbiAgaWYgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXBhcmVWaWV3XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpIHtcbiAgICByZW5kZXJDb21wYXJlVmlldyhmaWx0ZXJlZEFwcHMsIGxhbmcpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbGF6eUluaXRNb3JlKHRydWUpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgaWYgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RWaWV3XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpIHtcbiAgICBmb3IgKGNvbnN0IGEgb2YgZmlsdGVyZWRBcHBzKSB7XG4gICAgICByZW5kZXJMaXN0VmlldyhhKTtcbiAgICB9XG5cbiAgICBpZiAodG9waWNVcC5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgc2ltaWxhckFwcHMgPSBhcHBzLmZpbHRlcigoYSkgPT4gIWZpbHRlcmVkQXBwcy5pbmNsdWRlcyhhKSk7XG5cbiAgICAgIHNpbWlsYXJBcHBzID0gc2ltaWxhckFwcHMuZmlsdGVyKChhKSA9PlxuICAgICAgICB0b3BpY1VwLmV2ZXJ5KFxuICAgICAgICAgICh0KSA9PlxuICAgICAgICAgICAgYS5uYW1lLnRvVXBwZXJDYXNlKCkuc2VhcmNoKHQpICE9PSAtMSB8fFxuICAgICAgICAgICAgYS5kZXNjcmlwdGlvbi50b1VwcGVyQ2FzZSgpLnNlYXJjaCh0KSAhPT0gLTFcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgaWYgKHNlYXJjaClcbiAgICAgICAgc2ltaWxhckFwcHMgPSBzaW1pbGFyQXBwcy5maWx0ZXIoXG4gICAgICAgICAgKGEpID0+XG4gICAgICAgICAgICBhLm5hbWUudG9VcHBlckNhc2UoKS5zZWFyY2goc2VhcmNoKSAhPT0gLTEgfHxcbiAgICAgICAgICAgIGEuZGVzY3JpcHRpb24udG9VcHBlckNhc2UoKS5zZWFyY2goc2VhcmNoKSAhPT0gLTEgfHxcbiAgICAgICAgICAgIGEudG9waWNzLmZpbHRlcigodCkgPT4gdC50b1VwcGVyQ2FzZSgpLnNlYXJjaChzZWFyY2gpICE9PSAtMSlcbiAgICAgICAgICAgICAgLmxlbmd0aCA+IDAgfHxcbiAgICAgICAgICAgIGEucGxhdGZvcm0uZmlsdGVyKCh0KSA9PiB0LnRvVXBwZXJDYXNlKCkuc2VhcmNoKHNlYXJjaCkgIT09IC0xKVxuICAgICAgICAgICAgICAubGVuZ3RoID4gMCB8fFxuICAgICAgICAgICAgYS5jb3ZlcmFnZS5maWx0ZXIoKHQpID0+IHQudG9VcHBlckNhc2UoKS5zZWFyY2goc2VhcmNoKSAhPT0gLTEpXG4gICAgICAgICAgICAgIC5sZW5ndGggPiAwXG4gICAgICAgICk7XG5cbiAgICAgIGlmIChwbGF0Zm9ybVVwLmxlbmd0aCA+IDApXG4gICAgICAgIHNpbWlsYXJBcHBzID0gc2ltaWxhckFwcHMuZmlsdGVyKChhKSA9PlxuICAgICAgICAgIGluY2x1ZGVzKFxuICAgICAgICAgICAgYS5wbGF0Zm9ybS5tYXAoKHQpID0+IHQudG9VcHBlckNhc2UoKSksXG4gICAgICAgICAgICBwbGF0Zm9ybVVwXG4gICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICBpZiAobGFuZ3VhZ2VVcC5sZW5ndGggPiAwKVxuICAgICAgICBzaW1pbGFyQXBwcyA9IHNpbWlsYXJBcHBzLmZpbHRlcigoYSkgPT5cbiAgICAgICAgICBzb21lKFxuICAgICAgICAgICAgYS5sYW5ndWFnZXMubWFwKCh0KSA9PiB0LnRvVXBwZXJDYXNlKCkpLFxuICAgICAgICAgICAgbGFuZ3VhZ2VVcFxuICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgaWYgKGNvdmVyYWdlVXAubGVuZ3RoID4gMClcbiAgICAgICAgc2ltaWxhckFwcHMgPSBzaW1pbGFyQXBwcy5maWx0ZXIoKGEpID0+XG4gICAgICAgICAgaW5jbHVkZXMoXG4gICAgICAgICAgICBhLmNvdmVyYWdlLm1hcCgodCkgPT4gdC50b1VwcGVyQ2FzZSgpKSxcbiAgICAgICAgICAgIGNvdmVyYWdlVXBcbiAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgIGlmIChzaW1pbGFyQXBwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHNpbWlsYXJUYWcgPSBjcmVhdGVFbGVtZW50KFwiaDJcIiwgXCJSZWxhdGVkIGFwcHNcIik7XG4gICAgICAgIGdldEh0bWxFbGVtZW50KFwiI2xpc3RcIikuYXBwZW5kQ2hpbGQoc2ltaWxhclRhZyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBhIG9mIHNpbWlsYXJBcHBzKSB7XG4gICAgICAgICAgcmVuZGVyTGlzdFZpZXcoYSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsYXp5TG9hZEltYWdlcyh0cnVlKTtcbiAgfSwgMCk7XG59XG5cbmNvbnN0IGxhbmcgPSAoZ2V0UGFyYW1ldGVyRnJvbVVybChcImxhbmdcIikgfHwgXCJlblwiKS50b0xvd2VyQ2FzZSgpO1xuXG5mdW5jdGlvbiBzYXZlQXBwQ2F0YWxvZygpIHtcbiAgc2V0KGAke2xhbmd9LWFwcHNgLCBhcHBzKTtcbiAgc2V0KGAke2xhbmd9LWFwcHMtZGF0ZWAsIG5ldyBEYXRlKCkpO1xuICBjb25zb2xlLmluZm8oXCJhZGQgY2F0YWxvZyB0byBjYWNoZVwiKTtcbiAgLy9wcmludEpzb25MZCgpO1xufVxuXG5mdW5jdGlvbiBwcmludEpzb25MZCgpIHtcbiAgY29uc29sZS5pbmZvKFxuICAgIEpTT04uc3RyaW5naWZ5KFxuICAgICAgYXBwc1xuICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS5uYW1lLnRvVXBwZXJDYXNlKCkgfHwgXCJcIjtcbiAgICAgICAgICBjb25zdCBuYW1lQiA9IGIubmFtZS50b1VwcGVyQ2FzZSgpIHx8IFwiXCI7XG4gICAgICAgICAgaWYgKG5hbWVBIDwgbmFtZUIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobmFtZUEgPiBuYW1lQikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChhcHApID0+ICh7XG4gICAgICAgICAgXCJAY29udGV4dFwiOiBcImh0dHA6Ly9zY2hlbWEub3JnXCIsXG4gICAgICAgICAgXCJAdHlwZVwiOiBcIlNvZnR3YXJlQXBwbGljYXRpb25cIixcbiAgICAgICAgICBuYW1lOiBhcHAubmFtZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGltYWdlOiBhcHAuaW1hZ2VzWzBdLFxuICAgICAgICAgIHVybDogYXBwLndlYnNpdGUsXG4gICAgICAgICAgZG93bmxvYWRVcmw6IGFwcC5pbnN0YWxsLmZEcm9pZElEXG4gICAgICAgICAgICA/IFwiaHR0cHM6Ly9mLWRyb2lkLm9yZy9yZXBvc2l0b3J5L2Jyb3dzZS8/ZmRpZD1cIiArXG4gICAgICAgICAgICAgIGFwcC5pbnN0YWxsLmZEcm9pZElEXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCB8fCBhcHAuaW5zdGFsbC5nb29nbGVQbGF5SURcbiAgICAgICAgICAgID8gXCJodHRwczovL3BsYXkuZ29vZ2xlLmNvbS9zdG9yZS9hcHBzL2RldGFpbHM/aWQ9XCIgK1xuICAgICAgICAgICAgICBhcHAuaW5zdGFsbC5nb29nbGVQbGF5SURcbiAgICAgICAgICAgIDogdW5kZWZpbmVkIHx8IGFwcC5pbnN0YWxsLmFzaW5cbiAgICAgICAgICAgID8gXCJodHRwczovL3d3dy5hbWF6b24uY29tL2RwL1wiICsgYXBwLmluc3RhbGwuYXNpblxuICAgICAgICAgICAgOiB1bmRlZmluZWQgfHwgYXBwLmluc3RhbGwuYXBwbGVTdG9yZUlEXG4gICAgICAgICAgICA/IFwiaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2FwcC9cIiArXG4gICAgICAgICAgICAgIGFwcC5pbnN0YWxsLmFwcGxlU3RvcmVJRD8udG9VcHBlckNhc2UoKS5zdGFydHNXaXRoKFwiSURcIilcbiAgICAgICAgICAgICAgPyBhcHAuaW5zdGFsbC5hcHBsZVN0b3JlSURcbiAgICAgICAgICAgICAgOiBgaWQke2FwcC5pbnN0YWxsLmFwcGxlU3RvcmVJRH1gXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCB8fCBhcHAuaW5zdGFsbC5tYWNBcHBTdG9yZUlEXG4gICAgICAgICAgICA/IFwiaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2FwcC9cIiArXG4gICAgICAgICAgICAgIGFwcC5pbnN0YWxsLm1hY0FwcFN0b3JlSUQ/LnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aChcIklEXCIpXG4gICAgICAgICAgICAgID8gYXBwLmluc3RhbGwubWFjQXBwU3RvcmVJRFxuICAgICAgICAgICAgICA6IGBpZCR7YXBwLmluc3RhbGwubWFjQXBwU3RvcmVJRH1gXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCB8fCBhcHAuaW5zdGFsbC5taWNyb3NvZnRBcHBJRFxuICAgICAgICAgICAgPyBcImh0dHA6Ly93d3cud2luZG93c3Bob25lLmNvbS9zP2FwcGlkPVwiICtcbiAgICAgICAgICAgICAgYXBwLmluc3RhbGwubWljcm9zb2Z0QXBwSURcbiAgICAgICAgICAgIDogdW5kZWZpbmVkIHx8IGFwcC5pbnN0YWxsLmh1YXdlaUFwcEdhbGxlcnlJRFxuICAgICAgICAgICAgPyBcImh0dHBzOi8vYXBwZ2FsbGVyeS5odWF3ZWkuY29tLyMvYXBwL1wiICtcbiAgICAgICAgICAgICAgYXBwLmluc3RhbGwuaHVhd2VpQXBwR2FsbGVyeUlEXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBhdXRob3I6IHtcbiAgICAgICAgICAgIFwiQHR5cGVcIjogXCJQZXJzb25cIixcbiAgICAgICAgICAgIG5hbWU6IGFwcC5hdXRob3IsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRlUHVibGlzaGVkOiBhcHAubGFzdFJlbGVhc2UsXG4gICAgICAgICAgbGljZW5zZTogYXBwLmxpY2Vuc2UsXG4gICAgICAgICAgYXBwbGljYXRpb25DYXRlZ29yeTogW1wiTWFwXCIsIC4uLmFwcC50b3BpY3NdLmpvaW4oXCIsIFwiKSxcbiAgICAgICAgICBvcGVyYXRpbmdTeXN0ZW06IGFwcC5wbGF0Zm9ybS5qb2luKFwiLCBcIiksXG4gICAgICAgIH0pKVxuICAgIClcbiAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QXBwQ2F0YWxvZygpIHtcbiAgY29uc3QgZGF0ZSA9IGdldDxEYXRlPihgJHtsYW5nfS1hcHBzLWRhdGVgKTtcblxuICBjb25zdCBkYXkgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG4gIGlmIChkYXRlICYmIG5ldyBEYXRlKGRhdGUpLnZhbHVlT2YoKSA+IERhdGUubm93KCkgLSBkYXkpIHtcbiAgICBjb25zb2xlLmluZm8oXCJnZXQgY2F0YWxvZyBmcm9tIGNhY2hlXCIpO1xuXG4gICAgYXBwcyA9IGdldChgJHtsYW5nfS1hcHBzYCkgfHwgW107XG5cbiAgICBkb1VwZGF0ZShhcHBzKTtcbiAgfVxuXG4gIGlmIChhcHBzLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnNvbGUuaW5mbyhcImxvYWQgY2F0YWxvZyBmcm9tIHdpa2lcIik7XG5cbiAgICBpZiAobGFuZyAhPT0gXCJlblwiKSBhd2FpdCBsb2FkQXBwcyhkb1VwZGF0ZSwgbGFuZyk7XG4gICAgYXdhaXQgbG9hZEFwcHMoZG9VcGRhdGUpO1xuXG4gICAgc2h1ZmZsZShhcHBzKTtcblxuICAgIHNhdmVBcHBDYXRhbG9nKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZEZpbHRlcihhcHA6IEFwcCkge1xuICBpZiAoYXBwLmltYWdlcy5sZW5ndGggPT09IDAgJiYgIWFwcC5maWx0ZXIpIHtcbiAgICBjb25zdCBkZWZhdWx0Q29sb3IgPSB0ZXh0VG9Db2xvcihhcHAubmFtZSk7XG4gICAgYXBwLmZpbHRlciA9IG5ldyBTb2x2ZXIoXG4gICAgICBuZXcgQ29sb3IoZGVmYXVsdENvbG9yLnIsIGRlZmF1bHRDb2xvci5nLCBkZWZhdWx0Q29sb3IuYilcbiAgICApXG4gICAgICAuc29sdmUoKVxuICAgICAgLmZpbHRlci5yZXBsYWNlKC9maWx0ZXI6L2dpLCBcImZpbHRlcjogYnJpZ2h0bmVzcygwJSlcIik7XG4gIH1cbn1cblxuZ2V0QXBwQ2F0YWxvZygpO1xuXG5mdW5jdGlvbiBwcmVwYXJlQXJyYXlGb3JTZWxlY3QobmFtZXM6IHN0cmluZ1tdLCBzZWxlY3RlZDogc3RyaW5nW10pIHtcbiAgbmFtZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIGlmIChhLnRvVXBwZXJDYXNlKCkgPCBiLnRvVXBwZXJDYXNlKCkpIHJldHVybiAtMTtcbiAgICBpZiAoYS50b1VwcGVyQ2FzZSgpID4gYi50b1VwcGVyQ2FzZSgpKSByZXR1cm4gMTtcbiAgICByZXR1cm4gMDtcbiAgfSk7XG4gIGNvbnN0IG5hbWVDb3VudHM6IHsgbmFtZTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH1bXSA9IFtdO1xuICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICBjb25zdCBuYW1lQ291bnRGaWx0ZXJlZCA9IG5hbWVDb3VudHMuZmlsdGVyKChuYykgPT5cbiAgICAgIGVxdWFsc0lnbm9yZUNhc2UobmMubmFtZSwgbmFtZSlcbiAgICApO1xuXG4gICAgaWYgKG5hbWVDb3VudEZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgIG5hbWVDb3VudEZpbHRlcmVkWzBdLmNvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWVDb3VudHMucHVzaCh7IG5hbWU6IG5hbWUsIGNvdW50OiAxIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lQ291bnRzLm1hcCgodCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZC5maWx0ZXIoKHMpID0+IGVxdWFsc0lnbm9yZUNhc2UodC5uYW1lLCBzKSkubGVuZ3RoID4gMClcbiAgICAgIHJldHVybiB7IHZhbHVlOiB0Lm5hbWUsIHRleHQ6IHQubmFtZSB9O1xuICAgIGVsc2UgcmV0dXJuIHsgdmFsdWU6IHQubmFtZSwgdGV4dDogYCR7dC5uYW1lfSAoJHt0LmNvdW50fSlgIH07XG4gIH0pO1xufVxuIiwiZXhwb3J0IHR5cGUgTG9jYWxpemVkVmFsdWUgPVxuICB8IHN0cmluZ1xuICB8IHtcbiAgICAgIFt4OiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsaXplZFZhbHVlKFxuICBzZXR0aW5nOiBMb2NhbGl6ZWRWYWx1ZSB8IHVuZGVmaW5lZCB8IG51bGwsXG4gIGxvY2FsZTogc3RyaW5nXG4pIHtcbiAgaWYgKCFzZXR0aW5nKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2V0dGluZyA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBzZXR0aW5nO1xuICB9XG5cbiAgaWYgKHNldHRpbmdbbG9jYWxlXSkge1xuICAgIC8vIGV4Y2FjdCBtYXRjaCBmb3VuZFxuICAgIHJldHVybiBzZXR0aW5nW2xvY2FsZV07XG4gIH1cblxuICBjb25zdCBwYXJ0cyA9IGxvY2FsZS5zcGxpdChcIi1cIik7XG4gIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgaWYgKHNldHRpbmdbcGFydHNbMF1dKSB7XG4gICAgICAvLyBmb3VuZCBlZy4gXCJkZVwiIGZvciBcImRlLUNIXCJcbiAgICAgIHJldHVybiBzZXR0aW5nW2xvY2FsZV07XG4gICAgfVxuICB9XG5cbiAgLy8gZmFsbGJhY2sgdGFrZSBmaXJzdFxuICByZXR1cm4gc2V0dGluZ1tPYmplY3Qua2V5cyhzZXR0aW5nKVswXV07XG59XG4iLCIvLyBDb3B5cmlnaHQgKEMpIDIwMjAgTWFya3VzIFBlbG9zb1xuLy9cbi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE9TTSBBcHBzIENhdGFsb2cuXG4vL1xuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuLy8gcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlXG4vLyBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuLy9cbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbi8vXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggT1NNIEFwcHMgQ2F0YWxvZy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuY29uc3QgbGFuZ3VhZ2VzOiB7XG4gIGNvZGU6IHN0cmluZztcbiAgZGlzcGxheTogc3RyaW5nO1xufVtdID0gW1xuICB7IGNvZGU6IFwiYWFcIiwgZGlzcGxheTogXCJBZmFyXCIgfSxcbiAgeyBjb2RlOiBcImFiXCIsIGRpc3BsYXk6IFwi0JDSp9GB0YPQsFwiIH0sXG4gIHsgY29kZTogXCJhZlwiLCBkaXNwbGF5OiBcIkFmcmlrYWFuc1wiIH0sXG4gIHsgY29kZTogXCJha1wiLCBkaXNwbGF5OiBcIkFrYW5hXCIgfSxcbiAgeyBjb2RlOiBcImFsc1wiLCBkaXNwbGF5OiBcIkFsZW1hbm5pc2NoXCIgfSxcbiAgeyBjb2RlOiBcImFtXCIsIGRpc3BsYXk6IFwi4Yqg4Yib4Yit4YqbXCIgfSxcbiAgeyBjb2RlOiBcImFuXCIsIGRpc3BsYXk6IFwiQXJhZ29uw6lzXCIgfSxcbiAgeyBjb2RlOiBcImFuZ1wiLCBkaXNwbGF5OiBcIkFuZ2FsIEhlbmVuZ1wiIH0sXG4gIHsgY29kZTogXCJhbmdcIiwgZGlzcGxheTogXCJFbmdsaXNjXCIgfSxcbiAgeyBjb2RlOiBcImFyXCIsIGRpc3BsYXk6IFwi2KfZhNi52LHYqNmK2KlcIiB9LFxuICB7IGNvZGU6IFwiYXJjXCIsIGRpc3BsYXk6IFwi3KPcmNyq3KxcIiB9LFxuICB7IGNvZGU6IFwiYXNcIiwgZGlzcGxheTogXCLgpoXgprjgpq7gp4Dgpq/gprzgpr5cIiB9LFxuICB7IGNvZGU6IFwiYXN0XCIsIGRpc3BsYXk6IFwiQXN0dXJpYW51XCIgfSxcbiAgeyBjb2RlOiBcImF2XCIsIGRpc3BsYXk6IFwi0JDQstCw0YBcIiB9LFxuICB7IGNvZGU6IFwiYXdhXCIsIGRpc3BsYXk6IFwiQXdhZGhpXCIgfSxcbiAgeyBjb2RlOiBcImF5XCIsIGRpc3BsYXk6IFwiQXltYXJcIiB9LFxuICB7IGNvZGU6IFwiYXpcIiwgZGlzcGxheTogXCJBesmZcmJheWNhbmNhIC8g2KLYsNix2KjYp9mK2KzYp9mGXCIgfSxcbiAgeyBjb2RlOiBcImJhXCIsIGRpc3BsYXk6IFwi0JHQsNGI0qHQvtGA0YJcIiB9LFxuICB7IGNvZGU6IFwiYmFyXCIsIGRpc3BsYXk6IFwiQm9hcmlzY2hcIiB9LFxuICB7IGNvZGU6IFwiYmF0LXNtZ1wiLCBkaXNwbGF5OiBcIsW9ZW1haXTEl8Wha2FcIiB9LFxuICB7IGNvZGU6IFwiYmNsXCIsIGRpc3BsYXk6IFwiQmlrb2wgQ2VudHJhbFwiIH0sXG4gIHsgY29kZTogXCJiZVwiLCBkaXNwbGF5OiBcItCR0LXQu9Cw0YDRg9GB0LrQsNGPXCIgfSxcbiAgeyBjb2RlOiBcImJlLXgtb2xkXCIsIGRpc3BsYXk6IFwi0JHQtdC70LDRgNGD0YHQutCw0Y8gKNGC0LDRgNCw0YjQutC10LLRltGG0LApXCIgfSxcbiAgeyBjb2RlOiBcImJnXCIsIGRpc3BsYXk6IFwi0JHRitC70LPQsNGA0YHQutC4XCIgfSxcbiAgeyBjb2RlOiBcImJoXCIsIGRpc3BsYXk6IFwi4KSt4KWL4KSc4KSq4KWB4KSw4KWAXCIgfSxcbiAgeyBjb2RlOiBcImJpXCIsIGRpc3BsYXk6IFwiQmlzbGFtYVwiIH0sXG4gIHsgY29kZTogXCJibVwiLCBkaXNwbGF5OiBcIkJhbWFuYW5rYW5cIiB9LFxuICB7IGNvZGU6IFwiYm5cIiwgZGlzcGxheTogXCLgpqzgpr7gpoLgprLgpr5cIiB9LFxuICB7IGNvZGU6IFwiYm9cIiwgZGlzcGxheTogXCLgvZbgvbzgvZHgvIvgvaHgvbLgvYLCoC8gQm9kIHNrYWRcIiB9LFxuICB7IGNvZGU6IFwiYnB5XCIsIGRpc3BsYXk6IFwi4KaH4Kau4Ka+4KawIOCmoOCmvuCmsC/gpqzgpr/gprfgp43gpqPgp4Hgpqrgp43gprDgpr/gpq/gprzgpr4g4Kau4Kaj4Ka/4Kaq4KeB4Kaw4KeAXCIgfSxcbiAgeyBjb2RlOiBcImJyXCIsIGRpc3BsYXk6IFwiQnJlemhvbmVnXCIgfSxcbiAgeyBjb2RlOiBcImJzXCIsIGRpc3BsYXk6IFwiQm9zYW5za2lcIiB9LFxuICB7IGNvZGU6IFwiYnVnXCIsIGRpc3BsYXk6IFwi4aiF4aiUIOGoleGomOGogeGol8KgLyBCYXNhIFVnaVwiIH0sXG4gIHsgY29kZTogXCJieHJcIiwgZGlzcGxheTogXCLQkdGD0YDRj9Cw0LQg0YXRjdC70Y3QvVwiIH0sXG4gIHsgY29kZTogXCJjYVwiLCBkaXNwbGF5OiBcIkNhdGFsw6BcIiB9LFxuICB7IGNvZGU6IFwiY2RvXCIsIGRpc3BsYXk6IFwiTcOsbmctZMSVzKRuZy1uZ+G5s8yEIC8g6Zap5p2x6KqeXCIgfSxcbiAgeyBjb2RlOiBcImNlXCIsIGRpc3BsYXk6IFwi0J3QvtGF0YfQuNC50L1cIiB9LFxuICB7IGNvZGU6IFwiY2ViXCIsIGRpc3BsYXk6IFwiU2ludWdib2Fub25nIEJpbmlzYXlhXCIgfSxcbiAgeyBjb2RlOiBcImNoXCIsIGRpc3BsYXk6IFwiQ2hhbW9ydVwiIH0sXG4gIHsgY29kZTogXCJjaG9cIiwgZGlzcGxheTogXCJDaG9jdGF3XCIgfSxcbiAgeyBjb2RlOiBcImNoclwiLCBkaXNwbGF5OiBcIuGPo+GOs+GOqVwiIH0sXG4gIHsgY29kZTogXCJjaHlcIiwgZGlzcGxheTogXCJUc2V0c8OqaGVzdMOiaGVzZVwiIH0sXG4gIHsgY29kZTogXCJjbG9zZWQtemgtdHdcIiwgZGlzcGxheTogXCLigKrkuK3mloco5Y+w54GjKeKArFwiIH0sXG4gIHsgY29kZTogXCJjb1wiLCBkaXNwbGF5OiBcIkNvcnN1XCIgfSxcbiAgeyBjb2RlOiBcImNyXCIsIGRpc3BsYXk6IFwiTmVoaXlhd1wiIH0sXG4gIHsgY29kZTogXCJjc1wiLCBkaXNwbGF5OiBcIsSMZXNreVwiIH0sXG4gIHsgY29kZTogXCJjc2JcIiwgZGlzcGxheTogXCJLYXN6w6tic2N6aVwiIH0sXG4gIHsgY29kZTogXCJjdVwiLCBkaXNwbGF5OiBcItGB0LvQvtCy0aPQvdGM0YHQutGKwqAvIHNsb3bEm27ErXNrxa1cIiB9LFxuICB7IGNvZGU6IFwiY3ZcIiwgZGlzcGxheTogXCLQp8SD0LLQsNGIXCIgfSxcbiAgeyBjb2RlOiBcImN5XCIsIGRpc3BsYXk6IFwiQ3ltcmFlZ1wiIH0sXG4gIHsgY29kZTogXCJkYVwiLCBkaXNwbGF5OiBcIkRhbnNrXCIgfSxcbiAgeyBjb2RlOiBcImRlXCIsIGRpc3BsYXk6IFwiRGV1dHNjaFwiIH0sXG4gIHsgY29kZTogXCJkaXFcIiwgZGlzcGxheTogXCJaYXpha2lcIiB9LFxuICB7IGNvZGU6IFwiZHNiXCIsIGRpc3BsYXk6IFwiRG9sbm9zZXJic2tpXCIgfSxcbiAgeyBjb2RlOiBcImR2XCIsIGRpc3BsYXk6IFwi3oveqN6I3qzegN6o3oTept6Q3rBcIiB9LFxuICB7IGNvZGU6IFwiZHpcIiwgZGlzcGxheTogXCLgvYfgvbzgvYTgvIvgvYFcIiB9LFxuICB7IGNvZGU6IFwiZWVcIiwgZGlzcGxheTogXCLGkMqLyZtcIiB9LFxuICB7IGNvZGU6IFwiZWxcIiwgZGlzcGxheTogXCLOlc67zrvOt869zrnOus6sXCIgfSxcbiAgeyBjb2RlOiBcImVuXCIsIGRpc3BsYXk6IFwiRW5nbGlzaFwiIH0sXG4gIHsgY29kZTogXCJlb1wiLCBkaXNwbGF5OiBcIkVzcGVyYW50b1wiIH0sXG4gIHsgY29kZTogXCJlc1wiLCBkaXNwbGF5OiBcIkVzcGHDsW9sXCIgfSxcbiAgeyBjb2RlOiBcImV0XCIsIGRpc3BsYXk6IFwiRWVzdGlcIiB9LFxuICB7IGNvZGU6IFwiZXVcIiwgZGlzcGxheTogXCJFdXNrYXJhXCIgfSxcbiAgeyBjb2RlOiBcImV4dFwiLCBkaXNwbGF5OiBcIkVzdHJlbWXDsXVcIiB9LFxuICB7IGNvZGU6IFwiZmFcIiwgZGlzcGxheTogXCLZgdin2LHYs9uMXCIgfSxcbiAgeyBjb2RlOiBcImZmXCIsIGRpc3BsYXk6IFwiRnVsZnVsZGVcIiB9LFxuICB7IGNvZGU6IFwiZmlcIiwgZGlzcGxheTogXCJTdW9taVwiIH0sXG4gIHsgY29kZTogXCJmaXUtdnJvXCIsIGRpc3BsYXk6IFwiVsO1cm9cIiB9LFxuICB7IGNvZGU6IFwiZmpcIiwgZGlzcGxheTogXCJOYSBWb3NhIFZha2F2aXRpXCIgfSxcbiAgeyBjb2RlOiBcImZvXCIsIGRpc3BsYXk6IFwiRsO4cm95c2t0XCIgfSxcbiAgeyBjb2RlOiBcImZyXCIsIGRpc3BsYXk6IFwiRnJhbsOnYWlzXCIgfSxcbiAgeyBjb2RlOiBcImZycFwiLCBkaXNwbGF5OiBcIkFycGl0YW7CoC8gZnJhbmNvcHJvdmVuw6dhbFwiIH0sXG4gIHsgY29kZTogXCJmdXJcIiwgZGlzcGxheTogXCJGdXJsYW5cIiB9LFxuICB7IGNvZGU6IFwiZnlcIiwgZGlzcGxheTogXCJGcnlza1wiIH0sXG4gIHsgY29kZTogXCJnYVwiLCBkaXNwbGF5OiBcIkdhZWlsZ2VcIiB9LFxuICB7IGNvZGU6IFwiZ2FuXCIsIGRpc3BsYXk6IFwi6LSb6KqeXCIgfSxcbiAgeyBjb2RlOiBcImdibVwiLCBkaXNwbGF5OiBcIuCkl+CkouCkvOCkteCks+ClgFwiIH0sXG4gIHsgY29kZTogXCJnY2ZcIiwgZGlzcGxheTogXCJLcsOpecOybCBnd2FkbG91cMOpeWVuXCIgfSxcbiAgeyBjb2RlOiBcImdkXCIsIGRpc3BsYXk6IFwiR8OgaWRobGlnXCIgfSxcbiAgeyBjb2RlOiBcImdpbFwiLCBkaXNwbGF5OiBcIlRhZXRhZSBuaSBraXJpYmF0aVwiIH0sXG4gIHsgY29kZTogXCJnbFwiLCBkaXNwbGF5OiBcIkdhbGVnb1wiIH0sXG4gIHsgY29kZTogXCJnblwiLCBkaXNwbGF5OiBcIkF2YcOxZSfhur1cIiB9LFxuICB7IGNvZGU6IFwiZ290XCIsIGRpc3BsYXk6IFwiZ3V0aXNrXCIgfSxcbiAgeyBjb2RlOiBcImd1XCIsIGRpc3BsYXk6IFwi4KqX4KuB4Kqc4Kqw4Kq+4Kqk4KuAXCIgfSxcbiAgeyBjb2RlOiBcImd2XCIsIGRpc3BsYXk6IFwiR2FlbGdcIiB9LFxuICB7IGNvZGU6IFwiaGFcIiwgZGlzcGxheTogXCLZh9mO2YjZj9iz2Y5cIiB9LFxuICB7IGNvZGU6IFwiaGFrXCIsIGRpc3BsYXk6IFwi5a6i5a626KqeL0hhay1rw6ItbmfDrlwiIH0sXG4gIHsgY29kZTogXCJoYXdcIiwgZGlzcGxheTogXCJIYXdhaWBpXCIgfSxcbiAgeyBjb2RlOiBcImhlXCIsIGRpc3BsYXk6IFwi16LXkdeo15nXqlwiIH0sXG4gIHsgY29kZTogXCJoaVwiLCBkaXNwbGF5OiBcIuCkueCkv+CkqOCljeCkpuClgFwiIH0sXG4gIHsgY29kZTogXCJob1wiLCBkaXNwbGF5OiBcIkhpcmkgTW90dVwiIH0sXG4gIHsgY29kZTogXCJoclwiLCBkaXNwbGF5OiBcIkhydmF0c2tpXCIgfSxcbiAgeyBjb2RlOiBcImh0XCIsIGRpc3BsYXk6IFwiS3LDqHlvbCBheWlzeWVuXCIgfSxcbiAgeyBjb2RlOiBcImh1XCIsIGRpc3BsYXk6IFwiTWFneWFyXCIgfSxcbiAgeyBjb2RlOiBcImh5XCIsIGRpc3BsYXk6IFwi1YDVodW11aXWgNWl1bZcIiB9LFxuICB7IGNvZGU6IFwiaHpcIiwgZGlzcGxheTogXCJPdHNpaGVyZXJvXCIgfSxcbiAgeyBjb2RlOiBcImlhXCIsIGRpc3BsYXk6IFwiSW50ZXJsaW5ndWFcIiB9LFxuICB7IGNvZGU6IFwiaWRcIiwgZGlzcGxheTogXCJCYWhhc2EgSW5kb25lc2lhXCIgfSxcbiAgeyBjb2RlOiBcImllXCIsIGRpc3BsYXk6IFwiSW50ZXJsaW5ndWVcIiB9LFxuICB7IGNvZGU6IFwiaWdcIiwgZGlzcGxheTogXCJJZ2JvXCIgfSxcbiAgeyBjb2RlOiBcImlpXCIsIGRpc3BsYXk6IFwi6oaH6omZwqAvIOWbm+W3neW9neivrVwiIH0sXG4gIHsgY29kZTogXCJpa1wiLCBkaXNwbGF5OiBcIknDsXVwaWFrXCIgfSxcbiAgeyBjb2RlOiBcImlsb1wiLCBkaXNwbGF5OiBcIklsb2thbm9cIiB9LFxuICB7IGNvZGU6IFwiaW5oXCIsIGRpc3BsYXk6IFwi0JPTgNCw0LvQs9OA0LDQuVwiIH0sXG4gIHsgY29kZTogXCJpb1wiLCBkaXNwbGF5OiBcIklkb1wiIH0sXG4gIHsgY29kZTogXCJpc1wiLCBkaXNwbGF5OiBcIsONc2xlbnNrYVwiIH0sXG4gIHsgY29kZTogXCJpdFwiLCBkaXNwbGF5OiBcIkl0YWxpYW5vXCIgfSxcbiAgeyBjb2RlOiBcIml1XCIsIGRpc3BsYXk6IFwi4ZCD4ZOE4ZKD4ZGO4ZGQ4ZGmXCIgfSxcbiAgeyBjb2RlOiBcImphXCIsIGRpc3BsYXk6IFwi5pel5pys6KqeXCIgfSxcbiAgeyBjb2RlOiBcImpib1wiLCBkaXNwbGF5OiBcIkxvamJhblwiIH0sXG4gIHsgY29kZTogXCJqdlwiLCBkaXNwbGF5OiBcIkJhc2EgSmF3YVwiIH0sXG4gIHsgY29kZTogXCJrYVwiLCBkaXNwbGF5OiBcIuGDpeGDkOGDoOGDl+GDo+GDmuGDmFwiIH0sXG4gIHsgY29kZTogXCJrZ1wiLCBkaXNwbGF5OiBcIktpS29uZ29cIiB9LFxuICB7IGNvZGU6IFwia2h3XCIsIGRpc3BsYXk6IFwi2qnavtmI2KfYsVwiIH0sXG4gIHsgY29kZTogXCJraVwiLCBkaXNwbGF5OiBcIkfEqWvFqXnFqVwiIH0sXG4gIHsgY29kZTogXCJralwiLCBkaXNwbGF5OiBcIkt1YW55YW1hXCIgfSxcbiAgeyBjb2RlOiBcImtrXCIsIGRpc3BsYXk6IFwi0prQsNC30LDSm9GI0LBcIiB9LFxuICB7IGNvZGU6IFwia2xcIiwgZGlzcGxheTogXCJLYWxhYWxsaXN1dFwiIH0sXG4gIHsgY29kZTogXCJrbVwiLCBkaXNwbGF5OiBcIuGel+GetuGen+GetuGegeGfkuGemOGfguGemlwiIH0sXG4gIHsgY29kZTogXCJrblwiLCBkaXNwbGF5OiBcIuCyleCyqOCzjeCyqOCyoVwiIH0sXG4gIHsgY29kZTogXCJrb1wiLCBkaXNwbGF5OiBcIu2VnOq1reyWtFwiIH0sXG4gIHsgY29kZTogXCJrclwiLCBkaXNwbGF5OiBcIkthbnVyaVwiIH0sXG4gIHsgY29kZTogXCJrc1wiLCBkaXNwbGF5OiBcIuCkleCktuCljeCkruClgOCksOClgMKgL8Kg2YPYtNmF2YrYsdmKXCIgfSxcbiAgeyBjb2RlOiBcImtzaFwiLCBkaXNwbGF5OiBcIlJpcG9hcmlzY2hcIiB9LFxuICB7IGNvZGU6IFwia3VcIiwgZGlzcGxheTogXCJLdXJkw67CoC/CoNmD2YjYsdiv24xcIiB9LFxuICB7IGNvZGU6IFwia3ZcIiwgZGlzcGxheTogXCLQmtC+0LzQuFwiIH0sXG4gIHsgY29kZTogXCJrd1wiLCBkaXNwbGF5OiBcIktlcm5ld2VrXCIgfSxcbiAgeyBjb2RlOiBcImt5XCIsIGRpc3BsYXk6IFwiS8SxcmfEsXpjYcKgLyDQmtGL0YDQs9GL0LfRh9CwXCIgfSxcbiAgeyBjb2RlOiBcImxhXCIsIGRpc3BsYXk6IFwiTGF0aW5hXCIgfSxcbiAgeyBjb2RlOiBcImxhZFwiLCBkaXNwbGF5OiBcIkR6aHVkZXptb8KgLyBEanVkZW8tRXNwYW55b2xcIiB9LFxuICB7IGNvZGU6IFwibGFuXCIsIGRpc3BsYXk6IFwiTGViIExhbmdvwqAvIEx1b1wiIH0sXG4gIHsgY29kZTogXCJsYlwiLCBkaXNwbGF5OiBcIkzDq3R6ZWJ1ZXJnZXNjaFwiIH0sXG4gIHsgY29kZTogXCJsZ1wiLCBkaXNwbGF5OiBcIkx1Z2FuZGFcIiB9LFxuICB7IGNvZGU6IFwibGlcIiwgZGlzcGxheTogXCJMaW1idXJnc1wiIH0sXG4gIHsgY29kZTogXCJsaWpcIiwgZGlzcGxheTogXCJMw61ndXJ1XCIgfSxcbiAgeyBjb2RlOiBcImxtb1wiLCBkaXNwbGF5OiBcIkx1bWJhYXJ0XCIgfSxcbiAgeyBjb2RlOiBcImxuXCIsIGRpc3BsYXk6IFwiTGluZ8OhbGFcIiB9LFxuICB7IGNvZGU6IFwibG9cIiwgZGlzcGxheTogXCLguqXgurLguqfCoC8gUGhhIHhhIGxhb1wiIH0sXG4gIHsgY29kZTogXCJsdFwiLCBkaXNwbGF5OiBcIkxpZXR1dmnFs1wiIH0sXG4gIHsgY29kZTogXCJsdlwiLCBkaXNwbGF5OiBcIkxhdHZpZcWhdVwiIH0sXG4gIHsgY29kZTogXCJsenpcIiwgZGlzcGxheTogXCJMYXp1cmkgLyDhg5rhg5Dhg5bhg6Phg6Dhg5hcIiB9LFxuICB7IGNvZGU6IFwibWFuXCIsIGRpc3BsYXk6IFwi5a6Y6KmxL+WumOivnVwiIH0sXG4gIHsgY29kZTogXCJtYXAtYm1zXCIsIGRpc3BsYXk6IFwiQmFzYSBCYW55dW1hc2FuXCIgfSxcbiAgeyBjb2RlOiBcIm1nXCIsIGRpc3BsYXk6IFwiTWFsYWdhc3lcIiB9LFxuICB7IGNvZGU6IFwibWhcIiwgZGlzcGxheTogXCJLYWppbiBNYWplbMKgLyBFYm9uXCIgfSxcbiAgeyBjb2RlOiBcIm1pXCIsIGRpc3BsYXk6IFwiTcSBb3JpXCIgfSxcbiAgeyBjb2RlOiBcIm1pblwiLCBkaXNwbGF5OiBcIk1pbmFuZ2thYmF1XCIgfSxcbiAgeyBjb2RlOiBcIm1rXCIsIGRpc3BsYXk6IFwi0JzQsNC60LXQtNC+0L3RgdC60LhcIiB9LFxuICB7IGNvZGU6IFwibWxcIiwgZGlzcGxheTogXCLgtK7gtLLgtK/gtL7gtLPgtIJcIiB9LFxuICB7IGNvZGU6IFwibW5cIiwgZGlzcGxheTogXCLQnNC+0L3Qs9C+0LtcIiB9LFxuICB7IGNvZGU6IFwibW9cIiwgZGlzcGxheTogXCJNb2xkb3ZlbmVhc2PEg1wiIH0sXG4gIHsgY29kZTogXCJtclwiLCBkaXNwbGF5OiBcIuCkruCksOCkvuCkoOClgFwiIH0sXG4gIHsgY29kZTogXCJtcmhcIiwgZGlzcGxheTogXCJNYXJhXCIgfSxcbiAgeyBjb2RlOiBcIm1zXCIsIGRpc3BsYXk6IFwiQmFoYXNhIE1lbGF5dVwiIH0sXG4gIHsgY29kZTogXCJtdFwiLCBkaXNwbGF5OiBcImJpbC1NYWx0aVwiIH0sXG4gIHsgY29kZTogXCJtdWxcIiwgZGlzcGxheTogXCJNdWx0aWxpbmd1YWxcIiB9LFxuICB7IGNvZGU6IFwibXVzXCIsIGRpc3BsYXk6IFwiTXZza29rZVwiIH0sXG4gIHsgY29kZTogXCJtd2xcIiwgZGlzcGxheTogXCJNaXJhbmTDqXNcIiB9LFxuICB7IGNvZGU6IFwibXlcIiwgZGlzcGxheTogXCJNeWFubWFzYSAvIOGAmeGAvOGAlOGAuuGAmeGArOGAmOGArOGAnuGArFwiIH0sXG4gIHsgY29kZTogXCJuYVwiLCBkaXNwbGF5OiBcIkRvcmVyaW4gTmFvZXJvXCIgfSxcbiAgeyBjb2RlOiBcIm5haFwiLCBkaXNwbGF5OiBcIk5haHVhdGxcIiB9LFxuICB7IGNvZGU6IFwibmFwXCIsIGRpc3BsYXk6IFwiTm5hcHVsaXRhbm9cIiB9LFxuICB7IGNvZGU6IFwibmJcIiwgZGlzcGxheTogXCJOb3JzayAoYm9rbcOlbClcIiB9LFxuICB7IGNvZGU6IFwibmRcIiwgZGlzcGxheTogXCJTaW5kZWJlbGVcIiB9LFxuICB7IGNvZGU6IFwibmRzXCIsIGRpc3BsYXk6IFwiUGxhdHRkw7zDvHRzY2hcIiB9LFxuICB7IGNvZGU6IFwibmRzLW5sXCIsIGRpc3BsYXk6IFwiTmVkZXJzYWtzaXNjaFwiIH0sXG4gIHsgY29kZTogXCJuZVwiLCBkaXNwbGF5OiBcIuCkqOClh+CkquCkvuCksuClgFwiIH0sXG4gIHsgY29kZTogXCJuZXdcIiwgZGlzcGxheTogXCLgpKjgpYfgpKrgpL7gpLLgpK3gpL7gpLfgpL7CoC8gTmV3YWggQmhheWVcIiB9LFxuICB7IGNvZGU6IFwibmdcIiwgZGlzcGxheTogXCJPc2hpd2FtYm9cIiB9LFxuICB7IGNvZGU6IFwibmxcIiwgZGlzcGxheTogXCJOZWRlcmxhbmRzXCIgfSxcbiAgeyBjb2RlOiBcIm5uXCIsIGRpc3BsYXk6IFwiTm9yc2sgKG55bm9yc2spXCIgfSxcbiAgeyBjb2RlOiBcIm5vXCIsIGRpc3BsYXk6IFwiTm9yc2sgKGJva23DpWzCoC8gcmlrc23DpWwpXCIgfSxcbiAgeyBjb2RlOiBcIm5yXCIsIGRpc3BsYXk6IFwiaXNpTmRlYmVsZVwiIH0sXG4gIHsgY29kZTogXCJucm1cIiwgZGlzcGxheTogXCJOb3Vvcm1hbmTCoC8gTm9ybWF1bmRcIiB9LFxuICB7IGNvZGU6IFwibnNvXCIsIGRpc3BsYXk6IFwiU2Vzb3RobyBzYSBMZWJvYcKgLyBTZXBlZGlcIiB9LFxuICB7IGNvZGU6IFwibnZcIiwgZGlzcGxheTogXCJEaW7DqSBiaXphYWRcIiB9LFxuICB7IGNvZGU6IFwibnlcIiwgZGlzcGxheTogXCJDaGktQ2hld2FcIiB9LFxuICB7IGNvZGU6IFwib2NcIiwgZGlzcGxheTogXCJPY2NpdGFuXCIgfSxcbiAgeyBjb2RlOiBcIm9qXCIsIGRpc3BsYXk6IFwi4ZCK4ZOC4ZSR4ZOI4ZCv4ZKn4ZCO4ZOQwqAvIEFuaXNoaW5hYWJlbW93aW5cIiB9LFxuICB7IGNvZGU6IFwib21cIiwgZGlzcGxheTogXCJPcm9tb29cIiB9LFxuICB7IGNvZGU6IFwib3JcIiwgZGlzcGxheTogXCLgrJPgrKHgrLzgrL/grIZcIiB9LFxuICB7IGNvZGU6IFwib3NcIiwgZGlzcGxheTogXCLQmNGA0L7QvdCw0YNcIiB9LFxuICB7IGNvZGU6IFwicGFcIiwgZGlzcGxheTogXCLgqKrgqbDgqJzgqL7gqKzgqYDCoC8g4KSq4KSC4KSc4KS+4KSs4KWAwqAvwqDZvtmG2KzYp9io2YpcIiB9LFxuICB7IGNvZGU6IFwicGFnXCIsIGRpc3BsYXk6IFwiUGFuZ2FzaW5hblwiIH0sXG4gIHsgY29kZTogXCJwYW1cIiwgZGlzcGxheTogXCJLYXBhbXBhbmdhblwiIH0sXG4gIHsgY29kZTogXCJwYXBcIiwgZGlzcGxheTogXCJQYXBpYW1lbnR1XCIgfSxcbiAgeyBjb2RlOiBcInBkY1wiLCBkaXNwbGF5OiBcIkRlaXRzY2hcIiB9LFxuICB7IGNvZGU6IFwicGlcIiwgZGlzcGxheTogXCJQxIFsacKgLyDgpKrgpL7gpLTgpL9cIiB9LFxuICB7IGNvZGU6IFwicGloXCIsIGRpc3BsYXk6IFwiTm9yZnVrXCIgfSxcbiAgeyBjb2RlOiBcInBsXCIsIGRpc3BsYXk6IFwiUG9sc2tpXCIgfSxcbiAgeyBjb2RlOiBcInBtc1wiLCBkaXNwbGF5OiBcIlBpZW1vbnTDqGlzXCIgfSxcbiAgeyBjb2RlOiBcInBzXCIsIGRpc3BsYXk6IFwi2b7amtiq2YhcIiB9LFxuICB7IGNvZGU6IFwicHRcIiwgZGlzcGxheTogXCJQb3J0dWd1w6pzXCIgfSxcbiAgeyBjb2RlOiBcInF1XCIsIGRpc3BsYXk6IFwiUnVuYSBTaW1pXCIgfSxcbiAgeyBjb2RlOiBcInJtXCIsIGRpc3BsYXk6IFwiUnVtYW50c2NoXCIgfSxcbiAgeyBjb2RlOiBcInJteVwiLCBkaXNwbGF5OiBcIlJvbWFuacKgLyDgpLDgpYvgpK7gpL7gpKjgpYBcIiB9LFxuICB7IGNvZGU6IFwicm5cIiwgZGlzcGxheTogXCJLaXJ1bmRpXCIgfSxcbiAgeyBjb2RlOiBcInJvXCIsIGRpc3BsYXk6IFwiUm9tw6JuxINcIiB9LFxuICB7IGNvZGU6IFwicm9hLXJ1cFwiLCBkaXNwbGF5OiBcIkFybcOibmVhc2h0aVwiIH0sXG4gIHsgY29kZTogXCJydVwiLCBkaXNwbGF5OiBcItCg0YPRgdGB0LrQuNC5XCIgfSxcbiAgeyBjb2RlOiBcInJ3XCIsIGRpc3BsYXk6IFwiS2lueWFyd2FuZGlcIiB9LFxuICB7IGNvZGU6IFwic2FcIiwgZGlzcGxheTogXCLgpLjgpILgpLjgpY3gpJXgpYPgpKTgpK7gpY1cIiB9LFxuICB7IGNvZGU6IFwic2NcIiwgZGlzcGxheTogXCJTYXJkdVwiIH0sXG4gIHsgY29kZTogXCJzY25cIiwgZGlzcGxheTogXCJTaWNpbGlhbnVcIiB9LFxuICB7IGNvZGU6IFwic2NvXCIsIGRpc3BsYXk6IFwiU2NvdHNcIiB9LFxuICB7IGNvZGU6IFwic2RcIiwgZGlzcGxheTogXCLgpLjgpL/gpKjgpKfgpL9cIiB9LFxuICB7IGNvZGU6IFwic2VcIiwgZGlzcGxheTogXCJEYXZ2aXPDoW1lZ2llbGxhXCIgfSxcbiAgeyBjb2RlOiBcInNnXCIsIGRpc3BsYXk6IFwiU8OkbmfDtlwiIH0sXG4gIHsgY29kZTogXCJzaFwiLCBkaXNwbGF5OiBcIlNycHNrb2hydmF0c2tpwqAvINCh0YDQv9GB0LrQvtGF0YDQstCw0YLRgdC60LhcIiB9LFxuICB7IGNvZGU6IFwic2lcIiwgZGlzcGxheTogXCLgt4Pgt5LgtoLgt4Tgtr1cIiB9LFxuICB7IGNvZGU6IFwic2ltcGxlXCIsIGRpc3BsYXk6IFwiU2ltcGxlIEVuZ2xpc2hcIiB9LFxuICB7IGNvZGU6IFwic2tcIiwgZGlzcGxheTogXCJTbG92ZW7EjWluYVwiIH0sXG4gIHsgY29kZTogXCJzbFwiLCBkaXNwbGF5OiBcIlNsb3ZlbsWhxI1pbmFcIiB9LFxuICB7IGNvZGU6IFwic21cIiwgZGlzcGxheTogXCJHYWdhbmEgU2Ftb2FcIiB9LFxuICB7IGNvZGU6IFwic25cIiwgZGlzcGxheTogXCJjaGlTaG9uYVwiIH0sXG4gIHsgY29kZTogXCJzb1wiLCBkaXNwbGF5OiBcIlNvb21hYWxpZ2FcIiB9LFxuICB7IGNvZGU6IFwic3FcIiwgZGlzcGxheTogXCJTaHFpcFwiIH0sXG4gIHsgY29kZTogXCJzci1sYXRuXCIsIGRpc3BsYXk6IFwic3Jwc2tpIChsYXRpbmljYSlcIiB9LFxuICB7IGNvZGU6IFwic3JcIiwgZGlzcGxheTogXCLQodGA0L/RgdC60LggLyBTcnBza2lcIiB9LFxuICB7IGNvZGU6IFwic3NcIiwgZGlzcGxheTogXCJTaVN3YXRpXCIgfSxcbiAgeyBjb2RlOiBcInN0XCIsIGRpc3BsYXk6IFwiU2Vzb3Rob1wiIH0sXG4gIHsgY29kZTogXCJzdVwiLCBkaXNwbGF5OiBcIkJhc2EgU3VuZGFcIiB9LFxuICB7IGNvZGU6IFwic3ZcIiwgZGlzcGxheTogXCJTdmVuc2thXCIgfSxcbiAgeyBjb2RlOiBcInN3XCIsIGRpc3BsYXk6IFwiS2lzd2FoaWxpXCIgfSxcbiAgeyBjb2RlOiBcInRhXCIsIGRpc3BsYXk6IFwi4K6k4K6u4K6/4K604K+NXCIgfSxcbiAgeyBjb2RlOiBcInRlXCIsIGRpc3BsYXk6IFwi4LCk4LGG4LCy4LGB4LCX4LGBXCIgfSxcbiAgeyBjb2RlOiBcInRldFwiLCBkaXNwbGF5OiBcIlRldHVuXCIgfSxcbiAgeyBjb2RlOiBcInRnXCIsIGRpc3BsYXk6IFwi0KLQvtK30LjQutOjXCIgfSxcbiAgeyBjb2RlOiBcInRoXCIsIGRpc3BsYXk6IFwi4LmE4LiX4LiiwqAvIFBoYXNhIFRoYWlcIiB9LFxuICB7IGNvZGU6IFwidGlcIiwgZGlzcGxheTogXCLhibXhjI3hiK3hiptcIiB9LFxuICB7IGNvZGU6IFwidGtcIiwgZGlzcGxheTogXCLQotGD0YDQutC80LXQvcKgL8Kg2KrYsdmD2YXZhlwiIH0sXG4gIHsgY29kZTogXCJ0bFwiLCBkaXNwbGF5OiBcIlRhZ2Fsb2dcIiB9LFxuICB7IGNvZGU6IFwidGxoXCIsIGRpc3BsYXk6IFwidGxoSW5nYW4tSG9sXCIgfSxcbiAgeyBjb2RlOiBcInRuXCIsIGRpc3BsYXk6IFwiU2V0c3dhbmFcIiB9LFxuICB7IGNvZGU6IFwidG9cIiwgZGlzcGxheTogXCJMZWEgRmFrYS1Ub25nYVwiIH0sXG4gIHsgY29kZTogXCJ0b2tpcG9uYVwiLCBkaXNwbGF5OiBcInRva2lwb25hXCIgfSxcbiAgeyBjb2RlOiBcInRwaVwiLCBkaXNwbGF5OiBcIlRvayBQaXNpblwiIH0sXG4gIHsgY29kZTogXCJ0clwiLCBkaXNwbGF5OiBcIlTDvHJrw6dlXCIgfSxcbiAgeyBjb2RlOiBcInRzXCIsIGRpc3BsYXk6IFwiWGl0c29uZ2FcIiB9LFxuICB7IGNvZGU6IFwidHRcIiwgZGlzcGxheTogXCJUYXRhcsOnYVwiIH0sXG4gIHsgY29kZTogXCJ0dW1cIiwgZGlzcGxheTogXCJjaGlUdW1idWthXCIgfSxcbiAgeyBjb2RlOiBcInR3XCIsIGRpc3BsYXk6IFwiVHdpXCIgfSxcbiAgeyBjb2RlOiBcInR5XCIsIGRpc3BsYXk6IFwiUmVvIE3EgWBvaGlcIiB9LFxuICB7IGNvZGU6IFwidHptXCIsIGRpc3BsYXk6IFwi4rWc4rSw4rWO4rSw4rWj4rWJ4rWW4rWcXCIgfSxcbiAgeyBjb2RlOiBcInVkbVwiLCBkaXNwbGF5OiBcItCj0LTQvNGD0YDRgiDQutGL0LtcIiB9LFxuICB7IGNvZGU6IFwidWdcIiwgZGlzcGxheTogXCJVecajdXJxyZnCoC/CoNim24fZiti624fYsdqG25VcIiB9LFxuICB7IGNvZGU6IFwidWtcIiwgZGlzcGxheTogXCLQo9C60YDQsNGX0L3RgdGM0LrQsFwiIH0sXG4gIHsgY29kZTogXCJ1clwiLCBkaXNwbGF5OiBcItin2LHYr9mIXCIgfSxcbiAgeyBjb2RlOiBcInV6XCIsIGRpc3BsYXk6IFwi0I7Qt9Cx0LXQulwiIH0sXG4gIHsgY29kZTogXCJ2ZVwiLCBkaXNwbGF5OiBcIlRzaGl2ZW7huJNhXCIgfSxcbiAgeyBjb2RlOiBcInZlY1wiLCBkaXNwbGF5OiBcIlbDqG5ldG9cIiB9LFxuICB7IGNvZGU6IFwidmlcIiwgZGlzcGxheTogXCJWaeG7h3RuYW1cIiB9LFxuICB7IGNvZGU6IFwidmxzXCIsIGRpc3BsYXk6IFwiV2VzdC1WbGFvbXNcIiB9LFxuICB7IGNvZGU6IFwidm9cIiwgZGlzcGxheTogXCJWb2xhcMO8a1wiIH0sXG4gIHsgY29kZTogXCJ3YVwiLCBkaXNwbGF5OiBcIldhbG9uXCIgfSxcbiAgeyBjb2RlOiBcIndhclwiLCBkaXNwbGF5OiBcIldpbmFyYXnCoC8gQmluaXNheWEgTGluZXl0ZS1TYW1hcm5vblwiIH0sXG4gIHsgY29kZTogXCJ3b1wiLCBkaXNwbGF5OiBcIldvbGxvZlwiIH0sXG4gIHsgY29kZTogXCJ4YWxcIiwgZGlzcGxheTogXCLQpdCw0LvRjNC80LNcIiB9LFxuICB7IGNvZGU6IFwieGhcIiwgZGlzcGxheTogXCJpc2lYaG9zYVwiIH0sXG4gIHsgY29kZTogXCJ4bWZcIiwgZGlzcGxheTogXCLhg5vhg5Dhg6Dhg5Lhg5Dhg5rhg6Phg6Dhg5hcIiB9LFxuICB7IGNvZGU6IFwieWlcIiwgZGlzcGxheTogXCLXmdeZ1rTXk9eZ16lcIiB9LFxuICB7IGNvZGU6IFwieW9cIiwgZGlzcGxheTogXCJZb3LDuWLDoVwiIH0sXG4gIHsgY29kZTogXCJ5dWVcIiwgZGlzcGxheTogXCLnsrXoqp5cIiB9LFxuICB7IGNvZGU6IFwiemFcIiwgZGlzcGxheTogXCJDdWVuZ2jCoC8gVMO0w7TCoC8g5aOu6K+tXCIgfSxcbiAgeyBjb2RlOiBcInpoXCIsIGRpc3BsYXk6IFwi5Lit5paHXCIgfSxcbiAgeyBjb2RlOiBcInpoLWNsYXNzaWNhbFwiLCBkaXNwbGF5OiBcIuaWh+iogFwiIH0sXG4gIHsgY29kZTogXCJ6aC1oYW5zXCIsIGRpc3BsYXk6IFwi5Lit5paHICjnroDkvZMpXCIgfSxcbiAgeyBjb2RlOiBcInpoLWhhbnRcIiwgZGlzcGxheTogXCLkuK3mlocgKOe5gemrlClcIiB9LFxuICB7IGNvZGU6IFwiemgtbWluLW5hblwiLCBkaXNwbGF5OiBcIkLDom4tbMOibS1nw7pcIiB9LFxuICB7IGNvZGU6IFwiemgtdHdcIiwgZGlzcGxheTogXCLigKrkuK3mloco5Y+w54GjKeKArFwiIH0sXG4gIHsgY29kZTogXCJ6aC15dWVcIiwgZGlzcGxheTogXCLnsrXoqp7CoC8g57Kk6K+tXCIgfSxcbiAgeyBjb2RlOiBcInp1XCIsIGRpc3BsYXk6IFwiaXNpWnVsdVwiIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gbGFuZ3VhZ2VWYWx1ZVRvRGlzcGxheSh2YWx1ZTogc3RyaW5nKSB7XG4gIGlmICghTnVtYmVyLmlzTmFOKE51bWJlci5wYXJzZUludCh2YWx1ZSwgMTApKSkge1xuICAgIHZhbHVlID0gXCJtdWxcIjtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2VBbGwoXCJfXCIsIFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgZm9yIChjb25zdCBsYW5ndWFnZSBvZiBsYW5ndWFnZXMpIHtcbiAgICBpZiAobGFuZ3VhZ2UuY29kZSA9PT0gdmFsdWUpIHJldHVybiBsYW5ndWFnZS5kaXNwbGF5O1xuICB9XG5cbiAgdmFsdWUgPSBleHRyYWN0TGFuZ3VhZ2VDb2RlRnJvbUxvY2FsKHZhbHVlKTtcbiAgZm9yIChjb25zdCBsYW5ndWFnZSBvZiBsYW5ndWFnZXMpIHtcbiAgICBpZiAobGFuZ3VhZ2UuY29kZSA9PT0gdmFsdWUpIHJldHVybiBsYW5ndWFnZS5kaXNwbGF5O1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0TGFuZ3VhZ2VDb2RlRnJvbUxvY2FsKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBtYXRjaCA9IC8oXFx3KykvZy5leGVjKHZhbHVlKTtcbiAgaWYgKG1hdGNoKSByZXR1cm4gbWF0Y2hbMV07XG4gIHJldHVybiB2YWx1ZTtcbn1cbiIsIi8vIENvcHlyaWdodCAoQykgMjAyMCBNYXJrdXMgUGVsb3NvXG4vL1xuLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgT1NNIEFwcHMgQ2F0YWxvZy5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4vLyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbi8vIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vL1xuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy9cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCBPU00gQXBwcyBDYXRhbG9nLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5mdW5jdGlvbiBpc092ZXJmbG93bihlbGVtZW50OiBFbGVtZW50KSB7XG4gIHJldHVybiAoXG4gICAgZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBlbGVtZW50LmNsaWVudEhlaWdodCB8fFxuICAgIGVsZW1lbnQuc2Nyb2xsV2lkdGggPiBlbGVtZW50LmNsaWVudFdpZHRoXG4gICk7XG59XG5cbmxldCBzY3JvbGxMZWZ0ID0gMDtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhenlJbml0TW9yZShyZXNldD86IGJvb2xlYW4pIHtcbiAgaWYgKHJlc2V0KSB7XG4gICAgc2Nyb2xsTGVmdCA9IDA7XG4gIH1cblxuICBjb25zdCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKSBhcyBIVE1MRGl2RWxlbWVudDtcblxuICBpZiAoIWNvbnRlbnRFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKFxuICAgIHNjcm9sbExlZnQgJiZcbiAgICBjb250ZW50RWxlbWVudC5zY3JvbGxMZWZ0IDwgc2Nyb2xsTGVmdCArIGNvbnRlbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNjcm9sbExlZnQgPSBjb250ZW50RWxlbWVudC5zY3JvbGxMZWZ0ICsgY29udGVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2NvbXBhcmUgLmR5bmFtaWMtbW9yZVwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IGVsZW1lbnRzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChib3VuZGluZ0NsaWVudFJlY3QubGVmdCA8IGNvbnRlbnRFbGVtZW50LmNsaWVudFdpZHRoICogMykge1xuICAgICAgaWYgKGlzT3ZlcmZsb3duKGVsZW1lbnRzW2ldKSkge1xuICAgICAgICBlbGVtZW50c1tpXS5jbGFzc0xpc3QuYWRkKFwibW9yZVwiKTtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiZmFkZS1vdXRcIik7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgPVxuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Jm1kYXNoOyBNb3JlICZtZGFzaDs8L3NwYW4+PC9kaXY+JztcbiAgICAgICAgZWxlbWVudHNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAgICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICB2YXIgaCA9IHRoaXMucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBoLnN0eWxlLmhlaWdodCA9IGguc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBoLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiO1xuICAgICAgICAgIH0sIDEyMDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJkeW5hbWljLW1vcmVcIik7XG4gICAgfVxuICB9XG59XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICBsYXp5SW5pdE1vcmUoKTtcbn0pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpPy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIGxhenlJbml0TW9yZSgpO1xufSk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICBsYXp5SW5pdE1vcmUoKTtcbn0pO1xuIiwiLy8gQ29weXJpZ2h0IChDKSAyMDIwIE1hcmt1cyBQZWxvc29cbi8vXG4vLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBPU00gQXBwcyBDYXRhbG9nLlxuLy9cbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbi8vIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuLy8gTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vL1xuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIE9TTSBBcHBzIENhdGFsb2cuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmxldCBzY3JvbGxUb3AgPSAwO1xubGV0IHNjcm9sbExlZnQgPSAwO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGF6eUxvYWRJbWFnZXMocmVzZXQ/OiBib29sZWFuKSB7XG4gIGlmIChyZXNldCkge1xuICAgIHNjcm9sbFRvcCA9IDA7XG4gICAgc2Nyb2xsTGVmdCA9IDA7XG4gIH1cblxuICBjb25zdCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKSBhcyBIVE1MRGl2RWxlbWVudDtcblxuICBpZiAoIWNvbnRlbnRFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKFxuICAgICFzY3JvbGxUb3AgfHxcbiAgICBjb250ZW50RWxlbWVudC5zY3JvbGxUb3AgPiBzY3JvbGxUb3AgKyBjb250ZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgKSB7XG4gICAgc2Nyb2xsVG9wID0gY29udGVudEVsZW1lbnQuc2Nyb2xsVG9wICsgY29udGVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2xpc3QgKltkeW5hbWljLXNyY11cIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gZWxlbWVudHNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoXG4gICAgICAgIGVsZW1lbnRzW2ldLmhhc0F0dHJpYnV0ZShcImR5bmFtaWMtc3JjXCIpICYmXG4gICAgICAgIGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgPCBjb250ZW50RWxlbWVudD8uY2xpZW50SGVpZ2h0ICogM1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSAoZWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKFwiZHluYW1pYy1zcmNcIikgfHwgXCJcIikuc3BsaXQoXG4gICAgICAgICAgXCIgXCJcbiAgICAgICAgKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNyYyBvZiBzb3VyY2VzKSB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY29udGFpbnMoZWxlbWVudHNbaV0pICYmIChhd2FpdCBpc0ltYWdlKHNyYykpKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50c1tpXS5yZW1vdmVBdHRyaWJ1dGUoXCJkeW5hbWljLXNyY1wiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoXG4gICAgIXNjcm9sbExlZnQgfHxcbiAgICBjb250ZW50RWxlbWVudC5zY3JvbGxMZWZ0ID4gc2Nyb2xsTGVmdCArIGNvbnRlbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gICkge1xuICAgIHNjcm9sbExlZnQgPSBjb250ZW50RWxlbWVudC5zY3JvbGxMZWZ0ICsgY29udGVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjY29tcGFyZSAqW2R5bmFtaWMtc3JjXVwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSBlbGVtZW50c1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmIChcbiAgICAgICAgZWxlbWVudHNbaV0uaGFzQXR0cmlidXRlKFwiZHluYW1pYy1zcmNcIikgJiZcbiAgICAgICAgYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgPCBjb250ZW50RWxlbWVudD8uY2xpZW50V2lkdGggKiAyXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IChlbGVtZW50c1tpXS5nZXRBdHRyaWJ1dGUoXCJkeW5hbWljLXNyY1wiKSB8fCBcIlwiKS5zcGxpdChcbiAgICAgICAgICBcIiBcIlxuICAgICAgICApO1xuXG4gICAgICAgIGZvciAoY29uc3Qgc3JjIG9mIHNvdXJjZXMpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQuYm9keS5jb250YWlucyhlbGVtZW50c1tpXSkgJiYgKGF3YWl0IGlzSW1hZ2Uoc3JjKSkpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnRzW2ldLnJlbW92ZUF0dHJpYnV0ZShcImR5bmFtaWMtc3JjXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpPy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgbGF6eUxvYWRJbWFnZXMoKTtcbn0pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpPy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIGxhenlMb2FkSW1hZ2VzKCk7XG59KTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gIGxhenlMb2FkSW1hZ2VzKCk7XG59KTtcblxuYXN5bmMgZnVuY3Rpb24gaXNJbWFnZShzcmM6IHN0cmluZykge1xuICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbiAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsICgpID0+IHtcbiAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgIH0pO1xuICAgIGltZy5zcmMgPSBzcmM7XG4gICAgaWYgKGltZy5jb21wbGV0ZSkgcmVzb2x2ZSh0cnVlKTtcbiAgfSk7XG59XG4iLCIvLyBDb3B5cmlnaHQgKEMpIDIwMjAgTWFya3VzIFBlbG9zb1xuLy9cbi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE9TTSBBcHBzIENhdGFsb2cuXG4vL1xuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuLy8gcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlXG4vLyBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuLy9cbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbi8vXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggT1NNIEFwcHMgQ2F0YWxvZy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuaW1wb3J0IHsgZXF1YWxzSWdub3JlQ2FzZSB9IGZyb20gXCIuL3V0aWxpdGllcy9zdHJpbmdcIjtcblxuY29uc3QgcGxhdGZvcm1zOiB7XG4gIG5hbWU6IHN0cmluZztcbiAgc3lub255bTogc3RyaW5nW107XG4gIHZlcnNpb246IHsgbmFtZTogc3RyaW5nOyBzeW5vbnltOiBzdHJpbmdbXSB9W107XG59W10gPSBbXG4gIHtcbiAgICBuYW1lOiBcIkxpbnV4XCIsXG4gICAgc3lub255bTogW1wibGludXhcIl0sXG4gICAgdmVyc2lvbjogW1xuICAgICAgeyBuYW1lOiBcIk9wZW5tb2tvIExpbnV4XCIsIHN5bm9ueW06IFtcIm9wZW5tb2tvXCIsIFwib3Blbm1va28gbGludXhcIl0gfSxcbiAgICBdLFxuICB9LFxuICB7IG5hbWU6IFwiQW5kcm9pZFwiLCBzeW5vbnltOiBbXCJhbmRyb2lkXCJdLCB2ZXJzaW9uOiBbXSB9LFxuICB7IG5hbWU6IFwiRmlyZWZveCBPU1wiLCBzeW5vbnltOiBbXCJmaXJlZm94IG9zXCIsIFwiZmlyZWZveG9zXCJdLCB2ZXJzaW9uOiBbXSB9LFxuICB7IG5hbWU6IFwiTWFlbW9cIiwgc3lub255bTogW1wibWFlbW9cIl0sIHZlcnNpb246IFtdIH0sXG4gIHsgbmFtZTogXCJNZWVHb1wiLCBzeW5vbnltOiBbXCJtZWVnb1wiXSwgdmVyc2lvbjogW10gfSxcbiAgeyBuYW1lOiBcIlRpemVuXCIsIHN5bm9ueW06IFtcInRpemVuXCJdLCB2ZXJzaW9uOiBbXSB9LFxuICB7IG5hbWU6IFwiV2ViT1NcIiwgc3lub255bTogW1wid2Vib3NcIl0sIHZlcnNpb246IFtdIH0sXG4gIHtcbiAgICBuYW1lOiBcImlPU1wiLFxuICAgIHN5bm9ueW06IFtcImlvc1wiXSxcbiAgICB2ZXJzaW9uOiBbXG4gICAgICB7IG5hbWU6IFwiaVBob25lXCIsIHN5bm9ueW06IFtcImlwaG9uZVwiXSB9LFxuICAgICAgeyBuYW1lOiBcImlQYWRcIiwgc3lub255bTogW1wiaXBhZFwiXSB9LFxuICAgICAgeyBuYW1lOiBcImlQb2QgdG91Y2hcIiwgc3lub255bTogW1wiaXBvZCB0b3VjaFwiLCBcImlwb2RcIl0gfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJNYWNPU1wiLFxuICAgIHN5bm9ueW06IFtcIm1hY29zXCIsIFwibWFjXCIsIFwibWFjIG9zXCIsIFwib3MgeFwiLCBcIm9zeFwiLCBcIm1hYyBvcyB4XCIsIFwibWFjb3N4XCJdLFxuICAgIHZlcnNpb246IFtdLFxuICB9LFxuICB7IG5hbWU6IFwiVW5peFwiLCBzeW5vbnltOiBbXCJ1bml4XCJdLCB2ZXJzaW9uOiBbXSB9LFxuICB7IG5hbWU6IFwiQmFkYSBPU1wiLCBzeW5vbnltOiBbXCJiYWRhXCJdLCB2ZXJzaW9uOiBbXSB9LFxuICB7IG5hbWU6IFwiQlNEXCIsIHN5bm9ueW06IFtcImJzZFwiXSwgdmVyc2lvbjogW10gfSxcbiAgeyBuYW1lOiBcIkZyZWVCU0RcIiwgc3lub255bTogW1wiZnJlZWJzZFwiXSwgdmVyc2lvbjogW10gfSxcbiAge1xuICAgIG5hbWU6IFwiQW1pZ2EgT1NcIixcbiAgICBzeW5vbnltOiBbXCJhbWlnYW9zXCIsIFwiYW1pZ2Egb3NcIiwgXCJhbWlnYVwiXSxcbiAgICB2ZXJzaW9uOiBbXG4gICAgICB7IG5hbWU6IFwiTW9ycGhPU1wiLCBzeW5vbnltOiBbXCJtb3JwaG9zXCJdIH0sXG4gICAgICB7IG5hbWU6IFwiQXJPU1wiLCBzeW5vbnltOiBbXCJhcm9zXCJdIH0sXG4gICAgXSxcbiAgfSxcblxuICB7IG5hbWU6IFwiV2luZG93cyBDRVwiLCBzeW5vbnltOiBbXCJ3aW5kb3dzIGNlXCIsIFwid2luY2VcIl0sIHZlcnNpb246IFtdIH0sXG4gIHtcbiAgICBuYW1lOiBcIldpbmRvd3MgTW9iaWxlXCIsXG4gICAgc3lub255bTogW1wid2luZG93cyBtb2JpbGVcIiwgXCJ3bVwiXSxcbiAgICB2ZXJzaW9uOiBbXG4gICAgICB7IG5hbWU6IFwiV2luZG93cyBNb2JpbGUgNVwiLCBzeW5vbnltOiBbXCJ3aW5kb3dzIG1vYmlsZSA1XCIsIFwid201XCJdIH0sXG4gICAgICB7IG5hbWU6IFwiV2luZG93cyBNb2JpbGUgNlwiLCBzeW5vbnltOiBbXCJ3aW5kb3dzIG1vYmlsZSA2XCIsIFwid202XCJdIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiV2luZG93cyBNb2JpbGUgMjAwMFwiLFxuICAgICAgICBzeW5vbnltOiBbXCJ3aW5kb3dzIG1vYmlsZSAyMDAwXCIsIFwid20yMDAwXCJdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJXaW5kb3dzIE1vYmlsZSAyMDAzXCIsXG4gICAgICAgIHN5bm9ueW06IFtcIndpbmRvd3MgbW9iaWxlIDIwMDNcIiwgXCJ3bTIwMDNcIl0sXG4gICAgICB9LFxuICAgICAgeyBuYW1lOiBcIlBvY2tldCBQQ1wiLCBzeW5vbnltOiBbXCJwb2NrZXQgcGNcIiwgXCJwb2NrZXRwY1wiXSB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIldpbmRvd3MgUGhvbmVcIixcbiAgICBzeW5vbnltOiBbXCJ3aW5kb3dzIHBob25lXCIsIFwid2luZG93cyBwaG9uZSAxMFwiXSxcbiAgICB2ZXJzaW9uOiBbXSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiV2luZG93c1wiLFxuICAgIHN5bm9ueW06IFtcIndpbmRvd3NcIiwgXCJ3aW5cIl0sXG4gICAgdmVyc2lvbjogW1xuICAgICAgeyBuYW1lOiBcIldpbmRvd3MgWFBcIiwgc3lub255bTogW1wid2luZG93cyB4cFwiLCBcIndpbnhwXCJdIH0sXG4gICAgICB7IG5hbWU6IFwiV2luZG93cyAyMDAwXCIsIHN5bm9ueW06IFtcIndpbmRvd3MgMjAwMFwiLCBcIndpbjJrXCJdIH0sXG4gICAgICB7IG5hbWU6IFwiV2luZG93cyBWaXN0YVwiLCBzeW5vbnltOiBbXCJ3aW5kb3dzIHZpc3RhXCIsIFwidmlzdGFcIl0gfSxcbiAgICAgIHsgbmFtZTogXCJXaW5kb3dzIDdcIiwgc3lub255bTogW1wid2luZG93cyA3XCIsIFwid2luN1wiXSB9LFxuICAgICAgeyBuYW1lOiBcIldpbmRvd3MgOFwiLCBzeW5vbnltOiBbXCJ3aW5kb3dzIDhcIiwgXCJ3aW44XCJdIH0sXG4gICAgICB7IG5hbWU6IFwiV2luZG93cyA4LjFcIiwgc3lub255bTogW1wid2luZG93cyA4LjFcIiwgXCJ3aW44LjFcIl0gfSxcbiAgICAgIHsgbmFtZTogXCJXaW5kb3dzIDEwXCIsIHN5bm9ueW06IFtcIndpbmRvd3MgMTBcIiwgXCJ3aW4xMFwiXSB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkJsYWNrQmVycnkgT1NcIixcbiAgICBzeW5vbnltOiBbXCJibGFja2JlcnJ5IG9zXCIsIFwiYmxhY2tiZXJyeVwiLCBcImJib3NcIl0sXG4gICAgdmVyc2lvbjogW10sXG4gIH0sXG4gIHsgbmFtZTogXCJCcmV3XCIsIHN5bm9ueW06IFtcImJyZXdcIl0sIHZlcnNpb246IFtdIH0sXG4gIHsgbmFtZTogXCJQYWxtIE9TXCIsIHN5bm9ueW06IFtcInBhbG1cIiwgXCJwYWxtIG9zXCIsIFwicGFsbW9zXCJdLCB2ZXJzaW9uOiBbXSB9LFxuICB7IG5hbWU6IFwiU3ltYmlhblwiLCBzeW5vbnltOiBbXCJzeW1iaWFuXCIsIFwiczYwXCJdLCB2ZXJzaW9uOiBbXSB9LFxuICB7XG4gICAgbmFtZTogXCJDcm9zcy1wbGF0Zm9ybVwiLFxuICAgIHN5bm9ueW06IFtcImNyb3NzLXBsYXRmb3JtXCIsIFwiY3Jvc3MgcGxhdGZvcm1cIl0sXG4gICAgdmVyc2lvbjogW10sXG4gIH0sXG4gIHsgbmFtZTogXCJKYXZhIE1FXCIsIHN5bm9ueW06IFtcImoybWVcIiwgXCJqYXZhIG1lXCJdLCB2ZXJzaW9uOiBbXSB9LFxuICB7IG5hbWU6IFwiSmF2YSBTRVwiLCBzeW5vbnltOiBbXCJqMnNlXCIsIFwiamF2YSBzZVwiXSwgdmVyc2lvbjogW10gfSxcbiAgeyBuYW1lOiBcIkphdmFcIiwgc3lub255bTogW1wiamF2YVwiXSwgdmVyc2lvbjogW10gfSxcbiAgeyBuYW1lOiBcIk5vZGUuanNcIiwgc3lub255bTogW1wibm9kZVwiLCBcIm5vZGUuanNcIl0sIHZlcnNpb246IFtdIH0sXG4gIHsgbmFtZTogXCJRdFwiLCBzeW5vbnltOiBbXCJxdFwiXSwgdmVyc2lvbjogW10gfSxcbiAgeyBuYW1lOiBcIlJlYWN0IE5hdGl2ZVwiLCBzeW5vbnltOiBbXCJyZWFjdCBuYXRpdmVcIl0sIHZlcnNpb246IFtdIH0sXG4gIHsgbmFtZTogXCJVbml0eVwiLCBzeW5vbnltOiBbXCJ1bml0eVwiXSwgdmVyc2lvbjogW10gfSxcbiAge1xuICAgIG5hbWU6IFwiV2ViXCIsXG4gICAgc3lub255bTogW1wid2ViXCIsIFwid2ViLWJhc2VkXCIsIFwid2ViYXBwXCIsIFwid2ViLWFwcFwiLCBcImJyb3dzZXJcIl0sXG4gICAgdmVyc2lvbjogW10sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlNvZnR3YXJlIGZvciBtaXNjZWxsYW5lb3VzIHBsYXRmb3Jtc1wiLFxuICAgIHN5bm9ueW06IFtcIm90aGVyXCJdLFxuICAgIHZlcnNpb246IFtdLFxuICB9LFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXRmb3JtVmFsdWVUb0Rpc3BsYXkodmFsdWU6IHN0cmluZykge1xuICBmb3IgKGNvbnN0IHBsYXRmb3JtIG9mIHBsYXRmb3Jtcykge1xuICAgIGZvciAoY29uc3QgdmVyc2lvbiBvZiBwbGF0Zm9ybS52ZXJzaW9uKSB7XG4gICAgICBpZiAodmVyc2lvbi5zeW5vbnltLmZpbHRlcigocykgPT4gZXF1YWxzSWdub3JlQ2FzZShzLCB2YWx1ZSkpLmxlbmd0aCA+IDApXG4gICAgICAgIHJldHVybiBwbGF0Zm9ybS5uYW1lO1xuICAgIH1cblxuICAgIGlmIChwbGF0Zm9ybS5zeW5vbnltLmZpbHRlcigocykgPT4gZXF1YWxzSWdub3JlQ2FzZShzLCB2YWx1ZSkpLmxlbmd0aCA+IDApXG4gICAgICByZXR1cm4gcGxhdGZvcm0ubmFtZTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG4iLCJpbXBvcnQgeyBMb2NhbGl6ZWRWYWx1ZSB9IGZyb20gXCIuL2dldExvY2FsaXplZFZhbHVlXCI7XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZURhdGE6IHtcbiAgcGFyYW1zOiB7XG4gICAgW3BhcmFtOiBzdHJpbmddOiB7XG4gICAgICBsYWJlbD86IExvY2FsaXplZFZhbHVlO1xuICAgICAgdHlwZT86IHN0cmluZztcbiAgICAgIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgICAgIHN1Z2dlc3RlZD86IGJvb2xlYW47XG4gICAgICBkZXNjcmlwdGlvbj86IExvY2FsaXplZFZhbHVlO1xuICAgICAgZXhhbXBsZT86IExvY2FsaXplZFZhbHVlO1xuICAgICAgZGVmYXVsdD86IHN0cmluZztcbiAgICAgIGF1dG92YWx1ZT86IHN0cmluZztcbiAgICAgIHN1Z2dlc3RlZHZhbHVlcz86IHN0cmluZ1tdO1xuICAgICAgYWxpYXNlcz86IHN0cmluZ1tdO1xuICAgICAgZGVwcmVjYXRlZD86IGJvb2xlYW47XG4gICAgfTtcbiAgfTtcbiAgcGFyYW1PcmRlcjogc3RyaW5nW107XG4gIGZvcm1hdD86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG59ID0ge1xuICBwYXJhbXM6IHtcbiAgICBsYW5nOiB7XG4gICAgICBsYWJlbDoge1xuICAgICAgICBkZTogXCJTcHJhY2hlIGRlciBWb3JsYWdlXCIsXG4gICAgICAgIGVuOiBcIlRlbXBsYXRlIGxhbmd1YWdlXCIsXG4gICAgICAgIFwiemgtaGFuc1wiOiBcIuaooeadv+ivreiogFwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICBkZTogXCJTcHJhY2hlLCBpbiBkZXIgZGllIFRleHRlIGRlciBWb3JsYWdlIGFuZ2V6ZWlndCB3ZXJkZW5cIixcbiAgICAgIH0sXG4gICAgICBleGFtcGxlOiB7XG4gICAgICAgIGRlOiBcImRlXCIsXG4gICAgICAgIGVuOiBcImVuXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiTmFtZVwiLFxuICAgICAgICBkZTogXCJOYW1lXCIsXG4gICAgICAgIFwiemgtaGFuc1wiOiBcIuWQjeensFwiLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIGVuOiBcIk9mZmljaWFsIG5hbWUsIG90aGVyd2lzZSBtb3N0IGNvbW1vbiBvbmVcIixcbiAgICAgICAgZGU6IFwiT2ZmaXppZWxsZXIgTmFtZSwgYW5zb25zdGVuIGRlciB2ZXJicmVpdGV0c3RlXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgYXV0b3ZhbHVlOiBcInt7c3Vic3Q6UEFHRU5BTUV9fVwiLFxuICAgIH0sXG4gICAgc3RhdHVzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJDdXJyZW50IHN0YXR1cyBvZiB0aGUgcHJvamVjdC5cIixcbiAgICAgIGxhYmVsOiBcIlN0YXR1c1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJhY3RpdmVcIiwgXCJ1bm1haW50YWluZWRcIiwgXCJicm9rZW5cIiwgXCJ1bmZpbmlzaGVkXCJdLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIGRlZmF1bHQ6IFwiYWN0aXZlXCIsXG4gICAgICBzdWdnZXN0ZWQ6IHRydWUsXG4gICAgfSxcbiAgICBsaWNlbnNlOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJXaGF0IGZyZWUgbGljZW5zZSBvciBwcm9wcmlldGFyeT9cIixcbiAgICAgIGV4YW1wbGU6IFwiR1BMXCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJMaWNlbnNlXCIsXG4gICAgICAgIGRlOiBcIkxpemVuelwiLFxuICAgICAgfSxcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wiR1BMXCIsIFwiQlNEXCIsIFwiTUlUXCIsIFwiZnJlZVwiLCBcInByb3ByaWV0YXJ5XCIsIFwiQUdQTFwiXSxcbiAgICB9LFxuICAgIHByaWNlOiB7XG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgXCJDb3N0cyBpZiBwcm9wcmlldGFyeS4gSWYgcHJpY2UgaXMgZW1wdHksIGFwcGxpY2F0aW9uIGlzIGZvciBmcmVlLlwiLFxuICAgICAgZXhhbXBsZTogXCJmcmVlOzIwJDszNeKCrDtpbi1hcHAgcHVyY2hhc2VzXCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJQcmljZVwiLFxuICAgICAgICBkZTogXCJQcmVpc1wiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcImZyZWVcIiwgXCJpbi1hcHAgcHVyY2hhc2VzXCJdLFxuICAgIH0sXG4gICAgd2ViOiB7XG4gICAgICBsYWJlbDogXCJXZWIgYWRkcmVzc1wiLFxuICAgICAgZXhhbXBsZTogXCJodHRwczovL3d3dy5leGFtcGxlLm9yZ1wiLFxuICAgICAgc3VnZ2VzdGVkOiB0cnVlLFxuICAgICAgdHlwZTogXCJ1cmxcIixcbiAgICB9LFxuICAgIHJlcG86IHtcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGRlOiBcIlF1ZWxsY29kZVwiLFxuICAgICAgICBlbjogXCJTb3VyY2UgY29kZVwiLFxuICAgICAgICBcInpoLWhhbnNcIjogXCLmupDku6PnoIFcIixcbiAgICAgIH0sXG4gICAgICBhbGlhc2VzOiBbXCJnaXRcIiwgXCJzdm5cIl0sXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgXCJVUkwgdG8gdmlldyBvciBkb3dubG9hZCB0aGUgc291cmNlIGNvZGUgKGZvciBleGFtcGxlLCBhIEdpdCwgU3VidmVyc2lvbiwgb3IgQ1ZTIHJlcG9zaXRvcnkpXCIsXG4gICAgICBleGFtcGxlOiBcImh0dHBzOi8vZ2l0LmV4YW1wbGUub3JnXCIsXG4gICAgICB0eXBlOiBcInVybFwiLFxuICAgIH0sXG4gICAgbG9nbzoge1xuICAgICAgbGFiZWw6IFwiTG9nb1wiLFxuICAgICAgZXhhbXBsZTogXCJ4eXoucG5nXCIsXG4gICAgICB0eXBlOiBcIndpa2ktZmlsZS1uYW1lXCIsXG4gICAgfSxcbiAgICBzY3JlZW5zaG90OiB7XG4gICAgICBsYWJlbDoge1xuICAgICAgICBkZTogXCJCaWxkc2NoaXJtZm90b1wiLFxuICAgICAgICBlbjogXCJTY3JlZW5zaG90XCIsXG4gICAgICAgIFwiemgtaGFuc1wiOiBcIuaIquWbvlwiLFxuICAgICAgfSxcbiAgICAgIHN1Z2dlc3RlZDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwid2lraS1maWxlLW5hbWVcIixcbiAgICAgIGV4YW1wbGU6IFwieHl6LmpwZ1wiLFxuICAgIH0sXG4gICAgZGVzY3JpcHRpb246IHtcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGRlOiBcIkJlc2NocmVpYnVuZ1wiLFxuICAgICAgICBlbjogXCJEZXNjcmlwdGlvblwiLFxuICAgICAgICBcInpoLWhhbnNcIjogXCLmj4/ov7BcIixcbiAgICAgIH0sXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkOiB0cnVlLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiQnJpZWYgZGVzY3JpcHRpb24uIFdoYXQgZGlzdGluZ3Vpc2hlcyB0aGlzIGZyb20gb3RoZXIgdG9vbHM/IChXcml0ZSB5b3VyIG93biBkZXNjcmlwdGlvbiwgZG9uJ3QganVzdCBjb3B5IGl0IGZyb20gdGhlIHdlYnNpdGUpXCIsXG4gICAgICBleGFtcGxlOiBcIkVhc3kgdG8gdXNlLCBuaWNlIFVJXCIsXG4gICAgfSxcbiAgICBhdXRob3I6IHtcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGRlOiBcIkF1dG9yXCIsXG4gICAgICAgIGVuOiBcIkF1dGhvclwiLFxuICAgICAgICBcInpoLWhhbnNcIjogXCLkvZzogIVcIixcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICBkZTogXCJOYW1lIGRlcyBBdXRvcnMvZGVyIEF1dG9yaW4gb2RlciBlaW4gTGluayB6dSBkZXNzZW4vZGVyZW4gT1NNLVdpa2ktQmVudXR6ZXJzZWl0ZVwiLFxuICAgICAgICBlbjogXCJOYW1lIG9mIHRoZSBhdXRob3Igb3IgYSBsaW5rIHRvIHRoZWlyIE9TTS13aWtpIHVzZXIgcGFnZVwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWQ6IHRydWUsXG4gICAgfSxcbiAgICBwbGF0Zm9ybToge1xuICAgICAgZGVzY3JpcHRpb246IFwiTGlzdCBvZiBwbGF0Zm9ybXMgaXQgcnVucyBvbi5cIixcbiAgICAgIHN1Z2dlc3RlZDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcbiAgICAgICAgXCJMaW51eFwiLFxuICAgICAgICBcIkFuZHJvaWRcIixcbiAgICAgICAgXCJGaXJlZm94IE9TXCIsXG4gICAgICAgIFwiTWFlbW9cIixcbiAgICAgICAgXCJNZWVHb1wiLFxuICAgICAgICBcIk9wZW5tb2tvIExpbnV4XCIsXG4gICAgICAgIFwiVGl6ZW5cIixcbiAgICAgICAgXCJXZWJPU1wiLFxuICAgICAgICBcImlPU1wiLFxuICAgICAgICBcImlQaG9uZVwiLFxuICAgICAgICBcImlQYWRcIixcbiAgICAgICAgXCJpUG9kIHRvdWNoXCIsXG4gICAgICAgIFwibWFjT1NcIixcbiAgICAgICAgXCJVbml4XCIsXG4gICAgICAgIFwiQmFkYSBPU1wiLFxuICAgICAgICBcIkJTRFwiLFxuICAgICAgICBcIkZyZWVCU0RcIixcbiAgICAgICAgXCJBbWlnYSBPU1wiLFxuICAgICAgICBcIk1vcnBoT1NcIixcbiAgICAgICAgXCJBck9TXCIsXG4gICAgICAgIFwiV2luZG93c1wiLFxuICAgICAgICBcIldpbmRvd3MgWFBcIixcbiAgICAgICAgXCJXaW5kb3dzIDIwMDBcIixcbiAgICAgICAgXCJXaW5kb3dzIFZpc3RhXCIsXG4gICAgICAgIFwiV2luZG93cyA3XCIsXG4gICAgICAgIFwiV2luZG93cyA4XCIsXG4gICAgICAgIFwiV2luZG93cyA4LjFcIixcbiAgICAgICAgXCJXaW5kb3dzIDEwXCIsXG4gICAgICAgIFwiV2luZG93cyBDRVwiLFxuICAgICAgICBcIldpbmRvd3MgTW9iaWxlXCIsXG4gICAgICAgIFwiV2luZG93cyBNb2JpbGUgNVwiLFxuICAgICAgICBcIldpbmRvd3MgTW9iaWxlIDZcIixcbiAgICAgICAgXCJXaW5kb3dzIE1vYmlsZSAyMDAwXCIsXG4gICAgICAgIFwiV2luZG93cyBNb2JpbGUgMjAwM1wiLFxuICAgICAgICBcIlBvY2tldCBQQ1wiLFxuICAgICAgICBcIldpbmRvd3MgUGhvbmVcIixcbiAgICAgICAgXCJCbGFja0JlcnJ5IE9TXCIsXG4gICAgICAgIFwiQnJld1wiLFxuICAgICAgICBcIlBhbG0gT1NcIixcbiAgICAgICAgXCJTeW1iaWFuXCIsXG4gICAgICAgIFwiQ3Jvc3MtcGxhdGZvcm1cIixcbiAgICAgICAgXCJKYXZhXCIsXG4gICAgICAgIFwiSmF2YSBNRVwiLFxuICAgICAgICBcIkphdmEgU0VcIixcbiAgICAgICAgXCJOb2RlLmpzXCIsXG4gICAgICAgIFwiUXRcIixcbiAgICAgICAgXCJSZWFjdCBOYXRpdmVcIixcbiAgICAgICAgXCJVbml0eVwiLFxuICAgICAgICBcIldlYlwiLFxuICAgICAgXSxcbiAgICAgIGV4YW1wbGU6IFwiQW5kcm9pZDtpT1NcIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIlN1cHBvcnRlZCBwbGF0Zm9ybXNcIixcbiAgICAgICAgZGU6IFwiUGxhdHRmb3JtXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgZ2VucmU6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIk1haW4gY2F0ZWdvcnkgZm9yIHRoaXMgdG9vbC5cIixcbiAgICAgIHN1Z2dlc3RlZDogdHJ1ZSxcbiAgICAgIGxhYmVsOiBcIkdlbnJlXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcbiAgICAgICAgXCJkaXNwbGF5XCIsXG4gICAgICAgIFwibmF2aVwiLFxuICAgICAgICBcImxvZ2dlclwiLFxuICAgICAgICBcInJvdXRlclwiLFxuICAgICAgICBcImVkaXRvclwiLFxuICAgICAgICBcInJlbmRlcmVyXCIsXG4gICAgICAgIFwiY29udmVydGVyXCIsXG4gICAgICAgIFwiYW5hbHlzZXJcIixcbiAgICAgIF0sXG4gICAgfSxcbiAgICBsYW5ndWFnZXM6IHtcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICBcIlN1cHBvcnRlZCBsYW5ndWFnZXMgKGxpc3Qgb2YgdmFsaWQgbGFuZ3VhZ2UgY29kZXMgc2VwYXJhdGVkIGJ5IHNlbWljb2xvbnMpIG9yIG51bWJlciBvZiBsYW5ndWFnZXMgc3VwcG9ydGVkXCIsXG4gICAgICBleGFtcGxlOiBcIkRFO0VOO01VTFwiLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1xuICAgICAgICBcImFhXCIsXG4gICAgICAgIFwiYWJcIixcbiAgICAgICAgXCJhZlwiLFxuICAgICAgICBcImFrXCIsXG4gICAgICAgIFwiYWxzXCIsXG4gICAgICAgIFwiYW1cIixcbiAgICAgICAgXCJhblwiLFxuICAgICAgICBcImFuZ1wiLFxuICAgICAgICBcImFyXCIsXG4gICAgICAgIFwiYXJjXCIsXG4gICAgICAgIFwiYXNcIixcbiAgICAgICAgXCJhc3RcIixcbiAgICAgICAgXCJhdlwiLFxuICAgICAgICBcImF3YVwiLFxuICAgICAgICBcImF5XCIsXG4gICAgICAgIFwiYXpcIixcbiAgICAgICAgXCJiYVwiLFxuICAgICAgICBcImJhclwiLFxuICAgICAgICBcImJhdC1zbWdcIixcbiAgICAgICAgXCJiY2xcIixcbiAgICAgICAgXCJiZVwiLFxuICAgICAgICBcImJlLXgtb2xkXCIsXG4gICAgICAgIFwiYmdcIixcbiAgICAgICAgXCJiaFwiLFxuICAgICAgICBcImJpXCIsXG4gICAgICAgIFwiYm1cIixcbiAgICAgICAgXCJiblwiLFxuICAgICAgICBcImJvXCIsXG4gICAgICAgIFwiYnB5XCIsXG4gICAgICAgIFwiYnJcIixcbiAgICAgICAgXCJic1wiLFxuICAgICAgICBcImJ1Z1wiLFxuICAgICAgICBcImJ4clwiLFxuICAgICAgICBcImNhXCIsXG4gICAgICAgIFwiY2RvXCIsXG4gICAgICAgIFwiY2VcIixcbiAgICAgICAgXCJjZWJcIixcbiAgICAgICAgXCJjaFwiLFxuICAgICAgICBcImNob1wiLFxuICAgICAgICBcImNoclwiLFxuICAgICAgICBcImNoeVwiLFxuICAgICAgICBcImNsb3NlZC16aC10d1wiLFxuICAgICAgICBcImNvXCIsXG4gICAgICAgIFwiY3JcIixcbiAgICAgICAgXCJjc1wiLFxuICAgICAgICBcImNzYlwiLFxuICAgICAgICBcImN1XCIsXG4gICAgICAgIFwiY3ZcIixcbiAgICAgICAgXCJjeVwiLFxuICAgICAgICBcImRhXCIsXG4gICAgICAgIFwiZGVcIixcbiAgICAgICAgXCJkaXFcIixcbiAgICAgICAgXCJkc2JcIixcbiAgICAgICAgXCJkdlwiLFxuICAgICAgICBcImR6XCIsXG4gICAgICAgIFwiZWVcIixcbiAgICAgICAgXCJlbFwiLFxuICAgICAgICBcImVuXCIsXG4gICAgICAgIFwiZW9cIixcbiAgICAgICAgXCJlc1wiLFxuICAgICAgICBcImV0XCIsXG4gICAgICAgIFwiZXVcIixcbiAgICAgICAgXCJleHRcIixcbiAgICAgICAgXCJmYVwiLFxuICAgICAgICBcImZmXCIsXG4gICAgICAgIFwiZmlcIixcbiAgICAgICAgXCJmaXUtdnJvXCIsXG4gICAgICAgIFwiZmpcIixcbiAgICAgICAgXCJmb1wiLFxuICAgICAgICBcImZyXCIsXG4gICAgICAgIFwiZnJwXCIsXG4gICAgICAgIFwiZnVyXCIsXG4gICAgICAgIFwiZnlcIixcbiAgICAgICAgXCJnYVwiLFxuICAgICAgICBcImdhblwiLFxuICAgICAgICBcImdibVwiLFxuICAgICAgICBcImdjZlwiLFxuICAgICAgICBcImdkXCIsXG4gICAgICAgIFwiZ2lsXCIsXG4gICAgICAgIFwiZ2xcIixcbiAgICAgICAgXCJnblwiLFxuICAgICAgICBcImdvdFwiLFxuICAgICAgICBcImd1XCIsXG4gICAgICAgIFwiZ3ZcIixcbiAgICAgICAgXCJoYVwiLFxuICAgICAgICBcImhha1wiLFxuICAgICAgICBcImhhd1wiLFxuICAgICAgICBcImhlXCIsXG4gICAgICAgIFwiaGlcIixcbiAgICAgICAgXCJob1wiLFxuICAgICAgICBcImhyXCIsXG4gICAgICAgIFwiaHRcIixcbiAgICAgICAgXCJodVwiLFxuICAgICAgICBcImh5XCIsXG4gICAgICAgIFwiaHpcIixcbiAgICAgICAgXCJpYVwiLFxuICAgICAgICBcImlkXCIsXG4gICAgICAgIFwiaWVcIixcbiAgICAgICAgXCJpZ1wiLFxuICAgICAgICBcImlpXCIsXG4gICAgICAgIFwiaWtcIixcbiAgICAgICAgXCJpbG9cIixcbiAgICAgICAgXCJpbmhcIixcbiAgICAgICAgXCJpb1wiLFxuICAgICAgICBcImlzXCIsXG4gICAgICAgIFwiaXRcIixcbiAgICAgICAgXCJpdVwiLFxuICAgICAgICBcImphXCIsXG4gICAgICAgIFwiamJvXCIsXG4gICAgICAgIFwianZcIixcbiAgICAgICAgXCJrYVwiLFxuICAgICAgICBcImtnXCIsXG4gICAgICAgIFwia2h3XCIsXG4gICAgICAgIFwia2lcIixcbiAgICAgICAgXCJralwiLFxuICAgICAgICBcImtrXCIsXG4gICAgICAgIFwia2xcIixcbiAgICAgICAgXCJrbVwiLFxuICAgICAgICBcImtuXCIsXG4gICAgICAgIFwia29cIixcbiAgICAgICAgXCJrclwiLFxuICAgICAgICBcImtzXCIsXG4gICAgICAgIFwia3NoXCIsXG4gICAgICAgIFwia3VcIixcbiAgICAgICAgXCJrdlwiLFxuICAgICAgICBcImt3XCIsXG4gICAgICAgIFwia3lcIixcbiAgICAgICAgXCJsYVwiLFxuICAgICAgICBcImxhZFwiLFxuICAgICAgICBcImxhblwiLFxuICAgICAgICBcImxiXCIsXG4gICAgICAgIFwibGdcIixcbiAgICAgICAgXCJsaVwiLFxuICAgICAgICBcImxpalwiLFxuICAgICAgICBcImxtb1wiLFxuICAgICAgICBcImxuXCIsXG4gICAgICAgIFwibG9cIixcbiAgICAgICAgXCJsdFwiLFxuICAgICAgICBcImx2XCIsXG4gICAgICAgIFwibHp6XCIsXG4gICAgICAgIFwibWFuXCIsXG4gICAgICAgIFwibWFwLWJtc1wiLFxuICAgICAgICBcIm1nXCIsXG4gICAgICAgIFwibWhcIixcbiAgICAgICAgXCJtaVwiLFxuICAgICAgICBcIm1pblwiLFxuICAgICAgICBcIm1rXCIsXG4gICAgICAgIFwibWxcIixcbiAgICAgICAgXCJtblwiLFxuICAgICAgICBcIm1vXCIsXG4gICAgICAgIFwibXJcIixcbiAgICAgICAgXCJtcmhcIixcbiAgICAgICAgXCJtc1wiLFxuICAgICAgICBcIm10XCIsXG4gICAgICAgIFwibXVsXCIsXG4gICAgICAgIFwibXVzXCIsXG4gICAgICAgIFwibXdsXCIsXG4gICAgICAgIFwibXlcIixcbiAgICAgICAgXCJuYVwiLFxuICAgICAgICBcIm5haFwiLFxuICAgICAgICBcIm5hcFwiLFxuICAgICAgICBcIm5iXCIsXG4gICAgICAgIFwibmRcIixcbiAgICAgICAgXCJuZHNcIixcbiAgICAgICAgXCJuZHMtbmxcIixcbiAgICAgICAgXCJuZVwiLFxuICAgICAgICBcIm5ld1wiLFxuICAgICAgICBcIm5nXCIsXG4gICAgICAgIFwibmxcIixcbiAgICAgICAgXCJublwiLFxuICAgICAgICBcIm5vXCIsXG4gICAgICAgIFwibnJcIixcbiAgICAgICAgXCJucm1cIixcbiAgICAgICAgXCJuc29cIixcbiAgICAgICAgXCJudlwiLFxuICAgICAgICBcIm55XCIsXG4gICAgICAgIFwib2NcIixcbiAgICAgICAgXCJvalwiLFxuICAgICAgICBcIm9tXCIsXG4gICAgICAgIFwib3JcIixcbiAgICAgICAgXCJvc1wiLFxuICAgICAgICBcInBhXCIsXG4gICAgICAgIFwicGFnXCIsXG4gICAgICAgIFwicGFtXCIsXG4gICAgICAgIFwicGFwXCIsXG4gICAgICAgIFwicGRjXCIsXG4gICAgICAgIFwicGlcIixcbiAgICAgICAgXCJwaWhcIixcbiAgICAgICAgXCJwbFwiLFxuICAgICAgICBcInBtc1wiLFxuICAgICAgICBcInBzXCIsXG4gICAgICAgIFwicHRcIixcbiAgICAgICAgXCJxdVwiLFxuICAgICAgICBcInJtXCIsXG4gICAgICAgIFwicm15XCIsXG4gICAgICAgIFwicm5cIixcbiAgICAgICAgXCJyb1wiLFxuICAgICAgICBcInJvYS1ydXBcIixcbiAgICAgICAgXCJydVwiLFxuICAgICAgICBcInJ3XCIsXG4gICAgICAgIFwic2FcIixcbiAgICAgICAgXCJzY1wiLFxuICAgICAgICBcInNjblwiLFxuICAgICAgICBcInNjb1wiLFxuICAgICAgICBcInNkXCIsXG4gICAgICAgIFwic2VcIixcbiAgICAgICAgXCJzZ1wiLFxuICAgICAgICBcInNoXCIsXG4gICAgICAgIFwic2lcIixcbiAgICAgICAgXCJzaW1wbGVcIixcbiAgICAgICAgXCJza1wiLFxuICAgICAgICBcInNsXCIsXG4gICAgICAgIFwic21cIixcbiAgICAgICAgXCJzblwiLFxuICAgICAgICBcInNvXCIsXG4gICAgICAgIFwic3FcIixcbiAgICAgICAgXCJzci1sYXRuXCIsXG4gICAgICAgIFwic3JcIixcbiAgICAgICAgXCJzc1wiLFxuICAgICAgICBcInN0XCIsXG4gICAgICAgIFwic3VcIixcbiAgICAgICAgXCJzdlwiLFxuICAgICAgICBcInN3XCIsXG4gICAgICAgIFwidGFcIixcbiAgICAgICAgXCJ0ZVwiLFxuICAgICAgICBcInRldFwiLFxuICAgICAgICBcInRnXCIsXG4gICAgICAgIFwidGhcIixcbiAgICAgICAgXCJ0aVwiLFxuICAgICAgICBcInRrXCIsXG4gICAgICAgIFwidGxcIixcbiAgICAgICAgXCJ0bGhcIixcbiAgICAgICAgXCJ0blwiLFxuICAgICAgICBcInRvXCIsXG4gICAgICAgIFwidG9raXBvbmFcIixcbiAgICAgICAgXCJ0cGlcIixcbiAgICAgICAgXCJ0clwiLFxuICAgICAgICBcInRzXCIsXG4gICAgICAgIFwidHRcIixcbiAgICAgICAgXCJ0dW1cIixcbiAgICAgICAgXCJ0d1wiLFxuICAgICAgICBcInR5XCIsXG4gICAgICAgIFwidHptXCIsXG4gICAgICAgIFwidWRtXCIsXG4gICAgICAgIFwidWdcIixcbiAgICAgICAgXCJ1a1wiLFxuICAgICAgICBcInVyXCIsXG4gICAgICAgIFwidXpcIixcbiAgICAgICAgXCJ2ZVwiLFxuICAgICAgICBcInZlY1wiLFxuICAgICAgICBcInZpXCIsXG4gICAgICAgIFwidmxzXCIsXG4gICAgICAgIFwidm9cIixcbiAgICAgICAgXCJ3YVwiLFxuICAgICAgICBcIndhclwiLFxuICAgICAgICBcIndvXCIsXG4gICAgICAgIFwieGFsXCIsXG4gICAgICAgIFwieGhcIixcbiAgICAgICAgXCJ4bWZcIixcbiAgICAgICAgXCJ5aVwiLFxuICAgICAgICBcInlvXCIsXG4gICAgICAgIFwieXVlXCIsXG4gICAgICAgIFwiemFcIixcbiAgICAgICAgXCJ6aFwiLFxuICAgICAgICBcInpoLWNsYXNzaWNhbFwiLFxuICAgICAgICBcInpoLWhhbnNcIixcbiAgICAgICAgXCJ6aC1oYW50XCIsXG4gICAgICAgIFwiemgtbWluLW5hblwiLFxuICAgICAgICBcInpoLXR3XCIsXG4gICAgICAgIFwiemgteXVlXCIsXG4gICAgICAgIFwienVcIixcbiAgICAgIF0sXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJMYW5ndWFnZXNcIixcbiAgICAgICAgZGU6IFwiU3ByYWNoZW5cIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICdDb3ZlcmFnZSBvciB0YXJnZXQgcmVnaW9uIG9mIHRoZSBhcHAuIEZvcm1hdHRpbmc6IFwiQ29udGluZW50LCBDb3VudHJ5LCBSZWdpb24sIC4uLlwiLiBVc2UgXCJXb3JsZHdpZGVcIiBvciBsZWF2ZSBpdCBlbXB0eSBmb3IgZ2xvYmFsIHVzZS4nLFxuICAgICAgZXhhbXBsZTogXCJFdXJvcGUsIFN3aXR6ZXJsYW5kLCBadXJpY2gsIEdvc3NhdVwiLFxuICAgICAgbGFiZWw6IFwiQ292ZXJhZ2VcIixcbiAgICAgIGRlZmF1bHQ6IFwiV29ybGR3aWRlXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIH0sXG4gICAgbGFuZ3VhZ2VzdXJsOiB7XG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgXCJMaW5rIHRvIHRoZSBhY3R1YWwgZnVsbCBsaXN0IG9mIGxhbmd1YWdlcyBzdXBwb3J0ZWQsIGRlc2NyaWJlZCBvbiBhbm90aGVyIHBhZ2UgKGUuZy4gYSBwb3J0YWwgcGFnZSBmb3IgdGhlIHNvZnR3YXJlLCBvciBhIHJlcG9zaXRvcnkpLlwiLFxuICAgICAgbGFiZWw6IFwiTGFuZ3VhZ2VzIFVSTFwiLFxuICAgICAgdHlwZTogXCJ1cmxcIixcbiAgICB9LFxuICAgIGNvZGU6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkxpc3Qgb2YgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2VzIHVzZWQuXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXG4gICAgICAgIFwiQ1wiLFxuICAgICAgICBcIk9iamVjdGl2ZS1DXCIsXG4gICAgICAgIFwiT2JqZWN0aXZlLUMrK1wiLFxuICAgICAgICBcIkMrK1wiLFxuICAgICAgICBcIkMjXCIsXG4gICAgICAgIFwiVmlzdWFsIEJhc2ljIC5ORVRcIixcbiAgICAgICAgXCJQYXNjYWxcIixcbiAgICAgICAgXCJKYXZhXCIsXG4gICAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICBcIkFjdGlvblNjcmlwdFwiLFxuICAgICAgICBcIkhUTUxcIixcbiAgICAgICAgXCJDU1NcIixcbiAgICAgICAgXCJQZXJsXCIsXG4gICAgICAgIFwiUEhQXCIsXG4gICAgICAgIFwiUHl0aG9uXCIsXG4gICAgICAgIFwiUnVieVwiLFxuICAgICAgICBcIkx1YVwiLFxuICAgICAgICBcIlNRTFwiLFxuICAgICAgICBcIlN3aWZ0XCIsXG4gICAgICAgIFwiVHlwZVNjcmlwdFwiLFxuICAgICAgICBcIi5ORVRcIixcbiAgICAgICAgXCJOb2RlLmpzXCIsXG4gICAgICBdLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiQ29kZVwiLFxuICAgICAgICBkZTogXCJDb2RlXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgZnJhbWV3b3JrOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJMaXN0IG9mIGZyYW1ld29ya3MgdXNlZC5cIixcbiAgICAgIGV4YW1wbGU6IFwiR1RLKzttb25vO0oyTUU7T3BlbkdMXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcIkdUSytcIiwgXCJtb25vXCIsIFwiSjJNRVwiLCBcIk9wZW5HTFwiXSxcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIkZyYW1ld29ya1wiLFxuICAgICAgICBkZTogXCJGcmFtZXdvcmtcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICB2ZXJzaW9uOiB7XG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJWZXJzaW9uXCIsXG4gICAgICAgIFwiemgtaGFuc1wiOiBcIueJiOacrFwiLFxuICAgICAgICBkZTogXCJWZXJzaW9uXCIsXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb246IFwiTGF0ZXN0IHZlcnNpb25cIixcbiAgICAgIGV4YW1wbGU6IFwiMS4wXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIH0sXG4gICAgZGF0ZToge1xuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiUmVsZWFzZSBkYXRlXCIsXG4gICAgICAgIFwiemgtaGFuc1wiOiBcIuaXpeacn1wiLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkxhdGVzdCByZWxlYXNlIGRhdGVcIixcbiAgICAgIGV4YW1wbGU6IFwiMjAxMC0xMi0yNFwiLFxuICAgICAgdHlwZTogXCJkYXRlXCIsXG4gICAgfSxcblxuICAgIGFzaW46IHtcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICBcIkFtYXpvbiBTdGFuZGFyZCBJZGVudGlmaWNhdGlvbiBOdW1iZXIgZm9yIHRoZSBBbWF6b24gQXBwc3RvcmUgZm9yIEFuZHJvaWRcIixcbiAgICAgIGV4YW1wbGU6IFwiWFhYWFhYWFhYWFwiLFxuICAgICAgbGFiZWw6IFwiQW1hem9uIElkZW50aWZpY2F0aW9uXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIH0sXG4gICAgYmJXb3JsZElEOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJCbGFja0JlcnJ5IFdvcmxkIGFwcGxpY2F0aW9uIElEXCIsXG4gICAgICBsYWJlbDogXCJCbGFja0JlcnJ5IElEXCIsXG4gICAgICBkZXByZWNhdGVkOiB0cnVlLFxuICAgICAgZXhhbXBsZTogXCJYWFhcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgfSxcbiAgICBmRHJvaWRJRDoge1xuICAgICAgZGVzY3JpcHRpb246IFwiRi1Ecm9pZCBhcHBsaWNhdGlvbiBJRFwiLFxuICAgICAgbGFiZWw6IFwiRi1Ecm9pZCBJRFwiLFxuICAgICAgZXhhbXBsZTogXCJvcmcuZXhhbXBsZVwiLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICB9LFxuICAgIGZpcmVmb3hNYXJrZXRwbGFjZUlEOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJNb3ppbGxhIEZpcmVmb3ggTWFya2V0cGxhY2UgYXBwbGljYXRpb24gSURcIixcbiAgICAgIGxhYmVsOiBcIkZpcmVmb3ggTWFya2V0cGxhY2UgSURcIixcbiAgICAgIGRlcHJlY2F0ZWQ6IHRydWUsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIH0sXG4gICAgZ29vZ2xlUGxheUlEOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJHb29nbGUgUGxheSBTdG9yZSBhcHBsaWNhdGlvbiBJRFwiLFxuICAgICAgbGFiZWw6IFwiR29vZ2xlIFBsYXkgSURcIixcbiAgICAgIGV4YW1wbGU6IFwib3JnLmV4YW1wbGVcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgfSxcbiAgICBodWF3ZWlBcHBHYWxsZXJ5SUQ6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkh1YXdlaSBBcHBHYWxsZXJ5IGFwcGxpY2F0aW9uIElEXCIsXG4gICAgICBleGFtcGxlOiBcIkNYWFhYWFhYWFhcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgfSxcbiAgICBhcHBsZVN0b3JlSUQ6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcImlUdW5lcyBBcHAgU3RvcmUgYXBwbGljYXRpb24gSURcIixcbiAgICAgIGxhYmVsOiBcIkFwcFN0b3JlIElEXCIsXG4gICAgICBleGFtcGxlOiBcImlkMTIzNDQ1NTZcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgfSxcbiAgICBtYWNBcHBTdG9yZUlEOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJNYWMgQXBwIFN0b3JlIGFwcGxpY2F0aW9uIElEXCIsXG4gICAgICBsYWJlbDogXCJNYWMgQXBwU3RvcmUgSURcIixcbiAgICAgIGV4YW1wbGU6IFwiaWQxMjM0NDU1NlwiLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICB9LFxuICAgIG1pY3Jvc29mdEFwcElEOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJNaWNyb3NvZnQgU3RvcmUgV2luZG93cyBhcHBsaWNhdGlvbiBVVUlEXCIsXG4gICAgICBsYWJlbDogXCJNaWNyb3NvZnQgSURcIixcbiAgICAgIGV4YW1wbGU6IFwiWFhYWFhYWFhYWFhYXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIH0sXG5cbiAgICBtYXA6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltNYXAgZGlzcGxheV0gQ2FuIGl0IHNob3cgYSBtYXA/XCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJEaXNwbGF5IG1hcFwiLFxuICAgICAgICBkZTogXCJLYXJ0ZSBhbnplaWdlblwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgbWFwRGF0YToge1xuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICdbTWFwIGRpc3BsYXldIE1hcHMgZHJhd24gdXNpbmcgcHJlLWNhbGN1bGF0ZWQvcmFzdGVyaXplZCBpbWFnZXMgKHJhc3Rlcikgb3IgXCJvbiB0aGUgZmx5XCIgKHZlY3Rvcik/JyxcbiAgICAgIGxhYmVsOiBcIk1hcCBkYXRhXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJyYXN0ZXJcIiwgXCJ2ZWN0b3JcIl0sXG4gICAgfSxcbiAgICBkYXRhc291cmNlOiB7XG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgXCJbTWFwIGRpc3BsYXldIENhbiB5b3Ugc3RvcmUgYWxsIG1hcCBkYXRhIG9mZmxpbmU/IERvd25sb2FkIGEgc2VwYXJhdGUgZmlsZT9cIixcbiAgICAgIGxhYmVsOiBcIlNvdXJjZVwiLFxuICAgICAgZXhhbXBsZTogXCJvbmxpbmU7Y2FjaGVcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcIm9ubGluZVwiLCBcImNhY2hlXCIsIFwib2ZmbGluZVwiXSxcbiAgICB9LFxuICAgIHJvdGF0ZU1hcDoge1xuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiW01hcCBkaXNwbGF5XSBEb2VzIGl0IHR1cm4gdGhlIG1hcCBpbiBkcml2aW5nL3dhbGtpbmcgZGlyZWN0aW9uP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiUm90YXRlIG1hcFwiLFxuICAgICAgICBkZTogXCJLYXJ0ZSBkcmVoZW5cIixcbiAgICAgIH0sXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIFwiM0RcIjoge1xuICAgICAgZGVzY3JpcHRpb246IFwiW01hcCBkaXNwbGF5XSBJcyB0aGVyZSBzb21lIDNEIG9yIDIuNUQgdmlldz9cIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiM0Qgdmlld1wiLFxuICAgICAgICBkZTogXCIzRC1BbnNpY2h0XCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2hvd1dlYnNpdGU6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltQT0kgSW5mb3JtYXRpb25dIFNob3dzIGxpbmsgdG8gdGhlIHdlYnNpdGUgZnJvbSBQT0lcIixcbiAgICAgIGxhYmVsOiBcIlNob3dzIHdlYnNpdGVcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgc2hvd1Bob25lTnVtYmVyOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbUE9JIEluZm9ybWF0aW9uXSBTaG93cyBwaG9uZSBudW1iZXIgZnJvbSBQT0lcIixcbiAgICAgIGxhYmVsOiBcIlNob3dzIHBob25lIG51bWJlclwiLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICBzaG93T3BlbmluZ0hvdXJzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbUE9JIEluZm9ybWF0aW9uXSBTaG93cyBob3VycyBvZiBvcGVyYXRpb24gZnJvbSBQT0lcIixcbiAgICAgIGxhYmVsOiBcIlNob3dzIG9wZXJhdGlvbiBob3Vyc1wiLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcblxuICAgIHJvdXRpbmc6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIGVuOiBcIltSb3V0aW5nXSBDYW4geW91IGNhbGN1bGF0ZSBvciBvdGhlcndpc2UgcGxhbiBhIHJvdXRlP1wiLFxuICAgICAgICBkZTogXCJGdW5rdGlvbmVuOiBLw7ZubmVuIFNpZSBlaW5lIFJvdXRlIGJlcmVjaG5lbiBvZGVyIHNvbnN0IHdpZSBwbGFuZW4/XCIsXG4gICAgICB9LFxuICAgICAgbGFiZWw6IFwiUm91dGluZ1wiLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICBjcmVhdGVSb3V0ZU1hbnVhbGx5OiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbUm91dGluZ11cIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIkNyZWF0ZSByb3V0ZSBtYW51YWxseVwiLFxuICAgICAgICBkZTogXCJSb3V0ZSB2b24gSGFuZCBlaW5nZWJlblwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgY2FsY3VsYXRlUm91dGU6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltSb3V0aW5nXSBDYW4gaXQgY2FsY3VsYXRlIGEgcm91dGUgdXNpbmcgcm91dGluZz9cIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIkNhbGN1bGF0ZSByb3V0ZVwiLFxuICAgICAgICBkZTogXCJSb3V0ZSBiZXJlY2huZW5cIixcbiAgICAgIH0sXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIGNyZWF0ZVJvdXRlVmlhV2F5cG9pbnRzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbUm91dGluZ10gQWJsZSB0byBjYWxjdWxhdGUgcm91dGUgdmlhIFdheXBvaW50c1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiQ3JlYXRlIHJvdXRlIHZpYSBXYXlwb2ludHNcIixcbiAgICAgIH0sXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIHByb2ZpbGVzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbUm91dGluZ10gV2hhdCBwcm9maWxlcyBzdXBwb3J0ZWQgaWYgaXQgbWFrZXMgcm91dGluZz9cIixcbiAgICAgIGxhYmVsOiBcIlJvdXRpbmcgcHJvZmlsZXNcIixcbiAgICAgIGV4YW1wbGU6IFwiY2FyO2Jpa2U7Zm9vdDt3aGVlbGNoYWlyXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJjYXJcIiwgXCJiaWtlXCIsIFwiZm9vdFwiLCBcIndoZWVsY2hhaXJcIl0sXG4gICAgfSxcbiAgICB0dXJuUmVzdHJpY3Rpb25zOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbUm91dGluZ10gQ2FuIGl0IGRlYWwgd2l0aCB0dXJuIHJlc3RyaWN0aW9ucz9cIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIlR1cm4gcmVzdHJpY3Rpb25zXCIsXG4gICAgICAgIGRlOiBcIkFiYmllZ2ViZXNjaHLDpG5rdW5nZW5cIixcbiAgICAgIH0sXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIGNhbGN1bGF0ZVJvdXRlT2ZmbGluZToge1xuICAgICAgZGVzY3JpcHRpb246IFwiW1JvdXRpbmddIERvZXMgaXQgbmVlZCBpbnRlcm5ldCB0byBjYWxjdWxhdGUgYSByb3V0ZT9cIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIkNhbGN1bGF0ZSByb3V0ZSB3aXRob3V0IEludGVybmV0IChPZmZsaW5lIHJvdXRpbmcpXCIsXG4gICAgICAgIGRlOiBcIlJvdXRlIGJlcmVjaG5lbiBvaG5lIEludGVybmV0XCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICByb3V0aW5nUHJvdmlkZXJzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbUm91dGluZ10gV2hhdCByb3V0aW5nIHNlcnZpY2UocykgZG9lcyBpdCB1c2U/XCIsXG4gICAgICBsYWJlbDogXCJSb3V0aW5nIHByb3ZpZGVyc1wiLFxuICAgICAgZXhhbXBsZTogXCJPcGVuUm91dGVTZXJ2aWNlO1lvdXJzXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXG4gICAgICAgIFwiT3BlblJvdXRlU2VydmljZVwiLFxuICAgICAgICBcIllvdXJzXCIsXG4gICAgICAgIFwiQ2xvdWRNYWRlXCIsXG4gICAgICAgIFwiTWFwUXVlc3RcIixcbiAgICAgICAgXCJHcmFwaGhvcHBlclwiLFxuICAgICAgICBcIk9TUk1cIixcbiAgICAgICAgXCJWYWxoYWxsYVwiLFxuICAgICAgXSxcbiAgICB9LFxuICAgIGF2b2lkVHJhZmZpYzoge1xuICAgICAgZGVzY3JpcHRpb246IFwiW1JvdXRpbmddIERvZXMgYXBwIG9wdGltaXplIHJvdXRlIHRvIGF2b2lkIHRyYWZmaWMgamFtcz9cIixcbiAgICAgIGxhYmVsOiBcIkF2b2lkIHRyYWZmaWNcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgdHJhZmZpY1Byb3ZpZGVyOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbUm91dGluZ10gVHJhZmZpYyBkYXRhIHNvdXJjZSBwcm92aWRlci5cIixcbiAgICAgIGxhYmVsOiBcIlRyYWZmaWMgUHJvdmlkZXJcIixcbiAgICB9LFxuXG4gICAgbmF2aWdhdGluZzoge1xuICAgICAgZGVzY3JpcHRpb246IFwiW05hdmlnYXRpb25dIENhbiB5b3UgbmF2aWdhdGUgaW4gYSBjb21wYXNzIGxpa2Ugd2F5P1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiTmF2aWdhdGVcIixcbiAgICAgICAgZGU6IFwiTmF2aWdpZXJlblwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgZmluZExvY2F0aW9uOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbTmF2aWdhdGlvbl0gQ2FuIGl0IHNlYXJjaCBmb3IgYSBzdHJlZXQvcGxhY2U/XCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJGaW5kIGxvY2F0aW9uXCIsXG4gICAgICAgIGRlOiBcIkZpbmRlIGVpbmUgUG9zaXRpb25cIixcbiAgICAgIH0sXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIGZpbmROZWFyYnlQT0k6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltOYXZpZ2F0aW9uXSBDYW4gaXQgZGlzY292ZXIvZGlzcGxheSBQb2ludHMgb2YgaW50ZXJlc3RzP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiRmluZCBuZWFyYnkgUE9Jc1wiLFxuICAgICAgICBkZTogXCJGaW5kZSBQT0kgaW4gZGVyIE7DpGhlXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICBuYXZUb1BvaW50OiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbTmF2aWdhdGlvbl0gQ2FuIGl0IGd1aWRlIHlvdSB0byBhIHBvaW50IHNvbWV3aGVyZT9cIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIk5hdmlnYXRlIHRvIHBvaW50XCIsXG4gICAgICAgIGRlOiBcIk5hdmlnaWVyZSB6dSBlaW5lbSBQdW5rdFwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgdm9pY2U6IHtcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICBcIltOYXZpZ2F0aW9uXSBDYW4gaXQgZ2l2ZSB5b3UgY29tbWFuZHMgd2l0aCBhIGNvbXB1dGVyIHZvaWNlP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiTmF2aWdhdGlvbiB3aXRoIHZvaWNlIC8gVm9pY2UgZ3VpZGFuY2VcIixcbiAgICAgICAgZGU6IFwiTmF2aWdhdGlvbiBtaXQgU3ByYWNoYW5zYWdlXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICBrZWVwT25Sb2FkOiB7XG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgXCJbTmF2aWdhdGlvbl0gQ2FuIGl0IGFzc2lzdCB5b3UgdG8ga2VlcCB5b3VyIHZlaGljbGUgb24gdGhlIGNhbGN1bGF0ZWQgcm91dGU/XCIsXG4gICAgICBsYWJlbDogXCJLZWVwIG9uIHJvYWRcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgdHVybkxhbmVzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbTmF2aWdhdGlvbl0gRG9lcyBpdCBzdXBwb3J0IGxhbmUgZ3VpZGFuY2U/XCIsXG4gICAgICBsYWJlbDogXCJMYW5lIGd1aWRhbmNlXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIHdpdGhvdXRHUFM6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltOYXZpZ2F0aW9uXSBEb2VzIGl0IHdvcmsgZXZlbiB3aXRob3V0IGEgR1BTP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiV29ya3Mgd2l0aG91dCBHUFNcIixcbiAgICAgICAgZGU6IFwiRnVua3Rpb25pZXJ0IG9obmUgR1BTXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICBwcmVkZWZpbmVkUm91dGU6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltOYXZpZ2F0aW9uXSBDYW4gaXQgZm9sbG93IG90aGVyIEdQUyB0cmFja3M/XCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJOYXZpZ2F0ZSBhbG9uZyBwcmVkZWZpbmVkIHJvdXRlXCIsXG4gICAgICAgIGRlOiBcIkZvbGdlIGVpbmVyIHZvcmRlZmluaWVydGVuIFJvdXRlXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcblxuICAgIHRyYWNraW5nOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbVHJhY2sgbG9nZ2luZ10gQ2FuIGl0IHJlY29yZCBhIEdQUyB0cmFjaz9cIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiTWFrZSB0cmFja1wiLFxuICAgICAgICBkZTogXCJUcmFjayBhdWZ6ZWljaG5lblwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGN1c3RvbUludGVydmFsOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbVHJhY2sgbG9nZ2luZ10gQ2FuIHlvdSB0dW5lIHRoZSBpbnRlcnZhbCBtYW51YWxseT9cIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIkN1c3RvbWl6YWJsZSBsb2cgaW50ZXJ2YWxcIixcbiAgICAgICAgZGU6IFwiRWluc3RlbGxiYXJlcyBBdWZ6ZWljaG51bmdzaW50ZXJ2YWxsXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICB0cmFja0Zvcm1hdHM6IHtcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICBcIltUcmFjayBsb2dnaW5nXSBXaGF0IGZvcm1hdHMgZm9yIHN0b3JhZ2UgY2FuIHlvdSBzYXZlIHlvdXIgR1BTIHRyYWNrP1wiLFxuICAgICAgZXhhbXBsZTogXCJncHg7Y3N2XCIsXG4gICAgICBhbGlhc2VzOiBbXCJmb3JtYXRzXCJdLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiVHJhY2sgZm9ybWF0c1wiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcImdweFwiLCBcImttbFwiLCBcIm5tZWFcIiwgXCJjc3ZcIiwgXCJ0cmtcIl0sXG4gICAgfSxcbiAgICBnZW90YWdnaW5nOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbVHJhY2sgbG9nZ2luZ10gQXJlIGZ1cnRoZXIgbWFwcGluZyB0ZWNobmlxdWVzIHN1cHBvcnRlZFwiLFxuICAgICAgbGFiZWw6IFwiR2VvdGFnZ2luZ1wiLFxuICAgICAgZXhhbXBsZTogXCJub3RlO3Bob3RvXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJub3RlXCIsIFwicGhvdG9cIiwgXCJhdWRpb1wiXSxcbiAgICB9LFxuICAgIGZhc3RXYXlQb2ludEFkZGluZzoge1xuICAgICAgZGVzY3JpcHRpb246IFwiW1RyYWNrIGxvZ2dpbmddIEVhc3kgdG8gYWRkIGEgbmV3IFdheXBvaW50P1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiRmFzdCBQT0kgYnV0dG9uc1wiLFxuICAgICAgICBkZTogXCJLbsO2cGZlIHp1bSBzY2huZWxsZW4gU2V0emVuIHZvbiBXZWdwdW5rdGVuXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICB1cGxvYWRHUFg6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltUcmFjayBsb2dnaW5nXSBDYW4gaXQgc2VuZCB0cmFja3MgZGlyZWN0bHkgdG8gT1NNP1wiLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgICBsYWJlbDogXCJVcGxvYWQgR1BYIHRvIE9TTVwiLFxuICAgIH0sXG5cbiAgICBtb25pdG9yaW5nOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbVHJhY2sgbW9uaXRvcmluZ10gQ2FuIHlvdSBtb25pdG9yIEdQUyBkYXRhcz9cIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIk1vbml0b3JpbmdcIixcbiAgICAgICAgZGU6IFwiTW9uaXRvcmluZ1wiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgc2hvd1RyYWNrOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbVHJhY2sgbW9uaXRvcmluZ10gU2hvdyB5b3VyIGN1cnJlbnQgdHJhY2s/XCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJTaG93IGN1cnJlbnQgdHJhY2tcIixcbiAgICAgICAgZGU6IFwiWmVpZ2UgYWt0dWVsbGVuIFRyYWNrXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICBzaG93RXhpc3RpbmdUcmFjazoge1xuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiW1RyYWNrIG1vbml0b3JpbmddIENhbiBpdCBsb2FkIGV4aXN0aW5nIHRyYWNrcyBzbyB5b3UgY2FuIGZvbGxvdyB0aGVtP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiT3BlbiBleGlzdGluZyB0cmFja1wiLFxuICAgICAgICBkZTogXCLDlmZmbmUgZXhpc3RpZXJlbmRlbiBUcmFja1wiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgc2hvd0FsdGl0dWRlRGlhZ3JhbToge1xuICAgICAgZGVzY3JpcHRpb246IFwiW1RyYWNrIG1vbml0b3JpbmddXCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJBbHRpdHVkZSBkaWFncmFtXCIsXG4gICAgICAgIGRlOiBcIkjDtmhlbmRpYWdyYW1tXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICBzaG93RE9QOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbVHJhY2sgbW9uaXRvcmluZ10gU2hvd3Mgc2lnbmFsIHF1YWxpdHk/XCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJTaG93IFBPRCB2YWx1ZVwiLFxuICAgICAgICBkZTogXCJaZWlnZSBET1AtV2VydFwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgc2hvd1NhdGVsbGl0ZXM6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltUcmFjayBtb25pdG9yaW5nXSBEaXNwbGF5cyBzYXRlbGxpdGVzP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiU2F0ZWxsaXRlIHZpZXdcIixcbiAgICAgICAgZGU6IFwiWmVpZ2UgU2F0ZWxsaXRlblwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgc2hvd05NRUFsaXZlOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbVHJhY2sgbW9uaXRvcmluZ10gQ2FuIHlvdSBzZWUgdGhlIHJhdyBHUFMgc3RyZWFtP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiU2hvdyBsaXZlIE5NRUEgZGF0YVwiLFxuICAgICAgICBkZTogXCJaZWlnZSBOTUVBLUxpdmVkYXRlblwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgc2hvd1NwZWVkOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbVHJhY2sgbW9uaXRvcmluZ11cIixcbiAgICAgIGxhYmVsOiBcIlNob3cgc3BlZWRcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgc2VuZFBvc2l0aW9uOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbVHJhY2sgbW9uaXRvcmluZ10gQ2FuIGl0IHNlbmQgcG9zaXRpb24gdG8gb3RoZXJzP1wiLFxuICAgICAgZXhhbXBsZTogXCJ5ZXM7bWFpbDt3d3dcIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIlNlbmQgY3VycmVudCBwb3NpdGlvblwiLFxuICAgICAgICBkZTogXCJTZW5kZSBha3R1ZWxsZSBQb3NpdGlvblwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCIsIFwic21zXCIsIFwibWFpbFwiLCBcInd3d1wiXSxcbiAgICB9LFxuXG4gICAgYWRkUE9JOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbRWRpdG9yXSBDYW4geW91IGFkZCBhIG5vZGU/XCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJBZGQgUE9Jc1wiLFxuICAgICAgICBkZTogXCJQT0kgaGluenVmw7xnZW5cIixcbiAgICAgIH0sXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIGVkaXRQT0k6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltFZGl0b3JdIENhbiB5b3UgZWRpdCBhIG5vZGU/XCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJFZGl0IC8gRGVsZXRlIFBPSXNcIixcbiAgICAgICAgZGU6IFwiUE9JIGJlYXJiZWl0ZW4vbMO2c2NoZW5cIixcbiAgICAgIH0sXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIGFkZFdheToge1xuICAgICAgZGVzY3JpcHRpb246IFwiW0VkaXRvcl0gQ2FuIHlvdSBhZGQgYSB3YXk/XCIsXG4gICAgICBsYWJlbDogXCJBZGQgd2F5XCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIGVkaXRHZW9tOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbRWRpdG9yXSBDYW4geW91IGVkaXQgbm9kZXMvd2F5cz9cIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIkVkaXQgZ2VvbWV0cmllc1wiLFxuICAgICAgICBkZTogXCJHZW9tZXRyaWUgYmVhcmJlaXRlblwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgZWRpdFRhZ3M6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltFZGl0b3JdIENhbiB5b3UgZWRpdCBleGlzdGluZyB0YWdzP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiRWRpdCBhcmJpdHJhcnkgdGFncyBvZiBleGlzdGluZyBPU00gb2JqZWN0c1wiLFxuICAgICAgICBkZTogXCJCZWxpZWJpZ2UgVGFncyBhbiB2b3JoYW5kZW5lbiBPU00tT2JqZWt0ZW4gYmVhcmJlaXRlblwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgZWRpdFJlbGF0aW9uczoge1xuICAgICAgZGVzY3JpcHRpb246IFwiW0VkaXRvcl0gQ2FuIHlvdSBlZGl0IHJlbGF0aW9ucz9cIixcbiAgICAgIGxhYmVsOiBcIkVkaXQgcmVsYXRpb25zXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIHZpZXdOb3Rlczoge1xuICAgICAgZGVzY3JpcHRpb246IFwiW0VkaXRvcl0gQ2FuIHlvdSB2aWV3IE9TTSBOb3Rlcz9cIixcbiAgICAgIGxhYmVsOiBcIlZpZXcgbm90ZXNcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgY3JlYXRlTm90ZXM6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltFZGl0b3JdIENhbiB5b3UgYWRkIE9TTSBOb3Rlcz9cIixcbiAgICAgIGxhYmVsOiBcIkNyZWF0ZSBub3Rlc1wiLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICBlZGl0Tm90ZXM6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltFZGl0b3JdIENhbiB5b3UgY29tbWVudC9jbG9zZSBPU00gTm90ZXM/XCIsXG4gICAgICBsYWJlbDogXCJFZGl0IG5vdGVzXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIGVkaXRTb3VyY2U6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltFZGl0b3JdIENhbiB5b3Ugd29yayBvZmZsaW5lP1wiLFxuICAgICAgbGFiZWw6IFwiV29yayBvZmZsaW5lXCIsXG4gICAgICBleGFtcGxlOiBcIm9ubGluZTtjYWNoZVwiLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wib25saW5lXCIsIFwiY2FjaGVcIiwgXCJvZmZsaW5lXCJdLFxuICAgIH0sXG4gICAgb2Zmc2V0REJzdXBwb3J0OiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbRWRpdG9yXSBEb2VzIGl0IHN1cHBvcnQgdGhlIGltYWdlcnkgb2Zmc2V0IERCP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiU3VwcG9ydCBpbWFnZXJ5IG9mZnNldCBEQlwiLFxuICAgICAgICBkZTogXCJVbnRlcnN0w7x0enQgTHVmdGJpbGR2ZXJzYXR6IERCXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICB1cGxvYWRPU01EYXRhOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbRWRpdG9yXSBDYW4geW91IHNlbmQgY2hhbmdlcyB0byBPU00gZGlyZWN0bHk/XCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJVcGxvYWQgdG8gT1NNXCIsXG4gICAgICAgIGRlOiBcIlp1IE9TTSBob2NobGFkZW5cIixcbiAgICAgIH0sXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuXG4gICAgcmVuZGVyZXJPdXRwdXRGb3JtYXRzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbUmVuZGVyZXJdIFN1cHBvcnRlZCBvdXRwdXQgZm9ybWF0cy5cIixcbiAgICAgIGV4YW1wbGU6IFwic3ZnO3BkZjtwbmdcIixcbiAgICAgIGxhYmVsOiBcIlJlbmRlcmVyIG91dHB1dCBmb3JtYXRzXCIsXG4gICAgfSxcblxuICAgIGFjY2Vzc2liaWxpdHk6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIltBY2Nlc3NpYmlsaXR5XSBEb2VzIGl0IGhlbHAgZGlzYWJsZWQgcGVvcGxlIGluIHNvbWUga2luZD9cIixcbiAgICAgIGV4YW1wbGU6IFwiYmxpbmQ7d2hlZWxjaGFpclwiLFxuICAgICAgbGFiZWw6IFwiQWNjZXNzaWJpbGl0eSBzdXBwb3J0XCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJibGluZFwiLCBcIndoZWVsY2hhaXJcIl0sXG4gICAgfSxcbiAgICB0ZXh0T25seVVJOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbQWNjZXNzaWJpbGl0eV0gVGV4dCB0byBicmFpbGxlIGNvbXBhdGlibGUgaW50ZXJmYWNlP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiQ29tcGxldGUgbm9uIGdyYXBoaWNzIHRleHQgb3V0cHV0XCIsXG4gICAgICAgIGRlOiBcIktvbXBsZXR0IG9obmUgR3JhZmlrIGJlZGllbmJhclwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgYnJhaWxsZVVJOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbQWNjZXNzaWJpbGl0eV0gQSBzcGVjaWFsIGJyYWlsbGUgaW50ZXJmYWNlP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiQnJhaWxsZSBpbnRlcmZhY2VcIixcbiAgICAgICAgZGU6IFwiQnJhaWxsZS1PYmVyZmzDpGNoZVwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgZXhwbG9yZXJNb2RlOiB7XG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgXCJbQWNjZXNzaWJpbGl0eV0gSGFzIGEgZXhwbG9yYXRpb24gbW9kdXMgKHRlbGwgYWxsIG9iamVjdHMgYXBwcm9hY2hpbmcpP1wiLFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZW46IFwiRXhwbG9yYXRpb24gbW9kdXNcIixcbiAgICAgICAgZGU6IFwiRXJrdW5kdW5nc21vZHVzXCIsXG4gICAgICB9LFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIHN1Z2dlc3RlZHZhbHVlczogW1wieWVzXCIsIFwibm9cIl0sXG4gICAgfSxcbiAgICBwdWJsaWNUcmFuc3BvcnRNb2RlOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbQWNjZXNzaWJpbGl0eV0gU3VwcG9ydHMgcm91dGluZyB3aXRoIHB1YmxpYyB0cmFuc3BvcnQ/XCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJQdWJsaWMgVHJhbnNwb3J0IG1vZGVcIixcbiAgICAgICAgZGU6IFwiw5ZQTlYtTW9kdXNcIixcbiAgICAgIH0sXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgc3VnZ2VzdGVkdmFsdWVzOiBbXCJ5ZXNcIiwgXCJub1wiXSxcbiAgICB9LFxuICAgIGRhbmdlcldhcm5pbmdzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbQWNjZXNzaWJpbGl0eV1cIixcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGVuOiBcIkRhbmdlciBXYXJuaW5nc1wiLFxuICAgICAgICBkZTogXCJHZWZhaHJlbndhcm51bmdlblwiLFxuICAgICAgfSxcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBzdWdnZXN0ZWR2YWx1ZXM6IFtcInllc1wiLCBcIm5vXCJdLFxuICAgIH0sXG4gICAgc2NyZWVuUmVhZGVyOiB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJbQWNjZXNzaWJpbGl0eV0gTGlzdCBvZiBzdXBwb3J0ZWQgc2NyZWVucmVhZGVyc1wiLFxuICAgICAgZXhhbXBsZTogXCJOVkRBXCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJTY3JlZW5yZWFkZXJcIixcbiAgICAgICAgZGU6IFwiU2NyZWVucmVhZGVyXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2NyZWVuUmVhZGVyTGFuZzoge1xuICAgICAgZGVzY3JpcHRpb246IFwiW0FjY2Vzc2liaWxpdHldIExpc3Qgb2Ygc3VwcG9ydGVkIHNjcmVlbnJlYWRlcnMgbGFuZ3VhZ2VzXCIsXG4gICAgICBleGFtcGxlOiBcIkVOO0RFXCIsXG4gICAgICBsYWJlbDoge1xuICAgICAgICBlbjogXCJTY3JlZW5yZWFkZXIgbGFuZ3VhZ2VzXCIsXG4gICAgICAgIGRlOiBcIlNjcmVlbnJlYWRlci1TcHJhY2hlblwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBwYXJhbU9yZGVyOiBbXG4gICAgXCJsYW5nXCIsXG4gICAgXCJuYW1lXCIsXG4gICAgXCJzdGF0dXNcIixcbiAgICBcImxpY2Vuc2VcIixcbiAgICBcInByaWNlXCIsXG4gICAgXCJ3ZWJcIixcbiAgICBcInJlcG9cIixcbiAgICBcImxvZ29cIixcbiAgICBcInNjcmVlbnNob3RcIixcbiAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgXCJhdXRob3JcIixcbiAgICBcInBsYXRmb3JtXCIsXG4gICAgXCJnZW5yZVwiLFxuICAgIFwibGFuZ3VhZ2VzXCIsXG4gICAgXCJsYW5ndWFnZXN1cmxcIixcbiAgICBcImNvZGVcIixcbiAgICBcImZyYW1ld29ya1wiLFxuICAgIFwidmVyc2lvblwiLFxuICAgIFwiZGF0ZVwiLFxuXG4gICAgLy8gSW5zdGFsbCBvcHRpb25zXG4gICAgXCJhc2luXCIsXG4gICAgXCJiYldvcmxkSURcIixcbiAgICBcImZEcm9pZElEXCIsXG4gICAgXCJmaXJlZm94TWFya2V0cGxhY2VJRFwiLFxuICAgIFwiZ29vZ2xlUGxheUlEXCIsXG4gICAgXCJodWF3ZWlBcHBHYWxsZXJ5SURcIixcbiAgICBcImFwcGxlU3RvcmVJRFwiLFxuICAgIFwibWFjQXBwU3RvcmVJRFwiLFxuICAgIFwibWljcm9zb2Z0QXBwSURcIixcblxuICAgIC8vIE1hcFxuICAgIFwibWFwXCIsXG4gICAgXCJtYXBEYXRhXCIsXG4gICAgXCJkYXRhc291cmNlXCIsXG4gICAgXCJyb3RhdGVNYXBcIixcbiAgICBcIjNEXCIsXG4gICAgXCJzaG93V2Vic2l0ZVwiLFxuICAgIFwic2hvd1Bob25lTnVtYmVyXCIsXG4gICAgXCJzaG93T3BlbmluZ0hvdXJzXCIsXG5cbiAgICAvLyBSb3V0aW5nXG4gICAgXCJyb3V0aW5nXCIsXG4gICAgXCJjcmVhdGVSb3V0ZU1hbnVhbGx5XCIsXG4gICAgXCJjYWxjdWxhdGVSb3V0ZVwiLFxuICAgIFwiY3JlYXRlUm91dGVWaWFXYXlwb2ludHNcIixcbiAgICBcInByb2ZpbGVzXCIsXG4gICAgXCJ0dXJuUmVzdHJpY3Rpb25zXCIsXG4gICAgXCJjYWxjdWxhdGVSb3V0ZU9mZmxpbmVcIixcbiAgICBcInJvdXRpbmdQcm92aWRlcnNcIixcbiAgICBcImF2b2lkVHJhZmZpY1wiLFxuICAgIFwidHJhZmZpY1Byb3ZpZGVyXCIsXG5cbiAgICAvLyBOYXZpZ2F0aW5nXG4gICAgXCJuYXZpZ2F0aW5nXCIsXG4gICAgXCJmaW5kTG9jYXRpb25cIixcbiAgICBcImZpbmROZWFyYnlQT0lcIixcbiAgICBcIm5hdlRvUG9pbnRcIixcbiAgICBcInZvaWNlXCIsXG4gICAgXCJrZWVwT25Sb2FkXCIsXG4gICAgXCJ0dXJuTGFuZXNcIixcbiAgICBcIndpdGhvdXRHUFNcIixcbiAgICBcInByZWRlZmluZWRSb3V0ZVwiLFxuXG4gICAgLy8gVHJhY2tpbmdcbiAgICBcInRyYWNraW5nXCIsXG4gICAgXCJjdXN0b21JbnRlcnZhbFwiLFxuICAgIFwidHJhY2tGb3JtYXRzXCIsXG4gICAgXCJnZW90YWdnaW5nXCIsXG4gICAgXCJmYXN0V2F5UG9pbnRBZGRpbmdcIixcbiAgICBcInVwbG9hZEdQWFwiLFxuXG4gICAgLy8gTW9uaXRvcmluZ1xuICAgIFwibW9uaXRvcmluZ1wiLFxuICAgIFwic2hvd1RyYWNrXCIsXG4gICAgXCJzaG93RXhpc3RpbmdUcmFja1wiLFxuICAgIFwic2hvd0FsdGl0dWRlRGlhZ3JhbVwiLFxuICAgIFwic2hvd0RPUFwiLFxuICAgIFwic2hvd1NhdGVsbGl0ZXNcIixcbiAgICBcInNob3dOTUVBbGl2ZVwiLFxuICAgIFwic2hvd1NwZWVkXCIsXG4gICAgXCJzZW5kUG9zaXRpb25cIixcblxuICAgIC8vIEVkaXRpbmdcbiAgICBcImFkZFBPSVwiLFxuICAgIFwiZWRpdFBPSVwiLFxuICAgIFwiYWRkV2F5XCIsXG4gICAgXCJlZGl0R2VvbVwiLFxuICAgIFwiZWRpdFRhZ3NcIixcbiAgICBcImVkaXRSZWxhdGlvbnNcIixcbiAgICBcInZpZXdOb3Rlc1wiLFxuICAgIFwiY3JlYXRlTm90ZXNcIixcbiAgICBcImVkaXROb3Rlc1wiLFxuICAgIFwiZWRpdFNvdXJjZVwiLFxuICAgIFwib2Zmc2V0REJzdXBwb3J0XCIsXG4gICAgXCJ1cGxvYWRPU01EYXRhXCIsXG5cbiAgICAvLyBSZW5kZXJpbmdcbiAgICBcInJlbmRlcmVyT3V0cHV0Rm9ybWF0c1wiLFxuXG4gICAgLy8gQWNjZXNzaWJpbGl0eVxuICAgIFwiYWNjZXNzaWJpbGl0eVwiLFxuICAgIFwidGV4dE9ubHlVSVwiLFxuICAgIFwiYnJhaWxsZVVJXCIsXG4gICAgXCJleHBsb3Jlck1vZGVcIixcbiAgICBcInB1YmxpY1RyYW5zcG9ydE1vZGVcIixcbiAgICBcImRhbmdlcldhcm5pbmdzXCIsXG4gICAgXCJzY3JlZW5SZWFkZXJcIixcbiAgICBcInNjcmVlblJlYWRlckxhbmdcIixcbiAgXSxcbiAgZm9ybWF0OiBcImJsb2NrXCIsXG4gIGRlc2NyaXB0aW9uOlxuICAgIFwiVGhpcyB0ZW1wbGF0ZSBjb2xsZWN0cyBhbGwgbm90ZXMgb2YgYSBzb2Z0d2FyZSB0b2dldGhlci4gU29tZSBjb21tb24gaW5mb3JtYXRpb24gaXMgZGlzcGxheWVkIGFzIGFuIGluZm9ib3guXCIsXG59O1xuIiwiLy8gQ29weXJpZ2h0IChDKSAyMDIwIE1hcmt1cyBQZWxvc29cbi8vIFxuLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgT1NNIEFwcHMgQ2F0YWxvZy5cbi8vIFxuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuLy8gcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlXG4vLyBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuLy8gXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vLyBcbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCBPU00gQXBwcyBDYXRhbG9nLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5leHBvcnQgZnVuY3Rpb24gaW5jbHVkZXM8VD4oYXJyOiBUW10sIHRhcmdldDogVFtdKSB7XG4gIHJldHVybiB0YXJnZXQuZXZlcnkodiA9PiBhcnIuaW5jbHVkZXModikpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNvbWU8VD4oYXJyOiBUW10sIHRhcmdldDogVFtdKSB7XG4gIHJldHVybiB0YXJnZXQuc29tZSh2ID0+IGFyci5pbmNsdWRlcyh2KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEdXBsaWNhdGVzPFQ+KGFycjogVFtdKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKChjLCBpbmRleCkgPT4ge1xuICAgIHJldHVybiBhcnIuaW5kZXhPZihjKSA9PT0gaW5kZXg7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2h1ZmZsZTxUPihhcnJheTogVFtdKSB7XG4gIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgIFthcnJheVtpXSwgYXJyYXlbal1dID0gW2FycmF5W2pdLCBhcnJheVtpXV07XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoQykgMjAyMCBNYXJrdXMgUGVsb3NvXG4vL1xuLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2Ygb3NtLWFwcC1jb21wb25lbnQuXG4vL1xuLy8gb3NtLWFwcC1jb21wb25lbnQgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbi8vIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuLy8gTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbi8vXG4vLyBvc20tYXBwLWNvbXBvbmVudCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy9cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCBvc20tYXBwLWNvbXBvbmVudC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvUmdiKGhleDogc3RyaW5nKSB7XG4gIC8vIEV4cGFuZCBzaG9ydGhhbmQgZm9ybSAoZS5nLiBcIjAzRlwiKSB0byBmdWxsIGZvcm0gKGUuZy4gXCIwMDMzRkZcIilcbiAgY29uc3Qgc2hvcnRoYW5kUmVnZXggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuICBoZXggPSBoZXgucmVwbGFjZShzaG9ydGhhbmRSZWdleCwgKF9tLCByLCBnLCBiKSA9PiB7XG4gICAgcmV0dXJuIHIgKyByICsgZyArIGcgKyBiICsgYjtcbiAgfSk7XG5cbiAgY29uc3QgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG5cbiAgaWYgKCFyZXN1bHQpIHRocm93IFwiaGV4IGhhcyBhIHVuZXhwZWN0ZWQgZm9ybWF0LlwiO1xuXG4gIHJldHVybiBbXG4gICAgcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiAgXTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbG9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIHI6IG51bWJlciwgcHVibGljIGc6IG51bWJlciwgcHVibGljIGI6IG51bWJlcikge1xuICAgIHRoaXMuc2V0KHIsIGcsIGIpO1xuICB9XG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYHJnYigke01hdGgucm91bmQodGhpcy5yKX0sICR7TWF0aC5yb3VuZCh0aGlzLmcpfSwgJHtNYXRoLnJvdW5kKFxuICAgICAgdGhpcy5iXG4gICAgKX0pYDtcbiAgfVxuICBwdWJsaWMgc2V0KHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIpIHtcbiAgICB0aGlzLnIgPSB0aGlzLmNsYW1wKHIpO1xuICAgIHRoaXMuZyA9IHRoaXMuY2xhbXAoZyk7XG4gICAgdGhpcy5iID0gdGhpcy5jbGFtcChiKTtcbiAgfVxuICBwdWJsaWMgaHVlUm90YXRlKGFuZ2xlID0gMCkge1xuICAgIGFuZ2xlID0gKGFuZ2xlIC8gMTgwKSAqIE1hdGguUEk7XG4gICAgY29uc3Qgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xuICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICB0aGlzLm11bHRpcGx5KFtcbiAgICAgIDAuMjEzICsgY29zICogMC43ODcgLSBzaW4gKiAwLjIxMyxcbiAgICAgIDAuNzE1IC0gY29zICogMC43MTUgLSBzaW4gKiAwLjcxNSxcbiAgICAgIDAuMDcyIC0gY29zICogMC4wNzIgKyBzaW4gKiAwLjkyOCxcbiAgICAgIDAuMjEzIC0gY29zICogMC4yMTMgKyBzaW4gKiAwLjE0MyxcbiAgICAgIDAuNzE1ICsgY29zICogMC4yODUgKyBzaW4gKiAwLjE0LFxuICAgICAgMC4wNzIgLSBjb3MgKiAwLjA3MiAtIHNpbiAqIDAuMjgzLFxuICAgICAgMC4yMTMgLSBjb3MgKiAwLjIxMyAtIHNpbiAqIDAuNzg3LFxuICAgICAgMC43MTUgLSBjb3MgKiAwLjcxNSArIHNpbiAqIDAuNzE1LFxuICAgICAgMC4wNzIgKyBjb3MgKiAwLjkyOCArIHNpbiAqIDAuMDcyXG4gICAgXSk7XG4gIH1cbiAgcHVibGljIGdyYXlzY2FsZSh2YWx1ZSA9IDEpIHtcbiAgICB0aGlzLm11bHRpcGx5KFtcbiAgICAgIDAuMjEyNiArIDAuNzg3NCAqICgxIC0gdmFsdWUpLFxuICAgICAgMC43MTUyIC0gMC43MTUyICogKDEgLSB2YWx1ZSksXG4gICAgICAwLjA3MjIgLSAwLjA3MjIgKiAoMSAtIHZhbHVlKSxcbiAgICAgIDAuMjEyNiAtIDAuMjEyNiAqICgxIC0gdmFsdWUpLFxuICAgICAgMC43MTUyICsgMC4yODQ4ICogKDEgLSB2YWx1ZSksXG4gICAgICAwLjA3MjIgLSAwLjA3MjIgKiAoMSAtIHZhbHVlKSxcbiAgICAgIDAuMjEyNiAtIDAuMjEyNiAqICgxIC0gdmFsdWUpLFxuICAgICAgMC43MTUyIC0gMC43MTUyICogKDEgLSB2YWx1ZSksXG4gICAgICAwLjA3MjIgKyAwLjkyNzggKiAoMSAtIHZhbHVlKVxuICAgIF0pO1xuICB9XG4gIHB1YmxpYyBzZXBpYSh2YWx1ZSA9IDEpIHtcbiAgICB0aGlzLm11bHRpcGx5KFtcbiAgICAgIDAuMzkzICsgMC42MDcgKiAoMSAtIHZhbHVlKSxcbiAgICAgIDAuNzY5IC0gMC43NjkgKiAoMSAtIHZhbHVlKSxcbiAgICAgIDAuMTg5IC0gMC4xODkgKiAoMSAtIHZhbHVlKSxcbiAgICAgIDAuMzQ5IC0gMC4zNDkgKiAoMSAtIHZhbHVlKSxcbiAgICAgIDAuNjg2ICsgMC4zMTQgKiAoMSAtIHZhbHVlKSxcbiAgICAgIDAuMTY4IC0gMC4xNjggKiAoMSAtIHZhbHVlKSxcbiAgICAgIDAuMjcyIC0gMC4yNzIgKiAoMSAtIHZhbHVlKSxcbiAgICAgIDAuNTM0IC0gMC41MzQgKiAoMSAtIHZhbHVlKSxcbiAgICAgIDAuMTMxICsgMC44NjkgKiAoMSAtIHZhbHVlKVxuICAgIF0pO1xuICB9XG4gIHB1YmxpYyBzYXR1cmF0ZSh2YWx1ZSA9IDEpIHtcbiAgICB0aGlzLm11bHRpcGx5KFtcbiAgICAgIDAuMjEzICsgMC43ODcgKiB2YWx1ZSxcbiAgICAgIDAuNzE1IC0gMC43MTUgKiB2YWx1ZSxcbiAgICAgIDAuMDcyIC0gMC4wNzIgKiB2YWx1ZSxcbiAgICAgIDAuMjEzIC0gMC4yMTMgKiB2YWx1ZSxcbiAgICAgIDAuNzE1ICsgMC4yODUgKiB2YWx1ZSxcbiAgICAgIDAuMDcyIC0gMC4wNzIgKiB2YWx1ZSxcbiAgICAgIDAuMjEzIC0gMC4yMTMgKiB2YWx1ZSxcbiAgICAgIDAuNzE1IC0gMC43MTUgKiB2YWx1ZSxcbiAgICAgIDAuMDcyICsgMC45MjggKiB2YWx1ZVxuICAgIF0pO1xuICB9XG4gIHB1YmxpYyBtdWx0aXBseShtYXRyaXg6IG51bWJlcltdKSB7XG4gICAgY29uc3QgbmV3UiA9IHRoaXMuY2xhbXAoXG4gICAgICB0aGlzLnIgKiBtYXRyaXhbMF0gKyB0aGlzLmcgKiBtYXRyaXhbMV0gKyB0aGlzLmIgKiBtYXRyaXhbMl1cbiAgICApO1xuICAgIGNvbnN0IG5ld0cgPSB0aGlzLmNsYW1wKFxuICAgICAgdGhpcy5yICogbWF0cml4WzNdICsgdGhpcy5nICogbWF0cml4WzRdICsgdGhpcy5iICogbWF0cml4WzVdXG4gICAgKTtcbiAgICBjb25zdCBuZXdCID0gdGhpcy5jbGFtcChcbiAgICAgIHRoaXMuciAqIG1hdHJpeFs2XSArIHRoaXMuZyAqIG1hdHJpeFs3XSArIHRoaXMuYiAqIG1hdHJpeFs4XVxuICAgICk7XG4gICAgdGhpcy5yID0gbmV3UjtcbiAgICB0aGlzLmcgPSBuZXdHO1xuICAgIHRoaXMuYiA9IG5ld0I7XG4gIH1cbiAgcHVibGljIGJyaWdodG5lc3ModmFsdWUgPSAxKSB7XG4gICAgdGhpcy5saW5lYXIodmFsdWUpO1xuICB9XG4gIHB1YmxpYyBjb250cmFzdCh2YWx1ZSA9IDEpIHtcbiAgICB0aGlzLmxpbmVhcih2YWx1ZSwgLSgwLjUgKiB2YWx1ZSkgKyAwLjUpO1xuICB9XG4gIHB1YmxpYyBsaW5lYXIoc2xvcGUgPSAxLCBpbnRlcmNlcHQgPSAwKSB7XG4gICAgdGhpcy5yID0gdGhpcy5jbGFtcCh0aGlzLnIgKiBzbG9wZSArIGludGVyY2VwdCAqIDI1NSk7XG4gICAgdGhpcy5nID0gdGhpcy5jbGFtcCh0aGlzLmcgKiBzbG9wZSArIGludGVyY2VwdCAqIDI1NSk7XG4gICAgdGhpcy5iID0gdGhpcy5jbGFtcCh0aGlzLmIgKiBzbG9wZSArIGludGVyY2VwdCAqIDI1NSk7XG4gIH1cbiAgcHVibGljIGludmVydCh2YWx1ZSA9IDEpIHtcbiAgICB0aGlzLnIgPSB0aGlzLmNsYW1wKCh2YWx1ZSArICh0aGlzLnIgLyAyNTUpICogKDEgLSAyICogdmFsdWUpKSAqIDI1NSk7XG4gICAgdGhpcy5nID0gdGhpcy5jbGFtcCgodmFsdWUgKyAodGhpcy5nIC8gMjU1KSAqICgxIC0gMiAqIHZhbHVlKSkgKiAyNTUpO1xuICAgIHRoaXMuYiA9IHRoaXMuY2xhbXAoKHZhbHVlICsgKHRoaXMuYiAvIDI1NSkgKiAoMSAtIDIgKiB2YWx1ZSkpICogMjU1KTtcbiAgfVxuICBwdWJsaWMgaHNsKCkge1xuICAgIC8vIENvZGUgdGFrZW4gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvOTQ5MzA2MC8yNjg4MDI3LCBsaWNlbnNlZCB1bmRlciBDQyBCWS1TQS5cbiAgICBjb25zdCByID0gdGhpcy5yIC8gMjU1O1xuICAgIGNvbnN0IGcgPSB0aGlzLmcgLyAyNTU7XG4gICAgY29uc3QgYiA9IHRoaXMuYiAvIDI1NTtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBsZXQgaCA9IDA7XG4gICAgbGV0IHMgPSAwO1xuICAgIGxldCBsID0gKG1heCArIG1pbikgLyAyO1xuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgaCA9IHMgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkID0gbWF4IC0gbWluO1xuICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgY2FzZSByOlxuICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBnOlxuICAgICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgYjpcbiAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaCAvPSA2O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaDogaCAqIDEwMCxcbiAgICAgIHM6IHMgKiAxMDAsXG4gICAgICBsOiBsICogMTAwXG4gICAgfTtcbiAgfVxuICBwdWJsaWMgY2xhbXAodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA+IDI1NSkge1xuICAgICAgdmFsdWUgPSAyNTU7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgIHZhbHVlID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKEMpIDIwMjAgTWFya3VzIFBlbG9zb1xuLy9cbi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIG9zbS1hcHAtY29tcG9uZW50LlxuLy9cbi8vIG9zbS1hcHAtY29tcG9uZW50IGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4vLyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbi8vIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vL1xuLy8gb3NtLWFwcC1jb21wb25lbnQgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbi8vXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggb3NtLWFwcC1jb21wb25lbnQuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vQ29sb3JcIjtcblxuZXhwb3J0IGNsYXNzIFNvbHZlciB7XG4gIHB1YmxpYyB0YXJnZXQ6IENvbG9yO1xuICBwdWJsaWMgdGFyZ2V0SFNMOiB7IGg6IG51bWJlcjsgczogbnVtYmVyOyBsOiBudW1iZXIgfTtcbiAgcHVibGljIHJldXNlZENvbG9yOiBDb2xvcjtcbiAgY29uc3RydWN0b3IodGFyZ2V0OiBDb2xvcikge1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMudGFyZ2V0SFNMID0gdGFyZ2V0LmhzbCgpO1xuICAgIHRoaXMucmV1c2VkQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMCk7XG4gIH1cbiAgcHVibGljIHNvbHZlKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc29sdmVOYXJyb3codGhpcy5zb2x2ZVdpZGUoKSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlczogcmVzdWx0LnZhbHVlcyxcbiAgICAgIGxvc3M6IHJlc3VsdC5sb3NzLFxuICAgICAgZmlsdGVyOiB0aGlzLmNzcyhyZXN1bHQudmFsdWVzKVxuICAgIH07XG4gIH1cbiAgcHVibGljIHNvbHZlV2lkZSgpIHtcbiAgICBjb25zdCBBID0gNTtcbiAgICBjb25zdCBjID0gMTU7XG4gICAgY29uc3QgYSA9IFs2MCwgMTgwLCAxODAwMCwgNjAwLCAxLjIsIDEuMl07XG4gICAgbGV0IGJlc3Q6IHsgbG9zczogbnVtYmVyOyB2YWx1ZXM6IG51bWJlcltdIH0gPSB7XG4gICAgICBsb3NzOiBJbmZpbml0eSxcbiAgICAgIHZhbHVlczogW11cbiAgICB9O1xuICAgIGZvciAobGV0IGkgPSAwOyBiZXN0Lmxvc3MgPiAyNSAmJiBpIDwgMzsgaSsrKSB7XG4gICAgICBjb25zdCBpbml0aWFsID0gWzUwLCAyMCwgMzc1MCwgNTAsIDEwMCwgMTAwXTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3BzYShBLCBhLCBjLCBpbml0aWFsLCAxMDAwKTtcbiAgICAgIGlmIChyZXN1bHQubG9zcyA8IGJlc3QubG9zcykge1xuICAgICAgICBiZXN0ID0gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYmVzdDtcbiAgfVxuICBwdWJsaWMgc29sdmVOYXJyb3cod2lkZTogeyBsb3NzOiBudW1iZXI7IHZhbHVlczogbnVtYmVyW10gfSkge1xuICAgIGNvbnN0IEEgPSB3aWRlLmxvc3M7XG4gICAgY29uc3QgYyA9IDI7XG4gICAgY29uc3QgQTEgPSBBICsgMTtcbiAgICBjb25zdCBhID0gWzAuMjUgKiBBMSwgMC4yNSAqIEExLCBBMSwgMC4yNSAqIEExLCAwLjIgKiBBMSwgMC4yICogQTFdO1xuICAgIHJldHVybiB0aGlzLnNwc2EoQSwgYSwgYywgd2lkZS52YWx1ZXMsIDUwMCk7XG4gIH1cbiAgcHVibGljIHNwc2EoXG4gICAgQTogbnVtYmVyLFxuICAgIGE6IG51bWJlcltdLFxuICAgIGM6IG51bWJlcixcbiAgICB2YWx1ZXM6IG51bWJlcltdLFxuICAgIGl0ZXJzOiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgYWxwaGEgPSAxO1xuICAgIGNvbnN0IGdhbW1hID0gMC4xNjY2NjY2NjY2NjY2NjY2NjtcbiAgICBsZXQgYmVzdDogbnVtYmVyW10gPSBbXTtcbiAgICBsZXQgYmVzdExvc3MgPSBJbmZpbml0eTtcbiAgICBjb25zdCBkZWx0YXMgPSBuZXcgQXJyYXkoNik7XG4gICAgY29uc3QgaGlnaEFyZ3MgPSBuZXcgQXJyYXkoNik7XG4gICAgY29uc3QgbG93QXJncyA9IG5ldyBBcnJheSg2KTtcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IGl0ZXJzOyBrKyspIHtcbiAgICAgIGNvbnN0IGNrID0gYyAvIE1hdGgucG93KGsgKyAxLCBnYW1tYSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBkZWx0YXNbaV0gPSBNYXRoLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xO1xuICAgICAgICBoaWdoQXJnc1tpXSA9IHZhbHVlc1tpXSArIGNrICogZGVsdGFzW2ldO1xuICAgICAgICBsb3dBcmdzW2ldID0gdmFsdWVzW2ldIC0gY2sgKiBkZWx0YXNbaV07XG4gICAgICB9XG4gICAgICBjb25zdCBsb3NzRGlmZiA9IHRoaXMubG9zcyhoaWdoQXJncykgLSB0aGlzLmxvc3MobG93QXJncyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBjb25zdCBnID0gKGxvc3NEaWZmIC8gKDIgKiBjaykpICogZGVsdGFzW2ldO1xuICAgICAgICBjb25zdCBhayA9IGFbaV0gLyBNYXRoLnBvdyhBICsgayArIDEsIGFscGhhKTtcbiAgICAgICAgdmFsdWVzW2ldID0gZml4KHZhbHVlc1tpXSAtIGFrICogZywgaSk7XG4gICAgICB9XG4gICAgICBjb25zdCBsb3NzID0gdGhpcy5sb3NzKHZhbHVlcyk7XG4gICAgICBpZiAobG9zcyA8IGJlc3RMb3NzKSB7XG4gICAgICAgIGJlc3QgPSB2YWx1ZXMuc2xpY2UoMCk7XG4gICAgICAgIGJlc3RMb3NzID0gbG9zcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWVzOiBiZXN0LCBsb3NzOiBiZXN0TG9zcyB9O1xuICAgIGZ1bmN0aW9uIGZpeCh2YWx1ZTogbnVtYmVyLCBpZHg6IG51bWJlcikge1xuICAgICAgbGV0IG1heCA9IDEwMDtcbiAgICAgIGlmIChpZHggPT09IDIgLyogc2F0dXJhdGUgKi8pIHtcbiAgICAgICAgbWF4ID0gNzUwMDtcbiAgICAgIH0gZWxzZSBpZiAoaWR4ID09PSA0IC8qIGJyaWdodG5lc3MgKi8gfHwgaWR4ID09PSA1IC8qIGNvbnRyYXN0ICovKSB7XG4gICAgICAgIG1heCA9IDIwMDtcbiAgICAgIH1cbiAgICAgIGlmIChpZHggPT09IDMgLyogaHVlLXJvdGF0ZSAqLykge1xuICAgICAgICBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgICAgICB2YWx1ZSAlPSBtYXg7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCAwKSB7XG4gICAgICAgICAgdmFsdWUgPSBtYXggKyAodmFsdWUgJSBtYXgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID4gbWF4KSB7XG4gICAgICAgIHZhbHVlID0gbWF4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgbG9zcyhmaWx0ZXJzOiBudW1iZXJbXSkge1xuICAgIC8vIEFyZ3VtZW50IGlzIGFycmF5IG9mIHBlcmNlbnRhZ2VzLlxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5yZXVzZWRDb2xvcjtcbiAgICBjb2xvci5zZXQoMCwgMCwgMCk7XG4gICAgY29sb3IuaW52ZXJ0KGZpbHRlcnNbMF0gLyAxMDApO1xuICAgIGNvbG9yLnNlcGlhKGZpbHRlcnNbMV0gLyAxMDApO1xuICAgIGNvbG9yLnNhdHVyYXRlKGZpbHRlcnNbMl0gLyAxMDApO1xuICAgIGNvbG9yLmh1ZVJvdGF0ZShmaWx0ZXJzWzNdICogMy42KTtcbiAgICBjb2xvci5icmlnaHRuZXNzKGZpbHRlcnNbNF0gLyAxMDApO1xuICAgIGNvbG9yLmNvbnRyYXN0KGZpbHRlcnNbNV0gLyAxMDApO1xuICAgIGNvbnN0IGNvbG9ySFNMID0gY29sb3IuaHNsKCk7XG4gICAgcmV0dXJuIChcbiAgICAgIE1hdGguYWJzKGNvbG9yLnIgLSB0aGlzLnRhcmdldC5yKSArXG4gICAgICBNYXRoLmFicyhjb2xvci5nIC0gdGhpcy50YXJnZXQuZykgK1xuICAgICAgTWF0aC5hYnMoY29sb3IuYiAtIHRoaXMudGFyZ2V0LmIpICtcbiAgICAgIE1hdGguYWJzKGNvbG9ySFNMLmggLSB0aGlzLnRhcmdldEhTTC5oKSArXG4gICAgICBNYXRoLmFicyhjb2xvckhTTC5zIC0gdGhpcy50YXJnZXRIU0wucykgK1xuICAgICAgTWF0aC5hYnMoY29sb3JIU0wubCAtIHRoaXMudGFyZ2V0SFNMLmwpXG4gICAgKTtcbiAgfVxuICBwdWJsaWMgY3NzKGZpbHRlcnM6IG51bWJlcltdKSB7XG4gICAgZnVuY3Rpb24gZm10KGlkeDogbnVtYmVyLCBtdWx0aXBsaWVyID0gMSkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZmlsdGVyc1tpZHhdICogbXVsdGlwbGllcik7XG4gICAgfVxuICAgIHJldHVybiBgZmlsdGVyOiBpbnZlcnQoJHtmbXQoMCl9JSkgc2VwaWEoJHtmbXQoMSl9JSkgc2F0dXJhdGUoJHtmbXQoXG4gICAgICAyXG4gICAgKX0lKSBodWUtcm90YXRlKCR7Zm10KDMsIDMuNil9ZGVnKSBicmlnaHRuZXNzKCR7Zm10KDQpfSUpIGNvbnRyYXN0KCR7Zm10KFxuICAgICAgNVxuICAgICl9JSk7YDtcbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChDKSAyMDIwIE1hcmt1cyBQZWxvc29cbi8vXG4vLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBPU00gQXBwcyBDYXRhbG9nLlxuLy9cbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbi8vIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuLy8gTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vL1xuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIE9TTSBBcHBzIENhdGFsb2cuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuLi8uLi9kYXRhL3RlbXBsYXRlL3V0aWxpdGllc1wiO1xuXG5jb25zdCBtb2JpbGVQbGF0Zm9ybXMgPSBbXG4gIFwiQU5EUk9JRFwiLFxuICBcIkdBUk1JTlwiLFxuICBcIktJTkRMRVwiLFxuICBcIk1BRU1PXCIsXG4gIFwiTUVFR09cIixcbiAgXCJQQUxNIE9TXCIsXG4gIFwiU1lNQklBTlwiLFxuICBcIlVCVU5UVSBQSE9ORVwiLFxuICBcIlVCVU5UVSBUT1VDSFwiLFxuICBcIldFQk9TXCIsXG4gIFwiV0lORE9XUyBNT0JJTEVcIixcbiAgXCJXSU5ET1dTIFBIT05FXCIsXG4gIFwiSU9TXCIsXG4gIFwiWkFVUlVTXCIsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gbW9iaWxlKGE6IEFwcCkge1xuICByZXR1cm4gKFxuICAgIGEudG9waWNzXG4gICAgICAubWFwKCh0KSA9PiB0LnRvVXBwZXJDYXNlKCkpXG4gICAgICAuc29tZSgodCkgPT4gW1wiT0ZGTElORVwiLCBcIkNBQ0hFXCJdLmluY2x1ZGVzKHQpKSB8fFxuICAgIGEucGxhdGZvcm1cbiAgICAgIC5tYXAoKHQpID0+IHQudG9VcHBlckNhc2UoKSlcbiAgICAgIC5zb21lKCh0KSA9PiBtb2JpbGVQbGF0Zm9ybXMuaW5jbHVkZXModCkpIHx8XG4gICAgYS5pbnN0YWxsLmFzaW4gfHxcbiAgICBhLmluc3RhbGwuZkRyb2lkSUQgfHxcbiAgICBhLmluc3RhbGwuZ29vZ2xlUGxheUlEIHx8XG4gICAgYS5pbnN0YWxsLmh1YXdlaUFwcEdhbGxlcnlJRCB8fFxuICAgIGEuaW5zdGFsbC5hcHBsZVN0b3JlSURcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpb24oYTogQXBwKSB7XG4gIHJldHVybiBhLnRvcGljc1xuICAgIC5tYXAoKHQpID0+IHQudG9VcHBlckNhc2UoKSlcbiAgICAuc29tZSgodCkgPT4gW1wiTkFWSVwiLCBcIlJPVVRJTkdcIiwgXCJST1VURVJcIl0uaW5jbHVkZXModCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWRpdChhOiBBcHApIHtcbiAgcmV0dXJuIGEudG9waWNzXG4gICAgLm1hcCgodCkgPT4gdC50b1VwcGVyQ2FzZSgpKVxuICAgIC5zb21lKCh0KSA9PlxuICAgICAgW1xuICAgICAgICBcIkFERCBQT0lTXCIsXG4gICAgICAgIFwiRURJVFwiLFxuICAgICAgICBcIkVESVRJTkdcIixcbiAgICAgICAgXCJFRElUT1JcIixcbiAgICAgICAgXCJBTkFMWVNFXCIsXG4gICAgICAgIFwiQU5BTFlTRVJcIixcbiAgICAgICAgXCJBTkFMWVNJU1wiLFxuICAgICAgICBcIlRSQUNLIFJFQ09SRElOR1wiLFxuICAgICAgICBcIlRSQUNLRVJcIixcbiAgICAgICAgXCJUUkFDS0lOR1wiLFxuICAgICAgICBcIlZBTElEQVRPUlwiLFxuICAgICAgICBcIk9TTSBUT09MXCIsXG4gICAgICAgIFwiUUFcIixcbiAgICAgICAgXCJRVUFMSVRZIENPTlRST0xcIixcbiAgICAgICAgXCJOT1RFU1wiXG4gICAgICBdLmluY2x1ZGVzKHQpXG4gICAgKTtcbn1cbiIsIi8vIENvcHlyaWdodCAoQykgMjAyMCBNYXJrdXMgUGVsb3NvXG4vLyBcbi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE9TTSBBcHBzIENhdGFsb2cuXG4vLyBcbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbi8vIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuLy8gTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbi8vIFxuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy8gXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggT1NNIEFwcHMgQ2F0YWxvZy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEh0bWxFbGVtZW50PEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+KFxuICBzZWxlY3RvcnM6IEssXG4gIGNvbnRlbnRFbGVtZW50PzogUGFyZW50Tm9kZVxuKTogSFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdO1xuZXhwb3J0IGZ1bmN0aW9uIGdldEh0bWxFbGVtZW50KFxuICBzZWxlY3RvcnM6IHN0cmluZyxcbiAgY29udGVudEVsZW1lbnQ/OiBQYXJlbnROb2RlXG4pOiBIVE1MRWxlbWVudDtcbmV4cG9ydCBmdW5jdGlvbiBnZXRIdG1sRWxlbWVudChcbiAgc2VsZWN0b3JzOiBzdHJpbmcsXG4gIGNvbnRlbnRFbGVtZW50OiBQYXJlbnROb2RlID0gZG9jdW1lbnRcbik6IEhUTUxFbGVtZW50IHtcbiAgY29uc3QgZWxlbWVudCA9IGNvbnRlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzKTtcblxuICBpZiAoIWVsZW1lbnQpIHRocm93IGBFbGVtZW50ICR7c2VsZWN0b3JzfSBub3QgZm91bmQuYDtcblxuICByZXR1cm4gZWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEh0bWxFbGVtZW50cyhcbiAgc2VsZWN0b3JzOiBzdHJpbmcsXG4gIGNvbnRlbnRFbGVtZW50PzogUGFyZW50Tm9kZVxuKTogSFRNTEVsZW1lbnRbXTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRIdG1sRWxlbWVudHMoXG4gIHNlbGVjdG9yczogc3RyaW5nLFxuICBjb250ZW50RWxlbWVudDogUGFyZW50Tm9kZSA9IGRvY3VtZW50XG4pOiBIVE1MRWxlbWVudFtdIHtcbiAgY29uc3QgZWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgY29udGVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMpLmZvckVhY2godiA9PiB7XG4gICAgZWxlbWVudHMucHVzaCh2IGFzIEhUTUxFbGVtZW50KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudDxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPihcbiAgdGFnOiBLLFxuICBpbm5lckhUTUw6IHN0cmluZyA9IFwiXCIsXG4gIGNsYXNzTmFtZXM6IHN0cmluZ1tdID0gW11cbikge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICBlbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMuZmlsdGVyKGMgPT4gYykpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbiIsIi8vIENvcHlyaWdodCAoQykgMjAyMCBNYXJrdXMgUGVsb3NvXG4vL1xuLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgT1NNIEFwcHMgQ2F0YWxvZy5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4vLyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbi8vIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vL1xuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy9cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCBPU00gQXBwcyBDYXRhbG9nLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5pbXBvcnQgKiBhcyBtZDUgZnJvbSBcIm1kNVwiO1xuaW1wb3J0IHsgaHR0cFJlZ2V4IH0gZnJvbSBcIi4vdXJsXCI7XG5pbXBvcnQgeyBzdGFydHNXaXRoSWdub3JlQ2FzZSB9IGZyb20gXCIuL3N0cmluZ1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9XaWtpbWVkaWFVcmwoc291cmNlOiBzdHJpbmcsIHNpemU6IG51bWJlcikge1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIFtdIGFzIHN0cmluZ1tdO1xuXG4gIGlmIChodHRwUmVnZXgudGVzdChzb3VyY2UpKSB7XG4gICAgcmV0dXJuIFtzb3VyY2VdO1xuICB9IGVsc2UgaWYgKHN0YXJ0c1dpdGhJZ25vcmVDYXNlKHNvdXJjZSwgXCJGaWxlOlwiKSkge1xuICAgIGNvbnN0IGZpbGVOYW1lID0gc291cmNlLnN1YnN0cmluZyg1LCBzb3VyY2UubGVuZ3RoKTtcblxuICAgIHJldHVybiBbXG4gICAgICAuLi5nZW5lcmF0ZU9zbVdpa2ltZWRpYVVybHMoZmlsZU5hbWUsIHNpemUpLFxuICAgICAgLi4uZ2VuZXJhdGVDb21tb25zV2lraW1lZGlhVXJscyhmaWxlTmFtZSwgc2l6ZSksXG4gICAgXTtcbiAgfSBlbHNlIGlmIChcbiAgICBzdGFydHNXaXRoSWdub3JlQ2FzZShzb3VyY2UsIFwiaHR0cHM6Ly93aWtpLm9wZW5zdHJlZXRtYXAub3JnL3dpa2kvRmlsZTpcIilcbiAgKVxuICAgIHJldHVybiBnZW5lcmF0ZU9zbVdpa2ltZWRpYVVybHMoc291cmNlLnN1YnN0cmluZyg0MSwgc291cmNlLmxlbmd0aCksIHNpemUpO1xuICBlbHNlIGlmIChcbiAgICBzdGFydHNXaXRoSWdub3JlQ2FzZShzb3VyY2UsIFwiaHR0cDovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvd2lraS9GaWxlOlwiKVxuICApXG4gICAgcmV0dXJuIGdlbmVyYXRlT3NtV2lraW1lZGlhVXJscyhzb3VyY2Uuc3Vic3RyaW5nKDQwLCBzb3VyY2UubGVuZ3RoKSwgc2l6ZSk7XG4gIGVsc2UgaWYgKFxuICAgIHN0YXJ0c1dpdGhJZ25vcmVDYXNlKHNvdXJjZSwgXCJodHRwczovL2NvbW1vbnMud2lraW1lZGlhLm9yZy93aWtpL0ZpbGU6XCIpXG4gIClcbiAgICByZXR1cm4gZ2VuZXJhdGVDb21tb25zV2lraW1lZGlhVXJscyhcbiAgICAgIHNvdXJjZS5zdWJzdHJpbmcoNDAsIHNvdXJjZS5sZW5ndGgpLFxuICAgICAgc2l6ZVxuICAgICk7XG4gIGVsc2UgaWYgKFxuICAgIHN0YXJ0c1dpdGhJZ25vcmVDYXNlKHNvdXJjZSwgXCJodHRwOi8vY29tbW9ucy53aWtpbWVkaWEub3JnL3dpa2kvRmlsZTpcIilcbiAgKVxuICAgIHJldHVybiBnZW5lcmF0ZUNvbW1vbnNXaWtpbWVkaWFVcmxzKFxuICAgICAgc291cmNlLnN1YnN0cmluZygzOSwgc291cmNlLmxlbmd0aCksXG4gICAgICBzaXplXG4gICAgKTtcbiAgZWxzZVxuICAgIHJldHVybiBbXG4gICAgICAuLi5nZW5lcmF0ZU9zbVdpa2ltZWRpYVVybHMoc291cmNlLCBzaXplKSxcbiAgICAgIC4uLmdlbmVyYXRlQ29tbW9uc1dpa2ltZWRpYVVybHMoc291cmNlLCBzaXplKSxcbiAgICBdO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZU9zbVdpa2ltZWRpYVVybHMoZmlsZU5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyKSB7XG4gIHJldHVybiBnZW5lcmF0ZVdpa2ltZWRpYVVybHMoXG4gICAgXCJodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvdy9pbWFnZXNcIixcbiAgICBmaWxlTmFtZSxcbiAgICBzaXplXG4gICk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ29tbW9uc1dpa2ltZWRpYVVybHMoZmlsZU5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyKSB7XG4gIHJldHVybiBnZW5lcmF0ZVdpa2ltZWRpYVVybHMoXG4gICAgXCJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zXCIsXG4gICAgZmlsZU5hbWUsXG4gICAgc2l6ZVxuICApO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVdpa2ltZWRpYVVybHMoYmFzZTogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIpIHtcbiAgZmlsZU5hbWUgPSBkZWNvZGVVUkkoZmlsZU5hbWUpLnJlcGxhY2UoLyAvZywgXCJfXCIpO1xuICBjb25zdCBoYXNoID0gbWQ1KGZpbGVOYW1lKTtcblxuICByZXR1cm4gW1xuICAgIGAke2Jhc2V9L3RodW1iLyR7aGFzaC5zdWJzdHJpbmcoMCwgMSl9LyR7aGFzaC5zdWJzdHJpbmcoXG4gICAgICAwLFxuICAgICAgMlxuICAgICl9LyR7ZmlsZU5hbWV9LyR7c2l6ZX1weC0ke2ZpbGVOYW1lfSR7XG4gICAgICBmaWxlTmFtZS50b1VwcGVyQ2FzZSgpLmVuZHNXaXRoKFwiLlNWR1wiKSA/IFwiLnBuZ1wiIDogXCJcIlxuICAgIH1gLFxuXG4gICAgYCR7YmFzZX0vJHtoYXNoLnN1YnN0cmluZygwLCAxKX0vJHtoYXNoLnN1YnN0cmluZygwLCAyKX0vJHtmaWxlTmFtZX1gLFxuICBdO1xufVxuIiwiLy8gQ29weXJpZ2h0IChDKSAyMDIwIE1hcmt1cyBQZWxvc29cbi8vXG4vLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBPU00gQXBwcyBDYXRhbG9nLlxuLy9cbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbi8vIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuLy8gTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vL1xuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIE9TTSBBcHBzIENhdGFsb2cuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmltcG9ydCB7IHV0aWxRc1N0cmluZyB9IGZyb20gXCIuL3VybFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SnNvbih1cmw6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9PyR7dXRpbFFzU3RyaW5nKHBhcmFtcyl9YCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLypcIixcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG59XG4iLCJpbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi4vLi4vZGF0YS90ZW1wbGF0ZS91dGlsaXRpZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckltYWdlKG9iajogQXBwKSB7XG4gIGNvbnN0IGRlZmF1bHRJbWFnZSA9XG4gICAgXCJodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvdy9pbWFnZXMvdGh1bWIvYy9jYS9NYXAtMTQuc3ZnLzE0MHB4LU1hcC0xNC5zdmcucG5nXCI7XG5cbiAgaWYgKG9iai5pbWFnZXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBgPGltZyBjbGFzcz1cImltZ1wiIHNyYz1cIiR7ZGVmYXVsdEltYWdlfVwiIGR5bmFtaWMtc3JjPVwiJHtvYmouaW1hZ2VzLmpvaW4oXG4gICAgICBcIiBcIlxuICAgICl9ICR7ZGVmYXVsdEltYWdlfVwiLz5gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgPGltZyBjbGFzcz1cImltZ1wiIHN0eWxlPVwiJHtvYmouZmlsdGVyfVwiIHNyYz1cIiR7ZGVmYXVsdEltYWdlfVwiLz5gO1xuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKEMpIDIwMjAgTWFya3VzIFBlbG9zb1xuLy8gXG4vLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBPU00gQXBwcyBDYXRhbG9nLlxuLy8gXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4vLyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbi8vIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vLyBcbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbi8vIFxuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIE9TTSBBcHBzIENhdGFsb2cuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQ8VCBleHRlbmRzIHt9PihrZXk6IHN0cmluZywgdmFsdWU6IFQpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0PFQgZXh0ZW5kcyB7fT4oa2V5OiBzdHJpbmcpOiBUIHwgdW5kZWZpbmVkIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoIXYpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIEpTT04ucGFyc2Uodik7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoQykgMjAyMCBNYXJrdXMgUGVsb3NvXG4vL1xuLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgT1NNIEFwcHMgQ2F0YWxvZy5cbi8vXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4vLyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbi8vIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vL1xuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuLy8gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbi8vIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy9cbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCBPU00gQXBwcyBDYXRhbG9nLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzSWdub3JlQ2FzZShhOiBzdHJpbmcgfCB1bmRlZmluZWQsIGI6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICByZXR1cm4gdHlwZW9mIGEgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGIgPT09IFwic3RyaW5nXCJcbiAgICA/IGEudG9VcHBlckNhc2UoKSA9PT0gYi50b1VwcGVyQ2FzZSgpXG4gICAgOiBhID09PSBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzWWVzKC4uLnZhbHVlczogKHN0cmluZyB8IHVuZGVmaW5lZClbXSkge1xuICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykgaWYgKHZhbHVlPy50b1VwcGVyQ2FzZSgpID09PSBcIllFU1wiKSByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydHNXaXRoSWdub3JlQ2FzZShcbiAgczogc3RyaW5nLFxuICBzZWFyY2hTdHJpbmc6IHN0cmluZyxcbiAgcG9zaXRpb24/OiBudW1iZXJcbikge1xuICByZXR1cm4gcy50b1VwcGVyQ2FzZSgpLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nLnRvVXBwZXJDYXNlKCksIHBvc2l0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDbG9zaW5nQnJhY2tldEluZGV4KHN0cjogc3RyaW5nLCBwb3M6IG51bWJlcikge1xuICBpZiAoc3RyW3Bvc10gIT09IFwie1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHBvc2l0aW9uIG11c3QgY29udGFpbiBhbiBvcGVuaW5nIGJyYWNrZXRcIik7XG4gIH1cbiAgbGV0IGxldmVsID0gMTtcbiAgZm9yIChsZXQgaW5kZXggPSBwb3MgKyAxOyBpbmRleCA8IHN0ci5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBpZiAoc3RyW2luZGV4XSA9PT0gXCJ7XCIpIHtcbiAgICAgIGxldmVsKys7XG4gICAgfSBlbHNlIGlmIChzdHJbaW5kZXhdID09PSBcIn1cIikge1xuICAgICAgbGV2ZWwtLTtcbiAgICB9XG5cbiAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3RMZXR0ZXJUb1VwcGVyQ2FzZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3ZhbHVlWzBdLnRvVXBwZXJDYXNlKCl9JHt2YWx1ZS5zbGljZSgxKX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kRnVsbFN0b3AodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICh2YWx1ZSAmJiB2YWx1ZVt2YWx1ZS5sZW5ndGggLSAxXSAhPT0gXCIuXCIpIHJldHVybiBgJHt2YWx1ZX0uYDtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJpbSh2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgcmV0dXJuICh2YWx1ZSB8fCBcIlwiKS5yZXBsYWNlKC9eW1xcLlxcc10rfFtcXC5cXHNdKyQvZ20sIFwiXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlKHZhbHVlOiBzdHJpbmcpIHtcbiAgdmFsdWUgPSB0cmltKHZhbHVlKTtcbiAgaWYgKC9eWzAtOV17MSw0fS1bMC05XXsxLDJ9LVswLTldezEsMn0kL2dpLnRlc3QodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gIGVsc2UgcmV0dXJuIFwiXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0VG9Db2xvcihzOiBzdHJpbmcpIHtcbiAgbGV0IHIgPSAwO1xuICBsZXQgZyA9IDA7XG4gIGxldCBiID0gMDtcblxuICAvLyBmaXhlZCBjb2xvcnNcbiAgc3dpdGNoIChzLnRvVXBwZXJDYXNlKCkpIHtcbiAgICBjYXNlIFwiRlJFRVwiOlxuICAgIGNhc2UgXCJZRVNcIjpcbiAgICAgIHJldHVybiB7IHI6IDE1MywgZzogMjU1LCBiOiAxNTMgfTtcbiAgICBjYXNlIFwiTk9cIjpcbiAgICAgIHJldHVybiB7IHI6IDI1NSwgZzogMTUzLCBiOiAxNTMgfTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpICUgMyA9PT0gMCkgciA9IChyICsgcy5jaGFyQ29kZUF0KGkpKSAlIDI1NjtcbiAgICBlbHNlIGlmIChpICUgMyA9PT0gMSkgZyA9IChnICsgcy5jaGFyQ29kZUF0KGkpKSAlIDI1NjtcbiAgICBlbHNlIGIgPSAoYiArIHMuY2hhckNvZGVBdChpKSkgJSAyNTY7XG4gIH1cbiAgcmV0dXJuIHsgciwgZywgYiB9O1xufVxuIiwiLy8gQ29weXJpZ2h0IChDKSAyMDIwIE1hcmt1cyBQZWxvc29cbi8vIFxuLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgT1NNIEFwcHMgQ2F0YWxvZy5cbi8vIFxuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuLy8gcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlXG4vLyBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuLy8gXG4vLyBPU00gQXBwcyBDYXRhbG9nIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vLyBcbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gYWxvbmcgd2l0aCBPU00gQXBwcyBDYXRhbG9nLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG5leHBvcnQgY29uc3QgaHR0cFJlZ2V4ID0gL15odHRwcz86XFwvXFwvL2k7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1VybCh1cmw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICBpZiAoIXVybCkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICBpZiAoIWh0dHBSZWdleC50ZXN0KHVybCkpIHJldHVybiBgaHR0cDovLyR7dXJsfWA7XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvV2lraVVybCh3aWtpOiBzdHJpbmcpIHtcbiAgaWYgKCF3aWtpKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGlmIChodHRwUmVnZXgudGVzdCh3aWtpKSkgcmV0dXJuIHdpa2k7XG5cbiAgcmV0dXJuIGBodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvd2lraS8ke3dpa2l9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHV0aWxRc1N0cmluZyhvYmo6IGFueSwgbm9lbmNvZGU/OiBib29sZWFuKSB7XG4gIC8vIGVuY29kZSBldmVyeXRoaW5nIGV4Y2VwdCBzcGVjaWFsIGNoYXJhY3RlcnMgdXNlZCBpbiBjZXJ0YWluIGhhc2ggcGFyYW1ldGVyczpcbiAgLy8gXCIvXCIgaW4gbWFwIHN0YXRlcywgXCI6XCIsIFwiLFwiLCB7XCIgYW5kIFwifVwiIGluIGJhY2tncm91bmRcbiAgZnVuY3Rpb24gc29mdEVuY29kZShzOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzKS5yZXBsYWNlKFxuICAgICAgLyglMkZ8JTNBfCUyQ3wlN0J8JTdEKS9nLFxuICAgICAgZGVjb2RlVVJJQ29tcG9uZW50XG4gICAgKTtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKVxuICAgIC5zb3J0KClcbiAgICAubWFwKFxuICAgICAga2V5ID0+XG4gICAgICAgIGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke1xuICAgICAgICAgIG5vZW5jb2RlID8gc29mdEVuY29kZShvYmpba2V5XSkgOiBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pXG4gICAgICAgIH1gXG4gICAgKVxuICAgIC5qb2luKFwiJlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRHZXRQYXJhbWV0ZXIocGFyYW1ldGVyTmFtZTogc3RyaW5nKSB7XG4gIGxldCByZXN1bHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgbGV0IHRtcCA9IFtdO1xuICBsb2NhdGlvbi5zZWFyY2hcbiAgICAuc3Vic3RyaW5nKDEpXG4gICAgLnNwbGl0KFwiJlwiKVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB0bXAgPSBpdGVtLnNwbGl0KFwiPVwiKTtcbiAgICAgIGlmICh0bXBbMF0gPT09IHBhcmFtZXRlck5hbWUpIHJlc3VsdCA9IGRlY29kZVVSSUNvbXBvbmVudCh0bXBbMV0pO1xuICAgIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRHZXRQYXJhbWV0ZXJGcm9tSGFzaChwYXJhbWV0ZXJOYW1lOiBzdHJpbmcpIHtcbiAgbGV0IHJlc3VsdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBsZXQgdG1wID0gW107XG4gIGxvY2F0aW9uLmhhc2hcbiAgICAuc3Vic3RyaW5nKDEpXG4gICAgLnNwbGl0KFwiJlwiKVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB0bXAgPSBpdGVtLnNwbGl0KFwiPVwiKTtcbiAgICAgIGlmICh0bXBbMF0gPT09IHBhcmFtZXRlck5hbWUpIHJlc3VsdCA9IGRlY29kZVVSSUNvbXBvbmVudCh0bXBbMV0pO1xuICAgIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGdldEh0bWxFbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy9odG1sXCI7XG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi4vLi4vZGF0YS90ZW1wbGF0ZS91dGlsaXRpZXNcIjtcbmltcG9ydCB7IHJlbmRlckltYWdlIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9yZW5kZXJJbWFnZVwiO1xuaW1wb3J0IHsgcmVuZGVyQmFkZ2VzIH0gZnJvbSBcIi4vcmVuZGVyQmFkZ2VzXCI7XG5pbXBvcnQgeyB0ZW1wbGF0ZURhdGEgfSBmcm9tIFwiLi4vdGVtcGxhdGVEYXRhXCI7XG5pbXBvcnQgeyBnZXRMb2NhbGl6ZWRWYWx1ZSB9IGZyb20gXCIuLi9nZXRMb2NhbGl6ZWRWYWx1ZVwiO1xuaW1wb3J0IHsgdG9XaWtpVGFibGUsIHRvV2lraVZhbHVlIH0gZnJvbSBcIi4vdG9XaWtpVGFibGVcIjtcbmltcG9ydCB7IGVxdWFsc0lnbm9yZUNhc2UgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3N0cmluZ1wiO1xuaW1wb3J0IHsgbGFuZ3VhZ2VWYWx1ZVRvRGlzcGxheSB9IGZyb20gXCIuLi9sYW5ndWFnZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKGFwcHM6IEFwcFtdLCBsYW5nOiBzdHJpbmcpIHtcbiAge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KFxuICAgICAgXCJkaXZcIixcbiAgICAgIFtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJjZWxsIGhlYWRlciBwYXJhbS10aXRsZVwiPjwvZGl2PmAsXG4gICAgICAgIC4uLmFwcHMubWFwKFxuICAgICAgICAgIChhcHApID0+XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cImNlbGwgaGVhZGVyIHRleHQtY2VudGVyXCI+PGRpdiBjbGFzcz1cImNvcm5lci1iYWRnZVwiPiR7XG4gICAgICAgICAgICAgIGFwcC5saWJyZVxuICAgICAgICAgICAgICAgID8gJzxzcGFuIHRpdGxlPVwiTGlicmVcIj48aSBjbGFzcz1cImZhcyBmYS1mdyBmYS1ib29rLW9wZW5cIj48L2k+PC9zcGFuPidcbiAgICAgICAgICAgICAgICA6IGFwcC5ncmF0aXNcbiAgICAgICAgICAgICAgICA/ICc8c3BhbiB0aXRsZT1cIlByb3ByaWV0YXJ5XCI+PGkgY2xhc3M9XCJmYXMgZmEtd2luZS1ib3R0bGVcIj48L2k+PC9zcGFuPidcbiAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgIH0ke1xuICAgICAgICAgIGFwcC5ncmF0aXMgfHwgYXBwLmxpYnJlXG4gICAgICAgICAgICA/ICc8c3BhbiB0aXRsZT1cIkZyZWVcIj48aSBjbGFzcz1cImZhcyBmYS1mdyBmYS1naWZ0XCI+PC9pPjwvc3Bhbj4nXG4gICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgfTwvZGl2PjxzdHJvbmc+JHtcbiAgICAgICAgICAgICAgYXBwLndlYnNpdGVcbiAgICAgICAgICAgICAgICA/IGA8YSBocmVmPVwiJHthcHAud2Vic2l0ZX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2FwcC5uYW1lfTwvYT5gXG4gICAgICAgICAgICAgICAgOiBhcHAubmFtZVxuICAgICAgICAgICAgfTwvc3Ryb25nPjwvZGl2PmBcbiAgICAgICAgKSxcbiAgICAgIF0uam9pbihcIlwiKSxcbiAgICAgIFtcInJvd1wiLCBcImZpeGVkXCJdXG4gICAgKTtcblxuICAgIGdldEh0bWxFbGVtZW50KFwiI2NvbXBhcmVcIikuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIH1cblxuICAvLyBHZW5lcmFsXG4gIHJlbmRlckdyb3VwKFxuICAgIFwiZ2VuZXJhbFwiLFxuICAgIFwiR2VuZXJhbFwiLFxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICBoYXNWYWx1ZTogKGFwcCkgPT4gYXBwLmltYWdlcy5sZW5ndGggPiAwLFxuICAgICAgICByZW5kZXJUb0h0bWw6IChhcHApID0+XG4gICAgICAgICAgYXBwLndlYnNpdGVcbiAgICAgICAgICAgID8gYDxhIGhyZWY9XCIke2FwcC53ZWJzaXRlfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7cmVuZGVySW1hZ2UoYXBwKX08L2E+YFxuICAgICAgICAgICAgOiByZW5kZXJJbWFnZShhcHApLFxuICAgICAgICByZW5kZXJUb1dpa2k6IChhcHApID0+XG4gICAgICAgICAgYXBwLmltYWdlV2lraSA/IGBbW0ZpbGU6JHthcHAuaW1hZ2VXaWtpfXwxNjBweF1dYCA6IFwiXCIsXG4gICAgICAgIGNlbnRlcmVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICBoYXNWYWx1ZTogKGFwcCkgPT5cbiAgICAgICAgICAhIShcbiAgICAgICAgICAgIGFwcC53ZWJzaXRlIHx8XG4gICAgICAgICAgICBhcHAuaW5zdGFsbC5hc2luIHx8XG4gICAgICAgICAgICBhcHAuaW5zdGFsbC5mRHJvaWRJRCB8fFxuICAgICAgICAgICAgYXBwLmluc3RhbGwuZ29vZ2xlUGxheUlEIHx8XG4gICAgICAgICAgICBhcHAuaW5zdGFsbC5odWF3ZWlBcHBHYWxsZXJ5SUQgfHxcbiAgICAgICAgICAgIGFwcC5pbnN0YWxsLmFwcGxlU3RvcmVJRCB8fFxuICAgICAgICAgICAgYXBwLmluc3RhbGwubWFjQXBwU3RvcmVJRCB8fFxuICAgICAgICAgICAgYXBwLmluc3RhbGwubWljcm9zb2Z0QXBwSURcbiAgICAgICAgICApLFxuICAgICAgICByZW5kZXJUb0h0bWw6IChhcHApID0+IGAke1xuICAgICAgICAgIGFwcC53ZWJzaXRlXG4gICAgICAgICAgICA/IGA8YSBjbGFzcz1cImRvd25sb2FkXCIgaHJlZj1cIiR7YXBwLndlYnNpdGV9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJXZWJzaXRlXCI+PGkgY2xhc3M9XCJmYXIgZmEtbWFwXCI+PC9pPjwvYT5gXG4gICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgfVxuJHtcbiAgYXBwLmluc3RhbGwuYXNpblxuICAgID8gYDxhIGNsYXNzPVwiZG93bmxvYWRcIiBocmVmPVwiaHR0cHM6Ly93d3cuYW1hem9uLmNvbS9kcC8ke2FwcC5pbnN0YWxsLmFzaW59XCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJBbWF6b24gQXBwc3RvcmVcIiA+PGkgY2xhc3M9XCJmYWIgZmEtYW1hem9uXCI+PC9pPjwvYT5gXG4gICAgOiBcIlwiXG59XG4ke1xuICBhcHAuaW5zdGFsbC5mRHJvaWRJRFxuICAgID8gYDxhIGNsYXNzPVwiZG93bmxvYWRcIiBocmVmPVwiaHR0cHM6Ly9mLWRyb2lkLm9yZy9yZXBvc2l0b3J5L2Jyb3dzZS8/ZmRpZD0ke2FwcC5pbnN0YWxsLmZEcm9pZElEfVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiRi1Ecm9pZFwiID48aSBjbGFzcz1cImZhYiBmYS1hbmRyb2lkXCI+PC9pPjwvYT5gXG4gICAgOiBcIlwiXG59XG4ke1xuICBhcHAuaW5zdGFsbC5nb29nbGVQbGF5SURcbiAgICA/IGA8YSBjbGFzcz1cImRvd25sb2FkXCIgaHJlZj1cImh0dHBzOi8vcGxheS5nb29nbGUuY29tL3N0b3JlL2FwcHMvZGV0YWlscz9pZD0ke2FwcC5pbnN0YWxsLmdvb2dsZVBsYXlJRH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiB0aXRsZT1cIkdvb2dsZSBQbGF5XCIgPjxpIGNsYXNzPVwiZmFiIGZhLWdvb2dsZS1wbGF5XCI+PC9pPjwvYT5gXG4gICAgOiBcIlwiXG59XG4ke1xuICBhcHAuaW5zdGFsbC5odWF3ZWlBcHBHYWxsZXJ5SURcbiAgICA/IGA8YSBjbGFzcz1cImRvd25sb2FkXCIgaHJlZj1cImh0dHBzOi8vYXBwZ2FsbGVyeS5odWF3ZWkuY29tLyMvYXBwLyR7YXBwLmluc3RhbGwuaHVhd2VpQXBwR2FsbGVyeUlEfVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiSHVhd2VpIEFwcCBHYWxsZXJ5XCIgPjxpIGNsYXNzPVwiZmFzIGZhLXNob3BwaW5nLWJhZ1wiPjwvaT48L2E+YFxuICAgIDogXCJcIlxufVxuJHtcbiAgYXBwLmluc3RhbGwuYXBwbGVTdG9yZUlEXG4gICAgPyBgPGEgY2xhc3M9XCJkb3dubG9hZFwiIGhyZWY9XCJodHRwczovL2l0dW5lcy5hcHBsZS5jb20vYXBwLyR7XG4gICAgICAgIGFwcC5pbnN0YWxsLmFwcGxlU3RvcmVJRC50b1VwcGVyQ2FzZSgpLnN0YXJ0c1dpdGgoXCJJRFwiKVxuICAgICAgICAgID8gYXBwLmluc3RhbGwuYXBwbGVTdG9yZUlEXG4gICAgICAgICAgOiBgaWQke2FwcC5pbnN0YWxsLmFwcGxlU3RvcmVJRH1gXG4gICAgICB9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJpVHVuZXMgQXBwIFN0b3JlXCI+PGkgY2xhc3M9XCJmYWIgZmEtYXBwLXN0b3JlLWlvc1wiPjwvaT48L2E+YFxuICAgIDogXCJcIlxufVxuJHtcbiAgYXBwLmluc3RhbGwubWFjQXBwU3RvcmVJRFxuICAgID8gYDxhIGNsYXNzPVwiZG93bmxvYWRcIiBocmVmPVwiaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2FwcC8ke1xuICAgICAgICBhcHAuaW5zdGFsbC5tYWNBcHBTdG9yZUlELnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aChcIklEXCIpXG4gICAgICAgICAgPyBhcHAuaW5zdGFsbC5tYWNBcHBTdG9yZUlEXG4gICAgICAgICAgOiBgaWQke2FwcC5pbnN0YWxsLm1hY0FwcFN0b3JlSUR9YFxuICAgICAgfVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiTWFjIEFwcCBTdG9yZVwiPjxpIGNsYXNzPVwiZmFiIGZhLWFwcC1zdG9yZVwiPjwvaT48L2E+YFxuICAgIDogXCJcIlxufVxuJHtcbiAgYXBwLmluc3RhbGwubWljcm9zb2Z0QXBwSURcbiAgICA/IGA8YSBjbGFzcz1cImRvd25sb2FkXCIgaHJlZj1cImh0dHBzOi8vd3d3Lm1pY3Jvc29mdC5jb20vc3RvcmUvYXBwcy8ke2FwcC5pbnN0YWxsLm1pY3Jvc29mdEFwcElEfVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiTWljcm9zb2Z0IFN0b3JlXCI+PGkgY2xhc3M9XCJmYWIgZmEtbWljcm9zb2Z0XCI+PC9pPjwvYT5gXG4gICAgOiBcIlwiXG59YCxcbiAgICAgICAgcmVuZGVyVG9XaWtpOiAoYXBwKSA9PlxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGFwcC53ZWJzaXRlID8gYFske2FwcC53ZWJzaXRlfSBXZWJzaXRlXWAgOiBcIlwiLFxuXG4gICAgICAgICAgICBhcHAuaW5zdGFsbC5hc2luXG4gICAgICAgICAgICAgID8gYFtodHRwczovL3d3dy5hbWF6b24uY29tL2RwLyR7YXBwLmluc3RhbGwuYXNpbn0gQW1hem9uIEFwcHN0b3JlXWBcbiAgICAgICAgICAgICAgOiBcIlwiLFxuICAgICAgICAgICAgYXBwLmluc3RhbGwuZkRyb2lkSURcbiAgICAgICAgICAgICAgPyBgW2h0dHBzOi8vZi1kcm9pZC5vcmcvcmVwb3NpdG9yeS9icm93c2UvP2ZkaWQ9JHthcHAuaW5zdGFsbC5mRHJvaWRJRH0gRi1Ecm9pZF1gXG4gICAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgICAgIGFwcC5pbnN0YWxsLmdvb2dsZVBsYXlJRFxuICAgICAgICAgICAgICA/IGBbaHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPSR7YXBwLmluc3RhbGwuZ29vZ2xlUGxheUlEfSBHb29nbGUgUGxheV1gXG4gICAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgICAgIGFwcC5pbnN0YWxsLmh1YXdlaUFwcEdhbGxlcnlJRFxuICAgICAgICAgICAgICA/IGBbaHR0cHM6Ly9hcHBnYWxsZXJ5Lmh1YXdlaS5jb20vIy9hcHAvJHthcHAuaW5zdGFsbC5odWF3ZWlBcHBHYWxsZXJ5SUR9IEh1YXdlaSBBcHAgR2FsbGVyeV1gXG4gICAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgICAgIGFwcC5pbnN0YWxsLmFwcGxlU3RvcmVJRFxuICAgICAgICAgICAgICA/IGBbaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2FwcC8ke1xuICAgICAgICAgICAgICAgICAgYXBwLmluc3RhbGwuYXBwbGVTdG9yZUlELnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aChcIklEXCIpXG4gICAgICAgICAgICAgICAgICAgID8gYXBwLmluc3RhbGwuYXBwbGVTdG9yZUlEXG4gICAgICAgICAgICAgICAgICAgIDogYGlkJHthcHAuaW5zdGFsbC5hcHBsZVN0b3JlSUR9YFxuICAgICAgICAgICAgICAgIH0gaVR1bmVzIEFwcCBTdG9yZV1gXG4gICAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgICAgIGFwcC5pbnN0YWxsLm1hY0FwcFN0b3JlSURcbiAgICAgICAgICAgICAgPyBgW2h0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS9hcHAvJHtcbiAgICAgICAgICAgICAgICAgIGFwcC5pbnN0YWxsLm1hY0FwcFN0b3JlSUQudG9VcHBlckNhc2UoKS5zdGFydHNXaXRoKFwiSURcIilcbiAgICAgICAgICAgICAgICAgICAgPyBhcHAuaW5zdGFsbC5tYWNBcHBTdG9yZUlEXG4gICAgICAgICAgICAgICAgICAgIDogYGlkJHthcHAuaW5zdGFsbC5tYWNBcHBTdG9yZUlEfWBcbiAgICAgICAgICAgICAgICB9IE1hYyBBcHAgU3RvcmVdYFxuICAgICAgICAgICAgICA6IFwiXCIsXG4gICAgICAgICAgICBhcHAuaW5zdGFsbC5taWNyb3NvZnRBcHBJRFxuICAgICAgICAgICAgICA/IGBbaHR0cHM6Ly93d3cubWljcm9zb2Z0LmNvbS9zdG9yZS9hcHBzLyR7YXBwLmluc3RhbGwubWljcm9zb2Z0QXBwSUR9IE1pY3Jvc29mdCBTdG9yZV1gXG4gICAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgICBdXG4gICAgICAgICAgICAuZmlsdGVyKChvKSA9PiBvKVxuICAgICAgICAgICAgLmpvaW4oXCIsIFwiKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiBnZXRMb2NhbGl6ZWRWYWx1ZShcbiAgICAgICAgICB0ZW1wbGF0ZURhdGEucGFyYW1zW1wiZGVzY3JpcHRpb25cIl0ubGFiZWwsXG4gICAgICAgICAgbGFuZ1xuICAgICAgICApLFxuICAgICAgICBkZXNjcmlwdGlvbjogZ2V0TG9jYWxpemVkVmFsdWUoXG4gICAgICAgICAgdGVtcGxhdGVEYXRhLnBhcmFtc1tcImRlc2NyaXB0aW9uXCJdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGxhbmdcbiAgICAgICAgKSxcbiAgICAgICAgaGFzVmFsdWU6IChhcHApID0+ICEhYXBwLmRlc2NyaXB0aW9uLFxuICAgICAgICByZW5kZXJUb0h0bWw6IChhcHApID0+IGFwcC5kZXNjcmlwdGlvbixcbiAgICAgICAgcmVuZGVyVG9XaWtpOiAoYXBwKSA9PiBhcHAuZGVzY3JpcHRpb24sXG4gICAgICAgIG1vcmU6IHRydWUsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogZ2V0TG9jYWxpemVkVmFsdWUodGVtcGxhdGVEYXRhLnBhcmFtc1tcInBsYXRmb3JtXCJdLmxhYmVsLCBsYW5nKSxcbiAgICAgICAgZGVzY3JpcHRpb246IGdldExvY2FsaXplZFZhbHVlKFxuICAgICAgICAgIHRlbXBsYXRlRGF0YS5wYXJhbXNbXCJwbGF0Zm9ybVwiXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICBsYW5nXG4gICAgICAgICksXG4gICAgICAgIGhhc1ZhbHVlOiAoYXBwKSA9PiBhcHAucGxhdGZvcm0ubGVuZ3RoID4gMCxcbiAgICAgICAgcmVuZGVyVG9IdG1sOiAoYXBwKSA9PiByZW5kZXJCYWRnZXMoYXBwLnBsYXRmb3JtKSxcbiAgICAgICAgcmVuZGVyVG9XaWtpOiAoYXBwKSA9PiBhcHAucGxhdGZvcm0uam9pbihcIiwgXCIpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IGdldExvY2FsaXplZFZhbHVlKHRlbXBsYXRlRGF0YS5wYXJhbXNbXCJkYXRlXCJdLmxhYmVsLCBsYW5nKSxcbiAgICAgICAgZGVzY3JpcHRpb246IGdldExvY2FsaXplZFZhbHVlKFxuICAgICAgICAgIHRlbXBsYXRlRGF0YS5wYXJhbXNbXCJkYXRlXCJdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGxhbmdcbiAgICAgICAgKSxcbiAgICAgICAgaGFzVmFsdWU6IChhcHApID0+ICEhYXBwLmxhc3RSZWxlYXNlLFxuICAgICAgICByZW5kZXJUb0h0bWw6IChhcHApID0+IGFwcC5sYXN0UmVsZWFzZSxcbiAgICAgICAgcmVuZGVyVG9XaWtpOiAoYXBwKSA9PiBhcHAubGFzdFJlbGVhc2UsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogZ2V0TG9jYWxpemVkVmFsdWUodGVtcGxhdGVEYXRhLnBhcmFtc1tcImxhbmd1YWdlc1wiXS5sYWJlbCwgbGFuZyksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBnZXRMb2NhbGl6ZWRWYWx1ZShcbiAgICAgICAgICB0ZW1wbGF0ZURhdGEucGFyYW1zW1wibGFuZ3VhZ2VzXCJdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGxhbmdcbiAgICAgICAgKSxcbiAgICAgICAgaGFzVmFsdWU6IChhcHApID0+ICEhYXBwLmxhbmd1YWdlc1VybCB8fCAhIShhcHAubGFuZ3VhZ2VzLmxlbmd0aCA+IDApLFxuICAgICAgICByZW5kZXJUb0h0bWw6IChhcHApID0+XG4gICAgICAgICAgYXBwLmxhbmd1YWdlc1VybFxuICAgICAgICAgICAgPyBgPGEgY2xhc3M9XCJsYW5ndWFnZS11cmxcIiBocmVmPVwiJHtcbiAgICAgICAgICAgICAgICBhcHAubGFuZ3VhZ2VzVXJsXG4gICAgICAgICAgICAgIH1cIiB0YXJnZXQ9XCJfYmxhbmtcIlwiPlxuICAgICAgJHtcbiAgICAgICAgYXBwLmxhbmd1YWdlcy5sZW5ndGggPiAwXG4gICAgICAgICAgPyByZW5kZXJCYWRnZXMoYXBwLmxhbmd1YWdlcylcbiAgICAgICAgICA6IGA8aSBjbGFzcz1cImZhcyBmYS1sYW5ndWFnZVwiPjwvaT5gXG4gICAgICB9XG4gICAgICA8aSBjbGFzcz1cImZhcyBmYS1leHRlcm5hbC1saW5rLWFsdFwiPjwvaT5cbiAgICA8L2E+YFxuICAgICAgICAgICAgOiByZW5kZXJCYWRnZXMoYXBwLmxhbmd1YWdlcyksXG4gICAgICAgIHJlbmRlclRvV2lraTogKGFwcCkgPT5cbiAgICAgICAgICBhcHAubGFuZ3VhZ2VzVXJsXG4gICAgICAgICAgICA/IGBbJHthcHAubGFuZ3VhZ2VzVXJsfSBcbiAgICAgICAgJHtcbiAgICAgICAgICBhcHAubGFuZ3VhZ2VzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gYXBwLmxhbmd1YWdlcy5qb2luKFwiLCBcIilcbiAgICAgICAgICAgIDogbGFuZ3VhZ2VWYWx1ZVRvRGlzcGxheShcIm11bFwiKVxuICAgICAgICB9XG4gICAgICBdYFxuICAgICAgICAgICAgOiBhcHAubGFuZ3VhZ2VzLmpvaW4oXCIsIFwiKSxcbiAgICAgICAgbW9yZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiBnZXRMb2NhbGl6ZWRWYWx1ZSh0ZW1wbGF0ZURhdGEucGFyYW1zW1wiY292ZXJhZ2VcIl0ubGFiZWwsIGxhbmcpLFxuICAgICAgICBkZXNjcmlwdGlvbjogZ2V0TG9jYWxpemVkVmFsdWUoXG4gICAgICAgICAgdGVtcGxhdGVEYXRhLnBhcmFtc1tcImNvdmVyYWdlXCJdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGxhbmdcbiAgICAgICAgKSxcbiAgICAgICAgaGFzVmFsdWU6IChhcHApID0+ICEhKGFwcC5jb3ZlcmFnZSAmJiBhcHAuY292ZXJhZ2UubGVuZ3RoKSxcbiAgICAgICAgcmVuZGVyVG9IdG1sOiAoYXBwKSA9PiBhcHAuY292ZXJhZ2VbYXBwLmNvdmVyYWdlLmxlbmd0aCAtIDFdLFxuICAgICAgICByZW5kZXJUb1dpa2k6IChhcHApID0+IGFwcC5jb3ZlcmFnZVthcHAuY292ZXJhZ2UubGVuZ3RoIC0gMV0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogZ2V0TG9jYWxpemVkVmFsdWUodGVtcGxhdGVEYXRhLnBhcmFtc1tcImF1dGhvclwiXS5sYWJlbCwgbGFuZyksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBnZXRMb2NhbGl6ZWRWYWx1ZShcbiAgICAgICAgICB0ZW1wbGF0ZURhdGEucGFyYW1zW1wiYXV0aG9yXCJdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGxhbmdcbiAgICAgICAgKSxcbiAgICAgICAgaGFzVmFsdWU6IChhcHApID0+ICEhYXBwLmF1dGhvcixcbiAgICAgICAgcmVuZGVyVG9IdG1sOiAoYXBwKSA9PiBhcHAuYXV0aG9yLFxuICAgICAgICByZW5kZXJUb1dpa2k6IChhcHApID0+IGFwcC5hdXRob3IsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogZ2V0TG9jYWxpemVkVmFsdWUodGVtcGxhdGVEYXRhLnBhcmFtc1tcInByaWNlXCJdLmxhYmVsLCBsYW5nKSxcbiAgICAgICAgZGVzY3JpcHRpb246IGdldExvY2FsaXplZFZhbHVlKFxuICAgICAgICAgIHRlbXBsYXRlRGF0YS5wYXJhbXNbXCJwcmljZVwiXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICBsYW5nXG4gICAgICAgICksXG4gICAgICAgIGhhc1ZhbHVlOiAoYXBwKSA9PiAhIWFwcC5wcmljZSxcbiAgICAgICAgcmVuZGVyVG9IdG1sOiAoYXBwKSA9PiBhcHAucHJpY2UsXG4gICAgICAgIHJlbmRlclRvV2lraTogKGFwcCkgPT4gYXBwLnByaWNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6IGdldExvY2FsaXplZFZhbHVlKHRlbXBsYXRlRGF0YS5wYXJhbXNbXCJsaWNlbnNlXCJdLmxhYmVsLCBsYW5nKSxcbiAgICAgICAgZGVzY3JpcHRpb246IGdldExvY2FsaXplZFZhbHVlKFxuICAgICAgICAgIHRlbXBsYXRlRGF0YS5wYXJhbXNbXCJsaWNlbnNlXCJdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGxhbmdcbiAgICAgICAgKSxcbiAgICAgICAgaGFzVmFsdWU6IChhcHApID0+ICEhYXBwLmxpY2Vuc2UsXG4gICAgICAgIHJlbmRlclRvSHRtbDogKGFwcCkgPT4gcmVuZGVyQmFkZ2VzKGFwcC5saWNlbnNlKSxcbiAgICAgICAgcmVuZGVyVG9XaWtpOiAoYXBwKSA9PiBhcHAubGljZW5zZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiBnZXRMb2NhbGl6ZWRWYWx1ZSh0ZW1wbGF0ZURhdGEucGFyYW1zW1wicmVwb1wiXS5sYWJlbCwgbGFuZyksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBnZXRMb2NhbGl6ZWRWYWx1ZShcbiAgICAgICAgICB0ZW1wbGF0ZURhdGEucGFyYW1zW1wicmVwb1wiXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICBsYW5nXG4gICAgICAgICksXG4gICAgICAgIGhhc1ZhbHVlOiAoYXBwKSA9PiAhIWFwcC5zb3VyY2VDb2RlLFxuICAgICAgICByZW5kZXJUb0h0bWw6IChhcHApID0+XG4gICAgICAgICAgYXBwLnNvdXJjZUNvZGVcbiAgICAgICAgICAgID8gYDxhIGhyZWY9XCIke2FwcC5zb3VyY2VDb2RlfVwiIHRhcmdldD1cIl9ibGFua1wiPjxpIGNsYXNzPVwiZmFzIGZhLWNvZGVcIj48L2k+PC9hPmBcbiAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgcmVuZGVyVG9XaWtpOiAoYXBwKSA9PlxuICAgICAgICAgIGFwcC5zb3VyY2VDb2RlID8gYFske2FwcC5zb3VyY2VDb2RlfSA8Lz5dYCA6IFwiXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogZ2V0TG9jYWxpemVkVmFsdWUoXCJTb3VyY2VcIiwgbGFuZyksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBnZXRMb2NhbGl6ZWRWYWx1ZShcbiAgICAgICAgICBcIlNvdXJjZSB3aGVyZSB0aGlzIGRhdGEgY29tZXMgZnJvbS5cIixcbiAgICAgICAgICBsYW5nXG4gICAgICAgICksXG4gICAgICAgIGhhc1ZhbHVlOiAoKSA9PiB0cnVlLFxuICAgICAgICByZW5kZXJUb0h0bWw6IChhcHApID0+XG4gICAgICAgICAgYXBwLnNvdXJjZVxuICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgKHMpID0+IGA8YSBocmVmPVwiJHtzLnVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke3MuZGlzcGxheU5hbWV9PC9hPmBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5qb2luKFwiLCBcIiksXG4gICAgICB9LFxuICAgIF0sXG4gICAgYXBwcyxcbiAgICBsYW5nXG4gICk7XG5cbiAgLy8gTWFwXG4gIHJlbmRlckdyb3VwKFxuICAgIFwibWFwXCIsXG4gICAgXCJEaXNwbGF5IG1hcFwiLFxuICAgIFtcbiAgICAgIFwibWFwXCIsXG4gICAgICBcIm1hcERhdGFcIixcbiAgICAgIFwiZGF0YXNvdXJjZVwiLFxuICAgICAgXCJyb3RhdGVNYXBcIixcbiAgICAgIFwiM0RcIixcbiAgICAgIFwic2hvd1dlYnNpdGVcIixcbiAgICAgIFwic2hvd1Bob25lTnVtYmVyXCIsXG4gICAgICBcInNob3dPcGVuaW5nSG91cnNcIixcbiAgICBdLFxuICAgIGFwcHMsXG4gICAgbGFuZ1xuICApO1xuXG4gIC8vIFJvdXRpbmdcbiAgcmVuZGVyR3JvdXAoXG4gICAgXCJyb3V0aW5nXCIsXG4gICAgXCJSb3V0aW5nXCIsXG4gICAgW1xuICAgICAgXCJyb3V0aW5nXCIsXG4gICAgICBcImNyZWF0ZVJvdXRlTWFudWFsbHlcIixcbiAgICAgIFwiY2FsY3VsYXRlUm91dGVcIixcbiAgICAgIFwiY3JlYXRlUm91dGVWaWFXYXlwb2ludHNcIixcbiAgICAgIFwicHJvZmlsZXNcIixcbiAgICAgIFwidHVyblJlc3RyaWN0aW9uc1wiLFxuICAgICAgXCJjYWxjdWxhdGVSb3V0ZU9mZmxpbmVcIixcbiAgICAgIFwicm91dGluZ1Byb3ZpZGVyc1wiLFxuICAgICAgXCJhdm9pZFRyYWZmaWNcIixcbiAgICAgIFwidHJhZmZpY1Byb3ZpZGVyXCIsXG4gICAgXSxcbiAgICBhcHBzLFxuICAgIGxhbmdcbiAgKTtcblxuICAvLyBOYXZpZ2F0aW5nXG4gIHJlbmRlckdyb3VwKFxuICAgIFwibmF2aWdhdGluZ1wiLFxuICAgIFwiTmF2aWdhdGluZ1wiLFxuICAgIFtcbiAgICAgIFwibmF2aWdhdGluZ1wiLFxuICAgICAgXCJmaW5kTG9jYXRpb25cIixcbiAgICAgIFwiZmluZE5lYXJieVBPSVwiLFxuICAgICAgXCJuYXZUb1BvaW50XCIsXG4gICAgICBcInZvaWNlXCIsXG4gICAgICBcImtlZXBPblJvYWRcIixcbiAgICAgIFwidHVybkxhbmVzXCIsXG4gICAgICBcIndpdGhvdXRHUFNcIixcbiAgICAgIFwicHJlZGVmaW5lZFJvdXRlXCIsXG4gICAgXSxcbiAgICBhcHBzLFxuICAgIGxhbmdcbiAgKTtcblxuICAvLyBUcmFja2luZ1xuICByZW5kZXJHcm91cChcbiAgICBcInRyYWNraW5nXCIsXG4gICAgXCJUcmFja2luZ1wiLFxuICAgIFtcbiAgICAgIFwidHJhY2tpbmdcIixcbiAgICAgIFwiY3VzdG9tSW50ZXJ2YWxcIixcbiAgICAgIFwidHJhY2tGb3JtYXRzXCIsXG4gICAgICBcImdlb3RhZ2dpbmdcIixcbiAgICAgIFwiZmFzdFdheVBvaW50QWRkaW5nXCIsXG4gICAgICBcInVwbG9hZEdQWFwiLFxuICAgIF0sXG4gICAgYXBwcyxcbiAgICBsYW5nXG4gICk7XG5cbiAgLy8gTW9uaXRvcmluZ1xuICByZW5kZXJHcm91cChcbiAgICBcIm1vbml0b3JpbmdcIixcbiAgICBcIk1vbml0b3JpbmdcIixcbiAgICBbXG4gICAgICBcIm1vbml0b3JpbmdcIixcbiAgICAgIFwic2hvd1RyYWNrXCIsXG4gICAgICBcInNob3dFeGlzdGluZ1RyYWNrXCIsXG4gICAgICBcInNob3dBbHRpdHVkZURpYWdyYW1cIixcbiAgICAgIFwic2hvd0RPUFwiLFxuICAgICAgXCJzaG93U2F0ZWxsaXRlc1wiLFxuICAgICAgXCJzaG93Tk1FQWxpdmVcIixcbiAgICAgIFwic2hvd1NwZWVkXCIsXG4gICAgICBcInNlbmRQb3NpdGlvblwiLFxuICAgIF0sXG4gICAgYXBwcyxcbiAgICBsYW5nXG4gICk7XG5cbiAgLy8gRWRpdGluZ1xuICByZW5kZXJHcm91cChcbiAgICBcImVkaXRpbmdcIixcbiAgICBcIkVkaXRpbmdcIixcbiAgICBbXG4gICAgICBcImFkZFBPSVwiLFxuICAgICAgXCJlZGl0UE9JXCIsXG4gICAgICBcImFkZFdheVwiLFxuICAgICAgXCJlZGl0R2VvbVwiLFxuICAgICAgXCJlZGl0VGFnc1wiLFxuICAgICAgXCJlZGl0UmVsYXRpb25zXCIsXG4gICAgICBcInZpZXdOb3Rlc1wiLFxuICAgICAgXCJjcmVhdGVOb3Rlc1wiLFxuICAgICAgXCJlZGl0Tm90ZXNcIixcbiAgICAgIFwiZWRpdFNvdXJjZVwiLFxuICAgICAgXCJvZmZzZXREQnN1cHBvcnRcIixcbiAgICAgIFwidXBsb2FkT1NNRGF0YVwiLFxuICAgIF0sXG4gICAgYXBwcyxcbiAgICBsYW5nXG4gICk7XG5cbiAgLy8gUmVuZGVyaW5nXG4gIHJlbmRlckdyb3VwKFwicmVuZGVyaW5nXCIsIFwiUmVuZGVyaW5nXCIsIFtcInJlbmRlcmVyT3V0cHV0Rm9ybWF0c1wiXSwgYXBwcywgbGFuZyk7XG5cbiAgLy8gQWNjZXNzaWJpbGl0eVxuICByZW5kZXJHcm91cChcbiAgICBcImFjY2Vzc2liaWxpdHlcIixcbiAgICBcIkFjY2Vzc2liaWxpdHlcIixcbiAgICBbXG4gICAgICBcImFjY2Vzc2liaWxpdHlcIixcbiAgICAgIFwidGV4dE9ubHlVSVwiLFxuICAgICAgXCJicmFpbGxlVUlcIixcbiAgICAgIFwiZXhwbG9yZXJNb2RlXCIsXG4gICAgICBcInB1YmxpY1RyYW5zcG9ydE1vZGVcIixcbiAgICAgIFwiZGFuZ2VyV2FybmluZ3NcIixcbiAgICAgIFwic2NyZWVuUmVhZGVyXCIsXG4gICAgICBcInNjcmVlblJlYWRlckxhbmdcIixcbiAgICBdLFxuICAgIGFwcHMsXG4gICAgbGFuZ1xuICApO1xufVxuXG5mdW5jdGlvbiByZW5kZXJHcm91cChcbiAgaWQ6IHN0cmluZyxcbiAgZGlzcGxheTogc3RyaW5nLFxuICBwYXJhbXM6IChcbiAgICB8IHN0cmluZ1xuICAgIHwge1xuICAgICAgICBsYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBoYXNWYWx1ZTogKGFwcDogQXBwKSA9PiBib29sZWFuO1xuICAgICAgICBub3RObz86IChhcHA6IEFwcCkgPT4gYm9vbGVhbjtcbiAgICAgICAgcmVuZGVyVG9IdG1sOiAoYXBwOiBBcHApID0+IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgcmVuZGVyVG9XaWtpPzogKGFwcDogQXBwKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIG1vcmU/OiBib29sZWFuO1xuICAgICAgICBjZW50ZXJlZD86IGJvb2xlYW47XG4gICAgICB9XG4gIClbXSxcbiAgYXBwczogQXBwW10sXG4gIGxhbmc6IHN0cmluZ1xuKSB7XG4gIGNvbnN0IGV4dGVuZGVkUGFyYW1zID0gcGFyYW1zLm1hcCgocCkgPT4ge1xuICAgIGlmICh0eXBlb2YgcCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsOiBnZXRMb2NhbGl6ZWRWYWx1ZSh0ZW1wbGF0ZURhdGEucGFyYW1zW3BdLmxhYmVsLCBsYW5nKSxcbiAgICAgIGRlc2NyaXB0aW9uOiBnZXRMb2NhbGl6ZWRWYWx1ZSh0ZW1wbGF0ZURhdGEucGFyYW1zW3BdLmRlc2NyaXB0aW9uLCBsYW5nKSxcbiAgICAgIGhhc1ZhbHVlOiAoYXBwOiBBcHApID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkID0gKGFwcCBhcyBhbnkpW2lkXT8uW3BdO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUuc29tZSgodikgPT4gISF2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gISF2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBub3RObzogKGFwcDogQXBwKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCA9IChhcHAgYXMgYW55KVtpZF0/LltwXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLnNvbWUoKHYpID0+IHYgJiYgIWVxdWFsc0lnbm9yZUNhc2UodiwgXCJub1wiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICFlcXVhbHNJZ25vcmVDYXNlKHZhbHVlLCBcIm5vXCIpO1xuICAgICAgfSxcbiAgICAgIHJlbmRlclRvSHRtbDogKGFwcDogQXBwKSA9PiByZW5kZXJCYWRnZXMoKGFwcCBhcyBhbnkpW2lkXT8uW3BdKSxcbiAgICAgIHJlbmRlclRvV2lraTogKGFwcDogQXBwKSA9PiB0b1dpa2lWYWx1ZSgoYXBwIGFzIGFueSlbaWRdPy5bcF0pLFxuICAgIH07XG4gIH0pO1xuXG4gIGxldCBlbGVtZW50cyA9IGV4dGVuZGVkUGFyYW1zXG4gICAgLm1hcCgocCkgPT4ge1xuICAgICAgaWYgKCFhcHBzLnNvbWUoKGFwcCkgPT4gcC5oYXNWYWx1ZShhcHApICYmICghcC5ub3RObyB8fCBwLm5vdE5vKGFwcCkpKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3JlYXRlUGFyYW1FbGVtZW50KFxuICAgICAgICBhcHBzLFxuICAgICAgICBwLmxhYmVsLFxuICAgICAgICBwLmRlc2NyaXB0aW9uLFxuICAgICAgICAoYXBwKSA9PiBwLnJlbmRlclRvSHRtbChhcHApLFxuICAgICAgICBpZCArIFwiLWRldGFpbFwiLFxuICAgICAgICBwLm1vcmUsXG4gICAgICAgIHAuY2VudGVyZWRcbiAgICAgICk7XG4gICAgfSlcbiAgICAuZmlsdGVyKChlKSA9PiBlKTtcblxuICBpZiAoZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImRpdlwiLFxuICAgICAgYDxkaXYgY2xhc3M9XCJjZWxsIGhlYWRlciBwYXJhbXMtdGl0bGUgcGFyYW1zLWdyb3VwLXRpdGxlXCI+XG4gICAgICAgIDxhIGNsYXNzPVwiZ3JvdXBcIiBkYXRhLXRhcmdldD1cIi4ke2lkfS1kZXRhaWxcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmFzIGZhLWZ3IGZhLWNhcmV0LWRvd24gJHtpZH0tZGV0YWlsXCI+PC9pPjxpIGNsYXNzPVwiZmFzIGZhLWZ3IGZhLWNhcmV0LXJpZ2h0ICR7aWR9LWRldGFpbCBoaWRkZW5cIj48L2k+ICR7ZGlzcGxheX08L2E+XG4gICAgIDwhLS08YSBjbGFzcz1cImV4cG9ydFwiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYXIgZmEtY29weVwiPjwvaT48L2E+LS0+IDwvZGl2PmAsXG4gICAgICBbXCJyb3dcIl1cbiAgICApO1xuXG4gICAgLy8gZ2V0SHRtbEVsZW1lbnQoXCIuZXhwb3J0XCIsIGVsZW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgY29uc3Qgd2lraVRhYmxlID0gdG9XaWtpVGFibGUoXG4gICAgLy8gICAgIGFwcHMsXG4gICAgLy8gICAgIGV4dGVuZGVkUGFyYW1zLmZpbHRlcigocCkgPT4gISFwLnJlbmRlclRvV2lraSkgYXMgYW55LFxuICAgIC8vICAgICBsYW5nXG4gICAgLy8gICApO1xuXG4gICAgLy8gICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh3aWtpVGFibGUpO1xuICAgIC8vICAgYWxlcnQoXCJDb3BpZWQgdG8gdGhlIGNsaXBib2FyZC5cIik7XG4gICAgLy8gfSk7XG5cbiAgICBnZXRIdG1sRWxlbWVudChcIi5ncm91cFwiLCBlbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTERpdkVsZW1lbnQpLmRhdGFzZXRbXCJ0YXJnZXRcIl0gfHwgXCJcIlxuICAgICAgICApXG4gICAgICAgIC5mb3JFYWNoKChlKSA9PiBlLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIikpO1xuICAgIH0pO1xuXG4gICAgZ2V0SHRtbEVsZW1lbnQoXCIjY29tcGFyZVwiKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgIGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGdldEh0bWxFbGVtZW50KFwiI2NvbXBhcmVcIikuYXBwZW5kQ2hpbGQoZWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUGFyYW1FbGVtZW50KFxuICBhcHBzOiBBcHBbXSxcbiAgbGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgZGVzY3JpcHRpb246IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgdmFsdWU6IChhcHA6IEFwcCkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBncm91cDogc3RyaW5nID0gXCJcIixcbiAgbW9yZSA9IGZhbHNlLFxuICBjZW50ZXJlZCA9IGZhbHNlXG4pIHtcbiAgY29uc3QgdmFsdWVzID0gYXBwcy5tYXAoKGFwcCkgPT4gdmFsdWUoYXBwKSk7XG5cbiAgaWYgKHZhbHVlcy5maWx0ZXIoKHYpID0+IHYpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChcbiAgICBcImRpdlwiLFxuICAgIFtcbiAgICAgIGA8ZGl2IGNsYXNzPVwiY2VsbCBoZWFkZXIgcGFyYW0tdGl0bGVcIiB0aXRsZT1cIiR7ZGVzY3JpcHRpb259XCI+JHtsYWJlbH08L2Rpdj5gLFxuICAgICAgLi4udmFsdWVzLm1hcCgodikgPT5cbiAgICAgICAgbW9yZVxuICAgICAgICAgID8gYDxkaXYgY2xhc3M9XCJjZWxsIHBhcmFtLXRleHQke1xuICAgICAgICAgICAgICBjZW50ZXJlZCA/IFwiIGFsaWduLW1pZGRsZSB0ZXh0LWNlbnRlclwiIDogXCJcIlxuICAgICAgICAgICAgfVwiPjxkaXYgY2xhc3M9XCJkeW5hbWljLW1vcmVcIj4ke3YgfHwgdW5rbm93bigpfTwvZGl2PjwvZGl2PmBcbiAgICAgICAgICA6IGA8ZGl2IGNsYXNzPVwiY2VsbCBwYXJhbS10ZXh0JHtcbiAgICAgICAgICAgICAgY2VudGVyZWQgPyBcIiBhbGlnbi1taWRkbGUgdGV4dC1jZW50ZXJcIiA6IFwiXCJcbiAgICAgICAgICAgIH1cIj4ke3YgfHwgdW5rbm93bigpfTwvZGl2PmBcbiAgICAgICksXG4gICAgXS5qb2luKFwiXCIpLFxuICAgIFtcInJvd1wiLCBncm91cF1cbiAgKTtcblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gdW5rbm93bigpIHtcbiAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cInVua25vd25cIj51bmtub3duPC9zcGFuPmA7XG59XG4iLCIvLyBDb3B5cmlnaHQgKEMpIDIwMjAgTWFya3VzIFBlbG9zb1xuLy9cbi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE9TTSBBcHBzIENhdGFsb2cuXG4vL1xuLy8gT1NNIEFwcHMgQ2F0YWxvZyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuLy8gcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlXG4vLyBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuLy9cbi8vIE9TTSBBcHBzIENhdGFsb2cgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4vLyBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbi8vXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vIGFsb25nIHdpdGggT1NNIEFwcHMgQ2F0YWxvZy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cblxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZ2V0SHRtbEVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2h0bWxcIjtcbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuLi8uLi9kYXRhL3RlbXBsYXRlL3V0aWxpdGllc1wiO1xuaW1wb3J0IHsgcmVuZGVySW1hZ2UgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3JlbmRlckltYWdlXCI7XG5pbXBvcnQgeyByZW5kZXJCYWRnZXMgfSBmcm9tIFwiLi9yZW5kZXJCYWRnZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihhcHA6IEFwcCkge1xuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChcbiAgICBcImRpdlwiLFxuICAgIGA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgIDxkaXY+PGRpdiBjbGFzcz1cImNvcm5lci1iYWRnZVwiPiR7XG4gICAgICAgICAgYXBwLmxpYnJlXG4gICAgICAgICAgICA/ICc8c3BhbiB0aXRsZT1cIkxpYnJlXCI+PGkgY2xhc3M9XCJmYXMgZmEtZncgZmEtYm9vay1vcGVuXCI+PC9pPjwvc3Bhbj4nXG4gICAgICAgICAgICA6IGFwcC5ncmF0aXNcbiAgICAgICAgICAgID8gJzxzcGFuIHRpdGxlPVwiUHJvcHJpZXRhcnlcIj48aSBjbGFzcz1cImZhcyBmYS13aW5lLWJvdHRsZVwiPjwvaT48L3NwYW4+J1xuICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgIH0ke1xuICAgICAgYXBwLmdyYXRpcyB8fCBhcHAubGlicmVcbiAgICAgICAgPyAnPHNwYW4gdGl0bGU9XCJGcmVlXCI+PGkgY2xhc3M9XCJmYXMgZmEtZncgZmEtZ2lmdFwiPjwvaT48L3NwYW4+J1xuICAgICAgICA6IFwiXCJcbiAgICB9PC9kaXY+PHN0cm9uZz4ke1xuICAgICAgYXBwLndlYnNpdGVcbiAgICAgICAgPyBgPGEgaHJlZj1cIiR7YXBwLndlYnNpdGV9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHthcHAubmFtZX08L2E+YFxuICAgICAgICA6IGFwcC5uYW1lXG4gICAgfTwvc3Ryb25nPjwvZGl2PlxuICAgICAgICAke1xuICAgICAgICAgIGFwcC53ZWJzaXRlXG4gICAgICAgICAgICA/IGA8YSBocmVmPVwiJHthcHAud2Vic2l0ZX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke3JlbmRlckltYWdlKGFwcCl9PC9hPmBcbiAgICAgICAgICAgIDogcmVuZGVySW1hZ2UoYXBwKVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+PHNtYWxsPiR7YXBwLmRlc2NyaXB0aW9ufSR7XG4gICAgICBhcHAuZG9jdW1lbnRhdGlvblxuICAgICAgICA/IGAgPGEgaHJlZj1cIiR7YXBwLmRvY3VtZW50YXRpb259XCIgdGFyZ2V0PVwiX2JsYW5rXCI+RG9jdW1lbnRhdGlvbjwvYT5gXG4gICAgICAgIDogXCJcIlxuICAgIH08L3NtYWxsPjwvZGl2PlxuICAgICAgJHtcbiAgICAgICAgYXBwLndlYnNpdGVcbiAgICAgICAgICA/IGA8YSBjbGFzcz1cImRvd25sb2FkXCIgaHJlZj1cIiR7YXBwLndlYnNpdGV9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJXZWJzaXRlXCI+PGkgY2xhc3M9XCJmYXIgZmEtbWFwXCI+PC9pPjwvYT5gXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9XG5cbiAgICAgICR7XG4gICAgICAgIGFwcC5pbnN0YWxsLmFzaW5cbiAgICAgICAgICA/IGA8YSBjbGFzcz1cImRvd25sb2FkXCIgaHJlZj1cImh0dHBzOi8vd3d3LmFtYXpvbi5jb20vZHAvJHthcHAuaW5zdGFsbC5hc2lufVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiQW1hem9uIEFwcHN0b3JlXCI+PGkgY2xhc3M9XCJmYWIgZmEtYW1hem9uXCI+PC9pPjwvYT5gXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9XG4gICAgICAke1xuICAgICAgICBhcHAuaW5zdGFsbC5mRHJvaWRJRFxuICAgICAgICAgID8gYDxhIGNsYXNzPVwiZG93bmxvYWRcIiBocmVmPVwiaHR0cHM6Ly9mLWRyb2lkLm9yZy9yZXBvc2l0b3J5L2Jyb3dzZS8/ZmRpZD0ke2FwcC5pbnN0YWxsLmZEcm9pZElEfVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiRi1Ecm9pZFwiPjxpIGNsYXNzPVwiZmFiIGZhLWFuZHJvaWRcIj48L2k+PC9hPmBcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1cbiAgICAgICR7XG4gICAgICAgIGFwcC5pbnN0YWxsLmdvb2dsZVBsYXlJRFxuICAgICAgICAgID8gYDxhIGNsYXNzPVwiZG93bmxvYWRcIiBocmVmPVwiaHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPSR7YXBwLmluc3RhbGwuZ29vZ2xlUGxheUlEfVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiR29vZ2xlIFBsYXlcIj48aSBjbGFzcz1cImZhYiBmYS1nb29nbGUtcGxheVwiPjwvaT48L2E+YFxuICAgICAgICAgIDogXCJcIlxuICAgICAgfVxuICAgICAgJHtcbiAgICAgICAgYXBwLmluc3RhbGwuaHVhd2VpQXBwR2FsbGVyeUlEXG4gICAgICAgICAgPyBgPGEgY2xhc3M9XCJkb3dubG9hZFwiIGhyZWY9XCJodHRwczovL2FwcGdhbGxlcnkuaHVhd2VpLmNvbS8jL2FwcC8ke2FwcC5pbnN0YWxsLmh1YXdlaUFwcEdhbGxlcnlJRH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiB0aXRsZT1cIkh1YXdlaSBBcHAgR2FsbGVyeVwiPjxpIGNsYXNzPVwiZmFzIGZhLXNob3BwaW5nLWJhZ1wiPjwvaT48L2E+YFxuICAgICAgICAgIDogXCJcIlxuICAgICAgfVxuICAgICAgJHtcbiAgICAgICAgYXBwLmluc3RhbGwuYXBwbGVTdG9yZUlEXG4gICAgICAgICAgPyBgPGEgY2xhc3M9XCJkb3dubG9hZFwiIGhyZWY9XCJodHRwczovL2l0dW5lcy5hcHBsZS5jb20vYXBwLyR7XG4gICAgICAgICAgICAgIGFwcC5pbnN0YWxsLmFwcGxlU3RvcmVJRC50b1VwcGVyQ2FzZSgpLnN0YXJ0c1dpdGgoXCJJRFwiKVxuICAgICAgICAgICAgICAgID8gYXBwLmluc3RhbGwuYXBwbGVTdG9yZUlEXG4gICAgICAgICAgICAgICAgOiBgaWQke2FwcC5pbnN0YWxsLmFwcGxlU3RvcmVJRH1gXG4gICAgICAgICAgICB9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJpVHVuZXMgQXBwIFN0b3JlXCI+PGkgY2xhc3M9XCJmYWIgZmEtYXBwLXN0b3JlLWlvc1wiPjwvaT48L2E+YFxuICAgICAgICAgIDogXCJcIlxuICAgICAgfVxuICAgICAgJHtcbiAgICAgICAgYXBwLmluc3RhbGwubWFjQXBwU3RvcmVJRFxuICAgICAgICAgID8gYDxhIGNsYXNzPVwiZG93bmxvYWRcIiBocmVmPVwiaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL2FwcC8ke1xuICAgICAgICAgICAgICBhcHAuaW5zdGFsbC5tYWNBcHBTdG9yZUlELnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aChcIklEXCIpXG4gICAgICAgICAgICAgICAgPyBhcHAuaW5zdGFsbC5tYWNBcHBTdG9yZUlEXG4gICAgICAgICAgICAgICAgOiBgaWQke2FwcC5pbnN0YWxsLm1hY0FwcFN0b3JlSUR9YFxuICAgICAgICAgICAgfVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiTWFjIEFwcCBTdG9yZVwiPjxpIGNsYXNzPVwiZmFiIGZhLWFwcC1zdG9yZVwiPjwvaT48L2E+YFxuICAgICAgICAgIDogXCJcIlxuICAgICAgfVxuICAgICAgJHtcbiAgICAgICAgYXBwLmluc3RhbGwubWljcm9zb2Z0QXBwSURcbiAgICAgICAgICA/IGA8YSBjbGFzcz1cImRvd25sb2FkXCIgaHJlZj1cImh0dHBzOi8vd3d3Lm1pY3Jvc29mdC5jb20vc3RvcmUvYXBwcy8ke2FwcC5pbnN0YWxsLm1pY3Jvc29mdEFwcElEfVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiTWljcm9zb2Z0IFN0b3JlXCI+PGkgY2xhc3M9XCJmYWIgZmEtbWljcm9zb2Z0XCI+PC9pPjwvYT5gXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9XG4gICAgICA8ZGl2IGNsYXNzPVwiYmFkZ2VzXCI+JHtyZW5kZXJCYWRnZXMoYXBwLnRvcGljcyl9PC9kaXY+XG5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwibW9yZS1pbmZvcy1idXR0b25cIiBocmVmPVwiI1wiPk1vcmUgPGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtZG93blwiPjwvaT48L2E+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9yZS1pbmZvc1wiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9yZS1pbmZvcy10aXRsZVwiPkluZm9ybWF0aW9uczwvZGl2PlxuICAgICAgICAke1xuICAgICAgICAgIGFwcC5wbGF0Zm9ybS5sZW5ndGggPiAwXG4gICAgICAgICAgICA/IGA8ZGl2IGNsYXNzPVwibW9yZS1pbmZvXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtb3JlLWluZm8tdGl0bGVcIj5QbGF0Zm9ybXM8L3NwYW4+IDxzcGFuIGNsYXNzPVwibW9yZS1pbmZvLXRleHRcIj4ke2FwcC5wbGF0Zm9ybS5qb2luKFxuICAgICAgICAgICAgXCIsIFwiXG4gICAgICAgICAgKX08L3NwYW4+XG4gICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9XG4gICAgICAgICR7XG4gICAgICAgICAgYXBwLmxhc3RSZWxlYXNlXG4gICAgICAgICAgICA/IGA8ZGl2IGNsYXNzPVwibW9yZS1pbmZvXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtb3JlLWluZm8tdGl0bGVcIj5MYXN0IHJlbGVhc2U8L3NwYW4+IDxzcGFuIGNsYXNzPVwibW9yZS1pbmZvLXRleHRcIj4ke2FwcC5sYXN0UmVsZWFzZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9XG4gICAgICAgICR7XG4gICAgICAgICAgYXBwLmxhbmd1YWdlc1VybFxuICAgICAgICAgICAgPyBgPGEgY2xhc3M9XCJtb3JlLWluZm9cIiBocmVmPVwiJHthcHAubGFuZ3VhZ2VzVXJsfVwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibW9yZS1pbmZvLXRpdGxlXCI+TGFuZ3VhZ2VzPC9zcGFuPiA8c3BhbiBjbGFzcz1cIm1vcmUtaW5mby10ZXh0XCI+JHtcbiAgICAgICAgICAgICAgICAgIGFwcC5sYW5ndWFnZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICA/IGFwcC5sYW5ndWFnZXMuam9pbihcIiwgXCIpXG4gICAgICAgICAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLWxhbmd1YWdlXCI+PC9pPmBcbiAgICAgICAgICAgICAgICB9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2E+YFxuICAgICAgICAgICAgOiBhcHAubGFuZ3VhZ2VzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gYDxkaXYgY2xhc3M9XCJtb3JlLWluZm9cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vcmUtaW5mby10aXRsZVwiPkxhbmd1YWdlczwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJtb3JlLWluZm8tdGV4dFwiPiR7YXBwLmxhbmd1YWdlcy5qb2luKFxuICAgICAgICAgICAgXCIsIFwiXG4gICAgICAgICAgKX08L3NwYW4+XG4gICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9XG4gICAgICAgICR7XG4gICAgICAgICAgYXBwLmNvdmVyYWdlICYmIGFwcC5jb3ZlcmFnZS5sZW5ndGhcbiAgICAgICAgICAgID8gYDxkaXYgY2xhc3M9XCJtb3JlLWluZm9cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vcmUtaW5mby10aXRsZVwiPkNvdmVyYWdlPC9zcGFuPiA8c3BhbiBjbGFzcz1cIm1vcmUtaW5mby10ZXh0XCI+JHtcbiAgICAgICAgICAgIGFwcC5jb3ZlcmFnZVthcHAuY292ZXJhZ2UubGVuZ3RoIC0gMV1cbiAgICAgICAgICB9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgfVxuICAgICAgICAke1xuICAgICAgICAgIGFwcC5hdXRob3JcbiAgICAgICAgICAgID8gYDxkaXYgY2xhc3M9XCJtb3JlLWluZm9cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vcmUtaW5mby10aXRsZVwiPkF1dGhvcjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJtb3JlLWluZm8tdGV4dFwiPiR7YXBwLmF1dGhvcn08L3NwYW4+XG4gICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9XG4gICAgICAgICR7XG4gICAgICAgICAgYXBwLnByaWNlXG4gICAgICAgICAgICA/IGA8ZGl2IGNsYXNzPVwibW9yZS1pbmZvXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtb3JlLWluZm8tdGl0bGVcIj5QcmljZTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJtb3JlLWluZm8tdGV4dFwiPiR7YXBwLnByaWNlfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgIH1cbiAgICAgICAgJHtcbiAgICAgICAgICBhcHAubGljZW5zZVxuICAgICAgICAgICAgPyBgPGRpdiBjbGFzcz1cIm1vcmUtaW5mb1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibW9yZS1pbmZvLXRpdGxlXCI+TGljZW5zZTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJtb3JlLWluZm8tdGV4dFwiPiR7YXBwLmxpY2Vuc2V9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgfVxuICAgICAgICAke1xuICAgICAgICAgIGFwcC5zb3VyY2VDb2RlXG4gICAgICAgICAgICA/IGA8YSBjbGFzcz1cIm1vcmUtaW5mb1wiIGhyZWY9XCIke2FwcC5zb3VyY2VDb2RlfVwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibW9yZS1pbmZvLXRpdGxlXCI+U291cmNlIGNvZGU8L3NwYW4+IDxzcGFuIGNsYXNzPVwibW9yZS1pbmZvLXRleHRcIj48aSBjbGFzcz1cImZhcyBmYS1jb2RlXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgPC9hPmBcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb3JlLWluZm9cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJtb3JlLWluZm8tdGl0bGVcIj5Tb3VyY2U8L3NwYW4+IDxzcGFuIGNsYXNzPVwibW9yZS1pbmZvLXRleHRcIj4ke2FwcC5zb3VyY2VcbiAgICAgICAgICAubWFwKChzKSA9PiBgPGEgaHJlZj1cIiR7cy51cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtzLmRpc3BsYXlOYW1lfTwvYT5gKVxuICAgICAgICAgIC5qb2luKFwiLCBcIil9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCxcbiAgICBbXCJhcHBcIl1cbiAgKTtcblxuICBjb25zdCBtb3JlQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLm1vcmUtaW5mb3MtYnV0dG9uXCJcbiAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuICBjb25zdCBtb3JlSW5mb3MgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9yZS1pbmZvc1wiKSBhcyBIVE1MRWxlbWVudDtcblxuICBtb3JlQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2KSA9PiB7XG4gICAgbW9yZUJ1dHRvbj8uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5OiBub25lO1wiKTtcbiAgICBtb3JlSW5mb3M/LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xuXG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG5cbiAgZ2V0SHRtbEVsZW1lbnQoXCIjbGlzdFwiKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbn1cbiIsImltcG9ydCB7IHRleHRUb0NvbG9yIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9zdHJpbmdcIjtcblxuZnVuY3Rpb24gcmVuZGVyQmFkZ2UodDogc3RyaW5nKSB7XG4gIGNvbnN0IGJhY2tncm91bmQgPSB0ZXh0VG9Db2xvcih0KTtcblxuICBjb25zdCB5aXEgPVxuICAgIChiYWNrZ3JvdW5kLnIgKiAyOTkgKyBiYWNrZ3JvdW5kLmcgKiA1ODcgKyBiYWNrZ3JvdW5kLmIgKiAxMTQpIC8gMTAwMDtcblxuICByZXR1cm4gYDxzcGFuIGNsYXNzPVwiYmFkZ2VcIiBzdHlsZT1cImJhY2tncm91bmQ6IHJnYigke2JhY2tncm91bmQucn0sJHtcbiAgICBiYWNrZ3JvdW5kLmdcbiAgfSwke2JhY2tncm91bmQuYn0pOyBjb2xvcjoke3lpcSA+PSAxMjggPyBcImJsYWNrXCIgOiBcIndoaXRlXCJ9O1wiPiR7dH08L3NwYW4+YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckJhZGdlcyh2YWx1ZXM6IHN0cmluZyB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkKSB7XG4gIGlmICghdmFsdWVzKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIHJlbmRlckJhZGdlKHZhbHVlcyk7XG4gIH1cblxuICByZXR1cm4gdmFsdWVzLm1hcChyZW5kZXJCYWRnZSkuam9pbihcIlwiKTtcbn1cbiIsImltcG9ydCB7IEFwcCB9IGZyb20gXCIuLi8uLi9kYXRhL3RlbXBsYXRlL3V0aWxpdGllc1wiO1xuaW1wb3J0IHsgdGVtcGxhdGVEYXRhIH0gZnJvbSBcIi4uL3RlbXBsYXRlRGF0YVwiO1xuaW1wb3J0IHsgZ2V0TG9jYWxpemVkVmFsdWUgfSBmcm9tIFwiLi4vZ2V0TG9jYWxpemVkVmFsdWVcIjtcbmltcG9ydCB7IGVxdWFsc0lnbm9yZUNhc2UsIGVxdWFsc1llcyB9IGZyb20gXCIuLi91dGlsaXRpZXMvc3RyaW5nXCI7XG5cbmZ1bmN0aW9uIGlzVW5rbm93bih2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQpOiB2YWx1ZSBpcyB1bmRlZmluZWQge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgcmV0dXJuICF2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvV2lraVRhYmxlKFxuICBhcHBzOiBBcHBbXSxcbiAgcGFyYW1zOiB7XG4gICAgbGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGhhc1ZhbHVlOiAoYXBwOiBBcHApID0+IGJvb2xlYW47XG4gICAgbm90Tm8/OiAoYXBwOiBBcHApID0+IGJvb2xlYW47XG4gICAgcmVuZGVyVG9XaWtpOiAoYXBwOiBBcHApID0+IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBtb3JlPzogYm9vbGVhbjtcbiAgfVtdLFxuICBsYW5nOiBzdHJpbmdcbikge1xuICBjb25zdCBtb3JlID0gcGFyYW1zLnNvbWUoKHApID0+IHAubW9yZSk7XG5cbiAgY29uc3QgYXBwV2l0aEZpZWxkcyA9IGFwcHNcbiAgICAuZmlsdGVyKChhcHApID0+IHBhcmFtcy5zb21lKChwKSA9PiBwLmhhc1ZhbHVlKGFwcCkpKVxuICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBuYW1lQSA9IGEubmFtZS50b1VwcGVyQ2FzZSgpIHx8IFwiXCI7XG4gICAgICBjb25zdCBuYW1lQiA9IGIubmFtZS50b1VwcGVyQ2FzZSgpIHx8IFwiXCI7XG4gICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBpZiAobmFtZUEgPiBuYW1lQikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG5cbiAgbGV0IHJvd3MgPSBwYXJhbXNcbiAgICAubWFwKChwKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgICFhcHBXaXRoRmllbGRzLnNvbWUoXG4gICAgICAgICAgKGFwcCkgPT4gcC5oYXNWYWx1ZShhcHApICYmICghcC5ub3RObyB8fCBwLm5vdE5vKGFwcCkpXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCEgdGl0bGU9XCIke3AuZGVzY3JpcHRpb259XCIgfCR7cC5sYWJlbH1cbiR7YXBwV2l0aEZpZWxkcy5tYXAoKGFwcCkgPT4gYHwke3AucmVuZGVyVG9XaWtpKGFwcCkgfHwgXCJcIn1cXG5gKS5qb2luKFwiXCIpfWA7XG4gICAgfSlcbiAgICAuZmlsdGVyKChlKSA9PiBlKTtcblxuICBjb25zdCB3aWtpVGFibGUgPSBgPGRpdiBzdHlsZT1cIm92ZXJmbG93LXg6YXV0bzttYXgtd2lkdGg6MTAwJVwiPlxue3wgY2xhc3M9XCJ3aWtpdGFibGUgc3RpY2t5XCIgc3R5bGU9XCJmb250LXNpemU6IDg1JTsgdGV4dC1hbGlnbjogY2VudGVyO1wiXG58K1xuISB0aXRsZT1cIiR7Z2V0TG9jYWxpemVkVmFsdWUoXG4gICAgdGVtcGxhdGVEYXRhLnBhcmFtc1tcIm5hbWVcIl0uZGVzY3JpcHRpb24sXG4gICAgbGFuZ1xuICApfVwiIHwke2dldExvY2FsaXplZFZhbHVlKHRlbXBsYXRlRGF0YS5wYXJhbXNbXCJuYW1lXCJdLmxhYmVsLCBsYW5nKX1cbiR7YXBwV2l0aEZpZWxkc1xuICAubWFwKChhcHApID0+IHtcbiAgICBjb25zdCB3aWtpID1cbiAgICAgIGFwcC5zb3VyY2UuZmluZCgocykgPT4gcy5uYW1lID09PSBcIlNvZnR3YXJlXCIpPy53aWtpIHx8XG4gICAgICBhcHAuc291cmNlLmZpbmQoKHMpID0+IHMubmFtZSA9PT0gXCJMYXllclwiKT8ud2lraSB8fFxuICAgICAgYXBwLnNvdXJjZS5maW5kKChzKSA9PiBzLm5hbWUgPT09IFwiU2VydmljZUl0ZW1cIik/Lndpa2k7XG5cbiAgICByZXR1cm4gYCEgc3R5bGU9XCJtaW4td2lkdGg6ICR7bW9yZSA/IDE2MCA6IDEyMH1weFwiIHxbWyR7d2lraSB8fCBhcHAubmFtZX18JHtcbiAgICAgIGFwcC5uYW1lIHx8IFwie3s/fX1cIlxuICAgIH1dXVxcbmA7XG4gIH0pXG4gIC5qb2luKFwiXCIpfXwtXG4ke3Jvd3Muam9pbihcInwtXFxuXCIpfXx9XG48L2Rpdj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTo4MCVcIj57eyNzd2l0Y2g6IHt7ezF8e3t7bGFuZ319fX19fVxufCBkZSA9IERpZXNlIFRhYmVsbGUgd3VyZGUgdm9tIFtodHRwczovL29zbS1hcHBzLnpvdHRlbGlnLmNoIE9TTSBBcHAgQ2F0YWxvZ10gYW0gJHtuZXcgRGF0ZSgpXG4gICAgLnRvSVNPU3RyaW5nKClcbiAgICAuc3Vic3RyaW5nKDAsIDEwKX0gZXJzdGVsbHQuXG58ICNkZWZhdWx0ID0gVGhpcyB0YWJsZSB3YXMgY3JlYXRlZCBieSBbaHR0cHM6Ly9vc20tYXBwcy56b3R0ZWxpZy5jaCBPU00gQXBwIENhdGFsb2ddIGF0ICR7bmV3IERhdGUoKVxuICAgIC50b0lTT1N0cmluZygpXG4gICAgLnN1YnN0cmluZygwLCAxMCl9LlxufX08L3NwYW4+YDtcbiAgcmV0dXJuIHdpa2lUYWJsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvV2lraVZhbHVlKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gIGlmIChpc1Vua25vd24odmFsdWUpKSB7XG4gICAgcmV0dXJuIFwie3s/fX1cIjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZiAoZXF1YWxzWWVzKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIFwie3t5ZXN9fVwiO1xuICAgIH0gZWxzZSBpZiAoZXF1YWxzSWdub3JlQ2FzZSh2YWx1ZSwgXCJub1wiKSkge1xuICAgICAgcmV0dXJuIFwie3tub319XCI7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZS5tYXAoKHYpID0+IHRvV2lraVZhbHVlKHYpKS5qb2luKFwiLCBcIik7XG59XG4iLCJ2YXIgY2hhcmVuYyA9IHtcbiAgLy8gVVRGLTggZW5jb2RpbmdcbiAgdXRmODoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICByZXR1cm4gY2hhcmVuYy5iaW4uc3RyaW5nVG9CeXRlcyh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShjaGFyZW5jLmJpbi5ieXRlc1RvU3RyaW5nKGJ5dGVzKSkpO1xuICAgIH1cbiAgfSxcblxuICAvLyBCaW5hcnkgZW5jb2RpbmdcbiAgYmluOiB7XG4gICAgLy8gQ29udmVydCBhIHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBzdHJpbmdUb0J5dGVzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKVxuICAgICAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRik7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgc3RyaW5nXG4gICAgYnl0ZXNUb1N0cmluZzogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIHN0ciA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKVxuICAgICAgICBzdHIucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKSk7XG4gICAgICByZXR1cm4gc3RyLmpvaW4oJycpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFyZW5jO1xuIiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgYmFzZTY0bWFwXG4gICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJyxcblxuICBjcnlwdCA9IHtcbiAgICAvLyBCaXQtd2lzZSByb3RhdGlvbiBsZWZ0XG4gICAgcm90bDogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8IGIpIHwgKG4gPj4+ICgzMiAtIGIpKTtcbiAgICB9LFxuXG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gcmlnaHRcbiAgICByb3RyOiBmdW5jdGlvbihuLCBiKSB7XG4gICAgICByZXR1cm4gKG4gPDwgKDMyIC0gYikpIHwgKG4gPj4+IGIpO1xuICAgIH0sXG5cbiAgICAvLyBTd2FwIGJpZy1lbmRpYW4gdG8gbGl0dGxlLWVuZGlhbiBhbmQgdmljZSB2ZXJzYVxuICAgIGVuZGlhbjogZnVuY3Rpb24obikge1xuICAgICAgLy8gSWYgbnVtYmVyIGdpdmVuLCBzd2FwIGVuZGlhblxuICAgICAgaWYgKG4uY29uc3RydWN0b3IgPT0gTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBjcnlwdC5yb3RsKG4sIDgpICYgMHgwMEZGMDBGRiB8IGNyeXB0LnJvdGwobiwgMjQpICYgMHhGRjAwRkYwMDtcbiAgICAgIH1cblxuICAgICAgLy8gRWxzZSwgYXNzdW1lIGFycmF5IGFuZCBzd2FwIGFsbCBpdGVtc1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmxlbmd0aDsgaSsrKVxuICAgICAgICBuW2ldID0gY3J5cHQuZW5kaWFuKG5baV0pO1xuICAgICAgcmV0dXJuIG47XG4gICAgfSxcblxuICAgIC8vIEdlbmVyYXRlIGFuIGFycmF5IG9mIGFueSBsZW5ndGggb2YgcmFuZG9tIGJ5dGVzXG4gICAgcmFuZG9tQnl0ZXM6IGZ1bmN0aW9uKG4pIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW107IG4gPiAwOyBuLS0pXG4gICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGJpZy1lbmRpYW4gMzItYml0IHdvcmRzXG4gICAgYnl0ZXNUb1dvcmRzOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgd29yZHMgPSBbXSwgaSA9IDAsIGIgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyssIGIgKz0gOClcbiAgICAgICAgd29yZHNbYiA+Pj4gNV0gfD0gYnl0ZXNbaV0gPDwgKDI0IC0gYiAlIDMyKTtcbiAgICAgIHJldHVybiB3b3JkcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBiaWctZW5kaWFuIDMyLWJpdCB3b3JkcyB0byBhIGJ5dGUgYXJyYXlcbiAgICB3b3Jkc1RvQnl0ZXM6IGZ1bmN0aW9uKHdvcmRzKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBiID0gMDsgYiA8IHdvcmRzLmxlbmd0aCAqIDMyOyBiICs9IDgpXG4gICAgICAgIGJ5dGVzLnB1c2goKHdvcmRzW2IgPj4+IDVdID4+PiAoMjQgLSBiICUgMzIpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGhleCBzdHJpbmdcbiAgICBieXRlc1RvSGV4OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgaGV4ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldID4+PiA0KS50b1N0cmluZygxNikpO1xuICAgICAgICBoZXgucHVzaCgoYnl0ZXNbaV0gJiAweEYpLnRvU3RyaW5nKDE2KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgaGV4IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBoZXhUb0J5dGVzOiBmdW5jdGlvbihoZXgpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGMgPSAwOyBjIDwgaGV4Lmxlbmd0aDsgYyArPSAyKVxuICAgICAgICBieXRlcy5wdXNoKHBhcnNlSW50KGhleC5zdWJzdHIoYywgMiksIDE2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgYmFzZS02NCBzdHJpbmdcbiAgICBieXRlc1RvQmFzZTY0OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgYmFzZTY0ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZXNbaV0gPDwgMTYpIHwgKGJ5dGVzW2kgKyAxXSA8PCA4KSB8IGJ5dGVzW2kgKyAyXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspXG4gICAgICAgICAgaWYgKGkgKiA4ICsgaiAqIDYgPD0gYnl0ZXMubGVuZ3RoICogOClcbiAgICAgICAgICAgIGJhc2U2NC5wdXNoKGJhc2U2NG1hcC5jaGFyQXQoKHRyaXBsZXQgPj4+IDYgKiAoMyAtIGopKSAmIDB4M0YpKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBiYXNlNjQucHVzaCgnPScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhc2U2NC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJhc2UtNjQgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIGJhc2U2NFRvQnl0ZXM6IGZ1bmN0aW9uKGJhc2U2NCkge1xuICAgICAgLy8gUmVtb3ZlIG5vbi1iYXNlLTY0IGNoYXJhY3RlcnNcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5yZXBsYWNlKC9bXkEtWjAtOStcXC9dL2lnLCAnJyk7XG5cbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwLCBpbW9kNCA9IDA7IGkgPCBiYXNlNjQubGVuZ3RoO1xuICAgICAgICAgIGltb2Q0ID0gKytpICUgNCkge1xuICAgICAgICBpZiAoaW1vZDQgPT0gMCkgY29udGludWU7XG4gICAgICAgIGJ5dGVzLnB1c2goKChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkgLSAxKSlcbiAgICAgICAgICAgICYgKE1hdGgucG93KDIsIC0yICogaW1vZDQgKyA4KSAtIDEpKSA8PCAoaW1vZDQgKiAyKSlcbiAgICAgICAgICAgIHwgKGJhc2U2NG1hcC5pbmRleE9mKGJhc2U2NC5jaGFyQXQoaSkpID4+PiAoNiAtIGltb2Q0ICogMikpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBjcnlwdDtcbn0pKCk7XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIihmdW5jdGlvbigpe1xyXG4gIHZhciBjcnlwdCA9IHJlcXVpcmUoJ2NyeXB0JyksXHJcbiAgICAgIHV0ZjggPSByZXF1aXJlKCdjaGFyZW5jJykudXRmOCxcclxuICAgICAgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKSxcclxuICAgICAgYmluID0gcmVxdWlyZSgnY2hhcmVuYycpLmJpbixcclxuXHJcbiAgLy8gVGhlIGNvcmVcclxuICBtZDUgPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgLy8gQ29udmVydCB0byBieXRlIGFycmF5XHJcbiAgICBpZiAobWVzc2FnZS5jb25zdHJ1Y3RvciA9PSBTdHJpbmcpXHJcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RpbmcgPT09ICdiaW5hcnknKVxyXG4gICAgICAgIG1lc3NhZ2UgPSBiaW4uc3RyaW5nVG9CeXRlcyhtZXNzYWdlKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIG1lc3NhZ2UgPSB1dGY4LnN0cmluZ1RvQnl0ZXMobWVzc2FnZSk7XHJcbiAgICBlbHNlIGlmIChpc0J1ZmZlcihtZXNzYWdlKSlcclxuICAgICAgbWVzc2FnZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2UsIDApO1xyXG4gICAgZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZSkgJiYgbWVzc2FnZS5jb25zdHJ1Y3RvciAhPT0gVWludDhBcnJheSlcclxuICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UudG9TdHJpbmcoKTtcclxuICAgIC8vIGVsc2UsIGFzc3VtZSBieXRlIGFycmF5IGFscmVhZHlcclxuXHJcbiAgICB2YXIgbSA9IGNyeXB0LmJ5dGVzVG9Xb3JkcyhtZXNzYWdlKSxcclxuICAgICAgICBsID0gbWVzc2FnZS5sZW5ndGggKiA4LFxyXG4gICAgICAgIGEgPSAgMTczMjU4NDE5MyxcclxuICAgICAgICBiID0gLTI3MTczMzg3OSxcclxuICAgICAgICBjID0gLTE3MzI1ODQxOTQsXHJcbiAgICAgICAgZCA9ICAyNzE3MzM4Nzg7XHJcblxyXG4gICAgLy8gU3dhcCBlbmRpYW5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBtW2ldID0gKChtW2ldIDw8ICA4KSB8IChtW2ldID4+PiAyNCkpICYgMHgwMEZGMDBGRiB8XHJcbiAgICAgICAgICAgICAoKG1baV0gPDwgMjQpIHwgKG1baV0gPj4+ICA4KSkgJiAweEZGMDBGRjAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBhZGRpbmdcclxuICAgIG1bbCA+Pj4gNV0gfD0gMHg4MCA8PCAobCAlIDMyKTtcclxuICAgIG1bKCgobCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsO1xyXG5cclxuICAgIC8vIE1ldGhvZCBzaG9ydGN1dHNcclxuICAgIHZhciBGRiA9IG1kNS5fZmYsXHJcbiAgICAgICAgR0cgPSBtZDUuX2dnLFxyXG4gICAgICAgIEhIID0gbWQ1Ll9oaCxcclxuICAgICAgICBJSSA9IG1kNS5faWk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSArPSAxNikge1xyXG5cclxuICAgICAgdmFyIGFhID0gYSxcclxuICAgICAgICAgIGJiID0gYixcclxuICAgICAgICAgIGNjID0gYyxcclxuICAgICAgICAgIGRkID0gZDtcclxuXHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDBdLCAgNywgLTY4MDg3NjkzNik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDFdLCAxMiwgLTM4OTU2NDU4Nik7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krIDJdLCAxNywgIDYwNjEwNTgxOSk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyA0XSwgIDcsIC0xNzY0MTg4OTcpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyA1XSwgMTIsICAxMjAwMDgwNDI2KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krIDddLCAyMiwgLTQ1NzA1OTgzKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgOF0sICA3LCAgMTc3MDAzNTQxNik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKzEwXSwgMTcsIC00MjA2Myk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKzEyXSwgIDcsICAxODA0NjAzNjgyKTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsxM10sIDEyLCAtNDAzNDExMDEpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKzE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XHJcblxyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyAxXSwgIDUsIC0xNjU3OTY1MTApO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKyA2XSwgIDksIC0xMDY5NTAxNjMyKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsxMV0sIDE0LCAgNjQzNzE3NzEzKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgMF0sIDIwLCAtMzczODk3MzAyKTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgNV0sICA1LCAtNzAxNTU4NjkxKTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsxMF0sICA5LCAgMzgwMTYwODMpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKzE1XSwgMTQsIC02NjA0NzgzMzUpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyA5XSwgIDUsICA1Njg0NDY0MzgpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKzE0XSwgIDksIC0xMDE5ODAzNjkwKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsgM10sIDE0LCAtMTg3MzYzOTYxKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krMTNdLCAgNSwgLTE0NDQ2ODE0NjcpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKyAyXSwgIDksIC01MTQwMzc4NCk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKzEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcclxuXHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDVdLCAgNCwgLTM3ODU1OCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKzExXSwgMTYsICAxODM5MDMwNTYyKTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsxNF0sIDIzLCAtMzUzMDk1NTYpO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyAxXSwgIDQsIC0xNTMwOTkyMDYwKTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krIDddLCAxNiwgLTE1NTQ5NzYzMik7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKzEzXSwgIDQsICA2ODEyNzkxNzQpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyAwXSwgMTEsIC0zNTg1MzcyMjIpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKyA2XSwgMjMsICA3NjAyOTE4OSk7XHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDldLCAgNCwgLTY0MDM2NDQ4Nyk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krMTJdLCAxMSwgLTQyMTgxNTgzNSk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krMTVdLCAxNiwgIDUzMDc0MjUyMCk7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krIDJdLCAyMywgLTk5NTMzODY1MSk7XHJcblxyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyAwXSwgIDYsIC0xOTg2MzA4NDQpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKyA3XSwgMTAsICAxMTI2ODkxNDE1KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDVdLCAyMSwgLTU3NDM0MDU1KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsxMl0sICA2LCAgMTcwMDQ4NTU3MSk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKzEwXSwgMTUsIC0xMDUxNTIzKTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDhdLCAgNiwgIDE4NzMzMTMzNTkpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKzE1XSwgMTAsIC0zMDYxMTc0NCk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krIDZdLCAxNSwgLTE1NjAxOTgzODApO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKzEzXSwgMjEsICAxMzA5MTUxNjQ5KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgNF0sICA2LCAtMTQ1NTIzMDcwKTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krIDJdLCAxNSwgIDcxODc4NzI1OSk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcblxyXG4gICAgICBhID0gKGEgKyBhYSkgPj4+IDA7XHJcbiAgICAgIGIgPSAoYiArIGJiKSA+Pj4gMDtcclxuICAgICAgYyA9IChjICsgY2MpID4+PiAwO1xyXG4gICAgICBkID0gKGQgKyBkZCkgPj4+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNyeXB0LmVuZGlhbihbYSwgYiwgYywgZF0pO1xyXG4gIH07XHJcblxyXG4gIC8vIEF1eGlsaWFyeSBmdW5jdGlvbnNcclxuICBtZDUuX2ZmICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiAmIGMgfCB+YiAmIGQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2dnICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiAmIGQgfCBjICYgfmQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2hoICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiBeIGMgXiBkKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9paSAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGMgXiAoYiB8IH5kKSkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG5cclxuICAvLyBQYWNrYWdlIHByaXZhdGUgYmxvY2tzaXplXHJcbiAgbWQ1Ll9ibG9ja3NpemUgPSAxNjtcclxuICBtZDUuX2RpZ2VzdHNpemUgPSAxNjtcclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgaWYgKG1lc3NhZ2UgPT09IHVuZGVmaW5lZCB8fCBtZXNzYWdlID09PSBudWxsKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgYXJndW1lbnQgJyArIG1lc3NhZ2UpO1xyXG5cclxuICAgIHZhciBkaWdlc3RieXRlcyA9IGNyeXB0LndvcmRzVG9CeXRlcyhtZDUobWVzc2FnZSwgb3B0aW9ucykpO1xyXG4gICAgcmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5hc0J5dGVzID8gZGlnZXN0Ynl0ZXMgOlxyXG4gICAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5hc1N0cmluZyA/IGJpbi5ieXRlc1RvU3RyaW5nKGRpZ2VzdGJ5dGVzKSA6XHJcbiAgICAgICAgY3J5cHQuYnl0ZXNUb0hleChkaWdlc3RieXRlcyk7XHJcbiAgfTtcclxuXHJcbn0pKCk7XHJcbiIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4vdHlwZW9mLmpzXCIpW1wiZGVmYXVsdFwiXTtcbmZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gIFwidXNlIHN0cmljdFwiOyAvKiEgcmVnZW5lcmF0b3ItcnVudGltZSAtLSBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy4gLS0gbGljZW5zZSAoTUlUKTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2Jsb2IvbWFpbi9MSUNFTlNFICovXG4gIG1vZHVsZS5leHBvcnRzID0gX3JlZ2VuZXJhdG9yUnVudGltZSA9IGZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gICAgcmV0dXJuIGU7XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cztcbiAgdmFyIHQsXG4gICAgZSA9IHt9LFxuICAgIHIgPSBPYmplY3QucHJvdG90eXBlLFxuICAgIG4gPSByLmhhc093blByb3BlcnR5LFxuICAgIG8gPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKHQsIGUsIHIpIHtcbiAgICAgIHRbZV0gPSByLnZhbHVlO1xuICAgIH0sXG4gICAgaSA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sID8gU3ltYm9sIDoge30sXG4gICAgYSA9IGkuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCIsXG4gICAgYyA9IGkuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiLFxuICAgIHUgPSBpLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuICBmdW5jdGlvbiBkZWZpbmUodCwgZSwgcikge1xuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgZSwge1xuICAgICAgdmFsdWU6IHIsXG4gICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogITAsXG4gICAgICB3cml0YWJsZTogITBcbiAgICB9KSwgdFtlXTtcbiAgfVxuICB0cnkge1xuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKHQpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiBkZWZpbmUodCwgZSwgcikge1xuICAgICAgcmV0dXJuIHRbZV0gPSByO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gd3JhcCh0LCBlLCByLCBuKSB7XG4gICAgdmFyIGkgPSBlICYmIGUucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gZSA6IEdlbmVyYXRvcixcbiAgICAgIGEgPSBPYmplY3QuY3JlYXRlKGkucHJvdG90eXBlKSxcbiAgICAgIGMgPSBuZXcgQ29udGV4dChuIHx8IFtdKTtcbiAgICByZXR1cm4gbyhhLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QodCwgciwgYylcbiAgICB9KSwgYTtcbiAgfVxuICBmdW5jdGlvbiB0cnlDYXRjaCh0LCBlLCByKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogdC5jYWxsKGUsIHIpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKHQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidGhyb3dcIixcbiAgICAgICAgYXJnOiB0XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBlLndyYXAgPSB3cmFwO1xuICB2YXIgaCA9IFwic3VzcGVuZGVkU3RhcnRcIixcbiAgICBsID0gXCJzdXNwZW5kZWRZaWVsZFwiLFxuICAgIGYgPSBcImV4ZWN1dGluZ1wiLFxuICAgIHMgPSBcImNvbXBsZXRlZFwiLFxuICAgIHkgPSB7fTtcbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG4gIHZhciBwID0ge307XG4gIGRlZmluZShwLCBhLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICB2YXIgZCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICB2ID0gZCAmJiBkKGQodmFsdWVzKFtdKSkpO1xuICB2ICYmIHYgIT09IHIgJiYgbi5jYWxsKHYsIGEpICYmIChwID0gdik7XG4gIHZhciBnID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocCk7XG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyh0KSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgIGRlZmluZSh0LCBlLCBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKGUsIHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcih0LCBlKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKHIsIG8sIGksIGEpIHtcbiAgICAgIHZhciBjID0gdHJ5Q2F0Y2godFtyXSwgdCwgbyk7XG4gICAgICBpZiAoXCJ0aHJvd1wiICE9PSBjLnR5cGUpIHtcbiAgICAgICAgdmFyIHUgPSBjLmFyZyxcbiAgICAgICAgICBoID0gdS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIGggJiYgXCJvYmplY3RcIiA9PSBfdHlwZW9mKGgpICYmIG4uY2FsbChoLCBcIl9fYXdhaXRcIikgPyBlLnJlc29sdmUoaC5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB0LCBpLCBhKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCB0LCBpLCBhKTtcbiAgICAgICAgfSkgOiBlLnJlc29sdmUoaCkudGhlbihmdW5jdGlvbiAodCkge1xuICAgICAgICAgIHUudmFsdWUgPSB0LCBpKHUpO1xuICAgICAgICB9LCBmdW5jdGlvbiAodCkge1xuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCB0LCBpLCBhKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBhKGMuYXJnKTtcbiAgICB9XG4gICAgdmFyIHI7XG4gICAgbyh0aGlzLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHQsIG4pIHtcbiAgICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBlKGZ1bmN0aW9uIChlLCByKSB7XG4gICAgICAgICAgICBpbnZva2UodCwgbiwgZSwgcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHIgPSByID8gci50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoZSwgciwgbikge1xuICAgIHZhciBvID0gaDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGksIGEpIHtcbiAgICAgIGlmIChvID09PSBmKSB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgaWYgKG8gPT09IHMpIHtcbiAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gaSkgdGhyb3cgYTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogdCxcbiAgICAgICAgICBkb25lOiAhMFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZm9yIChuLm1ldGhvZCA9IGksIG4uYXJnID0gYTs7KSB7XG4gICAgICAgIHZhciBjID0gbi5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGMpIHtcbiAgICAgICAgICB2YXIgdSA9IG1heWJlSW52b2tlRGVsZWdhdGUoYywgbik7XG4gICAgICAgICAgaWYgKHUpIHtcbiAgICAgICAgICAgIGlmICh1ID09PSB5KSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiB1O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJuZXh0XCIgPT09IG4ubWV0aG9kKSBuLnNlbnQgPSBuLl9zZW50ID0gbi5hcmc7ZWxzZSBpZiAoXCJ0aHJvd1wiID09PSBuLm1ldGhvZCkge1xuICAgICAgICAgIGlmIChvID09PSBoKSB0aHJvdyBvID0gcywgbi5hcmc7XG4gICAgICAgICAgbi5kaXNwYXRjaEV4Y2VwdGlvbihuLmFyZyk7XG4gICAgICAgIH0gZWxzZSBcInJldHVyblwiID09PSBuLm1ldGhvZCAmJiBuLmFicnVwdChcInJldHVyblwiLCBuLmFyZyk7XG4gICAgICAgIG8gPSBmO1xuICAgICAgICB2YXIgcCA9IHRyeUNhdGNoKGUsIHIsIG4pO1xuICAgICAgICBpZiAoXCJub3JtYWxcIiA9PT0gcC50eXBlKSB7XG4gICAgICAgICAgaWYgKG8gPSBuLmRvbmUgPyBzIDogbCwgcC5hcmcgPT09IHkpIGNvbnRpbnVlO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcC5hcmcsXG4gICAgICAgICAgICBkb25lOiBuLmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIFwidGhyb3dcIiA9PT0gcC50eXBlICYmIChvID0gcywgbi5tZXRob2QgPSBcInRocm93XCIsIG4uYXJnID0gcC5hcmcpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShlLCByKSB7XG4gICAgdmFyIG4gPSByLm1ldGhvZCxcbiAgICAgIG8gPSBlLml0ZXJhdG9yW25dO1xuICAgIGlmIChvID09PSB0KSByZXR1cm4gci5kZWxlZ2F0ZSA9IG51bGwsIFwidGhyb3dcIiA9PT0gbiAmJiBlLml0ZXJhdG9yW1wicmV0dXJuXCJdICYmIChyLm1ldGhvZCA9IFwicmV0dXJuXCIsIHIuYXJnID0gdCwgbWF5YmVJbnZva2VEZWxlZ2F0ZShlLCByKSwgXCJ0aHJvd1wiID09PSByLm1ldGhvZCkgfHwgXCJyZXR1cm5cIiAhPT0gbiAmJiAoci5tZXRob2QgPSBcInRocm93XCIsIHIuYXJnID0gbmV3IFR5cGVFcnJvcihcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ1wiICsgbiArIFwiJyBtZXRob2RcIikpLCB5O1xuICAgIHZhciBpID0gdHJ5Q2F0Y2gobywgZS5pdGVyYXRvciwgci5hcmcpO1xuICAgIGlmIChcInRocm93XCIgPT09IGkudHlwZSkgcmV0dXJuIHIubWV0aG9kID0gXCJ0aHJvd1wiLCByLmFyZyA9IGkuYXJnLCByLmRlbGVnYXRlID0gbnVsbCwgeTtcbiAgICB2YXIgYSA9IGkuYXJnO1xuICAgIHJldHVybiBhID8gYS5kb25lID8gKHJbZS5yZXN1bHROYW1lXSA9IGEudmFsdWUsIHIubmV4dCA9IGUubmV4dExvYywgXCJyZXR1cm5cIiAhPT0gci5tZXRob2QgJiYgKHIubWV0aG9kID0gXCJuZXh0XCIsIHIuYXJnID0gdCksIHIuZGVsZWdhdGUgPSBudWxsLCB5KSA6IGEgOiAoci5tZXRob2QgPSBcInRocm93XCIsIHIuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpLCByLmRlbGVnYXRlID0gbnVsbCwgeSk7XG4gIH1cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KHQpIHtcbiAgICB2YXIgZSA9IHtcbiAgICAgIHRyeUxvYzogdFswXVxuICAgIH07XG4gICAgMSBpbiB0ICYmIChlLmNhdGNoTG9jID0gdFsxXSksIDIgaW4gdCAmJiAoZS5maW5hbGx5TG9jID0gdFsyXSwgZS5hZnRlckxvYyA9IHRbM10pLCB0aGlzLnRyeUVudHJpZXMucHVzaChlKTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KHQpIHtcbiAgICB2YXIgZSA9IHQuY29tcGxldGlvbiB8fCB7fTtcbiAgICBlLnR5cGUgPSBcIm5vcm1hbFwiLCBkZWxldGUgZS5hcmcsIHQuY29tcGxldGlvbiA9IGU7XG4gIH1cbiAgZnVuY3Rpb24gQ29udGV4dCh0KSB7XG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XSwgdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyksIHRoaXMucmVzZXQoITApO1xuICB9XG4gIGZ1bmN0aW9uIHZhbHVlcyhlKSB7XG4gICAgaWYgKGUgfHwgXCJcIiA9PT0gZSkge1xuICAgICAgdmFyIHIgPSBlW2FdO1xuICAgICAgaWYgKHIpIHJldHVybiByLmNhbGwoZSk7XG4gICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBlLm5leHQpIHJldHVybiBlO1xuICAgICAgaWYgKCFpc05hTihlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIG8gPSAtMSxcbiAgICAgICAgICBpID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIGZvciAoOyArK28gPCBlLmxlbmd0aDspIGlmIChuLmNhbGwoZSwgbykpIHJldHVybiBuZXh0LnZhbHVlID0gZVtvXSwgbmV4dC5kb25lID0gITEsIG5leHQ7XG4gICAgICAgICAgICByZXR1cm4gbmV4dC52YWx1ZSA9IHQsIG5leHQuZG9uZSA9ICEwLCBuZXh0O1xuICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBpLm5leHQgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKF90eXBlb2YoZSkgKyBcIiBpcyBub3QgaXRlcmFibGVcIik7XG4gIH1cbiAgcmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBvKGcsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICBjb25maWd1cmFibGU6ICEwXG4gIH0pLCBvKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb24sXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHUsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIiksIGUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uICh0KSB7XG4gICAgdmFyIGUgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHQgJiYgdC5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gISFlICYmIChlID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIgPT09IChlLmRpc3BsYXlOYW1lIHx8IGUubmFtZSkpO1xuICB9LCBlLm1hcmsgPSBmdW5jdGlvbiAodCkge1xuICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YodCwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpIDogKHQuX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGRlZmluZSh0LCB1LCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpKSwgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGcpLCB0O1xuICB9LCBlLmF3cmFwID0gZnVuY3Rpb24gKHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogdFxuICAgIH07XG4gIH0sIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSksIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZS5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvciwgZS5hc3luYyA9IGZ1bmN0aW9uICh0LCByLCBuLCBvLCBpKSB7XG4gICAgdm9pZCAwID09PSBpICYmIChpID0gUHJvbWlzZSk7XG4gICAgdmFyIGEgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKHQsIHIsIG4sIG8pLCBpKTtcbiAgICByZXR1cm4gZS5pc0dlbmVyYXRvckZ1bmN0aW9uKHIpID8gYSA6IGEubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHQpIHtcbiAgICAgIHJldHVybiB0LmRvbmUgPyB0LnZhbHVlIDogYS5uZXh0KCk7XG4gICAgfSk7XG4gIH0sIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhnKSwgZGVmaW5lKGcsIHUsIFwiR2VuZXJhdG9yXCIpLCBkZWZpbmUoZywgYSwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZGVmaW5lKGcsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KSwgZS5rZXlzID0gZnVuY3Rpb24gKHQpIHtcbiAgICB2YXIgZSA9IE9iamVjdCh0KSxcbiAgICAgIHIgPSBbXTtcbiAgICBmb3IgKHZhciBuIGluIGUpIHIucHVzaChuKTtcbiAgICByZXR1cm4gci5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBmb3IgKDsgci5sZW5ndGg7KSB7XG4gICAgICAgIHZhciB0ID0gci5wb3AoKTtcbiAgICAgICAgaWYgKHQgaW4gZSkgcmV0dXJuIG5leHQudmFsdWUgPSB0LCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICB9O1xuICB9LCBlLnZhbHVlcyA9IHZhbHVlcywgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KGUpIHtcbiAgICAgIGlmICh0aGlzLnByZXYgPSAwLCB0aGlzLm5leHQgPSAwLCB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLmFyZyA9IHQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhZSkgZm9yICh2YXIgciBpbiB0aGlzKSBcInRcIiA9PT0gci5jaGFyQXQoMCkgJiYgbi5jYWxsKHRoaXMsIHIpICYmICFpc05hTigrci5zbGljZSgxKSkgJiYgKHRoaXNbcl0gPSB0KTtcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLmRvbmUgPSAhMDtcbiAgICAgIHZhciB0ID0gdGhpcy50cnlFbnRyaWVzWzBdLmNvbXBsZXRpb247XG4gICAgICBpZiAoXCJ0aHJvd1wiID09PSB0LnR5cGUpIHRocm93IHQuYXJnO1xuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihlKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB0aHJvdyBlO1xuICAgICAgdmFyIHIgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKG4sIG8pIHtcbiAgICAgICAgcmV0dXJuIGEudHlwZSA9IFwidGhyb3dcIiwgYS5hcmcgPSBlLCByLm5leHQgPSBuLCBvICYmIChyLm1ldGhvZCA9IFwibmV4dFwiLCByLmFyZyA9IHQpLCAhIW87XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBvID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IG8gPj0gMDsgLS1vKSB7XG4gICAgICAgIHZhciBpID0gdGhpcy50cnlFbnRyaWVzW29dLFxuICAgICAgICAgIGEgPSBpLmNvbXBsZXRpb247XG4gICAgICAgIGlmIChcInJvb3RcIiA9PT0gaS50cnlMb2MpIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIGlmIChpLnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgYyA9IG4uY2FsbChpLCBcImNhdGNoTG9jXCIpLFxuICAgICAgICAgICAgdSA9IG4uY2FsbChpLCBcImZpbmFsbHlMb2NcIik7XG4gICAgICAgICAgaWYgKGMgJiYgdSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoaS5jYXRjaExvYywgITApO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShpLmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoaS5jYXRjaExvYywgITApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXUpIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShpLmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodCwgZSkge1xuICAgICAgZm9yICh2YXIgciA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyByID49IDA7IC0tcikge1xuICAgICAgICB2YXIgbyA9IHRoaXMudHJ5RW50cmllc1tyXTtcbiAgICAgICAgaWYgKG8udHJ5TG9jIDw9IHRoaXMucHJldiAmJiBuLmNhbGwobywgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IG8uZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBpID0gbztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaSAmJiAoXCJicmVha1wiID09PSB0IHx8IFwiY29udGludWVcIiA9PT0gdCkgJiYgaS50cnlMb2MgPD0gZSAmJiBlIDw9IGkuZmluYWxseUxvYyAmJiAoaSA9IG51bGwpO1xuICAgICAgdmFyIGEgPSBpID8gaS5jb21wbGV0aW9uIDoge307XG4gICAgICByZXR1cm4gYS50eXBlID0gdCwgYS5hcmcgPSBlLCBpID8gKHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMubmV4dCA9IGkuZmluYWxseUxvYywgeSkgOiB0aGlzLmNvbXBsZXRlKGEpO1xuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKHQsIGUpIHtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHQudHlwZSkgdGhyb3cgdC5hcmc7XG4gICAgICByZXR1cm4gXCJicmVha1wiID09PSB0LnR5cGUgfHwgXCJjb250aW51ZVwiID09PSB0LnR5cGUgPyB0aGlzLm5leHQgPSB0LmFyZyA6IFwicmV0dXJuXCIgPT09IHQudHlwZSA/ICh0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHQuYXJnLCB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCIsIHRoaXMubmV4dCA9IFwiZW5kXCIpIDogXCJub3JtYWxcIiA9PT0gdC50eXBlICYmIGUgJiYgKHRoaXMubmV4dCA9IGUpLCB5O1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiBmaW5pc2godCkge1xuICAgICAgZm9yICh2YXIgZSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBlID49IDA7IC0tZSkge1xuICAgICAgICB2YXIgciA9IHRoaXMudHJ5RW50cmllc1tlXTtcbiAgICAgICAgaWYgKHIuZmluYWxseUxvYyA9PT0gdCkgcmV0dXJuIHRoaXMuY29tcGxldGUoci5jb21wbGV0aW9uLCByLmFmdGVyTG9jKSwgcmVzZXRUcnlFbnRyeShyKSwgeTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHQpIHtcbiAgICAgIGZvciAodmFyIGUgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgZSA+PSAwOyAtLWUpIHtcbiAgICAgICAgdmFyIHIgPSB0aGlzLnRyeUVudHJpZXNbZV07XG4gICAgICAgIGlmIChyLnRyeUxvYyA9PT0gdCkge1xuICAgICAgICAgIHZhciBuID0gci5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChcInRocm93XCIgPT09IG4udHlwZSkge1xuICAgICAgICAgICAgdmFyIG8gPSBuLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkocik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGUsIHIsIG4pIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGUpLFxuICAgICAgICByZXN1bHROYW1lOiByLFxuICAgICAgICBuZXh0TG9jOiBuXG4gICAgICB9LCBcIm5leHRcIiA9PT0gdGhpcy5tZXRob2QgJiYgKHRoaXMuYXJnID0gdCksIHk7XG4gICAgfVxuICB9LCBlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX3R5cGVvZihvKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvO1xuICB9IDogZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbztcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzKSwgX3R5cGVvZihvKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsIi8vIFRPRE8oQmFiZWwgOCk6IFJlbW92ZSB0aGlzIGZpbGUuXG5cbnZhciBydW50aW1lID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvcmVnZW5lcmF0b3JSdW50aW1lXCIpKCk7XG5tb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG5cbi8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9ibG9iL21haW4vcGFja2FnZXMvcnVudGltZS9ydW50aW1lLmpzI0w3MzY9XG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsInZhciBleHBvcnRzID0ge307IWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5TbGltU2VsZWN0PXQoKTplLlNsaW1TZWxlY3Q9dCgpfSh3aW5kb3csZnVuY3Rpb24oKXtyZXR1cm4gbj17fSxzLm09aT1bZnVuY3Rpb24oZSx0LGkpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSx0KXt0PXR8fHtidWJibGVzOiExLGNhbmNlbGFibGU6ITEsZGV0YWlsOnZvaWQgMH07dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtyZXR1cm4gaS5pbml0Q3VzdG9tRXZlbnQoZSx0LmJ1YmJsZXMsdC5jYW5jZWxhYmxlLHQuZGV0YWlsKSxpfXQuX19lc01vZHVsZT0hMCx0LmtlYmFiQ2FzZT10LmhpZ2hsaWdodD10LmlzVmFsdWVJbkFycmF5T2ZPYmplY3RzPXQuZGVib3VuY2U9dC5wdXRDb250ZW50PXQuZW5zdXJlRWxlbWVudEluVmlldz10Lmhhc0NsYXNzSW5UcmVlPXZvaWQgMCx0Lmhhc0NsYXNzSW5UcmVlPWZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe3JldHVybiB0JiZlJiZlLmNsYXNzTGlzdCYmZS5jbGFzc0xpc3QuY29udGFpbnModCk/ZTpudWxsfXJldHVybiBuKGUsdCl8fGZ1bmN0aW9uIGUodCxpKXtyZXR1cm4gdCYmdCE9PWRvY3VtZW50P24odCxpKT90OmUodC5wYXJlbnROb2RlLGkpOm51bGx9KGUsdCl9LHQuZW5zdXJlRWxlbWVudEluVmlldz1mdW5jdGlvbihlLHQpe3ZhciBpPWUuc2Nyb2xsVG9wK2Uub2Zmc2V0VG9wLG49aStlLmNsaWVudEhlaWdodCxzPXQub2Zmc2V0VG9wLHQ9cyt0LmNsaWVudEhlaWdodDtzPGk/ZS5zY3JvbGxUb3AtPWktczpuPHQmJihlLnNjcm9sbFRvcCs9dC1uKX0sdC5wdXRDb250ZW50PWZ1bmN0aW9uKGUsdCxpKXt2YXIgbj1lLm9mZnNldEhlaWdodCxzPWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksZT1pP3MudG9wOnMudG9wLW4sbj1pP3MuYm90dG9tOnMuYm90dG9tK247cmV0dXJuIGU8PTA/XCJiZWxvd1wiOm4+PXdpbmRvdy5pbm5lckhlaWdodD9cImFib3ZlXCI6aT90OlwiYmVsb3dcIn0sdC5kZWJvdW5jZT1mdW5jdGlvbihzLGEsbyl7dmFyIGw7cmV0dXJuIHZvaWQgMD09PWEmJihhPTEwMCksdm9pZCAwPT09byYmKG89ITEpLGZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLHQ9MDt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKWVbdF09YXJndW1lbnRzW3RdO3ZhciBpPXNlbGYsbj1vJiYhbDtjbGVhclRpbWVvdXQobCksbD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bD1udWxsLG98fHMuYXBwbHkoaSxlKX0sYSksbiYmcy5hcHBseShpLGUpfX0sdC5pc1ZhbHVlSW5BcnJheU9mT2JqZWN0cz1mdW5jdGlvbihlLHQsaSl7aWYoIUFycmF5LmlzQXJyYXkoZSkpcmV0dXJuIGVbdF09PT1pO2Zvcih2YXIgbj0wLHM9ZTtuPHMubGVuZ3RoO24rKyl7dmFyIGE9c1tuXTtpZihhJiZhW3RdJiZhW3RdPT09aSlyZXR1cm4hMH1yZXR1cm4hMX0sdC5oaWdobGlnaHQ9ZnVuY3Rpb24oZSx0LGkpe3ZhciBuPWUscz1uZXcgUmVnRXhwKFwiKFwiK3QudHJpbSgpK1wiKSg/IVtePF0qPltePD5dKjwvKVwiLFwiaVwiKTtpZighZS5tYXRjaChzKSlyZXR1cm4gZTt2YXIgYT1lLm1hdGNoKHMpLmluZGV4LHQ9YStlLm1hdGNoKHMpWzBdLnRvU3RyaW5nKCkubGVuZ3RoLHQ9ZS5zdWJzdHJpbmcoYSx0KTtyZXR1cm4gbj1uLnJlcGxhY2UocywnPG1hcmsgY2xhc3M9XCInLmNvbmNhdChpLCdcIj4nKS5jb25jYXQodCxcIjwvbWFyaz5cIikpfSx0LmtlYmFiQ2FzZT1mdW5jdGlvbihlKXt2YXIgdD1lLnJlcGxhY2UoL1tBLVpcXHUwMEMwLVxcdTAwRDZcXHUwMEQ4LVxcdTAwREVdL2csZnVuY3Rpb24oZSl7cmV0dXJuXCItXCIrZS50b0xvd2VyQ2FzZSgpfSk7cmV0dXJuIGVbMF09PT1lWzBdLnRvVXBwZXJDYXNlKCk/dC5zdWJzdHJpbmcoMSk6dH0sXCJmdW5jdGlvblwiIT10eXBlb2YodD13aW5kb3cpLkN1c3RvbUV2ZW50JiYobi5wcm90b3R5cGU9dC5FdmVudC5wcm90b3R5cGUsdC5DdXN0b21FdmVudD1uKX0sZnVuY3Rpb24oZSx0LGkpe1widXNlIHN0cmljdFwiO3QuX19lc01vZHVsZT0hMCx0LnZhbGlkYXRlT3B0aW9uPXQudmFsaWRhdGVEYXRhPXQuRGF0YT12b2lkIDA7dmFyIG49KHMucHJvdG90eXBlLm5ld09wdGlvbj1mdW5jdGlvbihlKXtyZXR1cm57aWQ6ZS5pZHx8U3RyaW5nKE1hdGguZmxvb3IoMWU4Kk1hdGgucmFuZG9tKCkpKSx2YWx1ZTplLnZhbHVlfHxcIlwiLHRleHQ6ZS50ZXh0fHxcIlwiLGlubmVySFRNTDplLmlubmVySFRNTHx8XCJcIixzZWxlY3RlZDplLnNlbGVjdGVkfHwhMSxkaXNwbGF5OnZvaWQgMD09PWUuZGlzcGxheXx8ZS5kaXNwbGF5LGRpc2FibGVkOmUuZGlzYWJsZWR8fCExLHBsYWNlaG9sZGVyOmUucGxhY2Vob2xkZXJ8fCExLGNsYXNzOmUuY2xhc3N8fHZvaWQgMCxkYXRhOmUuZGF0YXx8e30sbWFuZGF0b3J5OmUubWFuZGF0b3J5fHwhMX19LHMucHJvdG90eXBlLmFkZD1mdW5jdGlvbihlKXt0aGlzLmRhdGEucHVzaCh7aWQ6U3RyaW5nKE1hdGguZmxvb3IoMWU4Kk1hdGgucmFuZG9tKCkpKSx2YWx1ZTplLnZhbHVlLHRleHQ6ZS50ZXh0LGlubmVySFRNTDpcIlwiLHNlbGVjdGVkOiExLGRpc3BsYXk6ITAsZGlzYWJsZWQ6ITEscGxhY2Vob2xkZXI6ITEsY2xhc3M6dm9pZCAwLG1hbmRhdG9yeTplLm1hbmRhdG9yeSxkYXRhOnt9fSl9LHMucHJvdG90eXBlLnBhcnNlU2VsZWN0RGF0YT1mdW5jdGlvbigpe3RoaXMuZGF0YT1bXTtmb3IodmFyIGU9MCx0PXRoaXMubWFpbi5zZWxlY3QuZWxlbWVudC5jaGlsZE5vZGVzO2U8dC5sZW5ndGg7ZSsrKXt2YXIgaT10W2VdO2lmKFwiT1BUR1JPVVBcIj09PWkubm9kZU5hbWUpe2Zvcih2YXIgbj17bGFiZWw6aS5sYWJlbCxvcHRpb25zOltdfSxzPTAsYT1pLmNoaWxkTm9kZXM7czxhLmxlbmd0aDtzKyspe3ZhciBvLGw9YVtzXTtcIk9QVElPTlwiPT09bC5ub2RlTmFtZSYmKG89dGhpcy5wdWxsT3B0aW9uRGF0YShsKSxuLm9wdGlvbnMucHVzaChvKSxvLnBsYWNlaG9sZGVyJiZcIlwiIT09by50ZXh0LnRyaW0oKSYmKHRoaXMubWFpbi5jb25maWcucGxhY2Vob2xkZXJUZXh0PW8udGV4dCkpfXRoaXMuZGF0YS5wdXNoKG4pfWVsc2VcIk9QVElPTlwiPT09aS5ub2RlTmFtZSYmKG89dGhpcy5wdWxsT3B0aW9uRGF0YShpKSx0aGlzLmRhdGEucHVzaChvKSxvLnBsYWNlaG9sZGVyJiZcIlwiIT09by50ZXh0LnRyaW0oKSYmKHRoaXMubWFpbi5jb25maWcucGxhY2Vob2xkZXJUZXh0PW8udGV4dCkpfX0scy5wcm90b3R5cGUucHVsbE9wdGlvbkRhdGE9ZnVuY3Rpb24oZSl7cmV0dXJue2lkOiEhZS5kYXRhc2V0JiZlLmRhdGFzZXQuaWR8fFN0cmluZyhNYXRoLmZsb29yKDFlOCpNYXRoLnJhbmRvbSgpKSksdmFsdWU6ZS52YWx1ZSx0ZXh0OmUudGV4dCxpbm5lckhUTUw6ZS5pbm5lckhUTUwsc2VsZWN0ZWQ6ZS5zZWxlY3RlZCxkaXNhYmxlZDplLmRpc2FibGVkLHBsYWNlaG9sZGVyOlwidHJ1ZVwiPT09ZS5kYXRhc2V0LnBsYWNlaG9sZGVyLGNsYXNzOmUuY2xhc3NOYW1lLHN0eWxlOmUuc3R5bGUuY3NzVGV4dCxkYXRhOmUuZGF0YXNldCxtYW5kYXRvcnk6ISFlLmRhdGFzZXQmJlwidHJ1ZVwiPT09ZS5kYXRhc2V0Lm1hbmRhdG9yeX19LHMucHJvdG90eXBlLnNldFNlbGVjdGVkRnJvbVNlbGVjdD1mdW5jdGlvbigpe2lmKHRoaXMubWFpbi5jb25maWcuaXNNdWx0aXBsZSl7Zm9yKHZhciBlPVtdLHQ9MCxpPXRoaXMubWFpbi5zZWxlY3QuZWxlbWVudC5vcHRpb25zO3Q8aS5sZW5ndGg7dCsrKXt2YXIgbj1pW3RdOyFuLnNlbGVjdGVkfHwobj10aGlzLmdldE9iamVjdEZyb21EYXRhKG4udmFsdWUsXCJ2YWx1ZVwiKSkmJm4uaWQmJmUucHVzaChuLmlkKX10aGlzLnNldFNlbGVjdGVkKGUsXCJpZFwiKX1lbHNle3ZhciBzPXRoaXMubWFpbi5zZWxlY3QuZWxlbWVudDstMSE9PXMuc2VsZWN0ZWRJbmRleCYmKHM9cy5vcHRpb25zW3Muc2VsZWN0ZWRJbmRleF0udmFsdWUsdGhpcy5zZXRTZWxlY3RlZChzLFwidmFsdWVcIikpfX0scy5wcm90b3R5cGUuc2V0U2VsZWN0ZWQ9ZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT10JiYodD1cImlkXCIpO2Zvcih2YXIgaT0wLG49dGhpcy5kYXRhO2k8bi5sZW5ndGg7aSsrKXt2YXIgcz1uW2ldO2lmKHMuaGFzT3duUHJvcGVydHkoXCJsYWJlbFwiKSl7aWYocy5oYXNPd25Qcm9wZXJ0eShcIm9wdGlvbnNcIikpe3ZhciBhPXMub3B0aW9ucztpZihhKWZvcih2YXIgbz0wLGw9YTtvPGwubGVuZ3RoO28rKyl7dmFyIHI9bFtvXTtyLnBsYWNlaG9sZGVyfHwoci5zZWxlY3RlZD10aGlzLnNob3VsZEJlU2VsZWN0ZWQocixlLHQpKX19fWVsc2Ugcy5zZWxlY3RlZD10aGlzLnNob3VsZEJlU2VsZWN0ZWQocyxlLHQpfX0scy5wcm90b3R5cGUuc2hvdWxkQmVTZWxlY3RlZD1mdW5jdGlvbihlLHQsaSl7aWYodm9pZCAwPT09aSYmKGk9XCJpZFwiKSxBcnJheS5pc0FycmF5KHQpKWZvcih2YXIgbj0wLHM9dDtuPHMubGVuZ3RoO24rKyl7dmFyIGE9c1tuXTtpZihpIGluIGUmJlN0cmluZyhlW2ldKT09PVN0cmluZyhhKSlyZXR1cm4hMH1lbHNlIGlmKGkgaW4gZSYmU3RyaW5nKGVbaV0pPT09U3RyaW5nKHQpKXJldHVybiEwO3JldHVybiExfSxzLnByb3RvdHlwZS5nZXRTZWxlY3RlZD1mdW5jdGlvbigpe2Zvcih2YXIgZT17dGV4dDpcIlwiLHBsYWNlaG9sZGVyOnRoaXMubWFpbi5jb25maWcucGxhY2Vob2xkZXJUZXh0fSx0PVtdLGk9MCxuPXRoaXMuZGF0YTtpPG4ubGVuZ3RoO2krKyl7dmFyIHM9bltpXTtpZihzLmhhc093blByb3BlcnR5KFwibGFiZWxcIikpe2lmKHMuaGFzT3duUHJvcGVydHkoXCJvcHRpb25zXCIpKXt2YXIgYT1zLm9wdGlvbnM7aWYoYSlmb3IodmFyIG89MCxsPWE7bzxsLmxlbmd0aDtvKyspe3ZhciByPWxbb107ci5zZWxlY3RlZCYmKHRoaXMubWFpbi5jb25maWcuaXNNdWx0aXBsZT90LnB1c2gocik6ZT1yKX19fWVsc2Ugcy5zZWxlY3RlZCYmKHRoaXMubWFpbi5jb25maWcuaXNNdWx0aXBsZT90LnB1c2gocyk6ZT1zKX1yZXR1cm4gdGhpcy5tYWluLmNvbmZpZy5pc011bHRpcGxlP3Q6ZX0scy5wcm90b3R5cGUuYWRkVG9TZWxlY3RlZD1mdW5jdGlvbihlLHQpe2lmKHZvaWQgMD09PXQmJih0PVwiaWRcIiksdGhpcy5tYWluLmNvbmZpZy5pc011bHRpcGxlKXt2YXIgaT1bXSxuPXRoaXMuZ2V0U2VsZWN0ZWQoKTtpZihBcnJheS5pc0FycmF5KG4pKWZvcih2YXIgcz0wLGE9bjtzPGEubGVuZ3RoO3MrKyl7dmFyIG89YVtzXTtpLnB1c2gob1t0XSl9aS5wdXNoKGUpLHRoaXMuc2V0U2VsZWN0ZWQoaSx0KX19LHMucHJvdG90eXBlLnJlbW92ZUZyb21TZWxlY3RlZD1mdW5jdGlvbihlLHQpe2lmKHZvaWQgMD09PXQmJih0PVwiaWRcIiksdGhpcy5tYWluLmNvbmZpZy5pc011bHRpcGxlKXtmb3IodmFyIGk9W10sbj0wLHM9dGhpcy5nZXRTZWxlY3RlZCgpO248cy5sZW5ndGg7bisrKXt2YXIgYT1zW25dO1N0cmluZyhhW3RdKSE9PVN0cmluZyhlKSYmaS5wdXNoKGFbdF0pfXRoaXMuc2V0U2VsZWN0ZWQoaSx0KX19LHMucHJvdG90eXBlLm9uRGF0YUNoYW5nZT1mdW5jdGlvbigpe3RoaXMubWFpbi5vbkNoYW5nZSYmdGhpcy5pc09uQ2hhbmdlRW5hYmxlZCYmdGhpcy5tYWluLm9uQ2hhbmdlKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRTZWxlY3RlZCgpKSkpfSxzLnByb3RvdHlwZS5nZXRPYmplY3RGcm9tRGF0YT1mdW5jdGlvbihlLHQpe3ZvaWQgMD09PXQmJih0PVwiaWRcIik7Zm9yKHZhciBpPTAsbj10aGlzLmRhdGE7aTxuLmxlbmd0aDtpKyspe3ZhciBzPW5baV07aWYodCBpbiBzJiZTdHJpbmcoc1t0XSk9PT1TdHJpbmcoZSkpcmV0dXJuIHM7aWYocy5oYXNPd25Qcm9wZXJ0eShcIm9wdGlvbnNcIikpaWYocy5vcHRpb25zKWZvcih2YXIgYT0wLG89cy5vcHRpb25zO2E8by5sZW5ndGg7YSsrKXt2YXIgbD1vW2FdO2lmKFN0cmluZyhsW3RdKT09PVN0cmluZyhlKSlyZXR1cm4gbH19cmV0dXJuIG51bGx9LHMucHJvdG90eXBlLnNlYXJjaD1mdW5jdGlvbihuKXt2YXIgcyxlO1wiXCIhPT0odGhpcy5zZWFyY2hWYWx1ZT1uKS50cmltKCk/KHM9dGhpcy5tYWluLmNvbmZpZy5zZWFyY2hGaWx0ZXIsZT10aGlzLmRhdGEuc2xpY2UoMCksbj1uLnRyaW0oKSxlPWUubWFwKGZ1bmN0aW9uKGUpe2lmKGUuaGFzT3duUHJvcGVydHkoXCJvcHRpb25zXCIpKXt2YXIgdD1lLGk9W107aWYoMCE9PShpPXQub3B0aW9ucz90Lm9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBzKGUsbil9KTppKS5sZW5ndGgpe3Q9T2JqZWN0LmFzc2lnbih7fSx0KTtyZXR1cm4gdC5vcHRpb25zPWksdH19aWYoZS5oYXNPd25Qcm9wZXJ0eShcInRleHRcIikmJnMoZSxuKSlyZXR1cm4gZTtyZXR1cm4gbnVsbH0pLHRoaXMuZmlsdGVyZWQ9ZS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGV9KSk6dGhpcy5maWx0ZXJlZD1udWxsfSxzKTtmdW5jdGlvbiBzKGUpe3RoaXMuY29udGVudE9wZW49ITEsdGhpcy5jb250ZW50UG9zaXRpb249XCJiZWxvd1wiLHRoaXMuaXNPbkNoYW5nZUVuYWJsZWQ9ITAsdGhpcy5tYWluPWUubWFpbix0aGlzLnNlYXJjaFZhbHVlPVwiXCIsdGhpcy5kYXRhPVtdLHRoaXMuZmlsdGVyZWQ9bnVsbCx0aGlzLnBhcnNlU2VsZWN0RGF0YSgpLHRoaXMuc2V0U2VsZWN0ZWRGcm9tU2VsZWN0KCl9ZnVuY3Rpb24gcihlKXtyZXR1cm4gdm9pZCAwIT09ZS50ZXh0fHwoY29uc29sZS5lcnJvcihcIkRhdGEgb2JqZWN0IG9wdGlvbiBtdXN0IGhhdmUgYXQgbGVhc3QgaGF2ZSBhIHRleHQgdmFsdWUuIENoZWNrIG9iamVjdDogXCIrSlNPTi5zdHJpbmdpZnkoZSkpLCExKX10LkRhdGE9bix0LnZhbGlkYXRlRGF0YT1mdW5jdGlvbihlKXtpZighZSlyZXR1cm4gY29uc29sZS5lcnJvcihcIkRhdGEgbXVzdCBiZSBhbiBhcnJheSBvZiBvYmplY3RzXCIpLCExO2Zvcih2YXIgdD0wLGk9MCxuPWU7aTxuLmxlbmd0aDtpKyspe3ZhciBzPW5baV07aWYocy5oYXNPd25Qcm9wZXJ0eShcImxhYmVsXCIpKXtpZihzLmhhc093blByb3BlcnR5KFwib3B0aW9uc1wiKSl7dmFyIGE9cy5vcHRpb25zO2lmKGEpZm9yKHZhciBvPTAsbD1hO288bC5sZW5ndGg7bysrKXIobFtvXSl8fHQrK319ZWxzZSByKHMpfHx0Kyt9cmV0dXJuIDA9PT10fSx0LnZhbGlkYXRlT3B0aW9uPXJ9LGZ1bmN0aW9uKGUsdCxpKXtcInVzZSBzdHJpY3RcIjt0Ll9fZXNNb2R1bGU9ITA7dmFyIG49aSgzKSxzPWkoNCksYT1pKDUpLHI9aSgxKSxvPWkoMCksaT0obC5wcm90b3R5cGUudmFsaWRhdGU9ZnVuY3Rpb24oZSl7ZT1cInN0cmluZ1wiPT10eXBlb2YgZS5zZWxlY3Q/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlLnNlbGVjdCk6ZS5zZWxlY3Q7aWYoIWUpdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgc2VsZWN0IGVsZW1lbnRcIik7aWYoXCJTRUxFQ1RcIiE9PWUudGFnTmFtZSl0aHJvdyBuZXcgRXJyb3IoXCJFbGVtZW50IGlzbnQgb2YgdHlwZSBzZWxlY3RcIik7cmV0dXJuIGV9LGwucHJvdG90eXBlLnNlbGVjdGVkPWZ1bmN0aW9uKCl7aWYodGhpcy5jb25maWcuaXNNdWx0aXBsZSl7Zm9yKHZhciBlPVtdLHQ9MCxpPXM9dGhpcy5kYXRhLmdldFNlbGVjdGVkKCk7dDxpLmxlbmd0aDt0Kyspe3ZhciBuPWlbdF07ZS5wdXNoKG4udmFsdWUpfXJldHVybiBlfXZhciBzO3JldHVybihzPXRoaXMuZGF0YS5nZXRTZWxlY3RlZCgpKT9zLnZhbHVlOlwiXCJ9LGwucHJvdG90eXBlLnNldD1mdW5jdGlvbihlLHQsaSxuKXt2b2lkIDA9PT10JiYodD1cInZhbHVlXCIpLHZvaWQgMD09PWkmJihpPSEwKSx2b2lkIDA9PT1uJiYobj0hMCksdGhpcy5jb25maWcuaXNNdWx0aXBsZSYmIUFycmF5LmlzQXJyYXkoZSk/dGhpcy5kYXRhLmFkZFRvU2VsZWN0ZWQoZSx0KTp0aGlzLmRhdGEuc2V0U2VsZWN0ZWQoZSx0KSx0aGlzLnNlbGVjdC5zZXRWYWx1ZSgpLHRoaXMuZGF0YS5vbkRhdGFDaGFuZ2UoKSx0aGlzLnJlbmRlcigpLChpPXRoaXMuY29uZmlnLmhpZGVTZWxlY3RlZE9wdGlvbiYmdGhpcy5jb25maWcuaXNNdWx0aXBsZSYmdGhpcy5kYXRhLmdldFNlbGVjdGVkKCkubGVuZ3RoPT09dGhpcy5kYXRhLmRhdGEubGVuZ3RoPyEwOmkpJiZ0aGlzLmNsb3NlKCl9LGwucHJvdG90eXBlLnNldFNlbGVjdGVkPWZ1bmN0aW9uKGUsdCxpLG4pe3RoaXMuc2V0KGUsdD12b2lkIDA9PT10P1widmFsdWVcIjp0LGk9dm9pZCAwPT09aT8hMDppLG49dm9pZCAwPT09bj8hMDpuKX0sbC5wcm90b3R5cGUuc2V0RGF0YT1mdW5jdGlvbihlKXtpZigoMCxyLnZhbGlkYXRlRGF0YSkoZSkpe2Zvcih2YXIgdD1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGUpKSxpPXRoaXMuZGF0YS5nZXRTZWxlY3RlZCgpLG49MDtuPHQubGVuZ3RoO24rKyl0W25dLnZhbHVlfHx0W25dLnBsYWNlaG9sZGVyfHwodFtuXS52YWx1ZT10W25dLnRleHQpO2lmKHRoaXMuY29uZmlnLmlzQWpheCYmaSlpZih0aGlzLmNvbmZpZy5pc011bHRpcGxlKWZvcih2YXIgcz0wLGE9aS5yZXZlcnNlKCk7czxhLmxlbmd0aDtzKyspe3ZhciBvPWFbc107dC51bnNoaWZ0KG8pfWVsc2V7dC51bnNoaWZ0KGkpO2ZvcihuPTA7bjx0Lmxlbmd0aDtuKyspdFtuXS5wbGFjZWhvbGRlcnx8dFtuXS52YWx1ZSE9PWkudmFsdWV8fHRbbl0udGV4dCE9PWkudGV4dHx8dC5zcGxpY2UobiwxKTtmb3IodmFyIGw9ITEsbj0wO248dC5sZW5ndGg7bisrKXRbbl0ucGxhY2Vob2xkZXImJihsPSEwKTtsfHx0LnVuc2hpZnQoe3RleHQ6XCJcIixwbGFjZWhvbGRlcjohMH0pfXRoaXMuc2VsZWN0LmNyZWF0ZSh0KSx0aGlzLmRhdGEucGFyc2VTZWxlY3REYXRhKCksdGhpcy5kYXRhLnNldFNlbGVjdGVkRnJvbVNlbGVjdCgpfWVsc2UgY29uc29sZS5lcnJvcihcIlZhbGlkYXRpb24gcHJvYmxlbSBvbjogI1wiK3RoaXMuc2VsZWN0LmVsZW1lbnQuaWQpfSxsLnByb3RvdHlwZS5hZGREYXRhPWZ1bmN0aW9uKGUpeygwLHIudmFsaWRhdGVEYXRhKShbZV0pPyh0aGlzLmRhdGEuYWRkKHRoaXMuZGF0YS5uZXdPcHRpb24oZSkpLHRoaXMuc2VsZWN0LmNyZWF0ZSh0aGlzLmRhdGEuZGF0YSksdGhpcy5kYXRhLnBhcnNlU2VsZWN0RGF0YSgpLHRoaXMuZGF0YS5zZXRTZWxlY3RlZEZyb21TZWxlY3QoKSx0aGlzLnJlbmRlcigpKTpjb25zb2xlLmVycm9yKFwiVmFsaWRhdGlvbiBwcm9ibGVtIG9uOiAjXCIrdGhpcy5zZWxlY3QuZWxlbWVudC5pZCl9LGwucHJvdG90eXBlLm9wZW49ZnVuY3Rpb24oKXt2YXIgZSx0PXRoaXM7dGhpcy5jb25maWcuaXNFbmFibGVkJiYodGhpcy5kYXRhLmNvbnRlbnRPcGVufHx0aGlzLmNvbmZpZy5oaWRlU2VsZWN0ZWRPcHRpb24mJnRoaXMuY29uZmlnLmlzTXVsdGlwbGUmJnRoaXMuZGF0YS5nZXRTZWxlY3RlZCgpLmxlbmd0aD09PXRoaXMuZGF0YS5kYXRhLmxlbmd0aHx8KHRoaXMuYmVmb3JlT3BlbiYmdGhpcy5iZWZvcmVPcGVuKCksdGhpcy5jb25maWcuaXNNdWx0aXBsZSYmdGhpcy5zbGltLm11bHRpU2VsZWN0ZWQ/dGhpcy5zbGltLm11bHRpU2VsZWN0ZWQucGx1cy5jbGFzc0xpc3QuYWRkKFwic3MtY3Jvc3NcIik6dGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkJiYodGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkLmFycm93SWNvbi5hcnJvdy5jbGFzc0xpc3QucmVtb3ZlKFwiYXJyb3ctZG93blwiKSx0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuYXJyb3dJY29uLmFycm93LmNsYXNzTGlzdC5hZGQoXCJhcnJvdy11cFwiKSksdGhpcy5zbGltW3RoaXMuY29uZmlnLmlzTXVsdGlwbGU/XCJtdWx0aVNlbGVjdGVkXCI6XCJzaW5nbGVTZWxlY3RlZFwiXS5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFib3ZlXCI9PT10aGlzLmRhdGEuY29udGVudFBvc2l0aW9uP3RoaXMuY29uZmlnLm9wZW5BYm92ZTp0aGlzLmNvbmZpZy5vcGVuQmVsb3cpLHRoaXMuY29uZmlnLmFkZFRvQm9keSYmKGU9dGhpcy5zbGltLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSx0aGlzLnNsaW0uY29udGVudC5zdHlsZS50b3A9ZS50b3ArZS5oZWlnaHQrd2luZG93LnNjcm9sbFkrXCJweFwiLHRoaXMuc2xpbS5jb250ZW50LnN0eWxlLmxlZnQ9ZS5sZWZ0K3dpbmRvdy5zY3JvbGxYK1wicHhcIix0aGlzLnNsaW0uY29udGVudC5zdHlsZS53aWR0aD1lLndpZHRoK1wicHhcIiksdGhpcy5zbGltLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbmZpZy5vcGVuKSxcInVwXCI9PT10aGlzLmNvbmZpZy5zaG93Q29udGVudC50b0xvd2VyQ2FzZSgpfHxcImRvd25cIiE9PXRoaXMuY29uZmlnLnNob3dDb250ZW50LnRvTG93ZXJDYXNlKCkmJlwiYWJvdmVcIj09PSgwLG8ucHV0Q29udGVudCkodGhpcy5zbGltLmNvbnRlbnQsdGhpcy5kYXRhLmNvbnRlbnRQb3NpdGlvbix0aGlzLmRhdGEuY29udGVudE9wZW4pP3RoaXMubW92ZUNvbnRlbnRBYm92ZSgpOnRoaXMubW92ZUNvbnRlbnRCZWxvdygpLHRoaXMuY29uZmlnLmlzTXVsdGlwbGV8fChlPXRoaXMuZGF0YS5nZXRTZWxlY3RlZCgpKSYmKGU9ZS5pZCwoZT10aGlzLnNsaW0ubGlzdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pZD1cIicrZSsnXCJdJykpJiYoMCxvLmVuc3VyZUVsZW1lbnRJblZpZXcpKHRoaXMuc2xpbS5saXN0LGUpKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5kYXRhLmNvbnRlbnRPcGVuPSEwLHQuY29uZmlnLnNlYXJjaEZvY3VzJiZ0LnNsaW0uc2VhcmNoLmlucHV0LmZvY3VzKCksdC5hZnRlck9wZW4mJnQuYWZ0ZXJPcGVuKCl9LHRoaXMuY29uZmlnLnRpbWVvdXREZWxheSkpKX0sbC5wcm90b3R5cGUuY2xvc2U9ZnVuY3Rpb24oKXt2YXIgZT10aGlzO3RoaXMuZGF0YS5jb250ZW50T3BlbiYmKHRoaXMuYmVmb3JlQ2xvc2UmJnRoaXMuYmVmb3JlQ2xvc2UoKSx0aGlzLmNvbmZpZy5pc011bHRpcGxlJiZ0aGlzLnNsaW0ubXVsdGlTZWxlY3RlZD8odGhpcy5zbGltLm11bHRpU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcub3BlbkFib3ZlKSx0aGlzLnNsaW0ubXVsdGlTZWxlY3RlZC5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNvbmZpZy5vcGVuQmVsb3cpLHRoaXMuc2xpbS5tdWx0aVNlbGVjdGVkLnBsdXMuY2xhc3NMaXN0LnJlbW92ZShcInNzLWNyb3NzXCIpKTp0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQmJih0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcub3BlbkFib3ZlKSx0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcub3BlbkJlbG93KSx0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuYXJyb3dJY29uLmFycm93LmNsYXNzTGlzdC5hZGQoXCJhcnJvdy1kb3duXCIpLHRoaXMuc2xpbS5zaW5nbGVTZWxlY3RlZC5hcnJvd0ljb24uYXJyb3cuY2xhc3NMaXN0LnJlbW92ZShcImFycm93LXVwXCIpKSx0aGlzLnNsaW0uY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uZmlnLm9wZW4pLHRoaXMuZGF0YS5jb250ZW50T3Blbj0hMSx0aGlzLnNlYXJjaChcIlwiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZS5zbGltLmNvbnRlbnQucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIiksZS5kYXRhLmNvbnRlbnRQb3NpdGlvbj1cImJlbG93XCIsZS5jb25maWcuaXNNdWx0aXBsZSYmZS5zbGltLm11bHRpU2VsZWN0ZWQ/KGUuc2xpbS5tdWx0aVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGUuY29uZmlnLm9wZW5BYm92ZSksZS5zbGltLm11bHRpU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoZS5jb25maWcub3BlbkJlbG93KSk6ZS5zbGltLnNpbmdsZVNlbGVjdGVkJiYoZS5zbGltLnNpbmdsZVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGUuY29uZmlnLm9wZW5BYm92ZSksZS5zbGltLnNpbmdsZVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGUuY29uZmlnLm9wZW5CZWxvdykpLGUuc2xpbS5zZWFyY2guaW5wdXQuYmx1cigpLGUuYWZ0ZXJDbG9zZSYmZS5hZnRlckNsb3NlKCl9LHRoaXMuY29uZmlnLnRpbWVvdXREZWxheSkpfSxsLnByb3RvdHlwZS5tb3ZlQ29udGVudEFib3ZlPWZ1bmN0aW9uKCl7dmFyIGU9MDt0aGlzLmNvbmZpZy5pc011bHRpcGxlJiZ0aGlzLnNsaW0ubXVsdGlTZWxlY3RlZD9lPXRoaXMuc2xpbS5tdWx0aVNlbGVjdGVkLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQ6dGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkJiYoZT10aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLm9mZnNldEhlaWdodCk7dmFyIHQ9ZSt0aGlzLnNsaW0uY29udGVudC5vZmZzZXRIZWlnaHQtMTt0aGlzLnNsaW0uY29udGVudC5zdHlsZS5tYXJnaW49XCItXCIrdCtcInB4IDAgMCAwXCIsdGhpcy5zbGltLmNvbnRlbnQuc3R5bGUuaGVpZ2h0PXQtZSsxK1wicHhcIix0aGlzLnNsaW0uY29udGVudC5zdHlsZS50cmFuc2Zvcm1PcmlnaW49XCJjZW50ZXIgYm90dG9tXCIsdGhpcy5kYXRhLmNvbnRlbnRQb3NpdGlvbj1cImFib3ZlXCIsdGhpcy5jb25maWcuaXNNdWx0aXBsZSYmdGhpcy5zbGltLm11bHRpU2VsZWN0ZWQ/KHRoaXMuc2xpbS5tdWx0aVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uZmlnLm9wZW5CZWxvdyksdGhpcy5zbGltLm11bHRpU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5jb25maWcub3BlbkFib3ZlKSk6dGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkJiYodGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uZmlnLm9wZW5CZWxvdyksdGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRoaXMuY29uZmlnLm9wZW5BYm92ZSkpfSxsLnByb3RvdHlwZS5tb3ZlQ29udGVudEJlbG93PWZ1bmN0aW9uKCl7dGhpcy5kYXRhLmNvbnRlbnRQb3NpdGlvbj1cImJlbG93XCIsdGhpcy5jb25maWcuaXNNdWx0aXBsZSYmdGhpcy5zbGltLm11bHRpU2VsZWN0ZWQ/KHRoaXMuc2xpbS5tdWx0aVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uZmlnLm9wZW5BYm92ZSksdGhpcy5zbGltLm11bHRpU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5jb25maWcub3BlbkJlbG93KSk6dGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkJiYodGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uZmlnLm9wZW5BYm92ZSksdGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRoaXMuY29uZmlnLm9wZW5CZWxvdykpfSxsLnByb3RvdHlwZS5lbmFibGU9ZnVuY3Rpb24oKXt0aGlzLmNvbmZpZy5pc0VuYWJsZWQ9ITAsdGhpcy5jb25maWcuaXNNdWx0aXBsZSYmdGhpcy5zbGltLm11bHRpU2VsZWN0ZWQ/dGhpcy5zbGltLm11bHRpU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcuZGlzYWJsZWQpOnRoaXMuc2xpbS5zaW5nbGVTZWxlY3RlZCYmdGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uZmlnLmRpc2FibGVkKSx0aGlzLnNlbGVjdC50cmlnZ2VyTXV0YXRpb25PYnNlcnZlcj0hMSx0aGlzLnNlbGVjdC5lbGVtZW50LmRpc2FibGVkPSExLHRoaXMuc2xpbS5zZWFyY2guaW5wdXQuZGlzYWJsZWQ9ITEsdGhpcy5zZWxlY3QudHJpZ2dlck11dGF0aW9uT2JzZXJ2ZXI9ITB9LGwucHJvdG90eXBlLmRpc2FibGU9ZnVuY3Rpb24oKXt0aGlzLmNvbmZpZy5pc0VuYWJsZWQ9ITEsdGhpcy5jb25maWcuaXNNdWx0aXBsZSYmdGhpcy5zbGltLm11bHRpU2VsZWN0ZWQ/dGhpcy5zbGltLm11bHRpU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5jb25maWcuZGlzYWJsZWQpOnRoaXMuc2xpbS5zaW5nbGVTZWxlY3RlZCYmdGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRoaXMuY29uZmlnLmRpc2FibGVkKSx0aGlzLnNlbGVjdC50cmlnZ2VyTXV0YXRpb25PYnNlcnZlcj0hMSx0aGlzLnNlbGVjdC5lbGVtZW50LmRpc2FibGVkPSEwLHRoaXMuc2xpbS5zZWFyY2guaW5wdXQuZGlzYWJsZWQ9ITAsdGhpcy5zZWxlY3QudHJpZ2dlck11dGF0aW9uT2JzZXJ2ZXI9ITB9LGwucHJvdG90eXBlLnNlYXJjaD1mdW5jdGlvbih0KXt2YXIgaTt0aGlzLmRhdGEuc2VhcmNoVmFsdWUhPT10JiYodGhpcy5zbGltLnNlYXJjaC5pbnB1dC52YWx1ZT10LHRoaXMuY29uZmlnLmlzQWpheD8oKGk9dGhpcykuY29uZmlnLmlzU2VhcmNoaW5nPSEwLHRoaXMucmVuZGVyKCksdGhpcy5hamF4JiZ0aGlzLmFqYXgodCxmdW5jdGlvbihlKXtpLmNvbmZpZy5pc1NlYXJjaGluZz0hMSxBcnJheS5pc0FycmF5KGUpPyhlLnVuc2hpZnQoe3RleHQ6XCJcIixwbGFjZWhvbGRlcjohMH0pLGkuc2V0RGF0YShlKSxpLmRhdGEuc2VhcmNoKHQpLGkucmVuZGVyKCkpOlwic3RyaW5nXCI9PXR5cGVvZiBlP2kuc2xpbS5vcHRpb25zKGUpOmkucmVuZGVyKCl9KSk6KHRoaXMuZGF0YS5zZWFyY2godCksdGhpcy5yZW5kZXIoKSkpfSxsLnByb3RvdHlwZS5zZXRTZWFyY2hUZXh0PWZ1bmN0aW9uKGUpe3RoaXMuY29uZmlnLnNlYXJjaFRleHQ9ZX0sbC5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKCl7dGhpcy5jb25maWcuaXNNdWx0aXBsZT90aGlzLnNsaW0udmFsdWVzKCk6KHRoaXMuc2xpbS5wbGFjZWhvbGRlcigpLHRoaXMuc2xpbS5kZXNlbGVjdCgpKSx0aGlzLnNsaW0ub3B0aW9ucygpfSxsLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKGUpe3ZhciB0PShlPXZvaWQgMD09PWU/bnVsbDplKT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlwiK2UrXCIuc3MtbWFpblwiKTp0aGlzLnNsaW0uY29udGFpbmVyLGk9ZT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc3NpZD1cIi5jb25jYXQoZSxcIl1cIikpOnRoaXMuc2VsZWN0LmVsZW1lbnQ7dCYmaSYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuZG9jdW1lbnRDbGljayksXCJhdXRvXCI9PT10aGlzLmNvbmZpZy5zaG93Q29udGVudCYmd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLndpbmRvd1Njcm9sbCwhMSksaS5zdHlsZS5kaXNwbGF5PVwiXCIsZGVsZXRlIGkuZGF0YXNldC5zc2lkLGkuc2xpbT1udWxsLHQucGFyZW50RWxlbWVudCYmdC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHQpLCF0aGlzLmNvbmZpZy5hZGRUb0JvZHl8fChlPWU/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5cIitlK1wiLnNzLWNvbnRlbnRcIik6dGhpcy5zbGltLmNvbnRlbnQpJiZkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGUpKX0sbCk7ZnVuY3Rpb24gbChlKXt2YXIgdD10aGlzO3RoaXMuYWpheD1udWxsLHRoaXMuYWRkYWJsZT1udWxsLHRoaXMuYmVmb3JlT25DaGFuZ2U9bnVsbCx0aGlzLm9uQ2hhbmdlPW51bGwsdGhpcy5iZWZvcmVPcGVuPW51bGwsdGhpcy5hZnRlck9wZW49bnVsbCx0aGlzLmJlZm9yZUNsb3NlPW51bGwsdGhpcy5hZnRlckNsb3NlPW51bGwsdGhpcy53aW5kb3dTY3JvbGw9KDAsby5kZWJvdW5jZSkoZnVuY3Rpb24oZSl7dC5kYXRhLmNvbnRlbnRPcGVuJiYoXCJhYm92ZVwiPT09KDAsby5wdXRDb250ZW50KSh0LnNsaW0uY29udGVudCx0LmRhdGEuY29udGVudFBvc2l0aW9uLHQuZGF0YS5jb250ZW50T3Blbik/dC5tb3ZlQ29udGVudEFib3ZlKCk6dC5tb3ZlQ29udGVudEJlbG93KCkpfSksdGhpcy5kb2N1bWVudENsaWNrPWZ1bmN0aW9uKGUpe2UudGFyZ2V0JiYhKDAsby5oYXNDbGFzc0luVHJlZSkoZS50YXJnZXQsdC5jb25maWcuaWQpJiZ0LmNsb3NlKCl9O3ZhciBpPXRoaXMudmFsaWRhdGUoZSk7aS5kYXRhc2V0LnNzaWQmJnRoaXMuZGVzdHJveShpLmRhdGFzZXQuc3NpZCksZS5hamF4JiYodGhpcy5hamF4PWUuYWpheCksZS5hZGRhYmxlJiYodGhpcy5hZGRhYmxlPWUuYWRkYWJsZSksdGhpcy5jb25maWc9bmV3IG4uQ29uZmlnKHtzZWxlY3Q6aSxpc0FqYXg6ISFlLmFqYXgsc2hvd1NlYXJjaDplLnNob3dTZWFyY2gsc2VhcmNoUGxhY2Vob2xkZXI6ZS5zZWFyY2hQbGFjZWhvbGRlcixzZWFyY2hUZXh0OmUuc2VhcmNoVGV4dCxzZWFyY2hpbmdUZXh0OmUuc2VhcmNoaW5nVGV4dCxzZWFyY2hGb2N1czplLnNlYXJjaEZvY3VzLHNlYXJjaEhpZ2hsaWdodDplLnNlYXJjaEhpZ2hsaWdodCxzZWFyY2hGaWx0ZXI6ZS5zZWFyY2hGaWx0ZXIsY2xvc2VPblNlbGVjdDplLmNsb3NlT25TZWxlY3Qsc2hvd0NvbnRlbnQ6ZS5zaG93Q29udGVudCxwbGFjZWhvbGRlclRleHQ6ZS5wbGFjZWhvbGRlcixhbGxvd0Rlc2VsZWN0OmUuYWxsb3dEZXNlbGVjdCxhbGxvd0Rlc2VsZWN0T3B0aW9uOmUuYWxsb3dEZXNlbGVjdE9wdGlvbixoaWRlU2VsZWN0ZWRPcHRpb246ZS5oaWRlU2VsZWN0ZWRPcHRpb24sZGVzZWxlY3RMYWJlbDplLmRlc2VsZWN0TGFiZWwsaXNFbmFibGVkOmUuaXNFbmFibGVkLHZhbHVlc1VzZVRleHQ6ZS52YWx1ZXNVc2VUZXh0LHNob3dPcHRpb25Ub29sdGlwczplLnNob3dPcHRpb25Ub29sdGlwcyxzZWxlY3RCeUdyb3VwOmUuc2VsZWN0QnlHcm91cCxsaW1pdDplLmxpbWl0LHRpbWVvdXREZWxheTplLnRpbWVvdXREZWxheSxhZGRUb0JvZHk6ZS5hZGRUb0JvZHl9KSx0aGlzLnNlbGVjdD1uZXcgcy5TZWxlY3Qoe3NlbGVjdDppLG1haW46dGhpc30pLHRoaXMuZGF0YT1uZXcgci5EYXRhKHttYWluOnRoaXN9KSx0aGlzLnNsaW09bmV3IGEuU2xpbSh7bWFpbjp0aGlzfSksdGhpcy5zZWxlY3QuZWxlbWVudC5wYXJlbnROb2RlJiZ0aGlzLnNlbGVjdC5lbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuc2xpbS5jb250YWluZXIsdGhpcy5zZWxlY3QuZWxlbWVudC5uZXh0U2libGluZyksZS5kYXRhP3RoaXMuc2V0RGF0YShlLmRhdGEpOnRoaXMucmVuZGVyKCksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5kb2N1bWVudENsaWNrKSxcImF1dG9cIj09PXRoaXMuY29uZmlnLnNob3dDb250ZW50JiZ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMud2luZG93U2Nyb2xsLCExKSxlLmJlZm9yZU9uQ2hhbmdlJiYodGhpcy5iZWZvcmVPbkNoYW5nZT1lLmJlZm9yZU9uQ2hhbmdlKSxlLm9uQ2hhbmdlJiYodGhpcy5vbkNoYW5nZT1lLm9uQ2hhbmdlKSxlLmJlZm9yZU9wZW4mJih0aGlzLmJlZm9yZU9wZW49ZS5iZWZvcmVPcGVuKSxlLmFmdGVyT3BlbiYmKHRoaXMuYWZ0ZXJPcGVuPWUuYWZ0ZXJPcGVuKSxlLmJlZm9yZUNsb3NlJiYodGhpcy5iZWZvcmVDbG9zZT1lLmJlZm9yZUNsb3NlKSxlLmFmdGVyQ2xvc2UmJih0aGlzLmFmdGVyQ2xvc2U9ZS5hZnRlckNsb3NlKSx0aGlzLmNvbmZpZy5pc0VuYWJsZWR8fHRoaXMuZGlzYWJsZSgpfXQuZGVmYXVsdD1pfSxmdW5jdGlvbihlLHQsaSl7XCJ1c2Ugc3RyaWN0XCI7dC5fX2VzTW9kdWxlPSEwLHQuQ29uZmlnPXZvaWQgMDt2YXIgbj0ocy5wcm90b3R5cGUuc2VhcmNoRmlsdGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuLTEhPT1lLnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHQudG9Mb3dlckNhc2UoKSl9LHMpO2Z1bmN0aW9uIHMoZSl7dGhpcy5pZD1cIlwiLHRoaXMuaXNNdWx0aXBsZT0hMSx0aGlzLmlzQWpheD0hMSx0aGlzLmlzU2VhcmNoaW5nPSExLHRoaXMuc2hvd1NlYXJjaD0hMCx0aGlzLnNlYXJjaEZvY3VzPSEwLHRoaXMuc2VhcmNoSGlnaGxpZ2h0PSExLHRoaXMuY2xvc2VPblNlbGVjdD0hMCx0aGlzLnNob3dDb250ZW50PVwiYXV0b1wiLHRoaXMuc2VhcmNoUGxhY2Vob2xkZXI9XCJTZWFyY2hcIix0aGlzLnNlYXJjaFRleHQ9XCJObyBSZXN1bHRzXCIsdGhpcy5zZWFyY2hpbmdUZXh0PVwiU2VhcmNoaW5nLi4uXCIsdGhpcy5wbGFjZWhvbGRlclRleHQ9XCJTZWxlY3QgVmFsdWVcIix0aGlzLmFsbG93RGVzZWxlY3Q9ITEsdGhpcy5hbGxvd0Rlc2VsZWN0T3B0aW9uPSExLHRoaXMuaGlkZVNlbGVjdGVkT3B0aW9uPSExLHRoaXMuZGVzZWxlY3RMYWJlbD1cInhcIix0aGlzLmlzRW5hYmxlZD0hMCx0aGlzLnZhbHVlc1VzZVRleHQ9ITEsdGhpcy5zaG93T3B0aW9uVG9vbHRpcHM9ITEsdGhpcy5zZWxlY3RCeUdyb3VwPSExLHRoaXMubGltaXQ9MCx0aGlzLnRpbWVvdXREZWxheT0yMDAsdGhpcy5hZGRUb0JvZHk9ITEsdGhpcy5tYWluPVwic3MtbWFpblwiLHRoaXMuc2luZ2xlU2VsZWN0ZWQ9XCJzcy1zaW5nbGUtc2VsZWN0ZWRcIix0aGlzLmFycm93PVwic3MtYXJyb3dcIix0aGlzLm11bHRpU2VsZWN0ZWQ9XCJzcy1tdWx0aS1zZWxlY3RlZFwiLHRoaXMuYWRkPVwic3MtYWRkXCIsdGhpcy5wbHVzPVwic3MtcGx1c1wiLHRoaXMudmFsdWVzPVwic3MtdmFsdWVzXCIsdGhpcy52YWx1ZT1cInNzLXZhbHVlXCIsdGhpcy52YWx1ZVRleHQ9XCJzcy12YWx1ZS10ZXh0XCIsdGhpcy52YWx1ZURlbGV0ZT1cInNzLXZhbHVlLWRlbGV0ZVwiLHRoaXMuY29udGVudD1cInNzLWNvbnRlbnRcIix0aGlzLm9wZW49XCJzcy1vcGVuXCIsdGhpcy5vcGVuQWJvdmU9XCJzcy1vcGVuLWFib3ZlXCIsdGhpcy5vcGVuQmVsb3c9XCJzcy1vcGVuLWJlbG93XCIsdGhpcy5zZWFyY2g9XCJzcy1zZWFyY2hcIix0aGlzLnNlYXJjaEhpZ2hsaWdodGVyPVwic3Mtc2VhcmNoLWhpZ2hsaWdodFwiLHRoaXMuYWRkYWJsZT1cInNzLWFkZGFibGVcIix0aGlzLmxpc3Q9XCJzcy1saXN0XCIsdGhpcy5vcHRncm91cD1cInNzLW9wdGdyb3VwXCIsdGhpcy5vcHRncm91cExhYmVsPVwic3Mtb3B0Z3JvdXAtbGFiZWxcIix0aGlzLm9wdGdyb3VwTGFiZWxTZWxlY3RhYmxlPVwic3Mtb3B0Z3JvdXAtbGFiZWwtc2VsZWN0YWJsZVwiLHRoaXMub3B0aW9uPVwic3Mtb3B0aW9uXCIsdGhpcy5vcHRpb25TZWxlY3RlZD1cInNzLW9wdGlvbi1zZWxlY3RlZFwiLHRoaXMuaGlnaGxpZ2h0ZWQ9XCJzcy1oaWdobGlnaHRlZFwiLHRoaXMuZGlzYWJsZWQ9XCJzcy1kaXNhYmxlZFwiLHRoaXMuaGlkZT1cInNzLWhpZGVcIix0aGlzLmlkPVwic3MtXCIrTWF0aC5mbG9vcigxZTUqTWF0aC5yYW5kb20oKSksdGhpcy5zdHlsZT1lLnNlbGVjdC5zdHlsZS5jc3NUZXh0LHRoaXMuY2xhc3M9ZS5zZWxlY3QuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKSx0aGlzLmlzTXVsdGlwbGU9ZS5zZWxlY3QubXVsdGlwbGUsdGhpcy5pc0FqYXg9ZS5pc0FqYXgsdGhpcy5zaG93U2VhcmNoPSExIT09ZS5zaG93U2VhcmNoLHRoaXMuc2VhcmNoRm9jdXM9ITEhPT1lLnNlYXJjaEZvY3VzLHRoaXMuc2VhcmNoSGlnaGxpZ2h0PSEwPT09ZS5zZWFyY2hIaWdobGlnaHQsdGhpcy5jbG9zZU9uU2VsZWN0PSExIT09ZS5jbG9zZU9uU2VsZWN0LGUuc2hvd0NvbnRlbnQmJih0aGlzLnNob3dDb250ZW50PWUuc2hvd0NvbnRlbnQpLHRoaXMuaXNFbmFibGVkPSExIT09ZS5pc0VuYWJsZWQsZS5zZWFyY2hQbGFjZWhvbGRlciYmKHRoaXMuc2VhcmNoUGxhY2Vob2xkZXI9ZS5zZWFyY2hQbGFjZWhvbGRlciksZS5zZWFyY2hUZXh0JiYodGhpcy5zZWFyY2hUZXh0PWUuc2VhcmNoVGV4dCksZS5zZWFyY2hpbmdUZXh0JiYodGhpcy5zZWFyY2hpbmdUZXh0PWUuc2VhcmNoaW5nVGV4dCksZS5wbGFjZWhvbGRlclRleHQmJih0aGlzLnBsYWNlaG9sZGVyVGV4dD1lLnBsYWNlaG9sZGVyVGV4dCksdGhpcy5hbGxvd0Rlc2VsZWN0PSEwPT09ZS5hbGxvd0Rlc2VsZWN0LHRoaXMuYWxsb3dEZXNlbGVjdE9wdGlvbj0hMD09PWUuYWxsb3dEZXNlbGVjdE9wdGlvbix0aGlzLmhpZGVTZWxlY3RlZE9wdGlvbj0hMD09PWUuaGlkZVNlbGVjdGVkT3B0aW9uLGUuZGVzZWxlY3RMYWJlbCYmKHRoaXMuZGVzZWxlY3RMYWJlbD1lLmRlc2VsZWN0TGFiZWwpLGUudmFsdWVzVXNlVGV4dCYmKHRoaXMudmFsdWVzVXNlVGV4dD1lLnZhbHVlc1VzZVRleHQpLGUuc2hvd09wdGlvblRvb2x0aXBzJiYodGhpcy5zaG93T3B0aW9uVG9vbHRpcHM9ZS5zaG93T3B0aW9uVG9vbHRpcHMpLGUuc2VsZWN0QnlHcm91cCYmKHRoaXMuc2VsZWN0QnlHcm91cD1lLnNlbGVjdEJ5R3JvdXApLGUubGltaXQmJih0aGlzLmxpbWl0PWUubGltaXQpLGUuc2VhcmNoRmlsdGVyJiYodGhpcy5zZWFyY2hGaWx0ZXI9ZS5zZWFyY2hGaWx0ZXIpLG51bGwhPWUudGltZW91dERlbGF5JiYodGhpcy50aW1lb3V0RGVsYXk9ZS50aW1lb3V0RGVsYXkpLHRoaXMuYWRkVG9Cb2R5PSEwPT09ZS5hZGRUb0JvZHl9dC5Db25maWc9bn0sZnVuY3Rpb24oZSx0LGkpe1widXNlIHN0cmljdFwiO3QuX19lc01vZHVsZT0hMCx0LlNlbGVjdD12b2lkIDA7dmFyIG49aSgwKSxpPShzLnByb3RvdHlwZS5zZXRWYWx1ZT1mdW5jdGlvbigpe2lmKHRoaXMubWFpbi5kYXRhLmdldFNlbGVjdGVkKCkpe2lmKHRoaXMubWFpbi5jb25maWcuaXNNdWx0aXBsZSlmb3IodmFyIGU9dGhpcy5tYWluLmRhdGEuZ2V0U2VsZWN0ZWQoKSx0PTAsaT10aGlzLmVsZW1lbnQub3B0aW9uczt0PGkubGVuZ3RoO3QrKyl7dmFyIG49aVt0XTtuLnNlbGVjdGVkPSExO2Zvcih2YXIgcz0wLGE9ZTtzPGEubGVuZ3RoO3MrKylhW3NdLnZhbHVlPT09bi52YWx1ZSYmKG4uc2VsZWN0ZWQ9ITApfWVsc2V7ZT10aGlzLm1haW4uZGF0YS5nZXRTZWxlY3RlZCgpO3RoaXMuZWxlbWVudC52YWx1ZT1lP2UudmFsdWU6XCJcIn10aGlzLm1haW4uZGF0YS5pc09uQ2hhbmdlRW5hYmxlZD0hMSx0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJjaGFuZ2VcIix7YnViYmxlczohMH0pKSx0aGlzLm1haW4uZGF0YS5pc09uQ2hhbmdlRW5hYmxlZD0hMH19LHMucHJvdG90eXBlLmFkZEF0dHJpYnV0ZXM9ZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnQudGFiSW5kZXg9LTEsdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXk9XCJub25lXCIsdGhpcy5lbGVtZW50LmRhdGFzZXQuc3NpZD10aGlzLm1haW4uY29uZmlnLmlkLHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLFwidHJ1ZVwiKX0scy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnM9ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsZnVuY3Rpb24oZSl7dC5tYWluLmRhdGEuc2V0U2VsZWN0ZWRGcm9tU2VsZWN0KCksdC5tYWluLnJlbmRlcigpfSl9LHMucHJvdG90eXBlLmFkZE11dGF0aW9uT2JzZXJ2ZXI9ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMubWFpbi5jb25maWcuaXNBamF4fHwodGhpcy5tdXRhdGlvbk9ic2VydmVyPW5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKGUpe3QudHJpZ2dlck11dGF0aW9uT2JzZXJ2ZXImJih0Lm1haW4uZGF0YS5wYXJzZVNlbGVjdERhdGEoKSx0Lm1haW4uZGF0YS5zZXRTZWxlY3RlZEZyb21TZWxlY3QoKSx0Lm1haW4ucmVuZGVyKCksZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe1wiY2xhc3NcIj09PWUuYXR0cmlidXRlTmFtZSYmdC5tYWluLnNsaW0udXBkYXRlQ29udGFpbmVyRGl2Q2xhc3ModC5tYWluLnNsaW0uY29udGFpbmVyKX0pKX0pLHRoaXMub2JzZXJ2ZU11dGF0aW9uT2JzZXJ2ZXIoKSl9LHMucHJvdG90eXBlLm9ic2VydmVNdXRhdGlvbk9ic2VydmVyPWZ1bmN0aW9uKCl7dGhpcy5tdXRhdGlvbk9ic2VydmVyJiZ0aGlzLm11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQse2F0dHJpYnV0ZXM6ITAsY2hpbGRMaXN0OiEwLGNoYXJhY3RlckRhdGE6ITB9KX0scy5wcm90b3R5cGUuZGlzY29ubmVjdE11dGF0aW9uT2JzZXJ2ZXI9ZnVuY3Rpb24oKXt0aGlzLm11dGF0aW9uT2JzZXJ2ZXImJnRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCl9LHMucHJvdG90eXBlLmNyZWF0ZT1mdW5jdGlvbihlKXt0aGlzLmVsZW1lbnQuaW5uZXJIVE1MPVwiXCI7Zm9yKHZhciB0PTAsaT1lO3Q8aS5sZW5ndGg7dCsrKXt2YXIgbj1pW3RdO2lmKG4uaGFzT3duUHJvcGVydHkoXCJvcHRpb25zXCIpKXt2YXIgcz1uLGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO2lmKGEubGFiZWw9cy5sYWJlbCxzLm9wdGlvbnMpZm9yKHZhciBvPTAsbD1zLm9wdGlvbnM7bzxsLmxlbmd0aDtvKyspe3ZhciByPWxbb107YS5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZU9wdGlvbihyKSl9dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGEpfWVsc2UgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlT3B0aW9uKG4pKX19LHMucHJvdG90eXBlLmNyZWF0ZU9wdGlvbj1mdW5jdGlvbih0KXt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO3JldHVybiBpLnZhbHVlPVwiXCIhPT10LnZhbHVlP3QudmFsdWU6dC50ZXh0LGkuaW5uZXJIVE1MPXQuaW5uZXJIVE1MfHx0LnRleHQsdC5zZWxlY3RlZCYmKGkuc2VsZWN0ZWQ9dC5zZWxlY3RlZCksITE9PT10LmRpc3BsYXkmJihpLnN0eWxlLmRpc3BsYXk9XCJub25lXCIpLHQuZGlzYWJsZWQmJihpLmRpc2FibGVkPSEwKSx0LnBsYWNlaG9sZGVyJiZpLnNldEF0dHJpYnV0ZShcImRhdGEtcGxhY2Vob2xkZXJcIixcInRydWVcIiksdC5tYW5kYXRvcnkmJmkuc2V0QXR0cmlidXRlKFwiZGF0YS1tYW5kYXRvcnlcIixcInRydWVcIiksdC5jbGFzcyYmdC5jbGFzcy5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihlKXtpLmNsYXNzTGlzdC5hZGQoZSl9KSx0LmRhdGEmJlwib2JqZWN0XCI9PXR5cGVvZiB0LmRhdGEmJk9iamVjdC5rZXlzKHQuZGF0YSkuZm9yRWFjaChmdW5jdGlvbihlKXtpLnNldEF0dHJpYnV0ZShcImRhdGEtXCIrKDAsbi5rZWJhYkNhc2UpKGUpLHQuZGF0YVtlXSl9KSxpfSxzKTtmdW5jdGlvbiBzKGUpe3RoaXMudHJpZ2dlck11dGF0aW9uT2JzZXJ2ZXI9ITAsdGhpcy5lbGVtZW50PWUuc2VsZWN0LHRoaXMubWFpbj1lLm1haW4sdGhpcy5lbGVtZW50LmRpc2FibGVkJiYodGhpcy5tYWluLmNvbmZpZy5pc0VuYWJsZWQ9ITEpLHRoaXMuYWRkQXR0cmlidXRlcygpLHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKSx0aGlzLm11dGF0aW9uT2JzZXJ2ZXI9bnVsbCx0aGlzLmFkZE11dGF0aW9uT2JzZXJ2ZXIoKSx0aGlzLmVsZW1lbnQuc2xpbT1lLm1haW59dC5TZWxlY3Q9aX0sZnVuY3Rpb24oZSx0LGkpe1widXNlIHN0cmljdFwiO3QuX19lc01vZHVsZT0hMCx0LlNsaW09dm9pZCAwO3ZhciBuPWkoMCksbz1pKDEpLGk9KHMucHJvdG90eXBlLmNvbnRhaW5lckRpdj1mdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIGUuc3R5bGUuY3NzVGV4dD10aGlzLm1haW4uY29uZmlnLnN0eWxlLHRoaXMudXBkYXRlQ29udGFpbmVyRGl2Q2xhc3MoZSksZX0scy5wcm90b3R5cGUudXBkYXRlQ29udGFpbmVyRGl2Q2xhc3M9ZnVuY3Rpb24oZSl7dGhpcy5tYWluLmNvbmZpZy5jbGFzcz10aGlzLm1haW4uc2VsZWN0LmVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKSxlLmNsYXNzTmFtZT1cIlwiLGUuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmlkKSxlLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5tYWluKTtmb3IodmFyIHQ9MCxpPXRoaXMubWFpbi5jb25maWcuY2xhc3M7dDxpLmxlbmd0aDt0Kyspe3ZhciBuPWlbdF07XCJcIiE9PW4udHJpbSgpJiZlLmNsYXNzTGlzdC5hZGQobil9fSxzLnByb3RvdHlwZS5zaW5nbGVTZWxlY3RlZERpdj1mdW5jdGlvbigpe3ZhciB0PXRoaXMsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2UuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLnNpbmdsZVNlbGVjdGVkKTt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtpLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWhvbGRlclwiKSxlLmFwcGVuZENoaWxkKGkpO3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO24uaW5uZXJIVE1MPXRoaXMubWFpbi5jb25maWcuZGVzZWxlY3RMYWJlbCxuLmNsYXNzTGlzdC5hZGQoXCJzcy1kZXNlbGVjdFwiKSxuLm9uY2xpY2s9ZnVuY3Rpb24oZSl7ZS5zdG9wUHJvcGFnYXRpb24oKSx0Lm1haW4uY29uZmlnLmlzRW5hYmxlZCYmdC5tYWluLnNldChcIlwiKX0sZS5hcHBlbmRDaGlsZChuKTt2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtzLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5hcnJvdyk7dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7cmV0dXJuIGEuY2xhc3NMaXN0LmFkZChcImFycm93LWRvd25cIikscy5hcHBlbmRDaGlsZChhKSxlLmFwcGVuZENoaWxkKHMpLGUub25jbGljaz1mdW5jdGlvbigpe3QubWFpbi5jb25maWcuaXNFbmFibGVkJiYodC5tYWluLmRhdGEuY29udGVudE9wZW4/dC5tYWluLmNsb3NlKCk6dC5tYWluLm9wZW4oKSl9LHtjb250YWluZXI6ZSxwbGFjZWhvbGRlcjppLGRlc2VsZWN0Om4sYXJyb3dJY29uOntjb250YWluZXI6cyxhcnJvdzphfX19LHMucHJvdG90eXBlLnBsYWNlaG9sZGVyPWZ1bmN0aW9uKCl7dmFyIGUsdD10aGlzLm1haW4uZGF0YS5nZXRTZWxlY3RlZCgpO251bGw9PT10fHx0JiZ0LnBsYWNlaG9sZGVyPygoZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSkuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkKSxlLmlubmVySFRNTD10aGlzLm1haW4uY29uZmlnLnBsYWNlaG9sZGVyVGV4dCx0aGlzLnNpbmdsZVNlbGVjdGVkJiYodGhpcy5zaW5nbGVTZWxlY3RlZC5wbGFjZWhvbGRlci5pbm5lckhUTUw9ZS5vdXRlckhUTUwpKTooZT1cIlwiLHQmJihlPXQuaW5uZXJIVE1MJiYhMCE9PXRoaXMubWFpbi5jb25maWcudmFsdWVzVXNlVGV4dD90LmlubmVySFRNTDp0LnRleHQpLHRoaXMuc2luZ2xlU2VsZWN0ZWQmJih0aGlzLnNpbmdsZVNlbGVjdGVkLnBsYWNlaG9sZGVyLmlubmVySFRNTD10P2U6XCJcIikpfSxzLnByb3RvdHlwZS5kZXNlbGVjdD1mdW5jdGlvbigpe3RoaXMuc2luZ2xlU2VsZWN0ZWQmJighdGhpcy5tYWluLmNvbmZpZy5hbGxvd0Rlc2VsZWN0fHxcIlwiPT09dGhpcy5tYWluLnNlbGVjdGVkKCk/dGhpcy5zaW5nbGVTZWxlY3RlZC5kZXNlbGVjdC5jbGFzc0xpc3QuYWRkKFwic3MtaGlkZVwiKTp0aGlzLnNpbmdsZVNlbGVjdGVkLmRlc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJzcy1oaWRlXCIpKX0scy5wcm90b3R5cGUubXVsdGlTZWxlY3RlZERpdj1mdW5jdGlvbigpe3ZhciB0PXRoaXMsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2UuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLm11bHRpU2VsZWN0ZWQpO3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcudmFsdWVzKSxlLmFwcGVuZENoaWxkKGkpO3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7bi5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcuYWRkKTt2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtyZXR1cm4gcy5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcucGx1cykscy5vbmNsaWNrPWZ1bmN0aW9uKGUpe3QubWFpbi5kYXRhLmNvbnRlbnRPcGVuJiYodC5tYWluLmNsb3NlKCksZS5zdG9wUHJvcGFnYXRpb24oKSl9LG4uYXBwZW5kQ2hpbGQocyksZS5hcHBlbmRDaGlsZChuKSxlLm9uY2xpY2s9ZnVuY3Rpb24oZSl7dC5tYWluLmNvbmZpZy5pc0VuYWJsZWQmJihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnModC5tYWluLmNvbmZpZy52YWx1ZURlbGV0ZSl8fCh0Lm1haW4uZGF0YS5jb250ZW50T3Blbj90Lm1haW4uY2xvc2UoKTp0Lm1haW4ub3BlbigpKSl9LHtjb250YWluZXI6ZSx2YWx1ZXM6aSxhZGQ6bixwbHVzOnN9fSxzLnByb3RvdHlwZS52YWx1ZXM9ZnVuY3Rpb24oKXtpZih0aGlzLm11bHRpU2VsZWN0ZWQpe2Zvcih2YXIgZT10aGlzLm11bHRpU2VsZWN0ZWQudmFsdWVzLmNoaWxkTm9kZXMsdD10aGlzLm1haW4uZGF0YS5nZXRTZWxlY3RlZCgpLGk9W10sbj0wLHM9ZTtuPHMubGVuZ3RoO24rKyl7Zm9yKHZhciBhPXNbbl0sbz0hMCxsPTAscj10O2w8ci5sZW5ndGg7bCsrKXt2YXIgYz1yW2xdO1N0cmluZyhjLmlkKT09PVN0cmluZyhhLmRhdGFzZXQuaWQpJiYobz0hMSl9byYmaS5wdXNoKGEpfWZvcih2YXIgZD0wLGg9aTtkPGgubGVuZ3RoO2QrKyl7dmFyIHU9aFtkXTt1LmNsYXNzTGlzdC5hZGQoXCJzcy1vdXRcIiksdGhpcy5tdWx0aVNlbGVjdGVkLnZhbHVlcy5yZW1vdmVDaGlsZCh1KX1mb3IodmFyIHAsZT10aGlzLm11bHRpU2VsZWN0ZWQudmFsdWVzLmNoaWxkTm9kZXMsYz0wO2M8dC5sZW5ndGg7YysrKXtvPSExO2Zvcih2YXIgbT0wLGY9ZTttPGYubGVuZ3RoO20rKyl7YT1mW21dO1N0cmluZyh0W2NdLmlkKT09PVN0cmluZyhhLmRhdGFzZXQuaWQpJiYobz0hMCl9b3x8KDAhPT1lLmxlbmd0aCYmSFRNTEVsZW1lbnQucHJvdG90eXBlLmluc2VydEFkamFjZW50RWxlbWVudD8wPT09Yz90aGlzLm11bHRpU2VsZWN0ZWQudmFsdWVzLmluc2VydEJlZm9yZSh0aGlzLnZhbHVlRGl2KHRbY10pLGVbY10pOmVbYy0xXS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLHRoaXMudmFsdWVEaXYodFtjXSkpOnRoaXMubXVsdGlTZWxlY3RlZC52YWx1ZXMuYXBwZW5kQ2hpbGQodGhpcy52YWx1ZURpdih0W2NdKSkpfTA9PT10Lmxlbmd0aCYmKChwPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcuZGlzYWJsZWQpLHAuaW5uZXJIVE1MPXRoaXMubWFpbi5jb25maWcucGxhY2Vob2xkZXJUZXh0LHRoaXMubXVsdGlTZWxlY3RlZC52YWx1ZXMuaW5uZXJIVE1MPXAub3V0ZXJIVE1MKX19LHMucHJvdG90eXBlLnZhbHVlRGl2PWZ1bmN0aW9uKHMpe3ZhciBhPXRoaXMsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2UuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLnZhbHVlKSxlLmRhdGFzZXQuaWQ9cy5pZDt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtyZXR1cm4gdC5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcudmFsdWVUZXh0KSx0LmlubmVySFRNTD1zLmlubmVySFRNTCYmITAhPT10aGlzLm1haW4uY29uZmlnLnZhbHVlc1VzZVRleHQ/cy5pbm5lckhUTUw6cy50ZXh0LGUuYXBwZW5kQ2hpbGQodCkscy5tYW5kYXRvcnl8fCgodD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSkuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLnZhbHVlRGVsZXRlKSx0LmlubmVySFRNTD10aGlzLm1haW4uY29uZmlnLmRlc2VsZWN0TGFiZWwsdC5vbmNsaWNrPWZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKSxlLnN0b3BQcm9wYWdhdGlvbigpO3ZhciB0PSExO2lmKGEubWFpbi5iZWZvcmVPbkNoYW5nZXx8KHQ9ITApLGEubWFpbi5iZWZvcmVPbkNoYW5nZSl7Zm9yKHZhciBlPWEubWFpbi5kYXRhLmdldFNlbGVjdGVkKCksaT1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGUpKSxuPTA7bjxpLmxlbmd0aDtuKyspaVtuXS5pZD09PXMuaWQmJmkuc3BsaWNlKG4sMSk7ITEhPT1hLm1haW4uYmVmb3JlT25DaGFuZ2UoaSkmJih0PSEwKX10JiYoYS5tYWluLmRhdGEucmVtb3ZlRnJvbVNlbGVjdGVkKHMuaWQsXCJpZFwiKSxhLm1haW4ucmVuZGVyKCksYS5tYWluLnNlbGVjdC5zZXRWYWx1ZSgpLGEubWFpbi5kYXRhLm9uRGF0YUNoYW5nZSgpKX0sZS5hcHBlbmRDaGlsZCh0KSksZX0scy5wcm90b3R5cGUuY29udGVudERpdj1mdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIGUuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmNvbnRlbnQpLGV9LHMucHJvdG90eXBlLnNlYXJjaERpdj1mdW5jdGlvbigpe3ZhciBuPXRoaXMsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpLGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5zZWFyY2gpO3ZhciB0PXtjb250YWluZXI6ZSxpbnB1dDpzfTtyZXR1cm4gdGhpcy5tYWluLmNvbmZpZy5zaG93U2VhcmNofHwoZS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcuaGlkZSkscy5yZWFkT25seT0hMCkscy50eXBlPVwic2VhcmNoXCIscy5wbGFjZWhvbGRlcj10aGlzLm1haW4uY29uZmlnLnNlYXJjaFBsYWNlaG9sZGVyLHMudGFiSW5kZXg9MCxzLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIix0aGlzLm1haW4uY29uZmlnLnNlYXJjaFBsYWNlaG9sZGVyKSxzLnNldEF0dHJpYnV0ZShcImF1dG9jYXBpdGFsaXplXCIsXCJvZmZcIikscy5zZXRBdHRyaWJ1dGUoXCJhdXRvY29tcGxldGVcIixcIm9mZlwiKSxzLnNldEF0dHJpYnV0ZShcImF1dG9jb3JyZWN0XCIsXCJvZmZcIikscy5vbmNsaWNrPWZ1bmN0aW9uKGUpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtcIlwiPT09ZS50YXJnZXQudmFsdWUmJm4ubWFpbi5zZWFyY2goXCJcIil9LDEwKX0scy5vbmtleWRvd249ZnVuY3Rpb24oZSl7XCJBcnJvd1VwXCI9PT1lLmtleT8obi5tYWluLm9wZW4oKSxuLmhpZ2hsaWdodFVwKCksZS5wcmV2ZW50RGVmYXVsdCgpKTpcIkFycm93RG93blwiPT09ZS5rZXk/KG4ubWFpbi5vcGVuKCksbi5oaWdobGlnaHREb3duKCksZS5wcmV2ZW50RGVmYXVsdCgpKTpcIlRhYlwiPT09ZS5rZXk/bi5tYWluLmRhdGEuY29udGVudE9wZW4/bi5tYWluLmNsb3NlKCk6c2V0VGltZW91dChmdW5jdGlvbigpe24ubWFpbi5jbG9zZSgpfSxuLm1haW4uY29uZmlnLnRpbWVvdXREZWxheSk6XCJFbnRlclwiPT09ZS5rZXkmJmUucHJldmVudERlZmF1bHQoKX0scy5vbmtleXVwPWZ1bmN0aW9uKGUpe3ZhciB0PWUudGFyZ2V0O2lmKFwiRW50ZXJcIj09PWUua2V5KXtpZihuLm1haW4uYWRkYWJsZSYmZS5jdHJsS2V5KXJldHVybiBhLmNsaWNrKCksZS5wcmV2ZW50RGVmYXVsdCgpLHZvaWQgZS5zdG9wUHJvcGFnYXRpb24oKTt2YXIgaT1uLmxpc3QucXVlcnlTZWxlY3RvcihcIi5cIituLm1haW4uY29uZmlnLmhpZ2hsaWdodGVkKTtpJiZpLmNsaWNrKCl9ZWxzZVwiQXJyb3dVcFwiPT09ZS5rZXl8fFwiQXJyb3dEb3duXCI9PT1lLmtleXx8KFwiRXNjYXBlXCI9PT1lLmtleT9uLm1haW4uY2xvc2UoKTpuLm1haW4uY29uZmlnLnNob3dTZWFyY2gmJm4ubWFpbi5kYXRhLmNvbnRlbnRPcGVuP24ubWFpbi5zZWFyY2godC52YWx1ZSk6cy52YWx1ZT1cIlwiKTtlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKX0scy5vbmZvY3VzPWZ1bmN0aW9uKCl7bi5tYWluLm9wZW4oKX0sZS5hcHBlbmRDaGlsZChzKSx0aGlzLm1haW4uYWRkYWJsZSYmKGEuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmFkZGFibGUpLGEuaW5uZXJIVE1MPVwiK1wiLGEub25jbGljaz1mdW5jdGlvbihlKXt2YXIgdDtuLm1haW4uYWRkYWJsZSYmKGUucHJldmVudERlZmF1bHQoKSxlLnN0b3BQcm9wYWdhdGlvbigpLFwiXCIhPT0oZT1uLnNlYXJjaC5pbnB1dC52YWx1ZSkudHJpbSgpPyhlPW4ubWFpbi5hZGRhYmxlKGUpLHQ9XCJcIixlJiYoXCJvYmplY3RcIj09dHlwZW9mIGU/KDAsby52YWxpZGF0ZU9wdGlvbikoZSkmJihuLm1haW4uYWRkRGF0YShlKSx0PWUudmFsdWV8fGUudGV4dCk6KG4ubWFpbi5hZGREYXRhKG4ubWFpbi5kYXRhLm5ld09wdGlvbih7dGV4dDplLHZhbHVlOmV9KSksdD1lKSxuLm1haW4uc2VhcmNoKFwiXCIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLm1haW4uc2V0KHQsXCJ2YWx1ZVwiLCExLCExKX0sMTAwKSxuLm1haW4uY29uZmlnLmNsb3NlT25TZWxlY3QmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLm1haW4uY2xvc2UoKX0sMTAwKSkpOm4uc2VhcmNoLmlucHV0LmZvY3VzKCkpfSxlLmFwcGVuZENoaWxkKGEpLHQuYWRkYWJsZT1hKSx0fSxzLnByb3RvdHlwZS5oaWdobGlnaHRVcD1mdW5jdGlvbigpe3ZhciBlPXRoaXMubGlzdC5xdWVyeVNlbGVjdG9yKFwiLlwiK3RoaXMubWFpbi5jb25maWcuaGlnaGxpZ2h0ZWQpLHQ9bnVsbDtpZihlKWZvcih0PWUucHJldmlvdXNTaWJsaW5nO251bGwhPT10JiZ0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkKTspdD10LnByZXZpb3VzU2libGluZztlbHNlIHZhciBpPXRoaXMubGlzdC5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK3RoaXMubWFpbi5jb25maWcub3B0aW9uK1wiOm5vdCguXCIrdGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCtcIilcIiksdD1pW2kubGVuZ3RoLTFdO251bGwhPT0odD10JiZ0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLm1haW4uY29uZmlnLm9wdGdyb3VwTGFiZWwpP251bGw6dCl8fChpPWUucGFyZW50Tm9kZSkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMubWFpbi5jb25maWcub3B0Z3JvdXApJiYoIWkucHJldmlvdXNTaWJsaW5nfHwoaT1pLnByZXZpb3VzU2libGluZy5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK3RoaXMubWFpbi5jb25maWcub3B0aW9uK1wiOm5vdCguXCIrdGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCtcIilcIikpLmxlbmd0aCYmKHQ9aVtpLmxlbmd0aC0xXSkpLHQmJihlJiZlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5tYWluLmNvbmZpZy5oaWdobGlnaHRlZCksdC5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcuaGlnaGxpZ2h0ZWQpLCgwLG4uZW5zdXJlRWxlbWVudEluVmlldykodGhpcy5saXN0LHQpKX0scy5wcm90b3R5cGUuaGlnaGxpZ2h0RG93bj1mdW5jdGlvbigpe3ZhciBlLHQ9dGhpcy5saXN0LnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5tYWluLmNvbmZpZy5oaWdobGlnaHRlZCksaT1udWxsO2lmKHQpZm9yKGk9dC5uZXh0U2libGluZztudWxsIT09aSYmaS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCk7KWk9aS5uZXh0U2libGluZztlbHNlIGk9dGhpcy5saXN0LnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5tYWluLmNvbmZpZy5vcHRpb24rXCI6bm90KC5cIit0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkK1wiKVwiKTtudWxsIT09aXx8bnVsbD09PXR8fChlPXQucGFyZW50Tm9kZSkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMubWFpbi5jb25maWcub3B0Z3JvdXApJiZlLm5leHRTaWJsaW5nJiYoaT1lLm5leHRTaWJsaW5nLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5tYWluLmNvbmZpZy5vcHRpb24rXCI6bm90KC5cIit0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkK1wiKVwiKSksaSYmKHQmJnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLm1haW4uY29uZmlnLmhpZ2hsaWdodGVkKSxpLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5oaWdobGlnaHRlZCksKDAsbi5lbnN1cmVFbGVtZW50SW5WaWV3KSh0aGlzLmxpc3QsaSkpfSxzLnByb3RvdHlwZS5saXN0RGl2PWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gZS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcubGlzdCksZS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsXCJsaXN0Ym94XCIpLGV9LHMucHJvdG90eXBlLm9wdGlvbnM9ZnVuY3Rpb24oZSl7dm9pZCAwPT09ZSYmKGU9XCJcIik7dmFyIHQ9dGhpcy5tYWluLmRhdGEuZmlsdGVyZWR8fHRoaXMubWFpbi5kYXRhLmRhdGE7aWYoKHRoaXMubGlzdC5pbm5lckhUTUw9XCJcIikhPT1lKXJldHVybihpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5vcHRpb24pLGkuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkKSxpLmlubmVySFRNTD1lLHZvaWQgdGhpcy5saXN0LmFwcGVuZENoaWxkKGkpO2lmKHRoaXMubWFpbi5jb25maWcuaXNBamF4JiZ0aGlzLm1haW4uY29uZmlnLmlzU2VhcmNoaW5nKXJldHVybihpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5vcHRpb24pLGkuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkKSxpLmlubmVySFRNTD10aGlzLm1haW4uY29uZmlnLnNlYXJjaGluZ1RleHQsdm9pZCB0aGlzLmxpc3QuYXBwZW5kQ2hpbGQoaSk7aWYoMD09PXQubGVuZ3RoKXt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBpLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5vcHRpb24pLGkuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkKSxpLmlubmVySFRNTD10aGlzLm1haW4uY29uZmlnLnNlYXJjaFRleHQsdm9pZCB0aGlzLmxpc3QuYXBwZW5kQ2hpbGQoaSl9Zm9yKHZhciByPXRoaXMsbj0wLHM9dDtuPHMubGVuZ3RoO24rKykhZnVuY3Rpb24oZSl7aWYoZS5oYXNPd25Qcm9wZXJ0eShcImxhYmVsXCIpKXt2YXIgdD1lLHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtzLmNsYXNzTGlzdC5hZGQoci5tYWluLmNvbmZpZy5vcHRncm91cCk7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpLmNsYXNzTGlzdC5hZGQoci5tYWluLmNvbmZpZy5vcHRncm91cExhYmVsKSxyLm1haW4uY29uZmlnLnNlbGVjdEJ5R3JvdXAmJnIubWFpbi5jb25maWcuaXNNdWx0aXBsZSYmaS5jbGFzc0xpc3QuYWRkKHIubWFpbi5jb25maWcub3B0Z3JvdXBMYWJlbFNlbGVjdGFibGUpLGkuaW5uZXJIVE1MPXQubGFiZWwscy5hcHBlbmRDaGlsZChpKTt0PXQub3B0aW9ucztpZih0KXtmb3IodmFyIGEsbj0wLG89dDtuPG8ubGVuZ3RoO24rKyl7dmFyIGw9b1tuXTtzLmFwcGVuZENoaWxkKHIub3B0aW9uKGwpKX1yLm1haW4uY29uZmlnLnNlbGVjdEJ5R3JvdXAmJnIubWFpbi5jb25maWcuaXNNdWx0aXBsZSYmKGE9cixpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKSxlLnN0b3BQcm9wYWdhdGlvbigpO2Zvcih2YXIgdD0wLGk9cy5jaGlsZHJlbjt0PGkubGVuZ3RoO3QrKyl7dmFyIG49aVt0XTstMSE9PW4uY2xhc3NOYW1lLmluZGV4T2YoYS5tYWluLmNvbmZpZy5vcHRpb24pJiZuLmNsaWNrKCl9fSkpfXIubGlzdC5hcHBlbmRDaGlsZChzKX1lbHNlIHIubGlzdC5hcHBlbmRDaGlsZChyLm9wdGlvbihlKSl9KHNbbl0pfSxzLnByb3RvdHlwZS5vcHRpb249ZnVuY3Rpb24obyl7aWYoby5wbGFjZWhvbGRlcil7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gZS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcub3B0aW9uKSxlLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5oaWRlKSxlfXZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcub3B0aW9uKSx0LnNldEF0dHJpYnV0ZShcInJvbGVcIixcIm9wdGlvblwiKSxvLmNsYXNzJiZvLmNsYXNzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3QuY2xhc3NMaXN0LmFkZChlKX0pLG8uc3R5bGUmJih0LnN0eWxlLmNzc1RleHQ9by5zdHlsZSk7dmFyIGw9dGhpcy5tYWluLmRhdGEuZ2V0U2VsZWN0ZWQoKTt0LmRhdGFzZXQuaWQ9by5pZCx0aGlzLm1haW4uY29uZmlnLnNlYXJjaEhpZ2hsaWdodCYmdGhpcy5tYWluLnNsaW0mJm8uaW5uZXJIVE1MJiZcIlwiIT09dGhpcy5tYWluLnNsaW0uc2VhcmNoLmlucHV0LnZhbHVlLnRyaW0oKT90LmlubmVySFRNTD0oMCxuLmhpZ2hsaWdodCkoby5pbm5lckhUTUwsdGhpcy5tYWluLnNsaW0uc2VhcmNoLmlucHV0LnZhbHVlLHRoaXMubWFpbi5jb25maWcuc2VhcmNoSGlnaGxpZ2h0ZXIpOm8uaW5uZXJIVE1MJiYodC5pbm5lckhUTUw9by5pbm5lckhUTUwpLHRoaXMubWFpbi5jb25maWcuc2hvd09wdGlvblRvb2x0aXBzJiZ0LnRleHRDb250ZW50JiZ0LnNldEF0dHJpYnV0ZShcInRpdGxlXCIsdC50ZXh0Q29udGVudCk7dmFyIHI9dGhpczt0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKSxlLnN0b3BQcm9wYWdhdGlvbigpO3ZhciB0PXRoaXMuZGF0YXNldC5pZDtpZighMD09PW8uc2VsZWN0ZWQmJnIubWFpbi5jb25maWcuYWxsb3dEZXNlbGVjdE9wdGlvbil7dmFyIGk9ITE7aWYoci5tYWluLmJlZm9yZU9uQ2hhbmdlJiZyLm1haW4uY29uZmlnLmlzTXVsdGlwbGV8fChpPSEwKSxyLm1haW4uYmVmb3JlT25DaGFuZ2UmJnIubWFpbi5jb25maWcuaXNNdWx0aXBsZSl7Zm9yKHZhciBuPXIubWFpbi5kYXRhLmdldFNlbGVjdGVkKCkscz1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG4pKSxhPTA7YTxzLmxlbmd0aDthKyspc1thXS5pZD09PXQmJnMuc3BsaWNlKGEsMSk7ITEhPT1yLm1haW4uYmVmb3JlT25DaGFuZ2UocykmJihpPSEwKX1pJiYoci5tYWluLmNvbmZpZy5pc011bHRpcGxlPyhyLm1haW4uZGF0YS5yZW1vdmVGcm9tU2VsZWN0ZWQodCxcImlkXCIpLHIubWFpbi5yZW5kZXIoKSxyLm1haW4uc2VsZWN0LnNldFZhbHVlKCksci5tYWluLmRhdGEub25EYXRhQ2hhbmdlKCkpOnIubWFpbi5zZXQoXCJcIikpfWVsc2Ugby5kaXNhYmxlZHx8by5zZWxlY3RlZHx8ci5tYWluLmNvbmZpZy5saW1pdCYmQXJyYXkuaXNBcnJheShsKSYmci5tYWluLmNvbmZpZy5saW1pdDw9bC5sZW5ndGh8fChyLm1haW4uYmVmb3JlT25DaGFuZ2U/KG49dm9pZCAwLChpPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoci5tYWluLmRhdGEuZ2V0T2JqZWN0RnJvbURhdGEodCkpKSkuc2VsZWN0ZWQ9ITAsci5tYWluLmNvbmZpZy5pc011bHRpcGxlPyhuPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobCkpKS5wdXNoKGkpOm49SlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpKSksITEhPT1yLm1haW4uYmVmb3JlT25DaGFuZ2UobikmJnIubWFpbi5zZXQodCxcImlkXCIsci5tYWluLmNvbmZpZy5jbG9zZU9uU2VsZWN0KSk6ci5tYWluLnNldCh0LFwiaWRcIixyLm1haW4uY29uZmlnLmNsb3NlT25TZWxlY3QpKX0pO2U9bCYmKDAsbi5pc1ZhbHVlSW5BcnJheU9mT2JqZWN0cykobCxcImlkXCIsby5pZCk7cmV0dXJuKG8uZGlzYWJsZWR8fGUpJiYodC5vbmNsaWNrPW51bGwsci5tYWluLmNvbmZpZy5hbGxvd0Rlc2VsZWN0T3B0aW9ufHx0LmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCksci5tYWluLmNvbmZpZy5oaWRlU2VsZWN0ZWRPcHRpb24mJnQuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmhpZGUpKSxlP3QuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLm9wdGlvblNlbGVjdGVkKTp0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5tYWluLmNvbmZpZy5vcHRpb25TZWxlY3RlZCksdH0scyk7ZnVuY3Rpb24gcyhlKXt0aGlzLm1haW49ZS5tYWluLHRoaXMuY29udGFpbmVyPXRoaXMuY29udGFpbmVyRGl2KCksdGhpcy5jb250ZW50PXRoaXMuY29udGVudERpdigpLHRoaXMuc2VhcmNoPXRoaXMuc2VhcmNoRGl2KCksdGhpcy5saXN0PXRoaXMubGlzdERpdigpLHRoaXMub3B0aW9ucygpLHRoaXMuc2luZ2xlU2VsZWN0ZWQ9bnVsbCx0aGlzLm11bHRpU2VsZWN0ZWQ9bnVsbCx0aGlzLm1haW4uY29uZmlnLmlzTXVsdGlwbGU/KHRoaXMubXVsdGlTZWxlY3RlZD10aGlzLm11bHRpU2VsZWN0ZWREaXYoKSx0aGlzLm11bHRpU2VsZWN0ZWQmJnRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubXVsdGlTZWxlY3RlZC5jb250YWluZXIpKToodGhpcy5zaW5nbGVTZWxlY3RlZD10aGlzLnNpbmdsZVNlbGVjdGVkRGl2KCksdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5zaW5nbGVTZWxlY3RlZC5jb250YWluZXIpKSx0aGlzLm1haW4uY29uZmlnLmFkZFRvQm9keT8odGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5pZCksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpKTp0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpLHRoaXMuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLnNlYXJjaC5jb250YWluZXIpLHRoaXMuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmxpc3QpfXQuU2xpbT1pfV0scy5jPW4scy5kPWZ1bmN0aW9uKGUsdCxpKXtzLm8oZSx0KXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6aX0pfSxzLnI9ZnVuY3Rpb24oZSl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0scy50PWZ1bmN0aW9uKHQsZSl7aWYoMSZlJiYodD1zKHQpKSw4JmUpcmV0dXJuIHQ7aWYoNCZlJiZcIm9iamVjdFwiPT10eXBlb2YgdCYmdCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O3ZhciBpPU9iamVjdC5jcmVhdGUobnVsbCk7aWYocy5yKGkpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpLFwiZGVmYXVsdFwiLHtlbnVtZXJhYmxlOiEwLHZhbHVlOnR9KSwyJmUmJlwic3RyaW5nXCIhPXR5cGVvZiB0KWZvcih2YXIgbiBpbiB0KXMuZChpLG4sZnVuY3Rpb24oZSl7cmV0dXJuIHRbZV19LmJpbmQobnVsbCxuKSk7cmV0dXJuIGl9LHMubj1mdW5jdGlvbihlKXt2YXIgdD1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gcy5kKHQsXCJhXCIsdCksdH0scy5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSxzLnA9XCJcIixzKHMucz0yKS5kZWZhdWx0O2Z1bmN0aW9uIHMoZSl7aWYobltlXSlyZXR1cm4gbltlXS5leHBvcnRzO3ZhciB0PW5bZV09e2k6ZSxsOiExLGV4cG9ydHM6e319O3JldHVybiBpW2VdLmNhbGwodC5leHBvcnRzLHQsdC5leHBvcnRzLHMpLHQubD0hMCx0LmV4cG9ydHN9dmFyIGksbn0pO2V4cG9ydCBkZWZhdWx0IGV4cG9ydHMuU2xpbVNlbGVjdCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG4gIHJldHVybiBhcnIyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHRvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGtleSA9IHRvUHJvcGVydHlLZXkoa2V5KTtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHtcbiAgaWYgKF90eXBlb2YoaW5wdXQpICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChfdHlwZW9mKHJlcykgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7XG4gIHJldHVybiBfdHlwZW9mKGtleSkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG8pIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gdHlwZW9mIG87XG4gIH0gOiBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiBvICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG8uY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvO1xuICB9LCBfdHlwZW9mKG8pO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2NyaXB0LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbInJlbW92ZUR1cGxpY2F0ZXMiLCJlcXVhbHNJZ25vcmVDYXNlIiwiYXBwcyIsImV4dGVuZEZpbHRlciIsImFkZEFwcCIsIm9iaiIsImR1cGxpY2F0ZXMiLCJmaWx0ZXIiLCJhcHAiLCJuYW1lIiwid2Vic2l0ZSIsImxlbmd0aCIsInB1c2giLCJfYXBwJGltYWdlcyIsIl9hcHAkbGFuZ3VhZ2VzIiwiX2FwcCRjb3ZlcmFnZSIsIl9hcHAkdG9waWNzIiwiX2FwcCRwbGF0Zm9ybSIsImxhc3RSZWxlYXNlIiwiZGVzY3JpcHRpb24iLCJpbWFnZXMiLCJhcHBseSIsIl90b0NvbnN1bWFibGVBcnJheSIsImltYWdlV2lraSIsImxhbmd1YWdlcyIsImNvdmVyYWdlIiwidG9waWNzIiwicGxhdGZvcm0iLCJkb2N1bWVudGF0aW9uIiwidGVzdCIsInNvdXJjZSIsImxhc3RDaGFuZ2UiLCJ0b1VwcGVyQ2FzZSIsImNvbmNhdCIsImF1dGhvciIsInNvdXJjZUNvZGUiLCJpbnN0YWxsIiwiYXNpbiIsImZEcm9pZElEIiwiZ29vZ2xlUGxheUlEIiwiaHVhd2VpQXBwR2FsbGVyeUlEIiwiYXBwbGVTdG9yZUlEIiwibWFjQXBwU3RvcmVJRCIsIm1pY3Jvc29mdEFwcElEIiwicmVxdWVzdFRlbXBsYXRlcyIsInRyYW5zZm9ybSIsInRyYW5zZm9ybVNvZnR3YXJlIiwidHJhbnNmb3JtU2VydmljZUl0ZW0iLCJ0cmFuc2Zvcm1MYXllciIsInNodWZmbGUiLCJlcXVhbHNZZXMiLCJjb250YWluc09mZmxpbmVMaW5rIiwibG9hZEFwcHMiLCJfeCIsIl9sb2FkQXBwcyIsImFyZ3VtZW50cyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwiZG9VcGRhdGUiLCJsYW5ndWFnZSIsInNlcnZpY2VJdGVtT2JqZWN0c1JlcXVlc3QiLCJsYXllck9iamVjdHNSZXF1ZXN0Iiwic29mdHdhcmVPYmplY3RzUmVxdWVzdCIsInNlcnZpY2VJdGVtT2JqZWN0cyIsIl9pdGVyYXRvciIsIl9zdGVwIiwiX3NvdXJjZSIsImxheWVyT2JqZWN0cyIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJfc291cmNlMiIsIl9vYmoiLCJzb2Z0d2FyZU9iamVjdHMiLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwiX3NvdXJjZTMiLCJfb2JqMiIsInByb2plY3RPYmplY3RzIiwiX2l0ZXJhdG9yNCIsIl9zdGVwNCIsIl9vYmozIiwiX2FyZ3MiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwidW5kZWZpbmVkIiwic2VudCIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwicyIsIm4iLCJkb25lIiwidmFsdWUiLCJlcnIiLCJlIiwiZiIsIndpbmRvdyIsInRhZ0luZm9Qcm9qZWN0c1Jlc3BvbnNlIiwiZGF0YSIsInByb2plY3RfdXJsIiwiaWNvbl91cmwiLCJkb2NfdXJsIiwiZGlzcGxheU5hbWUiLCJ1cmwiLCJkYXRhX3VudGlsIiwic3RvcCIsImdldEpzb24iLCJmaW5kQ2xvc2luZ0JyYWNrZXRJbmRleCIsIl94MiIsIl9yZXF1ZXN0VGVtcGxhdGVzIiwidGVtcGxhdGUiLCJvYmplY3RzIiwiY29uIiwiX3Jlc3BvbnNlJGNvbnRpbnVlIiwicGFyYW1zIiwicmVzcG9uc2UiLCJsaXN0IiwiZWl0aXRsZSIsImVpbGltaXQiLCJlaWNvbnRpbnVlIiwib3NtTWVkaWFBcGlRdWVyeSIsInQwIiwidDEiLCJ0MiIsInByb2Nlc3NQYWdlc0J5VGVtcGxhdGVSZXN1bHQiLCJ0MyIsInQ0IiwiY2FsbCIsImFicnVwdCIsIl94MyIsIl9vc21NZWRpYUFwaVF1ZXJ5IiwiX2NhbGxlZTIiLCJiYXNlIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiX3g0IiwiX3g1IiwiX3g2IiwiX3Byb2Nlc3NQYWdlc0J5VGVtcGxhdGVSZXN1bHQiLCJfY2FsbGVlMyIsInBhZ2VzIiwiaWRzIiwicCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInF1ZXJ5IiwiZW1iZWRkZWRpbiIsImtleXMiLCJ0aXRsZSIsInBhZ2VpZCIsIlJlZ0V4cCIsImxvYWRQYWdlcyIsInQ1IiwidDYiLCJ0NyIsInQ4IiwidDkiLCJ0MTAiLCJ0MTEiLCJfeDciLCJfeDgiLCJfbG9hZFBhZ2VzIiwiX2NhbGxlZTQiLCJjb250ZW50IiwicGFnZU9iamVjdHMiLCJvIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwicHJvcCIsInJ2cHJvcCIsInBhZ2VpZHMiLCJqb2luIiwicnZzbG90cyIsInJldmlzaW9ucyIsInNsb3RzIiwibWFpbiIsInBhcnNlUGFnZSIsInNvdXJjZVdpa2kiLCJ0aW1lc3RhbXAiLCJyZXBsYWNlIiwicmVnZXhUZW1wbGF0ZSIsInN0YXJ0Iiwic2VhcmNoIiwidGVtcGxhdGVDb250ZW50Iiwic3Vic3RyaW5nIiwiY2xvc2luZyIsImluZGV4T2YiLCJ0cmltIiwicGFyc2VUZW1wbGF0ZVRvT2JqZWN0IiwicHJvcHMiLCJzcGxpdCIsInNoaWZ0IiwicGFpciIsInRvV2lraW1lZGlhVXJsIiwidG9XaWtpVXJsIiwidG9VcmwiLCJsYW5ndWFnZVZhbHVlVG9EaXNwbGF5IiwiYXBwZW5kRnVsbFN0b3AiLCJ0b0RhdGUiLCJwcm9jZXNzV2lraVRleHQiLCJleHRyYWN0UmVwbyIsInNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgiLCJleHRyYWN0V2Vic2l0ZSIsImV4dHJhY3ROYW1lV2Vic2l0ZVdpa2kiLCJ3aWtpIiwibWFwIiwidiIsImxhbmd1YWdlc1VybCIsImxpY2Vuc2UiLCJzb3J0IiwiZmlyc3RMZXR0ZXJUb1VwcGVyQ2FzZSIsInN0YXJ0c1dpdGhJZ25vcmVDYXNlIiwiZXh0cmFjdExhbmd1YWdlQ29kZUZyb21UZW1wbGF0ZSIsImxpYnJlIiwicGxhdGZvcm1WYWx1ZVRvRGlzcGxheSIsInNvbWUiLCJfc291cmNlJGxpY2Vuc2UiLCJfb2JqJHRvcGljcyIsIl9vYmokdG9waWNzMiIsIl9vYmokdG9waWNzMyIsImdyYXRpcyIsIm1hdGNoIiwicHJpY2UiLCJ0b1ZhbHVlcyIsIm1hcERhdGEiLCJkYXRhc291cmNlIiwicm90YXRlTWFwIiwic2hvd1dlYnNpdGUiLCJzaG93UGhvbmVOdW1iZXIiLCJzaG93T3BlbmluZ0hvdXJzIiwicm91dGluZyIsImNyZWF0ZVJvdXRlTWFudWFsbHkiLCJjYWxjdWxhdGVSb3V0ZSIsImNyZWF0ZVJvdXRlVmlhV2F5cG9pbnRzIiwicHJvZmlsZXMiLCJ0dXJuUmVzdHJpY3Rpb25zIiwiY2FsY3VsYXRlUm91dGVPZmZsaW5lIiwicm91dGluZ1Byb3ZpZGVycyIsImF2b2lkVHJhZmZpYyIsInRyYWZmaWNQcm92aWRlciIsIm5hdmlnYXRpbmciLCJmaW5kTG9jYXRpb24iLCJmaW5kTmVhcmJ5UE9JIiwibmF2VG9Qb2ludCIsInZvaWNlIiwia2VlcE9uUm9hZCIsInR1cm5MYW5lcyIsIndpdGhvdXRHUFMiLCJwcmVkZWZpbmVkUm91dGUiLCJ0cmFja2luZyIsImN1c3RvbUludGVydmFsIiwidHJhY2tGb3JtYXRzIiwiZ2VvdGFnZ2luZyIsImZhc3RXYXlQb2ludEFkZGluZyIsInVwbG9hZEdQWCIsIm1vbml0b3JpbmciLCJzaG93VHJhY2siLCJzaG93RXhpc3RpbmdUcmFjayIsInNob3dBbHRpdHVkZURpYWdyYW0iLCJzaG93RE9QIiwic2hvd1NhdGVsbGl0ZXMiLCJzaG93Tk1FQWxpdmUiLCJzaG93U3BlZWQiLCJzZW5kUG9zaXRpb24iLCJlZGl0aW5nIiwiYWRkUE9JIiwiZWRpdFBPSSIsImFkZFdheSIsImVkaXRHZW9tIiwiZWRpdFRhZ3MiLCJlZGl0UmVsYXRpb25zIiwidmlld05vdGVzIiwiY3JlYXRlTm90ZXMiLCJlZGl0Tm90ZXMiLCJlZGl0U291cmNlIiwib2Zmc2V0REJzdXBwb3J0IiwidXBsb2FkT1NNRGF0YSIsInJlbmRlcmluZyIsInJlbmRlcmVyT3V0cHV0Rm9ybWF0cyIsImFjY2Vzc2liaWxpdHkiLCJ0ZXh0T25seVVJIiwiYnJhaWxsZVVJIiwiZXhwbG9yZXJNb2RlIiwicHVibGljVHJhbnNwb3J0TW9kZSIsImRhbmdlcldhcm5pbmdzIiwic2NyZWVuUmVhZGVyIiwic2NyZWVuUmVhZGVyTGFuZyIsImVudHJ5IiwiaW5kZXgiLCJoYXNWYWx1ZSIsIl9vYmokdG9waWNzNCIsImV4ZWMiLCJwYWdlTmFtZSIsInJlZ2V4IiwidGV4dCIsImNyZWF0ZUVsZW1lbnQiLCJnZXRIdG1sRWxlbWVudCIsIlNsaW1TZWxlY3QiLCJsYXp5TG9hZEltYWdlcyIsInNldCIsImdldCIsInJlbmRlciIsInJlbmRlckxpc3RWaWV3IiwiaW5jbHVkZXMiLCJ0ZXh0VG9Db2xvciIsImZpbmRHZXRQYXJhbWV0ZXJGcm9tSGFzaCIsImZpbmRHZXRQYXJhbWV0ZXIiLCJnZXRQYXJhbWV0ZXJGcm9tVXJsIiwiU29sdmVyIiwiQ29sb3IiLCJlZGl0IiwibW9iaWxlIiwibmF2aWdhdGlvbiIsInJlbmRlckNvbXBhcmVWaWV3IiwibGF6eUluaXRNb3JlIiwib25VcGRhdGUiLCJ0b3BpY1NlbGVjdCIsInNlbGVjdCIsInBsYWNlaG9sZGVyIiwib25DaGFuZ2UiLCJwbGF0Zm9ybVNlbGVjdCIsImxhbmd1YWdlU2VsZWN0IiwiY292ZXJhZ2VTZWxlY3QiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhdGVnb3J5IiwiY2F0ZWdvcnlTZWxlY3QiLCJzaG93U2VhcmNoIiwiaW5uZXJIVE1MIiwiYyIsIl9vYmplY3RTcHJlYWQiLCJzZWxlY3RlZCIsIm5ld0FwcHMiLCJzdGF0ZSIsInJlc2V0IiwiY2hlY2tlZCIsInVwZGF0ZSIsImZyZWVPbmx5IiwidG9waWMiLCJmaWx0ZXJlZEFwcHMiLCJzbGljZSIsImEiLCJiIiwibmFtZUEiLCJuYW1lQiIsIl9hJGxhc3RSZWxlYXNlIiwiX2IkbGFzdFJlbGVhc2UiLCJsYXRlc3RBcHBzIiwiX2xvb3AiLCJ0b3BpY1VwIiwidCIsInBsYXRmb3JtVXAiLCJsYW5ndWFnZVVwIiwiY292ZXJhZ2VVcCIsImZvckVhY2giLCJyZWdpb25zIiwiY2F0ZWdvcmllZEFwcHMiLCJ0b3BpY0RhdGEiLCJwbGF0Zm9ybURhdGEiLCJsYW5ndWFnZURhdGEiLCJjb3ZlcmFnZURhdGEiLCJsIiwic2V0RGF0YSIsInByZXBhcmVBcnJheUZvclNlbGVjdCIsImxhbmciLCJzZXRUaW1lb3V0Iiwic2ltaWxhckFwcHMiLCJldmVyeSIsInNpbWlsYXJUYWciLCJhcHBlbmRDaGlsZCIsIl9pdGVyYXRvcjUiLCJfc3RlcDUiLCJ0b0xvd2VyQ2FzZSIsInNhdmVBcHBDYXRhbG9nIiwiRGF0ZSIsImNvbnNvbGUiLCJpbmZvIiwicHJpbnRKc29uTGQiLCJKU09OIiwic3RyaW5naWZ5IiwiX2FwcCRpbnN0YWxsJGFwcGxlU3RvIiwiX2FwcCRpbnN0YWxsJG1hY0FwcFN0IiwiaW1hZ2UiLCJkb3dubG9hZFVybCIsInN0YXJ0c1dpdGgiLCJkYXRlUHVibGlzaGVkIiwiYXBwbGljYXRpb25DYXRlZ29yeSIsIm9wZXJhdGluZ1N5c3RlbSIsImdldEFwcENhdGFsb2ciLCJfZ2V0QXBwQ2F0YWxvZyIsImRhdGUiLCJkYXkiLCJ2YWx1ZU9mIiwibm93IiwiZGVmYXVsdENvbG9yIiwiciIsImciLCJzb2x2ZSIsIm5hbWVzIiwibmFtZUNvdW50cyIsIl9pdGVyYXRvcjYiLCJfc3RlcDYiLCJfbG9vcDIiLCJuYW1lQ291bnRGaWx0ZXJlZCIsIm5jIiwiY291bnQiLCJnZXRMb2NhbGl6ZWRWYWx1ZSIsInNldHRpbmciLCJsb2NhbGUiLCJwYXJ0cyIsIk9iamVjdCIsImNvZGUiLCJkaXNwbGF5IiwiTnVtYmVyIiwiaXNOYU4iLCJwYXJzZUludCIsInJlcGxhY2VBbGwiLCJleHRyYWN0TGFuZ3VhZ2VDb2RlRnJvbUxvY2FsIiwiaXNPdmVyZmxvd24iLCJlbGVtZW50Iiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0Iiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInNjcm9sbExlZnQiLCJfbGF6eUluaXRNb3JlIiwiY29udGVudEVsZW1lbnQiLCJlbGVtZW50cyIsImkiLCJib3VuZGluZ0NsaWVudFJlY3QiLCJkaXYiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiaCIsInBhcmVudEVsZW1lbnQiLCJoZWlnaHQiLCJyZW1vdmUiLCJfZG9jdW1lbnQkZ2V0RWxlbWVudEIiLCJfZG9jdW1lbnQkZ2V0RWxlbWVudEIyIiwiX2RvY3VtZW50JGdldEVsZW1lbnRCMyIsInNjcm9sbFRvcCIsIl9sYXp5TG9hZEltYWdlcyIsInNvdXJjZXMiLCJzcmMiLCJfZWxlbWVudHMiLCJfaSIsIl9ib3VuZGluZ0NsaWVudFJlY3QiLCJfc291cmNlcyIsIl9zcmMiLCJoYXNBdHRyaWJ1dGUiLCJ0b3AiLCJnZXRBdHRyaWJ1dGUiLCJib2R5IiwiY29udGFpbnMiLCJpc0ltYWdlIiwic2V0QXR0cmlidXRlIiwiZmluaXNoIiwicmVtb3ZlQXR0cmlidXRlIiwiX2lzSW1hZ2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsImltZyIsIkltYWdlIiwiY29tcGxldGUiLCJwbGF0Zm9ybXMiLCJzeW5vbnltIiwidmVyc2lvbiIsInRlbXBsYXRlRGF0YSIsImxhYmVsIiwiZGUiLCJlbiIsInR5cGUiLCJleGFtcGxlIiwicmVxdWlyZWQiLCJhdXRvdmFsdWUiLCJzdGF0dXMiLCJzdWdnZXN0ZWR2YWx1ZXMiLCJzdWdnZXN0ZWQiLCJ3ZWIiLCJyZXBvIiwiYWxpYXNlcyIsImxvZ28iLCJzY3JlZW5zaG90IiwiZ2VucmUiLCJsYW5ndWFnZXN1cmwiLCJmcmFtZXdvcmsiLCJiYldvcmxkSUQiLCJkZXByZWNhdGVkIiwiZmlyZWZveE1hcmtldHBsYWNlSUQiLCJwYXJhbU9yZGVyIiwiZm9ybWF0IiwiYXJyIiwidGFyZ2V0IiwiYXJyYXkiLCJqIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX3JlZiIsImhleFRvUmdiIiwiaGV4Iiwic2hvcnRoYW5kUmVnZXgiLCJfbSIsInJlc3VsdCIsIl9jbGFzc0NhbGxDaGVjayIsIl9jcmVhdGVDbGFzcyIsImtleSIsInRvU3RyaW5nIiwicm91bmQiLCJjbGFtcCIsImh1ZVJvdGF0ZSIsImFuZ2xlIiwiUEkiLCJzaW4iLCJjb3MiLCJtdWx0aXBseSIsImdyYXlzY2FsZSIsInNlcGlhIiwic2F0dXJhdGUiLCJtYXRyaXgiLCJuZXdSIiwibmV3RyIsIm5ld0IiLCJicmlnaHRuZXNzIiwibGluZWFyIiwiY29udHJhc3QiLCJzbG9wZSIsImludGVyY2VwdCIsImludmVydCIsImhzbCIsIm1heCIsIm1pbiIsImQiLCJfZGVmaW5lUHJvcGVydHkiLCJ0YXJnZXRIU0wiLCJyZXVzZWRDb2xvciIsInNvbHZlTmFycm93Iiwic29sdmVXaWRlIiwidmFsdWVzIiwibG9zcyIsImNzcyIsIkEiLCJiZXN0IiwiSW5maW5pdHkiLCJpbml0aWFsIiwic3BzYSIsIndpZGUiLCJBMSIsIml0ZXJzIiwiYWxwaGEiLCJnYW1tYSIsImJlc3RMb3NzIiwiZGVsdGFzIiwiQXJyYXkiLCJoaWdoQXJncyIsImxvd0FyZ3MiLCJrIiwiY2siLCJwb3ciLCJsb3NzRGlmZiIsImFrIiwiZml4IiwiaWR4IiwiZmlsdGVycyIsImNvbG9yIiwiY29sb3JIU0wiLCJhYnMiLCJmbXQiLCJtdWx0aXBsaWVyIiwibW9iaWxlUGxhdGZvcm1zIiwic2VsZWN0b3JzIiwicXVlcnlTZWxlY3RvciIsImdldEh0bWxFbGVtZW50cyIsInRhZyIsIl9lbGVtZW50JGNsYXNzTGlzdCIsImNsYXNzTmFtZXMiLCJtZDUiLCJodHRwUmVnZXgiLCJzaXplIiwiZmlsZU5hbWUiLCJnZW5lcmF0ZU9zbVdpa2ltZWRpYVVybHMiLCJnZW5lcmF0ZUNvbW1vbnNXaWtpbWVkaWFVcmxzIiwiZ2VuZXJhdGVXaWtpbWVkaWFVcmxzIiwiZGVjb2RlVVJJIiwiaGFzaCIsImVuZHNXaXRoIiwidXRpbFFzU3RyaW5nIiwiX2dldEpzb24iLCJmZXRjaCIsImhlYWRlcnMiLCJBY2NlcHQiLCJqc29uIiwicmVuZGVySW1hZ2UiLCJkZWZhdWx0SW1hZ2UiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInBhcnNlIiwiX3VudXNlZCIsIl9sZW4iLCJfa2V5IiwiX3ZhbHVlcyIsInNlYXJjaFN0cmluZyIsInBvc2l0aW9uIiwic3RyIiwicG9zIiwiRXJyb3IiLCJsZXZlbCIsImNoYXJDb2RlQXQiLCJub2VuY29kZSIsInNvZnRFbmNvZGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJkZWNvZGVVUklDb21wb25lbnQiLCJwYXJhbWV0ZXJOYW1lIiwidG1wIiwibG9jYXRpb24iLCJpdGVtIiwicmVuZGVyQmFkZ2VzIiwidG9XaWtpVmFsdWUiLCJyZW5kZXJHcm91cCIsInJlbmRlclRvSHRtbCIsInJlbmRlclRvV2lraSIsImNlbnRlcmVkIiwibW9yZSIsImlkIiwiZXh0ZW5kZWRQYXJhbXMiLCJfaWQiLCJpc0FycmF5Iiwibm90Tm8iLCJfaWQyIiwiX2lkMyIsIl9pZDQiLCJjcmVhdGVQYXJhbUVsZW1lbnQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInRvZ2dsZSIsImdyb3VwIiwidW5rbm93biIsIm1vcmVCdXR0b24iLCJtb3JlSW5mb3MiLCJldiIsInByZXZlbnREZWZhdWx0IiwicmVuZGVyQmFkZ2UiLCJiYWNrZ3JvdW5kIiwieWlxIiwiaXNVbmtub3duIiwidG9XaWtpVGFibGUiLCJhcHBXaXRoRmllbGRzIiwicm93cyIsIndpa2lUYWJsZSIsIl9hcHAkc291cmNlJGZpbmQiLCJfYXBwJHNvdXJjZSRmaW5kMiIsIl9hcHAkc291cmNlJGZpbmQzIiwiZmluZCIsInRvSVNPU3RyaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==