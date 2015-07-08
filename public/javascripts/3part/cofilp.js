!
    function(global, factory) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
            if (!w.document) throw new Error("jQuery requires a window with a document");
            return factory(w)
        } : factory(global)
    }("undefined" != typeof window ? window : this, function(window, noGlobal) {
        function isArraylike(obj) {
            var length = obj.length,
                type = jQuery.type(obj);
            return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj
        }
        function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not
            });
            if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not
            });
            if ("string" == typeof qualifier) {
                if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
                qualifier = jQuery.filter(qualifier, elements)
            }
            return jQuery.grep(elements, function(elem) {
                return indexOf.call(qualifier, elem) >= 0 !== not
            })
        }
        function sibling(cur, dir) {
            for (;
                (cur = cur[dir]) && 1 !== cur.nodeType;);
            return cur
        }
        function createOptions(options) {
            var object = optionsCache[options] = {};
            return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
                object[flag] = !0
            }), object
        }
        function completed() {
            document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), jQuery.ready()
        }
        function Data() {
            Object.defineProperty(this.cache = {}, 0, {
                get: function() {
                    return {}
                }
            }), this.expando = jQuery.expando + Math.random()
        }
        function dataAttr(elem, key, data) {
            var name;
            if (void 0 === data && 1 === elem.nodeType) if (name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase(), data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch (e) {}
                data_user.set(elem, key, data)
            } else data = void 0;
            return data
        }
        function returnTrue() {
            return !0
        }
        function returnFalse() {
            return !1
        }
        function safeActiveElement() {
            try {
                return document.activeElement
            } catch (err) {}
        }
        function manipulationTarget(elem, content) {
            return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
        }
        function disableScript(elem) {
            return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem
        }
        function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            return match ? elem.type = match[1] : elem.removeAttribute("type"), elem
        }
        function setGlobalEval(elems, refElements) {
            for (var i = 0, l = elems.length; l > i; i++) data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"))
        }
        function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
            if (1 === dest.nodeType) {
                if (data_priv.hasData(src) && (pdataOld = data_priv.access(src), pdataCur = data_priv.set(dest, pdataOld), events = pdataOld.events)) {
                    delete pdataCur.handle, pdataCur.events = {};
                    for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i])
                }
                data_user.hasData(src) && (udataOld = data_user.access(src), udataCur = jQuery.extend({}, udataOld), data_user.set(dest, udataCur))
            }
        }
        function getAll(context, tag) {
            var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
            return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret
        }
        function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();
            "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue)
        }
        function actualDisplay(name, doc) {
            var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body),
                display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
            return elem.detach(), display
        }
        function defaultDisplay(nodeName) {
            var doc = document,
                display = elemdisplay[nodeName];
            return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), display
        }
        function curCSS(elem, name, computed) {
            var width, minWidth, maxWidth, ret, style = elem.style;
            return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name]), computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), void 0 !== ret ? ret + "" : ret
        }
        function addGetHookIf(conditionFn, hookFn) {
            return {
                get: function() {
                    return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments)
                }
            }
        }
        function vendorPropName(style, name) {
            if (name in style) return name;
            for (var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--;) if (name = cssPrefixes[i] + capName, name in style) return name;
            return origName
        }
        function setPositiveNumber(elem, value, subtract) {
            var matches = rnumsplit.exec(value);
            return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
        }
        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2)"margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
            return val
        }
        function getWidthOrHeight(elem, name, extra) {
            var valueIsBorderBox = !0,
                val = "width" === name ? elem.offsetWidth : elem.offsetHeight,
                styles = getStyles(elem),
                isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
            if (0 >= val || null == val) {
                if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
                valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), val = parseFloat(val) || 0
            }
            return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
        }
        function showHide(elements, show) {
            for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], elem.style && (values[index] = data_priv.get(elem, "olddisplay"), display = elem.style.display, show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), "none" === display && hidden || data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
            for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
            return elements
        }
        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing)
        }
        function createFxNow() {
            return setTimeout(function() {
                fxNow = void 0
            }), fxNow = jQuery.now()
        }
        function genFx(type, includeWidth) {
            var which, i = 0,
                attrs = {
                    height: type
                };
            for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type;
            return includeWidth && (attrs.opacity = attrs.width = type), attrs
        }
        function createTween(value, prop, animation) {
            for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween
        }
        function defaultPrefilter(elem, props, opts) {
            var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this,
                orig = {},
                style = elem.style,
                hidden = elem.nodeType && isHidden(elem),
                dataShow = data_priv.get(elem, "fxshow");
            opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
                hooks.unqueued || oldfire()
            }), hooks.unqueued++, anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire()
                })
            })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", anim.always(function() {
                style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2]
            }));
            for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
                if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                    if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                    hidden = !0
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
            } else display = void 0;
            if (jQuery.isEmptyObject(orig))"inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display);
            else {
                dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = data_priv.access(elem, "fxshow", {}), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                    jQuery(elem).hide()
                }), anim.done(function() {
                    var prop;
                    data_priv.remove(elem, "fxshow");
                    for (prop in orig) jQuery.style(elem, prop, orig[prop])
                });
                for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
            }
        }
        function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;
            for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
                value = hooks.expand(value), delete props[name];
                for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing)
            } else specialEasing[name] = easing
        }
        function Animation(elem, properties, options) {
            var result, stopped, index = 0,
                length = animationPrefilters.length,
                deferred = jQuery.Deferred().always(function() {
                    delete tick.elem
                }),
                tick = function() {
                    if (stopped) return !1;
                    for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
                    return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]), !1)
                },
                animation = deferred.promise({
                    elem: elem,
                    props: jQuery.extend({}, properties),
                    opts: jQuery.extend(!0, {
                        specialEasing: {}
                    }, options),
                    originalProperties: properties,
                    originalOptions: options,
                    startTime: fxNow || createFxNow(),
                    duration: options.duration,
                    tweens: [],
                    createTween: function(prop, end) {
                        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                        return animation.tweens.push(tween), tween
                    },
                    stop: function(gotoEnd) {
                        var index = 0,
                            length = gotoEnd ? animation.tweens.length : 0;
                        if (stopped) return this;
                        for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                        return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]), this
                    }
                }),
                props = animation.props;
            for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
            return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
        }
        function addToPrefiltersOrTransports(structure) {
            return function(dataTypeExpression, func) {
                "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
                var dataType, i = 0,
                    dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
                if (jQuery.isFunction(func)) for (; dataType = dataTypes[i++];)"+" === dataType[0] ? (dataType = dataType.slice(1) || "*", (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
            }
        }
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            function inspect(dataType) {
                var selected;
                return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), !1)
                }), selected
            }
            var inspected = {},
                seekingTransport = structure === transports;
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
        }
        function ajaxExtend(target, src) {
            var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
            return deep && jQuery.extend(!0, target, deep), target
        }
        function ajaxHandleResponses(s, jqXHR, responses) {
            for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
                 "*" === dataTypes[0];) dataTypes.shift(), void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
            if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
                dataTypes.unshift(type);
                break
            }
            if (dataTypes[0] in responses) finalDataType = dataTypes[0];
            else {
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break
                    }
                    firstDataType || (firstDataType = type)
                }
                finalDataType = finalDataType || firstDataType
            }
            return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0
        }
        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev, converters = {},
                dataTypes = s.dataTypes.slice();
            if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
            for (current = dataTypes.shift(); current;) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = dataTypes.shift()) if ("*" === current) current = prev;
            else if ("*" !== prev && prev !== current) {
                if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                    conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.unshift(tmp[1]));
                    break
                }
                if (conv !== !0) if (conv && s["throws"]) response = conv(response);
                else try {
                        response = conv(response)
                    } catch (e) {
                        return {
                            state: "parsererror",
                            error: conv ? e : "No conversion from " + prev + " to " + current
                        }
                    }
            }
            return {
                state: "success",
                data: response
            }
        }
        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
                traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add)
            });
            else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj);
            else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
        }
        function getWindow(elem) {
            return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView
        }
        var arr = [],
            slice = arr.slice,
            concat = arr.concat,
            push = arr.push,
            indexOf = arr.indexOf,
            class2type = {},
            toString = class2type.toString,
            hasOwn = class2type.hasOwnProperty,
            support = {},
            document = window.document,
            version = "2.1.1",
            jQuery = function(selector, context) {
                return new jQuery.fn.init(selector, context)
            },
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            rmsPrefix = /^-ms-/,
            rdashAlpha = /-([\da-z])/gi,
            fcamelCase = function(all, letter) {
                return letter.toUpperCase()
            };
        jQuery.fn = jQuery.prototype = {
            jquery: version,
            constructor: jQuery,
            selector: "",
            length: 0,
            toArray: function() {
                return slice.call(this)
            },
            get: function(num) {
                return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this)
            },
            pushStack: function(elems) {
                var ret = jQuery.merge(this.constructor(), elems);
                return ret.prevObject = this, ret.context = this.context, ret
            },
            each: function(callback, args) {
                return jQuery.each(this, callback, args)
            },
            map: function(callback) {
                return this.pushStack(jQuery.map(this, function(elem, i) {
                    return callback.call(elem, i, elem)
                }))
            },
            slice: function() {
                return this.pushStack(slice.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(i) {
                var len = this.length,
                    j = +i + (0 > i ? len : 0);
                return this.pushStack(j >= 0 && len > j ? [this[j]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: push,
            sort: arr.sort,
            splice: arr.splice
        }, jQuery.extend = jQuery.fn.extend = function() {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = !1;
            for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
            return target
        }, jQuery.extend({
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(msg) {
                throw new Error(msg)
            },
            noop: function() {},
            isFunction: function(obj) {
                return "function" === jQuery.type(obj)
            },
            isArray: Array.isArray,
            isWindow: function(obj) {
                return null != obj && obj === obj.window
            },
            isNumeric: function(obj) {
                return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0
            },
            isPlainObject: function(obj) {
                return "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj) ? !1 : obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0
            },
            isEmptyObject: function(obj) {
                var name;
                for (name in obj) return !1;
                return !0
            },
            type: function(obj) {
                return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj
            },
            globalEval: function(code) {
                var script, indirect = eval;
                code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
            },
            camelCase: function(string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
            },
            nodeName: function(elem, name) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
            },
            each: function(obj, callback, args) {
                var value, i = 0,
                    length = obj.length,
                    isArray = isArraylike(obj);
                if (args) {
                    if (isArray) for (; length > i && (value = callback.apply(obj[i], args), value !== !1); i++);
                    else for (i in obj) if (value = callback.apply(obj[i], args), value === !1) break
                } else if (isArray) for (; length > i && (value = callback.call(obj[i], i, obj[i]), value !== !1); i++);
                else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), value === !1) break;
                return obj
            },
            trim: function(text) {
                return null == text ? "" : (text + "").replace(rtrim, "")
            },
            makeArray: function(arr, results) {
                var ret = results || [];
                return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : push.call(ret, arr)), ret
            },
            inArray: function(elem, arr, i) {
                return null == arr ? -1 : indexOf.call(arr, elem, i)
            },
            merge: function(first, second) {
                for (var len = +second.length, j = 0, i = first.length; len > j; j++) first[i++] = second[j];
                return first.length = i, first
            },
            grep: function(elems, callback, invert) {
                for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), callbackInverse !== callbackExpect && matches.push(elems[i]);
                return matches
            },
            map: function(elems, callback, arg) {
                var value, i = 0,
                    length = elems.length,
                    isArray = isArraylike(elems),
                    ret = [];
                if (isArray) for (; length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value);
                else for (i in elems) value = callback(elems[i], i, arg), null != value && ret.push(value);
                return concat.apply([], ret)
            },
            guid: 1,
            proxy: function(fn, context) {
                var tmp, args, proxy;
                return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                    return fn.apply(context || this, args.concat(slice.call(arguments)))
                }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0
            },
            now: Date.now,
            support: support
        }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase()
        });
        var Sizzle = function(window) {
            function Sizzle(selector, context, results, seed) {
                var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
                if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
                if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
                if (documentIsHTML && !seed) {
                    if (match = rquickExpr.exec(selector)) if (m = match[1]) {
                        if (9 === nodeType) {
                            if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                            if (elem.id === m) return results.push(elem), results
                        } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), results
                    } else {
                        if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), results;
                        if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), results
                    }
                    if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        if (nid = old = expando, newContext = context, newSelector = 9 === nodeType && selector, 1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                            for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), nid = "[id='" + nid + "'] ", i = groups.length; i--;) groups[i] = nid + toSelector(groups[i]);
                            newContext = rsibling.test(selector) && testContext(context.parentNode) || context, newSelector = groups.join(",")
                        }
                        if (newSelector) try {
                            return push.apply(results, newContext.querySelectorAll(newSelector)), results
                        } catch (qsaError) {} finally {
                            old || context.removeAttribute("id")
                        }
                    }
                }
                return select(selector.replace(rtrim, "$1"), context, results, seed)
            }
            function createCache() {
                function cache(key, value) {
                    return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value
                }
                var keys = [];
                return cache
            }
            function markFunction(fn) {
                return fn[expando] = !0, fn
            }
            function assert(fn) {
                var div = document.createElement("div");
                try {
                    return !!fn(div)
                } catch (e) {
                    return !1
                } finally {
                    div.parentNode && div.parentNode.removeChild(div), div = null
                }
            }
            function addHandle(attrs, handler) {
                for (var arr = attrs.split("|"), i = attrs.length; i--;) Expr.attrHandle[arr[i]] = handler
            }
            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
                if (diff) return diff;
                if (cur) for (; cur = cur.nextSibling;) if (cur === b) return -1;
                return a ? 1 : -1
            }
            function createInputPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && elem.type === type
                }
            }
            function createButtonPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return ("input" === name || "button" === name) && elem.type === type
                }
            }
            function createPositionalPseudo(fn) {
                return markFunction(function(argument) {
                    return argument = +argument, markFunction(function(seed, matches) {
                        for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                    })
                })
            }
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== strundefined && context
            }
            function setFilters() {}
            function toSelector(tokens) {
                for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
                return selector
            }
            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    checkNonElements = base && "parentNode" === dir,
                    doneName = done++;
                return combinator.first ?
                    function(elem, context, xml) {
                        for (; elem = elem[dir];) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml)
                    } : function(elem, context, xml) {
                    var oldCache, outerCache, newCache = [dirruns, doneName];
                    if (xml) {
                        for (; elem = elem[dir];) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0
                    } else for (; elem = elem[dir];) if (1 === elem.nodeType || checkNonElements) {
                        if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                        if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0
                    }
                }
            }
            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function(elem, context, xml) {
                        for (var i = matchers.length; i--;) if (!matchers[i](elem, context, xml)) return !1;
                        return !0
                    } : matchers[0]
            }
            function multipleContexts(selector, contexts, results) {
                for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
                return results
            }
            function condense(unmatched, map, filter, context, xml) {
                for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++)(elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), mapped && map.push(i));
                return newUnmatched
            }
            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function(seed, results, context, xml) {
                    var temp, i, elem, preMap = [],
                        postMap = [],
                        preexisting = results.length,
                        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                        matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml),
                        matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                    if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)(elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                for (temp = [], i = matcherOut.length; i--;)(elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                                postFinder(null, matcherOut = [], temp, xml)
                            }
                            for (i = matcherOut.length; i--;)(elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                        }
                    } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
                })
            }
            function matcherFromTokens(tokens) {
                for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                    return elem === checkContext
                }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                    return indexOf.call(checkContext, elem) > -1
                }, implicitRelative, !0), matchers = [function(elem, context, xml) {
                    return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
                }]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
                else {
                    if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                        for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++);
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                                value: " " === tokens[i - 2].type ? "*" : ""
                            })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens))
                    }
                    matchers.push(matcher)
                }
                return elementMatcher(matchers)
            }
            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function(seed, context, xml, results, outermost) {
                        var elem, j, matcher, matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            elems = seed || byElement && Expr.find.TAG("*", outermost),
                            dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1,
                            len = elems.length;
                        for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                            if (byElement && elem) {
                                for (j = 0; matcher = elementMatchers[j++];) if (matcher(elem, context, xml)) {
                                    results.push(elem);
                                    break
                                }
                                outermost && (dirruns = dirrunsUnique)
                            }
                            bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem))
                        }
                        if (matchedCount += i, bySet && i !== matchedCount) {
                            for (j = 0; matcher = setMatchers[j++];) matcher(unmatched, setMatched, context, xml);
                            if (seed) {
                                if (matchedCount > 0) for (; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                                setMatched = condense(setMatched)
                            }
                            push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                        }
                        return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched
                    };
                return bySet ? markFunction(superMatcher) : superMatcher
            }
            var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date,
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function(a, b) {
                    return a === b && (hasDuplicate = !0), 0
                },
                strundefined = "undefined",
                MAX_NEGATIVE = 1 << 31,
                hasOwn = {}.hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                indexOf = arr.indexOf ||
                    function(elem) {
                        for (var i = 0, len = this.length; len > i; i++) if (this[i] === elem) return i;
                        return -1
                    }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
                    ID: new RegExp("^#(" + characterEncoding + ")"),
                    CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
                    TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + attributes),
                    PSEUDO: new RegExp("^" + pseudos),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + booleans + ")$", "i"),
                    needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 65536;
                    return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
                };
            try {
                push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), arr[preferredDoc.childNodes.length].nodeType
            } catch (e) {
                push = {
                    apply: arr.length ?
                        function(target, els) {
                            push_native.apply(target, slice.call(els))
                        } : function(target, els) {
                        for (var j = target.length, i = 0; target[j++] = els[i++];);
                        target.length = j - 1
                    }
                }
            }
            support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? "HTML" !== documentElement.nodeName : !1
            }, setDocument = Sizzle.setDocument = function(node) {
                var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc,
                    parent = doc.defaultView;
                return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = doc.documentElement, documentIsHTML = !isXML(doc), parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", function() {
                    setDocument()
                }, !1) : parent.attachEvent && parent.attachEvent("onunload", function() {
                    setDocument()
                })), support.attributes = assert(function(div) {
                    return div.className = "i", !div.getAttribute("className")
                }), support.getElementsByTagName = assert(function(div) {
                    return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length
                }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
                        return div.innerHTML = "<div class='a'></div><div class='a i'></div>", div.firstChild.className = "i", 2 === div.getElementsByClassName("i").length
                    }), support.getById = assert(function(div) {
                    return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length
                }), support.getById ? (Expr.find.ID = function(id, context) {
                    if (typeof context.getElementById !== strundefined && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : []
                    }
                }, Expr.filter.ID = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId
                    }
                }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === attrId
                    }
                }), Expr.find.TAG = support.getElementsByTagName ?
                    function(tag, context) {
                        return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0
                    } : function(tag, context) {
                    var elem, tmp = [],
                        i = 0,
                        results = context.getElementsByTagName(tag);
                    if ("*" === tag) {
                        for (; elem = results[i++];) 1 === elem.nodeType && tmp.push(elem);
                        return tmp
                    }
                    return results
                }, Expr.find.CLASS = support.getElementsByClassName &&
                    function(className, context) {
                        return typeof context.getElementsByClassName !== strundefined && documentIsHTML ? context.getElementsByClassName(className) : void 0
                    }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                    div.innerHTML = "<select msallowclip=''><option selected=''></option></select>", div.querySelectorAll("[msallowclip^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked")
                }), assert(function(div) {
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:")
                })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                    support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), rbuggyMatches.push("!=", pseudos)
                }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ?
                    function(a, b) {
                        var adown = 9 === a.nodeType ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
                    } : function(a, b) {
                    if (b) for (; b = b.parentNode;) if (b === a) return !0;
                    return !1
                }, sortOrder = hasCompare ?
                    function(a, b) {
                        if (a === b) return hasDuplicate = !0, 0;
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & compare ? -1 : 1)
                    } : function(a, b) {
                    if (a === b) return hasDuplicate = !0, 0;
                    var cur, i = 0,
                        aup = a.parentNode,
                        bup = b.parentNode,
                        ap = [a],
                        bp = [b];
                    if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                    if (aup === bup) return siblingCheck(a, b);
                    for (cur = a; cur = cur.parentNode;) ap.unshift(cur);
                    for (cur = b; cur = cur.parentNode;) bp.unshift(cur);
                    for (; ap[i] === bp[i];) i++;
                    return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
                }, doc) : document
            }, Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements)
            }, Sizzle.matchesSelector = function(elem, expr) {
                if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), !(!support.matchesSelector || !documentIsHTML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret
                } catch (e) {}
                return Sizzle(expr, document, null, [elem]).length > 0
            }, Sizzle.contains = function(context, elem) {
                return (context.ownerDocument || context) !== document && setDocument(context), contains(context, elem)
            }, Sizzle.attr = function(elem, name) {
                (elem.ownerDocument || elem) !== document && setDocument(elem);
                var fn = Expr.attrHandle[name.toLowerCase()],
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
                return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
            }, Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg)
            }, Sizzle.uniqueSort = function(results) {
                var elem, duplicates = [],
                    j = 0,
                    i = 0;
                if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(sortOrder), hasDuplicate) {
                    for (; elem = results[i++];) elem === results[i] && (j = duplicates.push(i));
                    for (; j--;) results.splice(duplicates[j], 1)
                }
                return sortInput = null, results
            }, getText = Sizzle.getText = function(elem) {
                var node, ret = "",
                    i = 0,
                    nodeType = elem.nodeType;
                if (nodeType) {
                    if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                        if ("string" == typeof elem.textContent) return elem.textContent;
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem)
                    } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue
                } else for (; node = elem[i++];) ret += getText(node);
                return ret
            }, Expr = Sizzle.selectors = {
                cacheLength: 50,
                createPseudo: markFunction,
                match: matchExpr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(match) {
                        return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4)
                    },
                    CHILD: function(match) {
                        return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match
                    },
                    PSEUDO: function(match) {
                        var excess, unquoted = !match[6] && match[2];
                        return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return "*" === nodeNameSelector ?
                            function() {
                                return !0
                            } : function(elem) {
                            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                        }
                    },
                    CLASS: function(className) {
                        var pattern = classCache[className + " "];
                        return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                                return pattern.test("string" == typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
                            })
                    },
                    ATTR: function(name, operator, check) {
                        return function(elem) {
                            var result = Sizzle.attr(elem, name);
                            return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0
                        }
                    },
                    CHILD: function(type, what, argument, first, last) {
                        var simple = "nth" !== type.slice(0, 3),
                            forward = "last" !== type.slice(-4),
                            ofType = "of-type" === what;
                        return 1 === first && 0 === last ?
                            function(elem) {
                                return !!elem.parentNode
                            } : function(elem, context, xml) {
                            var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                                parent = elem.parentNode,
                                name = ofType && elem.nodeName.toLowerCase(),
                                useCache = !xml && !ofType;
                            if (parent) {
                                if (simple) {
                                    for (; dir;) {
                                        for (node = elem; node = node[dir];) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                        start = dir = "only" === type && !start && "nextSibling"
                                    }
                                    return !0
                                }
                                if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                                    for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();) if (1 === node.nodeType && ++diff && node === elem) {
                                        outerCache[type] = [dirruns, nodeIndex, diff];
                                        break
                                    }
                                } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1];
                                else for (;
                                        (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node !== elem)););
                                return diff -= last, diff === first || diff % first === 0 && diff / first >= 0
                            }
                        }
                    },
                    PSEUDO: function(pseudo, argument) {
                        var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                        return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            for (var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf.call(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i])
                        }) : function(elem) {
                            return fn(elem, 0, args)
                        }) : fn
                    }
                },
                pseudos: {
                    not: markFunction(function(selector) {
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));
                        return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                            for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;)(elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                        }) : function(elem, context, xml) {
                            return input[0] = elem, matcher(input, null, xml, results), !results.pop()
                        }
                    }),
                    has: markFunction(function(selector) {
                        return function(elem) {
                            return Sizzle(selector, elem).length > 0
                        }
                    }),
                    contains: markFunction(function(text) {
                        return function(elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                        }
                    }),
                    lang: markFunction(function(lang) {
                        return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                            var elemLang;
                            do
                                if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-");
                            while ((elem = elem.parentNode) && 1 === elem.nodeType);
                            return !1
                        }
                    }),
                    target: function(elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id
                    },
                    root: function(elem) {
                        return elem === docElem
                    },
                    focus: function(elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !! (elem.type || elem.href || ~elem.tabIndex)
                    },
                    enabled: function(elem) {
                        return elem.disabled === !1
                    },
                    disabled: function(elem) {
                        return elem.disabled === !0
                    },
                    checked: function(elem) {
                        var nodeName = elem.nodeName.toLowerCase();
                        return "input" === nodeName && !! elem.checked || "option" === nodeName && !! elem.selected
                    },
                    selected: function(elem) {
                        return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0
                    },
                    empty: function(elem) {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(elem) {
                        return !Expr.pseudos.empty(elem)
                    },
                    header: function(elem) {
                        return rheader.test(elem.nodeName)
                    },
                    input: function(elem) {
                        return rinputs.test(elem.nodeName)
                    },
                    button: function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return "input" === name && "button" === elem.type || "button" === name
                    },
                    text: function(elem) {
                        var attr;
                        return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase())
                    },
                    first: createPositionalPseudo(function() {
                        return [0]
                    }),
                    last: createPositionalPseudo(function(matchIndexes, length) {
                        return [length - 1]
                    }),
                    eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                        return [0 > argument ? argument + length : argument]
                    }),
                    even: createPositionalPseudo(function(matchIndexes, length) {
                        for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                        return matchIndexes
                    }),
                    odd: createPositionalPseudo(function(matchIndexes, length) {
                        for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                        return matchIndexes
                    }),
                    lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                        for (var i = 0 > argument ? argument + length : argument; --i >= 0;) matchIndexes.push(i);
                        return matchIndexes
                    }),
                    gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                        for (var i = 0 > argument ? argument + length : argument; ++i < length;) matchIndexes.push(i);
                        return matchIndexes
                    })
                }
            }, Expr.pseudos.nth = Expr.pseudos.eq;
            for (i in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) Expr.pseudos[i] = createInputPseudo(i);
            for (i in {
                submit: !0,
                reset: !0
            }) Expr.pseudos[i] = createButtonPseudo(i);
            return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters, tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                if (cached) return parseOnly ? 0 : cached.slice(0);
                for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) {
                    (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    }), soFar = soFar.slice(matched.length));
                    for (type in Expr.filter)!(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), tokens.push({
                        value: matched,
                        type: type,
                        matches: match
                    }), soFar = soFar.slice(matched.length));
                    if (!matched) break
                }
                return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
            }, compile = Sizzle.compile = function(selector, match) {
                var i, setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];
                if (!cached) {
                    for (match || (match = tokenize(selector)), i = match.length; i--;) cached = matcherFromTokens(match[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), cached.selector = selector
                }
                return cached
            }, select = Sizzle.select = function(selector, context, results, seed) {
                var i, tokens, token, type, find, compiled = "function" == typeof selector && selector,
                    match = !seed && tokenize(selector = compiled.selector || selector);
                if (results = results || [], 1 === match.length) {
                    if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                        if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], !context) return results;
                        compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length)
                    }
                    for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], !Expr.relative[type = token.type]);) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                        if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), results;
                        break
                    }
                }
                return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), results
            }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, support.detectDuplicates = !! hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
                return 1 & div1.compareDocumentPosition(document.createElement("div"))
            }), assert(function(div) {
                return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href")
            }) || addHandle("type|href|height|width", function(elem, name, isXML) {
                return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2)
            }), support.attributes && assert(function(div) {
                return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value")
            }) || addHandle("value", function(elem, name, isXML) {
                return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue
            }), assert(function(div) {
                return null == div.getAttribute("disabled")
            }) || addHandle(booleans, function(elem, name, isXML) {
                var val;
                return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
            }), Sizzle
        }(window);
        jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
        var rneedsContext = jQuery.expr.match.needsContext,
            rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            risSimple = /^.[^:#\[\.,]*$/;
        jQuery.filter = function(expr, elems, not) {
            var elem = elems[0];
            return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return 1 === elem.nodeType
            }))
        }, jQuery.fn.extend({
            find: function(selector) {
                var i, len = this.length,
                    ret = [],
                    self = this;
                if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0
                }));
                for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
                return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret
            },
            filter: function(selector) {
                return this.pushStack(winnow(this, selector || [], !1))
            },
            not: function(selector) {
                return this.pushStack(winnow(this, selector || [], !0))
            },
            is: function(selector) {
                return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length
            }
        });
        var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            init = jQuery.fn.init = function(selector, context) {
                var match, elem;
                if (!selector) return this;
                if ("string" == typeof selector) {
                    if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                    if (match[1]) {
                        if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                        return this
                    }
                    return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, this[0] = elem), this.context = document, this.selector = selector, this
                }
                return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
            };
        init.prototype = jQuery.fn, rootjQuery = jQuery(document);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/,
            guaranteedUnique = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        jQuery.extend({
            dir: function(elem, dir, until) {
                for (var matched = [], truncate = void 0 !== until;
                     (elem = elem[dir]) && 9 !== elem.nodeType;) if (1 === elem.nodeType) {
                    if (truncate && jQuery(elem).is(until)) break;
                    matched.push(elem)
                }
                return matched
            },
            sibling: function(n, elem) {
                for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
                return matched
            }
        }), jQuery.fn.extend({
            has: function(target) {
                var targets = jQuery(target, this),
                    l = targets.length;
                return this.filter(function() {
                    for (var i = 0; l > i; i++) if (jQuery.contains(this, targets[i])) return !0
                })
            },
            closest: function(selectors, context) {
                for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                    matched.push(cur);
                    break
                }
                return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched)
            },
            index: function(elem) {
                return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(selector, context) {
                return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))))
            },
            addBack: function(selector) {
                return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
            }
        }), jQuery.each({
            parent: function(elem) {
                var parent = elem.parentNode;
                return parent && 11 !== parent.nodeType ? parent : null
            },
            parents: function(elem) {
                return jQuery.dir(elem, "parentNode")
            },
            parentsUntil: function(elem, i, until) {
                return jQuery.dir(elem, "parentNode", until)
            },
            next: function(elem) {
                return sibling(elem, "nextSibling")
            },
            prev: function(elem) {
                return sibling(elem, "previousSibling")
            },
            nextAll: function(elem) {
                return jQuery.dir(elem, "nextSibling")
            },
            prevAll: function(elem) {
                return jQuery.dir(elem, "previousSibling")
            },
            nextUntil: function(elem, i, until) {
                return jQuery.dir(elem, "nextSibling", until)
            },
            prevUntil: function(elem, i, until) {
                return jQuery.dir(elem, "previousSibling", until)
            },
            siblings: function(elem) {
                return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
            },
            children: function(elem) {
                return jQuery.sibling(elem.firstChild)
            },
            contents: function(elem) {
                return elem.contentDocument || jQuery.merge([], elem.childNodes)
            }
        }, function(name, fn) {
            jQuery.fn[name] = function(until, selector) {
                var matched = jQuery.map(this, fn, until);
                return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), this.length > 1 && (guaranteedUnique[name] || jQuery.unique(matched), rparentsprev.test(name) && matched.reverse()), this.pushStack(matched)
            }
        });
        var rnotwhite = /\S+/g,
            optionsCache = {};
        jQuery.Callbacks = function(options) {
            options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
            var memory, fired, firing, firingStart, firingLength, firingIndex, list = [],
                stack = !options.once && [],
                fire = function(data) {
                    for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                        memory = !1;
                        break
                    }
                    firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
                },
                self = {
                    add: function() {
                        if (list) {
                            var start = list.length;
                            !
                                function add(args) {
                                    jQuery.each(args, function(_, arg) {
                                        var type = jQuery.type(arg);
                                        "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
                                    })
                                }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory))
                        }
                        return this
                    },
                    remove: function() {
                        return list && jQuery.each(arguments, function(_, arg) {
                            for (var index;
                                 (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1), firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--)
                        }), this
                    },
                    has: function(fn) {
                        return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length)
                    },
                    empty: function() {
                        return list = [], firingLength = 0, this
                    },
                    disable: function() {
                        return list = stack = memory = void 0, this
                    },
                    disabled: function() {
                        return !list
                    },
                    lock: function() {
                        return stack = void 0, memory || self.disable(), this
                    },
                    locked: function() {
                        return !stack
                    },
                    fireWith: function(context, args) {
                        return !list || fired && !stack || (args = args || [], args = [context, args.slice ? args.slice() : args], firing ? stack.push(args) : fire(args)), this
                    },
                    fire: function() {
                        return self.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!fired
                    }
                };
            return self
        }, jQuery.extend({
            Deferred: function(func) {
                var tuples = [
                        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", jQuery.Callbacks("memory")]
                    ],
                    state = "pending",
                    promise = {
                        state: function() {
                            return state
                        },
                        always: function() {
                            return deferred.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var fns = arguments;
                            return jQuery.Deferred(function(newDefer) {
                                jQuery.each(tuples, function(i, tuple) {
                                    var fn = jQuery.isFunction(fns[i]) && fns[i];
                                    deferred[tuple[1]](function() {
                                        var returned = fn && fn.apply(this, arguments);
                                        returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                                    })
                                }), fns = null
                            }).promise()
                        },
                        promise: function(obj) {
                            return null != obj ? jQuery.extend(obj, promise) : promise
                        }
                    },
                    deferred = {};
                return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                    var list = tuple[2],
                        stateString = tuple[3];
                    promise[tuple[1]] = list.add, stateString && list.add(function() {
                        state = stateString
                    }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                        return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this
                    }, deferred[tuple[0] + "With"] = list.fireWith
                }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
            },
            when: function(subordinate) {
                var progressValues, progressContexts, resolveContexts, i = 0,
                    resolveValues = slice.call(arguments),
                    length = resolveValues.length,
                    remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
                    deferred = 1 === remaining ? subordinate : jQuery.Deferred(),
                    updateFunc = function(i, contexts, values) {
                        return function(value) {
                            contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                        }
                    };
                if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
                return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
            }
        });
        var readyList;
        jQuery.fn.ready = function(fn) {
            return jQuery.ready.promise().done(fn), this
        }, jQuery.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(hold) {
                hold ? jQuery.readyWait++ : jQuery.ready(!0)
            },
            ready: function(wait) {
                (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))))
            }
        }), jQuery.ready.promise = function(obj) {
            return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1))), readyList.promise(obj)
        }, jQuery.ready.promise();
        var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0,
                len = elems.length,
                bulk = null == key;
            if ("object" === jQuery.type(key)) {
                chainable = !0;
                for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw)
            } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                    return bulk.call(jQuery(elem), value)
                })), fn)) for (; len > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
            return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet
        };
        jQuery.acceptData = function(owner) {
            return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType
        }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
            key: function(owner) {
                if (!Data.accepts(owner)) return 0;
                var descriptor = {},
                    unlock = owner[this.expando];
                if (!unlock) {
                    unlock = Data.uid++;
                    try {
                        descriptor[this.expando] = {
                            value: unlock
                        }, Object.defineProperties(owner, descriptor)
                    } catch (e) {
                        descriptor[this.expando] = unlock, jQuery.extend(owner, descriptor)
                    }
                }
                return this.cache[unlock] || (this.cache[unlock] = {}), unlock
            },
            set: function(owner, data, value) {
                var prop, unlock = this.key(owner),
                    cache = this.cache[unlock];
                if ("string" == typeof data) cache[data] = value;
                else if (jQuery.isEmptyObject(cache)) jQuery.extend(this.cache[unlock], data);
                else for (prop in data) cache[prop] = data[prop];
                return cache
            },
            get: function(owner, key) {
                var cache = this.cache[this.key(owner)];
                return void 0 === key ? cache : cache[key]
            },
            access: function(owner, key, value) {
                var stored;
                return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), void 0 !== value ? value : key)
            },
            remove: function(owner, key) {
                var i, name, camel, unlock = this.key(owner),
                    cache = this.cache[unlock];
                if (void 0 === key) this.cache[unlock] = {};
                else {
                    jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), key in cache ? name = [key, camel] : (name = camel, name = name in cache ? [name] : name.match(rnotwhite) || [])), i = name.length;
                    for (; i--;) delete cache[name[i]]
                }
            },
            hasData: function(owner) {
                return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {})
            },
            discard: function(owner) {
                owner[this.expando] && delete this.cache[owner[this.expando]]
            }
        };
        var data_priv = new Data,
            data_user = new Data,
            rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            rmultiDash = /([A-Z])/g;
        jQuery.extend({
            hasData: function(elem) {
                return data_user.hasData(elem) || data_priv.hasData(elem)
            },
            data: function(elem, name, data) {
                return data_user.access(elem, name, data)
            },
            removeData: function(elem, name) {
                data_user.remove(elem, name)
            },
            _data: function(elem, name, data) {
                return data_priv.access(elem, name, data)
            },
            _removeData: function(elem, name) {
                data_priv.remove(elem, name)
            }
        }), jQuery.fn.extend({
            data: function(key, value) {
                var i, name, data, elem = this[0],
                    attrs = elem && elem.attributes;
                if (void 0 === key) {
                    if (this.length && (data = data_user.get(elem), 1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
                        for (i = attrs.length; i--;) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), dataAttr(elem, name, data[name])));
                        data_priv.set(elem, "hasDataAttrs", !0)
                    }
                    return data
                }
                return "object" == typeof key ? this.each(function() {
                    data_user.set(this, key)
                }) : access(this, function(value) {
                    var data, camelKey = jQuery.camelCase(key);
                    if (elem && void 0 === value) {
                        if (data = data_user.get(elem, key), void 0 !== data) return data;
                        if (data = data_user.get(elem, camelKey), void 0 !== data) return data;
                        if (data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data
                    } else this.each(function() {
                        var data = data_user.get(this, camelKey);
                        data_user.set(this, camelKey, value), -1 !== key.indexOf("-") && void 0 !== data && data_user.set(this, key, value)
                    })
                }, null, value, arguments.length > 1, null, !0)
            },
            removeData: function(key) {
                return this.each(function() {
                    data_user.remove(this, key)
                })
            }
        }), jQuery.extend({
            queue: function(elem, type, data) {
                var queue;
                return elem ? (type = (type || "fx") + "queue", queue = data_priv.get(elem, type), data && (!queue || jQuery.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []) : void 0
            },
            dequeue: function(elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type),
                    startLength = queue.length,
                    fn = queue.shift(),
                    hooks = jQuery._queueHooks(elem, type),
                    next = function() {
                        jQuery.dequeue(elem, type)
                    };
                "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire()
            },
            _queueHooks: function(elem, type) {
                var key = type + "queueHooks";
                return data_priv.get(elem, key) || data_priv.access(elem, key, {
                        empty: jQuery.Callbacks("once memory").add(function() {
                            data_priv.remove(elem, [type + "queue", key])
                        })
                    })
            }
        }), jQuery.fn.extend({
            queue: function(type, data) {
                var setter = 2;
                return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                    var queue = jQuery.queue(this, type, data);
                    jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
                })
            },
            dequeue: function(type) {
                return this.each(function() {
                    jQuery.dequeue(this, type)
                })
            },
            clearQueue: function(type) {
                return this.queue(type || "fx", [])
            },
            promise: function(type, obj) {
                var tmp, count = 1,
                    defer = jQuery.Deferred(),
                    elements = this,
                    i = this.length,
                    resolve = function() {
                        --count || defer.resolveWith(elements, [elements])
                    };
                for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--;) tmp = data_priv.get(elements[i], type + "queueHooks"), tmp && tmp.empty && (count++, tmp.empty.add(resolve));
                return resolve(), defer.promise(obj)
            }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            cssExpand = ["Top", "Right", "Bottom", "Left"],
            isHidden = function(elem, el) {
                return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
            },
            rcheckableType = /^(?:checkbox|radio)$/i;
        !
            function() {
                var fragment = document.createDocumentFragment(),
                    div = fragment.appendChild(document.createElement("div")),
                    input = document.createElement("input");
                input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !! div.cloneNode(!0).lastChild.defaultValue
            }();
        var strundefined = "undefined";
        support.focusinBubbles = "onfocusin" in window;
        var rkeyEvent = /^key/,
            rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
            rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
        jQuery.event = {
            global: {},
            add: function(elem, types, handler, data, selector) {
                var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
                if (elemData) for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0
                }), types = (types || "").match(rnotwhite) || [""], t = types.length; t--;) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle, !1)), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0)
            },
            remove: function(elem, types, handler, selector, mappedTypes) {
                var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
                if (elemData && (events = elemData.events)) {
                    for (types = (types || "").match(rnotwhite) || [""], t = types.length; t--;) if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                        for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), origCount = j = handlers.length; j--;) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                        origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
                    } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                    jQuery.isEmptyObject(events) && (delete elemData.handle, data_priv.remove(elem, "events"))
                }
            },
            trigger: function(event, data, elem, onlyHandlers) {
                var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document],
                    type = hasOwn.call(event, "type") ? event.type : event,
                    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                    if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                        for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), tmp = cur;
                        tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                    }
                    for (i = 0;
                         (cur = eventPath[i++]) && !event.isPropagationStopped();) event.type = i > 1 ? bubbleType : special.bindType || type, handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle"), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), event.result === !1 && event.preventDefault());
                    return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp)), event.result
                }
            },
            dispatch: function(event) {
                event = jQuery.event.fix(event);
                var i, j, ret, matched, handleObj, handlerQueue = [],
                    args = slice.call(arguments),
                    handlers = (data_priv.get(this, "events") || {})[event.type] || [],
                    special = jQuery.event.special[event.type] || {};
                if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                    for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0;
                         (matched = handlerQueue[i++]) && !event.isPropagationStopped();) for (event.currentTarget = matched.elem, j = 0;
                                                                                               (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();)(!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                    return special.postDispatch && special.postDispatch.call(this, event), event.result
                }
            },
            handlers: function(event, handlers) {
                var i, matches, sel, handleObj, handlerQueue = [],
                    delegateCount = handlers.delegateCount,
                    cur = event.target;
                if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (; cur !== this; cur = cur.parentNode || this) if (cur.disabled !== !0 || "click" !== event.type) {
                    for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length), matches[sel] && matches.push(handleObj);
                    matches.length && handlerQueue.push({
                        elem: cur,
                        handlers: matches
                    })
                }
                return delegateCount < handlers.length && handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                }), handlerQueue
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(event, original) {
                    return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(event, original) {
                    var eventDoc, doc, body, button = original.button;
                    return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event
                }
            },
            fix: function(event) {
                if (event[jQuery.expando]) return event;
                var i, prop, copy, type = event.type,
                    originalEvent = event,
                    fixHook = this.fixHooks[type];
                for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), i = copy.length; i--;) prop = copy[i], event[prop] = originalEvent[prop];
                return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), fixHook.filter ? fixHook.filter(event, originalEvent) : event
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        return this !== safeActiveElement() && this.focus ? (this.focus(), !1) : void 0
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), !1) : void 0
                    },
                    _default: function(event) {
                        return jQuery.nodeName(event.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(event) {
                        void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result)
                    }
                }
            },
            simulate: function(type, elem, event, bubble) {
                var e = jQuery.extend(new jQuery.Event, event, {
                    type: type,
                    isSimulated: !0,
                    originalEvent: {}
                });
                bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), e.isDefaultPrevented() && event.preventDefault()
            }
        }, jQuery.removeEvent = function(elem, type, handle) {
            elem.removeEventListener && elem.removeEventListener(type, handle, !1)
        }, jQuery.Event = function(src, props) {
            return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = !0)) : new jQuery.Event(src, props)
        }, jQuery.Event.prototype = {
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function(event) {
                    var ret, target = this,
                        related = event.relatedTarget,
                        handleObj = event.handleObj;
                    return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret
                }
            }
        }), support.focusinBubbles || jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = data_priv.access(doc, fix);
                    attaches || doc.addEventListener(orig, handler, !0), data_priv.access(doc, fix, (attaches || 0) + 1)
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = data_priv.access(doc, fix) - 1;
                    attaches ? data_priv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), data_priv.remove(doc, fix))
                }
            }
        }), jQuery.fn.extend({
            on: function(types, selector, data, fn, one) {
                var origFn, type;
                if ("object" == typeof types) {
                    "string" != typeof selector && (data = data || selector, selector = void 0);
                    for (type in types) this.on(type, selector, data, types[type], one);
                    return this
                }
                if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse;
                else if (!fn) return this;
                return 1 === one && (origFn = fn, fn = function(event) {
                    return jQuery().off(event), origFn.apply(this, arguments)
                }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                    jQuery.event.add(this, types, fn, data, selector)
                })
            },
            one: function(types, selector, data, fn) {
                return this.on(types, selector, data, fn, 1)
            },
            off: function(types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
                if ("object" == typeof types) {
                    for (type in types) this.off(type, selector, types[type]);
                    return this
                }
                return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), fn === !1 && (fn = returnFalse), this.each(function() {
                    jQuery.event.remove(this, types, fn, selector)
                })
            },
            trigger: function(type, data) {
                return this.each(function() {
                    jQuery.event.trigger(type, data, this)
                })
            },
            triggerHandler: function(type, data) {
                var elem = this[0];
                return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0
            }
        });
        var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            rhtml = /<|&#?\w+;/,
            rnoInnerhtml = /<(?:script|style|link)/i,
            rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rscriptType = /^$|\/(?:java|ecma)script/i,
            rscriptTypeMasked = /^true\/(.*)/,
            rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            wrapMap = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.extend({
            clone: function(elem, dataAndEvents, deepDataAndEvents) {
                var i, l, srcElements, destElements, clone = elem.cloneNode(!0),
                    inPage = jQuery.contains(elem.ownerDocument, elem);
                if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), srcElements = getAll(elem), i = 0, l = srcElements.length; l > i; i++) fixInput(srcElements[i], destElements[i]);
                if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), destElements = destElements || getAll(clone), i = 0, l = srcElements.length; l > i; i++) cloneCopyEvent(srcElements[i], destElements[i]);
                else cloneCopyEvent(elem, clone);
                return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), clone
            },
            buildFragment: function(elems, context, scripts, selection) {
                for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; l > i; i++) if (elem = elems[i], elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                else if (rhtml.test(elem)) {
                    for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], j = wrap[0]; j--;) tmp = tmp.lastChild;
                    jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = ""
                } else nodes.push(context.createTextNode(elem));
                for (fragment.textContent = "", i = 0; elem = nodes[i++];) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts)) for (j = 0; elem = tmp[j++];) rscriptType.test(elem.type || "") && scripts.push(elem);
                return fragment
            },
            cleanData: function(elems) {
                for (var data, elem, type, key, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) {
                    if (jQuery.acceptData(elem) && (key = elem[data_priv.expando], key && (data = data_priv.cache[key]))) {
                        if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                        data_priv.cache[key] && delete data_priv.cache[key]
                    }
                    delete data_user.cache[elem[data_user.expando]]
                }
            }
        }), jQuery.fn.extend({
            text: function(value) {
                return access(this, function(value) {
                    return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = value)
                    })
                }, null, value, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(elem) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(elem) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(elem) {
                    this.parentNode && this.parentNode.insertBefore(elem, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(elem) {
                    this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
                })
            },
            remove: function(selector, keepData) {
                for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), elem.parentNode.removeChild(elem));
                return this
            },
            empty: function() {
                for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.textContent = "");
                return this
            },
            clone: function(dataAndEvents, deepDataAndEvents) {
                return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
                })
            },
            html: function(value) {
                return access(this, function(value) {
                    var elem = this[0] || {},
                        i = 0,
                        l = this.length;
                    if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                    if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                        value = value.replace(rxhtmlTag, "<$1></$2>");
                        try {
                            for (; l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.innerHTML = value);
                            elem = 0
                        } catch (e) {}
                    }
                    elem && this.empty().append(value)
                }, null, value, arguments.length)
            },
            replaceWith: function() {
                var arg = arguments[0];
                return this.domManip(arguments, function(elem) {
                    arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this)
                }), arg && (arg.length || arg.nodeType) ? this : this.remove()
            },
            detach: function(selector) {
                return this.remove(selector, !0)
            },
            domManip: function(args, callback) {
                args = concat.apply([], args);
                var fragment, first, scripts, hasScripts, node, doc, i = 0,
                    l = this.length,
                    set = this,
                    iNoClone = l - 1,
                    value = args[0],
                    isFunction = jQuery.isFunction(value);
                if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                    var self = set.eq(index);
                    isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback)
                });
                if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)) {
                    for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), callback.call(this[i], node, i);
                    if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")))
                }
                return this
            }
        }), jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(name, original) {
            jQuery.fn[name] = function(selector) {
                for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; last >= i; i++) elems = i === last ? this : this.clone(!0), jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
                return this.pushStack(ret)
            }
        });
        var iframe, elemdisplay = {},
            rmargin = /^margin/,
            rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
            getStyles = function(elem) {
                return elem.ownerDocument.defaultView.getComputedStyle(elem, null)
            };
        !
            function() {
                function computePixelPositionAndBoxSizingReliable() {
                    div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", div.innerHTML = "", docElem.appendChild(container);
                    var divStyle = window.getComputedStyle(div, null);
                    pixelPositionVal = "1%" !== divStyle.top, boxSizingReliableVal = "4px" === divStyle.width, docElem.removeChild(container)
                }
                var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement,
                    container = document.createElement("div"),
                    div = document.createElement("div");
                div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", container.appendChild(div), window.getComputedStyle && jQuery.extend(support, {
                    pixelPosition: function() {
                        return computePixelPositionAndBoxSizingReliable(), pixelPositionVal
                    },
                    boxSizingReliable: function() {
                        return null == boxSizingReliableVal && computePixelPositionAndBoxSizingReliable(), boxSizingReliableVal
                    },
                    reliableMarginRight: function() {
                        var ret, marginDiv = div.appendChild(document.createElement("div"));
                        return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", docElem.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight), docElem.removeChild(container), ret
                    }
                }))
            }(), jQuery.swap = function(elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
            ret = callback.apply(elem, args || []);
            for (name in options) elem.style[name] = old[name];
            return ret
        };
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
            rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
            rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
            cssShow = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            cssNormalTransform = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            cssPrefixes = ["Webkit", "O", "Moz", "ms"];
        jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, "opacity");
                            return "" === ret ? "1" : ret
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(elem, name, value, extra) {
                if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                    var ret, type, hooks, origName = jQuery.camelCase(name),
                        style = elem.style;
                    return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)), void 0)
                }
            },
            css: function(elem, name, extra, styles) {
                var val, num, hooks, origName = jQuery.camelCase(name);
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val
            }
        }), jQuery.each(["height", "width"], function(i, name) {
            jQuery.cssHooks[name] = {
                get: function(elem, computed, extra) {
                    return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra)
                    }) : getWidthOrHeight(elem, name, extra) : void 0
                },
                set: function(elem, value, extra) {
                    var styles = extra && getStyles(elem);
                    return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0)
                }
            }
        }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
            return computed ? jQuery.swap(elem, {
                display: "inline-block"
            }, curCSS, [elem, "marginRight"]) : void 0
        }), jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function(value) {
                    for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                    return expanded
                }
            }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
        }), jQuery.fn.extend({
            css: function(name, value) {
                return access(this, function(elem, name, value) {
                    var styles, len, map = {},
                        i = 0;
                    if (jQuery.isArray(name)) {
                        for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                        return map
                    }
                    return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
                }, name, value, arguments.length > 1)
            },
            show: function() {
                return showHide(this, !0)
            },
            hide: function() {
                return showHide(this)
            },
            toggle: function(state) {
                return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                    isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
                })
            }
        }), jQuery.Tween = Tween, Tween.prototype = {
            constructor: Tween,
            init: function(elem, options, prop, end, easing, unit) {
                this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
            },
            cur: function() {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
            },
            run: function(percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this
            }
        }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
            _default: {
                get: function(tween) {
                    var result;
                    return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), result && "auto" !== result ? result : 0) : tween.elem[tween.prop]
                },
                set: function(tween) {
                    jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
                }
            }
        }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function(tween) {
                tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
            }
        }, jQuery.easing = {
            linear: function(p) {
                return p
            },
            swing: function(p) {
                return .5 - Math.cos(p * Math.PI) / 2
            }
        }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
        var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
            rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
            rrun = /queueHooks$/,
            animationPrefilters = [defaultPrefilter],
            tweeners = {
                "*": [function(prop, value) {
                    var tween = this.createTween(prop, value),
                        target = tween.cur(),
                        parts = rfxnum.exec(value),
                        unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                        start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
                        scale = 1,
                        maxIterations = 20;
                    if (start && start[3] !== unit) {
                        unit = unit || start[3], parts = parts || [], start = +target || 1;
                        do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit);
                        while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations)
                    }
                    return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween
                }]
            };
        jQuery.Animation = jQuery.extend(Animation, {
            tweener: function(props, callback) {
                jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.split(" ");
                for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback)
            },
            prefilter: function(callback, prepend) {
                prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
            }
        }), jQuery.speed = function(speed, easing, fn) {
            var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
                jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue)
            }, opt
        }, jQuery.fn.extend({
            fadeTo: function(speed, to, easing, callback) {
                return this.filter(isHidden).css("opacity", 0).show().end().animate({
                    opacity: to
                }, speed, easing, callback)
            },
            animate: function(prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop),
                    optall = jQuery.speed(speed, easing, callback),
                    doAnimation = function() {
                        var anim = Animation(this, jQuery.extend({}, prop), optall);
                        (empty || data_priv.get(this, "finish")) && anim.stop(!0)
                    };
                return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
            },
            stop: function(type, clearQueue, gotoEnd) {
                var stopQueue = function(hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop, stop(gotoEnd)
                };
                return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                    var dequeue = !0,
                        index = null != type && type + "queueHooks",
                        timers = jQuery.timers,
                        data = data_priv.get(this);
                    if (index) data[index] && data[index].stop && stopQueue(data[index]);
                    else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                    for (index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
                    (dequeue || !gotoEnd) && jQuery.dequeue(this, type)
                })
            },
            finish: function(type) {
                return type !== !1 && (type = type || "fx"), this.each(function() {
                    var index, data = data_priv.get(this),
                        queue = data[type + "queue"],
                        hooks = data[type + "queueHooks"],
                        timers = jQuery.timers,
                        length = queue ? queue.length : 0;
                    for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), index = timers.length; index--;) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), timers.splice(index, 1));
                    for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                    delete data.finish
                })
            }
        }), jQuery.each(["toggle", "show", "hide"], function(i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function(speed, easing, callback) {
                return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
            }
        }), jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(name, props) {
            jQuery.fn[name] = function(speed, easing, callback) {
                return this.animate(props, speed, easing, callback)
            }
        }), jQuery.timers = [], jQuery.fx.tick = function() {
            var timer, i = 0,
                timers = jQuery.timers;
            for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
            timers.length || jQuery.fx.stop(), fxNow = void 0
        }, jQuery.fx.timer = function(timer) {
            jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop()
        }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
            timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
        }, jQuery.fx.stop = function() {
            clearInterval(timerId), timerId = null
        }, jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, jQuery.fn.delay = function(time, type) {
            return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout)
                }
            })
        }, function() {
            var input = document.createElement("input"),
                select = document.createElement("select"),
                opt = select.appendChild(document.createElement("option"));
            input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), input.value = "t", input.type = "radio", support.radioValue = "t" === input.value
        }();
        var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
            attr: function(name, value) {
                return access(this, jQuery.attr, name, value, arguments.length > 1)
            },
            removeAttr: function(name) {
                return this.each(function() {
                    jQuery.removeAttr(this, name)
                })
            }
        }), jQuery.extend({
            attr: function(elem, name, value) {
                var hooks, ret, nType = elem.nodeType;
                if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), value) : void jQuery.removeAttr(elem, name))
            },
            removeAttr: function(elem, value) {
                var name, propName, i = 0,
                    attrNames = value && value.match(rnotwhite);
                if (attrNames && 1 === elem.nodeType) for (; name = attrNames[i++];) propName = jQuery.propFix[name] || name, jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name)
            },
            attrHooks: {
                type: {
                    set: function(elem, value) {
                        if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                            var val = elem.value;
                            return elem.setAttribute("type", value), val && (elem.value = val), value
                        }
                    }
                }
            }
        }), boolHook = {
            set: function(elem, value, name) {
                return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), name
            }
        }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = function(elem, name, isXML) {
                var ret, handle;
                return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, attrHandle[name] = handle), ret
            }
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i;
        jQuery.fn.extend({
            prop: function(name, value) {
                return access(this, jQuery.prop, name, value, arguments.length > 1)
            },
            removeProp: function(name) {
                return this.each(function() {
                    delete this[jQuery.propFix[name] || name]
                })
            }
        }), jQuery.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(elem, name, value) {
                var ret, hooks, notxml, nType = elem.nodeType;
                if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name]
            },
            propHooks: {
                tabIndex: {
                    get: function(elem) {
                        return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1
                    }
                }
            }
        }), support.optSelected || (jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                return parent && parent.parentNode && parent.parentNode.selectedIndex, null
            }
        }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            jQuery.propFix[this.toLowerCase()] = this
        });
        var rclass = /[\t\r\n\f]/g;
        jQuery.fn.extend({
            addClass: function(value) {
                var classes, elem, cur, clazz, j, finalValue, proceed = "string" == typeof value && value,
                    i = 0,
                    len = this.length;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className))
                });
                if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                    for (j = 0; clazz = classes[j++];) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                    finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue)
                }
                return this
            },
            removeClass: function(value) {
                var classes, elem, cur, clazz, j, finalValue, proceed = 0 === arguments.length || "string" == typeof value && value,
                    i = 0,
                    len = this.length;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className))
                });
                if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                    for (j = 0; clazz = classes[j++];) for (; cur.indexOf(" " + clazz + " ") >= 0;) cur = cur.replace(" " + clazz + " ", " ");
                    finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue)
                }
                return this
            },
            toggleClass: function(value, stateVal) {
                var type = typeof value;
                return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
                }) : this.each(function() {
                    if ("string" === type) for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++];) self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                    else(type === strundefined || "boolean" === type) && (this.className && data_priv.set(this, "__className__", this.className), this.className = this.className || value === !1 ? "" : data_priv.get(this, "__className__") || "")
                })
            },
            hasClass: function(selector) {
                for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
                return !1
            }
        });
        var rreturn = /\r/g;
        jQuery.fn.extend({
            val: function(value) {
                var hooks, ret, isFunction, elem = this[0]; {
                    if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                        var val;
                        1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                            return null == value ? "" : value + ""
                        })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val))
                    });
                    if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret)
                }
            }
        }), jQuery.extend({
            valHooks: {
                option: {
                    get: function(elem) {
                        var val = jQuery.find.attr(elem, "value");
                        return null != val ? val : jQuery.trim(jQuery.text(elem))
                    }
                },
                select: {
                    get: function(elem) {
                        for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], !(!option.selected && i !== index || (support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                            if (value = jQuery(option).val(), one) return value;
                            values.push(value)
                        }
                        return values
                    },
                    set: function(elem, value) {
                        for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--;) option = options[i], (option.selected = jQuery.inArray(option.value, values) >= 0) && (optionSet = !0);
                        return optionSet || (elem.selectedIndex = -1), values
                    }
                }
            }
        }), jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                set: function(elem, value) {
                    return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0
                }
            }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
                return null === elem.getAttribute("value") ? "on" : elem.value
            })
        }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
            jQuery.fn[name] = function(data, fn) {
                return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
            }
        }), jQuery.fn.extend({
            hover: function(fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
            },
            bind: function(types, data, fn) {
                return this.on(types, null, data, fn)
            },
            unbind: function(types, fn) {
                return this.off(types, null, fn)
            },
            delegate: function(selector, types, data, fn) {
                return this.on(types, selector, data, fn)
            },
            undelegate: function(selector, types, fn) {
                return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
            }
        });
        var nonce = jQuery.now(),
            rquery = /\?/;
        jQuery.parseJSON = function(data) {
            return JSON.parse(data + "")
        }, jQuery.parseXML = function(data) {
            var xml, tmp;
            if (!data || "string" != typeof data) return null;
            try {
                tmp = new DOMParser, xml = tmp.parseFromString(data, "text/xml")
            } catch (e) {
                xml = void 0
            }
            return (!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data), xml
        };
        var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
            rts = /([?&])_=[^&]*/,
            rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent = /^(?:GET|HEAD)$/,
            rprotocol = /^\/\//,
            rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            prefilters = {},
            transports = {},
            allTypes = "*/".concat("*");
        try {
            ajaxLocation = location.href
        } catch (e) {
            ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
        }
        ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ajaxLocation,
                type: "GET",
                isLocal: rlocalProtocol.test(ajaxLocParts[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": jQuery.parseJSON,
                    "text xml": jQuery.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(target, settings) {
                return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            ajax: function(url, options) {
                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                    2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
                }
                "object" == typeof url && (options = url, url = void 0), options = options || {};
                var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options),
                    callbackContext = s.context || s,
                    globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                    deferred = jQuery.Deferred(),
                    completeDeferred = jQuery.Callbacks("once memory"),
                    statusCode = s.statusCode || {},
                    requestHeaders = {},
                    requestHeadersNames = {},
                    state = 0,
                    strAbort = "canceled",
                    jqXHR = {
                        readyState: 0,
                        getResponseHeader: function(key) {
                            var match;
                            if (2 === state) {
                                if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
                                match = responseHeaders[key.toLowerCase()]
                            }
                            return null == match ? null : match
                        },
                        getAllResponseHeaders: function() {
                            return 2 === state ? responseHeadersString : null
                        },
                        setRequestHeader: function(name, value) {
                            var lname = name.toLowerCase();
                            return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value), this
                        },
                        overrideMimeType: function(type) {
                            return state || (s.mimeType = type), this
                        },
                        statusCode: function(map) {
                            var code;
                            if (map) if (2 > state) for (code in map) statusCode[code] = [statusCode[code], map[code]];
                            else jqXHR.always(map[jqXHR.status]);
                            return this
                        },
                        abort: function(statusText) {
                            var finalText = statusText || strAbort;
                            return transport && transport.abort(finalText), done(0, finalText), this
                        }
                    };
                if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""], null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
                fireGlobals = s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
                if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
                strAbort = "abort";
                for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) jqXHR[i](s[i]);
                if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                    jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout")
                    }, s.timeout));
                    try {
                        state = 1, transport.send(requestHeaders, done)
                    } catch (e) {
                        if (!(2 > state)) throw e;
                        done(-1, e)
                    }
                } else done(-1, "No Transport");
                return jqXHR
            },
            getJSON: function(url, data, callback) {
                return jQuery.get(url, data, callback, "json")
            },
            getScript: function(url, callback) {
                return jQuery.get(url, void 0, callback, "script")
            }
        }), jQuery.each(["get", "post"], function(i, method) {
            jQuery[method] = function(url, data, callback, type) {
                return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), jQuery.ajax({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                })
            }
        }), jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
            jQuery.fn[type] = function(fn) {
                return this.on(type, fn)
            }
        }), jQuery._evalUrl = function(url) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }, jQuery.fn.extend({
            wrapAll: function(html) {
                var wrap;
                return jQuery.isFunction(html) ? this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstElementChild;) elem = elem.firstElementChild;
                    return elem
                }).append(this)), this)
            },
            wrapInner: function(html) {
                return jQuery.isFunction(html) ? this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i))
                }) : this.each(function() {
                    var self = jQuery(this),
                        contents = self.contents();
                    contents.length ? contents.wrapAll(html) : self.append(html)
                })
            },
            wrap: function(html) {
                var isFunction = jQuery.isFunction(html);
                return this.each(function(i) {
                    jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
                }).end()
            }
        }), jQuery.expr.filters.hidden = function(elem) {
            return elem.offsetWidth <= 0 && elem.offsetHeight <= 0
        }, jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem)
        };
        var r20 = /%20/g,
            rbracket = /\[\]$/,
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i;
        jQuery.param = function(a, traditional) {
            var prefix, s = [],
                add = function(key, value) {
                    value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
                };
            if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
                add(this.name, this.value)
            });
            else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
            return s.join("&").replace(r20, "+")
        }, jQuery.fn.extend({
            serialize: function() {
                return jQuery.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this
                }).filter(function() {
                    var type = this.type;
                    return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
                }).map(function(i, elem) {
                    var val = jQuery(this).val();
                    return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                        return {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        }
                    }) : {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }).get()
            }
        }), jQuery.ajaxSettings.xhr = function() {
            try {
                return new XMLHttpRequest
            } catch (e) {}
        };
        var xhrId = 0,
            xhrCallbacks = {},
            xhrSuccessStatus = {
                0: 200,
                1223: 204
            },
            xhrSupported = jQuery.ajaxSettings.xhr();
        window.ActiveXObject && jQuery(window).on("unload", function() {
            for (var key in xhrCallbacks) xhrCallbacks[key]()
        }), support.cors = !! xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !! xhrSupported, jQuery.ajaxTransport(function(options) {
            var callback;
            return support.cors || xhrSupported && !options.crossDomain ? {
                send: function(headers, complete) {
                    var i, xhr = options.xhr(),
                        id = ++xhrId;
                    if (xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                    options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    for (i in headers) xhr.setRequestHeader(i, headers[i]);
                    callback = function(type) {
                        return function() {
                            callback && (delete xhrCallbacks[id], callback = xhr.onload = xhr.onerror = null, "abort" === type ? xhr.abort() : "error" === type ? complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
                                text: xhr.responseText
                            } : void 0, xhr.getAllResponseHeaders()))
                        }
                    }, xhr.onload = callback(), xhr.onerror = callback("error"), callback = xhrCallbacks[id] = callback("abort");
                    try {
                        xhr.send(options.hasContent && options.data || null)
                    } catch (e) {
                        if (callback) throw e
                    }
                },
                abort: function() {
                    callback && callback()
                }
            } : void 0
        }), jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(text) {
                    return jQuery.globalEval(text), text
                }
            }
        }), jQuery.ajaxPrefilter("script", function(s) {
            void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET")
        }), jQuery.ajaxTransport("script", function(s) {
            if (s.crossDomain) {
                var script, callback;
                return {
                    send: function(_, complete) {
                        script = jQuery("<script>").prop({
                            async: !0,
                            charset: s.scriptCharset,
                            src: s.url
                        }).on("load error", callback = function(evt) {
                            script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type)
                        }), document.head.appendChild(script[0])
                    },
                    abort: function() {
                        callback && callback()
                    }
                }
            }
        });
        var oldCallbacks = [],
            rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
                return this[callback] = !0, callback
            }
        }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
            var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
            return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
                return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0]
            }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
                responseContainer = arguments
            }, jqXHR.always(function() {
                window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = void 0
            }), "script") : void 0
        }), jQuery.parseHTML = function(data, context, keepScripts) {
            if (!data || "string" != typeof data) return null;
            "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
            var parsed = rsingleTag.exec(data),
                scripts = !keepScripts && [];
            return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes))
        };
        var _load = jQuery.fn.load;
        jQuery.fn.load = function(url, params, callback) {
            if ("string" != typeof url && _load) return _load.apply(this, arguments);
            var selector, type, response, self = this,
                off = url.indexOf(" ");
            return off >= 0 && (selector = jQuery.trim(url.slice(off)), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), self.length > 0 && jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
            }).complete(callback &&
                function(jqXHR, status) {
                    self.each(callback, response || [jqXHR.responseText, status, jqXHR])
                }), this
        }, jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem
            }).length
        };
        var docElem = window.document.documentElement;
        jQuery.offset = {
            setOffset: function(elem, options, i) {
                var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
                    curElem = jQuery(elem),
                    props = {};
                "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props)
            }
        }, jQuery.fn.extend({
            offset: function(options) {
                if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i)
                });
                var docElem, win, elem = this[0],
                    box = {
                        top: 0,
                        left: 0
                    },
                    doc = elem && elem.ownerDocument;
                if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), win = getWindow(doc), {
                    top: box.top + win.pageYOffset - docElem.clientTop,
                    left: box.left + win.pageXOffset - docElem.clientLeft
                }) : box
            },
            position: function() {
                if (this[0]) {
                    var offsetParent, offset, elem = this[0],
                        parentOffset = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), {
                        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent;
                    return offsetParent || docElem
                })
            }
        }), jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(method, prop) {
            var top = "pageYOffset" === prop;
            jQuery.fn[method] = function(val) {
                return access(this, function(elem, method, val) {
                    var win = getWindow(elem);
                    return void 0 === val ? win ? win[prop] : elem[method] : void(win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : elem[method] = val)
                }, method, val, arguments.length, null)
            }
        }), jQuery.each(["top", "left"], function(i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
                return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0
            })
        }), jQuery.each({
            Height: "height",
            Width: "width"
        }, function(name, type) {
            jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function(defaultExtra, funcName) {
                jQuery.fn[funcName] = function(margin, value) {
                    var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
                        extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                    return access(this, function(elem, type, value) {
                        var doc;
                        return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                    }, type, chainable ? margin : void 0, chainable, null)
                }
            })
        }), jQuery.fn.size = function() {
            return this.length
        }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return jQuery
        });
        var _jQuery = window.jQuery,
            _$ = window.$;
        return jQuery.noConflict = function(deep) {
            return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
        }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery
    }), function(f) {
    jQuery.fn.extend({
        slimScroll: function(g) {
            var a = f.extend({
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: .4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: .2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            }, g);
            return this.each(function() {
                function s(d) {
                    d = d || window.event;
                    var c = 0;
                    d.wheelDelta && (c = -d.wheelDelta / 120), d.detail && (c = d.detail / 3), f(d.target || d.srcTarget || d.srcElement).closest("." + a.wrapperClass).is(b.parent()) && m(c, !0), d.preventDefault && !k && d.preventDefault(), k || (d.returnValue = !1)
                }
                function m(d, f, g) {
                    k = !1;
                    var e = d,
                        h = b.outerHeight() - c.outerHeight();
                    f && (e = parseInt(c.css("top")) + d * parseInt(a.wheelStep) / 100 * c.outerHeight(), e = Math.min(Math.max(e, 0), h), e = d > 0 ? Math.ceil(e) : Math.floor(e), c.css({
                        top: e + "px"
                    })), l = parseInt(c.css("top")) / (b.outerHeight() - c.outerHeight()), e = l * (b[0].scrollHeight - b.outerHeight()), g && (e = d, d = e / b[0].scrollHeight * b.outerHeight(), d = Math.min(Math.max(d, 0), h), c.css({
                        top: d + "px"
                    })), b.scrollTop(e), b.trigger("slimscrolling", ~~e), u(), p()
                }
                function C() {
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", s, !1), this.addEventListener("mousewheel", s, !1)) : document.attachEvent("onmousewheel", s)
                }
                function v() {
                    r = Math.max(b.outerHeight() / b[0].scrollHeight * b.outerHeight(), D), c.css({
                        height: r + "px"
                    });
                    var a = r == b.outerHeight() ? "none" : "block";
                    c.css({
                        display: a
                    })
                }
                function u() {
                    v(), clearTimeout(A), l == ~~l ? (k = a.allowPageScroll, B != l && b.trigger("slimscroll", 0 == ~~l ? "top" : "bottom")) : k = !1, B = l, r >= b.outerHeight() ? k = !0 : (c.stop(!0, !0).fadeIn("fast"), a.railVisible && h.stop(!0, !0).fadeIn("fast"))
                }
                function p() {
                    a.alwaysVisible || (A = setTimeout(function() {
                        a.disableFadeOut && w || x || y || (c.fadeOut("slow"), h.fadeOut("slow"))
                    }, 1e3))
                }
                var w, x, y, A, z, r, l, B, D = 30,
                    k = !1,
                    b = f(this);
                if (b.parent().hasClass(a.wrapperClass)) {
                    var n = b.scrollTop(),
                        c = b.parent().find("." + a.barClass),
                        h = b.parent().find("." + a.railClass);
                    if (v(), f.isPlainObject(g)) {
                        if ("height" in g && "auto" == g.height) {
                            b.parent().css("height", "auto"), b.css("height", "auto");
                            var q = b.parent().parent().height();
                            b.parent().css("height", q), b.css("height", q)
                        }
                        if ("scrollTo" in g) n = parseInt(a.scrollTo);
                        else if ("scrollBy" in g) n += parseInt(a.scrollBy);
                        else if ("destroy" in g) return c.remove(), h.remove(), void b.unwrap();
                        m(n, !1, !0)
                    }
                } else {
                    a.height = "auto" == g.height ? b.parent().height() : g.height, n = f("<div></div>").addClass(a.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: a.width,
                        height: a.height
                    }), b.css({
                        overflow: "hidden",
                        width: a.width,
                        height: a.height
                    });
                    var h = f("<div></div>").addClass(a.railClass).css({
                            width: a.size,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            display: a.alwaysVisible && a.railVisible ? "block" : "none",
                            "border-radius": a.railBorderRadius,
                            background: a.railColor,
                            opacity: a.railOpacity,
                            zIndex: 90
                        }),
                        c = f("<div></div>").addClass(a.barClass).css({
                            background: a.color,
                            width: a.size,
                            position: "absolute",
                            top: 0,
                            opacity: a.opacity,
                            display: a.alwaysVisible ? "block" : "none",
                            "border-radius": a.borderRadius,
                            BorderRadius: a.borderRadius,
                            MozBorderRadius: a.borderRadius,
                            WebkitBorderRadius: a.borderRadius,
                            zIndex: 99
                        }),
                        q = "right" == a.position ? {
                            right: a.distance
                        } : {
                            left: a.distance
                        };
                    h.css(q), c.css(q), b.wrap(n), b.parent().append(c), b.parent().append(h), a.railDraggable && c.bind("mousedown", function(a) {
                        var b = f(document);
                        return y = !0, t = parseFloat(c.css("top")), pageY = a.pageY, b.bind("mousemove.slimscroll", function(a) {
                            currTop = t + a.pageY - pageY, c.css("top", currTop), m(0, c.position().top, !1)
                        }), b.bind("mouseup.slimscroll", function(a) {
                            y = !1, p(), b.unbind(".slimscroll")
                        }), !1
                    }).bind("selectstart.slimscroll", function(a) {
                        return a.stopPropagation(), a.preventDefault(), !1
                    }), h.hover(function() {
                        u()
                    }, function() {
                        p()
                    }), c.hover(function() {
                        x = !0
                    }, function() {
                        x = !1
                    }), b.hover(function() {
                        w = !0, u(), p()
                    }, function() {
                        w = !1, p()
                    }), b.bind("touchstart", function(a, b) {
                        a.originalEvent.touches.length && (z = a.originalEvent.touches[0].pageY)
                    }), b.bind("touchmove", function(b) {
                        k || b.originalEvent.preventDefault(), b.originalEvent.touches.length && (m((z - b.originalEvent.touches[0].pageY) / a.touchScrollStep, !0), z = b.originalEvent.touches[0].pageY)
                    }), v(), "bottom" === a.start ? (c.css({
                        top: b.outerHeight() - c.outerHeight()
                    }), m(0, !0)) : "top" !== a.start && (m(f(a.start).position().top, null, !0), a.alwaysVisible || c.hide()), C()
                }
            }), this
        }
    }), jQuery.fn.extend({
        slimscroll: jQuery.fn.slimScroll
    })
}(jQuery), function($, window, document, Math, undefined) {
    "use strict";
    var WRAPPER = "fullpage-wrapper",
        WRAPPER_SEL = "." + WRAPPER,
        SCROLLABLE = "fp-scrollable",
        SCROLLABLE_SEL = "." + SCROLLABLE,
        SLIMSCROLL_BAR_SEL = ".slimScrollBar",
        SLIMSCROLL_RAIL_SEL = ".slimScrollRail",
        RESPONSIVE = "fp-responsive",
        NO_TRANSITION = "fp-notransition",
        DESTROYED = "fp-destroyed",
        ENABLED = "fp-enabled",
        VIEWING_PREFIX = "fp-viewing",
        ACTIVE = "active",
        ACTIVE_SEL = "." + ACTIVE,
        SECTION_DEFAULT_SEL = ".section",
        SECTION = "fp-section",
        SECTION_SEL = "." + SECTION,
        SECTION_ACTIVE_SEL = SECTION_SEL + ACTIVE_SEL,
        SECTION_FIRST_SEL = SECTION_SEL + ":first",
        SECTION_LAST_SEL = SECTION_SEL + ":last",
        TABLE_CELL = "fp-tableCell",
        TABLE_CELL_SEL = "." + TABLE_CELL,
        SECTION_NAV = "fp-nav",
        SECTION_NAV_SEL = "#" + SECTION_NAV,
        SECTION_NAV_TOOLTIP = "fp-tooltip",
        SHOW_ACTIVE_TOOLTIP = "fp-show-active",
        SLIDE_DEFAULT_SEL = ".slide",
        SLIDE = "fp-slide",
        SLIDE_SEL = "." + SLIDE,
        SLIDE_ACTIVE_SEL = SLIDE_SEL + ACTIVE_SEL,
        SLIDES_WRAPPER = "fp-slides",
        SLIDES_WRAPPER_SEL = "." + SLIDES_WRAPPER,
        SLIDES_CONTAINER = "fp-slidesContainer",
        SLIDES_CONTAINER_SEL = "." + SLIDES_CONTAINER,
        TABLE = "fp-table",
        SLIDES_NAV = "fp-slidesNav",
        SLIDES_NAV_SEL = "." + SLIDES_NAV,
        SLIDES_NAV_LINK_SEL = SLIDES_NAV_SEL + " a",
        SLIDES_ARROW = "fp-controlArrow",
        SLIDES_ARROW_SEL = "." + SLIDES_ARROW,
        SLIDES_PREV = "fp-prev",
        SLIDES_PREV_SEL = "." + SLIDES_PREV,
        SLIDES_ARROW_PREV = SLIDES_ARROW + " " + SLIDES_PREV,
        SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL,
        SLIDES_NEXT = "fp-next",
        SLIDES_NEXT_SEL = "." + SLIDES_NEXT,
        SLIDES_ARROW_NEXT = SLIDES_ARROW + " " + SLIDES_NEXT,
        SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL,
        $window = $(window),
        $document = $(document);
    $.fn.fullpage = function(options) {
        function createSlideArrows(section) {
            section.find(SLIDES_WRAPPER_SEL).after('<div class="' + SLIDES_ARROW_PREV + '"></div><div class="' + SLIDES_ARROW_NEXT + '"></div>'), "#fff" != options.controlArrowColor && (section.find(SLIDES_ARROW_NEXT_SEL).css("border-color", "transparent transparent transparent " + options.controlArrowColor), section.find(SLIDES_ARROW_PREV_SEL).css("border-color", "transparent " + options.controlArrowColor + " transparent transparent")), options.loopHorizontal || section.find(SLIDES_ARROW_PREV_SEL).hide()
        }
        function addVerticalNavigation() {
            $body.append('<div id="' + SECTION_NAV + '"><ul></ul></div>'), nav = $(SECTION_NAV_SEL), nav.addClass(function() {
                return options.showActiveTooltip ? SHOW_ACTIVE_TOOLTIP + " " + options.navigationPosition : options.navigationPosition
            });
            for (var i = 0; i < $(SECTION_SEL).length; i++) {
                var link = "";
                options.anchors.length && (link = options.anchors[i]);
                var li = '<li><a href="#' + link + '"><span></span></a>',
                    tooltip = options.navigationTooltips[i];
                "undefined" != typeof tooltip && "" !== tooltip && (li += '<div class="' + SECTION_NAV_TOOLTIP + " " + options.navigationPosition + '">' + tooltip + "</div>"), li += "</li>", nav.find("ul").append(li)
            }
        }
        function createSlimScrollingHandler() {
            $(SECTION_SEL).each(function() {
                var slides = $(this).find(SLIDE_SEL);
                slides.length ? slides.each(function() {
                    createSlimScrolling($(this))
                }) : createSlimScrolling($(this))
            }), $.isFunction(options.afterRender) && options.afterRender.call(this)
        }
        function scrollHandler() {
            var currentSection;
            if (!options.autoScrolling || options.scrollBar) {
                for (var currentScroll = $window.scrollTop(), visibleSectionIndex = 0, initial = Math.abs(currentScroll - document.querySelectorAll(SECTION_SEL)[0].offsetTop), sections = document.querySelectorAll(SECTION_SEL), i = 0; i < sections.length; ++i) {
                    var section = sections[i],
                        current = Math.abs(currentScroll - section.offsetTop);
                    initial > current && (visibleSectionIndex = i, initial = current)
                }
                currentSection = $(sections).eq(visibleSectionIndex)
            }
            if (!options.autoScrolling || options.scrollBar) {
                if (!currentSection.hasClass(ACTIVE)) {
                    isScrolling = !0;
                    var leavingSection = $(SECTION_ACTIVE_SEL),
                        leavingSectionIndex = leavingSection.index(SECTION_SEL) + 1,
                        yMovement = getYmovement(currentSection),
                        anchorLink = currentSection.data("anchor"),
                        sectionIndex = currentSection.index(SECTION_SEL) + 1,
                        activeSlide = currentSection.find(SLIDE_ACTIVE_SEL);
                    if (activeSlide.length) var slideAnchorLink = activeSlide.data("anchor"),
                        slideIndex = activeSlide.index();
                    canScroll && (currentSection.addClass(ACTIVE).siblings().removeClass(ACTIVE), $.isFunction(options.onLeave) && options.onLeave.call(leavingSection, leavingSectionIndex, sectionIndex, yMovement), $.isFunction(options.afterLoad) && options.afterLoad.call(currentSection, anchorLink, sectionIndex), activateMenuAndNav(anchorLink, sectionIndex - 1), options.anchors.length && (lastScrolledDestiny = anchorLink, setState(slideIndex, slideAnchorLink, anchorLink, sectionIndex))), clearTimeout(scrollId), scrollId = setTimeout(function() {
                        isScrolling = !1
                    }, 100)
                }
                options.fitToSection && (clearTimeout(scrollId2), scrollId2 = setTimeout(function() {
                    canScroll && ($(SECTION_ACTIVE_SEL).is(currentSection) && (isResizing = !0), scrollPage(currentSection), isResizing = !1)
                }, 1e3))
            }
        }
        function isScrollable(activeSection) {
            return activeSection.find(SLIDES_WRAPPER_SEL).length ? activeSection.find(SLIDE_ACTIVE_SEL).find(SCROLLABLE_SEL) : activeSection.find(SCROLLABLE_SEL)
        }
        function scrolling(type, scrollable) {
            if (isScrollAllowed[type]) {
                var check, scrollSection;
                if ("down" == type ? (check = "bottom", scrollSection = FP.moveSectionDown) : (check = "top", scrollSection = FP.moveSectionUp), scrollable.length > 0) {
                    if (!isScrolled(check, scrollable)) return !0;
                    scrollSection()
                } else scrollSection()
            }
        }
        function touchMoveHandler(event) {
            var e = event.originalEvent;
            if (!checkParentForNormalScrollElement(event.target) && isReallyTouch(e)) {
                options.autoScrolling && event.preventDefault();
                var activeSection = $(SECTION_ACTIVE_SEL),
                    scrollable = isScrollable(activeSection);
                if (canScroll && !slideMoving) {
                    var touchEvents = getEventsPage(e);
                    touchEndY = touchEvents.y, touchEndX = touchEvents.x, activeSection.find(SLIDES_WRAPPER_SEL).length && Math.abs(touchStartX - touchEndX) > Math.abs(touchStartY - touchEndY) ? Math.abs(touchStartX - touchEndX) > $window.width() / 100 * options.touchSensitivity && (touchStartX > touchEndX ? isScrollAllowed.right && FP.moveSlideRight() : isScrollAllowed.left && FP.moveSlideLeft()) : options.autoScrolling && Math.abs(touchStartY - touchEndY) > $window.height() / 100 * options.touchSensitivity && (touchStartY > touchEndY ? scrolling("down", scrollable) : touchEndY > touchStartY && scrolling("up", scrollable))
                }
            }
        }
        function checkParentForNormalScrollElement(el, hop) {
            hop = hop || 0;
            var parent = $(el).parent();
            return hop < options.normalScrollElementTouchThreshold && parent.is(options.normalScrollElements) ? !0 : hop == options.normalScrollElementTouchThreshold ? !1 : checkParentForNormalScrollElement(parent, ++hop)
        }
        function isReallyTouch(e) {
            return "undefined" == typeof e.pointerType || "mouse" != e.pointerType
        }
        function touchStartHandler(event) {
            var e = event.originalEvent;
            if (options.fitToSection && $htmlBody.stop(), isReallyTouch(e)) {
                var touchEvents = getEventsPage(e);
                touchStartY = touchEvents.y, touchStartX = touchEvents.x
            }
        }
        function getAverage(elements, number) {
            for (var sum = 0, lastElements = elements.slice(Math.max(elements.length - number, 1)), i = 0; i < lastElements.length; i++) sum += lastElements[i];
            return Math.ceil(sum / number)
        }
        function MouseWheelHandler(e) {
            var curTime = (new Date).getTime();
            if (options.autoScrolling) {
                e = window.event || e;
                var value = e.wheelDelta || -e.deltaY || -e.detail,
                    delta = Math.max(-1, Math.min(1, value));
                scrollings.length > 149 && scrollings.shift(), scrollings.push(Math.abs(value)), options.scrollBar && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
                var activeSection = $(SECTION_ACTIVE_SEL),
                    scrollable = isScrollable(activeSection),
                    timeDiff = curTime - prevTime;
                if (prevTime = curTime, timeDiff > 200 && (scrollings = []), canScroll) {
                    var averageEnd = getAverage(scrollings, 10),
                        averageMiddle = getAverage(scrollings, 70),
                        isAccelerating = averageEnd >= averageMiddle;
                    isAccelerating && (0 > delta ? scrolling("down", scrollable) : scrolling("up", scrollable))
                }
                return !1
            }
            options.fitToSection && $htmlBody.stop()
        }
        function moveSlide(direction) {
            var activeSection = $(SECTION_ACTIVE_SEL),
                slides = activeSection.find(SLIDES_WRAPPER_SEL);
            if (slides.length && !slideMoving) {
                var currentSlide = slides.find(SLIDE_ACTIVE_SEL),
                    destiny = null;
                if (destiny = "prev" === direction ? currentSlide.prev(SLIDE_SEL) : currentSlide.next(SLIDE_SEL), !destiny.length) {
                    if (!options.loopHorizontal) return;
                    destiny = "prev" === direction ? currentSlide.siblings(":last") : currentSlide.siblings(":first")
                }
                slideMoving = !0, landscapeScroll(slides, destiny)
            }
        }
        function keepSlidesPosition() {
            $(SLIDE_ACTIVE_SEL).each(function() {
                silentLandscapeScroll($(this))
            })
        }
        function scrollPage(element, callback, isMovementUp) {
            var dest = element.position();
            if ("undefined" != typeof dest) {
                var v = {
                    element: element,
                    callback: callback,
                    isMovementUp: isMovementUp,
                    dest: dest,
                    dtop: dest.top,
                    yMovement: getYmovement(element),
                    anchorLink: element.data("anchor"),
                    sectionIndex: element.index(SECTION_SEL),
                    activeSlide: element.find(SLIDE_ACTIVE_SEL),
                    activeSection: $(SECTION_ACTIVE_SEL),
                    leavingSection: $(SECTION_ACTIVE_SEL).index(SECTION_SEL) + 1,
                    localIsResizing: isResizing
                };
                if (!(v.activeSection.is(element) && !isResizing || options.scrollBar && $window.scrollTop() === v.dtop)) {
                    if (v.activeSlide.length) var slideAnchorLink = v.activeSlide.data("anchor"),
                        slideIndex = v.activeSlide.index();
                    options.autoScrolling && options.continuousVertical && "undefined" != typeof v.isMovementUp && (!v.isMovementUp && "up" == v.yMovement || v.isMovementUp && "down" == v.yMovement) && (v = createInfiniteSections(v)), element.addClass(ACTIVE).siblings().removeClass(ACTIVE), canScroll = !1, setState(slideIndex, slideAnchorLink, v.anchorLink, v.sectionIndex), $.isFunction(options.onLeave) && !v.localIsResizing && options.onLeave.call(v.activeSection, v.leavingSection, v.sectionIndex + 1, v.yMovement), performMovement(v), lastScrolledDestiny = v.anchorLink, activateMenuAndNav(v.anchorLink, v.sectionIndex)
                }
            }
        }
        function performMovement(v) {
            if (options.css3 && options.autoScrolling && !options.scrollBar) {
                var translate3d = "translate3d(0px, -" + v.dtop + "px, 0px)";
                transformContainer(translate3d, !0), setTimeout(function() {
                    afterSectionLoads(v)
                }, options.scrollingSpeed)
            } else {
                var scrollSettings = getScrollSettings(v);
                $(scrollSettings.element).animate(scrollSettings.options, options.scrollingSpeed, options.easing).promise().done(function() {
                    afterSectionLoads(v)
                })
            }
        }
        function getScrollSettings(v) {
            var scroll = {};
            return options.autoScrolling && !options.scrollBar ? (scroll.options = {
                top: -v.dtop
            }, scroll.element = WRAPPER_SEL) : (scroll.options = {
                scrollTop: v.dtop
            }, scroll.element = "html, body"), scroll
        }
        function createInfiniteSections(v) {
            return v.isMovementUp ? $(SECTION_ACTIVE_SEL).before(v.activeSection.nextAll(SECTION_SEL)) : $(SECTION_ACTIVE_SEL).after(v.activeSection.prevAll(SECTION_SEL).get().reverse()), silentScroll($(SECTION_ACTIVE_SEL).position().top), keepSlidesPosition(), v.wrapAroundElements = v.activeSection, v.dest = v.element.position(), v.dtop = v.dest.top, v.yMovement = getYmovement(v.element), v
        }
        function continuousVerticalFixSectionOrder(v) {
            v.wrapAroundElements && v.wrapAroundElements.length && (v.isMovementUp ? $(SECTION_FIRST_SEL).before(v.wrapAroundElements) : $(SECTION_LAST_SEL).after(v.wrapAroundElements), silentScroll($(SECTION_ACTIVE_SEL).position().top), keepSlidesPosition())
        }
        function afterSectionLoads(v) {
            continuousVerticalFixSectionOrder(v), $.isFunction(options.afterLoad) && !v.localIsResizing && options.afterLoad.call(v.element, v.anchorLink, v.sectionIndex + 1), canScroll = !0, setTimeout(function() {
                $.isFunction(v.callback) && v.callback.call(this)
            }, 600)
        }
        function scrollToAnchor() {
            var value = window.location.hash.replace("#", "").split("/"),
                section = value[0],
                slide = value[1];
            section && scrollPageAndSlide(section, slide)
        }
        function hashChangeHandler() {
            if (!isScrolling) {
                var value = window.location.hash.replace("#", "").split("/"),
                    section = value[0],
                    slide = value[1];
                if (section.length) {
                    var isFirstSlideMove = "undefined" == typeof lastScrolledDestiny,
                        isFirstScrollMove = "undefined" == typeof lastScrolledDestiny && "undefined" == typeof slide && !slideMoving;
                    (section && section !== lastScrolledDestiny && !isFirstSlideMove || isFirstScrollMove || !slideMoving && lastScrolledSlide != slide) && scrollPageAndSlide(section, slide)
                }
            }
        }
        function keydownHandler(e) {
            clearTimeout(keydownId);
            var activeElement = $(document.activeElement);
            if (!activeElement.is("textarea") && !activeElement.is("input") && !activeElement.is("select") && options.keyboardScrolling && options.autoScrolling) {
                var keyCode = e.which,
                    keyControls = [40, 38, 32, 33, 34];
                $.inArray(keyCode, keyControls) > -1 && e.preventDefault(), keydownId = setTimeout(function() {
                    onkeydown(e)
                }, 150)
            }
        }
        function onkeydown(e) {
            var shiftPressed = e.shiftKey;
            switch (e.which) {
                case 38:
                case 33:
                    FP.moveSectionUp();
                    break;
                case 32:
                    if (shiftPressed) {
                        FP.moveSectionUp();
                        break
                    }
                case 40:
                case 34:
                    FP.moveSectionDown();
                    break;
                case 36:
                    FP.moveTo(1);
                    break;
                case 35:
                    FP.moveTo($(SECTION_SEL).length);
                    break;
                case 37:
                    FP.moveSlideLeft();
                    break;
                case 39:
                    FP.moveSlideRight();
                    break;
                default:
                    return
            }
        }
        function mouseMoveHandler(e) {
            canScroll && (e.pageY < oldPageY ? FP.moveSectionUp() : e.pageY > oldPageY && FP.moveSectionDown()), oldPageY = e.pageY
        }
        function landscapeScroll(slides, destiny) {
            var destinyPos = destiny.position(),
                slideIndex = destiny.index(),
                section = slides.closest(SECTION_SEL),
                sectionIndex = section.index(SECTION_SEL),
                anchorLink = section.data("anchor"),
                slidesNav = section.find(SLIDES_NAV_SEL),
                slideAnchor = getSlideAnchor(destiny),
                localIsResizing = isResizing;
            if (options.onSlideLeave) {
                var prevSlide = section.find(SLIDE_ACTIVE_SEL),
                    prevSlideIndex = prevSlide.index(),
                    xMovement = getXmovement(prevSlideIndex, slideIndex);
                localIsResizing || "none" === xMovement || $.isFunction(options.onSlideLeave) && options.onSlideLeave.call(prevSlide, anchorLink, sectionIndex + 1, prevSlideIndex, xMovement)
            }
            destiny.addClass(ACTIVE).siblings().removeClass(ACTIVE), !options.loopHorizontal && options.controlArrows && (section.find(SLIDES_ARROW_PREV_SEL).toggle(0 !== slideIndex), section.find(SLIDES_ARROW_NEXT_SEL).toggle(!destiny.is(":last-child"))), section.hasClass(ACTIVE) && setState(slideIndex, slideAnchor, anchorLink, sectionIndex);
            var afterSlideLoads = function() {
                localIsResizing || $.isFunction(options.afterSlideLoad) && options.afterSlideLoad.call(destiny, anchorLink, sectionIndex + 1, slideAnchor, slideIndex), slideMoving = !1
            };
            if (options.css3) {
                var translate3d = "translate3d(-" + destinyPos.left + "px, 0px, 0px)";
                addAnimation(slides.find(SLIDES_CONTAINER_SEL), options.scrollingSpeed > 0).css(getTransforms(translate3d)), setTimeout(function() {
                    afterSlideLoads()
                }, options.scrollingSpeed, options.easing)
            } else slides.animate({
                scrollLeft: destinyPos.left
            }, options.scrollingSpeed, options.easing, function() {
                afterSlideLoads()
            });
            slidesNav.find(ACTIVE_SEL).removeClass(ACTIVE), slidesNav.find("li").eq(slideIndex).find("a").addClass(ACTIVE)
        }
        function resizeHandler() {
            if (responsive(), isTouchDevice) {
                var activeElement = $(document.activeElement);
                if (!activeElement.is("textarea") && !activeElement.is("input") && !activeElement.is("select")) {
                    var currentHeight = $window.height();
                    Math.abs(currentHeight - previousHeight) > 20 * Math.max(previousHeight, currentHeight) / 100 && (FP.reBuild(!0), previousHeight = currentHeight)
                }
            } else clearTimeout(resizeId), resizeId = setTimeout(function() {
                FP.reBuild(!0)
            }, 500)
        }
        function responsive() {
            if (options.responsive) {
                var isResponsive = container.hasClass(RESPONSIVE);
                $window.width() < options.responsive ? isResponsive || (FP.setAutoScrolling(!1, "internal"), FP.setFitToSection(!1, "internal"), $(SECTION_NAV_SEL).hide(), container.addClass(RESPONSIVE)) : isResponsive && (FP.setAutoScrolling(originals.autoScrolling, "internal"), FP.setFitToSection(originals.autoScrolling, "internal"), $(SECTION_NAV_SEL).show(), container.removeClass(RESPONSIVE))
            }
        }
        function addAnimation(element) {
            var transition = "all " + options.scrollingSpeed + "ms " + options.easingcss3;
            return element.removeClass(NO_TRANSITION), element.css({
                "-webkit-transition": transition,
                transition: transition
            })
        }
        function removeAnimation(element) {
            return element.addClass(NO_TRANSITION)
        }
        function resizeMe(displayHeight, displayWidth) {
            var preferredHeight = 825,
                preferredWidth = 900;
            if (preferredHeight > displayHeight || preferredWidth > displayWidth) {
                var heightPercentage = 100 * displayHeight / preferredHeight,
                    widthPercentage = 100 * displayWidth / preferredWidth,
                    percentage = Math.min(heightPercentage, widthPercentage),
                    newFontSize = percentage.toFixed(2);
                $body.css("font-size", newFontSize + "%")
            } else $body.css("font-size", "100%")
        }
        function activateNavDots(name, sectionIndex) {
            options.navigation && ($(SECTION_NAV_SEL).find(ACTIVE_SEL).removeClass(ACTIVE), name ? $(SECTION_NAV_SEL).find('a[href="#' + name + '"]').addClass(ACTIVE) : $(SECTION_NAV_SEL).find("li").eq(sectionIndex).find("a").addClass(ACTIVE))
        }
        function activateMenuElement(name) {
            options.menu && ($(options.menu).find(ACTIVE_SEL).removeClass(ACTIVE), $(options.menu).find('[data-menuanchor="' + name + '"]').addClass(ACTIVE))
        }
        function activateMenuAndNav(anchor, index) {
            activateMenuElement(anchor), activateNavDots(anchor, index)
        }
        function isScrolled(type, scrollable) {
            return "top" === type ? !scrollable.scrollTop() : "bottom" === type ? scrollable.scrollTop() + 1 + scrollable.innerHeight() >= scrollable[0].scrollHeight : void 0
        }
        function getYmovement(destiny) {
            var fromIndex = $(SECTION_ACTIVE_SEL).index(SECTION_SEL),
                toIndex = destiny.index(SECTION_SEL);
            return fromIndex == toIndex ? "none" : fromIndex > toIndex ? "up" : "down"
        }
        function getXmovement(fromIndex, toIndex) {
            return fromIndex == toIndex ? "none" : fromIndex > toIndex ? "left" : "right"
        }
        function createSlimScrolling(element) {
            element.css("overflow", "hidden");
            var contentHeight, section = element.closest(SECTION_SEL),
                scrollable = element.find(SCROLLABLE_SEL);
            scrollable.length ? contentHeight = scrollable.get(0).scrollHeight : (contentHeight = element.get(0).scrollHeight, options.verticalCentered && (contentHeight = element.find(TABLE_CELL_SEL).get(0).scrollHeight));
            var scrollHeight = windowsHeight - parseInt(section.css("padding-bottom")) - parseInt(section.css("padding-top"));
            contentHeight > scrollHeight ? scrollable.length ? scrollable.css("height", scrollHeight + "px").parent().css("height", scrollHeight + "px") : (options.verticalCentered ? element.find(TABLE_CELL_SEL).wrapInner('<div class="' + SCROLLABLE + '" />') : element.wrapInner('<div class="' + SCROLLABLE + '" />'), element.find(SCROLLABLE_SEL).slimScroll({
                allowPageScroll: !0,
                height: scrollHeight + "px",
                size: "10px",
                alwaysVisible: !0
            })) : removeSlimScroll(element), element.css("overflow", "")
        }
        function removeSlimScroll(element) {
            element.find(SCROLLABLE_SEL).children().first().unwrap().unwrap(), element.find(SLIMSCROLL_BAR_SEL).remove(), element.find(SLIMSCROLL_RAIL_SEL).remove()
        }
        function addTableClass(element) {
            element.addClass(TABLE).wrapInner('<div class="' + TABLE_CELL + '" style="height:' + getTableHeight(element) + 'px;" />')
        }
        function getTableHeight(element) {
            var sectionHeight = windowsHeight;
            if (options.paddingTop || options.paddingBottom) {
                var section = element;
                section.hasClass(SECTION) || (section = element.closest(SECTION_SEL));
                var paddings = parseInt(section.css("padding-top")) + parseInt(section.css("padding-bottom"));
                sectionHeight = windowsHeight - paddings
            }
            return sectionHeight
        }
        function transformContainer(translate3d, animated) {
            animated ? addAnimation(container) : removeAnimation(container), container.css(getTransforms(translate3d)), setTimeout(function() {
                container.removeClass(NO_TRANSITION)
            }, 10)
        }
        function scrollPageAndSlide(destiny, slide) {
            var section;
            "undefined" == typeof slide && (slide = 0), section = isNaN(destiny) ? $('[data-anchor="' + destiny + '"]') : $(SECTION_SEL).eq(destiny - 1), destiny === lastScrolledDestiny || section.hasClass(ACTIVE) ? scrollSlider(section, slide) : scrollPage(section, function() {
                scrollSlider(section, slide)
            })
        }
        function scrollSlider(section, slide) {
            if ("undefined" != typeof slide) {
                var slides = section.find(SLIDES_WRAPPER_SEL),
                    destiny = slides.find('[data-anchor="' + slide + '"]');
                destiny.length || (destiny = slides.find(SLIDE_SEL).eq(slide)), destiny.length && landscapeScroll(slides, destiny)
            }
        }
        function addSlidesNavigation(section, numSlides) {
            section.append('<div class="' + SLIDES_NAV + '"><ul></ul></div>');
            var nav = section.find(SLIDES_NAV_SEL);
            nav.addClass(options.slidesNavPosition);
            for (var i = 0; numSlides > i; i++) nav.find("ul").append('<li><a href="#"><span></span></a></li>');
            nav.css("margin-left", "-" + nav.width() / 2 + "px"), nav.find("li").first().find("a").addClass(ACTIVE)
        }
        function setState(slideIndex, slideAnchor, anchorLink, sectionIndex) {
            var sectionHash = "";
            options.anchors.length && (slideIndex ? ("undefined" != typeof anchorLink && (sectionHash = anchorLink), "undefined" == typeof slideAnchor && (slideAnchor = slideIndex), lastScrolledSlide = slideAnchor, setUrlHash(sectionHash + "/" + slideAnchor)) : "undefined" != typeof slideIndex ? (lastScrolledSlide = slideAnchor, setUrlHash(anchorLink)) : setUrlHash(anchorLink)), setBodyClass()
        }
        function setUrlHash(url) {
            if (options.recordHistory) location.hash = url;
            else if (isTouchDevice || isTouch) history.replaceState(undefined, undefined, "#" + url);
            else {
                var baseUrl = window.location.href.split("#")[0];
                window.location.replace(baseUrl + "#" + url)
            }
        }
        function getSlideAnchor(slide) {
            var slideAnchor = slide.data("anchor"),
                slideIndex = slide.index();
            return "undefined" == typeof slideAnchor && (slideAnchor = slideIndex), slideAnchor
        }
        function setBodyClass() {
            var section = $(SECTION_ACTIVE_SEL),
                slide = section.find(SLIDE_ACTIVE_SEL),
                sectionAnchor = section.data("anchor"),
                slideAnchor = getSlideAnchor(slide),
                sectionIndex = section.index(SECTION_SEL),
                text = String(sectionIndex);
            options.anchors.length && (text = sectionAnchor), slide.length && (text = text + "-" + slideAnchor), text = text.replace("/", "-").replace("#", "");
            var classRe = new RegExp("\\b\\s?" + VIEWING_PREFIX + "-[^\\s]+\\b", "g");
            $body[0].className = $body[0].className.replace(classRe, ""), $body.addClass(VIEWING_PREFIX + "-" + text)
        }
        function support3d() {
            var has3d, el = document.createElement("p"),
                transforms = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            document.body.insertBefore(el, null);
            for (var t in transforms) el.style[t] !== undefined && (el.style[t] = "translate3d(1px,1px,1px)", has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]));
            return document.body.removeChild(el), has3d !== undefined && has3d.length > 0 && "none" !== has3d
        }
        function removeMouseWheelHandler() {
            document.addEventListener ? (document.removeEventListener("mousewheel", MouseWheelHandler, !1), document.removeEventListener("wheel", MouseWheelHandler, !1)) : document.detachEvent("onmousewheel", MouseWheelHandler)
        }
        function addMouseWheelHandler() {
            document.addEventListener ? (document.addEventListener("mousewheel", MouseWheelHandler, !1), document.addEventListener("wheel", MouseWheelHandler, !1)) : document.attachEvent("onmousewheel", MouseWheelHandler)
        }
        function addTouchHandler() {
            if (isTouchDevice || isTouch) {
                var MSPointer = getMSPointer();
                $(WRAPPER_SEL).off("touchstart " + MSPointer.down).on("touchstart " + MSPointer.down, touchStartHandler), $(WRAPPER_SEL).off("touchmove " + MSPointer.move).on("touchmove " + MSPointer.move, touchMoveHandler)
            }
        }
        function removeTouchHandler() {
            if (isTouchDevice || isTouch) {
                var MSPointer = getMSPointer();
                $(WRAPPER_SEL).off("touchstart " + MSPointer.down), $(WRAPPER_SEL).off("touchmove " + MSPointer.move)
            }
        }
        function getMSPointer() {
            var pointer;
            return pointer = window.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove"
            }
        }
        function getEventsPage(e) {
            var events = [];
            return events.y = "undefined" != typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, events.x = "undefined" != typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, isTouch && isReallyTouch(e) && (events.y = e.touches[0].pageY, events.x = e.touches[0].pageX), events
        }
        function silentLandscapeScroll(activeSlide) {
            FP.setScrollingSpeed(0, "internal"), landscapeScroll(activeSlide.closest(SLIDES_WRAPPER_SEL), activeSlide), FP.setScrollingSpeed(originals.scrollingSpeed, "internal")
        }
        function silentScroll(top) {
            if (options.scrollBar) container.scrollTop(top);
            else if (options.css3) {
                var translate3d = "translate3d(0px, -" + top + "px, 0px)";
                transformContainer(translate3d, !1)
            } else container.css("top", -top)
        }
        function getTransforms(translate3d) {
            return {
                "-webkit-transform": translate3d,
                "-moz-transform": translate3d,
                "-ms-transform": translate3d,
                transform: translate3d
            }
        }
        function setIsScrollable(value, direction) {
            switch (direction) {
                case "up":
                    isScrollAllowed.up = value;
                    break;
                case "down":
                    isScrollAllowed.down = value;
                    break;
                case "left":
                    isScrollAllowed.left = value;
                    break;
                case "right":
                    isScrollAllowed.right = value;
                    break;
                case "all":
                    FP.setAllowScrolling(value)
            }
        }
        function destroyStructure() {
            silentScroll(0), $(SECTION_NAV_SEL + ", " + SLIDES_NAV_SEL + ", " + SLIDES_ARROW_SEL).remove(), $(SECTION_SEL).css({
                height: "",
                "background-color": "",
                padding: ""
            }), $(SLIDE_SEL).css({
                width: ""
            }), container.css({
                height: "",
                position: "",
                "-ms-touch-action": "",
                "touch-action": ""
            }), $(SECTION_SEL + ", " + SLIDE_SEL).each(function() {
                removeSlimScroll($(this)), $(this).removeClass(TABLE + " " + ACTIVE)
            }), removeAnimation(container), container.find(TABLE_CELL_SEL + ", " + SLIDES_CONTAINER_SEL + ", " + SLIDES_WRAPPER_SEL).each(function() {
                $(this).replaceWith(this.childNodes)
            }), $htmlBody.scrollTop(0)
        }
        function setVariableState(variable, value, type) {
            options[variable] = value, "internal" !== type && (originals[variable] = value)
        }
        function displayWarnings() {
            options.continuousVertical && (options.loopTop || options.loopBottom) && (options.continuousVertical = !1, showError("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), options.continuousVertical && options.scrollBar && (options.continuousVertical = !1, showError("warn", "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), $.each(options.anchors, function(index, name) {
                ($("#" + name).length || $('[name="' + name + '"]').length) && showError("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).")
            })
        }
        function showError(type, text) {
            console && console[type] && console[type]("fullPage: " + text)
        }
        var $htmlBody = $("html, body"),
            $body = $("body"),
            FP = $.fn.fullpage;
        options = $.extend({
            menu: !1,
            anchors: [],
            navigation: !1,
            navigationPosition: "right",
            navigationTooltips: [],
            showActiveTooltip: !1,
            slidesNavigation: !1,
            slidesNavPosition: "bottom",
            scrollBar: !1,
            css3: !0,
            scrollingSpeed: 700,
            autoScrolling: !0,
            fitToSection: !0,
            easing: "easeInOutCubic",
            easingcss3: "ease",
            loopBottom: !1,
            loopTop: !1,
            loopHorizontal: !0,
            continuousVertical: !1,
            normalScrollElements: null,
            scrollOverflow: !1,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            keyboardScrolling: !0,
            animateAnchor: !0,
            recordHistory: !0,
            controlArrows: !0,
            controlArrowColor: "#fff",
            verticalCentered: !0,
            resize: !1,
            sectionsColor: [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0,
            sectionSelector: SECTION_DEFAULT_SEL,
            slideSelector: SLIDE_DEFAULT_SEL,
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null
        }, options), displayWarnings(), $.extend($.easing, {
            easeInOutCubic: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b
            }
        }), $.extend($.easing, {
            easeInQuart: function(x, t, b, c, d) {
                return c * (t /= d) * t * t * t + b
            }
        }), FP.setAutoScrolling = function(value, type) {
            setVariableState("autoScrolling", value, type);
            var element = $(SECTION_ACTIVE_SEL);
            options.autoScrolling && !options.scrollBar ? ($htmlBody.css({
                overflow: "hidden",
                height: "100%"
            }), FP.setRecordHistory(options.recordHistory, "internal"), container.css({
                "-ms-touch-action": "none",
                "touch-action": "none"
            }), element.length && silentScroll(element.position().top)) : ($htmlBody.css({
                overflow: "visible",
                height: "initial"
            }), FP.setRecordHistory(!1, "internal"), container.css({
                "-ms-touch-action": "",
                "touch-action": ""
            }), silentScroll(0), element.length && $htmlBody.scrollTop(element.position().top))
        }, FP.setRecordHistory = function(value, type) {
            setVariableState("recordHistory", value, type)
        }, FP.setScrollingSpeed = function(value, type) {
            setVariableState("scrollingSpeed", value, type)
        }, FP.setFitToSection = function(value, type) {
            setVariableState("fitToSection", value, type)
        }, FP.setMouseWheelScrolling = function(value) {
            value ? addMouseWheelHandler() : removeMouseWheelHandler()
        }, FP.setAllowScrolling = function(value, directions) {
            "undefined" != typeof directions ? (directions = directions.replace(/ /g, "").split(","), $.each(directions, function(index, direction) {
                setIsScrollable(value, direction)
            })) : value ? (FP.setMouseWheelScrolling(!0), addTouchHandler()) : (FP.setMouseWheelScrolling(!1), removeTouchHandler())
        }, FP.setKeyboardScrolling = function(value) {
            options.keyboardScrolling = value
        }, FP.moveSectionUp = function() {
            var prev = $(SECTION_ACTIVE_SEL).prev(SECTION_SEL);
            prev.length || !options.loopTop && !options.continuousVertical || (prev = $(SECTION_SEL).last()), prev.length && scrollPage(prev, null, !0)
        }, FP.moveSectionDown = function() {
            var next = $(SECTION_ACTIVE_SEL).next(SECTION_SEL);
            next.length || !options.loopBottom && !options.continuousVertical || (next = $(SECTION_SEL).first()), next.length && scrollPage(next, null, !1)
        }, FP.moveTo = function(section, slide) {
            var destiny = "";
            destiny = isNaN(section) ? $('[data-anchor="' + section + '"]') : $(SECTION_SEL).eq(section - 1), "undefined" != typeof slide ? scrollPageAndSlide(section, slide) : destiny.length > 0 && scrollPage(destiny)
        }, FP.moveSlideRight = function() {
            moveSlide("next")
        }, FP.moveSlideLeft = function() {
            moveSlide("prev")
        }, FP.reBuild = function(resizing) {
            if (!container.hasClass(DESTROYED)) {
                isResizing = !0;
                var windowsWidth = $window.width();
                windowsHeight = $window.height(), options.resize && resizeMe(windowsHeight, windowsWidth), $(SECTION_SEL).each(function() {
                    var slidesWrap = $(this).find(SLIDES_WRAPPER_SEL),
                        slides = $(this).find(SLIDE_SEL);
                    options.verticalCentered && $(this).find(TABLE_CELL_SEL).css("height", getTableHeight($(this)) + "px"), $(this).css("height", windowsHeight + "px"), options.scrollOverflow && (slides.length ? slides.each(function() {
                        createSlimScrolling($(this))
                    }) : createSlimScrolling($(this))), slides.length > 1 && landscapeScroll(slidesWrap, slidesWrap.find(SLIDE_ACTIVE_SEL))
                });
                var activeSection = $(SECTION_ACTIVE_SEL);
                activeSection.index(SECTION_SEL) && scrollPage(activeSection), isResizing = !1, $.isFunction(options.afterResize) && resizing && options.afterResize.call(container), $.isFunction(options.afterReBuild) && !resizing && options.afterReBuild.call(container)
            }
        };
        var lastScrolledDestiny, lastScrolledSlide, nav, slideMoving = !1,
            isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
            isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
            container = $(this),
            windowsHeight = $window.height(),
            isResizing = !1,
            canScroll = !0,
            scrollings = [],
            isScrollAllowed = {
                up: !0,
                down: !0,
                left: !0,
                right: !0
            },
            originals = $.extend(!0, {}, options);
        $(this).length ? (container.css({
            height: "100%",
            position: "relative"
        }), container.addClass(WRAPPER), $("html").addClass(ENABLED)) : showError("error", "Error! Fullpage.js needs to be initialized with a selector. For example: $('#myContainer').fullpage();"), options.css3 && (options.css3 = support3d()), FP.setAllowScrolling(!0), container.removeClass(DESTROYED), $(options.sectionSelector).each(function() {
            $(this).addClass(SECTION)
        }), $(options.slideSelector).each(function() {
            $(this).addClass(SLIDE)
        }), options.navigation && addVerticalNavigation(), $(SECTION_SEL).each(function(index) {
            var that = $(this),
                slides = $(this).find(SLIDE_SEL),
                numSlides = slides.length;
            if (index || 0 !== $(SECTION_ACTIVE_SEL).length || $(this).addClass(ACTIVE), $(this).css("height", windowsHeight + "px"), options.paddingTop && $(this).css("padding-top", options.paddingTop), options.paddingBottom && $(this).css("padding-bottom", options.paddingBottom), "undefined" != typeof options.sectionsColor[index] && $(this).css("background-color", options.sectionsColor[index]), "undefined" != typeof options.anchors[index] && ($(this).attr("data-anchor", options.anchors[index]), $(this).hasClass(ACTIVE) && activateMenuAndNav(options.anchors[index], index)), numSlides > 0) {
                var sliderWidth = 100 * numSlides,
                    slideWidth = 100 / numSlides;
                slides.wrapAll('<div class="' + SLIDES_CONTAINER + '" />'), slides.parent().wrap('<div class="' + SLIDES_WRAPPER + '" />'), $(this).find(SLIDES_CONTAINER_SEL).css("width", sliderWidth + "%"), options.controlArrows && numSlides > 1 && createSlideArrows($(this)), options.slidesNavigation && addSlidesNavigation($(this), numSlides), slides.each(function(index) {
                    $(this).css("width", slideWidth + "%"), options.verticalCentered && addTableClass($(this))
                });
                var startingSlide = that.find(SLIDE_ACTIVE_SEL);
                startingSlide.length ? silentLandscapeScroll(startingSlide) : slides.eq(0).addClass(ACTIVE)
            } else options.verticalCentered && addTableClass($(this))
        }).promise().done(function() {
            FP.setAutoScrolling(options.autoScrolling, "internal");
            var activeSlide = $(SECTION_ACTIVE_SEL).find(SLIDE_ACTIVE_SEL);
            if (activeSlide.length && (0 !== $(SECTION_ACTIVE_SEL).index(SECTION_SEL) || 0 === $(SECTION_ACTIVE_SEL).index(SECTION_SEL) && 0 !== activeSlide.index()) && silentLandscapeScroll(activeSlide), options.fixedElements && options.css3 && $(options.fixedElements).appendTo($body), options.navigation && (nav.css("margin-top", "-" + nav.height() / 2 + "px"), nav.find("li").eq($(SECTION_ACTIVE_SEL).index(SECTION_SEL)).find("a").addClass(ACTIVE)), options.menu && options.css3 && $(options.menu).closest(WRAPPER_SEL).length && $(options.menu).appendTo($body), options.scrollOverflow ? ("complete" === document.readyState && createSlimScrollingHandler(), $window.on("load", createSlimScrollingHandler)) : $.isFunction(options.afterRender) && options.afterRender.call(container), responsive(), !options.animateAnchor) {
                var value = window.location.hash.replace("#", "").split("/"),
                    destiny = value[0];
                if (destiny.length) {
                    var section = $('[data-anchor="' + destiny + '"]');
                    section.length && (options.autoScrolling ? silentScroll(section.position().top) : (silentScroll(0), $htmlBody.scrollTop(section.position().top)), activateMenuAndNav(destiny, null), $.isFunction(options.afterLoad) && options.afterLoad.call(section, destiny, section.index(SECTION_SEL) + 1), section.addClass(ACTIVE).siblings().removeClass(ACTIVE))
                }
            }
            setBodyClass(), $window.on("load", function() {
                scrollToAnchor()
            })
        });
        var scrollId, scrollId2, isScrolling = !1;
        $window.on("scroll", scrollHandler);
        var touchStartY = 0,
            touchStartX = 0,
            touchEndY = 0,
            touchEndX = 0,
            prevTime = (new Date).getTime();
        $window.on("hashchange", hashChangeHandler), $document.keydown(keydownHandler);
        var keydownId;
        container.mousedown(function(e) {
            2 == e.which && (oldPageY = e.pageY, container.on("mousemove", mouseMoveHandler))
        }), container.mouseup(function(e) {
            2 == e.which && container.off("mousemove")
        });
        var oldPageY = 0;
        $document.on("click touchstart", SECTION_NAV_SEL + " a", function(e) {
            e.preventDefault();
            var index = $(this).parent().index();
            scrollPage($(SECTION_SEL).eq(index))
        }), $document.on("click touchstart", SLIDES_NAV_LINK_SEL, function(e) {
            e.preventDefault();
            var slides = $(this).closest(SECTION_SEL).find(SLIDES_WRAPPER_SEL),
                destiny = slides.find(SLIDE_SEL).eq($(this).closest("li").index());
            landscapeScroll(slides, destiny)
        }), options.normalScrollElements && ($document.on("mouseenter", options.normalScrollElements, function() {
            FP.setMouseWheelScrolling(!1)
        }), $document.on("mouseleave", options.normalScrollElements, function() {
            FP.setMouseWheelScrolling(!0)
        })), $(SECTION_SEL).on("click touchstart", SLIDES_ARROW_SEL, function() {
            $(this).hasClass(SLIDES_PREV) ? FP.moveSlideLeft() : FP.moveSlideRight()
        }), $window.resize(resizeHandler);
        var resizeId, previousHeight = windowsHeight;
        FP.destroy = function(all) {
            FP.setAutoScrolling(!1, "internal"), FP.setAllowScrolling(!1), FP.setKeyboardScrolling(!1), container.addClass(DESTROYED), $window.off("scroll", scrollHandler).off("hashchange", hashChangeHandler).off("resize", resizeHandler), $document.off("click", SECTION_NAV_SEL + " a").off("mouseenter", SECTION_NAV_SEL + " li").off("mouseleave", SECTION_NAV_SEL + " li").off("click", SLIDES_NAV_LINK_SEL).off("mouseover", options.normalScrollElements).off("mouseout", options.normalScrollElements), $(SECTION_SEL).off("click", SLIDES_ARROW_SEL), all && destroyStructure()
        }
    }
}(jQuery, window, document, Math), function() {
    function m() {
        return function() {}
    }
    function q(a) {
        return function() {
            return this[a]
        }
    }
    function r(a) {
        return function() {
            return a
        }
    }
    function u(a, c, d) {
        if ("string" == typeof a) {
            if (0 === a.indexOf("#") && (a = a.slice(1)), u.Aa[a]) return u.Aa[a];
            a = u.w(a)
        }
        if (!a || !a.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
        return a.player || new u.Player(a, c, d)
    }
    function D() {}
    function F(a, c) {
        var d = Array.prototype.slice.call(c);
        a ? d.unshift(a.toUpperCase() + ":") : a = "log", u.log.history.push(d), d.unshift("VIDEOJS:"), E[a].apply ? E[a].apply(E, d) : E[a](d.join(" "))
    }
    function G(a) {
        a.r("vjs-lock-showing")
    }
    function H(a, c, d, e) {
        return d !== b ? (a.b.style[c] = -1 !== ("" + d).indexOf("%") || -1 !== ("" + d).indexOf("px") ? d : "auto" === d ? "" : d + "px", e || a.k("resize"), a) : a.b ? (d = a.b.style[c], e = d.indexOf("px"), -1 !== e ? parseInt(d.slice(0, e), 10) : parseInt(a.b["offset" + u.$(c)], 10)) : 0
    }
    function I(a) {
        var c, d, e, g, h, k, p, n;
        c = 0, d = j, a.d("touchstart", function(a) {
            1 === a.touches.length && (d = a.touches[0], c = (new Date).getTime(), g = f)
        }), a.d("touchmove", function(a) {
            1 < a.touches.length ? g = l : d && (k = a.touches[0].pageX - d.pageX, p = a.touches[0].pageY - d.pageY, n = Math.sqrt(k * k + p * p), n > 22 && (g = l))
        }), h = function() {
            g = l
        }, a.d("touchleave", h), a.d("touchcancel", h), a.d("touchend", function(a) {
            d = j, g === f && (e = (new Date).getTime() - c, 250 > e && (a.preventDefault(), this.k("tap")))
        })
    }
    function J(a, c) {
        var d, e, g, h;
        return d = a.b, e = u.od(d), h = g = d.offsetWidth, d = a.handle, a.j.Vd ? (h = e.top, e = c.changedTouches ? c.changedTouches[0].pageY : c.pageY, d && (d = d.w().offsetHeight, h += d / 2, g -= d), Math.max(0, Math.min(1, (h - e + g) / g))) : (g = e.left, e = c.changedTouches ? c.changedTouches[0].pageX : c.pageX, d && (d = d.w().offsetWidth, g += d / 2, h -= d), Math.max(0, Math.min(1, (e - g) / h)))
    }
    function ca(a, c) {
        a.V(c), c.d("click", u.bind(a, function() {
            G(this)
        }))
    }
    function L(a) {
        a.ra = f, a.za.o("vjs-lock-showing"), a.b.setAttribute("aria-pressed", f), a.O && 0 < a.O.length && a.O[0].w().focus()
    }
    function K(a) {
        a.ra = l, G(a.za), a.b.setAttribute("aria-pressed", l)
    }
    function da(a) {
        var c = {
            sources: [],
            tracks: []
        };
        if (u.l.B(c, u.Bb(a)), a.hasChildNodes()) {
            var d, e, g, h;
            for (a = a.childNodes, g = 0, h = a.length; h > g; g++) d = a[g], e = d.nodeName.toLowerCase(), "source" === e ? c.sources.push(u.Bb(d)) : "track" === e && c.tracks.push(u.Bb(d))
        }
        return c
    }
    function R(a, c, d) {
        a.g && (a.ca = l, a.g.dispose(), a.Hb && (a.Hb = l, clearInterval(a.Ya)), a.Ib && S(a), a.g = l), "Html5" !== c && a.P && (u.f.mc(a.P), a.P = j), a.Ca = c, a.ca = l;
        var e = u.l.B({
            source: d,
            parentEl: a.b
        }, a.j[c.toLowerCase()]);
        d && (d.src == a.z.src && 0 < a.z.currentTime && (e.startTime = a.z.currentTime), a.z.src = d.src), a.g = new window.videojs[c](a, e), a.g.J(function() {
            if (this.c.Ea(), !this.n.progressEvents) {
                var a = this.c;
                a.Hb = f, a.Ya = setInterval(u.bind(a, function() {
                    this.z.sb < this.buffered().end(0) ? this.k("progress") : 1 == this.bufferedPercent() && (clearInterval(this.Ya), this.k("progress"))
                }), 500), a.g && a.g.W("progress", function() {
                    this.n.progressEvents = f;
                    var a = this.c;
                    a.Hb = l, clearInterval(a.Ya)
                })
            }
            this.n.timeupdateEvents || (a = this.c, a.Ib = f, a.d("play", a.Kc), a.d("pause", a.Ba), a.g && a.g.W("timeupdate", function() {
                this.n.timeupdateEvents = f, S(this.c)
            }))
        })
    }
    function S(a) {
        a.Ib = l, a.Ba(), a.p("play", a.Kc), a.p("pause", a.Ba)
    }
    function T(a, c) {
        c !== b && a.tc !== c && ((a.tc = c) ? (a.o("vjs-has-started"), a.k("firstplay")) : a.r("vjs-has-started"))
    }
    function V(a, c, d) {
        if (a.g && !a.g.ca) a.g.J(function() {
            this[c](d)
        });
        else try {
            a.g[c](d)
        } catch (e) {
            throw u.log(e), e
        }
    }
    function U(a, c) {
        if (a.g && a.g.ca) try {
            return a.g[c]()
        } catch (d) {
            throw a.g[c] === b ? u.log("Video.js: " + c + " method not defined for " + a.Ca + " playback technology.", d) : "TypeError" == d.name ? (u.log("Video.js: " + c + " unavailable on " + a.Ca + " playback technology element.", d), a.g.ca = l) : u.log(d), d
        }
    }
    function ea(a) {
        a.sd = l, u.p(document, "keydown", a.pc), document.documentElement.style.overflow = a.kd, u.r(document.body, "vjs-full-window"), a.k("exitFullWindow")
    }
    function fa(a) {
        return a.m().g && a.m().g.n.playbackRate && a.m().options().playbackRates && 0 < a.m().options().playbackRates.length
    }
    function la() {
        var a = X[Y],
            c = a.charAt(0).toUpperCase() + a.slice(1);
        ja["set" + c] = function(c) {
            return this.b.vjs_setProperty(a, c)
        }
    }
    function ma(a) {
        ja[a] = function() {
            return this.b.vjs_getProperty(a)
        }
    }
    function na(a, c, d, e, g) {
        var h = a.Da = a.Da || [];
        g = g || {}, g.kind = c, g.label = d, g.language = e, c = u.$(c || "subtitles");
        var k = new window.videojs[c + "Track"](a, g);
        h.push(k), k.Qa() && a.J(function() {
            setTimeout(function() {
                k.show()
            }, 0)
        })
    }
    function oa(a, c, d) {
        for (var k, p, e = a.Da, g = 0, h = e.length; h > g; g++) k = e[g], k.id() === c ? (k.show(), p = k) : d && k.K() == d && 0 < k.mode() && k.disable();
        (c = p ? p.K() : d ? d : l) && a.k(c + "trackchange")
    }
    function pa(a) {
        0 === a.la && a.load(), 0 === a.ka && (a.c.d("timeupdate", u.bind(a, a.update, a.T)), a.c.d("ended", u.bind(a, a.reset, a.T)), ("captions" === a.H || "subtitles" === a.H) && a.c.ja("textTrackDisplay").V(a))
    }
    function qa(a) {
        var c = a.split(":");
        a = 0;
        var d, e, g;
        return 3 == c.length ? (d = c[0], e = c[1], c = c[2]) : (d = 0, e = c[0], c = c[1]), c = c.split(/\s+/), c = c.splice(0, 1)[0], c = c.split(/\.|,/), g = parseFloat(c[1]), c = c[0], a += 3600 * parseFloat(d), a += 60 * parseFloat(e), a += parseFloat(c), g && (a += g / 1e3), a
    }
    function $(a, c) {
        var d = a.split("."),
            e = ra;
        !(d[0] in e) && e.execScript && e.execScript("var " + d[0]);
        for (var g; d.length && (g = d.shift());) d.length || c === b ? e = e[g] ? e[g] : e[g] = {} : e[g] = c
    }
    var b = void 0,
        f = !0,
        j = null,
        l = !1,
        t;
    document.createElement("video"), document.createElement("audio"), document.createElement("track");
    var videojs = u;
    window.je = window.ke = u, u.Ub = "4.6", u.Pc = "https:" == document.location.protocol ? "https://" : "http://", u.options = {
        techOrder: ["html5", "flash"],
        html5: {},
        flash: {},
        width: 300,
        height: 150,
        defaultVolume: 0,
        playbackRates: [],
        children: {
            mediaLoader: {},
            posterImage: {},
            textTrackDisplay: {},
            loadingSpinner: {},
            bigPlayButton: {},
            controlBar: {},
            errorDisplay: {}
        },
        notSupportedMessage: "No compatible source was found for this video."
    }, "GENERATED_CDN_VSN" !== u.Ub && (videojs.options.flash.swf = u.Pc + "vjs.zencdn.net/" + u.Ub + "/video-js.swf"), u.Aa = {}, "function" == typeof define && define.amd ? define([], function() {
        return videojs
    }) : "object" == typeof exports && "object" == typeof module && (module.exports = videojs), u.pa = u.CoreObject = m(), u.pa.extend = function(a) {
        var c, d;
        a = a || {}, c = a.init || a.h || this.prototype.init || this.prototype.h || m(), d = function() {
            c.apply(this, arguments)
        }, d.prototype = u.l.create(this.prototype), d.prototype.constructor = d, d.extend = u.pa.extend, d.create = u.pa.create;
        for (var e in a) a.hasOwnProperty(e) && (d.prototype[e] = a[e]);
        return d
    }, u.pa.create = function() {
        var a = u.l.create(this.prototype);
        return this.apply(a, arguments), a
    }, u.d = function(a, c, d) {
        var e = u.getData(a);
        e.D || (e.D = {}), e.D[c] || (e.D[c] = []), d.v || (d.v = u.v++), e.D[c].push(d), e.X || (e.disabled = l, e.X = function(c) {
            if (!e.disabled) {
                c = u.oc(c);
                var d = e.D[c.type];
                if (d) for (var d = d.slice(0), k = 0, p = d.length; p > k && !c.wc(); k++) d[k].call(a, c)
            }
        }), 1 == e.D[c].length && (document.addEventListener ? a.addEventListener(c, e.X, l) : document.attachEvent && a.attachEvent("on" + c, e.X))
    }, u.p = function(a, c, d) {
        if (u.sc(a)) {
            var e = u.getData(a);
            if (e.D) if (c) {
                var g = e.D[c];
                if (g) {
                    if (d) {
                        if (d.v) for (e = 0; e < g.length; e++) g[e].v === d.v && g.splice(e--, 1)
                    } else e.D[c] = [];
                    u.jc(a, c)
                }
            } else for (g in e.D) c = g, e.D[c] = [], u.jc(a, c)
        }
    }, u.jc = function(a, c) {
        var d = u.getData(a);
        0 === d.D[c].length && (delete d.D[c], document.removeEventListener ? a.removeEventListener(c, d.X, l) : document.detachEvent && a.detachEvent("on" + c, d.X)), u.Eb(d.D) && (delete d.D, delete d.X, delete d.disabled), u.Eb(d) && u.Dc(a)
    }, u.oc = function(a) {
        function c() {
            return f
        }
        function d() {
            return l
        }
        if (!a || !a.Fb) {
            var e = a || window.event;
            a = {};
            for (var g in e)"layerX" !== g && "layerY" !== g && "keyboardEvent.keyLocation" !== g && ("returnValue" == g && e.preventDefault || (a[g] = e[g]));
            if (a.target || (a.target = a.srcElement || document), a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement, a.preventDefault = function() {
                    e.preventDefault && e.preventDefault(), a.returnValue = l, a.rd = c, a.defaultPrevented = f
                }, a.rd = d, a.defaultPrevented = l, a.stopPropagation = function() {
                    e.stopPropagation && e.stopPropagation(), a.cancelBubble = f, a.Fb = c
                }, a.Fb = d, a.stopImmediatePropagation = function() {
                    e.stopImmediatePropagation && e.stopImmediatePropagation(), a.wc = c, a.stopPropagation()
                }, a.wc = d, a.clientX != j) {
                g = document.documentElement;
                var h = document.body;
                a.pageX = a.clientX + (g && g.scrollLeft || h && h.scrollLeft || 0) - (g && g.clientLeft || h && h.clientLeft || 0), a.pageY = a.clientY + (g && g.scrollTop || h && h.scrollTop || 0) - (g && g.clientTop || h && h.clientTop || 0)
            }
            a.which = a.charCode || a.keyCode, a.button != j && (a.button = 1 & a.button ? 0 : 4 & a.button ? 1 : 2 & a.button ? 2 : 0)
        }
        return a
    }, u.k = function(a, c) {
        var d = u.sc(a) ? u.getData(a) : {},
            e = a.parentNode || a.ownerDocument;
        return "string" == typeof c && (c = {
            type: c,
            target: a
        }), c = u.oc(c), d.X && d.X.call(a, c), e && !c.Fb() && c.bubbles !== l ? u.k(e, c) : e || c.defaultPrevented || (d = u.getData(c.target), !c.target[c.type]) || (d.disabled = f, "function" == typeof c.target[c.type] && c.target[c.type](), d.disabled = l), !c.defaultPrevented
    }, u.W = function(a, c, d) {
        function e() {
            u.p(a, c, e), d.apply(this, arguments)
        }
        e.v = d.v = d.v || u.v++, u.d(a, c, e)
    };
    var v = Object.prototype.hasOwnProperty;
    u.e = function(a, c) {
        var d, e;
        d = document.createElement(a || "div");
        for (e in c) v.call(c, e) && (-1 !== e.indexOf("aria-") || "role" == e ? d.setAttribute(e, c[e]) : d[e] = c[e]);
        return d
    }, u.$ = function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    }, u.l = {}, u.l.create = Object.create ||
        function(a) {
            function c() {}
            return c.prototype = a, new c
        }, u.l.wa = function(a, c, d) {
        for (var e in a) v.call(a, e) && c.call(d || this, e, a[e])
    }, u.l.B = function(a, c) {
        if (!c) return a;
        for (var d in c) v.call(c, d) && (a[d] = c[d]);
        return a
    }, u.l.fd = function(a, c) {
        var d, e, g;
        a = u.l.copy(a);
        for (d in c) v.call(c, d) && (e = a[d], g = c[d], a[d] = u.l.Sa(e) && u.l.Sa(g) ? u.l.fd(e, g) : c[d]);
        return a
    }, u.l.copy = function(a) {
        return u.l.B({}, a)
    }, u.l.Sa = function(a) {
        return !!a && "object" == typeof a && "[object Object]" === a.toString() && a.constructor === Object
    }, u.bind = function(a, c, d) {
        function e() {
            return c.apply(a, arguments)
        }
        return c.v || (c.v = u.v++), e.v = d ? d + "_" + c.v : c.v, e
    }, u.ta = {}, u.v = 1, u.expando = "vdata" + (new Date).getTime(), u.getData = function(a) {
        var c = a[u.expando];
        return c || (c = a[u.expando] = u.v++, u.ta[c] = {}), u.ta[c]
    }, u.sc = function(a) {
        return a = a[u.expando], !(!a || u.Eb(u.ta[a]))
    }, u.Dc = function(a) {
        var c = a[u.expando];
        if (c) {
            delete u.ta[c];
            try {
                delete a[u.expando]
            } catch (d) {
                a.removeAttribute ? a.removeAttribute(u.expando) : a[u.expando] = j
            }
        }
    }, u.Eb = function(a) {
        for (var c in a) if (a[c] !== j) return l;
        return f
    }, u.o = function(a, c) {
        -1 == (" " + a.className + " ").indexOf(" " + c + " ") && (a.className = "" === a.className ? c : a.className + " " + c)
    }, u.r = function(a, c) {
        var d, e;
        if (-1 != a.className.indexOf(c)) {
            for (d = a.className.split(" "), e = d.length - 1; e >= 0; e--) d[e] === c && d.splice(e, 1);
            a.className = d.join(" ")
        }
    }, u.A = u.e("video"), u.M = navigator.userAgent, u.Uc = /iPhone/i.test(u.M), u.Tc = /iPad/i.test(u.M), u.Vc = /iPod/i.test(u.M), u.Sc = u.Uc || u.Tc || u.Vc;
    var aa = u,
        w, x = u.M.match(/OS (\d+)_/i);
    w = x && x[1] ? x[1] : b, aa.Zd = w, u.Rc = /Android/i.test(u.M);
    var ba = u,
        y, z = u.M.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
        A, B;
    z ? (A = z[1] && parseFloat(z[1]), B = z[2] && parseFloat(z[2]), y = A && B ? parseFloat(z[1] + "." + z[2]) : A ? A : j) : y = j, ba.Tb = y, u.Wc = u.Rc && /webkit/i.test(u.M) && 2.3 > u.Tb, u.Xb = /Firefox/i.test(u.M), u.$d = /Chrome/i.test(u.M), u.ec = !! ("ontouchstart" in window || window.Qc && document instanceof window.Qc), u.Bb = function(a) {
        var c, d, e, g;
        if (c = {}, a && a.attributes && 0 < a.attributes.length) {
            d = a.attributes;
            for (var h = d.length - 1; h >= 0; h--) e = d[h].name, g = d[h].value, ("boolean" == typeof a[e] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + e + ",")) && (g = g !== j ? f : l), c[e] = g
        }
        return c
    }, u.ce = function(a, c) {
        var d = "";
        return document.defaultView && document.defaultView.getComputedStyle ? d = document.defaultView.getComputedStyle(a, "").getPropertyValue(c) : a.currentStyle && (d = a["client" + c.substr(0, 1).toUpperCase() + c.substr(1)] + "px"), d
    }, u.Db = function(a, c) {
        c.firstChild ? c.insertBefore(a, c.firstChild) : c.appendChild(a)
    }, u.Na = {}, u.w = function(a) {
        return 0 === a.indexOf("#") && (a = a.slice(1)), document.getElementById(a)
    }, u.ya = function(a, c) {
        c = c || a;
        var d = Math.floor(a % 60),
            e = Math.floor(a / 60 % 60),
            g = Math.floor(a / 3600),
            h = Math.floor(c / 60 % 60),
            k = Math.floor(c / 3600);
        return (isNaN(a) || 1 / 0 === a) && (g = e = d = "-"), g = g > 0 || k > 0 ? g + ":" : "", g + (((g || h >= 10) && 10 > e ? "0" + e : e) + ":") + (10 > d ? "0" + d : d)
    }, u.bd = function() {
        document.body.focus(), document.onselectstart = r(l)
    }, u.Td = function() {
        document.onselectstart = r(f)
    }, u.trim = function(a) {
        return (a + "").replace(/^\s+|\s+$/g, "")
    }, u.round = function(a, c) {
        return c || (c = 0), Math.round(a * Math.pow(10, c)) / Math.pow(10, c)
    }, u.yb = function(a, c) {
        return {
            length: 1,
            start: function() {
                return a
            },
            end: function() {
                return c
            }
        }
    }, u.get = function(a, c, d, e) {
        var g, h, k, p;
        d = d || m(), "undefined" == typeof XMLHttpRequest && (window.XMLHttpRequest = function() {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (a) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
            } catch (c) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP")
            } catch (d) {}
            throw Error("This browser does not support XMLHttpRequest.")
        }), h = new XMLHttpRequest, k = u.Fd(a), p = window.location, k.protocol + k.host === p.protocol + p.host || !window.XDomainRequest || "withCredentials" in h ? (g = "file:" == k.protocol || "file:" == p.protocol, h.onreadystatechange = function() {
            4 === h.readyState && (200 === h.status || g && 0 === h.status ? c(h.responseText) : d(h.responseText))
        }) : (h = new window.XDomainRequest, h.onload = function() {
            c(h.responseText)
        }, h.onerror = d, h.onprogress = m(), h.ontimeout = d);
        try {
            h.open("GET", a, f), e && (h.withCredentials = f)
        } catch (n) {
            return void d(n)
        }
        try {
            h.send()
        } catch (s) {
            d(s)
        }
    }, u.Kd = function(a) {
        try {
            var c = window.localStorage || l;
            c && (c.volume = a)
        } catch (d) {
            22 == d.code || 1014 == d.code ? u.log("LocalStorage Full (VideoJS)", d) : 18 == d.code ? u.log("LocalStorage not allowed (VideoJS)", d) : u.log("LocalStorage Error (VideoJS)", d)
        }
    }, u.qc = function(a) {
        return a.match(/^https?:\/\//) || (a = u.e("div", {
            innerHTML: '<a href="' + a + '">x</a>'
        }).firstChild.href), a
    }, u.Fd = function(a) {
        var c, d, e, g;
        g = "protocol hostname port pathname search hash host".split(" "), d = u.e("a", {
            href: a
        }), (e = "" === d.host && "file:" !== d.protocol) && (c = u.e("div"), c.innerHTML = '<a href="' + a + '"></a>', d = c.firstChild, c.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(c)), a = {};
        for (var h = 0; h < g.length; h++) a[g[h]] = d[g[h]];
        return e && document.body.removeChild(c), a
    };
    var E = window.console || {
            log: D,
            warn: D,
            error: D
        };
    u.log = function() {
        F(j, arguments)
    }, u.log.history = [], u.log.error = function() {
        F("error", arguments)
    }, u.log.warn = function() {
        F("warn", arguments)
    }, u.od = function(a) {
        var c, d;
        return a.getBoundingClientRect && a.parentNode && (c = a.getBoundingClientRect()), c ? (a = document.documentElement, d = document.body, {
            left: u.round(c.left + (window.pageXOffset || d.scrollLeft) - (a.clientLeft || d.clientLeft || 0)),
            top: u.round(c.top + (window.pageYOffset || d.scrollTop) - (a.clientTop || d.clientTop || 0))
        }) : {
            left: 0,
            top: 0
        }
    }, u.oa = {}, u.oa.Jb = function(a, c) {
        var d, e, g;
        a = u.l.copy(a);
        for (d in c) c.hasOwnProperty(d) && (e = a[d], g = c[d], a[d] = u.l.Sa(e) && u.l.Sa(g) ? u.oa.Jb(e, g) : c[d]);
        return a
    }, u.a = u.pa.extend({
        h: function(a, c, d) {
            if (this.c = a, this.j = u.l.copy(this.j), c = this.options(c), this.T = c.id || (c.el && c.el.id ? c.el.id : a.id() + "_component_" + u.v++), this.wd = c.name || j, this.b = c.el || this.e(), this.N = [], this.Oa = {}, this.Pa = {}, this.uc(), this.J(d), c.Ec !== l) {
                var e, g;
                e = u.bind(this.m(), this.m().reportUserActivity), this.d("touchstart", function() {
                    e(), clearInterval(g), g = setInterval(e, 250)
                }), a = function() {
                    e(), clearInterval(g)
                }, this.d("touchmove", e), this.d("touchend", a), this.d("touchcancel", a)
            }
        }
    }), t = u.a.prototype, t.dispose = function() {
        if (this.k({
                type: "dispose",
                bubbles: l
            }), this.N) for (var a = this.N.length - 1; a >= 0; a--) this.N[a].dispose && this.N[a].dispose();
        this.Pa = this.Oa = this.N = j, this.p(), this.b.parentNode && this.b.parentNode.removeChild(this.b), u.Dc(this.b), this.b = j
    }, t.c = f, t.m = q("c"), t.options = function(a) {
        return a === b ? this.j : this.j = u.oa.Jb(this.j, a)
    }, t.e = function(a, c) {
        return u.e(a, c)
    }, t.w = q("b"), t.ia = function() {
        return this.u || this.b
    }, t.id = q("T"), t.name = q("wd"), t.children = q("N"), t.qd = function(a) {
        return this.Oa[a]
    }, t.ja = function(a) {
        return this.Pa[a]
    }, t.V = function(a, c) {
        var d, e;
        return "string" == typeof a ? (e = a, c = c || {}, d = c.componentClass || u.$(e), c.name = e, d = new window.videojs[d](this.c || this, c)) : d = a, this.N.push(d), "function" == typeof d.id && (this.Oa[d.id()] = d), (e = e || d.name && d.name()) && (this.Pa[e] = d), "function" == typeof d.el && d.el() && this.ia().appendChild(d.el()), d
    }, t.removeChild = function(a) {
        if ("string" == typeof a && (a = this.ja(a)), a && this.N) {
            for (var c = l, d = this.N.length - 1; d >= 0; d--) if (this.N[d] === a) {
                c = f, this.N.splice(d, 1);
                break
            }
            c && (this.Oa[a.id] = j, this.Pa[a.name] = j, (c = a.w()) && c.parentNode === this.ia() && this.ia().removeChild(a.w()))
        }
    }, t.uc = function() {
        var a, c, d, e;
        if (a = this, c = this.options().children) if (c instanceof Array) for (var g = 0; g < c.length; g++) d = c[g], "string" == typeof d ? (e = d, d = {}) : e = d.name, a[e] = a.V(e, d);
        else u.l.wa(c, function(c, d) {
                d !== l && (a[c] = a.V(c, d))
            })
    }, t.S = r(""), t.d = function(a, c) {
        return u.d(this.b, a, u.bind(this, c)), this
    }, t.p = function(a, c) {
        return u.p(this.b, a, c), this
    }, t.W = function(a, c) {
        return u.W(this.b, a, u.bind(this, c)), this
    }, t.k = function(a, c) {
        return u.k(this.b, a, c), this
    }, t.J = function(a) {
        return a && (this.ca ? a.call(this) : (this.Za === b && (this.Za = []), this.Za.push(a))), this
    }, t.Ea = function() {
        this.ca = f;
        var a = this.Za;
        if (a && 0 < a.length) {
            for (var c = 0, d = a.length; d > c; c++) a[c].call(this);
            this.Za = [], this.k("ready")
        }
    }, t.o = function(a) {
        return u.o(this.b, a), this
    }, t.r = function(a) {
        return u.r(this.b, a), this
    }, t.show = function() {
        return this.b.style.display = "block", this
    }, t.G = function() {
        return this.b.style.display = "none", this
    }, t.disable = function() {
        this.G(), this.show = m()
    }, t.width = function(a, c) {
        return H(this, "width", a, c)
    }, t.height = function(a, c) {
        return H(this, "height", a, c)
    }, t.jd = function(a, c) {
        return this.width(a, f).height(c)
    }, u.s = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c), I(this), this.d("tap", this.q), this.d("click", this.q), this.d("focus", this.Va), this.d("blur", this.Ua)
        }
    }), t = u.s.prototype, t.e = function(a, c) {
        var d;
        return c = u.l.B({
            className: this.S(),
            role: "button",
            "aria-live": "polite",
            tabIndex: 0
        }, c), d = u.a.prototype.e.call(this, a, c), c.innerHTML || (this.u = u.e("div", {
            className: "vjs-control-content"
        }), this.wb = u.e("span", {
            className: "vjs-control-text",
            innerHTML: this.sa || "Need Text"
        }), this.u.appendChild(this.wb), d.appendChild(this.u)), d
    }, t.S = function() {
        return "vjs-control " + u.a.prototype.S.call(this)
    }, t.q = m(), t.Va = function() {
        u.d(document, "keyup", u.bind(this, this.da))
    }, t.da = function(a) {
        (32 == a.which || 13 == a.which) && (a.preventDefault(), this.q())
    }, t.Ua = function() {
        u.p(document, "keyup", u.bind(this, this.da))
    }, u.Q = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c), this.ad = this.ja(this.j.barName), this.handle = this.ja(this.j.handleName), this.d("mousedown", this.Wa), this.d("touchstart", this.Wa), this.d("focus", this.Va), this.d("blur", this.Ua), this.d("click", this.q), this.c.d("controlsvisible", u.bind(this, this.update)), a.d(this.Ac, u.bind(this, this.update)), this.R = {}
        }
    }), t = u.Q.prototype, t.e = function(a, c) {
        return c = c || {}, c.className += " vjs-slider", c = u.l.B({
            role: "slider",
            "aria-valuenow": 0,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            tabIndex: 0
        }, c), u.a.prototype.e.call(this, a, c)
    }, t.Wa = function(a) {
        a.preventDefault(), u.bd(), this.R.move = u.bind(this, this.Kb), this.R.end = u.bind(this, this.Lb), u.d(document, "mousemove", this.R.move), u.d(document, "mouseup", this.R.end), u.d(document, "touchmove", this.R.move), u.d(document, "touchend", this.R.end), this.Kb(a)
    }, t.Lb = function() {
        u.Td(), u.p(document, "mousemove", this.R.move, l), u.p(document, "mouseup", this.R.end, l), u.p(document, "touchmove", this.R.move, l), u.p(document, "touchend", this.R.end, l), this.update()
    }, t.update = function() {
        if (this.b) {
            var a, c = this.Cb(),
                d = this.handle,
                e = this.ad;
            if (isNaN(c) && (c = 0), a = c, d) {
                a = this.b.offsetWidth;
                var g = d.w().offsetWidth;
                a = g ? g / a : 0, c *= 1 - a, a = c + a / 2, d.w().style.left = u.round(100 * c, 2) + "%"
            }
            e.w().style.width = u.round(100 * a, 2) + "%"
        }
    }, t.Va = function() {
        u.d(document, "keyup", u.bind(this, this.da))
    }, t.da = function(a) {
        37 == a.which ? (a.preventDefault(), this.Gc()) : 39 == a.which && (a.preventDefault(), this.Hc())
    }, t.Ua = function() {
        u.p(document, "keyup", u.bind(this, this.da))
    }, t.q = function(a) {
        a.stopImmediatePropagation(), a.preventDefault()
    }, u.Y = u.a.extend(), u.Y.prototype.defaultValue = 0, u.Y.prototype.e = function(a, c) {
        return c = c || {}, c.className += " vjs-slider-handle", c = u.l.B({
            innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
        }, c), u.a.prototype.e.call(this, "div", c)
    }, u.ga = u.a.extend(), u.ga.prototype.e = function() {
        var a = this.options().kc || "ul";
        return this.u = u.e(a, {
            className: "vjs-menu-content"
        }), a = u.a.prototype.e.call(this, "div", {
            append: this.u,
            className: "vjs-menu"
        }), a.appendChild(this.u), u.d(a, "click", function(a) {
            a.preventDefault(), a.stopImmediatePropagation()
        }), a
    }, u.I = u.s.extend({
        h: function(a, c) {
            u.s.call(this, a, c), this.selected(c.selected)
        }
    }), u.I.prototype.e = function(a, c) {
        return u.s.prototype.e.call(this, "li", u.l.B({
            className: "vjs-menu-item",
            innerHTML: this.j.label
        }, c))
    }, u.I.prototype.q = function() {
        this.selected(f)
    }, u.I.prototype.selected = function(a) {
        a ? (this.o("vjs-selected"), this.b.setAttribute("aria-selected", f)) : (this.r("vjs-selected"), this.b.setAttribute("aria-selected", l))
    }, u.L = u.s.extend({
        h: function(a, c) {
            u.s.call(this, a, c), this.za = this.va(), this.V(this.za), this.O && 0 === this.O.length && this.G(), this.d("keyup", this.da), this.b.setAttribute("aria-haspopup", f), this.b.setAttribute("role", "button")
        }
    }), t = u.L.prototype, t.ra = l, t.va = function() {
        var a = new u.ga(this.c);
        if (this.options().title && a.ia().appendChild(u.e("li", {
                className: "vjs-menu-title",
                innerHTML: u.$(this.options().title),
                Rd: -1
            })), this.O = this.createItems()) for (var c = 0; c < this.O.length; c++) ca(a, this.O[c]);
        return a
    }, t.ua = m(), t.S = function() {
        return this.className + " vjs-menu-button " + u.s.prototype.S.call(this)
    }, t.Va = m(), t.Ua = m(), t.q = function() {
        this.W("mouseout", u.bind(this, function() {
            G(this.za), this.b.blur()
        })), this.ra ? K(this) : L(this)
    }, t.da = function(a) {
        a.preventDefault(), 32 == a.which || 13 == a.which ? this.ra ? K(this) : L(this) : 27 == a.which && this.ra && K(this)
    }, u.F = function(a) {
        "number" == typeof a ? this.code = a : "string" == typeof a ? this.message = a : "object" == typeof a && u.l.B(this, a), this.message || (this.message = u.F.gd[this.code] || "")
    }, u.F.prototype.code = 0, u.F.prototype.message = "", u.F.prototype.status = j, u.F.Ra = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" "), u.F.gd = {
        1: "You aborted the video playback",
        2: "A network error caused the video download to fail part-way.",
        3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",
        4: "The video could not be loaded, either because the server or network failed or because the format is not supported.",
        5: "The video is encrypted and we do not have the keys to decrypt it."
    };
    for (var M = 0; M < u.F.Ra.length; M++) u.F[u.F.Ra[M]] = M, u.F.prototype[u.F.Ra[M]] = M;
    var N, O, P, Q;
    for (N = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], O = N[0], Q = 0; Q < N.length; Q++) if (N[Q][1] in document) {
        P = N[Q];
        break
    }
    if (P) for (u.Na.Ab = {}, Q = 0; Q < P.length; Q++) u.Na.Ab[O[Q]] = P[Q];
    u.Player = u.a.extend({
        h: function(a, c, d) {
            this.P = a, a.id = a.id || "vjs_video_" + u.v++, c = u.l.B(da(a), c), this.z = {}, this.Bc = c.poster, this.xb = c.controls, a.controls = l, c.Ec = l, u.a.call(this, this, c, d), this.controls() ? this.o("vjs-controls-enabled") : this.o("vjs-controls-disabled"), u.Aa[this.T] = this, c.plugins && u.l.wa(c.plugins, function(a, c) {
                this[a](c)
            }, this);
            var e, g, h, k, p, n;
            e = u.bind(this, this.reportUserActivity), this.d("mousedown", function() {
                e(), clearInterval(g), g = setInterval(e, 250)
            }), this.d("mousemove", function(a) {
                (a.screenX != p || a.screenY != n) && (p = a.screenX, n = a.screenY, e())
            }), this.d("mouseup", function() {
                e(), clearInterval(g)
            }), this.d("keydown", e), this.d("keyup", e), h = setInterval(u.bind(this, function() {
                this.na && (this.na = l, this.userActive(f), clearTimeout(k), k = setTimeout(u.bind(this, function() {
                    this.na || this.userActive(l)
                }), 2e3))
            }), 250), this.d("dispose", function() {
                clearInterval(h), clearTimeout(k)
            })
        }
    }), t = u.Player.prototype, t.j = u.options, t.dispose = function() {
        this.k("dispose"), this.p("dispose"), u.Aa[this.T] = j, this.P && this.P.player && (this.P.player = j), this.b && this.b.player && (this.b.player = j), clearInterval(this.Ya), this.Ba(), this.g && this.g.dispose(), u.a.prototype.dispose.call(this)
    }, t.e = function() {
        var a = this.b = u.a.prototype.e.call(this, "div"),
            c = this.P;
        if (c.removeAttribute("width"), c.removeAttribute("height"), c.hasChildNodes()) {
            var d, e, g, h, k;
            for (d = c.childNodes, e = d.length, k = []; e--;) g = d[e], h = g.nodeName.toLowerCase(), "track" === h && k.push(g);
            for (d = 0; d < k.length; d++) c.removeChild(k[d])
        }
        return a.id = c.id, a.className = c.className, c.id += "_html5_api", c.className = "vjs-tech", c.player = a.player = this, this.o("vjs-paused"), this.width(this.j.width, f), this.height(this.j.height, f), c.parentNode && c.parentNode.insertBefore(a, c), u.Db(c, a), this.b = a, this.d("loadstart", this.Bd), this.d("ended", this.xd), this.d("play", this.Nb), this.d("firstplay", this.zd), this.d("pause", this.Mb), this.d("progress", this.Cd), this.d("durationchange", this.yc), this.d("fullscreenchange", this.Ad), a
    }, t.Kc = function() {
        this.lc && this.Ba(), this.lc = setInterval(u.bind(this, function() {
            this.k("timeupdate")
        }), 250)
    }, t.Ba = function() {
        clearInterval(this.lc), this.k("timeupdate")
    }, t.Bd = function() {
        this.error(j), this.paused() ? (T(this, l), this.W("play", function() {
            T(this, f)
        })) : this.k("firstplay")
    }, t.tc = l, t.Nb = function() {
        u.r(this.b, "vjs-paused"), u.o(this.b, "vjs-playing")
    }, t.zd = function() {
        this.j.starttime && this.currentTime(this.j.starttime), this.o("vjs-has-started")
    }, t.Mb = function() {
        u.r(this.b, "vjs-playing"), u.o(this.b, "vjs-paused")
    }, t.Cd = function() {
        1 == this.bufferedPercent() && this.k("loadedalldata")
    }, t.xd = function() {
        this.j.loop && (this.currentTime(0), this.play())
    }, t.yc = function() {
        var a = U(this, "duration");
        a && (0 > a && (a = 1 / 0), this.duration(a), 1 / 0 === a ? this.o("vjs-live") : this.r("vjs-live"))
    }, t.Ad = function() {
        this.isFullscreen() ? this.o("vjs-fullscreen") : this.r("vjs-fullscreen")
    }, t.play = function() {
        return V(this, "play"), this
    }, t.pause = function() {
        return V(this, "pause"), this
    }, t.paused = function() {
        return U(this, "paused") === l ? l : f
    }, t.currentTime = function(a) {
        return a !== b ? (V(this, "setCurrentTime", a), this.Ib && this.k("timeupdate"), this) : this.z.currentTime = U(this, "currentTime") || 0
    }, t.duration = function(a) {
        return a !== b ? (this.z.duration = parseFloat(a), this) : (this.z.duration === b && this.yc(), this.z.duration || 0)
    }, t.buffered = function() {
        var a = U(this, "buffered"),
            c = a.length - 1,
            d = this.z.sb = this.z.sb || 0;
        return a && c >= 0 && a.end(c) !== d && (d = a.end(c), this.z.sb = d), u.yb(0, d)
    }, t.bufferedPercent = function() {
        return this.duration() ? this.buffered().end(0) / this.duration() : 0
    }, t.volume = function(a) {
        return a !== b ? (a = Math.max(0, Math.min(1, parseFloat(a))), this.z.volume = a, V(this, "setVolume", a), u.Kd(a), this) : (a = parseFloat(U(this, "volume")), isNaN(a) ? 1 : a)
    }, t.muted = function(a) {
        return a !== b ? (V(this, "setMuted", a), this) : U(this, "muted") || l
    }, t.ab = function() {
        return U(this, "supportsFullScreen") || l
    }, t.vc = l, t.isFullscreen = function(a) {
        return a !== b ? (this.vc = !! a, this) : this.vc
    }, t.isFullScreen = function(a) {
        return u.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")'), this.isFullscreen(a)
    }, t.requestFullscreen = function() {
        var a = u.Na.Ab;
        return this.isFullscreen(f), a ? (u.d(document, a.fullscreenchange, u.bind(this, function(c) {
            this.isFullscreen(document[a.fullscreenElement]), this.isFullscreen() === l && u.p(document, a.fullscreenchange, arguments.callee), this.k("fullscreenchange")
        })), this.b[a.requestFullscreen]()) : this.g.ab() ? V(this, "enterFullScreen") : (this.sd = f, this.kd = document.documentElement.style.overflow, u.d(document, "keydown", u.bind(this, this.pc)), document.documentElement.style.overflow = "hidden", u.o(document.body, "vjs-full-window"), this.k("enterFullWindow"), this.k("fullscreenchange")), this
    }, t.exitFullscreen = function() {
        var a = u.Na.Ab;
        return this.isFullscreen(l), a ? document[a.exitFullscreen]() : this.g.ab() ? V(this, "exitFullScreen") : (ea(this), this.k("fullscreenchange")), this
    }, t.pc = function(a) {
        27 === a.keyCode && (this.isFullscreen() === f ? this.exitFullscreen() : ea(this))
    }, t.src = function(a) {
        if (a === b) return U(this, "src");
        if (a instanceof Array) {
            var c;
            a: {
                c = a;
                for (var d = 0, e = this.j.techOrder; d < e.length; d++) {
                    var g = u.$(e[d]),
                        h = window.videojs[g];
                    if (h) {
                        if (h.isSupported()) for (var k = 0, p = c; k < p.length; k++) {
                            var n = p[k];
                            if (h.canPlaySource(n)) {
                                c = {
                                    source: n,
                                    g: g
                                };
                                break a
                            }
                        }
                    } else u.log.error('The "' + g + '" tech is undefined. Skipped browser support check for that tech.')
                }
                c = l
            }
            c ? (a = c.source, c = c.g, c == this.Ca ? this.src(a) : R(this, c, a)) : (this.error({
                code: 4,
                message: this.options().notSupportedMessage
            }), this.Ea())
        } else a instanceof Object ? window.videojs[this.Ca].canPlaySource(a) ? this.src(a.src) : this.src([a]) : (this.z.src = a, this.ca ? (V(this, "src", a), "auto" == this.j.preload && this.load(), this.j.autoplay && this.play()) : this.J(function() {
            this.src(a)
        }));
        return this
    }, t.load = function() {
        return V(this, "load"), this
    }, t.currentSrc = function() {
        return U(this, "currentSrc") || this.z.src || ""
    }, t.Xa = function(a) {
        return a !== b ? (V(this, "setPreload", a), this.j.preload = a, this) : U(this, "preload")
    }, t.autoplay = function(a) {
        return a !== b ? (V(this, "setAutoplay", a), this.j.autoplay = a, this) : U(this, "autoplay")
    }, t.loop = function(a) {
        return a !== b ? (V(this, "setLoop", a), this.j.loop = a, this) : U(this, "loop")
    }, t.poster = function(a) {
        return a === b ? this.Bc : (this.Bc = a, V(this, "setPoster", a), void this.k("posterchange"))
    }, t.controls = function(a) {
        return a !== b ? (a = !! a, this.xb !== a && ((this.xb = a) ? (this.r("vjs-controls-disabled"), this.o("vjs-controls-enabled"), this.k("controlsenabled")) : (this.r("vjs-controls-enabled"), this.o("vjs-controls-disabled"), this.k("controlsdisabled"))), this) : this.xb
    }, u.Player.prototype.Sb, t = u.Player.prototype, t.usingNativeControls = function(a) {
        return a !== b ? (a = !! a, this.Sb !== a && ((this.Sb = a) ? (this.o("vjs-using-native-controls"), this.k("usingnativecontrols")) : (this.r("vjs-using-native-controls"), this.k("usingcustomcontrols"))), this) : this.Sb
    }, t.ba = j, t.error = function(a) {
        return a === b ? this.ba : a === j ? (this.ba = a, this.r("vjs-error"), this) : (this.ba = a instanceof u.F ? a : new u.F(a), this.k("error"), this.o("vjs-error"), u.log.error("(CODE:" + this.ba.code + " " + u.F.Ra[this.ba.code] + ")", this.ba.message, this.ba), this)
    }, t.ended = function() {
        return U(this, "ended")
    }, t.seeking = function() {
        return U(this, "seeking")
    }, t.na = f, t.reportUserActivity = function() {
        this.na = f
    }, t.Rb = f, t.userActive = function(a) {
        return a !== b ? (a = !! a, a !== this.Rb && ((this.Rb = a) ? (this.na = f, this.r("vjs-user-inactive"), this.o("vjs-user-active"), this.k("useractive")) : (this.na = l, this.g && this.g.W("mousemove", function(a) {
            a.stopPropagation(), a.preventDefault()
        }), this.r("vjs-user-active"), this.o("vjs-user-inactive"), this.k("userinactive"))), this) : this.Rb
    }, t.playbackRate = function(a) {
        return a !== b ? (V(this, "setPlaybackRate", a), this) : this.g && this.g.n && this.g.n.playbackRate ? U(this, "playbackRate") : 1
    }, u.Ha = u.a.extend(), u.Ha.prototype.j = {
        ee: "play",
        children: {
            playToggle: {},
            currentTimeDisplay: {},
            timeDivider: {},
            durationDisplay: {},
            remainingTimeDisplay: {},
            liveDisplay: {},
            progressControl: {},
            fullscreenToggle: {},
            volumeControl: {},
            muteToggle: {},
            playbackRateMenuButton: {}
        }
    }, u.Ha.prototype.e = function() {
        return u.e("div", {
            className: "vjs-control-bar"
        })
    }, u.Yb = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c)
        }
    }), u.Yb.prototype.e = function() {
        var a = u.a.prototype.e.call(this, "div", {
            className: "vjs-live-controls vjs-control"
        });
        return this.u = u.e("div", {
            className: "vjs-live-display",
            innerHTML: '<span class="vjs-control-text">Stream Type </span>LIVE',
            "aria-live": "off"
        }), a.appendChild(this.u), a
    }, u.ac = u.s.extend({
        h: function(a, c) {
            u.s.call(this, a, c), a.d("play", u.bind(this, this.Nb)), a.d("pause", u.bind(this, this.Mb))
        }
    }), t = u.ac.prototype, t.sa = "Play", t.S = function() {
        return "vjs-play-control " + u.s.prototype.S.call(this)
    }, t.q = function() {
        this.c.paused() ? this.c.play() : this.c.pause()
    }, t.Nb = function() {
        u.r(this.b, "vjs-paused"), u.o(this.b, "vjs-playing"), this.b.children[0].children[0].innerHTML = "Pause"
    }, t.Mb = function() {
        u.r(this.b, "vjs-playing"), u.o(this.b, "vjs-paused"), this.b.children[0].children[0].innerHTML = "Play"
    }, u.eb = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c), a.d("timeupdate", u.bind(this, this.fa))
        }
    }), u.eb.prototype.e = function() {
        var a = u.a.prototype.e.call(this, "div", {
            className: "vjs-current-time vjs-time-controls vjs-control"
        });
        return this.u = u.e("div", {
            className: "vjs-current-time-display",
            innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
            "aria-live": "off"
        }), a.appendChild(this.u), a
    }, u.eb.prototype.fa = function() {
        var a = this.c.$a ? this.c.z.currentTime : this.c.currentTime();
        this.u.innerHTML = '<span class="vjs-control-text">Current Time </span>' + u.ya(a, this.c.duration())
    }, u.fb = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c), a.d("timeupdate", u.bind(this, this.fa))
        }
    }), u.fb.prototype.e = function() {
        var a = u.a.prototype.e.call(this, "div", {
            className: "vjs-duration vjs-time-controls vjs-control"
        });
        return this.u = u.e("div", {
            className: "vjs-duration-display",
            innerHTML: '<span class="vjs-control-text">Duration Time </span>0:00',
            "aria-live": "off"
        }), a.appendChild(this.u), a
    }, u.fb.prototype.fa = function() {
        var a = this.c.duration();
        a && (this.u.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + u.ya(a))
    }, u.gc = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c)
        }
    }), u.gc.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-time-divider",
            innerHTML: "<div><span>/</span></div>"
        })
    }, u.mb = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c), a.d("timeupdate", u.bind(this, this.fa))
        }
    }), u.mb.prototype.e = function() {
        var a = u.a.prototype.e.call(this, "div", {
            className: "vjs-remaining-time vjs-time-controls vjs-control"
        });
        return this.u = u.e("div", {
            className: "vjs-remaining-time-display",
            innerHTML: '<span class="vjs-control-text">Remaining Time </span>-0:00',
            "aria-live": "off"
        }), a.appendChild(this.u), a
    }, u.mb.prototype.fa = function() {
        this.c.duration() && (this.u.innerHTML = '<span class="vjs-control-text">Remaining Time </span>-' + u.ya(this.c.duration() - this.c.currentTime()))
    }, u.Ia = u.s.extend({
        h: function(a, c) {
            u.s.call(this, a, c)
        }
    }), u.Ia.prototype.sa = "Fullscreen", u.Ia.prototype.S = function() {
        return "vjs-fullscreen-control " + u.s.prototype.S.call(this)
    }, u.Ia.prototype.q = function() {
        this.c.isFullscreen() ? (this.c.exitFullscreen(), this.wb.innerHTML = "Fullscreen") : (this.c.requestFullscreen(), this.wb.innerHTML = "Non-Fullscreen")
    }, u.lb = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c)
        }
    }), u.lb.prototype.j = {
        children: {
            seekBar: {}
        }
    }, u.lb.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-progress-control vjs-control"
        })
    }, u.cc = u.Q.extend({
        h: function(a, c) {
            u.Q.call(this, a, c), a.d("timeupdate", u.bind(this, this.ma)), a.J(u.bind(this, this.ma))
        }
    }), t = u.cc.prototype, t.j = {
        children: {
            loadProgressBar: {},
            playProgressBar: {},
            seekHandle: {}
        },
        barName: "playProgressBar",
        handleName: "seekHandle"
    }, t.Ac = "timeupdate", t.e = function() {
        return u.Q.prototype.e.call(this, "div", {
            className: "vjs-progress-holder",
            "aria-label": "video progress bar"
        })
    }, t.ma = function() {
        var a = this.c.$a ? this.c.z.currentTime : this.c.currentTime();
        this.b.setAttribute("aria-valuenow", u.round(100 * this.Cb(), 2)), this.b.setAttribute("aria-valuetext", u.ya(a, this.c.duration()))
    }, t.Cb = function() {
        return this.c.currentTime() / this.c.duration()
    }, t.Wa = function(a) {
        u.Q.prototype.Wa.call(this, a), this.c.$a = f, this.Wd = !this.c.paused(), this.c.pause()
    }, t.Kb = function(a) {
        a = J(this, a) * this.c.duration(), a == this.c.duration() && (a -= .1), this.c.currentTime(a)
    }, t.Lb = function(a) {
        u.Q.prototype.Lb.call(this, a), this.c.$a = l, this.Wd && this.c.play()
    }, t.Hc = function() {
        this.c.currentTime(this.c.currentTime() + 5)
    }, t.Gc = function() {
        this.c.currentTime(this.c.currentTime() - 5)
    }, u.ib = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c), a.d("progress", u.bind(this, this.update))
        }
    }), u.ib.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-load-progress",
            innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
        })
    }, u.ib.prototype.update = function() {
        this.b.style && (this.b.style.width = u.round(100 * this.c.bufferedPercent(), 2) + "%")
    }, u.$b = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c)
        }
    }), u.$b.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-play-progress",
            innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
        })
    }, u.Ka = u.Y.extend({
        h: function(a, c) {
            u.Y.call(this, a, c), a.d("timeupdate", u.bind(this, this.fa))
        }
    }), u.Ka.prototype.defaultValue = "00:00", u.Ka.prototype.e = function() {
        return u.Y.prototype.e.call(this, "div", {
            className: "vjs-seek-handle",
            "aria-live": "off"
        })
    }, u.Ka.prototype.fa = function() {
        var a = this.c.$a ? this.c.z.currentTime : this.c.currentTime();
        this.b.innerHTML = '<span class="vjs-control-text">' + u.ya(a, this.c.duration()) + "</span>"
    }, u.ob = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c), a.g && a.g.n && a.g.n.volumeControl === l && this.o("vjs-hidden"), a.d("loadstart", u.bind(this, function() {
                a.g.n && a.g.n.volumeControl === l ? this.o("vjs-hidden") : this.r("vjs-hidden")
            }))
        }
    }), u.ob.prototype.j = {
        children: {
            volumeBar: {}
        }
    }, u.ob.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-volume-control vjs-control"
        })
    }, u.nb = u.Q.extend({
        h: function(a, c) {
            u.Q.call(this, a, c), a.d("volumechange", u.bind(this, this.ma)), a.J(u.bind(this, this.ma))
        }
    }), t = u.nb.prototype, t.ma = function() {
        this.b.setAttribute("aria-valuenow", u.round(100 * this.c.volume(), 2)), this.b.setAttribute("aria-valuetext", u.round(100 * this.c.volume(), 2) + "%")
    }, t.j = {
        children: {
            volumeLevel: {},
            volumeHandle: {}
        },
        barName: "volumeLevel",
        handleName: "volumeHandle"
    }, t.Ac = "volumechange", t.e = function() {
        return u.Q.prototype.e.call(this, "div", {
            className: "vjs-volume-bar",
            "aria-label": "volume level"
        })
    }, t.Kb = function(a) {
        this.c.muted() && this.c.muted(l), this.c.volume(J(this, a))
    }, t.Cb = function() {
        return this.c.muted() ? 0 : this.c.volume()
    }, t.Hc = function() {
        this.c.volume(this.c.volume() + .1)
    }, t.Gc = function() {
        this.c.volume(this.c.volume() - .1)
    }, u.hc = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c)
        }
    }), u.hc.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-volume-level",
            innerHTML: '<span class="vjs-control-text"></span>'
        })
    }, u.pb = u.Y.extend(), u.pb.prototype.defaultValue = "00:00", u.pb.prototype.e = function() {
        return u.Y.prototype.e.call(this, "div", {
            className: "vjs-volume-handle"
        })
    }, u.ha = u.s.extend({
        h: function(a, c) {
            u.s.call(this, a, c), a.d("volumechange", u.bind(this, this.update)), a.g && a.g.n && a.g.n.volumeControl === l && this.o("vjs-hidden"), a.d("loadstart", u.bind(this, function() {
                a.g.n && a.g.n.volumeControl === l ? this.o("vjs-hidden") : this.r("vjs-hidden")
            }))
        }
    }), u.ha.prototype.e = function() {
        return u.s.prototype.e.call(this, "div", {
            className: "vjs-mute-control vjs-control",
            innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
        })
    }, u.ha.prototype.q = function() {
        this.c.muted(this.c.muted() ? l : f)
    }, u.ha.prototype.update = function() {
        var a = this.c.volume(),
            c = 3;
        for (0 === a || this.c.muted() ? c = 0 : .33 > a ? c = 1 : .67 > a && (c = 2), this.c.muted() ? "Unmute" != this.b.children[0].children[0].innerHTML && (this.b.children[0].children[0].innerHTML = "Unmute") : "Mute" != this.b.children[0].children[0].innerHTML && (this.b.children[0].children[0].innerHTML = "Mute"), a = 0; 4 > a; a++) u.r(this.b, "vjs-vol-" + a);
        u.o(this.b, "vjs-vol-" + c)
    }, u.qa = u.L.extend({
        h: function(a, c) {
            u.L.call(this, a, c), a.d("volumechange", u.bind(this, this.update)), a.g && a.g.n && a.g.n.Nc === l && this.o("vjs-hidden"), a.d("loadstart", u.bind(this, function() {
                a.g.n && a.g.n.Nc === l ? this.o("vjs-hidden") : this.r("vjs-hidden")
            })), this.o("vjs-menu-button")
        }
    }), u.qa.prototype.va = function() {
        var a = new u.ga(this.c, {
                kc: "div"
            }),
            c = new u.nb(this.c, u.l.B({
                Vd: f
            }, this.j.le));
        return a.V(c), a
    }, u.qa.prototype.q = function() {
        u.ha.prototype.q.call(this), u.L.prototype.q.call(this)
    }, u.qa.prototype.e = function() {
        return u.s.prototype.e.call(this, "div", {
            className: "vjs-volume-menu-button vjs-menu-button vjs-control",
            innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
        })
    }, u.qa.prototype.update = u.ha.prototype.update, u.bc = u.L.extend({
        h: function(a, c) {
            u.L.call(this, a, c), this.Mc(), this.Lc(), a.d("loadstart", u.bind(this, this.Mc)), a.d("ratechange", u.bind(this, this.Lc))
        }
    }), t = u.bc.prototype, t.e = function() {
        var a = u.a.prototype.e.call(this, "div", {
            className: "vjs-playback-rate vjs-menu-button vjs-control",
            innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">Playback Rate</span></div>'
        });
        return this.xc = u.e("div", {
            className: "vjs-playback-rate-value",
            innerHTML: 1
        }), a.appendChild(this.xc), a
    }, t.va = function() {
        var a = new u.ga(this.m()),
            c = this.m().options().playbackRates;
        if (c) for (var d = c.length - 1; d >= 0; d--) a.V(new u.kb(this.m(), {
            rate: c[d] + "x"
        }));
        return a
    }, t.ma = function() {
        this.w().setAttribute("aria-valuenow", this.m().playbackRate())
    }, t.q = function() {
        for (var a = this.m().playbackRate(), c = this.m().options().playbackRates, d = c[0], e = 0; e < c.length; e++) if (c[e] > a) {
            d = c[e];
            break
        }
        this.m().playbackRate(d)
    }, t.Mc = function() {
        fa(this) ? this.r("vjs-hidden") : this.o("vjs-hidden")
    }, t.Lc = function() {
        fa(this) && (this.xc.innerHTML = this.m().playbackRate() + "x")
    }, u.kb = u.I.extend({
        kc: "button",
        h: function(a, c) {
            var d = this.label = c.rate,
                e = this.Cc = parseFloat(d, 10);
            c.label = d, c.selected = 1 === e, u.I.call(this, a, c), this.m().d("ratechange", u.bind(this, this.update))
        }
    }), u.kb.prototype.q = function() {
        u.I.prototype.q.call(this), this.m().playbackRate(this.Cc)
    }, u.kb.prototype.update = function() {
        this.selected(this.m().playbackRate() == this.Cc)
    }, u.Ja = u.s.extend({
        h: function(a, c) {
            u.s.call(this, a, c), a.poster() && this.src(a.poster()), (!a.poster() || !a.controls()) && this.G(), a.d("posterchange", u.bind(this, function() {
                this.src(a.poster())
            })), a.d("play", u.bind(this, this.G))
        }
    });
    var ga = "backgroundSize" in u.A.style;
    u.Ja.prototype.e = function() {
        var a = u.e("div", {
            className: "vjs-poster",
            tabIndex: -1
        });
        return ga || a.appendChild(u.e("img")), a
    }, u.Ja.prototype.src = function(a) {
        var c = this.w();
        a !== b && (ga ? c.style.backgroundImage = 'url("' + a + '")' : c.firstChild.src = a)
    }, u.Ja.prototype.q = function() {
        this.m().controls() && this.c.play()
    }, u.Zb = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c), a.d("canplay", u.bind(this, this.G)), a.d("canplaythrough", u.bind(this, this.G)), a.d("playing", u.bind(this, this.G)), a.d("seeking", u.bind(this, this.show)), a.d("seeked", u.bind(this, this.G)), a.d("ended", u.bind(this, this.G)), a.d("waiting", u.bind(this, this.show))
        }
    }), u.Zb.prototype.e = function() {
        return u.a.prototype.e.call(this, "div", {
            className: "vjs-loading-spinner"
        })
    }, u.bb = u.s.extend(), u.bb.prototype.e = function() {
        return u.s.prototype.e.call(this, "div", {
            className: "vjs-big-play-button",
            innerHTML: '<span aria-hidden="true"></span>',
            "aria-label": "play video"
        })
    }, u.bb.prototype.q = function() {
        this.c.play()
    }, u.gb = u.a.extend({
        h: function(a, c) {
            u.a.call(this, a, c), this.update(), a.d("error", u.bind(this, this.update))
        }
    }), u.gb.prototype.e = function() {
        var a = u.a.prototype.e.call(this, "div", {
            className: "vjs-error-display"
        });
        return this.u = u.e("div"), a.appendChild(this.u), a
    }, u.gb.prototype.update = function() {
        this.m().error() && (this.u.innerHTML = this.m().error().message)
    }, u.t = u.a.extend({
        h: function(a, c, d) {
            c = c || {}, c.Ec = l, u.a.call(this, a, c, d);
            var e, g;
            g = this, e = this.m(), a = function() {
                if (e.controls() && !e.usingNativeControls()) {
                    var a;
                    g.d("mousedown", g.q), g.d("touchstart", function(c) {
                        c.preventDefault(), a = this.c.userActive()
                    }), g.d("touchmove", function() {
                        a && this.m().reportUserActivity()
                    }), I(g), g.d("tap", g.Dd)
                }
            }, c = u.bind(g, g.Hd), this.J(a), e.d("controlsenabled", a), e.d("controlsdisabled", c), this.J(function() {
                this.networkState && 0 < this.networkState() && this.m().k("loadstart")
            })
        }
    }), t = u.t.prototype, t.Hd = function() {
        this.p("tap"), this.p("touchstart"), this.p("touchmove"), this.p("touchleave"), this.p("touchcancel"), this.p("touchend"), this.p("click"), this.p("mousedown")
    }, t.q = function(a) {
        0 === a.button && this.m().controls() && (this.m().paused() ? this.m().play() : this.m().pause())
    }, t.Dd = function() {
        this.m().userActive(!this.m().userActive())
    }, t.Pb = m(), t.n = {
        volumeControl: f,
        fullscreenResize: l,
        playbackRate: l,
        progressEvents: l,
        timeupdateEvents: l
    }, u.media = {}, u.f = u.t.extend({
        h: function(a, c, d) {
            for (this.n.volumeControl = u.f.dd(), this.n.playbackRate = u.f.cd(), this.n.movingMediaElementInDOM = !u.Sc, this.n.fullscreenResize = f, u.t.call(this, a, c, d), d = u.f.hb.length - 1; d >= 0; d--) u.d(this.b, u.f.hb[d], u.bind(this, this.md));
            if ((c = c.source) && this.b.currentSrc !== c.src && (this.b.src = c.src), u.ec && a.options().nativeControlsForTouch !== l) {
                var e, g, h, k;
                e = this, g = this.m(), c = g.controls(), e.b.controls = !! c, h = function() {
                    e.b.controls = f
                }, k = function() {
                    e.b.controls = l
                }, g.d("controlsenabled", h), g.d("controlsdisabled", k), c = function() {
                    g.p("controlsenabled", h), g.p("controlsdisabled", k)
                }, e.d("dispose", c), g.d("usingcustomcontrols", c), g.usingNativeControls(f)
            }
            a.J(function() {
                this.P && this.j.autoplay && this.paused() && (delete this.P.poster, this.play())
            }), this.Ea()
        }
    }), t = u.f.prototype, t.dispose = function() {
        u.t.prototype.dispose.call(this)
    }, t.e = function() {
        var d, a = this.c,
            c = a.P;
        c && this.n.movingMediaElementInDOM !== l || (c ? (d = c.cloneNode(l), u.f.mc(c), c = d, a.P = j) : c = u.e("video", {
            id: a.id() + "_html5_api",
            className: "vjs-tech"
        }), c.player = a, u.Db(c, a.w())), d = ["autoplay", "preload", "loop", "muted"];
        for (var e = d.length - 1; e >= 0; e--) {
            var g = d[e];
            a.j[g] !== j && (c[g] = a.j[g])
        }
        return c
    }, t.md = function(a) {
        "error" == a.type ? this.m().error(this.error().code) : (a.bubbles = l, this.m().k(a))
    }, t.play = function() {
        this.b.play()
    }, t.pause = function() {
        this.b.pause()
    }, t.paused = function() {
        return this.b.paused
    }, t.currentTime = function() {
        return this.b.currentTime
    }, t.Jd = function(a) {
        try {
            this.b.currentTime = a
        } catch (c) {
            u.log(c, "Video is not ready. (Video.js)")
        }
    }, t.duration = function() {
        return this.b.duration || 0
    }, t.buffered = function() {
        return this.b.buffered
    }, t.volume = function() {
        return this.b.volume
    }, t.Pd = function(a) {
        this.b.volume = a
    }, t.muted = function() {
        return this.b.muted
    }, t.Md = function(a) {
        this.b.muted = a
    }, t.width = function() {
        return this.b.offsetWidth
    }, t.height = function() {
        return this.b.offsetHeight
    }, t.ab = function() {
        return "function" != typeof this.b.webkitEnterFullScreen || !/Android/.test(u.M) && /Chrome|Mac OS X 10.5/.test(u.M) ? l : f
    }, t.nc = function() {
        var a = this.b;
        a.paused && a.networkState <= a.Yd ? (this.b.play(), setTimeout(function() {
            a.pause(), a.webkitEnterFullScreen()
        }, 0)) : a.webkitEnterFullScreen()
    }, t.nd = function() {
        this.b.webkitExitFullScreen()
    }, t.src = function(a) {
        this.b.src = a
    }, t.load = function() {
        this.b.load()
    }, t.currentSrc = function() {
        return this.b.currentSrc
    }, t.poster = function() {
        return this.b.poster
    }, t.Pb = function(a) {
        this.b.poster = a
    }, t.Xa = function() {
        return this.b.Xa
    }, t.Od = function(a) {
        this.b.Xa = a
    }, t.autoplay = function() {
        return this.b.autoplay
    }, t.Id = function(a) {
        this.b.autoplay = a
    }, t.controls = function() {
        return this.b.controls
    }, t.loop = function() {
        return this.b.loop
    }, t.Ld = function(a) {
        this.b.loop = a
    }, t.error = function() {
        return this.b.error
    }, t.seeking = function() {
        return this.b.seeking
    }, t.ended = function() {
        return this.b.ended
    }, t.playbackRate = function() {
        return this.b.playbackRate
    }, t.Nd = function(a) {
        this.b.playbackRate = a
    }, t.networkState = function() {
        return this.b.networkState
    }, u.f.isSupported = function() {
        try {
            u.A.volume = .5
        } catch (a) {
            return l
        }
        return !!u.A.canPlayType
    }, u.f.tb = function(a) {
        try {
            return !!u.A.canPlayType(a.type)
        } catch (c) {
            return ""
        }
    }, u.f.dd = function() {
        var a = u.A.volume;
        return u.A.volume = a / 2 + .1, a !== u.A.volume
    }, u.f.cd = function() {
        var a = u.A.playbackRate;
        return u.A.playbackRate = a / 2 + .1, a !== u.A.playbackRate
    };
    var W, ha = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
        ia = /^video\/mp4/i;
    u.f.zc = function() {
        4 <= u.Tb && (W || (W = u.A.constructor.prototype.canPlayType), u.A.constructor.prototype.canPlayType = function(a) {
            return a && ha.test(a) ? "maybe" : W.call(this, a)
        }), u.Wc && (W || (W = u.A.constructor.prototype.canPlayType), u.A.constructor.prototype.canPlayType = function(a) {
            return a && ia.test(a) ? "maybe" : W.call(this, a)
        })
    }, u.f.Ud = function() {
        var a = u.A.constructor.prototype.canPlayType;
        return u.A.constructor.prototype.canPlayType = W, W = j, a
    }, u.f.zc(), u.f.hb = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" "), u.f.mc = function(a) {
        if (a) {
            for (a.player = j, a.parentNode && a.parentNode.removeChild(a); a.hasChildNodes();) a.removeChild(a.firstChild);
            if (a.removeAttribute("src"), "function" == typeof a.load) try {
                a.load()
            } catch (c) {}
        }
    }, u.i = u.t.extend({
        h: function(a, c, d) {
            u.t.call(this, a, c, d);
            var e = c.source;
            d = c.parentEl;
            var g = this.b = u.e("div", {
                    id: a.id() + "_temp_flash"
                }),
                h = a.id() + "_flash_api";
            a = a.j;
            var s, k = u.l.B({
                    readyFunction: "videojs.Flash.onReady",
                    eventProxyFunction: "videojs.Flash.onEvent",
                    errorEventProxyFunction: "videojs.Flash.onError",
                    autoplay: a.autoplay,
                    preload: a.Xa,
                    loop: a.loop,
                    muted: a.muted
                }, c.flashVars),
                p = u.l.B({
                    wmode: "opaque",
                    bgcolor: "#000000"
                }, c.params),
                n = u.l.B({
                    id: h,
                    name: h,
                    "class": "vjs-tech"
                }, c.attributes);
            if (e && (e.type && u.i.ud(e.type) ? (a = u.i.Ic(e.src), k.rtmpConnection = encodeURIComponent(a.vb), k.rtmpStream = encodeURIComponent(a.Qb)) : k.src = encodeURIComponent(u.qc(e.src))), this.setCurrentTime = function(a) {
                    s = a, this.b.vjs_setProperty("currentTime", a)
                }, this.currentTime = function() {
                    return this.seeking() ? s : this.b.vjs_getProperty("currentTime")
                }, u.Db(g, d), c.startTime && this.J(function() {
                    this.load(), this.play(), this.currentTime(c.startTime)
                }), u.Xb && this.J(function() {
                    u.d(this.w(), "mousemove", u.bind(this, function() {
                        this.m().k({
                            type: "mousemove",
                            bubbles: l
                        })
                    }))
                }), c.iFrameMode !== f || u.Xb) u.i.ld(c.swf, g, k, p, n);
            else {
                var C = u.e("iframe", {
                    id: h + "_iframe",
                    name: h + "_iframe",
                    className: "vjs-tech",
                    scrolling: "no",
                    marginWidth: 0,
                    marginHeight: 0,
                    frameBorder: 0
                });
                k.readyFunction = "ready", k.eventProxyFunction = "events", k.errorEventProxyFunction = "errors", u.d(C, "load", u.bind(this, function() {
                    var a, d = C.contentWindow;
                    a = C.contentDocument ? C.contentDocument : C.contentWindow.document, a.write(u.i.rc(c.swf, k, p, n)), d.player = this.c, d.ready = u.bind(this.c, function(c) {
                        var d = this.g;
                        d.b = a.getElementById(c), u.i.ub(d)
                    }), d.events = u.bind(this.c, function(a, c) {
                        this && "flash" === this.Ca && this.k(c)
                    }), d.errors = u.bind(this.c, function(a, c) {
                        u.log("Flash Error", c)
                    })
                })), g.parentNode.replaceChild(C, g)
            }
        }
    }), t = u.i.prototype, t.dispose = function() {
        u.t.prototype.dispose.call(this)
    }, t.play = function() {
        this.b.vjs_play()
    }, t.pause = function() {
        this.b.vjs_pause()
    }, t.src = function(a) {
        if (a === b) return this.currentSrc();
        if (u.i.td(a) ? (a = u.i.Ic(a), this.ge(a.vb), this.he(a.Qb)) : (a = u.qc(a), this.b.vjs_src(a)), this.c.autoplay()) {
            var c = this;
            setTimeout(function() {
                c.play()
            }, 0)
        }
    }, t.currentSrc = function() {
        var a = this.b.vjs_getProperty("currentSrc");
        if (a == j) {
            var c = this.rtmpConnection(),
                d = this.rtmpStream();
            c && d && (a = u.i.Qd(c, d))
        }
        return a
    }, t.load = function() {
        this.b.vjs_load()
    }, t.poster = function() {
        this.b.vjs_getProperty("poster")
    }, t.Pb = m(), t.buffered = function() {
        return u.yb(0, this.b.vjs_getProperty("buffered"))
    }, t.ab = r(l), t.nc = r(l);
    var ja = u.i.prototype,
        X = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),
        ka = "error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" "),
        Y;
    for (Y = 0; Y < X.length; Y++) ma(X[Y]), la();
    for (Y = 0; Y < ka.length; Y++) ma(ka[Y]);
    if (u.i.isSupported = function() {
            return 10 <= u.i.version()[0]
        }, u.i.tb = function(a) {
            return a.type ? (a = a.type.replace(/;.*/, "").toLowerCase(), a in u.i.pd || a in u.i.Jc ? "maybe" : void 0) : ""
        }, u.i.pd = {
            "video/flv": "FLV",
            "video/x-flv": "FLV",
            "video/mp4": "MP4",
            "video/m4v": "MP4"
        }, u.i.Jc = {
            "rtmp/mp4": "MP4",
            "rtmp/flv": "FLV"
        }, u.i.onReady = function(a) {
            a = u.w(a);
            var c = a.player || a.parentNode.player,
                d = c.g;
            a.player = c, d.b = a, u.i.ub(d)
        }, u.i.ub = function(a) {
            a.w().vjs_getProperty ? a.Ea() : setTimeout(function() {
                u.i.ub(a)
            }, 50)
        }, u.i.onEvent = function(a, c) {
            u.w(a).player.k(c)
        }, u.i.onError = function(a, c) {
            var d = u.w(a).player,
                e = "FLASH: " + c;
            "srcnotfound" == c ? d.error({
                code: 4,
                message: e
            }) : d.error(e)
        }, u.i.version = function() {
            var a = "0,0,0";
            try {
                a = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
            } catch (c) {
                try {
                    navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (a = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                } catch (d) {}
            }
            return a.split(",")
        }, u.i.ld = function(a, c, d, e, g) {
            a = u.i.rc(a, d, e, g), a = u.e("div", {
                innerHTML: a
            }).childNodes[0], d = c.parentNode, c.parentNode.replaceChild(a, c);
            var h = d.childNodes[0];
            setTimeout(function() {
                h.style.display = "block"
            }, 1e3)
        }, u.i.rc = function(a, c, d, e) {
            var g = "",
                h = "",
                k = "";
            return c && u.l.wa(c, function(a, c) {
                g += a + "=" + c + "&amp;"
            }), d = u.l.B({
                movie: a,
                flashvars: g,
                allowScriptAccess: "always",
                allowNetworking: "all"
            }, d), u.l.wa(d, function(a, c) {
                h += '<param name="' + a + '" value="' + c + '" />'
            }), e = u.l.B({
                data: a,
                width: "100%",
                height: "100%"
            }, e), u.l.wa(e, function(a, c) {
                k += a + '="' + c + '" '
            }), '<object type="application/x-shockwave-flash"' + k + ">" + h + "</object>"
        }, u.i.Qd = function(a, c) {
            return a + "&" + c
        }, u.i.Ic = function(a) {
            var c = {
                vb: "",
                Qb: ""
            };
            if (!a) return c;
            var e, d = a.indexOf("&");
            return -1 !== d ? e = d + 1 : (d = e = a.lastIndexOf("/") + 1, 0 === d && (d = e = a.length)), c.vb = a.substring(0, d), c.Qb = a.substring(e, a.length), c
        }, u.i.ud = function(a) {
            return a in u.i.Jc
        }, u.i.Yc = /^rtmp[set]?:\/\//i, u.i.td = function(a) {
            return u.i.Yc.test(a)
        }, u.Xc = u.a.extend({
            h: function(a, c, d) {
                if (u.a.call(this, a, c, d), a.j.sources && 0 !== a.j.sources.length) a.src(a.j.sources);
                else for (c = 0, d = a.j.techOrder; c < d.length; c++) {
                    var e = u.$(d[c]),
                        g = window.videojs[e];
                    if (g && g.isSupported()) {
                        R(a, e);
                        break
                    }
                }
            }
        }), u.Player.prototype.textTracks = function() {
            return this.Da = this.Da || []
        }, u.C = u.a.extend({
            h: function(a, c) {
                u.a.call(this, a, c), this.T = c.id || "vjs_" + c.kind + "_" + c.language + "_" + u.v++, this.Fc = c.src, this.hd = c["default"] || c.dflt, this.Sd = c.title, this.de = c.srclang, this.vd = c.label, this.aa = [], this.qb = [], this.ka = this.la = 0, this.c.d("fullscreenchange", u.bind(this, this.$c))
            }
        }), t = u.C.prototype, t.K = q("H"), t.src = q("Fc"), t.Qa = q("hd"), t.title = q("Sd"), t.label = q("vd"), t.ed = q("aa"), t.Zc = q("qb"), t.readyState = q("la"), t.mode = q("ka"), t.$c = function() {
            this.b.style.fontSize = this.c.isFullScreen() ? 140 * (screen.width / this.c.width()) + "%" : ""
        }, t.e = function() {
            return u.a.prototype.e.call(this, "div", {
                className: "vjs-" + this.H + " vjs-text-track"
            })
        }, t.show = function() {
            pa(this), this.ka = 2, u.a.prototype.show.call(this)
        }, t.G = function() {
            pa(this), this.ka = 1, u.a.prototype.G.call(this)
        }, t.disable = function() {
            2 == this.ka && this.G(), this.c.p("timeupdate", u.bind(this, this.update, this.T)), this.c.p("ended", u.bind(this, this.reset, this.T)), this.reset(), this.c.ja("textTrackDisplay").removeChild(this), this.ka = 0
        }, t.load = function() {
            0 === this.la && (this.la = 1, u.get(this.Fc, u.bind(this, this.Ed), u.bind(this, this.yd)))
        }, t.yd = function(a) {
            this.error = a, this.la = 3, this.k("error")
        }, t.Ed = function(a) {
            var c, d;
            a = a.split("\n");
            for (var e = "", g = 1, h = a.length; h > g; g++) if (e = u.trim(a[g])) {
                for (-1 == e.indexOf("-->") ? (c = e, e = u.trim(a[++g])) : c = this.aa.length, c = {
                    id: c,
                    index: this.aa.length
                }, d = e.split(" --> "), c.startTime = qa(d[0]), c.xa = qa(d[1]), d = []; a[++g] && (e = u.trim(a[g]));) d.push(e);
                c.text = d.join("<br/>"), this.aa.push(c)
            }
            this.la = 2, this.k("loaded")
        }, t.update = function() {
            if (0 < this.aa.length) {
                var a = this.c.options().trackTimeOffset || 0,
                    a = this.c.currentTime() + a;
                if (this.Ob === b || a < this.Ob || this.Ta <= a) {
                    var k, p, n, s, c = this.aa,
                        d = this.c.duration(),
                        e = 0,
                        g = l,
                        h = [];
                    for (a >= this.Ta || this.Ta === b ? s = this.zb !== b ? this.zb : 0 : (g = f, s = this.Gb !== b ? this.Gb : c.length - 1);;) {
                        if (n = c[s], n.xa <= a) e = Math.max(e, n.xa), n.Ma && (n.Ma = l);
                        else if (a < n.startTime) {
                            if (d = Math.min(d, n.startTime), n.Ma && (n.Ma = l), !g) break
                        } else g ? (h.splice(0, 0, n), p === b && (p = s), k = s) : (h.push(n), k === b && (k = s), p = s), d = Math.min(d, n.xa), e = Math.max(e, n.startTime), n.Ma = f;
                        if (g) {
                            if (0 === s) break;
                            s--
                        } else {
                            if (s === c.length - 1) break;
                            s++
                        }
                    }
                    for (this.qb = h, this.Ta = d, this.Ob = e, this.zb = k, this.Gb = p, k = this.qb, p = "", a = 0, c = k.length; c > a; a++) p += '<span class="vjs-tt-cue">' + k[a].text + "</span>";
                    this.b.innerHTML = p, this.k("cuechange")
                }
            }
        }, t.reset = function() {
            this.Ta = 0, this.Ob = this.c.duration(), this.Gb = this.zb = 0
        }, u.Vb = u.C.extend(), u.Vb.prototype.H = "captions", u.dc = u.C.extend(), u.dc.prototype.H = "subtitles", u.Wb = u.C.extend(), u.Wb.prototype.H = "chapters", u.fc = u.a.extend({
            h: function(a, c, d) {
                if (u.a.call(this, a, c, d), a.j.tracks && 0 < a.j.tracks.length) {
                    c = this.c, a = a.j.tracks;
                    for (var e = 0; e < a.length; e++) d = a[e], na(c, d.kind, d.label, d.language, d)
                }
            }
        }), u.fc.prototype.e = function() {
            return u.a.prototype.e.call(this, "div", {
                className: "vjs-text-track-display"
            })
        }, u.Z = u.I.extend({
            h: function(a, c) {
                var d = this.ea = c.track;
                c.label = d.label(), c.selected = d.Qa(), u.I.call(this, a, c), this.c.d(d.K() + "trackchange", u.bind(this, this.update))
            }
        }), u.Z.prototype.q = function() {
            u.I.prototype.q.call(this), oa(this.c, this.ea.T, this.ea.K())
        }, u.Z.prototype.update = function() {
            this.selected(2 == this.ea.mode())
        }, u.jb = u.Z.extend({
            h: function(a, c) {
                c.track = {
                    K: function() {
                        return c.kind
                    },
                    m: a,
                    label: function() {
                        return c.kind + " off"
                    },
                    Qa: r(l),
                    mode: r(l)
                }, u.Z.call(this, a, c), this.selected(f)
            }
        }), u.jb.prototype.q = function() {
            u.Z.prototype.q.call(this), oa(this.c, this.ea.T, this.ea.K())
        }, u.jb.prototype.update = function() {
            for (var e, a = this.c.textTracks(), c = 0, d = a.length, g = f; d > c; c++) e = a[c], e.K() == this.ea.K() && 2 == e.mode() && (g = l);
            this.selected(g)
        }, u.U = u.L.extend({
            h: function(a, c) {
                u.L.call(this, a, c), 1 >= this.O.length && this.G()
            }
        }), u.U.prototype.ua = function() {
            var c, a = [];
            a.push(new u.jb(this.c, {
                kind: this.H
            }));
            for (var d = 0; d < this.c.textTracks().length; d++) c = this.c.textTracks()[d], c.K() === this.H && a.push(new u.Z(this.c, {
                track: c
            }));
            return a
        }, u.Fa = u.U.extend({
            h: function(a, c, d) {
                u.U.call(this, a, c, d), this.b.setAttribute("aria-label", "Captions Menu")
            }
        }), u.Fa.prototype.H = "captions", u.Fa.prototype.sa = "Captions", u.Fa.prototype.className = "vjs-captions-button", u.La = u.U.extend({
            h: function(a, c, d) {
                u.U.call(this, a, c, d), this.b.setAttribute("aria-label", "Subtitles Menu")
            }
        }), u.La.prototype.H = "subtitles", u.La.prototype.sa = "Subtitles", u.La.prototype.className = "vjs-subtitles-button", u.Ga = u.U.extend({
            h: function(a, c, d) {
                u.U.call(this, a, c, d), this.b.setAttribute("aria-label", "Chapters Menu")
            }
        }), t = u.Ga.prototype, t.H = "chapters", t.sa = "Chapters", t.className = "vjs-chapters-button", t.ua = function() {
            for (var c, a = [], d = 0; d < this.c.textTracks().length; d++) c = this.c.textTracks()[d], c.K() === this.H && a.push(new u.Z(this.c, {
                track: c
            }));
            return a
        }, t.va = function() {
            for (var e, g, a = this.c.textTracks(), c = 0, d = a.length, h = this.O = []; d > c; c++) if (e = a[c], e.K() == this.H && e.Qa()) {
                if (2 > e.readyState()) return this.ae = e, void e.d("loaded", u.bind(this, this.va));
                g = e;
                break
            }
            if (a = this.za = new u.ga(this.c), a.ia().appendChild(u.e("li", {
                    className: "vjs-menu-title",
                    innerHTML: u.$(this.H),
                    Rd: -1
                })), g) {
                e = g.aa;
                for (var k, c = 0, d = e.length; d > c; c++) k = e[c], k = new u.cb(this.c, {
                    track: g,
                    cue: k
                }), h.push(k), a.V(k)
            }
            return 0 < this.O.length && this.show(), a
        }, u.cb = u.I.extend({
            h: function(a, c) {
                var d = this.ea = c.track,
                    e = this.cue = c.cue,
                    g = a.currentTime();
                c.label = e.text, c.selected = e.startTime <= g && g < e.xa, u.I.call(this, a, c), d.d("cuechange", u.bind(this, this.update))
            }
        }), u.cb.prototype.q = function() {
            u.I.prototype.q.call(this), this.c.currentTime(this.cue.startTime), this.update(this.cue.startTime)
        }, u.cb.prototype.update = function() {
            var a = this.cue,
                c = this.c.currentTime();
            this.selected(a.startTime <= c && c < a.xa)
        }, u.l.B(u.Ha.prototype.j.children, {
            subtitlesButton: {},
            captionsButton: {},
            chaptersButton: {}
        }), "undefined" != typeof window.JSON && "function" === window.JSON.parse) u.JSON = window.JSON;
    else {
        u.JSON = {};
        var Z = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        u.JSON.parse = function(a, c) {
            function d(a, e) {
                var k, p, n = a[e];
                if (n && "object" == typeof n) for (k in n) Object.prototype.hasOwnProperty.call(n, k) && (p = d(n, k), p !== b ? n[k] = p : delete n[k]);
                return c.call(a, e, n)
            }
            var e;
            if (a = String(a), Z.lastIndex = 0, Z.test(a) && (a = a.replace(Z, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" == typeof c ? d({
                "": e
            }, "") : e;
            throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")
        }
    }
    u.ic = function() {
        var a, c, d = document.getElementsByTagName("video");
        if (d && 0 < d.length) for (var e = 0, g = d.length; g > e; e++) {
            if (!(c = d[e]) || !c.getAttribute) {
                u.rb();
                break
            }
            c.player === b && (a = c.getAttribute("data-setup"), a !== j && (a = u.JSON.parse(a || "{}"), videojs(c, a)))
        } else u.Oc || u.rb()
    }, u.rb = function() {
        setTimeout(u.ic, 1)
    }, "complete" === document.readyState ? u.Oc = f : u.W(window, "load", function() {
        u.Oc = f
    }), u.rb(), u.Gd = function(a, c) {
        u.Player.prototype[a] = c
    };
    var ra = this;
    ra.Xd = f, $("videojs", u), $("_V_", u), $("videojs.options", u.options), $("videojs.players", u.Aa), $("videojs.TOUCH_ENABLED", u.ec), $("videojs.cache", u.ta), $("videojs.Component", u.a), u.a.prototype.player = u.a.prototype.m, u.a.prototype.options = u.a.prototype.options, u.a.prototype.init = u.a.prototype.h, u.a.prototype.dispose = u.a.prototype.dispose, u.a.prototype.createEl = u.a.prototype.e, u.a.prototype.contentEl = u.a.prototype.ia, u.a.prototype.el = u.a.prototype.w, u.a.prototype.addChild = u.a.prototype.V, u.a.prototype.getChild = u.a.prototype.ja, u.a.prototype.getChildById = u.a.prototype.qd, u.a.prototype.children = u.a.prototype.children, u.a.prototype.initChildren = u.a.prototype.uc, u.a.prototype.removeChild = u.a.prototype.removeChild, u.a.prototype.on = u.a.prototype.d, u.a.prototype.off = u.a.prototype.p, u.a.prototype.one = u.a.prototype.W, u.a.prototype.trigger = u.a.prototype.k, u.a.prototype.triggerReady = u.a.prototype.Ea, u.a.prototype.show = u.a.prototype.show, u.a.prototype.hide = u.a.prototype.G, u.a.prototype.width = u.a.prototype.width, u.a.prototype.height = u.a.prototype.height, u.a.prototype.dimensions = u.a.prototype.jd, u.a.prototype.ready = u.a.prototype.J, u.a.prototype.addClass = u.a.prototype.o, u.a.prototype.removeClass = u.a.prototype.r, u.a.prototype.buildCSSClass = u.a.prototype.S, u.Player.prototype.ended = u.Player.prototype.ended, $("videojs.MediaLoader", u.Xc), $("videojs.TextTrackDisplay", u.fc), $("videojs.ControlBar", u.Ha), $("videojs.Button", u.s), $("videojs.PlayToggle", u.ac), $("videojs.FullscreenToggle", u.Ia), $("videojs.BigPlayButton", u.bb), $("videojs.LoadingSpinner", u.Zb), $("videojs.CurrentTimeDisplay", u.eb), $("videojs.DurationDisplay", u.fb), $("videojs.TimeDivider", u.gc), $("videojs.RemainingTimeDisplay", u.mb), $("videojs.LiveDisplay", u.Yb), $("videojs.ErrorDisplay", u.gb), $("videojs.Slider", u.Q), $("videojs.ProgressControl", u.lb), $("videojs.SeekBar", u.cc), $("videojs.LoadProgressBar", u.ib), $("videojs.PlayProgressBar", u.$b), $("videojs.SeekHandle", u.Ka), $("videojs.VolumeControl", u.ob), $("videojs.VolumeBar", u.nb), $("videojs.VolumeLevel", u.hc), $("videojs.VolumeMenuButton", u.qa), $("videojs.VolumeHandle", u.pb), $("videojs.MuteToggle", u.ha), $("videojs.PosterImage", u.Ja), $("videojs.Menu", u.ga), $("videojs.MenuItem", u.I), $("videojs.MenuButton", u.L), $("videojs.PlaybackRateMenuButton", u.bc), u.L.prototype.createItems = u.L.prototype.ua, u.U.prototype.createItems = u.U.prototype.ua, u.Ga.prototype.createItems = u.Ga.prototype.ua, $("videojs.SubtitlesButton", u.La), $("videojs.CaptionsButton", u.Fa), $("videojs.ChaptersButton", u.Ga), $("videojs.MediaTechController", u.t), u.t.prototype.features = u.t.prototype.n, u.t.prototype.n.volumeControl = u.t.prototype.n.Nc, u.t.prototype.n.fullscreenResize = u.t.prototype.n.be, u.t.prototype.n.progressEvents = u.t.prototype.n.fe, u.t.prototype.n.timeupdateEvents = u.t.prototype.n.ie, u.t.prototype.setPoster = u.t.prototype.Pb, $("videojs.Html5", u.f), u.f.Events = u.f.hb, u.f.isSupported = u.f.isSupported, u.f.canPlaySource = u.f.tb, u.f.patchCanPlayType = u.f.zc, u.f.unpatchCanPlayType = u.f.Ud, u.f.prototype.setCurrentTime = u.f.prototype.Jd, u.f.prototype.setVolume = u.f.prototype.Pd, u.f.prototype.setMuted = u.f.prototype.Md, u.f.prototype.setPreload = u.f.prototype.Od, u.f.prototype.setAutoplay = u.f.prototype.Id, u.f.prototype.setLoop = u.f.prototype.Ld, u.f.prototype.enterFullScreen = u.f.prototype.nc, u.f.prototype.exitFullScreen = u.f.prototype.nd, u.f.prototype.playbackRate = u.f.prototype.playbackRate, u.f.prototype.setPlaybackRate = u.f.prototype.Nd, $("videojs.Flash", u.i), u.i.isSupported = u.i.isSupported, u.i.canPlaySource = u.i.tb, u.i.onReady = u.i.onReady, $("videojs.TextTrack", u.C), u.C.prototype.label = u.C.prototype.label, u.C.prototype.kind = u.C.prototype.K, u.C.prototype.mode = u.C.prototype.mode, u.C.prototype.cues = u.C.prototype.ed, u.C.prototype.activeCues = u.C.prototype.Zc, $("videojs.CaptionsTrack", u.Vb), $("videojs.SubtitlesTrack", u.dc), $("videojs.ChaptersTrack", u.Wb), $("videojs.autoSetup", u.ic), $("videojs.plugin", u.Gd), $("videojs.createTimeRange", u.yb), $("videojs.util", u.oa), u.oa.mergeOptions = u.oa.Jb
}(), function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory("object" == typeof exports ? require("jquery") : jQuery)
}(function($) {
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s)
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s)
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value))
    }
    function parseCookieValue(s) {
        0 === s.indexOf('"') && (s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return s = decodeURIComponent(s.replace(pluses, " ")), config.json ? JSON.parse(s) : s
        } catch (e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value
    }
    var pluses = /\+/g,
        config = $.cookie = function(key, value, options) {
            if (void 0 !== value && !$.isFunction(value)) {
                if (options = $.extend({}, config.defaults, options), "number" == typeof options.expires) {
                    var days = options.expires,
                        t = options.expires = new Date;
                    t.setTime(+t + 864e5 * days)
                }
                return document.cookie = [encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("")
            }
            for (var result = key ? void 0 : {}, cookies = document.cookie ? document.cookie.split("; ") : [], i = 0, l = cookies.length; l > i; i++) {
                var parts = cookies[i].split("="),
                    name = decode(parts.shift()),
                    cookie = parts.join("=");
                if (key && key === name) {
                    result = read(cookie, value);
                    break
                }
                key || void 0 === (cookie = read(cookie)) || (result[name] = cookie)
            }
            return result
        };
    config.defaults = {}, $.removeCookie = function(key, options) {
        return void 0 === $.cookie(key) ? !1 : ($.cookie(key, "", $.extend({}, options, {
            expires: -1
        })), !$.cookie(key))
    }
}), $(function() {
    var QINIU_URL_PREFIX = "https://dn-coding-net-public-file.qbox.me/",
        $fullPage = $("#full-page"),
        $arrowDown = $(".arrow-down"),
        $userAvatar = $("#current-user-avatar"),
        $loginZone = $(".login-zone"),
        $logoLink = $(".logo"),
        sectionTotalCount = ($(".nav"), $fullPage.find(".section").length),
        lazyLoadImages = function(index) {
            var curSection = $fullPage.find(".section").eq(index),
                lazyLoadImages = curSection.find("img.lazy").not(".loaded");
            lazyLoadImages.each(function(i, img) {
                var lazyImage = $(img),
                    src = lazyImage.data("original"),
                    newImage = new Image;
                newImage.onload = function() {
                    lazyImage.removeClass("loading").addClass("loaded"), lazyImage.attr("src", src)
                }, newImage.src = src, lazyImage.addClass("loading")
            })
        };
    $fullPage.fullpage({
        navigation: !0,
        navigationPosition: "left",
        afterRender: function() {
            setTimeout(function() {
                $("body").addClass("loaded")
            }, 300)
        },
        onLeave: function(index, nextIndex) {
            nextIndex === sectionTotalCount ? $arrowDown.addClass("disappear") : $arrowDown.removeClass("disappear"), lazyLoadImages(nextIndex - 1)
        }
    }), $("img[data-image-src]").each(function(i, img) {
        var $img = $(img),
            src = $img.data("image-src"),
            ext = $img.data("ext"),
            isRetina = window.devicePixelRatio >= 2,
            src = QINIU_URL_PREFIX + src + (isRetina ? "@2x" : "") + "." + ext;
        $img.addClass("lazy"), $img.attr("data-original", src)
    }), $("[data-screen]").on("mouseenter", function() {
        var screenId = $(this).data("screen"),
            parent = $(this).parents(".section"),
            screen = parent.find('[data-image-src="' + screenId + '"]');
        parent.find("[data-image-src]").removeClass("active"), screen.addClass("active")
    }).on("mouseleave", function() {
        var parent = $(this).parents(".section");
        parent.find("[data-image-src]").removeClass("active").first().addClass("active")
    }), videojs.options.flash.swf = "/static/video-js.swf";
    var modal = $(".modal:eq(0)"),
        ide_modal = $(".modal.ide"),
        videoWidth = Math.floor(.8 * $(window).width()),
        videoHeight = Math.floor(videoWidth / 16 * 9),
        coding_video = null,
        coding_ide_video = null,
        playVideo = function(ide) {
            setTimeout(function() {
                ide ? coding_ide_video && coding_ide_video.play() : coding_video && coding_video.play()
            }, 300)
        },
        stopVideo = function(ide) {
            ide ? coding_ide_video && coding_ide_video.pause() : coding_video && coding_video.pause()
        };
    videojs("coding-video", {
        width: videoWidth,
        height: videoHeight
    }, function() {
        coding_video = this, $("#coding-video").css("margin", "auto")
    }), videojs("coding-ide-video", {
        width: videoWidth,
        height: videoHeight
    }, function() {
        coding_ide_video = this, $("#coding-ide-video").css("margin", "auto")
    }), $("#play-video").on("click", function() {
        modal.css({
            visibility: "visible"
        }).fadeIn(), playVideo()
    }), $("#play-ide-video").on("click", function() {
        ide_modal.css({
            visibility: "visible"
        }).fadeIn(), playVideo(!0)
    }), modal.on("click", "a.close", function() {
        $(this).parent().fadeOut(), stopVideo()
    }), ide_modal.on("click", "a.close", function() {
        $(this).parent().fadeOut(), stopVideo(!0)
    }), $(window).on("keyup", function(event) {
        27 === event.keyCode && (modal.is(":visible") || ide_modal.is(":visible")) && (modal.fadeOut(), ide_modal.fadeOut(), stopVideo(), stopVideo(!0))
    }), $.ajax({
        url: "/api/current_user",
        success: function(result) {
            if (0 === result.code) {
                var img = new Image;
                img.onload = function() {
                    $userAvatar.attr("src", img.src), $loginZone.addClass("login-checked logged-in")
                }, img.src = result.data.avatar, $logoLink.attr("href", "/user")
            } else 903 === result.code ? location.href("/register") : $loginZone.addClass("login-checked")
        },
        error: function() {
            $loginZone.addClass("login-checked")
        },
        dataType: "json",
        xhrFields: {
            withCredentials: !0
        }
    })
}), function(window, $) {
    var UA = navigator.userAgent.toLowerCase(),
        isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(UA),
        showBanner = !$.cookie("hideAppBanner"),
        makeTemplate = function(platform) {
            var tpl = ['<div class="smart-app-banner ' + platform + '">', '<a class="close" href="javascript:void(0);">x</a>', '<a class="download-btn">', '<img src="static/app-logo-' + ("ios" === platform ? "ios" : "android") + '.png" alt="Coding"/>', "</a>", '<div class="words">', "Coding 客户端 <br>", "软件开发，云端协作！", "</div>", '<a class="download download-btn">马上下载</a>', "</div>"].join("\n");
            return tpl
        };
    if (isMobile) {
        var iOS = /iphone|ipad|ipod/i.test(UA),
            Android = /android/i.test(UA),
            template = "",
            downloadUrl = "";
        iOS ? (downloadUrl = "https://itunes.apple.com/us/app/id923676989", template = makeTemplate("ios")) : Android && (downloadUrl = "https://coding.net/app/android", template = makeTemplate("android"));
        var dom = $(template);
        showBanner && ($("body").append(dom), dom.find("a.close").on("click", function() {
            $.cookie("hideAppBanner", !0, {
                expires: 1
            }), dom.remove()
        }), dom.find(".download-btn").on("click", function() {
            location.href = downloadUrl
        }))
    }
}(window, jQuery);