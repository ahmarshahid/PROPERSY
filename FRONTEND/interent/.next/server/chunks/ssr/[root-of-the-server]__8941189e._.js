module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/FRONTEND/interent/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>N8nBidConsole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FRONTEND/interent/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FRONTEND/interent/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function N8nBidConsole({ defaultWebhookUrl = "/api/n8n-proxy" }) {
    const webhookUrl = defaultWebhookUrl; // fixed as proxy
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [responses, setResponses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("pretty");
    // Added: logs state
    const [showLogs, setShowLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [netLog, setNetLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(""); // network timeline
    const [liveLog, setLiveLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(""); // live response text (chunked)
    const t0Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const companyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rfpRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const promptRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logNet = (line)=>{
        setNetLog((prev)=>prev + (prev ? "\n" : "") + line);
    };
    function tryParseJSON(text) {
        try {
            const obj = JSON.parse(text);
            return obj && typeof obj === "object" ? obj : null;
        } catch  {
            return null;
        }
    }
    function normaliseChatPayload(result) {
        const out = [];
        const pushMsg = (content)=>{
            if (content == null) return;
            if (typeof content === "object") {
                if (content.message || content.Message) {
                    out.push({
                        role: "assistant",
                        content: String(content.message ?? content.Message),
                        parsed: content
                    });
                } else if (content.text || content.output) {
                    const body = content.text ?? content.output;
                    const parsed = typeof body === "string" ? tryParseJSON(body) : body;
                    out.push({
                        role: "assistant",
                        content: typeof body === "string" ? body : JSON.stringify(body, null, 2),
                        parsed: parsed ?? content
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
        e?.preventDefault?.();
        setError("");
        setResponses([]);
        setNetLog("");
        setLiveLog("");
        t0Ref.current = performance.now();
        const fd = new FormData();
        const company = companyRef.current?.files?.[0] || null;
        const rfp = rfpRef.current?.files?.[0] || null;
        const prompt = promptRef.current?.value?.trim() || "Run compliance + writers";
        if (company) fd.append("company.pdf", company, company.name);
        if (rfp) fd.append("rfp.pdf", rfp, rfp.name);
        fd.append("message", prompt);
        setLoading(true);
        try {
            logNet("Preparing request...");
            const reqUrl = showLogs ? `${webhookUrl}?stream=1` : webhookUrl;
            const tSend = performance.now();
            logNet(`POST ${reqUrl}`);
            const res = await fetch(reqUrl, {
                method: "POST",
                body: fd,
                cache: "no-store"
            });
            const tHeaders = performance.now();
            logNet(`Status: ${res.status} ${res.statusText}`);
            logNet(`Headers received in ${(tHeaders - tSend).toFixed(0)} ms`);
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
                    bytes += value?.length || 0;
                    const chunk = decoder.decode(value, {
                        stream: true
                    });
                    accumulated += chunk;
                    setLiveLog((prev)=>prev + chunk);
                    logNet(`+${value.length} bytes (total ${bytes})`);
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
            const data = maybeJSON ?? {
                message: accumulated
            };
            const messages = normaliseChatPayload(data);
            setResponses(messages.map((m, i)=>({
                    id: i + 1,
                    ...m
                })));
            const tDone = performance.now();
            logNet(`Total ${(tDone - t0Ref.current).toFixed(0)} ms`);
            if (!contentType) logNet("Note: upstream did not set content-type; parsed as text.");
        } catch (err) {
            setError(err?.message || String(err));
            logNet(`Error: ${err?.message || String(err)}`);
        } finally{
            setLoading(false);
        }
    }
    const hasCompliance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        for (const r of responses){
            const p = r.parsed;
            if (p && ("compliant" in p || "Compliant" in p) && ("message" in p || "Message" in p)) {
                return {
                    compliant: Boolean(p.compliant ?? p.Compliant),
                    message: String(p.message ?? p.Message ?? r.content)
                };
            }
        }
        return null;
    }, [
        responses
    ]);
    const writers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
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
    }, [
        responses
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 max-w-5xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Propersy Bid Console"
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: runWorkflow,
                className: "space-y-4 bg-white/5 p-4 rounded-2xl border border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "logs",
                                        type: "checkbox",
                                        checked: showLogs,
                                        onChange: (e)=>setShowLogs(e.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: "Company Profile PDF"
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 36
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: "RFP PDF"
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 186,
                                        columnNumber: 36
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm",
                                children: "Message (optional)"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 189,
                                columnNumber: 34
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "rounded-xl px-4 py-2 bg-white/10 border border-white/20 hover:bg-white/20",
                                children: "Run workflow"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-6 grid md:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-white/10 rounded-2xl p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold mb-2 text-sm",
                                children: "Network log"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-white/10 rounded-2xl p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold mb-2 text-sm",
                                children: "Live response"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
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
            hasCompliance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-6 border border-white/10 rounded-2xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold mb-2",
                        children: "Compliance"
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-sm rounded-xl p-3 ${hasCompliance.compliant ? "bg-emerald-500/10 border border-emerald-600" : "bg-amber-500/10 border border-amber-600"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-medium mb-1",
                                children: hasCompliance.compliant ? "Compliant ✅" : "Not compliant ❌"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            responses.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-6 border border-white/10 rounded-2xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        ].map(([k, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.preventDefault();
                                    setActiveTab(k);
                                },
                                className: `px-3 py-1 rounded-lg border ${activeTab === k ? "bg-white/10 border-white/30" : "border-white/10"}`,
                                children: label
                            }, k, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 225,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    activeTab === "pretty" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-4",
                        children: Object.entries(writers).map(([bucket, items])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border border-white/10 rounded-xl p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold mb-1 capitalize",
                                        children: bucket
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 233,
                                        columnNumber: 19
                                    }, this),
                                    items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm opacity-60",
                                        children: "No content"
                                    }, void 0, false, {
                                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 39
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2 text-sm",
                                        children: items.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
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
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 230,
                        columnNumber: 13
                    }, this),
                    activeTab === "stream" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: responses.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white/5 rounded-xl p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    activeTab === "raw" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "text-xs bg-black/60 rounded-xl p-3 overflow-auto max-h-96",
                        children: JSON.stringify(responses.map((r)=>r.parsed ?? r.content), null, 2)
                    }, void 0, false, {
                        fileName: "[project]/FRONTEND/interent/app/page.tsx",
                        lineNumber: 254,
                        columnNumber: 13
                    }, this),
                    activeTab === "logs" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-xs bg-black/60 rounded-xl p-3 overflow-auto max-h-96 whitespace-pre-wrap",
                                children: netLog || "—"
                            }, void 0, false, {
                                fileName: "[project]/FRONTEND/interent/app/page.tsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
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
}),
"[project]/FRONTEND/interent/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/FRONTEND/interent/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/FRONTEND/interent/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/FRONTEND/interent/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/FRONTEND/interent/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8941189e._.js.map