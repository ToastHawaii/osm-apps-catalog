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

/***/ "./node_modules/charenc/charenc.js":
/*!*****************************************!*\
  !*** ./node_modules/charenc/charenc.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ "./node_modules/crypt/crypt.js":
/*!*************************************!*\
  !*** ./node_modules/crypt/crypt.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ "./node_modules/md5/md5.js":
/*!*********************************!*\
  !*** ./node_modules/md5/md5.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(/*! crypt */ "./node_modules/crypt/crypt.js"),
      utf8 = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").utf8,
      isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js"),
      bin = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").bin,

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
    else if (!Array.isArray(message))
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

/***/ "./node_modules/slim-select/dist/slimselect.min.js":
/*!*********************************************************!*\
  !*** ./node_modules/slim-select/dist/slimselect.min.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(window,function(){return s={},n.m=i=[function(e,t,i){"use strict";function s(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var i=document.createEvent("CustomEvent");return i.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),i}var n;t.__esModule=!0,t.hasClassInTree=function(e,t){function s(e,t){return t&&e&&e.classList&&e.classList.contains(t)?e:null}return s(e,t)||function e(t,i){return t&&t!==document?s(t,i)?t:e(t.parentNode,i):null}(e,t)},t.ensureElementInView=function(e,t){var i=e.scrollTop+e.offsetTop,s=i+e.clientHeight,n=t.offsetTop,a=n+t.clientHeight;n<i?e.scrollTop-=i-n:s<a&&(e.scrollTop+=a-s)},t.putContent=function(e,t,i){var s=e.offsetHeight,n=e.getBoundingClientRect(),a=i?n.top:n.top-s,o=i?n.bottom:n.bottom+s;return a<=0?"below":o>=window.innerHeight?"above":i?t:"below"},t.debounce=function(n,a,o){var l;return void 0===a&&(a=100),void 0===o&&(o=!1),function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var i=self,s=o&&!l;clearTimeout(l),l=setTimeout(function(){l=null,o||n.apply(i,e)},a),s&&n.apply(i,e)}},t.isValueInArrayOfObjects=function(e,t,i){if(!Array.isArray(e))return e[t]===i;for(var s=0,n=e;s<n.length;s++){var a=n[s];if(a&&a[t]&&a[t]===i)return!0}return!1},t.highlight=function(e,t,i){var s=e,n=new RegExp("("+t.trim()+")(?![^<]*>[^<>]*</)","i");if(!e.match(n))return e;var a=e.match(n).index,o=a+e.match(n)[0].toString().length,l=e.substring(a,o);return s=s.replace(n,'<mark class="'+i+'">'+l+"</mark>")},t.kebabCase=function(e){var t=e.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,function(e){return"-"+e.toLowerCase()});return e[0]===e[0].toUpperCase()?t.substring(1):t},"function"!=typeof(n=window).CustomEvent&&(s.prototype=n.Event.prototype,n.CustomEvent=s)},function(e,t,i){"use strict";t.__esModule=!0;var s=(n.prototype.newOption=function(e){return{id:e.id?e.id:String(Math.floor(1e8*Math.random())),value:e.value?e.value:"",text:e.text?e.text:"",innerHTML:e.innerHTML?e.innerHTML:"",selected:!!e.selected&&e.selected,display:void 0===e.display||e.display,disabled:!!e.disabled&&e.disabled,placeholder:!!e.placeholder&&e.placeholder,class:e.class?e.class:void 0,data:e.data?e.data:{},mandatory:!!e.mandatory&&e.mandatory}},n.prototype.add=function(e){this.data.push({id:String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:"",selected:!1,display:!0,disabled:!1,placeholder:!1,class:void 0,mandatory:e.mandatory,data:{}})},n.prototype.parseSelectData=function(){this.data=[];for(var e=0,t=this.main.select.element.childNodes;e<t.length;e++){var i=t[e];if("OPTGROUP"===i.nodeName){for(var s={label:i.label,options:[]},n=0,a=i.childNodes;n<a.length;n++){var o=a[n];if("OPTION"===o.nodeName){var l=this.pullOptionData(o);s.options.push(l),l.placeholder&&""!==l.text.trim()&&(this.main.config.placeholderText=l.text)}}this.data.push(s)}else"OPTION"===i.nodeName&&(l=this.pullOptionData(i),this.data.push(l),l.placeholder&&""!==l.text.trim()&&(this.main.config.placeholderText=l.text))}},n.prototype.pullOptionData=function(e){return{id:!!e.dataset&&e.dataset.id||String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:e.innerHTML,selected:e.selected,disabled:e.disabled,placeholder:"true"===e.dataset.placeholder,class:e.className,style:e.style.cssText,data:e.dataset,mandatory:!!e.dataset&&"true"===e.dataset.mandatory}},n.prototype.setSelectedFromSelect=function(){if(this.main.config.isMultiple){for(var e=[],t=0,i=this.main.select.element.options;t<i.length;t++){var s=i[t];if(s.selected){var n=this.getObjectFromData(s.value,"value");n&&n.id&&e.push(n.id)}}this.setSelected(e,"id")}else{var a=this.main.select.element;if(-1!==a.selectedIndex){var o=a.options[a.selectedIndex].value;this.setSelected(o,"value")}}},n.prototype.setSelected=function(e,t){void 0===t&&(t="id");for(var i=0,s=this.data;i<s.length;i++){var n=s[i];if(n.hasOwnProperty("label")){if(n.hasOwnProperty("options")){var a=n.options;if(a)for(var o=0,l=a;o<l.length;o++){var r=l[o];r.placeholder||(r.selected=this.shouldBeSelected(r,e,t))}}}else n.selected=this.shouldBeSelected(n,e,t)}},n.prototype.shouldBeSelected=function(e,t,i){if(void 0===i&&(i="id"),Array.isArray(t))for(var s=0,n=t;s<n.length;s++){var a=n[s];if(i in e&&String(e[i])===String(a))return!0}else if(i in e&&String(e[i])===String(t))return!0;return!1},n.prototype.getSelected=function(){for(var e={text:"",placeholder:this.main.config.placeholderText},t=[],i=0,s=this.data;i<s.length;i++){var n=s[i];if(n.hasOwnProperty("label")){if(n.hasOwnProperty("options")){var a=n.options;if(a)for(var o=0,l=a;o<l.length;o++){var r=l[o];r.selected&&(this.main.config.isMultiple?t.push(r):e=r)}}}else n.selected&&(this.main.config.isMultiple?t.push(n):e=n)}return this.main.config.isMultiple?t:e},n.prototype.addToSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){var i=[],s=this.getSelected();if(Array.isArray(s))for(var n=0,a=s;n<a.length;n++){var o=a[n];i.push(o[t])}i.push(e),this.setSelected(i,t)}},n.prototype.removeFromSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){for(var i=[],s=0,n=this.getSelected();s<n.length;s++){var a=n[s];String(a[t])!==String(e)&&i.push(a[t])}this.setSelected(i,t)}},n.prototype.onDataChange=function(){this.main.onChange&&this.isOnChangeEnabled&&this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())))},n.prototype.getObjectFromData=function(e,t){void 0===t&&(t="id");for(var i=0,s=this.data;i<s.length;i++){var n=s[i];if(t in n&&String(n[t])===String(e))return n;if(n.hasOwnProperty("options")&&n.options)for(var a=0,o=n.options;a<o.length;a++){var l=o[a];if(String(l[t])===String(e))return l}}return null},n.prototype.search=function(n){if(""!==(this.searchValue=n).trim()){var a=this.main.config.searchFilter,e=this.data.slice(0);n=n.trim();var t=e.map(function(e){if(e.hasOwnProperty("options")){var t=e,i=[];if(t.options&&(i=t.options.filter(function(e){return a(e,n)})),0!==i.length){var s=Object.assign({},t);return s.options=i,s}}return e.hasOwnProperty("text")&&a(e,n)?e:null});this.filtered=t.filter(function(e){return e})}else this.filtered=null},n);function n(e){this.contentOpen=!1,this.contentPosition="below",this.isOnChangeEnabled=!0,this.main=e.main,this.searchValue="",this.data=[],this.filtered=null,this.parseSelectData(),this.setSelectedFromSelect()}function r(e){return void 0!==e.text||(console.error("Data object option must have at least have a text value. Check object: "+JSON.stringify(e)),!1)}t.Data=s,t.validateData=function(e){if(!e)return console.error("Data must be an array of objects"),!1;for(var t=0,i=0,s=e;i<s.length;i++){var n=s[i];if(n.hasOwnProperty("label")){if(n.hasOwnProperty("options")){var a=n.options;if(a)for(var o=0,l=a;o<l.length;o++){r(l[o])||t++}}}else r(n)||t++}return 0===t},t.validateOption=r},function(e,t,i){"use strict";t.__esModule=!0;var s=i(3),n=i(4),a=i(5),o=i(1),l=i(0),r=(c.prototype.validate=function(e){var t="string"==typeof e.select?document.querySelector(e.select):e.select;if(!t)throw new Error("Could not find select element");if("SELECT"!==t.tagName)throw new Error("Element isnt of type select");return t},c.prototype.selected=function(){if(this.config.isMultiple){for(var e=[],t=0,i=n=this.data.getSelected();t<i.length;t++){var s=i[t];e.push(s.value)}return e}var n;return(n=this.data.getSelected())?n.value:""},c.prototype.set=function(e,t,i,s){void 0===t&&(t="value"),void 0===i&&(i=!0),void 0===s&&(s=!0),this.config.isMultiple&&!Array.isArray(e)?this.data.addToSelected(e,t):this.data.setSelected(e,t),this.select.setValue(),this.data.onDataChange(),this.render(),i&&this.close()},c.prototype.setSelected=function(e,t,i,s){void 0===t&&(t="value"),void 0===i&&(i=!0),void 0===s&&(s=!0),this.set(e,t,i,s)},c.prototype.setData=function(e){if(o.validateData(e)){var t=JSON.parse(JSON.stringify(e)),i=this.data.getSelected();if(this.config.isAjax&&i)if(this.config.isMultiple)for(var s=0,n=i.reverse();s<n.length;s++){var a=n[s];t.unshift(a)}else t.unshift(this.data.getSelected()),t.unshift({text:"",placeholder:!0});this.select.create(t),this.data.parseSelectData(),this.data.setSelectedFromSelect()}else console.error("Validation problem on: #"+this.select.element.id)},c.prototype.addData=function(e){o.validateData([e])?(this.data.add(this.data.newOption(e)),this.select.create(this.data.data),this.data.parseSelectData(),this.data.setSelectedFromSelect(),this.render()):console.error("Validation problem on: #"+this.select.element.id)},c.prototype.open=function(){var e=this;if(this.config.isEnabled&&!this.data.contentOpen){if(this.beforeOpen&&this.beforeOpen(),this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.plus.classList.add("ss-cross"):this.slim.singleSelected&&(this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-up")),this.slim[this.config.isMultiple?"multiSelected":"singleSelected"].container.classList.add("above"===this.data.contentPosition?this.config.openAbove:this.config.openBelow),this.config.addToBody){var t=this.slim.container.getBoundingClientRect();this.slim.content.style.top=t.top+t.height+window.scrollY+"px",this.slim.content.style.left=t.left+window.scrollX+"px",this.slim.content.style.width=t.width+"px"}if(this.slim.content.classList.add(this.config.open),"up"===this.config.showContent.toLowerCase()||"down"!==this.config.showContent.toLowerCase()&&"above"===l.putContent(this.slim.content,this.data.contentPosition,this.data.contentOpen)?this.moveContentAbove():this.moveContentBelow(),!this.config.isMultiple){var i=this.data.getSelected();if(i){var s=i.id,n=this.slim.list.querySelector('[data-id="'+s+'"]');n&&l.ensureElementInView(this.slim.list,n)}}setTimeout(function(){e.data.contentOpen=!0,e.config.searchFocus&&e.slim.search.input.focus(),e.afterOpen&&e.afterOpen()},this.config.timeoutDelay)}},c.prototype.close=function(){var e=this;this.data.contentOpen&&(this.beforeClose&&this.beforeClose(),this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.plus.classList.remove("ss-cross")):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-up")),this.slim.content.classList.remove(this.config.open),this.data.contentOpen=!1,this.search(""),setTimeout(function(){e.slim.content.removeAttribute("style"),e.data.contentPosition="below",e.config.isMultiple&&e.slim.multiSelected?(e.slim.multiSelected.container.classList.remove(e.config.openAbove),e.slim.multiSelected.container.classList.remove(e.config.openBelow)):e.slim.singleSelected&&(e.slim.singleSelected.container.classList.remove(e.config.openAbove),e.slim.singleSelected.container.classList.remove(e.config.openBelow)),e.slim.search.input.blur(),e.afterClose&&e.afterClose()},this.config.timeoutDelay))},c.prototype.moveContentAbove=function(){var e=0;this.config.isMultiple&&this.slim.multiSelected?e=this.slim.multiSelected.container.offsetHeight:this.slim.singleSelected&&(e=this.slim.singleSelected.container.offsetHeight);var t=e+this.slim.content.offsetHeight-1;this.slim.content.style.margin="-"+t+"px 0 0 0",this.slim.content.style.height=t-e+1+"px",this.slim.content.style.transformOrigin="center bottom",this.data.contentPosition="above",this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.container.classList.add(this.config.openAbove)):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.container.classList.add(this.config.openAbove))},c.prototype.moveContentBelow=function(){this.data.contentPosition="below",this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.add(this.config.openBelow)):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.add(this.config.openBelow))},c.prototype.enable=function(){this.config.isEnabled=!0,this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.container.classList.remove(this.config.disabled):this.slim.singleSelected&&this.slim.singleSelected.container.classList.remove(this.config.disabled),this.select.triggerMutationObserver=!1,this.select.element.disabled=!1,this.slim.search.input.disabled=!1,this.select.triggerMutationObserver=!0},c.prototype.disable=function(){this.config.isEnabled=!1,this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.container.classList.add(this.config.disabled):this.slim.singleSelected&&this.slim.singleSelected.container.classList.add(this.config.disabled),this.select.triggerMutationObserver=!1,this.select.element.disabled=!0,this.slim.search.input.disabled=!0,this.select.triggerMutationObserver=!0},c.prototype.search=function(t){if(this.data.searchValue!==t)if(this.slim.search.input.value=t,this.config.isAjax){var i=this;this.config.isSearching=!0,this.render(),this.ajax&&this.ajax(t,function(e){i.config.isSearching=!1,Array.isArray(e)?(e.unshift({text:"",placeholder:!0}),i.setData(e),i.data.search(t),i.render()):"string"==typeof e?i.slim.options(e):i.render()})}else this.data.search(t),this.render()},c.prototype.setSearchText=function(e){this.config.searchText=e},c.prototype.render=function(){this.config.isMultiple?this.slim.values():(this.slim.placeholder(),this.slim.deselect()),this.slim.options()},c.prototype.destroy=function(e){void 0===e&&(e=null);var t=e?document.querySelector("."+e+".ss-main"):this.slim.container,i=e?document.querySelector("[data-ssid="+e+"]"):this.select.element;if(t&&i&&(i.style.display="",delete i.dataset.ssid,i.slim=null,t.parentElement&&t.parentElement.removeChild(t),this.config.addToBody)){var s=e?document.querySelector("."+e+".ss-content"):this.slim.content;if(!s)return;document.body.removeChild(s)}},c);function c(e){var t=this;this.ajax=null,this.addable=null,this.beforeOnChange=null,this.onChange=null,this.beforeOpen=null,this.afterOpen=null,this.beforeClose=null,this.afterClose=null;var i=this.validate(e);i.dataset.ssid&&this.destroy(i.dataset.ssid),e.ajax&&(this.ajax=e.ajax),e.addable&&(this.addable=e.addable),this.config=new s.Config({select:i,isAjax:!!e.ajax,showSearch:e.showSearch,searchPlaceholder:e.searchPlaceholder,searchText:e.searchText,searchingText:e.searchingText,searchFocus:e.searchFocus,searchHighlight:e.searchHighlight,searchFilter:e.searchFilter,closeOnSelect:e.closeOnSelect,showContent:e.showContent,placeholderText:e.placeholder,allowDeselect:e.allowDeselect,allowDeselectOption:e.allowDeselectOption,hideSelectedOption:e.hideSelectedOption,deselectLabel:e.deselectLabel,isEnabled:e.isEnabled,valuesUseText:e.valuesUseText,showOptionTooltips:e.showOptionTooltips,selectByGroup:e.selectByGroup,limit:e.limit,timeoutDelay:e.timeoutDelay,addToBody:e.addToBody}),this.select=new n.Select({select:i,main:this}),this.data=new o.Data({main:this}),this.slim=new a.Slim({main:this}),this.select.element.parentNode&&this.select.element.parentNode.insertBefore(this.slim.container,this.select.element.nextSibling),e.data?this.setData(e.data):this.render(),document.addEventListener("click",function(e){e.target&&!l.hasClassInTree(e.target,t.config.id)&&t.close()}),"auto"===this.config.showContent&&window.addEventListener("scroll",l.debounce(function(e){t.data.contentOpen&&("above"===l.putContent(t.slim.content,t.data.contentPosition,t.data.contentOpen)?t.moveContentAbove():t.moveContentBelow())}),!1),e.beforeOnChange&&(this.beforeOnChange=e.beforeOnChange),e.onChange&&(this.onChange=e.onChange),e.beforeOpen&&(this.beforeOpen=e.beforeOpen),e.afterOpen&&(this.afterOpen=e.afterOpen),e.beforeClose&&(this.beforeClose=e.beforeClose),e.afterClose&&(this.afterClose=e.afterClose),this.config.isEnabled||this.disable()}t.default=r},function(e,t,i){"use strict";t.__esModule=!0;var s=(n.prototype.searchFilter=function(e,t){return-1!==e.text.toLowerCase().indexOf(t.toLowerCase())},n);function n(e){this.id="",this.isMultiple=!1,this.isAjax=!1,this.isSearching=!1,this.showSearch=!0,this.searchFocus=!0,this.searchHighlight=!1,this.closeOnSelect=!0,this.showContent="auto",this.searchPlaceholder="Search",this.searchText="No Results",this.searchingText="Searching...",this.placeholderText="Select Value",this.allowDeselect=!1,this.allowDeselectOption=!1,this.hideSelectedOption=!1,this.deselectLabel="x",this.isEnabled=!0,this.valuesUseText=!1,this.showOptionTooltips=!1,this.selectByGroup=!1,this.limit=0,this.timeoutDelay=200,this.addToBody=!1,this.main="ss-main",this.singleSelected="ss-single-selected",this.arrow="ss-arrow",this.multiSelected="ss-multi-selected",this.add="ss-add",this.plus="ss-plus",this.values="ss-values",this.value="ss-value",this.valueText="ss-value-text",this.valueDelete="ss-value-delete",this.content="ss-content",this.open="ss-open",this.openAbove="ss-open-above",this.openBelow="ss-open-below",this.search="ss-search",this.searchHighlighter="ss-search-highlight",this.addable="ss-addable",this.list="ss-list",this.optgroup="ss-optgroup",this.optgroupLabel="ss-optgroup-label",this.optgroupLabelSelectable="ss-optgroup-label-selectable",this.option="ss-option",this.optionSelected="ss-option-selected",this.highlighted="ss-highlighted",this.disabled="ss-disabled",this.hide="ss-hide",this.id="ss-"+Math.floor(1e5*Math.random()),this.style=e.select.style.cssText,this.class=e.select.className.split(" "),this.isMultiple=e.select.multiple,this.isAjax=e.isAjax,this.showSearch=!1!==e.showSearch,this.searchFocus=!1!==e.searchFocus,this.searchHighlight=!0===e.searchHighlight,this.closeOnSelect=!1!==e.closeOnSelect,e.showContent&&(this.showContent=e.showContent),this.isEnabled=!1!==e.isEnabled,e.searchPlaceholder&&(this.searchPlaceholder=e.searchPlaceholder),e.searchText&&(this.searchText=e.searchText),e.searchingText&&(this.searchingText=e.searchingText),e.placeholderText&&(this.placeholderText=e.placeholderText),this.allowDeselect=!0===e.allowDeselect,this.allowDeselectOption=!0===e.allowDeselectOption,this.hideSelectedOption=!0===e.hideSelectedOption,e.deselectLabel&&(this.deselectLabel=e.deselectLabel),e.valuesUseText&&(this.valuesUseText=e.valuesUseText),e.showOptionTooltips&&(this.showOptionTooltips=e.showOptionTooltips),e.selectByGroup&&(this.selectByGroup=e.selectByGroup),e.limit&&(this.limit=e.limit),e.searchFilter&&(this.searchFilter=e.searchFilter),null!=e.timeoutDelay&&(this.timeoutDelay=e.timeoutDelay),this.addToBody=!0===e.addToBody}t.Config=s},function(e,t,i){"use strict";t.__esModule=!0;var s=i(0),n=(a.prototype.setValue=function(){if(this.main.data.getSelected()){if(this.main.config.isMultiple)for(var e=this.main.data.getSelected(),t=0,i=this.element.options;t<i.length;t++){var s=i[t];s.selected=!1;for(var n=0,a=e;n<a.length;n++)a[n].value===s.value&&(s.selected=!0)}else e=this.main.data.getSelected(),this.element.value=e?e.value:"";this.main.data.isOnChangeEnabled=!1,this.element.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this.main.data.isOnChangeEnabled=!0}},a.prototype.addAttributes=function(){this.element.tabIndex=-1,this.element.style.display="none",this.element.dataset.ssid=this.main.config.id},a.prototype.addEventListeners=function(){var t=this;this.element.addEventListener("change",function(e){t.main.data.setSelectedFromSelect(),t.main.render()})},a.prototype.addMutationObserver=function(){var t=this;this.main.config.isAjax||(this.mutationObserver=new MutationObserver(function(e){t.triggerMutationObserver&&(t.main.data.parseSelectData(),t.main.data.setSelectedFromSelect(),t.main.render(),e.forEach(function(e){"class"===e.attributeName&&t.main.slim.updateContainerDivClass(t.main.slim.container)}))}),this.observeMutationObserver())},a.prototype.observeMutationObserver=function(){this.mutationObserver&&this.mutationObserver.observe(this.element,{attributes:!0,childList:!0,characterData:!0})},a.prototype.disconnectMutationObserver=function(){this.mutationObserver&&this.mutationObserver.disconnect()},a.prototype.create=function(e){this.element.innerHTML="";for(var t=0,i=e;t<i.length;t++){var s=i[t];if(s.hasOwnProperty("options")){var n=s,a=document.createElement("optgroup");if(a.label=n.label,n.options)for(var o=0,l=n.options;o<l.length;o++){var r=l[o];a.appendChild(this.createOption(r))}this.element.appendChild(a)}else this.element.appendChild(this.createOption(s))}},a.prototype.createOption=function(t){var i=document.createElement("option");return i.value=""!==t.value?t.value:t.text,i.innerHTML=t.innerHTML||t.text,t.selected&&(i.selected=t.selected),!1===t.display&&(i.style.display="none"),t.disabled&&(i.disabled=!0),t.placeholder&&i.setAttribute("data-placeholder","true"),t.mandatory&&i.setAttribute("data-mandatory","true"),t.class&&t.class.split(" ").forEach(function(e){i.classList.add(e)}),t.data&&"object"==typeof t.data&&Object.keys(t.data).forEach(function(e){i.setAttribute("data-"+s.kebabCase(e),t.data[e])}),i},a);function a(e){this.triggerMutationObserver=!0,this.element=e.select,this.main=e.main,this.element.disabled&&(this.main.config.isEnabled=!1),this.addAttributes(),this.addEventListeners(),this.mutationObserver=null,this.addMutationObserver(),this.element.slim=e.main}t.Select=n},function(e,t,i){"use strict";t.__esModule=!0;var a=i(0),o=i(1),s=(n.prototype.containerDiv=function(){var e=document.createElement("div");return e.style.cssText=this.main.config.style,this.updateContainerDivClass(e),e},n.prototype.updateContainerDivClass=function(e){this.main.config.class=this.main.select.element.className.split(" "),e.className="",e.classList.add(this.main.config.id),e.classList.add(this.main.config.main);for(var t=0,i=this.main.config.class;t<i.length;t++){var s=i[t];""!==s.trim()&&e.classList.add(s)}},n.prototype.singleSelectedDiv=function(){var t=this,e=document.createElement("div");e.classList.add(this.main.config.singleSelected);var i=document.createElement("span");i.classList.add("placeholder"),e.appendChild(i);var s=document.createElement("span");s.innerHTML=this.main.config.deselectLabel,s.classList.add("ss-deselect"),s.onclick=function(e){e.stopPropagation(),t.main.config.isEnabled&&t.main.set("")},e.appendChild(s);var n=document.createElement("span");n.classList.add(this.main.config.arrow);var a=document.createElement("span");return a.classList.add("arrow-down"),n.appendChild(a),e.appendChild(n),e.onclick=function(){t.main.config.isEnabled&&(t.main.data.contentOpen?t.main.close():t.main.open())},{container:e,placeholder:i,deselect:s,arrowIcon:{container:n,arrow:a}}},n.prototype.placeholder=function(){var e=this.main.data.getSelected();if(null===e||e&&e.placeholder){var t=document.createElement("span");t.classList.add(this.main.config.disabled),t.innerHTML=this.main.config.placeholderText,this.singleSelected&&(this.singleSelected.placeholder.innerHTML=t.outerHTML)}else{var i="";e&&(i=e.innerHTML&&!0!==this.main.config.valuesUseText?e.innerHTML:e.text),this.singleSelected&&(this.singleSelected.placeholder.innerHTML=e?i:"")}},n.prototype.deselect=function(){if(this.singleSelected){if(!this.main.config.allowDeselect)return void this.singleSelected.deselect.classList.add("ss-hide");""===this.main.selected()?this.singleSelected.deselect.classList.add("ss-hide"):this.singleSelected.deselect.classList.remove("ss-hide")}},n.prototype.multiSelectedDiv=function(){var t=this,e=document.createElement("div");e.classList.add(this.main.config.multiSelected);var i=document.createElement("div");i.classList.add(this.main.config.values),e.appendChild(i);var s=document.createElement("div");s.classList.add(this.main.config.add);var n=document.createElement("span");return n.classList.add(this.main.config.plus),n.onclick=function(e){t.main.data.contentOpen&&(t.main.close(),e.stopPropagation())},s.appendChild(n),e.appendChild(s),e.onclick=function(e){t.main.config.isEnabled&&(e.target.classList.contains(t.main.config.valueDelete)||(t.main.data.contentOpen?t.main.close():t.main.open()))},{container:e,values:i,add:s,plus:n}},n.prototype.values=function(){if(this.multiSelected){for(var e,t=this.multiSelected.values.childNodes,i=this.main.data.getSelected(),s=[],n=0,a=t;n<a.length;n++){var o=a[n];e=!0;for(var l=0,r=i;l<r.length;l++){var c=r[l];String(c.id)===String(o.dataset.id)&&(e=!1)}e&&s.push(o)}for(var d=0,h=s;d<h.length;d++){var u=h[d];u.classList.add("ss-out"),this.multiSelected.values.removeChild(u)}for(t=this.multiSelected.values.childNodes,c=0;c<i.length;c++){e=!1;for(var p=0,m=t;p<m.length;p++)o=m[p],String(i[c].id)===String(o.dataset.id)&&(e=!0);e||(0!==t.length&&HTMLElement.prototype.insertAdjacentElement?0===c?this.multiSelected.values.insertBefore(this.valueDiv(i[c]),t[c]):t[c-1].insertAdjacentElement("afterend",this.valueDiv(i[c])):this.multiSelected.values.appendChild(this.valueDiv(i[c])))}if(0===i.length){var f=document.createElement("span");f.classList.add(this.main.config.disabled),f.innerHTML=this.main.config.placeholderText,this.multiSelected.values.innerHTML=f.outerHTML}}},n.prototype.valueDiv=function(a){var o=this,e=document.createElement("div");e.classList.add(this.main.config.value),e.dataset.id=a.id;var t=document.createElement("span");if(t.classList.add(this.main.config.valueText),t.innerHTML=a.innerHTML&&!0!==this.main.config.valuesUseText?a.innerHTML:a.text,e.appendChild(t),!a.mandatory){var i=document.createElement("span");i.classList.add(this.main.config.valueDelete),i.innerHTML=this.main.config.deselectLabel,i.onclick=function(e){e.preventDefault(),e.stopPropagation();var t=!1;if(o.main.beforeOnChange||(t=!0),o.main.beforeOnChange){for(var i=o.main.data.getSelected(),s=JSON.parse(JSON.stringify(i)),n=0;n<s.length;n++)s[n].id===a.id&&s.splice(n,1);!1!==o.main.beforeOnChange(s)&&(t=!0)}t&&(o.main.data.removeFromSelected(a.id,"id"),o.main.render(),o.main.select.setValue(),o.main.data.onDataChange())},e.appendChild(i)}return e},n.prototype.contentDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.content),e},n.prototype.searchDiv=function(){var n=this,e=document.createElement("div"),s=document.createElement("input"),a=document.createElement("div");e.classList.add(this.main.config.search);var t={container:e,input:s};return this.main.config.showSearch||(e.classList.add(this.main.config.hide),s.readOnly=!0),s.type="search",s.placeholder=this.main.config.searchPlaceholder,s.tabIndex=0,s.setAttribute("aria-label",this.main.config.searchPlaceholder),s.setAttribute("autocapitalize","off"),s.setAttribute("autocomplete","off"),s.setAttribute("autocorrect","off"),s.onclick=function(e){setTimeout(function(){""===e.target.value&&n.main.search("")},10)},s.onkeydown=function(e){"ArrowUp"===e.key?(n.main.open(),n.highlightUp(),e.preventDefault()):"ArrowDown"===e.key?(n.main.open(),n.highlightDown(),e.preventDefault()):"Tab"===e.key?n.main.data.contentOpen?n.main.close():setTimeout(function(){n.main.close()},n.main.config.timeoutDelay):"Enter"===e.key&&e.preventDefault()},s.onkeyup=function(e){var t=e.target;if("Enter"===e.key){if(n.main.addable&&e.ctrlKey)return a.click(),e.preventDefault(),void e.stopPropagation();var i=n.list.querySelector("."+n.main.config.highlighted);i&&i.click()}else"ArrowUp"===e.key||"ArrowDown"===e.key||("Escape"===e.key?n.main.close():n.main.config.showSearch&&n.main.data.contentOpen?n.main.search(t.value):s.value="");e.preventDefault(),e.stopPropagation()},s.onfocus=function(){n.main.open()},e.appendChild(s),this.main.addable&&(a.classList.add(this.main.config.addable),a.innerHTML="+",a.onclick=function(e){if(n.main.addable){e.preventDefault(),e.stopPropagation();var t=n.search.input.value;if(""===t.trim())return void n.search.input.focus();var i=n.main.addable(t),s="";if(!i)return;"object"==typeof i?o.validateOption(i)&&(n.main.addData(i),s=i.value?i.value:i.text):(n.main.addData(n.main.data.newOption({text:i,value:i})),s=i),n.main.search(""),setTimeout(function(){n.main.set(s,"value",!1,!1)},100),n.main.config.closeOnSelect&&setTimeout(function(){n.main.close()},100)}},e.appendChild(a),t.addable=a),t},n.prototype.highlightUp=function(){var e=this.list.querySelector("."+this.main.config.highlighted),t=null;if(e)for(t=e.previousSibling;null!==t&&t.classList.contains(this.main.config.disabled);)t=t.previousSibling;else{var i=this.list.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")");t=i[i.length-1]}if(t&&t.classList.contains(this.main.config.optgroupLabel)&&(t=null),null===t){var s=e.parentNode;if(s.classList.contains(this.main.config.optgroup)&&s.previousSibling){var n=s.previousSibling.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")");n.length&&(t=n[n.length-1])}}t&&(e&&e.classList.remove(this.main.config.highlighted),t.classList.add(this.main.config.highlighted),a.ensureElementInView(this.list,t))},n.prototype.highlightDown=function(){var e=this.list.querySelector("."+this.main.config.highlighted),t=null;if(e)for(t=e.nextSibling;null!==t&&t.classList.contains(this.main.config.disabled);)t=t.nextSibling;else t=this.list.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")");if(null===t&&null!==e){var i=e.parentNode;i.classList.contains(this.main.config.optgroup)&&i.nextSibling&&(t=i.nextSibling.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")"))}t&&(e&&e.classList.remove(this.main.config.highlighted),t.classList.add(this.main.config.highlighted),a.ensureElementInView(this.list,t))},n.prototype.listDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.list),e},n.prototype.options=function(e){void 0===e&&(e="");var t,i=this.main.data.filtered||this.main.data.data;if((this.list.innerHTML="")!==e)return(t=document.createElement("div")).classList.add(this.main.config.option),t.classList.add(this.main.config.disabled),t.innerHTML=e,void this.list.appendChild(t);if(this.main.config.isAjax&&this.main.config.isSearching)return(t=document.createElement("div")).classList.add(this.main.config.option),t.classList.add(this.main.config.disabled),t.innerHTML=this.main.config.searchingText,void this.list.appendChild(t);if(0===i.length){var s=document.createElement("div");return s.classList.add(this.main.config.option),s.classList.add(this.main.config.disabled),s.innerHTML=this.main.config.searchText,void this.list.appendChild(s)}for(var n=function(e){if(e.hasOwnProperty("label")){var t=e,n=document.createElement("div");n.classList.add(c.main.config.optgroup);var i=document.createElement("div");i.classList.add(c.main.config.optgroupLabel),c.main.config.selectByGroup&&c.main.config.isMultiple&&i.classList.add(c.main.config.optgroupLabelSelectable),i.innerHTML=t.label,n.appendChild(i);var s=t.options;if(s){for(var a=0,o=s;a<o.length;a++){var l=o[a];n.appendChild(c.option(l))}if(c.main.config.selectByGroup&&c.main.config.isMultiple){var r=c;i.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation();for(var t=0,i=n.children;t<i.length;t++){var s=i[t];-1!==s.className.indexOf(r.main.config.option)&&s.click()}})}}c.list.appendChild(n)}else c.list.appendChild(c.option(e))},c=this,a=0,o=i;a<o.length;a++)n(o[a])},n.prototype.option=function(r){if(r.placeholder){var e=document.createElement("div");return e.classList.add(this.main.config.option),e.classList.add(this.main.config.hide),e}var t=document.createElement("div");t.classList.add(this.main.config.option),r.class&&r.class.split(" ").forEach(function(e){t.classList.add(e)}),r.style&&(t.style.cssText=r.style);var c=this.main.data.getSelected();t.dataset.id=r.id,this.main.config.searchHighlight&&this.main.slim&&r.innerHTML&&""!==this.main.slim.search.input.value.trim()?t.innerHTML=a.highlight(r.innerHTML,this.main.slim.search.input.value,this.main.config.searchHighlighter):r.innerHTML&&(t.innerHTML=r.innerHTML),this.main.config.showOptionTooltips&&t.textContent&&t.setAttribute("title",t.textContent);var d=this;t.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation();var t=this.dataset.id;if(!0===r.selected&&d.main.config.allowDeselectOption){var i=!1;if(d.main.beforeOnChange&&d.main.config.isMultiple||(i=!0),d.main.beforeOnChange&&d.main.config.isMultiple){for(var s=d.main.data.getSelected(),n=JSON.parse(JSON.stringify(s)),a=0;a<n.length;a++)n[a].id===t&&n.splice(a,1);!1!==d.main.beforeOnChange(n)&&(i=!0)}i&&(d.main.config.isMultiple?(d.main.data.removeFromSelected(t,"id"),d.main.render(),d.main.select.setValue(),d.main.data.onDataChange()):d.main.set(""))}else{if(r.disabled||r.selected)return;if(d.main.config.limit&&Array.isArray(c)&&d.main.config.limit<=c.length)return;if(d.main.beforeOnChange){var o=void 0,l=JSON.parse(JSON.stringify(d.main.data.getObjectFromData(t)));l.selected=!0,d.main.config.isMultiple?(o=JSON.parse(JSON.stringify(c))).push(l):o=JSON.parse(JSON.stringify(l)),!1!==d.main.beforeOnChange(o)&&d.main.set(t,"id",d.main.config.closeOnSelect)}else d.main.set(t,"id",d.main.config.closeOnSelect)}});var i=c&&a.isValueInArrayOfObjects(c,"id",r.id);return(r.disabled||i)&&(t.onclick=null,d.main.config.allowDeselectOption||t.classList.add(this.main.config.disabled),d.main.config.hideSelectedOption&&t.classList.add(this.main.config.hide)),i?t.classList.add(this.main.config.optionSelected):t.classList.remove(this.main.config.optionSelected),t},n);function n(e){this.main=e.main,this.container=this.containerDiv(),this.content=this.contentDiv(),this.search=this.searchDiv(),this.list=this.listDiv(),this.options(),this.singleSelected=null,this.multiSelected=null,this.main.config.isMultiple?(this.multiSelected=this.multiSelectedDiv(),this.multiSelected&&this.container.appendChild(this.multiSelected.container)):(this.singleSelected=this.singleSelectedDiv(),this.container.appendChild(this.singleSelected.container)),this.main.config.addToBody?(this.content.classList.add(this.main.config.id),document.body.appendChild(this.content)):this.container.appendChild(this.content),this.content.appendChild(this.search.container),this.content.appendChild(this.list)}t.Slim=s}],n.c=s,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2).default;function n(e){if(s[e])return s[e].exports;var t=s[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,n),t.l=!0,t.exports}var i,s});

/***/ }),

