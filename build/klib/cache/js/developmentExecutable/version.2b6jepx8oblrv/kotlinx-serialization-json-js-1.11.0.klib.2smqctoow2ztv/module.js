(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    globalThis['kotlinx-serialization-kotlinx-serialization-json'] = factory(typeof globalThis['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined' ? {} : globalThis['kotlinx-serialization-kotlinx-serialization-json'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var EmptySerializersModule = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e2;
  var protoOf = kotlin_kotlin.$_$.ue;
  var initMetadataForObject = kotlin_kotlin.$_$.xd;
  var VOID = kotlin_kotlin.$_$.d;
  var StringFormat = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r2;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  var toString = kotlin_kotlin.$_$.xe;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.k4;
  var Unit_getInstance = kotlin_kotlin.$_$.w2;
  var charSequenceLength = kotlin_kotlin.$_$.dd;
  var charSequenceGet = kotlin_kotlin.$_$.cd;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.h;
  var equals = kotlin_kotlin.$_$.jd;
  var THROW_CCE = kotlin_kotlin.$_$.cj;
  var getStringHashCode = kotlin_kotlin.$_$.pd;
  var Annotation = kotlin_kotlin.$_$.gi;
  var contentEquals = kotlin_kotlin.$_$.i7;
  var hashCode = kotlin_kotlin.$_$.qd;
  var toString_0 = kotlin_kotlin.$_$.ik;
  var THROW_IAE = kotlin_kotlin.$_$.dj;
  var enumEntries = kotlin_kotlin.$_$.sb;
  var Enum = kotlin_kotlin.$_$.pi;
  var Decoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var CompositeDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var initMetadataForInterface = kotlin_kotlin.$_$.vd;
  var initMetadataForCompanion = kotlin_kotlin.$_$.sd;
  var makeAssociatedObjectMapES5 = kotlin_kotlin.$_$.b;
  var SerializableWith = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o2;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.x3;
  var joinToString = kotlin_kotlin.$_$.n8;
  var KtMap = kotlin_kotlin.$_$.b6;
  var getKClassFromExpression = kotlin_kotlin.$_$.kf;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a2;
  var getBooleanHashCode = kotlin_kotlin.$_$.ld;
  var KtList = kotlin_kotlin.$_$.y5;
  var toDouble = kotlin_kotlin.$_$.lh;
  var StringCompanionObject_getInstance = kotlin_kotlin.$_$.j2;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u;
  var InlinePrimitiveDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w1;
  var SEALED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a;
  var buildSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i1;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.bk;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l2;
  var MapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s;
  var SerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f1;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var ENUM_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d;
  var ListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b1;
  var toLongOrNull = kotlin_kotlin.$_$.sh;
  var toULongOrNull = kotlin_kotlin.$_$.wh;
  var ULong = kotlin_kotlin.$_$.kj;
  var Companion_getInstance = kotlin_kotlin.$_$.u2;
  var serializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.k1;
  var toDoubleOrNull = kotlin_kotlin.$_$.kh;
  var toBooleanStrictOrNull = kotlin_kotlin.$_$.ih;
  var isInterface = kotlin_kotlin.$_$.ge;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.p4;
  var KProperty1 = kotlin_kotlin.$_$.qf;
  var getPropertyCallableRef = kotlin_kotlin.$_$.od;
  var constructCallableReference = kotlin_kotlin.$_$.gd;
  var lazy = kotlin_kotlin.$_$.ak;
  var get_isNullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e1;
  var get_isInline = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d1;
  var get_annotations = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c1;
  var Encoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var CompositeEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o1;
  var captureStack = kotlin_kotlin.$_$.yc;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p2;
  var SerializationException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o;
  var defineProp = kotlin_kotlin.$_$.hd;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.w3;
  var isLetter = kotlin_kotlin.$_$.lg;
  var Char = kotlin_kotlin.$_$.ii;
  var last = kotlin_kotlin.$_$.pg;
  var toString_1 = kotlin_kotlin.$_$.m;
  var charCodeAt = kotlin_kotlin.$_$.bd;
  var isUpperCase = kotlin_kotlin.$_$.mg;
  var fromInt = kotlin_kotlin.$_$.hc;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.a1;
  var UInt__toString_impl_dbgl21 = kotlin_kotlin.$_$.c1;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.j1;
  var ULong__toString_impl_f9au7k = kotlin_kotlin.$_$.l1;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.r;
  var UByte__toString_impl_v72jg = kotlin_kotlin.$_$.t;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.s1;
  var UShort__toString_impl_edaoee = kotlin_kotlin.$_$.u1;
  var ElementMarker = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var charSequenceSubSequence = kotlin_kotlin.$_$.ed;
  var coerceAtLeast = kotlin_kotlin.$_$.bf;
  var coerceAtMost = kotlin_kotlin.$_$.cf;
  var isBlank = kotlin_kotlin.$_$.kg;
  var Collection = kotlin_kotlin.$_$.o5;
  var SerializationException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p;
  var CLASS_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e;
  var toSet = kotlin_kotlin.$_$.qa;
  var jsonCachedSerialNames = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b2;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.m3;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.d3;
  var singleOrNull = kotlin_kotlin.$_$.p9;
  var emptyMap = kotlin_kotlin.$_$.z7;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.o3;
  var getValue = kotlin_kotlin.$_$.h8;
  var copyOf = kotlin_kotlin.$_$.t7;
  var arrayCopy = kotlin_kotlin.$_$.q6;
  var LIST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f;
  var CONTEXTUAL_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var PolymorphicKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z;
  var PrimitiveKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a1;
  var MAP_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g;
  var ENUM = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g1;
  var contextual = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g2;
  var polymorphicDefault = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h2;
  var SerializersModuleCollector = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i2;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.l;
  var ensureNotNull = kotlin_kotlin.$_$.vj;
  var DeepRecursiveFunction = kotlin_kotlin.$_$.ni;
  var invoke = kotlin_kotlin.$_$.wj;
  var CoroutineImpl = kotlin_kotlin.$_$.nb;
  var DeepRecursiveScope = kotlin_kotlin.$_$.oi;
  var Unit = kotlin_kotlin.$_$.nj;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.xa;
  var initMetadataForLambda = kotlin_kotlin.$_$.wd;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.td;
  var SuspendFunction2 = kotlin_kotlin.$_$.pb;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r1;
  var getKClass = kotlin_kotlin.$_$.lf;
  var findPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s2;
  var DeserializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k2;
  var OBJECT_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h;
  var findPolymorphicSerializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t2;
  var SerializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q2;
  var AbstractDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var substringBefore = kotlin_kotlin.$_$.eh;
  var removeSuffix = kotlin_kotlin.$_$.tg;
  var substringAfter = kotlin_kotlin.$_$.dh;
  var contains = kotlin_kotlin.$_$.cg;
  var plus = kotlin_kotlin.$_$.ck;
  var missingFieldExceptionWithNewMessage = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c2;
  var MissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m2;
  var convertToByte = kotlin_kotlin.$_$.cc;
  var equalsLong = kotlin_kotlin.$_$.gc;
  var convertToShort = kotlin_kotlin.$_$.ec;
  var convertToInt = kotlin_kotlin.$_$.dc;
  var IllegalArgumentException = kotlin_kotlin.$_$.si;
  var isFinite = kotlin_kotlin.$_$.yj;
  var isFinite_0 = kotlin_kotlin.$_$.xj;
  var ChunkedDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var toUInt = kotlin_kotlin.$_$.vh;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.b1;
  var toULong = kotlin_kotlin.$_$.xh;
  var toUByte = kotlin_kotlin.$_$.uh;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.s;
  var toUShort = kotlin_kotlin.$_$.yh;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.t1;
  var objectCreate = kotlin_kotlin.$_$.te;
  var AbstractEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l1;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.t2;
  var serializer_1 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.s2;
  var serializer_2 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.v2;
  var serializer_3 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v;
  var setOf = kotlin_kotlin.$_$.o9;
  var numberToChar = kotlin_kotlin.$_$.qe;
  var equals_0 = kotlin_kotlin.$_$.gg;
  var toByte = kotlin_kotlin.$_$.ve;
  var startsWith = kotlin_kotlin.$_$.ah;
  var NamedValueDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x1;
  var numberRangeToNumber = kotlin_kotlin.$_$.pe;
  var ClosedRange = kotlin_kotlin.$_$.ze;
  var contains_0 = kotlin_kotlin.$_$.ef;
  var single = kotlin_kotlin.$_$.xg;
  var emptySet = kotlin_kotlin.$_$.a8;
  var plus_0 = kotlin_kotlin.$_$.e9;
  var toInt = kotlin_kotlin.$_$.qh;
  var toList = kotlin_kotlin.$_$.ha;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.ub;
  var NamedValueEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y1;
  var getContextualDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j1;
  var toNumber = kotlin_kotlin.$_$.tc;
  var indexOf = kotlin_kotlin.$_$.jg;
  var last_0 = kotlin_kotlin.$_$.t8;
  var removeLast = kotlin_kotlin.$_$.m9;
  var lastIndexOf = kotlin_kotlin.$_$.og;
  var Long = kotlin_kotlin.$_$.vi;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.j;
  var multiply = kotlin_kotlin.$_$.mc;
  var add = kotlin_kotlin.$_$.xb;
  var subtract = kotlin_kotlin.$_$.sc;
  var compare = kotlin_kotlin.$_$.bc;
  var numberToLong = kotlin_kotlin.$_$.oc;
  var negate = kotlin_kotlin.$_$.nc;
  var charArray = kotlin_kotlin.$_$.ad;
  var indexOf_0 = kotlin_kotlin.$_$.ig;
  var substring = kotlin_kotlin.$_$.gh;
  var chunked = kotlin_kotlin.$_$.bg;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.f3;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(Json, 'Json', VOID, VOID, [StringFormat]);
  initMetadataForObject(Default, 'Default', VOID, Json);
  initMetadataForClass(JsonBuilder, 'JsonBuilder');
  initMetadataForClass(JsonImpl, 'JsonImpl', VOID, Json);
  initMetadataForClass(JsonClassDiscriminator, 'JsonClassDiscriminator', VOID, VOID, [Annotation]);
  initMetadataForClass(JsonIgnoreUnknownKeys, 'JsonIgnoreUnknownKeys', VOID, VOID, [Annotation]);
  initMetadataForClass(JsonNames, 'JsonNames', VOID, VOID, [Annotation]);
  initMetadataForClass(JsonConfiguration, 'JsonConfiguration');
  initMetadataForClass(ClassDiscriminatorMode, 'ClassDiscriminatorMode', VOID, Enum);
  initMetadataForInterface(JsonDecoder, 'JsonDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  initMetadataForCompanion(Companion);
  initMetadataForClass(JsonElement, 'JsonElement', VOID, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, JsonElementSerializer_getInstance]));
  initMetadataForCompanion(Companion_0);
  initMetadataForClass(JsonObject, 'JsonObject', VOID, JsonElement, [KtMap], VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, JsonObjectSerializer_getInstance]));
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(JsonPrimitive, 'JsonPrimitive', VOID, JsonElement, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, JsonPrimitiveSerializer_getInstance]));
  initMetadataForObject(JsonNull, 'JsonNull', VOID, JsonPrimitive, [SerializerFactory], VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, JsonNullSerializer_getInstance]));
  initMetadataForClass(JsonLiteral, 'JsonLiteral', VOID, JsonPrimitive);
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(JsonArray, 'JsonArray', VOID, JsonElement, [KtList], VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, JsonArraySerializer_getInstance]));
  initMetadataForObject(JsonElementSerializer, 'JsonElementSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonObjectDescriptor, 'JsonObjectDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForObject(JsonObjectSerializer, 'JsonObjectSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonPrimitiveSerializer, 'JsonPrimitiveSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonNullSerializer, 'JsonNullSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonArrayDescriptor, 'JsonArrayDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForObject(JsonArraySerializer, 'JsonArraySerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonLiteralSerializer, 'JsonLiteralSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(defer$1, VOID, VOID, VOID, [SerialDescriptor]);
  initMetadataForInterface(JsonEncoder, 'JsonEncoder', VOID, VOID, [Encoder, CompositeEncoder]);
  initMetadataForClass(JsonException, 'JsonException', VOID, SerializationException);
  initMetadataForClass(JsonDecodingException, 'JsonDecodingException', VOID, JsonException);
  initMetadataForClass(JsonEncodingException, 'JsonEncodingException', VOID, JsonException);
  initMetadataForInterface(JsonNamingStrategy, 'JsonNamingStrategy');
  initMetadataForClass(JsonNamingStrategy$Builtins$SnakeCase$1, VOID, VOID, VOID, [JsonNamingStrategy]);
  initMetadataForClass(JsonNamingStrategy$Builtins$KebabCase$1, VOID, VOID, VOID, [JsonNamingStrategy]);
  initMetadataForObject(Builtins, 'Builtins');
  initMetadataForClass(Composer, 'Composer');
  initMetadataForClass(ComposerForUnsignedNumbers, 'ComposerForUnsignedNumbers', VOID, Composer);
  initMetadataForClass(ComposerForUnquotedLiterals, 'ComposerForUnquotedLiterals', VOID, Composer);
  initMetadataForClass(ComposerWithPrettyPrint, 'ComposerWithPrettyPrint', VOID, Composer);
  initMetadataForClass(JsonElementMarker, 'JsonElementMarker');
  initMetadataForObject(Tombstone, 'Tombstone');
  initMetadataForObject(RedactedKey, 'RedactedKey');
  initMetadataForClass(JsonPath, 'JsonPath');
  initMetadataForClass(JsonSerializersModuleValidator, 'JsonSerializersModuleValidator', VOID, VOID, [SerializersModuleCollector]);
  initMetadataForClass(JsonFriendModuleApi, 'JsonFriendModuleApi', VOID, VOID, [Annotation]);
  initMetadataForCompanion(Companion_3);
  initMetadataForInterface(InternalJsonWriter, 'InternalJsonWriter');
  initMetadataForLambda(JsonTreeReader$readDeepRecursive$slambda, CoroutineImpl, VOID, [2]);
  initMetadataForCoroutine($readObjectCOROUTINE$, CoroutineImpl);
  initMetadataForClass(JsonTreeReader, 'JsonTreeReader', VOID, VOID, VOID, [1]);
  initMetadataForClass(Key, 'Key', Key);
  initMetadataForClass(DescriptorSchemaCache, 'DescriptorSchemaCache', DescriptorSchemaCache);
  initMetadataForClass(DiscriminatorHolder, 'DiscriminatorHolder');
  initMetadataForClass(StreamingJsonDecoder, 'StreamingJsonDecoder', VOID, AbstractDecoder, [JsonDecoder, ChunkedDecoder]);
  initMetadataForClass(JsonDecoderForUnsignedTypes, 'JsonDecoderForUnsignedTypes', VOID, AbstractDecoder);
  initMetadataForClass(StreamingJsonEncoder, 'StreamingJsonEncoder', VOID, AbstractEncoder, [JsonEncoder]);
  initMetadataForClass(SuppressAnimalSniffer, 'SuppressAnimalSniffer', VOID, VOID, [Annotation]);
  initMetadataForClass(AbstractJsonTreeDecoder, 'AbstractJsonTreeDecoder', VOID, NamedValueDecoder, [JsonDecoder]);
  initMetadataForClass(JsonTreeDecoder, 'JsonTreeDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonTreeListDecoder, 'JsonTreeListDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonPrimitiveDecoder, 'JsonPrimitiveDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonTreeMapDecoder, 'JsonTreeMapDecoder', VOID, JsonTreeDecoder);
  initMetadataForClass(AbstractJsonTreeEncoder, 'AbstractJsonTreeEncoder', VOID, NamedValueEncoder, [JsonEncoder]);
  initMetadataForClass(JsonTreeEncoder, 'JsonTreeEncoder', VOID, AbstractJsonTreeEncoder);
  initMetadataForClass(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1, VOID, VOID, AbstractEncoder);
  initMetadataForClass(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1, VOID, VOID, AbstractEncoder);
  initMetadataForClass(JsonPrimitiveEncoder, 'JsonPrimitiveEncoder', VOID, AbstractJsonTreeEncoder);
  initMetadataForClass(JsonTreeListEncoder, 'JsonTreeListEncoder', VOID, AbstractJsonTreeEncoder);
  initMetadataForClass(JsonTreeMapEncoder, 'JsonTreeMapEncoder', VOID, JsonTreeEncoder);
  initMetadataForClass(WriteMode, 'WriteMode', VOID, Enum);
  initMetadataForClass(AbstractJsonLexer, 'AbstractJsonLexer');
  initMetadataForObject(CharMappings, 'CharMappings');
  initMetadataForClass(StringJsonLexer, 'StringJsonLexer', VOID, AbstractJsonLexer);
  initMetadataForClass(StringJsonLexerWithComments, 'StringJsonLexerWithComments', VOID, StringJsonLexer);
  initMetadataForClass(FormatLanguage, 'FormatLanguage', VOID, VOID, [Annotation]);
  initMetadataForClass(JsonToStringWriter, 'JsonToStringWriter', JsonToStringWriter, VOID, [InternalJsonWriter]);
  //endregion
  function Default() {
    Default_instance = this;
    Json.call(this, new JsonConfiguration(), EmptySerializersModule());
  }
  var Default_instance;
  function Default_getInstance() {
    if (Default_instance == null)
      new Default();
    return Default_instance;
  }
  function Json(configuration, serializersModule) {
    Default_getInstance();
    this.configuration_1 = configuration;
    this.serializersModule_1 = serializersModule;
    this._schemaCache_1 = new DescriptorSchemaCache();
  }
  protoOf(Json).get_configuration_uqypjh_k$ = function () {
    return this.configuration_1;
  };
  protoOf(Json).get_serializersModule_piitvg_k$ = function () {
    return this.serializersModule_1;
  };
  protoOf(Json).get__schemaCache_7cqc2k_k$ = function () {
    return this._schemaCache_1;
  };
  protoOf(Json).encodeToString_k0apqx_k$ = function (serializer, value) {
    var result = new JsonToStringWriter();
    try {
      encodeByWriter(this, result, serializer, value);
      return result.toString();
    }finally {
      result.release_wu5yyf_k$();
    }
  };
  protoOf(Json).decodeFromString_jwu9sq_k$ = function (deserializer, string) {
    var lexer = StringJsonLexer_0(this, string);
    var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.get_descriptor_wjt6a0_k$(), null);
    var result = input.decodeSerializableValue_xpnpad_k$(deserializer);
    lexer.expectEof_2xwqoj_k$();
    return result;
  };
  protoOf(Json).encodeToJsonElement_w5lo4o_k$ = function (serializer, value) {
    return writeJson(this, value, serializer);
  };
  protoOf(Json).decodeFromJsonElement_tsogwj_k$ = function (deserializer, element) {
    return readJson(this, element, deserializer);
  };
  protoOf(Json).parseToJsonElement_rqvr2k_k$ = function (string) {
    return this.decodeFromString_jwu9sq_k$(JsonElementSerializer_getInstance(), string);
  };
  function Json_0(from, builderAction) {
    from = from === VOID ? Default_getInstance() : from;
    var builder = new JsonBuilder(from);
    builderAction(builder);
    var conf = builder.build_bkh6qh_k$();
    return new JsonImpl(conf, builder.serializersModule_1);
  }
  function JsonBuilder(json) {
    this.encodeDefaults_1 = json.configuration_1.get_encodeDefaults_m8plkf_k$();
    this.explicitNulls_1 = json.configuration_1.get_explicitNulls_ppiuof_k$();
    this.ignoreUnknownKeys_1 = json.configuration_1.get_ignoreUnknownKeys_kvp19_k$();
    this.isLenient_1 = json.configuration_1.get_isLenient_1g1x8_k$();
    this.prettyPrint_1 = json.configuration_1.get_prettyPrint_y7fmum_k$();
    this.prettyPrintIndent_1 = json.configuration_1.get_prettyPrintIndent_5z3eey_k$();
    this.coerceInputValues_1 = json.configuration_1.get_coerceInputValues_gdasvc_k$();
    this.classDiscriminator_1 = json.configuration_1.get_classDiscriminator_x3y365_k$();
    this.classDiscriminatorMode_1 = json.configuration_1.get_classDiscriminatorMode_bmc7xs_k$();
    this.useAlternativeNames_1 = json.configuration_1.get_useAlternativeNames_c5maqh_k$();
    this.namingStrategy_1 = json.configuration_1.get_namingStrategy_kue0is_k$();
    this.decodeEnumsCaseInsensitive_1 = json.configuration_1.get_decodeEnumsCaseInsensitive_7os6sm_k$();
    this.allowTrailingComma_1 = json.configuration_1.get_allowTrailingComma_7ql5if_k$();
    this.allowComments_1 = json.configuration_1.get_allowComments_9ik2es_k$();
    this.allowSpecialFloatingPointValues_1 = json.configuration_1.get_allowSpecialFloatingPointValues_1eu5hp_k$();
    this.allowStructuredMapKeys_1 = json.configuration_1.get_allowStructuredMapKeys_fk21t_k$();
    this.useArrayPolymorphism_1 = json.configuration_1.get_useArrayPolymorphism_teidaa_k$();
    this.serializersModule_1 = json.get_serializersModule_piitvg_k$();
    this.exceptionsWithDebugInfo_1 = json.configuration_1.get_exceptionsWithDebugInfo_ajrapa_k$();
  }
  protoOf(JsonBuilder).set_encodeDefaults_c5evsg_k$ = function (_set____db54di) {
    this.encodeDefaults_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_encodeDefaults_m8plkf_k$ = function () {
    return this.encodeDefaults_1;
  };
  protoOf(JsonBuilder).set_explicitNulls_mtj2ai_k$ = function (_set____db54di) {
    this.explicitNulls_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_explicitNulls_ppiuof_k$ = function () {
    return this.explicitNulls_1;
  };
  protoOf(JsonBuilder).set_ignoreUnknownKeys_pzvtne_k$ = function (_set____db54di) {
    this.ignoreUnknownKeys_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_ignoreUnknownKeys_kvp19_k$ = function () {
    return this.ignoreUnknownKeys_1;
  };
  protoOf(JsonBuilder).set_isLenient_kuajk5_k$ = function (_set____db54di) {
    this.isLenient_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_isLenient_1g1x8_k$ = function () {
    return this.isLenient_1;
  };
  protoOf(JsonBuilder).set_prettyPrint_v2gnff_k$ = function (_set____db54di) {
    this.prettyPrint_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_prettyPrint_y7fmum_k$ = function () {
    return this.prettyPrint_1;
  };
  protoOf(JsonBuilder).set_prettyPrintIndent_ab0258_k$ = function (_set____db54di) {
    this.prettyPrintIndent_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_prettyPrintIndent_5z3eey_k$ = function () {
    return this.prettyPrintIndent_1;
  };
  protoOf(JsonBuilder).set_coerceInputValues_mqesv5_k$ = function (_set____db54di) {
    this.coerceInputValues_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_coerceInputValues_gdasvc_k$ = function () {
    return this.coerceInputValues_1;
  };
  protoOf(JsonBuilder).set_classDiscriminator_bmfzlj_k$ = function (_set____db54di) {
    this.classDiscriminator_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_classDiscriminator_x3y365_k$ = function () {
    return this.classDiscriminator_1;
  };
  protoOf(JsonBuilder).set_classDiscriminatorMode_2roopg_k$ = function (_set____db54di) {
    this.classDiscriminatorMode_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_classDiscriminatorMode_bmc7xs_k$ = function () {
    return this.classDiscriminatorMode_1;
  };
  protoOf(JsonBuilder).set_useAlternativeNames_m4wh2o_k$ = function (_set____db54di) {
    this.useAlternativeNames_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_useAlternativeNames_c5maqh_k$ = function () {
    return this.useAlternativeNames_1;
  };
  protoOf(JsonBuilder).set_namingStrategy_8app28_k$ = function (_set____db54di) {
    this.namingStrategy_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_namingStrategy_kue0is_k$ = function () {
    return this.namingStrategy_1;
  };
  protoOf(JsonBuilder).set_decodeEnumsCaseInsensitive_k1ip51_k$ = function (_set____db54di) {
    this.decodeEnumsCaseInsensitive_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_decodeEnumsCaseInsensitive_7os6sm_k$ = function () {
    return this.decodeEnumsCaseInsensitive_1;
  };
  protoOf(JsonBuilder).set_allowTrailingComma_7uh9eg_k$ = function (_set____db54di) {
    this.allowTrailingComma_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_allowTrailingComma_7ql5if_k$ = function () {
    return this.allowTrailingComma_1;
  };
  protoOf(JsonBuilder).set_allowComments_gitw8b_k$ = function (_set____db54di) {
    this.allowComments_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_allowComments_9ik2es_k$ = function () {
    return this.allowComments_1;
  };
  protoOf(JsonBuilder).set_allowSpecialFloatingPointValues_xyc2ru_k$ = function (_set____db54di) {
    this.allowSpecialFloatingPointValues_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_allowSpecialFloatingPointValues_1eu5hp_k$ = function () {
    return this.allowSpecialFloatingPointValues_1;
  };
  protoOf(JsonBuilder).set_allowStructuredMapKeys_sxzxe_k$ = function (_set____db54di) {
    this.allowStructuredMapKeys_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_allowStructuredMapKeys_fk21t_k$ = function () {
    return this.allowStructuredMapKeys_1;
  };
  protoOf(JsonBuilder).set_useArrayPolymorphism_54w3tr_k$ = function (_set____db54di) {
    this.useArrayPolymorphism_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_useArrayPolymorphism_teidaa_k$ = function () {
    return this.useArrayPolymorphism_1;
  };
  protoOf(JsonBuilder).set_serializersModule_6xge6s_k$ = function (_set____db54di) {
    this.serializersModule_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_serializersModule_piitvg_k$ = function () {
    return this.serializersModule_1;
  };
  protoOf(JsonBuilder).set_exceptionsWithDebugInfo_7a40ez_k$ = function (_set____db54di) {
    this.exceptionsWithDebugInfo_1 = _set____db54di;
  };
  protoOf(JsonBuilder).get_exceptionsWithDebugInfo_ajrapa_k$ = function () {
    return this.exceptionsWithDebugInfo_1;
  };
  protoOf(JsonBuilder).build_bkh6qh_k$ = function () {
    if (this.useArrayPolymorphism_1) {
      // Inline function 'kotlin.require' call
      if (!(this.classDiscriminator_1 === 'type')) {
        var message = 'Class discriminator should not be specified when array polymorphism is specified';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.require' call
      if (!this.classDiscriminatorMode_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
        var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
    }
    if (!this.prettyPrint_1) {
      // Inline function 'kotlin.require' call
      if (!(this.prettyPrintIndent_1 === '    ')) {
        var message_1 = 'Indent should not be specified when default printing mode is used';
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
    } else if (!(this.prettyPrintIndent_1 === '    ')) {
      var tmp0 = this.prettyPrintIndent_1;
      var tmp$ret$6;
      $l$block: {
        // Inline function 'kotlin.text.all' call
        var inductionVariable = 0;
        while (inductionVariable < charSequenceLength(tmp0)) {
          var element = charSequenceGet(tmp0, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          if (!(element === _Char___init__impl__6a9atx(32) || element === _Char___init__impl__6a9atx(9) || element === _Char___init__impl__6a9atx(13) || element === _Char___init__impl__6a9atx(10))) {
            tmp$ret$6 = false;
            break $l$block;
          }
        }
        tmp$ret$6 = true;
      }
      var allWhitespaces = tmp$ret$6;
      // Inline function 'kotlin.require' call
      if (!allWhitespaces) {
        var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.prettyPrintIndent_1;
        throw IllegalArgumentException_init_$Create$(toString(message_2));
      }
    }
    return new JsonConfiguration(this.encodeDefaults_1, this.ignoreUnknownKeys_1, this.isLenient_1, this.allowStructuredMapKeys_1, this.prettyPrint_1, this.explicitNulls_1, this.prettyPrintIndent_1, this.coerceInputValues_1, this.useArrayPolymorphism_1, this.classDiscriminator_1, this.allowSpecialFloatingPointValues_1, this.useAlternativeNames_1, this.namingStrategy_1, this.decodeEnumsCaseInsensitive_1, this.allowTrailingComma_1, this.allowComments_1, this.classDiscriminatorMode_1, this.exceptionsWithDebugInfo_1);
  };
  function validateConfiguration($this) {
    if (equals($this.get_serializersModule_piitvg_k$(), EmptySerializersModule()))
      return Unit_getInstance();
    var collector = new JsonSerializersModuleValidator($this.configuration_1);
    $this.get_serializersModule_piitvg_k$().dumpTo_vt5sm4_k$(collector);
  }
  function JsonImpl(configuration, module_0) {
    Json.call(this, configuration, module_0);
    validateConfiguration(this);
  }
  function JsonClassDiscriminator(discriminator) {
    this.discriminator_1 = discriminator;
  }
  protoOf(JsonClassDiscriminator).get_discriminator_wfz2j1_k$ = function () {
    return this.discriminator_1;
  };
  protoOf(JsonClassDiscriminator).equals = function (other) {
    if (!(other instanceof JsonClassDiscriminator))
      return false;
    var tmp0_other_with_cast = other instanceof JsonClassDiscriminator ? other : THROW_CCE();
    if (!(this.discriminator_1 === tmp0_other_with_cast.discriminator_1))
      return false;
    return true;
  };
  protoOf(JsonClassDiscriminator).hashCode = function () {
    return imul(getStringHashCode('discriminator'), 127) ^ getStringHashCode(this.discriminator_1);
  };
  protoOf(JsonClassDiscriminator).toString = function () {
    return '@kotlinx.serialization.json.JsonClassDiscriminator(' + 'discriminator=' + this.discriminator_1 + ')';
  };
  function JsonIgnoreUnknownKeys() {
  }
  protoOf(JsonIgnoreUnknownKeys).equals = function (other) {
    if (!(other instanceof JsonIgnoreUnknownKeys))
      return false;
    other instanceof JsonIgnoreUnknownKeys || THROW_CCE();
    return true;
  };
  protoOf(JsonIgnoreUnknownKeys).hashCode = function () {
    return 0;
  };
  protoOf(JsonIgnoreUnknownKeys).toString = function () {
    return '@kotlinx.serialization.json.JsonIgnoreUnknownKeys(' + ')';
  };
  function JsonNames(names) {
    this.names_1 = names;
  }
  protoOf(JsonNames).get_names_ivn21r_k$ = function () {
    return this.names_1;
  };
  protoOf(JsonNames).equals = function (other) {
    if (!(other instanceof JsonNames))
      return false;
    var tmp0_other_with_cast = other instanceof JsonNames ? other : THROW_CCE();
    if (!contentEquals(this.names_1, tmp0_other_with_cast.names_1))
      return false;
    return true;
  };
  protoOf(JsonNames).hashCode = function () {
    return imul(getStringHashCode('names'), 127) ^ hashCode(this.names_1);
  };
  protoOf(JsonNames).toString = function () {
    return '@kotlinx.serialization.json.JsonNames(' + 'names=' + toString(this.names_1) + ')';
  };
  function JsonConfiguration(encodeDefaults, ignoreUnknownKeys, isLenient, allowStructuredMapKeys, prettyPrint, explicitNulls, prettyPrintIndent, coerceInputValues, useArrayPolymorphism, classDiscriminator, allowSpecialFloatingPointValues, useAlternativeNames, namingStrategy, decodeEnumsCaseInsensitive, allowTrailingComma, allowComments, classDiscriminatorMode, exceptionsWithDebugInfo) {
    encodeDefaults = encodeDefaults === VOID ? false : encodeDefaults;
    ignoreUnknownKeys = ignoreUnknownKeys === VOID ? false : ignoreUnknownKeys;
    isLenient = isLenient === VOID ? false : isLenient;
    allowStructuredMapKeys = allowStructuredMapKeys === VOID ? false : allowStructuredMapKeys;
    prettyPrint = prettyPrint === VOID ? false : prettyPrint;
    explicitNulls = explicitNulls === VOID ? true : explicitNulls;
    prettyPrintIndent = prettyPrintIndent === VOID ? '    ' : prettyPrintIndent;
    coerceInputValues = coerceInputValues === VOID ? false : coerceInputValues;
    useArrayPolymorphism = useArrayPolymorphism === VOID ? false : useArrayPolymorphism;
    classDiscriminator = classDiscriminator === VOID ? 'type' : classDiscriminator;
    allowSpecialFloatingPointValues = allowSpecialFloatingPointValues === VOID ? false : allowSpecialFloatingPointValues;
    useAlternativeNames = useAlternativeNames === VOID ? true : useAlternativeNames;
    namingStrategy = namingStrategy === VOID ? null : namingStrategy;
    decodeEnumsCaseInsensitive = decodeEnumsCaseInsensitive === VOID ? false : decodeEnumsCaseInsensitive;
    allowTrailingComma = allowTrailingComma === VOID ? false : allowTrailingComma;
    allowComments = allowComments === VOID ? false : allowComments;
    classDiscriminatorMode = classDiscriminatorMode === VOID ? ClassDiscriminatorMode_POLYMORPHIC_getInstance() : classDiscriminatorMode;
    exceptionsWithDebugInfo = exceptionsWithDebugInfo === VOID ? true : exceptionsWithDebugInfo;
    this.encodeDefaults_1 = encodeDefaults;
    this.ignoreUnknownKeys_1 = ignoreUnknownKeys;
    this.isLenient_1 = isLenient;
    this.allowStructuredMapKeys_1 = allowStructuredMapKeys;
    this.prettyPrint_1 = prettyPrint;
    this.explicitNulls_1 = explicitNulls;
    this.prettyPrintIndent_1 = prettyPrintIndent;
    this.coerceInputValues_1 = coerceInputValues;
    this.useArrayPolymorphism_1 = useArrayPolymorphism;
    this.classDiscriminator_1 = classDiscriminator;
    this.allowSpecialFloatingPointValues_1 = allowSpecialFloatingPointValues;
    this.useAlternativeNames_1 = useAlternativeNames;
    this.namingStrategy_1 = namingStrategy;
    this.decodeEnumsCaseInsensitive_1 = decodeEnumsCaseInsensitive;
    this.allowTrailingComma_1 = allowTrailingComma;
    this.allowComments_1 = allowComments;
    this.classDiscriminatorMode_1 = classDiscriminatorMode;
    this.exceptionsWithDebugInfo_1 = exceptionsWithDebugInfo;
  }
  protoOf(JsonConfiguration).get_encodeDefaults_m8plkf_k$ = function () {
    return this.encodeDefaults_1;
  };
  protoOf(JsonConfiguration).get_ignoreUnknownKeys_kvp19_k$ = function () {
    return this.ignoreUnknownKeys_1;
  };
  protoOf(JsonConfiguration).get_isLenient_1g1x8_k$ = function () {
    return this.isLenient_1;
  };
  protoOf(JsonConfiguration).get_allowStructuredMapKeys_fk21t_k$ = function () {
    return this.allowStructuredMapKeys_1;
  };
  protoOf(JsonConfiguration).get_prettyPrint_y7fmum_k$ = function () {
    return this.prettyPrint_1;
  };
  protoOf(JsonConfiguration).get_explicitNulls_ppiuof_k$ = function () {
    return this.explicitNulls_1;
  };
  protoOf(JsonConfiguration).get_prettyPrintIndent_5z3eey_k$ = function () {
    return this.prettyPrintIndent_1;
  };
  protoOf(JsonConfiguration).get_coerceInputValues_gdasvc_k$ = function () {
    return this.coerceInputValues_1;
  };
  protoOf(JsonConfiguration).get_useArrayPolymorphism_teidaa_k$ = function () {
    return this.useArrayPolymorphism_1;
  };
  protoOf(JsonConfiguration).get_classDiscriminator_x3y365_k$ = function () {
    return this.classDiscriminator_1;
  };
  protoOf(JsonConfiguration).get_allowSpecialFloatingPointValues_1eu5hp_k$ = function () {
    return this.allowSpecialFloatingPointValues_1;
  };
  protoOf(JsonConfiguration).get_useAlternativeNames_c5maqh_k$ = function () {
    return this.useAlternativeNames_1;
  };
  protoOf(JsonConfiguration).get_namingStrategy_kue0is_k$ = function () {
    return this.namingStrategy_1;
  };
  protoOf(JsonConfiguration).get_decodeEnumsCaseInsensitive_7os6sm_k$ = function () {
    return this.decodeEnumsCaseInsensitive_1;
  };
  protoOf(JsonConfiguration).get_allowTrailingComma_7ql5if_k$ = function () {
    return this.allowTrailingComma_1;
  };
  protoOf(JsonConfiguration).get_allowComments_9ik2es_k$ = function () {
    return this.allowComments_1;
  };
  protoOf(JsonConfiguration).set_classDiscriminatorMode_2roopg_k$ = function (_set____db54di) {
    this.classDiscriminatorMode_1 = _set____db54di;
  };
  protoOf(JsonConfiguration).get_classDiscriminatorMode_bmc7xs_k$ = function () {
    return this.classDiscriminatorMode_1;
  };
  protoOf(JsonConfiguration).set_exceptionsWithDebugInfo_7a40ez_k$ = function (_set____db54di) {
    this.exceptionsWithDebugInfo_1 = _set____db54di;
  };
  protoOf(JsonConfiguration).get_exceptionsWithDebugInfo_ajrapa_k$ = function () {
    return this.exceptionsWithDebugInfo_1;
  };
  protoOf(JsonConfiguration).toString = function () {
    return 'JsonConfiguration(encodeDefaults=' + this.encodeDefaults_1 + ', ignoreUnknownKeys=' + this.ignoreUnknownKeys_1 + ', isLenient=' + this.isLenient_1 + ', ' + ('allowStructuredMapKeys=' + this.allowStructuredMapKeys_1 + ', prettyPrint=' + this.prettyPrint_1 + ', explicitNulls=' + this.explicitNulls_1 + ', ') + ("prettyPrintIndent='" + this.prettyPrintIndent_1 + "', coerceInputValues=" + this.coerceInputValues_1 + ', useArrayPolymorphism=' + this.useArrayPolymorphism_1 + ', ') + ("classDiscriminator='" + this.classDiscriminator_1 + "', allowSpecialFloatingPointValues=" + this.allowSpecialFloatingPointValues_1 + ', ') + ('useAlternativeNames=' + this.useAlternativeNames_1 + ', namingStrategy=' + toString_0(this.namingStrategy_1) + ', decodeEnumsCaseInsensitive=' + this.decodeEnumsCaseInsensitive_1 + ', ') + ('allowTrailingComma=' + this.allowTrailingComma_1 + ', allowComments=' + this.allowComments_1 + ', classDiscriminatorMode=' + this.classDiscriminatorMode_1.toString() + ', exceptionsWithDebugInfo=' + this.exceptionsWithDebugInfo_1 + ')');
  };
  var ClassDiscriminatorMode_NONE_instance;
  var ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance;
  var ClassDiscriminatorMode_POLYMORPHIC_instance;
  function values() {
    return [ClassDiscriminatorMode_NONE_getInstance(), ClassDiscriminatorMode_ALL_JSON_OBJECTS_getInstance(), ClassDiscriminatorMode_POLYMORPHIC_getInstance()];
  }
  function valueOf(value) {
    switch (value) {
      case 'NONE':
        return ClassDiscriminatorMode_NONE_getInstance();
      case 'ALL_JSON_OBJECTS':
        return ClassDiscriminatorMode_ALL_JSON_OBJECTS_getInstance();
      case 'POLYMORPHIC':
        return ClassDiscriminatorMode_POLYMORPHIC_getInstance();
      default:
        ClassDiscriminatorMode_initEntries();
        THROW_IAE('No enum constant kotlinx.serialization.json.ClassDiscriminatorMode.' + value);
        break;
    }
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var ClassDiscriminatorMode_entriesInitialized;
  function ClassDiscriminatorMode_initEntries() {
    if (ClassDiscriminatorMode_entriesInitialized)
      return Unit_getInstance();
    ClassDiscriminatorMode_entriesInitialized = true;
    ClassDiscriminatorMode_NONE_instance = new ClassDiscriminatorMode('NONE', 0);
    ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance = new ClassDiscriminatorMode('ALL_JSON_OBJECTS', 1);
    ClassDiscriminatorMode_POLYMORPHIC_instance = new ClassDiscriminatorMode('POLYMORPHIC', 2);
  }
  var $ENTRIES;
  function ClassDiscriminatorMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ClassDiscriminatorMode_NONE_getInstance() {
    ClassDiscriminatorMode_initEntries();
    return ClassDiscriminatorMode_NONE_instance;
  }
  function ClassDiscriminatorMode_ALL_JSON_OBJECTS_getInstance() {
    ClassDiscriminatorMode_initEntries();
    return ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance;
  }
  function ClassDiscriminatorMode_POLYMORPHIC_getInstance() {
    ClassDiscriminatorMode_initEntries();
    return ClassDiscriminatorMode_POLYMORPHIC_instance;
  }
  function JsonDecoder() {
  }
  function get_jsonUnquotedLiteralDescriptor() {
    _init_properties_JsonElement_kt__7cbdc2();
    return jsonUnquotedLiteralDescriptor;
  }
  var jsonUnquotedLiteralDescriptor;
  function Companion() {
    Companion_instance = this;
  }
  protoOf(Companion).serializer_9w0wvi_k$ = function () {
    return JsonElementSerializer_getInstance();
  };
  var Companion_instance;
  function Companion_getInstance_3() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function JsonElement() {
    Companion_getInstance_3();
  }
  function _get_content__ps04ag($this) {
    return $this.content_1;
  }
  function Companion_0() {
    Companion_instance_0 = this;
  }
  protoOf(Companion_0).serializer_9w0wvi_k$ = function () {
    return JsonObjectSerializer_getInstance();
  };
  var Companion_instance_0;
  function Companion_getInstance_4() {
    if (Companion_instance_0 == null)
      new Companion_0();
    return Companion_instance_0;
  }
  function JsonObject$toString$lambda(_destruct__k2r9zo) {
    // Inline function 'kotlin.collections.component1' call
    var k = _destruct__k2r9zo.get_key_18j28a_k$();
    // Inline function 'kotlin.collections.component2' call
    var v = _destruct__k2r9zo.get_value_j01efc_k$();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    printQuoted(this_0, k);
    this_0.append_am5a4z_k$(_Char___init__impl__6a9atx(58));
    this_0.append_t8pm91_k$(v);
    return this_0.toString();
  }
  function JsonObject(content) {
    Companion_getInstance_4();
    JsonElement.call(this);
    this.content_1 = content;
  }
  protoOf(JsonObject).equals = function (other) {
    return equals(this.content_1, other);
  };
  protoOf(JsonObject).hashCode = function () {
    return hashCode(this.content_1);
  };
  protoOf(JsonObject).toString = function () {
    var tmp = this.content_1.get_entries_p20ztl_k$();
    return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
  };
  protoOf(JsonObject).isEmpty_y1axqb_k$ = function () {
    return this.content_1.isEmpty_y1axqb_k$();
  };
  protoOf(JsonObject).containsKey_w445h6_k$ = function (key) {
    return this.content_1.containsKey_aw81wo_k$(key);
  };
  protoOf(JsonObject).containsKey_aw81wo_k$ = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.containsKey_w445h6_k$((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).containsValue_2jzc8i_k$ = function (value) {
    return this.content_1.containsValue_yf2ykl_k$(value);
  };
  protoOf(JsonObject).containsValue_yf2ykl_k$ = function (value) {
    if (!(value instanceof JsonElement))
      return false;
    return this.containsValue_2jzc8i_k$(value instanceof JsonElement ? value : THROW_CCE());
  };
  protoOf(JsonObject).get_6bo4tg_k$ = function (key) {
    return this.content_1.get_wei43m_k$(key);
  };
  protoOf(JsonObject).get_wei43m_k$ = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.get_6bo4tg_k$((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).asJsReadonlyMapView_6h4p3w_k$ = function () {
    return this.content_1.asJsReadonlyMapView_6h4p3w_k$();
  };
  protoOf(JsonObject).get_size_woubt6_k$ = function () {
    return this.content_1.get_size_woubt6_k$();
  };
  protoOf(JsonObject).get_keys_wop4xp_k$ = function () {
    return this.content_1.get_keys_wop4xp_k$();
  };
  protoOf(JsonObject).get_values_ksazhn_k$ = function () {
    return this.content_1.get_values_ksazhn_k$();
  };
  protoOf(JsonObject).get_entries_p20ztl_k$ = function () {
    return this.content_1.get_entries_p20ztl_k$();
  };
  function Companion_1() {
    Companion_instance_1 = this;
  }
  protoOf(Companion_1).serializer_9w0wvi_k$ = function () {
    return JsonPrimitiveSerializer_getInstance();
  };
  var Companion_instance_1;
  function Companion_getInstance_5() {
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  function JsonPrimitive() {
    Companion_getInstance_5();
    JsonElement.call(this);
  }
  protoOf(JsonPrimitive).toString = function () {
    return this.get_content_h02jrk_k$();
  };
  function get_jsonPrimitive(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonPrimitive ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      error(_this__u8e3s4, 'JsonPrimitive');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function get_contentOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp;
    if (_this__u8e3s4 instanceof JsonNull) {
      tmp = null;
    } else {
      tmp = _this__u8e3s4.get_content_h02jrk_k$();
    }
    return tmp;
  }
  function error(_this__u8e3s4, element) {
    _init_properties_JsonElement_kt__7cbdc2();
    throw IllegalArgumentException_init_$Create$('Element ' + toString(getKClassFromExpression(_this__u8e3s4)) + ' is not a ' + element);
  }
  function JsonNull() {
    JsonNull_instance = this;
    JsonPrimitive.call(this);
    this.content_1 = 'null';
  }
  protoOf(JsonNull).get_isString_zep7bw_k$ = function () {
    return false;
  };
  protoOf(JsonNull).get_content_h02jrk_k$ = function () {
    return this.content_1;
  };
  protoOf(JsonNull).serializer_9w0wvi_k$ = function () {
    return JsonNullSerializer_getInstance();
  };
  protoOf(JsonNull).serializer_nv39qc_k$ = function (typeParamsSerializers) {
    return this.serializer_9w0wvi_k$();
  };
  var JsonNull_instance;
  function JsonNull_getInstance() {
    if (JsonNull_instance == null)
      new JsonNull();
    return JsonNull_instance;
  }
  function JsonPrimitive_0(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, false);
  }
  function JsonPrimitive_1(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, false);
  }
  function JsonPrimitive_2(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, true);
  }
  function JsonLiteral(body, isString, coerceToInlineType) {
    coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
    JsonPrimitive.call(this);
    this.isString_1 = isString;
    this.coerceToInlineType_1 = coerceToInlineType;
    this.content_1 = toString(body);
    if (!(this.coerceToInlineType_1 == null)) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.require' call
      if (!this.coerceToInlineType_1.get_isInline_usk17w_k$()) {
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(JsonLiteral).get_isString_zep7bw_k$ = function () {
    return this.isString_1;
  };
  protoOf(JsonLiteral).get_coerceToInlineType_3si9d7_k$ = function () {
    return this.coerceToInlineType_1;
  };
  protoOf(JsonLiteral).get_content_h02jrk_k$ = function () {
    return this.content_1;
  };
  protoOf(JsonLiteral).toString = function () {
    var tmp;
    if (this.isString_1) {
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      printQuoted(this_0, this.content_1);
      tmp = this_0.toString();
    } else {
      tmp = this.content_1;
    }
    return tmp;
  };
  protoOf(JsonLiteral).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof JsonLiteral))
      THROW_CCE();
    if (!(this.isString_1 === other.isString_1))
      return false;
    if (!(this.content_1 === other.content_1))
      return false;
    return true;
  };
  protoOf(JsonLiteral).hashCode = function () {
    var result = getBooleanHashCode(this.isString_1);
    result = imul(31, result) + getStringHashCode(this.content_1) | 0;
    return result;
  };
  function _get_content__ps04ag_0($this) {
    return $this.content_1;
  }
  function Companion_2() {
    Companion_instance_2 = this;
  }
  protoOf(Companion_2).serializer_9w0wvi_k$ = function () {
    return JsonArraySerializer_getInstance();
  };
  var Companion_instance_2;
  function Companion_getInstance_6() {
    if (Companion_instance_2 == null)
      new Companion_2();
    return Companion_instance_2;
  }
  function JsonArray(content) {
    Companion_getInstance_6();
    JsonElement.call(this);
    this.content_1 = content;
  }
  protoOf(JsonArray).equals = function (other) {
    return equals(this.content_1, other);
  };
  protoOf(JsonArray).hashCode = function () {
    return hashCode(this.content_1);
  };
  protoOf(JsonArray).toString = function () {
    return joinToString(this.content_1, ',', '[', ']');
  };
  protoOf(JsonArray).isEmpty_y1axqb_k$ = function () {
    return this.content_1.isEmpty_y1axqb_k$();
  };
  protoOf(JsonArray).contains_ba8w01_k$ = function (element) {
    return this.content_1.contains_aljjnj_k$(element);
  };
  protoOf(JsonArray).contains_aljjnj_k$ = function (element) {
    if (!(element instanceof JsonElement))
      return false;
    return this.contains_ba8w01_k$(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).iterator_jk1svi_k$ = function () {
    return this.content_1.iterator_jk1svi_k$();
  };
  protoOf(JsonArray).containsAll_vwrzfs_k$ = function (elements) {
    return this.content_1.containsAll_xk45sd_k$(elements);
  };
  protoOf(JsonArray).containsAll_xk45sd_k$ = function (elements) {
    return this.containsAll_vwrzfs_k$(elements);
  };
  protoOf(JsonArray).get_c1px32_k$ = function (index) {
    return this.content_1.get_c1px32_k$(index);
  };
  protoOf(JsonArray).indexOf_tu0qjb_k$ = function (element) {
    return this.content_1.indexOf_si1fv9_k$(element);
  };
  protoOf(JsonArray).indexOf_si1fv9_k$ = function (element) {
    if (!(element instanceof JsonElement))
      return -1;
    return this.indexOf_tu0qjb_k$(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).lastIndexOf_dcsgc3_k$ = function (element) {
    return this.content_1.lastIndexOf_v2p1fv_k$(element);
  };
  protoOf(JsonArray).lastIndexOf_v2p1fv_k$ = function (element) {
    if (!(element instanceof JsonElement))
      return -1;
    return this.lastIndexOf_dcsgc3_k$(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).listIterator_xjshxw_k$ = function () {
    return this.content_1.listIterator_xjshxw_k$();
  };
  protoOf(JsonArray).listIterator_70e65o_k$ = function (index) {
    return this.content_1.listIterator_70e65o_k$(index);
  };
  protoOf(JsonArray).subList_xle3r2_k$ = function (fromIndex, toIndex) {
    return this.content_1.subList_xle3r2_k$(fromIndex, toIndex);
  };
  protoOf(JsonArray).asJsReadonlyArrayView_ch6hjz_k$ = function () {
    return this.content_1.asJsReadonlyArrayView_ch6hjz_k$();
  };
  protoOf(JsonArray).get_size_woubt6_k$ = function () {
    return this.content_1.get_size_woubt6_k$();
  };
  function get_booleanOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toBooleanStrictOrNull_0(_this__u8e3s4.get_content_h02jrk_k$());
  }
  function parseLongImpl(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return StringJsonLexer_0(Default_getInstance(), _this__u8e3s4.get_content_h02jrk_k$()).consumeNumericLiteralFully_dgqq24_k$();
  }
  function get_float(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloat' call
    var this_0 = _this__u8e3s4.get_content_h02jrk_k$();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDouble(this_0);
  }
  function get_double(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toDouble(_this__u8e3s4.get_content_h02jrk_k$());
  }
  var properties_initialized_JsonElement_kt_abxy8s;
  function _init_properties_JsonElement_kt__7cbdc2() {
    if (!properties_initialized_JsonElement_kt_abxy8s) {
      properties_initialized_JsonElement_kt_abxy8s = true;
      jsonUnquotedLiteralDescriptor = InlinePrimitiveDescriptor('kotlinx.serialization.json.JsonUnquotedLiteral', serializer(StringCompanionObject_getInstance()));
    }
  }
  function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.element$default_ey7ac9_k$('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
    $this$buildSerialDescriptor.element$default_ey7ac9_k$('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
    $this$buildSerialDescriptor.element$default_ey7ac9_k$('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
    $this$buildSerialDescriptor.element$default_ey7ac9_k$('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
    $this$buildSerialDescriptor.element$default_ey7ac9_k$('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
    return Unit_getInstance();
  }
  function JsonElementSerializer$descriptor$lambda$lambda() {
    return JsonPrimitiveSerializer_getInstance().descriptor_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_0() {
    return JsonNullSerializer_getInstance().descriptor_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_1() {
    return JsonLiteralSerializer_getInstance().descriptor_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_2() {
    return JsonObjectSerializer_getInstance().descriptor_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_3() {
    return JsonArraySerializer_getInstance().descriptor_1;
  }
  function JsonElementSerializer() {
    JsonElementSerializer_instance = this;
    var tmp = this;
    var tmp_0 = SEALED_getInstance();
    tmp.descriptor_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
  }
  protoOf(JsonElementSerializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf(JsonElementSerializer).serialize_pk22vx_k$ = function (encoder, value) {
    verify(encoder);
    if (value instanceof JsonPrimitive) {
      encoder.encodeSerializableValue_3uuzip_k$(JsonPrimitiveSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonObject) {
        encoder.encodeSerializableValue_3uuzip_k$(JsonObjectSerializer_getInstance(), value);
      } else {
        if (value instanceof JsonArray) {
          encoder.encodeSerializableValue_3uuzip_k$(JsonArraySerializer_getInstance(), value);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
  };
  protoOf(JsonElementSerializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_pk22vx_k$(encoder, value instanceof JsonElement ? value : THROW_CCE());
  };
  protoOf(JsonElementSerializer).deserialize_sy6x50_k$ = function (decoder) {
    var input = asJsonDecoder(decoder);
    return input.decodeJsonElement_6lz9ye_k$();
  };
  var JsonElementSerializer_instance;
  function JsonElementSerializer_getInstance() {
    if (JsonElementSerializer_instance == null)
      new JsonElementSerializer();
    return JsonElementSerializer_instance;
  }
  function JsonObjectDescriptor() {
    JsonObjectDescriptor_instance = this;
    this.$$delegate_0__1 = MapSerializer(serializer(StringCompanionObject_getInstance()), JsonElementSerializer_getInstance()).get_descriptor_wjt6a0_k$();
    this.serialName_1 = 'kotlinx.serialization.json.JsonObject';
  }
  protoOf(JsonObjectDescriptor).get_serialName_u2rqhk_k$ = function () {
    return this.serialName_1;
  };
  protoOf(JsonObjectDescriptor).getElementName_u4sqmf_k$ = function (index) {
    return this.$$delegate_0__1.getElementName_u4sqmf_k$(index);
  };
  protoOf(JsonObjectDescriptor).getElementIndex_utfbym_k$ = function (name) {
    return this.$$delegate_0__1.getElementIndex_utfbym_k$(name);
  };
  protoOf(JsonObjectDescriptor).getElementAnnotations_omrjs6_k$ = function (index) {
    return this.$$delegate_0__1.getElementAnnotations_omrjs6_k$(index);
  };
  protoOf(JsonObjectDescriptor).getElementDescriptor_ncda77_k$ = function (index) {
    return this.$$delegate_0__1.getElementDescriptor_ncda77_k$(index);
  };
  protoOf(JsonObjectDescriptor).isElementOptional_heqq56_k$ = function (index) {
    return this.$$delegate_0__1.isElementOptional_heqq56_k$(index);
  };
  protoOf(JsonObjectDescriptor).get_kind_wop7ml_k$ = function () {
    return this.$$delegate_0__1.get_kind_wop7ml_k$();
  };
  protoOf(JsonObjectDescriptor).get_isNullable_67sy7o_k$ = function () {
    return this.$$delegate_0__1.get_isNullable_67sy7o_k$();
  };
  protoOf(JsonObjectDescriptor).get_isInline_usk17w_k$ = function () {
    return this.$$delegate_0__1.get_isInline_usk17w_k$();
  };
  protoOf(JsonObjectDescriptor).get_elementsCount_288r0x_k$ = function () {
    return this.$$delegate_0__1.get_elementsCount_288r0x_k$();
  };
  protoOf(JsonObjectDescriptor).get_annotations_20dirp_k$ = function () {
    return this.$$delegate_0__1.get_annotations_20dirp_k$();
  };
  var JsonObjectDescriptor_instance;
  function JsonObjectDescriptor_getInstance() {
    if (JsonObjectDescriptor_instance == null)
      new JsonObjectDescriptor();
    return JsonObjectDescriptor_instance;
  }
  function JsonObjectSerializer() {
    JsonObjectSerializer_instance = this;
    this.descriptor_1 = JsonObjectDescriptor_getInstance();
  }
  protoOf(JsonObjectSerializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf(JsonObjectSerializer).serialize_5h5gph_k$ = function (encoder, value) {
    verify(encoder);
    MapSerializer(serializer(StringCompanionObject_getInstance()), JsonElementSerializer_getInstance()).serialize_5ase3y_k$(encoder, value);
  };
  protoOf(JsonObjectSerializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_5h5gph_k$(encoder, value instanceof JsonObject ? value : THROW_CCE());
  };
  protoOf(JsonObjectSerializer).deserialize_sy6x50_k$ = function (decoder) {
    verify_0(decoder);
    return new JsonObject(MapSerializer(serializer(StringCompanionObject_getInstance()), JsonElementSerializer_getInstance()).deserialize_sy6x50_k$(decoder));
  };
  var JsonObjectSerializer_instance;
  function JsonObjectSerializer_getInstance() {
    if (JsonObjectSerializer_instance == null)
      new JsonObjectSerializer();
    return JsonObjectSerializer_instance;
  }
  function JsonPrimitiveSerializer() {
    JsonPrimitiveSerializer_instance = this;
    this.descriptor_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
  }
  protoOf(JsonPrimitiveSerializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf(JsonPrimitiveSerializer).serialize_p6n2zb_k$ = function (encoder, value) {
    verify(encoder);
    var tmp;
    if (value instanceof JsonNull) {
      encoder.encodeSerializableValue_3uuzip_k$(JsonNullSerializer_getInstance(), JsonNull_getInstance());
      tmp = Unit_getInstance();
    } else {
      var tmp_0 = JsonLiteralSerializer_getInstance();
      encoder.encodeSerializableValue_3uuzip_k$(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
      tmp = Unit_getInstance();
    }
    return tmp;
  };
  protoOf(JsonPrimitiveSerializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_p6n2zb_k$(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
  };
  protoOf(JsonPrimitiveSerializer).deserialize_sy6x50_k$ = function (decoder) {
    var jsonDecoder = asJsonDecoder(decoder);
    var result = jsonDecoder.decodeJsonElement_6lz9ye_k$();
    if (!(result instanceof JsonPrimitive)) {
      // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
      var shortMessage = 'Unexpected JSON element, expected JsonPrimitive, had ' + toString(getKClassFromExpression(result));
      var tmp;
      if (jsonDecoder.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
        var tmp$ret$3 = toString(result);
        tmp = toString(minify(tmp$ret$3));
      } else {
        tmp = null;
      }
      var inputValue = tmp;
      throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, shortMessage, null, null, inputValue), shortMessage, -1, null, inputValue, null);
    }
    return result;
  };
  var JsonPrimitiveSerializer_instance;
  function JsonPrimitiveSerializer_getInstance() {
    if (JsonPrimitiveSerializer_instance == null)
      new JsonPrimitiveSerializer();
    return JsonPrimitiveSerializer_instance;
  }
  function JsonNullSerializer() {
    JsonNullSerializer_instance = this;
    this.descriptor_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
  }
  protoOf(JsonNullSerializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf(JsonNullSerializer).serialize_52d5kl_k$ = function (encoder, value) {
    verify(encoder);
    encoder.encodeNull_ejiosz_k$();
  };
  protoOf(JsonNullSerializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_52d5kl_k$(encoder, value instanceof JsonNull ? value : THROW_CCE());
  };
  protoOf(JsonNullSerializer).deserialize_sy6x50_k$ = function (decoder) {
    verify_0(decoder);
    if (decoder.decodeNotNullMark_us4ba1_k$()) {
      throw decodingExceptionOf_0("Expected 'null' literal");
    }
    decoder.decodeNull_jzrmuj_k$();
    return JsonNull_getInstance();
  };
  var JsonNullSerializer_instance;
  function JsonNullSerializer_getInstance() {
    if (JsonNullSerializer_instance == null)
      new JsonNullSerializer();
    return JsonNullSerializer_instance;
  }
  function JsonArrayDescriptor() {
    JsonArrayDescriptor_instance = this;
    this.$$delegate_0__1 = ListSerializer(JsonElementSerializer_getInstance()).get_descriptor_wjt6a0_k$();
    this.serialName_1 = 'kotlinx.serialization.json.JsonArray';
  }
  protoOf(JsonArrayDescriptor).get_serialName_u2rqhk_k$ = function () {
    return this.serialName_1;
  };
  protoOf(JsonArrayDescriptor).getElementName_u4sqmf_k$ = function (index) {
    return this.$$delegate_0__1.getElementName_u4sqmf_k$(index);
  };
  protoOf(JsonArrayDescriptor).getElementIndex_utfbym_k$ = function (name) {
    return this.$$delegate_0__1.getElementIndex_utfbym_k$(name);
  };
  protoOf(JsonArrayDescriptor).getElementAnnotations_omrjs6_k$ = function (index) {
    return this.$$delegate_0__1.getElementAnnotations_omrjs6_k$(index);
  };
  protoOf(JsonArrayDescriptor).getElementDescriptor_ncda77_k$ = function (index) {
    return this.$$delegate_0__1.getElementDescriptor_ncda77_k$(index);
  };
  protoOf(JsonArrayDescriptor).isElementOptional_heqq56_k$ = function (index) {
    return this.$$delegate_0__1.isElementOptional_heqq56_k$(index);
  };
  protoOf(JsonArrayDescriptor).get_kind_wop7ml_k$ = function () {
    return this.$$delegate_0__1.get_kind_wop7ml_k$();
  };
  protoOf(JsonArrayDescriptor).get_isNullable_67sy7o_k$ = function () {
    return this.$$delegate_0__1.get_isNullable_67sy7o_k$();
  };
  protoOf(JsonArrayDescriptor).get_isInline_usk17w_k$ = function () {
    return this.$$delegate_0__1.get_isInline_usk17w_k$();
  };
  protoOf(JsonArrayDescriptor).get_elementsCount_288r0x_k$ = function () {
    return this.$$delegate_0__1.get_elementsCount_288r0x_k$();
  };
  protoOf(JsonArrayDescriptor).get_annotations_20dirp_k$ = function () {
    return this.$$delegate_0__1.get_annotations_20dirp_k$();
  };
  var JsonArrayDescriptor_instance;
  function JsonArrayDescriptor_getInstance() {
    if (JsonArrayDescriptor_instance == null)
      new JsonArrayDescriptor();
    return JsonArrayDescriptor_instance;
  }
  function JsonArraySerializer() {
    JsonArraySerializer_instance = this;
    this.descriptor_1 = JsonArrayDescriptor_getInstance();
  }
  protoOf(JsonArraySerializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf(JsonArraySerializer).serialize_5lsxsr_k$ = function (encoder, value) {
    verify(encoder);
    ListSerializer(JsonElementSerializer_getInstance()).serialize_5ase3y_k$(encoder, value);
  };
  protoOf(JsonArraySerializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_5lsxsr_k$(encoder, value instanceof JsonArray ? value : THROW_CCE());
  };
  protoOf(JsonArraySerializer).deserialize_sy6x50_k$ = function (decoder) {
    verify_0(decoder);
    return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).deserialize_sy6x50_k$(decoder));
  };
  var JsonArraySerializer_instance;
  function JsonArraySerializer_getInstance() {
    if (JsonArraySerializer_instance == null)
      new JsonArraySerializer();
    return JsonArraySerializer_instance;
  }
  function defer(deferred) {
    return new defer$1(deferred);
  }
  function JsonLiteralSerializer() {
    JsonLiteralSerializer_instance = this;
    this.descriptor_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
  }
  protoOf(JsonLiteralSerializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf(JsonLiteralSerializer).serialize_1mrbye_k$ = function (encoder, value) {
    verify(encoder);
    if (value.get_isString_zep7bw_k$()) {
      return encoder.encodeString_424b5v_k$(value.get_content_h02jrk_k$());
    }
    if (!(value.get_coerceToInlineType_3si9d7_k$() == null)) {
      return encoder.encodeInline_wxp5pu_k$(value.get_coerceToInlineType_3si9d7_k$()).encodeString_424b5v_k$(value.get_content_h02jrk_k$());
    }
    var tmp0_safe_receiver = toLongOrNull(value.get_content_h02jrk_k$());
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.encodeLong_3didw_k$(tmp0_safe_receiver);
    }
    var tmp1_safe_receiver = toULongOrNull(value.get_content_h02jrk_k$());
    var tmp = tmp1_safe_receiver;
    if ((tmp == null ? null : new ULong(tmp)) == null)
      null;
    else {
      var tmp_0 = tmp1_safe_receiver;
      // Inline function 'kotlin.let' call
      var it = (tmp_0 == null ? null : new ULong(tmp_0)).data_1;
      var tmp_1 = encoder.encodeInline_wxp5pu_k$(serializer_0(Companion_getInstance()).get_descriptor_wjt6a0_k$());
      // Inline function 'kotlin.ULong.toLong' call
      var tmp$ret$4 = _ULong___get_data__impl__fggpzb(it);
      tmp_1.encodeLong_3didw_k$(tmp$ret$4);
      return Unit_getInstance();
    }
    var tmp2_safe_receiver = toDoubleOrNull(value.get_content_h02jrk_k$());
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.encodeDouble_n270q9_k$(tmp2_safe_receiver);
    }
    var tmp3_safe_receiver = toBooleanStrictOrNull(value.get_content_h02jrk_k$());
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.encodeBoolean_tu2e59_k$(tmp3_safe_receiver);
    }
    encoder.encodeString_424b5v_k$(value.get_content_h02jrk_k$());
  };
  protoOf(JsonLiteralSerializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_1mrbye_k$(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
  };
  protoOf(JsonLiteralSerializer).deserialize_sy6x50_k$ = function (decoder) {
    var jsonDecoder = asJsonDecoder(decoder);
    var result = jsonDecoder.decodeJsonElement_6lz9ye_k$();
    if (!(result instanceof JsonLiteral)) {
      // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
      var shortMessage = 'Unexpected JSON element, expected JsonLiteral, had ' + toString(getKClassFromExpression(result));
      var tmp;
      if (jsonDecoder.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
        var tmp$ret$3 = toString(result);
        tmp = toString(minify(tmp$ret$3));
      } else {
        tmp = null;
      }
      var inputValue = tmp;
      throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, shortMessage, null, null, inputValue), shortMessage, -1, null, inputValue, null);
    }
    return result;
  };
  var JsonLiteralSerializer_instance;
  function JsonLiteralSerializer_getInstance() {
    if (JsonLiteralSerializer_instance == null)
      new JsonLiteralSerializer();
    return JsonLiteralSerializer_instance;
  }
  function verify(encoder) {
    asJsonEncoder(encoder);
  }
  function asJsonDecoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonDecoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Decoder to be JsonDecoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function verify_0(decoder) {
    asJsonDecoder(decoder);
  }
  function asJsonEncoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonEncoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Encoder to be JsonEncoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function _get_original__l7ku1m($this) {
    var tmp0 = $this.original$delegate_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('original', 1, tmp, defer$o$_get_original_$ref_3cje7k(), null);
    return tmp0.get_value_j01efc_k$();
  }
  function defer$o$_get_original_$ref_3cje7k() {
    return constructCallableReference(function (p0) {
      return _get_original__l7ku1m(p0);
    }, 1, 0, "[ File 'Z:/BuildAgent/work/b2fef8360e1bcf3d/formats/json/commonMain/src/kotlinx/serialization/json/JsonElementSerializers.kt' <- [ File 'Z:/BuildAgent/work/b2fef8360e1bcf3d/formats/json/commonMain/src/kotlinx/serialization/json/JsonElementSerializers.kt' <- kotlinx.serialization.json/defer|defer(kotlin.Function0<kotlinx.serialization.descriptors.SerialDescriptor>){}[0] ]:11:13:15 ]");
  }
  function defer$1($deferred) {
    this.original$delegate_1 = lazy($deferred);
  }
  protoOf(defer$1).get_serialName_u2rqhk_k$ = function () {
    return _get_original__l7ku1m(this).get_serialName_u2rqhk_k$();
  };
  protoOf(defer$1).get_kind_wop7ml_k$ = function () {
    return _get_original__l7ku1m(this).get_kind_wop7ml_k$();
  };
  protoOf(defer$1).get_elementsCount_288r0x_k$ = function () {
    return _get_original__l7ku1m(this).get_elementsCount_288r0x_k$();
  };
  protoOf(defer$1).getElementName_u4sqmf_k$ = function (index) {
    return _get_original__l7ku1m(this).getElementName_u4sqmf_k$(index);
  };
  protoOf(defer$1).getElementIndex_utfbym_k$ = function (name) {
    return _get_original__l7ku1m(this).getElementIndex_utfbym_k$(name);
  };
  protoOf(defer$1).getElementAnnotations_omrjs6_k$ = function (index) {
    return _get_original__l7ku1m(this).getElementAnnotations_omrjs6_k$(index);
  };
  protoOf(defer$1).getElementDescriptor_ncda77_k$ = function (index) {
    return _get_original__l7ku1m(this).getElementDescriptor_ncda77_k$(index);
  };
  protoOf(defer$1).isElementOptional_heqq56_k$ = function (index) {
    return _get_original__l7ku1m(this).isElementOptional_heqq56_k$(index);
  };
  function JsonEncoder() {
  }
  function JsonDecodingException(fullMessage, shortMessage, offset, path, input, hint) {
    JsonException.call(this, fullMessage);
    captureStack(this, JsonDecodingException);
    this.shortMessage_1 = shortMessage;
    this.offset_1 = offset;
    this.path_1 = path;
    this.input_1 = input;
    this.hint_1 = hint;
  }
  protoOf(JsonDecodingException).get_shortMessage_px6ymk_k$ = function () {
    return this.shortMessage_1;
  };
  protoOf(JsonDecodingException).get_offset_hjmqak_k$ = function () {
    return this.offset_1;
  };
  protoOf(JsonDecodingException).get_path_wos8ry_k$ = function () {
    return this.path_1;
  };
  protoOf(JsonDecodingException).get_input_it4gip_k$ = function () {
    return this.input_1;
  };
  protoOf(JsonDecodingException).get_hint_wonaog_k$ = function () {
    return this.hint_1;
  };
  function JsonEncodingException(shortMessage, classSerialName, hint) {
    classSerialName = classSerialName === VOID ? null : classSerialName;
    hint = hint === VOID ? null : hint;
    JsonException.call(this, formatEncodingException(shortMessage, hint));
    captureStack(this, JsonEncodingException);
    this.shortMessage_1 = shortMessage;
    this.classSerialName_1 = classSerialName;
    this.hint_1 = hint;
  }
  protoOf(JsonEncodingException).get_shortMessage_px6ymk_k$ = function () {
    return this.shortMessage_1;
  };
  protoOf(JsonEncodingException).get_classSerialName_ptk7n6_k$ = function () {
    return this.classSerialName_1;
  };
  protoOf(JsonEncodingException).get_hint_wonaog_k$ = function () {
    return this.hint_1;
  };
  function JsonException(message) {
    SerializationException_init_$Init$(message, this);
    captureStack(this, JsonException);
    this.message_1 = message;
    delete this.message;
  }
  protoOf(JsonException).get_message_h23axq_k$ = function () {
    return this.message_1;
  };
  function convertCamelCase($this, serialName, delimiter) {
    // Inline function 'kotlin.text.buildString' call
    var capacity = imul(serialName.length, 2);
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$_0(capacity);
    var bufferedChar = null;
    var previousUpperCharsCount = 0;
    // Inline function 'kotlin.text.forEach' call
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(serialName)) {
      var element = charSequenceGet(serialName, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      if (isUpperCase(element)) {
        var tmp;
        var tmp_0;
        if (previousUpperCharsCount === 0) {
          // Inline function 'kotlin.text.isNotEmpty' call
          tmp_0 = charSequenceLength(this_0) > 0;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = !(last(this_0) === delimiter);
        } else {
          tmp = false;
        }
        if (tmp) {
          this_0.append_am5a4z_k$(delimiter);
        }
        var tmp0_safe_receiver = bufferedChar;
        var tmp_1 = tmp0_safe_receiver;
        if ((tmp_1 == null ? null : new Char(tmp_1)) == null)
          null;
        else {
          var tmp_2 = tmp0_safe_receiver;
          // Inline function 'kotlin.let' call
          var p0 = (tmp_2 == null ? null : new Char(tmp_2)).value_1;
          this_0.append_am5a4z_k$(p0);
        }
        previousUpperCharsCount = previousUpperCharsCount + 1 | 0;
        // Inline function 'kotlin.text.lowercaseChar' call
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp$ret$9 = toString_1(element).toLowerCase();
        bufferedChar = charCodeAt(tmp$ret$9, 0);
      } else {
        var tmp_3 = bufferedChar;
        if (!((tmp_3 == null ? null : new Char(tmp_3)) == null)) {
          if (previousUpperCharsCount > 1 && isLetter(element)) {
            this_0.append_am5a4z_k$(delimiter);
          }
          this_0.append_am5a4z_k$(bufferedChar);
          previousUpperCharsCount = 0;
          bufferedChar = null;
        }
        this_0.append_am5a4z_k$(element);
      }
    }
    var tmp_4 = bufferedChar;
    if (!((tmp_4 == null ? null : new Char(tmp_4)) == null)) {
      this_0.append_am5a4z_k$(bufferedChar);
    }
    return this_0.toString();
  }
  function JsonNamingStrategy$Builtins$SnakeCase$1() {
  }
  protoOf(JsonNamingStrategy$Builtins$SnakeCase$1).serialNameForJson_tclx3n_k$ = function (descriptor, elementIndex, serialName) {
    return convertCamelCase(Builtins_getInstance(), serialName, _Char___init__impl__6a9atx(95));
  };
  protoOf(JsonNamingStrategy$Builtins$SnakeCase$1).toString = function () {
    return 'kotlinx.serialization.json.JsonNamingStrategy.SnakeCase';
  };
  function JsonNamingStrategy$Builtins$KebabCase$1() {
  }
  protoOf(JsonNamingStrategy$Builtins$KebabCase$1).serialNameForJson_tclx3n_k$ = function (descriptor, elementIndex, serialName) {
    return convertCamelCase(Builtins_getInstance(), serialName, _Char___init__impl__6a9atx(45));
  };
  protoOf(JsonNamingStrategy$Builtins$KebabCase$1).toString = function () {
    return 'kotlinx.serialization.json.JsonNamingStrategy.KebabCase';
  };
  function Builtins() {
    Builtins_instance = this;
    var tmp = this;
    tmp.SnakeCase_1 = new JsonNamingStrategy$Builtins$SnakeCase$1();
    var tmp_0 = this;
    tmp_0.KebabCase_1 = new JsonNamingStrategy$Builtins$KebabCase$1();
  }
  protoOf(Builtins).get_SnakeCase_rzhe7t_k$ = function () {
    return this.SnakeCase_1;
  };
  protoOf(Builtins).get_KebabCase_wo790w_k$ = function () {
    return this.KebabCase_1;
  };
  var Builtins_instance;
  function Builtins_getInstance() {
    if (Builtins_instance == null)
      new Builtins();
    return Builtins_instance;
  }
  function JsonNamingStrategy() {
  }
  function Composer(writer) {
    this.writer_1 = writer;
    this.writingFirst_1 = true;
  }
  protoOf(Composer).get_writer_fne0c5_k$ = function () {
    return this.writer_1;
  };
  protoOf(Composer).set_writingFirst_nwqbyc_k$ = function (_set____db54di) {
    this.writingFirst_1 = _set____db54di;
  };
  protoOf(Composer).get_writingFirst_pt5bb1_k$ = function () {
    return this.writingFirst_1;
  };
  protoOf(Composer).indent_cuntic_k$ = function () {
    this.writingFirst_1 = true;
  };
  protoOf(Composer).unIndent_45q4lx_k$ = function () {
    return Unit_getInstance();
  };
  protoOf(Composer).nextItem_40n9p2_k$ = function () {
    this.writingFirst_1 = false;
  };
  protoOf(Composer).nextItemIfNotFirst_9wb040_k$ = function () {
    this.writingFirst_1 = false;
  };
  protoOf(Composer).space_po67ue_k$ = function () {
    return Unit_getInstance();
  };
  protoOf(Composer).print_uoq3bk_k$ = function (v) {
    return this.writer_1.writeChar_w2y76g_k$(v);
  };
  protoOf(Composer).print_wtfns3_k$ = function (v) {
    return this.writer_1.write_mozxwr_k$(v);
  };
  protoOf(Composer).print_81xt5n_k$ = function (v) {
    return this.writer_1.write_mozxwr_k$(v.toString());
  };
  protoOf(Composer).print_3xddxz_k$ = function (v) {
    return this.writer_1.write_mozxwr_k$(v.toString());
  };
  protoOf(Composer).print_p65m4b_k$ = function (v) {
    return this.writer_1.writeLong_2rx6yl_k$(fromInt(v));
  };
  protoOf(Composer).print_l5t6fv_k$ = function (v) {
    return this.writer_1.writeLong_2rx6yl_k$(fromInt(v));
  };
  protoOf(Composer).print_ay1yo5_k$ = function (v) {
    return this.writer_1.writeLong_2rx6yl_k$(fromInt(v));
  };
  protoOf(Composer).print_adpg1_k$ = function (v) {
    return this.writer_1.writeLong_2rx6yl_k$(v);
  };
  protoOf(Composer).print_u0bpvs_k$ = function (v) {
    return this.writer_1.write_mozxwr_k$(v.toString());
  };
  protoOf(Composer).printQuoted_gtxn2t_k$ = function (value) {
    return this.writer_1.writeQuoted_k770v7_k$(value);
  };
  function Composer_0(sb, json) {
    return json.get_configuration_uqypjh_k$().get_prettyPrint_y7fmum_k$() ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
  }
  function _get_forceQuoting__rl6hq5($this) {
    return $this.forceQuoting_1;
  }
  function ComposerForUnsignedNumbers(writer, forceQuoting) {
    Composer.call(this, writer);
    this.forceQuoting_1 = forceQuoting;
  }
  protoOf(ComposerForUnsignedNumbers).print_ay1yo5_k$ = function (v) {
    if (this.forceQuoting_1) {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
      this.printQuoted_gtxn2t_k$(UInt__toString_impl_dbgl21(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
      this.print_wtfns3_k$(UInt__toString_impl_dbgl21(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).print_adpg1_k$ = function (v) {
    if (this.forceQuoting_1) {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
      this.printQuoted_gtxn2t_k$(ULong__toString_impl_f9au7k(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
      this.print_wtfns3_k$(ULong__toString_impl_f9au7k(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).print_p65m4b_k$ = function (v) {
    if (this.forceQuoting_1) {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
      this.printQuoted_gtxn2t_k$(UByte__toString_impl_v72jg(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
      this.print_wtfns3_k$(UByte__toString_impl_v72jg(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).print_l5t6fv_k$ = function (v) {
    if (this.forceQuoting_1) {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$0 = _UShort___init__impl__jigrne(v);
      this.printQuoted_gtxn2t_k$(UShort__toString_impl_edaoee(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$1 = _UShort___init__impl__jigrne(v);
      this.print_wtfns3_k$(UShort__toString_impl_edaoee(tmp$ret$1));
    }
  };
  function _get_forceQuoting__rl6hq5_0($this) {
    return $this.forceQuoting_1;
  }
  function ComposerForUnquotedLiterals(writer, forceQuoting) {
    Composer.call(this, writer);
    this.forceQuoting_1 = forceQuoting;
  }
  protoOf(ComposerForUnquotedLiterals).printQuoted_gtxn2t_k$ = function (value) {
    if (this.forceQuoting_1) {
      protoOf(Composer).printQuoted_gtxn2t_k$.call(this, value);
    } else {
      protoOf(Composer).print_wtfns3_k$.call(this, value);
    }
  };
  function _get_json__d8whur($this) {
    return $this.json_1;
  }
  function _set_level__h8xxz5($this, _set____db54di) {
    $this.level_1 = _set____db54di;
  }
  function _get_level__es6iib($this) {
    return $this.level_1;
  }
  function ComposerWithPrettyPrint(writer, json) {
    Composer.call(this, writer);
    this.json_1 = json;
    this.level_1 = 0;
  }
  protoOf(ComposerWithPrettyPrint).indent_cuntic_k$ = function () {
    this.writingFirst_1 = true;
    this.level_1 = this.level_1 + 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).unIndent_45q4lx_k$ = function () {
    this.level_1 = this.level_1 - 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).nextItem_40n9p2_k$ = function () {
    this.writingFirst_1 = false;
    this.print_wtfns3_k$('\n');
    // Inline function 'kotlin.repeat' call
    var times = this.level_1;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.print_wtfns3_k$(this.json_1.get_configuration_uqypjh_k$().get_prettyPrintIndent_5z3eey_k$());
      }
       while (inductionVariable < times);
  };
  protoOf(ComposerWithPrettyPrint).nextItemIfNotFirst_9wb040_k$ = function () {
    if (this.writingFirst_1)
      this.writingFirst_1 = false;
    else {
      this.nextItem_40n9p2_k$();
    }
  };
  protoOf(ComposerWithPrettyPrint).space_po67ue_k$ = function () {
    this.print_uoq3bk_k$(_Char___init__impl__6a9atx(32));
  };
  function _get_origin__hwq945($this) {
    return $this.origin_1;
  }
  function _set_isUnmarkedNull__eo66w1($this, _set____db54di) {
    $this.isUnmarkedNull_1 = _set____db54di;
  }
  function readIfAbsent($this, descriptor, index) {
    $this.isUnmarkedNull_1 = (!descriptor.isElementOptional_heqq56_k$(index) && descriptor.getElementDescriptor_ncda77_k$(index).get_isNullable_67sy7o_k$());
    return $this.isUnmarkedNull_1;
  }
  function JsonElementMarker$readIfAbsent$ref(p0) {
    return constructCallableReference(function (p0_0, p1) {
      var tmp0 = p0;
      return readIfAbsent(tmp0, p0_0, p1);
    }, 2, 0, 'kotlinx.serialization.json.internal/JsonElementMarker.readIfAbsent|readIfAbsent(kotlinx.serialization.descriptors.SerialDescriptor;kotlin.Int){}[0]', 'readIfAbsent', [p0]);
  }
  function JsonElementMarker(descriptor) {
    var tmp = this;
    tmp.origin_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
    this.isUnmarkedNull_1 = false;
  }
  protoOf(JsonElementMarker).get_isUnmarkedNull_855yq0_k$ = function () {
    return this.isUnmarkedNull_1;
  };
  protoOf(JsonElementMarker).mark_lz09aa_k$ = function (index) {
    this.origin_1.mark_qmjjl1_k$(index);
  };
  protoOf(JsonElementMarker).nextUnmarkedIndex_feexpp_k$ = function () {
    return this.origin_1.nextUnmarkedIndex_u6mxd2_k$();
  };
  function decodingExceptionOf(_this__u8e3s4, shortMessage, path, hint, input) {
    path = path === VOID ? null : path;
    hint = hint === VOID ? null : hint;
    // Inline function 'kotlinx.serialization.json.internal.ifDebugInput' call
    var tmp;
    if (_this__u8e3s4.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
      tmp = toString(minify(input()));
    } else {
      tmp = null;
    }
    var inputValue = tmp;
    return new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, shortMessage, path, hint, inputValue), shortMessage, -1, path, inputValue, hint);
  }
  function minify(_this__u8e3s4, offset) {
    offset = offset === VOID ? -1 : offset;
    if (charSequenceLength(_this__u8e3s4) < 200)
      return _this__u8e3s4;
    if (offset === -1) {
      var start = charSequenceLength(_this__u8e3s4) - 60 | 0;
      if (start <= 0)
        return _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var endIndex = charSequenceLength(_this__u8e3s4);
      return '.....' + toString(charSequenceSubSequence(_this__u8e3s4, start, endIndex));
    }
    var start_0 = offset - 30 | 0;
    var end = offset + 30 | 0;
    var prefix = start_0 <= 0 ? '' : '.....';
    var suffix = end >= charSequenceLength(_this__u8e3s4) ? '' : '.....';
    var tmp2 = coerceAtLeast(start_0, 0);
    // Inline function 'kotlin.text.substring' call
    var endIndex_0 = coerceAtMost(end, charSequenceLength(_this__u8e3s4));
    return prefix + toString(charSequenceSubSequence(_this__u8e3s4, tmp2, endIndex_0)) + suffix;
  }
  function access$formatDecodingException$tJsonExceptionsKt(offset, shortMessage, path, hint, input) {
    return formatDecodingException(offset, shortMessage, path, hint, input);
  }
  function invalidTrailingComma(_this__u8e3s4, entity) {
    entity = entity === VOID ? 'object' : entity;
    _this__u8e3s4.fail_5m5zd7_k$('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.get_currentPosition_5vz2du_k$() - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
  }
  function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
    _this__u8e3s4.fail$default_ly4hfp_k$(nonFiniteFpMessage(result, null), VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
  }
  function InvalidKeyKindException(keyDescriptor) {
    return new JsonEncodingException("Value of type '" + keyDescriptor.get_serialName_u2rqhk_k$() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.get_kind_wop7ml_k$().toString() + "'"), keyDescriptor.get_serialName_u2rqhk_k$(), "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
  }
  function InvalidFloatingPointEncoded(value, key) {
    key = key === VOID ? null : key;
    return new JsonEncodingException(nonFiniteFpMessage(value, key), VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
  }
  function InvalidFloatingPointDecoded(_this__u8e3s4, value, key, input) {
    var tmp2 = access$nonFiniteFpMessage$tJsonExceptionsKt(value, key);
    // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
    var hint = "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'";
    // Inline function 'kotlinx.serialization.json.internal.ifDebugInput' call
    var tmp;
    if (_this__u8e3s4.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
      tmp = toString(minify(input()));
    } else {
      tmp = null;
    }
    var inputValue = tmp;
    return new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, null, hint, inputValue), tmp2, -1, null, inputValue, hint);
  }
  function access$nonFiniteFpMessage$tJsonExceptionsKt(value, key) {
    return nonFiniteFpMessage(value, key);
  }
  function decodingExceptionOf_0(shortMessage) {
    return new JsonDecodingException(formatDecodingException(-1, shortMessage, null, null, null), shortMessage, -1, null, null, null);
  }
  function decodingExceptionOf_1(_this__u8e3s4, shortMessage, offset, path, hint, input) {
    // Inline function 'kotlinx.serialization.json.internal.ifDebugInput' call
    var tmp;
    if (_this__u8e3s4.get_configuration_m9t6me_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
      tmp = toString(minify(input, offset));
    } else {
      tmp = null;
    }
    var inputValue = tmp;
    return new JsonDecodingException(formatDecodingException(offset, shortMessage, path, hint, inputValue), shortMessage, offset, path, inputValue, hint);
  }
  function formatEncodingException(shortMessage, hint) {
    var tmp;
    // Inline function 'kotlin.text.isNullOrBlank' call
    if (hint == null || isBlank(hint)) {
      tmp = '';
    } else {
      tmp = '\n' + hint;
    }
    return shortMessage + tmp;
  }
  function ifDebugInput(_this__u8e3s4, block) {
    return _this__u8e3s4.get_exceptionsWithDebugInfo_ajrapa_k$() ? block() : null;
  }
  function formatDecodingException(offset, shortMessage, path, hint, input) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    if (offset >= 0) {
      this_0.append_22ad7x_k$('Unexpected JSON token at offset ' + offset + ': ');
    }
    this_0.append_22ad7x_k$(shortMessage);
    // Inline function 'kotlin.text.isNullOrBlank' call
    if (!(path == null || isBlank(path))) {
      this_0.append_22ad7x_k$(' at path: ');
      this_0.append_22ad7x_k$(path);
    }
    // Inline function 'kotlin.text.isNullOrBlank' call
    if (!(hint == null || isBlank(hint))) {
      this_0.append_22ad7x_k$('\n' + hint);
    }
    if (!(input == null)) {
      this_0.append_22ad7x_k$('\nJSON input: ');
      this_0.append_22ad7x_k$(input);
    }
    return this_0.toString();
  }
  function nonFiniteFpMessage(value, key) {
    return 'Unexpected special floating-point value ' + toString(value) + (!(key == null) ? ' with key ' + key + '. ' : '. ') + 'By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification.';
  }
  function get_JsonDeserializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonDeserializationNamesKey;
  }
  var JsonDeserializationNamesKey;
  function get_JsonSerializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonSerializationNamesKey;
  }
  var JsonSerializationNamesKey;
  function ignoreUnknownKeys(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp;
    if (json.get_configuration_uqypjh_k$().get_ignoreUnknownKeys_kvp19_k$()) {
      tmp = true;
    } else {
      var tmp0 = _this__u8e3s4.get_annotations_20dirp_k$();
      var tmp$ret$0;
      $l$block_0: {
        // Inline function 'kotlin.collections.any' call
        var tmp_0;
        if (isInterface(tmp0, Collection)) {
          tmp_0 = tmp0.isEmpty_y1axqb_k$();
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
        var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
        while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
          var element = _iterator__ex2g4s.next_20eer_k$();
          if (element instanceof JsonIgnoreUnknownKeys) {
            tmp$ret$0 = true;
            break $l$block_0;
          }
        }
        tmp$ret$0 = false;
      }
      tmp = tmp$ret$0;
    }
    return tmp;
  }
  function tryCoerceValue(_this__u8e3s4, descriptor, index, peekNull, peekString, onEnumCoercing) {
    var tmp;
    if (onEnumCoercing === VOID) {
      tmp = tryCoerceValue$lambda;
    } else {
      tmp = onEnumCoercing;
    }
    onEnumCoercing = tmp;
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var isOptional = descriptor.isElementOptional_heqq56_k$(index);
    var elementDescriptor = descriptor.getElementDescriptor_ncda77_k$(index);
    if (isOptional && !elementDescriptor.get_isNullable_67sy7o_k$() && peekNull(true))
      return true;
    if (equals(elementDescriptor.get_kind_wop7ml_k$(), ENUM_getInstance())) {
      if (elementDescriptor.get_isNullable_67sy7o_k$() && peekNull(false)) {
        return false;
      }
      var tmp0_elvis_lhs = peekString();
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        return false;
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      var enumValue = tmp_0;
      var enumIndex = getJsonNameIndex(elementDescriptor, _this__u8e3s4, enumValue);
      var coerceToNull = !_this__u8e3s4.get_configuration_uqypjh_k$().get_explicitNulls_ppiuof_k$() && elementDescriptor.get_isNullable_67sy7o_k$();
      if (enumIndex === -3 && (isOptional || coerceToNull)) {
        onEnumCoercing();
        return true;
      }
    }
    return false;
  }
  function getJsonNameIndex(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    if (decodeCaseInsensitive(json, _this__u8e3s4)) {
      // Inline function 'kotlin.text.lowercase' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$0 = name.toLowerCase();
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, tmp$ret$0);
    }
    var strategy = namingStrategy(_this__u8e3s4, json);
    if (!(strategy == null))
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
    var index = _this__u8e3s4.getElementIndex_utfbym_k$(name);
    if (!(index === -3))
      return index;
    if (!json.get_configuration_uqypjh_k$().get_useAlternativeNames_c5maqh_k$())
      return index;
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
  }
  function getJsonNameIndexOrThrow(_this__u8e3s4, json, name, suffix) {
    suffix = suffix === VOID ? '' : suffix;
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var index = getJsonNameIndex(_this__u8e3s4, json, name);
    if (index === -3)
      throw SerializationException_init_$Create$(_this__u8e3s4.get_serialName_u2rqhk_k$() + " does not contain element with name '" + name + "'" + suffix);
    return index;
  }
  function getJsonElementName(_this__u8e3s4, json, index) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var strategy = namingStrategy(_this__u8e3s4, json);
    return strategy == null ? _this__u8e3s4.getElementName_u4sqmf_k$(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
  }
  function namingStrategy(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return equals(_this__u8e3s4.get_kind_wop7ml_k$(), CLASS_getInstance()) ? json.get_configuration_uqypjh_k$().get_namingStrategy_kue0is_k$() : null;
  }
  function deserializationNamesMap(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(_this__u8e3s4);
    var tmp_0 = get_JsonDeserializationNamesKey();
    return tmp.getOrPut_g280x5_k$(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
  }
  function getJsonEncodedNames(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var strategy = namingStrategy(_this__u8e3s4, json);
    return strategy == null ? jsonCachedSerialNames(_this__u8e3s4) : toSet(serializationNamesIndices(_this__u8e3s4, json, strategy));
  }
  function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return _this__u8e3s4.get_configuration_uqypjh_k$().get_decodeEnumsCaseInsensitive_7os6sm_k$() && equals(descriptor.get_kind_wop7ml_k$(), ENUM_getInstance());
  }
  function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).get_wei43m_k$(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  }
  function serializationNamesIndices(_this__u8e3s4, json, strategy) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(json);
    var tmp_0 = get_JsonSerializationNamesKey();
    return tmp.getOrPut_g280x5_k$(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
  }
  function buildDeserializationNamesMap(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    // Inline function 'kotlin.collections.mutableMapOf' call
    var builder = LinkedHashMap_init_$Create$();
    var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
    var strategyForClasses = namingStrategy(_this__u8e3s4, json);
    var inductionVariable = 0;
    var last = _this__u8e3s4.get_elementsCount_288r0x_k$();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.filterIsInstance' call
        var tmp0 = _this__u8e3s4.getElementAnnotations_omrjs6_k$(i);
        // Inline function 'kotlin.collections.filterIsInstanceTo' call
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
        while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
          var element = _iterator__ex2g4s.next_20eer_k$();
          if (element instanceof JsonNames) {
            destination.add_utx5q5_k$(element);
          }
        }
        var tmp0_safe_receiver = singleOrNull(destination);
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_names_ivn21r_k$();
        if (tmp1_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.collections.forEach' call
          var inductionVariable_0 = 0;
          var last_0 = tmp1_safe_receiver.length;
          while (inductionVariable_0 < last_0) {
            var element_0 = tmp1_safe_receiver[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp;
            if (useLowercaseEnums) {
              // Inline function 'kotlin.text.lowercase' call
              // Inline function 'kotlin.js.asDynamic' call
              tmp = element_0.toLowerCase();
            } else {
              tmp = element_0;
            }
            buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, tmp, i);
          }
        }
        var tmp_0;
        if (useLowercaseEnums) {
          // Inline function 'kotlin.text.lowercase' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp_0 = _this__u8e3s4.getElementName_u4sqmf_k$(i).toLowerCase();
        } else if (!(strategyForClasses == null)) {
          tmp_0 = strategyForClasses.serialNameForJson_tclx3n_k$(_this__u8e3s4, i, _this__u8e3s4.getElementName_u4sqmf_k$(i));
        } else {
          tmp_0 = null;
        }
        var nameToPut = tmp_0;
        if (nameToPut == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, nameToPut, i);
        }
      }
       while (inductionVariable < last);
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp_1;
    if (builder.isEmpty_y1axqb_k$()) {
      tmp_1 = emptyMap();
    } else {
      tmp_1 = builder;
    }
    return tmp_1;
  }
  function tryCoerceValue$lambda() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return Unit_getInstance();
  }
  function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
    return function () {
      return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
    };
  }
  function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
    return function () {
      // Inline function 'kotlin.collections.mutableSetOf' call
      var trackingSet = LinkedHashSet_init_$Create$();
      var tmp = 0;
      var tmp_0 = $this_serializationNamesIndices.get_elementsCount_288r0x_k$();
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = Array(tmp_0);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        var baseName = $this_serializationNamesIndices.getElementName_u4sqmf_k$(tmp_2);
        var name = $strategy.serialNameForJson_tclx3n_k$($this_serializationNamesIndices, tmp_2, baseName);
        if (!trackingSet.add_utx5q5_k$(name))
          throw new JsonEncodingException("The transformed name '" + name + "' for property " + baseName + ' already exists ' + ('in ' + toString($this_serializationNamesIndices)), $this_serializationNamesIndices.get_serialName_u2rqhk_k$());
        tmp_1[tmp_2] = name;
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
    var entity = equals($this_buildDeserializationNamesMap.get_kind_wop7ml_k$(), ENUM_getInstance()) ? 'enum value' : 'property';
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).containsKey_aw81wo_k$(name)) {
      throw decodingExceptionOf_0("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.getElementName_u4sqmf_k$(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.getElementName_u4sqmf_k$(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
    }
    // Inline function 'kotlin.collections.set' call
    _this__u8e3s4.put_4fpzoq_k$(name, index);
  }
  var properties_initialized_JsonNamesMap_kt_ljpf42;
  function _init_properties_JsonNamesMap_kt__cbbp0k() {
    if (!properties_initialized_JsonNamesMap_kt_ljpf42) {
      properties_initialized_JsonNamesMap_kt_ljpf42 = true;
      JsonDeserializationNamesKey = new Key();
      JsonSerializationNamesKey = new Key();
    }
  }
  function _get_configuration__557qfv($this) {
    return $this.configuration_1;
  }
  function Tombstone() {
    Tombstone_instance = this;
  }
  var Tombstone_instance;
  function Tombstone_getInstance() {
    if (Tombstone_instance == null)
      new Tombstone();
    return Tombstone_instance;
  }
  function RedactedKey() {
    RedactedKey_instance = this;
  }
  var RedactedKey_instance;
  function RedactedKey_getInstance() {
    if (RedactedKey_instance == null)
      new RedactedKey();
    return RedactedKey_instance;
  }
  function _set_currentObjectPath__tmh5hk($this, _set____db54di) {
    $this.currentObjectPath_1 = _set____db54di;
  }
  function _get_currentObjectPath__7wo978($this) {
    return $this.currentObjectPath_1;
  }
  function _set_indicies__pjdcbd($this, _set____db54di) {
    $this.indicies_1 = _set____db54di;
  }
  function _get_indicies__cqh0ul($this) {
    return $this.indicies_1;
  }
  function _set_currentDepth__9x14gd($this, _set____db54di) {
    $this.currentDepth_1 = _set____db54di;
  }
  function _get_currentDepth__pgrv0h($this) {
    return $this.currentDepth_1;
  }
  function prettyString($this, it) {
    var tmp0_safe_receiver = (!(it == null) ? isInterface(it, SerialDescriptor) : false) ? it : null;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_serialName_u2rqhk_k$();
    return tmp1_elvis_lhs == null ? toString_0(it) : tmp1_elvis_lhs;
  }
  function resize($this) {
    var newSize = imul($this.currentDepth_1, 2);
    $this.currentObjectPath_1 = copyOf($this.currentObjectPath_1, newSize);
    var tmp = 0;
    var tmp_0 = new Int32Array(newSize);
    while (tmp < newSize) {
      tmp_0[tmp] = -1;
      tmp = tmp + 1 | 0;
    }
    var newIndices = tmp_0;
    // Inline function 'kotlin.collections.copyInto' call
    var this_0 = $this.indicies_1;
    var endIndex = this_0.length;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_1 = this_0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp_1, newIndices, 0, 0, endIndex);
    $this.indicies_1 = newIndices;
  }
  function JsonPath(configuration) {
    this.configuration_1 = configuration;
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.currentObjectPath_1 = Array(8);
    var tmp_0 = this;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(8);
    while (tmp_1 < 8) {
      tmp_2[tmp_1] = -1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    tmp_0.indicies_1 = tmp_2;
    this.currentDepth_1 = -1;
  }
  protoOf(JsonPath).pushDescriptor_ymkfo8_k$ = function (sd) {
    this.currentDepth_1 = this.currentDepth_1 + 1 | 0;
    var depth = this.currentDepth_1;
    if (depth === this.currentObjectPath_1.length) {
      resize(this);
    }
    this.currentObjectPath_1[depth] = sd;
  };
  protoOf(JsonPath).updateDescriptorIndex_kw65aq_k$ = function (index) {
    this.indicies_1[this.currentDepth_1] = index;
  };
  protoOf(JsonPath).updateCurrentMapKey_rv46l8_k$ = function (key) {
    var tmp;
    if (!(this.indicies_1[this.currentDepth_1] === -2)) {
      this.currentDepth_1 = this.currentDepth_1 + 1 | 0;
      tmp = this.currentDepth_1 === this.currentObjectPath_1.length;
    } else {
      tmp = false;
    }
    if (tmp) {
      resize(this);
    }
    this.currentObjectPath_1[this.currentDepth_1] = this.configuration_1.get_exceptionsWithDebugInfo_ajrapa_k$() ? key : RedactedKey_getInstance();
    this.indicies_1[this.currentDepth_1] = -2;
  };
  protoOf(JsonPath).resetCurrentMapKey_1l0a77_k$ = function () {
    if (this.indicies_1[this.currentDepth_1] === -2) {
      this.currentObjectPath_1[this.currentDepth_1] = Tombstone_getInstance();
    }
  };
  protoOf(JsonPath).popDescriptor_wfx7tc_k$ = function () {
    var depth = this.currentDepth_1;
    if (this.indicies_1[depth] === -2) {
      this.indicies_1[depth] = -1;
      this.currentDepth_1 = this.currentDepth_1 - 1 | 0;
    }
    if (!(this.currentDepth_1 === -1)) {
      this.currentDepth_1 = this.currentDepth_1 - 1 | 0;
    }
  };
  protoOf(JsonPath).getPath_18su3p_k$ = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.append_22ad7x_k$('$');
    // Inline function 'kotlin.repeat' call
    var times = this.currentDepth_1 + 1 | 0;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var element = this.currentObjectPath_1[index];
        if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
          if (equals(element.get_kind_wop7ml_k$(), LIST_getInstance())) {
            if (!(this.indicies_1[index] === -1)) {
              this_0.append_22ad7x_k$('[');
              this_0.append_uppzia_k$(this.indicies_1[index]);
              this_0.append_22ad7x_k$(']');
            }
          } else {
            var idx = this.indicies_1[index];
            if (idx >= 0) {
              this_0.append_22ad7x_k$('.');
              this_0.append_22ad7x_k$(element.getElementName_u4sqmf_k$(idx));
            }
          }
        } else {
          if (element === RedactedKey_getInstance()) {
            this_0.append_22ad7x_k$('[<debug info disabled>]');
          } else {
            if (!(element === Tombstone_getInstance())) {
              this_0.append_22ad7x_k$('[');
              this_0.append_22ad7x_k$("'");
              this_0.append_t8pm91_k$(element);
              this_0.append_22ad7x_k$("'");
              this_0.append_22ad7x_k$(']');
            }
          }
        }
      }
       while (inductionVariable < times);
    return this_0.toString();
  };
  protoOf(JsonPath).toString = function () {
    return this.getPath_18su3p_k$();
  };
  function _get_useArrayPolymorphism__kxw5q($this) {
    return $this.useArrayPolymorphism_1;
  }
  function _get_isDiscriminatorRequired__b7eg4g($this) {
    return $this.isDiscriminatorRequired_1;
  }
  function checkKind($this, descriptor, actualClass) {
    var kind = descriptor.get_kind_wop7ml_k$();
    var tmp;
    if (kind instanceof PolymorphicKind) {
      tmp = true;
    } else {
      tmp = equals(kind, CONTEXTUAL_getInstance());
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.get_simpleName_r6f8py_k$() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
    }
    if ($this.useArrayPolymorphism_1)
      return Unit_getInstance();
    if (!$this.isDiscriminatorRequired_1)
      return Unit_getInstance();
    var tmp_0;
    var tmp_1;
    if (equals(kind, LIST_getInstance()) || equals(kind, MAP_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = kind instanceof PrimitiveKind;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = kind instanceof ENUM;
    }
    if (tmp_0) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.get_simpleName_r6f8py_k$() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
    }
  }
  function JsonSerializersModuleValidator(configuration) {
    this.useArrayPolymorphism_1 = configuration.get_useArrayPolymorphism_teidaa_k$();
    this.isDiscriminatorRequired_1 = !configuration.get_classDiscriminatorMode_bmc7xs_k$().equals(ClassDiscriminatorMode_NONE_getInstance());
  }
  protoOf(JsonSerializersModuleValidator).contextual_lh3eph_k$ = function (kClass, provider) {
  };
  protoOf(JsonSerializersModuleValidator).polymorphic_74dxah_k$ = function (baseClass, actualClass, actualSerializer) {
    var descriptor = actualSerializer.get_descriptor_wjt6a0_k$();
    checkKind(this, descriptor, actualClass);
  };
  protoOf(JsonSerializersModuleValidator).polymorphicDefaultSerializer_vvzf8a_k$ = function (baseClass, defaultSerializerProvider) {
  };
  protoOf(JsonSerializersModuleValidator).polymorphicDefaultDeserializer_ur850q_k$ = function (baseClass, defaultDeserializerProvider) {
  };
  function JsonFriendModuleApi() {
  }
  protoOf(JsonFriendModuleApi).equals = function (other) {
    if (!(other instanceof JsonFriendModuleApi))
      return false;
    other instanceof JsonFriendModuleApi || THROW_CCE();
    return true;
  };
  protoOf(JsonFriendModuleApi).hashCode = function () {
    return 0;
  };
  protoOf(JsonFriendModuleApi).toString = function () {
    return '@kotlinx.serialization.json.internal.JsonFriendModuleApi(' + ')';
  };
  function encodeByWriter(json, writer, serializer, value) {
    var tmp = WriteMode_OBJ_getInstance();
    // Inline function 'kotlin.arrayOfNulls' call
    var size = get_entries_0().get_size_woubt6_k$();
    var tmp$ret$0 = Array(size);
    var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
    encoder.encodeSerializableValue_3uuzip_k$(serializer, value);
  }
  function Companion_3() {
    Companion_instance_3 = this;
  }
  protoOf(Companion_3).doWriteEscaping_ibgtcr_k$ = function (text, writeImpl) {
    var lastPos = 0;
    var inductionVariable = 0;
    var last = charSequenceLength(text) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_0 = charCodeAt(text, i);
        var c = Char__toInt_impl_vasixd(this_0);
        if (c < get_ESCAPE_STRINGS().length && !(get_ESCAPE_STRINGS()[c] == null)) {
          writeImpl(text, lastPos, i);
          var escape = ensureNotNull(get_ESCAPE_STRINGS()[c]);
          writeImpl(escape, 0, escape.length);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    writeImpl(text, lastPos, text.length);
  };
  var Companion_instance_3;
  function Companion_getInstance_7() {
    if (Companion_instance_3 == null)
      new Companion_3();
    return Companion_instance_3;
  }
  function InternalJsonWriter() {
  }
  function _get_lexer__es58e3($this) {
    return $this.lexer_1;
  }
  function _get_isLenient__2p6q64($this) {
    return $this.isLenient_1;
  }
  function _get_trailingCommaAllowed__wv2c6c($this) {
    return $this.trailingCommaAllowed_1;
  }
  function _set_stackDepth__ki8ycc($this, _set____db54di) {
    $this.stackDepth_1 = _set____db54di;
  }
  function _get_stackDepth__5g0d74($this) {
    return $this.stackDepth_1;
  }
  function readObject($this) {
    // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
    var lastToken = $this.lexer_1.consumeNextToken_dugwfi_k$(6);
    if ($this.lexer_1.peekNextToken_1gqwr9_k$() === 4) {
      $this.lexer_1.fail$default_ly4hfp_k$('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.lexer_1.canConsumeValue_oljqd7_k$()) {
      var key = $this.isLenient_1 ? $this.lexer_1.consumeStringLenient_9oypvu_k$() : $this.lexer_1.consumeString_j3j2z7_k$();
      $this.lexer_1.consumeNextToken_dugwfi_k$(5);
      var element = $this.read_22xsm_k$();
      // Inline function 'kotlin.collections.set' call
      result.put_4fpzoq_k$(key, element);
      lastToken = $this.lexer_1.consumeNextToken_uf1vsa_k$();
      var tmp0_subject = lastToken;
      if (tmp0_subject !== 4)
        if (tmp0_subject === 7)
          break $l$loop;
        else {
          $this.lexer_1.fail$default_ly4hfp_k$('Expected end of the object or comma');
        }
    }
    if (lastToken === 6) {
      $this.lexer_1.consumeNextToken_dugwfi_k$(7);
    } else if (lastToken === 4) {
      if (!$this.trailingCommaAllowed_1) {
        invalidTrailingComma($this.lexer_1);
      }
      $this.lexer_1.consumeNextToken_dugwfi_k$(7);
    }
    return new JsonObject(result);
  }
  function readObject_0($this, $receiver, $completion) {
    var tmp = new $readObjectCOROUTINE$($this, $receiver, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function readObjectImpl($this, reader) {
    var lastToken = $this.lexer_1.consumeNextToken_dugwfi_k$(6);
    if ($this.lexer_1.peekNextToken_1gqwr9_k$() === 4) {
      $this.lexer_1.fail$default_ly4hfp_k$('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.lexer_1.canConsumeValue_oljqd7_k$()) {
      var key = $this.isLenient_1 ? $this.lexer_1.consumeStringLenient_9oypvu_k$() : $this.lexer_1.consumeString_j3j2z7_k$();
      $this.lexer_1.consumeNextToken_dugwfi_k$(5);
      var element = reader();
      // Inline function 'kotlin.collections.set' call
      result.put_4fpzoq_k$(key, element);
      lastToken = $this.lexer_1.consumeNextToken_uf1vsa_k$();
      var tmp0_subject = lastToken;
      if (tmp0_subject !== 4)
        if (tmp0_subject === 7)
          break $l$loop;
        else {
          $this.lexer_1.fail$default_ly4hfp_k$('Expected end of the object or comma');
        }
    }
    if (lastToken === 6) {
      $this.lexer_1.consumeNextToken_dugwfi_k$(7);
    } else if (lastToken === 4) {
      if (!$this.trailingCommaAllowed_1) {
        invalidTrailingComma($this.lexer_1);
      }
      $this.lexer_1.consumeNextToken_dugwfi_k$(7);
    }
    return new JsonObject(result);
  }
  function readArray($this) {
    var lastToken = $this.lexer_1.consumeNextToken_uf1vsa_k$();
    if ($this.lexer_1.peekNextToken_1gqwr9_k$() === 4) {
      $this.lexer_1.fail$default_ly4hfp_k$('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.arrayListOf' call
    var result = ArrayList_init_$Create$();
    while ($this.lexer_1.canConsumeValue_oljqd7_k$()) {
      var element = $this.read_22xsm_k$();
      result.add_utx5q5_k$(element);
      lastToken = $this.lexer_1.consumeNextToken_uf1vsa_k$();
      if (!(lastToken === 4)) {
        var tmp0 = $this.lexer_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = lastToken === 9;
        var position = tmp0.get_currentPosition_5vz2du_k$();
        if (!condition) {
          var tmp$ret$2 = 'Expected end of the array or comma';
          tmp0.fail$default_ly4hfp_k$(tmp$ret$2, position);
        }
      }
    }
    if (lastToken === 8) {
      $this.lexer_1.consumeNextToken_dugwfi_k$(9);
    } else if (lastToken === 4) {
      if (!$this.trailingCommaAllowed_1) {
        invalidTrailingComma($this.lexer_1, 'array');
      }
      $this.lexer_1.consumeNextToken_dugwfi_k$(9);
    }
    return new JsonArray(result);
  }
  function readValue($this, isString) {
    var tmp;
    if ($this.isLenient_1 || !isString) {
      tmp = $this.lexer_1.consumeStringLenient_9oypvu_k$();
    } else {
      tmp = $this.lexer_1.consumeString_j3j2z7_k$();
    }
    var string = tmp;
    if (!isString && string === 'null')
      return JsonNull_getInstance();
    return new JsonLiteral(string, isString);
  }
  function readDeepRecursive($this) {
    return invoke(new DeepRecursiveFunction(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_getInstance());
  }
  function JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation) {
    this.this$0__1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsonTreeReader$readDeepRecursive$slambda).invoke_bq9n4h_k$ = function ($this$DeepRecursiveFunction, it, $completion) {
    var tmp = this.create_z8vk9n_k$($this$DeepRecursiveFunction, it, $completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).invoke_4tzzq6_k$ = function (p1, p2, $completion) {
    var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
    return this.invoke_bq9n4h_k$(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(3);
            var tmp0_subject = this.this$0__1.lexer_1.peekNextToken_1gqwr9_k$();
            if (tmp0_subject === 1) {
              this.WHEN_RESULT0__1 = readValue(this.this$0__1, true);
              this.set_state_rjd8d0_k$(2);
              continue $sm;
            } else {
              if (tmp0_subject === 0) {
                this.WHEN_RESULT0__1 = readValue(this.this$0__1, false);
                this.set_state_rjd8d0_k$(2);
                continue $sm;
              } else {
                if (tmp0_subject === 6) {
                  this.set_state_rjd8d0_k$(1);
                  suspendResult = readObject_0(this.this$0__1, this.$this$DeepRecursiveFunction_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (tmp0_subject === 8) {
                    this.WHEN_RESULT0__1 = readArray(this.this$0__1);
                    this.set_state_rjd8d0_k$(2);
                    continue $sm;
                  } else {
                    var tmp_0 = this;
                    this.this$0__1.lexer_1.fail$default_ly4hfp_k$("Can't begin reading element, unexpected token");
                  }
                }
              }
            }

            break;
          case 1:
            this.WHEN_RESULT0__1 = suspendResult;
            this.set_state_rjd8d0_k$(2);
            continue $sm;
          case 2:
            return this.WHEN_RESULT0__1;
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
  protoOf(JsonTreeReader$readDeepRecursive$slambda).create_z8vk9n_k$ = function ($this$DeepRecursiveFunction, it, completion) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this.this$0__1, completion);
    i.$this$DeepRecursiveFunction_1 = $this$DeepRecursiveFunction;
    i.it_1 = it;
    return i;
  };
  function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
    return constructCallableReference(function ($this$DeepRecursiveFunction, it, $completion) {
      return i.invoke_bq9n4h_k$($this$DeepRecursiveFunction, it, $completion);
    }, 2);
  }
  function $readObjectCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this._this__u8e3s4__1 = _this__u8e3s4;
    this._this__u8e3s4__2 = _this__u8e3s4_0;
  }
  protoOf($readObjectCOROUTINE$).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(5);
            this.this1__1 = this._this__u8e3s4__1;
            this.lastToken2__1 = this.this1__1.lexer_1.consumeNextToken_dugwfi_k$(6);
            if (this.this1__1.lexer_1.peekNextToken_1gqwr9_k$() === 4) {
              this.this1__1.lexer_1.fail$default_ly4hfp_k$('Unexpected leading comma');
            }

            var tmp_0 = this;
            tmp_0.result0__1 = LinkedHashMap_init_$Create$();
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 1:
            if (!this.this1__1.lexer_1.canConsumeValue_oljqd7_k$()) {
              this.set_state_rjd8d0_k$(4);
              continue $sm;
            }

            this.key3__1 = this.this1__1.isLenient_1 ? this.this1__1.lexer_1.consumeStringLenient_9oypvu_k$() : this.this1__1.lexer_1.consumeString_j3j2z7_k$();
            this.this1__1.lexer_1.consumeNextToken_dugwfi_k$(5);
            this.set_state_rjd8d0_k$(2);
            suspendResult = this._this__u8e3s4__2.callRecursive_g04ojy_k$(Unit_getInstance(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var element = suspendResult;
            var tmp0 = this.result0__1;
            var key = this.key3__1;
            tmp0.put_4fpzoq_k$(key, element);
            this.lastToken2__1 = this.this1__1.lexer_1.consumeNextToken_uf1vsa_k$();
            var tmp0_subject = this.lastToken2__1;
            if (tmp0_subject === 4) {
              this.set_state_rjd8d0_k$(3);
              continue $sm;
            } else {
              if (tmp0_subject === 7) {
                this.set_state_rjd8d0_k$(4);
                continue $sm;
              } else {
                this.this1__1.lexer_1.fail$default_ly4hfp_k$('Expected end of the object or comma');
              }
            }

            break;
          case 3:
            this.set_state_rjd8d0_k$(1);
            continue $sm;
          case 4:
            if (this.lastToken2__1 === 6) {
              this.this1__1.lexer_1.consumeNextToken_dugwfi_k$(7);
            } else if (this.lastToken2__1 === 4) {
              if (!this.this1__1.trailingCommaAllowed_1) {
                invalidTrailingComma(this.this1__1.lexer_1);
              }
              this.this1__1.lexer_1.consumeNextToken_dugwfi_k$(7);
            }

            return new JsonObject(this.result0__1);
          case 5:
            throw this.get_exception_x0n6w6_k$();
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
  function JsonTreeReader(configuration, lexer) {
    this.lexer_1 = lexer;
    this.isLenient_1 = configuration.get_isLenient_1g1x8_k$();
    this.trailingCommaAllowed_1 = configuration.get_allowTrailingComma_7ql5if_k$();
    this.stackDepth_1 = 0;
  }
  protoOf(JsonTreeReader).read_22xsm_k$ = function () {
    var token = this.lexer_1.peekNextToken_1gqwr9_k$();
    var tmp;
    if (token === 1) {
      tmp = readValue(this, true);
    } else if (token === 0) {
      tmp = readValue(this, false);
    } else if (token === 6) {
      var tmp_0;
      this.stackDepth_1 = this.stackDepth_1 + 1 | 0;
      if (this.stackDepth_1 === 200) {
        tmp_0 = readDeepRecursive(this);
      } else {
        tmp_0 = readObject(this);
      }
      var result = tmp_0;
      this.stackDepth_1 = this.stackDepth_1 - 1 | 0;
      tmp = result;
    } else if (token === 8) {
      tmp = readArray(this);
    } else {
      this.lexer_1.fail$default_ly4hfp_k$('Cannot read Json element because of unexpected ' + tokenDescription(token));
    }
    return tmp;
  };
  function classDiscriminator(_this__u8e3s4, json) {
    var _iterator__ex2g4s = _this__u8e3s4.get_annotations_20dirp_k$().iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var annotation = _iterator__ex2g4s.next_20eer_k$();
      if (annotation instanceof JsonClassDiscriminator)
        return annotation.get_discriminator_wfz2j1_k$();
    }
    return json.get_configuration_uqypjh_k$().get_classDiscriminator_x3y365_k$();
  }
  function decodeSerializableValuePolymorphic(_this__u8e3s4, deserializer, path) {
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = _this__u8e3s4.get_json_woos35_k$().get_configuration_uqypjh_k$().get_useArrayPolymorphism_teidaa_k$();
    }
    if (tmp) {
      return deserializer.deserialize_sy6x50_k$(_this__u8e3s4);
    }
    var discriminator = classDiscriminator(deserializer.get_descriptor_wjt6a0_k$(), _this__u8e3s4.get_json_woos35_k$());
    var tmp2 = _this__u8e3s4.decodeJsonElement_6lz9ye_k$();
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = deserializer.get_descriptor_wjt6a0_k$().get_serialName_u2rqhk_k$();
    if (!(tmp2 instanceof JsonObject)) {
      var tmp2_0 = 'Expected ' + getKClass(JsonObject).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(tmp2).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName;
      // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
      var path_0 = path();
      var tmp_0;
      if (_this__u8e3s4.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
        var tmp$ret$4 = toString(tmp2);
        tmp_0 = toString(minify(tmp$ret$4));
      } else {
        tmp_0 = null;
      }
      var inputValue = tmp_0;
      throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path_0, null, inputValue), tmp2_0, -1, path_0, inputValue, null);
    }
    var jsonTree = tmp2;
    var tmp0_safe_receiver = jsonTree.get_6bo4tg_k$(discriminator);
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
    var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
    var tmp_1;
    try {
      tmp_1 = findPolymorphicSerializer(deserializer, _this__u8e3s4, type);
    } catch ($p) {
      var tmp_2;
      if ($p instanceof SerializationException) {
        var it = $p;
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var shortMessage = ensureNotNull(it.message);
        var tmp_3;
        if (_this__u8e3s4.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$8 = jsonTree.toString();
          tmp_3 = toString(minify(tmp$ret$8));
        } else {
          tmp_3 = null;
        }
        var inputValue_0 = tmp_3;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, shortMessage, null, null, inputValue_0), shortMessage, -1, null, inputValue_0, null);
      } else {
        throw $p;
      }
    }
    var tmp_4 = tmp_1;
    var actualSerializer = isInterface(tmp_4, DeserializationStrategy) ? tmp_4 : THROW_CCE();
    return readPolymorphicJson(_this__u8e3s4.get_json_woos35_k$(), discriminator, jsonTree, actualSerializer);
  }
  function throwJsonElementPolymorphicException(serialName, element) {
    var tmp0_shortMessage = 'Class with serial name ' + serialName + ' cannot be serialized polymorphically because it is represented as ' + getKClassFromExpression(element).get_simpleName_r6f8py_k$() + '.';
    throw new JsonEncodingException(tmp0_shortMessage, serialName, 'Make sure that its JsonTransformingSerializer returns JsonObject, so class discriminator can be added to it.');
  }
  function encodePolymorphically(_this__u8e3s4, serializer, value, ifPolymorphic) {
    if (_this__u8e3s4.get_json_woos35_k$().get_configuration_uqypjh_k$().get_useArrayPolymorphism_teidaa_k$()) {
      serializer.serialize_5ase3y_k$(_this__u8e3s4, value);
      return Unit_getInstance();
    }
    var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
    var tmp;
    if (isPolymorphicSerializer) {
      tmp = !_this__u8e3s4.get_json_woos35_k$().get_configuration_uqypjh_k$().get_classDiscriminatorMode_bmc7xs_k$().equals(ClassDiscriminatorMode_NONE_getInstance());
    } else {
      var tmp_0;
      switch (_this__u8e3s4.get_json_woos35_k$().get_configuration_uqypjh_k$().get_classDiscriminatorMode_bmc7xs_k$().get_ordinal_ip24qg_k$()) {
        case 0:
        case 2:
          tmp_0 = false;
          break;
        case 1:
          // Inline function 'kotlin.let' call

          var it = serializer.get_descriptor_wjt6a0_k$().get_kind_wop7ml_k$();
          tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      tmp = tmp_0;
    }
    var needDiscriminator = tmp;
    var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.get_descriptor_wjt6a0_k$(), _this__u8e3s4.get_json_woos35_k$()) : null;
    var tmp_1;
    if (isPolymorphicSerializer) {
      var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
      $l$block: {
        // Inline function 'kotlin.requireNotNull' call
        if (value == null) {
          var message = 'Value for serializer ' + toString(serializer.get_descriptor_wjt6a0_k$()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
          throw IllegalArgumentException_init_$Create$(toString(message));
        } else {
          break $l$block;
        }
      }
      var actual = findPolymorphicSerializer_0(casted, _this__u8e3s4, value);
      tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
    } else {
      tmp_1 = serializer;
    }
    var actualSerializer = tmp_1;
    if (!(baseClassDiscriminator == null)) {
      access$checkEncodingConflicts$tPolymorphicKt(_this__u8e3s4.get_json_woos35_k$(), serializer, actualSerializer, baseClassDiscriminator);
      checkKind_0(actualSerializer.get_descriptor_wjt6a0_k$().get_kind_wop7ml_k$());
      ifPolymorphic(baseClassDiscriminator, actualSerializer.get_descriptor_wjt6a0_k$().get_serialName_u2rqhk_k$());
    }
    actualSerializer.serialize_5ase3y_k$(_this__u8e3s4, value);
  }
  function access$checkEncodingConflicts$tPolymorphicKt($receiver, serializer, actualSerializer, classDiscriminator) {
    return checkEncodingConflicts($receiver, serializer, actualSerializer, classDiscriminator);
  }
  function checkKind_0(kind) {
    if (kind instanceof ENUM) {
      // Inline function 'kotlin.error' call
      var message = "Enums cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if (kind instanceof PrimitiveKind) {
      // Inline function 'kotlin.error' call
      var message_0 = "Primitives cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    if (kind instanceof PolymorphicKind) {
      // Inline function 'kotlin.error' call
      var message_1 = 'Actual serializer for polymorphic cannot be polymorphic itself';
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
  }
  function checkEncodingConflicts(_this__u8e3s4, serializer, actualSerializer, classDiscriminator) {
    if (getJsonEncodedNames(actualSerializer.get_descriptor_wjt6a0_k$(), _this__u8e3s4).contains_aljjnj_k$(classDiscriminator)) {
      var baseName = serializer.get_descriptor_wjt6a0_k$().get_serialName_u2rqhk_k$();
      var actualName = actualSerializer.get_descriptor_wjt6a0_k$().get_serialName_u2rqhk_k$();
      var text = _this__u8e3s4.get_configuration_uqypjh_k$().get_classDiscriminatorMode_bmc7xs_k$().equals(ClassDiscriminatorMode_ALL_JSON_OBJECTS_getInstance()) && baseName === actualName ? 'in ALL_JSON_OBJECTS class discriminator mode' : "as base class '" + baseName + "'";
      var tmp0_shortMessage = "Class '" + actualName + "' cannot be serialized " + text + ' because' + (" it has property name that conflicts with JSON class discriminator '" + classDiscriminator + "'.");
      var tmp1_hint = 'You can either change class discriminator in JsonConfiguration, or rename property with @SerialName annotation.';
      throw new JsonEncodingException(tmp0_shortMessage, actualName, tmp1_hint);
    }
  }
  function _get_map__e6co1h($this) {
    return $this.map_1;
  }
  function Key() {
  }
  function DescriptorSchemaCache() {
    this.map_1 = createMapForCache(16);
  }
  protoOf(DescriptorSchemaCache).set_y36rj3_k$ = function (descriptor, key, value) {
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.map_1;
    var value_0 = this_0.get_wei43m_k$(descriptor);
    var tmp;
    if (value_0 == null) {
      var answer = createMapForCache(2);
      this_0.put_4fpzoq_k$(descriptor, answer);
      tmp = answer;
    } else {
      tmp = value_0;
    }
    var tmp0 = tmp;
    var tmp2 = key instanceof Key ? key : THROW_CCE();
    // Inline function 'kotlin.collections.set' call
    var value_1 = !(value == null) ? value : THROW_CCE();
    tmp0.put_4fpzoq_k$(tmp2, value_1);
  };
  protoOf(DescriptorSchemaCache).getOrPut_g280x5_k$ = function (descriptor, key, defaultValue) {
    var tmp0_safe_receiver = this.get_xn5txp_k$(descriptor, key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var value = defaultValue();
    this.set_y36rj3_k$(descriptor, key, value);
    return value;
  };
  protoOf(DescriptorSchemaCache).get_xn5txp_k$ = function (descriptor, key) {
    var tmp0_safe_receiver = this.map_1.get_wei43m_k$(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      tmp = tmp0_safe_receiver.get_wei43m_k$(key instanceof Key ? key : THROW_CCE());
    }
    var tmp_0 = tmp;
    return !(tmp_0 == null) ? tmp_0 : null;
  };
  function _get_mode__dah3bc($this) {
    return $this.mode_1;
  }
  function DiscriminatorHolder(discriminatorToSkip) {
    this.discriminatorToSkip_1 = discriminatorToSkip;
  }
  protoOf(DiscriminatorHolder).set_discriminatorToSkip_tyk0da_k$ = function (_set____db54di) {
    this.discriminatorToSkip_1 = _set____db54di;
  };
  protoOf(DiscriminatorHolder).get_discriminatorToSkip_kn0fl9_k$ = function () {
    return this.discriminatorToSkip_1;
  };
  function trySkip($this, $receiver, unknownKey) {
    if ($receiver == null)
      return false;
    if ($receiver.discriminatorToSkip_1 === unknownKey) {
      $receiver.discriminatorToSkip_1 = null;
      return true;
    }
    return false;
  }
  function _set_currentIndex__cezf6m($this, _set____db54di) {
    $this.currentIndex_1 = _set____db54di;
  }
  function _get_currentIndex__ryq5qq($this) {
    return $this.currentIndex_1;
  }
  function _set_discriminatorHolder__9fc1gj($this, _set____db54di) {
    $this.discriminatorHolder_1 = _set____db54di;
  }
  function _get_discriminatorHolder__3ve7ft($this) {
    return $this.discriminatorHolder_1;
  }
  function _get_configuration__557qfv_0($this) {
    return $this.configuration_1;
  }
  function _get_elementMarker__200cvv($this) {
    return $this.elementMarker_1;
  }
  function skipLeftoverElements($this, descriptor) {
    while (!($this.decodeElementIndex_bstkhp_k$(descriptor) === -1)) {
    }
  }
  function checkLeadingComma($this) {
    if ($this.lexer_1.peekNextToken_1gqwr9_k$() === 4) {
      $this.lexer_1.fail$default_ly4hfp_k$('Unexpected leading comma');
    }
  }
  function decodeMapIndex($this) {
    var hasComma = false;
    var decodingKey = !(($this.currentIndex_1 % 2 | 0) === 0);
    if (decodingKey) {
      if (!($this.currentIndex_1 === -1)) {
        hasComma = $this.lexer_1.tryConsumeComma_9n2ve4_k$();
      }
    } else {
      $this.lexer_1.consumeNextToken_o6jhkj_k$(_Char___init__impl__6a9atx(58));
    }
    var tmp;
    if ($this.lexer_1.canConsumeValue_oljqd7_k$()) {
      if (decodingKey) {
        if ($this.currentIndex_1 === -1) {
          var tmp0 = $this.lexer_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition = !hasComma;
          var position = tmp0.get_currentPosition_5vz2du_k$();
          if (!condition) {
            var tmp$ret$1 = 'Unexpected leading comma';
            tmp0.fail$default_ly4hfp_k$(tmp$ret$1, position);
          }
        } else {
          var tmp0_0 = $this.lexer_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition_0 = hasComma;
          var position_0 = tmp0_0.get_currentPosition_5vz2du_k$();
          if (!condition_0) {
            var tmp$ret$3 = 'Expected comma after the key-value pair';
            tmp0_0.fail$default_ly4hfp_k$(tmp$ret$3, position_0);
          }
        }
      }
      $this.currentIndex_1 = $this.currentIndex_1 + 1 | 0;
      tmp = $this.currentIndex_1;
    } else {
      if (hasComma && !$this.json_1.get_configuration_uqypjh_k$().get_allowTrailingComma_7ql5if_k$()) {
        invalidTrailingComma($this.lexer_1);
      }
      tmp = -1;
    }
    return tmp;
  }
  function coerceInputValue($this, descriptor, index) {
    var tmp0 = $this.json_1;
    var tmp$ret$0;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.isElementOptional_heqq56_k$(index);
      var elementDescriptor = descriptor.getElementDescriptor_ncda77_k$(index);
      var tmp;
      if (isOptional && !elementDescriptor.get_isNullable_67sy7o_k$()) {
        tmp = $this.lexer_1.tryConsumeNull_2shltp_k$(true);
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.get_kind_wop7ml_k$(), ENUM_getInstance())) {
        var tmp_0;
        if (elementDescriptor.get_isNullable_67sy7o_k$()) {
          tmp_0 = $this.lexer_1.tryConsumeNull_2shltp_k$(false);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$0 = false;
          break $l$block_2;
        }
        var tmp0_elvis_lhs = $this.lexer_1.peekString_d4c947_k$($this.configuration_1.get_isLenient_1g1x8_k$());
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$0 = false;
          break $l$block_2;
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_1;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.get_configuration_uqypjh_k$().get_explicitNulls_ppiuof_k$() && elementDescriptor.get_isNullable_67sy7o_k$();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          $this.lexer_1.consumeString_j3j2z7_k$();
          tmp$ret$0 = true;
          break $l$block_2;
        }
      }
      tmp$ret$0 = false;
    }
    return tmp$ret$0;
  }
  function decodeObjectIndex($this, descriptor) {
    var hasComma = $this.lexer_1.tryConsumeComma_9n2ve4_k$();
    while ($this.lexer_1.canConsumeValue_oljqd7_k$()) {
      hasComma = false;
      var key = decodeStringKey($this);
      $this.lexer_1.consumeNextToken_o6jhkj_k$(_Char___init__impl__6a9atx(58));
      var index = getJsonNameIndex(descriptor, $this.json_1, key);
      var tmp;
      if (!(index === -3)) {
        var tmp_0;
        if ($this.configuration_1.get_coerceInputValues_gdasvc_k$() && coerceInputValue($this, descriptor, index)) {
          hasComma = $this.lexer_1.tryConsumeComma_9n2ve4_k$();
          tmp_0 = false;
        } else {
          var tmp0_safe_receiver = $this.elementMarker_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.mark_lz09aa_k$(index);
          }
          return index;
        }
        tmp = tmp_0;
      } else {
        tmp = true;
      }
      var isUnknown = tmp;
      if (isUnknown) {
        hasComma = handleUnknown($this, descriptor, key);
      }
    }
    if (hasComma && !$this.json_1.get_configuration_uqypjh_k$().get_allowTrailingComma_7ql5if_k$()) {
      invalidTrailingComma($this.lexer_1);
    }
    var tmp1_safe_receiver = $this.elementMarker_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.nextUnmarkedIndex_feexpp_k$();
    return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
  }
  function handleUnknown($this, descriptor, key) {
    if (ignoreUnknownKeys(descriptor, $this.json_1) || trySkip($this, $this.discriminatorHolder_1, key)) {
      $this.lexer_1.skipElement_eq7t4_k$($this.configuration_1.get_isLenient_1g1x8_k$());
    } else {
      $this.lexer_1.get_path_wos8ry_k$().popDescriptor_wfx7tc_k$();
      $this.lexer_1.failOnUnknownKey_g0pqrs_k$(key);
    }
    return $this.lexer_1.tryConsumeComma_9n2ve4_k$();
  }
  function decodeListIndex($this) {
    var hasComma = $this.lexer_1.tryConsumeComma_9n2ve4_k$();
    var tmp;
    if ($this.lexer_1.canConsumeValue_oljqd7_k$()) {
      if (!($this.currentIndex_1 === -1) && !hasComma) {
        $this.lexer_1.fail$default_ly4hfp_k$('Expected end of the array or comma');
      }
      $this.currentIndex_1 = $this.currentIndex_1 + 1 | 0;
      tmp = $this.currentIndex_1;
    } else {
      if (hasComma && !$this.json_1.get_configuration_uqypjh_k$().get_allowTrailingComma_7ql5if_k$()) {
        invalidTrailingComma($this.lexer_1, 'array');
      }
      tmp = -1;
    }
    return tmp;
  }
  function decodeStringKey($this) {
    var tmp;
    if ($this.configuration_1.get_isLenient_1g1x8_k$()) {
      tmp = $this.lexer_1.consumeStringLenientNotNull_m2rgts_k$();
    } else {
      tmp = $this.lexer_1.consumeKeyString_mfa3ws_k$();
    }
    return tmp;
  }
  function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
    AbstractDecoder.call(this);
    this.json_1 = json;
    this.mode_1 = mode;
    this.lexer_1 = lexer;
    this.serializersModule_1 = this.json_1.get_serializersModule_piitvg_k$();
    this.currentIndex_1 = -1;
    this.discriminatorHolder_1 = discriminatorHolder;
    this.configuration_1 = this.json_1.get_configuration_uqypjh_k$();
    this.elementMarker_1 = this.configuration_1.get_explicitNulls_ppiuof_k$() ? null : new JsonElementMarker(descriptor);
  }
  protoOf(StreamingJsonDecoder).get_json_woos35_k$ = function () {
    return this.json_1;
  };
  protoOf(StreamingJsonDecoder).get_lexer_mbtkkc_k$ = function () {
    return this.lexer_1;
  };
  protoOf(StreamingJsonDecoder).get_serializersModule_piitvg_k$ = function () {
    return this.serializersModule_1;
  };
  protoOf(StreamingJsonDecoder).decodeJsonElement_6lz9ye_k$ = function () {
    return (new JsonTreeReader(this.json_1.get_configuration_uqypjh_k$(), this.lexer_1)).read_22xsm_k$();
  };
  protoOf(StreamingJsonDecoder).decodeSerializableValue_xpnpad_k$ = function (deserializer) {
    try {
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.json_1.get_configuration_uqypjh_k$().get_useArrayPolymorphism_teidaa_k$();
      }
      if (tmp) {
        return deserializer.deserialize_sy6x50_k$(this);
      }
      var discriminator = classDiscriminator(deserializer.get_descriptor_wjt6a0_k$(), this.json_1);
      var tmp0_elvis_lhs = this.lexer_1.peekLeadingMatchingValue_y3am18_k$(discriminator, this.configuration_1.get_isLenient_1g1x8_k$());
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        var tmp2 = isInterface(deserializer, DeserializationStrategy) ? deserializer : THROW_CCE();
        var tmp$ret$0;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
          var tmp_1;
          if (!(tmp2 instanceof AbstractPolymorphicSerializer)) {
            tmp_1 = true;
          } else {
            tmp_1 = this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_useArrayPolymorphism_teidaa_k$();
          }
          if (tmp_1) {
            tmp$ret$0 = tmp2.deserialize_sy6x50_k$(this);
            break $l$block;
          }
          var discriminator_0 = classDiscriminator(tmp2.get_descriptor_wjt6a0_k$(), this.get_json_woos35_k$());
          var tmp2_0 = this.decodeJsonElement_6lz9ye_k$();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = tmp2.get_descriptor_wjt6a0_k$().get_serialName_u2rqhk_k$();
          if (!(tmp2_0 instanceof JsonObject)) {
            var tmp2_1 = 'Expected ' + getKClass(JsonObject).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(tmp2_0).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName;
            // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
            var path = this.lexer_1.get_path_wos8ry_k$().getPath_18su3p_k$();
            var tmp_2;
            if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
              var tmp$ret$6 = toString(tmp2_0);
              tmp_2 = toString(minify(tmp$ret$6));
            } else {
              tmp_2 = null;
            }
            var inputValue = tmp_2;
            throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_1, path, null, inputValue), tmp2_1, -1, path, inputValue, null);
          }
          var jsonTree = tmp2_0;
          var tmp0_safe_receiver = jsonTree.get_6bo4tg_k$(discriminator_0);
          var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
          var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
          var tmp_3;
          try {
            tmp_3 = findPolymorphicSerializer(tmp2, this, type);
          } catch ($p) {
            var tmp_4;
            if ($p instanceof SerializationException) {
              var it = $p;
              // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
              var shortMessage = ensureNotNull(it.message);
              var tmp_5;
              if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
                var tmp$ret$10 = jsonTree.toString();
                tmp_5 = toString(minify(tmp$ret$10));
              } else {
                tmp_5 = null;
              }
              var inputValue_0 = tmp_5;
              throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, shortMessage, null, null, inputValue_0), shortMessage, -1, null, inputValue_0, null);
            } else {
              throw $p;
            }
          }
          var tmp_6 = tmp_3;
          var actualSerializer = isInterface(tmp_6, DeserializationStrategy) ? tmp_6 : THROW_CCE();
          tmp$ret$0 = readPolymorphicJson(this.get_json_woos35_k$(), discriminator_0, jsonTree, actualSerializer);
        }
        return tmp$ret$0;
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      var type_0 = tmp_0;
      var tmp_7;
      try {
        tmp_7 = findPolymorphicSerializer(deserializer, this, type_0);
      } catch ($p_0) {
        var tmp_8;
        if ($p_0 instanceof SerializationException) {
          var it_0 = $p_0;
          var message = removeSuffix(substringBefore(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10)), '.');
          var hint = substringAfter(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10), '');
          this.lexer_1.fail$default_ly4hfp_k$(message, VOID, hint);
        } else {
          throw $p_0;
        }
        tmp_7 = tmp_8;
      }
      var tmp_9 = tmp_7;
      var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
      this.discriminatorHolder_1 = new DiscriminatorHolder(discriminator);
      return actualSerializer_0.deserialize_sy6x50_k$(this);
    } catch ($p_1) {
      if ($p_1 instanceof MissingFieldException) {
        var e = $p_1;
        if (contains(ensureNotNull(e.message), 'at path'))
          throw e;
        throw missingFieldExceptionWithNewMessage(e, plus(e.message, ' at path: ') + this.lexer_1.get_path_wos8ry_k$().getPath_18su3p_k$());
      } else {
        throw $p_1;
      }
    }
  };
  protoOf(StreamingJsonDecoder).beginStructure_yljocp_k$ = function (descriptor) {
    var newMode = switchMode(this.json_1, descriptor);
    this.lexer_1.get_path_wos8ry_k$().pushDescriptor_ymkfo8_k$(descriptor);
    this.lexer_1.consumeNextToken_o6jhkj_k$(newMode.get_begin_14uf0e_k$());
    checkLeadingComma(this);
    var tmp;
    switch (newMode.get_ordinal_ip24qg_k$()) {
      case 1:
      case 2:
      case 3:
        tmp = new StreamingJsonDecoder(this.json_1, newMode, this.lexer_1, descriptor, this.discriminatorHolder_1);
        break;
      default:
        var tmp_0;
        if (this.mode_1.equals(newMode) && this.json_1.get_configuration_uqypjh_k$().get_explicitNulls_ppiuof_k$()) {
          tmp_0 = this;
        } else {
          tmp_0 = new StreamingJsonDecoder(this.json_1, newMode, this.lexer_1, descriptor, this.discriminatorHolder_1);
        }

        tmp = tmp_0;
        break;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).endStructure_1xqz0n_k$ = function (descriptor) {
    if (descriptor.get_elementsCount_288r0x_k$() === 0 && ignoreUnknownKeys(descriptor, this.json_1)) {
      skipLeftoverElements(this, descriptor);
    }
    if (this.lexer_1.tryConsumeComma_9n2ve4_k$() && !this.json_1.get_configuration_uqypjh_k$().get_allowTrailingComma_7ql5if_k$()) {
      invalidTrailingComma(this.lexer_1, '');
    }
    this.lexer_1.consumeNextToken_o6jhkj_k$(this.mode_1.get_end_l6d8j8_k$());
    this.lexer_1.get_path_wos8ry_k$().popDescriptor_wfx7tc_k$();
  };
  protoOf(StreamingJsonDecoder).decodeNotNullMark_us4ba1_k$ = function () {
    var tmp;
    var tmp0_safe_receiver = this.elementMarker_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_isUnmarkedNull_855yq0_k$();
    if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
      tmp = !this.lexer_1.tryConsumeNull$default_t5tauc_k$();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).decodeNull_jzrmuj_k$ = function () {
    return null;
  };
  protoOf(StreamingJsonDecoder).decodeSerializableElement_uahnnv_k$ = function (descriptor, index, deserializer, previousValue) {
    var isMapKey = this.mode_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
    if (isMapKey) {
      this.lexer_1.get_path_wos8ry_k$().resetCurrentMapKey_1l0a77_k$();
    }
    var value = protoOf(AbstractDecoder).decodeSerializableElement_uahnnv_k$.call(this, descriptor, index, deserializer, previousValue);
    if (isMapKey) {
      this.lexer_1.get_path_wos8ry_k$().updateCurrentMapKey_rv46l8_k$(value);
    }
    return value;
  };
  protoOf(StreamingJsonDecoder).decodeElementIndex_bstkhp_k$ = function (descriptor) {
    var index;
    switch (this.mode_1.get_ordinal_ip24qg_k$()) {
      case 0:
        index = decodeObjectIndex(this, descriptor);
        break;
      case 2:
        index = decodeMapIndex(this);
        break;
      default:
        index = decodeListIndex(this);
        break;
    }
    if (!this.mode_1.equals(WriteMode_MAP_getInstance())) {
      this.lexer_1.get_path_wos8ry_k$().updateDescriptorIndex_kw65aq_k$(index);
    }
    return index;
  };
  protoOf(StreamingJsonDecoder).decodeBoolean_m0aca_k$ = function () {
    return this.lexer_1.consumeBooleanLenient_iqeqb9_k$();
  };
  protoOf(StreamingJsonDecoder).decodeByte_jzz7je_k$ = function () {
    var value = this.lexer_1.consumeNumericLiteral_rdea66_k$();
    if (!equalsLong(value, fromInt(convertToByte(value)))) {
      this.lexer_1.fail$default_ly4hfp_k$("Failed to parse byte for input '" + value.toString() + "'");
    }
    return convertToByte(value);
  };
  protoOf(StreamingJsonDecoder).decodeShort_jjqk32_k$ = function () {
    var value = this.lexer_1.consumeNumericLiteral_rdea66_k$();
    if (!equalsLong(value, fromInt(convertToShort(value)))) {
      this.lexer_1.fail$default_ly4hfp_k$("Failed to parse short for input '" + value.toString() + "'");
    }
    return convertToShort(value);
  };
  protoOf(StreamingJsonDecoder).decodeInt_8iq8f5_k$ = function () {
    var value = this.lexer_1.consumeNumericLiteral_rdea66_k$();
    if (!equalsLong(value, fromInt(convertToInt(value)))) {
      this.lexer_1.fail$default_ly4hfp_k$("Failed to parse int for input '" + value.toString() + "'");
    }
    return convertToInt(value);
  };
  protoOf(StreamingJsonDecoder).decodeLong_jzt186_k$ = function () {
    return this.lexer_1.consumeNumericLiteral_rdea66_k$();
  };
  protoOf(StreamingJsonDecoder).decodeFloat_jcnrwu_k$ = function () {
    var tmp0 = this.lexer_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.consumeStringLenient_9oypvu_k$();
      try {
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp$ret$0 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.fail$default_ly4hfp_k$("Failed to parse type '" + 'float' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$0;
    var specialFp = this.json_1.get_configuration_uqypjh_k$().get_allowSpecialFloatingPointValues_1eu5hp_k$();
    if (specialFp || isFinite(result))
      return result;
    throwInvalidFloatingPointDecoded(this.lexer_1, result);
  };
  protoOf(StreamingJsonDecoder).decodeDouble_ur8l0f_k$ = function () {
    var tmp0 = this.lexer_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.consumeStringLenient_9oypvu_k$();
      try {
        tmp$ret$0 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.fail$default_ly4hfp_k$("Failed to parse type '" + 'double' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$0;
    var specialFp = this.json_1.get_configuration_uqypjh_k$().get_allowSpecialFloatingPointValues_1eu5hp_k$();
    if (specialFp || isFinite_0(result))
      return result;
    throwInvalidFloatingPointDecoded(this.lexer_1, result);
  };
  protoOf(StreamingJsonDecoder).decodeChar_dcmcfa_k$ = function () {
    var string = this.lexer_1.consumeStringLenient_9oypvu_k$();
    if (!(string.length === 1)) {
      this.lexer_1.fail$default_ly4hfp_k$("Expected single char, but got '" + string + "'");
    }
    return charCodeAt(string, 0);
  };
  protoOf(StreamingJsonDecoder).decodeString_x3hxsx_k$ = function () {
    var tmp;
    if (this.configuration_1.get_isLenient_1g1x8_k$()) {
      tmp = this.lexer_1.consumeStringLenientNotNull_m2rgts_k$();
    } else {
      tmp = this.lexer_1.consumeString_j3j2z7_k$();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).decodeStringChunked_f1gp7m_k$ = function (consumeChunk) {
    this.lexer_1.consumeStringChunked_ewhgsb_k$(this.configuration_1.get_isLenient_1g1x8_k$(), consumeChunk);
  };
  protoOf(StreamingJsonDecoder).decodeInline_ux3vza_k$ = function (descriptor) {
    return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.lexer_1, this.json_1) : protoOf(AbstractDecoder).decodeInline_ux3vza_k$.call(this, descriptor);
  };
  protoOf(StreamingJsonDecoder).decodeEnum_slg6lu_k$ = function (enumDescriptor) {
    return getJsonNameIndexOrThrow(enumDescriptor, this.json_1, this.decodeString_x3hxsx_k$(), ' at path ' + this.lexer_1.get_path_wos8ry_k$().getPath_18su3p_k$());
  };
  function parseString(_this__u8e3s4, expectedType, block) {
    var input = _this__u8e3s4.consumeStringLenient_9oypvu_k$();
    try {
      return block(input);
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        _this__u8e3s4.fail$default_ly4hfp_k$("Failed to parse type '" + expectedType + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  function _get_lexer__es58e3_0($this) {
    return $this.lexer_1;
  }
  function JsonDecoderForUnsignedTypes(lexer, json) {
    AbstractDecoder.call(this);
    this.lexer_1 = lexer;
    this.serializersModule_1 = json.get_serializersModule_piitvg_k$();
  }
  protoOf(JsonDecoderForUnsignedTypes).get_serializersModule_piitvg_k$ = function () {
    return this.serializersModule_1;
  };
  protoOf(JsonDecoderForUnsignedTypes).decodeElementIndex_bstkhp_k$ = function (descriptor) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(JsonDecoderForUnsignedTypes).decodeInt_8iq8f5_k$ = function () {
    var tmp0 = this.lexer_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.consumeStringLenient_9oypvu_k$();
      try {
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = toUInt(input);
        tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.fail$default_ly4hfp_k$("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(JsonDecoderForUnsignedTypes).decodeLong_jzt186_k$ = function () {
    var tmp0 = this.lexer_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.consumeStringLenient_9oypvu_k$();
      try {
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = toULong(input);
        tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.fail$default_ly4hfp_k$("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(JsonDecoderForUnsignedTypes).decodeByte_jzz7je_k$ = function () {
    var tmp0 = this.lexer_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.consumeStringLenient_9oypvu_k$();
      try {
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = toUByte(input);
        tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.fail$default_ly4hfp_k$("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(JsonDecoderForUnsignedTypes).decodeShort_jjqk32_k$ = function () {
    var tmp0 = this.lexer_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.consumeStringLenient_9oypvu_k$();
      try {
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = toUShort(input);
        tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.fail$default_ly4hfp_k$("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  function get_unsignedNumberDescriptors() {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return unsignedNumberDescriptors;
  }
  var unsignedNumberDescriptors;
  function _get_composer__1cv6i3($this) {
    return $this.composer_1;
  }
  function _get_mode__dah3bc_0($this) {
    return $this.mode_1;
  }
  function _get_modeReuseCache__1wg056($this) {
    return $this.modeReuseCache_1;
  }
  function StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, $this) {
    StreamingJsonEncoder.call($this, Composer_0(output, json), json, mode, modeReuseCache);
    return $this;
  }
  function StreamingJsonEncoder_init_$Create$(output, json, mode, modeReuseCache) {
    return StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, objectCreate(protoOf(StreamingJsonEncoder)));
  }
  function _get_configuration__557qfv_1($this) {
    return $this.configuration_1;
  }
  function _set_forceQuoting__c1fr61($this, _set____db54di) {
    $this.forceQuoting_1 = _set____db54di;
  }
  function _get_forceQuoting__rl6hq5_1($this) {
    return $this.forceQuoting_1;
  }
  function _set_polymorphicDiscriminator__uwj3yn($this, _set____db54di) {
    $this.polymorphicDiscriminator_1 = _set____db54di;
  }
  function _get_polymorphicDiscriminator__qe5wbf($this) {
    return $this.polymorphicDiscriminator_1;
  }
  function _set_polymorphicSerialName__3c9rn4($this, _set____db54di) {
    $this.polymorphicSerialName_1 = _set____db54di;
  }
  function _get_polymorphicSerialName__9hw42s($this) {
    return $this.polymorphicSerialName_1;
  }
  function encodeTypeInfo($this, discriminator, serialName) {
    $this.composer_1.nextItem_40n9p2_k$();
    $this.encodeString_424b5v_k$(discriminator);
    $this.composer_1.print_uoq3bk_k$(_Char___init__impl__6a9atx(58));
    $this.composer_1.space_po67ue_k$();
    $this.encodeString_424b5v_k$(serialName);
  }
  function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
    AbstractEncoder.call(this);
    this.composer_1 = composer;
    this.json_1 = json;
    this.mode_1 = mode;
    this.modeReuseCache_1 = modeReuseCache;
    this.serializersModule_1 = this.json_1.get_serializersModule_piitvg_k$();
    this.configuration_1 = this.json_1.get_configuration_uqypjh_k$();
    this.forceQuoting_1 = false;
    this.polymorphicDiscriminator_1 = null;
    this.polymorphicSerialName_1 = null;
    var i = this.mode_1.get_ordinal_ip24qg_k$();
    if (!(this.modeReuseCache_1 == null)) {
      if (!(this.modeReuseCache_1[i] === null) || !(this.modeReuseCache_1[i] === this)) {
        this.modeReuseCache_1[i] = this;
      }
    }
  }
  protoOf(StreamingJsonEncoder).get_json_woos35_k$ = function () {
    return this.json_1;
  };
  protoOf(StreamingJsonEncoder).get_serializersModule_piitvg_k$ = function () {
    return this.serializersModule_1;
  };
  protoOf(StreamingJsonEncoder).encodeJsonElement_7ygdou_k$ = function (element) {
    var tmp;
    if (!(this.polymorphicDiscriminator_1 == null)) {
      tmp = !(element instanceof JsonObject);
    } else {
      tmp = false;
    }
    if (tmp) {
      throwJsonElementPolymorphicException(this.polymorphicSerialName_1, element);
    }
    this.encodeSerializableValue_3uuzip_k$(JsonElementSerializer_getInstance(), element);
  };
  protoOf(StreamingJsonEncoder).shouldEncodeElementDefault_x8eyid_k$ = function (descriptor, index) {
    return this.configuration_1.get_encodeDefaults_m8plkf_k$();
  };
  protoOf(StreamingJsonEncoder).encodeSerializableValue_3uuzip_k$ = function (serializer, value) {
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
      if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_useArrayPolymorphism_teidaa_k$()) {
        serializer.serialize_5ase3y_k$(this, value);
        break $l$block;
      }
      var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
      var tmp;
      if (isPolymorphicSerializer) {
        tmp = !this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_classDiscriminatorMode_bmc7xs_k$().equals(ClassDiscriminatorMode_NONE_getInstance());
      } else {
        var tmp_0;
        switch (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_classDiscriminatorMode_bmc7xs_k$().get_ordinal_ip24qg_k$()) {
          case 0:
          case 2:
            tmp_0 = false;
            break;
          case 1:
            // Inline function 'kotlin.let' call

            var it = serializer.get_descriptor_wjt6a0_k$().get_kind_wop7ml_k$();
            tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        tmp = tmp_0;
      }
      var needDiscriminator = tmp;
      var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.get_descriptor_wjt6a0_k$(), this.get_json_woos35_k$()) : null;
      var tmp_1;
      if (isPolymorphicSerializer) {
        var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
        $l$block_0: {
          // Inline function 'kotlin.requireNotNull' call
          if (value == null) {
            var message = 'Value for serializer ' + toString(serializer.get_descriptor_wjt6a0_k$()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          } else {
            break $l$block_0;
          }
        }
        var actual = findPolymorphicSerializer_0(casted, this, value);
        tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
      } else {
        tmp_1 = serializer;
      }
      var actualSerializer = tmp_1;
      if (!(baseClassDiscriminator == null)) {
        access$checkEncodingConflicts$tPolymorphicKt(this.get_json_woos35_k$(), serializer, actualSerializer, baseClassDiscriminator);
        checkKind_0(actualSerializer.get_descriptor_wjt6a0_k$().get_kind_wop7ml_k$());
        var serialName = actualSerializer.get_descriptor_wjt6a0_k$().get_serialName_u2rqhk_k$();
        this.polymorphicDiscriminator_1 = baseClassDiscriminator;
        this.polymorphicSerialName_1 = serialName;
      }
      actualSerializer.serialize_5ase3y_k$(this, value);
    }
  };
  protoOf(StreamingJsonEncoder).beginStructure_yljocp_k$ = function (descriptor) {
    var newMode = switchMode(this.json_1, descriptor);
    if (!(newMode.get_begin_14uf0e_k$() === _Char___init__impl__6a9atx(0))) {
      this.composer_1.print_uoq3bk_k$(newMode.get_begin_14uf0e_k$());
      this.composer_1.indent_cuntic_k$();
    }
    var discriminator = this.polymorphicDiscriminator_1;
    if (!(discriminator == null)) {
      var tmp0_elvis_lhs = this.polymorphicSerialName_1;
      encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.get_serialName_u2rqhk_k$() : tmp0_elvis_lhs);
      this.polymorphicDiscriminator_1 = null;
      this.polymorphicSerialName_1 = null;
    }
    if (this.mode_1.equals(newMode)) {
      return this;
    }
    var tmp1_safe_receiver = this.modeReuseCache_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.get_ordinal_ip24qg_k$()];
    return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.composer_1, this.json_1, newMode, this.modeReuseCache_1) : tmp2_elvis_lhs;
  };
  protoOf(StreamingJsonEncoder).endStructure_1xqz0n_k$ = function (descriptor) {
    if (!(this.mode_1.get_end_l6d8j8_k$() === _Char___init__impl__6a9atx(0))) {
      this.composer_1.unIndent_45q4lx_k$();
      this.composer_1.nextItemIfNotFirst_9wb040_k$();
      this.composer_1.print_uoq3bk_k$(this.mode_1.get_end_l6d8j8_k$());
    }
  };
  protoOf(StreamingJsonEncoder).encodeElement_5v7eyb_k$ = function (descriptor, index) {
    switch (this.mode_1.get_ordinal_ip24qg_k$()) {
      case 1:
        if (!this.composer_1.get_writingFirst_pt5bb1_k$()) {
          this.composer_1.print_uoq3bk_k$(_Char___init__impl__6a9atx(44));
        }

        this.composer_1.nextItem_40n9p2_k$();
        break;
      case 2:
        if (!this.composer_1.get_writingFirst_pt5bb1_k$()) {
          var tmp = this;
          var tmp_0;
          if ((index % 2 | 0) === 0) {
            this.composer_1.print_uoq3bk_k$(_Char___init__impl__6a9atx(44));
            this.composer_1.nextItem_40n9p2_k$();
            tmp_0 = true;
          } else {
            this.composer_1.print_uoq3bk_k$(_Char___init__impl__6a9atx(58));
            this.composer_1.space_po67ue_k$();
            tmp_0 = false;
          }
          tmp.forceQuoting_1 = tmp_0;
        } else {
          this.forceQuoting_1 = true;
          this.composer_1.nextItem_40n9p2_k$();
        }

        break;
      case 3:
        if (index === 0)
          this.forceQuoting_1 = true;
        if (index === 1) {
          this.composer_1.print_uoq3bk_k$(_Char___init__impl__6a9atx(44));
          this.composer_1.space_po67ue_k$();
          this.forceQuoting_1 = false;
        }

        break;
      default:
        if (!this.composer_1.get_writingFirst_pt5bb1_k$()) {
          this.composer_1.print_uoq3bk_k$(_Char___init__impl__6a9atx(44));
        }

        this.composer_1.nextItem_40n9p2_k$();
        this.encodeString_424b5v_k$(getJsonElementName(descriptor, this.json_1, index));
        this.composer_1.print_uoq3bk_k$(_Char___init__impl__6a9atx(58));
        this.composer_1.space_po67ue_k$();
        break;
    }
    return true;
  };
  protoOf(StreamingJsonEncoder).encodeNullableSerializableElement_5lquiv_k$ = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.configuration_1.get_explicitNulls_ppiuof_k$()) {
      protoOf(AbstractEncoder).encodeNullableSerializableElement_5lquiv_k$.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(StreamingJsonEncoder).encodeInline_wxp5pu_k$ = function (descriptor) {
    var tmp;
    if (get_isUnsignedNumber(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_0;
      var tmp_1 = this.composer_1;
      if (tmp_1 instanceof ComposerForUnsignedNumbers) {
        tmp_0 = this.composer_1;
      } else {
        var tmp0 = this.composer_1.get_writer_fne0c5_k$();
        var p1 = this.forceQuoting_1;
        tmp_0 = new ComposerForUnsignedNumbers(tmp0, p1);
      }
      var tmp$ret$0 = tmp_0;
      tmp = new StreamingJsonEncoder(tmp$ret$0, this.json_1, this.mode_1, null);
    } else if (get_isUnquotedLiteral(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_2;
      var tmp_3 = this.composer_1;
      if (tmp_3 instanceof ComposerForUnquotedLiterals) {
        tmp_2 = this.composer_1;
      } else {
        var tmp0_0 = this.composer_1.get_writer_fne0c5_k$();
        var p1_0 = this.forceQuoting_1;
        tmp_2 = new ComposerForUnquotedLiterals(tmp0_0, p1_0);
      }
      var tmp$ret$2 = tmp_2;
      tmp = new StreamingJsonEncoder(tmp$ret$2, this.json_1, this.mode_1, null);
    } else if (!(this.polymorphicDiscriminator_1 == null)) {
      // Inline function 'kotlin.apply' call
      this.polymorphicSerialName_1 = descriptor.get_serialName_u2rqhk_k$();
      tmp = this;
    } else {
      tmp = protoOf(AbstractEncoder).encodeInline_wxp5pu_k$.call(this, descriptor);
    }
    return tmp;
  };
  protoOf(StreamingJsonEncoder).encodeNull_ejiosz_k$ = function () {
    this.composer_1.print_wtfns3_k$('null');
  };
  protoOf(StreamingJsonEncoder).encodeBoolean_tu2e59_k$ = function (value) {
    if (this.forceQuoting_1) {
      this.encodeString_424b5v_k$(value.toString());
    } else {
      this.composer_1.print_u0bpvs_k$(value);
    }
  };
  protoOf(StreamingJsonEncoder).encodeByte_6txfee_k$ = function (value) {
    if (this.forceQuoting_1) {
      this.encodeString_424b5v_k$(value.toString());
    } else {
      this.composer_1.print_p65m4b_k$(value);
    }
  };
  protoOf(StreamingJsonEncoder).encodeShort_gza6si_k$ = function (value) {
    if (this.forceQuoting_1) {
      this.encodeString_424b5v_k$(value.toString());
    } else {
      this.composer_1.print_l5t6fv_k$(value);
    }
  };
  protoOf(StreamingJsonEncoder).encodeInt_y5zi3z_k$ = function (value) {
    if (this.forceQuoting_1) {
      this.encodeString_424b5v_k$(value.toString());
    } else {
      this.composer_1.print_ay1yo5_k$(value);
    }
  };
  protoOf(StreamingJsonEncoder).encodeLong_3didw_k$ = function (value) {
    if (this.forceQuoting_1) {
      this.encodeString_424b5v_k$(value.toString());
    } else {
      this.composer_1.print_adpg1_k$(value);
    }
  };
  protoOf(StreamingJsonEncoder).encodeFloat_b8b85a_k$ = function (value) {
    if (this.forceQuoting_1) {
      this.encodeString_424b5v_k$(value.toString());
    } else {
      this.composer_1.print_81xt5n_k$(value);
    }
    if (!this.configuration_1.get_allowSpecialFloatingPointValues_1eu5hp_k$() && !isFinite(value)) {
      throw InvalidFloatingPointEncoded(value);
    }
  };
  protoOf(StreamingJsonEncoder).encodeDouble_n270q9_k$ = function (value) {
    if (this.forceQuoting_1) {
      this.encodeString_424b5v_k$(value.toString());
    } else {
      this.composer_1.print_3xddxz_k$(value);
    }
    if (!this.configuration_1.get_allowSpecialFloatingPointValues_1eu5hp_k$() && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded(value);
    }
  };
  protoOf(StreamingJsonEncoder).encodeChar_oxoup_k$ = function (value) {
    this.encodeString_424b5v_k$(toString_1(value));
  };
  protoOf(StreamingJsonEncoder).encodeString_424b5v_k$ = function (value) {
    return this.composer_1.printQuoted_gtxn2t_k$(value);
  };
  protoOf(StreamingJsonEncoder).encodeEnum_2qin0y_k$ = function (enumDescriptor, index) {
    this.encodeString_424b5v_k$(enumDescriptor.getElementName_u4sqmf_k$(index));
  };
  function get_isUnsignedNumber(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.get_isInline_usk17w_k$() && get_unsignedNumberDescriptors().contains_aljjnj_k$(_this__u8e3s4);
  }
  function get_isUnquotedLiteral(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.get_isInline_usk17w_k$() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
  }
  var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
  function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
    if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
      properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
      unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).get_descriptor_wjt6a0_k$(), serializer_0(Companion_getInstance()).get_descriptor_wjt6a0_k$(), serializer_2(Companion_getInstance_1()).get_descriptor_wjt6a0_k$(), serializer_3(Companion_getInstance_2()).get_descriptor_wjt6a0_k$()]);
    }
  }
  function get_ESCAPE_STRINGS() {
    _init_properties_StringOps_kt__fcy1db();
    return ESCAPE_STRINGS;
  }
  var ESCAPE_STRINGS;
  function get_ESCAPE_MARKERS() {
    _init_properties_StringOps_kt__fcy1db();
    return ESCAPE_MARKERS;
  }
  var ESCAPE_MARKERS;
  function toHexChar(i) {
    _init_properties_StringOps_kt__fcy1db();
    var d = i & 15;
    var tmp;
    if (d < 10) {
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      tmp = numberToChar(d + tmp$ret$0 | 0);
    } else {
      var tmp_0 = d - 10 | 0;
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
      tmp = numberToChar(tmp_0 + tmp$ret$1 | 0);
    }
    return tmp;
  }
  function printQuoted(_this__u8e3s4, value) {
    _init_properties_StringOps_kt__fcy1db();
    _this__u8e3s4.append_am5a4z_k$(_Char___init__impl__6a9atx(34));
    var lastPos = 0;
    var inductionVariable = 0;
    var last = charSequenceLength(value) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_0 = charCodeAt(value, i);
        var c = Char__toInt_impl_vasixd(this_0);
        if (c < get_ESCAPE_STRINGS().length && !(get_ESCAPE_STRINGS()[c] == null)) {
          _this__u8e3s4.append_xdc1zw_k$(value, lastPos, i);
          _this__u8e3s4.append_22ad7x_k$(get_ESCAPE_STRINGS()[c]);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    if (!(lastPos === 0))
      _this__u8e3s4.append_xdc1zw_k$(value, lastPos, value.length);
    else
      _this__u8e3s4.append_22ad7x_k$(value);
    _this__u8e3s4.append_am5a4z_k$(_Char___init__impl__6a9atx(34));
  }
  function toBooleanStrictOrNull_0(_this__u8e3s4) {
    _init_properties_StringOps_kt__fcy1db();
    return equals_0(_this__u8e3s4, 'true', true) ? true : equals_0(_this__u8e3s4, 'false', true) ? false : null;
  }
  var properties_initialized_StringOps_kt_wzaea7;
  function _init_properties_StringOps_kt__fcy1db() {
    if (!properties_initialized_StringOps_kt_wzaea7) {
      properties_initialized_StringOps_kt_wzaea7 = true;
      // Inline function 'kotlin.arrayOfNulls' call
      // Inline function 'kotlin.apply' call
      var this_0 = Array(93);
      var inductionVariable = 0;
      if (inductionVariable <= 31)
        do {
          var c = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var c1 = toHexChar(c >> 12);
          var c2 = toHexChar(c >> 8);
          var c3 = toHexChar(c >> 4);
          var c4 = toHexChar(c);
          this_0[c] = '\\u' + toString_1(c1) + toString_1(c2) + toString_1(c3) + toString_1(c4);
        }
         while (inductionVariable <= 31);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(34);
      this_0[Char__toInt_impl_vasixd(this_1)] = '\\"';
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(92);
      this_0[Char__toInt_impl_vasixd(this_2)] = '\\\\';
      // Inline function 'kotlin.code' call
      var this_3 = _Char___init__impl__6a9atx(9);
      this_0[Char__toInt_impl_vasixd(this_3)] = '\\t';
      // Inline function 'kotlin.code' call
      var this_4 = _Char___init__impl__6a9atx(8);
      this_0[Char__toInt_impl_vasixd(this_4)] = '\\b';
      // Inline function 'kotlin.code' call
      var this_5 = _Char___init__impl__6a9atx(10);
      this_0[Char__toInt_impl_vasixd(this_5)] = '\\n';
      // Inline function 'kotlin.code' call
      var this_6 = _Char___init__impl__6a9atx(13);
      this_0[Char__toInt_impl_vasixd(this_6)] = '\\r';
      this_0[12] = '\\f';
      ESCAPE_STRINGS = this_0;
      // Inline function 'kotlin.apply' call
      var this_7 = new Int8Array(93);
      var inductionVariable_0 = 0;
      if (inductionVariable_0 <= 31)
        do {
          var c_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          this_7[c_0] = 1;
        }
         while (inductionVariable_0 <= 31);
      // Inline function 'kotlin.code' call
      var this_8 = _Char___init__impl__6a9atx(34);
      var tmp = Char__toInt_impl_vasixd(this_8);
      // Inline function 'kotlin.code' call
      var this_9 = _Char___init__impl__6a9atx(34);
      var tmp$ret$3 = Char__toInt_impl_vasixd(this_9);
      this_7[tmp] = toByte(tmp$ret$3);
      // Inline function 'kotlin.code' call
      var this_10 = _Char___init__impl__6a9atx(92);
      var tmp_0 = Char__toInt_impl_vasixd(this_10);
      // Inline function 'kotlin.code' call
      var this_11 = _Char___init__impl__6a9atx(92);
      var tmp$ret$5 = Char__toInt_impl_vasixd(this_11);
      this_7[tmp_0] = toByte(tmp$ret$5);
      // Inline function 'kotlin.code' call
      var this_12 = _Char___init__impl__6a9atx(9);
      var tmp_1 = Char__toInt_impl_vasixd(this_12);
      // Inline function 'kotlin.code' call
      var this_13 = _Char___init__impl__6a9atx(116);
      var tmp$ret$7 = Char__toInt_impl_vasixd(this_13);
      this_7[tmp_1] = toByte(tmp$ret$7);
      // Inline function 'kotlin.code' call
      var this_14 = _Char___init__impl__6a9atx(8);
      var tmp_2 = Char__toInt_impl_vasixd(this_14);
      // Inline function 'kotlin.code' call
      var this_15 = _Char___init__impl__6a9atx(98);
      var tmp$ret$9 = Char__toInt_impl_vasixd(this_15);
      this_7[tmp_2] = toByte(tmp$ret$9);
      // Inline function 'kotlin.code' call
      var this_16 = _Char___init__impl__6a9atx(10);
      var tmp_3 = Char__toInt_impl_vasixd(this_16);
      // Inline function 'kotlin.code' call
      var this_17 = _Char___init__impl__6a9atx(110);
      var tmp$ret$11 = Char__toInt_impl_vasixd(this_17);
      this_7[tmp_3] = toByte(tmp$ret$11);
      // Inline function 'kotlin.code' call
      var this_18 = _Char___init__impl__6a9atx(13);
      var tmp_4 = Char__toInt_impl_vasixd(this_18);
      // Inline function 'kotlin.code' call
      var this_19 = _Char___init__impl__6a9atx(114);
      var tmp$ret$13 = Char__toInt_impl_vasixd(this_19);
      this_7[tmp_4] = toByte(tmp$ret$13);
      // Inline function 'kotlin.code' call
      var this_20 = _Char___init__impl__6a9atx(102);
      var tmp$ret$14 = Char__toInt_impl_vasixd(this_20);
      this_7[12] = toByte(tmp$ret$14);
      ESCAPE_MARKERS = this_7;
    }
  }
  function SuppressAnimalSniffer() {
  }
  protoOf(SuppressAnimalSniffer).equals = function (other) {
    if (!(other instanceof SuppressAnimalSniffer))
      return false;
    other instanceof SuppressAnimalSniffer || THROW_CCE();
    return true;
  };
  protoOf(SuppressAnimalSniffer).hashCode = function () {
    return 0;
  };
  protoOf(SuppressAnimalSniffer).toString = function () {
    return '@kotlinx.serialization.json.internal.SuppressAnimalSniffer(' + ')';
  };
  function readJson(json, element, deserializer) {
    var tmp;
    if (element instanceof JsonObject) {
      tmp = new JsonTreeDecoder(json, element);
    } else {
      if (element instanceof JsonArray) {
        tmp = new JsonTreeListDecoder(json, element);
      } else {
        var tmp_0;
        if (element instanceof JsonLiteral) {
          tmp_0 = true;
        } else {
          tmp_0 = equals(element, JsonNull_getInstance());
        }
        if (tmp_0) {
          tmp = new JsonPrimitiveDecoder(json, element instanceof JsonPrimitive ? element : THROW_CCE());
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    var input = tmp;
    return input.decodeSerializableValue_xpnpad_k$(deserializer);
  }
  function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
    return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.get_descriptor_wjt6a0_k$())).decodeSerializableValue_xpnpad_k$(deserializer);
  }
  function getPrimitiveValue($this, tag, primitiveName, convert) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = $this.currentElement_4dg47r_k$(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp2 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(value).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + primitiveName;
      // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
      var path = $this.renderTagStack_ixxubu_k$(tag);
      var tmp;
      if ($this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
        var tmp$ret$6 = toString(value);
        tmp = toString(minify(tmp$ret$6));
      } else {
        tmp = null;
      }
      var inputValue = tmp;
      throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
    }
    var literal = value;
    try {
      var tmp0_elvis_lhs = convert(literal);
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive($this, literal, primitiveName, tag);
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      return tmp_0;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        unparsedPrimitive($this, literal, primitiveName, tag);
      } else {
        throw $p;
      }
    }
  }
  function unparsedPrimitive($this, literal, primitive, tag) {
    var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
    var tmp2 = "Failed to parse literal '" + literal.toString() + "' as " + type + ' value';
    // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
    var path = $this.renderTagStack_ixxubu_k$(tag);
    var tmp;
    if ($this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
      var tmp$ret$3 = toString($this.currentObject_yxe2oo_k$());
      tmp = toString(minify(tmp$ret$3));
    } else {
      tmp = null;
    }
    var inputValue = tmp;
    throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
  }
  function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    NamedValueDecoder.call(this);
    this.json_1 = json;
    this.value_1 = value;
    this.polymorphicDiscriminator_1 = polymorphicDiscriminator;
    this.configuration_1 = this.get_json_woos35_k$().get_configuration_uqypjh_k$();
  }
  protoOf(AbstractJsonTreeDecoder).get_json_woos35_k$ = function () {
    return this.json_1;
  };
  protoOf(AbstractJsonTreeDecoder).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  protoOf(AbstractJsonTreeDecoder).get_polymorphicDiscriminator_ipswcx_k$ = function () {
    return this.polymorphicDiscriminator_1;
  };
  protoOf(AbstractJsonTreeDecoder).get_serializersModule_piitvg_k$ = function () {
    return this.get_json_woos35_k$().get_serializersModule_piitvg_k$();
  };
  protoOf(AbstractJsonTreeDecoder).get_configuration_uqypjh_k$ = function () {
    return this.configuration_1;
  };
  protoOf(AbstractJsonTreeDecoder).currentObject_yxe2oo_k$ = function () {
    var tmp0_safe_receiver = this.get_currentTagOrNull_yhyzw_k$();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = this.currentElement_4dg47r_k$(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? this.get_value_j01efc_k$() : tmp1_elvis_lhs;
  };
  protoOf(AbstractJsonTreeDecoder).renderTagStack_ixxubu_k$ = function (currentTag) {
    return this.renderTagStack_rja478_k$() + ('.' + currentTag);
  };
  protoOf(AbstractJsonTreeDecoder).decodeJsonElement_6lz9ye_k$ = function () {
    return this.currentObject_yxe2oo_k$();
  };
  protoOf(AbstractJsonTreeDecoder).decodeSerializableValue_xpnpad_k$ = function (deserializer) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_useArrayPolymorphism_teidaa_k$();
      }
      if (tmp) {
        tmp$ret$0 = deserializer.deserialize_sy6x50_k$(this);
        break $l$block;
      }
      var discriminator = classDiscriminator(deserializer.get_descriptor_wjt6a0_k$(), this.get_json_woos35_k$());
      var tmp2 = this.decodeJsonElement_6lz9ye_k$();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = deserializer.get_descriptor_wjt6a0_k$().get_serialName_u2rqhk_k$();
      if (!(tmp2 instanceof JsonObject)) {
        var tmp2_0 = 'Expected ' + getKClass(JsonObject).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(tmp2).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName;
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_rja478_k$();
        var tmp_0;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$6 = toString(tmp2);
          tmp_0 = toString(minify(tmp$ret$6));
        } else {
          tmp_0 = null;
        }
        var inputValue = tmp_0;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
      }
      var jsonTree = tmp2;
      var tmp0_safe_receiver = jsonTree.get_6bo4tg_k$(discriminator);
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
      var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
      var tmp_1;
      try {
        tmp_1 = findPolymorphicSerializer(deserializer, this, type);
      } catch ($p) {
        var tmp_2;
        if ($p instanceof SerializationException) {
          var it = $p;
          // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
          var shortMessage = ensureNotNull(it.message);
          var tmp_3;
          if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
            var tmp$ret$10 = jsonTree.toString();
            tmp_3 = toString(minify(tmp$ret$10));
          } else {
            tmp_3 = null;
          }
          var inputValue_0 = tmp_3;
          throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, shortMessage, null, null, inputValue_0), shortMessage, -1, null, inputValue_0, null);
        } else {
          throw $p;
        }
      }
      var tmp_4 = tmp_1;
      var actualSerializer = isInterface(tmp_4, DeserializationStrategy) ? tmp_4 : THROW_CCE();
      tmp$ret$0 = readPolymorphicJson(this.get_json_woos35_k$(), discriminator, jsonTree, actualSerializer);
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).composeName_8y2y4d_k$ = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeDecoder).beginStructure_yljocp_k$ = function (descriptor) {
    var currentObject = this.currentObject_yxe2oo_k$();
    var tmp0_subject = descriptor.get_kind_wop7ml_k$();
    var tmp;
    var tmp_0;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_0 = true;
    } else {
      tmp_0 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_0) {
      var tmp_1 = this.get_json_woos35_k$();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = descriptor.get_serialName_u2rqhk_k$();
      if (!(currentObject instanceof JsonArray)) {
        var tmp2 = 'Expected ' + getKClass(JsonArray).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(currentObject).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName;
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_rja478_k$();
        var tmp_2;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$6 = toString(currentObject);
          tmp_2 = toString(minify(tmp$ret$6));
        } else {
          tmp_2 = null;
        }
        var inputValue = tmp_2;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
      }
      tmp = new JsonTreeListDecoder(tmp_1, currentObject);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.get_json_woos35_k$();
        var keyDescriptor = carrierDescriptor(descriptor.getElementDescriptor_ncda77_k$(0), this_0.get_serializersModule_piitvg_k$());
        var keyKind = keyDescriptor.get_kind_wop7ml_k$();
        var tmp_3;
        var tmp_4;
        if (keyKind instanceof PrimitiveKind) {
          tmp_4 = true;
        } else {
          tmp_4 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_4) {
          var tmp_5 = this.get_json_woos35_k$();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_0 = descriptor.get_serialName_u2rqhk_k$();
          if (!(currentObject instanceof JsonObject)) {
            var tmp2_0 = 'Expected ' + getKClass(JsonObject).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(currentObject).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName_0;
            // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
            var path_0 = this.renderTagStack_rja478_k$();
            var tmp_6;
            if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
              var tmp$ret$15 = toString(currentObject);
              tmp_6 = toString(minify(tmp$ret$15));
            } else {
              tmp_6 = null;
            }
            var inputValue_0 = tmp_6;
            throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path_0, null, inputValue_0), tmp2_0, -1, path_0, inputValue_0, null);
          }
          tmp_3 = new JsonTreeMapDecoder(tmp_5, currentObject);
        } else {
          if (this_0.get_configuration_uqypjh_k$().get_allowStructuredMapKeys_fk21t_k$()) {
            var tmp_7 = this.get_json_woos35_k$();
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            var serialName_1 = descriptor.get_serialName_u2rqhk_k$();
            if (!(currentObject instanceof JsonArray)) {
              var tmp2_1 = 'Expected ' + getKClass(JsonArray).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(currentObject).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName_1;
              // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
              var path_1 = this.renderTagStack_rja478_k$();
              var tmp_8;
              if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
                var tmp$ret$23 = toString(currentObject);
                tmp_8 = toString(minify(tmp$ret$23));
              } else {
                tmp_8 = null;
              }
              var inputValue_1 = tmp_8;
              throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_1, path_1, null, inputValue_1), tmp2_1, -1, path_1, inputValue_1, null);
            }
            tmp_3 = new JsonTreeListDecoder(tmp_7, currentObject);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_3;
      } else {
        var tmp_9 = this.get_json_woos35_k$();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_2 = descriptor.get_serialName_u2rqhk_k$();
        if (!(currentObject instanceof JsonObject)) {
          var tmp2_2 = 'Expected ' + getKClass(JsonObject).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(currentObject).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName_2;
          // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
          var path_2 = this.renderTagStack_rja478_k$();
          var tmp_10;
          if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
            var tmp$ret$30 = toString(currentObject);
            tmp_10 = toString(minify(tmp$ret$30));
          } else {
            tmp_10 = null;
          }
          var inputValue_2 = tmp_10;
          throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_2, path_2, null, inputValue_2), tmp2_2, -1, path_2, inputValue_2, null);
        }
        tmp = new JsonTreeDecoder(tmp_9, currentObject, this.polymorphicDiscriminator_1);
      }
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).endStructure_1xqz0n_k$ = function (descriptor) {
  };
  protoOf(AbstractJsonTreeDecoder).decodeNotNullMark_us4ba1_k$ = function () {
    var tmp = this.currentObject_yxe2oo_k$();
    return !(tmp instanceof JsonNull);
  };
  protoOf(AbstractJsonTreeDecoder).getPrimitiveValue_cue515_k$ = function (tag, descriptor) {
    var tmp2 = this.currentElement_4dg47r_k$(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = descriptor.get_serialName_u2rqhk_k$();
    if (!(tmp2 instanceof JsonPrimitive)) {
      var tmp2_0 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(tmp2).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName;
      // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
      var path = this.renderTagStack_ixxubu_k$(tag);
      var tmp;
      if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
        var tmp$ret$6 = toString(tmp2);
        tmp = toString(minify(tmp$ret$6));
      } else {
        tmp = null;
      }
      var inputValue = tmp;
      throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
    }
    return tmp2;
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedEnum_lbnta6_k$ = function (tag, enumDescriptor) {
    var tmp = this.get_json_woos35_k$();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp2 = this.currentElement_4dg47r_k$(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = enumDescriptor.get_serialName_u2rqhk_k$();
    if (!(tmp2 instanceof JsonPrimitive)) {
      var tmp2_0 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(tmp2).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName;
      // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
      var path = this.renderTagStack_ixxubu_k$(tag);
      var tmp_0;
      if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
        var tmp$ret$7 = toString(tmp2);
        tmp_0 = toString(minify(tmp$ret$7));
      } else {
        tmp_0 = null;
      }
      var inputValue = tmp_0;
      throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
    }
    return getJsonNameIndexOrThrow(enumDescriptor, tmp, tmp2.get_content_h02jrk_k$());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedEnum_iouca9_k$ = function (tag, enumDescriptor) {
    return this.decodeTaggedEnum_lbnta6_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedNull_b94zbb_k$ = function (tag) {
    return null;
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedNull_danhtk_k$ = function (tag) {
    return this.decodeTaggedNull_b94zbb_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedNotNullMark_t788xf_k$ = function (tag) {
    return !(this.currentElement_4dg47r_k$(tag) === JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedNotNullMark_opj0f8_k$ = function (tag) {
    return this.decodeTaggedNotNullMark_t788xf_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedBoolean_8s5b84_k$ = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.currentElement_4dg47r_k$(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp2 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(value).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + 'boolean';
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_ixxubu_k$(tag);
        var tmp;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$7 = toString(value);
          tmp = toString(minify(tmp$ret$7));
        } else {
          tmp = null;
        }
        var inputValue = tmp;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_booleanOrNull(literal);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'boolean', tag);
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_0;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'boolean', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedBoolean_172rbv_k$ = function (tag) {
    return this.decodeTaggedBoolean_8s5b84_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedByte_oje7fc_k$ = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.currentElement_4dg47r_k$(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp2 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(value).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + 'byte';
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_ixxubu_k$(tag);
        var tmp;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$7 = toString(value);
          tmp = toString(minify(tmp$ret$7));
        } else {
          tmp = null;
        }
        var inputValue = tmp;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
      }
      var literal = value;
      try {
        var result = parseLongImpl(literal);
        var tmp_0;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-128, 127);
        if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
          tmp_0 = convertToByte(result);
        } else {
          tmp_0 = null;
        }
        var tmp0_elvis_lhs = tmp_0;
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'byte', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'byte', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedByte_y3phtl_k$ = function (tag) {
    return this.decodeTaggedByte_oje7fc_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedShort_b0y92g_k$ = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.currentElement_4dg47r_k$(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp2 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(value).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + 'short';
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_ixxubu_k$(tag);
        var tmp;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$7 = toString(value);
          tmp = toString(minify(tmp$ret$7));
        } else {
          tmp = null;
        }
        var inputValue = tmp;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
      }
      var literal = value;
      try {
        var result = parseLongImpl(literal);
        var tmp_0;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-32768, 32767);
        if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
          tmp_0 = convertToShort(result);
        } else {
          tmp_0 = null;
        }
        var tmp0_elvis_lhs = tmp_0;
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'short', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'short', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedShort_dapzw9_k$ = function (tag) {
    return this.decodeTaggedShort_b0y92g_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedInt_9hzwhn_k$ = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.currentElement_4dg47r_k$(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp2 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(value).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + 'int';
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_ixxubu_k$(tag);
        var tmp;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$7 = toString(value);
          tmp = toString(minify(tmp$ret$7));
        } else {
          tmp = null;
        }
        var inputValue = tmp;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
      }
      var literal = value;
      try {
        var result = parseLongImpl(literal);
        var tmp_0;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-2147483648, 2147483647);
        if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
          tmp_0 = convertToInt(result);
        } else {
          tmp_0 = null;
        }
        var tmp0_elvis_lhs = tmp_0;
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'int', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'int', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedInt_mhypkc_k$ = function (tag) {
    return this.decodeTaggedInt_9hzwhn_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedLong_uzg5b0_k$ = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.currentElement_4dg47r_k$(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp2 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(value).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + 'long';
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_ixxubu_k$(tag);
        var tmp;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$7 = toString(value);
          tmp = toString(minify(tmp$ret$7));
        } else {
          tmp = null;
        }
        var inputValue = tmp;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = parseLongImpl(literal);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'long', tag);
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_0;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'long', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedLong_y9rqqb_k$ = function (tag) {
    return this.decodeTaggedLong_uzg5b0_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedFloat_hjyf60_k$ = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.currentElement_4dg47r_k$(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp2 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(value).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + 'float';
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_ixxubu_k$(tag);
        var tmp;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$7 = toString(value);
          tmp = toString(minify(tmp$ret$7));
        } else {
          tmp = null;
        }
        var inputValue = tmp;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_float(literal);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'float', tag);
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_0;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'float', tag);
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$0;
    var specialFp = this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_allowSpecialFloatingPointValues_1eu5hp_k$();
    if (specialFp || isFinite(result))
      return result;
    // Inline function 'kotlinx.serialization.json.internal.InvalidFloatingPointDecoded' call
    var tmp2_0 = access$nonFiniteFpMessage$tJsonExceptionsKt(result, tag);
    // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
    var hint = "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'";
    var tmp_1;
    if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
      var tmp$ret$13 = toString(this.currentObject_yxe2oo_k$());
      tmp_1 = toString(minify(tmp$ret$13));
    } else {
      tmp_1 = null;
    }
    var inputValue_0 = tmp_1;
    throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, null, hint, inputValue_0), tmp2_0, -1, null, inputValue_0, hint);
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedFloat_81o7o9_k$ = function (tag) {
    return this.decodeTaggedFloat_hjyf60_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedDouble_u6dgwh_k$ = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.currentElement_4dg47r_k$(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp2 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(value).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + 'double';
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_ixxubu_k$(tag);
        var tmp;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$7 = toString(value);
          tmp = toString(minify(tmp$ret$7));
        } else {
          tmp = null;
        }
        var inputValue = tmp;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_double(literal);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'double', tag);
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_0;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'double', tag);
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$0;
    var specialFp = this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_allowSpecialFloatingPointValues_1eu5hp_k$();
    if (specialFp || isFinite_0(result))
      return result;
    // Inline function 'kotlinx.serialization.json.internal.InvalidFloatingPointDecoded' call
    var tmp2_0 = access$nonFiniteFpMessage$tJsonExceptionsKt(result, tag);
    // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
    var hint = "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'";
    var tmp_1;
    if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
      var tmp$ret$13 = toString(this.currentObject_yxe2oo_k$());
      tmp_1 = toString(minify(tmp$ret$13));
    } else {
      tmp_1 = null;
    }
    var inputValue_0 = tmp_1;
    throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, null, hint, inputValue_0), tmp2_0, -1, null, inputValue_0, hint);
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedDouble_aa801q_k$ = function (tag) {
    return this.decodeTaggedDouble_u6dgwh_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedChar_ha7850_k$ = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.currentElement_4dg47r_k$(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp2 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(value).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + 'char';
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_ixxubu_k$(tag);
        var tmp;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$7 = toString(value);
          tmp = toString(minify(tmp$ret$7));
        } else {
          tmp = null;
        }
        var inputValue = tmp;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = new Char(single(literal.get_content_h02jrk_k$()));
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_0.value_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedChar_w7yrsn_k$ = function (tag) {
    return this.decodeTaggedChar_ha7850_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedString_fe7ocx_k$ = function (tag) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.currentElement_4dg47r_k$(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp2 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(value).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + 'string';
      // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
      var path = this.renderTagStack_ixxubu_k$(tag);
      var tmp;
      if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
        var tmp$ret$6 = toString(value);
        tmp = toString(minify(tmp$ret$6));
      } else {
        tmp = null;
      }
      var inputValue = tmp;
      throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
    }
    var value_0 = value;
    if (!(value_0 instanceof JsonLiteral)) {
      var tmp2_0 = "Expected string value for a non-null key '" + tag + "', got null literal instead";
      var tmp4 = this.renderTagStack_ixxubu_k$(tag);
      // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
      var hint = "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.";
      var tmp_0;
      if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
        var tmp$ret$10 = toString(this.currentObject_yxe2oo_k$());
        tmp_0 = toString(minify(tmp$ret$10));
      } else {
        tmp_0 = null;
      }
      var inputValue_0 = tmp_0;
      throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, tmp4, hint, inputValue_0), tmp2_0, -1, tmp4, inputValue_0, hint);
    }
    if (!value_0.get_isString_zep7bw_k$() && !this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_isLenient_1g1x8_k$()) {
      var tmp2_1 = "String literal for value of key '" + tag + "' should be quoted";
      var tmp4_0 = this.renderTagStack_ixxubu_k$(tag);
      // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
      var hint_0 = "Use 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.";
      var tmp_1;
      if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
        var tmp$ret$14 = toString(this.currentObject_yxe2oo_k$());
        tmp_1 = toString(minify(tmp$ret$14));
      } else {
        tmp_1 = null;
      }
      var inputValue_1 = tmp_1;
      throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_1, tmp4_0, hint_0, inputValue_1), tmp2_1, -1, tmp4_0, inputValue_1, hint_0);
    }
    return value_0.get_content_h02jrk_k$();
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedString_45pp1e_k$ = function (tag) {
    return this.decodeTaggedString_fe7ocx_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedInline_tuyvom_k$ = function (tag, inlineDescriptor) {
    var tmp;
    if (get_isUnsignedNumber(inlineDescriptor)) {
      var tmp_0 = this.get_json_woos35_k$();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      var tmp2 = this.currentElement_4dg47r_k$(tag);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = inlineDescriptor.get_serialName_u2rqhk_k$();
      if (!(tmp2 instanceof JsonPrimitive)) {
        var tmp2_0 = 'Expected ' + getKClass(JsonPrimitive).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(tmp2).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName;
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_ixxubu_k$(tag);
        var tmp_1;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$7 = toString(tmp2);
          tmp_1 = toString(minify(tmp$ret$7));
        } else {
          tmp_1 = null;
        }
        var inputValue = tmp_1;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
      }
      var lexer = StringJsonLexer_0(tmp_0, tmp2.get_content_h02jrk_k$());
      tmp = new JsonDecoderForUnsignedTypes(lexer, this.get_json_woos35_k$());
    } else {
      tmp = protoOf(NamedValueDecoder).decodeTaggedInline_u4chc9_k$.call(this, tag, inlineDescriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).decodeTaggedInline_u4chc9_k$ = function (tag, inlineDescriptor) {
    return this.decodeTaggedInline_tuyvom_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).decodeInline_ux3vza_k$ = function (descriptor) {
    return !(this.get_currentTagOrNull_yhyzw_k$() == null) ? protoOf(NamedValueDecoder).decodeInline_ux3vza_k$.call(this, descriptor) : (new JsonPrimitiveDecoder(this.get_json_woos35_k$(), this.get_value_j01efc_k$(), this.polymorphicDiscriminator_1)).decodeInline_ux3vza_k$(descriptor);
  };
  function _get_polyDescriptor__k5x0cw($this) {
    return $this.polyDescriptor_1;
  }
  function _set_position__5hlfea($this, _set____db54di) {
    $this.position_1 = _set____db54di;
  }
  function _get_position__iahqv2($this) {
    return $this.position_1;
  }
  function _set_forceNull__m2khrn($this, _set____db54di) {
    $this.forceNull_1 = _set____db54di;
  }
  function _get_forceNull__jnp3sx($this) {
    return $this.forceNull_1;
  }
  function setForceNull($this, descriptor, index) {
    $this.forceNull_1 = (!$this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_explicitNulls_ppiuof_k$() && !descriptor.isElementOptional_heqq56_k$(index) && descriptor.getElementDescriptor_ncda77_k$(index).get_isNullable_67sy7o_k$());
    return $this.forceNull_1;
  }
  function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.value_2 = value;
    this.polyDescriptor_1 = polyDescriptor;
    this.position_1 = 0;
    this.forceNull_1 = false;
  }
  protoOf(JsonTreeDecoder).get_value_j01efc_k$ = function () {
    return this.value_2;
  };
  protoOf(JsonTreeDecoder).decodeElementIndex_bstkhp_k$ = function (descriptor) {
    $l$loop: while (this.position_1 < descriptor.get_elementsCount_288r0x_k$()) {
      var _unary__edvuaz = this.position_1;
      this.position_1 = _unary__edvuaz + 1 | 0;
      var name = this.getTag_u4dqfb_k$(descriptor, _unary__edvuaz);
      var index = this.position_1 - 1 | 0;
      this.forceNull_1 = false;
      var tmp;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.get_value_j01efc_k$();
      if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).containsKey_aw81wo_k$(name)) {
        tmp = true;
      } else {
        tmp = setForceNull(this, descriptor, index);
      }
      if (tmp) {
        if (!this.configuration_1.get_coerceInputValues_gdasvc_k$())
          return index;
        var tmp0 = this.get_json_woos35_k$();
        var tmp$ret$2;
        $l$block_2: {
          // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
          var isOptional = descriptor.isElementOptional_heqq56_k$(index);
          var elementDescriptor = descriptor.getElementDescriptor_ncda77_k$(index);
          var tmp_0;
          if (isOptional && !elementDescriptor.get_isNullable_67sy7o_k$()) {
            var tmp_1 = this.currentElementOrNull_jb4enh_k$(name);
            tmp_0 = tmp_1 instanceof JsonNull;
          } else {
            tmp_0 = false;
          }
          if (tmp_0) {
            tmp$ret$2 = true;
            break $l$block_2;
          }
          if (equals(elementDescriptor.get_kind_wop7ml_k$(), ENUM_getInstance())) {
            var tmp_2;
            if (elementDescriptor.get_isNullable_67sy7o_k$()) {
              var tmp_3 = this.currentElementOrNull_jb4enh_k$(name);
              tmp_2 = tmp_3 instanceof JsonNull;
            } else {
              tmp_2 = false;
            }
            if (tmp_2) {
              tmp$ret$2 = false;
              break $l$block_2;
            }
            var tmp_4 = this.currentElementOrNull_jb4enh_k$(name);
            var tmp0_safe_receiver = tmp_4 instanceof JsonPrimitive ? tmp_4 : null;
            var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : get_contentOrNull(tmp0_safe_receiver);
            var tmp_5;
            if (tmp0_elvis_lhs == null) {
              tmp$ret$2 = false;
              break $l$block_2;
            } else {
              tmp_5 = tmp0_elvis_lhs;
            }
            var enumValue = tmp_5;
            var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
            var coerceToNull = !tmp0.get_configuration_uqypjh_k$().get_explicitNulls_ppiuof_k$() && elementDescriptor.get_isNullable_67sy7o_k$();
            if (enumIndex === -3 && (isOptional || coerceToNull)) {
              if (setForceNull(this, descriptor, index))
                return index;
              tmp$ret$2 = true;
              break $l$block_2;
            }
          }
          tmp$ret$2 = false;
        }
        if (tmp$ret$2)
          continue $l$loop;
        return index;
      }
    }
    return -1;
  };
  protoOf(JsonTreeDecoder).decodeNotNullMark_us4ba1_k$ = function () {
    return !this.forceNull_1 && protoOf(AbstractJsonTreeDecoder).decodeNotNullMark_us4ba1_k$.call(this);
  };
  protoOf(JsonTreeDecoder).elementName_p66hrm_k$ = function (descriptor, index) {
    var strategy = namingStrategy(descriptor, this.get_json_woos35_k$());
    var baseName = descriptor.getElementName_u4sqmf_k$(index);
    if (strategy == null) {
      if (!this.configuration_1.get_useAlternativeNames_c5maqh_k$())
        return baseName;
      if (this.get_value_j01efc_k$().get_keys_wop4xp_k$().contains_aljjnj_k$(baseName))
        return baseName;
    }
    var deserializationNamesMap_0 = deserializationNamesMap(this.get_json_woos35_k$(), descriptor);
    // Inline function 'kotlin.collections.find' call
    var tmp0 = this.get_value_j01efc_k$().get_keys_wop4xp_k$();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var element = _iterator__ex2g4s.next_20eer_k$();
        if (deserializationNamesMap_0.get_wei43m_k$(element) === index) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var fallbackName = strategy == null ? null : strategy.serialNameForJson_tclx3n_k$(descriptor, index, baseName);
    return fallbackName == null ? baseName : fallbackName;
  };
  protoOf(JsonTreeDecoder).currentElement_4dg47r_k$ = function (tag) {
    return getValue(this.get_value_j01efc_k$(), tag);
  };
  protoOf(JsonTreeDecoder).currentElementOrNull_jb4enh_k$ = function (tag) {
    return this.get_value_j01efc_k$().get_6bo4tg_k$(tag);
  };
  protoOf(JsonTreeDecoder).beginStructure_yljocp_k$ = function (descriptor) {
    if (descriptor === this.polyDescriptor_1) {
      var tmp = this.get_json_woos35_k$();
      var tmp2 = this.currentObject_yxe2oo_k$();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = this.polyDescriptor_1.get_serialName_u2rqhk_k$();
      if (!(tmp2 instanceof JsonObject)) {
        var tmp2_0 = 'Expected ' + getKClass(JsonObject).get_simpleName_r6f8py_k$() + ', but had ' + getKClassFromExpression(tmp2).get_simpleName_r6f8py_k$() + ' as the serialized body of ' + serialName;
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var path = this.renderTagStack_rja478_k$();
        var tmp_0;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$6 = toString(tmp2);
          tmp_0 = toString(minify(tmp$ret$6));
        } else {
          tmp_0 = null;
        }
        var inputValue = tmp_0;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
      }
      return new JsonTreeDecoder(tmp, tmp2, this.polymorphicDiscriminator_1, this.polyDescriptor_1);
    }
    return protoOf(AbstractJsonTreeDecoder).beginStructure_yljocp_k$.call(this, descriptor);
  };
  protoOf(JsonTreeDecoder).endStructure_1xqz0n_k$ = function (descriptor) {
    var tmp;
    if (ignoreUnknownKeys(descriptor, this.get_json_woos35_k$())) {
      tmp = true;
    } else {
      var tmp_0 = descriptor.get_kind_wop7ml_k$();
      tmp = tmp_0 instanceof PolymorphicKind;
    }
    if (tmp)
      return Unit_getInstance();
    var strategy = namingStrategy(descriptor, this.get_json_woos35_k$());
    var tmp_1;
    if (strategy == null && !this.configuration_1.get_useAlternativeNames_c5maqh_k$()) {
      tmp_1 = jsonCachedSerialNames(descriptor);
    } else if (!(strategy == null)) {
      tmp_1 = deserializationNamesMap(this.get_json_woos35_k$(), descriptor).get_keys_wop4xp_k$();
    } else {
      var tmp_2 = jsonCachedSerialNames(descriptor);
      var tmp0_safe_receiver = get_schemaCache(this.get_json_woos35_k$()).get_xn5txp_k$(descriptor, get_JsonDeserializationNamesKey());
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_keys_wop4xp_k$();
      var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
      tmp_1 = plus_0(tmp_2, tmp$ret$0);
    }
    var names = tmp_1;
    var _iterator__ex2g4s = this.get_value_j01efc_k$().get_keys_wop4xp_k$().iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var key = _iterator__ex2g4s.next_20eer_k$();
      if (!names.contains_aljjnj_k$(key) && !(key === this.polymorphicDiscriminator_1)) {
        var tmp2 = "Encountered an unknown key '" + key + "'";
        var tmp4 = this.renderTagStack_rja478_k$();
        // Inline function 'kotlinx.serialization.json.internal.decodingExceptionOf' call
        var hint = "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.";
        var tmp_3;
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_exceptionsWithDebugInfo_ajrapa_k$()) {
          var tmp$ret$4 = this.get_value_j01efc_k$().toString();
          tmp_3 = toString(minify(tmp$ret$4));
        } else {
          tmp_3 = null;
        }
        var inputValue = tmp_3;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, tmp4, hint, inputValue), tmp2, -1, tmp4, inputValue, hint);
      }
    }
  };
  function _get_size__ddoh9m($this) {
    return $this.size_1;
  }
  function _set_currentIndex__cezf6m_0($this, _set____db54di) {
    $this.currentIndex_1 = _set____db54di;
  }
  function _get_currentIndex__ryq5qq_0($this) {
    return $this.currentIndex_1;
  }
  function JsonTreeListDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.value_2 = value;
    this.size_1 = this.value_2.get_size_woubt6_k$();
    this.currentIndex_1 = -1;
  }
  protoOf(JsonTreeListDecoder).get_value_j01efc_k$ = function () {
    return this.value_2;
  };
  protoOf(JsonTreeListDecoder).elementName_p66hrm_k$ = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListDecoder).currentElement_4dg47r_k$ = function (tag) {
    return this.value_2.get_c1px32_k$(toInt(tag));
  };
  protoOf(JsonTreeListDecoder).decodeElementIndex_bstkhp_k$ = function (descriptor) {
    while (this.currentIndex_1 < (this.size_1 - 1 | 0)) {
      this.currentIndex_1 = this.currentIndex_1 + 1 | 0;
      return this.currentIndex_1;
    }
    return -1;
  };
  function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.value_2 = value;
    this.pushTag_bibnaf_k$('primitive');
  }
  protoOf(JsonPrimitiveDecoder).get_value_j01efc_k$ = function () {
    return this.value_2;
  };
  protoOf(JsonPrimitiveDecoder).decodeElementIndex_bstkhp_k$ = function (descriptor) {
    return 0;
  };
  protoOf(JsonPrimitiveDecoder).currentElement_4dg47r_k$ = function (tag) {
    // Inline function 'kotlin.require' call
    if (!(tag === 'primitive')) {
      var message = "This input can only handle primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.value_2;
  };
  function _get_keys__d97k5z($this) {
    return $this.keys_1;
  }
  function _get_size__ddoh9m_0($this) {
    return $this.size_1;
  }
  function _set_position__5hlfea_0($this, _set____db54di) {
    $this.position_2 = _set____db54di;
  }
  function _get_position__iahqv2_0($this) {
    return $this.position_2;
  }
  function JsonTreeMapDecoder(json, value) {
    JsonTreeDecoder.call(this, json, value);
    this.value_3 = value;
    this.keys_1 = toList(this.value_3.get_keys_wop4xp_k$());
    this.size_1 = imul(this.keys_1.get_size_woubt6_k$(), 2);
    this.position_2 = -1;
  }
  protoOf(JsonTreeMapDecoder).get_value_j01efc_k$ = function () {
    return this.value_3;
  };
  protoOf(JsonTreeMapDecoder).elementName_p66hrm_k$ = function (descriptor, index) {
    var i = index / 2 | 0;
    return this.keys_1.get_c1px32_k$(i);
  };
  protoOf(JsonTreeMapDecoder).decodeElementIndex_bstkhp_k$ = function (descriptor) {
    while (this.position_2 < (this.size_1 - 1 | 0)) {
      this.position_2 = this.position_2 + 1 | 0;
      return this.position_2;
    }
    return -1;
  };
  protoOf(JsonTreeMapDecoder).currentElement_4dg47r_k$ = function (tag) {
    return (this.position_2 % 2 | 0) === 0 ? JsonPrimitive_2(tag) : getValue(this.value_3, tag);
  };
  protoOf(JsonTreeMapDecoder).endStructure_1xqz0n_k$ = function (descriptor) {
  };
  function writeJson(json, value, serializer) {
    var result = {_v: null};
    var encoder = new JsonTreeEncoder(json, writeJson$lambda(result));
    encoder.encodeSerializableValue_3uuzip_k$(serializer, value);
    var tmp;
    if (result._v == null) {
      throwUninitializedPropertyAccessException('result');
    } else {
      tmp = result._v;
    }
    return tmp;
  }
  function JsonTreeEncoder(json, nodeConsumer) {
    AbstractJsonTreeEncoder.call(this, json, nodeConsumer);
    var tmp = this;
    // Inline function 'kotlin.collections.linkedMapOf' call
    tmp.content_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(JsonTreeEncoder).get_content_h02jrk_k$ = function () {
    return this.content_1;
  };
  protoOf(JsonTreeEncoder).putElement_rnqfb1_k$ = function (key, element) {
    // Inline function 'kotlin.collections.set' call
    this.content_1.put_4fpzoq_k$(key, element);
  };
  protoOf(JsonTreeEncoder).encodeNullableSerializableElement_5lquiv_k$ = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.configuration_1.get_explicitNulls_ppiuof_k$()) {
      protoOf(AbstractJsonTreeEncoder).encodeNullableSerializableElement_5lquiv_k$.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(JsonTreeEncoder).getCurrent_z8uawt_k$ = function () {
    return new JsonObject(this.content_1);
  };
  function _set_polymorphicDiscriminator__uwj3yn_0($this, _set____db54di) {
    $this.polymorphicDiscriminator_1 = _set____db54di;
  }
  function _get_polymorphicDiscriminator__qe5wbf_0($this) {
    return $this.polymorphicDiscriminator_1;
  }
  function _set_polymorphicSerialName__3c9rn4_0($this, _set____db54di) {
    $this.polymorphicSerialName_1 = _set____db54di;
  }
  function _get_polymorphicSerialName__9hw42s_0($this) {
    return $this.polymorphicSerialName_1;
  }
  function inlineUnsignedNumberEncoder($this, tag) {
    return new AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1($this, tag);
  }
  function inlineUnquotedLiteralEncoder($this, tag, inlineDescriptor) {
    return new AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1($this, tag, inlineDescriptor);
  }
  function AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1(this$0, $tag) {
    this.this$0__1 = this$0;
    this.$tag_1 = $tag;
    AbstractEncoder.call(this);
    this.serializersModule_1 = this$0.json_1.get_serializersModule_piitvg_k$();
  }
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).get_serializersModule_piitvg_k$ = function () {
    return this.serializersModule_1;
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).putUnquotedString_jy6tm1_k$ = function (s) {
    return this.this$0__1.putElement_rnqfb1_k$(this.$tag_1, new JsonLiteral(s, false));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).encodeInt_y5zi3z_k$ = function (value) {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(value);
    return this.putUnquotedString_jy6tm1_k$(UInt__toString_impl_dbgl21(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).encodeLong_3didw_k$ = function (value) {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$0 = _ULong___init__impl__c78o9k(value);
    return this.putUnquotedString_jy6tm1_k$(ULong__toString_impl_f9au7k(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).encodeByte_6txfee_k$ = function (value) {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(value);
    return this.putUnquotedString_jy6tm1_k$(UByte__toString_impl_v72jg(tmp$ret$0));
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnsignedNumberEncoder$1).encodeShort_gza6si_k$ = function (value) {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$0 = _UShort___init__impl__jigrne(value);
    return this.putUnquotedString_jy6tm1_k$(UShort__toString_impl_edaoee(tmp$ret$0));
  };
  function AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1(this$0, $tag, $inlineDescriptor) {
    this.this$0__1 = this$0;
    this.$tag_1 = $tag;
    this.$inlineDescriptor_1 = $inlineDescriptor;
    AbstractEncoder.call(this);
  }
  protoOf(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1).get_serializersModule_piitvg_k$ = function () {
    return this.this$0__1.json_1.get_serializersModule_piitvg_k$();
  };
  protoOf(AbstractJsonTreeEncoder$inlineUnquotedLiteralEncoder$1).encodeString_424b5v_k$ = function (value) {
    return this.this$0__1.putElement_rnqfb1_k$(this.$tag_1, new JsonLiteral(value, false, this.$inlineDescriptor_1));
  };
  function AbstractJsonTreeEncoder$beginStructure$lambda(this$0) {
    return function (node) {
      this$0.putElement_rnqfb1_k$(this$0.get_currentTag_wui9re_k$(), node);
      return Unit_getInstance();
    };
  }
  function AbstractJsonTreeEncoder(json, nodeConsumer) {
    NamedValueEncoder.call(this);
    this.json_1 = json;
    this.nodeConsumer_1 = nodeConsumer;
    this.configuration_1 = this.json_1.get_configuration_uqypjh_k$();
    this.polymorphicDiscriminator_1 = null;
    this.polymorphicSerialName_1 = null;
  }
  protoOf(AbstractJsonTreeEncoder).get_json_woos35_k$ = function () {
    return this.json_1;
  };
  protoOf(AbstractJsonTreeEncoder).get_nodeConsumer_izjq1r_k$ = function () {
    return this.nodeConsumer_1;
  };
  protoOf(AbstractJsonTreeEncoder).get_serializersModule_piitvg_k$ = function () {
    return this.json_1.get_serializersModule_piitvg_k$();
  };
  protoOf(AbstractJsonTreeEncoder).get_configuration_uqypjh_k$ = function () {
    return this.configuration_1;
  };
  protoOf(AbstractJsonTreeEncoder).elementName_p66hrm_k$ = function (descriptor, index) {
    return getJsonElementName(descriptor, this.json_1, index);
  };
  protoOf(AbstractJsonTreeEncoder).encodeJsonElement_7ygdou_k$ = function (element) {
    var tmp;
    if (!(this.polymorphicDiscriminator_1 == null)) {
      tmp = !(element instanceof JsonObject);
    } else {
      tmp = false;
    }
    if (tmp) {
      throwJsonElementPolymorphicException(this.polymorphicSerialName_1, element);
    }
    this.encodeSerializableValue_3uuzip_k$(JsonElementSerializer_getInstance(), element);
  };
  protoOf(AbstractJsonTreeEncoder).shouldEncodeElementDefault_x8eyid_k$ = function (descriptor, index) {
    return this.configuration_1.get_encodeDefaults_m8plkf_k$();
  };
  protoOf(AbstractJsonTreeEncoder).composeName_8y2y4d_k$ = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeEncoder).encodeNotNullMark_415a1t_k$ = function () {
  };
  protoOf(AbstractJsonTreeEncoder).encodeNull_ejiosz_k$ = function () {
    var tmp0_elvis_lhs = this.get_currentTagOrNull_yhyzw_k$();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return this.nodeConsumer_1(JsonNull_getInstance());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var tag = tmp;
    this.encodeTaggedNull_qzw0n5_k$(tag);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedNull_qzw0n5_k$ = function (tag) {
    return this.putElement_rnqfb1_k$(tag, JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedNull_ef6rw0_k$ = function (tag) {
    return this.encodeTaggedNull_qzw0n5_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedInt_tkpbln_k$ = function (tag, value) {
    return this.putElement_rnqfb1_k$(tag, JsonPrimitive_0(value));
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedInt_sojdj8_k$ = function (tag, value) {
    return this.encodeTaggedInt_tkpbln_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedByte_5409y0_k$ = function (tag, value) {
    return this.putElement_rnqfb1_k$(tag, JsonPrimitive_0(value));
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedByte_zfi7rb_k$ = function (tag, value) {
    return this.encodeTaggedByte_5409y0_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedShort_wf2i94_k$ = function (tag, value) {
    return this.putElement_rnqfb1_k$(tag, JsonPrimitive_0(value));
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedShort_18vuif_k$ = function (tag, value) {
    return this.encodeTaggedShort_wf2i94_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedLong_2u4bxa_k$ = function (tag, value) {
    return this.putElement_rnqfb1_k$(tag, JsonPrimitive_0(value));
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedLong_3uykbb_k$ = function (tag, value) {
    return this.encodeTaggedLong_2u4bxa_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedFloat_4is9mw_k$ = function (tag, value) {
    this.putElement_rnqfb1_k$(tag, JsonPrimitive_0(value));
    if (!this.configuration_1.get_allowSpecialFloatingPointValues_1eu5hp_k$() && !isFinite(value)) {
      throw InvalidFloatingPointEncoded(value, tag);
    }
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedFloat_dhn4x5_k$ = function (tag, value) {
    return this.encodeTaggedFloat_4is9mw_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).encodeSerializableValue_3uuzip_k$ = function (serializer, value) {
    if (!(this.get_currentTagOrNull_yhyzw_k$() == null) || !get_requiresTopLevelTag(carrierDescriptor(serializer.get_descriptor_wjt6a0_k$(), this.get_serializersModule_piitvg_k$()))) {
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
        if (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_useArrayPolymorphism_teidaa_k$()) {
          serializer.serialize_5ase3y_k$(this, value);
          break $l$block;
        }
        var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
        var tmp;
        if (isPolymorphicSerializer) {
          tmp = !this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_classDiscriminatorMode_bmc7xs_k$().equals(ClassDiscriminatorMode_NONE_getInstance());
        } else {
          var tmp_0;
          switch (this.get_json_woos35_k$().get_configuration_uqypjh_k$().get_classDiscriminatorMode_bmc7xs_k$().get_ordinal_ip24qg_k$()) {
            case 0:
            case 2:
              tmp_0 = false;
              break;
            case 1:
              // Inline function 'kotlin.let' call

              var it = serializer.get_descriptor_wjt6a0_k$().get_kind_wop7ml_k$();
              tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
              break;
            default:
              noWhenBranchMatchedException();
              break;
          }
          tmp = tmp_0;
        }
        var needDiscriminator = tmp;
        var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.get_descriptor_wjt6a0_k$(), this.get_json_woos35_k$()) : null;
        var tmp_1;
        if (isPolymorphicSerializer) {
          var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
          $l$block_0: {
            // Inline function 'kotlin.requireNotNull' call
            if (value == null) {
              var message = 'Value for serializer ' + toString(serializer.get_descriptor_wjt6a0_k$()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
              throw IllegalArgumentException_init_$Create$(toString(message));
            } else {
              break $l$block_0;
            }
          }
          var actual = findPolymorphicSerializer_0(casted, this, value);
          tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
        } else {
          tmp_1 = serializer;
        }
        var actualSerializer = tmp_1;
        if (!(baseClassDiscriminator == null)) {
          access$checkEncodingConflicts$tPolymorphicKt(this.get_json_woos35_k$(), serializer, actualSerializer, baseClassDiscriminator);
          checkKind_0(actualSerializer.get_descriptor_wjt6a0_k$().get_kind_wop7ml_k$());
          var serialName = actualSerializer.get_descriptor_wjt6a0_k$().get_serialName_u2rqhk_k$();
          this.polymorphicDiscriminator_1 = baseClassDiscriminator;
          this.polymorphicSerialName_1 = serialName;
        }
        actualSerializer.serialize_5ase3y_k$(this, value);
      }
    } else {
      // Inline function 'kotlin.run' call
      (new JsonPrimitiveEncoder(this.json_1, this.nodeConsumer_1)).encodeSerializableValue_3uuzip_k$(serializer, value);
    }
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedDouble_wgtjw1_k$ = function (tag, value) {
    this.putElement_rnqfb1_k$(tag, JsonPrimitive_0(value));
    if (!this.configuration_1.get_allowSpecialFloatingPointValues_1eu5hp_k$() && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded(value, tag);
    }
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedDouble_wxqx2s_k$ = function (tag, value) {
    return this.encodeTaggedDouble_wgtjw1_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedBoolean_hv2cld_k$ = function (tag, value) {
    return this.putElement_rnqfb1_k$(tag, JsonPrimitive_1(value));
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedBoolean_96ly0o_k$ = function (tag, value) {
    return this.encodeTaggedBoolean_hv2cld_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedChar_hlt81x_k$ = function (tag, value) {
    return this.putElement_rnqfb1_k$(tag, JsonPrimitive_2(toString_1(value)));
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedChar_33dc1e_k$ = function (tag, value) {
    return this.encodeTaggedChar_hlt81x_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedString_wkr2bh_k$ = function (tag, value) {
    return this.putElement_rnqfb1_k$(tag, JsonPrimitive_2(value));
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedString_w0iev4_k$ = function (tag, value) {
    return this.encodeTaggedString_wkr2bh_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedEnum_56ln9q_k$ = function (tag, enumDescriptor, ordinal) {
    return this.putElement_rnqfb1_k$(tag, JsonPrimitive_2(enumDescriptor.getElementName_u4sqmf_k$(ordinal)));
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedEnum_vfihkh_k$ = function (tag, enumDescriptor, ordinal) {
    return this.encodeTaggedEnum_56ln9q_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor, ordinal);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedValue_sfcjfh_k$ = function (tag, value) {
    this.putElement_rnqfb1_k$(tag, JsonPrimitive_2(toString(value)));
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedValue_uwjsrc_k$ = function (tag, value) {
    return this.encodeTaggedValue_sfcjfh_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), value);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedInline_idwvcu_k$ = function (tag, inlineDescriptor) {
    return get_isUnsignedNumber(inlineDescriptor) ? inlineUnsignedNumberEncoder(this, tag) : get_isUnquotedLiteral(inlineDescriptor) ? inlineUnquotedLiteralEncoder(this, tag, inlineDescriptor) : protoOf(NamedValueEncoder).encodeTaggedInline_k3uebz_k$.call(this, tag, inlineDescriptor);
  };
  protoOf(AbstractJsonTreeEncoder).encodeTaggedInline_k3uebz_k$ = function (tag, inlineDescriptor) {
    return this.encodeTaggedInline_idwvcu_k$((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeEncoder).encodeInline_wxp5pu_k$ = function (descriptor) {
    var tmp;
    if (!(this.get_currentTagOrNull_yhyzw_k$() == null)) {
      if (!(this.polymorphicDiscriminator_1 == null))
        this.polymorphicSerialName_1 = descriptor.get_serialName_u2rqhk_k$();
      tmp = protoOf(NamedValueEncoder).encodeInline_wxp5pu_k$.call(this, descriptor);
    } else {
      tmp = (new JsonPrimitiveEncoder(this.json_1, this.nodeConsumer_1)).encodeInline_wxp5pu_k$(descriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeEncoder).beginStructure_yljocp_k$ = function (descriptor) {
    var tmp;
    if (this.get_currentTagOrNull_yhyzw_k$() == null) {
      tmp = this.nodeConsumer_1;
    } else {
      tmp = AbstractJsonTreeEncoder$beginStructure$lambda(this);
    }
    var consumer = tmp;
    var tmp0_subject = descriptor.get_kind_wop7ml_k$();
    var tmp_0;
    var tmp_1;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_1) {
      tmp_0 = new JsonTreeListEncoder(this.json_1, consumer);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.json_1;
        var keyDescriptor = carrierDescriptor(descriptor.getElementDescriptor_ncda77_k$(0), this_0.get_serializersModule_piitvg_k$());
        var keyKind = keyDescriptor.get_kind_wop7ml_k$();
        var tmp_2;
        var tmp_3;
        if (keyKind instanceof PrimitiveKind) {
          tmp_3 = true;
        } else {
          tmp_3 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_3) {
          tmp_2 = new JsonTreeMapEncoder(this.json_1, consumer);
        } else {
          if (this_0.get_configuration_uqypjh_k$().get_allowStructuredMapKeys_fk21t_k$()) {
            tmp_2 = new JsonTreeListEncoder(this.json_1, consumer);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp_0 = tmp_2;
      } else {
        tmp_0 = new JsonTreeEncoder(this.json_1, consumer);
      }
    }
    var encoder = tmp_0;
    var discriminator = this.polymorphicDiscriminator_1;
    if (!(discriminator == null)) {
      if (encoder instanceof JsonTreeMapEncoder) {
        encoder.putElement_rnqfb1_k$('key', JsonPrimitive_2(discriminator));
        var tmp1_elvis_lhs = this.polymorphicSerialName_1;
        encoder.putElement_rnqfb1_k$('value', JsonPrimitive_2(tmp1_elvis_lhs == null ? descriptor.get_serialName_u2rqhk_k$() : tmp1_elvis_lhs));
      } else {
        var tmp2_elvis_lhs = this.polymorphicSerialName_1;
        encoder.putElement_rnqfb1_k$(discriminator, JsonPrimitive_2(tmp2_elvis_lhs == null ? descriptor.get_serialName_u2rqhk_k$() : tmp2_elvis_lhs));
      }
      this.polymorphicDiscriminator_1 = null;
      this.polymorphicSerialName_1 = null;
    }
    return encoder;
  };
  protoOf(AbstractJsonTreeEncoder).endEncode_mdsrgg_k$ = function (descriptor) {
    this.nodeConsumer_1(this.getCurrent_z8uawt_k$());
  };
  function get_requiresTopLevelTag(_this__u8e3s4) {
    var tmp;
    var tmp_0 = _this__u8e3s4.get_kind_wop7ml_k$();
    if (tmp_0 instanceof PrimitiveKind) {
      tmp = true;
    } else {
      tmp = _this__u8e3s4.get_kind_wop7ml_k$() === ENUM_getInstance();
    }
    return tmp;
  }
  function _set_content__jmvnbo($this, _set____db54di) {
    $this.content_1 = _set____db54di;
  }
  function _get_content__ps04ag_1($this) {
    return $this.content_1;
  }
  function JsonPrimitiveEncoder(json, nodeConsumer) {
    AbstractJsonTreeEncoder.call(this, json, nodeConsumer);
    this.content_1 = null;
    this.pushTag_bibnaf_k$('primitive');
  }
  protoOf(JsonPrimitiveEncoder).putElement_rnqfb1_k$ = function (key, element) {
    // Inline function 'kotlin.require' call
    if (!(key === 'primitive')) {
      var message = "This output can only consume primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.content_1 == null)) {
      var message_0 = 'Primitive element was already recorded. Does call to .encodeXxx happen more than once?';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    this.content_1 = element;
    this.nodeConsumer_1(element);
  };
  protoOf(JsonPrimitiveEncoder).getCurrent_z8uawt_k$ = function () {
    var tmp0 = this.content_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Primitive element has not been recorded. Is call to .encodeXxx is missing in serializer?';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$0 = tmp0;
        break $l$block;
      }
    }
    return tmp$ret$0;
  };
  function _get_array__jslnqg($this) {
    return $this.array_1;
  }
  function JsonTreeListEncoder(json, nodeConsumer) {
    AbstractJsonTreeEncoder.call(this, json, nodeConsumer);
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.array_1 = ArrayList_init_$Create$();
  }
  protoOf(JsonTreeListEncoder).elementName_p66hrm_k$ = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListEncoder).putElement_rnqfb1_k$ = function (key, element) {
    var idx = toInt(key);
    this.array_1.add_dl6gt3_k$(idx, element);
  };
  protoOf(JsonTreeListEncoder).getCurrent_z8uawt_k$ = function () {
    return new JsonArray(this.array_1);
  };
  function _set_tag__4wejl7($this, _set____db54di) {
    $this.tag_1 = _set____db54di;
  }
  function _get_tag__e6h4qf($this) {
    var tmp = $this.tag_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('tag');
    }
  }
  function _set_isKey__g0qqz4($this, _set____db54di) {
    $this.isKey_1 = _set____db54di;
  }
  function _get_isKey__g0dpic($this) {
    return $this.isKey_1;
  }
  function JsonTreeMapEncoder(json, nodeConsumer) {
    JsonTreeEncoder.call(this, json, nodeConsumer);
    this.isKey_1 = true;
  }
  protoOf(JsonTreeMapEncoder).putElement_rnqfb1_k$ = function (key, element) {
    if (this.isKey_1) {
      var tmp = this;
      var tmp_0;
      if (element instanceof JsonPrimitive) {
        tmp_0 = element.get_content_h02jrk_k$();
      } else {
        if (element instanceof JsonObject) {
          throw InvalidKeyKindException(JsonObjectSerializer_getInstance().get_descriptor_wjt6a0_k$());
        } else {
          if (element instanceof JsonArray) {
            throw InvalidKeyKindException(JsonArraySerializer_getInstance().get_descriptor_wjt6a0_k$());
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
      tmp.tag_1 = tmp_0;
      this.isKey_1 = false;
    } else {
      var tmp0 = this.content_1;
      // Inline function 'kotlin.collections.set' call
      var key_0 = _get_tag__e6h4qf(this);
      tmp0.put_4fpzoq_k$(key_0, element);
      this.isKey_1 = true;
    }
  };
  protoOf(JsonTreeMapEncoder).getCurrent_z8uawt_k$ = function () {
    return new JsonObject(this.content_1);
  };
  function writeJson$lambda($result) {
    return function (it) {
      $result._v = it;
      return Unit_getInstance();
    };
  }
  var WriteMode_OBJ_instance;
  var WriteMode_LIST_instance;
  var WriteMode_MAP_instance;
  var WriteMode_POLY_OBJ_instance;
  function values_0() {
    return [WriteMode_OBJ_getInstance(), WriteMode_LIST_getInstance(), WriteMode_MAP_getInstance(), WriteMode_POLY_OBJ_getInstance()];
  }
  function valueOf_0(value) {
    switch (value) {
      case 'OBJ':
        return WriteMode_OBJ_getInstance();
      case 'LIST':
        return WriteMode_LIST_getInstance();
      case 'MAP':
        return WriteMode_MAP_getInstance();
      case 'POLY_OBJ':
        return WriteMode_POLY_OBJ_getInstance();
      default:
        WriteMode_initEntries();
        THROW_IAE('No enum constant kotlinx.serialization.json.internal.WriteMode.' + value);
        break;
    }
  }
  function get_entries_0() {
    if ($ENTRIES_0 == null)
      $ENTRIES_0 = enumEntries(values_0());
    return $ENTRIES_0;
  }
  var WriteMode_entriesInitialized;
  function WriteMode_initEntries() {
    if (WriteMode_entriesInitialized)
      return Unit_getInstance();
    WriteMode_entriesInitialized = true;
    WriteMode_OBJ_instance = new WriteMode('OBJ', 0, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
    WriteMode_LIST_instance = new WriteMode('LIST', 1, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
    WriteMode_MAP_instance = new WriteMode('MAP', 2, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
    WriteMode_POLY_OBJ_instance = new WriteMode('POLY_OBJ', 3, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
  }
  var $ENTRIES_0;
  function WriteMode(name, ordinal, begin, end) {
    Enum.call(this, name, ordinal);
    this.begin_1 = begin;
    this.end_1 = end;
  }
  protoOf(WriteMode).get_begin_14uf0e_k$ = function () {
    return this.begin_1;
  };
  protoOf(WriteMode).get_end_l6d8j8_k$ = function () {
    return this.end_1;
  };
  function switchMode(_this__u8e3s4, desc) {
    var tmp0_subject = desc.get_kind_wop7ml_k$();
    var tmp;
    if (tmp0_subject instanceof PolymorphicKind) {
      tmp = WriteMode_POLY_OBJ_getInstance();
    } else {
      if (equals(tmp0_subject, LIST_getInstance())) {
        tmp = WriteMode_LIST_getInstance();
      } else {
        if (equals(tmp0_subject, MAP_getInstance())) {
          // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
          var keyDescriptor = carrierDescriptor(desc.getElementDescriptor_ncda77_k$(0), _this__u8e3s4.get_serializersModule_piitvg_k$());
          var keyKind = keyDescriptor.get_kind_wop7ml_k$();
          var tmp_0;
          var tmp_1;
          if (keyKind instanceof PrimitiveKind) {
            tmp_1 = true;
          } else {
            tmp_1 = equals(keyKind, ENUM_getInstance());
          }
          if (tmp_1) {
            tmp_0 = WriteMode_MAP_getInstance();
          } else {
            if (_this__u8e3s4.get_configuration_uqypjh_k$().get_allowStructuredMapKeys_fk21t_k$()) {
              tmp_0 = WriteMode_LIST_getInstance();
            } else {
              throw InvalidKeyKindException(keyDescriptor);
            }
          }
          tmp = tmp_0;
        } else {
          tmp = WriteMode_OBJ_getInstance();
        }
      }
    }
    return tmp;
  }
  function selectMapMode(_this__u8e3s4, mapDescriptor, ifMap, ifList) {
    var keyDescriptor = carrierDescriptor(mapDescriptor.getElementDescriptor_ncda77_k$(0), _this__u8e3s4.get_serializersModule_piitvg_k$());
    var keyKind = keyDescriptor.get_kind_wop7ml_k$();
    var tmp;
    var tmp_0;
    if (keyKind instanceof PrimitiveKind) {
      tmp_0 = true;
    } else {
      tmp_0 = equals(keyKind, ENUM_getInstance());
    }
    if (tmp_0) {
      tmp = ifMap();
    } else {
      if (_this__u8e3s4.get_configuration_uqypjh_k$().get_allowStructuredMapKeys_fk21t_k$()) {
        tmp = ifList();
      } else {
        throw InvalidKeyKindException(keyDescriptor);
      }
    }
    return tmp;
  }
  function carrierDescriptor(_this__u8e3s4, module_0) {
    var tmp;
    if (equals(_this__u8e3s4.get_kind_wop7ml_k$(), CONTEXTUAL_getInstance())) {
      var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
      tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
    } else if (_this__u8e3s4.get_isInline_usk17w_k$()) {
      tmp = carrierDescriptor(_this__u8e3s4.getElementDescriptor_ncda77_k$(0), module_0);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function WriteMode_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_OBJ_instance;
  }
  function WriteMode_LIST_getInstance() {
    WriteMode_initEntries();
    return WriteMode_LIST_instance;
  }
  function WriteMode_MAP_getInstance() {
    WriteMode_initEntries();
    return WriteMode_MAP_instance;
  }
  function WriteMode_POLY_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_POLY_OBJ_instance;
  }
  function _set_peekedString__1ptzck($this, _set____db54di) {
    $this.peekedString_1 = _set____db54di;
  }
  function _get_peekedString__dtwr7k($this) {
    return $this.peekedString_1;
  }
  function insideString($this, isLenient, char) {
    var tmp;
    if (isLenient) {
      tmp = charToTokenClass(char) === 0;
    } else {
      tmp = !(char === _Char___init__impl__6a9atx(34));
    }
    return tmp;
  }
  function writeRange($this, fromIndex, toIndex, currentChunkHasEscape, consumeChunk) {
    if (currentChunkHasEscape) {
      consumeChunk(decodedString($this, fromIndex, toIndex));
    } else {
      consumeChunk($this.substring_d7lab3_k$(fromIndex, toIndex));
    }
  }
  function appendEscape($this, lastPosition, current) {
    $this.appendRange_e8o1xp_k$(lastPosition, current);
    return appendEsc($this, current + 1 | 0);
  }
  function decodedString($this, lastPosition, currentPosition) {
    $this.appendRange_e8o1xp_k$(lastPosition, currentPosition);
    var result = $this.escapedString_1.toString();
    $this.escapedString_1.setLength_oy0ork_k$(0);
    return result;
  }
  function takePeeked($this) {
    // Inline function 'kotlin.also' call
    var this_0 = ensureNotNull($this.peekedString_1);
    $this.peekedString_1 = null;
    return this_0;
  }
  function wasUnquotedString($this) {
    return !(charSequenceGet($this.get_source_jl0x7o_k$(), $this.currentPosition_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
  }
  function appendEsc($this, startPosition) {
    var currentPosition = startPosition;
    currentPosition = $this.prefetchOrEof_k52kdy_k$(currentPosition);
    if (currentPosition === -1) {
      $this.fail$default_ly4hfp_k$('Expected escape sequence to continue, got EOF');
    }
    var tmp = $this.get_source_jl0x7o_k$();
    var _unary__edvuaz = currentPosition;
    currentPosition = _unary__edvuaz + 1 | 0;
    var currentChar = charSequenceGet(tmp, _unary__edvuaz);
    if (currentChar === _Char___init__impl__6a9atx(117)) {
      return appendHex($this, $this.get_source_jl0x7o_k$(), currentPosition);
    }
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
    var c = escapeToChar(tmp$ret$0);
    if (c === _Char___init__impl__6a9atx(0)) {
      $this.fail$default_ly4hfp_k$("Invalid escaped char '" + toString_1(currentChar) + "'");
    }
    $this.escapedString_1.append_am5a4z_k$(c);
    return currentPosition;
  }
  function appendHex($this, source, startPos) {
    if ((startPos + 4 | 0) >= charSequenceLength(source)) {
      $this.currentPosition_1 = startPos;
      $this.ensureHaveChars_2p1sdj_k$();
      if (($this.currentPosition_1 + 4 | 0) >= charSequenceLength(source)) {
        $this.fail$default_ly4hfp_k$('Unexpected EOF during unicode escape');
      }
      return appendHex($this, source, $this.currentPosition_1);
    }
    $this.escapedString_1.append_am5a4z_k$(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
    return startPos + 4 | 0;
  }
  function fromHexChar($this, source, currentPosition) {
    var character = charSequenceGet(source, currentPosition);
    var tmp;
    if (_Char___init__impl__6a9atx(48) <= character ? character <= _Char___init__impl__6a9atx(57) : false) {
      // Inline function 'kotlin.code' call
      var tmp_0 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      tmp = tmp_0 - Char__toInt_impl_vasixd(this_0) | 0;
    } else if (_Char___init__impl__6a9atx(97) <= character ? character <= _Char___init__impl__6a9atx(102) : false) {
      // Inline function 'kotlin.code' call
      var tmp_1 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      tmp = (tmp_1 - Char__toInt_impl_vasixd(this_1) | 0) + 10 | 0;
    } else if (_Char___init__impl__6a9atx(65) <= character ? character <= _Char___init__impl__6a9atx(70) : false) {
      // Inline function 'kotlin.code' call
      var tmp_2 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(65);
      tmp = (tmp_2 - Char__toInt_impl_vasixd(this_2) | 0) + 10 | 0;
    } else {
      $this.fail$default_ly4hfp_k$("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
    }
    return tmp;
  }
  function consumeBoolean2($this, start) {
    var current = $this.prefetchOrEof_k52kdy_k$(start);
    if (current >= charSequenceLength($this.get_source_jl0x7o_k$()) || current === -1) {
      $this.fail$default_ly4hfp_k$('EOF');
    }
    var tmp = $this.get_source_jl0x7o_k$();
    var _unary__edvuaz = current;
    current = _unary__edvuaz + 1 | 0;
    // Inline function 'kotlin.code' call
    var this_0 = charSequenceGet(tmp, _unary__edvuaz);
    var tmp0_subject = Char__toInt_impl_vasixd(this_0) | 32;
    var tmp_0;
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(116);
    if (tmp0_subject === Char__toInt_impl_vasixd(this_1)) {
      consumeBooleanLiteral($this, 'rue', current);
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(102);
      if (tmp0_subject === Char__toInt_impl_vasixd(this_2)) {
        consumeBooleanLiteral($this, 'alse', current);
        tmp_0 = false;
      } else {
        $this.fail$default_ly4hfp_k$("Expected valid boolean literal prefix, but had '" + $this.consumeStringLenient_9oypvu_k$() + "'");
      }
    }
    return tmp_0;
  }
  function consumeBooleanLiteral($this, literalSuffix, current) {
    if ((charSequenceLength($this.get_source_jl0x7o_k$()) - current | 0) < literalSuffix.length) {
      $this.fail$default_ly4hfp_k$('Unexpected end of boolean literal');
    }
    var inductionVariable = 0;
    var last = charSequenceLength(literalSuffix) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var expected = charCodeAt(literalSuffix, i);
        var actual = charSequenceGet($this.get_source_jl0x7o_k$(), current + i | 0);
        // Inline function 'kotlin.code' call
        var tmp = Char__toInt_impl_vasixd(expected);
        // Inline function 'kotlin.code' call
        if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
          $this.fail$default_ly4hfp_k$("Expected valid boolean literal prefix, but had '" + $this.consumeStringLenient_9oypvu_k$() + "'");
        }
      }
       while (inductionVariable <= last);
    $this.currentPosition_1 = current + literalSuffix.length | 0;
  }
  function withPositionRollback($this, action) {
    var snapshot = $this.currentPosition_1;
    try {
      return action();
    }finally {
      $this.currentPosition_1 = snapshot;
    }
  }
  function AbstractJsonLexer$fail$lambda(expected, source) {
    return 'Expected ' + expected + ", but had '" + source + "' instead";
  }
  function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
    var tmp;
    switch (isExponentPositive) {
      case false:
        // Inline function 'kotlin.math.pow' call

        var x = -toNumber(exponentAccumulator);
        tmp = Math.pow(10.0, x);
        break;
      case true:
        // Inline function 'kotlin.math.pow' call

        var x_0 = toNumber(exponentAccumulator);
        tmp = Math.pow(10.0, x_0);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function AbstractJsonLexer(configuration) {
    this.configuration_1 = configuration;
    this.currentPosition_1 = 0;
    this.path_1 = new JsonPath(this.configuration_1);
    this.peekedString_1 = null;
    this.escapedString_1 = StringBuilder_init_$Create$();
  }
  protoOf(AbstractJsonLexer).get_configuration_m9t6me_k$ = function () {
    return this.configuration_1;
  };
  protoOf(AbstractJsonLexer).set_currentPosition_2hvbai_k$ = function (_set____db54di) {
    this.currentPosition_1 = _set____db54di;
  };
  protoOf(AbstractJsonLexer).get_currentPosition_5vz2du_k$ = function () {
    return this.currentPosition_1;
  };
  protoOf(AbstractJsonLexer).get_path_wos8ry_k$ = function () {
    return this.path_1;
  };
  protoOf(AbstractJsonLexer).isWs_hgzyyh_k$ = function (_this__u8e3s4) {
    return _this__u8e3s4 === _Char___init__impl__6a9atx(32) || _this__u8e3s4 === _Char___init__impl__6a9atx(10) || _this__u8e3s4 === _Char___init__impl__6a9atx(13) || _this__u8e3s4 === _Char___init__impl__6a9atx(9);
  };
  protoOf(AbstractJsonLexer).ensureHaveChars_2p1sdj_k$ = function () {
  };
  protoOf(AbstractJsonLexer).isNotEof_61q0b1_k$ = function () {
    return !(this.peekNextToken_1gqwr9_k$() === 10);
  };
  protoOf(AbstractJsonLexer).tryConsumeComma_9n2ve4_k$ = function () {
    var current = this.skipWhitespaces_ox013r_k$();
    var source = this.get_source_jl0x7o_k$();
    if (current >= charSequenceLength(source) || current === -1)
      return false;
    if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
      this.currentPosition_1 = this.currentPosition_1 + 1 | 0;
      return true;
    }
    return false;
  };
  protoOf(AbstractJsonLexer).isValidValueStart_7hrcay_k$ = function (c) {
    return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
  };
  protoOf(AbstractJsonLexer).expectEof_2xwqoj_k$ = function () {
    var nextToken = this.consumeNextToken_uf1vsa_k$();
    if (!(nextToken === 10)) {
      this.fail$default_ly4hfp_k$('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.get_source_jl0x7o_k$(), this.currentPosition_1 - 1 | 0)) + ' instead');
    }
  };
  protoOf(AbstractJsonLexer).set_escapedString_igklqn_k$ = function (_set____db54di) {
    this.escapedString_1 = _set____db54di;
  };
  protoOf(AbstractJsonLexer).get_escapedString_g03bxx_k$ = function () {
    return this.escapedString_1;
  };
  protoOf(AbstractJsonLexer).consumeNextToken_dugwfi_k$ = function (expected) {
    var token = this.consumeNextToken_uf1vsa_k$();
    if (!(token === expected)) {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
      var expected_0 = tokenDescription(expected);
      var position = true && this.currentPosition_1 > 0 ? this.currentPosition_1 - 1 | 0 : this.currentPosition_1;
      var s = this.currentPosition_1 === charSequenceLength(this.get_source_jl0x7o_k$()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.get_source_jl0x7o_k$(), position));
      var tmp$ret$1 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
      this.fail$default_ly4hfp_k$(tmp$ret$1, position);
    }
    return token;
  };
  protoOf(AbstractJsonLexer).unexpectedToken_ad91it_k$ = function (expected) {
    if (this.currentPosition_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
      var tmp$ret$0;
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
        var snapshot = this.currentPosition_1;
        try {
          this.currentPosition_1 = this.currentPosition_1 - 1 | 0;
          tmp$ret$0 = this.consumeStringLenient_9oypvu_k$();
          break $l$block;
        }finally {
          this.currentPosition_1 = snapshot;
        }
      }
      var inputLiteral = tmp$ret$0;
      if (inputLiteral === 'null') {
        this.fail_5m5zd7_k$("Expected string literal but 'null' literal was found", this.currentPosition_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
      }
    }
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expectedToken = charToTokenClass(expected);
    var expected_0 = tokenDescription(expectedToken);
    var position = true && this.currentPosition_1 > 0 ? this.currentPosition_1 - 1 | 0 : this.currentPosition_1;
    var s = this.currentPosition_1 === charSequenceLength(this.get_source_jl0x7o_k$()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.get_source_jl0x7o_k$(), position));
    var tmp$ret$3 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
    this.fail$default_ly4hfp_k$(tmp$ret$3, position);
  };
  protoOf(AbstractJsonLexer).fail_xphoty_k$ = function (expectedToken, wasConsumed, message) {
    var expected = tokenDescription(expectedToken);
    var position = wasConsumed && this.currentPosition_1 > 0 ? this.currentPosition_1 - 1 | 0 : this.currentPosition_1;
    var s = this.currentPosition_1 === charSequenceLength(this.get_source_jl0x7o_k$()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.get_source_jl0x7o_k$(), position));
    this.fail$default_ly4hfp_k$(message(expected, s), position);
  };
  protoOf(AbstractJsonLexer).peekNextToken_1gqwr9_k$ = function () {
    var source = this.get_source_jl0x7o_k$();
    var cpos = this.currentPosition_1;
    $l$loop_0: while (true) {
      cpos = this.prefetchOrEof_k52kdy_k$(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var ch = charSequenceGet(source, cpos);
      if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
        cpos = cpos + 1 | 0;
        continue $l$loop_0;
      }
      this.currentPosition_1 = cpos;
      return charToTokenClass(ch);
    }
    this.currentPosition_1 = cpos;
    return 10;
  };
  protoOf(AbstractJsonLexer).tryConsumeNull_2shltp_k$ = function (doConsume) {
    var current = this.skipWhitespaces_ox013r_k$();
    current = this.prefetchOrEof_k52kdy_k$(current);
    var len = charSequenceLength(this.get_source_jl0x7o_k$()) - current | 0;
    if (len < 4 || current === -1)
      return false;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charCodeAt('null', i) === charSequenceGet(this.get_source_jl0x7o_k$(), current + i | 0)))
          return false;
      }
       while (inductionVariable <= 3);
    if (len > 4 && charToTokenClass(charSequenceGet(this.get_source_jl0x7o_k$(), current + 4 | 0)) === 0)
      return false;
    if (doConsume) {
      this.currentPosition_1 = current + 4 | 0;
    }
    return true;
  };
  protoOf(AbstractJsonLexer).tryConsumeNull$default_t5tauc_k$ = function (doConsume, $super) {
    doConsume = doConsume === VOID ? true : doConsume;
    return $super === VOID ? this.tryConsumeNull_2shltp_k$(doConsume) : $super.tryConsumeNull_2shltp_k$.call(this, doConsume);
  };
  protoOf(AbstractJsonLexer).peekString_d4c947_k$ = function (isLenient) {
    var token = this.peekNextToken_1gqwr9_k$();
    var tmp;
    if (isLenient) {
      if (!(token === 1) && !(token === 0))
        return null;
      tmp = this.consumeStringLenient_9oypvu_k$();
    } else {
      if (!(token === 1))
        return null;
      tmp = this.consumeString_j3j2z7_k$();
    }
    var string = tmp;
    this.peekedString_1 = string;
    return string;
  };
  protoOf(AbstractJsonLexer).discardPeeked_n23g48_k$ = function () {
    this.peekedString_1 = null;
  };
  protoOf(AbstractJsonLexer).indexOf_e6udas_k$ = function (char, startPos) {
    return indexOf(this.get_source_jl0x7o_k$(), char, startPos);
  };
  protoOf(AbstractJsonLexer).substring_d7lab3_k$ = function (startPos, endPos) {
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.get_source_jl0x7o_k$();
    return toString(charSequenceSubSequence(this_0, startPos, endPos));
  };
  protoOf(AbstractJsonLexer).consumeStringChunked_ewhgsb_k$ = function (isLenient, consumeChunk) {
    var nextToken = this.peekNextToken_1gqwr9_k$();
    if (isLenient && !(nextToken === 0))
      return Unit_getInstance();
    if (!isLenient) {
      this.consumeNextToken_o6jhkj_k$(_Char___init__impl__6a9atx(34));
    }
    var currentPosition = this.currentPosition_1;
    var lastPosition = currentPosition;
    var char = charSequenceGet(this.get_source_jl0x7o_k$(), currentPosition);
    var usedAppend = false;
    while (insideString(this, isLenient, char)) {
      if (!isLenient && char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.prefetchOrEof_k52kdy_k$(appendEscape(this, lastPosition, currentPosition));
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
      }
      if (currentPosition >= charSequenceLength(this.get_source_jl0x7o_k$())) {
        writeRange(this, lastPosition, currentPosition, usedAppend, consumeChunk);
        usedAppend = false;
        currentPosition = this.prefetchOrEof_k52kdy_k$(currentPosition);
        if (currentPosition === -1) {
          this.fail$default_ly4hfp_k$('EOF', currentPosition);
        }
        lastPosition = currentPosition;
      }
      char = charSequenceGet(this.get_source_jl0x7o_k$(), currentPosition);
    }
    writeRange(this, lastPosition, currentPosition, usedAppend, consumeChunk);
    this.currentPosition_1 = currentPosition;
    if (!isLenient) {
      this.consumeNextToken_o6jhkj_k$(_Char___init__impl__6a9atx(34));
    }
  };
  protoOf(AbstractJsonLexer).consumeString_j3j2z7_k$ = function () {
    if (!(this.peekedString_1 == null)) {
      return takePeeked(this);
    }
    return this.consumeKeyString_mfa3ws_k$();
  };
  protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
    var currentPosition = current;
    var lastPosition = startPosition;
    var char = charSequenceGet(source, currentPosition);
    var usedAppend = false;
    while (!(char === _Char___init__impl__6a9atx(34))) {
      if (char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.prefetchOrEof_k52kdy_k$(appendEscape(this, lastPosition, currentPosition));
        if (currentPosition === -1) {
          this.fail$default_ly4hfp_k$('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
        if (currentPosition >= charSequenceLength(source)) {
          usedAppend = true;
          this.appendRange_e8o1xp_k$(lastPosition, currentPosition);
          currentPosition = this.prefetchOrEof_k52kdy_k$(currentPosition);
          if (currentPosition === -1) {
            this.fail$default_ly4hfp_k$('Unexpected EOF', currentPosition);
          }
          lastPosition = currentPosition;
        }
      }
      char = charSequenceGet(source, currentPosition);
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.substring_d7lab3_k$(lastPosition, currentPosition);
    } else {
      tmp = decodedString(this, lastPosition, currentPosition);
    }
    var string = tmp;
    this.currentPosition_1 = currentPosition + 1 | 0;
    return string;
  };
  protoOf(AbstractJsonLexer).consumeStringLenientNotNull_m2rgts_k$ = function () {
    var result = this.consumeStringLenient_9oypvu_k$();
    if (result === 'null' && wasUnquotedString(this)) {
      this.fail$default_ly4hfp_k$("Unexpected 'null' value instead of string literal");
    }
    return result;
  };
  protoOf(AbstractJsonLexer).consumeStringLenient_9oypvu_k$ = function () {
    if (!(this.peekedString_1 == null)) {
      return takePeeked(this);
    }
    var current = this.skipWhitespaces_ox013r_k$();
    if (current >= charSequenceLength(this.get_source_jl0x7o_k$()) || current === -1) {
      this.fail$default_ly4hfp_k$('EOF', current);
    }
    var token = charToTokenClass(charSequenceGet(this.get_source_jl0x7o_k$(), current));
    if (token === 1) {
      return this.consumeString_j3j2z7_k$();
    }
    if (!(token === 0)) {
      this.fail$default_ly4hfp_k$('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.get_source_jl0x7o_k$(), current)));
    }
    var usedAppend = false;
    while (charToTokenClass(charSequenceGet(this.get_source_jl0x7o_k$(), current)) === 0) {
      current = current + 1 | 0;
      if (current >= charSequenceLength(this.get_source_jl0x7o_k$())) {
        usedAppend = true;
        this.appendRange_e8o1xp_k$(this.currentPosition_1, current);
        var eof = this.prefetchOrEof_k52kdy_k$(current);
        if (eof === -1) {
          this.currentPosition_1 = current;
          return decodedString(this, 0, 0);
        } else {
          current = eof;
        }
      }
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.substring_d7lab3_k$(this.currentPosition_1, current);
    } else {
      tmp = decodedString(this, this.currentPosition_1, current);
    }
    var result = tmp;
    this.currentPosition_1 = current;
    return result;
  };
  protoOf(AbstractJsonLexer).appendRange_e8o1xp_k$ = function (fromIndex, toIndex) {
    this.escapedString_1.append_xdc1zw_k$(this.get_source_jl0x7o_k$(), fromIndex, toIndex);
  };
  protoOf(AbstractJsonLexer).require_j8jzl9_k$ = function (condition, position, message) {
    if (!condition) {
      this.fail$default_ly4hfp_k$(message(), position);
    }
  };
  protoOf(AbstractJsonLexer).skipElement_eq7t4_k$ = function (allowLenientStrings) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var tokenStack = ArrayList_init_$Create$();
    var lastToken = this.peekNextToken_1gqwr9_k$();
    if (!(lastToken === 8) && !(lastToken === 6)) {
      this.consumeStringLenient_9oypvu_k$();
      return Unit_getInstance();
    }
    $l$loop: while (true) {
      lastToken = this.peekNextToken_1gqwr9_k$();
      if (lastToken === 1) {
        if (allowLenientStrings)
          this.consumeStringLenient_9oypvu_k$();
        else
          this.consumeKeyString_mfa3ws_k$();
        continue $l$loop;
      }
      var tmp0_subject = lastToken;
      if (tmp0_subject === 8 || tmp0_subject === 6) {
        tokenStack.add_utx5q5_k$(lastToken);
      } else if (tmp0_subject === 9) {
        if (!(last_0(tokenStack) === 8)) {
          this.fail$default_ly4hfp_k$('found ] instead of }');
        }
        removeLast(tokenStack);
      } else if (tmp0_subject === 7) {
        if (!(last_0(tokenStack) === 6)) {
          this.fail$default_ly4hfp_k$('found } instead of ]');
        }
        removeLast(tokenStack);
      } else if (tmp0_subject === 10) {
        this.fail$default_ly4hfp_k$('Unexpected end of input due to malformed JSON during ignoring unknown keys');
      }
      this.consumeNextToken_uf1vsa_k$();
      if (tokenStack.get_size_woubt6_k$() === 0)
        return Unit_getInstance();
    }
  };
  protoOf(AbstractJsonLexer).toString = function () {
    return "JsonReader(source='" + toString(this.get_source_jl0x7o_k$()) + "', currentPosition=" + this.currentPosition_1 + ')';
  };
  protoOf(AbstractJsonLexer).failOnUnknownKey_g0pqrs_k$ = function (key) {
    var processed = this.substring_d7lab3_k$(0, this.currentPosition_1);
    var lastIndexOf_0 = lastIndexOf(processed, key);
    this.fail_5m5zd7_k$("Encountered an unknown key '" + key + "'", lastIndexOf_0, "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.");
  };
  protoOf(AbstractJsonLexer).fail_5m5zd7_k$ = function (message, position, hint) {
    throw decodingExceptionOf_1(this, message, position, this.path_1.getPath_18su3p_k$(), hint, this.get_source_jl0x7o_k$());
  };
  protoOf(AbstractJsonLexer).fail$default_ly4hfp_k$ = function (message, position, hint, $super) {
    position = position === VOID ? this.currentPosition_1 : position;
    hint = hint === VOID ? null : hint;
    return $super === VOID ? this.fail_5m5zd7_k$(message, position, hint) : $super.fail_5m5zd7_k$.call(this, message, position, hint);
  };
  protoOf(AbstractJsonLexer).consumeNumericLiteral_rdea66_k$ = function () {
    var current = this.skipWhitespaces_ox013r_k$();
    current = this.prefetchOrEof_k52kdy_k$(current);
    if (current >= charSequenceLength(this.get_source_jl0x7o_k$()) || current === -1) {
      this.fail$default_ly4hfp_k$('EOF');
    }
    var tmp;
    if (charSequenceGet(this.get_source_jl0x7o_k$(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      if (current === charSequenceLength(this.get_source_jl0x7o_k$())) {
        this.fail$default_ly4hfp_k$('EOF');
      }
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var accumulator = new Long(0, 0);
    var exponentAccumulator = new Long(0, 0);
    var isNegative = false;
    var isExponentPositive = false;
    var hasExponent = false;
    var start = current;
    $l$loop_4: while (!(current === charSequenceLength(this.get_source_jl0x7o_k$()))) {
      var ch = charSequenceGet(this.get_source_jl0x7o_k$(), current);
      if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
        if (current === start) {
          this.fail$default_ly4hfp_k$("Unexpected symbol '" + toString_1(ch) + "' in numeric literal", current);
        }
        isExponentPositive = true;
        hasExponent = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
        if (current === start) {
          this.fail$default_ly4hfp_k$("Unexpected symbol '-' in numeric literal", current);
        }
        isExponentPositive = false;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
        if (current === start) {
          this.fail$default_ly4hfp_k$("Unexpected symbol '+' in numeric literal", current);
        }
        isExponentPositive = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45)) {
        if (!(current === start)) {
          this.fail$default_ly4hfp_k$("Unexpected symbol '-' in numeric literal", current);
        }
        isNegative = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      var token = charToTokenClass(ch);
      if (!(token === 0))
        break $l$loop_4;
      current = current + 1 | 0;
      var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
      if (!(0 <= digit ? digit <= 9 : false)) {
        this.fail$default_ly4hfp_k$("Unexpected symbol '" + toString_1(ch) + "' in numeric literal", current - 1 | 0);
      }
      if (hasExponent) {
        // Inline function 'kotlin.Long.times' call
        var this_0 = exponentAccumulator;
        // Inline function 'kotlin.Long.plus' call
        var this_1 = multiply(this_0, fromInt(10));
        exponentAccumulator = add(this_1, fromInt(digit));
        continue $l$loop_4;
      }
      // Inline function 'kotlin.Long.times' call
      var this_2 = accumulator;
      // Inline function 'kotlin.Long.minus' call
      var this_3 = multiply(this_2, fromInt(10));
      accumulator = subtract(this_3, fromInt(digit));
      if (compare(accumulator, new Long(0, 0)) > 0) {
        this.fail$default_ly4hfp_k$('Numeric value overflow');
      }
    }
    var hasChars = !(current === start);
    if (start === current || (isNegative && start === (current - 1 | 0))) {
      this.fail$default_ly4hfp_k$('Expected numeric literal', current);
    }
    if (hasQuotation) {
      if (!hasChars) {
        this.fail$default_ly4hfp_k$('EOF');
      }
      if (!(charSequenceGet(this.get_source_jl0x7o_k$(), current) === _Char___init__impl__6a9atx(34))) {
        this.fail$default_ly4hfp_k$('Expected closing quotation mark', current);
      }
      current = current + 1 | 0;
    }
    this.currentPosition_1 = current;
    if (hasExponent) {
      var doubleAccumulator = toNumber(accumulator) * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
      if (doubleAccumulator > toNumber(new Long(-1, 2147483647)) || doubleAccumulator < toNumber(new Long(0, -2147483648))) {
        this.fail$default_ly4hfp_k$('Numeric value overflow');
      }
      // Inline function 'kotlin.math.floor' call
      if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
        this.fail$default_ly4hfp_k$("Can't convert " + doubleAccumulator + ' to Long');
      }
      accumulator = numberToLong(doubleAccumulator);
    }
    var tmp_0;
    if (isNegative) {
      tmp_0 = accumulator;
    } else if (!equalsLong(accumulator, new Long(0, -2147483648))) {
      tmp_0 = negate(accumulator);
    } else {
      this.fail$default_ly4hfp_k$('Numeric value overflow');
    }
    return tmp_0;
  };
  protoOf(AbstractJsonLexer).consumeNumericLiteralFully_dgqq24_k$ = function () {
    var result = this.consumeNumericLiteral_rdea66_k$();
    var next = this.consumeNextToken_uf1vsa_k$();
    if (!(next === 10)) {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
      var expected = tokenDescription(10);
      var position = true && this.currentPosition_1 > 0 ? this.currentPosition_1 - 1 | 0 : this.currentPosition_1;
      var s = this.currentPosition_1 === charSequenceLength(this.get_source_jl0x7o_k$()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.get_source_jl0x7o_k$(), position));
      var tmp$ret$1 = "Expected input to contain a single valid number, but got '" + s + "' after it";
      this.fail$default_ly4hfp_k$(tmp$ret$1, position);
    }
    return result;
  };
  protoOf(AbstractJsonLexer).consumeBoolean_8eci30_k$ = function () {
    return consumeBoolean2(this, this.skipWhitespaces_ox013r_k$());
  };
  protoOf(AbstractJsonLexer).consumeBooleanLenient_iqeqb9_k$ = function () {
    var current = this.skipWhitespaces_ox013r_k$();
    if (current === charSequenceLength(this.get_source_jl0x7o_k$())) {
      this.fail$default_ly4hfp_k$('EOF');
    }
    var tmp;
    if (charSequenceGet(this.get_source_jl0x7o_k$(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var result = consumeBoolean2(this, current);
    if (hasQuotation) {
      if (this.currentPosition_1 === charSequenceLength(this.get_source_jl0x7o_k$())) {
        this.fail$default_ly4hfp_k$('EOF');
      }
      if (!(charSequenceGet(this.get_source_jl0x7o_k$(), this.currentPosition_1) === _Char___init__impl__6a9atx(34))) {
        this.fail$default_ly4hfp_k$('Expected closing quotation mark');
      }
      this.currentPosition_1 = this.currentPosition_1 + 1 | 0;
    }
    return result;
  };
  function charToTokenClass(c) {
    var tmp;
    // Inline function 'kotlin.code' call
    if (Char__toInt_impl_vasixd(c) < 126) {
      var tmp_0 = CharMappings_getInstance().CHAR_TO_TOKEN_1;
      // Inline function 'kotlin.code' call
      tmp = tmp_0[Char__toInt_impl_vasixd(c)];
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function tokenDescription(token) {
    return token === 1 ? "quotation mark '\"'" : token === 2 ? "string escape sequence '\\'" : token === 4 ? "comma ','" : token === 5 ? "colon ':'" : token === 6 ? "start of the object '{'" : token === 7 ? "end of the object '}'" : token === 8 ? "start of the array '['" : token === 9 ? "end of the array ']'" : token === 10 ? 'end of the input' : token === 127 ? 'invalid token' : 'valid token';
  }
  function escapeToChar(c) {
    return c < 117 ? CharMappings_getInstance().ESCAPE_2_CHAR_1[c] : _Char___init__impl__6a9atx(0);
  }
  function initEscape($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 31)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2ESC($this, i, _Char___init__impl__6a9atx(117));
      }
       while (inductionVariable <= 31);
    initC2ESC($this, 8, _Char___init__impl__6a9atx(98));
    initC2ESC($this, 9, _Char___init__impl__6a9atx(116));
    initC2ESC($this, 10, _Char___init__impl__6a9atx(110));
    initC2ESC($this, 12, _Char___init__impl__6a9atx(102));
    initC2ESC($this, 13, _Char___init__impl__6a9atx(114));
    initC2ESC_0($this, _Char___init__impl__6a9atx(47), _Char___init__impl__6a9atx(47));
    initC2ESC_0($this, _Char___init__impl__6a9atx(34), _Char___init__impl__6a9atx(34));
    initC2ESC_0($this, _Char___init__impl__6a9atx(92), _Char___init__impl__6a9atx(92));
  }
  function initCharToToken($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2TC($this, i, 127);
      }
       while (inductionVariable <= 32);
    initC2TC($this, 9, 3);
    initC2TC($this, 10, 3);
    initC2TC($this, 13, 3);
    initC2TC($this, 32, 3);
    initC2TC_0($this, _Char___init__impl__6a9atx(44), 4);
    initC2TC_0($this, _Char___init__impl__6a9atx(58), 5);
    initC2TC_0($this, _Char___init__impl__6a9atx(123), 6);
    initC2TC_0($this, _Char___init__impl__6a9atx(125), 7);
    initC2TC_0($this, _Char___init__impl__6a9atx(91), 8);
    initC2TC_0($this, _Char___init__impl__6a9atx(93), 9);
    initC2TC_0($this, _Char___init__impl__6a9atx(34), 1);
    initC2TC_0($this, _Char___init__impl__6a9atx(92), 2);
  }
  function initC2ESC($this, c, esc) {
    if (!(esc === _Char___init__impl__6a9atx(117))) {
      // Inline function 'kotlin.code' call
      var tmp$ret$0 = Char__toInt_impl_vasixd(esc);
      $this.ESCAPE_2_CHAR_1[tmp$ret$0] = numberToChar(c);
    }
  }
  function initC2ESC_0($this, c, esc) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2ESC($this, tmp$ret$0, esc);
  }
  function initC2TC($this, c, cl) {
    $this.CHAR_TO_TOKEN_1[c] = cl;
  }
  function initC2TC_0($this, c, cl) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2TC($this, tmp$ret$0, cl);
  }
  function CharMappings() {
    CharMappings_instance = this;
    this.ESCAPE_2_CHAR_1 = charArray(117);
    this.CHAR_TO_TOKEN_1 = new Int8Array(126);
    initEscape(this);
    initCharToToken(this);
  }
  protoOf(CharMappings).get_ESCAPE_2_CHAR_5c0exk_k$ = function () {
    return this.ESCAPE_2_CHAR_1;
  };
  protoOf(CharMappings).get_CHAR_TO_TOKEN_kwe4p7_k$ = function () {
    return this.CHAR_TO_TOKEN_1;
  };
  var CharMappings_instance;
  function CharMappings_getInstance() {
    if (CharMappings_instance == null)
      new CharMappings();
    return CharMappings_instance;
  }
  function StringJsonLexerWithComments(source, configuration) {
    StringJsonLexer.call(this, source, configuration);
  }
  protoOf(StringJsonLexerWithComments).consumeNextToken_uf1vsa_k$ = function () {
    var source = this.get_source_jl0x7o_k$();
    var cpos = this.skipWhitespaces_ox013r_k$();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.set_currentPosition_2hvbai_k$(cpos + 1 | 0);
    return charToTokenClass(charCodeAt(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).canConsumeValue_oljqd7_k$ = function () {
    var current = this.skipWhitespaces_ox013r_k$();
    if (current >= this.get_source_jl0x7o_k$().length || current === -1)
      return false;
    return this.isValidValueStart_7hrcay_k$(charCodeAt(this.get_source_jl0x7o_k$(), current));
  };
  protoOf(StringJsonLexerWithComments).consumeNextToken_o6jhkj_k$ = function (expected) {
    var source = this.get_source_jl0x7o_k$();
    var current = this.skipWhitespaces_ox013r_k$();
    if (current >= source.length || current === -1) {
      this.set_currentPosition_2hvbai_k$(-1);
      this.unexpectedToken_ad91it_k$(expected);
    }
    var c = charCodeAt(source, current);
    this.set_currentPosition_2hvbai_k$(current + 1 | 0);
    if (c === expected)
      return Unit_getInstance();
    else {
      this.unexpectedToken_ad91it_k$(expected);
    }
  };
  protoOf(StringJsonLexerWithComments).peekNextToken_1gqwr9_k$ = function () {
    var source = this.get_source_jl0x7o_k$();
    var cpos = this.skipWhitespaces_ox013r_k$();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.set_currentPosition_2hvbai_k$(cpos);
    return charToTokenClass(charCodeAt(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).skipWhitespaces_ox013r_k$ = function () {
    var current = this.get_currentPosition_5vz2du_k$();
    if (current === -1)
      return current;
    var source = this.get_source_jl0x7o_k$();
    $l$loop_1: while (current < source.length) {
      var c = charCodeAt(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop_1;
      }
      if (c === _Char___init__impl__6a9atx(47) && (current + 1 | 0) < source.length) {
        var tmp0_subject = charCodeAt(source, current + 1 | 0);
        if (tmp0_subject === _Char___init__impl__6a9atx(47)) {
          current = indexOf(source, _Char___init__impl__6a9atx(10), current + 2 | 0);
          if (current === -1) {
            current = source.length;
          } else {
            current = current + 1 | 0;
          }
          continue $l$loop_1;
        } else if (tmp0_subject === _Char___init__impl__6a9atx(42)) {
          current = indexOf_0(source, '*/', current + 2 | 0);
          if (current === -1) {
            this.set_currentPosition_2hvbai_k$(source.length);
            this.fail$default_ly4hfp_k$('Expected end of the block comment: "*/", but had EOF instead');
          } else {
            current = current + 2 | 0;
          }
          continue $l$loop_1;
        }
      }
      break $l$loop_1;
    }
    this.set_currentPosition_2hvbai_k$(current);
    return current;
  };
  function StringJsonLexer(source, configuration) {
    AbstractJsonLexer.call(this, configuration);
    this.source_1 = source;
  }
  protoOf(StringJsonLexer).get_source_jl0x7o_k$ = function () {
    return this.source_1;
  };
  protoOf(StringJsonLexer).prefetchOrEof_k52kdy_k$ = function (position) {
    return position < this.get_source_jl0x7o_k$().length ? position : -1;
  };
  protoOf(StringJsonLexer).consumeNextToken_uf1vsa_k$ = function () {
    var source = this.get_source_jl0x7o_k$();
    var cpos = this.get_currentPosition_5vz2du_k$();
    $l$loop: while (!(cpos === -1) && cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charCodeAt(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.set_currentPosition_2hvbai_k$(cpos);
      return charToTokenClass(c);
    }
    this.set_currentPosition_2hvbai_k$(source.length);
    return 10;
  };
  protoOf(StringJsonLexer).canConsumeValue_oljqd7_k$ = function () {
    var current = this.get_currentPosition_5vz2du_k$();
    if (current === -1)
      return false;
    var source = this.get_source_jl0x7o_k$();
    $l$loop: while (current < source.length) {
      var c = charCodeAt(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop;
      }
      this.set_currentPosition_2hvbai_k$(current);
      return this.isValidValueStart_7hrcay_k$(c);
    }
    this.set_currentPosition_2hvbai_k$(current);
    return false;
  };
  protoOf(StringJsonLexer).skipWhitespaces_ox013r_k$ = function () {
    var current = this.get_currentPosition_5vz2du_k$();
    if (current === -1)
      return current;
    var source = this.get_source_jl0x7o_k$();
    $l$loop: while (current < source.length) {
      var c = charCodeAt(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop;
      }
    }
    this.set_currentPosition_2hvbai_k$(current);
    return current;
  };
  protoOf(StringJsonLexer).consumeNextToken_o6jhkj_k$ = function (expected) {
    if (this.get_currentPosition_5vz2du_k$() === -1) {
      this.unexpectedToken_ad91it_k$(expected);
    }
    var source = this.get_source_jl0x7o_k$();
    var cpos = this.get_currentPosition_5vz2du_k$();
    $l$loop: while (cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charCodeAt(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.set_currentPosition_2hvbai_k$(cpos);
      if (c === expected)
        return Unit_getInstance();
      this.unexpectedToken_ad91it_k$(expected);
    }
    this.set_currentPosition_2hvbai_k$(-1);
    this.unexpectedToken_ad91it_k$(expected);
  };
  protoOf(StringJsonLexer).consumeKeyString_mfa3ws_k$ = function () {
    this.consumeNextToken_o6jhkj_k$(_Char___init__impl__6a9atx(34));
    var current = this.get_currentPosition_5vz2du_k$();
    var closingQuote = indexOf(this.get_source_jl0x7o_k$(), _Char___init__impl__6a9atx(34), current);
    if (closingQuote === -1) {
      this.consumeStringLenient_9oypvu_k$();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
      var expected = tokenDescription(1);
      var position = false && this.get_currentPosition_5vz2du_k$() > 0 ? this.get_currentPosition_5vz2du_k$() - 1 | 0 : this.get_currentPosition_5vz2du_k$();
      var s = this.get_currentPosition_5vz2du_k$() === charSequenceLength(this.get_source_jl0x7o_k$()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.get_source_jl0x7o_k$(), position));
      var tmp$ret$1 = 'Expected ' + expected + ", but had '" + s + "' instead";
      this.fail$default_ly4hfp_k$(tmp$ret$1, position);
    }
    var inductionVariable = current;
    if (inductionVariable < closingQuote)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charCodeAt(this.get_source_jl0x7o_k$(), i) === _Char___init__impl__6a9atx(92)) {
          return this.consumeString2(this.get_source_jl0x7o_k$(), this.get_currentPosition_5vz2du_k$(), i);
        }
      }
       while (inductionVariable < closingQuote);
    this.set_currentPosition_2hvbai_k$(closingQuote + 1 | 0);
    return substring(this.get_source_jl0x7o_k$(), current, closingQuote);
  };
  protoOf(StringJsonLexer).consumeStringChunked_ewhgsb_k$ = function (isLenient, consumeChunk) {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = chunked(isLenient ? this.consumeStringLenient_9oypvu_k$() : this.consumeString_j3j2z7_k$(), 16384).iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      consumeChunk(element);
    }
  };
  protoOf(StringJsonLexer).peekLeadingMatchingValue_y3am18_k$ = function (keyToMatch, isLenient) {
    var positionSnapshot = this.get_currentPosition_5vz2du_k$();
    try {
      if (!(this.consumeNextToken_uf1vsa_k$() === 6))
        return null;
      var firstKey = this.peekString_d4c947_k$(isLenient);
      if (!(firstKey === keyToMatch))
        return null;
      this.discardPeeked_n23g48_k$();
      if (!(this.consumeNextToken_uf1vsa_k$() === 5))
        return null;
      return this.peekString_d4c947_k$(isLenient);
    }finally {
      this.set_currentPosition_2hvbai_k$(positionSnapshot);
      this.discardPeeked_n23g48_k$();
    }
  };
  function StringJsonLexer_0(json, source) {
    return !json.get_configuration_uqypjh_k$().get_allowComments_9ik2es_k$() ? new StringJsonLexer(source, json.get_configuration_uqypjh_k$()) : new StringJsonLexerWithComments(source, json.get_configuration_uqypjh_k$());
  }
  function get_schemaCache(_this__u8e3s4) {
    return _this__u8e3s4.get__schemaCache_7cqc2k_k$();
  }
  function FormatLanguage(value, prefix, suffix) {
    this.value_1 = value;
    this.prefix_1 = prefix;
    this.suffix_1 = suffix;
  }
  protoOf(FormatLanguage).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  protoOf(FormatLanguage).get_prefix_i78za3_k$ = function () {
    return this.prefix_1;
  };
  protoOf(FormatLanguage).get_suffix_jo1v8a_k$ = function () {
    return this.suffix_1;
  };
  protoOf(FormatLanguage).equals = function (other) {
    if (!(other instanceof FormatLanguage))
      return false;
    var tmp0_other_with_cast = other instanceof FormatLanguage ? other : THROW_CCE();
    if (!(this.value_1 === tmp0_other_with_cast.value_1))
      return false;
    if (!(this.prefix_1 === tmp0_other_with_cast.prefix_1))
      return false;
    if (!(this.suffix_1 === tmp0_other_with_cast.suffix_1))
      return false;
    return true;
  };
  protoOf(FormatLanguage).hashCode = function () {
    var result = imul(getStringHashCode('value'), 127) ^ getStringHashCode(this.value_1);
    result = result + (imul(getStringHashCode('prefix'), 127) ^ getStringHashCode(this.prefix_1)) | 0;
    result = result + (imul(getStringHashCode('suffix'), 127) ^ getStringHashCode(this.suffix_1)) | 0;
    return result;
  };
  protoOf(FormatLanguage).toString = function () {
    return '@kotlinx.serialization.json.internal.FormatLanguage(' + 'value=' + this.value_1 + ', ' + 'prefix=' + this.prefix_1 + ', ' + 'suffix=' + this.suffix_1 + ')';
  };
  function _get_sb__ndcaho($this) {
    return $this.sb_1;
  }
  function JsonToStringWriter() {
    this.sb_1 = StringBuilder_init_$Create$_0(128);
  }
  protoOf(JsonToStringWriter).writeLong_2rx6yl_k$ = function (value) {
    this.sb_1.append_8gl4h8_k$(value);
  };
  protoOf(JsonToStringWriter).writeChar_w2y76g_k$ = function (char) {
    this.sb_1.append_am5a4z_k$(char);
  };
  protoOf(JsonToStringWriter).write_mozxwr_k$ = function (text) {
    this.sb_1.append_22ad7x_k$(text);
  };
  protoOf(JsonToStringWriter).writeQuoted_k770v7_k$ = function (text) {
    printQuoted(this.sb_1, text);
  };
  protoOf(JsonToStringWriter).release_wu5yyf_k$ = function () {
    this.sb_1.clear_1keqml_k$();
  };
  protoOf(JsonToStringWriter).toString = function () {
    return this.sb_1.toString();
  };
  function createMapForCache(initialCapacity) {
    return HashMap_init_$Create$(initialCapacity);
  }
  //region block: post-declaration
  protoOf(defer$1).get_isNullable_67sy7o_k$ = get_isNullable;
  protoOf(defer$1).get_isInline_usk17w_k$ = get_isInline;
  protoOf(defer$1).get_annotations_20dirp_k$ = get_annotations;
  defineProp(protoOf(JsonException), 'message', function () {
    return this.get_message_h23axq_k$();
  });
  protoOf(JsonSerializersModuleValidator).contextual_s0h8js_k$ = contextual;
  protoOf(JsonSerializersModuleValidator).polymorphicDefault_n864hv_k$ = polymorphicDefault;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Default_getInstance;
  _.$_$.b = Json_0;
  //endregion
  return _;
}));
