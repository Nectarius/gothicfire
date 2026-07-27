(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'androidx-annotation-annotation'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'androidx-annotation-annotation'.");
    }
    globalThis['androidx-annotation-annotation'] = factory(typeof globalThis['androidx-annotation-annotation'] === 'undefined' ? {} : globalThis['androidx-annotation-annotation'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var VOID = kotlin_kotlin.$_$.d;
  var protoOf = kotlin_kotlin.$_$.ue;
  var THROW_CCE = kotlin_kotlin.$_$.cj;
  var contentEquals = kotlin_kotlin.$_$.j7;
  var getStringHashCode = kotlin_kotlin.$_$.pd;
  var hashCode = kotlin_kotlin.$_$.qd;
  var getBooleanHashCode = kotlin_kotlin.$_$.ld;
  var toString = kotlin_kotlin.$_$.xe;
  var Annotation = kotlin_kotlin.$_$.gi;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  var Long = kotlin_kotlin.$_$.vi;
  var equalsLong = kotlin_kotlin.$_$.gc;
  var initMetadataForCompanion = kotlin_kotlin.$_$.sd;
  var THROW_IAE = kotlin_kotlin.$_$.dj;
  var enumEntries = kotlin_kotlin.$_$.sb;
  var Unit_getInstance = kotlin_kotlin.$_$.w2;
  var Enum = kotlin_kotlin.$_$.pi;
  var contentEquals_0 = kotlin_kotlin.$_$.i7;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(IntDef, 'IntDef', VOID, VOID, [Annotation]);
  initMetadataForClass(IntRange, 'IntRange', VOID, VOID, [Annotation]);
  initMetadataForClass(ProductionVisibility, 'ProductionVisibility', VOID, VOID, [Annotation]);
  initMetadataForCompanion(Companion);
  initMetadataForClass(VisibleForTesting, 'VisibleForTesting', VOID, VOID, [Annotation]);
  initMetadataForClass(Scope, 'Scope', VOID, Enum);
  initMetadataForClass(RestrictTo, 'RestrictTo', VOID, VOID, [Annotation]);
  //endregion
  function IntDef(value, flag, open) {
    value = value === VOID ? new Int32Array([]) : value;
    flag = flag === VOID ? false : flag;
    open = open === VOID ? false : open;
    this.value_1 = value;
    this.flag_1 = flag;
    this.open_1 = open;
  }
  protoOf(IntDef).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  protoOf(IntDef).get_flag_wom2lx_k$ = function () {
    return this.flag_1;
  };
  protoOf(IntDef).get_open_worwk3_k$ = function () {
    return this.open_1;
  };
  protoOf(IntDef).equals = function (other) {
    if (!(other instanceof IntDef))
      return false;
    var tmp0_other_with_cast = other instanceof IntDef ? other : THROW_CCE();
    if (!contentEquals(this.value_1, tmp0_other_with_cast.value_1))
      return false;
    if (!(this.flag_1 === tmp0_other_with_cast.flag_1))
      return false;
    if (!(this.open_1 === tmp0_other_with_cast.open_1))
      return false;
    return true;
  };
  protoOf(IntDef).hashCode = function () {
    var result = imul(getStringHashCode('value'), 127) ^ hashCode(this.value_1);
    result = result + (imul(getStringHashCode('flag'), 127) ^ getBooleanHashCode(this.flag_1)) | 0;
    result = result + (imul(getStringHashCode('open'), 127) ^ getBooleanHashCode(this.open_1)) | 0;
    return result;
  };
  protoOf(IntDef).toString = function () {
    return '@androidx.annotation.IntDef(' + 'value=' + toString(this.value_1) + ', ' + 'flag=' + this.flag_1 + ', ' + 'open=' + this.open_1 + ')';
  };
  function IntRange(from, to) {
    from = from === VOID ? new Long(0, -2147483648) : from;
    to = to === VOID ? new Long(-1, 2147483647) : to;
    this.from_1 = from;
    this.to_1 = to;
  }
  protoOf(IntRange).get_from_wom7eb_k$ = function () {
    return this.from_1;
  };
  protoOf(IntRange).get_to_kntnng_k$ = function () {
    return this.to_1;
  };
  protoOf(IntRange).equals = function (other) {
    if (!(other instanceof IntRange))
      return false;
    var tmp0_other_with_cast = other instanceof IntRange ? other : THROW_CCE();
    if (!equalsLong(this.from_1, tmp0_other_with_cast.from_1))
      return false;
    if (!equalsLong(this.to_1, tmp0_other_with_cast.to_1))
      return false;
    return true;
  };
  protoOf(IntRange).hashCode = function () {
    var result = imul(getStringHashCode('from'), 127) ^ this.from_1.hashCode();
    result = result + (imul(getStringHashCode('to'), 127) ^ this.to_1.hashCode()) | 0;
    return result;
  };
  protoOf(IntRange).toString = function () {
    return '@androidx.annotation.IntRange(' + 'from=' + this.from_1.toString() + ', ' + 'to=' + this.to_1.toString() + ')';
  };
  function ProductionVisibility() {
  }
  protoOf(ProductionVisibility).equals = function (other) {
    if (!(other instanceof ProductionVisibility))
      return false;
    other instanceof ProductionVisibility || THROW_CCE();
    return true;
  };
  protoOf(ProductionVisibility).hashCode = function () {
    return 0;
  };
  protoOf(ProductionVisibility).toString = function () {
    return '@androidx.annotation.ProductionVisibility(' + ')';
  };
  function Companion() {
    Companion_instance = this;
    this.PRIVATE_1 = 2;
    this.PACKAGE_PRIVATE_1 = 3;
    this.PROTECTED_1 = 4;
    this.NONE_1 = 5;
  }
  protoOf(Companion).get_PRIVATE_7xs12y_k$ = function () {
    return this.PRIVATE_1;
  };
  protoOf(Companion).get_PACKAGE_PRIVATE_c8bkin_k$ = function () {
    return this.PACKAGE_PRIVATE_1;
  };
  protoOf(Companion).get_PROTECTED_qhtyqj_k$ = function () {
    return this.PROTECTED_1;
  };
  protoOf(Companion).get_NONE_wo64xt_k$ = function () {
    return this.NONE_1;
  };
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function VisibleForTesting(otherwise) {
    Companion_getInstance();
    otherwise = otherwise === VOID ? 2 : otherwise;
    this.otherwise_1 = otherwise;
  }
  protoOf(VisibleForTesting).get_otherwise_nndrzp_k$ = function () {
    return this.otherwise_1;
  };
  protoOf(VisibleForTesting).equals = function (other) {
    if (!(other instanceof VisibleForTesting))
      return false;
    var tmp0_other_with_cast = other instanceof VisibleForTesting ? other : THROW_CCE();
    if (!(this.otherwise_1 === tmp0_other_with_cast.otherwise_1))
      return false;
    return true;
  };
  protoOf(VisibleForTesting).hashCode = function () {
    return imul(getStringHashCode('otherwise'), 127) ^ this.otherwise_1;
  };
  protoOf(VisibleForTesting).toString = function () {
    return '@androidx.annotation.VisibleForTesting(' + 'otherwise=' + this.otherwise_1 + ')';
  };
  var Scope_LIBRARY_instance;
  var Scope_LIBRARY_GROUP_instance;
  var Scope_LIBRARY_GROUP_PREFIX_instance;
  var Scope_GROUP_ID_instance;
  var Scope_TESTS_instance;
  var Scope_SUBCLASSES_instance;
  function values() {
    return [Scope_LIBRARY_getInstance(), Scope_LIBRARY_GROUP_getInstance(), Scope_LIBRARY_GROUP_PREFIX_getInstance(), Scope_GROUP_ID_getInstance(), Scope_TESTS_getInstance(), Scope_SUBCLASSES_getInstance()];
  }
  function valueOf(value) {
    switch (value) {
      case 'LIBRARY':
        return Scope_LIBRARY_getInstance();
      case 'LIBRARY_GROUP':
        return Scope_LIBRARY_GROUP_getInstance();
      case 'LIBRARY_GROUP_PREFIX':
        return Scope_LIBRARY_GROUP_PREFIX_getInstance();
      case 'GROUP_ID':
        return Scope_GROUP_ID_getInstance();
      case 'TESTS':
        return Scope_TESTS_getInstance();
      case 'SUBCLASSES':
        return Scope_SUBCLASSES_getInstance();
      default:
        Scope_initEntries();
        THROW_IAE('No enum constant androidx.annotation.RestrictTo.Scope.' + value);
        break;
    }
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var Scope_entriesInitialized;
  function Scope_initEntries() {
    if (Scope_entriesInitialized)
      return Unit_getInstance();
    Scope_entriesInitialized = true;
    Scope_LIBRARY_instance = new Scope('LIBRARY', 0);
    Scope_LIBRARY_GROUP_instance = new Scope('LIBRARY_GROUP', 1);
    Scope_LIBRARY_GROUP_PREFIX_instance = new Scope('LIBRARY_GROUP_PREFIX', 2);
    Scope_GROUP_ID_instance = new Scope('GROUP_ID', 3);
    Scope_TESTS_instance = new Scope('TESTS', 4);
    Scope_SUBCLASSES_instance = new Scope('SUBCLASSES', 5);
  }
  var $ENTRIES;
  function Scope(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Scope_LIBRARY_getInstance() {
    Scope_initEntries();
    return Scope_LIBRARY_instance;
  }
  function Scope_LIBRARY_GROUP_getInstance() {
    Scope_initEntries();
    return Scope_LIBRARY_GROUP_instance;
  }
  function Scope_LIBRARY_GROUP_PREFIX_getInstance() {
    Scope_initEntries();
    return Scope_LIBRARY_GROUP_PREFIX_instance;
  }
  function Scope_GROUP_ID_getInstance() {
    Scope_initEntries();
    return Scope_GROUP_ID_instance;
  }
  function Scope_TESTS_getInstance() {
    Scope_initEntries();
    return Scope_TESTS_instance;
  }
  function Scope_SUBCLASSES_getInstance() {
    Scope_initEntries();
    return Scope_SUBCLASSES_instance;
  }
  function RestrictTo(value) {
    this.value_1 = value;
  }
  protoOf(RestrictTo).get_value_j01efc_k$ = function () {
    return this.value_1;
  };
  protoOf(RestrictTo).equals = function (other) {
    if (!(other instanceof RestrictTo))
      return false;
    var tmp0_other_with_cast = other instanceof RestrictTo ? other : THROW_CCE();
    if (!contentEquals_0(this.value_1, tmp0_other_with_cast.value_1))
      return false;
    return true;
  };
  protoOf(RestrictTo).hashCode = function () {
    return imul(getStringHashCode('value'), 127) ^ hashCode(this.value_1);
  };
  protoOf(RestrictTo).toString = function () {
    return '@androidx.annotation.RestrictTo(' + 'value=' + toString(this.value_1) + ')';
  };
  return _;
}));
