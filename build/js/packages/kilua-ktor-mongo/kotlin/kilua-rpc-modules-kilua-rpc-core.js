(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlin-kotlin-stdlib.js', './kotlin-js.js', './kotlinx-serialization-kotlinx-serialization-json.js', './kotlinx-coroutines-core.js', './kotlin-js-core.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlin-kotlin-stdlib.js'), require('./kotlin-js.js'), require('./kotlinx-serialization-kotlinx-serialization-json.js'), require('./kotlinx-coroutines-core.js'), require('./kotlin-js-core.js'));
  else {
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'kilua-rpc-modules-kilua-rpc-core'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'kilua-rpc-modules-kilua-rpc-core'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kilua-rpc-modules-kilua-rpc-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kilua-rpc-modules-kilua-rpc-core'.");
    }
    if (typeof globalThis['kotlin-js'] === 'undefined') {
      throw new Error("Error loading module 'kilua-rpc-modules-kilua-rpc-core'. Its dependency 'kotlin-js' was not found. Please, check whether 'kotlin-js' is loaded prior to 'kilua-rpc-modules-kilua-rpc-core'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined') {
      throw new Error("Error loading module 'kilua-rpc-modules-kilua-rpc-core'. Its dependency 'kotlinx-serialization-kotlinx-serialization-json' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-json' is loaded prior to 'kilua-rpc-modules-kilua-rpc-core'.");
    }
    if (typeof globalThis['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'kilua-rpc-modules-kilua-rpc-core'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'kilua-rpc-modules-kilua-rpc-core'.");
    }
    if (typeof globalThis['kotlin-js-core'] === 'undefined') {
      throw new Error("Error loading module 'kilua-rpc-modules-kilua-rpc-core'. Its dependency 'kotlin-js-core' was not found. Please, check whether 'kotlin-js-core' is loaded prior to 'kilua-rpc-modules-kilua-rpc-core'.");
    }
    globalThis['kilua-rpc-modules-kilua-rpc-core'] = factory(typeof globalThis['kilua-rpc-modules-kilua-rpc-core'] === 'undefined' ? {} : globalThis['kilua-rpc-modules-kilua-rpc-core'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlin-js'], globalThis['kotlinx-serialization-kotlinx-serialization-json'], globalThis['kotlinx-coroutines-core'], globalThis['kotlin-js-core']);
  }
}(function (_, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_kotlin, kotlin_org_jetbrains_kotlin_wrappers_kotlin_js, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_kotlin_wrappers_kotlin_js_core) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var parse = JSON.parse;
  var StringSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var get_nullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t;
  var ArrayListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s1;
  var emptyList = kotlin_kotlin.$_$.y7;
  var protoOf = kotlin_kotlin.$_$.ue;
  var objectCreate = kotlin_kotlin.$_$.te;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.z2;
  var lazy = kotlin_kotlin.$_$.zj;
  var initMetadataForCompanion = kotlin_kotlin.$_$.sd;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var THROW_CCE = kotlin_kotlin.$_$.cj;
  var UnknownFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var IntSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u1;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var initMetadataForObject = kotlin_kotlin.$_$.xd;
  var VOID = kotlin_kotlin.$_$.d;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d2;
  var toString = kotlin_kotlin.$_$.xe;
  var getStringHashCode = kotlin_kotlin.$_$.pd;
  var hashCode = kotlin_kotlin.$_$.qd;
  var equals = kotlin_kotlin.$_$.jd;
  var makeAssociatedObjectMapES5 = kotlin_kotlin.$_$.b;
  var SerializableWith = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o2;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  var IllegalArgumentException = kotlin_kotlin.$_$.si;
  var THROW_IAE = kotlin_kotlin.$_$.dj;
  var enumEntries = kotlin_kotlin.$_$.sb;
  var Unit_getInstance = kotlin_kotlin.$_$.w2;
  var Enum = kotlin_kotlin.$_$.pi;
  var Exception = kotlin_kotlin.$_$.ri;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.e4;
  var captureStack = kotlin_kotlin.$_$.yc;
  var getKClass = kotlin_kotlin.$_$.lf;
  var PolymorphicSerializer_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a2;
  var Exception_init_$Init$_0 = kotlin_kotlin.$_$.d4;
  var buildClassSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h1;
  var Companion_getInstance = kotlin_kotlin.$_$.r2;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.n;
  var Result = kotlin_kotlin.$_$.aj;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.k4;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.p4;
  var NullPointerException_init_$Create$ = kotlin_kotlin.$_$.v4;
  var UnsupportedOperationException_init_$Create$ = kotlin_kotlin.$_$.e5;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.r4;
  var NoSuchElementException_init_$Create$ = kotlin_kotlin.$_$.u4;
  var ArithmeticException_init_$Create$ = kotlin_kotlin.$_$.y3;
  var NumberFormatException_init_$Create$ = kotlin_kotlin.$_$.w4;
  var ClassCastException_init_$Create$ = kotlin_kotlin.$_$.z3;
  var RuntimeException_init_$Create$ = kotlin_kotlin.$_$.a5;
  var Exception_init_$Create$ = kotlin_kotlin.$_$.f4;
  var createFailure = kotlin_kotlin.$_$.uj;
  var arrayOf = kotlin_kotlin.$_$.qj;
  var createKType = kotlin_kotlin.$_$.jf;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v2;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l2;
  var isInterface = kotlin_kotlin.$_$.ge;
  var Result__exceptionOrNull_impl_p6xea9 = kotlin_kotlin.$_$.o;
  var RuntimeException = kotlin_kotlin.$_$.bj;
  var ArithmeticException = kotlin_kotlin.$_$.hi;
  var NoSuchElementException = kotlin_kotlin.$_$.wi;
  var ClassCastException = kotlin_kotlin.$_$.ji;
  var NullPointerException = kotlin_kotlin.$_$.xi;
  var NumberFormatException = kotlin_kotlin.$_$.yi;
  var UnsupportedOperationException = kotlin_kotlin.$_$.oj;
  var ConcurrentModificationException = kotlin_kotlin.$_$.mi;
  var IndexOutOfBoundsException = kotlin_kotlin.$_$.ui;
  var IllegalStateException = kotlin_kotlin.$_$.ti;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.q;
  var BooleanSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i;
  var getBooleanHashCode = kotlin_kotlin.$_$.ld;
  var initMetadataForInterface = kotlin_kotlin.$_$.vd;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.bk;
  var CoroutineImpl = kotlin_kotlin.$_$.nb;
  var drop = kotlin_kotlin.$_$.fg;
  var checkIndexOverflow = kotlin_kotlin.$_$.d7;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.xa;
  var awaitPromiseLike = kotlin_org_jetbrains_kotlin_wrappers_kotlin_js.$_$.a;
  var ensureNotNull = kotlin_kotlin.$_$.vj;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.td;
  var CancellationException = kotlin_kotlin.$_$.wa;
  var SerializersModuleBuilder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f2;
  var overwriteWith = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j2;
  var Json = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.b;
  var Default_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.a;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.m3;
  var getKClassFromExpression = kotlin_kotlin.$_$.kf;
  var Pair = kotlin_kotlin.$_$.zi;
  var Regex_init_$Create$ = kotlin_kotlin.$_$.v3;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.ub;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.y;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.t;
  var initMetadataForLambda = kotlin_kotlin.$_$.wd;
  var constructCallableReference = kotlin_kotlin.$_$.gd;
  var intercepted = kotlin_kotlin.$_$.za;
  var SafeContinuation_init_$Create$ = kotlin_kotlin.$_$.u3;
  var _ChannelResult___get_isSuccess__impl__odq1z9 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a;
  var returnIfSuspended = kotlin_kotlin.$_$.a3;
  var delay = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.h;
  var toString_0 = kotlin_kotlin.$_$.ik;
  var Dispatchers_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.b;
  var SupervisorJob = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.w;
  var CoroutineScope_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.s;
  var Channel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.j;
  var Long = kotlin_kotlin.$_$.vi;
  var JsNumbers_getInstance = kotlin_org_jetbrains_kotlin_wrappers_kotlin_js_core.$_$.a;
  var extendThrowable = kotlin_kotlin.$_$.kd;
  var SuspendFunction1 = kotlin_kotlin.$_$.ob;
  var KProperty0 = kotlin_kotlin.$_$.pf;
  var getPropertyCallableRef = kotlin_kotlin.$_$.od;
  var startsWith = kotlin_kotlin.$_$.ah;
  var lazy_0 = kotlin_kotlin.$_$.ak;
  //endregion
  //region block: pre-declaration
  initMetadataForCompanion(Companion);
  initMetadataForObject($serializer, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(JsonRpcRequest, 'JsonRpcRequest', JsonRpcRequest_init_$Create$, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, $serializer_getInstance]));
  initMetadataForCompanion(Companion_0);
  initMetadataForObject($serializer_0, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(JsonRpcResponse, 'JsonRpcResponse', JsonRpcResponse, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, $serializer_getInstance_0]));
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(HttpMethod, 'HttpMethod', VOID, Enum);
  initMetadataForClass(ServiceException, 'ServiceException', VOID, Exception);
  initMetadataForCompanion(Companion_2, VOID, [SerializerFactory]);
  initMetadataForClass(AbstractServiceException, 'AbstractServiceException', VOID, Exception, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, Companion_getInstance_3]));
  initMetadataForClass(SecurityException, 'SecurityException', VOID, Exception);
  initMetadataForCompanion(Companion_3);
  initMetadataForObject($serializer_1, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(RemoteFilter, 'RemoteFilter', VOID, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, $serializer_getInstance_1]));
  initMetadataForCompanion(Companion_4);
  initMetadataForObject($serializer_2, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(RemoteSorter, 'RemoteSorter', VOID, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, $serializer_getInstance_2]));
  initMetadataForCompanion(Companion_5, VOID, [SerializerFactory]);
  initMetadataForClass($serializer_3, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(RemoteData, 'RemoteData', RemoteData, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, Companion_getInstance_6]));
  initMetadataForClass(ResultSerializer, 'ResultSerializer', VOID, VOID, [KSerializer]);
  initMetadataForCompanion(Companion_6);
  initMetadataForObject($serializer_4, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ExceptionJson, 'ExceptionJson', ExceptionJson, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, $serializer_getInstance_3]));
  function getCall(function_0) {
    return null;
  }
  function requireCall(function_0) {
    var tmp0_elvis_lhs = this.getCall_sa32vh_k$(function_0);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.error' call
      var message = 'Function not specified!';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  initMetadataForInterface(RpcServiceMgr, 'RpcServiceMgr');
  initMetadataForCoroutine($jsonRpcCallCOROUTINE$, CoroutineImpl);
  initMetadataForClass(CallAgent, 'CallAgent', CallAgent, VOID, VOID, [4]);
  initMetadataForClass(ContentTypeException, 'ContentTypeException', VOID, Exception);
  initMetadataForCoroutine($receiveOrNullCOROUTINE$, CoroutineImpl);
  initMetadataForCoroutine($exceptionHelperCOROUTINE$, CoroutineImpl);
  initMetadataForClass(RpcAgent, 'RpcAgent', VOID, VOID, VOID, [1]);
  initMetadataForObject(RpcSerialization, 'RpcSerialization');
  initMetadataForClass(RpcServiceManagerJs, 'RpcServiceManagerJs', RpcServiceManagerJs, VOID, [RpcServiceMgr]);
  initMetadataForLambda(Socket$onWsEvent$slambda, CoroutineImpl, VOID, [1]);
  initMetadataForCoroutine($connectCOROUTINE$, CoroutineImpl);
  initMetadataForCoroutine($receiveCOROUTINE$, CoroutineImpl);
  initMetadataForClass(Socket, 'Socket', Socket, VOID, VOID, [2, 0]);
  initMetadataForClass(SocketClosedException, 'SocketClosedException', VOID, Error);
  //endregion
  function _get_$childSerializers__r2zwns($this) {
    return $this.$childSerializers_1;
  }
  function JsonRpcRequest$Companion$$childSerializers$_anonymous__ilp35k() {
    return new ArrayListSerializer(get_nullable(StringSerializer_getInstance()));
  }
  function JsonRpcRequest_init_$Init$($this) {
    // Inline function 'kotlin.collections.listOf' call
    var tmp$ret$0 = emptyList();
    JsonRpcRequest.call($this, 0, '', tmp$ret$0);
    return $this;
  }
  function JsonRpcRequest_init_$Create$() {
    return JsonRpcRequest_init_$Init$(objectCreate(protoOf(JsonRpcRequest)));
  }
  function Companion() {
    Companion_instance = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.$childSerializers_1 = [null, null, lazy(tmp_0, JsonRpcRequest$Companion$$childSerializers$_anonymous__ilp35k), null];
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
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('dev.kilua.rpc.JsonRpcRequest', this, 4);
    tmp0_serialDesc.addElement_5pzumi_k$('id', false);
    tmp0_serialDesc.addElement_5pzumi_k$('method', false);
    tmp0_serialDesc.addElement_5pzumi_k$('params', false);
    tmp0_serialDesc.addElement_5pzumi_k$('jsonrpc', true);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer).serialize_8zuane_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    var tmp2_cached = Companion_getInstance_0().$childSerializers_1;
    tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.id_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.method_1);
    tmp1_output.encodeSerializableElement_isqxcl_k$(tmp0_desc, 2, tmp2_cached[2].get_value_j01efc_k$(), value.params_1);
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 3) ? true : !(value.jsonrpc_1 === '2.0')) {
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 3, value.jsonrpc_1);
    }
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_8zuane_k$(encoder, value instanceof JsonRpcRequest ? value : THROW_CCE());
  };
  protoOf($serializer).deserialize_sy6x50_k$ = function (decoder) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = 0;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    var tmp9_cached = Companion_getInstance_0().$childSerializers_1;
    if (tmp8_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 2, tmp9_cached[2].get_value_j01efc_k$(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 2, tmp9_cached[2].get_value_j01efc_k$(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.endStructure_1xqz0n_k$(tmp0_desc);
    return JsonRpcRequest_init_$Create$_0(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer).childSerializers_5ghqw5_k$ = function () {
    var tmp0_cached = Companion_getInstance_0().$childSerializers_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [IntSerializer_getInstance(), StringSerializer_getInstance(), tmp0_cached[2].get_value_j01efc_k$(), StringSerializer_getInstance()];
  };
  var $serializer_instance;
  function $serializer_getInstance() {
    if ($serializer_instance == null)
      new $serializer();
    return $serializer_instance;
  }
  function JsonRpcRequest_init_$Init$_0(seen0, id, method, params, jsonrpc, serializationConstructorMarker, $this) {
    if (!(7 === (7 & seen0))) {
      throwMissingFieldException(seen0, 7, $serializer_getInstance().descriptor_1);
    }
    $this.id_1 = id;
    $this.method_1 = method;
    $this.params_1 = params;
    if (0 === (seen0 & 8))
      $this.jsonrpc_1 = '2.0';
    else
      $this.jsonrpc_1 = jsonrpc;
    return $this;
  }
  function JsonRpcRequest_init_$Create$_0(seen0, id, method, params, jsonrpc, serializationConstructorMarker) {
    return JsonRpcRequest_init_$Init$_0(seen0, id, method, params, jsonrpc, serializationConstructorMarker, objectCreate(protoOf(JsonRpcRequest)));
  }
  function JsonRpcRequest(id, method, params, jsonrpc) {
    Companion_getInstance_0();
    jsonrpc = jsonrpc === VOID ? '2.0' : jsonrpc;
    this.id_1 = id;
    this.method_1 = method;
    this.params_1 = params;
    this.jsonrpc_1 = jsonrpc;
  }
  protoOf(JsonRpcRequest).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(JsonRpcRequest).get_method_gl8esq_k$ = function () {
    return this.method_1;
  };
  protoOf(JsonRpcRequest).get_params_hy4oen_k$ = function () {
    return this.params_1;
  };
  protoOf(JsonRpcRequest).get_jsonrpc_kequp8_k$ = function () {
    return this.jsonrpc_1;
  };
  protoOf(JsonRpcRequest).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(JsonRpcRequest).component2_7eebsb_k$ = function () {
    return this.method_1;
  };
  protoOf(JsonRpcRequest).component3_7eebsa_k$ = function () {
    return this.params_1;
  };
  protoOf(JsonRpcRequest).component4_7eebs9_k$ = function () {
    return this.jsonrpc_1;
  };
  protoOf(JsonRpcRequest).copy_pa0tne_k$ = function (id, method, params, jsonrpc) {
    return new JsonRpcRequest(id, method, params, jsonrpc);
  };
  protoOf(JsonRpcRequest).copy$default_ko9ka1_k$ = function (id, method, params, jsonrpc, $super) {
    id = id === VOID ? this.id_1 : id;
    method = method === VOID ? this.method_1 : method;
    params = params === VOID ? this.params_1 : params;
    jsonrpc = jsonrpc === VOID ? this.jsonrpc_1 : jsonrpc;
    return $super === VOID ? this.copy_pa0tne_k$(id, method, params, jsonrpc) : $super.copy_pa0tne_k$.call(this, id, method, params, jsonrpc);
  };
  protoOf(JsonRpcRequest).toString = function () {
    return 'JsonRpcRequest(id=' + this.id_1 + ', method=' + this.method_1 + ', params=' + toString(this.params_1) + ', jsonrpc=' + this.jsonrpc_1 + ')';
  };
  protoOf(JsonRpcRequest).hashCode = function () {
    var result = this.id_1;
    result = imul(result, 31) + getStringHashCode(this.method_1) | 0;
    result = imul(result, 31) + hashCode(this.params_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.jsonrpc_1) | 0;
    return result;
  };
  protoOf(JsonRpcRequest).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof JsonRpcRequest))
      return false;
    if (!(this.id_1 === other.id_1))
      return false;
    if (!(this.method_1 === other.method_1))
      return false;
    if (!equals(this.params_1, other.params_1))
      return false;
    if (!(this.jsonrpc_1 === other.jsonrpc_1))
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
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('dev.kilua.rpc.JsonRpcResponse', this, 6);
    tmp0_serialDesc.addElement_5pzumi_k$('id', true);
    tmp0_serialDesc.addElement_5pzumi_k$('result', true);
    tmp0_serialDesc.addElement_5pzumi_k$('error', true);
    tmp0_serialDesc.addElement_5pzumi_k$('exceptionType', true);
    tmp0_serialDesc.addElement_5pzumi_k$('exceptionJson', true);
    tmp0_serialDesc.addElement_5pzumi_k$('jsonrpc', true);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer_0).serialize_x3ggn4_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 0) ? true : !(value.id_1 == null)) {
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 0, IntSerializer_getInstance(), value.id_1);
    }
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 1) ? true : !(value.result_1 == null)) {
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 1, StringSerializer_getInstance(), value.result_1);
    }
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 2) ? true : !(value.error_1 == null)) {
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 2, StringSerializer_getInstance(), value.error_1);
    }
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 3) ? true : !(value.exceptionType_1 == null)) {
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 3, StringSerializer_getInstance(), value.exceptionType_1);
    }
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 4) ? true : !(value.exceptionJson_1 == null)) {
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 4, StringSerializer_getInstance(), value.exceptionJson_1);
    }
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 5) ? true : !(value.jsonrpc_1 === '2.0')) {
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 5, value.jsonrpc_1);
    }
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer_0).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_x3ggn4_k$(encoder, value instanceof JsonRpcResponse ? value : THROW_CCE());
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
    var tmp8_local4 = null;
    var tmp9_local5 = null;
    var tmp10_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp10_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, IntSerializer_getInstance(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 4, StringSerializer_getInstance(), tmp8_local4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
      tmp9_local5 = tmp10_input.decodeStringElement_3oenpg_k$(tmp0_desc, 5);
      tmp3_bitMask0 = tmp3_bitMask0 | 32;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp10_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, IntSerializer_getInstance(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 4, StringSerializer_getInstance(), tmp8_local4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          case 5:
            tmp9_local5 = tmp10_input.decodeStringElement_3oenpg_k$(tmp0_desc, 5);
            tmp3_bitMask0 = tmp3_bitMask0 | 32;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp10_input.endStructure_1xqz0n_k$(tmp0_desc);
    return JsonRpcResponse_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, null);
  };
  protoOf($serializer_0).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer_0).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(IntSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), StringSerializer_getInstance()];
  };
  var $serializer_instance_0;
  function $serializer_getInstance_0() {
    if ($serializer_instance_0 == null)
      new $serializer_0();
    return $serializer_instance_0;
  }
  function JsonRpcResponse_init_$Init$(seen0, id, result, error, exceptionType, exceptionJson, jsonrpc, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_0().descriptor_1);
    }
    if (0 === (seen0 & 1))
      $this.id_1 = null;
    else
      $this.id_1 = id;
    if (0 === (seen0 & 2))
      $this.result_1 = null;
    else
      $this.result_1 = result;
    if (0 === (seen0 & 4))
      $this.error_1 = null;
    else
      $this.error_1 = error;
    if (0 === (seen0 & 8))
      $this.exceptionType_1 = null;
    else
      $this.exceptionType_1 = exceptionType;
    if (0 === (seen0 & 16))
      $this.exceptionJson_1 = null;
    else
      $this.exceptionJson_1 = exceptionJson;
    if (0 === (seen0 & 32))
      $this.jsonrpc_1 = '2.0';
    else
      $this.jsonrpc_1 = jsonrpc;
    return $this;
  }
  function JsonRpcResponse_init_$Create$(seen0, id, result, error, exceptionType, exceptionJson, jsonrpc, serializationConstructorMarker) {
    return JsonRpcResponse_init_$Init$(seen0, id, result, error, exceptionType, exceptionJson, jsonrpc, serializationConstructorMarker, objectCreate(protoOf(JsonRpcResponse)));
  }
  function JsonRpcResponse(id, result, error, exceptionType, exceptionJson, jsonrpc) {
    Companion_getInstance_1();
    id = id === VOID ? null : id;
    result = result === VOID ? null : result;
    error = error === VOID ? null : error;
    exceptionType = exceptionType === VOID ? null : exceptionType;
    exceptionJson = exceptionJson === VOID ? null : exceptionJson;
    jsonrpc = jsonrpc === VOID ? '2.0' : jsonrpc;
    this.id_1 = id;
    this.result_1 = result;
    this.error_1 = error;
    this.exceptionType_1 = exceptionType;
    this.exceptionJson_1 = exceptionJson;
    this.jsonrpc_1 = jsonrpc;
  }
  protoOf(JsonRpcResponse).get_id_kntnx8_k$ = function () {
    return this.id_1;
  };
  protoOf(JsonRpcResponse).get_result_iyg5d2_k$ = function () {
    return this.result_1;
  };
  protoOf(JsonRpcResponse).get_error_iqzvfj_k$ = function () {
    return this.error_1;
  };
  protoOf(JsonRpcResponse).get_exceptionType_3c6874_k$ = function () {
    return this.exceptionType_1;
  };
  protoOf(JsonRpcResponse).get_exceptionJson_3bzpv2_k$ = function () {
    return this.exceptionJson_1;
  };
  protoOf(JsonRpcResponse).get_jsonrpc_kequp8_k$ = function () {
    return this.jsonrpc_1;
  };
  protoOf(JsonRpcResponse).component1_7eebsc_k$ = function () {
    return this.id_1;
  };
  protoOf(JsonRpcResponse).component2_7eebsb_k$ = function () {
    return this.result_1;
  };
  protoOf(JsonRpcResponse).component3_7eebsa_k$ = function () {
    return this.error_1;
  };
  protoOf(JsonRpcResponse).component4_7eebs9_k$ = function () {
    return this.exceptionType_1;
  };
  protoOf(JsonRpcResponse).component5_7eebs8_k$ = function () {
    return this.exceptionJson_1;
  };
  protoOf(JsonRpcResponse).component6_7eebs7_k$ = function () {
    return this.jsonrpc_1;
  };
  protoOf(JsonRpcResponse).copy_vl6xik_k$ = function (id, result, error, exceptionType, exceptionJson, jsonrpc) {
    return new JsonRpcResponse(id, result, error, exceptionType, exceptionJson, jsonrpc);
  };
  protoOf(JsonRpcResponse).copy$default_omuzw9_k$ = function (id, result, error, exceptionType, exceptionJson, jsonrpc, $super) {
    id = id === VOID ? this.id_1 : id;
    result = result === VOID ? this.result_1 : result;
    error = error === VOID ? this.error_1 : error;
    exceptionType = exceptionType === VOID ? this.exceptionType_1 : exceptionType;
    exceptionJson = exceptionJson === VOID ? this.exceptionJson_1 : exceptionJson;
    jsonrpc = jsonrpc === VOID ? this.jsonrpc_1 : jsonrpc;
    return $super === VOID ? this.copy_vl6xik_k$(id, result, error, exceptionType, exceptionJson, jsonrpc) : $super.copy_vl6xik_k$.call(this, id, result, error, exceptionType, exceptionJson, jsonrpc);
  };
  protoOf(JsonRpcResponse).toString = function () {
    return 'JsonRpcResponse(id=' + this.id_1 + ', result=' + this.result_1 + ', error=' + this.error_1 + ', exceptionType=' + this.exceptionType_1 + ', exceptionJson=' + this.exceptionJson_1 + ', jsonrpc=' + this.jsonrpc_1 + ')';
  };
  protoOf(JsonRpcResponse).hashCode = function () {
    var result = this.id_1 == null ? 0 : this.id_1;
    result = imul(result, 31) + (this.result_1 == null ? 0 : getStringHashCode(this.result_1)) | 0;
    result = imul(result, 31) + (this.error_1 == null ? 0 : getStringHashCode(this.error_1)) | 0;
    result = imul(result, 31) + (this.exceptionType_1 == null ? 0 : getStringHashCode(this.exceptionType_1)) | 0;
    result = imul(result, 31) + (this.exceptionJson_1 == null ? 0 : getStringHashCode(this.exceptionJson_1)) | 0;
    result = imul(result, 31) + getStringHashCode(this.jsonrpc_1) | 0;
    return result;
  };
  protoOf(JsonRpcResponse).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof JsonRpcResponse))
      return false;
    if (!(this.id_1 == other.id_1))
      return false;
    if (!(this.result_1 == other.result_1))
      return false;
    if (!(this.error_1 == other.error_1))
      return false;
    if (!(this.exceptionType_1 == other.exceptionType_1))
      return false;
    if (!(this.exceptionJson_1 == other.exceptionJson_1))
      return false;
    if (!(this.jsonrpc_1 === other.jsonrpc_1))
      return false;
    return true;
  };
  var HttpMethod_GET_instance;
  var HttpMethod_POST_instance;
  var HttpMethod_PUT_instance;
  var HttpMethod_DELETE_instance;
  var HttpMethod_OPTIONS_instance;
  function Companion_1() {
    Companion_instance_1 = this;
  }
  protoOf(Companion_1).fromStringOrNull_7ojv1n_k$ = function (txt) {
    var tmp;
    try {
      tmp = valueOf(txt);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp_0 = null;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  var Companion_instance_1;
  function Companion_getInstance_2() {
    HttpMethod_initEntries();
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  function values() {
    return [HttpMethod_GET_getInstance(), HttpMethod_POST_getInstance(), HttpMethod_PUT_getInstance(), HttpMethod_DELETE_getInstance(), HttpMethod_OPTIONS_getInstance()];
  }
  function valueOf(value) {
    switch (value) {
      case 'GET':
        return HttpMethod_GET_getInstance();
      case 'POST':
        return HttpMethod_POST_getInstance();
      case 'PUT':
        return HttpMethod_PUT_getInstance();
      case 'DELETE':
        return HttpMethod_DELETE_getInstance();
      case 'OPTIONS':
        return HttpMethod_OPTIONS_getInstance();
      default:
        HttpMethod_initEntries();
        THROW_IAE('No enum constant dev.kilua.rpc.HttpMethod.' + value);
        break;
    }
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var HttpMethod_entriesInitialized;
  function HttpMethod_initEntries() {
    if (HttpMethod_entriesInitialized)
      return Unit_getInstance();
    HttpMethod_entriesInitialized = true;
    HttpMethod_GET_instance = new HttpMethod('GET', 0);
    HttpMethod_POST_instance = new HttpMethod('POST', 1);
    HttpMethod_PUT_instance = new HttpMethod('PUT', 2);
    HttpMethod_DELETE_instance = new HttpMethod('DELETE', 3);
    HttpMethod_OPTIONS_instance = new HttpMethod('OPTIONS', 4);
    Companion_getInstance_2();
  }
  var $ENTRIES;
  function HttpMethod(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ServiceException(message) {
    Exception_init_$Init$(message, this);
    captureStack(this, ServiceException);
  }
  function _get_$cachedSerializer__te6jhj($this) {
    return $this.$cachedSerializer$delegate_1.get_value_j01efc_k$();
  }
  function AbstractServiceException$Companion$_anonymous__57qtot() {
    var tmp = getKClass(AbstractServiceException);
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$0 = [];
    return PolymorphicSerializer_init_$Create$(tmp, tmp$ret$0);
  }
  function Companion_2() {
    Companion_instance_2 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.$cachedSerializer$delegate_1 = lazy(tmp_0, AbstractServiceException$Companion$_anonymous__57qtot);
  }
  protoOf(Companion_2).serializer_9w0wvi_k$ = function () {
    return _get_$cachedSerializer__te6jhj(this);
  };
  protoOf(Companion_2).serializer_nv39qc_k$ = function (typeParamsSerializers) {
    return this.serializer_9w0wvi_k$();
  };
  var Companion_instance_2;
  function Companion_getInstance_3() {
    if (Companion_instance_2 == null)
      new Companion_2();
    return Companion_instance_2;
  }
  function AbstractServiceException_init_$Init$(seen0, serializationConstructorMarker, $this) {
    Exception_init_$Init$_0($this);
    return $this;
  }
  function AbstractServiceException_init_$Create$(seen0, serializationConstructorMarker) {
    var tmp = AbstractServiceException_init_$Init$(seen0, serializationConstructorMarker, objectCreate(protoOf(AbstractServiceException)));
    captureStack(tmp, AbstractServiceException_init_$Create$);
    return tmp;
  }
  function AbstractServiceException() {
    Companion_getInstance_3();
    Exception_init_$Init$('AbstractServiceException', this);
    captureStack(this, AbstractServiceException);
  }
  function SecurityException(message) {
    Exception_init_$Init$(message, this);
    captureStack(this, SecurityException);
  }
  function Companion_3() {
    Companion_instance_3 = this;
  }
  protoOf(Companion_3).serializer_9w0wvi_k$ = function () {
    return $serializer_getInstance_1();
  };
  var Companion_instance_3;
  function Companion_getInstance_4() {
    if (Companion_instance_3 == null)
      new Companion_3();
    return Companion_instance_3;
  }
  function $serializer_1() {
    $serializer_instance_1 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('dev.kilua.rpc.RemoteFilter', this, 3);
    tmp0_serialDesc.addElement_5pzumi_k$('field', false);
    tmp0_serialDesc.addElement_5pzumi_k$('type', false);
    tmp0_serialDesc.addElement_5pzumi_k$('value', false);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer_1).serialize_sppedy_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.field_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.type_1);
    tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 2, StringSerializer_getInstance(), value.value_1);
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer_1).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_sppedy_k$(encoder, value instanceof RemoteFilter ? value : THROW_CCE());
  };
  protoOf($serializer_1).deserialize_sy6x50_k$ = function (decoder) {
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
      tmp6_local2 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
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
            tmp6_local2 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp7_input.endStructure_1xqz0n_k$(tmp0_desc);
    return RemoteFilter_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
  };
  protoOf($serializer_1).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer_1).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance())];
  };
  var $serializer_instance_1;
  function $serializer_getInstance_1() {
    if ($serializer_instance_1 == null)
      new $serializer_1();
    return $serializer_instance_1;
  }
  function RemoteFilter_init_$Init$(seen0, field, type, value, serializationConstructorMarker, $this) {
    if (!(7 === (7 & seen0))) {
      throwMissingFieldException(seen0, 7, $serializer_getInstance_1().descriptor_1);
    }
    $this.field_1 = field;
    $this.type_1 = type;
    $this.value_1 = value;
    return $this;
  }
  function RemoteFilter_init_$Create$(seen0, field, type, value, serializationConstructorMarker) {
    return RemoteFilter_init_$Init$(seen0, field, type, value, serializationConstructorMarker, objectCreate(protoOf(RemoteFilter)));
  }
  function RemoteFilter(field, type, value) {
    Companion_getInstance_4();
    this.field_1 = field;
    this.type_1 = type;
    this.value_1 = value;
  }
  protoOf(RemoteFilter).get_field_irdnf5_k$ = function () {
    return this.field_1;
  };
  protoOf(RemoteFilter).get_type_wovaf7_k$ = function () {
    return this.type_1;
  };
  protoOf(RemoteFilter).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  protoOf(RemoteFilter).component1_7eebsc_k$ = function () {
    return this.field_1;
  };
  protoOf(RemoteFilter).component2_7eebsb_k$ = function () {
    return this.type_1;
  };
  protoOf(RemoteFilter).component3_7eebsa_k$ = function () {
    return this.value_1;
  };
  protoOf(RemoteFilter).copy_fqvatu_k$ = function (field, type, value) {
    return new RemoteFilter(field, type, value);
  };
  protoOf(RemoteFilter).copy$default_xwiz00_k$ = function (field, type, value, $super) {
    field = field === VOID ? this.field_1 : field;
    type = type === VOID ? this.type_1 : type;
    value = value === VOID ? this.value_1 : value;
    return $super === VOID ? this.copy_fqvatu_k$(field, type, value) : $super.copy_fqvatu_k$.call(this, field, type, value);
  };
  protoOf(RemoteFilter).toString = function () {
    return 'RemoteFilter(field=' + this.field_1 + ', type=' + this.type_1 + ', value=' + this.value_1 + ')';
  };
  protoOf(RemoteFilter).hashCode = function () {
    var result = getStringHashCode(this.field_1);
    result = imul(result, 31) + getStringHashCode(this.type_1) | 0;
    result = imul(result, 31) + (this.value_1 == null ? 0 : getStringHashCode(this.value_1)) | 0;
    return result;
  };
  protoOf(RemoteFilter).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RemoteFilter))
      return false;
    if (!(this.field_1 === other.field_1))
      return false;
    if (!(this.type_1 === other.type_1))
      return false;
    if (!(this.value_1 == other.value_1))
      return false;
    return true;
  };
  function Companion_4() {
    Companion_instance_4 = this;
  }
  protoOf(Companion_4).serializer_9w0wvi_k$ = function () {
    return $serializer_getInstance_2();
  };
  var Companion_instance_4;
  function Companion_getInstance_5() {
    if (Companion_instance_4 == null)
      new Companion_4();
    return Companion_instance_4;
  }
  function $serializer_2() {
    $serializer_instance_2 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('dev.kilua.rpc.RemoteSorter', this, 2);
    tmp0_serialDesc.addElement_5pzumi_k$('field', false);
    tmp0_serialDesc.addElement_5pzumi_k$('dir', false);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer_2).serialize_nkhtu1_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.field_1);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.dir_1);
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer_2).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_nkhtu1_k$(encoder, value instanceof RemoteSorter ? value : THROW_CCE());
  };
  protoOf($serializer_2).deserialize_sy6x50_k$ = function (decoder) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp6_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.endStructure_1xqz0n_k$(tmp0_desc);
    return RemoteSorter_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_2).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer_2).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), StringSerializer_getInstance()];
  };
  var $serializer_instance_2;
  function $serializer_getInstance_2() {
    if ($serializer_instance_2 == null)
      new $serializer_2();
    return $serializer_instance_2;
  }
  function RemoteSorter_init_$Init$(seen0, field, dir, serializationConstructorMarker, $this) {
    if (!(3 === (3 & seen0))) {
      throwMissingFieldException(seen0, 3, $serializer_getInstance_2().descriptor_1);
    }
    $this.field_1 = field;
    $this.dir_1 = dir;
    return $this;
  }
  function RemoteSorter_init_$Create$(seen0, field, dir, serializationConstructorMarker) {
    return RemoteSorter_init_$Init$(seen0, field, dir, serializationConstructorMarker, objectCreate(protoOf(RemoteSorter)));
  }
  function RemoteSorter(field, dir) {
    Companion_getInstance_5();
    this.field_1 = field;
    this.dir_1 = dir;
  }
  protoOf(RemoteSorter).get_field_irdnf5_k$ = function () {
    return this.field_1;
  };
  protoOf(RemoteSorter).get_dir_18j7bw_k$ = function () {
    return this.dir_1;
  };
  protoOf(RemoteSorter).component1_7eebsc_k$ = function () {
    return this.field_1;
  };
  protoOf(RemoteSorter).component2_7eebsb_k$ = function () {
    return this.dir_1;
  };
  protoOf(RemoteSorter).copy_plwnsl_k$ = function (field, dir) {
    return new RemoteSorter(field, dir);
  };
  protoOf(RemoteSorter).copy$default_brg035_k$ = function (field, dir, $super) {
    field = field === VOID ? this.field_1 : field;
    dir = dir === VOID ? this.dir_1 : dir;
    return $super === VOID ? this.copy_plwnsl_k$(field, dir) : $super.copy_plwnsl_k$.call(this, field, dir);
  };
  protoOf(RemoteSorter).toString = function () {
    return 'RemoteSorter(field=' + this.field_1 + ', dir=' + this.dir_1 + ')';
  };
  protoOf(RemoteSorter).hashCode = function () {
    var result = getStringHashCode(this.field_1);
    result = imul(result, 31) + getStringHashCode(this.dir_1) | 0;
    return result;
  };
  protoOf(RemoteSorter).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RemoteSorter))
      return false;
    if (!(this.field_1 === other.field_1))
      return false;
    if (!(this.dir_1 === other.dir_1))
      return false;
    return true;
  };
  function $serializer_init_$Init$(typeSerial0, $this) {
    $serializer_3.call($this);
    $this.typeSerial0__1 = typeSerial0;
    return $this;
  }
  function $serializer_init_$Create$(typeSerial0) {
    return $serializer_init_$Init$(typeSerial0, objectCreate(protoOf($serializer_3)));
  }
  function _get_typeSerial0__3fdbgx($this) {
    return $this.typeSerial0__1;
  }
  function Companion_5() {
    Companion_instance_5 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('dev.kilua.rpc.RemoteData', null, 3);
    tmp0_serialDesc.addElement_5pzumi_k$('data', true);
    tmp0_serialDesc.addElement_5pzumi_k$('last_page', true);
    tmp0_serialDesc.addElement_5pzumi_k$('last_row', true);
    this.$cachedDescriptor_1 = tmp0_serialDesc;
  }
  protoOf(Companion_5).serializer_qelnde_k$ = function (typeSerial0) {
    return $serializer_init_$Create$(typeSerial0);
  };
  protoOf(Companion_5).serializer_nv39qc_k$ = function (typeParamsSerializers) {
    return this.serializer_qelnde_k$(typeParamsSerializers[0]);
  };
  protoOf(Companion_5).get_$cachedDescriptor_3xtnpw_k$ = function () {
    return this.$cachedDescriptor_1;
  };
  var Companion_instance_5;
  function Companion_getInstance_6() {
    if (Companion_instance_5 == null)
      new Companion_5();
    return Companion_instance_5;
  }
  function $serializer_3() {
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('dev.kilua.rpc.RemoteData', this, 3);
    tmp0_serialDesc.addElement_5pzumi_k$('data', true);
    tmp0_serialDesc.addElement_5pzumi_k$('last_page', true);
    tmp0_serialDesc.addElement_5pzumi_k$('last_row', true);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer_3).serialize_vs90ew_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    var tmp;
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 0)) {
      tmp = true;
    } else {
      // Inline function 'kotlin.collections.listOf' call
      var tmp$ret$0 = emptyList();
      tmp = !equals(value.data_1, tmp$ret$0);
    }
    if (tmp) {
      tmp1_output.encodeSerializableElement_isqxcl_k$(tmp0_desc, 0, new ArrayListSerializer(this.typeSerial0__1), value.data_1);
    }
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 1) ? true : !(value.lastPage_1 === 0)) {
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 1, value.lastPage_1);
    }
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 2) ? true : !(value.lastRow_1 == null)) {
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 2, IntSerializer_getInstance(), value.lastRow_1);
    }
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer_3).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_vs90ew_k$(encoder, value instanceof RemoteData ? value : THROW_CCE());
  };
  protoOf($serializer_3).deserialize_sy6x50_k$ = function (decoder) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = 0;
    var tmp6_local2 = null;
    var tmp7_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp7_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp7_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 0, new ArrayListSerializer(this.typeSerial0__1), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp7_input.decodeIntElement_941u6a_k$(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, IntSerializer_getInstance(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp7_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp7_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 0, new ArrayListSerializer(this.typeSerial0__1), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp7_input.decodeIntElement_941u6a_k$(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, IntSerializer_getInstance(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp7_input.endStructure_1xqz0n_k$(tmp0_desc);
    return RemoteData_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
  };
  protoOf($serializer_3).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer_3).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [new ArrayListSerializer(this.typeSerial0__1), IntSerializer_getInstance(), get_nullable(IntSerializer_getInstance())];
  };
  protoOf($serializer_3).typeParametersSerializers_fr94fx_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.typeSerial0__1];
  };
  function RemoteData_init_$Init$(seen0, data, lastPage, lastRow, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, Companion_getInstance_6().$cachedDescriptor_1);
    }
    if (0 === (seen0 & 1)) {
      var tmp = $this;
      // Inline function 'kotlin.collections.listOf' call
      tmp.data_1 = emptyList();
    } else
      $this.data_1 = data;
    if (0 === (seen0 & 2))
      $this.lastPage_1 = 0;
    else
      $this.lastPage_1 = lastPage;
    if (0 === (seen0 & 4))
      $this.lastRow_1 = null;
    else
      $this.lastRow_1 = lastRow;
    return $this;
  }
  function RemoteData_init_$Create$(seen0, data, lastPage, lastRow, serializationConstructorMarker) {
    return RemoteData_init_$Init$(seen0, data, lastPage, lastRow, serializationConstructorMarker, objectCreate(protoOf(RemoteData)));
  }
  function RemoteData(data, lastPage, lastRow) {
    Companion_getInstance_6();
    var tmp;
    if (data === VOID) {
      // Inline function 'kotlin.collections.listOf' call
      tmp = emptyList();
    } else {
      tmp = data;
    }
    data = tmp;
    lastPage = lastPage === VOID ? 0 : lastPage;
    lastRow = lastRow === VOID ? null : lastRow;
    this.data_1 = data;
    this.lastPage_1 = lastPage;
    this.lastRow_1 = lastRow;
  }
  protoOf(RemoteData).get_data_wokkxf_k$ = function () {
    return this.data_1;
  };
  protoOf(RemoteData).get_lastPage_f37aq6_k$ = function () {
    return this.lastPage_1;
  };
  protoOf(RemoteData).get_lastRow_hiv7f_k$ = function () {
    return this.lastRow_1;
  };
  protoOf(RemoteData).component1_7eebsc_k$ = function () {
    return this.data_1;
  };
  protoOf(RemoteData).component2_7eebsb_k$ = function () {
    return this.lastPage_1;
  };
  protoOf(RemoteData).component3_7eebsa_k$ = function () {
    return this.lastRow_1;
  };
  protoOf(RemoteData).copy_8gyxgk_k$ = function (data, lastPage, lastRow) {
    return new RemoteData(data, lastPage, lastRow);
  };
  protoOf(RemoteData).copy$default_yklzwi_k$ = function (data, lastPage, lastRow, $super) {
    data = data === VOID ? this.data_1 : data;
    lastPage = lastPage === VOID ? this.lastPage_1 : lastPage;
    lastRow = lastRow === VOID ? this.lastRow_1 : lastRow;
    return $super === VOID ? this.copy_8gyxgk_k$(data, lastPage, lastRow) : $super.copy_8gyxgk_k$.call(this, data, lastPage, lastRow);
  };
  protoOf(RemoteData).toString = function () {
    return 'RemoteData(data=' + toString(this.data_1) + ', lastPage=' + this.lastPage_1 + ', lastRow=' + this.lastRow_1 + ')';
  };
  protoOf(RemoteData).hashCode = function () {
    var result = hashCode(this.data_1);
    result = imul(result, 31) + this.lastPage_1 | 0;
    result = imul(result, 31) + (this.lastRow_1 == null ? 0 : this.lastRow_1) | 0;
    return result;
  };
  protoOf(RemoteData).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RemoteData))
      return false;
    if (!equals(this.data_1, other.data_1))
      return false;
    if (!(this.lastPage_1 === other.lastPage_1))
      return false;
    if (!(this.lastRow_1 == other.lastRow_1))
      return false;
    return true;
  };
  function HttpMethod_GET_getInstance() {
    HttpMethod_initEntries();
    return HttpMethod_GET_instance;
  }
  function HttpMethod_POST_getInstance() {
    HttpMethod_initEntries();
    return HttpMethod_POST_instance;
  }
  function HttpMethod_PUT_getInstance() {
    HttpMethod_initEntries();
    return HttpMethod_PUT_instance;
  }
  function HttpMethod_DELETE_getInstance() {
    HttpMethod_initEntries();
    return HttpMethod_DELETE_instance;
  }
  function HttpMethod_OPTIONS_getInstance() {
    HttpMethod_initEntries();
    return HttpMethod_OPTIONS_instance;
  }
  function _get_tSerializer__4018t1($this) {
    return $this.tSerializer_1;
  }
  function ResultSerializer$descriptor$lambda(this$0) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.element$default_ey7ac9_k$('value', this$0.tSerializer_1.get_descriptor_wjt6a0_k$(), VOID, true);
      $this$buildClassSerialDescriptor.element$default_ey7ac9_k$('error', buildClassSerialDescriptor('dev.kilua.rpc.ExceptionJson', []), VOID, true);
      return Unit_getInstance();
    };
  }
  function ResultSerializer(tSerializer) {
    this.tSerializer_1 = tSerializer;
    var tmp = this;
    var tmp_0 = [this.tSerializer_1.get_descriptor_wjt6a0_k$()];
    tmp.descriptor_1 = buildClassSerialDescriptor('kotlin.Result', tmp_0, ResultSerializer$descriptor$lambda(this));
  }
  protoOf(ResultSerializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf(ResultSerializer).deserialize_wct1mv_k$ = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.descriptor_1;
    var composite = decoder.beginStructure_yljocp_k$(descriptor);
    var r = null;
    $l$loop: while (true) {
      var index = composite.decodeElementIndex_bstkhp_k$(this.descriptor_1);
      var tmp;
      switch (index) {
        case 0:
          var v = composite.decodeSerializableElement$default_j0zaoi_k$(this.descriptor_1, index, this.tSerializer_1);
          // Inline function 'kotlin.Companion.success' call

          Companion_getInstance();
          var tmp$ret$2 = _Result___init__impl__xyqfz8(v);
          tmp = new Result(tmp$ret$2);
          break;
        case 1:
          var exceptionJson = composite.decodeSerializableElement$default_j0zaoi_k$(this.descriptor_1, index, Companion_getInstance_7().serializer_9w0wvi_k$());
          var tmp_0;
          if (exceptionJson.isServiceException_1) {
            Companion_getInstance();
            var tmp0_elvis_lhs = exceptionJson.message_1;
            // Inline function 'kotlin.Companion.failure' call
            var exception = new ServiceException(tmp0_elvis_lhs == null ? 'Service exception' : tmp0_elvis_lhs);
            tmp_0 = _Result___init__impl__xyqfz8(createFailure(exception));
          } else if (!(exceptionJson.serialized_1 == null)) {
            var tmp0 = RpcSerialization_getInstance().getJson$default_3d7i98_k$();
            // Inline function 'kotlinx.serialization.json.Json.decodeFromString' call
            var string = exceptionJson.serialized_1;
            // Inline function 'kotlinx.serialization.serializer' call
            var this_0 = tmp0.get_serializersModule_piitvg_k$();
            // Inline function 'kotlinx.serialization.internal.cast' call
            var this_1 = serializer(this_0, createKType(getKClass(AbstractServiceException), arrayOf([]), false));
            var tmp$ret$5 = isInterface(this_1, KSerializer) ? this_1 : THROW_CCE();
            var abstractServiceException = tmp0.decodeFromString_jwu9sq_k$(tmp$ret$5, string);
            // Inline function 'kotlin.Companion.failure' call
            Companion_getInstance();
            tmp_0 = _Result___init__impl__xyqfz8(createFailure(abstractServiceException));
          } else {
            var exception_0;
            switch (exceptionJson.type_1) {
              case 'IllegalArgumentException':
                exception_0 = IllegalArgumentException_init_$Create$(exceptionJson.message_1);
                break;
              case 'IllegalStateException':
                exception_0 = IllegalStateException_init_$Create$(exceptionJson.message_1);
                break;
              case 'NullPointerException':
                exception_0 = NullPointerException_init_$Create$(exceptionJson.message_1);
                break;
              case 'UnsupportedOperationException':
                exception_0 = UnsupportedOperationException_init_$Create$(exceptionJson.message_1);
                break;
              case 'IndexOutOfBoundsException':
                exception_0 = IndexOutOfBoundsException_init_$Create$(exceptionJson.message_1);
                break;
              case 'NoSuchElementException':
                exception_0 = NoSuchElementException_init_$Create$(exceptionJson.message_1);
                break;
              case 'ArithmeticException':
                exception_0 = ArithmeticException_init_$Create$(exceptionJson.message_1);
                break;
              case 'NumberFormatException':
                exception_0 = NumberFormatException_init_$Create$(exceptionJson.message_1);
                break;
              case 'ClassCastException':
                exception_0 = ClassCastException_init_$Create$(exceptionJson.message_1);
                break;
              case 'RuntimeException':
                exception_0 = RuntimeException_init_$Create$(exceptionJson.message_1);
                break;
              default:
                exception_0 = Exception_init_$Create$(exceptionJson.message_1);
                break;
            }
            Companion_getInstance();
            // Inline function 'kotlin.Companion.failure' call
            var exception_1 = exception_0;
            tmp_0 = _Result___init__impl__xyqfz8(createFailure(exception_1));
          }

          tmp = new Result(tmp_0);
          break;
        case -1:
          break $l$loop;
        default:
          // Inline function 'kotlin.error' call

          var message = 'Unexpected index: ' + index;
          throw IllegalStateException_init_$Create$(toString(message));
      }
      r = tmp;
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!!(r == null)) {
      var message_0 = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var result = r;
    composite.endStructure_1xqz0n_k$(descriptor);
    return result.value_1;
  };
  protoOf(ResultSerializer).deserialize_sy6x50_k$ = function (decoder) {
    return new Result(this.deserialize_wct1mv_k$(decoder));
  };
  protoOf(ResultSerializer).serialize_aycbvj_k$ = function (encoder, value) {
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.descriptor_1;
    var composite = encoder.beginStructure_yljocp_k$(descriptor);
    // Inline function 'kotlin.fold' call
    var exception = Result__exceptionOrNull_impl_p6xea9(value);
    if (exception == null) {
      var it = _Result___get_value__impl__bjfvqg(value);
      composite.encodeSerializableElement_isqxcl_k$(this.descriptor_1, 0, this.tSerializer_1, it);
    } else {
      if (exception instanceof ServiceException) {
        composite.encodeSerializableElement_isqxcl_k$(this.descriptor_1, 1, Companion_getInstance_7().serializer_9w0wvi_k$(), new ExceptionJson(exception.message, VOID, true));
      } else {
        if (exception instanceof AbstractServiceException) {
          // Inline function 'kotlinx.serialization.json.Json.encodeToString' call
          var this_0 = RpcSerialization_getInstance().getJson$default_3d7i98_k$();
          // Inline function 'kotlinx.serialization.serializer' call
          var this_1 = this_0.get_serializersModule_piitvg_k$();
          // Inline function 'kotlinx.serialization.internal.cast' call
          var this_2 = serializer(this_1, createKType(getKClass(AbstractServiceException), arrayOf([]), false));
          var tmp$ret$6 = isInterface(this_2, KSerializer) ? this_2 : THROW_CCE();
          var serialized = this_0.encodeToString_k0apqx_k$(tmp$ret$6, exception);
          composite.encodeSerializableElement_isqxcl_k$(this.descriptor_1, 1, Companion_getInstance_7().serializer_9w0wvi_k$(), new ExceptionJson(VOID, VOID, VOID, serialized));
        } else {
          var tmp;
          if (exception instanceof IllegalArgumentException) {
            tmp = 'IllegalArgumentException';
          } else {
            if (exception instanceof IllegalStateException) {
              tmp = 'IllegalStateException';
            } else {
              if (exception instanceof IndexOutOfBoundsException) {
                tmp = 'IndexOutOfBoundsException';
              } else {
                if (exception instanceof ConcurrentModificationException) {
                  tmp = 'ConcurrentModificationException';
                } else {
                  if (exception instanceof UnsupportedOperationException) {
                    tmp = 'UnsupportedOperationException';
                  } else {
                    if (exception instanceof NumberFormatException) {
                      tmp = 'NumberFormatException';
                    } else {
                      if (exception instanceof NullPointerException) {
                        tmp = 'NullPointerException';
                      } else {
                        if (exception instanceof ClassCastException) {
                          tmp = 'ClassCastException';
                        } else {
                          if (exception instanceof NoSuchElementException) {
                            tmp = 'NoSuchElementException';
                          } else {
                            if (exception instanceof ArithmeticException) {
                              tmp = 'ArithmeticException';
                            } else {
                              if (exception instanceof RuntimeException) {
                                tmp = 'RuntimeException';
                              } else {
                                tmp = null;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          var type = tmp;
          composite.encodeSerializableElement_isqxcl_k$(this.descriptor_1, 1, Companion_getInstance_7().serializer_9w0wvi_k$(), new ExceptionJson(exception.message, type));
        }
      }
    }
    composite.endStructure_1xqz0n_k$(descriptor);
  };
  protoOf(ResultSerializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_aycbvj_k$(encoder, value instanceof Result ? value.value_1 : THROW_CCE());
  };
  function Companion_6() {
    Companion_instance_6 = this;
  }
  protoOf(Companion_6).serializer_9w0wvi_k$ = function () {
    return $serializer_getInstance_3();
  };
  var Companion_instance_6;
  function Companion_getInstance_7() {
    if (Companion_instance_6 == null)
      new Companion_6();
    return Companion_instance_6;
  }
  function $serializer_4() {
    $serializer_instance_3 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('dev.kilua.rpc.ExceptionJson', this, 4);
    tmp0_serialDesc.addElement_5pzumi_k$('message', true);
    tmp0_serialDesc.addElement_5pzumi_k$('type', true);
    tmp0_serialDesc.addElement_5pzumi_k$('isServiceException', true);
    tmp0_serialDesc.addElement_5pzumi_k$('serialized', true);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer_4).serialize_u3ewp_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 0) ? true : !(value.message_1 == null)) {
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 0, StringSerializer_getInstance(), value.message_1);
    }
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 1) ? true : !(value.type_1 == null)) {
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 1, StringSerializer_getInstance(), value.type_1);
    }
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 2) ? true : !(value.isServiceException_1 === false)) {
      tmp1_output.encodeBooleanElement_ydht7q_k$(tmp0_desc, 2, value.isServiceException_1);
    }
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 3) ? true : !(value.serialized_1 == null)) {
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 3, StringSerializer_getInstance(), value.serialized_1);
    }
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer_4).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_u3ewp_k$(encoder, value instanceof ExceptionJson ? value : THROW_CCE());
  };
  protoOf($serializer_4).deserialize_sy6x50_k$ = function (decoder) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = false;
    var tmp7_local3 = null;
    var tmp8_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp8_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, StringSerializer_getInstance(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.decodeBooleanElement_vuyhtj_k$(tmp0_desc, 2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, StringSerializer_getInstance(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.decodeBooleanElement_vuyhtj_k$(tmp0_desc, 2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.endStructure_1xqz0n_k$(tmp0_desc);
    return ExceptionJson_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer_4).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer_4).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), BooleanSerializer_getInstance(), get_nullable(StringSerializer_getInstance())];
  };
  var $serializer_instance_3;
  function $serializer_getInstance_3() {
    if ($serializer_instance_3 == null)
      new $serializer_4();
    return $serializer_instance_3;
  }
  function ExceptionJson_init_$Init$(seen0, message, type, isServiceException, serialized, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_3().descriptor_1);
    }
    if (0 === (seen0 & 1))
      $this.message_1 = null;
    else
      $this.message_1 = message;
    if (0 === (seen0 & 2))
      $this.type_1 = null;
    else
      $this.type_1 = type;
    if (0 === (seen0 & 4))
      $this.isServiceException_1 = false;
    else
      $this.isServiceException_1 = isServiceException;
    if (0 === (seen0 & 8))
      $this.serialized_1 = null;
    else
      $this.serialized_1 = serialized;
    return $this;
  }
  function ExceptionJson_init_$Create$(seen0, message, type, isServiceException, serialized, serializationConstructorMarker) {
    return ExceptionJson_init_$Init$(seen0, message, type, isServiceException, serialized, serializationConstructorMarker, objectCreate(protoOf(ExceptionJson)));
  }
  function ExceptionJson(message, type, isServiceException, serialized) {
    Companion_getInstance_7();
    message = message === VOID ? null : message;
    type = type === VOID ? null : type;
    isServiceException = isServiceException === VOID ? false : isServiceException;
    serialized = serialized === VOID ? null : serialized;
    this.message_1 = message;
    this.type_1 = type;
    this.isServiceException_1 = isServiceException;
    this.serialized_1 = serialized;
  }
  protoOf(ExceptionJson).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  protoOf(ExceptionJson).get_type_wovaf7_k$ = function () {
    return this.type_1;
  };
  protoOf(ExceptionJson).get_isServiceException_iuc2jx_k$ = function () {
    return this.isServiceException_1;
  };
  protoOf(ExceptionJson).get_serialized_u29zhv_k$ = function () {
    return this.serialized_1;
  };
  protoOf(ExceptionJson).component1_7eebsc_k$ = function () {
    return this.message_1;
  };
  protoOf(ExceptionJson).component2_7eebsb_k$ = function () {
    return this.type_1;
  };
  protoOf(ExceptionJson).component3_7eebsa_k$ = function () {
    return this.isServiceException_1;
  };
  protoOf(ExceptionJson).component4_7eebs9_k$ = function () {
    return this.serialized_1;
  };
  protoOf(ExceptionJson).copy_2j3pbd_k$ = function (message, type, isServiceException, serialized) {
    return new ExceptionJson(message, type, isServiceException, serialized);
  };
  protoOf(ExceptionJson).copy$default_68dujn_k$ = function (message, type, isServiceException, serialized, $super) {
    message = message === VOID ? this.message_1 : message;
    type = type === VOID ? this.type_1 : type;
    isServiceException = isServiceException === VOID ? this.isServiceException_1 : isServiceException;
    serialized = serialized === VOID ? this.serialized_1 : serialized;
    return $super === VOID ? this.copy_2j3pbd_k$(message, type, isServiceException, serialized) : $super.copy_2j3pbd_k$.call(this, message, type, isServiceException, serialized);
  };
  protoOf(ExceptionJson).toString = function () {
    return 'ExceptionJson(message=' + this.message_1 + ', type=' + this.type_1 + ', isServiceException=' + this.isServiceException_1 + ', serialized=' + this.serialized_1 + ')';
  };
  protoOf(ExceptionJson).hashCode = function () {
    var result = this.message_1 == null ? 0 : getStringHashCode(this.message_1);
    result = imul(result, 31) + (this.type_1 == null ? 0 : getStringHashCode(this.type_1)) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.isServiceException_1) | 0;
    result = imul(result, 31) + (this.serialized_1 == null ? 0 : getStringHashCode(this.serialized_1)) | 0;
    return result;
  };
  protoOf(ExceptionJson).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ExceptionJson))
      return false;
    if (!(this.message_1 == other.message_1))
      return false;
    if (!(this.type_1 == other.type_1))
      return false;
    if (!(this.isServiceException_1 === other.isServiceException_1))
      return false;
    if (!(this.serialized_1 == other.serialized_1))
      return false;
    return true;
  };
  function RpcServiceMgr() {
  }
  function isDom() {
    return typeof document !== 'undefined' && typeof document.kilua == 'undefined';
  }
  function _set_counter__gelo1j($this, _set____db54di) {
    $this.counter_1 = _set____db54di;
  }
  function _get_counter__t0a3kl($this) {
    return $this.counter_1;
  }
  function getRequestMethod($this, httpMethod) {
    var tmp;
    switch (httpMethod.get_ordinal_ip24qg_k$()) {
      case 0:
        // Inline function 'js.reflect.unsafeCast' call

        // Inline function 'kotlin.js.unsafeCast' call

        // Inline function 'kotlin.js.asDynamic' call

        tmp = 'GET';
        break;
      case 1:
        // Inline function 'js.reflect.unsafeCast' call

        // Inline function 'kotlin.js.unsafeCast' call

        // Inline function 'kotlin.js.asDynamic' call

        tmp = 'POST';
        break;
      case 2:
        // Inline function 'js.reflect.unsafeCast' call

        // Inline function 'kotlin.js.unsafeCast' call

        // Inline function 'kotlin.js.asDynamic' call

        tmp = 'PUT';
        break;
      case 3:
        // Inline function 'js.reflect.unsafeCast' call

        // Inline function 'kotlin.js.unsafeCast' call

        // Inline function 'kotlin.js.asDynamic' call

        tmp = 'DELETE';
        break;
      case 4:
        // Inline function 'js.reflect.unsafeCast' call

        // Inline function 'kotlin.js.unsafeCast' call

        // Inline function 'kotlin.js.asDynamic' call

        tmp = 'OPTIONS';
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function getRequestInit($this, method, body, contentType) {
    var requestMethod = getRequestMethod($this, method);
    var headers = new Headers();
    headers.append('Content-Type', contentType);
    headers.append('X-Requested-With', 'XMLHttpRequest');
    // Inline function 'js.objects.unsafeJso' call
    // Inline function 'js.objects.unsafeJso' call
    // Inline function 'kotlin.apply' call
    var this_0 = {};
    jsSet(this_0, 'method', requestMethod);
    if (!(body == null)) {
      jsSet(this_0, 'body', body);
    }
    jsSet(this_0, 'headers', headers);
    // Inline function 'kotlin.js.toJsString' call
    jsSet(this_0, 'credentials', 'include');
    return this_0;
  }
  function $jsonRpcCallCOROUTINE$(_this__u8e3s4, url, data, method, requestFilter, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.url_1 = url;
    this.data_1 = data;
    this.method_1 = method;
    this.requestFilter_1 = requestFilter;
  }
  protoOf($jsonRpcCallCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(8);
            var urlPrefix = getRpcUrlPrefix();
            var tmp_0 = this;
            var _unary__edvuaz = this._this__u8e3s4__1.counter_1;
            this._this__u8e3s4__1.counter_1 = _unary__edvuaz + 1 | 0;
            tmp_0.jsonRpcRequest1__1 = new JsonRpcRequest(_unary__edvuaz, this.url_1, this.data_1);
            var tmp_1;
            if (this.method_1.equals(HttpMethod_GET_getInstance())) {
              tmp_1 = null;
            } else {
              var tmp0 = RpcSerialization_getInstance().get_plain_iwxfa9_k$();
              var value = this.jsonRpcRequest1__1;
              var this_0 = tmp0.get_serializersModule_piitvg_k$();
              var this_1 = serializer(this_0, createKType(getKClass(JsonRpcRequest), arrayOf([]), false));
              tmp_1 = tmp0.encodeToString_k0apqx_k$(isInterface(this_1, KSerializer) ? this_1 : THROW_CCE(), value);
            }

            var body = tmp_1;
            var urlAddr = urlPrefix + drop(this.url_1, 1);
            var tmp_2 = this;
            var tmp_3;
            if (this.method_1.equals(HttpMethod_GET_getInstance())) {
              var urlSearchParams = new URLSearchParams();
              var index = 0;
              var _iterator__ex2g4s = this.data_1.iterator_jk1svi_k$();
              while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
                var item = _iterator__ex2g4s.next_20eer_k$();
                var _unary__edvuaz_0 = index;
                index = _unary__edvuaz_0 + 1 | 0;
                var index_0 = checkIndexOverflow(_unary__edvuaz_0);
                if (!(item == null)) {
                  urlSearchParams.append('p' + index_0, encodeURIComponent(item));
                }
              }
              tmp_3 = urlAddr + '?' + toString(urlSearchParams);
            } else {
              tmp_3 = urlAddr;
            }

            tmp_2.fetchUrl3__1 = tmp_3;
            var requestInit = getRequestInit(this._this__u8e3s4__1, this.method_1, body, 'application/json');
            this.request4__1 = new Request(this.fetchUrl3__1, requestInit);
            var tmp0_safe_receiver = this.requestFilter_1;
            if (tmp0_safe_receiver == null) {
              this.WHEN_RESULT5__1 = null;
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(1);
              suspendResult = tmp0_safe_receiver(this.request4__1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 1:
            var tmp_4 = this;
            tmp_4.WHEN_RESULT5__1 = Unit_getInstance();
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(4);
            var this_2 = fetch(this.request4__1);
            this.set_state_rjd8d0_k$(3);
            suspendResult = awaitPromiseLike(this_2, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            this.TRY_RESULT2__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(8);
            this.set_state_rjd8d0_k$(5);
            continue $sm;
          case 4:
            this.set_exceptionState_fex74n_k$(8);
            var tmp_5 = this.get_exception_x0n6w6_k$();
            if (tmp_5 instanceof Error) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_6 = this;
              throw Exception_init_$Create$('Failed to fetch ' + this.fetchUrl3__1 + ': ' + e.message);
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 5:
            this.set_exceptionState_fex74n_k$(8);
            var response = this.TRY_RESULT2__1;
            if (response.ok && response.headers.get('content-type') === 'application/json') {
              var this_3 = response.json();
              this.set_state_rjd8d0_k$(6);
              suspendResult = awaitPromiseLike(this_3, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              if (response.ok) {
                var tmp_7 = this;
                throw new ContentTypeException('Invalid response content type: ' + response.headers.get('content-type'));
              } else {
                var tmp_8 = this;
                if (response.status === 401) {
                  throw new SecurityException(response.statusText);
                } else {
                  throw Exception_init_$Create$(response.statusText);
                }
              }
            }

          case 6:
            var ARGUMENT = suspendResult;
            var jsonRpcResponse = ensureNotNull(ARGUMENT);
            var tmp_9 = this;
            var tmp_10;
            if (!this.method_1.equals(HttpMethod_GET_getInstance()) && !(jsonRpcResponse.id === this.jsonRpcRequest1__1.get_id_kntnx8_k$())) {
              throw Exception_init_$Create$('Invalid response ID');
            } else if (!(jsonRpcResponse.error == null)) {
              if (jsonRpcResponse.exceptionType === 'dev.kilua.rpc.ServiceException') {
                throw new ServiceException(jsonRpcResponse.error);
              } else if (!(jsonRpcResponse.exceptionJson == null)) {
                var tmp0_0 = RpcSerialization_getInstance().getJson$default_3d7i98_k$();
                var string = jsonRpcResponse.exceptionJson;
                var this_4 = tmp0_0.get_serializersModule_piitvg_k$();
                var this_5 = serializer(this_4, createKType(getKClass(AbstractServiceException), arrayOf([]), false));
                throw tmp0_0.decodeFromString_jwu9sq_k$(isInterface(this_5, KSerializer) ? this_5 : THROW_CCE(), string);
              } else {
                throw Exception_init_$Create$(jsonRpcResponse.error);
              }
            } else if (!(jsonRpcResponse.result == null)) {
              tmp_10 = jsonRpcResponse.result;
            } else {
              throw Exception_init_$Create$('Invalid response');
            }

            tmp_9.WHEN_RESULT0__1 = tmp_10;
            this.set_state_rjd8d0_k$(7);
            continue $sm;
          case 7:
            return this.WHEN_RESULT0__1;
          case 8:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 8) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function CallAgent() {
    this.counter_1 = 1;
  }
  protoOf(CallAgent).jsonRpcCall_3kt90y_k$ = function (url, data, method, requestFilter, $completion) {
    var tmp = new $jsonRpcCallCOROUTINE$(this, url, data, method, requestFilter, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(CallAgent).jsonRpcCall$default_ms0kld_k$ = function (url, data, method, requestFilter, $completion, $super) {
    var tmp;
    if (data === VOID) {
      tmp = emptyList();
    } else {
      tmp = data;
    }
    data = tmp;
    method = method === VOID ? HttpMethod_POST_getInstance() : method;
    requestFilter = requestFilter === VOID ? null : requestFilter;
    return $super === VOID ? this.jsonRpcCall_3kt90y_k$(url, data, method, requestFilter, $completion) : $super.jsonRpcCall_3kt90y_k$.call(this, url, data, method, requestFilter, $completion);
  };
  function ContentTypeException(message) {
    Exception_init_$Init$(message, this);
    captureStack(this, ContentTypeException);
  }
  function $receiveOrNullCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this._this__u8e3s4__2 = _this__u8e3s4_0;
  }
  protoOf($receiveOrNullCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__2.receive_qir1pc_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.TRY_RESULT0__1 = suspendResult;
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof SocketClosedException) {
              var e = this.get_exception_x0n6w6_k$();
              var tmp_1 = this;
              console.log('Socket was closed: ' + e.get_reason_iy4m6l_k$());
              tmp_1.TRY_RESULT0__1 = null;
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              throw this.get_exception_x0n6w6_k$();
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
            return this.TRY_RESULT0__1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e_0;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_0);
        }
      }
     while (true);
  };
  function $exceptionHelperCOROUTINE$(_this__u8e3s4, block, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.block_1 = block;
  }
  protoOf($exceptionHelperCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.block_1(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.set_exceptionState_fex74n_k$(3);
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 2:
            this.set_exceptionState_fex74n_k$(3);
            var tmp_0 = this.get_exception_x0n6w6_k$();
            if (tmp_0 instanceof CancellationException) {
              var e = this.get_exception_x0n6w6_k$();
              console.log(e.message);
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            } else {
              var tmp_1 = this.get_exception_x0n6w6_k$();
              if (tmp_1 instanceof Exception) {
                var e_0 = this.get_exception_x0n6w6_k$();
                console.log(e_0.message);
                this.set_state_rjd8d0_k$(4);
                continue $sm;
              } else {
                throw this.get_exception_x0n6w6_k$();
              }
            }

          case 3:
            throw this.get_exception_x0n6w6_k$();
          case 4:
            this.set_exceptionState_fex74n_k$(3);
            return Unit_getInstance();
        }
      } catch ($p) {
        var e_1 = $p;
        if (this.get_exceptionState_wflpxn_k$() === 3) {
          throw e_1;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e_1);
        }
      }
     while (true);
  };
  function RpcAgent(serviceManager, serializersModules, requestFilter) {
    serializersModules = serializersModules === VOID ? null : serializersModules;
    requestFilter = requestFilter === VOID ? null : requestFilter;
    this.serviceManager_1 = serviceManager;
    this.requestFilter_1 = requestFilter;
    this.callAgent_1 = new CallAgent();
    this.json_1 = RpcSerialization_getInstance().getJson_rs89sx_k$(serializersModules);
  }
  protoOf(RpcAgent).get_serviceManager_dgl2dd_k$ = function () {
    return this.serviceManager_1;
  };
  protoOf(RpcAgent).get_requestFilter_fo3cfy_k$ = function () {
    return this.requestFilter_1;
  };
  protoOf(RpcAgent).get_callAgent_99050i_k$ = function () {
    return this.callAgent_1;
  };
  protoOf(RpcAgent).get_json_woos35_k$ = function () {
    return this.json_1;
  };
  protoOf(RpcAgent).receiveOrNull_tjkmdj_k$ = function (_this__u8e3s4, $completion) {
    var tmp = new $receiveOrNullCOROUTINE$(this, _this__u8e3s4, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(RpcAgent).sendOrFalse_x2zzdw_k$ = function (_this__u8e3s4, str) {
    var tmp;
    try {
      _this__u8e3s4.send_oy6aea_k$(str);
      tmp = true;
    } catch ($p) {
      var tmp_0;
      if ($p instanceof SocketClosedException) {
        var e = $p;
        console.log('Socket was closed: ' + e.get_reason_iy4m6l_k$());
        tmp_0 = false;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(RpcAgent).exceptionHelper_vpyofo_k$ = function (block, $completion) {
    var tmp = new $exceptionHelperCOROUTINE$(this, block, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  function RpcSerialization$plain$lambda($this$Json) {
    $this$Json.set_ignoreUnknownKeys_pzvtne_k$(true);
    // Inline function 'kotlinx.serialization.modules.SerializersModule' call
    var builder = new SerializersModuleBuilder();
    var tmp = getKClass(Result);
    builder.contextual_lh3eph_k$(tmp, RpcSerialization$plain$lambda$lambda);
    var tmp$ret$0 = builder.build_boe8ts_k$();
    $this$Json.set_serializersModule_6xge6s_k$(tmp$ret$0);
    return Unit_getInstance();
  }
  function RpcSerialization$plain$lambda$lambda(args) {
    return new ResultSerializer(args.get_c1px32_k$(0));
  }
  function RpcSerialization$getCustomJson$lambda$lambda(args) {
    return new ResultSerializer(args.get_c1px32_k$(0));
  }
  function RpcSerialization$getCustomJson$lambda($serializersModules) {
    return function ($this$Json) {
      $this$Json.set_ignoreUnknownKeys_pzvtne_k$(true);
      var tmp = $this$Json.get_serializersModule_piitvg_k$();
      // Inline function 'kotlinx.serialization.modules.SerializersModule' call
      var builder = new SerializersModuleBuilder();
      var tmp_0 = getKClass(Result);
      builder.contextual_lh3eph_k$(tmp_0, RpcSerialization$getCustomJson$lambda$lambda);
      var tmp0_safe_receiver = RpcSerialization_getInstance().exceptionsSerializersModule_1;
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        builder.include_ys61s4_k$(tmp0_safe_receiver);
      }
      var tmp1_safe_receiver = $serializersModules;
      if (tmp1_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = tmp1_safe_receiver.iterator_jk1svi_k$();
        while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
          var element = _iterator__ex2g4s.next_20eer_k$();
          builder.include_ys61s4_k$(element);
        }
      }
      var tmp$ret$0 = builder.build_boe8ts_k$();
      $this$Json.set_serializersModule_6xge6s_k$(overwriteWith(tmp, tmp$ret$0));
      return Unit_getInstance();
    };
  }
  function RpcSerialization() {
    RpcSerialization_instance = this;
    var tmp = this;
    tmp.plain_1 = Json(VOID, RpcSerialization$plain$lambda);
    this.exceptionsSerializersModule_1 = null;
    this.customConfiguration_1 = null;
  }
  protoOf(RpcSerialization).get_plain_iwxfa9_k$ = function () {
    return this.plain_1;
  };
  protoOf(RpcSerialization).set_exceptionsSerializersModule_rv7l8x_k$ = function (_set____db54di) {
    this.exceptionsSerializersModule_1 = _set____db54di;
  };
  protoOf(RpcSerialization).get_exceptionsSerializersModule_vjzh0g_k$ = function () {
    return this.exceptionsSerializersModule_1;
  };
  protoOf(RpcSerialization).set_customConfiguration_nnkh1x_k$ = function (_set____db54di) {
    this.customConfiguration_1 = _set____db54di;
  };
  protoOf(RpcSerialization).get_customConfiguration_clwja4_k$ = function () {
    return this.customConfiguration_1;
  };
  protoOf(RpcSerialization).toObj_ftbqbx_k$ = function (_this__u8e3s4, serializer) {
    return parse(this.getJson$default_3d7i98_k$().encodeToString_k0apqx_k$(serializer, _this__u8e3s4));
  };
  protoOf(RpcSerialization).getJson_rs89sx_k$ = function (serializersModules) {
    var tmp0_elvis_lhs = this.getCustomJson_oxeohc_k$(serializersModules);
    return tmp0_elvis_lhs == null ? this.plain_1 : tmp0_elvis_lhs;
  };
  protoOf(RpcSerialization).getJson$default_3d7i98_k$ = function (serializersModules, $super) {
    serializersModules = serializersModules === VOID ? null : serializersModules;
    return $super === VOID ? this.getJson_rs89sx_k$(serializersModules) : $super.getJson_rs89sx_k$.call(this, serializersModules);
  };
  protoOf(RpcSerialization).getCustomJson_oxeohc_k$ = function (serializersModules) {
    var tmp;
    if (this.exceptionsSerializersModule_1 == null && this.customConfiguration_1 == null && serializersModules == null) {
      tmp = null;
    } else {
      var tmp0_elvis_lhs = this.customConfiguration_1;
      var tmp_0 = tmp0_elvis_lhs == null ? Default_getInstance() : tmp0_elvis_lhs;
      tmp = Json(tmp_0, RpcSerialization$getCustomJson$lambda(serializersModules));
    }
    return tmp;
  };
  protoOf(RpcSerialization).getCustomJson$default_pso22j_k$ = function (serializersModules, $super) {
    serializersModules = serializersModules === VOID ? null : serializersModules;
    return $super === VOID ? this.getCustomJson_oxeohc_k$(serializersModules) : $super.getCustomJson_oxeohc_k$.call(this, serializersModules);
  };
  var RpcSerialization_instance;
  function RpcSerialization_getInstance() {
    if (RpcSerialization_instance == null)
      new RpcSerialization();
    return RpcSerialization_instance;
  }
  function RpcServiceManagerJs() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.calls_1 = LinkedHashMap_init_$Create$();
    this.counter_1 = 0;
  }
  protoOf(RpcServiceManagerJs).get_calls_iplay4_k$ = function () {
    return this.calls_1;
  };
  protoOf(RpcServiceManagerJs).set_counter_gpekcp_k$ = function (_set____db54di) {
    this.counter_1 = _set____db54di;
  };
  protoOf(RpcServiceManagerJs).get_counter_h3tkwj_k$ = function () {
    return this.counter_1;
  };
  protoOf(RpcServiceManagerJs).bindFunctionInternal_aajd20_k$ = function (route, function_0, method, routePrefix) {
    var tmp;
    if (route == null) {
      var tmp_0 = getKClassFromExpression(this).get_simpleName_r6f8py_k$();
      var _unary__edvuaz = this.counter_1;
      this.counter_1 = _unary__edvuaz + 1 | 0;
      tmp = 'route' + tmp_0 + _unary__edvuaz;
    } else {
      tmp = route;
    }
    var routeDef = tmp;
    var tmp0 = this.calls_1;
    var tmp2 = getCallName(function_0);
    // Inline function 'kotlin.collections.set' call
    var value = new Pair(routePrefix + routeDef, method);
    tmp0.put_4fpzoq_k$(tmp2, value);
  };
  protoOf(RpcServiceManagerJs).bindFunctionInternal$default_9jhqk4_k$ = function (route, function_0, method, routePrefix, $super) {
    routePrefix = routePrefix === VOID ? '/rpc/' : routePrefix;
    var tmp;
    if ($super === VOID) {
      this.bindFunctionInternal_aajd20_k$(route, function_0, method, routePrefix);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.bindFunctionInternal_aajd20_k$.call(this, route, function_0, method, routePrefix);
    }
    return tmp;
  };
  protoOf(RpcServiceManagerJs).getCall_sa32vh_k$ = function (function_0) {
    return this.calls_1.get_wei43m_k$(getCallName(function_0));
  };
  function getCallName(function_0) {
    var tmp;
    if (typeof function_0 === 'function') {
      tmp = function_0.callableName;
    } else {
      var tmp0 = toString(function_0);
      // Inline function 'kotlin.text.toRegex' call
      // Inline function 'kotlin.text.replace' call
      tmp = Regex_init_$Create$('\\s').replace_1ix0wf_k$(tmp0, '');
    }
    return tmp;
  }
  function _get_scope__bi2zur($this) {
    return $this.scope_1;
  }
  function _set_eventQueue__fasgf4($this, _set____db54di) {
    $this.eventQueue_1 = _set____db54di;
  }
  function _get_eventQueue__ud11kc($this) {
    return $this.eventQueue_1;
  }
  function _set_ws__dl8ddx($this, _set____db54di) {
    $this.ws_1 = _set____db54di;
  }
  function _get_ws__ndcdv3($this) {
    var tmp = $this.ws_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('ws');
    }
  }
  function onWsEvent($this, event) {
    launch($this.scope_1, VOID, VOID, Socket$onWsEvent$slambda_0($this, event, null));
  }
  function logError($this, event) {
    var tmp = console;
    // Inline function 'kotlin.js.toJsString' call
    var tmp$ret$0 = 'An error %o occurred when connecting to ' + _get_ws__ndcdv3($this).url;
    return tmp.error(tmp$ret$0, event);
  }
  function getReason($this, code) {
    switch (code) {
      case 1000:
        return 'Normal closure';
      case 1001:
        return 'An endpoint is "going away", such as a server going down or a browser having navigated away from a page.';
      case 1002:
        return 'An endpoint is terminating the connection due to a protocol error';
      case 1003:
        return 'An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).';
      case 1004:
        return 'Reserved. The specific meaning might be defined in the future.';
      case 1005:
        return 'No status code was actually present.';
      case 1006:
        return 'The connection was closed abnormally, e.g., without sending or receiving a Close control frame';
      case 1007:
        return 'An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [https://tools.ietf.org/html/rfc3629] data within a text message).';
      case 1008:
        return 'An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.';
      case 1009:
        return 'An endpoint is terminating the connection because it has received a message that is too big for it to process.';
      case 1010:
        return "An endpoint (client ) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: ";
      case 1011:
        return 'A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.';
      case 1015:
        return "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
      case 4001:
        return 'Unexpected event';
      case 4002:
        return 'You are trying to use closed socket';
      default:
        return 'Unknown reason';
    }
  }
  function Socket$onWsEvent$slambda(this$0, $event, resultContinuation) {
    this.this$0__1 = this$0;
    this.$event_1 = $event;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Socket$onWsEvent$slambda).invoke_d9fzmj_k$ = function ($this$launch, $completion) {
    var tmp = this.create_rcuf4x_k$($this$launch, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(Socket$onWsEvent$slambda).invoke_qns8j1_k$ = function (p1, $completion) {
    return this.invoke_d9fzmj_k$((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(Socket$onWsEvent$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this.this$0__1.eventQueue_1.send_44jogj_k$(this.$event_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
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
  protoOf(Socket$onWsEvent$slambda).create_rcuf4x_k$ = function ($this$launch, completion) {
    var i = new Socket$onWsEvent$slambda(this.this$0__1, this.$event_1, completion);
    i.$this$launch_1 = $this$launch;
    return i;
  };
  protoOf(Socket$onWsEvent$slambda).create_wyq9v6_k$ = function (value, completion) {
    return this.create_rcuf4x_k$((!(value == null) ? isInterface(value, CoroutineScope) : false) ? value : THROW_CCE(), completion);
  };
  function Socket$onWsEvent$slambda_0(this$0, $event, resultContinuation) {
    var i = new Socket$onWsEvent$slambda(this$0, $event, resultContinuation);
    return constructCallableReference(function ($this$launch, $completion) {
      return i.invoke_d9fzmj_k$($this$launch, $completion);
    }, 1);
  }
  function Socket$connect$lambda$lambda(this$0) {
    return function (event) {
      onWsEvent(this$0, event);
      return Unit_getInstance();
    };
  }
  function Socket$connect$lambda$lambda_0(this$0) {
    return function (event) {
      onWsEvent(this$0, event);
      return Unit_getInstance();
    };
  }
  function Socket$connect$lambda(this$0, $cont) {
    return function () {
      var tmp = _get_ws__ndcdv3(this$0);
      // Inline function 'web.events.EventHandler' call
      // Inline function 'js.reflect.unsafeCast' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp.onclose = Socket$connect$lambda$lambda(this$0);
      var tmp_0 = _get_ws__ndcdv3(this$0);
      // Inline function 'web.events.EventHandler' call
      // Inline function 'js.reflect.unsafeCast' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp_0.onerror = Socket$connect$lambda$lambda_0(this$0);
      // Inline function 'kotlin.coroutines.resume' call
      var this_0 = $cont;
      // Inline function 'kotlin.Companion.success' call
      Companion_getInstance();
      var tmp$ret$9 = _Result___init__impl__xyqfz8(true);
      this_0.resumeWith_dtxwbr_k$(tmp$ret$9);
      return Unit_getInstance();
    };
  }
  function Socket$connect$lambda_0(this$0) {
    return function (event) {
      onWsEvent(this$0, event);
      return Unit_getInstance();
    };
  }
  function Socket$connect$lambda_1(this$0) {
    return function (event) {
      logError(this$0, event);
      return Unit_getInstance();
    };
  }
  function Socket$connect$lambda_2($cont) {
    return function () {
      // Inline function 'kotlin.coroutines.resume' call
      var this_0 = $cont;
      // Inline function 'kotlin.Companion.success' call
      Companion_getInstance();
      var tmp$ret$1 = _Result___init__impl__xyqfz8(false);
      this_0.resumeWith_dtxwbr_k$(tmp$ret$1);
      return Unit_getInstance();
    };
  }
  function $connectCOROUTINE$(_this__u8e3s4, url, retryDelay, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this.url_1 = url;
    this.retryDelay_1 = retryDelay;
  }
  protoOf($connectCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!true) {
              this.set_state_rjd8d0_k$(6);
              continue $sm;
            }

            this.set_state_rjd8d0_k$(2);
            var safe = SafeContinuation_init_$Create$(intercepted(this));
            while (_ChannelResult___get_isSuccess__impl__odq1z9(this._this__u8e3s4__1.eventQueue_1.tryReceive_y3ovg2_k$())) {
            }

            this._this__u8e3s4__1.ws_1 = new WebSocket(this.url_1);
            var tmp_0 = _get_ws__ndcdv3(this._this__u8e3s4__1);
            tmp_0.onopen = Socket$connect$lambda(this._this__u8e3s4__1, safe);
            var tmp_1 = _get_ws__ndcdv3(this._this__u8e3s4__1);
            tmp_1.onmessage = Socket$connect$lambda_0(this._this__u8e3s4__1);
            var tmp_2 = _get_ws__ndcdv3(this._this__u8e3s4__1);
            tmp_2.onerror = Socket$connect$lambda_1(this._this__u8e3s4__1);
            var tmp_3 = _get_ws__ndcdv3(this._this__u8e3s4__1);
            tmp_3.onclose = Socket$connect$lambda_2(safe);
            suspendResult = returnIfSuspended(safe.getOrThrow_23gqzp_k$(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var connected = suspendResult;
            if (connected) {
              this.set_state_rjd8d0_k$(6);
              continue $sm;
            } else {
              this.set_state_rjd8d0_k$(3);
              suspendResult = delay(this.retryDelay_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 3:
            this.set_state_rjd8d0_k$(4);
            continue $sm;
          case 4:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 5:
            throw this.get_exception_x0n6w6_k$();
          case 6:
            return Unit_getInstance();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 5) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function $receiveCOROUTINE$(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
  }
  protoOf($receiveCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(2);
            this.set_state_rjd8d0_k$(1);
            suspendResult = this._this__u8e3s4__1.eventQueue_1.receive_awoumx_k$(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var event = suspendResult;
            var tmp_0;
            if (event instanceof MessageEvent) {
              tmp_0 = toString_0(event.data);
            } else {
              if (event instanceof CloseEvent) {
                var reason = getReason(this._this__u8e3s4__1, event.code);
                throw new SocketClosedException(reason);
              } else {
                if (event instanceof ErrorEvent) {
                  logError(this._this__u8e3s4__1, event);
                  this._this__u8e3s4__1.close$default_5m250d_k$();
                  throw new SocketClosedException(event.message);
                } else {
                  var reason_0 = getReason(this._this__u8e3s4__1, 4001);
                  console.error(reason_0);
                  this._this__u8e3s4__1.close$default_5m250d_k$();
                  throw new SocketClosedException(reason_0);
                }
              }
            }

            return tmp_0;
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
  function Socket() {
    this.scope_1 = CoroutineScope_0(Dispatchers_getInstance().get_Default_goqax4_k$().plus_s13ygv_k$(SupervisorJob()));
    this.eventQueue_1 = Channel(2147483647);
  }
  protoOf(Socket).get_state_iypx7s_k$ = function () {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return _get_ws__ndcdv3(this).readyState;
  };
  protoOf(Socket).connect_s7cibd_k$ = function (url, retryDelay, $completion) {
    var tmp = new $connectCOROUTINE$(this, url, retryDelay, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(Socket).connect$default_q80ah0_k$ = function (url, retryDelay, $completion, $super) {
    retryDelay = retryDelay === VOID ? new Long(1000, 0) : retryDelay;
    return $super === VOID ? this.connect_s7cibd_k$(url, retryDelay, $completion) : $super.connect_s7cibd_k$.call(this, url, retryDelay, $completion);
  };
  protoOf(Socket).receive_qir1pc_k$ = function ($completion) {
    var tmp = new $receiveCOROUTINE$(this, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(Socket).send_oy6aea_k$ = function (obj) {
    if (this.isClosed_baxhhm_k$()) {
      console.error(getReason(this, 4002));
      throw new SocketClosedException(getReason(this, 4002));
    } else {
      _get_ws__ndcdv3(this).send(obj);
    }
  };
  protoOf(Socket).close_t89ids_k$ = function (code) {
    JsNumbers_getInstance();
    // Inline function 'js.numbers.JsNumbers.toKotlinInt' call
    if (this.get_state_iypx7s_k$() === 1) {
      _get_ws__ndcdv3(this).close(code, getReason(this, 1000));
    }
  };
  protoOf(Socket).close$default_5m250d_k$ = function (code, $super) {
    code = code === VOID ? 1000 : code;
    var tmp;
    if ($super === VOID) {
      this.close_t89ids_k$(code);
      tmp = Unit_getInstance();
    } else {
      tmp = $super.close_t89ids_k$.call(this, code);
    }
    return tmp;
  };
  protoOf(Socket).isClosed_baxhhm_k$ = function () {
    JsNumbers_getInstance();
    // Inline function 'js.numbers.JsNumbers.toKotlinInt' call
    switch (this.get_state_iypx7s_k$()) {
      case 2:
      case 3:
        return true;
      default:
        return false;
    }
  };
  function SocketClosedException(reason) {
    extendThrowable(this, reason);
    captureStack(this, SocketClosedException);
    this.reason_1 = reason;
  }
  protoOf(SocketClosedException).get_reason_iy4m6l_k$ = function () {
    return this.reason_1;
  };
  function get_isDom() {
    _init_properties_Utils_kt__jo07cx();
    var tmp0 = isDom$delegate;
    var tmp = KProperty0;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('isDom', 0, tmp, _get_isDom_$ref_gmxtvc(), null);
    return tmp0.get_value_j01efc_k$();
  }
  var isDom$delegate;
  function getRpcUrlPrefix() {
    _init_properties_Utils_kt__jo07cx();
    var rpcUrlPrefix = jsGet(globalThis, 'rpc_url_prefix');
    return !equals(rpcUrlPrefix, undefined) ? toString(rpcUrlPrefix) + '/' : '';
  }
  function getWebSocketUrl(url) {
    _init_properties_Utils_kt__jo07cx();
    var tmp;
    if (startsWith(url, 'https://')) {
      tmp = 'wss' + drop(url, 5);
    } else if (startsWith(url, 'http://')) {
      tmp = 'ws' + drop(url, 4);
    } else {
      var location = window.location;
      var scheme = location.protocol === 'https:' ? 'wss' : 'ws';
      var port = location.port === '8088' ? ':8080' : !(location.port === '0') && !(location.port === '') ? ':' + location.port : '';
      tmp = scheme + '://' + location.hostname + port + '/' + url;
    }
    return tmp;
  }
  function jsSet(_this__u8e3s4, key, value) {
    _init_properties_Utils_kt__jo07cx();
    Reflect.set(_this__u8e3s4, key, value);
  }
  function jsGet(_this__u8e3s4, key) {
    _init_properties_Utils_kt__jo07cx();
    return Reflect.get(_this__u8e3s4, key);
  }
  function isDom$delegate$lambda() {
    _init_properties_Utils_kt__jo07cx();
    return isDom();
  }
  function _get_isDom_$ref_gmxtvc() {
    return constructCallableReference(function () {
      return get_isDom();
    }, 0, 0, 'dev.kilua.rpc/isDom.<get-isDom>|<get-isDom>(){}[0]');
  }
  var properties_initialized_Utils_kt_xvi83j;
  function _init_properties_Utils_kt__jo07cx() {
    if (!properties_initialized_Utils_kt_xvi83j) {
      properties_initialized_Utils_kt_xvi83j = true;
      isDom$delegate = lazy_0(isDom$delegate$lambda);
    }
  }
  //region block: post-declaration
  protoOf($serializer).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  protoOf($serializer_0).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  protoOf($serializer_1).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  protoOf($serializer_2).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  protoOf($serializer_4).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  protoOf(RpcServiceManagerJs).requireCall_qm9pb8_k$ = requireCall;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = RpcAgent;
  _.$_$.b = RpcServiceManagerJs;
  _.$_$.c = RpcServiceMgr;
  _.$_$.d = HttpMethod_POST_getInstance;
  //endregion
  return _;
}));

//# sourceMappingURL=kilua-rpc-modules-kilua-rpc-core.js.map
