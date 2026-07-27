(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['kilua-rpc-modules-kilua-rpc-types'] = factory(typeof globalThis['kilua-rpc-modules-kilua-rpc-types'] === 'undefined' ? {} : globalThis['kilua-rpc-modules-kilua-rpc-types']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=kilua-rpc-modules-kilua-rpc-types.js.map
