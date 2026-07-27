(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kilua-project-modules-kilua-annotations'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kilua-project-modules-kilua-annotations'.");
    }
    globalThis['kilua-project-modules-kilua-annotations'] = factory(typeof globalThis['kilua-project-modules-kilua-annotations'] === 'undefined' ? {} : globalThis['kilua-project-modules-kilua-annotations'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var VOID = kotlin_kotlin.$_$.d;
  var protoOf = kotlin_kotlin.$_$.ue;
  var THROW_CCE = kotlin_kotlin.$_$.cj;
  var getStringHashCode = kotlin_kotlin.$_$.pd;
  var getBooleanHashCode = kotlin_kotlin.$_$.ld;
  var Annotation = kotlin_kotlin.$_$.gi;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(SimpleHtmlComponent, 'SimpleHtmlComponent', VOID, VOID, [Annotation]);
  //endregion
  function SimpleHtmlComponent(tagName, withText, domPackage) {
    withText = withText === VOID ? false : withText;
    domPackage = domPackage === VOID ? 'web.html' : domPackage;
    this.tagName_1 = tagName;
    this.withText_1 = withText;
    this.domPackage_1 = domPackage;
  }
  protoOf(SimpleHtmlComponent).get_tagName_ocsgis_k$ = function () {
    return this.tagName_1;
  };
  protoOf(SimpleHtmlComponent).get_withText_no36xo_k$ = function () {
    return this.withText_1;
  };
  protoOf(SimpleHtmlComponent).get_domPackage_a34yj7_k$ = function () {
    return this.domPackage_1;
  };
  protoOf(SimpleHtmlComponent).equals = function (other) {
    if (!(other instanceof SimpleHtmlComponent))
      return false;
    var tmp0_other_with_cast = other instanceof SimpleHtmlComponent ? other : THROW_CCE();
    if (!(this.tagName_1 === tmp0_other_with_cast.tagName_1))
      return false;
    if (!(this.withText_1 === tmp0_other_with_cast.withText_1))
      return false;
    if (!(this.domPackage_1 === tmp0_other_with_cast.domPackage_1))
      return false;
    return true;
  };
  protoOf(SimpleHtmlComponent).hashCode = function () {
    var result = imul(getStringHashCode('tagName'), 127) ^ getStringHashCode(this.tagName_1);
    result = result + (imul(getStringHashCode('withText'), 127) ^ getBooleanHashCode(this.withText_1)) | 0;
    result = result + (imul(getStringHashCode('domPackage'), 127) ^ getStringHashCode(this.domPackage_1)) | 0;
    return result;
  };
  protoOf(SimpleHtmlComponent).toString = function () {
    return '@dev.kilua.annotations.SimpleHtmlComponent(' + 'tagName=' + this.tagName_1 + ', ' + 'withText=' + this.withText_1 + ', ' + 'domPackage=' + this.domPackage_1 + ')';
  };
  return _;
}));
