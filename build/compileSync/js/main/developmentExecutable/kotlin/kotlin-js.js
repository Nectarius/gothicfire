(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlin-js'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlin-js'.");
    }
    globalThis['kotlin-js'] = factory(typeof globalThis['kotlin-js'] === 'undefined' ? {} : globalThis['kotlin-js'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var toList = kotlin_kotlin.$_$.ia;
  var VOID = kotlin_kotlin.$_$.d;
  var Companion_getInstance = kotlin_kotlin.$_$.r2;
  var createFailure = kotlin_kotlin.$_$.uj;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.n;
  var Unit_getInstance = kotlin_kotlin.$_$.w2;
  var newThrowable = kotlin_kotlin.$_$.ne;
  var THROW_CCE = kotlin_kotlin.$_$.cj;
  var protoOf = kotlin_kotlin.$_$.ue;
  var Annotation = kotlin_kotlin.$_$.gi;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  var intercepted = kotlin_kotlin.$_$.za;
  var SafeContinuation_init_$Create$ = kotlin_kotlin.$_$.u3;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(JsoDsl, 'JsoDsl', VOID, VOID, [Annotation]);
  //endregion
  function toList_0(_this__u8e3s4) {
    return toList(_this__u8e3s4);
  }
  function toThrowable(_this__u8e3s4) {
    return toJsError(_this__u8e3s4);
  }
  function get_TO_CONTEXT_FUNCTION() {
    _init_properties_ContextFunction_adapter_kt__6tkqty();
    return TO_CONTEXT_FUNCTION;
  }
  var TO_CONTEXT_FUNCTION;
  var properties_initialized_ContextFunction_adapter_kt_tyhiew;
  function _init_properties_ContextFunction_adapter_kt__6tkqty() {
    if (!properties_initialized_ContextFunction_adapter_kt_tyhiew) {
      properties_initialized_ContextFunction_adapter_kt_tyhiew = true;
      TO_CONTEXT_FUNCTION = new (Function.bind.apply(Function, [null, 'source', 'return function(...args) {\n    return source(this, ...args)\n}']))();
    }
  }
  function js_intl_DateTimeFormatOptions_Companion_avcijm_invoke_jkqnwo(localeMatcher, weekday, era, year, month, day, hour, minute, second, timeZoneName, formatMatcher, hour12, timeZone, calendar, dayPeriod, numberingSystem, dateStyle, timeStyle, hourCycle, fractionalSecondDigits) {
    localeMatcher = localeMatcher === VOID ? VOID : localeMatcher;
    weekday = weekday === VOID ? VOID : weekday;
    era = era === VOID ? VOID : era;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    day = day === VOID ? VOID : day;
    hour = hour === VOID ? VOID : hour;
    minute = minute === VOID ? VOID : minute;
    second = second === VOID ? VOID : second;
    timeZoneName = timeZoneName === VOID ? VOID : timeZoneName;
    formatMatcher = formatMatcher === VOID ? VOID : formatMatcher;
    hour12 = hour12 === VOID ? VOID : hour12;
    timeZone = timeZone === VOID ? VOID : timeZone;
    calendar = calendar === VOID ? VOID : calendar;
    dayPeriod = dayPeriod === VOID ? VOID : dayPeriod;
    numberingSystem = numberingSystem === VOID ? VOID : numberingSystem;
    dateStyle = dateStyle === VOID ? VOID : dateStyle;
    timeStyle = timeStyle === VOID ? VOID : timeStyle;
    hourCycle = hourCycle === VOID ? VOID : hourCycle;
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    return {localeMatcher: localeMatcher, weekday: weekday, era: era, year: year, month: month, day: day, hour: hour, minute: minute, second: second, timeZoneName: timeZoneName, formatMatcher: formatMatcher, hour12: hour12, timeZone: timeZone, calendar: calendar, dayPeriod: dayPeriod, numberingSystem: numberingSystem, dateStyle: dateStyle, timeStyle: timeStyle, hourCycle: hourCycle, fractionalSecondDigits: fractionalSecondDigits};
  }
  function js_intl_DateTimeFormatOptions_Companion_avcijm_copy_1tks5(source, localeMatcher, weekday, era, year, month, day, hour, minute, second, timeZoneName, formatMatcher, hour12, timeZone, calendar, dayPeriod, numberingSystem, dateStyle, timeStyle, hourCycle, fractionalSecondDigits) {
    localeMatcher = localeMatcher === VOID ? VOID : localeMatcher;
    weekday = weekday === VOID ? VOID : weekday;
    era = era === VOID ? VOID : era;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    day = day === VOID ? VOID : day;
    hour = hour === VOID ? VOID : hour;
    minute = minute === VOID ? VOID : minute;
    second = second === VOID ? VOID : second;
    timeZoneName = timeZoneName === VOID ? VOID : timeZoneName;
    formatMatcher = formatMatcher === VOID ? VOID : formatMatcher;
    hour12 = hour12 === VOID ? VOID : hour12;
    timeZone = timeZone === VOID ? VOID : timeZone;
    calendar = calendar === VOID ? VOID : calendar;
    dayPeriod = dayPeriod === VOID ? VOID : dayPeriod;
    numberingSystem = numberingSystem === VOID ? VOID : numberingSystem;
    dateStyle = dateStyle === VOID ? VOID : dateStyle;
    timeStyle = timeStyle === VOID ? VOID : timeStyle;
    hourCycle = hourCycle === VOID ? VOID : hourCycle;
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    return Object.assign({}, source, {localeMatcher: localeMatcher, weekday: weekday, era: era, year: year, month: month, day: day, hour: hour, minute: minute, second: second, timeZoneName: timeZoneName, formatMatcher: formatMatcher, hour12: hour12, timeZone: timeZone, calendar: calendar, dayPeriod: dayPeriod, numberingSystem: numberingSystem, dateStyle: dateStyle, timeStyle: timeStyle, hourCycle: hourCycle, fractionalSecondDigits: fractionalSecondDigits});
  }
  function js_intl_NumberFormatOptions_Companion_dx275c_invoke_jkqnwo(localeMatcher, style, currency, currencyDisplay, useGrouping, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, numberingSystem, compactDisplay, notation, signDisplay, unit, unitDisplay, currencySign, roundingPriority, roundingIncrement, roundingMode, trailingZeroDisplay) {
    localeMatcher = localeMatcher === VOID ? VOID : localeMatcher;
    style = style === VOID ? VOID : style;
    currency = currency === VOID ? VOID : currency;
    currencyDisplay = currencyDisplay === VOID ? VOID : currencyDisplay;
    useGrouping = useGrouping === VOID ? VOID : useGrouping;
    minimumIntegerDigits = minimumIntegerDigits === VOID ? VOID : minimumIntegerDigits;
    minimumFractionDigits = minimumFractionDigits === VOID ? VOID : minimumFractionDigits;
    maximumFractionDigits = maximumFractionDigits === VOID ? VOID : maximumFractionDigits;
    minimumSignificantDigits = minimumSignificantDigits === VOID ? VOID : minimumSignificantDigits;
    maximumSignificantDigits = maximumSignificantDigits === VOID ? VOID : maximumSignificantDigits;
    numberingSystem = numberingSystem === VOID ? VOID : numberingSystem;
    compactDisplay = compactDisplay === VOID ? VOID : compactDisplay;
    notation = notation === VOID ? VOID : notation;
    signDisplay = signDisplay === VOID ? VOID : signDisplay;
    unit = unit === VOID ? VOID : unit;
    unitDisplay = unitDisplay === VOID ? VOID : unitDisplay;
    currencySign = currencySign === VOID ? VOID : currencySign;
    roundingPriority = roundingPriority === VOID ? VOID : roundingPriority;
    roundingIncrement = roundingIncrement === VOID ? VOID : roundingIncrement;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    trailingZeroDisplay = trailingZeroDisplay === VOID ? VOID : trailingZeroDisplay;
    return {localeMatcher: localeMatcher, style: style, currency: currency, currencyDisplay: currencyDisplay, useGrouping: useGrouping, minimumIntegerDigits: minimumIntegerDigits, minimumFractionDigits: minimumFractionDigits, maximumFractionDigits: maximumFractionDigits, minimumSignificantDigits: minimumSignificantDigits, maximumSignificantDigits: maximumSignificantDigits, numberingSystem: numberingSystem, compactDisplay: compactDisplay, notation: notation, signDisplay: signDisplay, unit: unit, unitDisplay: unitDisplay, currencySign: currencySign, roundingPriority: roundingPriority, roundingIncrement: roundingIncrement, roundingMode: roundingMode, trailingZeroDisplay: trailingZeroDisplay};
  }
  function js_intl_NumberFormatOptions_Companion_dx275c_copy_1tks5(source, localeMatcher, style, currency, currencyDisplay, useGrouping, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, numberingSystem, compactDisplay, notation, signDisplay, unit, unitDisplay, currencySign, roundingPriority, roundingIncrement, roundingMode, trailingZeroDisplay) {
    localeMatcher = localeMatcher === VOID ? VOID : localeMatcher;
    style = style === VOID ? VOID : style;
    currency = currency === VOID ? VOID : currency;
    currencyDisplay = currencyDisplay === VOID ? VOID : currencyDisplay;
    useGrouping = useGrouping === VOID ? VOID : useGrouping;
    minimumIntegerDigits = minimumIntegerDigits === VOID ? VOID : minimumIntegerDigits;
    minimumFractionDigits = minimumFractionDigits === VOID ? VOID : minimumFractionDigits;
    maximumFractionDigits = maximumFractionDigits === VOID ? VOID : maximumFractionDigits;
    minimumSignificantDigits = minimumSignificantDigits === VOID ? VOID : minimumSignificantDigits;
    maximumSignificantDigits = maximumSignificantDigits === VOID ? VOID : maximumSignificantDigits;
    numberingSystem = numberingSystem === VOID ? VOID : numberingSystem;
    compactDisplay = compactDisplay === VOID ? VOID : compactDisplay;
    notation = notation === VOID ? VOID : notation;
    signDisplay = signDisplay === VOID ? VOID : signDisplay;
    unit = unit === VOID ? VOID : unit;
    unitDisplay = unitDisplay === VOID ? VOID : unitDisplay;
    currencySign = currencySign === VOID ? VOID : currencySign;
    roundingPriority = roundingPriority === VOID ? VOID : roundingPriority;
    roundingIncrement = roundingIncrement === VOID ? VOID : roundingIncrement;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    trailingZeroDisplay = trailingZeroDisplay === VOID ? VOID : trailingZeroDisplay;
    return Object.assign({}, source, {localeMatcher: localeMatcher, style: style, currency: currency, currencyDisplay: currencyDisplay, useGrouping: useGrouping, minimumIntegerDigits: minimumIntegerDigits, minimumFractionDigits: minimumFractionDigits, maximumFractionDigits: maximumFractionDigits, minimumSignificantDigits: minimumSignificantDigits, maximumSignificantDigits: maximumSignificantDigits, numberingSystem: numberingSystem, compactDisplay: compactDisplay, notation: notation, signDisplay: signDisplay, unit: unit, unitDisplay: unitDisplay, currencySign: currencySign, roundingPriority: roundingPriority, roundingIncrement: roundingIncrement, roundingMode: roundingMode, trailingZeroDisplay: trailingZeroDisplay});
  }
  function js_intl_ResolvedDateTimeFormatOptions_Companion_dto9vq_invoke_jkqnwo(locale, calendar, numberingSystem, timeZone, hour12, weekday, era, year, month, day, hour, minute, second, timeZoneName, formatMatcher, dateStyle, timeStyle, hourCycle, dayPeriod, fractionalSecondDigits) {
    hour12 = hour12 === VOID ? VOID : hour12;
    weekday = weekday === VOID ? VOID : weekday;
    era = era === VOID ? VOID : era;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    day = day === VOID ? VOID : day;
    hour = hour === VOID ? VOID : hour;
    minute = minute === VOID ? VOID : minute;
    second = second === VOID ? VOID : second;
    timeZoneName = timeZoneName === VOID ? VOID : timeZoneName;
    formatMatcher = formatMatcher === VOID ? VOID : formatMatcher;
    dateStyle = dateStyle === VOID ? VOID : dateStyle;
    timeStyle = timeStyle === VOID ? VOID : timeStyle;
    hourCycle = hourCycle === VOID ? VOID : hourCycle;
    dayPeriod = dayPeriod === VOID ? VOID : dayPeriod;
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    return {locale: locale, calendar: calendar, numberingSystem: numberingSystem, timeZone: timeZone, hour12: hour12, weekday: weekday, era: era, year: year, month: month, day: day, hour: hour, minute: minute, second: second, timeZoneName: timeZoneName, formatMatcher: formatMatcher, dateStyle: dateStyle, timeStyle: timeStyle, hourCycle: hourCycle, dayPeriod: dayPeriod, fractionalSecondDigits: fractionalSecondDigits};
  }
  function js_intl_ResolvedDateTimeFormatOptions_Companion_dto9vq_copy_1tks5(source, locale, calendar, numberingSystem, timeZone, hour12, weekday, era, year, month, day, hour, minute, second, timeZoneName, formatMatcher, dateStyle, timeStyle, hourCycle, dayPeriod, fractionalSecondDigits) {
    locale = locale === VOID ? VOID : locale;
    calendar = calendar === VOID ? VOID : calendar;
    numberingSystem = numberingSystem === VOID ? VOID : numberingSystem;
    timeZone = timeZone === VOID ? VOID : timeZone;
    hour12 = hour12 === VOID ? VOID : hour12;
    weekday = weekday === VOID ? VOID : weekday;
    era = era === VOID ? VOID : era;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    day = day === VOID ? VOID : day;
    hour = hour === VOID ? VOID : hour;
    minute = minute === VOID ? VOID : minute;
    second = second === VOID ? VOID : second;
    timeZoneName = timeZoneName === VOID ? VOID : timeZoneName;
    formatMatcher = formatMatcher === VOID ? VOID : formatMatcher;
    dateStyle = dateStyle === VOID ? VOID : dateStyle;
    timeStyle = timeStyle === VOID ? VOID : timeStyle;
    hourCycle = hourCycle === VOID ? VOID : hourCycle;
    dayPeriod = dayPeriod === VOID ? VOID : dayPeriod;
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    return Object.assign({}, source, {locale: locale, calendar: calendar, numberingSystem: numberingSystem, timeZone: timeZone, hour12: hour12, weekday: weekday, era: era, year: year, month: month, day: day, hour: hour, minute: minute, second: second, timeZoneName: timeZoneName, formatMatcher: formatMatcher, dateStyle: dateStyle, timeStyle: timeStyle, hourCycle: hourCycle, dayPeriod: dayPeriod, fractionalSecondDigits: fractionalSecondDigits});
  }
  function js_buffer_ArrayBufferOptions_Companion_v14pdg_invoke_jkqnwo(maxByteLength) {
    return {maxByteLength: maxByteLength};
  }
  function js_buffer_ArrayBufferOptions_Companion_v14pdg_copy_1tks5(source, maxByteLength) {
    maxByteLength = maxByteLength === VOID ? VOID : maxByteLength;
    return Object.assign({}, source, {maxByteLength: maxByteLength});
  }
  function resumeWithError(_this__u8e3s4, error) {
    // Inline function 'js.errors.toThrowable' call
    // Inline function 'kotlin.coroutines.resumeWithException' call
    var exception = toJsError(error);
    // Inline function 'kotlin.Companion.failure' call
    Companion_getInstance();
    var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception));
    _this__u8e3s4.resumeWith_dtxwbr_k$(tmp$ret$2);
    return Unit_getInstance();
  }
  function set_name(_this__u8e3s4, value) {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    _this__u8e3s4.name = value;
  }
  function get_name(_this__u8e3s4) {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.name;
  }
  function toJsError(_this__u8e3s4) {
    // Inline function 'js.errors.toJsErrorOrNull' call
    // Inline function 'js.reflect.upcast' call
    var tmp = _this__u8e3s4;
    var tmp0_elvis_lhs = tmp instanceof Error ? tmp : null;
    return tmp0_elvis_lhs == null ? wrapRawError(_this__u8e3s4) : tmp0_elvis_lhs;
  }
  function toJsErrorOrNull(_this__u8e3s4) {
    // Inline function 'js.reflect.upcast' call
    var tmp = _this__u8e3s4;
    return tmp instanceof Error ? tmp : null;
  }
  function JsErrorName(value) {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return value;
  }
  function get_RAW_ERROR_WRAPPER_TYPE() {
    _init_properties_wrapRawError_kt__75j3je();
    return RAW_ERROR_WRAPPER_TYPE;
  }
  var RAW_ERROR_WRAPPER_TYPE;
  function wrapRawError(value) {
    _init_properties_wrapRawError_kt__75j3je();
    var error = newThrowable("Kotlin raw error wrapper. Please check 'cause' for the original error");
    // Inline function 'js.errors.name' call
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    error.name = get_RAW_ERROR_WRAPPER_TYPE();
    Reflect.set(error, 'cause', value);
    return error;
  }
  var properties_initialized_wrapRawError_kt_t1ryt0;
  function _init_properties_wrapRawError_kt__75j3je() {
    if (!properties_initialized_wrapRawError_kt_t1ryt0) {
      properties_initialized_wrapRawError_kt_t1ryt0 = true;
      // Inline function 'js.errors.JsErrorName' call
      // Inline function 'js.reflect.unsafeCast' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      RAW_ERROR_WRAPPER_TYPE = 'KotlinRawErrorWrapper';
    }
  }
  function js_iterable_IteratorResult_Companion_7p0ehs_invoke_jkqnwo(done) {
    return {done: done};
  }
  function js_iterable_IteratorResult_Companion_7p0ehs_copy_1tks5(source, done) {
    done = done === VOID ? VOID : done;
    return Object.assign({}, source, {done: done});
  }
  function get_POW() {
    _init_properties_BigInt_kt__agomkx();
    return POW;
  }
  var POW;
  var properties_initialized_BigInt_kt_nhzooh;
  function _init_properties_BigInt_kt__agomkx() {
    if (!properties_initialized_BigInt_kt_nhzooh) {
      properties_initialized_BigInt_kt_nhzooh = true;
      POW = Function('base', 'exponent', 'return base ** exponent');
    }
  }
  function toLocaleString(_this__u8e3s4, locales) {
    return (new Number(_this__u8e3s4)).toLocaleString(locales);
  }
  function toLocaleString_0(_this__u8e3s4, locales) {
    return (new Number(_this__u8e3s4)).toLocaleString(locales);
  }
  function JsoDsl() {
  }
  protoOf(JsoDsl).equals = function (other) {
    if (!(other instanceof JsoDsl))
      return false;
    other instanceof JsoDsl || THROW_CCE();
    return true;
  };
  protoOf(JsoDsl).hashCode = function () {
    return 0;
  };
  protoOf(JsoDsl).toString = function () {
    return '@js.objects.JsoDsl(' + ')';
  };
  function js_objects_TypedPropertyDescriptor_Companion_xcwor1_invoke_jkqnwo(configurable, enumerable, value, writable, get, set) {
    configurable = configurable === VOID ? VOID : configurable;
    enumerable = enumerable === VOID ? VOID : enumerable;
    value = value === VOID ? VOID : value;
    writable = writable === VOID ? VOID : writable;
    get = get === VOID ? VOID : get;
    set = set === VOID ? VOID : set;
    return {configurable: configurable, enumerable: enumerable, value: value, writable: writable, get: get, set: set};
  }
  function js_objects_TypedPropertyDescriptor_Companion_xcwor1_copy_1tks5(source, configurable, enumerable, value, writable, get, set) {
    configurable = configurable === VOID ? VOID : configurable;
    enumerable = enumerable === VOID ? VOID : enumerable;
    value = value === VOID ? VOID : value;
    writable = writable === VOID ? VOID : writable;
    get = get === VOID ? VOID : get;
    set = set === VOID ? VOID : set;
    return Object.assign({}, source, {configurable: configurable, enumerable: enumerable, value: value, writable: writable, get: get, set: set});
  }
  function unsafeJso(block) {
    // Inline function 'js.objects.unsafeJso' call
    // Inline function 'kotlin.apply' call
    var this_0 = {};
    block(this_0);
    return this_0;
  }
  function get_DEFERRED() {
    _init_properties_Promise_deferred_kt__g1kxou();
    return DEFERRED;
  }
  var DEFERRED;
  var properties_initialized_Promise_deferred_kt_rg4w18;
  function _init_properties_Promise_deferred_kt__g1kxou() {
    if (!properties_initialized_Promise_deferred_kt_rg4w18) {
      properties_initialized_Promise_deferred_kt_rg4w18 = true;
      DEFERRED = Symbol('@@deferred');
    }
  }
  function await_0(_this__u8e3s4, $completion) {
    return awaitPromiseLike(_this__u8e3s4, $completion);
  }
  function thenTo(_this__u8e3s4, continuation) {
    thenToContinuation(_this__u8e3s4, continuation);
  }
  function js_promise_PromiseSettledResult_Companion_q7irkf_invoke_jkqnwo(status) {
    return {status: status};
  }
  function js_promise_PromiseSettledResult_Companion_q7irkf_copy_1tks5(source, status) {
    status = status === VOID ? VOID : status;
    return Object.assign({}, source, {status: status});
  }
  function js_promise_PromiseWithResolvers_Companion_fq3002_invoke_jkqnwo(promise, resolve, reject) {
    return {promise: promise, resolve: resolve, reject: reject};
  }
  function js_promise_PromiseWithResolvers_Companion_fq3002_copy_1tks5(source, promise, resolve, reject) {
    promise = promise === VOID ? VOID : promise;
    resolve = resolve === VOID ? VOID : resolve;
    reject = reject === VOID ? VOID : reject;
    return Object.assign({}, source, {promise: promise, resolve: resolve, reject: reject});
  }
  function awaitPromiseLike(promise, $completion) {
    var safe = SafeContinuation_init_$Create$(intercepted($completion));
    // Inline function 'js.promise.thenTo' call
    thenToContinuation(promise, safe);
    return safe.getOrThrow_23gqzp_k$();
  }
  function thenToContinuation(promise, continuation) {
    var tmp = thenToContinuation$lambda(continuation);
    promise.then(tmp, thenToContinuation$lambda_0(continuation));
  }
  function thenToContinuation$lambda($continuation) {
    return function (it) {
      // Inline function 'kotlin.coroutines.resume' call
      var this_0 = $continuation;
      // Inline function 'kotlin.Companion.success' call
      Companion_getInstance();
      var tmp$ret$1 = _Result___init__impl__xyqfz8(it);
      this_0.resumeWith_dtxwbr_k$(tmp$ret$1);
      return null;
    };
  }
  function thenToContinuation$lambda_0($continuation) {
    return function (it) {
      // Inline function 'js.coroutines.resumeWithError' call
      var tmp0 = $continuation;
      // Inline function 'js.errors.toThrowable' call
      // Inline function 'kotlin.coroutines.resumeWithException' call
      var exception = toJsError(it);
      // Inline function 'kotlin.Companion.failure' call
      Companion_getInstance();
      var tmp$ret$3 = _Result___init__impl__xyqfz8(createFailure(exception));
      tmp0.resumeWith_dtxwbr_k$(tmp$ret$3);
      return null;
    };
  }
  function js_temporal_ArithmeticOptions_Companion_eyavmz_invoke_jkqnwo(overflow) {
    overflow = overflow === VOID ? VOID : overflow;
    return {overflow: overflow};
  }
  function js_temporal_ArithmeticOptions_Companion_eyavmz_copy_1tks5(source, overflow) {
    overflow = overflow === VOID ? VOID : overflow;
    return Object.assign({}, source, {overflow: overflow});
  }
  function js_temporal_AssignmentOptions_Companion_mp2fbs_invoke_jkqnwo(overflow) {
    overflow = overflow === VOID ? VOID : overflow;
    return {overflow: overflow};
  }
  function js_temporal_AssignmentOptions_Companion_mp2fbs_copy_1tks5(source, overflow) {
    overflow = overflow === VOID ? VOID : overflow;
    return Object.assign({}, source, {overflow: overflow});
  }
  function js_temporal_CalendarTypeToStringOptions_Companion_1mtusx_invoke_jkqnwo(fractionalSecondDigits, smallestUnit, roundingMode, calendarName) {
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    calendarName = calendarName === VOID ? VOID : calendarName;
    return {fractionalSecondDigits: fractionalSecondDigits, smallestUnit: smallestUnit, roundingMode: roundingMode, calendarName: calendarName};
  }
  function js_temporal_CalendarTypeToStringOptions_Companion_1mtusx_copy_1tks5(source, fractionalSecondDigits, smallestUnit, roundingMode, calendarName) {
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    calendarName = calendarName === VOID ? VOID : calendarName;
    return Object.assign({}, source, {fractionalSecondDigits: fractionalSecondDigits, smallestUnit: smallestUnit, roundingMode: roundingMode, calendarName: calendarName});
  }
  function js_temporal_DifferenceOptions_Companion_xbb7uw_invoke_jkqnwo(smallestUnit, largestUnit, roundingIncrement, roundingMode) {
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    largestUnit = largestUnit === VOID ? VOID : largestUnit;
    roundingIncrement = roundingIncrement === VOID ? VOID : roundingIncrement;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    return {smallestUnit: smallestUnit, largestUnit: largestUnit, roundingIncrement: roundingIncrement, roundingMode: roundingMode};
  }
  function js_temporal_DifferenceOptions_Companion_xbb7uw_copy_1tks5(source, smallestUnit, largestUnit, roundingIncrement, roundingMode) {
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    largestUnit = largestUnit === VOID ? VOID : largestUnit;
    roundingIncrement = roundingIncrement === VOID ? VOID : roundingIncrement;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    return Object.assign({}, source, {smallestUnit: smallestUnit, largestUnit: largestUnit, roundingIncrement: roundingIncrement, roundingMode: roundingMode});
  }
  function js_temporal_DurationArithmeticOptions_Companion_p6mirt_invoke_jkqnwo(relativeTo) {
    relativeTo = relativeTo === VOID ? VOID : relativeTo;
    return {relativeTo: relativeTo};
  }
  function js_temporal_DurationArithmeticOptions_Companion_p6mirt_copy_1tks5(source, relativeTo) {
    relativeTo = relativeTo === VOID ? VOID : relativeTo;
    return Object.assign({}, source, {relativeTo: relativeTo});
  }
  function js_temporal_DurationLike_Companion_ttc8nk_invoke_jkqnwo(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds) {
    years = years === VOID ? VOID : years;
    months = months === VOID ? VOID : months;
    weeks = weeks === VOID ? VOID : weeks;
    days = days === VOID ? VOID : days;
    hours = hours === VOID ? VOID : hours;
    minutes = minutes === VOID ? VOID : minutes;
    seconds = seconds === VOID ? VOID : seconds;
    milliseconds = milliseconds === VOID ? VOID : milliseconds;
    microseconds = microseconds === VOID ? VOID : microseconds;
    nanoseconds = nanoseconds === VOID ? VOID : nanoseconds;
    return {years: years, months: months, weeks: weeks, days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds, microseconds: microseconds, nanoseconds: nanoseconds};
  }
  function js_temporal_DurationLike_Companion_ttc8nk_copy_1tks5(source, years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds) {
    years = years === VOID ? VOID : years;
    months = months === VOID ? VOID : months;
    weeks = weeks === VOID ? VOID : weeks;
    days = days === VOID ? VOID : days;
    hours = hours === VOID ? VOID : hours;
    minutes = minutes === VOID ? VOID : minutes;
    seconds = seconds === VOID ? VOID : seconds;
    milliseconds = milliseconds === VOID ? VOID : milliseconds;
    microseconds = microseconds === VOID ? VOID : microseconds;
    nanoseconds = nanoseconds === VOID ? VOID : nanoseconds;
    return Object.assign({}, source, {years: years, months: months, weeks: weeks, days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds, microseconds: microseconds, nanoseconds: nanoseconds});
  }
  function js_temporal_InstantToStringOptions_Companion_ed68ga_invoke_jkqnwo(fractionalSecondDigits, smallestUnit, roundingMode, timeZone) {
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    return {fractionalSecondDigits: fractionalSecondDigits, smallestUnit: smallestUnit, roundingMode: roundingMode, timeZone: timeZone};
  }
  function js_temporal_InstantToStringOptions_Companion_ed68ga_copy_1tks5(source, fractionalSecondDigits, smallestUnit, roundingMode, timeZone) {
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    timeZone = timeZone === VOID ? VOID : timeZone;
    return Object.assign({}, source, {fractionalSecondDigits: fractionalSecondDigits, smallestUnit: smallestUnit, roundingMode: roundingMode, timeZone: timeZone});
  }
  function js_temporal_OffsetDisambiguationOptions_Companion_m0ncbo_invoke_jkqnwo(offset) {
    offset = offset === VOID ? VOID : offset;
    return {offset: offset};
  }
  function js_temporal_OffsetDisambiguationOptions_Companion_m0ncbo_copy_1tks5(source, offset) {
    offset = offset === VOID ? VOID : offset;
    return Object.assign({}, source, {offset: offset});
  }
  function js_temporal_PlainDateISOFields_Companion_943d05_invoke_jkqnwo(isoYear, isoMonth, isoDay, calendar) {
    return {isoYear: isoYear, isoMonth: isoMonth, isoDay: isoDay, calendar: calendar};
  }
  function js_temporal_PlainDateISOFields_Companion_943d05_copy_1tks5(source, isoYear, isoMonth, isoDay, calendar) {
    isoYear = isoYear === VOID ? VOID : isoYear;
    isoMonth = isoMonth === VOID ? VOID : isoMonth;
    isoDay = isoDay === VOID ? VOID : isoDay;
    calendar = calendar === VOID ? VOID : calendar;
    return Object.assign({}, source, {isoYear: isoYear, isoMonth: isoMonth, isoDay: isoDay, calendar: calendar});
  }
  function js_temporal_PlainDateLike_Companion_4u2mna_invoke_jkqnwo(era, eraYear, year, month, monthCode, day, calendar) {
    era = era === VOID ? VOID : era;
    eraYear = eraYear === VOID ? VOID : eraYear;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    monthCode = monthCode === VOID ? VOID : monthCode;
    day = day === VOID ? VOID : day;
    calendar = calendar === VOID ? VOID : calendar;
    return {era: era, eraYear: eraYear, year: year, month: month, monthCode: monthCode, day: day, calendar: calendar};
  }
  function js_temporal_PlainDateLike_Companion_4u2mna_copy_1tks5(source, era, eraYear, year, month, monthCode, day, calendar) {
    era = era === VOID ? VOID : era;
    eraYear = eraYear === VOID ? VOID : eraYear;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    monthCode = monthCode === VOID ? VOID : monthCode;
    day = day === VOID ? VOID : day;
    calendar = calendar === VOID ? VOID : calendar;
    return Object.assign({}, source, {era: era, eraYear: eraYear, year: year, month: month, monthCode: monthCode, day: day, calendar: calendar});
  }
  function js_temporal_PlainDateTimeISOFields_Companion_1yoysi_invoke_jkqnwo(isoYear, isoMonth, isoDay, isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond, calendar) {
    return {isoYear: isoYear, isoMonth: isoMonth, isoDay: isoDay, isoHour: isoHour, isoMinute: isoMinute, isoSecond: isoSecond, isoMillisecond: isoMillisecond, isoMicrosecond: isoMicrosecond, isoNanosecond: isoNanosecond, calendar: calendar};
  }
  function js_temporal_PlainDateTimeISOFields_Companion_1yoysi_copy_1tks5(source, isoYear, isoMonth, isoDay, isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond, calendar) {
    isoYear = isoYear === VOID ? VOID : isoYear;
    isoMonth = isoMonth === VOID ? VOID : isoMonth;
    isoDay = isoDay === VOID ? VOID : isoDay;
    isoHour = isoHour === VOID ? VOID : isoHour;
    isoMinute = isoMinute === VOID ? VOID : isoMinute;
    isoSecond = isoSecond === VOID ? VOID : isoSecond;
    isoMillisecond = isoMillisecond === VOID ? VOID : isoMillisecond;
    isoMicrosecond = isoMicrosecond === VOID ? VOID : isoMicrosecond;
    isoNanosecond = isoNanosecond === VOID ? VOID : isoNanosecond;
    calendar = calendar === VOID ? VOID : calendar;
    return Object.assign({}, source, {isoYear: isoYear, isoMonth: isoMonth, isoDay: isoDay, isoHour: isoHour, isoMinute: isoMinute, isoSecond: isoSecond, isoMillisecond: isoMillisecond, isoMicrosecond: isoMicrosecond, isoNanosecond: isoNanosecond, calendar: calendar});
  }
  function js_temporal_PlainDateTimeLike_Companion_ksyyi5_invoke_jkqnwo(era, eraYear, year, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar) {
    era = era === VOID ? VOID : era;
    eraYear = eraYear === VOID ? VOID : eraYear;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    monthCode = monthCode === VOID ? VOID : monthCode;
    day = day === VOID ? VOID : day;
    hour = hour === VOID ? VOID : hour;
    minute = minute === VOID ? VOID : minute;
    second = second === VOID ? VOID : second;
    millisecond = millisecond === VOID ? VOID : millisecond;
    microsecond = microsecond === VOID ? VOID : microsecond;
    nanosecond = nanosecond === VOID ? VOID : nanosecond;
    calendar = calendar === VOID ? VOID : calendar;
    return {era: era, eraYear: eraYear, year: year, month: month, monthCode: monthCode, day: day, hour: hour, minute: minute, second: second, millisecond: millisecond, microsecond: microsecond, nanosecond: nanosecond, calendar: calendar};
  }
  function js_temporal_PlainDateTimeLike_Companion_ksyyi5_copy_1tks5(source, era, eraYear, year, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond, calendar) {
    era = era === VOID ? VOID : era;
    eraYear = eraYear === VOID ? VOID : eraYear;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    monthCode = monthCode === VOID ? VOID : monthCode;
    day = day === VOID ? VOID : day;
    hour = hour === VOID ? VOID : hour;
    minute = minute === VOID ? VOID : minute;
    second = second === VOID ? VOID : second;
    millisecond = millisecond === VOID ? VOID : millisecond;
    microsecond = microsecond === VOID ? VOID : microsecond;
    nanosecond = nanosecond === VOID ? VOID : nanosecond;
    calendar = calendar === VOID ? VOID : calendar;
    return Object.assign({}, source, {era: era, eraYear: eraYear, year: year, month: month, monthCode: monthCode, day: day, hour: hour, minute: minute, second: second, millisecond: millisecond, microsecond: microsecond, nanosecond: nanosecond, calendar: calendar});
  }
  function js_temporal_PlainMonthDay_ToPlainDateOptions_Companion_y45o0i_invoke_jkqnwo(year) {
    return {year: year};
  }
  function js_temporal_PlainMonthDay_ToPlainDateOptions_Companion_y45o0i_copy_1tks5(source, year) {
    year = year === VOID ? VOID : year;
    return Object.assign({}, source, {year: year});
  }
  function js_temporal_PlainMonthDayLike_Companion_7nfpu4_invoke_jkqnwo(era, eraYear, year, month, monthCode, day, calendar) {
    era = era === VOID ? VOID : era;
    eraYear = eraYear === VOID ? VOID : eraYear;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    monthCode = monthCode === VOID ? VOID : monthCode;
    day = day === VOID ? VOID : day;
    calendar = calendar === VOID ? VOID : calendar;
    return {era: era, eraYear: eraYear, year: year, month: month, monthCode: monthCode, day: day, calendar: calendar};
  }
  function js_temporal_PlainMonthDayLike_Companion_7nfpu4_copy_1tks5(source, era, eraYear, year, month, monthCode, day, calendar) {
    era = era === VOID ? VOID : era;
    eraYear = eraYear === VOID ? VOID : eraYear;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    monthCode = monthCode === VOID ? VOID : monthCode;
    day = day === VOID ? VOID : day;
    calendar = calendar === VOID ? VOID : calendar;
    return Object.assign({}, source, {era: era, eraYear: eraYear, year: year, month: month, monthCode: monthCode, day: day, calendar: calendar});
  }
  function js_temporal_PlainTimeISOFields_Companion_q5frho_invoke_jkqnwo(isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond) {
    return {isoHour: isoHour, isoMinute: isoMinute, isoSecond: isoSecond, isoMillisecond: isoMillisecond, isoMicrosecond: isoMicrosecond, isoNanosecond: isoNanosecond};
  }
  function js_temporal_PlainTimeISOFields_Companion_q5frho_copy_1tks5(source, isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond) {
    isoHour = isoHour === VOID ? VOID : isoHour;
    isoMinute = isoMinute === VOID ? VOID : isoMinute;
    isoSecond = isoSecond === VOID ? VOID : isoSecond;
    isoMillisecond = isoMillisecond === VOID ? VOID : isoMillisecond;
    isoMicrosecond = isoMicrosecond === VOID ? VOID : isoMicrosecond;
    isoNanosecond = isoNanosecond === VOID ? VOID : isoNanosecond;
    return Object.assign({}, source, {isoHour: isoHour, isoMinute: isoMinute, isoSecond: isoSecond, isoMillisecond: isoMillisecond, isoMicrosecond: isoMicrosecond, isoNanosecond: isoNanosecond});
  }
  function js_temporal_PlainTimeLike_Companion_kuia63_invoke_jkqnwo(hour, minute, second, millisecond, microsecond, nanosecond) {
    hour = hour === VOID ? VOID : hour;
    minute = minute === VOID ? VOID : minute;
    second = second === VOID ? VOID : second;
    millisecond = millisecond === VOID ? VOID : millisecond;
    microsecond = microsecond === VOID ? VOID : microsecond;
    nanosecond = nanosecond === VOID ? VOID : nanosecond;
    return {hour: hour, minute: minute, second: second, millisecond: millisecond, microsecond: microsecond, nanosecond: nanosecond};
  }
  function js_temporal_PlainTimeLike_Companion_kuia63_copy_1tks5(source, hour, minute, second, millisecond, microsecond, nanosecond) {
    hour = hour === VOID ? VOID : hour;
    minute = minute === VOID ? VOID : minute;
    second = second === VOID ? VOID : second;
    millisecond = millisecond === VOID ? VOID : millisecond;
    microsecond = microsecond === VOID ? VOID : microsecond;
    nanosecond = nanosecond === VOID ? VOID : nanosecond;
    return Object.assign({}, source, {hour: hour, minute: minute, second: second, millisecond: millisecond, microsecond: microsecond, nanosecond: nanosecond});
  }
  function js_temporal_PlainYearMonth_ToPlainDateOptions_Companion_bxxefn_invoke_jkqnwo(day) {
    return {day: day};
  }
  function js_temporal_PlainYearMonth_ToPlainDateOptions_Companion_bxxefn_copy_1tks5(source, day) {
    day = day === VOID ? VOID : day;
    return Object.assign({}, source, {day: day});
  }
  function js_temporal_PlainYearMonthLike_Companion_gokiej_invoke_jkqnwo(era, eraYear, year, month, monthCode, calendar) {
    era = era === VOID ? VOID : era;
    eraYear = eraYear === VOID ? VOID : eraYear;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    monthCode = monthCode === VOID ? VOID : monthCode;
    calendar = calendar === VOID ? VOID : calendar;
    return {era: era, eraYear: eraYear, year: year, month: month, monthCode: monthCode, calendar: calendar};
  }
  function js_temporal_PlainYearMonthLike_Companion_gokiej_copy_1tks5(source, era, eraYear, year, month, monthCode, calendar) {
    era = era === VOID ? VOID : era;
    eraYear = eraYear === VOID ? VOID : eraYear;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    monthCode = monthCode === VOID ? VOID : monthCode;
    calendar = calendar === VOID ? VOID : calendar;
    return Object.assign({}, source, {era: era, eraYear: eraYear, year: year, month: month, monthCode: monthCode, calendar: calendar});
  }
  function js_temporal_RoundTo_Companion_ca1xvk_invoke_jkqnwo(smallestUnit, roundingIncrement, roundingMode) {
    roundingIncrement = roundingIncrement === VOID ? VOID : roundingIncrement;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    return {smallestUnit: smallestUnit, roundingIncrement: roundingIncrement, roundingMode: roundingMode};
  }
  function js_temporal_RoundTo_Companion_ca1xvk_copy_1tks5(source, smallestUnit, roundingIncrement, roundingMode) {
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    roundingIncrement = roundingIncrement === VOID ? VOID : roundingIncrement;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    return Object.assign({}, source, {smallestUnit: smallestUnit, roundingIncrement: roundingIncrement, roundingMode: roundingMode});
  }
  function js_temporal_ShowCalendarOption_Companion_7nvpo5_invoke_jkqnwo(calendarName) {
    calendarName = calendarName === VOID ? VOID : calendarName;
    return {calendarName: calendarName};
  }
  function js_temporal_ShowCalendarOption_Companion_7nvpo5_copy_1tks5(source, calendarName) {
    calendarName = calendarName === VOID ? VOID : calendarName;
    return Object.assign({}, source, {calendarName: calendarName});
  }
  function js_temporal_ToInstantOptions_Companion_sfnl3x_invoke_jkqnwo(disambiguation) {
    disambiguation = disambiguation === VOID ? VOID : disambiguation;
    return {disambiguation: disambiguation};
  }
  function js_temporal_ToInstantOptions_Companion_sfnl3x_copy_1tks5(source, disambiguation) {
    disambiguation = disambiguation === VOID ? VOID : disambiguation;
    return Object.assign({}, source, {disambiguation: disambiguation});
  }
  function js_temporal_ToStringPrecisionOptions_Companion_cuqs9d_invoke_jkqnwo(fractionalSecondDigits, smallestUnit, roundingMode) {
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    return {fractionalSecondDigits: fractionalSecondDigits, smallestUnit: smallestUnit, roundingMode: roundingMode};
  }
  function js_temporal_ToStringPrecisionOptions_Companion_cuqs9d_copy_1tks5(source, fractionalSecondDigits, smallestUnit, roundingMode) {
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    return Object.assign({}, source, {fractionalSecondDigits: fractionalSecondDigits, smallestUnit: smallestUnit, roundingMode: roundingMode});
  }
  function js_temporal_ZonedDateTimeAssignmentOptions_Companion_803vdp_invoke_jkqnwo(overflow, disambiguation, offset) {
    overflow = overflow === VOID ? VOID : overflow;
    disambiguation = disambiguation === VOID ? VOID : disambiguation;
    offset = offset === VOID ? VOID : offset;
    return {overflow: overflow, disambiguation: disambiguation, offset: offset};
  }
  function js_temporal_ZonedDateTimeAssignmentOptions_Companion_803vdp_copy_1tks5(source, overflow, disambiguation, offset) {
    overflow = overflow === VOID ? VOID : overflow;
    disambiguation = disambiguation === VOID ? VOID : disambiguation;
    offset = offset === VOID ? VOID : offset;
    return Object.assign({}, source, {overflow: overflow, disambiguation: disambiguation, offset: offset});
  }
  function js_temporal_ZonedDateTimeISOFields_Companion_y5piz4_invoke_jkqnwo(isoYear, isoMonth, isoDay, isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond, offset, timeZone, calendar) {
    return {isoYear: isoYear, isoMonth: isoMonth, isoDay: isoDay, isoHour: isoHour, isoMinute: isoMinute, isoSecond: isoSecond, isoMillisecond: isoMillisecond, isoMicrosecond: isoMicrosecond, isoNanosecond: isoNanosecond, offset: offset, timeZone: timeZone, calendar: calendar};
  }
  function js_temporal_ZonedDateTimeISOFields_Companion_y5piz4_copy_1tks5(source, isoYear, isoMonth, isoDay, isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond, offset, timeZone, calendar) {
    isoYear = isoYear === VOID ? VOID : isoYear;
    isoMonth = isoMonth === VOID ? VOID : isoMonth;
    isoDay = isoDay === VOID ? VOID : isoDay;
    isoHour = isoHour === VOID ? VOID : isoHour;
    isoMinute = isoMinute === VOID ? VOID : isoMinute;
    isoSecond = isoSecond === VOID ? VOID : isoSecond;
    isoMillisecond = isoMillisecond === VOID ? VOID : isoMillisecond;
    isoMicrosecond = isoMicrosecond === VOID ? VOID : isoMicrosecond;
    isoNanosecond = isoNanosecond === VOID ? VOID : isoNanosecond;
    offset = offset === VOID ? VOID : offset;
    timeZone = timeZone === VOID ? VOID : timeZone;
    calendar = calendar === VOID ? VOID : calendar;
    return Object.assign({}, source, {isoYear: isoYear, isoMonth: isoMonth, isoDay: isoDay, isoHour: isoHour, isoMinute: isoMinute, isoSecond: isoSecond, isoMillisecond: isoMillisecond, isoMicrosecond: isoMicrosecond, isoNanosecond: isoNanosecond, offset: offset, timeZone: timeZone, calendar: calendar});
  }
  function js_temporal_ZonedDateTimeLike_Companion_b1boe7_invoke_jkqnwo(era, eraYear, year, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond, offset, timeZone, calendar) {
    era = era === VOID ? VOID : era;
    eraYear = eraYear === VOID ? VOID : eraYear;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    monthCode = monthCode === VOID ? VOID : monthCode;
    day = day === VOID ? VOID : day;
    hour = hour === VOID ? VOID : hour;
    minute = minute === VOID ? VOID : minute;
    second = second === VOID ? VOID : second;
    millisecond = millisecond === VOID ? VOID : millisecond;
    microsecond = microsecond === VOID ? VOID : microsecond;
    nanosecond = nanosecond === VOID ? VOID : nanosecond;
    offset = offset === VOID ? VOID : offset;
    timeZone = timeZone === VOID ? VOID : timeZone;
    calendar = calendar === VOID ? VOID : calendar;
    return {era: era, eraYear: eraYear, year: year, month: month, monthCode: monthCode, day: day, hour: hour, minute: minute, second: second, millisecond: millisecond, microsecond: microsecond, nanosecond: nanosecond, offset: offset, timeZone: timeZone, calendar: calendar};
  }
  function js_temporal_ZonedDateTimeLike_Companion_b1boe7_copy_1tks5(source, era, eraYear, year, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond, offset, timeZone, calendar) {
    era = era === VOID ? VOID : era;
    eraYear = eraYear === VOID ? VOID : eraYear;
    year = year === VOID ? VOID : year;
    month = month === VOID ? VOID : month;
    monthCode = monthCode === VOID ? VOID : monthCode;
    day = day === VOID ? VOID : day;
    hour = hour === VOID ? VOID : hour;
    minute = minute === VOID ? VOID : minute;
    second = second === VOID ? VOID : second;
    millisecond = millisecond === VOID ? VOID : millisecond;
    microsecond = microsecond === VOID ? VOID : microsecond;
    nanosecond = nanosecond === VOID ? VOID : nanosecond;
    offset = offset === VOID ? VOID : offset;
    timeZone = timeZone === VOID ? VOID : timeZone;
    calendar = calendar === VOID ? VOID : calendar;
    return Object.assign({}, source, {era: era, eraYear: eraYear, year: year, month: month, monthCode: monthCode, day: day, hour: hour, minute: minute, second: second, millisecond: millisecond, microsecond: microsecond, nanosecond: nanosecond, offset: offset, timeZone: timeZone, calendar: calendar});
  }
  function js_temporal_ZonedDateTimeToStringOptions_Companion_kpgy3o_invoke_jkqnwo(fractionalSecondDigits, smallestUnit, roundingMode, calendarName, timeZoneName, offset) {
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    calendarName = calendarName === VOID ? VOID : calendarName;
    timeZoneName = timeZoneName === VOID ? VOID : timeZoneName;
    offset = offset === VOID ? VOID : offset;
    return {fractionalSecondDigits: fractionalSecondDigits, smallestUnit: smallestUnit, roundingMode: roundingMode, calendarName: calendarName, timeZoneName: timeZoneName, offset: offset};
  }
  function js_temporal_ZonedDateTimeToStringOptions_Companion_kpgy3o_copy_1tks5(source, fractionalSecondDigits, smallestUnit, roundingMode, calendarName, timeZoneName, offset) {
    fractionalSecondDigits = fractionalSecondDigits === VOID ? VOID : fractionalSecondDigits;
    smallestUnit = smallestUnit === VOID ? VOID : smallestUnit;
    roundingMode = roundingMode === VOID ? VOID : roundingMode;
    calendarName = calendarName === VOID ? VOID : calendarName;
    timeZoneName = timeZoneName === VOID ? VOID : timeZoneName;
    offset = offset === VOID ? VOID : offset;
    return Object.assign({}, source, {fractionalSecondDigits: fractionalSecondDigits, smallestUnit: smallestUnit, roundingMode: roundingMode, calendarName: calendarName, timeZoneName: timeZoneName, offset: offset});
  }
  function js_typedarrays_FromBase64Options_Companion_no480c_invoke_jkqnwo(alphabet, lastChunkHandling) {
    alphabet = alphabet === VOID ? VOID : alphabet;
    lastChunkHandling = lastChunkHandling === VOID ? VOID : lastChunkHandling;
    return {alphabet: alphabet, lastChunkHandling: lastChunkHandling};
  }
  function js_typedarrays_FromBase64Options_Companion_no480c_copy_1tks5(source, alphabet, lastChunkHandling) {
    alphabet = alphabet === VOID ? VOID : alphabet;
    lastChunkHandling = lastChunkHandling === VOID ? VOID : lastChunkHandling;
    return Object.assign({}, source, {alphabet: alphabet, lastChunkHandling: lastChunkHandling});
  }
  function js_typedarrays_SetFromResult_Companion_9im63s_invoke_jkqnwo(read, written) {
    return {read: read, written: written};
  }
  function js_typedarrays_SetFromResult_Companion_9im63s_copy_1tks5(source, read, written) {
    read = read === VOID ? VOID : read;
    written = written === VOID ? VOID : written;
    return Object.assign({}, source, {read: read, written: written});
  }
  function js_typedarrays_ToBase64Options_Companion_tveapv_invoke_jkqnwo(alphabet, omitPadding) {
    alphabet = alphabet === VOID ? VOID : alphabet;
    omitPadding = omitPadding === VOID ? VOID : omitPadding;
    return {alphabet: alphabet, omitPadding: omitPadding};
  }
  function js_typedarrays_ToBase64Options_Companion_tveapv_copy_1tks5(source, alphabet, omitPadding) {
    alphabet = alphabet === VOID ? VOID : alphabet;
    omitPadding = omitPadding === VOID ? VOID : omitPadding;
    return Object.assign({}, source, {alphabet: alphabet, omitPadding: omitPadding});
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = awaitPromiseLike;
  _.$_$.b = toLocaleString_0;
  _.$_$.c = toLocaleString;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlin-js.js.map
