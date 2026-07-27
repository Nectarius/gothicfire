(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-serialization-kotlinx-serialization-core.js', './kilua-rpc-modules-kilua-rpc-core.js', './kilua-rpc-modules-kilua-rpc-ktor.js', './kotlinx-coroutines-core.js', './androidx-compose-runtime-runtime.js', './kilua-project-kilua.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kilua-rpc-modules-kilua-rpc-core.js'), require('./kilua-rpc-modules-kilua-rpc-ktor.js'), require('./kotlinx-coroutines-core.js'), require('./androidx-compose-runtime-runtime.js'), require('./kilua-project-kilua.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kilua-ktor-mongo'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kilua-ktor-mongo'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'kilua-ktor-mongo'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'kilua-ktor-mongo'.");
    }
    if (typeof globalThis['kilua-rpc-modules-kilua-rpc-core'] === 'undefined') {
      throw new Error("Error loading module 'kilua-ktor-mongo'. Its dependency 'kilua-rpc-modules-kilua-rpc-core' was not found. Please, check whether 'kilua-rpc-modules-kilua-rpc-core' is loaded prior to 'kilua-ktor-mongo'.");
    }
    if (typeof globalThis['kilua-rpc-modules-kilua-rpc-ktor'] === 'undefined') {
      throw new Error("Error loading module 'kilua-ktor-mongo'. Its dependency 'kilua-rpc-modules-kilua-rpc-ktor' was not found. Please, check whether 'kilua-rpc-modules-kilua-rpc-ktor' is loaded prior to 'kilua-ktor-mongo'.");
    }
    if (typeof globalThis['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'kilua-ktor-mongo'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'kilua-ktor-mongo'.");
    }
    if (typeof globalThis['androidx-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'kilua-ktor-mongo'. Its dependency 'androidx-compose-runtime-runtime' was not found. Please, check whether 'androidx-compose-runtime-runtime' is loaded prior to 'kilua-ktor-mongo'.");
    }
    if (typeof globalThis['kilua-project-kilua'] === 'undefined') {
      throw new Error("Error loading module 'kilua-ktor-mongo'. Its dependency 'kilua-project-kilua' was not found. Please, check whether 'kilua-project-kilua' is loaded prior to 'kilua-ktor-mongo'.");
    }
    globalThis['kilua-ktor-mongo'] = factory(typeof globalThis['kilua-ktor-mongo'] === 'undefined' ? {} : globalThis['kilua-ktor-mongo'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kilua-rpc-modules-kilua-rpc-core'], globalThis['kilua-rpc-modules-kilua-rpc-ktor'], globalThis['kotlinx-coroutines-core'], globalThis['androidx-compose-runtime-runtime'], globalThis['kilua-project-kilua']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_dev_kilua_kilua_rpc_core, kotlin_dev_kilua_kilua_rpc_ktor, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_androidx_compose_runtime_runtime, kotlin_dev_kilua_kilua) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var KFunctionImpl = kotlin_kotlin.$_$.hf;
  var protoOf = kotlin_kotlin.$_$.ue;
  var THROW_CCE = kotlin_kotlin.$_$.cj;
  var isInterface = kotlin_kotlin.$_$.ge;
  var initMetadataForFunctionReference = kotlin_kotlin.$_$.ud;
  var VOID = kotlin_kotlin.$_$.d;
  var constructCallableReference = kotlin_kotlin.$_$.gd;
  var CoroutineImpl = kotlin_kotlin.$_$.nb;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.xa;
  var getKClass = kotlin_kotlin.$_$.lf;
  var arrayOf = kotlin_kotlin.$_$.qj;
  var createKType = kotlin_kotlin.$_$.jf;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v2;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l2;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.td;
  var KtList = kotlin_kotlin.$_$.y5;
  var createInvariantKTypeProjection = kotlin_kotlin.$_$.if;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.l2;
  var listOf = kotlin_kotlin.$_$.w8;
  var listOf_0 = kotlin_kotlin.$_$.v8;
  var RpcAgent = kotlin_dev_kilua_kilua_rpc_core.$_$.a;
  var Unit_getInstance = kotlin_kotlin.$_$.w2;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  var KSuspendFunction1 = kotlin_kotlin.$_$.rf;
  var SuspendFunction1 = kotlin_kotlin.$_$.ob;
  var KSuspendFunction3 = kotlin_kotlin.$_$.tf;
  var SuspendFunction3 = kotlin_kotlin.$_$.qb;
  var KSuspendFunction2 = kotlin_kotlin.$_$.sf;
  var SuspendFunction2 = kotlin_kotlin.$_$.pb;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.c3;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.k4;
  var RpcServiceManager = kotlin_dev_kilua_kilua_rpc_ktor.$_$.a;
  var HttpMethod_POST_getInstance = kotlin_dev_kilua_kilua_rpc_core.$_$.d;
  var initMetadataForObject = kotlin_kotlin.$_$.xd;
  var initMetadataForCompanion = kotlin_kotlin.$_$.sd;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var Long = kotlin_kotlin.$_$.vi;
  var UnknownFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var StringSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var LongSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u1;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d2;
  var objectCreate = kotlin_kotlin.$_$.te;
  var getStringHashCode = kotlin_kotlin.$_$.pd;
  var equalsLong = kotlin_kotlin.$_$.gc;
  var makeAssociatedObjectMapES5 = kotlin_kotlin.$_$.b;
  var SerializableWith = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o2;
  var initMetadataForInterface = kotlin_kotlin.$_$.vd;
  var KMutableProperty0 = kotlin_kotlin.$_$.nf;
  var getLocalDelegateReference = kotlin_kotlin.$_$.md;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.t;
  var Exception = kotlin_kotlin.$_$.ri;
  var initMetadataForLambda = kotlin_kotlin.$_$.wd;
  var sourceInformation = kotlin_androidx_compose_runtime_runtime.$_$.s;
  var traceEventStart = kotlin_androidx_compose_runtime_runtime.$_$.u;
  var isTraceInProgress = kotlin_androidx_compose_runtime_runtime.$_$.m;
  var textNode = kotlin_dev_kilua_kilua.$_$.n;
  var traceEventEnd = kotlin_androidx_compose_runtime_runtime.$_$.t;
  var a = kotlin_dev_kilua_kilua.$_$.d;
  var rememberComposableLambda = kotlin_androidx_compose_runtime_runtime.$_$.b;
  var Companion_getInstance = kotlin_androidx_compose_runtime_runtime.$_$.z;
  var span = kotlin_dev_kilua_kilua.$_$.m;
  var div = kotlin_dev_kilua_kilua.$_$.f;
  var sourceInformationMarkerStart = kotlin_androidx_compose_runtime_runtime.$_$.r;
  var sourceInformationMarkerEnd = kotlin_androidx_compose_runtime_runtime.$_$.q;
  var button = kotlin_dev_kilua_kilua.$_$.e;
  var plus = kotlin_kotlin.$_$.h9;
  var isBlank = kotlin_kotlin.$_$.kg;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.y;
  var text = kotlin_dev_kilua_kilua.$_$.c;
  var textArea = kotlin_dev_kilua_kilua.$_$.b;
  var h3 = kotlin_dev_kilua_kilua.$_$.h;
  var mutableStateOf = kotlin_androidx_compose_runtime_runtime.$_$.p;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.d3;
  var h4 = kotlin_dev_kilua_kilua.$_$.i;
  var p = kotlin_dev_kilua_kilua.$_$.k;
  var rawHtml = kotlin_dev_kilua_kilua.$_$.l;
  var emptyList = kotlin_kotlin.$_$.y7;
  var nav = kotlin_dev_kilua_kilua.$_$.j;
  var Application = kotlin_dev_kilua_kilua.$_$.o;
  var toString = kotlin_kotlin.$_$.xe;
  var MainScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v;
  var composableLambdaInstance = kotlin_androidx_compose_runtime_runtime.$_$.a;
  var root = kotlin_dev_kilua_kilua.$_$.a;
  var startApplication = kotlin_dev_kilua_kilua.$_$.q;
  var h2 = kotlin_dev_kilua_kilua.$_$.g;
  var dev_kilua_Application$stableprop_getter = kotlin_dev_kilua_kilua.$_$.p;
  //endregion
  //region block: pre-declaration
  initMetadataForFunctionReference(AppService$getCurrentUser$ref, KFunctionImpl, VOID, [1]);
  initMetadataForFunctionReference(AppService$getNotes$ref, KFunctionImpl, VOID, [1]);
  initMetadataForFunctionReference(AppService$saveNote$ref, KFunctionImpl, VOID, [3]);
  initMetadataForFunctionReference(AppService$deleteNote$ref, KFunctionImpl, VOID, [2]);
  initMetadataForFunctionReference(AppService$getDiscussions$ref, KFunctionImpl, VOID, [1]);
  initMetadataForFunctionReference(AppService$postDiscussion$ref, KFunctionImpl, VOID, [2]);
  initMetadataForCoroutine($getCurrentUserCOROUTINE$, CoroutineImpl);
  initMetadataForCoroutine($getNotesCOROUTINE$, CoroutineImpl);
  initMetadataForCoroutine($saveNoteCOROUTINE$, CoroutineImpl);
  initMetadataForCoroutine($deleteNoteCOROUTINE$, CoroutineImpl);
  initMetadataForCoroutine($getDiscussionsCOROUTINE$, CoroutineImpl);
  initMetadataForCoroutine($postDiscussionCOROUTINE$, CoroutineImpl);
  initMetadataForInterface(AppService, 'AppService', VOID, VOID, VOID, [0, 2, 1]);
  initMetadataForClass(AppServiceImpl, 'AppServiceImpl', AppServiceImpl, RpcAgent, [AppService], [0, 2, 1]);
  initMetadataForFunctionReference(AppService$getCurrentUser$ref_1, KFunctionImpl, VOID, [1]);
  initMetadataForFunctionReference(AppService$getNotes$ref_1, KFunctionImpl, VOID, [1]);
  initMetadataForFunctionReference(AppService$saveNote$ref_1, KFunctionImpl, VOID, [3]);
  initMetadataForFunctionReference(AppService$deleteNote$ref_1, KFunctionImpl, VOID, [2]);
  initMetadataForFunctionReference(AppService$getDiscussions$ref_1, KFunctionImpl, VOID, [1]);
  initMetadataForFunctionReference(AppService$postDiscussion$ref_1, KFunctionImpl, VOID, [2]);
  initMetadataForObject(AppServiceManager, 'AppServiceManager', VOID, RpcServiceManager);
  initMetadataForCompanion(Companion);
  initMetadataForObject($serializer, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(User, 'User', VOID, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, $serializer_getInstance]));
  initMetadataForCompanion(Companion_0);
  initMetadataForObject($serializer_0, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Note, 'Note', VOID, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, $serializer_getInstance_0]));
  initMetadataForCompanion(Companion_1);
  initMetadataForObject($serializer_1, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Discussion, 'Discussion', VOID, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, $serializer_getInstance_1]));
  initMetadataForCompanion(Companion_2);
  initMetadataForObject($serializer_2, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(UserSession, 'UserSession', VOID, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, $serializer_getInstance_2]));
  initMetadataForLambda(App$start$lambda$slambda, CoroutineImpl, VOID, [1]);
  initMetadataForLambda(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda, CoroutineImpl, VOID, [1]);
  initMetadataForLambda(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_1, CoroutineImpl, VOID, [1]);
  initMetadataForLambda(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_3, CoroutineImpl, VOID, [1]);
  initMetadataForClass(App, 'App', App, Application);
  initMetadataForObject(ComposableSingletons$AppKt, 'ComposableSingletons$AppKt');
  initMetadataForObject(ComposableSingletons$TestKt, 'ComposableSingletons$TestKt');
  //endregion
  var rpc_AppServiceImpl$stable;
  function AppService$getCurrentUser$ref() {
    KFunctionImpl.call(this, 1, 2, 'rpc/AppService.getCurrentUser|getCurrentUser(){}[0]');
  }
  protoOf(AppService$getCurrentUser$ref).invoke_ydp2uv_k$ = function (p0, $completion) {
    return p0.getCurrentUser_zcvj6v_k$($completion);
  };
  protoOf(AppService$getCurrentUser$ref).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_ydp2uv_k$((!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AppService$getCurrentUser$ref).get_name_woqyms_k$ = function () {
    return 'getCurrentUser';
  };
  function AppService$getCurrentUser$ref_0() {
    var i = new AppService$getCurrentUser$ref();
    return constructCallableReference(function (p0, $completion) {
      return i.invoke_ydp2uv_k$(p0, $completion);
    }, 1, 1, 'rpc/AppService.getCurrentUser|getCurrentUser(){}[0]', 'getCurrentUser');
  }
  function AppService$getNotes$ref() {
    KFunctionImpl.call(this, 1, 2, 'rpc/AppService.getNotes|getNotes(){}[0]');
  }
  protoOf(AppService$getNotes$ref).invoke_84m64g_k$ = function (p0, $completion) {
    return p0.getNotes_jjy5rh_k$($completion);
  };
  protoOf(AppService$getNotes$ref).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_84m64g_k$((!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AppService$getNotes$ref).get_name_woqyms_k$ = function () {
    return 'getNotes';
  };
  function AppService$getNotes$ref_0() {
    var i = new AppService$getNotes$ref();
    return constructCallableReference(function (p0, $completion) {
      return i.invoke_84m64g_k$(p0, $completion);
    }, 1, 1, 'rpc/AppService.getNotes|getNotes(){}[0]', 'getNotes');
  }
  function AppService$saveNote$ref() {
    KFunctionImpl.call(this, 1, 4, 'rpc/AppService.saveNote|saveNote(kotlin.String;kotlin.String){}[0]');
  }
  protoOf(AppService$saveNote$ref).invoke_heiezi_k$ = function (p0, p1, p2, $completion) {
    return p0.saveNote_i1jnx_k$(p1, p2, $completion);
  };
  protoOf(AppService$saveNote$ref).invoke_ihdh7y_k$ = function (p1, p2, p3, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE();
    var tmp_0 = (!(p2 == null) ? typeof p2 === 'string' : false) ? p2 : THROW_CCE();
    return this.invoke_heiezi_k$(tmp, tmp_0, (!(p3 == null) ? typeof p3 === 'string' : false) ? p3 : THROW_CCE(), $completion);
  };
  protoOf(AppService$saveNote$ref).get_name_woqyms_k$ = function () {
    return 'saveNote';
  };
  function AppService$saveNote$ref_0() {
    var i = new AppService$saveNote$ref();
    return constructCallableReference(function (p0, p1, p2, $completion) {
      return i.invoke_heiezi_k$(p0, p1, p2, $completion);
    }, 3, 1, 'rpc/AppService.saveNote|saveNote(kotlin.String;kotlin.String){}[0]', 'saveNote');
  }
  function AppService$deleteNote$ref() {
    KFunctionImpl.call(this, 1, 3, 'rpc/AppService.deleteNote|deleteNote(kotlin.String){}[0]');
  }
  protoOf(AppService$deleteNote$ref).invoke_w7xcbo_k$ = function (p0, p1, $completion) {
    return p0.deleteNote_pkm8ir_k$(p1, $completion);
  };
  protoOf(AppService$deleteNote$ref).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE();
    return this.invoke_w7xcbo_k$(tmp, (!(p2 == null) ? typeof p2 === 'string' : false) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(AppService$deleteNote$ref).get_name_woqyms_k$ = function () {
    return 'deleteNote';
  };
  function AppService$deleteNote$ref_0() {
    var i = new AppService$deleteNote$ref();
    return constructCallableReference(function (p0, p1, $completion) {
      return i.invoke_w7xcbo_k$(p0, p1, $completion);
    }, 2, 1, 'rpc/AppService.deleteNote|deleteNote(kotlin.String){}[0]', 'deleteNote');
  }
  function AppService$getDiscussions$ref() {
    KFunctionImpl.call(this, 1, 2, 'rpc/AppService.getDiscussions|getDiscussions(){}[0]');
  }
  protoOf(AppService$getDiscussions$ref).invoke_hai5ze_k$ = function (p0, $completion) {
    return p0.getDiscussions_1st9s1_k$($completion);
  };
  protoOf(AppService$getDiscussions$ref).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_hai5ze_k$((!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AppService$getDiscussions$ref).get_name_woqyms_k$ = function () {
    return 'getDiscussions';
  };
  function AppService$getDiscussions$ref_0() {
    var i = new AppService$getDiscussions$ref();
    return constructCallableReference(function (p0, $completion) {
      return i.invoke_hai5ze_k$(p0, $completion);
    }, 1, 1, 'rpc/AppService.getDiscussions|getDiscussions(){}[0]', 'getDiscussions');
  }
  function AppService$postDiscussion$ref() {
    KFunctionImpl.call(this, 1, 3, 'rpc/AppService.postDiscussion|postDiscussion(kotlin.String){}[0]');
  }
  protoOf(AppService$postDiscussion$ref).invoke_qyvycq_k$ = function (p0, p1, $completion) {
    return p0.postDiscussion_v4gfq8_k$(p1, $completion);
  };
  protoOf(AppService$postDiscussion$ref).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE();
    return this.invoke_qyvycq_k$(tmp, (!(p2 == null) ? typeof p2 === 'string' : false) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(AppService$postDiscussion$ref).get_name_woqyms_k$ = function () {
    return 'postDiscussion';
  };
  function AppService$postDiscussion$ref_0() {
    var i = new AppService$postDiscussion$ref();
    return constructCallableReference(function (p0, p1, $completion) {
      return i.invoke_qyvycq_k$(p0, p1, $completion);
    }, 2, 1, 'rpc/AppService.postDiscussion|postDiscussion(kotlin.String){}[0]', 'postDiscussion');
  }
  function $getCurrentUserCOROUTINE$(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getCurrentUserCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp0 = this._this__u8e3s4__1;
            var tmp2 = AppService$getCurrentUser$ref_0();
            this.this0__1 = tmp0;
            var _destruct__k2r9zo = this.this0__1.get_serviceManager_dgl2dd_k$().requireCall_qm9pb8_k$(tmp2);
            var url = _destruct__k2r9zo.component1_7eebsc_k$();
            var method = _destruct__k2r9zo.component2_7eebsb_k$();
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this0__1.get_callAgent_99050i_k$().jsonRpcCall$default_ms0kld_k$(url, VOID, method, this.this0__1.get_requestFilter_fo3cfy_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var result = suspendResult;
            var this_0 = this.this0__1.get_json_woos35_k$().get_serializersModule_piitvg_k$();
            var this_1 = serializer(this_0, createKType(getKClass(UserSession), arrayOf([]), false));
            var serializer_0 = isInterface(this_1, KSerializer) ? this_1 : THROW_CCE();
            return this.this0__1.get_json_woos35_k$().decodeFromString_jwu9sq_k$(serializer_0, result);
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $getNotesCOROUTINE$(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getNotesCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp0 = this._this__u8e3s4__1;
            var tmp2 = AppService$getNotes$ref_0();
            this.this0__1 = tmp0;
            var _destruct__k2r9zo = this.this0__1.get_serviceManager_dgl2dd_k$().requireCall_qm9pb8_k$(tmp2);
            var url = _destruct__k2r9zo.component1_7eebsc_k$();
            var method = _destruct__k2r9zo.component2_7eebsb_k$();
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this0__1.get_callAgent_99050i_k$().jsonRpcCall$default_ms0kld_k$(url, VOID, method, this.this0__1.get_requestFilter_fo3cfy_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var result = suspendResult;
            var this_0 = this.this0__1.get_json_woos35_k$().get_serializersModule_piitvg_k$();
            var this_1 = serializer(this_0, createKType(getKClass(KtList), arrayOf([createInvariantKTypeProjection(createKType(getKClass(Note), arrayOf([]), false))]), false));
            var serializer_0 = isInterface(this_1, KSerializer) ? this_1 : THROW_CCE();
            return this.this0__1.get_json_woos35_k$().decodeFromString_jwu9sq_k$(serializer_0, result);
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $saveNoteCOROUTINE$(_this__u8e3s4, title, content, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.title_1 = title;
    this.content_1 = content;
  }
  protoOf($saveNoteCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp0 = this._this__u8e3s4__1;
            var tmp2 = AppService$saveNote$ref_0();
            var tmp4 = this.title_1;
            var tmp6 = this.content_1;
            this.this0__1 = tmp0;
            var this_0 = this.this0__1.get_json_woos35_k$();
            var this_1 = this_0.get_serializersModule_piitvg_k$();
            var this_2 = serializer(this_1, createKType(PrimitiveClasses_getInstance().get_stringClass_bik2gy_k$(), arrayOf([]), false));
            var data1 = this_0.encodeToString_k0apqx_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), tmp4);
            var this_3 = this.this0__1.get_json_woos35_k$();
            var this_4 = this_3.get_serializersModule_piitvg_k$();
            var this_5 = serializer(this_4, createKType(PrimitiveClasses_getInstance().get_stringClass_bik2gy_k$(), arrayOf([]), false));
            var data2 = this_3.encodeToString_k0apqx_k$(isInterface(this_5, KSerializer) ? this_5 : THROW_CCE(), tmp6);
            var _destruct__k2r9zo = this.this0__1.get_serviceManager_dgl2dd_k$().requireCall_qm9pb8_k$(tmp2);
            var url = _destruct__k2r9zo.component1_7eebsc_k$();
            var method = _destruct__k2r9zo.component2_7eebsb_k$();
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this0__1.get_callAgent_99050i_k$().jsonRpcCall_3kt90y_k$(url, listOf([data1, data2]), method, this.this0__1.get_requestFilter_fo3cfy_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var result = suspendResult;
            var this_6 = this.this0__1.get_json_woos35_k$().get_serializersModule_piitvg_k$();
            var this_7 = serializer(this_6, createKType(getKClass(Note), arrayOf([]), false));
            var serializer_0 = isInterface(this_7, KSerializer) ? this_7 : THROW_CCE();
            return this.this0__1.get_json_woos35_k$().decodeFromString_jwu9sq_k$(serializer_0, result);
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $deleteNoteCOROUTINE$(_this__u8e3s4, noteId, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.noteId_1 = noteId;
  }
  protoOf($deleteNoteCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp0 = this._this__u8e3s4__1;
            var tmp2 = AppService$deleteNote$ref_0();
            var tmp4 = this.noteId_1;
            this.this0__1 = tmp0;
            var this_0 = this.this0__1.get_json_woos35_k$();
            var this_1 = this_0.get_serializersModule_piitvg_k$();
            var this_2 = serializer(this_1, createKType(PrimitiveClasses_getInstance().get_stringClass_bik2gy_k$(), arrayOf([]), false));
            var data = this_0.encodeToString_k0apqx_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), tmp4);
            var _destruct__k2r9zo = this.this0__1.get_serviceManager_dgl2dd_k$().requireCall_qm9pb8_k$(tmp2);
            var url = _destruct__k2r9zo.component1_7eebsc_k$();
            var method = _destruct__k2r9zo.component2_7eebsb_k$();
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this0__1.get_callAgent_99050i_k$().jsonRpcCall_3kt90y_k$(url, listOf_0(data), method, this.this0__1.get_requestFilter_fo3cfy_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var result = suspendResult;
            var this_3 = this.this0__1.get_json_woos35_k$().get_serializersModule_piitvg_k$();
            var this_4 = serializer(this_3, createKType(PrimitiveClasses_getInstance().get_booleanClass_d285fr_k$(), arrayOf([]), false));
            var serializer_0 = isInterface(this_4, KSerializer) ? this_4 : THROW_CCE();
            return this.this0__1.get_json_woos35_k$().decodeFromString_jwu9sq_k$(serializer_0, result);
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $getDiscussionsCOROUTINE$(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($getDiscussionsCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp0 = this._this__u8e3s4__1;
            var tmp2 = AppService$getDiscussions$ref_0();
            this.this0__1 = tmp0;
            var _destruct__k2r9zo = this.this0__1.get_serviceManager_dgl2dd_k$().requireCall_qm9pb8_k$(tmp2);
            var url = _destruct__k2r9zo.component1_7eebsc_k$();
            var method = _destruct__k2r9zo.component2_7eebsb_k$();
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this0__1.get_callAgent_99050i_k$().jsonRpcCall$default_ms0kld_k$(url, VOID, method, this.this0__1.get_requestFilter_fo3cfy_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var result = suspendResult;
            var this_0 = this.this0__1.get_json_woos35_k$().get_serializersModule_piitvg_k$();
            var this_1 = serializer(this_0, createKType(getKClass(KtList), arrayOf([createInvariantKTypeProjection(createKType(getKClass(Discussion), arrayOf([]), false))]), false));
            var serializer_0 = isInterface(this_1, KSerializer) ? this_1 : THROW_CCE();
            return this.this0__1.get_json_woos35_k$().decodeFromString_jwu9sq_k$(serializer_0, result);
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $postDiscussionCOROUTINE$(_this__u8e3s4, content, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.content_1 = content;
  }
  protoOf($postDiscussionCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            var tmp0 = this._this__u8e3s4__1;
            var tmp2 = AppService$postDiscussion$ref_0();
            var tmp4 = this.content_1;
            this.this0__1 = tmp0;
            var this_0 = this.this0__1.get_json_woos35_k$();
            var this_1 = this_0.get_serializersModule_piitvg_k$();
            var this_2 = serializer(this_1, createKType(PrimitiveClasses_getInstance().get_stringClass_bik2gy_k$(), arrayOf([]), false));
            var data = this_0.encodeToString_k0apqx_k$(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), tmp4);
            var _destruct__k2r9zo = this.this0__1.get_serviceManager_dgl2dd_k$().requireCall_qm9pb8_k$(tmp2);
            var url = _destruct__k2r9zo.component1_7eebsc_k$();
            var method = _destruct__k2r9zo.component2_7eebsb_k$();
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this0__1.get_callAgent_99050i_k$().jsonRpcCall_3kt90y_k$(url, listOf_0(data), method, this.this0__1.get_requestFilter_fo3cfy_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var result = suspendResult;
            var this_3 = this.this0__1.get_json_woos35_k$().get_serializersModule_piitvg_k$();
            var this_4 = serializer(this_3, createKType(getKClass(Discussion), arrayOf([]), false));
            var serializer_0 = isInterface(this_4, KSerializer) ? this_4 : THROW_CCE();
            return this.this0__1.get_json_woos35_k$().decodeFromString_jwu9sq_k$(serializer_0, result);
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function AppServiceImpl(serializersModules, requestFilter) {
    serializersModules = serializersModules === VOID ? null : serializersModules;
    requestFilter = requestFilter === VOID ? null : requestFilter;
    RpcAgent.call(this, AppServiceManager_getInstance(), serializersModules, requestFilter);
  }
  protoOf(AppServiceImpl).getCurrentUser_zcvj6v_k$ = function ($completion) {
    var tmp = new $getCurrentUserCOROUTINE$(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(AppServiceImpl).getNotes_jjy5rh_k$ = function ($completion) {
    var tmp = new $getNotesCOROUTINE$(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(AppServiceImpl).saveNote_i1jnx_k$ = function (title, content, $completion) {
    var tmp = new $saveNoteCOROUTINE$(this, title, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(AppServiceImpl).deleteNote_pkm8ir_k$ = function (noteId, $completion) {
    var tmp = new $deleteNoteCOROUTINE$(this, noteId, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(AppServiceImpl).getDiscussions_1st9s1_k$ = function ($completion) {
    var tmp = new $getDiscussionsCOROUTINE$(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(AppServiceImpl).postDiscussion_v4gfq8_k$ = function (content, $completion) {
    var tmp = new $postDiscussionCOROUTINE$(this, content, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  function rpc_AppServiceImpl$stableprop_getter() {
    return rpc_AppServiceImpl$stable;
  }
  function registerRpcServiceExceptions() {
  }
  function getAllServiceManagers() {
    return listOf_0(AppServiceManager_getInstance());
  }
  function getServiceManagers(kclass) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(kclass.length);
    var inductionVariable = 0;
    var last = kclass.length;
    while (inductionVariable < last) {
      var item = kclass[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      var tmp;
      if (item.equals(getKClass(AppService))) {
        tmp = AppServiceManager_getInstance();
      } else {
        throw IllegalArgumentException_init_$Create$('Unknown service ' + item.get_simpleName_r6f8py_k$());
      }
      var tmp$ret$2 = tmp;
      destination.add_utx5q5_k$(tmp$ret$2);
    }
    return destination;
  }
  var rpc_AppServiceManager$stable;
  function AppService$getCurrentUser$ref_1() {
    KFunctionImpl.call(this, 1, 2, 'rpc/AppService.getCurrentUser|getCurrentUser(){}[0]');
  }
  protoOf(AppService$getCurrentUser$ref_1).invoke_ydp2uv_k$ = function (p0, $completion) {
    return p0.getCurrentUser_zcvj6v_k$($completion);
  };
  protoOf(AppService$getCurrentUser$ref_1).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_ydp2uv_k$((!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AppService$getCurrentUser$ref_1).get_name_woqyms_k$ = function () {
    return 'getCurrentUser';
  };
  function AppService$getCurrentUser$ref_2() {
    var i = new AppService$getCurrentUser$ref_1();
    return constructCallableReference(function (p0, $completion) {
      return i.invoke_ydp2uv_k$(p0, $completion);
    }, 1, 1, 'rpc/AppService.getCurrentUser|getCurrentUser(){}[0]', 'getCurrentUser');
  }
  function AppService$getNotes$ref_1() {
    KFunctionImpl.call(this, 1, 2, 'rpc/AppService.getNotes|getNotes(){}[0]');
  }
  protoOf(AppService$getNotes$ref_1).invoke_84m64g_k$ = function (p0, $completion) {
    return p0.getNotes_jjy5rh_k$($completion);
  };
  protoOf(AppService$getNotes$ref_1).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_84m64g_k$((!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AppService$getNotes$ref_1).get_name_woqyms_k$ = function () {
    return 'getNotes';
  };
  function AppService$getNotes$ref_2() {
    var i = new AppService$getNotes$ref_1();
    return constructCallableReference(function (p0, $completion) {
      return i.invoke_84m64g_k$(p0, $completion);
    }, 1, 1, 'rpc/AppService.getNotes|getNotes(){}[0]', 'getNotes');
  }
  function AppService$saveNote$ref_1() {
    KFunctionImpl.call(this, 1, 4, 'rpc/AppService.saveNote|saveNote(kotlin.String;kotlin.String){}[0]');
  }
  protoOf(AppService$saveNote$ref_1).invoke_heiezi_k$ = function (p0, p1, p2, $completion) {
    return p0.saveNote_i1jnx_k$(p1, p2, $completion);
  };
  protoOf(AppService$saveNote$ref_1).invoke_ihdh7y_k$ = function (p1, p2, p3, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE();
    var tmp_0 = (!(p2 == null) ? typeof p2 === 'string' : false) ? p2 : THROW_CCE();
    return this.invoke_heiezi_k$(tmp, tmp_0, (!(p3 == null) ? typeof p3 === 'string' : false) ? p3 : THROW_CCE(), $completion);
  };
  protoOf(AppService$saveNote$ref_1).get_name_woqyms_k$ = function () {
    return 'saveNote';
  };
  function AppService$saveNote$ref_2() {
    var i = new AppService$saveNote$ref_1();
    return constructCallableReference(function (p0, p1, p2, $completion) {
      return i.invoke_heiezi_k$(p0, p1, p2, $completion);
    }, 3, 1, 'rpc/AppService.saveNote|saveNote(kotlin.String;kotlin.String){}[0]', 'saveNote');
  }
  function AppService$deleteNote$ref_1() {
    KFunctionImpl.call(this, 1, 3, 'rpc/AppService.deleteNote|deleteNote(kotlin.String){}[0]');
  }
  protoOf(AppService$deleteNote$ref_1).invoke_w7xcbo_k$ = function (p0, p1, $completion) {
    return p0.deleteNote_pkm8ir_k$(p1, $completion);
  };
  protoOf(AppService$deleteNote$ref_1).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE();
    return this.invoke_w7xcbo_k$(tmp, (!(p2 == null) ? typeof p2 === 'string' : false) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(AppService$deleteNote$ref_1).get_name_woqyms_k$ = function () {
    return 'deleteNote';
  };
  function AppService$deleteNote$ref_2() {
    var i = new AppService$deleteNote$ref_1();
    return constructCallableReference(function (p0, p1, $completion) {
      return i.invoke_w7xcbo_k$(p0, p1, $completion);
    }, 2, 1, 'rpc/AppService.deleteNote|deleteNote(kotlin.String){}[0]', 'deleteNote');
  }
  function AppService$getDiscussions$ref_1() {
    KFunctionImpl.call(this, 1, 2, 'rpc/AppService.getDiscussions|getDiscussions(){}[0]');
  }
  protoOf(AppService$getDiscussions$ref_1).invoke_hai5ze_k$ = function (p0, $completion) {
    return p0.getDiscussions_1st9s1_k$($completion);
  };
  protoOf(AppService$getDiscussions$ref_1).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_hai5ze_k$((!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AppService$getDiscussions$ref_1).get_name_woqyms_k$ = function () {
    return 'getDiscussions';
  };
  function AppService$getDiscussions$ref_2() {
    var i = new AppService$getDiscussions$ref_1();
    return constructCallableReference(function (p0, $completion) {
      return i.invoke_hai5ze_k$(p0, $completion);
    }, 1, 1, 'rpc/AppService.getDiscussions|getDiscussions(){}[0]', 'getDiscussions');
  }
  function AppService$postDiscussion$ref_1() {
    KFunctionImpl.call(this, 1, 3, 'rpc/AppService.postDiscussion|postDiscussion(kotlin.String){}[0]');
  }
  protoOf(AppService$postDiscussion$ref_1).invoke_qyvycq_k$ = function (p0, p1, $completion) {
    return p0.postDiscussion_v4gfq8_k$(p1, $completion);
  };
  protoOf(AppService$postDiscussion$ref_1).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, AppService) : false) ? p1 : THROW_CCE();
    return this.invoke_qyvycq_k$(tmp, (!(p2 == null) ? typeof p2 === 'string' : false) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(AppService$postDiscussion$ref_1).get_name_woqyms_k$ = function () {
    return 'postDiscussion';
  };
  function AppService$postDiscussion$ref_2() {
    var i = new AppService$postDiscussion$ref_1();
    return constructCallableReference(function (p0, p1, $completion) {
      return i.invoke_qyvycq_k$(p0, p1, $completion);
    }, 2, 1, 'rpc/AppService.postDiscussion|postDiscussion(kotlin.String){}[0]', 'postDiscussion');
  }
  function AppServiceManager() {
    AppServiceManager_instance = this;
    RpcServiceManager.call(this, getKClass(AppService));
    registerRpcServiceExceptions();
    var tmp2 = AppService$getCurrentUser$ref_2();
    // Inline function 'dev.kilua.rpc.RpcServiceManagerJs.bind' call
    var method = HttpMethod_POST_getInstance();
    this.bindFunctionInternal$default_9jhqk4_k$(null, tmp2, method);
    var tmp2_0 = AppService$getNotes$ref_2();
    // Inline function 'dev.kilua.rpc.RpcServiceManagerJs.bind' call
    var method_0 = HttpMethod_POST_getInstance();
    this.bindFunctionInternal$default_9jhqk4_k$(null, tmp2_0, method_0);
    var tmp2_1 = AppService$saveNote$ref_2();
    // Inline function 'dev.kilua.rpc.RpcServiceManagerJs.bind' call
    var method_1 = HttpMethod_POST_getInstance();
    this.bindFunctionInternal$default_9jhqk4_k$(null, tmp2_1, method_1);
    var tmp2_2 = AppService$deleteNote$ref_2();
    // Inline function 'dev.kilua.rpc.RpcServiceManagerJs.bind' call
    var method_2 = HttpMethod_POST_getInstance();
    this.bindFunctionInternal$default_9jhqk4_k$(null, tmp2_2, method_2);
    var tmp2_3 = AppService$getDiscussions$ref_2();
    // Inline function 'dev.kilua.rpc.RpcServiceManagerJs.bind' call
    var method_3 = HttpMethod_POST_getInstance();
    this.bindFunctionInternal$default_9jhqk4_k$(null, tmp2_3, method_3);
    var tmp2_4 = AppService$postDiscussion$ref_2();
    // Inline function 'dev.kilua.rpc.RpcServiceManagerJs.bind' call
    var method_4 = HttpMethod_POST_getInstance();
    this.bindFunctionInternal$default_9jhqk4_k$(null, tmp2_4, method_4);
  }
  var AppServiceManager_instance;
  function AppServiceManager_getInstance() {
    if (AppServiceManager_instance == null)
      new AppServiceManager();
    return AppServiceManager_instance;
  }
  function rpc_AppServiceManager$stableprop_getter() {
    return rpc_AppServiceManager$stable;
  }
  var models_User_$serializer$stable;
  var models_User$stable;
  var models_Note_$serializer$stable;
  var models_Note$stable;
  var models_Discussion_$serializer$stable;
  var models_Discussion$stable;
  var models_UserSession_$serializer$stable;
  var models_UserSession$stable;
  function Companion() {
    Companion_instance = this;
  }
  protoOf(Companion).serializer_9w0wvi_k$ = function () {
    return $serializer_getInstance();
  };
  var Companion_instance;
  function Companion_getInstance_0() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function $serializer() {
    $serializer_instance = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('models.User', this, 4);
    tmp0_serialDesc.addElement_5pzumi_k$('id', false);
    tmp0_serialDesc.addElement_5pzumi_k$('email', false);
    tmp0_serialDesc.addElement_5pzumi_k$('name', false);
    tmp0_serialDesc.addElement_5pzumi_k$('createdAt', false);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer).serialize_7rbr9n_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.id_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.email_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.name_1);
    tmp1_output.encodeLongElement_cega27_k$(tmp0_desc, 3, value.createdAt_1);
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_7rbr9n_k$(encoder, value instanceof User ? value : THROW_CCE());
  };
  protoOf($serializer).deserialize_sy6x50_k$ = function (decoder) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = new Long(0, 0);
    var tmp8_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp8_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.decodeLongElement_994anb_k$(tmp0_desc, 3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.decodeLongElement_994anb_k$(tmp0_desc, 3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.endStructure_1xqz0n_k$(tmp0_desc);
    return User_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), LongSerializer_getInstance()];
  };
  var $serializer_instance;
  function $serializer_getInstance() {
    if ($serializer_instance == null)
      new $serializer();
    return $serializer_instance;
  }
  function User_init_$Init$(seen0, id, email, name, createdAt, serializationConstructorMarker, $this) {
    if (!(15 === (15 & seen0))) {
      throwMissingFieldException(seen0, 15, $serializer_getInstance().descriptor_1);
    }
    $this.id_1 = id;
    $this.email_1 = email;
    $this.name_1 = name;
    $this.createdAt_1 = createdAt;
    return $this;
  }
  function User_init_$Create$(seen0, id, email, name, createdAt, serializationConstructorMarker) {
    return User_init_$Init$(seen0, id, email, name, createdAt, serializationConstructorMarker, objectCreate(protoOf(User)));
  }
  function User(id, email, name, createdAt) {
    Companion_getInstance_0();
    this.id_1 = id;
    this.email_1 = email;
    this.name_1 = name;
    this.createdAt_1 = createdAt;
  }
  protoOf(User).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(User).get_email_iqwbqr_k$ = function () {
    return this.email_1;
  };
  protoOf(User).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(User).get_createdAt_ierzpu_k$ = function () {
    return this.createdAt_1;
  };
  protoOf(User).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(User).component2_7eebsb_k$ = function () {
    return this.email_1;
  };
  protoOf(User).component3_7eebsa_k$ = function () {
    return this.name_1;
  };
  protoOf(User).component4_7eebs9_k$ = function () {
    return this.createdAt_1;
  };
  protoOf(User).copy_rkanc9_k$ = function (id, email, name, createdAt) {
    return new User(id, email, name, createdAt);
  };
  protoOf(User).copy$default_1w7wxl_k$ = function (id, email, name, createdAt, $super) {
    id = id === VOID ? this.id_1 : id;
    email = email === VOID ? this.email_1 : email;
    name = name === VOID ? this.name_1 : name;
    createdAt = createdAt === VOID ? this.createdAt_1 : createdAt;
    return $super === VOID ? this.copy_rkanc9_k$(id, email, name, createdAt) : $super.copy_rkanc9_k$.call(this, id, email, name, createdAt);
  };
  protoOf(User).toString = function () {
    return 'User(id=' + this.id_1 + ', email=' + this.email_1 + ', name=' + this.name_1 + ', createdAt=' + this.createdAt_1.toString() + ')';
  };
  protoOf(User).hashCode = function () {
    var result = getStringHashCode(this.id_1);
    result = imul(result, 31) + getStringHashCode(this.email_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.name_1) | 0;
    result = imul(result, 31) + this.createdAt_1.hashCode() | 0;
    return result;
  };
  protoOf(User).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof User))
      return false;
    if (!(this.id_1 === other.id_1))
      return false;
    if (!(this.email_1 === other.email_1))
      return false;
    if (!(this.name_1 === other.name_1))
      return false;
    if (!equalsLong(this.createdAt_1, other.createdAt_1))
      return false;
    return true;
  };
  function Companion_0() {
    Companion_instance_0 = this;
  }
  protoOf(Companion_0).serializer_9w0wvi_k$ = function () {
    return $serializer_getInstance_0();
  };
  var Companion_instance_0;
  function Companion_getInstance_1() {
    if (Companion_instance_0 == null)
      new Companion_0();
    return Companion_instance_0;
  }
  function $serializer_0() {
    $serializer_instance_0 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('models.Note', this, 5);
    tmp0_serialDesc.addElement_5pzumi_k$('id', false);
    tmp0_serialDesc.addElement_5pzumi_k$('userId', false);
    tmp0_serialDesc.addElement_5pzumi_k$('title', false);
    tmp0_serialDesc.addElement_5pzumi_k$('content', false);
    tmp0_serialDesc.addElement_5pzumi_k$('updatedAt', false);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer_0).serialize_zi5y6q_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.id_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.userId_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.title_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 3, value.content_1);
    tmp1_output.encodeLongElement_cega27_k$(tmp0_desc, 4, value.updatedAt_1);
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer_0).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_zi5y6q_k$(encoder, value instanceof Note ? value : THROW_CCE());
  };
  protoOf($serializer_0).deserialize_sy6x50_k$ = function (decoder) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = new Long(0, 0);
    var tmp9_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp9_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp9_input.decodeLongElement_994anb_k$(tmp0_desc, 4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp9_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp9_input.decodeLongElement_994anb_k$(tmp0_desc, 4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp9_input.endStructure_1xqz0n_k$(tmp0_desc);
    return Note_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, null);
  };
  protoOf($serializer_0).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer_0).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), LongSerializer_getInstance()];
  };
  var $serializer_instance_0;
  function $serializer_getInstance_0() {
    if ($serializer_instance_0 == null)
      new $serializer_0();
    return $serializer_instance_0;
  }
  function Note_init_$Init$(seen0, id, userId, title, content, updatedAt, serializationConstructorMarker, $this) {
    if (!(31 === (31 & seen0))) {
      throwMissingFieldException(seen0, 31, $serializer_getInstance_0().descriptor_1);
    }
    $this.id_1 = id;
    $this.userId_1 = userId;
    $this.title_1 = title;
    $this.content_1 = content;
    $this.updatedAt_1 = updatedAt;
    return $this;
  }
  function Note_init_$Create$(seen0, id, userId, title, content, updatedAt, serializationConstructorMarker) {
    return Note_init_$Init$(seen0, id, userId, title, content, updatedAt, serializationConstructorMarker, objectCreate(protoOf(Note)));
  }
  function Note(id, userId, title, content, updatedAt) {
    Companion_getInstance_1();
    this.id_1 = id;
    this.userId_1 = userId;
    this.title_1 = title;
    this.content_1 = content;
    this.updatedAt_1 = updatedAt;
  }
  protoOf(Note).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(Note).get_userId_kl13yn_k$ = function () {
    return this.userId_1;
  };
  protoOf(Note).get_title_iz32un_k$ = function () {
    return this.title_1;
  };
  protoOf(Note).get_content_h02jrk_k$ = function () {
    return this.content_1;
  };
  protoOf(Note).get_updatedAt_npz717_k$ = function () {
    return this.updatedAt_1;
  };
  protoOf(Note).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(Note).component2_7eebsb_k$ = function () {
    return this.userId_1;
  };
  protoOf(Note).component3_7eebsa_k$ = function () {
    return this.title_1;
  };
  protoOf(Note).component4_7eebs9_k$ = function () {
    return this.content_1;
  };
  protoOf(Note).component5_7eebs8_k$ = function () {
    return this.updatedAt_1;
  };
  protoOf(Note).copy_xq8hsp_k$ = function (id, userId, title, content, updatedAt) {
    return new Note(id, userId, title, content, updatedAt);
  };
  protoOf(Note).copy$default_ucd8xf_k$ = function (id, userId, title, content, updatedAt, $super) {
    id = id === VOID ? this.id_1 : id;
    userId = userId === VOID ? this.userId_1 : userId;
    title = title === VOID ? this.title_1 : title;
    content = content === VOID ? this.content_1 : content;
    updatedAt = updatedAt === VOID ? this.updatedAt_1 : updatedAt;
    return $super === VOID ? this.copy_xq8hsp_k$(id, userId, title, content, updatedAt) : $super.copy_xq8hsp_k$.call(this, id, userId, title, content, updatedAt);
  };
  protoOf(Note).toString = function () {
    return 'Note(id=' + this.id_1 + ', userId=' + this.userId_1 + ', title=' + this.title_1 + ', content=' + this.content_1 + ', updatedAt=' + this.updatedAt_1.toString() + ')';
  };
  protoOf(Note).hashCode = function () {
    var result = getStringHashCode(this.id_1);
    result = imul(result, 31) + getStringHashCode(this.userId_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.title_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.content_1) | 0;
    result = imul(result, 31) + this.updatedAt_1.hashCode() | 0;
    return result;
  };
  protoOf(Note).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Note))
      return false;
    if (!(this.id_1 === other.id_1))
      return false;
    if (!(this.userId_1 === other.userId_1))
      return false;
    if (!(this.title_1 === other.title_1))
      return false;
    if (!(this.content_1 === other.content_1))
      return false;
    if (!equalsLong(this.updatedAt_1, other.updatedAt_1))
      return false;
    return true;
  };
  function Companion_1() {
    Companion_instance_1 = this;
  }
  protoOf(Companion_1).serializer_9w0wvi_k$ = function () {
    return $serializer_getInstance_1();
  };
  var Companion_instance_1;
  function Companion_getInstance_2() {
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  function $serializer_1() {
    $serializer_instance_1 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('models.Discussion', this, 5);
    tmp0_serialDesc.addElement_5pzumi_k$('id', false);
    tmp0_serialDesc.addElement_5pzumi_k$('userId', false);
    tmp0_serialDesc.addElement_5pzumi_k$('authorName', false);
    tmp0_serialDesc.addElement_5pzumi_k$('content', false);
    tmp0_serialDesc.addElement_5pzumi_k$('createdAt', false);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer_1).serialize_m2trew_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.id_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.userId_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.authorName_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 3, value.content_1);
    tmp1_output.encodeLongElement_cega27_k$(tmp0_desc, 4, value.createdAt_1);
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer_1).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_m2trew_k$(encoder, value instanceof Discussion ? value : THROW_CCE());
  };
  protoOf($serializer_1).deserialize_sy6x50_k$ = function (decoder) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = new Long(0, 0);
    var tmp9_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp9_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp9_input.decodeLongElement_994anb_k$(tmp0_desc, 4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp9_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp9_input.decodeLongElement_994anb_k$(tmp0_desc, 4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp9_input.endStructure_1xqz0n_k$(tmp0_desc);
    return Discussion_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, null);
  };
  protoOf($serializer_1).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer_1).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), LongSerializer_getInstance()];
  };
  var $serializer_instance_1;
  function $serializer_getInstance_1() {
    if ($serializer_instance_1 == null)
      new $serializer_1();
    return $serializer_instance_1;
  }
  function Discussion_init_$Init$(seen0, id, userId, authorName, content, createdAt, serializationConstructorMarker, $this) {
    if (!(31 === (31 & seen0))) {
      throwMissingFieldException(seen0, 31, $serializer_getInstance_1().descriptor_1);
    }
    $this.id_1 = id;
    $this.userId_1 = userId;
    $this.authorName_1 = authorName;
    $this.content_1 = content;
    $this.createdAt_1 = createdAt;
    return $this;
  }
  function Discussion_init_$Create$(seen0, id, userId, authorName, content, createdAt, serializationConstructorMarker) {
    return Discussion_init_$Init$(seen0, id, userId, authorName, content, createdAt, serializationConstructorMarker, objectCreate(protoOf(Discussion)));
  }
  function Discussion(id, userId, authorName, content, createdAt) {
    Companion_getInstance_2();
    this.id_1 = id;
    this.userId_1 = userId;
    this.authorName_1 = authorName;
    this.content_1 = content;
    this.createdAt_1 = createdAt;
  }
  protoOf(Discussion).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(Discussion).get_userId_kl13yn_k$ = function () {
    return this.userId_1;
  };
  protoOf(Discussion).get_authorName_q0vry7_k$ = function () {
    return this.authorName_1;
  };
  protoOf(Discussion).get_content_h02jrk_k$ = function () {
    return this.content_1;
  };
  protoOf(Discussion).get_createdAt_ierzpu_k$ = function () {
    return this.createdAt_1;
  };
  protoOf(Discussion).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(Discussion).component2_7eebsb_k$ = function () {
    return this.userId_1;
  };
  protoOf(Discussion).component3_7eebsa_k$ = function () {
    return this.authorName_1;
  };
  protoOf(Discussion).component4_7eebs9_k$ = function () {
    return this.content_1;
  };
  protoOf(Discussion).component5_7eebs8_k$ = function () {
    return this.createdAt_1;
  };
  protoOf(Discussion).copy_xq8hsp_k$ = function (id, userId, authorName, content, createdAt) {
    return new Discussion(id, userId, authorName, content, createdAt);
  };
  protoOf(Discussion).copy$default_t83yzt_k$ = function (id, userId, authorName, content, createdAt, $super) {
    id = id === VOID ? this.id_1 : id;
    userId = userId === VOID ? this.userId_1 : userId;
    authorName = authorName === VOID ? this.authorName_1 : authorName;
    content = content === VOID ? this.content_1 : content;
    createdAt = createdAt === VOID ? this.createdAt_1 : createdAt;
    return $super === VOID ? this.copy_xq8hsp_k$(id, userId, authorName, content, createdAt) : $super.copy_xq8hsp_k$.call(this, id, userId, authorName, content, createdAt);
  };
  protoOf(Discussion).toString = function () {
    return 'Discussion(id=' + this.id_1 + ', userId=' + this.userId_1 + ', authorName=' + this.authorName_1 + ', content=' + this.content_1 + ', createdAt=' + this.createdAt_1.toString() + ')';
  };
  protoOf(Discussion).hashCode = function () {
    var result = getStringHashCode(this.id_1);
    result = imul(result, 31) + getStringHashCode(this.userId_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.authorName_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.content_1) | 0;
    result = imul(result, 31) + this.createdAt_1.hashCode() | 0;
    return result;
  };
  protoOf(Discussion).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Discussion))
      return false;
    if (!(this.id_1 === other.id_1))
      return false;
    if (!(this.userId_1 === other.userId_1))
      return false;
    if (!(this.authorName_1 === other.authorName_1))
      return false;
    if (!(this.content_1 === other.content_1))
      return false;
    if (!equalsLong(this.createdAt_1, other.createdAt_1))
      return false;
    return true;
  };
  function Companion_2() {
    Companion_instance_2 = this;
  }
  protoOf(Companion_2).serializer_9w0wvi_k$ = function () {
    return $serializer_getInstance_2();
  };
  var Companion_instance_2;
  function Companion_getInstance_3() {
    if (Companion_instance_2 == null)
      new Companion_2();
    return Companion_instance_2;
  }
  function $serializer_2() {
    $serializer_instance_2 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('models.UserSession', this, 3);
    tmp0_serialDesc.addElement_5pzumi_k$('id', false);
    tmp0_serialDesc.addElement_5pzumi_k$('email', false);
    tmp0_serialDesc.addElement_5pzumi_k$('name', false);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer_2).serialize_8fntmj_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.id_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.email_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.name_1);
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer_2).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_8fntmj_k$(encoder, value instanceof UserSession ? value : THROW_CCE());
  };
  protoOf($serializer_2).deserialize_sy6x50_k$ = function (decoder) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp7_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp7_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp7_input.endStructure_1xqz0n_k$(tmp0_desc);
    return UserSession_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
  };
  protoOf($serializer_2).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer_2).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance()];
  };
  var $serializer_instance_2;
  function $serializer_getInstance_2() {
    if ($serializer_instance_2 == null)
      new $serializer_2();
    return $serializer_instance_2;
  }
  function UserSession_init_$Init$(seen0, id, email, name, serializationConstructorMarker, $this) {
    if (!(7 === (7 & seen0))) {
      throwMissingFieldException(seen0, 7, $serializer_getInstance_2().descriptor_1);
    }
    $this.id_1 = id;
    $this.email_1 = email;
    $this.name_1 = name;
    return $this;
  }
  function UserSession_init_$Create$(seen0, id, email, name, serializationConstructorMarker) {
    return UserSession_init_$Init$(seen0, id, email, name, serializationConstructorMarker, objectCreate(protoOf(UserSession)));
  }
  function UserSession(id, email, name) {
    Companion_getInstance_3();
    this.id_1 = id;
    this.email_1 = email;
    this.name_1 = name;
  }
  protoOf(UserSession).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(UserSession).get_email_iqwbqr_k$ = function () {
    return this.email_1;
  };
  protoOf(UserSession).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(UserSession).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(UserSession).component2_7eebsb_k$ = function () {
    return this.email_1;
  };
  protoOf(UserSession).component3_7eebsa_k$ = function () {
    return this.name_1;
  };
  protoOf(UserSession).copy_nc7k0r_k$ = function (id, email, name) {
    return new UserSession(id, email, name);
  };
  protoOf(UserSession).copy$default_pvyc7c_k$ = function (id, email, name, $super) {
    id = id === VOID ? this.id_1 : id;
    email = email === VOID ? this.email_1 : email;
    name = name === VOID ? this.name_1 : name;
    return $super === VOID ? this.copy_nc7k0r_k$(id, email, name) : $super.copy_nc7k0r_k$.call(this, id, email, name);
  };
  protoOf(UserSession).toString = function () {
    return 'UserSession(id=' + this.id_1 + ', email=' + this.email_1 + ', name=' + this.name_1 + ')';
  };
  protoOf(UserSession).hashCode = function () {
    var result = getStringHashCode(this.id_1);
    result = imul(result, 31) + getStringHashCode(this.email_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.name_1) | 0;
    return result;
  };
  protoOf(UserSession).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof UserSession))
      return false;
    if (!(this.id_1 === other.id_1))
      return false;
    if (!(this.email_1 === other.email_1))
      return false;
    if (!(this.name_1 === other.name_1))
      return false;
    return true;
  };
  function models_User_$serializer$stableprop_getter() {
    return models_User_$serializer$stable;
  }
  function models_User$stableprop_getter() {
    return models_User$stable;
  }
  function models_Note_$serializer$stableprop_getter() {
    return models_Note_$serializer$stable;
  }
  function models_Note$stableprop_getter() {
    return models_Note$stable;
  }
  function models_Discussion_$serializer$stableprop_getter() {
    return models_Discussion_$serializer$stable;
  }
  function models_Discussion$stableprop_getter() {
    return models_Discussion$stable;
  }
  function models_UserSession_$serializer$stableprop_getter() {
    return models_UserSession_$serializer$stable;
  }
  function models_UserSession$stableprop_getter() {
    return models_UserSession$stable;
  }
  function AppService() {
  }
  var App$stable;
  function _get_appService__3zdign($this) {
    return $this.appService_1;
  }
  function _get_scope__bi2zur($this) {
    return $this.scope_1;
  }
  function ComposableLambda$invoke$ref(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function invoke$lambda($currentUser$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('currentUser', KMutableProperty0, true);
    return $currentUser$delegate.get_value_j01efc_k$();
  }
  function invoke$lambda_0($currentUser$delegate, _set____db54di) {
    // Inline function 'androidx.compose.runtime.setValue' call
    getLocalDelegateReference('currentUser', KMutableProperty0, true);
    $currentUser$delegate.set_value_v1vabv_k$(_set____db54di);
    return Unit_getInstance();
  }
  function invoke$lambda_1($notes$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('notes', KMutableProperty0, true);
    return $notes$delegate.get_value_j01efc_k$();
  }
  function invoke$lambda_2($notes$delegate, _set____db54di) {
    // Inline function 'androidx.compose.runtime.setValue' call
    getLocalDelegateReference('notes', KMutableProperty0, true);
    $notes$delegate.set_value_v1vabv_k$(_set____db54di);
    return Unit_getInstance();
  }
  function invoke$lambda_3($discussions$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('discussions', KMutableProperty0, true);
    return $discussions$delegate.get_value_j01efc_k$();
  }
  function invoke$lambda_4($discussions$delegate, _set____db54di) {
    // Inline function 'androidx.compose.runtime.setValue' call
    getLocalDelegateReference('discussions', KMutableProperty0, true);
    $discussions$delegate.set_value_v1vabv_k$(_set____db54di);
    return Unit_getInstance();
  }
  function invoke$lambda_5($currentTab$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('currentTab', KMutableProperty0, true);
    return $currentTab$delegate.get_value_j01efc_k$();
  }
  function invoke$lambda_6($currentTab$delegate, _set____db54di) {
    // Inline function 'androidx.compose.runtime.setValue' call
    getLocalDelegateReference('currentTab', KMutableProperty0, true);
    $currentTab$delegate.set_value_v1vabv_k$(_set____db54di);
    return Unit_getInstance();
  }
  function App$start$lambda$slambda(this$0, $currentUser$delegate, $notes$delegate, $discussions$delegate, resultContinuation) {
    this.this$0__1 = this$0;
    this.$currentUser$delegate_1 = $currentUser$delegate;
    this.$notes$delegate_1 = $notes$delegate;
    this.$discussions$delegate_1 = $discussions$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(App$start$lambda$slambda).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(App$start$lambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(App$start$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(6);
            this.set_exceptionState_fex74n_k$(5);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this$0__1.appService_1.getCurrentUser_zcvj6v_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            invoke$lambda_0(this.$currentUser$delegate_1, ARGUMENT);
            if (!(invoke$lambda(this.$currentUser$delegate_1) == null)) {
              this.set_state_rjd8d0_k$(2);
              suspendResult = this.this$0__1.appService_1.getNotes_jjy5rh_k$(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            }

          case 2:
            var ARGUMENT_0 = suspendResult;
            invoke$lambda_2(this.$notes$delegate_1, ARGUMENT_0);
            this.set_state_rjd8d0_k$(3);
            suspendResult = this.this$0__1.appService_1.getDiscussions_1st9s1_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var ARGUMENT_1 = suspendResult;
            invoke$lambda_4(this.$discussions$delegate_1, ARGUMENT_1);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(6);
            this.set_state_rjd8d0_k$(7);
            continue $sm;
          case 5:
            this.set_exceptionState_fex74n_k$(6);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof Exception) {
              var e = this.get_exception_x0n6w6_k$();
              invoke$lambda_0(this.$currentUser$delegate_1, null);
              this.set_state_rjd8d0_k$(7);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 6:
            throw this.get_exception_x0n6w6_k$();
          case 7:
            this.set_exceptionState_fex74n_k$(6);
            return Unit_getInstance();
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 6) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  protoOf(App$start$lambda$slambda).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new App$start$lambda$slambda(this.this$0__1, this.$currentUser$delegate_1, this.$notes$delegate_1, this.$discussions$delegate_1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(App$start$lambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function App$start$lambda$slambda_0(this$0, $currentUser$delegate, $notes$delegate, $discussions$delegate, resultContinuation) {
    var i = new App$start$lambda$slambda(this$0, $currentUser$delegate, $notes$delegate, $discussions$delegate, resultContinuation);
    return constructCallableReference(function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    }, 1);
  }
  function App$start$lambda$lambda$lambda$lambda($currentUser$delegate) {
    return function ($this$span, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C75@3085L41:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$span) : $composer_0.changedInstance_s1wkiy_k$($this$span)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(1586474699, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:75)');
        }
        var tmp0_safe_receiver = invoke$lambda($currentUser$delegate);
        textNode($this$span, 'Welcome, ' + (tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_name_woqyms_k$()), $composer_0, 14 & $dirty);
        var tmp_1;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_1 = Unit_getInstance();
        }
        tmp_0 = tmp_1;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_0(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda($currentUser$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(1793844210, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous> (App.kt:74)');
        }
        if (!(invoke$lambda($currentUser$delegate) == null)) {
          $composer_0.startReplaceGroup_5hh8aj_k$(-1865149394);
          sourceInformation($composer_0, '75@3083L45,75@3078L50,76@3153L135');
          // Inline function 'kotlin.run' call
          var dispatchReceiver = rememberComposableLambda(1586474699, true, App$start$lambda$lambda$lambda$lambda($currentUser$delegate), $composer_0, 54);
          // Inline function 'androidx.compose.runtime.remember' call
          var $composer_1 = $composer_0;
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_1;
          if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
            var value = ComposableLambda$invoke$ref_0(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value);
            tmp_1 = value;
          } else {
            tmp_1 = it;
          }
          var tmp$ret$0 = tmp_1;
          span($this$div, null, null, tmp$ret$0, $composer_0, 3072 | 14 & $dirty, 3);
          a($this$div, '/logout', null, null, null, 'btn btn-primary text-none', null, ComposableSingletons$AppKt_getInstance().lambda$1423674711__1, $composer_0, 12779568 | 14 & $dirty, 46);
          $composer_0.endReplaceGroup_ek144q_k$();
        } else {
          $composer_0.startReplaceGroup_5hh8aj_k$(-1864889521);
          sourceInformation($composer_0, '80@3342L145');
          a($this$div, '/login', null, null, null, 'btn btn-primary text-none', null, ComposableSingletons$AppKt_getInstance().lambda$981898720__1, $composer_0, 12779568 | 14 & $dirty, 46);
          $composer_0.endReplaceGroup_ek144q_k$();
        }
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_1(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda($currentUser$delegate) {
    return function ($this$nav, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C70@2847L95,73@3005L522,73@2959L568:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$nav) : $composer_0.changedInstance_s1wkiy_k$($this$nav)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-1815715731, $dirty, -1, 'App.start.<anonymous>.<anonymous> (App.kt:70)');
        }
        div($this$nav, 'navbar-brand', null, ComposableSingletons$AppKt_getInstance().lambda$1863277179__1, $composer_0, 3120 | 14 & $dirty, 2);
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(1793844210, true, App$start$lambda$lambda$lambda($currentUser$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = ComposableLambda$invoke$ref_1(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp$ret$0 = tmp_1;
        div($this$nav, 'd-flex items-center gap-20', null, tmp$ret$0, $composer_0, 3120 | 14 & $dirty, 2);
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_2(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function invoke$lambda_7($title$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('title', KMutableProperty0, true);
    return $title$delegate.get_value_j01efc_k$();
  }
  function invoke$lambda_8($title$delegate, _set____db54di) {
    // Inline function 'androidx.compose.runtime.setValue' call
    getLocalDelegateReference('title', KMutableProperty0, true);
    $title$delegate.set_value_v1vabv_k$(_set____db54di);
    return Unit_getInstance();
  }
  function invoke$lambda_9($content$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('content', KMutableProperty0, true);
    return $content$delegate.get_value_j01efc_k$();
  }
  function invoke$lambda_10($content$delegate, _set____db54di) {
    // Inline function 'androidx.compose.runtime.setValue' call
    getLocalDelegateReference('content', KMutableProperty0, true);
    $content$delegate.set_value_v1vabv_k$(_set____db54di);
    return Unit_getInstance();
  }
  function invoke$lambda_11($content$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('content', KMutableProperty0, true);
    return $content$delegate.get_value_j01efc_k$();
  }
  function invoke$lambda_12($content$delegate, _set____db54di) {
    // Inline function 'androidx.compose.runtime.setValue' call
    getLocalDelegateReference('content', KMutableProperty0, true);
    $content$delegate.set_value_v1vabv_k$(_set____db54di);
    return Unit_getInstance();
  }
  function App$start$lambda$lambda$lambda$lambda$lambda($currentTab$delegate) {
    return function (it) {
      invoke$lambda_6($currentTab$delegate, 'notes');
      return Unit_getInstance();
    };
  }
  function App$start$lambda$lambda$lambda$lambda_0($currentTab$delegate) {
    return function ($this$button, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C100@4298L24,100@4290L32:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$button) : $composer_0.changedInstance_s1wkiy_k$($this$button)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(2011626353, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:100)');
        }
        sourceInformationMarkerStart($composer_0, 437643273, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (false || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = App$start$lambda$lambda$lambda$lambda$lambda($currentTab$delegate);
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        $this$button.onClick_ou5wmh_k$(tmp0_group, $composer_0, 6 | 112 & $dirty << 3);
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_3(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda_0($currentTab$delegate) {
    return function (it) {
      invoke$lambda_6($currentTab$delegate, 'discussions');
      return Unit_getInstance();
    };
  }
  function App$start$lambda$lambda$lambda$lambda_1($currentTab$delegate) {
    return function ($this$button, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C103@4521L30,103@4513L38:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$button) : $composer_0.changedInstance_s1wkiy_k$($this$button)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-205068248, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:103)');
        }
        sourceInformationMarkerStart($composer_0, 497910534, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (false || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = App$start$lambda$lambda$lambda$lambda$lambda_0($currentTab$delegate);
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        $this$button.onClick_ou5wmh_k$(tmp0_group, $composer_0, 6 | 112 & $dirty << 3);
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_4(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda_0($currentTab$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C99@4260L88,99@4160L188,102@4483L94,102@4373L204:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(718062559, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous> (App.kt:99)');
        }
        var tmp_1 = 'btn ' + (invoke$lambda_5($currentTab$delegate) === 'notes' ? 'btn-primary' : 'glass');
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(2011626353, true, App$start$lambda$lambda$lambda$lambda_0($currentTab$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_2;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = ComposableLambda$invoke$ref_3(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value);
          tmp_2 = value;
        } else {
          tmp_2 = it;
        }
        var tmp$ret$0 = tmp_2;
        button($this$div, 'Private Notes', null, null, null, tmp_1, null, tmp$ret$0, $composer_0, 12582960 | 14 & $dirty, 46);
        var tmp_3 = 'btn ' + (invoke$lambda_5($currentTab$delegate) === 'discussions' ? 'btn-primary' : 'glass');
        // Inline function 'kotlin.run' call
        var dispatchReceiver_0 = rememberComposableLambda(-205068248, true, App$start$lambda$lambda$lambda$lambda_1($currentTab$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_2 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = $composer_2.changed_ga7h3f_k$(dispatchReceiver_0);
        // Inline function 'kotlin.let' call
        var it_0 = $composer_2.rememberedValue_4dg93v_k$();
        var tmp_4;
        if (invalid_0 || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_0 = ComposableLambda$invoke$ref_4(dispatchReceiver_0);
          $composer_2.updateRememberedValue_l1wh71_k$(value_0);
          tmp_4 = value_0;
        } else {
          tmp_4 = it_0;
        }
        var tmp$ret$7 = tmp_4;
        button($this$div, 'Public Discussion', null, null, null, tmp_3, null, tmp$ret$7, $composer_0, 12582960 | 14 & $dirty, 46);
        var tmp_5;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_5 = Unit_getInstance();
        }
        tmp_0 = tmp_5;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_5(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda($title$delegate, $this_text) {
    return function (it) {
      var tmp0_elvis_lhs = $this_text.get_value_j01efc_k$();
      invoke$lambda_8($title$delegate, tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs);
      return Unit_getInstance();
    };
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda($title$delegate) {
    return function ($this$text, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C117@5275L28,117@5267L36:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$text) : $composer_0.changedInstance_s1wkiy_k$($this$text)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-358738271, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:117)');
        }
        sourceInformationMarkerStart($composer_0, -1150093123, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = ($dirty & 14) === 4 || (!(($dirty & 8) === 0) && $composer_0.changedInstance_s1wkiy_k$($this$text));
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda($title$delegate, $this$text);
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        $this$text.onInput_giwlr3_k$(tmp0_group, $composer_0, 112 & $dirty << 3);
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_6(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0($content$delegate, $this_textArea) {
    return function (it) {
      var tmp0_elvis_lhs = $this_textArea.get_value_j01efc_k$();
      invoke$lambda_10($content$delegate, tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs);
      return Unit_getInstance();
    };
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda_0($content$delegate) {
    return function ($this$textArea, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C120@5505L30,120@5497L38:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$textArea) : $composer_0.changedInstance_s1wkiy_k$($this$textArea)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-1191175809, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:120)');
        }
        sourceInformationMarkerStart($composer_0, 2036317213, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = ($dirty & 14) === 4 || (!(($dirty & 8) === 0) && $composer_0.changedInstance_s1wkiy_k$($this$textArea));
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0($content$delegate, $this$textArea);
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        $this$textArea.onInput_giwlr3_k$(tmp0_group, $composer_0, 112 & $dirty << 3);
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_7(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda(this$0, $title$delegate, $content$delegate, $notes$delegate, resultContinuation) {
    this.this$0__1 = this$0;
    this.$title$delegate_1 = $title$delegate;
    this.$content$delegate_1 = $content$delegate;
    this.$notes$delegate_1 = $notes$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this$0__1.appService_1.saveNote_i1jnx_k$(invoke$lambda_7(this.$title$delegate_1), invoke$lambda_9(this.$content$delegate_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var note = suspendResult;
            invoke$lambda_2(this.$notes$delegate_1, plus(listOf_0(note), invoke$lambda_1(this.$notes$delegate_1)));
            invoke$lambda_8(this.$title$delegate_1, '');
            invoke$lambda_10(this.$content$delegate_1, '');
            return Unit_getInstance();
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda(this.this$0__1, this.$title$delegate_1, this.$content$delegate_1, this.$notes$delegate_1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_0(this$0, $title$delegate, $content$delegate, $notes$delegate, resultContinuation) {
    var i = new App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda(this$0, $title$delegate, $content$delegate, $notes$delegate, resultContinuation);
    return constructCallableReference(function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    }, 1);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_1($title$delegate, $content$delegate, this$0, $notes$delegate) {
    return function (it) {
      var tmp;
      var tmp_0;
      // Inline function 'kotlin.text.isNotBlank' call
      var this_0 = invoke$lambda_7($title$delegate);
      if (!isBlank(this_0)) {
        // Inline function 'kotlin.text.isNotBlank' call
        var this_1 = invoke$lambda_9($content$delegate);
        tmp_0 = !isBlank(this_1);
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        launch(this$0.scope_1, VOID, VOID, App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_0(this$0, $title$delegate, $content$delegate, $notes$delegate, null));
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda_1(this$0, $title$delegate, $content$delegate, $notes$delegate) {
    return function ($this$button, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C123@5722L604,123@5714L612:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$button) : $composer_0.changedInstance_s1wkiy_k$($this$button)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-624409048, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:123)');
        }
        sourceInformationMarkerStart($composer_0, 1238328516, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_0.changedInstance_s1wkiy_k$(this$0);
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_1($title$delegate, $content$delegate, this$0, $notes$delegate);
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        $this$button.onClick_ou5wmh_k$(tmp0_group, $composer_0, 112 & $dirty << 3);
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_8(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda_1($title$delegate, $content$delegate, this$0, $notes$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C116@5225L116,116@5166L175,119@5455L118,119@5378L195,122@5672L692,122@5610L754:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-1219515882, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:116)');
        }
        var tmp_1 = invoke$lambda_7($title$delegate);
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(-358738271, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda($title$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_2;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = ComposableLambda$invoke$ref_6(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value);
          tmp_2 = value;
        } else {
          tmp_2 = it;
        }
        var tmp$ret$0 = tmp_2;
        text($this$div, tmp_1, null, null, null, 'Title', null, null, '', null, tmp$ret$0, $composer_0, 100859904 | 14 & $dirty, 6, 366);
        var tmp_3 = invoke$lambda_9($content$delegate);
        // Inline function 'kotlin.run' call
        var dispatchReceiver_0 = rememberComposableLambda(-1191175809, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda_0($content$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_2 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = $composer_2.changed_ga7h3f_k$(dispatchReceiver_0);
        // Inline function 'kotlin.let' call
        var it_0 = $composer_2.rememberedValue_4dg93v_k$();
        var tmp_4;
        if (invalid_0 || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_0 = ComposableLambda$invoke$ref_7(dispatchReceiver_0);
          $composer_2.updateRememberedValue_l1wh71_k$(value_0);
          tmp_4 = value_0;
        } else {
          tmp_4 = it_0;
        }
        var tmp$ret$7 = tmp_4;
        textArea($this$div, tmp_3, null, 4, null, null, 'Content', null, null, '', null, tmp$ret$7, $composer_0, 806882304 | 14 & $dirty, 48, 730);
        // Inline function 'kotlin.run' call
        var dispatchReceiver_1 = rememberComposableLambda(-624409048, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda_1(this$0, $title$delegate, $content$delegate, $notes$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_3 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_1 = $composer_3.changed_ga7h3f_k$(dispatchReceiver_1);
        // Inline function 'kotlin.let' call
        var it_1 = $composer_3.rememberedValue_4dg93v_k$();
        var tmp_5;
        if (invalid_1 || it_1 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_1 = ComposableLambda$invoke$ref_8(dispatchReceiver_1);
          $composer_3.updateRememberedValue_l1wh71_k$(value_1);
          tmp_5 = value_1;
        } else {
          tmp_5 = it_1;
        }
        var tmp$ret$14 = tmp_5;
        button($this$div, 'Save Note', null, null, null, 'btn btn-primary self-start', null, tmp$ret$14, $composer_0, 12779568 | 14 & $dirty, 46);
        var tmp_6;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_6 = Unit_getInstance();
        }
        tmp_0 = tmp_6;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_9(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda_2(this$0, $notes$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C111@4838L27,112@4911L31,113@4990L31,115@5128L1270,115@5087L1311:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(432544392, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:111)');
        }
        h3($this$div, null, null, ComposableSingletons$AppKt_getInstance().lambda$2044966344__1, $composer_0, 3072 | 14 & $dirty, 3);
        sourceInformationMarkerStart($composer_0, -936663545, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (false || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = mutableStateOf('');
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        var title$delegate = tmp0_group;
        sourceInformationMarkerStart($composer_0, -936661017, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_0 = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_2;
        if (false || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_0 = mutableStateOf('');
          $composer_0.updateRememberedValue_l1wh71_k$(value_0);
          tmp_2 = value_0;
        } else {
          tmp_2 = it_0;
        }
        var tmp1_group = tmp_2;
        sourceInformationMarkerEnd($composer_0);
        var content$delegate = tmp1_group;
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(-1219515882, true, App$start$lambda$lambda$lambda$lambda$lambda_1(title$delegate, content$delegate, this$0, $notes$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it_1 = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_3;
        if (invalid || it_1 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_1 = ComposableLambda$invoke$ref_9(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value_1);
          tmp_3 = value_1;
        } else {
          tmp_3 = it_1;
        }
        var tmp$ret$8 = tmp_3;
        div($this$div, 'd-flex flex-col gap-1', null, tmp$ret$8, $composer_0, 3120 | 14 & $dirty, 2);
        var tmp_4;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_4 = Unit_getInstance();
        }
        tmp_0 = tmp_4;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_10(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda_2($note) {
    return function ($this$h4, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C141@6740L20:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$h4) : $composer_0.changedInstance_s1wkiy_k$($this$h4)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-451167439, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:141)');
        }
        textNode($this$h4, $note.get_title_iz32un_k$(), $composer_0, 14 & $dirty);
        var tmp_1;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_1 = Unit_getInstance();
        }
        tmp_0 = tmp_1;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_11(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda_3($note) {
    return function ($this$p, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C143@6885L22:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$p) : $composer_0.changedInstance_s1wkiy_k$($this$p)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(2014374109, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:143)');
        }
        textNode($this$p, $note.get_content_h02jrk_k$(), $composer_0, 14 & $dirty);
        var tmp_1;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_1 = Unit_getInstance();
        }
        tmp_0 = tmp_1;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_12(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_1(this$0, $note, $notes$delegate, resultContinuation) {
    this.this$0__1 = this$0;
    this.$note_1 = $note;
    this.$notes$delegate_1 = $notes$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_1).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_1).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_1).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this$0__1.appService_1.deleteNote_pkm8ir_k$(this.$note_1.get_id_kntnx8_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            if (suspendResult) {
              var tmp0 = invoke$lambda_1(this.$notes$delegate_1);
              var destination = ArrayList_init_$Create$_0();
              var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
              while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
                var element = _iterator__ex2g4s.next_20eer_k$();
                if (!(element.get_id_kntnx8_k$() === this.$note_1.get_id_kntnx8_k$())) {
                  destination.add_utx5q5_k$(element);
                }
              }
              invoke$lambda_2(this.$notes$delegate_1, destination);
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            }

          case 2:
            return Unit_getInstance();
          case 3:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_1).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_1(this.this$0__1, this.$note_1, this.$notes$delegate_1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_1).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_2(this$0, $note, $notes$delegate, resultContinuation) {
    var i = new App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_1(this$0, $note, $notes$delegate, resultContinuation);
    return constructCallableReference(function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    }, 1);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_2(this$0, $note, $notes$delegate) {
    return function (it) {
      launch(this$0.scope_1, VOID, VOID, App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_2(this$0, $note, $notes$delegate, null));
      return Unit_getInstance();
    };
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda_4(this$0, $note, $notes$delegate) {
    return function ($this$button, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C146@7126L402,146@7118L410:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$button) : $composer_0.changedInstance_s1wkiy_k$($this$button)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-255176959, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:146)');
        }
        sourceInformationMarkerStart($composer_0, -411919597, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = !!($composer_0.changedInstance_s1wkiy_k$(this$0) | $composer_0.changedInstance_s1wkiy_k$($note));
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_2(this$0, $note, $notes$delegate);
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        $this$button.onClick_ou5wmh_k$(tmp0_group, $composer_0, 112 & $dirty << 3);
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_13(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda_2($note, this$0, $notes$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C141@6738L24,141@6716L46,142@6838L111,142@6803L146,145@7072L498,145@6990L580:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-1541063185, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:141)');
        }
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(-451167439, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda_2($note), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = ComposableLambda$invoke$ref_11(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp$ret$0 = tmp_1;
        h4($this$div, 'm-0', null, tmp$ret$0, $composer_0, 3120 | 14 & $dirty, 2);
        // Inline function 'kotlin.run' call
        var dispatchReceiver_0 = rememberComposableLambda(2014374109, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda_3($note), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_2 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = $composer_2.changed_ga7h3f_k$(dispatchReceiver_0);
        // Inline function 'kotlin.let' call
        var it_0 = $composer_2.rememberedValue_4dg93v_k$();
        var tmp_2;
        if (invalid_0 || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_0 = ComposableLambda$invoke$ref_12(dispatchReceiver_0);
          $composer_2.updateRememberedValue_l1wh71_k$(value_0);
          tmp_2 = value_0;
        } else {
          tmp_2 = it_0;
        }
        var tmp$ret$7 = tmp_2;
        p($this$div, 'text-md text-gray', null, tmp$ret$7, $composer_0, 3120 | 14 & $dirty, 2);
        // Inline function 'kotlin.run' call
        var dispatchReceiver_1 = rememberComposableLambda(-255176959, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda_4(this$0, $note, $notes$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_3 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_1 = $composer_3.changed_ga7h3f_k$(dispatchReceiver_1);
        // Inline function 'kotlin.let' call
        var it_1 = $composer_3.rememberedValue_4dg93v_k$();
        var tmp_3;
        if (invalid_1 || it_1 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_1 = ComposableLambda$invoke$ref_13(dispatchReceiver_1);
          $composer_3.updateRememberedValue_l1wh71_k$(value_1);
          tmp_3 = value_1;
        } else {
          tmp_3 = it_1;
        }
        var tmp$ret$14 = tmp_3;
        button($this$div, 'Delete', null, null, null, 'btn bg-red-light text-red text-sm btn-delete mt-1', null, tmp$ret$14, $composer_0, 12779568 | 14 & $dirty, 46);
        var tmp_4;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_4 = Unit_getInstance();
        }
        tmp_0 = tmp_4;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_14(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda_3($notes$delegate, this$0) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C*140@6674L934,140@6644L964:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(590790527, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:139)');
        }
        var _iterator__ex2g4s = invoke$lambda_1($notes$delegate).iterator_jk1svi_k$();
        while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
          var note = _iterator__ex2g4s.next_20eer_k$();
          // Inline function 'kotlin.run' call
          var dispatchReceiver = rememberComposableLambda(-1541063185, true, App$start$lambda$lambda$lambda$lambda$lambda_2(note, this$0, $notes$delegate), $composer_0, 54);
          // Inline function 'androidx.compose.runtime.remember' call
          var $composer_1 = $composer_0;
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_1;
          if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
            var value = ComposableLambda$invoke$ref_14(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value);
            tmp_1 = value;
          } else {
            tmp_1 = it;
          }
          var tmp$ret$0 = tmp_1;
          div($this$div, 'glass card', null, tmp$ret$0, $composer_0, 3120 | 14 & $dirty, 2);
        }
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_15(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda_1(this$0, $notes$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C110@4804L1624,110@4769L1659,138@6552L1120,138@6528L1144:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-1991026310, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous> (App.kt:110)');
        }
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(432544392, true, App$start$lambda$lambda$lambda$lambda_2(this$0, $notes$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = ComposableLambda$invoke$ref_10(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp$ret$0 = tmp_1;
        div($this$div, 'glass card mb-2', null, tmp$ret$0, $composer_0, 3120 | 14 & $dirty, 2);
        // Inline function 'kotlin.run' call
        var dispatchReceiver_0 = rememberComposableLambda(590790527, true, App$start$lambda$lambda$lambda$lambda_3($notes$delegate, this$0), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_2 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = $composer_2.changed_ga7h3f_k$(dispatchReceiver_0);
        // Inline function 'kotlin.let' call
        var it_0 = $composer_2.rememberedValue_4dg93v_k$();
        var tmp_2;
        if (invalid_0 || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_0 = ComposableLambda$invoke$ref_15(dispatchReceiver_0);
          $composer_2.updateRememberedValue_l1wh71_k$(value_0);
          tmp_2 = value_0;
        } else {
          tmp_2 = it_0;
        }
        var tmp$ret$7 = tmp_2;
        div($this$div, 'grid', null, tmp$ret$7, $composer_0, 3120 | 14 & $dirty, 2);
        var tmp_3;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_3 = Unit_getInstance();
        }
        tmp_0 = tmp_3;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_16(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_3($content$delegate, $this_textArea) {
    return function (it) {
      var tmp0_elvis_lhs = $this_textArea.get_value_j01efc_k$();
      invoke$lambda_12($content$delegate, tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs);
      return Unit_getInstance();
    };
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda_5($content$delegate) {
    return function ($this$textArea, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C167@8300L30,167@8292L38:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$textArea) : $composer_0.changedInstance_s1wkiy_k$($this$textArea)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-1404104504, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:167)');
        }
        sourceInformationMarkerStart($composer_0, -724695770, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = ($dirty & 14) === 4 || (!(($dirty & 8) === 0) && $composer_0.changedInstance_s1wkiy_k$($this$textArea));
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_3($content$delegate, $this$textArea);
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        $this$textArea.onInput_giwlr3_k$(tmp0_group, $composer_0, 112 & $dirty << 3);
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_17(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_3(this$0, $content$delegate, $discussions$delegate, resultContinuation) {
    this.this$0__1 = this$0;
    this.$content$delegate_1 = $content$delegate;
    this.$discussions$delegate_1 = $discussions$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_3).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_3).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_3).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this$0__1.appService_1.postDiscussion_v4gfq8_k$(invoke$lambda_11(this.$content$delegate_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var post = suspendResult;
            invoke$lambda_4(this.$discussions$delegate_1, plus(listOf_0(post), invoke$lambda_3(this.$discussions$delegate_1)));
            invoke$lambda_12(this.$content$delegate_1, '');
            return Unit_getInstance();
          case 2:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 2) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_3).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_3(this.this$0__1, this.$content$delegate_1, this.$discussions$delegate_1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_3).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_4(this$0, $content$delegate, $discussions$delegate, resultContinuation) {
    var i = new App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_3(this$0, $content$delegate, $discussions$delegate, resultContinuation);
    return constructCallableReference(function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    }, 1);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_4($content$delegate, this$0, $discussions$delegate) {
    return function (it) {
      var tmp;
      // Inline function 'kotlin.text.isNotBlank' call
      var this_0 = invoke$lambda_11($content$delegate);
      if (!isBlank(this_0)) {
        launch(this$0.scope_1, VOID, VOID, App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda$slambda_4(this$0, $content$delegate, $discussions$delegate, null));
        tmp = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda_6(this$0, $content$delegate, $discussions$delegate) {
    return function ($this$button, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C170@8512L530,170@8504L538:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$button) : $composer_0.changedInstance_s1wkiy_k$($this$button)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-1671670863, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:170)');
        }
        sourceInformationMarkerStart($composer_0, -157928509, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_0.changedInstance_s1wkiy_k$(this$0);
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_4($content$delegate, this$0, $discussions$delegate);
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        $this$button.onClick_ou5wmh_k$(tmp0_group, $composer_0, 112 & $dirty << 3);
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_18(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda_3($content$delegate, this$0, $discussions$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C166@8250L118,166@8160L208,169@8462L618,169@8405L675:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-1649943777, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:166)');
        }
        var tmp_1 = invoke$lambda_11($content$delegate);
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(-1404104504, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda_5($content$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_2;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = ComposableLambda$invoke$ref_17(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value);
          tmp_2 = value;
        } else {
          tmp_2 = it;
        }
        var tmp$ret$0 = tmp_2;
        textArea($this$div, tmp_1, null, 3, null, null, "What's on your mind?", null, null, '', null, tmp$ret$0, $composer_0, 806882304 | 14 & $dirty, 48, 730);
        // Inline function 'kotlin.run' call
        var dispatchReceiver_0 = rememberComposableLambda(-1671670863, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda_6(this$0, $content$delegate, $discussions$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_2 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = $composer_2.changed_ga7h3f_k$(dispatchReceiver_0);
        // Inline function 'kotlin.let' call
        var it_0 = $composer_2.rememberedValue_4dg93v_k$();
        var tmp_3;
        if (invalid_0 || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_0 = ComposableLambda$invoke$ref_18(dispatchReceiver_0);
          $composer_2.updateRememberedValue_l1wh71_k$(value_0);
          tmp_3 = value_0;
        } else {
          tmp_3 = it_0;
        }
        var tmp$ret$7 = tmp_3;
        button($this$div, 'Post', null, null, null, 'btn btn-primary self-start', null, tmp$ret$7, $composer_0, 12779568 | 14 & $dirty, 46);
        var tmp_4;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_4 = Unit_getInstance();
        }
        tmp_0 = tmp_4;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_19(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda_4(this$0, $discussions$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C162@7898L38,163@7984L31,165@8122L992,165@8081L1033:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(537247761, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:162)');
        }
        h3($this$div, null, null, ComposableSingletons$AppKt_getInstance().lambda$_1932580015_39spuq_1, $composer_0, 3072 | 14 & $dirty, 3);
        sourceInformationMarkerStart($composer_0, 899026672, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (false || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = mutableStateOf('');
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        var content$delegate = tmp0_group;
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(-1649943777, true, App$start$lambda$lambda$lambda$lambda$lambda_3(content$delegate, this$0, $discussions$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it_0 = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_2;
        if (invalid || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_0 = ComposableLambda$invoke$ref_19(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value_0);
          tmp_2 = value_0;
        } else {
          tmp_2 = it_0;
        }
        var tmp$ret$4 = tmp_2;
        div($this$div, 'd-flex flex-col gap-1', null, tmp$ret$4, $composer_0, 3120 | 14 & $dirty, 2);
        var tmp_3;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_3 = Unit_getInstance();
        }
        tmp_0 = tmp_3;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_20(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_5($post) {
    return function ($this$span, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C189@9641L25:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$span) : $composer_0.changedInstance_s1wkiy_k$($this$span)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-224502140, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:189)');
        }
        textNode($this$span, $post.get_authorName_q0vry7_k$(), $composer_0, 14 & $dirty);
        var tmp_1;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_1 = Unit_getInstance();
        }
        tmp_0 = tmp_1;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_21(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda_7($post) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C188@9590L122,188@9548L164,191@9757L160:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-502327866, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:188)');
        }
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(-224502140, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda$lambda_5($post), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = ComposableLambda$invoke$ref_21(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp$ret$0 = tmp_1;
        span($this$div, 'font-600 text-primary', null, tmp$ret$0, $composer_0, 3120 | 14 & $dirty, 2);
        span($this$div, 'text-sm text-dark-gray', null, ComposableSingletons$AppKt_getInstance().lambda$_841285509_dmfuxg_1, $composer_0, 3120 | 14 & $dirty, 2);
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_22(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda$lambda_8($post) {
    return function ($this$p, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C196@10070L22:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$p) : $composer_0.changedInstance_s1wkiy_k$($this$p)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(1298669478, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:196)');
        }
        textNode($this$p, $post.get_content_h02jrk_k$(), $composer_0, 14 & $dirty);
        var tmp_1;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_1 = Unit_getInstance();
        }
        tmp_0 = tmp_1;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_23(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda$lambda_4($post) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C187@9502L457,187@9460L499,195@10023L111,195@10000L134:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(173183288, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:187)');
        }
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(-502327866, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda_7($post), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = ComposableLambda$invoke$ref_22(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp$ret$0 = tmp_1;
        div($this$div, 'd-flex justify-between', null, tmp$ret$0, $composer_0, 3120 | 14 & $dirty, 2);
        // Inline function 'kotlin.run' call
        var dispatchReceiver_0 = rememberComposableLambda(1298669478, true, App$start$lambda$lambda$lambda$lambda$lambda$lambda_8($post), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_2 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = $composer_2.changed_ga7h3f_k$(dispatchReceiver_0);
        // Inline function 'kotlin.let' call
        var it_0 = $composer_2.rememberedValue_4dg93v_k$();
        var tmp_2;
        if (invalid_0 || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_0 = ComposableLambda$invoke$ref_23(dispatchReceiver_0);
          $composer_2.updateRememberedValue_l1wh71_k$(value_0);
          tmp_2 = value_0;
        } else {
          tmp_2 = it_0;
        }
        var tmp$ret$7 = tmp_2;
        p($this$div, 'mt-05', null, tmp$ret$7, $composer_0, 3120 | 14 & $dirty, 2);
        var tmp_3;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_3 = Unit_getInstance();
        }
        tmp_0 = tmp_3;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_24(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda$lambda_5($discussions$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C*186@9418L754,186@9388L784:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(1610036936, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous>.<anonymous> (App.kt:185)');
        }
        var _iterator__ex2g4s = invoke$lambda_3($discussions$delegate).iterator_jk1svi_k$();
        while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
          var post = _iterator__ex2g4s.next_20eer_k$();
          // Inline function 'kotlin.run' call
          var dispatchReceiver = rememberComposableLambda(173183288, true, App$start$lambda$lambda$lambda$lambda$lambda_4(post), $composer_0, 54);
          // Inline function 'androidx.compose.runtime.remember' call
          var $composer_1 = $composer_0;
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_1;
          if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
            var value = ComposableLambda$invoke$ref_24(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value);
            tmp_1 = value;
          } else {
            tmp_1 = it;
          }
          var tmp$ret$0 = tmp_1;
          div($this$div, 'glass card', null, tmp$ret$0, $composer_0, 3120 | 14 & $dirty, 2);
        }
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_getInstance();
        }
        tmp_0 = tmp_2;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_25(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda$lambda_2(this$0, $discussions$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C161@7864L1280,161@7829L1315,184@9290L946,184@9249L987:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(-86502525, $dirty, -1, 'App.start.<anonymous>.<anonymous>.<anonymous> (App.kt:161)');
        }
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(537247761, true, App$start$lambda$lambda$lambda$lambda_4(this$0, $discussions$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = ComposableLambda$invoke$ref_20(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp$ret$0 = tmp_1;
        div($this$div, 'glass card mb-2', null, tmp$ret$0, $composer_0, 3120 | 14 & $dirty, 2);
        // Inline function 'kotlin.run' call
        var dispatchReceiver_0 = rememberComposableLambda(1610036936, true, App$start$lambda$lambda$lambda$lambda_5($discussions$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_2 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = $composer_2.changed_ga7h3f_k$(dispatchReceiver_0);
        // Inline function 'kotlin.let' call
        var it_0 = $composer_2.rememberedValue_4dg93v_k$();
        var tmp_2;
        if (invalid_0 || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_0 = ComposableLambda$invoke$ref_25(dispatchReceiver_0);
          $composer_2.updateRememberedValue_l1wh71_k$(value_0);
          tmp_2 = value_0;
        } else {
          tmp_2 = it_0;
        }
        var tmp$ret$7 = tmp_2;
        div($this$div, 'd-flex flex-col gap-1', null, tmp$ret$7, $composer_0, 3120 | 14 & $dirty, 2);
        var tmp_3;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_3 = Unit_getInstance();
        }
        tmp_0 = tmp_3;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_26(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda$lambda_0($currentUser$delegate, $currentTab$delegate, this$0, $notes$delegate, $discussions$delegate) {
    return function ($this$div, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(376215085, $dirty, -1, 'App.start.<anonymous>.<anonymous> (App.kt:89)');
        }
        if (invoke$lambda($currentUser$delegate) == null) {
          $composer_0.startReplaceGroup_5hh8aj_k$(-2040990701);
          sourceInformation($composer_0, '90@3677L346');
          div($this$div, 'glass card text-center p-4', null, ComposableSingletons$AppKt_getInstance().lambda$1210904790__1, $composer_0, 3120 | 14 & $dirty, 2);
          $composer_0.endReplaceGroup_ek144q_k$();
        } else {
          $composer_0.startReplaceGroup_5hh8aj_k$(-2040419898);
          sourceInformation($composer_0, '98@4134L465,98@4097L502');
          // Inline function 'kotlin.run' call
          var dispatchReceiver = rememberComposableLambda(718062559, true, App$start$lambda$lambda$lambda_0($currentTab$delegate), $composer_0, 54);
          // Inline function 'androidx.compose.runtime.remember' call
          var $composer_1 = $composer_0;
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
          // Inline function 'kotlin.let' call
          var it = $composer_1.rememberedValue_4dg93v_k$();
          var tmp_1;
          if (invalid || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
            var value = ComposableLambda$invoke$ref_5(dispatchReceiver);
            $composer_1.updateRememberedValue_l1wh71_k$(value);
            tmp_1 = value;
          } else {
            tmp_1 = it;
          }
          var tmp$ret$0 = tmp_1;
          div($this$div, 'd-flex gap-1 mb-2', null, tmp$ret$0, $composer_0, 3120 | 14 & $dirty, 2);
          if (invoke$lambda_5($currentTab$delegate) === 'notes') {
            $composer_0.startReplaceGroup_5hh8aj_k$(-2039903159);
            sourceInformation($composer_0, '108@4698L3000,108@4694L3004');
            // Inline function 'kotlin.run' call
            var dispatchReceiver_0 = rememberComposableLambda(-1991026310, true, App$start$lambda$lambda$lambda_1(this$0, $notes$delegate), $composer_0, 54);
            // Inline function 'androidx.compose.runtime.remember' call
            var $composer_2 = $composer_0;
            // Inline function 'androidx.compose.runtime.cache' call
            var invalid_0 = $composer_2.changed_ga7h3f_k$(dispatchReceiver_0);
            // Inline function 'kotlin.let' call
            var it_0 = $composer_2.rememberedValue_4dg93v_k$();
            var tmp_2;
            if (invalid_0 || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
              var value_0 = ComposableLambda$invoke$ref_16(dispatchReceiver_0);
              $composer_2.updateRememberedValue_l1wh71_k$(value_0);
              tmp_2 = value_0;
            } else {
              tmp_2 = it_0;
            }
            var tmp$ret$7 = tmp_2;
            div($this$div, null, null, tmp$ret$7, $composer_0, 3072 | 14 & $dirty, 3);
            $composer_0.endReplaceGroup_ek144q_k$();
          } else {
            $composer_0.startReplaceGroup_5hh8aj_k$(-2036884937);
            sourceInformation($composer_0, '160@7799L2463,160@7795L2467');
            // Inline function 'kotlin.run' call
            var dispatchReceiver_1 = rememberComposableLambda(-86502525, true, App$start$lambda$lambda$lambda_2(this$0, $discussions$delegate), $composer_0, 54);
            // Inline function 'androidx.compose.runtime.remember' call
            var $composer_3 = $composer_0;
            // Inline function 'androidx.compose.runtime.cache' call
            var invalid_1 = $composer_3.changed_ga7h3f_k$(dispatchReceiver_1);
            // Inline function 'kotlin.let' call
            var it_1 = $composer_3.rememberedValue_4dg93v_k$();
            var tmp_3;
            if (invalid_1 || it_1 === Companion_getInstance().get_Empty_i9b85g_k$()) {
              var value_1 = ComposableLambda$invoke$ref_26(dispatchReceiver_1);
              $composer_3.updateRememberedValue_l1wh71_k$(value_1);
              tmp_3 = value_1;
            } else {
              tmp_3 = it_1;
            }
            var tmp$ret$14 = tmp_3;
            div($this$div, null, null, tmp$ret$14, $composer_0, 3072 | 14 & $dirty, 3);
            $composer_0.endReplaceGroup_ek144q_k$();
          }
          $composer_0.endReplaceGroup_ek144q_k$();
        }
        var tmp_4;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_4 = Unit_getInstance();
        }
        tmp_0 = tmp_4;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function ComposableLambda$invoke$ref_27(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function App$start$lambda(this$0) {
    return function ($this$root, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C23@713L1190,49@1962L33,50@2021L46,51@2099L52,52@2182L36,55@2320L441,69@2829L712,69@2797L744,88@3612L6704,88@3583L6733:App.kt');
      var $dirty = $changed;
      var tmp;
      if (($changed & 6) === 0) {
        $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$root) : $composer_0.changedInstance_s1wkiy_k$($this$root)) ? 4 : 2);
        tmp = Unit_getInstance();
      }
      var tmp_0;
      if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
        if (isTraceInProgress()) {
          traceEventStart(1126255263, $dirty, -1, 'App.start.<anonymous> (App.kt:23)');
        }
        rawHtml($this$root, '<style>\n                .d-flex { display: flex; }\n                .flex-col { flex-direction: column; }\n                .items-center { align-items: center; }\n                .gap-1 { gap: 1rem; }\n                .gap-20 { gap: 20px; }\n                .justify-between { justify-content: space-between; }\n                .text-center { text-align: center; }\n                .p-4 { padding: 4rem; }\n                .mb-2 { margin-bottom: 2rem; }\n                .mt-1 { margin-top: 1rem; }\n                .mt-05 { margin-top: 0.5rem; }\n                .m-0 { margin: 0; }\n                .text-gray { color: #D3D3D3; }\n                .text-dark-gray { color: #808080; }\n                .text-red { color: #ef4444; }\n                .bg-red-light { background: rgba(239, 68, 68, 0.2); }\n                .font-600 { font-weight: 600; }\n                .text-sm { font-size: 0.8rem; }\n                .text-md { font-size: 0.9rem; }\n                .btn-delete { padding: 0.3rem 0.8rem; }\n                .self-start { align-self: flex-start; }\n                .text-none { text-decoration: none; }\n                .text-primary { color: var(--primary); }\n            <\/style>', null, $composer_0, 48 | 14 & $dirty, 2);
        sourceInformationMarkerStart($composer_0, -410400, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_1;
        if (false || it === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value = mutableStateOf(null);
          $composer_0.updateRememberedValue_l1wh71_k$(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp0_group = tmp_1;
        sourceInformationMarkerEnd($composer_0);
        var currentUser$delegate = tmp0_group;
        sourceInformationMarkerStart($composer_0, -408499, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_0 = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_2;
        if (false || it_0 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_0 = mutableStateOf(emptyList());
          $composer_0.updateRememberedValue_l1wh71_k$(value_0);
          tmp_2 = value_0;
        } else {
          tmp_2 = it_0;
        }
        var tmp1_group = tmp_2;
        sourceInformationMarkerEnd($composer_0);
        var notes$delegate = tmp1_group;
        sourceInformationMarkerStart($composer_0, -405997, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_1 = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_3;
        if (false || it_1 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_1 = mutableStateOf(emptyList());
          $composer_0.updateRememberedValue_l1wh71_k$(value_1);
          tmp_3 = value_1;
        } else {
          tmp_3 = it_1;
        }
        var tmp2_group = tmp_3;
        sourceInformationMarkerEnd($composer_0);
        var discussions$delegate = tmp2_group;
        sourceInformationMarkerStart($composer_0, -403357, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_2 = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_4;
        if (false || it_2 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_2 = mutableStateOf('notes');
          $composer_0.updateRememberedValue_l1wh71_k$(value_2);
          tmp_4 = value_2;
        } else {
          tmp_4 = it_2;
        }
        var tmp3_group = tmp_4;
        sourceInformationMarkerEnd($composer_0);
        var currentTab$delegate = tmp3_group;
        sourceInformationMarkerStart($composer_0, -398536, 'CC(remember):App.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_0.changedInstance_s1wkiy_k$(this$0);
        // Inline function 'kotlin.let' call
        var it_3 = $composer_0.rememberedValue_4dg93v_k$();
        var tmp_5;
        if (invalid || it_3 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_3 = App$start$lambda$slambda_0(this$0, currentUser$delegate, notes$delegate, discussions$delegate, null);
          $composer_0.updateRememberedValue_l1wh71_k$(value_3);
          tmp_5 = value_3;
        } else {
          tmp_5 = it_3;
        }
        var tmp4_group = tmp_5;
        sourceInformationMarkerEnd($composer_0);
        launch(this$0.scope_1, VOID, VOID, tmp4_group);
        // Inline function 'kotlin.run' call
        var dispatchReceiver = rememberComposableLambda(-1815715731, true, App$start$lambda$lambda(currentUser$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_1 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = $composer_1.changed_ga7h3f_k$(dispatchReceiver);
        // Inline function 'kotlin.let' call
        var it_4 = $composer_1.rememberedValue_4dg93v_k$();
        var tmp_6;
        if (invalid_0 || it_4 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_4 = ComposableLambda$invoke$ref_2(dispatchReceiver);
          $composer_1.updateRememberedValue_l1wh71_k$(value_4);
          tmp_6 = value_4;
        } else {
          tmp_6 = it_4;
        }
        var tmp$ret$20 = tmp_6;
        nav($this$root, 'navbar glass', null, tmp$ret$20, $composer_0, 3120 | 14 & $dirty, 2);
        // Inline function 'kotlin.run' call
        var dispatchReceiver_0 = rememberComposableLambda(376215085, true, App$start$lambda$lambda_0(currentUser$delegate, currentTab$delegate, this$0, notes$delegate, discussions$delegate), $composer_0, 54);
        // Inline function 'androidx.compose.runtime.remember' call
        var $composer_2 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_1 = $composer_2.changed_ga7h3f_k$(dispatchReceiver_0);
        // Inline function 'kotlin.let' call
        var it_5 = $composer_2.rememberedValue_4dg93v_k$();
        var tmp_7;
        if (invalid_1 || it_5 === Companion_getInstance().get_Empty_i9b85g_k$()) {
          var value_5 = ComposableLambda$invoke$ref_27(dispatchReceiver_0);
          $composer_2.updateRememberedValue_l1wh71_k$(value_5);
          tmp_7 = value_5;
        } else {
          tmp_7 = it_5;
        }
        var tmp$ret$27 = tmp_7;
        div($this$root, 'container', null, tmp$ret$27, $composer_0, 3120 | 14 & $dirty, 2);
        var tmp_8;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_8 = Unit_getInstance();
        }
        tmp_0 = tmp_8;
      } else {
        $composer_0.skipToGroupEnd_lh3zi2_k$();
        tmp_0 = Unit_getInstance();
      }
      return Unit_getInstance();
    };
  }
  function App() {
    Application.call(this);
    var tmp = this;
    // Inline function 'dev.kilua.rpc.getService' call
    // Inline function 'dev.kilua.rpc.getService' call
    var tmp_0;
    if (getKClass(AppService).equals(getKClass(AppService))) {
      var tmp_1 = new AppServiceImpl(null, null);
      tmp_0 = isInterface(tmp_1, AppService) ? tmp_1 : THROW_CCE();
    } else {
      throw IllegalArgumentException_init_$Create$('Unknown service ' + toString(getKClass(AppService)));
    }
    tmp.appService_1 = tmp_0;
    this.scope_1 = MainScope();
  }
  protoOf(App).start_fyv442_k$ = function () {
    root('root', VOID, ComposableLambda$invoke$ref(composableLambdaInstance(1126255263, true, App$start$lambda(this))));
  };
  function main() {
    _init_properties_App_kt__fk8usv();
    startApplication(App$_init_$ref_dfliw4(), []);
  }
  function App$stableprop_getter() {
    return App$stable;
  }
  function ComposableLambda$invoke$ref_28(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function ComposableSingletons$AppKt$lambda$1863277179$lambda($this$div, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformation($composer_0, 'C71@2901L23:App.kt');
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
    if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
      if (isTraceInProgress()) {
        traceEventStart(1863277179, $dirty, -1, 'ComposableSingletons$AppKt.lambda$1863277179.<anonymous> (App.kt:71)');
      }
      textNode($this$div, 'Kilua Notes', $composer_0, 48 | 14 & $dirty);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    return Unit_getInstance();
  }
  function ComposableLambda$invoke$ref_29(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function ComposableSingletons$AppKt$lambda$1423674711$lambda($this$a, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformation($composer_0, 'C77@3244L18:App.kt');
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$a) : $composer_0.changedInstance_s1wkiy_k$($this$a)) ? 4 : 2);
    if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
      if (isTraceInProgress()) {
        traceEventStart(1423674711, $dirty, -1, 'ComposableSingletons$AppKt.lambda$1423674711.<anonymous> (App.kt:77)');
      }
      textNode($this$a, 'Logout', $composer_0, 48 | 14 & $dirty);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    return Unit_getInstance();
  }
  function ComposableLambda$invoke$ref_30(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function ComposableSingletons$AppKt$lambda$981898720$lambda($this$a, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformation($composer_0, 'C81@3432L29:App.kt');
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$a) : $composer_0.changedInstance_s1wkiy_k$($this$a)) ? 4 : 2);
    if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
      if (isTraceInProgress()) {
        traceEventStart(981898720, $dirty, -1, 'ComposableSingletons$AppKt.lambda$981898720.<anonymous> (App.kt:81)');
      }
      textNode($this$a, 'Login with Google', $composer_0, 48 | 14 & $dirty);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    return Unit_getInstance();
  }
  function ComposableLambda$invoke$ref_31(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function ComposableSingletons$AppKt$lambda$_335720428$lambda_jfq2q2($this$h2, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformation($composer_0, 'C91@3754L45:App.kt');
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$h2) : $composer_0.changedInstance_s1wkiy_k$($this$h2)) ? 4 : 2);
    if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
      if (isTraceInProgress()) {
        traceEventStart(-335720428, $dirty, -1, 'ComposableSingletons$AppKt.lambda$-335720428.<anonymous> (App.kt:91)');
      }
      textNode($this$h2, 'Secure Notes & Global Discussions', $composer_0, 48 | 14 & $dirty);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    return Unit_getInstance();
  }
  function ComposableLambda$invoke$ref_32(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function ComposableSingletons$AppKt$lambda$1235161540$lambda($this$p, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformation($composer_0, 'C93@3884L91:App.kt');
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$p) : $composer_0.changedInstance_s1wkiy_k$($this$p)) ? 4 : 2);
    if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
      if (isTraceInProgress()) {
        traceEventStart(1235161540, $dirty, -1, 'ComposableSingletons$AppKt.lambda$1235161540.<anonymous> (App.kt:93)');
      }
      textNode($this$p, 'Login to create your private notes and participate in the community discussion.', $composer_0, 48 | 14 & $dirty);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    return Unit_getInstance();
  }
  function ComposableLambda$invoke$ref_33(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function ComposableSingletons$AppKt$lambda$1210904790$lambda($this$div, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformation($composer_0, 'C91@3749L52,92@3826L175:App.kt');
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$div) : $composer_0.changedInstance_s1wkiy_k$($this$div)) ? 4 : 2);
    if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
      if (isTraceInProgress()) {
        traceEventStart(1210904790, $dirty, -1, 'ComposableSingletons$AppKt.lambda$1210904790.<anonymous> (App.kt:91)');
      }
      h2($this$div, null, null, ComposableSingletons$AppKt_getInstance().lambda$_335720428_hujefq_1, $composer_0, 3072 | 14 & $dirty, 3);
      p($this$div, 'text-gray', null, ComposableSingletons$AppKt_getInstance().lambda$1235161540__1, $composer_0, 3120 | 14 & $dirty, 2);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    return Unit_getInstance();
  }
  function ComposableLambda$invoke$ref_34(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function ComposableSingletons$AppKt$lambda$2044966344$lambda($this$h3, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformation($composer_0, 'C111@4843L20:App.kt');
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$h3) : $composer_0.changedInstance_s1wkiy_k$($this$h3)) ? 4 : 2);
    if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
      if (isTraceInProgress()) {
        traceEventStart(2044966344, $dirty, -1, 'ComposableSingletons$AppKt.lambda$2044966344.<anonymous> (App.kt:111)');
      }
      textNode($this$h3, 'Add Note', $composer_0, 48 | 14 & $dirty);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    return Unit_getInstance();
  }
  function ComposableLambda$invoke$ref_35(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function ComposableSingletons$AppKt$lambda$_1932580015$lambda_9p7sf0($this$h3, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformation($composer_0, 'C162@7903L31:App.kt');
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$h3) : $composer_0.changedInstance_s1wkiy_k$($this$h3)) ? 4 : 2);
    if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
      if (isTraceInProgress()) {
        traceEventStart(-1932580015, $dirty, -1, 'ComposableSingletons$AppKt.lambda$-1932580015.<anonymous> (App.kt:162)');
      }
      textNode($this$h3, 'Join the discussion', $composer_0, 48 | 14 & $dirty);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    return Unit_getInstance();
  }
  function ComposableLambda$invoke$ref_36(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function ComposableSingletons$AppKt$lambda$_841285509$lambda_9fkg68($this$span, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformation($composer_0, 'C192@9851L20:App.kt');
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$span) : $composer_0.changedInstance_s1wkiy_k$($this$span)) ? 4 : 2);
    if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
      if (isTraceInProgress()) {
        traceEventStart(-841285509, $dirty, -1, 'ComposableSingletons$AppKt.lambda$-841285509.<anonymous> (App.kt:192)');
      }
      textNode($this$span, 'Just now', $composer_0, 48 | 14 & $dirty);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    return Unit_getInstance();
  }
  function ComposableSingletons$AppKt() {
    ComposableSingletons$AppKt_instance = this;
    var tmp = this;
    tmp.lambda$1863277179__1 = ComposableLambda$invoke$ref_28(composableLambdaInstance(1863277179, false, ComposableSingletons$AppKt$lambda$1863277179$lambda));
    var tmp_0 = this;
    tmp_0.lambda$1423674711__1 = ComposableLambda$invoke$ref_29(composableLambdaInstance(1423674711, false, ComposableSingletons$AppKt$lambda$1423674711$lambda));
    var tmp_1 = this;
    tmp_1.lambda$981898720__1 = ComposableLambda$invoke$ref_30(composableLambdaInstance(981898720, false, ComposableSingletons$AppKt$lambda$981898720$lambda));
    var tmp_2 = this;
    tmp_2.lambda$_335720428_hujefq_1 = ComposableLambda$invoke$ref_31(composableLambdaInstance(-335720428, false, ComposableSingletons$AppKt$lambda$_335720428$lambda_jfq2q2));
    var tmp_3 = this;
    tmp_3.lambda$1235161540__1 = ComposableLambda$invoke$ref_32(composableLambdaInstance(1235161540, false, ComposableSingletons$AppKt$lambda$1235161540$lambda));
    var tmp_4 = this;
    tmp_4.lambda$1210904790__1 = ComposableLambda$invoke$ref_33(composableLambdaInstance(1210904790, false, ComposableSingletons$AppKt$lambda$1210904790$lambda));
    var tmp_5 = this;
    tmp_5.lambda$2044966344__1 = ComposableLambda$invoke$ref_34(composableLambdaInstance(2044966344, false, ComposableSingletons$AppKt$lambda$2044966344$lambda));
    var tmp_6 = this;
    tmp_6.lambda$_1932580015_39spuq_1 = ComposableLambda$invoke$ref_35(composableLambdaInstance(-1932580015, false, ComposableSingletons$AppKt$lambda$_1932580015$lambda_9p7sf0));
    var tmp_7 = this;
    tmp_7.lambda$_841285509_dmfuxg_1 = ComposableLambda$invoke$ref_36(composableLambdaInstance(-841285509, false, ComposableSingletons$AppKt$lambda$_841285509$lambda_9fkg68));
  }
  protoOf(ComposableSingletons$AppKt).get_lambda$1863277179_bwlb4k_k$ = function () {
    return this.lambda$1863277179__1;
  };
  protoOf(ComposableSingletons$AppKt).get_lambda$1423674711_7rwkpb_k$ = function () {
    return this.lambda$1423674711__1;
  };
  protoOf(ComposableSingletons$AppKt).get_lambda$981898720_1dsvv3_k$ = function () {
    return this.lambda$981898720__1;
  };
  protoOf(ComposableSingletons$AppKt).get_lambda$_335720428_y7itf8_k$ = function () {
    return this.lambda$_335720428_hujefq_1;
  };
  protoOf(ComposableSingletons$AppKt).get_lambda$1235161540_3bty9d_k$ = function () {
    return this.lambda$1235161540__1;
  };
  protoOf(ComposableSingletons$AppKt).get_lambda$1210904790_l9xvw8_k$ = function () {
    return this.lambda$1210904790__1;
  };
  protoOf(ComposableSingletons$AppKt).get_lambda$2044966344_akgyap_k$ = function () {
    return this.lambda$2044966344__1;
  };
  protoOf(ComposableSingletons$AppKt).get_lambda$_1932580015_h7bn52_k$ = function () {
    return this.lambda$_1932580015_39spuq_1;
  };
  protoOf(ComposableSingletons$AppKt).get_lambda$_841285509_h0cg6a_k$ = function () {
    return this.lambda$_841285509_dmfuxg_1;
  };
  var ComposableSingletons$AppKt_instance;
  function ComposableSingletons$AppKt_getInstance() {
    if (ComposableSingletons$AppKt_instance == null)
      new ComposableSingletons$AppKt();
    return ComposableSingletons$AppKt_instance;
  }
  function App$_init_$ref_dfliw4() {
    return constructCallableReference(function () {
      return new App();
    }, 0, 0, '/App.<init>|<init>(){}[0]', '<init>');
  }
  var properties_initialized_App_kt_kalemn;
  function _init_properties_App_kt__fk8usv() {
    if (!properties_initialized_App_kt_kalemn) {
      properties_initialized_App_kt_kalemn = true;
      App$stable = dev_kilua_Application$stableprop_getter();
    }
  }
  function mainWrapper() {
    main();
  }
  function test() {
    root('test', VOID, ComposableSingletons$TestKt_getInstance().lambda$_1507044987_trarpf_1);
  }
  function ComposableLambda$invoke$ref_37(p0) {
    return constructCallableReference(function (p0_0, p1, p2) {
      p0.invoke_c9vvnb_k$(p0_0, p1, p2);
      return Unit_getInstance();
    }, 3, 0, 'androidx.compose.runtime.internal/ComposableLambda.invoke|invoke(kotlin.Any?;androidx.compose.runtime.Composer;kotlin.Int){}[0]', VOID, [p0]);
  }
  function ComposableSingletons$TestKt$lambda$_1507044987$lambda_2px05q($this$root, $composer, $changed) {
    var $composer_0 = $composer;
    sourceInformation($composer_0, 'C5@95L54:Test.kt');
    var $dirty = $changed;
    if (($changed & 6) === 0)
      $dirty = $dirty | ((($changed & 8) === 0 ? $composer_0.changed_ga7h3f_k$($this$root) : $composer_0.changedInstance_s1wkiy_k$($this$root)) ? 4 : 2);
    if ($composer_0.shouldExecute_4fplh_k$(!(($dirty & 19) === 18), $dirty & 1)) {
      if (isTraceInProgress()) {
        traceEventStart(-1507044987, $dirty, -1, 'ComposableSingletons$TestKt.lambda$-1507044987.<anonymous> (Test.kt:5)');
      }
      rawHtml($this$root, '<style> .d-flex { display: flex; } <\/style>', null, $composer_0, 48 | 14 & $dirty, 2);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.skipToGroupEnd_lh3zi2_k$();
    }
    return Unit_getInstance();
  }
  function ComposableSingletons$TestKt() {
    ComposableSingletons$TestKt_instance = this;
    var tmp = this;
    tmp.lambda$_1507044987_trarpf_1 = ComposableLambda$invoke$ref_37(composableLambdaInstance(-1507044987, false, ComposableSingletons$TestKt$lambda$_1507044987$lambda_2px05q));
  }
  protoOf(ComposableSingletons$TestKt).get_lambda$_1507044987_fsmy2p_k$ = function () {
    return this.lambda$_1507044987_trarpf_1;
  };
  var ComposableSingletons$TestKt_instance;
  function ComposableSingletons$TestKt_getInstance() {
    if (ComposableSingletons$TestKt_instance == null)
      new ComposableSingletons$TestKt();
    return ComposableSingletons$TestKt_instance;
  }
  //region block: post-declaration
  protoOf($serializer).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  protoOf($serializer_0).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  protoOf($serializer_1).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  protoOf($serializer_2).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  //endregion
  //region block: init
  rpc_AppServiceImpl$stable = 8;
  rpc_AppServiceManager$stable = 0;
  models_User_$serializer$stable = 0;
  models_User$stable = 0;
  models_Note_$serializer$stable = 0;
  models_Note$stable = 0;
  models_Discussion_$serializer$stable = 0;
  models_Discussion$stable = 0;
  models_UserSession_$serializer$stable = 0;
  models_UserSession$stable = 0;
  //endregion
  mainWrapper();
  return _;
}));

//# sourceMappingURL=kilua-ktor-mongo.js.map
