// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"eKDL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONST = void 0;
exports.CONST = {
  ID_BUTTON_RUN: 'id_button_run',
  ID_TEXT_FROM: 'id_text_from',
  ID_TEXT_TO: 'id_text_to',
  ID_LENGTH_FROM: 'id_length_from' // fromの文字数表示ノード
  ,

  ID_LENGTH_TO: 'id_length_to' // toの文字数表示ノード
  ,

  ID_BUTTONS: 'id_buttons_block' // パラグラフコピーボタンを列挙するノード
  ,

  ID_LIMIT_LENGTH: 'id_limit_length' // 分割文字数の入力フィールド
  ,

  ID_BTN_COPY: 'id_button_copy' // コピーボタン
  ,

  ID_BTN_INPUT_TOP: 'id_button_input_top' // コピーボタン
  ,

  ID_BTN_INPUT_BOTTOM: 'id_button_input_bottom' // コピーボタン
  ,

  ID_BTN_OUTPUT_TOP: 'id_button_output_top' // コピーボタン
  ,

  ID_BTN_OUTPUT_BOTTOM: 'id_button_output_bottom' // コピーボタン
  ,

  STYLE_COPY_DEFAULT: 'btn-info' // コピーボタンのデフォルトスタイル
  ,

  STYLE_COPY_SUCCESS: 'btn-outline-success',
  STYLE_SCROLL: 'btn btn-outline-primary' // スクロールボタン
  ,

  VALUE_BTN_COPY: "copy to clipboard",
  RE_SHRINK: '([─━=━┏])\\1+',
  RE_URL: 'https?://[\\w!?/+\-=_~;.,*&@#$%()\'[\\]]+',
  LIMIT_LENGTH: 20000 // 分割する目安となる文字数の上限
};
},{}],"wG9V":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailbodyTinker = void 0;
var constants_1 = require("./constants");
// メール本文の処理を行うクラス
var MailbodyTinker = /*#__PURE__*/function () {
  function MailbodyTinker() {
    var max_part_length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
    _classCallCheck(this, MailbodyTinker);
    this.title = "";
    this.raw_body = "";
    this.bodies = [];
    this.max_part_length = max_part_length;
  }
  _createClass(MailbodyTinker, [{
    key: "proc",
    value: function proc(body) {
      if (body.length == 0) {
        throw new Error("メール本文が未入力です。");
      }
      this.raw_body = body;
      body = this.regex_convert(body);
      this.bodies = this.split_body(body, this.max_part_length);
      return this.bodies;
    }
    // 正規表現を使って文字列の置換処理を行う
  }, {
    key: "regex_convert",
    value: function regex_convert(raw_body) {
      var converted;
      // セパレーター文字列のシュリンク
      var reg_shrink = new RegExp(constants_1.CONST.RE_SHRINK, 'g');
      converted = raw_body.replace(reg_shrink, "$1");
      var reg_url = new RegExp(constants_1.CONST.RE_URL, 'g');
      // URLの置換
      converted = converted.replace(reg_url, '(URL)');
      console.log(converted.length);
      return converted;
    }
    // 指定文字数以内で文字列を区切った文字列配列を返す
  }, {
    key: "split_body",
    value: function split_body(body, max) {
      // 指定文字列未満のとき、そのまま帰す
      if (body.length < max) {
        return [body];
      }
      var splitted = body.split(/\n\n/);
      var result = splitted.reduce(function (prev, paragraph) {
        paragraph += "\n\n";
        var count = prev[prev.length - 1].length;
        if (count > 0 && count + paragraph.length > max) {
          // 新しくパラグラフを追加する
          prev.push(paragraph);
        } else {
          // 末端のパラグラフに連結する
          prev[prev.length - 1] = prev[prev.length - 1].concat(paragraph);
        }
        return prev;
      }, [""]);
      return result;
    }
  }]);
  return MailbodyTinker;
}();
exports.MailbodyTinker = MailbodyTinker;
},{"./constants":"eKDL"}],"UnXq":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utils = void 0;
var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }
  _createClass(Utils, null, [{
    key: "is_not_empty_string",
    value:
    // 空文字列ではないことをチェックする
    function is_not_empty_string(test_str) {
      return !Utils.is_empty_string(test_str);
    }
    // 空文字列であることをチェックする
  }, {
    key: "is_empty_string",
    value: function is_empty_string(test_str) {
      if (test_str == null || test_str == undefined) {
        return true;
      }
      if (test_str.length > 0) {
        return false;
      }
      return true;
    }
    /**
     * kintoneのメニューアイコン風にスタイルを付与する
     * @param el 装飾対象のノード
     */
  }, {
    key: "decorate_menu_icon",
    value: function decorate_menu_icon(el) {
      el.style.height = '48px';
      el.style.backgroundColor = '#f7f9fa';
      el.style.fontSize = '28px';
      el.style.border = '1px solid #e3e7e8';
      el.style.display = 'inline';
      el.style.marginLeft = '2px';
      el.style.marginRight = '2px';
      el.style.verticalAlign = 'middle';
      return el;
    }
    // 現在開いているkintoneドメインのうち指定した番号のアプリのURLを構築して返す
  }, {
    key: "get_application_url",
    value: function get_application_url(appid) {
      return "".concat(location.protocol, "//").concat(location.host, "/k/").concat(appid);
    }
    // kintone clientのエラーを受け取ってメッセージを抽出し、文字列配列の形で返す
  }, {
    key: "retrieve_errors",
    value: function retrieve_errors(error) {
      var max_msgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var _b;
      var errors = (_b = error === null || error === void 0 ? void 0 : error.error) === null || _b === void 0 ? void 0 : _b.errors;
      if (errors == undefined) {
        return undefined;
      }
      // メッセージの構築
      var whole_errors = [];
      Object.keys(errors).forEach(function (field) {
        var msgs = errors[field].messages;
        var comments = msgs.map(function (msg) {
          return "[".concat(field, "] ").concat(msg);
        });
        whole_errors = whole_errors.concat(comments);
      });
      // ソート
      whole_errors.sort();
      // エラーレコードの件数が多い場合に省略
      if (max_msgs >= 0 && max_msgs < whole_errors.length) {
        var remain_msgs = whole_errors.length - max_msgs;
        whole_errors = whole_errors.splice(0, max_msgs);
        whole_errors.push("\u4EE5\u4E0B".concat(remain_msgs, "\u4EF6\u306E\u30A8\u30E9\u30FC\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u7701\u7565\u3057\u307E\u3057\u305F\u3002"));
      }
      return whole_errors;
    }
  }]);
  return Utils;
}();
exports.Utils = Utils;
_a = Utils;
// 設定値またはデフォルト値を取得
Utils.get_from = function (dic, conf_key, defaults) {
  if (dic.hasOwnProperty(conf_key)) {
    return dic[conf_key];
  }
  return defaults;
};
// ノードを構築して返す
Utils.createElement = function (tagName) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var childElements = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var textContent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var attrs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  var el = document.createElement(tagName);
  el.className = className;
  el.textContent = textContent;
  if (childElements.length > 0) {
    childElements.forEach(function (child) {
      el.appendChild(child);
    });
  }
  // 属性値をセット
  if (attrs) {
    Object.entries(attrs).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      el.setAttribute(key, value);
    });
  }
  return el;
};
// shotcut for createElement
Utils.ce = function (t) {
  var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var ce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var tc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var at = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  return _a.createElement(t, c, ce, tc, at);
};
/**
 * テキストだけを持ったDIV要素を構築して返す
 * @param msg innerText
 * @returns
 */
