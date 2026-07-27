(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kilua-rpc-modules-kilua-rpc-core.js', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kilua-rpc-modules-kilua-rpc-core.js'), require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kilua-rpc-modules-kilua-rpc-core'] === 'undefined') {
      throw new Error("Error loading module 'kilua-rpc-modules-kilua-rpc-ktor'. Its dependency 'kilua-rpc-modules-kilua-rpc-core' was not found. Please, check whether 'kilua-rpc-modules-kilua-rpc-core' is loaded prior to 'kilua-rpc-modules-kilua-rpc-ktor'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kilua-rpc-modules-kilua-rpc-ktor'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kilua-rpc-modules-kilua-rpc-ktor'.");
    }
    globalThis['kilua-rpc-modules-kilua-rpc-ktor'] = factory(typeof globalThis['kilua-rpc-modules-kilua-rpc-ktor'] === 'undefined' ? {} : globalThis['kilua-rpc-modules-kilua-rpc-ktor'], globalThis['kilua-rpc-modules-kilua-rpc-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_dev_kilua_kilua_rpc_core, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var RpcServiceManagerJs = kotlin_dev_kilua_kilua_rpc_core.$_$.b;
  var protoOf = kotlin_kotlin.$_$.ue;
  var RpcServiceMgr = kotlin_dev_kilua_kilua_rpc_core.$_$.c;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  var VOID = kotlin_kotlin.$_$.d;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(RpcServiceManager, 'RpcServiceManager', VOID, RpcServiceManagerJs, [RpcServiceMgr]);
  //endregion
  function RpcServiceManager(serviceClass) {
    RpcServiceManagerJs.call(this);
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = RpcServiceManager;
  //endregion
  return _;
}));
