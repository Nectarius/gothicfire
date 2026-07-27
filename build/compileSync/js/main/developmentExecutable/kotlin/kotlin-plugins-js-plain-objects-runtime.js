(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    globalThis['kotlin-plugins-js-plain-objects-runtime'] = factory(typeof globalThis['kotlin-plugins-js-plain-objects-runtime'] === 'undefined' ? {} : globalThis['kotlin-plugins-js-plain-objects-runtime']);
}(function (_) {
  'use strict';
  //region block: pre-declaration
  //endregion
  return _;
}));

//# sourceMappingURL=kotlin-plugins-js-plain-objects-runtime.js.map
