(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kilua-project-modules-kilua-core-modules'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kilua-project-modules-kilua-core-modules'.");
    }
    globalThis['kilua-project-modules-kilua-core-modules'] = factory(typeof globalThis['kilua-project-modules-kilua-core-modules'] === 'undefined' ? {} : globalThis['kilua-project-modules-kilua-core-modules'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var protoOf = kotlin_kotlin.$_$.ue;
  var initMetadataForInterface = kotlin_kotlin.$_$.vd;
  //endregion
  //region block: pre-declaration
  initMetadataForInterface(ModuleInitializer, 'ModuleInitializer');
  //endregion
  function ModuleInitializer() {
  }
  return _;
}));

//# sourceMappingURL=kilua-project-modules-kilua-core-modules.js.map
