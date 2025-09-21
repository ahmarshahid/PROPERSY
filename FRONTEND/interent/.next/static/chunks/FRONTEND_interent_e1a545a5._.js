(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/FRONTEND/interent/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>N8nBidConsole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function N8nBidConsole(param) {
    let { defaultWebhookUrl = "/api/n8n-proxy" } = param;
    _s();
    const webhookUrl = defaultWebhookUrl; // fixed as proxy
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [responses, setResponses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("pretty");
    // Added: logs state
    const [showLogs, setShowLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [netLog, setNetLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // network timeline
    const [liveLog, setLiveLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // live response text (chunked)
    const t0Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const companyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rfpRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const promptRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logNet = (line)=>{
        setNetLog((prev)=>prev + (prev ? "\n" : "") + line);
    };
    function tryParseJSON(text) {
        try {
            const obj = JSON.parse(text);
            return obj && typeof obj === "object" ? obj : null;
        } catch (e) {
            return null;
        }
    }
    function normaliseChatPayload(result) {
        const out = [];
        const pushMsg = (content)=>{
            if (content == null) return;
            if (typeof content === "object") {
                if (content.message || content.Message) {
                    var _content_message;
                    out.push({
                        role: "assistant",
                        content: String((_content_message = content.message) !== null && _content_message !== void 0 ? _content_message : content.Message),
                        parsed: content
                    });
                } else if (content.text || content.output) {
                    var _content_text;
                    const body = (_content_text = content.text) !== null && _content_text !== void 0 ? _content_text : content.output;
                    const parsed = typeof body === "string" ? tryParseJSON(body) : body;
                    out.push({
                        role: "assistant",
                        content: typeof body === "string" ? body : JSON.stringify(body, null, 2),
                        parsed: parsed !== null && parsed !== void 0 ? parsed : content
                    });
                } else {
                    out.push({
                        role: "assistant",
                        content: JSON.stringify(content, null, 2),
                        parsed: content
                    });
                }
            } else {
                const parsed = typeof content === "string" ? tryParseJSON(content) : null;
                out.push({
                    role: "assistant",
                    content: String(content),
                    parsed
                });
            }
        };
        const flattenAny = (x)=>{
            if (Array.isArray(x)) x.forEach(flattenAny);
            else if (x && typeof x === "object") {
                if ("message" in x || "Message" in x || "text" in x || "output" in x) pushMsg(x);
                else if ("data" in x) flattenAny(x.data);
                else if ("items" in x) flattenAny(x.items);
                else if ("messages" in x) flattenAny(x.messages);
                else pushMsg(x);
            } else pushMsg(x);
        };
        flattenAny(result);
        return out;
    }
    async function runWorkflow(e) {
        var _e_preventDefault, _companyRef_current_files, _companyRef_current, _rfpRef_current_files, _rfpRef_current, _promptRef_current_value, _promptRef_current;
        e === null || e === void 0 ? void 0 : (_e_preventDefault = e.preventDefault) === null || _e_preventDefault === void 0 ? void 0 : _e_preventDefault.call(e);
        setError("");
        setResponses([]);
        setNetLog("");
        setLiveLog("");
        t0Ref.current = performance.now();
        const fd = new FormData();
        const company = ((_companyRef_current = companyRef.current) === null || _companyRef_current === void 0 ? void 0 : (_companyRef_current_files = _companyRef_current.files) === null || _companyRef_current_files === void 0 ? void 0 : _companyRef_current_files[0]) || null;
        const rfp = ((_rfpRef_current = rfpRef.current) === null || _rfpRef_current === void 0 ? void 0 : (_rfpRef_current_files = _rfpRef_current.files) === null || _rfpRef_current_files === void 0 ? void 0 : _rfpRef_current_files[0]) || null;
        const prompt = ((_promptRef_current = promptRef.current) === null || _promptRef_current === void 0 ? void 0 : (_promptRef_current_value = _promptRef_current.value) === null || _promptRef_current_value === void 0 ? void 0 : _promptRef_current_value.trim()) || "Run compliance + writers";
        if (company) fd.append("company.pdf", company, company.name);
        if (rfp) fd.append("rfp.pdf", rfp, rfp.name);
        fd.append("message", prompt);
        setLoading(true);
        try {
            logNet("Preparing request...");
            const reqUrl = showLogs ? "".concat(webhookUrl, "?stream=1") : webhookUrl;
            const tSend = performance.now();
            logNet("POST ".concat(reqUrl));
            const res = await fetch(reqUrl, {
                method: "POST",
                body: fd,
                cache: "no-store"
            });
            const tHeaders = performance.now();
            logNet("Status: ".concat(res.status, " ").concat(res.statusText));
            logNet("Headers received in ".concat((tHeaders - tSend).toFixed(0), " ms"));
            const contentType = res.headers.get("content-type") || "";
            let accumulated = "";
            if (showLogs && res.body) {
                // Streamed reading
                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let bytes = 0;
                // eslint-disable-next-line no-constant-condition
                while(true){
                    const { value, done } = await reader.read();
                    if (done) break;
                    bytes += (value === null || value === void 0 ? void 0 : value.length) || 0;
                    const chunk = decoder.decode(value, {
                        stream: true
                    });
                    accumulated += chunk;
                    setLiveLog((prev)=>prev + chunk);
                    logNet("+".concat(value.length, " bytes (total ").concat(bytes, ")"));
                }
                logNet("Stream finished.");
            } else {
                // Non-streamed: read all at once
                if (contentType.includes("application/json")) {
                    const data = await res.json();
                    accumulated = JSON.stringify(data);
                } else {
                    accumulated = await res.text();
                }
            }
            // Parse and display
            const maybeJSON = tryParseJSON(accumulated);
            const data = maybeJSON !== null && maybeJSON !== void 0 ? maybeJSON : {
                message: accumulated
            };
            const messages = normaliseChatPayload(data);
            setResponses(messages.map((m, i)=>({
                    id: i + 1,
                    ...m
                })));
            const tDone = performance.now();
            logNet("Total ".concat((tDone - t0Ref.current).toFixed(0), " ms"));
            if (!contentType) logNet("Note: upstream did not set content-type; parsed as text.");
        } catch (err) {
            setError((err === null || err === void 0 ? void 0 : err.message) || String(err));
            logNet("Error: ".concat((err === null || err === void 0 ? void 0 : err.message) || String(err)));
        } finally{
            setLoading(false);
        }
    }
    const hasCompliance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "N8nBidConsole.useMemo[hasCompliance]": ()=>{
            for (const r of responses){
                const p = r.parsed;
                if (p && ("compliant" in p || "Compliant" in p) && ("message" in p || "Message" in p)) {
                    var _p_compliant, _p_message, _ref;
                    return {
                        compliant: Boolean((_p_compliant = p.compliant) !== null && _p_compliant !== void 0 ? _p_compliant : p.Compliant),
                        message: String((_ref = (_p_message = p.message) !== null && _p_message !== void 0 ? _p_message : p.Message) !== null && _ref !== void 0 ? _ref : r.content)
                    };
                }
            }
            return null;
        }
    }["N8nBidConsole.useMemo[hasCompliance]"], [
        responses
    ]);
    const writers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "N8nBidConsole.useMemo[writers]": ()=>{
            const buckets = {
                executive: [],
                technical: [],
                pricing: [],
                references: [],
                timeline: [],
                other: []
            };
            for (const r of responses){
                const text = r.content.toLowerCase();
                if (text.includes("executive summary")) buckets.executive.push(r);
                else if (text.includes("technical") || text.includes("architecture")) buckets.technical.push(r);
                else if (text.includes("pricing")) buckets.pricing.push(r);
                else if (text.includes("reference")) buckets.references.push(r);
                else if (text.includes("timeline") || text.includes("phase")) buckets.timeline.push(r);
                else buckets.other.push(r);
            }
            return buckets;
        }
    }["N8nBidConsole.useMemo[writers]"], [
        responses
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 max-w-5xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Propersy Bid Console"
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm opacity-80",
                        children: "Upload two PDFs and watch live logs while the workflow runs."
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: runWorkflow,
                className: "space-y-4 bg-white/5 p-4 rounded-2xl border border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "logs",
                                        type: "checkbox",
                                        checked: showLogs,
                                        onChange: (e)=>setShowLogs(e.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "logs",
                                        children: "Show logs (stream)"
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm opacity-70 animate-pulse",
                                children: "Running…"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 181,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: "Company Profile PDF"
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 36
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: companyRef,
                                        type: "file",
                                        accept: "application/pdf",
                                        className: "mt-1 block w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 88
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: "RFP PDF"
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 186,
                                        columnNumber: 36
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: rfpRef,
                                        type: "file",
                                        accept: "application/pdf",
                                        className: "mt-1 block w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 186,
                                        columnNumber: 76
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm",
                                children: "Message (optional)"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 189,
                                columnNumber: 34
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: promptRef,
                                type: "text",
                                className: "mt-1 w-full rounded-xl border border-white/20 bg-transparent p-2",
                                defaultValue: "Run compliance + writers"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "rounded-xl px-4 py-2 bg-white/10 border border-white/20 hover:bg-white/20",
                                children: "Run workflow"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-400 text-sm",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 195,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-6 grid md:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-white/10 rounded-2xl p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold mb-2 text-sm",
                                children: "Network log"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-xs bg-black/50 rounded p-2 min-h-[6rem] whitespace-pre-wrap",
                                children: netLog || "—"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-white/10 rounded-2xl p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold mb-2 text-sm",
                                children: "Live response"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-xs bg-black/50 rounded p-2 min-h-[6rem] overflow-auto max-h-64 whitespace-pre-wrap",
                                children: liveLog || "—"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            hasCompliance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-6 border border-white/10 rounded-2xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold mb-2",
                        children: "Compliance"
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm rounded-xl p-3 ".concat(hasCompliance.compliant ? "bg-emerald-500/10 border border-emerald-600" : "bg-amber-500/10 border border-amber-600"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-medium mb-1",
                                children: hasCompliance.compliant ? "Compliant ✅" : "Not compliant ❌"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "whitespace-pre-wrap",
                                children: hasCompliance.message
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                lineNumber: 212,
                columnNumber: 9
            }, this),
            responses.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-6 border border-white/10 rounded-2xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-4 text-sm",
                        children: [
                            [
                                "pretty",
                                "Writers view"
                            ],
                            [
                                "stream",
                                "All messages"
                            ],
                            [
                                "raw",
                                "Raw"
                            ],
                            [
                                "logs",
                                "Logs"
                            ]
                        ].map((param)=>{
                            let [k, label] = param;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.preventDefault();
                                    setActiveTab(k);
                                },
                                className: "px-3 py-1 rounded-lg border ".concat(activeTab === k ? "bg-white/10 border-white/30" : "border-white/10"),
                                children: label
                            }, k, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 225,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    activeTab === "pretty" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-4",
                        children: Object.entries(writers).map((param)=>{
                            let [bucket, items] = param;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border border-white/10 rounded-xl p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold mb-1 capitalize",
                                        children: bucket
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 233,
                                        columnNumber: 19
                                    }, this),
                                    items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm opacity-60",
                                        children: "No content"
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 39
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2 text-sm",
                                        children: items.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "bg-white/5 rounded p-2 whitespace-pre-wrap",
                                                children: r.content
                                            }, r.id, false, {
                                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, bucket, true, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 232,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 230,
                        columnNumber: 13
                    }, this),
                    activeTab === "stream" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: responses.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white/5 rounded-xl p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs opacity-70 mb-1",
                                        children: [
                                            "#",
                                            r.id
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "whitespace-pre-wrap text-sm",
                                        children: r.content
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, r.id, true, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 246,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 245,
                        columnNumber: 13
                    }, this),
                    activeTab === "raw" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "text-xs bg-black/60 rounded-xl p-3 overflow-auto max-h-96",
                        children: JSON.stringify(responses.map((r)=>{
                            var _parsed;
                            return (_parsed = r.parsed) !== null && _parsed !== void 0 ? _parsed : r.content;
                        }), null, 2)
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 254,
                        columnNumber: 13
                    }, this),
                    activeTab === "logs" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-xs bg-black/60 rounded-xl p-3 overflow-auto max-h-96 whitespace-pre-wrap",
                                children: netLog || "—"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-xs bg-black/60 rounded-xl p-3 overflow-auto max-h-96 whitespace-pre-wrap",
                                children: liveLog || "—"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 260,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 258,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/FRONTEND/interent/app/page.tsx",
        lineNumber: 162,
        columnNumber: 5
    }, this);
}
_s(N8nBidConsole, "8k2w3ZvINddBGYTan15Nouk96cY=");
_c = N8nBidConsole;
var _c;
__turbopack_context__.k.register(_c, "N8nBidConsole");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/FRONTEND/interent/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
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
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/FRONTEND/interent/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/FRONTEND/interent/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=FRONTEND_interent_e1a545a5._.js.map