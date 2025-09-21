(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/09ddd_next_dist_compiled_ac6a99c5._.js",
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    RequestCookies: ()=>RequestCookies,
    ResponseCookies: ()=>ResponseCookies,
    parseCookie: ()=>parseCookie,
    parseSetCookie: ()=>parseSetCookie,
    stringifyCookie: ()=>stringifyCookie
});
module.exports = __toCommonJS(src_exports);
// src/serialize.ts
function stringifyCookie(c) {
    var _a;
    const attrs = [
        "path" in c && c.path && `Path=${c.path}`,
        "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
        "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
        "domain" in c && c.domain && `Domain=${c.domain}`,
        "secure" in c && c.secure && "Secure",
        "httpOnly" in c && c.httpOnly && "HttpOnly",
        "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
        "partitioned" in c && c.partitioned && "Partitioned",
        "priority" in c && c.priority && `Priority=${c.priority}`
    ].filter(Boolean);
    const stringified = `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}`;
    return attrs.length === 0 ? stringified : `${stringified}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
    const map = /* @__PURE__ */ new Map();
    for (const pair of cookie.split(/; */)){
        if (!pair) continue;
        const splitAt = pair.indexOf("=");
        if (splitAt === -1) {
            map.set(pair, "true");
            continue;
        }
        const [key, value] = [
            pair.slice(0, splitAt),
            pair.slice(splitAt + 1)
        ];
        try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
        } catch  {}
    }
    return map;
}
function parseSetCookie(setCookie) {
    if (!setCookie) {
        return void 0;
    }
    const [[name, value], ...attributes] = parseCookie(setCookie);
    const { domain, expires, httponly, maxage, path, samesite, secure, partitioned, priority } = Object.fromEntries(attributes.map(([key, value2])=>[
            key.toLowerCase().replace(/-/g, ""),
            value2
        ]));
    const cookie = {
        name,
        value: decodeURIComponent(value),
        domain,
        ...expires && {
            expires: new Date(expires)
        },
        ...httponly && {
            httpOnly: true
        },
        ...typeof maxage === "string" && {
            maxAge: Number(maxage)
        },
        path,
        ...samesite && {
            sameSite: parseSameSite(samesite)
        },
        ...secure && {
            secure: true
        },
        ...priority && {
            priority: parsePriority(priority)
        },
        ...partitioned && {
            partitioned: true
        }
    };
    return compact(cookie);
}
function compact(t) {
    const newT = {};
    for(const key in t){
        if (t[key]) {
            newT[key] = t[key];
        }
    }
    return newT;
}
var SAME_SITE = [
    "strict",
    "lax",
    "none"
];
function parseSameSite(string) {
    string = string.toLowerCase();
    return SAME_SITE.includes(string) ? string : void 0;
}
var PRIORITY = [
    "low",
    "medium",
    "high"
];
function parsePriority(string) {
    string = string.toLowerCase();
    return PRIORITY.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
    if (!cookiesString) return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
// src/request-cookies.ts
var RequestCookies = class {
    constructor(requestHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        this._headers = requestHeaders;
        const header = requestHeaders.get("cookie");
        if (header) {
            const parsed = parseCookie(header);
            for (const [name, value] of parsed){
                this._parsed.set(name, {
                    name,
                    value
                });
            }
        }
    }
    [Symbol.iterator]() {
        return this._parsed[Symbol.iterator]();
    }
    /**
   * The amount of cookies received from the client
   */ get size() {
        return this._parsed.size;
    }
    get(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(name);
    }
    getAll(...args) {
        var _a;
        const all = Array.from(this._parsed);
        if (!args.length) {
            return all.map(([_, value])=>value);
        }
        const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter(([n])=>n === name).map(([_, value])=>value);
    }
    has(name) {
        return this._parsed.has(name);
    }
    set(...args) {
        const [name, value] = args.length === 1 ? [
            args[0].name,
            args[0].value
        ] : args;
        const map = this._parsed;
        map.set(name, {
            name,
            value
        });
        this._headers.set("cookie", Array.from(map).map(([_, value2])=>stringifyCookie(value2)).join("; "));
        return this;
    }
    /**
   * Delete the cookies matching the passed name or names in the request.
   */ delete(names) {
        const map = this._parsed;
        const result = !Array.isArray(names) ? map.delete(names) : names.map((name)=>map.delete(name));
        this._headers.set("cookie", Array.from(map).map(([_, value])=>stringifyCookie(value)).join("; "));
        return result;
    }
    /**
   * Delete all the cookies in the cookies in the request.
   */ clear() {
        this.delete(Array.from(this._parsed.keys()));
        return this;
    }
    /**
   * Format the cookies in the request as a string for logging
   */ [Symbol.for("edge-runtime.inspect.custom")]() {
        return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map((v)=>`${v.name}=${encodeURIComponent(v.value)}`).join("; ");
    }
};
// src/response-cookies.ts
var ResponseCookies = class {
    constructor(responseHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        var _a, _b, _c;
        this._headers = responseHeaders;
        const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
        const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
        for (const cookieString of cookieStrings){
            const parsed = parseSetCookie(cookieString);
            if (parsed) this._parsed.set(parsed.name, parsed);
        }
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */ get(...args) {
        const key = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */ getAll(...args) {
        var _a;
        const all = Array.from(this._parsed.values());
        if (!args.length) {
            return all;
        }
        const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter((c)=>c.name === key);
    }
    has(name) {
        return this._parsed.has(name);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */ set(...args) {
        const [name, value, cookie] = args.length === 1 ? [
            args[0].name,
            args[0].value,
            args[0]
        ] : args;
        const map = this._parsed;
        map.set(name, normalizeCookie({
            name,
            value,
            ...cookie
        }));
        replace(map, this._headers);
        return this;
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */ delete(...args) {
        const [name, options] = typeof args[0] === "string" ? [
            args[0]
        ] : [
            args[0].name,
            args[0]
        ];
        return this.set({
            ...options,
            name,
            value: "",
            expires: /* @__PURE__ */ new Date(0)
        });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map(stringifyCookie).join("; ");
    }
};
function replace(bag, headers) {
    headers.delete("set-cookie");
    for (const [, value] of bag){
        const serialized = stringifyCookie(value);
        headers.append("set-cookie", serialized);
    }
}
function normalizeCookie(cookie = {
    name: "",
    value: ""
}) {
    if (typeof cookie.expires === "number") {
        cookie.expires = new Date(cookie.expires);
    }
    if (cookie.maxAge) {
        cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
    }
    if (cookie.path === null || cookie.path === void 0) {
        cookie.path = "/";
    }
    return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    RequestCookies,
    ResponseCookies,
    parseCookie,
    parseSetCookie,
    stringifyCookie
});
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/@opentelemetry/api/index.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    var e = {
        491: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ContextAPI = void 0;
            const n = r(223);
            const a = r(172);
            const o = r(930);
            const i = "context";
            const c = new n.NoopContextManager;
            class ContextAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new ContextAPI;
                    }
                    return this._instance;
                }
                setGlobalContextManager(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                active() {
                    return this._getContextManager().active();
                }
                with(e, t, r, ...n) {
                    return this._getContextManager().with(e, t, r, ...n);
                }
                bind(e, t) {
                    return this._getContextManager().bind(e, t);
                }
                _getContextManager() {
                    return (0, a.getGlobal)(i) || c;
                }
                disable() {
                    this._getContextManager().disable();
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.ContextAPI = ContextAPI;
        },
        930: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagAPI = void 0;
            const n = r(56);
            const a = r(912);
            const o = r(957);
            const i = r(172);
            const c = "diag";
            class DiagAPI {
                constructor(){
                    function _logProxy(e) {
                        return function(...t) {
                            const r = (0, i.getGlobal)("diag");
                            if (!r) return;
                            return r[e](...t);
                        };
                    }
                    const e = this;
                    const setLogger = (t, r = {
                        logLevel: o.DiagLogLevel.INFO
                    })=>{
                        var n, c, s;
                        if (t === e) {
                            const t = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                            e.error((n = t.stack) !== null && n !== void 0 ? n : t.message);
                            return false;
                        }
                        if (typeof r === "number") {
                            r = {
                                logLevel: r
                            };
                        }
                        const u = (0, i.getGlobal)("diag");
                        const l = (0, a.createLogLevelDiagLogger)((c = r.logLevel) !== null && c !== void 0 ? c : o.DiagLogLevel.INFO, t);
                        if (u && !r.suppressOverrideMessage) {
                            const e = (s = (new Error).stack) !== null && s !== void 0 ? s : "<failed to generate stacktrace>";
                            u.warn(`Current logger will be overwritten from ${e}`);
                            l.warn(`Current logger will overwrite one already registered from ${e}`);
                        }
                        return (0, i.registerGlobal)("diag", l, e, true);
                    };
                    e.setLogger = setLogger;
                    e.disable = ()=>{
                        (0, i.unregisterGlobal)(c, e);
                    };
                    e.createComponentLogger = (e)=>new n.DiagComponentLogger(e);
                    e.verbose = _logProxy("verbose");
                    e.debug = _logProxy("debug");
                    e.info = _logProxy("info");
                    e.warn = _logProxy("warn");
                    e.error = _logProxy("error");
                }
                static instance() {
                    if (!this._instance) {
                        this._instance = new DiagAPI;
                    }
                    return this._instance;
                }
            }
            t.DiagAPI = DiagAPI;
        },
        653: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.MetricsAPI = void 0;
            const n = r(660);
            const a = r(172);
            const o = r(930);
            const i = "metrics";
            class MetricsAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new MetricsAPI;
                    }
                    return this._instance;
                }
                setGlobalMeterProvider(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                getMeterProvider() {
                    return (0, a.getGlobal)(i) || n.NOOP_METER_PROVIDER;
                }
                getMeter(e, t, r) {
                    return this.getMeterProvider().getMeter(e, t, r);
                }
                disable() {
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.MetricsAPI = MetricsAPI;
        },
        181: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.PropagationAPI = void 0;
            const n = r(172);
            const a = r(874);
            const o = r(194);
            const i = r(277);
            const c = r(369);
            const s = r(930);
            const u = "propagation";
            const l = new a.NoopTextMapPropagator;
            class PropagationAPI {
                constructor(){
                    this.createBaggage = c.createBaggage;
                    this.getBaggage = i.getBaggage;
                    this.getActiveBaggage = i.getActiveBaggage;
                    this.setBaggage = i.setBaggage;
                    this.deleteBaggage = i.deleteBaggage;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new PropagationAPI;
                    }
                    return this._instance;
                }
                setGlobalPropagator(e) {
                    return (0, n.registerGlobal)(u, e, s.DiagAPI.instance());
                }
                inject(e, t, r = o.defaultTextMapSetter) {
                    return this._getGlobalPropagator().inject(e, t, r);
                }
                extract(e, t, r = o.defaultTextMapGetter) {
                    return this._getGlobalPropagator().extract(e, t, r);
                }
                fields() {
                    return this._getGlobalPropagator().fields();
                }
                disable() {
                    (0, n.unregisterGlobal)(u, s.DiagAPI.instance());
                }
                _getGlobalPropagator() {
                    return (0, n.getGlobal)(u) || l;
                }
            }
            t.PropagationAPI = PropagationAPI;
        },
        997: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceAPI = void 0;
            const n = r(172);
            const a = r(846);
            const o = r(139);
            const i = r(607);
            const c = r(930);
            const s = "trace";
            class TraceAPI {
                constructor(){
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                    this.wrapSpanContext = o.wrapSpanContext;
                    this.isSpanContextValid = o.isSpanContextValid;
                    this.deleteSpan = i.deleteSpan;
                    this.getSpan = i.getSpan;
                    this.getActiveSpan = i.getActiveSpan;
                    this.getSpanContext = i.getSpanContext;
                    this.setSpan = i.setSpan;
                    this.setSpanContext = i.setSpanContext;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new TraceAPI;
                    }
                    return this._instance;
                }
                setGlobalTracerProvider(e) {
                    const t = (0, n.registerGlobal)(s, this._proxyTracerProvider, c.DiagAPI.instance());
                    if (t) {
                        this._proxyTracerProvider.setDelegate(e);
                    }
                    return t;
                }
                getTracerProvider() {
                    return (0, n.getGlobal)(s) || this._proxyTracerProvider;
                }
                getTracer(e, t) {
                    return this.getTracerProvider().getTracer(e, t);
                }
                disable() {
                    (0, n.unregisterGlobal)(s, c.DiagAPI.instance());
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                }
            }
            t.TraceAPI = TraceAPI;
        },
        277: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.deleteBaggage = t.setBaggage = t.getActiveBaggage = t.getBaggage = void 0;
            const n = r(491);
            const a = r(780);
            const o = (0, a.createContextKey)("OpenTelemetry Baggage Key");
            function getBaggage(e) {
                return e.getValue(o) || undefined;
            }
            t.getBaggage = getBaggage;
            function getActiveBaggage() {
                return getBaggage(n.ContextAPI.getInstance().active());
            }
            t.getActiveBaggage = getActiveBaggage;
            function setBaggage(e, t) {
                return e.setValue(o, t);
            }
            t.setBaggage = setBaggage;
            function deleteBaggage(e) {
                return e.deleteValue(o);
            }
            t.deleteBaggage = deleteBaggage;
        },
        993: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.BaggageImpl = void 0;
            class BaggageImpl {
                constructor(e){
                    this._entries = e ? new Map(e) : new Map;
                }
                getEntry(e) {
                    const t = this._entries.get(e);
                    if (!t) {
                        return undefined;
                    }
                    return Object.assign({}, t);
                }
                getAllEntries() {
                    return Array.from(this._entries.entries()).map(([e, t])=>[
                            e,
                            t
                        ]);
                }
                setEntry(e, t) {
                    const r = new BaggageImpl(this._entries);
                    r._entries.set(e, t);
                    return r;
                }
                removeEntry(e) {
                    const t = new BaggageImpl(this._entries);
                    t._entries.delete(e);
                    return t;
                }
                removeEntries(...e) {
                    const t = new BaggageImpl(this._entries);
                    for (const r of e){
                        t._entries.delete(r);
                    }
                    return t;
                }
                clear() {
                    return new BaggageImpl;
                }
            }
            t.BaggageImpl = BaggageImpl;
        },
        830: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataSymbol = void 0;
            t.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        },
        369: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataFromString = t.createBaggage = void 0;
            const n = r(930);
            const a = r(993);
            const o = r(830);
            const i = n.DiagAPI.instance();
            function createBaggage(e = {}) {
                return new a.BaggageImpl(new Map(Object.entries(e)));
            }
            t.createBaggage = createBaggage;
            function baggageEntryMetadataFromString(e) {
                if (typeof e !== "string") {
                    i.error(`Cannot create baggage metadata from unknown type: ${typeof e}`);
                    e = "";
                }
                return {
                    __TYPE__: o.baggageEntryMetadataSymbol,
                    toString () {
                        return e;
                    }
                };
            }
            t.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
        },
        67: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.context = void 0;
            const n = r(491);
            t.context = n.ContextAPI.getInstance();
        },
        223: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopContextManager = void 0;
            const n = r(780);
            class NoopContextManager {
                active() {
                    return n.ROOT_CONTEXT;
                }
                with(e, t, r, ...n) {
                    return t.call(r, ...n);
                }
                bind(e, t) {
                    return t;
                }
                enable() {
                    return this;
                }
                disable() {
                    return this;
                }
            }
            t.NoopContextManager = NoopContextManager;
        },
        780: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ROOT_CONTEXT = t.createContextKey = void 0;
            function createContextKey(e) {
                return Symbol.for(e);
            }
            t.createContextKey = createContextKey;
            class BaseContext {
                constructor(e){
                    const t = this;
                    t._currentContext = e ? new Map(e) : new Map;
                    t.getValue = (e)=>t._currentContext.get(e);
                    t.setValue = (e, r)=>{
                        const n = new BaseContext(t._currentContext);
                        n._currentContext.set(e, r);
                        return n;
                    };
                    t.deleteValue = (e)=>{
                        const r = new BaseContext(t._currentContext);
                        r._currentContext.delete(e);
                        return r;
                    };
                }
            }
            t.ROOT_CONTEXT = new BaseContext;
        },
        506: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.diag = void 0;
            const n = r(930);
            t.diag = n.DiagAPI.instance();
        },
        56: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagComponentLogger = void 0;
            const n = r(172);
            class DiagComponentLogger {
                constructor(e){
                    this._namespace = e.namespace || "DiagComponentLogger";
                }
                debug(...e) {
                    return logProxy("debug", this._namespace, e);
                }
                error(...e) {
                    return logProxy("error", this._namespace, e);
                }
                info(...e) {
                    return logProxy("info", this._namespace, e);
                }
                warn(...e) {
                    return logProxy("warn", this._namespace, e);
                }
                verbose(...e) {
                    return logProxy("verbose", this._namespace, e);
                }
            }
            t.DiagComponentLogger = DiagComponentLogger;
            function logProxy(e, t, r) {
                const a = (0, n.getGlobal)("diag");
                if (!a) {
                    return;
                }
                r.unshift(t);
                return a[e](...r);
            }
        },
        972: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagConsoleLogger = void 0;
            const r = [
                {
                    n: "error",
                    c: "error"
                },
                {
                    n: "warn",
                    c: "warn"
                },
                {
                    n: "info",
                    c: "info"
                },
                {
                    n: "debug",
                    c: "debug"
                },
                {
                    n: "verbose",
                    c: "trace"
                }
            ];
            class DiagConsoleLogger {
                constructor(){
                    function _consoleFunc(e) {
                        return function(...t) {
                            if (console) {
                                let r = console[e];
                                if (typeof r !== "function") {
                                    r = console.log;
                                }
                                if (typeof r === "function") {
                                    return r.apply(console, t);
                                }
                            }
                        };
                    }
                    for(let e = 0; e < r.length; e++){
                        this[r[e].n] = _consoleFunc(r[e].c);
                    }
                }
            }
            t.DiagConsoleLogger = DiagConsoleLogger;
        },
        912: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createLogLevelDiagLogger = void 0;
            const n = r(957);
            function createLogLevelDiagLogger(e, t) {
                if (e < n.DiagLogLevel.NONE) {
                    e = n.DiagLogLevel.NONE;
                } else if (e > n.DiagLogLevel.ALL) {
                    e = n.DiagLogLevel.ALL;
                }
                t = t || {};
                function _filterFunc(r, n) {
                    const a = t[r];
                    if (typeof a === "function" && e >= n) {
                        return a.bind(t);
                    }
                    return function() {};
                }
                return {
                    error: _filterFunc("error", n.DiagLogLevel.ERROR),
                    warn: _filterFunc("warn", n.DiagLogLevel.WARN),
                    info: _filterFunc("info", n.DiagLogLevel.INFO),
                    debug: _filterFunc("debug", n.DiagLogLevel.DEBUG),
                    verbose: _filterFunc("verbose", n.DiagLogLevel.VERBOSE)
                };
            }
            t.createLogLevelDiagLogger = createLogLevelDiagLogger;
        },
        957: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagLogLevel = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["ERROR"] = 30] = "ERROR";
                e[e["WARN"] = 50] = "WARN";
                e[e["INFO"] = 60] = "INFO";
                e[e["DEBUG"] = 70] = "DEBUG";
                e[e["VERBOSE"] = 80] = "VERBOSE";
                e[e["ALL"] = 9999] = "ALL";
            })(r = t.DiagLogLevel || (t.DiagLogLevel = {}));
        },
        172: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.unregisterGlobal = t.getGlobal = t.registerGlobal = void 0;
            const n = r(200);
            const a = r(521);
            const o = r(130);
            const i = a.VERSION.split(".")[0];
            const c = Symbol.for(`opentelemetry.js.api.${i}`);
            const s = n._globalThis;
            function registerGlobal(e, t, r, n = false) {
                var o;
                const i = s[c] = (o = s[c]) !== null && o !== void 0 ? o : {
                    version: a.VERSION
                };
                if (!n && i[e]) {
                    const t = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                if (i.version !== a.VERSION) {
                    const t = new Error(`@opentelemetry/api: Registration of version v${i.version} for ${e} does not match previously registered API v${a.VERSION}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                i[e] = t;
                r.debug(`@opentelemetry/api: Registered a global for ${e} v${a.VERSION}.`);
                return true;
            }
            t.registerGlobal = registerGlobal;
            function getGlobal(e) {
                var t, r;
                const n = (t = s[c]) === null || t === void 0 ? void 0 : t.version;
                if (!n || !(0, o.isCompatible)(n)) {
                    return;
                }
                return (r = s[c]) === null || r === void 0 ? void 0 : r[e];
            }
            t.getGlobal = getGlobal;
            function unregisterGlobal(e, t) {
                t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${a.VERSION}.`);
                const r = s[c];
                if (r) {
                    delete r[e];
                }
            }
            t.unregisterGlobal = unregisterGlobal;
        },
        130: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.isCompatible = t._makeCompatibilityCheck = void 0;
            const n = r(521);
            const a = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
            function _makeCompatibilityCheck(e) {
                const t = new Set([
                    e
                ]);
                const r = new Set;
                const n = e.match(a);
                if (!n) {
                    return ()=>false;
                }
                const o = {
                    major: +n[1],
                    minor: +n[2],
                    patch: +n[3],
                    prerelease: n[4]
                };
                if (o.prerelease != null) {
                    return function isExactmatch(t) {
                        return t === e;
                    };
                }
                function _reject(e) {
                    r.add(e);
                    return false;
                }
                function _accept(e) {
                    t.add(e);
                    return true;
                }
                return function isCompatible(e) {
                    if (t.has(e)) {
                        return true;
                    }
                    if (r.has(e)) {
                        return false;
                    }
                    const n = e.match(a);
                    if (!n) {
                        return _reject(e);
                    }
                    const i = {
                        major: +n[1],
                        minor: +n[2],
                        patch: +n[3],
                        prerelease: n[4]
                    };
                    if (i.prerelease != null) {
                        return _reject(e);
                    }
                    if (o.major !== i.major) {
                        return _reject(e);
                    }
                    if (o.major === 0) {
                        if (o.minor === i.minor && o.patch <= i.patch) {
                            return _accept(e);
                        }
                        return _reject(e);
                    }
                    if (o.minor <= i.minor) {
                        return _accept(e);
                    }
                    return _reject(e);
                };
            }
            t._makeCompatibilityCheck = _makeCompatibilityCheck;
            t.isCompatible = _makeCompatibilityCheck(n.VERSION);
        },
        886: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.metrics = void 0;
            const n = r(653);
            t.metrics = n.MetricsAPI.getInstance();
        },
        901: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ValueType = void 0;
            var r;
            (function(e) {
                e[e["INT"] = 0] = "INT";
                e[e["DOUBLE"] = 1] = "DOUBLE";
            })(r = t.ValueType || (t.ValueType = {}));
        },
        102: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createNoopMeter = t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t.NOOP_OBSERVABLE_GAUGE_METRIC = t.NOOP_OBSERVABLE_COUNTER_METRIC = t.NOOP_UP_DOWN_COUNTER_METRIC = t.NOOP_HISTOGRAM_METRIC = t.NOOP_COUNTER_METRIC = t.NOOP_METER = t.NoopObservableUpDownCounterMetric = t.NoopObservableGaugeMetric = t.NoopObservableCounterMetric = t.NoopObservableMetric = t.NoopHistogramMetric = t.NoopUpDownCounterMetric = t.NoopCounterMetric = t.NoopMetric = t.NoopMeter = void 0;
            class NoopMeter {
                constructor(){}
                createHistogram(e, r) {
                    return t.NOOP_HISTOGRAM_METRIC;
                }
                createCounter(e, r) {
                    return t.NOOP_COUNTER_METRIC;
                }
                createUpDownCounter(e, r) {
                    return t.NOOP_UP_DOWN_COUNTER_METRIC;
                }
                createObservableGauge(e, r) {
                    return t.NOOP_OBSERVABLE_GAUGE_METRIC;
                }
                createObservableCounter(e, r) {
                    return t.NOOP_OBSERVABLE_COUNTER_METRIC;
                }
                createObservableUpDownCounter(e, r) {
                    return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
                }
                addBatchObservableCallback(e, t) {}
                removeBatchObservableCallback(e) {}
            }
            t.NoopMeter = NoopMeter;
            class NoopMetric {
            }
            t.NoopMetric = NoopMetric;
            class NoopCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopCounterMetric = NoopCounterMetric;
            class NoopUpDownCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
            class NoopHistogramMetric extends NoopMetric {
                record(e, t) {}
            }
            t.NoopHistogramMetric = NoopHistogramMetric;
            class NoopObservableMetric {
                addCallback(e) {}
                removeCallback(e) {}
            }
            t.NoopObservableMetric = NoopObservableMetric;
            class NoopObservableCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableCounterMetric = NoopObservableCounterMetric;
            class NoopObservableGaugeMetric extends NoopObservableMetric {
            }
            t.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
            class NoopObservableUpDownCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
            t.NOOP_METER = new NoopMeter;
            t.NOOP_COUNTER_METRIC = new NoopCounterMetric;
            t.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric;
            t.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric;
            t.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric;
            t.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric;
            t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric;
            function createNoopMeter() {
                return t.NOOP_METER;
            }
            t.createNoopMeter = createNoopMeter;
        },
        660: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NOOP_METER_PROVIDER = t.NoopMeterProvider = void 0;
            const n = r(102);
            class NoopMeterProvider {
                getMeter(e, t, r) {
                    return n.NOOP_METER;
                }
            }
            t.NoopMeterProvider = NoopMeterProvider;
            t.NOOP_METER_PROVIDER = new NoopMeterProvider;
        },
        200: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(46), t);
        },
        651: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t._globalThis = void 0;
            t._globalThis = typeof globalThis === "object" ? globalThis : /*TURBOPACK member replacement*/ __turbopack_context__.g;
        },
        46: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(651), t);
        },
        939: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.propagation = void 0;
            const n = r(181);
            t.propagation = n.PropagationAPI.getInstance();
        },
        874: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTextMapPropagator = void 0;
            class NoopTextMapPropagator {
                inject(e, t) {}
                extract(e, t) {
                    return e;
                }
                fields() {
                    return [];
                }
            }
            t.NoopTextMapPropagator = NoopTextMapPropagator;
        },
        194: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.defaultTextMapSetter = t.defaultTextMapGetter = void 0;
            t.defaultTextMapGetter = {
                get (e, t) {
                    if (e == null) {
                        return undefined;
                    }
                    return e[t];
                },
                keys (e) {
                    if (e == null) {
                        return [];
                    }
                    return Object.keys(e);
                }
            };
            t.defaultTextMapSetter = {
                set (e, t, r) {
                    if (e == null) {
                        return;
                    }
                    e[t] = r;
                }
            };
        },
        845: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.trace = void 0;
            const n = r(997);
            t.trace = n.TraceAPI.getInstance();
        },
        403: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NonRecordingSpan = void 0;
            const n = r(476);
            class NonRecordingSpan {
                constructor(e = n.INVALID_SPAN_CONTEXT){
                    this._spanContext = e;
                }
                spanContext() {
                    return this._spanContext;
                }
                setAttribute(e, t) {
                    return this;
                }
                setAttributes(e) {
                    return this;
                }
                addEvent(e, t) {
                    return this;
                }
                setStatus(e) {
                    return this;
                }
                updateName(e) {
                    return this;
                }
                end(e) {}
                isRecording() {
                    return false;
                }
                recordException(e, t) {}
            }
            t.NonRecordingSpan = NonRecordingSpan;
        },
        614: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracer = void 0;
            const n = r(491);
            const a = r(607);
            const o = r(403);
            const i = r(139);
            const c = n.ContextAPI.getInstance();
            class NoopTracer {
                startSpan(e, t, r = c.active()) {
                    const n = Boolean(t === null || t === void 0 ? void 0 : t.root);
                    if (n) {
                        return new o.NonRecordingSpan;
                    }
                    const s = r && (0, a.getSpanContext)(r);
                    if (isSpanContext(s) && (0, i.isSpanContextValid)(s)) {
                        return new o.NonRecordingSpan(s);
                    } else {
                        return new o.NonRecordingSpan;
                    }
                }
                startActiveSpan(e, t, r, n) {
                    let o;
                    let i;
                    let s;
                    if (arguments.length < 2) {
                        return;
                    } else if (arguments.length === 2) {
                        s = t;
                    } else if (arguments.length === 3) {
                        o = t;
                        s = r;
                    } else {
                        o = t;
                        i = r;
                        s = n;
                    }
                    const u = i !== null && i !== void 0 ? i : c.active();
                    const l = this.startSpan(e, o, u);
                    const g = (0, a.setSpan)(u, l);
                    return c.with(g, s, undefined, l);
                }
            }
            t.NoopTracer = NoopTracer;
            function isSpanContext(e) {
                return typeof e === "object" && typeof e["spanId"] === "string" && typeof e["traceId"] === "string" && typeof e["traceFlags"] === "number";
            }
        },
        124: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracerProvider = void 0;
            const n = r(614);
            class NoopTracerProvider {
                getTracer(e, t, r) {
                    return new n.NoopTracer;
                }
            }
            t.NoopTracerProvider = NoopTracerProvider;
        },
        125: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracer = void 0;
            const n = r(614);
            const a = new n.NoopTracer;
            class ProxyTracer {
                constructor(e, t, r, n){
                    this._provider = e;
                    this.name = t;
                    this.version = r;
                    this.options = n;
                }
                startSpan(e, t, r) {
                    return this._getTracer().startSpan(e, t, r);
                }
                startActiveSpan(e, t, r, n) {
                    const a = this._getTracer();
                    return Reflect.apply(a.startActiveSpan, a, arguments);
                }
                _getTracer() {
                    if (this._delegate) {
                        return this._delegate;
                    }
                    const e = this._provider.getDelegateTracer(this.name, this.version, this.options);
                    if (!e) {
                        return a;
                    }
                    this._delegate = e;
                    return this._delegate;
                }
            }
            t.ProxyTracer = ProxyTracer;
        },
        846: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracerProvider = void 0;
            const n = r(125);
            const a = r(124);
            const o = new a.NoopTracerProvider;
            class ProxyTracerProvider {
                getTracer(e, t, r) {
                    var a;
                    return (a = this.getDelegateTracer(e, t, r)) !== null && a !== void 0 ? a : new n.ProxyTracer(this, e, t, r);
                }
                getDelegate() {
                    var e;
                    return (e = this._delegate) !== null && e !== void 0 ? e : o;
                }
                setDelegate(e) {
                    this._delegate = e;
                }
                getDelegateTracer(e, t, r) {
                    var n;
                    return (n = this._delegate) === null || n === void 0 ? void 0 : n.getTracer(e, t, r);
                }
            }
            t.ProxyTracerProvider = ProxyTracerProvider;
        },
        996: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SamplingDecision = void 0;
            var r;
            (function(e) {
                e[e["NOT_RECORD"] = 0] = "NOT_RECORD";
                e[e["RECORD"] = 1] = "RECORD";
                e[e["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
            })(r = t.SamplingDecision || (t.SamplingDecision = {}));
        },
        607: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.getSpanContext = t.setSpanContext = t.deleteSpan = t.setSpan = t.getActiveSpan = t.getSpan = void 0;
            const n = r(780);
            const a = r(403);
            const o = r(491);
            const i = (0, n.createContextKey)("OpenTelemetry Context Key SPAN");
            function getSpan(e) {
                return e.getValue(i) || undefined;
            }
            t.getSpan = getSpan;
            function getActiveSpan() {
                return getSpan(o.ContextAPI.getInstance().active());
            }
            t.getActiveSpan = getActiveSpan;
            function setSpan(e, t) {
                return e.setValue(i, t);
            }
            t.setSpan = setSpan;
            function deleteSpan(e) {
                return e.deleteValue(i);
            }
            t.deleteSpan = deleteSpan;
            function setSpanContext(e, t) {
                return setSpan(e, new a.NonRecordingSpan(t));
            }
            t.setSpanContext = setSpanContext;
            function getSpanContext(e) {
                var t;
                return (t = getSpan(e)) === null || t === void 0 ? void 0 : t.spanContext();
            }
            t.getSpanContext = getSpanContext;
        },
        325: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceStateImpl = void 0;
            const n = r(564);
            const a = 32;
            const o = 512;
            const i = ",";
            const c = "=";
            class TraceStateImpl {
                constructor(e){
                    this._internalState = new Map;
                    if (e) this._parse(e);
                }
                set(e, t) {
                    const r = this._clone();
                    if (r._internalState.has(e)) {
                        r._internalState.delete(e);
                    }
                    r._internalState.set(e, t);
                    return r;
                }
                unset(e) {
                    const t = this._clone();
                    t._internalState.delete(e);
                    return t;
                }
                get(e) {
                    return this._internalState.get(e);
                }
                serialize() {
                    return this._keys().reduce((e, t)=>{
                        e.push(t + c + this.get(t));
                        return e;
                    }, []).join(i);
                }
                _parse(e) {
                    if (e.length > o) return;
                    this._internalState = e.split(i).reverse().reduce((e, t)=>{
                        const r = t.trim();
                        const a = r.indexOf(c);
                        if (a !== -1) {
                            const o = r.slice(0, a);
                            const i = r.slice(a + 1, t.length);
                            if ((0, n.validateKey)(o) && (0, n.validateValue)(i)) {
                                e.set(o, i);
                            } else {}
                        }
                        return e;
                    }, new Map);
                    if (this._internalState.size > a) {
                        this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, a));
                    }
                }
                _keys() {
                    return Array.from(this._internalState.keys()).reverse();
                }
                _clone() {
                    const e = new TraceStateImpl;
                    e._internalState = new Map(this._internalState);
                    return e;
                }
            }
            t.TraceStateImpl = TraceStateImpl;
        },
        564: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.validateValue = t.validateKey = void 0;
            const r = "[_0-9a-z-*/]";
            const n = `[a-z]${r}{0,255}`;
            const a = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`;
            const o = new RegExp(`^(?:${n}|${a})$`);
            const i = /^[ -~]{0,255}[!-~]$/;
            const c = /,|=/;
            function validateKey(e) {
                return o.test(e);
            }
            t.validateKey = validateKey;
            function validateValue(e) {
                return i.test(e) && !c.test(e);
            }
            t.validateValue = validateValue;
        },
        98: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createTraceState = void 0;
            const n = r(325);
            function createTraceState(e) {
                return new n.TraceStateImpl(e);
            }
            t.createTraceState = createTraceState;
        },
        476: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.INVALID_SPAN_CONTEXT = t.INVALID_TRACEID = t.INVALID_SPANID = void 0;
            const n = r(475);
            t.INVALID_SPANID = "0000000000000000";
            t.INVALID_TRACEID = "00000000000000000000000000000000";
            t.INVALID_SPAN_CONTEXT = {
                traceId: t.INVALID_TRACEID,
                spanId: t.INVALID_SPANID,
                traceFlags: n.TraceFlags.NONE
            };
        },
        357: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanKind = void 0;
            var r;
            (function(e) {
                e[e["INTERNAL"] = 0] = "INTERNAL";
                e[e["SERVER"] = 1] = "SERVER";
                e[e["CLIENT"] = 2] = "CLIENT";
                e[e["PRODUCER"] = 3] = "PRODUCER";
                e[e["CONSUMER"] = 4] = "CONSUMER";
            })(r = t.SpanKind || (t.SpanKind = {}));
        },
        139: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.wrapSpanContext = t.isSpanContextValid = t.isValidSpanId = t.isValidTraceId = void 0;
            const n = r(476);
            const a = r(403);
            const o = /^([0-9a-f]{32})$/i;
            const i = /^[0-9a-f]{16}$/i;
            function isValidTraceId(e) {
                return o.test(e) && e !== n.INVALID_TRACEID;
            }
            t.isValidTraceId = isValidTraceId;
            function isValidSpanId(e) {
                return i.test(e) && e !== n.INVALID_SPANID;
            }
            t.isValidSpanId = isValidSpanId;
            function isSpanContextValid(e) {
                return isValidTraceId(e.traceId) && isValidSpanId(e.spanId);
            }
            t.isSpanContextValid = isSpanContextValid;
            function wrapSpanContext(e) {
                return new a.NonRecordingSpan(e);
            }
            t.wrapSpanContext = wrapSpanContext;
        },
        847: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanStatusCode = void 0;
            var r;
            (function(e) {
                e[e["UNSET"] = 0] = "UNSET";
                e[e["OK"] = 1] = "OK";
                e[e["ERROR"] = 2] = "ERROR";
            })(r = t.SpanStatusCode || (t.SpanStatusCode = {}));
        },
        475: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceFlags = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["SAMPLED"] = 1] = "SAMPLED";
            })(r = t.TraceFlags || (t.TraceFlags = {}));
        },
        521: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.VERSION = void 0;
            t.VERSION = "1.6.0";
        }
    };
    var t = {};
    function __nccwpck_require__(r) {
        var n = t[r];
        if (n !== undefined) {
            return n.exports;
        }
        var a = t[r] = {
            exports: {}
        };
        var o = true;
        try {
            e[r].call(a.exports, a, a.exports, __nccwpck_require__);
            o = false;
        } finally{
            if (o) delete t[r];
        }
        return a.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/FRONTEND/interent/node_modules/next/dist/compiled/@opentelemetry/api") + "/";
    var r = {};
    (()=>{
        var e = r;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        e.trace = e.propagation = e.metrics = e.diag = e.context = e.INVALID_SPAN_CONTEXT = e.INVALID_TRACEID = e.INVALID_SPANID = e.isValidSpanId = e.isValidTraceId = e.isSpanContextValid = e.createTraceState = e.TraceFlags = e.SpanStatusCode = e.SpanKind = e.SamplingDecision = e.ProxyTracerProvider = e.ProxyTracer = e.defaultTextMapSetter = e.defaultTextMapGetter = e.ValueType = e.createNoopMeter = e.DiagLogLevel = e.DiagConsoleLogger = e.ROOT_CONTEXT = e.createContextKey = e.baggageEntryMetadataFromString = void 0;
        var t = __nccwpck_require__(369);
        Object.defineProperty(e, "baggageEntryMetadataFromString", {
            enumerable: true,
            get: function() {
                return t.baggageEntryMetadataFromString;
            }
        });
        var n = __nccwpck_require__(780);
        Object.defineProperty(e, "createContextKey", {
            enumerable: true,
            get: function() {
                return n.createContextKey;
            }
        });
        Object.defineProperty(e, "ROOT_CONTEXT", {
            enumerable: true,
            get: function() {
                return n.ROOT_CONTEXT;
            }
        });
        var a = __nccwpck_require__(972);
        Object.defineProperty(e, "DiagConsoleLogger", {
            enumerable: true,
            get: function() {
                return a.DiagConsoleLogger;
            }
        });
        var o = __nccwpck_require__(957);
        Object.defineProperty(e, "DiagLogLevel", {
            enumerable: true,
            get: function() {
                return o.DiagLogLevel;
            }
        });
        var i = __nccwpck_require__(102);
        Object.defineProperty(e, "createNoopMeter", {
            enumerable: true,
            get: function() {
                return i.createNoopMeter;
            }
        });
        var c = __nccwpck_require__(901);
        Object.defineProperty(e, "ValueType", {
            enumerable: true,
            get: function() {
                return c.ValueType;
            }
        });
        var s = __nccwpck_require__(194);
        Object.defineProperty(e, "defaultTextMapGetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapGetter;
            }
        });
        Object.defineProperty(e, "defaultTextMapSetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapSetter;
            }
        });
        var u = __nccwpck_require__(125);
        Object.defineProperty(e, "ProxyTracer", {
            enumerable: true,
            get: function() {
                return u.ProxyTracer;
            }
        });
        var l = __nccwpck_require__(846);
        Object.defineProperty(e, "ProxyTracerProvider", {
            enumerable: true,
            get: function() {
                return l.ProxyTracerProvider;
            }
        });
        var g = __nccwpck_require__(996);
        Object.defineProperty(e, "SamplingDecision", {
            enumerable: true,
            get: function() {
                return g.SamplingDecision;
            }
        });
        var p = __nccwpck_require__(357);
        Object.defineProperty(e, "SpanKind", {
            enumerable: true,
            get: function() {
                return p.SpanKind;
            }
        });
        var d = __nccwpck_require__(847);
        Object.defineProperty(e, "SpanStatusCode", {
            enumerable: true,
            get: function() {
                return d.SpanStatusCode;
            }
        });
        var _ = __nccwpck_require__(475);
        Object.defineProperty(e, "TraceFlags", {
            enumerable: true,
            get: function() {
                return _.TraceFlags;
            }
        });
        var f = __nccwpck_require__(98);
        Object.defineProperty(e, "createTraceState", {
            enumerable: true,
            get: function() {
                return f.createTraceState;
            }
        });
        var b = __nccwpck_require__(139);
        Object.defineProperty(e, "isSpanContextValid", {
            enumerable: true,
            get: function() {
                return b.isSpanContextValid;
            }
        });
        Object.defineProperty(e, "isValidTraceId", {
            enumerable: true,
            get: function() {
                return b.isValidTraceId;
            }
        });
        Object.defineProperty(e, "isValidSpanId", {
            enumerable: true,
            get: function() {
                return b.isValidSpanId;
            }
        });
        var v = __nccwpck_require__(476);
        Object.defineProperty(e, "INVALID_SPANID", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPANID;
            }
        });
        Object.defineProperty(e, "INVALID_TRACEID", {
            enumerable: true,
            get: function() {
                return v.INVALID_TRACEID;
            }
        });
        Object.defineProperty(e, "INVALID_SPAN_CONTEXT", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPAN_CONTEXT;
            }
        });
        const O = __nccwpck_require__(67);
        Object.defineProperty(e, "context", {
            enumerable: true,
            get: function() {
                return O.context;
            }
        });
        const P = __nccwpck_require__(506);
        Object.defineProperty(e, "diag", {
            enumerable: true,
            get: function() {
                return P.diag;
            }
        });
        const N = __nccwpck_require__(886);
        Object.defineProperty(e, "metrics", {
            enumerable: true,
            get: function() {
                return N.metrics;
            }
        });
        const S = __nccwpck_require__(939);
        Object.defineProperty(e, "propagation", {
            enumerable: true,
            get: function() {
                return S.propagation;
            }
        });
        const C = __nccwpck_require__(845);
        Object.defineProperty(e, "trace", {
            enumerable: true,
            get: function() {
                return C.trace;
            }
        });
        e["default"] = {
            context: O.context,
            diag: P.diag,
            metrics: N.metrics,
            propagation: S.propagation,
            trace: C.trace
        };
    })();
    module.exports = r;
})();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/cookie/index.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/FRONTEND/interent/node_modules/next/dist/compiled/cookie") + "/";
    var e = {};
    (()=>{
        var r = e;
        /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ r.parse = parse;
        r.serialize = serialize;
        var i = decodeURIComponent;
        var t = encodeURIComponent;
        var a = /; */;
        var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse(e, r) {
            if (typeof e !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var t = {};
            var n = r || {};
            var o = e.split(a);
            var s = n.decode || i;
            for(var p = 0; p < o.length; p++){
                var f = o[p];
                var u = f.indexOf("=");
                if (u < 0) {
                    continue;
                }
                var v = f.substr(0, u).trim();
                var c = f.substr(++u, f.length).trim();
                if ('"' == c[0]) {
                    c = c.slice(1, -1);
                }
                if (undefined == t[v]) {
                    t[v] = tryDecode(c, s);
                }
            }
            return t;
        }
        function serialize(e, r, i) {
            var a = i || {};
            var o = a.encode || t;
            if (typeof o !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!n.test(e)) {
                throw new TypeError("argument name is invalid");
            }
            var s = o(r);
            if (s && !n.test(s)) {
                throw new TypeError("argument val is invalid");
            }
            var p = e + "=" + s;
            if (null != a.maxAge) {
                var f = a.maxAge - 0;
                if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                }
                p += "; Max-Age=" + Math.floor(f);
            }
            if (a.domain) {
                if (!n.test(a.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                p += "; Domain=" + a.domain;
            }
            if (a.path) {
                if (!n.test(a.path)) {
                    throw new TypeError("option path is invalid");
                }
                p += "; Path=" + a.path;
            }
            if (a.expires) {
                if (typeof a.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                }
                p += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly) {
                p += "; HttpOnly";
            }
            if (a.secure) {
                p += "; Secure";
            }
            if (a.sameSite) {
                var u = typeof a.sameSite === "string" ? a.sameSite.toLowerCase() : a.sameSite;
                switch(u){
                    case true:
                        p += "; SameSite=Strict";
                        break;
                    case "lax":
                        p += "; SameSite=Lax";
                        break;
                    case "strict":
                        p += "; SameSite=Strict";
                        break;
                    case "none":
                        p += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return p;
        }
        function tryDecode(e, r) {
            try {
                return r(e);
            } catch (r) {
                return e;
            }
        }
    })();
    module.exports = e;
})();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/p-queue/index.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    var e = {
        993: (e)=>{
            var t = Object.prototype.hasOwnProperty, n = "~";
            function Events() {}
            if (Object.create) {
                Events.prototype = Object.create(null);
                if (!(new Events).__proto__) n = false;
            }
            function EE(e, t, n) {
                this.fn = e;
                this.context = t;
                this.once = n || false;
            }
            function addListener(e, t, r, i, s) {
                if (typeof r !== "function") {
                    throw new TypeError("The listener must be a function");
                }
                var o = new EE(r, i || e, s), u = n ? n + t : t;
                if (!e._events[u]) e._events[u] = o, e._eventsCount++;
                else if (!e._events[u].fn) e._events[u].push(o);
                else e._events[u] = [
                    e._events[u],
                    o
                ];
                return e;
            }
            function clearEvent(e, t) {
                if (--e._eventsCount === 0) e._events = new Events;
                else delete e._events[t];
            }
            function EventEmitter() {
                this._events = new Events;
                this._eventsCount = 0;
            }
            EventEmitter.prototype.eventNames = function eventNames() {
                var e = [], r, i;
                if (this._eventsCount === 0) return e;
                for(i in r = this._events){
                    if (t.call(r, i)) e.push(n ? i.slice(1) : i);
                }
                if (Object.getOwnPropertySymbols) {
                    return e.concat(Object.getOwnPropertySymbols(r));
                }
                return e;
            };
            EventEmitter.prototype.listeners = function listeners(e) {
                var t = n ? n + e : e, r = this._events[t];
                if (!r) return [];
                if (r.fn) return [
                    r.fn
                ];
                for(var i = 0, s = r.length, o = new Array(s); i < s; i++){
                    o[i] = r[i].fn;
                }
                return o;
            };
            EventEmitter.prototype.listenerCount = function listenerCount(e) {
                var t = n ? n + e : e, r = this._events[t];
                if (!r) return 0;
                if (r.fn) return 1;
                return r.length;
            };
            EventEmitter.prototype.emit = function emit(e, t, r, i, s, o) {
                var u = n ? n + e : e;
                if (!this._events[u]) return false;
                var a = this._events[u], l = arguments.length, c, h;
                if (a.fn) {
                    if (a.once) this.removeListener(e, a.fn, undefined, true);
                    switch(l){
                        case 1:
                            return a.fn.call(a.context), true;
                        case 2:
                            return a.fn.call(a.context, t), true;
                        case 3:
                            return a.fn.call(a.context, t, r), true;
                        case 4:
                            return a.fn.call(a.context, t, r, i), true;
                        case 5:
                            return a.fn.call(a.context, t, r, i, s), true;
                        case 6:
                            return a.fn.call(a.context, t, r, i, s, o), true;
                    }
                    for(h = 1, c = new Array(l - 1); h < l; h++){
                        c[h - 1] = arguments[h];
                    }
                    a.fn.apply(a.context, c);
                } else {
                    var _ = a.length, f;
                    for(h = 0; h < _; h++){
                        if (a[h].once) this.removeListener(e, a[h].fn, undefined, true);
                        switch(l){
                            case 1:
                                a[h].fn.call(a[h].context);
                                break;
                            case 2:
                                a[h].fn.call(a[h].context, t);
                                break;
                            case 3:
                                a[h].fn.call(a[h].context, t, r);
                                break;
                            case 4:
                                a[h].fn.call(a[h].context, t, r, i);
                                break;
                            default:
                                if (!c) for(f = 1, c = new Array(l - 1); f < l; f++){
                                    c[f - 1] = arguments[f];
                                }
                                a[h].fn.apply(a[h].context, c);
                        }
                    }
                }
                return true;
            };
            EventEmitter.prototype.on = function on(e, t, n) {
                return addListener(this, e, t, n, false);
            };
            EventEmitter.prototype.once = function once(e, t, n) {
                return addListener(this, e, t, n, true);
            };
            EventEmitter.prototype.removeListener = function removeListener(e, t, r, i) {
                var s = n ? n + e : e;
                if (!this._events[s]) return this;
                if (!t) {
                    clearEvent(this, s);
                    return this;
                }
                var o = this._events[s];
                if (o.fn) {
                    if (o.fn === t && (!i || o.once) && (!r || o.context === r)) {
                        clearEvent(this, s);
                    }
                } else {
                    for(var u = 0, a = [], l = o.length; u < l; u++){
                        if (o[u].fn !== t || i && !o[u].once || r && o[u].context !== r) {
                            a.push(o[u]);
                        }
                    }
                    if (a.length) this._events[s] = a.length === 1 ? a[0] : a;
                    else clearEvent(this, s);
                }
                return this;
            };
            EventEmitter.prototype.removeAllListeners = function removeAllListeners(e) {
                var t;
                if (e) {
                    t = n ? n + e : e;
                    if (this._events[t]) clearEvent(this, t);
                } else {
                    this._events = new Events;
                    this._eventsCount = 0;
                }
                return this;
            };
            EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
            EventEmitter.prototype.addListener = EventEmitter.prototype.on;
            EventEmitter.prefixed = n;
            EventEmitter.EventEmitter = EventEmitter;
            if ("TURBOPACK compile-time truthy", 1) {
                e.exports = EventEmitter;
            }
        },
        213: (e)=>{
            e.exports = (e, t)=>{
                t = t || (()=>{});
                return e.then((e)=>new Promise((e)=>{
                        e(t());
                    }).then(()=>e), (e)=>new Promise((e)=>{
                        e(t());
                    }).then(()=>{
                        throw e;
                    }));
            };
        },
        574: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            function lowerBound(e, t, n) {
                let r = 0;
                let i = e.length;
                while(i > 0){
                    const s = i / 2 | 0;
                    let o = r + s;
                    if (n(e[o], t) <= 0) {
                        r = ++o;
                        i -= s + 1;
                    } else {
                        i = s;
                    }
                }
                return r;
            }
            t["default"] = lowerBound;
        },
        821: (e, t, n)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            const r = n(574);
            class PriorityQueue {
                constructor(){
                    this._queue = [];
                }
                enqueue(e, t) {
                    t = Object.assign({
                        priority: 0
                    }, t);
                    const n = {
                        priority: t.priority,
                        run: e
                    };
                    if (this.size && this._queue[this.size - 1].priority >= t.priority) {
                        this._queue.push(n);
                        return;
                    }
                    const i = r.default(this._queue, n, (e, t)=>t.priority - e.priority);
                    this._queue.splice(i, 0, n);
                }
                dequeue() {
                    const e = this._queue.shift();
                    return e === null || e === void 0 ? void 0 : e.run;
                }
                filter(e) {
                    return this._queue.filter((t)=>t.priority === e.priority).map((e)=>e.run);
                }
                get size() {
                    return this._queue.length;
                }
            }
            t["default"] = PriorityQueue;
        },
        816: (e, t, n)=>{
            const r = n(213);
            class TimeoutError extends Error {
                constructor(e){
                    super(e);
                    this.name = "TimeoutError";
                }
            }
            const pTimeout = (e, t, n)=>new Promise((i, s)=>{
                    if (typeof t !== "number" || t < 0) {
                        throw new TypeError("Expected `milliseconds` to be a positive number");
                    }
                    if (t === Infinity) {
                        i(e);
                        return;
                    }
                    const o = setTimeout(()=>{
                        if (typeof n === "function") {
                            try {
                                i(n());
                            } catch (e) {
                                s(e);
                            }
                            return;
                        }
                        const r = typeof n === "string" ? n : `Promise timed out after ${t} milliseconds`;
                        const o = n instanceof Error ? n : new TimeoutError(r);
                        if (typeof e.cancel === "function") {
                            e.cancel();
                        }
                        s(o);
                    }, t);
                    r(e.then(i, s), ()=>{
                        clearTimeout(o);
                    });
                });
            e.exports = pTimeout;
            e.exports["default"] = pTimeout;
            e.exports.TimeoutError = TimeoutError;
        }
    };
    var t = {};
    function __nccwpck_require__(n) {
        var r = t[n];
        if (r !== undefined) {
            return r.exports;
        }
        var i = t[n] = {
            exports: {}
        };
        var s = true;
        try {
            e[n](i, i.exports, __nccwpck_require__);
            s = false;
        } finally{
            if (s) delete t[n];
        }
        return i.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/FRONTEND/interent/node_modules/next/dist/compiled/p-queue") + "/";
    var n = {};
    (()=>{
        var e = n;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        const t = __nccwpck_require__(993);
        const r = __nccwpck_require__(816);
        const i = __nccwpck_require__(821);
        const empty = ()=>{};
        const s = new r.TimeoutError;
        class PQueue extends t {
            constructor(e){
                var t, n, r, s;
                super();
                this._intervalCount = 0;
                this._intervalEnd = 0;
                this._pendingCount = 0;
                this._resolveEmpty = empty;
                this._resolveIdle = empty;
                e = Object.assign({
                    carryoverConcurrencyCount: false,
                    intervalCap: Infinity,
                    interval: 0,
                    concurrency: Infinity,
                    autoStart: true,
                    queueClass: i.default
                }, e);
                if (!(typeof e.intervalCap === "number" && e.intervalCap >= 1)) {
                    throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(n = (t = e.intervalCap) === null || t === void 0 ? void 0 : t.toString()) !== null && n !== void 0 ? n : ""}\` (${typeof e.intervalCap})`);
                }
                if (e.interval === undefined || !(Number.isFinite(e.interval) && e.interval >= 0)) {
                    throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(s = (r = e.interval) === null || r === void 0 ? void 0 : r.toString()) !== null && s !== void 0 ? s : ""}\` (${typeof e.interval})`);
                }
                this._carryoverConcurrencyCount = e.carryoverConcurrencyCount;
                this._isIntervalIgnored = e.intervalCap === Infinity || e.interval === 0;
                this._intervalCap = e.intervalCap;
                this._interval = e.interval;
                this._queue = new e.queueClass;
                this._queueClass = e.queueClass;
                this.concurrency = e.concurrency;
                this._timeout = e.timeout;
                this._throwOnTimeout = e.throwOnTimeout === true;
                this._isPaused = e.autoStart === false;
            }
            get _doesIntervalAllowAnother() {
                return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
                return this._pendingCount < this._concurrency;
            }
            _next() {
                this._pendingCount--;
                this._tryToStartAnother();
                this.emit("next");
            }
            _resolvePromises() {
                this._resolveEmpty();
                this._resolveEmpty = empty;
                if (this._pendingCount === 0) {
                    this._resolveIdle();
                    this._resolveIdle = empty;
                    this.emit("idle");
                }
            }
            _onResumeInterval() {
                this._onInterval();
                this._initializeIntervalIfNeeded();
                this._timeoutId = undefined;
            }
            _isIntervalPaused() {
                const e = Date.now();
                if (this._intervalId === undefined) {
                    const t = this._intervalEnd - e;
                    if (t < 0) {
                        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
                    } else {
                        if (this._timeoutId === undefined) {
                            this._timeoutId = setTimeout(()=>{
                                this._onResumeInterval();
                            }, t);
                        }
                        return true;
                    }
                }
                return false;
            }
            _tryToStartAnother() {
                if (this._queue.size === 0) {
                    if (this._intervalId) {
                        clearInterval(this._intervalId);
                    }
                    this._intervalId = undefined;
                    this._resolvePromises();
                    return false;
                }
                if (!this._isPaused) {
                    const e = !this._isIntervalPaused();
                    if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                        const t = this._queue.dequeue();
                        if (!t) {
                            return false;
                        }
                        this.emit("active");
                        t();
                        if (e) {
                            this._initializeIntervalIfNeeded();
                        }
                        return true;
                    }
                }
                return false;
            }
            _initializeIntervalIfNeeded() {
                if (this._isIntervalIgnored || this._intervalId !== undefined) {
                    return;
                }
                this._intervalId = setInterval(()=>{
                    this._onInterval();
                }, this._interval);
                this._intervalEnd = Date.now() + this._interval;
            }
            _onInterval() {
                if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
                    clearInterval(this._intervalId);
                    this._intervalId = undefined;
                }
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
                this._processQueue();
            }
            _processQueue() {
                while(this._tryToStartAnother()){}
            }
            get concurrency() {
                return this._concurrency;
            }
            set concurrency(e) {
                if (!(typeof e === "number" && e >= 1)) {
                    throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e}\` (${typeof e})`);
                }
                this._concurrency = e;
                this._processQueue();
            }
            async add(e, t = {}) {
                return new Promise((n, i)=>{
                    const run = async ()=>{
                        this._pendingCount++;
                        this._intervalCount++;
                        try {
                            const o = this._timeout === undefined && t.timeout === undefined ? e() : r.default(Promise.resolve(e()), t.timeout === undefined ? this._timeout : t.timeout, ()=>{
                                if (t.throwOnTimeout === undefined ? this._throwOnTimeout : t.throwOnTimeout) {
                                    i(s);
                                }
                                return undefined;
                            });
                            n(await o);
                        } catch (e) {
                            i(e);
                        }
                        this._next();
                    };
                    this._queue.enqueue(run, t);
                    this._tryToStartAnother();
                    this.emit("add");
                });
            }
            async addAll(e, t) {
                return Promise.all(e.map(async (e)=>this.add(e, t)));
            }
            start() {
                if (!this._isPaused) {
                    return this;
                }
                this._isPaused = false;
                this._processQueue();
                return this;
            }
            pause() {
                this._isPaused = true;
            }
            clear() {
                this._queue = new this._queueClass;
            }
            async onEmpty() {
                if (this._queue.size === 0) {
                    return;
                }
                return new Promise((e)=>{
                    const t = this._resolveEmpty;
                    this._resolveEmpty = ()=>{
                        t();
                        e();
                    };
                });
            }
            async onIdle() {
                if (this._pendingCount === 0 && this._queue.size === 0) {
                    return;
                }
                return new Promise((e)=>{
                    const t = this._resolveIdle;
                    this._resolveIdle = ()=>{
                        t();
                        e();
                    };
                });
            }
            get size() {
                return this._queue.size;
            }
            sizeBy(e) {
                return this._queue.filter(e).length;
            }
            get pending() {
                return this._pendingCount;
            }
            get isPaused() {
                return this._isPaused;
            }
            get timeout() {
                return this._timeout;
            }
            set timeout(e) {
                this._timeout = e;
            }
        }
        e["default"] = PQueue;
    })();
    module.exports = n;
})();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/path-browserify/index.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function() {
    "use strict";
    var e = {
        114: function(e) {
            function assertPath(e) {
                if (typeof e !== "string") {
                    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
                }
            }
            function normalizeStringPosix(e, r) {
                var t = "";
                var i = 0;
                var n = -1;
                var a = 0;
                var f;
                for(var l = 0; l <= e.length; ++l){
                    if (l < e.length) f = e.charCodeAt(l);
                    else if (f === 47) break;
                    else f = 47;
                    if (f === 47) {
                        if (n === l - 1 || a === 1) {} else if (n !== l - 1 && a === 2) {
                            if (t.length < 2 || i !== 2 || t.charCodeAt(t.length - 1) !== 46 || t.charCodeAt(t.length - 2) !== 46) {
                                if (t.length > 2) {
                                    var s = t.lastIndexOf("/");
                                    if (s !== t.length - 1) {
                                        if (s === -1) {
                                            t = "";
                                            i = 0;
                                        } else {
                                            t = t.slice(0, s);
                                            i = t.length - 1 - t.lastIndexOf("/");
                                        }
                                        n = l;
                                        a = 0;
                                        continue;
                                    }
                                } else if (t.length === 2 || t.length === 1) {
                                    t = "";
                                    i = 0;
                                    n = l;
                                    a = 0;
                                    continue;
                                }
                            }
                            if (r) {
                                if (t.length > 0) t += "/..";
                                else t = "..";
                                i = 2;
                            }
                        } else {
                            if (t.length > 0) t += "/" + e.slice(n + 1, l);
                            else t = e.slice(n + 1, l);
                            i = l - n - 1;
                        }
                        n = l;
                        a = 0;
                    } else if (f === 46 && a !== -1) {
                        ++a;
                    } else {
                        a = -1;
                    }
                }
                return t;
            }
            function _format(e, r) {
                var t = r.dir || r.root;
                var i = r.base || (r.name || "") + (r.ext || "");
                if (!t) {
                    return i;
                }
                if (t === r.root) {
                    return t + i;
                }
                return t + e + i;
            }
            var r = {
                resolve: function resolve() {
                    var e = "";
                    var r = false;
                    var t;
                    for(var i = arguments.length - 1; i >= -1 && !r; i--){
                        var n;
                        if (i >= 0) n = arguments[i];
                        else {
                            if (t === undefined) t = "";
                            n = t;
                        }
                        assertPath(n);
                        if (n.length === 0) {
                            continue;
                        }
                        e = n + "/" + e;
                        r = n.charCodeAt(0) === 47;
                    }
                    e = normalizeStringPosix(e, !r);
                    if (r) {
                        if (e.length > 0) return "/" + e;
                        else return "/";
                    } else if (e.length > 0) {
                        return e;
                    } else {
                        return ".";
                    }
                },
                normalize: function normalize(e) {
                    assertPath(e);
                    if (e.length === 0) return ".";
                    var r = e.charCodeAt(0) === 47;
                    var t = e.charCodeAt(e.length - 1) === 47;
                    e = normalizeStringPosix(e, !r);
                    if (e.length === 0 && !r) e = ".";
                    if (e.length > 0 && t) e += "/";
                    if (r) return "/" + e;
                    return e;
                },
                isAbsolute: function isAbsolute(e) {
                    assertPath(e);
                    return e.length > 0 && e.charCodeAt(0) === 47;
                },
                join: function join() {
                    if (arguments.length === 0) return ".";
                    var e;
                    for(var t = 0; t < arguments.length; ++t){
                        var i = arguments[t];
                        assertPath(i);
                        if (i.length > 0) {
                            if (e === undefined) e = i;
                            else e += "/" + i;
                        }
                    }
                    if (e === undefined) return ".";
                    return r.normalize(e);
                },
                relative: function relative(e, t) {
                    assertPath(e);
                    assertPath(t);
                    if (e === t) return "";
                    e = r.resolve(e);
                    t = r.resolve(t);
                    if (e === t) return "";
                    var i = 1;
                    for(; i < e.length; ++i){
                        if (e.charCodeAt(i) !== 47) break;
                    }
                    var n = e.length;
                    var a = n - i;
                    var f = 1;
                    for(; f < t.length; ++f){
                        if (t.charCodeAt(f) !== 47) break;
                    }
                    var l = t.length;
                    var s = l - f;
                    var o = a < s ? a : s;
                    var u = -1;
                    var h = 0;
                    for(; h <= o; ++h){
                        if (h === o) {
                            if (s > o) {
                                if (t.charCodeAt(f + h) === 47) {
                                    return t.slice(f + h + 1);
                                } else if (h === 0) {
                                    return t.slice(f + h);
                                }
                            } else if (a > o) {
                                if (e.charCodeAt(i + h) === 47) {
                                    u = h;
                                } else if (h === 0) {
                                    u = 0;
                                }
                            }
                            break;
                        }
                        var c = e.charCodeAt(i + h);
                        var v = t.charCodeAt(f + h);
                        if (c !== v) break;
                        else if (c === 47) u = h;
                    }
                    var g = "";
                    for(h = i + u + 1; h <= n; ++h){
                        if (h === n || e.charCodeAt(h) === 47) {
                            if (g.length === 0) g += "..";
                            else g += "/..";
                        }
                    }
                    if (g.length > 0) return g + t.slice(f + u);
                    else {
                        f += u;
                        if (t.charCodeAt(f) === 47) ++f;
                        return t.slice(f);
                    }
                },
                _makeLong: function _makeLong(e) {
                    return e;
                },
                dirname: function dirname(e) {
                    assertPath(e);
                    if (e.length === 0) return ".";
                    var r = e.charCodeAt(0);
                    var t = r === 47;
                    var i = -1;
                    var n = true;
                    for(var a = e.length - 1; a >= 1; --a){
                        r = e.charCodeAt(a);
                        if (r === 47) {
                            if (!n) {
                                i = a;
                                break;
                            }
                        } else {
                            n = false;
                        }
                    }
                    if (i === -1) return t ? "/" : ".";
                    if (t && i === 1) return "//";
                    return e.slice(0, i);
                },
                basename: function basename(e, r) {
                    if (r !== undefined && typeof r !== "string") throw new TypeError('"ext" argument must be a string');
                    assertPath(e);
                    var t = 0;
                    var i = -1;
                    var n = true;
                    var a;
                    if (r !== undefined && r.length > 0 && r.length <= e.length) {
                        if (r.length === e.length && r === e) return "";
                        var f = r.length - 1;
                        var l = -1;
                        for(a = e.length - 1; a >= 0; --a){
                            var s = e.charCodeAt(a);
                            if (s === 47) {
                                if (!n) {
                                    t = a + 1;
                                    break;
                                }
                            } else {
                                if (l === -1) {
                                    n = false;
                                    l = a + 1;
                                }
                                if (f >= 0) {
                                    if (s === r.charCodeAt(f)) {
                                        if (--f === -1) {
                                            i = a;
                                        }
                                    } else {
                                        f = -1;
                                        i = l;
                                    }
                                }
                            }
                        }
                        if (t === i) i = l;
                        else if (i === -1) i = e.length;
                        return e.slice(t, i);
                    } else {
                        for(a = e.length - 1; a >= 0; --a){
                            if (e.charCodeAt(a) === 47) {
                                if (!n) {
                                    t = a + 1;
                                    break;
                                }
                            } else if (i === -1) {
                                n = false;
                                i = a + 1;
                            }
                        }
                        if (i === -1) return "";
                        return e.slice(t, i);
                    }
                },
                extname: function extname(e) {
                    assertPath(e);
                    var r = -1;
                    var t = 0;
                    var i = -1;
                    var n = true;
                    var a = 0;
                    for(var f = e.length - 1; f >= 0; --f){
                        var l = e.charCodeAt(f);
                        if (l === 47) {
                            if (!n) {
                                t = f + 1;
                                break;
                            }
                            continue;
                        }
                        if (i === -1) {
                            n = false;
                            i = f + 1;
                        }
                        if (l === 46) {
                            if (r === -1) r = f;
                            else if (a !== 1) a = 1;
                        } else if (r !== -1) {
                            a = -1;
                        }
                    }
                    if (r === -1 || i === -1 || a === 0 || a === 1 && r === i - 1 && r === t + 1) {
                        return "";
                    }
                    return e.slice(r, i);
                },
                format: function format(e) {
                    if (e === null || typeof e !== "object") {
                        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
                    }
                    return _format("/", e);
                },
                parse: function parse(e) {
                    assertPath(e);
                    var r = {
                        root: "",
                        dir: "",
                        base: "",
                        ext: "",
                        name: ""
                    };
                    if (e.length === 0) return r;
                    var t = e.charCodeAt(0);
                    var i = t === 47;
                    var n;
                    if (i) {
                        r.root = "/";
                        n = 1;
                    } else {
                        n = 0;
                    }
                    var a = -1;
                    var f = 0;
                    var l = -1;
                    var s = true;
                    var o = e.length - 1;
                    var u = 0;
                    for(; o >= n; --o){
                        t = e.charCodeAt(o);
                        if (t === 47) {
                            if (!s) {
                                f = o + 1;
                                break;
                            }
                            continue;
                        }
                        if (l === -1) {
                            s = false;
                            l = o + 1;
                        }
                        if (t === 46) {
                            if (a === -1) a = o;
                            else if (u !== 1) u = 1;
                        } else if (a !== -1) {
                            u = -1;
                        }
                    }
                    if (a === -1 || l === -1 || u === 0 || u === 1 && a === l - 1 && a === f + 1) {
                        if (l !== -1) {
                            if (f === 0 && i) r.base = r.name = e.slice(1, l);
                            else r.base = r.name = e.slice(f, l);
                        }
                    } else {
                        if (f === 0 && i) {
                            r.name = e.slice(1, a);
                            r.base = e.slice(1, l);
                        } else {
                            r.name = e.slice(f, a);
                            r.base = e.slice(f, l);
                        }
                        r.ext = e.slice(a, l);
                    }
                    if (f > 0) r.dir = e.slice(0, f - 1);
                    else if (i) r.dir = "/";
                    return r;
                },
                sep: "/",
                delimiter: ":",
                win32: null,
                posix: null
            };
            r.posix = r;
            e.exports = r;
        }
    };
    var r = {};
    function __nccwpck_require__(t) {
        var i = r[t];
        if (i !== undefined) {
            return i.exports;
        }
        var n = r[t] = {
            exports: {}
        };
        var a = true;
        try {
            e[t](n, n.exports, __nccwpck_require__);
            a = false;
        } finally{
            if (a) delete r[t];
        }
        return n.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/FRONTEND/interent/node_modules/next/dist/compiled/path-browserify") + "/";
    var t = __nccwpck_require__(114);
    module.exports = t;
})();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/path-to-regexp/index.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/FRONTEND/interent/node_modules/next/dist/compiled/path-to-regexp") + "/";
    var e = {};
    (()=>{
        var n = e;
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.pathToRegexp = n.tokensToRegexp = n.regexpToFunction = n.match = n.tokensToFunction = n.compile = n.parse = void 0;
        function lexer(e) {
            var n = [];
            var r = 0;
            while(r < e.length){
                var t = e[r];
                if (t === "*" || t === "+" || t === "?") {
                    n.push({
                        type: "MODIFIER",
                        index: r,
                        value: e[r++]
                    });
                    continue;
                }
                if (t === "\\") {
                    n.push({
                        type: "ESCAPED_CHAR",
                        index: r++,
                        value: e[r++]
                    });
                    continue;
                }
                if (t === "{") {
                    n.push({
                        type: "OPEN",
                        index: r,
                        value: e[r++]
                    });
                    continue;
                }
                if (t === "}") {
                    n.push({
                        type: "CLOSE",
                        index: r,
                        value: e[r++]
                    });
                    continue;
                }
                if (t === ":") {
                    var a = "";
                    var i = r + 1;
                    while(i < e.length){
                        var o = e.charCodeAt(i);
                        if (o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122 || o === 95) {
                            a += e[i++];
                            continue;
                        }
                        break;
                    }
                    if (!a) throw new TypeError("Missing parameter name at ".concat(r));
                    n.push({
                        type: "NAME",
                        index: r,
                        value: a
                    });
                    r = i;
                    continue;
                }
                if (t === "(") {
                    var c = 1;
                    var f = "";
                    var i = r + 1;
                    if (e[i] === "?") {
                        throw new TypeError('Pattern cannot start with "?" at '.concat(i));
                    }
                    while(i < e.length){
                        if (e[i] === "\\") {
                            f += e[i++] + e[i++];
                            continue;
                        }
                        if (e[i] === ")") {
                            c--;
                            if (c === 0) {
                                i++;
                                break;
                            }
                        } else if (e[i] === "(") {
                            c++;
                            if (e[i + 1] !== "?") {
                                throw new TypeError("Capturing groups are not allowed at ".concat(i));
                            }
                        }
                        f += e[i++];
                    }
                    if (c) throw new TypeError("Unbalanced pattern at ".concat(r));
                    if (!f) throw new TypeError("Missing pattern at ".concat(r));
                    n.push({
                        type: "PATTERN",
                        index: r,
                        value: f
                    });
                    r = i;
                    continue;
                }
                n.push({
                    type: "CHAR",
                    index: r,
                    value: e[r++]
                });
            }
            n.push({
                type: "END",
                index: r,
                value: ""
            });
            return n;
        }
        function parse(e, n) {
            if (n === void 0) {
                n = {};
            }
            var r = lexer(e);
            var t = n.prefixes, a = t === void 0 ? "./" : t, i = n.delimiter, o = i === void 0 ? "/#?" : i;
            var c = [];
            var f = 0;
            var u = 0;
            var p = "";
            var tryConsume = function(e) {
                if (u < r.length && r[u].type === e) return r[u++].value;
            };
            var mustConsume = function(e) {
                var n = tryConsume(e);
                if (n !== undefined) return n;
                var t = r[u], a = t.type, i = t.index;
                throw new TypeError("Unexpected ".concat(a, " at ").concat(i, ", expected ").concat(e));
            };
            var consumeText = function() {
                var e = "";
                var n;
                while(n = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")){
                    e += n;
                }
                return e;
            };
            var isSafe = function(e) {
                for(var n = 0, r = o; n < r.length; n++){
                    var t = r[n];
                    if (e.indexOf(t) > -1) return true;
                }
                return false;
            };
            var safePattern = function(e) {
                var n = c[c.length - 1];
                var r = e || (n && typeof n === "string" ? n : "");
                if (n && !r) {
                    throw new TypeError('Must have text between two parameters, missing text after "'.concat(n.name, '"'));
                }
                if (!r || isSafe(r)) return "[^".concat(escapeString(o), "]+?");
                return "(?:(?!".concat(escapeString(r), ")[^").concat(escapeString(o), "])+?");
            };
            while(u < r.length){
                var v = tryConsume("CHAR");
                var s = tryConsume("NAME");
                var d = tryConsume("PATTERN");
                if (s || d) {
                    var g = v || "";
                    if (a.indexOf(g) === -1) {
                        p += g;
                        g = "";
                    }
                    if (p) {
                        c.push(p);
                        p = "";
                    }
                    c.push({
                        name: s || f++,
                        prefix: g,
                        suffix: "",
                        pattern: d || safePattern(g),
                        modifier: tryConsume("MODIFIER") || ""
                    });
                    continue;
                }
                var x = v || tryConsume("ESCAPED_CHAR");
                if (x) {
                    p += x;
                    continue;
                }
                if (p) {
                    c.push(p);
                    p = "";
                }
                var h = tryConsume("OPEN");
                if (h) {
                    var g = consumeText();
                    var l = tryConsume("NAME") || "";
                    var m = tryConsume("PATTERN") || "";
                    var T = consumeText();
                    mustConsume("CLOSE");
                    c.push({
                        name: l || (m ? f++ : ""),
                        pattern: l && !m ? safePattern(g) : m,
                        prefix: g,
                        suffix: T,
                        modifier: tryConsume("MODIFIER") || ""
                    });
                    continue;
                }
                mustConsume("END");
            }
            return c;
        }
        n.parse = parse;
        function compile(e, n) {
            return tokensToFunction(parse(e, n), n);
        }
        n.compile = compile;
        function tokensToFunction(e, n) {
            if (n === void 0) {
                n = {};
            }
            var r = flags(n);
            var t = n.encode, a = t === void 0 ? function(e) {
                return e;
            } : t, i = n.validate, o = i === void 0 ? true : i;
            var c = e.map(function(e) {
                if (typeof e === "object") {
                    return new RegExp("^(?:".concat(e.pattern, ")$"), r);
                }
            });
            return function(n) {
                var r = "";
                for(var t = 0; t < e.length; t++){
                    var i = e[t];
                    if (typeof i === "string") {
                        r += i;
                        continue;
                    }
                    var f = n ? n[i.name] : undefined;
                    var u = i.modifier === "?" || i.modifier === "*";
                    var p = i.modifier === "*" || i.modifier === "+";
                    if (Array.isArray(f)) {
                        if (!p) {
                            throw new TypeError('Expected "'.concat(i.name, '" to not repeat, but got an array'));
                        }
                        if (f.length === 0) {
                            if (u) continue;
                            throw new TypeError('Expected "'.concat(i.name, '" to not be empty'));
                        }
                        for(var v = 0; v < f.length; v++){
                            var s = a(f[v], i);
                            if (o && !c[t].test(s)) {
                                throw new TypeError('Expected all "'.concat(i.name, '" to match "').concat(i.pattern, '", but got "').concat(s, '"'));
                            }
                            r += i.prefix + s + i.suffix;
                        }
                        continue;
                    }
                    if (typeof f === "string" || typeof f === "number") {
                        var s = a(String(f), i);
                        if (o && !c[t].test(s)) {
                            throw new TypeError('Expected "'.concat(i.name, '" to match "').concat(i.pattern, '", but got "').concat(s, '"'));
                        }
                        r += i.prefix + s + i.suffix;
                        continue;
                    }
                    if (u) continue;
                    var d = p ? "an array" : "a string";
                    throw new TypeError('Expected "'.concat(i.name, '" to be ').concat(d));
                }
                return r;
            };
        }
        n.tokensToFunction = tokensToFunction;
        function match(e, n) {
            var r = [];
            var t = pathToRegexp(e, r, n);
            return regexpToFunction(t, r, n);
        }
        n.match = match;
        function regexpToFunction(e, n, r) {
            if (r === void 0) {
                r = {};
            }
            var t = r.decode, a = t === void 0 ? function(e) {
                return e;
            } : t;
            return function(r) {
                var t = e.exec(r);
                if (!t) return false;
                var i = t[0], o = t.index;
                var c = Object.create(null);
                var _loop_1 = function(e) {
                    if (t[e] === undefined) return "continue";
                    var r = n[e - 1];
                    if (r.modifier === "*" || r.modifier === "+") {
                        c[r.name] = t[e].split(r.prefix + r.suffix).map(function(e) {
                            return a(e, r);
                        });
                    } else {
                        c[r.name] = a(t[e], r);
                    }
                };
                for(var f = 1; f < t.length; f++){
                    _loop_1(f);
                }
                return {
                    path: i,
                    index: o,
                    params: c
                };
            };
        }
        n.regexpToFunction = regexpToFunction;
        function escapeString(e) {
            return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
        }
        function flags(e) {
            return e && e.sensitive ? "" : "i";
        }
        function regexpToRegexp(e, n) {
            if (!n) return e;
            var r = /\((?:\?<(.*?)>)?(?!\?)/g;
            var t = 0;
            var a = r.exec(e.source);
            while(a){
                n.push({
                    name: a[1] || t++,
                    prefix: "",
                    suffix: "",
                    modifier: "",
                    pattern: ""
                });
                a = r.exec(e.source);
            }
            return e;
        }
        function arrayToRegexp(e, n, r) {
            var t = e.map(function(e) {
                return pathToRegexp(e, n, r).source;
            });
            return new RegExp("(?:".concat(t.join("|"), ")"), flags(r));
        }
        function stringToRegexp(e, n, r) {
            return tokensToRegexp(parse(e, r), n, r);
        }
        function tokensToRegexp(e, n, r) {
            if (r === void 0) {
                r = {};
            }
            var t = r.strict, a = t === void 0 ? false : t, i = r.start, o = i === void 0 ? true : i, c = r.end, f = c === void 0 ? true : c, u = r.encode, p = u === void 0 ? function(e) {
                return e;
            } : u, v = r.delimiter, s = v === void 0 ? "/#?" : v, d = r.endsWith, g = d === void 0 ? "" : d;
            var x = "[".concat(escapeString(g), "]|$");
            var h = "[".concat(escapeString(s), "]");
            var l = o ? "^" : "";
            for(var m = 0, T = e; m < T.length; m++){
                var E = T[m];
                if (typeof E === "string") {
                    l += escapeString(p(E));
                } else {
                    var w = escapeString(p(E.prefix));
                    var y = escapeString(p(E.suffix));
                    if (E.pattern) {
                        if (n) n.push(E);
                        if (w || y) {
                            if (E.modifier === "+" || E.modifier === "*") {
                                var R = E.modifier === "*" ? "?" : "";
                                l += "(?:".concat(w, "((?:").concat(E.pattern, ")(?:").concat(y).concat(w, "(?:").concat(E.pattern, "))*)").concat(y, ")").concat(R);
                            } else {
                                l += "(?:".concat(w, "(").concat(E.pattern, ")").concat(y, ")").concat(E.modifier);
                            }
                        } else {
                            if (E.modifier === "+" || E.modifier === "*") {
                                throw new TypeError('Can not repeat "'.concat(E.name, '" without a prefix and suffix'));
                            }
                            l += "(".concat(E.pattern, ")").concat(E.modifier);
                        }
                    } else {
                        l += "(?:".concat(w).concat(y, ")").concat(E.modifier);
                    }
                }
            }
            if (f) {
                if (!a) l += "".concat(h, "?");
                l += !r.endsWith ? "$" : "(?=".concat(x, ")");
            } else {
                var A = e[e.length - 1];
                var _ = typeof A === "string" ? h.indexOf(A[A.length - 1]) > -1 : A === undefined;
                if (!a) {
                    l += "(?:".concat(h, "(?=").concat(x, "))?");
                }
                if (!_) {
                    l += "(?=".concat(h, "|").concat(x, ")");
                }
            }
            return new RegExp(l, flags(r));
        }
        n.tokensToRegexp = tokensToRegexp;
        function pathToRegexp(e, n, r) {
            if (e instanceof RegExp) return regexpToRegexp(e, n);
            if (Array.isArray(e)) return arrayToRegexp(e, n, r);
            return stringToRegexp(e, n, r);
        }
        n.pathToRegexp = pathToRegexp;
    })();
    module.exports = e;
})();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/superstruct/index.cjs [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    var e = {
        318: function(e, t) {
            (function(e, n) {
                ("TURBOPACK compile-time truthy", 1) ? n(t) : "TURBOPACK unreachable";
            })(this, function(e) {
                "use strict";
                class StructError extends TypeError {
                    constructor(e, t){
                        let n;
                        const { message: r, explanation: i, ...c } = e;
                        const { path: o } = e;
                        const a = o.length === 0 ? r : `At path: ${o.join(".")} -- ${r}`;
                        super(i ?? a);
                        if (i != null) this.cause = a;
                        Object.assign(this, c);
                        this.name = this.constructor.name;
                        this.failures = ()=>n ?? (n = [
                                e,
                                ...t()
                            ]);
                    }
                }
                function isIterable(e) {
                    return isObject(e) && typeof e[Symbol.iterator] === "function";
                }
                function isObject(e) {
                    return typeof e === "object" && e != null;
                }
                function isPlainObject(e) {
                    if (Object.prototype.toString.call(e) !== "[object Object]") {
                        return false;
                    }
                    const t = Object.getPrototypeOf(e);
                    return t === null || t === Object.prototype;
                }
                function print(e) {
                    if (typeof e === "symbol") {
                        return e.toString();
                    }
                    return typeof e === "string" ? JSON.stringify(e) : `${e}`;
                }
                function shiftIterator(e) {
                    const { done: t, value: n } = e.next();
                    return t ? undefined : n;
                }
                function toFailure(e, t, n, r) {
                    if (e === true) {
                        return;
                    } else if (e === false) {
                        e = {};
                    } else if (typeof e === "string") {
                        e = {
                            message: e
                        };
                    }
                    const { path: i, branch: c } = t;
                    const { type: o } = n;
                    const { refinement: a, message: s = `Expected a value of type \`${o}\`${a ? ` with refinement \`${a}\`` : ""}, but received: \`${print(r)}\`` } = e;
                    return {
                        value: r,
                        type: o,
                        refinement: a,
                        key: i[i.length - 1],
                        path: i,
                        branch: c,
                        ...e,
                        message: s
                    };
                }
                function* toFailures(e, t, n, r) {
                    if (!isIterable(e)) {
                        e = [
                            e
                        ];
                    }
                    for (const i of e){
                        const e = toFailure(i, t, n, r);
                        if (e) {
                            yield e;
                        }
                    }
                }
                function* run(e, t, n = {}) {
                    const { path: r = [], branch: i = [
                        e
                    ], coerce: c = false, mask: o = false } = n;
                    const a = {
                        path: r,
                        branch: i
                    };
                    if (c) {
                        e = t.coercer(e, a);
                        if (o && t.type !== "type" && isObject(t.schema) && isObject(e) && !Array.isArray(e)) {
                            for(const n in e){
                                if (t.schema[n] === undefined) {
                                    delete e[n];
                                }
                            }
                        }
                    }
                    let s = "valid";
                    for (const r of t.validator(e, a)){
                        r.explanation = n.message;
                        s = "not_valid";
                        yield [
                            r,
                            undefined
                        ];
                    }
                    for (let [u, f, l] of t.entries(e, a)){
                        const t = run(f, l, {
                            path: u === undefined ? r : [
                                ...r,
                                u
                            ],
                            branch: u === undefined ? i : [
                                ...i,
                                f
                            ],
                            coerce: c,
                            mask: o,
                            message: n.message
                        });
                        for (const n of t){
                            if (n[0]) {
                                s = n[0].refinement != null ? "not_refined" : "not_valid";
                                yield [
                                    n[0],
                                    undefined
                                ];
                            } else if (c) {
                                f = n[1];
                                if (u === undefined) {
                                    e = f;
                                } else if (e instanceof Map) {
                                    e.set(u, f);
                                } else if (e instanceof Set) {
                                    e.add(f);
                                } else if (isObject(e)) {
                                    if (f !== undefined || u in e) e[u] = f;
                                }
                            }
                        }
                    }
                    if (s !== "not_valid") {
                        for (const r of t.refiner(e, a)){
                            r.explanation = n.message;
                            s = "not_refined";
                            yield [
                                r,
                                undefined
                            ];
                        }
                    }
                    if (s === "valid") {
                        yield [
                            undefined,
                            e
                        ];
                    }
                }
                class Struct {
                    constructor(e){
                        const { type: t, schema: n, validator: r, refiner: i, coercer: c = (e)=>e, entries: o = function*() {} } = e;
                        this.type = t;
                        this.schema = n;
                        this.entries = o;
                        this.coercer = c;
                        if (r) {
                            this.validator = (e, t)=>{
                                const n = r(e, t);
                                return toFailures(n, t, this, e);
                            };
                        } else {
                            this.validator = ()=>[];
                        }
                        if (i) {
                            this.refiner = (e, t)=>{
                                const n = i(e, t);
                                return toFailures(n, t, this, e);
                            };
                        } else {
                            this.refiner = ()=>[];
                        }
                    }
                    assert(e, t) {
                        return assert(e, this, t);
                    }
                    create(e, t) {
                        return create(e, this, t);
                    }
                    is(e) {
                        return is(e, this);
                    }
                    mask(e, t) {
                        return mask(e, this, t);
                    }
                    validate(e, t = {}) {
                        return validate(e, this, t);
                    }
                }
                function assert(e, t, n) {
                    const r = validate(e, t, {
                        message: n
                    });
                    if (r[0]) {
                        throw r[0];
                    }
                }
                function create(e, t, n) {
                    const r = validate(e, t, {
                        coerce: true,
                        message: n
                    });
                    if (r[0]) {
                        throw r[0];
                    } else {
                        return r[1];
                    }
                }
                function mask(e, t, n) {
                    const r = validate(e, t, {
                        coerce: true,
                        mask: true,
                        message: n
                    });
                    if (r[0]) {
                        throw r[0];
                    } else {
                        return r[1];
                    }
                }
                function is(e, t) {
                    const n = validate(e, t);
                    return !n[0];
                }
                function validate(e, t, n = {}) {
                    const r = run(e, t, n);
                    const i = shiftIterator(r);
                    if (i[0]) {
                        const e = new StructError(i[0], function*() {
                            for (const e of r){
                                if (e[0]) {
                                    yield e[0];
                                }
                            }
                        });
                        return [
                            e,
                            undefined
                        ];
                    } else {
                        const e = i[1];
                        return [
                            undefined,
                            e
                        ];
                    }
                }
                function assign(...e) {
                    const t = e[0].type === "type";
                    const n = e.map((e)=>e.schema);
                    const r = Object.assign({}, ...n);
                    return t ? type(r) : object(r);
                }
                function define(e, t) {
                    return new Struct({
                        type: e,
                        schema: null,
                        validator: t
                    });
                }
                function deprecated(e, t) {
                    return new Struct({
                        ...e,
                        refiner: (t, n)=>t === undefined || e.refiner(t, n),
                        validator (n, r) {
                            if (n === undefined) {
                                return true;
                            } else {
                                t(n, r);
                                return e.validator(n, r);
                            }
                        }
                    });
                }
                function dynamic(e) {
                    return new Struct({
                        type: "dynamic",
                        schema: null,
                        *entries (t, n) {
                            const r = e(t, n);
                            yield* r.entries(t, n);
                        },
                        validator (t, n) {
                            const r = e(t, n);
                            return r.validator(t, n);
                        },
                        coercer (t, n) {
                            const r = e(t, n);
                            return r.coercer(t, n);
                        },
                        refiner (t, n) {
                            const r = e(t, n);
                            return r.refiner(t, n);
                        }
                    });
                }
                function lazy(e) {
                    let t;
                    return new Struct({
                        type: "lazy",
                        schema: null,
                        *entries (n, r) {
                            t ?? (t = e());
                            yield* t.entries(n, r);
                        },
                        validator (n, r) {
                            t ?? (t = e());
                            return t.validator(n, r);
                        },
                        coercer (n, r) {
                            t ?? (t = e());
                            return t.coercer(n, r);
                        },
                        refiner (n, r) {
                            t ?? (t = e());
                            return t.refiner(n, r);
                        }
                    });
                }
                function omit(e, t) {
                    const { schema: n } = e;
                    const r = {
                        ...n
                    };
                    for (const e of t){
                        delete r[e];
                    }
                    switch(e.type){
                        case "type":
                            return type(r);
                        default:
                            return object(r);
                    }
                }
                function partial(e) {
                    const t = e instanceof Struct ? {
                        ...e.schema
                    } : {
                        ...e
                    };
                    for(const e in t){
                        t[e] = optional(t[e]);
                    }
                    return object(t);
                }
                function pick(e, t) {
                    const { schema: n } = e;
                    const r = {};
                    for (const e of t){
                        r[e] = n[e];
                    }
                    return object(r);
                }
                function struct(e, t) {
                    console.warn("superstruct@0.11 - The `struct` helper has been renamed to `define`.");
                    return define(e, t);
                }
                function any() {
                    return define("any", ()=>true);
                }
                function array(e) {
                    return new Struct({
                        type: "array",
                        schema: e,
                        *entries (t) {
                            if (e && Array.isArray(t)) {
                                for (const [n, r] of t.entries()){
                                    yield [
                                        n,
                                        r,
                                        e
                                    ];
                                }
                            }
                        },
                        coercer (e) {
                            return Array.isArray(e) ? e.slice() : e;
                        },
                        validator (e) {
                            return Array.isArray(e) || `Expected an array value, but received: ${print(e)}`;
                        }
                    });
                }
                function bigint() {
                    return define("bigint", (e)=>typeof e === "bigint");
                }
                function boolean() {
                    return define("boolean", (e)=>typeof e === "boolean");
                }
                function date() {
                    return define("date", (e)=>e instanceof Date && !isNaN(e.getTime()) || `Expected a valid \`Date\` object, but received: ${print(e)}`);
                }
                function enums(e) {
                    const t = {};
                    const n = e.map((e)=>print(e)).join();
                    for (const n of e){
                        t[n] = n;
                    }
                    return new Struct({
                        type: "enums",
                        schema: t,
                        validator (t) {
                            return e.includes(t) || `Expected one of \`${n}\`, but received: ${print(t)}`;
                        }
                    });
                }
                function func() {
                    return define("func", (e)=>typeof e === "function" || `Expected a function, but received: ${print(e)}`);
                }
                function instance(e) {
                    return define("instance", (t)=>t instanceof e || `Expected a \`${e.name}\` instance, but received: ${print(t)}`);
                }
                function integer() {
                    return define("integer", (e)=>typeof e === "number" && !isNaN(e) && Number.isInteger(e) || `Expected an integer, but received: ${print(e)}`);
                }
                function intersection(e) {
                    return new Struct({
                        type: "intersection",
                        schema: null,
                        *entries (t, n) {
                            for (const r of e){
                                yield* r.entries(t, n);
                            }
                        },
                        *validator (t, n) {
                            for (const r of e){
                                yield* r.validator(t, n);
                            }
                        },
                        *refiner (t, n) {
                            for (const r of e){
                                yield* r.refiner(t, n);
                            }
                        }
                    });
                }
                function literal(e) {
                    const t = print(e);
                    const n = typeof e;
                    return new Struct({
                        type: "literal",
                        schema: n === "string" || n === "number" || n === "boolean" ? e : null,
                        validator (n) {
                            return n === e || `Expected the literal \`${t}\`, but received: ${print(n)}`;
                        }
                    });
                }
                function map(e, t) {
                    return new Struct({
                        type: "map",
                        schema: null,
                        *entries (n) {
                            if (e && t && n instanceof Map) {
                                for (const [r, i] of n.entries()){
                                    yield [
                                        r,
                                        r,
                                        e
                                    ];
                                    yield [
                                        r,
                                        i,
                                        t
                                    ];
                                }
                            }
                        },
                        coercer (e) {
                            return e instanceof Map ? new Map(e) : e;
                        },
                        validator (e) {
                            return e instanceof Map || `Expected a \`Map\` object, but received: ${print(e)}`;
                        }
                    });
                }
                function never() {
                    return define("never", ()=>false);
                }
                function nullable(e) {
                    return new Struct({
                        ...e,
                        validator: (t, n)=>t === null || e.validator(t, n),
                        refiner: (t, n)=>t === null || e.refiner(t, n)
                    });
                }
                function number() {
                    return define("number", (e)=>typeof e === "number" && !isNaN(e) || `Expected a number, but received: ${print(e)}`);
                }
                function object(e) {
                    const t = e ? Object.keys(e) : [];
                    const n = never();
                    return new Struct({
                        type: "object",
                        schema: e ? e : null,
                        *entries (r) {
                            if (e && isObject(r)) {
                                const i = new Set(Object.keys(r));
                                for (const n of t){
                                    i.delete(n);
                                    yield [
                                        n,
                                        r[n],
                                        e[n]
                                    ];
                                }
                                for (const e of i){
                                    yield [
                                        e,
                                        r[e],
                                        n
                                    ];
                                }
                            }
                        },
                        validator (e) {
                            return isObject(e) || `Expected an object, but received: ${print(e)}`;
                        },
                        coercer (e) {
                            return isObject(e) ? {
                                ...e
                            } : e;
                        }
                    });
                }
                function optional(e) {
                    return new Struct({
                        ...e,
                        validator: (t, n)=>t === undefined || e.validator(t, n),
                        refiner: (t, n)=>t === undefined || e.refiner(t, n)
                    });
                }
                function record(e, t) {
                    return new Struct({
                        type: "record",
                        schema: null,
                        *entries (n) {
                            if (isObject(n)) {
                                for(const r in n){
                                    const i = n[r];
                                    yield [
                                        r,
                                        r,
                                        e
                                    ];
                                    yield [
                                        r,
                                        i,
                                        t
                                    ];
                                }
                            }
                        },
                        validator (e) {
                            return isObject(e) || `Expected an object, but received: ${print(e)}`;
                        }
                    });
                }
                function regexp() {
                    return define("regexp", (e)=>e instanceof RegExp);
                }
                function set(e) {
                    return new Struct({
                        type: "set",
                        schema: null,
                        *entries (t) {
                            if (e && t instanceof Set) {
                                for (const n of t){
                                    yield [
                                        n,
                                        n,
                                        e
                                    ];
                                }
                            }
                        },
                        coercer (e) {
                            return e instanceof Set ? new Set(e) : e;
                        },
                        validator (e) {
                            return e instanceof Set || `Expected a \`Set\` object, but received: ${print(e)}`;
                        }
                    });
                }
                function string() {
                    return define("string", (e)=>typeof e === "string" || `Expected a string, but received: ${print(e)}`);
                }
                function tuple(e) {
                    const t = never();
                    return new Struct({
                        type: "tuple",
                        schema: null,
                        *entries (n) {
                            if (Array.isArray(n)) {
                                const r = Math.max(e.length, n.length);
                                for(let i = 0; i < r; i++){
                                    yield [
                                        i,
                                        n[i],
                                        e[i] || t
                                    ];
                                }
                            }
                        },
                        validator (e) {
                            return Array.isArray(e) || `Expected an array, but received: ${print(e)}`;
                        }
                    });
                }
                function type(e) {
                    const t = Object.keys(e);
                    return new Struct({
                        type: "type",
                        schema: e,
                        *entries (n) {
                            if (isObject(n)) {
                                for (const r of t){
                                    yield [
                                        r,
                                        n[r],
                                        e[r]
                                    ];
                                }
                            }
                        },
                        validator (e) {
                            return isObject(e) || `Expected an object, but received: ${print(e)}`;
                        },
                        coercer (e) {
                            return isObject(e) ? {
                                ...e
                            } : e;
                        }
                    });
                }
                function union(e) {
                    const t = e.map((e)=>e.type).join(" | ");
                    return new Struct({
                        type: "union",
                        schema: null,
                        coercer (t) {
                            for (const n of e){
                                const [e, r] = n.validate(t, {
                                    coerce: true
                                });
                                if (!e) {
                                    return r;
                                }
                            }
                            return t;
                        },
                        validator (n, r) {
                            const i = [];
                            for (const t of e){
                                const [...e] = run(n, t, r);
                                const [c] = e;
                                if (!c[0]) {
                                    return [];
                                } else {
                                    for (const [t] of e){
                                        if (t) {
                                            i.push(t);
                                        }
                                    }
                                }
                            }
                            return [
                                `Expected the value to satisfy a union of \`${t}\`, but received: ${print(n)}`,
                                ...i
                            ];
                        }
                    });
                }
                function unknown() {
                    return define("unknown", ()=>true);
                }
                function coerce(e, t, n) {
                    return new Struct({
                        ...e,
                        coercer: (r, i)=>is(r, t) ? e.coercer(n(r, i), i) : e.coercer(r, i)
                    });
                }
                function defaulted(e, t, n = {}) {
                    return coerce(e, unknown(), (e)=>{
                        const r = typeof t === "function" ? t() : t;
                        if (e === undefined) {
                            return r;
                        }
                        if (!n.strict && isPlainObject(e) && isPlainObject(r)) {
                            const t = {
                                ...e
                            };
                            let n = false;
                            for(const e in r){
                                if (t[e] === undefined) {
                                    t[e] = r[e];
                                    n = true;
                                }
                            }
                            if (n) {
                                return t;
                            }
                        }
                        return e;
                    });
                }
                function trimmed(e) {
                    return coerce(e, string(), (e)=>e.trim());
                }
                function empty(e) {
                    return refine(e, "empty", (t)=>{
                        const n = getSize(t);
                        return n === 0 || `Expected an empty ${e.type} but received one with a size of \`${n}\``;
                    });
                }
                function getSize(e) {
                    if (e instanceof Map || e instanceof Set) {
                        return e.size;
                    } else {
                        return e.length;
                    }
                }
                function max(e, t, n = {}) {
                    const { exclusive: r } = n;
                    return refine(e, "max", (n)=>r ? n < t : n <= t || `Expected a ${e.type} less than ${r ? "" : "or equal to "}${t} but received \`${n}\``);
                }
                function min(e, t, n = {}) {
                    const { exclusive: r } = n;
                    return refine(e, "min", (n)=>r ? n > t : n >= t || `Expected a ${e.type} greater than ${r ? "" : "or equal to "}${t} but received \`${n}\``);
                }
                function nonempty(e) {
                    return refine(e, "nonempty", (t)=>{
                        const n = getSize(t);
                        return n > 0 || `Expected a nonempty ${e.type} but received an empty one`;
                    });
                }
                function pattern(e, t) {
                    return refine(e, "pattern", (n)=>t.test(n) || `Expected a ${e.type} matching \`/${t.source}/\` but received "${n}"`);
                }
                function size(e, t, n = t) {
                    const r = `Expected a ${e.type}`;
                    const i = t === n ? `of \`${t}\`` : `between \`${t}\` and \`${n}\``;
                    return refine(e, "size", (e)=>{
                        if (typeof e === "number" || e instanceof Date) {
                            return t <= e && e <= n || `${r} ${i} but received \`${e}\``;
                        } else if (e instanceof Map || e instanceof Set) {
                            const { size: c } = e;
                            return t <= c && c <= n || `${r} with a size ${i} but received one with a size of \`${c}\``;
                        } else {
                            const { length: c } = e;
                            return t <= c && c <= n || `${r} with a length ${i} but received one with a length of \`${c}\``;
                        }
                    });
                }
                function refine(e, t, n) {
                    return new Struct({
                        ...e,
                        *refiner (r, i) {
                            yield* e.refiner(r, i);
                            const c = n(r, i);
                            const o = toFailures(c, i, e, r);
                            for (const e of o){
                                yield {
                                    ...e,
                                    refinement: t
                                };
                            }
                        }
                    });
                }
                e.Struct = Struct;
                e.StructError = StructError;
                e.any = any;
                e.array = array;
                e.assert = assert;
                e.assign = assign;
                e.bigint = bigint;
                e.boolean = boolean;
                e.coerce = coerce;
                e.create = create;
                e.date = date;
                e.defaulted = defaulted;
                e.define = define;
                e.deprecated = deprecated;
                e.dynamic = dynamic;
                e.empty = empty;
                e.enums = enums;
                e.func = func;
                e.instance = instance;
                e.integer = integer;
                e.intersection = intersection;
                e.is = is;
                e.lazy = lazy;
                e.literal = literal;
                e.map = map;
                e.mask = mask;
                e.max = max;
                e.min = min;
                e.never = never;
                e.nonempty = nonempty;
                e.nullable = nullable;
                e.number = number;
                e.object = object;
                e.omit = omit;
                e.optional = optional;
                e.partial = partial;
                e.pattern = pattern;
                e.pick = pick;
                e.record = record;
                e.refine = refine;
                e.regexp = regexp;
                e.set = set;
                e.size = size;
                e.string = string;
                e.struct = struct;
                e.trimmed = trimmed;
                e.tuple = tuple;
                e.type = type;
                e.union = union;
                e.unknown = unknown;
                e.validate = validate;
            });
        }
    };
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/FRONTEND/interent/node_modules/next/dist/compiled/superstruct") + "/";
    var t = {};
    e[318](0, t);
    module.exports = t;
})();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/cjs/react.react-server.development.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react.react-server.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "production" !== ("TURBOPACK compile-time value", "development") && function() {
    function noop() {}
    function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(oldElement.type, newKey, oldElement.props, oldElement._owner, oldElement._debugStack, oldElement._debugTask);
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
        var escaperLookup = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
        });
    }
    function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
    }
    function resolveThenable(thenable) {
        switch(thenable.status){
            case "fulfilled":
                return thenable.value;
            case "rejected":
                throw thenable.reason;
            default:
                switch("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
                    "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                }, function(error) {
                    "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                })), thenable.status){
                    case "fulfilled":
                        return thenable.value;
                    case "rejected":
                        throw thenable.reason;
                }
        }
        throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = !1;
        if (null === children) invokeCallback = !0;
        else switch(type){
            case "bigint":
            case "string":
            case "number":
                invokeCallback = !0;
                break;
            case "object":
                switch(children.$$typeof){
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                        invokeCallback = !0;
                        break;
                    case REACT_LAZY_TYPE:
                        return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
                }
        }
        if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
                return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children)) for(var i = 0; i < children.length; i++)nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
        else if (i = getIteratorFn(children), "function" === typeof i) for(i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0), children = i.call(children), i = 0; !(nameSoFar = children.next()).done;)nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
        else if ("object" === type) {
            if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
            array = String(children);
            throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
        }
        return invokeCallback;
    }
    function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
        });
        return result;
    }
    function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher;
    }
    function lazyInitializer(payload) {
        if (-1 === payload._status) {
            var ioInfo = payload._ioInfo;
            null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
            ioInfo = payload._result;
            var thenable = ioInfo();
            thenable.then(function(moduleObject) {
                if (0 === payload._status || -1 === payload._status) {
                    payload._status = 1;
                    payload._result = moduleObject;
                    var _ioInfo = payload._ioInfo;
                    null != _ioInfo && (_ioInfo.end = performance.now());
                    void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
                }
            }, function(error) {
                if (0 === payload._status || -1 === payload._status) {
                    payload._status = 2;
                    payload._result = error;
                    var _ioInfo2 = payload._ioInfo;
                    null != _ioInfo2 && (_ioInfo2.end = performance.now());
                    void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
            });
            ioInfo = payload._ioInfo;
            if (null != ioInfo) {
                ioInfo.value = thenable;
                var displayName = thenable.displayName;
                "string" === typeof displayName && (ioInfo.name = displayName);
            }
            -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status) return ioInfo = payload._result, void 0 === ioInfo && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", ioInfo), "default" in ioInfo || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", ioInfo), ioInfo.default;
        throw payload._result;
    }
    function createCacheRoot() {
        return new WeakMap();
    }
    function createCacheNode() {
        return {
            s: 0,
            v: void 0,
            o: null,
            p: null
        };
    }
    var ReactSharedInternals = {
        H: null,
        A: null,
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
    }, isArrayImpl = Array.isArray, REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), hasOwnProperty = Object.prototype.hasOwnProperty, assign = Object.assign, createTask = console.createTask ? console.createTask : function() {
        return null;
    }, createFakeCallStack = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    }, specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = createFakeCallStack.react_stack_bottom_frame.bind(createFakeCallStack, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex = /\/+/g;
    exports.Children = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
                forEachFunc.apply(this, arguments);
            }, forEachContext);
        },
        count: function(children) {
            var n = 0;
            mapChildren(children, function() {
                n++;
            });
            return n;
        },
        toArray: function(children) {
            return mapChildren(children, function(child) {
                return child;
            }) || [];
        },
        only: function(children) {
            if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
            return children;
        }
    };
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.cache = function(fn) {
        return function() {
            var dispatcher = ReactSharedInternals.A;
            if (!dispatcher) return fn.apply(null, arguments);
            var fnMap = dispatcher.getCacheForType(createCacheRoot);
            dispatcher = fnMap.get(fn);
            void 0 === dispatcher && (dispatcher = createCacheNode(), fnMap.set(fn, dispatcher));
            fnMap = 0;
            for(var l = arguments.length; fnMap < l; fnMap++){
                var arg = arguments[fnMap];
                if ("function" === typeof arg || "object" === typeof arg && null !== arg) {
                    var objectCache = dispatcher.o;
                    null === objectCache && (dispatcher.o = objectCache = new WeakMap());
                    dispatcher = objectCache.get(arg);
                    void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
                } else objectCache = dispatcher.p, null === objectCache && (dispatcher.p = objectCache = new Map()), dispatcher = objectCache.get(arg), void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
            }
            if (1 === dispatcher.s) return dispatcher.v;
            if (2 === dispatcher.s) throw dispatcher.v;
            try {
                var result = fn.apply(null, arguments);
                fnMap = dispatcher;
                fnMap.s = 1;
                return fnMap.v = result;
            } catch (error) {
                throw result = dispatcher, result.s = 2, result.v = error, error;
            }
        };
    };
    exports.cacheSignal = function() {
        var dispatcher = ReactSharedInternals.A;
        return dispatcher ? dispatcher.cacheSignal() : null;
    };
    exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
    };
    exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
            var JSCompiler_inline_result;
            a: {
                if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
                    JSCompiler_inline_result = !1;
                    break a;
                }
                JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for(propName in config)!hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for(var i = 0; i < propName; i++)JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
        }
        props = ReactElement(element.type, key, props, owner, element._debugStack, element._debugTask);
        for(key = 2; key < arguments.length; key++)owner = arguments[key], isValidElement(owner) && owner._store && (owner._store.validated = 1);
        return props;
    };
    exports.createElement = function(type, config, children) {
        for(var i = 2; i < arguments.length; i++){
            var node = arguments[i];
            isValidElement(node) && node._store && (node._store.validated = 1);
        }
        i = {};
        node = null;
        if (null != config) for(propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), node = "" + config.key), config)hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
            for(var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
        }
        if (type && type.defaultProps) for(propName in childrenLength = type.defaultProps, childrenLength)void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        node && defineKeyPropWarningGetter(i, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(type, node, i, getOwner(), propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.createRef = function() {
        var refObject = {
            current: null
        };
        Object.seal(refObject);
        return refObject;
    };
    exports.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : "function" !== typeof render ? console.error("forwardRef requires a render function but was given %s.", null === render ? "null" : typeof render) : 0 !== render.length && 2 !== render.length && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", 1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
        null != render && null != render.defaultProps && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
        var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render: render
        }, ownName;
        Object.defineProperty(elementType, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return ownName;
            },
            set: function(name) {
                ownName = name;
                render.name || render.displayName || (Object.defineProperty(render, "name", {
                    value: name
                }), render.displayName = name);
            }
        });
        return elementType;
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
        ctor = {
            _status: -1,
            _result: ctor
        };
        var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: ctor,
            _init: lazyInitializer
        }, ioInfo = {
            name: "lazy",
            start: -1,
            end: -1,
            value: null,
            owner: null,
            debugStack: Error("react-stack-top-frame"),
            debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [
            {
                awaited: ioInfo
            }
        ];
        return lazyType;
    };
    exports.memo = function(type, compare) {
        null == type && console.error("memo: The first argument must be a component. Instead received: %s", null === type ? "null" : typeof type);
        compare = {
            $$typeof: REACT_MEMO_TYPE,
            type: type,
            compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return ownName;
            },
            set: function(name) {
                ownName = name;
                type.name || type.displayName || (Object.defineProperty(type, "name", {
                    value: name
                }), type.displayName = name);
            }
        });
        return compare;
    };
    exports.use = function(usable) {
        return resolveDispatcher().use(usable);
    };
    exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
    };
    exports.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
    };
    exports.useId = function() {
        return resolveDispatcher().useId();
    };
    exports.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
    };
    exports.version = "19.2.0-canary-0bdb9206-20250818";
}();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/react.react-server.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/cjs/react.react-server.development.js [app-edge-route] (ecmascript)");
}
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/string-hash/index.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    var e = {
        328: (e)=>{
            function hash(e) {
                var r = 5381, _ = e.length;
                while(_){
                    r = r * 33 ^ e.charCodeAt(--_);
                }
                return r >>> 0;
            }
            e.exports = hash;
        }
    };
    var r = {};
    function __nccwpck_require__(_) {
        var a = r[_];
        if (a !== undefined) {
            return a.exports;
        }
        var t = r[_] = {
            exports: {}
        };
        var i = true;
        try {
            e[_](t, t.exports, __nccwpck_require__);
            i = false;
        } finally{
            if (i) delete r[_];
        }
        return t.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/FRONTEND/interent/node_modules/next/dist/compiled/string-hash") + "/";
    var _ = __nccwpck_require__(328);
    module.exports = _;
})();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/react-dom/cjs/react-dom.react-server.development.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-dom.react-server.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "production" !== ("TURBOPACK compile-time value", "development") && function() {
    function noop() {}
    function getCrossOriginStringAs(as, input) {
        if ("font" === as) return "";
        if ("string" === typeof input) return "use-credentials" === input ? input : "";
    }
    function getValueDescriptorExpectingObjectForWarning(thing) {
        return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : 'something with type "' + typeof thing + '"';
    }
    function getValueDescriptorExpectingEnumForWarning(thing) {
        return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : "string" === typeof thing ? JSON.stringify(thing) : "number" === typeof thing ? "`" + thing + "`" : 'something with type "' + typeof thing + '"';
    }
    var React = __turbopack_context__.r("[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/react.react-server.js [app-edge-route] (ecmascript)"), Internals = {
        d: {
            f: noop,
            r: function() {
                throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
            },
            D: noop,
            C: noop,
            L: noop,
            m: noop,
            X: noop,
            S: noop,
            M: noop
        },
        p: 0,
        findDOMNode: null
    };
    if (!React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
    "function" === typeof Map && null != Map.prototype && "function" === typeof Map.prototype.forEach && "function" === typeof Set && null != Set.prototype && "function" === typeof Set.prototype.clear && "function" === typeof Set.prototype.forEach || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
    exports.preconnect = function(href, options) {
        "string" === typeof href && href ? null != options && "object" !== typeof options ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", getValueDescriptorExpectingEnumForWarning(options)) : null != options && "string" !== typeof options.crossOrigin && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", getValueDescriptorExpectingObjectForWarning(options.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
        "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
    };
    exports.prefetchDNS = function(href) {
        if ("string" !== typeof href || !href) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
        else if (1 < arguments.length) {
            var options = arguments[1];
            "object" === typeof options && options.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options));
        }
        "string" === typeof href && Internals.d.D(href);
    };
    exports.preinit = function(href, options) {
        "string" === typeof href && href ? null == options || "object" !== typeof options ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", getValueDescriptorExpectingEnumForWarning(options)) : "style" !== options.as && "script" !== options.as && console.error('ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".', getValueDescriptorExpectingEnumForWarning(options.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
        if ("string" === typeof href && options && "string" === typeof options.as) {
            var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
            "style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
                crossOrigin: crossOrigin,
                integrity: integrity,
                fetchPriority: fetchPriority
            }) : "script" === as && Internals.d.X(href, {
                crossOrigin: crossOrigin,
                integrity: integrity,
                fetchPriority: fetchPriority,
                nonce: "string" === typeof options.nonce ? options.nonce : void 0
            });
        }
    };
    exports.preinitModule = function(href, options) {
        var encountered = "";
        "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
        void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "script" !== options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".");
        if (encountered) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", encountered);
        else switch(encountered = options && "string" === typeof options.as ? options.as : "script", encountered){
            case "script":
                break;
            default:
                encountered = getValueDescriptorExpectingEnumForWarning(encountered), console.error('ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)', encountered, href);
        }
        if ("string" === typeof href) if ("object" === typeof options && null !== options) {
            if (null == options.as || "script" === options.as) encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.M(href, {
                crossOrigin: encountered,
                integrity: "string" === typeof options.integrity ? options.integrity : void 0,
                nonce: "string" === typeof options.nonce ? options.nonce : void 0
            });
        } else null == options && Internals.d.M(href);
    };
    exports.preload = function(href, options) {
        var encountered = "";
        "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
        null == options || "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : "string" === typeof options.as && options.as || (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
        encountered && console.error('ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s', encountered);
        if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
            encountered = options.as;
            var crossOrigin = getCrossOriginStringAs(encountered, options.crossOrigin);
            Internals.d.L(href, encountered, {
                crossOrigin: crossOrigin,
                integrity: "string" === typeof options.integrity ? options.integrity : void 0,
                nonce: "string" === typeof options.nonce ? options.nonce : void 0,
                type: "string" === typeof options.type ? options.type : void 0,
                fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
                referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
                imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
                imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
                media: "string" === typeof options.media ? options.media : void 0
            });
        }
    };
    exports.preloadModule = function(href, options) {
        var encountered = "";
        "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
        void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "string" !== typeof options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
        encountered && console.error('ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s', encountered);
        "string" === typeof href && (options ? (encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.m(href, {
            as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
            crossOrigin: encountered,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0
        })) : Internals.d.m(href));
    };
    exports.version = "19.2.0-canary-0bdb9206-20250818";
}();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/react-dom/react-dom.react-server.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/FRONTEND/interent/node_modules/next/dist/compiled/react-dom/cjs/react-dom.react-server.development.js [app-edge-route] (ecmascript)");
}
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/react-server-dom-turbopack/cjs/react-server-dom-turbopack-server.edge.development.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-server-dom-turbopack-server.edge.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "production" !== ("TURBOPACK compile-time value", "development") && function() {
    function voidHandler() {}
    function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function _defineProperty(obj, key, value) {
        a: if ("object" == typeof key && key) {
            var e = key[Symbol.toPrimitive];
            if (void 0 !== e) {
                key = e.call(key, "string");
                if ("object" != typeof key) break a;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            key = String(key);
        }
        key = "symbol" == typeof key ? key : key + "";
        key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value;
        return obj;
    }
    function handleErrorInNextTick(error) {
        setTimeout(function() {
            throw error;
        });
    }
    function writeChunkAndReturn(destination, chunk) {
        if (0 !== chunk.byteLength) if (2048 < chunk.byteLength) 0 < writtenBytes && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = new Uint8Array(2048), writtenBytes = 0), destination.enqueue(chunk);
        else {
            var allowableBytes = currentView.length - writtenBytes;
            allowableBytes < chunk.byteLength && (0 === allowableBytes ? destination.enqueue(currentView) : (currentView.set(chunk.subarray(0, allowableBytes), writtenBytes), destination.enqueue(currentView), chunk = chunk.subarray(allowableBytes)), currentView = new Uint8Array(2048), writtenBytes = 0);
            currentView.set(chunk, writtenBytes);
            writtenBytes += chunk.byteLength;
        }
        return !0;
    }
    function completeWriting(destination) {
        currentView && 0 < writtenBytes && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = null, writtenBytes = 0);
    }
    function stringToChunk(content) {
        return textEncoder.encode(content);
    }
    function byteLengthOfChunk(chunk) {
        return chunk.byteLength;
    }
    function closeWithError(destination, error) {
        "function" === typeof destination.error ? destination.error(error) : destination.close();
    }
    function isClientReference(reference) {
        return reference.$$typeof === CLIENT_REFERENCE_TAG$1;
    }
    function registerClientReferenceImpl(proxyImplementation, id, async) {
        return Object.defineProperties(proxyImplementation, {
            $$typeof: {
                value: CLIENT_REFERENCE_TAG$1
            },
            $$id: {
                value: id
            },
            $$async: {
                value: async
            }
        });
    }
    function bind() {
        var newFn = FunctionBind.apply(this, arguments);
        if (this.$$typeof === SERVER_REFERENCE_TAG) {
            null != arguments[0] && console.error('Cannot bind "this" of a Server Action. Pass null or undefined as the first argument to .bind().');
            var args = ArraySlice.call(arguments, 1), $$typeof = {
                value: SERVER_REFERENCE_TAG
            }, $$id = {
                value: this.$$id
            };
            args = {
                value: this.$$bound ? this.$$bound.concat(args) : args
            };
            return Object.defineProperties(newFn, {
                $$typeof: $$typeof,
                $$id: $$id,
                $$bound: args,
                $$location: {
                    value: this.$$location,
                    configurable: !0
                },
                bind: {
                    value: bind,
                    configurable: !0
                }
            });
        }
        return newFn;
    }
    function getReference(target, name) {
        switch(name){
            case "$$typeof":
                return target.$$typeof;
            case "$$id":
                return target.$$id;
            case "$$async":
                return target.$$async;
            case "name":
                return target.name;
            case "defaultProps":
                return;
            case "_debugInfo":
                return;
            case "toJSON":
                return;
            case Symbol.toPrimitive:
                return Object.prototype[Symbol.toPrimitive];
            case Symbol.toStringTag:
                return Object.prototype[Symbol.toStringTag];
            case "__esModule":
                var moduleId = target.$$id;
                target.default = registerClientReferenceImpl(function() {
                    throw Error("Attempted to call the default export of " + moduleId + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                }, target.$$id + "#", target.$$async);
                return !0;
            case "then":
                if (target.then) return target.then;
                if (target.$$async) return;
                var clientReference = registerClientReferenceImpl({}, target.$$id, !0), proxy = new Proxy(clientReference, proxyHandlers$1);
                target.status = "fulfilled";
                target.value = proxy;
                return target.then = registerClientReferenceImpl(function(resolve) {
                    return Promise.resolve(resolve(proxy));
                }, target.$$id + "#then", !1);
        }
        if ("symbol" === typeof name) throw Error("Cannot read Symbol exports. Only named exports are supported on a client module imported on the server.");
        clientReference = target[name];
        clientReference || (clientReference = registerClientReferenceImpl(function() {
            throw Error("Attempted to call " + String(name) + "() from the server but " + String(name) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
        }, target.$$id + "#" + name, target.$$async), Object.defineProperty(clientReference, "name", {
            value: name
        }), clientReference = target[name] = new Proxy(clientReference, deepProxyHandlers));
        return clientReference;
    }
    function resolveClientReferenceMetadata(config, clientReference) {
        var modulePath = clientReference.$$id, name = "", resolvedModuleData = config[modulePath];
        if (resolvedModuleData) name = resolvedModuleData.name;
        else {
            var idx = modulePath.lastIndexOf("#");
            -1 !== idx && (name = modulePath.slice(idx + 1), resolvedModuleData = config[modulePath.slice(0, idx)]);
            if (!resolvedModuleData) throw Error('Could not find the module "' + modulePath + '" in the React Client Manifest. This is probably a bug in the React Server Components bundler.');
        }
        if (!0 === resolvedModuleData.async && !0 === clientReference.$$async) throw Error('The module "' + modulePath + '" is marked as an async ESM module but was loaded as a CJS proxy. This is probably a bug in the React Server Components bundler.');
        return !0 === resolvedModuleData.async || !0 === clientReference.$$async ? [
            resolvedModuleData.id,
            resolvedModuleData.chunks,
            name,
            1
        ] : [
            resolvedModuleData.id,
            resolvedModuleData.chunks,
            name
        ];
    }
    function trimOptions(options) {
        if (null == options) return null;
        var hasProperties = !1, trimmed = {}, key;
        for(key in options)null != options[key] && (hasProperties = !0, trimmed[key] = options[key]);
        return hasProperties ? trimmed : null;
    }
    function collectStackTracePrivate(error, structuredStackTrace) {
        error = [];
        for(var i = framesToSkip; i < structuredStackTrace.length; i++){
            var callSite = structuredStackTrace[i], name = callSite.getFunctionName() || "<anonymous>";
            if (name.includes("react_stack_bottom_frame")) break;
            else if (callSite.isNative()) callSite = callSite.isAsync(), error.push([
                name,
                "",
                0,
                0,
                0,
                0,
                callSite
            ]);
            else {
                if (callSite.isConstructor()) name = "new " + name;
                else if (!callSite.isToplevel()) {
                    var callSite$jscomp$0 = callSite;
                    name = callSite$jscomp$0.getTypeName();
                    var methodName = callSite$jscomp$0.getMethodName();
                    callSite$jscomp$0 = callSite$jscomp$0.getFunctionName();
                    var result = "";
                    callSite$jscomp$0 ? (name && identifierRegExp.test(callSite$jscomp$0) && callSite$jscomp$0 !== name && (result += name + "."), result += callSite$jscomp$0, !methodName || callSite$jscomp$0 === methodName || callSite$jscomp$0.endsWith("." + methodName) || callSite$jscomp$0.endsWith(" " + methodName) || (result += " [as " + methodName + "]")) : (name && (result += name + "."), result = methodName ? result + methodName : result + "<anonymous>");
                    name = result;
                }
                "<anonymous>" === name && (name = "");
                methodName = callSite.getScriptNameOrSourceURL() || "<anonymous>";
                "<anonymous>" === methodName && (methodName = "", callSite.isEval() && (callSite$jscomp$0 = callSite.getEvalOrigin()) && (methodName = callSite$jscomp$0.toString() + ", <anonymous>"));
                callSite$jscomp$0 = callSite.getLineNumber() || 0;
                result = callSite.getColumnNumber() || 0;
                var enclosingLine = "function" === typeof callSite.getEnclosingLineNumber ? callSite.getEnclosingLineNumber() || 0 : 0, enclosingCol = "function" === typeof callSite.getEnclosingColumnNumber ? callSite.getEnclosingColumnNumber() || 0 : 0;
                callSite = callSite.isAsync();
                error.push([
                    name,
                    methodName,
                    callSite$jscomp$0,
                    result,
                    enclosingLine,
                    enclosingCol,
                    callSite
                ]);
            }
        }
        collectedStackTrace = error;
        return "";
    }
    function collectStackTrace(error, structuredStackTrace) {
        collectStackTracePrivate(error, structuredStackTrace);
        error = (error.name || "Error") + ": " + (error.message || "");
        for(var i = 0; i < structuredStackTrace.length; i++)error += "\n    at " + structuredStackTrace[i].toString();
        return error;
    }
    function parseStackTrace(error, skipFrames) {
        var existing = stackTraceCache.get(error);
        if (void 0 !== existing) return existing;
        collectedStackTrace = null;
        framesToSkip = skipFrames;
        existing = Error.prepareStackTrace;
        Error.prepareStackTrace = collectStackTrace;
        try {
            var stack = String(error.stack);
        } finally{
            Error.prepareStackTrace = existing;
        }
        if (null !== collectedStackTrace) return stack = collectedStackTrace, collectedStackTrace = null, stackTraceCache.set(error, stack), stack;
        stack.startsWith("Error: react-stack-top-frame\n") && (stack = stack.slice(29));
        existing = stack.indexOf("react_stack_bottom_frame");
        -1 !== existing && (existing = stack.lastIndexOf("\n", existing));
        -1 !== existing && (stack = stack.slice(0, existing));
        stack = stack.split("\n");
        for(existing = []; skipFrames < stack.length; skipFrames++){
            var parsed = frameRegExp.exec(stack[skipFrames]);
            if (parsed) {
                var name = parsed[1] || "", isAsync = "async " === parsed[8];
                "<anonymous>" === name ? name = "" : name.startsWith("async ") && (name = name.slice(5), isAsync = !0);
                var filename = parsed[2] || parsed[5] || "";
                "<anonymous>" === filename && (filename = "");
                existing.push([
                    name,
                    filename,
                    +(parsed[3] || parsed[6]),
                    +(parsed[4] || parsed[7]),
                    0,
                    0,
                    isAsync
                ]);
            }
        }
        stackTraceCache.set(error, existing);
        return existing;
    }
    function createTemporaryReference(temporaryReferences, id) {
        var reference = Object.defineProperties(function() {
            throw Error("Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
        }, {
            $$typeof: {
                value: TEMPORARY_REFERENCE_TAG
            }
        });
        reference = new Proxy(reference, proxyHandlers);
        temporaryReferences.set(reference, id);
        return reference;
    }
    function noop() {}
    function trackUsedThenable(thenableState, thenable, index) {
        index = thenableState[index];
        void 0 === index ? (thenableState.push(thenable), (thenableState._stacks || (thenableState._stacks = [])).push(Error())) : index !== thenable && (thenable.then(noop, noop), thenable = index);
        switch(thenable.status){
            case "fulfilled":
                return thenable.value;
            case "rejected":
                throw thenable.reason;
            default:
                "string" === typeof thenable.status ? thenable.then(noop, noop) : (thenableState = thenable, thenableState.status = "pending", thenableState.then(function(fulfilledValue) {
                    if ("pending" === thenable.status) {
                        var fulfilledThenable = thenable;
                        fulfilledThenable.status = "fulfilled";
                        fulfilledThenable.value = fulfilledValue;
                    }
                }, function(error) {
                    if ("pending" === thenable.status) {
                        var rejectedThenable = thenable;
                        rejectedThenable.status = "rejected";
                        rejectedThenable.reason = error;
                    }
                }));
                switch(thenable.status){
                    case "fulfilled":
                        return thenable.value;
                    case "rejected":
                        throw thenable.reason;
                }
                suspendedThenable = thenable;
                throw SuspenseException;
        }
    }
    function getSuspendedThenable() {
        if (null === suspendedThenable) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
        var thenable = suspendedThenable;
        suspendedThenable = null;
        return thenable;
    }
    function getThenableStateAfterSuspending() {
        var state = thenableState || [];
        state._componentDebugInfo = currentComponentDebugInfo;
        thenableState = currentComponentDebugInfo = null;
        return state;
    }
    function unsupportedHook() {
        throw Error("This Hook is not supported in Server Components.");
    }
    function unsupportedRefresh() {
        throw Error("Refreshing the cache is not supported in Server Components.");
    }
    function unsupportedContext() {
        throw Error("Cannot read a Client Context from a Server Component.");
    }
    function resolveOwner() {
        if (currentOwner) return currentOwner;
        if (supportsComponentStorage) {
            var owner = componentStorage.getStore();
            if (owner) return owner;
        }
        return null;
    }
    function prepareStackTrace(error, structuredStackTrace) {
        error = (error.name || "Error") + ": " + (error.message || "");
        for(var i = 0; i < structuredStackTrace.length; i++)error += "\n    at " + structuredStackTrace[i].toString();
        return error;
    }
    function resetOwnerStackLimit() {
        var now = getCurrentTime();
        1e3 < now - lastResetTime && (ReactSharedInternalsServer.recentlyCreatedOwnerStacks = 0, lastResetTime = now);
    }
    function isObjectPrototype(object) {
        if (!object) return !1;
        var ObjectPrototype = Object.prototype;
        if (object === ObjectPrototype) return !0;
        if (getPrototypeOf(object)) return !1;
        object = Object.getOwnPropertyNames(object);
        for(var i = 0; i < object.length; i++)if (!(object[i] in ObjectPrototype)) return !1;
        return !0;
    }
    function isGetter(object, name) {
        if (object === Object.prototype || null === object) return !1;
        var descriptor = Object.getOwnPropertyDescriptor(object, name);
        return void 0 === descriptor ? isGetter(getPrototypeOf(object), name) : "function" === typeof descriptor.get;
    }
    function isSimpleObject(object) {
        if (!isObjectPrototype(getPrototypeOf(object))) return !1;
        for(var names = Object.getOwnPropertyNames(object), i = 0; i < names.length; i++){
            var descriptor = Object.getOwnPropertyDescriptor(object, names[i]);
            if (!descriptor || !descriptor.enumerable && ("key" !== names[i] && "ref" !== names[i] || "function" !== typeof descriptor.get)) return !1;
        }
        return !0;
    }
    function objectName(object) {
        object = Object.prototype.toString.call(object);
        return object.slice(8, object.length - 1);
    }
    function describeKeyForErrorMessage(key) {
        var encodedKey = JSON.stringify(key);
        return '"' + key + '"' === encodedKey ? key : encodedKey;
    }
    function describeValueForErrorMessage(value) {
        switch(typeof value){
            case "string":
                return JSON.stringify(10 >= value.length ? value : value.slice(0, 10) + "...");
            case "object":
                if (isArrayImpl(value)) return "[...]";
                if (null !== value && value.$$typeof === CLIENT_REFERENCE_TAG) return "client";
                value = objectName(value);
                return "Object" === value ? "{...}" : value;
            case "function":
                return value.$$typeof === CLIENT_REFERENCE_TAG ? "client" : (value = value.displayName || value.name) ? "function " + value : "function";
            default:
                return String(value);
        }
    }
    function describeElementType(type) {
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
        }
        if ("object" === typeof type) switch(type.$$typeof){
            case REACT_FORWARD_REF_TYPE:
                return describeElementType(type.render);
            case REACT_MEMO_TYPE:
                return describeElementType(type.type);
            case REACT_LAZY_TYPE:
                var payload = type._payload;
                type = type._init;
                try {
                    return describeElementType(type(payload));
                } catch (x) {}
        }
        return "";
    }
    function describeObjectForErrorMessage(objectOrArray, expandedName) {
        var objKind = objectName(objectOrArray);
        if ("Object" !== objKind && "Array" !== objKind) return objKind;
        var start = -1, length = 0;
        if (isArrayImpl(objectOrArray)) if (jsxChildrenParents.has(objectOrArray)) {
            var type = jsxChildrenParents.get(objectOrArray);
            objKind = "<" + describeElementType(type) + ">";
            for(var i = 0; i < objectOrArray.length; i++){
                var value = objectOrArray[i];
                value = "string" === typeof value ? value : "object" === typeof value && null !== value ? "{" + describeObjectForErrorMessage(value) + "}" : "{" + describeValueForErrorMessage(value) + "}";
                "" + i === expandedName ? (start = objKind.length, length = value.length, objKind += value) : objKind = 15 > value.length && 40 > objKind.length + value.length ? objKind + value : objKind + "{...}";
            }
            objKind += "</" + describeElementType(type) + ">";
        } else {
            objKind = "[";
            for(type = 0; type < objectOrArray.length; type++)0 < type && (objKind += ", "), i = objectOrArray[type], i = "object" === typeof i && null !== i ? describeObjectForErrorMessage(i) : describeValueForErrorMessage(i), "" + type === expandedName ? (start = objKind.length, length = i.length, objKind += i) : objKind = 10 > i.length && 40 > objKind.length + i.length ? objKind + i : objKind + "...";
            objKind += "]";
        }
        else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE) objKind = "<" + describeElementType(objectOrArray.type) + "/>";
        else {
            if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
            if (jsxPropsParents.has(objectOrArray)) {
                objKind = jsxPropsParents.get(objectOrArray);
                objKind = "<" + (describeElementType(objKind) || "...");
                type = Object.keys(objectOrArray);
                for(i = 0; i < type.length; i++){
                    objKind += " ";
                    value = type[i];
                    objKind += describeKeyForErrorMessage(value) + "=";
                    var _value2 = objectOrArray[value];
                    var _substr2 = value === expandedName && "object" === typeof _value2 && null !== _value2 ? describeObjectForErrorMessage(_value2) : describeValueForErrorMessage(_value2);
                    "string" !== typeof _value2 && (_substr2 = "{" + _substr2 + "}");
                    value === expandedName ? (start = objKind.length, length = _substr2.length, objKind += _substr2) : objKind = 10 > _substr2.length && 40 > objKind.length + _substr2.length ? objKind + _substr2 : objKind + "...";
                }
                objKind += ">";
            } else {
                objKind = "{";
                type = Object.keys(objectOrArray);
                for(i = 0; i < type.length; i++)0 < i && (objKind += ", "), value = type[i], objKind += describeKeyForErrorMessage(value) + ": ", _value2 = objectOrArray[value], _value2 = "object" === typeof _value2 && null !== _value2 ? describeObjectForErrorMessage(_value2) : describeValueForErrorMessage(_value2), value === expandedName ? (start = objKind.length, length = _value2.length, objKind += _value2) : objKind = 10 > _value2.length && 40 > objKind.length + _value2.length ? objKind + _value2 : objKind + "...";
                objKind += "}";
            }
        }
        return void 0 === expandedName ? objKind : -1 < start && 0 < length ? (objectOrArray = " ".repeat(start) + "^".repeat(length), "\n  " + objKind + "\n  " + objectOrArray) : "\n  " + objKind;
    }
    function defaultFilterStackFrame(filename) {
        return "" !== filename && !filename.startsWith("node:") && !filename.includes("node_modules");
    }
    function filterStackTrace(request, stack) {
        request = request.filterStackFrame;
        for(var filteredStack = [], i = 0; i < stack.length; i++){
            var callsite = stack[i], functionName = callsite[0];
            var url = callsite[1];
            if (url.startsWith("about://React/")) {
                var envIdx = url.indexOf("/", 14), suffixIdx = url.lastIndexOf("?");
                -1 < envIdx && -1 < suffixIdx && (url = decodeURI(url.slice(envIdx + 1, suffixIdx)));
            }
            request(url, functionName, callsite[2], callsite[3]) && (callsite = callsite.slice(0), callsite[1] = url, filteredStack.push(callsite));
        }
        return filteredStack;
    }
    function patchConsole(consoleInst, methodName) {
        var descriptor = Object.getOwnPropertyDescriptor(consoleInst, methodName);
        if (descriptor && (descriptor.configurable || descriptor.writable) && "function" === typeof descriptor.value) {
            var originalMethod = descriptor.value;
            descriptor = Object.getOwnPropertyDescriptor(originalMethod, "name");
            var wrapperMethod = function() {
                var request = resolveRequest();
                if (("assert" !== methodName || !arguments[0]) && null !== request) {
                    a: {
                        var error = Error("react-stack-top-frame");
                        collectedStackTrace = null;
                        framesToSkip = 1;
                        var previousPrepare = Error.prepareStackTrace;
                        Error.prepareStackTrace = collectStackTracePrivate;
                        try {
                            if ("" !== error.stack) {
                                var JSCompiler_inline_result = null;
                                break a;
                            }
                        } finally{
                            Error.prepareStackTrace = previousPrepare;
                        }
                        JSCompiler_inline_result = collectedStackTrace;
                    }
                    JSCompiler_inline_result = filterStackTrace(request, JSCompiler_inline_result || []);
                    request.pendingDebugChunks++;
                    error = resolveOwner();
                    previousPrepare = Array.from(arguments);
                    a: {
                        var env = 0;
                        switch(methodName){
                            case "dir":
                            case "dirxml":
                            case "groupEnd":
                            case "table":
                                env = null;
                                break a;
                            case "assert":
                                env = 1;
                        }
                        var format = previousPrepare[env], style = previousPrepare[env + 1], badge = previousPrepare[env + 2];
                        "string" === typeof format && format.startsWith("\u001b[0m\u001b[7m%c%s\u001b[0m%c") && "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px" === style && "string" === typeof badge ? (format = format.slice(18), " " === format[0] && (format = format.slice(1)), previousPrepare.splice(env, 4, format), env = badge.slice(1, badge.length - 1)) : env = null;
                    }
                    null === env && (env = (0, request.environmentName)());
                    null != error && outlineComponentInfo(request, error);
                    badge = [
                        methodName,
                        JSCompiler_inline_result,
                        error,
                        env
                    ];
                    badge.push.apply(badge, previousPrepare);
                    previousPrepare = serializeDebugModel(request, (null === request.deferredDebugObjects ? 500 : 10) + JSCompiler_inline_result.length, badge);
                    "[" !== previousPrepare[0] && (previousPrepare = serializeDebugModel(request, 10 + JSCompiler_inline_result.length, [
                        methodName,
                        JSCompiler_inline_result,
                        error,
                        env,
                        "Unknown Value: React could not send it from the server."
                    ]));
                    JSCompiler_inline_result = stringToChunk(":W" + previousPrepare + "\n");
                    request.completedDebugChunks.push(JSCompiler_inline_result);
                }
                return originalMethod.apply(this, arguments);
            };
            descriptor && Object.defineProperty(wrapperMethod, "name", descriptor);
            Object.defineProperty(consoleInst, methodName, {
                value: wrapperMethod
            });
        }
    }
    function getCurrentStackInDEV() {
        var owner = resolveOwner();
        if (null === owner) return "";
        try {
            var info = "";
            if (owner.owner || "string" !== typeof owner.name) {
                for(; owner;){
                    var ownerStack = owner.debugStack;
                    if (null != ownerStack) {
                        if (owner = owner.owner) {
                            var JSCompiler_temp_const = info;
                            var error = ownerStack, prevPrepareStackTrace = Error.prepareStackTrace;
                            Error.prepareStackTrace = prepareStackTrace;
                            var stack = error.stack;
                            Error.prepareStackTrace = prevPrepareStackTrace;
                            stack.startsWith("Error: react-stack-top-frame\n") && (stack = stack.slice(29));
                            var idx = stack.indexOf("\n");
                            -1 !== idx && (stack = stack.slice(idx + 1));
                            idx = stack.indexOf("react_stack_bottom_frame");
                            -1 !== idx && (idx = stack.lastIndexOf("\n", idx));
                            var JSCompiler_inline_result = -1 !== idx ? stack = stack.slice(0, idx) : "";
                            info = JSCompiler_temp_const + ("\n" + JSCompiler_inline_result);
                        }
                    } else break;
                }
                var JSCompiler_inline_result$jscomp$0 = info;
            } else {
                JSCompiler_temp_const = owner.name;
                if (void 0 === prefix) try {
                    throw Error();
                } catch (x) {
                    prefix = (error = x.stack.trim().match(/\n( *(at )?)/)) && error[1] || "", suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
                }
                JSCompiler_inline_result$jscomp$0 = "\n" + prefix + JSCompiler_temp_const + suffix;
            }
        } catch (x) {
            JSCompiler_inline_result$jscomp$0 = "\nError generating stack: " + x.message + "\n" + x.stack;
        }
        return JSCompiler_inline_result$jscomp$0;
    }
    function defaultErrorHandler(error) {
        console.error(error);
    }
    function RequestInstance(type, model, bundlerConfig, onError, onPostpone, onAllReady, onFatalError, identifierPrefix, temporaryReferences, environmentName, filterStackFrame, keepDebugAlive) {
        if (null !== ReactSharedInternalsServer.A && ReactSharedInternalsServer.A !== DefaultAsyncDispatcher) throw Error("Currently React only supports one RSC renderer at a time.");
        ReactSharedInternalsServer.A = DefaultAsyncDispatcher;
        ReactSharedInternalsServer.getCurrentStack = getCurrentStackInDEV;
        var abortSet = new Set(), pingedTasks = [], hints = new Set();
        this.type = type;
        this.status = 10;
        this.flushScheduled = !1;
        this.destination = this.fatalError = null;
        this.bundlerConfig = bundlerConfig;
        this.cache = new Map();
        this.cacheController = new AbortController();
        this.pendingChunks = this.nextChunkId = 0;
        this.hints = hints;
        this.abortableTasks = abortSet;
        this.pingedTasks = pingedTasks;
        this.completedImportChunks = [];
        this.completedHintChunks = [];
        this.completedRegularChunks = [];
        this.completedErrorChunks = [];
        this.writtenSymbols = new Map();
        this.writtenClientReferences = new Map();
        this.writtenServerReferences = new Map();
        this.writtenObjects = new WeakMap();
        this.temporaryReferences = temporaryReferences;
        this.identifierPrefix = identifierPrefix || "";
        this.identifierCount = 1;
        this.taintCleanupQueue = [];
        this.onError = void 0 === onError ? defaultErrorHandler : onError;
        this.onPostpone = void 0 === onPostpone ? defaultPostponeHandler : onPostpone;
        this.onAllReady = onAllReady;
        this.onFatalError = onFatalError;
        this.pendingDebugChunks = 0;
        this.completedDebugChunks = [];
        this.debugDestination = null;
        this.environmentName = void 0 === environmentName ? function() {
            return "Server";
        } : "function" !== typeof environmentName ? function() {
            return environmentName;
        } : environmentName;
        this.filterStackFrame = void 0 === filterStackFrame ? defaultFilterStackFrame : filterStackFrame;
        this.didWarnForKey = null;
        this.writtenDebugObjects = new WeakMap();
        this.deferredDebugObjects = keepDebugAlive ? {
            retained: new Map(),
            existing: new Map()
        } : null;
        type = this.timeOrigin = performance.now();
        emitTimeOriginChunk(this, type + performance.timeOrigin);
        this.abortTime = -0;
        model = createTask(this, model, null, !1, abortSet, type, null, null, null);
        pingedTasks.push(model);
    }
    function createRequest(model, bundlerConfig, onError, identifierPrefix, onPostpone, temporaryReferences, environmentName, filterStackFrame, keepDebugAlive) {
        resetOwnerStackLimit();
        return new RequestInstance(20, model, bundlerConfig, onError, onPostpone, noop, noop, identifierPrefix, temporaryReferences, environmentName, filterStackFrame, keepDebugAlive);
    }
    function createPrerenderRequest(model, bundlerConfig, onAllReady, onFatalError, onError, identifierPrefix, onPostpone, temporaryReferences, environmentName, filterStackFrame, keepDebugAlive) {
        resetOwnerStackLimit();
        return new RequestInstance(21, model, bundlerConfig, onError, onPostpone, onAllReady, onFatalError, identifierPrefix, temporaryReferences, environmentName, filterStackFrame, keepDebugAlive);
    }
    function resolveRequest() {
        if (currentRequest) return currentRequest;
        if (supportsRequestStorage) {
            var store = requestStorage.getStore();
            if (store) return store;
        }
        return null;
    }
    function serializeDebugThenable(request, counter, thenable) {
        request.pendingDebugChunks++;
        var id = request.nextChunkId++, ref = "$@" + id.toString(16);
        request.writtenDebugObjects.set(thenable, ref);
        switch(thenable.status){
            case "fulfilled":
                return emitOutlinedDebugModelChunk(request, id, counter, thenable.value), ref;
            case "rejected":
                return emitErrorChunk(request, id, "", thenable.reason, !0), ref;
        }
        if (request.status === ABORTING) return emitDebugHaltChunk(request, id), ref;
        var deferredDebugObjects = request.deferredDebugObjects;
        if (null !== deferredDebugObjects) return deferredDebugObjects.retained.set(id, thenable), ref = "$Y@" + id.toString(16), request.writtenDebugObjects.set(thenable, ref), ref;
        var cancelled = !1;
        thenable.then(function(value) {
            cancelled || (cancelled = !0, request.status === ABORTING ? emitDebugHaltChunk(request, id) : emitOutlinedDebugModelChunk(request, id, counter, value), enqueueFlush(request));
        }, function(reason) {
            cancelled || (cancelled = !0, request.status === ABORTING ? emitDebugHaltChunk(request, id) : emitErrorChunk(request, id, "", reason, !0), enqueueFlush(request));
        });
        Promise.resolve().then(function() {
            cancelled || (cancelled = !0, emitDebugHaltChunk(request, id), enqueueFlush(request), counter = request = null);
        });
        return ref;
    }
    function emitRequestedDebugThenable(request, id, counter, thenable) {
        thenable.then(function(value) {
            request.status === ABORTING ? emitDebugHaltChunk(request, id) : emitOutlinedDebugModelChunk(request, id, counter, value);
            enqueueFlush(request);
        }, function(reason) {
            request.status === ABORTING ? emitDebugHaltChunk(request, id) : emitErrorChunk(request, id, "", reason, !0);
            enqueueFlush(request);
        });
    }
    function serializeThenable(request, task, thenable) {
        var newTask = createTask(request, thenable, task.keyPath, task.implicitSlot, request.abortableTasks, task.time, task.debugOwner, task.debugStack, task.debugTask);
        switch(thenable.status){
            case "fulfilled":
                return forwardDebugInfoFromThenable(request, newTask, thenable, null, null), newTask.model = thenable.value, pingTask(request, newTask), newTask.id;
            case "rejected":
                return forwardDebugInfoFromThenable(request, newTask, thenable, null, null), erroredTask(request, newTask, thenable.reason), newTask.id;
            default:
                if (request.status === ABORTING) return request.abortableTasks.delete(newTask), task = request.fatalError, abortTask(newTask), finishAbortedTask(newTask, request, task), newTask.id;
                "string" !== typeof thenable.status && (thenable.status = "pending", thenable.then(function(fulfilledValue) {
                    "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                }, function(error) {
                    "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }));
        }
        thenable.then(function(value) {
            forwardDebugInfoFromCurrentContext(request, newTask, thenable);
            newTask.model = value;
            pingTask(request, newTask);
        }, function(reason) {
            0 === newTask.status && (newTask.timed = !0, erroredTask(request, newTask, reason), enqueueFlush(request));
        });
        return newTask.id;
    }
    function serializeReadableStream(request, task, stream) {
        function progress(entry) {
            if (0 === streamTask.status) if (entry.done) streamTask.status = 1, entry = streamTask.id.toString(16) + ":C\n", request.completedRegularChunks.push(stringToChunk(entry)), request.abortableTasks.delete(streamTask), request.cacheController.signal.removeEventListener("abort", abortStream), enqueueFlush(request), callOnAllReadyIfReady(request);
            else try {
                streamTask.model = entry.value, request.pendingChunks++, tryStreamTask(request, streamTask), enqueueFlush(request), reader.read().then(progress, error);
            } catch (x$0) {
                error(x$0);
            }
        }
        function error(reason) {
            0 === streamTask.status && (request.cacheController.signal.removeEventListener("abort", abortStream), erroredTask(request, streamTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
        }
        function abortStream() {
            if (0 === streamTask.status) {
                var signal = request.cacheController.signal;
                signal.removeEventListener("abort", abortStream);
                signal = signal.reason;
                erroredTask(request, streamTask, signal);
                enqueueFlush(request);
                reader.cancel(signal).then(error, error);
            }
        }
        var supportsBYOB = stream.supportsBYOB;
        if (void 0 === supportsBYOB) try {
            stream.getReader({
                mode: "byob"
            }).releaseLock(), supportsBYOB = !0;
        } catch (x) {
            supportsBYOB = !1;
        }
        var reader = stream.getReader(), streamTask = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks, task.time, task.debugOwner, task.debugStack, task.debugTask);
        request.pendingChunks++;
        task = streamTask.id.toString(16) + ":" + (supportsBYOB ? "r" : "R") + "\n";
        request.completedRegularChunks.push(stringToChunk(task));
        request.cacheController.signal.addEventListener("abort", abortStream);
        reader.read().then(progress, error);
        return serializeByValueID(streamTask.id);
    }
    function serializeAsyncIterable(request, task, iterable, iterator) {
        function progress(entry) {
            if (0 === streamTask.status) if (entry.done) {
                streamTask.status = 1;
                if (void 0 === entry.value) var endStreamRow = streamTask.id.toString(16) + ":C\n";
                else try {
                    var chunkId = outlineModel(request, entry.value);
                    endStreamRow = streamTask.id.toString(16) + ":C" + stringify(serializeByValueID(chunkId)) + "\n";
                } catch (x) {
                    error(x);
                    return;
                }
                request.completedRegularChunks.push(stringToChunk(endStreamRow));
                request.abortableTasks.delete(streamTask);
                request.cacheController.signal.removeEventListener("abort", abortIterable);
                enqueueFlush(request);
                callOnAllReadyIfReady(request);
            } else try {
                streamTask.model = entry.value, request.pendingChunks++, tryStreamTask(request, streamTask), enqueueFlush(request), callIteratorInDEV(iterator, progress, error);
            } catch (x$1) {
                error(x$1);
            }
        }
        function error(reason) {
            0 === streamTask.status && (request.cacheController.signal.removeEventListener("abort", abortIterable), erroredTask(request, streamTask, reason), enqueueFlush(request), "function" === typeof iterator.throw && iterator.throw(reason).then(error, error));
        }
        function abortIterable() {
            if (0 === streamTask.status) {
                var signal = request.cacheController.signal;
                signal.removeEventListener("abort", abortIterable);
                var reason = signal.reason;
                erroredTask(request, streamTask, signal.reason);
                enqueueFlush(request);
                "function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
            }
        }
        var isIterator = iterable === iterator, streamTask = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks, task.time, task.debugOwner, task.debugStack, task.debugTask);
        (task = iterable._debugInfo) && forwardDebugInfo(request, streamTask, task);
        request.pendingChunks++;
        isIterator = streamTask.id.toString(16) + ":" + (isIterator ? "x" : "X") + "\n";
        request.completedRegularChunks.push(stringToChunk(isIterator));
        request.cacheController.signal.addEventListener("abort", abortIterable);
        callIteratorInDEV(iterator, progress, error);
        return serializeByValueID(streamTask.id);
    }
    function emitHint(request, code, model) {
        model = stringify(model);
        code = stringToChunk(":H" + code + model + "\n");
        request.completedHintChunks.push(code);
        enqueueFlush(request);
    }
    function readThenable(thenable) {
        if ("fulfilled" === thenable.status) return thenable.value;
        if ("rejected" === thenable.status) throw thenable.reason;
        throw thenable;
    }
    function createLazyWrapperAroundWakeable(request, task, wakeable) {
        switch(wakeable.status){
            case "fulfilled":
                return forwardDebugInfoFromThenable(request, task, wakeable, null, null), wakeable.value;
            case "rejected":
                forwardDebugInfoFromThenable(request, task, wakeable, null, null);
                break;
            default:
                "string" !== typeof wakeable.status && (wakeable.status = "pending", wakeable.then(function(fulfilledValue) {
                    forwardDebugInfoFromCurrentContext(request, task, wakeable);
                    "pending" === wakeable.status && (wakeable.status = "fulfilled", wakeable.value = fulfilledValue);
                }, function(error) {
                    forwardDebugInfoFromCurrentContext(request, task, wakeable);
                    "pending" === wakeable.status && (wakeable.status = "rejected", wakeable.reason = error);
                }));
        }
        return {
            $$typeof: REACT_LAZY_TYPE,
            _payload: wakeable,
            _init: readThenable
        };
    }
    function callWithDebugContextInDEV(request, task, callback, arg) {
        var componentDebugInfo = {
            name: "",
            env: task.environmentName,
            key: null,
            owner: task.debugOwner
        };
        componentDebugInfo.stack = null === task.debugStack ? null : filterStackTrace(request, parseStackTrace(task.debugStack, 1));
        componentDebugInfo.debugStack = task.debugStack;
        request = componentDebugInfo.debugTask = task.debugTask;
        currentOwner = componentDebugInfo;
        try {
            return request ? request.run(callback.bind(null, arg)) : callback(arg);
        } finally{
            currentOwner = null;
        }
    }
    function processServerComponentReturnValue(request, task, Component, result) {
        if ("object" !== typeof result || null === result || isClientReference(result)) return result;
        if ("function" === typeof result.then) return result.then(function(resolvedValue) {
            "object" === typeof resolvedValue && null !== resolvedValue && resolvedValue.$$typeof === REACT_ELEMENT_TYPE && (resolvedValue._store.validated = 1);
        }, voidHandler), createLazyWrapperAroundWakeable(request, task, result);
        result.$$typeof === REACT_ELEMENT_TYPE && (result._store.validated = 1);
        var iteratorFn = getIteratorFn(result);
        if (iteratorFn) {
            var multiShot = _defineProperty({}, Symbol.iterator, function() {
                var iterator = iteratorFn.call(result);
                iterator !== result || "[object GeneratorFunction]" === Object.prototype.toString.call(Component) && "[object Generator]" === Object.prototype.toString.call(result) || callWithDebugContextInDEV(request, task, function() {
                    console.error("Returning an Iterator from a Server Component is not supported since it cannot be looped over more than once. ");
                });
                return iterator;
            });
            multiShot._debugInfo = result._debugInfo;
            return multiShot;
        }
        return "function" !== typeof result[ASYNC_ITERATOR] || "function" === typeof ReadableStream && result instanceof ReadableStream ? result : (multiShot = _defineProperty({}, ASYNC_ITERATOR, function() {
            var iterator = result[ASYNC_ITERATOR]();
            iterator !== result || "[object AsyncGeneratorFunction]" === Object.prototype.toString.call(Component) && "[object AsyncGenerator]" === Object.prototype.toString.call(result) || callWithDebugContextInDEV(request, task, function() {
                console.error("Returning an AsyncIterator from a Server Component is not supported since it cannot be looped over more than once. ");
            });
            return iterator;
        }), multiShot._debugInfo = result._debugInfo, multiShot);
    }
    function renderFunctionComponent(request, task, key, Component, props, validated) {
        var prevThenableState = task.thenableState;
        task.thenableState = null;
        if (canEmitDebugInfo) if (null !== prevThenableState) var componentDebugInfo = prevThenableState._componentDebugInfo;
        else {
            var componentDebugID = task.id;
            componentDebugInfo = Component.displayName || Component.name || "";
            var componentEnv = (0, request.environmentName)();
            request.pendingChunks++;
            componentDebugInfo = {
                name: componentDebugInfo,
                env: componentEnv,
                key: key,
                owner: task.debugOwner
            };
            componentDebugInfo.stack = null === task.debugStack ? null : filterStackTrace(request, parseStackTrace(task.debugStack, 1));
            componentDebugInfo.props = props;
            componentDebugInfo.debugStack = task.debugStack;
            componentDebugInfo.debugTask = task.debugTask;
            outlineComponentInfo(request, componentDebugInfo);
            var timestamp = performance.now();
            timestamp > task.time && (task.time = timestamp);
            task.timed = !0;
            emitDebugChunk(request, componentDebugID, componentDebugInfo);
            task.environmentName = componentEnv;
            2 === validated && warnForMissingKey(request, key, componentDebugInfo, task.debugTask);
        }
        else return outlineTask(request, task);
        thenableIndexCounter = 0;
        thenableState = prevThenableState;
        currentComponentDebugInfo = componentDebugInfo;
        props = supportsComponentStorage ? task.debugTask ? task.debugTask.run(componentStorage.run.bind(componentStorage, componentDebugInfo, callComponentInDEV, Component, props, componentDebugInfo)) : componentStorage.run(componentDebugInfo, callComponentInDEV, Component, props, componentDebugInfo) : task.debugTask ? task.debugTask.run(callComponentInDEV.bind(null, Component, props, componentDebugInfo)) : callComponentInDEV(Component, props, componentDebugInfo);
        if (request.status === ABORTING) throw "object" !== typeof props || null === props || "function" !== typeof props.then || isClientReference(props) || props.then(voidHandler, voidHandler), null;
        validated = thenableState;
        if (null !== validated) for(prevThenableState = validated._stacks || (validated._stacks = []), componentDebugID = 0; componentDebugID < validated.length; componentDebugID++)forwardDebugInfoFromThenable(request, task, validated[componentDebugID], componentDebugInfo, prevThenableState[componentDebugID]);
        props = processServerComponentReturnValue(request, task, Component, props);
        task.debugOwner = componentDebugInfo;
        task.debugStack = null;
        task.debugTask = null;
        Component = task.keyPath;
        componentDebugInfo = task.implicitSlot;
        null !== key ? task.keyPath = null === Component ? key : Component + "," + key : null === Component && (task.implicitSlot = !0);
        request = renderModelDestructive(request, task, emptyRoot, "", props);
        task.keyPath = Component;
        task.implicitSlot = componentDebugInfo;
        return request;
    }
    function warnForMissingKey(request, key, componentDebugInfo, debugTask) {
        function logKeyError() {
            console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.', "", "");
        }
        key = request.didWarnForKey;
        null == key && (key = request.didWarnForKey = new WeakSet());
        request = componentDebugInfo.owner;
        if (null != request) {
            if (key.has(request)) return;
            key.add(request);
        }
        supportsComponentStorage ? debugTask ? debugTask.run(componentStorage.run.bind(componentStorage, componentDebugInfo, callComponentInDEV, logKeyError, null, componentDebugInfo)) : componentStorage.run(componentDebugInfo, callComponentInDEV, logKeyError, null, componentDebugInfo) : debugTask ? debugTask.run(callComponentInDEV.bind(null, logKeyError, null, componentDebugInfo)) : callComponentInDEV(logKeyError, null, componentDebugInfo);
    }
    function renderFragment(request, task, children) {
        for(var i = 0; i < children.length; i++){
            var child = children[i];
            null === child || "object" !== typeof child || child.$$typeof !== REACT_ELEMENT_TYPE || null !== child.key || child._store.validated || (child._store.validated = 2);
        }
        if (null !== task.keyPath) return request = [
            REACT_ELEMENT_TYPE,
            REACT_FRAGMENT_TYPE,
            task.keyPath,
            {
                children: children
            },
            null,
            null,
            0
        ], task.implicitSlot ? [
            request
        ] : request;
        if (i = children._debugInfo) {
            if (canEmitDebugInfo) forwardDebugInfo(request, task, i);
            else return outlineTask(request, task);
            children = Array.from(children);
        }
        return children;
    }
    function renderAsyncFragment(request, task, children, getAsyncIterator) {
        if (null !== task.keyPath) return request = [
            REACT_ELEMENT_TYPE,
            REACT_FRAGMENT_TYPE,
            task.keyPath,
            {
                children: children
            },
            null,
            null,
            0
        ], task.implicitSlot ? [
            request
        ] : request;
        getAsyncIterator = getAsyncIterator.call(children);
        return serializeAsyncIterable(request, task, children, getAsyncIterator);
    }
    function deferTask(request, task) {
        task = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks, task.time, task.debugOwner, task.debugStack, task.debugTask);
        pingTask(request, task);
        return serializeLazyID(task.id);
    }
    function outlineTask(request, task) {
        task = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks, task.time, task.debugOwner, task.debugStack, task.debugTask);
        retryTask(request, task);
        return 1 === task.status ? serializeByValueID(task.id) : serializeLazyID(task.id);
    }
    function renderElement(request, task, type, key, ref, props, validated) {
        if (null !== ref && void 0 !== ref) throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
        jsxPropsParents.set(props, type);
        "object" === typeof props.children && null !== props.children && jsxChildrenParents.set(props.children, type);
        if ("function" !== typeof type || isClientReference(type) || type.$$typeof === TEMPORARY_REFERENCE_TAG) {
            if (type === REACT_FRAGMENT_TYPE && null === key) return 2 === validated && (validated = {
                name: "Fragment",
                env: (0, request.environmentName)(),
                key: key,
                owner: task.debugOwner,
                stack: null === task.debugStack ? null : filterStackTrace(request, parseStackTrace(task.debugStack, 1)),
                props: props,
                debugStack: task.debugStack,
                debugTask: task.debugTask
            }, warnForMissingKey(request, key, validated, task.debugTask)), validated = task.implicitSlot, null === task.keyPath && (task.implicitSlot = !0), request = renderModelDestructive(request, task, emptyRoot, "", props.children), task.implicitSlot = validated, request;
            if (null != type && "object" === typeof type && !isClientReference(type)) switch(type.$$typeof){
                case REACT_LAZY_TYPE:
                    type = callLazyInitInDEV(type);
                    if (request.status === ABORTING) throw null;
                    return renderElement(request, task, type, key, ref, props, validated);
                case REACT_FORWARD_REF_TYPE:
                    return renderFunctionComponent(request, task, key, type.render, props, validated);
                case REACT_MEMO_TYPE:
                    return renderElement(request, task, type.type, key, ref, props, validated);
                case REACT_ELEMENT_TYPE:
                    type._store.validated = 1;
            }
        } else return renderFunctionComponent(request, task, key, type, props, validated);
        ref = task.keyPath;
        null === key ? key = ref : null !== ref && (key = ref + "," + key);
        var debugStack = null;
        ref = task.debugOwner;
        null !== ref && outlineComponentInfo(request, ref);
        if (null !== task.debugStack) {
            debugStack = filterStackTrace(request, parseStackTrace(task.debugStack, 1));
            var id = outlineDebugModel(request, {
                objectLimit: 2 * debugStack.length + 1
            }, debugStack);
            request.writtenObjects.set(debugStack, serializeByValueID(id));
        }
        request = [
            REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            ref,
            debugStack,
            validated
        ];
        task = task.implicitSlot && null !== key ? [
            request
        ] : request;
        return task;
    }
    function pingTask(request, task) {
        task.timed = !0;
        var pingedTasks = request.pingedTasks;
        pingedTasks.push(task);
        1 === pingedTasks.length && (request.flushScheduled = null !== request.destination, 21 === request.type || 10 === request.status ? scheduleMicrotask(function() {
            return performWork(request);
        }) : setTimeout(function() {
            return performWork(request);
        }, 0));
    }
    function createTask(request, model, keyPath, implicitSlot, abortSet, lastTimestamp, debugOwner, debugStack, debugTask) {
        request.pendingChunks++;
        var id = request.nextChunkId++;
        "object" !== typeof model || null === model || null !== keyPath || implicitSlot || request.writtenObjects.set(model, serializeByValueID(id));
        var task = {
            id: id,
            status: 0,
            model: model,
            keyPath: keyPath,
            implicitSlot: implicitSlot,
            ping: function() {
                return pingTask(request, task);
            },
            toJSON: function(parentPropertyName, value) {
                var parent = this, originalValue = parent[parentPropertyName];
                "object" !== typeof originalValue || originalValue === value || originalValue instanceof Date || callWithDebugContextInDEV(request, task, function() {
                    "Object" !== objectName(originalValue) ? "string" === typeof jsxChildrenParents.get(parent) ? console.error("%s objects cannot be rendered as text children. Try formatting it using toString().%s", objectName(originalValue), describeObjectForErrorMessage(parent, parentPropertyName)) : console.error("Only plain objects can be passed to Client Components from Server Components. %s objects are not supported.%s", objectName(originalValue), describeObjectForErrorMessage(parent, parentPropertyName)) : console.error("Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.%s", describeObjectForErrorMessage(parent, parentPropertyName));
                });
                return renderModel(request, task, parent, parentPropertyName, value);
            },
            thenableState: null,
            timed: !1
        };
        task.time = lastTimestamp;
        task.environmentName = request.environmentName();
        task.debugOwner = debugOwner;
        task.debugStack = debugStack;
        task.debugTask = debugTask;
        abortSet.add(task);
        return task;
    }
    function serializeByValueID(id) {
        return "$" + id.toString(16);
    }
    function serializeLazyID(id) {
        return "$L" + id.toString(16);
    }
    function serializeDeferredObject(request, value) {
        var deferredDebugObjects = request.deferredDebugObjects;
        return null !== deferredDebugObjects ? (request.pendingDebugChunks++, request = request.nextChunkId++, deferredDebugObjects.existing.set(value, request), deferredDebugObjects.retained.set(request, value), "$Y" + request.toString(16)) : "$Y";
    }
    function serializeNumber(number) {
        return Number.isFinite(number) ? 0 === number && -Infinity === 1 / number ? "$-0" : number : Infinity === number ? "$Infinity" : -Infinity === number ? "$-Infinity" : "$NaN";
    }
    function encodeReferenceChunk(request, id, reference) {
        request = stringify(reference);
        id = id.toString(16) + ":" + request + "\n";
        return stringToChunk(id);
    }
    function serializeClientReference(request, parent, parentPropertyName, clientReference) {
        var clientReferenceKey = clientReference.$$async ? clientReference.$$id + "#async" : clientReference.$$id, writtenClientReferences = request.writtenClientReferences, existingId = writtenClientReferences.get(clientReferenceKey);
        if (void 0 !== existingId) return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(existingId) : serializeByValueID(existingId);
        try {
            var clientReferenceMetadata = resolveClientReferenceMetadata(request.bundlerConfig, clientReference);
            request.pendingChunks++;
            var importId = request.nextChunkId++;
            emitImportChunk(request, importId, clientReferenceMetadata, !1);
            writtenClientReferences.set(clientReferenceKey, importId);
            return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(importId) : serializeByValueID(importId);
        } catch (x) {
            return request.pendingChunks++, parent = request.nextChunkId++, parentPropertyName = logRecoverableError(request, x, null), emitErrorChunk(request, parent, parentPropertyName, x, !1), serializeByValueID(parent);
        }
    }
    function serializeDebugClientReference(request, parent, parentPropertyName, clientReference) {
        var existingId = request.writtenClientReferences.get(clientReference.$$async ? clientReference.$$id + "#async" : clientReference.$$id);
        if (void 0 !== existingId) return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(existingId) : serializeByValueID(existingId);
        try {
            var clientReferenceMetadata = resolveClientReferenceMetadata(request.bundlerConfig, clientReference);
            request.pendingDebugChunks++;
            var importId = request.nextChunkId++;
            emitImportChunk(request, importId, clientReferenceMetadata, !0);
            return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(importId) : serializeByValueID(importId);
        } catch (x) {
            return request.pendingDebugChunks++, parent = request.nextChunkId++, parentPropertyName = logRecoverableError(request, x, null), emitErrorChunk(request, parent, parentPropertyName, x, !0), serializeByValueID(parent);
        }
    }
    function outlineModel(request, value) {
        value = createTask(request, value, null, !1, request.abortableTasks, performance.now(), null, null, null);
        retryTask(request, value);
        return value.id;
    }
    function serializeServerReference(request, serverReference) {
        var writtenServerReferences = request.writtenServerReferences, existingId = writtenServerReferences.get(serverReference);
        if (void 0 !== existingId) return "$F" + existingId.toString(16);
        existingId = serverReference.$$bound;
        existingId = null === existingId ? null : Promise.resolve(existingId);
        var id = serverReference.$$id, location = null, error = serverReference.$$location;
        error && (error = parseStackTrace(error, 1), 0 < error.length && (location = error[0], location = [
            location[0],
            location[1],
            location[2],
            location[3]
        ]));
        existingId = null !== location ? {
            id: id,
            bound: existingId,
            name: "function" === typeof serverReference ? serverReference.name : "",
            env: (0, request.environmentName)(),
            location: location
        } : {
            id: id,
            bound: existingId
        };
        request = outlineModel(request, existingId);
        writtenServerReferences.set(serverReference, request);
        return "$F" + request.toString(16);
    }
    function serializeLargeTextString(request, text) {
        request.pendingChunks++;
        var textId = request.nextChunkId++;
        emitTextChunk(request, textId, text, !1);
        return serializeByValueID(textId);
    }
    function serializeMap(request, map) {
        map = Array.from(map);
        return "$Q" + outlineModel(request, map).toString(16);
    }
    function serializeFormData(request, formData) {
        formData = Array.from(formData.entries());
        return "$K" + outlineModel(request, formData).toString(16);
    }
    function serializeSet(request, set) {
        set = Array.from(set);
        return "$W" + outlineModel(request, set).toString(16);
    }
    function serializeTypedArray(request, tag, typedArray) {
        request.pendingChunks++;
        var bufferId = request.nextChunkId++;
        emitTypedArrayChunk(request, bufferId, tag, typedArray, !1);
        return serializeByValueID(bufferId);
    }
    function serializeDebugTypedArray(request, tag, typedArray) {
        request.pendingDebugChunks++;
        var bufferId = request.nextChunkId++;
        emitTypedArrayChunk(request, bufferId, tag, typedArray, !0);
        return serializeByValueID(bufferId);
    }
    function serializeDebugBlob(request, blob) {
        function progress(entry) {
            if (entry.done) emitOutlinedDebugModelChunk(request, id, {
                objectLimit: model.length + 2
            }, model), enqueueFlush(request);
            else return model.push(entry.value), reader.read().then(progress).catch(error);
        }
        function error(reason) {
            emitErrorChunk(request, id, "", reason, !0);
            enqueueFlush(request);
            reader.cancel(reason).then(noop, noop);
        }
        var model = [
            blob.type
        ], reader = blob.stream().getReader();
        request.pendingDebugChunks++;
        var id = request.nextChunkId++;
        reader.read().then(progress).catch(error);
        return "$B" + id.toString(16);
    }
    function serializeBlob(request, blob) {
        function progress(entry) {
            if (0 === newTask.status) if (entry.done) request.cacheController.signal.removeEventListener("abort", abortBlob), pingTask(request, newTask);
            else return model.push(entry.value), reader.read().then(progress).catch(error);
        }
        function error(reason) {
            0 === newTask.status && (request.cacheController.signal.removeEventListener("abort", abortBlob), erroredTask(request, newTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
        }
        function abortBlob() {
            if (0 === newTask.status) {
                var signal = request.cacheController.signal;
                signal.removeEventListener("abort", abortBlob);
                signal = signal.reason;
                erroredTask(request, newTask, signal);
                enqueueFlush(request);
                reader.cancel(signal).then(error, error);
            }
        }
        var model = [
            blob.type
        ], newTask = createTask(request, model, null, !1, request.abortableTasks, performance.now(), null, null, null), reader = blob.stream().getReader();
        request.cacheController.signal.addEventListener("abort", abortBlob);
        reader.read().then(progress).catch(error);
        return "$B" + newTask.id.toString(16);
    }
    function renderModel(request, task, parent, key, value) {
        serializedSize += key.length;
        var prevKeyPath = task.keyPath, prevImplicitSlot = task.implicitSlot;
        try {
            return renderModelDestructive(request, task, parent, key, value);
        } catch (thrownValue) {
            parent = task.model;
            parent = "object" === typeof parent && null !== parent && (parent.$$typeof === REACT_ELEMENT_TYPE || parent.$$typeof === REACT_LAZY_TYPE);
            if (request.status === ABORTING) return task.status = 3, task = request.fatalError, parent ? serializeLazyID(task) : serializeByValueID(task);
            key = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
            if ("object" === typeof key && null !== key && "function" === typeof key.then) return request = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks, task.time, task.debugOwner, task.debugStack, task.debugTask), value = request.ping, key.then(value, value), request.thenableState = getThenableStateAfterSuspending(), task.keyPath = prevKeyPath, task.implicitSlot = prevImplicitSlot, parent ? serializeLazyID(request.id) : serializeByValueID(request.id);
            task.keyPath = prevKeyPath;
            task.implicitSlot = prevImplicitSlot;
            request.pendingChunks++;
            prevKeyPath = request.nextChunkId++;
            task = logRecoverableError(request, key, task);
            emitErrorChunk(request, prevKeyPath, task, key, !1);
            return parent ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath);
        }
    }
    function renderModelDestructive(request, task, parent, parentPropertyName, value) {
        task.model = value;
        if (value === REACT_ELEMENT_TYPE) return "$";
        if (null === value) return null;
        if ("object" === typeof value) {
            switch(value.$$typeof){
                case REACT_ELEMENT_TYPE:
                    var elementReference = null, _writtenObjects = request.writtenObjects;
                    if (null === task.keyPath && !task.implicitSlot) {
                        var _existingReference = _writtenObjects.get(value);
                        if (void 0 !== _existingReference) if (modelRoot === value) modelRoot = null;
                        else return _existingReference;
                        else -1 === parentPropertyName.indexOf(":") && (_existingReference = _writtenObjects.get(parent), void 0 !== _existingReference && (elementReference = _existingReference + ":" + parentPropertyName, _writtenObjects.set(value, elementReference)));
                    }
                    if (serializedSize > MAX_ROW_SIZE) return deferTask(request, task);
                    if (_existingReference = value._debugInfo) if (canEmitDebugInfo) forwardDebugInfo(request, task, _existingReference);
                    else return outlineTask(request, task);
                    _existingReference = value.props;
                    var refProp = _existingReference.ref;
                    refProp = void 0 !== refProp ? refProp : null;
                    task.debugOwner = value._owner;
                    task.debugStack = value._debugStack;
                    task.debugTask = value._debugTask;
                    if (void 0 === value._owner || void 0 === value._debugStack || void 0 === value._debugTask) {
                        var key = "";
                        null !== value.key && (key = ' key="' + value.key + '"');
                        console.error("Attempted to render <%s%s> without development properties. This is not supported. It can happen if:\n- The element is created with a production version of React but rendered in development.\n- The element was cloned with a custom function instead of `React.cloneElement`.\nThe props of this element may help locate this element: %o", value.type, key, value.props);
                    }
                    request = renderElement(request, task, value.type, value.key, refProp, _existingReference, value._store.validated);
                    "object" === typeof request && null !== request && null !== elementReference && (_writtenObjects.has(request) || _writtenObjects.set(request, elementReference));
                    return request;
                case REACT_LAZY_TYPE:
                    if (serializedSize > MAX_ROW_SIZE) return deferTask(request, task);
                    task.thenableState = null;
                    elementReference = callLazyInitInDEV(value);
                    if (request.status === ABORTING) throw null;
                    if (_writtenObjects = value._debugInfo) if (canEmitDebugInfo) forwardDebugInfo(request, task, _writtenObjects);
                    else return outlineTask(request, task);
                    return renderModelDestructive(request, task, emptyRoot, "", elementReference);
                case REACT_LEGACY_ELEMENT_TYPE:
                    throw Error('A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.');
            }
            if (isClientReference(value)) return serializeClientReference(request, parent, parentPropertyName, value);
            if (void 0 !== request.temporaryReferences && (elementReference = request.temporaryReferences.get(value), void 0 !== elementReference)) return "$T" + elementReference;
            elementReference = request.writtenObjects;
            _writtenObjects = elementReference.get(value);
            if ("function" === typeof value.then) {
                if (void 0 !== _writtenObjects) {
                    if (null !== task.keyPath || task.implicitSlot) return "$@" + serializeThenable(request, task, value).toString(16);
                    if (modelRoot === value) modelRoot = null;
                    else return _writtenObjects;
                }
                request = "$@" + serializeThenable(request, task, value).toString(16);
                elementReference.set(value, request);
                return request;
            }
            if (void 0 !== _writtenObjects) if (modelRoot === value) {
                if (_writtenObjects !== serializeByValueID(task.id)) return _writtenObjects;
                modelRoot = null;
            } else return _writtenObjects;
            else if (-1 === parentPropertyName.indexOf(":") && (_writtenObjects = elementReference.get(parent), void 0 !== _writtenObjects)) {
                _existingReference = parentPropertyName;
                if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE) switch(parentPropertyName){
                    case "1":
                        _existingReference = "type";
                        break;
                    case "2":
                        _existingReference = "key";
                        break;
                    case "3":
                        _existingReference = "props";
                        break;
                    case "4":
                        _existingReference = "_owner";
                }
                elementReference.set(value, _writtenObjects + ":" + _existingReference);
            }
            if (isArrayImpl(value)) return renderFragment(request, task, value);
            if (value instanceof Map) return serializeMap(request, value);
            if (value instanceof Set) return serializeSet(request, value);
            if ("function" === typeof FormData && value instanceof FormData) return serializeFormData(request, value);
            if (value instanceof Error) return serializeErrorValue(request, value);
            if (value instanceof ArrayBuffer) return serializeTypedArray(request, "A", new Uint8Array(value));
            if (value instanceof Int8Array) return serializeTypedArray(request, "O", value);
            if (value instanceof Uint8Array) return serializeTypedArray(request, "o", value);
            if (value instanceof Uint8ClampedArray) return serializeTypedArray(request, "U", value);
            if (value instanceof Int16Array) return serializeTypedArray(request, "S", value);
            if (value instanceof Uint16Array) return serializeTypedArray(request, "s", value);
            if (value instanceof Int32Array) return serializeTypedArray(request, "L", value);
            if (value instanceof Uint32Array) return serializeTypedArray(request, "l", value);
            if (value instanceof Float32Array) return serializeTypedArray(request, "G", value);
            if (value instanceof Float64Array) return serializeTypedArray(request, "g", value);
            if (value instanceof BigInt64Array) return serializeTypedArray(request, "M", value);
            if (value instanceof BigUint64Array) return serializeTypedArray(request, "m", value);
            if (value instanceof DataView) return serializeTypedArray(request, "V", value);
            if ("function" === typeof Blob && value instanceof Blob) return serializeBlob(request, value);
            if (elementReference = getIteratorFn(value)) return elementReference = elementReference.call(value), elementReference === value ? "$i" + outlineModel(request, Array.from(elementReference)).toString(16) : renderFragment(request, task, Array.from(elementReference));
            if ("function" === typeof ReadableStream && value instanceof ReadableStream) return serializeReadableStream(request, task, value);
            elementReference = value[ASYNC_ITERATOR];
            if ("function" === typeof elementReference) return renderAsyncFragment(request, task, value, elementReference);
            if (value instanceof Date) return "$D" + value.toJSON();
            elementReference = getPrototypeOf(value);
            if (elementReference !== ObjectPrototype && (null === elementReference || null !== getPrototypeOf(elementReference))) throw Error("Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." + describeObjectForErrorMessage(parent, parentPropertyName));
            if ("Object" !== objectName(value)) callWithDebugContextInDEV(request, task, function() {
                console.error("Only plain objects can be passed to Client Components from Server Components. %s objects are not supported.%s", objectName(value), describeObjectForErrorMessage(parent, parentPropertyName));
            });
            else if (!isSimpleObject(value)) callWithDebugContextInDEV(request, task, function() {
                console.error("Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported.%s", describeObjectForErrorMessage(parent, parentPropertyName));
            });
            else if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(value);
                0 < symbols.length && callWithDebugContextInDEV(request, task, function() {
                    console.error("Only plain objects can be passed to Client Components from Server Components. Objects with symbol properties like %s are not supported.%s", symbols[0].description, describeObjectForErrorMessage(parent, parentPropertyName));
                });
            }
            return value;
        }
        if ("string" === typeof value) return serializedSize += value.length, "Z" === value[value.length - 1] && parent[parentPropertyName] instanceof Date ? "$D" + value : 1024 <= value.length && null !== byteLengthOfChunk ? serializeLargeTextString(request, value) : "$" === value[0] ? "$" + value : value;
        if ("boolean" === typeof value) return value;
        if ("number" === typeof value) return serializeNumber(value);
        if ("undefined" === typeof value) return "$undefined";
        if ("function" === typeof value) {
            if (isClientReference(value)) return serializeClientReference(request, parent, parentPropertyName, value);
            if (value.$$typeof === SERVER_REFERENCE_TAG) return serializeServerReference(request, value);
            if (void 0 !== request.temporaryReferences && (request = request.temporaryReferences.get(value), void 0 !== request)) return "$T" + request;
            if (value.$$typeof === TEMPORARY_REFERENCE_TAG) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
            if (/^on[A-Z]/.test(parentPropertyName)) throw Error("Event handlers cannot be passed to Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
            if (jsxChildrenParents.has(parent) || jsxPropsParents.has(parent) && "children" === parentPropertyName) throw request = value.displayName || value.name || "Component", Error("Functions are not valid as a child of Client Components. This may happen if you return " + request + " instead of <" + request + " /> from render. Or maybe you meant to call this function rather than return it." + describeObjectForErrorMessage(parent, parentPropertyName));
            throw Error('Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' + describeObjectForErrorMessage(parent, parentPropertyName));
        }
        if ("symbol" === typeof value) {
            task = request.writtenSymbols;
            elementReference = task.get(value);
            if (void 0 !== elementReference) return serializeByValueID(elementReference);
            elementReference = value.description;
            if (Symbol.for(elementReference) !== value) throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + (value.description + ") cannot be found among global symbols.") + describeObjectForErrorMessage(parent, parentPropertyName));
            request.pendingChunks++;
            _writtenObjects = request.nextChunkId++;
            emitSymbolChunk(request, _writtenObjects, elementReference);
            task.set(value, _writtenObjects);
            return serializeByValueID(_writtenObjects);
        }
        if ("bigint" === typeof value) return "$n" + value.toString(10);
        throw Error("Type " + typeof value + " is not supported in Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName));
    }
    function logRecoverableError(request, error, task) {
        var prevRequest = currentRequest;
        currentRequest = null;
        try {
            var onError = request.onError;
            var errorDigest = null !== task ? supportsRequestStorage ? requestStorage.run(void 0, callWithDebugContextInDEV, request, task, onError, error) : callWithDebugContextInDEV(request, task, onError, error) : supportsRequestStorage ? requestStorage.run(void 0, onError, error) : onError(error);
        } finally{
            currentRequest = prevRequest;
        }
        if (null != errorDigest && "string" !== typeof errorDigest) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
        return errorDigest || "";
    }
    function fatalError(request, error) {
        var onFatalError = request.onFatalError;
        onFatalError(error);
        null !== request.destination ? (request.status = CLOSED, closeWithError(request.destination, error)) : (request.status = 13, request.fatalError = error);
        request.cacheController.abort(Error("The render was aborted due to a fatal error.", {
            cause: error
        }));
    }
    function serializeErrorValue(request, error) {
        var name = "Error", env = (0, request.environmentName)();
        try {
            name = error.name;
            var message = String(error.message);
            var stack = filterStackTrace(request, parseStackTrace(error, 0));
            var errorEnv = error.environmentName;
            "string" === typeof errorEnv && (env = errorEnv);
        } catch (x) {
            message = "An error occurred but serializing the error message failed.", stack = [];
        }
        return "$Z" + outlineModel(request, {
            name: name,
            message: message,
            stack: stack,
            env: env
        }).toString(16);
    }
    function emitErrorChunk(request, id, digest, error, debug) {
        var name = "Error", env = (0, request.environmentName)();
        try {
            if (error instanceof Error) {
                name = error.name;
                var message = String(error.message);
                var stack = filterStackTrace(request, parseStackTrace(error, 0));
                var errorEnv = error.environmentName;
                "string" === typeof errorEnv && (env = errorEnv);
            } else message = "object" === typeof error && null !== error ? describeObjectForErrorMessage(error) : String(error), stack = [];
        } catch (x) {
            message = "An error occurred but serializing the error message failed.", stack = [];
        }
        digest = {
            digest: digest,
            name: name,
            message: message,
            stack: stack,
            env: env
        };
        id = id.toString(16) + ":E" + stringify(digest) + "\n";
        id = stringToChunk(id);
        debug ? request.completedDebugChunks.push(id) : request.completedErrorChunks.push(id);
    }
    function emitImportChunk(request, id, clientReferenceMetadata, debug) {
        clientReferenceMetadata = stringify(clientReferenceMetadata);
        id = id.toString(16) + ":I" + clientReferenceMetadata + "\n";
        id = stringToChunk(id);
        debug ? request.completedDebugChunks.push(id) : request.completedImportChunks.push(id);
    }
    function emitSymbolChunk(request, id, name) {
        id = encodeReferenceChunk(request, id, "$S" + name);
        request.completedImportChunks.push(id);
    }
    function emitModelChunk(request, id, json) {
        id = id.toString(16) + ":" + json + "\n";
        id = stringToChunk(id);
        request.completedRegularChunks.push(id);
    }
    function emitDebugHaltChunk(request, id) {
        id = id.toString(16) + ":\n";
        id = stringToChunk(id);
        request.completedDebugChunks.push(id);
    }
    function emitDebugChunk(request, id, debugInfo) {
        var json = serializeDebugModel(request, 500, debugInfo);
        null !== request.debugDestination ? (debugInfo = request.nextChunkId++, json = debugInfo.toString(16) + ":" + json + "\n", request.pendingDebugChunks++, request.completedDebugChunks.push(stringToChunk(json)), id = id.toString(16) + ':D"$' + debugInfo.toString(16) + '"\n', request.completedRegularChunks.push(stringToChunk(id))) : (id = id.toString(16) + ":D" + json + "\n", request.completedRegularChunks.push(stringToChunk(id)));
    }
    function outlineComponentInfo(request, componentInfo) {
        if (!request.writtenDebugObjects.has(componentInfo)) {
            null != componentInfo.owner && outlineComponentInfo(request, componentInfo.owner);
            var objectLimit = 10;
            null != componentInfo.stack && (objectLimit += componentInfo.stack.length);
            objectLimit = {
                objectLimit: objectLimit
            };
            var componentDebugInfo = {
                name: componentInfo.name,
                key: componentInfo.key
            };
            null != componentInfo.env && (componentDebugInfo.env = componentInfo.env);
            null != componentInfo.owner && (componentDebugInfo.owner = componentInfo.owner);
            null == componentInfo.stack && null != componentInfo.debugStack ? componentDebugInfo.stack = filterStackTrace(request, parseStackTrace(componentInfo.debugStack, 1)) : null != componentInfo.stack && (componentDebugInfo.stack = componentInfo.stack);
            componentDebugInfo.props = componentInfo.props;
            objectLimit = outlineDebugModel(request, objectLimit, componentDebugInfo);
            objectLimit = serializeByValueID(objectLimit);
            request.writtenDebugObjects.set(componentInfo, objectLimit);
            request.writtenObjects.set(componentInfo, objectLimit);
        }
    }
    function emitTypedArrayChunk(request, id, tag, typedArray, debug) {
        debug ? request.pendingDebugChunks++ : request.pendingChunks++;
        var buffer = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
        typedArray = 2048 < typedArray.byteLength ? buffer.slice() : buffer;
        buffer = typedArray.byteLength;
        id = id.toString(16) + ":" + tag + buffer.toString(16) + ",";
        id = stringToChunk(id);
        debug ? request.completedDebugChunks.push(id, typedArray) : request.completedRegularChunks.push(id, typedArray);
    }
    function emitTextChunk(request, id, text, debug) {
        if (null === byteLengthOfChunk) throw Error("Existence of byteLengthOfChunk should have already been checked. This is a bug in React.");
        debug ? request.pendingDebugChunks++ : request.pendingChunks++;
        text = stringToChunk(text);
        var binaryLength = text.byteLength;
        id = id.toString(16) + ":T" + binaryLength.toString(16) + ",";
        id = stringToChunk(id);
        debug ? request.completedDebugChunks.push(id, text) : request.completedRegularChunks.push(id, text);
    }
    function renderDebugModel(request, counter, parent, parentPropertyName, value) {
        if (null === value) return null;
        if (value === REACT_ELEMENT_TYPE) return "$";
        if ("object" === typeof value) {
            if (isClientReference(value)) return serializeDebugClientReference(request, parent, parentPropertyName, value);
            if (value.$$typeof === CONSTRUCTOR_MARKER) {
                value = value.constructor;
                var ref = request.writtenDebugObjects.get(value);
                void 0 === ref && (request = outlineDebugModel(request, counter, value), ref = serializeByValueID(request));
                return "$P" + ref.slice(1);
            }
            if (void 0 !== request.temporaryReferences) {
                var tempRef = request.temporaryReferences.get(value);
                if (void 0 !== tempRef) return "$T" + tempRef;
            }
            tempRef = request.writtenDebugObjects;
            var existingDebugReference = tempRef.get(value);
            if (void 0 !== existingDebugReference) if (debugModelRoot === value) debugModelRoot = null;
            else return existingDebugReference;
            else if (-1 === parentPropertyName.indexOf(":")) {
                if (existingDebugReference = tempRef.get(parent), void 0 !== existingDebugReference) {
                    if (0 >= counter.objectLimit && !doNotLimit.has(value)) return serializeDeferredObject(request, value);
                    var propertyName = parentPropertyName;
                    if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE) switch(parentPropertyName){
                        case "1":
                            propertyName = "type";
                            break;
                        case "2":
                            propertyName = "key";
                            break;
                        case "3":
                            propertyName = "props";
                            break;
                        case "4":
                            propertyName = "_owner";
                    }
                    tempRef.set(value, existingDebugReference + ":" + propertyName);
                } else if (debugNoOutline !== value) {
                    if ("function" === typeof value.then) return serializeDebugThenable(request, counter, value);
                    request = outlineDebugModel(request, counter, value);
                    return serializeByValueID(request);
                }
            }
            parent = request.writtenObjects.get(value);
            if (void 0 !== parent) return parent;
            if (0 >= counter.objectLimit && !doNotLimit.has(value)) return serializeDeferredObject(request, value);
            counter.objectLimit--;
            parent = request.deferredDebugObjects;
            if (null !== parent && (parentPropertyName = parent.existing.get(value), void 0 !== parentPropertyName)) return parent.existing.delete(value), parent.retained.delete(parentPropertyName), emitOutlinedDebugModelChunk(request, parentPropertyName, counter, value), serializeByValueID(parentPropertyName);
            switch(value.$$typeof){
                case REACT_ELEMENT_TYPE:
                    null != value._owner && outlineComponentInfo(request, value._owner);
                    "object" === typeof value.type && null !== value.type && doNotLimit.add(value.type);
                    "object" === typeof value.key && null !== value.key && doNotLimit.add(value.key);
                    doNotLimit.add(value.props);
                    null !== value._owner && doNotLimit.add(value._owner);
                    counter = null;
                    if (null != value._debugStack) for(counter = filterStackTrace(request, parseStackTrace(value._debugStack, 1)), doNotLimit.add(counter), request = 0; request < counter.length; request++)doNotLimit.add(counter[request]);
                    return [
                        REACT_ELEMENT_TYPE,
                        value.type,
                        value.key,
                        value.props,
                        value._owner,
                        counter,
                        value._store.validated
                    ];
            }
            if ("function" === typeof value.then) return serializeDebugThenable(request, counter, value);
            if (isArrayImpl(value)) return value;
            if (value instanceof Map) {
                value = Array.from(value);
                counter.objectLimit++;
                for(ref = 0; ref < value.length; ref++){
                    var entry = value[ref];
                    doNotLimit.add(entry);
                    var key = entry[0];
                    entry = entry[1];
                    "object" === typeof key && null !== key && doNotLimit.add(key);
                    "object" === typeof entry && null !== entry && doNotLimit.add(entry);
                }
                return "$Q" + outlineDebugModel(request, counter, value).toString(16);
            }
            if (value instanceof Set) {
                value = Array.from(value);
                counter.objectLimit++;
                for(ref = 0; ref < value.length; ref++)key = value[ref], "object" === typeof key && null !== key && doNotLimit.add(key);
                return "$W" + outlineDebugModel(request, counter, value).toString(16);
            }
            if ("function" === typeof FormData && value instanceof FormData) return value = Array.from(value.entries()), "$K" + outlineDebugModel(request, {
                objectLimit: 2 * value.length + 1
            }, value).toString(16);
            if (value instanceof Error) {
                counter = "Error";
                var env = (0, request.environmentName)();
                try {
                    counter = value.name, ref = String(value.message), key = filterStackTrace(request, parseStackTrace(value, 0)), entry = value.environmentName, "string" === typeof entry && (env = entry);
                } catch (x) {
                    ref = "An error occurred but serializing the error message failed.", key = [];
                }
                request = "$Z" + outlineDebugModel(request, {
                    objectLimit: 2 * key.length + 1
                }, {
                    name: counter,
                    message: ref,
                    stack: key,
                    env: env
                }).toString(16);
                return request;
            }
            if (value instanceof ArrayBuffer) return serializeDebugTypedArray(request, "A", new Uint8Array(value));
            if (value instanceof Int8Array) return serializeDebugTypedArray(request, "O", value);
            if (value instanceof Uint8Array) return serializeDebugTypedArray(request, "o", value);
            if (value instanceof Uint8ClampedArray) return serializeDebugTypedArray(request, "U", value);
            if (value instanceof Int16Array) return serializeDebugTypedArray(request, "S", value);
            if (value instanceof Uint16Array) return serializeDebugTypedArray(request, "s", value);
            if (value instanceof Int32Array) return serializeDebugTypedArray(request, "L", value);
            if (value instanceof Uint32Array) return serializeDebugTypedArray(request, "l", value);
            if (value instanceof Float32Array) return serializeDebugTypedArray(request, "G", value);
            if (value instanceof Float64Array) return serializeDebugTypedArray(request, "g", value);
            if (value instanceof BigInt64Array) return serializeDebugTypedArray(request, "M", value);
            if (value instanceof BigUint64Array) return serializeDebugTypedArray(request, "m", value);
            if (value instanceof DataView) return serializeDebugTypedArray(request, "V", value);
            if ("function" === typeof Blob && value instanceof Blob) return serializeDebugBlob(request, value);
            if (getIteratorFn(value)) return Array.from(value);
            request = getPrototypeOf(value);
            if (request !== ObjectPrototype && null !== request) {
                counter = Object.create(null);
                for(env in value)if (hasOwnProperty.call(value, env) || isGetter(request, env)) counter[env] = value[env];
                ref = request.constructor;
                "function" !== typeof ref || ref.prototype !== request || hasOwnProperty.call(value, "") || isGetter(request, "") || (counter[""] = {
                    $$typeof: CONSTRUCTOR_MARKER,
                    constructor: ref
                });
                return counter;
            }
            return value;
        }
        if ("string" === typeof value) {
            if ("Z" === value[value.length - 1] && parent[parentPropertyName] instanceof Date) return "$D" + value;
            if (1024 <= value.length) {
                if (0 >= counter.objectLimit) return serializeDeferredObject(request, value);
                counter.objectLimit--;
                request.pendingDebugChunks++;
                counter = request.nextChunkId++;
                emitTextChunk(request, counter, value, !0);
                return serializeByValueID(counter);
            }
            return "$" === value[0] ? "$" + value : value;
        }
        if ("boolean" === typeof value) return value;
        if ("number" === typeof value) return serializeNumber(value);
        if ("undefined" === typeof value) return "$undefined";
        if ("function" === typeof value) {
            if (isClientReference(value)) return serializeDebugClientReference(request, parent, parentPropertyName, value);
            if (void 0 !== request.temporaryReferences && (counter = request.temporaryReferences.get(value), void 0 !== counter)) return "$T" + counter;
            counter = request.writtenDebugObjects;
            ref = counter.get(value);
            if (void 0 !== ref) return ref;
            ref = Function.prototype.toString.call(value);
            key = value.name;
            key = "$E" + ("string" === typeof key ? "Object.defineProperty(" + ref + ',"name",{value:' + JSON.stringify(key) + "})" : "(" + ref + ")");
            request.pendingDebugChunks++;
            ref = request.nextChunkId++;
            key = encodeReferenceChunk(request, ref, key);
            request.completedDebugChunks.push(key);
            request = serializeByValueID(ref);
            counter.set(value, request);
            return request;
        }
        if ("symbol" === typeof value) {
            counter = request.writtenSymbols.get(value);
            if (void 0 !== counter) return serializeByValueID(counter);
            value = value.description;
            request.pendingChunks++;
            counter = request.nextChunkId++;
            emitSymbolChunk(request, counter, value);
            return serializeByValueID(counter);
        }
        return "bigint" === typeof value ? "$n" + value.toString(10) : value instanceof Date ? "$D" + value.toJSON() : "unknown type " + typeof value;
    }
    function serializeDebugModel(request, objectLimit, model) {
        function replacer(parentPropertyName, value) {
            try {
                return renderDebugModel(request, counter, this, parentPropertyName, value);
            } catch (x) {
                return "Unknown Value: React could not send it from the server.\n" + x.message;
            }
        }
        var counter = {
            objectLimit: objectLimit
        };
        objectLimit = debugNoOutline;
        debugNoOutline = model;
        try {
            return stringify(model, replacer);
        } catch (x) {
            return stringify("Unknown Value: React could not send it from the server.\n" + x.message);
        } finally{
            debugNoOutline = objectLimit;
        }
    }
    function emitOutlinedDebugModelChunk(request, id, counter, model) {
        function replacer(parentPropertyName, value) {
            try {
                return renderDebugModel(request, counter, this, parentPropertyName, value);
            } catch (x) {
                return "Unknown Value: React could not send it from the server.\n" + x.message;
            }
        }
        "object" === typeof model && null !== model && doNotLimit.add(model);
        var prevModelRoot = debugModelRoot;
        debugModelRoot = model;
        "object" === typeof model && null !== model && request.writtenDebugObjects.set(model, serializeByValueID(id));
        try {
            var json = stringify(model, replacer);
        } catch (x) {
            json = stringify("Unknown Value: React could not send it from the server.\n" + x.message);
        } finally{
            debugModelRoot = prevModelRoot;
        }
        id = id.toString(16) + ":" + json + "\n";
        id = stringToChunk(id);
        request.completedDebugChunks.push(id);
    }
    function outlineDebugModel(request, counter, model) {
        var id = request.nextChunkId++;
        request.pendingDebugChunks++;
        emitOutlinedDebugModelChunk(request, id, counter, model);
        return id;
    }
    function emitTimeOriginChunk(request, timeOrigin) {
        request.pendingDebugChunks++;
        timeOrigin = stringToChunk(":N" + timeOrigin + "\n");
        request.completedDebugChunks.push(timeOrigin);
    }
    function forwardDebugInfo(request$jscomp$1, task, debugInfo) {
        for(var id = task.id, i = 0; i < debugInfo.length; i++){
            var info = debugInfo[i];
            if ("number" === typeof info.time) markOperationEndTime(request$jscomp$1, task, info.time);
            else if ("string" === typeof info.name) outlineComponentInfo(request$jscomp$1, info), request$jscomp$1.pendingChunks++, emitDebugChunk(request$jscomp$1, id, info);
            else if (info.awaited) {
                var ioInfo = info.awaited;
                if (!(ioInfo.end <= request$jscomp$1.timeOrigin)) {
                    var request = request$jscomp$1, ioInfo$jscomp$0 = ioInfo;
                    if (!request.writtenObjects.has(ioInfo$jscomp$0)) {
                        request.pendingDebugChunks++;
                        var id$jscomp$0 = request.nextChunkId++, owner = ioInfo$jscomp$0.owner;
                        null != owner && outlineComponentInfo(request, owner);
                        var debugStack = null == ioInfo$jscomp$0.stack && null != ioInfo$jscomp$0.debugStack ? filterStackTrace(request, parseStackTrace(ioInfo$jscomp$0.debugStack, 1)) : ioInfo$jscomp$0.stack;
                        var request$jscomp$0 = request, id$jscomp$1 = id$jscomp$0, value = ioInfo$jscomp$0.value, env = ioInfo$jscomp$0.env, objectLimit = 10;
                        debugStack && (objectLimit += debugStack.length);
                        var debugIOInfo = {
                            name: ioInfo$jscomp$0.name,
                            start: ioInfo$jscomp$0.start - request$jscomp$0.timeOrigin,
                            end: ioInfo$jscomp$0.end - request$jscomp$0.timeOrigin
                        };
                        null != env && (debugIOInfo.env = env);
                        null != debugStack && (debugIOInfo.stack = debugStack);
                        null != owner && (debugIOInfo.owner = owner);
                        void 0 !== value && (debugIOInfo.value = value);
                        value = serializeDebugModel(request$jscomp$0, objectLimit, debugIOInfo);
                        id$jscomp$1 = id$jscomp$1.toString(16) + ":J" + value + "\n";
                        id$jscomp$1 = stringToChunk(id$jscomp$1);
                        request$jscomp$0.completedDebugChunks.push(id$jscomp$1);
                        request.writtenDebugObjects.set(ioInfo$jscomp$0, serializeByValueID(id$jscomp$0));
                    }
                    request = null == info.stack && null != info.debugStack ? filterStackTrace(request$jscomp$1, parseStackTrace(info.debugStack, 1)) : info.stack;
                    ioInfo = {
                        awaited: ioInfo
                    };
                    null != info.env && (ioInfo.env = info.env);
                    null != info.owner && (ioInfo.owner = info.owner);
                    null != request && (ioInfo.stack = request);
                    request$jscomp$1.pendingChunks++;
                    emitDebugChunk(request$jscomp$1, id, ioInfo);
                }
            } else request$jscomp$1.pendingChunks++, emitDebugChunk(request$jscomp$1, id, info);
        }
    }
    function forwardDebugInfoFromThenable(request, task, thenable) {
        (thenable = thenable._debugInfo) && forwardDebugInfo(request, task, thenable);
    }
    function forwardDebugInfoFromCurrentContext(request, task, thenable) {
        (thenable = thenable._debugInfo) && forwardDebugInfo(request, task, thenable);
    }
    function markOperationEndTime(request, task, timestamp) {
        !(request.status === ABORTING && timestamp > request.abortTime) && timestamp > task.time && (task.time = timestamp);
    }
    function emitChunk(request, task, value) {
        var id = task.id;
        "string" === typeof value && null !== byteLengthOfChunk ? emitTextChunk(request, id, value, !1) : value instanceof ArrayBuffer ? emitTypedArrayChunk(request, id, "A", new Uint8Array(value), !1) : value instanceof Int8Array ? emitTypedArrayChunk(request, id, "O", value, !1) : value instanceof Uint8Array ? emitTypedArrayChunk(request, id, "o", value, !1) : value instanceof Uint8ClampedArray ? emitTypedArrayChunk(request, id, "U", value, !1) : value instanceof Int16Array ? emitTypedArrayChunk(request, id, "S", value, !1) : value instanceof Uint16Array ? emitTypedArrayChunk(request, id, "s", value, !1) : value instanceof Int32Array ? emitTypedArrayChunk(request, id, "L", value, !1) : value instanceof Uint32Array ? emitTypedArrayChunk(request, id, "l", value, !1) : value instanceof Float32Array ? emitTypedArrayChunk(request, id, "G", value, !1) : value instanceof Float64Array ? emitTypedArrayChunk(request, id, "g", value, !1) : value instanceof BigInt64Array ? emitTypedArrayChunk(request, id, "M", value, !1) : value instanceof BigUint64Array ? emitTypedArrayChunk(request, id, "m", value, !1) : value instanceof DataView ? emitTypedArrayChunk(request, id, "V", value, !1) : (value = stringify(value, task.toJSON), emitModelChunk(request, task.id, value));
    }
    function erroredTask(request, task, error) {
        task.timed && markOperationEndTime(request, task, performance.now());
        task.status = 4;
        var digest = logRecoverableError(request, error, task);
        emitErrorChunk(request, task.id, digest, error, !1);
        request.abortableTasks.delete(task);
        callOnAllReadyIfReady(request);
    }
    function retryTask(request, task) {
        if (0 === task.status) {
            var prevCanEmitDebugInfo = canEmitDebugInfo;
            task.status = 5;
            var parentSerializedSize = serializedSize;
            try {
                modelRoot = task.model;
                canEmitDebugInfo = !0;
                var resolvedModel = renderModelDestructive(request, task, emptyRoot, "", task.model);
                canEmitDebugInfo = !1;
                modelRoot = resolvedModel;
                task.keyPath = null;
                task.implicitSlot = !1;
                var currentEnv = (0, request.environmentName)();
                currentEnv !== task.environmentName && (request.pendingChunks++, emitDebugChunk(request, task.id, {
                    env: currentEnv
                }));
                task.timed && markOperationEndTime(request, task, performance.now());
                if ("object" === typeof resolvedModel && null !== resolvedModel) request.writtenObjects.set(resolvedModel, serializeByValueID(task.id)), emitChunk(request, task, resolvedModel);
                else {
                    var json = stringify(resolvedModel);
                    emitModelChunk(request, task.id, json);
                }
                task.status = 1;
                request.abortableTasks.delete(task);
                callOnAllReadyIfReady(request);
            } catch (thrownValue) {
                if (request.status === ABORTING) {
                    request.abortableTasks.delete(task);
                    task.status = 0;
                    var errorId = request.fatalError;
                    abortTask(task);
                    finishAbortedTask(task, request, errorId);
                } else {
                    var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
                    if ("object" === typeof x && null !== x && "function" === typeof x.then) {
                        task.status = 0;
                        task.thenableState = getThenableStateAfterSuspending();
                        var ping = task.ping;
                        x.then(ping, ping);
                    } else erroredTask(request, task, x);
                }
            } finally{
                canEmitDebugInfo = prevCanEmitDebugInfo, serializedSize = parentSerializedSize;
            }
        }
    }
    function tryStreamTask(request, task) {
        var prevCanEmitDebugInfo = canEmitDebugInfo;
        canEmitDebugInfo = !1;
        var parentSerializedSize = serializedSize;
        try {
            emitChunk(request, task, task.model);
        } finally{
            serializedSize = parentSerializedSize, canEmitDebugInfo = prevCanEmitDebugInfo;
        }
    }
    function performWork(request) {
        var prevDispatcher = ReactSharedInternalsServer.H;
        ReactSharedInternalsServer.H = HooksDispatcher;
        var prevRequest = currentRequest;
        currentRequest$1 = currentRequest = request;
        try {
            var pingedTasks = request.pingedTasks;
            request.pingedTasks = [];
            for(var i = 0; i < pingedTasks.length; i++)retryTask(request, pingedTasks[i]);
            flushCompletedChunks(request);
        } catch (error) {
            logRecoverableError(request, error, null), fatalError(request, error);
        } finally{
            ReactSharedInternalsServer.H = prevDispatcher, currentRequest$1 = null, currentRequest = prevRequest;
        }
    }
    function abortTask(task) {
        0 === task.status && (task.status = 3);
    }
    function finishAbortedTask(task, request, errorId) {
        if (3 === task.status) {
            var model = task.model;
            "object" === typeof model && null !== model && (model = model._debugInfo) && forwardDebugInfo(request, task, model);
            task.timed && markOperationEndTime(request, task, request.abortTime);
            errorId = serializeByValueID(errorId);
            task = encodeReferenceChunk(request, task.id, errorId);
            request.completedErrorChunks.push(task);
        }
    }
    function flushCompletedChunks(request) {
        if (null !== request.debugDestination) {
            var debugDestination = request.debugDestination;
            currentView = new Uint8Array(2048);
            writtenBytes = 0;
            try {
                for(var debugChunks = request.completedDebugChunks, i = 0; i < debugChunks.length; i++)request.pendingDebugChunks--, writeChunkAndReturn(debugDestination, debugChunks[i]);
                debugChunks.splice(0, i);
            } finally{
                completeWriting(debugDestination);
            }
        }
        debugDestination = request.destination;
        if (null !== debugDestination) {
            currentView = new Uint8Array(2048);
            writtenBytes = 0;
            try {
                var importsChunks = request.completedImportChunks;
                for(debugChunks = 0; debugChunks < importsChunks.length; debugChunks++)if (request.pendingChunks--, !writeChunkAndReturn(debugDestination, importsChunks[debugChunks])) {
                    request.destination = null;
                    debugChunks++;
                    break;
                }
                importsChunks.splice(0, debugChunks);
                var hintChunks = request.completedHintChunks;
                for(debugChunks = 0; debugChunks < hintChunks.length; debugChunks++)if (!writeChunkAndReturn(debugDestination, hintChunks[debugChunks])) //TURBOPACK unreachable
                ;
                hintChunks.splice(0, debugChunks);
                if (null === request.debugDestination) {
                    var _debugChunks = request.completedDebugChunks;
                    for(debugChunks = 0; debugChunks < _debugChunks.length; debugChunks++)if (request.pendingDebugChunks--, !writeChunkAndReturn(debugDestination, _debugChunks[debugChunks])) {
                        request.destination = null;
                        debugChunks++;
                        break;
                    }
                    _debugChunks.splice(0, debugChunks);
                }
                var regularChunks = request.completedRegularChunks;
                for(debugChunks = 0; debugChunks < regularChunks.length; debugChunks++)if (request.pendingChunks--, !writeChunkAndReturn(debugDestination, regularChunks[debugChunks])) {
                    request.destination = null;
                    debugChunks++;
                    break;
                }
                regularChunks.splice(0, debugChunks);
                var errorChunks = request.completedErrorChunks;
                for(debugChunks = 0; debugChunks < errorChunks.length; debugChunks++)if (request.pendingChunks--, !writeChunkAndReturn(debugDestination, errorChunks[debugChunks])) {
                    request.destination = null;
                    debugChunks++;
                    break;
                }
                errorChunks.splice(0, debugChunks);
            } finally{
                request.flushScheduled = !1, completeWriting(debugDestination);
            }
        }
        0 === request.pendingChunks && (importsChunks = request.debugDestination, 0 === request.pendingDebugChunks ? (null !== importsChunks && (importsChunks.close(), request.debugDestination = null), request.status < ABORTING && request.cacheController.abort(Error("This render completed successfully. All cacheSignals are now aborted to allow clean up of any unused resources.")), null !== request.destination && (request.status = CLOSED, request.destination.close(), request.destination = null), null !== request.debugDestination && (request.debugDestination.close(), request.debugDestination = null)) : null !== importsChunks && null !== request.destination && (request.status = CLOSED, request.destination.close(), request.destination = null));
    }
    function startWork(request) {
        request.flushScheduled = null !== request.destination;
        supportsRequestStorage ? scheduleMicrotask(function() {
            requestStorage.run(request, performWork, request);
        }) : scheduleMicrotask(function() {
            return performWork(request);
        });
        setTimeout(function() {
            10 === request.status && (request.status = 11);
        }, 0);
    }
    function enqueueFlush(request) {
        !1 !== request.flushScheduled || 0 !== request.pingedTasks.length || null === request.destination && null === request.debugDestination || (request.flushScheduled = !0, setTimeout(function() {
            request.flushScheduled = !1;
            flushCompletedChunks(request);
        }, 0));
    }
    function callOnAllReadyIfReady(request) {
        0 === request.abortableTasks.size && (request = request.onAllReady, request());
    }
    function startFlowing(request, destination) {
        if (13 === request.status) request.status = CLOSED, closeWithError(destination, request.fatalError);
        else if (request.status !== CLOSED && null === request.destination) {
            request.destination = destination;
            try {
                flushCompletedChunks(request);
            } catch (error) {
                logRecoverableError(request, error, null), fatalError(request, error);
            }
        }
    }
    function finishAbort(request, abortedTasks, errorId) {
        try {
            abortedTasks.forEach(function(task) {
                return finishAbortedTask(task, request, errorId);
            });
            var onAllReady = request.onAllReady;
            onAllReady();
            flushCompletedChunks(request);
        } catch (error) {
            logRecoverableError(request, error, null), fatalError(request, error);
        }
    }
    function abort(request, reason) {
        if (!(11 < request.status)) try {
            request.status = ABORTING;
            request.abortTime = performance.now();
            request.cacheController.abort(reason);
            var abortableTasks = request.abortableTasks;
            if (0 < abortableTasks.size) {
                var error = void 0 === reason ? Error("The render was aborted by the server without a reason.") : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error("The render was aborted by the server with a promise.") : reason, digest = logRecoverableError(request, error, null), _errorId2 = request.nextChunkId++;
                request.fatalError = _errorId2;
                request.pendingChunks++;
                emitErrorChunk(request, _errorId2, digest, error, !1);
                abortableTasks.forEach(function(task) {
                    return abortTask(task, request, _errorId2);
                });
                setTimeout(function() {
                    return finishAbort(request, abortableTasks, _errorId2);
                }, 0);
            } else {
                var onAllReady = request.onAllReady;
                onAllReady();
                flushCompletedChunks(request);
            }
        } catch (error$2) {
            logRecoverableError(request, error$2, null), fatalError(request, error$2);
        }
    }
    function fromHex(str) {
        return parseInt(str, 16);
    }
    function closeDebugChannel(request) {
        var deferredDebugObjects = request.deferredDebugObjects;
        if (null === deferredDebugObjects) throw Error("resolveDebugMessage/closeDebugChannel should not be called for a Request that wasn't kept alive. This is a bug in React.");
        deferredDebugObjects.retained.forEach(function(value, id) {
            request.pendingDebugChunks--;
            deferredDebugObjects.retained.delete(id);
            deferredDebugObjects.existing.delete(value);
        });
        enqueueFlush(request);
    }
    function resolveServerReference(bundlerConfig, id) {
        var name = "", resolvedModuleData = bundlerConfig[id];
        if (resolvedModuleData) name = resolvedModuleData.name;
        else {
            var idx = id.lastIndexOf("#");
            -1 !== idx && (name = id.slice(idx + 1), resolvedModuleData = bundlerConfig[id.slice(0, idx)]);
            if (!resolvedModuleData) throw Error('Could not find the module "' + id + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.');
        }
        return [
            resolvedModuleData.id,
            resolvedModuleData.chunks,
            name
        ];
    }
    function requireAsyncModule(id) {
        var promise = globalThis.__next_require__(id);
        if ("function" !== typeof promise.then || "fulfilled" === promise.status) return null;
        promise.then(function(value) {
            promise.status = "fulfilled";
            promise.value = value;
        }, function(reason) {
            promise.status = "rejected";
            promise.reason = reason;
        });
        return promise;
    }
    function ignoreReject() {}
    function preloadModule(metadata) {
        for(var chunks = metadata[1], promises = [], i = 0; i < chunks.length; i++){
            var thenable = globalThis.__next_chunk_load__(chunks[i]);
            loadedChunks.has(thenable) || promises.push(thenable);
            if (!instrumentedChunks.has(thenable)) {
                var resolve = loadedChunks.add.bind(loadedChunks, thenable);
                thenable.then(resolve, ignoreReject);
                instrumentedChunks.add(thenable);
            }
        }
        return 4 === metadata.length ? 0 === promises.length ? requireAsyncModule(metadata[0]) : Promise.all(promises).then(function() {
            return requireAsyncModule(metadata[0]);
        }) : 0 < promises.length ? Promise.all(promises) : null;
    }
    function requireModule(metadata) {
        var moduleExports = globalThis.__next_require__(metadata[0]);
        if (4 === metadata.length && "function" === typeof moduleExports.then) if ("fulfilled" === moduleExports.status) moduleExports = moduleExports.value;
        else throw moduleExports.reason;
        return "*" === metadata[2] ? moduleExports : "" === metadata[2] ? moduleExports.__esModule ? moduleExports.default : moduleExports : moduleExports[metadata[2]];
    }
    function Chunk(status, value, reason, response) {
        this.status = status;
        this.value = value;
        this.reason = reason;
        this._response = response;
    }
    function createPendingChunk(response) {
        return new Chunk("pending", null, null, response);
    }
    function wakeChunk(listeners, value) {
        for(var i = 0; i < listeners.length; i++)(0, listeners[i])(value);
    }
    function triggerErrorOnChunk(chunk, error) {
        if ("pending" !== chunk.status && "blocked" !== chunk.status) chunk.reason.error(error);
        else {
            var listeners = chunk.reason;
            chunk.status = "rejected";
            chunk.reason = error;
            null !== listeners && wakeChunk(listeners, error);
        }
    }
    function resolveModelChunk(chunk, value, id) {
        if ("pending" !== chunk.status) chunk = chunk.reason, "C" === value[0] ? chunk.close("C" === value ? '"$undefined"' : value.slice(1)) : chunk.enqueueModel(value);
        else {
            var resolveListeners = chunk.value, rejectListeners = chunk.reason;
            chunk.status = "resolved_model";
            chunk.value = value;
            chunk.reason = id;
            if (null !== resolveListeners) switch(initializeModelChunk(chunk), chunk.status){
                case "fulfilled":
                    wakeChunk(resolveListeners, chunk.value);
                    break;
                case "pending":
                case "blocked":
                case "cyclic":
                    if (chunk.value) for(value = 0; value < resolveListeners.length; value++)chunk.value.push(resolveListeners[value]);
                    else chunk.value = resolveListeners;
                    if (chunk.reason) {
                        if (rejectListeners) for(value = 0; value < rejectListeners.length; value++)chunk.reason.push(rejectListeners[value]);
                    } else chunk.reason = rejectListeners;
                    break;
                case "rejected":
                    rejectListeners && wakeChunk(rejectListeners, chunk.reason);
            }
        }
    }
    function createResolvedIteratorResultChunk(response, value, done) {
        return new Chunk("resolved_model", (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}", -1, response);
    }
    function resolveIteratorResultChunk(chunk, value, done) {
        resolveModelChunk(chunk, (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}", -1);
    }
    function loadServerReference$1(response, id, bound, parentChunk, parentObject, key) {
        var serverReference = resolveServerReference(response._bundlerConfig, id);
        id = preloadModule(serverReference);
        if (bound) bound = Promise.all([
            bound,
            id
        ]).then(function(_ref) {
            _ref = _ref[0];
            var fn = requireModule(serverReference);
            return fn.bind.apply(fn, [
                null
            ].concat(_ref));
        });
        else if (id) bound = Promise.resolve(id).then(function() {
            return requireModule(serverReference);
        });
        else return requireModule(serverReference);
        bound.then(createModelResolver(parentChunk, parentObject, key, !1, response, createModel, []), createModelReject(parentChunk));
        return null;
    }
    function reviveModel(response, parentObj, parentKey, value, reference) {
        if ("string" === typeof value) return parseModelString(response, parentObj, parentKey, value, reference);
        if ("object" === typeof value && null !== value) if (void 0 !== reference && void 0 !== response._temporaryReferences && response._temporaryReferences.set(value, reference), Array.isArray(value)) for(var i = 0; i < value.length; i++)value[i] = reviveModel(response, value, "" + i, value[i], void 0 !== reference ? reference + ":" + i : void 0);
        else for(i in value)hasOwnProperty.call(value, i) && (parentObj = void 0 !== reference && -1 === i.indexOf(":") ? reference + ":" + i : void 0, parentObj = reviveModel(response, value, i, value[i], parentObj), void 0 !== parentObj ? value[i] = parentObj : delete value[i]);
        return value;
    }
    function initializeModelChunk(chunk) {
        var prevChunk = initializingChunk, prevBlocked = initializingChunkBlockedModel;
        initializingChunk = chunk;
        initializingChunkBlockedModel = null;
        var rootReference = -1 === chunk.reason ? void 0 : chunk.reason.toString(16), resolvedModel = chunk.value;
        chunk.status = "cyclic";
        chunk.value = null;
        chunk.reason = null;
        try {
            var rawModel = JSON.parse(resolvedModel), value = reviveModel(chunk._response, {
                "": rawModel
            }, "", rawModel, rootReference);
            if (null !== initializingChunkBlockedModel && 0 < initializingChunkBlockedModel.deps) initializingChunkBlockedModel.value = value, chunk.status = "blocked";
            else {
                var resolveListeners = chunk.value;
                chunk.status = "fulfilled";
                chunk.value = value;
                null !== resolveListeners && wakeChunk(resolveListeners, value);
            }
        } catch (error) {
            chunk.status = "rejected", chunk.reason = error;
        } finally{
            initializingChunk = prevChunk, initializingChunkBlockedModel = prevBlocked;
        }
    }
    function reportGlobalError(response, error) {
        response._closed = !0;
        response._closedReason = error;
        response._chunks.forEach(function(chunk) {
            "pending" === chunk.status && triggerErrorOnChunk(chunk, error);
        });
    }
    function getChunk(response, id) {
        var chunks = response._chunks, chunk = chunks.get(id);
        chunk || (chunk = response._formData.get(response._prefix + id), chunk = null != chunk ? new Chunk("resolved_model", chunk, id, response) : response._closed ? new Chunk("rejected", null, response._closedReason, response) : createPendingChunk(response), chunks.set(id, chunk));
        return chunk;
    }
    function createModelResolver(chunk, parentObject, key, cyclic, response, map, path) {
        if (initializingChunkBlockedModel) {
            var blocked = initializingChunkBlockedModel;
            cyclic || blocked.deps++;
        } else blocked = initializingChunkBlockedModel = {
            deps: cyclic ? 0 : 1,
            value: null
        };
        return function(value) {
            for(var i = 1; i < path.length; i++)value = value[path[i]];
            parentObject[key] = map(response, value);
            "" === key && null === blocked.value && (blocked.value = parentObject[key]);
            blocked.deps--;
            0 === blocked.deps && "blocked" === chunk.status && (value = chunk.value, chunk.status = "fulfilled", chunk.value = blocked.value, null !== value && wakeChunk(value, blocked.value));
        };
    }
    function createModelReject(chunk) {
        return function(error) {
            return triggerErrorOnChunk(chunk, error);
        };
    }
    function getOutlinedModel(response, reference, parentObject, key, map) {
        reference = reference.split(":");
        var id = parseInt(reference[0], 16);
        id = getChunk(response, id);
        switch(id.status){
            case "resolved_model":
                initializeModelChunk(id);
        }
        switch(id.status){
            case "fulfilled":
                parentObject = id.value;
                for(key = 1; key < reference.length; key++)parentObject = parentObject[reference[key]];
                return map(response, parentObject);
            case "pending":
            case "blocked":
            case "cyclic":
                var parentChunk = initializingChunk;
                id.then(createModelResolver(parentChunk, parentObject, key, "cyclic" === id.status, response, map, reference), createModelReject(parentChunk));
                return null;
            default:
                throw id.reason;
        }
    }
    function createMap(response, model) {
        return new Map(model);
    }
    function createSet(response, model) {
        return new Set(model);
    }
    function extractIterator(response, model) {
        return model[Symbol.iterator]();
    }
    function createModel(response, model) {
        return model;
    }
    function parseTypedArray(response, reference, constructor, bytesPerElement, parentObject, parentKey) {
        reference = parseInt(reference.slice(2), 16);
        reference = response._formData.get(response._prefix + reference);
        reference = constructor === ArrayBuffer ? reference.arrayBuffer() : reference.arrayBuffer().then(function(buffer) {
            return new constructor(buffer);
        });
        bytesPerElement = initializingChunk;
        reference.then(createModelResolver(bytesPerElement, parentObject, parentKey, !1, response, createModel, []), createModelReject(bytesPerElement));
        return null;
    }
    function resolveStream(response, id, stream, controller) {
        var chunks = response._chunks;
        stream = new Chunk("fulfilled", stream, controller, response);
        chunks.set(id, stream);
        response = response._formData.getAll(response._prefix + id);
        for(id = 0; id < response.length; id++)chunks = response[id], "C" === chunks[0] ? controller.close("C" === chunks ? '"$undefined"' : chunks.slice(1)) : controller.enqueueModel(chunks);
    }
    function parseReadableStream(response, reference, type) {
        reference = parseInt(reference.slice(2), 16);
        var controller = null;
        type = new ReadableStream({
            type: type,
            start: function(c) {
                controller = c;
            }
        });
        var previousBlockedChunk = null;
        resolveStream(response, reference, type, {
            enqueueModel: function(json) {
                if (null === previousBlockedChunk) {
                    var chunk = new Chunk("resolved_model", json, -1, response);
                    initializeModelChunk(chunk);
                    "fulfilled" === chunk.status ? controller.enqueue(chunk.value) : (chunk.then(function(v) {
                        return controller.enqueue(v);
                    }, function(e) {
                        return controller.error(e);
                    }), previousBlockedChunk = chunk);
                } else {
                    chunk = previousBlockedChunk;
                    var _chunk = createPendingChunk(response);
                    _chunk.then(function(v) {
                        return controller.enqueue(v);
                    }, function(e) {
                        return controller.error(e);
                    });
                    previousBlockedChunk = _chunk;
                    chunk.then(function() {
                        previousBlockedChunk === _chunk && (previousBlockedChunk = null);
                        resolveModelChunk(_chunk, json, -1);
                    });
                }
            },
            close: function() {
                if (null === previousBlockedChunk) controller.close();
                else {
                    var blockedChunk = previousBlockedChunk;
                    previousBlockedChunk = null;
                    blockedChunk.then(function() {
                        return controller.close();
                    });
                }
            },
            error: function(error) {
                if (null === previousBlockedChunk) controller.error(error);
                else {
                    var blockedChunk = previousBlockedChunk;
                    previousBlockedChunk = null;
                    blockedChunk.then(function() {
                        return controller.error(error);
                    });
                }
            }
        });
        return type;
    }
    function asyncIterator() {
        return this;
    }
    function createIterator(next) {
        next = {
            next: next
        };
        next[ASYNC_ITERATOR] = asyncIterator;
        return next;
    }
    function parseAsyncIterable(response, reference, iterator) {
        reference = parseInt(reference.slice(2), 16);
        var buffer = [], closed = !1, nextWriteIndex = 0, iterable = _defineProperty({}, ASYNC_ITERATOR, function() {
            var nextReadIndex = 0;
            return createIterator(function(arg) {
                if (void 0 !== arg) throw Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
                if (nextReadIndex === buffer.length) {
                    if (closed) return new Chunk("fulfilled", {
                        done: !0,
                        value: void 0
                    }, null, response);
                    buffer[nextReadIndex] = createPendingChunk(response);
                }
                return buffer[nextReadIndex++];
            });
        });
        iterator = iterator ? iterable[ASYNC_ITERATOR]() : iterable;
        resolveStream(response, reference, iterator, {
            enqueueModel: function(value) {
                nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, !1) : resolveIteratorResultChunk(buffer[nextWriteIndex], value, !1);
                nextWriteIndex++;
            },
            close: function(value) {
                closed = !0;
                nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, !0) : resolveIteratorResultChunk(buffer[nextWriteIndex], value, !0);
                for(nextWriteIndex++; nextWriteIndex < buffer.length;)resolveIteratorResultChunk(buffer[nextWriteIndex++], '"$undefined"', !0);
            },
            error: function(error) {
                closed = !0;
                for(nextWriteIndex === buffer.length && (buffer[nextWriteIndex] = createPendingChunk(response)); nextWriteIndex < buffer.length;)triggerErrorOnChunk(buffer[nextWriteIndex++], error);
            }
        });
        return iterator;
    }
    function parseModelString(response, obj, key, value, reference) {
        if ("$" === value[0]) {
            switch(value[1]){
                case "$":
                    return value.slice(1);
                case "@":
                    return obj = parseInt(value.slice(2), 16), getChunk(response, obj);
                case "F":
                    return value = value.slice(2), value = getOutlinedModel(response, value, obj, key, createModel), loadServerReference$1(response, value.id, value.bound, initializingChunk, obj, key);
                case "T":
                    if (void 0 === reference || void 0 === response._temporaryReferences) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
                    return createTemporaryReference(response._temporaryReferences, reference);
                case "Q":
                    return value = value.slice(2), getOutlinedModel(response, value, obj, key, createMap);
                case "W":
                    return value = value.slice(2), getOutlinedModel(response, value, obj, key, createSet);
                case "K":
                    obj = value.slice(2);
                    var formPrefix = response._prefix + obj + "_", data = new FormData();
                    response._formData.forEach(function(entry, entryKey) {
                        entryKey.startsWith(formPrefix) && data.append(entryKey.slice(formPrefix.length), entry);
                    });
                    return data;
                case "i":
                    return value = value.slice(2), getOutlinedModel(response, value, obj, key, extractIterator);
                case "I":
                    return Infinity;
                case "-":
                    return "$-0" === value ? -0 : -Infinity;
                case "N":
                    return NaN;
                case "u":
                    return;
                case "D":
                    return new Date(Date.parse(value.slice(2)));
                case "n":
                    return BigInt(value.slice(2));
            }
            switch(value[1]){
                case "A":
                    return parseTypedArray(response, value, ArrayBuffer, 1, obj, key);
                case "O":
                    return parseTypedArray(response, value, Int8Array, 1, obj, key);
                case "o":
                    return parseTypedArray(response, value, Uint8Array, 1, obj, key);
                case "U":
                    return parseTypedArray(response, value, Uint8ClampedArray, 1, obj, key);
                case "S":
                    return parseTypedArray(response, value, Int16Array, 2, obj, key);
                case "s":
                    return parseTypedArray(response, value, Uint16Array, 2, obj, key);
                case "L":
                    return parseTypedArray(response, value, Int32Array, 4, obj, key);
                case "l":
                    return parseTypedArray(response, value, Uint32Array, 4, obj, key);
                case "G":
                    return parseTypedArray(response, value, Float32Array, 4, obj, key);
                case "g":
                    return parseTypedArray(response, value, Float64Array, 8, obj, key);
                case "M":
                    return parseTypedArray(response, value, BigInt64Array, 8, obj, key);
                case "m":
                    return parseTypedArray(response, value, BigUint64Array, 8, obj, key);
                case "V":
                    return parseTypedArray(response, value, DataView, 1, obj, key);
                case "B":
                    return obj = parseInt(value.slice(2), 16), response._formData.get(response._prefix + obj);
            }
            switch(value[1]){
                case "R":
                    return parseReadableStream(response, value, void 0);
                case "r":
                    return parseReadableStream(response, value, "bytes");
                case "X":
                    return parseAsyncIterable(response, value, !1);
                case "x":
                    return parseAsyncIterable(response, value, !0);
            }
            value = value.slice(1);
            return getOutlinedModel(response, value, obj, key, createModel);
        }
        return value;
    }
    function createResponse(bundlerConfig, formFieldPrefix, temporaryReferences) {
        var backingFormData = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : new FormData(), chunks = new Map();
        return {
            _bundlerConfig: bundlerConfig,
            _prefix: formFieldPrefix,
            _formData: backingFormData,
            _chunks: chunks,
            _closed: !1,
            _closedReason: null,
            _temporaryReferences: temporaryReferences
        };
    }
    function close(response) {
        reportGlobalError(response, Error("Connection closed."));
    }
    function loadServerReference(bundlerConfig, id, bound) {
        var serverReference = resolveServerReference(bundlerConfig, id);
        bundlerConfig = preloadModule(serverReference);
        return bound ? Promise.all([
            bound,
            bundlerConfig
        ]).then(function(_ref) {
            _ref = _ref[0];
            var fn = requireModule(serverReference);
            return fn.bind.apply(fn, [
                null
            ].concat(_ref));
        }) : bundlerConfig ? Promise.resolve(bundlerConfig).then(function() {
            return requireModule(serverReference);
        }) : Promise.resolve(requireModule(serverReference));
    }
    function decodeBoundActionMetaData(body, serverManifest, formFieldPrefix) {
        body = createResponse(serverManifest, formFieldPrefix, void 0, body);
        close(body);
        body = getChunk(body, 0);
        body.then(function() {});
        if ("fulfilled" !== body.status) throw body.reason;
        return body.value;
    }
    function startReadingFromDebugChannelReadableStream(request$jscomp$0, stream) {
        function progress(_ref) {
            var done = _ref.done, buffer = _ref.value;
            _ref = stringBuffer;
            done ? (buffer = new Uint8Array(0), buffer = stringDecoder.decode(buffer)) : buffer = stringDecoder.decode(buffer, decoderOptions);
            stringBuffer = _ref + buffer;
            _ref = stringBuffer.split("\n");
            for(buffer = 0; buffer < _ref.length - 1; buffer++){
                var request = request$jscomp$0, message = _ref[buffer], deferredDebugObjects = request.deferredDebugObjects;
                if (null === deferredDebugObjects) throw Error("resolveDebugMessage/closeDebugChannel should not be called for a Request that wasn't kept alive. This is a bug in React.");
                if ("" === message) closeDebugChannel(request);
                else {
                    var command = message.charCodeAt(0);
                    message = message.slice(2).split(",").map(fromHex);
                    switch(command){
                        case 82:
                            for(command = 0; command < message.length; command++){
                                var id = message[command], retainedValue = deferredDebugObjects.retained.get(id);
                                void 0 !== retainedValue && (request.pendingDebugChunks--, deferredDebugObjects.retained.delete(id), deferredDebugObjects.existing.delete(retainedValue), enqueueFlush(request));
                            }
                            break;
                        case 81:
                            for(command = 0; command < message.length; command++)id = message[command], retainedValue = deferredDebugObjects.retained.get(id), void 0 !== retainedValue && (deferredDebugObjects.retained.delete(id), deferredDebugObjects.existing.delete(retainedValue), emitOutlinedDebugModelChunk(request, id, {
                                objectLimit: 10
                            }, retainedValue), enqueueFlush(request));
                            break;
                        case 80:
                            for(command = 0; command < message.length; command++)id = message[command], retainedValue = deferredDebugObjects.retained.get(id), void 0 !== retainedValue && (deferredDebugObjects.retained.delete(id), emitRequestedDebugThenable(request, id, {
                                objectLimit: 10
                            }, retainedValue));
                            break;
                        default:
                            throw Error("Unknown command. The debugChannel was not wired up properly.");
                    }
                }
            }
            stringBuffer = _ref[_ref.length - 1];
            if (done) closeDebugChannel(request$jscomp$0);
            else return reader.read().then(progress).catch(error);
        }
        function error(e) {
            abort(request$jscomp$0, Error("Lost connection to the Debug Channel.", {
                cause: e
            }));
        }
        var reader = stream.getReader(), stringDecoder = new TextDecoder(), stringBuffer = "";
        reader.read().then(progress).catch(error);
    }
    var ReactDOM = __turbopack_context__.r("[project]/FRONTEND/interent/node_modules/next/dist/compiled/react-dom/react-dom.react-server.js [app-edge-route] (ecmascript)"), React = __turbopack_context__.r("[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/react.react-server.js [app-edge-route] (ecmascript)"), REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
    Symbol.for("react.postpone");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator, ASYNC_ITERATOR = Symbol.asyncIterator, LocalPromise = Promise, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : function(callback) {
        LocalPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
    }, currentView = null, writtenBytes = 0, textEncoder = new TextEncoder(), CLIENT_REFERENCE_TAG$1 = Symbol.for("react.client.reference"), SERVER_REFERENCE_TAG = Symbol.for("react.server.reference"), FunctionBind = Function.prototype.bind, ArraySlice = Array.prototype.slice, PROMISE_PROTOTYPE = Promise.prototype, deepProxyHandlers = {
        get: function(target, name) {
            switch(name){
                case "$$typeof":
                    return target.$$typeof;
                case "$$id":
                    return target.$$id;
                case "$$async":
                    return target.$$async;
                case "name":
                    return target.name;
                case "displayName":
                    return;
                case "defaultProps":
                    return;
                case "_debugInfo":
                    return;
                case "toJSON":
                    return;
                case Symbol.toPrimitive:
                    return Object.prototype[Symbol.toPrimitive];
                case Symbol.toStringTag:
                    return Object.prototype[Symbol.toStringTag];
                case "Provider":
                    throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
                case "then":
                    throw Error("Cannot await or return from a thenable. You cannot await a client module from a server component.");
            }
            throw Error("Cannot access " + (String(target.name) + "." + String(name)) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.");
        },
        set: function() {
            throw Error("Cannot assign to a client module from a server module.");
        }
    }, proxyHandlers$1 = {
        get: function(target, name) {
            return getReference(target, name);
        },
        getOwnPropertyDescriptor: function(target, name) {
            var descriptor = Object.getOwnPropertyDescriptor(target, name);
            descriptor || (descriptor = {
                value: getReference(target, name),
                writable: !1,
                configurable: !1,
                enumerable: !1
            }, Object.defineProperty(target, name, descriptor));
            return descriptor;
        },
        getPrototypeOf: function() {
            return PROMISE_PROTOTYPE;
        },
        set: function() {
            throw Error("Cannot assign to a client module from a server module.");
        }
    }, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, previousDispatcher = ReactDOMSharedInternals.d;
    ReactDOMSharedInternals.d = {
        f: previousDispatcher.f,
        r: previousDispatcher.r,
        D: function(href) {
            if ("string" === typeof href && href) {
                var request = resolveRequest();
                if (request) {
                    var hints = request.hints, key = "D|" + href;
                    hints.has(key) || (hints.add(key), emitHint(request, "D", href));
                } else previousDispatcher.D(href);
            }
        },
        C: function(href, crossOrigin) {
            if ("string" === typeof href) {
                var request = resolveRequest();
                if (request) {
                    var hints = request.hints, key = "C|" + (null == crossOrigin ? "null" : crossOrigin) + "|" + href;
                    hints.has(key) || (hints.add(key), "string" === typeof crossOrigin ? emitHint(request, "C", [
                        href,
                        crossOrigin
                    ]) : emitHint(request, "C", href));
                } else previousDispatcher.C(href, crossOrigin);
            }
        },
        L: function(href, as, options) {
            if ("string" === typeof href) {
                var request = resolveRequest();
                if (request) {
                    var hints = request.hints, key = "L";
                    if ("image" === as && options) {
                        var imageSrcSet = options.imageSrcSet, imageSizes = options.imageSizes, uniquePart = "";
                        "string" === typeof imageSrcSet && "" !== imageSrcSet ? (uniquePart += "[" + imageSrcSet + "]", "string" === typeof imageSizes && (uniquePart += "[" + imageSizes + "]")) : uniquePart += "[][]" + href;
                        key += "[image]" + uniquePart;
                    } else key += "[" + as + "]" + href;
                    hints.has(key) || (hints.add(key), (options = trimOptions(options)) ? emitHint(request, "L", [
                        href,
                        as,
                        options
                    ]) : emitHint(request, "L", [
                        href,
                        as
                    ]));
                } else previousDispatcher.L(href, as, options);
            }
        },
        m: function(href, options) {
            if ("string" === typeof href) {
                var request = resolveRequest();
                if (request) {
                    var hints = request.hints, key = "m|" + href;
                    if (hints.has(key)) return;
                    hints.add(key);
                    return (options = trimOptions(options)) ? emitHint(request, "m", [
                        href,
                        options
                    ]) : emitHint(request, "m", href);
                }
                previousDispatcher.m(href, options);
            }
        },
        X: function(src, options) {
            if ("string" === typeof src) {
                var request = resolveRequest();
                if (request) {
                    var hints = request.hints, key = "X|" + src;
                    if (hints.has(key)) return;
                    hints.add(key);
                    return (options = trimOptions(options)) ? emitHint(request, "X", [
                        src,
                        options
                    ]) : emitHint(request, "X", src);
                }
                previousDispatcher.X(src, options);
            }
        },
        S: function(href, precedence, options) {
            if ("string" === typeof href) {
                var request = resolveRequest();
                if (request) {
                    var hints = request.hints, key = "S|" + href;
                    if (hints.has(key)) return;
                    hints.add(key);
                    return (options = trimOptions(options)) ? emitHint(request, "S", [
                        href,
                        "string" === typeof precedence ? precedence : 0,
                        options
                    ]) : "string" === typeof precedence ? emitHint(request, "S", [
                        href,
                        precedence
                    ]) : emitHint(request, "S", href);
                }
                previousDispatcher.S(href, precedence, options);
            }
        },
        M: function(src, options) {
            if ("string" === typeof src) {
                var request = resolveRequest();
                if (request) {
                    var hints = request.hints, key = "M|" + src;
                    if (hints.has(key)) return;
                    hints.add(key);
                    return (options = trimOptions(options)) ? emitHint(request, "M", [
                        src,
                        options
                    ]) : emitHint(request, "M", src);
                }
                previousDispatcher.M(src, options);
            }
        }
    };
    var framesToSkip = 0, collectedStackTrace = null, identifierRegExp = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/, frameRegExp = /^ {3} at (?:(.+) \((?:(.+):(\d+):(\d+)|<anonymous>)\)|(?:async )?(.+):(\d+):(\d+)|<anonymous>)$/, stackTraceCache = new WeakMap(), supportsRequestStorage = "function" === typeof AsyncLocalStorage, requestStorage = supportsRequestStorage ? new AsyncLocalStorage() : null, supportsComponentStorage = supportsRequestStorage, componentStorage = supportsComponentStorage ? new AsyncLocalStorage() : null, TEMPORARY_REFERENCE_TAG = Symbol.for("react.temporary.reference"), proxyHandlers = {
        get: function(target, name) {
            switch(name){
                case "$$typeof":
                    return target.$$typeof;
                case "name":
                    return;
                case "displayName":
                    return;
                case "defaultProps":
                    return;
                case "_debugInfo":
                    return;
                case "toJSON":
                    return;
                case Symbol.toPrimitive:
                    return Object.prototype[Symbol.toPrimitive];
                case Symbol.toStringTag:
                    return Object.prototype[Symbol.toStringTag];
                case "Provider":
                    throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
                case "then":
                    return;
            }
            throw Error("Cannot access " + String(name) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client.");
        },
        set: function() {
            throw Error("Cannot assign to a temporary client reference from a server module.");
        }
    }, SuspenseException = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), suspendedThenable = null, currentRequest$1 = null, thenableIndexCounter = 0, thenableState = null, currentComponentDebugInfo = null, HooksDispatcher = {
        readContext: unsupportedContext,
        use: function(usable) {
            if (null !== usable && "object" === typeof usable || "function" === typeof usable) {
                if ("function" === typeof usable.then) {
                    var index = thenableIndexCounter;
                    thenableIndexCounter += 1;
                    null === thenableState && (thenableState = []);
                    return trackUsedThenable(thenableState, usable, index);
                }
                usable.$$typeof === REACT_CONTEXT_TYPE && unsupportedContext();
            }
            if (isClientReference(usable)) {
                if (null != usable.value && usable.value.$$typeof === REACT_CONTEXT_TYPE) throw Error("Cannot read a Client Context from a Server Component.");
                throw Error("Cannot use() an already resolved Client Reference.");
            }
            throw Error("An unsupported type was passed to use(): " + String(usable));
        },
        useCallback: function(callback) {
            return callback;
        },
        useContext: unsupportedContext,
        useEffect: unsupportedHook,
        useImperativeHandle: unsupportedHook,
        useLayoutEffect: unsupportedHook,
        useInsertionEffect: unsupportedHook,
        useMemo: function(nextCreate) {
            return nextCreate();
        },
        useReducer: unsupportedHook,
        useRef: unsupportedHook,
        useState: unsupportedHook,
        useDebugValue: function() {},
        useDeferredValue: unsupportedHook,
        useTransition: unsupportedHook,
        useSyncExternalStore: unsupportedHook,
        useId: function() {
            if (null === currentRequest$1) throw Error("useId can only be used while React is rendering");
            var id = currentRequest$1.identifierCount++;
            return "_" + currentRequest$1.identifierPrefix + "S_" + id.toString(32) + "_";
        },
        useHostTransitionStatus: unsupportedHook,
        useFormState: unsupportedHook,
        useActionState: unsupportedHook,
        useOptimistic: unsupportedHook,
        useMemoCache: function(size) {
            for(var data = Array(size), i = 0; i < size; i++)data[i] = REACT_MEMO_CACHE_SENTINEL;
            return data;
        },
        useCacheRefresh: function() {
            return unsupportedRefresh;
        }
    }, currentOwner = null, DefaultAsyncDispatcher = {
        getCacheForType: function(resourceType) {
            var cache = (cache = resolveRequest()) ? cache.cache : new Map();
            var entry = cache.get(resourceType);
            void 0 === entry && (entry = resourceType(), cache.set(resourceType, entry));
            return entry;
        },
        cacheSignal: function() {
            var request = resolveRequest();
            return request ? request.cacheController.signal : null;
        }
    };
    DefaultAsyncDispatcher.getOwner = resolveOwner;
    var ReactSharedInternalsServer = React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    if (!ReactSharedInternalsServer) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
    var prefix, suffix;
    new ("function" === typeof WeakMap ? WeakMap : Map)();
    var lastResetTime = 0;
    if ("object" === typeof performance && "function" === typeof performance.now) {
        var localPerformance = performance;
        var getCurrentTime = function() {
            return localPerformance.now();
        };
    } else {
        var localDate = Date;
        getCurrentTime = function() {
            return localDate.now();
        };
    }
    var callComponent = {
        react_stack_bottom_frame: function(Component, props, componentDebugInfo) {
            currentOwner = componentDebugInfo;
            try {
                return Component(props, void 0);
            } finally{
                currentOwner = null;
            }
        }
    }, callComponentInDEV = callComponent.react_stack_bottom_frame.bind(callComponent), callLazyInit = {
        react_stack_bottom_frame: function(lazy) {
            var init = lazy._init;
            return init(lazy._payload);
        }
    }, callLazyInitInDEV = callLazyInit.react_stack_bottom_frame.bind(callLazyInit), callIterator = {
        react_stack_bottom_frame: function(iterator, progress, error) {
            iterator.next().then(progress, error);
        }
    }, callIteratorInDEV = callIterator.react_stack_bottom_frame.bind(callIterator), isArrayImpl = Array.isArray, getPrototypeOf = Object.getPrototypeOf, jsxPropsParents = new WeakMap(), jsxChildrenParents = new WeakMap(), CLIENT_REFERENCE_TAG = Symbol.for("react.client.reference"), hasOwnProperty = Object.prototype.hasOwnProperty, doNotLimit = new WeakSet();
    "object" === typeof console && null !== console && (patchConsole(console, "assert"), patchConsole(console, "debug"), patchConsole(console, "dir"), patchConsole(console, "dirxml"), patchConsole(console, "error"), patchConsole(console, "group"), patchConsole(console, "groupCollapsed"), patchConsole(console, "groupEnd"), patchConsole(console, "info"), patchConsole(console, "log"), patchConsole(console, "table"), patchConsole(console, "trace"), patchConsole(console, "warn"));
    var ObjectPrototype = Object.prototype, stringify = JSON.stringify, ABORTING = 12, CLOSED = 14, defaultPostponeHandler = noop, currentRequest = null, canEmitDebugInfo = !1, serializedSize = 0, MAX_ROW_SIZE = 3200, modelRoot = !1, CONSTRUCTOR_MARKER = Symbol(), debugModelRoot = null, debugNoOutline = null, emptyRoot = {}, decoderOptions = {
        stream: !0
    }, instrumentedChunks = new WeakSet(), loadedChunks = new WeakSet();
    Chunk.prototype = Object.create(Promise.prototype);
    Chunk.prototype.then = function(resolve, reject) {
        switch(this.status){
            case "resolved_model":
                initializeModelChunk(this);
        }
        switch(this.status){
            case "fulfilled":
                resolve(this.value);
                break;
            case "pending":
            case "blocked":
            case "cyclic":
                resolve && (null === this.value && (this.value = []), this.value.push(resolve));
                reject && (null === this.reason && (this.reason = []), this.reason.push(reject));
                break;
            default:
                reject(this.reason);
        }
    };
    var initializingChunk = null, initializingChunkBlockedModel = null;
    exports.createClientModuleProxy = function(moduleId) {
        moduleId = registerClientReferenceImpl({}, moduleId, !1);
        return new Proxy(moduleId, proxyHandlers$1);
    };
    exports.createTemporaryReferenceSet = function() {
        return new WeakMap();
    };
    exports.decodeAction = function(body, serverManifest) {
        var formData = new FormData(), action = null;
        body.forEach(function(value, key) {
            key.startsWith("$ACTION_") ? key.startsWith("$ACTION_REF_") ? (value = "$ACTION_" + key.slice(12) + ":", value = decodeBoundActionMetaData(body, serverManifest, value), action = loadServerReference(serverManifest, value.id, value.bound)) : key.startsWith("$ACTION_ID_") && (value = key.slice(11), action = loadServerReference(serverManifest, value, null)) : formData.append(key, value);
        });
        return null === action ? null : action.then(function(fn) {
            return fn.bind(null, formData);
        });
    };
    exports.decodeFormState = function(actionResult, body, serverManifest) {
        var keyPath = body.get("$ACTION_KEY");
        if ("string" !== typeof keyPath) return Promise.resolve(null);
        var metaData = null;
        body.forEach(function(value, key) {
            key.startsWith("$ACTION_REF_") && (value = "$ACTION_" + key.slice(12) + ":", metaData = decodeBoundActionMetaData(body, serverManifest, value));
        });
        if (null === metaData) return Promise.resolve(null);
        var referenceId = metaData.id;
        return Promise.resolve(metaData.bound).then(function(bound) {
            return null === bound ? null : [
                actionResult,
                keyPath,
                referenceId,
                bound.length - 1
            ];
        });
    };
    exports.decodeReply = function(body, turbopackMap, options) {
        if ("string" === typeof body) {
            var form = new FormData();
            form.append("0", body);
            body = form;
        }
        body = createResponse(turbopackMap, "", options ? options.temporaryReferences : void 0, body);
        turbopackMap = getChunk(body, 0);
        close(body);
        return turbopackMap;
    };
    exports.decodeReplyFromAsyncIterable = function(iterable, turbopackMap, options) {
        function progress(entry) {
            if (entry.done) close(response$jscomp$0);
            else {
                entry = entry.value;
                var name = entry[0];
                entry = entry[1];
                if ("string" === typeof entry) {
                    var response = response$jscomp$0;
                    response._formData.append(name, entry);
                    var prefix = response._prefix;
                    name.startsWith(prefix) && (response = response._chunks, name = +name.slice(prefix.length), (prefix = response.get(name)) && resolveModelChunk(prefix, entry, name));
                } else response$jscomp$0._formData.append(name, entry);
                iterator.next().then(progress, error);
            }
        }
        function error(reason) {
            reportGlobalError(response$jscomp$0, reason);
            "function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
        }
        var iterator = iterable[ASYNC_ITERATOR](), response$jscomp$0 = createResponse(turbopackMap, "", options ? options.temporaryReferences : void 0);
        iterator.next().then(progress, error);
        return getChunk(response$jscomp$0, 0);
    };
    exports.registerClientReference = function(proxyImplementation, id, exportName) {
        return registerClientReferenceImpl(proxyImplementation, id + "#" + exportName, !1);
    };
    exports.registerServerReference = function(reference, id, exportName) {
        return Object.defineProperties(reference, {
            $$typeof: {
                value: SERVER_REFERENCE_TAG
            },
            $$id: {
                value: null === exportName ? id : id + "#" + exportName,
                configurable: !0
            },
            $$bound: {
                value: null,
                configurable: !0
            },
            $$location: {
                value: Error("react-stack-top-frame"),
                configurable: !0
            },
            bind: {
                value: bind,
                configurable: !0
            }
        });
    };
    exports.renderToReadableStream = function(model, turbopackMap, options) {
        var debugChannelReadable = options && options.debugChannel ? options.debugChannel.readable : void 0, debugChannelWritable = options && options.debugChannel ? options.debugChannel.writable : void 0, request = createRequest(model, turbopackMap, options ? options.onError : void 0, options ? options.identifierPrefix : void 0, options ? options.onPostpone : void 0, options ? options.temporaryReferences : void 0, options ? options.environmentName : void 0, options ? options.filterStackFrame : void 0, void 0 !== debugChannelReadable);
        if (options && options.signal) {
            var signal = options.signal;
            if (signal.aborted) abort(request, signal.reason);
            else {
                var listener = function() {
                    abort(request, signal.reason);
                    signal.removeEventListener("abort", listener);
                };
                signal.addEventListener("abort", listener);
            }
        }
        void 0 !== debugChannelWritable && new ReadableStream({
            type: "bytes",
            pull: function(controller) {
                if (13 === request.status) request.status = CLOSED, closeWithError(controller, request.fatalError);
                else if (request.status !== CLOSED && null === request.debugDestination) {
                    request.debugDestination = controller;
                    try {
                        flushCompletedChunks(request);
                    } catch (error) {
                        logRecoverableError(request, error, null), fatalError(request, error);
                    }
                }
            }
        }, {
            highWaterMark: 0
        }).pipeTo(debugChannelWritable);
        void 0 !== debugChannelReadable && startReadingFromDebugChannelReadableStream(request, debugChannelReadable);
        return new ReadableStream({
            type: "bytes",
            start: function() {
                startWork(request);
            },
            pull: function(controller) {
                startFlowing(request, controller);
            },
            cancel: function(reason) {
                request.destination = null;
                abort(request, reason);
            }
        }, {
            highWaterMark: 0
        });
    };
    exports.unstable_prerender = function(model, turbopackMap, options) {
        return new Promise(function(resolve, reject) {
            var request = createPrerenderRequest(model, turbopackMap, function() {
                var stream = new ReadableStream({
                    type: "bytes",
                    pull: function(controller) {
                        startFlowing(request, controller);
                    },
                    cancel: function(reason) {
                        request.destination = null;
                        abort(request, reason);
                    }
                }, {
                    highWaterMark: 0
                });
                resolve({
                    prelude: stream
                });
            }, reject, options ? options.onError : void 0, options ? options.identifierPrefix : void 0, options ? options.onPostpone : void 0, options ? options.temporaryReferences : void 0, options ? options.environmentName : void 0, options ? options.filterStackFrame : void 0, !1);
            if (options && options.signal) {
                var signal = options.signal;
                if (signal.aborted) abort(request, signal.reason);
                else {
                    var listener = function() {
                        abort(request, signal.reason);
                        signal.removeEventListener("abort", listener);
                    };
                    signal.addEventListener("abort", listener);
                }
            }
            startWork(request);
        });
    };
}();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var s;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    s = __turbopack_context__.r("[project]/FRONTEND/interent/node_modules/next/dist/compiled/react-server-dom-turbopack/cjs/react-server-dom-turbopack-server.edge.development.js [app-edge-route] (ecmascript)");
}
exports.renderToReadableStream = s.renderToReadableStream;
exports.decodeReply = s.decodeReply;
exports.decodeReplyFromAsyncIterable = s.decodeReplyFromAsyncIterable;
exports.decodeAction = s.decodeAction;
exports.decodeFormState = s.decodeFormState;
exports.registerServerReference = s.registerServerReference;
exports.registerClientReference = s.registerClientReference;
exports.createClientModuleProxy = s.createClientModuleProxy;
exports.createTemporaryReferenceSet = s.createTemporaryReferenceSet;
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    var i = {
        226: function(i, e) {
            (function(o, a) {
                "use strict";
                var r = "1.0.35", t = "", n = "?", s = "function", b = "undefined", w = "object", l = "string", d = "major", c = "model", u = "name", p = "type", m = "vendor", f = "version", h = "architecture", v = "console", g = "mobile", k = "tablet", x = "smarttv", _ = "wearable", y = "embedded", q = 350;
                var T = "Amazon", S = "Apple", z = "ASUS", N = "BlackBerry", A = "Browser", C = "Chrome", E = "Edge", O = "Firefox", U = "Google", j = "Huawei", P = "LG", R = "Microsoft", M = "Motorola", B = "Opera", V = "Samsung", D = "Sharp", I = "Sony", W = "Viera", F = "Xiaomi", G = "Zebra", H = "Facebook", L = "Chromium OS", Z = "Mac OS";
                var extend = function(i, e) {
                    var o = {};
                    for(var a in i){
                        if (e[a] && e[a].length % 2 === 0) {
                            o[a] = e[a].concat(i[a]);
                        } else {
                            o[a] = i[a];
                        }
                    }
                    return o;
                }, enumerize = function(i) {
                    var e = {};
                    for(var o = 0; o < i.length; o++){
                        e[i[o].toUpperCase()] = i[o];
                    }
                    return e;
                }, has = function(i, e) {
                    return typeof i === l ? lowerize(e).indexOf(lowerize(i)) !== -1 : false;
                }, lowerize = function(i) {
                    return i.toLowerCase();
                }, majorize = function(i) {
                    return typeof i === l ? i.replace(/[^\d\.]/g, t).split(".")[0] : a;
                }, trim = function(i, e) {
                    if (typeof i === l) {
                        i = i.replace(/^\s\s*/, t);
                        return typeof e === b ? i : i.substring(0, q);
                    }
                };
                var rgxMapper = function(i, e) {
                    var o = 0, r, t, n, b, l, d;
                    while(o < e.length && !l){
                        var c = e[o], u = e[o + 1];
                        r = t = 0;
                        while(r < c.length && !l){
                            if (!c[r]) {
                                break;
                            }
                            l = c[r++].exec(i);
                            if (!!l) {
                                for(n = 0; n < u.length; n++){
                                    d = l[++t];
                                    b = u[n];
                                    if (typeof b === w && b.length > 0) {
                                        if (b.length === 2) {
                                            if (typeof b[1] == s) {
                                                this[b[0]] = b[1].call(this, d);
                                            } else {
                                                this[b[0]] = b[1];
                                            }
                                        } else if (b.length === 3) {
                                            if (typeof b[1] === s && !(b[1].exec && b[1].test)) {
                                                this[b[0]] = d ? b[1].call(this, d, b[2]) : a;
                                            } else {
                                                this[b[0]] = d ? d.replace(b[1], b[2]) : a;
                                            }
                                        } else if (b.length === 4) {
                                            this[b[0]] = d ? b[3].call(this, d.replace(b[1], b[2])) : a;
                                        }
                                    } else {
                                        this[b] = d ? d : a;
                                    }
                                }
                            }
                        }
                        o += 2;
                    }
                }, strMapper = function(i, e) {
                    for(var o in e){
                        if (typeof e[o] === w && e[o].length > 0) {
                            for(var r = 0; r < e[o].length; r++){
                                if (has(e[o][r], i)) {
                                    return o === n ? a : o;
                                }
                            }
                        } else if (has(e[o], i)) {
                            return o === n ? a : o;
                        }
                    }
                    return i;
                };
                var $ = {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }, X = {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: [
                        "NT 5.1",
                        "NT 5.2"
                    ],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: [
                        "NT 6.4",
                        "NT 10.0"
                    ],
                    RT: "ARM"
                };
                var K = {
                    browser: [
                        [
                            /\b(?:crmo|crios)\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Chrome"
                            ]
                        ],
                        [
                            /edg(?:e|ios|a)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Edge"
                            ]
                        ],
                        [
                            /(opera mini)\/([-\w\.]+)/i,
                            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /opios[\/ ]+([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Mini"
                            ]
                        ],
                        [
                            /\bopr\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B
                            ]
                        ],
                        [
                            /(kindle)\/([\w\.]+)/i,
                            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                            /(?:ms|\()(ie) ([\w\.]+)/i,
                            /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                            /(heytap|ovi)browser\/([\d\.]+)/i,
                            /(weibo)__([\d\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "UC" + A
                            ]
                        ],
                        [
                            /microm.+\bqbcore\/([\w\.]+)/i,
                            /\bqbcore\/([\w\.]+).+microm/i
                        ],
                        [
                            f,
                            [
                                u,
                                "WeChat(Win) Desktop"
                            ]
                        ],
                        [
                            /micromessenger\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "WeChat"
                            ]
                        ],
                        [
                            /konqueror\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Konqueror"
                            ]
                        ],
                        [
                            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
                        ],
                        [
                            f,
                            [
                                u,
                                "IE"
                            ]
                        ],
                        [
                            /ya(?:search)?browser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Yandex"
                            ]
                        ],
                        [
                            /(avast|avg)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /(.+)/,
                                "$1 Secure " + A
                            ],
                            f
                        ],
                        [
                            /\bfocus\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " Focus"
                            ]
                        ],
                        [
                            /\bopt\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Touch"
                            ]
                        ],
                        [
                            /coc_coc\w+\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Coc Coc"
                            ]
                        ],
                        [
                            /dolfin\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Dolphin"
                            ]
                        ],
                        [
                            /coast\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Coast"
                            ]
                        ],
                        [
                            /miuibrowser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "MIUI " + A
                            ]
                        ],
                        [
                            /fxios\/([-\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O
                            ]
                        ],
                        [
                            /\bqihu|(qi?ho?o?|360)browser/i
                        ],
                        [
                            [
                                u,
                                "360 " + A
                            ]
                        ],
                        [
                            /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /(.+)/,
                                "$1 " + A
                            ],
                            f
                        ],
                        [
                            /(comodo_dragon)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            f
                        ],
                        [
                            /(electron)\/([\w\.]+) safari/i,
                            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(metasr)[\/ ]?([\w\.]+)/i,
                            /(lbbrowser)/i,
                            /\[(linkedin)app\]/i
                        ],
                        [
                            u
                        ],
                        [
                            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
                        ],
                        [
                            [
                                u,
                                H
                            ],
                            f
                        ],
                        [
                            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                            /safari (line)\/([\w\.]+)/i,
                            /\b(line)\/([\w\.]+)\/iab/i,
                            /(chromium|instagram)[\/ ]([-\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /\bgsa\/([\w\.]+) .*safari\//i
                        ],
                        [
                            f,
                            [
                                u,
                                "GSA"
                            ]
                        ],
                        [
                            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "TikTok"
                            ]
                        ],
                        [
                            /headlesschrome(?:\/([\w\.]+)| )/i
                        ],
                        [
                            f,
                            [
                                u,
                                C + " Headless"
                            ]
                        ],
                        [
                            / wv\).+(chrome)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                C + " WebView"
                            ],
                            f
                        ],
                        [
                            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Android " + A
                            ]
                        ],
                        [
                            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Mobile Safari"
                            ]
                        ],
                        [
                            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
                        ],
                        [
                            f,
                            u
                        ],
                        [
                            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
                        ],
                        [
                            u,
                            [
                                f,
                                strMapper,
                                $
                            ]
                        ],
                        [
                            /(webkit|khtml)\/([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(navigator|netscape\d?)\/([-\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                "Netscape"
                            ],
                            f
                        ],
                        [
                            /mobile vr; rv:([\w\.]+)\).+firefox/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " Reality"
                            ]
                        ],
                        [
                            /ekiohf.+(flow)\/([\w\.]+)/i,
                            /(swiftfox)/i,
                            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                            /(firefox)\/([\w\.]+)/i,
                            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                            /(links) \(([\w\.]+)/i,
                            /panasonic;(viera)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(cobalt)\/([\w\.]+)/i
                        ],
                        [
                            u,
                            [
                                f,
                                /master.|lts./,
                                ""
                            ]
                        ]
                    ],
                    cpu: [
                        [
                            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "amd64"
                            ]
                        ],
                        [
                            /(ia32(?=;))/i
                        ],
                        [
                            [
                                h,
                                lowerize
                            ]
                        ],
                        [
                            /((?:i[346]|x)86)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "ia32"
                            ]
                        ],
                        [
                            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
                        ],
                        [
                            [
                                h,
                                "arm64"
                            ]
                        ],
                        [
                            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
                        ],
                        [
                            [
                                h,
                                "armhf"
                            ]
                        ],
                        [
                            /windows (ce|mobile); ppc;/i
                        ],
                        [
                            [
                                h,
                                "arm"
                            ]
                        ],
                        [
                            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
                        ],
                        [
                            [
                                h,
                                /ower/,
                                t,
                                lowerize
                            ]
                        ],
                        [
                            /(sun4\w)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "sparc"
                            ]
                        ],
                        [
                            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                        ],
                        [
                            [
                                h,
                                lowerize
                            ]
                        ]
                    ],
                    device: [
                        [
                            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
                        ],
                        [
                            c,
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                            /samsung[- ]([-\w]+)/i,
                            /sec-(sgh\w+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\((ipad);[-\w\),; ]+apple/i,
                            /applecoremedia\/[\w\.]+ \((ipad)/i,
                            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(macintosh);/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ]
                        ],
                        [
                            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                D
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
                        ],
                        [
                            c,
                            [
                                m,
                                j
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(?:huawei|honor)([-\w ]+)[;\)]/i,
                            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
                        ],
                        [
                            c,
                            [
                                m,
                                j
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(poco[\w ]+)(?: bui|\))/i,
                            /\b; (\w+) build\/hm\1/i,
                            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /; (\w+) bui.+ oppo/i,
                            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "OPPO"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /vivo (\w+)(?: bui|\))/i,
                            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Vivo"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(rmx[12]\d{3})(?: bui|;|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Realme"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                            /\bmot(?:orola)?[- ](\w*)/i,
                            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
                        ],
                        [
                            c,
                            [
                                m,
                                M
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
                        ],
                        [
                            c,
                            [
                                m,
                                M
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
                        ],
                        [
                            c,
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                            /\blg-?([\d\w]+) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(ideatab[-\w ]+)/i,
                            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Lenovo"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(?:maemo|nokia).*(n900|lumia \d+)/i,
                            /nokia[-_ ]?([-\w\.]*)/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                "Nokia"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(pixel c)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /sony tablet [ps]/i,
                            /\b(?:sony)?sgp\w+(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                "Xperia Tablet"
                            ],
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            / (kb2005|in20[12]5|be20[12][59])\b/i,
                            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "OnePlus"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(alexa)webm/i,
                            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                            /(kf[a-z]+)( bui|\)).+silk\//i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
                        ],
                        [
                            [
                                c,
                                /(.+)/g,
                                "Fire Phone $1"
                            ],
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(playbook);[-\w\),; ]+(rim)/i
                        ],
                        [
                            c,
                            m,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((?:bb[a-f]|st[hv])100-\d)/i,
                            /\(bb10; (\w+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                N
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
                        ],
                        [
                            c,
                            [
                                m,
                                z
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                z
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(nexus 9)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "HTC"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
                        ],
                        [
                            m,
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Acer"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (m[1-5] note) bui/i,
                            /\bmz-([-\w]{2,})/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Meizu"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                            /(hp) ([\w ]+\w)/i,
                            /(asus)-?(\w+)/i,
                            /(microsoft); (lumia[\w ]+)/i,
                            /(lenovo)[-_ ]?([-\w]+)/i,
                            /(jolla)/i,
                            /(oppo) ?([\w ]+) bui/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(kobo)\s(ereader|touch)/i,
                            /(archos) (gamepad2?)/i,
                            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                            /(kindle)\/([\w\.]+)/i,
                            /(nook)[\w ]+build\/(\w+)/i,
                            /(dell) (strea[kpr\d ]*[\dko])/i,
                            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                            /(trinity)[- ]*(t\d{3}) bui/i,
                            /(gigaset)[- ]+(q\w{1,9}) bui/i,
                            /(vodafone) ([\w ]+)(?:\)| bui)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(surface duo)/i
                        ],
                        [
                            c,
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid [\d\.]+; (fp\du?)(?: b|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Fairphone"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(u304aa)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "AT&T"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\bsie-(\w*)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Siemens"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(rct\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "RCA"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(venue[\d ]{2,7}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Dell"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(q(?:mv|ta)\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Verizon"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Barnes & Noble"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(tm\d{3}\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "NuVision"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(k88) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "ZTE"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(nx\d{3}j) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "ZTE"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(gen\d{3}) b.+49h/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Swiss"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(zur\d{3}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Swiss"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((zeki)?tb.*\b) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Zeki"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b([yr]\d{2}) b/i,
                            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
                        ],
                        [
                            [
                                m,
                                "Dragon Touch"
                            ],
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(ns-?\w{0,9}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Insignia"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((nxa|next)-?\w{0,9}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "NextBook"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
                        ],
                        [
                            [
                                m,
                                "Voice"
                            ],
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(lvtel\-)?(v1[12]) b/i
                        ],
                        [
                            [
                                m,
                                "LvTel"
                            ],
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(ph-1) /i
                        ],
                        [
                            c,
                            [
                                m,
                                "Essential"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(v(100md|700na|7011|917g).*\b) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Envizen"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(trio[-\w\. ]+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "MachSpeed"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\btu_(1491) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Rotor"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(shield[\w ]+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Nvidia"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(sprint) (\w+)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(kin\.[onetw]{3})/i
                        ],
                        [
                            [
                                c,
                                /\./g,
                                " "
                            ],
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /smart-tv.+(samsung)/i
                        ],
                        [
                            m,
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /hbbtv.+maple;(\d+)/i
                        ],
                        [
                            [
                                c,
                                /^/,
                                "SmartTV"
                            ],
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
                        ],
                        [
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(apple) ?tv/i
                        ],
                        [
                            m,
                            [
                                c,
                                S + " TV"
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /crkey/i
                        ],
                        [
                            [
                                c,
                                C + "cast"
                            ],
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /droid.+aft(\w)( bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\(dtv[\);].+(aquos)/i,
                            /(aquos-tv[\w ]+)\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                D
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(bravia[\w ]+)( bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(mitv-\w{5}) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /Hbbtv.*(technisat) (.*);/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
                        ],
                        [
                            [
                                m,
                                trim
                            ],
                            [
                                c,
                                trim
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
                        ],
                        [
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(ouya)/i,
                            /(nintendo) ([wids3utch]+)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /droid.+; (shield) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Nvidia"
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /(playstation [345portablevi]+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
                        ],
                        [
                            c,
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /((pebble))app/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /droid.+; (glass) \d/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /droid.+; (wt63?0{2,3})\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(quest( 2| pro)?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                H
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
                        ],
                        [
                            m,
                            [
                                p,
                                y
                            ]
                        ],
                        [
                            /(aeobc)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                y
                            ]
                        ],
                        [
                            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
                        ],
                        [
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
                        ],
                        [
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
                        ],
                        [
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
                        ],
                        [
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(android[-\w\. ]{0,9});.+buil/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Generic"
                            ]
                        ]
                    ],
                    engine: [
                        [
                            /windows.+ edge\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                E + "HTML"
                            ]
                        ],
                        [
                            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Blink"
                            ]
                        ],
                        [
                            /(presto)\/([\w\.]+)/i,
                            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                            /ekioh(flow)\/([\w\.]+)/i,
                            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                            /(icab)[\/ ]([23]\.[\d\.]+)/i,
                            /\b(libweb)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /rv\:([\w\.]{1,9})\b.+(gecko)/i
                        ],
                        [
                            f,
                            u
                        ]
                    ],
                    os: [
                        [
                            /microsoft (windows) (vista|xp)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(windows) nt 6\.2; (arm)/i,
                            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
                        ],
                        [
                            u,
                            [
                                f,
                                strMapper,
                                X
                            ]
                        ],
                        [
                            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
                        ],
                        [
                            [
                                u,
                                "Windows"
                            ],
                            [
                                f,
                                strMapper,
                                X
                            ]
                        ],
                        [
                            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                            /ios;fbsv\/([\d\.]+)/i,
                            /cfnetwork\/.+darwin/i
                        ],
                        [
                            [
                                f,
                                /_/g,
                                "."
                            ],
                            [
                                u,
                                "iOS"
                            ]
                        ],
                        [
                            /(mac os x) ?([\w\. ]*)/i,
                            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
                        ],
                        [
                            [
                                u,
                                Z
                            ],
                            [
                                f,
                                /_/g,
                                "."
                            ]
                        ],
                        [
                            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
                        ],
                        [
                            f,
                            u
                        ],
                        [
                            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                            /(blackberry)\w*\/([\w\.]*)/i,
                            /(tizen|kaios)[\/ ]([\w\.]+)/i,
                            /\((series40);/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /\(bb(10);/i
                        ],
                        [
                            f,
                            [
                                u,
                                N
                            ]
                        ],
                        [
                            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Symbian"
                            ]
                        ],
                        [
                            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " OS"
                            ]
                        ],
                        [
                            /web0s;.+rt(tv)/i,
                            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "webOS"
                            ]
                        ],
                        [
                            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "watchOS"
                            ]
                        ],
                        [
                            /crkey\/([\d\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                C + "cast"
                            ]
                        ],
                        [
                            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
                        ],
                        [
                            [
                                u,
                                L
                            ],
                            f
                        ],
                        [
                            /panasonic;(viera)/i,
                            /(netrange)mmh/i,
                            /(nettv)\/(\d+\.[\w\.]+)/i,
                            /(nintendo|playstation) ([wids345portablevuch]+)/i,
                            /(xbox); +xbox ([^\);]+)/i,
                            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                            /(mint)[\/\(\) ]?(\w*)/i,
                            /(mageia|vectorlinux)[; ]/i,
                            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                            /(hurd|linux) ?([\w\.]*)/i,
                            /(gnu) ?([\w\.]*)/i,
                            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                            /(haiku) (\w+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(sunos) ?([\w\.\d]*)/i
                        ],
                        [
                            [
                                u,
                                "Solaris"
                            ],
                            f
                        ],
                        [
                            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                            /(unix) ?([\w\.]*)/i
                        ],
                        [
                            u,
                            f
                        ]
                    ]
                };
                var UAParser = function(i, e) {
                    if (typeof i === w) {
                        e = i;
                        i = a;
                    }
                    if (!(this instanceof UAParser)) {
                        return new UAParser(i, e).getResult();
                    }
                    var r = typeof o !== b && o.navigator ? o.navigator : a;
                    var n = i || (r && r.userAgent ? r.userAgent : t);
                    var v = r && r.userAgentData ? r.userAgentData : a;
                    var x = e ? extend(K, e) : K;
                    var _ = r && r.userAgent == n;
                    this.getBrowser = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.browser);
                        i[d] = majorize(i[f]);
                        if (_ && r && r.brave && typeof r.brave.isBrave == s) {
                            i[u] = "Brave";
                        }
                        return i;
                    };
                    this.getCPU = function() {
                        var i = {};
                        i[h] = a;
                        rgxMapper.call(i, n, x.cpu);
                        return i;
                    };
                    this.getDevice = function() {
                        var i = {};
                        i[m] = a;
                        i[c] = a;
                        i[p] = a;
                        rgxMapper.call(i, n, x.device);
                        if (_ && !i[p] && v && v.mobile) {
                            i[p] = g;
                        }
                        if (_ && i[c] == "Macintosh" && r && typeof r.standalone !== b && r.maxTouchPoints && r.maxTouchPoints > 2) {
                            i[c] = "iPad";
                            i[p] = k;
                        }
                        return i;
                    };
                    this.getEngine = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.engine);
                        return i;
                    };
                    this.getOS = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.os);
                        if (_ && !i[u] && v && v.platform != "Unknown") {
                            i[u] = v.platform.replace(/chrome os/i, L).replace(/macos/i, Z);
                        }
                        return i;
                    };
                    this.getResult = function() {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS(),
                            device: this.getDevice(),
                            cpu: this.getCPU()
                        };
                    };
                    this.getUA = function() {
                        return n;
                    };
                    this.setUA = function(i) {
                        n = typeof i === l && i.length > q ? trim(i, q) : i;
                        return this;
                    };
                    this.setUA(n);
                    return this;
                };
                UAParser.VERSION = r;
                UAParser.BROWSER = enumerize([
                    u,
                    f,
                    d
                ]);
                UAParser.CPU = enumerize([
                    h
                ]);
                UAParser.DEVICE = enumerize([
                    c,
                    m,
                    p,
                    v,
                    g,
                    x,
                    k,
                    _,
                    y
                ]);
                UAParser.ENGINE = UAParser.OS = enumerize([
                    u,
                    f
                ]);
                if (typeof e !== b) {
                    if ("object" !== b && i.exports) {
                        e = i.exports = UAParser;
                    }
                    e.UAParser = UAParser;
                } else {
                    if (typeof define === s && define.amd) {
                        ((r)=>r !== undefined && __turbopack_context__.v(r))(function() {
                            return UAParser;
                        }(__turbopack_context__.r, exports, module));
                    } else if (typeof o !== b) {
                        o.UAParser = UAParser;
                    }
                }
                var Q = typeof o !== b && (o.jQuery || o.Zepto);
                if (Q && !Q.ua) {
                    var Y = new UAParser;
                    Q.ua = Y.getResult();
                    Q.ua.get = function() {
                        return Y.getUA();
                    };
                    Q.ua.set = function(i) {
                        Y.setUA(i);
                        var e = Y.getResult();
                        for(var o in e){
                            Q.ua[o] = e[o];
                        }
                    };
                }
            })(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : this);
        }
    };
    var e = {};
    function __nccwpck_require__(o) {
        var a = e[o];
        if (a !== undefined) {
            return a.exports;
        }
        var r = e[o] = {
            exports: {}
        };
        var t = true;
        try {
            i[o].call(r.exports, r, r.exports, __nccwpck_require__);
            t = false;
        } finally{
            if (t) delete e[o];
        }
        return r.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/FRONTEND/interent/node_modules/next/dist/compiled/ua-parser-js") + "/";
    var o = __nccwpck_require__(226);
    module.exports = o;
})();
}),
]);

//# sourceMappingURL=09ddd_next_dist_compiled_ac6a99c5._.js.map