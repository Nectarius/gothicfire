(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-serialization-kotlinx-serialization-core.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kilua-project-modules-kilua-common-types'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kilua-project-modules-kilua-common-types'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'kilua-project-modules-kilua-common-types'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'kilua-project-modules-kilua-common-types'.");
    }
    globalThis['kilua-project-modules-kilua-common-types'] = factory(typeof globalThis['kilua-project-modules-kilua-common-types'] === 'undefined' ? {} : globalThis['kilua-project-modules-kilua-common-types'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-serialization-kotlinx-serialization-core']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.ue;
  var initMetadataForCompanion = kotlin_kotlin.$_$.sd;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var StringSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var THROW_CCE = kotlin_kotlin.$_$.cj;
  var UnknownFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var IntSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var get_nullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u1;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var initMetadataForObject = kotlin_kotlin.$_$.xd;
  var VOID = kotlin_kotlin.$_$.d;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d2;
  var objectCreate = kotlin_kotlin.$_$.te;
  var getStringHashCode = kotlin_kotlin.$_$.pd;
  var makeAssociatedObjectMapES5 = kotlin_kotlin.$_$.b;
  var SerializableWith = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o2;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  //endregion
  //region block: pre-declaration
  initMetadataForCompanion(Companion);
  initMetadataForObject($serializer, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(KFile, 'KFile', VOID, VOID, VOID, VOID, VOID, makeAssociatedObjectMapES5([SerializableWith, $serializer_getInstance]));
  //endregion
  function Companion() {
    Companion_instance = this;
  }
  protoOf(Companion).serializer_9w0wvi_k$ = function () {
    return $serializer_getInstance();
  };
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function $serializer() {
    $serializer_instance = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('dev.kilua.types.KFile', this, 3);
    tmp0_serialDesc.addElement_5pzumi_k$('name', false);
    tmp0_serialDesc.addElement_5pzumi_k$('size', false);
    tmp0_serialDesc.addElement_5pzumi_k$('content', true);
    this.descriptor_1 = tmp0_serialDesc;
  }
  protoOf($serializer).serialize_plrohv_k$ = function (encoder, value) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
    tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.name_1);
    tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 1, value.size_1);
    if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 2) ? true : !(value.content_1 == null)) {
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 2, StringSerializer_getInstance(), value.content_1);
    }
    tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
  };
  protoOf($serializer).serialize_5ase3y_k$ = function (encoder, value) {
    return this.serialize_plrohv_k$(encoder, value instanceof KFile ? value : THROW_CCE());
  };
  protoOf($serializer).deserialize_sy6x50_k$ = function (decoder) {
    var tmp0_desc = this.descriptor_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = 0;
    var tmp6_local2 = null;
    var tmp7_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
    if (tmp7_input.decodeSequentially_xlblqy_k$()) {
      tmp4_local0 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp7_input.decodeIntElement_941u6a_k$(tmp0_desc, 1);
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
            tmp5_local1 = tmp7_input.decodeIntElement_941u6a_k$(tmp0_desc, 1);
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
    return KFile_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
  };
  protoOf($serializer).get_descriptor_wjt6a0_k$ = function () {
    return this.descriptor_1;
  };
  protoOf($serializer).childSerializers_5ghqw5_k$ = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), IntSerializer_getInstance(), get_nullable(StringSerializer_getInstance())];
  };
  var $serializer_instance;
  function $serializer_getInstance() {
    if ($serializer_instance == null)
      new $serializer();
    return $serializer_instance;
  }
  function KFile_init_$Init$(seen0, name, size, content, serializationConstructorMarker, $this) {
    if (!(3 === (3 & seen0))) {
      throwMissingFieldException(seen0, 3, $serializer_getInstance().descriptor_1);
    }
    $this.name_1 = name;
    $this.size_1 = size;
    if (0 === (seen0 & 4))
      $this.content_1 = null;
    else
      $this.content_1 = content;
    return $this;
  }
  function KFile_init_$Create$(seen0, name, size, content, serializationConstructorMarker) {
    return KFile_init_$Init$(seen0, name, size, content, serializationConstructorMarker, objectCreate(protoOf(KFile)));
  }
  function KFile(name, size, content) {
    Companion_getInstance();
    content = content === VOID ? null : content;
    this.name_1 = name;
    this.size_1 = size;
    this.content_1 = content;
  }
  protoOf(KFile).get_name_woqyms_k$ = function () {
    return this.name_1;
  };
  protoOf(KFile).get_size_woubt6_k$ = function () {
    return this.size_1;
  };
  protoOf(KFile).get_content_h02jrk_k$ = function () {
    return this.content_1;
  };
  protoOf(KFile).component1_7eebsc_k$ = function () {
    return this.name_1;
  };
  protoOf(KFile).component2_7eebsb_k$ = function () {
    return this.size_1;
  };
  protoOf(KFile).component3_7eebsa_k$ = function () {
    return this.content_1;
  };
  protoOf(KFile).copy_hsq28c_k$ = function (name, size, content) {
    return new KFile(name, size, content);
  };
  protoOf(KFile).copy$default_5ullbj_k$ = function (name, size, content, $super) {
    name = name === VOID ? this.name_1 : name;
    size = size === VOID ? this.size_1 : size;
    content = content === VOID ? this.content_1 : content;
    return $super === VOID ? this.copy_hsq28c_k$(name, size, content) : $super.copy_hsq28c_k$.call(this, name, size, content);
  };
  protoOf(KFile).toString = function () {
    return 'KFile(name=' + this.name_1 + ', size=' + this.size_1 + ', content=' + this.content_1 + ')';
  };
  protoOf(KFile).hashCode = function () {
    var result = getStringHashCode(this.name_1);
    result = imul(result, 31) + this.size_1 | 0;
    result = imul(result, 31) + (this.content_1 == null ? 0 : getStringHashCode(this.content_1)) | 0;
    return result;
  };
  protoOf(KFile).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof KFile))
      return false;
    if (!(this.name_1 === other.name_1))
      return false;
    if (!(this.size_1 === other.size_1))
      return false;
    if (!(this.content_1 == other.content_1))
      return false;
    return true;
  };
  //region block: post-declaration
  protoOf($serializer).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Companion_getInstance;
  //endregion
  return _;
}));

//# sourceMappingURL=kilua-project-modules-kilua-common-types.js.map
