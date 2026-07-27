(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kilua-rpc-modules-kilua-rpc-annotations'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kilua-rpc-modules-kilua-rpc-annotations'.");
    }
    globalThis['kilua-rpc-modules-kilua-rpc-annotations'] = factory(typeof globalThis['kilua-rpc-modules-kilua-rpc-annotations'] === 'undefined' ? {} : globalThis['kilua-rpc-modules-kilua-rpc-annotations'], globalThis['kotlin-kotlin-stdlib']);
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
  initMetadataForClass(RpcService, 'RpcService', VOID, VOID, [Annotation]);
  //endregion
  function RpcService(namedRoutes) {
    namedRoutes = namedRoutes === VOID ? false : namedRoutes;
    this.namedRoutes_1 = namedRoutes;
  }
  protoOf(RpcService).get_namedRoutes_5x458a_k$ = function () {
    return this.namedRoutes_1;
  };
  protoOf(RpcService).equals = function (other) {
    if (!(other instanceof RpcService))
      return false;
    var tmp0_other_with_cast = other instanceof RpcService ? other : THROW_CCE();
    if (!(this.namedRoutes_1 === tmp0_other_with_cast.namedRoutes_1))
      return false;
    return true;
  };
  protoOf(RpcService).hashCode = function () {
    return imul(getStringHashCode('namedRoutes'), 127) ^ getBooleanHashCode(this.namedRoutes_1);
  };
  protoOf(RpcService).toString = function () {
    return '@dev.kilua.rpc.annotations.RpcService(' + 'namedRoutes=' + this.namedRoutes_1 + ')';
  };
  return _;
}));

//# sourceMappingURL=kilua-rpc-modules-kilua-rpc-annotations.js.map