/***/ "./src/crawler.ts":
/*!************************!*\
  !*** ./src/crawler.ts ***!
  \************************/
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
var string_1 = __webpack_require__(/*! ./utilities/string */ "./src/utilities/string.ts");
function requestTemplates(template) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var objects, con, params, response, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    objects = [];
                    _e.label = 1;
                case 1:
                    params = {
                        list: "embeddedin",
                        eititle: "Template:" + template,
                        eilimit: "500"
                    };
                    if (con) params.eicontinue = con;
                    return [4 /*yield*/, osmMediaApiQuery(params)];
                case 2:
                    response = _e.sent();
                    _c = (_b = objects.push).apply;
                    _d = [objects];
                    return [4 /*yield*/, processPagesByTemplateResult(response, template)];
                case 3:
                    _c.apply(_b, _d.concat([_e.sent()]));
                    con = (_a = response.continue) === null || _a === void 0 ? void 0 : _a.eicontinue;
                    _e.label = 4;
                case 4:
                    if (con) return [3 /*break*/, 1];
                    _e.label = 5;
                case 5:
                    return [2 /*return*/, objects];
            }
        });
    });
}
exports.requestTemplates = requestTemplates;
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
function processPagesByTemplateResult(response, template) {
    return __awaiter(this, void 0, void 0, function () {
        var pages, objects, ids, _a, _b, _i, p, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    pages = response.query.embeddedin;
                    objects = [];
                    ids = [];
                    _a = [];
                    for (_b in pages) _a.push(_b);
                    _i = 0;
                    _j.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    p = _a[_i];
                    if (!/^\w{2}:/g.test(pages[p].title)) ids.push(pages[p].pageid);
                    if (!(ids.length >= 50)) return [3 /*break*/, 3];
                    _d = (_c = objects.push).apply;
                    _e = [objects];
                    return [4 /*yield*/, loadPages(ids, template)];
                case 2:
                    _d.apply(_c, _e.concat([_j.sent()]));
                    ids = [];
                    _j.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(ids.length > 0)) return [3 /*break*/, 6];
                    _g = (_f = objects.push).apply;
                    _h = [objects];
                    return [4 /*yield*/, loadPages(ids, template)];
                case 5:
                    _g.apply(_f, _h.concat([_j.sent()]));
                    _j.label = 6;
                case 6:
                    return [2 /*return*/, objects];
            }
        });
    });
}
function loadPages(ids, template) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response, pages, objects, p, content, pageObjects, _i, pageObjects_1, o;
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
                    objects = [];
                    for (p in pages) {
                        content = pages[p].revisions[0].slots.main.content;
                        pageObjects = parsePage(content, template);
                        for (_i = 0, pageObjects_1 = pageObjects; _i < pageObjects_1.length; _i++) {
                            o = pageObjects_1[_i];
                            o.sourceWiki = pages[p].title;
                        }
                        objects.push.apply(objects, pageObjects);
                    }
                    return [2 /*return*/, objects];
            }
        });
    });
}
function parsePage(content, template) {
    var objects = [];
    var regexTemplate = new RegExp("{{" + template.replace(" ", "[_ ]"), "gi");
    var start = content.search(regexTemplate);
    while (start !== -1) {
        var templateContent = content.substring(start);
        var closing = string_1.findClosingBracketIndex(templateContent, 0);
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
        var name_1 = pair.substring(0, start).trim();
        var value = pair.substring(start + 1).trim();
        if (value) obj[name_1] = value;
    }
    return obj;
}

/***/ }),

/***/ "./src/lazyLoadImages.ts":
/*!*******************************!*\
  !*** ./src/lazyLoadImages.ts ***!
  \*******************************/
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
function lazyLoadImages() {
    return __awaiter(this, void 0, void 0, function () {
        var elements, i, boundingClientRect, sources, _i, sources_1, src, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    elements = document.querySelectorAll("*[dynamic-src]");
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < elements.length)) return [3 /*break*/, 8];
                    boundingClientRect = elements[i].getBoundingClientRect();
                    if (!(elements[i].hasAttribute("dynamic-src") && boundingClientRect.top < window.innerHeight * 2)) return [3 /*break*/, 7];
                    sources = (elements[i].getAttribute("dynamic-src") || "").split(" ");
                    _i = 0, sources_1 = sources;
                    _b.label = 2;
                case 2:
                    if (!(_i < sources_1.length)) return [3 /*break*/, 6];
                    src = sources_1[_i];
                    _a = document.body.contains(elements[i]);
                    if (!_a) return [3 /*break*/, 4];
                    return [4 /*yield*/, isImage(src)];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    if (_a) {
                        elements[i].setAttribute("src", src);
                        return [3 /*break*/, 6];
                    }
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6:
                    elements[i].removeAttribute("dynamic-src");
                    _b.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 1];
                case 8:
                    return [2 /*return*/];
            }
        });
    });
}
exports.lazyLoadImages = lazyLoadImages;
window.addEventListener("scroll", lazyLoadImages);
window.addEventListener("load", lazyLoadImages);
window.addEventListener("resize", lazyLoadImages);
function isImage(src) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                var img = new Image();
                img.addEventListener("load", function () {
                    resolve(true);
                });
                img.addEventListener("error", function () {
                    resolve(false);
                });
                img.src = src;
                if (img.complete) resolve(true);
            })];
        });
    });
}

/***/ }),

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
var html_1 = __webpack_require__(/*! ./utilities/html */ "./src/utilities/html.ts");
var SlimSelect = __webpack_require__(/*! slim-select */ "./node_modules/slim-select/dist/slimselect.min.js");
var crawler_1 = __webpack_require__(/*! ./crawler */ "./src/crawler.ts");
__webpack_require__(/*! ./lazyLoadImages */ "./src/lazyLoadImages.ts");
var transformTemplates_1 = __webpack_require__(/*! ./transformTemplates */ "./src/transformTemplates.ts");
var lazyLoadImages_1 = __webpack_require__(/*! ./lazyLoadImages */ "./src/lazyLoadImages.ts");
var storage_1 = __webpack_require__(/*! ./utilities/storage */ "./src/utilities/storage.ts");
var onUpdate = false;
var apps = [];
var topicSelect = new SlimSelect({
    select: "#topic",
    placeholder: "Topic",
    onChange: function () {
        if (!onUpdate) {
            onUpdate = true;
            update(document.getElementById("search").value, topicSelect.selected(), languageSelect.selected());
            onUpdate = false;
        }
    }
});
var languageSelect = new SlimSelect({
    select: "#language",
    placeholder: "Language",
    onChange: function () {
        if (!onUpdate) {
            onUpdate = true;
            update(document.getElementById("search").value, topicSelect.selected(), languageSelect.selected());
            onUpdate = false;
        }
    }
});
document.getElementById("search").addEventListener("input", function () {
    if (!onUpdate) {
        onUpdate = true;
        update(document.getElementById("search").value, topicSelect.selected(), languageSelect.selected());
        onUpdate = false;
    }
});
function includesArray(arr, target) {
    return target.every(function (v) {
        return arr.includes(v);
    });
}
function removeDuplicates(arr) {
    return arr.filter(function (c, index) {
        return arr.indexOf(c) === index;
    });
}
exports.removeDuplicates = removeDuplicates;
function update(search, topic, language) {
    if (search === void 0) {
        search = "";
    }
    if (topic === void 0) {
        topic = [];
    }
    if (language === void 0) {
        language = [];
    }
    html_1.getHtmlElement(".apps").innerHTML = "";
    var topicData = [];
    var languageData = [];
    var filteredApps = apps;
    search = search.toUpperCase();
    var topicUp = topic.map(function (t) {
        return t.toUpperCase();
    });
    var languageUp = language.map(function (t) {
        return t.toUpperCase();
    });
    if (search) filteredApps = filteredApps.filter(function (a) {
        return a.name.toUpperCase().search(search) !== -1 || a.description.toUpperCase().search(search) !== -1 || a.topics.filter(function (t) {
            return t.toUpperCase().search(search) !== -1;
        }).length > 0;
    });
    if (topicUp.length > 0) filteredApps = filteredApps.filter(function (a) {
        return includesArray(a.topics.map(function (t) {
            return t.toUpperCase();
        }), topicUp);
    });
    if (languageUp.length > 0) filteredApps = filteredApps.filter(function (a) {
        return includesArray(a.languages.map(function (t) {
            return t.toUpperCase();
        }), languageUp);
    });
    if (search) filteredApps = filteredApps.filter(function (a) {
        return a.name.toUpperCase().search(search) !== -1 || a.description.toUpperCase().search(search) !== -1 || a.topics.filter(function (t) {
            return t.toUpperCase().search(search) !== -1;
        }).length > 0;
    });
    for (var _i = 0, filteredApps_1 = filteredApps; _i < filteredApps_1.length; _i++) {
        var a = filteredApps_1[_i];
        topicData.push.apply(topicData, a.topics.map(function (t) {
            return t;
        }));
        languageData.push.apply(languageData, a.languages.map(function (l) {
            return l;
        }));
    }
    topicData = removeDuplicates(topicData);
    languageData = removeDuplicates(languageData);
    topicData.sort();
    languageData.sort();
    topicSelect.setData(topicData.map(function (t) {
        return { value: t, text: t };
    }));
    topicSelect.set(topic);
    languageSelect.setData(languageData.map(function (t) {
        return { value: t, text: t };
    }));
    languageSelect.set(language);
    for (var _a = 0, filteredApps_2 = filteredApps; _a < filteredApps_2.length; _a++) {
        var a = filteredApps_2[_a];
        render(a);
    }
    lazyLoadImages_1.lazyLoadImages();
}
function saveAppCatalog() {
    storage_1.set("apps", apps);
    storage_1.set("apps-date", new Date());
    console.info("add catalog to cache");
}
function getAppCatalog() {
    var date = storage_1.get("apps-date");
    var day = 24 * 1000 * 60 * 60;
    if (date && new Date(date).valueOf() > Date.now() - day) {
        console.info("get catalog from cache");
        apps = storage_1.get("apps") || [];
        update(document.getElementById("search").value);
    }
    if (apps.length === 0) {
        console.info("load catalog from wiki");
        loadAppCatalog();
    }
}
function addApp(obj) {
    var _a, _b;
    var duplicates = apps.filter(function (a) {
        return a.name.toUpperCase() === obj.name.toUpperCase();
    });
    if (duplicates.length === 0) apps.push(obj);else {
        var app = duplicates[0];
        app.description = app.description || obj.description;
        app.image = app.image || obj.image;
        (_a = app.languages).push.apply(_a, obj.languages);
        app.languages = removeDuplicates(app.languages);
        (_b = app.topics).push.apply(_b, obj.topics);
        app.topics = removeDuplicates(app.topics);
        app.website = app.website || obj.website;
        app.wiki = app.wiki || obj.wiki;
    }
}
function loadAppCatalog() {
    return __awaiter(this, void 0, void 0, function () {
        var serviceItemObjects, _i, _a, source, obj, softwareObjects, _b, _c, source, obj;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    return [4 /*yield*/, crawler_1.requestTemplates("Service item")];
                case 1:
                    serviceItemObjects = _d.sent();
                    for (_i = 0, _a = serviceItemObjects.filter(function (s) {
                        return !transformTemplates_1.containsOfflineLink(s["name"] || "");
                    }); _i < _a.length; _i++) {
                        source = _a[_i];
                        obj = transformTemplates_1.transformServiceItem(source);
                        addApp(obj);
                    }
                    update(document.getElementById("search").value);
                    return [4 /*yield*/, crawler_1.requestTemplates("Software")];
                case 2:
                    softwareObjects = _d.sent();
                    for (_b = 0, _c = softwareObjects.filter(function (s) {
                        return !(transformTemplates_1.containsOfflineLink(s["name"] || "") || transformTemplates_1.containsOfflineLink(s["web"] || ""));
                    }); _b < _c.length; _b++) {
                        source = _c[_b];
                        obj = transformTemplates_1.transformSoftware(source);
                        addApp(obj);
                    }
                    update(document.getElementById("search").value);
                    shuffleArray(apps);
                    saveAppCatalog();
                    return [2 /*return*/];
            }
        });
    });
}
getAppCatalog();
function render(obj) {
    var defaultImage = "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";
    var element = html_1.createElement("div", "<div class=\"header\">\n        <div class=\"name\">" + (obj.website ? "<a href=\"" + obj.website + "\" target=\"_blank\">" + obj.name + "</a>" : obj.name) + "</div>\n        " + (obj.website ? "<a href=\"" + obj.website + "\" target=\"_blank\">" + (obj.image.thumb ? "<img class=\"img\" src=\"" + defaultImage + "\" dynamic-src=\"" + obj.image.thumb + " " + obj.image.orginal + " " + defaultImage + "\"/>" : "<img class=\"img\" src=\"" + defaultImage + "\"/>") + "</a>" : obj.image.thumb ? "<img class=\"img\" src=\"" + defaultImage + "\" dynamic-src=\"" + obj.image.thumb + " " + obj.image.orginal + " " + defaultImage + "\"/>" : "<img class=\"img\" src=\"" + defaultImage + "\"/>") + "\n      </div>\n      <div class=\"description\">" + obj.description + "</div>\n      " + (obj.website ? "<a class=\"link\" href=\"" + obj.website + "\" target=\"_blank\"><i class=\"far fa-map\"></i></a>" : "") + "\n      " + (obj.wiki ? "<a class=\"link\" href=\"" + obj.wiki + "\" target=\"_blank\"><i class=\"fas fa-atlas\"></i></a>" : "") + "\n      <div class=\"topics\">" + obj.topics.map(function (t) {
        var background = textToColor(t);
        var yiq = (background.r * 299 + background.g * 587 + background.b * 114) / 1000;
        return "<span class=\"topic\" style=\"background: rgb(" + background.r + "," + background.g + "," + background.b + "); color:" + (yiq >= 128 ? "black" : "white") + ";\">" + t + "</span>";
    }).join("") + "</div>", ["app"]);
    html_1.getHtmlElement(".apps").appendChild(element);
}
function textToColor(s) {
    var r = 0;
    var g = 0;
    var b = 0;
    for (var i = 0; i < s.length; i++) {
        if (i % 3 === 0) r = (r + s.charCodeAt(i)) % 256;else if (i % 3 === 1) g = (g + s.charCodeAt(i)) % 256;else b = (b + s.charCodeAt(i)) % 256;
    }
    return { r: r, g: g, b: b };
}
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
}

/***/ }),

/***/ "./src/transformTemplates.ts":
/*!***********************************!*\
  !*** ./src/transformTemplates.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = __webpack_require__(/*! ./utilities/image */ "./src/utilities/image.ts");
var url_1 = __webpack_require__(/*! ./utilities/url */ "./src/utilities/url.ts");
var script_1 = __webpack_require__(/*! ./script */ "./src/script.ts");
function transformSoftware(source) {
    var _a, _b, _c;
    var obj = {
        name: source["name"] || "",
        description: processWikiText(source["description"] || ""),
        image: {
            thumb: image_1.toWikimediaUrl(source["screenshot"], 250),
            orginal: image_1.toWikimediaUrl(source["screenshot"])
        },
        website: url_1.toUrl(source["web"]),
        wiki: url_1.toWikiUrl(source["wiki"] || source.sourceWiki) || "",
        languages: (source["languages"] || "").split(splitByCommaButNotInsideBraceRegex).map(trim).map(extractLanguageCodeFromLocal).filter(function (v) {
            return v;
        }).map(function (v) {
            return v.toLowerCase();
        }),
        topics: (source["genre"] || "").split(splitByCommaButNotInsideBraceRegex).map(trim).filter(function (v) {
            return v;
        }).map(firstLetterToUpperCase)
    };
    (_a = obj.topics).push.apply(_a, (source["platform"] || "").split(splitByCommaButNotInsideBraceRegex).map(trim).filter(function (v) {
        return v;
    }).map(firstLetterToUpperCase));
    if ((source["tracking"] || "") && (source["tracking"] || "").toUpperCase() !== "YES" && (source["tracking"] || "").toUpperCase() !== "NO" && (source["tracking"] || "").toUpperCase() !== "?") (_b = obj.topics).push.apply(_b, (source["profiles"] || "").split(splitByCommaButNotInsideBraceRegex).map(trim).filter(function (v) {
        return v;
    }).map(firstLetterToUpperCase));
    if ((source["accessibility"] || "") && (source["accessibility"] || "").toUpperCase() !== "YES" && (source["accessibility"] || "").toUpperCase() !== "NO" && (source["accessibility"] || "").toUpperCase() !== "?") {
        (_c = obj.topics).push.apply(_c, (source["accessibility"] || "").split(splitByCommaButNotInsideBraceRegex).map(trim).filter(function (v) {
            return v;
        }).map(firstLetterToUpperCase));
        obj.topics.push("Accessibility");
    }
    if ((source["accessibility"] || "").toUpperCase() === "YES") obj.topics.push("Accessibility");
    if ((source["tracking"] || "").toUpperCase() === "YES") obj.topics.push("Tracking");
    if ((source["monitoring"] || "").toUpperCase() === "YES") obj.topics.push("Monitoring ");
    if ((source["navigating"] || "").toUpperCase() === "YES" || (source["navToPoint"] || "").toUpperCase() === "YES") obj.topics.push("Navigating");
    if ((source["routing"] || "").toUpperCase() === "YES" || (source["calculateRoute"] || "").toUpperCase() === "YES" || (source["calculateRouteOffline"] || "").toUpperCase() === "YES") obj.topics.push("Routing");
    if ((source["3D"] || "").toUpperCase() === "YES") obj.topics.push("3D");
    if ((source["findLocation"] || "").toUpperCase() === "YES") obj.topics.push("Search");
    if ((source["findNearbyPOI"] || "").toUpperCase() === "YES") obj.topics.push("POI");
    if ((source["addPOI"] || "").toUpperCase() === "YES" || (source["addWay"] || "").toUpperCase() === "YES" || (source["editPOI"] || "").toUpperCase() === "YES" || (source["editTags"] || "").toUpperCase() === "YES" || (source["editGeom"] || "").toUpperCase() === "YES" || (source["editRelations"] || "").toUpperCase() === "YES") obj.topics.push("Editor");
    obj.topics = script_1.removeDuplicates(obj.topics).sort();
    {
        var name_1 = extractNameWebsiteWiki(source["name"]);
        obj.name = name_1.name || obj.name;
        obj.website = obj.website || name_1.website;
        obj.wiki = obj.wiki || name_1.wiki || "";
    }
    {
        var name_2 = extractNameWebsiteWiki(source["web"]);
        obj.name = obj.name || name_2.name;
        obj.website = name_2.website || obj.website;
        obj.wiki = obj.wiki || name_2.wiki || "";
    }
    {
        var name_3 = extractNameWebsiteWiki(source["wiki"]);
        obj.name = obj.name || name_3.name;
        obj.website = obj.website || name_3.website;
        obj.wiki = name_3.wiki || obj.wiki;
    }
    return obj;
}
exports.transformSoftware = transformSoftware;
function transformServiceItem(source) {
    var obj = {
        name: source["name"] || "",
        description: processWikiText(source["descr"] || ""),
        image: {
            thumb: image_1.toWikimediaUrl(source["image"], 250),
            orginal: image_1.toWikimediaUrl(source["image"])
        },
        wiki: url_1.toWikiUrl(source.sourceWiki) || "",
        languages: (source["lang"] || "").split(splitByCommaButNotInsideBraceRegex).map(extractLanguageCodeFromTemplate).map(trim).filter(function (v) {
            return v;
        }).map(function (v) {
            return v.toLowerCase();
        }),
        topics: (source["genre"] || "").split(splitByCommaButNotInsideBraceRegex).map(trim).filter(function (v) {
            return v;
        }).map(firstLetterToUpperCase).sort()
    };
    var name = extractNameWebsiteWiki(source["name"]);
    obj.name = name.name || obj.name;
    obj.website = name.website;
    obj.wiki = obj.wiki || name.wiki || "";
    return obj;
}
exports.transformServiceItem = transformServiceItem;
var splitByCommaButNotInsideBraceRegex = /[,;]+(?![^\(]*\))/;
function containsOfflineLink(value) {
    return (/<s(trike)?>/gi.test(value)
    );
}
exports.containsOfflineLink = containsOfflineLink;
function extractLanguageCodeFromLocal(value) {
    var match = /(\w{2,3})-/.exec(value);
    if (match) return match[1];
    return value;
}
function extractLanguageCodeFromTemplate(value) {
    var match = /:(\w{2})/.exec(value);
    if (match) return match[1];
    return value;
}
function firstLetterToUpperCase(value) {
    return "" + value[0].toUpperCase() + value.slice(1);
}
function trim(value) {
    return value.replace(/^[\.\s]+|[\.\s]+$/gm, "");
}
function extractNameWebsiteWiki(value) {
    if (value === void 0) {
        value = "";
    }
    var obj = { name: value };
    {
        var regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\])/g;
        var match = regex.exec(value);
        if (match) {
            obj.website = match[2];
            value = value.replace(regex, "").trim();
            if (value) obj.name = value;
        }
    }
    {
        var regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?) (.*)\])/g;
        var match = regex.exec(value);
        if (match) {
            obj.name = match[6];
            obj.website = match[2];
            value = value.replace(regex, "");
        }
    }
    {
        var regex = /\[\[(.*(?![^\|]))(\|(.*))?\]\]/g;
        var match = regex.exec(value);
        if (match) {
            if (match[3]) obj.name = match[3];else obj.name = match[1];
            obj.wiki = url_1.toWikiUrl(match[1]);
            value = value.replace(regex, "");
        }
    }
    {
        var regex = /\[\[(.*)\]\]/g;
        var match = regex.exec(value);
        if (match) {
            obj.name = match[1];
            obj.wiki = url_1.toWikiUrl(match[1]);
            value = value.replace(regex, "");
        }
    }
    return obj;
}
function processWikiText(text) {
    if (text === void 0) {
        text = "";
    }
    {
        var regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\])/g;
        var match = regex.exec(text);
        if (match) {
            text = text.replace(regex, "<a target=\"_blank\" href=\"" + match[2] + "\">" + match[2] + "</a>");
        }
    }
    {
        var regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?) (.*)\])/g;
        var match = regex.exec(text);
        if (match) {
            text = text.replace(regex, "<a target=\"_blank\" href=\"" + match[2] + "\">" + match[6] + "</a>");
        }
    }
    {
        var regex = /\[\[:wikipedia:(.*(?![^\|]))(\|(.*))?\]\]/g;
        var match = regex.exec(text);
        if (match) {
            text = text.replace(regex, "<a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/" + match[1] + "\">" + match[3] + "</a>");
        }
    }
    {
        var regex = /\[\[:wikipedia:(.*)\]\]/g;
        var match = regex.exec(text);
        if (match) {
            text = text.replace(regex, "<a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/" + match[1] + "\">" + match[1] + "</a>");
        }
    }
    {
        var regex = /\[\[(.*(?![^\|]))(\|(.*))?\]\]/g;
        var match = regex.exec(text);
        if (match) {
            text = text.replace(regex, "<a target=\"_blank\" href=\"" + url_1.toWikiUrl(match[1]) + "\">" + match[3] + "</a>");
        }
    }
    {
        var regex = /\[\[(.*)\]\]/g;
        var match = regex.exec(text);
        if (match) {
            text = text.replace(regex, "<a target=\"_blank\" href=\"" + url_1.toWikiUrl(match[1]) + "\">" + match[1] + "</a>");
        }
    }
    return text;
}

