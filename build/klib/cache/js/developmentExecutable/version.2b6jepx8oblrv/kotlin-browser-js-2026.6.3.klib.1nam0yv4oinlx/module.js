(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlin-browser'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlin-browser'.");
    }
    globalThis['kotlin-browser'] = factory(typeof globalThis['kotlin-browser'] === 'undefined' ? {} : globalThis['kotlin-browser'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var VOID = kotlin_kotlin.$_$.d;
  //endregion
  //region block: pre-declaration
  //endregion
  function web_animations_AnimationEventInit_Companion_lqgvjr_invoke_jkqnwo(bubbles, cancelable, composed, animation, animationName, elapsedTime, pseudoElement) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    animation = animation === VOID ? VOID : animation;
    animationName = animationName === VOID ? VOID : animationName;
    elapsedTime = elapsedTime === VOID ? VOID : elapsedTime;
    pseudoElement = pseudoElement === VOID ? VOID : pseudoElement;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, animation: animation, animationName: animationName, elapsedTime: elapsedTime, pseudoElement: pseudoElement};
  }
  function web_animations_AnimationEventInit_Companion_lqgvjr_copy_1tks5(source, bubbles, cancelable, composed, animation, animationName, elapsedTime, pseudoElement) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    animation = animation === VOID ? VOID : animation;
    animationName = animationName === VOID ? VOID : animationName;
    elapsedTime = elapsedTime === VOID ? VOID : elapsedTime;
    pseudoElement = pseudoElement === VOID ? VOID : pseudoElement;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, animation: animation, animationName: animationName, elapsedTime: elapsedTime, pseudoElement: pseudoElement});
  }
  function web_animations_AnimationPlaybackEventInit_Companion_2eqok2_invoke_jkqnwo(bubbles, cancelable, composed, currentTime, timelineTime) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    currentTime = currentTime === VOID ? VOID : currentTime;
    timelineTime = timelineTime === VOID ? VOID : timelineTime;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, currentTime: currentTime, timelineTime: timelineTime};
  }
  function web_animations_AnimationPlaybackEventInit_Companion_2eqok2_copy_1tks5(source, bubbles, cancelable, composed, currentTime, timelineTime) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    currentTime = currentTime === VOID ? VOID : currentTime;
    timelineTime = timelineTime === VOID ? VOID : timelineTime;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, currentTime: currentTime, timelineTime: timelineTime});
  }
  function web_animations_ComputedEffectTiming_Companion_xm214l_invoke_jkqnwo(delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, playbackRate, activeDuration, currentIteration, endTime, localTime, progress, startTime) {
    delay = delay === VOID ? VOID : delay;
    direction = direction === VOID ? VOID : direction;
    duration = duration === VOID ? VOID : duration;
    easing = easing === VOID ? VOID : easing;
    endDelay = endDelay === VOID ? VOID : endDelay;
    fill = fill === VOID ? VOID : fill;
    iterationStart = iterationStart === VOID ? VOID : iterationStart;
    iterations = iterations === VOID ? VOID : iterations;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    activeDuration = activeDuration === VOID ? VOID : activeDuration;
    currentIteration = currentIteration === VOID ? VOID : currentIteration;
    endTime = endTime === VOID ? VOID : endTime;
    localTime = localTime === VOID ? VOID : localTime;
    progress = progress === VOID ? VOID : progress;
    startTime = startTime === VOID ? VOID : startTime;
    return {delay: delay, direction: direction, duration: duration, easing: easing, endDelay: endDelay, fill: fill, iterationStart: iterationStart, iterations: iterations, playbackRate: playbackRate, activeDuration: activeDuration, currentIteration: currentIteration, endTime: endTime, localTime: localTime, progress: progress, startTime: startTime};
  }
  function web_animations_ComputedEffectTiming_Companion_xm214l_copy_1tks5(source, delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, playbackRate, activeDuration, currentIteration, endTime, localTime, progress, startTime) {
    delay = delay === VOID ? VOID : delay;
    direction = direction === VOID ? VOID : direction;
    duration = duration === VOID ? VOID : duration;
    easing = easing === VOID ? VOID : easing;
    endDelay = endDelay === VOID ? VOID : endDelay;
    fill = fill === VOID ? VOID : fill;
    iterationStart = iterationStart === VOID ? VOID : iterationStart;
    iterations = iterations === VOID ? VOID : iterations;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    activeDuration = activeDuration === VOID ? VOID : activeDuration;
    currentIteration = currentIteration === VOID ? VOID : currentIteration;
    endTime = endTime === VOID ? VOID : endTime;
    localTime = localTime === VOID ? VOID : localTime;
    progress = progress === VOID ? VOID : progress;
    startTime = startTime === VOID ? VOID : startTime;
    return Object.assign({}, source, {delay: delay, direction: direction, duration: duration, easing: easing, endDelay: endDelay, fill: fill, iterationStart: iterationStart, iterations: iterations, playbackRate: playbackRate, activeDuration: activeDuration, currentIteration: currentIteration, endTime: endTime, localTime: localTime, progress: progress, startTime: startTime});
  }
  function web_animations_DocumentTimelineOptions_Companion_6o70u3_invoke_jkqnwo(originTime) {
    originTime = originTime === VOID ? VOID : originTime;
    return {originTime: originTime};
  }
  function web_animations_DocumentTimelineOptions_Companion_6o70u3_copy_1tks5(source, originTime) {
    originTime = originTime === VOID ? VOID : originTime;
    return Object.assign({}, source, {originTime: originTime});
  }
  function web_animations_EffectTiming_Companion_gbnrdq_invoke_jkqnwo(delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, playbackRate) {
    delay = delay === VOID ? VOID : delay;
    direction = direction === VOID ? VOID : direction;
    duration = duration === VOID ? VOID : duration;
    easing = easing === VOID ? VOID : easing;
    endDelay = endDelay === VOID ? VOID : endDelay;
    fill = fill === VOID ? VOID : fill;
    iterationStart = iterationStart === VOID ? VOID : iterationStart;
    iterations = iterations === VOID ? VOID : iterations;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    return {delay: delay, direction: direction, duration: duration, easing: easing, endDelay: endDelay, fill: fill, iterationStart: iterationStart, iterations: iterations, playbackRate: playbackRate};
  }
  function web_animations_EffectTiming_Companion_gbnrdq_copy_1tks5(source, delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, playbackRate) {
    delay = delay === VOID ? VOID : delay;
    direction = direction === VOID ? VOID : direction;
    duration = duration === VOID ? VOID : duration;
    easing = easing === VOID ? VOID : easing;
    endDelay = endDelay === VOID ? VOID : endDelay;
    fill = fill === VOID ? VOID : fill;
    iterationStart = iterationStart === VOID ? VOID : iterationStart;
    iterations = iterations === VOID ? VOID : iterations;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    return Object.assign({}, source, {delay: delay, direction: direction, duration: duration, easing: easing, endDelay: endDelay, fill: fill, iterationStart: iterationStart, iterations: iterations, playbackRate: playbackRate});
  }
  function web_animations_KeyframeAnimationOptions_Companion_v4ismj_invoke_jkqnwo(delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, playbackRate, composite, iterationComposite, pseudoElement, id, rangeEnd, rangeStart, timeline) {
    delay = delay === VOID ? VOID : delay;
    direction = direction === VOID ? VOID : direction;
    duration = duration === VOID ? VOID : duration;
    easing = easing === VOID ? VOID : easing;
    endDelay = endDelay === VOID ? VOID : endDelay;
    fill = fill === VOID ? VOID : fill;
    iterationStart = iterationStart === VOID ? VOID : iterationStart;
    iterations = iterations === VOID ? VOID : iterations;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    composite = composite === VOID ? VOID : composite;
    iterationComposite = iterationComposite === VOID ? VOID : iterationComposite;
    pseudoElement = pseudoElement === VOID ? VOID : pseudoElement;
    id = id === VOID ? VOID : id;
    rangeEnd = rangeEnd === VOID ? VOID : rangeEnd;
    rangeStart = rangeStart === VOID ? VOID : rangeStart;
    timeline = timeline === VOID ? VOID : timeline;
    return {delay: delay, direction: direction, duration: duration, easing: easing, endDelay: endDelay, fill: fill, iterationStart: iterationStart, iterations: iterations, playbackRate: playbackRate, composite: composite, iterationComposite: iterationComposite, pseudoElement: pseudoElement, id: id, rangeEnd: rangeEnd, rangeStart: rangeStart, timeline: timeline};
  }
  function web_animations_KeyframeAnimationOptions_Companion_v4ismj_copy_1tks5(source, delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, playbackRate, composite, iterationComposite, pseudoElement, id, rangeEnd, rangeStart, timeline) {
    delay = delay === VOID ? VOID : delay;
    direction = direction === VOID ? VOID : direction;
    duration = duration === VOID ? VOID : duration;
    easing = easing === VOID ? VOID : easing;
    endDelay = endDelay === VOID ? VOID : endDelay;
    fill = fill === VOID ? VOID : fill;
    iterationStart = iterationStart === VOID ? VOID : iterationStart;
    iterations = iterations === VOID ? VOID : iterations;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    composite = composite === VOID ? VOID : composite;
    iterationComposite = iterationComposite === VOID ? VOID : iterationComposite;
    pseudoElement = pseudoElement === VOID ? VOID : pseudoElement;
    id = id === VOID ? VOID : id;
    rangeEnd = rangeEnd === VOID ? VOID : rangeEnd;
    rangeStart = rangeStart === VOID ? VOID : rangeStart;
    timeline = timeline === VOID ? VOID : timeline;
    return Object.assign({}, source, {delay: delay, direction: direction, duration: duration, easing: easing, endDelay: endDelay, fill: fill, iterationStart: iterationStart, iterations: iterations, playbackRate: playbackRate, composite: composite, iterationComposite: iterationComposite, pseudoElement: pseudoElement, id: id, rangeEnd: rangeEnd, rangeStart: rangeStart, timeline: timeline});
  }
  function web_animations_KeyframeEffectOptions_Companion_8bv3ew_invoke_jkqnwo(delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, playbackRate, composite, iterationComposite, pseudoElement) {
    delay = delay === VOID ? VOID : delay;
    direction = direction === VOID ? VOID : direction;
    duration = duration === VOID ? VOID : duration;
    easing = easing === VOID ? VOID : easing;
    endDelay = endDelay === VOID ? VOID : endDelay;
    fill = fill === VOID ? VOID : fill;
    iterationStart = iterationStart === VOID ? VOID : iterationStart;
    iterations = iterations === VOID ? VOID : iterations;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    composite = composite === VOID ? VOID : composite;
    iterationComposite = iterationComposite === VOID ? VOID : iterationComposite;
    pseudoElement = pseudoElement === VOID ? VOID : pseudoElement;
    return {delay: delay, direction: direction, duration: duration, easing: easing, endDelay: endDelay, fill: fill, iterationStart: iterationStart, iterations: iterations, playbackRate: playbackRate, composite: composite, iterationComposite: iterationComposite, pseudoElement: pseudoElement};
  }
  function web_animations_KeyframeEffectOptions_Companion_8bv3ew_copy_1tks5(source, delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, playbackRate, composite, iterationComposite, pseudoElement) {
    delay = delay === VOID ? VOID : delay;
    direction = direction === VOID ? VOID : direction;
    duration = duration === VOID ? VOID : duration;
    easing = easing === VOID ? VOID : easing;
    endDelay = endDelay === VOID ? VOID : endDelay;
    fill = fill === VOID ? VOID : fill;
    iterationStart = iterationStart === VOID ? VOID : iterationStart;
    iterations = iterations === VOID ? VOID : iterations;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    composite = composite === VOID ? VOID : composite;
    iterationComposite = iterationComposite === VOID ? VOID : iterationComposite;
    pseudoElement = pseudoElement === VOID ? VOID : pseudoElement;
    return Object.assign({}, source, {delay: delay, direction: direction, duration: duration, easing: easing, endDelay: endDelay, fill: fill, iterationStart: iterationStart, iterations: iterations, playbackRate: playbackRate, composite: composite, iterationComposite: iterationComposite, pseudoElement: pseudoElement});
  }
  function web_animations_OptionalEffectTiming_Companion_1nb02q_invoke_jkqnwo(delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, playbackRate) {
    delay = delay === VOID ? VOID : delay;
    direction = direction === VOID ? VOID : direction;
    duration = duration === VOID ? VOID : duration;
    easing = easing === VOID ? VOID : easing;
    endDelay = endDelay === VOID ? VOID : endDelay;
    fill = fill === VOID ? VOID : fill;
    iterationStart = iterationStart === VOID ? VOID : iterationStart;
    iterations = iterations === VOID ? VOID : iterations;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    return {delay: delay, direction: direction, duration: duration, easing: easing, endDelay: endDelay, fill: fill, iterationStart: iterationStart, iterations: iterations, playbackRate: playbackRate};
  }
  function web_animations_OptionalEffectTiming_Companion_1nb02q_copy_1tks5(source, delay, direction, duration, easing, endDelay, fill, iterationStart, iterations, playbackRate) {
    delay = delay === VOID ? VOID : delay;
    direction = direction === VOID ? VOID : direction;
    duration = duration === VOID ? VOID : duration;
    easing = easing === VOID ? VOID : easing;
    endDelay = endDelay === VOID ? VOID : endDelay;
    fill = fill === VOID ? VOID : fill;
    iterationStart = iterationStart === VOID ? VOID : iterationStart;
    iterations = iterations === VOID ? VOID : iterations;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    return Object.assign({}, source, {delay: delay, direction: direction, duration: duration, easing: easing, endDelay: endDelay, fill: fill, iterationStart: iterationStart, iterations: iterations, playbackRate: playbackRate});
  }
  function web_authn_AuthenticationExtensionsClientInputs_Companion_rylls0_invoke_jkqnwo(appid, credProps, credentialProtectionPolicy, enforceCredentialProtectionPolicy, hmacCreateSecret, largeBlob, minPinLength, prf) {
    appid = appid === VOID ? VOID : appid;
    credProps = credProps === VOID ? VOID : credProps;
    credentialProtectionPolicy = credentialProtectionPolicy === VOID ? VOID : credentialProtectionPolicy;
    enforceCredentialProtectionPolicy = enforceCredentialProtectionPolicy === VOID ? VOID : enforceCredentialProtectionPolicy;
    hmacCreateSecret = hmacCreateSecret === VOID ? VOID : hmacCreateSecret;
    largeBlob = largeBlob === VOID ? VOID : largeBlob;
    minPinLength = minPinLength === VOID ? VOID : minPinLength;
    prf = prf === VOID ? VOID : prf;
    return {appid: appid, credProps: credProps, credentialProtectionPolicy: credentialProtectionPolicy, enforceCredentialProtectionPolicy: enforceCredentialProtectionPolicy, hmacCreateSecret: hmacCreateSecret, largeBlob: largeBlob, minPinLength: minPinLength, prf: prf};
  }
  function web_authn_AuthenticationExtensionsClientInputs_Companion_rylls0_copy_1tks5(source, appid, credProps, credentialProtectionPolicy, enforceCredentialProtectionPolicy, hmacCreateSecret, largeBlob, minPinLength, prf) {
    appid = appid === VOID ? VOID : appid;
    credProps = credProps === VOID ? VOID : credProps;
    credentialProtectionPolicy = credentialProtectionPolicy === VOID ? VOID : credentialProtectionPolicy;
    enforceCredentialProtectionPolicy = enforceCredentialProtectionPolicy === VOID ? VOID : enforceCredentialProtectionPolicy;
    hmacCreateSecret = hmacCreateSecret === VOID ? VOID : hmacCreateSecret;
    largeBlob = largeBlob === VOID ? VOID : largeBlob;
    minPinLength = minPinLength === VOID ? VOID : minPinLength;
    prf = prf === VOID ? VOID : prf;
    return Object.assign({}, source, {appid: appid, credProps: credProps, credentialProtectionPolicy: credentialProtectionPolicy, enforceCredentialProtectionPolicy: enforceCredentialProtectionPolicy, hmacCreateSecret: hmacCreateSecret, largeBlob: largeBlob, minPinLength: minPinLength, prf: prf});
  }
  function web_authn_AuthenticationExtensionsLargeBlobInputs_Companion_7qvn8v_invoke_jkqnwo(read, support, write) {
    read = read === VOID ? VOID : read;
    support = support === VOID ? VOID : support;
    write = write === VOID ? VOID : write;
    return {read: read, support: support, write: write};
  }
  function web_authn_AuthenticationExtensionsLargeBlobInputs_Companion_7qvn8v_copy_1tks5(source, read, support, write) {
    read = read === VOID ? VOID : read;
    support = support === VOID ? VOID : support;
    write = write === VOID ? VOID : write;
    return Object.assign({}, source, {read: read, support: support, write: write});
  }
  function web_authn_AuthenticationExtensionsPRFInputs_Companion_jwt0sd_invoke_jkqnwo(eval_1uzks, evalByCredential) {
    eval_1uzks = eval_1uzks === VOID ? VOID : eval_1uzks;
    evalByCredential = evalByCredential === VOID ? VOID : evalByCredential;
    return {'eval': eval_1uzks, evalByCredential: evalByCredential};
  }
  function web_authn_AuthenticationExtensionsPRFInputs_Companion_jwt0sd_copy_1tks5(source, eval_1uzks, evalByCredential) {
    eval_1uzks = eval_1uzks === VOID ? VOID : eval_1uzks;
    evalByCredential = evalByCredential === VOID ? VOID : evalByCredential;
    return Object.assign({}, source, {'eval': eval_1uzks, evalByCredential: evalByCredential});
  }
  function web_authn_AuthenticationExtensionsPRFValues_Companion_dmyvcm_invoke_jkqnwo(first, second) {
    second = second === VOID ? VOID : second;
    return {first: first, second: second};
  }
  function web_authn_AuthenticationExtensionsPRFValues_Companion_dmyvcm_copy_1tks5(source, first, second) {
    first = first === VOID ? VOID : first;
    second = second === VOID ? VOID : second;
    return Object.assign({}, source, {first: first, second: second});
  }
  function web_authn_AuthenticatorSelectionCriteria_Companion_qjak54_invoke_jkqnwo(authenticatorAttachment, requireResidentKey, residentKey, userVerification) {
    authenticatorAttachment = authenticatorAttachment === VOID ? VOID : authenticatorAttachment;
    requireResidentKey = requireResidentKey === VOID ? VOID : requireResidentKey;
    residentKey = residentKey === VOID ? VOID : residentKey;
    userVerification = userVerification === VOID ? VOID : userVerification;
    return {authenticatorAttachment: authenticatorAttachment, requireResidentKey: requireResidentKey, residentKey: residentKey, userVerification: userVerification};
  }
  function web_authn_AuthenticatorSelectionCriteria_Companion_qjak54_copy_1tks5(source, authenticatorAttachment, requireResidentKey, residentKey, userVerification) {
    authenticatorAttachment = authenticatorAttachment === VOID ? VOID : authenticatorAttachment;
    requireResidentKey = requireResidentKey === VOID ? VOID : requireResidentKey;
    residentKey = residentKey === VOID ? VOID : residentKey;
    userVerification = userVerification === VOID ? VOID : userVerification;
    return Object.assign({}, source, {authenticatorAttachment: authenticatorAttachment, requireResidentKey: requireResidentKey, residentKey: residentKey, userVerification: userVerification});
  }
  function web_authn_PublicKeyCredentialCreationOptions_Companion_mef84y_invoke_jkqnwo(attestation, authenticatorSelection, challenge, excludeCredentials, extensions, pubKeyCredParams, rp, timeout, user) {
    attestation = attestation === VOID ? VOID : attestation;
    authenticatorSelection = authenticatorSelection === VOID ? VOID : authenticatorSelection;
    excludeCredentials = excludeCredentials === VOID ? VOID : excludeCredentials;
    extensions = extensions === VOID ? VOID : extensions;
    timeout = timeout === VOID ? VOID : timeout;
    return {attestation: attestation, authenticatorSelection: authenticatorSelection, challenge: challenge, excludeCredentials: excludeCredentials, extensions: extensions, pubKeyCredParams: pubKeyCredParams, rp: rp, timeout: timeout, user: user};
  }
  function web_authn_PublicKeyCredentialCreationOptions_Companion_mef84y_copy_1tks5(source, attestation, authenticatorSelection, challenge, excludeCredentials, extensions, pubKeyCredParams, rp, timeout, user) {
    attestation = attestation === VOID ? VOID : attestation;
    authenticatorSelection = authenticatorSelection === VOID ? VOID : authenticatorSelection;
    challenge = challenge === VOID ? VOID : challenge;
    excludeCredentials = excludeCredentials === VOID ? VOID : excludeCredentials;
    extensions = extensions === VOID ? VOID : extensions;
    pubKeyCredParams = pubKeyCredParams === VOID ? VOID : pubKeyCredParams;
    rp = rp === VOID ? VOID : rp;
    timeout = timeout === VOID ? VOID : timeout;
    user = user === VOID ? VOID : user;
    return Object.assign({}, source, {attestation: attestation, authenticatorSelection: authenticatorSelection, challenge: challenge, excludeCredentials: excludeCredentials, extensions: extensions, pubKeyCredParams: pubKeyCredParams, rp: rp, timeout: timeout, user: user});
  }
  function web_authn_PublicKeyCredentialDescriptor_Companion_9807tk_invoke_jkqnwo(id, transports, type) {
    transports = transports === VOID ? VOID : transports;
    return {id: id, transports: transports, type: type};
  }
  function web_authn_PublicKeyCredentialDescriptor_Companion_9807tk_copy_1tks5(source, id, transports, type) {
    id = id === VOID ? VOID : id;
    transports = transports === VOID ? VOID : transports;
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {id: id, transports: transports, type: type});
  }
  function web_authn_PublicKeyCredentialEntity_Companion_ev93f0_invoke_jkqnwo(name) {
    return {name: name};
  }
  function web_authn_PublicKeyCredentialEntity_Companion_ev93f0_copy_1tks5(source, name) {
    name = name === VOID ? VOID : name;
    return Object.assign({}, source, {name: name});
  }
  function web_authn_PublicKeyCredentialParameters_Companion_erw04t_invoke_jkqnwo(alg, type) {
    return {alg: alg, type: type};
  }
  function web_authn_PublicKeyCredentialParameters_Companion_erw04t_copy_1tks5(source, alg, type) {
    alg = alg === VOID ? VOID : alg;
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {alg: alg, type: type});
  }
  function web_authn_PublicKeyCredentialRequestOptions_Companion_cpqy4o_invoke_jkqnwo(allowCredentials, challenge, extensions, rpId, timeout, userVerification) {
    allowCredentials = allowCredentials === VOID ? VOID : allowCredentials;
    extensions = extensions === VOID ? VOID : extensions;
    rpId = rpId === VOID ? VOID : rpId;
    timeout = timeout === VOID ? VOID : timeout;
    userVerification = userVerification === VOID ? VOID : userVerification;
    return {allowCredentials: allowCredentials, challenge: challenge, extensions: extensions, rpId: rpId, timeout: timeout, userVerification: userVerification};
  }
  function web_authn_PublicKeyCredentialRequestOptions_Companion_cpqy4o_copy_1tks5(source, allowCredentials, challenge, extensions, rpId, timeout, userVerification) {
    allowCredentials = allowCredentials === VOID ? VOID : allowCredentials;
    challenge = challenge === VOID ? VOID : challenge;
    extensions = extensions === VOID ? VOID : extensions;
    rpId = rpId === VOID ? VOID : rpId;
    timeout = timeout === VOID ? VOID : timeout;
    userVerification = userVerification === VOID ? VOID : userVerification;
    return Object.assign({}, source, {allowCredentials: allowCredentials, challenge: challenge, extensions: extensions, rpId: rpId, timeout: timeout, userVerification: userVerification});
  }
  function web_authn_PublicKeyCredentialRpEntity_Companion_vu23hm_invoke_jkqnwo(name, id) {
    id = id === VOID ? VOID : id;
    return {name: name, id: id};
  }
  function web_authn_PublicKeyCredentialRpEntity_Companion_vu23hm_copy_1tks5(source, name, id) {
    name = name === VOID ? VOID : name;
    id = id === VOID ? VOID : id;
    return Object.assign({}, source, {name: name, id: id});
  }
  function web_authn_PublicKeyCredentialUserEntity_Companion_o9ts6v_invoke_jkqnwo(name, displayName, id) {
    return {name: name, displayName: displayName, id: id};
  }
  function web_authn_PublicKeyCredentialUserEntity_Companion_o9ts6v_copy_1tks5(source, name, displayName, id) {
    name = name === VOID ? VOID : name;
    displayName = displayName === VOID ? VOID : displayName;
    id = id === VOID ? VOID : id;
    return Object.assign({}, source, {name: name, displayName: displayName, id: id});
  }
  function web_clipboard_ClipboardEventInit_Companion_7qa0tg_invoke_jkqnwo(bubbles, cancelable, composed, clipboardData) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    clipboardData = clipboardData === VOID ? VOID : clipboardData;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, clipboardData: clipboardData};
  }
  function web_clipboard_ClipboardEventInit_Companion_7qa0tg_copy_1tks5(source, bubbles, cancelable, composed, clipboardData) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    clipboardData = clipboardData === VOID ? VOID : clipboardData;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, clipboardData: clipboardData});
  }
  function web_clipboard_ClipboardItemOptions_Companion_5167vf_invoke_jkqnwo(presentationStyle) {
    presentationStyle = presentationStyle === VOID ? VOID : presentationStyle;
    return {presentationStyle: presentationStyle};
  }
  function web_clipboard_ClipboardItemOptions_Companion_5167vf_copy_1tks5(source, presentationStyle) {
    presentationStyle = presentationStyle === VOID ? VOID : presentationStyle;
    return Object.assign({}, source, {presentationStyle: presentationStyle});
  }
  function web_components_AssignedNodesOptions_Companion_fibljd_invoke_jkqnwo(flatten) {
    flatten = flatten === VOID ? VOID : flatten;
    return {flatten: flatten};
  }
  function web_components_AssignedNodesOptions_Companion_fibljd_copy_1tks5(source, flatten) {
    flatten = flatten === VOID ? VOID : flatten;
    return Object.assign({}, source, {flatten: flatten});
  }
  function web_components_ElementDefinitionOptions_Companion_yo2uh7_invoke_jkqnwo(extends_llcx2f) {
    extends_llcx2f = extends_llcx2f === VOID ? VOID : extends_llcx2f;
    return {'extends': extends_llcx2f};
  }
  function web_components_ElementDefinitionOptions_Companion_yo2uh7_copy_1tks5(source, extends_llcx2f) {
    extends_llcx2f = extends_llcx2f === VOID ? VOID : extends_llcx2f;
    return Object.assign({}, source, {'extends': extends_llcx2f});
  }
  function web_components_ShadowRootInit_Companion_b0asvi_invoke_jkqnwo(clonable, customElementRegistry, delegatesFocus, mode, serializable, slotAssignment) {
    clonable = clonable === VOID ? VOID : clonable;
    customElementRegistry = customElementRegistry === VOID ? VOID : customElementRegistry;
    delegatesFocus = delegatesFocus === VOID ? VOID : delegatesFocus;
    serializable = serializable === VOID ? VOID : serializable;
    slotAssignment = slotAssignment === VOID ? VOID : slotAssignment;
    return {clonable: clonable, customElementRegistry: customElementRegistry, delegatesFocus: delegatesFocus, mode: mode, serializable: serializable, slotAssignment: slotAssignment};
  }
  function web_components_ShadowRootInit_Companion_b0asvi_copy_1tks5(source, clonable, customElementRegistry, delegatesFocus, mode, serializable, slotAssignment) {
    clonable = clonable === VOID ? VOID : clonable;
    customElementRegistry = customElementRegistry === VOID ? VOID : customElementRegistry;
    delegatesFocus = delegatesFocus === VOID ? VOID : delegatesFocus;
    mode = mode === VOID ? VOID : mode;
    serializable = serializable === VOID ? VOID : serializable;
    slotAssignment = slotAssignment === VOID ? VOID : slotAssignment;
    return Object.assign({}, source, {clonable: clonable, customElementRegistry: customElementRegistry, delegatesFocus: delegatesFocus, mode: mode, serializable: serializable, slotAssignment: slotAssignment});
  }
  function web_cookie_CookieChangeEventInit_Companion_6mfmec_invoke_jkqnwo(bubbles, cancelable, composed, changed, deleted) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    changed = changed === VOID ? VOID : changed;
    deleted = deleted === VOID ? VOID : deleted;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, changed: changed, deleted: deleted};
  }
  function web_cookie_CookieChangeEventInit_Companion_6mfmec_copy_1tks5(source, bubbles, cancelable, composed, changed, deleted) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    changed = changed === VOID ? VOID : changed;
    deleted = deleted === VOID ? VOID : deleted;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, changed: changed, deleted: deleted});
  }
  function web_cookie_CookieInit_Companion_k3cc2m_invoke_jkqnwo(domain, expires, name, partitioned, path, sameSite, value) {
    domain = domain === VOID ? VOID : domain;
    expires = expires === VOID ? VOID : expires;
    partitioned = partitioned === VOID ? VOID : partitioned;
    path = path === VOID ? VOID : path;
    sameSite = sameSite === VOID ? VOID : sameSite;
    return {domain: domain, expires: expires, name: name, partitioned: partitioned, path: path, sameSite: sameSite, value: value};
  }
  function web_cookie_CookieInit_Companion_k3cc2m_copy_1tks5(source, domain, expires, name, partitioned, path, sameSite, value) {
    domain = domain === VOID ? VOID : domain;
    expires = expires === VOID ? VOID : expires;
    name = name === VOID ? VOID : name;
    partitioned = partitioned === VOID ? VOID : partitioned;
    path = path === VOID ? VOID : path;
    sameSite = sameSite === VOID ? VOID : sameSite;
    value = value === VOID ? VOID : value;
    return Object.assign({}, source, {domain: domain, expires: expires, name: name, partitioned: partitioned, path: path, sameSite: sameSite, value: value});
  }
  function web_cookie_CookieListItem_Companion_dvngkd_invoke_jkqnwo(name, value) {
    name = name === VOID ? VOID : name;
    value = value === VOID ? VOID : value;
    return {name: name, value: value};
  }
  function web_cookie_CookieListItem_Companion_dvngkd_copy_1tks5(source, name, value) {
    name = name === VOID ? VOID : name;
    value = value === VOID ? VOID : value;
    return Object.assign({}, source, {name: name, value: value});
  }
  function web_cookie_CookieStoreDeleteOptions_Companion_9qptus_invoke_jkqnwo(domain, name, partitioned, path) {
    domain = domain === VOID ? VOID : domain;
    partitioned = partitioned === VOID ? VOID : partitioned;
    path = path === VOID ? VOID : path;
    return {domain: domain, name: name, partitioned: partitioned, path: path};
  }
  function web_cookie_CookieStoreDeleteOptions_Companion_9qptus_copy_1tks5(source, domain, name, partitioned, path) {
    domain = domain === VOID ? VOID : domain;
    name = name === VOID ? VOID : name;
    partitioned = partitioned === VOID ? VOID : partitioned;
    path = path === VOID ? VOID : path;
    return Object.assign({}, source, {domain: domain, name: name, partitioned: partitioned, path: path});
  }
  function web_cookie_CookieStoreGetOptions_Companion_cqbz3h_invoke_jkqnwo(name, url) {
    name = name === VOID ? VOID : name;
    url = url === VOID ? VOID : url;
    return {name: name, url: url};
  }
  function web_cookie_CookieStoreGetOptions_Companion_cqbz3h_copy_1tks5(source, name, url) {
    name = name === VOID ? VOID : name;
    url = url === VOID ? VOID : url;
    return Object.assign({}, source, {name: name, url: url});
  }
  function web_credentials_CredentialCreationOptions_Companion_psom9y_invoke_jkqnwo(signal, publicKey) {
    signal = signal === VOID ? VOID : signal;
    publicKey = publicKey === VOID ? VOID : publicKey;
    return {signal: signal, publicKey: publicKey};
  }
  function web_credentials_CredentialCreationOptions_Companion_psom9y_copy_1tks5(source, signal, publicKey) {
    signal = signal === VOID ? VOID : signal;
    publicKey = publicKey === VOID ? VOID : publicKey;
    return Object.assign({}, source, {signal: signal, publicKey: publicKey});
  }
  function web_credentials_CredentialRequestOptions_Companion_axn52o_invoke_jkqnwo(signal, mediation, publicKey) {
    signal = signal === VOID ? VOID : signal;
    mediation = mediation === VOID ? VOID : mediation;
    publicKey = publicKey === VOID ? VOID : publicKey;
    return {signal: signal, mediation: mediation, publicKey: publicKey};
  }
  function web_credentials_CredentialRequestOptions_Companion_axn52o_copy_1tks5(source, signal, mediation, publicKey) {
    signal = signal === VOID ? VOID : signal;
    mediation = mediation === VOID ? VOID : mediation;
    publicKey = publicKey === VOID ? VOID : publicKey;
    return Object.assign({}, source, {signal: signal, mediation: mediation, publicKey: publicKey});
  }
  function web_csp_SecurityPolicyViolationEventInit_Companion_3gzakj_invoke_jkqnwo(bubbles, cancelable, composed, blockedURI, columnNumber, disposition, documentURI, effectiveDirective, lineNumber, originalPolicy, referrer, sample, sourceFile, statusCode, violatedDirective) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    blockedURI = blockedURI === VOID ? VOID : blockedURI;
    columnNumber = columnNumber === VOID ? VOID : columnNumber;
    disposition = disposition === VOID ? VOID : disposition;
    documentURI = documentURI === VOID ? VOID : documentURI;
    effectiveDirective = effectiveDirective === VOID ? VOID : effectiveDirective;
    lineNumber = lineNumber === VOID ? VOID : lineNumber;
    originalPolicy = originalPolicy === VOID ? VOID : originalPolicy;
    referrer = referrer === VOID ? VOID : referrer;
    sample = sample === VOID ? VOID : sample;
    sourceFile = sourceFile === VOID ? VOID : sourceFile;
    statusCode = statusCode === VOID ? VOID : statusCode;
    violatedDirective = violatedDirective === VOID ? VOID : violatedDirective;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, blockedURI: blockedURI, columnNumber: columnNumber, disposition: disposition, documentURI: documentURI, effectiveDirective: effectiveDirective, lineNumber: lineNumber, originalPolicy: originalPolicy, referrer: referrer, sample: sample, sourceFile: sourceFile, statusCode: statusCode, violatedDirective: violatedDirective};
  }
  function web_csp_SecurityPolicyViolationEventInit_Companion_3gzakj_copy_1tks5(source, bubbles, cancelable, composed, blockedURI, columnNumber, disposition, documentURI, effectiveDirective, lineNumber, originalPolicy, referrer, sample, sourceFile, statusCode, violatedDirective) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    blockedURI = blockedURI === VOID ? VOID : blockedURI;
    columnNumber = columnNumber === VOID ? VOID : columnNumber;
    disposition = disposition === VOID ? VOID : disposition;
    documentURI = documentURI === VOID ? VOID : documentURI;
    effectiveDirective = effectiveDirective === VOID ? VOID : effectiveDirective;
    lineNumber = lineNumber === VOID ? VOID : lineNumber;
    originalPolicy = originalPolicy === VOID ? VOID : originalPolicy;
    referrer = referrer === VOID ? VOID : referrer;
    sample = sample === VOID ? VOID : sample;
    sourceFile = sourceFile === VOID ? VOID : sourceFile;
    statusCode = statusCode === VOID ? VOID : statusCode;
    violatedDirective = violatedDirective === VOID ? VOID : violatedDirective;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, blockedURI: blockedURI, columnNumber: columnNumber, disposition: disposition, documentURI: documentURI, effectiveDirective: effectiveDirective, lineNumber: lineNumber, originalPolicy: originalPolicy, referrer: referrer, sample: sample, sourceFile: sourceFile, statusCode: statusCode, violatedDirective: violatedDirective});
  }
  function web_cssom_CSSStyleSheetInit_Companion_uoz2t4_invoke_jkqnwo(baseURL, disabled, media) {
    baseURL = baseURL === VOID ? VOID : baseURL;
    disabled = disabled === VOID ? VOID : disabled;
    media = media === VOID ? VOID : media;
    return {baseURL: baseURL, disabled: disabled, media: media};
  }
  function web_cssom_CSSStyleSheetInit_Companion_uoz2t4_copy_1tks5(source, baseURL, disabled, media) {
    baseURL = baseURL === VOID ? VOID : baseURL;
    disabled = disabled === VOID ? VOID : disabled;
    media = media === VOID ? VOID : media;
    return Object.assign({}, source, {baseURL: baseURL, disabled: disabled, media: media});
  }
  function web_cssom_TransitionEventInit_Companion_243t78_invoke_jkqnwo(bubbles, cancelable, composed, animation, elapsedTime, propertyName, pseudoElement) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    animation = animation === VOID ? VOID : animation;
    elapsedTime = elapsedTime === VOID ? VOID : elapsedTime;
    propertyName = propertyName === VOID ? VOID : propertyName;
    pseudoElement = pseudoElement === VOID ? VOID : pseudoElement;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, animation: animation, elapsedTime: elapsedTime, propertyName: propertyName, pseudoElement: pseudoElement};
  }
  function web_cssom_TransitionEventInit_Companion_243t78_copy_1tks5(source, bubbles, cancelable, composed, animation, elapsedTime, propertyName, pseudoElement) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    animation = animation === VOID ? VOID : animation;
    elapsedTime = elapsedTime === VOID ? VOID : elapsedTime;
    propertyName = propertyName === VOID ? VOID : propertyName;
    pseudoElement = pseudoElement === VOID ? VOID : pseudoElement;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, animation: animation, elapsedTime: elapsedTime, propertyName: propertyName, pseudoElement: pseudoElement});
  }
  function web_device_DeviceMotionEventAccelerationInit_Companion_c368jm_invoke_jkqnwo(x, y, z) {
    x = x === VOID ? VOID : x;
    y = y === VOID ? VOID : y;
    z = z === VOID ? VOID : z;
    return {x: x, y: y, z: z};
  }
  function web_device_DeviceMotionEventAccelerationInit_Companion_c368jm_copy_1tks5(source, x, y, z) {
    x = x === VOID ? VOID : x;
    y = y === VOID ? VOID : y;
    z = z === VOID ? VOID : z;
    return Object.assign({}, source, {x: x, y: y, z: z});
  }
  function web_device_DeviceMotionEventInit_Companion_5lw6u6_invoke_jkqnwo(bubbles, cancelable, composed, acceleration, accelerationIncludingGravity, interval, rotationRate) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    acceleration = acceleration === VOID ? VOID : acceleration;
    accelerationIncludingGravity = accelerationIncludingGravity === VOID ? VOID : accelerationIncludingGravity;
    interval = interval === VOID ? VOID : interval;
    rotationRate = rotationRate === VOID ? VOID : rotationRate;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, acceleration: acceleration, accelerationIncludingGravity: accelerationIncludingGravity, interval: interval, rotationRate: rotationRate};
  }
  function web_device_DeviceMotionEventInit_Companion_5lw6u6_copy_1tks5(source, bubbles, cancelable, composed, acceleration, accelerationIncludingGravity, interval, rotationRate) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    acceleration = acceleration === VOID ? VOID : acceleration;
    accelerationIncludingGravity = accelerationIncludingGravity === VOID ? VOID : accelerationIncludingGravity;
    interval = interval === VOID ? VOID : interval;
    rotationRate = rotationRate === VOID ? VOID : rotationRate;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, acceleration: acceleration, accelerationIncludingGravity: accelerationIncludingGravity, interval: interval, rotationRate: rotationRate});
  }
  function web_device_DeviceMotionEventRotationRateInit_Companion_xmz35o_invoke_jkqnwo(alpha, beta, gamma) {
    alpha = alpha === VOID ? VOID : alpha;
    beta = beta === VOID ? VOID : beta;
    gamma = gamma === VOID ? VOID : gamma;
    return {alpha: alpha, beta: beta, gamma: gamma};
  }
  function web_device_DeviceMotionEventRotationRateInit_Companion_xmz35o_copy_1tks5(source, alpha, beta, gamma) {
    alpha = alpha === VOID ? VOID : alpha;
    beta = beta === VOID ? VOID : beta;
    gamma = gamma === VOID ? VOID : gamma;
    return Object.assign({}, source, {alpha: alpha, beta: beta, gamma: gamma});
  }
  function web_device_DeviceOrientationEventInit_Companion_ajm51w_invoke_jkqnwo(bubbles, cancelable, composed, absolute, alpha, beta, gamma) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    absolute = absolute === VOID ? VOID : absolute;
    alpha = alpha === VOID ? VOID : alpha;
    beta = beta === VOID ? VOID : beta;
    gamma = gamma === VOID ? VOID : gamma;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, absolute: absolute, alpha: alpha, beta: beta, gamma: gamma};
  }
  function web_device_DeviceOrientationEventInit_Companion_ajm51w_copy_1tks5(source, bubbles, cancelable, composed, absolute, alpha, beta, gamma) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    absolute = absolute === VOID ? VOID : absolute;
    alpha = alpha === VOID ? VOID : alpha;
    beta = beta === VOID ? VOID : beta;
    gamma = gamma === VOID ? VOID : gamma;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, absolute: absolute, alpha: alpha, beta: beta, gamma: gamma});
  }
  function web_dnd_DragEventInit_Companion_dj9qje_invoke_jkqnwo(bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, button, buttons, clientX, clientY, movementX, movementY, relatedTarget, screenX, screenY, dataTransfer) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    button = button === VOID ? VOID : button;
    buttons = buttons === VOID ? VOID : buttons;
    clientX = clientX === VOID ? VOID : clientX;
    clientY = clientY === VOID ? VOID : clientY;
    movementX = movementX === VOID ? VOID : movementX;
    movementY = movementY === VOID ? VOID : movementY;
    relatedTarget = relatedTarget === VOID ? VOID : relatedTarget;
    screenX = screenX === VOID ? VOID : screenX;
    screenY = screenY === VOID ? VOID : screenY;
    dataTransfer = dataTransfer === VOID ? VOID : dataTransfer;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, button: button, buttons: buttons, clientX: clientX, clientY: clientY, movementX: movementX, movementY: movementY, relatedTarget: relatedTarget, screenX: screenX, screenY: screenY, dataTransfer: dataTransfer};
  }
  function web_dnd_DragEventInit_Companion_dj9qje_copy_1tks5(source, bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, button, buttons, clientX, clientY, movementX, movementY, relatedTarget, screenX, screenY, dataTransfer) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    button = button === VOID ? VOID : button;
    buttons = buttons === VOID ? VOID : buttons;
    clientX = clientX === VOID ? VOID : clientX;
    clientY = clientY === VOID ? VOID : clientY;
    movementX = movementX === VOID ? VOID : movementX;
    movementY = movementY === VOID ? VOID : movementY;
    relatedTarget = relatedTarget === VOID ? VOID : relatedTarget;
    screenX = screenX === VOID ? VOID : screenX;
    screenY = screenY === VOID ? VOID : screenY;
    dataTransfer = dataTransfer === VOID ? VOID : dataTransfer;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, button: button, buttons: buttons, clientX: clientX, clientY: clientY, movementX: movementX, movementY: movementY, relatedTarget: relatedTarget, screenX: screenX, screenY: screenY, dataTransfer: dataTransfer});
  }
  function web_dom_CaretPositionFromPointOptions_Companion_wqoa0s_invoke_jkqnwo(shadowRoots) {
    shadowRoots = shadowRoots === VOID ? VOID : shadowRoots;
    return {shadowRoots: shadowRoots};
  }
  function web_dom_CaretPositionFromPointOptions_Companion_wqoa0s_copy_1tks5(source, shadowRoots) {
    shadowRoots = shadowRoots === VOID ? VOID : shadowRoots;
    return Object.assign({}, source, {shadowRoots: shadowRoots});
  }
  function web_dom_CheckVisibilityOptions_Companion_st2q54_invoke_jkqnwo(checkOpacity, checkVisibilityCSS, contentVisibilityAuto, opacityProperty, visibilityProperty) {
    checkOpacity = checkOpacity === VOID ? VOID : checkOpacity;
    checkVisibilityCSS = checkVisibilityCSS === VOID ? VOID : checkVisibilityCSS;
    contentVisibilityAuto = contentVisibilityAuto === VOID ? VOID : contentVisibilityAuto;
    opacityProperty = opacityProperty === VOID ? VOID : opacityProperty;
    visibilityProperty = visibilityProperty === VOID ? VOID : visibilityProperty;
    return {checkOpacity: checkOpacity, checkVisibilityCSS: checkVisibilityCSS, contentVisibilityAuto: contentVisibilityAuto, opacityProperty: opacityProperty, visibilityProperty: visibilityProperty};
  }
  function web_dom_CheckVisibilityOptions_Companion_st2q54_copy_1tks5(source, checkOpacity, checkVisibilityCSS, contentVisibilityAuto, opacityProperty, visibilityProperty) {
    checkOpacity = checkOpacity === VOID ? VOID : checkOpacity;
    checkVisibilityCSS = checkVisibilityCSS === VOID ? VOID : checkVisibilityCSS;
    contentVisibilityAuto = contentVisibilityAuto === VOID ? VOID : contentVisibilityAuto;
    opacityProperty = opacityProperty === VOID ? VOID : opacityProperty;
    visibilityProperty = visibilityProperty === VOID ? VOID : visibilityProperty;
    return Object.assign({}, source, {checkOpacity: checkOpacity, checkVisibilityCSS: checkVisibilityCSS, contentVisibilityAuto: contentVisibilityAuto, opacityProperty: opacityProperty, visibilityProperty: visibilityProperty});
  }
  function web_dom_ElementCreationOptions_Companion_5j403r_invoke_jkqnwo(customElementRegistry, is) {
    customElementRegistry = customElementRegistry === VOID ? VOID : customElementRegistry;
    is = is === VOID ? VOID : is;
    return {customElementRegistry: customElementRegistry, is: is};
  }
  function web_dom_ElementCreationOptions_Companion_5j403r_copy_1tks5(source, customElementRegistry, is) {
    customElementRegistry = customElementRegistry === VOID ? VOID : customElementRegistry;
    is = is === VOID ? VOID : is;
    return Object.assign({}, source, {customElementRegistry: customElementRegistry, is: is});
  }
  function web_dom_FocusOptions_Companion_x6lz2i_invoke_jkqnwo(focusVisible, preventScroll) {
    focusVisible = focusVisible === VOID ? VOID : focusVisible;
    preventScroll = preventScroll === VOID ? VOID : preventScroll;
    return {focusVisible: focusVisible, preventScroll: preventScroll};
  }
  function web_dom_FocusOptions_Companion_x6lz2i_copy_1tks5(source, focusVisible, preventScroll) {
    focusVisible = focusVisible === VOID ? VOID : focusVisible;
    preventScroll = preventScroll === VOID ? VOID : preventScroll;
    return Object.assign({}, source, {focusVisible: focusVisible, preventScroll: preventScroll});
  }
  function web_dom_GetAnimationsOptions_Companion_vqfcpv_invoke_jkqnwo(subtree) {
    subtree = subtree === VOID ? VOID : subtree;
    return {subtree: subtree};
  }
  function web_dom_GetAnimationsOptions_Companion_vqfcpv_copy_1tks5(source, subtree) {
    subtree = subtree === VOID ? VOID : subtree;
    return Object.assign({}, source, {subtree: subtree});
  }
  function web_dom_GetHTMLOptions_Companion_bd1k5d_invoke_jkqnwo(serializableShadowRoots, shadowRoots) {
    serializableShadowRoots = serializableShadowRoots === VOID ? VOID : serializableShadowRoots;
    shadowRoots = shadowRoots === VOID ? VOID : shadowRoots;
    return {serializableShadowRoots: serializableShadowRoots, shadowRoots: shadowRoots};
  }
  function web_dom_GetHTMLOptions_Companion_bd1k5d_copy_1tks5(source, serializableShadowRoots, shadowRoots) {
    serializableShadowRoots = serializableShadowRoots === VOID ? VOID : serializableShadowRoots;
    shadowRoots = shadowRoots === VOID ? VOID : shadowRoots;
    return Object.assign({}, source, {serializableShadowRoots: serializableShadowRoots, shadowRoots: shadowRoots});
  }
  function web_dom_GetRootNodeOptions_Companion_mgyew8_invoke_jkqnwo(composed) {
    composed = composed === VOID ? VOID : composed;
    return {composed: composed};
  }
  function web_dom_GetRootNodeOptions_Companion_mgyew8_copy_1tks5(source, composed) {
    composed = composed === VOID ? VOID : composed;
    return Object.assign({}, source, {composed: composed});
  }
  function web_dom_ImportNodeOptions_Companion_a0rn81_invoke_jkqnwo(customElementRegistry, selfOnly) {
    customElementRegistry = customElementRegistry === VOID ? VOID : customElementRegistry;
    selfOnly = selfOnly === VOID ? VOID : selfOnly;
    return {customElementRegistry: customElementRegistry, selfOnly: selfOnly};
  }
  function web_dom_ImportNodeOptions_Companion_a0rn81_copy_1tks5(source, customElementRegistry, selfOnly) {
    customElementRegistry = customElementRegistry === VOID ? VOID : customElementRegistry;
    selfOnly = selfOnly === VOID ? VOID : selfOnly;
    return Object.assign({}, source, {customElementRegistry: customElementRegistry, selfOnly: selfOnly});
  }
  function web_dom_PointerLockOptions_Companion_5kb7ru_invoke_jkqnwo(unadjustedMovement) {
    unadjustedMovement = unadjustedMovement === VOID ? VOID : unadjustedMovement;
    return {unadjustedMovement: unadjustedMovement};
  }
  function web_dom_PointerLockOptions_Companion_5kb7ru_copy_1tks5(source, unadjustedMovement) {
    unadjustedMovement = unadjustedMovement === VOID ? VOID : unadjustedMovement;
    return Object.assign({}, source, {unadjustedMovement: unadjustedMovement});
  }
  function web_dom_SetHTMLOptions_Companion_1xooqz_invoke_jkqnwo(sanitizer) {
    sanitizer = sanitizer === VOID ? VOID : sanitizer;
    return {sanitizer: sanitizer};
  }
  function web_dom_SetHTMLOptions_Companion_1xooqz_copy_1tks5(source, sanitizer) {
    sanitizer = sanitizer === VOID ? VOID : sanitizer;
    return Object.assign({}, source, {sanitizer: sanitizer});
  }
  function web_dpip_DocumentPictureInPictureEventInit_Companion_3t7k3z_invoke_jkqnwo(bubbles, cancelable, composed, window_0) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, window: window_0};
  }
  function web_dpip_DocumentPictureInPictureEventInit_Companion_3t7k3z_copy_1tks5(source, bubbles, cancelable, composed, window_0) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    window_0 = window_0 === VOID ? VOID : window_0;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, window: window_0});
  }
  function web_dpip_DocumentPictureInPictureOptions_Companion_oyr5a3_invoke_jkqnwo(disallowReturnToOpener, height, preferInitialWindowPlacement, width) {
    disallowReturnToOpener = disallowReturnToOpener === VOID ? VOID : disallowReturnToOpener;
    height = height === VOID ? VOID : height;
    preferInitialWindowPlacement = preferInitialWindowPlacement === VOID ? VOID : preferInitialWindowPlacement;
    width = width === VOID ? VOID : width;
    return {disallowReturnToOpener: disallowReturnToOpener, height: height, preferInitialWindowPlacement: preferInitialWindowPlacement, width: width};
  }
  function web_dpip_DocumentPictureInPictureOptions_Companion_oyr5a3_copy_1tks5(source, disallowReturnToOpener, height, preferInitialWindowPlacement, width) {
    disallowReturnToOpener = disallowReturnToOpener === VOID ? VOID : disallowReturnToOpener;
    height = height === VOID ? VOID : height;
    preferInitialWindowPlacement = preferInitialWindowPlacement === VOID ? VOID : preferInitialWindowPlacement;
    width = width === VOID ? VOID : width;
    return Object.assign({}, source, {disallowReturnToOpener: disallowReturnToOpener, height: height, preferInitialWindowPlacement: preferInitialWindowPlacement, width: width});
  }
  function web_focus_FocusEventInit_Companion_i41ls_invoke_jkqnwo(bubbles, cancelable, composed, detail, view, relatedTarget) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    relatedTarget = relatedTarget === VOID ? VOID : relatedTarget;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, relatedTarget: relatedTarget};
  }
  function web_focus_FocusEventInit_Companion_i41ls_copy_1tks5(source, bubbles, cancelable, composed, detail, view, relatedTarget) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    relatedTarget = relatedTarget === VOID ? VOID : relatedTarget;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, relatedTarget: relatedTarget});
  }
  function web_fonts_FontFaceDescriptors_Companion_slbxke_invoke_jkqnwo(ascentOverride, descentOverride, display, featureSettings, lineGapOverride, stretch, style, unicodeRange, variationSettings, weight) {
    ascentOverride = ascentOverride === VOID ? VOID : ascentOverride;
    descentOverride = descentOverride === VOID ? VOID : descentOverride;
    display = display === VOID ? VOID : display;
    featureSettings = featureSettings === VOID ? VOID : featureSettings;
    lineGapOverride = lineGapOverride === VOID ? VOID : lineGapOverride;
    stretch = stretch === VOID ? VOID : stretch;
    style = style === VOID ? VOID : style;
    unicodeRange = unicodeRange === VOID ? VOID : unicodeRange;
    variationSettings = variationSettings === VOID ? VOID : variationSettings;
    weight = weight === VOID ? VOID : weight;
    return {ascentOverride: ascentOverride, descentOverride: descentOverride, display: display, featureSettings: featureSettings, lineGapOverride: lineGapOverride, stretch: stretch, style: style, unicodeRange: unicodeRange, variationSettings: variationSettings, weight: weight};
  }
  function web_fonts_FontFaceDescriptors_Companion_slbxke_copy_1tks5(source, ascentOverride, descentOverride, display, featureSettings, lineGapOverride, stretch, style, unicodeRange, variationSettings, weight) {
    ascentOverride = ascentOverride === VOID ? VOID : ascentOverride;
    descentOverride = descentOverride === VOID ? VOID : descentOverride;
    display = display === VOID ? VOID : display;
    featureSettings = featureSettings === VOID ? VOID : featureSettings;
    lineGapOverride = lineGapOverride === VOID ? VOID : lineGapOverride;
    stretch = stretch === VOID ? VOID : stretch;
    style = style === VOID ? VOID : style;
    unicodeRange = unicodeRange === VOID ? VOID : unicodeRange;
    variationSettings = variationSettings === VOID ? VOID : variationSettings;
    weight = weight === VOID ? VOID : weight;
    return Object.assign({}, source, {ascentOverride: ascentOverride, descentOverride: descentOverride, display: display, featureSettings: featureSettings, lineGapOverride: lineGapOverride, stretch: stretch, style: style, unicodeRange: unicodeRange, variationSettings: variationSettings, weight: weight});
  }
  function web_fonts_FontFaceSetLoadEventInit_Companion_6wzwds_invoke_jkqnwo(bubbles, cancelable, composed, fontfaces) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    fontfaces = fontfaces === VOID ? VOID : fontfaces;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, fontfaces: fontfaces};
  }
  function web_fonts_FontFaceSetLoadEventInit_Companion_6wzwds_copy_1tks5(source, bubbles, cancelable, composed, fontfaces) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    fontfaces = fontfaces === VOID ? VOID : fontfaces;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, fontfaces: fontfaces});
  }
  function web_form_FormDataEventInit_Companion_2ped92_invoke_jkqnwo(bubbles, cancelable, composed, formData) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, formData: formData};
  }
  function web_form_FormDataEventInit_Companion_2ped92_copy_1tks5(source, bubbles, cancelable, composed, formData) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    formData = formData === VOID ? VOID : formData;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, formData: formData});
  }
  function web_form_SubmitEventInit_Companion_3ux7k_invoke_jkqnwo(bubbles, cancelable, composed, submitter) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    submitter = submitter === VOID ? VOID : submitter;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, submitter: submitter};
  }
  function web_form_SubmitEventInit_Companion_3ux7k_copy_1tks5(source, bubbles, cancelable, composed, submitter) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    submitter = submitter === VOID ? VOID : submitter;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, submitter: submitter});
  }
  function web_fs_FileSystemCreateWritableOptions_Companion_6x60r2_invoke_jkqnwo(keepExistingData) {
    keepExistingData = keepExistingData === VOID ? VOID : keepExistingData;
    return {keepExistingData: keepExistingData};
  }
  function web_fs_FileSystemCreateWritableOptions_Companion_6x60r2_copy_1tks5(source, keepExistingData) {
    keepExistingData = keepExistingData === VOID ? VOID : keepExistingData;
    return Object.assign({}, source, {keepExistingData: keepExistingData});
  }
  function web_fs_FileSystemFlags_Companion_kg9utv_invoke_jkqnwo(create, exclusive) {
    create = create === VOID ? VOID : create;
    exclusive = exclusive === VOID ? VOID : exclusive;
    return {create: create, exclusive: exclusive};
  }
  function web_fs_FileSystemFlags_Companion_kg9utv_copy_1tks5(source, create, exclusive) {
    create = create === VOID ? VOID : create;
    exclusive = exclusive === VOID ? VOID : exclusive;
    return Object.assign({}, source, {create: create, exclusive: exclusive});
  }
  function web_fs_FileSystemGetDirectoryOptions_Companion_j1rky5_invoke_jkqnwo(create) {
    create = create === VOID ? VOID : create;
    return {create: create};
  }
  function web_fs_FileSystemGetDirectoryOptions_Companion_j1rky5_copy_1tks5(source, create) {
    create = create === VOID ? VOID : create;
    return Object.assign({}, source, {create: create});
  }
  function web_fs_FileSystemGetFileOptions_Companion_80uf0c_invoke_jkqnwo(create) {
    create = create === VOID ? VOID : create;
    return {create: create};
  }
  function web_fs_FileSystemGetFileOptions_Companion_80uf0c_copy_1tks5(source, create) {
    create = create === VOID ? VOID : create;
    return Object.assign({}, source, {create: create});
  }
  function web_fs_FileSystemReadWriteOptions_Companion_46p339_invoke_jkqnwo(at) {
    at = at === VOID ? VOID : at;
    return {at: at};
  }
  function web_fs_FileSystemReadWriteOptions_Companion_46p339_copy_1tks5(source, at) {
    at = at === VOID ? VOID : at;
    return Object.assign({}, source, {at: at});
  }
  function web_fs_FileSystemRemoveOptions_Companion_ismyrq_invoke_jkqnwo(recursive) {
    recursive = recursive === VOID ? VOID : recursive;
    return {recursive: recursive};
  }
  function web_fs_FileSystemRemoveOptions_Companion_ismyrq_copy_1tks5(source, recursive) {
    recursive = recursive === VOID ? VOID : recursive;
    return Object.assign({}, source, {recursive: recursive});
  }
  function web_fullscreen_FullscreenOptions_Companion_13mbzc_invoke_jkqnwo(navigationUI) {
    navigationUI = navigationUI === VOID ? VOID : navigationUI;
    return {navigationUI: navigationUI};
  }
  function web_fullscreen_FullscreenOptions_Companion_13mbzc_copy_1tks5(source, navigationUI) {
    navigationUI = navigationUI === VOID ? VOID : navigationUI;
    return Object.assign({}, source, {navigationUI: navigationUI});
  }
  function web_gamepad_GamepadEffectParameters_Companion_6rudd9_invoke_jkqnwo(duration, leftTrigger, rightTrigger, startDelay, strongMagnitude, weakMagnitude) {
    duration = duration === VOID ? VOID : duration;
    leftTrigger = leftTrigger === VOID ? VOID : leftTrigger;
    rightTrigger = rightTrigger === VOID ? VOID : rightTrigger;
    startDelay = startDelay === VOID ? VOID : startDelay;
    strongMagnitude = strongMagnitude === VOID ? VOID : strongMagnitude;
    weakMagnitude = weakMagnitude === VOID ? VOID : weakMagnitude;
    return {duration: duration, leftTrigger: leftTrigger, rightTrigger: rightTrigger, startDelay: startDelay, strongMagnitude: strongMagnitude, weakMagnitude: weakMagnitude};
  }
  function web_gamepad_GamepadEffectParameters_Companion_6rudd9_copy_1tks5(source, duration, leftTrigger, rightTrigger, startDelay, strongMagnitude, weakMagnitude) {
    duration = duration === VOID ? VOID : duration;
    leftTrigger = leftTrigger === VOID ? VOID : leftTrigger;
    rightTrigger = rightTrigger === VOID ? VOID : rightTrigger;
    startDelay = startDelay === VOID ? VOID : startDelay;
    strongMagnitude = strongMagnitude === VOID ? VOID : strongMagnitude;
    weakMagnitude = weakMagnitude === VOID ? VOID : weakMagnitude;
    return Object.assign({}, source, {duration: duration, leftTrigger: leftTrigger, rightTrigger: rightTrigger, startDelay: startDelay, strongMagnitude: strongMagnitude, weakMagnitude: weakMagnitude});
  }
  function web_gamepad_GamepadEventInit_Companion_9p10su_invoke_jkqnwo(bubbles, cancelable, composed, gamepad) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    gamepad = gamepad === VOID ? VOID : gamepad;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, gamepad: gamepad};
  }
  function web_gamepad_GamepadEventInit_Companion_9p10su_copy_1tks5(source, bubbles, cancelable, composed, gamepad) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    gamepad = gamepad === VOID ? VOID : gamepad;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, gamepad: gamepad});
  }
  function web_geolocation_PositionOptions_Companion_8f3fip_invoke_jkqnwo(enableHighAccuracy, maximumAge, timeout) {
    enableHighAccuracy = enableHighAccuracy === VOID ? VOID : enableHighAccuracy;
    maximumAge = maximumAge === VOID ? VOID : maximumAge;
    timeout = timeout === VOID ? VOID : timeout;
    return {enableHighAccuracy: enableHighAccuracy, maximumAge: maximumAge, timeout: timeout};
  }
  function web_geolocation_PositionOptions_Companion_8f3fip_copy_1tks5(source, enableHighAccuracy, maximumAge, timeout) {
    enableHighAccuracy = enableHighAccuracy === VOID ? VOID : enableHighAccuracy;
    maximumAge = maximumAge === VOID ? VOID : maximumAge;
    timeout = timeout === VOID ? VOID : timeout;
    return Object.assign({}, source, {enableHighAccuracy: enableHighAccuracy, maximumAge: maximumAge, timeout: timeout});
  }
  function web_gl_WebGLContextAttributes_Companion_gocppi_invoke_jkqnwo(alpha, antialias, depth, desynchronized, failIfMajorPerformanceCaveat, powerPreference, premultipliedAlpha, preserveDrawingBuffer, stencil, xrCompatible) {
    alpha = alpha === VOID ? VOID : alpha;
    antialias = antialias === VOID ? VOID : antialias;
    depth = depth === VOID ? VOID : depth;
    desynchronized = desynchronized === VOID ? VOID : desynchronized;
    failIfMajorPerformanceCaveat = failIfMajorPerformanceCaveat === VOID ? VOID : failIfMajorPerformanceCaveat;
    powerPreference = powerPreference === VOID ? VOID : powerPreference;
    premultipliedAlpha = premultipliedAlpha === VOID ? VOID : premultipliedAlpha;
    preserveDrawingBuffer = preserveDrawingBuffer === VOID ? VOID : preserveDrawingBuffer;
    stencil = stencil === VOID ? VOID : stencil;
    xrCompatible = xrCompatible === VOID ? VOID : xrCompatible;
    return {alpha: alpha, antialias: antialias, depth: depth, desynchronized: desynchronized, failIfMajorPerformanceCaveat: failIfMajorPerformanceCaveat, powerPreference: powerPreference, premultipliedAlpha: premultipliedAlpha, preserveDrawingBuffer: preserveDrawingBuffer, stencil: stencil, xrCompatible: xrCompatible};
  }
  function web_gl_WebGLContextAttributes_Companion_gocppi_copy_1tks5(source, alpha, antialias, depth, desynchronized, failIfMajorPerformanceCaveat, powerPreference, premultipliedAlpha, preserveDrawingBuffer, stencil, xrCompatible) {
    alpha = alpha === VOID ? VOID : alpha;
    antialias = antialias === VOID ? VOID : antialias;
    depth = depth === VOID ? VOID : depth;
    desynchronized = desynchronized === VOID ? VOID : desynchronized;
    failIfMajorPerformanceCaveat = failIfMajorPerformanceCaveat === VOID ? VOID : failIfMajorPerformanceCaveat;
    powerPreference = powerPreference === VOID ? VOID : powerPreference;
    premultipliedAlpha = premultipliedAlpha === VOID ? VOID : premultipliedAlpha;
    preserveDrawingBuffer = preserveDrawingBuffer === VOID ? VOID : preserveDrawingBuffer;
    stencil = stencil === VOID ? VOID : stencil;
    xrCompatible = xrCompatible === VOID ? VOID : xrCompatible;
    return Object.assign({}, source, {alpha: alpha, antialias: antialias, depth: depth, desynchronized: desynchronized, failIfMajorPerformanceCaveat: failIfMajorPerformanceCaveat, powerPreference: powerPreference, premultipliedAlpha: premultipliedAlpha, preserveDrawingBuffer: preserveDrawingBuffer, stencil: stencil, xrCompatible: xrCompatible});
  }
  function web_history_HashChangeEventInit_Companion_keds3u_invoke_jkqnwo(bubbles, cancelable, composed, newURL, oldURL) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    newURL = newURL === VOID ? VOID : newURL;
    oldURL = oldURL === VOID ? VOID : oldURL;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, newURL: newURL, oldURL: oldURL};
  }
  function web_history_HashChangeEventInit_Companion_keds3u_copy_1tks5(source, bubbles, cancelable, composed, newURL, oldURL) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    newURL = newURL === VOID ? VOID : newURL;
    oldURL = oldURL === VOID ? VOID : oldURL;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, newURL: newURL, oldURL: oldURL});
  }
  function web_history_PageTransitionEventInit_Companion_z1szlc_invoke_jkqnwo(bubbles, cancelable, composed, persisted) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    persisted = persisted === VOID ? VOID : persisted;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, persisted: persisted};
  }
  function web_history_PageTransitionEventInit_Companion_z1szlc_copy_1tks5(source, bubbles, cancelable, composed, persisted) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    persisted = persisted === VOID ? VOID : persisted;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, persisted: persisted});
  }
  function web_history_PopStateEventInit_Companion_yxntuc_invoke_jkqnwo(bubbles, cancelable, composed, hasUAVisualTransition, state) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    hasUAVisualTransition = hasUAVisualTransition === VOID ? VOID : hasUAVisualTransition;
    state = state === VOID ? VOID : state;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, hasUAVisualTransition: hasUAVisualTransition, state: state};
  }
  function web_history_PopStateEventInit_Companion_yxntuc_copy_1tks5(source, bubbles, cancelable, composed, hasUAVisualTransition, state) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    hasUAVisualTransition = hasUAVisualTransition === VOID ? VOID : hasUAVisualTransition;
    state = state === VOID ? VOID : state;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, hasUAVisualTransition: hasUAVisualTransition, state: state});
  }
  function web_input_CompositionEventInit_Companion_iwk4ik_invoke_jkqnwo(bubbles, cancelable, composed, detail, view, data) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    data = data === VOID ? VOID : data;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, data: data};
  }
  function web_input_CompositionEventInit_Companion_iwk4ik_copy_1tks5(source, bubbles, cancelable, composed, detail, view, data) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    data = data === VOID ? VOID : data;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, data: data});
  }
  function web_input_InputEventInit_Companion_yqy3i4_invoke_jkqnwo(bubbles, cancelable, composed, detail, view, data, dataTransfer, inputType, isComposing, targetRanges) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    data = data === VOID ? VOID : data;
    dataTransfer = dataTransfer === VOID ? VOID : dataTransfer;
    inputType = inputType === VOID ? VOID : inputType;
    isComposing = isComposing === VOID ? VOID : isComposing;
    targetRanges = targetRanges === VOID ? VOID : targetRanges;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, data: data, dataTransfer: dataTransfer, inputType: inputType, isComposing: isComposing, targetRanges: targetRanges};
  }
  function web_input_InputEventInit_Companion_yqy3i4_copy_1tks5(source, bubbles, cancelable, composed, detail, view, data, dataTransfer, inputType, isComposing, targetRanges) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    data = data === VOID ? VOID : data;
    dataTransfer = dataTransfer === VOID ? VOID : dataTransfer;
    inputType = inputType === VOID ? VOID : inputType;
    isComposing = isComposing === VOID ? VOID : isComposing;
    targetRanges = targetRanges === VOID ? VOID : targetRanges;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, data: data, dataTransfer: dataTransfer, inputType: inputType, isComposing: isComposing, targetRanges: targetRanges});
  }
  function web_keyboard_KeyboardEventInit_Companion_i71kpg_invoke_jkqnwo(bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, code, isComposing, key, location, repeat) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    code = code === VOID ? VOID : code;
    isComposing = isComposing === VOID ? VOID : isComposing;
    key = key === VOID ? VOID : key;
    location = location === VOID ? VOID : location;
    repeat = repeat === VOID ? VOID : repeat;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, code: code, isComposing: isComposing, key: key, location: location, repeat: repeat};
  }
  function web_keyboard_KeyboardEventInit_Companion_i71kpg_copy_1tks5(source, bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, code, isComposing, key, location, repeat) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    code = code === VOID ? VOID : code;
    isComposing = isComposing === VOID ? VOID : isComposing;
    key = key === VOID ? VOID : key;
    location = location === VOID ? VOID : location;
    repeat = repeat === VOID ? VOID : repeat;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, code: code, isComposing: isComposing, key: key, location: location, repeat: repeat});
  }
  function web_mediacapabilities_AudioConfiguration_Companion_rb9dsc_invoke_jkqnwo(bitrate, channels, contentType, samplerate, spatialRendering) {
    bitrate = bitrate === VOID ? VOID : bitrate;
    channels = channels === VOID ? VOID : channels;
    samplerate = samplerate === VOID ? VOID : samplerate;
    spatialRendering = spatialRendering === VOID ? VOID : spatialRendering;
    return {bitrate: bitrate, channels: channels, contentType: contentType, samplerate: samplerate, spatialRendering: spatialRendering};
  }
  function web_mediacapabilities_AudioConfiguration_Companion_rb9dsc_copy_1tks5(source, bitrate, channels, contentType, samplerate, spatialRendering) {
    bitrate = bitrate === VOID ? VOID : bitrate;
    channels = channels === VOID ? VOID : channels;
    contentType = contentType === VOID ? VOID : contentType;
    samplerate = samplerate === VOID ? VOID : samplerate;
    spatialRendering = spatialRendering === VOID ? VOID : spatialRendering;
    return Object.assign({}, source, {bitrate: bitrate, channels: channels, contentType: contentType, samplerate: samplerate, spatialRendering: spatialRendering});
  }
  function web_mediacapabilities_KeySystemTrackConfiguration_Companion_899d1z_invoke_jkqnwo(robustness) {
    robustness = robustness === VOID ? VOID : robustness;
    return {robustness: robustness};
  }
  function web_mediacapabilities_KeySystemTrackConfiguration_Companion_899d1z_copy_1tks5(source, robustness) {
    robustness = robustness === VOID ? VOID : robustness;
    return Object.assign({}, source, {robustness: robustness});
  }
  function web_mediacapabilities_MediaCapabilitiesDecodingInfo_Companion_nv6nx_invoke_jkqnwo(powerEfficient, smooth, supported, keySystemAccess) {
    keySystemAccess = keySystemAccess === VOID ? VOID : keySystemAccess;
    return {powerEfficient: powerEfficient, smooth: smooth, supported: supported, keySystemAccess: keySystemAccess};
  }
  function web_mediacapabilities_MediaCapabilitiesDecodingInfo_Companion_nv6nx_copy_1tks5(source, powerEfficient, smooth, supported, keySystemAccess) {
    powerEfficient = powerEfficient === VOID ? VOID : powerEfficient;
    smooth = smooth === VOID ? VOID : smooth;
    supported = supported === VOID ? VOID : supported;
    keySystemAccess = keySystemAccess === VOID ? VOID : keySystemAccess;
    return Object.assign({}, source, {powerEfficient: powerEfficient, smooth: smooth, supported: supported, keySystemAccess: keySystemAccess});
  }
  function web_mediacapabilities_MediaCapabilitiesEncodingInfo_Companion_2wryad_invoke_jkqnwo(powerEfficient, smooth, supported) {
    return {powerEfficient: powerEfficient, smooth: smooth, supported: supported};
  }
  function web_mediacapabilities_MediaCapabilitiesEncodingInfo_Companion_2wryad_copy_1tks5(source, powerEfficient, smooth, supported) {
    powerEfficient = powerEfficient === VOID ? VOID : powerEfficient;
    smooth = smooth === VOID ? VOID : smooth;
    supported = supported === VOID ? VOID : supported;
    return Object.assign({}, source, {powerEfficient: powerEfficient, smooth: smooth, supported: supported});
  }
  function web_mediacapabilities_MediaCapabilitiesInfo_Companion_hx3wy0_invoke_jkqnwo(powerEfficient, smooth, supported) {
    return {powerEfficient: powerEfficient, smooth: smooth, supported: supported};
  }
  function web_mediacapabilities_MediaCapabilitiesInfo_Companion_hx3wy0_copy_1tks5(source, powerEfficient, smooth, supported) {
    powerEfficient = powerEfficient === VOID ? VOID : powerEfficient;
    smooth = smooth === VOID ? VOID : smooth;
    supported = supported === VOID ? VOID : supported;
    return Object.assign({}, source, {powerEfficient: powerEfficient, smooth: smooth, supported: supported});
  }
  function web_mediacapabilities_MediaCapabilitiesKeySystemConfiguration_Companion_r3bxwy_invoke_jkqnwo(audio, distinctiveIdentifier, initDataType, keySystem, persistentState, sessionTypes, video) {
    audio = audio === VOID ? VOID : audio;
    distinctiveIdentifier = distinctiveIdentifier === VOID ? VOID : distinctiveIdentifier;
    initDataType = initDataType === VOID ? VOID : initDataType;
    persistentState = persistentState === VOID ? VOID : persistentState;
    sessionTypes = sessionTypes === VOID ? VOID : sessionTypes;
    video = video === VOID ? VOID : video;
    return {audio: audio, distinctiveIdentifier: distinctiveIdentifier, initDataType: initDataType, keySystem: keySystem, persistentState: persistentState, sessionTypes: sessionTypes, video: video};
  }
  function web_mediacapabilities_MediaCapabilitiesKeySystemConfiguration_Companion_r3bxwy_copy_1tks5(source, audio, distinctiveIdentifier, initDataType, keySystem, persistentState, sessionTypes, video) {
    audio = audio === VOID ? VOID : audio;
    distinctiveIdentifier = distinctiveIdentifier === VOID ? VOID : distinctiveIdentifier;
    initDataType = initDataType === VOID ? VOID : initDataType;
    keySystem = keySystem === VOID ? VOID : keySystem;
    persistentState = persistentState === VOID ? VOID : persistentState;
    sessionTypes = sessionTypes === VOID ? VOID : sessionTypes;
    video = video === VOID ? VOID : video;
    return Object.assign({}, source, {audio: audio, distinctiveIdentifier: distinctiveIdentifier, initDataType: initDataType, keySystem: keySystem, persistentState: persistentState, sessionTypes: sessionTypes, video: video});
  }
  function web_mediacapabilities_MediaConfiguration_Companion_lxxyda_invoke_jkqnwo(audio, video) {
    audio = audio === VOID ? VOID : audio;
    video = video === VOID ? VOID : video;
    return {audio: audio, video: video};
  }
  function web_mediacapabilities_MediaConfiguration_Companion_lxxyda_copy_1tks5(source, audio, video) {
    audio = audio === VOID ? VOID : audio;
    video = video === VOID ? VOID : video;
    return Object.assign({}, source, {audio: audio, video: video});
  }
  function web_mediacapabilities_MediaDecodingConfiguration_Companion_yz4ivn_invoke_jkqnwo(audio, video, keySystemConfiguration, type) {
    audio = audio === VOID ? VOID : audio;
    video = video === VOID ? VOID : video;
    keySystemConfiguration = keySystemConfiguration === VOID ? VOID : keySystemConfiguration;
    return {audio: audio, video: video, keySystemConfiguration: keySystemConfiguration, type: type};
  }
  function web_mediacapabilities_MediaDecodingConfiguration_Companion_yz4ivn_copy_1tks5(source, audio, video, keySystemConfiguration, type) {
    audio = audio === VOID ? VOID : audio;
    video = video === VOID ? VOID : video;
    keySystemConfiguration = keySystemConfiguration === VOID ? VOID : keySystemConfiguration;
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {audio: audio, video: video, keySystemConfiguration: keySystemConfiguration, type: type});
  }
  function web_mediacapabilities_MediaEncodingConfiguration_Companion_skhrx1_invoke_jkqnwo(audio, video, type) {
    audio = audio === VOID ? VOID : audio;
    video = video === VOID ? VOID : video;
    return {audio: audio, video: video, type: type};
  }
  function web_mediacapabilities_MediaEncodingConfiguration_Companion_skhrx1_copy_1tks5(source, audio, video, type) {
    audio = audio === VOID ? VOID : audio;
    video = video === VOID ? VOID : video;
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {audio: audio, video: video, type: type});
  }
  function web_mediacapabilities_VideoConfiguration_Companion_rh6cp3_invoke_jkqnwo(bitrate, colorGamut, contentType, framerate, hasAlphaChannel, hdrMetadataType, height, scalabilityMode, transferFunction, width) {
    colorGamut = colorGamut === VOID ? VOID : colorGamut;
    hasAlphaChannel = hasAlphaChannel === VOID ? VOID : hasAlphaChannel;
    hdrMetadataType = hdrMetadataType === VOID ? VOID : hdrMetadataType;
    scalabilityMode = scalabilityMode === VOID ? VOID : scalabilityMode;
    transferFunction = transferFunction === VOID ? VOID : transferFunction;
    return {bitrate: bitrate, colorGamut: colorGamut, contentType: contentType, framerate: framerate, hasAlphaChannel: hasAlphaChannel, hdrMetadataType: hdrMetadataType, height: height, scalabilityMode: scalabilityMode, transferFunction: transferFunction, width: width};
  }
  function web_mediacapabilities_VideoConfiguration_Companion_rh6cp3_copy_1tks5(source, bitrate, colorGamut, contentType, framerate, hasAlphaChannel, hdrMetadataType, height, scalabilityMode, transferFunction, width) {
    bitrate = bitrate === VOID ? VOID : bitrate;
    colorGamut = colorGamut === VOID ? VOID : colorGamut;
    contentType = contentType === VOID ? VOID : contentType;
    framerate = framerate === VOID ? VOID : framerate;
    hasAlphaChannel = hasAlphaChannel === VOID ? VOID : hasAlphaChannel;
    hdrMetadataType = hdrMetadataType === VOID ? VOID : hdrMetadataType;
    height = height === VOID ? VOID : height;
    scalabilityMode = scalabilityMode === VOID ? VOID : scalabilityMode;
    transferFunction = transferFunction === VOID ? VOID : transferFunction;
    width = width === VOID ? VOID : width;
    return Object.assign({}, source, {bitrate: bitrate, colorGamut: colorGamut, contentType: contentType, framerate: framerate, hasAlphaChannel: hasAlphaChannel, hdrMetadataType: hdrMetadataType, height: height, scalabilityMode: scalabilityMode, transferFunction: transferFunction, width: width});
  }
  function web_mediadevices_DisplayMediaStreamOptions_Companion_jinbz5_invoke_jkqnwo(audio, video) {
    audio = audio === VOID ? VOID : audio;
    video = video === VOID ? VOID : video;
    return {audio: audio, video: video};
  }
  function web_mediadevices_DisplayMediaStreamOptions_Companion_jinbz5_copy_1tks5(source, audio, video) {
    audio = audio === VOID ? VOID : audio;
    video = video === VOID ? VOID : video;
    return Object.assign({}, source, {audio: audio, video: video});
  }
  function web_mediakey_MediaKeyMessageEventInit_Companion_ej30lx_invoke_jkqnwo(bubbles, cancelable, composed, message, messageType) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, message: message, messageType: messageType};
  }
  function web_mediakey_MediaKeyMessageEventInit_Companion_ej30lx_copy_1tks5(source, bubbles, cancelable, composed, message, messageType) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    message = message === VOID ? VOID : message;
    messageType = messageType === VOID ? VOID : messageType;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, message: message, messageType: messageType});
  }
  function web_mediakey_MediaKeySystemConfiguration_Companion_cffm41_invoke_jkqnwo(audioCapabilities, distinctiveIdentifier, initDataTypes, label, persistentState, sessionTypes, videoCapabilities) {
    audioCapabilities = audioCapabilities === VOID ? VOID : audioCapabilities;
    distinctiveIdentifier = distinctiveIdentifier === VOID ? VOID : distinctiveIdentifier;
    initDataTypes = initDataTypes === VOID ? VOID : initDataTypes;
    label = label === VOID ? VOID : label;
    persistentState = persistentState === VOID ? VOID : persistentState;
    sessionTypes = sessionTypes === VOID ? VOID : sessionTypes;
    videoCapabilities = videoCapabilities === VOID ? VOID : videoCapabilities;
    return {audioCapabilities: audioCapabilities, distinctiveIdentifier: distinctiveIdentifier, initDataTypes: initDataTypes, label: label, persistentState: persistentState, sessionTypes: sessionTypes, videoCapabilities: videoCapabilities};
  }
  function web_mediakey_MediaKeySystemConfiguration_Companion_cffm41_copy_1tks5(source, audioCapabilities, distinctiveIdentifier, initDataTypes, label, persistentState, sessionTypes, videoCapabilities) {
    audioCapabilities = audioCapabilities === VOID ? VOID : audioCapabilities;
    distinctiveIdentifier = distinctiveIdentifier === VOID ? VOID : distinctiveIdentifier;
    initDataTypes = initDataTypes === VOID ? VOID : initDataTypes;
    label = label === VOID ? VOID : label;
    persistentState = persistentState === VOID ? VOID : persistentState;
    sessionTypes = sessionTypes === VOID ? VOID : sessionTypes;
    videoCapabilities = videoCapabilities === VOID ? VOID : videoCapabilities;
    return Object.assign({}, source, {audioCapabilities: audioCapabilities, distinctiveIdentifier: distinctiveIdentifier, initDataTypes: initDataTypes, label: label, persistentState: persistentState, sessionTypes: sessionTypes, videoCapabilities: videoCapabilities});
  }
  function web_mediakey_MediaKeySystemMediaCapability_Companion_o6x6uh_invoke_jkqnwo(contentType, encryptionScheme, robustness) {
    contentType = contentType === VOID ? VOID : contentType;
    encryptionScheme = encryptionScheme === VOID ? VOID : encryptionScheme;
    robustness = robustness === VOID ? VOID : robustness;
    return {contentType: contentType, encryptionScheme: encryptionScheme, robustness: robustness};
  }
  function web_mediakey_MediaKeySystemMediaCapability_Companion_o6x6uh_copy_1tks5(source, contentType, encryptionScheme, robustness) {
    contentType = contentType === VOID ? VOID : contentType;
    encryptionScheme = encryptionScheme === VOID ? VOID : encryptionScheme;
    robustness = robustness === VOID ? VOID : robustness;
    return Object.assign({}, source, {contentType: contentType, encryptionScheme: encryptionScheme, robustness: robustness});
  }
  function web_mediakey_MediaKeysPolicy_Companion_swavjl_invoke_jkqnwo(minHdcpVersion) {
    minHdcpVersion = minHdcpVersion === VOID ? VOID : minHdcpVersion;
    return {minHdcpVersion: minHdcpVersion};
  }
  function web_mediakey_MediaKeysPolicy_Companion_swavjl_copy_1tks5(source, minHdcpVersion) {
    minHdcpVersion = minHdcpVersion === VOID ? VOID : minHdcpVersion;
    return Object.assign({}, source, {minHdcpVersion: minHdcpVersion});
  }
  function web_mediasession_MediaImage_Companion_vi4v1l_invoke_jkqnwo(sizes, src, type) {
    sizes = sizes === VOID ? VOID : sizes;
    type = type === VOID ? VOID : type;
    return {sizes: sizes, src: src, type: type};
  }
  function web_mediasession_MediaImage_Companion_vi4v1l_copy_1tks5(source, sizes, src, type) {
    sizes = sizes === VOID ? VOID : sizes;
    src = src === VOID ? VOID : src;
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {sizes: sizes, src: src, type: type});
  }
  function web_mediasession_MediaMetadataInit_Companion_akd34v_invoke_jkqnwo(album, artist, artwork, title) {
    album = album === VOID ? VOID : album;
    artist = artist === VOID ? VOID : artist;
    artwork = artwork === VOID ? VOID : artwork;
    title = title === VOID ? VOID : title;
    return {album: album, artist: artist, artwork: artwork, title: title};
  }
  function web_mediasession_MediaMetadataInit_Companion_akd34v_copy_1tks5(source, album, artist, artwork, title) {
    album = album === VOID ? VOID : album;
    artist = artist === VOID ? VOID : artist;
    artwork = artwork === VOID ? VOID : artwork;
    title = title === VOID ? VOID : title;
    return Object.assign({}, source, {album: album, artist: artist, artwork: artwork, title: title});
  }
  function web_mediasession_MediaPositionState_Companion_6nsli4_invoke_jkqnwo(duration, playbackRate, position) {
    duration = duration === VOID ? VOID : duration;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    position = position === VOID ? VOID : position;
    return {duration: duration, playbackRate: playbackRate, position: position};
  }
  function web_mediasession_MediaPositionState_Companion_6nsli4_copy_1tks5(source, duration, playbackRate, position) {
    duration = duration === VOID ? VOID : duration;
    playbackRate = playbackRate === VOID ? VOID : playbackRate;
    position = position === VOID ? VOID : position;
    return Object.assign({}, source, {duration: duration, playbackRate: playbackRate, position: position});
  }
  function web_mediasession_MediaSessionActionDetails_Companion_23kcay_invoke_jkqnwo(action, fastSeek, seekOffset, seekTime) {
    fastSeek = fastSeek === VOID ? VOID : fastSeek;
    seekOffset = seekOffset === VOID ? VOID : seekOffset;
    seekTime = seekTime === VOID ? VOID : seekTime;
    return {action: action, fastSeek: fastSeek, seekOffset: seekOffset, seekTime: seekTime};
  }
  function web_mediasession_MediaSessionActionDetails_Companion_23kcay_copy_1tks5(source, action, fastSeek, seekOffset, seekTime) {
    action = action === VOID ? VOID : action;
    fastSeek = fastSeek === VOID ? VOID : fastSeek;
    seekOffset = seekOffset === VOID ? VOID : seekOffset;
    seekTime = seekTime === VOID ? VOID : seekTime;
    return Object.assign({}, source, {action: action, fastSeek: fastSeek, seekOffset: seekOffset, seekTime: seekTime});
  }
  function web_mediastreams_DoubleRange_Companion_j8rp51_invoke_jkqnwo(max, min) {
    max = max === VOID ? VOID : max;
    min = min === VOID ? VOID : min;
    return {max: max, min: min};
  }
  function web_mediastreams_DoubleRange_Companion_j8rp51_copy_1tks5(source, max, min) {
    max = max === VOID ? VOID : max;
    min = min === VOID ? VOID : min;
    return Object.assign({}, source, {max: max, min: min});
  }
  function web_mediastreams_MediaStreamConstraints_Companion_wrx95h_invoke_jkqnwo(audio, peerIdentity, preferCurrentTab, video) {
    audio = audio === VOID ? VOID : audio;
    peerIdentity = peerIdentity === VOID ? VOID : peerIdentity;
    preferCurrentTab = preferCurrentTab === VOID ? VOID : preferCurrentTab;
    video = video === VOID ? VOID : video;
    return {audio: audio, peerIdentity: peerIdentity, preferCurrentTab: preferCurrentTab, video: video};
  }
  function web_mediastreams_MediaStreamConstraints_Companion_wrx95h_copy_1tks5(source, audio, peerIdentity, preferCurrentTab, video) {
    audio = audio === VOID ? VOID : audio;
    peerIdentity = peerIdentity === VOID ? VOID : peerIdentity;
    preferCurrentTab = preferCurrentTab === VOID ? VOID : preferCurrentTab;
    video = video === VOID ? VOID : video;
    return Object.assign({}, source, {audio: audio, peerIdentity: peerIdentity, preferCurrentTab: preferCurrentTab, video: video});
  }
  function web_mediastreams_MediaStreamTrackEventInit_Companion_5o1dvo_invoke_jkqnwo(bubbles, cancelable, composed, track) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, track: track};
  }
  function web_mediastreams_MediaStreamTrackEventInit_Companion_5o1dvo_copy_1tks5(source, bubbles, cancelable, composed, track) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    track = track === VOID ? VOID : track;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, track: track});
  }
  function web_mediastreams_MediaTrackCapabilities_Companion_kdkr8g_invoke_jkqnwo(aspectRatio, autoGainControl, backgroundBlur, channelCount, deviceId, displaySurface, echoCancellation, facingMode, frameRate, groupId, height, noiseSuppression, sampleRate, sampleSize, width) {
    aspectRatio = aspectRatio === VOID ? VOID : aspectRatio;
    autoGainControl = autoGainControl === VOID ? VOID : autoGainControl;
    backgroundBlur = backgroundBlur === VOID ? VOID : backgroundBlur;
    channelCount = channelCount === VOID ? VOID : channelCount;
    deviceId = deviceId === VOID ? VOID : deviceId;
    displaySurface = displaySurface === VOID ? VOID : displaySurface;
    echoCancellation = echoCancellation === VOID ? VOID : echoCancellation;
    facingMode = facingMode === VOID ? VOID : facingMode;
    frameRate = frameRate === VOID ? VOID : frameRate;
    groupId = groupId === VOID ? VOID : groupId;
    height = height === VOID ? VOID : height;
    noiseSuppression = noiseSuppression === VOID ? VOID : noiseSuppression;
    sampleRate = sampleRate === VOID ? VOID : sampleRate;
    sampleSize = sampleSize === VOID ? VOID : sampleSize;
    width = width === VOID ? VOID : width;
    return {aspectRatio: aspectRatio, autoGainControl: autoGainControl, backgroundBlur: backgroundBlur, channelCount: channelCount, deviceId: deviceId, displaySurface: displaySurface, echoCancellation: echoCancellation, facingMode: facingMode, frameRate: frameRate, groupId: groupId, height: height, noiseSuppression: noiseSuppression, sampleRate: sampleRate, sampleSize: sampleSize, width: width};
  }
  function web_mediastreams_MediaTrackCapabilities_Companion_kdkr8g_copy_1tks5(source, aspectRatio, autoGainControl, backgroundBlur, channelCount, deviceId, displaySurface, echoCancellation, facingMode, frameRate, groupId, height, noiseSuppression, sampleRate, sampleSize, width) {
    aspectRatio = aspectRatio === VOID ? VOID : aspectRatio;
    autoGainControl = autoGainControl === VOID ? VOID : autoGainControl;
    backgroundBlur = backgroundBlur === VOID ? VOID : backgroundBlur;
    channelCount = channelCount === VOID ? VOID : channelCount;
    deviceId = deviceId === VOID ? VOID : deviceId;
    displaySurface = displaySurface === VOID ? VOID : displaySurface;
    echoCancellation = echoCancellation === VOID ? VOID : echoCancellation;
    facingMode = facingMode === VOID ? VOID : facingMode;
    frameRate = frameRate === VOID ? VOID : frameRate;
    groupId = groupId === VOID ? VOID : groupId;
    height = height === VOID ? VOID : height;
    noiseSuppression = noiseSuppression === VOID ? VOID : noiseSuppression;
    sampleRate = sampleRate === VOID ? VOID : sampleRate;
    sampleSize = sampleSize === VOID ? VOID : sampleSize;
    width = width === VOID ? VOID : width;
    return Object.assign({}, source, {aspectRatio: aspectRatio, autoGainControl: autoGainControl, backgroundBlur: backgroundBlur, channelCount: channelCount, deviceId: deviceId, displaySurface: displaySurface, echoCancellation: echoCancellation, facingMode: facingMode, frameRate: frameRate, groupId: groupId, height: height, noiseSuppression: noiseSuppression, sampleRate: sampleRate, sampleSize: sampleSize, width: width});
  }
  function web_mediastreams_MediaTrackConstraintSet_Companion_gejg0n_invoke_jkqnwo(aspectRatio, autoGainControl, backgroundBlur, channelCount, deviceId, displaySurface, echoCancellation, facingMode, frameRate, groupId, height, noiseSuppression, sampleRate, sampleSize, width) {
    aspectRatio = aspectRatio === VOID ? VOID : aspectRatio;
    autoGainControl = autoGainControl === VOID ? VOID : autoGainControl;
    backgroundBlur = backgroundBlur === VOID ? VOID : backgroundBlur;
    channelCount = channelCount === VOID ? VOID : channelCount;
    deviceId = deviceId === VOID ? VOID : deviceId;
    displaySurface = displaySurface === VOID ? VOID : displaySurface;
    echoCancellation = echoCancellation === VOID ? VOID : echoCancellation;
    facingMode = facingMode === VOID ? VOID : facingMode;
    frameRate = frameRate === VOID ? VOID : frameRate;
    groupId = groupId === VOID ? VOID : groupId;
    height = height === VOID ? VOID : height;
    noiseSuppression = noiseSuppression === VOID ? VOID : noiseSuppression;
    sampleRate = sampleRate === VOID ? VOID : sampleRate;
    sampleSize = sampleSize === VOID ? VOID : sampleSize;
    width = width === VOID ? VOID : width;
    return {aspectRatio: aspectRatio, autoGainControl: autoGainControl, backgroundBlur: backgroundBlur, channelCount: channelCount, deviceId: deviceId, displaySurface: displaySurface, echoCancellation: echoCancellation, facingMode: facingMode, frameRate: frameRate, groupId: groupId, height: height, noiseSuppression: noiseSuppression, sampleRate: sampleRate, sampleSize: sampleSize, width: width};
  }
  function web_mediastreams_MediaTrackConstraintSet_Companion_gejg0n_copy_1tks5(source, aspectRatio, autoGainControl, backgroundBlur, channelCount, deviceId, displaySurface, echoCancellation, facingMode, frameRate, groupId, height, noiseSuppression, sampleRate, sampleSize, width) {
    aspectRatio = aspectRatio === VOID ? VOID : aspectRatio;
    autoGainControl = autoGainControl === VOID ? VOID : autoGainControl;
    backgroundBlur = backgroundBlur === VOID ? VOID : backgroundBlur;
    channelCount = channelCount === VOID ? VOID : channelCount;
    deviceId = deviceId === VOID ? VOID : deviceId;
    displaySurface = displaySurface === VOID ? VOID : displaySurface;
    echoCancellation = echoCancellation === VOID ? VOID : echoCancellation;
    facingMode = facingMode === VOID ? VOID : facingMode;
    frameRate = frameRate === VOID ? VOID : frameRate;
    groupId = groupId === VOID ? VOID : groupId;
    height = height === VOID ? VOID : height;
    noiseSuppression = noiseSuppression === VOID ? VOID : noiseSuppression;
    sampleRate = sampleRate === VOID ? VOID : sampleRate;
    sampleSize = sampleSize === VOID ? VOID : sampleSize;
    width = width === VOID ? VOID : width;
    return Object.assign({}, source, {aspectRatio: aspectRatio, autoGainControl: autoGainControl, backgroundBlur: backgroundBlur, channelCount: channelCount, deviceId: deviceId, displaySurface: displaySurface, echoCancellation: echoCancellation, facingMode: facingMode, frameRate: frameRate, groupId: groupId, height: height, noiseSuppression: noiseSuppression, sampleRate: sampleRate, sampleSize: sampleSize, width: width});
  }
  function web_mediastreams_MediaTrackConstraints_Companion_4qpuvc_invoke_jkqnwo(aspectRatio, autoGainControl, backgroundBlur, channelCount, deviceId, displaySurface, echoCancellation, facingMode, frameRate, groupId, height, noiseSuppression, sampleRate, sampleSize, width, advanced) {
    aspectRatio = aspectRatio === VOID ? VOID : aspectRatio;
    autoGainControl = autoGainControl === VOID ? VOID : autoGainControl;
    backgroundBlur = backgroundBlur === VOID ? VOID : backgroundBlur;
    channelCount = channelCount === VOID ? VOID : channelCount;
    deviceId = deviceId === VOID ? VOID : deviceId;
    displaySurface = displaySurface === VOID ? VOID : displaySurface;
    echoCancellation = echoCancellation === VOID ? VOID : echoCancellation;
    facingMode = facingMode === VOID ? VOID : facingMode;
    frameRate = frameRate === VOID ? VOID : frameRate;
    groupId = groupId === VOID ? VOID : groupId;
    height = height === VOID ? VOID : height;
    noiseSuppression = noiseSuppression === VOID ? VOID : noiseSuppression;
    sampleRate = sampleRate === VOID ? VOID : sampleRate;
    sampleSize = sampleSize === VOID ? VOID : sampleSize;
    width = width === VOID ? VOID : width;
    advanced = advanced === VOID ? VOID : advanced;
    return {aspectRatio: aspectRatio, autoGainControl: autoGainControl, backgroundBlur: backgroundBlur, channelCount: channelCount, deviceId: deviceId, displaySurface: displaySurface, echoCancellation: echoCancellation, facingMode: facingMode, frameRate: frameRate, groupId: groupId, height: height, noiseSuppression: noiseSuppression, sampleRate: sampleRate, sampleSize: sampleSize, width: width, advanced: advanced};
  }
  function web_mediastreams_MediaTrackConstraints_Companion_4qpuvc_copy_1tks5(source, aspectRatio, autoGainControl, backgroundBlur, channelCount, deviceId, displaySurface, echoCancellation, facingMode, frameRate, groupId, height, noiseSuppression, sampleRate, sampleSize, width, advanced) {
    aspectRatio = aspectRatio === VOID ? VOID : aspectRatio;
    autoGainControl = autoGainControl === VOID ? VOID : autoGainControl;
    backgroundBlur = backgroundBlur === VOID ? VOID : backgroundBlur;
    channelCount = channelCount === VOID ? VOID : channelCount;
    deviceId = deviceId === VOID ? VOID : deviceId;
    displaySurface = displaySurface === VOID ? VOID : displaySurface;
    echoCancellation = echoCancellation === VOID ? VOID : echoCancellation;
    facingMode = facingMode === VOID ? VOID : facingMode;
    frameRate = frameRate === VOID ? VOID : frameRate;
    groupId = groupId === VOID ? VOID : groupId;
    height = height === VOID ? VOID : height;
    noiseSuppression = noiseSuppression === VOID ? VOID : noiseSuppression;
    sampleRate = sampleRate === VOID ? VOID : sampleRate;
    sampleSize = sampleSize === VOID ? VOID : sampleSize;
    width = width === VOID ? VOID : width;
    advanced = advanced === VOID ? VOID : advanced;
    return Object.assign({}, source, {aspectRatio: aspectRatio, autoGainControl: autoGainControl, backgroundBlur: backgroundBlur, channelCount: channelCount, deviceId: deviceId, displaySurface: displaySurface, echoCancellation: echoCancellation, facingMode: facingMode, frameRate: frameRate, groupId: groupId, height: height, noiseSuppression: noiseSuppression, sampleRate: sampleRate, sampleSize: sampleSize, width: width, advanced: advanced});
  }
  function web_mediastreams_MediaTrackSettings_Companion_tr686r_invoke_jkqnwo(aspectRatio, autoGainControl, backgroundBlur, channelCount, deviceId, displaySurface, echoCancellation, facingMode, frameRate, groupId, height, noiseSuppression, sampleRate, sampleSize, torch, whiteBalanceMode, width, zoom) {
    aspectRatio = aspectRatio === VOID ? VOID : aspectRatio;
    autoGainControl = autoGainControl === VOID ? VOID : autoGainControl;
    backgroundBlur = backgroundBlur === VOID ? VOID : backgroundBlur;
    channelCount = channelCount === VOID ? VOID : channelCount;
    deviceId = deviceId === VOID ? VOID : deviceId;
    displaySurface = displaySurface === VOID ? VOID : displaySurface;
    echoCancellation = echoCancellation === VOID ? VOID : echoCancellation;
    facingMode = facingMode === VOID ? VOID : facingMode;
    frameRate = frameRate === VOID ? VOID : frameRate;
    groupId = groupId === VOID ? VOID : groupId;
    height = height === VOID ? VOID : height;
    noiseSuppression = noiseSuppression === VOID ? VOID : noiseSuppression;
    sampleRate = sampleRate === VOID ? VOID : sampleRate;
    sampleSize = sampleSize === VOID ? VOID : sampleSize;
    torch = torch === VOID ? VOID : torch;
    whiteBalanceMode = whiteBalanceMode === VOID ? VOID : whiteBalanceMode;
    width = width === VOID ? VOID : width;
    zoom = zoom === VOID ? VOID : zoom;
    return {aspectRatio: aspectRatio, autoGainControl: autoGainControl, backgroundBlur: backgroundBlur, channelCount: channelCount, deviceId: deviceId, displaySurface: displaySurface, echoCancellation: echoCancellation, facingMode: facingMode, frameRate: frameRate, groupId: groupId, height: height, noiseSuppression: noiseSuppression, sampleRate: sampleRate, sampleSize: sampleSize, torch: torch, whiteBalanceMode: whiteBalanceMode, width: width, zoom: zoom};
  }
  function web_mediastreams_MediaTrackSettings_Companion_tr686r_copy_1tks5(source, aspectRatio, autoGainControl, backgroundBlur, channelCount, deviceId, displaySurface, echoCancellation, facingMode, frameRate, groupId, height, noiseSuppression, sampleRate, sampleSize, torch, whiteBalanceMode, width, zoom) {
    aspectRatio = aspectRatio === VOID ? VOID : aspectRatio;
    autoGainControl = autoGainControl === VOID ? VOID : autoGainControl;
    backgroundBlur = backgroundBlur === VOID ? VOID : backgroundBlur;
    channelCount = channelCount === VOID ? VOID : channelCount;
    deviceId = deviceId === VOID ? VOID : deviceId;
    displaySurface = displaySurface === VOID ? VOID : displaySurface;
    echoCancellation = echoCancellation === VOID ? VOID : echoCancellation;
    facingMode = facingMode === VOID ? VOID : facingMode;
    frameRate = frameRate === VOID ? VOID : frameRate;
    groupId = groupId === VOID ? VOID : groupId;
    height = height === VOID ? VOID : height;
    noiseSuppression = noiseSuppression === VOID ? VOID : noiseSuppression;
    sampleRate = sampleRate === VOID ? VOID : sampleRate;
    sampleSize = sampleSize === VOID ? VOID : sampleSize;
    torch = torch === VOID ? VOID : torch;
    whiteBalanceMode = whiteBalanceMode === VOID ? VOID : whiteBalanceMode;
    width = width === VOID ? VOID : width;
    zoom = zoom === VOID ? VOID : zoom;
    return Object.assign({}, source, {aspectRatio: aspectRatio, autoGainControl: autoGainControl, backgroundBlur: backgroundBlur, channelCount: channelCount, deviceId: deviceId, displaySurface: displaySurface, echoCancellation: echoCancellation, facingMode: facingMode, frameRate: frameRate, groupId: groupId, height: height, noiseSuppression: noiseSuppression, sampleRate: sampleRate, sampleSize: sampleSize, torch: torch, whiteBalanceMode: whiteBalanceMode, width: width, zoom: zoom});
  }
  function web_mediastreams_MediaTrackSupportedConstraints_Companion_io1qr2_invoke_jkqnwo(aspectRatio, autoGainControl, backgroundBlur, channelCount, deviceId, displaySurface, echoCancellation, facingMode, frameRate, groupId, height, noiseSuppression, sampleRate, sampleSize, width) {
    aspectRatio = aspectRatio === VOID ? VOID : aspectRatio;
    autoGainControl = autoGainControl === VOID ? VOID : autoGainControl;
    backgroundBlur = backgroundBlur === VOID ? VOID : backgroundBlur;
    channelCount = channelCount === VOID ? VOID : channelCount;
    deviceId = deviceId === VOID ? VOID : deviceId;
    displaySurface = displaySurface === VOID ? VOID : displaySurface;
    echoCancellation = echoCancellation === VOID ? VOID : echoCancellation;
    facingMode = facingMode === VOID ? VOID : facingMode;
    frameRate = frameRate === VOID ? VOID : frameRate;
    groupId = groupId === VOID ? VOID : groupId;
    height = height === VOID ? VOID : height;
    noiseSuppression = noiseSuppression === VOID ? VOID : noiseSuppression;
    sampleRate = sampleRate === VOID ? VOID : sampleRate;
    sampleSize = sampleSize === VOID ? VOID : sampleSize;
    width = width === VOID ? VOID : width;
    return {aspectRatio: aspectRatio, autoGainControl: autoGainControl, backgroundBlur: backgroundBlur, channelCount: channelCount, deviceId: deviceId, displaySurface: displaySurface, echoCancellation: echoCancellation, facingMode: facingMode, frameRate: frameRate, groupId: groupId, height: height, noiseSuppression: noiseSuppression, sampleRate: sampleRate, sampleSize: sampleSize, width: width};
  }
  function web_mediastreams_MediaTrackSupportedConstraints_Companion_io1qr2_copy_1tks5(source, aspectRatio, autoGainControl, backgroundBlur, channelCount, deviceId, displaySurface, echoCancellation, facingMode, frameRate, groupId, height, noiseSuppression, sampleRate, sampleSize, width) {
    aspectRatio = aspectRatio === VOID ? VOID : aspectRatio;
    autoGainControl = autoGainControl === VOID ? VOID : autoGainControl;
    backgroundBlur = backgroundBlur === VOID ? VOID : backgroundBlur;
    channelCount = channelCount === VOID ? VOID : channelCount;
    deviceId = deviceId === VOID ? VOID : deviceId;
    displaySurface = displaySurface === VOID ? VOID : displaySurface;
    echoCancellation = echoCancellation === VOID ? VOID : echoCancellation;
    facingMode = facingMode === VOID ? VOID : facingMode;
    frameRate = frameRate === VOID ? VOID : frameRate;
    groupId = groupId === VOID ? VOID : groupId;
    height = height === VOID ? VOID : height;
    noiseSuppression = noiseSuppression === VOID ? VOID : noiseSuppression;
    sampleRate = sampleRate === VOID ? VOID : sampleRate;
    sampleSize = sampleSize === VOID ? VOID : sampleSize;
    width = width === VOID ? VOID : width;
    return Object.assign({}, source, {aspectRatio: aspectRatio, autoGainControl: autoGainControl, backgroundBlur: backgroundBlur, channelCount: channelCount, deviceId: deviceId, displaySurface: displaySurface, echoCancellation: echoCancellation, facingMode: facingMode, frameRate: frameRate, groupId: groupId, height: height, noiseSuppression: noiseSuppression, sampleRate: sampleRate, sampleSize: sampleSize, width: width});
  }
  function web_mediastreams_ULongRange_Companion_73x3l_invoke_jkqnwo(max, min) {
    max = max === VOID ? VOID : max;
    min = min === VOID ? VOID : min;
    return {max: max, min: min};
  }
  function web_mediastreams_ULongRange_Companion_73x3l_copy_1tks5(source, max, min) {
    max = max === VOID ? VOID : max;
    min = min === VOID ? VOID : min;
    return Object.assign({}, source, {max: max, min: min});
  }
  function web_midi_MIDIConnectionEventInit_Companion_hev62_invoke_jkqnwo(bubbles, cancelable, composed, port) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    port = port === VOID ? VOID : port;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, port: port};
  }
  function web_midi_MIDIConnectionEventInit_Companion_hev62_copy_1tks5(source, bubbles, cancelable, composed, port) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    port = port === VOID ? VOID : port;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, port: port});
  }
  function web_midi_MIDIMessageEventInit_Companion_7df2ln_invoke_jkqnwo(bubbles, cancelable, composed, data) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    data = data === VOID ? VOID : data;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, data: data};
  }
  function web_midi_MIDIMessageEventInit_Companion_7df2ln_copy_1tks5(source, bubbles, cancelable, composed, data) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    data = data === VOID ? VOID : data;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, data: data});
  }
  function web_midi_MIDIOptions_Companion_hnqlhk_invoke_jkqnwo(software, sysex) {
    software = software === VOID ? VOID : software;
    sysex = sysex === VOID ? VOID : sysex;
    return {software: software, sysex: sysex};
  }
  function web_midi_MIDIOptions_Companion_hnqlhk_copy_1tks5(source, software, sysex) {
    software = software === VOID ? VOID : software;
    sysex = sysex === VOID ? VOID : sysex;
    return Object.assign({}, source, {software: software, sysex: sysex});
  }
  function web_mouse_MouseEventInit_Companion_iua62_invoke_jkqnwo(bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, button, buttons, clientX, clientY, movementX, movementY, relatedTarget, screenX, screenY) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    button = button === VOID ? VOID : button;
    buttons = buttons === VOID ? VOID : buttons;
    clientX = clientX === VOID ? VOID : clientX;
    clientY = clientY === VOID ? VOID : clientY;
    movementX = movementX === VOID ? VOID : movementX;
    movementY = movementY === VOID ? VOID : movementY;
    relatedTarget = relatedTarget === VOID ? VOID : relatedTarget;
    screenX = screenX === VOID ? VOID : screenX;
    screenY = screenY === VOID ? VOID : screenY;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, button: button, buttons: buttons, clientX: clientX, clientY: clientY, movementX: movementX, movementY: movementY, relatedTarget: relatedTarget, screenX: screenX, screenY: screenY};
  }
  function web_mouse_MouseEventInit_Companion_iua62_copy_1tks5(source, bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, button, buttons, clientX, clientY, movementX, movementY, relatedTarget, screenX, screenY) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    button = button === VOID ? VOID : button;
    buttons = buttons === VOID ? VOID : buttons;
    clientX = clientX === VOID ? VOID : clientX;
    clientY = clientY === VOID ? VOID : clientY;
    movementX = movementX === VOID ? VOID : movementX;
    movementY = movementY === VOID ? VOID : movementY;
    relatedTarget = relatedTarget === VOID ? VOID : relatedTarget;
    screenX = screenX === VOID ? VOID : screenX;
    screenY = screenY === VOID ? VOID : screenY;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, button: button, buttons: buttons, clientX: clientX, clientY: clientY, movementX: movementX, movementY: movementY, relatedTarget: relatedTarget, screenX: screenX, screenY: screenY});
  }
  function web_mouse_WheelEventInit_Companion_372r2o_invoke_jkqnwo(bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, button, buttons, clientX, clientY, movementX, movementY, relatedTarget, screenX, screenY, deltaMode, deltaX, deltaY, deltaZ) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    button = button === VOID ? VOID : button;
    buttons = buttons === VOID ? VOID : buttons;
    clientX = clientX === VOID ? VOID : clientX;
    clientY = clientY === VOID ? VOID : clientY;
    movementX = movementX === VOID ? VOID : movementX;
    movementY = movementY === VOID ? VOID : movementY;
    relatedTarget = relatedTarget === VOID ? VOID : relatedTarget;
    screenX = screenX === VOID ? VOID : screenX;
    screenY = screenY === VOID ? VOID : screenY;
    deltaMode = deltaMode === VOID ? VOID : deltaMode;
    deltaX = deltaX === VOID ? VOID : deltaX;
    deltaY = deltaY === VOID ? VOID : deltaY;
    deltaZ = deltaZ === VOID ? VOID : deltaZ;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, button: button, buttons: buttons, clientX: clientX, clientY: clientY, movementX: movementX, movementY: movementY, relatedTarget: relatedTarget, screenX: screenX, screenY: screenY, deltaMode: deltaMode, deltaX: deltaX, deltaY: deltaY, deltaZ: deltaZ};
  }
  function web_mouse_WheelEventInit_Companion_372r2o_copy_1tks5(source, bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, button, buttons, clientX, clientY, movementX, movementY, relatedTarget, screenX, screenY, deltaMode, deltaX, deltaY, deltaZ) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    button = button === VOID ? VOID : button;
    buttons = buttons === VOID ? VOID : buttons;
    clientX = clientX === VOID ? VOID : clientX;
    clientY = clientY === VOID ? VOID : clientY;
    movementX = movementX === VOID ? VOID : movementX;
    movementY = movementY === VOID ? VOID : movementY;
    relatedTarget = relatedTarget === VOID ? VOID : relatedTarget;
    screenX = screenX === VOID ? VOID : screenX;
    screenY = screenY === VOID ? VOID : screenY;
    deltaMode = deltaMode === VOID ? VOID : deltaMode;
    deltaX = deltaX === VOID ? VOID : deltaX;
    deltaY = deltaY === VOID ? VOID : deltaY;
    deltaZ = deltaZ === VOID ? VOID : deltaZ;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, button: button, buttons: buttons, clientX: clientX, clientY: clientY, movementX: movementX, movementY: movementY, relatedTarget: relatedTarget, screenX: screenX, screenY: screenY, deltaMode: deltaMode, deltaX: deltaX, deltaY: deltaY, deltaZ: deltaZ});
  }
  function web_notifications_NotificationOptions_Companion_vv004x_invoke_jkqnwo(badge, body, data, dir, icon, lang, requireInteraction, silent, tag) {
    badge = badge === VOID ? VOID : badge;
    body = body === VOID ? VOID : body;
    data = data === VOID ? VOID : data;
    dir = dir === VOID ? VOID : dir;
    icon = icon === VOID ? VOID : icon;
    lang = lang === VOID ? VOID : lang;
    requireInteraction = requireInteraction === VOID ? VOID : requireInteraction;
    silent = silent === VOID ? VOID : silent;
    tag = tag === VOID ? VOID : tag;
    return {badge: badge, body: body, data: data, dir: dir, icon: icon, lang: lang, requireInteraction: requireInteraction, silent: silent, tag: tag};
  }
  function web_notifications_NotificationOptions_Companion_vv004x_copy_1tks5(source, badge, body, data, dir, icon, lang, requireInteraction, silent, tag) {
    badge = badge === VOID ? VOID : badge;
    body = body === VOID ? VOID : body;
    data = data === VOID ? VOID : data;
    dir = dir === VOID ? VOID : dir;
    icon = icon === VOID ? VOID : icon;
    lang = lang === VOID ? VOID : lang;
    requireInteraction = requireInteraction === VOID ? VOID : requireInteraction;
    silent = silent === VOID ? VOID : silent;
    tag = tag === VOID ? VOID : tag;
    return Object.assign({}, source, {badge: badge, body: body, data: data, dir: dir, icon: icon, lang: lang, requireInteraction: requireInteraction, silent: silent, tag: tag});
  }
  function web_permissions_PermissionDescriptor_Companion_z6akow_invoke_jkqnwo(name) {
    return {name: name};
  }
  function web_permissions_PermissionDescriptor_Companion_z6akow_copy_1tks5(source, name) {
    name = name === VOID ? VOID : name;
    return Object.assign({}, source, {name: name});
  }
  function web_pointer_PointerEventInit_Companion_xaovvu_invoke_jkqnwo(bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, button, buttons, clientX, clientY, movementX, movementY, relatedTarget, screenX, screenY, altitudeAngle, azimuthAngle, coalescedEvents, height, isPrimary, pointerId, pointerType, predictedEvents, pressure, tangentialPressure, tiltX, tiltY, twist, width) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    button = button === VOID ? VOID : button;
    buttons = buttons === VOID ? VOID : buttons;
    clientX = clientX === VOID ? VOID : clientX;
    clientY = clientY === VOID ? VOID : clientY;
    movementX = movementX === VOID ? VOID : movementX;
    movementY = movementY === VOID ? VOID : movementY;
    relatedTarget = relatedTarget === VOID ? VOID : relatedTarget;
    screenX = screenX === VOID ? VOID : screenX;
    screenY = screenY === VOID ? VOID : screenY;
    altitudeAngle = altitudeAngle === VOID ? VOID : altitudeAngle;
    azimuthAngle = azimuthAngle === VOID ? VOID : azimuthAngle;
    coalescedEvents = coalescedEvents === VOID ? VOID : coalescedEvents;
    height = height === VOID ? VOID : height;
    isPrimary = isPrimary === VOID ? VOID : isPrimary;
    pointerId = pointerId === VOID ? VOID : pointerId;
    pointerType = pointerType === VOID ? VOID : pointerType;
    predictedEvents = predictedEvents === VOID ? VOID : predictedEvents;
    pressure = pressure === VOID ? VOID : pressure;
    tangentialPressure = tangentialPressure === VOID ? VOID : tangentialPressure;
    tiltX = tiltX === VOID ? VOID : tiltX;
    tiltY = tiltY === VOID ? VOID : tiltY;
    twist = twist === VOID ? VOID : twist;
    width = width === VOID ? VOID : width;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, button: button, buttons: buttons, clientX: clientX, clientY: clientY, movementX: movementX, movementY: movementY, relatedTarget: relatedTarget, screenX: screenX, screenY: screenY, altitudeAngle: altitudeAngle, azimuthAngle: azimuthAngle, coalescedEvents: coalescedEvents, height: height, isPrimary: isPrimary, pointerId: pointerId, pointerType: pointerType, predictedEvents: predictedEvents, pressure: pressure, tangentialPressure: tangentialPressure, tiltX: tiltX, tiltY: tiltY, twist: twist, width: width};
  }
  function web_pointer_PointerEventInit_Companion_xaovvu_copy_1tks5(source, bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, button, buttons, clientX, clientY, movementX, movementY, relatedTarget, screenX, screenY, altitudeAngle, azimuthAngle, coalescedEvents, height, isPrimary, pointerId, pointerType, predictedEvents, pressure, tangentialPressure, tiltX, tiltY, twist, width) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    button = button === VOID ? VOID : button;
    buttons = buttons === VOID ? VOID : buttons;
    clientX = clientX === VOID ? VOID : clientX;
    clientY = clientY === VOID ? VOID : clientY;
    movementX = movementX === VOID ? VOID : movementX;
    movementY = movementY === VOID ? VOID : movementY;
    relatedTarget = relatedTarget === VOID ? VOID : relatedTarget;
    screenX = screenX === VOID ? VOID : screenX;
    screenY = screenY === VOID ? VOID : screenY;
    altitudeAngle = altitudeAngle === VOID ? VOID : altitudeAngle;
    azimuthAngle = azimuthAngle === VOID ? VOID : azimuthAngle;
    coalescedEvents = coalescedEvents === VOID ? VOID : coalescedEvents;
    height = height === VOID ? VOID : height;
    isPrimary = isPrimary === VOID ? VOID : isPrimary;
    pointerId = pointerId === VOID ? VOID : pointerId;
    pointerType = pointerType === VOID ? VOID : pointerType;
    predictedEvents = predictedEvents === VOID ? VOID : predictedEvents;
    pressure = pressure === VOID ? VOID : pressure;
    tangentialPressure = tangentialPressure === VOID ? VOID : tangentialPressure;
    tiltX = tiltX === VOID ? VOID : tiltX;
    tiltY = tiltY === VOID ? VOID : tiltY;
    twist = twist === VOID ? VOID : twist;
    width = width === VOID ? VOID : width;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, button: button, buttons: buttons, clientX: clientX, clientY: clientY, movementX: movementX, movementY: movementY, relatedTarget: relatedTarget, screenX: screenX, screenY: screenY, altitudeAngle: altitudeAngle, azimuthAngle: azimuthAngle, coalescedEvents: coalescedEvents, height: height, isPrimary: isPrimary, pointerId: pointerId, pointerType: pointerType, predictedEvents: predictedEvents, pressure: pressure, tangentialPressure: tangentialPressure, tiltX: tiltX, tiltY: tiltY, twist: twist, width: width});
  }
  function web_popover_ShowPopoverOptions_Companion_2nrdc9_invoke_jkqnwo(source) {
    source = source === VOID ? VOID : source;
    return {source: source};
  }
  function web_popover_ShowPopoverOptions_Companion_2nrdc9_copy_1tks5(source, source_0) {
    source_0 = source_0 === VOID ? VOID : source_0;
    return Object.assign({}, source_0, {source: source_0});
  }
  function web_popover_ToggleEventInit_Companion_cwlci9_invoke_jkqnwo(bubbles, cancelable, composed, newState, oldState, source) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    newState = newState === VOID ? VOID : newState;
    oldState = oldState === VOID ? VOID : oldState;
    source = source === VOID ? VOID : source;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, newState: newState, oldState: oldState, source: source};
  }
  function web_popover_ToggleEventInit_Companion_cwlci9_copy_1tks5(source, bubbles, cancelable, composed, newState, oldState, source_0) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    newState = newState === VOID ? VOID : newState;
    oldState = oldState === VOID ? VOID : oldState;
    source_0 = source_0 === VOID ? VOID : source_0;
    return Object.assign({}, source_0, {bubbles: bubbles, cancelable: cancelable, composed: composed, newState: newState, oldState: oldState, source: source_0});
  }
  function web_popover_TogglePopoverOptions_Companion_vklyry_invoke_jkqnwo(source, force) {
    source = source === VOID ? VOID : source;
    force = force === VOID ? VOID : force;
    return {source: source, force: force};
  }
  function web_popover_TogglePopoverOptions_Companion_vklyry_copy_1tks5(source, source_0, force) {
    source_0 = source_0 === VOID ? VOID : source_0;
    force = force === VOID ? VOID : force;
    return Object.assign({}, source_0, {source: source_0, force: force});
  }
  function web_push_PushSubscriptionJSON_Companion_iey3s9_invoke_jkqnwo(endpoint, expirationTime, keys) {
    endpoint = endpoint === VOID ? VOID : endpoint;
    expirationTime = expirationTime === VOID ? VOID : expirationTime;
    keys = keys === VOID ? VOID : keys;
    return {endpoint: endpoint, expirationTime: expirationTime, keys: keys};
  }
  function web_push_PushSubscriptionJSON_Companion_iey3s9_copy_1tks5(source, endpoint, expirationTime, keys) {
    endpoint = endpoint === VOID ? VOID : endpoint;
    expirationTime = expirationTime === VOID ? VOID : expirationTime;
    keys = keys === VOID ? VOID : keys;
    return Object.assign({}, source, {endpoint: endpoint, expirationTime: expirationTime, keys: keys});
  }
  function web_push_PushSubscriptionOptionsInit_Companion_6mxe3f_invoke_jkqnwo(applicationServerKey, userVisibleOnly) {
    applicationServerKey = applicationServerKey === VOID ? VOID : applicationServerKey;
    userVisibleOnly = userVisibleOnly === VOID ? VOID : userVisibleOnly;
    return {applicationServerKey: applicationServerKey, userVisibleOnly: userVisibleOnly};
  }
  function web_push_PushSubscriptionOptionsInit_Companion_6mxe3f_copy_1tks5(source, applicationServerKey, userVisibleOnly) {
    applicationServerKey = applicationServerKey === VOID ? VOID : applicationServerKey;
    userVisibleOnly = userVisibleOnly === VOID ? VOID : userVisibleOnly;
    return Object.assign({}, source, {applicationServerKey: applicationServerKey, userVisibleOnly: userVisibleOnly});
  }
  function web_ranges_StaticRangeInit_Companion_c37k75_invoke_jkqnwo(endContainer, endOffset, startContainer, startOffset) {
    return {endContainer: endContainer, endOffset: endOffset, startContainer: startContainer, startOffset: startOffset};
  }
  function web_ranges_StaticRangeInit_Companion_c37k75_copy_1tks5(source, endContainer, endOffset, startContainer, startOffset) {
    endContainer = endContainer === VOID ? VOID : endContainer;
    endOffset = endOffset === VOID ? VOID : endOffset;
    startContainer = startContainer === VOID ? VOID : startContainer;
    startOffset = startOffset === VOID ? VOID : startOffset;
    return Object.assign({}, source, {endContainer: endContainer, endOffset: endOffset, startContainer: startContainer, startOffset: startOffset});
  }
  function web_scroll_ScrollIntoViewOptions_Companion_yfe79f_invoke_jkqnwo(behavior, block, inline) {
    behavior = behavior === VOID ? VOID : behavior;
    block = block === VOID ? VOID : block;
    inline = inline === VOID ? VOID : inline;
    return {behavior: behavior, block: block, inline: inline};
  }
  function web_scroll_ScrollIntoViewOptions_Companion_yfe79f_copy_1tks5(source, behavior, block, inline) {
    behavior = behavior === VOID ? VOID : behavior;
    block = block === VOID ? VOID : block;
    inline = inline === VOID ? VOID : inline;
    return Object.assign({}, source, {behavior: behavior, block: block, inline: inline});
  }
  function web_scroll_ScrollOptions_Companion_wa3ifs_invoke_jkqnwo(behavior) {
    behavior = behavior === VOID ? VOID : behavior;
    return {behavior: behavior};
  }
  function web_scroll_ScrollOptions_Companion_wa3ifs_copy_1tks5(source, behavior) {
    behavior = behavior === VOID ? VOID : behavior;
    return Object.assign({}, source, {behavior: behavior});
  }
  function web_scroll_ScrollToOptions_Companion_fgmt9p_invoke_jkqnwo(behavior, left, top) {
    behavior = behavior === VOID ? VOID : behavior;
    left = left === VOID ? VOID : left;
    top = top === VOID ? VOID : top;
    return {behavior: behavior, left: left, top: top};
  }
  function web_scroll_ScrollToOptions_Companion_fgmt9p_copy_1tks5(source, behavior, left, top) {
    behavior = behavior === VOID ? VOID : behavior;
    left = left === VOID ? VOID : left;
    top = top === VOID ? VOID : top;
    return Object.assign({}, source, {behavior: behavior, left: left, top: top});
  }
  function web_selection_GetComposedRangesOptions_Companion_60sc2u_invoke_jkqnwo(shadowRoots) {
    shadowRoots = shadowRoots === VOID ? VOID : shadowRoots;
    return {shadowRoots: shadowRoots};
  }
  function web_selection_GetComposedRangesOptions_Companion_60sc2u_copy_1tks5(source, shadowRoots) {
    shadowRoots = shadowRoots === VOID ? VOID : shadowRoots;
    return Object.assign({}, source, {shadowRoots: shadowRoots});
  }
  function web_serial_SerialInputSignals_Companion_eaublf_invoke_jkqnwo(clearToSend, dataCarrierDetect, dataSetReady, ringIndicator) {
    return {clearToSend: clearToSend, dataCarrierDetect: dataCarrierDetect, dataSetReady: dataSetReady, ringIndicator: ringIndicator};
  }
  function web_serial_SerialInputSignals_Companion_eaublf_copy_1tks5(source, clearToSend, dataCarrierDetect, dataSetReady, ringIndicator) {
    clearToSend = clearToSend === VOID ? VOID : clearToSend;
    dataCarrierDetect = dataCarrierDetect === VOID ? VOID : dataCarrierDetect;
    dataSetReady = dataSetReady === VOID ? VOID : dataSetReady;
    ringIndicator = ringIndicator === VOID ? VOID : ringIndicator;
    return Object.assign({}, source, {clearToSend: clearToSend, dataCarrierDetect: dataCarrierDetect, dataSetReady: dataSetReady, ringIndicator: ringIndicator});
  }
  function web_serial_SerialOptions_Companion_gd3aa0_invoke_jkqnwo(baudRate, bufferSize, dataBits, flowControl, parity, stopBits) {
    bufferSize = bufferSize === VOID ? VOID : bufferSize;
    dataBits = dataBits === VOID ? VOID : dataBits;
    flowControl = flowControl === VOID ? VOID : flowControl;
    parity = parity === VOID ? VOID : parity;
    stopBits = stopBits === VOID ? VOID : stopBits;
    return {baudRate: baudRate, bufferSize: bufferSize, dataBits: dataBits, flowControl: flowControl, parity: parity, stopBits: stopBits};
  }
  function web_serial_SerialOptions_Companion_gd3aa0_copy_1tks5(source, baudRate, bufferSize, dataBits, flowControl, parity, stopBits) {
    baudRate = baudRate === VOID ? VOID : baudRate;
    bufferSize = bufferSize === VOID ? VOID : bufferSize;
    dataBits = dataBits === VOID ? VOID : dataBits;
    flowControl = flowControl === VOID ? VOID : flowControl;
    parity = parity === VOID ? VOID : parity;
    stopBits = stopBits === VOID ? VOID : stopBits;
    return Object.assign({}, source, {baudRate: baudRate, bufferSize: bufferSize, dataBits: dataBits, flowControl: flowControl, parity: parity, stopBits: stopBits});
  }
  function web_serial_SerialOutputSignals_Companion_hcqwr0_invoke_jkqnwo(break_1jyry7, dataTerminalReady, requestToSend) {
    break_1jyry7 = break_1jyry7 === VOID ? VOID : break_1jyry7;
    dataTerminalReady = dataTerminalReady === VOID ? VOID : dataTerminalReady;
    requestToSend = requestToSend === VOID ? VOID : requestToSend;
    return {'break': break_1jyry7, dataTerminalReady: dataTerminalReady, requestToSend: requestToSend};
  }
  function web_serial_SerialOutputSignals_Companion_hcqwr0_copy_1tks5(source, break_1jyry7, dataTerminalReady, requestToSend) {
    break_1jyry7 = break_1jyry7 === VOID ? VOID : break_1jyry7;
    dataTerminalReady = dataTerminalReady === VOID ? VOID : dataTerminalReady;
    requestToSend = requestToSend === VOID ? VOID : requestToSend;
    return Object.assign({}, source, {'break': break_1jyry7, dataTerminalReady: dataTerminalReady, requestToSend: requestToSend});
  }
  function web_serial_SerialPortFilter_Companion_pd1l9n_invoke_jkqnwo(bluetoothServiceClassId, usbProductId, usbVendorId) {
    bluetoothServiceClassId = bluetoothServiceClassId === VOID ? VOID : bluetoothServiceClassId;
    usbProductId = usbProductId === VOID ? VOID : usbProductId;
    usbVendorId = usbVendorId === VOID ? VOID : usbVendorId;
    return {bluetoothServiceClassId: bluetoothServiceClassId, usbProductId: usbProductId, usbVendorId: usbVendorId};
  }
  function web_serial_SerialPortFilter_Companion_pd1l9n_copy_1tks5(source, bluetoothServiceClassId, usbProductId, usbVendorId) {
    bluetoothServiceClassId = bluetoothServiceClassId === VOID ? VOID : bluetoothServiceClassId;
    usbProductId = usbProductId === VOID ? VOID : usbProductId;
    usbVendorId = usbVendorId === VOID ? VOID : usbVendorId;
    return Object.assign({}, source, {bluetoothServiceClassId: bluetoothServiceClassId, usbProductId: usbProductId, usbVendorId: usbVendorId});
  }
  function web_serial_SerialPortInfo_Companion_omadpd_invoke_jkqnwo(bluetoothServiceClassId, usbProductId, usbVendorId) {
    bluetoothServiceClassId = bluetoothServiceClassId === VOID ? VOID : bluetoothServiceClassId;
    usbProductId = usbProductId === VOID ? VOID : usbProductId;
    usbVendorId = usbVendorId === VOID ? VOID : usbVendorId;
    return {bluetoothServiceClassId: bluetoothServiceClassId, usbProductId: usbProductId, usbVendorId: usbVendorId};
  }
  function web_serial_SerialPortInfo_Companion_omadpd_copy_1tks5(source, bluetoothServiceClassId, usbProductId, usbVendorId) {
    bluetoothServiceClassId = bluetoothServiceClassId === VOID ? VOID : bluetoothServiceClassId;
    usbProductId = usbProductId === VOID ? VOID : usbProductId;
    usbVendorId = usbVendorId === VOID ? VOID : usbVendorId;
    return Object.assign({}, source, {bluetoothServiceClassId: bluetoothServiceClassId, usbProductId: usbProductId, usbVendorId: usbVendorId});
  }
  function web_serial_SerialPortRequestOptions_Companion_uwt3y6_invoke_jkqnwo(allowedBluetoothServiceClassIds, filters) {
    allowedBluetoothServiceClassIds = allowedBluetoothServiceClassIds === VOID ? VOID : allowedBluetoothServiceClassIds;
    filters = filters === VOID ? VOID : filters;
    return {allowedBluetoothServiceClassIds: allowedBluetoothServiceClassIds, filters: filters};
  }
  function web_serial_SerialPortRequestOptions_Companion_uwt3y6_copy_1tks5(source, allowedBluetoothServiceClassIds, filters) {
    allowedBluetoothServiceClassIds = allowedBluetoothServiceClassIds === VOID ? VOID : allowedBluetoothServiceClassIds;
    filters = filters === VOID ? VOID : filters;
    return Object.assign({}, source, {allowedBluetoothServiceClassIds: allowedBluetoothServiceClassIds, filters: filters});
  }
  function web_serviceworker_GetNotificationOptions_Companion_2dpumo_invoke_jkqnwo(tag) {
    tag = tag === VOID ? VOID : tag;
    return {tag: tag};
  }
  function web_serviceworker_GetNotificationOptions_Companion_2dpumo_copy_1tks5(source, tag) {
    tag = tag === VOID ? VOID : tag;
    return Object.assign({}, source, {tag: tag});
  }
  function web_serviceworker_NavigationPreloadState_Companion_ob9mpd_invoke_jkqnwo(enabled, headerValue) {
    enabled = enabled === VOID ? VOID : enabled;
    headerValue = headerValue === VOID ? VOID : headerValue;
    return {enabled: enabled, headerValue: headerValue};
  }
  function web_serviceworker_NavigationPreloadState_Companion_ob9mpd_copy_1tks5(source, enabled, headerValue) {
    enabled = enabled === VOID ? VOID : enabled;
    headerValue = headerValue === VOID ? VOID : headerValue;
    return Object.assign({}, source, {enabled: enabled, headerValue: headerValue});
  }
  function web_serviceworker_RegistrationOptions_Companion_l7pw5u_invoke_jkqnwo(scope, type, updateViaCache) {
    scope = scope === VOID ? VOID : scope;
    type = type === VOID ? VOID : type;
    updateViaCache = updateViaCache === VOID ? VOID : updateViaCache;
    return {scope: scope, type: type, updateViaCache: updateViaCache};
  }
  function web_serviceworker_RegistrationOptions_Companion_l7pw5u_copy_1tks5(source, scope, type, updateViaCache) {
    scope = scope === VOID ? VOID : scope;
    type = type === VOID ? VOID : type;
    updateViaCache = updateViaCache === VOID ? VOID : updateViaCache;
    return Object.assign({}, source, {scope: scope, type: type, updateViaCache: updateViaCache});
  }
  function web_share_ShareData_Companion_bgs1we_invoke_jkqnwo(files, text, title, url) {
    files = files === VOID ? VOID : files;
    text = text === VOID ? VOID : text;
    title = title === VOID ? VOID : title;
    url = url === VOID ? VOID : url;
    return {files: files, text: text, title: title, url: url};
  }
  function web_share_ShareData_Companion_bgs1we_copy_1tks5(source, files, text, title, url) {
    files = files === VOID ? VOID : files;
    text = text === VOID ? VOID : text;
    title = title === VOID ? VOID : title;
    url = url === VOID ? VOID : url;
    return Object.assign({}, source, {files: files, text: text, title: title, url: url});
  }
  function web_storage_StorageEstimate_Companion_g085m4_invoke_jkqnwo(quota, usage) {
    quota = quota === VOID ? VOID : quota;
    usage = usage === VOID ? VOID : usage;
    return {quota: quota, usage: usage};
  }
  function web_storage_StorageEstimate_Companion_g085m4_copy_1tks5(source, quota, usage) {
    quota = quota === VOID ? VOID : quota;
    usage = usage === VOID ? VOID : usage;
    return Object.assign({}, source, {quota: quota, usage: usage});
  }
  function web_storage_StorageEventInit_Companion_ki4rkq_invoke_jkqnwo(bubbles, cancelable, composed, key, newValue, oldValue, storageArea, url) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    key = key === VOID ? VOID : key;
    newValue = newValue === VOID ? VOID : newValue;
    oldValue = oldValue === VOID ? VOID : oldValue;
    storageArea = storageArea === VOID ? VOID : storageArea;
    url = url === VOID ? VOID : url;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, key: key, newValue: newValue, oldValue: oldValue, storageArea: storageArea, url: url};
  }
  function web_storage_StorageEventInit_Companion_ki4rkq_copy_1tks5(source, bubbles, cancelable, composed, key, newValue, oldValue, storageArea, url) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    key = key === VOID ? VOID : key;
    newValue = newValue === VOID ? VOID : newValue;
    oldValue = oldValue === VOID ? VOID : oldValue;
    storageArea = storageArea === VOID ? VOID : storageArea;
    url = url === VOID ? VOID : url;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, key: key, newValue: newValue, oldValue: oldValue, storageArea: storageArea, url: url});
  }
  function web_touch_TouchEventInit_Companion_j265si_invoke_jkqnwo(bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, changedTouches, targetTouches, touches) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    changedTouches = changedTouches === VOID ? VOID : changedTouches;
    targetTouches = targetTouches === VOID ? VOID : targetTouches;
    touches = touches === VOID ? VOID : touches;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, changedTouches: changedTouches, targetTouches: targetTouches, touches: touches};
  }
  function web_touch_TouchEventInit_Companion_j265si_copy_1tks5(source, bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey, changedTouches, targetTouches, touches) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    changedTouches = changedTouches === VOID ? VOID : changedTouches;
    targetTouches = targetTouches === VOID ? VOID : targetTouches;
    touches = touches === VOID ? VOID : touches;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey, changedTouches: changedTouches, targetTouches: targetTouches, touches: touches});
  }
  function web_touch_TouchInit_Companion_di303o_invoke_jkqnwo(altitudeAngle, azimuthAngle, clientX, clientY, force, identifier, pageX, pageY, radiusX, radiusY, rotationAngle, screenX, screenY, target, touchType) {
    altitudeAngle = altitudeAngle === VOID ? VOID : altitudeAngle;
    azimuthAngle = azimuthAngle === VOID ? VOID : azimuthAngle;
    clientX = clientX === VOID ? VOID : clientX;
    clientY = clientY === VOID ? VOID : clientY;
    force = force === VOID ? VOID : force;
    pageX = pageX === VOID ? VOID : pageX;
    pageY = pageY === VOID ? VOID : pageY;
    radiusX = radiusX === VOID ? VOID : radiusX;
    radiusY = radiusY === VOID ? VOID : radiusY;
    rotationAngle = rotationAngle === VOID ? VOID : rotationAngle;
    screenX = screenX === VOID ? VOID : screenX;
    screenY = screenY === VOID ? VOID : screenY;
    touchType = touchType === VOID ? VOID : touchType;
    return {altitudeAngle: altitudeAngle, azimuthAngle: azimuthAngle, clientX: clientX, clientY: clientY, force: force, identifier: identifier, pageX: pageX, pageY: pageY, radiusX: radiusX, radiusY: radiusY, rotationAngle: rotationAngle, screenX: screenX, screenY: screenY, target: target, touchType: touchType};
  }
  function web_touch_TouchInit_Companion_di303o_copy_1tks5(source, altitudeAngle, azimuthAngle, clientX, clientY, force, identifier, pageX, pageY, radiusX, radiusY, rotationAngle, screenX, screenY, target, touchType) {
    altitudeAngle = altitudeAngle === VOID ? VOID : altitudeAngle;
    azimuthAngle = azimuthAngle === VOID ? VOID : azimuthAngle;
    clientX = clientX === VOID ? VOID : clientX;
    clientY = clientY === VOID ? VOID : clientY;
    force = force === VOID ? VOID : force;
    identifier = identifier === VOID ? VOID : identifier;
    pageX = pageX === VOID ? VOID : pageX;
    pageY = pageY === VOID ? VOID : pageY;
    radiusX = radiusX === VOID ? VOID : radiusX;
    radiusY = radiusY === VOID ? VOID : radiusY;
    rotationAngle = rotationAngle === VOID ? VOID : rotationAngle;
    screenX = screenX === VOID ? VOID : screenX;
    screenY = screenY === VOID ? VOID : screenY;
    target = target === VOID ? VOID : target;
    touchType = touchType === VOID ? VOID : touchType;
    return Object.assign({}, source, {altitudeAngle: altitudeAngle, azimuthAngle: azimuthAngle, clientX: clientX, clientY: clientY, force: force, identifier: identifier, pageX: pageX, pageY: pageY, radiusX: radiusX, radiusY: radiusY, rotationAngle: rotationAngle, screenX: screenX, screenY: screenY, target: target, touchType: touchType});
  }
  function web_uievents_EventModifierInit_Companion_3lz6rs_invoke_jkqnwo(bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey};
  }
  function web_uievents_EventModifierInit_Companion_3lz6rs_copy_1tks5(source, bubbles, cancelable, composed, detail, view, altKey, ctrlKey, metaKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierHyper, modifierNumLock, modifierScrollLock, modifierSuper, modifierSymbol, modifierSymbolLock, shiftKey) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    altKey = altKey === VOID ? VOID : altKey;
    ctrlKey = ctrlKey === VOID ? VOID : ctrlKey;
    metaKey = metaKey === VOID ? VOID : metaKey;
    modifierAltGraph = modifierAltGraph === VOID ? VOID : modifierAltGraph;
    modifierCapsLock = modifierCapsLock === VOID ? VOID : modifierCapsLock;
    modifierFn = modifierFn === VOID ? VOID : modifierFn;
    modifierFnLock = modifierFnLock === VOID ? VOID : modifierFnLock;
    modifierHyper = modifierHyper === VOID ? VOID : modifierHyper;
    modifierNumLock = modifierNumLock === VOID ? VOID : modifierNumLock;
    modifierScrollLock = modifierScrollLock === VOID ? VOID : modifierScrollLock;
    modifierSuper = modifierSuper === VOID ? VOID : modifierSuper;
    modifierSymbol = modifierSymbol === VOID ? VOID : modifierSymbol;
    modifierSymbolLock = modifierSymbolLock === VOID ? VOID : modifierSymbolLock;
    shiftKey = shiftKey === VOID ? VOID : shiftKey;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view, altKey: altKey, ctrlKey: ctrlKey, metaKey: metaKey, modifierAltGraph: modifierAltGraph, modifierCapsLock: modifierCapsLock, modifierFn: modifierFn, modifierFnLock: modifierFnLock, modifierHyper: modifierHyper, modifierNumLock: modifierNumLock, modifierScrollLock: modifierScrollLock, modifierSuper: modifierSuper, modifierSymbol: modifierSymbol, modifierSymbolLock: modifierSymbolLock, shiftKey: shiftKey});
  }
  function web_uievents_UIEventInit_Companion_a8jh0t_invoke_jkqnwo(bubbles, cancelable, composed, detail, view) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view};
  }
  function web_uievents_UIEventInit_Companion_a8jh0t_copy_1tks5(source, bubbles, cancelable, composed, detail, view) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    detail = detail === VOID ? VOID : detail;
    view = view === VOID ? VOID : view;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, detail: detail, view: view});
  }
  function web_validation_ValidityStateFlags_Companion_u797s1_invoke_jkqnwo(badInput, customError, patternMismatch, rangeOverflow, rangeUnderflow, stepMismatch, tooLong, tooShort, typeMismatch, valueMissing) {
    badInput = badInput === VOID ? VOID : badInput;
    customError = customError === VOID ? VOID : customError;
    patternMismatch = patternMismatch === VOID ? VOID : patternMismatch;
    rangeOverflow = rangeOverflow === VOID ? VOID : rangeOverflow;
    rangeUnderflow = rangeUnderflow === VOID ? VOID : rangeUnderflow;
    stepMismatch = stepMismatch === VOID ? VOID : stepMismatch;
    tooLong = tooLong === VOID ? VOID : tooLong;
    tooShort = tooShort === VOID ? VOID : tooShort;
    typeMismatch = typeMismatch === VOID ? VOID : typeMismatch;
    valueMissing = valueMissing === VOID ? VOID : valueMissing;
    return {badInput: badInput, customError: customError, patternMismatch: patternMismatch, rangeOverflow: rangeOverflow, rangeUnderflow: rangeUnderflow, stepMismatch: stepMismatch, tooLong: tooLong, tooShort: tooShort, typeMismatch: typeMismatch, valueMissing: valueMissing};
  }
  function web_validation_ValidityStateFlags_Companion_u797s1_copy_1tks5(source, badInput, customError, patternMismatch, rangeOverflow, rangeUnderflow, stepMismatch, tooLong, tooShort, typeMismatch, valueMissing) {
    badInput = badInput === VOID ? VOID : badInput;
    customError = customError === VOID ? VOID : customError;
    patternMismatch = patternMismatch === VOID ? VOID : patternMismatch;
    rangeOverflow = rangeOverflow === VOID ? VOID : rangeOverflow;
    rangeUnderflow = rangeUnderflow === VOID ? VOID : rangeUnderflow;
    stepMismatch = stepMismatch === VOID ? VOID : stepMismatch;
    tooLong = tooLong === VOID ? VOID : tooLong;
    tooShort = tooShort === VOID ? VOID : tooShort;
    typeMismatch = typeMismatch === VOID ? VOID : typeMismatch;
    valueMissing = valueMissing === VOID ? VOID : valueMissing;
    return Object.assign({}, source, {badInput: badInput, customError: customError, patternMismatch: patternMismatch, rangeOverflow: rangeOverflow, rangeUnderflow: rangeUnderflow, stepMismatch: stepMismatch, tooLong: tooLong, tooShort: tooShort, typeMismatch: typeMismatch, valueMissing: valueMissing});
  }
  function web_viewtransition_PageRevealEventInit_Companion_95jqby_invoke_jkqnwo(bubbles, cancelable, composed, viewTransition) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    viewTransition = viewTransition === VOID ? VOID : viewTransition;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, viewTransition: viewTransition};
  }
  function web_viewtransition_PageRevealEventInit_Companion_95jqby_copy_1tks5(source, bubbles, cancelable, composed, viewTransition) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    viewTransition = viewTransition === VOID ? VOID : viewTransition;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, viewTransition: viewTransition});
  }
  function web_viewtransition_PageSwapEventInit_Companion_nqhiok_invoke_jkqnwo(bubbles, cancelable, composed, activation, viewTransition) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    activation = activation === VOID ? VOID : activation;
    viewTransition = viewTransition === VOID ? VOID : viewTransition;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, activation: activation, viewTransition: viewTransition};
  }
  function web_viewtransition_PageSwapEventInit_Companion_nqhiok_copy_1tks5(source, bubbles, cancelable, composed, activation, viewTransition) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    activation = activation === VOID ? VOID : activation;
    viewTransition = viewTransition === VOID ? VOID : viewTransition;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, activation: activation, viewTransition: viewTransition});
  }
  function web_viewtransition_StartViewTransitionOptions_Companion_55qo9m_invoke_jkqnwo(types, update) {
    types = types === VOID ? VOID : types;
    update = update === VOID ? VOID : update;
    return {types: types, update: update};
  }
  function web_viewtransition_StartViewTransitionOptions_Companion_55qo9m_copy_1tks5(source, types, update) {
    types = types === VOID ? VOID : types;
    update = update === VOID ? VOID : update;
    return Object.assign({}, source, {types: types, update: update});
  }
  function WindowName(value) {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return value;
  }
  function web_window_WindowPostMessageOptions_Companion_rs3guv_invoke_jkqnwo(transfer, targetOrigin) {
    transfer = transfer === VOID ? VOID : transfer;
    targetOrigin = targetOrigin === VOID ? VOID : targetOrigin;
    return {transfer: transfer, targetOrigin: targetOrigin};
  }
  function web_window_WindowPostMessageOptions_Companion_rs3guv_copy_1tks5(source, transfer, targetOrigin) {
    transfer = transfer === VOID ? VOID : transfer;
    targetOrigin = targetOrigin === VOID ? VOID : targetOrigin;
    return Object.assign({}, source, {transfer: transfer, targetOrigin: targetOrigin});
  }
  function web_xr_XRDOMOverlayInit_Companion_r4keog_invoke_jkqnwo(root) {
    return {root: root};
  }
  function web_xr_XRDOMOverlayInit_Companion_r4keog_copy_1tks5(source, root) {
    root = root === VOID ? VOID : root;
    return Object.assign({}, source, {root: root});
  }
  function web_xr_XRDOMOverlayState_Companion_3ycq7n_invoke_jkqnwo(type) {
    return {type: type};
  }
  function web_xr_XRDOMOverlayState_Companion_3ycq7n_copy_1tks5(source, type) {
    type = type === VOID ? VOID : type;
    return Object.assign({}, source, {type: type});
  }
  function web_xr_XRDepthStateInit_Companion_q1so28_invoke_jkqnwo(usagePreference, dataFormatPreference, depthTypeRequest, matchDepthView) {
    depthTypeRequest = depthTypeRequest === VOID ? VOID : depthTypeRequest;
    matchDepthView = matchDepthView === VOID ? VOID : matchDepthView;
    return {usagePreference: usagePreference, dataFormatPreference: dataFormatPreference, depthTypeRequest: depthTypeRequest, matchDepthView: matchDepthView};
  }
  function web_xr_XRDepthStateInit_Companion_q1so28_copy_1tks5(source, usagePreference, dataFormatPreference, depthTypeRequest, matchDepthView) {
    usagePreference = usagePreference === VOID ? VOID : usagePreference;
    dataFormatPreference = dataFormatPreference === VOID ? VOID : dataFormatPreference;
    depthTypeRequest = depthTypeRequest === VOID ? VOID : depthTypeRequest;
    matchDepthView = matchDepthView === VOID ? VOID : matchDepthView;
    return Object.assign({}, source, {usagePreference: usagePreference, dataFormatPreference: dataFormatPreference, depthTypeRequest: depthTypeRequest, matchDepthView: matchDepthView});
  }
  function web_xr_XRHitTestOptionsInit_Companion_g66xkr_invoke_jkqnwo(space, entityTypes, offsetRay) {
    entityTypes = entityTypes === VOID ? VOID : entityTypes;
    offsetRay = offsetRay === VOID ? VOID : offsetRay;
    return {space: space, entityTypes: entityTypes, offsetRay: offsetRay};
  }
  function web_xr_XRHitTestOptionsInit_Companion_g66xkr_copy_1tks5(source, space, entityTypes, offsetRay) {
    space = space === VOID ? VOID : space;
    entityTypes = entityTypes === VOID ? VOID : entityTypes;
    offsetRay = offsetRay === VOID ? VOID : offsetRay;
    return Object.assign({}, source, {space: space, entityTypes: entityTypes, offsetRay: offsetRay});
  }
  function web_xr_XRRenderStateInit_Companion_55zzmd_invoke_jkqnwo(baseLayer, depthFar, depthNear, inlineVerticalFieldOfView, layers) {
    baseLayer = baseLayer === VOID ? VOID : baseLayer;
    depthFar = depthFar === VOID ? VOID : depthFar;
    depthNear = depthNear === VOID ? VOID : depthNear;
    inlineVerticalFieldOfView = inlineVerticalFieldOfView === VOID ? VOID : inlineVerticalFieldOfView;
    layers = layers === VOID ? VOID : layers;
    return {baseLayer: baseLayer, depthFar: depthFar, depthNear: depthNear, inlineVerticalFieldOfView: inlineVerticalFieldOfView, layers: layers};
  }
  function web_xr_XRRenderStateInit_Companion_55zzmd_copy_1tks5(source, baseLayer, depthFar, depthNear, inlineVerticalFieldOfView, layers) {
    baseLayer = baseLayer === VOID ? VOID : baseLayer;
    depthFar = depthFar === VOID ? VOID : depthFar;
    depthNear = depthNear === VOID ? VOID : depthNear;
    inlineVerticalFieldOfView = inlineVerticalFieldOfView === VOID ? VOID : inlineVerticalFieldOfView;
    layers = layers === VOID ? VOID : layers;
    return Object.assign({}, source, {baseLayer: baseLayer, depthFar: depthFar, depthNear: depthNear, inlineVerticalFieldOfView: inlineVerticalFieldOfView, layers: layers});
  }
  function web_xr_XRSessionInit_Companion_5stik0_invoke_jkqnwo(optionalFeatures, requiredFeatures, domOverlay, depthSensing) {
    optionalFeatures = optionalFeatures === VOID ? VOID : optionalFeatures;
    requiredFeatures = requiredFeatures === VOID ? VOID : requiredFeatures;
    domOverlay = domOverlay === VOID ? VOID : domOverlay;
    depthSensing = depthSensing === VOID ? VOID : depthSensing;
    return {optionalFeatures: optionalFeatures, requiredFeatures: requiredFeatures, domOverlay: domOverlay, depthSensing: depthSensing};
  }
  function web_xr_XRSessionInit_Companion_5stik0_copy_1tks5(source, optionalFeatures, requiredFeatures, domOverlay, depthSensing) {
    optionalFeatures = optionalFeatures === VOID ? VOID : optionalFeatures;
    requiredFeatures = requiredFeatures === VOID ? VOID : requiredFeatures;
    domOverlay = domOverlay === VOID ? VOID : domOverlay;
    depthSensing = depthSensing === VOID ? VOID : depthSensing;
    return Object.assign({}, source, {optionalFeatures: optionalFeatures, requiredFeatures: requiredFeatures, domOverlay: domOverlay, depthSensing: depthSensing});
  }
  function web_xr_XRTransientInputHitTestOptionsInit_Companion_rbmr5n_invoke_jkqnwo(profile, entityTypes, offsetRay) {
    entityTypes = entityTypes === VOID ? VOID : entityTypes;
    offsetRay = offsetRay === VOID ? VOID : offsetRay;
    return {profile: profile, entityTypes: entityTypes, offsetRay: offsetRay};
  }
  function web_xr_XRTransientInputHitTestOptionsInit_Companion_rbmr5n_copy_1tks5(source, profile, entityTypes, offsetRay) {
    profile = profile === VOID ? VOID : profile;
    entityTypes = entityTypes === VOID ? VOID : entityTypes;
    offsetRay = offsetRay === VOID ? VOID : offsetRay;
    return Object.assign({}, source, {profile: profile, entityTypes: entityTypes, offsetRay: offsetRay});
  }
  function web_xr_XRWebGLLayerInit_Companion_8z9fp6_invoke_jkqnwo(antialias, depth, stencil, alpha, ignoreDepthValues, framebufferScaleFactor) {
    antialias = antialias === VOID ? VOID : antialias;
    depth = depth === VOID ? VOID : depth;
    stencil = stencil === VOID ? VOID : stencil;
    alpha = alpha === VOID ? VOID : alpha;
    ignoreDepthValues = ignoreDepthValues === VOID ? VOID : ignoreDepthValues;
    framebufferScaleFactor = framebufferScaleFactor === VOID ? VOID : framebufferScaleFactor;
    return {antialias: antialias, depth: depth, stencil: stencil, alpha: alpha, ignoreDepthValues: ignoreDepthValues, framebufferScaleFactor: framebufferScaleFactor};
  }
  function web_xr_XRWebGLLayerInit_Companion_8z9fp6_copy_1tks5(source, antialias, depth, stencil, alpha, ignoreDepthValues, framebufferScaleFactor) {
    antialias = antialias === VOID ? VOID : antialias;
    depth = depth === VOID ? VOID : depth;
    stencil = stencil === VOID ? VOID : stencil;
    alpha = alpha === VOID ? VOID : alpha;
    ignoreDepthValues = ignoreDepthValues === VOID ? VOID : ignoreDepthValues;
    framebufferScaleFactor = framebufferScaleFactor === VOID ? VOID : framebufferScaleFactor;
    return Object.assign({}, source, {antialias: antialias, depth: depth, stencil: stencil, alpha: alpha, ignoreDepthValues: ignoreDepthValues, framebufferScaleFactor: framebufferScaleFactor});
  }
  function ElementId(value) {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return value;
  }
  function web_editcontext_CharacterBoundsUpdateEventInit_Companion_42hv2c_invoke_jkqnwo(bubbles, cancelable, composed, rangeStart, rangeEnd) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, rangeStart: rangeStart, rangeEnd: rangeEnd};
  }
  function web_editcontext_CharacterBoundsUpdateEventInit_Companion_42hv2c_copy_1tks5(source, bubbles, cancelable, composed, rangeStart, rangeEnd) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    rangeStart = rangeStart === VOID ? VOID : rangeStart;
    rangeEnd = rangeEnd === VOID ? VOID : rangeEnd;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, rangeStart: rangeStart, rangeEnd: rangeEnd});
  }
  function web_editcontext_EditContextInit_Companion_bn0nu8_invoke_jkqnwo(text, selectionStart, selectionEnd) {
    return {text: text, selectionStart: selectionStart, selectionEnd: selectionEnd};
  }
  function web_editcontext_EditContextInit_Companion_bn0nu8_copy_1tks5(source, text, selectionStart, selectionEnd) {
    text = text === VOID ? VOID : text;
    selectionStart = selectionStart === VOID ? VOID : selectionStart;
    selectionEnd = selectionEnd === VOID ? VOID : selectionEnd;
    return Object.assign({}, source, {text: text, selectionStart: selectionStart, selectionEnd: selectionEnd});
  }
  function web_editcontext_TextFormatInit_Companion_fm0dt7_invoke_jkqnwo(rangeStart, rangeEnd, underlineStyle, underlineThickness) {
    return {rangeStart: rangeStart, rangeEnd: rangeEnd, underlineStyle: underlineStyle, underlineThickness: underlineThickness};
  }
  function web_editcontext_TextFormatInit_Companion_fm0dt7_copy_1tks5(source, rangeStart, rangeEnd, underlineStyle, underlineThickness) {
    rangeStart = rangeStart === VOID ? VOID : rangeStart;
    rangeEnd = rangeEnd === VOID ? VOID : rangeEnd;
    underlineStyle = underlineStyle === VOID ? VOID : underlineStyle;
    underlineThickness = underlineThickness === VOID ? VOID : underlineThickness;
    return Object.assign({}, source, {rangeStart: rangeStart, rangeEnd: rangeEnd, underlineStyle: underlineStyle, underlineThickness: underlineThickness});
  }
  function web_editcontext_TextFormatUpdateEventInit_Companion_jiino8_invoke_jkqnwo(bubbles, cancelable, composed, textFormats) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, textFormats: textFormats};
  }
  function web_editcontext_TextFormatUpdateEventInit_Companion_jiino8_copy_1tks5(source, bubbles, cancelable, composed, textFormats) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    textFormats = textFormats === VOID ? VOID : textFormats;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, textFormats: textFormats});
  }
  function web_editcontext_TextUpdateEventInit_Companion_tneq33_invoke_jkqnwo(bubbles, cancelable, composed, updateRangeStart, updateRangeEnd, text, selectionStart, selectionEnd, compositionStart, compositionEnd) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, updateRangeStart: updateRangeStart, updateRangeEnd: updateRangeEnd, text: text, selectionStart: selectionStart, selectionEnd: selectionEnd, compositionStart: compositionStart, compositionEnd: compositionEnd};
  }
  function web_editcontext_TextUpdateEventInit_Companion_tneq33_copy_1tks5(source, bubbles, cancelable, composed, updateRangeStart, updateRangeEnd, text, selectionStart, selectionEnd, compositionStart, compositionEnd) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    updateRangeStart = updateRangeStart === VOID ? VOID : updateRangeStart;
    updateRangeEnd = updateRangeEnd === VOID ? VOID : updateRangeEnd;
    text = text === VOID ? VOID : text;
    selectionStart = selectionStart === VOID ? VOID : selectionStart;
    selectionEnd = selectionEnd === VOID ? VOID : selectionEnd;
    compositionStart = compositionStart === VOID ? VOID : compositionStart;
    compositionEnd = compositionEnd === VOID ? VOID : compositionEnd;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, updateRangeStart: updateRangeStart, updateRangeEnd: updateRangeEnd, text: text, selectionStart: selectionStart, selectionEnd: selectionEnd, compositionStart: compositionStart, compositionEnd: compositionEnd});
  }
  function HtmlSource(value) {
    // Inline function 'js.reflect.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return value;
  }
  function web_mcp_CallToolResult_Companion_d589t_invoke_jkqnwo(content, structuredContent, isError) {
    structuredContent = structuredContent === VOID ? VOID : structuredContent;
    isError = isError === VOID ? VOID : isError;
    return {content: content, structuredContent: structuredContent, isError: isError};
  }
  function web_mcp_CallToolResult_Companion_d589t_copy_1tks5(source, content, structuredContent, isError) {
    content = content === VOID ? VOID : content;
    structuredContent = structuredContent === VOID ? VOID : structuredContent;
    isError = isError === VOID ? VOID : isError;
    return Object.assign({}, source, {content: content, structuredContent: structuredContent, isError: isError});
  }
  function web_mcp_ElicitationParams_Companion_29r7dr_invoke_jkqnwo(mode, message) {
    mode = mode === VOID ? VOID : mode;
    return {mode: mode, message: message};
  }
  function web_mcp_ElicitationParams_Companion_29r7dr_copy_1tks5(source, mode, message) {
    mode = mode === VOID ? VOID : mode;
    message = message === VOID ? VOID : message;
    return Object.assign({}, source, {mode: mode, message: message});
  }
  function web_mcp_ElicitationResult_Companion_ivs4ja_invoke_jkqnwo(action, content) {
    return {action: action, content: content};
  }
  function web_mcp_ElicitationResult_Companion_ivs4ja_copy_1tks5(source, action, content) {
    action = action === VOID ? VOID : action;
    content = content === VOID ? VOID : content;
    return Object.assign({}, source, {action: action, content: content});
  }
  function web_mcp_InputSchema_Companion_d5j4xx_invoke_jkqnwo(type, properties, required) {
    properties = properties === VOID ? VOID : properties;
    required = required === VOID ? VOID : required;
    return {type: type, properties: properties, required: required};
  }
  function web_mcp_InputSchema_Companion_d5j4xx_copy_1tks5(source, type, properties, required) {
    type = type === VOID ? VOID : type;
    properties = properties === VOID ? VOID : properties;
    required = required === VOID ? VOID : required;
    return Object.assign({}, source, {type: type, properties: properties, required: required});
  }
  function web_mcp_InputSchemaProperty_Companion_ea3r3k_invoke_jkqnwo(type, description) {
    description = description === VOID ? VOID : description;
    return {type: type, description: description};
  }
  function web_mcp_InputSchemaProperty_Companion_ea3r3k_copy_1tks5(source, type, description) {
    type = type === VOID ? VOID : type;
    description = description === VOID ? VOID : description;
    return Object.assign({}, source, {type: type, description: description});
  }
  function web_mcp_ModelContext_CallToolOptions_Companion_yyfges_invoke_jkqnwo(name, arguments_xnw71m) {
    return {name: name, 'arguments': arguments_xnw71m};
  }
  function web_mcp_ModelContext_CallToolOptions_Companion_yyfges_copy_1tks5(source, name, arguments_xnw71m) {
    name = name === VOID ? VOID : name;
    arguments_xnw71m = arguments_xnw71m === VOID ? VOID : arguments_xnw71m;
    return Object.assign({}, source, {name: name, 'arguments': arguments_xnw71m});
  }
  function web_mcp_ModelContextInput_Companion_ym2bo4_invoke_jkqnwo(tools) {
    tools = tools === VOID ? VOID : tools;
    return {tools: tools};
  }
  function web_mcp_ModelContextInput_Companion_ym2bo4_copy_1tks5(source, tools) {
    tools = tools === VOID ? VOID : tools;
    return Object.assign({}, source, {tools: tools});
  }
  function web_mcp_ToolAnnotations_Companion_s1f8f0_invoke_jkqnwo(title, readOnlyHint, destructiveHint, idempotentHint, openWorldHint) {
    title = title === VOID ? VOID : title;
    readOnlyHint = readOnlyHint === VOID ? VOID : readOnlyHint;
    destructiveHint = destructiveHint === VOID ? VOID : destructiveHint;
    idempotentHint = idempotentHint === VOID ? VOID : idempotentHint;
    openWorldHint = openWorldHint === VOID ? VOID : openWorldHint;
    return {title: title, readOnlyHint: readOnlyHint, destructiveHint: destructiveHint, idempotentHint: idempotentHint, openWorldHint: openWorldHint};
  }
  function web_mcp_ToolAnnotations_Companion_s1f8f0_copy_1tks5(source, title, readOnlyHint, destructiveHint, idempotentHint, openWorldHint) {
    title = title === VOID ? VOID : title;
    readOnlyHint = readOnlyHint === VOID ? VOID : readOnlyHint;
    destructiveHint = destructiveHint === VOID ? VOID : destructiveHint;
    idempotentHint = idempotentHint === VOID ? VOID : idempotentHint;
    openWorldHint = openWorldHint === VOID ? VOID : openWorldHint;
    return Object.assign({}, source, {title: title, readOnlyHint: readOnlyHint, destructiveHint: destructiveHint, idempotentHint: idempotentHint, openWorldHint: openWorldHint});
  }
  function web_mcp_ToolDescriptor_Companion_2me6nn_invoke_jkqnwo(name, description, inputSchema, outputSchema, annotations, execute) {
    outputSchema = outputSchema === VOID ? VOID : outputSchema;
    annotations = annotations === VOID ? VOID : annotations;
    return {name: name, description: description, inputSchema: inputSchema, outputSchema: outputSchema, annotations: annotations, execute: execute};
  }
  function web_mcp_ToolDescriptor_Companion_2me6nn_copy_1tks5(source, name, description, inputSchema, outputSchema, annotations, execute) {
    name = name === VOID ? VOID : name;
    description = description === VOID ? VOID : description;
    inputSchema = inputSchema === VOID ? VOID : inputSchema;
    outputSchema = outputSchema === VOID ? VOID : outputSchema;
    annotations = annotations === VOID ? VOID : annotations;
    execute = execute === VOID ? VOID : execute;
    return Object.assign({}, source, {name: name, description: description, inputSchema: inputSchema, outputSchema: outputSchema, annotations: annotations, execute: execute});
  }
  function web_mcp_ToolListItem_Companion_c8tx0r_invoke_jkqnwo(name, description, inputSchema, outputSchema, annotations) {
    outputSchema = outputSchema === VOID ? VOID : outputSchema;
    annotations = annotations === VOID ? VOID : annotations;
    return {name: name, description: description, inputSchema: inputSchema, outputSchema: outputSchema, annotations: annotations};
  }
  function web_mcp_ToolListItem_Companion_c8tx0r_copy_1tks5(source, name, description, inputSchema, outputSchema, annotations) {
    name = name === VOID ? VOID : name;
    description = description === VOID ? VOID : description;
    inputSchema = inputSchema === VOID ? VOID : inputSchema;
    outputSchema = outputSchema === VOID ? VOID : outputSchema;
    annotations = annotations === VOID ? VOID : annotations;
    return Object.assign({}, source, {name: name, description: description, inputSchema: inputSchema, outputSchema: outputSchema, annotations: annotations});
  }
  function web_presentation_PresentationConnectionAvailableEventInit_Companion_gblp9r_invoke_jkqnwo(bubbles, cancelable, composed, connection) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, connection: connection};
  }
  function web_presentation_PresentationConnectionAvailableEventInit_Companion_gblp9r_copy_1tks5(source, bubbles, cancelable, composed, connection) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    connection = connection === VOID ? VOID : connection;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, connection: connection});
  }
  function web_presentation_PresentationConnectionCloseEventInit_Companion_r3bhku_invoke_jkqnwo(bubbles, cancelable, composed, reason, message) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    message = message === VOID ? VOID : message;
    return {bubbles: bubbles, cancelable: cancelable, composed: composed, reason: reason, message: message};
  }
  function web_presentation_PresentationConnectionCloseEventInit_Companion_r3bhku_copy_1tks5(source, bubbles, cancelable, composed, reason, message) {
    bubbles = bubbles === VOID ? VOID : bubbles;
    cancelable = cancelable === VOID ? VOID : cancelable;
    composed = composed === VOID ? VOID : composed;
    reason = reason === VOID ? VOID : reason;
    message = message === VOID ? VOID : message;
    return Object.assign({}, source, {bubbles: bubbles, cancelable: cancelable, composed: composed, reason: reason, message: message});
  }
  return _;
}));