Utils.simpleDiv = function (msg) {
  return Utils.createElement('div', '', [], msg);
};
// 配列のうち、重複したものがあればTrueを返す
Utils.is_overlapped = function (list) {
  var overlapped = Utils.overlapped(list);
  if (overlapped.length > 0) {
    return true;
  }
  return false;
};
// 配列のうち、重複したものをUniqして返す
Utils.overlapped = function (list) {
  var overlapped = list.filter(function (x, _i, self) {
    return self.indexOf(x) !== self.lastIndexOf(x);
  });
  return Array.from(new Set(overlapped));
};
},{}],"s1Yh":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrepareMailbody = void 0;
var constants_1 = require("./constants");
var mailbody_tinker_1 = require("./mailbody_tinker");
var utils_1 = require("./utils");
var PrepareMailbody = /*#__PURE__*/function () {
  // inputのテキストフィールドから、outputのテキストフィールドに変換結果をコピーする
  function PrepareMailbody(id) {
    _classCallCheck(this, PrepareMailbody);
    this.top_id = id;
  }
  _createClass(PrepareMailbody, [{
    key: "build",
    value: function build() {
      this.build_forms(this.top_id);
    }
    // 画面を構築する
  }, {
    key: "build_forms",
    value: function build_forms(node_id) {
      var top = document.getElementById(node_id);
      top === null || top === void 0 ? void 0 : top.setAttribute("class", "me-5");
      // 実行ボタン
      var btn_run = utils_1.Utils.ce('input', 'btn btn-primary col-11 mt-3 mb-4', [], '', {
        type: 'button',
        value: 'prepare',
        id: constants_1.CONST.ID_BUTTON_RUN
      });
      btn_run.addEventListener('click', PrepareMailbody.run);
      // 文字数上限入力フォーム
      var field_limit = utils_1.Utils.ce("input", "col-5 ms-2", [], "", {
        id: constants_1.CONST.ID_LIMIT_LENGTH,
        value: "".concat(constants_1.CONST.LIMIT_LENGTH)
      });
      // FROMフィールド
      var label_from = utils_1.Utils.ce('label', 'col-4 mb-2', [], "from");
      var textfield_from = PrepareMailbody.create_textarea(constants_1.CONST.ID_TEXT_FROM);
      textfield_from.addEventListener('change', PrepareMailbody.change_from);
      // TOフィールド
      var label_to = utils_1.Utils.ce('label', 'col-4 mb-2', [], "to speach");
      var textfield_to = PrepareMailbody.create_textarea(constants_1.CONST.ID_TEXT_TO);
      textfield_to.addEventListener('change', PrepareMailbody.change_to);
      // クリップボードにコピーボタン
      var copy_to_cb = PrepareMailbody.create_copybutton(constants_1.CONST.ID_BTN_COPY, constants_1.CONST.VALUE_BTN_COPY);
      btn_run.classList.add("col-9");
      copy_to_cb.classList.add("row");
      // 全体を構築
      var formset = utils_1.Utils.ce('div', 'container', [utils_1.Utils.ce("div", "row", [label_from, utils_1.Utils.ce('span', 'col-4', [], '', {
        id: constants_1.CONST.ID_LENGTH_FROM
      })]), textfield_from, utils_1.Utils.ce("div", "row mt-3", [utils_1.Utils.ce('div', 'col-5', [], "split about:"), field_limit]), utils_1.Utils.ce('div', 'row', [btn_run]), utils_1.Utils.ce("div", 'row', [label_to, utils_1.Utils.ce('span', 'col-4', [], '', {
        id: constants_1.CONST.ID_LENGTH_TO
      })]), textfield_to, copy_to_cb
      // , Utils.ce('div', '', [], '', {
      //     id: CONST.ID_BUTTONS
      // })
      ]);

      top === null || top === void 0 ? void 0 : top.append(formset);
    }
  }], [{
    key: "run",
    value: function run() {
      PrepareMailbody.clear_copybutton(constants_1.CONST.ID_BTN_COPY);
      var from = PrepareMailbody.get_from_field();
      var to = PrepareMailbody.get_to_field();
      var node_limit = document.getElementById(constants_1.CONST.ID_LIMIT_LENGTH);
      var tinker = new mailbody_tinker_1.MailbodyTinker(parseInt(node_limit.value));
      var converted = tinker.proc(from.value);
      console.log(converted);
      var buttons = PrepareMailbody.list_splitted_contents(converted);
      var btn_group = utils_1.Utils.ce("div", 'btn-group', buttons);
      var node_buttons = document.getElementById(constants_1.CONST.ID_BUTTONS);
      if (node_buttons) {
        Array.from(node_buttons.childNodes).forEach(function (btn) {
          btn.remove();
        });
        node_buttons === null || node_buttons === void 0 ? void 0 : node_buttons.append(btn_group);
      }
      buttons[0].dispatchEvent(new Event('click'));
    }
    // パラグラフごとに表示ボタンを作成する
  }, {
    key: "list_splitted_contents",
    value: function list_splitted_contents(contents) {
      var to_field = PrepareMailbody.get_to_field();
      var paging = 0;
      return contents.map(function (text) {
        paging++;
        var paragraph = utils_1.Utils.ce("input", "btn  btn-secondary", [], "", {
          'type': 'button',
          'value': "page ".concat(paging)
        });
        paragraph.addEventListener("click", function (event) {
          to_field.value = text;
          PrepareMailbody.change_to();
          PrepareMailbody.clear_copybutton(constants_1.CONST.ID_BTN_COPY);
        });
        return paragraph;
      });
    }
  }, {
    key: "convert",
    value: function convert(content) {
      if (content == null) {
        return "";
      }
      var converted;
      var reg_shrink = new RegExp(constants_1.CONST.RE_SHRINK, 'g');
      converted = content.replace(reg_shrink, "$1");
      var reg_url = new RegExp(constants_1.CONST.RE_URL, 'g');
      converted = converted.replace(reg_url, '(URL)');
      console.log(converted.length);
      return converted;
    }
    // fromフィールドの編集イベント
  }, {
    key: "change_from",
    value: function change_from() {
      console.log('change from');
      var from = PrepareMailbody.get_from_field();
      var length = from.value.length;
      var node_info = document.getElementById(constants_1.CONST.ID_LENGTH_FROM);
      if (node_info) {
        node_info.textContent = length.toString();
      }
    }
    // toフィールドの編集イベント
  }, {
    key: "change_to",
    value: function change_to() {
      console.log('change to');
      var to = PrepareMailbody.get_to_field();
      var length = to.value.length;
      var node_info = document.getElementById(constants_1.CONST.ID_LENGTH_TO);
      if (node_info) {
        node_info.textContent = length.toString();
      }
    }
    // FROMフィールドを取得する
  }, {
    key: "get_from_field",
    value: function get_from_field() {
      var from = document.getElementById(constants_1.CONST.ID_TEXT_FROM);
      if (from === null) {
        throw new Error('fromノードが取得できませんでした。');
      }
      return from;
    }
    // TOフィールドを取得する
  }, {
    key: "get_to_field",
    value: function get_to_field() {
      var to = document.getElementById(constants_1.CONST.ID_TEXT_TO);
      if (to === null) {
        throw new Error('toノードが取得できませんでした。');
      }
      return to;
    }
  }, {
    key: "read_to_field",
    value: function read_to_field() {
      var to = PrepareMailbody.get_to_field();
      return to.value;
    }
    // テキストエリアを構築(rowを返す)
  }, {
    key: "create_textarea",
    value: function create_textarea(id) {
      var area = utils_1.Utils.ce('textarea', 'form-control', [], '', {
        id: id
        // , cols: '10'
        ,

        rows: '5'
      });
      area.style.overflowX = "scroll";
      area.classList.add('col');
      area.classList.add('me-2');
      // インプットのテキストエリアをトップボトム移動ボタン
      var btn_input_top = PrepareMailbody.create_scroll_to_top("⬆️", id);
      var btn_input_bottom = PrepareMailbody.create_scroll_to_bottom("⬇️", id);
      btn_input_top.classList.add('row');
      btn_input_top.classList.add('mb-4');
      btn_input_bottom.classList.add('row');
      return utils_1.Utils.ce('div', 'row', [area, utils_1.Utils.ce('div', 'col-2', [btn_input_top, btn_input_bottom])]);
    }
    // 指定したテキストエリアを操作するボタンを構築する(rowを返す)
  }, {
    key: "callback_textarea_button",
    value: function callback_textarea_button(label, target, callback) {
      var btn_scroll = utils_1.Utils.ce('input', constants_1.CONST.STYLE_SCROLL, [], '', {
        type: "button",
        value: label
      });
      // btn_scroll.classList.add(CONST.STYLE_SCROLL)
      btn_scroll.addEventListener("click", function (event) {
        var el = document.getElementById(target);
        if (el) {
          console.log(el);
          callback(el);
        }
      });
      btn_scroll.classList.add("col");
      return utils_1.Utils.ce("div", "row", [btn_scroll]);
    }
    // 指定したテキストエリアをトップにスクロールするボタンを構築する(rowを返す)
  }, {
    key: "create_scroll_to_top",
    value: function create_scroll_to_top(label, target_id) {
      var btn_scroll = PrepareMailbody.callback_textarea_button(label, target_id, function (el) {
        el.scrollTop = 0;
      });
      return btn_scroll;
    }
    // 指定したテキストエリアをボトムにスクロールするボタンを構築する
  }, {
    key: "create_scroll_to_bottom",
    value: function create_scroll_to_bottom(label, target_id) {
      var btn_scroll = PrepareMailbody.callback_textarea_button(label, target_id, function (el) {
        el.scrollTop = el.scrollHeight;
      });
      return btn_scroll;
    }
    // クリップボードにコピーボタン(rowを返す)
  }, {
    key: "create_copybutton",
    value: function create_copybutton(id, label) {
      var style_default = constants_1.CONST.STYLE_COPY_DEFAULT;
      var copybutton = utils_1.Utils.ce('input', 'btn mt-4 mb-2', [], '', {
        id: id,
        type: "button",
        value: label
      });
      copybutton.classList.add(style_default);
      copybutton.addEventListener("click", function (event) {
        var cbtext = PrepareMailbody.read_to_field();
        navigator.clipboard.writeText(cbtext).then(function (data) {
          copybutton.setAttribute('value', 'copied!');
          copybutton.classList.remove(style_default);
          copybutton.classList.add(constants_1.CONST.STYLE_COPY_SUCCESS);
        }).catch(function (e) {
          copybutton.setAttribute('value', 'failed!');
        });
      });
      copybutton.classList.add("col-11");
      return utils_1.Utils.ce("div", "row", [copybutton]);
    }
    // コピーボタンを元に戻す
  }, {
    key: "clear_copybutton",
    value: function clear_copybutton(id) {
      var style_default = constants_1.CONST.STYLE_COPY_DEFAULT;
      var copybutton = document.getElementById(constants_1.CONST.ID_BTN_COPY);
      if (copybutton) {
        copybutton.classList.remove(constants_1.CONST.STYLE_COPY_SUCCESS);
        copybutton.classList.add(style_default);
        copybutton.setAttribute("value", constants_1.CONST.VALUE_BTN_COPY);
      }
    }
  }]);
  return PrepareMailbody;
}();
exports.PrepareMailbody = PrepareMailbody;
},{"./constants":"eKDL","./mailbody_tinker":"wG9V","./utils":"UnXq"}],"y3A0":[function(require,module,exports) {

},{}],"ZCfc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var prepare_1 = require("./prepare");
require("bootstrap/dist/css/bootstrap.min.css");
// import "bootstrap"
/**
 * メルマガ音声化の前処理
 */
(function () {
  'use strict';

  console.log("run script.");
  var converter = new prepare_1.PrepareMailbody("app");
  converter.build();
})();
},{"./prepare":"s1Yh","bootstrap/dist/css/bootstrap.min.css":"y3A0"}]},{},["ZCfc"], null)