/***/ }),

/***/ "./src/utilities/html.ts":
/*!*******************************!*\
  !*** ./src/utilities/html.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function getHtmlElement(selectors, contentElement) {
    if (contentElement === void 0) {
        contentElement = document;
    }
    var element = contentElement.querySelector(selectors);
    if (!element) throw "Element " + selectors + " not found.";
    return element;
}
exports.getHtmlElement = getHtmlElement;
function getHtmlElements(selectors, contentElement) {
    if (contentElement === void 0) {
        contentElement = document;
    }
    var elements = [];
    contentElement.querySelectorAll(selectors).forEach(function (v) {
        elements.push(v);
    });
    return elements;
}
exports.getHtmlElements = getHtmlElements;
function createElement(tag, innerHTML, classNames) {
    var _a;
    if (innerHTML === void 0) {
        innerHTML = "";
    }
    if (classNames === void 0) {
        classNames = [];
    }
    var element = document.createElement(tag);
    element.innerHTML = innerHTML;
    (_a = element.classList).add.apply(_a, classNames);
    return element;
}
exports.createElement = createElement;

/***/ }),

/***/ "./src/utilities/image.ts":
/*!********************************!*\
  !*** ./src/utilities/image.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var md5 = __webpack_require__(/*! md5 */ "./node_modules/md5/md5.js");
var url_1 = __webpack_require__(/*! ./url */ "./src/utilities/url.ts");
var string_1 = __webpack_require__(/*! ./string */ "./src/utilities/string.ts");
function toWikimediaUrl(source, size) {
    if (!source) return undefined;
    var fileName = "";
    if (url_1.httpRegex.test(source)) {
        return source;
    } else if (string_1.startsWithIgnoreCase(source, "File:")) fileName = source.substring(5, source.length);else if (string_1.startsWithIgnoreCase(source, "https://wiki.openstreetmap.org/wiki/File:")) fileName = source.substring(40, source.length);else if (string_1.startsWithIgnoreCase(source, "http://wiki.openstreetmap.org/wiki/File:")) fileName = source.substring(39, source.length);else fileName = source;
    fileName = decodeURI(fileName).replace(/ /g, "_");
    var hash = md5(fileName);
    if (size) return "https://wiki.openstreetmap.org/w/images/thumb/" + hash.substring(0, 1) + "/" + hash.substring(0, 2) + "/" + fileName + "/" + size + "px-" + fileName;
    return "https://wiki.openstreetmap.org/w/images/" + hash.substring(0, 1) + "/" + hash.substring(0, 2) + "/" + fileName;
}
exports.toWikimediaUrl = toWikimediaUrl;

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

/***/ "./src/utilities/storage.ts":
/*!**********************************!*\
  !*** ./src/utilities/storage.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
exports.set = set;
function get(key) {
    try {
        var v = localStorage.getItem(key);
        if (!v) return undefined;
        return JSON.parse(v);
    } catch (_a) {
        return undefined;
    }
}
exports.get = get;

/***/ }),

