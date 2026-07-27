(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlin-web'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlin-web'.");
    }
    globalThis['kotlin-web'] = factory(typeof globalThis['kotlin-web'] === 'undefined' ? {} : globalThis['kotlin-web'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var VOID = kotlin_kotlin.$_$.d;
  var Unit_getInstance = kotlin_kotlin.$_$.w2;
  var THROW_CCE = kotlin_kotlin.$_$.cj;
  var protoOf = kotlin_kotlin.$_$.ue;
  var Annotation = kotlin_kotlin.$_$.gi;
  var initMetadataForClass = kotlin_kotlin.$_$.rd;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(ExperimentalWebApi, 'ExperimentalWebApi', VOID, VOID, [Annotation]);
  //endregion
  function web_blob_BlobPropertyBag_Companion_i2up1f_invoke_jkqnwo(endings, type) {
    endings = endings === VOID ? VOID : endings;
    type = type === VOID ? VOID : type;
    return {endings: endings, type: type};
  }
  function web_blob_BlobPropertyBag_Companion_i2up1f_copy_1tks5(source, endings, type) {
    endings = endings === VOID ? VOID : endings;
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {endings: endings, type: type});
  }
  function web_errors_ErrorEventInit_Companion_uhv8vr_invoke_jkqnwo(bubbles, cancelable, composed, colno, error, filename, lineno, message) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    colno = colno === VOID ? VOID : colno;
    error = error === VOID ? VOID : error;
    filename = filename === VOID ? VOID : filename;
    lineno = lineno === VOID ? VOID : lineno;
    message = message === VOID ? VOID : message;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, colno: colno, error: error, filename: filename, lineno: lineno, message: message};
  }
  function web_errors_ErrorEventInit_Companion_uhv8vr_copy_1tks5(source, bubbles, cancelable, composed, colno, error, filename, lineno, message) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    colno = colno === VOID ? VOID : colno;
    error = error === VOID ? VOID : error;
    filename = filename === VOID ? VOID : filename;
    lineno = lineno === VOID ? VOID : lineno;
    message = message === VOID ? VOID : message;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, colno: colno, error: error, filename: filename, lineno: lineno, message: message});
  }
  function web_events_AddEventListenerOptions_Companion_wlvtsc_invoke_jkqnwo(capture, signal, once, passive) {
    capture = capture === VOID ? VOID : capture;
    signal = signal === VOID ? VOID : signal;
    once = once === VOID ? VOID : once;
    passive = passive === VOID ? VOID : passive;
    return {capture: capture, signal: signal, once: once, passive: passive};
  }
  function web_events_AddEventListenerOptions_Companion_wlvtsc_copy_1tks5(source, capture, signal, once, passive) {
    capture = capture === VOID ? VOID : capture;
    signal = signal === VOID ? VOID : signal;
    once = once === VOID ? VOID : once;
    passive = passive === VOID ? VOID : passive;
    return Object.assign({}, source, {capture: capture, signal: signal, once: once, passive: passive});
  }
  function web_events_CustomEventInit_Companion_suw0fw_invoke_jkqnwo(bubbles, cancelable, composed, detail) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail};
  }
  function web_events_CustomEventInit_Companion_suw0fw_copy_1tks5(source, bubbles, cancelable, composed, detail) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail});
  }
  function web_events_EventInit_Companion_p3dt0t_invoke_jkqnwo(bubbles, cancelable, composed) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed};
  }
  function web_events_EventInit_Companion_p3dt0t_copy_1tks5(source, bubbles, cancelable, composed) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed});
  }
  function web_events_EventListenerOptions_Companion_omek6v_invoke_jkqnwo(capture) {
    capture = capture === VOID ? VOID : capture;
    return {capture: capture};
  }
  function web_events_EventListenerOptions_Companion_omek6v_copy_1tks5(source, capture) {
    capture = capture === VOID ? VOID : capture;
    return Object.assign({}, source, {capture: capture});
  }
  function EventType(value) {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return value;
  }
  function web_events_ProgressEventInit_Companion_j6z5xc_invoke_jkqnwo(bubbles, cancelable, composed, lengthComputable, loaded, total) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    lengthComputable = lengthComputable === VOID ? VOID : lengthComputable;
    loaded = loaded === VOID ? VOID : loaded;
    total = total === VOID ? VOID : total;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, lengthComputable: lengthComputable, loaded: loaded, total: total};
  }
  function web_events_ProgressEventInit_Companion_j6z5xc_copy_1tks5(source, bubbles, cancelable, composed, lengthComputable, loaded, total) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    lengthComputable = lengthComputable === VOID ? VOID : lengthComputable;
    loaded = loaded === VOID ? VOID : loaded;
    total = total === VOID ? VOID : total;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, lengthComputable: lengthComputable, loaded: loaded, total: total});
  }
  function web_file_FilePropertyBag_Companion_47kkgz_invoke_jkqnwo(endings, type, lastModified) {
    endings = endings === VOID ? VOID : endings;
    type = type === VOID ? VOID : type;
    lastModified = lastModified === VOID ? VOID : lastModified;
    return {endings: endings, type: type, lastModified: lastModified};
  }
  function web_file_FilePropertyBag_Companion_47kkgz_copy_1tks5(source, endings, type, lastModified) {
    endings = endings === VOID ? VOID : endings;
    type = type === VOID ? VOID : type;
    lastModified = lastModified === VOID ? VOID : lastModified;
    return Object.assign({}, source, {endings: endings, type: type, lastModified: lastModified});
  }
  function web_gpu_GPUBindGroupDescriptor_Companion_k7smnz_invoke_jkqnwo(label, entries, layout) {
    label = label === VOID ? VOID : label;
    return {label: label, entries: entries, layout: layout};
  }
  function web_gpu_GPUBindGroupDescriptor_Companion_k7smnz_copy_1tks5(source, label, entries, layout) {
    label = label === VOID ? VOID : label;
    entries = entries === VOID ? VOID : entries;
    layout = layout === VOID ? VOID : layout;
    return Object.assign({}, source, {label: label, entries: entries, layout: layout});
  }
  function web_gpu_GPUBindGroupEntry_Companion_ki0dwi_invoke_jkqnwo(binding, resource) {
    return {binding: binding, resource: resource};
  }
  function web_gpu_GPUBindGroupEntry_Companion_ki0dwi_copy_1tks5(source, binding, resource) {
    binding = binding === VOID ? VOID : binding;
    resource = resource === VOID ? VOID : resource;
    return Object.assign({}, source, {binding: binding, resource: resource});
  }
  function web_gpu_GPUBindGroupLayoutDescriptor_Companion_oitd3d_invoke_jkqnwo(label, entries) {
    label = label === VOID ? VOID : label;
    return {label: label, entries: entries};
  }
  function web_gpu_GPUBindGroupLayoutDescriptor_Companion_oitd3d_copy_1tks5(source, label, entries) {
    label = label === VOID ? VOID : label;
    entries = entries === VOID ? VOID : entries;
    return Object.assign({}, source, {label: label, entries: entries});
  }
  function web_gpu_GPUBindGroupLayoutEntry_Companion_52jd64_invoke_jkqnwo(binding, buffer, externalTexture, sampler, storageTexture, texture, visibility) {
    buffer = buffer === VOID ? VOID : buffer;
    externalTexture = externalTexture === VOID ? VOID : externalTexture;
    sampler = sampler === VOID ? VOID : sampler;
    storageTexture = storageTexture === VOID ? VOID : storageTexture;
    texture = texture === VOID ? VOID : texture;
    return {binding: binding, buffer: buffer, externalTexture: externalTexture, sampler: sampler, storageTexture: storageTexture, texture: texture, visibility: visibility};
  }
  function web_gpu_GPUBindGroupLayoutEntry_Companion_52jd64_copy_1tks5(source, binding, buffer, externalTexture, sampler, storageTexture, texture, visibility) {
    binding = binding === VOID ? VOID : binding;
    buffer = buffer === VOID ? VOID : buffer;
    externalTexture = externalTexture === VOID ? VOID : externalTexture;
    sampler = sampler === VOID ? VOID : sampler;
    storageTexture = storageTexture === VOID ? VOID : storageTexture;
    texture = texture === VOID ? VOID : texture;
    visibility = visibility === VOID ? VOID : visibility;
    return Object.assign({}, source, {binding: binding, buffer: buffer, externalTexture: externalTexture, sampler: sampler, storageTexture: storageTexture, texture: texture, visibility: visibility});
  }
  function web_gpu_GPUBlendComponent_Companion_2zssmy_invoke_jkqnwo(dstFactor, operation, srcFactor) {
    dstFactor = dstFactor === VOID ? VOID : dstFactor;
    operation = operation === VOID ? VOID : operation;
    srcFactor = srcFactor === VOID ? VOID : srcFactor;
    return {dstFactor: dstFactor, operation: operation, srcFactor: srcFactor};
  }
  function web_gpu_GPUBlendComponent_Companion_2zssmy_copy_1tks5(source, dstFactor, operation, srcFactor) {
    dstFactor = dstFactor === VOID ? VOID : dstFactor;
    operation = operation === VOID ? VOID : operation;
    srcFactor = srcFactor === VOID ? VOID : srcFactor;
    return Object.assign({}, source, {dstFactor: dstFactor, operation: operation, srcFactor: srcFactor});
  }
  function web_gpu_GPUBlendState_Companion_pn7eoe_invoke_jkqnwo(alpha, color) {
    return {alpha: alpha, color: color};
  }
  function web_gpu_GPUBlendState_Companion_pn7eoe_copy_1tks5(source, alpha, color) {
    alpha = alpha === VOID ? VOID : alpha;
    color = color === VOID ? VOID : color;
    return Object.assign({}, source, {alpha: alpha, color: color});
  }
  function web_gpu_GPUBufferBindingLayout_Companion_gqj1ib_invoke_jkqnwo(hasDynamicOffset, minBindingSize, type) {
    hasDynamicOffset = hasDynamicOffset === VOID ? VOID : hasDynamicOffset;
    minBindingSize = minBindingSize === VOID ? VOID : minBindingSize;
    type = type === VOID ? VOID : type;
    return {hasDynamicOffset: hasDynamicOffset, minBindingSize: minBindingSize, type: type};
  }
  function web_gpu_GPUBufferBindingLayout_Companion_gqj1ib_copy_1tks5(source, hasDynamicOffset, minBindingSize, type) {
    hasDynamicOffset = hasDynamicOffset === VOID ? VOID : hasDynamicOffset;
    minBindingSize = minBindingSize === VOID ? VOID : minBindingSize;
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {hasDynamicOffset: hasDynamicOffset, minBindingSize: minBindingSize, type: type});
  }
  function web_gpu_GPUBufferDescriptor_Companion_ukpgo3_invoke_jkqnwo(label, mappedAtCreation, size, usage) {
    label = label === VOID ? VOID : label;
    mappedAtCreation = mappedAtCreation === VOID ? VOID : mappedAtCreation;
    return {label: label, mappedAtCreation: mappedAtCreation, size: size, usage: usage};
  }
  function web_gpu_GPUBufferDescriptor_Companion_ukpgo3_copy_1tks5(source, label, mappedAtCreation, size, usage) {
    label = label === VOID ? VOID : label;
    mappedAtCreation = mappedAtCreation === VOID ? VOID : mappedAtCreation;
    size = size === VOID ? VOID : size;
    usage = usage === VOID ? VOID : usage;
    return Object.assign({}, source, {label: label, mappedAtCreation: mappedAtCreation, size: size, usage: usage});
  }
  function web_gpu_GPUColorDict_Companion_wg11ax_invoke_jkqnwo(a, b, g, r) {
    return {a: a, b: b, g: g, r: r};
  }
  function web_gpu_GPUColorDict_Companion_wg11ax_copy_1tks5(source, a, b, g, r) {
    a = a === VOID ? VOID : a;
    b = b === VOID ? VOID : b;
    g = g === VOID ? VOID : g;
    r = r === VOID ? VOID : r;
    return Object.assign({}, source, {a: a, b: b, g: g, r: r});
  }
  function web_gpu_GPUColorTargetState_Companion_6shuc5_invoke_jkqnwo(blend, format, writeMask) {
    blend = blend === VOID ? VOID : blend;
    writeMask = writeMask === VOID ? VOID : writeMask;
    return {blend: blend, format: format, writeMask: writeMask};
  }
  function web_gpu_GPUColorTargetState_Companion_6shuc5_copy_1tks5(source, blend, format, writeMask) {
    blend = blend === VOID ? VOID : blend;
    format = format === VOID ? VOID : format;
    writeMask = writeMask === VOID ? VOID : writeMask;
    return Object.assign({}, source, {blend: blend, format: format, writeMask: writeMask});
  }
  function web_gpu_GPUCommandBufferDescriptor_Companion_7o6mw8_invoke_jkqnwo(label) {
    label = label === VOID ? VOID : label;
    return {label: label};
  }
  function web_gpu_GPUCommandBufferDescriptor_Companion_7o6mw8_copy_1tks5(source, label) {
    label = label === VOID ? VOID : label;
    return Object.assign({}, source, {label: label});
  }
  function web_gpu_GPUCommandEncoderDescriptor_Companion_l1fc42_invoke_jkqnwo(label) {
    label = label === VOID ? VOID : label;
    return {label: label};
  }
  function web_gpu_GPUCommandEncoderDescriptor_Companion_l1fc42_copy_1tks5(source, label) {
    label = label === VOID ? VOID : label;
    return Object.assign({}, source, {label: label});
  }
  function web_gpu_GPUComputePassDescriptor_Companion_9lrb6t_invoke_jkqnwo(label, timestampWrites) {
    label = label === VOID ? VOID : label;
    timestampWrites = timestampWrites === VOID ? VOID : timestampWrites;
    return {label: label, timestampWrites: timestampWrites};
  }
  function web_gpu_GPUComputePassDescriptor_Companion_9lrb6t_copy_1tks5(source, label, timestampWrites) {
    label = label === VOID ? VOID : label;
    timestampWrites = timestampWrites === VOID ? VOID : timestampWrites;
    return Object.assign({}, source, {label: label, timestampWrites: timestampWrites});
  }
  function web_gpu_GPUComputePassTimestampWrites_Companion_cmv7qo_invoke_jkqnwo(beginningOfPassWriteIndex, endOfPassWriteIndex, querySet) {
    beginningOfPassWriteIndex = beginningOfPassWriteIndex === VOID ? VOID : beginningOfPassWriteIndex;
    endOfPassWriteIndex = endOfPassWriteIndex === VOID ? VOID : endOfPassWriteIndex;
    return {beginningOfPassWriteIndex: beginningOfPassWriteIndex, endOfPassWriteIndex: endOfPassWriteIndex, querySet: querySet};
  }
  function web_gpu_GPUComputePassTimestampWrites_Companion_cmv7qo_copy_1tks5(source, beginningOfPassWriteIndex, endOfPassWriteIndex, querySet) {
    beginningOfPassWriteIndex = beginningOfPassWriteIndex === VOID ? VOID : beginningOfPassWriteIndex;
    endOfPassWriteIndex = endOfPassWriteIndex === VOID ? VOID : endOfPassWriteIndex;
    querySet = querySet === VOID ? VOID : querySet;
    return Object.assign({}, source, {beginningOfPassWriteIndex: beginningOfPassWriteIndex, endOfPassWriteIndex: endOfPassWriteIndex, querySet: querySet});
  }
  function web_gpu_GPUComputePipelineDescriptor_Companion_fo44c6_invoke_jkqnwo(label, layout, compute) {
    label = label === VOID ? VOID : label;
    return {label: label, layout: layout, compute: compute};
  }
  function web_gpu_GPUComputePipelineDescriptor_Companion_fo44c6_copy_1tks5(source, label, layout, compute) {
    label = label === VOID ? VOID : label;
    layout = layout === VOID ? VOID : layout;
    compute = compute === VOID ? VOID : compute;
    return Object.assign({}, source, {label: label, layout: layout, compute: compute});
  }
  function web_gpu_GPUCopyExternalImageDestInfo_Companion_qpfquf_invoke_jkqnwo(aspect, mipLevel, origin, texture, colorSpace, premultipliedAlpha) {
    aspect = aspect === VOID ? VOID : aspect;
    mipLevel = mipLevel === VOID ? VOID : mipLevel;
    origin = origin === VOID ? VOID : origin;
    colorSpace = colorSpace === VOID ? VOID : colorSpace;
    premultipliedAlpha = premultipliedAlpha === VOID ? VOID : premultipliedAlpha;
    return {aspect: aspect, mipLevel: mipLevel, origin: origin, texture: texture, colorSpace: colorSpace, premultipliedAlpha: premultipliedAlpha};
  }
  function web_gpu_GPUCopyExternalImageDestInfo_Companion_qpfquf_copy_1tks5(source, aspect, mipLevel, origin, texture, colorSpace, premultipliedAlpha) {
    aspect = aspect === VOID ? VOID : aspect;
    mipLevel = mipLevel === VOID ? VOID : mipLevel;
    origin = origin === VOID ? VOID : origin;
    texture = texture === VOID ? VOID : texture;
    colorSpace = colorSpace === VOID ? VOID : colorSpace;
    premultipliedAlpha = premultipliedAlpha === VOID ? VOID : premultipliedAlpha;
    return Object.assign({}, source, {aspect: aspect, mipLevel: mipLevel, origin: origin, texture: texture, colorSpace: colorSpace, premultipliedAlpha: premultipliedAlpha});
  }
  function web_gpu_GPUCopyExternalImageSourceInfo_Companion_uk2wcy_invoke_jkqnwo(flipY, origin, source) {
    flipY = flipY === VOID ? VOID : flipY;
    origin = origin === VOID ? VOID : origin;
    return {flipY: flipY, origin: origin, source: source};
  }
  function web_gpu_GPUCopyExternalImageSourceInfo_Companion_uk2wcy_copy_1tks5(source, flipY, origin, source_0) {
    flipY = flipY === VOID ? VOID : flipY;
    origin = origin === VOID ? VOID : origin;
    source_0 = source_0 === VOID ? VOID : source_0;
    return Object.assign({}, source_0, {flipY: flipY, origin: origin, source: source_0});
  }
  function web_gpu_GPUDepthStencilState_Companion_icg1ty_invoke_jkqnwo(depthBias, depthBiasClamp, depthBiasSlopeScale, depthCompare, depthWriteEnabled, format, stencilBack, stencilFront, stencilReadMask, stencilWriteMask) {
    depthBias = depthBias === VOID ? VOID : depthBias;
    depthBiasClamp = depthBiasClamp === VOID ? VOID : depthBiasClamp;
    depthBiasSlopeScale = depthBiasSlopeScale === VOID ? VOID : depthBiasSlopeScale;
    depthCompare = depthCompare === VOID ? VOID : depthCompare;
    depthWriteEnabled = depthWriteEnabled === VOID ? VOID : depthWriteEnabled;
    stencilBack = stencilBack === VOID ? VOID : stencilBack;
    stencilFront = stencilFront === VOID ? VOID : stencilFront;
    stencilReadMask = stencilReadMask === VOID ? VOID : stencilReadMask;
    stencilWriteMask = stencilWriteMask === VOID ? VOID : stencilWriteMask;
    return {depthBias: depthBias, depthBiasClamp: depthBiasClamp, depthBiasSlopeScale: depthBiasSlopeScale, depthCompare: depthCompare, depthWriteEnabled: depthWriteEnabled, format: format, stencilBack: stencilBack, stencilFront: stencilFront, stencilReadMask: stencilReadMask, stencilWriteMask: stencilWriteMask};
  }
  function web_gpu_GPUDepthStencilState_Companion_icg1ty_copy_1tks5(source, depthBias, depthBiasClamp, depthBiasSlopeScale, depthCompare, depthWriteEnabled, format, stencilBack, stencilFront, stencilReadMask, stencilWriteMask) {
    depthBias = depthBias === VOID ? VOID : depthBias;
    depthBiasClamp = depthBiasClamp === VOID ? VOID : depthBiasClamp;
    depthBiasSlopeScale = depthBiasSlopeScale === VOID ? VOID : depthBiasSlopeScale;
    depthCompare = depthCompare === VOID ? VOID : depthCompare;
    depthWriteEnabled = depthWriteEnabled === VOID ? VOID : depthWriteEnabled;
    format = format === VOID ? VOID : format;
    stencilBack = stencilBack === VOID ? VOID : stencilBack;
    stencilFront = stencilFront === VOID ? VOID : stencilFront;
    stencilReadMask = stencilReadMask === VOID ? VOID : stencilReadMask;
    stencilWriteMask = stencilWriteMask === VOID ? VOID : stencilWriteMask;
    return Object.assign({}, source, {depthBias: depthBias, depthBiasClamp: depthBiasClamp, depthBiasSlopeScale: depthBiasSlopeScale, depthCompare: depthCompare, depthWriteEnabled: depthWriteEnabled, format: format, stencilBack: stencilBack, stencilFront: stencilFront, stencilReadMask: stencilReadMask, stencilWriteMask: stencilWriteMask});
  }
  function web_gpu_GPUDeviceDescriptor_Companion_hus12r_invoke_jkqnwo(label, defaultQueue, requiredFeatures, requiredLimits) {
    label = label === VOID ? VOID : label;
    defaultQueue = defaultQueue === VOID ? VOID : defaultQueue;
    requiredFeatures = requiredFeatures === VOID ? VOID : requiredFeatures;
    requiredLimits = requiredLimits === VOID ? VOID : requiredLimits;
    return {label: label, defaultQueue: defaultQueue, requiredFeatures: requiredFeatures, requiredLimits: requiredLimits};
  }
  function web_gpu_GPUDeviceDescriptor_Companion_hus12r_copy_1tks5(source, label, defaultQueue, requiredFeatures, requiredLimits) {
    label = label === VOID ? VOID : label;
    defaultQueue = defaultQueue === VOID ? VOID : defaultQueue;
    requiredFeatures = requiredFeatures === VOID ? VOID : requiredFeatures;
    requiredLimits = requiredLimits === VOID ? VOID : requiredLimits;
    return Object.assign({}, source, {label: label, defaultQueue: defaultQueue, requiredFeatures: requiredFeatures, requiredLimits: requiredLimits});
  }
  function web_gpu_GPUExtent3DDict_Companion_kl9473_invoke_jkqnwo(depthOrArrayLayers, height, width) {
    depthOrArrayLayers = depthOrArrayLayers === VOID ? VOID : depthOrArrayLayers;
    height = height === VOID ? VOID : height;
    return {depthOrArrayLayers: depthOrArrayLayers, height: height, width: width};
  }
  function web_gpu_GPUExtent3DDict_Companion_kl9473_copy_1tks5(source, depthOrArrayLayers, height, width) {
    depthOrArrayLayers = depthOrArrayLayers === VOID ? VOID : depthOrArrayLayers;
    height = height === VOID ? VOID : height;
    width = width === VOID ? VOID : width;
    return Object.assign({}, source, {depthOrArrayLayers: depthOrArrayLayers, height: height, width: width});
  }
  function web_gpu_GPUExternalTextureBindingLayout_Companion_32au25_invoke_jkqnwo() {
    return {};
  }
  function web_gpu_GPUExternalTextureBindingLayout_Companion_32au25_copy_1tks5(source) {
    return Object.assign({}, source, {});
  }
  function web_gpu_GPUExternalTextureDescriptor_Companion_mqz0kz_invoke_jkqnwo(label, colorSpace, source) {
    label = label === VOID ? VOID : label;
    colorSpace = colorSpace === VOID ? VOID : colorSpace;
    return {label: label, colorSpace: colorSpace, source: source};
  }
  function web_gpu_GPUExternalTextureDescriptor_Companion_mqz0kz_copy_1tks5(source, label, colorSpace, source_0) {
    label = label === VOID ? VOID : label;
    colorSpace = colorSpace === VOID ? VOID : colorSpace;
    source_0 = source_0 === VOID ? VOID : source_0;
    return Object.assign({}, source_0, {label: label, colorSpace: colorSpace, source: source_0});
  }
  function web_gpu_GPUFragmentState_Companion_u2r79r_invoke_jkqnwo(constants, entryPoint, module_0, targets) {
    constants = constants === VOID ? VOID : constants;
    entryPoint = entryPoint === VOID ? VOID : entryPoint;
    return {constants: constants, entryPoint: entryPoint, module: module_0, targets: targets};
  }
  function web_gpu_GPUFragmentState_Companion_u2r79r_copy_1tks5(source, constants, entryPoint, module_0, targets) {
    constants = constants === VOID ? VOID : constants;
    entryPoint = entryPoint === VOID ? VOID : entryPoint;
    module_0 = module_0 === VOID ? VOID : module_0;
    targets = targets === VOID ? VOID : targets;
    return Object.assign({}, source, {constants: constants, entryPoint: entryPoint, module: module_0, targets: targets});
  }
  function web_gpu_GPUMultisampleState_Companion_edqpz0_invoke_jkqnwo(alphaToCoverageEnabled, count, mask) {
    alphaToCoverageEnabled = alphaToCoverageEnabled === VOID ? VOID : alphaToCoverageEnabled;
    count = count === VOID ? VOID : count;
    mask = mask === VOID ? VOID : mask;
    return {alphaToCoverageEnabled: alphaToCoverageEnabled, count: count, mask: mask};
  }
  function web_gpu_GPUMultisampleState_Companion_edqpz0_copy_1tks5(source, alphaToCoverageEnabled, count, mask) {
    alphaToCoverageEnabled = alphaToCoverageEnabled === VOID ? VOID : alphaToCoverageEnabled;
    count = count === VOID ? VOID : count;
    mask = mask === VOID ? VOID : mask;
    return Object.assign({}, source, {alphaToCoverageEnabled: alphaToCoverageEnabled, count: count, mask: mask});
  }
  function web_gpu_GPUObjectDescriptorBase_Companion_ycz9tf_invoke_jkqnwo(label) {
    label = label === VOID ? VOID : label;
    return {label: label};
  }
  function web_gpu_GPUObjectDescriptorBase_Companion_ycz9tf_copy_1tks5(source, label) {
    label = label === VOID ? VOID : label;
    return Object.assign({}, source, {label: label});
  }
  function web_gpu_GPUOrigin2DDict_Companion_krehss_invoke_jkqnwo(x, y) {
    x = x === VOID ? VOID : x;
    y = y === VOID ? VOID : y;
    return {x: x, y: y};
  }
  function web_gpu_GPUOrigin2DDict_Companion_krehss_copy_1tks5(source, x, y) {
    x = x === VOID ? VOID : x;
    y = y === VOID ? VOID : y;
    return Object.assign({}, source, {x: x, y: y});
  }
  function web_gpu_GPUOrigin3DDict_Companion_cbfz3v_invoke_jkqnwo(x, y, z) {
    x = x === VOID ? VOID : x;
    y = y === VOID ? VOID : y;
    z = z === VOID ? VOID : z;
    return {x: x, y: y, z: z};
  }
  function web_gpu_GPUOrigin3DDict_Companion_cbfz3v_copy_1tks5(source, x, y, z) {
    x = x === VOID ? VOID : x;
    y = y === VOID ? VOID : y;
    z = z === VOID ? VOID : z;
    return Object.assign({}, source, {x: x, y: y, z: z});
  }
  function web_gpu_GPUPipelineDescriptorBase_Companion_kt8tu8_invoke_jkqnwo(label, layout) {
    label = label === VOID ? VOID : label;
    return {label: label, layout: layout};
  }
  function web_gpu_GPUPipelineDescriptorBase_Companion_kt8tu8_copy_1tks5(source, label, layout) {
    label = label === VOID ? VOID : label;
    layout = layout === VOID ? VOID : layout;
    return Object.assign({}, source, {label: label, layout: layout});
  }
  function web_gpu_GPUPipelineLayoutDescriptor_Companion_acrjav_invoke_jkqnwo(label, bindGroupLayouts) {
    label = label === VOID ? VOID : label;
    return {label: label, bindGroupLayouts: bindGroupLayouts};
  }
  function web_gpu_GPUPipelineLayoutDescriptor_Companion_acrjav_copy_1tks5(source, label, bindGroupLayouts) {
    label = label === VOID ? VOID : label;
    bindGroupLayouts = bindGroupLayouts === VOID ? VOID : bindGroupLayouts;
    return Object.assign({}, source, {label: label, bindGroupLayouts: bindGroupLayouts});
  }
  function web_gpu_GPUPrimitiveState_Companion_gsdfw8_invoke_jkqnwo(cullMode, frontFace, stripIndexFormat, topology, unclippedDepth) {
    cullMode = cullMode === VOID ? VOID : cullMode;
    frontFace = frontFace === VOID ? VOID : frontFace;
    stripIndexFormat = stripIndexFormat === VOID ? VOID : stripIndexFormat;
    topology = topology === VOID ? VOID : topology;
    unclippedDepth = unclippedDepth === VOID ? VOID : unclippedDepth;
    return {cullMode: cullMode, frontFace: frontFace, stripIndexFormat: stripIndexFormat, topology: topology, unclippedDepth: unclippedDepth};
  }
  function web_gpu_GPUPrimitiveState_Companion_gsdfw8_copy_1tks5(source, cullMode, frontFace, stripIndexFormat, topology, unclippedDepth) {
    cullMode = cullMode === VOID ? VOID : cullMode;
    frontFace = frontFace === VOID ? VOID : frontFace;
    stripIndexFormat = stripIndexFormat === VOID ? VOID : stripIndexFormat;
    topology = topology === VOID ? VOID : topology;
    unclippedDepth = unclippedDepth === VOID ? VOID : unclippedDepth;
    return Object.assign({}, source, {cullMode: cullMode, frontFace: frontFace, stripIndexFormat: stripIndexFormat, topology: topology, unclippedDepth: unclippedDepth});
  }
  function web_gpu_GPUProgrammableStage_Companion_3hksx5_invoke_jkqnwo(constants, entryPoint, module_0) {
    constants = constants === VOID ? VOID : constants;
    entryPoint = entryPoint === VOID ? VOID : entryPoint;
    return {constants: constants, entryPoint: entryPoint, module: module_0};
  }
  function web_gpu_GPUProgrammableStage_Companion_3hksx5_copy_1tks5(source, constants, entryPoint, module_0) {
    constants = constants === VOID ? VOID : constants;
    entryPoint = entryPoint === VOID ? VOID : entryPoint;
    module_0 = module_0 === VOID ? VOID : module_0;
    return Object.assign({}, source, {constants: constants, entryPoint: entryPoint, module: module_0});
  }
  function web_gpu_GPUQuerySetDescriptor_Companion_3gn79z_invoke_jkqnwo(label, count, type) {
    label = label === VOID ? VOID : label;
    return {label: label, count: count, type: type};
  }
  function web_gpu_GPUQuerySetDescriptor_Companion_3gn79z_copy_1tks5(source, label, count, type) {
    label = label === VOID ? VOID : label;
    count = count === VOID ? VOID : count;
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {label: label, count: count, type: type});
  }
  function web_gpu_GPUQueueDescriptor_Companion_qc99fy_invoke_jkqnwo(label) {
    label = label === VOID ? VOID : label;
    return {label: label};
  }
  function web_gpu_GPUQueueDescriptor_Companion_qc99fy_copy_1tks5(source, label) {
    label = label === VOID ? VOID : label;
    return Object.assign({}, source, {label: label});
  }
  function web_gpu_GPURenderBundleDescriptor_Companion_w2dej9_invoke_jkqnwo(label) {
    label = label === VOID ? VOID : label;
    return {label: label};
  }
  function web_gpu_GPURenderBundleDescriptor_Companion_w2dej9_copy_1tks5(source, label) {
    label = label === VOID ? VOID : label;
    return Object.assign({}, source, {label: label});
  }
  function web_gpu_GPURenderBundleEncoderDescriptor_Companion_e7dxb_invoke_jkqnwo(label, colorFormats, depthStencilFormat, sampleCount, depthReadOnly, stencilReadOnly) {
    label = label === VOID ? VOID : label;
    depthStencilFormat = depthStencilFormat === VOID ? VOID : depthStencilFormat;
    sampleCount = sampleCount === VOID ? VOID : sampleCount;
    depthReadOnly = depthReadOnly === VOID ? VOID : depthReadOnly;
    stencilReadOnly = stencilReadOnly === VOID ? VOID : stencilReadOnly;
    return {label: label, colorFormats: colorFormats, depthStencilFormat: depthStencilFormat, sampleCount: sampleCount, depthReadOnly: depthReadOnly, stencilReadOnly: stencilReadOnly};
  }
  function web_gpu_GPURenderBundleEncoderDescriptor_Companion_e7dxb_copy_1tks5(source, label, colorFormats, depthStencilFormat, sampleCount, depthReadOnly, stencilReadOnly) {
    label = label === VOID ? VOID : label;
    colorFormats = colorFormats === VOID ? VOID : colorFormats;
    depthStencilFormat = depthStencilFormat === VOID ? VOID : depthStencilFormat;
    sampleCount = sampleCount === VOID ? VOID : sampleCount;
    depthReadOnly = depthReadOnly === VOID ? VOID : depthReadOnly;
    stencilReadOnly = stencilReadOnly === VOID ? VOID : stencilReadOnly;
    return Object.assign({}, source, {label: label, colorFormats: colorFormats, depthStencilFormat: depthStencilFormat, sampleCount: sampleCount, depthReadOnly: depthReadOnly, stencilReadOnly: stencilReadOnly});
  }
  function web_gpu_GPURenderPassColorAttachment_Companion_q1oowd_invoke_jkqnwo(clearValue, depthSlice, loadOp, resolveTarget, storeOp, view) {
    clearValue = clearValue === VOID ? VOID : clearValue;
    depthSlice = depthSlice === VOID ? VOID : depthSlice;
    resolveTarget = resolveTarget === VOID ? VOID : resolveTarget;
    return {clearValue: clearValue, depthSlice: depthSlice, loadOp: loadOp, resolveTarget: resolveTarget, storeOp: storeOp, view: view};
  }
  function web_gpu_GPURenderPassColorAttachment_Companion_q1oowd_copy_1tks5(source, clearValue, depthSlice, loadOp, resolveTarget, storeOp, view) {
    clearValue = clearValue === VOID ? VOID : clearValue;
    depthSlice = depthSlice === VOID ? VOID : depthSlice;
    loadOp = loadOp === VOID ? VOID : loadOp;
    resolveTarget = resolveTarget === VOID ? VOID : resolveTarget;
    storeOp = storeOp === VOID ? VOID : storeOp;
    view = view === VOID ? VOID : view;
    return Object.assign({}, source, {clearValue: clearValue, depthSlice: depthSlice, loadOp: loadOp, resolveTarget: resolveTarget, storeOp: storeOp, view: view});
  }
  function web_gpu_GPURenderPassDepthStencilAttachment_Companion_3g5d4h_invoke_jkqnwo(depthClearValue, depthLoadOp, depthReadOnly, depthStoreOp, stencilClearValue, stencilLoadOp, stencilReadOnly, stencilStoreOp, view) {
    depthClearValue = depthClearValue === VOID ? VOID : depthClearValue;
    depthLoadOp = depthLoadOp === VOID ? VOID : depthLoadOp;
    depthReadOnly = depthReadOnly === VOID ? VOID : depthReadOnly;
    depthStoreOp = depthStoreOp === VOID ? VOID : depthStoreOp;
    stencilClearValue = stencilClearValue === VOID ? VOID : stencilClearValue;
    stencilLoadOp = stencilLoadOp === VOID ? VOID : stencilLoadOp;
    stencilReadOnly = stencilReadOnly === VOID ? VOID : stencilReadOnly;
    stencilStoreOp = stencilStoreOp === VOID ? VOID : stencilStoreOp;
    return {depthClearValue: depthClearValue, depthLoadOp: depthLoadOp, depthReadOnly: depthReadOnly, depthStoreOp: depthStoreOp, stencilClearValue: stencilClearValue, stencilLoadOp: stencilLoadOp, stencilReadOnly: stencilReadOnly, stencilStoreOp: stencilStoreOp, view: view};
  }
  function web_gpu_GPURenderPassDepthStencilAttachment_Companion_3g5d4h_copy_1tks5(source, depthClearValue, depthLoadOp, depthReadOnly, depthStoreOp, stencilClearValue, stencilLoadOp, stencilReadOnly, stencilStoreOp, view) {
    depthClearValue = depthClearValue === VOID ? VOID : depthClearValue;
    depthLoadOp = depthLoadOp === VOID ? VOID : depthLoadOp;
    depthReadOnly = depthReadOnly === VOID ? VOID : depthReadOnly;
    depthStoreOp = depthStoreOp === VOID ? VOID : depthStoreOp;
    stencilClearValue = stencilClearValue === VOID ? VOID : stencilClearValue;
    stencilLoadOp = stencilLoadOp === VOID ? VOID : stencilLoadOp;
    stencilReadOnly = stencilReadOnly === VOID ? VOID : stencilReadOnly;
    stencilStoreOp = stencilStoreOp === VOID ? VOID : stencilStoreOp;
    view = view === VOID ? VOID : view;
    return Object.assign({}, source, {depthClearValue: depthClearValue, depthLoadOp: depthLoadOp, depthReadOnly: depthReadOnly, depthStoreOp: depthStoreOp, stencilClearValue: stencilClearValue, stencilLoadOp: stencilLoadOp, stencilReadOnly: stencilReadOnly, stencilStoreOp: stencilStoreOp, view: view});
  }
  function web_gpu_GPURenderPassDescriptor_Companion_kwmgdg_invoke_jkqnwo(label, colorAttachments, depthStencilAttachment, maxDrawCount, occlusionQuerySet, timestampWrites) {
    label = label === VOID ? VOID : label;
    depthStencilAttachment = depthStencilAttachment === VOID ? VOID : depthStencilAttachment;
    maxDrawCount = maxDrawCount === VOID ? VOID : maxDrawCount;
    occlusionQuerySet = occlusionQuerySet === VOID ? VOID : occlusionQuerySet;
    timestampWrites = timestampWrites === VOID ? VOID : timestampWrites;
    return {label: label, colorAttachments: colorAttachments, depthStencilAttachment: depthStencilAttachment, maxDrawCount: maxDrawCount, occlusionQuerySet: occlusionQuerySet, timestampWrites: timestampWrites};
  }
  function web_gpu_GPURenderPassDescriptor_Companion_kwmgdg_copy_1tks5(source, label, colorAttachments, depthStencilAttachment, maxDrawCount, occlusionQuerySet, timestampWrites) {
    label = label === VOID ? VOID : label;
    colorAttachments = colorAttachments === VOID ? VOID : colorAttachments;
    depthStencilAttachment = depthStencilAttachment === VOID ? VOID : depthStencilAttachment;
    maxDrawCount = maxDrawCount === VOID ? VOID : maxDrawCount;
    occlusionQuerySet = occlusionQuerySet === VOID ? VOID : occlusionQuerySet;
    timestampWrites = timestampWrites === VOID ? VOID : timestampWrites;
    return Object.assign({}, source, {label: label, colorAttachments: colorAttachments, depthStencilAttachment: depthStencilAttachment, maxDrawCount: maxDrawCount, occlusionQuerySet: occlusionQuerySet, timestampWrites: timestampWrites});
  }
  function web_gpu_GPURenderPassLayout_Companion_iiqr6p_invoke_jkqnwo(label, colorFormats, depthStencilFormat, sampleCount) {
    label = label === VOID ? VOID : label;
    depthStencilFormat = depthStencilFormat === VOID ? VOID : depthStencilFormat;
    sampleCount = sampleCount === VOID ? VOID : sampleCount;
    return {label: label, colorFormats: colorFormats, depthStencilFormat: depthStencilFormat, sampleCount: sampleCount};
  }
  function web_gpu_GPURenderPassLayout_Companion_iiqr6p_copy_1tks5(source, label, colorFormats, depthStencilFormat, sampleCount) {
    label = label === VOID ? VOID : label;
    colorFormats = colorFormats === VOID ? VOID : colorFormats;
    depthStencilFormat = depthStencilFormat === VOID ? VOID : depthStencilFormat;
    sampleCount = sampleCount === VOID ? VOID : sampleCount;
    return Object.assign({}, source, {label: label, colorFormats: colorFormats, depthStencilFormat: depthStencilFormat, sampleCount: sampleCount});
  }
  function web_gpu_GPURenderPassTimestampWrites_Companion_63jjgx_invoke_jkqnwo(beginningOfPassWriteIndex, endOfPassWriteIndex, querySet) {
    beginningOfPassWriteIndex = beginningOfPassWriteIndex === VOID ? VOID : beginningOfPassWriteIndex;
    endOfPassWriteIndex = endOfPassWriteIndex === VOID ? VOID : endOfPassWriteIndex;
    return {beginningOfPassWriteIndex: beginningOfPassWriteIndex, endOfPassWriteIndex: endOfPassWriteIndex, querySet: querySet};
  }
  function web_gpu_GPURenderPassTimestampWrites_Companion_63jjgx_copy_1tks5(source, beginningOfPassWriteIndex, endOfPassWriteIndex, querySet) {
    beginningOfPassWriteIndex = beginningOfPassWriteIndex === VOID ? VOID : beginningOfPassWriteIndex;
    endOfPassWriteIndex = endOfPassWriteIndex === VOID ? VOID : endOfPassWriteIndex;
    querySet = querySet === VOID ? VOID : querySet;
    return Object.assign({}, source, {beginningOfPassWriteIndex: beginningOfPassWriteIndex, endOfPassWriteIndex: endOfPassWriteIndex, querySet: querySet});
  }
  function web_gpu_GPURenderPipelineDescriptor_Companion_l79ymj_invoke_jkqnwo(label, layout, depthStencil, fragment, multisample, primitive, vertex) {
    label = label === VOID ? VOID : label;
    depthStencil = depthStencil === VOID ? VOID : depthStencil;
    fragment = fragment === VOID ? VOID : fragment;
    multisample = multisample === VOID ? VOID : multisample;
    primitive = primitive === VOID ? VOID : primitive;
    return {label: label, layout: layout, depthStencil: depthStencil, fragment: fragment, multisample: multisample, primitive: primitive, vertex: vertex};
  }
  function web_gpu_GPURenderPipelineDescriptor_Companion_l79ymj_copy_1tks5(source, label, layout, depthStencil, fragment, multisample, primitive, vertex) {
    label = label === VOID ? VOID : label;
    layout = layout === VOID ? VOID : layout;
    depthStencil = depthStencil === VOID ? VOID : depthStencil;
    fragment = fragment === VOID ? VOID : fragment;
    multisample = multisample === VOID ? VOID : multisample;
    primitive = primitive === VOID ? VOID : primitive;
    vertex = vertex === VOID ? VOID : vertex;
    return Object.assign({}, source, {label: label, layout: layout, depthStencil: depthStencil, fragment: fragment, multisample: multisample, primitive: primitive, vertex: vertex});
  }
  function web_gpu_GPURequestAdapterOptions_Companion_ykf190_invoke_jkqnwo(forceFallbackAdapter, powerPreference) {
    forceFallbackAdapter = forceFallbackAdapter === VOID ? VOID : forceFallbackAdapter;
    powerPreference = powerPreference === VOID ? VOID : powerPreference;
    return {forceFallbackAdapter: forceFallbackAdapter, powerPreference: powerPreference};
  }
  function web_gpu_GPURequestAdapterOptions_Companion_ykf190_copy_1tks5(source, forceFallbackAdapter, powerPreference) {
    forceFallbackAdapter = forceFallbackAdapter === VOID ? VOID : forceFallbackAdapter;
    powerPreference = powerPreference === VOID ? VOID : powerPreference;
    return Object.assign({}, source, {forceFallbackAdapter: forceFallbackAdapter, powerPreference: powerPreference});
  }
  function web_gpu_GPUSamplerBindingLayout_Companion_pcucnf_invoke_jkqnwo(type) {
    type = type === VOID ? VOID : type;
    return {type: type};
  }
  function web_gpu_GPUSamplerBindingLayout_Companion_pcucnf_copy_1tks5(source, type) {
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {type: type});
  }
  function web_gpu_GPUSamplerDescriptor_Companion_y6btyz_invoke_jkqnwo(label, addressModeU, addressModeV, addressModeW, compare, lodMaxClamp, lodMinClamp, magFilter, maxAnisotropy, minFilter, mipmapFilter) {
    label = label === VOID ? VOID : label;
    addressModeU = addressModeU === VOID ? VOID : addressModeU;
    addressModeV = addressModeV === VOID ? VOID : addressModeV;
    addressModeW = addressModeW === VOID ? VOID : addressModeW;
    compare = compare === VOID ? VOID : compare;
    lodMaxClamp = lodMaxClamp === VOID ? VOID : lodMaxClamp;
    lodMinClamp = lodMinClamp === VOID ? VOID : lodMinClamp;
    magFilter = magFilter === VOID ? VOID : magFilter;
    maxAnisotropy = maxAnisotropy === VOID ? VOID : maxAnisotropy;
    minFilter = minFilter === VOID ? VOID : minFilter;
    mipmapFilter = mipmapFilter === VOID ? VOID : mipmapFilter;
    return {label: label, addressModeU: addressModeU, addressModeV: addressModeV, addressModeW: addressModeW, compare: compare, lodMaxClamp: lodMaxClamp, lodMinClamp: lodMinClamp, magFilter: magFilter, maxAnisotropy: maxAnisotropy, minFilter: minFilter, mipmapFilter: mipmapFilter};
  }
  function web_gpu_GPUSamplerDescriptor_Companion_y6btyz_copy_1tks5(source, label, addressModeU, addressModeV, addressModeW, compare, lodMaxClamp, lodMinClamp, magFilter, maxAnisotropy, minFilter, mipmapFilter) {
    label = label === VOID ? VOID : label;
    addressModeU = addressModeU === VOID ? VOID : addressModeU;
    addressModeV = addressModeV === VOID ? VOID : addressModeV;
    addressModeW = addressModeW === VOID ? VOID : addressModeW;
    compare = compare === VOID ? VOID : compare;
    lodMaxClamp = lodMaxClamp === VOID ? VOID : lodMaxClamp;
    lodMinClamp = lodMinClamp === VOID ? VOID : lodMinClamp;
    magFilter = magFilter === VOID ? VOID : magFilter;
    maxAnisotropy = maxAnisotropy === VOID ? VOID : maxAnisotropy;
    minFilter = minFilter === VOID ? VOID : minFilter;
    mipmapFilter = mipmapFilter === VOID ? VOID : mipmapFilter;
    return Object.assign({}, source, {label: label, addressModeU: addressModeU, addressModeV: addressModeV, addressModeW: addressModeW, compare: compare, lodMaxClamp: lodMaxClamp, lodMinClamp: lodMinClamp, magFilter: magFilter, maxAnisotropy: maxAnisotropy, minFilter: minFilter, mipmapFilter: mipmapFilter});
  }
  function web_gpu_GPUShaderModuleDescriptor_Companion_icsqxa_invoke_jkqnwo(label, code) {
    label = label === VOID ? VOID : label;
    return {label: label, code: code};
  }
  function web_gpu_GPUShaderModuleDescriptor_Companion_icsqxa_copy_1tks5(source, label, code) {
    label = label === VOID ? VOID : label;
    code = code === VOID ? VOID : code;
    return Object.assign({}, source, {label: label, code: code});
  }
  function web_gpu_GPUStencilFaceState_Companion_jq6tp6_invoke_jkqnwo(compare, depthFailOp, failOp, passOp) {
    compare = compare === VOID ? VOID : compare;
    depthFailOp = depthFailOp === VOID ? VOID : depthFailOp;
    failOp = failOp === VOID ? VOID : failOp;
    passOp = passOp === VOID ? VOID : passOp;
    return {compare: compare, depthFailOp: depthFailOp, failOp: failOp, passOp: passOp};
  }
  function web_gpu_GPUStencilFaceState_Companion_jq6tp6_copy_1tks5(source, compare, depthFailOp, failOp, passOp) {
    compare = compare === VOID ? VOID : compare;
    depthFailOp = depthFailOp === VOID ? VOID : depthFailOp;
    failOp = failOp === VOID ? VOID : failOp;
    passOp = passOp === VOID ? VOID : passOp;
    return Object.assign({}, source, {compare: compare, depthFailOp: depthFailOp, failOp: failOp, passOp: passOp});
  }
  function web_gpu_GPUStorageTextureBindingLayout_Companion_ukr6il_invoke_jkqnwo(access, format, viewDimension) {
    access = access === VOID ? VOID : access;
    viewDimension = viewDimension === VOID ? VOID : viewDimension;
    return {access: access, format: format, viewDimension: viewDimension};
  }
  function web_gpu_GPUStorageTextureBindingLayout_Companion_ukr6il_copy_1tks5(source, access, format, viewDimension) {
    access = access === VOID ? VOID : access;
    format = format === VOID ? VOID : format;
    viewDimension = viewDimension === VOID ? VOID : viewDimension;
    return Object.assign({}, source, {access: access, format: format, viewDimension: viewDimension});
  }
  function web_gpu_GPUTexelCopyBufferInfo_Companion_1ppp4v_invoke_jkqnwo(bytesPerRow, offset, rowsPerImage, buffer) {
    bytesPerRow = bytesPerRow === VOID ? VOID : bytesPerRow;
    offset = offset === VOID ? VOID : offset;
    rowsPerImage = rowsPerImage === VOID ? VOID : rowsPerImage;
    return {bytesPerRow: bytesPerRow, offset: offset, rowsPerImage: rowsPerImage, buffer: buffer};
  }
  function web_gpu_GPUTexelCopyBufferInfo_Companion_1ppp4v_copy_1tks5(source, bytesPerRow, offset, rowsPerImage, buffer) {
    bytesPerRow = bytesPerRow === VOID ? VOID : bytesPerRow;
    offset = offset === VOID ? VOID : offset;
    rowsPerImage = rowsPerImage === VOID ? VOID : rowsPerImage;
    buffer = buffer === VOID ? VOID : buffer;
    return Object.assign({}, source, {bytesPerRow: bytesPerRow, offset: offset, rowsPerImage: rowsPerImage, buffer: buffer});
  }
  function web_gpu_GPUTexelCopyBufferLayout_Companion_splfln_invoke_jkqnwo(bytesPerRow, offset, rowsPerImage) {
    bytesPerRow = bytesPerRow === VOID ? VOID : bytesPerRow;
    offset = offset === VOID ? VOID : offset;
    rowsPerImage = rowsPerImage === VOID ? VOID : rowsPerImage;
    return {bytesPerRow: bytesPerRow, offset: offset, rowsPerImage: rowsPerImage};
  }
  function web_gpu_GPUTexelCopyBufferLayout_Companion_splfln_copy_1tks5(source, bytesPerRow, offset, rowsPerImage) {
    bytesPerRow = bytesPerRow === VOID ? VOID : bytesPerRow;
    offset = offset === VOID ? VOID : offset;
    rowsPerImage = rowsPerImage === VOID ? VOID : rowsPerImage;
    return Object.assign({}, source, {bytesPerRow: bytesPerRow, offset: offset, rowsPerImage: rowsPerImage});
  }
  function web_gpu_GPUTexelCopyTextureInfo_Companion_omogic_invoke_jkqnwo(aspect, mipLevel, origin, texture) {
    aspect = aspect === VOID ? VOID : aspect;
    mipLevel = mipLevel === VOID ? VOID : mipLevel;
    origin = origin === VOID ? VOID : origin;
    return {aspect: aspect, mipLevel: mipLevel, origin: origin, texture: texture};
  }
  function web_gpu_GPUTexelCopyTextureInfo_Companion_omogic_copy_1tks5(source, aspect, mipLevel, origin, texture) {
    aspect = aspect === VOID ? VOID : aspect;
    mipLevel = mipLevel === VOID ? VOID : mipLevel;
    origin = origin === VOID ? VOID : origin;
    texture = texture === VOID ? VOID : texture;
    return Object.assign({}, source, {aspect: aspect, mipLevel: mipLevel, origin: origin, texture: texture});
  }
  function web_gpu_GPUTextureBindingLayout_Companion_ygmdj2_invoke_jkqnwo(multisampled, sampleType, viewDimension) {
    multisampled = multisampled === VOID ? VOID : multisampled;
    sampleType = sampleType === VOID ? VOID : sampleType;
    viewDimension = viewDimension === VOID ? VOID : viewDimension;
    return {multisampled: multisampled, sampleType: sampleType, viewDimension: viewDimension};
  }
  function web_gpu_GPUTextureBindingLayout_Companion_ygmdj2_copy_1tks5(source, multisampled, sampleType, viewDimension) {
    multisampled = multisampled === VOID ? VOID : multisampled;
    sampleType = sampleType === VOID ? VOID : sampleType;
    viewDimension = viewDimension === VOID ? VOID : viewDimension;
    return Object.assign({}, source, {multisampled: multisampled, sampleType: sampleType, viewDimension: viewDimension});
  }
  function web_gpu_GPUTextureDescriptor_Companion_dfj1ug_invoke_jkqnwo(label, dimension, format, mipLevelCount, sampleCount, size, usage, viewFormats) {
    label = label === VOID ? VOID : label;
    dimension = dimension === VOID ? VOID : dimension;
    mipLevelCount = mipLevelCount === VOID ? VOID : mipLevelCount;
    sampleCount = sampleCount === VOID ? VOID : sampleCount;
    viewFormats = viewFormats === VOID ? VOID : viewFormats;
    return {label: label, dimension: dimension, format: format, mipLevelCount: mipLevelCount, sampleCount: sampleCount, size: size, usage: usage, viewFormats: viewFormats};
  }
  function web_gpu_GPUTextureDescriptor_Companion_dfj1ug_copy_1tks5(source, label, dimension, format, mipLevelCount, sampleCount, size, usage, viewFormats) {
    label = label === VOID ? VOID : label;
    dimension = dimension === VOID ? VOID : dimension;
    format = format === VOID ? VOID : format;
    mipLevelCount = mipLevelCount === VOID ? VOID : mipLevelCount;
    sampleCount = sampleCount === VOID ? VOID : sampleCount;
    size = size === VOID ? VOID : size;
    usage = usage === VOID ? VOID : usage;
    viewFormats = viewFormats === VOID ? VOID : viewFormats;
    return Object.assign({}, source, {label: label, dimension: dimension, format: format, mipLevelCount: mipLevelCount, sampleCount: sampleCount, size: size, usage: usage, viewFormats: viewFormats});
  }
  function web_gpu_GPUTextureViewDescriptor_Companion_63ocf1_invoke_jkqnwo(label, arrayLayerCount, aspect, baseArrayLayer, baseMipLevel, dimension, format, mipLevelCount, usage) {
    label = label === VOID ? VOID : label;
    arrayLayerCount = arrayLayerCount === VOID ? VOID : arrayLayerCount;
    aspect = aspect === VOID ? VOID : aspect;
    baseArrayLayer = baseArrayLayer === VOID ? VOID : baseArrayLayer;
    baseMipLevel = baseMipLevel === VOID ? VOID : baseMipLevel;
    dimension = dimension === VOID ? VOID : dimension;
    format = format === VOID ? VOID : format;
    mipLevelCount = mipLevelCount === VOID ? VOID : mipLevelCount;
    usage = usage === VOID ? VOID : usage;
    return {label: label, arrayLayerCount: arrayLayerCount, aspect: aspect, baseArrayLayer: baseArrayLayer, baseMipLevel: baseMipLevel, dimension: dimension, format: format, mipLevelCount: mipLevelCount, usage: usage};
  }
  function web_gpu_GPUTextureViewDescriptor_Companion_63ocf1_copy_1tks5(source, label, arrayLayerCount, aspect, baseArrayLayer, baseMipLevel, dimension, format, mipLevelCount, usage) {
    label = label === VOID ? VOID : label;
    arrayLayerCount = arrayLayerCount === VOID ? VOID : arrayLayerCount;
    aspect = aspect === VOID ? VOID : aspect;
    baseArrayLayer = baseArrayLayer === VOID ? VOID : baseArrayLayer;
    baseMipLevel = baseMipLevel === VOID ? VOID : baseMipLevel;
    dimension = dimension === VOID ? VOID : dimension;
    format = format === VOID ? VOID : format;
    mipLevelCount = mipLevelCount === VOID ? VOID : mipLevelCount;
    usage = usage === VOID ? VOID : usage;
    return Object.assign({}, source, {label: label, arrayLayerCount: arrayLayerCount, aspect: aspect, baseArrayLayer: baseArrayLayer, baseMipLevel: baseMipLevel, dimension: dimension, format: format, mipLevelCount: mipLevelCount, usage: usage});
  }
  function web_gpu_GPUUncapturedErrorEventInit_Companion_l9d0cn_invoke_jkqnwo(bubbles, cancelable, composed, error) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, error: error};
  }
  function web_gpu_GPUUncapturedErrorEventInit_Companion_l9d0cn_copy_1tks5(source, bubbles, cancelable, composed, error) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    error = error === VOID ? VOID : error;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, error: error});
  }
  function web_gpu_GPUVertexAttribute_Companion_9hu9dm_invoke_jkqnwo(format, offset, shaderLocation) {
    return {format: format, offset: offset, shaderLocation: shaderLocation};
  }
  function web_gpu_GPUVertexAttribute_Companion_9hu9dm_copy_1tks5(source, format, offset, shaderLocation) {
    format = format === VOID ? VOID : format;
    offset = offset === VOID ? VOID : offset;
    shaderLocation = shaderLocation === VOID ? VOID : shaderLocation;
    return Object.assign({}, source, {format: format, offset: offset, shaderLocation: shaderLocation});
  }
  function web_gpu_GPUVertexBufferLayout_Companion_9es8h0_invoke_jkqnwo(arrayStride, attributes, stepMode) {
    stepMode = stepMode === VOID ? VOID : stepMode;
    return {arrayStride: arrayStride, attributes: attributes, stepMode: stepMode};
  }
  function web_gpu_GPUVertexBufferLayout_Companion_9es8h0_copy_1tks5(source, arrayStride, attributes, stepMode) {
    arrayStride = arrayStride === VOID ? VOID : arrayStride;
    attributes = attributes === VOID ? VOID : attributes;
    stepMode = stepMode === VOID ? VOID : stepMode;
    return Object.assign({}, source, {arrayStride: arrayStride, attributes: attributes, stepMode: stepMode});
  }
  function web_gpu_GPUVertexState_Companion_z5a3ln_invoke_jkqnwo(constants, entryPoint, module_0, buffers) {
    constants = constants === VOID ? VOID : constants;
    entryPoint = entryPoint === VOID ? VOID : entryPoint;
    buffers = buffers === VOID ? VOID : buffers;
    return {constants: constants, entryPoint: entryPoint, module: module_0, buffers: buffers};
  }
  function web_gpu_GPUVertexState_Companion_z5a3ln_copy_1tks5(source, constants, entryPoint, module_0, buffers) {
    constants = constants === VOID ? VOID : constants;
    entryPoint = entryPoint === VOID ? VOID : entryPoint;
    module_0 = module_0 === VOID ? VOID : module_0;
    buffers = buffers === VOID ? VOID : buffers;
    return Object.assign({}, source, {constants: constants, entryPoint: entryPoint, module: module_0, buffers: buffers});
  }
  function BodyInit(value) {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return value;
  }
  function web_http_RequestInit_Companion_29acb5_invoke_jkqnwo(signal, body, cache, credentials, headers, integrity, keepalive, method, mode, priority, redirect, referrer, referrerPolicy) {
    signal = signal === VOID ? VOID : signal;
    body = body === VOID ? VOID : body;
    cache = cache === VOID ? VOID : cache;
    credentials = credentials === VOID ? VOID : credentials;
    headers = headers === VOID ? VOID : headers;
    integrity = integrity === VOID ? VOID : integrity;
    keepalive = keepalive === VOID ? VOID : keepalive;
    method = method === VOID ? VOID : method;
    mode = mode === VOID ? VOID : mode;
    priority = priority === VOID ? VOID : priority;
    redirect = redirect === VOID ? VOID : redirect;
    referrer = referrer === VOID ? VOID : referrer;
    referrerPolicy = referrerPolicy === VOID ? VOID : referrerPolicy;
    return {signal: signal, body: body, cache: cache, credentials: credentials, headers: headers, integrity: integrity, keepalive: keepalive, method: method, mode: mode, priority: priority, redirect: redirect, referrer: referrer, referrerPolicy: referrerPolicy};
  }
  function web_http_RequestInit_Companion_29acb5_copy_1tks5(source, signal, body, cache, credentials, headers, integrity, keepalive, method, mode, priority, redirect, referrer, referrerPolicy) {
    signal = signal === VOID ? VOID : signal;
    body = body === VOID ? VOID : body;
    cache = cache === VOID ? VOID : cache;
    credentials = credentials === VOID ? VOID : credentials;
    headers = headers === VOID ? VOID : headers;
    integrity = integrity === VOID ? VOID : integrity;
    keepalive = keepalive === VOID ? VOID : keepalive;
    method = method === VOID ? VOID : method;
    mode = mode === VOID ? VOID : mode;
    priority = priority === VOID ? VOID : priority;
    redirect = redirect === VOID ? VOID : redirect;
    referrer = referrer === VOID ? VOID : referrer;
    referrerPolicy = referrerPolicy === VOID ? VOID : referrerPolicy;
    return Object.assign({}, source, {signal: signal, body: body, cache: cache, credentials: credentials, headers: headers, integrity: integrity, keepalive: keepalive, method: method, mode: mode, priority: priority, redirect: redirect, referrer: referrer, referrerPolicy: referrerPolicy});
  }
  function web_http_ResponseInit_Companion_o2f51_invoke_jkqnwo(headers, status, statusText) {
    headers = headers === VOID ? VOID : headers;
    status = status === VOID ? VOID : status;
    statusText = statusText === VOID ? VOID : statusText;
    return {headers: headers, status: status, statusText: statusText};
  }
  function web_http_ResponseInit_Companion_o2f51_copy_1tks5(source, headers, status, statusText) {
    headers = headers === VOID ? VOID : headers;
    status = status === VOID ? VOID : status;
    statusText = statusText === VOID ? VOID : statusText;
    return Object.assign({}, source, {headers: headers, status: status, statusText: statusText});
  }
  function web_locks_LockInfo_Companion_xc47qv_invoke_jkqnwo(clientId, mode, name) {
    clientId = clientId === VOID ? VOID : clientId;
    mode = mode === VOID ? VOID : mode;
    name = name === VOID ? VOID : name;
    return {clientId: clientId, mode: mode, name: name};
  }
  function web_locks_LockInfo_Companion_xc47qv_copy_1tks5(source, clientId, mode, name) {
    clientId = clientId === VOID ? VOID : clientId;
    mode = mode === VOID ? VOID : mode;
    name = name === VOID ? VOID : name;
    return Object.assign({}, source, {clientId: clientId, mode: mode, name: name});
  }
  function web_locks_LockManagerSnapshot_Companion_pxhtus_invoke_jkqnwo(held, pending) {
    held = held === VOID ? VOID : held;
    pending = pending === VOID ? VOID : pending;
    return {held: held, pending: pending};
  }
  function web_locks_LockManagerSnapshot_Companion_pxhtus_copy_1tks5(source, held, pending) {
    held = held === VOID ? VOID : held;
    pending = pending === VOID ? VOID : pending;
    return Object.assign({}, source, {held: held, pending: pending});
  }
  function web_locks_LockOptions_Companion_w5z50x_invoke_jkqnwo(signal, ifAvailable, mode, steal) {
    signal = signal === VOID ? VOID : signal;
    ifAvailable = ifAvailable === VOID ? VOID : ifAvailable;
    mode = mode === VOID ? VOID : mode;
    steal = steal === VOID ? VOID : steal;
    return {signal: signal, ifAvailable: ifAvailable, mode: mode, steal: steal};
  }
  function web_locks_LockOptions_Companion_w5z50x_copy_1tks5(source, signal, ifAvailable, mode, steal) {
    signal = signal === VOID ? VOID : signal;
    ifAvailable = ifAvailable === VOID ? VOID : ifAvailable;
    mode = mode === VOID ? VOID : mode;
    steal = steal === VOID ? VOID : steal;
    return Object.assign({}, source, {signal: signal, ifAvailable: ifAvailable, mode: mode, steal: steal});
  }
  function web_messaging_MessageEventInit_Companion_s45kij_invoke_jkqnwo(bubbles, cancelable, composed, data, lastEventId, origin, ports, source) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    data = data === VOID ? VOID : data;
    lastEventId = lastEventId === VOID ? VOID : lastEventId;
    origin = origin === VOID ? VOID : origin;
    ports = ports === VOID ? VOID : ports;
    source = source === VOID ? VOID : source;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, data: data, lastEventId: lastEventId, origin: origin, ports: ports, source: source};
  }
  function web_messaging_MessageEventInit_Companion_s45kij_copy_1tks5(source, bubbles, cancelable, composed, data, lastEventId, origin, ports, source_0) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    data = data === VOID ? VOID : data;
    lastEventId = lastEventId === VOID ? VOID : lastEventId;
    origin = origin === VOID ? VOID : origin;
    ports = ports === VOID ? VOID : ports;
    source_0 = source_0 === VOID ? VOID : source_0;
    return Object.assign({}, source_0, {bubbles: bubbles, cancelable: cancelable, composed: composed, data: data, lastEventId: lastEventId, origin: origin, ports: ports, source: source_0});
  }
  function web_promise_PromiseRejectionEventInit_Companion_yeq91v_invoke_jkqnwo(bubbles, cancelable, composed, promise, reason) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    reason = reason === VOID ? VOID : reason;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, promise: promise, reason: reason};
  }
  function web_promise_PromiseRejectionEventInit_Companion_yeq91v_copy_1tks5(source, bubbles, cancelable, composed, promise, reason) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    promise = promise === VOID ? VOID : promise;
    reason = reason === VOID ? VOID : reason;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, promise: promise, reason: reason});
  }
  function web_serialization_StructuredSerializeOptions_Companion_trjf9h_invoke_jkqnwo(transfer) {
    transfer = transfer === VOID ? VOID : transfer;
    return {transfer: transfer};
  }
  function web_serialization_StructuredSerializeOptions_Companion_trjf9h_copy_1tks5(source, transfer) {
    transfer = transfer === VOID ? VOID : transfer;
    return Object.assign({}, source, {transfer: transfer});
  }
  function web_sockets_CloseEventInit_Companion_pblki0_invoke_jkqnwo(bubbles, cancelable, composed, code, reason, wasClean) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    code = code === VOID ? VOID : code;
    reason = reason === VOID ? VOID : reason;
    wasClean = wasClean === VOID ? VOID : wasClean;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, code: code, reason: reason, wasClean: wasClean};
  }
  function web_sockets_CloseEventInit_Companion_pblki0_copy_1tks5(source, bubbles, cancelable, composed, code, reason, wasClean) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    code = code === VOID ? VOID : code;
    reason = reason === VOID ? VOID : reason;
    wasClean = wasClean === VOID ? VOID : wasClean;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, code: code, reason: reason, wasClean: wasClean});
  }
  function web_sse_EventSourceInit_Companion_910bz4_invoke_jkqnwo(withCredentials) {
    withCredentials = withCredentials === VOID ? VOID : withCredentials;
    return {withCredentials: withCredentials};
  }
  function web_sse_EventSourceInit_Companion_910bz4_copy_1tks5(source, withCredentials) {
    withCredentials = withCredentials === VOID ? VOID : withCredentials;
    return Object.assign({}, source, {withCredentials: withCredentials});
  }
  function web_streams_ReadableStreamGetReaderOptions_Companion_4l3xi0_invoke_jkqnwo(mode) {
    mode = mode === VOID ? VOID : mode;
    return {mode: mode};
  }
  function web_streams_ReadableStreamGetReaderOptions_Companion_4l3xi0_copy_1tks5(source, mode) {
    mode = mode === VOID ? VOID : mode;
    return Object.assign({}, source, {mode: mode});
  }
  function web_streams_ReadableStreamIteratorOptions_Companion_iv9w89_invoke_jkqnwo(preventCancel) {
    preventCancel = preventCancel === VOID ? VOID : preventCancel;
    return {preventCancel: preventCancel};
  }
  function web_streams_ReadableStreamIteratorOptions_Companion_iv9w89_copy_1tks5(source, preventCancel) {
    preventCancel = preventCancel === VOID ? VOID : preventCancel;
    return Object.assign({}, source, {preventCancel: preventCancel});
  }
  function web_streams_ReadableStreamReadResult_Companion_2awley_invoke_jkqnwo(done, value) {
    value = value === VOID ? VOID : value;
    return {done: done, value: value};
  }
  function web_streams_ReadableStreamReadResult_Companion_2awley_copy_1tks5(source, done, value) {
    done = done === VOID ? VOID : done;
    value = value === VOID ? VOID : value;
    return Object.assign({}, source, {done: done, value: value});
  }
  function web_streams_ReadableWritablePair_Companion_1iuqrh_invoke_jkqnwo(readable, writable) {
    return {readable: readable, writable: writable};
  }
  function web_streams_ReadableWritablePair_Companion_1iuqrh_copy_1tks5(source, readable, writable) {
    readable = readable === VOID ? VOID : readable;
    writable = writable === VOID ? VOID : writable;
    return Object.assign({}, source, {readable: readable, writable: writable});
  }
  function web_streams_StreamPipeOptions_Companion_7cu6d5_invoke_jkqnwo(signal, preventAbort, preventCancel, preventClose) {
    signal = signal === VOID ? VOID : signal;
    preventAbort = preventAbort === VOID ? VOID : preventAbort;
    preventCancel = preventCancel === VOID ? VOID : preventCancel;
    preventClose = preventClose === VOID ? VOID : preventClose;
    return {signal: signal, preventAbort: preventAbort, preventCancel: preventCancel, preventClose: preventClose};
  }
  function web_streams_StreamPipeOptions_Companion_7cu6d5_copy_1tks5(source, signal, preventAbort, preventCancel, preventClose) {
    signal = signal === VOID ? VOID : signal;
    preventAbort = preventAbort === VOID ? VOID : preventAbort;
    preventCancel = preventCancel === VOID ? VOID : preventCancel;
    preventClose = preventClose === VOID ? VOID : preventClose;
    return Object.assign({}, source, {signal: signal, preventAbort: preventAbort, preventCancel: preventCancel, preventClose: preventClose});
  }
  function web_streams_UnderlyingByteSource_Companion_e0f8vh_invoke_jkqnwo(autoAllocateChunkSize, cancel, pull, start, type) {
    autoAllocateChunkSize = autoAllocateChunkSize === VOID ? VOID : autoAllocateChunkSize;
    cancel = cancel === VOID ? VOID : cancel;
    pull = pull === VOID ? VOID : pull;
    start = start === VOID ? VOID : start;
    return {autoAllocateChunkSize: autoAllocateChunkSize, cancel: cancel, pull: pull, start: start, type: type};
  }
  function web_streams_UnderlyingByteSource_Companion_e0f8vh_copy_1tks5(source, autoAllocateChunkSize, cancel, pull, start, type) {
    autoAllocateChunkSize = autoAllocateChunkSize === VOID ? VOID : autoAllocateChunkSize;
    cancel = cancel === VOID ? VOID : cancel;
    pull = pull === VOID ? VOID : pull;
    start = start === VOID ? VOID : start;
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {autoAllocateChunkSize: autoAllocateChunkSize, cancel: cancel, pull: pull, start: start, type: type});
  }
  function web_streams_UnderlyingDefaultSource_Companion_ouf5g8_invoke_jkqnwo(cancel, pull, start) {
    cancel = cancel === VOID ? VOID : cancel;
    pull = pull === VOID ? VOID : pull;
    start = start === VOID ? VOID : start;
    return {cancel: cancel, pull: pull, start: start};
  }
  function web_streams_UnderlyingDefaultSource_Companion_ouf5g8_copy_1tks5(source, cancel, pull, start) {
    cancel = cancel === VOID ? VOID : cancel;
    pull = pull === VOID ? VOID : pull;
    start = start === VOID ? VOID : start;
    return Object.assign({}, source, {cancel: cancel, pull: pull, start: start});
  }
  function web_streams_UnderlyingSink_Companion_ebsm3h_invoke_jkqnwo(abort, close, start, write) {
    abort = abort === VOID ? VOID : abort;
    close = close === VOID ? VOID : close;
    start = start === VOID ? VOID : start;
    write = write === VOID ? VOID : write;
    return {abort: abort, close: close, start: start, write: write};
  }
  function web_streams_UnderlyingSink_Companion_ebsm3h_copy_1tks5(source, abort, close, start, write) {
    abort = abort === VOID ? VOID : abort;
    close = close === VOID ? VOID : close;
    start = start === VOID ? VOID : start;
    write = write === VOID ? VOID : write;
    return Object.assign({}, source, {abort: abort, close: close, start: start, write: write});
  }
  function web_streams_UnderlyingSource_Companion_4gsppn_invoke_jkqnwo(autoAllocateChunkSize, cancel, pull, start, type) {
    autoAllocateChunkSize = autoAllocateChunkSize === VOID ? VOID : autoAllocateChunkSize;
    cancel = cancel === VOID ? VOID : cancel;
    pull = pull === VOID ? VOID : pull;
    start = start === VOID ? VOID : start;
    type = type === VOID ? VOID : type;
    return {autoAllocateChunkSize: autoAllocateChunkSize, cancel: cancel, pull: pull, start: start, type: type};
  }
  function web_streams_UnderlyingSource_Companion_4gsppn_copy_1tks5(source, autoAllocateChunkSize, cancel, pull, start, type) {
    autoAllocateChunkSize = autoAllocateChunkSize === VOID ? VOID : autoAllocateChunkSize;
    cancel = cancel === VOID ? VOID : cancel;
    pull = pull === VOID ? VOID : pull;
    start = start === VOID ? VOID : start;
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {autoAllocateChunkSize: autoAllocateChunkSize, cancel: cancel, pull: pull, start: start, type: type});
  }
  function web_abort_Abortable_Companion_286ws0_invoke_jkqnwo(signal) {
    signal = signal === VOID ? VOID : signal;
    return {signal: signal};
  }
  function web_abort_Abortable_Companion_286ws0_copy_1tks5(source, signal) {
    signal = signal === VOID ? VOID : signal;
    return Object.assign({}, source, {signal: signal});
  }
  function EventHandler(handler) {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return handler;
  }
  function EventHandler_0(handler) {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return handler;
  }
  function addEventListener(_this__u8e3s4, type, handler, options) {
    var tmp;
    if (options === VOID) {
      // Inline function 'js.objects.unsafeJso' call
      tmp = {};
    } else {
      tmp = options;
    }
    options = tmp;
    _this__u8e3s4.addEventListener(type, handler, options);
  }
  function web_events_ObservableEventListenerOptions_Companion_8omwr8_invoke_jkqnwo(capture, passive) {
    capture = capture === VOID ? VOID : capture;
    passive = passive === VOID ? VOID : passive;
    return {capture: capture, passive: passive};
  }
  function web_events_ObservableEventListenerOptions_Companion_8omwr8_copy_1tks5(source, capture, passive) {
    capture = capture === VOID ? VOID : capture;
    passive = passive === VOID ? VOID : passive;
    return Object.assign({}, source, {capture: capture, passive: passive});
  }
  function ExperimentalWebApi() {
  }
  protoOf(ExperimentalWebApi).equals = function (other) {
    if (!(other instanceof ExperimentalWebApi))
      return false;
    other instanceof ExperimentalWebApi || THROW_CCE();
    return true;
  };
  protoOf(ExperimentalWebApi).hashCode = function () {
    return 0;
  };
  protoOf(ExperimentalWebApi).toString = function () {
    return '@web.experimental.ExperimentalWebApi(' + ')';
  };
  function web_observable_ObservableInspector_Companion_qc3sx_invoke_jkqnwo(next, error, complete, subscribe, abort) {
    next = next === VOID ? VOID : next;
    error = error === VOID ? VOID : error;
    complete = complete === VOID ? VOID : complete;
    subscribe = subscribe === VOID ? VOID : subscribe;
    abort = abort === VOID ? VOID : abort;
    return {next: next, error: error, complete: complete, subscribe: subscribe, abort: abort};
  }
  function web_observable_ObservableInspector_Companion_qc3sx_copy_1tks5(source, next, error, complete, subscribe, abort) {
    next = next === VOID ? VOID : next;
    error = error === VOID ? VOID : error;
    complete = complete === VOID ? VOID : complete;
    subscribe = subscribe === VOID ? VOID : subscribe;
    abort = abort === VOID ? VOID : abort;
    return Object.assign({}, source, {next: next, error: error, complete: complete, subscribe: subscribe, abort: abort});
  }
  function web_observable_SubscribeOptions_Companion_vcbl6l_invoke_jkqnwo(signal) {
    signal = signal === VOID ? VOID : signal;
    return {signal: signal};
  }
  function web_observable_SubscribeOptions_Companion_vcbl6l_copy_1tks5(source, signal) {
    signal = signal === VOID ? VOID : signal;
    return Object.assign({}, source, {signal: signal});
  }
  function web_observable_SubscriptionObserver_Companion_hx7ehq_invoke_jkqnwo(next, error, complete) {
    next = next === VOID ? VOID : next;
    error = error === VOID ? VOID : error;
    complete = complete === VOID ? VOID : complete;
    return {next: next, error: error, complete: complete};
  }
  function web_observable_SubscriptionObserver_Companion_hx7ehq_copy_1tks5(source, next, error, complete) {
    next = next === VOID ? VOID : next;
    error = error === VOID ? VOID : error;
    complete = complete === VOID ? VOID : complete;
    return Object.assign({}, source, {next: next, error: error, complete: complete});
  }
  function web_usb_USBConnectionEventInit_Companion_e1pkzu_invoke_jkqnwo(bubbles, cancelable, composed, device) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, device: device};
  }
  function web_usb_USBConnectionEventInit_Companion_e1pkzu_copy_1tks5(source, bubbles, cancelable, composed, device) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    device = device === VOID ? VOID : device;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, device: device});
  }
  function web_usb_USBControlTransferParameters_Companion_9i75rk_invoke_jkqnwo(requestType, recipient, request, value, index) {
    return {requestType: requestType, recipient: recipient, request: request, value: value, index: index};
  }
  function web_usb_USBControlTransferParameters_Companion_9i75rk_copy_1tks5(source, requestType, recipient, request, value, index) {
    requestType = requestType === VOID ? VOID : requestType;
    recipient = recipient === VOID ? VOID : recipient;
    request = request === VOID ? VOID : request;
    value = value === VOID ? VOID : value;
    index = index === VOID ? VOID : index;
    return Object.assign({}, source, {requestType: requestType, recipient: recipient, request: request, value: value, index: index});
  }
  function web_usb_USBDeviceFilter_Companion_orfi0c_invoke_jkqnwo(vendorId, productId, classCode, subclassCode, protocolCode, serialNumber) {
    vendorId = vendorId === VOID ? VOID : vendorId;
    productId = productId === VOID ? VOID : productId;
    classCode = classCode === VOID ? VOID : classCode;
    subclassCode = subclassCode === VOID ? VOID : subclassCode;
    protocolCode = protocolCode === VOID ? VOID : protocolCode;
    serialNumber = serialNumber === VOID ? VOID : serialNumber;
    return {vendorId: vendorId, productId: productId, classCode: classCode, subclassCode: subclassCode, protocolCode: protocolCode, serialNumber: serialNumber};
  }
  function web_usb_USBDeviceFilter_Companion_orfi0c_copy_1tks5(source, vendorId, productId, classCode, subclassCode, protocolCode, serialNumber) {
    vendorId = vendorId === VOID ? VOID : vendorId;
    productId = productId === VOID ? VOID : productId;
    classCode = classCode === VOID ? VOID : classCode;
    subclassCode = subclassCode === VOID ? VOID : subclassCode;
    protocolCode = protocolCode === VOID ? VOID : protocolCode;
    serialNumber = serialNumber === VOID ? VOID : serialNumber;
    return Object.assign({}, source, {vendorId: vendorId, productId: productId, classCode: classCode, subclassCode: subclassCode, protocolCode: protocolCode, serialNumber: serialNumber});
  }
  function web_usb_USBDeviceRequestOptions_Companion_xbbrgj_invoke_jkqnwo(filters, exclusionFilters) {
    exclusionFilters = exclusionFilters === VOID ? VOID : exclusionFilters;
    return {filters: filters, exclusionFilters: exclusionFilters};
  }
  function web_usb_USBDeviceRequestOptions_Companion_xbbrgj_copy_1tks5(source, filters, exclusionFilters) {
    filters = filters === VOID ? VOID : filters;
    exclusionFilters = exclusionFilters === VOID ? VOID : exclusionFilters;
    return Object.assign({}, source, {filters: filters, exclusionFilters: exclusionFilters});
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = addEventListener;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlin-web.js.map
