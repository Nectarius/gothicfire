(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['seskar-core'] = factory(typeof globalThis['seskar-core'] === 'undefined' ? {} : globalThis['seskar-core']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=seskar-core.js.map
