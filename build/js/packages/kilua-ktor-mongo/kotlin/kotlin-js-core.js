(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlin-js-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlin-js-core'.");
    }
    globalThis['kotlin-js-core'] = factory(typeof globalThis['kotlin-js-core'] === 'undefined' ? {} : globalThis['kotlin-js-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var protoOf = kotlin_kotlin.$_$.ue;
  var toByte = kotlin_kotlin.$_$.ve;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.r;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.s;
  var toShort = kotlin_kotlin.$_$.we;
  var initMetadataForObject = kotlin_kotlin.$_$.xd;
  var THROW_CCE = kotlin_kotlin.$_$.cj;
  var Annotation = kotlin_kotlin.$_$.gi;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  var VOID = kotlin_kotlin.$_$.d;
  //endregion
  //region block: pre-declaration
  initMetadataForObject(JsNumbers, 'JsNumbers');
  initMetadataForObject(JsStrings, 'JsStrings');
  initMetadataForClass(InternalApi, 'InternalApi', VOID, VOID, [Annotation]);
  //endregion
  function JsNumbers() {
    JsNumbers_instance = this;
  }
  protoOf(JsNumbers).toKotlinFloat_i5kpx2_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(JsNumbers).toJsFloat_2jww32_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(JsNumbers).toKotlinDouble_r0yeyd_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(JsNumbers).toJsDouble_8kzhfn_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(JsNumbers).toKotlinByte_7ca8xm_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(JsNumbers).toJsByte_514rjy_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(JsNumbers).toKotlinUByte_yybm94_k$ = function (_this__u8e3s4) {
    // Inline function 'kotlin.toUByte' call
    return _UByte___init__impl__g9hnc4(toByte(_this__u8e3s4));
  };
  protoOf(JsNumbers).toJsUByte_p8qn1a_k$ = function (_this__u8e3s4) {
    // Inline function 'kotlin.UByte.toShort' call
    // Inline function 'kotlin.experimental.and' call
    var this_0 = _UByte___get_data__impl__jof9qr(_this__u8e3s4);
    return toShort(this_0 & 255);
  };
  protoOf(JsNumbers).toKotlinShort_n7i5hy_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(JsNumbers).toJsShort_7lubny_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(JsNumbers).toKotlinInt_rz2id3_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(JsNumbers).toJsInt_3g7z5t_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  var JsNumbers_instance;
  function JsNumbers_getInstance() {
    if (JsNumbers_instance == null)
      new JsNumbers();
    return JsNumbers_instance;
  }
  function unsafeJso() {
    return {};
  }
  function unsafeCast(value) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return value;
  }
  function unsafeCast_0(value) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return value;
  }
  function unsafeCast_1(value) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return value;
  }
  function unsafeCast_2(value) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return value;
  }
  function JsStrings() {
    JsStrings_instance = this;
  }
  protoOf(JsStrings).toKotlinString_os9fsx_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  var JsStrings_instance;
  function JsStrings_getInstance() {
    if (JsStrings_instance == null)
      new JsStrings();
    return JsStrings_instance;
  }
  function InternalApi() {
  }
  protoOf(InternalApi).equals = function (other) {
    if (!(other instanceof InternalApi))
      return false;
    other instanceof InternalApi || THROW_CCE();
    return true;
  };
  protoOf(InternalApi).hashCode = function () {
    return 0;
  };
  protoOf(InternalApi).toString = function () {
    return '@js.internal.InternalApi(' + ')';
  };
  function upcast(_this__u8e3s4) {
    return _this__u8e3s4;
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = JsNumbers_getInstance;
  _.$_$.b = JsStrings_getInstance;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlin-js-core.js.map