/***/ "./src/utilities/string.ts":
/*!*********************************!*\
  !*** ./src/utilities/string.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function equalsIgnoreCase(s1, s2) {
    return (s1 || "").toUpperCase() === (s2 || "").toUpperCase();
}
exports.equalsIgnoreCase = equalsIgnoreCase;
function startsWithIgnoreCase(s, searchString, position) {
    return s.toUpperCase().startsWith(searchString.toUpperCase(), position);
}
exports.startsWithIgnoreCase = startsWithIgnoreCase;
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
exports.findClosingBracketIndex = findClosingBracketIndex;

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
function toWikiUrl(wiki) {
    if (!wiki) return undefined;
    if (exports.httpRegex.test(wiki)) return wiki;
    return "https://wiki.openstreetmap.org/wiki/" + wiki;
}
exports.toWikiUrl = toWikiUrl;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NoYXJlbmMvY2hhcmVuYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3J5cHQvY3J5cHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWQ1L21kNS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2xpbS1zZWxlY3QvZGlzdC9zbGltc2VsZWN0Lm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3Jhd2xlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF6eUxvYWRJbWFnZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtVGVtcGxhdGVzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvaHRtbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL2ltYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvanNvblJlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy9zdG9yYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvc3RyaW5nLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMvdXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JB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YixTQUFnQixLQUFoQixDQUFzQixHQUF0QixFQUE2QztBQUMzQyxRQUFJLENBQUMsR0FBTCxFQUFVLE9BQU8sU0FBUDtBQUVWLFFBQUksQ0FBQyxrQkFBVSxJQUFWLENBQWUsR0FBZixDQUFMLEVBQTBCLE9BQU8sWUFBVSxHQUFqQjtBQUUxQixXQUFPLEdBQVA7QUFDRDtBQU5EO0FBUUEsU0FBZ0IsU0FBaEIsQ0FBMEIsSUFBMUIsRUFBc0M7QUFDcEMsUUFBSSxDQUFDLElBQUwsRUFBVyxPQUFPLFNBQVA7QUFFWCxRQUFJLGtCQUFVLElBQVYsQ0FBZSxJQUFmLENBQUosRUFBMEIsT0FBTyxJQUFQO0FBRTFCLFdBQU8seUNBQXVDLElBQTlDO0FBQ0Q7QUFORDtBQVFBLFNBQWdCLFlBQWhCLENBQTZCLEdBQTdCLEVBQXVDLFFBQXZDLEVBQXlEO0FBQ3ZEO0FBQ0E7QUFDQSxhQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBZ0Q7QUFDOUMsZUFBTyxtQkFBbUIsQ0FBbkIsRUFBc0IsT0FBdEIsQ0FDTCx3QkFESyxFQUVMLGtCQUZLLENBQVA7QUFJRDtBQUNELFdBQU8sT0FBTyxJQUFQLENBQVksR0FBWixFQUNKLElBREksR0FFSixHQUZJLENBR0gsZUFBRztBQUNELGVBQUcsbUJBQW1CLEdBQW5CLElBQXVCLEdBQXZCLElBQ0QsV0FBVyxXQUFXLElBQUksR0FBSixDQUFYLENBQVgsR0FBa0MsbUJBQW1CLElBQUksR0FBSixDQUFuQixDQURqQyxDQUFIO0FBRUUsS0FORCxFQVFKLElBUkksQ0FRQyxHQVJELENBQVA7QUFTRDtBQWxCRCxvQyIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zY3JpcHQudHNcIik7XG4iLCJ2YXIgY2hhcmVuYyA9IHtcbiAgLy8gVVRGLTggZW5jb2RpbmdcbiAgdXRmODoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICByZXR1cm4gY2hhcmVuYy5iaW4uc3RyaW5nVG9CeXRlcyh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShjaGFyZW5jLmJpbi5ieXRlc1RvU3RyaW5nKGJ5dGVzKSkpO1xuICAgIH1cbiAgfSxcblxuICAvLyBCaW5hcnkgZW5jb2RpbmdcbiAgYmluOiB7XG4gICAgLy8gQ29udmVydCBhIHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBzdHJpbmdUb0J5dGVzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKVxuICAgICAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRik7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgc3RyaW5nXG4gICAgYnl0ZXNUb1N0cmluZzogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIHN0ciA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKVxuICAgICAgICBzdHIucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKSk7XG4gICAgICByZXR1cm4gc3RyLmpvaW4oJycpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFyZW5jO1xuIiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgYmFzZTY0bWFwXG4gICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJyxcblxuICBjcnlwdCA9IHtcbiAgICAvLyBCaXQtd2lzZSByb3RhdGlvbiBsZWZ0XG4gICAgcm90bDogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8IGIpIHwgKG4gPj4+ICgzMiAtIGIpKTtcbiAgICB9LFxuXG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gcmlnaHRcbiAgICByb3RyOiBmdW5jdGlvbihuLCBiKSB7XG4gICAgICByZXR1cm4gKG4gPDwgKDMyIC0gYikpIHwgKG4gPj4+IGIpO1xuICAgIH0sXG5cbiAgICAvLyBTd2FwIGJpZy1lbmRpYW4gdG8gbGl0dGxlLWVuZGlhbiBhbmQgdmljZSB2ZXJzYVxuICAgIGVuZGlhbjogZnVuY3Rpb24obikge1xuICAgICAgLy8gSWYgbnVtYmVyIGdpdmVuLCBzd2FwIGVuZGlhblxuICAgICAgaWYgKG4uY29uc3RydWN0b3IgPT0gTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBjcnlwdC5yb3RsKG4sIDgpICYgMHgwMEZGMDBGRiB8IGNyeXB0LnJvdGwobiwgMjQpICYgMHhGRjAwRkYwMDtcbiAgICAgIH1cblxuICAgICAgLy8gRWxzZSwgYXNzdW1lIGFycmF5IGFuZCBzd2FwIGFsbCBpdGVtc1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmxlbmd0aDsgaSsrKVxuICAgICAgICBuW2ldID0gY3J5cHQuZW5kaWFuKG5baV0pO1xuICAgICAgcmV0dXJuIG47XG4gICAgfSxcblxuICAgIC8vIEdlbmVyYXRlIGFuIGFycmF5IG9mIGFueSBsZW5ndGggb2YgcmFuZG9tIGJ5dGVzXG4gICAgcmFuZG9tQnl0ZXM6IGZ1bmN0aW9uKG4pIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW107IG4gPiAwOyBuLS0pXG4gICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGJpZy1lbmRpYW4gMzItYml0IHdvcmRzXG4gICAgYnl0ZXNUb1dvcmRzOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgd29yZHMgPSBbXSwgaSA9IDAsIGIgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyssIGIgKz0gOClcbiAgICAgICAgd29yZHNbYiA+Pj4gNV0gfD0gYnl0ZXNbaV0gPDwgKDI0IC0gYiAlIDMyKTtcbiAgICAgIHJldHVybiB3b3JkcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBiaWctZW5kaWFuIDMyLWJpdCB3b3JkcyB0byBhIGJ5dGUgYXJyYXlcbiAgICB3b3Jkc1RvQnl0ZXM6IGZ1bmN0aW9uKHdvcmRzKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBiID0gMDsgYiA8IHdvcmRzLmxlbmd0aCAqIDMyOyBiICs9IDgpXG4gICAgICAgIGJ5dGVzLnB1c2goKHdvcmRzW2IgPj4+IDVdID4+PiAoMjQgLSBiICUgMzIpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGhleCBzdHJpbmdcbiAgICBieXRlc1RvSGV4OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgaGV4ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldID4+PiA0KS50b1N0cmluZygxNikpO1xuICAgICAgICBoZXgucHVzaCgoYnl0ZXNbaV0gJiAweEYpLnRvU3RyaW5nKDE2KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgaGV4IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBoZXhUb0J5dGVzOiBmdW5jdGlvbihoZXgpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGMgPSAwOyBjIDwgaGV4Lmxlbmd0aDsgYyArPSAyKVxuICAgICAgICBieXRlcy5wdXNoKHBhcnNlSW50KGhleC5zdWJzdHIoYywgMiksIDE2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgYmFzZS02NCBzdHJpbmdcbiAgICBieXRlc1RvQmFzZTY0OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgYmFzZTY0ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZXNbaV0gPDwgMTYpIHwgKGJ5dGVzW2kgKyAxXSA8PCA4KSB8IGJ5dGVzW2kgKyAyXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspXG4gICAgICAgICAgaWYgKGkgKiA4ICsgaiAqIDYgPD0gYnl0ZXMubGVuZ3RoICogOClcbiAgICAgICAgICAgIGJhc2U2NC5wdXNoKGJhc2U2NG1hcC5jaGFyQXQoKHRyaXBsZXQgPj4+IDYgKiAoMyAtIGopKSAmIDB4M0YpKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBiYXNlNjQucHVzaCgnPScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhc2U2NC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJhc2UtNjQgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIGJhc2U2NFRvQnl0ZXM6IGZ1bmN0aW9uKGJhc2U2NCkge1xuICAgICAgLy8gUmVtb3ZlIG5vbi1iYXNlLTY0IGNoYXJhY3RlcnNcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5yZXBsYWNlKC9bXkEtWjAtOStcXC9dL2lnLCAnJyk7XG5cbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwLCBpbW9kNCA9IDA7IGkgPCBiYXNlNjQubGVuZ3RoO1xuICAgICAgICAgIGltb2Q0ID0gKytpICUgNCkge1xuICAgICAgICBpZiAoaW1vZDQgPT0gMCkgY29udGludWU7XG4gICAgICAgIGJ5dGVzLnB1c2goKChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkgLSAxKSlcbiAgICAgICAgICAgICYgKE1hdGgucG93KDIsIC0yICogaW1vZDQgKyA4KSAtIDEpKSA8PCAoaW1vZDQgKiAyKSlcbiAgICAgICAgICAgIHwgKGJhc2U2NG1hcC5pbmRleE9mKGJhc2U2NC5jaGFyQXQoaSkpID4+PiAoNiAtIGltb2Q0ICogMikpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBjcnlwdDtcbn0pKCk7XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIihmdW5jdGlvbigpe1xyXG4gIHZhciBjcnlwdCA9IHJlcXVpcmUoJ2NyeXB0JyksXHJcbiAgICAgIHV0ZjggPSByZXF1aXJlKCdjaGFyZW5jJykudXRmOCxcclxuICAgICAgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKSxcclxuICAgICAgYmluID0gcmVxdWlyZSgnY2hhcmVuYycpLmJpbixcclxuXHJcbiAgLy8gVGhlIGNvcmVcclxuICBtZDUgPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgLy8gQ29udmVydCB0byBieXRlIGFycmF5XHJcbiAgICBpZiAobWVzc2FnZS5jb25zdHJ1Y3RvciA9PSBTdHJpbmcpXHJcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RpbmcgPT09ICdiaW5hcnknKVxyXG4gICAgICAgIG1lc3NhZ2UgPSBiaW4uc3RyaW5nVG9CeXRlcyhtZXNzYWdlKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIG1lc3NhZ2UgPSB1dGY4LnN0cmluZ1RvQnl0ZXMobWVzc2FnZSk7XHJcbiAgICBlbHNlIGlmIChpc0J1ZmZlcihtZXNzYWdlKSlcclxuICAgICAgbWVzc2FnZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2UsIDApO1xyXG4gICAgZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZSkpXHJcbiAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnRvU3RyaW5nKCk7XHJcbiAgICAvLyBlbHNlLCBhc3N1bWUgYnl0ZSBhcnJheSBhbHJlYWR5XHJcblxyXG4gICAgdmFyIG0gPSBjcnlwdC5ieXRlc1RvV29yZHMobWVzc2FnZSksXHJcbiAgICAgICAgbCA9IG1lc3NhZ2UubGVuZ3RoICogOCxcclxuICAgICAgICBhID0gIDE3MzI1ODQxOTMsXHJcbiAgICAgICAgYiA9IC0yNzE3MzM4NzksXHJcbiAgICAgICAgYyA9IC0xNzMyNTg0MTk0LFxyXG4gICAgICAgIGQgPSAgMjcxNzMzODc4O1xyXG5cclxuICAgIC8vIFN3YXAgZW5kaWFuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbVtpXSA9ICgobVtpXSA8PCAgOCkgfCAobVtpXSA+Pj4gMjQpKSAmIDB4MDBGRjAwRkYgfFxyXG4gICAgICAgICAgICAgKChtW2ldIDw8IDI0KSB8IChtW2ldID4+PiAgOCkpICYgMHhGRjAwRkYwMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQYWRkaW5nXHJcbiAgICBtW2wgPj4+IDVdIHw9IDB4ODAgPDwgKGwgJSAzMik7XHJcbiAgICBtWygoKGwgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbDtcclxuXHJcbiAgICAvLyBNZXRob2Qgc2hvcnRjdXRzXHJcbiAgICB2YXIgRkYgPSBtZDUuX2ZmLFxyXG4gICAgICAgIEdHID0gbWQ1Ll9nZyxcclxuICAgICAgICBISCA9IG1kNS5faGgsXHJcbiAgICAgICAgSUkgPSBtZDUuX2lpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkgKz0gMTYpIHtcclxuXHJcbiAgICAgIHZhciBhYSA9IGEsXHJcbiAgICAgICAgICBiYiA9IGIsXHJcbiAgICAgICAgICBjYyA9IGMsXHJcbiAgICAgICAgICBkZCA9IGQ7XHJcblxyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyAwXSwgIDcsIC02ODA4NzY5MzYpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKyAyXSwgMTcsICA2MDYxMDU4MTkpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgNF0sICA3LCAtMTc2NDE4ODk3KTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsgNV0sIDEyLCAgMTIwMDA4MDQyNik7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKyA3XSwgMjIsIC00NTcwNTk4Myk7XHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDhdLCAgNywgIDE3NzAwMzU0MTYpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsxMF0sIDE3LCAtNDIwNjMpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKzExXSwgMjIsIC0xOTkwNDA0MTYyKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsxMl0sICA3LCAgMTgwNDYwMzY4Mik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krMTNdLCAxMiwgLTQwMzQxMTAxKTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xyXG5cclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgMV0sICA1LCAtMTY1Nzk2NTEwKTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsgNl0sICA5LCAtMTA2OTUwMTYzMik7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krMTFdLCAxNCwgIDY0MzcxNzcxMyk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDBdLCAyMCwgLTM3Mzg5NzMwMik7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krIDVdLCAgNSwgLTcwMTU1ODY5MSk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krMTBdLCAgOSwgIDM4MDE2MDgzKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsxNV0sIDE0LCAtNjYwNDc4MzM1KTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgOV0sICA1LCAgNTY4NDQ2NDM4KTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsxNF0sICA5LCAtMTAxOTgwMzY5MCk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKzEzXSwgIDUsIC0xNDQ0NjgxNDY3KTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsgMl0sICA5LCAtNTE0MDM3ODQpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKyA3XSwgMTQsICAxNzM1MzI4NDczKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsxMl0sIDIwLCAtMTkyNjYwNzczNCk7XHJcblxyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyA1XSwgIDQsIC0zNzg1NTgpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsxMV0sIDE2LCAgMTgzOTAzMDU2Mik7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krMTRdLCAyMywgLTM1MzA5NTU2KTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsgMV0sICA0LCAtMTUzMDk5MjA2MCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDRdLCAxMSwgIDEyNzI4OTMzNTMpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKzEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsxM10sICA0LCAgNjgxMjc5MTc0KTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgMF0sIDExLCAtMzU4NTM3MjIyKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsgM10sIDE2LCAtNzIyNTIxOTc5KTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsgNl0sIDIzLCAgNzYwMjkxODkpO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyA5XSwgIDQsIC02NDAzNjQ0ODcpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKzEyXSwgMTEsIC00MjE4MTU4MzUpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKzE1XSwgMTYsICA1MzA3NDI1MjApO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xyXG5cclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgMF0sICA2LCAtMTk4NjMwODQ0KTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsgN10sIDEwLCAgMTEyNjg5MTQxNSk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyA1XSwgMjEsIC01NzQzNDA1NSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krMTJdLCAgNiwgIDE3MDA0ODU1NzEpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsxMF0sIDE1LCAtMTA1MTUyMyk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyA4XSwgIDYsICAxODczMzEzMzU5KTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsxNV0sIDEwLCAtMzA2MTE3NDQpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsxM10sIDIxLCAgMTMwOTE1MTY0OSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDRdLCAgNiwgLTE0NTUyMzA3MCk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKyAyXSwgMTUsICA3MTg3ODcyNTkpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xyXG5cclxuICAgICAgYSA9IChhICsgYWEpID4+PiAwO1xyXG4gICAgICBiID0gKGIgKyBiYikgPj4+IDA7XHJcbiAgICAgIGMgPSAoYyArIGNjKSA+Pj4gMDtcclxuICAgICAgZCA9IChkICsgZGQpID4+PiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjcnlwdC5lbmRpYW4oW2EsIGIsIGMsIGRdKTtcclxuICB9O1xyXG5cclxuICAvLyBBdXhpbGlhcnkgZnVuY3Rpb25zXHJcbiAgbWQ1Ll9mZiAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgJiBjIHwgfmIgJiBkKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9nZyAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgJiBkIHwgYyAmIH5kKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9oaCAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgXiBjIF4gZCkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG4gIG1kNS5faWkgID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChjIF4gKGIgfCB+ZCkpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuXHJcbiAgLy8gUGFja2FnZSBwcml2YXRlIGJsb2Nrc2l6ZVxyXG4gIG1kNS5fYmxvY2tzaXplID0gMTY7XHJcbiAgbWQ1Ll9kaWdlc3RzaXplID0gMTY7XHJcblxyXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIGlmIChtZXNzYWdlID09PSB1bmRlZmluZWQgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIGFyZ3VtZW50ICcgKyBtZXNzYWdlKTtcclxuXHJcbiAgICB2YXIgZGlnZXN0Ynl0ZXMgPSBjcnlwdC53b3Jkc1RvQnl0ZXMobWQ1KG1lc3NhZ2UsIG9wdGlvbnMpKTtcclxuICAgIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuYXNCeXRlcyA/IGRpZ2VzdGJ5dGVzIDpcclxuICAgICAgICBvcHRpb25zICYmIG9wdGlvbnMuYXNTdHJpbmcgPyBiaW4uYnl0ZXNUb1N0cmluZyhkaWdlc3RieXRlcykgOlxyXG4gICAgICAgIGNyeXB0LmJ5dGVzVG9IZXgoZGlnZXN0Ynl0ZXMpO1xyXG4gIH07XHJcblxyXG59KSgpO1xyXG4iLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSx0KTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLlNsaW1TZWxlY3Q9dCgpOmUuU2xpbVNlbGVjdD10KCl9KHdpbmRvdyxmdW5jdGlvbigpe3JldHVybiBzPXt9LG4ubT1pPVtmdW5jdGlvbihlLHQsaSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcyhlLHQpe3Q9dHx8e2J1YmJsZXM6ITEsY2FuY2VsYWJsZTohMSxkZXRhaWw6dm9pZCAwfTt2YXIgaT1kb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO3JldHVybiBpLmluaXRDdXN0b21FdmVudChlLHQuYnViYmxlcyx0LmNhbmNlbGFibGUsdC5kZXRhaWwpLGl9dmFyIG47dC5fX2VzTW9kdWxlPSEwLHQuaGFzQ2xhc3NJblRyZWU9ZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBzKGUsdCl7cmV0dXJuIHQmJmUmJmUuY2xhc3NMaXN0JiZlLmNsYXNzTGlzdC5jb250YWlucyh0KT9lOm51bGx9cmV0dXJuIHMoZSx0KXx8ZnVuY3Rpb24gZSh0LGkpe3JldHVybiB0JiZ0IT09ZG9jdW1lbnQ/cyh0LGkpP3Q6ZSh0LnBhcmVudE5vZGUsaSk6bnVsbH0oZSx0KX0sdC5lbnN1cmVFbGVtZW50SW5WaWV3PWZ1bmN0aW9uKGUsdCl7dmFyIGk9ZS5zY3JvbGxUb3ArZS5vZmZzZXRUb3Ascz1pK2UuY2xpZW50SGVpZ2h0LG49dC5vZmZzZXRUb3AsYT1uK3QuY2xpZW50SGVpZ2h0O248aT9lLnNjcm9sbFRvcC09aS1uOnM8YSYmKGUuc2Nyb2xsVG9wKz1hLXMpfSx0LnB1dENvbnRlbnQ9ZnVuY3Rpb24oZSx0LGkpe3ZhciBzPWUub2Zmc2V0SGVpZ2h0LG49ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxhPWk/bi50b3A6bi50b3AtcyxvPWk/bi5ib3R0b206bi5ib3R0b20rcztyZXR1cm4gYTw9MD9cImJlbG93XCI6bz49d2luZG93LmlubmVySGVpZ2h0P1wiYWJvdmVcIjppP3Q6XCJiZWxvd1wifSx0LmRlYm91bmNlPWZ1bmN0aW9uKG4sYSxvKXt2YXIgbDtyZXR1cm4gdm9pZCAwPT09YSYmKGE9MTAwKSx2b2lkIDA9PT1vJiYobz0hMSksZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD0wO3Q8YXJndW1lbnRzLmxlbmd0aDt0KyspZVt0XT1hcmd1bWVudHNbdF07dmFyIGk9c2VsZixzPW8mJiFsO2NsZWFyVGltZW91dChsKSxsPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtsPW51bGwsb3x8bi5hcHBseShpLGUpfSxhKSxzJiZuLmFwcGx5KGksZSl9fSx0LmlzVmFsdWVJbkFycmF5T2ZPYmplY3RzPWZ1bmN0aW9uKGUsdCxpKXtpZighQXJyYXkuaXNBcnJheShlKSlyZXR1cm4gZVt0XT09PWk7Zm9yKHZhciBzPTAsbj1lO3M8bi5sZW5ndGg7cysrKXt2YXIgYT1uW3NdO2lmKGEmJmFbdF0mJmFbdF09PT1pKXJldHVybiEwfXJldHVybiExfSx0LmhpZ2hsaWdodD1mdW5jdGlvbihlLHQsaSl7dmFyIHM9ZSxuPW5ldyBSZWdFeHAoXCIoXCIrdC50cmltKCkrXCIpKD8hW148XSo+W148Pl0qPC8pXCIsXCJpXCIpO2lmKCFlLm1hdGNoKG4pKXJldHVybiBlO3ZhciBhPWUubWF0Y2gobikuaW5kZXgsbz1hK2UubWF0Y2gobilbMF0udG9TdHJpbmcoKS5sZW5ndGgsbD1lLnN1YnN0cmluZyhhLG8pO3JldHVybiBzPXMucmVwbGFjZShuLCc8bWFyayBjbGFzcz1cIicraSsnXCI+JytsK1wiPC9tYXJrPlwiKX0sdC5rZWJhYkNhc2U9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5yZXBsYWNlKC9bQS1aXFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMERFXS9nLGZ1bmN0aW9uKGUpe3JldHVyblwiLVwiK2UudG9Mb3dlckNhc2UoKX0pO3JldHVybiBlWzBdPT09ZVswXS50b1VwcGVyQ2FzZSgpP3Quc3Vic3RyaW5nKDEpOnR9LFwiZnVuY3Rpb25cIiE9dHlwZW9mKG49d2luZG93KS5DdXN0b21FdmVudCYmKHMucHJvdG90eXBlPW4uRXZlbnQucHJvdG90eXBlLG4uQ3VzdG9tRXZlbnQ9cyl9LGZ1bmN0aW9uKGUsdCxpKXtcInVzZSBzdHJpY3RcIjt0Ll9fZXNNb2R1bGU9ITA7dmFyIHM9KG4ucHJvdG90eXBlLm5ld09wdGlvbj1mdW5jdGlvbihlKXtyZXR1cm57aWQ6ZS5pZD9lLmlkOlN0cmluZyhNYXRoLmZsb29yKDFlOCpNYXRoLnJhbmRvbSgpKSksdmFsdWU6ZS52YWx1ZT9lLnZhbHVlOlwiXCIsdGV4dDplLnRleHQ/ZS50ZXh0OlwiXCIsaW5uZXJIVE1MOmUuaW5uZXJIVE1MP2UuaW5uZXJIVE1MOlwiXCIsc2VsZWN0ZWQ6ISFlLnNlbGVjdGVkJiZlLnNlbGVjdGVkLGRpc3BsYXk6dm9pZCAwPT09ZS5kaXNwbGF5fHxlLmRpc3BsYXksZGlzYWJsZWQ6ISFlLmRpc2FibGVkJiZlLmRpc2FibGVkLHBsYWNlaG9sZGVyOiEhZS5wbGFjZWhvbGRlciYmZS5wbGFjZWhvbGRlcixjbGFzczplLmNsYXNzP2UuY2xhc3M6dm9pZCAwLGRhdGE6ZS5kYXRhP2UuZGF0YTp7fSxtYW5kYXRvcnk6ISFlLm1hbmRhdG9yeSYmZS5tYW5kYXRvcnl9fSxuLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24oZSl7dGhpcy5kYXRhLnB1c2goe2lkOlN0cmluZyhNYXRoLmZsb29yKDFlOCpNYXRoLnJhbmRvbSgpKSksdmFsdWU6ZS52YWx1ZSx0ZXh0OmUudGV4dCxpbm5lckhUTUw6XCJcIixzZWxlY3RlZDohMSxkaXNwbGF5OiEwLGRpc2FibGVkOiExLHBsYWNlaG9sZGVyOiExLGNsYXNzOnZvaWQgMCxtYW5kYXRvcnk6ZS5tYW5kYXRvcnksZGF0YTp7fX0pfSxuLnByb3RvdHlwZS5wYXJzZVNlbGVjdERhdGE9ZnVuY3Rpb24oKXt0aGlzLmRhdGE9W107Zm9yKHZhciBlPTAsdD10aGlzLm1haW4uc2VsZWN0LmVsZW1lbnQuY2hpbGROb2RlcztlPHQubGVuZ3RoO2UrKyl7dmFyIGk9dFtlXTtpZihcIk9QVEdST1VQXCI9PT1pLm5vZGVOYW1lKXtmb3IodmFyIHM9e2xhYmVsOmkubGFiZWwsb3B0aW9uczpbXX0sbj0wLGE9aS5jaGlsZE5vZGVzO248YS5sZW5ndGg7bisrKXt2YXIgbz1hW25dO2lmKFwiT1BUSU9OXCI9PT1vLm5vZGVOYW1lKXt2YXIgbD10aGlzLnB1bGxPcHRpb25EYXRhKG8pO3Mub3B0aW9ucy5wdXNoKGwpLGwucGxhY2Vob2xkZXImJlwiXCIhPT1sLnRleHQudHJpbSgpJiYodGhpcy5tYWluLmNvbmZpZy5wbGFjZWhvbGRlclRleHQ9bC50ZXh0KX19dGhpcy5kYXRhLnB1c2gocyl9ZWxzZVwiT1BUSU9OXCI9PT1pLm5vZGVOYW1lJiYobD10aGlzLnB1bGxPcHRpb25EYXRhKGkpLHRoaXMuZGF0YS5wdXNoKGwpLGwucGxhY2Vob2xkZXImJlwiXCIhPT1sLnRleHQudHJpbSgpJiYodGhpcy5tYWluLmNvbmZpZy5wbGFjZWhvbGRlclRleHQ9bC50ZXh0KSl9fSxuLnByb3RvdHlwZS5wdWxsT3B0aW9uRGF0YT1mdW5jdGlvbihlKXtyZXR1cm57aWQ6ISFlLmRhdGFzZXQmJmUuZGF0YXNldC5pZHx8U3RyaW5nKE1hdGguZmxvb3IoMWU4Kk1hdGgucmFuZG9tKCkpKSx2YWx1ZTplLnZhbHVlLHRleHQ6ZS50ZXh0LGlubmVySFRNTDplLmlubmVySFRNTCxzZWxlY3RlZDplLnNlbGVjdGVkLGRpc2FibGVkOmUuZGlzYWJsZWQscGxhY2Vob2xkZXI6XCJ0cnVlXCI9PT1lLmRhdGFzZXQucGxhY2Vob2xkZXIsY2xhc3M6ZS5jbGFzc05hbWUsc3R5bGU6ZS5zdHlsZS5jc3NUZXh0LGRhdGE6ZS5kYXRhc2V0LG1hbmRhdG9yeTohIWUuZGF0YXNldCYmXCJ0cnVlXCI9PT1lLmRhdGFzZXQubWFuZGF0b3J5fX0sbi5wcm90b3R5cGUuc2V0U2VsZWN0ZWRGcm9tU2VsZWN0PWZ1bmN0aW9uKCl7aWYodGhpcy5tYWluLmNvbmZpZy5pc011bHRpcGxlKXtmb3IodmFyIGU9W10sdD0wLGk9dGhpcy5tYWluLnNlbGVjdC5lbGVtZW50Lm9wdGlvbnM7dDxpLmxlbmd0aDt0Kyspe3ZhciBzPWlbdF07aWYocy5zZWxlY3RlZCl7dmFyIG49dGhpcy5nZXRPYmplY3RGcm9tRGF0YShzLnZhbHVlLFwidmFsdWVcIik7biYmbi5pZCYmZS5wdXNoKG4uaWQpfX10aGlzLnNldFNlbGVjdGVkKGUsXCJpZFwiKX1lbHNle3ZhciBhPXRoaXMubWFpbi5zZWxlY3QuZWxlbWVudDtpZigtMSE9PWEuc2VsZWN0ZWRJbmRleCl7dmFyIG89YS5vcHRpb25zW2Euc2VsZWN0ZWRJbmRleF0udmFsdWU7dGhpcy5zZXRTZWxlY3RlZChvLFwidmFsdWVcIil9fX0sbi5wcm90b3R5cGUuc2V0U2VsZWN0ZWQ9ZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT10JiYodD1cImlkXCIpO2Zvcih2YXIgaT0wLHM9dGhpcy5kYXRhO2k8cy5sZW5ndGg7aSsrKXt2YXIgbj1zW2ldO2lmKG4uaGFzT3duUHJvcGVydHkoXCJsYWJlbFwiKSl7aWYobi5oYXNPd25Qcm9wZXJ0eShcIm9wdGlvbnNcIikpe3ZhciBhPW4ub3B0aW9ucztpZihhKWZvcih2YXIgbz0wLGw9YTtvPGwubGVuZ3RoO28rKyl7dmFyIHI9bFtvXTtyLnBsYWNlaG9sZGVyfHwoci5zZWxlY3RlZD10aGlzLnNob3VsZEJlU2VsZWN0ZWQocixlLHQpKX19fWVsc2Ugbi5zZWxlY3RlZD10aGlzLnNob3VsZEJlU2VsZWN0ZWQobixlLHQpfX0sbi5wcm90b3R5cGUuc2hvdWxkQmVTZWxlY3RlZD1mdW5jdGlvbihlLHQsaSl7aWYodm9pZCAwPT09aSYmKGk9XCJpZFwiKSxBcnJheS5pc0FycmF5KHQpKWZvcih2YXIgcz0wLG49dDtzPG4ubGVuZ3RoO3MrKyl7dmFyIGE9bltzXTtpZihpIGluIGUmJlN0cmluZyhlW2ldKT09PVN0cmluZyhhKSlyZXR1cm4hMH1lbHNlIGlmKGkgaW4gZSYmU3RyaW5nKGVbaV0pPT09U3RyaW5nKHQpKXJldHVybiEwO3JldHVybiExfSxuLnByb3RvdHlwZS5nZXRTZWxlY3RlZD1mdW5jdGlvbigpe2Zvcih2YXIgZT17dGV4dDpcIlwiLHBsYWNlaG9sZGVyOnRoaXMubWFpbi5jb25maWcucGxhY2Vob2xkZXJUZXh0fSx0PVtdLGk9MCxzPXRoaXMuZGF0YTtpPHMubGVuZ3RoO2krKyl7dmFyIG49c1tpXTtpZihuLmhhc093blByb3BlcnR5KFwibGFiZWxcIikpe2lmKG4uaGFzT3duUHJvcGVydHkoXCJvcHRpb25zXCIpKXt2YXIgYT1uLm9wdGlvbnM7aWYoYSlmb3IodmFyIG89MCxsPWE7bzxsLmxlbmd0aDtvKyspe3ZhciByPWxbb107ci5zZWxlY3RlZCYmKHRoaXMubWFpbi5jb25maWcuaXNNdWx0aXBsZT90LnB1c2gocik6ZT1yKX19fWVsc2Ugbi5zZWxlY3RlZCYmKHRoaXMubWFpbi5jb25maWcuaXNNdWx0aXBsZT90LnB1c2gobik6ZT1uKX1yZXR1cm4gdGhpcy5tYWluLmNvbmZpZy5pc011bHRpcGxlP3Q6ZX0sbi5wcm90b3R5cGUuYWRkVG9TZWxlY3RlZD1mdW5jdGlvbihlLHQpe2lmKHZvaWQgMD09PXQmJih0PVwiaWRcIiksdGhpcy5tYWluLmNvbmZpZy5pc011bHRpcGxlKXt2YXIgaT1bXSxzPXRoaXMuZ2V0U2VsZWN0ZWQoKTtpZihBcnJheS5pc0FycmF5KHMpKWZvcih2YXIgbj0wLGE9cztuPGEubGVuZ3RoO24rKyl7dmFyIG89YVtuXTtpLnB1c2gob1t0XSl9aS5wdXNoKGUpLHRoaXMuc2V0U2VsZWN0ZWQoaSx0KX19LG4ucHJvdG90eXBlLnJlbW92ZUZyb21TZWxlY3RlZD1mdW5jdGlvbihlLHQpe2lmKHZvaWQgMD09PXQmJih0PVwiaWRcIiksdGhpcy5tYWluLmNvbmZpZy5pc011bHRpcGxlKXtmb3IodmFyIGk9W10scz0wLG49dGhpcy5nZXRTZWxlY3RlZCgpO3M8bi5sZW5ndGg7cysrKXt2YXIgYT1uW3NdO1N0cmluZyhhW3RdKSE9PVN0cmluZyhlKSYmaS5wdXNoKGFbdF0pfXRoaXMuc2V0U2VsZWN0ZWQoaSx0KX19LG4ucHJvdG90eXBlLm9uRGF0YUNoYW5nZT1mdW5jdGlvbigpe3RoaXMubWFpbi5vbkNoYW5nZSYmdGhpcy5pc09uQ2hhbmdlRW5hYmxlZCYmdGhpcy5tYWluLm9uQ2hhbmdlKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRTZWxlY3RlZCgpKSkpfSxuLnByb3RvdHlwZS5nZXRPYmplY3RGcm9tRGF0YT1mdW5jdGlvbihlLHQpe3ZvaWQgMD09PXQmJih0PVwiaWRcIik7Zm9yKHZhciBpPTAscz10aGlzLmRhdGE7aTxzLmxlbmd0aDtpKyspe3ZhciBuPXNbaV07aWYodCBpbiBuJiZTdHJpbmcoblt0XSk9PT1TdHJpbmcoZSkpcmV0dXJuIG47aWYobi5oYXNPd25Qcm9wZXJ0eShcIm9wdGlvbnNcIikmJm4ub3B0aW9ucylmb3IodmFyIGE9MCxvPW4ub3B0aW9uczthPG8ubGVuZ3RoO2ErKyl7dmFyIGw9b1thXTtpZihTdHJpbmcobFt0XSk9PT1TdHJpbmcoZSkpcmV0dXJuIGx9fXJldHVybiBudWxsfSxuLnByb3RvdHlwZS5zZWFyY2g9ZnVuY3Rpb24obil7aWYoXCJcIiE9PSh0aGlzLnNlYXJjaFZhbHVlPW4pLnRyaW0oKSl7dmFyIGE9dGhpcy5tYWluLmNvbmZpZy5zZWFyY2hGaWx0ZXIsZT10aGlzLmRhdGEuc2xpY2UoMCk7bj1uLnRyaW0oKTt2YXIgdD1lLm1hcChmdW5jdGlvbihlKXtpZihlLmhhc093blByb3BlcnR5KFwib3B0aW9uc1wiKSl7dmFyIHQ9ZSxpPVtdO2lmKHQub3B0aW9ucyYmKGk9dC5vcHRpb25zLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gYShlLG4pfSkpLDAhPT1pLmxlbmd0aCl7dmFyIHM9T2JqZWN0LmFzc2lnbih7fSx0KTtyZXR1cm4gcy5vcHRpb25zPWksc319cmV0dXJuIGUuaGFzT3duUHJvcGVydHkoXCJ0ZXh0XCIpJiZhKGUsbik/ZTpudWxsfSk7dGhpcy5maWx0ZXJlZD10LmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZX0pfWVsc2UgdGhpcy5maWx0ZXJlZD1udWxsfSxuKTtmdW5jdGlvbiBuKGUpe3RoaXMuY29udGVudE9wZW49ITEsdGhpcy5jb250ZW50UG9zaXRpb249XCJiZWxvd1wiLHRoaXMuaXNPbkNoYW5nZUVuYWJsZWQ9ITAsdGhpcy5tYWluPWUubWFpbix0aGlzLnNlYXJjaFZhbHVlPVwiXCIsdGhpcy5kYXRhPVtdLHRoaXMuZmlsdGVyZWQ9bnVsbCx0aGlzLnBhcnNlU2VsZWN0RGF0YSgpLHRoaXMuc2V0U2VsZWN0ZWRGcm9tU2VsZWN0KCl9ZnVuY3Rpb24gcihlKXtyZXR1cm4gdm9pZCAwIT09ZS50ZXh0fHwoY29uc29sZS5lcnJvcihcIkRhdGEgb2JqZWN0IG9wdGlvbiBtdXN0IGhhdmUgYXQgbGVhc3QgaGF2ZSBhIHRleHQgdmFsdWUuIENoZWNrIG9iamVjdDogXCIrSlNPTi5zdHJpbmdpZnkoZSkpLCExKX10LkRhdGE9cyx0LnZhbGlkYXRlRGF0YT1mdW5jdGlvbihlKXtpZighZSlyZXR1cm4gY29uc29sZS5lcnJvcihcIkRhdGEgbXVzdCBiZSBhbiBhcnJheSBvZiBvYmplY3RzXCIpLCExO2Zvcih2YXIgdD0wLGk9MCxzPWU7aTxzLmxlbmd0aDtpKyspe3ZhciBuPXNbaV07aWYobi5oYXNPd25Qcm9wZXJ0eShcImxhYmVsXCIpKXtpZihuLmhhc093blByb3BlcnR5KFwib3B0aW9uc1wiKSl7dmFyIGE9bi5vcHRpb25zO2lmKGEpZm9yKHZhciBvPTAsbD1hO288bC5sZW5ndGg7bysrKXtyKGxbb10pfHx0Kyt9fX1lbHNlIHIobil8fHQrK31yZXR1cm4gMD09PXR9LHQudmFsaWRhdGVPcHRpb249cn0sZnVuY3Rpb24oZSx0LGkpe1widXNlIHN0cmljdFwiO3QuX19lc01vZHVsZT0hMDt2YXIgcz1pKDMpLG49aSg0KSxhPWkoNSksbz1pKDEpLGw9aSgwKSxyPShjLnByb3RvdHlwZS52YWxpZGF0ZT1mdW5jdGlvbihlKXt2YXIgdD1cInN0cmluZ1wiPT10eXBlb2YgZS5zZWxlY3Q/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlLnNlbGVjdCk6ZS5zZWxlY3Q7aWYoIXQpdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgc2VsZWN0IGVsZW1lbnRcIik7aWYoXCJTRUxFQ1RcIiE9PXQudGFnTmFtZSl0aHJvdyBuZXcgRXJyb3IoXCJFbGVtZW50IGlzbnQgb2YgdHlwZSBzZWxlY3RcIik7cmV0dXJuIHR9LGMucHJvdG90eXBlLnNlbGVjdGVkPWZ1bmN0aW9uKCl7aWYodGhpcy5jb25maWcuaXNNdWx0aXBsZSl7Zm9yKHZhciBlPVtdLHQ9MCxpPW49dGhpcy5kYXRhLmdldFNlbGVjdGVkKCk7dDxpLmxlbmd0aDt0Kyspe3ZhciBzPWlbdF07ZS5wdXNoKHMudmFsdWUpfXJldHVybiBlfXZhciBuO3JldHVybihuPXRoaXMuZGF0YS5nZXRTZWxlY3RlZCgpKT9uLnZhbHVlOlwiXCJ9LGMucHJvdG90eXBlLnNldD1mdW5jdGlvbihlLHQsaSxzKXt2b2lkIDA9PT10JiYodD1cInZhbHVlXCIpLHZvaWQgMD09PWkmJihpPSEwKSx2b2lkIDA9PT1zJiYocz0hMCksdGhpcy5jb25maWcuaXNNdWx0aXBsZSYmIUFycmF5LmlzQXJyYXkoZSk/dGhpcy5kYXRhLmFkZFRvU2VsZWN0ZWQoZSx0KTp0aGlzLmRhdGEuc2V0U2VsZWN0ZWQoZSx0KSx0aGlzLnNlbGVjdC5zZXRWYWx1ZSgpLHRoaXMuZGF0YS5vbkRhdGFDaGFuZ2UoKSx0aGlzLnJlbmRlcigpLGkmJnRoaXMuY2xvc2UoKX0sYy5wcm90b3R5cGUuc2V0U2VsZWN0ZWQ9ZnVuY3Rpb24oZSx0LGkscyl7dm9pZCAwPT09dCYmKHQ9XCJ2YWx1ZVwiKSx2b2lkIDA9PT1pJiYoaT0hMCksdm9pZCAwPT09cyYmKHM9ITApLHRoaXMuc2V0KGUsdCxpLHMpfSxjLnByb3RvdHlwZS5zZXREYXRhPWZ1bmN0aW9uKGUpe2lmKG8udmFsaWRhdGVEYXRhKGUpKXt2YXIgdD1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGUpKSxpPXRoaXMuZGF0YS5nZXRTZWxlY3RlZCgpO2lmKHRoaXMuY29uZmlnLmlzQWpheCYmaSlpZih0aGlzLmNvbmZpZy5pc011bHRpcGxlKWZvcih2YXIgcz0wLG49aS5yZXZlcnNlKCk7czxuLmxlbmd0aDtzKyspe3ZhciBhPW5bc107dC51bnNoaWZ0KGEpfWVsc2UgdC51bnNoaWZ0KHRoaXMuZGF0YS5nZXRTZWxlY3RlZCgpKSx0LnVuc2hpZnQoe3RleHQ6XCJcIixwbGFjZWhvbGRlcjohMH0pO3RoaXMuc2VsZWN0LmNyZWF0ZSh0KSx0aGlzLmRhdGEucGFyc2VTZWxlY3REYXRhKCksdGhpcy5kYXRhLnNldFNlbGVjdGVkRnJvbVNlbGVjdCgpfWVsc2UgY29uc29sZS5lcnJvcihcIlZhbGlkYXRpb24gcHJvYmxlbSBvbjogI1wiK3RoaXMuc2VsZWN0LmVsZW1lbnQuaWQpfSxjLnByb3RvdHlwZS5hZGREYXRhPWZ1bmN0aW9uKGUpe28udmFsaWRhdGVEYXRhKFtlXSk/KHRoaXMuZGF0YS5hZGQodGhpcy5kYXRhLm5ld09wdGlvbihlKSksdGhpcy5zZWxlY3QuY3JlYXRlKHRoaXMuZGF0YS5kYXRhKSx0aGlzLmRhdGEucGFyc2VTZWxlY3REYXRhKCksdGhpcy5kYXRhLnNldFNlbGVjdGVkRnJvbVNlbGVjdCgpLHRoaXMucmVuZGVyKCkpOmNvbnNvbGUuZXJyb3IoXCJWYWxpZGF0aW9uIHByb2JsZW0gb246ICNcIit0aGlzLnNlbGVjdC5lbGVtZW50LmlkKX0sYy5wcm90b3R5cGUub3Blbj1mdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYodGhpcy5jb25maWcuaXNFbmFibGVkJiYhdGhpcy5kYXRhLmNvbnRlbnRPcGVuKXtpZih0aGlzLmJlZm9yZU9wZW4mJnRoaXMuYmVmb3JlT3BlbigpLHRoaXMuY29uZmlnLmlzTXVsdGlwbGUmJnRoaXMuc2xpbS5tdWx0aVNlbGVjdGVkP3RoaXMuc2xpbS5tdWx0aVNlbGVjdGVkLnBsdXMuY2xhc3NMaXN0LmFkZChcInNzLWNyb3NzXCIpOnRoaXMuc2xpbS5zaW5nbGVTZWxlY3RlZCYmKHRoaXMuc2xpbS5zaW5nbGVTZWxlY3RlZC5hcnJvd0ljb24uYXJyb3cuY2xhc3NMaXN0LnJlbW92ZShcImFycm93LWRvd25cIiksdGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkLmFycm93SWNvbi5hcnJvdy5jbGFzc0xpc3QuYWRkKFwiYXJyb3ctdXBcIikpLHRoaXMuc2xpbVt0aGlzLmNvbmZpZy5pc011bHRpcGxlP1wibXVsdGlTZWxlY3RlZFwiOlwic2luZ2xlU2VsZWN0ZWRcIl0uY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhYm92ZVwiPT09dGhpcy5kYXRhLmNvbnRlbnRQb3NpdGlvbj90aGlzLmNvbmZpZy5vcGVuQWJvdmU6dGhpcy5jb25maWcub3BlbkJlbG93KSx0aGlzLmNvbmZpZy5hZGRUb0JvZHkpe3ZhciB0PXRoaXMuc2xpbS5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7dGhpcy5zbGltLmNvbnRlbnQuc3R5bGUudG9wPXQudG9wK3QuaGVpZ2h0K3dpbmRvdy5zY3JvbGxZK1wicHhcIix0aGlzLnNsaW0uY29udGVudC5zdHlsZS5sZWZ0PXQubGVmdCt3aW5kb3cuc2Nyb2xsWCtcInB4XCIsdGhpcy5zbGltLmNvbnRlbnQuc3R5bGUud2lkdGg9dC53aWR0aCtcInB4XCJ9aWYodGhpcy5zbGltLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbmZpZy5vcGVuKSxcInVwXCI9PT10aGlzLmNvbmZpZy5zaG93Q29udGVudC50b0xvd2VyQ2FzZSgpfHxcImRvd25cIiE9PXRoaXMuY29uZmlnLnNob3dDb250ZW50LnRvTG93ZXJDYXNlKCkmJlwiYWJvdmVcIj09PWwucHV0Q29udGVudCh0aGlzLnNsaW0uY29udGVudCx0aGlzLmRhdGEuY29udGVudFBvc2l0aW9uLHRoaXMuZGF0YS5jb250ZW50T3Blbik/dGhpcy5tb3ZlQ29udGVudEFib3ZlKCk6dGhpcy5tb3ZlQ29udGVudEJlbG93KCksIXRoaXMuY29uZmlnLmlzTXVsdGlwbGUpe3ZhciBpPXRoaXMuZGF0YS5nZXRTZWxlY3RlZCgpO2lmKGkpe3ZhciBzPWkuaWQsbj10aGlzLnNsaW0ubGlzdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pZD1cIicrcysnXCJdJyk7biYmbC5lbnN1cmVFbGVtZW50SW5WaWV3KHRoaXMuc2xpbS5saXN0LG4pfX1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZS5kYXRhLmNvbnRlbnRPcGVuPSEwLGUuY29uZmlnLnNlYXJjaEZvY3VzJiZlLnNsaW0uc2VhcmNoLmlucHV0LmZvY3VzKCksZS5hZnRlck9wZW4mJmUuYWZ0ZXJPcGVuKCl9LHRoaXMuY29uZmlnLnRpbWVvdXREZWxheSl9fSxjLnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbigpe3ZhciBlPXRoaXM7dGhpcy5kYXRhLmNvbnRlbnRPcGVuJiYodGhpcy5iZWZvcmVDbG9zZSYmdGhpcy5iZWZvcmVDbG9zZSgpLHRoaXMuY29uZmlnLmlzTXVsdGlwbGUmJnRoaXMuc2xpbS5tdWx0aVNlbGVjdGVkPyh0aGlzLnNsaW0ubXVsdGlTZWxlY3RlZC5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNvbmZpZy5vcGVuQWJvdmUpLHRoaXMuc2xpbS5tdWx0aVNlbGVjdGVkLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uZmlnLm9wZW5CZWxvdyksdGhpcy5zbGltLm11bHRpU2VsZWN0ZWQucGx1cy5jbGFzc0xpc3QucmVtb3ZlKFwic3MtY3Jvc3NcIikpOnRoaXMuc2xpbS5zaW5nbGVTZWxlY3RlZCYmKHRoaXMuc2xpbS5zaW5nbGVTZWxlY3RlZC5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNvbmZpZy5vcGVuQWJvdmUpLHRoaXMuc2xpbS5zaW5nbGVTZWxlY3RlZC5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNvbmZpZy5vcGVuQmVsb3cpLHRoaXMuc2xpbS5zaW5nbGVTZWxlY3RlZC5hcnJvd0ljb24uYXJyb3cuY2xhc3NMaXN0LmFkZChcImFycm93LWRvd25cIiksdGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkLmFycm93SWNvbi5hcnJvdy5jbGFzc0xpc3QucmVtb3ZlKFwiYXJyb3ctdXBcIikpLHRoaXMuc2xpbS5jb250ZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcub3BlbiksdGhpcy5kYXRhLmNvbnRlbnRPcGVuPSExLHRoaXMuc2VhcmNoKFwiXCIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlLnNsaW0uY29udGVudC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKSxlLmRhdGEuY29udGVudFBvc2l0aW9uPVwiYmVsb3dcIixlLmNvbmZpZy5pc011bHRpcGxlJiZlLnNsaW0ubXVsdGlTZWxlY3RlZD8oZS5zbGltLm11bHRpU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoZS5jb25maWcub3BlbkFib3ZlKSxlLnNsaW0ubXVsdGlTZWxlY3RlZC5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShlLmNvbmZpZy5vcGVuQmVsb3cpKTplLnNsaW0uc2luZ2xlU2VsZWN0ZWQmJihlLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoZS5jb25maWcub3BlbkFib3ZlKSxlLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoZS5jb25maWcub3BlbkJlbG93KSksZS5zbGltLnNlYXJjaC5pbnB1dC5ibHVyKCksZS5hZnRlckNsb3NlJiZlLmFmdGVyQ2xvc2UoKX0sdGhpcy5jb25maWcudGltZW91dERlbGF5KSl9LGMucHJvdG90eXBlLm1vdmVDb250ZW50QWJvdmU9ZnVuY3Rpb24oKXt2YXIgZT0wO3RoaXMuY29uZmlnLmlzTXVsdGlwbGUmJnRoaXMuc2xpbS5tdWx0aVNlbGVjdGVkP2U9dGhpcy5zbGltLm11bHRpU2VsZWN0ZWQuY29udGFpbmVyLm9mZnNldEhlaWdodDp0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQmJihlPXRoaXMuc2xpbS5zaW5nbGVTZWxlY3RlZC5jb250YWluZXIub2Zmc2V0SGVpZ2h0KTt2YXIgdD1lK3RoaXMuc2xpbS5jb250ZW50Lm9mZnNldEhlaWdodC0xO3RoaXMuc2xpbS5jb250ZW50LnN0eWxlLm1hcmdpbj1cIi1cIit0K1wicHggMCAwIDBcIix0aGlzLnNsaW0uY29udGVudC5zdHlsZS5oZWlnaHQ9dC1lKzErXCJweFwiLHRoaXMuc2xpbS5jb250ZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbj1cImNlbnRlciBib3R0b21cIix0aGlzLmRhdGEuY29udGVudFBvc2l0aW9uPVwiYWJvdmVcIix0aGlzLmNvbmZpZy5pc011bHRpcGxlJiZ0aGlzLnNsaW0ubXVsdGlTZWxlY3RlZD8odGhpcy5zbGltLm11bHRpU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcub3BlbkJlbG93KSx0aGlzLnNsaW0ubXVsdGlTZWxlY3RlZC5jb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbmZpZy5vcGVuQWJvdmUpKTp0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQmJih0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcub3BlbkJlbG93KSx0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5jb25maWcub3BlbkFib3ZlKSl9LGMucHJvdG90eXBlLm1vdmVDb250ZW50QmVsb3c9ZnVuY3Rpb24oKXt0aGlzLmRhdGEuY29udGVudFBvc2l0aW9uPVwiYmVsb3dcIix0aGlzLmNvbmZpZy5pc011bHRpcGxlJiZ0aGlzLnNsaW0ubXVsdGlTZWxlY3RlZD8odGhpcy5zbGltLm11bHRpU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcub3BlbkFib3ZlKSx0aGlzLnNsaW0ubXVsdGlTZWxlY3RlZC5jb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbmZpZy5vcGVuQmVsb3cpKTp0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQmJih0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcub3BlbkFib3ZlKSx0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5jb25maWcub3BlbkJlbG93KSl9LGMucHJvdG90eXBlLmVuYWJsZT1mdW5jdGlvbigpe3RoaXMuY29uZmlnLmlzRW5hYmxlZD0hMCx0aGlzLmNvbmZpZy5pc011bHRpcGxlJiZ0aGlzLnNsaW0ubXVsdGlTZWxlY3RlZD90aGlzLnNsaW0ubXVsdGlTZWxlY3RlZC5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNvbmZpZy5kaXNhYmxlZCk6dGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkJiZ0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcuZGlzYWJsZWQpLHRoaXMuc2VsZWN0LnRyaWdnZXJNdXRhdGlvbk9ic2VydmVyPSExLHRoaXMuc2VsZWN0LmVsZW1lbnQuZGlzYWJsZWQ9ITEsdGhpcy5zbGltLnNlYXJjaC5pbnB1dC5kaXNhYmxlZD0hMSx0aGlzLnNlbGVjdC50cmlnZ2VyTXV0YXRpb25PYnNlcnZlcj0hMH0sYy5wcm90b3R5cGUuZGlzYWJsZT1mdW5jdGlvbigpe3RoaXMuY29uZmlnLmlzRW5hYmxlZD0hMSx0aGlzLmNvbmZpZy5pc011bHRpcGxlJiZ0aGlzLnNsaW0ubXVsdGlTZWxlY3RlZD90aGlzLnNsaW0ubXVsdGlTZWxlY3RlZC5jb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbmZpZy5kaXNhYmxlZCk6dGhpcy5zbGltLnNpbmdsZVNlbGVjdGVkJiZ0aGlzLnNsaW0uc2luZ2xlU2VsZWN0ZWQuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5jb25maWcuZGlzYWJsZWQpLHRoaXMuc2VsZWN0LnRyaWdnZXJNdXRhdGlvbk9ic2VydmVyPSExLHRoaXMuc2VsZWN0LmVsZW1lbnQuZGlzYWJsZWQ9ITAsdGhpcy5zbGltLnNlYXJjaC5pbnB1dC5kaXNhYmxlZD0hMCx0aGlzLnNlbGVjdC50cmlnZ2VyTXV0YXRpb25PYnNlcnZlcj0hMH0sYy5wcm90b3R5cGUuc2VhcmNoPWZ1bmN0aW9uKHQpe2lmKHRoaXMuZGF0YS5zZWFyY2hWYWx1ZSE9PXQpaWYodGhpcy5zbGltLnNlYXJjaC5pbnB1dC52YWx1ZT10LHRoaXMuY29uZmlnLmlzQWpheCl7dmFyIGk9dGhpczt0aGlzLmNvbmZpZy5pc1NlYXJjaGluZz0hMCx0aGlzLnJlbmRlcigpLHRoaXMuYWpheCYmdGhpcy5hamF4KHQsZnVuY3Rpb24oZSl7aS5jb25maWcuaXNTZWFyY2hpbmc9ITEsQXJyYXkuaXNBcnJheShlKT8oZS51bnNoaWZ0KHt0ZXh0OlwiXCIscGxhY2Vob2xkZXI6ITB9KSxpLnNldERhdGEoZSksaS5kYXRhLnNlYXJjaCh0KSxpLnJlbmRlcigpKTpcInN0cmluZ1wiPT10eXBlb2YgZT9pLnNsaW0ub3B0aW9ucyhlKTppLnJlbmRlcigpfSl9ZWxzZSB0aGlzLmRhdGEuc2VhcmNoKHQpLHRoaXMucmVuZGVyKCl9LGMucHJvdG90eXBlLnNldFNlYXJjaFRleHQ9ZnVuY3Rpb24oZSl7dGhpcy5jb25maWcuc2VhcmNoVGV4dD1lfSxjLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oKXt0aGlzLmNvbmZpZy5pc011bHRpcGxlP3RoaXMuc2xpbS52YWx1ZXMoKToodGhpcy5zbGltLnBsYWNlaG9sZGVyKCksdGhpcy5zbGltLmRlc2VsZWN0KCkpLHRoaXMuc2xpbS5vcHRpb25zKCl9LGMucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oZSl7dm9pZCAwPT09ZSYmKGU9bnVsbCk7dmFyIHQ9ZT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlwiK2UrXCIuc3MtbWFpblwiKTp0aGlzLnNsaW0uY29udGFpbmVyLGk9ZT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc3NpZD1cIitlK1wiXVwiKTp0aGlzLnNlbGVjdC5lbGVtZW50O2lmKHQmJmkmJihpLnN0eWxlLmRpc3BsYXk9XCJcIixkZWxldGUgaS5kYXRhc2V0LnNzaWQsaS5zbGltPW51bGwsdC5wYXJlbnRFbGVtZW50JiZ0LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodCksdGhpcy5jb25maWcuYWRkVG9Cb2R5KSl7dmFyIHM9ZT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlwiK2UrXCIuc3MtY29udGVudFwiKTp0aGlzLnNsaW0uY29udGVudDtpZighcylyZXR1cm47ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzKX19LGMpO2Z1bmN0aW9uIGMoZSl7dmFyIHQ9dGhpczt0aGlzLmFqYXg9bnVsbCx0aGlzLmFkZGFibGU9bnVsbCx0aGlzLmJlZm9yZU9uQ2hhbmdlPW51bGwsdGhpcy5vbkNoYW5nZT1udWxsLHRoaXMuYmVmb3JlT3Blbj1udWxsLHRoaXMuYWZ0ZXJPcGVuPW51bGwsdGhpcy5iZWZvcmVDbG9zZT1udWxsLHRoaXMuYWZ0ZXJDbG9zZT1udWxsO3ZhciBpPXRoaXMudmFsaWRhdGUoZSk7aS5kYXRhc2V0LnNzaWQmJnRoaXMuZGVzdHJveShpLmRhdGFzZXQuc3NpZCksZS5hamF4JiYodGhpcy5hamF4PWUuYWpheCksZS5hZGRhYmxlJiYodGhpcy5hZGRhYmxlPWUuYWRkYWJsZSksdGhpcy5jb25maWc9bmV3IHMuQ29uZmlnKHtzZWxlY3Q6aSxpc0FqYXg6ISFlLmFqYXgsc2hvd1NlYXJjaDplLnNob3dTZWFyY2gsc2VhcmNoUGxhY2Vob2xkZXI6ZS5zZWFyY2hQbGFjZWhvbGRlcixzZWFyY2hUZXh0OmUuc2VhcmNoVGV4dCxzZWFyY2hpbmdUZXh0OmUuc2VhcmNoaW5nVGV4dCxzZWFyY2hGb2N1czplLnNlYXJjaEZvY3VzLHNlYXJjaEhpZ2hsaWdodDplLnNlYXJjaEhpZ2hsaWdodCxzZWFyY2hGaWx0ZXI6ZS5zZWFyY2hGaWx0ZXIsY2xvc2VPblNlbGVjdDplLmNsb3NlT25TZWxlY3Qsc2hvd0NvbnRlbnQ6ZS5zaG93Q29udGVudCxwbGFjZWhvbGRlclRleHQ6ZS5wbGFjZWhvbGRlcixhbGxvd0Rlc2VsZWN0OmUuYWxsb3dEZXNlbGVjdCxhbGxvd0Rlc2VsZWN0T3B0aW9uOmUuYWxsb3dEZXNlbGVjdE9wdGlvbixoaWRlU2VsZWN0ZWRPcHRpb246ZS5oaWRlU2VsZWN0ZWRPcHRpb24sZGVzZWxlY3RMYWJlbDplLmRlc2VsZWN0TGFiZWwsaXNFbmFibGVkOmUuaXNFbmFibGVkLHZhbHVlc1VzZVRleHQ6ZS52YWx1ZXNVc2VUZXh0LHNob3dPcHRpb25Ub29sdGlwczplLnNob3dPcHRpb25Ub29sdGlwcyxzZWxlY3RCeUdyb3VwOmUuc2VsZWN0QnlHcm91cCxsaW1pdDplLmxpbWl0LHRpbWVvdXREZWxheTplLnRpbWVvdXREZWxheSxhZGRUb0JvZHk6ZS5hZGRUb0JvZHl9KSx0aGlzLnNlbGVjdD1uZXcgbi5TZWxlY3Qoe3NlbGVjdDppLG1haW46dGhpc30pLHRoaXMuZGF0YT1uZXcgby5EYXRhKHttYWluOnRoaXN9KSx0aGlzLnNsaW09bmV3IGEuU2xpbSh7bWFpbjp0aGlzfSksdGhpcy5zZWxlY3QuZWxlbWVudC5wYXJlbnROb2RlJiZ0aGlzLnNlbGVjdC5lbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuc2xpbS5jb250YWluZXIsdGhpcy5zZWxlY3QuZWxlbWVudC5uZXh0U2libGluZyksZS5kYXRhP3RoaXMuc2V0RGF0YShlLmRhdGEpOnRoaXMucmVuZGVyKCksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oZSl7ZS50YXJnZXQmJiFsLmhhc0NsYXNzSW5UcmVlKGUudGFyZ2V0LHQuY29uZmlnLmlkKSYmdC5jbG9zZSgpfSksXCJhdXRvXCI9PT10aGlzLmNvbmZpZy5zaG93Q29udGVudCYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixsLmRlYm91bmNlKGZ1bmN0aW9uKGUpe3QuZGF0YS5jb250ZW50T3BlbiYmKFwiYWJvdmVcIj09PWwucHV0Q29udGVudCh0LnNsaW0uY29udGVudCx0LmRhdGEuY29udGVudFBvc2l0aW9uLHQuZGF0YS5jb250ZW50T3Blbik/dC5tb3ZlQ29udGVudEFib3ZlKCk6dC5tb3ZlQ29udGVudEJlbG93KCkpfSksITEpLGUuYmVmb3JlT25DaGFuZ2UmJih0aGlzLmJlZm9yZU9uQ2hhbmdlPWUuYmVmb3JlT25DaGFuZ2UpLGUub25DaGFuZ2UmJih0aGlzLm9uQ2hhbmdlPWUub25DaGFuZ2UpLGUuYmVmb3JlT3BlbiYmKHRoaXMuYmVmb3JlT3Blbj1lLmJlZm9yZU9wZW4pLGUuYWZ0ZXJPcGVuJiYodGhpcy5hZnRlck9wZW49ZS5hZnRlck9wZW4pLGUuYmVmb3JlQ2xvc2UmJih0aGlzLmJlZm9yZUNsb3NlPWUuYmVmb3JlQ2xvc2UpLGUuYWZ0ZXJDbG9zZSYmKHRoaXMuYWZ0ZXJDbG9zZT1lLmFmdGVyQ2xvc2UpLHRoaXMuY29uZmlnLmlzRW5hYmxlZHx8dGhpcy5kaXNhYmxlKCl9dC5kZWZhdWx0PXJ9LGZ1bmN0aW9uKGUsdCxpKXtcInVzZSBzdHJpY3RcIjt0Ll9fZXNNb2R1bGU9ITA7dmFyIHM9KG4ucHJvdG90eXBlLnNlYXJjaEZpbHRlcj1mdW5jdGlvbihlLHQpe3JldHVybi0xIT09ZS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0LnRvTG93ZXJDYXNlKCkpfSxuKTtmdW5jdGlvbiBuKGUpe3RoaXMuaWQ9XCJcIix0aGlzLmlzTXVsdGlwbGU9ITEsdGhpcy5pc0FqYXg9ITEsdGhpcy5pc1NlYXJjaGluZz0hMSx0aGlzLnNob3dTZWFyY2g9ITAsdGhpcy5zZWFyY2hGb2N1cz0hMCx0aGlzLnNlYXJjaEhpZ2hsaWdodD0hMSx0aGlzLmNsb3NlT25TZWxlY3Q9ITAsdGhpcy5zaG93Q29udGVudD1cImF1dG9cIix0aGlzLnNlYXJjaFBsYWNlaG9sZGVyPVwiU2VhcmNoXCIsdGhpcy5zZWFyY2hUZXh0PVwiTm8gUmVzdWx0c1wiLHRoaXMuc2VhcmNoaW5nVGV4dD1cIlNlYXJjaGluZy4uLlwiLHRoaXMucGxhY2Vob2xkZXJUZXh0PVwiU2VsZWN0IFZhbHVlXCIsdGhpcy5hbGxvd0Rlc2VsZWN0PSExLHRoaXMuYWxsb3dEZXNlbGVjdE9wdGlvbj0hMSx0aGlzLmhpZGVTZWxlY3RlZE9wdGlvbj0hMSx0aGlzLmRlc2VsZWN0TGFiZWw9XCJ4XCIsdGhpcy5pc0VuYWJsZWQ9ITAsdGhpcy52YWx1ZXNVc2VUZXh0PSExLHRoaXMuc2hvd09wdGlvblRvb2x0aXBzPSExLHRoaXMuc2VsZWN0QnlHcm91cD0hMSx0aGlzLmxpbWl0PTAsdGhpcy50aW1lb3V0RGVsYXk9MjAwLHRoaXMuYWRkVG9Cb2R5PSExLHRoaXMubWFpbj1cInNzLW1haW5cIix0aGlzLnNpbmdsZVNlbGVjdGVkPVwic3Mtc2luZ2xlLXNlbGVjdGVkXCIsdGhpcy5hcnJvdz1cInNzLWFycm93XCIsdGhpcy5tdWx0aVNlbGVjdGVkPVwic3MtbXVsdGktc2VsZWN0ZWRcIix0aGlzLmFkZD1cInNzLWFkZFwiLHRoaXMucGx1cz1cInNzLXBsdXNcIix0aGlzLnZhbHVlcz1cInNzLXZhbHVlc1wiLHRoaXMudmFsdWU9XCJzcy12YWx1ZVwiLHRoaXMudmFsdWVUZXh0PVwic3MtdmFsdWUtdGV4dFwiLHRoaXMudmFsdWVEZWxldGU9XCJzcy12YWx1ZS1kZWxldGVcIix0aGlzLmNvbnRlbnQ9XCJzcy1jb250ZW50XCIsdGhpcy5vcGVuPVwic3Mtb3BlblwiLHRoaXMub3BlbkFib3ZlPVwic3Mtb3Blbi1hYm92ZVwiLHRoaXMub3BlbkJlbG93PVwic3Mtb3Blbi1iZWxvd1wiLHRoaXMuc2VhcmNoPVwic3Mtc2VhcmNoXCIsdGhpcy5zZWFyY2hIaWdobGlnaHRlcj1cInNzLXNlYXJjaC1oaWdobGlnaHRcIix0aGlzLmFkZGFibGU9XCJzcy1hZGRhYmxlXCIsdGhpcy5saXN0PVwic3MtbGlzdFwiLHRoaXMub3B0Z3JvdXA9XCJzcy1vcHRncm91cFwiLHRoaXMub3B0Z3JvdXBMYWJlbD1cInNzLW9wdGdyb3VwLWxhYmVsXCIsdGhpcy5vcHRncm91cExhYmVsU2VsZWN0YWJsZT1cInNzLW9wdGdyb3VwLWxhYmVsLXNlbGVjdGFibGVcIix0aGlzLm9wdGlvbj1cInNzLW9wdGlvblwiLHRoaXMub3B0aW9uU2VsZWN0ZWQ9XCJzcy1vcHRpb24tc2VsZWN0ZWRcIix0aGlzLmhpZ2hsaWdodGVkPVwic3MtaGlnaGxpZ2h0ZWRcIix0aGlzLmRpc2FibGVkPVwic3MtZGlzYWJsZWRcIix0aGlzLmhpZGU9XCJzcy1oaWRlXCIsdGhpcy5pZD1cInNzLVwiK01hdGguZmxvb3IoMWU1Kk1hdGgucmFuZG9tKCkpLHRoaXMuc3R5bGU9ZS5zZWxlY3Quc3R5bGUuY3NzVGV4dCx0aGlzLmNsYXNzPWUuc2VsZWN0LmNsYXNzTmFtZS5zcGxpdChcIiBcIiksdGhpcy5pc011bHRpcGxlPWUuc2VsZWN0Lm11bHRpcGxlLHRoaXMuaXNBamF4PWUuaXNBamF4LHRoaXMuc2hvd1NlYXJjaD0hMSE9PWUuc2hvd1NlYXJjaCx0aGlzLnNlYXJjaEZvY3VzPSExIT09ZS5zZWFyY2hGb2N1cyx0aGlzLnNlYXJjaEhpZ2hsaWdodD0hMD09PWUuc2VhcmNoSGlnaGxpZ2h0LHRoaXMuY2xvc2VPblNlbGVjdD0hMSE9PWUuY2xvc2VPblNlbGVjdCxlLnNob3dDb250ZW50JiYodGhpcy5zaG93Q29udGVudD1lLnNob3dDb250ZW50KSx0aGlzLmlzRW5hYmxlZD0hMSE9PWUuaXNFbmFibGVkLGUuc2VhcmNoUGxhY2Vob2xkZXImJih0aGlzLnNlYXJjaFBsYWNlaG9sZGVyPWUuc2VhcmNoUGxhY2Vob2xkZXIpLGUuc2VhcmNoVGV4dCYmKHRoaXMuc2VhcmNoVGV4dD1lLnNlYXJjaFRleHQpLGUuc2VhcmNoaW5nVGV4dCYmKHRoaXMuc2VhcmNoaW5nVGV4dD1lLnNlYXJjaGluZ1RleHQpLGUucGxhY2Vob2xkZXJUZXh0JiYodGhpcy5wbGFjZWhvbGRlclRleHQ9ZS5wbGFjZWhvbGRlclRleHQpLHRoaXMuYWxsb3dEZXNlbGVjdD0hMD09PWUuYWxsb3dEZXNlbGVjdCx0aGlzLmFsbG93RGVzZWxlY3RPcHRpb249ITA9PT1lLmFsbG93RGVzZWxlY3RPcHRpb24sdGhpcy5oaWRlU2VsZWN0ZWRPcHRpb249ITA9PT1lLmhpZGVTZWxlY3RlZE9wdGlvbixlLmRlc2VsZWN0TGFiZWwmJih0aGlzLmRlc2VsZWN0TGFiZWw9ZS5kZXNlbGVjdExhYmVsKSxlLnZhbHVlc1VzZVRleHQmJih0aGlzLnZhbHVlc1VzZVRleHQ9ZS52YWx1ZXNVc2VUZXh0KSxlLnNob3dPcHRpb25Ub29sdGlwcyYmKHRoaXMuc2hvd09wdGlvblRvb2x0aXBzPWUuc2hvd09wdGlvblRvb2x0aXBzKSxlLnNlbGVjdEJ5R3JvdXAmJih0aGlzLnNlbGVjdEJ5R3JvdXA9ZS5zZWxlY3RCeUdyb3VwKSxlLmxpbWl0JiYodGhpcy5saW1pdD1lLmxpbWl0KSxlLnNlYXJjaEZpbHRlciYmKHRoaXMuc2VhcmNoRmlsdGVyPWUuc2VhcmNoRmlsdGVyKSxudWxsIT1lLnRpbWVvdXREZWxheSYmKHRoaXMudGltZW91dERlbGF5PWUudGltZW91dERlbGF5KSx0aGlzLmFkZFRvQm9keT0hMD09PWUuYWRkVG9Cb2R5fXQuQ29uZmlnPXN9LGZ1bmN0aW9uKGUsdCxpKXtcInVzZSBzdHJpY3RcIjt0Ll9fZXNNb2R1bGU9ITA7dmFyIHM9aSgwKSxuPShhLnByb3RvdHlwZS5zZXRWYWx1ZT1mdW5jdGlvbigpe2lmKHRoaXMubWFpbi5kYXRhLmdldFNlbGVjdGVkKCkpe2lmKHRoaXMubWFpbi5jb25maWcuaXNNdWx0aXBsZSlmb3IodmFyIGU9dGhpcy5tYWluLmRhdGEuZ2V0U2VsZWN0ZWQoKSx0PTAsaT10aGlzLmVsZW1lbnQub3B0aW9uczt0PGkubGVuZ3RoO3QrKyl7dmFyIHM9aVt0XTtzLnNlbGVjdGVkPSExO2Zvcih2YXIgbj0wLGE9ZTtuPGEubGVuZ3RoO24rKylhW25dLnZhbHVlPT09cy52YWx1ZSYmKHMuc2VsZWN0ZWQ9ITApfWVsc2UgZT10aGlzLm1haW4uZGF0YS5nZXRTZWxlY3RlZCgpLHRoaXMuZWxlbWVudC52YWx1ZT1lP2UudmFsdWU6XCJcIjt0aGlzLm1haW4uZGF0YS5pc09uQ2hhbmdlRW5hYmxlZD0hMSx0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJjaGFuZ2VcIix7YnViYmxlczohMH0pKSx0aGlzLm1haW4uZGF0YS5pc09uQ2hhbmdlRW5hYmxlZD0hMH19LGEucHJvdG90eXBlLmFkZEF0dHJpYnV0ZXM9ZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnQudGFiSW5kZXg9LTEsdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXk9XCJub25lXCIsdGhpcy5lbGVtZW50LmRhdGFzZXQuc3NpZD10aGlzLm1haW4uY29uZmlnLmlkfSxhLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVycz1mdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIixmdW5jdGlvbihlKXt0Lm1haW4uZGF0YS5zZXRTZWxlY3RlZEZyb21TZWxlY3QoKSx0Lm1haW4ucmVuZGVyKCl9KX0sYS5wcm90b3R5cGUuYWRkTXV0YXRpb25PYnNlcnZlcj1mdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5tYWluLmNvbmZpZy5pc0FqYXh8fCh0aGlzLm11dGF0aW9uT2JzZXJ2ZXI9bmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24oZSl7dC50cmlnZ2VyTXV0YXRpb25PYnNlcnZlciYmKHQubWFpbi5kYXRhLnBhcnNlU2VsZWN0RGF0YSgpLHQubWFpbi5kYXRhLnNldFNlbGVjdGVkRnJvbVNlbGVjdCgpLHQubWFpbi5yZW5kZXIoKSxlLmZvckVhY2goZnVuY3Rpb24oZSl7XCJjbGFzc1wiPT09ZS5hdHRyaWJ1dGVOYW1lJiZ0Lm1haW4uc2xpbS51cGRhdGVDb250YWluZXJEaXZDbGFzcyh0Lm1haW4uc2xpbS5jb250YWluZXIpfSkpfSksdGhpcy5vYnNlcnZlTXV0YXRpb25PYnNlcnZlcigpKX0sYS5wcm90b3R5cGUub2JzZXJ2ZU11dGF0aW9uT2JzZXJ2ZXI9ZnVuY3Rpb24oKXt0aGlzLm11dGF0aW9uT2JzZXJ2ZXImJnRoaXMubXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudCx7YXR0cmlidXRlczohMCxjaGlsZExpc3Q6ITAsY2hhcmFjdGVyRGF0YTohMH0pfSxhLnByb3RvdHlwZS5kaXNjb25uZWN0TXV0YXRpb25PYnNlcnZlcj1mdW5jdGlvbigpe3RoaXMubXV0YXRpb25PYnNlcnZlciYmdGhpcy5tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKX0sYS5wcm90b3R5cGUuY3JlYXRlPWZ1bmN0aW9uKGUpe3RoaXMuZWxlbWVudC5pbm5lckhUTUw9XCJcIjtmb3IodmFyIHQ9MCxpPWU7dDxpLmxlbmd0aDt0Kyspe3ZhciBzPWlbdF07aWYocy5oYXNPd25Qcm9wZXJ0eShcIm9wdGlvbnNcIikpe3ZhciBuPXMsYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7aWYoYS5sYWJlbD1uLmxhYmVsLG4ub3B0aW9ucylmb3IodmFyIG89MCxsPW4ub3B0aW9ucztvPGwubGVuZ3RoO28rKyl7dmFyIHI9bFtvXTthLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlT3B0aW9uKHIpKX10aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoYSl9ZWxzZSB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVPcHRpb24ocykpfX0sYS5wcm90b3R5cGUuY3JlYXRlT3B0aW9uPWZ1bmN0aW9uKHQpe3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7cmV0dXJuIGkudmFsdWU9XCJcIiE9PXQudmFsdWU/dC52YWx1ZTp0LnRleHQsaS5pbm5lckhUTUw9dC5pbm5lckhUTUx8fHQudGV4dCx0LnNlbGVjdGVkJiYoaS5zZWxlY3RlZD10LnNlbGVjdGVkKSwhMT09PXQuZGlzcGxheSYmKGkuc3R5bGUuZGlzcGxheT1cIm5vbmVcIiksdC5kaXNhYmxlZCYmKGkuZGlzYWJsZWQ9ITApLHQucGxhY2Vob2xkZXImJmkuc2V0QXR0cmlidXRlKFwiZGF0YS1wbGFjZWhvbGRlclwiLFwidHJ1ZVwiKSx0Lm1hbmRhdG9yeSYmaS5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1hbmRhdG9yeVwiLFwidHJ1ZVwiKSx0LmNsYXNzJiZ0LmNsYXNzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2kuY2xhc3NMaXN0LmFkZChlKX0pLHQuZGF0YSYmXCJvYmplY3RcIj09dHlwZW9mIHQuZGF0YSYmT2JqZWN0LmtleXModC5kYXRhKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2kuc2V0QXR0cmlidXRlKFwiZGF0YS1cIitzLmtlYmFiQ2FzZShlKSx0LmRhdGFbZV0pfSksaX0sYSk7ZnVuY3Rpb24gYShlKXt0aGlzLnRyaWdnZXJNdXRhdGlvbk9ic2VydmVyPSEwLHRoaXMuZWxlbWVudD1lLnNlbGVjdCx0aGlzLm1haW49ZS5tYWluLHRoaXMuZWxlbWVudC5kaXNhYmxlZCYmKHRoaXMubWFpbi5jb25maWcuaXNFbmFibGVkPSExKSx0aGlzLmFkZEF0dHJpYnV0ZXMoKSx0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCksdGhpcy5tdXRhdGlvbk9ic2VydmVyPW51bGwsdGhpcy5hZGRNdXRhdGlvbk9ic2VydmVyKCksdGhpcy5lbGVtZW50LnNsaW09ZS5tYWlufXQuU2VsZWN0PW59LGZ1bmN0aW9uKGUsdCxpKXtcInVzZSBzdHJpY3RcIjt0Ll9fZXNNb2R1bGU9ITA7dmFyIGE9aSgwKSxvPWkoMSkscz0obi5wcm90b3R5cGUuY29udGFpbmVyRGl2PWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gZS5zdHlsZS5jc3NUZXh0PXRoaXMubWFpbi5jb25maWcuc3R5bGUsdGhpcy51cGRhdGVDb250YWluZXJEaXZDbGFzcyhlKSxlfSxuLnByb3RvdHlwZS51cGRhdGVDb250YWluZXJEaXZDbGFzcz1mdW5jdGlvbihlKXt0aGlzLm1haW4uY29uZmlnLmNsYXNzPXRoaXMubWFpbi5zZWxlY3QuZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpLGUuY2xhc3NOYW1lPVwiXCIsZS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcuaWQpLGUuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLm1haW4pO2Zvcih2YXIgdD0wLGk9dGhpcy5tYWluLmNvbmZpZy5jbGFzczt0PGkubGVuZ3RoO3QrKyl7dmFyIHM9aVt0XTtcIlwiIT09cy50cmltKCkmJmUuY2xhc3NMaXN0LmFkZChzKX19LG4ucHJvdG90eXBlLnNpbmdsZVNlbGVjdGVkRGl2PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcuc2luZ2xlU2VsZWN0ZWQpO3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO2kuY2xhc3NMaXN0LmFkZChcInBsYWNlaG9sZGVyXCIpLGUuYXBwZW5kQ2hpbGQoaSk7dmFyIHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7cy5pbm5lckhUTUw9dGhpcy5tYWluLmNvbmZpZy5kZXNlbGVjdExhYmVsLHMuY2xhc3NMaXN0LmFkZChcInNzLWRlc2VsZWN0XCIpLHMub25jbGljaz1mdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpLHQubWFpbi5jb25maWcuaXNFbmFibGVkJiZ0Lm1haW4uc2V0KFwiXCIpfSxlLmFwcGVuZENoaWxkKHMpO3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO24uY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmFycm93KTt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtyZXR1cm4gYS5jbGFzc0xpc3QuYWRkKFwiYXJyb3ctZG93blwiKSxuLmFwcGVuZENoaWxkKGEpLGUuYXBwZW5kQ2hpbGQobiksZS5vbmNsaWNrPWZ1bmN0aW9uKCl7dC5tYWluLmNvbmZpZy5pc0VuYWJsZWQmJih0Lm1haW4uZGF0YS5jb250ZW50T3Blbj90Lm1haW4uY2xvc2UoKTp0Lm1haW4ub3BlbigpKX0se2NvbnRhaW5lcjplLHBsYWNlaG9sZGVyOmksZGVzZWxlY3Q6cyxhcnJvd0ljb246e2NvbnRhaW5lcjpuLGFycm93OmF9fX0sbi5wcm90b3R5cGUucGxhY2Vob2xkZXI9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLm1haW4uZGF0YS5nZXRTZWxlY3RlZCgpO2lmKG51bGw9PT1lfHxlJiZlLnBsYWNlaG9sZGVyKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTt0LmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCksdC5pbm5lckhUTUw9dGhpcy5tYWluLmNvbmZpZy5wbGFjZWhvbGRlclRleHQsdGhpcy5zaW5nbGVTZWxlY3RlZCYmKHRoaXMuc2luZ2xlU2VsZWN0ZWQucGxhY2Vob2xkZXIuaW5uZXJIVE1MPXQub3V0ZXJIVE1MKX1lbHNle3ZhciBpPVwiXCI7ZSYmKGk9ZS5pbm5lckhUTUwmJiEwIT09dGhpcy5tYWluLmNvbmZpZy52YWx1ZXNVc2VUZXh0P2UuaW5uZXJIVE1MOmUudGV4dCksdGhpcy5zaW5nbGVTZWxlY3RlZCYmKHRoaXMuc2luZ2xlU2VsZWN0ZWQucGxhY2Vob2xkZXIuaW5uZXJIVE1MPWU/aTpcIlwiKX19LG4ucHJvdG90eXBlLmRlc2VsZWN0PWZ1bmN0aW9uKCl7aWYodGhpcy5zaW5nbGVTZWxlY3RlZCl7aWYoIXRoaXMubWFpbi5jb25maWcuYWxsb3dEZXNlbGVjdClyZXR1cm4gdm9pZCB0aGlzLnNpbmdsZVNlbGVjdGVkLmRlc2VsZWN0LmNsYXNzTGlzdC5hZGQoXCJzcy1oaWRlXCIpO1wiXCI9PT10aGlzLm1haW4uc2VsZWN0ZWQoKT90aGlzLnNpbmdsZVNlbGVjdGVkLmRlc2VsZWN0LmNsYXNzTGlzdC5hZGQoXCJzcy1oaWRlXCIpOnRoaXMuc2luZ2xlU2VsZWN0ZWQuZGVzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZShcInNzLWhpZGVcIil9fSxuLnByb3RvdHlwZS5tdWx0aVNlbGVjdGVkRGl2PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcubXVsdGlTZWxlY3RlZCk7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy52YWx1ZXMpLGUuYXBwZW5kQ2hpbGQoaSk7dmFyIHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtzLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5hZGQpO3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO3JldHVybiBuLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5wbHVzKSxuLm9uY2xpY2s9ZnVuY3Rpb24oZSl7dC5tYWluLmRhdGEuY29udGVudE9wZW4mJih0Lm1haW4uY2xvc2UoKSxlLnN0b3BQcm9wYWdhdGlvbigpKX0scy5hcHBlbmRDaGlsZChuKSxlLmFwcGVuZENoaWxkKHMpLGUub25jbGljaz1mdW5jdGlvbihlKXt0Lm1haW4uY29uZmlnLmlzRW5hYmxlZCYmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyh0Lm1haW4uY29uZmlnLnZhbHVlRGVsZXRlKXx8KHQubWFpbi5kYXRhLmNvbnRlbnRPcGVuP3QubWFpbi5jbG9zZSgpOnQubWFpbi5vcGVuKCkpKX0se2NvbnRhaW5lcjplLHZhbHVlczppLGFkZDpzLHBsdXM6bn19LG4ucHJvdG90eXBlLnZhbHVlcz1mdW5jdGlvbigpe2lmKHRoaXMubXVsdGlTZWxlY3RlZCl7Zm9yKHZhciBlLHQ9dGhpcy5tdWx0aVNlbGVjdGVkLnZhbHVlcy5jaGlsZE5vZGVzLGk9dGhpcy5tYWluLmRhdGEuZ2V0U2VsZWN0ZWQoKSxzPVtdLG49MCxhPXQ7bjxhLmxlbmd0aDtuKyspe3ZhciBvPWFbbl07ZT0hMDtmb3IodmFyIGw9MCxyPWk7bDxyLmxlbmd0aDtsKyspe3ZhciBjPXJbbF07U3RyaW5nKGMuaWQpPT09U3RyaW5nKG8uZGF0YXNldC5pZCkmJihlPSExKX1lJiZzLnB1c2gobyl9Zm9yKHZhciBkPTAsaD1zO2Q8aC5sZW5ndGg7ZCsrKXt2YXIgdT1oW2RdO3UuY2xhc3NMaXN0LmFkZChcInNzLW91dFwiKSx0aGlzLm11bHRpU2VsZWN0ZWQudmFsdWVzLnJlbW92ZUNoaWxkKHUpfWZvcih0PXRoaXMubXVsdGlTZWxlY3RlZC52YWx1ZXMuY2hpbGROb2RlcyxjPTA7YzxpLmxlbmd0aDtjKyspe2U9ITE7Zm9yKHZhciBwPTAsbT10O3A8bS5sZW5ndGg7cCsrKW89bVtwXSxTdHJpbmcoaVtjXS5pZCk9PT1TdHJpbmcoby5kYXRhc2V0LmlkKSYmKGU9ITApO2V8fCgwIT09dC5sZW5ndGgmJkhUTUxFbGVtZW50LnByb3RvdHlwZS5pbnNlcnRBZGphY2VudEVsZW1lbnQ/MD09PWM/dGhpcy5tdWx0aVNlbGVjdGVkLnZhbHVlcy5pbnNlcnRCZWZvcmUodGhpcy52YWx1ZURpdihpW2NdKSx0W2NdKTp0W2MtMV0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIix0aGlzLnZhbHVlRGl2KGlbY10pKTp0aGlzLm11bHRpU2VsZWN0ZWQudmFsdWVzLmFwcGVuZENoaWxkKHRoaXMudmFsdWVEaXYoaVtjXSkpKX1pZigwPT09aS5sZW5ndGgpe3ZhciBmPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO2YuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkKSxmLmlubmVySFRNTD10aGlzLm1haW4uY29uZmlnLnBsYWNlaG9sZGVyVGV4dCx0aGlzLm11bHRpU2VsZWN0ZWQudmFsdWVzLmlubmVySFRNTD1mLm91dGVySFRNTH19fSxuLnByb3RvdHlwZS52YWx1ZURpdj1mdW5jdGlvbihhKXt2YXIgbz10aGlzLGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy52YWx1ZSksZS5kYXRhc2V0LmlkPWEuaWQ7dmFyIHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7aWYodC5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcudmFsdWVUZXh0KSx0LmlubmVySFRNTD1hLmlubmVySFRNTCYmITAhPT10aGlzLm1haW4uY29uZmlnLnZhbHVlc1VzZVRleHQ/YS5pbm5lckhUTUw6YS50ZXh0LGUuYXBwZW5kQ2hpbGQodCksIWEubWFuZGF0b3J5KXt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtpLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy52YWx1ZURlbGV0ZSksaS5pbm5lckhUTUw9dGhpcy5tYWluLmNvbmZpZy5kZXNlbGVjdExhYmVsLGkub25jbGljaz1mdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKTt2YXIgdD0hMTtpZihvLm1haW4uYmVmb3JlT25DaGFuZ2V8fCh0PSEwKSxvLm1haW4uYmVmb3JlT25DaGFuZ2Upe2Zvcih2YXIgaT1vLm1haW4uZGF0YS5nZXRTZWxlY3RlZCgpLHM9SlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpKSksbj0wO248cy5sZW5ndGg7bisrKXNbbl0uaWQ9PT1hLmlkJiZzLnNwbGljZShuLDEpOyExIT09by5tYWluLmJlZm9yZU9uQ2hhbmdlKHMpJiYodD0hMCl9dCYmKG8ubWFpbi5kYXRhLnJlbW92ZUZyb21TZWxlY3RlZChhLmlkLFwiaWRcIiksby5tYWluLnJlbmRlcigpLG8ubWFpbi5zZWxlY3Quc2V0VmFsdWUoKSxvLm1haW4uZGF0YS5vbkRhdGFDaGFuZ2UoKSl9LGUuYXBwZW5kQ2hpbGQoaSl9cmV0dXJuIGV9LG4ucHJvdG90eXBlLmNvbnRlbnREaXY9ZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBlLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5jb250ZW50KSxlfSxuLnByb3RvdHlwZS5zZWFyY2hEaXY9ZnVuY3Rpb24oKXt2YXIgbj10aGlzLGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSxhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcuc2VhcmNoKTt2YXIgdD17Y29udGFpbmVyOmUsaW5wdXQ6c307cmV0dXJuIHRoaXMubWFpbi5jb25maWcuc2hvd1NlYXJjaHx8KGUuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmhpZGUpLHMucmVhZE9ubHk9ITApLHMudHlwZT1cInNlYXJjaFwiLHMucGxhY2Vob2xkZXI9dGhpcy5tYWluLmNvbmZpZy5zZWFyY2hQbGFjZWhvbGRlcixzLnRhYkluZGV4PTAscy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsdGhpcy5tYWluLmNvbmZpZy5zZWFyY2hQbGFjZWhvbGRlcikscy5zZXRBdHRyaWJ1dGUoXCJhdXRvY2FwaXRhbGl6ZVwiLFwib2ZmXCIpLHMuc2V0QXR0cmlidXRlKFwiYXV0b2NvbXBsZXRlXCIsXCJvZmZcIikscy5zZXRBdHRyaWJ1dGUoXCJhdXRvY29ycmVjdFwiLFwib2ZmXCIpLHMub25jbGljaz1mdW5jdGlvbihlKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XCJcIj09PWUudGFyZ2V0LnZhbHVlJiZuLm1haW4uc2VhcmNoKFwiXCIpfSwxMCl9LHMub25rZXlkb3duPWZ1bmN0aW9uKGUpe1wiQXJyb3dVcFwiPT09ZS5rZXk/KG4ubWFpbi5vcGVuKCksbi5oaWdobGlnaHRVcCgpLGUucHJldmVudERlZmF1bHQoKSk6XCJBcnJvd0Rvd25cIj09PWUua2V5PyhuLm1haW4ub3BlbigpLG4uaGlnaGxpZ2h0RG93bigpLGUucHJldmVudERlZmF1bHQoKSk6XCJUYWJcIj09PWUua2V5P24ubWFpbi5kYXRhLmNvbnRlbnRPcGVuP24ubWFpbi5jbG9zZSgpOnNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLm1haW4uY2xvc2UoKX0sbi5tYWluLmNvbmZpZy50aW1lb3V0RGVsYXkpOlwiRW50ZXJcIj09PWUua2V5JiZlLnByZXZlbnREZWZhdWx0KCl9LHMub25rZXl1cD1mdW5jdGlvbihlKXt2YXIgdD1lLnRhcmdldDtpZihcIkVudGVyXCI9PT1lLmtleSl7aWYobi5tYWluLmFkZGFibGUmJmUuY3RybEtleSlyZXR1cm4gYS5jbGljaygpLGUucHJldmVudERlZmF1bHQoKSx2b2lkIGUuc3RvcFByb3BhZ2F0aW9uKCk7dmFyIGk9bi5saXN0LnF1ZXJ5U2VsZWN0b3IoXCIuXCIrbi5tYWluLmNvbmZpZy5oaWdobGlnaHRlZCk7aSYmaS5jbGljaygpfWVsc2VcIkFycm93VXBcIj09PWUua2V5fHxcIkFycm93RG93blwiPT09ZS5rZXl8fChcIkVzY2FwZVwiPT09ZS5rZXk/bi5tYWluLmNsb3NlKCk6bi5tYWluLmNvbmZpZy5zaG93U2VhcmNoJiZuLm1haW4uZGF0YS5jb250ZW50T3Blbj9uLm1haW4uc2VhcmNoKHQudmFsdWUpOnMudmFsdWU9XCJcIik7ZS5wcmV2ZW50RGVmYXVsdCgpLGUuc3RvcFByb3BhZ2F0aW9uKCl9LHMub25mb2N1cz1mdW5jdGlvbigpe24ubWFpbi5vcGVuKCl9LGUuYXBwZW5kQ2hpbGQocyksdGhpcy5tYWluLmFkZGFibGUmJihhLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5hZGRhYmxlKSxhLmlubmVySFRNTD1cIitcIixhLm9uY2xpY2s9ZnVuY3Rpb24oZSl7aWYobi5tYWluLmFkZGFibGUpe2UucHJldmVudERlZmF1bHQoKSxlLnN0b3BQcm9wYWdhdGlvbigpO3ZhciB0PW4uc2VhcmNoLmlucHV0LnZhbHVlO2lmKFwiXCI9PT10LnRyaW0oKSlyZXR1cm4gdm9pZCBuLnNlYXJjaC5pbnB1dC5mb2N1cygpO3ZhciBpPW4ubWFpbi5hZGRhYmxlKHQpLHM9XCJcIjtpZighaSlyZXR1cm47XCJvYmplY3RcIj09dHlwZW9mIGk/by52YWxpZGF0ZU9wdGlvbihpKSYmKG4ubWFpbi5hZGREYXRhKGkpLHM9aS52YWx1ZT9pLnZhbHVlOmkudGV4dCk6KG4ubWFpbi5hZGREYXRhKG4ubWFpbi5kYXRhLm5ld09wdGlvbih7dGV4dDppLHZhbHVlOml9KSkscz1pKSxuLm1haW4uc2VhcmNoKFwiXCIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLm1haW4uc2V0KHMsXCJ2YWx1ZVwiLCExLCExKX0sMTAwKSxuLm1haW4uY29uZmlnLmNsb3NlT25TZWxlY3QmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLm1haW4uY2xvc2UoKX0sMTAwKX19LGUuYXBwZW5kQ2hpbGQoYSksdC5hZGRhYmxlPWEpLHR9LG4ucHJvdG90eXBlLmhpZ2hsaWdodFVwPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5saXN0LnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5tYWluLmNvbmZpZy5oaWdobGlnaHRlZCksdD1udWxsO2lmKGUpZm9yKHQ9ZS5wcmV2aW91c1NpYmxpbmc7bnVsbCE9PXQmJnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMubWFpbi5jb25maWcuZGlzYWJsZWQpOyl0PXQucHJldmlvdXNTaWJsaW5nO2Vsc2V7dmFyIGk9dGhpcy5saXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrdGhpcy5tYWluLmNvbmZpZy5vcHRpb24rXCI6bm90KC5cIit0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkK1wiKVwiKTt0PWlbaS5sZW5ndGgtMV19aWYodCYmdC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5tYWluLmNvbmZpZy5vcHRncm91cExhYmVsKSYmKHQ9bnVsbCksbnVsbD09PXQpe3ZhciBzPWUucGFyZW50Tm9kZTtpZihzLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLm1haW4uY29uZmlnLm9wdGdyb3VwKSYmcy5wcmV2aW91c1NpYmxpbmcpe3ZhciBuPXMucHJldmlvdXNTaWJsaW5nLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrdGhpcy5tYWluLmNvbmZpZy5vcHRpb24rXCI6bm90KC5cIit0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkK1wiKVwiKTtuLmxlbmd0aCYmKHQ9bltuLmxlbmd0aC0xXSl9fXQmJihlJiZlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5tYWluLmNvbmZpZy5oaWdobGlnaHRlZCksdC5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcuaGlnaGxpZ2h0ZWQpLGEuZW5zdXJlRWxlbWVudEluVmlldyh0aGlzLmxpc3QsdCkpfSxuLnByb3RvdHlwZS5oaWdobGlnaHREb3duPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5saXN0LnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5tYWluLmNvbmZpZy5oaWdobGlnaHRlZCksdD1udWxsO2lmKGUpZm9yKHQ9ZS5uZXh0U2libGluZztudWxsIT09dCYmdC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCk7KXQ9dC5uZXh0U2libGluZztlbHNlIHQ9dGhpcy5saXN0LnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5tYWluLmNvbmZpZy5vcHRpb24rXCI6bm90KC5cIit0aGlzLm1haW4uY29uZmlnLmRpc2FibGVkK1wiKVwiKTtpZihudWxsPT09dCYmbnVsbCE9PWUpe3ZhciBpPWUucGFyZW50Tm9kZTtpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLm1haW4uY29uZmlnLm9wdGdyb3VwKSYmaS5uZXh0U2libGluZyYmKHQ9aS5uZXh0U2libGluZy5xdWVyeVNlbGVjdG9yKFwiLlwiK3RoaXMubWFpbi5jb25maWcub3B0aW9uK1wiOm5vdCguXCIrdGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCtcIilcIikpfXQmJihlJiZlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5tYWluLmNvbmZpZy5oaWdobGlnaHRlZCksdC5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcuaGlnaGxpZ2h0ZWQpLGEuZW5zdXJlRWxlbWVudEluVmlldyh0aGlzLmxpc3QsdCkpfSxuLnByb3RvdHlwZS5saXN0RGl2PWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gZS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcubGlzdCksZX0sbi5wcm90b3R5cGUub3B0aW9ucz1mdW5jdGlvbihlKXt2b2lkIDA9PT1lJiYoZT1cIlwiKTt2YXIgdCxpPXRoaXMubWFpbi5kYXRhLmZpbHRlcmVkfHx0aGlzLm1haW4uZGF0YS5kYXRhO2lmKCh0aGlzLmxpc3QuaW5uZXJIVE1MPVwiXCIpIT09ZSlyZXR1cm4odD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcub3B0aW9uKSx0LmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCksdC5pbm5lckhUTUw9ZSx2b2lkIHRoaXMubGlzdC5hcHBlbmRDaGlsZCh0KTtpZih0aGlzLm1haW4uY29uZmlnLmlzQWpheCYmdGhpcy5tYWluLmNvbmZpZy5pc1NlYXJjaGluZylyZXR1cm4odD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcub3B0aW9uKSx0LmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCksdC5pbm5lckhUTUw9dGhpcy5tYWluLmNvbmZpZy5zZWFyY2hpbmdUZXh0LHZvaWQgdGhpcy5saXN0LmFwcGVuZENoaWxkKHQpO2lmKDA9PT1pLmxlbmd0aCl7dmFyIHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gcy5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcub3B0aW9uKSxzLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCkscy5pbm5lckhUTUw9dGhpcy5tYWluLmNvbmZpZy5zZWFyY2hUZXh0LHZvaWQgdGhpcy5saXN0LmFwcGVuZENoaWxkKHMpfWZvcih2YXIgbj1mdW5jdGlvbihlKXtpZihlLmhhc093blByb3BlcnR5KFwibGFiZWxcIikpe3ZhciB0PWUsbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO24uY2xhc3NMaXN0LmFkZChjLm1haW4uY29uZmlnLm9wdGdyb3VwKTt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2kuY2xhc3NMaXN0LmFkZChjLm1haW4uY29uZmlnLm9wdGdyb3VwTGFiZWwpLGMubWFpbi5jb25maWcuc2VsZWN0QnlHcm91cCYmYy5tYWluLmNvbmZpZy5pc011bHRpcGxlJiZpLmNsYXNzTGlzdC5hZGQoYy5tYWluLmNvbmZpZy5vcHRncm91cExhYmVsU2VsZWN0YWJsZSksaS5pbm5lckhUTUw9dC5sYWJlbCxuLmFwcGVuZENoaWxkKGkpO3ZhciBzPXQub3B0aW9ucztpZihzKXtmb3IodmFyIGE9MCxvPXM7YTxvLmxlbmd0aDthKyspe3ZhciBsPW9bYV07bi5hcHBlbmRDaGlsZChjLm9wdGlvbihsKSl9aWYoYy5tYWluLmNvbmZpZy5zZWxlY3RCeUdyb3VwJiZjLm1haW4uY29uZmlnLmlzTXVsdGlwbGUpe3ZhciByPWM7aS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKTtmb3IodmFyIHQ9MCxpPW4uY2hpbGRyZW47dDxpLmxlbmd0aDt0Kyspe3ZhciBzPWlbdF07LTEhPT1zLmNsYXNzTmFtZS5pbmRleE9mKHIubWFpbi5jb25maWcub3B0aW9uKSYmcy5jbGljaygpfX0pfX1jLmxpc3QuYXBwZW5kQ2hpbGQobil9ZWxzZSBjLmxpc3QuYXBwZW5kQ2hpbGQoYy5vcHRpb24oZSkpfSxjPXRoaXMsYT0wLG89aTthPG8ubGVuZ3RoO2ErKyluKG9bYV0pfSxuLnByb3RvdHlwZS5vcHRpb249ZnVuY3Rpb24ocil7aWYoci5wbGFjZWhvbGRlcil7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gZS5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcub3B0aW9uKSxlLmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5oaWRlKSxlfXZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5jbGFzc0xpc3QuYWRkKHRoaXMubWFpbi5jb25maWcub3B0aW9uKSxyLmNsYXNzJiZyLmNsYXNzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3QuY2xhc3NMaXN0LmFkZChlKX0pLHIuc3R5bGUmJih0LnN0eWxlLmNzc1RleHQ9ci5zdHlsZSk7dmFyIGM9dGhpcy5tYWluLmRhdGEuZ2V0U2VsZWN0ZWQoKTt0LmRhdGFzZXQuaWQ9ci5pZCx0aGlzLm1haW4uY29uZmlnLnNlYXJjaEhpZ2hsaWdodCYmdGhpcy5tYWluLnNsaW0mJnIuaW5uZXJIVE1MJiZcIlwiIT09dGhpcy5tYWluLnNsaW0uc2VhcmNoLmlucHV0LnZhbHVlLnRyaW0oKT90LmlubmVySFRNTD1hLmhpZ2hsaWdodChyLmlubmVySFRNTCx0aGlzLm1haW4uc2xpbS5zZWFyY2guaW5wdXQudmFsdWUsdGhpcy5tYWluLmNvbmZpZy5zZWFyY2hIaWdobGlnaHRlcik6ci5pbm5lckhUTUwmJih0LmlubmVySFRNTD1yLmlubmVySFRNTCksdGhpcy5tYWluLmNvbmZpZy5zaG93T3B0aW9uVG9vbHRpcHMmJnQudGV4dENvbnRlbnQmJnQuc2V0QXR0cmlidXRlKFwidGl0bGVcIix0LnRleHRDb250ZW50KTt2YXIgZD10aGlzO3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpLGUuc3RvcFByb3BhZ2F0aW9uKCk7dmFyIHQ9dGhpcy5kYXRhc2V0LmlkO2lmKCEwPT09ci5zZWxlY3RlZCYmZC5tYWluLmNvbmZpZy5hbGxvd0Rlc2VsZWN0T3B0aW9uKXt2YXIgaT0hMTtpZihkLm1haW4uYmVmb3JlT25DaGFuZ2UmJmQubWFpbi5jb25maWcuaXNNdWx0aXBsZXx8KGk9ITApLGQubWFpbi5iZWZvcmVPbkNoYW5nZSYmZC5tYWluLmNvbmZpZy5pc011bHRpcGxlKXtmb3IodmFyIHM9ZC5tYWluLmRhdGEuZ2V0U2VsZWN0ZWQoKSxuPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocykpLGE9MDthPG4ubGVuZ3RoO2ErKyluW2FdLmlkPT09dCYmbi5zcGxpY2UoYSwxKTshMSE9PWQubWFpbi5iZWZvcmVPbkNoYW5nZShuKSYmKGk9ITApfWkmJihkLm1haW4uY29uZmlnLmlzTXVsdGlwbGU/KGQubWFpbi5kYXRhLnJlbW92ZUZyb21TZWxlY3RlZCh0LFwiaWRcIiksZC5tYWluLnJlbmRlcigpLGQubWFpbi5zZWxlY3Quc2V0VmFsdWUoKSxkLm1haW4uZGF0YS5vbkRhdGFDaGFuZ2UoKSk6ZC5tYWluLnNldChcIlwiKSl9ZWxzZXtpZihyLmRpc2FibGVkfHxyLnNlbGVjdGVkKXJldHVybjtpZihkLm1haW4uY29uZmlnLmxpbWl0JiZBcnJheS5pc0FycmF5KGMpJiZkLm1haW4uY29uZmlnLmxpbWl0PD1jLmxlbmd0aClyZXR1cm47aWYoZC5tYWluLmJlZm9yZU9uQ2hhbmdlKXt2YXIgbz12b2lkIDAsbD1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGQubWFpbi5kYXRhLmdldE9iamVjdEZyb21EYXRhKHQpKSk7bC5zZWxlY3RlZD0hMCxkLm1haW4uY29uZmlnLmlzTXVsdGlwbGU/KG89SlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSkpLnB1c2gobCk6bz1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGwpKSwhMSE9PWQubWFpbi5iZWZvcmVPbkNoYW5nZShvKSYmZC5tYWluLnNldCh0LFwiaWRcIixkLm1haW4uY29uZmlnLmNsb3NlT25TZWxlY3QpfWVsc2UgZC5tYWluLnNldCh0LFwiaWRcIixkLm1haW4uY29uZmlnLmNsb3NlT25TZWxlY3QpfX0pO3ZhciBpPWMmJmEuaXNWYWx1ZUluQXJyYXlPZk9iamVjdHMoYyxcImlkXCIsci5pZCk7cmV0dXJuKHIuZGlzYWJsZWR8fGkpJiYodC5vbmNsaWNrPW51bGwsZC5tYWluLmNvbmZpZy5hbGxvd0Rlc2VsZWN0T3B0aW9ufHx0LmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5kaXNhYmxlZCksZC5tYWluLmNvbmZpZy5oaWRlU2VsZWN0ZWRPcHRpb24mJnQuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLmhpZGUpKSxpP3QuY2xhc3NMaXN0LmFkZCh0aGlzLm1haW4uY29uZmlnLm9wdGlvblNlbGVjdGVkKTp0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5tYWluLmNvbmZpZy5vcHRpb25TZWxlY3RlZCksdH0sbik7ZnVuY3Rpb24gbihlKXt0aGlzLm1haW49ZS5tYWluLHRoaXMuY29udGFpbmVyPXRoaXMuY29udGFpbmVyRGl2KCksdGhpcy5jb250ZW50PXRoaXMuY29udGVudERpdigpLHRoaXMuc2VhcmNoPXRoaXMuc2VhcmNoRGl2KCksdGhpcy5saXN0PXRoaXMubGlzdERpdigpLHRoaXMub3B0aW9ucygpLHRoaXMuc2luZ2xlU2VsZWN0ZWQ9bnVsbCx0aGlzLm11bHRpU2VsZWN0ZWQ9bnVsbCx0aGlzLm1haW4uY29uZmlnLmlzTXVsdGlwbGU/KHRoaXMubXVsdGlTZWxlY3RlZD10aGlzLm11bHRpU2VsZWN0ZWREaXYoKSx0aGlzLm11bHRpU2VsZWN0ZWQmJnRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubXVsdGlTZWxlY3RlZC5jb250YWluZXIpKToodGhpcy5zaW5nbGVTZWxlY3RlZD10aGlzLnNpbmdsZVNlbGVjdGVkRGl2KCksdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5zaW5nbGVTZWxlY3RlZC5jb250YWluZXIpKSx0aGlzLm1haW4uY29uZmlnLmFkZFRvQm9keT8odGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQodGhpcy5tYWluLmNvbmZpZy5pZCksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpKTp0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpLHRoaXMuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLnNlYXJjaC5jb250YWluZXIpLHRoaXMuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmxpc3QpfXQuU2xpbT1zfV0sbi5jPXMsbi5kPWZ1bmN0aW9uKGUsdCxpKXtuLm8oZSx0KXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6aX0pfSxuLnI9ZnVuY3Rpb24oZSl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0sbi50PWZ1bmN0aW9uKHQsZSl7aWYoMSZlJiYodD1uKHQpKSw4JmUpcmV0dXJuIHQ7aWYoNCZlJiZcIm9iamVjdFwiPT10eXBlb2YgdCYmdCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O3ZhciBpPU9iamVjdC5jcmVhdGUobnVsbCk7aWYobi5yKGkpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpLFwiZGVmYXVsdFwiLHtlbnVtZXJhYmxlOiEwLHZhbHVlOnR9KSwyJmUmJlwic3RyaW5nXCIhPXR5cGVvZiB0KWZvcih2YXIgcyBpbiB0KW4uZChpLHMsZnVuY3Rpb24oZSl7cmV0dXJuIHRbZV19LmJpbmQobnVsbCxzKSk7cmV0dXJuIGl9LG4ubj1mdW5jdGlvbihlKXt2YXIgdD1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gbi5kKHQsXCJhXCIsdCksdH0sbi5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSxuLnA9XCJcIixuKG4ucz0yKS5kZWZhdWx0O2Z1bmN0aW9uIG4oZSl7aWYoc1tlXSlyZXR1cm4gc1tlXS5leHBvcnRzO3ZhciB0PXNbZV09e2k6ZSxsOiExLGV4cG9ydHM6e319O3JldHVybiBpW2VdLmNhbGwodC5leHBvcnRzLHQsdC5leHBvcnRzLG4pLHQubD0hMCx0LmV4cG9ydHN9dmFyIGksc30pOyIsImltcG9ydCB7IGdldEpzb24gfSBmcm9tIFwiLi91dGlsaXRpZXMvanNvblJlcXVlc3RcIjtcclxuaW1wb3J0IHsgZmluZENsb3NpbmdCcmFja2V0SW5kZXggfSBmcm9tIFwiLi91dGlsaXRpZXMvc3RyaW5nXCI7XHJcblxyXG50eXBlIFRlbXBsYXRlID0ge1xyXG4gIFtuYW1lOiBzdHJpbmddOiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFRlbXBsYXRlcyh0ZW1wbGF0ZTogc3RyaW5nKSB7XHJcbiAgY29uc3Qgb2JqZWN0czogVGVtcGxhdGVbXSA9IFtdO1xyXG4gIGxldCBjb247XHJcblxyXG4gIGRvIHtcclxuICAgIGNvbnN0IHBhcmFtczoge1xyXG4gICAgICBbbmFtZTogc3RyaW5nXTogc3RyaW5nO1xyXG4gICAgfSA9IHtcclxuICAgICAgbGlzdDogXCJlbWJlZGRlZGluXCIsXHJcbiAgICAgIGVpdGl0bGU6IFwiVGVtcGxhdGU6XCIgKyB0ZW1wbGF0ZSxcclxuICAgICAgZWlsaW1pdDogXCI1MDBcIlxyXG4gICAgfTtcclxuICAgIGlmIChjb24pIHBhcmFtcy5laWNvbnRpbnVlID0gY29uO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb3NtTWVkaWFBcGlRdWVyeShwYXJhbXMpO1xyXG5cclxuICAgIG9iamVjdHMucHVzaCguLi4oYXdhaXQgcHJvY2Vzc1BhZ2VzQnlUZW1wbGF0ZVJlc3VsdChyZXNwb25zZSwgdGVtcGxhdGUpKSk7XHJcblxyXG4gICAgY29uID0gcmVzcG9uc2UuY29udGludWU/LmVpY29udGludWU7XHJcbiAgfSB3aGlsZSAoY29uKTtcclxuXHJcbiAgcmV0dXJuIG9iamVjdHM7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG9zbU1lZGlhQXBpUXVlcnkocGFyYW1zOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSkge1xyXG4gIGNvbnN0IGJhc2UgPSBcImh0dHBzOi8vd2lraS5vcGVuc3RyZWV0bWFwLm9yZy93L2FwaS5waHBcIjtcclxuXHJcbiAgcGFyYW1zW1wib3JpZ2luXCJdID0gXCIqXCI7XHJcbiAgcGFyYW1zW1wiYWN0aW9uXCJdID0gXCJxdWVyeVwiO1xyXG4gIHBhcmFtc1tcImZvcm1hdHZlcnNpb25cIl0gPSBcIjJcIjtcclxuICBwYXJhbXNbXCJmb3JtYXRcIl0gPSBcImpzb25cIjtcclxuXHJcbiAgcmV0dXJuIGF3YWl0IGdldEpzb24oYmFzZSwgcGFyYW1zKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1BhZ2VzQnlUZW1wbGF0ZVJlc3VsdChcclxuICByZXNwb25zZTogeyBjb250aW51ZTogeyBlaWNvbnRpbnVlOiBhbnkgfTsgcXVlcnk6IHsgZW1iZWRkZWRpbjogYW55IH0gfSxcclxuICB0ZW1wbGF0ZTogc3RyaW5nXHJcbikge1xyXG4gIGNvbnN0IHBhZ2VzID0gcmVzcG9uc2UucXVlcnkuZW1iZWRkZWRpbjtcclxuXHJcbiAgY29uc3Qgb2JqZWN0czogVGVtcGxhdGVbXSA9IFtdO1xyXG4gIGxldCBpZHMgPSBbXTtcclxuICBmb3IgKGNvbnN0IHAgaW4gcGFnZXMpIHtcclxuICAgIGlmICghL15cXHd7Mn06L2cudGVzdChwYWdlc1twXS50aXRsZSkpIGlkcy5wdXNoKHBhZ2VzW3BdLnBhZ2VpZCk7XHJcblxyXG4gICAgaWYgKGlkcy5sZW5ndGggPj0gNTApIHtcclxuICAgICAgb2JqZWN0cy5wdXNoKC4uLihhd2FpdCBsb2FkUGFnZXMoaWRzLCB0ZW1wbGF0ZSkpKTtcclxuICAgICAgaWRzID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoaWRzLmxlbmd0aCA+IDApIHtcclxuICAgIG9iamVjdHMucHVzaCguLi4oYXdhaXQgbG9hZFBhZ2VzKGlkcywgdGVtcGxhdGUpKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2JqZWN0cztcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2VzKGlkczogc3RyaW5nW10sIHRlbXBsYXRlOiBzdHJpbmcpIHtcclxuICBjb25zdCBwYXJhbXM6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9ID0ge1xyXG4gICAgcHJvcDogXCJyZXZpc2lvbnNcIixcclxuICAgIHJ2cHJvcDogXCJjb250ZW50XCIsXHJcbiAgICBwYWdlaWRzOiBpZHMuam9pbihcInxcIiksXHJcbiAgICBydnNsb3RzOiBcIipcIlxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb3NtTWVkaWFBcGlRdWVyeShwYXJhbXMpO1xyXG5cclxuICBjb25zdCBwYWdlcyA9IHJlc3BvbnNlLnF1ZXJ5LnBhZ2VzO1xyXG5cclxuICBjb25zdCBvYmplY3RzOiBUZW1wbGF0ZVtdID0gW107XHJcbiAgZm9yIChjb25zdCBwIGluIHBhZ2VzKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gcGFnZXNbcF0ucmV2aXNpb25zWzBdLnNsb3RzLm1haW4uY29udGVudDtcclxuICAgIGNvbnN0IHBhZ2VPYmplY3RzID0gcGFyc2VQYWdlKGNvbnRlbnQsIHRlbXBsYXRlKTtcclxuICAgIGZvciAoY29uc3QgbyBvZiBwYWdlT2JqZWN0cykge1xyXG4gICAgICBvLnNvdXJjZVdpa2kgPSBwYWdlc1twXS50aXRsZTtcclxuICAgIH1cclxuICAgIG9iamVjdHMucHVzaCguLi5wYWdlT2JqZWN0cyk7XHJcbiAgfVxyXG4gIHJldHVybiBvYmplY3RzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVBhZ2UoY29udGVudDogc3RyaW5nLCB0ZW1wbGF0ZTogc3RyaW5nKSB7XHJcbiAgY29uc3Qgb2JqZWN0czogVGVtcGxhdGVbXSA9IFtdO1xyXG5cclxuICBjb25zdCByZWdleFRlbXBsYXRlID0gbmV3IFJlZ0V4cChcInt7XCIgKyB0ZW1wbGF0ZS5yZXBsYWNlKFwiIFwiLCBcIltfIF1cIiksIFwiZ2lcIik7XHJcbiAgbGV0IHN0YXJ0ID0gY29udGVudC5zZWFyY2gocmVnZXhUZW1wbGF0ZSk7XHJcblxyXG4gIHdoaWxlIChzdGFydCAhPT0gLTEpIHtcclxuICAgIGxldCB0ZW1wbGF0ZUNvbnRlbnQgPSBjb250ZW50LnN1YnN0cmluZyhzdGFydCk7XHJcblxyXG4gICAgY29uc3QgY2xvc2luZyA9IGZpbmRDbG9zaW5nQnJhY2tldEluZGV4KHRlbXBsYXRlQ29udGVudCwgMCk7XHJcblxyXG4gICAgY29udGVudCA9IHRlbXBsYXRlQ29udGVudC5zdWJzdHJpbmcoY2xvc2luZyArIDEpO1xyXG4gICAgdGVtcGxhdGVDb250ZW50ID0gdGVtcGxhdGVDb250ZW50LnN1YnN0cmluZygwLCBjbG9zaW5nICsgMSk7XHJcblxyXG4gICAgdGVtcGxhdGVDb250ZW50ID0gdGVtcGxhdGVDb250ZW50XHJcbiAgICAgIC5zdWJzdHJpbmcodGVtcGxhdGVDb250ZW50LmluZGV4T2YoXCJ8XCIpLCB0ZW1wbGF0ZUNvbnRlbnQubGVuZ3RoIC0gMilcclxuICAgICAgLnRyaW0oKTtcclxuXHJcbiAgICBvYmplY3RzLnB1c2gocGFyc2VUZW1wbGF0ZVRvT2JqZWN0KHRlbXBsYXRlQ29udGVudCkpO1xyXG5cclxuICAgIHN0YXJ0ID0gY29udGVudC5zZWFyY2gocmVnZXhUZW1wbGF0ZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2JqZWN0cztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZVRvT2JqZWN0KGNvbnRlbnQ6IHN0cmluZykge1xyXG4gIGNvbnN0IG9iajogVGVtcGxhdGUgPSB7fTtcclxuICBjb25zdCBwcm9wcyA9IGNvbnRlbnQuc3BsaXQoL1xcfCg/IVtee10qfSkoPyFbXlxcW10qXFxdKS9nKTtcclxuICBwcm9wcy5zaGlmdCgpO1xyXG5cclxuICBmb3IgKGNvbnN0IHAgaW4gcHJvcHMpIHtcclxuICAgIGNvbnN0IHBhaXIgPSBwcm9wc1twXS50cmltKCk7XHJcbiAgICBjb25zdCBzdGFydCA9IHBhaXIuaW5kZXhPZihcIj1cIik7XHJcbiAgICBjb25zdCBuYW1lID0gcGFpci5zdWJzdHJpbmcoMCwgc3RhcnQpLnRyaW0oKTtcclxuICAgIGNvbnN0IHZhbHVlID0gcGFpci5zdWJzdHJpbmcoc3RhcnQgKyAxKS50cmltKCk7XHJcblxyXG4gICAgaWYgKHZhbHVlKSBvYmpbbmFtZV0gPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhenlMb2FkSW1hZ2VzKCkge1xyXG4gIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIipbZHluYW1pYy1zcmNdXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IGVsZW1lbnRzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgaWYgKFxyXG4gICAgICBlbGVtZW50c1tpXS5oYXNBdHRyaWJ1dGUoXCJkeW5hbWljLXNyY1wiKSAmJlxyXG4gICAgICBib3VuZGluZ0NsaWVudFJlY3QudG9wIDwgd2luZG93LmlubmVySGVpZ2h0ICogMlxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHNvdXJjZXMgPSAoZWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKFwiZHluYW1pYy1zcmNcIikgfHwgXCJcIikuc3BsaXQoXHJcbiAgICAgICAgXCIgXCJcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGZvciAoY29uc3Qgc3JjIG9mIHNvdXJjZXMpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuYm9keS5jb250YWlucyhlbGVtZW50c1tpXSkgJiYgKGF3YWl0IGlzSW1hZ2Uoc3JjKSkpIHtcclxuICAgICAgICAgIGVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsZW1lbnRzW2ldLnJlbW92ZUF0dHJpYnV0ZShcImR5bmFtaWMtc3JjXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBsYXp5TG9hZEltYWdlcyk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsYXp5TG9hZEltYWdlcyk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGxhenlMb2FkSW1hZ2VzKTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGlzSW1hZ2Uoc3JjOiBzdHJpbmcpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4ocmVzb2x2ZSA9PiB7XHJcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKCkgPT4ge1xyXG4gICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgIH0pO1xyXG4gICAgaW1nLnNyYyA9IHNyYztcclxuICAgIGlmIChpbWcuY29tcGxldGUpIHJlc29sdmUodHJ1ZSk7XHJcbiAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZ2V0SHRtbEVsZW1lbnQgfSBmcm9tIFwiLi91dGlsaXRpZXMvaHRtbFwiO1xyXG5pbXBvcnQgKiBhcyBTbGltU2VsZWN0IGZyb20gXCJzbGltLXNlbGVjdFwiO1xyXG5pbXBvcnQgeyByZXF1ZXN0VGVtcGxhdGVzIH0gZnJvbSBcIi4vY3Jhd2xlclwiO1xyXG5pbXBvcnQgXCIuL2xhenlMb2FkSW1hZ2VzXCI7XHJcbmltcG9ydCB7XHJcbiAgdHJhbnNmb3JtU2VydmljZUl0ZW0sXHJcbiAgdHJhbnNmb3JtU29mdHdhcmUsXHJcbiAgQXBwLFxyXG4gIGNvbnRhaW5zT2ZmbGluZUxpbmtcclxufSBmcm9tIFwiLi90cmFuc2Zvcm1UZW1wbGF0ZXNcIjtcclxuaW1wb3J0IHsgbGF6eUxvYWRJbWFnZXMgfSBmcm9tIFwiLi9sYXp5TG9hZEltYWdlc1wiO1xyXG5pbXBvcnQgeyBzZXQsIGdldCB9IGZyb20gXCIuL3V0aWxpdGllcy9zdG9yYWdlXCI7XHJcblxyXG5sZXQgb25VcGRhdGUgPSBmYWxzZTtcclxubGV0IGFwcHM6IEFwcFtdID0gW107XHJcbmNvbnN0IHRvcGljU2VsZWN0ID0gbmV3IChTbGltU2VsZWN0IGFzIGFueSkoe1xyXG4gIHNlbGVjdDogXCIjdG9waWNcIixcclxuICBwbGFjZWhvbGRlcjogXCJUb3BpY1wiLFxyXG4gIG9uQ2hhbmdlOiAoKSA9PiB7XHJcbiAgICBpZiAoIW9uVXBkYXRlKSB7XHJcbiAgICAgIG9uVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgdXBkYXRlKFxyXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSxcclxuICAgICAgICB0b3BpY1NlbGVjdC5zZWxlY3RlZCgpLFxyXG4gICAgICAgIGxhbmd1YWdlU2VsZWN0LnNlbGVjdGVkKClcclxuICAgICAgKTtcclxuICAgICAgb25VcGRhdGUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5jb25zdCBsYW5ndWFnZVNlbGVjdCA9IG5ldyAoU2xpbVNlbGVjdCBhcyBhbnkpKHtcclxuICBzZWxlY3Q6IFwiI2xhbmd1YWdlXCIsXHJcbiAgcGxhY2Vob2xkZXI6IFwiTGFuZ3VhZ2VcIixcclxuICBvbkNoYW5nZTogKCkgPT4ge1xyXG4gICAgaWYgKCFvblVwZGF0ZSkge1xyXG4gICAgICBvblVwZGF0ZSA9IHRydWU7XHJcbiAgICAgIHVwZGF0ZShcclxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUsXHJcbiAgICAgICAgdG9waWNTZWxlY3Quc2VsZWN0ZWQoKSxcclxuICAgICAgICBsYW5ndWFnZVNlbGVjdC5zZWxlY3RlZCgpXHJcbiAgICAgICk7XHJcbiAgICAgIG9uVXBkYXRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKFxyXG4gIFwiaW5wdXRcIixcclxuICAoKSA9PiB7XHJcbiAgICBpZiAoIW9uVXBkYXRlKSB7XHJcbiAgICAgIG9uVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgdXBkYXRlKFxyXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSxcclxuICAgICAgICB0b3BpY1NlbGVjdC5zZWxlY3RlZCgpLFxyXG4gICAgICAgIGxhbmd1YWdlU2VsZWN0LnNlbGVjdGVkKClcclxuICAgICAgKTtcclxuICAgICAgb25VcGRhdGUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbik7XHJcblxyXG5mdW5jdGlvbiBpbmNsdWRlc0FycmF5KGFycjogYW55W10sIHRhcmdldDogYW55W10pIHtcclxuICByZXR1cm4gdGFyZ2V0LmV2ZXJ5KHYgPT4gYXJyLmluY2x1ZGVzKHYpKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlczxUPihhcnI6IFRbXSkge1xyXG4gIHJldHVybiBhcnIuZmlsdGVyKChjLCBpbmRleCkgPT4ge1xyXG4gICAgcmV0dXJuIGFyci5pbmRleE9mKGMpID09PSBpbmRleDtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlKFxyXG4gIHNlYXJjaDogc3RyaW5nID0gXCJcIixcclxuICB0b3BpYzogc3RyaW5nW10gPSBbXSxcclxuICBsYW5ndWFnZTogc3RyaW5nW10gPSBbXVxyXG4pIHtcclxuICBnZXRIdG1sRWxlbWVudChcIi5hcHBzXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIGxldCB0b3BpY0RhdGE6IHN0cmluZ1tdID0gW107XHJcbiAgbGV0IGxhbmd1YWdlRGF0YTogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgbGV0IGZpbHRlcmVkQXBwcyA9IGFwcHM7XHJcblxyXG4gIHNlYXJjaCA9IHNlYXJjaC50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IHRvcGljVXAgPSB0b3BpYy5tYXAodCA9PiB0LnRvVXBwZXJDYXNlKCkpO1xyXG4gIGNvbnN0IGxhbmd1YWdlVXAgPSBsYW5ndWFnZS5tYXAodCA9PiB0LnRvVXBwZXJDYXNlKCkpO1xyXG5cclxuICBpZiAoc2VhcmNoKVxyXG4gICAgZmlsdGVyZWRBcHBzID0gZmlsdGVyZWRBcHBzLmZpbHRlcihcclxuICAgICAgYSA9PlxyXG4gICAgICAgIGEubmFtZS50b1VwcGVyQ2FzZSgpLnNlYXJjaChzZWFyY2gpICE9PSAtMSB8fFxyXG4gICAgICAgIGEuZGVzY3JpcHRpb24udG9VcHBlckNhc2UoKS5zZWFyY2goc2VhcmNoKSAhPT0gLTEgfHxcclxuICAgICAgICBhLnRvcGljcy5maWx0ZXIodCA9PiB0LnRvVXBwZXJDYXNlKCkuc2VhcmNoKHNlYXJjaCkgIT09IC0xKS5sZW5ndGggPiAwXHJcbiAgICApO1xyXG5cclxuICBpZiAodG9waWNVcC5sZW5ndGggPiAwKVxyXG4gICAgZmlsdGVyZWRBcHBzID0gZmlsdGVyZWRBcHBzLmZpbHRlcihhID0+XHJcbiAgICAgIGluY2x1ZGVzQXJyYXkoXHJcbiAgICAgICAgYS50b3BpY3MubWFwKHQgPT4gdC50b1VwcGVyQ2FzZSgpKSxcclxuICAgICAgICB0b3BpY1VwXHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gIGlmIChsYW5ndWFnZVVwLmxlbmd0aCA+IDApXHJcbiAgICBmaWx0ZXJlZEFwcHMgPSBmaWx0ZXJlZEFwcHMuZmlsdGVyKGEgPT5cclxuICAgICAgaW5jbHVkZXNBcnJheShcclxuICAgICAgICBhLmxhbmd1YWdlcy5tYXAodCA9PiB0LnRvVXBwZXJDYXNlKCkpLFxyXG4gICAgICAgIGxhbmd1YWdlVXBcclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgaWYgKHNlYXJjaClcclxuICAgIGZpbHRlcmVkQXBwcyA9IGZpbHRlcmVkQXBwcy5maWx0ZXIoXHJcbiAgICAgIGEgPT5cclxuICAgICAgICBhLm5hbWUudG9VcHBlckNhc2UoKS5zZWFyY2goc2VhcmNoKSAhPT0gLTEgfHxcclxuICAgICAgICBhLmRlc2NyaXB0aW9uLnRvVXBwZXJDYXNlKCkuc2VhcmNoKHNlYXJjaCkgIT09IC0xIHx8XHJcbiAgICAgICAgYS50b3BpY3MuZmlsdGVyKHQgPT4gdC50b1VwcGVyQ2FzZSgpLnNlYXJjaChzZWFyY2gpICE9PSAtMSkubGVuZ3RoID4gMFxyXG4gICAgKTtcclxuXHJcbiAgZm9yIChjb25zdCBhIG9mIGZpbHRlcmVkQXBwcykge1xyXG4gICAgdG9waWNEYXRhLnB1c2goLi4uYS50b3BpY3MubWFwKHQgPT4gdCkpO1xyXG4gICAgbGFuZ3VhZ2VEYXRhLnB1c2goLi4uYS5sYW5ndWFnZXMubWFwKGwgPT4gbCkpO1xyXG4gIH1cclxuXHJcbiAgdG9waWNEYXRhID0gcmVtb3ZlRHVwbGljYXRlcyh0b3BpY0RhdGEpO1xyXG4gIGxhbmd1YWdlRGF0YSA9IHJlbW92ZUR1cGxpY2F0ZXMobGFuZ3VhZ2VEYXRhKTtcclxuXHJcbiAgdG9waWNEYXRhLnNvcnQoKTtcclxuICBsYW5ndWFnZURhdGEuc29ydCgpO1xyXG5cclxuICB0b3BpY1NlbGVjdC5zZXREYXRhKFxyXG4gICAgdG9waWNEYXRhLm1hcCh0ID0+IHtcclxuICAgICAgcmV0dXJuIHsgdmFsdWU6IHQsIHRleHQ6IHQgfTtcclxuICAgIH0pXHJcbiAgKTtcclxuICB0b3BpY1NlbGVjdC5zZXQodG9waWMpO1xyXG5cclxuICBsYW5ndWFnZVNlbGVjdC5zZXREYXRhKFxyXG4gICAgbGFuZ3VhZ2VEYXRhLm1hcCh0ID0+IHtcclxuICAgICAgcmV0dXJuIHsgdmFsdWU6IHQsIHRleHQ6IHQgfTtcclxuICAgIH0pXHJcbiAgKTtcclxuICBsYW5ndWFnZVNlbGVjdC5zZXQobGFuZ3VhZ2UpO1xyXG5cclxuICBmb3IgKGNvbnN0IGEgb2YgZmlsdGVyZWRBcHBzKSB7XHJcbiAgICByZW5kZXIoYSk7XHJcbiAgfVxyXG5cclxuICBsYXp5TG9hZEltYWdlcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQXBwQ2F0YWxvZygpIHtcclxuICBzZXQoXCJhcHBzXCIsIGFwcHMpO1xyXG4gIHNldChcImFwcHMtZGF0ZVwiLCBuZXcgRGF0ZSgpKTtcclxuICBjb25zb2xlLmluZm8oXCJhZGQgY2F0YWxvZyB0byBjYWNoZVwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXBwQ2F0YWxvZygpIHtcclxuICBjb25zdCBkYXRlID0gZ2V0PERhdGU+KFwiYXBwcy1kYXRlXCIpO1xyXG5cclxuICBjb25zdCBkYXkgPSAyNCAqIDEwMDAgKiA2MCAqIDYwO1xyXG5cclxuICBpZiAoZGF0ZSAmJiBuZXcgRGF0ZShkYXRlKS52YWx1ZU9mKCkgPiBEYXRlLm5vdygpIC0gZGF5KSB7XHJcbiAgICBjb25zb2xlLmluZm8oXCJnZXQgY2F0YWxvZyBmcm9tIGNhY2hlXCIpO1xyXG5cclxuICAgIGFwcHMgPSBnZXQoXCJhcHBzXCIpIHx8IFtdO1xyXG4gICAgdXBkYXRlKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoYXBwcy5sZW5ndGggPT09IDApIHtcclxuICAgIGNvbnNvbGUuaW5mbyhcImxvYWQgY2F0YWxvZyBmcm9tIHdpa2lcIik7XHJcbiAgICBsb2FkQXBwQ2F0YWxvZygpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkQXBwKG9iajogQXBwKSB7XHJcbiAgY29uc3QgZHVwbGljYXRlcyA9IGFwcHMuZmlsdGVyKFxyXG4gICAgYSA9PiBhLm5hbWUudG9VcHBlckNhc2UoKSA9PT0gb2JqLm5hbWUudG9VcHBlckNhc2UoKVxyXG4gICk7XHJcblxyXG4gIGlmIChkdXBsaWNhdGVzLmxlbmd0aCA9PT0gMCkgYXBwcy5wdXNoKG9iaik7XHJcbiAgZWxzZSB7XHJcbiAgICBjb25zdCBhcHAgPSBkdXBsaWNhdGVzWzBdO1xyXG5cclxuICAgIGFwcC5kZXNjcmlwdGlvbiA9IGFwcC5kZXNjcmlwdGlvbiB8fCBvYmouZGVzY3JpcHRpb247XHJcbiAgICBhcHAuaW1hZ2UgPSBhcHAuaW1hZ2UgfHwgb2JqLmltYWdlO1xyXG4gICAgYXBwLmxhbmd1YWdlcy5wdXNoKC4uLm9iai5sYW5ndWFnZXMpO1xyXG4gICAgYXBwLmxhbmd1YWdlcyA9IHJlbW92ZUR1cGxpY2F0ZXMoYXBwLmxhbmd1YWdlcyk7XHJcblxyXG4gICAgYXBwLnRvcGljcy5wdXNoKC4uLm9iai50b3BpY3MpO1xyXG4gICAgYXBwLnRvcGljcyA9IHJlbW92ZUR1cGxpY2F0ZXMoYXBwLnRvcGljcyk7XHJcblxyXG4gICAgYXBwLndlYnNpdGUgPSBhcHAud2Vic2l0ZSB8fCBvYmoud2Vic2l0ZTtcclxuICAgIGFwcC53aWtpID0gYXBwLndpa2kgfHwgb2JqLndpa2k7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkQXBwQ2F0YWxvZygpIHtcclxuICBjb25zdCBzZXJ2aWNlSXRlbU9iamVjdHMgPSBhd2FpdCByZXF1ZXN0VGVtcGxhdGVzKFwiU2VydmljZSBpdGVtXCIpO1xyXG4gIGZvciAoY29uc3Qgc291cmNlIG9mIHNlcnZpY2VJdGVtT2JqZWN0cy5maWx0ZXIoXHJcbiAgICBzID0+ICFjb250YWluc09mZmxpbmVMaW5rKHNbXCJuYW1lXCJdIHx8IFwiXCIpXHJcbiAgKSkge1xyXG4gICAgY29uc3Qgb2JqOiBBcHAgPSB0cmFuc2Zvcm1TZXJ2aWNlSXRlbShzb3VyY2UpO1xyXG5cclxuICAgIGFkZEFwcChvYmopO1xyXG4gIH1cclxuICB1cGRhdGUoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcclxuXHJcbiAgY29uc3Qgc29mdHdhcmVPYmplY3RzID0gYXdhaXQgcmVxdWVzdFRlbXBsYXRlcyhcIlNvZnR3YXJlXCIpO1xyXG5cclxuICBmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb2Z0d2FyZU9iamVjdHMuZmlsdGVyKFxyXG4gICAgcyA9PlxyXG4gICAgICAhKFxyXG4gICAgICAgIGNvbnRhaW5zT2ZmbGluZUxpbmsoc1tcIm5hbWVcIl0gfHwgXCJcIikgfHxcclxuICAgICAgICBjb250YWluc09mZmxpbmVMaW5rKHNbXCJ3ZWJcIl0gfHwgXCJcIilcclxuICAgICAgKVxyXG4gICkpIHtcclxuICAgIGNvbnN0IG9iajogQXBwID0gdHJhbnNmb3JtU29mdHdhcmUoc291cmNlKTtcclxuXHJcbiAgICBhZGRBcHAob2JqKTtcclxuICB9XHJcbiAgdXBkYXRlKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XHJcblxyXG4gIHNodWZmbGVBcnJheShhcHBzKTtcclxuXHJcbiAgc2F2ZUFwcENhdGFsb2coKTtcclxufVxyXG5cclxuZ2V0QXBwQ2F0YWxvZygpO1xyXG5cclxuZnVuY3Rpb24gcmVuZGVyKG9iajoge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGltYWdlOiB7IHRodW1iPzogc3RyaW5nOyBvcmdpbmFsPzogc3RyaW5nIH07XHJcbiAgd2Vic2l0ZT86IHN0cmluZztcclxuICB3aWtpPzogc3RyaW5nO1xyXG4gIGxhbmd1YWdlczogc3RyaW5nW107XHJcbiAgdG9waWNzOiBzdHJpbmdbXTtcclxufSkge1xyXG4gIGNvbnN0IGRlZmF1bHRJbWFnZSA9XHJcbiAgICBcImh0dHBzOi8vd2lraS5vcGVuc3RyZWV0bWFwLm9yZy93L2ltYWdlcy90aHVtYi9jL2NhL01hcC0xNC5zdmcvMTQwcHgtTWFwLTE0LnN2Zy5wbmdcIjtcclxuXHJcbiAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXHJcbiAgICBcImRpdlwiLFxyXG4gICAgYDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZVwiPiR7XHJcbiAgICAgICAgICBvYmoud2Vic2l0ZVxyXG4gICAgICAgICAgICA/IGA8YSBocmVmPVwiJHtvYmoud2Vic2l0ZX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke29iai5uYW1lfTwvYT5gXHJcbiAgICAgICAgICAgIDogb2JqLm5hbWVcclxuICAgICAgICB9PC9kaXY+XHJcbiAgICAgICAgJHtcclxuICAgICAgICAgIG9iai53ZWJzaXRlXHJcbiAgICAgICAgICAgID8gYDxhIGhyZWY9XCIke29iai53ZWJzaXRlfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7XHJcbiAgICAgICAgICAgICAgICBvYmouaW1hZ2UudGh1bWJcclxuICAgICAgICAgICAgICAgICAgPyBgPGltZyBjbGFzcz1cImltZ1wiIHNyYz1cIiR7ZGVmYXVsdEltYWdlfVwiIGR5bmFtaWMtc3JjPVwiJHtvYmouaW1hZ2UudGh1bWJ9ICR7b2JqLmltYWdlLm9yZ2luYWx9ICR7ZGVmYXVsdEltYWdlfVwiLz5gXHJcbiAgICAgICAgICAgICAgICAgIDogYDxpbWcgY2xhc3M9XCJpbWdcIiBzcmM9XCIke2RlZmF1bHRJbWFnZX1cIi8+YFxyXG4gICAgICAgICAgICAgIH08L2E+YFxyXG4gICAgICAgICAgICA6IG9iai5pbWFnZS50aHVtYlxyXG4gICAgICAgICAgICA/IGA8aW1nIGNsYXNzPVwiaW1nXCIgc3JjPVwiJHtkZWZhdWx0SW1hZ2V9XCIgZHluYW1pYy1zcmM9XCIke29iai5pbWFnZS50aHVtYn0gJHtvYmouaW1hZ2Uub3JnaW5hbH0gJHtkZWZhdWx0SW1hZ2V9XCIvPmBcclxuICAgICAgICAgICAgOiBgPGltZyBjbGFzcz1cImltZ1wiIHNyYz1cIiR7ZGVmYXVsdEltYWdlfVwiLz5gXHJcbiAgICAgICAgfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+JHtvYmouZGVzY3JpcHRpb259PC9kaXY+XHJcbiAgICAgICR7XHJcbiAgICAgICAgb2JqLndlYnNpdGVcclxuICAgICAgICAgID8gYDxhIGNsYXNzPVwibGlua1wiIGhyZWY9XCIke29iai53ZWJzaXRlfVwiIHRhcmdldD1cIl9ibGFua1wiPjxpIGNsYXNzPVwiZmFyIGZhLW1hcFwiPjwvaT48L2E+YFxyXG4gICAgICAgICAgOiBcIlwiXHJcbiAgICAgIH1cclxuICAgICAgJHtcclxuICAgICAgICBvYmoud2lraVxyXG4gICAgICAgICAgPyBgPGEgY2xhc3M9XCJsaW5rXCIgaHJlZj1cIiR7b2JqLndpa2l9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGkgY2xhc3M9XCJmYXMgZmEtYXRsYXNcIj48L2k+PC9hPmBcclxuICAgICAgICAgIDogXCJcIlxyXG4gICAgICB9XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ0b3BpY3NcIj4ke29iai50b3BpY3NcclxuICAgICAgICAubWFwKHQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYmFja2dyb3VuZCA9IHRleHRUb0NvbG9yKHQpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHlpcSA9XHJcbiAgICAgICAgICAgIChiYWNrZ3JvdW5kLnIgKiAyOTkgKyBiYWNrZ3JvdW5kLmcgKiA1ODcgKyBiYWNrZ3JvdW5kLmIgKiAxMTQpIC9cclxuICAgICAgICAgICAgMTAwMDtcclxuXHJcbiAgICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwidG9waWNcIiBzdHlsZT1cImJhY2tncm91bmQ6IHJnYigke2JhY2tncm91bmQucn0sJHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC5nXHJcbiAgICAgICAgICB9LCR7YmFja2dyb3VuZC5ifSk7IGNvbG9yOiR7XHJcbiAgICAgICAgICAgIHlpcSA+PSAxMjggPyBcImJsYWNrXCIgOiBcIndoaXRlXCJcclxuICAgICAgICAgIH07XCI+JHt0fTwvc3Bhbj5gO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCJcIil9PC9kaXY+YCxcclxuICAgIFtcImFwcFwiXVxyXG4gICk7XHJcblxyXG4gIGdldEh0bWxFbGVtZW50KFwiLmFwcHNcIikuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRleHRUb0NvbG9yKHM6IHN0cmluZykge1xyXG4gIGxldCByID0gMDtcclxuICBsZXQgZyA9IDA7XHJcbiAgbGV0IGIgPSAwO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGkgJSAzID09PSAwKSByID0gKHIgKyBzLmNoYXJDb2RlQXQoaSkpICUgMjU2O1xyXG4gICAgZWxzZSBpZiAoaSAlIDMgPT09IDEpIGcgPSAoZyArIHMuY2hhckNvZGVBdChpKSkgJSAyNTY7XHJcbiAgICBlbHNlIGIgPSAoYiArIHMuY2hhckNvZGVBdChpKSkgJSAyNTY7XHJcbiAgfVxyXG4gIHJldHVybiB7IHIsIGcsIGIgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2h1ZmZsZUFycmF5KGFycmF5OiBhbnlbXSkge1xyXG4gIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XHJcbiAgICBbYXJyYXlbaV0sIGFycmF5W2pdXSA9IFthcnJheVtqXSwgYXJyYXlbaV1dO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB0b1dpa2ltZWRpYVVybCB9IGZyb20gXCIuL3V0aWxpdGllcy9pbWFnZVwiO1xyXG5pbXBvcnQgeyB0b1dpa2lVcmwsIHRvVXJsIH0gZnJvbSBcIi4vdXRpbGl0aWVzL3VybFwiO1xyXG5pbXBvcnQgeyByZW1vdmVEdXBsaWNhdGVzIH0gZnJvbSBcIi4vc2NyaXB0XCI7XHJcblxyXG5leHBvcnQgdHlwZSBBcHAgPSB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgaW1hZ2U6IHsgdGh1bWI/OiBzdHJpbmc7IG9yZ2luYWw/OiBzdHJpbmcgfTtcclxuICB3ZWJzaXRlPzogc3RyaW5nO1xyXG4gIHdpa2k6IHN0cmluZztcclxuICBsYW5ndWFnZXM6IHN0cmluZ1tdO1xyXG4gIHRvcGljczogc3RyaW5nW107XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtU29mdHdhcmUoc291cmNlOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSkge1xyXG4gIGNvbnN0IG9iajogQXBwID0ge1xyXG4gICAgbmFtZTogc291cmNlW1wibmFtZVwiXSB8fCBcIlwiLFxyXG4gICAgZGVzY3JpcHRpb246IHByb2Nlc3NXaWtpVGV4dChzb3VyY2VbXCJkZXNjcmlwdGlvblwiXSB8fCBcIlwiKSxcclxuICAgIGltYWdlOiB7XHJcbiAgICAgIHRodW1iOiB0b1dpa2ltZWRpYVVybChzb3VyY2VbXCJzY3JlZW5zaG90XCJdLCAyNTApLFxyXG4gICAgICBvcmdpbmFsOiB0b1dpa2ltZWRpYVVybChzb3VyY2VbXCJzY3JlZW5zaG90XCJdKVxyXG4gICAgfSxcclxuICAgIHdlYnNpdGU6IHRvVXJsKHNvdXJjZVtcIndlYlwiXSksXHJcbiAgICB3aWtpOiB0b1dpa2lVcmwoc291cmNlW1wid2lraVwiXSB8fCBzb3VyY2Uuc291cmNlV2lraSkgfHwgXCJcIixcclxuICAgIGxhbmd1YWdlczogKHNvdXJjZVtcImxhbmd1YWdlc1wiXSB8fCBcIlwiKVxyXG4gICAgIFxyXG4gICAgICAuc3BsaXQoc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleClcclxuICAgICAgLm1hcCh0cmltKVxyXG4gICAgICAubWFwKGV4dHJhY3RMYW5ndWFnZUNvZGVGcm9tTG9jYWwpXHJcbiAgICAgIC5maWx0ZXIodiA9PiB2KVxyXG4gICAgICAubWFwKHYgPT4gdi50b0xvd2VyQ2FzZSgpKSxcclxuICAgIHRvcGljczogKHNvdXJjZVtcImdlbnJlXCJdIHx8IFwiXCIpXHJcblxyXG4gICAgICAuc3BsaXQoc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleClcclxuICAgICAgLm1hcCh0cmltKVxyXG4gICAgICAuZmlsdGVyKHYgPT4gdilcclxuICAgICAgLm1hcChmaXJzdExldHRlclRvVXBwZXJDYXNlKVxyXG4gIH07XHJcbiAgb2JqLnRvcGljcy5wdXNoKFxyXG4gICAgLi4uKHNvdXJjZVtcInBsYXRmb3JtXCJdIHx8IFwiXCIpXHJcblxyXG4gICAgICAuc3BsaXQoc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleClcclxuICAgICAgLm1hcCh0cmltKVxyXG4gICAgICAuZmlsdGVyKHYgPT4gdilcclxuICAgICAgLm1hcChmaXJzdExldHRlclRvVXBwZXJDYXNlKVxyXG4gICk7XHJcbiAgaWYgKFxyXG4gICAgKHNvdXJjZVtcInRyYWNraW5nXCJdIHx8IFwiXCIpICYmXHJcbiAgICAoc291cmNlW1widHJhY2tpbmdcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSAhPT0gXCJZRVNcIiAmJlxyXG4gICAgKHNvdXJjZVtcInRyYWNraW5nXCJdIHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkgIT09IFwiTk9cIiAmJlxyXG4gICAgKHNvdXJjZVtcInRyYWNraW5nXCJdIHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkgIT09IFwiP1wiXHJcbiAgKVxyXG4gICAgb2JqLnRvcGljcy5wdXNoKFxyXG4gICAgICAuLi4oc291cmNlW1wicHJvZmlsZXNcIl0gfHwgXCJcIilcclxuXHJcbiAgICAgIC5zcGxpdChzcGxpdEJ5Q29tbWFCdXROb3RJbnNpZGVCcmFjZVJlZ2V4KVxyXG4gICAgICAgIC5tYXAodHJpbSlcclxuICAgICAgICAuZmlsdGVyKHYgPT4gdilcclxuICAgICAgICAubWFwKGZpcnN0TGV0dGVyVG9VcHBlckNhc2UpXHJcbiAgICApO1xyXG5cclxuICBpZiAoXHJcbiAgICAoc291cmNlW1wiYWNjZXNzaWJpbGl0eVwiXSB8fCBcIlwiKSAmJlxyXG4gICAgKHNvdXJjZVtcImFjY2Vzc2liaWxpdHlcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSAhPT0gXCJZRVNcIiAmJlxyXG4gICAgKHNvdXJjZVtcImFjY2Vzc2liaWxpdHlcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSAhPT0gXCJOT1wiICYmXHJcbiAgICAoc291cmNlW1wiYWNjZXNzaWJpbGl0eVwiXSB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpICE9PSBcIj9cIlxyXG4gICkge1xyXG4gICAgb2JqLnRvcGljcy5wdXNoKFxyXG4gICAgICAuLi4oc291cmNlW1wiYWNjZXNzaWJpbGl0eVwiXSB8fCBcIlwiKVxyXG5cclxuICAgICAgLnNwbGl0KHNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgpXHJcbiAgICAgICAgLm1hcCh0cmltKVxyXG4gICAgICAgIC5maWx0ZXIodiA9PiB2KVxyXG4gICAgICAgIC5tYXAoZmlyc3RMZXR0ZXJUb1VwcGVyQ2FzZSlcclxuICAgICk7XHJcbiAgICBvYmoudG9waWNzLnB1c2goXCJBY2Nlc3NpYmlsaXR5XCIpO1xyXG4gIH1cclxuICBpZiAoKHNvdXJjZVtcImFjY2Vzc2liaWxpdHlcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSA9PT0gXCJZRVNcIilcclxuICAgIG9iai50b3BpY3MucHVzaChcIkFjY2Vzc2liaWxpdHlcIik7XHJcblxyXG4gIGlmICgoc291cmNlW1widHJhY2tpbmdcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSA9PT0gXCJZRVNcIilcclxuICAgIG9iai50b3BpY3MucHVzaChcIlRyYWNraW5nXCIpO1xyXG5cclxuICBpZiAoKHNvdXJjZVtcIm1vbml0b3JpbmdcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSA9PT0gXCJZRVNcIilcclxuICAgIG9iai50b3BpY3MucHVzaChcIk1vbml0b3JpbmcgXCIpO1xyXG5cclxuICBpZiAoXHJcbiAgICAoc291cmNlW1wibmF2aWdhdGluZ1wiXSB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpID09PSBcIllFU1wiIHx8XHJcbiAgICAoc291cmNlW1wibmF2VG9Qb2ludFwiXSB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpID09PSBcIllFU1wiXHJcbiAgKVxyXG4gICAgb2JqLnRvcGljcy5wdXNoKFwiTmF2aWdhdGluZ1wiKTtcclxuXHJcbiAgaWYgKFxyXG4gICAgKHNvdXJjZVtcInJvdXRpbmdcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSA9PT0gXCJZRVNcIiB8fFxyXG4gICAgKHNvdXJjZVtcImNhbGN1bGF0ZVJvdXRlXCJdIHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkgPT09IFwiWUVTXCIgfHxcclxuICAgIChzb3VyY2VbXCJjYWxjdWxhdGVSb3V0ZU9mZmxpbmVcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSA9PT0gXCJZRVNcIlxyXG4gIClcclxuICAgIG9iai50b3BpY3MucHVzaChcIlJvdXRpbmdcIik7XHJcblxyXG4gIGlmICgoc291cmNlW1wiM0RcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSA9PT0gXCJZRVNcIikgb2JqLnRvcGljcy5wdXNoKFwiM0RcIik7XHJcblxyXG4gIGlmICgoc291cmNlW1wiZmluZExvY2F0aW9uXCJdIHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkgPT09IFwiWUVTXCIpXHJcbiAgICBvYmoudG9waWNzLnB1c2goXCJTZWFyY2hcIik7XHJcbiAgaWYgKChzb3VyY2VbXCJmaW5kTmVhcmJ5UE9JXCJdIHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkgPT09IFwiWUVTXCIpXHJcbiAgICBvYmoudG9waWNzLnB1c2goXCJQT0lcIik7XHJcblxyXG4gIGlmIChcclxuICAgIChzb3VyY2VbXCJhZGRQT0lcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSA9PT0gXCJZRVNcIiB8fFxyXG4gICAgKHNvdXJjZVtcImFkZFdheVwiXSB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpID09PSBcIllFU1wiIHx8XHJcbiAgICAoc291cmNlW1wiZWRpdFBPSVwiXSB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpID09PSBcIllFU1wiIHx8XHJcbiAgICAoc291cmNlW1wiZWRpdFRhZ3NcIl0gfHwgXCJcIikudG9VcHBlckNhc2UoKSA9PT0gXCJZRVNcIiB8fFxyXG4gICAgKHNvdXJjZVtcImVkaXRHZW9tXCJdIHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkgPT09IFwiWUVTXCIgfHxcclxuICAgIChzb3VyY2VbXCJlZGl0UmVsYXRpb25zXCJdIHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkgPT09IFwiWUVTXCJcclxuICApXHJcbiAgICBvYmoudG9waWNzLnB1c2goXCJFZGl0b3JcIik7XHJcblxyXG4gIG9iai50b3BpY3MgPSByZW1vdmVEdXBsaWNhdGVzKG9iai50b3BpY3MpLnNvcnQoKTtcclxuXHJcbiAge1xyXG4gICAgY29uc3QgbmFtZSA9IGV4dHJhY3ROYW1lV2Vic2l0ZVdpa2koc291cmNlW1wibmFtZVwiXSk7XHJcbiAgICBvYmoubmFtZSA9IG5hbWUubmFtZSB8fCBvYmoubmFtZTtcclxuICAgIG9iai53ZWJzaXRlID0gb2JqLndlYnNpdGUgfHwgbmFtZS53ZWJzaXRlO1xyXG4gICAgb2JqLndpa2kgPSBvYmoud2lraSB8fCBuYW1lLndpa2kgfHwgXCJcIjtcclxuICB9XHJcbiAge1xyXG4gICAgY29uc3QgbmFtZSA9IGV4dHJhY3ROYW1lV2Vic2l0ZVdpa2koc291cmNlW1wid2ViXCJdKTtcclxuICAgIG9iai5uYW1lID0gb2JqLm5hbWUgfHwgbmFtZS5uYW1lO1xyXG4gICAgb2JqLndlYnNpdGUgPSBuYW1lLndlYnNpdGUgfHwgb2JqLndlYnNpdGU7XHJcbiAgICBvYmoud2lraSA9IG9iai53aWtpIHx8IG5hbWUud2lraSB8fCBcIlwiO1xyXG4gIH1cclxuICB7XHJcbiAgICBjb25zdCBuYW1lID0gZXh0cmFjdE5hbWVXZWJzaXRlV2lraShzb3VyY2VbXCJ3aWtpXCJdKTtcclxuICAgIG9iai5uYW1lID0gb2JqLm5hbWUgfHwgbmFtZS5uYW1lO1xyXG4gICAgb2JqLndlYnNpdGUgPSBvYmoud2Vic2l0ZSB8fCBuYW1lLndlYnNpdGU7XHJcbiAgICBvYmoud2lraSA9IG5hbWUud2lraSB8fCBvYmoud2lraTtcclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVNlcnZpY2VJdGVtKHNvdXJjZTogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0pIHtcclxuICBjb25zdCBvYmo6IEFwcCA9IHtcclxuICAgIG5hbWU6IHNvdXJjZVtcIm5hbWVcIl0gfHwgXCJcIixcclxuICAgIGRlc2NyaXB0aW9uOiBwcm9jZXNzV2lraVRleHQoc291cmNlW1wiZGVzY3JcIl0gfHwgXCJcIiksXHJcbiAgICBpbWFnZToge1xyXG4gICAgICB0aHVtYjogdG9XaWtpbWVkaWFVcmwoc291cmNlW1wiaW1hZ2VcIl0sIDI1MCksXHJcbiAgICAgIG9yZ2luYWw6IHRvV2lraW1lZGlhVXJsKHNvdXJjZVtcImltYWdlXCJdKVxyXG4gICAgfSxcclxuICAgIHdpa2k6IHRvV2lraVVybChzb3VyY2Uuc291cmNlV2lraSkgfHwgXCJcIixcclxuICAgIGxhbmd1YWdlczogKHNvdXJjZVtcImxhbmdcIl0gfHwgXCJcIilcclxuICAgICAgLnNwbGl0KHNwbGl0QnlDb21tYUJ1dE5vdEluc2lkZUJyYWNlUmVnZXgpXHJcbiAgICAgIC5tYXAoZXh0cmFjdExhbmd1YWdlQ29kZUZyb21UZW1wbGF0ZSlcclxuICAgICAgLm1hcCh0cmltKVxyXG4gICAgICAuZmlsdGVyKHYgPT4gdilcclxuICAgICAgLm1hcCh2ID0+IHYudG9Mb3dlckNhc2UoKSksXHJcbiAgICB0b3BpY3M6IChzb3VyY2VbXCJnZW5yZVwiXSB8fCBcIlwiKVxyXG4gICAgICAuc3BsaXQoc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleClcclxuICAgICAgLm1hcCh0cmltKVxyXG4gICAgICAuZmlsdGVyKHYgPT4gdilcclxuICAgICAgLm1hcChmaXJzdExldHRlclRvVXBwZXJDYXNlKVxyXG4gICAgICAuc29ydCgpXHJcbiAgfTtcclxuXHJcbiAgbGV0IG5hbWUgPSBleHRyYWN0TmFtZVdlYnNpdGVXaWtpKHNvdXJjZVtcIm5hbWVcIl0pO1xyXG4gIG9iai5uYW1lID0gbmFtZS5uYW1lIHx8IG9iai5uYW1lO1xyXG4gIG9iai53ZWJzaXRlID0gbmFtZS53ZWJzaXRlO1xyXG4gIG9iai53aWtpID0gb2JqLndpa2kgfHwgbmFtZS53aWtpIHx8IFwiXCI7XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuY29uc3Qgc3BsaXRCeUNvbW1hQnV0Tm90SW5zaWRlQnJhY2VSZWdleCA9IC9bLDtdKyg/IVteXFwoXSpcXCkpLztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc09mZmxpbmVMaW5rKHZhbHVlOiBzdHJpbmcpIHtcclxuICByZXR1cm4gLzxzKHRyaWtlKT8+L2dpLnRlc3QodmFsdWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHRyYWN0TGFuZ3VhZ2VDb2RlRnJvbUxvY2FsKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IG1hdGNoID0gLyhcXHd7MiwzfSktLy5leGVjKHZhbHVlKTtcclxuXHJcbiAgaWYgKG1hdGNoKSByZXR1cm4gbWF0Y2hbMV07XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHRyYWN0TGFuZ3VhZ2VDb2RlRnJvbVRlbXBsYXRlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IG1hdGNoID0gLzooXFx3ezJ9KS8uZXhlYyh2YWx1ZSk7XHJcblxyXG4gIGlmIChtYXRjaCkgcmV0dXJuIG1hdGNoWzFdO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlyc3RMZXR0ZXJUb1VwcGVyQ2FzZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gYCR7dmFsdWVbMF0udG9VcHBlckNhc2UoKX0ke3ZhbHVlLnNsaWNlKDEpfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyaW0odmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL15bXFwuXFxzXSt8W1xcLlxcc10rJC9nbSwgXCJcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4dHJhY3ROYW1lV2Vic2l0ZVdpa2kodmFsdWU6IHN0cmluZyA9IFwiXCIpIHtcclxuICBjb25zdCBvYmo6IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHdlYnNpdGU/OiBzdHJpbmc7XHJcbiAgICB3aWtpPzogc3RyaW5nO1xyXG4gIH0gPSB7IG5hbWU6IHZhbHVlIH07XHJcblxyXG4gIHtcclxuICAgIGNvbnN0IHJlZ2V4ID0gLyhcXFsoKChbQS1aYS16XXszLDl9Oig/OlxcL1xcLyk/KSg/OltcXC07OiY9XFwrXFwkLFxcd10rQCk/W0EtWmEtejAtOVxcLlxcLV0rfCg/Ond3d1xcLnxbXFwtOzomPVxcK1xcJCxcXHddK0ApW0EtWmEtejAtOVxcLlxcLV0rKSgoPzpcXC9bXFwrfiVcXC9cXC5cXHdcXC1fXSopP1xcPz8oPzpbXFwtXFwrPSY7JUBcXC5cXHdfXSopIz8oPzpbXFwuXFwhXFwvXFxcXFxcd10qKSk/KVxcXSkvZztcclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWModmFsdWUpO1xyXG5cclxuICAgIGlmIChtYXRjaCkge1xyXG4gICAgICBvYmoud2Vic2l0ZSA9IG1hdGNoWzJdO1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVnZXgsIFwiXCIpLnRyaW0oKTtcclxuICAgICAgaWYgKHZhbHVlKSBvYmoubmFtZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuICB7XHJcbiAgICBjb25zdCByZWdleCA9IC8oXFxbKCgoW0EtWmEtel17Myw5fTooPzpcXC9cXC8pPykoPzpbXFwtOzomPVxcK1xcJCxcXHddK0ApP1tBLVphLXowLTlcXC5cXC1dK3woPzp3d3dcXC58W1xcLTs6Jj1cXCtcXCQsXFx3XStAKVtBLVphLXowLTlcXC5cXC1dKykoKD86XFwvW1xcK34lXFwvXFwuXFx3XFwtX10qKT9cXD8/KD86W1xcLVxcKz0mOyVAXFwuXFx3X10qKSM/KD86W1xcLlxcIVxcL1xcXFxcXHddKikpPykgKC4qKVxcXSkvZztcclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWModmFsdWUpO1xyXG5cclxuICAgIGlmIChtYXRjaCkge1xyXG4gICAgICBvYmoubmFtZSA9IG1hdGNoWzZdO1xyXG4gICAgICBvYmoud2Vic2l0ZSA9IG1hdGNoWzJdO1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVnZXgsIFwiXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICB7XHJcbiAgICBjb25zdCByZWdleCA9IC9cXFtcXFsoLiooPyFbXlxcfF0pKShcXHwoLiopKT9cXF1cXF0vZztcclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWModmFsdWUpO1xyXG5cclxuICAgIGlmIChtYXRjaCkge1xyXG4gICAgICBpZiAobWF0Y2hbM10pIG9iai5uYW1lID0gbWF0Y2hbM107XHJcbiAgICAgIGVsc2Ugb2JqLm5hbWUgPSBtYXRjaFsxXTtcclxuICAgICAgb2JqLndpa2kgPSB0b1dpa2lVcmwobWF0Y2hbMV0pO1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVnZXgsIFwiXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAge1xyXG4gICAgY29uc3QgcmVnZXggPSAvXFxbXFxbKC4qKVxcXVxcXS9nO1xyXG5cclxuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyh2YWx1ZSk7XHJcblxyXG4gICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgIG9iai5uYW1lID0gbWF0Y2hbMV07XHJcbiAgICAgIG9iai53aWtpID0gdG9XaWtpVXJsKG1hdGNoWzFdKTtcclxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlZ2V4LCBcIlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NXaWtpVGV4dCh0ZXh0OiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAge1xyXG4gICAgY29uc3QgcmVnZXggPSAvKFxcWygoKFtBLVphLXpdezMsOX06KD86XFwvXFwvKT8pKD86W1xcLTs6Jj1cXCtcXCQsXFx3XStAKT9bQS1aYS16MC05XFwuXFwtXSt8KD86d3d3XFwufFtcXC07OiY9XFwrXFwkLFxcd10rQClbQS1aYS16MC05XFwuXFwtXSspKCg/OlxcL1tcXCt+JVxcL1xcLlxcd1xcLV9dKik/XFw/Pyg/OltcXC1cXCs9JjslQFxcLlxcd19dKikjPyg/OltcXC5cXCFcXC9cXFxcXFx3XSopKT8pXFxdKS9nO1xyXG5cclxuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyh0ZXh0KTtcclxuXHJcbiAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShcclxuICAgICAgICByZWdleCxcclxuICAgICAgICBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7bWF0Y2hbMl19XCI+JHttYXRjaFsyXX08L2E+YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICB7XHJcbiAgICBjb25zdCByZWdleCA9IC8oXFxbKCgoW0EtWmEtel17Myw5fTooPzpcXC9cXC8pPykoPzpbXFwtOzomPVxcK1xcJCxcXHddK0ApP1tBLVphLXowLTlcXC5cXC1dK3woPzp3d3dcXC58W1xcLTs6Jj1cXCtcXCQsXFx3XStAKVtBLVphLXowLTlcXC5cXC1dKykoKD86XFwvW1xcK34lXFwvXFwuXFx3XFwtX10qKT9cXD8/KD86W1xcLVxcKz0mOyVAXFwuXFx3X10qKSM/KD86W1xcLlxcIVxcL1xcXFxcXHddKikpPykgKC4qKVxcXSkvZztcclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWModGV4dCk7XHJcblxyXG4gICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoXHJcbiAgICAgICAgcmVnZXgsXHJcbiAgICAgICAgYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIke21hdGNoWzJdfVwiPiR7bWF0Y2hbNl19PC9hPmBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHtcclxuICAgIGNvbnN0IHJlZ2V4ID0gL1xcW1xcWzp3aWtpcGVkaWE6KC4qKD8hW15cXHxdKSkoXFx8KC4qKSk/XFxdXFxdL2c7XHJcblxyXG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKHRleHQpO1xyXG5cclxuICAgIGlmIChtYXRjaCkge1xyXG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKFxyXG4gICAgICAgIHJlZ2V4LFxyXG4gICAgICAgIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvJHttYXRjaFsxXX1cIj4ke21hdGNoWzNdfTwvYT5gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHtcclxuICAgIGNvbnN0IHJlZ2V4ID0gL1xcW1xcWzp3aWtpcGVkaWE6KC4qKVxcXVxcXS9nO1xyXG5cclxuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyh0ZXh0KTtcclxuXHJcbiAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShcclxuICAgICAgICByZWdleCxcclxuICAgICAgICBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpLyR7bWF0Y2hbMV19XCI+JHttYXRjaFsxXX08L2E+YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICB7XHJcbiAgICBjb25zdCByZWdleCA9IC9cXFtcXFsoLiooPyFbXlxcfF0pKShcXHwoLiopKT9cXF1cXF0vZztcclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWModGV4dCk7XHJcblxyXG4gICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoXHJcbiAgICAgICAgcmVnZXgsXHJcbiAgICAgICAgYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIke3RvV2lraVVybChtYXRjaFsxXSl9XCI+JHttYXRjaFszXX08L2E+YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICB7XHJcbiAgICBjb25zdCByZWdleCA9IC9cXFtcXFsoLiopXFxdXFxdL2c7XHJcblxyXG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKHRleHQpO1xyXG5cclxuICAgIGlmIChtYXRjaCkge1xyXG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKFxyXG4gICAgICAgIHJlZ2V4LFxyXG4gICAgICAgIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHt0b1dpa2lVcmwobWF0Y2hbMV0pfVwiPiR7bWF0Y2hbMV19PC9hPmBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0ZXh0O1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRIdG1sRWxlbWVudDxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPihcclxuICBzZWxlY3RvcnM6IEssXHJcbiAgY29udGVudEVsZW1lbnQ/OiBQYXJlbnROb2RlXHJcbik6IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEh0bWxFbGVtZW50KFxyXG4gIHNlbGVjdG9yczogc3RyaW5nLFxyXG4gIGNvbnRlbnRFbGVtZW50PzogUGFyZW50Tm9kZVxyXG4pOiBIVE1MRWxlbWVudDtcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEh0bWxFbGVtZW50KFxyXG4gIHNlbGVjdG9yczogc3RyaW5nLFxyXG4gIGNvbnRlbnRFbGVtZW50OiBQYXJlbnROb2RlID0gZG9jdW1lbnRcclxuKTogSFRNTEVsZW1lbnQge1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBjb250ZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycyk7XHJcblxyXG4gIGlmICghZWxlbWVudCkgdGhyb3cgYEVsZW1lbnQgJHtzZWxlY3RvcnN9IG5vdCBmb3VuZC5gO1xyXG5cclxuICByZXR1cm4gZWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEh0bWxFbGVtZW50cyhcclxuICBzZWxlY3RvcnM6IHN0cmluZyxcclxuICBjb250ZW50RWxlbWVudD86IFBhcmVudE5vZGVcclxuKTogSFRNTEVsZW1lbnRbXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEh0bWxFbGVtZW50cyhcclxuICBzZWxlY3RvcnM6IHN0cmluZyxcclxuICBjb250ZW50RWxlbWVudDogUGFyZW50Tm9kZSA9IGRvY3VtZW50XHJcbik6IEhUTUxFbGVtZW50W10ge1xyXG4gIGNvbnN0IGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XHJcbiAgY29udGVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMpLmZvckVhY2godiA9PiB7XHJcbiAgICBlbGVtZW50cy5wdXNoKHYgYXMgSFRNTEVsZW1lbnQpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZWxlbWVudHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50PEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+KFxyXG4gIHRhZzogSyxcclxuICBpbm5lckhUTUw6IHN0cmluZyA9IFwiXCIsXHJcbiAgY2xhc3NOYW1lczogc3RyaW5nW10gPSBbXVxyXG4pIHtcclxuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xyXG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVzKTtcclxuICByZXR1cm4gZWxlbWVudDtcclxufVxyXG4iLCJpbXBvcnQgbWQ1ID0gcmVxdWlyZShcIm1kNVwiKTtcclxuaW1wb3J0IHsgaHR0cFJlZ2V4IH0gZnJvbSBcIi4vdXJsXCI7XHJcbmltcG9ydCB7IHN0YXJ0c1dpdGhJZ25vcmVDYXNlIH0gZnJvbSBcIi4vc3RyaW5nXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9XaWtpbWVkaWFVcmwoc291cmNlOiBzdHJpbmcsIHNpemU/OiBudW1iZXIpIHtcclxuICBpZiAoIXNvdXJjZSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgbGV0IGZpbGVOYW1lID0gXCJcIjtcclxuXHJcbiAgaWYgKGh0dHBSZWdleC50ZXN0KHNvdXJjZSkpIHtcclxuICAgIHJldHVybiBzb3VyY2U7XHJcbiAgfSBlbHNlIGlmIChzdGFydHNXaXRoSWdub3JlQ2FzZShzb3VyY2UsIFwiRmlsZTpcIikpXHJcbiAgICBmaWxlTmFtZSA9IHNvdXJjZS5zdWJzdHJpbmcoNSwgc291cmNlLmxlbmd0aCk7XHJcbiAgZWxzZSBpZiAoXHJcbiAgICBzdGFydHNXaXRoSWdub3JlQ2FzZShzb3VyY2UsIFwiaHR0cHM6Ly93aWtpLm9wZW5zdHJlZXRtYXAub3JnL3dpa2kvRmlsZTpcIilcclxuICApXHJcbiAgICBmaWxlTmFtZSA9IHNvdXJjZS5zdWJzdHJpbmcoNDAsIHNvdXJjZS5sZW5ndGgpO1xyXG4gIGVsc2UgaWYgKFxyXG4gICAgc3RhcnRzV2l0aElnbm9yZUNhc2Uoc291cmNlLCBcImh0dHA6Ly93aWtpLm9wZW5zdHJlZXRtYXAub3JnL3dpa2kvRmlsZTpcIilcclxuICApXHJcbiAgICBmaWxlTmFtZSA9IHNvdXJjZS5zdWJzdHJpbmcoMzksIHNvdXJjZS5sZW5ndGgpO1xyXG4gIGVsc2UgZmlsZU5hbWUgPSBzb3VyY2U7XHJcblxyXG4gIGZpbGVOYW1lID0gZGVjb2RlVVJJKGZpbGVOYW1lKS5yZXBsYWNlKC8gL2csIFwiX1wiKTtcclxuXHJcbiAgY29uc3QgaGFzaCA9IG1kNShmaWxlTmFtZSk7XHJcblxyXG4gIGlmIChzaXplKVxyXG4gICAgcmV0dXJuIGBodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvdy9pbWFnZXMvdGh1bWIvJHtoYXNoLnN1YnN0cmluZyhcclxuICAgICAgMCxcclxuICAgICAgMVxyXG4gICAgKX0vJHtoYXNoLnN1YnN0cmluZygwLCAyKX0vJHtmaWxlTmFtZX0vJHtzaXplfXB4LSR7ZmlsZU5hbWV9YDtcclxuXHJcbiAgcmV0dXJuIGBodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvdy9pbWFnZXMvJHtoYXNoLnN1YnN0cmluZyhcclxuICAgIDAsXHJcbiAgICAxXHJcbiAgKX0vJHtoYXNoLnN1YnN0cmluZygwLCAyKX0vJHtmaWxlTmFtZX1gO1xyXG59XHJcbiIsImltcG9ydCB7IHV0aWxRc1N0cmluZyB9IGZyb20gXCIuL3VybFwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEpzb24odXJsOiBzdHJpbmcsIHBhcmFtczogYW55KSB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9PyR7dXRpbFFzU3RyaW5nKHBhcmFtcyl9YCwge1xyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qXCIsXHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNldDxUIGV4dGVuZHMge30+KGtleTogc3RyaW5nLCB2YWx1ZTogVCkge1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldDxUIGV4dGVuZHMge30+KGtleTogc3RyaW5nKTogVCB8IHVuZGVmaW5lZCB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHYgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgaWYgKCF2KSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2Uodik7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gZXF1YWxzSWdub3JlQ2FzZShcclxuICBzMTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIHMyOiBzdHJpbmcgfCB1bmRlZmluZWRcclxuKSB7XHJcbiAgcmV0dXJuIChzMSB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpID09PSAoczIgfHwgXCJcIikudG9VcHBlckNhc2UoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0c1dpdGhJZ25vcmVDYXNlKFxyXG4gIHM6IHN0cmluZyxcclxuICBzZWFyY2hTdHJpbmc6IHN0cmluZyxcclxuICBwb3NpdGlvbj86IG51bWJlclxyXG4pIHtcclxuICByZXR1cm4gcy50b1VwcGVyQ2FzZSgpLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nLnRvVXBwZXJDYXNlKCksIHBvc2l0aW9uKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDbG9zaW5nQnJhY2tldEluZGV4KHN0cjogc3RyaW5nLCBwb3M6IG51bWJlcikge1xyXG4gIGlmIChzdHJbcG9zXSAhPT0gXCJ7XCIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBwb3NpdGlvbiBtdXN0IGNvbnRhaW4gYW4gb3BlbmluZyBicmFja2V0XCIpO1xyXG4gIH1cclxuICBsZXQgbGV2ZWwgPSAxO1xyXG4gIGZvciAobGV0IGluZGV4ID0gcG9zICsgMTsgaW5kZXggPCBzdHIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICBpZiAoc3RyW2luZGV4XSA9PT0gXCJ7XCIpIHtcclxuICAgICAgbGV2ZWwrKztcclxuICAgIH0gZWxzZSBpZiAoc3RyW2luZGV4XSA9PT0gXCJ9XCIpIHtcclxuICAgICAgbGV2ZWwtLTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGV2ZWwgPT09IDApIHtcclxuICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gLTE7XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGh0dHBSZWdleCA9IC9eaHR0cHM/OlxcL1xcLy9pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvVXJsKHVybDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgaWYgKCF1cmwpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gIGlmICghaHR0cFJlZ2V4LnRlc3QodXJsKSkgcmV0dXJuIGBodHRwOi8vJHt1cmx9YDtcclxuXHJcbiAgcmV0dXJuIHVybDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvV2lraVVybCh3aWtpOiBzdHJpbmcpIHtcclxuICBpZiAoIXdpa2kpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gIGlmIChodHRwUmVnZXgudGVzdCh3aWtpKSkgcmV0dXJuIHdpa2k7XHJcblxyXG4gIHJldHVybiBgaHR0cHM6Ly93aWtpLm9wZW5zdHJlZXRtYXAub3JnL3dpa2kvJHt3aWtpfWA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1dGlsUXNTdHJpbmcob2JqOiBhbnksIG5vZW5jb2RlPzogYm9vbGVhbikge1xyXG4gIC8vIGVuY29kZSBldmVyeXRoaW5nIGV4Y2VwdCBzcGVjaWFsIGNoYXJhY3RlcnMgdXNlZCBpbiBjZXJ0YWluIGhhc2ggcGFyYW1ldGVyczpcclxuICAvLyBcIi9cIiBpbiBtYXAgc3RhdGVzLCBcIjpcIiwgXCIsXCIsIHtcIiBhbmQgXCJ9XCIgaW4gYmFja2dyb3VuZFxyXG4gIGZ1bmN0aW9uIHNvZnRFbmNvZGUoczogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzKS5yZXBsYWNlKFxyXG4gICAgICAvKCUyRnwlM0F8JTJDfCU3QnwlN0QpL2csXHJcbiAgICAgIGRlY29kZVVSSUNvbXBvbmVudFxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcclxuICAgIC5zb3J0KClcclxuICAgIC5tYXAoXHJcbiAgICAgIGtleSA9PlxyXG4gICAgICAgIGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke1xyXG4gICAgICAgICAgbm9lbmNvZGUgPyBzb2Z0RW5jb2RlKG9ialtrZXldKSA6IGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSlcclxuICAgICAgICB9YFxyXG4gICAgKVxyXG4gICAgLmpvaW4oXCImXCIpO1xyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9