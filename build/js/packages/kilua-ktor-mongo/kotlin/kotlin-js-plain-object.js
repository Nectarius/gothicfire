(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlin-js-plain-object'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlin-js-plain-object'.");
    }
    globalThis['kotlin-js-plain-object'] = factory(typeof globalThis['kotlin-js-plain-object'] === 'undefined' ? {} : globalThis['kotlin-js-plain-object'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var THROW_CCE = kotlin_kotlin.$_$.cj;
  var protoOf = kotlin_kotlin.$_$.ue;
  var Annotation = kotlin_kotlin.$_$.gi;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  var VOID = kotlin_kotlin.$_$.d;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(JsPlainObject, 'JsPlainObject', VOID, VOID, [Annotation]);
  //endregion
  function JsPlainObject() {
  }
  protoOf(JsPlainObject).equals = function (other) {
    if (!(other instanceof JsPlainObject))
      return false;
    other instanceof JsPlainObject || THROW_CCE();
    return true;
  };
  protoOf(JsPlainObject).hashCode = function () {
    return 0;
  };
  protoOf(JsPlainObject).toString = function () {
    return '@kotlinx.js.JsPlainObject(' + ')';
  };
  return _;
}));

//# sourceMappingURL=kotlin-js-plain-object.js.map
